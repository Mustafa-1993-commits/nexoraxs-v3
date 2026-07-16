import {
  LegacyProductRepositoryError,
  type LegacyProductErrorCode,
  type LegacyProductScope,
} from "@nexoraxs/contracts";

export type LegacyProductOperation = "list" | "get" | "create" | "update" | "remove";

export interface MockProductFailureRule {
  readonly operation: LegacyProductOperation;
  readonly invocation?: number;
  readonly productId?: string;
  readonly normalizedSku?: string;
  readonly errorCode: Extract<
    LegacyProductErrorCode,
    "configured_failure" | "storage" | "scope_mismatch" | "not_found" | "validation" | "duplicate_sku"
  >;
}

export interface MockProductDiagnosticEvent {
  readonly operation: LegacyProductOperation;
  readonly durationMs: number;
  readonly outcome: "success" | LegacyProductErrorCode;
  readonly scopeCorrelation: string;
  readonly productId?: string;
}

export interface MockProductBehaviorOptions {
  readonly latencyMs?: number;
  readonly now?: () => Date;
  readonly createId?: () => string;
  readonly failureRules?: readonly MockProductFailureRule[];
  readonly onDiagnostic?: (event: MockProductDiagnosticEvent) => void;
}

export function legacyScopeCorrelation(scope: LegacyProductScope): string {
  const branch = scope.branchId?.trim() || "none";
  return `${scope.workspaceId.trim().length}:${scope.legacyBusinessUnitId.trim().length}:${branch.length}`;
}

interface MockProductExecution<T> {
  readonly operation: LegacyProductOperation;
  readonly scope: LegacyProductScope;
  readonly productId?: string;
  readonly normalizedSku?: string;
  readonly action: () => Promise<T>;
}

function delay(milliseconds: number): Promise<void> {
  return milliseconds > 0
    ? new Promise((resolve) => setTimeout(resolve, milliseconds))
    : Promise.resolve();
}

function outcomeFor(error: unknown): LegacyProductErrorCode {
  return error instanceof LegacyProductRepositoryError ? error.code : "configured_failure";
}

export class MockProductBehavior {
  private readonly invocations: Record<LegacyProductOperation, number> = {
    list: 0,
    get: 0,
    create: 0,
    update: 0,
    remove: 0,
  };
  private readonly latencyMs: number;

  constructor(private readonly options: MockProductBehaviorOptions) {
    this.latencyMs = options.latencyMs ?? 0;
    if (!Number.isFinite(this.latencyMs) || this.latencyMs < 0) {
      throw new LegacyProductRepositoryError({
        code: "configuration",
        messageKey: "products.errors.configuration.mock_latency",
      });
    }
  }

  async execute<T>(execution: MockProductExecution<T>): Promise<T> {
    const invocation = ++this.invocations[execution.operation];
    await delay(this.latencyMs);

    try {
      const failure = this.options.failureRules?.find((rule) => (
        rule.operation === execution.operation
        && (rule.invocation === undefined || rule.invocation === invocation)
        && (rule.productId === undefined || rule.productId === execution.productId)
        && (rule.normalizedSku === undefined || rule.normalizedSku === execution.normalizedSku)
      ));
      if (failure) {
        throw new LegacyProductRepositoryError({
          code: failure.errorCode,
          messageKey: `products.errors.mock.${failure.errorCode}`,
        });
      }

      const result = await execution.action();
      this.emit(execution, "success");
      return result;
    } catch (error) {
      this.emit(execution, outcomeFor(error));
      throw error;
    }
  }

  private emit(execution: MockProductExecution<unknown>, outcome: MockProductDiagnosticEvent["outcome"]): void {
    this.options.onDiagnostic?.({
      operation: execution.operation,
      durationMs: this.latencyMs,
      outcome,
      scopeCorrelation: legacyScopeCorrelation(execution.scope),
      ...(execution.productId ? { productId: execution.productId } : {}),
    });
  }
}
