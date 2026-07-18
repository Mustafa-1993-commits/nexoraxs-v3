import { describe, expect, it, vi } from "vitest";
import { ReactQueryCommerceChangeAdapter } from "@/lib/commerce/cache/ReactQueryCommerceChangeAdapter";
import { legacyInventoryKeys } from "@/features/inventory/hooks/legacy-inventory-query-keys";
import { legacyOrderKeys } from "@/features/orders/hooks/legacy-order-query-keys";
import { commerce055ForeignScope, commerce055Scope } from "./legacy-commerce-055-fixtures";

describe("Feature 055 Order cache isolation", () => {
  it("includes complete scope and invalidates only exact command scope", async () => {
    const invalidateQueries = vi.fn(async (input: { readonly queryKey: readonly unknown[] }) => {
      void input;
    });
    const adapter = new ReactQueryCommerceChangeAdapter({ invalidateQueries } as never);
    await adapter.ordersChanged({ scope: commerce055Scope, orderId: "order", customerId: null });
    await adapter.inventoryChanged({ scope: commerce055Scope });
    const keys = invalidateQueries.mock.calls.map(([input]) => input.queryKey);
    expect(keys).toContainEqual(legacyOrderKeys.listScope(commerce055Scope, commerce055Scope.branchId));
    expect(keys).toContainEqual(legacyOrderKeys.item(commerce055Scope, "order", commerce055Scope.branchId));
    expect(keys).toContainEqual(legacyInventoryKeys.scope(commerce055Scope));
    expect(keys).not.toContainEqual(legacyOrderKeys.item(commerce055ForeignScope, "order", commerce055ForeignScope.branchId));
  });

  it("does not turn notification rejection into an automatic retry", async () => {
    const invalidateQueries = vi.fn(async () => { throw new Error("cache_failed"); });
    const adapter = new ReactQueryCommerceChangeAdapter({ invalidateQueries } as never);
    await expect(adapter.inventoryChanged({ scope: commerce055Scope })).rejects.toThrow("cache_failed");
    expect(invalidateQueries).toHaveBeenCalledTimes(1);
  });
});
