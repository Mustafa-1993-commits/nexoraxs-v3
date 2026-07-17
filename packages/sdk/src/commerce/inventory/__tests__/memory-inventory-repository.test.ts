import { describe, it } from "vitest";
import { MemoryCommerceStore } from "../../products/MemoryCommerceStore";
import { MockInventoryRepository } from "../MockInventoryRepository";
import { assertLegacyInventoryRepositoryContract, INVENTORY_A, INVENTORY_B } from "./legacy-inventory-repository.contract";
describe("Memory Inventory repository", () => { it("conforms read-only", async () => {
  await assertLegacyInventoryRepositoryContract(new MockInventoryRepository(new MemoryCommerceStore([], { inventory: [INVENTORY_A, INVENTORY_B] })));
}); });
