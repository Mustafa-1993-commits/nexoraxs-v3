// ============================================================
// NexoraXS — Onboarding: workspace welcome + create, Commerce OS setup wizard
// ============================================================

/* ============================================================
   CORE ONBOARDING — Language → Workspace → Business Unit → Main Branch
   ============================================================ */
const COUNTRIES = ["Egypt", "Saudi Arabia", "United Arab Emirates", "Jordan", "Kuwait", "Qatar"];
const CURRENCIES = ["EGP — Egyptian Pound", "SAR — Saudi Riyal", "AED — UAE Dirham", "USD — US Dollar"];
const TIMEZONES = ["Africa/Cairo (GMT+2)", "Asia/Riyadh (GMT+3)", "Asia/Dubai (GMT+4)"];

// Dynamic Business Unit presets per Operating System (architecture-agnostic).
const OS_BU_PRESETS = {
  commerce: [
    { id: "retail", name: "Retail Store", ic: "shopping-bag" },
    { id: "pharmacy", name: "Pharmacy", ic: "pill" },
    { id: "supermarket", name: "Supermarket", ic: "shopping-cart" },
    { id: "restaurant_cafe", name: "Restaurant / Cafe", ic: "utensils" },
    { id: "electronics_mobile", name: "Electronics / Mobile", ic: "smartphone" },
    { id: "clothing_fashion", name: "Clothing / Fashion", ic: "shirt" },
    { id: "cosmetics", name: "Cosmetics", ic: "sparkles" },
    { id: "medical_supplies", name: "Medical Supplies", ic: "cross" },
    { id: "other", name: "Other", ic: "shapes" },
  ],
  healthcare: [
    { id: "clinic", name: "Clinic", ic: "stethoscope" },
    { id: "medical_center", name: "Medical Center", ic: "building-2" },
    { id: "hospital", name: "Hospital", ic: "bed" },
    { id: "lab", name: "Lab", ic: "test-tube" },
    { id: "radiology", name: "Radiology Center", ic: "scan" },
  ],
  hr: [
    { id: "company_hr", name: "Company HR", ic: "building-2" },
    { id: "payroll", name: "Payroll Management", ic: "banknote" },
    { id: "attendance", name: "Attendance Management", ic: "calendar-check" },
    { id: "recruitment", name: "Recruitment Agency", ic: "user-search" },
  ],
  maintenance: [
    { id: "maintenance_center", name: "Maintenance Center", ic: "wrench" },
    { id: "repair_workshop", name: "Repair Workshop", ic: "hammer" },
    { id: "field_service", name: "Field Service Team", ic: "truck" },
    { id: "spare_parts", name: "Spare Parts Service", ic: "cog" },
  ],
  gym: [
    { id: "fitness_gym", name: "Fitness Gym", ic: "dumbbell" },
    { id: "pt_studio", name: "Personal Training Studio", ic: "user" },
    { id: "sports_academy", name: "Sports Academy", ic: "trophy" },
    { id: "crossfit", name: "CrossFit / Classes Studio", ic: "activity" },
  ],
  crm: [
    { id: "sales_crm", name: "Sales CRM", ic: "trending-up" },
    { id: "service_crm", name: "Service CRM", ic: "headphones" },
    { id: "marketing_crm", name: "Marketing CRM", ic: "megaphone" },
    { id: "realestate_crm", name: "Real Estate CRM", ic: "home" },
    { id: "education_crm", name: "Education CRM", ic: "graduation-cap" },
  ],
};
const ONB_PLANS = [
  { id: "starter", name: "Starter", price: "Free", per: "14-day trial", feats: ["1 business unit", "1 branch", "Up to 3 users", "Core modules"] },
  { id: "pro", name: "Pro", price: "1,400", per: "EGP / mo", pop: true, feats: ["Up to 3 business units", "Up to 5 branches", "Up to 10 users", "Advanced reports & exports"] },
  { id: "business", name: "Business", price: "Custom", per: "billed annually", feats: ["Custom limits", "Advanced permissions", "Integrations Hub", "Priority support"] },
];

