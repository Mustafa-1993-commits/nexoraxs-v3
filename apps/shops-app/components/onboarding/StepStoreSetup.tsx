"use client";

import { Badge, Icon } from "@nexoraxs/ui";
import { COUNTRY_DEFAULTS } from "@/lib/mode";
import type { StoreSetupFormData } from "@/lib/onboarding-types";

const COUNTRY_LIST = Object.keys(COUNTRY_DEFAULTS);
const CURRENCY_OPTIONS = ["EGP", "SAR", "AED", "KWD", "QAR", "JOD", "BHD", "OMR", "MAD", "USD", "GBP", "EUR"];
const TIMEZONE_OPTIONS = [
  "Africa/Cairo",
  "Africa/Casablanca",
  "America/New_York",
  "Asia/Amman",
  "Asia/Bahrain",
  "Asia/Dubai",
  "Asia/Kuwait",
  "Asia/Muscat",
  "Asia/Qatar",
  "Asia/Riyadh",
  "Europe/London",
  "UTC",
];

function getInitials(name: string): string {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "S"
  );
}

interface StepStoreSetupProps {
  data: StoreSetupFormData;
  onChange: (data: StoreSetupFormData) => void;
}

export function StepStoreSetup({ data, onChange }: StepStoreSetupProps) {
  const handleCountryChange = (newCountry: string): void => {
    const defaults = COUNTRY_DEFAULTS[newCountry] ?? { currency: "USD", timezone: "UTC" };
    onChange({
      ...data,
      branchCountry: newCountry,
      branchCurrency: defaults.currency,
      branchTimezone: defaults.timezone,
    });
  };

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      {/* Form */}
      <div className="space-y-5 lg:col-span-3">
        <div className="space-y-2">
          <p className="chip text-gray-500">{"// store setup"}</p>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Set up your store
          </h2>
          <p className="text-sm text-gray-400">
            Enter the details that will represent your store across the platform.
          </p>
        </div>

        <div className="card space-y-6 p-6">
          {/* Store Name */}
          <div className="space-y-2">
            <label htmlFor="store-name" className="text-sm font-medium text-white">
              Store Display Name <span className="text-red-400">*</span>
            </label>
            <input
              id="store-name"
              type="text"
              value={data.storeName}
              onChange={(e) => onChange({ ...data, storeName: e.target.value })}
              maxLength={60}
              placeholder="My Awesome Store"
              className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
            />
          </div>

          {/* Branch Name */}
          <div className="space-y-2">
            <label htmlFor="branch-name" className="text-sm font-medium text-white">
              Main Branch Name <span className="text-red-400">*</span>
            </label>
            <input
              id="branch-name"
              type="text"
              value={data.branch}
              onChange={(e) => onChange({ ...data, branch: e.target.value })}
              maxLength={60}
              placeholder="Downtown Branch"
              className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
            />
          </div>

          {/* Branch Address (optional) */}
          <div className="space-y-2">
            <label htmlFor="branch-address" className="text-sm font-medium text-white">
              Branch Address
              <span className="ml-1.5 text-xs text-white/40">(optional)</span>
            </label>
            <input
              id="branch-address"
              type="text"
              value={data.branchAddress}
              onChange={(e) => onChange({ ...data, branchAddress: e.target.value })}
              maxLength={120}
              placeholder="123 Main Street (optional)"
              className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
            />
          </div>

          {/* Country */}
          <div className="space-y-2">
            <label htmlFor="country" className="text-sm font-medium text-white">
              Country <span className="text-red-400">*</span>
            </label>
            <select
              id="country"
              value={data.branchCountry}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-sm text-white outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
            >
              {COUNTRY_LIST.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Currency + Timezone */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="currency" className="text-sm font-medium text-white">
                Currency
              </label>
              <select
                id="currency"
                value={data.branchCurrency}
                onChange={(e) => onChange({ ...data, branchCurrency: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-sm text-white outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
              >
                {CURRENCY_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="timezone" className="text-sm font-medium text-white">
                Timezone
              </label>
              <select
                id="timezone"
                value={data.branchTimezone}
                onChange={(e) => onChange({ ...data, branchTimezone: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#0a0a0f] px-4 py-3 text-sm text-white outline-none transition-all focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
              >
                {TIMEZONE_OPTIONS.map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="lg:col-span-2">
        <div className="sticky top-8 card p-6">
          <p className="chip mb-4 text-gray-500">{"// live preview"}</p>

          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-base font-semibold text-white">
              {getInitials(data.storeName)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xl font-semibold text-white">
                {data.storeName.trim() || "Your Store Name"}
              </div>
              <div className="mt-1 text-sm text-white/50">
                {data.branch.trim() || "Main Branch"}
              </div>
              {data.branchAddress.trim() && (
                <div className="mt-0.5 text-xs text-white/40">{data.branchAddress}</div>
              )}
            </div>
          </div>

          <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-wider text-white/40">Country</span>
              <span className="text-sm text-white">{data.branchCountry}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-wider text-white/40">Currency</span>
              <Badge variant="info">{data.branchCurrency}</Badge>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-wider text-white/40">Timezone</span>
              <span className="text-right font-mono text-xs text-white/70">{data.branchTimezone}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2">
            <Icon name="dashboard" className="h-4 w-4 flex-shrink-0 text-white/40" />
            <span className="text-xs text-white/40">Workspace:</span>
            <span className="text-xs text-white/60">Mustafa&apos;s Co.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
