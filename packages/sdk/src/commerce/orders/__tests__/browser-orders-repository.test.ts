import { describe, expect, it } from "vitest";
import { BrowserStorageCommerceStore, LEGACY_ORDERS_STORAGE_KEY } from "../../products/BrowserStorageCommerceStore";
import { MockOrdersRepository } from "../MockOrdersRepository";
import { assertLegacyOrdersRepositoryContract, ORDER_A, ORDER_B } from "./legacy-orders-repository.contract";
describe("Browser Order repository conformance", () => {
  it("reads without rewriting", async () => {
    const map = new Map([[LEGACY_ORDERS_STORAGE_KEY, JSON.stringify([ORDER_A, ORDER_B])]]);
    const storage = { getItem: (key: string) => map.get(key) ?? null, setItem: (key: string, value: string) => map.set(key, value) };
    const before = map.get(LEGACY_ORDERS_STORAGE_KEY);
    await assertLegacyOrdersRepositoryContract(new MockOrdersRepository(new BrowserStorageCommerceStore(storage)));
    expect(map.get(LEGACY_ORDERS_STORAGE_KEY)).toBe(before);
  });
});
