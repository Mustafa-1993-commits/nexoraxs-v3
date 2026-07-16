import type { MockCommerceStore } from "./MockCommerceStore";

function clone<T>(value: T): T {
  return structuredClone(value);
}

/** Browser-independent, per-instance mock storage for deterministic tests. */
export class MemoryCommerceStore implements MockCommerceStore {
  private products: readonly unknown[];

  constructor(products: readonly unknown[] = []) {
    this.products = clone(products);
  }

  async readProducts(): Promise<readonly unknown[]> {
    return clone(this.products);
  }

  async replaceProducts(records: readonly unknown[]): Promise<void> {
    this.products = clone(records);
  }
}
