import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { MemoryCommerceStore, MemoryLegacyCommerceOperationsStore, createCommerceServices } from "@nexoraxs/sdk/testing";
import { createCommerceApplicationServices } from "../../apps/commerce/lib/commerce/createCommerceApplicationServices";
import {
  commerce055Context,
  commerce055Invoice,
  commerce055Product,
} from "../../apps/commerce/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";

describe("SDK runtime substitution surface", () => {
  it("keeps concrete infrastructure private while allowing test-only memory substitution", () => {
    const manifest = JSON.parse(readFileSync("packages/sdk/package.json", "utf8")) as { exports: Record<string, string> };
    expect(manifest.exports).toEqual({ ".": "./src/index.ts", "./testing": "./src/testing/index.ts" });
    expect(readFileSync("packages/sdk/src/testing/index.ts", "utf8")).toContain("MemoryLegacyCommerceOperationsStore");
    expect(readFileSync("packages/sdk/src/index.ts", "utf8")).not.toContain("MemoryLegacyCommerceOperationsStore");
  });

  it("substitutes contract-typed command dependencies only at composition", () => {
    const store = new MemoryCommerceStore([], { orders: [] });
    const operationsStore = new MemoryLegacyCommerceOperationsStore({ products: [commerce055Product] });
    const sdk = createCommerceServices({ dataSource: "mock" }, { store, operationsStore });
    const publications: string[] = [];
    const lastOrders: string[] = [];
    const services = createCommerceApplicationServices(sdk, {} as never, {
      deterministic: {
        createId: (prefix) => `${prefix}-substitute`,
        now: () => "2026-07-17T00:00:00.000Z",
      },
      changes: {
        productsChanged: vi.fn(async () => undefined), customersChanged: vi.fn(async () => undefined),
        inventoryChanged: vi.fn(async () => undefined), ordersChanged: vi.fn(async () => undefined),
        invoicesChanged: vi.fn(async () => undefined),
      },
      commandPublication: {
        publishOrderResult: () => publications.push("order"),
        publishInvoiceResult: () => publications.push("invoice"),
        subscribe: () => () => undefined,
      },
      posLastOrder: {
        read: () => lastOrders.at(-1) ?? null,
        write: (orderId) => { lastOrders.push(orderId); },
        clear: () => { lastOrders.length = 0; },
      },
      commercialSnapshot: {
        calculate: ({ items, discount }) => {
          const gross = items.reduce((sum, item) => sum + item.price * item.qty, 0);
          return { lines: [], gross, subtotal: gross, discount, net: gross - discount, vat: 0, total: gross - discount, rate: 0 };
        },
      },
      invoiceCommands: {
        create: (_context, command) => ({
          invoice: { ...commerce055Invoice, id: "inv-substitute", orderId: command.orderId },
          invoices: [{ ...commerce055Invoice, id: "inv-substitute", orderId: command.orderId }],
        }),
      },
    });

    const draft = services.posDraftCommands.execute({
      draft: services.posDraftCommands.createInitial(),
      command: {
        type: "add-product",
        product: {
          id: commerce055Product.id, name: commerce055Product.name, price: commerce055Product.price,
          sku: commerce055Product.sku, taxable: commerce055Product.taxable,
          stock: commerce055Product.stock ?? 0, category: commerce055Product.category,
        },
      },
      setup: {},
    });
    const result = services.posCheckout.checkout({
      context: commerce055Context,
      draft: draft.draft,
      commercialSnapshot: draft.commercialSnapshot,
      tenderedAmount: 100,
    });
    expect(result.order.id).toBe("ord-substitute");
    expect((store.readOrderCommandRecords() as { id: string }[])[0].id).toBe("ord-substitute");
    expect(operationsStore.readPositions()).toHaveLength(1);
    expect(publications).toEqual(["order", "invoice"]);
    expect(lastOrders).toEqual(["ord-substitute"]);
  });
});
