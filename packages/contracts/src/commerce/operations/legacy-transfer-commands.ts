import type { BranchInventory, StockMovement, StockTransfer } from "@nexoraxs/types";
import type { LegacyCommerceCommandContext } from "../common";

export interface LegacyTransferStockCommand {
  readonly toBranchId: string;
  readonly items: readonly { readonly productId: string; readonly qty: number }[];
  readonly note?: string;
}

export type LegacyTransferStockResult =
  | {
      readonly ok: true;
      readonly transfer: StockTransfer;
      readonly branchInventory: readonly BranchInventory[];
      readonly stockMovements: readonly StockMovement[];
      readonly stockTransfers: readonly StockTransfer[];
    }
  | { readonly ok: false; readonly error: string };

export interface LegacyTransferWritePort {
  readTransfers(): readonly StockTransfer[];
  replaceTransfers(records: readonly StockTransfer[]): void;
}

export interface LegacyStockTransferPort {
  transfer(
    context: LegacyCommerceCommandContext,
    command: LegacyTransferStockCommand,
  ): LegacyTransferStockResult;
}