function PhaseStepper({ steps, current, coreCount }) {
  const groups = [
    { name: "Core Platform Setup", short: "Core Setup", start: 0, end: coreCount },
    { name: "First OS Activation", short: "Activation", start: coreCount, end: steps.length },
  ];
  return (
    <div className="nx-phasestep">
      {groups.map((g, gi) => {
        const inThisPhase = current >= g.start && current < g.end;
        const groupDone = current >= g.end;
        return (
          <div key={g.name} className={"nx-phase" + (inThisPhase ? " active" : "") + (groupDone ? " done" : "")}>
            <div className="nx-phase-cap">
              <span className="nx-phase-num">Phase {gi + 1}</span>
              <span className="nx-phase-name">{g.short}</span>
            </div>
            <div className="nx-phase-steps">
              {steps.slice(g.start, g.end).map((label, i) => {
                const idx = g.start + i;
                const state = idx === current ? "current" : idx < current ? "done" : "";
                return (
                  <div key={label} className={"nx-pstep " + state}>
                    <span className="nx-pstep-dot">{idx < current ? <Icon name="check" size={12} /> : idx + 1}</span>
                    <span className="nx-pstep-label">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CoreOnboarding() {
  const { nav, lang, setLang, theme, toggleTheme, entry, setEntry, OPERATING_SYSTEMS, showToast, platform } = useApp();
  const selectedOS = entry && entry.selectedOS ? entry.selectedOS : null;
  const flow = selectedOS ? "B" : "A";

  const [step, setStep] = useState(0);
  const [f, setF] = useState({
    lang, name: "", country: "Egypt", currency: CURRENCIES[0], tz: TIMEZONES[0],
    chosenOS: selectedOS || null, plan: entry && entry.selectedPlan ? entry.selectedPlan : null,
    buName: "", buPreset: null, branch: "", branchCity: "",
  });
  const upd = (patch) => setF((p) => ({ ...p, ...patch }));

  const effectiveOS = flow === "B" ? selectedOS : f.chosenOS;
  const osObj = OPERATING_SYSTEMS.find((o) => o.id === effectiveOS);
  const osName = osObj ? osObj.name : "your operating system";

  // Two-phase architecture:
  //   Phase 1 — Core Platform Setup (OS-agnostic): Language, Workspace, Main Branch
  //   Phase 2 — First OS Activation: [Choose OS], Plan, Business Unit
  const stepKeys = flow === "A"
    ? ["language", "workspace", "branch", "chooseos", "plan", "bu"]
    : ["language", "workspace", "branch", "plan", "bu"];
  const CORE_COUNT = 3;
  const labelMap = {
    language: "Language", workspace: "Workspace", branch: "Main Branch",
    chooseos: "Operating System", plan: "Plan", bu: "Business Unit", oscontext: "Selected OS",
  };
  const stepLabels = stepKeys.map((k) => labelMap[k]);
  const cur = stepKeys[step];
  const isLast = step === stepKeys.length - 1;

  const canNext = (() => {
    if (cur === "workspace") return !!f.name.trim();
    if (cur === "branch") return !!f.branch.trim();
    if (cur === "chooseos") return !!f.chosenOS;
    if (cur === "plan") return !!f.plan;
    if (cur === "bu") return !!(f.buName.trim() && f.buPreset);
    return true;
  })();

  const finish = () => {
    const os = effectiveOS;
    platform.completeOnboarding({
      workspaceName: f.name,
      country: f.country,
      currency: (f.currency || "EGP").split(" ")[0],
      timezone: (f.tz || "Africa/Cairo").split(" ")[0],
      branchName: f.branch,
      branchCity: f.branchCity,
      osId: os,
      plan: f.plan,
      businessUnitName: f.buName,
      presetId: f.buPreset,
      preset: f.buPreset,
      trialEndsAt: os === "commerce" ? "2026-06-18" : null,
      renewsAt: os === "commerce" ? "2026-06-18" : null,
    });
    setEntry({ ...entry, selectedOS: os, selectedPlan: f.plan });
    if (os === "commerce") {
      showToast("Workspace ready — let's set up Commerce OS");
      nav("commerce-setup");
    } else {
      showToast(osName + " is coming soon — Commerce OS is the active system in this MVP.", "info");
      nav("os-launcher");
    }
  };
  const next = () => isLast ? finish() : setStep(step + 1);
  const back = () => step > 0 ? setStep(step - 1) : nav("login");
  const signOut = () => { platform.logoutUser(); nav("login"); };

  const presets = OS_BU_PRESETS[effectiveOS] || [];

  return (
    <div className="nx-onb">
      <div className="nx-onb-bar">
        <Logo size={26} />
        <span className="nx-spacer" />
        <button className="nx-icon-btn" onClick={toggleTheme} title="Toggle theme"><Icon name={theme === "dark" ? "sun" : "moon"} size={18} /></button>
        <div className="nx-langswitch" style={{ background: "var(--surface-3)" }}>
          <button className={lang === "en" ? "on" : ""} style={{ color: lang === "en" ? "var(--text)" : "var(--text-3)" }} onClick={() => setLang("en")}>EN</button>
          <button className={lang === "ar" ? "on" : ""} style={{ color: lang === "ar" ? "var(--text)" : "var(--text-3)" }} onClick={() => setLang("ar")}>ع</button>
        </div>
        <button className="nx-link" onClick={signOut}>Sign out</button>
      </div>

      <div style={{ padding: "22px 24px 6px", display: "flex", justifyContent: "center" }}>
        <PhaseStepper steps={stepLabels} current={step} coreCount={CORE_COUNT} />
      </div>

      <div className="nx-onb-body" style={{ paddingTop: 18 }}>
        <div className={"nx-onb-card" + (cur === "plan" || cur === "chooseos" ? " wide" : "")} key={cur}>

          {cur === "language" && (
            <>
              <h1 className="nx-onb-h">Choose your language</h1>
              <p className="nx-onb-sub">You can change this anytime. Arabic switches the interface to right-to-left.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
                {[["en", "English", "LTR · Left to right"], ["ar", "العربية", "RTL · من اليمين لليسار"]].map(([id, name, sub]) => (
                  <button key={id} className={"nx-choice" + (f.lang === id ? " on" : "")} style={{ flexDirection: "column", alignItems: "flex-start", gap: 6 }}
                    onClick={() => { upd({ lang: id }); setLang(id); }}>
                    <span className="nx-choice-ic"><Icon name="languages" size={19} /></span>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>{name}</span>
                    <span style={{ fontSize: 12, color: "var(--text-2)" }}>{sub}</span>
                    <span className="nx-choice-check"><Icon name="check" size={13} /></span>
                  </button>
                ))}
              </div>
            </>
          )}

          {cur === "workspace" && (
            <>
              <span className="nx-eyebrow">Your company</span>
              <h1 className="nx-onb-h" style={{ marginTop: 8 }}>Create your workspace</h1>
              <p className="nx-onb-sub">The workspace is your company or group — the home for billing, teams and every operating system.</p>
              <div className="nx-form-grid" style={{ marginTop: 22 }}>
                <Field label="Workspace name" hint="e.g. Mustafa Group — your parent company, not a single shop.">
                  <Input icon="building-2" value={f.name} onChange={(e) => upd({ name: e.target.value })} placeholder="Acme Group" />
                </Field>
                <div className="nx-form-grid cols-2">
                  <Field label="Country"><Select value={f.country} onChange={(e) => upd({ country: e.target.value })}>{COUNTRIES.map((c) => <option key={c}>{c}</option>)}</Select></Field>
                  <Field label="Currency"><Select value={f.currency} onChange={(e) => upd({ currency: e.target.value })}>{CURRENCIES.map((c) => <option key={c}>{c}</option>)}</Select></Field>
                </div>
                <Field label="Timezone"><Select value={f.tz} onChange={(e) => upd({ tz: e.target.value })}>{TIMEZONES.map((c) => <option key={c}>{c}</option>)}</Select></Field>
              </div>
            </>
          )}

          {cur === "oscontext" && osObj && (
            <>
              <span className="nx-eyebrow">Selected operating system</span>
              <h1 className="nx-onb-h" style={{ marginTop: 8 }}>You're setting up {osName}</h1>
              <p className="nx-onb-sub">We'll connect {osName} to {f.name}. Each operating system has its own subscription, navigation and roles.</p>
              <Card style={{ marginTop: 22, background: "var(--surface-2)" }}>
                <div className="nx-row" style={{ gap: 14 }}>
                  <span className="nx-choice-ic" style={{ width: 48, height: 48, background: osObj.accent + "1a", color: osObj.accent }}><Icon name={osObj.icon} size={22} /></span>
                  <div style={{ flex: 1 }}>
                    <div className="nx-row" style={{ gap: 8 }}><span style={{ fontWeight: 800, fontSize: 16 }}>{osName}</span>{osObj.status === "available" ? <Badge tone="pos" dot>Available</Badge> : <Badge tone="neutral">Coming Soon</Badge>}</div>
                    <p style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 4 }}>{osObj.tagline}</p>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-2)", marginTop: 14, lineHeight: 1.55 }}>{osObj.desc}</p>
              </Card>
              {osObj.status !== "available" && (
                <div className="nx-helper" style={{ marginTop: 16 }}><Icon name="info" size={16} />{osName} isn't live yet. You can prepare your workspace now — we'll notify you the moment it launches.</div>
              )}
            </>
          )}

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
                    <button key={os.id} className={"nx-choice" + (on ? " on" : "") + (avail ? "" : " disabled")}
                      style={{ flexDirection: "column", alignItems: "flex-start", gap: 10, padding: 16 }}
                      onClick={() => avail && upd({ chosenOS: os.id, buPreset: null })} disabled={!avail}>
                      <div className="nx-row" style={{ width: "100%", justifyContent: "space-between" }}>
                        <span className="nx-choice-ic" style={{ background: os.accent + "1a", color: os.accent }}><Icon name={os.icon} size={19} /></span>
                        {avail ? <Badge tone="pos" dot>Available</Badge> : <Badge tone="neutral">Soon</Badge>}
                      </div>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{os.name}</span>
                      <span style={{ fontSize: 11.5, color: "var(--text-2)", lineHeight: 1.4, fontWeight: 600 }}>{os.tagline}</span>
                      {on && <span className="nx-choice-check" style={{ insetBlockStart: 16, insetInlineEnd: 16 }}><Icon name="check" size={13} /></span>}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {cur === "plan" && (
            <>
              <span className="nx-eyebrow">{osName}</span>
              <h1 className="nx-onb-h" style={{ marginTop: 8 }}>Choose a plan</h1>
              <p className="nx-onb-sub">Start free for 14 days. Pick the plan for {osName} — you only pay for the systems you switch on.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 22 }}>
                {ONB_PLANS.map((p) => (
                  <button key={p.id} className={"nx-choice nx-plan-choice" + (f.plan === p.id ? " on" : "")} style={{ flexDirection: "column", alignItems: "stretch", gap: 0, padding: 16 }} onClick={() => upd({ plan: p.id })}>
                    {p.pop && <span className="nx-plan-pop">Recommended</span>}
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</span>
                    <span style={{ marginTop: 8, fontWeight: 800, fontSize: 22, letterSpacing: "-.02em" }}>{p.price}<span style={{ fontSize: 11.5, color: "var(--text-3)", fontWeight: 600 }}> {p.per}</span></span>
                    <span style={{ height: 1, background: "var(--border)", margin: "14px 0" }} />
                    <span style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      {p.feats.map((ft) => <span key={ft} style={{ fontSize: 12, color: "var(--text-2)", display: "flex", gap: 7, alignItems: "center" }}><Icon name="check" size={13} style={{ color: "var(--accent)", flexShrink: 0 }} />{ft}</span>)}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {cur === "bu" && (
            <>
              <span className="nx-eyebrow">First business unit</span>
              <h1 className="nx-onb-h" style={{ marginTop: 8 }}>Create a business unit for {osName}</h1>
              <p className="nx-onb-sub">A business unit is one activity or business line inside your workspace.</p>
              <div className="nx-form-grid" style={{ marginTop: 22 }}>
                <Field label="Business unit name"><Input icon="briefcase" value={f.buName} onChange={(e) => upd({ buName: e.target.value })} placeholder={presets[0] ? "e.g. " + presets[0].name : "Business unit name"} /></Field>
                <Field label={"Choose a " + osName + " type"} hint={effectiveOS === "commerce" ? "Applies smart defaults. Pharmacy is a preset inside Commerce OS — not Healthcare OS." : "Applies smart defaults for " + osName + "."}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    {presets.map((p) => (
                      <button key={p.id} className={"nx-choice" + (f.buPreset === p.id ? " on" : "")} style={{ flexDirection: "column", alignItems: "flex-start", gap: 8, padding: 13 }} onClick={() => upd({ buPreset: p.id, buName: f.buName || p.name })}>
                        <span className="nx-choice-ic" style={{ width: 32, height: 32 }}><Icon name={p.ic} size={16} /></span>
                        <span style={{ fontWeight: 700, fontSize: 12.5 }}>{p.name}</span>
                      </button>
                    ))}
                  </div>
                </Field>
                {effectiveOS === "commerce"
                  ? <div className="nx-helper"><Icon name="info" size={16} />This connects <b style={{ margin: "0 4px" }}>Commerce OS</b> to your workspace. You can add more business units and operating systems later.</div>
                  : <div className="nx-helper"><Icon name="info" size={16} />This sets up <b style={{ margin: "0 4px" }}>{osName}</b> for your workspace. You can add more business units later.</div>}
              </div>
            </>
          )}

          {cur === "branch" && (
            <>
              <span className="nx-eyebrow">Core setup · last step</span>
              <h1 className="nx-onb-h" style={{ marginTop: 8 }}>Add your main branch</h1>
              <p className="nx-onb-sub">A branch is a physical operating location for your workspace. You can add more branches later.</p>
              <div className="nx-form-grid" style={{ marginTop: 22 }}>
                <Field label="Branch name"><Input icon="map-pin" value={f.branch} onChange={(e) => upd({ branch: e.target.value })} placeholder="Main Branch" /></Field>
                <Field label="City"><Input value={f.branchCity} onChange={(e) => upd({ branchCity: e.target.value })} placeholder="Alexandria" /></Field>
                <Card style={{ background: "var(--surface-2)", marginTop: 4 }}>
                  <div className="nx-row" style={{ gap: 12 }}>
                    <span className="nx-choice-ic" style={{ background: "var(--accent-weak)", color: "var(--accent)" }}><Icon name="check-check" size={18} /></span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>Core platform ready</div>
                      <p style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 3 }}>{f.name} · {f.branch} · {f.country}. Next, activate your first operating system.</p>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}

          <div className="nx-onb-actions">
            <Button variant="ghost" icon="arrow-left" onClick={back}>Back</Button>
            <Button iconRight={isLast ? "check" : "arrow-right"} disabled={!canNext} onClick={next}>{isLast ? "Finish setup" : "Continue"}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   COMMERCE OS SETUP WIZARD
   ============================================================ */
const SETUP_STEPS = ["Identity", "Preset", "Mode", "Tax", "Numbering", "Templates", "Categories", "Review"];
const PRESET_CATEGORIES = {
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
const PRESET_PREVIEW_ITEMS = {
  pharmacy: [
    { name: "Panadol Extra 24 tabs", qty: 2, price: 50, taxable: true, sku: "MED-0001" },
    { name: "Centrum Multivitamin 30", qty: 1, price: 320, taxable: true, sku: "SUP-0011" },
  ],
  clothing_fashion: [
    { name: "Cotton T-shirt", qty: 2, price: 450, taxable: true, sku: "FAS-TEE-001" },
    { name: "Denim Jeans", qty: 1, price: 950, taxable: true, sku: "FAS-DEN-010" },
    { name: "Hoodie", qty: 1, price: 780, taxable: true, sku: "FAS-HOD-004" },
  ],
  electronics_mobile: [
    { name: "Phone Charger", qty: 1, price: 350, taxable: true, sku: "ELC-CHR-001" },
    { name: "USB-C Cable", qty: 2, price: 180, taxable: true, sku: "ELC-CBL-002" },
    { name: "Earbuds", qty: 1, price: 650, taxable: true, sku: "ELC-EAR-003" },
  ],
  restaurant_cafe: [
    { name: "Latte", qty: 2, price: 95, taxable: true, sku: "CAF-LAT-001" },
    { name: "Sandwich", qty: 1, price: 180, taxable: true, sku: "CAF-SND-002" },
    { name: "Cheesecake", qty: 1, price: 140, taxable: true, sku: "CAF-CHK-003" },
  ],
  supermarket: [
    { name: "Rice 1kg", qty: 1, price: 65, taxable: true, sku: "SUP-RIC-001" },
    { name: "Milk 1L", qty: 2, price: 38, taxable: true, sku: "SUP-MLK-002" },
    { name: "Eggs 12 pack", qty: 1, price: 120, taxable: true, sku: "SUP-EGG-003" },
  ],
  retail: [
    { name: "Sample item", qty: 1, price: 100, taxable: true, sku: "GEN-001" },
    { name: "Sample item 2", qty: 1, price: 150, taxable: true, sku: "GEN-002" },
  ],
  other: [
    { name: "Sample item", qty: 1, price: 100, taxable: true, sku: "GEN-001" },
    { name: "Sample item 2", qty: 1, price: 150, taxable: true, sku: "GEN-002" },
  ],
};
function previewItemsForPreset(presetId) {
  return PRESET_PREVIEW_ITEMS[presetId] || PRESET_PREVIEW_ITEMS.retail;
}
const DEFAULT_UNITS = ["Piece", "Box", "Pack", "Kg", "Gram", "Liter", "Portion"];
const PRESETS = [
  { id: "retail", name: "Retail Store", ic: "shopping-bag" },
  { id: "restaurant_cafe", name: "Restaurant / Cafe", ic: "utensils" },
  { id: "pharmacy", name: "Pharmacy", ic: "pill" },
  { id: "supermarket", name: "Supermarket", ic: "shopping-cart" },
  { id: "electronics_mobile", name: "Electronics / Mobile", ic: "smartphone" },
  { id: "clothing_fashion", name: "Clothing / Fashion", ic: "shirt" },
  { id: "cosmetics", name: "Cosmetics", ic: "sparkles" },
  { id: "medical_supplies", name: "Medical Supplies", ic: "cross" },
  { id: "other", name: "Other", ic: "more-horizontal" },
];

function CommerceSetup() {
  const { nav, setup, setSetup, setSetupDone, showToast, workspace } = useApp();
  const [step, setStep] = useState(0);
  const upd = (patch) => setSetup({ ...setup, ...patch });
  const goNext = () => step < 7 ? setStep(step + 1) : finish();
  const goBack = () => step > 0 ? setStep(step - 1) : nav("os-launcher");
  const finish = () => { setSetupDone(true); showToast("Commerce OS is ready 🎉"); nav("dashboard"); };

  return (
    <div className="nx-onb">
      <div className="nx-onb-bar">
        <Logo size={26} />
        <span style={{ width: 1, height: 24, background: "var(--border)" }} />
        <span style={{ fontSize: 13.5, fontWeight: 600 }}>Set up Commerce OS</span>
        <Badge tone="accent" icon="store" >{workspace.name || "Workspace"}</Badge>
        <span className="nx-spacer" />
        <button className="nx-link" onClick={() => nav("os-launcher")}>Save & exit</button>
      </div>
      <div style={{ padding: "20px 32px", borderBottom: "1px solid var(--border)", background: "var(--surface)", overflowX: "auto" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}><Stepper steps={SETUP_STEPS} current={step} /></div>
      </div>
      <div className="nx-wiz">
        <div className="nx-wiz-main" data-scroll-main>
          <div className="nx-wiz-main-inner" key={step}>
            {step === 0 && <StepIdentity setup={setup} upd={upd} />}
            {step === 1 && <StepPreset setup={setup} upd={upd} />}
            {step === 2 && <StepMode setup={setup} upd={upd} />}
            {step === 3 && <StepTax setup={setup} upd={upd} />}
            {step === 4 && <StepNumbering setup={setup} upd={upd} />}
            {step === 5 && <StepTemplates setup={setup} upd={upd} />}
            {step === 6 && <StepCategories setup={setup} upd={upd} />}
            {step === 7 && <StepReview setup={setup} />}
            <div className="nx-onb-actions">
              <Button variant="ghost" icon="arrow-left" onClick={goBack}>Back</Button>
              <Button iconRight={step === 7 ? "check" : "arrow-right"} onClick={goNext}>{step === 7 ? "Finish Setup" : "Continue"}</Button>
            </div>
          </div>
        </div>
        <div className="nx-wiz-aside">
          <SetupPreview setup={setup} step={step} />
        </div>
      </div>
    </div>
  );
}

/* ---- Step: Identity ---- */
function StepIdentity({ setup, upd }) {
  return (
    <div>
      <h2 className="nx-onb-h">Set up your business identity</h2>
      <p className="nx-onb-sub">This appears on receipts, invoices, tax invoices, reports and customer documents.</p>
      <div className="nx-form-grid" style={{ marginTop: 24 }}>
        <Field label="Business display name"><Input value={setup.displayName} onChange={(e) => upd({ displayName: e.target.value })} placeholder={setup.displayName || "Business display name"} /></Field>
        <Field label="Legal business name" optional><Input value={setup.legalName} onChange={(e) => upd({ legalName: e.target.value })} placeholder="Legal business name" /></Field>
        <div className="nx-form-grid cols-2">
          <Field label="Phone"><Input icon="phone" value={setup.phone} onChange={(e) => upd({ phone: e.target.value })} placeholder="01000000000" /></Field>
          <Field label="Email" optional><Input icon="mail" value={setup.email} onChange={(e) => upd({ email: e.target.value })} placeholder="store@business.com" /></Field>
        </div>
        <Field label="Address"><Input icon="map-pin" value={setup.address} onChange={(e) => upd({ address: e.target.value })} placeholder="Street, area" /></Field>
        <div className="nx-form-grid cols-2">
          <Field label="City"><Input value={setup.city} onChange={(e) => upd({ city: e.target.value })} placeholder="Alexandria" /></Field>
          <Field label="Country"><Select value={setup.country === "EG" ? "Egypt" : setup.country} onChange={(e) => upd({ country: e.target.value })}>{COUNTRIES.map((c) => <option key={c}>{c}</option>)}</Select></Field>
        </div>
        <div className="nx-form-grid cols-2">
          <Field label="Commercial reg. no." optional><Input value={setup.crn} onChange={(e) => upd({ crn: e.target.value })} placeholder="CR-000000" /></Field>
          <Field label="Tax reg. no." optional><Input value={setup.trn} onChange={(e) => upd({ trn: e.target.value })} placeholder="123456789" /></Field>
        </div>
        <Field label="Business logo" hint="Shown on all documents. Use a transparent PNG or SVG for best results.">
          <LogoUpload value={setup.logo} onChange={(v) => upd({ logo: v })} businessName={setup.displayName} />
        </Field>
      </div>
    </div>
  );
}

/* ---- Step: Preset ---- */
function StepPreset({ setup, upd }) {
  const businessType = setup.presetId || setup.businessType || setup.preset;
  const current = PRESETS.find((p) => p.id === businessType) || PRESETS[0];
  const [editing, setEditing] = useState(false);
  const pick = (id) => { upd({ presetId: id, businessType: id, preset: id, categories: null }); setEditing(false); };
  return (
    <div>
      <h2 className="nx-onb-h">Confirm your Commerce OS preset</h2>
      <p className="nx-onb-sub">We pre-selected <b style={{ color: "var(--text)" }}>{current.name}</b> from your business unit. This applies smart defaults for categories, products, taxes, receipts and reports. You can change it before continuing.</p>

      {/* Confirmation card */}
      <Card style={{ marginTop: 22, padding: 18 }}>
        <div className="nx-row" style={{ gap: 14 }}>
          <span className="nx-choice-ic on" style={{ width: 46, height: 46, background: "var(--accent)", color: "#fff" }}><Icon name={current.ic} size={22} /></span>
          <div style={{ flex: 1 }}>
            <div className="nx-row" style={{ gap: 8 }}>
              <span style={{ fontWeight: 800, fontSize: 16 }}>{current.name}</span>
              <Badge tone="accent" icon="link">From business unit</Badge>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 3 }}>Synced with your business unit type · one shared value</div>
          </div>
          <Button variant="secondary" size="sm" icon={editing ? "x" : "pencil"} onClick={() => setEditing(!editing)}>{editing ? "Cancel" : "Change preset"}</Button>
        </div>
      </Card>

      {/* Edit grid (revealed on demand) */}
      {editing && (
        <div className="nx-rise" style={{ marginTop: 14 }}>
          <div className="nx-field-label" style={{ marginBottom: 10 }}>Choose a different Commerce preset</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {PRESETS.map((p) => (
              <button key={p.id} className={"nx-choice" + (businessType === p.id ? " on" : "")} style={{ flexDirection: "column", alignItems: "flex-start", gap: 10 }} onClick={() => pick(p.id)}>
                <span className="nx-choice-ic"><Icon name={p.ic} size={19} /></span>
                <span style={{ fontWeight: 700, fontSize: 13.5 }}>{p.name}</span>
                {businessType === p.id && <span className="nx-choice-check"><Icon name="check" size={13} /></span>}
              </button>
            ))}
          </div>
          <div className="nx-note" style={{ marginTop: 12 }}><Icon name="info" size={14} />Changing this here also updates your business unit type — there's only ever one value.</div>
        </div>
      )}

      {businessType === "pharmacy" && (
        <Card style={{ marginTop: 18, background: "var(--surface-2)" }}>
          <div className="nx-row"><span className="nx-choice-ic" style={{ background: "var(--accent-weak)", color: "var(--accent)" }}><Icon name="pill" size={18} /></span>
            <div><div style={{ fontWeight: 700 }}>Recommended for Pharmacy</div><div style={{ fontSize: 12.5, color: "var(--text-2)" }}>Smart defaults applied to your Commerce OS</div></div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
            {[["Barcode", "ok"], ["Inventory alerts", "ok"], ["POS receipts", "ok"], ["Tax invoices", "ok"], ["Expiry tracking", "soon"], ["Batch number", "soon"], ["Prescription integration", "soon"]].map(([t, s]) => (
              <span key={t} className={"nx-badge tone-" + (s === "ok" ? "pos" : "neutral")}>
                <Icon name={s === "ok" ? "check" : "lock"} size={12} />{t}{s === "soon" && " · soon"}
              </span>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

/* ---- Step: Mode ---- */
function StepMode({ setup, upd }) {
  const modes = [
    { id: "physical", name: "Physical Store", ic: "store", desc: "POS · Receipts · Inventory · Branch sales", rec: "Cashier sales, barcode scanning, in-store customers" },
    { id: "online", name: "Online Store", ic: "globe", desc: "Product catalog · Online orders · Online invoices", rec: "Sell through an online catalog and channels" },
    { id: "both", name: "Both", ic: "layers", desc: "POS + Online catalog + unified inventory", rec: "One inventory across store and online" },
  ];
  return (
    <div>
      <h2 className="nx-onb-h">How do you operate?</h2>
      <p className="nx-onb-sub">You can change this and add channels at any time.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
        {modes.map((m) => (
          <button key={m.id} className={"nx-choice" + (setup.mode === m.id ? " on" : "")} onClick={() => upd({ mode: m.id })}>
            <span className="nx-choice-ic"><Icon name={m.ic} size={19} /></span>
            <div>
              <div style={{ fontWeight: 700 }}>{m.name}</div>
              <div style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 2 }}>{m.desc}</div>
              <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 5 }}>Recommended for: {m.rec}</div>
            </div>
            <span className="nx-choice-check"><Icon name="check" size={13} /></span>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 22 }}>
        <div className="nx-field-label" style={{ marginBottom: 10 }}>Future modules</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Delivery", "Pickup", "Prescription integration", "Advanced batch tracking"].map((t) => (
            <span key={t} className="nx-badge tone-neutral"><Icon name="lock" size={12} />{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Step: Tax ---- */
function StepTax({ setup, upd }) {
  const { money } = useApp();
  return (
    <div>
      <h2 className="nx-onb-h">Tax setup</h2>
      <p className="nx-onb-sub">Configure VAT so your invoices and receipts stay compliant.</p>
      <div className="nx-field-label" style={{ margin: "24px 0 10px" }}>Is your business registered for VAT?</div>
      <div style={{ display: "flex", gap: 12 }}>
        {[["Not registered for VAT", false], ["Registered for VAT", true]].map(([t, v]) => (
          <button key={t} className={"nx-choice" + (setup.vatRegistered === v ? " on" : "")} style={{ flex: 1 }} onClick={() => upd({ vatRegistered: v })}>
            <span className="nx-choice-ic"><Icon name={v ? "badge-check" : "circle-slash"} size={18} /></span>
            <span style={{ fontWeight: 700 }}>{t}</span>
            <span className="nx-choice-check"><Icon name="check" size={13} /></span>
          </button>
        ))}
      </div>
      {setup.vatRegistered && (
        <>
          <div className="nx-form-grid" style={{ marginTop: 22 }}>
            <div className="nx-form-grid cols-2">
              <Field label="Tax registration number"><Input value={setup.taxNumber} onChange={(e) => upd({ taxNumber: e.target.value })} /></Field>
              <Field label="Default VAT rate"><Input type="number" value={setup.vatRate} onChange={(e) => upd({ vatRate: +e.target.value })} /></Field>
            </div>
            <div className="nx-form-grid cols-2">
              <Field label="Tax label" hint="Shown on documents."><Input value={setup.taxLabel} onChange={(e) => upd({ taxLabel: e.target.value })} /></Field>
              <Field label="Prices include tax?">
                <div className="nx-seg" style={{ width: "100%" }}>
                  <button className={setup.pricesIncludeTax ? "on" : ""} style={{ flex: 1 }} onClick={() => upd({ pricesIncludeTax: true })}>Yes — inclusive</button>
                  <button className={!setup.pricesIncludeTax ? "on" : ""} style={{ flex: 1 }} onClick={() => upd({ pricesIncludeTax: false })}>No — exclusive</button>
                </div>
              </Field>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 18 }}>
            <Card style={{ background: setup.pricesIncludeTax ? "var(--accent-weak)" : "var(--surface-2)", borderColor: setup.pricesIncludeTax ? "var(--accent-weak-2)" : "var(--border)" }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Tax inclusive</div>
              <p style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 6, lineHeight: 1.5 }}>Price {money(114)} = Net {money(100)} + {setup.taxLabel} {money(14)}</p>
            </Card>
            <Card style={{ background: !setup.pricesIncludeTax ? "var(--accent-weak)" : "var(--surface-2)", borderColor: !setup.pricesIncludeTax ? "var(--accent-weak-2)" : "var(--border)" }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Tax exclusive</div>
              <p style={{ fontSize: 12.5, color: "var(--text-2)", marginTop: 6, lineHeight: 1.5 }}>Price {money(100)} + {setup.taxLabel} {money(14)} = Total {money(114)}</p>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

/* ---- Step: Numbering ---- */
function StepNumbering({ setup, upd }) {
  return (
    <div>
      <h2 className="nx-onb-h">Invoice & receipt numbering</h2>
      <p className="nx-onb-sub">Set how your documents are numbered. These appear on every sale.</p>
      <div className="nx-form-grid" style={{ marginTop: 24 }}>
        <div className="nx-form-grid cols-2">
          <Field label="Invoice prefix"><Input value={setup.invoicePrefix} onChange={(e) => upd({ invoicePrefix: e.target.value })} /></Field>
          <Field label="Starting invoice number"><Input type="number" value={setup.invoiceStart} onChange={(e) => upd({ invoiceStart: +e.target.value })} /></Field>
        </div>
        <div className="nx-form-grid cols-2">
          <Field label="Receipt prefix"><Input value={setup.receiptPrefix} onChange={(e) => upd({ receiptPrefix: e.target.value })} /></Field>
          <Field label="Starting receipt number"><Input type="number" value={setup.receiptStart} onChange={(e) => upd({ receiptStart: +e.target.value })} /></Field>
        </div>
        <Field label="Footer message"><Input value={setup.footer} onChange={(e) => upd({ footer: e.target.value })} /></Field>
        <Field label="Return policy" optional><Textarea value={setup.returnPolicy} onChange={(e) => upd({ returnPolicy: e.target.value })} /></Field>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
        <span className="nx-badge tone-accent mono" style={{ fontSize: 13 }}>{setup.invoicePrefix}-{setup.invoiceStart}</span>
        <span className="nx-badge tone-accent mono" style={{ fontSize: 13 }}>{setup.receiptPrefix}-{setup.receiptStart}</span>
      </div>
    </div>
  );
}

/* ---- Step: Templates ---- */
function StepTemplates({ setup, upd }) {
  const presetId = setup.presetId || setup.businessType || setup.preset;
  return (
    <div>
      <h2 className="nx-onb-h">Choose your document templates</h2>
      <p className="nx-onb-sub">Pick the look of your receipts and tax invoices. Preview updates live →</p>
      <div style={{ marginTop: 22 }}>
        <div className="nx-field-label" style={{ marginBottom: 10 }}>POS receipt size</div>
        <div className="nx-seg">
          {["58mm", "80mm"].map((s) => <button key={s} className={setup.receiptSize === s ? "on" : ""} onClick={() => upd({ receiptSize: s })}>{s}</button>)}
        </div>
      </div>
      <div style={{ marginTop: 22 }}>
        <div className="nx-field-label" style={{ marginBottom: 10 }}>Receipt style</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[["minimal", "Minimal", "Just the essentials"], ["classic", "Classic", "Balanced & branded"], ["detailed", "Detailed", "Full breakdown"]].map(([id, t, d]) => (
            <button key={id} className={"nx-choice" + (setup.receiptStyle === id ? " on" : "")} style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }} onClick={() => upd({ receiptStyle: id })}>
              <span style={{ fontWeight: 700, fontSize: 13.5 }}>{t}</span>
              <span style={{ fontSize: 12, color: "var(--text-2)" }}>{d}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 22 }}>
        <div className="nx-field-label" style={{ marginBottom: 10 }}>Tax invoice template</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <button className={"nx-choice on"} style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 13.5 }}>A4 — Simple</span><span style={{ fontSize: 12, color: "var(--text-2)" }}>Clean tax invoice, EGP-ready</span>
          </button>
          <button className="nx-choice disabled" style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 13.5 }}>Online order invoice</span><span className="nx-badge tone-neutral"><Icon name="lock" size={11} />Future</span>
          </button>
        </div>
      </div>
      {presetId === "pharmacy" && <div className="nx-helper" style={{ marginTop: 20 }}>
        <Icon name="info" size={16} />
        Expiry date, batch number and prescription reference can be added to pharmacy documents when those modules launch.
      </div>}
    </div>
  );
}

/* ---- Step: Categories & Units ---- */
function StepCategories({ setup, upd }) {
  const businessType = setup.presetId || setup.businessType || setup.preset;
  const seededCats = setup.categories || PRESET_CATEGORIES[businessType] || ["General"];
  const seededUnits = setup.units || ["Piece", "Box", "Pack"];
  const [cats, setCats] = useState(seededCats);
  const [units, setUnits] = useState(seededUnits);
  const [newCat, setNewCat] = useState("");
  useEffect(() => { upd({ categories: cats, units }); }, [cats, units]);
  // reseed when preset changes and user hasn't customized
  const addCat = () => { const v = newCat.trim(); if (v && !cats.includes(v)) { setCats([...cats, v]); setNewCat(""); } };
  const presetName = PRESETS.find((p) => p.id === businessType)?.name || "your business";

  return (
    <div>
      <h2 className="nx-onb-h">Categories & units</h2>
      <p className="nx-onb-sub">We've seeded defaults from the {presetName} preset. Add, remove or keep them — you can change these any time.</p>

      <div className="nx-field-label" style={{ margin: "24px 0 10px" }}>Product categories</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {cats.map((c) => (
          <span key={c} className="nx-cat-chip">{c}<button onClick={() => setCats(cats.filter((x) => x !== c))}><Icon name="x" size={13} /></button></span>
        ))}
      </div>
      <div className="nx-row" style={{ gap: 8, marginTop: 12, maxWidth: 360 }}>
        <Input icon="plus" placeholder="Add a category…" value={newCat} onChange={(e) => setNewCat(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCat(); } }} />
        <Button variant="secondary" onClick={addCat}>Add</Button>
      </div>

      <div className="nx-field-label" style={{ margin: "28px 0 10px" }}>Units of measure</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {DEFAULT_UNITS.map((u) => {
          const on = units.includes(u);
          return <button key={u} className={"nx-chip-filter" + (on ? " on" : "")} onClick={() => setUnits(on ? units.filter((x) => x !== u) : [...units, u])}>{on && <Icon name="check" size={13} style={{ marginInlineEnd: 5, verticalAlign: "-2px" }} />}{u}</button>;
        })}
      </div>
      <div className="nx-helper" style={{ marginTop: 22 }}>
        <Icon name="sparkles" size={16} />Categories and units power your products, POS filters and reports — bilingual display names are supported as you grow.
      </div>
    </div>
  );
}

/* ---- Step: Review ---- */
function StepReview({ setup }) {
  const { workspace } = useApp();
  const businessType = setup.presetId || setup.businessType || setup.preset;
  const rows = [
    ["Workspace", workspace.name || "Workspace"],
    ["Operating System", "Commerce OS"],
    ["Business", setup.displayName || "Commerce business"],
    ["Commerce preset", PRESETS.find((p) => p.id === businessType)?.name || "Retail Store"],
    ["Operational mode", setup.mode === "physical" ? "Physical Store" : setup.mode === "online" ? "Online Store" : "Both"],
    ["VAT", setup.vatRegistered ? `Enabled · ${setup.vatRate}%` : "Not registered"],
    ["Prices", setup.pricesIncludeTax ? "Tax inclusive" : "Tax exclusive"],
    ["Templates", `${(setup.receiptStyle || "classic").charAt(0).toUpperCase() + (setup.receiptStyle || "classic").slice(1)} ${setup.receiptSize || "80mm"} receipt · A4 tax invoice`],
    ["Categories", (setup.categories || []).length + " categories · " + (setup.units || []).length + " units"],
  ];
  return (
    <div>
      <h2 className="nx-onb-h">Review your setup</h2>
      <p className="nx-onb-sub">Everything looks good? You can change any of this later in Settings.</p>
      <Card style={{ marginTop: 22, padding: 0, overflow: "hidden" }}>
        {rows.map(([k, v], i) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "13px 18px", borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : "none" }}>
            <span style={{ color: "var(--text-2)", fontSize: 13.5 }}>{k}</span><span style={{ fontWeight: 600, fontSize: 13.5 }}>{v}</span>
          </div>
        ))}
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 18 }}>
        <div>
          <div className="nx-field-label" style={{ marginBottom: 10 }}>Enabled modules</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {["Products", "Inventory", "POS", "Orders", "Invoices", "Customers", "Reports"].map((m) => <span key={m} className="nx-badge tone-pos"><Icon name="check" size={11} />{m}</span>)}
          </div>
        </div>
        <div>
          <div className="nx-field-label" style={{ marginBottom: 10 }}>Future modules</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {["Delivery", "Prescription Integration", "Batch Tracking", "Loyalty"].map((m) => <span key={m} className="nx-badge tone-neutral"><Icon name="lock" size={11} />{m}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Live preview aside ---- */
function SetupPreview({ setup, step }) {
  const { products } = useApp();
  const presetId = setup.presetId || setup.businessType || setup.preset || "retail";
  const sampleItems = products.length
    ? products.slice(0, 3).map((p) => ({ name: p.name, qty: 1, price: p.price, taxable: p.taxable, sku: p.sku }))
    : previewItemsForPreset(presetId);
  const showInvoice = step === 3 || step === 7;
  return (
    <>
      <div className="nx-wiz-aside-label">{showInvoice ? "Tax invoice preview" : "Receipt preview"}</div>
      <div style={{ display: "flex", justifyContent: "center", overflow: "hidden" }}>
        {showInvoice
          ? <div style={{ transform: "scale(.62)", transformOrigin: "top center", width: "100%" }}><InvoiceDoc setup={setup} items={sampleItems} compact /></div>
          : <ReceiptDoc setup={setup} items={sampleItems} meta={{ payment: "Cash" }} />}
      </div>
      <div className="nx-note" style={{ marginTop: 4 }}><Icon name="refresh-cw" size={14} />Updates live as you edit your setup.</div>
    </>
  );
}

Object.assign(window, { CoreOnboarding, CommerceSetup });
