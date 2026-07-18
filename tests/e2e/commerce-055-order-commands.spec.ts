import { expect, test } from "@playwright/test";
import { COMMERCE_054_KEYS, seedCommerce054Demo } from "./fixtures/commerce-054";

test.describe("Feature 055 Commerce Order commands", () => {
  test.setTimeout(240_000);

  test("completes and refreshes the unchanged anonymous sale journey", async ({ page }) => {
    await seedCommerce054Demo(page, "nexoraxs.e2e.commerce-055.order-success");
    await page.goto("/pos");
    await page.getByTestId("pos-product-p1").click();
    await page.getByTestId("checkout-button").click();
    await page.getByTestId("complete-sale-button").click();
    await expect(page).toHaveURL(/\/pos\/success$/);
    await expect(page.getByRole("heading", { name: "Sale Complete!" })).toBeVisible();

    const persisted = await page.evaluate((keys) => ({
      orders: JSON.parse(localStorage.getItem(keys.orders) ?? "[]"),
      invoices: JSON.parse(localStorage.getItem(keys.invoices) ?? "[]"),
      positions: JSON.parse(localStorage.getItem(keys.inventory) ?? "[]"),
      movements: JSON.parse(localStorage.getItem(keys.stockMovements) ?? "[]"),
      lastOrder: sessionStorage.getItem(keys.posLastOrderId),
    }), COMMERCE_054_KEYS);
    expect(persisted.orders).toHaveLength(1);
    expect(persisted.invoices).toHaveLength(1);
    expect(persisted.invoices[0].orderId).toBe(persisted.orders[0].id);
    expect(persisted.positions.some((record: { productId?: string }) => record.productId === "p1")).toBe(true);
    expect(persisted.movements.some((record: { reference?: { id?: string } }) => record.reference?.id === persisted.orders[0].id)).toBe(true);
    expect(persisted.lastOrder).toBe(persisted.orders[0].id);

    await page.reload();
    await expect(page.getByText(`Order ${persisted.orders[0].orderNumber} has been recorded successfully.`)).toBeVisible();
  });

  test("preserves Customer references through checkout", async ({ page }) => {
    await seedCommerce054Demo(page, "nexoraxs.e2e.commerce-055.customer-order");
    await page.goto("/pos");
    await page.getByText("Walk-in customer", { exact: true }).first().click();
    await page.getByRole("button", { name: "Add new customer" }).click();
    await page.getByPlaceholder("e.g. Aya Hassan").fill("Feature 055 Customer");
    await page.getByRole("button", { name: "Save customer" }).click();
    await page.getByTestId("pos-product-p1").click();
    await page.getByTestId("checkout-button").click();
    await page.getByTestId("complete-sale-button").click();
    await expect(page).toHaveURL(/\/pos\/success$/);
    const references = await page.evaluate((keys) => {
      const orders = JSON.parse(localStorage.getItem(keys.orders) ?? "[]");
      const customers = JSON.parse(localStorage.getItem(keys.customers) ?? "[]");
      return { customerId: orders[0]?.customerId, customerIds: customers.map((customer: { id: string }) => customer.id) };
    }, COMMERCE_054_KEYS);
    expect(references.customerIds).toContain(references.customerId);
  });

  test("keeps insufficient Stock explicit with no automatic retry or Order write", async ({ page }) => {
    await seedCommerce054Demo(page, "nexoraxs.e2e.commerce-055.insufficient");
    await page.goto("/pos");
    await page.getByTestId("pos-product-p1").click();
    await page.getByTestId("checkout-button").click();
    await page.evaluate((keys) => {
      const products = JSON.parse(localStorage.getItem(keys.products) ?? "[]");
      localStorage.setItem(keys.products, JSON.stringify(products.map((product: { id: string; stock: number | null }) => (
        product.id === "p1" ? { ...product, stock: 0 } : product
      ))));
      const positions = JSON.parse(localStorage.getItem(keys.inventory) ?? "[]");
      localStorage.setItem(keys.inventory, JSON.stringify(positions.filter((position: { productId?: string }) => position.productId !== "p1")));
    }, COMMERCE_054_KEYS);
    await page.getByTestId("complete-sale-button").click();
    await expect(page.getByRole("alert").filter({ hasText: "Insufficient stock" })).toBeVisible();
    await expect(page).toHaveURL(/\/pos$/);
    const orders = await page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? "[]"), COMMERCE_054_KEYS.orders);
    expect(orders).toEqual([]);
  });
});
