"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  TrendingUp, TrendingDown, Package, AlertTriangle, Landmark, ScanBarcode, Globe,
  PackagePlus, UserPlus, SlidersHorizontal, ReceiptText, Check, RotateCcw,
  ArrowRight, ChevronRight, Zap, Download, Plus,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { nxRevenue, nxOrdersForPeriod, nxBestSellers, nxOrderDate, nxReturnsForPeriod, nxNetSales } from "@/lib/store";

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
  const { orders, products, customers, invoices, commerceReturns, money, currentBranch, getCommerceSetup, subscriptions, showToast, workspaceStorageUsage, storageUsageLabel, t } = useApp();
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
  const periodReturns = useMemo(() => nxReturnsForPeriod(commerceReturns, period), [commerceReturns, period]);
  const netSales = useMemo(() => nxNetSales(periodOrders, periodReturns), [periodOrders, periodReturns]);
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

  const sub = subscriptions.find((s) => s.osId === "commerce");
  const subStatus = sub ? (sub.status === "active" ? "Active" : sub.status === "trialing" ? "Trial" : "Unified") : "Unified";

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "28px 32px 48px", maxWidth: 1280, margin: "0 auto" }}>

        {/* Page header */}
        <div className="nx-dash-head">
          <div>
            <div className="nx-dash-crumb">Platform <ChevronRight size={12} /> Commerce OS <ChevronRight size={12} /> Dashboard</div>
            <div className="nx-row" style={{ gap: 10, marginTop: 4 }}>
              <h1 className="nx-page-title" style={{ fontSize: 26 }}>Commerce Dashboard</h1>
              <span className="nx-badge tone-accent"><Zap size={11} />{subStatus}</span>
              <span className="nx-badge tone-neutral">{t("branch")}: {branchName}</span>
            </div>
            <p className="nx-page-sub">
              {todayStr} · {branchName}
              {workspaceStorageUsage && <> · {t("storage_used")}: {storageUsageLabel}</>}
            </p>
          </div>
          <div className="nx-row" style={{ gap: 10, flexWrap: "wrap" }}>
            <div className="nx-seg">
              {(["today", "week", "month"] as Period[]).map((p) => (
                <button key={p} className={period === p ? "on" : ""} onClick={() => setPeriod(p)}>
                  {PERIOD_LABELS[p]}
                </button>
              ))}
            </div>
            <button className="nx-btn nx-btn-secondary nx-btn-md" onClick={() => showToast("Export is coming soon", "info")}>
              <Download size={15} />Export
            </button>
            <Link href="/products/new" className="nx-btn nx-btn-primary nx-btn-md" style={{ textDecoration: "none" }}>
              <Plus size={15} />New product
            </Link>
          </div>
        </div>

        {/* Setup hero */}
        {!allDone && (
          <div className="nx-card nx-setup-hero" style={{ marginBottom: 20 }}>
            <div className="nx-setup-hero-top">
              <div>
                <span className="nx-eyebrow">Get started</span>
                <h2 className="nx-setup-hero-title">Finish setting up Commerce OS</h2>
                <p className="nx-setup-hero-sub">{doneCount} of 5 steps done — you&apos;re almost ready to make your first sale.</p>
              </div>
              <div className="nx-setup-pct">{Math.round((doneCount / 5) * 100)}%</div>
            </div>
            <div className="nx-progress" style={{ margin: "4px 0 18px" }}>
              <span style={{ width: `${(doneCount / 5) * 100}%` }} />
            </div>
            <div className="nx-setup-tasks">
              {checklist.map((c) => (
                <div key={c.label} className={"nx-task" + (c.done ? " done" : "")}>
                  <span className="nx-check-ring">{c.done && <Check size={12} />}</span>
                  <span className="nx-task-label">{c.label}</span>
                  {!c.done && <ArrowRight size={15} className="nx-task-go" />}
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
            <Link href="/pos" className="nx-btn nx-btn-primary nx-btn-sm" style={{ textDecoration: "none" }}>
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
            label={t("returns_refunds")}
            value={money(netSales.returns)}
            icon={<RotateCcw size={16} />}
            tint="#dc2626"
            sub={`${periodReturns.length} ${periodReturns.length === 1 ? "return" : "returns"} · ${branchName}`}
          />
          <KpiCard
            label={t("net_sales")}
            value={money(netSales.net)}
            icon={<TrendingDown size={16} />}
            tint="#16a34a"
            sub={`${t("gross_sales")}: ${money(netSales.gross)}`}
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
