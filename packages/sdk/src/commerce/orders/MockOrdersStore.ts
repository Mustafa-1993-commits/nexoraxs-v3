export interface MockOrdersStore {
  readOrders(): Promise<readonly unknown[]>;
}
