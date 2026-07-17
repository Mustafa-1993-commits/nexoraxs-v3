import { expect, test } from "@playwright/test";
import { COMMERCE_053_KEYS, seedCommerce053Demo } from "./fixtures/commerce-053";

test.describe("Feature 053 read-only Commerce projections", () => {
  test.setTimeout(180_000);
  test("reads linked Inventory, Order, and Invoice snapshots and observes retained stock writes", async ({ page }) => {
    await seedCommerce053Demo(page, "nexoraxs.e2e.commerce-053.read-models");
    await page.goto("/dashboard");
    await page.evaluate((keys) => {
      const scope = { workspaceId: "ws_001", businessUnitId: "bu_001", branchId: "br_001" };
      const customer = { id: "cust-read", ...scope, name: "Read Customer", phone: "053", email: "", notes: "", createdAt: "2026-07-17T10:00:00Z", updatedAt: "2026-07-17T10:00:00Z" };
      const item = { productId: "p1", name: "Stored Snapshot Name", qty: 1, price: 321, taxable: true, sku: "MED-0001" };
      const order = { id: "order-read", orderNumber: "ORD-READ", ...scope, customerId: customer.id, items: [item], payment: "cash", discount: 7, vat: 11, subtotal: 321, total: 325, net: 314, cashierId: "u1", cashierName: "Cashier", createdAt: "2026-07-17T10:00:00Z" };
      const invoice = { id: "invoice-read", invoiceNumber: "INV-READ", orderId: order.id, ...scope, customerId: customer.id, items: [item], subtotal: 321, discount: 7, vat: 11, total: 325, net: 314, cashierId: "u1", cashierName: "Cashier", createdAt: "2026-07-17T10:00:00Z" };
      localStorage.setItem(keys.customers, JSON.stringify([customer])); localStorage.setItem(keys.orders, JSON.stringify([order])); localStorage.setItem(keys.invoices, JSON.stringify([invoice]));
      localStorage.setItem(keys.inventory, JSON.stringify([{ id: "inventory-read", ...scope, productId: "p1", qty: 4, lowStockThreshold: 5, updatedAt: "2026-07-17T10:00:00Z" }]));
    }, COMMERCE_053_KEYS);
    await page.reload();
    await page.goto("/inventory");
    await expect(page.getByTestId("inventory-stock-p1")).toContainText("4");
    await page.getByTestId("inventory-update-p1").click(); await page.getByTestId("stock-quantity-input").fill("6"); await page.getByTestId("save-stock-button").click();
    await expect(page.getByTestId("inventory-stock-p1")).toContainText("6");
    await page.goto("/orders"); await expect(page.getByTestId("order-row-order-read")).toContainText("325");
    await page.getByTestId("order-detail-link-order-read").click(); await expect(page.getByRole("heading", { name: "ORD-READ" })).toBeVisible(); await expect(page.getByText("Read Customer", { exact: true })).toBeVisible();
    await page.goto("/invoices/invoice-read"); await expect(page.getByRole("heading", { name: "INV-READ" })).toBeVisible(); await expect(page.getByTestId("invoice-total")).toContainText("325");
    await page.goto("/invoices/invoice-read/document"); await expect(page.getByTestId("invoice-doc-order-number")).toHaveText("ORD-READ");
  });
});
