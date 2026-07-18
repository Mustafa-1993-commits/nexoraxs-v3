export function invalidCoreOrderWriter(store: { replaceOrderCommandRecords(records: unknown[]): void }) {
  store.replaceOrderCommandRecords([]);
}
