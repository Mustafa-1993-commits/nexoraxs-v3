"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Briefcase,
  Building2,
  Check,
  Cpu,
  Dumbbell,
  GitBranch,
  HeartPulse,
  Info,
  Languages,
  MapPin,
  Moon,
  Pill,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Store,
  Stethoscope,
  Sun,
  Utensils,
  UsersRound,
  Wrench,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { OS_BU_PRESETS, COUNTRIES, CURRENCIES, TIMEZONES, OPERATING_SYSTEMS, ONB_PLANS } from "@/lib/store";
import { PhaseStepper } from "@/components/onboarding/PhaseStepper";

const STEP_KEYS = ["language", "workspace", "branch", "chooseos", "plan", "bu"] as const;
type StepKey = (typeof STEP_KEYS)[number];
const CORE_COUNT = 3;
const STEP_LABELS: Record<StepKey, string> = {
  language: "Language",
  workspace: "Workspace",
  branch: "Main Branch",
  chooseos: "Operating System",
  plan: "Plan",
  bu: "Business Profile",
};

interface FormState {
  lang: "en" | "ar";
  name: string;
  country: string;
  currency: string;
  tz: string;
  chosenOS: string | null;
  plan: string | null;
  buName: string;
  buPreset: string | null;
  branch: string;
  branchCity: string;
}

const iconMap: Record<string, LucideIcon> = {
  box: Box,
  cpu: Cpu,
  dumbbell: Dumbbell,
  "git-branch": GitBranch,
  "heart-pulse": HeartPulse,
  pill: Pill,
  shirt: Shirt,
  "shopping-bag": ShoppingBag,
  "shopping-cart": ShoppingCart,
  sparkles: Sparkles,
  store: Store,
  stethoscope: Stethoscope,
  utensils: Utensils,
  "users-round": UsersRound,
  wrench: Wrench,
};

function CatalogIcon({ name, size = 19 }: { name: string; size?: number }) {
  const Icon = iconMap[name] ?? Box;
  return <Icon size={size} strokeWidth={1.8} />;
}

function planPriceParts(price: string): { amount: string; per?: string } {
  if (price === "Free") return { amount: "Free", per: "14-day trial" };
  if (price === "Custom") return { amount: "Custom", per: "Contact sales" };
  return { amount: price.replace(" EGP/mo", ""), per: "EGP / mo" };
}

