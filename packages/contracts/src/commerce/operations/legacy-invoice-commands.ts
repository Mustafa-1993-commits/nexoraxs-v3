import type { CommerceInvoice } from "@nexoraxs/types";
import type { LegacyCommerceCommandContext } from "../common";

export interface LegacyCreateInvoiceCommand {
  readonly orderId: string;
}

export interface LegacyCreateInvoiceResult {
  readonly invoice: CommerceInvoice;
  readonly invoices: readonly CommerceInvoice[];
}

export interface LegacyInvoiceWritePort {
  readInvoices(): readonly CommerceInvoice[];
  replaceInvoices(records: readonly CommerceInvoice[]): void;
}

export interface LegacyInvoiceCreationPort {
  create(
    context: LegacyCommerceCommandContext,
    command: LegacyCreateInvoiceCommand,
  ): LegacyCreateInvoiceResult;
}
