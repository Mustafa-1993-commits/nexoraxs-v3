export function invalidReturnOrderWriter(store: { replaceOrderCommandRecords(records: unknown[]): void }) {
  store.replaceOrderCommandRecords([]);
}
