import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { ReactQueryCommerceChangeAdapter } from "../../../lib/commerce/cache/ReactQueryCommerceChangeAdapter";
import { legacyCustomerKeys } from "../../customers/hooks/legacy-customer-query-keys";
import { legacyInventoryKeys } from "../../inventory/hooks/legacy-inventory-query-keys";
import { legacyInvoiceKeys } from "../../invoices/hooks/legacy-invoice-query-keys";
import { legacyOrderKeys } from "../../orders/hooks/legacy-order-query-keys";

const scope = { workspaceId: "ws", legacyBusinessUnitId: "bu", branchId: "br" };

describe("Feature 054 cache characterization", () => {
  it("invalidates only current exact Inventory, Order, Customer history, and Invoice keys", async () => {
    const queryClient = new QueryClient();
    const invalidate = vi.spyOn(queryClient, "invalidateQueries").mockResolvedValue();
    const coordinator = new ReactQueryCommerceChangeAdapter(queryClient);

    await coordinator.inventoryChanged({ scope });
    await coordinator.ordersChanged({ scope, orderId: "ord", customerId: "cust" });
    await coordinator.invoicesChanged({ scope, invoiceId: "inv", orderId: "ord" });

    const keys = invalidate.mock.calls.map(([input]) => input?.queryKey);
    expect(keys).toContainEqual(legacyInventoryKeys.scope(scope));
    expect(keys).toContainEqual(legacyOrderKeys.listScope(scope, "br"));
    expect(keys).toContainEqual(legacyOrderKeys.item(scope, "ord"));
    expect(keys).toContainEqual(legacyCustomerKeys.history(scope, "br", "cust"));
    expect(keys).toContainEqual(legacyInvoiceKeys.listScope(scope, "br"));
    expect(keys).toContainEqual(legacyInvoiceKeys.item(scope, "inv", "detail"));
    expect(keys).toContainEqual(legacyInvoiceKeys.item(scope, "inv", "document"));
  });

  it("surfaces notification failure without invoking another source write", async () => {
    const queryClient = new QueryClient();
    vi.spyOn(queryClient, "invalidateQueries").mockRejectedValue(new Error("cache-failed"));
    const coordinator = new ReactQueryCommerceChangeAdapter(queryClient);
    await expect(coordinator.inventoryChanged({ scope })).rejects.toThrow("cache-failed");
  });
});
