import { expect, test } from "@playwright/test";
import { CORE_URL, corePath } from "./helpers/app-urls";
import { expectNoBusinessUnitCopy, expectNoFatalAppCrash } from "./helpers/assertions";
import { registerAndCompleteCoreOnboarding } from "./helpers/core-flow";

test.describe("Core Platform 3001 MVP flow", () => {
  test.setTimeout(240_000);

  test("registers, onboards workspace, validates Product Hub, billing, team, settings, and Commerce handoff", async ({ page }) => {
    await registerAndCompleteCoreOnboarding(page, "E2E Core Group");

    await page.goto(corePath("/dashboard"));
    await page.reload();
    await expect(page.getByTestId("core-dashboard")).toBeVisible();
    await expect(page.locator("body")).toContainText("E2E Core Group");
    await expect(page.locator("body")).toContainText(/Storage used/i);
    await expect(page.locator("body")).toContainText(/Operating Systems|Product Hub/i);
    await expectNoBusinessUnitCopy(page);
    await expectNoFatalAppCrash(page);

    await page.goto(corePath("/dashboard/apps"));
    await expect(page.getByTestId("core-product-hub")).toBeVisible();
    await expect(page.getByTestId("os-card-commerce")).toContainText("Commerce OS");
    await expect(page.getByTestId("os-card-commerce")).toContainText(/Open Commerce|Continue in Commerce|Complete setup in Commerce/i);
    for (const os of ["hr", "crm", "gym", "healthcare", "maintenance"]) {
      await expect(page.getByTestId(`os-card-${os}`)).toContainText(/Coming Soon|Locked|Soon/i);
    }
    await expect(page.locator("body")).toContainText("Each operating system is a standalone subscription");
    await expectNoBusinessUnitCopy(page);

    await page.getByTestId("os-card-commerce").getByRole("link", { name: /Open Commerce|Continue in Commerce|Complete setup in Commerce/i }).click();
    await expect(page).toHaveURL(/localhost:3002\/(setup|dashboard)/);

    await page.goto(corePath("/dashboard/billing"));
    await expect(page.getByTestId("core-billing")).toBeVisible();
    await expect(page.locator("body")).toContainText(/Commerce OS Starter|Plan limits|Storage used/i);
    await expectNoBusinessUnitCopy(page);

    await page.goto(corePath("/dashboard/team"));
    await expect(page.getByTestId("core-team")).toBeVisible();
    await page.getByRole("button", { name: "Invite member" }).click();
    await expect(page.getByTestId("invite-user-modal")).toBeVisible();
    await expectNoBusinessUnitCopy(page);

    await page.goto(corePath("/dashboard/settings"));
    await expect(page.getByTestId("core-settings")).toBeVisible();
    await expect(page.locator("body")).toContainText(/Workspace|Language & Region|Team & Access/i);
    await expectNoBusinessUnitCopy(page);

    expect(new URL(CORE_URL).port).toBe("3001");
  });
});
