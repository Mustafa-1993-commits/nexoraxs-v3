import type { Page } from "@playwright/test";

export const COMMERCE_053_KEYS = {
  products: "nexoraxs.db.commerceProducts",
  customers: "nexoraxs.db.commerceCustomers",
  inventory: "nexoraxs.db.branchInventory",
  orders: "nexoraxs.db.commerceOrders",
  invoices: "nexoraxs.db.commerceInvoices",
} as const;

const DEMO_FLAG = "nexoraxs.session.demo";

export async function seedCommerce053Demo(page: Page, guard: string): Promise<void> {
  await page.addInitScript(({ demoFlag, seedGuard }) => {
    if (window.sessionStorage.getItem(seedGuard)) return;
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem(demoFlag, JSON.stringify("1"));
    window.sessionStorage.setItem(seedGuard, "1");
  }, { demoFlag: DEMO_FLAG, seedGuard: guard });
}

export async function readCommerce053Collection<T>(page: Page, key: string): Promise<T[]> {
  return page.evaluate((storageKey) => {
    return JSON.parse(window.localStorage.getItem(storageKey) || "[]") as T[];
  }, key);
}

export async function snapshotCommerce053Storage(page: Page): Promise<Record<string, string | null>> {
  return page.evaluate((keys) => Object.fromEntries(
    Object.values(keys).map((key) => [key, window.localStorage.getItem(key)]),
  ), COMMERCE_053_KEYS);
}

export async function restoreCommerce053Storage(
  page: Page,
  snapshot: Readonly<Record<string, string | null>>,
): Promise<void> {
  await page.evaluate((entries) => {
    for (const [key, value] of Object.entries(entries)) {
      if (value === null) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, value);
    }
  }, snapshot);
}
