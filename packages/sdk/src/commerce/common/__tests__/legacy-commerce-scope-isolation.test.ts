import { describe, expect, it } from "vitest";
import { MemoryCommerceStore } from "../../products/MemoryCommerceStore";
import { MockCustomersRepository } from "../../customers/MockCustomersRepository";
import { MockInventoryRepository } from "../../inventory/MockInventoryRepository";
import { MockInvoicesRepository } from "../../invoices/MockInvoicesRepository";
import { MockOrdersRepository } from "../../orders/MockOrdersRepository";
import { CUSTOMER_A, CUSTOMER_B } from "../../customers/__tests__/legacy-customers-repository.contract";
import { INVENTORY_A, INVENTORY_B } from "../../inventory/__tests__/legacy-inventory-repository.contract";
import { INVOICE_A, INVOICE_B } from "../../invoices/__tests__/legacy-invoices-repository.contract";
import { ORDER_A, ORDER_B } from "../../orders/__tests__/legacy-orders-repository.contract";
describe("overlapping identifier scope isolation", () => {
  it("never returns or mutates the same ID from another legacy scope", async () => {
    const store = new MemoryCommerceStore([], { customers: [CUSTOMER_A, CUSTOMER_B], inventory: [INVENTORY_A, INVENTORY_B], orders: [ORDER_A, ORDER_B], invoices: [INVOICE_A, INVOICE_B] });
    const scope = { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" };
    const customers = new MockCustomersRepository(store, { now: () => new Date("2026-03-01T00:00:00Z") });
    expect((await customers.list(scope)).items.map((record) => record.name)).toEqual(["Alpha Customer"]);
    await customers.update(scope, { id: "shared-id", name: "Only A" });
    expect((await customers.list({ workspaceId: "ws-b", legacyBusinessUnitId: "bu-b" })).items[0].name).toBe("Foreign Customer");
    expect((await new MockInventoryRepository(store).list({ ...scope, branchId: "br-a" })).items[0].qty).toBe(2);
    expect((await new MockOrdersRepository(store).list(scope)).items[0].orderNumber).toBe("ORD-A");
    expect((await new MockInvoicesRepository(store).list(scope)).items[0].invoiceNumber).toBe("INV-A");
  });
});
