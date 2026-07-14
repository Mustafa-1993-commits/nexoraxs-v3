"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CreditCard, LayoutGrid, Menu, Plug, Settings, Users, X } from "lucide-react";
import { useApp } from "@/lib/store";
import { ContextSwitcher } from "./ContextSwitcher";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import { LocaleToggle } from "@/components/dashboard/LocaleToggle";
import { NotificationsDropdown } from "@/components/dashboard/NotificationsDropdown";
import { UserMenuDropdown } from "@/components/dashboard/UserMenuDropdown";
import { BranchPill } from "@/components/dashboard/BranchPill";
import type { CoreSearchEntry, ShellNavIconName } from "@/lib/shell/contracts";
import { ShellSearch } from "./ShellSearch";

export interface NavItem {
  id: string;
  href: string;
  label: string;
  icon: ShellNavIconName;
  match: "exact" | "prefix";
  searchable: boolean;
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

const NAV_ICONS: Record<ShellNavIconName, ComponentType<{ size?: number; strokeWidth?: number; "aria-hidden"?: boolean }>> = {
  "layout-grid": LayoutGrid,
  "credit-card": CreditCard,
  users: Users,
  plug: Plug,
  settings: Settings,
};

function NavIcon({ name, size = 16 }: { name: ShellNavIconName; size?: number }) {
  const Icon = NAV_ICONS[name];
  return <Icon aria-hidden size={size} strokeWidth={2} />;
}

export function Shell({ mode, navGroups, children }: ShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUserDisplayName, logoutUser, t } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const searchEntries: CoreSearchEntry[] = useMemo(() => navGroups.flatMap((group) => group.items
    .filter((item) => item.searchable)
    .map((item) => ({
      id: item.id,
      kind: item.href === "/dashboard/settings" ? "setting" : "navigation",
      label: item.label,
      keywords: [item.label],
      href: item.href,
      availability: "available",
    }))), [navGroups]);

  const closeDrawer = useCallback((restoreFocus: boolean) => {
    setSidebarOpen(false);
    if (restoreFocus) requestAnimationFrame(() => burgerRef.current?.focus());
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 880px)");
    function reconcile(event: MediaQueryListEvent | MediaQueryList) {
      setIsCompact(event.matches);
      if (!event.matches) setSidebarOpen(false);
    }
    reconcile(media);
    media.addEventListener("change", reconcile);
    return () => media.removeEventListener("change", reconcile);
  }, []);

  useEffect(() => {
    function closeOnHistory() {
      setSidebarOpen(false);
    }
    window.addEventListener("popstate", closeOnHistory);
    return () => window.removeEventListener("popstate", closeOnHistory);
  }, []);

  useEffect(() => {
    if (!sidebarOpen || !isCompact) return;
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    document.documentElement.dataset.drawerOpen = "true";
    requestAnimationFrame(() => sidebar.querySelector<HTMLButtonElement>(".nx-drawer-close")?.focus());

    function containFocus(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (sidebar?.querySelector("#workspace-menu")) return;
        event.preventDefault();
        closeDrawer(true);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(sidebar!.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )).filter((element) => element.getClientRects().length > 0);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", containFocus);
    return () => {
      document.removeEventListener("keydown", containFocus);
      delete document.documentElement.dataset.drawerOpen;
    };
  }, [closeDrawer, isCompact, sidebarOpen]);

  function handleLogout() {
    logoutUser();
    router.push("/login");
  }

  return (
    <div className="nx-app-root nx-core-shell">
      <a className="nx-skip-link" href="#nx-main-content">
        {t("skip_to_main")}
      </a>
      {/* Topbar */}
      <header className="nx-topbar">
        <div className="nx-topbar-brand" inert={isCompact && sidebarOpen ? true : undefined}>
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
          ref={burgerRef}
          type="button"
          className="nx-burger nx-icon-btn"
          onClick={() => (sidebarOpen ? closeDrawer(true) : setSidebarOpen(true))}
          aria-label={t("menu")}
          aria-controls="nx-primary-sidebar"
          aria-expanded={sidebarOpen}
        >
          <Menu aria-hidden size={20} />
        </button>

        {/* Search (placeholder) */}
        <div className="nx-topbar-search" inert={isCompact && sidebarOpen ? true : undefined}>
          <ShellSearch entries={searchEntries} />
        </div>

        {/* Right controls */}
        <div className="nx-topbar-controls" inert={isCompact && sidebarOpen ? true : undefined} style={{ display: "flex", alignItems: "center", gap: 4, marginInlineStart: "auto" }}>
          {mode === "commerce" && <BranchPill />}
          <LocaleToggle />
          <ThemeToggle />
          <NotificationsDropdown />
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,.15)", margin: "0 4px" }} />
          <UserMenuDropdown />
        </div>
      </header>

      {/* Page canvas */}
      <div className="nx-page-canvas">
        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          id="nx-primary-sidebar"
          className={`nx-sidebar${sidebarOpen ? " open" : ""}`}
          role={isCompact && sidebarOpen ? "dialog" : undefined}
          aria-modal={isCompact && sidebarOpen ? "true" : undefined}
          aria-label={isCompact && sidebarOpen ? t("navigation_drawer") : undefined}
        >
          <button type="button" className="nx-drawer-close nx-icon-btn" onClick={() => closeDrawer(true)} aria-label={t("close_menu")}>
            <X aria-hidden size={18} />
          </button>
          <ContextSwitcher mode={mode} />

          <nav id="nx-primary-navigation" className="nx-sb-nav" aria-label={t("primary_navigation")}>
            {navGroups.map((group, gi) => (
              <div key={gi}>
                {group.label && <div className="nx-sb-group-label">{group.label}</div>}
                {group.items.map((item) => {
                  const isActive = item.match === "exact"
                    ? pathname === item.href
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`nx-nav-item${isActive ? " active" : ""}`}
                      onClick={() => closeDrawer(false)}
                      aria-current={isActive ? "page" : undefined}
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
            <button type="button" className="nx-sb-user" onClick={handleLogout} title={t("sign_out")}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--accent-weak)", color: "var(--accent)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 11, flexShrink: 0 }}>
                {(currentUserDisplayName[0] || "?").toUpperCase()}
              </div>
              <span className="nx-sb-user-txt">
                <span className="nx-sb-user-name">{currentUserDisplayName}</span>
                <span className="nx-sb-user-sub">{t("sign_out")}</span>
              </span>
            </button>
          </div>
        </aside>

        {/* Scrim (mobile) */}
        {sidebarOpen && (
          <div
            className="nx-shell-scrim"
            onClick={() => closeDrawer(true)}
          />
        )}

        {/* Main content */}
        <main id="nx-main-content" className="nx-main" tabIndex={-1} inert={isCompact && sidebarOpen ? true : undefined}>
          <div className="nx-main-scroll">
            <div className="nx-page">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
