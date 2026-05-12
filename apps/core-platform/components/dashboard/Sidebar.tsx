"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navItems } from "@/lib/mock-data/nav-items";
import { Icon } from "@/components/ui/Icon";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
        aria-label="Open navigation"
      >
        <Icon name="menu" className="h-5 w-5 text-white" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-white/10 bg-[#0d0d14] transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-6 py-5">
          <span className="text-lg font-bold tracking-tight text-white">
            NexoraXS
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:text-white md:hidden"
            aria-label="Close navigation"
          >
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1 px-3 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "border-l-2 border-blue-500 bg-blue-600/10 pl-[10px] text-blue-400"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <Icon name={item.icon} className="h-5 w-5 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-xs font-bold text-blue-400">
              MM
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                Mustafa Mohamed
              </p>
              <p className="text-xs text-white/40">Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
