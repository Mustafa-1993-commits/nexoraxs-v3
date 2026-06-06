"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, FileText, Edit2, Check, X } from "lucide-react";
import { useApp } from "@/lib/store";

export default function CustomerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { customers, orders, money, updateCustomer, showToast } = useApp();

  const customer = customers.find((c) => c.id === id);
  const customerOrders = orders.filter((o) => o.customerId === id).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: customer?.name ?? "",
    phone: customer?.phone ?? "",
    email: customer?.email ?? "",
    notes: customer?.notes ?? "",
  });

  if (!customer) {
    return (
      <div className="nx-main-scroll">
        <div style={{ padding: "40px 28px", textAlign: "center", color: "var(--text-3)" }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Customer not found</div>
          <Link href="/customers" style={{ color: "var(--accent)", fontSize: 13 }}>
            ← Back to Customers
          </Link>
        </div>
      </div>
    );
  }

  const lifetimeSpend = customerOrders.reduce((s, o) => s + o.total, 0);
  const firstOrder = customerOrders.length > 0 ? customerOrders[customerOrders.length - 1] : null;
  const lastOrder = customerOrders.length > 0 ? customerOrders[0] : null;

  function handleSave() {
    if (!form.name.trim()) { showToast("Name is required", "warn"); return; }
    updateCustomer(id, form);
    showToast("Customer updated", "success");
    setEditing(false);
  }

  function handleCancel() {
    if (!customer) return;
    setForm({ name: customer.name, phone: customer.phone, email: customer.email, notes: customer.notes });
    setEditing(false);
  }

  const initials = customer.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "24px 28px", maxWidth: 900, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <Link href="/customers" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--text-2)", textDecoration: "none", marginBottom: 20 }}>
          <ArrowLeft size={13} />Customers
        </Link>

        {/* Profile header */}
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--accent)", color: "#fff", display: "grid", placeItems: "center", fontSize: 26, fontWeight: 800, flexShrink: 0 }}>
            {initials}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 4 }}>{customer.name}</h1>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {customer.phone && (
                <span style={{ display: "flex", gap: 5, alignItems: "center", fontSize: 13, color: "var(--text-2)" }}>
                  <Phone size={13} />{customer.phone}
                </span>
              )}
              {customer.email && (
                <span style={{ display: "flex", gap: 5, alignItems: "center", fontSize: 13, color: "var(--text-2)" }}>
                  <Mail size={13} />{customer.email}
                </span>
              )}
            </div>
          </div>
          <button
            className={editing ? "nx-btn" : "nx-btn-primary"}
            style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, padding: "8px 14px" }}
            onClick={() => setEditing((e) => !e)}
          >
            <Edit2 size={13} />{editing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 24 }}>
          {[
            { label: "Lifetime Spend", value: money(lifetimeSpend) },
            { label: "Total Orders", value: String(customerOrders.length) },
            { label: "First Order", value: firstOrder ? new Date(firstOrder.createdAt).toLocaleDateString("en-GB") : "—" },
            { label: "Last Order", value: lastOrder ? new Date(lastOrder.createdAt).toLocaleDateString("en-GB") : "—" },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "14px 16px" }}>
              <div style={{ fontSize: 11.5, color: "var(--text-3)", marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text)" }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Edit form / contact details */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "20px 22px" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Contact Details</div>
            {editing ? (
              <div className="nx-form-grid">
                <div className="nx-field">
                  <label className="nx-field-label">Name *</label>
                  <input className="nx-input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="nx-field">
                  <label className="nx-field-label">Phone</label>
                  <input className="nx-input" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+20 XXX XXX XXXX" />
                </div>
                <div className="nx-field">
                  <label className="nx-field-label">Email</label>
                  <input className="nx-input" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="customer@example.com" />
                </div>
                <div className="nx-field">
                  <label className="nx-field-label">Notes</label>
                  <textarea className="nx-input" rows={3} value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} style={{ resize: "vertical" }} />
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="nx-btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }} onClick={handleSave}>
                    <Check size={13} />Save
                  </button>
                  <button className="nx-btn" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }} onClick={handleCancel}>
                    <X size={13} />Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Phone", value: customer.phone || "—", icon: <Phone size={13} /> },
                  { label: "Email", value: customer.email || "—", icon: <Mail size={13} /> },
                  { label: "Notes", value: customer.notes || "—", icon: <FileText size={13} /> },
                ].map(({ label, value, icon }) => (
                  <div key={label}>
                    <div style={{ fontSize: 11.5, color: "var(--text-3)", marginBottom: 3, display: "flex", gap: 5, alignItems: "center" }}>{icon}{label}</div>
                    <div style={{ fontSize: 13, color: "var(--text)" }}>{value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent orders */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "20px 22px" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Order History</div>
            {customerOrders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "30px 0", color: "var(--text-3)", fontSize: 13 }}>No orders yet</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {customerOrders.map((o) => (
                  <div key={o.id} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{o.orderNumber}</div>
                      <div style={{ fontSize: 11.5, color: "var(--text-3)" }}>
                        {new Date(o.createdAt).toLocaleDateString("en-GB")} · {o.items.length} item{o.items.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--pos)" }}>{money(o.total)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
