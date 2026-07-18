import type {
  CommerceHandoffPort,
  CommerceProjectionPort,
  LegacyCustomersCompatibilityPort,
  LegacyCustomersRepository,
  LegacyInventoryRepository,
  LegacyCommerceDeterministicDependencies,
  LegacyCommerceOperationsStore,
  LegacyCorePlatformCompatibilityPort,
  LegacyCorePlatformDeterministicDependencies,
  LegacyCorePlatformStore,
  LegacyInvoicesRepository,
  LegacyOrdersRepository,
  LegacyOrderCommandRepository,
  LegacyOrderCommandStore,
  LegacySaleInventoryPersistencePort,
  LegacySaleProductSnapshotPort,
  LegacyProductsCompatibilityPort,
  LegacyProductsRepository,
} from "@nexoraxs/contracts";
import type { CoreStorageCoordinationCompatibilityPort } from "@nexoraxs/contracts";
import { LegacyProductRepositoryError } from "@nexoraxs/contracts";
import { BrowserStorageCommerceStore } from "../products/BrowserStorageCommerceStore";
import { LegacyProductsCompatibilityFacade } from "../products/LegacyProductsCompatibilityFacade";
import type { MockCommerceStore } from "../products/MockCommerceStore";
import { MockProductsRepository } from "../products/MockProductsRepository";
import type { MockProductBehaviorOptions } from "../products/mock-product-behavior";
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
import { BrowserLegacyCommerceIntegrationStore } from "../integration/BrowserLegacyCommerceIntegrationStore";
import { LegacyCommerceHandoffIngress } from "../integration/LegacyCommerceHandoffIngress";
import { LegacyCommerceProjectionAdapter } from "../integration/LegacyCommerceProjectionAdapter";
import { LegacyCoreStorageCoordinationAdapter } from "../integration/LegacyCoreStorageCoordinationAdapter";
import { BrowserLegacyCommerceOperationsStore } from "../operations/BrowserLegacyCommerceOperationsStore";
import { BrowserLegacyCorePlatformStore } from "../../core/BrowserLegacyCorePlatformStore";
import { LegacyCorePlatformCompatibilityAdapter } from "../../core/LegacyCorePlatformCompatibilityAdapter";
import { LocalOrderInventoryGateway } from "../inventory/LocalOrderInventoryGateway";
import { LocalOrderCommandRepository } from "../orders/LocalOrderCommandRepository";

export interface CommerceRuntimeConfig {
  readonly dataSource: "mock" | "http";
  readonly apiBaseUrl?: string;
  readonly mockLatencyMs?: number;
}

/** Contract-only SDK runtime surface. Concrete implementations stay inside this module. */
export interface CommerceServices {
  readonly orderCommandRepository: LegacyOrderCommandRepository;
  readonly saleProductSnapshots: LegacySaleProductSnapshotPort;
  readonly saleInventoryPersistence: LegacySaleInventoryPersistencePort;
  readonly productsRepository: LegacyProductsRepository;
  readonly productsFacade: LegacyProductsCompatibilityPort;
  readonly customersRepository: LegacyCustomersRepository;
  readonly inventoryRepository: LegacyInventoryRepository;
  readonly ordersRepository: LegacyOrdersRepository;
  readonly invoicesRepository: LegacyInvoicesRepository;
  readonly customersFacade: LegacyCustomersCompatibilityPort;
  readonly commerceProjection: CommerceProjectionPort;
  readonly commerceHandoff: CommerceHandoffPort;
  readonly operationsStore: LegacyCommerceOperationsStore;
}

export interface CommerceServiceOverrides extends MockProductBehaviorOptions {
  readonly store?: MockCommerceStore & Partial<MockCustomersStore & MockInventoryStore & MockOrdersStore & MockInvoicesStore & LegacyOrderCommandStore>;
  readonly operationsStore?: LegacyCommerceOperationsStore;
  readonly legacyBehavior?: LegacyCommerceMockBehaviorOptions;
}

export function createCommerceProjectionPort(): CommerceProjectionPort {
  return new LegacyCommerceProjectionAdapter(new BrowserLegacyCommerceIntegrationStore());
}

export function createCoreStorageCoordination(
  store: LegacyCommerceOperationsStore,
  deterministic: LegacyCommerceDeterministicDependencies,
): CoreStorageCoordinationCompatibilityPort {
  return new LegacyCoreStorageCoordinationAdapter(store, deterministic);
}

export function createCorePlatformCompatibility(
  deterministic: LegacyCorePlatformDeterministicDependencies,
  store: LegacyCorePlatformStore = new BrowserLegacyCorePlatformStore(),
): LegacyCorePlatformCompatibilityPort {
  return new LegacyCorePlatformCompatibilityAdapter(store, deterministic);
}

function configurationError(messageKey: string): LegacyProductRepositoryError {
  return new LegacyProductRepositoryError({ code: "configuration", messageKey });
}

/** Frontend-only composition root; HTTP remains an unimplemented governed extension point. */
export function createCommerceServices(
  config: CommerceRuntimeConfig,
  overrides: CommerceServiceOverrides = {},
): CommerceServices {
  if (!Number.isFinite(config.mockLatencyMs ?? 0) || (config.mockLatencyMs ?? 0) < 0) {
    throw configurationError("products.errors.configuration.mock_latency");
  }
  if (config.dataSource === "http") {
    if (!config.apiBaseUrl?.trim()) throw configurationError("products.errors.configuration.api_base_url");
    throw configurationError("products.errors.configuration.http_unavailable");
  }
  if (config.dataSource !== "mock") throw configurationError("products.errors.configuration.data_source");

  const { store, operationsStore: operationsStoreOverride, legacyBehavior, ...behavior } = overrides;
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
  const integrationStore = new BrowserLegacyCommerceIntegrationStore();
  const operationsStore = operationsStoreOverride ?? new BrowserLegacyCommerceOperationsStore();
  const orderInventoryGateway = new LocalOrderInventoryGateway(operationsStore);
  const orderCommandStore: LegacyOrderCommandStore = (
    typeof (commerceStore as Partial<LegacyOrderCommandStore>).readOrderCommandRecords === "function"
    && typeof (commerceStore as Partial<LegacyOrderCommandStore>).replaceOrderCommandRecords === "function"
  ) ? commerceStore as MockCommerceStore & LegacyOrderCommandStore : fallbackStore;
  const orderCommandRepository = new LocalOrderCommandRepository(orderCommandStore);
  return {
    orderCommandRepository,
    saleProductSnapshots: orderInventoryGateway,
    saleInventoryPersistence: orderInventoryGateway,
    productsRepository,
    productsFacade: new LegacyProductsCompatibilityFacade(productsRepository, commerceStore),
    customersRepository,
    inventoryRepository: new MockInventoryRepository(inventoryStore, compatibilityBehavior),
    ordersRepository: new MockOrdersRepository(ordersStore, compatibilityBehavior),
    invoicesRepository: new MockInvoicesRepository(invoicesStore, compatibilityBehavior),
    customersFacade: new LegacyCustomersCompatibilityFacade(customersRepository),
    commerceProjection: new LegacyCommerceProjectionAdapter(integrationStore),
    commerceHandoff: new LegacyCommerceHandoffIngress(integrationStore),
    operationsStore,
  };
}
