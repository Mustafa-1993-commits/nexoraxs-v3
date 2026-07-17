import { expect, test } from "@playwright/test";
import { buildCommerceSetupHandoffUrl } from "../../apps/core-platform/lib/commerce/CommerceHandoffAdapter";

test.describe("Feature 054 Core-to-Commerce handoff", () => {
  test("accepts scoped context on the Commerce origin without fallback Core identity writes", async ({ page }) => {
    const href = buildCommerceSetupHandoffUrl({
      actor: { id: "handoff-user", displayName: "Handoff Owner", email: "owner@example.test" },
      workspace: { id: "handoff-workspace", name: "Handoff Workspace", country: "Egypt", currency: "EGP", timezone: "Africa/Cairo" },
      legacyBusinessUnit: { id: "handoff-bu", name: "Handoff Business", preset: "retail", industryType: "retail" },
      branch: { id: "handoff-branch", name: "Main Branch", city: "Cairo", address: "Test Street" },
      subscription: { id: "handoff-sub", osId: "commerce", plan: "starter", planId: "commerce_starter" },
      action: "setup",
    });

    await page.goto(href);
    await expect(page).toHaveURL(/\/setup\?/);
    const snapshot = await page.evaluate(() => ({
      currentUserId: sessionStorage.getItem("nexoraxs.session.currentUserId"),
      currentWorkspaceId: sessionStorage.getItem("nexoraxs.session.currentWorkspaceId"),
      currentBusinessUnitId: sessionStorage.getItem("nexoraxs.session.currentBusinessUnitId"),
      currentBranchId: sessionStorage.getItem("nexoraxs.session.currentBranchId"),
      users: localStorage.getItem("nexoraxs.db.users"),
      workspaces: localStorage.getItem("nexoraxs.db.workspaces"),
      businessUnits: localStorage.getItem("nexoraxs.db.businessUnits"),
      branches: localStorage.getItem("nexoraxs.db.branches"),
    }));
    expect(JSON.parse(snapshot.currentUserId!)).toBe("handoff-user");
    expect(JSON.parse(snapshot.currentWorkspaceId!)).toBe("handoff-workspace");
    expect(JSON.parse(snapshot.currentBusinessUnitId!)).toBe("handoff-bu");
    expect(JSON.parse(snapshot.currentBranchId!)).toBe("handoff-branch");
    expect(snapshot.users).toBeNull();
    expect(snapshot.workspaces).toBeNull();
    expect(snapshot.businessUnits).toBeNull();
    expect(snapshot.branches).toBeNull();

    await page.reload();
    expect(JSON.parse(await page.evaluate(() => sessionStorage.getItem("nexoraxs.session.currentWorkspaceId")) as string)).toBe("handoff-workspace");
  });
});
