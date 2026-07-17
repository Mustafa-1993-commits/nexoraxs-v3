import { expect, test } from "@playwright/test";
import {
  COMMERCE_053_KEYS,
  readCommerce053Collection,
  seedCommerce053Demo,
} from "./fixtures/commerce-053";

test.describe("Feature 053 pre-change Commerce characterization", () => {
  test.setTimeout(240_000);

  test("captures Customer list/create/detail/update and POS selection compatibility", async ({ page }) => {
    await seedCommerce053Demo(page, "nexoraxs.e2e.commerce-053.customer-characterization");
    await page.goto("/customers");
    await expect(page.getByRole("heading", { name: "Customers", exact: true })).toBeVisible();
    await expect(page.getByText("No customers yet", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "Add Customer" }).first().click();
    await page.getByPlaceholder("Ahmed Hassan").fill("Characterized Customer");
    await page.getByPlaceholder("01000000000").fill("01000000053");
    await page.getByRole("button", { name: "Add customer", exact: true }).click();
    await expect(page.getByText("Characterized Customer", { exact: true }).first()).toBeVisible();
    await page.getByPlaceholder("Search name, phone or email…").fill("missing-customer");
    await expect(page.getByText("No customers match your search", { exact: true })).toBeVisible();
    await page.getByPlaceholder("Search name, phone or email…").fill("01000000053");
    await page.getByText("Characterized Customer", { exact: true }).first().click();
    await expect(page.getByText("Total orders", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "View full profile" })).toBeVisible();
    await page.getByRole("button", { name: "View full profile" }).click();

    const created = (await readCommerce053Collection<Record<string, unknown>>(
      page,
      COMMERCE_053_KEYS.customers,
    )).find((customer) => customer.name === "Characterized Customer");
    expect(created?.id).toMatch(/^cust_/);
    expect(created).toMatchObject({
      workspaceId: "ws_001",
      businessUnitId: "bu_001",
      branchId: "br_001",
    });

    await expect(page).toHaveURL(`/customers/${String(created?.id)}`);
    await expect(page.getByRole("heading", { name: "Characterized Customer" })).toBeVisible();
    await page.getByRole("button", { name: "Edit" }).click();
    const nameInput = page.locator('input.nx-input').first();
    await nameInput.fill("Characterized Customer Updated");
    await page.getByRole("button", { name: "Save", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Characterized Customer Updated" })).toBeVisible();

    await page.reload();
    await expect(page.getByRole("heading", { name: "Characterized Customer Updated" })).toBeVisible();
    await page.goto("/pos");
    await expect(page.getByPlaceholder("Scan barcode or search products (/)")).toBeVisible();
    await page.getByText("Walk-in customer", { exact: true }).click();
    await page.getByPlaceholder("Search name, phone or email...").fill("Characterized Customer Updated");
    await expect(page.getByText("Characterized Customer Updated", { exact: true })).toBeVisible();
  });

  test("captures Inventory, Order, Invoice, and document routes with linked stored snapshots", async ({ page }) => {
    await seedCommerce053Demo(page, "nexoraxs.e2e.commerce-053.read-characterization");
    await page.goto("/dashboard");
    await page.evaluate((keys) => {
      const scope = { workspaceId: "ws_001", businessUnitId: "bu_001", branchId: "br_001" };
      const customer = {
        id: "cust-053-linked", ...scope, name: "Linked Customer", phone: "010053", email: "", notes: "",
        createdAt: "2026-07-17T10:00:00.000Z", updatedAt: "2026-07-17T10:00:00.000Z",
      };
      const item = { productId: "p1", name: "Panadol Extra 24 tabs", qty: 1, price: 120, taxable: true, sku: "MED-0001" };
      const order = {
        id: "ord-053-linked", orderNumber: "ORD-053", ...scope, customerId: customer.id, items: [item],
        payment: "cash", discount: 0, vat: 0, subtotal: 120, total: 120, net: 120,
        cashierId: "u1", cashierName: "Mustafa Ali", createdAt: "2026-07-17T10:00:00.000Z",
      };
      const invoice = {
        id: "inv-053-linked", invoiceNumber: "INV-053", orderId: order.id, ...scope,
        customerId: customer.id, items: [item], subtotal: 120, discount: 0, vat: 0, total: 120,
        net: 120, cashierId: "u1", cashierName: "Mustafa Ali", createdAt: "2026-07-17T10:00:00.000Z",
      };
      localStorage.setItem(keys.customers, JSON.stringify([customer]));
      localStorage.setItem(keys.orders, JSON.stringify([order]));
      localStorage.setItem(keys.invoices, JSON.stringify([invoice]));
      localStorage.setItem(keys.inventory, JSON.stringify([{
        id: "bi-053", ...scope, productId: "p1", qty: 4, lowStockThreshold: 5,
        updatedAt: "2026-07-17T10:00:00.000Z",
      }]));
    }, COMMERCE_053_KEYS);

    await page.reload();
    await page.goto("/inventory");
    await expect(page.getByRole("heading", { name: "Inventory" })).toBeVisible();
    await expect(page.getByTestId("inventory-stock-p1")).toContainText("4");
    await page.getByPlaceholder("Search products…").fill("missing-product");
    await expect(page.getByText("No products match your filter", { exact: true })).toBeVisible();
    await page.getByPlaceholder("Search products…").fill("MED-0001");
    await page.getByRole("button", { name: "Low stock", exact: true }).click();
    await expect(page.getByTestId("inventory-row-p1")).toBeVisible();
    await page.getByTestId("inventory-update-p1").click();
    await page.getByTestId("stock-quantity-input").fill("6");
    await page.getByTestId("save-stock-button").click();
    await page.getByRole("button", { name: "All", exact: true }).click();
    await expect(page.getByTestId("inventory-stock-p1")).toContainText("6");

    await page.goto("/orders");
    await expect(page.getByTestId("order-row-ord-053-linked")).toContainText("ORD-053");
    await page.getByPlaceholder("Search by order number…").fill("missing-order");
    await expect(page.getByText("No orders match your filter", { exact: true })).toBeVisible();
    await page.getByPlaceholder("Search by order number…").fill("ORD-053");
    await page.getByRole("button", { name: "Cash", exact: true }).click();
    await page.getByTestId("order-detail-link-ord-053-linked").click();
    await expect(page.getByRole("heading", { name: "ORD-053" })).toBeVisible();
    await expect(page.getByText("Linked Customer", { exact: true })).toBeVisible();

    await page.goto("/invoices");
    await expect(page.getByText("INV-053", { exact: true }).first()).toBeVisible();
    await page.getByPlaceholder("Search invoices…").fill("missing-invoice");
    await expect(page.getByText("No invoices match your search", { exact: true })).toBeVisible();
    await page.getByPlaceholder("Search invoices…").fill("INV-053");
    await page.goto("/invoices/inv-053-linked");
    await expect(page.getByRole("heading", { name: "INV-053" })).toBeVisible();
    await page.goto("/invoices/inv-053-linked/document");
    await expect(page.getByTestId("invoice-doc-invoice-number")).toHaveText("INV-053");
  });
});
