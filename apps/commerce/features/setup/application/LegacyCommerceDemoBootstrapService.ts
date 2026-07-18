import type {
  LegacyCommerceBusinessUnitScope,
  LegacyCommerceOperationsStore,
  LegacyOrderCommandRepository,
} from "@nexoraxs/contracts";
import type { CommerceInvoice, CommerceOrder, CommerceSetup, MediaAsset } from "@nexoraxs/types";

export interface LegacyCommerceDemoBootstrapInput {
  readonly orderScope: LegacyCommerceBusinessUnitScope;
  readonly setups: readonly CommerceSetup[];
  readonly orders: readonly CommerceOrder[];
  readonly invoices: readonly CommerceInvoice[];
  readonly mediaAssets: readonly MediaAsset[];
}

/** Commerce-owned compatibility bootstrap for the existing demo flag only. */
export class LegacyCommerceDemoBootstrapService {
  constructor(
    private readonly store: LegacyCommerceOperationsStore,
    private readonly orders: LegacyOrderCommandRepository,
  ) {}
  bootstrap(input: LegacyCommerceDemoBootstrapInput): void {
    this.store.replaceSetups(input.setups);
    this.orders.replaceDemoSeed(input.orderScope, input.orders);
    this.store.replaceInvoices(input.invoices);
    this.store.replaceMediaAssets(input.mediaAssets);
  }
}
