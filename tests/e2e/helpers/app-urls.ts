export const LANDING_URL = process.env.LANDING_URL ?? "http://localhost:3000";
export const CORE_URL = process.env.CORE_URL ?? "http://localhost:3001";
export const COMMERCE_URL = process.env.COMMERCE_URL ?? "http://localhost:3002";

export function corePath(path = "/"): string {
  return new URL(path, CORE_URL).toString();
}

export function commercePath(path = "/"): string {
  return new URL(path, COMMERCE_URL).toString();
}

export function landingPath(path = "/"): string {
  return new URL(path, LANDING_URL).toString();
}

export function commerceHandoffSetupUrl(overrides?: Partial<Record<string, string>>): string {
  const params = new URLSearchParams({
    nx_handoff: "commerce",
    currentUserId: "e2e-user",
    currentWorkspaceId: "e2e-workspace",
    currentBusinessUnitId: "e2e-commerce-business",
    currentOSId: "commerce",
    currentOSSubscriptionId: "e2e-commerce-subscription",
    currentBranchId: "e2e-main-branch",
    workspaceName: "E2E Core Group",
    workspaceCountry: "Egypt",
    workspaceCurrency: "EGP",
    workspaceTimezone: "Africa/Cairo",
    userName: "E2E Owner",
    userEmail: "e2e.owner@nexoraxs.local",
    businessUnitName: "E2E Commerce",
    businessPreset: "retail",
    branchName: "Main Branch",
    plan: "starter",
    planId: "commerce_starter",
    trialEndsAt: "2026-07-01",
    renewsAt: "2026-07-01",
    ...overrides,
  });

  return `${COMMERCE_URL}/setup?${params.toString()}`;
}
