import type {
  CreateLegacyCustomerCommand,
  LegacyCustomerCompatibilityRecord,
  UpdateLegacyCustomerCommand,
} from "../customers";
import type {
  CreateLegacyProductCommand,
  LegacyProductListResult,
  LegacyProductRecord,
  LegacyProductScope,
  ListLegacyProductsQuery,
  RemoveLegacyProductResult,
  UpdateLegacyProductCommand,
} from "../products";
import type { LegacyCommerceBusinessUnitScope, LegacyCommerceListResult } from "./legacy-commerce-contracts";

export type LegacyProductsCompatibilityListener = (
  scope: LegacyProductScope,
  products: readonly LegacyProductRecord[],
) => void;

/** Frontend-internal publication seam; not a canonical Product lifecycle contract. */
export interface LegacyProductsCompatibilityPort {
  list(scope: LegacyProductScope, query?: ListLegacyProductsQuery): Promise<LegacyProductListResult>;
  create(scope: LegacyProductScope, command: CreateLegacyProductCommand): Promise<LegacyProductRecord>;
  update(
    scope: LegacyProductScope,
    productId: string,
    command: UpdateLegacyProductCommand,
  ): Promise<LegacyProductRecord>;
  remove(scope: LegacyProductScope, productId: string): Promise<RemoveLegacyProductResult>;
  subscribe(listener: LegacyProductsCompatibilityListener): () => void;
  seedCompatibleProducts(products: readonly LegacyProductRecord[]): Promise<void>;
}

export interface LegacyCustomersCompatibilitySnapshot {
  readonly scope: LegacyCommerceBusinessUnitScope;
  readonly customers: readonly LegacyCustomerCompatibilityRecord[];
}

export type LegacyCustomersCompatibilityListener = (
  snapshot: LegacyCustomersCompatibilitySnapshot,
) => void;

/** Frontend-internal publication seam; not a canonical Customer lifecycle contract. */
export interface LegacyCustomersCompatibilityPort {
  list(
    scope: LegacyCommerceBusinessUnitScope,
  ): Promise<LegacyCommerceListResult<LegacyCustomerCompatibilityRecord>>;
  create(
    scope: LegacyCommerceBusinessUnitScope,
    command: CreateLegacyCustomerCommand,
  ): Promise<LegacyCustomerCompatibilityRecord>;
  update(
    scope: LegacyCommerceBusinessUnitScope,
    command: UpdateLegacyCustomerCommand,
  ): Promise<LegacyCustomerCompatibilityRecord>;
  subscribe(listener: LegacyCustomersCompatibilityListener): () => void;
}
