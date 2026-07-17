import { describe, expect, it } from "vitest";
import { legacyCustomerKeys } from "../../customers/hooks/legacy-customer-query-keys";
import { legacyInventoryKeys } from "../../inventory/hooks/legacy-inventory-query-keys";
import { legacyInvoiceKeys } from "../../invoices/hooks/legacy-invoice-query-keys";
import { legacyOrderKeys } from "../../orders/hooks/legacy-order-query-keys";
describe("full-scope Commerce query keys", () => {
  it("encodes Workspace, legacy BU, explicit Branch/null, ID, filter, and view kind", () => {
    const a = { workspaceId: "ws-a", legacyBusinessUnitId: "bu", branchId: "br-a" };
    const b = { workspaceId: "ws-b", legacyBusinessUnitId: "bu", branchId: "br-a" };
    expect(legacyCustomerKeys.list(a)).not.toEqual(legacyCustomerKeys.list(b));
    expect(legacyInventoryKeys.list(a)).toContain("br-a");
    expect(legacyOrderKeys.item(a, "id")).toContain(null);
    expect(legacyInvoiceKeys.item(a, "id", "detail")).not.toEqual(legacyInvoiceKeys.item(a, "id", "document"));
  });
});
