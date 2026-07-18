import type { CommerceOrder } from "@nexoraxs/types";
import type {
  LegacyCommerceBranchScope,
  LegacyCommerceBusinessUnitScope,
} from "../common";

export interface LegacyOrderReturnCompatibilityPatch {
  readonly returnStatus: "partial" | "returned";
  readonly returnedTotalIncrement: number;
  readonly returnId: string;
}

export type LegacyOrderCommandRepositoryOperation =
  | "list-for-numbering"
  | "get-by-id"
  | "create"
  | "apply-return-patch"
  | "replace-demo-seed";

export type LegacyOrderCommandRepositoryErrorCode =
  | "invalid_scope"
  | "not_found"
  | "duplicate_id"
  | "scope_mismatch"
  | "configured_failure"
  | "storage_unavailable";

/** Frontend-internal local compatibility error; not a future API error contract. */
export class LegacyOrderCommandRepositoryError extends Error {
  constructor(readonly details: {
    readonly code: LegacyOrderCommandRepositoryErrorCode;
    readonly operation: LegacyOrderCommandRepositoryOperation;
    readonly cause?: unknown;
  }) {
    super(`commerce.orders.command.${details.operation}.${details.code}`, { cause: details.cause });
    this.name = "LegacyOrderCommandRepositoryError";
  }

  get code(): LegacyOrderCommandRepositoryErrorCode {
    return this.details.code;
  }

  get operation(): LegacyOrderCommandRepositoryOperation {
    return this.details.operation;
  }
}

/** Synchronous browser-demo Order persistence. It exposes no generic lifecycle mutation. */
export interface LegacyOrderCommandRepository {
  listForNumbering(scope: LegacyCommerceBusinessUnitScope): readonly CommerceOrder[];
  getById(scope: LegacyCommerceBranchScope, orderId: string): CommerceOrder | null;
  create(scope: LegacyCommerceBranchScope, order: CommerceOrder): readonly CommerceOrder[];
  applyReturnCompatibilityPatch(
    scope: LegacyCommerceBranchScope,
    orderId: string,
    patch: LegacyOrderReturnCompatibilityPatch,
  ): readonly CommerceOrder[];
  replaceDemoSeed(
    scope: LegacyCommerceBusinessUnitScope,
    orders: readonly CommerceOrder[],
  ): readonly CommerceOrder[];
}

/** SDK-internal storage port implemented by browser and memory Commerce stores. */
export interface LegacyOrderCommandStore {
  readOrderCommandRecords(): readonly unknown[];
  replaceOrderCommandRecords(records: readonly unknown[]): void;
}

