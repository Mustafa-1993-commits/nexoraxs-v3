import type { LegacyCorePlatformCompatibilityPort, LegacyCorePlatformDeterministicDependencies, LegacyCorePlatformStore } from "@nexoraxs/contracts";
import type { OSEnablement } from "@nexoraxs/types";

const normalizeEmail = (value: string) => (value || "").trim().toLowerCase();
const branchNameAvailable = (branches: readonly { businessUnitId: string; name: string }[], businessUnitId: string, name: string) => {
  const normalized = name.trim().toLowerCase();
  return !!businessUnitId && !!normalized && !branches.some((branch) => branch.businessUnitId === businessUnitId && branch.name.trim().toLowerCase() === normalized);
};

export class LegacyCorePlatformCompatibilityAdapter implements LegacyCorePlatformCompatibilityPort {
  constructor(private readonly store: LegacyCorePlatformStore, private readonly deterministic: LegacyCorePlatformDeterministicDependencies) {}

  persistDemoState(input: Parameters<LegacyCorePlatformCompatibilityPort["persistDemoState"]>[0]): void {
    this.store.replaceUsers(input.users);
    this.store.replaceWorkspaces(input.workspaces);
    this.store.replaceBranches(input.branches);
    this.store.replaceSubscriptions(input.subscriptions);
    this.store.replaceEnablements(input.enablements);
    this.store.replaceBusinessUnits(input.businessUnits);
    this.store.replaceTeamMembers(input.teamMembers);
    this.store.replaceStorageUsage(input.storageUsage);
  }

  createUser(input: Parameters<LegacyCorePlatformCompatibilityPort["createUser"]>[0]): ReturnType<LegacyCorePlatformCompatibilityPort["createUser"]> {
    const email = normalizeEmail(input.email);
    if (input.users.some((user) => normalizeEmail(user.email) === email)) return { ok: false, error: "email_taken" };
    const user = { id: this.deterministic.createId("user"), fullName: input.fullName, email, passwordHash: input.password, role: "owner", createdAt: this.deterministic.now(), updatedAt: this.deterministic.now() };
    const users = [...input.users, user]; this.store.replaceUsers(users); return { ok: true, user, users };
  }

  createWorkspace(input: Parameters<LegacyCorePlatformCompatibilityPort["createWorkspace"]>[0]): ReturnType<LegacyCorePlatformCompatibilityPort["createWorkspace"]> {
    const workspace = { id: this.deterministic.createId("ws"), name: input.name, country: input.country, currency: input.currency, timezone: input.timezone, language: input.language, ownerUserId: input.ownerUserId, createdAt: this.deterministic.now() };
    const workspaces = [...input.workspaces, workspace]; this.store.replaceWorkspaces(workspaces); return { workspace, workspaces };
  }

  createBranch(input: Parameters<LegacyCorePlatformCompatibilityPort["createBranch"]>[0]): ReturnType<LegacyCorePlatformCompatibilityPort["createBranch"]> {
    if (input.businessUnitId && !branchNameAvailable(input.branches, input.businessUnitId, input.name)) throw new Error("branch_name_exists");
    const branch = { id: this.deterministic.createId("br"), workspaceId: input.workspaceId, businessUnitId: input.businessUnitId, name: input.name, city: input.city || undefined, branchCity: input.city || undefined, address: input.address || undefined, branchAddressLine1: input.address || undefined, country: input.country || input.workspaceCountry, currency: input.currency || input.workspaceCurrency, isMain: input.isMain, createdAt: this.deterministic.now() };
    const branches = [...input.branches, branch];
    const enablements = input.osSubscriptionId ? input.enablements.map((item) => item.osSubscriptionId === input.osSubscriptionId ? { ...item, businessUnitId: input.businessUnitId || item.businessUnitId, branchIds: [...new Set([...(item.branchIds || []), branch.id])], scope: item.scope === "workspace" && input.businessUnitId ? "business" as const : item.scope, updatedAt: this.deterministic.now() } : item) : [...input.enablements];
    this.store.replaceBranches(branches); this.store.replaceEnablements(enablements); return { branch, branches, enablements };
  }

