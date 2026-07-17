import type {
  LegacyCommerceBranchScope,
  LegacyCommerceListQuery,
  LegacyCommerceListResult,
} from "../common";
import type { LegacyBranchInventoryCompatibilityRecord } from "./legacy-inventory-record";

export interface LegacyInventoryRepository {
  list(scope: LegacyCommerceBranchScope, query?: LegacyCommerceListQuery):
    Promise<LegacyCommerceListResult<LegacyBranchInventoryCompatibilityRecord>>;
}
