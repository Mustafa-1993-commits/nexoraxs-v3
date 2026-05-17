"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { getBranch, getStoreName } from "@/lib/mode";

const FALLBACK_STORE = "My Store";
const FALLBACK_BRANCH = "Main Branch";

export function POSHeader() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const storeName = mounted ? (getStoreName() ?? FALLBACK_STORE) : FALLBACK_STORE;
  const branchName = mounted ? (getBranch() ?? FALLBACK_BRANCH) : FALLBACK_BRANCH;

  return (
    <header className="flex h-12 shrink-0 items-center gap-4 border-b border-white/5 bg-[#0a0a0f]/90 px-4 backdrop-blur-xl">
      <Logo size="sm" />

      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium text-white">{storeName}</span>
        <span className="text-gray-600">·</span>
        <span className="flex items-center gap-1 text-gray-400">
          <Icon name="map-pin" className="h-3 w-3" />
          {branchName}
        </span>
      </div>

      <div className="flex-1" />

      <Link
        href="/dashboard"
        className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
      >
        <Icon name="x" className="h-3.5 w-3.5" />
        Close
      </Link>
    </header>
  );
}
