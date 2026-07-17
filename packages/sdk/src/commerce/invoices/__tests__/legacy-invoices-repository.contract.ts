import { expect } from "vitest";
import type { LegacyInvoicesRepository } from "@nexoraxs/contracts";
export const INVOICE_A = { id: "invoice-shared", invoiceNumber: "INV-A", orderId: "order-a", workspaceId: "ws-a", businessUnitId: "bu-a", branchId: "br-a", customerId: "customer-a", items: [{ productId: "product-a", name: "Snapshot", qty: 1, price: 10, taxable: true }], subtotal: 10, discount: 1, vat: 2, total: 11, net: 9, cashierId: "user-a", cashierName: "Cashier A", createdAt: "2026-01-01T00:00:00Z" };
export const INVOICE_B = { ...INVOICE_A, workspaceId: "ws-b", businessUnitId: "bu-b", branchId: "br-b", invoiceNumber: "INV-B" };
export async function assertLegacyInvoicesRepositoryContract(repository: LegacyInvoicesRepository) {
  const scope = { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" };
  expect((await repository.list(scope, { branchId: "br-a", search: "inv-a" })).items).toHaveLength(1);
  expect(await repository.getById(scope, "invoice-shared")).toMatchObject({ total: 11, net: 9 });
  expect("create" in repository || "update" in repository).toBe(false);
}
