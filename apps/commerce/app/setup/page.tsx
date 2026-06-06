"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, Info, X } from "lucide-react";
import { useApp, type CommerceSetup } from "@/lib/store";
import { OS_BU_PRESETS, DEFAULT_SETUP } from "@/lib/store";

const SETUP_STEPS = ["Identity", "Preset", "Mode", "Tax", "Numbering", "Templates", "Categories", "Review"] as const;

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

const PRESETS = OS_BU_PRESETS.commerce;
const CORE_APP_URL = "http://localhost:3001";

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

function StepIndicator({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", gap: 0, overflowX: "auto", padding: "0 4px" }}>
      {SETUP_STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 72 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: done ? "var(--accent)" : active ? "var(--accent)" : "var(--surface-3)",
                color: (done || active) ? "#fff" : "var(--text-3)",
                display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700,
                border: active ? "2px solid var(--accent)" : "2px solid transparent",
                boxShadow: active ? "0 0 0 3px var(--accent-weak)" : "none",
              }}>
                {done ? <Check size={13} /> : i + 1}
              </div>
              <span style={{ fontSize: 11, color: active ? "var(--accent)" : done ? "var(--text-2)" : "var(--text-3)", fontWeight: active ? 700 : 500, whiteSpace: "nowrap" }}>
                {label}
              </span>
            </div>
            {i < SETUP_STEPS.length - 1 && (
              <div style={{ width: 28, height: 2, background: done ? "var(--accent)" : "var(--border)", marginBottom: 20, flexShrink: 0 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CommerceSetupPage() {
  const { isHydrated, currentWorkspace, currentBU, getCommerceSetup, saveCommerceSetup, showToast, isAuthenticated, hasCommerceSetupContext } = useApp();
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
    // Sync the form after browser-only mock storage hydrates.
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
          <span style={{ fontWeight: 800, fontSize: 17, color: "var(--accent)", letterSpacing: "-.02em" }}>NexoraXS</span>
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
        <span style={{ fontWeight: 800, fontSize: 17, color: "var(--accent)", letterSpacing: "-.02em" }}>NexoraXS</span>
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
          <StepIndicator current={step} />
        </div>
      </div>

      {/* Wizard content */}
      <div className="nx-wiz">
        <div className="nx-wiz-main" style={{ flex: 1, overflowY: "auto" }}>
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
                    <Field label="Country"><input className="nx-input" value={draft.country} onChange={(e) => upd({ country: e.target.value })} placeholder="Egypt" /></Field>
                  </div>
                  <div className="nx-form-grid cols-2">
                    <Field label="Commercial reg. no." optional><input className="nx-input" value={draft.crn} onChange={(e) => upd({ crn: e.target.value })} placeholder="CR-000000" /></Field>
                    <Field label="Tax reg. no." optional><input className="nx-input" value={draft.trn} onChange={(e) => upd({ trn: e.target.value })} placeholder="123456789" /></Field>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Preset */}
            {step === 1 && (
              <div>
                <h2 className="nx-onb-h">Confirm your Commerce OS preset</h2>
                <p className="nx-onb-sub">We pre-selected <strong>{presetLabel}</strong> from your business unit. You can change it before continuing.</p>
                <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "16px 18px", marginTop: 22, display: "flex", gap: 14, alignItems: "center" }}>
                  <span className="nx-choice-ic" style={{ background: "var(--accent)", color: "#fff", flexShrink: 0 }}>🏪</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 15 }}>{presetLabel}</div>
                    <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 3 }}>Synced with your business unit type</div>
                  </div>
                </div>
                <div style={{ marginTop: 18 }}>
                  <div className="nx-field-label" style={{ marginBottom: 10 }}>Change preset</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                    {PRESETS.map((p) => (
                      <button
                        key={p.id}
                        className={"nx-choice" + (businessType === p.id ? " on" : "")}
                        style={{ flexDirection: "column", alignItems: "flex-start", gap: 8, padding: 13 }}
                        onClick={() => upd({ presetId: p.id, businessType: p.id, preset: p.id, categories: PRESET_CATEGORIES[p.id] || ["General"] })}
                      >
                        <span className="nx-choice-ic" style={{ width: 32, height: 32, fontSize: 16 }}>
                          {p.icon === "shopping-bag" ? "🛍" : p.icon === "pill" ? "💊" : p.icon === "shopping-cart" ? "🛒" : p.icon === "utensils" ? "🍽" : p.icon === "cpu" ? "📱" : p.icon === "shirt" ? "👕" : p.icon === "sparkles" ? "✨" : p.icon === "heart-pulse" ? "⛑" : "🔷"}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: 13 }}>{p.label}</span>
                        {businessType === p.id && <span className="nx-choice-check"><Check size={12} /></span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Mode */}
            {step === 2 && (
              <div>
                <h2 className="nx-onb-h">How do you operate?</h2>
                <p className="nx-onb-sub">You can change this and add channels at any time.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
                  {([
                    { id: "physical", label: "Physical Store", icon: "🏪", desc: "POS · Receipts · Inventory · Branch sales", rec: "Cashier sales, barcode scanning, in-store customers" },
                    { id: "online", label: "Online Store", icon: "🌐", desc: "Product catalog · Online orders · Online invoices", rec: "Sell through an online catalog and channels" },
                    { id: "both", label: "Both", icon: "🔀", desc: "POS + Online catalog + unified inventory", rec: "One inventory across store and online" },
                  ] as const).map((m) => (
                    <button
                      key={m.id}
                      className={"nx-choice" + (draft.mode === m.id ? " on" : "")}
                      onClick={() => upd({ mode: m.id })}
                      style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: 16 }}
                    >
                      <span className="nx-choice-ic" style={{ fontSize: 20 }}>{m.icon}</span>
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
                <div style={{ display: "flex", gap: 12 }}>
                  {([
                    ["Not registered for VAT", false],
                    ["Registered for VAT", true],
                  ] as const).map(([label, v]) => (
                    <button
                      key={label}
                      className={"nx-choice" + (draft.vatRegistered === v ? " on" : "")}
                      style={{ flex: 1 }}
                      onClick={() => upd({ vatRegistered: v })}
                    >
                      <span className="nx-choice-ic">{v ? "✅" : "⛔"}</span>
                      <span style={{ fontWeight: 700 }}>{label}</span>
                      <span className="nx-choice-check"><Check size={13} /></span>
                    </button>
                  ))}
                </div>
                {draft.vatRegistered && (
                  <div className="nx-form-grid" style={{ marginTop: 22 }}>
                    <div className="nx-form-grid cols-2">
                      <Field label="Tax registration number"><input className="nx-input" value={draft.taxNumber} onChange={(e) => upd({ taxNumber: e.target.value })} /></Field>
                      <Field label="Default VAT rate (%)"><input className="nx-input" type="number" value={draft.vatRate} onChange={(e) => upd({ vatRate: +e.target.value })} /></Field>
                    </div>
                    <div className="nx-form-grid cols-2">
                      <Field label="Tax label" hint="Shown on documents"><input className="nx-input" value={draft.taxLabel} onChange={(e) => upd({ taxLabel: e.target.value })} /></Field>
                      <Field label="Prices include tax?">
                        <div className="nx-seg">
                          <button className={draft.pricesIncludeTax ? "on" : ""} style={{ flex: 1 }} onClick={() => upd({ pricesIncludeTax: true })}>Yes — inclusive</button>
                          <button className={!draft.pricesIncludeTax ? "on" : ""} style={{ flex: 1 }} onClick={() => upd({ pricesIncludeTax: false })}>No — exclusive</button>
                        </div>
                      </Field>
                    </div>
                  </div>
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
                <p className="nx-onb-sub">Pick the look of your receipts and tax invoices.</p>
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
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
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
                  <button className="nx-choice on" style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                    <span style={{ fontWeight: 700 }}>A4 — Simple</span>
                    <span style={{ fontSize: 12, color: "var(--text-2)" }}>Clean tax invoice, EGP-ready</span>
                  </button>
                </div>
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
                    ["Templates", `${draft.receiptStyle?.charAt(0).toUpperCase()}${draft.receiptStyle?.slice(1)} ${draft.receiptSize} receipt`],
                    ["Categories", `${draft.categories?.length || 0} categories · ${(draft.units?.length || 0)} units`],
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
              <button className="nx-btn" onClick={goBack} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                ← Back
              </button>
              <button className="nx-btn-primary" onClick={goNext} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {step === SETUP_STEPS.length - 1 ? "Finish Setup ✓" : "Continue →"}
              </button>
            </div>
          </div>
        </div>

        {/* Preview aside */}
        <div className="nx-wiz-aside">
          <div className="nx-wiz-aside-label">Live preview</div>
          <div style={{ padding: "16px", background: "var(--surface-2)", borderRadius: "var(--r)", border: "1px solid var(--border)" }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{draft.displayName || currentBU?.name || "Your Business"}</div>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 12 }}>{draft.address || "Your address"} · {draft.city || "City"}</div>
            <div style={{ height: 1, background: "var(--border)", margin: "10px 0" }} />
            <div style={{ fontSize: 12, color: "var(--text-2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span>Receipt prefix</span><code style={{ fontFamily: "var(--mono)" }}>{draft.receiptPrefix}-{draft.receiptStart}</code></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span>Invoice prefix</span><code style={{ fontFamily: "var(--mono)" }}>{draft.invoicePrefix}-{draft.invoiceStart}</code></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>VAT</span><span>{draft.vatRegistered ? `${draft.vatRate}%` : "None"}</span></div>
            </div>
            <div style={{ height: 1, background: "var(--border)", margin: "10px 0" }} />
            <div style={{ fontSize: 11.5, color: "var(--text-3)", textAlign: "center" }}>{draft.footer || "Thank you!"}</div>
          </div>
          <p style={{ fontSize: 11.5, color: "var(--text-3)", marginTop: 8, display: "flex", gap: 6, alignItems: "flex-start" }}>
            <Info size={13} style={{ flexShrink: 0, marginTop: 1 }} />
            Updates live as you edit your setup.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, optional, children }: { label: string; hint?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="nx-field">
      <label className="nx-field-label">{label}{optional && <span style={{ color: "var(--text-3)", fontWeight: 400, fontSize: 11, marginLeft: 6 }}>optional</span>}</label>
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
          <span key={c} className="nx-cat-chip" style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: "var(--r-sm)", background: "var(--surface-3)", border: "1px solid var(--border)", fontSize: 12.5 }}>
            {c}
            <button onClick={() => setCats(cats.filter((x) => x !== c))} style={{ display: "grid", placeItems: "center", color: "var(--text-3)", background: "none", border: "none", cursor: "pointer" }}>
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12, maxWidth: 360 }}>
        <input
          className="nx-input"
          placeholder="Add a category…"
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCat(); } }}
          style={{ flex: 1 }}
        />
        <button className="nx-btn" onClick={addCat}>Add</button>
      </div>
      <div className="nx-field-label" style={{ margin: "28px 0 10px" }}>Units of measure</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {DEFAULT_UNITS.map((u) => {
          const on = units.includes(u);
          return (
            <button
              key={u}
              className={"nx-chip-filter" + (on ? " on" : "")}
              style={{ padding: "6px 12px", borderRadius: "var(--r-sm)", border: "1px solid var(--border)", background: on ? "var(--accent)" : "var(--surface-3)", color: on ? "#fff" : "var(--text)", fontSize: 12.5, cursor: "pointer" }}
              onClick={() => setUnits(on ? units.filter((x) => x !== u) : [...units, u])}
            >
              {on && <Check size={12} style={{ marginRight: 4, verticalAlign: "-2px" }} />}{u}
            </button>
          );
        })}
      </div>
    </div>
  );
}
