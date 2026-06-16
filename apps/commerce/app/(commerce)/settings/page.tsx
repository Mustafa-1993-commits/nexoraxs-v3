"use client";

import { useState } from "react";
import Link from "next/link";
import { Settings, Building2, FileText, Tag, Ruler, Printer, ArrowRight, MapPin, Plus, Check, X, CircleAlert } from "lucide-react";
import { useApp } from "@/lib/store";

function branchSlug(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "branch";
}

export default function CommerceSettingsPage() {
  const { getCommerceSetup, currentBU, currentWorkspace, currentBranch, BRANCHES, addBranch, setCurrent, workspaceStorageUsage, storageUsagePercent, storageUsageLabel, showToast, t } = useApp();
  const setup = getCommerceSetup();
  const presetLabel = setup.preset || setup.presetId || "retail";

  const [showAddBranch, setShowAddBranch] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [branchCity, setBranchCity] = useState("");
  const [branchErr, setBranchErr] = useState("");

  function saveBranch() {
    const name = branchName.trim();
    if (!name) {
      setBranchErr("Branch name is required.");
      return;
    }
    addBranch({ name, city: branchCity.trim() || undefined });
    showToast(`Branch "${name}" added.`, "success");
    setBranchName("");
    setBranchCity("");
    setBranchErr("");
    setShowAddBranch(false);
  }

  const sections = [
    { icon: <Building2 size={20} />, title: "Business Identity", desc: "Display name, legal name, contact info and address.", href: "/setup" },
    { icon: <Settings size={20} />, title: "Operational Mode", desc: `Currently: ${setup.mode === "physical" ? "Physical Store" : setup.mode === "online" ? "Online Store" : "Both"}`, href: "/setup" },
    { icon: <FileText size={20} />, title: "Tax & VAT", desc: setup.vatRegistered ? `VAT enabled at ${setup.vatRate}%` : "Not registered for VAT", href: "/setup" },
    { icon: <FileText size={20} />, title: "Numbering", desc: `Invoices: ${setup.invoicePrefix}-${setup.invoiceStart} · Receipts: ${setup.receiptPrefix}-${setup.receiptStart}`, href: "/setup" },
    { icon: <Tag size={20} />, title: "Categories", desc: `${setup.categories?.length || 0} categories configured`, href: "/setup" },
    { icon: <Ruler size={20} />, title: "Units of Measure", desc: ((setup as { units?: string[] }).units || []).join(", ") || "Piece, Box, Pack", href: "/setup" },
    { icon: <Printer size={20} />, title: "Document Templates", desc: `Receipt: ${setup.receiptPrefix || "RCPT"}-${setup.receiptStart || 1001} · Invoice: ${setup.invoicePrefix || "INV"}-${setup.invoiceStart || 1001}`, href: "/settings/documents" },
  ];

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "24px 28px", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 28 }}>
          <div style={{ width: 44, height: 44, borderRadius: "var(--r)", background: "var(--accent-weak)", color: "var(--accent)", display: "grid", placeItems: "center" }}>
            <Settings size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>Commerce Settings</h1>
            <p style={{ fontSize: 13, color: "var(--text-2)", marginTop: 2 }}>{currentBU?.name} · {currentWorkspace?.name}</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {sections.map(({ icon, title, desc, href }) => (
            <Link key={title} href={href} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "16px 18px", display: "flex", gap: 14, alignItems: "center", textDecoration: "none", boxShadow: "var(--sh-sm)" }}>
              <span style={{ color: "var(--accent)", width: 36, height: 36, borderRadius: "var(--r-sm)", background: "var(--accent-weak)", display: "grid", placeItems: "center", flexShrink: 0 }}>{icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{title}</div>
                <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 2 }}>{desc}</div>
              </div>
              <ArrowRight size={16} style={{ color: "var(--text-3)" }} />
            </Link>
          ))}
        </div>

        {workspaceStorageUsage && (
          <div style={{ marginTop: 16, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "16px 18px", boxShadow: "var(--sh-sm)" }}>
            <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 8 }}>Media storage used by this business</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "var(--text-2)" }}>{t("media_storage_used")}</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{storageUsageLabel}</span>
            </div>
            <div className="nx-progress">
              <span style={{ width: `${storageUsagePercent}%`, background: storageUsagePercent > 85 ? "var(--warn)" : undefined }} />
            </div>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 6 }}>{Math.round(storageUsagePercent)}% used</div>
          </div>
        )}

        <div style={{ marginTop: 16, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "16px 18px", boxShadow: "var(--sh-sm)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontWeight: 600, fontSize: 13.5 }}>Branches</div>
            <button
              className="nx-btn nx-btn-secondary nx-btn-sm"
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              onClick={() => { setBranchName(""); setBranchCity(""); setBranchErr(""); setShowAddBranch(true); }}
              data-testid="add-branch-button"
            >
              <Plus size={14} />Add Branch
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }} data-testid="branch-list">
            {BRANCHES.map((br) => (
              <div key={br.id} data-testid="branch-card">
                <button
                  className={"nx-cust-row" + (br.id === currentBranch?.id ? " on" : "")}
                  onClick={() => setCurrent({ currentBranchId: br.id })}
                  data-testid={`branch-card-${branchSlug(br.name)}`}
                >
                  <span className="nx-choice-ic" style={{ width: 32, height: 32 }}><MapPin size={15} /></span>
                  <span style={{ flex: 1, textAlign: "left" }}>
                    <span style={{ display: "block", fontWeight: 700, fontSize: 13.5 }} data-testid="branch-card-name">{br.name}{br.isMain ? " · Main" : ""}</span>
                    {br.city && <span style={{ display: "block", fontSize: 12, color: "var(--text-3)" }} data-testid="branch-card-city">{br.city}</span>}
                  </span>
                  {br.id === currentBranch?.id && <Check size={16} style={{ color: "var(--accent)" }} />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {showAddBranch && (
          <div className="nx-modal-scrim">
            <div className="nx-modal" style={{ maxWidth: 420 }}>
              <div className="nx-modal-head">
                <div>
                  <h3 className="nx-modal-title">Add Branch</h3>
                  <p style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 2 }}>Adds a new branch to {currentBU?.name}.</p>
                </div>
                <button className="nx-icon-btn" onClick={() => setShowAddBranch(false)}><X size={16} /></button>
              </div>
              <div className="nx-modal-body">
                <div className="nx-form-grid">
                  <label className="nx-field">
                    <span className="nx-field-label">Branch name</span>
                    <span className="nx-input-wrap">
                      <MapPin size={16} className="nx-input-icon" />
                      <input className="nx-input" placeholder="e.g. Nasr City" value={branchName} onChange={(e) => { setBranchName(e.target.value); setBranchErr(""); }} autoFocus data-testid="branch-name-input" />
                    </span>
                    {branchErr && <span className="nx-field-error"><CircleAlert size={13} />{branchErr}</span>}
                  </label>
                  <label className="nx-field">
                    <span className="nx-field-label">City<span className="nx-field-optional">Optional</span></span>
                    <span className="nx-input-wrap">
                      <input className="nx-input" placeholder="e.g. Cairo" value={branchCity} onChange={(e) => setBranchCity(e.target.value)} data-testid="branch-city-input" />
                    </span>
                  </label>
                  <div className="nx-row" style={{ gap: 10, marginTop: 4 }}>
                    <button type="button" className="nx-btn nx-btn-ghost nx-btn-md" onClick={() => setShowAddBranch(false)}>Cancel</button>
                    <span className="nx-spacer" />
                    <button type="button" className="nx-btn nx-btn-primary nx-btn-md" onClick={saveBranch} data-testid="save-branch-button"><Check size={15} />Save branch</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 16, background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "16px 18px" }}>
          <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 8 }}>Commerce OS Preset</div>
          <div style={{ fontSize: 13, color: "var(--text-2)" }}>
            Your Commerce OS is configured for <strong>{presetLabel}</strong>. To change the preset, re-run the setup wizard.
          </div>
          <Link href="/setup" className="nx-btn" style={{ display: "inline-flex", marginTop: 12, textDecoration: "none", gap: 8, alignItems: "center", fontSize: 13, padding: "8px 14px" }}>
            Re-run Setup Wizard
          </Link>
        </div>
      </div>
    </div>
  );
}
