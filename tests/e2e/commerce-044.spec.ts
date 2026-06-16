import { expect, test, type Page } from "@playwright/test";

const DEMO_FLAG = "nexoraxs.session.demo";
const SEED_GUARD = "nexoraxs.e2e.seeded";
const PRODUCT_ID = "p1";
const BRANCH_A = "Smouha Branch";
const BRANCH_B = "Nasr City";

function branchSlug(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "branch";
}

async function seedDemoOnce(page: Page) {
  await page.addInitScript(({ demoFlag, seedGuard }) => {
    if (window.sessionStorage.getItem(seedGuard)) return;
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem(demoFlag, JSON.stringify("1"));
    window.sessionStorage.setItem(seedGuard, "1");
  }, { demoFlag: DEMO_FLAG, seedGuard: SEED_GUARD });
}

async function openCommerce(page: Page) {
  await page.goto("/");
  await expect(page).toHaveURL(/\/dashboard$/);
}

async function switchBranch(page: Page, branchName: string) {
  await page.getByTestId("context-switcher").click();
  const option = page.getByTestId(`branch-option-${branchSlug(branchName)}`);
  await expect(option.getByTestId("branch-option-name")).toHaveText(branchName);
  await option.click();
  await expect(page.getByTestId("context-switcher")).toContainText(branchName);
}

async function setProductStock(page: Page, qty: number) {
  await page.goto("/inventory");
  await page.getByTestId(`inventory-update-${PRODUCT_ID}`).click();
  await page.getByTestId("stock-quantity-input").fill(String(qty));
  await page.getByTestId("save-stock-button").click();
  await expect(page.getByTestId(`inventory-stock-cell-${PRODUCT_ID}`)).toContainText(String(qty));
}

async function expectProductStock(page: Page, qty: number) {
  await page.goto("/inventory");
  await expect(page.getByTestId(`inventory-stock-cell-${PRODUCT_ID}`)).toContainText(String(qty));
}

async function getOrderAndInvoiceIds(page: Page): Promise<{ orderId: string; invoiceId: string; orderNumber: string; invoiceNumber: string }> {
  return page.evaluate(() => {
    const orders = JSON.parse(window.localStorage.getItem("nexoraxs.db.commerceOrders") || "[]") as { id: string; orderNumber: string }[];
    const invoices = JSON.parse(window.localStorage.getItem("nexoraxs.db.commerceInvoices") || "[]") as { id: string; invoiceNumber: string; orderId: string }[];
    const order = orders.at(-1);
    if (!order) throw new Error("No order was created");
    const invoice = invoices.find((candidate) => candidate.orderId === order.id);
    if (!invoice) throw new Error("No invoice was created for order");
    return {
      orderId: order.id,
      invoiceId: invoice.id,
      orderNumber: order.orderNumber,
      invoiceNumber: invoice.invoiceNumber,
    };
  });
}

async function getReturnIdForOrder(page: Page, orderId: string): Promise<string> {
  await page.waitForFunction((targetOrderId) => {
    const returns = JSON.parse(window.localStorage.getItem("nexoraxs.db.commerceReturns") || "[]") as { id: string; orderId: string }[];
    return returns.some((ret) => ret.orderId === targetOrderId);
  }, orderId);

  return page.evaluate((targetOrderId) => {
    const returns = JSON.parse(window.localStorage.getItem("nexoraxs.db.commerceReturns") || "[]") as { id: string; orderId: string }[];
    for (let i = returns.length - 1; i >= 0; i -= 1) {
      if (returns[i].orderId === targetOrderId) return returns[i].id;
    }
    throw new Error("No return was created for order");
  }, orderId);
}

