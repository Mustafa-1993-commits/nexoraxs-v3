import { describe, expect, it } from "vitest";
import { MemoryCommerceStore } from "@nexoraxs/sdk/testing";
import { LocalOrderCommandRepository } from "../../../../../packages/sdk/src/commerce/orders/LocalOrderCommandRepository";
import { LegacyOrderNumberService } from "../application/LegacyOrderNumberService";
import {
  commerce055ForeignScope,
  commerce055Order,
  commerce055Scope,
} from "@/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";

describe("Feature 055 Order command scope isolation", () => {
  it("prevents overlapping foreign records from numbering, reads, results, or mutation", () => {
    const foreign = {
      ...commerce055Order,
      workspaceId: commerce055ForeignScope.workspaceId,
      branchId: commerce055ForeignScope.branchId,
    };
    const store = new MemoryCommerceStore([], { orders: [foreign, commerce055Order] });
    const repository = new LocalOrderCommandRepository(store);
    expect(new LegacyOrderNumberService(repository).next(commerce055Scope)).toBe("ORD-0002");
    expect(repository.getById({ ...commerce055Scope, branchId: "wrong" }, commerce055Order.id)).toBeNull();

    const created = { ...commerce055Order, id: "scope-created", orderNumber: "ORD-0002" };
    expect(repository.create(commerce055Scope, created).map((order) => order.id)).toEqual([commerce055Order.id, created.id]);
    expect((store.readOrderCommandRecords() as typeof commerce055Order[])[0]).toEqual(foreign);
  });

  it("fails closed before reading storage when scope is incomplete", () => {
    const repository = new LocalOrderCommandRepository(new MemoryCommerceStore());
    expect(() => repository.listForNumbering({ workspaceId: "", legacyBusinessUnitId: "bu" })).toThrow("invalid_scope");
    expect(() => repository.getById({ workspaceId: "ws", legacyBusinessUnitId: "bu", branchId: "" }, "id")).toThrow("invalid_scope");
  });
});
