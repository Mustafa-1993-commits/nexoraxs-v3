import { describe, expect, it } from "vitest";
import { MemoryLegacyCommerceOperationsStore } from "@nexoraxs/sdk/testing";
import { LegacyInvoiceCreationService } from "../application/LegacyInvoiceCreationService";
import { deterministic, notificationSpies, operationContext, operationOrder } from "../../repository-expansion/__tests__/legacy-commerce-054-operation-samples";

describe("LegacyInvoiceCreationService", () => {
  it("reads the committed Order, applies setup numbering, copies snapshots, and writes once", () => {
    const store = new MemoryLegacyCommerceOperationsStore({ orders: [operationOrder], setups: [{
      id: "setup", workspaceId: "ws", businessUnitId: "bu", osSubscriptionId: "sub", displayName: "", legalName: "", phone: "", email: "", address: "", city: "", country: "Egypt", crn: "", trn: "", logo: null, presetId: "retail", businessType: "retail", preset: "retail", mode: "physical", vatRegistered: true, vatRate: 14, pricesIncludeTax: true, taxLabel: "VAT", taxNumber: "", invoicePrefix: "BILL", receiptPrefix: "RCPT", invoiceStart: 700, receiptStart: 1001, footer: "", returnPolicy: "", receiptSize: "80mm", receiptStyle: "classic", invoiceTemplate: "a4-simple", categories: [], createdAt: "created", updatedAt: "updated",
    }] });
    const changes = notificationSpies();
    const result = new LegacyInvoiceCreationService(store, deterministic(), changes).create(operationContext, { orderId: "ord" });
    expect(result.invoice).toMatchObject({ invoiceNumber: "BILL-700", orderId: "ord", total: 180, customerId: "customer" });
    expect(store.writes).toEqual(["invoices"]);
    expect(changes.invoicesChanged).toHaveBeenCalledWith(expect.objectContaining({ invoiceId: result.invoice.id, orderId: "ord" }));
  });

  it("preserves the existing not-found error", () => {
    const service = new LegacyInvoiceCreationService(new MemoryLegacyCommerceOperationsStore(), deterministic(), notificationSpies());
    expect(() => service.create(operationContext, { orderId: "missing" })).toThrow("Order not found: missing");
  });
});
