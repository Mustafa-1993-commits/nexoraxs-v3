// ============================================================
// NexoraXS — Global store, i18n, seed data, helpers
// ============================================================
const { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } = React;

/* ---------------- i18n ---------------- */
const DICT = {
  en: {
    // platform
    platform: "Platform", operating_systems: "Operating Systems", pricing: "Pricing", faq: "FAQ",
    sign_in: "Sign in", start_trial: "Start Free Trial", view_commerce: "View Commerce OS",
    // core nav
    home: "Home", billing: "Billing", team: "Team & Access", integrations: "Integrations", settings: "Settings",
    // commerce nav
    dashboard: "Dashboard", pos: "POS", products: "Products", inventory: "Inventory",
    orders: "Orders", invoices: "Invoices", customers: "Customers", reports: "Reports",
    // common
    workspace: "Workspace", notifications: "Notifications", search: "Search", add_product: "Add Product",
    open_pos: "Open POS", view_invoices: "View Invoices", save: "Save", cancel: "Cancel", next: "Next",
    back: "Back", finish_setup: "Finish Setup", checkout: "Checkout", complete_sale: "Complete Sale",
    subtotal: "Subtotal", discount: "Discount", vat: "VAT", total: "Total", net: "Net",
    cash: "Cash", card: "Card", wallet: "Wallet", category: "Category", price: "Price", stock: "Stock",
    today_sales: "Today's sales", orders_today: "Orders today", gross_sales: "Gross sales",
    vat_collected: "VAT collected", net_sales: "Net sales", low_stock: "Low stock",
    top_products: "Top products", recent_orders: "Recent orders", quick_actions: "Quick actions",
    cart: "Cart", empty_cart: "Cart is empty", scan_or_search: "Scan barcode or search products",
    customer: "Customer", payment_method: "Payment method", new_sale: "New Sale",
    choose_os: "Choose an operating system", available: "Available", coming_soon: "Coming Soon",
    setup_required: "Setup required", set_up: "Set up Commerce OS",
    language: "Language", english: "English", arabic: "العربية",
    product_hub: "Product Hub", branch: "Branch", business_unit: "Business unit",
  },
  ar: {
    platform: "المنصة", operating_systems: "أنظمة التشغيل", pricing: "الأسعار", faq: "الأسئلة الشائعة",
    sign_in: "تسجيل الدخول", start_trial: "ابدأ تجربة مجانية", view_commerce: "استعرض نظام التجارة",
    home: "الرئيسية", billing: "الفوترة", team: "الفريق والصلاحيات", integrations: "التكاملات", settings: "الإعدادات",
    dashboard: "لوحة التحكم", pos: "نقطة البيع", products: "المنتجات", inventory: "المخزون",
    orders: "الطلبات", invoices: "الفواتير", customers: "العملاء", reports: "التقارير",
    workspace: "مساحة العمل", notifications: "الإشعارات", search: "بحث", add_product: "إضافة منتج",
    open_pos: "فتح نقطة البيع", view_invoices: "عرض الفواتير", save: "حفظ", cancel: "إلغاء", next: "التالي",
    back: "رجوع", finish_setup: "إنهاء الإعداد", checkout: "الدفع", complete_sale: "إتمام البيع",
    subtotal: "الإجمالي الفرعي", discount: "الخصم", vat: "الضريبة", total: "الإجمالي", net: "الصافي",
    cash: "نقدًا", card: "بطاقة", wallet: "محفظة", category: "الفئة", price: "السعر", stock: "المخزون",
    today_sales: "مبيعات اليوم", orders_today: "طلبات اليوم", gross_sales: "إجمالي المبيعات",
    vat_collected: "الضريبة المحصلة", net_sales: "صافي المبيعات", low_stock: "مخزون منخفض",
    top_products: "أكثر المنتجات مبيعًا", recent_orders: "أحدث الطلبات", quick_actions: "إجراءات سريعة",
    cart: "السلة", empty_cart: "السلة فارغة", scan_or_search: "امسح الباركود أو ابحث عن المنتجات",
    customer: "العميل", payment_method: "طريقة الدفع", new_sale: "بيع جديد",
    choose_os: "اختر نظام تشغيل", available: "متاح", coming_soon: "قريبًا",
    setup_required: "يتطلب الإعداد", set_up: "إعداد نظام التجارة",
    language: "اللغة", english: "English", arabic: "العربية",
    product_hub: "مركز المنتجات", branch: "الفرع", business_unit: "وحدة العمل",
  },
};

