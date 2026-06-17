import { expect, type Page } from "@playwright/test";
import { CORE_URL, corePath } from "./app-urls";

export async function clearCoreStorage(page: Page): Promise<void> {
  await page.goto(CORE_URL);
  await page.evaluate(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
}

export async function registerCoreUser(page: Page, data: { email: string; firstName: string; lastName: string; password: string }): Promise<void> {
  await page.goto(corePath("/register"));
  await expect(page.getByTestId("core-register-form")).toBeVisible();
  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill(data.email);
  await page.getByRole("button", { name: "Continue with email" }).click();
  await expect(page.getByTestId("core-register-form")).toBeVisible();
  await page.getByLabel("First name").click();
  await page.getByLabel("First name").fill(data.firstName);
  await page.getByLabel("Last name").fill(data.lastName);
  await page.getByLabel("Password", { exact: true }).click();
  await page.getByLabel("Password", { exact: true }).fill(data.password);
  await page.getByLabel("Confirm password").fill(data.password);
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page).toHaveURL(/\/verify$/);
  for (let index = 1; index <= 6; index += 1) {
    await page.getByLabel(`Digit ${index}`).fill(String(index));
  }
  await expect(page.getByTestId("core-welcome")).toBeVisible();
}

export async function loginCoreUser(page: Page, data: { email: string; password: string }): Promise<void> {
  await page.goto(corePath("/login"));
  await expect(page.getByTestId("core-login-form")).toBeVisible();
  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill(data.email);
  await page.getByRole("button", { name: "Continue with email" }).click();
  await expect(page.getByTestId("core-login-form")).toBeVisible();
  await page.getByLabel("Password", { exact: true }).click();
  await page.getByLabel("Password", { exact: true }).fill(data.password);
  await page.getByRole("button", { name: "Log in", exact: true }).click();
}

export async function completeCoreOnboarding(page: Page, data: { workspaceName: string; branchName: string; businessName: string }): Promise<void> {
  await page.getByRole("button", { name: "Create workspace" }).click();
  await expect(page.getByTestId("core-onboarding")).toBeVisible();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder("Acme Group").fill(data.workspaceName);
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder("Main Branch").fill(data.branchName);
  await page.getByPlaceholder("Alexandria").fill("Alexandria");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Commerce OS" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: /Starter/ }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder(/Business name|Retail Store/).fill(data.businessName);
  await page.getByRole("button", { name: "Retail Store" }).click();
  await page.getByRole("button", { name: "Finish setup" }).click();
  await expect(page).toHaveURL(/\/dashboard\/apps$/);
  await expect(page.getByTestId("core-product-hub")).toBeVisible();
}

export async function logoutCoreUser(page: Page): Promise<void> {
  await page.getByTitle("Sign out").click();
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByTestId("core-login-form")).toBeVisible();
}

export async function expectWorkspaceVisibleOnly(page: Page, visibleName: string, hiddenName: string): Promise<void> {
  await expect(page.getByTestId("core-shell")).toBeVisible();
  await expect(page.getByTestId("core-product-hub")).toBeVisible();
  await expect(page.getByTestId("core-product-hub")).toContainText(visibleName);
  await expect(page.locator("body")).not.toContainText(hiddenName);
  await expect(page.locator("body")).not.toContainText("Business Unit");
  await expect(page.locator("body")).not.toContainText("Default Business Unit");
  await expect(page.locator("body")).not.toContainText(/\bBU\b/);
}
