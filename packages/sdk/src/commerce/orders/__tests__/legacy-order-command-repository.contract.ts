import type {
  LegacyOrderCommandRepository,
} from "@nexoraxs/contracts";
import type { CommerceOrder } from "@nexoraxs/types";
import { expect } from "vitest";
import {
  commerce055ForeignScope,
  commerce055Order,
  commerce055Scope,
} from "../../../../../../apps/commerce/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";

export interface LegacyOrderCommandRepositoryHarness {
  readonly repository: LegacyOrderCommandRepository;
  readonly readRaw: () => readonly unknown[];
}

const foreignOrder: CommerceOrder = {
  ...commerce055Order,
  workspaceId: commerce055ForeignScope.workspaceId,
  branchId: commerce055ForeignScope.branchId,
};

export function verifyLegacyOrderCommandRepository(harness: LegacyOrderCommandRepositoryHarness) {
  const { repository } = harness;
  expect(repository.listForNumbering(commerce055Scope)).toMatchObject([commerce055Order]);
  expect(repository.getById(commerce055Scope, commerce055Order.id)).toMatchObject(commerce055Order);
  expect(repository.getById({ ...commerce055Scope, branchId: "other-branch" }, commerce055Order.id)).toEqual(null);

  const created = { ...commerce055Order, id: "ord-created", orderNumber: "ORD-0002" };
  const afterCreate = repository.create(commerce055Scope, created);
  expect(afterCreate.map((order) => order.id)).toEqual([commerce055Order.id, created.id]);
  expect((harness.readRaw() as CommerceOrder[]).map((order) => order.id)).toEqual([foreignOrder.id, commerce055Order.id, created.id]);

  const afterPatch = repository.applyReturnCompatibilityPatch(commerce055Scope, created.id, {
    returnStatus: "partial",
    returnedTotalIncrement: 25,
    returnId: "ret-created",
  });
  expect(afterPatch.find((order) => order.id === created.id)).toMatchObject({
    returnStatus: "partial",
    returnedTotal: 25,
    returnIds: ["ret-created"],
  });

  const seeded = repository.replaceDemoSeed(commerce055Scope, []);
  expect(seeded).toEqual([]);
  expect(harness.readRaw()).toEqual([foreignOrder]);
}

export { foreignOrder };
