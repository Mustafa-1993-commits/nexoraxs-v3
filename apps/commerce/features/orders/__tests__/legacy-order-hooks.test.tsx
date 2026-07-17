// @vitest-environment jsdom
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { MemoryCommerceStore } from "@nexoraxs/sdk";
import { CommerceServicesProvider } from "@/lib/commerce/CommerceServicesProvider";
import { useLegacyOrder, useLegacyOrders } from "../hooks/useLegacyOrders";
import { ORDER_A } from "../../../../../packages/sdk/src/commerce/orders/__tests__/legacy-orders-repository.contract";
describe("legacy Order hooks", () => { it("loads list and detail snapshots", async () => {
  const store = new MemoryCommerceStore([], { orders: [ORDER_A] }); const wrapper = ({ children }: { children: ReactNode }) => <CommerceServicesProvider config={{ dataSource: "mock" }} overrides={{ store }}>{children}</CommerceServicesProvider>;
  const hook = renderHook(() => ({ list: useLegacyOrders({ workspaceId: "ws-a", legacyBusinessUnitId: "bu-a", branchId: "br-a" }), item: useLegacyOrder({ workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" }, ORDER_A.id) }), { wrapper });
  await waitFor(() => expect(hook.result.current.list.isSuccess && hook.result.current.item.isSuccess).toBe(true));
  expect(hook.result.current.item.data?.order.total).toBe(11);
}); });