  addBranch(input: Parameters<LegacyCorePlatformCompatibilityPort["addBranch"]>[0]): ReturnType<LegacyCorePlatformCompatibilityPort["addBranch"]> {
    if (!branchNameAvailable(input.branches, input.businessUnitId, input.name)) throw new Error("branch_name_exists");
    const branch = { id: this.deterministic.createId("br"), workspaceId: input.workspaceId, businessUnitId: input.businessUnitId, name: input.name, city: input.city || undefined, branchCity: input.city || undefined, address: input.address || undefined, branchAddressLine1: input.address || undefined, country: input.workspaceCountry, currency: input.workspaceCurrency, isMain: false, createdAt: this.deterministic.now() };
    const branches = [...input.branches, branch];
    const enablements = input.enablements.map((item) => item.workspaceId === input.workspaceId && item.osId === "commerce" && item.businessUnitId === input.businessUnitId && item.status === "active" ? { ...item, branchIds: [...new Set([...(item.branchIds || []), branch.id])], updatedAt: this.deterministic.now() } : item);
    this.store.replaceBranches(branches); this.store.replaceEnablements(enablements); return { branch, branches, enablements };
  }

  selectPlan(input: Parameters<LegacyCorePlatformCompatibilityPort["selectPlan"]>[0]): ReturnType<LegacyCorePlatformCompatibilityPort["selectPlan"]> {
    const subscription = { id: this.deterministic.createId("sub"), workspaceId: input.workspaceId, os: input.osId, osId: input.osId, plan: input.planKey, planId: input.planId, status: "trialing" as const, startedAt: this.deterministic.now(), trialEndsAt: new Date(this.deterministic.nowMs() + 14 * 86400000).toISOString().slice(0, 10), renewsAt: new Date(this.deterministic.nowMs() + 14 * 86400000).toISOString().slice(0, 10) };
    const subscriptions = [...input.subscriptions, subscription]; this.store.replaceSubscriptions(subscriptions); return { subscription, subscriptions };
  }

  createBusinessUnit(input: Parameters<LegacyCorePlatformCompatibilityPort["createBusinessUnit"]>[0]): ReturnType<LegacyCorePlatformCompatibilityPort["createBusinessUnit"]> {
    const businessUnit = { id: this.deterministic.createId("bu"), workspaceId: input.workspaceId, osSubscriptionId: input.osSubscriptionId, os: input.osId, osId: input.osId, selectedOS: input.osId, branchIds: input.currentBranchId ? [input.currentBranchId] : [], branchId: input.currentBranchId || "", name: input.name, industryType: input.industryType || input.preset, preset: input.preset, presetId: input.preset, createdAt: this.deterministic.now() };
    const branches = input.branches.map((branch) => branch.id === input.currentBranchId ? { ...branch, businessUnitId: businessUnit.id } : branch);
    const businessUnits = [...input.businessUnits, businessUnit];
    const existing = input.enablements.find((item) => item.workspaceId === input.workspaceId && item.osId === "commerce" && item.businessUnitId === businessUnit.id && item.status === "active");
    let enablements: readonly OSEnablement[] = [...input.enablements];
    if (!existing) {
      const subscription = input.subscriptions.find((item) => item.workspaceId === input.workspaceId && item.osId === "commerce" && (item.status === "trialing" || item.status === "active"));
      if (subscription) { const now = this.deterministic.now(); enablements = [...input.enablements, { id: this.deterministic.createId("ose"), workspaceId: input.workspaceId, osId: "commerce", osSubscriptionId: subscription.id, scope: "business", businessUnitId: businessUnit.id, branchIds: businessUnit.branchIds, status: "active", createdAt: now, updatedAt: now }]; }
    }
    this.store.replaceBusinessUnits(businessUnits); this.store.replaceBranches(branches); this.store.replaceEnablements(enablements);
    return { businessUnit, businessUnits, branches, enablements };
  }
}
