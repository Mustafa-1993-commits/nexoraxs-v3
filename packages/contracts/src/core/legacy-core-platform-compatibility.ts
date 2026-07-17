import type { Branch, BusinessUnit, OSEnablement, OSSubscription, User, Workspace, WorkspaceMember, WorkspaceStorageUsage } from "@nexoraxs/types";

/** Temporary frontend compatibility seam; it is not a canonical Core API contract. */
export interface LegacyCorePlatformStore {
  replaceUsers(records: readonly User[]): void;
  replaceWorkspaces(records: readonly Workspace[]): void;
  replaceBranches(records: readonly Branch[]): void;
  replaceSubscriptions(records: readonly OSSubscription[]): void;
  replaceBusinessUnits(records: readonly BusinessUnit[]): void;
  replaceEnablements(records: readonly OSEnablement[]): void;
  replaceTeamMembers(records: readonly WorkspaceMember[]): void;
  replaceStorageUsage(records: readonly WorkspaceStorageUsage[]): void;
}

export interface LegacyCorePlatformDeterministicDependencies {
  createId(prefix: string): string;
  now(): string;
  nowMs(): number;
}

export interface LegacyCorePlatformCompatibilityPort {
  persistDemoState(input: {
    users: readonly User[]; workspaces: readonly Workspace[]; branches: readonly Branch[];
    subscriptions: readonly OSSubscription[]; businessUnits: readonly BusinessUnit[];
    enablements: readonly OSEnablement[]; teamMembers: readonly WorkspaceMember[];
    storageUsage: readonly WorkspaceStorageUsage[];
  }): void;
  createUser(input: { users: readonly User[]; fullName: string; email: string; password: string }):
    | { ok: true; user: User; users: readonly User[] }
    | { ok: false; error: "email_taken" };
  createWorkspace(input: { workspaces: readonly Workspace[]; ownerUserId: string; language: string; name: string; country: string; currency: string; timezone: string }): { workspace: Workspace; workspaces: readonly Workspace[] };
  createBranch(input: {
    branches: readonly Branch[]; enablements: readonly OSEnablement[]; workspaceId: string;
    businessUnitId: string; osSubscriptionId: string | null; workspaceCountry?: string; workspaceCurrency?: string;
    name: string; city?: string; address?: string; country?: string; currency?: string; isMain: boolean;
  }): { branch: Branch; branches: readonly Branch[]; enablements: readonly OSEnablement[] };
  addBranch(input: {
    branches: readonly Branch[]; enablements: readonly OSEnablement[]; workspaceId: string;
    businessUnitId: string; workspaceCountry?: string; workspaceCurrency?: string;
    name: string; city?: string; address?: string;
  }): { branch: Branch; branches: readonly Branch[]; enablements: readonly OSEnablement[] };
  selectPlan(input: { subscriptions: readonly OSSubscription[]; workspaceId: string; osId: string; planKey: "starter" | "pro" | "business"; planId: string }): { subscription: OSSubscription; subscriptions: readonly OSSubscription[] };
  createBusinessUnit(input: {
    businessUnits: readonly BusinessUnit[]; branches: readonly Branch[]; enablements: readonly OSEnablement[];
    subscriptions: readonly OSSubscription[]; workspaceId: string; osSubscriptionId: string;
    currentBranchId: string | null; name: string; preset: string; osId: string; industryType?: string;
  }): { businessUnit: BusinessUnit; businessUnits: readonly BusinessUnit[]; branches: readonly Branch[]; enablements: readonly OSEnablement[] };
}
