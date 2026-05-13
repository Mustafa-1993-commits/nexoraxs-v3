"use client";

import { useState, useSyncExternalStore } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/dashboard/Badge";
import { Icon } from "@/components/ui/Icon";
import { NextSteps } from "@/components/dashboard/NextSteps";
import { SetupChecklist } from "@/components/dashboard/SetupChecklist";
import { StoreProfile } from "@/components/dashboard/StoreProfile";
import { getMode, isOnboardingComplete } from "@/lib/mode";

// ── Mock data ─────────────────────────────────────────────────

const stats = [
  {
    label: "Sales today",
    value: "EGP 24,180",
    sub: "32 orders · Maadi branch",
    icon: "trending-up" as const,
    color: "#3b82f6",
    trend: "+12%",
    spark: "M0,20 L10,18 L20,15 L30,16 L40,12 L50,14 L60,9 L70,11 L80,6 L90,8 L100,4",
  },
  {
    label: "Products",
    value: "412",
    sub: "38 categories",
    icon: "package" as const,
    color: "#8b5cf6",
    trend: "+4",
    spark: "M0,20 L10,19 L20,18 L30,17 L40,16 L50,15 L60,15 L70,14 L80,13 L90,12 L100,11",
  },
  {
    label: "Low stock",
    value: "7",
    sub: "Below threshold",
    icon: "alert-triangle" as const,
    color: "#f97316",
    trend: "-2",
    spark: "M0,12 L10,14 L20,15 L30,13 L40,16 L50,18 L60,20 L70,19 L80,21 L90,22 L100,24",
  },
  {
    label: "Customers",
    value: "1,284",
    sub: "+86 this month",
    icon: "users" as const,
    color: "#06b6d4",
    trend: "+7%",
    spark: "M0,22 L10,21 L20,19 L30,20 L40,17 L50,18 L60,14 L70,15 L80,11 L90,12 L100,8",
  },
];

type OrderStatus = "Paid" | "Refund" | "Pending";

const orders: {
  id: string;
  customer: string;
  items: number;
  total: string;
  method: string;
  time: string;
  status: OrderStatus;
}[] = [
  { id: "#ORD-10428", customer: "Aya Hassan",   items: 4, total: "EGP 1,240", method: "Visa", time: "12:42", status: "Paid"    },
  { id: "#ORD-10427", customer: "Walk-in",       items: 1, total: "EGP 95",    method: "Cash", time: "12:38", status: "Paid"    },
  { id: "#ORD-10426", customer: "Omar Khaled",   items: 7, total: "EGP 3,610", method: "Visa", time: "12:21", status: "Refund"  },
  { id: "#ORD-10425", customer: "Layla N.",      items: 2, total: "EGP 540",   method: "Mada", time: "12:11", status: "Paid"    },
  { id: "#ORD-10424", customer: "Walk-in",       items: 3, total: "EGP 870",   method: "Cash", time: "11:58", status: "Paid"    },
  { id: "#ORD-10423", customer: "Hany M.",       items: 5, total: "EGP 2,150", method: "Visa", time: "11:42", status: "Pending" },
];

const statusColor: Record<OrderStatus, "emerald" | "rose" | "amber"> = {
  Paid:    "emerald",
  Refund:  "rose",
  Pending: "amber",
};

const lowStock = [
  { name: "Espresso Beans 1kg", sku: "BV-COF-001", stock: 3,  threshold: 10, color: "#f97316" },
  { name: "Oat Milk Carton",    sku: "BV-DRY-014", stock: 5,  threshold: 20, color: "#8b5cf6" },
  { name: "Paper Cups 12oz",    sku: "PK-CUP-12",  stock: 12, threshold: 50, color: "#06b6d4" },
  { name: "Caramel Syrup",      sku: "SY-CRM-04",  stock: 2,  threshold: 8,  color: "#ec4899" },
];

const topProducts = [
  { name: "Iced Latte",        cat: "Beverages", units: 482, revenue: "EGP 18,540", pct: 92, color: "#3b82f6" },
  { name: "Chicken Sandwich",  cat: "Food",      units: 311, revenue: "EGP 14,920", pct: 74, color: "#8b5cf6" },
  { name: "Croissant",         cat: "Bakery",    units: 268, revenue: "EGP 6,432",  pct: 64, color: "#06b6d4" },
  { name: "Cold Brew",         cat: "Beverages", units: 224, revenue: "EGP 9,856",  pct: 53, color: "#ec4899" },
  { name: "Avocado Toast",     cat: "Food",      units: 180, revenue: "EGP 10,800", pct: 43, color: "#10b981" },
];

