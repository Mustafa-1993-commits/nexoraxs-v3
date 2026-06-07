"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft, ScanBarcode, Lock, ImageUp, Upload, RefreshCw, Check, CircleAlert,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { type CommerceProduct } from "@/lib/store";

type ProductForm = {
  name: string; category: string; brand: string; sku: string; barcode: string;
  price: string; cost: string; taxable: boolean;
  stock: string; unit: string; lowStockThreshold: string; expiry: string;
  notes: string; image: string | null;
};

function Field({
  label, optional, hint, error, children,
}: { label: string; optional?: boolean; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="nx-field">
      <span className="nx-field-label">{label}{optional && <span className="nx-field-optional">Optional</span>}</span>
      {children}
      {error ? <span className="nx-field-error"><CircleAlert size={13} />{error}</span>
        : hint ? <span className="nx-field-hint">{hint}</span> : null}
    </label>
  );
}

function NewProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const { products, addProduct, updateProduct, showToast, getCommerceSetup } = useApp();
  const editing = editId ? products.find((p) => p.id === editId) ?? null : null;

  const setup = getCommerceSetup();
  const categories = setup.categories?.length ? setup.categories : ["General"];
  const units = (setup as { units?: string[] }).units || ["Piece"];

  const [form, setForm] = useState<ProductForm>(() => editing ? {
    name: editing.name, category: editing.category || categories[0] || "General", brand: editing.brand || "",
    sku: editing.sku || "", barcode: editing.barcode || "",
    price: String(editing.price || ""), cost: String(editing.cost || ""), taxable: editing.taxable ?? true,
    stock: editing.stock != null ? String(editing.stock) : "", unit: editing.unit || units[0] || "Piece",
    lowStockThreshold: String(editing.lowStockThreshold || 5), expiry: editing.expiry || "",
    notes: editing.notes || "", image: editing.image ?? null,
  } : {
    name: "", category: categories[0] || "General", brand: "", sku: "", barcode: "",
    price: "", cost: "", taxable: true,
    stock: "", unit: units[0] || "Piece", lowStockThreshold: "5", expiry: "",
    notes: "", image: null,
  });
  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});
  const [saving, setSaving] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);

  const upd = (p: Partial<ProductForm>) => setForm((f) => ({ ...f, ...p }));

  useEffect(() => {
    const image = form.image;
    return () => {
      if (image?.startsWith("blob:")) URL.revokeObjectURL(image);
    };
  }, [form.image]);

  function persistableImage(image: string | null): string | null {
    if (!image || image.startsWith("data:") || image.startsWith("blob:")) return null;
    return image;
  }

  function onImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    upd({ image: URL.createObjectURL(file) });
  }

  function handleSave() {
    const err: { name?: string; price?: string } = {};
    if (!form.name.trim() || form.name.trim().length < 3) err.name = "Enter a real product name";
    if (!form.price || +form.price <= 0) err.price = "Enter a valid price";
    setErrors(err);
    if (Object.keys(err).length) return;

    setSaving(true);
    const data = {
      name: form.name.trim(), category: form.category || "General", brand: form.brand.trim(),
      sku: form.sku.trim(), barcode: form.barcode.trim(),
      price: +form.price || 0, cost: +form.cost || 0, taxable: form.taxable,
      stock: form.stock !== "" ? +form.stock : null, unit: form.unit || "Piece",
      lowStockThreshold: +form.lowStockThreshold || 5, expiry: form.expiry.trim(),
      notes: form.notes.trim(), image: persistableImage(form.image), isActive: true,
    };
    setTimeout(() => {
      try {
        if (editing) {
          updateProduct(editing.id, data as Partial<CommerceProduct>);
          showToast("Product updated", "success");
        } else {
          addProduct(data as Parameters<typeof addProduct>[0]);
          showToast("Product added — now available in POS", "success");
        }
        router.push("/products");
      } catch {
        setSaving(false);
      }
    }, 250);
  }

  return (
    <div className="nx-main-scroll">
      <div className="nx-page" style={{ maxWidth: 920 }}>
        <div className="nx-page-head">
          <div>
            <button className="nx-link" onClick={() => router.push("/products")} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <ArrowLeft size={13} />Back to products
            </button>
            <h1 className="nx-page-title">{editing ? "Edit product" : "Add a product"}</h1>
          </div>
        </div>

        <div className="nx-detail">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="nx-card nx-card-pad">
              <div className="nx-section-title" style={{ marginBottom: 14 }}>Details</div>
              <div className="nx-form-grid">
                <Field label="Product name" error={errors.name}>
                  <input className="nx-input" autoFocus value={form.name} onChange={(e) => upd({ name: e.target.value })} placeholder="Product name" />
                </Field>
                <div className="nx-form-grid cols-2">
                  <Field label="Category">
                    <select className="nx-input" value={form.category} onChange={(e) => upd({ category: e.target.value })}>
                      {categories.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Brand" optional>
                    <input className="nx-input" value={form.brand} onChange={(e) => upd({ brand: e.target.value })} placeholder="Brand" />
                  </Field>
                </div>
                <div className="nx-form-grid cols-2">
                  <Field label="SKU" optional>
                    <input className="nx-input" value={form.sku} onChange={(e) => upd({ sku: e.target.value })} placeholder="SKU-001" />
                  </Field>
                  <Field label="Barcode" optional>
                    <span className="nx-input-wrap">
                      <ScanBarcode size={16} className="nx-input-icon" />
                      <input className="nx-input" value={form.barcode} onChange={(e) => upd({ barcode: e.target.value })} placeholder="Scan or enter barcode" />
                    </span>
                  </Field>
                </div>
              </div>
            </div>

            <div className="nx-card nx-card-pad">
              <div className="nx-section-title" style={{ marginBottom: 14 }}>Pricing & tax</div>
              <div className="nx-form-grid">
                <div className="nx-form-grid cols-2">
                  <Field label="Price (EGP)" error={errors.price}>
                    <input className="nx-input" type="number" min="0" value={form.price} onChange={(e) => upd({ price: e.target.value })} placeholder="100" />
                  </Field>
                  <Field label="Cost (EGP)" optional>
                    <input className="nx-input" type="number" min="0" value={form.cost} onChange={(e) => upd({ cost: e.target.value })} placeholder="0.00" />
                  </Field>
                </div>
                <div className="nx-row" style={{ justifyContent: "space-between", padding: "4px 2px" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>Taxable</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)" }}>Apply 14% VAT to this product</div>
                  </div>
                  <button type="button" className={"nx-toggle" + (form.taxable ? " on" : "")} aria-pressed={form.taxable} onClick={() => upd({ taxable: !form.taxable })}>
                    <span className="nx-toggle-knob" />
                  </button>
                </div>
              </div>
            </div>

            <div className="nx-card nx-card-pad">
              <div className="nx-section-title" style={{ marginBottom: 14 }}>Inventory</div>
              <div className="nx-form-grid">
                <div className="nx-form-grid cols-2">
                  <Field label="Stock quantity">
                    <input className="nx-input" type="number" min="0" value={form.stock} onChange={(e) => upd({ stock: e.target.value })} placeholder="100" />
                  </Field>
                  <Field label="Unit">
                    <select className="nx-input" value={form.unit} onChange={(e) => upd({ unit: e.target.value })}>
                      {units.map((u: string) => <option key={u}>{u}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="nx-form-grid cols-2">
                  <Field label="Low stock threshold">
                    <input className="nx-input" type="number" min="0" value={form.lowStockThreshold} onChange={(e) => upd({ lowStockThreshold: e.target.value })} placeholder="20" />
                  </Field>
                  <Field label="Expiry date" optional hint="Pharmacy preset">
                    <input className="nx-input" type="month" value={form.expiry} onChange={(e) => upd({ expiry: e.target.value })} />
                  </Field>
                </div>
                <div className="nx-row" style={{ justifyContent: "space-between", padding: "4px 2px", opacity: .6 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5, display: "flex", alignItems: "center", gap: 8 }}>
                      Batch number <span className="nx-badge tone-neutral"><Lock size={11} />Future</span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-3)" }}>Available when batch tracking launches</div>
                  </div>
                  <button type="button" className="nx-toggle disabled" disabled aria-pressed={false}>
                    <span className="nx-toggle-knob" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="nx-card nx-card-pad" style={{ position: "sticky", top: 20 }}>
              <div className="nx-section-title" style={{ marginBottom: 12 }}>Product image</div>
              <input ref={imgRef} type="file" accept="image/*" hidden onChange={onImage} />
              {form.image ? (
                <div style={{ width: "100%", height: 150, borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", background: "var(--surface-2)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.image} alt="Product" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
              ) : (
                <button type="button" onClick={() => imgRef.current?.click()} className="nx-thumb nx-thumb-stripe" style={{ width: "100%", height: 150, borderRadius: 12, flexDirection: "column", gap: 6, border: "none", cursor: "pointer" }}>
                  <ImageUp size={22} />
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11 }}>product photo</span>
                </button>
              )}
              <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm nx-btn-full" style={{ marginTop: 12 }} onClick={() => imgRef.current?.click()}>
                {form.image ? <RefreshCw size={14} /> : <Upload size={14} />}
                {form.image ? "Replace image" : "Upload image"}
              </button>
              {form.image && (
                <button type="button" className="nx-link" style={{ display: "block", margin: "10px auto 0", color: "var(--danger)" }} onClick={() => upd({ image: null })}>
                  Remove image
                </button>
              )}
              <hr className="nx-divider" style={{ margin: "18px 0" }} />
              <button className="nx-btn nx-btn-primary nx-btn-full" onClick={handleSave} disabled={saving}>
                <Check size={15} />{saving ? (editing ? "Saving…" : "Adding…") : (editing ? "Save changes" : "Add product")}
              </button>
              <button className="nx-btn nx-btn-ghost nx-btn-sm nx-btn-full" style={{ marginTop: 8 }} onClick={() => router.push("/products")}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewProductPage() {
  return (
    <Suspense>
      <NewProductForm />
    </Suspense>
  );
}
