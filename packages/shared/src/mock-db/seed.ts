import type {
  Branch, BusinessUnit, OSEnablement, OSSubscription, User, Workspace,
  WorkspaceMember, WorkspaceStorageUsage,
} from "@nexoraxs/types";
import { OS_CATALOG, PLAN_CATALOG } from "./schema";

/** Legacy Core demo fixture. Operating-system records are seeded by their owning app. */
export function emptyDB(locale = "en", theme = "light") {
  return {
    version: 2, demo: false, locale, theme,
    entryContext: { source: "general_landing", selectedOS: null as string | null, selectedPlan: null as string | null },
    currentUserId: null as string | null, currentWorkspaceId: null as string | null,
    currentOSId: null as string | null, currentOSSubscriptionId: null as string | null,
    currentBusinessUnitId: null as string | null, currentBranchId: null as string | null,
    operatingSystems: OS_CATALOG, plans: PLAN_CATALOG,
    workspaces: [] as Workspace[], subscriptions: [] as OSSubscription[], osEnablements: [] as OSEnablement[],
    businessUnits: [] as BusinessUnit[], branches: [] as Branch[], users: [] as User[],
    teamMembers: [] as WorkspaceMember[], workspaceStorageUsage: [] as WorkspaceStorageUsage[],
    onboardingState: { phase: null as string | null, step: 0, completedOS: [] as string[] },
  };
}

export function seedDB(locale = "en", theme = "light") {
  const userId = "user_001", workspaceId = "ws_001", subscriptionId = "sub_001";
  const businessUnitId = "bu_001", branchId = "br_001";
  const created = "2025-08-12T09:00:00.000Z";
  return {
    version: 2, demo: true, locale, theme,
    entryContext: { source: "general_landing", selectedOS: null as string | null, selectedPlan: null as string | null },
    currentUserId: userId, currentWorkspaceId: workspaceId, currentOSId: "commerce",
    currentOSSubscriptionId: subscriptionId, currentBusinessUnitId: businessUnitId, currentBranchId: branchId,
    operatingSystems: OS_CATALOG, plans: PLAN_CATALOG,
    workspaces: [{ id: workspaceId, name: "Mustafa Group", country: "Egypt", currency: "EGP", timezone: "Africa/Cairo", language: locale, ownerUserId: userId, createdAt: created }] as Workspace[],
    subscriptions: [{ id: subscriptionId, workspaceId, os: "commerce", osId: "commerce", plan: "starter", planId: "commerce_starter", status: "trialing" as const, startedAt: created, trialEndsAt: "2026-06-18", renewsAt: "2026-06-18" }] as OSSubscription[],
    osEnablements: [{ id: "ose_001", osSubscriptionId: subscriptionId, workspaceId, osId: "commerce", businessUnitId, branchIds: [branchId], scope: "business", status: "active", createdAt: created, updatedAt: created }] as OSEnablement[],
    businessUnits: [{ id: businessUnitId, workspaceId, osSubscriptionId: subscriptionId, os: "commerce", osId: "commerce", selectedOS: "commerce", branchIds: [branchId], branchId, name: "Mustafa Pharmacy", industryType: "pharmacy", preset: "pharmacy", presetId: "pharmacy", createdAt: created }] as BusinessUnit[],
    branches: [{ id: branchId, workspaceId, businessUnitId, name: "Smouha Branch", city: "Alexandria", country: "Egypt", isMain: true, createdAt: created }] as Branch[],
    users: [{ id: userId, fullName: "Mustafa Hassan", name: "Mustafa Hassan", email: "mustafa@mustafagroup.co", passwordHash: "demo-password", role: "owner", createdAt: created, updatedAt: created }] as User[],
    teamMembers: [{ id: "tm_001", workspaceId, userId, workspaceRole: "Owner", osId: null, osRole: "Owner", businessUnitId: null, branchId: null, status: "active", lastActive: "Active now" }] as WorkspaceMember[],
    workspaceStorageUsage: [{ workspaceId, usedBytes: 0, limitBytes: PLAN_CATALOG.find((plan) => plan.id === "commerce_starter")?.limits.storageLimitBytes ?? 500 * 1024 * 1024, updatedAt: created }] as WorkspaceStorageUsage[],
    onboardingState: { phase: null as string | null, step: 0, completedOS: ["commerce"] },
  };
}
