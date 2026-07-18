import {
  LegacyOrderCommandRepositoryError,
  LegacyProductRepositoryError,
  type LegacyOrderCommandStore,
} from "@nexoraxs/contracts";
import { LegacyCommerceRepositoryError, type LegacyCommerceOperation } from "@nexoraxs/contracts";
import type { MockCustomersStore } from "../customers/MockCustomersStore";
import type { MockInventoryStore } from "../inventory/MockInventoryStore";
import type { MockInvoicesStore } from "../invoices/MockInvoicesStore";
import type { MockOrdersStore } from "../orders/MockOrdersStore";
import type { MockCommerceStore } from "./MockCommerceStore";

export const LEGACY_PRODUCTS_STORAGE_KEY = "nexoraxs.db.commerceProducts";
export const LEGACY_CUSTOMERS_STORAGE_KEY = "nexoraxs.db.commerceCustomers";
export const LEGACY_INVENTORY_STORAGE_KEY = "nexoraxs.db.branchInventory";
export const LEGACY_ORDERS_STORAGE_KEY = "nexoraxs.db.commerceOrders";
export const LEGACY_INVOICES_STORAGE_KEY = "nexoraxs.db.commerceInvoices";

export interface LegacyProductStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

function storageError(cause: unknown): LegacyProductRepositoryError {
  return new LegacyProductRepositoryError({
    code: "storage",
    messageKey: "products.errors.storage",
    cause,
  });
}

/** The only Feature 052 module allowed to access browser localStorage. */
export class BrowserStorageCommerceStore implements MockCommerceStore, MockCustomersStore, MockInventoryStore, MockOrdersStore, MockInvoicesStore, LegacyOrderCommandStore {
  private readonly storage: LegacyProductStorageLike | null;

  constructor(storage?: LegacyProductStorageLike) {
    this.storage = storage ?? (typeof window === "undefined" ? null : window.localStorage);
  }

  async readProducts(): Promise<readonly unknown[]> {
    if (!this.storage) throw storageError(new Error("Browser storage is unavailable"));

    try {
      const raw = this.storage.getItem(LEGACY_PRODUCTS_STORAGE_KEY);
      if (raw === null) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error("Legacy Product storage must contain an array");
      return structuredClone(parsed);
    } catch (error) {
      throw storageError(error);
    }
  }

  async replaceProducts(records: readonly unknown[]): Promise<void> {
    if (!this.storage) throw storageError(new Error("Browser storage is unavailable"));

    try {
      const serialized = JSON.stringify(records);
      this.storage.setItem(LEGACY_PRODUCTS_STORAGE_KEY, serialized);
    } catch (error) {
      throw storageError(error);
    }
  }

  readCustomers(): Promise<readonly unknown[]> {
    return this.readCollection(LEGACY_CUSTOMERS_STORAGE_KEY, "customers.list");
  }

  replaceCustomers(records: readonly unknown[]): Promise<void> {
    return this.replaceCollection(LEGACY_CUSTOMERS_STORAGE_KEY, records, "customers.update");
  }

  readInventory(): Promise<readonly unknown[]> {
    return this.readCollection(LEGACY_INVENTORY_STORAGE_KEY, "inventory.list");
  }

  readOrders(): Promise<readonly unknown[]> {
    return this.readCollection(LEGACY_ORDERS_STORAGE_KEY, "orders.list");
  }

  readOrderCommandRecords(): readonly unknown[] {
    if (!this.storage) {
      throw new LegacyOrderCommandRepositoryError({ code: "storage_unavailable", operation: "list-for-numbering" });
    }
    try {
      const raw = this.storage.getItem(LEGACY_ORDERS_STORAGE_KEY);
      if (raw === null) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error("Legacy Order storage must contain an array");
      return structuredClone(parsed);
    } catch (cause) {
      throw new LegacyOrderCommandRepositoryError({ code: "storage_unavailable", operation: "list-for-numbering", cause });
    }
  }

  replaceOrderCommandRecords(records: readonly unknown[]): void {
    if (!this.storage) {
      throw new LegacyOrderCommandRepositoryError({ code: "storage_unavailable", operation: "create" });
    }
    try {
      this.storage.setItem(LEGACY_ORDERS_STORAGE_KEY, JSON.stringify(records));
    } catch (cause) {
      throw new LegacyOrderCommandRepositoryError({ code: "storage_unavailable", operation: "create", cause });
    }
  }

  readInvoices(): Promise<readonly unknown[]> {
    return this.readCollection(LEGACY_INVOICES_STORAGE_KEY, "invoices.list");
  }

  private async readCollection(key: string, operation: LegacyCommerceOperation): Promise<readonly unknown[]> {
    if (!this.storage) throw new LegacyCommerceRepositoryError({ code: "storage_unavailable", operation });
    try {
      const raw = this.storage.getItem(key);
      if (raw === null) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error("Legacy Commerce storage must contain an array");
      return structuredClone(parsed);
    } catch (cause) {
      throw new LegacyCommerceRepositoryError({ code: "storage_unavailable", operation, cause });
    }
  }

  private async replaceCollection(
    key: string,
    records: readonly unknown[],
    operation: LegacyCommerceOperation,
  ): Promise<void> {
    if (!this.storage) throw new LegacyCommerceRepositoryError({ code: "storage_unavailable", operation });
    try {
      this.storage.setItem(key, JSON.stringify(records));
    } catch (cause) {
      throw new LegacyCommerceRepositoryError({ code: "storage_unavailable", operation, cause });
    }
  }
}
