export type LegacyJsonPrimitive = string | number | boolean | null;
export type LegacyJsonValue = LegacyJsonPrimitive | LegacyJsonValue[] | { [key: string]: LegacyJsonValue };

/**
 * Existing combined browser record preserved during Feature 052 migration.
 *
 * This is not a canonical Commerce Product aggregate or future transport DTO.
 * Price, tax, stock, media, Branch, subscription, and unknown fields remain
 * compatibility data and do not transfer ownership to Product Catalog.
 */
export interface LegacyProductRecord {
  id: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  osSubscriptionId: string;
  name: string;
  category: string;
  sku: string;
  barcode: string;
  price: number;
  cost: number;
  taxable: boolean;
  stock: number | null;
  unit?: string;
  low?: number;
  lowStockThreshold: number;
  brand?: string;
  expiry?: string;
  image?: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: LegacyJsonValue | undefined;
}

export interface ListLegacyProductsQuery {
  readonly page?: number;
  readonly pageSize?: number;
}

export interface LegacyProductListResult {
  readonly items: readonly LegacyProductRecord[];
  readonly total: number;
  readonly page: number | null;
  readonly pageSize: number | null;
  readonly hasNextPage: boolean;
}

export interface CreateLegacyProductCommand {
  readonly name: string;
  readonly category: string;
  readonly sku: string;
  readonly barcode: string;
  readonly price: number;
  readonly cost: number;
  readonly taxable: boolean;
  readonly stock: number | null;
  readonly lowStockThreshold: number;
  readonly notes: string;
  readonly branchId?: string;
  readonly osSubscriptionId?: string;
  readonly unit?: string;
  readonly low?: number;
  readonly brand?: string;
  readonly expiry?: string;
  readonly image?: string | null;
  readonly compatibilityFields?: Readonly<Record<string, LegacyJsonValue>>;
}

export type UpdateLegacyProductCommand = Partial<CreateLegacyProductCommand>;

export interface RemoveLegacyProductResult {
  readonly removedId: string;
}
