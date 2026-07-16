import { expect, test, type Page } from "@playwright/test";

const DEMO_FLAG = "nexoraxs.session.demo";
const SEED_GUARD = "nexoraxs.e2e.products-052.seeded";
const PRODUCTS_KEY = "nexoraxs.db.commerceProducts";

type StoredProduct = {
  id: string;
  name: string;
  sku: string;
  workspaceId: string;
  businessUnitId: string;
  [key: string]: unknown;
};

async function seedDemoOnce(page: Page) {
  await page.addInitScript(({ demoFlag, seedGuard }) => {
    if (window.sessionStorage.getItem(seedGuard)) return;
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem(demoFlag, JSON.stringify("1"));
    window.sessionStorage.setItem(seedGuard, "1");
  }, { demoFlag: DEMO_FLAG, seedGuard: SEED_GUARD });
}

async function readProducts(page: Page): Promise<StoredProduct[]> {
  return page.evaluate((key) => {
    return JSON.parse(window.localStorage.getItem(key) || "[]") as StoredProduct[];
  }, PRODUCTS_KEY);
}

test.describe("Feature 052 pre-change Products characterization", () => {
  test.setTimeout(180_000);

  test("preserves routes, seeded IDs, create/edit records, opaque fields, and refresh", async ({ page }) => {
    await seedDemoOnce(page);
    await page.goto("/");
    await expect(page).toHaveURL(/\/dashboard$/);

    await page.goto("/products");
    await expect(page).toHaveURL(/\/products$/);
    await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
    await expect(page.getByText("Panadol Extra 24 tabs", { exact: true })).toBeVisible();
    await expect(page.getByText("Centrum Multivitamin 30", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Add Product" })).toHaveAttribute("href", "/products/new");

    const seeded = await readProducts(page);
    expect(seeded.map((product) => product.id)).toEqual(["p1", "p2"]);
    expect(seeded.every((product) => product.workspaceId && product.businessUnitId)).toBe(true);

    await page.getByRole("link", { name: "Add Product" }).click();
    await expect(page).toHaveURL(/\/products\/new$/);
    await expect(page.getByRole("heading", { name: "Add a product" })).toBeVisible();
    await page.getByLabel("Product name").fill("Feature 052 Characterized Product");
    await page.getByLabel("SKU").fill("CHAR-052");
    await page.getByLabel("Price (EGP)").fill("125");
    await page.getByRole("button", { name: "Add product" }).click();

    await expect(page).toHaveURL(/\/products$/);
    await expect(page.getByText("Feature 052 Characterized Product", { exact: true })).toBeVisible();

    const afterCreate = await readProducts(page);
    const created = afterCreate.find((product) => product.sku === "CHAR-052");
    expect(created).toBeDefined();
    expect(created?.id).toMatch(/^p_/);

    await page.evaluate(({ key, productId }) => {
      const products = JSON.parse(window.localStorage.getItem(key) || "[]") as StoredProduct[];
      window.localStorage.setItem(key, JSON.stringify(products.map((product) => (
        product.id === productId
          ? { ...product, feature052OpaqueMarker: { preserved: true } }
          : product
      ))));
    }, { key: PRODUCTS_KEY, productId: created!.id });

    await page.reload();
    await expect(page.getByText("Feature 052 Characterized Product", { exact: true })).toBeVisible();
    await page.goto(`/products/new?edit=${created!.id}`);
    await expect(page).toHaveURL(new RegExp(`/products/new\\?edit=${created!.id}$`));
    await expect(page.getByRole("heading", { name: "Edit product" })).toBeVisible();
    await page.getByLabel("Product name").fill("Feature 052 Characterized Product Updated");
    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page).toHaveURL(/\/products$/);
    await expect(page.getByText("Feature 052 Characterized Product Updated", { exact: true })).toBeVisible();
    await page.reload();
    await expect(page.getByText("Feature 052 Characterized Product Updated", { exact: true })).toBeVisible();

    const afterEdit = await readProducts(page);
    const updated = afterEdit.find((product) => product.id === created!.id);
    expect(updated?.id).toBe(created!.id);
    expect(updated?.feature052OpaqueMarker).toEqual({ preserved: true });
    expect(afterEdit.map((product) => product.id).slice(0, 2)).toEqual(["p1", "p2"]);
  });
});
