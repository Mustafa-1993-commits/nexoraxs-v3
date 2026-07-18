import { QueryClient } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { ReactQueryCommerceChangeAdapter } from "../../../lib/commerce/cache/ReactQueryCommerceChangeAdapter";
import { legacyProductKeys } from "../../products/hooks/legacy-product-query-keys";
import { legacyCustomerKeys } from "../../customers/hooks/legacy-customer-query-keys";
import { legacyInventoryKeys } from "../../inventory/hooks/legacy-inventory-query-keys";
import { legacyOrderKeys } from "../../orders/hooks/legacy-order-query-keys";
import { legacyInvoiceKeys } from "../../invoices/hooks/legacy-invoice-query-keys";

const scope = { workspaceId: "ws", legacyBusinessUnitId: "bu", branchId: "br" };

describe("ReactQueryCommerceChangeAdapter", () => {
  it("maps every change to complete exact-scope prefixes and relationship keys", async () => {
    const client = new QueryClient(); const invalidate = vi.spyOn(client, "invalidateQueries").mockResolvedValue();
    const adapter = new ReactQueryCommerceChangeAdapter(client);
    await adapter.productsChanged({ scope, productId: "p" });
    await adapter.customersChanged({ scope, branchId: "br", customerId: "c" });
    await adapter.inventoryChanged({ scope, productIds: ["p"] });
    await adapter.ordersChanged({ scope, orderId: "o", customerId: "c" });
    await adapter.invoicesChanged({ scope, invoiceId: "i", orderId: "o" });
    const keys = invalidate.mock.calls.map(([input]) => input?.queryKey);
    for (const key of [
      legacyProductKeys.scope(scope), legacyCustomerKeys.scope(scope), legacyCustomerKeys.item(scope, "c"),
      legacyCustomerKeys.history(scope, "br", "c"), legacyCustomerKeys.histories(scope, "br"),
      legacyInventoryKeys.scope(scope), legacyOrderKeys.listScope(scope, "br"), legacyOrderKeys.item(scope, "o", "br"),
      legacyInvoiceKeys.listScope(scope, "br"), legacyInvoiceKeys.item(scope, "i", "detail"),
      legacyInvoiceKeys.item(scope, "i", "document"),
    ]) expect(keys).toContainEqual(key);
    expect(keys.every((key) => JSON.stringify(key).includes("ws") && JSON.stringify(key).includes("bu"))).toBe(true);
  });

  it("does not touch another same-ID scope and propagates invalidation failures", async () => {
    const client = new QueryClient();
    vi.spyOn(client, "invalidateQueries").mockRejectedValue(new Error("cache-failed"));
    await expect(new ReactQueryCommerceChangeAdapter(client).inventoryChanged({ scope })).rejects.toThrow("cache-failed");
  });
});
