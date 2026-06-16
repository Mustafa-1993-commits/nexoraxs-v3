"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from "react";
import { STORAGE_KEYS, PLAN_CATALOG, DEFAULT_SETUP, planIdFor } from "@nexoraxs/shared";
import {
  uid, nowISO, normalizeEmail, getUserDisplayName,
  readCollection, writeCollection, readSession, writeSession, clearAllStorage,
  seedDB, storageUsagePercent, formatBytes,
  compressImageToThumbnail, canAttachMedia, buildMediaAsset, applyUsageDelta,
  effectiveStockFor, buildStockMovement, buildStockTransfer, buildCommerceReturn,
} from "@nexoraxs/shared";
import { computeReturnTotals } from "@nexoraxs/shared";
import { t as tFn, type Lang } from "@nexoraxs/shared";
import { money as moneyFn } from "@nexoraxs/shared";
import type {
  User, Workspace, Branch, OSSubscription, BusinessUnit, WorkspaceMember,
  CommerceSetup, CommerceProduct, CommerceOrder, CommerceInvoice, CommerceCustomer, OrderItem,
  WorkspaceStorageUsage, MediaAsset, MediaOwnerType,
  BranchInventory, StockMovement, StockTransfer, CommerceReturn, CommerceReturnItem, RefundMethod,
} from "@nexoraxs/types";

// ---- types ----
export type { User, Workspace, Branch, OSSubscription, BusinessUnit, WorkspaceMember, CommerceSetup, CommerceProduct, CommerceOrder, CommerceInvoice, CommerceCustomer, OrderItem };
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

export interface CommerceIdentity {
  name: string;
  logo: string | null;
  subtitle: string;
}

