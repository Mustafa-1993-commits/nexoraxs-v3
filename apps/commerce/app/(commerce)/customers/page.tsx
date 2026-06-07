"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Users, Plus, X, Phone, Mail, ChevronRight, ShoppingBag, UserRound } from "lucide-react";
import { useApp, type CommerceCustomer, type CommerceOrder } from "@/lib/store";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

type CustomerTagInfo = { label: "VIP" | "Regular" | "New"; tone: "warn" | "accent" | "neutral" };

function customerTag(count: number, spent: number): CustomerTagInfo {
  if (spent >= 10000 || count >= 10) return { label: "VIP", tone: "warn" };
  if (count >= 2) return { label: "Regular", tone: "accent" };
  return { label: "New", tone: "neutral" };
}

export default function CustomersPage() {
  const router = useRouter();
  const { customers, orders, createCustomer, showToast, money } = useApp();
  const [q, setQ] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
  const [selected, setSelected] = useState<CommerceCustomer | null>(null);

  const customerMetrics = useMemo(() => {
    const map: Record<string, { count: number; spent: number }> = {};
    orders.forEach((o) => {
      if (!o.customerId) return;
      if (!map[o.customerId]) map[o.customerId] = { count: 0, spent: 0 };
      map[o.customerId].count++;
      map[o.customerId].spent += o.total || 0;
    });
    return map;
  }, [orders]);

  const activeThisMonth = useMemo(() => {
    const start = new Date();
    start.setDate(1); start.setHours(0, 0, 0, 0);
    return new Set(orders.filter((o) => o.customerId && new Date(o.createdAt) >= start).map((o) => o.customerId)).size;
  }, [orders]);

  const newThisWeek = useMemo(() => {
    const start = new Date();
    start.setDate(start.getDate() - 6); start.setHours(0, 0, 0, 0);
    return customers.filter((c) => c.createdAt && new Date(c.createdAt) >= start).length;
  }, [customers]);

  const filtered = customers.filter((c) => !q || c.name.toLowerCase().includes(q.toLowerCase()) || (c.phone || "").includes(q) || (c.email || "").toLowerCase().includes(q.toLowerCase())).slice().reverse();

  function handleAdd() {
    if (!form.name.trim()) { showToast("Name is required", "warn"); return; }
    createCustomer(form);
    showToast("Customer added", "success");
    setForm({ name: "", phone: "", email: "", notes: "" });
    setShowAdd(false);
  }

  function viewProfile(id: string) {
    setSelected(null);
    router.push(`/customers/${id}`);
  }

  return (
    <div className="nx-main-scroll">
      <div className="nx-page">
        <div className="nx-page-head">
          <div>
            <h1 className="nx-page-title">Customers</h1>
            <p className="nx-page-sub">Created automatically from POS sales</p>
          </div>
          <button className="nx-btn nx-btn-primary nx-btn-md" onClick={() => setShowAdd(true)}>
            <Plus size={15} />Add Customer
          </button>
        </div>

        {/* KPI summary row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14, marginBottom: 20 }}>
          {[
            { label: "Total customers", value: customers.length },
            { label: "Active this month", value: activeThisMonth },
            { label: "New this week", value: newThisWeek },
          ].map(({ label, value }) => (
            <div key={label} className="nx-card nx-card-pad">
              <div style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 600, marginBottom: 6 }}>{label}</div>
              <div className="num" style={{ fontSize: 24, fontWeight: 800 }}>{value}</div>
            </div>
          ))}
        </div>

        <div className="nx-filterbar">
          <div style={{ flex: 1, maxWidth: 340 }}>
            <span className="nx-input-wrap">
              <Search size={16} className="nx-input-icon" />
              <input className="nx-input" placeholder="Search name, phone or email…" value={q} onChange={(e) => setQ(e.target.value)} />
            </span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="nx-card nx-card-pad">
            <div className="nx-empty">
              <div className="nx-empty-ic"><Users size={26} /></div>
              <h3 className="nx-empty-title">{customers.length === 0 ? "No customers yet" : "No customers match your search"}</h3>
              <p className="nx-empty-desc">
                {customers.length === 0
                  ? "Add a customer during POS checkout and they'll appear here with full order history. Walk-in sales stay anonymous."
                  : "Try a different name, phone or email."}
              </p>
              {customers.length === 0 && (
                <div style={{ marginTop: 18 }}>
                  <button className="nx-btn nx-btn-primary nx-btn-md" onClick={() => setShowAdd(true)}><Plus size={15} />Add Customer</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="nx-table-wrap">
            <table className="nx-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Tag</th>
                  <th>Orders</th>
                  <th>Total spent</th>
                  <th>Since</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const m = customerMetrics[c.id] || { count: 0, spent: 0 };
                  const tag = customerTag(m.count, m.spent);
                  return (
                    <tr key={c.id} style={{ cursor: "pointer" }} onClick={() => setSelected(c)}>
                      <td><div className="nx-row" style={{ gap: 10 }}><Avatar name={c.name} size={32} /><span className="nx-td-strong">{c.name}</span></div></td>
                      <td className="nx-td-muted" style={{ fontSize: 12.5 }}>{c.phone || c.email || "—"}</td>
                      <td><Badge tone={tag.tone}>{tag.label}</Badge></td>
                      <td className="num">{m.count}</td>
                      <td className="num nx-td-strong">{m.spent > 0 ? money(m.spent) : "—"}</td>
                      <td className="nx-td-muted">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}</td>
                      <td>
                        <button className="nx-icon-btn" aria-label="View customer" onClick={(e) => { e.stopPropagation(); setSelected(c); }}>
                          <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAdd && (
        <div className="nx-modal-scrim">
          <div className="nx-modal" style={{ maxWidth: 400 }}>
            <div className="nx-modal-head">
              <h3 className="nx-modal-title">Add Customer</h3>
              <button className="nx-icon-btn" onClick={() => setShowAdd(false)}><X size={18} /></button>
            </div>
            <div className="nx-modal-body">
              <div className="nx-form-grid">
                <Field label="Full name *"><input className="nx-input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Ahmed Hassan" autoFocus /></Field>
                <Field label="Phone"><input className="nx-input" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="01000000000" /></Field>
                <Field label="Email"><input className="nx-input" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="ahmed@email.com" /></Field>
                <Field label="Notes"><textarea className="nx-input" rows={2} value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} placeholder="Optional notes…" /></Field>
              </div>
            </div>
            <div className="nx-modal-foot">
              <button className="nx-btn" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="nx-btn-primary" onClick={handleAdd}>Add customer</button>
            </div>
          </div>
        </div>
      )}

      <CustomerDrawer
        customer={selected}
        orders={orders}
        metrics={selected ? (customerMetrics[selected.id] || { count: 0, spent: 0 }) : { count: 0, spent: 0 }}
        money={money}
        onClose={() => setSelected(null)}
        onViewProfile={viewProfile}
      />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="nx-field"><label className="nx-field-label">{label}</label>{children}</div>;
}

function CustomerDrawer({
  customer, orders, metrics, money, onClose, onViewProfile,
}: {
  customer: CommerceCustomer | null;
  orders: CommerceOrder[];
  metrics: { count: number; spent: number };
  money: (n: number) => string;
  onClose: () => void;
  onViewProfile: (id: string) => void;
}) {
  if (!customer) return null;
  const tag = customerTag(metrics.count, metrics.spent);
  const recent = orders
    .filter((o) => o.customerId === customer.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);
  const since = customer.createdAt ? new Date(customer.createdAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "—";

  return (
    <div className="nx-drawer-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="nx-drawer nx-drawer-in">
        <div className="nx-drawer-head">
          <div className="nx-row" style={{ gap: 12 }}>
            <Avatar name={customer.name} size={46} />
            <div>
              <div className="nx-row" style={{ gap: 8 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800 }}>{customer.name}</h3>
                <Badge tone={tag.tone}>{tag.label}</Badge>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--text-3)" }}>Customer since {since} · from POS</div>
            </div>
          </div>
          <button className="nx-icon-btn" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="nx-drawer-body">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
            <div className="nx-card" style={{ padding: 14 }}>
              <div style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 600 }}>Total orders</div>
              <div className="num" style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>{metrics.count}</div>
            </div>
            <div className="nx-card" style={{ padding: 14 }}>
              <div style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 600 }}>Total spent</div>
              <div className="num" style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>{money(metrics.spent)}</div>
            </div>
          </div>

          <div className="nx-section-title" style={{ marginBottom: 10 }}>Contact</div>
          <div className="nx-card" style={{ padding: 0, marginBottom: 20 }}>
            <div className="nx-cust-detail"><Phone size={15} /><span>{customer.phone || "No phone on file"}</span></div>
            <div className="nx-cust-detail"><Mail size={15} /><span>{customer.email || "No email on file"}</span></div>
          </div>

          <div className="nx-row" style={{ justifyContent: "space-between", marginBottom: 10 }}>
            <div className="nx-section-title">Recent orders</div>
            {metrics.count > 3 && <span style={{ fontSize: 12, color: "var(--text-3)" }}>Latest 3 of {metrics.count}</span>}
          </div>
          {recent.length === 0 ? (
            <div className="nx-empty" style={{ padding: "24px 0" }}>
              <div className="nx-empty-ic"><ShoppingBag size={22} /></div>
              <h3 className="nx-empty-title" style={{ fontSize: 13.5 }}>No orders</h3>
              <p className="nx-empty-desc">This customer has no linked sales yet.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {recent.map((o) => (
                <div key={o.id} className="nx-cust-order">
                  <div style={{ flex: 1, textAlign: "start" }}>
                    <div className="num" style={{ fontWeight: 700, fontSize: 13 }}>{o.orderNumber}</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)" }}>
                      {new Date(o.createdAt).toLocaleDateString("en-GB")} · {o.payment} · {o.items.length} {o.items.length === 1 ? "item" : "items"}
                    </div>
                  </div>
                  <span className="num" style={{ fontWeight: 700 }}>{money(o.total)}</span>
                </div>
              ))}
            </div>
          )}

          <button className="nx-btn nx-btn-primary nx-btn-full" style={{ marginTop: 18 }} onClick={() => onViewProfile(customer.id)}>
            <UserRound size={15} />View full profile
          </button>
        </div>
      </div>
    </div>
  );
}
