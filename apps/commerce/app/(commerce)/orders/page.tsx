"use client";

import { useState } from "react";
import { Search, ShoppingBag, Eye, X } from "lucide-react";
import { useApp } from "@/lib/store";
import { type CommerceOrder } from "@/lib/store";
import { fmtDate } from "@/lib/store";

type Period = "all" | "today" | "week" | "month";

export default function OrdersPage() {
  const { orders, money, createInvoice, showToast } = useApp();
  const [q, setQ] = useState("");
  const [period, setPeriod] = useState<Period>("all");
  const [selected, setSelected] = useState<CommerceOrder | null>(null);

  const now = new Date();
  const filtered = orders.filter((o) => {
    const matchQ = !q || o.orderNumber.includes(q) || (o.customerId || "").includes(q);
    if (!matchQ) return false;
    if (period === "all") return true;
    const d = new Date(o.createdAt);
    if (period === "today") { const s = new Date(now); s.setHours(0,0,0,0); return d >= s; }
    if (period === "week") { const s = new Date(now); s.setDate(now.getDate() - 6); s.setHours(0,0,0,0); return d >= s; }
    if (period === "month") { const s = new Date(now); s.setDate(1); s.setHours(0,0,0,0); return d >= s; }
    return true;
  }).slice().reverse();

  function handleCreateInvoice(orderId: string) {
    try { createInvoice(orderId); showToast("Invoice created", "success"); } catch { showToast("Failed to create invoice", "error"); }
  }

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>Orders</h1>
          <div className="nx-seg">
            {(["all", "today", "week", "month"] as Period[]).map((p) => (
              <button key={p} className={period === p ? "on" : ""} onClick={() => setPeriod(p)}>
                {p === "all" ? "All" : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", marginBottom: 18 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-3)" }} />
          <input className="nx-input" style={{ paddingLeft: 32, fontSize: 13, maxWidth: 360 }} placeholder="Search by order number…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 24px", color: "var(--text-3)" }}>
            <ShoppingBag size={40} style={{ opacity: 0.3, display: "block", margin: "0 auto 12px" }} />
            <div style={{ fontWeight: 600 }}>{orders.length === 0 ? "No orders yet" : "No orders match your filter"}</div>
          </div>
        ) : (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
                  {["Order", "Date", "Items", "Payment", "Total", ""].map((h) => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--text-2)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "11px 14px", fontWeight: 600, fontSize: 13, fontFamily: "var(--mono)" }}>{o.orderNumber}</td>
                    <td style={{ padding: "11px 14px", fontSize: 12.5, color: "var(--text-2)" }}>{fmtDate(o.createdAt)}</td>
                    <td style={{ padding: "11px 14px", fontSize: 12.5, color: "var(--text-2)" }}>{o.items.reduce((s, i) => s + i.qty, 0)} items</td>
                    <td style={{ padding: "11px 14px" }}>
                      <span className="nx-badge tone-neutral" style={{ fontSize: 11 }}>{o.payment}</span>
                    </td>
                    <td style={{ padding: "11px 14px", fontWeight: 700, fontSize: 13 }}>{money(o.total)}</td>
                    <td style={{ padding: "11px 14px" }}>
                      <button onClick={() => setSelected(o)} style={{ padding: "5px 10px", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--r-sm)", cursor: "pointer", display: "flex", gap: 5, alignItems: "center", fontSize: 12 }}>
                        <Eye size={12} />View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div style={{ position: "fixed", inset: 0, background: "#0006", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}>
          <div style={{ background: "var(--surface)", borderRadius: "var(--r-lg)", padding: 28, width: "100%", maxWidth: 440 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
              <h3 style={{ fontWeight: 700 }}>{selected.orderNumber}</h3>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} /></button>
            </div>
            <div style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 14 }}>{fmtDate(selected.createdAt)} · {selected.payment}</div>
            {selected.items.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                <span>{item.name} × {item.qty}</span>
                <span style={{ fontWeight: 600 }}>{money(item.price * item.qty)}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, marginTop: 14 }}>
              <span>Total</span><span>{money(selected.total)}</span>
            </div>
            <button className="nx-btn-primary" onClick={() => { handleCreateInvoice(selected.id); setSelected(null); }} style={{ width: "100%", marginTop: 18 }}>
              Create Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
