import type { LegacyOrderItemCompatibilityRecord } from "../orders";

/** Stored Invoice snapshot. No issuance, payment, tax, or accounting semantics are defined here. */
export interface LegacyInvoiceCompatibilityRecord {
  id: string;
  invoiceNumber: string;
  orderId: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  customerId: string | null;
  items: LegacyOrderItemCompatibilityRecord[];
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  net: number;
  cashierId: string;
  cashierName: string;
  createdAt: string;
  returnIds?: string[];
}
