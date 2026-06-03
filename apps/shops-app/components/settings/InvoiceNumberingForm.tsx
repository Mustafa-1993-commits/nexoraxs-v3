"use client";

import { useState, useSyncExternalStore } from "react";
import { Icon } from "@nexoraxs/ui";
import {
  getInvoiceNumbering,
  setInvoiceNumbering,
  subscribeToInvoiceNumbering,
  DEFAULT_INVOICING,
  formatDocNumber,
  type InvoiceNumbering,
} from "@/lib/settings-store";
import { getLocale, subscribeToLocale, tSettings } from "@/lib/locale";

function useInvoiceNumbering(): InvoiceNumbering {
  const stored = useSyncExternalStore(subscribeToInvoiceNumbering, getInvoiceNumbering, () => null);
  return stored ?? DEFAULT_INVOICING;
}

function useLocale() {
  return useSyncExternalStore(subscribeToLocale, getLocale, () => "en" as const);
}

export function InvoiceNumberingForm() {
  const saved = useInvoiceNumbering();
  const locale = useLocale();

  const [receiptPrefix, setReceiptPrefix] = useState(saved.receiptPrefix);
  const [invoicePrefix, setInvoicePrefix] = useState(saved.invoicePrefix);
  const [startingNumber, setStartingNumber] = useState(String(saved.startingNumber));
  const [savedOk, setSavedOk] = useState(false);

  const numValue = parseInt(startingNumber, 10);
  const isNumInvalid = isNaN(numValue) || numValue < 1;
  const effectiveNum = isNumInvalid ? 1 : numValue;

  function handleSave() {
    setInvoiceNumbering({
      receiptPrefix: receiptPrefix.trim() || "RCP",
      invoicePrefix: invoicePrefix.trim() || "INV",
      startingNumber: effectiveNum,
    });
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2500);
  }

  return (
    <div className="space-y-6">
      <section className="card p-6 space-y-5">
        <div>
          <p className="chip mb-1 text-gray-500">{"// invoice numbering"}</p>
          <h2 className="text-lg font-semibold text-white">{tSettings("settings.invoicing.title", locale)}</h2>
          <p className="mt-1 text-sm text-gray-400">
            Configure how receipt and invoice document numbers are generated.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-white/80">{tSettings("settings.invoicing.receiptPrefix", locale)}</label>
            <input
              type="text"
              value={receiptPrefix}
              onChange={(e) => setReceiptPrefix(e.target.value.slice(0, 10))}
              placeholder="RCP"
              maxLength={10}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-white/25 focus:bg-white/[0.06]"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-white/80">{tSettings("settings.invoicing.invoicePrefix", locale)}</label>
            <input
              type="text"
              value={invoicePrefix}
              onChange={(e) => setInvoicePrefix(e.target.value.slice(0, 10))}
              placeholder="INV"
              maxLength={10}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-white/25 focus:bg-white/[0.06]"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-white/80">{tSettings("settings.invoicing.startingNumber", locale)}</label>
            <input
              type="number"
              min="1"
              value={startingNumber}
              onChange={(e) => setStartingNumber(e.target.value)}
              placeholder="1"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-white/25 focus:bg-white/[0.06]"
            />
            {isNumInvalid && startingNumber !== "" && (
              <p className="text-xs text-amber-400">Minimum value is 1.</p>
            )}
          </div>
        </div>

        {/* Live example output */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500">
            {tSettings("settings.invoicing.example", locale)}
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Receipt</span>
              <code className="rounded bg-white/10 px-2.5 py-1 text-sm font-mono text-white">
                {formatDocNumber(receiptPrefix || "RCP", effectiveNum)}
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Invoice</span>
              <code className="rounded bg-white/10 px-2.5 py-1 text-sm font-mono text-white">
                {formatDocNumber(invoicePrefix || "INV", effectiveNum)}
              </code>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
        >
          {tSettings("settings.common.save", locale)}
        </button>
        {savedOk && (
          <span className="flex items-center gap-1.5 text-sm text-emerald-400">
            <Icon name="check-circle" className="h-4 w-4" />
            {tSettings("settings.common.saved", locale)}
          </span>
        )}
      </div>
    </div>
  );
}
