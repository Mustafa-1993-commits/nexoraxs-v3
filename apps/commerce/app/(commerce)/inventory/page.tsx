"use client";

import { useState } from "react";
import { Search, Package, AlertTriangle, X } from "lucide-react";
import { useApp } from "@/lib/store";
import { type CommerceProduct } from "@/lib/store";

export default function InventoryPage() {
  const { products, updateProduct, money, showToast } = useApp();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "low" | "out">("all");
  const [editing, setEditing] = useState<CommerceProduct | null>(null);
  const [newStock, setNewStock] = useState("");

  const filtered = products.filter((p) => {
    const matchQ = !q || p.name.toLowerCase().includes(q.toLowerCase()) || (p.sku || "").toLowerCase().includes(q.toLowerCase());
    if (!matchQ) return false;
    if (filter === "out") return (p.stock ?? 99) === 0;
    if (filter === "low") return (p.stock ?? 99) > 0 && (p.stock ?? 99) <= (p.lowStockThreshold || 5);
    return true;
  });

  function handleUpdateStock() {
    if (!editing) return;
    updateProduct(editing.id, { stock: +newStock });
    showToast("Stock updated", "success");
    setEditing(null);
  }

  const outCount = products.filter((p) => (p.stock ?? 99) === 0).length;
  const lowCount = products.filter((p) => (p.stock ?? 99) > 0 && (p.stock ?? 99) <= (p.lowStockThreshold || 5)).length;

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 16 }}>Inventory</h1>

        {(outCount > 0 || lowCount > 0) && (
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            {outCount > 0 && (
              <div style={{ background: "var(--danger-weak)", border: "1px solid var(--danger)", borderRadius: "var(--r)", padding: "12px 16px", display: "flex", gap: 10, alignItems: "center", flex: 1, minWidth: 180 }}>
                <AlertTriangle size={16} style={{ color: "var(--danger)" }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--danger)" }}>{outCount} out of stock</span>
              </div>
            )}
            {lowCount > 0 && (
              <div style={{ background: "var(--warn-weak)", border: "1px solid var(--warn)", borderRadius: "var(--r)", padding: "12px 16px", display: "flex", gap: 10, alignItems: "center", flex: 1, minWidth: 180 }}>
                <AlertTriangle size={16} style={{ color: "var(--warn)" }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{lowCount} running low</span>
              </div>
            )}
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-3)" }} />
            <input className="nx-input" style={{ paddingLeft: 32, fontSize: 13 }} placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <div className="nx-seg">
            {(["all", "low", "out"] as const).map((f) => (
              <button key={f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
                {f === "all" ? "All" : f === "low" ? "Low stock" : "Out of stock"}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="nx-empty">
            <div className="nx-empty-ic"><Package size={24} /></div>
            <div className="nx-empty-title">No products match your filter</div>
            <div className="nx-empty-desc">Try switching to &quot;All&quot; or adjusting your search.</div>
          </div>
        ) : (
          <div className="nx-table-wrap">
            <table className="nx-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Alert at</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const stock = p.stock ?? null;
                  const oos = stock === 0;
                  const low = stock != null && stock > 0 && stock <= (p.lowStockThreshold || 5);
                  return (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 600 }}>{p.name}</td>
                      <td className="num" style={{ color: "var(--text-3)" }}>{p.sku || "—"}</td>
                      <td style={{ color: "var(--text-2)", fontSize: 13 }}>{p.category || "General"}</td>
                      <td style={{ fontWeight: 600 }}>{money(p.price)}</td>
                      <td>
                        {stock == null ? <span style={{ color: "var(--text-3)", fontSize: 12 }}>Not tracked</span> : (
                          <span className={`nx-badge ${oos ? "tone-danger" : low ? "tone-warn" : "tone-neutral"}`} style={{ fontSize: 11 }}>
                            {oos ? "Out of stock" : `${stock} ${p.unit || "pcs"}`}
                          </span>
                        )}
                      </td>
                      <td className="num" style={{ color: "var(--text-3)" }}>{p.lowStockThreshold || 5}</td>
                      <td>
                        <button
                          onClick={() => { setEditing(p); setNewStock(String(stock ?? "")); }}
                          className="nx-btn nx-btn-sm"
                          style={{ fontSize: 12, padding: "5px 10px" }}
                        >
                          Update stock
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

      {editing && (
        <div style={{ position: "fixed", inset: 0, background: "#0006", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "var(--surface)", borderRadius: "var(--r-lg)", padding: 28, width: 320 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
              <h3 style={{ fontWeight: 700 }}>Update Stock</h3>
              <button onClick={() => setEditing(null)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} /></button>
            </div>
            <div style={{ fontWeight: 600, marginBottom: 14 }}>{editing.name}</div>
            <div className="nx-field">
              <label className="nx-field-label">New stock quantity</label>
              <input className="nx-input" type="number" min={0} value={newStock} onChange={(e) => setNewStock(e.target.value)} autoFocus />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              <button className="nx-btn" onClick={() => setEditing(null)}>Cancel</button>
              <button className="nx-btn-primary" onClick={handleUpdateStock}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
