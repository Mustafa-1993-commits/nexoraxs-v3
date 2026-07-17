// @vitest-environment jsdom
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { MemoryCommerceStore, createCommerceServices } from "@nexoraxs/sdk/testing";
import { CommerceServicesProvider } from "@/lib/commerce/CommerceServicesProvider";
import { useLegacyInvoice, useLegacyInvoices } from "../hooks/useLegacyInvoices";
import { INVOICE_A } from "../../../../../packages/sdk/src/commerce/invoices/__tests__/legacy-invoices-repository.contract";
describe("legacy Invoice hooks", () => { it("loads list and document-keyed detail snapshots", async () => {
  const store = new MemoryCommerceStore([], { invoices: [INVOICE_A] }); const runtime = createCommerceServices({ dataSource: "mock" }, { store });
  const wrapper = ({ children }: { children: ReactNode }) => <CommerceServicesProvider config={{ dataSource: "mock" }} runtimeServices={runtime}>{children}</CommerceServicesProvider>;
  const hook = renderHook(() => ({ list: useLegacyInvoices({ workspaceId: "ws-a", legacyBusinessUnitId: "bu-a", branchId: "br-a" }), item: useLegacyInvoice({ workspaceId: "ws-a", legacyBusinessUnitId: "bu-a" }, INVOICE_A.id, "document") }), { wrapper });
  await waitFor(() => expect(hook.result.current.list.isSuccess && hook.result.current.item.isSuccess).toBe(true));
  expect(hook.result.current.item.data?.invoice.total).toBe(11);
}); });
