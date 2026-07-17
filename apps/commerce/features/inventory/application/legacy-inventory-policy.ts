import type { LegacyCommerceDeterministicDependencies } from "@nexoraxs/contracts";
import type { BranchInventory, CommerceProduct, StockMovement, StockMovementReason } from "@nexoraxs/types";

export function legacyEffectiveStock(
  product: CommerceProduct,
  branchId: string,
  positions: readonly BranchInventory[],
): { qty: number; lowStockThreshold: number; updatedAt: string; hasRecord: boolean } {
  const record = positions.find((item) => item.productId === product.id && item.branchId === branchId);
  return record
    ? { qty: record.qty, lowStockThreshold: record.lowStockThreshold, updatedAt: record.updatedAt, hasRecord: true }
    : { qty: product.stock ?? 0, lowStockThreshold: product.lowStockThreshold ?? 0, updatedAt: product.updatedAt, hasRecord: false };
}

export function createLegacyStockMovement(
  input: Omit<StockMovement, "id" | "createdAt"> & { reason: StockMovementReason },
  deterministic: LegacyCommerceDeterministicDependencies,
): StockMovement {
  return { id: deterministic.createId("sm"), ...input, createdAt: deterministic.now() };
}
