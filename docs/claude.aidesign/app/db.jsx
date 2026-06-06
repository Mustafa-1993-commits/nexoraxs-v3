// ============================================================
// NexoraXS — Mock Platform Store (relational localStorage/sessionStorage DB)
//   Single source of truth. Components do not touch browser storage directly.
//   Backend-ready: swap these functions for API calls later.
// ============================================================
const MOCK_DB_VERSION = 2;
const STORAGE_KEYS = {
  currentUserId: "nexoraxs.session.currentUserId",
  users: "nexoraxs.db.users",
  workspaces: "nexoraxs.db.workspaces",
  branches: "nexoraxs.db.branches",
  osSubscriptions: "nexoraxs.db.osSubscriptions",
  businessUnits: "nexoraxs.db.businessUnits",
  commerceSetups: "nexoraxs.db.commerceSetups",
  teamMembers: "nexoraxs.db.teamMembers",
  products: "nexoraxs.db.commerceProducts",
  orders: "nexoraxs.db.commerceOrders",
  customers: "nexoraxs.db.commerceCustomers",
  invoices: "nexoraxs.db.commerceInvoices",
  currentWorkspaceId: "nexoraxs.session.currentWorkspaceId",
  currentOSSubscriptionId: "nexoraxs.session.currentOSSubscriptionId",
  currentBusinessUnitId: "nexoraxs.session.currentBusinessUnitId",
  currentBranchId: "nexoraxs.session.currentBranchId",
  currentOSId: "nexoraxs.session.currentOSId",
  onboardingState: "nexoraxs.session.onboardingState",
  entryContext: "nexoraxs.session.entryContext",
  locale: "nexoraxs.session.locale",
  demo: "nexoraxs.session.demo",
  theme: "nexoraxs.ui.theme",
};
const LEGACY_DB_KEY = "nexoraxs_mock_db";

