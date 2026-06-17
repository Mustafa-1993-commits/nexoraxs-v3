import { expect, test } from "@playwright/test";
import { corePath } from "./helpers/app-urls";
import {
  clearCoreStorage,
  completeCoreOnboarding,
  expectWorkspaceVisibleOnly,
  loginCoreUser,
  logoutCoreUser,
  registerCoreUser,
} from "./helpers/core-flow";

const PASSWORD = "Password123!";
const USER_A = {
  email: "owner-a@nexoraxs.local",
  firstName: "Owner",
  lastName: "Alpha",
  password: PASSWORD,
};
const USER_B = {
  email: "owner-b@nexoraxs.local",
  firstName: "Owner",
  lastName: "Beta",
  password: PASSWORD,
};

test.describe("Core Platform mock auth workspace isolation", () => {
  test.setTimeout(180_000);

  test("isolates current workspace by authenticated user session", async ({ page }) => {
    await clearCoreStorage(page);

    await registerCoreUser(page, USER_A);
    await completeCoreOnboarding(page, {
      workspaceName: "Workspace A",
      branchName: "Main Branch A",
      businessName: "Workspace A Retail",
    });
    await expectWorkspaceVisibleOnly(page, "Workspace A", "Workspace B");

    await logoutCoreUser(page);

    await loginCoreUser(page, { email: USER_A.email, password: PASSWORD });
    await expect(page).toHaveURL(/\/dashboard\/apps$/);
    await expectWorkspaceVisibleOnly(page, "Workspace A", "Workspace B");

    await logoutCoreUser(page);

    await registerCoreUser(page, USER_B);
    await expect(page.getByTestId("core-welcome")).toBeVisible();
    await expect(page.locator("body")).not.toContainText("Workspace A");

    await completeCoreOnboarding(page, {
      workspaceName: "Workspace B",
      branchName: "Main Branch B",
      businessName: "Workspace B Retail",
    });
    await expectWorkspaceVisibleOnly(page, "Workspace B", "Workspace A");

    await logoutCoreUser(page);

    await loginCoreUser(page, { email: USER_A.email, password: PASSWORD });
    await expect(page).toHaveURL(/\/dashboard\/apps$/);
    await expectWorkspaceVisibleOnly(page, "Workspace A", "Workspace B");

    await page.goto(corePath("/dashboard/apps"));
    await expectWorkspaceVisibleOnly(page, "Workspace A", "Workspace B");
  });
});
