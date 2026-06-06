"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Package, AlertTriangle, ShoppingBag, CreditCard } from "lucide-react";
import { useApp } from "@/lib/store";

export function NotificationsDropdown() {
  const { products, orders, COMMERCE_PLAN, money } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const outOfStock = products.filter((p) => (p.stock ?? 0) === 0);
  const lowStock = products.filter((p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) <= (p.lowStockThreshold || 5));
  const latestOrder = orders.length > 0 ? orders[orders.length - 1] : null;
  const hasNotifs = outOfStock.length > 0 || lowStock.length > 0 || !!COMMERCE_PLAN;

  return (
    <div ref={ref} className="nx-pop-wrap">
      <button className="nx-icon-btn" onClick={() => setOpen((o) => !o)} aria-label="Notifications">
        <Bell size={16} />
        {hasNotifs && <span className="nx-notif-dot" />}
      </button>

      {open && (
        <div className="nx-dd" style={{ minWidth: 280 }}>
          <div className="nx-dd-label">Notifications</div>

          {COMMERCE_PLAN && (
            <div className="nx-dd-item" style={{ cursor: "default" }}>
              <CreditCard size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />
              <span style={{ fontSize: 13 }}>
                <strong>{COMMERCE_PLAN.name}</strong> plan — {COMMERCE_PLAN.status}
              </span>
            </div>
          )}

          {outOfStock.map((p) => (
            <div key={p.id} className="nx-dd-item" style={{ cursor: "default" }}>
              <AlertTriangle size={16} style={{ color: "var(--danger)", flexShrink: 0 }} />
              <span style={{ fontSize: 13 }}>Out of stock: <strong>{p.name}</strong></span>
            </div>
          ))}

          {lowStock.map((p) => (
            <div key={p.id} className="nx-dd-item" style={{ cursor: "default" }}>
              <Package size={16} style={{ color: "var(--warn)", flexShrink: 0 }} />
              <span style={{ fontSize: 13 }}>Low stock: <strong>{p.name}</strong> ({p.stock} left)</span>
            </div>
          ))}

          {latestOrder && (
            <>
              <div className="nx-dd-sep" />
              <div className="nx-dd-item" style={{ cursor: "default" }}>
                <ShoppingBag size={16} style={{ color: "var(--pos)", flexShrink: 0 }} />
                <span style={{ fontSize: 13 }}>
                  New order <strong>{latestOrder.orderNumber}</strong> — {money(latestOrder.total)}
                </span>
              </div>
            </>
          )}

          {!hasNotifs && !latestOrder && (
            <div style={{ padding: "12px 11px", fontSize: 13, color: "var(--text-3)" }}>
              No new notifications
            </div>
          )}
        </div>
      )}
    </div>
  );
}
