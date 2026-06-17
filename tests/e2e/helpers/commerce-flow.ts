import { expect, type Page } from "@playwright/test";
import { commerceHandoffSetupUrl, commercePath } from "./app-urls";

async function nextSetupStep(page: Page, expectedHeading: RegExp | string): Promise<void> {
  await page.getByTestId("commerce-setup-next").click({ force: true, timeout: 5_000 });
  await expect(page.getByRole("heading", { name: expectedHeading })).toBeVisible();
}

export async function completeCommerceSetupWizard(page: Page): Promise<void> {
  await page.goto(commerceHandoffSetupUrl({ businessUnitName: "E2E Retail", businessPreset: "retail" }));
  await expect(page.getByTestId("commerce-setup")).toBeVisible();

  await page.getByPlaceholder("Business display name").fill("E2E Retail");
  await page.getByPlaceholder("01000000000").fill("01000000000");
  await page.getByPlaceholder("Street, area").fill("QA Street");
  await page.getByPlaceholder("Alexandria").fill("Alexandria");
  await nextSetupStep(page, "Confirm your Commerce OS preset");

  await nextSetupStep(page, "How do you operate?");
  await nextSetupStep(page, "Tax setup");
  await page.getByLabel("Tax registration number").fill("123456789");
  await nextSetupStep(page, "Invoice & receipt numbering");
  await nextSetupStep(page, "Choose your document templates");
  await nextSetupStep(page, "Categories & units");
  await nextSetupStep(page, "Review your setup");
  await page.getByTestId("commerce-setup-next").click({ force: true, timeout: 5_000 });

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByTestId("commerce-dashboard")).toBeVisible();
}

export async function addProduct(page: Page, name = "E2E Test Product"): Promise<void> {
  await page.goto(commercePath("/products/new"));
  await page.getByPlaceholder("Product name").fill(name);
  await page.getByPlaceholder("SKU-001").fill("E2E-001");
  await page.getByPlaceholder("Scan or enter barcode").fill("6220000000001");
  await page.getByLabel("Price (EGP)").fill("75");
  await page.getByLabel("Cost (EGP)").fill("40");
  await page.getByLabel("Stock quantity").fill("12");
  await page.getByRole("button", { name: "Add product" }).click();
  await expect(page).toHaveURL(/\/products$/);
  await expect(page.getByTestId("product-list")).toContainText(name);
}

export async function addCustomer(page: Page, name = "E2E Customer"): Promise<void> {
  await page.goto(commercePath("/customers"));
  await page.getByRole("button", { name: "Add Customer" }).first().click();
  await expect(page.getByTestId("add-customer-modal")).toBeVisible();
  await page.getByPlaceholder("Ahmed Hassan").fill(name);
  await page.getByPlaceholder("01000000000").fill("01009998877");
  await page.getByPlaceholder("ahmed@email.com").fill("customer@nexoraxs.local");
  await page.getByTestId("add-customer-modal").getByRole("button", { name: "Add customer" }).click();
  await expect(page.getByTestId("customers-list")).toContainText(name);
}
