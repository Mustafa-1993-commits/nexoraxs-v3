"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  TrendingUp, Package, AlertTriangle, Landmark, ScanBarcode, Globe,
  PackagePlus, UserPlus, SlidersHorizontal, ReceiptText, Check,
  ArrowRight,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { nxRevenue, nxOrdersForPeriod, nxBestSellers, nxOrderDate } from "@/lib/store";

type Period = "today" | "week" | "month";
const PERIOD_LABELS: Record<Period, string> = { today: "Today", week: "Week", month: "Month" };

function KpiCard({
  label, value, icon, tint, sub, warn = false,
}: {
  label: string; value: string; icon: React.ReactNode;
  tint: string; sub: string; warn?: boolean;
}) {
  return (
    <div className="nx-card nx-kpi">
      <div className="nx-kpi-top">
        <span className="nx-kpi-label">{label}</span>
        <span className="nx-kpi-ic" style={{ background: tint + "1a", color: tint }}>{icon}</span>
      </div>
      <div className="nx-kpi-value">{value}</div>
      <div className={"nx-kpi-sub" + (warn ? " warn" : "")}>{sub}</div>
      <div className="nx-kpi-spark" style={{ background: `linear-gradient(90deg, ${tint}22, transparent)` }} />
    </div>
  );
}

