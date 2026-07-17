import { describe, expect, it } from "vitest";
import { MemoryCommerceStore, MockInventoryRepository, MockProductsRepository } from "@nexoraxs/sdk/testing";
import { LegacyInventoryProjectionService } from "../application/LegacyInventoryProjectionService";
import { INVENTORY_A } from "../../../../../packages/sdk/src/commerce/inventory/__tests__/legacy-inventory-repository.contract";
const product = { id: "product-a", workspaceId: "ws-a", businessUnitId: "bu-a", branchId: "br-a", osSubscriptionId: "sub", name: "Product", category: "General", sku: "SKU", barcode: "", price: 10, cost: 5, taxable: true, stock: 8, lowStockThreshold: 5, notes: "", createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z" };
describe("Inventory projection", () => { it("uses Branch row then characterized Product fallback", async () => {
  const store = new MemoryCommerceStore([product, { ...product, id: "product-fallback" }], { inventory: [INVENTORY_A] });
  const rows = await new LegacyInventoryProjectionService(new MockProductsRepository(store), new MockInventoryRepository(store)).listInventory({ scope: { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a", branchId: "br-a" } });
  expect(rows.map((row) => row.stock)).toEqual([2, 8]);
}); });
