import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const DEMO_FLAG = "nexoraxs.session.demo";
const LOCALE_KEY = "nexoraxs.session.locale";
const SEED_GUARD = "nexoraxs.e2e.products-052.a11y-seeded";

async function seedLocale(page: Page, locale: "en" | "ar") {
  await page.addInitScript(({ demoFlag, seedGuard }) => {
    if (window.sessionStorage.getItem(seedGuard)) return;
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem(demoFlag, JSON.stringify("1"));
    window.sessionStorage.setItem(seedGuard, "1");
  }, { demoFlag: DEMO_FLAG, seedGuard: SEED_GUARD });
  await page.goto("/");
  await page.evaluate(({ localeKey, locale }) => {
    window.sessionStorage.setItem(localeKey, JSON.stringify(locale));
  }, { localeKey: LOCALE_KEY, locale });
  await page.reload();
}

test.describe("Feature 052 Products localization and accessibility", () => {
  test.setTimeout(180_000);

  for (const locale of ["en", "ar"] as const) {
    test(`${locale} Product list/form preserves language, direction, naming, and keyboard focus`, async ({ page }) => {
      await seedLocale(page, locale);
      await page.goto("/products");

      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
      await expect(page.getByRole("heading", { name: locale === "ar" ? "المنتجات" : "Products" })).toBeVisible();
      const addName = locale === "ar" ? "إضافة منتج" : "Add Product";
      await expect(page.getByRole("link", { name: addName })).toHaveAttribute("href", "/products/new");

      const axeList = await new AxeBuilder({ page }).include(".nx-page").analyze();
      expect(axeList.violations.filter((violation) => violation.impact === "critical")).toEqual([]);

      await page.getByRole("link", { name: addName }).click();
      const productName = page.getByLabel(locale === "ar" ? "اسم المنتج" : "Product name");
      await expect(productName).toBeFocused();
      await productName.fill("قهوة Arabica 052");
      await page.getByLabel(locale === "ar" ? "رمز SKU" : "SKU").fill("MIXED-052");
      await page.getByLabel(locale === "ar" ? "السعر (EGP)" : "Price (EGP)").fill("99");

      await page.keyboard.press("Tab");
      await expect(page.locator(":focus")).not.toHaveCount(0);
      const axeForm = await new AxeBuilder({ page }).include(".nx-page").analyze();
      expect(axeForm.violations.filter((violation) => violation.impact === "critical")).toEqual([]);
    });
  }
});
