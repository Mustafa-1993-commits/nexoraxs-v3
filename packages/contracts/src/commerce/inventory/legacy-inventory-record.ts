import type { LegacyJsonValue } from "../products";

export interface LegacyBranchInventoryCompatibilityRecord {
  id: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  productId: string;
  qty: number;
  lowStockThreshold: number;
  updatedAt: string;
  [key: string]: LegacyJsonValue | undefined;
}
