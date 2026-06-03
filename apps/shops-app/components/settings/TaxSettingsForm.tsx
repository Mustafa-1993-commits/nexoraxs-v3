"use client";

import { useState, useSyncExternalStore } from "react";
import { Icon } from "@nexoraxs/ui";
import {
  getTaxSettings,
  setTaxSettings,
  subscribeToTaxSettings,
  DEFAULT_TAX,
  type TaxSettings,
} from "@/lib/settings-store";
import { getLocale, subscribeToLocale, tSettings } from "@/lib/locale";

function useTaxSettings(): TaxSettings {
  const stored = useSyncExternalStore(subscribeToTaxSettings, getTaxSettings, () => null);
  return stored ?? DEFAULT_TAX;
}

function useLocale() {
  return useSyncExternalStore(subscribeToLocale, getLocale, () => "en" as const);
}

export function TaxSettingsForm() {
  const saved = useTaxSettings();
  const locale = useLocale();

  const [registered, setRegistered] = useState(saved.registered);
  const [taxRate, setTaxRate] = useState(String(saved.taxRate));
  const [priceMode, setPriceMode] = useState<"inclusive" | "exclusive">(saved.priceMode);
  const [savedOk, setSavedOk] = useState(false);
  const [rateError, setRateError] = useState("");

  function handleSave() {
    const rate = parseFloat(taxRate);
    if (isNaN(rate) || rate < 0 || rate > 100) {
      setRateError("Tax rate must be between 0 and 100.");
      return;
    }
    setRateError("");
    setTaxSettings({ registered, taxRate: rate, priceMode });
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2500);
  }

  return (
    <div className="space-y-6">
      <section className="card p-6 space-y-5">
        <div>
          <p className="chip mb-1 text-gray-500">{"// tax settings"}</p>
          <h2 className="text-lg font-semibold text-white">{tSettings("settings.tax.title", locale)}</h2>
          <p className="mt-1 text-sm text-gray-400">
            Configure how tax is calculated and displayed on POS transactions.
          </p>
        </div>

        {/* Tax Registered Toggle */}
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
          <div>
            <div className="text-sm font-medium text-white">{tSettings("settings.tax.registered", locale)}</div>
            <div className="mt-0.5 text-xs text-gray-500">
              {registered
                ? "Tax invoices will be issued for eligible transactions."
                : "Tax invoices are disabled. Enable to issue VAT invoices."}
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={registered}
            onClick={() => setRegistered((r) => !r)}
            className={[
              "relative h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none",
              registered ? "bg-blue-600" : "bg-white/15",
            ].join(" ")}
          >
            <span
              className={[
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
                registered ? "translate-x-5" : "translate-x-0.5",
              ].join(" ")}
            />
          </button>
        </div>

        {/* Default Tax Rate */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-white/80">
            {tSettings("settings.tax.rate", locale)}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              disabled={!registered}
              placeholder="e.g. 15"
              className="w-32 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-white/25 focus:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40"
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
          {rateError && <p className="text-xs text-red-400">{rateError}</p>}
          {!registered && (
            <p className="text-xs text-gray-600">Enable Tax Registered to edit this field.</p>
          )}
        </div>

        {/* Price Mode */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">{tSettings("settings.tax.priceMode", locale)}</label>
          <div className={["flex gap-2", !registered ? "pointer-events-none opacity-40" : ""].join(" ")}>
            {(["exclusive", "inclusive"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                disabled={!registered}
                onClick={() => setPriceMode(mode)}
                className={[
                  "rounded-xl border px-4 py-2 text-sm font-medium transition",
                  priceMode === mode
                    ? "border-white/30 bg-white/10 text-white"
                    : "border-white/10 bg-white/[0.02] text-gray-400 hover:bg-white/5 hover:text-white",
                ].join(" ")}
              >
                {mode === "exclusive" ? tSettings("settings.tax.exclusive", locale) : tSettings("settings.tax.inclusive", locale)}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-600">
            {priceMode === "exclusive"
              ? "Prices entered without tax — tax is added at checkout."
              : "Prices already include tax — tax is extracted at checkout."}
          </p>
        </div>

        {/* Discount note */}
        <div className="flex items-start gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
          <Icon name="alert-triangle" className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
          <p className="text-xs text-gray-400">
            {tSettings("settings.tax.discountNote", locale)}
          </p>
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
