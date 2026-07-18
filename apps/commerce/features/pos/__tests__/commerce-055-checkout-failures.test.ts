import { describe, expect, it, vi } from "vitest";
import type {
  LegacyCommerceCommandPublication,
  LegacyCommerceCommandPublicationPort,
  LegacyInvoiceCreationPort,
  LegacyOrderCreationPort,
  LegacyPosLastOrderPort,
} from "@nexoraxs/contracts";
import { LegacyPosCheckoutService } from "../application/LegacyPosCheckoutService";
import {
  commerce055Context,
  commerce055Invoice,
  commerce055Order,
} from "@/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";

const input = {
  context: commerce055Context,
  draft: { items: [], customerId: null, payment: "cash" as const, discount: 0 },
  commercialSnapshot: { lines: [], gross: 0, subtotal: 0, discount: 0, net: 0, vat: 0, total: 0, rate: 0 },
  tenderedAmount: 0,
};

function orderPort(): LegacyOrderCreationPort {
  return { create: vi.fn(() => ({ order: commerce055Order, orders: [commerce055Order], branchInventory: [], stockMovements: [] })) };
}

describe("Feature 055 checkout partial failures", () => {
  it("leaves the committed Order published when Invoice creation fails", () => {
    const publications: LegacyCommerceCommandPublication[] = [];
    const publication: LegacyCommerceCommandPublicationPort = {
      publishOrderResult: (result) => publications.push({ type: "order", result }),
      publishInvoiceResult: (result) => publications.push({ type: "invoice", result }),
      subscribe: () => () => undefined,
    };
    const invoices: LegacyInvoiceCreationPort = { create: vi.fn(() => { throw new Error("invoice_failed"); }) };
    const lastOrder: LegacyPosLastOrderPort = { read: vi.fn(), write: vi.fn(), clear: vi.fn() };
    expect(() => new LegacyPosCheckoutService(orderPort(), invoices, publication, lastOrder).checkout(input)).toThrow("invoice_failed");
    expect(publications.map((entry) => entry.type)).toEqual(["order"]);
    expect(lastOrder.write).not.toHaveBeenCalled();
  });

  it("leaves both owner publications visible when the final session write fails", () => {
    const publications: string[] = [];
    const publication: LegacyCommerceCommandPublicationPort = {
      publishOrderResult: () => publications.push("order"),
      publishInvoiceResult: () => publications.push("invoice"),
      subscribe: () => () => undefined,
    };
    const invoices: LegacyInvoiceCreationPort = { create: vi.fn(() => ({ invoice: commerce055Invoice, invoices: [commerce055Invoice] })) };
    const lastOrder: LegacyPosLastOrderPort = { read: vi.fn(), write: vi.fn(() => { throw new Error("session_failed"); }), clear: vi.fn() };
    expect(() => new LegacyPosCheckoutService(orderPort(), invoices, publication, lastOrder).checkout(input)).toThrow("session_failed");
    expect(publications).toEqual(["order", "invoice"]);
    expect(lastOrder.write).toHaveBeenCalledTimes(1);
  });
});
