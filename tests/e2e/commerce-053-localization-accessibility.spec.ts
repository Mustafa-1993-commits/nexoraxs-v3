import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { seedCommerce053Demo } from "./fixtures/commerce-053";

test.describe("Feature 053 localized accessible recovery", () => {
  test.setTimeout(180_000);
  test("keeps Customer validation keyboard-operable in English and Arabic RTL", async ({ page }) => {
    await seedCommerce053Demo(page, "nexoraxs.e2e.commerce-053.localized");
    await page.goto("/customers");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await page.getByRole("button", { name: "Add Customer" }).first().focus();
    await page.keyboard.press("Enter");
    await expect(page.getByPlaceholder("Ahmed Hassan")).toBeFocused();
    await page.getByRole("button", { name: "Add customer", exact: true }).click();
    await expect(page.locator("#customer-name-error")).toHaveText("Name is required");
    await page.getByRole("button", { name: "Close customer form" }).click();
    await page.getByRole("button", { name: "ع" }).click();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await page.goto("/customers");
    await expect(page.getByRole("heading", { name: "العملاء" })).toBeVisible();
    await expect(page.getByText("لا يوجد عملاء بعد", { exact: true })).toBeVisible();
    const results = await new AxeBuilder({ page }).include(".nx-page").analyze();
    expect(results.violations.filter((violation) => violation.impact === "critical")).toEqual([]);
  });
});
