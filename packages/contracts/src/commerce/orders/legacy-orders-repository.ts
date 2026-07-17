import type {
  LegacyCommerceBranchFilteredListQuery,
  LegacyCommerceBusinessUnitScope,
  LegacyCommerceListResult,
} from "../common";
import type { LegacyOrderCompatibilityRecord } from "./legacy-order-record";

export interface LegacyOrdersRepository {
  list(scope: LegacyCommerceBusinessUnitScope, query?: LegacyCommerceBranchFilteredListQuery):
    Promise<LegacyCommerceListResult<LegacyOrderCompatibilityRecord>>;
  getById(scope: LegacyCommerceBusinessUnitScope, orderId: string):
    Promise<LegacyOrderCompatibilityRecord>;
}
