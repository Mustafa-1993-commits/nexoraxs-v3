/** Temporary frontend-only scope. `legacyBusinessUnitId` maps to stored `businessUnitId`. */
export interface LegacyCommerceBusinessUnitScope {
  readonly workspaceId: string;
  readonly legacyBusinessUnitId: string;
}

export interface LegacyCommerceBranchScope extends LegacyCommerceBusinessUnitScope {
  readonly branchId: string;
}

export type LegacyCommerceOperation =
  | "customers.list"
  | "customers.getById"
  | "customers.create"
  | "customers.update"
  | "inventory.list"
  | "orders.list"
  | "orders.getById"
  | "invoices.list"
  | "invoices.getById";

export type LegacyCommerceErrorCode =
  | "invalid_scope"
  | "validation"
  | "not_found"
  | "scope_mismatch"
  | "configured_failure"
  | "storage_unavailable"
  | "configuration";

export interface LegacyCommerceFieldIssue {
  readonly field: string;
  readonly code: string;
}

/** Frontend-internal compatibility error; not a future API error taxonomy. */
export class LegacyCommerceRepositoryError extends Error {
  readonly code: LegacyCommerceErrorCode;
  readonly operation: LegacyCommerceOperation;
  readonly fieldIssues: readonly LegacyCommerceFieldIssue[];
  readonly retryable: boolean;

  constructor(input: {
    readonly code: LegacyCommerceErrorCode;
    readonly operation: LegacyCommerceOperation;
    readonly fieldIssues?: readonly LegacyCommerceFieldIssue[];
    readonly retryable?: boolean;
    readonly cause?: unknown;
  }) {
    super(`commerce.compatibility.${input.operation}.${input.code}`, { cause: input.cause });
    this.name = "LegacyCommerceRepositoryError";
    this.code = input.code;
    this.operation = input.operation;
    this.fieldIssues = input.fieldIssues ?? [];
    this.retryable = input.retryable ?? input.code === "storage_unavailable";
  }
}

export interface LegacyCommerceListResult<T> {
  readonly items: readonly T[];
}

export interface LegacyCommerceListQuery {
  readonly search?: string;
}

export interface LegacyCommerceBranchFilteredListQuery extends LegacyCommerceListQuery {
  readonly branchId?: string;
}
