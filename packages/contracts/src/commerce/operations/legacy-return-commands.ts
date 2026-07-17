import type {
  BranchInventory,
  CommerceInvoice,
  CommerceOrder,
  CommerceReturn,
  RefundMethod,
  StockMovement,
} from "@nexoraxs/types";
import type { LegacyCommerceCommandContext } from "../common";

export interface LegacyCreateReturnCommand {
  readonly orderId: string;
  readonly items: readonly { readonly productId: string; readonly qty: number }[];
  readonly reason: string;
  readonly refundMethod: RefundMethod;
  readonly restock: boolean;
}

export type LegacyCreateReturnResult =
  | {
      readonly ok: true;
      readonly returnRecord: CommerceReturn;
      readonly orders: readonly CommerceOrder[];
      readonly invoices: readonly CommerceInvoice[];
      readonly returns: readonly CommerceReturn[];
      readonly branchInventory: readonly BranchInventory[];
      readonly stockMovements: readonly StockMovement[];
    }
  | { readonly ok: false; readonly error: string };

export interface LegacyReturnWritePort {
  readReturns(): readonly CommerceReturn[];
  replaceReturns(records: readonly CommerceReturn[]): void;
}

export interface LegacyReturnCreationPort {
  create(
    context: LegacyCommerceCommandContext,
    command: LegacyCreateReturnCommand,
  ): LegacyCreateReturnResult;
}
