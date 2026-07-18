import { describe, expect, it } from "vitest";
import { MemoryLegacyCommerceOperationsStore } from "@nexoraxs/sdk/testing";
import { LocalOrderInventoryGateway } from "../../../../../packages/sdk/src/commerce/inventory/LocalOrderInventoryGateway";
import {
  commerce055ForeignScope,
  commerce055Position,
  commerce055Product,
  commerce055Scope,
} from "@/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";

describe("local sale Inventory scope", () => {
  it("isolates overlapping Product and position IDs by complete legacy Branch scope", () => {
    const foreignProduct = {
      ...commerce055Product,
      workspaceId: commerce055ForeignScope.workspaceId,
      branchId: commerce055ForeignScope.branchId,
      stock: 999,
    };
    const foreignPosition = {
      ...commerce055Position,
      workspaceId: commerce055ForeignScope.workspaceId,
      branchId: commerce055ForeignScope.branchId,
      qty: 777,
    };
    const store = new MemoryLegacyCommerceOperationsStore({
      products: [foreignProduct, commerce055Product],
      positions: [foreignPosition, commerce055Position],
    });
    const gateway = new LocalOrderInventoryGateway(store);

    expect(gateway.listProducts(commerce055Scope)).toEqual([commerce055Product]);
    expect(gateway.listPositions(commerce055Scope)).toEqual([commerce055Position]);
    gateway.replacePositions(commerce055Scope, [{ ...commerce055Position, qty: 6 }]);
    expect(store.readPositions()).toEqual([foreignPosition, { ...commerce055Position, qty: 6 }]);
  });
});
