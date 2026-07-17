import { describe, expect, it, vi } from "vitest";
import { MemoryCommerceStore, createCommerceServices } from "@nexoraxs/sdk/testing";

const productScope = { workspaceId: "ws", legacyBusinessUnitId: "bu", branchId: "br" };
const customerScope = { workspaceId: "ws", legacyBusinessUnitId: "bu" };
const productCommand = {
  name: "Product",
  category: "Category",
  sku: "SKU",
  barcode: "",
  price: 1,
  cost: 0,
  taxable: true,
  stock: 1,
  lowStockThreshold: 0,
  notes: "",
};

describe("Product and Customer application compatibility ports", () => {
  it("publishes cloned unpaged Product snapshots, preserves seed IDs, and supports unsubscribe", async () => {
    const runtime = createCommerceServices(
      { dataSource: "mock" },
      { store: new MemoryCommerceStore() },
    );
    const listener = vi.fn();
    const unsubscribe = runtime.productsFacade.subscribe(listener);
    const product = await runtime.productsFacade.create(productScope, productCommand);

    expect(listener).toHaveBeenCalledTimes(1);
    const [publishedScope, publishedProducts] = listener.mock.calls[0];
    publishedScope.workspaceId = "mutated";
    publishedProducts[0].name = "mutated";
    await expect(runtime.productsRepository.getById(productScope, product.id)).resolves.toMatchObject({
      name: "Product",
      workspaceId: "ws",
    });

    await runtime.productsFacade.list(productScope, { page: 1, pageSize: 1 });
    expect(listener).toHaveBeenCalledTimes(1);
    await runtime.productsFacade.list(productScope);
    expect(listener).toHaveBeenCalledTimes(2);

    const seeded = { ...product, id: "legacy-seed-id", sku: "LEGACY-SEED" };
    await runtime.productsFacade.seedCompatibleProducts([seeded]);
    await expect(runtime.productsFacade.list(productScope)).resolves.toMatchObject({
      items: [{ id: "legacy-seed-id", sku: "LEGACY-SEED" }],
    });

    unsubscribe();
    await runtime.productsFacade.list(productScope);
    expect(listener).toHaveBeenCalledTimes(3);
  });

  it("publishes cloned full Customer snapshots after create/update and supports unsubscribe", async () => {
    const runtime = createCommerceServices(
      { dataSource: "mock" },
      { store: new MemoryCommerceStore() },
    );
    const listener = vi.fn();
    const unsubscribe = runtime.customersFacade.subscribe(listener);
    const customer = await runtime.customersFacade.create(customerScope, {
      branchId: "br",
      name: "Customer",
      phone: "",
      email: "",
      notes: "",
    });
    await runtime.customersFacade.update(customerScope, {
      id: customer.id,
      name: "Updated Customer",
    });

    expect(listener).toHaveBeenCalledTimes(2);
    const published = listener.mock.calls[1][0];
    published.scope.workspaceId = "mutated";
    published.customers[0].name = "mutated";
    await expect(runtime.customersRepository.getById(customerScope, customer.id)).resolves.toMatchObject({
      name: "Updated Customer",
      workspaceId: "ws",
    });

    unsubscribe();
    await runtime.customersFacade.list(customerScope);
    expect(listener).toHaveBeenCalledTimes(2);
  });
});
