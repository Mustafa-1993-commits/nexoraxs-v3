import type {
  CommerceChangeNotificationPort,
  LegacyCommerceCommandContext,
  LegacyCommerceDeterministicDependencies,
  LegacyCommerceOperationsStore,
  LegacyCreateOrderCommand,
  LegacyCreateOrderResult,
  LegacyOrderCreationPort,
} from "@nexoraxs/contracts";
import type { BranchInventory, CommerceProduct, OrderItem, StockMovement } from "@nexoraxs/types";
import { createLegacyStockMovement, legacyEffectiveStock } from "../../inventory/application/legacy-inventory-policy";
import { createLegacyOrder } from "./legacy-order-compatibility-policy";

export class LegacyOrderCreationService implements LegacyOrderCreationPort {
  constructor(
    private readonly store: LegacyCommerceOperationsStore,
    private readonly deterministic: LegacyCommerceDeterministicDependencies,
    private readonly changes: CommerceChangeNotificationPort,
  ) {}

  create(context: LegacyCommerceCommandContext, command: LegacyCreateOrderCommand): LegacyCreateOrderResult {
    const branchId = context.branchId ?? "";
    const products = this.store.readProducts();
    const positions = [...this.store.readPositions()];
    const tracked: { item: OrderItem; product: CommerceProduct }[] = [];
    const requested: Record<string, number> = {};
    for (const item of command.items) {
      if (!item.productId) continue;
      const product = products.find((candidate) => candidate.id === item.productId);
      if (!product) continue;
      const existing = positions.find((candidate) => candidate.productId === product.id && candidate.branchId === branchId);
      if (product.stock === null && !existing) continue;
      const requestedQty = (requested[product.id] ?? 0) + item.qty;
      requested[product.id] = requestedQty;
      if (requestedQty > legacyEffectiveStock(product, branchId, positions).qty) throw new Error("insufficient_stock");
      tracked.push({ item: { ...item }, product });
    }
    const existingOrders = [...this.store.readOrders()];
    const scopedCount = existingOrders.filter((item) => item.businessUnitId === context.legacyBusinessUnitId).length;
    const order = createLegacyOrder(
      context, command, `ORD-${String(scopedCount + 1).padStart(4, "0")}`, this.deterministic,
    );
    const nextOrders = [...existingOrders, order];
    this.store.replaceOrders(nextOrders);
    let nextPositions: BranchInventory[] = positions;
    const createdMovements: StockMovement[] = [];
    for (const { item, product } of tracked) {
      const effective = legacyEffectiveStock(product, branchId, nextPositions);
      const existing = nextPositions.find((candidate) => candidate.productId === product.id && candidate.branchId === branchId);
      const qty = effective.qty - item.qty;
      nextPositions = existing
        ? nextPositions.map((candidate) => candidate.id === existing.id ? { ...candidate, qty, updatedAt: this.deterministic.now() } : candidate)
        : [...nextPositions, {
            id: this.deterministic.createId("bi"), workspaceId: order.workspaceId,
            businessUnitId: order.businessUnitId, branchId, productId: product.id,
            qty, lowStockThreshold: effective.lowStockThreshold, updatedAt: this.deterministic.now(),
          }];
      createdMovements.push(createLegacyStockMovement({
        workspaceId: order.workspaceId, businessUnitId: order.businessUnitId, branchId,
        productId: product.id, qtyChange: -item.qty, reason: "sale",
        reference: { type: "order", id: order.id }, performedBy: order.cashierId,
        performedByName: order.cashierName,
      }, this.deterministic));
    }
    let nextMovements = [...this.store.readMovements()];
    if (createdMovements.length > 0) {
      nextMovements = [...nextMovements, ...createdMovements];
      this.store.replacePositions(nextPositions);
      this.store.replaceMovements(nextMovements);
    }
    void this.changes.ordersChanged({
      scope: { workspaceId: order.workspaceId, legacyBusinessUnitId: order.businessUnitId, branchId },
      orderId: order.id, customerId: order.customerId,
    }).catch(() => undefined);
    void this.changes.inventoryChanged({
      scope: { workspaceId: order.workspaceId, legacyBusinessUnitId: order.businessUnitId, branchId },
    }).catch(() => undefined);
    return { order, orders: nextOrders, branchInventory: nextPositions, stockMovements: nextMovements };
  }
}
