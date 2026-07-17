import { describe, expect, it, vi } from "vitest";
import { LegacyProductRepositoryError } from "@nexoraxs/contracts";
import { createCommerceServices } from "../../runtime/createCommerceServices";
import { MemoryCommerceStore } from "../MemoryCommerceStore";
import { MockProductsRepository } from "../MockProductsRepository";
import { MockCustomersRepository } from "../../customers/MockCustomersRepository";
import { MockInventoryRepository } from "../../inventory/MockInventoryRepository";
import { MockInvoicesRepository } from "../../invoices/MockInvoicesRepository";
import { MockOrdersRepository } from "../../orders/MockOrdersRepository";

describe("Commerce Product composition root", () => {
  it("constructs mock services over an injected isolated store", () => {
    const store = new MemoryCommerceStore();

    const services = createCommerceServices({ dataSource: "mock" }, { store });

    expect(services.productsRepository).toBeInstanceOf(MockProductsRepository);
    expect(services.customersRepository).toBeInstanceOf(MockCustomersRepository);
    expect(services.inventoryRepository).toBeInstanceOf(MockInventoryRepository);
    expect(services.ordersRepository).toBeInstanceOf(MockOrdersRepository);
    expect(services.invoicesRepository).toBeInstanceOf(MockInvoicesRepository);
    expect(services.customersFacade).toBeDefined();
    expect(Object.values(services).every((value) => value !== undefined)).toBe(true);
  });

  it.each([-1, Number.NaN, Number.POSITIVE_INFINITY])(
    "rejects invalid deterministic mock latency %s",
    (mockLatencyMs) => {
      expect(() => createCommerceServices({ dataSource: "mock", mockLatencyMs })).toThrowError(
        expect.objectContaining({ code: "configuration" }),
      );
    },
  );

  it("rejects an unknown runtime source", () => {
    expect(() => createCommerceServices({ dataSource: "unknown" as "mock" })).toThrowError(
      expect.objectContaining({
        code: "configuration",
        messageKey: "products.errors.configuration.data_source",
      }),
    );
  });

  it("requires a base URL for future HTTP selection", () => {
    expect(() => createCommerceServices({ dataSource: "http" })).toThrowError(
      expect.objectContaining({
        code: "configuration",
        messageKey: "products.errors.configuration.api_base_url",
      }),
    );
  });

  it("reports configured HTTP as unavailable without issuing a network request", () => {
    const request = vi.fn();
    vi.stubGlobal("fetch", request);

    expect(() => createCommerceServices({ dataSource: "http", apiBaseUrl: "https://api.example.test" }))
      .toThrowError(LegacyProductRepositoryError);
    expect(request).not.toHaveBeenCalled();
  });
});
