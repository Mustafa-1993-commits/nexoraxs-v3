export interface MockInvoicesStore {
  readInvoices(): Promise<readonly unknown[]>;
}
