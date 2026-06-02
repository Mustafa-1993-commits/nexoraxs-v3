"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@nexoraxs/ui";
import { getMockUserName } from "@/lib/session";
import { LanguageSwitcher } from "@/components/dashboard/LanguageSwitcher";

const subscribeToNothing = () => () => {};

function getInitials(name: string): string {
  return (
    name.trim().split(/\s+/).filter(Boolean)
      .slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("")
    || "WO"
  );
}

const titles: Record<string, string> = {
  "/dashboard":          "Dashboard",
  "/dashboard/apps":     "Product Hub",
  "/dashboard/billing":  "Plan & billing",
  "/dashboard/settings": "Settings",
};

export function Topbar() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Dashboard";
  const userName = useSyncExternalStore(
    subscribeToNothing,
    () => getMockUserName() ?? "Workspace owner",
    () => "Workspace owner",
  );

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-white/5 bg-[#0a0a0f]/85 backdrop-blur-xl">
      <div className="flex h-full items-center gap-2 pl-20 pr-3 sm:gap-4 md:px-6 lg:px-8">
        {/* Workspace switcher */}
        <button className="flex max-w-[8.5rem] items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 transition-colors hover:bg-white/10 sm:max-w-none">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-bold text-white"
            style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)" }}
          >
            M
          </div>
          <div className="min-w-0 text-left leading-tight">
            <div className="font-mono text-[11px] text-white/40">Workspace</div>
            <div className="truncate text-xs font-medium text-white">
              Mustafa&apos;s Co.
            </div>
          </div>
          <Icon name="chevron-down" className="ml-1 h-3.5 w-3.5 text-white/40" />
        </button>

        <span className="hidden text-white/20 sm:block">/</span>
        <span className="hidden text-sm font-medium text-white/80 sm:block">
          {title}
        </span>

        <div className="flex-1" />

        {/* Search */}
        <div className="hidden w-56 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 md:flex">
          <Icon name="search" className="h-4 w-4 flex-shrink-0 text-white/30" />
          <input
            className="flex-1 bg-transparent text-sm text-white/80 outline-none placeholder:text-white/30"
            placeholder="Search…"
          />
        </div>

        {/* Language switcher */}
        <LanguageSwitcher />

        {/* Bell */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white">
          <Icon name="bell" className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-blue-400" />
        </button>

        {/* User */}
        <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 py-1 pl-1 pr-2 transition-colors hover:bg-white/10">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#8b5cf6,#3b82f6)" }}
          >
            {getInitials(userName)}
          </div>
          <div className="hidden text-left leading-tight sm:block">
            <div className="text-xs font-medium text-white">{userName}</div>
            <div className="font-mono text-[10px] text-white/40">Owner</div>
          </div>
          <Icon name="chevron-down" className="h-3.5 w-3.5 text-white/40" />
        </button>
      </div>
    </header>
  );
}
