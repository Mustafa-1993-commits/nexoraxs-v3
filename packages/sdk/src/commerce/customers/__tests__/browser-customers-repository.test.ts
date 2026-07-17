import { describe, expect, it } from "vitest";
import { BrowserStorageCommerceStore, LEGACY_CUSTOMERS_STORAGE_KEY } from "../../products/BrowserStorageCommerceStore";
import { MockCustomersRepository } from "../MockCustomersRepository";
import { assertLegacyCustomersRepositoryContract, CUSTOMER_A, CUSTOMER_B } from "./legacy-customers-repository.contract";

class StorageFixture {
  values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
}
describe("Browser Customer repository conformance", () => {
  it("uses the unchanged key and contract", async () => {
    const storage = new StorageFixture();
    storage.values.set(LEGACY_CUSTOMERS_STORAGE_KEY, JSON.stringify([CUSTOMER_A, CUSTOMER_B]));
    const store = new BrowserStorageCommerceStore(storage);
    await assertLegacyCustomersRepositoryContract(new MockCustomersRepository(store, {
      now: () => new Date("2026-02-01T00:00:00.000Z"), createId: () => "cust-fixed",
    }));
    expect(storage.values.has(LEGACY_CUSTOMERS_STORAGE_KEY)).toBe(true);
  });
  it("fails safely for corrupt and unavailable storage without rewriting reads", async () => {
    const storage = new StorageFixture();
    storage.values.set(LEGACY_CUSTOMERS_STORAGE_KEY, "not-json");
    const repository = new MockCustomersRepository(new BrowserStorageCommerceStore(storage));
    await expect(repository.list({ workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" }))
      .rejects.toMatchObject({ code: "storage_unavailable" });
    expect(storage.values.get(LEGACY_CUSTOMERS_STORAGE_KEY)).toBe("not-json");
    await expect(new MockCustomersRepository(new BrowserStorageCommerceStore()).list({ workspaceId: "ws", legacyBusinessUnitId: "bu" }))
      .rejects.toMatchObject({ code: "storage_unavailable" });
  });
  it("surfaces quota failures without a successful partial replacement", async () => {
    const original = JSON.stringify([CUSTOMER_A]);
    const storage = {
      getItem: () => original,
      setItem: () => { throw new DOMException("Quota exceeded", "QuotaExceededError"); },
    };
    const repository = new MockCustomersRepository(new BrowserStorageCommerceStore(storage), { createId: () => "cust-quota" });
    await expect(repository.create({ workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" }, {
      branchId: "br-a", name: "Quota Customer", phone: "", email: "", notes: "",
    })).rejects.toMatchObject({ code: "storage_unavailable" });
    expect(storage.getItem()).toBe(original);
  });
});
