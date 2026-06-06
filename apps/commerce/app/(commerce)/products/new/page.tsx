"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useApp } from "@/lib/store";

type ProductForm = {
  name: string; sku: string; barcode: string; category: string;
  price: string; cost: string; stock: string; lowStockThreshold: string;
  taxable: boolean; unit: string; notes: string;
};

export default function NewProductPage() {
  const router = useRouter();
  const { addProduct, showToast, getCommerceSetup } = useApp();
  const setup = getCommerceSetup();
  const categories = setup.categories?.length ? setup.categories : ["General"];
  const units = (setup as { units?: string[] }).units || ["Piece"];

  const [form, setForm] = useState<ProductForm>({
    name: "", sku: "", barcode: "", category: categories[0] ?? "General",
    price: "", cost: "", stock: "0", lowStockThreshold: "5",
    taxable: true, unit: units[0] ?? "Piece", notes: "",
  });
  const [saving, setSaving] = useState(false);

  const upd = (p: Partial<ProductForm>) => setForm((f) => ({ ...f, ...p }));

  function handleSave() {
    if (!form.name.trim()) { showToast("Product name is required", "warn"); return; }
    if (!form.price) { showToast("Selling price is required", "warn"); return; }
    setSaving(true);
    setTimeout(() => {
      addProduct({
        name: form.name.trim(), sku: form.sku.trim(), barcode: form.barcode.trim(),
        category: form.category || "General", price: +form.price || 0, cost: +form.cost || 0,
        stock: form.stock !== "" ? +form.stock : null, lowStockThreshold: +form.lowStockThreshold || 5,
        taxable: form.taxable, unit: form.unit || "Piece", notes: form.notes.trim(),
      });
      showToast("Product added", "success");
      router.push("/products");
    }, 300);
  }

  return (
    <div className="nx-main-scroll">
      <div style={{ padding: "24px 28px", maxWidth: 680, margin: "0 auto" }}>
        <button
          onClick={() => router.back()}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--text-2)", background: "none", border: "none", cursor: "pointer", marginBottom: 20, padding: 0 }}
        >
          <ArrowLeft size={13} />Back to Products
        </button>

        <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 24 }}>Add Product</h1>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: "28px 28px" }}>
          <div className="nx-form-grid">
            <div className="nx-field" style={{ gridColumn: "1 / -1" }}>
              <label className="nx-field-label">Product name *</label>
              <input className="nx-input" autoFocus value={form.name} onChange={(e) => upd({ name: e.target.value })} placeholder="Product name" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="nx-field">
                <label className="nx-field-label">SKU</label>
                <input className="nx-input" value={form.sku} onChange={(e) => upd({ sku: e.target.value })} placeholder="SKU-001" />
              </div>
              <div className="nx-field">
                <label className="nx-field-label">Barcode</label>
                <input className="nx-input" value={form.barcode} onChange={(e) => upd({ barcode: e.target.value })} placeholder="1234567890" />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="nx-field">
                <label className="nx-field-label">Category</label>
                <select className="nx-input" value={form.category} onChange={(e) => upd({ category: e.target.value })}>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="nx-field">
                <label className="nx-field-label">Unit</label>
                <select className="nx-input" value={form.unit} onChange={(e) => upd({ unit: e.target.value })}>
                  {units.map((u: string) => <option key={u}>{u}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="nx-field">
                <label className="nx-field-label">Selling price (EGP) *</label>
                <input className="nx-input" type="number" min="0" value={form.price} onChange={(e) => upd({ price: e.target.value })} placeholder="0.00" />
              </div>
              <div className="nx-field">
                <label className="nx-field-label">Cost price (EGP)</label>
                <input className="nx-input" type="number" min="0" value={form.cost} onChange={(e) => upd({ cost: e.target.value })} placeholder="0.00" />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="nx-field">
                <label className="nx-field-label">Initial stock qty</label>
                <input className="nx-input" type="number" min="0" value={form.stock} onChange={(e) => upd({ stock: e.target.value })} />
              </div>
              <div className="nx-field">
                <label className="nx-field-label">Low stock alert at</label>
                <input className="nx-input" type="number" min="0" value={form.lowStockThreshold} onChange={(e) => upd({ lowStockThreshold: e.target.value })} />
              </div>
            </div>
            <div className="nx-field" style={{ gridColumn: "1 / -1" }}>
              <label className="nx-field-label">Notes</label>
              <textarea className="nx-input" rows={3} value={form.notes} onChange={(e) => upd({ notes: e.target.value })} placeholder="Internal notes…" style={{ resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, gridColumn: "1 / -1" }}>
              <input type="checkbox" id="taxable" checked={form.taxable} onChange={(e) => upd({ taxable: e.target.checked })} style={{ width: 16, height: 16 }} />
              <label htmlFor="taxable" style={{ fontSize: 13, color: "var(--text)" }}>Apply VAT to this product</label>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
            <button className="nx-btn" onClick={() => router.back()}>Cancel</button>
            <button className="nx-btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? "Adding…" : "Add product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