/* ---------- id + time helpers ---------- */
let __idseq = 0;
function uid(prefix) {
  __idseq += 1;
  return `${prefix}_${Date.now().toString(36)}${__idseq.toString(36)}`;
}
const nowISO = () => new Date().toISOString();
function normalizeEmail(email) { return (email || "").trim().toLowerCase(); }
function getUserDisplayName(user) {
  if (!user) return "";
  const fullName = (user.fullName || user.name || "").trim();
  if (fullName) return fullName;
  return normalizeEmail(user.email).split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ---------- Operating systems (catalog) ---------- */
const OS_CATALOG = [
  { id: "commerce", name: "Commerce OS", availability: "available" },
  { id: "healthcare", name: "Healthcare OS", availability: "coming_soon" },
  { id: "hr", name: "HR OS", availability: "coming_soon" },
  { id: "crm", name: "CRM OS", availability: "coming_soon" },
  { id: "gym", name: "Gym OS", availability: "coming_soon" },
  { id: "maintenance", name: "Maintenance OS", availability: "coming_soon" },
];

/* ---------- Plans (per OS, generic) ---------- */
const PLAN_CATALOG = [
  { id: "commerce_starter", osId: "commerce", tier: "Starter", price: 0, currency: "EGP",
    limits: { businessUnits: 1, branches: 1, users: 3 } },
  { id: "commerce_pro", osId: "commerce", tier: "Pro", price: 1400, currency: "EGP",
    limits: { businessUnits: 3, branches: 5, users: 10 } },
  { id: "commerce_business", osId: "commerce", tier: "Business", price: null, currency: "EGP",
    limits: { businessUnits: 99, branches: 99, users: 99 } },
];
// Map short plan keys used by onboarding (starter/pro/business) → plan ids per OS
function planIdFor(osId, key) {
  if (!key) return `${osId}_pro`;
  return `${osId}_${key}`;
}

/* ============================================================
   EMPTY DB — blank shape before first-load seeding
   ============================================================ */
function emptyDB(locale, theme) {
  return {
    version: MOCK_DB_VERSION,
    demo: false,
    locale: locale || "en",
    theme: theme || "light",
    entryContext: { source: "general_landing", selectedOS: null, selectedPlan: null },
    currentUserId: null,
    currentWorkspaceId: null,
    currentOSId: null,
    currentOSSubscriptionId: null,
    currentBusinessUnitId: null,
    currentBranchId: null,
    operatingSystems: OS_CATALOG,
    plans: PLAN_CATALOG,
    workspaces: [], subscriptions: [], businessUnits: [], branches: [], users: [], teamMembers: [], commerceSetups: [],
    commerceProducts: [], commerceOrders: [], commerceCustomers: [], commerceInvoices: [],
    onboardingState: { phase: null, step: 0, completedOS: [] },
  };
}

/* ============================================================
   DEMO SEED — explicit demo mode only. First load stays empty.
   ============================================================ */
function seedDB(locale, theme) {
  const userId = "user_001";
  const wsId = "ws_001";
  const subId = "sub_001";
  const buId = "bu_001";
  const branchId = "br_001";
  const created = "2025-08-12T09:00:00.000Z";

  const workspaces = [{
    id: wsId, name: "Mustafa Group", country: "Egypt", currency: "EGP",
    timezone: "Africa/Cairo", language: locale || "en", ownerUserId: userId, createdAt: created,
  }];

  const subscriptions = [{
    id: subId, workspaceId: wsId, os: "commerce", osId: "commerce", plan: "starter", planId: "commerce_starter",
    status: "trialing", startedAt: created, trialEndsAt: "2026-06-18", renewsAt: "2026-06-18",
  }];

  const businessUnits = [
    { id: buId, workspaceId: wsId, osSubscriptionId: subId, os: "commerce", osId: "commerce", selectedOS: "commerce", branchIds: [branchId], branchId, name: "Mustafa Pharmacy", preset: "pharmacy", presetId: "pharmacy", createdAt: created },
  ];

  const branches = [
    { id: branchId, workspaceId: wsId, businessUnitId: buId, name: "Smouha Branch", city: "Alexandria", country: "Egypt", isMain: true, createdAt: created },
  ];

  const users = [
    { id: userId, fullName: "Mustafa Hassan", name: "Mustafa Hassan", email: "mustafa@mustafagroup.co", passwordHashOrPlainForMockOnly: "demo-password", role: "owner", createdAt: created, updatedAt: created },
  ];

  const teamMembers = [
    { id: "tm_001", workspaceId: wsId, userId, workspaceRole: "Owner", osId: null, osRole: "Owner", businessUnitId: null, branchId: null, status: "active", lastActive: "Active now" },
  ];
  const commerceSetups = [{
    id: "cs_001", workspaceId: wsId, businessUnitId: buId, osSubscriptionId: subId,
    presetId: "pharmacy", businessType: "pharmacy", businessDisplayName: "Mustafa Pharmacy", legalBusinessName: "Mustafa Pharmacy LLC",
    displayName: "Mustafa Pharmacy", legalName: "Mustafa Pharmacy LLC",
    phone: "01001619008", email: "store@mustafagroup.co",
    address: "", city: "Alexandria", country: "Egypt",
    crn: "", trn: "", logo: null, mode: "physical", taxRegistered: true, vatRegistered: true, vatRate: 14,
    pricesIncludeTax: true, taxLabel: "VAT", taxRegistrationNumber: "123456789", taxNumber: "123456789",
    invoicePrefix: "INV", receiptPrefix: "RCPT", invoiceStart: 1001, receiptStart: 1001,
    startingInvoiceNumber: 1001, startingReceiptNumber: 1001,
    footer: "Thank you for shopping with us", returnPolicy: "Returns accepted within 14 days with receipt.",
    receiptSize: "80mm", receiptStyle: "classic", invoiceTemplate: "a4-simple",
    createdAt: created, updatedAt: created,
  }];

  const commerceProducts = [
    {
      id: "p1", workspaceId: wsId, businessUnitId: buId, branchId, osSubscriptionId: subId,
      name: "Panadol Extra 24 tabs", category: "Medicine", sku: "MED-0001", barcode: "6221234500017",
      price: 50, cost: 32, taxable: true, stock: 100, unit: "Box", low: 20, lowStockThreshold: 20,
      expiry: "2027-04", brand: "GSK", createdAt: created, updatedAt: created,
    },
    {
      id: "p2", workspaceId: wsId, businessUnitId: buId, branchId, osSubscriptionId: subId,
      name: "Centrum Multivitamin 30", category: "Supplements", sku: "SUP-0011", barcode: "6221234500031",
      price: 320, cost: 240, taxable: true, stock: 42, unit: "Bottle", low: 10, lowStockThreshold: 10,
      expiry: "2027-08", brand: "Pfizer", createdAt: created, updatedAt: created,
    },
  ];

  return {
    version: MOCK_DB_VERSION,
    demo: true,
    locale: locale || "en",
    theme: theme || "light",
    entryContext: { source: "general_landing", selectedOS: null, selectedPlan: null },
    currentUserId: userId,
    currentWorkspaceId: wsId,
    currentOSId: "commerce",
    currentOSSubscriptionId: subId,
    currentBusinessUnitId: buId,
    currentBranchId: branchId,
    operatingSystems: OS_CATALOG,
    plans: PLAN_CATALOG,
    workspaces, subscriptions, businessUnits, branches, users, teamMembers, commerceSetups,
    commerceProducts, commerceOrders: [], commerceCustomers: [], commerceInvoices: [],
    onboardingState: { phase: null, step: 0, completedOS: ["commerce"] },
  };
}

/* ============================================================
   PERSISTENCE
   ============================================================ */
function isDbKey(key) { return key && key.startsWith("nexoraxs.db."); }
function isSessionKey(key) { return key && key.startsWith("nexoraxs.session."); }
function readStorage(key) {
  const store = isDbKey(key) || key === STORAGE_KEYS.theme ? localStorage : sessionStorage;
  return store.getItem(key);
}
function writeStorage(key, value) {
  const store = isDbKey(key) || key === STORAGE_KEYS.theme ? localStorage : sessionStorage;
  store.setItem(key, value);
}
function removeStorage(key) {
  try { localStorage.removeItem(key); } catch (e) {}
  try { sessionStorage.removeItem(key); } catch (e) {}
}
function readJsonFrom(key, fallback) {
  try {
    const raw = readStorage(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}
function loadDB() {
  let locale = "en", theme = "light";
  try { locale = readStorage(STORAGE_KEYS.locale) || sessionStorage.getItem("core_locale") || "en"; } catch (e) {}
  try { theme = readStorage(STORAGE_KEYS.theme) || localStorage.getItem("nx_theme") || "light"; } catch (e) {}
  const hasNamespaced = (() => {
    try { return readStorage(STORAGE_KEYS.users) || readStorage(STORAGE_KEYS.workspaces); } catch (e) { return false; }
  })();
  if (hasNamespaced) {
    const db = {
      ...emptyDB(locale, theme),
      demo: readStorage(STORAGE_KEYS.demo) === "1",
      entryContext: readJsonFrom(STORAGE_KEYS.entryContext, { source: "general_landing", selectedOS: null, selectedPlan: null }),
      currentUserId: readStorage(STORAGE_KEYS.currentUserId),
      currentWorkspaceId: readStorage(STORAGE_KEYS.currentWorkspaceId),
      currentOSId: readStorage(STORAGE_KEYS.currentOSId),
      currentOSSubscriptionId: readStorage(STORAGE_KEYS.currentOSSubscriptionId),
      currentBusinessUnitId: readStorage(STORAGE_KEYS.currentBusinessUnitId),
      currentBranchId: readStorage(STORAGE_KEYS.currentBranchId),
      onboardingState: readJsonFrom(STORAGE_KEYS.onboardingState, { phase: null, step: 0, completedOS: [] }),
      users: readJsonFrom(STORAGE_KEYS.users, []),
      workspaces: readJsonFrom(STORAGE_KEYS.workspaces, []),
      branches: readJsonFrom(STORAGE_KEYS.branches, []),
      subscriptions: readJsonFrom(STORAGE_KEYS.osSubscriptions, []),
      businessUnits: readJsonFrom(STORAGE_KEYS.businessUnits, []),
      commerceSetups: readJsonFrom(STORAGE_KEYS.commerceSetups, []),
      teamMembers: readJsonFrom(STORAGE_KEYS.teamMembers, []),
      commerceProducts: readJsonFrom(STORAGE_KEYS.products, []),
      commerceOrders: readJsonFrom(STORAGE_KEYS.orders, []),
      commerceCustomers: readJsonFrom(STORAGE_KEYS.customers, []),
      commerceInvoices: readJsonFrom(STORAGE_KEYS.invoices, []),
    };
    const normalized = normalizeDB(db);
    if (db.currentUserId && !normalized.currentUserId) persistDB(normalized);
    return normalized;
  }
  try {
    const raw = sessionStorage.getItem(LEGACY_DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed) { const migrated = normalizeDB(parsed); persistDB(migrated); return migrated; }
    }
  } catch (e) {}
  // first run after storage is empty: persist an empty DB and start onboarding.
  const fresh = emptyDB(locale, theme);
  persistDB(fresh);
  return fresh;
}
function persistDB(db) {
  const d = normalizeDB(db);
  const writeJson = (key, value) => { try { writeStorage(key, JSON.stringify(value)); } catch (e) {} };
  try {
    writeStorage(STORAGE_KEYS.currentUserId, d.currentUserId || "");
    writeStorage(STORAGE_KEYS.currentWorkspaceId, d.currentWorkspaceId || "");
    writeStorage(STORAGE_KEYS.currentOSId, d.currentOSId || "");
    writeStorage(STORAGE_KEYS.currentOSSubscriptionId, d.currentOSSubscriptionId || "");
    writeStorage(STORAGE_KEYS.currentBusinessUnitId, d.currentBusinessUnitId || "");
    writeStorage(STORAGE_KEYS.currentBranchId, d.currentBranchId || "");
    writeStorage(STORAGE_KEYS.locale, d.locale || "en");
    writeStorage(STORAGE_KEYS.demo, d.demo ? "1" : "0");
    sessionStorage.setItem("core_locale", d.locale || "en");
    sessionStorage.removeItem(LEGACY_DB_KEY);
  } catch (e) {}
  writeJson(STORAGE_KEYS.users, d.users || []);
  writeJson(STORAGE_KEYS.workspaces, d.workspaces || []);
  writeJson(STORAGE_KEYS.branches, d.branches || []);
  writeJson(STORAGE_KEYS.osSubscriptions, d.subscriptions || []);
  writeJson(STORAGE_KEYS.businessUnits, d.businessUnits || []);
  writeJson(STORAGE_KEYS.commerceSetups, d.commerceSetups || []);
  writeJson(STORAGE_KEYS.teamMembers, d.teamMembers || []);
  writeJson(STORAGE_KEYS.products, d.commerceProducts || []);
  writeJson(STORAGE_KEYS.orders, d.commerceOrders || []);
  writeJson(STORAGE_KEYS.customers, d.commerceCustomers || []);
  writeJson(STORAGE_KEYS.invoices, d.commerceInvoices || []);
  writeJson(STORAGE_KEYS.onboardingState, d.onboardingState || {});
  writeJson(STORAGE_KEYS.entryContext, d.entryContext || {});
  try { localStorage.setItem(STORAGE_KEYS.theme, d.theme || "light"); localStorage.setItem("nx_theme", d.theme || "light"); } catch (e) {}
}
function resetDB(mode) {
  Object.keys(STORAGE_KEYS).forEach((k) => {
    const key = STORAGE_KEYS[k];
    removeStorage(key);
  });
  try { sessionStorage.removeItem(LEGACY_DB_KEY); sessionStorage.removeItem("core_locale"); } catch (e) {}
  return mode === "demo" ? startDemo() : startFresh();
}
// explicit mode switches
function startDemo(locale, theme) { const d = seedDB(locale, theme); persistDB(d); return d; }
function startFresh(locale, theme) { const d = emptyDB(locale, theme); persistDB(d); return d; }

/* ============================================================
   QUERIES (relational reads)
   ============================================================ */
const Q = {
  workspace: (db, id) => db.workspaces.find((w) => w.id === (id || db.currentWorkspaceId)) || db.workspaces[0],
  currentWorkspace: (db) => Q.workspace(db, db.currentWorkspaceId),
  subscriptions: (db, wsId) => db.subscriptions.filter((s) => s.workspaceId === (wsId || db.currentWorkspaceId)),
  subscriptionForOS: (db, osId, wsId) => db.subscriptions.find((s) => s.workspaceId === (wsId || db.currentWorkspaceId) && (s.osId || s.os) === osId),
  currentOSSubscription: (db) => db.subscriptions.find((s) => s.id === db.currentOSSubscriptionId) || null,
  businessUnits: (db, wsId) => db.businessUnits.filter((b) => b.workspaceId === (wsId || db.currentWorkspaceId)),
  businessUnitsForOS: (db, osId, wsId) => Q.businessUnits(db, wsId).filter((b) => (b.osId || b.os) === osId),
  branches: (db, wsId) => db.branches.filter((b) => b.workspaceId === (wsId || db.currentWorkspaceId)),
  branchesForBU: (db, buId) => db.branches.filter((b) => b.businessUnitId === buId),
  plan: (db, planId) => db.plans.find((p) => p.id === planId),
  planForOS: (db, osId, wsId) => { const s = Q.subscriptionForOS(db, osId, wsId); return s ? Q.plan(db, s.planId) : null; },
  teamMembers: (db, wsId) => db.teamMembers.filter((m) => m.workspaceId === (wsId || db.currentWorkspaceId)),
  user: (db, id) => db.users.find((u) => u.id === id),
  findUserByEmail: (db, email) => db.users.find((u) => normalizeEmail(u.email) === normalizeEmail(email)) || null,
  currentUser: (db) => db.users.find((u) => u.id === db.currentUserId) || null,
  isSubscribed: (db, osId, wsId) => !!Q.subscriptionForOS(db, osId, wsId),
  currentBusinessUnit: (db) => db.businessUnits.find((b) => b.id === db.currentBusinessUnitId) || null,
  currentBranch: (db) => db.branches.find((b) => b.id === db.currentBranchId) || null,
  commerceSetupForBU: (db, buId) => db.commerceSetups.find((s) => s.businessUnitId === (buId || db.currentBusinessUnitId)) || null,
  currentCommerceSetup: (db) => Q.commerceSetupForBU(db, db.currentBusinessUnitId),
  commerceProducts: (db, buId, branchId) => {
    const workspaceId = db.currentWorkspaceId;
    const businessUnitId = buId || db.currentBusinessUnitId;
    const activeBranchId = branchId || db.currentBranchId;
    return (db.commerceProducts || []).filter((p) =>
      (!workspaceId || p.workspaceId === workspaceId)
      && (!businessUnitId || p.businessUnitId === businessUnitId)
      && (!activeBranchId || p.branchId === activeBranchId)
    );
  },
  currentProducts: (db) => Q.commerceProducts(db, db.currentBusinessUnitId, db.currentBranchId),
  commerceOrders: (db, buId, branchId) => {
    const workspaceId = db.currentWorkspaceId;
    const businessUnitId = buId || db.currentBusinessUnitId;
    const activeBranchId = branchId || db.currentBranchId;
    return (db.commerceOrders || []).filter((o) =>
      (!workspaceId || o.workspaceId === workspaceId)
      && (!businessUnitId || o.businessUnitId === businessUnitId)
      && (!activeBranchId || o.branchId === activeBranchId)
    );
  },
  currentOrders: (db) => Q.commerceOrders(db, db.currentBusinessUnitId, db.currentBranchId),
  commerceCustomers: (db, buId) => {
    const workspaceId = db.currentWorkspaceId;
    const businessUnitId = buId || db.currentBusinessUnitId;
    return (db.commerceCustomers || []).filter((c) =>
      (!workspaceId || c.workspaceId === workspaceId)
      && (!businessUnitId || c.businessUnitId === businessUnitId)
    );
  },
  currentCustomers: (db) => Q.commerceCustomers(db, db.currentBusinessUnitId),
  commerceInvoices: (db, buId, branchId) => {
    const workspaceId = db.currentWorkspaceId;
    const businessUnitId = buId || db.currentBusinessUnitId;
    const activeBranchId = branchId || db.currentBranchId;
    return (db.commerceInvoices || []).filter((i) =>
      (!workspaceId || i.workspaceId === workspaceId)
      && (!businessUnitId || i.businessUnitId === businessUnitId)
      && (!activeBranchId || i.branchId === activeBranchId)
    );
  },
  currentInvoices: (db) => Q.commerceInvoices(db, db.currentBusinessUnitId, db.currentBranchId),
};

function normalizePreset(id) {
  const map = { fashion: "clothing_fashion", electronics: "electronics_mobile", restaurant: "restaurant_cafe", retail_store: "retail", medical: "medical_supplies" };
  return map[id] || id || "retail";
}
function isFilePathValue(value) {
  return /^file:|^[A-Z]:\\|\/home\/|\/Users\/|\\Users\\/i.test(String(value || ""));
}
function validProduct(p) {
  return !!p && typeof p.name === "string" && p.name.trim().length >= 3
    && !isFilePathValue(p.name)
    && Number.isFinite(+p.price) && +p.price > 0
    && Number.isFinite(+p.stock) && +p.stock >= 0;
}
function contextIds(db, row) {
  const bu = row && row.businessUnitId ? db.businessUnits.find((b) => b.id === row.businessUnitId) : Q.currentBusinessUnit(db);
  const branch = row && row.branchId ? db.branches.find((b) => b.id === row.branchId) : Q.currentBranch(db);
  const sub = row && row.osSubscriptionId ? db.subscriptions.find((s) => s.id === row.osSubscriptionId) : Q.currentOSSubscription(db);
  return {
    workspaceId: (row && row.workspaceId) || (bu && bu.workspaceId) || db.currentWorkspaceId || null,
    businessUnitId: (row && row.businessUnitId) || (bu && bu.id) || db.currentBusinessUnitId || null,
    branchId: (row && row.branchId) || (bu && bu.branchId) || (branch && branch.id) || db.currentBranchId || null,
    osSubscriptionId: (row && row.osSubscriptionId) || (sub && sub.id) || (bu && bu.osSubscriptionId) || db.currentOSSubscriptionId || null,
  };
}
function stampRow(row, createdAt) {
  const created = row.createdAt || createdAt || nowISO();
  return { ...row, createdAt: created, updatedAt: row.updatedAt || created };
}
function normalizeProductRow(db, p) {
  const ids = contextIds(db, p);
  const low = +(p.lowStockThreshold !== undefined ? p.lowStockThreshold : p.low) || 0;
  return stampRow({
    ...p,
    id: p.id || uid("prod"),
    ...ids,
    name: String(p.name || "").trim(),
    category: p.category || "General",
    sku: p.sku || "",
    barcode: p.barcode || "",
    price: +p.price,
    cost: +p.cost || 0,
    taxable: p.taxable !== false,
    stock: +p.stock || 0,
    unit: p.unit || "Piece",
    low,
    lowStockThreshold: low,
    expiry: p.expiry || "",
    brand: p.brand || "",
  });
}
function normalizeOrderRow(db, o) {
  const ids = contextIds(db, o);
  return stampRow({
    discount: 0, channel: "POS", paid: true, status: o.paid === false ? "Pending" : "Paid",
    ...o,
    id: o.id || uid("ord"),
    ...ids,
    items: Array.isArray(o.items) ? o.items : [],
  });
}
function normalizeCustomerRow(db, c) {
  const ids = contextIds(db, c);
  return stampRow({
    ...c,
    id: c.id || uid("cust"),
    workspaceId: ids.workspaceId,
    businessUnitId: ids.businessUnitId,
    name: String(c.name || "").trim(),
    phone: c.phone || "",
    email: normalizeEmail(c.email || ""),
  });
}
function invoiceFromOrder(o) {
  return {
    id: o.invoice || `inv_${o.id}`,
    workspaceId: o.workspaceId,
    businessUnitId: o.businessUnitId,
    branchId: o.branchId,
    osSubscriptionId: o.osSubscriptionId,
    orderId: o.id,
    customerId: o.customerId || null,
    invoice: o.invoice,
    customer: o.customer,
    date: o.date,
    payment: o.payment,
    items: o.items || [],
    discount: o.discount || 0,
    status: o.paid === false ? "Pending" : "Paid",
    createdAt: o.createdAt || nowISO(),
    updatedAt: o.updatedAt || o.createdAt || nowISO(),
  };
}
function normalizeInvoiceRow(db, i) {
  const ids = contextIds(db, i);
  return stampRow({
    discount: 0, status: "Paid",
    ...i,
    id: i.id || i.invoice || uid("inv"),
    ...ids,
    items: Array.isArray(i.items) ? i.items : [],
    orderId: i.orderId || null,
    customerId: i.customerId || null,
  });
}
function normalizeDB(db) {
  const d = { ...emptyDB(db.locale || "en", db.theme || "light"), ...db };
  d.version = MOCK_DB_VERSION;
  d.users = (d.users || []).map((u) => {
    const email = normalizeEmail(u.email);
    const fullName = (u.fullName || u.name || "").trim();
    return {
      ...u,
      id: u.id || uid("user"),
      fullName,
      name: fullName || getUserDisplayName({ ...u, email }),
      email,
      role: u.role || "owner",
      createdAt: u.createdAt || nowISO(),
      updatedAt: u.updatedAt || u.createdAt || nowISO(),
    };
  });
  if (d.currentUserId && !d.users.some((u) => u.id === d.currentUserId)) {
    d.currentUserId = null;
    d.currentWorkspaceId = null;
    d.currentOSId = null;
    d.currentOSSubscriptionId = null;
    d.currentBusinessUnitId = null;
    d.currentBranchId = null;
  }
  d.subscriptions = (d.subscriptions || []).map((s) => ({ ...s, os: s.os || s.osId, osId: s.osId || s.os, plan: s.plan || (s.planId || "").replace((s.osId || s.os || "") + "_", ""), planId: s.planId || planIdFor(s.os || s.osId, s.plan || "starter") }));
  d.businessUnits = (d.businessUnits || []).map((b) => {
    const linkedSetup = (d.commerceSetups || []).find((s) => s.businessUnitId === b.id);
    const repairedName = b.name && String(b.name).trim().length > 1 ? b.name : (linkedSetup && (linkedSetup.businessDisplayName || linkedSetup.displayName)) || "";
    const presetId = normalizePreset(b.presetId || b.preset || (linkedSetup && (linkedSetup.presetId || linkedSetup.businessType || linkedSetup.preset)));
    const branchIds = b.branchIds || (b.branchId ? [b.branchId] : (d.branches || []).filter((br) => br.businessUnitId === b.id).map((br) => br.id));
    return { ...b, name: repairedName, os: b.os || b.osId || b.selectedOS, osId: b.osId || b.os || b.selectedOS, selectedOS: b.selectedOS || b.os || b.osId, preset: presetId, presetId, branchId: b.branchId || branchIds[0] || null, branchIds };
  });
  d.branches = (d.branches || []).map((b, i) => ({ isMain: i === 0, ...b, country: b.country === "EG" ? "Egypt" : b.country }));
  d.workspaces = (d.workspaces || []).map((w) => ({ ...w, country: w.country === "EG" ? "Egypt" : w.country }));
  d.commerceSetups = (d.commerceSetups || []).map((s) => {
    const bu = (d.businessUnits || []).find((b) => b.id === s.businessUnitId);
    const presetId = normalizePreset(s.presetId || s.businessType || s.preset || (bu && (bu.presetId || bu.preset)));
    const displayName = s.businessDisplayName || s.displayName || "";
    const legalName = s.legalBusinessName || s.legalName || "";
    const taxNumber = s.taxRegistrationNumber || s.taxNumber || "";
    return {
      ...s,
      presetId,
      businessType: presetId,
      preset: presetId,
      businessDisplayName: displayName,
      legalBusinessName: legalName,
      displayName,
      legalName,
      taxRegistered: s.taxRegistered !== undefined ? s.taxRegistered : s.vatRegistered,
      vatRegistered: s.vatRegistered !== undefined ? s.vatRegistered : s.taxRegistered,
      taxRegistrationNumber: taxNumber,
      taxNumber,
      startingInvoiceNumber: s.startingInvoiceNumber || s.invoiceStart,
      startingReceiptNumber: s.startingReceiptNumber || s.receiptStart,
      invoiceStart: s.invoiceStart || s.startingInvoiceNumber,
      receiptStart: s.receiptStart || s.startingReceiptNumber,
      country: s.country === "EG" ? "Egypt" : s.country,
    };
  });
  d.commerceProducts = (d.commerceProducts || []).filter(validProduct).map((p) => normalizeProductRow(d, p));
  d.commerceOrders = (d.commerceOrders || [])
    .filter((o) => o && Array.isArray(o.items) && o.items.length > 0)
    .map((o) => normalizeOrderRow(d, o));
  d.commerceCustomers = (d.commerceCustomers || [])
    .filter((c) => c && String(c.name || "").trim())
    .map((c) => normalizeCustomerRow(d, c));
  d.commerceInvoices = (d.commerceInvoices || [])
    .filter((i) => i && (i.invoice || i.orderId) && Array.isArray(i.items))
    .map((i) => normalizeInvoiceRow(d, i));
  return d;
}

/* ============================================================
   MUTATIONS — each returns a NEW db object (immutable)
   ============================================================ */
function M_upsertWorkspace(db, patch) {
  const wsId = patch.id || db.currentWorkspaceId;
  const exists = db.workspaces.some((w) => w.id === wsId);
  let workspaces;
  if (exists) {
    workspaces = db.workspaces.map((w) => w.id === wsId ? { ...w, ...patch } : w);
  } else {
    const ws = { id: wsId || uid("ws"), name: "", country: "Egypt", currency: "EGP", timezone: "Africa/Cairo", ownerUserId: db.currentUserId, createdAt: nowISO(), ...patch };
    workspaces = [...db.workspaces, ws];
    return { ...db, workspaces, currentWorkspaceId: ws.id };
  }
  return { ...db, workspaces };
}
function M_createBranch(db, data) {
  const branch = { id: uid("br"), workspaceId: db.currentWorkspaceId, businessUnitId: data.businessUnitId || null, name: data.name, city: data.city || "", country: data.country || "Egypt", isMain: !!data.isMain, createdAt: nowISO() };
  return { ...db, branches: [...db.branches, branch], currentBranchId: branch.id };
}
function M_createBusinessUnit(db, data) {
  const osId = data.osId || data.os;
  const sub = data.osSubscriptionId ? db.subscriptions.find((s) => s.id === data.osSubscriptionId) : Q.subscriptionForOS(db, osId);
  const preset = normalizePreset(data.presetId || data.preset);
  const branchIds = data.branchIds || (db.currentBranchId ? [db.currentBranchId] : []);
  const bu = { id: data.id || uid("bu"), workspaceId: db.currentWorkspaceId, osSubscriptionId: sub ? sub.id : null, os: osId, osId, branchIds, branchId: branchIds[0] || null, name: data.name, preset, presetId: preset, createdAt: nowISO() };
  // attach the most recent branch (with no BU) to this BU
  let branches = db.branches;
  branches = db.branches.map((b) => branchIds.includes(b.id) || (!b.businessUnitId && b.workspaceId === db.currentWorkspaceId) ? { ...b, businessUnitId: bu.id } : b);
  let commerceSetups = db.commerceSetups || [];
  if (osId === "commerce") {
    const branch = branches.find((b) => branchIds.includes(b.id)) || branches.find((b) => b.businessUnitId === bu.id);
    commerceSetups = upsertCommerceSetup(commerceSetups, {
      id: uid("cs"), workspaceId: db.currentWorkspaceId, businessUnitId: bu.id, osSubscriptionId: bu.osSubscriptionId,
      branchId: bu.branchId, presetId: preset, businessType: preset, businessDisplayName: data.name, displayName: data.name,
      legalBusinessName: data.legalBusinessName || `${data.name} LLC`, legalName: data.legalBusinessName || `${data.name} LLC`,
      address: data.address || "",
      city: branch ? branch.city : "", country: branch ? branch.country : "Egypt",
    });
  }
  return { ...db, businessUnits: [...db.businessUnits, bu], branches, commerceSetups, currentBusinessUnitId: bu.id, currentOSId: osId };
}
function M_updateBusinessUnit(db, buId, patch) {
  const presetPatch = patch.presetId || patch.preset;
  const normalizedPatch = presetPatch ? { ...patch, preset: normalizePreset(presetPatch), presetId: normalizePreset(presetPatch) } : patch;
  const nextUnits = db.businessUnits.map((b) => b.id === buId ? { ...b, ...normalizedPatch } : b);
  const nextBU = nextUnits.find((b) => b.id === buId);
  let commerceSetups = db.commerceSetups || [];
  if (nextBU && (nextBU.osId || nextBU.os) === "commerce") {
    const setup = Q.commerceSetupForBU({ ...db, businessUnits: nextUnits }, buId);
    commerceSetups = upsertCommerceSetup(commerceSetups, {
      ...(setup || {}),
      workspaceId: nextBU.workspaceId,
      businessUnitId: buId,
      osSubscriptionId: nextBU.osSubscriptionId,
      presetId: nextBU.presetId || nextBU.preset,
      businessType: nextBU.presetId || nextBU.preset,
      businessDisplayName: normalizedPatch.name || (setup && (setup.businessDisplayName || setup.displayName)) || nextBU.name,
      displayName: normalizedPatch.name || (setup && (setup.businessDisplayName || setup.displayName)) || nextBU.name,
      updatedAt: nowISO(),
    });
  }
  return { ...db, businessUnits: nextUnits, commerceSetups };
}
function M_createSubscription(db, data) {
  const osId = data.osId || data.os;
  const existing = Q.subscriptionForOS(db, osId);
  const plan = data.plan || (data.planId || "").replace(`${osId}_`, "") || "starter";
  const planId = data.planId || planIdFor(osId, plan);
  if (existing) {
    return { ...db, subscriptions: db.subscriptions.map((s) => s.id === existing.id ? { ...s, os: osId, osId, plan, planId, status: data.status || s.status } : s), currentOSSubscriptionId: existing.id };
  }
  const sub = { id: data.id || uid("sub"), workspaceId: db.currentWorkspaceId, os: osId, osId, plan, planId, status: data.status || "trialing", startedAt: nowISO(), trialEndsAt: data.trialEndsAt || null, renewsAt: data.renewsAt || null };
  return { ...db, subscriptions: [...db.subscriptions, sub], currentOSSubscriptionId: sub.id };
}
function M_addTeamMember(db, data) {
  // find or create user
  let users = db.users;
  let user = Q.findUserByEmail(db, data.email);
  if (!user) {
    const email = normalizeEmail(data.email);
    const fullName = (data.fullName || data.name || "").trim();
    user = { id: uid("u"), fullName, name: fullName || getUserDisplayName({ email }), email, role: "member", createdAt: nowISO(), updatedAt: nowISO() };
    users = [...db.users, user];
  }
  const tm = { id: uid("tm"), workspaceId: db.currentWorkspaceId, userId: user.id, workspaceRole: data.workspaceRole || "Member", osId: data.osId || null, osRole: data.osRole || null, businessUnitId: data.businessUnitId || null, branchId: data.branchId || null, status: "invited", lastActive: "Pending" };
  return { ...db, users, teamMembers: [...db.teamMembers, tm] };
}
function M_setCurrent(db, patch) { return { ...db, ...patch }; }
function restoreUserSelection(db, userId) {
  const user = Q.user(db, userId);
  if (!user) return { ...db, currentUserId: null, currentWorkspaceId: null, currentOSId: null, currentOSSubscriptionId: null, currentBusinessUnitId: null, currentBranchId: null };
  const workspace = db.currentWorkspaceId && db.workspaces.some((w) => w.id === db.currentWorkspaceId && w.ownerUserId === userId)
    ? Q.workspace(db, db.currentWorkspaceId)
    : db.workspaces.find((w) => w.ownerUserId === userId) || db.workspaces[0] || null;
  if (!workspace) return { ...db, currentUserId: userId, currentWorkspaceId: null, currentOSId: null, currentOSSubscriptionId: null, currentBusinessUnitId: null, currentBranchId: null };
  const sub = db.currentOSSubscriptionId && db.subscriptions.some((s) => s.id === db.currentOSSubscriptionId && s.workspaceId === workspace.id)
    ? db.subscriptions.find((s) => s.id === db.currentOSSubscriptionId)
    : db.subscriptions.find((s) => s.workspaceId === workspace.id && (s.osId || s.os) === "commerce") || db.subscriptions.find((s) => s.workspaceId === workspace.id) || null;
  const osId = (sub && (sub.osId || sub.os)) || db.currentOSId || null;
  const bu = db.currentBusinessUnitId && db.businessUnits.some((b) => b.id === db.currentBusinessUnitId && b.workspaceId === workspace.id)
    ? db.businessUnits.find((b) => b.id === db.currentBusinessUnitId)
    : db.businessUnits.find((b) => b.workspaceId === workspace.id && (!osId || (b.osId || b.os) === osId)) || db.businessUnits.find((b) => b.workspaceId === workspace.id) || null;
  const branch = db.currentBranchId && db.branches.some((b) => b.id === db.currentBranchId && b.workspaceId === workspace.id)
    ? db.branches.find((b) => b.id === db.currentBranchId)
    : (bu ? db.branches.find((b) => b.businessUnitId === bu.id) : null) || db.branches.find((b) => b.workspaceId === workspace.id && b.isMain) || db.branches.find((b) => b.workspaceId === workspace.id) || null;
  return {
    ...db,
    currentUserId: userId,
    currentWorkspaceId: workspace.id,
    currentOSId: osId,
    currentOSSubscriptionId: sub ? sub.id : null,
    currentBusinessUnitId: bu ? bu.id : null,
    currentBranchId: branch ? branch.id : null,
  };
}
function M_createUser(db, data) {
  const email = normalizeEmail(data.email);
  const fullName = (data.fullName || data.name || "").trim();
  const existing = Q.findUserByEmail(db, email);
  if (existing) return { ...db, authError: "Account already exists — sign in" };
  const createdAt = nowISO();
  const user = {
    id: uid("user"),
    fullName,
    name: fullName || getUserDisplayName({ email }),
    email,
    passwordHashOrPlainForMockOnly: data.password || "",
    role: "owner",
    createdAt,
    updatedAt: createdAt,
  };
  return restoreUserSelection({ ...db, users: [...db.users, user], authError: null }, user.id);
}
function M_loginUser(db, data) {
  const email = normalizeEmail(data.email);
  const user = Q.findUserByEmail(db, email);
  if (!user) return { ...db, authError: "Account not found. Create an account first." };
  if (user.passwordHashOrPlainForMockOnly && data.password !== user.passwordHashOrPlainForMockOnly) {
    return { ...db, authError: "Incorrect password" };
  }
  return restoreUserSelection({ ...db, authError: null }, user.id);
}
function M_logoutUser(db) {
  return {
    ...db,
    currentUserId: null,
    currentWorkspaceId: null,
    currentOSId: null,
    currentOSSubscriptionId: null,
    currentBusinessUnitId: null,
    currentBranchId: null,
  };
}
// ensure the current user is the workspace Owner team member
function M_ensureOwner(db) {
  if (!db.currentUserId || !db.currentWorkspaceId) return db;
  const has = db.teamMembers.some((m) => m.workspaceId === db.currentWorkspaceId && m.userId === db.currentUserId);
  if (has) return db;
  const tm = { id: uid("tm"), workspaceId: db.currentWorkspaceId, userId: db.currentUserId, workspaceRole: "Owner", osId: null, osRole: "Owner", businessUnitId: null, branchId: null, status: "active", lastActive: "Active now" };
  return { ...db, teamMembers: [...db.teamMembers, tm] };
}
function M_setEntry(db, entry) { return { ...db, entryContext: { ...db.entryContext, ...entry } }; }
function M_setLocale(db, locale) { return { ...db, locale }; }
function M_setTheme(db, theme) { return { ...db, theme }; }
function upsertCommerceSetup(rows, setup) {
  const presetId = normalizePreset(setup.presetId || setup.businessType || setup.preset);
  const displayName = setup.businessDisplayName || setup.displayName || "";
  const legalName = setup.legalBusinessName || setup.legalName || (displayName ? `${displayName} LLC` : "");
  const full = {
    mode: "physical", vatRegistered: true, vatRate: 14, pricesIncludeTax: true, taxLabel: "VAT",
    taxNumber: "123456789", invoicePrefix: "INV", receiptPrefix: "RCPT", invoiceStart: 1001,
    receiptStart: 1001, footer: "Thank you for shopping with us",
    returnPolicy: "Returns accepted within 14 days with receipt.", receiptSize: "80mm",
    receiptStyle: "classic", invoiceTemplate: "a4-simple", legalName: "", phone: "", email: "",
    crn: "", trn: "", logo: null, categories: null, createdAt: nowISO(),
    ...setup,
    presetId,
    businessType: presetId,
    preset: presetId,
    businessDisplayName: displayName,
    displayName,
    legalBusinessName: legalName,
    legalName,
    updatedAt: nowISO(),
  };
  const exists = rows.some((r) => r.businessUnitId === full.businessUnitId);
  return exists ? rows.map((r) => r.businessUnitId === full.businessUnitId ? { ...r, ...full } : r) : [...rows, full];
}
function M_updateCommerceSetup(db, buId, patch) {
  const setup = Q.commerceSetupForBU(db, buId) || {};
  const nextType = normalizePreset(patch.presetId || patch.businessType || patch.preset || setup.presetId || setup.businessType || "retail");
  const businessUnits = db.businessUnits.map((b) => b.id === buId ? { ...b, preset: nextType, presetId: nextType } : b);
  const commerceSetups = upsertCommerceSetup(db.commerceSetups || [], { ...setup, ...patch, businessUnitId: buId, presetId: nextType, businessType: nextType });
  return { ...db, businessUnits, commerceSetups };
}
function replaceCurrentTable(db, tableKey, rows, normalizer) {
  const current = Q.currentBusinessUnit(db);
  const businessUnitId = current && current.id;
  const normalized = (Array.isArray(rows) ? rows : []).map((row) => normalizer(db, row));
  const kept = (db[tableKey] || []).filter((row) => !businessUnitId || row.businessUnitId !== businessUnitId);
  return { ...db, [tableKey]: [...kept, ...normalized] };
}
function M_setCommerceProducts(db, rows) {
  return replaceCurrentTable(db, "commerceProducts", (rows || []).filter(validProduct), normalizeProductRow);
}
function M_setCommerceOrders(db, rows) {
  return replaceCurrentTable(db, "commerceOrders", (rows || []).filter((o) => o && Array.isArray(o.items) && o.items.length), normalizeOrderRow);
}
function M_setCommerceCustomers(db, rows) {
  return replaceCurrentTable(db, "commerceCustomers", (rows || []).filter((c) => c && String(c.name || "").trim()), normalizeCustomerRow);
}
function M_setCommerceInvoices(db, rows) {
  return replaceCurrentTable(db, "commerceInvoices", (rows || []).filter((i) => i && (i.invoice || i.orderId) && Array.isArray(i.items)), normalizeInvoiceRow);
}
function seedEmptyCommerceData(db) {
  const businessUnitId = db.currentBusinessUnitId;
  return {
    ...db,
    commerceProducts: (db.commerceProducts || []).filter((r) => !businessUnitId || r.businessUnitId !== businessUnitId),
    commerceOrders: (db.commerceOrders || []).filter((r) => !businessUnitId || r.businessUnitId !== businessUnitId),
    commerceCustomers: (db.commerceCustomers || []).filter((r) => !businessUnitId || r.businessUnitId !== businessUnitId),
    commerceInvoices: (db.commerceInvoices || []).filter((r) => !businessUnitId || r.businessUnitId !== businessUnitId),
  };
}
function seedDemoCommerceData(db) {
  const seeded = seedDB(db.locale, db.theme);
  const ctx = contextIds(db, {});
  const emptied = seedEmptyCommerceData(db);
  const currentProducts = (seeded.commerceProducts || []).map((p) => ({
    ...p,
    id: p.id && Q.currentBusinessUnit(db) ? `${Q.currentBusinessUnit(db).id}_${p.id}` : p.id || uid("prod"),
    ...ctx,
    createdAt: nowISO(),
    updatedAt: nowISO(),
  }));
  return {
    ...emptied,
    commerceProducts: [...(emptied.commerceProducts || []), ...currentProducts],
  };
}
function M_completeOnboarding(db, data) {
  const created = nowISO();
  const user = db.users.find((u) => u.id === db.currentUserId);
  if (!user) return db;
  const wsId = data.workspaceId || (db.currentWorkspaceId && db.workspaces.some((w) => w.id === db.currentWorkspaceId) ? db.currentWorkspaceId : "ws_001");
  const branchId = data.branchId || "br_001";
  const subId = data.osSubscriptionId || "sub_001";
  const buId = data.businessUnitId || "bu_001";
  const osId = data.osId || "commerce";
  const preset = normalizePreset(data.presetId || data.preset);
  const plan = data.plan || "starter";
  const workspace = {
    id: wsId, name: data.workspaceName, country: data.country || "Egypt", currency: data.currency || "EGP",
    timezone: data.timezone || "Africa/Cairo", ownerUserId: user.id, createdAt: created,
  };
  const branch = {
    id: branchId, workspaceId: wsId, businessUnitId: buId, name: data.branchName,
    city: data.branchCity || "", country: data.country || "Egypt", isMain: true, createdAt: created,
  };
  const sub = {
    id: subId, workspaceId: wsId, os: osId, osId, plan, planId: planIdFor(osId, plan),
    status: osId === "commerce" ? "trialing" : "coming_soon", startedAt: created,
    trialEndsAt: data.trialEndsAt || null, renewsAt: data.renewsAt || null,
  };
  const bu = {
    id: buId, workspaceId: wsId, osSubscriptionId: subId, os: osId, osId,
    branchIds: [branchId], branchId, name: data.businessUnitName, preset, presetId: preset, createdAt: created,
  };
  const users = db.users.some((u) => u.id === user.id) ? db.users.map((u) => u.id === user.id ? { ...u, ...user } : u) : [...db.users, user];
  const workspaces = db.workspaces.some((w) => w.id === wsId) ? db.workspaces.map((w) => w.id === wsId ? workspace : w) : [...db.workspaces, workspace];
  const branches = db.branches.some((b) => b.id === branchId) ? db.branches.map((b) => b.id === branchId ? branch : b) : [...db.branches.filter((b) => b.workspaceId !== wsId || !b.isMain), branch];
  const subscriptions = db.subscriptions.some((s) => s.id === subId) ? db.subscriptions.map((s) => s.id === subId ? sub : s) : [...db.subscriptions.filter((s) => !(s.workspaceId === wsId && (s.osId || s.os) === osId)), sub];
  const businessUnits = db.businessUnits.some((b) => b.id === buId) ? db.businessUnits.map((b) => b.id === buId ? bu : b) : [...db.businessUnits.filter((b) => b.workspaceId !== wsId || (b.osId || b.os) !== osId), bu];
  const teamMember = { id: "tm_001", workspaceId: wsId, userId: user.id, workspaceRole: "Owner", osId: null, osRole: "Owner", businessUnitId: null, branchId: null, status: "active", lastActive: "Active now" };
  const teamMembers = db.teamMembers.some((m) => m.id === teamMember.id) ? db.teamMembers.map((m) => m.id === teamMember.id ? teamMember : m) : [...db.teamMembers, teamMember];
  let commerceSetups = db.commerceSetups || [];
  if (osId === "commerce") {
    const existing = commerceSetups.find((s) => s.businessUnitId === buId) || {};
    const displayName = data.businessUnitName || existing.businessDisplayName || existing.displayName || "";
    commerceSetups = upsertCommerceSetup(commerceSetups, {
      ...existing,
      id: existing.id || "cs_001", workspaceId: wsId, businessUnitId: buId, branchId, osSubscriptionId: subId,
      presetId: preset, businessType: preset, businessDisplayName: displayName, displayName,
      legalBusinessName: displayName ? `${displayName} LLC` : "",
      legalName: displayName ? `${displayName} LLC` : "",
      phone: "", email: "",
      address: "", city: data.branchCity || "", country: data.country || "Egypt",
    });
  }
  return {
    ...db, users, workspaces, branches, subscriptions, businessUnits, teamMembers, commerceSetups,
    commerceProducts: db.commerceProducts || [],
    commerceOrders: db.commerceOrders || [],
    commerceCustomers: db.commerceCustomers || [],
    commerceInvoices: db.commerceInvoices || [],
    currentUserId: user.id, currentWorkspaceId: wsId, currentOSId: osId,
    currentOSSubscriptionId: subId, currentBusinessUnitId: buId, currentBranchId: branchId,
    onboardingState: { phase: "complete", step: 0, completedOS: osId === "commerce" ? ["commerce"] : [] },
  };
}

window.NexoraDB = {
  KEYS: STORAGE_KEYS, VERSION: MOCK_DB_VERSION,
  uid, nowISO, normalizeEmail, getUserDisplayName, OS_CATALOG, PLAN_CATALOG, planIdFor,
  emptyDB, seedDB, loadDB, persistDB, resetDB, startDemo, startFresh, Q,
  M_upsertWorkspace, M_createBranch, M_createBusinessUnit, M_updateBusinessUnit,
  M_createSubscription, M_addTeamMember, M_setCurrent, M_setEntry, M_setLocale, M_setTheme,
  M_createUser, M_loginUser, M_logoutUser, M_ensureOwner, M_updateCommerceSetup, M_completeOnboarding,
  M_setCommerceProducts, M_setCommerceOrders, M_setCommerceCustomers, M_setCommerceInvoices,
  resetMockData: resetDB, seedDemoData: startDemo, seedEmptyCommerceData, seedDemoCommerceData,
  getCurrentWorkspace: () => Q.currentWorkspace(loadDB()),
  getCurrentBusinessUnit: () => Q.currentBusinessUnit(loadDB()),
  getCurrentCommerceSetup: () => Q.currentCommerceSetup(loadDB()),
  getCurrentProducts: () => Q.currentProducts(loadDB()),
  getCurrentOrders: () => Q.currentOrders(loadDB()),
  getCurrentInvoices: () => Q.currentInvoices(loadDB()),
  getCurrentCustomers: () => Q.currentCustomers(loadDB()),
  createUser: (data) => { const d = M_createUser(loadDB(), data); persistDB(d); return d; },
  findUserByEmail: (email) => Q.findUserByEmail(loadDB(), email),
  loginUser: (email, password) => { const d = M_loginUser(loadDB(), { email, password }); persistDB(d); return d; },
  logoutUser: () => { const d = M_logoutUser(loadDB()); persistDB(d); return d; },
  getCurrentUser: () => Q.currentUser(loadDB()),
};
