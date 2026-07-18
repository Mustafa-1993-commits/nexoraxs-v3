// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { createCommerceServices } from "@nexoraxs/sdk/testing";
import { CommerceServicesProvider } from "@/lib/commerce/CommerceServicesProvider";
import { BrowserLegacyPosLastOrderAdapter } from "@/lib/commerce/pos/BrowserLegacyPosLastOrderAdapter";
import { useLegacyPosLastOrder } from "../hooks/useLegacyPosLastOrder";

describe("POS last-Order boundary", () => {
  it("preserves the exact raw session value across adapter instances and clear", () => {
    sessionStorage.clear();
    const adapter = new BrowserLegacyPosLastOrderAdapter();
    adapter.write("ord-raw");
    expect(sessionStorage.getItem("nx_last_order_id")).toBe("ord-raw");
    expect(new BrowserLegacyPosLastOrderAdapter().read()).toBe("ord-raw");
    adapter.clear();
    expect(sessionStorage.getItem("nx_last_order_id")).toBeNull();
  });

  it("exposes read and clear through a browser-neutral hook", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <CommerceServicesProvider config={{ dataSource: "mock" }} runtimeServices={createCommerceServices({ dataSource: "mock" })}>
        {children}
      </CommerceServicesProvider>
    );
    const hook = renderHook(() => useLegacyPosLastOrder(), { wrapper });
    act(() => hook.result.current.clear());
    expect(hook.result.current.read()).toBeNull();
  });
});
