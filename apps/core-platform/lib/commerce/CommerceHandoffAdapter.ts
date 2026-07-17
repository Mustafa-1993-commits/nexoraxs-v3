import type {
  Branch,
  BusinessUnit,
  OSSubscription,
  User,
  Workspace,
} from "@nexoraxs/types";

const COMMERCE_APP_URL = "http://localhost:3002";

export interface CommerceSetupHandoffInput {
  readonly actor: Pick<User, "id" | "email"> & Readonly<{ displayName: string }>;
  readonly workspace: Pick<Workspace, "id" | "name" | "country" | "currency" | "timezone">;
  readonly legacyBusinessUnit: (Pick<BusinessUnit, "id" | "name"> & Readonly<{
    preset?: string;
    industryType?: string;
  }>) | null;
  readonly branch: (Pick<Branch, "id" | "name"> & Readonly<{
    city?: string;
    address?: string;
  }>) | null;
  readonly subscription: Pick<OSSubscription, "id" | "osId" | "plan" | "planId" | "trialEndsAt" | "renewsAt">;
  readonly action: string;
}

export function buildCommerceSetupHandoffUrl(input: CommerceSetupHandoffInput): string {
  if (input.subscription.osId !== "commerce" || !input.legacyBusinessUnit) return "/dashboard/apps";
  const params = new URLSearchParams({
    nx_handoff: "commerce",
    currentUserId: input.actor.id,
    currentWorkspaceId: input.workspace.id,
    currentOSId: "commerce",
    currentOSSubscriptionId: input.subscription.id,
    currentBusinessUnitId: input.legacyBusinessUnit.id,
    workspaceName: input.workspace.name,
    workspaceCountry: input.workspace.country,
    workspaceCurrency: input.workspace.currency,
    workspaceTimezone: input.workspace.timezone,
    userName: input.actor.displayName,
    userEmail: input.actor.email,
    businessUnitName: input.legacyBusinessUnit.name,
    businessPreset: input.legacyBusinessUnit.preset || "retail",
    businessIndustryType: input.legacyBusinessUnit.industryType || input.legacyBusinessUnit.preset || "retail",
    plan: input.subscription.plan,
    planId: input.subscription.planId,
    action: input.action,
  });
  if (input.branch) {
    params.set("currentBranchId", input.branch.id);
    params.set("branchName", input.branch.name);
    if (input.branch.city) params.set("branchCity", input.branch.city);
    if (input.branch.address) params.set("branchAddress", input.branch.address);
  }
  if (input.subscription.trialEndsAt) params.set("trialEndsAt", input.subscription.trialEndsAt);
  if (input.subscription.renewsAt) params.set("renewsAt", input.subscription.renewsAt);
  return `${COMMERCE_APP_URL}/setup?${params.toString()}`;
}

export function buildCommerceDashboardUrl(): string {
  return `${COMMERCE_APP_URL}/dashboard`;
}
