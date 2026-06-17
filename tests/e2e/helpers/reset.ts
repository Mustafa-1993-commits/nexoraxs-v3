import { expect, type Page } from "@playwright/test";
import { COMMERCE_URL, commercePath } from "./app-urls";
import { branchSlug, DEMO_FLAG, MAIN_BRANCH, PRODUCT_ID } from "./selectors";

export async function clearOrigin(page: Page, url: string): Promise<void> {
  await page.goto(url);
  await page.evaluate(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
}

export async function installDemoSeed(page: Page): Promise<void> {
  await page.addInitScript((demoFlag) => {
    const seedGuard = "nexoraxs.e2e.seeded";
    if (window.sessionStorage.getItem(seedGuard)) return;
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.sessionStorage.setItem(demoFlag, JSON.stringify("1"));
    window.sessionStorage.setItem(seedGuard, "1");
  }, DEMO_FLAG);
}

export async function openSeededCommerce(page: Page, path = "/dashboard"): Promise<void> {
  await installDemoSeed(page);
  await page.goto(commercePath(path));
}

export async function switchBranch(page: Page, branchName: string): Promise<void> {
  await page.getByTestId("context-switcher").click();
  const option = page.getByTestId(`branch-option-${branchSlug(branchName)}`);
  await expect(option.getByTestId("branch-option-name")).toContainText(branchName);
  await option.click();
  await expect(page.getByTestId("context-switcher")).toContainText(branchName);
}

export async function ensureSecondBranch(page: Page, branchName = "Nasr City"): Promise<void> {
  await page.goto(commercePath("/settings"));
  const card = page.getByTestId(`branch-card-${branchSlug(branchName)}`);
  if (await card.count()) return;
  await page.getByTestId("add-branch-button").click();
  await page.getByTestId("branch-name-input").fill(branchName);
  await page.getByTestId("branch-city-input").fill("Cairo");
  await page.getByTestId("save-branch-button").click();
  await expect(card).toBeVisible();
}

export async function setProductStock(page: Page, qty: number, productId = PRODUCT_ID): Promise<void> {
  await page.goto(commercePath("/inventory"));
  await page.getByTestId(`inventory-update-${productId}`).click();
  await page.getByTestId("stock-quantity-input").fill(String(qty));
  await page.getByTestId("save-stock-button").click();
  await expect(page.getByTestId(`inventory-stock-cell-${productId}`)).toContainText(String(qty));
}

export async function expectProductStock(page: Page, qty: number, productId = PRODUCT_ID): Promise<void> {
  await page.goto(commercePath("/inventory"));
  await expect(page.getByTestId(`inventory-stock-cell-${productId}`)).toContainText(String(qty));
}

export async function createPosSale(page: Page, productId = PRODUCT_ID): Promise<{ orderId: string; invoiceId: string; orderNumber: string; invoiceNumber: string }> {
  await page.goto(commercePath("/pos"));
  await page.getByTestId(`pos-product-${productId}`).click();
  await page.getByTestId("checkout-button").click();
  await page.getByTestId("complete-sale-button").click();
  await expect(page).toHaveURL(/\/pos\/success$/);
  return latestOrderRefs(page);
}

export async function latestOrderRefs(page: Page): Promise<{ orderId: string; invoiceId: string; orderNumber: string; invoiceNumber: string }> {
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

export async function currentStock(page: Page, productId = PRODUCT_ID): Promise<number> {
  await page.goto(COMMERCE_URL);
  return page.evaluate((id) => {
    const branchId = JSON.parse(window.sessionStorage.getItem("nexoraxs.session.currentBranchId") || "null") as string | null;
    const branchInventory = JSON.parse(window.localStorage.getItem("nexoraxs.db.branchInventory") || "[]") as { productId: string; branchId: string; qty: number }[];
    const products = JSON.parse(window.localStorage.getItem("nexoraxs.db.commerceProducts") || "[]") as { id: string; stock?: number | null }[];
    const record = branchInventory.find((row) => row.productId === id && row.branchId === branchId);
    if (record) return record.qty;
    return products.find((product) => product.id === id)?.stock ?? 0;
  }, productId);
}

export { MAIN_BRANCH };
