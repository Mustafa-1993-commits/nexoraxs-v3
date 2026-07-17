import { LegacyCommerceRepositoryError, type LegacyInvoiceCompatibilityRecord } from "@nexoraxs/contracts";
import { parseLegacyOrderRecord } from "../orders/legacy-order-serialization";

export function parseLegacyInvoiceRecord(value: unknown, operation: "invoices.list" | "invoices.getById" = "invoices.list"): LegacyInvoiceCompatibilityRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new LegacyCommerceRepositoryError({ code: "storage_unavailable", operation });
  }
  const source = value as Record<string, unknown>;
  const required = (field: string): string => {
    const candidate = source[field];
    if (typeof candidate !== "string" || !candidate) throw new LegacyCommerceRepositoryError({ code: "storage_unavailable", operation });
    return candidate;
  };
  const number = (field: string): number => {
    const candidate = source[field];
    if (typeof candidate !== "number" || !Number.isFinite(candidate)) throw new LegacyCommerceRepositoryError({ code: "storage_unavailable", operation });
    return candidate;
  };
  const parsedItems = parseLegacyOrderRecord({
    ...source,
    id: required("id"), orderNumber: required("invoiceNumber"), payment: "cash",
  }, operation === "invoices.list" ? "orders.list" : "orders.getById").items;
  return {
    ...source,
    id: required("id"), invoiceNumber: required("invoiceNumber"), orderId: required("orderId"),
    workspaceId: required("workspaceId"), businessUnitId: required("businessUnitId"), branchId: required("branchId"),
    customerId: typeof source.customerId === "string" ? source.customerId : null, items: parsedItems,
    subtotal: number("subtotal"), discount: number("discount"), vat: number("vat"), total: number("total"), net: number("net"),
    cashierId: required("cashierId"), cashierName: required("cashierName"), createdAt: required("createdAt"),
  };
}
export const parseLegacyInvoiceRecords = (values: readonly unknown[]) => values.map((value) => parseLegacyInvoiceRecord(value));
