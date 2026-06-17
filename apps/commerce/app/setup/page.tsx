"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Check, Info, X, Upload, Pencil,
  ShoppingBag, Utensils, Pill, ShoppingCart, Cpu, Shirt, Sparkles, HeartPulse, Box, Shapes,
  Store, Globe, Layers, BadgeCheck, CircleSlash, Lock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useApp, type CommerceSetup, computeDoc } from "@/lib/store";
import { OS_BU_PRESETS, DEFAULT_SETUP } from "@/lib/store";
import type { OrderItem } from "@/lib/store";

const SETUP_STEPS = ["Identity", "Preset", "Mode", "Tax", "Numbering", "Templates", "Categories", "Review"] as const;

const COUNTRIES = ["Egypt", "Saudi Arabia", "United Arab Emirates", "Jordan", "Kuwait", "Qatar"];

const PRESET_CATEGORIES: Record<string, string[]> = {
  retail: ["General", "Featured", "Accessories", "Clearance"],
  restaurant_cafe: ["Food", "Beverages", "Add-ons", "Packages"],
  pharmacy: ["Medicines", "Personal Care", "Medical Supplies", "Supplements", "Baby Care"],
  supermarket: ["Dairy", "Bakery", "Beverages", "Household", "Personal Care"],
  electronics_mobile: ["Phones", "Accessories", "Spare Parts", "Services"],
  clothing_fashion: ["Men", "Women", "Kids", "Accessories"],
  cosmetics: ["Skincare", "Makeup", "Fragrance", "Hair Care"],
  medical_supplies: ["Devices", "Consumables", "Mobility", "First Aid"],
  other: ["General"],
};
const DEFAULT_UNITS = ["Piece", "Box", "Pack", "Kg", "Gram", "Liter", "Portion"];

const PRESET_PREVIEW_ITEMS: Record<string, OrderItem[]> = {
  pharmacy: [
    { name: "Panadol Extra 24 tabs", qty: 2, price: 50, taxable: true },
    { name: "Centrum Multivitamin 30", qty: 1, price: 320, taxable: true },
  ],
  clothing_fashion: [
    { name: "Cotton T-shirt", qty: 2, price: 450, taxable: true },
    { name: "Denim Jeans", qty: 1, price: 950, taxable: true },
    { name: "Hoodie", qty: 1, price: 780, taxable: true },
  ],
  electronics_mobile: [
    { name: "Phone Charger", qty: 1, price: 350, taxable: true },
    { name: "USB-C Cable", qty: 2, price: 180, taxable: true },
    { name: "Earbuds", qty: 1, price: 650, taxable: true },
  ],
  restaurant_cafe: [
    { name: "Latte", qty: 2, price: 95, taxable: true },
    { name: "Sandwich", qty: 1, price: 180, taxable: true },
    { name: "Cheesecake", qty: 1, price: 140, taxable: true },
  ],
  supermarket: [
    { name: "Rice 1kg", qty: 1, price: 65, taxable: true },
    { name: "Milk 1L", qty: 2, price: 38, taxable: true },
    { name: "Eggs 12 pack", qty: 1, price: 120, taxable: true },
  ],
  retail: [
    { name: "Sample item", qty: 1, price: 100, taxable: true },
    { name: "Sample item 2", qty: 1, price: 150, taxable: true },
  ],
};

function previewItemsForPreset(presetId: string): OrderItem[] {
  return PRESET_PREVIEW_ITEMS[presetId] ?? PRESET_PREVIEW_ITEMS.retail;
}

const PRESETS = OS_BU_PRESETS.commerce;
const CORE_APP_URL = "http://localhost:3001";

const PRESET_ICON_MAP: Record<string, LucideIcon> = {
  "shopping-bag": ShoppingBag,
  "utensils": Utensils,
  "pill": Pill,
  "shopping-cart": ShoppingCart,
  "cpu": Cpu,
  "shirt": Shirt,
  "sparkles": Sparkles,
  "heart-pulse": HeartPulse,
  "box": Box,
  "shapes": Shapes,
};

function PresetIcon({ icon, size = 19 }: { icon: string; size?: number }) {
  const Icon = PRESET_ICON_MAP[icon] ?? Box;
  return <Icon size={size} strokeWidth={1.75} />;
}

const PRESET_RECOMMENDATION: Record<string, { features: [string, "ok" | "soon"][] }> = {
  pharmacy: {
    features: [
      ["Barcode", "ok"], ["Inventory alerts", "ok"], ["POS receipts", "ok"],
      ["Tax invoices", "ok"], ["Expiry tracking", "soon"], ["Batch number", "soon"],
      ["Prescription integration", "soon"],
    ],
  },
  restaurant_cafe: {
    features: [
      ["Table orders", "ok"], ["POS receipts", "ok"], ["Modifiers", "ok"],
      ["Kitchen printer", "soon"], ["Online menu", "soon"],
    ],
  },
  supermarket: {
    features: [
      ["Barcode scanning", "ok"], ["Inventory", "ok"], ["POS receipts", "ok"],
      ["Batch tracking", "soon"], ["Loyalty", "soon"],
    ],
  },
};

