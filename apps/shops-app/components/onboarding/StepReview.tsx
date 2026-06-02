"use client";

import { Icon } from "@nexoraxs/ui";
import type { BusinessType, ShopsMode } from "@/lib/mode";
import type { StoreSetupFormData } from "@/lib/onboarding-types";
import { MODULE_DEFINITIONS } from "@/lib/onboarding-types";

const BUSINESS_TYPE_LABEL: Record<BusinessType, string> = {
  mobile:          "Mobile Store",
  electronics:     "Electronics",
  clothing:        "Clothing & Fashion",
  "food-beverage": "Food & Beverage",
  "books-media":   "Books & Media",
  "home-furniture":"Home & Furniture",
  cosmetics:       "Cosmetics & Beauty",
  supermarket:     "Supermarket",
  pharmacy:        "Pharmacy",
  restaurant:      "Restaurant / Cafe",
  other:           "Other",
  accessories:     "Accessories Store",
};

const SALES_MODEL_LABEL: Record<ShopsMode, string> = {
  physical: "Physical store only",
  online:   "Online store only",
  both:     "Both physical + online",
};

interface StepReviewProps {
  businessType: BusinessType | null;
  customBusinessType: string;
  salesModel: ShopsMode | null;
  setup: StoreSetupFormData;
  productsCount: number;
}

export function StepReview({
  businessType,
  customBusinessType,
  salesModel,
  setup,
  productsCount,
}: StepReviewProps) {
  const businessLabel =
    businessType === "other" && customBusinessType.trim()
      ? customBusinessType.trim()
      : businessType
        ? BUSINESS_TYPE_LABEL[businessType]
        : "—";

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <p className="chip text-gray-500">{"// review & launch"}</p>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Your store is ready to launch
        </h2>
        <p className="text-sm text-gray-400">
          Review everything below. You can change all settings anytime from Settings.
        </p>
      </div>

      {/* Two-column summary */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Left: workspace, business type, sales model */}
        <div className="card space-y-4 p-6">
          <p className="chip text-gray-500">{"// workspace & business"}</p>
          <div className="space-y-3">
            <SummaryRow label="Workspace" value="Mustafa's Co." readOnly />
            <SummaryRow label="Business Type" value={businessLabel} />
            <SummaryRow
              label="Sales Model"
              value={salesModel ? SALES_MODEL_LABEL[salesModel] : "—"}
            />
          </div>
        </div>

        {/* Right: store details */}
        <div className="card space-y-4 p-6">
          <p className="chip text-gray-500">{"// store details"}</p>
          <div className="space-y-3">
            <SummaryRow label="Store Name" value={setup.storeName || "—"} />
            <SummaryRow label="Branch" value={setup.branch || "—"} />
            <SummaryRow label="Country" value={setup.branchCountry || "—"} />
            <SummaryRow label="Currency" value={setup.branchCurrency || "—"} />
            <SummaryRow label="Timezone" value={setup.branchTimezone || "—"} mono />
            <SummaryRow
              label="Products"
              value={productsCount > 0 ? `${productsCount} product${productsCount === 1 ? "" : "s"} added` : "No products added yet"}
            />
          </div>
        </div>
      </div>

      {/* Modules grid */}
      <div className="space-y-4">
        <div>
          <p className="chip mb-1 text-gray-500">{"// enabled modules"}</p>
          <h3 className="text-base font-semibold text-white">Module availability</h3>
          <p className="mt-1 text-xs text-white/40">
            You can change modules anytime from Settings → Modules
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MODULE_DEFINITIONS.map((mod) => {
            const enabled = salesModel !== null && (mod.enabledFor as readonly ShopsMode[]).includes(salesModel);
            return (
              <div
                key={mod.id}
                className={`flex flex-col gap-3 rounded-2xl border p-4 ${
                  enabled
                    ? "border-emerald-500/20 bg-emerald-500/[0.05]"
                    : "border-white/5 bg-white/[0.02] opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                      enabled
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : "border-white/10 bg-white/5 text-white/30"
                    }`}
                  >
                    <Icon name={mod.icon} className="h-4 w-4" />
                  </span>
                  {enabled ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-emerald-400">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white/20">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div>
                  <div className={`text-sm font-medium ${enabled ? "text-white" : "text-white/40"}`}>
                    {mod.label}
                  </div>
                  {!enabled && mod.disabledReason && (
                    <div className="mt-0.5 text-[11px] text-white/30">{mod.disabledReason}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SummaryRow({
  label,
  value,
  readOnly,
  mono,
}: {
  label: string;
  value: string;
  readOnly?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="flex-shrink-0 text-white/40">{label}</span>
      <span className={`text-right ${readOnly ? "text-white/50" : "font-medium text-white"} ${mono ? "font-mono text-xs" : ""}`}>
        {value}
        {readOnly && <span className="ml-1.5 text-xs text-white/25">(read-only)</span>}
      </span>
    </div>
  );
}
