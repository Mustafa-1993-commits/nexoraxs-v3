export interface MockCustomersStore {
  readCustomers(): Promise<readonly unknown[]>;
  replaceCustomers(records: readonly unknown[]): Promise<void>;
}