type SetupDraft = CommerceSetup & { units?: string[] };

function setupDraftFrom(existing: CommerceSetup): SetupDraft {
  const preset = existing.presetId || existing.businessType || existing.preset || "retail";
  return {
    ...DEFAULT_SETUP,
    ...existing,
    presetId: preset, businessType: preset, preset,
    categories: existing.categories?.length ? existing.categories : (PRESET_CATEGORIES[preset] || ["General"]),
    units: DEFAULT_UNITS.slice(0, 3),
  } as SetupDraft;
}

/* ---- Stepper using nx-pstep classes ---- */
function Stepper({ current }: { current: number }) {
  return (
    <nav className="nx-pstep-bar" style={{ display: "flex", overflowX: "auto", gap: 0 }}>
      {SETUP_STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div
            key={label}
            className={"nx-pstep" + (done ? " done" : active ? " current" : "")}
          >
            <div className="nx-pstep-dot">
              {done ? <Check size={12} strokeWidth={3} /> : <span>{i + 1}</span>}
            </div>
            <span className="nx-pstep-label">{label}</span>
          </div>
        );
      })}
    </nav>
  );
}

/* ---- Logo upload dropzone ---- */
function LogoUpload({ value, onChange, businessName }: { value: string | null; onChange: (v: string | null) => void; businessName?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const { attachMedia } = useApp();

  async function handleFile(file: File) {
    const result = await attachMedia({ file, ownerType: "business_logo", fileName: file.name });
    if (result) onChange(result.reference.thumbnailUrl);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) void handleFile(file);
  }

  return (
    <div>
      {value ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Logo" style={{ height: 56, maxWidth: 160, objectFit: "contain", borderRadius: "var(--r-sm)", border: "1px solid var(--border)", background: "var(--surface-2)", padding: 6 }} />
          <button className="nx-btn" style={{ fontSize: 12.5 }} onClick={() => onChange(null)}>Remove</button>
        </div>
      ) : (
        <div
          className={"nx-logo-drop" + (dragging ? " dragging" : "")}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{ borderColor: dragging ? "var(--accent)" : undefined }}
        >
          <Upload size={20} style={{ color: "var(--text-3)", marginBottom: 8 }} />
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)" }}>Upload logo</div>
          <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 3 }}>PNG, SVG or JPG · transparent PNG recommended</div>
          {businessName && (
            <div style={{ marginTop: 10, width: 40, height: 40, borderRadius: 8, background: "var(--accent-weak)", color: "var(--accent)", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 16, margin: "10px auto 0" }}>
              {businessName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleFile(f); }} />
    </div>
  );
}

/* ---- Receipt preview (real nx-receipt-* markup) ---- */
function SetupReceiptPreview({ setup, items, money }: { setup: SetupDraft; items: OrderItem[]; money: (n: number) => string }) {
  const [previewDate, setPreviewDate] = useState("Preview date");
  const businessName = setup.displayName || "Commerce Business";
  const d = computeDoc(items, setup, 0);
  const width = setup.receiptSize === "58mm" ? 230 : 300;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPreviewDate(new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date()));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="nx-receipt" style={{ width, margin: "0 auto" }}>
      <div className="nx-receipt-head">
        {setup.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={setup.logo} alt={businessName} style={{ height: 40, maxWidth: 120, objectFit: "contain", margin: "0 auto 6px" }} />
        ) : (
          <div className="nx-receipt-logo ph">{businessName.charAt(0)}</div>
        )}
        <div className="nx-receipt-biz">{businessName}</div>
        {setup.address && <div className="nx-receipt-muted">{setup.address}</div>}
        {setup.phone && <div className="nx-receipt-muted">Tel: {setup.phone}</div>}
        {setup.vatRegistered && <div className="nx-receipt-muted">{setup.taxLabel || "VAT"} Reg: {setup.taxNumber}</div>}
      </div>
      <div className="nx-receipt-rule" />
      <div className="nx-receipt-meta">
        <div><span>Receipt</span><b>{setup.receiptPrefix || "RCPT"}-{setup.receiptStart || 1001}</b></div>
        <div><span>Date</span><b>{previewDate}</b></div>
        <div><span>Cashier</span><b>Preview</b></div>
      </div>
      <div className="nx-receipt-rule dashed" />
      <table className="nx-receipt-items">
        <thead>
          <tr><th>Item</th><th>Qty</th><th>Amount</th></tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i}>
              <td>{it.name}<span className="nx-receipt-unit">{money(it.price)}</span></td>
              <td className="c">{it.qty}</td>
              <td className="r">{money(it.price * it.qty)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="nx-receipt-rule dashed" />
      <div className="nx-receipt-totals">
        <div><span>{setup.pricesIncludeTax ? "Net" : "Subtotal"}</span><b>{money(d.net)}</b></div>
        {setup.vatRegistered && <div><span>{setup.taxLabel || "VAT"} ({d.rate}%)</span><b>{money(d.vat)}</b></div>}
        <div className="grand"><span>Total</span><b>{money(d.total)}</b></div>
        <div className="pay"><span>Cash</span><b>{money(d.total)}</b></div>
      </div>
      <div className="nx-receipt-rule" />
      <div className="nx-receipt-foot">
        <div className="nx-receipt-barcode">
          {Array.from({ length: 44 }).map((_, i) => (
            <span key={i} style={{ width: i % 4 === 0 ? 2.5 : i % 3 === 0 ? 1 : 1.5 }} />
          ))}
        </div>
        <div className="nx-receipt-muted">{setup.receiptPrefix || "RCPT"}-{setup.receiptStart || 1001}</div>
        <div className="nx-receipt-thanks">{setup.footer || "Thank you for shopping with us"}</div>
        {setup.returnPolicy && <div className="nx-receipt-policy">{setup.returnPolicy}</div>}
      </div>
    </div>
  );
}

