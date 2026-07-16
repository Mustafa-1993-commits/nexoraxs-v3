export const LEGACY_PRODUCT_ERROR_CODES = [
  "validation",
  "not_found",
  "duplicate_sku",
  "scope_mismatch",
  "configured_failure",
  "configuration",
  "storage",
] as const;

export type LegacyProductErrorCode = (typeof LEGACY_PRODUCT_ERROR_CODES)[number];

export interface LegacyProductFieldIssue {
  readonly field: string;
  readonly messageKey: string;
}

/** Frontend-internal error contract; not a platform or future HTTP error taxonomy. */
export class LegacyProductRepositoryError extends Error {
  readonly code: LegacyProductErrorCode;
  readonly messageKey: string;
  readonly fieldIssues: readonly LegacyProductFieldIssue[];

  constructor(input: {
    code: LegacyProductErrorCode;
    messageKey: string;
    fieldIssues?: readonly LegacyProductFieldIssue[];
    cause?: unknown;
  }) {
    super(input.messageKey, { cause: input.cause });
    this.name = "LegacyProductRepositoryError";
    this.code = input.code;
    this.messageKey = input.messageKey;
    this.fieldIssues = input.fieldIssues ?? [];
  }
}
