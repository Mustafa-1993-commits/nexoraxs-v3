"use client";

import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

const titles: Record<string, string> = {
  "/dashboard":          "Dashboard",
  "/dashboard/apps":     "App Launcher",
  "/dashboard/billing":  "Plan & billing",
  "/dashboard/settings": "Settings",
};

export function Topbar() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-white/5 bg-[#0a0a0f]/85 backdrop-blur-xl">
      <div className="flex h-full items-center gap-4 pl-16 pr-4 md:px-6 lg:px-8">
        {/* Workspace switcher */}
        <button className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 transition-colors hover:bg-white/10">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-bold text-white"
            style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)" }}
          >
            M
          </div>
          <div className="text-left leading-tight">
            <div className="font-mono text-[11px] text-white/40">Workspace</div>
            <div className="text-xs font-medium text-white">Mustafa&apos;s Co.</div>
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
            MA
          </div>
          <div className="hidden text-left leading-tight sm:block">
            <div className="text-xs font-medium text-white">Mustafa A.</div>
            <div className="font-mono text-[10px] text-white/40">Owner</div>
          </div>
          <Icon name="chevron-down" className="h-3.5 w-3.5 text-white/40" />
        </button>
      </div>
    </header>
  );
}
