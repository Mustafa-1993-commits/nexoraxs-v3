// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { createCommerceServices } from "@nexoraxs/sdk/testing";
import { CommerceServicesProvider } from "@/lib/commerce/CommerceServicesProvider";
import { useLegacyPosDraftCommands } from "../hooks/useLegacyPosDraftCommands";

describe("useLegacyPosDraftCommands", () => {
  it("adapts synchronous draft commands without persistence or automatic retry", () => {
    const runtime = createCommerceServices({ dataSource: "mock" });
    const wrapper = ({ children }: { children: ReactNode }) => (
      <CommerceServicesProvider config={{ dataSource: "mock" }} runtimeServices={runtime}>
        {children}
      </CommerceServicesProvider>
    );
    const hook = renderHook(
      () => useLegacyPosDraftCommands({ vatRegistered: true, vatRate: 15, pricesIncludeTax: true }),
      { wrapper },
    );

    act(() => hook.result.current.execute({
      type: "add-product",
      product: { id: "p1", name: "Product", price: 100, sku: "SKU", taxable: true, stock: 5, category: "General" },
    }));
    act(() => hook.result.current.execute({ type: "set-discount-input", value: "10" }));

    expect(hook.result.current.draft.items[0].qty).toBe(1);
    expect(hook.result.current.draft.discount).toBe(10);
    expect(hook.result.current.commercialSnapshot.total).toBe(90);
    expect(hook.result.current.isPending).toBe(false);
    expect(hook.result.current.error).toBeNull();
  });
});

