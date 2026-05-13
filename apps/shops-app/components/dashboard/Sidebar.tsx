"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";

const operations: { label: string; href: string; icon: IconName }[] = [
  { label: "Dashboard", href: "/dashboard",  icon: "dashboard"  },
  { label: "Products",  href: "/products",   icon: "package"    },
  { label: "Orders",    href: "/orders",     icon: "receipt"    },
  { label: "Customers", href: "/customers",  icon: "users"      },
  { label: "Reports",   href: "/reports",    icon: "chart-bar"  },
];

const configure: { label: string; href: string; icon: IconName }[] = [
  { label: "Settings",  href: "/settings",   icon: "settings"   },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-3.5 z-40 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#0a0a0f]/80 backdrop-blur-sm md:hidden"
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
        className={`fixed left-0 top-0 z-50 flex h-full w-[260px] flex-col border-r border-white/5 bg-[#0a0a0f]/95 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header: back link + logo */}
        <div className="flex h-16 items-center gap-3 border-b border-white/5 px-5">
          <a
            href="#"
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            title="Back to platform"
          >
            <Icon name="chevron-left" className="h-4 w-4" />
          </a>
          <Logo />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:text-white md:hidden"
            aria-label="Close navigation"
          >
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto px-3 py-5">
          {/* Operations */}
          <p className="chip mb-2 px-3 text-gray-600">Operations</p>
          <nav className="mb-7 space-y-0.5">
            {operations.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`nav-item flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                    isActive
                      ? "nav-item-active"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon name={item.icon} className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Configure */}
          <p className="chip mb-2 px-3 text-gray-600">Configure</p>
          <nav className="space-y-0.5">
            {configure.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`nav-item flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                    isActive
                      ? "nav-item-active"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon name={item.icon} className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* POS card — visual only */}
        <div className="border-t border-white/5 p-3">
          <div className="flex items-center gap-3 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.07] p-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/15 text-cyan-300">
              <Icon name="scan-line" className="h-4 w-4" />
            </div>
            <div className="flex-1 leading-tight">
              <div className="text-xs font-semibold text-white">Open POS</div>
              <div className="font-mono text-[10px] text-gray-500">F8 · visual only</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
