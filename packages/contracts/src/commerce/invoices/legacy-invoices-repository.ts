import type {
  LegacyCommerceBranchFilteredListQuery,
  LegacyCommerceBusinessUnitScope,
  LegacyCommerceListResult,
} from "../common";
import type { LegacyInvoiceCompatibilityRecord } from "./legacy-invoice-record";

export interface LegacyInvoicesRepository {
  list(scope: LegacyCommerceBusinessUnitScope, query?: LegacyCommerceBranchFilteredListQuery):
    Promise<LegacyCommerceListResult<LegacyInvoiceCompatibilityRecord>>;
  getById(scope: LegacyCommerceBusinessUnitScope, invoiceId: string):
    Promise<LegacyInvoiceCompatibilityRecord>;
}
