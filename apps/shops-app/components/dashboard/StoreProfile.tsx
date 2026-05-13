"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { getMode, type ShopsMode } from "@/lib/mode";

const modeLabel: Record<ShopsMode, string> = {
  business: "Business Management",
  store: "Storefront",
  both: "Both",
};

export function StoreProfile() {
  const [mode] = useState<ShopsMode | null>(
    () => typeof window === "undefined" ? null : getMode()
  );

  return (
    <div className="card p-5">
      <p className="chip mb-1 text-gray-500">{"// store profile"}</p>
      <h3 className="text-base font-semibold text-white">Mustafa&apos;s Co.</h3>
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2.5 text-sm text-white/60">
          <Icon name="map-pin" className="h-3.5 w-3.5 flex-shrink-0 text-gray-500" />
          Maadi Main
        </div>
        <div className="flex items-center gap-2.5 text-sm text-white/60">
          <Icon name="banknote" className="h-3.5 w-3.5 flex-shrink-0 text-gray-500" />
          EGP
        </div>
        <div className="flex items-center gap-2.5 text-sm text-white/60">
          <Icon name="dashboard" className="h-3.5 w-3.5 flex-shrink-0 text-gray-500" />
          {mode ? modeLabel[mode] : "—"}
        </div>
      </div>
      <div className="mt-4">
        <span className="chip rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-blue-300">
          Foundation setup
        </span>
      </div>
    </div>
  );
}
