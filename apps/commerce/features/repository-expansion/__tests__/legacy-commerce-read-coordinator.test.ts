import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { ReactQueryCommerceChangeAdapter } from "../../../lib/commerce/cache/ReactQueryCommerceChangeAdapter";
describe("ReactQueryCommerceChangeAdapter", () => {
  it("invalidates exact scope-owned keys without persistence", async () => {
    const client = new QueryClient(); const invalidate = vi.spyOn(client, "invalidateQueries");
    const coordinator = new ReactQueryCommerceChangeAdapter(client);
    await coordinator.ordersChanged({ scope: { workspaceId: "ws", legacyBusinessUnitId: "bu", branchId: "br" }, orderId: "order", customerId: "customer" });
    expect(invalidate).toHaveBeenCalledTimes(3);
    expect(invalidate.mock.calls.every(([input]) => JSON.stringify(input?.queryKey).includes("ws"))).toBe(true);
  });
});
