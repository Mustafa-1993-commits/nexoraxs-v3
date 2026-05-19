"use client";

import { Badge, Icon } from "@nexoraxs/ui";
import type { BusinessType, ShopsMode } from "@/lib/mode";

interface BusinessTypeOption {
  id: BusinessType;
  emoji: string;
  label: string;
}

const BUSINESS_TYPES: BusinessTypeOption[] = [
  { id: "mobile",        emoji: "📱", label: "Mobile Store"       },
  { id: "electronics",   emoji: "💻", label: "Electronics"        },
  { id: "clothing",      emoji: "👕", label: "Clothing & Fashion"  },
  { id: "food-beverage", emoji: "🍕", label: "Food & Beverage"    },
  { id: "books-media",   emoji: "📚", label: "Books & Media"      },
  { id: "home-furniture",emoji: "🏠", label: "Home & Furniture"   },
  { id: "cosmetics",     emoji: "💄", label: "Cosmetics & Beauty" },
  { id: "supermarket",   emoji: "🛒", label: "Supermarket"        },
  { id: "other",         emoji: "🔧", label: "Other"              },
];

const PHYSICAL_MODULES = [
  { label: "POS",       color: "info"    },
  { label: "Inventory", color: "default" },
  { label: "Branches",  color: "purple"  },
  { label: "Reports",   color: "default" },
] as const;

const ONLINE_MODULES = [
  { label: "Storefront", color: "info"    },
  { label: "Orders",     color: "success" },
  { label: "Checkout",   color: "success" },
  { label: "Reports",    color: "default" },
] as const;

const BOTH_MODULES = [
  { label: "POS",        color: "info"    },
  { label: "Storefront", color: "info"    },
  { label: "Inventory",  color: "default" },
  { label: "Orders",     color: "success" },
  { label: "Reports",    color: "default" },
] as const;

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "purple";

function getModules(salesModel: ShopsMode | null): readonly { label: string; color: BadgeVariant }[] {
  if (salesModel === "physical") return PHYSICAL_MODULES;
  if (salesModel === "online")   return ONLINE_MODULES;
  if (salesModel === "both")     return BOTH_MODULES;
  return [];
}

export interface StepBusinessAndSalesProps {
  businessType: BusinessType | null;
  customBusinessType: string;
  salesModel: ShopsMode | null;
  onBusinessTypeChange: (t: BusinessType) => void;
  onCustomBusinessTypeChange: (s: string) => void;
  onSalesModelChange: (m: ShopsMode) => void;
}

export function StepBusinessAndSales({
  businessType,
  customBusinessType,
  salesModel,
  onBusinessTypeChange,
  onCustomBusinessTypeChange,
  onSalesModelChange,
}: StepBusinessAndSalesProps) {
  const modules = getModules(salesModel);

  return (
    <section className="space-y-10">

      {/* Section 1 — Business Type */}
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="chip text-gray-500">{"// what do you sell?"}</p>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            What type of business is this?
          </h2>
          <p className="text-sm text-gray-400">
            We&apos;ll tailor your workspace to fit your business.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
          {BUSINESS_TYPES.map((opt) => {
            const isSelected = businessType === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onBusinessTypeChange(opt.id)}
                aria-pressed={isSelected}
                className={`group flex flex-col items-center gap-2.5 rounded-2xl border p-4 text-center transition-all ${
                  isSelected
                    ? "border-blue-500/50 bg-blue-500/[0.06] ring-1 ring-blue-500/30"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <span className="text-2xl leading-none" aria-hidden="true">
                  {opt.emoji}
                </span>
                <span className={`text-xs font-medium leading-tight ${isSelected ? "text-white" : "text-white/70"}`}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

        {businessType === "other" && (
          <div className="max-w-sm space-y-2">
            <label htmlFor="custom-business-type" className="text-sm font-medium text-white">
              Describe your business
            </label>
            <input
              id="custom-business-type"
              type="text"
              value={customBusinessType}
              onChange={(e) => onCustomBusinessTypeChange(e.target.value)}
              maxLength={60}
              placeholder="e.g. Flower Shop, Pet Store…"
              className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Section 2 — Sales Model */}
      <div className="space-y-5">
        <div className="space-y-2">
          <p className="chip text-gray-500">{"// how do you sell?"}</p>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Choose your sales model
          </h2>
          <p className="text-sm text-gray-400">
            This shapes which modules are turned on for your workspace.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {/* Physical */}
          <button
            type="button"
            onClick={() => onSalesModelChange("physical")}
            aria-pressed={salesModel === "physical"}
            className={`relative w-full rounded-2xl border p-5 text-left transition-all ${
              salesModel === "physical"
                ? "border-emerald-500/40 bg-emerald-500/[0.06] ring-1 ring-emerald-500/20"
                : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <Icon name="building" className="h-5 w-5" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-white">Physical store only</span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
                    IN-STORE
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/50">
                  POS · Inventory · Branches · Walk-in
                </p>
              </div>
            </div>
          </button>

          {/* Online */}
          <button
            type="button"
            onClick={() => onSalesModelChange("online")}
            aria-pressed={salesModel === "online"}
            className={`relative w-full rounded-2xl border p-5 text-left transition-all ${
              salesModel === "online"
                ? "border-blue-500/40 bg-blue-500/[0.06] ring-1 ring-blue-500/20"
                : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                <Icon name="globe" className="h-5 w-5" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-white">Online store only</span>
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-blue-300">
                    E-COMMERCE
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/50">
                  Storefront · Cart · Checkout · Shipping
                </p>
              </div>
            </div>
          </button>

          {/* Both (default / recommended) */}
          <button
            type="button"
            onClick={() => onSalesModelChange("both")}
            aria-pressed={salesModel === "both"}
            className={`relative w-full rounded-2xl border p-5 text-left transition-all ${
              salesModel === "both"
                ? "border-purple-500/50 bg-purple-500/[0.08] shadow-[0_0_24px_rgba(168,85,247,0.15)] ring-1 ring-purple-500/30"
                : "border-white/10 bg-white/[0.02] hover:border-purple-500/30 hover:bg-purple-500/[0.04]"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
                <Icon name="zap" className="h-5 w-5" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-white">Both physical + online</span>
                  <span className="rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-purple-300">
                    RECOMMENDED
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/50">
                  Everything above + Unified inventory
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Section 3 — Module Preview */}
      {salesModel !== null && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <p className="mb-3 text-xs font-medium text-white/50">
            Based on your choices, we&apos;ll enable:
          </p>
          <div className="flex flex-wrap gap-2">
            {modules.map((m) => (
              <Badge key={m.label} variant={m.color as BadgeVariant}>
                {m.label}
              </Badge>
            ))}
            {salesModel === "both" && (
              <Badge variant="default">+3 more</Badge>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
