import type { BranchInventory, StockMovement } from "@nexoraxs/types";
import type { LegacyCommerceCommandContext } from "../common";

export interface LegacyAdjustStockCommand {
  readonly productId: string;
  readonly branchId?: string;
  readonly qty: number;
  readonly lowStockThreshold?: number;
}

export type LegacyAdjustStockResult =
  | {
      readonly ok: true;
      readonly branchInventory: readonly BranchInventory[];
      readonly stockMovements: readonly StockMovement[];
    }
  | { readonly ok: false; readonly error: string };

export interface LegacyInventoryWritePort {
  readPositions(): readonly BranchInventory[];
  replacePositions(records: readonly BranchInventory[]): void;
  readMovements(): readonly StockMovement[];
  replaceMovements(records: readonly StockMovement[]): void;
}

export interface LegacyStockAdjustmentPort {
  adjust(
    context: LegacyCommerceCommandContext,
    command: LegacyAdjustStockCommand,
  ): LegacyAdjustStockResult;
}
