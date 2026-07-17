import type { LegacyCorePlatformStore } from "@nexoraxs/contracts";
import type { Branch, BusinessUnit, OSEnablement, OSSubscription, User, Workspace, WorkspaceMember, WorkspaceStorageUsage } from "@nexoraxs/types";

const KEYS = {
  users: "nexoraxs.db.users", workspaces: "nexoraxs.db.workspaces", branches: "nexoraxs.db.branches",
  subscriptions: "nexoraxs.db.osSubscriptions", businessUnits: "nexoraxs.db.businessUnits",
  enablements: "nexoraxs.db.osEnablements",
  teamMembers: "nexoraxs.db.teamMembers", storageUsage: "nexoraxs.db.workspaceStorageUsage",
} as const;

export interface LegacyCoreStorageLike { setItem(key: string, value: string): void }

export class BrowserLegacyCorePlatformStore implements LegacyCorePlatformStore {
  constructor(private readonly storage: LegacyCoreStorageLike | null = typeof window === "undefined" ? null : window.localStorage) {}
  replaceUsers(records: readonly User[]) { this.write(KEYS.users, records); }
  replaceWorkspaces(records: readonly Workspace[]) { this.write(KEYS.workspaces, records); }
  replaceBranches(records: readonly Branch[]) { this.write(KEYS.branches, records); }
  replaceSubscriptions(records: readonly OSSubscription[]) { this.write(KEYS.subscriptions, records); }
  replaceBusinessUnits(records: readonly BusinessUnit[]) { this.write(KEYS.businessUnits, records); }
  replaceEnablements(records: readonly OSEnablement[]) { this.write(KEYS.enablements, records); }
  replaceTeamMembers(records: readonly WorkspaceMember[]) { this.write(KEYS.teamMembers, records); }
  replaceStorageUsage(records: readonly WorkspaceStorageUsage[]) { this.write(KEYS.storageUsage, records); }
  private write<T>(key: string, records: readonly T[]) {
    if (!this.storage) throw new Error("core.compatibility.storage_unavailable");
    this.storage.setItem(key, JSON.stringify(records));
  }
}
