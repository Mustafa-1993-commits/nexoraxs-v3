import type {
  CommerceChangeNotificationPort,
  LegacyCommerceCommandContext,
  LegacyCommerceDeterministicDependencies,
  LegacyCreateOrderCommand,
  LegacyCreateOrderResult,
  LegacyOrderCommandRepository,
  LegacyOrderCreationPort,
  LegacyOrderInventoryEffectPort,
  LegacyOrderNumberPort,
} from "@nexoraxs/contracts";
import { createLegacyOrder } from "./legacy-order-compatibility-policy";

/** Orders-owned create orchestration. Inventory behavior is requested only through its owner port. */
export class LegacyOrderCreationService implements LegacyOrderCreationPort {
  constructor(
    private readonly orders: LegacyOrderCommandRepository,
    private readonly numbers: LegacyOrderNumberPort,
    private readonly inventory: LegacyOrderInventoryEffectPort,
    private readonly deterministic: LegacyCommerceDeterministicDependencies,
    private readonly changes: CommerceChangeNotificationPort,
  ) {}

  create(context: LegacyCommerceCommandContext, command: LegacyCreateOrderCommand): LegacyCreateOrderResult {
    const scope = {
      workspaceId: context.workspaceId,
      legacyBusinessUnitId: context.legacyBusinessUnitId,
      branchId: context.branchId ?? "",
    };
    const prepared = this.inventory.prepareSaleDeduction({ scope, items: command.items });
    const order = createLegacyOrder(
      context,
      command,
      this.numbers.next(scope),
      this.deterministic,
    );
    const orders = this.orders.create(scope, order);
    const inventory = this.inventory.commitSaleDeduction({
      scope,
      prepared,
      order,
      actorId: order.cashierId,
      actorDisplayName: order.cashierName,
    });
    void this.changes.ordersChanged({
      scope,
      orderId: order.id,
      customerId: order.customerId,
    }).catch(() => undefined);
    void this.changes.inventoryChanged({ scope }).catch(() => undefined);
    return {
      order,
      orders,
      branchInventory: inventory.branchInventory,
      stockMovements: inventory.stockMovements,
    };
  }
}
