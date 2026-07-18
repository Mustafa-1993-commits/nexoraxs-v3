import { describe, expect, it } from "vitest";
import { MemoryCommerceStore } from "@nexoraxs/sdk/testing";
import { LocalOrderCommandRepository } from "../../../../../packages/sdk/src/commerce/orders/LocalOrderCommandRepository";
import { LegacyOrderReturnHandoffService } from "@/features/orders/application/LegacyOrderReturnHandoffService";
import {
  commerce055Order,
  commerce055Scope,
} from "@/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";

describe("LegacyOrderReturnHandoffService", () => {
  it("looks up and applies only the exact compatibility patch without notification", () => {
    const service = new LegacyOrderReturnHandoffService(
      new LocalOrderCommandRepository(new MemoryCommerceStore([], { orders: [commerce055Order] })),
    );
    expect(service.getOrder(commerce055Scope, commerce055Order.id)).toEqual(commerce055Order);
    const orders = service.applyPatch(commerce055Scope, commerce055Order.id, {
      returnStatus: "partial", returnedTotalIncrement: 30, returnId: "ret-2",
    });
    expect(orders[0]).toMatchObject({ returnStatus: "partial", returnedTotal: 30, returnIds: ["ret-2"] });
  });
});
