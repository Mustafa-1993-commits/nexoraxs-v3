"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Globe, Users, CreditCard, Shield, Trash2, Palette } from "lucide-react";
import { useApp } from "@/lib/store";
import { COUNTRIES, CURRENCIES, TIMEZONES } from "@/lib/store";
import { LocaleToggle } from "@/components/dashboard/LocaleToggle";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";

type Tab = "workspace" | "language" | "appearance" | "team" | "billing" | "advanced";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "workspace", label: "Workspace", icon: <Building2 size={15} /> },
  { id: "language", label: "Language & Region", icon: <Globe size={15} /> },
  { id: "appearance", label: "Appearance", icon: <Palette size={15} /> },
  { id: "team", label: "Team & Access", icon: <Users size={15} /> },
  { id: "billing", label: "Billing", icon: <CreditCard size={15} /> },
  { id: "advanced", label: "Advanced", icon: <Shield size={15} /> },
];

export default function SettingsPage() {
  const { currentWorkspace, currentUser, currentUserDisplayName, showToast } = useApp();
  const [tab, setTab] = useState<Tab>("workspace");
  const [saving, setSaving] = useState(false);
  const [wsName, setWsName] = useState(currentWorkspace?.name ?? "");
  const [country, setCountry] = useState(currentWorkspace?.country ?? "Egypt");
  const [currency, setCurrency] = useState(currentWorkspace?.currency ?? "EGP");
  const [timezone, setTimezone] = useState(currentWorkspace?.timezone ?? "Africa/Cairo");

  function handleSave() {
    setSaving(true);
    setTimeout(() => { setSaving(false); showToast("Workspace settings saved", "success"); }, 600);
  }

  return (
    <div className="nx-page" style={{ paddingBlock: "24px" }}>

        {/* Page header */}
        <div className="nx-page-head">
          <div>
            <h1 className="nx-page-title">Settings</h1>
            <p className="nx-page-sub">Workspace-wide preferences for {currentWorkspace?.name ?? "your workspace"}.</p>
          </div>
        </div>

        {/* Two-column: side-nav + content */}
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, alignItems: "start" }}>

          {/* Side nav */}
          <div className="nx-card" style={{ padding: 6 }}>
            {TABS.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="nx-dd-item"
                style={{
                  borderRadius: 9,
                  background: tab === id ? "var(--accent-weak)" : "transparent",
                  color: tab === id ? "var(--accent)" : "var(--text-2)",
                  fontWeight: tab === id ? 700 : 500,
                  width: "100%",
                  textAlign: "left",
                }}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div>
            {tab === "workspace" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {/* Workspace card */}
                <div className="nx-card nx-card-pad">
                  <div className="nx-section-title" style={{ marginBottom: 18 }}>Workspace</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div className="nx-field" style={{ gridColumn: "1 / -1" }}>
                      <label className="nx-field-label">Workspace name</label>
                      <input className="nx-input" value={wsName} onChange={(e) => setWsName(e.target.value)} placeholder="My Workspace" />
                    </div>
                    <div className="nx-field">
                      <label className="nx-field-label">Country</label>
                      <select className="nx-input" value={country} onChange={(e) => setCountry(e.target.value)}>
                        {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="nx-field">
                      <label className="nx-field-label">Currency</label>
                      <select className="nx-input" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
                      </select>
                    </div>
                    <div className="nx-field" style={{ gridColumn: "1 / -1" }}>
                      <label className="nx-field-label">Timezone</label>
                      <select className="nx-input" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                        {TIMEZONES.map((tz) => <option key={tz} value={tz}>{tz}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ marginTop: 18 }}>
                    <button className="nx-btn nx-btn-primary nx-btn-md" onClick={handleSave} disabled={saving}>
                      {saving ? "Saving…" : "Save changes"}
                    </button>
                  </div>
                </div>

                {/* Account card */}
                <div className="nx-card nx-card-pad">
                  <div className="nx-section-title" style={{ marginBottom: 16 }}>Account</div>
                  <div style={{ display: "grid", gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 11.5, color: "var(--text-3)", marginBottom: 3 }}>Name</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{currentUserDisplayName}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11.5, color: "var(--text-3)", marginBottom: 3 }}>Email</div>
                      <div style={{ fontSize: 13, color: "var(--text)" }}>{currentUser?.email ?? "—"}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === "language" && (
              <div className="nx-card nx-card-pad">
                <div className="nx-section-title" style={{ marginBottom: 18 }}>Language &amp; Region</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 18, borderBottom: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>Interface language</div>
                    <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 3 }}>Switches language and text direction instantly.</div>
                  </div>
                  <LocaleToggle />
                </div>
                <div style={{ paddingTop: 18 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Timezone</div>
                  <select className="nx-input" value={timezone} onChange={(e) => setTimezone(e.target.value)} style={{ maxWidth: 320 }}>
                    {TIMEZONES.map((tz) => <option key={tz} value={tz}>{tz}</option>)}
                  </select>
                </div>
              </div>
            )}

            {tab === "appearance" && (
              <div className="nx-card nx-card-pad">
                <div className="nx-section-title" style={{ marginBottom: 18 }}>Appearance</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>Theme</div>
                    <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 3 }}>Toggle between light and dark mode.</div>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            )}

            {tab === "team" && (
              <div className="nx-card nx-card-pad">
                <div className="nx-section-title" style={{ marginBottom: 8 }}>Team &amp; Access</div>
                <p className="nx-page-sub" style={{ marginBottom: 16 }}>Manage workspace members, roles and OS access permissions.</p>
                <Link href="/dashboard/team" className="nx-btn nx-btn-secondary nx-btn-md" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <Users size={15} />Open Team &amp; Access
                </Link>
              </div>
            )}

            {tab === "billing" && (
              <div className="nx-card nx-card-pad">
                <div className="nx-section-title" style={{ marginBottom: 8 }}>Billing</div>
                <p className="nx-page-sub" style={{ marginBottom: 16 }}>Manage your NexoraXS operating-system subscriptions and platform invoices.</p>
                <Link href="/dashboard/billing" className="nx-btn nx-btn-secondary nx-btn-md" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <CreditCard size={15} />Open Billing
                </Link>
              </div>
            )}

            {tab === "advanced" && (
              <div className="nx-card nx-card-pad">
                <div className="nx-section-title" style={{ marginBottom: 18 }}>Advanced</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--neg)" }}>Delete workspace</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 3 }}>Permanently delete your workspace and all data. This action cannot be undone.</div>
                  </div>
                  <button
                    className="nx-btn nx-btn-md"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--neg)", borderColor: "var(--neg)" }}
                    onClick={() => showToast("Contact support to delete your workspace", "info")}
                  >
                    <Trash2 size={14} />Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
