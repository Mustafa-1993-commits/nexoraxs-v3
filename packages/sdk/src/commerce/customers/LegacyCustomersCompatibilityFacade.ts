import type { CreateLegacyCustomerCommand, LegacyCommerceBusinessUnitScope, LegacyCustomerCompatibilityRecord, LegacyCustomersRepository, UpdateLegacyCustomerCommand } from "@nexoraxs/contracts";

export interface LegacyCustomersCompatibilitySnapshot {
  readonly scope: LegacyCommerceBusinessUnitScope;
  readonly customers: readonly LegacyCustomerCompatibilityRecord[];
}
export type LegacyCustomersCompatibilityListener = (snapshot: LegacyCustomersCompatibilitySnapshot) => void;

/** Repository-upstream, temporary bridge for remaining legacy readers. */
export class LegacyCustomersCompatibilityFacade {
  private readonly listeners = new Set<LegacyCustomersCompatibilityListener>();
  constructor(private readonly repository: LegacyCustomersRepository) {}
  async list(scope: LegacyCommerceBusinessUnitScope) {
    const result = await this.repository.list(scope);
    this.publish(scope, result.items);
    return result;
  }
  async create(scope: LegacyCommerceBusinessUnitScope, command: CreateLegacyCustomerCommand) {
    const record = await this.repository.create(scope, command);
    await this.publishCurrent(scope);
    return record;
  }
  async update(scope: LegacyCommerceBusinessUnitScope, command: UpdateLegacyCustomerCommand) {
    const record = await this.repository.update(scope, command);
    await this.publishCurrent(scope);
    return record;
  }
  subscribe(listener: LegacyCustomersCompatibilityListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  private async publishCurrent(scope: LegacyCommerceBusinessUnitScope): Promise<void> {
    const result = await this.repository.list(scope);
    this.publish(scope, result.items);
  }
  private publish(scope: LegacyCommerceBusinessUnitScope, customers: readonly LegacyCustomerCompatibilityRecord[]): void {
    const snapshot = { scope: { ...scope }, customers: structuredClone(customers) };
    for (const listener of this.listeners) listener(snapshot);
  }
}
