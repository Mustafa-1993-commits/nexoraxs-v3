import { LegacyCommerceRepositoryError, type LegacyBranchInventoryCompatibilityRecord, type LegacyJsonValue } from "@nexoraxs/contracts";

export function parseLegacyInventoryRecord(value: unknown): LegacyBranchInventoryCompatibilityRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new LegacyCommerceRepositoryError({ code: "storage_unavailable", operation: "inventory.list" });
  }
  const source = value as Record<string, unknown>;
  const required = (field: string): string => {
    const candidate = source[field];
    if (typeof candidate !== "string" || !candidate) throw new LegacyCommerceRepositoryError({ code: "storage_unavailable", operation: "inventory.list" });
    return candidate;
  };
  const number = (field: string): number => {
    const candidate = source[field];
    if (typeof candidate !== "number" || !Number.isFinite(candidate)) throw new LegacyCommerceRepositoryError({ code: "storage_unavailable", operation: "inventory.list" });
    return candidate;
  };
  return {
    ...(source as Record<string, LegacyJsonValue | undefined>),
    id: required("id"), workspaceId: required("workspaceId"), businessUnitId: required("businessUnitId"),
    branchId: required("branchId"), productId: required("productId"), qty: number("qty"),
    lowStockThreshold: number("lowStockThreshold"), updatedAt: required("updatedAt"),
  };
}
export const parseLegacyInventoryRecords = (values: readonly unknown[]) => values.map(parseLegacyInventoryRecord);
