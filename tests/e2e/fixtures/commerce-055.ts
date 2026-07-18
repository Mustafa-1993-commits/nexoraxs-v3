import type { Page } from "@playwright/test";
import { legacyCommerceDemoSeed } from "../../../apps/commerce/features/setup/infrastructure/legacy-commerce-demo-seed";
import { seedDB, STORAGE_KEYS } from "../../../packages/shared/src";

export const COMMERCE_055_IDS = Object.freeze({
  workspaceId: "ws_001",
  legacyBusinessUnitId: "bu_001",
  branchId: "br_001",
  customerId: "commerce-055-customer",
  foreignWorkspaceId: "commerce-055-foreign-workspace",
  foreignBranchId: "commerce-055-foreign-branch",
});

export const COMMERCE_055_KEYS = Object.freeze({
  products: STORAGE_KEYS.products,
  customers: STORAGE_KEYS.customers,
  inventory: STORAGE_KEYS.branchInventory,
  movements: STORAGE_KEYS.stockMovements,
  orders: STORAGE_KEYS.orders,
  invoices: STORAGE_KEYS.invoices,
  lastOrder: STORAGE_KEYS.posLastOrderId,
});

export type Commerce055StorageSnapshot = Readonly<{
  local: Readonly<Record<string, string | null>>;
  session: Readonly<Record<string, string | null>>;
}>;

function fixtureSeed() {
  return { ...seedDB("en", "light"), ...legacyCommerceDemoSeed() };
}

export async function seedCommerce055(page: Page, guard = "commerce-055-seeded"): Promise<void> {
  const seed = fixtureSeed();
  await page.addInitScript(({ data, keys, seedGuard }) => {
    if (window.sessionStorage.getItem(seedGuard)) return;
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.setItem(keys.products, JSON.stringify(data.commerceProducts));
    window.localStorage.setItem(keys.customers, JSON.stringify(data.commerceCustomers));
    window.localStorage.setItem(keys.inventory, JSON.stringify([]));
    window.localStorage.setItem(keys.movements, JSON.stringify([]));
    window.localStorage.setItem(keys.orders, JSON.stringify(data.commerceOrders));
    window.localStorage.setItem(keys.invoices, JSON.stringify(data.commerceInvoices));
    window.sessionStorage.setItem("nexoraxs.session.demo", JSON.stringify("1"));
    window.sessionStorage.setItem("nexoraxs.session.currentUserId", JSON.stringify(data.currentUserId));
    window.sessionStorage.setItem("nexoraxs.session.currentWorkspaceId", JSON.stringify(data.currentWorkspaceId));
    window.sessionStorage.setItem("nexoraxs.session.currentBusinessUnitId", JSON.stringify(data.currentBusinessUnitId));
    window.sessionStorage.setItem("nexoraxs.session.currentBranchId", JSON.stringify(data.currentBranchId));
    window.sessionStorage.setItem("nexoraxs.session.currentOSId", JSON.stringify("commerce"));
    window.sessionStorage.setItem("nexoraxs.session.currentOSSubscriptionId", JSON.stringify(data.currentOSSubscriptionId));
    window.sessionStorage.setItem(seedGuard, "1");
  }, { data: seed, keys: COMMERCE_055_KEYS, seedGuard: guard });
}

export async function snapshotCommerce055(page: Page): Promise<Commerce055StorageSnapshot> {
  return page.evaluate((keys) => {
    const local: Record<string, string | null> = {};
    const session: Record<string, string | null> = {};
    for (const key of Object.values(keys)) {
      local[key] = window.localStorage.getItem(key);
      session[key] = window.sessionStorage.getItem(key);
    }
    return { local, session };
  }, COMMERCE_055_KEYS);
}

export async function setCommerce055Locale(page: Page, locale: "en" | "ar"): Promise<void> {
  await page.addInitScript((value) => {
    window.sessionStorage.setItem("nexoraxs.session.locale", JSON.stringify(value));
  }, locale);
}
