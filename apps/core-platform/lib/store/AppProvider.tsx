"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from "react";
import { STORAGE_KEYS, PLAN_CATALOG, DEFAULT_SETUP, planIdFor } from "@nexoraxs/shared";
import {
  uid, nowISO, normalizeEmail, getUserDisplayName,
  readCollection, writeCollection, readSession, writeSession,
  seedDB, storageUsagePercent, formatBytes,
  getCurrentOSEnablement, ensureCommerceBusinessEnablement, isBranchNameAvailableForBusiness,
} from "@nexoraxs/shared";
import { t as tFn, type Lang } from "@nexoraxs/shared";
import { money as moneyFn } from "@nexoraxs/shared";
import type {
  User, Workspace, Branch, OSSubscription, BusinessUnit, WorkspaceMember,
  CommerceSetup, CommerceProduct, CommerceOrder, CommerceInvoice, CommerceCustomer, OrderItem,
  OSEnablement, WorkspaceStorageUsage,
} from "@nexoraxs/types";
import type { ShellContextSnapshot } from "@/lib/shell/contracts";

// ---- types ----
export type { User, Workspace, Branch, OSSubscription, OSEnablement, BusinessUnit, WorkspaceMember, CommerceSetup, CommerceProduct, CommerceOrder, CommerceInvoice, CommerceCustomer, OrderItem };
// backward-compat aliases
export type TeamMember = WorkspaceMember;

export interface Toast { id: string; message: string; type: "info" | "success" | "error" | "warn" }

export interface CommercePlanInfo {
  subscription: OSSubscription;
  name: string;
  status: string;
  total: number | null;
  renew: string;
  limits: { businessUnits: number; branches: number; users: number };
}

export interface OnboardingState {
  phase: string | null;
  step: number;
  completedOS: string[];
}

interface AppContextType {
  isHydrated: boolean;
  // session
  currentUser: User | null;
  currentWorkspace: Workspace | null;
  currentBranch: Branch | null;
  currentBU: BusinessUnit | null;
  currentOSSubscription: OSSubscription | null;
  currentOSEnablement: OSEnablement | null;
  onboardingState: OnboardingState;
  shellContextSnapshot: ShellContextSnapshot;
  // ui
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  toasts: Toast[];
  showToast: (message: string, type?: Toast["type"]) => void;
  dismissToast: (id: string) => void;
  // computed
  isAuthenticated: boolean;
  isOnboardingComplete: boolean;
  isCommerceOSActive: boolean;
  isCommerceSetupComplete: boolean;
  currentUserDisplayName: string;
  BUSINESS_UNITS: BusinessUnit[];
  BRANCHES: Branch[];
  COMMERCE_PLAN: CommercePlanInfo | null;
  workspaceStorageUsage: WorkspaceStorageUsage | null;
  storageUsagePercent: number;
  storageUsageLabel: string;
  money: (n: number) => string;
  t: (key: string) => string;
  // auth actions
  createUser: (data: { fullName: string; email: string; password: string }) => "success" | "email_taken";
  loginUser: (email: string, password: string) => "success" | "invalid_credentials";
  logoutUser: () => void;
  // workspace
  createWorkspace: (data: { name: string; region?: string; country: string; currency: string; timezone: string }) => Workspace;
  // onboarding
  setLocale: (locale: Lang) => void;
  createBranch: (data: { name: string; country?: string; currency?: string; isMain: boolean }) => Branch;
  selectOS: (osId: string) => void;
  selectPlan: (planKey: "starter" | "pro" | "business") => void;
  createBusinessUnit: (data: { name: string; preset: string; osId: string; industryType?: string }) => BusinessUnit;
  completeOnboarding: () => void;
  // commerce setup
  saveCommerceSetup: (data: Partial<CommerceSetup>) => void;
  getCommerceSetup: () => CommerceSetup;
  // commerce data (scoped to currentBU)
  products: CommerceProduct[];
  orders: CommerceOrder[];
  invoices: CommerceInvoice[];
  customers: CommerceCustomer[];
  subscriptions: OSSubscription[];
  // commerce actions
  addProduct: (data: Omit<CommerceProduct, "id" | "businessUnitId" | "workspaceId" | "branchId" | "osSubscriptionId" | "createdAt" | "updatedAt">) => CommerceProduct;
  updateProduct: (id: string, data: Partial<CommerceProduct>) => void;
  deleteProduct: (id: string) => void;
  createOrder: (data: {
    items: OrderItem[];
    customerId: string | null;
    payment: "cash" | "card" | "wallet";
    discount: number;
    vat: number;
    subtotal: number;
    total: number;
    net: number;
  }) => CommerceOrder;
  createInvoice: (orderId: string) => CommerceInvoice;
  createCustomer: (data: { name: string; phone: string; email: string; notes: string }) => CommerceCustomer;
  updateCustomer: (id: string, data: Partial<CommerceCustomer>) => void;
  // platform
  setCurrent: (data: Partial<{ currentWorkspaceId: string; currentBusinessUnitId: string; currentBranchId: string }>) => void;
}

