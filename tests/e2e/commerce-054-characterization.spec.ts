import { expect, test } from "@playwright/test";
import { COMMERCE_054_KEYS, seedCommerce054Demo, snapshotCommerce054Storage } from "./fixtures/commerce-054";

test.describe("Feature 054 pre-movement behavior characterization", () => {
  test.setTimeout(240_000);

  test("preserves routes, Product/Customer references, Inventory, Orders, Invoices, and refresh", async ({ page }) => {
    await seedCommerce054Demo(page, "nexoraxs.e2e.commerce-054.characterization");
    await page.goto("/products");
    await expect(page.getByRole("heading", { name: "Products", exact: true })).toBeVisible();
    await page.goto("/customers");
    await expect(page.getByRole("heading", { name: "Customers", exact: true })).toBeVisible();
    await page.goto("/inventory");
    await expect(page.getByRole("heading", { name: "Inventory", exact: true })).toBeVisible();
    await page.goto("/orders");
    await expect(page.getByRole("heading", { name: "Orders", exact: true })).toBeVisible();
    await page.goto("/invoices");
    await expect(page.getByRole("heading", { name: "Invoices", exact: true })).toBeVisible();

    const before = await snapshotCommerce054Storage(page);
    await page.reload();
    const after = await snapshotCommerce054Storage(page);
    for (const key of Object.values(COMMERCE_054_KEYS)) {
      expect(after[`local:${key}`]).toBe(before[`local:${key}`]);
    }
  });

  test("keeps explicit empty and recoverable read states", async ({ page }) => {
    await seedCommerce054Demo(page, "nexoraxs.e2e.commerce-054.states");
    await page.goto("/customers");
    await expect(page.getByText("No customers yet", { exact: true })).toBeVisible();
    await page.getByPlaceholder("Search name, phone or email…").fill("not-present");
    await expect(page.getByText(/No customers/)).toBeVisible();
  });
});
