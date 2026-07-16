/** Mock-only storage port. It is intentionally not part of the platform contract package. */
export interface MockCommerceStore {
  readProducts(): Promise<readonly unknown[]>;
  replaceProducts(records: readonly unknown[]): Promise<void>;
}