/* ---- Invoice preview (for tax/review steps) ---- */
function SetupInvoicePreview({ setup, items, money }: { setup: SetupDraft; items: OrderItem[]; money: (n: number) => string }) {
  const businessName = setup.displayName || "Commerce Business";
  const d = computeDoc(items, setup, 0);
  const dateStr = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  return (
    <div className="nx-invoice compact" style={{ transform: "scale(.62)", transformOrigin: "top center", width: "160%" }}>
      <div className="nx-invoice-top">
        <div className="nx-invoice-brand">
          {setup.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={setup.logo} alt={businessName} className="nx-invoice-logo" style={{ objectFit: "contain", background: "#fff" }} />
          ) : (
            <div className="nx-invoice-logo ph">{businessName.charAt(0)}</div>
          )}
          <div>
            <div className="nx-invoice-biz">{businessName}</div>
            {setup.legalName && <div className="nx-invoice-muted">{setup.legalName}</div>}
            {setup.address && <div className="nx-invoice-muted">{setup.address}</div>}
            {setup.phone && <div className="nx-invoice-muted">{setup.phone}</div>}
          </div>
        </div>
        <div className="nx-invoice-titleblock">
          <div className="nx-invoice-doctype">Tax Invoice</div>
          <div className="nx-invoice-meta-grid">
            <span>Invoice #</span><b>{setup.invoicePrefix || "INV"}-{setup.invoiceStart || 1001}</b>
            <span>Order #</span><b>Preview</b>
            <span>Date</span><b>{dateStr}</b>
            {setup.vatRegistered && setup.taxNumber && (<><span>{setup.taxLabel || "VAT"} No.</span><b>{setup.taxNumber}</b></>)}
          </div>
        </div>
      </div>
      <div className="nx-invoice-parties">
        <div>
          <div className="nx-invoice-plabel">Billed to</div>
          <div className="nx-invoice-pname">Walk-in customer</div>
          <div className="nx-invoice-muted">In-store · Point of Sale</div>
        </div>
        <div className="r">
          <div className="nx-invoice-plabel">Payment</div>
          <div className="nx-invoice-pname">Cash</div>
          <div className="nx-invoice-muted">Paid in full</div>
        </div>
      </div>
      <table className="nx-invoice-table">
        <thead><tr><th>Description</th><th className="c">Qty</th><th className="r">Unit</th><th className="r">Amount</th></tr></thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i}>
              <td><b>{it.name}</b></td>
              <td className="c">{it.qty}</td>
              <td className="r">{money(it.price)}</td>
              <td className="r">{money(it.price * it.qty)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="nx-invoice-summary">
        <div className="nx-invoice-future">
          <div className="nx-invoice-plabel">Notes</div>
          <p className="nx-invoice-muted">{setup.footer || "Thank you for shopping with us"}</p>
          <div className="nx-invoice-future-fields">
            <span className="nx-fut">Expiry date</span>
            <span className="nx-fut">Batch number</span>
            <span className="nx-fut">Prescription ref</span>
          </div>
        </div>
        <div className="nx-invoice-totals">
          <div><span>Net amount</span><b>{money(d.net)}</b></div>
          {setup.vatRegistered && <div><span>{setup.taxLabel || "VAT"} ({d.rate}%)</span><b>{money(d.vat)}</b></div>}
          <div className="grand"><span>Total due</span><b>{money(d.total)}</b></div>
        </div>
      </div>
    </div>
  );
}

/* ---- Aside preview wrapper ---- */
function SetupPreview({ setup, step, money }: { setup: SetupDraft; step: number; money: (n: number) => string }) {
  const presetId = setup.presetId || setup.businessType || setup.preset || "retail";
  const items = previewItemsForPreset(presetId);
  const showInvoice = step === 3 || step === 7;
  return (
    <>
      <div className="nx-wiz-aside-label">{showInvoice ? "Tax invoice preview" : "Receipt preview"}</div>
      <div style={{ display: "flex", justifyContent: "center", overflow: "hidden" }}>
        {showInvoice
          ? <SetupInvoicePreview setup={setup} items={items} money={money} />
          : <SetupReceiptPreview setup={setup} items={items} money={money} />}
      </div>
      <p style={{ fontSize: 11.5, color: "var(--text-3)", marginTop: 4, display: "flex", gap: 6, alignItems: "flex-start" }}>
        <Info size={13} style={{ flexShrink: 0, marginTop: 1 }} />
        Updates live as you edit your setup.
      </p>
    </>
  );
}

