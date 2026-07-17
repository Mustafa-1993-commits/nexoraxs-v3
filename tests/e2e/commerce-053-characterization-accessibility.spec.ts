import { expect, test } from "@playwright/test";
import { seedCommerce053Demo } from "./fixtures/commerce-053";

test.describe("Feature 053 pre-change language and accessibility characterization", () => {
  test.setTimeout(180_000);

  test("captures LTR/RTL direction and keyboard reachable Customer controls", async ({ page }) => {
    await seedCommerce053Demo(page, "nexoraxs.e2e.commerce-053.a11y-characterization");
    await page.goto("/customers");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await page.getByRole("button", { name: "Add Customer" }).first().focus();
    await expect(page.getByRole("button", { name: "Add Customer" }).first()).toBeFocused();

    await page.goto("/dashboard");
    await page.getByRole("button", { name: "ع" }).click();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await page.getByRole("button", { name: "EN", exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  });
});
