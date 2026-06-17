import { expect, test } from "@playwright/test";
import { CORE_URL, COMMERCE_URL, corePath } from "./helpers/app-urls";
import { expectNoBusinessUnitCopy, expectNoFatalAppCrash } from "./helpers/assertions";
import { registerAndCompleteCoreOnboarding } from "./helpers/core-flow";

test.describe("Core to Commerce cross-app handoff", () => {
  test.setTimeout(240_000);

  test("navigates from Core Product Hub to Commerce 3002 without asserting cross-origin localStorage sync", async ({ page }) => {
    await registerAndCompleteCoreOnboarding(page, "E2E Handoff Group");
    await page.goto(corePath("/dashboard/apps"));
    await expect(page.getByTestId("core-product-hub")).toBeVisible();

    await page.getByTestId("os-card-commerce").getByRole("link", { name: /Open Commerce|Continue in Commerce|Complete setup in Commerce/i }).click();
    await expect(page).toHaveURL(/localhost:3002\/(setup|dashboard)/);
    await expect(page.locator("body")).toContainText(/Commerce OS|Set up Commerce OS|Commerce Dashboard/i);
    await expectNoBusinessUnitCopy(page);
    await expectNoFatalAppCrash(page);

    const commerceLocalStorageHasWorkspace = await page.evaluate(() => Boolean(window.localStorage.getItem("nexoraxs.db.workspaces")));
    expect(commerceLocalStorageHasWorkspace).toBe(true);

    await page.goto(corePath("/dashboard/apps"));
    await expect(page.getByTestId("core-product-hub")).toBeVisible();
    await expect(page.locator("body")).toContainText("Each operating system is a standalone subscription");

    expect(new URL(CORE_URL).origin).not.toBe(new URL(COMMERCE_URL).origin);
  });
});
