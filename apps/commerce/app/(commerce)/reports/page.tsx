"use client";

import { useState } from "react";
import { BarChart2, TrendingUp, RotateCcw, ShoppingBag, Users, Package } from "lucide-react";
import { useApp } from "@/lib/store";
import { nxRevenue, nxOrdersForPeriod, nxBestSellers, nxGroupSales, nxNewCustomers, nxReturnsForPeriod, nxNetSales } from "@/lib/store";

type Period = "today" | "week" | "month";

export default function ReportsPage() {
  const { orders, products, customers, commerceReturns, money, getCommerceSetup, currentBranch, t } = useApp();
  const [period, setPeriod] = useState<Period>("month");
  const setup = getCommerceSetup();

  const periodOrders = nxOrdersForPeriod(orders, period);
  const rev = nxRevenue(periodOrders);
  const periodReturns = nxReturnsForPeriod(commerceReturns, period);
  const netSales = nxNetSales(periodOrders, periodReturns);
  const bestSellers = nxBestSellers(periodOrders, products, 5);
  const newCusts = nxNewCustomers(customers, period);
  const salesGroup = nxGroupSales(periodOrders, period);

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

  const chartMax = Math.max(...salesGroup.buckets.map((b) => b.total), 1);
  const chartH = 100;
  const barsCount = salesGroup.buckets.length;
  const barW = barsCount > 0 ? Math.max(3, Math.floor(400 / barsCount) - 2) : 8;
  const chartW = barsCount * (barW + 2);

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>Reports — {currentBranch?.name}</h1>
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
          {([
            { label: t("gross_sales"), value: money(rev.gross), icon: <TrendingUp size={18} />, color: "var(--accent)" },
            { label: t("returns_refunds"), value: money(netSales.returns), icon: <RotateCcw size={18} />, color: "var(--danger)" },
            { label: t("net_sales"), value: money(netSales.net), icon: <TrendingUp size={18} />, color: "var(--pos)" },
            ...(setup.vatRegistered ? [{ label: setup.taxLabel || "VAT Collected", value: money(rev.vat), icon: <BarChart2 size={18} />, color: "var(--text-2)" }] : []),
            { label: "Orders", value: String(rev.count), icon: <ShoppingBag size={18} />, color: "var(--text-2)" },
            { label: "Avg Ticket", value: money(avgTicket), icon: <TrendingUp size={18} />, color: "var(--text-2)" },
            { label: "New Customers", value: String(newCusts), icon: <Users size={18} />, color: "var(--text-2)" },
          ] as { label: string; value: string; icon: React.ReactNode; color: string }[]).map(({ label, value, icon, color }) => {
            const testIdByLabel: Record<string, string> = {
              [t("gross_sales")]: "reports-gross-sales",
              [t("returns_refunds")]: "reports-returns-refunds",
              [t("net_sales")]: "reports-net-sales",
            };
            return (
              <div key={label} data-testid={testIdByLabel[label]} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "16px 18px", boxShadow: "var(--sh-sm)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-2)" }}>{label}</span>
                  <span style={{ color }}>{icon}</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-.02em" }}>{value}</div>
              </div>
            );
          })}
        </div>

        {/* Sales chart + payment breakdown */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          {/* SVG bar chart */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "20px 22px" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
              <BarChart2 size={16} />Sales — {periodLabel[period]}
            </div>
            {salesGroup.buckets.every((b) => b.total === 0) ? (
              <p style={{ fontSize: 13, color: "var(--text-3)" }}>No sales for {periodLabel[period].toLowerCase()}.</p>
            ) : (
              <svg viewBox={`0 0 ${chartW} ${chartH + 18}`} style={{ width: "100%", overflow: "visible" }}>
                {salesGroup.buckets.map((b, i) => {
                  const barH = Math.max(2, (b.total / chartMax) * chartH);
                  return (
                    <rect
                      key={i}
                      x={i * (barW + 2)}
                      y={chartH - barH}
                      width={barW}
                      height={barH}
                      rx={2}
                      fill={b.total > 0 ? "var(--accent)" : "var(--surface-3)"}
                      opacity={0.85}
                    />
                  );
                })}
                {salesGroup.axis.map((label, i) => {
                  const total = salesGroup.axis.length;
                  const bIdx = total <= 1 ? 0 : Math.round((i / (total - 1)) * (barsCount - 1));
                  return (
                    <text key={label} x={bIdx * (barW + 2) + barW / 2} y={chartH + 14} textAnchor="middle" fontSize={9} fill="var(--text-3)">{label}</text>
                  );
                })}
              </svg>
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

        {/* Best sellers */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "20px 22px" }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
            <Package size={16} />Best Sellers — {periodLabel[period]}
          </div>
          {bestSellers.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--text-3)" }}>No sales data for {periodLabel[period].toLowerCase()}.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Product", "Category", "Qty sold", "Revenue"].map((h) => (
                    <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: 11.5, fontWeight: 600, color: "var(--text-2)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bestSellers.map((item, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "9px 12px", fontSize: 13, fontWeight: 600 }}>{item.name}</td>
                    <td style={{ padding: "9px 12px", fontSize: 12, color: "var(--text-2)" }}>{item.category}</td>
                    <td style={{ padding: "9px 12px", fontSize: 13, color: "var(--text-2)" }}>{item.qty}</td>
                    <td style={{ padding: "9px 12px", fontSize: 13, fontWeight: 700, color: "var(--pos)" }}>{money(item.rev)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
