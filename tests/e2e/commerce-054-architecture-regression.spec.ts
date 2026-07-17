import { expect, test } from "@playwright/test";
import { COMMERCE_054_KEYS, seedCommerce054Demo } from "./fixtures/commerce-054";

test.describe("Feature 054 architecture-hardening route regression", () => {
  test.setTimeout(240_000);

  test("preserves delegated stock, Order, Invoice, Return, refresh, locale, and route behavior", async ({ page }) => {
    await seedCommerce054Demo(page, "nexoraxs.e2e.commerce-054.architecture");
    await page.goto("/inventory");
    await page.getByTestId("inventory-update-p1").click();
    await page.getByTestId("stock-quantity-input").fill("12");
    await page.getByTestId("save-stock-button").click();
    await expect(page.getByTestId("inventory-stock-cell-p1")).toContainText("12");

    await page.goto("/pos");
    await page.getByTestId("pos-product-p1").click();
    await page.getByTestId("checkout-button").click();
    await page.getByTestId("complete-sale-button").click();
    await expect(page).toHaveURL(/\/pos\/success$/);
    const references = await page.evaluate(() => {
      const orders = JSON.parse(localStorage.getItem("nexoraxs.db.commerceOrders") || "[]") as Array<{ id: string }>;
      const invoices = JSON.parse(localStorage.getItem("nexoraxs.db.commerceInvoices") || "[]") as Array<{ id: string; orderId: string }>;
      const order = orders.at(-1)!;
      return { orderId: order.id, invoiceId: invoices.find((invoice) => invoice.orderId === order.id)!.id };
    });

    await page.goto(`/invoices/${references.invoiceId}`);
    await expect(page.getByTestId("invoice-total")).toBeVisible();
    await page.goto(`/orders/${references.orderId}`);
    await page.getByTestId("open-return-button").click();
    await page.getByTestId("return-qty-p1").fill("1");
    await page.getByTestId("return-reason-input").fill("Architecture regression");
    await page.getByTestId("submit-return-button").click();

    await page.goto("/inventory");
    await expect(page.getByTestId("inventory-stock-cell-p1")).toContainText("12");
    await page.reload();
    await expect(page.getByTestId("inventory-stock-cell-p1")).toContainText("12");

    const customerStorage = await page.evaluate(({ keys, orderId }) => {
      const orders = JSON.parse(localStorage.getItem(keys.orders) || "[]") as Array<Record<string, unknown>>;
      localStorage.setItem(keys.orders, JSON.stringify(orders.map((order) => (
        order.id === orderId ? { ...order, customerId: "relationship-customer" } : order
      ))));
      const customers = [{
        id: "relationship-customer",
        workspaceId: "ws_001",
        businessUnitId: "bu_001",
        branchId: "br_001",
        name: "Relationship Customer",
        phone: "",
        email: "",
        notes: "",
        createdAt: "2025-08-12T09:00:00.000Z",
        updatedAt: "2025-08-12T09:00:00.000Z",
      }];
      const serialized = JSON.stringify(customers);
      localStorage.setItem(keys.customers, serialized);
      return serialized;
    }, { keys: COMMERCE_054_KEYS, orderId: references.orderId });
    await page.evaluate((key) => localStorage.setItem(key, "corrupt"), COMMERCE_054_KEYS.customers);
    await page.goto(`/orders/${references.orderId}`);
    await expect(page.getByRole("alert").filter({ hasText: "Orders could not be loaded." }))
      .toContainText("Orders could not be loaded.");
    await page.evaluate(({ key, value }) => localStorage.setItem(key, value), {
      key: COMMERCE_054_KEYS.customers,
      value: customerStorage,
    });
    await page.getByRole("button", { name: "Retry" }).click();
    await expect(page.getByText("Relationship Customer", { exact: true })).toBeVisible();

    await page.goto("/dashboard");
    await page.getByRole("button", { name: "ع" }).click();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });

  test("preserves browser media conversion and persisted Product association", async ({ page }) => {
    await seedCommerce054Demo(page, "nexoraxs.e2e.commerce-054.media");
    await page.goto("/products/new");
    await page.getByLabel("Product name").fill("Architecture Media Product");
    await page.getByLabel("SKU").fill("ARCH-MEDIA-054");
    await page.getByLabel("Price (EGP)").fill("25");
    await page.locator('input[type="file"]').setInputFiles({
      name: "product.png",
      mimeType: "image/png",
      buffer: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
        "base64",
      ),
    });
    await page.getByRole("button", { name: "Add product" }).click();
    await expect(page).toHaveURL(/\/products$/);
    await expect(page.getByText("Architecture Media Product", { exact: true })).toBeVisible();

    const persisted = await page.evaluate((keys) => {
      const products = JSON.parse(localStorage.getItem(keys.products) || "[]") as Array<Record<string, unknown>>;
      const product = products.find((record) => record.sku === "ARCH-MEDIA-054");
      const assets = JSON.parse(localStorage.getItem(keys.mediaAssets) || "[]") as Array<Record<string, unknown>>;
      return { product, asset: assets.find((record) => record.ownerId === product?.id) };
    }, COMMERCE_054_KEYS);
    expect(persisted.product?.image).toMatch(/^data:image\/jpeg;base64,/);
    expect(persisted.asset).toMatchObject({ ownerType: "product_image", fileName: "product.png" });
  });
});