export default function OnboardingPage() {
  const {
    isHydrated, isAuthenticated, isOnboardingComplete,
    lang, setLang, theme, toggleTheme, showToast, logoutUser,
    createWorkspace, createBranch, selectOS, selectPlan,
    createBusinessUnit, completeOnboarding,
  } = useApp();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [f, setF] = useState<FormState>({
    lang,
    name: "",
    country: "Egypt",
    currency: "EGP",
    tz: "Africa/Cairo",
    chosenOS: null,
    plan: null,
    buName: "",
    buPreset: null,
    branch: "",
    branchCity: "",
  });

  const upd = (patch: Partial<FormState>) => setF((p) => ({ ...p, ...patch }));

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated) { router.replace("/login"); return; }
    if (isOnboardingComplete) { router.replace("/dashboard/apps"); return; }
  }, [isHydrated, isAuthenticated, isOnboardingComplete, router]);

  const cur = STEP_KEYS[step] as StepKey;
  const isLast = step === STEP_KEYS.length - 1;
  const stepLabels = STEP_KEYS.map((k) => STEP_LABELS[k]);

  const canNext = (() => {
    if (cur === "workspace") return !!f.name.trim();
    if (cur === "branch") return !!f.branch.trim();
    if (cur === "chooseos") return !!f.chosenOS;
    if (cur === "plan") return !!f.plan;
    if (cur === "bu") return !!(f.buName.trim() && f.buPreset);
    return true;
  })();

  const osObj = OPERATING_SYSTEMS.find((o) => o.id === f.chosenOS);
  const osName = osObj?.name || "your operating system";
  const presets = OS_BU_PRESETS[f.chosenOS as keyof typeof OS_BU_PRESETS] || [];

  function finish() {
    createWorkspace({
      name: f.name,
      country: f.country,
      currency: f.currency || "EGP",
      timezone: f.tz || "Africa/Cairo",
    });
    createBranch({ name: f.branch, isMain: true });
    selectOS(f.chosenOS!);
    selectPlan(f.plan as "starter" | "pro" | "business");
    createBusinessUnit({ name: f.buName, preset: f.buPreset!, osId: f.chosenOS! });
    completeOnboarding();
    if (f.chosenOS === "commerce") {
      showToast("Workspace ready — open Commerce OS from the Product Hub.", "success");
      router.push("/dashboard/apps");
    } else {
      showToast(`${osName} is coming soon — Commerce OS is the active system in this MVP.`, "info");
      router.push("/dashboard");
    }
  }

  function next() {
    if (isLast) { finish(); return; }
    setStep((s) => s + 1);
  }
  function back() {
    if (step > 0) { setStep((s) => s - 1); return; }
    router.push("/welcome");
  }
  function signOut() { logoutUser(); router.push("/login"); }

  return (
    <div className="nx-onb">
      {/* Top bar */}
      <div className="nx-onb-bar">
        <span style={{ fontWeight: 800, fontSize: 17, color: "var(--accent)", letterSpacing: "-.02em" }}>NexoraXS</span>
        <span className="nx-spacer" />
        <button className="nx-icon-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="nx-langswitch" style={{ background: "var(--surface-3)" }}>
          <button
            className={lang === "en" ? "on" : ""}
            style={{ color: lang === "en" ? "var(--text)" : "var(--text-3)" }}
            onClick={() => { setLang("en"); upd({ lang: "en" }); }}
          >EN</button>
          <button
            className={lang === "ar" ? "on" : ""}
            style={{ color: lang === "ar" ? "var(--text)" : "var(--text-3)" }}
            onClick={() => { setLang("ar"); upd({ lang: "ar" }); }}
          >ع</button>
        </div>
        <button className="nx-link" style={{ fontSize: 13 }} onClick={signOut}>Sign out</button>
      </div>

      {/* Phase stepper */}
      <div style={{ padding: "22px 24px 6px", display: "flex", justifyContent: "center" }}>
        <PhaseStepper steps={stepLabels} current={step} coreCount={CORE_COUNT} />
      </div>

      {/* Body */}
      <div className="nx-onb-body" style={{ paddingTop: 18 }}>
        <div
          key={cur}
          className={["nx-onb-card", cur === "plan" || cur === "chooseos" ? "wide" : ""].filter(Boolean).join(" ")}
        >
          {/* ── Step: Language ── */}
          {cur === "language" && (
            <>
              <h1 className="nx-onb-h">Choose your language</h1>
              <p className="nx-onb-sub">You can change this anytime. Arabic switches the interface to right-to-left.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
                {([
                  ["en", "English", "LTR · Left to right"],
                  ["ar", "العربية", "RTL · من اليمين لليسار"],
                ] as const).map(([id, name, sub]) => (
                  <button
                    key={id}
                    className={"nx-choice" + (f.lang === id ? " on" : "")}
                    style={{ flexDirection: "column", alignItems: "flex-start", gap: 6 }}
                    onClick={() => { upd({ lang: id }); setLang(id); }}
                  >
                    <span className="nx-choice-ic"><Languages size={19} /></span>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>{name}</span>
                    <span style={{ fontSize: 12, color: "var(--text-2)" }}>{sub}</span>
                    <span className="nx-choice-check"><Check size={13} /></span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── Step: Workspace ── */}
          {cur === "workspace" && (
            <>
              <span className="nx-eyebrow">Your company</span>
              <h1 className="nx-onb-h" style={{ marginTop: 8 }}>Create your workspace</h1>
              <p className="nx-onb-sub">The workspace is your company or group — the home for billing, teams and every operating system.</p>
              <div className="nx-form-grid" style={{ marginTop: 22 }}>
                <div className="nx-field">
                  <label className="nx-field-label">Workspace name</label>
                  <div className="nx-input-wrap">
                    <Building2 size={16} className="nx-input-icon" />
                    <input
                      className="nx-input has-icon"
                      value={f.name}
                      onChange={(e) => upd({ name: e.target.value })}
                      placeholder="Acme Group"
                    />
                  </div>
                  <div className="nx-field-hint">e.g. Mustafa Group — your parent company, not a single shop.</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div className="nx-field">
                    <label className="nx-field-label">Country</label>
                    <select className="nx-input" value={f.country} onChange={(e) => upd({ country: e.target.value })}>
                      {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="nx-field">
                    <label className="nx-field-label">Currency</label>
                    <select className="nx-input" value={f.currency} onChange={(e) => upd({ currency: e.target.value })}>
                      {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.code} — {c.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="nx-field">
                  <label className="nx-field-label">Timezone</label>
                  <select className="nx-input" value={f.tz} onChange={(e) => upd({ tz: e.target.value })}>
                    {TIMEZONES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </>
          )}

          {/* ── Step: Branch ── */}
          {cur === "branch" && (
            <>
              <span className="nx-eyebrow">Core setup · last step</span>
              <h1 className="nx-onb-h" style={{ marginTop: 8 }}>Add your main branch</h1>
              <p className="nx-onb-sub">A branch is a physical operating location for your workspace. You can add more branches later.</p>
              <div className="nx-form-grid" style={{ marginTop: 22 }}>
                <div className="nx-field">
                  <label className="nx-field-label">Branch name</label>
                  <div className="nx-input-wrap">
                    <MapPin size={16} className="nx-input-icon" />
                    <input
                      className="nx-input has-icon"
                      value={f.branch}
                      onChange={(e) => upd({ branch: e.target.value })}
                      placeholder="Main Branch"
                    />
                  </div>
                </div>
                <div className="nx-field">
                  <label className="nx-field-label">City</label>
                  <input
                    className="nx-input"
                    value={f.branchCity}
                    onChange={(e) => upd({ branchCity: e.target.value })}
                    placeholder="Alexandria"
                  />
                </div>
                {f.name && f.branch && (
                  <div style={{
                    background: "var(--accent-weak)", border: "1px solid var(--accent-weak-2)",
                    borderRadius: "var(--r)", padding: "14px 16px",
                    display: "flex", gap: 12, alignItems: "center",
                  }}>
                    <span style={{ width: 36, height: 36, borderRadius: "var(--r-sm)", background: "var(--accent)", color: "#fff", display: "grid", placeItems: "center", flexShrink: 0 }}>
                      <Check size={18} />
                    </span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>Core platform ready</div>
                      <p style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 3 }}>
                        {f.name} · {f.branch} · {f.country}. Next, activate your first operating system.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── Step: Choose OS ── */}
          {cur === "chooseos" && (
            <>
              <span className="nx-eyebrow">Product Hub</span>
              <h1 className="nx-onb-h" style={{ marginTop: 8 }}>Choose an operating system</h1>
              <p className="nx-onb-sub">Pick the system to set up first. You can add more to {f.name} anytime — each has its own subscription.</p>
              <div className="nx-hub-grid" style={{ marginTop: 22 }}>
                {OPERATING_SYSTEMS.map((os) => {
                  const avail = os.status === "available";
                  const on = f.chosenOS === os.id;
                  return (
                    <button
                      key={os.id}
                      className={["nx-choice", on ? "on" : "", !avail ? "disabled" : ""].filter(Boolean).join(" ")}
                      style={{ flexDirection: "column", alignItems: "flex-start", gap: 10, padding: 16 }}
                      onClick={() => avail && upd({ chosenOS: os.id, buPreset: null })}
                      disabled={!avail}
                    >
                      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <span
                          className="nx-choice-ic"
                          style={{ background: os.accent + "1a", color: os.accent }}
                        >
                          <CatalogIcon name={os.icon} />
                        </span>
                        <span className={`nx-badge ${avail ? "tone-pos" : "tone-neutral"}`} style={{ fontSize: 11 }}>
                          {avail ? "Available" : "Soon"}
                        </span>
                      </div>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{os.name}</span>
                      <span style={{ fontSize: 11.5, color: "var(--text-2)", lineHeight: 1.4, fontWeight: 600 }}>{os.tagline}</span>
                      {on && <span className="nx-choice-check" style={{ insetBlockStart: 16, insetInlineEnd: 16 }}><Check size={13} /></span>}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ── Step: Plan ── */}
          {cur === "plan" && (
            <>
              <span className="nx-eyebrow">{osName}</span>
              <h1 className="nx-onb-h" style={{ marginTop: 8 }}>Choose a plan</h1>
              <p className="nx-onb-sub">Start free for 14 days. Pick the plan for {osName} — you only pay for the systems you switch on.</p>
              <div className="nx-plan-grid">
                {ONB_PLANS.map((p) => {
                  const price = planPriceParts(p.price);
                  return (
                    <button
                      key={p.key}
                      className={"nx-choice nx-plan-choice" + (f.plan === p.key ? " on" : "")}
                      onClick={() => upd({ plan: p.key })}
                    >
                      {p.popular && <span className="nx-plan-pop">Recommended</span>}
                      <span className="nx-plan-name">{p.name}</span>
                      <span className="nx-plan-price">
                        {price.amount}
                        {price.per ? <span>{price.per}</span> : null}
                      </span>
                      <span className="nx-plan-tagline">{p.tagline}</span>
                      <span className="nx-plan-sep" />
                      <span className="nx-plan-features">
                        {p.features.map((ft) => (
                          <span key={ft}>
                            <Check size={13} strokeWidth={2.1} />{ft}
                          </span>
                        ))}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* ── Step: Business Profile ── */}
          {cur === "bu" && (
            <>
              <span className="nx-eyebrow">Business profile</span>
              <h1 className="nx-onb-h" style={{ marginTop: 8 }}>Tell us about your business</h1>
              <p className="nx-onb-sub">This helps us tailor {osName} to how your business works.</p>
              <div className="nx-form-grid" style={{ marginTop: 22 }}>
                <div className="nx-field">
                  <label className="nx-field-label">Business name</label>
                  <div className="nx-input-wrap">
                    <Briefcase size={16} className="nx-input-icon" />
                    <input
                      className="nx-input has-icon"
                      value={f.buName}
                      onChange={(e) => upd({ buName: e.target.value })}
                      placeholder={presets[0] ? "e.g. " + presets[0].label : "Business name"}
                    />
                  </div>
                </div>
                <div className="nx-field">
                  <label className="nx-field-label">Choose a {osName} type</label>
                  <div className="nx-field-hint" style={{ marginBottom: 10 }}>
                    {f.chosenOS === "commerce"
                      ? "Applies smart defaults. Pharmacy is a preset inside Commerce OS — not Healthcare OS."
                      : `Applies smart defaults for ${osName}.`}
                  </div>
                  <div className="nx-bu-preset-grid">
                    {presets.map((p) => (
                      <button
                        key={p.id}
                        className={"nx-choice" + (f.buPreset === p.id ? " on" : "")}
                        onClick={() => upd({ buPreset: p.id, buName: f.buName || p.label })}
                      >
                        <span className="nx-choice-ic nx-choice-ic-sm">
                          <CatalogIcon name={p.icon} size={16} />
                        </span>
                        <span style={{ fontWeight: 700, fontSize: 12.5 }}>{p.label}</span>
                        {f.buPreset === p.id && <span className="nx-choice-check"><Check size={12} /></span>}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "12px 14px", background: "var(--surface-2)", borderRadius: "var(--r)", border: "1px solid var(--border)" }}>
                  <Info size={16} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 12.5, color: "var(--text-2)", lineHeight: 1.5 }}>
                    {f.chosenOS === "commerce"
                      ? "This connects Commerce OS to your workspace. You can set up more operating systems later."
                      : `This sets up ${osName} for your workspace. You can set up more operating systems later.`}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Nav actions */}
          <div className="nx-onb-actions">
            <button className="nx-btn" onClick={back} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ArrowLeft size={16} />Back
            </button>
            <button
              className="nx-btn-primary"
              disabled={!canNext}
              onClick={next}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              {isLast ? "Finish setup" : "Continue"}
              {isLast ? <Check size={16} /> : <ArrowRight size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
