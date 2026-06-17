import { expect, test } from "@playwright/test";
import { commercePath } from "./helpers/app-urls";
import { expectNoBusinessUnitCopy, expectNoFatalAppCrash } from "./helpers/assertions";
import { addCustomer, addProduct } from "./helpers/commerce-flow";
import { latestOrderRefs, openSeededCommerce } from "./helpers/reset";

test.describe("Commerce OS 3002 MVP flow", () => {
  test.setTimeout(300_000);

  test("covers setup-complete product/customer/POS sale, invoice, orders, customers, and reports", async ({ page }) => {
    await openSeededCommerce(page);
    await expect(page.getByTestId("commerce-dashboard")).toBeVisible();
    await expectNoBusinessUnitCopy(page);
    await expectNoFatalAppCrash(page);

    await addProduct(page, "E2E Test Product");
    await expect(page.getByTestId("product-list")).toContainText("E2E Test Product");
    await expectNoBusinessUnitCopy(page);

    await addCustomer(page, "E2E Customer");
    await expect(page.getByTestId("customers-list")).toContainText("E2E Customer");

    await page.goto(commercePath("/pos"));
    await expect(page.getByTestId("pos-page")).toBeVisible();
    await expect(page.locator("body")).toContainText("E2E Test Product");
    await page.getByRole("button", { name: /E2E Test Product/ }).click();
    await page.getByTestId("customer-picker").click();
    await expect(page.getByTestId("customer-picker-modal")).toBeVisible();
    await page.getByRole("button", { name: /E2E Customer/ }).click();
    await page.getByTestId("checkout-button").click();
    await expect(page.getByTestId("checkout-modal")).toBeVisible();
    await expect(page.getByTestId("checkout-modal")).toContainText(/Cashier|E2E Customer/);
    await page.getByTestId("complete-sale-button").click();

    await expect(page).toHaveURL(/\/pos\/success$/);
    await expect(page.getByTestId("receipt-preview")).toBeVisible();
    await expect(page.getByTestId("receipt-preview")).toContainText(/E2E Retail|Main Branch|E2E Customer|Total/);

    const refs = await latestOrderRefs(page);
    await page.getByRole("link", { name: "View Invoice" }).click();
    await expect(page.getByTestId("invoice-document")).toBeVisible();
    await expect(page.getByTestId("invoice-document")).toContainText(/Salesperson|Total due/);
    await expect(page.getByTestId("invoice-doc-order-number")).toHaveText(refs.orderNumber);

    await page.goto(commercePath("/orders"));
    await expect(page.getByTestId("orders-list")).toContainText(refs.orderNumber);

    await page.goto(commercePath("/customers"));
    await expect(page.getByTestId("customers-list")).toContainText("E2E Customer");

    await page.goto(commercePath("/reports"));
    await expect(page.getByTestId("reports-page")).toBeVisible();
    await expect(page.getByTestId("reports-gross-sales")).toBeVisible();
    await expect(page.getByTestId("reports-net-sales")).toBeVisible();

    await page.reload();
    await expect(page.getByTestId("reports-page")).toBeVisible();
    await expectNoFatalAppCrash(page);
    await expectNoBusinessUnitCopy(page);
  });
});
