import { expect, test, type Page } from "@playwright/test";

const DEMO_FLAG = "nexoraxs.session.demo";
const PRODUCTS_KEY = "nexoraxs.db.commerceProducts";
const SEED_GUARD = "nexoraxs.e2e.products-052.regression-seeded";

async function seedProducts(page: Page) {
  await page.addInitScript(({ demoFlag, seedGuard }) => {
    if (window.sessionStorage.getItem(seedGuard)) return;
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem(demoFlag, JSON.stringify("1"));
    window.sessionStorage.setItem(seedGuard, "1");
  }, { demoFlag: DEMO_FLAG, seedGuard: SEED_GUARD });
}

test.describe("Feature 052 Products repository cutover", () => {
  test.setTimeout(180_000);

  test("preserves list/create/edit routes, IDs, unknown fields, and refresh persistence", async ({ page }) => {
    await seedProducts(page);
    await page.goto("/products");

    await expect(page).toHaveURL(/\/products$/);
    await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();
    await expect(page.getByText("Panadol Extra 24 tabs", { exact: true })).toBeVisible();
    await expect(page.getByText("Centrum Multivitamin 30", { exact: true })).toBeVisible();

    await page.getByRole("link", { name: "Add Product" }).click();
    await expect(page).toHaveURL(/\/products\/new$/);
    await page.getByLabel("Product name").fill("Repository Flow Product");
    await page.getByLabel("SKU").fill("REPO-052");
    await page.getByLabel("Price (EGP)").fill("155");
    await page.getByRole("button", { name: "Add product" }).click();

    await expect(page).toHaveURL(/\/products$/);
    await expect(page.getByText("Repository Flow Product", { exact: true })).toBeVisible();
    const created = await page.evaluate((key) => {
      const products = JSON.parse(window.localStorage.getItem(key) || "[]") as Array<Record<string, unknown>>;
      return products.find((product) => product.sku === "REPO-052")!;
    }, PRODUCTS_KEY);
    expect(created.id).toMatch(/^p_/);

    await page.evaluate(({ key, id }) => {
      const products = JSON.parse(window.localStorage.getItem(key) || "[]") as Array<Record<string, unknown>>;
      window.localStorage.setItem(key, JSON.stringify(products.map((product) => (
        product.id === id ? { ...product, feature052OpaqueMarker: { preserved: true } } : product
      ))));
    }, { key: PRODUCTS_KEY, id: created.id });

    await page.reload();
    await expect(page.getByText("Repository Flow Product", { exact: true })).toBeVisible();
    await page.goto(`/products/new?edit=${created.id}`);
    await expect(page.getByRole("heading", { name: "Edit product" })).toBeVisible();
    await page.getByLabel("Product name").fill("Repository Flow Product Updated");
    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page).toHaveURL(/\/products$/);
    await page.reload();
    await expect(page.getByText("Repository Flow Product Updated", { exact: true })).toBeVisible();
    const after = await page.evaluate((key) => JSON.parse(window.localStorage.getItem(key) || "[]"), PRODUCTS_KEY);
    expect(after.slice(0, 2).map((product: { id: string }) => product.id)).toEqual(["p1", "p2"]);
    expect(after.find((product: { id: string }) => product.id === created.id)).toMatchObject({
      id: created.id,
      feature052OpaqueMarker: { preserved: true },
    });
  });

  test("preserves the visible search and edit affordances", async ({ page }) => {
    await seedProducts(page);
    await page.goto("/products");

    await page.getByPlaceholder("Search name, SKU or barcode…").fill("no-match-052");
    await expect(page.getByRole("heading", { name: "No products match your search" })).toBeVisible();
    await page.getByPlaceholder("Search name, SKU or barcode…").fill("MED-0001");
    await expect(page.getByText("Panadol Extra 24 tabs", { exact: true })).toBeVisible();
    await page.getByRole("link", { name: "Edit product" }).first().click();
    await expect(page).toHaveURL(/\/products\/new\?edit=p1$/);
  });
});
