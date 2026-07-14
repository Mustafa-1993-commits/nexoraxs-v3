"use client";

import { memo, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Settings, CreditCard, Users } from "lucide-react";
import { useApp } from "@/lib/store";
import { Avatar } from "@/components/ui/Avatar";

export const UserMenuDropdown = memo(function UserMenuDropdown() {
  const { currentUser, currentUserDisplayName, logoutUser, t } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    function dismiss(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    }
    document.addEventListener("keydown", dismiss);
    return () => document.removeEventListener("keydown", dismiss);
  }, [open]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  function handleLogout() {
    setOpen(false);
    logoutUser();
    router.push("/login");
  }

  return (
    <div ref={ref} className="nx-pop-wrap">
      <button
        ref={triggerRef}
        type="button"
        className="nx-icon-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label={t("user_menu")}
        aria-controls="user-menu"
        aria-expanded={open}
        aria-haspopup="menu"
        style={{ borderRadius: "50%", width: 34, height: 34 }}
      >
        <Avatar name={currentUserDisplayName || "?"} size={30} />
      </button>

      <div ref={menuRef} id="user-menu" className="nx-dd" role="menu" aria-label={t("user_menu")} hidden={!open} style={{ minWidth: 200 }}>
          <div style={{ padding: "10px 11px 8px" }}>
            <div dir="auto" style={{ fontWeight: 700, fontSize: 13.5, color: "var(--text)" }}>{currentUserDisplayName}</div>
            {currentUser && <div dir="auto" style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>{currentUser.email}</div>}
          </div>
          <div className="nx-dd-sep" />
          <button type="button" role="menuitem" className="nx-dd-item" onClick={() => go("/dashboard/settings")}>
            <Settings aria-hidden size={15} /> {t("account")}
          </button>
          <button type="button" role="menuitem" className="nx-dd-item" onClick={() => go("/dashboard/billing")}>
            <CreditCard aria-hidden size={15} /> {t("billing")}
          </button>
          <button type="button" role="menuitem" className="nx-dd-item" onClick={() => go("/dashboard/team")}>
            <Users aria-hidden size={15} /> {t("team_short")}
          </button>
          <div className="nx-dd-sep" />
          <button type="button" role="menuitem" className="nx-dd-item danger" onClick={handleLogout}>
            <LogOut aria-hidden size={15} /> {t("sign_out")}
          </button>
      </div>
    </div>
  );
});
