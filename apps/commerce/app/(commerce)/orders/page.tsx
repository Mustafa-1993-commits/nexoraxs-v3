"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import { useApp } from "@/lib/store";
import { fmtDate } from "@/lib/store";

type Period = "all" | "today" | "week" | "month";
type PaymentFilter = "all" | "cash" | "card" | "wallet";

export default function OrdersPage() {
  const { orders, invoices, money, t } = useApp();
  const [q, setQ] = useState("");
  const [period, setPeriod] = useState<Period>("all");
  const [payFilter, setPayFilter] = useState<PaymentFilter>("all");

  const now = new Date();
  const filtered = orders.filter((o) => {
    const matchQ = !q || o.orderNumber.includes(q) || (o.customerId || "").includes(q);
    if (!matchQ) return false;
    if (payFilter !== "all" && (o.payment || "").toLowerCase() !== payFilter) return false;
    if (period === "all") return true;
    const d = new Date(o.createdAt);
    if (period === "today") { const s = new Date(now); s.setHours(0,0,0,0); return d >= s; }
    if (period === "week") { const s = new Date(now); s.setDate(now.getDate() - 6); s.setHours(0,0,0,0); return d >= s; }
    if (period === "month") { const s = new Date(now); s.setDate(1); s.setHours(0,0,0,0); return d >= s; }
    return true;
  }).slice().reverse();

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>Orders</h1>
          <div className="nx-seg">
            {(["all", "today", "week", "month"] as Period[]).map((p) => (
              <button key={p} className={period === p ? "on" : ""} onClick={() => setPeriod(p)}>
                {p === "all" ? "All time" : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-3)" }} />
            <input className="nx-input" style={{ paddingLeft: 32, fontSize: 13, maxWidth: 320 }} placeholder="Search by order number…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="nx-seg" style={{ marginLeft: "auto" }}>
            {(["all", "cash", "card", "wallet"] as PaymentFilter[]).map((p) => (
              <button key={p} className={payFilter === p ? "on" : ""} onClick={() => setPayFilter(p)}>
                {p === "all" ? "All methods" : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
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
                  {["Order", "Date", "Items", t("cashier"), "Payment", "Invoice", "Total", ""].map((h) => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--text-2)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => {
                  const inv = invoices.find((i) => i.orderId === o.id);
                  return (
                    <tr key={o.id} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "11px 14px", fontWeight: 600, fontSize: 13, fontFamily: "var(--mono)" }}>{o.orderNumber}</td>
                      <td style={{ padding: "11px 14px", fontSize: 12.5, color: "var(--text-2)" }}>{fmtDate(o.createdAt)}</td>
                      <td style={{ padding: "11px 14px", fontSize: 12.5, color: "var(--text-2)" }}>{o.items.reduce((s, i) => s + i.qty, 0)} items</td>
                      <td style={{ padding: "11px 14px", fontSize: 12.5, color: "var(--text-2)" }}>{o.cashierName || "—"}</td>
                      <td style={{ padding: "11px 14px" }}>
                        <span className="nx-badge tone-neutral" style={{ fontSize: 11 }}>{o.payment}</span>
                      </td>
                      <td style={{ padding: "11px 14px" }}>
                        {inv ? (
                          <Link href={`/invoices/${inv.id}`} style={{ fontSize: 11.5, fontFamily: "var(--mono)", color: "var(--accent)", textDecoration: "none" }}>
                            {inv.invoiceNumber}
                          </Link>
                        ) : (
                          <span style={{ fontSize: 12, color: "var(--text-3)" }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: "11px 14px", fontWeight: 700, fontSize: 13 }}>{money(o.total)}</td>
                      <td style={{ padding: "11px 14px" }}>
                        <Link href={`/orders/${o.id}`} style={{ padding: "5px 10px", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--r-sm)", display: "inline-flex", gap: 5, alignItems: "center", fontSize: 12, color: "var(--text)", textDecoration: "none" }}>
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