interface AppContextType {
  isHydrated: boolean;
  // session
  currentUser: User | null;
  currentWorkspace: Workspace | null;
  currentBranch: Branch | null;
  currentBU: BusinessUnit | null;
  currentOSSubscription: OSSubscription | null;
  onboardingState: OnboardingState;
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
  hasCommerceSetupContext: boolean;
  currentUserDisplayName: string;
  commerceIdentity: CommerceIdentity;
  BUSINESS_UNITS: BusinessUnit[];
  BRANCHES: Branch[];
  COMMERCE_PLAN: CommercePlanInfo | null;
  money: (n: number) => string;
  t: (key: string) => string;
  // auth actions
  createUser: (data: { fullName: string; email: string; password: string }) => "success" | "email_taken";
  loginUser: (email: string, password: string) => "success" | "invalid_credentials";
  logoutUser: () => void;
  // workspace
  createWorkspace: (data: { name: string; country: string; currency: string; timezone: string }) => Workspace;
  // onboarding
  setLocale: (locale: Lang) => void;
  createBranch: (data: { name: string; country?: string; currency?: string; isMain: boolean }) => Branch;
  addBranch: (data: { name: string; city?: string }) => Branch;
  selectOS: (osId: string) => void;
  selectPlan: (planKey: "starter" | "pro" | "business") => void;
  createBusinessUnit: (data: { name: string; preset: string; osId: string }) => BusinessUnit;
  completeOnboarding: () => void;
  // commerce setup
  saveCommerceSetup: (data: Partial<CommerceSetup>) => void;
  getCommerceSetup: () => CommerceSetup;
  // commerce data (scoped to currentBU)
  products: CommerceProduct[];
  orders: CommerceOrder[];
  invoices: CommerceInvoice[];
  // business-scoped only (not branch-filtered) — for cross-branch direct-by-id resolution
  allOrders: CommerceOrder[];
  allInvoices: CommerceInvoice[];
  allCommerceReturns: CommerceReturn[];
  customers: CommerceCustomer[];
  branchInventory: BranchInventory[];
  stockMovements: StockMovement[];
  stockTransfers: StockTransfer[];
  commerceReturns: CommerceReturn[];
  subscriptions: OSSubscription[];
  mediaAssets: MediaAsset[];
  workspaceStorageUsage: WorkspaceStorageUsage | null;
  storageUsagePercent: number;
  storageUsageLabel: string;
  // commerce actions
  attachMedia: (input: { file: File; ownerType: MediaOwnerType; ownerId?: string | null; fileName: string }) => Promise<{ asset: MediaAsset; reference: { mediaAssetId: string; thumbnailUrl: string } } | null>;
  addProduct: (data: Omit<CommerceProduct, "id" | "businessUnitId" | "workspaceId" | "branchId" | "osSubscriptionId" | "createdAt" | "updatedAt"> & { imageFile?: File | null }) => Promise<CommerceProduct>;
  updateProduct: (id: string, data: Partial<CommerceProduct> & { imageFile?: File | null }) => Promise<void>;
  deleteProduct: (id: string) => void;
  adjustStock: (data: {
    productId: string;
    branchId?: string;
    qty: number;
    lowStockThreshold?: number;
  }) => { ok: true } | { ok: false; error: string };
  transferStock: (data: {
    toBranchId: string;
    items: { productId: string; qty: number }[];
    note?: string;
  }) => { ok: true; transfer: StockTransfer } | { ok: false; error: string };
  createReturn: (data: {
    orderId: string;
    items: { productId: string; qty: number }[];
    reason: string;
    refundMethod: RefundMethod;
    restock: boolean;
  }) => { ok: true; return: CommerceReturn } | { ok: false; error: string };
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
interface RuntimeState {
  currentUserId: string | null;
  currentWorkspaceId: string | null;
  currentOSId: string | null;
  currentOSSubscriptionId: string | null;
  currentBusinessUnitId: string | null;
  currentBranchId: string | null;
  onboardingState: OnboardingState;
  lang: Lang;
  theme: "light" | "dark";
  users: User[];
  workspaces: Workspace[];
  branches: Branch[];
  subscriptions: OSSubscription[];
  businessUnits: BusinessUnit[];
  teamMembers: WorkspaceMember[];
  commerceSetups: CommerceSetup[];
  products: CommerceProduct[];
  orders: CommerceOrder[];
  customers: CommerceCustomer[];
  invoices: CommerceInvoice[];
  branchInventory: BranchInventory[];
  stockMovements: StockMovement[];
  stockTransfers: StockTransfer[];
  commerceReturns: CommerceReturn[];
  mediaAssets: MediaAsset[];
  workspaceStorageUsage: WorkspaceStorageUsage[];
}

function emptyRuntimeState(): RuntimeState {
  return {
    currentUserId: null, currentWorkspaceId: null, currentOSId: null,
    currentOSSubscriptionId: null, currentBusinessUnitId: null, currentBranchId: null,
    onboardingState: { phase: null, step: 0, completedOS: [] } as OnboardingState,
    lang: "en" as Lang, theme: "light" as "light" | "dark",
    users: [], workspaces: [], branches: [],
    subscriptions: [], businessUnits: [],
    teamMembers: [], commerceSetups: [],
    products: [], orders: [],
    customers: [], invoices: [],
    branchInventory: [], stockMovements: [], stockTransfers: [], commerceReturns: [],
    mediaAssets: [], workspaceStorageUsage: [],
  };
}

function applyCommerceHandoffFromUrl(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  if (params.get("nx_handoff") !== "commerce") return;

  const currentUserId = params.get("currentUserId");
  const currentWorkspaceId = params.get("currentWorkspaceId");
  const currentBusinessUnitId = params.get("currentBusinessUnitId");
  const currentOSSubscriptionId = params.get("currentOSSubscriptionId");
  const currentBranchId = params.get("currentBranchId");
  const currentOSId = params.get("currentOSId");

  if (!currentUserId || !currentWorkspaceId || !currentBusinessUnitId || !currentOSSubscriptionId || currentOSId !== "commerce") {
    return;
  }

  const created = nowISO();
  const workspaceName = params.get("workspaceName") || "Workspace";
  const workspaceCountry = params.get("workspaceCountry") || "Egypt";
  const workspaceCurrency = params.get("workspaceCurrency") || "EGP";
  const workspaceTimezone = params.get("workspaceTimezone") || "Africa/Cairo";
  const userName = params.get("userName") || "Workspace Owner";
  const userEmail = params.get("userEmail") || "owner@nexoraxs.local";
  const branchName = params.get("branchName") || "Main Branch";
  const businessUnitName = params.get("businessUnitName") || "Commerce Business";
  const preset = params.get("businessPreset") || "retail";
  const plan = params.get("plan") || "starter";
  const planId = params.get("planId") || "commerce_starter";

  const users = readCollection<User>(STORAGE_KEYS.users);
  if (!users.some((u) => u.id === currentUserId)) {
    writeCollection(STORAGE_KEYS.users, [...users, {
      id: currentUserId, fullName: userName, name: userName, email: userEmail,
      passwordHash: "", role: "owner", createdAt: created, updatedAt: created,
    }]);
  }

  const workspaces = readCollection<Workspace>(STORAGE_KEYS.workspaces);
  if (!workspaces.some((w) => w.id === currentWorkspaceId)) {
    writeCollection(STORAGE_KEYS.workspaces, [...workspaces, {
      id: currentWorkspaceId, name: workspaceName, country: workspaceCountry,
      currency: workspaceCurrency, timezone: workspaceTimezone,
      language: "en", ownerUserId: currentUserId, createdAt: created,
    }]);
  }

  const subscriptions = readCollection<OSSubscription>(STORAGE_KEYS.osSubscriptions);
  if (!subscriptions.some((s) => s.id === currentOSSubscriptionId)) {
    writeCollection(STORAGE_KEYS.osSubscriptions, [...subscriptions, {
      id: currentOSSubscriptionId, workspaceId: currentWorkspaceId,
      os: "commerce", osId: "commerce", plan, planId,
      status: "trialing" as const, startedAt: created,
      trialEndsAt: params.get("trialEndsAt") || undefined,
      renewsAt: params.get("renewsAt") || undefined,
    }]);
  }

  const usageRows = readCollection<WorkspaceStorageUsage>(STORAGE_KEYS.workspaceStorageUsage);
  if (!usageRows.some((u) => u.workspaceId === currentWorkspaceId)) {
    const planMeta = PLAN_CATALOG.find((p) => p.id === planId);
    const limitBytes = planMeta?.limits.storageLimitBytes ?? 500 * 1024 * 1024;
    writeCollection(STORAGE_KEYS.workspaceStorageUsage, [...usageRows, {
      workspaceId: currentWorkspaceId, usedBytes: 0, limitBytes, updatedAt: created,
    }]);
  }

  const branches = readCollection<Branch>(STORAGE_KEYS.branches);
  if (currentBranchId && !branches.some((b) => b.id === currentBranchId)) {
    writeCollection(STORAGE_KEYS.branches, [...branches, {
      id: currentBranchId, workspaceId: currentWorkspaceId,
      businessUnitId: currentBusinessUnitId, name: branchName,
      country: workspaceCountry, currency: workspaceCurrency,
      isMain: true, createdAt: created,
    }]);
  }

  const businessUnits = readCollection<BusinessUnit>(STORAGE_KEYS.businessUnits);
  if (!businessUnits.some((b) => b.id === currentBusinessUnitId)) {
    writeCollection(STORAGE_KEYS.businessUnits, [...businessUnits, {
      id: currentBusinessUnitId, workspaceId: currentWorkspaceId,
      osSubscriptionId: currentOSSubscriptionId, os: "commerce", osId: "commerce",
      selectedOS: "commerce", branchIds: currentBranchId ? [currentBranchId] : [],
      branchId: currentBranchId || "", name: businessUnitName,
      preset, presetId: preset, createdAt: created,
    }]);
  }

  writeSession(STORAGE_KEYS.currentUserId, currentUserId);
  writeSession(STORAGE_KEYS.currentWorkspaceId, currentWorkspaceId);
  writeSession(STORAGE_KEYS.currentOSId, "commerce");
  writeSession(STORAGE_KEYS.currentOSSubscriptionId, currentOSSubscriptionId);
  writeSession(STORAGE_KEYS.currentBusinessUnitId, currentBusinessUnitId);
  if (currentBranchId) writeSession(STORAGE_KEYS.currentBranchId, currentBranchId);
  writeSession(STORAGE_KEYS.onboardingState, { phase: null, step: 0, completedOS: ["commerce"] });
}

function loadState(): RuntimeState {
  if (typeof window === "undefined") return emptyRuntimeState();

  const demoFlag = readSession<string | null>(STORAGE_KEYS.demo, null);
  if (demoFlag === "1" || demoFlag === "true") {
    const seeded = seedDB();
    persistAll(seeded);
    sessionStorage.removeItem(STORAGE_KEYS.demo);
  }

  applyCommerceHandoffFromUrl();

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
    teamMembers: readCollection<WorkspaceMember>(STORAGE_KEYS.teamMembers),
    commerceSetups: readCollection<CommerceSetup>(STORAGE_KEYS.commerceSetups),
    products: readCollection<CommerceProduct>(STORAGE_KEYS.products),
    orders: readCollection<CommerceOrder>(STORAGE_KEYS.orders),
    customers: readCollection<CommerceCustomer>(STORAGE_KEYS.customers),
    invoices: readCollection<CommerceInvoice>(STORAGE_KEYS.invoices),
    branchInventory: readCollection<BranchInventory>(STORAGE_KEYS.branchInventory),
    stockMovements: readCollection<StockMovement>(STORAGE_KEYS.stockMovements),
    stockTransfers: readCollection<StockTransfer>(STORAGE_KEYS.stockTransfers),
    commerceReturns: readCollection<CommerceReturn>(STORAGE_KEYS.commerceReturns),
    mediaAssets: readCollection<MediaAsset>(STORAGE_KEYS.mediaAssets),
    workspaceStorageUsage: readCollection<WorkspaceStorageUsage>(STORAGE_KEYS.workspaceStorageUsage),
  };
}

