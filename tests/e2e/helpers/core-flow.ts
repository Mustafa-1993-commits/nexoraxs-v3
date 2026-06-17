import { expect, type Page } from "@playwright/test";
import { CORE_URL, corePath } from "./app-urls";
import { clearOrigin } from "./reset";

export async function registerAndCompleteCoreOnboarding(page: Page, workspaceName = "E2E Core Group"): Promise<void> {
  await clearOrigin(page, CORE_URL);
  await page.goto(corePath("/register"));
  await expect(page.getByTestId("core-register-form")).toBeVisible();

  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill(`owner-${Date.now()}@nexoraxs.local`);
  await page.getByRole("button", { name: "Continue with email" }).click();

  await page.getByLabel("First name").click();
  await page.getByLabel("First name").fill("E2E");
  await page.getByLabel("Last name").fill("Owner");
  await page.getByLabel("Password", { exact: true }).fill("Password123!");
  await page.getByLabel("Confirm password").fill("Password123!");
  await page.getByRole("button", { name: "Create account" }).click();

  await expect(page).toHaveURL(/\/verify$/);
  for (let index = 1; index <= 6; index += 1) {
    await page.getByLabel(`Digit ${index}`).fill(String(index));
  }
  await expect(page.getByTestId("core-welcome")).toBeVisible();

  await page.getByRole("button", { name: "Create workspace" }).click();
  await expect(page.getByTestId("core-onboarding")).toBeVisible();

  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder("Acme Group").fill(workspaceName);
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder("Main Branch").fill("Main Branch");
  await page.getByPlaceholder("Alexandria").fill("Alexandria");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Commerce OS" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: /Starter/ }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder(/Business name|Retail Store/).fill("E2E Retail");
  await page.getByRole("button", { name: "Retail Store" }).click();
  await page.getByRole("button", { name: "Finish setup" }).click();

  await expect(page.getByTestId("core-product-hub")).toBeVisible();
}
