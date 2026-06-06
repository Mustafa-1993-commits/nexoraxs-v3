"use client";

import { useState } from "react";
import { Search, Users, Plus, X } from "lucide-react";
import { useApp } from "@/lib/store";

export default function CustomersPage() {
  const { customers, createCustomer, showToast } = useApp();
  const [q, setQ] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });

  const filtered = customers.filter((c) => !q || c.name.toLowerCase().includes(q.toLowerCase()) || (c.phone || "").includes(q) || (c.email || "").toLowerCase().includes(q.toLowerCase())).slice().reverse();

  function handleAdd() {
    if (!form.name.trim()) { showToast("Name is required", "warn"); return; }
    createCustomer(form);
    showToast("Customer added", "success");
    setForm({ name: "", phone: "", email: "", notes: "" });
    setShowAdd(false);
  }

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>Customers</h1>
          <button className="nx-btn-primary" onClick={() => setShowAdd(true)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 16px" }}>
            <Plus size={16} />Add Customer
          </button>
        </div>
        <div style={{ position: "relative", marginBottom: 18 }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-3)" }} />
          <input className="nx-input" style={{ paddingLeft: 32, fontSize: 13, maxWidth: 360 }} placeholder="Search by name, phone, email…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 24px", color: "var(--text-3)" }}>
            <Users size={40} style={{ opacity: 0.3, display: "block", margin: "0 auto 12px" }} />
            <div style={{ fontWeight: 600 }}>{customers.length === 0 ? "No customers yet" : "No customers match your search"}</div>
            {customers.length === 0 && <button className="nx-btn-primary" onClick={() => setShowAdd(true)} style={{ marginTop: 12 }}>Add first customer</button>}
          </div>
        ) : (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
                  {["Name", "Phone", "Email", "Added"].map((h) => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--text-2)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "11px 14px", fontWeight: 600, fontSize: 13 }}>{c.name}</td>
                    <td style={{ padding: "11px 14px", fontSize: 12.5, color: "var(--text-2)" }}>{c.phone || "—"}</td>
                    <td style={{ padding: "11px 14px", fontSize: 12.5, color: "var(--text-2)" }}>{c.email || "—"}</td>
                    <td style={{ padding: "11px 14px", fontSize: 12, color: "var(--text-3)" }}>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAdd && (
        <div style={{ position: "fixed", inset: 0, background: "#0006", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}>
          <div style={{ background: "var(--surface)", borderRadius: "var(--r-lg)", padding: 28, width: "100%", maxWidth: 400 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontWeight: 700 }}>Add Customer</h3>
              <button onClick={() => setShowAdd(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} /></button>
            </div>
            <div className="nx-form-grid">
              <Field label="Full name *"><input className="nx-input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Ahmed Hassan" autoFocus /></Field>
              <Field label="Phone"><input className="nx-input" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="01000000000" /></Field>
              <Field label="Email"><input className="nx-input" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="ahmed@email.com" /></Field>
              <Field label="Notes"><textarea className="nx-input" rows={2} value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} placeholder="Optional notes…" /></Field>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
              <button className="nx-btn" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="nx-btn-primary" onClick={handleAdd}>Add customer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="nx-field"><label className="nx-field-label">{label}</label>{children}</div>;
}
