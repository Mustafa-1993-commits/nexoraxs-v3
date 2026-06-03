"use client";

import { useState, useSyncExternalStore } from "react";
import { Icon } from "@nexoraxs/ui";
import {
  getTemplatePreference,
  setTemplatePreference,
  subscribeToTemplatePreference,
  getIdentity,
  subscribeToIdentity,
  getTaxSettings,
  subscribeToTaxSettings,
  getInvoiceNumbering,
  subscribeToInvoiceNumbering,
  DEFAULT_TAX,
  DEFAULT_INVOICING,
  DEFAULT_TEMPLATE_STYLES,
  formatDocNumber,
  type TemplateType,
  type TemplateStyle,
} from "@/lib/settings-store";
import { getLocale, subscribeToLocale, tSettings } from "@/lib/locale";
import { DocumentPreview } from "@/components/settings/DocumentPreview";

// ── Template metadata ───────────────────────────────────────────────────────

interface TemplateOption {
  type: TemplateType;
  label: string;
  description: string;
}

const TEMPLATE_OPTIONS: TemplateOption[] = [
  { type: "receipt-80",  label: "POS Receipt 80mm",  description: "Standard thermal receipt" },
  { type: "receipt-58",  label: "POS Receipt 58mm",  description: "Compact thermal receipt"  },
  { type: "invoice-a4",  label: "A4 Tax Invoice",    description: "Full tax invoice layout"  },
  { type: "refund",      label: "Refund Receipt",    description: "Refund / void document"   },
];

const STYLE_OPTIONS: { style: TemplateStyle; label: string; description: string }[] = [
  { style: "minimal",  label: "Minimal",  description: "Clean, item list + total"           },
  { style: "classic",  label: "Classic",  description: "Dividers, subtotal, tax, total"     },
  { style: "detailed", label: "Detailed", description: "Full identity block, column table"  },
];

// ── Hooks ───────────────────────────────────────────────────────────────────

function useIdentityData() {
  return useSyncExternalStore(subscribeToIdentity, getIdentity, () => null);
}

function useTaxData() {
  return useSyncExternalStore(subscribeToTaxSettings, getTaxSettings, () => null);
}

function useInvoicingData() {
  return useSyncExternalStore(subscribeToInvoiceNumbering, getInvoiceNumbering, () => null);
}

function useTemplateStyle(type: TemplateType): TemplateStyle {
  const pref = useSyncExternalStore(subscribeToTemplatePreference, () => getTemplatePreference(type), () => null);
  return pref?.style ?? DEFAULT_TEMPLATE_STYLES[type];
}

// ── Main component ──────────────────────────────────────────────────────────

export function DocumentTemplatesPanel() {
  const [selectedType, setSelectedType] = useState<TemplateType>("receipt-80");
  const [savedOk, setSavedOk] = useState(false);

  const identity = useIdentityData();
  const tax = useTaxData() ?? DEFAULT_TAX;
  const invoicing = useInvoicingData() ?? DEFAULT_INVOICING;
  const currentStyle = useTemplateStyle(selectedType);
  const locale = useSyncExternalStore(subscribeToLocale, getLocale, () => "en" as const);

  function handleStyleChange(style: TemplateStyle) {
    setTemplatePreference(selectedType, { type: selectedType, style });
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2000);
  }

  const previewData = {
    business: identity,
    taxRegistered: tax.registered,
    taxRate: tax.taxRate,
    invoiceNumber: formatDocNumber(
      selectedType === "invoice-a4" ? invoicing.invoicePrefix : invoicing.receiptPrefix,
      invoicing.startingNumber,
    ),
    date: new Date().toLocaleDateString("en-GB"),
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Left: selector panel */}
        <div className="space-y-4">
          {/* Template type */}
          <section className="card p-4 space-y-3">
            <div>
              <p className="chip mb-1 text-gray-500">{"// template type"}</p>
              <h2 className="text-sm font-semibold text-white">Template</h2>
            </div>
            <div className="space-y-1.5">
              {TEMPLATE_OPTIONS.map((opt) => (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => setSelectedType(opt.type)}
                  className={[
                    "w-full rounded-xl border px-3 py-2.5 text-start transition",
                    selectedType === opt.type
                      ? "border-white/30 bg-white/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/5",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2">
                    <Icon name="file-text" className="h-4 w-4 flex-shrink-0 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-white">{opt.label}</div>
                      <div className="text-xs text-gray-500">{opt.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Style selector */}
          <section className="card p-4 space-y-3">
            <div>
              <p className="chip mb-1 text-gray-500">{"// style"}</p>
              <h2 className="text-sm font-semibold text-white">Visual Style</h2>
            </div>
            <div className="space-y-1.5">
              {STYLE_OPTIONS.map((opt) => (
                <button
                  key={opt.style}
                  type="button"
                  onClick={() => handleStyleChange(opt.style)}
                  className={[
                    "w-full rounded-xl border px-3 py-2.5 text-start transition",
                    currentStyle === opt.style
                      ? "border-white/30 bg-white/10"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/5",
                  ].join(" ")}
                >
                  <div className="text-sm font-medium text-white">
                    {tSettings(`settings.templates.style.${opt.style}`, locale)}
                  </div>
                  <div className="text-xs text-gray-500">{opt.description}</div>
                </button>
              ))}
            </div>

            {savedOk && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                <Icon name="check-circle" className="h-3.5 w-3.5" />
                {tSettings("settings.common.saved", locale)}
              </span>
            )}
          </section>
        </div>

        {/* Right: preview */}
        <section className="card overflow-auto p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="chip text-gray-500">{"// live preview"}</p>
            <span className="text-xs text-gray-600">
              {TEMPLATE_OPTIONS.find((o) => o.type === selectedType)?.label} ·{" "}
              {currentStyle.charAt(0).toUpperCase() + currentStyle.slice(1)}
            </span>
          </div>
          <div className="flex justify-center">
            <DocumentPreview
              templateType={selectedType}
              style={currentStyle}
              previewData={previewData}
              locale={locale}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
