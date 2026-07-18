import { describe, expect, it, vi } from "vitest";
import type {
  LegacyCommerceCommandPublicationPort,
  LegacyInvoiceCreationPort,
  LegacyOrderCreationPort,
  LegacyPosLastOrderPort,
} from "@nexoraxs/contracts";
import { LegacyPosCheckoutService } from "../application/LegacyPosCheckoutService";
import {
  commerce055Context,
  commerce055Invoice,
  commerce055Movement,
  commerce055Order,
  commerce055Position,
} from "@/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";

describe("LegacyPosCheckoutService", () => {
  it("maps the compatibility payload and calls every owner exactly once in order", () => {
    const calls: string[] = [];
    const orderResult = { order: commerce055Order, orders: [commerce055Order], branchInventory: [commerce055Position], stockMovements: [commerce055Movement] };
    const invoiceResult = { invoice: commerce055Invoice, invoices: [commerce055Invoice] };
    const orders: LegacyOrderCreationPort = { create: vi.fn((_context, command) => {
      calls.push("order");
      expect(command).toMatchObject({ subtotal: 180, net: 180, total: 207, discount: 20, payment: "cash" });
      return orderResult;
    }) };
    const invoices: LegacyInvoiceCreationPort = { create: vi.fn((context, command) => {
      calls.push("invoice");
      expect(context).toMatchObject({ action: "invoice.create", resourceId: commerce055Order.id });
      expect(command).toEqual({ orderId: commerce055Order.id });
      return invoiceResult;
    }) };
    const publication: LegacyCommerceCommandPublicationPort = {
      publishOrderResult: vi.fn(() => { calls.push("order.publish"); }),
      publishInvoiceResult: vi.fn(() => { calls.push("invoice.publish"); }),
      subscribe: vi.fn(() => () => undefined),
    };
    const lastOrder: LegacyPosLastOrderPort = {
      read: vi.fn(), write: vi.fn(() => { calls.push("last-order"); }), clear: vi.fn(),
    };
    const service = new LegacyPosCheckoutService(orders, invoices, publication, lastOrder);
    const result = service.checkout({
      context: commerce055Context,
      draft: {
        items: commerce055Order.items.map((item) => ({
          id: item.productId!, name: item.name, price: item.price, qty: item.qty,
          sku: item.sku ?? "", taxable: item.taxable, stock: 8, category: "General",
        })),
        customerId: commerce055Order.customerId,
        payment: commerce055Order.payment,
        discount: commerce055Order.discount,
      },
      commercialSnapshot: { lines: [], gross: 200, subtotal: 200, discount: 20, net: 180, vat: 27, total: 207, rate: 15 },
      tenderedAmount: 250,
    });

    expect(calls).toEqual(["order", "order.publish", "invoice", "invoice.publish", "last-order"]);
    expect(orders.create).toHaveBeenCalledTimes(1);
    expect(invoices.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ order: commerce055Order, invoice: commerce055Invoice, successRoute: "/pos/success" });
  });

  it("does not retry, roll back, or continue after a stage failure", () => {
    const orders: LegacyOrderCreationPort = { create: vi.fn(() => { throw new Error("order_failed"); }) };
    const invoices: LegacyInvoiceCreationPort = { create: vi.fn() };
    const publication: LegacyCommerceCommandPublicationPort = {
      publishOrderResult: vi.fn(), publishInvoiceResult: vi.fn(), subscribe: vi.fn(() => () => undefined),
    };
    const lastOrder: LegacyPosLastOrderPort = { read: vi.fn(), write: vi.fn(), clear: vi.fn() };
    const service = new LegacyPosCheckoutService(orders, invoices, publication, lastOrder);
    expect(() => service.checkout({
      context: commerce055Context,
      draft: { items: [], customerId: null, payment: "cash", discount: 0 },
      commercialSnapshot: { lines: [], gross: 0, subtotal: 0, discount: 0, net: 0, vat: 0, total: 0, rate: 0 },
      tenderedAmount: 0,
    })).toThrow("order_failed");
    expect(orders.create).toHaveBeenCalledTimes(1);
    expect(invoices.create).not.toHaveBeenCalled();
  });
});
