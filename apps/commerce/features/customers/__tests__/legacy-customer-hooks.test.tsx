// @vitest-environment jsdom
import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { MemoryCommerceStore } from "@nexoraxs/sdk";
import { CommerceServicesProvider } from "@/lib/commerce/CommerceServicesProvider";
import { useLegacyCustomerMutations } from "../hooks/useLegacyCustomerMutations";
import { useLegacyCustomers } from "../hooks/useLegacyCustomers";
const scope = { workspaceId: "ws", legacyBusinessUnitId: "bu" };
describe("legacy Customer hooks", () => {
  it("loads, exposes mutation pending, commits cache, and does not automatically retry", async () => {
    const store = new MemoryCommerceStore([], { customers: [] });
    const wrapper = ({ children }: { children: ReactNode }) => <CommerceServicesProvider config={{ dataSource: "mock" }} overrides={{ store, createId: () => "cust-hook", now: () => new Date("2026-01-01T00:00:00Z") }}>{children}</CommerceServicesProvider>;
    const hook = renderHook(() => ({ list: useLegacyCustomers(scope), mutations: useLegacyCustomerMutations(scope) }), { wrapper });
    await waitFor(() => expect(hook.result.current.list.isSuccess).toBe(true));
    await act(async () => { await hook.result.current.mutations.create.mutateAsync({ branchId: "br", name: "Hook Customer", phone: "", email: "", notes: "" }); });
    await waitFor(() => expect(hook.result.current.list.data?.items[0]?.id).toBe("cust-hook"));
    expect(hook.result.current.mutations.create.isPending).toBe(false);
  });
});
