"use client";

import { useState } from "react";
import Link from "next/link";
import { Store, Building2, MapPin, Users, Info, ArrowUpCircle, Download, Ellipsis } from "lucide-react";
import { useApp, OPERATING_SYSTEMS } from "@/lib/store";

const OS_ICON_MAP: Record<string, React.ReactNode> = {
  store: <Store size={18} />,
  "building-2": <Building2 size={18} />,
  "map-pin": <MapPin size={18} />,
  users: <Users size={18} />,
};

export default function BillingPage() {
  const {
    currentUser,
    currentWorkspace,
    BUSINESS_UNITS,
    BRANCHES,
    COMMERCE_PLAN,
    showToast,
    getCommerceSetup,
    money,
    workspaceStorageUsage,
    storageUsagePercent,
    storageUsageLabel,
    t,
  } = useApp();

  const setup = getCommerceSetup();

  const [billingName, setBillingName] = useState(currentWorkspace?.name ?? "");
  const [billingEmail, setBillingEmail] = useState(currentUser?.email ?? "billing@company.com");
  const [billingAddress, setBillingAddress] = useState(
    setup.address ? `${setup.address}${setup.city ? `, ${setup.city}` : ""}` : ""
  );
  const [taxNumber, setTaxNumber] = useState(setup.taxNumber ?? "");
  const [billingCountry, setBillingCountry] = useState(currentWorkspace?.country ?? "Egypt");

  const lim = COMMERCE_PLAN?.limits;
  const buUsed = BUSINESS_UNITS.length;
  const brUsed = BRANCHES.length;
  const usersUsed = 1;

  const planTier = COMMERCE_PLAN?.name ?? "Starter";
  const planName = `Commerce OS ${planTier}`;
  const total = COMMERCE_PLAN?.total ?? 0;
  const net = total > 0 ? total / 1.14 : 0;
  const vat = total - net;
  const billingCycle = COMMERCE_PLAN?.status === "trialing" ? "Trial" : "Monthly";

  const platformInvoices = COMMERCE_PLAN
    ? [
        { num: "NX-2026-0006", date: "28 May 2026", plan: `${planTier} · ${billingCycle}`, total, status: COMMERCE_PLAN.status === "trialing" ? "Trialing" : "Paid" },
        { num: "NX-2026-0005", date: "28 Apr 2026", plan: `${planTier} · Monthly`, total, status: "Paid" },
        { num: "NX-2026-0004", date: "28 Mar 2026", plan: `${planTier} · Monthly`, total, status: "Paid" },
        { num: "NX-2026-0003", date: "28 Feb 2026", plan: `${planTier} · Monthly`, total, status: "Paid" },
      ]
    : [];

  const otherOS = OPERATING_SYSTEMS.filter((o) => o.id !== "commerce");

  return (
    <div className="nx-main-scroll">
      <div className="nx-page" style={{ paddingBlock: "24px" }}>

        {/* Page header */}
        <div className="nx-page-head">
          <div>
            <h1 className="nx-page-title">Billing &amp; subscriptions</h1>
            <p className="nx-page-sub">Manage your NexoraXS plans, payment method and platform invoices.</p>
          </div>
        </div>

        {/* Info banner */}
        <div className="nx-helper" style={{ marginBottom: 22, maxWidth: "none" }}>
          <Info size={16} />
          These are <b style={{ margin: "0 4px" }}>platform subscriptions</b> billed by NexoraXS to {currentWorkspace?.name ?? "your workspace"} — separate from the sales invoices your Commerce OS issues to its customers.
        </div>

        {COMMERCE_PLAN && lim ? (
          <>
            {/* Active subscription card */}
            <div className="nx-card" style={{ padding: 0, overflow: "hidden", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 16, padding: 22, alignItems: "center", flexWrap: "wrap" }}>
                <span className="nx-os-ic" style={{ background: "var(--accent-weak)", color: "var(--accent)" }}>
                  <Store size={22} />
                </span>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div className="nx-row" style={{ gap: 8 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>{planName} Plan</h3>
                    <span className={`nx-badge ${COMMERCE_PLAN.status === "trialing" ? "tone-warn" : "tone-pos"}`} style={{ fontSize: 11 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
                      {COMMERCE_PLAN.status === "trialing" ? "Trial" : "Active"}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-2)", marginTop: 3 }}>
                    {COMMERCE_PLAN.status === "trialing" ? "Trial ends" : "Renews"} {COMMERCE_PLAN.renew} · Visa ending 4242
                  </p>
                </div>
                <div style={{ textAlign: "end" }}>
                  <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--mono)" }}>{money(total)}</div>
                  <div style={{ fontSize: 12, color: "var(--text-3)" }}>per month · incl. {money(vat)} VAT</div>
                </div>
                <div className="nx-row" style={{ gap: 8 }}>
                  <button className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => showToast("Upgrade flow coming soon", "info")}>Change plan</button>
                  <button className="nx-icon-btn" onClick={() => showToast("Subscription management coming soon", "info")}>
                    <Ellipsis size={16} />
                  </button>
                </div>
              </div>

              {/* 4-col summary grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid var(--border)" }}>
                {[["Plan", planName], ["Billing cycle", billingCycle], ["Net", money(net)], ["VAT (14%)", money(vat)]].map(([k, v], i) => (
                  <div key={k} style={{ padding: 16, borderInlineStart: i ? "1px solid var(--border)" : "none" }}>
                    <div style={{ fontSize: 11.5, color: "var(--text-3)", fontWeight: 600 }}>{k}</div>
                    <div style={{ fontWeight: 700, marginTop: 4, fontSize: 14 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan limits */}
            <div className="nx-card nx-card-pad" style={{ marginBottom: 20 }}>
              <div className="nx-row" style={{ justifyContent: "space-between", marginBottom: 16 }}>
                <div className="nx-section-title">Plan limits · {planName}</div>
                <Link href="/dashboard/apps" className="nx-link" style={{ fontSize: 12.5, textDecoration: "none" }}>View usage in Product Hub</Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
                {[
                  { label: "Businesses", icon: <Building2 size={15} />, used: buUsed, max: lim.businessUnits },
                  { label: "Branches", icon: <MapPin size={15} />, used: brUsed, max: lim.branches },
                  { label: "Team users", icon: <Users size={15} />, used: usersUsed, max: lim.users },
                ].map(({ label, icon, used, max }) => {
                  const pct = max === 99 ? 10 : Math.min(100, (used / max) * 100);
                  const overThresh = pct > 85;
                  return (
                    <div key={label}>
                      <div className="nx-row" style={{ gap: 8, marginBottom: 9, color: "var(--text-3)" }}>
                        {icon}
                        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)" }}>{label}</span>
                      </div>
                      <div className="nx-row" style={{ justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 18, fontWeight: 700, fontFamily: "var(--mono)" }}>
                          {used}<span style={{ color: "var(--text-3)", fontSize: 13 }}> / {max === 99 ? "∞" : max}</span>
                        </span>
                        <span style={{ fontSize: 11.5, color: "var(--text-3)" }}>{max === 99 ? "unlimited" : `${max - used} left`}</span>
                      </div>
                      <div className="nx-progress">
                        <span style={{ width: `${pct}%`, background: overThresh ? "var(--warn)" : "var(--accent)" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="nx-helper" style={{ marginTop: 18 }}>
                <ArrowUpCircle size={16} />Need more businesses or branches? Upgrade to <b style={{ margin: "0 4px" }}>Commerce Business</b> for custom limits and advanced permissions.
              </div>
            </div>

            {workspaceStorageUsage && (
              <div className="nx-card nx-card-pad" style={{ marginBottom: 20 }}>
                <div className="nx-row" style={{ justifyContent: "space-between", marginBottom: 12 }}>
                  <div className="nx-section-title">{t("storage_used")}</div>
                  <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--mono)" }}>{storageUsageLabel}</span>
                </div>
                <div className="nx-progress">
                  <span style={{ width: `${storageUsagePercent}%`, background: storageUsagePercent > 85 ? "var(--warn)" : "var(--accent)" }} />
                </div>
              </div>
            )}

            {/* Add more OS */}
            <div className="nx-section-title" style={{ marginBottom: 12 }}>Add more operating systems</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14, marginBottom: 26 }}>
              {otherOS.map((os) => (
                <div key={os.id} className="nx-card nx-card-pad" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="nx-os-ic" style={{ width: 38, height: 38, background: `${os.accent}18`, color: os.accent }}>
                    {OS_ICON_MAP[os.icon] ?? <Store size={18} />}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{os.name}</div>
                    <span className="nx-badge tone-neutral" style={{ fontSize: 11, marginTop: 4 }}>Coming Soon</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Billing details + Latest invoice */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 20, marginBottom: 26 }}>
              <div className="nx-card nx-card-pad">
                <div className="nx-section-title" style={{ marginBottom: 14 }}>Billing details</div>
                <div className="nx-form-grid">
                  <div className="nx-field">
                    <label className="nx-field-label">Billing name</label>
                    <input className="nx-input" value={billingName} onChange={(e) => setBillingName(e.target.value)} />
                  </div>
                  <div className="nx-field">
                    <label className="nx-field-label">Billing email</label>
                    <input className="nx-input" type="email" value={billingEmail} onChange={(e) => setBillingEmail(e.target.value)} />
                  </div>
                  <div className="nx-field">
                    <label className="nx-field-label">Address</label>
                    <input className="nx-input" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div className="nx-field">
                      <label className="nx-field-label">Tax number <span style={{ color: "var(--text-3)", fontWeight: 400 }}>(optional)</span></label>
                      <input className="nx-input" value={taxNumber} onChange={(e) => setTaxNumber(e.target.value)} placeholder="EGP-123456" />
                    </div>
                    <div className="nx-field">
                      <label className="nx-field-label">Country</label>
                      <select className="nx-input" value={billingCountry} onChange={(e) => setBillingCountry(e.target.value)}>
                        {["Egypt", "Saudi Arabia", "United Arab Emirates"].map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <button className="nx-btn nx-btn-secondary nx-btn-sm" style={{ alignSelf: "flex-start" }} onClick={() => showToast("Billing details saved", "success")}>
                    Save details
                  </button>
                </div>
              </div>

              {/* Latest platform invoice preview */}
              <div>
                <div className="nx-section-title" style={{ marginBottom: 14 }}>Latest platform invoice</div>
                <div className="nx-card" style={{ padding: 22, background: "var(--surface-2)" }}>
                  <div className="nx-row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-.04em", color: "var(--accent)" }}>NexoraXS</span>
                      <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 8 }}>nexoraxs.com</div>
                    </div>
                    <div style={{ textAlign: "end" }}>
                      <div style={{ fontWeight: 800, fontSize: 15, color: "var(--accent)" }}>Subscription Invoice</div>
                      <div style={{ fontSize: 12, color: "var(--text-2)", fontFamily: "var(--mono)" }}>NX-2026-0006</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", margin: "18px 0", fontSize: 12.5 }}>
                    <div><div style={{ color: "var(--text-3)" }}>Billed to</div><b>{currentWorkspace?.name}</b></div>
                    <div style={{ textAlign: "end" }}><div style={{ color: "var(--text-3)" }}>Date</div><b>28 May 2026</b></div>
                  </div>
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      [`${planName} (${COMMERCE_PLAN.status === "trialing" ? "trial" : "monthly"})`, money(net)],
                      ["VAT (14%)", money(vat)],
                    ].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                        <span style={{ color: "var(--text-2)" }}>{k}</span>
                        <span style={{ fontFamily: "var(--mono)" }}>{v}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, borderTop: "2px solid var(--border-strong, var(--border))", paddingTop: 10, marginTop: 4 }}>
                      <span>Total</span>
                      <span style={{ fontFamily: "var(--mono)" }}>{money(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform invoices table */}
            <div className="nx-section-title" style={{ margin: "0 0 12px" }}>Platform invoices</div>
            <div className="nx-table-wrap">
              <table className="nx-table">
                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Date</th>
                    <th>Operating system</th>
                    <th>Plan</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {platformInvoices.map((inv) => (
                    <tr key={inv.num}>
                      <td className="nx-td-strong" style={{ fontFamily: "var(--mono)" }}>{inv.num}</td>
                      <td className="nx-td-muted">{inv.date}</td>
                      <td>Commerce OS</td>
                      <td className="nx-td-muted">{inv.plan}</td>
                      <td style={{ fontFamily: "var(--mono)", fontWeight: 600 }}>{money(inv.total)}</td>
                      <td>
                        <span className="nx-badge tone-pos" style={{ fontSize: 11 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
                          {inv.status}
                        </span>
                      </td>
                      <td>
                        <button className="nx-icon-btn" onClick={() => showToast("Invoice download coming soon", "info")}>
                          <Download size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="nx-card" style={{ padding: "40px 32px", textAlign: "center" }}>
            <div style={{ width: 60, height: 60, borderRadius: "var(--r-lg)", background: "var(--accent-weak)", color: "var(--accent)", display: "grid", placeItems: "center", margin: "0 auto 20px" }}>
              <Store size={28} />
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>No active subscription</div>
            <p style={{ fontSize: 13, color: "var(--text-2)", maxWidth: 340, margin: "0 auto 20px" }}>
              Complete onboarding to activate your Commerce OS plan and view billing details here.
            </p>
            <button className="nx-btn nx-btn-primary nx-btn-md" onClick={() => showToast("Complete onboarding to activate a plan", "info")}>
              Get started
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
