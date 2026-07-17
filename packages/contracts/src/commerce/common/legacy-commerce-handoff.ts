import type { LegacyCommerceBusinessUnitScope } from "./legacy-commerce-contracts";

export interface LegacyCommerceProductSummary {
  readonly id: string;
  readonly name: string;
  readonly stock: number | null;
  readonly lowStockThreshold: number | null;
}

export interface LegacyCommerceOrderSummary {
  readonly id: string;
  readonly orderNumber: string;
  readonly total: number;
  readonly createdAt: string;
}

export interface LegacyCommerceSetupSummary {
  readonly billingAddressLine1?: string;
  readonly billingAddressLine2?: string;
  readonly billingCity?: string;
  readonly billingCountry?: string;
  readonly billingPostalCode?: string;
  readonly vatRegistered?: boolean;
  readonly vatNumber?: string;
}

export interface LegacyCommerceProjection {
  readonly scope: LegacyCommerceBusinessUnitScope;
  readonly branchId: string | null;
  readonly products: readonly LegacyCommerceProductSummary[];
  readonly orders: readonly LegacyCommerceOrderSummary[];
  readonly setup: LegacyCommerceSetupSummary | null;
}

/** Read-only reconstructable compatibility projection; it accepts no write. */
export interface CommerceProjectionPort {
  readProjection(input: {
    readonly scope: LegacyCommerceBusinessUnitScope;
    readonly branchId?: string | null;
  }): Promise<LegacyCommerceProjection>;
}

export interface LegacyCommerceHandoffContext {
  readonly actorId: string;
  readonly workspaceId: string;
  readonly legacyBusinessUnitId: string;
  readonly branchId?: string | null;
  readonly osId: "commerce";
  readonly osSubscriptionId?: string | null;
  readonly action: string;
  readonly resourceId?: string | null;
  readonly displayContext?: Readonly<Record<string, string>>;
}

/** Frontend compatibility handoff; identifiers are inputs, never authorization proof. */
export interface CommerceHandoffPort {
  accept(context: LegacyCommerceHandoffContext): Promise<void>;
}

export interface LegacyCommerceCommandContext {
  readonly workspaceId: string;
  readonly legacyBusinessUnitId: string;
  readonly branchId?: string | null;
  readonly actorId: string;
  readonly actorDisplayName: string;
  readonly osId: "commerce";
  readonly action: string;
  readonly resourceId?: string | null;
}
