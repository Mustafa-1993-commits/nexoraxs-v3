"use client";

import { Badge, Icon } from "@nexoraxs/ui";
import { type BusinessType, type ShopsMode } from "@/lib/mode";

export interface StoreSetupData {
  storeName: string;
  branch: string;
  branchCountry: string;
  branchCurrency: string;
}

interface StepStoreSetupProps {
  data: StoreSetupData;
  onChange: (data: StoreSetupData) => void;
  businessType: BusinessType | null;
  salesModel: ShopsMode | null;
  onGoToStep: (step: 1 | 2 | 3 | 4) => void;
}

const BRANCH_COUNTRY_CURRENCY_MAP: Record<string, string> = {
  "Egypt":                "EGP",
  "Saudi Arabia":         "SAR",
  "United Arab Emirates": "AED",
  "Kuwait":               "KWD",
  "Qatar":                "QAR",
};

const countryOptions = ["Egypt", "Saudi Arabia", "United Arab Emirates", "Kuwait", "Qatar"] as const;
const currencyOptions = ["EGP", "SAR", "AED", "KWD", "QAR", "USD", "EUR"] as const;

const businessTypeLabel: Record<BusinessType, string> = {
  mobile: "Mobile Store",
  accessories: "Accessories Store",
  clothing: "Clothing Store",
  supermarket: "Supermarket",
  electronics: "Electronics Store",
  cosmetics: "Cosmetics Store",
  other: "Other Retail",
};

const salesModelLabel: Record<ShopsMode, string> = {
  physical: "Physical only",
  online: "Online only",
  both: "Physical + Online",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "S";
}

export function StepStoreSetup({
  data,
  onChange,
  businessType,
  salesModel,
  onGoToStep,
}: StepStoreSetupProps) {
  const handleCountryChange = (newCountry: string) => {
    onChange({
      ...data,
      branchCountry: newCountry,
      branchCurrency: BRANCH_COUNTRY_CURRENCY_MAP[newCountry] ?? "EGP",
    });
  };

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      <div className="space-y-5 lg:col-span-3">
        <div className="space-y-2">
          <p className="chip text-gray-500">{"// store setup"}</p>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Set up your shop
          </h2>
          <p className="max-w-2xl text-sm text-gray-400">
            Confirm your workspace context and enter the store details the rest of the app will use.
          </p>
        </div>

        <div className="card space-y-6 p-6">
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/60">
                <Icon name="dashboard" className="h-4 w-4" />
              </span>
              <div>
                <div className="text-sm font-medium text-white">Workspace: Mustafa&apos;s Co.</div>
                <div className="text-xs text-white/40">(Read-only)</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5">
              <span className="text-[10px] uppercase tracking-wider text-white/30">
                Business
              </span>
              <span className="text-xs text-white">
                {businessType ? businessTypeLabel[businessType] : "Unselected"}
              </span>
              <button
                type="button"
                onClick={() => onGoToStep(1)}
                className="text-xs text-blue-400 transition-colors hover:text-blue-300"
              >
                Edit
              </button>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5">
              <span className="text-[10px] uppercase tracking-wider text-white/30">
                Sales
              </span>
              <span className="text-xs text-white">
                {salesModel ? salesModelLabel[salesModel] : "Unselected"}
              </span>
              <button
                type="button"
                onClick={() => onGoToStep(2)}
                className="text-xs text-blue-400 transition-colors hover:text-blue-300"
              >
                Edit
              </button>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="space-y-2">
              <label htmlFor="store-name" className="text-sm font-medium text-white">
                Store Display Name
              </label>
              <input
                id="store-name"
                type="text"
                value={data.storeName}
                onChange={(event) =>
                  onChange({ ...data, storeName: event.target.value })
                }
                maxLength={60}
                placeholder="Mustafa's Co."
                className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="branch-name" className="text-sm font-medium text-white">
                Main Branch
              </label>
              <input
                id="branch-name"
                type="text"
                value={data.branch}
                onChange={(event) => onChange({ ...data, branch: event.target.value })}
                maxLength={60}
                placeholder="Maadi Main"
                className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-white">Branch country</span>
                <select
                  value={data.branchCountry}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-sm text-white outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                >
                  {countryOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-white">Branch currency</span>
                <select
                  value={data.branchCurrency}
                  onChange={(e) => onChange({ ...data, branchCurrency: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-sm text-white outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                >
                  {currencyOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
            </div>

            <p className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-white/50">
              Branch country and currency apply to your first branch. You can add more branches from{" "}
              <span className="text-white/70">Shops Settings → Branches</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="sticky top-8 card p-6">
          <p className="chip mb-3 text-gray-500">{"// live preview"}</p>
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-base font-semibold text-white">
              {getInitials(data.storeName)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xl font-semibold text-white">
                {data.storeName.trim() || "Mustafa's Co."}
              </div>
              <div className="mt-1 text-sm text-white/50">
                {data.branch.trim() || "Maadi Main"}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-wider text-white/40">Branch currency</span>
              <Badge variant="info">{data.branchCurrency}</Badge>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-wider text-white/40">Branch country</span>
              <span className="text-sm text-white">{data.branchCountry}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-wider text-white/40">Workspace</span>
              <span className="text-sm text-white">Mustafa&apos;s Co.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
