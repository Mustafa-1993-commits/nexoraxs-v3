import type { LegacyProductScope } from "../products";
import type {
  LegacyCommerceBranchScope,
  LegacyCommerceBusinessUnitScope,
} from "./legacy-commerce-contracts";

export interface LegacyProductChangedInput {
  readonly scope: LegacyProductScope;
  readonly productId?: string;
}

export interface LegacyCustomersChangedInput {
  readonly scope: LegacyCommerceBusinessUnitScope;
  readonly customerId?: string;
  readonly branchId?: string | null;
}

export interface LegacyInventoryChangedInput {
  readonly scope: LegacyCommerceBranchScope;
  readonly productIds?: readonly string[];
}

export interface LegacyOrderChangedInput {
  readonly scope: LegacyCommerceBranchScope;
  readonly orderId: string;
  readonly customerId?: string | null;
}

export interface LegacyInvoiceChangedInput {
  readonly scope: LegacyCommerceBranchScope;
  readonly invoiceId: string;
  readonly orderId: string;
}

/** Cache-refresh intent only; never a Domain Event, Integration Event, or write authority. */
export interface CommerceChangeNotificationPort {
  productsChanged(input: LegacyProductChangedInput): Promise<void>;
  customersChanged(input: LegacyCustomersChangedInput): Promise<void>;
  inventoryChanged(input: LegacyInventoryChangedInput): Promise<void>;
  ordersChanged(input: LegacyOrderChangedInput): Promise<void>;
  invoicesChanged(input: LegacyInvoiceChangedInput): Promise<void>;
}
