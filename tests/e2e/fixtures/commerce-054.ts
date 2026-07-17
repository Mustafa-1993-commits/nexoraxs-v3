import type { Page } from "@playwright/test";

export const COMMERCE_054_SCOPE = Object.freeze({
  workspaceId: "ws_demo",
  legacyBusinessUnitId: "bu_demo",
  branchId: "br_demo",
});

export const COMMERCE_054_FOREIGN_SCOPE = Object.freeze({
  workspaceId: "ws_foreign",
  legacyBusinessUnitId: "bu_foreign",
  branchId: "br_foreign",
});

export const COMMERCE_054_ACTOR = Object.freeze({
  actorId: "usr_demo",
  actorDisplayName: "Demo User",
  osId: "commerce" as const,
});

export const COMMERCE_054_KEYS = Object.freeze({
  products: "nexoraxs.db.commerceProducts",
  customers: "nexoraxs.db.commerceCustomers",
  inventory: "nexoraxs.db.branchInventory",
  stockMovements: "nexoraxs.db.stockMovements",
  stockTransfers: "nexoraxs.db.stockTransfers",
  returns: "nexoraxs.db.commerceReturns",
  orders: "nexoraxs.db.commerceOrders",
  invoices: "nexoraxs.db.commerceInvoices",
  setups: "nexoraxs.db.commerceSetups",
  mediaAssets: "nexoraxs.db.mediaAssets",
  workspaceStorageUsage: "nexoraxs.db.workspaceStorageUsage",
  theme: "nexoraxs.ui.theme",
  demo: "nexoraxs.session.demo",
  locale: "nexoraxs.session.locale",
  currentUserId: "nexoraxs.session.currentUserId",
  currentWorkspaceId: "nexoraxs.session.currentWorkspaceId",
  currentBusinessUnitId: "nexoraxs.session.currentBusinessUnitId",
  currentBranchId: "nexoraxs.session.currentBranchId",
  currentOSId: "nexoraxs.session.currentOSId",
  currentOSSubscriptionId: "nexoraxs.session.currentOSSubscriptionId",
  posLastOrderId: "nx_last_order_id",
});

export const createCommerce054Clock = (values: readonly string[]) => {
  let index = 0;
  return () => values[Math.min(index++, values.length - 1)] ?? "2026-01-01T00:00:00.000Z";
};

export const createCommerce054IdFactory = (values: readonly string[]) => {
  let index = 0;
  return () => values[index++] ?? `id-${index}`;
};

export async function seedCommerce054Demo(page: Page, guard: string): Promise<void> {
  await page.addInitScript(({ keys, seedGuard }) => {
    if (window.sessionStorage.getItem(seedGuard)) return;
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem(keys.demo, JSON.stringify("1"));
    window.sessionStorage.setItem(seedGuard, "1");
  }, { keys: COMMERCE_054_KEYS, seedGuard: guard });
}

export async function snapshotCommerce054Storage(page: Page): Promise<Record<string, string | null>> {
  return page.evaluate((keys) => {
    const snapshot: Record<string, string | null> = {};
    for (const key of Object.values(keys)) {
      snapshot[`local:${key}`] = window.localStorage.getItem(key);
      snapshot[`session:${key}`] = window.sessionStorage.getItem(key);
    }
    return snapshot;
  }, COMMERCE_054_KEYS);
}

export async function restoreCommerce054Storage(
  page: Page,
  snapshot: Readonly<Record<string, string | null>>,
): Promise<void> {
  await page.evaluate((entries) => {
    for (const [qualifiedKey, value] of Object.entries(entries)) {
      const separator = qualifiedKey.indexOf(":");
      const target = qualifiedKey.slice(0, separator);
      const key = qualifiedKey.slice(separator + 1);
      const storage = target === "local" ? window.localStorage : window.sessionStorage;
      if (value === null) storage.removeItem(key);
      else storage.setItem(key, value);
    }
  }, snapshot);
}