export default function CommerceDashboardPage() {
  const { orders, products, customers, invoices, money, currentBranch, getCommerceSetup } = useApp();
  const [period, setPeriod] = useState<Period>("today");

  const setup = getCommerceSetup();
  const checklist = [
    { label: "Business identity", done: !!(setup.displayName && setup.address) },
    { label: "Tax setup", done: setup.vatRegistered !== undefined && !!setup.taxNumber },
    { label: "Invoice template", done: !!setup.invoiceTemplate },
    { label: "First product", done: products.length > 0 },
    { label: "First sale", done: orders.length > 0 },
  ];
  const doneCount = checklist.filter((c) => c.done).length;
  const allDone = doneCount === 5;

  const periodOrders = useMemo(() => nxOrdersForPeriod(orders, period), [orders, period]);
  const revenue = useMemo(() => nxRevenue(periodOrders), [periodOrders]);
  const lowStockList = useMemo(
    () => products.filter((p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) <= (p.lowStockThreshold ?? 5)).sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0)),
    [products]
  );
  const bestSellers = useMemo(() => nxBestSellers(periodOrders, products, 5), [periodOrders, products]);
  const recent = useMemo(
    () => [...orders].sort((a, b) => ((nxOrderDate(b)?.getTime() ?? 0) - (nxOrderDate(a)?.getTime() ?? 0))).slice(0, 6),
    [orders]
  );

  const branchName = currentBranch?.name || "Main branch";
  const todayStr = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" });
  const categoryCount = new Set(products.map((p) => p.category).filter(Boolean)).size;

  const posReady = doneCount >= 4;
  const periodSuffix = period === "today" ? "today" : period === "week" ? "this week" : "this month";

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>

        {/* Page header */}
        <div className="nx-page-head">
          <div>
            <h1 className="nx-page-title">Commerce Dashboard</h1>
            <p className="nx-page-sub">{todayStr} · {branchName}</p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <div className="nx-seg">
              {(["today", "week", "month"] as Period[]).map((p) => (
                <button key={p} className={period === p ? "on" : ""} onClick={() => setPeriod(p)}>
                  {PERIOD_LABELS[p]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Setup hero */}
        {!allDone && (
          <div className="nx-card" style={{ padding: "20px 22px", marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
              <div>
                <span className="nx-eyebrow">Get started</span>
                <h2 style={{ fontWeight: 800, fontSize: 17, marginTop: 4 }}>Finish setting up Commerce OS</h2>
                <p style={{ fontSize: 13, color: "var(--text-2)", marginTop: 4 }}>
                  {doneCount} of 5 steps done — you&apos;re almost ready to make your first sale.
                </p>
              </div>
              <div style={{ fontFamily: "var(--mono)", fontWeight: 800, fontSize: 22, color: "var(--accent)", flexShrink: 0 }}>
                {Math.round((doneCount / 5) * 100)}%
              </div>
            </div>
            <div style={{ height: 4, background: "var(--surface-3)", borderRadius: 4, margin: "14px 0 18px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(doneCount / 5) * 100}%`, background: "var(--accent)", borderRadius: 4, transition: "width .4s" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {checklist.map((c) => (
                <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5 }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: "50%", border: `2px solid ${c.done ? "var(--accent)" : "var(--border-strong)"}`,
                    background: c.done ? "var(--accent)" : "transparent", display: "grid", placeItems: "center", flexShrink: 0, transition: "all .2s",
                  }}>
                    {c.done && <Check size={11} color="#fff" strokeWidth={3} />}
                  </span>
                  <span style={{ color: c.done ? "var(--text-2)" : "var(--text)", fontWeight: c.done ? 500 : 600 }}>{c.label}</span>
                  {!c.done && <ArrowRight size={13} style={{ color: "var(--accent)", marginLeft: "auto" }} />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Channel row */}
        <div className="nx-channel-row">
          <div className="nx-card nx-channel">
            <span className="nx-channel-ic" style={{ background: "var(--accent-weak)", color: "var(--accent)" }}>
              <ScanBarcode size={18} />
            </span>
            <div style={{ flex: 1 }}>
              <div className="nx-channel-title">POS</div>
              <div className="nx-channel-sub">
                <span className={"nx-dot " + (posReady ? "ok" : "warn")} />
                {posReady ? "Ready · in-store checkout" : "Needs setup"}
              </div>
            </div>
            <Link href="/pos" className="nx-btn nx-btn-sm" style={{ textDecoration: "none" }}>
              Open <ArrowRight size={13} />
            </Link>
          </div>
          <div className="nx-card nx-channel">
            <span className="nx-channel-ic" style={{ background: "var(--surface-3)", color: "var(--text-2)" }}>
              <Globe size={18} />
            </span>
            <div style={{ flex: 1 }}>
              <div className="nx-channel-title">Storefront</div>
              <div className="nx-channel-sub">
                <span className="nx-dot" /> Coming soon · online orders
              </div>
            </div>
            <button className="nx-btn nx-btn-sm" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>Configure</button>
          </div>
        </div>

        {/* KPI grid */}
        <div className="nx-kpi-grid">
          <KpiCard
            label={`Sales ${periodSuffix}`}
            value={money(revenue.gross)}
            icon={<TrendingUp size={16} />}
            tint="#4f46e5"
            sub={`${revenue.count} ${revenue.count === 1 ? "order" : "orders"} · ${branchName}`}
          />
          <KpiCard
            label="Products"
            value={String(products.length)}
            icon={<Package size={16} />}
            tint="#7c3aed"
            sub={`${categoryCount} ${categoryCount === 1 ? "category" : "categories"}`}
          />
          <KpiCard
            label="Low stock"
            value={String(lowStockList.length)}
            icon={<AlertTriangle size={16} />}
            tint="#b25e09"
            sub="items below threshold"
            warn={lowStockList.length > 0}
          />
          <KpiCard
            label="Customers"
            value={String(customers.length)}
            icon={<Landmark size={16} />}
            tint="#0d9488"
            sub={`${invoices.length} ${invoices.length === 1 ? "invoice" : "invoices"} total`}
          />
        </div>

        {/* Operation shortcuts */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div className="nx-section-title">Operations shortcuts</div>
        </div>
        <div className="nx-shortcut-row">
          {[
            { label: "Add product", icon: <PackagePlus size={17} />, href: "/products/new" },
            { label: "New sale", icon: <ScanBarcode size={17} />, href: "/pos" },
            { label: "Add customer", icon: <UserPlus size={17} />, href: "/customers" },
            { label: "Stock adjustment", icon: <SlidersHorizontal size={17} />, href: "/inventory" },
            { label: "Daily report", icon: <ReceiptText size={17} />, href: "/reports" },
          ].map((s) => (
            <Link key={s.label} href={s.href} className="nx-shortcut" style={{ textDecoration: "none" }}>
              <span className="nx-shortcut-ic">{s.icon}</span>
              <span>{s.label}</span>
            </Link>
          ))}
        </div>

        {/* Recent sales + Low stock */}
        <div className="nx-dash-2col">
          {/* Recent orders */}
          <div className="nx-table-wrap">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px 12px" }}>
              <div>
                <div className="nx-eyebrow" style={{ color: "var(--text-3)", fontSize: 11 }}>Recent sales</div>
                <div className="nx-section-title" style={{ marginTop: 2 }}>Sales and orders</div>
              </div>
              <Link href="/orders" className="nx-link" style={{ fontSize: 12 }}>View all</Link>
            </div>
            {recent.length === 0 ? (
              <div className="nx-empty">
                <div className="nx-empty-ic"><Package size={22} /></div>
                <div className="nx-empty-title">No sales yet</div>
                <div className="nx-empty-desc">Completed POS sales appear here.</div>
              </div>
            ) : (
              <table className="nx-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Method</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((o) => {
                    const d = nxOrderDate(o);
                    const time = d ? d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "—";
                    return (
                      <tr key={o.id}>
                        <td>
                          <div style={{ fontWeight: 700, fontSize: 13, fontFamily: "var(--mono)" }}>{o.orderNumber}</div>
                          <div style={{ fontSize: 11, color: "var(--text-3)" }}>{time}</div>
                        </td>
                        <td className="num" style={{ color: "var(--text-2)" }}>{(o.items || []).length}</td>
                        <td style={{ fontWeight: 700 }}>{money(o.total)}</td>
                        <td style={{ color: "var(--text-2)", fontSize: 12.5 }}>{o.payment || "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Low stock panel */}
          <div className="nx-table-wrap">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px 12px" }}>
              <div>
                <div className="nx-eyebrow" style={{ color: "var(--warn)", fontSize: 11 }}>Low stock alert</div>
                <div className="nx-section-title" style={{ marginTop: 2 }}>Stock alerts</div>
              </div>
              <span className={`nx-badge ${lowStockList.length ? "tone-warn" : "tone-neutral"}`}>
                {lowStockList.length}
              </span>
            </div>
            {lowStockList.length === 0 ? (
              <div className="nx-empty" style={{ padding: "32px 20px" }}>
                <div className="nx-empty-ic"><Check size={20} /></div>
                <div className="nx-empty-title">All stocked up</div>
                <div className="nx-empty-desc">No products are running low.</div>
              </div>
            ) : (
              <div style={{ padding: "0 14px 14px" }}>
                {lowStockList.slice(0, 8).map((p) => (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                      <div style={{ fontSize: 11.5, color: "var(--text-3)" }}>{p.category}</div>
                    </div>
                    <span className="nx-badge tone-warn" style={{ fontSize: 11 }}>{p.stock} left</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Best sellers */}
        {bestSellers.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div className="nx-section-title" style={{ marginBottom: 12 }}>Best sellers · {PERIOD_LABELS[period]}</div>
            <div className="nx-table-wrap">
              <table className="nx-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Units sold</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {bestSellers.map((b, i) => (
                    <tr key={b.name}>
                      <td className="num" style={{ color: "var(--text-3)", width: 32 }}>{i + 1}</td>
                      <td style={{ fontWeight: 600 }}>{b.name}</td>
                      <td style={{ color: "var(--text-2)", fontSize: 12.5 }}>{b.category}</td>
                      <td className="num">{b.qty}</td>
                      <td style={{ fontWeight: 700 }}>{money(b.rev)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
