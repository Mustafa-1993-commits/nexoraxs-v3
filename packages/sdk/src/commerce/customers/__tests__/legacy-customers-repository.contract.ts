import { expect } from "vitest";
import type { LegacyCustomersRepository } from "@nexoraxs/contracts";

export const CUSTOMER_SCOPE = { workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" } as const;
export const CUSTOMER_OTHER_SCOPE = { workspaceId: "ws-b", legacyBusinessUnitId: "bu-b" } as const;
export const CUSTOMER_A = {
  id: "shared-id", workspaceId: "ws-a", businessUnitId: "bu-a", branchId: "br-a",
  name: "Alpha Customer", phone: "100", email: "alpha@example.test", notes: "",
  createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z", legacyFlag: "keep",
} as const;
export const CUSTOMER_B = { ...CUSTOMER_A, workspaceId: "ws-b", businessUnitId: "bu-b", name: "Foreign Customer" } as const;

export async function assertLegacyCustomersRepositoryContract(repository: LegacyCustomersRepository) {
  const listed = await repository.list(CUSTOMER_SCOPE);
  expect(listed.items.map((item) => item.name)).toEqual(["Alpha Customer"]);
  expect((await repository.list(CUSTOMER_SCOPE, { search: "ALPHA" })).items).toHaveLength(1);
  expect(await repository.getById(CUSTOMER_SCOPE, "shared-id")).toMatchObject({ workspaceId: "ws-a" });
  await expect(repository.getById(CUSTOMER_OTHER_SCOPE, "missing")).rejects.toMatchObject({ code: "not_found" });

  const created = await repository.create(CUSTOMER_SCOPE, {
    branchId: "br-a", name: " Created ", phone: " 200 ", email: " created@example.test ", notes: " note ",
  });
  expect(created).toMatchObject({ id: "cust-fixed", name: "Created", workspaceId: "ws-a", businessUnitId: "bu-a" });
  const updated = await repository.update(CUSTOMER_SCOPE, { id: created.id, name: "Updated" });
  expect(updated).toMatchObject({ id: created.id, name: "Updated" });
  expect(updated.createdAt).toBe(created.createdAt);
}
