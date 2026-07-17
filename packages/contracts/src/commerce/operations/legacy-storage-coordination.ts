export interface LegacyWorkspaceStorageUsageProjection {
  readonly workspaceId: string;
  readonly usedBytes: number;
  readonly limitBytes: number;
  readonly updatedAt: string;
}

export interface LegacyStorageAllocationResult {
  readonly allowed: boolean;
  readonly usage: LegacyWorkspaceStorageUsageProjection | null;
}

/** Temporary Core Storage Coordination seam, not a final quota or object-storage API. */
export interface CoreStorageCoordinationCompatibilityPort {
  assessAllocation(input: {
    readonly workspaceId: string;
    readonly candidateBytes: number;
  }): LegacyStorageAllocationResult;
  commitUsageDelta(input: {
    readonly workspaceId: string;
    readonly deltaBytes: number;
  }): LegacyWorkspaceStorageUsageProjection | null;
}
