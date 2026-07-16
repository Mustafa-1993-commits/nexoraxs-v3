import type { LegacyProductsRepository } from "@nexoraxs/contracts";
import { LegacyProductRepositoryError } from "@nexoraxs/contracts";
import { BrowserStorageCommerceStore } from "./BrowserStorageCommerceStore";
import { LegacyProductsCompatibilityFacade } from "./LegacyProductsCompatibilityFacade";
import type { MockCommerceStore } from "./MockCommerceStore";
import { MockProductsRepository } from "./MockProductsRepository";
import type { MockProductBehaviorOptions } from "./mock-product-behavior";

export interface CommerceRuntimeConfig {
  readonly dataSource: "mock" | "http";
  readonly apiBaseUrl?: string;
  readonly mockLatencyMs?: number;
}

export interface CommerceServices {
  readonly productsRepository: LegacyProductsRepository;
  readonly productsFacade: LegacyProductsCompatibilityFacade;
}

export interface CommerceServiceOverrides extends MockProductBehaviorOptions {
  readonly store?: MockCommerceStore;
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

  const { store, ...behavior } = overrides;
  const commerceStore = store ?? new BrowserStorageCommerceStore();
  const productsRepository = new MockProductsRepository(
    commerceStore,
    { ...behavior, latencyMs: config.mockLatencyMs ?? behavior.latencyMs },
  );
  return {
    productsRepository,
    productsFacade: new LegacyProductsCompatibilityFacade(productsRepository, commerceStore),
  };
}
