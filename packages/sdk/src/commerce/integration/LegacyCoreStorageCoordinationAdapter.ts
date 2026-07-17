import type {
  CoreStorageCoordinationCompatibilityPort,
  LegacyCommerceDeterministicDependencies,
  LegacyCommerceOperationsStore,
  LegacyStorageAllocationResult,
  LegacyWorkspaceStorageUsageProjection,
} from "@nexoraxs/contracts";

export class LegacyCoreStorageCoordinationAdapter implements CoreStorageCoordinationCompatibilityPort {
  constructor(
    private readonly store: LegacyCommerceOperationsStore,
    private readonly deterministic: LegacyCommerceDeterministicDependencies,
  ) {}

  assessAllocation(input: { workspaceId: string; candidateBytes: number }): LegacyStorageAllocationResult {
    const usage = this.store.readStorageUsage().find((item) => item.workspaceId === input.workspaceId) ?? null;
    return {
      allowed: usage === null || usage.usedBytes + input.candidateBytes <= usage.limitBytes,
      usage: usage ? structuredClone(usage) : null,
    };
  }

  commitUsageDelta(input: { workspaceId: string; deltaBytes: number }): LegacyWorkspaceStorageUsageProjection | null {
    const rows = [...this.store.readStorageUsage()];
    const existing = rows.find((item) => item.workspaceId === input.workspaceId);
    if (!existing) {
      this.store.replaceStorageUsage(rows);
      return null;
    }
    const updated = {
      ...existing,
      usedBytes: Math.max(0, existing.usedBytes + input.deltaBytes),
      updatedAt: this.deterministic.now(),
    };
    this.store.replaceStorageUsage(rows.map((item) => item.workspaceId === input.workspaceId ? updated : item));
    return structuredClone(updated);
  }
}
