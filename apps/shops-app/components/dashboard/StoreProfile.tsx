"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@nexoraxs/ui";
import { getBranch, getCurrency, getMode, getStoreName, type ShopsMode } from "@/lib/mode";

const modeLabel: Record<ShopsMode, string> = {
  physical: "Physical Store",
  online: "Online Store",
  both: "Both",
};

export function StoreProfile() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const storeName = mounted ? getStoreName() ?? "Mustafa's Co." : null;
  const mode = mounted ? getMode() : null;
  const branch = mounted ? getBranch() ?? "Maadi Main" : null;
  const currency = mounted ? getCurrency() ?? "EGP" : null;

  if (!mounted) {
    return (
      <div className="card p-5">
        <p className="chip mb-1 text-gray-500">{"// store profile"}</p>
        <div className="h-4 w-36 rounded bg-white/5" />
        <div className="mt-4 space-y-2">
          <div className="h-8 rounded-xl bg-white/[0.02]" />
          <div className="h-8 rounded-xl bg-white/[0.02]" />
          <div className="h-8 rounded-xl bg-white/[0.02]" />
        </div>
      </div>
    );
  }

  return (
    <div className="card p-5">
      <p className="chip mb-1 text-gray-500">{"// store profile"}</p>
      <h3 className="text-base font-semibold text-white">{storeName ?? "Mustafa's Co."}</h3>
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2.5 text-sm text-white/60">
          <Icon name="map-pin" className="h-3.5 w-3.5 flex-shrink-0 text-gray-500" />
          {branch ?? "Maadi Main"}
        </div>
        <div className="flex items-center gap-2.5 text-sm text-white/60">
          <Icon name="banknote" className="h-3.5 w-3.5 flex-shrink-0 text-gray-500" />
          {currency ?? "EGP"}
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
