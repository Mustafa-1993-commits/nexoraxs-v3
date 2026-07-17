import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { LegacyCommerceReadCoordinator } from "../application/LegacyCommerceReadCoordinator";
describe("LegacyCommerceReadCoordinator", () => {
  it("invalidates exact scope-owned keys without persistence", async () => {
    const client = new QueryClient(); const invalidate = vi.spyOn(client, "invalidateQueries");
    const coordinator = new LegacyCommerceReadCoordinator(client);
    await coordinator.orderCommitted({ workspaceId: "ws", legacyBusinessUnitId: "bu", branchId: "br" }, "order", "customer");
    expect(invalidate).toHaveBeenCalledTimes(3);
    expect(invalidate.mock.calls.every(([input]) => JSON.stringify(input?.queryKey).includes("ws"))).toBe(true);
  });
});
