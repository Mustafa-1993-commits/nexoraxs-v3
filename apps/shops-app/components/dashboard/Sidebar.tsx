"use client";

import { Badge, Icon, type IconName, Logo } from "@nexoraxs/ui";
import { useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getMode } from "@/lib/mode";

const CORE_PLATFORM_URL =
  process.env.NEXT_PUBLIC_CORE_PLATFORM_URL ?? "http://localhost:3001";

type NavItem = {
  label: string;
  href: string;
  icon: IconName;
  badge?: { label: string; variant: "default" | "warning" | "info" };
  disabled?: boolean;
};

const operations: NavItem[] = [
  { label: "Dashboard",  href: "/dashboard",  icon: "dashboard"      },
  { label: "Products",   href: "/products",   icon: "package",       badge: { label: "412", variant: "default" } },
  { label: "Inventory",  href: "/inventory",  icon: "boxes",         badge: { label: "7", variant: "warning" } },
  { label: "Customers",  href: "/customers",  icon: "users"          },
  { label: "Sales",      href: "#",           icon: "receipt",       disabled: true },
  { label: "POS",        href: "/pos",        icon: "scan-line",     badge: { label: "F8", variant: "info" } },
  { label: "Storefront", href: "#",           icon: "shopping-bag",  disabled: true },
  { label: "Reports",    href: "/reports",    icon: "chart-bar"      },
];

const configure: NavItem[] = [
  { label: "Discounts",  href: "#",           icon: "tag",           disabled: true },
  { label: "Taxes",      href: "/settings/tax", icon: "percent"        },
  { label: "Settings",   href: "/settings",   icon: "settings"       },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const mode = useSyncExternalStore(
    () => () => {},
    () => getMode(),
    () => null,
  );

  const visibleOperations = operations.filter((item) => {
    if (item.label === "POS"        && mode === "online")   return false;
    if (item.label === "Storefront" && mode === "physical") return false;
    return true;
  });

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
        {/* Header */}
        <div className="flex h-16 items-center gap-3 border-b border-white/5 px-5">
          <a
            href={`${CORE_PLATFORM_URL}/dashboard`}
            aria-label="Back to platform"
            className="flex flex-shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Icon name="chevron-left" className="h-4 w-4 flex-shrink-0" />
            <span className="text-xs">Back to Platform</span>
          </a>
          <Logo app="shops" />
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
          <p className="chip mb-2 px-3 text-gray-600">Operations</p>
          <nav className="mb-7 space-y-0.5">
            {visibleOperations.map((item) => {
              const isActive = item.href !== "#" && pathname === item.href;
              const commonClasses = `nav-item flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                isActive
                  ? "nav-item-active"
                  : item.disabled
                    ? "cursor-default text-gray-500"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`;
              const content = (
                <>
                  <Icon name={item.icon} className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant={item.badge.variant}>{item.badge.label}</Badge>
                  )}
                </>
              );
              if (item.href === "#") {
                return (
                  <a key={item.label} href="#" aria-disabled="true" onClick={(e) => { e.preventDefault(); setIsOpen(false); }} className={commonClasses}>
                    {content}
                  </a>
                );
              }
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={commonClasses}>
                  {content}
                </Link>
              );
            })}
          </nav>

          <p className="chip mb-2 px-3 text-gray-600">Configure</p>
          <nav className="space-y-0.5">
            {configure.map((item) => {
              const isActive = item.href !== "#" && pathname === item.href;
              const commonClasses = `nav-item flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                isActive
                  ? "nav-item-active"
                  : item.disabled
                    ? "cursor-default text-gray-500"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`;
              const content = (
                <>
                  <Icon name={item.icon} className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
                  <span>{item.label}</span>
                </>
              );
              if (item.href === "#") {
                return (
                  <a key={item.label} href="#" aria-disabled="true" onClick={(e) => { e.preventDefault(); setIsOpen(false); }} className={commonClasses}>
                    {content}
                  </a>
                );
              }
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={commonClasses}>
                  {content}
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