export default function CommerceSetupPage() {
  const { isHydrated, currentWorkspace, currentBU, getCommerceSetup, saveCommerceSetup, showToast, isAuthenticated, hasCommerceSetupContext, money, storageUsageLabel, t } = useApp();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<SetupDraft>(() => setupDraftFrom({ ...DEFAULT_SETUP, id: "", workspaceId: "", businessUnitId: "", osSubscriptionId: "", createdAt: "", updatedAt: "" } as CommerceSetup));

  const upd = (patch: Partial<SetupDraft>) => setDraft((p) => ({ ...p, ...patch }));

  useEffect(() => {
    if (!isHydrated) return;
    if (hasCommerceSetupContext && !isAuthenticated) { window.location.href = `${CORE_APP_URL}/login`; }
  }, [isHydrated, hasCommerceSetupContext, isAuthenticated]);

  useEffect(() => {
    if (!isHydrated) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDraft(setupDraftFrom(getCommerceSetup()));
  }, [isHydrated, getCommerceSetup]);

  function goNext() {
    if (step < SETUP_STEPS.length - 1) { setStep(step + 1); return; }
    saveCommerceSetup(draft);
    showToast("Commerce OS is ready!", "success");
    router.push("/dashboard");
  }
  function goBack() {
    if (step > 0) { setStep(step - 1); return; }
    router.push("/dashboard");
  }

  const businessType = draft.presetId || draft.businessType || draft.preset || "retail";
  const presetLabel = PRESETS.find((p) => p.id === businessType)?.label || "Retail Store";

  if (isHydrated && !hasCommerceSetupContext) {
    return (
      <div className="nx-onb">
        <div className="nx-onb-bar">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/branding/logo-bottom.png" alt="NexoraXS" className="nx-setup-wordmark" />
          <span style={{ width: 1, height: 20, background: "var(--border)" }} />
          <span style={{ fontSize: 13.5, fontWeight: 600 }}>Commerce OS</span>
        </div>
        <div className="nx-onb-body">
          <div className="nx-onb-card" style={{ textAlign: "center" }}>
            <span className="nx-choice-ic" style={{ margin: "0 auto 16px", background: "var(--warn-weak)", color: "var(--warn)" }}>
              <Info size={20} />
            </span>
            <h1 className="nx-onb-h">Missing setup context</h1>
            <p className="nx-onb-sub" style={{ marginInline: "auto" }}>
              Commerce setup must be opened from the Core Platform Product Hub after selecting Commerce OS for a workspace.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 24 }}>
              <a className="nx-btn-primary" href={`${CORE_APP_URL}/dashboard/apps`} style={{ textDecoration: "none" }}>
                Back to Product Hub
              </a>
              <a className="nx-btn" href={`${CORE_APP_URL}/login`} style={{ textDecoration: "none" }}>
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="nx-onb">
      {/* Top bar */}
      <div className="nx-onb-bar">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/branding/logo-bottom.png" alt="NexoraXS" className="nx-setup-wordmark" />
        <span style={{ width: 1, height: 20, background: "var(--border)" }} />
        <span style={{ fontSize: 13.5, fontWeight: 600 }}>Set up Commerce OS</span>
        <span className="nx-onb-workspace-slot">
          {isHydrated && currentWorkspace ? (
            <span className="nx-badge tone-accent" style={{ fontSize: 12 }}>{currentWorkspace.name}</span>
          ) : null}
        </span>
        <span className="nx-spacer" />
        <button className="nx-link" style={{ fontSize: 13 }} onClick={() => router.push("/dashboard")}>
          Save &amp; exit
        </button>
      </div>

      {/* Step indicator */}
      <div style={{ padding: "20px 32px", borderBottom: "1px solid var(--border)", background: "var(--surface)", overflowX: "auto" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Stepper current={step} />
        </div>
      </div>

      {/* Wizard split layout */}
      <div className="nx-wiz">
        <div className="nx-wiz-main">
          <div className="nx-wiz-main-inner" key={step} style={{ animation: "nx-rise .25s ease" }}>

            {/* Step 0: Identity */}
            {step === 0 && (
              <div>
                <h2 className="nx-onb-h">Set up your business identity</h2>
                <p className="nx-onb-sub">This appears on receipts, invoices, tax invoices, reports and customer documents.</p>
                <div className="nx-form-grid" style={{ marginTop: 24 }}>
                  <Field label="Business display name">
                    <input className="nx-input" value={draft.displayName} onChange={(e) => upd({ displayName: e.target.value })} placeholder={currentBU?.name || "Business display name"} />
                  </Field>
                  <Field label="Legal business name" optional>
                    <input className="nx-input" value={draft.legalName} onChange={(e) => upd({ legalName: e.target.value })} placeholder="Legal business name" />
                  </Field>
                  <div className="nx-form-grid cols-2">
                    <Field label="Phone"><input className="nx-input" value={draft.phone} onChange={(e) => upd({ phone: e.target.value })} placeholder="01000000000" /></Field>
                    <Field label="Email" optional><input className="nx-input" value={draft.email} onChange={(e) => upd({ email: e.target.value })} placeholder="store@business.com" /></Field>
                  </div>
                  <Field label="Address"><input className="nx-input" value={draft.address} onChange={(e) => upd({ address: e.target.value })} placeholder="Street, area" /></Field>
                  <div className="nx-form-grid cols-2">
                    <Field label="City"><input className="nx-input" value={draft.city} onChange={(e) => upd({ city: e.target.value })} placeholder="Alexandria" /></Field>
                    <Field label="Country">
                      <select className="nx-input" value={draft.country} onChange={(e) => upd({ country: e.target.value })}>
                        <option value="">Select country…</option>
                        {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </Field>
                  </div>
                  <div className="nx-form-grid cols-2">
                    <Field label="Commercial reg. no." optional><input className="nx-input" value={draft.crn} onChange={(e) => upd({ crn: e.target.value })} placeholder="CR-000000" /></Field>
                    <Field label="Tax reg. no." optional><input className="nx-input" value={draft.trn} onChange={(e) => upd({ trn: e.target.value })} placeholder="123456789" /></Field>
                  </div>
                  <Field label="Business logo" hint="Shown on all documents. Use a transparent PNG or SVG for best results.">
                    <LogoUpload value={draft.logo ?? null} onChange={(v) => upd({ logo: v ?? undefined })} businessName={draft.displayName} />
                  </Field>
                </div>
              </div>
            )}

            {/* Step 1: Preset */}
            {step === 1 && (
              <PresetStep businessType={businessType} presetLabel={presetLabel} upd={upd} />
            )}

            {/* Step 2: Mode */}
            {step === 2 && (
              <div>
                <h2 className="nx-onb-h">How do you operate?</h2>
                <p className="nx-onb-sub">You can change this and add channels at any time.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
                  {([
                    { id: "physical", label: "Physical Store", Icon: Store, desc: "POS · Receipts · Inventory · Branch sales", rec: "Cashier sales, barcode scanning, in-store customers" },
                    { id: "online", label: "Online Store", Icon: Globe, desc: "Product catalog · Online orders · Online invoices", rec: "Sell through an online catalog and channels" },
                    { id: "both", label: "Both", Icon: Layers, desc: "POS + Online catalog + unified inventory", rec: "One inventory across store and online" },
                  ] as const).map((m) => (
                    <button
                      key={m.id}
                      className={"nx-choice" + (draft.mode === m.id ? " on" : "")}
                      onClick={() => upd({ mode: m.id })}
                      style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: 16 }}
                    >
                      <span className="nx-choice-ic">
                        <m.Icon size={19} strokeWidth={1.75} />
                      </span>
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ fontWeight: 700, marginBottom: 2 }}>{m.label}</div>
                        <div style={{ fontSize: 12.5, color: "var(--text-2)" }}>{m.desc}</div>
                        <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 4 }}>Recommended for: {m.rec}</div>
                      </div>
                      <span className="nx-choice-check"><Check size={13} /></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Tax */}
            {step === 3 && (
              <div>
                <h2 className="nx-onb-h">Tax setup</h2>
                <p className="nx-onb-sub">Configure VAT so your invoices and receipts stay compliant.</p>
                <div className="nx-field-label" style={{ margin: "24px 0 10px" }}>Is your business registered for VAT?</div>
                <div className="nx-vat-grid" style={{ display: "flex", gap: 12 }}>
                  {([
                    ["Not registered for VAT", false, CircleSlash],
                    ["Registered for VAT", true, BadgeCheck],
                  ] as const).map(([label, v, ModeIcon]) => (
                    <button
                      key={label}
                      className={"nx-choice" + (draft.vatRegistered === v ? " on" : "")}
                      style={{ flex: 1 }}
                      onClick={() => upd({ vatRegistered: v })}
                    >
                      <span className="nx-choice-ic">
                        <ModeIcon size={18} strokeWidth={1.75} />
                      </span>
                      <span style={{ fontWeight: 700 }}>{label}</span>
                      <span className="nx-choice-check"><Check size={13} /></span>
                    </button>
                  ))}
                </div>
                {draft.vatRegistered && (
                  <>
                    <div className="nx-form-grid" style={{ marginTop: 22 }}>
                      <div className="nx-form-grid cols-2">
                        <Field label="Tax registration number"><input className="nx-input" value={draft.taxNumber} onChange={(e) => upd({ taxNumber: e.target.value })} /></Field>
                        <Field label="Default VAT rate"><input className="nx-input" type="number" value={draft.vatRate} onChange={(e) => upd({ vatRate: +e.target.value })} /></Field>
                      </div>
                      <div className="nx-form-grid cols-2">
                        <Field label="Tax label" hint="Shown on documents."><input className="nx-input" value={draft.taxLabel} onChange={(e) => upd({ taxLabel: e.target.value })} /></Field>
                        <Field label="Prices include tax?">
                          <div className="nx-seg" style={{ width: "100%" }}>
                            <button className={draft.pricesIncludeTax ? "on" : ""} style={{ flex: 1 }} onClick={() => upd({ pricesIncludeTax: true })}>Yes — inclusive</button>
                            <button className={!draft.pricesIncludeTax ? "on" : ""} style={{ flex: 1 }} onClick={() => upd({ pricesIncludeTax: false })}>No — exclusive</button>
                          </div>
                        </Field>
                      </div>
                    </div>
                    <div className="nx-tax-explain-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 18 }}>
                      <div
                        className="nx-card nx-card-pad"
                        style={{
                          background: draft.pricesIncludeTax ? "var(--accent-weak)" : "var(--surface-2)",
                          borderColor: draft.pricesIncludeTax ? "var(--accent-weak-2)" : "var(--border)",
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: 13 }}>Tax inclusive</div>
                        <p style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 6, lineHeight: 1.5 }}>
                          Price {money(114)} = Net {money(100)} + {draft.taxLabel} {money(14)}
                        </p>
                      </div>
                      <div
                        className="nx-card nx-card-pad"
                        style={{
                          background: !draft.pricesIncludeTax ? "var(--accent-weak)" : "var(--surface-2)",
                          borderColor: !draft.pricesIncludeTax ? "var(--accent-weak-2)" : "var(--border)",
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: 13 }}>Tax exclusive</div>
                        <p style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 6, lineHeight: 1.5 }}>
                          Price {money(100)} + {draft.taxLabel} {money(14)} = Total {money(114)}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 4: Numbering */}
            {step === 4 && (
              <div>
                <h2 className="nx-onb-h">Invoice &amp; receipt numbering</h2>
                <p className="nx-onb-sub">Set how your documents are numbered. These appear on every sale.</p>
                <div className="nx-form-grid" style={{ marginTop: 24 }}>
                  <div className="nx-form-grid cols-2">
                    <Field label="Invoice prefix"><input className="nx-input" value={draft.invoicePrefix} onChange={(e) => upd({ invoicePrefix: e.target.value })} /></Field>
                    <Field label="Starting invoice number"><input className="nx-input" type="number" value={draft.invoiceStart} onChange={(e) => upd({ invoiceStart: +e.target.value })} /></Field>
                  </div>
                  <div className="nx-form-grid cols-2">
                    <Field label="Receipt prefix"><input className="nx-input" value={draft.receiptPrefix} onChange={(e) => upd({ receiptPrefix: e.target.value })} /></Field>
                    <Field label="Starting receipt number"><input className="nx-input" type="number" value={draft.receiptStart} onChange={(e) => upd({ receiptStart: +e.target.value })} /></Field>
                  </div>
                  <Field label="Footer message"><input className="nx-input" value={draft.footer} onChange={(e) => upd({ footer: e.target.value })} /></Field>
                  <Field label="Return policy" optional><textarea className="nx-input" rows={3} value={draft.returnPolicy} onChange={(e) => upd({ returnPolicy: e.target.value })} /></Field>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                  <span className="nx-badge tone-accent" style={{ fontSize: 13, fontFamily: "var(--mono)" }}>{draft.invoicePrefix}-{draft.invoiceStart}</span>
                  <span className="nx-badge tone-accent" style={{ fontSize: 13, fontFamily: "var(--mono)" }}>{draft.receiptPrefix}-{draft.receiptStart}</span>
                </div>
              </div>
            )}

            {/* Step 5: Templates */}
            {step === 5 && (
              <div>
                <h2 className="nx-onb-h">Choose your document templates</h2>
                <p className="nx-onb-sub">Pick the look of your receipts and tax invoices. Preview updates live →</p>
                <div style={{ marginTop: 22 }}>
                  <div className="nx-field-label" style={{ marginBottom: 10 }}>POS receipt size</div>
                  <div className="nx-seg">
                    {(["58mm", "80mm"] as const).map((s) => (
                      <button key={s} className={draft.receiptSize === s ? "on" : ""} onClick={() => upd({ receiptSize: s })}>{s}</button>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 22 }}>
                  <div className="nx-field-label" style={{ marginBottom: 10 }}>Receipt style</div>
                  <div className="nx-preset-grid">
                    {([["minimal", "Minimal", "Just the essentials"], ["classic", "Classic", "Balanced & branded"], ["detailed", "Detailed", "Full breakdown"]] as const).map(([id, t, d]) => (
                      <button key={id} className={"nx-choice" + (draft.receiptStyle === id ? " on" : "")} style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }} onClick={() => upd({ receiptStyle: id })}>
                        <span style={{ fontWeight: 700, fontSize: 13.5 }}>{t}</span>
                        <span style={{ fontSize: 12, color: "var(--text-2)" }}>{d}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 22 }}>
                  <div className="nx-field-label" style={{ marginBottom: 10 }}>Tax invoice template</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <button className="nx-choice on" style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 13.5 }}>A4 — Simple</span>
                      <span style={{ fontSize: 12, color: "var(--text-2)" }}>Clean tax invoice, EGP-ready</span>
                    </button>
                    <button className="nx-choice disabled" style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 13.5 }}>Online order invoice</span>
                      <span className="nx-badge tone-neutral"><Lock size={11} />Future</span>
                    </button>
                  </div>
                </div>
                {businessType === "pharmacy" && (
                  <div className="nx-helper" style={{ marginTop: 20 }}>
                    <Info size={16} />
                    Expiry date, batch number and prescription reference can be added to pharmacy documents when those modules launch.
                  </div>
                )}
              </div>
            )}

            {/* Step 6: Categories */}
            {step === 6 && (
              <CategoriesStep draft={draft} upd={upd} presetLabel={presetLabel} />
            )}

            {/* Step 7: Review */}
            {step === 7 && (
              <div>
                <h2 className="nx-onb-h">Review your setup</h2>
                <p className="nx-onb-sub">Everything looks good? You can change any of this later in Settings.</p>
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--r)", overflow: "hidden", marginTop: 22 }}>
                  {([
                    ["Workspace", currentWorkspace?.name || "—"],
                    ["Operating System", "Commerce OS"],
                    ["Business", draft.displayName || currentBU?.name || "—"],
                    ["Commerce preset", presetLabel],
                    ["Operational mode", draft.mode === "physical" ? "Physical Store" : draft.mode === "online" ? "Online Store" : "Both"],
                    ["VAT", draft.vatRegistered ? `Enabled · ${draft.vatRate}%` : "Not registered"],
                    ["Prices", draft.pricesIncludeTax ? "Tax inclusive" : "Tax exclusive"],
                    ["Templates", `${draft.receiptStyle?.charAt(0).toUpperCase()}${draft.receiptStyle?.slice(1)} ${draft.receiptSize} receipt · A4 tax invoice`],
                    ["Categories", `${draft.categories?.length || 0} categories · ${(draft.units?.length || 0)} units`],
                    [t("storage_used"), storageUsageLabel || "—"],
                  ]).map(([k, v], i, arr) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "13px 18px", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <span style={{ color: "var(--text-2)", fontSize: 13.5 }}>{k}</span>
                      <span style={{ fontWeight: 600, fontSize: 13.5 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 18 }}>
                  <div>
                    <div className="nx-field-label" style={{ marginBottom: 10 }}>Enabled modules</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {["Products", "Inventory", "POS", "Orders", "Invoices", "Customers", "Reports"].map((m) => (
                        <span key={m} className="nx-badge tone-pos"><Check size={11} />{m}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="nx-field-label" style={{ marginBottom: 10 }}>Future modules</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {["Delivery", "Batch Tracking", "Loyalty"].map((m) => (
                        <span key={m} className="nx-badge tone-neutral">🔒 {m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="nx-onb-actions" style={{ marginTop: 32 }}>
              <button className="nx-btn nx-btn-ghost nx-btn-md" onClick={goBack}>← Back</button>
              <button className="nx-btn nx-btn-primary nx-btn-md" onClick={goNext}>
                {step === SETUP_STEPS.length - 1 ? "Finish Setup ✓" : "Continue →"}
              </button>
            </div>
          </div>
        </div>

        {/* Live preview aside */}
        <div className="nx-wiz-aside">
          <SetupPreview setup={draft} step={step} money={money} />
        </div>
      </div>
    </div>
  );
}

function PresetStep({
  businessType,
  presetLabel,
  upd,
}: {
  businessType: string;
  presetLabel: string;
  upd: (p: Partial<SetupDraft>) => void;
}) {
  const [editing, setEditing] = useState(false);
  const currentPreset = PRESETS.find((p) => p.id === businessType) ?? PRESETS[0];
  const rec = PRESET_RECOMMENDATION[businessType];

  function pick(id: string) {
    upd({ presetId: id, businessType: id, preset: id, categories: PRESET_CATEGORIES[id] || ["General"] });
    setEditing(false);
  }

  return (
    <div>
      <h2 className="nx-onb-h">Confirm your Commerce OS preset</h2>
      <p className="nx-onb-sub">
        We pre-selected <strong style={{ color: "var(--text)" }}>{presetLabel}</strong> for your business.
        This applies smart defaults for categories, products, taxes, receipts and reports.
        You can change it before continuing.
      </p>

      {/* Summary card */}
      <div className="nx-card nx-card-pad" style={{ marginTop: 22 }}>
        <div className="nx-row" style={{ gap: 14, alignItems: "flex-start" }}>
          <span className="nx-choice-ic" style={{ width: 46, height: 46, background: "var(--accent)", color: "#fff", borderRadius: 12, flexShrink: 0 }}>
            <PresetIcon icon={currentPreset.icon} size={22} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="nx-row" style={{ gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontWeight: 800, fontSize: 16 }}>{currentPreset.label}</span>
              <span className="nx-badge tone-accent">From your business</span>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 3 }}>
              {currentPreset.desc ?? "Synced with your business type · one shared value"}
            </div>
          </div>
          <button
            className="nx-btn nx-btn-secondary nx-btn-sm"
            style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6 }}
            onClick={() => setEditing((o) => !o)}
          >
            {editing ? <X size={13} /> : <Pencil size={13} />}
            {editing ? "Cancel" : "Change preset"}
          </button>
        </div>
      </div>

      {/* Preset grid — revealed on demand */}
      {editing && (
        <div style={{ marginTop: 14, animation: "nx-rise .2s ease" }}>
          <div className="nx-field-label" style={{ marginBottom: 10 }}>Choose a different Commerce preset</div>
          <div className="nx-preset-grid">
            {PRESETS.map((p) => {
              const active = businessType === p.id;
              return (
                <button
                  key={p.id}
                  className={"nx-choice" + (active ? " on" : "")}
                  style={{ flexDirection: "column", alignItems: "flex-start", gap: 10, padding: 14, minHeight: 96 }}
                  onClick={() => pick(p.id)}
                >
                  <span className="nx-choice-ic">
                    <PresetIcon icon={p.icon} size={18} />
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 13.5, lineHeight: 1.3 }}>{p.label}</span>
                  {active && (
                    <span className="nx-choice-check">
                      <Check size={12} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="nx-note" style={{ marginTop: 12 }}>
            <Info size={14} />
            Changing this also updates your business type — there is only ever one value.
          </div>
        </div>
      )}

      {/* Recommendation card for known presets */}
      {rec && (
        <div className="nx-card nx-card-pad" style={{ marginTop: 18, background: "var(--surface-2)" }}>
          <div className="nx-row" style={{ gap: 12 }}>
            <span className="nx-choice-ic" style={{ background: "var(--accent-weak)", color: "var(--accent)" }}>
              <PresetIcon icon={currentPreset.icon} size={18} />
            </span>
            <div>
              <div style={{ fontWeight: 700 }}>Recommended for {currentPreset.label}</div>
              <div style={{ fontSize: 12.5, color: "var(--text-2)" }}>Smart defaults applied to your Commerce OS</div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
            {rec.features.map(([t, s]) => (
              <span key={t} className={"nx-badge tone-" + (s === "ok" ? "pos" : "neutral")}>
                {s === "ok" ? <Check size={12} /> : <Box size={11} />}
                {t}{s === "soon" ? " · soon" : ""}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, hint, optional, children }: { label: string; hint?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="nx-field">
      <label className="nx-field-label">
        {label}
        {optional && <span style={{ color: "var(--text-3)", fontWeight: 400, fontSize: 11, marginLeft: 6 }}>optional</span>}
      </label>
      {children}
      {hint && <div className="nx-field-hint">{hint}</div>}
    </div>
  );
}

function CategoriesStep({ draft, upd, presetLabel }: { draft: SetupDraft; upd: (p: Partial<SetupDraft>) => void; presetLabel: string }) {
  const [cats, setCats] = useState<string[]>(draft.categories?.length ? draft.categories : ["General"]);
  const [units, setUnits] = useState<string[]>(draft.units?.length ? draft.units : DEFAULT_UNITS.slice(0, 3));
  const [newCat, setNewCat] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { upd({ categories: cats, units }); }, [cats, units]);

  function addCat() {
    const v = newCat.trim();
    if (v && !cats.includes(v)) { setCats([...cats, v]); setNewCat(""); }
  }

  return (
    <div>
      <h2 className="nx-onb-h">Categories &amp; units</h2>
      <p className="nx-onb-sub">We&apos;ve seeded defaults from the {presetLabel} preset. Add, remove or keep them.</p>
      <div className="nx-field-label" style={{ margin: "24px 0 10px" }}>Product categories</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {cats.map((c) => (
          <span key={c} className="nx-cat-chip">
            {c}
            <button onClick={() => setCats(cats.filter((x) => x !== c))}>
              <X size={13} />
            </button>
          </span>
        ))}
      </div>
      <div className="nx-row" style={{ gap: 8, marginTop: 12, maxWidth: 360 }}>
        <input
          className="nx-input"
          placeholder="Add a category…"
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCat(); } }}
          style={{ flex: 1 }}
        />
        <button className="nx-btn nx-btn-secondary nx-btn-sm" onClick={addCat}>Add</button>
      </div>
      <div className="nx-field-label" style={{ margin: "28px 0 10px" }}>Units of measure</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {DEFAULT_UNITS.map((u) => {
          const on = units.includes(u);
          return (
            <button
              key={u}
              className={"nx-chip-filter" + (on ? " on" : "")}
              onClick={() => setUnits(on ? units.filter((x) => x !== u) : [...units, u])}
            >
              {on && <Check size={13} style={{ marginInlineEnd: 5, verticalAlign: "-2px" }} />}{u}
            </button>
          );
        })}
      </div>
      <div className="nx-helper" style={{ marginTop: 22 }}>
        <Sparkles size={16} />
        Categories and units power your products, POS filters and reports — bilingual display names are supported as you grow.
      </div>
    </div>
  );
}
