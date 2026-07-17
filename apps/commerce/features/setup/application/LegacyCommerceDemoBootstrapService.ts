import type { LegacyCommerceOperationsStore } from "@nexoraxs/contracts";
import type { CommerceInvoice, CommerceOrder, CommerceSetup, MediaAsset } from "@nexoraxs/types";

export interface LegacyCommerceDemoBootstrapInput {
  readonly setups: readonly CommerceSetup[];
  readonly orders: readonly CommerceOrder[];
  readonly invoices: readonly CommerceInvoice[];
  readonly mediaAssets: readonly MediaAsset[];
}

/** Commerce-owned compatibility bootstrap for the existing demo flag only. */
export class LegacyCommerceDemoBootstrapService {
  constructor(private readonly store: LegacyCommerceOperationsStore) {}
  bootstrap(input: LegacyCommerceDemoBootstrapInput): void {
    this.store.replaceSetups(input.setups);
    this.store.replaceOrders(input.orders);
    this.store.replaceInvoices(input.invoices);
    this.store.replaceMediaAssets(input.mediaAssets);
  }
}
