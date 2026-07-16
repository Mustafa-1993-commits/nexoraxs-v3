"use client";

import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft, ScanBarcode, Lock, ImageUp, Upload, RefreshCw, Check, CircleAlert,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { LegacyProductRepositoryError, type CreateLegacyProductCommand } from "@nexoraxs/contracts";
import {
  productMessage,
  useLegacyProduct,
  useLegacyProductMutations,
  type ProductMessageKey,
} from "@/features/products";

type ProductForm = {
  name: string; category: string; brand: string; sku: string; barcode: string;
  price: string; cost: string; taxable: boolean;
  stock: string; unit: string; lowStockThreshold: string; expiry: string;
  notes: string; image: string | null; imageFile: File | null;
};

function Field({
  label, optional, optionalLabel = "Optional", hint, error, children,
}: { label: string; optional?: boolean; optionalLabel?: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="nx-field">
      <span className="nx-field-label">{label}{optional && <span className="nx-field-optional">{optionalLabel}</span>}</span>
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
  const {
    currentWorkspace,
    currentBU,
    currentBranch,
    currentOSSubscription,
    lang,
    showToast,
    getCommerceSetup,
  } = useApp();
  const msg = (key: ProductMessageKey) => productMessage(lang, key);
  const scope = useMemo(() => (
    currentWorkspace && currentBU
      ? {
          workspaceId: currentWorkspace.id,
          legacyBusinessUnitId: currentBU.id,
          ...(currentBranch ? { branchId: currentBranch.id } : {}),
        }
      : null
  ), [currentWorkspace, currentBU, currentBranch]);
  const productQuery = useLegacyProduct(scope, editId);
  const editing = editId ? productQuery.data ?? null : null;
  const mutations = useLegacyProductMutations(scope ?? { workspaceId: "", legacyBusinessUnitId: "" });

  const setup = useMemo(() => getCommerceSetup(), [getCommerceSetup]);
  const categories = useMemo(
    () => setup.categories?.length ? setup.categories : ["General"],
    [setup],
  );
  const units = useMemo(
    () => (setup as { units?: string[] }).units || ["Piece"],
    [setup],
  );

  const [form, setForm] = useState<ProductForm>(() => ({
    name: "", category: categories[0] || "General", brand: "", sku: "", barcode: "",
    price: "", cost: "", taxable: true,
    stock: "", unit: units[0] || "Piece", lowStockThreshold: "5", expiry: "",
    notes: "", image: null, imageFile: null,
  }));
  const hydratedEditId = useRef<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; price?: string; sku?: string; general?: string }>({});
  const [saving, setSaving] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);

  const upd = (p: Partial<ProductForm>) => setForm((f) => ({ ...f, ...p }));

  useEffect(() => {
    if (!editing || hydratedEditId.current === editing.id) return;
    hydratedEditId.current = editing.id;
    setForm({
      name: editing.name,
      category: editing.category || categories[0] || "General",
      brand: editing.brand || "",
      sku: editing.sku || "",
      barcode: editing.barcode || "",
      price: String(editing.price || ""),
      cost: String(editing.cost || ""),
      taxable: editing.taxable ?? true,
      stock: editing.stock != null ? String(editing.stock) : "",
      unit: editing.unit || units[0] || "Piece",
      lowStockThreshold: String(editing.lowStockThreshold || 5),
      expiry: editing.expiry || "",
      notes: editing.notes || "",
      image: editing.image ?? null,
      imageFile: null,
    });
  }, [editing, categories, units]);

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
    upd({ image: URL.createObjectURL(file), imageFile: file });
  }

  async function handleSave() {
    const err: { name?: string; price?: string } = {};
    if (!form.name.trim() || form.name.trim().length < 3) err.name = msg("invalidName");
    if (!form.price || +form.price <= 0) err.price = msg("invalidPrice");
    setErrors(err);
    if (Object.keys(err).length) return;

    setSaving(true);
    if (!scope) {
      setErrors({ general: msg("saveError") });
      setSaving(false);
      return;
    }
    const command: CreateLegacyProductCommand = {
      name: form.name.trim(), category: form.category || "General", brand: form.brand.trim(),
      sku: form.sku.trim(), barcode: form.barcode.trim(),
      price: +form.price || 0, cost: +form.cost || 0, taxable: form.taxable,
      stock: form.stock !== "" ? +form.stock : null, unit: form.unit || "Piece",
      lowStockThreshold: +form.lowStockThreshold || 5, expiry: form.expiry.trim(),
      notes: form.notes.trim(), image: persistableImage(form.image),
      branchId: currentBranch?.id,
      osSubscriptionId: currentOSSubscription?.id,
      compatibilityFields: { isActive: true },
    };
    try {
      if (editing) {
        await mutations.update.mutateAsync({ productId: editing.id, command, imageFile: form.imageFile });
        showToast(msg("updatedToast"), "success");
      } else {
        await mutations.create.mutateAsync({ command, imageFile: form.imageFile });
        showToast(msg("addedToast"), "success");
      }
      router.push("/products");
    } catch (error) {
      if (error instanceof LegacyProductRepositoryError && error.code === "duplicate_sku") {
        setErrors({ sku: msg("duplicateSku") });
      } else {
        setErrors({ general: msg("saveError") });
      }
      setSaving(false);
    }
  }

  return (
    <div className="nx-main-scroll">
      <div className="nx-page" style={{ maxWidth: 920 }}>
        <div className="nx-page-head">
          <div>
            <button className="nx-link" onClick={() => router.push("/products")} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <ArrowLeft size={13} style={{ transform: lang === "ar" ? "scaleX(-1)" : undefined }} />{msg("back")}
            </button>
            <h1 className="nx-page-title">{editing ? msg("editProduct") : msg("addHeading")}</h1>
          </div>
        </div>

        {editId && productQuery.isPending ? (
          <div className="nx-card nx-card-pad" role="status">{msg("loading")}</div>
        ) : editId && productQuery.isError ? (
          <div className="nx-card nx-card-pad" role="alert">{msg("notFound")}</div>
        ) : (
        <div className="nx-detail">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="nx-card nx-card-pad">
              <div className="nx-section-title" style={{ marginBottom: 14 }}>{msg("details")}</div>
              <div className="nx-form-grid">
                <Field label={msg("productName")} error={errors.name}>
                  <input className="nx-input" autoFocus value={form.name} onChange={(e) => upd({ name: e.target.value })} placeholder={msg("productName")} />
                </Field>
                <div className="nx-form-grid cols-2">
                  <Field label={msg("category")}>
                    <select className="nx-input" value={form.category} onChange={(e) => upd({ category: e.target.value })}>
                      {categories.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label={msg("brand")} optional optionalLabel={msg("optional")}>
                    <input className="nx-input" value={form.brand} onChange={(e) => upd({ brand: e.target.value })} placeholder={msg("brand")} />
                  </Field>
                </div>
                <div className="nx-form-grid cols-2">
                  <Field label={msg("sku")} optional optionalLabel={msg("optional")} error={errors.sku}>
                    <input className="nx-input" value={form.sku} onChange={(e) => upd({ sku: e.target.value })} placeholder="SKU-001" />
                  </Field>
                  <Field label={msg("barcode")} optional optionalLabel={msg("optional")}>
                    <span className="nx-input-wrap">
                      <ScanBarcode size={16} className="nx-input-icon" />
                      <input className="nx-input" value={form.barcode} onChange={(e) => upd({ barcode: e.target.value })} placeholder={msg("scanBarcode")} />
                    </span>
                  </Field>
                </div>
              </div>
            </div>

            <div className="nx-card nx-card-pad">
              <div className="nx-section-title" style={{ marginBottom: 14 }}>{msg("pricingTax")}</div>
              <div className="nx-form-grid">
                <div className="nx-form-grid cols-2">
                  <Field label={msg("priceEgp")} error={errors.price}>
                    <input className="nx-input" type="number" min="0" value={form.price} onChange={(e) => upd({ price: e.target.value })} placeholder="100" />
                  </Field>
                  <Field label={msg("costEgp")} optional optionalLabel={msg("optional")}>
                    <input className="nx-input" type="number" min="0" value={form.cost} onChange={(e) => upd({ cost: e.target.value })} placeholder="0.00" />
                  </Field>
                </div>
                <div className="nx-row" style={{ justifyContent: "space-between", padding: "4px 2px" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>{msg("taxable")}</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)" }}>{msg("taxableHint")}</div>
                  </div>
                  <button type="button" className={"nx-toggle" + (form.taxable ? " on" : "")} aria-label={msg("taxable")} aria-pressed={form.taxable} onClick={() => upd({ taxable: !form.taxable })}>
                    <span className="nx-toggle-knob" />
                  </button>
                </div>
              </div>
            </div>

            <div className="nx-card nx-card-pad">
              <div className="nx-section-title" style={{ marginBottom: 14 }}>{msg("inventory")}</div>
              <div className="nx-form-grid">
                <div className="nx-form-grid cols-2">
                  <Field label={msg("stockQuantity")}>
                    <input className="nx-input" type="number" min="0" value={form.stock} onChange={(e) => upd({ stock: e.target.value })} placeholder="100" />
                  </Field>
                  <Field label={msg("unit")}>
                    <select className="nx-input" value={form.unit} onChange={(e) => upd({ unit: e.target.value })}>
                      {units.map((u: string) => <option key={u}>{u}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="nx-form-grid cols-2">
                  <Field label={msg("lowThreshold")}>
                    <input className="nx-input" type="number" min="0" value={form.lowStockThreshold} onChange={(e) => upd({ lowStockThreshold: e.target.value })} placeholder="20" />
                  </Field>
                  <Field label={msg("expiry")} optional optionalLabel={msg("optional")} hint={msg("pharmacyPreset")}>
                    <input className="nx-input" type="month" value={form.expiry} onChange={(e) => upd({ expiry: e.target.value })} />
                  </Field>
                </div>
                <div className="nx-row" style={{ justifyContent: "space-between", padding: "4px 2px", opacity: .6 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5, display: "flex", alignItems: "center", gap: 8 }}>
                      {msg("batch")} <span className="nx-badge tone-neutral"><Lock size={11} />{msg("future")}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-3)" }}>{msg("batchHint")}</div>
                  </div>
                  <button type="button" className="nx-toggle disabled" aria-label={msg("batch")} disabled aria-pressed={false}>
                    <span className="nx-toggle-knob" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="nx-card nx-card-pad" style={{ position: "sticky", top: 20 }}>
              <div className="nx-section-title" style={{ marginBottom: 12 }}>{msg("productImage")}</div>
              <input ref={imgRef} type="file" accept="image/*" hidden onChange={onImage} />
              {form.image ? (
                <div style={{ width: "100%", height: 150, borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", background: "var(--surface-2)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.image} alt={msg("imageAlt")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
              ) : (
                <button type="button" onClick={() => imgRef.current?.click()} className="nx-thumb nx-thumb-stripe" style={{ width: "100%", height: 150, borderRadius: 12, flexDirection: "column", gap: 6, border: "none", cursor: "pointer" }}>
                  <ImageUp size={22} />
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11 }}>{msg("productPhoto")}</span>
                </button>
              )}
              <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm nx-btn-full" style={{ marginTop: 12 }} onClick={() => imgRef.current?.click()}>
                {form.image ? <RefreshCw size={14} /> : <Upload size={14} />}
                {form.image ? msg("replaceImage") : msg("uploadImage")}
              </button>
              {form.image && (
                <button type="button" className="nx-link" style={{ display: "block", margin: "10px auto 0", color: "var(--danger)" }} onClick={() => upd({ image: null, imageFile: null })}>
                  {msg("removeImage")}
                </button>
              )}
              <hr className="nx-divider" style={{ margin: "18px 0" }} />
              {errors.general && <div className="nx-field-error" role="alert" style={{ marginBottom: 10 }}><CircleAlert size={13} />{errors.general}</div>}
              <button className="nx-btn nx-btn-primary nx-btn-full" onClick={handleSave} disabled={saving}>
                <Check size={15} />{saving ? (editing ? msg("saving") : msg("adding")) : (editing ? msg("saveChanges") : msg("addAction"))}
              </button>
              <button className="nx-btn nx-btn-ghost nx-btn-sm nx-btn-full" style={{ marginTop: 8 }} onClick={() => router.push("/products")}>
                {msg("cancel")}
              </button>
            </div>
          </div>
        </div>
        )}
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
