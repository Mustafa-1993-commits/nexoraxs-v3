import type {
  CommerceInvoice,
  CommerceOrder,
} from "@nexoraxs/types";
import type { LegacyCommerceCommandContext } from "../common";
import type {
  LegacyCreateInvoiceResult,
  LegacyCreateOrderResult,
} from "../operations";
import type { LegacyPosCommercialSnapshot } from "./legacy-pos-commercial-snapshot";
import type { LegacyPosDraft } from "./legacy-pos-draft-commands";

export interface LegacyPosCheckoutInput {
  readonly context: LegacyCommerceCommandContext;
  readonly draft: LegacyPosDraft;
  readonly commercialSnapshot: LegacyPosCommercialSnapshot;
  readonly tenderedAmount: number;
}

export interface LegacyPosCheckoutResult {
  readonly order: CommerceOrder;
  readonly invoice: CommerceInvoice;
  readonly successRoute: "/pos/success";
}

export interface LegacyPosCheckoutPort {
  checkout(input: LegacyPosCheckoutInput): LegacyPosCheckoutResult;
}

export type LegacyCommerceCommandPublication =
  | { readonly type: "order"; readonly result: LegacyCreateOrderResult }
  | { readonly type: "invoice"; readonly result: LegacyCreateInvoiceResult };

export type LegacyCommerceCommandPublicationListener = (
  publication: LegacyCommerceCommandPublication,
) => void;

/** Publishes committed compatibility snapshots; it never persists or recalculates them. */
export interface LegacyCommerceCommandPublicationPort {
  publishOrderResult(result: LegacyCreateOrderResult): void;
  publishInvoiceResult(result: LegacyCreateInvoiceResult): void;
  subscribe(listener: LegacyCommerceCommandPublicationListener): () => void;
}
