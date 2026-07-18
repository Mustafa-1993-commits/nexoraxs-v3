import {
  LegacyOrderCommandRepositoryError,
  type LegacyCommerceBranchScope,
  type LegacyCommerceBusinessUnitScope,
  type LegacyOrderCommandRepository,
  type LegacyOrderCommandRepositoryOperation,
  type LegacyOrderCommandStore,
  type LegacyOrderReturnCompatibilityPatch,
} from "@nexoraxs/contracts";
import type { CommerceOrder } from "@nexoraxs/types";
import { parseLegacyOrderRecords } from "./legacy-order-serialization";

function valid(scope: LegacyCommerceBusinessUnitScope): boolean {
  return Boolean(scope.workspaceId.trim() && scope.legacyBusinessUnitId.trim());
}

function inBusinessUnit(order: CommerceOrder, scope: LegacyCommerceBusinessUnitScope): boolean {
  return order.workspaceId === scope.workspaceId && order.businessUnitId === scope.legacyBusinessUnitId;
}

function inBranch(order: CommerceOrder, scope: LegacyCommerceBranchScope): boolean {
  return inBusinessUnit(order, scope) && order.branchId === scope.branchId;
}

/** Private synchronous local Order writer. Its public surface is the application-owned contract. */
export class LocalOrderCommandRepository implements LegacyOrderCommandRepository {
  constructor(private readonly store: LegacyOrderCommandStore) {}

  listForNumbering(scope: LegacyCommerceBusinessUnitScope): readonly CommerceOrder[] {
    this.assertScope(scope, "list-for-numbering");
    return this.read("list-for-numbering").filter((order) => inBusinessUnit(order, scope));
  }

  getById(scope: LegacyCommerceBranchScope, orderId: string): CommerceOrder | null {
    this.assertBranchScope(scope, "get-by-id");
    return this.read("get-by-id").find((order) => order.id === orderId && inBranch(order, scope)) ?? null;
  }

  create(scope: LegacyCommerceBranchScope, order: CommerceOrder): readonly CommerceOrder[] {
    this.assertBranchScope(scope, "create");
    if (!inBranch(order, scope)) throw this.error("scope_mismatch", "create");
    const current = this.read("create");
    if (current.some((candidate) => candidate.id === order.id)) throw this.error("duplicate_id", "create");
    const next = [...current, structuredClone(order)];
    this.write(next, "create");
    return structuredClone(next.filter((candidate) => inBranch(candidate, scope)));
  }

  applyReturnCompatibilityPatch(
    scope: LegacyCommerceBranchScope,
    orderId: string,
    patch: LegacyOrderReturnCompatibilityPatch,
  ): readonly CommerceOrder[] {
    this.assertBranchScope(scope, "apply-return-patch");
    const current = this.read("apply-return-patch");
    const index = current.findIndex((order) => order.id === orderId && inBranch(order, scope));
    if (index < 0) throw this.error("not_found", "apply-return-patch");
    const next = current.map((order, candidateIndex) => candidateIndex === index ? {
      ...order,
      returnStatus: patch.returnStatus,
      returnedTotal: (order.returnedTotal || 0) + patch.returnedTotalIncrement,
      returnIds: [...(order.returnIds || []), patch.returnId],
    } : order);
    this.write(next, "apply-return-patch");
    return structuredClone(next.filter((order) => inBranch(order, scope)));
  }

  replaceDemoSeed(
    scope: LegacyCommerceBusinessUnitScope,
    orders: readonly CommerceOrder[],
  ): readonly CommerceOrder[] {
    this.assertScope(scope, "replace-demo-seed");
    if (orders.some((order) => !inBusinessUnit(order, scope))) {
      throw this.error("scope_mismatch", "replace-demo-seed");
    }
    const foreign = this.read("replace-demo-seed").filter((order) => !inBusinessUnit(order, scope));
    this.write([...foreign, ...structuredClone(orders)], "replace-demo-seed");
    return structuredClone(orders);
  }

  private read(operation: LegacyOrderCommandRepositoryOperation): CommerceOrder[] {
    try {
      return parseLegacyOrderRecords(this.store.readOrderCommandRecords()) as CommerceOrder[];
    } catch (cause) {
      if (cause instanceof LegacyOrderCommandRepositoryError) throw cause;
      throw this.error("storage_unavailable", operation, cause);
    }
  }

  private write(
    orders: readonly CommerceOrder[],
    operation: LegacyOrderCommandRepositoryOperation,
  ): readonly CommerceOrder[] {
    try {
      this.store.replaceOrderCommandRecords(orders);
      return structuredClone(orders);
    } catch (cause) {
      if (cause instanceof LegacyOrderCommandRepositoryError) throw cause;
      throw this.error("storage_unavailable", operation, cause);
    }
  }

  private assertScope(scope: LegacyCommerceBusinessUnitScope, operation: LegacyOrderCommandRepositoryOperation): void {
    if (!valid(scope)) throw this.error("invalid_scope", operation);
  }

  private assertBranchScope(scope: LegacyCommerceBranchScope, operation: LegacyOrderCommandRepositoryOperation): void {
    this.assertScope(scope, operation);
    if (!scope.branchId.trim()) throw this.error("invalid_scope", operation);
  }

  private error(
    code: ConstructorParameters<typeof LegacyOrderCommandRepositoryError>[0]["code"],
    operation: LegacyOrderCommandRepositoryOperation,
    cause?: unknown,
  ): LegacyOrderCommandRepositoryError {
    return new LegacyOrderCommandRepositoryError({ code, operation, cause });
  }
}
