"use client";

import { useState } from "react";
import {
  setBranchName, setBranchCity, setBranchCountry,
  getBranchName, getBranchCity, getBranchCountry,
  getWorkspaceCountry, completeOnboarding,
} from "@/lib/core-session";

interface Errors { name?: string; city?: string; country?: string; }

export function StepBranch({ onFinish, onBack }: { onFinish: () => void; onBack: () => void }) {
  const defaultCountry = getWorkspaceCountry() ?? "";
  const [name,    setName]    = useState(getBranchName()    ?? "");
  const [city,    setCity]    = useState(getBranchCity()    ?? "");
  const [country, setCountry] = useState(getBranchCountry() ?? defaultCountry);
  const [errors,  setErrors]  = useState<Errors>({});

  function validate(): boolean {
    const e: Errors = {};
    if (!name.trim())    e.name    = "Branch name is required";
    if (!city.trim())    e.city    = "City is required";
    if (!country.trim()) e.country = "Country is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleFinish() {
    if (!validate()) return;
    setBranchName(name.trim());
    setBranchCity(city.trim());
    setBranchCountry(country.trim());
    completeOnboarding();
    onFinish();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="chip mb-2 text-white/30">{"// step 4 of 4"}</p>
        <h2 className="text-2xl font-bold tracking-tight text-white">Create your main branch</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          Your main branch is your primary operating location.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-white/45">Branch name *</span>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Main Branch"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-blue-500/50"
          />
          {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-white/45">City *</span>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={country ? "Select a city..." : "Select country first"}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-blue-500/50"
            />
            {errors.city && <p className="mt-1 text-xs text-rose-400">{errors.city}</p>}
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-white/45">Country *</span>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Egypt"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-blue-500/50"
            />
            {errors.country && <p className="mt-1 text-xs text-rose-400">{errors.country}</p>}
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-w-[7rem] items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.05]"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleFinish}
          className="inline-flex min-w-[8rem] items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
        >
          Finish
        </button>
      </div>
    </div>
  );
}
