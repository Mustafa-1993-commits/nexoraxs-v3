import {
  LegacyCommerceRepositoryError,
  type LegacyCommerceBranchFilteredListQuery,
  type LegacyCommerceBusinessUnitScope,
  type LegacyCommerceListResult,
  type LegacyOrderCompatibilityRecord,
  type LegacyOrdersRepository,
} from "@nexoraxs/contracts";
import { LegacyCommerceMockBehavior, normalizeLegacyBranchId, normalizeLegacyBusinessUnitScope, type LegacyCommerceMockBehaviorOptions } from "../common/legacy-commerce-mock-behavior";
import type { MockOrdersStore } from "./MockOrdersStore";
import { parseLegacyOrderRecord, parseLegacyOrderRecords } from "./legacy-order-serialization";

export class MockOrdersRepository implements LegacyOrdersRepository {
  private readonly behavior: LegacyCommerceMockBehavior;
  constructor(private readonly store: MockOrdersStore, options: LegacyCommerceMockBehaviorOptions = {}) {
    this.behavior = new LegacyCommerceMockBehavior(options);
  }
  list(scopeInput: LegacyCommerceBusinessUnitScope, query: LegacyCommerceBranchFilteredListQuery = {}): Promise<LegacyCommerceListResult<LegacyOrderCompatibilityRecord>> {
    return this.behavior.execute({ operation: "orders.list", scope: scopeInput, action: async () => {
      const scope = normalizeLegacyBusinessUnitScope(scopeInput, "orders.list");
      const branchId = query.branchId === undefined ? null : normalizeLegacyBranchId(query.branchId, "orders.list");
      const search = query.search?.trim().toLocaleLowerCase("en-US") ?? "";
      const items = parseLegacyOrderRecords(await this.store.readOrders()).filter((record) => (
        record.workspaceId === scope.workspaceId && record.businessUnitId === scope.legacyBusinessUnitId
        && (branchId === null || record.branchId === branchId)
        && (!search || record.orderNumber.toLocaleLowerCase("en-US").includes(search) || (record.customerId ?? "").toLocaleLowerCase("en-US").includes(search))
      ));
      return { items: structuredClone(items) };
    } });
  }
  getById(scopeInput: LegacyCommerceBusinessUnitScope, orderIdInput: string): Promise<LegacyOrderCompatibilityRecord> {
    const orderId = orderIdInput.trim();
    return this.behavior.execute({ operation: "orders.getById", scope: scopeInput, resourceId: orderId, action: async () => {
      const scope = normalizeLegacyBusinessUnitScope(scopeInput, "orders.getById");
      if (!orderId) throw new LegacyCommerceRepositoryError({ code: "validation", operation: "orders.getById" });
      const records = (await this.store.readOrders()).map((value) => parseLegacyOrderRecord(value, "orders.getById"));
      const identified = records.find((candidate) => candidate.id === orderId);
      if (!identified) throw new LegacyCommerceRepositoryError({ code: "not_found", operation: "orders.getById" });
      if (identified.workspaceId !== scope.workspaceId || identified.businessUnitId !== scope.legacyBusinessUnitId) {
        throw new LegacyCommerceRepositoryError({ code: "scope_mismatch", operation: "orders.getById" });
      }
      const record = identified;
      return structuredClone(record);
    } });
  }
}
