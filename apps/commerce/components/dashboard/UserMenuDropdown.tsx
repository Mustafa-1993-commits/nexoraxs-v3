"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Settings, CreditCard, Users } from "lucide-react";
import { useApp } from "@/lib/store";
import { Avatar } from "@/components/ui/Avatar";

const CORE_APP_URL = "http://localhost:3001";

export function UserMenuDropdown() {
  const { currentUser, currentUserDisplayName, logoutUser } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function go(href: string) {
    setOpen(false);
    if (href.startsWith("/dashboard")) {
      window.location.href = `${CORE_APP_URL}${href}`;
      return;
    }
    router.push(href);
  }

  function handleLogout() {
    setOpen(false);
    logoutUser();
    window.location.href = `${CORE_APP_URL}/login`;
  }

  return (
    <div ref={ref} className="nx-pop-wrap">
      <button
        className="nx-icon-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="User menu"
        style={{ borderRadius: "50%", width: 34, height: 34 }}
      >
        <Avatar name={currentUserDisplayName || "?"} size={30} />
      </button>

      {open && (
        <div className="nx-dd" style={{ minWidth: 200 }}>
          <div style={{ padding: "10px 11px 8px" }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--text)" }}>{currentUserDisplayName}</div>
            {currentUser && <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>{currentUser.email}</div>}
          </div>
          <div className="nx-dd-sep" />
          <button className="nx-dd-item" onClick={() => go("/dashboard/settings")}>
            <Settings size={15} /> Account
          </button>
          <button className="nx-dd-item" onClick={() => go("/dashboard/billing")}>
            <CreditCard size={15} /> Billing
          </button>
          <button className="nx-dd-item" onClick={() => go("/dashboard/team")}>
            <Users size={15} /> Team
          </button>
          <div className="nx-dd-sep" />
          <button className="nx-dd-item danger" onClick={handleLogout}>
            <LogOut size={15} /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}
