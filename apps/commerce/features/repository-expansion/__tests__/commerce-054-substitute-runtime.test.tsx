// @vitest-environment jsdom
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { MemoryCommerceStore, MemoryLegacyCommerceOperationsStore, createCommerceServices } from "@nexoraxs/sdk/testing";
import { CommerceServicesProvider } from "../../../lib/commerce/CommerceServicesProvider";
import { useLegacyProducts } from "../../products/hooks/useLegacyProducts";

describe("substitute Commerce runtime", () => {
  it("runs unchanged hooks/provider consumers through injected memory ports", async () => {
    const runtime = createCommerceServices({ dataSource: "mock" }, {
      store: new MemoryCommerceStore([{
        id: "p", workspaceId: "ws", businessUnitId: "bu", branchId: "br", osSubscriptionId: "sub",
        name: "Memory", category: "General", sku: "MEM", barcode: "", price: 1, cost: 0,
        taxable: true, stock: 1, lowStockThreshold: 0, notes: "", createdAt: "created", updatedAt: "updated",
      }]),
      operationsStore: new MemoryLegacyCommerceOperationsStore(),
    });
    const wrapper = ({ children }: { children: ReactNode }) => <CommerceServicesProvider config={{ dataSource: "mock" }} runtimeServices={runtime}>{children}</CommerceServicesProvider>;
    const hook = renderHook(() => useLegacyProducts({ workspaceId: "ws", legacyBusinessUnitId: "bu", branchId: "br" }), { wrapper });
    await waitFor(() => expect(hook.result.current.isSuccess).toBe(true));
    expect(hook.result.current.data?.items[0]).toMatchObject({ id: "p", name: "Memory" });
  });
});
