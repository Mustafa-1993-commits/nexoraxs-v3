import type {
  CommerceChangeNotificationPort,
  LegacyCommerceCommandContext,
  LegacyCommerceDeterministicDependencies,
  LegacyCommerceOperationsStore,
  LegacyStockTransferPort,
  LegacyTransferStockCommand,
  LegacyTransferStockResult,
} from "@nexoraxs/contracts";
import type { BranchInventory, CommerceProduct, StockMovement } from "@nexoraxs/types";
import { createLegacyStockMovement, legacyEffectiveStock } from "../../inventory/application/legacy-inventory-policy";
import { createLegacyTransfer } from "./legacy-transfer-policy";

export class LegacyStockTransferService implements LegacyStockTransferPort {
  constructor(
    private readonly store: LegacyCommerceOperationsStore,
    private readonly deterministic: LegacyCommerceDeterministicDependencies,
    private readonly changes: CommerceChangeNotificationPort,
  ) {}

  transfer(context: LegacyCommerceCommandContext, command: LegacyTransferStockCommand): LegacyTransferStockResult {
    const fromBranchId = context.branchId;
    if (!fromBranchId || !context.workspaceId || !context.legacyBusinessUnitId || command.toBranchId === fromBranchId) {
      return { ok: false, error: "transfer_rejected" };
    }
    const destination = this.store.readBranches().find((branch) => branch.id === command.toBranchId);
    if (!destination || destination.businessUnitId !== context.legacyBusinessUnitId || command.items.length === 0) {
      return { ok: false, error: "transfer_rejected" };
    }
    const products = this.store.readProducts();
    const positions = [...this.store.readPositions()];
    const resolved: { product: CommerceProduct; qty: number }[] = [];
    for (const item of command.items) {
      const product = products.find((candidate) => candidate.id === item.productId);
      if (!product) return { ok: false, error: "transfer_rejected" };
      if (!Number.isInteger(item.qty) || item.qty <= 0) return { ok: false, error: "insufficient_stock" };
      if (legacyEffectiveStock(product, fromBranchId, positions).qty < item.qty) return { ok: false, error: "insufficient_stock" };
      resolved.push({ product, qty: item.qty });
    }
    const scopedTransfers = this.store.readTransfers().filter((item) => item.businessUnitId === context.legacyBusinessUnitId);
    const transfer = createLegacyTransfer({
      transferNumber: `TRF-${String(scopedTransfers.length + 1).padStart(4, "0")}`,
      workspaceId: context.workspaceId, businessUnitId: context.legacyBusinessUnitId,
      fromBranchId, toBranchId: command.toBranchId,
      items: resolved.map(({ product, qty }) => ({ productId: product.id, name: product.name, qty })),
      performedBy: context.actorId, performedByName: context.actorDisplayName || "Unknown", note: command.note,
    }, this.deterministic);
    let nextPositions: BranchInventory[] = positions;
    const createdMovements: StockMovement[] = [];
    for (const { product, qty } of resolved) {
      nextPositions = this.applyPosition(nextPositions, product, fromBranchId, -qty, context);
      nextPositions = this.applyPosition(nextPositions, product, command.toBranchId, qty, context);
      createdMovements.push(
        createLegacyStockMovement({
          workspaceId: context.workspaceId, businessUnitId: context.legacyBusinessUnitId, branchId: fromBranchId,
          productId: product.id, qtyChange: -qty, reason: "transfer_out", reference: { type: "transfer", id: transfer.id },
          performedBy: context.actorId, performedByName: context.actorDisplayName || "Unknown",
        }, this.deterministic),
        createLegacyStockMovement({
          workspaceId: context.workspaceId, businessUnitId: context.legacyBusinessUnitId, branchId: command.toBranchId,
          productId: product.id, qtyChange: qty, reason: "transfer_in", reference: { type: "transfer", id: transfer.id },
          performedBy: context.actorId, performedByName: context.actorDisplayName || "Unknown",
        }, this.deterministic),
      );
    }
    this.store.replacePositions(nextPositions);
    const nextMovements = [...this.store.readMovements(), ...createdMovements];
    this.store.replaceMovements(nextMovements);
    const nextTransfers = [...this.store.readTransfers(), transfer];
    this.store.replaceTransfers(nextTransfers);
    void Promise.all([
      this.changes.inventoryChanged({ scope: { workspaceId: context.workspaceId, legacyBusinessUnitId: context.legacyBusinessUnitId, branchId: fromBranchId } }),
      this.changes.inventoryChanged({ scope: { workspaceId: context.workspaceId, legacyBusinessUnitId: context.legacyBusinessUnitId, branchId: command.toBranchId } }),
    ]).catch(() => undefined);
    return { ok: true, transfer, branchInventory: nextPositions, stockMovements: nextMovements, stockTransfers: nextTransfers };
  }

  private applyPosition(
    positions: BranchInventory[], product: CommerceProduct, branchId: string, delta: number,
    context: LegacyCommerceCommandContext,
  ): BranchInventory[] {
    const effective = legacyEffectiveStock(product, branchId, positions);
    const existing = positions.find((item) => item.productId === product.id && item.branchId === branchId);
    const qty = effective.qty + delta;
    return existing
      ? positions.map((item) => item.id === existing.id ? { ...item, qty, updatedAt: this.deterministic.now() } : item)
      : [...positions, {
          id: this.deterministic.createId("bi"), workspaceId: context.workspaceId,
          businessUnitId: context.legacyBusinessUnitId, branchId, productId: product.id,
          qty, lowStockThreshold: effective.lowStockThreshold, updatedAt: this.deterministic.now(),
        }];
  }
}
