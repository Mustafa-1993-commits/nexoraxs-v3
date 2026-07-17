import { expect } from "vitest";
import type { LegacyInventoryRepository } from "@nexoraxs/contracts";
export const INVENTORY_A = { id: "inventory-shared", workspaceId: "ws-a", businessUnitId: "bu-a", branchId: "br-a", productId: "product-a", qty: 2, lowStockThreshold: 3, updatedAt: "2026-01-01T00:00:00Z" };
export const INVENTORY_B = { ...INVENTORY_A, workspaceId: "ws-b", businessUnitId: "bu-b", branchId: "br-b", qty: 99 };
export async function assertLegacyInventoryRepositoryContract(repository: LegacyInventoryRepository) {
  const result = await repository.list({ workspaceId: "ws-a", legacyBusinessUnitId: "bu-a", branchId: "br-a" });
  expect(result.items).toEqual([expect.objectContaining({ qty: 2 })]);
  expect("create" in repository || "update" in repository || "remove" in repository).toBe(false);
  await expect(repository.list({ workspaceId: "ws-a", legacyBusinessUnitId: "bu-a", branchId: "" }))
    .rejects.toMatchObject({ code: "invalid_scope" });
}
