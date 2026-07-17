import {
  LegacyCommerceRepositoryError,
  type LegacyCommerceBusinessUnitScope,
  type LegacyCommerceErrorCode,
  type LegacyCommerceOperation,
} from "@nexoraxs/contracts";

export interface LegacyCommerceFailureRule {
  readonly operation: LegacyCommerceOperation;
  readonly invocation?: number;
  readonly resourceId?: string;
  readonly errorCode?: Extract<LegacyCommerceErrorCode, "configured_failure" | "storage_unavailable">;
}

export interface LegacyCommerceDiagnosticEvent {
  readonly operation: LegacyCommerceOperation;
  readonly invocation: number;
  readonly durationMs: number;
  readonly outcome: "success" | LegacyCommerceErrorCode;
  readonly scopeCorrelation: string;
}

export interface LegacyCommerceMockBehaviorOptions {
  readonly latencyMs?: number;
  readonly failureRules?: readonly LegacyCommerceFailureRule[];
  readonly onDiagnostic?: (event: LegacyCommerceDiagnosticEvent) => void;
  readonly now?: () => Date;
  readonly createId?: () => string;
}

export function legacyCommerceScopeCorrelation(scope: LegacyCommerceBusinessUnitScope): string {
  return `${scope.workspaceId.trim().length}:${scope.legacyBusinessUnitId.trim().length}`;
}

function delay(milliseconds: number): Promise<void> {
  return milliseconds === 0 ? Promise.resolve() : new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export class LegacyCommerceMockBehavior {
  private readonly invocations = new Map<LegacyCommerceOperation, number>();
  private readonly latencyMs: number;

  constructor(private readonly options: LegacyCommerceMockBehaviorOptions = {}) {
    this.latencyMs = options.latencyMs ?? 0;
    if (!Number.isFinite(this.latencyMs) || this.latencyMs < 0) {
      throw new LegacyCommerceRepositoryError({
        code: "configuration",
        operation: "customers.list",
      });
    }
  }

  async execute<T>(input: {
    readonly operation: LegacyCommerceOperation;
    readonly scope: LegacyCommerceBusinessUnitScope;
    readonly resourceId?: string;
    readonly action: () => Promise<T>;
  }): Promise<T> {
    const invocation = (this.invocations.get(input.operation) ?? 0) + 1;
    this.invocations.set(input.operation, invocation);
    await delay(this.latencyMs);
    try {
      const rule = this.options.failureRules?.find((candidate) => (
        candidate.operation === input.operation
        && (candidate.invocation === undefined || candidate.invocation === invocation)
        && (candidate.resourceId === undefined || candidate.resourceId === input.resourceId)
      ));
      if (rule) {
        throw new LegacyCommerceRepositoryError({
          code: rule.errorCode ?? "configured_failure",
          operation: input.operation,
          retryable: true,
        });
      }
      const result = await input.action();
      this.emit(input, invocation, "success");
      return result;
    } catch (error) {
      const outcome = error instanceof LegacyCommerceRepositoryError ? error.code : "configured_failure";
      this.emit(input, invocation, outcome);
      throw error;
    }
  }

  private emit(
    input: { operation: LegacyCommerceOperation; scope: LegacyCommerceBusinessUnitScope },
    invocation: number,
    outcome: LegacyCommerceDiagnosticEvent["outcome"],
  ): void {
    this.options.onDiagnostic?.({
      operation: input.operation,
      invocation,
      durationMs: this.latencyMs,
      outcome,
      scopeCorrelation: legacyCommerceScopeCorrelation(input.scope),
    });
  }
}

export function normalizeLegacyBusinessUnitScope(
  scope: LegacyCommerceBusinessUnitScope,
  operation: LegacyCommerceOperation,
): LegacyCommerceBusinessUnitScope {
  const workspaceId = scope.workspaceId.trim();
  const legacyBusinessUnitId = scope.legacyBusinessUnitId.trim();
  if (!workspaceId || !legacyBusinessUnitId) {
    throw new LegacyCommerceRepositoryError({ code: "invalid_scope", operation });
  }
  return { workspaceId, legacyBusinessUnitId };
}

export function normalizeLegacyBranchId(branchId: string, operation: LegacyCommerceOperation): string {
  const normalized = branchId.trim();
  if (!normalized) throw new LegacyCommerceRepositoryError({ code: "invalid_scope", operation });
  return normalized;
}
