import type {
  BranchInventory,
  CommerceOrder,
  CommerceProduct,
  OrderItem,
  StockMovement,
} from "@nexoraxs/types";
import type { LegacyCommerceBranchScope } from "../common";

export interface LegacySaleProductSnapshotPort {
  listProducts(scope: LegacyCommerceBranchScope): readonly CommerceProduct[];
}

export interface LegacySaleInventoryPersistencePort {
  listPositions(scope: LegacyCommerceBranchScope): readonly BranchInventory[];
  replacePositions(
    scope: LegacyCommerceBranchScope,
    records: readonly BranchInventory[],
  ): readonly BranchInventory[];
  listMovements(scope: LegacyCommerceBranchScope): readonly StockMovement[];
  replaceMovements(
    scope: LegacyCommerceBranchScope,
    records: readonly StockMovement[],
  ): readonly StockMovement[];
}

/** Opaque outside Inventory; Orders may only pass the prepared value back. */
export interface LegacyPreparedSaleInventoryEffect {
  readonly compatibilityToken: unknown;
}

export interface LegacySaleInventoryEffectResult {
  readonly branchInventory: readonly BranchInventory[];
  readonly stockMovements: readonly StockMovement[];
}

export interface LegacyOrderInventoryEffectPort {
  prepareSaleDeduction(input: {
    readonly scope: LegacyCommerceBranchScope;
    readonly items: readonly OrderItem[];
  }): LegacyPreparedSaleInventoryEffect;
  commitSaleDeduction(input: {
    readonly scope: LegacyCommerceBranchScope;
    readonly prepared: LegacyPreparedSaleInventoryEffect;
    readonly order: CommerceOrder;
    readonly actorId: string;
    readonly actorDisplayName: string;
  }): LegacySaleInventoryEffectResult;
}

