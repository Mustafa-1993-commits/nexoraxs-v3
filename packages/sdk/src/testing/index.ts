/** Explicit test-only infrastructure surface. Never import this path from production source. */
export { MemoryCommerceStore } from "../commerce/products/MemoryCommerceStore";
export type { MemoryCommerceStoreOptions } from "../commerce/products/MemoryCommerceStore";
export { LegacyOrderCommandBehavior } from "../commerce/orders/legacy-order-command-behavior";
export type { LegacyOrderCommandFailureRule } from "../commerce/orders/legacy-order-command-behavior";
export { MockProductsRepository } from "../commerce/products/MockProductsRepository";
export { MockCustomersRepository } from "../commerce/customers/MockCustomersRepository";
export { MockInventoryRepository } from "../commerce/inventory/MockInventoryRepository";
export { MockOrdersRepository } from "../commerce/orders/MockOrdersRepository";
export { MockInvoicesRepository } from "../commerce/invoices/MockInvoicesRepository";
export { MemoryLegacyCommerceOperationsStore } from "../commerce/operations/MemoryLegacyCommerceOperationsStore";
export type { MemoryLegacyCommerceOperationsSeed } from "../commerce/operations/MemoryLegacyCommerceOperationsStore";
export { BrowserLegacyCommerceOperationsStore, LEGACY_COMMERCE_OPERATION_KEYS } from "../commerce/operations/BrowserLegacyCommerceOperationsStore";
export type { LegacyCommerceOperationStorageLike } from "../commerce/operations/BrowserLegacyCommerceOperationsStore";
export {
  createCommerceServices,
  type CommerceServiceOverrides,
} from "../commerce/runtime/createCommerceServices";
export * from "../commerce/common/legacy-commerce-mock-behavior";