function persistAll(data: ReturnType<typeof seedDB>): void {
  writeCollection(STORAGE_KEYS.users, data.users);
  writeCollection(STORAGE_KEYS.workspaces, data.workspaces);
  writeCollection(STORAGE_KEYS.branches, data.branches);
  writeCollection(STORAGE_KEYS.osSubscriptions, data.subscriptions);
  writeCollection(STORAGE_KEYS.businessUnits, data.businessUnits);
  writeCollection(STORAGE_KEYS.teamMembers, data.teamMembers);
  writeCollection(STORAGE_KEYS.commerceSetups, data.commerceSetups);
  writeCollection(STORAGE_KEYS.products, data.commerceProducts);
  writeCollection(STORAGE_KEYS.orders, data.commerceOrders);
  writeCollection(STORAGE_KEYS.customers, data.commerceCustomers);
  writeCollection(STORAGE_KEYS.invoices, data.commerceInvoices);
  writeCollection(STORAGE_KEYS.mediaAssets, data.mediaAssets);
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

// attachMedia()-produced thumbnails are quota-checked data URLs capped at ~60KB binary
// (~90KB once base64-encoded); blob: URLs are ephemeral object URLs that never survive
// a reload, so those — and any oversized data URL — must still be stripped before persisting.
const MAX_PERSISTABLE_IMAGE_CHARS = 90 * 1024;

function isPersistableProductImage(image: string | null | undefined): image is string {
  if (!image) return false;
  if (image.startsWith("blob:")) return false;
  if (image.startsWith("data:")) return image.length <= MAX_PERSISTABLE_IMAGE_CHARS;
  return true;
}

function sanitizeProductForStorage(product: CommerceProduct): CommerceProduct {
  const sanitized: CommerceProduct = { ...product };
  if (!isPersistableProductImage(sanitized.image)) {
    delete sanitized.image;
  }
  return sanitized;
}

function sanitizeProductPatch(data: Partial<CommerceProduct>): Partial<CommerceProduct> {
  if (!("image" in data)) return data;
  return {
    ...data,
    image: isPersistableProductImage(data.image) ? data.image : null,
  };
}

// ---- AppProvider ----
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<RuntimeState>(emptyRuntimeState);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    // Hydrate browser-only mock storage after the SSR/client initial render matches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(loadState());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = state.lang;
  }, [isHydrated, state.lang]);

  useEffect(() => {
    if (!isHydrated) return;
    document.documentElement.setAttribute("data-theme", state.theme);
    localStorage.setItem(STORAGE_KEYS.theme, state.theme);
  }, [isHydrated, state.theme]);

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
  }, [isHydrated, state.currentUserId, state.currentWorkspaceId, state.currentOSId,
    state.currentOSSubscriptionId, state.currentBusinessUnitId, state.currentBranchId,
    state.onboardingState, state.lang]);

  // ---- derived entities ----
  const currentUser = useMemo(() => state.users.find((u) => u.id === state.currentUserId) ?? null, [state.users, state.currentUserId]);
  const currentWorkspace = useMemo(() => state.workspaces.find((w) => w.id === state.currentWorkspaceId) ?? null, [state.workspaces, state.currentWorkspaceId]);
  const currentBU = useMemo(() => state.businessUnits.find((b) => b.id === state.currentBusinessUnitId) ?? null, [state.businessUnits, state.currentBusinessUnitId]);
  const currentBranch = useMemo(() => state.branches.find((b) => b.id === state.currentBranchId) ?? null, [state.branches, state.currentBranchId]);
  const currentOSSubscription = useMemo(() => state.subscriptions.find((s) => s.id === state.currentOSSubscriptionId) ?? null, [state.subscriptions, state.currentOSSubscriptionId]);

  const BUSINESS_UNITS = useMemo(() => state.businessUnits.filter((b) => b.workspaceId === state.currentWorkspaceId), [state.businessUnits, state.currentWorkspaceId]);
  const BRANCHES = useMemo(() => state.branches.filter((b) => b.workspaceId === state.currentWorkspaceId && b.businessUnitId === state.currentBusinessUnitId), [state.branches, state.currentWorkspaceId, state.currentBusinessUnitId]);

  const isAuthenticated = !!state.currentUserId && !!currentUser;
  const isOnboardingComplete = state.onboardingState.completedOS.includes("commerce") && !!currentWorkspace;
  const isCommerceOSActive = !!currentOSSubscription && currentOSSubscription.osId === "commerce";
  const hasCommerceSetupContext = !!state.currentWorkspaceId
    && !!state.currentBusinessUnitId
    && state.currentOSId === "commerce"
    && !!state.currentOSSubscriptionId;
  const currentCommerceSetup = useMemo(
    () => state.commerceSetups.find((cs) => cs.businessUnitId === state.currentBusinessUnitId) ?? null,
    [state.commerceSetups, state.currentBusinessUnitId]
  );
  const isCommerceSetupComplete = !!currentCommerceSetup;

  const currentUserDisplayName = getUserDisplayName(currentUser);
  const commerceIdentity = useMemo((): CommerceIdentity => {
    const fallbackName = currentBU?.name || currentWorkspace?.name || "Commerce Business";
    const name = currentCommerceSetup?.displayName?.trim()
      || currentCommerceSetup?.legalName?.trim()
      || fallbackName;
    const subtitle = currentBranch?.name ? `${currentBranch.name} · Commerce OS` : "Commerce OS";

    return {
      name,
      logo: currentCommerceSetup?.logo || null,
      subtitle,
    };
  }, [currentCommerceSetup, currentBU, currentWorkspace, currentBranch]);

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

  const products = useMemo(() => state.products
    .filter((p) => p.businessUnitId === state.currentBusinessUnitId)
    .map((p) => {
      if (!state.currentBranchId) return p;
      const eff = effectiveStockFor(p, state.currentBranchId, state.branchInventory);
      return { ...p, stock: eff.qty, lowStockThreshold: eff.lowStockThreshold };
    }), [state.products, state.currentBusinessUnitId, state.currentBranchId, state.branchInventory]);
  const allOrders = useMemo(() => state.orders.filter((o) => o.businessUnitId === state.currentBusinessUnitId), [state.orders, state.currentBusinessUnitId]);
  const allInvoices = useMemo(() => state.invoices.filter((i) => i.businessUnitId === state.currentBusinessUnitId), [state.invoices, state.currentBusinessUnitId]);
  const allCommerceReturns = useMemo(() => state.commerceReturns.filter((r) => r.businessUnitId === state.currentBusinessUnitId), [state.commerceReturns, state.currentBusinessUnitId]);
  const orders = useMemo(() => allOrders.filter((o) => o.branchId === state.currentBranchId), [allOrders, state.currentBranchId]);
  const invoices = useMemo(() => allInvoices.filter((i) => i.branchId === state.currentBranchId), [allInvoices, state.currentBranchId]);
  const commerceReturns = useMemo(() => allCommerceReturns.filter((r) => r.branchId === state.currentBranchId), [allCommerceReturns, state.currentBranchId]);
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

  // ---- media ----
  const attachMedia = useCallback(async (input: { file: File; ownerType: MediaOwnerType; ownerId?: string | null; fileName: string }) => {
    const compressed = await compressImageToThumbnail(input.file);
    if (!compressed) {
      showToast(memoT("image_too_large"), "error");
      return null;
    }
    if (!canAttachMedia(workspaceStorageUsage, compressed.sizeBytes)) {
      showToast(memoT("storage_limit_reached"), "error");
      return null;
    }
    const asset = buildMediaAsset({
      workspaceId: state.currentWorkspaceId ?? "",
      businessUnitId: state.currentBusinessUnitId,
      branchId: state.currentBranchId,
      ownerType: input.ownerType,
      ownerId: input.ownerId ?? null,
      fileName: input.fileName,
      compressed,
    });
    const newAssets = [...state.mediaAssets, asset];
    writeCollection(STORAGE_KEYS.mediaAssets, newAssets);

    const newUsage = workspaceStorageUsage
      ? state.workspaceStorageUsage.map((u) => (u.workspaceId === workspaceStorageUsage.workspaceId ? applyUsageDelta(u, asset.sizeBytes) : u))
      : state.workspaceStorageUsage;
    writeCollection(STORAGE_KEYS.workspaceStorageUsage, newUsage);

    setState((prev) => ({ ...prev, mediaAssets: newAssets, workspaceStorageUsage: newUsage }));

    return { asset, reference: { mediaAssetId: asset.id, thumbnailUrl: asset.thumbnailUrl ?? asset.url } };
  }, [state.mediaAssets, state.workspaceStorageUsage, state.currentWorkspaceId, state.currentBusinessUnitId, state.currentBranchId, workspaceStorageUsage, showToast, memoT]);

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
    clearAllStorage();
    setState(emptyRuntimeState());
  }, []);

  // ---- workspace ----
  const createWorkspace = useCallback((data: { name: string; country: string; currency: string; timezone: string }): Workspace => {
    const ws: Workspace = { id: uid("ws"), name: data.name, country: data.country, currency: data.currency, timezone: data.timezone, language: state.lang, ownerUserId: state.currentUserId!, createdAt: nowISO() };
    const newWS = [...state.workspaces, ws];
    writeCollection(STORAGE_KEYS.workspaces, newWS);
    setState((prev) => ({ ...prev, workspaces: newWS, currentWorkspaceId: ws.id }));
    return ws;
  }, [state.workspaces, state.currentUserId, state.lang]);

  // ---- onboarding ----
  const setLocale = useCallback((locale: Lang) => {
    setState((prev) => ({ ...prev, lang: locale }));
  }, []);

  const createBranch = useCallback((data: { name: string; country?: string; currency?: string; isMain: boolean }): Branch => {
    const branch: Branch = {
      id: uid("br"), workspaceId: state.currentWorkspaceId!, businessUnitId: "",
      name: data.name, country: data.country || currentWorkspace?.country, currency: data.currency || currentWorkspace?.currency,
      isMain: data.isMain, createdAt: nowISO(),
    };
    const newBranches = [...state.branches, branch];
    writeCollection(STORAGE_KEYS.branches, newBranches);
    setState((prev) => ({ ...prev, branches: newBranches, currentBranchId: branch.id }));
    return branch;
  }, [state.branches, state.currentWorkspaceId, currentWorkspace]);

  const addBranch = useCallback((data: { name: string; city?: string }): Branch => {
    const branch: Branch = {
      id: uid("br"), workspaceId: state.currentWorkspaceId!, businessUnitId: state.currentBusinessUnitId!,
      name: data.name, city: data.city || undefined,
      country: currentWorkspace?.country, currency: currentWorkspace?.currency,
      isMain: false, createdAt: nowISO(),
    };
    const newBranches = [...state.branches, branch];
    writeCollection(STORAGE_KEYS.branches, newBranches);
    setState((prev) => ({ ...prev, branches: newBranches, currentBranchId: branch.id }));
    return branch;
  }, [state.branches, state.currentWorkspaceId, state.currentBusinessUnitId, currentWorkspace]);

  const selectOS = useCallback((osId: string) => {
    setState((prev) => ({ ...prev, currentOSId: osId }));
  }, []);

  const selectPlan = useCallback((planKey: "starter" | "pro" | "business") => {
    const planId = planIdFor(state.currentOSId || "commerce", planKey);
    const sub: OSSubscription = {
      id: uid("sub"), workspaceId: state.currentWorkspaceId!, os: state.currentOSId || "commerce",
      osId: state.currentOSId || "commerce", plan: planKey, planId,
      status: "trialing", startedAt: nowISO(),
      trialEndsAt: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
      renewsAt: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    };
    const newSubs = [...state.subscriptions, sub];
    writeCollection(STORAGE_KEYS.osSubscriptions, newSubs);
    setState((prev) => ({ ...prev, subscriptions: newSubs, currentOSSubscriptionId: sub.id }));
  }, [state.subscriptions, state.currentWorkspaceId, state.currentOSId]);

  const createBusinessUnit = useCallback((data: { name: string; preset: string; osId: string }): BusinessUnit => {
    const bu: BusinessUnit = {
      id: uid("bu"), workspaceId: state.currentWorkspaceId!, osSubscriptionId: state.currentOSSubscriptionId!,
      os: data.osId, osId: data.osId, selectedOS: data.osId,
      branchIds: state.currentBranchId ? [state.currentBranchId] : [],
      branchId: state.currentBranchId || "",
      name: data.name, preset: data.preset, presetId: data.preset, createdAt: nowISO(),
    };
    const updatedBranches = state.branches.map((b) => b.id === state.currentBranchId ? { ...b, businessUnitId: bu.id } : b);
    const newBUs = [...state.businessUnits, bu];
    writeCollection(STORAGE_KEYS.businessUnits, newBUs);
    writeCollection(STORAGE_KEYS.branches, updatedBranches);
    setState((prev) => ({ ...prev, businessUnits: newBUs, branches: updatedBranches, currentBusinessUnitId: bu.id }));
    return bu;
  }, [state.businessUnits, state.branches, state.currentWorkspaceId, state.currentOSSubscriptionId, state.currentBranchId]);

  const completeOnboarding = useCallback(() => {
    const newState: OnboardingState = {
      ...state.onboardingState,
      phase: null,
      step: 0,
      completedOS: [...new Set([...state.onboardingState.completedOS, state.currentOSId || "commerce"])],
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
  const addProduct = useCallback(async (data: Omit<CommerceProduct, "id" | "businessUnitId" | "workspaceId" | "branchId" | "osSubscriptionId" | "createdAt" | "updatedAt"> & { imageFile?: File | null }): Promise<CommerceProduct> => {
    const { imageFile, ...rest } = data;
    const id = uid("p");
    let image = rest.image ?? null;
    if (imageFile) {
      const result = await attachMedia({ file: imageFile, ownerType: "product_image", ownerId: id, fileName: imageFile.name });
      image = result ? result.reference.thumbnailUrl : null;
    }
    const product = sanitizeProductForStorage({
      id, workspaceId: state.currentWorkspaceId!, businessUnitId: state.currentBusinessUnitId!,
      branchId: state.currentBranchId!, osSubscriptionId: state.currentOSSubscriptionId!,
      createdAt: nowISO(), updatedAt: nowISO(), ...rest, image,
    });
    const newProducts = [...state.products, product].map(sanitizeProductForStorage);
    try {
      writeCollection(STORAGE_KEYS.products, newProducts);
      setState((prev) => ({ ...prev, products: newProducts }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not save product.";
      showToast(message, "error");
      throw error;
    }
    return product;
  }, [state.products, state.currentWorkspaceId, state.currentBusinessUnitId, state.currentBranchId, state.currentOSSubscriptionId, showToast, attachMedia]);

  const updateProduct = useCallback(async (id: string, data: Partial<CommerceProduct> & { imageFile?: File | null }) => {
    const { imageFile, ...rest } = data;
    let patch = sanitizeProductPatch(rest);
    if (imageFile) {
      const result = await attachMedia({ file: imageFile, ownerType: "product_image", ownerId: id, fileName: imageFile.name });
      patch = { ...patch, image: result ? result.reference.thumbnailUrl : null };
    }
    const newProducts = state.products
      .map((p) => p.id === id ? sanitizeProductForStorage({ ...p, ...patch, updatedAt: nowISO() }) : sanitizeProductForStorage(p));
    try {
      writeCollection(STORAGE_KEYS.products, newProducts);
      setState((prev) => ({ ...prev, products: newProducts }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not save product.";
      showToast(message, "error");
      throw error;
    }
  }, [state.products, showToast, attachMedia]);

  const deleteProduct = useCallback((id: string) => {
    const newProducts = state.products.filter((p) => p.id !== id).map(sanitizeProductForStorage);
    writeCollection(STORAGE_KEYS.products, newProducts);
    setState((prev) => ({ ...prev, products: newProducts }));
  }, [state.products]);

  // ---- branch inventory ----
  const adjustStock = useCallback((data: {
    productId: string; branchId?: string; qty: number; lowStockThreshold?: number;
  }): { ok: true } | { ok: false; error: string } => {
    const branchId = data.branchId ?? state.currentBranchId;
    if (!branchId || !state.currentWorkspaceId || !state.currentBusinessUnitId) {
      return { ok: false, error: "no_active_branch" };
    }
    const product = state.products.find((p) => p.id === data.productId);
    if (!product) return { ok: false, error: "product_not_found" };

    const current = effectiveStockFor(product, branchId, state.branchInventory);
    const qtyChange = data.qty - current.qty;
    const lowStockThreshold = data.lowStockThreshold ?? current.lowStockThreshold;
    const existing = state.branchInventory.find((bi) => bi.productId === product.id && bi.branchId === branchId);

    let recordId: string;
    let newBranchInventory: BranchInventory[];
    if (existing) {
      recordId = existing.id;
      newBranchInventory = state.branchInventory.map((bi) =>
        bi.id === existing.id ? { ...bi, qty: data.qty, lowStockThreshold, updatedAt: nowISO() } : bi
      );
    } else {
      recordId = uid("bi");
      newBranchInventory = [...state.branchInventory, {
        id: recordId, workspaceId: state.currentWorkspaceId, businessUnitId: state.currentBusinessUnitId,
        branchId, productId: product.id, qty: data.qty, lowStockThreshold, updatedAt: nowISO(),
      }];
    }
    writeCollection(STORAGE_KEYS.branchInventory, newBranchInventory);

    let newStockMovements = state.stockMovements;
    if (qtyChange !== 0) {
      const movement = buildStockMovement({
        workspaceId: state.currentWorkspaceId, businessUnitId: state.currentBusinessUnitId,
        branchId, productId: product.id, qtyChange, reason: "adjustment",
        reference: { type: "adjustment", id: recordId },
        performedBy: currentUser?.id ?? "", performedByName: getUserDisplayName(currentUser) || "Unknown",
      });
      newStockMovements = [...state.stockMovements, movement];
      writeCollection(STORAGE_KEYS.stockMovements, newStockMovements);
    }

    setState((prev) => ({ ...prev, branchInventory: newBranchInventory, stockMovements: newStockMovements }));
    return { ok: true };
  }, [state.products, state.branchInventory, state.stockMovements, state.currentBranchId, state.currentWorkspaceId, state.currentBusinessUnitId, currentUser]);

  // ---- stock transfers ----
  const transferStock = useCallback((data: {
    toBranchId: string; items: { productId: string; qty: number }[]; note?: string;
  }): { ok: true; transfer: StockTransfer } | { ok: false; error: string } => {
    const fromBranchId = state.currentBranchId;
    if (!fromBranchId || !state.currentWorkspaceId || !state.currentBusinessUnitId) {
      return { ok: false, error: "transfer_rejected" };
    }
    if (data.toBranchId === fromBranchId) {
      return { ok: false, error: "transfer_rejected" };
    }
    const toBranch = state.branches.find((b) => b.id === data.toBranchId);
    if (!toBranch || toBranch.businessUnitId !== state.currentBusinessUnitId) {
      return { ok: false, error: "transfer_rejected" };
    }
    if (!data.items || data.items.length === 0) {
      return { ok: false, error: "transfer_rejected" };
    }

    const resolvedItems: { product: CommerceProduct; qty: number }[] = [];
    for (const item of data.items) {
      const product = state.products.find((p) => p.id === item.productId);
      if (!product) return { ok: false, error: "transfer_rejected" };
      if (!Number.isInteger(item.qty) || item.qty <= 0) return { ok: false, error: "insufficient_stock" };
      const eff = effectiveStockFor(product, fromBranchId, state.branchInventory);
      if (eff.qty < item.qty) return { ok: false, error: "insufficient_stock" };
      resolvedItems.push({ product, qty: item.qty });
    }

    const existingTransfers = state.stockTransfers.filter((tr) => tr.businessUnitId === state.currentBusinessUnitId);
    const transferNumber = `TRF-${String(existingTransfers.length + 1).padStart(4, "0")}`;
    const transfer = buildStockTransfer({
      transferNumber,
      workspaceId: state.currentWorkspaceId,
      businessUnitId: state.currentBusinessUnitId,
      fromBranchId,
      toBranchId: data.toBranchId,
      items: resolvedItems.map(({ product, qty }) => ({ productId: product.id, name: product.name, qty })),
      performedBy: currentUser?.id ?? "",
      performedByName: getUserDisplayName(currentUser) || "Unknown",
      note: data.note,
    });

    let nextBranchInventory = state.branchInventory;
    const newMovements: StockMovement[] = [];
    for (const { product, qty } of resolvedItems) {
      const sourceEff = effectiveStockFor(product, fromBranchId, nextBranchInventory);
      const sourceExisting = nextBranchInventory.find((bi) => bi.productId === product.id && bi.branchId === fromBranchId);
      const sourceNewQty = sourceEff.qty - qty;
      if (sourceExisting) {
        nextBranchInventory = nextBranchInventory.map((bi) =>
          bi.id === sourceExisting.id ? { ...bi, qty: sourceNewQty, updatedAt: nowISO() } : bi
        );
      } else {
        nextBranchInventory = [...nextBranchInventory, {
          id: uid("bi"), workspaceId: state.currentWorkspaceId, businessUnitId: state.currentBusinessUnitId,
          branchId: fromBranchId, productId: product.id, qty: sourceNewQty, lowStockThreshold: sourceEff.lowStockThreshold, updatedAt: nowISO(),
        }];
      }

      const destEff = effectiveStockFor(product, data.toBranchId, nextBranchInventory);
      const destExisting = nextBranchInventory.find((bi) => bi.productId === product.id && bi.branchId === data.toBranchId);
      const destNewQty = destEff.qty + qty;
      if (destExisting) {
        nextBranchInventory = nextBranchInventory.map((bi) =>
          bi.id === destExisting.id ? { ...bi, qty: destNewQty, updatedAt: nowISO() } : bi
        );
      } else {
        nextBranchInventory = [...nextBranchInventory, {
          id: uid("bi"), workspaceId: state.currentWorkspaceId, businessUnitId: state.currentBusinessUnitId,
          branchId: data.toBranchId, productId: product.id, qty: destNewQty, lowStockThreshold: destEff.lowStockThreshold, updatedAt: nowISO(),
        }];
      }

      newMovements.push(buildStockMovement({
        workspaceId: state.currentWorkspaceId, businessUnitId: state.currentBusinessUnitId,
        branchId: fromBranchId, productId: product.id, qtyChange: -qty, reason: "transfer_out",
        reference: { type: "transfer", id: transfer.id },
        performedBy: currentUser?.id ?? "", performedByName: getUserDisplayName(currentUser) || "Unknown",
      }));
      newMovements.push(buildStockMovement({
        workspaceId: state.currentWorkspaceId, businessUnitId: state.currentBusinessUnitId,
        branchId: data.toBranchId, productId: product.id, qtyChange: qty, reason: "transfer_in",
        reference: { type: "transfer", id: transfer.id },
        performedBy: currentUser?.id ?? "", performedByName: getUserDisplayName(currentUser) || "Unknown",
      }));
    }

    writeCollection(STORAGE_KEYS.branchInventory, nextBranchInventory);
    const newStockMovements = [...state.stockMovements, ...newMovements];
    writeCollection(STORAGE_KEYS.stockMovements, newStockMovements);
    const newStockTransfers = [...state.stockTransfers, transfer];
    writeCollection(STORAGE_KEYS.stockTransfers, newStockTransfers);

    setState((prev) => ({
      ...prev,
      branchInventory: nextBranchInventory,
      stockMovements: newStockMovements,
      stockTransfers: newStockTransfers,
    }));
    return { ok: true, transfer };
  }, [state.currentBranchId, state.currentWorkspaceId, state.currentBusinessUnitId, state.branches, state.products, state.branchInventory, state.stockMovements, state.stockTransfers, currentUser]);

  // ---- returns ----
  const createReturn = useCallback((data: {
    orderId: string; items: { productId: string; qty: number }[]; reason: string;
    refundMethod: RefundMethod; restock: boolean;
  }): { ok: true; return: CommerceReturn } | { ok: false; error: string } => {
    const order = state.orders.find((o) => o.id === data.orderId);
    if (!order || order.workspaceId !== state.currentWorkspaceId || order.businessUnitId !== state.currentBusinessUnitId) {
      return { ok: false, error: "return_rejected" };
    }
    if (!data.items || data.items.length === 0) {
      return { ok: false, error: "return_rejected" };
    }

    const existingReturns = state.commerceReturns.filter((r) => r.orderId === order.id);
    const returnedQtyByProduct: Record<string, number> = {};
    existingReturns.forEach((r) => {
      r.items.forEach((it) => {
        returnedQtyByProduct[it.productId] = (returnedQtyByProduct[it.productId] || 0) + it.qty;
      });
    });

    for (const item of data.items) {
      if (!Number.isInteger(item.qty) || item.qty <= 0) return { ok: false, error: "return_rejected" };
      const orderItem = order.items.find((oi) => oi.productId === item.productId || oi.id === item.productId);
      if (!orderItem) return { ok: false, error: "return_rejected" };
      const remaining = orderItem.qty - (returnedQtyByProduct[item.productId] || 0);
      if (item.qty > remaining) return { ok: false, error: "return_rejected" };
    }

    const totals = computeReturnTotals(order, data.items);
    const returnItems: CommerceReturnItem[] = totals.lines.map((line) => {
      const orderItem = order.items.find((oi) => oi.productId === line.productId || oi.id === line.productId);
      return {
        productId: line.productId, name: line.name, sku: orderItem?.sku,
        qty: line.qty, price: line.price, taxable: orderItem?.taxable !== false,
      };
    });

    const invoice = state.invoices.find((i) => i.orderId === order.id) ?? null;
    const buReturns = state.commerceReturns.filter((r) => r.businessUnitId === state.currentBusinessUnitId);
    const returnNumber = `RET-${String(buReturns.length + 1).padStart(4, "0")}`;
    const newReturn = buildCommerceReturn({
      returnNumber, workspaceId: order.workspaceId, businessUnitId: order.businessUnitId,
      branchId: order.branchId, orderId: order.id, invoiceId: invoice?.id ?? null,
      items: returnItems, reason: data.reason, refundMethod: data.refundMethod, restock: data.restock,
      totals: { subtotal: totals.subtotal, vat: totals.vat, total: totals.total },
      cashierId: currentUser?.id ?? "", cashierName: getUserDisplayName(currentUser) || "Cashier",
    });

    let nextBranchInventory = state.branchInventory;
    const newMovements: StockMovement[] = [];
    if (data.restock) {
      for (const item of data.items) {
        const product = state.products.find((p) => p.id === item.productId);
        if (!product) continue;
        const eff = effectiveStockFor(product, order.branchId, nextBranchInventory);
        const existing = nextBranchInventory.find((bi) => bi.productId === product.id && bi.branchId === order.branchId);
        const newQty = eff.qty + item.qty;
        if (existing) {
          nextBranchInventory = nextBranchInventory.map((bi) =>
            bi.id === existing.id ? { ...bi, qty: newQty, updatedAt: nowISO() } : bi
          );
        } else {
          nextBranchInventory = [...nextBranchInventory, {
            id: uid("bi"), workspaceId: order.workspaceId, businessUnitId: order.businessUnitId,
            branchId: order.branchId, productId: product.id, qty: newQty, lowStockThreshold: eff.lowStockThreshold, updatedAt: nowISO(),
          }];
        }
        newMovements.push(buildStockMovement({
          workspaceId: order.workspaceId, businessUnitId: order.businessUnitId, branchId: order.branchId,
          productId: product.id, qtyChange: item.qty, reason: "return",
          reference: { type: "return", id: newReturn.id },
          performedBy: currentUser?.id ?? "", performedByName: getUserDisplayName(currentUser) || "Cashier",
        }));
      }
    }

    let fullyReturned = true;
    for (const oi of order.items) {
      const key = oi.productId || oi.id || "";
      const returnedAfter = (returnedQtyByProduct[key] || 0) + (data.items.find((i) => i.productId === key)?.qty || 0);
      if (returnedAfter < oi.qty) { fullyReturned = false; break; }
    }

    const newOrders = state.orders.map((o) => o.id === order.id ? {
      ...o,
      returnStatus: (fullyReturned ? "returned" : "partial") as "returned" | "partial",
      returnedTotal: (o.returnedTotal || 0) + totals.total,
      returnIds: [...(o.returnIds || []), newReturn.id],
    } : o);
    writeCollection(STORAGE_KEYS.orders, newOrders);

    let newInvoices = state.invoices;
    if (invoice) {
      newInvoices = state.invoices.map((i) => i.id === invoice.id ? { ...i, returnIds: [...(i.returnIds || []), newReturn.id] } : i);
      writeCollection(STORAGE_KEYS.invoices, newInvoices);
    }

    const newReturns = [...state.commerceReturns, newReturn];
    writeCollection(STORAGE_KEYS.commerceReturns, newReturns);

    if (data.restock) {
      writeCollection(STORAGE_KEYS.branchInventory, nextBranchInventory);
      writeCollection(STORAGE_KEYS.stockMovements, [...state.stockMovements, ...newMovements]);
    }

    setState((prev) => ({
      ...prev,
      orders: newOrders,
      invoices: newInvoices,
      commerceReturns: newReturns,
      branchInventory: data.restock ? nextBranchInventory : prev.branchInventory,
      stockMovements: data.restock ? [...prev.stockMovements, ...newMovements] : prev.stockMovements,
    }));
    return { ok: true, return: newReturn };
  }, [state.orders, state.invoices, state.commerceReturns, state.products, state.branchInventory, state.stockMovements, state.currentWorkspaceId, state.currentBusinessUnitId, currentUser]);

  // ---- orders ----
  const createOrder = useCallback((data: {
    items: OrderItem[]; customerId: string | null; payment: "cash" | "card" | "wallet";
    discount: number; vat: number; subtotal: number; total: number; net: number;
  }): CommerceOrder => {
    const branchId = state.currentBranchId!;
    const stockItems: { item: OrderItem; product: CommerceProduct }[] = [];
    const requestedByProduct: Record<string, number> = {};
    for (const item of data.items) {
      if (!item.productId) continue;
      const product = state.products.find((p) => p.id === item.productId);
      if (!product) continue;
      const existing = state.branchInventory.find((bi) => bi.productId === product.id && bi.branchId === branchId);
      const isTracked = product.stock !== null || !!existing;
      if (!isTracked) continue;
      const eff = effectiveStockFor(product, branchId, state.branchInventory);
      const requestedQty = (requestedByProduct[product.id] ?? 0) + item.qty;
      requestedByProduct[product.id] = requestedQty;
      if (requestedQty > eff.qty) {
        throw new Error("insufficient_stock");
      }
      stockItems.push({ item, product });
    }

    const existingOrders = readCollection<CommerceOrder>(STORAGE_KEYS.orders);
    const buOrders = existingOrders.filter((o) => o.businessUnitId === state.currentBusinessUnitId);
    const orderNum = `ORD-${String(buOrders.length + 1).padStart(4, "0")}`;
    const order: CommerceOrder = {
      id: uid("ord"), orderNumber: orderNum, workspaceId: state.currentWorkspaceId!,
      businessUnitId: state.currentBusinessUnitId!, branchId,
      cashierId: currentUser?.id ?? "", cashierName: getUserDisplayName(currentUser) || "Cashier",
      createdAt: nowISO(), ...data,
    };
    const newOrders = [...existingOrders, order];
    writeCollection(STORAGE_KEYS.orders, newOrders);

    // deduct branch inventory and record a "sale" stock movement per item
    let nextBranchInventory = state.branchInventory;
    const newMovements: StockMovement[] = [];
    for (const { item, product } of stockItems) {
      const eff = effectiveStockFor(product, order.branchId, nextBranchInventory);
      const existing = nextBranchInventory.find((bi) => bi.productId === product.id && bi.branchId === order.branchId);
      const newQty = eff.qty - item.qty;
      if (existing) {
        nextBranchInventory = nextBranchInventory.map((bi) =>
          bi.id === existing.id ? { ...bi, qty: newQty, updatedAt: nowISO() } : bi
        );
      } else {
        nextBranchInventory = [...nextBranchInventory, {
          id: uid("bi"), workspaceId: order.workspaceId, businessUnitId: order.businessUnitId,
          branchId: order.branchId, productId: product.id, qty: newQty, lowStockThreshold: eff.lowStockThreshold, updatedAt: nowISO(),
        }];
      }
      newMovements.push(buildStockMovement({
        workspaceId: order.workspaceId, businessUnitId: order.businessUnitId, branchId: order.branchId,
        productId: product.id, qtyChange: -item.qty, reason: "sale",
        reference: { type: "order", id: order.id },
        performedBy: order.cashierId, performedByName: order.cashierName,
      }));
    }

    let newStockMovements = state.stockMovements;
    if (newMovements.length > 0) {
      newStockMovements = [...state.stockMovements, ...newMovements];
      writeCollection(STORAGE_KEYS.branchInventory, nextBranchInventory);
      writeCollection(STORAGE_KEYS.stockMovements, newStockMovements);
    }

    setState((prev) => ({ ...prev, orders: newOrders, branchInventory: nextBranchInventory, stockMovements: newStockMovements }));
    return order;
  }, [state.currentWorkspaceId, state.currentBusinessUnitId, state.currentBranchId, state.products, state.branchInventory, state.stockMovements, currentUser]);

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
    currentUser, currentWorkspace, currentBranch, currentBU, currentOSSubscription, onboardingState: state.onboardingState,
    lang: state.lang, setLang, theme: state.theme, toggleTheme,
    toasts, showToast, dismissToast,
    isAuthenticated, isOnboardingComplete, isCommerceOSActive, isCommerceSetupComplete, hasCommerceSetupContext,
    currentUserDisplayName, commerceIdentity, BUSINESS_UNITS, BRANCHES, COMMERCE_PLAN,
    money: memoMoney, t: memoT,
    createUser, loginUser, logoutUser,
    createWorkspace, setLocale, createBranch, addBranch, selectOS, selectPlan, createBusinessUnit, completeOnboarding,
    saveCommerceSetup, getCommerceSetup,
    products, orders, invoices, allOrders, allInvoices, allCommerceReturns, customers, subscriptions: state.subscriptions,
    branchInventory: state.branchInventory, stockMovements: state.stockMovements,
    stockTransfers: state.stockTransfers, commerceReturns,
    mediaAssets: state.mediaAssets, workspaceStorageUsage, storageUsagePercent: storageUsagePct, storageUsageLabel,
    addProduct, updateProduct, deleteProduct, adjustStock, transferStock, createReturn, createOrder, createInvoice, createCustomer, updateCustomer,
    attachMedia,
    setCurrent,
  };

  return <AppCtx.Provider value={ctx}>{children}</AppCtx.Provider>;
}
