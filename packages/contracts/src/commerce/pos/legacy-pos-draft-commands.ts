import type { OrderItem } from "@nexoraxs/types";
import type {
  LegacyPosCommercialSettings,
  LegacyPosCommercialSnapshot,
} from "./legacy-pos-commercial-snapshot";

export type LegacyPosPaymentMethod = "cash" | "card" | "wallet";

export interface LegacyPosProductSnapshot {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly sku: string;
  readonly taxable: boolean;
  readonly stock: number;
  readonly category: string;
}

export interface LegacyPosDraftLine extends LegacyPosProductSnapshot {
  readonly qty: number;
}

/** POS-owned transient state; it is not a persisted Order or canonical POS Transaction. */
export interface LegacyPosDraft {
  readonly items: readonly LegacyPosDraftLine[];
  readonly customerId: string | null;
  readonly payment: LegacyPosPaymentMethod;
  readonly discount: number;
}

export type LegacyPosDraftCommand =
  | { readonly type: "add-product"; readonly product: LegacyPosProductSnapshot }
  | { readonly type: "change-quantity"; readonly productId: string; readonly delta: number }
  | { readonly type: "remove-item"; readonly productId: string }
  | { readonly type: "clear" }
  | { readonly type: "select-customer"; readonly customerId: string | null }
  | { readonly type: "select-payment"; readonly payment: LegacyPosPaymentMethod }
  | { readonly type: "set-discount-input"; readonly value: string | number }
  | { readonly type: "remove-discount" };

export type LegacyPosDraftErrorCode = "out_of_stock" | "unsupported_command";

/** Frontend-internal compatibility failure; not a server error taxonomy. */
export class LegacyPosDraftCommandError extends Error {
  constructor(
    readonly code: LegacyPosDraftErrorCode,
    readonly productName?: string,
  ) {
    super(`commerce.pos.draft.${code}`);
    this.name = "LegacyPosDraftCommandError";
  }
}

export interface LegacyPosDraftResult {
  readonly draft: LegacyPosDraft;
  readonly commercialSnapshot: LegacyPosCommercialSnapshot;
}

export interface LegacyPosDraftServicePort {
  createInitial(): LegacyPosDraft;
  snapshot(
    draft: LegacyPosDraft,
    setup: LegacyPosCommercialSettings,
  ): LegacyPosCommercialSnapshot;
  execute(input: {
    readonly draft: LegacyPosDraft;
    readonly command: LegacyPosDraftCommand;
    readonly setup: LegacyPosCommercialSettings;
  }): LegacyPosDraftResult;
  toOrderItems(draft: LegacyPosDraft): readonly OrderItem[];
}
