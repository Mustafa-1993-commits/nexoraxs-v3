// @vitest-environment jsdom
import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { createCommerceServices } from "@nexoraxs/sdk/testing";
import { CommerceServicesProvider, useCommerceServices } from "@/lib/commerce/CommerceServicesProvider";

describe("Feature 055 runtime identity", () => {
  it("retains one service graph across one hundred provider consumer rerenders", () => {
    const runtime = createCommerceServices({ dataSource: "mock" });
    const wrapper = ({ children }: { children: ReactNode }) => (
      <CommerceServicesProvider config={{ dataSource: "mock" }} runtimeServices={runtime}>{children}</CommerceServicesProvider>
    );
    const hook = renderHook(() => useCommerceServices(), { wrapper });
    const initial = hook.result.current;
    for (let index = 0; index < 100; index += 1) hook.rerender();
    expect(hook.result.current).toBe(initial);
    expect(hook.result.current.services.orderCommandRepository).toBe(initial.services.orderCommandRepository);
    expect(hook.result.current.services.commandPublication).toBe(initial.services.commandPublication);
    expect(hook.result.current.services.posCheckout).toBe(initial.services.posCheckout);
  });
});
