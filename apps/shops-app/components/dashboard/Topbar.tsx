"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/ui/Icon";
import { getBranch, getStoreName } from "@/lib/mode";

const FALLBACK_STORE = "Mustafa's Co.";

export function Topbar() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const storeName = mounted ? getStoreName() ?? FALLBACK_STORE : FALLBACK_STORE;
  const branch = mounted ? getBranch() ?? "Maadi Main" : "Maadi Main";

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-white/5 bg-[#0a0a0f]/85 backdrop-blur-xl">
      <div className="flex h-full items-center gap-3 pl-16 pr-4 md:pl-6 lg:px-8">

        {/* Store selector */}
        <button
          type="button"
          className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 transition-colors hover:bg-white/10"
        >
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-blue-500 text-[11px] font-bold text-white">
            {storeName[0]?.toUpperCase() ?? "S"}
          </div>
          <div className="text-left leading-tight">
            <div className="font-mono text-[11px] text-gray-500">Store</div>
            <div className="max-w-[8rem] truncate text-xs font-medium text-white">{storeName}</div>
          </div>
          <Icon name="chevrons-up-down" className="ml-1 h-3.5 w-3.5 text-gray-500" />
        </button>

        {/* Branch selector — hidden on mobile */}
        <button
          type="button"
          className="hidden items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 transition-colors hover:bg-white/10 sm:flex"
        >
          <Icon name="map-pin" className="h-3.5 w-3.5 text-gray-400" />
          <div className="text-left leading-tight">
            <div className="font-mono text-[11px] text-gray-500">Branch</div>
            <div className="text-xs font-medium text-white">{branch}</div>
          </div>
          <Icon name="chevrons-up-down" className="ml-1 h-3.5 w-3.5 text-gray-500" />
        </button>

        <div className="flex-1" />

        {/* Search — desktop only */}
        <div className="hidden w-64 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 md:flex">
          <Icon name="search" className="h-4 w-4 flex-shrink-0 text-gray-500" />
          <input
            className="flex-1 bg-transparent text-sm text-gray-300 outline-none placeholder:text-gray-600"
            placeholder="Search products, orders…"
            disabled
            aria-label="Search (preview only)"
          />
          <span className="chip rounded border border-white/10 px-1 text-gray-500">⌘K</span>
        </div>

        {/* Open POS — visual only */}
        <button
          type="button"
          className="btn-pos inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold text-white"
        >
          <Icon name="scan-line" className="h-4 w-4" strokeWidth={2.2} />
          <span className="hidden sm:inline">Open POS</span>
        </button>

        {/* Bell */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Icon name="bell" className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
        </button>

        {/* User avatar */}
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-1 pl-1 pr-2 transition-colors hover:bg-white/10"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-blue-500 text-xs font-semibold text-white">
            MA
          </div>
          <Icon name="chevron-down" className="h-3.5 w-3.5 text-gray-500" />
        </button>
      </div>
    </header>
  );
}
