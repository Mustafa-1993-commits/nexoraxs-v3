import type { Branch, BusinessUnit, OSEnablement, OSSubscription, User, Workspace } from "@/lib/store";

const COMMERCE_APP_URL = "http://localhost:3002";

interface CommerceSetupUrlInput {
  user: User | null;
  workspace: Workspace | null;
  businessUnit: BusinessUnit | null;
  branch: Branch | null;
  subscription: OSSubscription | null;
  osEnablement?: OSEnablement | null;
}

export function commerceSetupUrl({
  user,
  workspace,
  businessUnit,
  branch,
  subscription,
  osEnablement,
}: CommerceSetupUrlInput): string {
  if (!user || !workspace || !subscription || subscription.osId !== "commerce") {
    return "/dashboard/apps";
  }

  const params = new URLSearchParams({
    nx_handoff: "commerce",
    currentUserId: user.id,
    currentWorkspaceId: workspace.id,
    currentOSId: "commerce",
    currentOSSubscriptionId: subscription.id,
    workspaceName: workspace.name,
    workspaceCountry: workspace.country,
    workspaceCurrency: workspace.currency,
    workspaceTimezone: workspace.timezone,
    userName: user.fullName || user.name || "",
    userEmail: user.email,
    plan: subscription.plan,
    planId: subscription.planId,
  });

  if (businessUnit) {
    params.set("currentBusinessUnitId", businessUnit.id);
    params.set("businessUnitName", businessUnit.name);
    params.set("businessPreset", businessUnit.presetId || businessUnit.preset || "retail");
    if (businessUnit.industryType) params.set("businessIndustryType", businessUnit.industryType);
  }
  if (branch) {
    params.set("currentBranchId", branch.id);
    params.set("branchName", branch.name);
    if (branch.city || branch.branchCity) params.set("branchCity", branch.branchCity || branch.city || "");
    if (branch.branchAddressLine1 || branch.address) params.set("branchAddress", branch.branchAddressLine1 || branch.address || "");
  }
  if (osEnablement) {
    params.set("currentOSEnablementId", osEnablement.id);
    params.set("enablementScope", osEnablement.scope);
  }
  if (subscription.trialEndsAt) params.set("trialEndsAt", subscription.trialEndsAt);
  if (subscription.renewsAt) params.set("renewsAt", subscription.renewsAt);

  return `${COMMERCE_APP_URL}/setup?${params.toString()}`;
}

export function commerceDashboardUrl(): string {
  return `${COMMERCE_APP_URL}/dashboard`;
}
