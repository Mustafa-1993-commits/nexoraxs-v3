import type {
  CommerceHandoffPort,
  CommerceProjectionPort,
  CoreStorageCoordinationCompatibilityPort,
  LegacyCommerceHandoffContext,
  LegacyCommerceProjection,
  LegacyCompressedImage,
  LegacyMediaSource,
  LegacyStorageAllocationResult,
  LegacyThumbnailOptions,
  LegacyThumbnailPort,
  LegacyWorkspaceStorageUsageProjection,
} from "@nexoraxs/contracts";

export class MemoryCommerceProjectionPort implements CommerceProjectionPort {
  constructor(private readonly projection: LegacyCommerceProjection) {}
  async readProjection(): Promise<LegacyCommerceProjection> {
    return structuredClone(this.projection);
  }
}

export class RecordingCommerceHandoffPort implements CommerceHandoffPort {
  readonly accepted: LegacyCommerceHandoffContext[] = [];
  constructor(private readonly rejection?: unknown) {}
  async accept(context: LegacyCommerceHandoffContext): Promise<void> {
    if (this.rejection !== undefined) throw this.rejection;
    this.accepted.push(structuredClone(context));
  }
}

export class MemoryStorageCoordinationPort implements CoreStorageCoordinationCompatibilityPort {
  constructor(private usage: LegacyWorkspaceStorageUsageProjection | null) {}
  readonly assessments: { workspaceId: string; candidateBytes: number }[] = [];
  readonly commits: { workspaceId: string; deltaBytes: number }[] = [];

  assessAllocation(input: { workspaceId: string; candidateBytes: number }): LegacyStorageAllocationResult {
    this.assessments.push({ ...input });
    return {
      allowed: this.usage === null || this.usage.usedBytes + input.candidateBytes <= this.usage.limitBytes,
      usage: this.usage ? { ...this.usage } : null,
    };
  }

  commitUsageDelta(input: { workspaceId: string; deltaBytes: number }): LegacyWorkspaceStorageUsageProjection | null {
    this.commits.push({ ...input });
    if (!this.usage) return null;
    this.usage = { ...this.usage, usedBytes: this.usage.usedBytes + input.deltaBytes };
    return { ...this.usage };
  }
}

export class DeterministicThumbnailPort implements LegacyThumbnailPort {
  readonly inputs: { source: LegacyMediaSource; options?: LegacyThumbnailOptions }[] = [];
  constructor(private readonly result: LegacyCompressedImage | null) {}
  async compress(source: LegacyMediaSource, options?: LegacyThumbnailOptions) {
    this.inputs.push({ source: structuredClone(source), options: options ? { ...options } : undefined });
    return this.result ? { ...this.result } : null;
  }
}