/* ---------------- Operating Systems metadata ---------------- */
const OPERATING_SYSTEMS = [
  { id: "commerce", name: "Commerce OS", icon: "store", status: "available", accent: "#4f46e5",
    tagline: "POS · Inventory · Orders · Invoices · Taxes · Reports",
    desc: "Run sales, inventory, invoices, taxes and daily operations from one place." },
  { id: "healthcare", name: "Healthcare OS", icon: "stethoscope", status: "soon", accent: "#0d9488",
    tagline: "Clinics · Hospitals · Patients · Appointments · Medical Records",
    desc: "Patient records, appointments and prescriptions for clinics and hospitals." },
  { id: "hr", name: "HR OS", icon: "users-round", status: "soon", accent: "#d97706",
    tagline: "Employees · Attendance · Payroll · Leaves",
    desc: "The master employee system — attendance, payroll, contracts and shifts." },
  { id: "crm", name: "CRM OS", icon: "git-branch", status: "soon", accent: "#7c3aed",
    tagline: "Leads · Deals · Campaigns · Follow-ups",
    desc: "Pipelines, campaigns and follow-ups to grow customer relationships." },
  { id: "gym", name: "Gym OS", icon: "dumbbell", status: "soon", accent: "#0891b2",
    tagline: "Members · Memberships · Trainers · Classes",
    desc: "Memberships, classes, trainers and renewals for fitness businesses." },
  { id: "maintenance", name: "Maintenance OS", icon: "wrench", status: "soon", accent: "#dc2626",
    tagline: "Repair Centers · Tickets · Technicians · Warranty",
    desc: "Job cards, repair tickets and spare-parts usage for service centers." },
];

/* ---------------- Helpers ---------------- */
function money(n, lang) {
  const v = (Math.round(n * 100) / 100).toLocaleString("en-EG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return lang === "ar" ? `${v} ج.م` : `${v} EGP`;
}
// Tax-inclusive breakdown. gross is the price the customer pays (tax included).
function taxBreak(gross, rate, taxable) {
  if (!taxable || !rate) return { net: gross, vat: 0, total: gross };
  const net = gross / (1 + rate / 100);
  const vat = gross - net;
  return { net, vat, total: gross };
}

const DEFAULT_SETUP = {
  // identity
  displayName: "", legalName: "", phone: "", email: "", address: "", city: "", country: "Egypt",
  crn: "", trn: "", logo: null,
  // preset / mode
  presetId: "retail", businessType: "retail", preset: "retail", mode: "physical",
  // tax
  vatRegistered: true, vatRate: 14, pricesIncludeTax: true, taxLabel: "VAT", taxNumber: "123456789",
  // numbering
  invoicePrefix: "INV", receiptPrefix: "RCPT", invoiceStart: 1001, receiptStart: 1001,
  footer: "Thank you for shopping with us", returnPolicy: "Returns accepted within 14 days with receipt.",
  // templates
  receiptSize: "80mm", receiptStyle: "classic", invoiceTemplate: "a4-simple",
};

/* ---------------- Context ---------------- */
const AppCtx = createContext(null);
const useApp = () => useContext(AppCtx);

// prettify a preset id → display label (fallback when not in catalogs)
function prettyPreset(id) {
  if (!id) return "—";
  const known = {
    retail: "Retail Store", pharmacy: "Pharmacy", restaurant_cafe: "Restaurant / Cafe",
    supermarket: "Supermarket", electronics_mobile: "Electronics / Mobile Store",
    clothing_fashion: "Clothing / Fashion", cosmetics: "Cosmetics",
    medical_supplies: "Medical Supplies", other: "Other",
    fitness_gym: "Fitness Gym", maintenance_center: "Maintenance Center",
  };
  if (known[id]) return known[id];
  return id.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
function setupView(row, fallbackBU, workspace) {
  const presetId = row && row.presetId ? row.presetId : row && row.businessType ? row.businessType : fallbackBU && (fallbackBU.presetId || fallbackBU.preset) ? (fallbackBU.presetId || fallbackBU.preset) : DEFAULT_SETUP.presetId;
  const rawAddress = row && row.address ? row.address : "";
  const address = /^file:|^[A-Z]:\\|\/home\/|\/Users\/|\\Users\\/i.test(rawAddress) ? "" : rawAddress;
  const displayName = (row && (row.businessDisplayName || row.displayName)) || (fallbackBU && fallbackBU.name) || DEFAULT_SETUP.displayName;
  const legalName = (row && (row.legalBusinessName || row.legalName)) || (displayName ? `${displayName} LLC` : DEFAULT_SETUP.legalName);
  return {
    ...DEFAULT_SETUP,
    ...(row || {}),
    address,
    presetId,
    businessType: presetId,
    preset: presetId,
    businessDisplayName: displayName,
    displayName,
    legalBusinessName: legalName,
    legalName,
    country: (row && row.country) || (workspace && workspace.country) || DEFAULT_SETUP.country,
  };
}
function osMeta(id) { return OPERATING_SYSTEMS.find((o) => o.id === id) || OPERATING_SYSTEMS[0]; }
function fmtDate(iso) {
  if (!iso) return "—";
  try { return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }); } catch (e) { return iso; }
}
function authDestination(db, DB) {
  if (!DB.Q.currentUser(db)) return "login";
  if (!DB.Q.currentWorkspace(db)) return "workspace-welcome";
  const osId = db.currentOSId || ((DB.Q.currentOSSubscription(db) || {}).osId);
  if (osId === "commerce" && DB.Q.currentCommerceSetup(db)) return "dashboard";
  if (osId === "commerce") return "commerce-setup";
  return "os-launcher";
}

