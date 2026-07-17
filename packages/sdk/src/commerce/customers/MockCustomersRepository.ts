import {
  LegacyCommerceRepositoryError,
  type CreateLegacyCustomerCommand,
  type LegacyCommerceBusinessUnitScope,
  type LegacyCommerceListQuery,
  type LegacyCommerceListResult,
  type LegacyCustomerCompatibilityRecord,
  type LegacyCustomersRepository,
  type UpdateLegacyCustomerCommand,
} from "@nexoraxs/contracts";
import {
  LegacyCommerceMockBehavior,
  normalizeLegacyBranchId,
  normalizeLegacyBusinessUnitScope,
  type LegacyCommerceMockBehaviorOptions,
} from "../common/legacy-commerce-mock-behavior";
import type { MockCustomersStore } from "./MockCustomersStore";
import {
  createLegacyCustomerRecord,
  parseLegacyCustomerRecords,
  updateLegacyCustomerRecord,
} from "./legacy-customer-serialization";

function inScope(record: LegacyCustomerCompatibilityRecord, scope: LegacyCommerceBusinessUnitScope): boolean {
  return record.workspaceId === scope.workspaceId && record.businessUnitId === scope.legacyBusinessUnitId;
}
function missing(operation: "customers.getById" | "customers.update"): LegacyCommerceRepositoryError {
  return new LegacyCommerceRepositoryError({ code: "not_found", operation });
}

export class MockCustomersRepository implements LegacyCustomersRepository {
  private mutationTail: Promise<void> = Promise.resolve();
  private readonly behavior: LegacyCommerceMockBehavior;
  private readonly now: () => Date;
  private readonly createId: () => string;
  private sequence = 0;

  constructor(private readonly store: MockCustomersStore, options: LegacyCommerceMockBehaviorOptions = {}) {
    this.behavior = new LegacyCommerceMockBehavior(options);
    this.now = options.now ?? (() => new Date());
    this.createId = options.createId ?? (() => {
      this.sequence += 1;
      return `cust_${this.now().getTime().toString(36)}${this.sequence.toString(36)}`;
    });
  }

  list(scopeInput: LegacyCommerceBusinessUnitScope, query: LegacyCommerceListQuery = {}): Promise<LegacyCommerceListResult<LegacyCustomerCompatibilityRecord>> {
    return this.behavior.execute({ operation: "customers.list", scope: scopeInput, action: async () => {
      const scope = normalizeLegacyBusinessUnitScope(scopeInput, "customers.list");
      const search = query.search?.trim().toLocaleLowerCase("en-US") ?? "";
      const items = (await this.read()).filter((record) => inScope(record, scope)).filter((record) => (
        !search || [record.name, record.phone, record.email].some((value) => value.toLocaleLowerCase("en-US").includes(search))
      ));
      return { items: structuredClone(items) };
    } });
  }

  getById(scopeInput: LegacyCommerceBusinessUnitScope, customerIdInput: string): Promise<LegacyCustomerCompatibilityRecord> {
    const customerId = customerIdInput.trim();
    return this.behavior.execute({ operation: "customers.getById", scope: scopeInput, resourceId: customerId, action: async () => {
      const scope = normalizeLegacyBusinessUnitScope(scopeInput, "customers.getById");
      if (!customerId) throw new LegacyCommerceRepositoryError({ code: "validation", operation: "customers.getById" });
      const record = (await this.read()).find((candidate) => candidate.id === customerId);
      if (!record) throw missing("customers.getById");
      if (!inScope(record, scope)) throw new LegacyCommerceRepositoryError({ code: "scope_mismatch", operation: "customers.getById" });
      return structuredClone(record);
    } });
  }

  create(scopeInput: LegacyCommerceBusinessUnitScope, command: CreateLegacyCustomerCommand): Promise<LegacyCustomerCompatibilityRecord> {
    return this.mutate(() => this.behavior.execute({ operation: "customers.create", scope: scopeInput, action: async () => {
      const scope = normalizeLegacyBusinessUnitScope(scopeInput, "customers.create");
      normalizeLegacyBranchId(command.branchId, "customers.create");
      const records = await this.read();
      const record = createLegacyCustomerRecord({ scope, command, id: this.createId(), timestamp: this.now().toISOString() });
      await this.store.replaceCustomers([...records, record]);
      return structuredClone(record);
    } }));
  }

  update(scopeInput: LegacyCommerceBusinessUnitScope, command: UpdateLegacyCustomerCommand): Promise<LegacyCustomerCompatibilityRecord> {
    const customerId = command.id.trim();
    return this.mutate(() => this.behavior.execute({ operation: "customers.update", scope: scopeInput, resourceId: customerId, action: async () => {
      const scope = normalizeLegacyBusinessUnitScope(scopeInput, "customers.update");
      if (!customerId) throw new LegacyCommerceRepositoryError({ code: "validation", operation: "customers.update" });
      const records = await this.read();
      const index = records.findIndex((candidate) => candidate.id === customerId && inScope(candidate, scope));
      if (index < 0) throw missing("customers.update");
      const next = records.slice();
      const updated = updateLegacyCustomerRecord({ record: next[index], command, timestamp: this.now().toISOString() });
      next[index] = updated;
      await this.store.replaceCustomers(next);
      return structuredClone(updated);
    } }));
  }

  private async read(): Promise<LegacyCustomerCompatibilityRecord[]> {
    return parseLegacyCustomerRecords(await this.store.readCustomers());
  }
  private mutate<T>(operation: () => Promise<T>): Promise<T> {
    const result = this.mutationTail.then(operation, operation);
    this.mutationTail = result.then(() => undefined, () => undefined);
    return result;
  }
}
