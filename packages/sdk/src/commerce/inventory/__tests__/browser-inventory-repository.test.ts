import { describe, expect, it } from "vitest";
import { BrowserStorageCommerceStore, LEGACY_INVENTORY_STORAGE_KEY } from "../../products/BrowserStorageCommerceStore";
import { MockInventoryRepository } from "../MockInventoryRepository";
import { assertLegacyInventoryRepositoryContract, INVENTORY_A, INVENTORY_B } from "./legacy-inventory-repository.contract";
describe("Browser Inventory repository", () => { it("reads the legacy key without rewriting", async () => {
  const serialized = JSON.stringify([INVENTORY_A, INVENTORY_B]); const map = new Map([[LEGACY_INVENTORY_STORAGE_KEY, serialized]]);
  await assertLegacyInventoryRepositoryContract(new MockInventoryRepository(new BrowserStorageCommerceStore({ getItem: (key) => map.get(key) ?? null, setItem: (key, value) => map.set(key, value) })));
  expect(map.get(LEGACY_INVENTORY_STORAGE_KEY)).toBe(serialized);
}); });
