import type {
  LegacyCustomersRepository,
  LegacyInventoryRepository,
  LegacyInvoicesRepository,
  LegacyOrdersRepository,
  LegacyProductsRepository,
} from "@nexoraxs/contracts";
import { LegacyProductRepositoryError } from "@nexoraxs/contracts";
import { BrowserStorageCommerceStore } from "./BrowserStorageCommerceStore";
import { LegacyProductsCompatibilityFacade } from "./LegacyProductsCompatibilityFacade";
import type { MockCommerceStore } from "./MockCommerceStore";
import { MockProductsRepository } from "./MockProductsRepository";
import type { MockProductBehaviorOptions } from "./mock-product-behavior";
import { LegacyCustomersCompatibilityFacade } from "../customers/LegacyCustomersCompatibilityFacade";
import { MockCustomersRepository } from "../customers/MockCustomersRepository";
import type { MockCustomersStore } from "../customers/MockCustomersStore";
import { MockInventoryRepository } from "../inventory/MockInventoryRepository";
import type { MockInventoryStore } from "../inventory/MockInventoryStore";
import { MockInvoicesRepository } from "../invoices/MockInvoicesRepository";
import type { MockInvoicesStore } from "../invoices/MockInvoicesStore";
import { MockOrdersRepository } from "../orders/MockOrdersRepository";
import type { MockOrdersStore } from "../orders/MockOrdersStore";
import type { LegacyCommerceMockBehaviorOptions } from "../common/legacy-commerce-mock-behavior";

export interface CommerceRuntimeConfig {
  readonly dataSource: "mock" | "http";
  readonly apiBaseUrl?: string;
  readonly mockLatencyMs?: number;
}

export interface CommerceServices {
  readonly productsRepository: LegacyProductsRepository;
  readonly productsFacade: LegacyProductsCompatibilityFacade;
  readonly customersRepository: LegacyCustomersRepository;
  readonly inventoryRepository: LegacyInventoryRepository;
  readonly ordersRepository: LegacyOrdersRepository;
  readonly invoicesRepository: LegacyInvoicesRepository;
  readonly customersFacade: LegacyCustomersCompatibilityFacade;
}

export interface CommerceServiceOverrides extends MockProductBehaviorOptions {
  readonly store?: MockCommerceStore & Partial<MockCustomersStore & MockInventoryStore & MockOrdersStore & MockInvoicesStore>;
  readonly legacyBehavior?: LegacyCommerceMockBehaviorOptions;
}

function configurationError(messageKey: string): LegacyProductRepositoryError {
  return new LegacyProductRepositoryError({ code: "configuration", messageKey });
}

/**
 * Frontend-only composition root. HTTP mode is an intentionally request-free extension point
 * until canonical ownership, scope, authorization, and API decisions are approved.
 */
export function createCommerceServices(
  config: CommerceRuntimeConfig,
  overrides: CommerceServiceOverrides = {},
): CommerceServices {
  if (!Number.isFinite(config.mockLatencyMs ?? 0) || (config.mockLatencyMs ?? 0) < 0) {
    throw configurationError("products.errors.configuration.mock_latency");
  }
  if (config.dataSource === "http") {
    if (!config.apiBaseUrl?.trim()) {
      throw configurationError("products.errors.configuration.api_base_url");
    }
    throw configurationError("products.errors.configuration.http_unavailable");
  }
  if (config.dataSource !== "mock") {
    throw configurationError("products.errors.configuration.data_source");
  }

  const { store, legacyBehavior, ...behavior } = overrides;
  const commerceStore = store ?? new BrowserStorageCommerceStore();
  const fallbackStore = new BrowserStorageCommerceStore();
  const customersStore: MockCustomersStore = typeof commerceStore.readCustomers === "function" && typeof commerceStore.replaceCustomers === "function"
    ? commerceStore as MockCustomersStore : fallbackStore;
  const inventoryStore: MockInventoryStore = typeof commerceStore.readInventory === "function" ? commerceStore as MockInventoryStore : fallbackStore;
  const ordersStore: MockOrdersStore = typeof commerceStore.readOrders === "function" ? commerceStore as MockOrdersStore : fallbackStore;
  const invoicesStore: MockInvoicesStore = typeof commerceStore.readInvoices === "function" ? commerceStore as MockInvoicesStore : fallbackStore;
  const productsRepository = new MockProductsRepository(
    commerceStore,
    { ...behavior, latencyMs: config.mockLatencyMs ?? behavior.latencyMs },
  );
  const compatibilityBehavior = {
    ...legacyBehavior,
    latencyMs: config.mockLatencyMs ?? legacyBehavior?.latencyMs,
    now: legacyBehavior?.now ?? behavior.now,
    createId: legacyBehavior?.createId ?? behavior.createId,
  };
  const customersRepository = new MockCustomersRepository(customersStore, compatibilityBehavior);
  const inventoryRepository = new MockInventoryRepository(inventoryStore, compatibilityBehavior);
  const ordersRepository = new MockOrdersRepository(ordersStore, compatibilityBehavior);
  const invoicesRepository = new MockInvoicesRepository(invoicesStore, compatibilityBehavior);
  return {
    productsRepository,
    productsFacade: new LegacyProductsCompatibilityFacade(productsRepository, commerceStore),
    customersRepository,
    inventoryRepository,
    ordersRepository,
    invoicesRepository,
    customersFacade: new LegacyCustomersCompatibilityFacade(customersRepository),
  };
}
