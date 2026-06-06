"use client";

import { useState } from "react";
import { Plus, Search, X, Pencil, Trash2, Package } from "lucide-react";
import { useApp } from "@/lib/store";
import { type CommerceProduct } from "@/lib/store";

type ProductForm = { name: string; sku: string; barcode: string; category: string; price: string; cost: string; stock: string; lowStockThreshold: string; taxable: boolean; unit: string };

const emptyForm: ProductForm = { name: "", sku: "", barcode: "", category: "General", price: "", cost: "", stock: "", lowStockThreshold: "5", taxable: true, unit: "Piece" };

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, money, getCommerceSetup, showToast } = useApp();
  const setup = getCommerceSetup();
  const categories = ["All", ...(setup.categories?.length ? setup.categories : ["General"])];
  const units = (setup as { units?: string[] }).units || ["Piece"];

  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<CommerceProduct | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);

  const upd = (p: Partial<ProductForm>) => setForm((f) => ({ ...f, ...p }));

  const filtered = products.filter((p) =>
    (cat === "All" || (p.category || "General") === cat) &&
    (p.name.toLowerCase().includes(q.toLowerCase()) || (p.sku || "").toLowerCase().includes(q.toLowerCase()))
  );

  function openAdd() { setEditing(null); setForm(emptyForm); setShowModal(true); }
  function openEdit(p: CommerceProduct) {
    setEditing(p);
    setForm({ name: p.name, sku: p.sku || "", barcode: p.barcode || "", category: p.category || "General", price: String(p.price), cost: String(p.cost || ""), stock: String(p.stock ?? ""), lowStockThreshold: String(p.lowStockThreshold || 5), taxable: p.taxable ?? true, unit: p.unit || "Piece" });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.name.trim()) { showToast("Product name is required", "warn"); return; }
    const data = {
      name: form.name.trim(), sku: form.sku.trim(), barcode: form.barcode.trim(),
      category: form.category || "General", price: +form.price || 0, cost: +form.cost || 0,
      stock: form.stock !== "" ? +form.stock : null, lowStockThreshold: +form.lowStockThreshold || 5,
      taxable: form.taxable, unit: form.unit || "Piece",
      notes: "", isActive: true,
    };
    if (editing) {
      updateProduct(editing.id, data as Partial<CommerceProduct>);
      showToast("Product updated", "success");
    } else {
      addProduct(data as Parameters<typeof addProduct>[0]);
      showToast("Product added", "success");
    }
    setShowModal(false);
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    deleteProduct(id);
    showToast("Product deleted", "success");
  }

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, gap: 12, flexWrap: "wrap" }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)" }}>Products</h1>
          <button className="nx-btn-primary" onClick={openAdd} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 16px" }}>
            <Plus size={16} />Add Product
          </button>
        </div>

        {/* Filter bar */}
        <div className="nx-filterbar">
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-3)" }} />
            <input className="nx-input" style={{ paddingLeft: 32, fontSize: 13 }} placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          {categories.map((c) => (
            <button key={c} className={"nx-chip-filter" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="nx-empty">
            <div className="nx-empty-ic"><Package size={24} /></div>
            <div className="nx-empty-title">{products.length === 0 ? "No products yet" : "No products match"}</div>
            <div className="nx-empty-desc">
              {products.length === 0 ? "Start by adding your first product." : "Try a different search or category."}
            </div>
            {products.length === 0 && (
              <button className="nx-btn nx-btn-primary" onClick={openAdd} style={{ marginTop: 14 }}>Add your first product</button>
            )}
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td><span style={{ fontWeight: 600 }}>{p.name}</span></td>
                    <td className="num" style={{ color: "var(--text-3)" }}>{p.sku || "—"}</td>
                    <td style={{ color: "var(--text-2)", fontSize: 13 }}>{p.category || "General"}</td>
                    <td style={{ fontWeight: 700 }}>{money(p.price)}</td>
                    <td>
                      {p.stock == null ? <span style={{ color: "var(--text-3)", fontSize: 12 }}>—</span> : (
                        <span className={`nx-badge ${p.stock === 0 ? "tone-danger" : p.stock <= (p.lowStockThreshold || 5) ? "tone-warn" : "tone-neutral"}`} style={{ fontSize: 11 }}>
                          {p.stock === 0 ? "Out of stock" : `${p.stock} ${p.unit || "pcs"}`}
                        </span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                        <button onClick={() => openEdit(p)} className="nx-btn nx-btn-sm" style={{ fontSize: 12, padding: "5px 10px" }}>
                          <Pencil size={12} />Edit
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="nx-btn nx-btn-sm" style={{ fontSize: 12, padding: "5px 10px", background: "var(--danger-weak)", color: "var(--danger)", border: "1px solid var(--danger)" }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit modal */}
      {showModal && (
        <div className="nx-modal-scrim">
          <div className="nx-modal" style={{ maxWidth: 500 }}>
            <div className="nx-modal-head">
              <h3 className="nx-modal-title">{editing ? "Edit Product" : "Add Product"}</h3>
              <button className="nx-icon-btn" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            <div className="nx-modal-body">
            <div className="nx-form-grid">
              <ModalField label="Product name *"><input className="nx-input" value={form.name} onChange={(e) => upd({ name: e.target.value })} placeholder="Product name" /></ModalField>
              <div className="nx-form-grid cols-2">
                <ModalField label="SKU"><input className="nx-input" value={form.sku} onChange={(e) => upd({ sku: e.target.value })} placeholder="SKU-001" /></ModalField>
                <ModalField label="Barcode"><input className="nx-input" value={form.barcode} onChange={(e) => upd({ barcode: e.target.value })} placeholder="1234567890" /></ModalField>
              </div>
              <div className="nx-form-grid cols-2">
                <ModalField label="Category">
                  <select className="nx-input" value={form.category} onChange={(e) => upd({ category: e.target.value })}>
                    {(setup.categories?.length ? setup.categories : ["General"]).map((c) => <option key={c}>{c}</option>)}
                  </select>
                </ModalField>
                <ModalField label="Unit">
                  <select className="nx-input" value={form.unit} onChange={(e) => upd({ unit: e.target.value })}>
                    {units.map((u: string) => <option key={u}>{u}</option>)}
                  </select>
                </ModalField>
              </div>
              <div className="nx-form-grid cols-2">
                <ModalField label="Selling price (EGP)"><input className="nx-input" type="number" value={form.price} onChange={(e) => upd({ price: e.target.value })} placeholder="0" /></ModalField>
                <ModalField label="Cost price (EGP)"><input className="nx-input" type="number" value={form.cost} onChange={(e) => upd({ cost: e.target.value })} placeholder="0" /></ModalField>
              </div>
              <div className="nx-form-grid cols-2">
                <ModalField label="Stock qty"><input className="nx-input" type="number" value={form.stock} onChange={(e) => upd({ stock: e.target.value })} placeholder="e.g. 100" /></ModalField>
                <ModalField label="Low stock alert at"><input className="nx-input" type="number" value={form.lowStockThreshold} onChange={(e) => upd({ lowStockThreshold: e.target.value })} /></ModalField>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="checkbox" id="taxable" checked={form.taxable} onChange={(e) => upd({ taxable: e.target.checked })} style={{ width: 16, height: 16 }} />
                <label htmlFor="taxable" style={{ fontSize: 13, color: "var(--text)" }}>Apply VAT to this product</label>
              </div>
            </div>
            </div>
            <div className="nx-modal-foot">
              <button className="nx-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="nx-btn nx-btn-primary" onClick={handleSave}>{editing ? "Save changes" : "Add product"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ModalField({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="nx-field"><label className="nx-field-label">{label}</label>{children}</div>;
}
