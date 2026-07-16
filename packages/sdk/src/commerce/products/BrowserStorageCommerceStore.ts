import { LegacyProductRepositoryError } from "@nexoraxs/contracts";
import type { MockCommerceStore } from "./MockCommerceStore";

export const LEGACY_PRODUCTS_STORAGE_KEY = "nexoraxs.db.commerceProducts";

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
export class BrowserStorageCommerceStore implements MockCommerceStore {
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
}
