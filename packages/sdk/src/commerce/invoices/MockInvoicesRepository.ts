import { LegacyCommerceRepositoryError, type LegacyCommerceBranchFilteredListQuery, type LegacyCommerceBusinessUnitScope, type LegacyCommerceListResult, type LegacyInvoiceCompatibilityRecord, type LegacyInvoicesRepository } from "@nexoraxs/contracts";
import { LegacyCommerceMockBehavior, normalizeLegacyBranchId, normalizeLegacyBusinessUnitScope, type LegacyCommerceMockBehaviorOptions } from "../common/legacy-commerce-mock-behavior";
import type { MockInvoicesStore } from "./MockInvoicesStore";
import { parseLegacyInvoiceRecord, parseLegacyInvoiceRecords } from "./legacy-invoice-serialization";

export class MockInvoicesRepository implements LegacyInvoicesRepository {
  private readonly behavior: LegacyCommerceMockBehavior;
  constructor(private readonly store: MockInvoicesStore, options: LegacyCommerceMockBehaviorOptions = {}) { this.behavior = new LegacyCommerceMockBehavior(options); }
  list(scopeInput: LegacyCommerceBusinessUnitScope, query: LegacyCommerceBranchFilteredListQuery = {}): Promise<LegacyCommerceListResult<LegacyInvoiceCompatibilityRecord>> {
    return this.behavior.execute({ operation: "invoices.list", scope: scopeInput, action: async () => {
      const scope = normalizeLegacyBusinessUnitScope(scopeInput, "invoices.list");
      const branchId = query.branchId === undefined ? null : normalizeLegacyBranchId(query.branchId, "invoices.list");
      const search = query.search?.trim().toLocaleLowerCase("en-US") ?? "";
      const items = parseLegacyInvoiceRecords(await this.store.readInvoices()).filter((record) => (
        record.workspaceId === scope.workspaceId && record.businessUnitId === scope.legacyBusinessUnitId
        && (branchId === null || record.branchId === branchId)
        && (!search || record.invoiceNumber.toLocaleLowerCase("en-US").includes(search))
      ));
      return { items: structuredClone(items) };
    } });
  }
  getById(scopeInput: LegacyCommerceBusinessUnitScope, invoiceIdInput: string): Promise<LegacyInvoiceCompatibilityRecord> {
    const invoiceId = invoiceIdInput.trim();
    return this.behavior.execute({ operation: "invoices.getById", scope: scopeInput, resourceId: invoiceId, action: async () => {
      const scope = normalizeLegacyBusinessUnitScope(scopeInput, "invoices.getById");
      if (!invoiceId) throw new LegacyCommerceRepositoryError({ code: "validation", operation: "invoices.getById" });
      const record = (await this.store.readInvoices()).map((value) => parseLegacyInvoiceRecord(value, "invoices.getById"))
        .find((candidate) => candidate.id === invoiceId && candidate.workspaceId === scope.workspaceId && candidate.businessUnitId === scope.legacyBusinessUnitId);
      if (!record) throw new LegacyCommerceRepositoryError({ code: "not_found", operation: "invoices.getById" });
      return structuredClone(record);
    } });
  }
}
