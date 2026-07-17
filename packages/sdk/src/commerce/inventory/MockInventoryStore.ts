export interface MockInventoryStore {
  readInventory(): Promise<readonly unknown[]>;
}
