"use client";

import Link from "next/link";
import { Settings, Building2, FileText, Tag, Ruler, Printer, ArrowRight } from "lucide-react";
import { useApp } from "@/lib/store";

export default function CommerceSettingsPage() {
  const { getCommerceSetup, currentBU, currentWorkspace } = useApp();
  const setup = getCommerceSetup();
  const presetLabel = setup.preset || setup.presetId || "retail";

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

        <div style={{ marginTop: 28, background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "16px 18px" }}>
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
