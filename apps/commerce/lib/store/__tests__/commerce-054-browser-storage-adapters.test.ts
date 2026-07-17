// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { BrowserLegacyCommerceOperationsStore, LEGACY_COMMERCE_OPERATION_KEYS } from "@nexoraxs/sdk/testing";
import { readBrowserStorage, removeBrowserStorage, writeBrowserStorage } from "@nexoraxs/shared";

describe("Commerce browser storage adapters", () => {
  it("preserves raw session/theme values and exact operational keys across refresh reads", () => {
    localStorage.clear(); sessionStorage.clear();
    writeBrowserStorage("theme", "dark", "local"); writeBrowserStorage("session", "value", "session");
    expect(readBrowserStorage("theme", "local")).toBe("dark"); expect(readBrowserStorage("session", "session")).toBe("value");
    removeBrowserStorage("session", "session"); expect(readBrowserStorage("session", "session")).toBeNull();
    const store = new BrowserLegacyCommerceOperationsStore(localStorage);
    store.replaceOrders([]);
    expect(localStorage.getItem(LEGACY_COMMERCE_OPERATION_KEYS.orders)).toBe("[]");
    expect(new BrowserLegacyCommerceOperationsStore(localStorage).readOrders()).toEqual([]);
  });

  it("surfaces corrupt operational values", () => {
    localStorage.setItem(LEGACY_COMMERCE_OPERATION_KEYS.orders, "corrupt");
    expect(() => new BrowserLegacyCommerceOperationsStore(localStorage).readOrders()).toThrow("commerce.operations.storage_corrupt");
  });
});
