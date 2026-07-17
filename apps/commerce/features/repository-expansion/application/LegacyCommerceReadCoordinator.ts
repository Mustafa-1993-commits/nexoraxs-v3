import type { QueryClient } from "@tanstack/react-query";
import type { LegacyCommerceBranchScope, LegacyCommerceBusinessUnitScope } from "@nexoraxs/contracts";
import { legacyCustomerKeys } from "../../customers/hooks/legacy-customer-query-keys";
import { legacyInventoryKeys } from "../../inventory/hooks/legacy-inventory-query-keys";
import { legacyInvoiceKeys } from "../../invoices/hooks/legacy-invoice-query-keys";
import { legacyOrderKeys } from "../../orders/hooks/legacy-order-query-keys";

export class LegacyCommerceReadCoordinator {
  constructor(private readonly queryClient: QueryClient) {}
  inventoryCommitted(scope: LegacyCommerceBranchScope) { return this.queryClient.invalidateQueries({ queryKey: legacyInventoryKeys.list(scope) }); }
  orderCommitted(scope: LegacyCommerceBranchScope, orderId: string, customerId?: string | null) {
    const buScope: LegacyCommerceBusinessUnitScope = scope;
    return Promise.all([
      this.queryClient.invalidateQueries({ queryKey: legacyOrderKeys.list(scope, scope.branchId) }),
      this.queryClient.invalidateQueries({ queryKey: legacyOrderKeys.item(buScope, orderId) }),
      ...(customerId ? [this.queryClient.invalidateQueries({ queryKey: legacyCustomerKeys.history(buScope, scope.branchId, customerId) })] : []),
    ]);
  }
  invoiceCommitted(scope: LegacyCommerceBranchScope, invoiceId: string, orderId: string) {
    return Promise.all([
      this.queryClient.invalidateQueries({ queryKey: legacyInvoiceKeys.list(scope, scope.branchId) }),
      this.queryClient.invalidateQueries({ queryKey: legacyInvoiceKeys.item(scope, invoiceId, "detail") }),
      this.queryClient.invalidateQueries({ queryKey: legacyInvoiceKeys.item(scope, invoiceId, "document") }),
      this.queryClient.invalidateQueries({ queryKey: legacyOrderKeys.item(scope, orderId) }),
    ]);
  }
}
