import type {
  LegacyCommerceBusinessUnitScope,
  LegacyCommerceListQuery,
  LegacyCommerceListResult,
} from "../common";
import type {
  CreateLegacyCustomerCommand,
  LegacyCustomerCompatibilityRecord,
  UpdateLegacyCustomerCommand,
} from "./legacy-customer-record";

export interface LegacyCustomersRepository {
  list(scope: LegacyCommerceBusinessUnitScope, query?: LegacyCommerceListQuery):
    Promise<LegacyCommerceListResult<LegacyCustomerCompatibilityRecord>>;
  getById(scope: LegacyCommerceBusinessUnitScope, customerId: string):
    Promise<LegacyCustomerCompatibilityRecord>;
  create(scope: LegacyCommerceBusinessUnitScope, command: CreateLegacyCustomerCommand):
    Promise<LegacyCustomerCompatibilityRecord>;
  update(scope: LegacyCommerceBusinessUnitScope, command: UpdateLegacyCustomerCommand):
    Promise<LegacyCustomerCompatibilityRecord>;
}