test.describe("Commerce Spec 044 branch inventory, transfers, returns", () => {
  test.setTimeout(180_000);

  test("covers branch stock isolation, transfers, returns, immutable invoices, and reports", async ({ page }) => {
    await seedDemoOnce(page);
    await openCommerce(page);

    await page.goto("/settings");
    await page.getByTestId("add-branch-button").click();
    await page.getByTestId("branch-name-input").fill(BRANCH_B);
    await page.getByTestId("branch-city-input").fill("Cairo");
    await page.getByTestId("save-branch-button").click();
    const newBranchCard = page.getByTestId(`branch-card-${branchSlug(BRANCH_B)}`);
    await expect(page.getByTestId("branch-list").getByText(BRANCH_B, { exact: true })).toBeVisible();
    await expect(newBranchCard.getByTestId("branch-card-name")).toContainText(BRANCH_B);
    await expect(newBranchCard.getByTestId("branch-card-city")).toHaveText("Cairo");

    await switchBranch(page, BRANCH_A);
    await setProductStock(page, 10);

    await switchBranch(page, BRANCH_B);
    await setProductStock(page, 3);

    await switchBranch(page, BRANCH_A);
    await page.goto("/pos");
    await page.getByTestId(`pos-product-${PRODUCT_ID}`).click();
    await expect(page.getByTestId(`cart-item-${PRODUCT_ID}`)).toContainText("1");
    await page.getByTestId("checkout-button").click();
    await page.getByTestId("complete-sale-button").click();
    await expect(page).toHaveURL(/\/pos\/success$/);

    const orderRefs = await getOrderAndInvoiceIds(page);

    await expectProductStock(page, 9);
    await switchBranch(page, BRANCH_B);
    await expectProductStock(page, 3);

    await switchBranch(page, BRANCH_A);
    await page.goto("/inventory/transfers");
    await page.getByTestId("transfer-to-branch").selectOption({ label: BRANCH_B });
    await page.getByTestId("add-transfer-item").click();
    await page.getByTestId("transfer-product-0").selectOption(PRODUCT_ID);
    await page.getByTestId("transfer-qty-0").fill("2");
    await page.getByTestId("submit-transfer").click();

    await expectProductStock(page, 7);
    await switchBranch(page, BRANCH_B);
    await expectProductStock(page, 5);

    await page.goto(`/invoices/${orderRefs.invoiceId}`);
    const originalInvoiceQty = await page.getByTestId("invoice-item-qty-0").textContent();
    const originalInvoiceTotal = await page.getByTestId("invoice-total").textContent();
    expect(originalInvoiceQty).toBe("1");
    expect(originalInvoiceTotal).toBeTruthy();

    await page.goto(`/orders/${orderRefs.orderId}`);
    await page.getByTestId("open-return-button").click();
    await page.getByTestId(`return-qty-${PRODUCT_ID}`).fill("1");
    await page.getByTestId("return-reason-input").fill("E2E partial restock return");
    await expect(page.getByTestId("return-restock-checkbox")).toBeChecked();
    await page.getByTestId("submit-return-button").click();
    const returnId = await getReturnIdForOrder(page, orderRefs.orderId);
    await page.goto(`/returns/${returnId}/document`);
    await expect(page).toHaveURL(/\/returns\/.+\/document$/);

    await expect(page.getByTestId("return-doc-return-number")).toContainText(/^RET-/);
    await expect(page.getByTestId("return-doc-order-number")).toHaveText(orderRefs.orderNumber);
    await expect(page.getByTestId("return-doc-invoice-number")).toHaveText(orderRefs.invoiceNumber);
    await expect(page.getByTestId("return-doc-branch")).toContainText(BRANCH_A);
    await expect(page.getByTestId("return-doc-refund-total")).not.toHaveText("");

    await switchBranch(page, BRANCH_A);
    await expectProductStock(page, 8);

    await page.goto(`/invoices/${orderRefs.invoiceId}`);
    await expect(page.getByTestId("invoice-item-qty-0")).toHaveText(originalInvoiceQty || "");
    await expect(page.getByTestId("invoice-total")).toHaveText(originalInvoiceTotal || "");

    await page.goto("/reports");
    await expect(page.getByTestId("reports-gross-sales")).toBeVisible();
    await expect(page.getByTestId("reports-returns-refunds")).toBeVisible();
    await expect(page.getByTestId("reports-net-sales")).toBeVisible();
  });
});
