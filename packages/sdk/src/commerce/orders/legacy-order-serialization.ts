import {
  LegacyCommerceRepositoryError,
  type LegacyOrderCompatibilityRecord,
  type LegacyOrderItemCompatibilityRecord,
} from "@nexoraxs/contracts";

function sourceObject(value: unknown, operation: "orders.list" | "orders.getById"): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new LegacyCommerceRepositoryError({ code: "storage_unavailable", operation });
  }
  return value as Record<string, unknown>;
}
function text(value: unknown, operation: "orders.list" | "orders.getById"): string {
  if (typeof value !== "string" || !value) throw new LegacyCommerceRepositoryError({ code: "storage_unavailable", operation });
  return value;
}
function amount(value: unknown, operation: "orders.list" | "orders.getById"): number {
  if (typeof value !== "number" || !Number.isFinite(value)) throw new LegacyCommerceRepositoryError({ code: "storage_unavailable", operation });
  return value;
}
function item(value: unknown, operation: "orders.list" | "orders.getById"): LegacyOrderItemCompatibilityRecord {
  const source = sourceObject(value, operation);
  return {
    ...(typeof source.productId === "string" ? { productId: source.productId } : {}),
    ...(typeof source.id === "string" ? { id: source.id } : {}),
    name: text(source.name, operation),
    qty: amount(source.qty, operation),
    price: amount(source.price, operation),
    taxable: typeof source.taxable === "boolean" ? source.taxable : true,
    ...(typeof source.sku === "string" ? { sku: source.sku } : {}),
  };
}
export function parseLegacyOrderRecord(value: unknown, operation: "orders.list" | "orders.getById" = "orders.list"): LegacyOrderCompatibilityRecord {
  const source = sourceObject(value, operation);
  if (!Array.isArray(source.items)) throw new LegacyCommerceRepositoryError({ code: "storage_unavailable", operation });
  const payment = source.payment;
  if (payment !== "cash" && payment !== "card" && payment !== "wallet") {
    throw new LegacyCommerceRepositoryError({ code: "storage_unavailable", operation });
  }
  return {
    ...source,
    id: text(source.id, operation), orderNumber: text(source.orderNumber, operation),
    workspaceId: text(source.workspaceId, operation), businessUnitId: text(source.businessUnitId, operation),
    branchId: text(source.branchId, operation), customerId: typeof source.customerId === "string" ? source.customerId : null,
    items: source.items.map((entry) => item(entry, operation)), payment,
    discount: amount(source.discount, operation), vat: amount(source.vat, operation),
    subtotal: amount(source.subtotal, operation), total: amount(source.total, operation), net: amount(source.net, operation),
    cashierId: text(source.cashierId, operation), cashierName: text(source.cashierName, operation),
    createdAt: text(source.createdAt, operation),
  };
}
export function parseLegacyOrderRecords(values: readonly unknown[]): LegacyOrderCompatibilityRecord[] {
  return values.map((value) => parseLegacyOrderRecord(value));
}
