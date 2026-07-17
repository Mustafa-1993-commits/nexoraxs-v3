import { type LegacyCommerceBranchScope, type LegacyCommerceListQuery, type LegacyCommerceListResult, type LegacyBranchInventoryCompatibilityRecord, type LegacyInventoryRepository } from "@nexoraxs/contracts";
import { LegacyCommerceMockBehavior, normalizeLegacyBranchId, normalizeLegacyBusinessUnitScope, type LegacyCommerceMockBehaviorOptions } from "../common/legacy-commerce-mock-behavior";
import type { MockInventoryStore } from "./MockInventoryStore";
import { parseLegacyInventoryRecords } from "./legacy-inventory-serialization";

export class MockInventoryRepository implements LegacyInventoryRepository {
  private readonly behavior: LegacyCommerceMockBehavior;
  constructor(private readonly store: MockInventoryStore, options: LegacyCommerceMockBehaviorOptions = {}) { this.behavior = new LegacyCommerceMockBehavior(options); }
  list(scopeInput: LegacyCommerceBranchScope, query: LegacyCommerceListQuery = {}): Promise<LegacyCommerceListResult<LegacyBranchInventoryCompatibilityRecord>> {
    return this.behavior.execute({ operation: "inventory.list", scope: scopeInput, action: async () => {
      const scope = normalizeLegacyBusinessUnitScope(scopeInput, "inventory.list");
      const branchId = normalizeLegacyBranchId(scopeInput.branchId, "inventory.list");
      const search = query.search?.trim().toLocaleLowerCase("en-US") ?? "";
      const items = parseLegacyInventoryRecords(await this.store.readInventory()).filter((record) => (
        record.workspaceId === scope.workspaceId && record.businessUnitId === scope.legacyBusinessUnitId
        && record.branchId === branchId && (!search || record.productId.toLocaleLowerCase("en-US").includes(search))
      ));
      return { items: structuredClone(items) };
    } });
  }
}
