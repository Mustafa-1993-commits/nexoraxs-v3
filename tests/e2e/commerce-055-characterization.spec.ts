import { expect, test } from "@playwright/test";
import { COMMERCE_054_KEYS, seedCommerce054Demo } from "./fixtures/commerce-054";

test.describe("Feature 055 POS draft characterization", () => {
  test.setTimeout(240_000);

  test("preserves transient cart, quantity, discount, Customer, and no-Order behavior", async ({ page }) => {
    await seedCommerce054Demo(page, "nexoraxs.e2e.commerce-055.pos-characterization");
    await page.goto("/pos");
    const product = page.getByTestId("pos-product-p1");
    await product.click();
    await product.click();
    const cartItem = page.getByTestId("cart-item-p1");
    await expect(cartItem).toBeVisible();
    await expect(cartItem.locator(".nx-qty span")).toHaveText("2");
    await cartItem.locator(".nx-qty button").first().click();
    await cartItem.locator(".nx-qty button").first().click();
    await expect(cartItem.locator(".nx-qty span")).toHaveText("1");

    const discount = page.locator('input[type="number"]').first();
    await discount.fill("12.5");
    await expect(discount).toHaveValue("12.5");

    await page.getByText("Walk-in customer", { exact: true }).first().click();
    await expect(page.getByText("Attach a customer or continue as guest.", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Add new customer" }).click();
    await expect(page.getByText("Saved to this business and linked to the sale.", { exact: true })).toBeVisible();
    await page.keyboard.press("Escape");

    const orders = await page.evaluate((key) => window.localStorage.getItem(key), COMMERCE_054_KEYS.orders);
    expect(JSON.parse(orders ?? "[]")).toEqual([]);
    await expect(page.locator('input[aria-label*="price" i]')).toHaveCount(0);
  });
});
