import type { QueryClient } from "@tanstack/react-query";
import type {
  CommerceChangeNotificationPort,
  LegacyCustomersChangedInput,
  LegacyInvoiceChangedInput,
  LegacyInventoryChangedInput,
  LegacyOrderChangedInput,
  LegacyProductChangedInput,
} from "@nexoraxs/contracts";
import { legacyProductKeys } from "@/features/products/hooks/legacy-product-query-keys";
import { legacyCustomerKeys } from "@/features/customers/hooks/legacy-customer-query-keys";
import { legacyInventoryKeys } from "@/features/inventory/hooks/legacy-inventory-query-keys";
import { legacyOrderKeys } from "@/features/orders/hooks/legacy-order-query-keys";
import { legacyInvoiceKeys } from "@/features/invoices/hooks/legacy-invoice-query-keys";

export class ReactQueryCommerceChangeAdapter implements CommerceChangeNotificationPort {
  constructor(private readonly queryClient: QueryClient) {}

  async productsChanged(input: LegacyProductChangedInput): Promise<void> {
    await this.queryClient.invalidateQueries({ queryKey: legacyProductKeys.scope(input.scope) });
  }

  async customersChanged(input: LegacyCustomersChangedInput): Promise<void> {
    const work = [
      this.queryClient.invalidateQueries({ queryKey: legacyCustomerKeys.scope(input.scope) }),
      this.queryClient.invalidateQueries({ queryKey: legacyCustomerKeys.histories(input.scope, input.branchId ?? null) }),
    ];
    if (input.customerId) {
      work.push(this.queryClient.invalidateQueries({ queryKey: legacyCustomerKeys.item(input.scope, input.customerId), exact: true }));
      work.push(this.queryClient.invalidateQueries({ queryKey: legacyCustomerKeys.history(input.scope, input.branchId ?? null, input.customerId), exact: true }));
    }
    await Promise.all(work);
  }

  async inventoryChanged(input: LegacyInventoryChangedInput): Promise<void> {
    await this.queryClient.invalidateQueries({ queryKey: legacyInventoryKeys.scope(input.scope) });
  }

  async ordersChanged(input: LegacyOrderChangedInput): Promise<void> {
    await Promise.all([
      this.queryClient.invalidateQueries({ queryKey: legacyOrderKeys.listScope(input.scope, input.scope.branchId) }),
      this.queryClient.invalidateQueries({ queryKey: legacyOrderKeys.item(input.scope, input.orderId) }),
      ...(input.customerId ? [this.queryClient.invalidateQueries({
        queryKey: legacyCustomerKeys.history(input.scope, input.scope.branchId, input.customerId),
      })] : []),
    ]);
  }

  async invoicesChanged(input: LegacyInvoiceChangedInput): Promise<void> {
    await Promise.all([
      this.queryClient.invalidateQueries({ queryKey: legacyInvoiceKeys.listScope(input.scope, input.scope.branchId) }),
      this.queryClient.invalidateQueries({ queryKey: legacyInvoiceKeys.item(input.scope, input.invoiceId, "detail") }),
      this.queryClient.invalidateQueries({ queryKey: legacyInvoiceKeys.item(input.scope, input.invoiceId, "document") }),
      this.queryClient.invalidateQueries({ queryKey: legacyOrderKeys.item(input.scope, input.orderId) }),
    ]);
  }
}