const hourlyData = [18,22,14,10,8,12,28,42,68,76,90,82,74,65,52,45,38,52,68,84,72,55,38,22];

const quickActions = [
  { label: "Add product",       icon: "package-plus" as const, color: "#3b82f6" },
  { label: "New sale",          icon: "receipt"      as const, color: "#06b6d4" },
  { label: "Add customer",      icon: "user-plus"    as const, color: "#8b5cf6" },
  { label: "Stock adjustment",  icon: "package-search" as const, color: "#f97316" },
  { label: "Daily Z-report",   icon: "file-text"    as const, color: "#10b981" },
];

// ── Component ──────────────────────────────────────────────────

export default function DashboardPage() {
  const [period, setPeriod] = useState("Today");
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const mode = mounted ? getMode() : null;
  const onboardingDone = mounted ? isOnboardingComplete() : false;

  if (!mounted || mode === null) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="card max-w-md p-8 text-center">
          <p className="chip mb-3 text-white/30">{"// getting started"}</p>
          <h2 className="text-2xl font-bold text-white">
            Complete your setup to get started
          </h2>
          <p className="mt-3 text-sm text-white/50">
            Select your shop mode and finish the setup flow to unlock your
            dashboard.
          </p>
          <a
            href="/onboarding"
            className="btn-primary mt-6 inline-block rounded-xl px-6 py-3 text-sm font-semibold text-white"
          >
            Start setup →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!onboardingDone && (
        <div className="mb-4 rounded-xl border border-amber-500/15 bg-amber-500/5 px-4 py-2.5 text-xs text-amber-400/80">
          Setup not complete ·{" "}
          <a
            href="/onboarding"
            className="underline transition-colors hover:text-amber-300"
          >
            Finish setup
          </a>
        </div>
      )}

      {/* ── Header ───────────────────────────────────── */}
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          {/* Breadcrumb */}
          <div className="mb-2 flex items-center gap-1.5 font-mono text-xs text-gray-500">
            <a href="/dashboard" className="transition-colors hover:text-gray-300">Platform</a>
            <Icon name="chevron-right" className="h-3 w-3" />
            <span className="text-gray-300">Shops</span>
            <Icon name="chevron-right" className="h-3 w-3" />
            <span>Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Shops Dashboard
          </h1>
          <p className="mt-1.5 text-sm text-gray-400">
            {new Date().toLocaleDateString("en-GB", { weekday: "long", month: "long", day: "numeric" })}
            {" · Maadi branch · "}
            <span className="font-mono text-[11px] text-amber-400/80">mock data</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Period selector */}
          <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5">
            {["Today", "Week", "Month"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  period === p ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300 transition-colors hover:bg-white/10"
          >
            <Icon name="download" className="h-3.5 w-3.5" /> Export
          </button>
          <button
            type="button"
            className="btn-primary inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold text-white"
          >
            <Icon name="plus" className="h-4 w-4" /> New product
          </button>
        </div>
      </div>

      {/* ── Stat cards ───────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* ── Next steps ───────────────────────────────── */}
      <div className="mt-5">
        <NextSteps />
      </div>

      {/* ── Setup checklist + Store profile ──────────── */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <SetupChecklist />
        <StoreProfile />
      </div>

      {/* ── Quick actions ─────────────────────────────── */}
      <div className="card mt-5 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="chip text-gray-500">{"// quick actions"}</div>
          {quickActions.map((a) => (
            <button
              key={a.label}
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-gray-200 transition-colors hover:bg-white/5"
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-md"
                style={{ background: `${a.color}25`, color: a.color }}
              >
                <Icon name={a.icon} className="h-3.5 w-3.5" strokeWidth={2.2} />
              </span>
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Orders table + Low stock ──────────────────── */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {/* Recent orders table */}
        <div className="card overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between border-b border-white/5 p-5">
            <div>
              <div className="chip mb-1 text-gray-500">{"// recent sales"}</div>
              <h3 className="text-base font-semibold text-white">Today&apos;s transactions</h3>
            </div>
            <a
              href="/reports"
              className="inline-flex items-center gap-1 text-xs text-gray-400 transition-colors hover:text-white"
            >
              View all <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-left font-mono text-[10px] uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-3 font-normal">Order</th>
                  <th className="px-5 py-3 font-normal">Customer</th>
                  <th className="hidden px-5 py-3 font-normal sm:table-cell">Items</th>
                  <th className="px-5 py-3 font-normal">Total</th>
                  <th className="hidden px-5 py-3 font-normal md:table-cell">Method</th>
                  <th className="px-5 py-3 font-normal">Status</th>
                  <th className="px-5 py-3 text-right font-normal">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((o) => (
                  <tr key={o.id} className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-5 py-3.5 font-mono text-xs text-gray-300">{o.id}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-blue-500/50 to-purple-500/50 text-[10px] font-semibold text-white">
                          {o.customer.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                        </div>
                        <span className="text-gray-200">{o.customer}</span>
                      </div>
                    </td>
                    <td className="hidden px-5 py-3.5 text-gray-400 sm:table-cell">{o.items}</td>
                    <td className="px-5 py-3.5 font-semibold text-white">{o.total}</td>
                    <td className="hidden px-5 py-3.5 md:table-cell">
                      <span className="inline-flex items-center gap-1.5 text-gray-300">
                        <Icon
                          name={o.method === "Cash" ? "banknote" : "credit-card"}
                          className="h-3.5 w-3.5 text-gray-500"
                        />
                        {o.method}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge color={statusColor[o.status]}>{o.status}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-xs text-gray-500">{o.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low stock panel */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 p-5">
            <div>
              <div className="chip mb-1 text-amber-400">{"// low stock alert"}</div>
              <h3 className="text-base font-semibold text-white">Reorder soon</h3>
            </div>
            <Badge color="amber">7</Badge>
          </div>
          <div className="divide-y divide-white/5">
            {lowStock.map((p) => {
              const pct = Math.min(100, Math.round((p.stock / p.threshold) * 100));
              return (
                <div key={p.sku} className="flex items-center gap-3 p-4">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-white/10"
                    style={{ background: `${p.color}1f`, color: p.color }}
                  >
                    <Icon name="package" className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-white">{p.name}</div>
                    <div className="font-mono text-[11px] text-gray-500">{p.sku}</div>
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background: pct < 30 ? "#ef4444" : "#f59e0b",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-sm font-semibold text-white">{p.stock}</div>
                    <div className="font-mono text-[10px] text-gray-500">/ {p.threshold}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-t border-white/5 p-4">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] py-2 text-xs font-medium text-gray-200 transition-colors hover:bg-white/5"
            >
              <Icon name="package-plus" className="h-3.5 w-3.5" /> Create reorder draft
            </button>
          </div>
        </div>
      </div>

      {/* ── Top products + Sales by hour ──────────────── */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {/* Top products */}
        <div className="card p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="chip mb-1 text-gray-500">{"// top products"}</div>
              <h3 className="text-base font-semibold text-white">Best sellers this week</h3>
            </div>
            <button type="button" className="text-xs text-gray-400 transition-colors hover:text-white">
              View report
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((p, i) => (
              <div key={p.name}>
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 font-mono text-xs text-gray-500">#{i + 1}</span>
                    <div>
                      <div className="text-sm font-medium text-white">{p.name}</div>
                      <div className="text-[11px] text-gray-500">{p.cat} · {p.units} sold</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-white">{p.revenue}</div>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${p.pct}%`, background: p.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by hour */}
        <div className="card relative overflow-hidden p-5">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
            style={{ background: "#3b82f6", opacity: 0.3 }}
          />
          <div className="relative">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="chip mb-1 text-gray-500">{"// sales by hour"}</div>
                <h3 className="text-base font-semibold text-white">Today&apos;s rhythm</h3>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-blue-500" />Today
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-white/15" />Last Mon
                </span>
              </div>
            </div>

            {/* CSS bar chart */}
            <div className="flex h-44 items-end gap-1.5">
              {hourlyData.map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="flex w-full items-end gap-0.5" style={{ height: "100%" }}>
                    <div
                      className="flex-1 rounded-t"
                      style={{
                        height: `${v}%`,
                        background: "linear-gradient(180deg,#60a5fa,#3b82f6)",
                      }}
                    />
                    <div
                      className="flex-1 rounded-t bg-white/10"
                      style={{ height: `${Math.max(5, v - 12)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Time axis */}
            <div className="mt-2 flex justify-between font-mono text-[10px] text-gray-600">
              <span>00</span><span>06</span><span>12</span><span>18</span><span>24</span>
            </div>

            {/* Summary */}
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/5 pt-5 text-center">
              <div>
                <div className="font-mono text-[10px] uppercase text-gray-500">Peak hour</div>
                <div className="mt-0.5 text-sm font-semibold text-white">10:00</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase text-gray-500">Avg ticket</div>
                <div className="mt-0.5 text-sm font-semibold text-white">EGP 755</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase text-gray-500">vs last week</div>
                <div className="mt-0.5 text-sm font-semibold text-emerald-400">+12.4%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
