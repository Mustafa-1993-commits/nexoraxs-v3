import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import type { LegacyProductListResult, LegacyProductRecord } from "@nexoraxs/contracts";
import {
  invalidateLegacyProductScope,
  replaceLegacyProductInScopeCache,
} from "../hooks/legacy-product-cache";
import { legacyProductKeys } from "../hooks/legacy-product-query-keys";

const scopeA = { workspaceId: "ws-a", legacyBusinessUnitId: "bu-shared", branchId: "branch-a" };
const scopeB = { workspaceId: "ws-b", legacyBusinessUnitId: "bu-shared", branchId: "branch-a" };

function product(workspaceId: string, name: string): LegacyProductRecord {
  return {
    id: "shared-id",
    workspaceId,
    businessUnitId: "bu-shared",
    branchId: "branch-a",
    osSubscriptionId: "sub",
    name,
    category: "General",
    sku: "SHARED",
    barcode: "",
    price: 10,
    cost: 5,
    taxable: true,
    stock: 1,
    lowStockThreshold: 0,
    notes: "",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };
}

function list(item: LegacyProductRecord): LegacyProductListResult {
  return { items: [item], total: 1, page: null, pageSize: null, hasNextPage: false };
}

describe("legacy Product cache isolation", () => {
  it("updates item and list data for only the exact applicable scope", () => {
    const client = new QueryClient();
    const itemA = product("ws-a", "A before");
    const itemB = product("ws-b", "B before");
    client.setQueryData(legacyProductKeys.item(scopeA, itemA.id), itemA);
    client.setQueryData(legacyProductKeys.item(scopeB, itemB.id), itemB);
    client.setQueryData(legacyProductKeys.list(scopeA), list(itemA));
    client.setQueryData(legacyProductKeys.list(scopeB), list(itemB));

    replaceLegacyProductInScopeCache(client, scopeA, { ...itemA, name: "A after" });

    expect(client.getQueryData<LegacyProductRecord>(legacyProductKeys.item(scopeA, itemA.id))?.name).toBe("A after");
    expect(client.getQueryData<LegacyProductRecord>(legacyProductKeys.item(scopeB, itemB.id))?.name).toBe("B before");
    expect(client.getQueryData<LegacyProductListResult>(legacyProductKeys.list(scopeA))?.items[0].name).toBe("A after");
    expect(client.getQueryData<LegacyProductListResult>(legacyProductKeys.list(scopeB))?.items[0].name).toBe("B before");
  });

  it("invalidates only the complete scope prefix", async () => {
    const client = new QueryClient();
    const invalidate = vi.spyOn(client, "invalidateQueries");

    await invalidateLegacyProductScope(client, scopeA);

    expect(invalidate).toHaveBeenCalledWith({ queryKey: legacyProductKeys.scope(scopeA) });
  });
});
