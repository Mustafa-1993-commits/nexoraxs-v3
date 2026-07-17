import { describe, expect, it, vi } from "vitest";
import { createCommerceServices, MemoryCommerceStore } from "../../products";
describe("Feature 053 runtime configuration", () => {
  it("constructs one additive mock runtime over an isolated compatibility store", () => {
    const services = createCommerceServices({ dataSource: "mock", mockLatencyMs: 0 }, { store: new MemoryCommerceStore() });
    expect(new Set([
      services.customersRepository, services.inventoryRepository, services.ordersRepository,
      services.invoicesRepository, services.customersFacade,
    ]).size).toBe(5);
  });
  it("keeps HTTP unavailable before any request for every domain", () => {
    const request = vi.fn(); vi.stubGlobal("fetch", request);
    expect(() => createCommerceServices({ dataSource: "http", apiBaseUrl: "https://api.example.test" })).toThrow();
    expect(request).not.toHaveBeenCalled();
  });
});
