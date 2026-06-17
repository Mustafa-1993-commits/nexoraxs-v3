import { expect, test } from "@playwright/test";
import { commercePath } from "./helpers/app-urls";
import { expectNoFatalAppCrash } from "./helpers/assertions";
import {
  createPosSale,
  currentStock,
  ensureSecondBranch,
  expectProductStock,
  openSeededCommerce,
  setProductStock,
  switchBranch,
} from "./helpers/reset";
import { MAIN_BRANCH, PRODUCT_ID, SECOND_BRANCH } from "./helpers/selectors";

test.describe("Commerce negative and isolation cases", () => {
  test.setTimeout(300_000);

  test("blocks same-branch and insufficient stock transfers without changing stock", async ({ page }) => {
    await openSeededCommerce(page);
    await ensureSecondBranch(page, SECOND_BRANCH);
    await switchBranch(page, MAIN_BRANCH);
    await setProductStock(page, 2);

    await page.goto(commercePath("/inventory/transfers"));
    await expect(page.getByTestId("transfer-form")).toBeVisible();
    await expect(page.getByTestId("transfer-to-branch")).not.toContainText(MAIN_BRANCH);

    await page.getByTestId("add-transfer-item").click();
    await page.getByTestId("transfer-product-0").selectOption(PRODUCT_ID);
    await page.getByTestId("transfer-qty-0").fill("99");
    await page.getByTestId("submit-transfer").click();
    await expect(page.locator("body")).toContainText(/Insufficient stock/i);
    await expectProductStock(page, 2);
  });

  test("blocks POS sale when cart quantity exceeds branch stock", async ({ page }) => {
    await openSeededCommerce(page);
    await switchBranch(page, MAIN_BRANCH);
    await setProductStock(page, 1);

    await page.goto(commercePath("/pos"));
    await page.getByTestId(`pos-product-${PRODUCT_ID}`).click();
    await page.getByTestId(`pos-product-${PRODUCT_ID}`).click();
    await page.getByTestId("checkout-button").click();
    await page.getByTestId("complete-sale-button").click();
    await expect(page).toHaveURL(/\/pos$/);
    await expect(page.locator("body")).toContainText(/Insufficient stock/i);
    expect(await currentStock(page)).toBe(1);
  });

  test("prevents a second return after full quantity is returned and preserves invoice totals", async ({ page }) => {
    await openSeededCommerce(page);
    await switchBranch(page, MAIN_BRANCH);
    await setProductStock(page, 5);
    const refs = await createPosSale(page);

    await page.goto(commercePath(`/invoices/${refs.invoiceId}`));
    const originalInvoiceTotal = await page.getByTestId("invoice-total").textContent();

    await page.goto(commercePath(`/orders/${refs.orderId}`));
    await page.getByTestId("open-return-button").click();
    await expect(page.getByTestId("return-modal")).toBeVisible();
    await page.getByTestId(`return-qty-${PRODUCT_ID}`).fill("1");
    await page.getByTestId("return-reason-input").fill("E2E full return");
    await page.getByTestId("submit-return-button").click();
    await expect(page).toHaveURL(/\/returns\/.+\/document$/);

    await page.goto(commercePath(`/orders/${refs.orderId}`));
    await expect(page.getByTestId("open-return-button")).toHaveCount(0);

    await page.goto(commercePath(`/invoices/${refs.invoiceId}`));
    await expect(page.getByTestId("invoice-total")).toHaveText(originalInvoiceTotal || "");
  });

  test("keeps branch orders and reports isolated by active branch", async ({ page }) => {
    await openSeededCommerce(page);
    await ensureSecondBranch(page, SECOND_BRANCH);
    await switchBranch(page, MAIN_BRANCH);
    await setProductStock(page, 5);
    const refs = await createPosSale(page);

    await switchBranch(page, SECOND_BRANCH);
    await page.goto(commercePath("/orders"));
    await expect(page.locator("body")).not.toContainText(refs.orderNumber);
    await page.goto(commercePath("/reports"));
    await expect(page.getByTestId("reports-page")).toContainText(SECOND_BRANCH);

    await switchBranch(page, MAIN_BRANCH);
    await page.goto(commercePath("/orders"));
    await expect(page.getByTestId("orders-list")).toContainText(refs.orderNumber);
    await page.goto(commercePath("/reports"));
    await expect(page.getByTestId("reports-page")).toContainText(MAIN_BRANCH);
    await expectNoFatalAppCrash(page);
  });
});
