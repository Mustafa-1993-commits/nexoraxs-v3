export function invalidProviderOrderWriter(store: { replaceOrderCommandRecords(records: unknown[]): void }) {
  store.replaceOrderCommandRecords([]);
}
