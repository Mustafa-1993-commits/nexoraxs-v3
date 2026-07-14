"use client";

import { memo, useState, useRef, useEffect } from "react";
import { Bell, Package, AlertTriangle, ShoppingBag, CreditCard } from "lucide-react";
import { useApp } from "@/lib/store";
import { useShellPresentation } from "@/lib/shell/useShellPresentation";

export const NotificationsDropdown = memo(function NotificationsDropdown() {
  const { t } = useApp();
  const { notifications } = useShellPresentation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (!open) return;
    surfaceRef.current?.focus();
    function dismiss(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    }
    document.addEventListener("keydown", dismiss);
    return () => document.removeEventListener("keydown", dismiss);
  }, [open]);

  const hasNotifs = notifications.hasIndicator;
  const icons = {
    plan: CreditCard,
    "out-of-stock": AlertTriangle,
    "low-stock": Package,
    "latest-order": ShoppingBag,
  } as const;
  const colors = {
    plan: "var(--accent)",
    "out-of-stock": "var(--danger)",
    "low-stock": "var(--warn)",
    "latest-order": "var(--pos)",
  } as const;

  return (
    <div ref={ref} className="nx-pop-wrap">
      <button
        ref={triggerRef}
        type="button"
        className="nx-icon-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label={t("notifications")}
        aria-controls="notifications-menu"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Bell aria-hidden size={16} />
        {hasNotifs && <span aria-hidden className="nx-notif-dot" />}
      </button>

      {open && (
        <div
          ref={surfaceRef}
          id="notifications-menu"
          className="nx-dd"
          role="dialog"
          aria-label={t("notifications")}
          tabIndex={-1}
          style={{ minWidth: 280 }}
        >
          <div className="nx-dd-label">{t("notifications")}</div>

          {notifications.items.map((item, index) => {
            const ItemIcon = icons[item.kind];
            return (
              <div key={item.id}>
                {item.kind === "latest-order" && index > 0 && <div className="nx-dd-sep" />}
                <div className="nx-dd-item" style={{ cursor: "default" }}>
                  <ItemIcon aria-hidden size={16} style={{ color: colors[item.kind], flexShrink: 0 }} />
                  <span dir="auto" style={{ fontSize: 13 }}>{item.message}</span>
                </div>
              </div>
            );
          })}

          {notifications.state === "empty" && (
            <div style={{ padding: "12px 11px", fontSize: 13, color: "var(--text-3)" }}>
              {t("no_new_notifications")}
            </div>
          )}
        </div>
      )}
    </div>
  );
});
