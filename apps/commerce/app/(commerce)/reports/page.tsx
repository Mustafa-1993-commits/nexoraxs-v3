"use client";

import { useState } from "react";
import { BarChart2, TrendingUp, ShoppingBag, Users, Package } from "lucide-react";
import { useApp } from "@/lib/store";
import { nxRevenue, nxOrdersForPeriod, nxBestSellers } from "@/lib/store";

type Period = "today" | "week" | "month";

export default function ReportsPage() {
  const { orders, products, customers, money } = useApp();
  const [period, setPeriod] = useState<Period>("month");

  const periodOrders = nxOrdersForPeriod(orders, period);
  const rev = nxRevenue(periodOrders);
  const bestSellers = nxBestSellers(periodOrders, products, 5);

  const paymentBreakdown = (() => {
    const buckets: Record<string, number> = {};
    periodOrders.forEach((o) => {
      const m = o.payment || "Other";
      buckets[m] = (buckets[m] || 0) + o.total;
    });
    const total = Object.values(buckets).reduce((s, v) => s + v, 0);
    return Object.entries(buckets).map(([name, amount]) => ({ name, amount, pct: total ? Math.round(amount / total * 100) : 0 }));
  })();

  const avgTicket = rev.count > 0 ? rev.gross / rev.count : 0;

  const periodLabel: Record<Period, string> = { today: "Today", week: "This Week", month: "This Month" };

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>Reports</h1>
          <div className="nx-seg">
            {(["today", "week", "month"] as Period[]).map((p) => (
              <button key={p} className={period === p ? "on" : ""} onClick={() => setPeriod(p)}>
                {periodLabel[p]}
              </button>
            ))}
          </div>
        </div>

        {/* KPI cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 28 }}>
          {[
            { label: "Gross Revenue", value: money(rev.gross), icon: <TrendingUp size={18} />, color: "var(--accent)" },
            { label: "Net Revenue", value: money(rev.net), icon: <TrendingUp size={18} />, color: "var(--pos)" },
            { label: "VAT Collected", value: money(rev.vat), icon: <BarChart2 size={18} />, color: "var(--text-2)" },
            { label: "Orders", value: String(rev.count), icon: <ShoppingBag size={18} />, color: "var(--text-2)" },
            { label: "Avg Ticket", value: money(avgTicket), icon: <TrendingUp size={18} />, color: "var(--text-2)" },
            { label: "Customers", value: String(customers.length), icon: <Users size={18} />, color: "var(--text-2)" },
          ].map(({ label, value, icon, color }) => (
            <div key={label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "16px 18px", boxShadow: "var(--sh-sm)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-2)" }}>{label}</span>
                <span style={{ color }}>{icon}</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-.02em" }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Best sellers */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "20px 22px" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
              <Package size={16} />Best Sellers
            </div>
            {bestSellers.length === 0 ? (
              <p style={{ fontSize: 13, color: "var(--text-3)" }}>No sales data for {periodLabel[period].toLowerCase()}.</p>
            ) : (
              bestSellers.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)" }}>{item.qty} sold</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--pos)" }}>{money(item.rev)}</div>
                </div>
              ))
            )}
          </div>

          {/* Payment breakdown */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "20px 22px" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
              <BarChart2 size={16} />Payment Methods
            </div>
            {paymentBreakdown.length === 0 ? (
              <p style={{ fontSize: 13, color: "var(--text-3)" }}>No orders for {periodLabel[period].toLowerCase()}.</p>
            ) : (
              paymentBreakdown.map((row) => (
                <div key={row.name} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                    <span style={{ fontWeight: 600 }}>{row.name}</span>
                    <span>{money(row.amount)} · {row.pct}%</span>
                  </div>
                  <div style={{ height: 6, background: "var(--surface-3)", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${row.pct}%`, background: "var(--accent)", borderRadius: 99 }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
