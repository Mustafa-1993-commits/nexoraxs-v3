import type { MockCommerceStore } from "./MockCommerceStore";
import type { MockCustomersStore } from "../customers/MockCustomersStore";
import type { MockInventoryStore } from "../inventory/MockInventoryStore";
import type { MockInvoicesStore } from "../invoices/MockInvoicesStore";
import type { MockOrdersStore } from "../orders/MockOrdersStore";

function clone<T>(value: T): T {
  return structuredClone(value);
}

/** Browser-independent, per-instance mock storage for deterministic tests. */
export interface MemoryCommerceCollections {
  readonly customers?: readonly unknown[];
  readonly inventory?: readonly unknown[];
  readonly orders?: readonly unknown[];
  readonly invoices?: readonly unknown[];
}

export class MemoryCommerceStore implements MockCommerceStore, MockCustomersStore, MockInventoryStore, MockOrdersStore, MockInvoicesStore {
  private products: readonly unknown[];
  private customers: readonly unknown[];
  private inventory: readonly unknown[];
  private orders: readonly unknown[];
  private invoices: readonly unknown[];

  constructor(products: readonly unknown[] = [], collections: MemoryCommerceCollections = {}) {
    this.products = clone(products);
    this.customers = clone(collections.customers ?? []);
    this.inventory = clone(collections.inventory ?? []);
    this.orders = clone(collections.orders ?? []);
    this.invoices = clone(collections.invoices ?? []);
  }

  async readProducts(): Promise<readonly unknown[]> {
    return clone(this.products);
  }

  async replaceProducts(records: readonly unknown[]): Promise<void> {
    this.products = clone(records);
  }

  async readCustomers(): Promise<readonly unknown[]> { return clone(this.customers); }
  async replaceCustomers(records: readonly unknown[]): Promise<void> { this.customers = clone(records); }
  async readInventory(): Promise<readonly unknown[]> { return clone(this.inventory); }
  async readOrders(): Promise<readonly unknown[]> { return clone(this.orders); }
  async readInvoices(): Promise<readonly unknown[]> { return clone(this.invoices); }
}
