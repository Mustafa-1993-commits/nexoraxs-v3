// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { BrowserStorageCommerceStore, LEGACY_PRODUCTS_STORAGE_KEY } from "../BrowserStorageCommerceStore";
import { MemoryCommerceStore } from "../MemoryCommerceStore";
import { createLegacyProductFixtures } from "./legacy-product-fixtures";

describe("Product mock storage failures", () => {
  it("clones memory input and output", async () => {
    const fixtures = createLegacyProductFixtures();
    const store = new MemoryCommerceStore(fixtures);

    fixtures[0].name = "Caller mutation";
    const firstRead = await store.readProducts() as typeof fixtures;
    firstRead[0].name = "Read mutation";

    expect((await store.readProducts() as typeof fixtures)[0].name).toBe("Workspace A Product");
  });

  it("reports corrupt browser JSON without clearing it", async () => {
    window.localStorage.setItem(LEGACY_PRODUCTS_STORAGE_KEY, "{broken-json");
    const store = new BrowserStorageCommerceStore(window.localStorage);

    await expect(store.readProducts()).rejects.toMatchObject({
      code: "storage",
    });
    expect(window.localStorage.getItem(LEGACY_PRODUCTS_STORAGE_KEY)).toBe("{broken-json");
  });

  it("maps unavailable storage reads to the internal storage error", async () => {
    const unavailable = {
      getItem() { throw new DOMException("blocked", "SecurityError"); },
      setItem() { throw new DOMException("blocked", "SecurityError"); },
    };
    const store = new BrowserStorageCommerceStore(unavailable);

    await expect(store.readProducts()).rejects.toMatchObject({
      code: "storage",
    });
  });

  it("leaves the last committed value intact after quota failure", async () => {
    const fixtures = createLegacyProductFixtures();
    const committed = JSON.stringify(fixtures);
    let current = committed;
    const quotaStorage = {
      getItem() { return current; },
      setItem() { throw new DOMException("full", "QuotaExceededError"); },
    };
    const store = new BrowserStorageCommerceStore(quotaStorage);

    await expect(store.replaceProducts([])).rejects.toMatchObject({
      code: "storage",
    });
    expect(current).toBe(committed);
  });
});
