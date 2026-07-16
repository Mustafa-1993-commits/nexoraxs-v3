import { expect, test, type Page } from "@playwright/test";

async function seedDemo(page: Page) {
  await page.addInitScript(() => {
    if (window.sessionStorage.getItem("nexoraxs.e2e.products-052.compat-seeded")) return;
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem("nexoraxs.session.demo", JSON.stringify("1"));
    window.sessionStorage.setItem("nexoraxs.e2e.products-052.compat-seeded", "1");
  });
}

test("new Product path feeds legacy POS and Inventory readers through compatibility state", async ({ page }) => {
  test.setTimeout(180_000);
  await seedDemo(page);
  await page.goto("/products/new");
  await page.getByLabel("Product name").fill("Legacy Reader Product 052");
  await page.getByLabel("SKU").fill("LEGACY-READER-052");
  await page.getByLabel("Price (EGP)").fill("75");
  await page.getByLabel("Stock quantity").fill("12");
  await page.getByRole("button", { name: "Add product" }).click();

  await page.goto("/pos");
  await expect(page.getByText("Legacy Reader Product 052", { exact: true })).toBeVisible();
  await page.goto("/inventory");
  await expect(page.getByText("Legacy Reader Product 052", { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText("Legacy Reader Product 052", { exact: true })).toBeVisible();
});
