// @vitest-environment jsdom

import { afterEach, describe, expect, it } from "vitest";
import { readCollection, readSession, STORAGE_KEYS, writeCollection, writeSession } from "@nexoraxs/shared";

afterEach(() => { localStorage.clear(); sessionStorage.clear(); });

describe("Feature 054 Commerce storage compatibility", () => {
  it("freezes every affected operational and session key", () => {
    expect(STORAGE_KEYS).toMatchObject({
      products: "nexoraxs.db.commerceProducts", customers: "nexoraxs.db.commerceCustomers",
      branchInventory: "nexoraxs.db.branchInventory", stockMovements: "nexoraxs.db.stockMovements",
      stockTransfers: "nexoraxs.db.stockTransfers", commerceReturns: "nexoraxs.db.commerceReturns",
      orders: "nexoraxs.db.commerceOrders", invoices: "nexoraxs.db.commerceInvoices",
      commerceSetups: "nexoraxs.db.commerceSetups", mediaAssets: "nexoraxs.db.mediaAssets",
      workspaceStorageUsage: "nexoraxs.db.workspaceStorageUsage", posLastOrderId: "nx_last_order_id",
    });
  });

  it("preserves collection ordering, unknown fields, and corrupt JSON fallback", () => {
    const records = [{ id: "1", opaque: { keep: true } }, { id: "2", extra: [1, 2] }];
    writeCollection(STORAGE_KEYS.orders, records);
    expect(readCollection(STORAGE_KEYS.orders)).toEqual(records);
    localStorage.setItem(STORAGE_KEYS.orders, "{corrupt");
    expect(readCollection(STORAGE_KEYS.orders)).toEqual([]);
  });

  it("preserves JSON session encoding and default fallback", () => {
    writeSession(STORAGE_KEYS.currentWorkspaceId, "ws");
    expect(sessionStorage.getItem(STORAGE_KEYS.currentWorkspaceId)).toBe(JSON.stringify("ws"));
    expect(readSession(STORAGE_KEYS.currentWorkspaceId, null)).toBe("ws");
    sessionStorage.setItem(STORAGE_KEYS.currentWorkspaceId, "{corrupt");
    expect(readSession(STORAGE_KEYS.currentWorkspaceId, "fallback")).toBe("fallback");
  });
});
