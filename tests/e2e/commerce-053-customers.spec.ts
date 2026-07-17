import { expect, test } from "@playwright/test";
import { COMMERCE_053_KEYS, readCommerce053Collection, seedCommerce053Demo } from "./fixtures/commerce-053";

test.describe("Feature 053 repository-backed Customers", () => {
  test.setTimeout(180_000);
  test("preserves validation, create/update persistence, POS selection, IDs, and routes", async ({ page }) => {
    await seedCommerce053Demo(page, "nexoraxs.e2e.commerce-053.customers");
    await page.goto("/customers");
    await expect(page.getByRole("heading", { name: "Customers", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Add Customer" }).first().click();
    await page.getByRole("button", { name: "Add customer", exact: true }).click();
    await expect(page.locator("#customer-name-error")).toHaveText("Name is required");
    await page.getByPlaceholder("Ahmed Hassan").fill("Repository Customer");
    await page.getByPlaceholder("01000000000").fill("0100000053");
    await page.getByRole("button", { name: "Add customer", exact: true }).click();
    await expect(page.getByText("Repository Customer", { exact: true }).first()).toBeVisible();
    const customer = (await readCommerce053Collection<{ id: string; name: string }>(page, COMMERCE_053_KEYS.customers)).find((record) => record.name === "Repository Customer");
    expect(customer?.id).toMatch(/^cust_/);
    await page.goto(`/customers/${customer?.id}`);
    await page.getByRole("button", { name: "Edit" }).click();
    await page.locator("input.nx-input").first().fill("Repository Customer Updated");
    await page.getByRole("button", { name: "Save", exact: true }).click();
    await page.reload();
    await expect(page.getByRole("heading", { name: "Repository Customer Updated" })).toBeVisible();
    await page.goto("/pos");
    await page.getByText("Walk-in customer", { exact: true }).click();
    await page.getByPlaceholder("Search name, phone or email...").fill("Repository Customer Updated");
    await expect(page.getByText("Repository Customer Updated", { exact: true })).toBeVisible();
  });
});
