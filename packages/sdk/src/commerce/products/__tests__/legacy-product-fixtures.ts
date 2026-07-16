import type { LegacyProductRecord, LegacyProductScope } from "@nexoraxs/contracts";

export const LEGACY_SCOPE_A: LegacyProductScope = {
  workspaceId: "ws-a",
  legacyBusinessUnitId: "legacy-bu-shared",
  branchId: "branch-a",
};

export const LEGACY_SCOPE_B: LegacyProductScope = {
  workspaceId: "ws-b",
  legacyBusinessUnitId: "legacy-bu-shared",
  branchId: "branch-b",
};

export const LEGACY_SCOPE_C: LegacyProductScope = {
  workspaceId: "ws-a",
  legacyBusinessUnitId: "legacy-bu-c",
};

function product(input: Partial<LegacyProductRecord> & Pick<LegacyProductRecord, "id" | "workspaceId" | "businessUnitId" | "name" | "sku">): LegacyProductRecord {
  return {
    branchId: "branch-a",
    osSubscriptionId: "sub-commerce",
    category: "General",
    barcode: "",
    price: 10,
    cost: 5,
    taxable: true,
    stock: 8,
    unit: "Piece",
    lowStockThreshold: 2,
    notes: "",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...input,
  };
}

export function createLegacyProductFixtures(): LegacyProductRecord[] {
  return [
    product({
      id: "shared-product-id",
      workspaceId: LEGACY_SCOPE_A.workspaceId,
      businessUnitId: LEGACY_SCOPE_A.legacyBusinessUnitId,
      branchId: LEGACY_SCOPE_A.branchId!,
      name: "Workspace A Product",
      sku: "SHARED-SKU",
      compatibilityMarker: { source: "workspace-a" },
    }),
    product({
      id: "shared-product-id",
      workspaceId: LEGACY_SCOPE_B.workspaceId,
      businessUnitId: LEGACY_SCOPE_B.legacyBusinessUnitId,
      branchId: LEGACY_SCOPE_B.branchId!,
      name: "Workspace B Product",
      sku: "SHARED-SKU",
      compatibilityMarker: { source: "workspace-b" },
    }),
    product({
      id: "product-c",
      workspaceId: LEGACY_SCOPE_C.workspaceId,
      businessUnitId: LEGACY_SCOPE_C.legacyBusinessUnitId,
      name: "Legacy BU C Product",
      sku: "SHARED-SKU",
      compatibilityMarker: { source: "legacy-bu-c" },
    }),
  ];
}
