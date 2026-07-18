export function invalidOrderInventoryWriter(store: { replacePositions(records: unknown[]): void }) {
  store.replacePositions([]);
}
