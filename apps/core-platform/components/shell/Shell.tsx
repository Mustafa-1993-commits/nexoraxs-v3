"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useApp } from "@/lib/store";
import { ContextSwitcher } from "./ContextSwitcher";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import { LocaleToggle } from "@/components/dashboard/LocaleToggle";
import { NotificationsDropdown } from "@/components/dashboard/NotificationsDropdown";
import { UserMenuDropdown } from "@/components/dashboard/UserMenuDropdown";
import { BranchPill } from "@/components/dashboard/BranchPill";

export interface NavItem {
  href: string;
  label: string;
  icon: string;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

interface ShellProps {
  mode: "core" | "commerce";
  navGroups: NavGroup[];
  children: ReactNode;
}

function NavIcon({ name, size = 16 }: { name: string; size?: number }) {
  const pascal = name.replace(/-./g, (m) => m[1].toUpperCase()).replace(/^./, (c) => c.toUpperCase());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[pascal] as React.FC<{ size?: number; strokeWidth?: number }> | undefined;
  if (!Icon) return <span style={{ width: size, height: size, display: "inline-block" }} />;
  return <Icon size={size} strokeWidth={2} />;
}

export function Shell({ mode, navGroups, children }: ShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUserDisplayName, logoutUser } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    logoutUser();
    router.push("/login");
  }

  return (
    <div className="nx-app-root" data-testid="core-shell">
      {/* Topbar */}
      <div className="nx-topbar">
        <div className="nx-topbar-brand">
          {/* NexoraXS wordmark PNG — light/white variant for dark topbar */}
          <Link
            href={mode === "commerce" ? "http://localhost:3002/dashboard" : "/dashboard/apps"}
            style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/branding/logo-top.png"
              alt="NexoraXS"
              style={{ height: 28, width: "auto", display: "block" }}
            />
          </Link>
          {mode === "commerce" && (
            <span className="nx-topbar-product">Commerce OS</span>
          )}
        </div>

        {/* Burger — hidden on desktop via CSS, shown on mobile */}
        <button
          className="nx-burger nx-icon-btn"
          onClick={() => setSidebarOpen((o) => !o)}
          aria-label="Menu"
        >
          <Menu size={20} />
        </button>

        {/* Search (placeholder) */}
        <div className="nx-topbar-search">
          <input placeholder="Search…" aria-label="Search" />
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginInlineStart: "auto" }}>
          {mode === "commerce" && <BranchPill />}
          <LocaleToggle />
          <ThemeToggle />
          <NotificationsDropdown />
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,.15)", margin: "0 4px" }} />
          <UserMenuDropdown />
        </div>
      </div>

      {/* Page canvas */}
      <div className="nx-page-canvas">
        {/* Sidebar */}
        <aside className={`nx-sidebar${sidebarOpen ? " open" : ""}`}>
          <ContextSwitcher mode={mode} />

          <nav className="nx-sb-nav">
            {navGroups.map((group, gi) => (
              <div key={gi}>
                {group.label && <div className="nx-sb-group-label">{group.label}</div>}
                {group.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`nx-nav-item${isActive ? " active" : ""}`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <NavIcon name={item.icon} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          <div className="nx-sb-foot">
            <button className="nx-sb-user" onClick={handleLogout} title="Sign out">
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--accent-weak)", color: "var(--accent)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 11, flexShrink: 0 }}>
                {(currentUserDisplayName[0] || "?").toUpperCase()}
              </div>
              <span className="nx-sb-user-txt">
                <span className="nx-sb-user-name">{currentUserDisplayName}</span>
                <span className="nx-sb-user-sub">Sign out</span>
              </span>
            </button>
          </div>
        </aside>

        {/* Scrim (mobile) */}
        {sidebarOpen && (
          <div
            className="nx-shell-scrim"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="nx-main">
          <div className="nx-main-scroll">
            <div className="nx-page">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
