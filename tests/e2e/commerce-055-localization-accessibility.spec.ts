import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { seedCommerce054Demo } from "./fixtures/commerce-054";

test.describe("Feature 055 localized accessible POS commands", () => {
  test.setTimeout(240_000);

  test("preserves LTR/RTL, keyboard operation, focus, semantics, and critical axe behavior", async ({ page }) => {
    await seedCommerce054Demo(page, "nexoraxs.e2e.commerce-055.accessibility");
    await page.goto("/pos");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    const search = page.getByPlaceholder("Scan barcode or search products (/)");
    await page.getByTestId("pos-product-p1").focus();
    await page.keyboard.press("/");
    await expect(search).toBeFocused();
    await page.getByTestId("pos-product-p1").click();
    await page.keyboard.press("F2");
    const complete = page.getByTestId("complete-sale-button");
    await expect(complete).toBeVisible();
    await expect(complete).toHaveAttribute("aria-busy", "false");
    await page.keyboard.press("Escape");
    await expect(complete).not.toBeVisible();

    await page.goto("/dashboard");
    await page.getByRole("button", { name: "ع" }).click();
    await page.goto("/pos");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("link", { name: "Back to dashboard" })).toBeVisible();
    const results = await new AxeBuilder({ page }).include(".nx-pos").analyze();
    expect(results.violations.filter((violation) => violation.impact === "critical")).toEqual([]);
  });
});
