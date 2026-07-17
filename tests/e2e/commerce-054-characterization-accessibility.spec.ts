import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { seedCommerce054Demo } from "./fixtures/commerce-054";

test.describe("Feature 054 pre-movement localization and accessibility characterization", () => {
  test.setTimeout(180_000);

  test("preserves English/LTR, Arabic/RTL, keyboard focus, and critical axe behavior", async ({ page }) => {
    await seedCommerce054Demo(page, "nexoraxs.e2e.commerce-054.accessibility");
    await page.goto("/customers");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    const addCustomer = page.getByRole("button", { name: "Add Customer" }).first();
    await addCustomer.focus();
    await expect(addCustomer).toBeFocused();

    await page.goto("/dashboard");
    await page.getByRole("button", { name: "ع" }).click();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("main")).toBeVisible();
    const results = await new AxeBuilder({ page }).include("main").analyze();
    expect(results.violations.filter((violation) => violation.impact === "critical")).toEqual([]);
  });
});