const AppCtx = createContext<AppContextType | null>(null);

export function useApp(): AppContextType {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

// ---- load initial state from storage ----
function emptyRuntimeState() {
  return {
    currentUserId: null as string | null,
    currentWorkspaceId: null as string | null,
    currentOSId: null as string | null,
    currentOSSubscriptionId: null as string | null,
    currentBusinessUnitId: null as string | null,
    currentBranchId: null as string | null,
    onboardingState: { phase: null, step: 0, completedOS: [] } as OnboardingState,
    lang: "en" as Lang,
    theme: "light" as "light" | "dark",
    users: [] as User[],
    workspaces: [] as Workspace[],
    branches: [] as Branch[],
    subscriptions: [] as OSSubscription[],
    businessUnits: [] as BusinessUnit[],
    osEnablements: [] as OSEnablement[],
    teamMembers: [] as WorkspaceMember[],
    commerceSetups: [] as CommerceSetup[],
    products: [] as CommerceProduct[],
    orders: [] as CommerceOrder[],
    customers: [] as CommerceCustomer[],
    invoices: [] as CommerceInvoice[],
    workspaceStorageUsage: [] as WorkspaceStorageUsage[],
  };
}

function loadState(): ReturnType<typeof emptyRuntimeState> {
  if (typeof window === "undefined") return emptyRuntimeState();

  const demoFlag = readSession<string | null>(STORAGE_KEYS.demo, null);
  if (demoFlag === "1" || demoFlag === "true") {
    const seeded = seedDB();
    persistAll(seeded);
    sessionStorage.removeItem(STORAGE_KEYS.demo);
  }

  const theme = (localStorage.getItem(STORAGE_KEYS.theme) as "light" | "dark" | null) || "light";
  const lang = (readSession<string | null>(STORAGE_KEYS.locale, null) || "en") as Lang;

  return {
    currentUserId: readSession<string | null>(STORAGE_KEYS.currentUserId, null),
    currentWorkspaceId: readSession<string | null>(STORAGE_KEYS.currentWorkspaceId, null),
    currentOSId: readSession<string | null>(STORAGE_KEYS.currentOSId, null),
    currentOSSubscriptionId: readSession<string | null>(STORAGE_KEYS.currentOSSubscriptionId, null),
    currentBusinessUnitId: readSession<string | null>(STORAGE_KEYS.currentBusinessUnitId, null),
    currentBranchId: readSession<string | null>(STORAGE_KEYS.currentBranchId, null),
    onboardingState: readSession<OnboardingState>(STORAGE_KEYS.onboardingState, { phase: null, step: 0, completedOS: [] }),
    lang,
    theme,
    users: readCollection<User>(STORAGE_KEYS.users),
    workspaces: readCollection<Workspace>(STORAGE_KEYS.workspaces),
    branches: readCollection<Branch>(STORAGE_KEYS.branches),
    subscriptions: readCollection<OSSubscription>(STORAGE_KEYS.osSubscriptions),
    businessUnits: readCollection<BusinessUnit>(STORAGE_KEYS.businessUnits),
    osEnablements: readCollection<OSEnablement>(STORAGE_KEYS.osEnablements),
    teamMembers: readCollection<WorkspaceMember>(STORAGE_KEYS.teamMembers),
    commerceSetups: readCollection<CommerceSetup>(STORAGE_KEYS.commerceSetups),
    products: readCollection<CommerceProduct>(STORAGE_KEYS.products),
    orders: readCollection<CommerceOrder>(STORAGE_KEYS.orders),
    customers: readCollection<CommerceCustomer>(STORAGE_KEYS.customers),
    invoices: readCollection<CommerceInvoice>(STORAGE_KEYS.invoices),
    workspaceStorageUsage: readCollection<WorkspaceStorageUsage>(STORAGE_KEYS.workspaceStorageUsage),
  };
}

function persistAll(data: ReturnType<typeof seedDB>): void {
  writeCollection(STORAGE_KEYS.users, data.users);
  writeCollection(STORAGE_KEYS.workspaces, data.workspaces);
  writeCollection(STORAGE_KEYS.branches, data.branches);
  writeCollection(STORAGE_KEYS.osSubscriptions, data.subscriptions);
  writeCollection(STORAGE_KEYS.osEnablements, data.osEnablements);
  writeCollection(STORAGE_KEYS.businessUnits, data.businessUnits);
  writeCollection(STORAGE_KEYS.teamMembers, data.teamMembers);
  writeCollection(STORAGE_KEYS.commerceSetups, data.commerceSetups);
  writeCollection(STORAGE_KEYS.products, data.commerceProducts);
  writeCollection(STORAGE_KEYS.orders, data.commerceOrders);
  writeCollection(STORAGE_KEYS.customers, data.commerceCustomers);
  writeCollection(STORAGE_KEYS.invoices, data.commerceInvoices);
  writeCollection(STORAGE_KEYS.workspaceStorageUsage, data.workspaceStorageUsage);
  if (data.currentUserId) writeSession(STORAGE_KEYS.currentUserId, data.currentUserId);
  if (data.currentWorkspaceId) writeSession(STORAGE_KEYS.currentWorkspaceId, data.currentWorkspaceId);
  if (data.currentOSId) writeSession(STORAGE_KEYS.currentOSId, data.currentOSId);
  if (data.currentOSSubscriptionId) writeSession(STORAGE_KEYS.currentOSSubscriptionId, data.currentOSSubscriptionId);
  if (data.currentBusinessUnitId) writeSession(STORAGE_KEYS.currentBusinessUnitId, data.currentBusinessUnitId);
  if (data.currentBranchId) writeSession(STORAGE_KEYS.currentBranchId, data.currentBranchId);
  writeSession(STORAGE_KEYS.onboardingState, data.onboardingState);
  writeSession(STORAGE_KEYS.locale, data.locale);
  localStorage.setItem(STORAGE_KEYS.theme, data.theme);
}

// ---- AppProvider ----
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(emptyRuntimeState);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    // Hydrate browser-only mock storage after SSR and the first client render match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(loadState());
    setIsHydrated(true);
  }, []);

  // RTL: set dir on mount + whenever lang changes
  useEffect(() => {
    if (!isHydrated) return;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = state.lang;
  }, [isHydrated, state.lang]);

  // theme: set data-theme on mount + whenever theme changes
  useEffect(() => {
    if (!isHydrated) return;
    document.documentElement.setAttribute("data-theme", state.theme);
    localStorage.setItem(STORAGE_KEYS.theme, state.theme);
  }, [isHydrated, state.theme]);

  // persist session keys on every change
  useEffect(() => {
    if (!isHydrated) return;
    if (typeof window === "undefined") return;
    if (state.currentUserId) writeSession(STORAGE_KEYS.currentUserId, state.currentUserId);
    else sessionStorage.removeItem(STORAGE_KEYS.currentUserId);
    if (state.currentWorkspaceId) writeSession(STORAGE_KEYS.currentWorkspaceId, state.currentWorkspaceId);
    else sessionStorage.removeItem(STORAGE_KEYS.currentWorkspaceId);
    if (state.currentOSId) writeSession(STORAGE_KEYS.currentOSId, state.currentOSId);
    else sessionStorage.removeItem(STORAGE_KEYS.currentOSId);
    if (state.currentOSSubscriptionId) writeSession(STORAGE_KEYS.currentOSSubscriptionId, state.currentOSSubscriptionId);
    else sessionStorage.removeItem(STORAGE_KEYS.currentOSSubscriptionId);
    if (state.currentBusinessUnitId) writeSession(STORAGE_KEYS.currentBusinessUnitId, state.currentBusinessUnitId);
    else sessionStorage.removeItem(STORAGE_KEYS.currentBusinessUnitId);
    if (state.currentBranchId) writeSession(STORAGE_KEYS.currentBranchId, state.currentBranchId);
    else sessionStorage.removeItem(STORAGE_KEYS.currentBranchId);
    writeSession(STORAGE_KEYS.onboardingState, state.onboardingState);
    writeSession(STORAGE_KEYS.locale, state.lang);
  }, [state.currentUserId, state.currentWorkspaceId, state.currentOSId,
    state.currentOSSubscriptionId, state.currentBusinessUnitId, state.currentBranchId,
    state.onboardingState, state.lang, isHydrated]);

  // ---- derived entities ----
  const currentUser = useMemo(() => state.users.find((u) => u.id === state.currentUserId) ?? null, [state.users, state.currentUserId]);
  const currentWorkspace = useMemo(() => state.workspaces.find((w) => w.id === state.currentWorkspaceId) ?? null, [state.workspaces, state.currentWorkspaceId]);
  const currentBU = useMemo(() => state.businessUnits.find((b) => b.id === state.currentBusinessUnitId) ?? null, [state.businessUnits, state.currentBusinessUnitId]);
  const currentBranch = useMemo(() => state.branches.find((b) => b.id === state.currentBranchId) ?? null, [state.branches, state.currentBranchId]);
  const currentOSSubscription = useMemo(() => state.subscriptions.find((s) => s.id === state.currentOSSubscriptionId) ?? null, [state.subscriptions, state.currentOSSubscriptionId]);
  const currentOSEnablement = useMemo(() => getCurrentOSEnablement({
    enablements: state.osEnablements,
    workspaceId: state.currentWorkspaceId,
    osId: state.currentOSId || currentOSSubscription?.osId,
    businessUnitId: state.currentBusinessUnitId,
    branchId: state.currentBranchId,
  }), [state.osEnablements, state.currentWorkspaceId, state.currentOSId, state.currentBusinessUnitId, state.currentBranchId, currentOSSubscription]);

  const BUSINESS_UNITS = useMemo(() => state.businessUnits.filter((b) => b.workspaceId === state.currentWorkspaceId), [state.businessUnits, state.currentWorkspaceId]);
  const BRANCHES = useMemo(() => state.branches.filter((b) => b.workspaceId === state.currentWorkspaceId && b.businessUnitId === state.currentBusinessUnitId), [state.branches, state.currentWorkspaceId, state.currentBusinessUnitId]);

  const isAuthenticated = !!state.currentUserId && !!currentUser;
  const isOnboardingComplete = state.onboardingState.completedOS.includes("commerce") && !!currentWorkspace;
  const isCommerceOSActive = !!currentOSSubscription && currentOSSubscription.osId === "commerce";
  const isCommerceSetupComplete = !!state.commerceSetups.find((cs) => cs.businessUnitId === state.currentBusinessUnitId);

  const currentUserDisplayName = getUserDisplayName(currentUser);

  const shellContextSnapshot = useMemo((): ShellContextSnapshot => ({
    actorId: state.currentUserId,
    workspaceId: state.currentWorkspaceId,
    workspace: currentWorkspace,
    legacyBusinessUnitId: state.currentBusinessUnitId,
    legacyBusinessUnit: currentBU,
    branchId: state.currentBranchId,
    branch: currentBranch,
  }), [
    currentBU,
    currentBranch,
    currentWorkspace,
    state.currentBranchId,
    state.currentBusinessUnitId,
    state.currentUserId,
    state.currentWorkspaceId,
  ]);

  const COMMERCE_PLAN = useMemo((): CommercePlanInfo | null => {
    if (!currentOSSubscription) return null;
    const planMeta = PLAN_CATALOG.find((p) => p.id === currentOSSubscription.planId);
    if (!planMeta) return null;
    const statusLabels: Record<string, string> = { trialing: "Free Trial", active: "Active", past_due: "Past Due", canceled: "Canceled" };
    const renew = currentOSSubscription.trialEndsAt || currentOSSubscription.renewsAt || "—";
    return {
      subscription: currentOSSubscription,
      name: planMeta.tier,
      status: statusLabels[currentOSSubscription.status] || currentOSSubscription.status,
      total: planMeta.price,
      renew,
      limits: planMeta.limits,
    };
  }, [currentOSSubscription]);

  // scoped commerce data (to current BU)
  const products = useMemo(() => state.products.filter((p) => p.businessUnitId === state.currentBusinessUnitId), [state.products, state.currentBusinessUnitId]);
  const orders = useMemo(() => state.orders.filter((o) => o.businessUnitId === state.currentBusinessUnitId), [state.orders, state.currentBusinessUnitId]);
  const invoices = useMemo(() => state.invoices.filter((i) => i.businessUnitId === state.currentBusinessUnitId), [state.invoices, state.currentBusinessUnitId]);
  const customers = useMemo(() => state.customers.filter((c) => c.businessUnitId === state.currentBusinessUnitId), [state.customers, state.currentBusinessUnitId]);

  const workspaceStorageUsage = useMemo(
    () => state.workspaceStorageUsage.find((u) => u.workspaceId === state.currentWorkspaceId) ?? null,
    [state.workspaceStorageUsage, state.currentWorkspaceId],
  );
  const storageUsagePct = useMemo(() => storageUsagePercent(workspaceStorageUsage), [workspaceStorageUsage]);
  const storageUsageLabel = useMemo(() => {
    if (!workspaceStorageUsage) return "";
    return `${formatBytes(workspaceStorageUsage.usedBytes, state.lang)} / ${formatBytes(workspaceStorageUsage.limitBytes, state.lang)}`;
  }, [workspaceStorageUsage, state.lang]);

  const memoMoney = useCallback((n: number) => moneyFn(n, state.lang), [state.lang]);
  const memoT = useCallback((key: string) => tFn(key, state.lang), [state.lang]);

  // ---- toast ----
  const showToast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = uid("toast");
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ---- auth ----
  const createUser = useCallback((data: { fullName: string; email: string; password: string }): "success" | "email_taken" => {
    const email = normalizeEmail(data.email);
    if (state.users.find((u) => normalizeEmail(u.email) === email)) return "email_taken";
    const user: User = { id: uid("user"), fullName: data.fullName, email, passwordHash: data.password, role: "owner", createdAt: nowISO(), updatedAt: nowISO() };
    const newUsers = [...state.users, user];
    writeCollection(STORAGE_KEYS.users, newUsers);
    setState((prev) => ({ ...prev, users: newUsers, currentUserId: user.id }));
    return "success";
  }, [state.users]);

  const loginUser = useCallback((email: string, password: string): "success" | "invalid_credentials" => {
    const em = normalizeEmail(email);
    const user = state.users.find((u) => normalizeEmail(u.email) === em && u.passwordHash === password);
    if (!user) return "invalid_credentials";
    setState((prev) => ({ ...prev, currentUserId: user.id }));
    return "success";
  }, [state.users]);

  const logoutUser = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEYS.currentUserId);
    }
    setState((prev) => ({ ...prev, currentUserId: null }));
  }, []);

  // ---- workspace ----
  const createWorkspace = useCallback((data: { name: string; region?: string; country: string; currency: string; timezone: string }): Workspace => {
    const ws: Workspace = { id: uid("ws"), name: data.name, region: data.region, country: data.country, currency: data.currency, timezone: data.timezone, language: state.lang, ownerUserId: state.currentUserId!, createdAt: nowISO() };
    const newWS = [...state.workspaces, ws];
    writeCollection(STORAGE_KEYS.workspaces, newWS);
    writeSession(STORAGE_KEYS.currentWorkspaceId, ws.id);
    const starterLimit = PLAN_CATALOG.find((p) => p.id === "commerce_starter")?.limits.storageLimitBytes ?? 500 * 1024 * 1024;
    const usage: WorkspaceStorageUsage = { workspaceId: ws.id, usedBytes: 0, limitBytes: starterLimit, updatedAt: nowISO() };
    const newUsage = [...state.workspaceStorageUsage, usage];
    writeCollection(STORAGE_KEYS.workspaceStorageUsage, newUsage);
    setState((prev) => ({ ...prev, workspaces: newWS, currentWorkspaceId: ws.id, workspaceStorageUsage: newUsage }));
    return ws;
  }, [state.workspaces, state.currentUserId, state.lang, state.workspaceStorageUsage]);

  // ---- onboarding ----
  const setLocale = useCallback((locale: Lang) => {
    setState((prev) => ({ ...prev, lang: locale }));
  }, []);

  const createBranch = useCallback((data: { name: string; country?: string; currency?: string; isMain: boolean }): Branch => {
    const workspaceId = state.currentWorkspaceId || readSession<string | null>(STORAGE_KEYS.currentWorkspaceId, null) || "";
    const businessUnitId = state.currentBusinessUnitId || readSession<string | null>(STORAGE_KEYS.currentBusinessUnitId, null) || "";
    if (businessUnitId && !isBranchNameAvailableForBusiness(state.branches, businessUnitId, data.name)) {
      throw new Error("branch_name_exists");
    }
    const branch: Branch = {
      id: uid("br"), workspaceId, businessUnitId,
      name: data.name, country: data.country || currentWorkspace?.country, currency: data.currency || currentWorkspace?.currency,
      isMain: data.isMain, createdAt: nowISO(),
    };
    const newBranches = [...state.branches, branch];
    writeCollection(STORAGE_KEYS.branches, newBranches);
    writeSession(STORAGE_KEYS.currentBranchId, branch.id);
    setState((prev) => ({ ...prev, branches: newBranches, currentBranchId: branch.id }));
    return branch;
  }, [state.branches, state.currentWorkspaceId, state.currentBusinessUnitId, currentWorkspace]);

  const selectOS = useCallback((osId: string) => {
    writeSession(STORAGE_KEYS.currentOSId, osId);
    setState((prev) => ({ ...prev, currentOSId: osId }));
  }, []);

  const selectPlan = useCallback((planKey: "starter" | "pro" | "business") => {
    const osId = state.currentOSId || readSession<string | null>(STORAGE_KEYS.currentOSId, null) || "commerce";
    const workspaceId = state.currentWorkspaceId || readSession<string | null>(STORAGE_KEYS.currentWorkspaceId, null) || "";
    const planId = planIdFor(osId, planKey);
    const existing = state.subscriptions.find((s) => s.workspaceId === workspaceId && s.osId === osId);
    const trialDate = new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);
    const sub: OSSubscription = existing
      ? { ...existing, plan: planKey, planId, status: existing.status === "canceled" ? "trialing" : existing.status, renewsAt: existing.renewsAt || trialDate }
      : {
          id: uid("sub"), workspaceId, os: osId,
          osId, plan: planKey, planId,
          status: "trialing", startedAt: nowISO(),
          trialEndsAt: trialDate,
          renewsAt: trialDate,
        };
    const newSubs = existing
      ? state.subscriptions.map((s) => s.id === existing.id ? sub : s)
      : [...state.subscriptions, sub];
    const existingEnablement = state.osEnablements.find((e) =>
      e.workspaceId === workspaceId && e.osSubscriptionId === sub.id && e.osId === osId && e.scope === "workspace",
    );
    const enablement: OSEnablement = {
      id: existingEnablement?.id || uid("ose"),
      osSubscriptionId: sub.id,
      workspaceId,
      osId,
      businessUnitId: null,
      branchIds: [],
      scope: "workspace",
      status: "active",
      createdAt: existingEnablement?.createdAt || nowISO(),
      updatedAt: nowISO(),
    };
    const newEnablements = existingEnablement
      ? state.osEnablements.map((e) => e.id === existingEnablement.id ? enablement : e)
      : [...state.osEnablements, enablement];
    writeCollection(STORAGE_KEYS.osSubscriptions, newSubs);
    writeCollection(STORAGE_KEYS.osEnablements, newEnablements);
    writeSession(STORAGE_KEYS.currentOSSubscriptionId, sub.id);

    const planMeta = PLAN_CATALOG.find((p) => p.id === planId);
    const limitBytes = planMeta?.limits.storageLimitBytes;
    let newUsage = state.workspaceStorageUsage;
    if (limitBytes && workspaceId) {
      newUsage = state.workspaceStorageUsage.map((u) =>
        u.workspaceId === workspaceId ? { ...u, limitBytes, updatedAt: nowISO() } : u,
      );
      writeCollection(STORAGE_KEYS.workspaceStorageUsage, newUsage);
    }
    setState((prev) => ({ ...prev, subscriptions: newSubs, osEnablements: newEnablements, currentOSSubscriptionId: sub.id, workspaceStorageUsage: newUsage }));
  }, [state.subscriptions, state.osEnablements, state.currentWorkspaceId, state.currentOSId, state.workspaceStorageUsage]);

  const createBusinessUnit = useCallback((data: { name: string; preset: string; osId: string; industryType?: string }): BusinessUnit => {
    const workspaceId = state.currentWorkspaceId || readSession<string | null>(STORAGE_KEYS.currentWorkspaceId, null) || "";
    const osSubscriptionId = state.currentOSSubscriptionId || readSession<string | null>(STORAGE_KEYS.currentOSSubscriptionId, null) || "";
    const branchId = state.currentBranchId || readSession<string | null>(STORAGE_KEYS.currentBranchId, null) || "";
    const bu: BusinessUnit = {
      id: uid("bu"), workspaceId, osSubscriptionId,
      os: data.osId, osId: data.osId, selectedOS: data.osId,
      branchIds: branchId ? [branchId] : [],
      branchId,
      name: data.name, industryType: data.industryType || data.preset,
      preset: data.preset, presetId: data.preset, createdAt: nowISO(),
    };
    const newBUs = [...state.businessUnits, bu];
    const enablementResult = ensureCommerceBusinessEnablement({
      enablements: state.osEnablements,
      subscriptions: state.subscriptions,
      workspaceId,
      businessUnitId: bu.id,
      branchIds: bu.branchIds,
    });
    const newEnablements = data.osId === "commerce" ? enablementResult.enablements : state.osEnablements;
    writeCollection(STORAGE_KEYS.businessUnits, newBUs);
    writeCollection(STORAGE_KEYS.osEnablements, newEnablements);
    writeSession(STORAGE_KEYS.currentBusinessUnitId, bu.id);
    // Read fresh from localStorage so a preceding synchronous createBranch call's
    // persisted branch isn't lost (state.branches is still the stale closure value).
    const freshBranches = readCollection<Branch>(STORAGE_KEYS.branches);
    const updatedBranches = freshBranches.map((b) => b.id === branchId ? { ...b, businessUnitId: bu.id } : b);
    writeCollection(STORAGE_KEYS.branches, updatedBranches);
    setState((prev) => ({
      ...prev,
      businessUnits: newBUs,
      branches: prev.branches.map((b) => b.id === branchId ? { ...b, businessUnitId: bu.id } : b),
      osEnablements: newEnablements,
      currentBusinessUnitId: bu.id,
    }));
    return bu;
  }, [state.businessUnits, state.osEnablements, state.subscriptions, state.currentWorkspaceId, state.currentOSSubscriptionId, state.currentBranchId]);

  const completeOnboarding = useCallback(() => {
    const osId = state.currentOSId || readSession<string | null>(STORAGE_KEYS.currentOSId, null) || "commerce";
    const newState: OnboardingState = {
      ...state.onboardingState,
      phase: null,
      step: 0,
      completedOS: [...new Set([...state.onboardingState.completedOS, osId])],
    };
    writeSession(STORAGE_KEYS.onboardingState, newState);
    setState((prev) => ({ ...prev, onboardingState: newState }));
  }, [state.onboardingState, state.currentOSId]);

  // ---- commerce setup ----
  const getCommerceSetup = useCallback((): CommerceSetup => {
    const existing = state.commerceSetups.find((cs) => cs.businessUnitId === state.currentBusinessUnitId);
    if (existing) return existing;
    const buPreset = currentBU?.presetId || "retail";
    return {
      id: "", workspaceId: state.currentWorkspaceId || "", businessUnitId: state.currentBusinessUnitId || "",
      osSubscriptionId: state.currentOSSubscriptionId || "", createdAt: "", updatedAt: "",
      ...DEFAULT_SETUP, presetId: buPreset, businessType: buPreset, preset: buPreset,
      categories: [],
    };
  }, [state.commerceSetups, state.currentBusinessUnitId, state.currentWorkspaceId, state.currentOSSubscriptionId, currentBU]);

  const saveCommerceSetup = useCallback((data: Partial<CommerceSetup>) => {
    const existing = state.commerceSetups.find((cs) => cs.businessUnitId === state.currentBusinessUnitId);
    let newSetups: CommerceSetup[];
    if (existing) {
      newSetups = state.commerceSetups.map((cs) => cs.id === existing.id ? { ...cs, ...data, updatedAt: nowISO() } : cs);
    } else {
      const newSetup: CommerceSetup = {
        id: uid("cs"), workspaceId: state.currentWorkspaceId!, businessUnitId: state.currentBusinessUnitId!,
        osSubscriptionId: state.currentOSSubscriptionId!, createdAt: nowISO(), updatedAt: nowISO(),
        ...DEFAULT_SETUP, categories: [], ...data,
      };
      newSetups = [...state.commerceSetups, newSetup];
    }
    writeCollection(STORAGE_KEYS.commerceSetups, newSetups);
    setState((prev) => ({ ...prev, commerceSetups: newSetups }));
  }, [state.commerceSetups, state.currentBusinessUnitId, state.currentWorkspaceId, state.currentOSSubscriptionId]);

  // ---- products ----
  const addProduct = useCallback((data: Omit<CommerceProduct, "id" | "businessUnitId" | "workspaceId" | "branchId" | "osSubscriptionId" | "createdAt" | "updatedAt">): CommerceProduct => {
    const product: CommerceProduct = {
      id: uid("p"), workspaceId: state.currentWorkspaceId!, businessUnitId: state.currentBusinessUnitId!,
      branchId: state.currentBranchId!, osSubscriptionId: state.currentOSSubscriptionId!,
      createdAt: nowISO(), updatedAt: nowISO(), ...data,
    };
    const newProducts = [...state.products, product];
    writeCollection(STORAGE_KEYS.products, newProducts);
    setState((prev) => ({ ...prev, products: newProducts }));
    return product;
  }, [state.products, state.currentWorkspaceId, state.currentBusinessUnitId, state.currentBranchId, state.currentOSSubscriptionId]);

  const updateProduct = useCallback((id: string, data: Partial<CommerceProduct>) => {
    const newProducts = state.products.map((p) => p.id === id ? { ...p, ...data, updatedAt: nowISO() } : p);
    writeCollection(STORAGE_KEYS.products, newProducts);
    setState((prev) => ({ ...prev, products: newProducts }));
  }, [state.products]);

  const deleteProduct = useCallback((id: string) => {
    const newProducts = state.products.filter((p) => p.id !== id);
    writeCollection(STORAGE_KEYS.products, newProducts);
    setState((prev) => ({ ...prev, products: newProducts }));
  }, [state.products]);

  // ---- orders ----
  const createOrder = useCallback((data: {
    items: OrderItem[]; customerId: string | null; payment: "cash" | "card" | "wallet";
    discount: number; vat: number; subtotal: number; total: number; net: number;
  }): CommerceOrder => {
    const existingOrders = readCollection<CommerceOrder>(STORAGE_KEYS.orders);
    const buOrders = existingOrders.filter((o) => o.businessUnitId === state.currentBusinessUnitId);
    const orderNum = `ORD-${String(buOrders.length + 1).padStart(4, "0")}`;
    const order: CommerceOrder = {
      id: uid("ord"), orderNumber: orderNum, workspaceId: state.currentWorkspaceId!,
      businessUnitId: state.currentBusinessUnitId!, branchId: state.currentBranchId!,
      cashierId: currentUser?.id ?? "", cashierName: getUserDisplayName(currentUser) || "Cashier",
      createdAt: nowISO(), ...data,
    };
    const newOrders = [...existingOrders, order];
    writeCollection(STORAGE_KEYS.orders, newOrders);
    setState((prev) => ({ ...prev, orders: newOrders }));
    return order;
  }, [state.currentWorkspaceId, state.currentBusinessUnitId, state.currentBranchId, currentUser]);

  // ---- invoices ----
  const createInvoice = useCallback((orderId: string): CommerceInvoice => {
    const order = state.orders.find((o) => o.id === orderId) || readCollection<CommerceOrder>(STORAGE_KEYS.orders).find((o) => o.id === orderId);
    if (!order) throw new Error("Order not found: " + orderId);
    const setup = getCommerceSetup();
    const existingInvoices = readCollection<CommerceInvoice>(STORAGE_KEYS.invoices);
    const buInvoices = existingInvoices.filter((i) => i.businessUnitId === state.currentBusinessUnitId);
    const invNum = `${setup.invoicePrefix}-${(setup.invoiceStart || 1001) + buInvoices.length}`;
    const invoice: CommerceInvoice = {
      id: uid("inv"), invoiceNumber: invNum, orderId, workspaceId: order.workspaceId,
      businessUnitId: order.businessUnitId, branchId: order.branchId, customerId: order.customerId,
      items: order.items, subtotal: order.subtotal, discount: order.discount,
      vat: order.vat, total: order.total, net: order.net,
      cashierId: order.cashierId, cashierName: order.cashierName, createdAt: nowISO(),
    };
    const newInvoices = [...existingInvoices, invoice];
    writeCollection(STORAGE_KEYS.invoices, newInvoices);
    setState((prev) => ({ ...prev, invoices: newInvoices }));
    return invoice;
  }, [state.orders, state.currentBusinessUnitId, getCommerceSetup]);

  // ---- customers ----
  const createCustomer = useCallback((data: { name: string; phone: string; email: string; notes: string }): CommerceCustomer => {
    const customer: CommerceCustomer = {
      id: uid("cust"), workspaceId: state.currentWorkspaceId!, businessUnitId: state.currentBusinessUnitId!,
      branchId: state.currentBranchId!, createdAt: nowISO(), updatedAt: nowISO(), ...data,
    };
    const newCustomers = [...state.customers, customer];
    writeCollection(STORAGE_KEYS.customers, newCustomers);
    setState((prev) => ({ ...prev, customers: newCustomers }));
    return customer;
  }, [state.customers, state.currentWorkspaceId, state.currentBusinessUnitId, state.currentBranchId]);

  const updateCustomer = useCallback((id: string, data: Partial<CommerceCustomer>) => {
    const newCustomers = state.customers.map((c) => c.id === id ? { ...c, ...data, updatedAt: nowISO() } : c);
    writeCollection(STORAGE_KEYS.customers, newCustomers);
    setState((prev) => ({ ...prev, customers: newCustomers }));
  }, [state.customers]);

  // ---- platform ----
  const setCurrent = useCallback((data: Partial<{ currentWorkspaceId: string; currentBusinessUnitId: string; currentBranchId: string }>) => {
    setState((prev) => {
      const next = { ...prev, ...data };
      if (data.currentBusinessUnitId && data.currentBusinessUnitId !== prev.currentBusinessUnitId && !data.currentBranchId) {
        const stillValid = prev.branches.some((b) => b.id === prev.currentBranchId && b.businessUnitId === data.currentBusinessUnitId);
        if (!stillValid) {
          const fallback = prev.branches.find((b) => b.businessUnitId === data.currentBusinessUnitId && b.isMain)
            ?? prev.branches.find((b) => b.businessUnitId === data.currentBusinessUnitId);
          next.currentBranchId = fallback?.id ?? null;
        }
      }
      return next;
    });
  }, []);

  // ---- toggles ----
  const toggleTheme = useCallback(() => {
    setState((prev) => ({ ...prev, theme: prev.theme === "dark" ? "light" : "dark" }));
  }, []);

  const setLang = useCallback((l: Lang) => {
    setState((prev) => ({ ...prev, lang: l }));
  }, []);

  const ctx: AppContextType = {
    isHydrated,
    currentUser, currentWorkspace, currentBranch, currentBU, currentOSSubscription, currentOSEnablement, onboardingState: state.onboardingState,
    shellContextSnapshot,
    lang: state.lang, setLang, theme: state.theme, toggleTheme,
    toasts, showToast, dismissToast,
    isAuthenticated, isOnboardingComplete, isCommerceOSActive, isCommerceSetupComplete,
    currentUserDisplayName, BUSINESS_UNITS, BRANCHES, COMMERCE_PLAN,
    workspaceStorageUsage, storageUsagePercent: storageUsagePct, storageUsageLabel,
    money: memoMoney, t: memoT,
    createUser, loginUser, logoutUser,
    createWorkspace, setLocale, createBranch, selectOS, selectPlan, createBusinessUnit, completeOnboarding,
    saveCommerceSetup, getCommerceSetup,
    products, orders, invoices, customers, subscriptions: state.subscriptions,
    addProduct, updateProduct, deleteProduct, createOrder, createInvoice, createCustomer, updateCustomer,
    setCurrent,
  };

  return <AppCtx.Provider value={ctx}>{children}</AppCtx.Provider>;
}
