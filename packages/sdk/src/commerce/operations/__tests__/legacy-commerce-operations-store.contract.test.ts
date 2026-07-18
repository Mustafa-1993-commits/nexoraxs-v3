// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { BrowserLegacyCommerceOperationsStore, LEGACY_COMMERCE_OPERATION_KEYS } from "../BrowserLegacyCommerceOperationsStore";
import { MemoryLegacyCommerceOperationsStore } from "../MemoryLegacyCommerceOperationsStore";

describe("legacy Commerce operations stores", () => {
  it("memory store clones reads and captures deterministic write order", () => {
    const store = new MemoryLegacyCommerceOperationsStore();
    store.replaceInvoices([]); store.replaceReturns([]);
    const records = store.readOrders() as unknown[];
    records.push({ id: "mutation" });
    expect(store.readOrders()).toEqual([]);
    expect(store.writes).toEqual(["invoices", "returns"]);
  });

  it("browser store preserves exact keys, cloning, corruption, and storage errors", () => {
    const writes: string[] = [];
    const values = new Map<string, string>();
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { writes.push(key); values.set(key, value); } };
    const store = new BrowserLegacyCommerceOperationsStore(storage);
    values.set(LEGACY_COMMERCE_OPERATION_KEYS.orders, "[]");
    expect(store.readOrders()).toEqual([]);
    values.set(LEGACY_COMMERCE_OPERATION_KEYS.orders, "not-json");
    expect(() => store.readOrders()).toThrow("commerce.operations.storage_corrupt");
    const unavailable = new BrowserLegacyCommerceOperationsStore({ getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("quota"); } });
    expect(() => unavailable.readOrders()).toThrow("blocked");
    expect(() => unavailable.replaceInvoices([])).toThrow("quota");
  });
});