function AppProvider({ children }) {
  const DB = window.NexoraDB;
  const [db, setDbState] = useState(() => DB.loadDB());
  const [route, setRoute] = useState(() => ({ screen: DB.Q.currentUser(db) ? authDestination(db, DB) : "landing", params: {} }));
  // Commerce-specific config (business identity/tax/templates) — persisted in nexoraxs.db.commerceSetups
  const [setup, setSetupState] = useState(() => setupView(DB.Q.currentCommerceSetup(db), DB.Q.currentBusinessUnit(db), DB.Q.currentWorkspace(db)));
  const [setupDone, setSetupDoneState] = useState(() => !!DB.Q.currentCommerceSetup(db));
  const [toast, setToast] = useState(null);
  const histRef = useRef(["landing"]);

  // ---- persist db on every change ----
  const setDb = useCallback((updater) => {
    setDbState((prev) => {
      const nextDb = typeof updater === "function" ? updater(prev) : updater;
      DB.persistDB(nextDb);
      return nextDb;
    });
  }, []);

  // ---- locale / theme / entry are derived from db (single source of truth) ----
  const lang = db.locale || "en";
  const theme = db.theme || "light";
  const entry = db.entryContext || { source: "general_landing", selectedOS: null, selectedPlan: null };
  const setLang = useCallback((l) => setDb((d) => DB.M_setLocale(d, typeof l === "function" ? l(d.locale) : l)), [setDb]);
  const setTheme = useCallback((tm) => setDb((d) => DB.M_setTheme(d, typeof tm === "function" ? tm(d.theme) : tm)), [setDb]);
  const toggleTheme = useCallback(() => setDb((d) => DB.M_setTheme(d, d.theme === "dark" ? "light" : "dark")), [setDb]);
  const setEntry = useCallback((e) => setDb((d) => DB.M_setEntry(d, typeof e === "function" ? e(d.entryContext) : e)), [setDb]);

  // ---- setup writes mirror into the current Commerce setup row + BU preset ----
  const setSetup = useCallback((patchOrFn) => {
    setSetupState((prev) => {
      const next = typeof patchOrFn === "function" ? patchOrFn(prev) : patchOrFn;
      const presetId = next.presetId || next.businessType || next.preset || prev.presetId || prev.businessType || prev.preset;
      const displayName = next.businessDisplayName || next.displayName || prev.businessDisplayName || prev.displayName;
      const legalName = next.legalBusinessName || next.legalName || prev.legalBusinessName || prev.legalName || (displayName ? `${displayName} LLC` : "");
      const normalized = {
        ...next,
        presetId,
        businessType: presetId,
        preset: presetId,
        businessDisplayName: displayName,
        displayName,
        legalBusinessName: legalName,
        legalName,
      };
      setDb((d) => {
        const bu = DB.Q.currentBusinessUnit(d);
        if (!bu || (bu.osId || bu.os) !== "commerce") return d;
        return DB.M_updateCommerceSetup(d, bu.id, normalized);
      });
      return normalized;
    });
  }, [setDb]);
  const setSetupDone = useCallback((v) => { setSetupDoneState(v); }, []);

  // ---- platform actions (relational mutations) ----
  const platform = useMemo(() => ({
    db,
    Q: DB.Q,
    reset: () => {
      const fresh = DB.resetDB("empty");
      setDbState(fresh);
    },
    completeOnboarding: (data) => setDb((d) => DB.M_completeOnboarding(d, data)),
    createUser: (data) => {
      const next = DB.M_createUser(DB.loadDB(), data);
      DB.persistDB(next); setDbState(next);
      return next;
    },
    loginUser: (data) => {
      const next = DB.M_loginUser(DB.loadDB(), data);
      DB.persistDB(next); setDbState(next);
      return next;
    },
    logoutUser: () => {
      const next = DB.M_logoutUser(DB.loadDB());
      DB.persistDB(next); setDbState(next);
      return next;
    },
    authDestination: (nextDb) => authDestination(nextDb || DB.loadDB(), DB),
    getUserDisplayName: DB.getUserDisplayName,
    ensureOwner: () => setDb((d) => DB.M_ensureOwner(d)),
    updateWorkspace: (patch) => setDb((d) => DB.M_upsertWorkspace(d, patch)),
    createBranch: (data) => setDb((d) => DB.M_createBranch(d, data)),
    createBusinessUnit: (data) => setDb((d) => DB.M_createBusinessUnit(d, data)),
    updateBusinessUnit: (id, patch) => setDb((d) => DB.M_updateBusinessUnit(d, id, patch)),
    createSubscription: (data) => setDb((d) => DB.M_createSubscription(d, data)),
    addTeamMember: (data) => setDb((d) => DB.M_addTeamMember(d, data)),
    setCurrent: (patch) => setDb((d) => DB.M_setCurrent(d, patch)),
    updateCommerceSetup: (buId, patch) => setDb((d) => DB.M_updateCommerceSetup(d, buId, patch)),
  }), [db, setDb]);

  // explicit demo entry (seeds Mustafa Group + sample catalog) / fresh reset
  const enterDemo = useCallback(() => {
    const d = DB.startDemo(db.locale, db.theme); setDbState(d);
    setSetupDoneState(true); setSetupState(setupView(DB.Q.currentCommerceSetup(d), DB.Q.currentBusinessUnit(d), DB.Q.currentWorkspace(d)));
  }, [db.locale, db.theme]);
  const startFreshSession = useCallback((mode = "empty") => {
    const d = DB.resetDB(mode); setDbState(d);
    setSetupDoneState(!!DB.Q.currentCommerceSetup(d)); setSetupState(setupView(DB.Q.currentCommerceSetup(d), DB.Q.currentBusinessUnit(d), DB.Q.currentWorkspace(d)));
  }, [db.locale, db.theme]);

  // ---- derived, relational views in the shapes screens expect ----
  const workspace = DB.Q.currentWorkspace(db) || { id: null, name: "", country: "Egypt", currency: "EGP", timezone: "Africa/Cairo" };
  const currentUser = DB.Q.currentUser(db);
  const currentUserDisplayName = DB.getUserDisplayName(currentUser);
  const currentBU = DB.Q.currentBusinessUnit(db);
  const currentBranch = DB.Q.currentBranch(db);
  const currentCommerceSetup = DB.Q.currentCommerceSetup(db);
  const subscriptions = DB.Q.subscriptions(db);
  const products = useMemo(() => DB.Q.currentProducts(db), [db]);
  const orders = useMemo(() => DB.Q.currentOrders(db), [db]);
  const customers = useMemo(() => DB.Q.currentCustomers(db), [db]);
  const invoices = useMemo(() => DB.Q.currentInvoices(db), [db]);
  const setProducts = useCallback((rowsOrFn) => setDb((d) => {
    const currentRows = DB.Q.currentProducts(d);
    const rows = typeof rowsOrFn === "function" ? rowsOrFn(currentRows) : rowsOrFn;
    return DB.M_setCommerceProducts(d, rows);
  }), [setDb]);
  const setOrders = useCallback((rowsOrFn) => setDb((d) => {
    const currentRows = DB.Q.currentOrders(d);
    const rows = typeof rowsOrFn === "function" ? rowsOrFn(currentRows) : rowsOrFn;
    return DB.M_setCommerceOrders(d, rows);
  }), [setDb]);
  const setCustomers = useCallback((rowsOrFn) => setDb((d) => {
    const currentRows = DB.Q.currentCustomers(d);
    const rows = typeof rowsOrFn === "function" ? rowsOrFn(currentRows) : rowsOrFn;
    return DB.M_setCommerceCustomers(d, rows);
  }), [setDb]);
  const setInvoices = useCallback((rowsOrFn) => setDb((d) => {
    const currentRows = DB.Q.currentInvoices(d);
    const rows = typeof rowsOrFn === "function" ? rowsOrFn(currentRows) : rowsOrFn;
    return DB.M_setCommerceInvoices(d, rows);
  }), [setDb]);

  const BUSINESS_UNITS = useMemo(() => DB.Q.businessUnits(db).map((bu) => {
    const m = osMeta(bu.osId);
    return {
      id: bu.id, name: bu.name, os: bu.osId || bu.os, preset: prettyPreset(bu.presetId || bu.preset),
      presetId: bu.presetId || bu.preset, icon: m.icon, color: m.accent,
      branches: DB.Q.branchesForBU(db, bu.id).map((b) => b.name),
      active: DB.Q.isSubscribed(db, bu.osId || bu.os),
    };
  }), [db]);

  const BRANCHES = useMemo(() => DB.Q.branches(db).map((b) => b.name), [db]);
  const branch = (db.branches.find((b) => b.id === db.currentBranchId) || db.branches[0] || {}).name || "Main Branch";
  const setBranch = useCallback((name) => setDb((d) => {
    const b = d.branches.find((x) => x.name === name);
    return b ? DB.M_setCurrent(d, { currentBranchId: b.id }) : d;
  }), [setDb]);

  const COMMERCE_PLAN = useMemo(() => {
    const sub = DB.Q.subscriptionForOS(db, "commerce");
    const plan = sub ? DB.Q.plan(db, sub.planId) : DB.Q.plan(db, "commerce_pro");
    const lim = (plan && plan.limits) || { businessUnits: 3, branches: 5, users: 10 };
    const buUsed = DB.Q.businessUnitsForOS(db, "commerce").length;
    const brUsed = DB.Q.branches(db).length;
    const usersUsed = DB.Q.teamMembers(db).length;
    const price = plan ? (plan.price || 0) : 1400;
    const vat = Math.round(price * 0.14);
    return {
      name: "Commerce OS " + (plan ? plan.tier : "Pro"),
      status: sub ? sub.status : "active",
      limits: {
        businessUnits: { used: buUsed, max: lim.businessUnits },
        branches: { used: brUsed, max: lim.branches },
        users: { used: usersUsed, max: lim.users },
      },
      price, vat, total: price + vat, renew: fmtDate(sub && sub.renewsAt),
      subscription: sub || null,
      plan: plan || null,
    };
  }, [db]);

  const team = useMemo(() => DB.Q.teamMembers(db).map((m) => {
    const u = DB.Q.user(db, m.userId) || { fullName: "—", name: "—", email: "—" };
    const bu = m.businessUnitId ? db.businessUnits.find((b) => b.id === m.businessUnitId) : null;
    const br = m.branchId ? db.branches.find((b) => b.id === m.branchId) : null;
    return {
      id: m.id, name: DB.getUserDisplayName(u), email: u.email,
      role: m.osRole || m.workspaceRole,
      status: m.status === "active" ? "Active" : m.status === "invited" ? "Invited" : m.status,
      os: m.osId ? osMeta(m.osId).name : "All systems",
      last: m.lastActive, you: m.userId === db.currentUserId,
      workspaceId: m.workspaceId, osId: m.osId, businessUnitId: bu ? bu.id : null,
      buName: bu ? bu.name : null, branchId: br ? br.id : null, branchName: br ? br.name : null,
      workspaceRole: m.workspaceRole,
    };
  }), [db]);
  const setTeam = useCallback(() => {}, []); // legacy no-op; use platform.addTeamMember

  const dir = lang === "ar" ? "rtl" : "ltr";
  const t = useCallback((k) => (DICT[lang] && DICT[lang][k]) || DICT.en[k] || k, [lang]);

  const nav = useCallback((screen, params = {}) => {
    histRef.current.push(screen);
    setRoute({ screen, params });
    if (typeof window !== "undefined") window.scrollTo(0, 0);
    const main = document.querySelector("[data-scroll-main]");
    if (main) main.scrollTop = 0;
  }, []);

  const back = useCallback(() => {
    const h = histRef.current;
    if (h.length > 1) { h.pop(); const prev = h[h.length - 1]; setRoute({ screen: prev, params: {} }); }
  }, []);

  const showToast = useCallback((msg, kind = "success") => {
    setToast({ msg, kind, id: Date.now() });
    setTimeout(() => setToast(null), 2600);
  }, []);

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [dir, lang]);

  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);
  useEffect(() => {
    setSetupState(setupView(currentCommerceSetup, currentBU, workspace));
    setSetupDoneState(!!currentCommerceSetup);
  }, [
    currentCommerceSetup && currentCommerceSetup.id,
    currentCommerceSetup && currentCommerceSetup.businessDisplayName,
    currentCommerceSetup && currentCommerceSetup.displayName,
    currentCommerceSetup && currentCommerceSetup.presetId,
    currentCommerceSetup && currentCommerceSetup.businessType,
    currentCommerceSetup && currentCommerceSetup.address,
    currentBU && currentBU.id,
    currentBU && currentBU.name,
    currentBU && (currentBU.presetId || currentBU.preset),
    workspace && workspace.id,
  ]);

  useEffect(() => {
    window.__nav = nav; window.__setLang = setLang;
    window.__db = () => db; window.__resetSession = () => startFreshSession("empty");
    window.__enterDemo = () => enterDemo();
    window.resetMockData = () => startFreshSession("empty");
    window.nexoraxsResetMockDb = (mode = "empty") => startFreshSession(mode);
    window.seedDemoData = enterDemo;
    window.getCurrentWorkspace = () => DB.Q.currentWorkspace(DB.loadDB());
    window.getCurrentBusinessUnit = () => DB.Q.currentBusinessUnit(DB.loadDB());
    window.getCurrentCommerceSetup = () => DB.Q.currentCommerceSetup(DB.loadDB());
    window.getCurrentProducts = () => DB.Q.currentProducts(DB.loadDB());
    window.getCurrentOrders = () => DB.Q.currentOrders(DB.loadDB());
    window.getCurrentInvoices = () => DB.Q.currentInvoices(DB.loadDB());
    window.getCurrentCustomers = () => DB.Q.currentCustomers(DB.loadDB());
    window.getCurrentUser = () => DB.Q.currentUser(DB.loadDB());
    window.seedEmptyCommerceData = () => setDb((d) => DB.seedEmptyCommerceData(d));
    window.seedDemoCommerceData = () => setDb((d) => DB.seedDemoCommerceData(d));
  }, [nav, setLang, db, startFreshSession, enterDemo, setDb]);

  const value = {
    route, nav, back, lang, setLang, dir, t,
    theme, setTheme, toggleTheme,
    setup, setSetup, setupDone, setSetupDone,
    entry, setEntry,
    products, setProducts, orders, setOrders, invoices, setInvoices, customers, setCustomers, team, setTeam,
    branch, setBranch, BUSINESS_UNITS, BRANCHES, COMMERCE_PLAN,
    workspace, subscriptions, platform, db, currentUser, currentUserDisplayName, currentBU, currentBranch, currentCommerceSetup,
    prettyPreset,
    isDemo: !!db.demo, enterDemo, startFreshSession,
    toast, showToast,
    money: (n) => money(n, lang), taxBreak,
    OPERATING_SYSTEMS,
  };
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

Object.assign(window, { AppProvider, useApp, OPERATING_SYSTEMS, money, taxBreak, DICT });
