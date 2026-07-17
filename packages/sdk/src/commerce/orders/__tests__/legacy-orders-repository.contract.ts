import { expect } from "vitest";
import type { LegacyOrdersRepository } from "@nexoraxs/contracts";

export const ORDER_A = {
  id: "order-shared", orderNumber: "ORD-A", workspaceId: "ws-a", businessUnitId: "bu-a", branchId: "br-a",
  customerId: "customer-a", items: [{ productId: "product-a", name: "Snapshot", qty: 1, price: 10, taxable: true }],
  payment: "cash" as const, discount: 1, vat: 2, subtotal: 10, total: 11, net: 9,
  cashierId: "user-a", cashierName: "Cashier A", createdAt: "2026-01-01T00:00:00.000Z",
};
export const ORDER_B = { ...ORDER_A, workspaceId: "ws-b", businessUnitId: "bu-b", branchId: "br-b", orderNumber: "ORD-B" };

export async function assertLegacyOrdersRepositoryContract(repository: LegacyOrdersRepository) {
  const scope = { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" };
  expect((await repository.list(scope)).items).toHaveLength(1);
  expect((await repository.list(scope, { branchId: "br-a", search: "ord-a" })).items).toHaveLength(1);
  expect(await repository.getById(scope, "order-shared")).toMatchObject({ total: 11, discount: 1 });
  await expect(repository.getById({ workspaceId: "ws-b", legacyBusinessUnitId: "bu-b" }, "missing"))
    .rejects.toMatchObject({ code: "not_found" });
  expect("create" in repository || "update" in repository).toBe(false);
}
