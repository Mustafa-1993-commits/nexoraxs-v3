export interface LegacyOrderItemCompatibilityRecord {
  productId?: string;
  id?: string;
  name: string;
  qty: number;
  price: number;
  taxable: boolean;
  sku?: string;
}

/** Stored commercial snapshot. No Order lifecycle or calculation semantics are defined here. */
export interface LegacyOrderCompatibilityRecord {
  id: string;
  orderNumber: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  customerId: string | null;
  items: LegacyOrderItemCompatibilityRecord[];
  payment: "cash" | "card" | "wallet";
  discount: number;
  vat: number;
  subtotal: number;
  total: number;
  net: number;
  cashierId: string;
  cashierName: string;
  createdAt: string;
  returnStatus?: "none" | "partial" | "returned";
  returnedTotal?: number;
  returnIds?: string[];
}
