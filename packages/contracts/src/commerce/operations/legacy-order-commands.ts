import type { BranchInventory, CommerceOrder, OrderItem, StockMovement } from "@nexoraxs/types";
import type { LegacyCommerceCommandContext } from "../common";

export interface LegacyCreateOrderCommand {
  readonly items: readonly OrderItem[];
  readonly customerId: string | null;
  readonly payment: "cash" | "card" | "wallet";
  readonly discount: number;
  readonly vat: number;
  readonly subtotal: number;
  readonly total: number;
  readonly net: number;
}

export interface LegacyCreateOrderResult {
  readonly order: CommerceOrder;
  readonly orders: readonly CommerceOrder[];
  readonly branchInventory: readonly BranchInventory[];
  readonly stockMovements: readonly StockMovement[];
}

export interface LegacyOrderWritePort {
  readOrders(): readonly CommerceOrder[];
  replaceOrders(records: readonly CommerceOrder[]): void;
}

export interface LegacyOrderCreationPort {
  create(
    context: LegacyCommerceCommandContext,
    command: LegacyCreateOrderCommand,
  ): LegacyCreateOrderResult;
}
