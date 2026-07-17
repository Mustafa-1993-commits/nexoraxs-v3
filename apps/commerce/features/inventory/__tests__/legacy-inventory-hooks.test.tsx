// @vitest-environment jsdom
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { MemoryCommerceStore, createCommerceServices } from "@nexoraxs/sdk/testing";
import { CommerceServicesProvider } from "@/lib/commerce/CommerceServicesProvider";
import { useLegacyInventory } from "../hooks/useLegacyInventory";
describe("legacy Inventory hook", () => { it("returns the Branch projection", async () => {
  const product = { id: "p", workspaceId: "ws", businessUnitId: "bu", branchId: "br", osSubscriptionId: "sub", name: "P", category: "General", sku: "P", barcode: "", price: 1, cost: 0, taxable: true, stock: 5, lowStockThreshold: 2, notes: "", createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z" };
  const store = new MemoryCommerceStore([product]); const runtime = createCommerceServices({ dataSource: "mock" }, { store });
  const wrapper = ({ children }: { children: ReactNode }) => <CommerceServicesProvider config={{ dataSource: "mock" }} runtimeServices={runtime}>{children}</CommerceServicesProvider>;
  const hook = renderHook(() => useLegacyInventory({ workspaceId: "ws", legacyBusinessUnitId: "bu", branchId: "br" }), { wrapper });
  await waitFor(() => expect(hook.result.current.isSuccess).toBe(true)); expect(hook.result.current.data?.[0].stock).toBe(5);
}); });
