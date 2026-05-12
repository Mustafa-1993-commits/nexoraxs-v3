"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navItems } from "@/lib/mock-data/nav-items";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";

const resources = [
  { label: "Documentation", href: "#" },
  { label: "Changelog",     href: "#" },
  { label: "Support",       href: "#" },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile hamburger */}
      <button
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
        className={`fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-white/5 bg-[#0a0a0f] transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-white/5 px-5">
          <Logo />
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:text-white md:hidden"
            aria-label="Close navigation"
          >
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto px-3 py-5">
          {/* Platform section */}
          <p className="chip mb-2 px-3 text-white/30">Platform</p>
          <nav className="mb-6 space-y-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`nav-item flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm
                    ${isActive ? "nav-item-active" : "text-white/50 hover:bg-white/5 hover:text-white"}`}
                >
                  <Icon name={item.icon} className="h-4 w-4 flex-shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Resources section */}
          <p className="chip mb-2 px-3 text-white/30">Resources</p>
          <nav className="space-y-0.5">
            {resources.map((r) => (
              <a
                key={r.label}
                href={r.href}
                className="nav-item flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/50 hover:bg-white/5 hover:text-white"
              >
                {r.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Beta access card */}
        <div className="border-t border-white/5 p-3">
          <div
            className="rounded-xl border border-white/10 p-4"
            style={{
              background:
                "linear-gradient(135deg,rgba(59,130,246,0.1),rgba(139,92,246,0.05),transparent)",
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs font-semibold text-white">✦ Beta access</span>
            </div>
            <p className="text-[11px] leading-relaxed text-white/40">
              Early-bird plan. Pricing locked in for 12 months.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
