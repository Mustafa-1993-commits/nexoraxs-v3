import type {
  CommerceChangeNotificationPort,
  LegacyAdjustStockCommand,
  LegacyAdjustStockResult,
  LegacyCommerceCommandContext,
  LegacyCommerceDeterministicDependencies,
  LegacyCommerceOperationsStore,
  LegacyStockAdjustmentPort,
} from "@nexoraxs/contracts";
import type { BranchInventory } from "@nexoraxs/types";
import { createLegacyStockMovement, legacyEffectiveStock } from "./legacy-inventory-policy";

export class LegacyStockAdjustmentService implements LegacyStockAdjustmentPort {
  constructor(
    private readonly store: LegacyCommerceOperationsStore,
    private readonly deterministic: LegacyCommerceDeterministicDependencies,
    private readonly changes: CommerceChangeNotificationPort,
  ) {}

  adjust(context: LegacyCommerceCommandContext, command: LegacyAdjustStockCommand): LegacyAdjustStockResult {
    const branchId = command.branchId ?? context.branchId;
    if (!branchId || !context.workspaceId || !context.legacyBusinessUnitId) return { ok: false, error: "no_active_branch" };
    const products = this.store.readProducts();
    const product = products.find((item) =>
      item.id === command.productId
      && item.workspaceId === context.workspaceId
      && item.businessUnitId === context.legacyBusinessUnitId
    );
    if (!product) return { ok: false, error: "product_not_found" };
    const positions = [...this.store.readPositions()];
    const movements = [...this.store.readMovements()];
    const current = legacyEffectiveStock(product, branchId, positions);
    const qtyChange = command.qty - current.qty;
    const lowStockThreshold = command.lowStockThreshold ?? current.lowStockThreshold;
    const existing = positions.find((item) => item.productId === product.id && item.branchId === branchId);
    let recordId: string;
    let nextPositions: BranchInventory[];
    if (existing) {
      recordId = existing.id;
      nextPositions = positions.map((item) => item.id === existing.id
        ? { ...item, qty: command.qty, lowStockThreshold, updatedAt: this.deterministic.now() }
        : item);
    } else {
      recordId = this.deterministic.createId("bi");
      nextPositions = [...positions, {
        id: recordId, workspaceId: context.workspaceId, businessUnitId: context.legacyBusinessUnitId,
        branchId, productId: product.id, qty: command.qty, lowStockThreshold,
        updatedAt: this.deterministic.now(),
      }];
    }
    this.store.replacePositions(nextPositions);
    let nextMovements = movements;
    if (qtyChange !== 0) {
      nextMovements = [...movements, createLegacyStockMovement({
        workspaceId: context.workspaceId, businessUnitId: context.legacyBusinessUnitId,
        branchId, productId: product.id, qtyChange, reason: "adjustment",
        reference: { type: "adjustment", id: recordId },
        performedBy: context.actorId, performedByName: context.actorDisplayName || "Unknown",
      }, this.deterministic)];
      this.store.replaceMovements(nextMovements);
    }
    void this.changes.inventoryChanged({
      scope: { workspaceId: context.workspaceId, legacyBusinessUnitId: context.legacyBusinessUnitId, branchId },
      productIds: [product.id],
    }).catch(() => undefined);
    return { ok: true, branchInventory: nextPositions, stockMovements: nextMovements };
  }
}
