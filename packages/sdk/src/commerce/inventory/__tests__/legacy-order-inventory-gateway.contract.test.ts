import { describe, expect, it } from "vitest";
import type { LegacyCommerceOperationsStore } from "@nexoraxs/contracts";
import {
  commerce055ForeignScope,
  commerce055Movement,
  commerce055Position,
  commerce055Product,
  commerce055Scope,
} from "../../../../../../apps/commerce/features/repository-expansion/__tests__/legacy-commerce-055-fixtures";
import { MemoryLegacyCommerceOperationsStore } from "../../operations/MemoryLegacyCommerceOperationsStore";
import { BrowserLegacyCommerceOperationsStore } from "../../operations/BrowserLegacyCommerceOperationsStore";
import { LocalOrderInventoryGateway } from "../LocalOrderInventoryGateway";

function foreign<T extends { workspaceId: string; branchId: string }>(record: T): T {
  return { ...record, workspaceId: commerce055ForeignScope.workspaceId, branchId: commerce055ForeignScope.branchId };
}

function stores(): readonly [string, () => LegacyCommerceOperationsStore][] {
  const seed = {
    products: [foreign(commerce055Product), commerce055Product],
    positions: [foreign(commerce055Position), commerce055Position],
    movements: [foreign(commerce055Movement), commerce055Movement],
  };
  return [
    ["memory", () => new MemoryLegacyCommerceOperationsStore(seed)],
    ["browser", () => {
      const values = new Map<string, string>();
      const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); } };
      const store = new BrowserLegacyCommerceOperationsStore(storage);
      store.replacePositions(seed.positions);
      store.replaceMovements(seed.movements);
      values.set("nexoraxs.db.commerceProducts", JSON.stringify(seed.products));
      return store;
    }],
  ];
}

describe.each(stores())("LocalOrderInventoryGateway (%s)", (_name, createStore) => {
  it("clones scoped reads and preserves foreign rows while writing positions before Movements", () => {
    const store = createStore();
    const gateway = new LocalOrderInventoryGateway(store);
    const products = gateway.listProducts(commerce055Scope);
    const positions = gateway.listPositions(commerce055Scope);
    expect(products).toEqual([commerce055Product]);
    expect(positions).toEqual([commerce055Position]);
    expect(products[0]).not.toBe(commerce055Product);

    const nextPositions = gateway.replacePositions(commerce055Scope, [{ ...commerce055Position, qty: 5 }]);
    const nextMovements = gateway.replaceMovements(commerce055Scope, [{ ...commerce055Movement, qtyChange: -5 }]);
    expect(nextPositions).toHaveLength(1);
    expect(nextMovements).toHaveLength(1);
    expect(store.readPositions()).toEqual([foreign(commerce055Position), { ...commerce055Position, qty: 5 }]);
    expect(store.readMovements()).toEqual([foreign(commerce055Movement), { ...commerce055Movement, qtyChange: -5 }]);
  });
});
