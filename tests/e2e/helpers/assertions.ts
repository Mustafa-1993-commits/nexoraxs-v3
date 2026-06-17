import { expect, type Page } from "@playwright/test";

export async function expectNoFatalAppCrash(page: Page): Promise<void> {
  const body = page.locator("body");
  await expect(body).not.toContainText(/Application error|Unhandled Runtime Error|Hydration failed|This page could not be found/i);
}

export async function expectNoBusinessUnitCopy(page: Page): Promise<void> {
  const body = page.locator("body");
  await expect(body).not.toContainText("Business Unit");
  await expect(body).not.toContainText("Default Business Unit");
  await expect(body).not.toContainText(/\bBU\b/);
}
