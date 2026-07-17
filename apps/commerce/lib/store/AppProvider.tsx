"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from "react";
import { STORAGE_KEYS, PLAN_CATALOG, planIdFor } from "@nexoraxs/shared";
import {
  uid, nowISO, normalizeEmail, getUserDisplayName,
  readCollection, readSession, writeSession, clearAllStorage,
  readBrowserStorage, writeBrowserStorage, removeBrowserStorage,
  seedDB, storageUsagePercent, formatBytes,
  getCurrentOSEnablement,
  normalizeOSEnablement,
} from "@nexoraxs/shared";
import { t as tFn, type Lang } from "@nexoraxs/shared";
import { money as moneyFn } from "@nexoraxs/shared";
import type {
  User, Workspace, Branch, OSSubscription, BusinessUnit, WorkspaceMember,
  CommerceSetup, CommerceProduct, CommerceOrder, CommerceInvoice, CommerceCustomer, OrderItem,
  OSEnablement, WorkspaceStorageUsage, MediaAsset, MediaOwnerType,
  BranchInventory, StockMovement, StockTransfer, CommerceReturn, RefundMethod,
} from "@nexoraxs/types";
import type {
  CommerceHandoffPort,
  LegacyCommerceHandoffContext,
  LegacyMediaSource,
  LegacyProductRecord,
  LegacyProductScope,
} from "@nexoraxs/contracts";
import { useCommerceServices } from "@/lib/commerce/CommerceServicesProvider";
import { legacyEffectiveStock } from "@/features/inventory/application/legacy-inventory-policy";
import { legacyCommerceDemoSeed } from "@/features/setup/infrastructure/legacy-commerce-demo-seed";

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
  currentOSEnablement: OSEnablement | null;
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
  createBranch: (data: { name: string; city?: string; address?: string; country?: string; currency?: string; isMain: boolean }) => Branch;
  addBranch: (data: { name: string; city?: string; address?: string }) => Branch;
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
  attachMedia: (input: { source: LegacyMediaSource; ownerType: MediaOwnerType; ownerId?: string | null; fileName: string }) => Promise<{ asset: MediaAsset; reference: { mediaAssetId: string; thumbnailUrl: string } } | null>;
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
  osEnablements: OSEnablement[];
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
    subscriptions: [], osEnablements: [], businessUnits: [],
    teamMembers: [], commerceSetups: [],
    products: [], orders: [],
    customers: [], invoices: [],
    branchInventory: [], stockMovements: [], stockTransfers: [], commerceReturns: [],
    mediaAssets: [], workspaceStorageUsage: [],
  };
}

interface AcceptedCommerceHandoffProjection {
  readonly context: LegacyCommerceHandoffContext;
  readonly user: User;
  readonly workspace: Workspace;
  readonly subscription: OSSubscription;
  readonly businessUnit: BusinessUnit;
  readonly branch: Branch | null;
}

function readCommerceHandoffFromUrl(): AcceptedCommerceHandoffProjection | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  if (params.get("nx_handoff") !== "commerce") return null;

  const currentUserId = params.get("currentUserId");
  const currentWorkspaceId = params.get("currentWorkspaceId");
  const currentBusinessUnitId = params.get("currentBusinessUnitId");
  const currentOSSubscriptionId = params.get("currentOSSubscriptionId");
  const currentBranchId = params.get("currentBranchId");
  const currentOSId = params.get("currentOSId");
  if (
    !currentUserId
    || !currentWorkspaceId
    || !currentBusinessUnitId
    || !currentOSSubscriptionId
    || currentOSId !== "commerce"
  ) {
    return null;
  }

  const created = nowISO();
  const workspaceName = params.get("workspaceName") || "Workspace";
  const workspaceCountry = params.get("workspaceCountry") || "Egypt";
  const workspaceCurrency = params.get("workspaceCurrency") || "EGP";
  const workspaceTimezone = params.get("workspaceTimezone") || "Africa/Cairo";
  const userName = params.get("userName") || "Workspace Owner";
  const userEmail = params.get("userEmail") || "";
  const branchName = params.get("branchName") || "Main Branch";
  const branchCity = params.get("branchCity") || "";
  const branchAddress = params.get("branchAddress") || "";
  const businessUnitName = params.get("businessUnitName") || "Commerce Business";
  const preset = params.get("businessPreset") || "retail";
  const industryType = params.get("businessIndustryType") || preset;
  const plan = params.get("plan") || "starter";
  const planId = params.get("planId") || "commerce_starter";
  return {
    context: {
      actorId: currentUserId,
      workspaceId: currentWorkspaceId,
      legacyBusinessUnitId: currentBusinessUnitId,
      branchId: currentBranchId,
      osId: "commerce",
      osSubscriptionId: currentOSSubscriptionId,
      action: params.get("action") || "setup",
    },
    user: {
      id: currentUserId,
      fullName: userName,
      name: userName,
      email: userEmail,
      passwordHash: "",
      role: "owner",
      createdAt: created,
      updatedAt: created,
    },
    workspace: {
      id: currentWorkspaceId,
      name: workspaceName,
      country: workspaceCountry,
      currency: workspaceCurrency,
      timezone: workspaceTimezone,
      language: "en",
      ownerUserId: currentUserId,
      createdAt: created,
    },
    subscription: {
      id: currentOSSubscriptionId,
      workspaceId: currentWorkspaceId,
      os: "commerce",
      osId: "commerce",
      plan,
      planId,
      status: "trialing",
      startedAt: created,
      trialEndsAt: params.get("trialEndsAt") || undefined,
      renewsAt: params.get("renewsAt") || undefined,
    },
    businessUnit: {
      id: currentBusinessUnitId,
      workspaceId: currentWorkspaceId,
      osSubscriptionId: currentOSSubscriptionId,
      os: "commerce",
      osId: "commerce",
      selectedOS: "commerce",
      branchIds: currentBranchId ? [currentBranchId] : [],
      branchId: currentBranchId || "",
      name: businessUnitName,
      industryType,
      preset,
      presetId: preset,
      createdAt: created,
    },
    branch: currentBranchId ? {
      id: currentBranchId,
      workspaceId: currentWorkspaceId,
      businessUnitId: currentBusinessUnitId,
      name: branchName,
      city: branchCity || undefined,
      branchCity: branchCity || undefined,
      address: branchAddress || undefined,
      branchAddressLine1: branchAddress || undefined,
      country: workspaceCountry,
      currency: workspaceCurrency,
      isMain: true,
      createdAt: created,
    } : null,
  };
}

async function acceptCommerceHandoff(
  port: CommerceHandoffPort,
  projection: AcceptedCommerceHandoffProjection | null,
): Promise<AcceptedCommerceHandoffProjection | null> {
  if (!projection) return null;
  await port.accept(projection.context);
  return projection;
}

interface LoadedRuntimeState {
  readonly state: RuntimeState;
  readonly demoRequested: boolean;
}

function loadState(): LoadedRuntimeState {
  if (typeof window === "undefined") return { state: emptyRuntimeState(), demoRequested: false };

  const demoFlag = readSession<string | null>(STORAGE_KEYS.demo, null);
  const demoRequested = demoFlag === "1" || demoFlag === "true";
  if (demoRequested) removeBrowserStorage(STORAGE_KEYS.demo, "session");

  const theme = (readBrowserStorage(STORAGE_KEYS.theme, "local") as "light" | "dark" | null) || "light";
  const lang = (readSession<string | null>(STORAGE_KEYS.locale, null) || "en") as Lang;

  return { state: {
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
    osEnablements: readCollection<OSEnablement>(STORAGE_KEYS.osEnablements).map(normalizeOSEnablement),
    businessUnits: readCollection<BusinessUnit>(STORAGE_KEYS.businessUnits),
    teamMembers: readCollection<WorkspaceMember>(STORAGE_KEYS.teamMembers),
    commerceSetups: readCollection<CommerceSetup>(STORAGE_KEYS.commerceSetups),
    products: [],
    orders: readCollection<CommerceOrder>(STORAGE_KEYS.orders),
    customers: readCollection<CommerceCustomer>(STORAGE_KEYS.customers),
    invoices: readCollection<CommerceInvoice>(STORAGE_KEYS.invoices),
    branchInventory: readCollection<BranchInventory>(STORAGE_KEYS.branchInventory),
    stockMovements: readCollection<StockMovement>(STORAGE_KEYS.stockMovements),
    stockTransfers: readCollection<StockTransfer>(STORAGE_KEYS.stockTransfers),
    commerceReturns: readCollection<CommerceReturn>(STORAGE_KEYS.commerceReturns),
    mediaAssets: readCollection<MediaAsset>(STORAGE_KEYS.mediaAssets),
    workspaceStorageUsage: readCollection<WorkspaceStorageUsage>(STORAGE_KEYS.workspaceStorageUsage),
  }, demoRequested };
}

function persistDemoContext(data: ReturnType<typeof seedDB>): void {
  if (data.currentUserId) writeSession(STORAGE_KEYS.currentUserId, data.currentUserId);
  if (data.currentWorkspaceId) writeSession(STORAGE_KEYS.currentWorkspaceId, data.currentWorkspaceId);
  if (data.currentOSId) writeSession(STORAGE_KEYS.currentOSId, data.currentOSId);
  if (data.currentOSSubscriptionId) writeSession(STORAGE_KEYS.currentOSSubscriptionId, data.currentOSSubscriptionId);
  if (data.currentBusinessUnitId) writeSession(STORAGE_KEYS.currentBusinessUnitId, data.currentBusinessUnitId);
  if (data.currentBranchId) writeSession(STORAGE_KEYS.currentBranchId, data.currentBranchId);
  writeSession(STORAGE_KEYS.onboardingState, data.onboardingState);
  writeSession(STORAGE_KEYS.locale, data.locale);
  writeBrowserStorage(STORAGE_KEYS.theme, data.theme, "local");
}

// ---- AppProvider ----
export function AppProvider({ children }: { children: ReactNode }) {
  const { services } = useCommerceServices();
  const [state, setState] = useState<RuntimeState>(emptyRuntimeState);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    let active = true;
    const hydrate = async () => {
      const handoff = await acceptCommerceHandoff(
        services.commerceHandoff,
        readCommerceHandoffFromUrl(),
      );
      let loaded = loadState();
      if (loaded.demoRequested) {
        const seeded = seedDB();
        const commerceSeed = legacyCommerceDemoSeed();
        services.corePlatformCompatibility.persistDemoState({
          users: seeded.users, workspaces: seeded.workspaces, branches: seeded.branches,
          subscriptions: seeded.subscriptions, businessUnits: seeded.businessUnits,
          enablements: seeded.osEnablements, teamMembers: seeded.teamMembers,
          storageUsage: seeded.workspaceStorageUsage,
        });
        services.demoBootstrap.bootstrap({
          setups: commerceSeed.commerceSetups, orders: commerceSeed.commerceOrders,
          invoices: commerceSeed.commerceInvoices, mediaAssets: commerceSeed.mediaAssets,
        });
        persistDemoContext(seeded);
        await services.productsCompatibility.seedCompatibleProducts(
          commerceSeed.commerceProducts as unknown as readonly LegacyProductRecord[],
        );
        loaded = loadState();
      }
      let products: CommerceProduct[] = [];
      if (loaded.state.currentWorkspaceId && loaded.state.currentBusinessUnitId) {
        const result = await services.productsCompatibility.list({
          workspaceId: loaded.state.currentWorkspaceId,
          legacyBusinessUnitId: loaded.state.currentBusinessUnitId,
          ...(loaded.state.currentBranchId ? { branchId: loaded.state.currentBranchId } : {}),
        });
        products = result.items.map((product) => ({ ...product }));
      }
      const acceptedState = handoff ? {
        ...loaded.state,
        users: loaded.state.users.some((item) => item.id === handoff.user.id)
          ? loaded.state.users : [...loaded.state.users, handoff.user],
        workspaces: loaded.state.workspaces.some((item) => item.id === handoff.workspace.id)
          ? loaded.state.workspaces : [...loaded.state.workspaces, handoff.workspace],
        subscriptions: loaded.state.subscriptions.some((item) => item.id === handoff.subscription.id)
          ? loaded.state.subscriptions : [...loaded.state.subscriptions, handoff.subscription],
        businessUnits: loaded.state.businessUnits.some((item) => item.id === handoff.businessUnit.id)
          ? loaded.state.businessUnits : [...loaded.state.businessUnits, handoff.businessUnit],
        branches: !handoff.branch || loaded.state.branches.some((item) => item.id === handoff.branch?.id)
          ? loaded.state.branches : [...loaded.state.branches, handoff.branch],
      } : loaded.state;
      if (!active) return;
      // Hydrate browser-only mock storage after the SSR/client initial render matches.
      setState({ ...acceptedState, products });
      setIsHydrated(true);
    };
    void hydrate().catch(() => {
      if (active) setIsHydrated(true);
    });
    return () => { active = false; };
  }, [services.commerceHandoff, services.corePlatformCompatibility, services.demoBootstrap, services.productsCompatibility]);

  useEffect(() => services.productsCompatibility.subscribe((scope, records) => {
    setState((previous) => {
      const retained = previous.products.filter((product) => !(
        product.workspaceId === scope.workspaceId
        && product.businessUnitId === scope.legacyBusinessUnitId
      ));
      return { ...previous, products: [...retained, ...records.map((product) => ({ ...product }))] };
    });
  }), [services.productsCompatibility]);

  useEffect(() => services.customersCompatibility.subscribe(({ scope, customers }) => {
    setState((previous) => {
      const retained = previous.customers.filter((customer) => !(
        customer.workspaceId === scope.workspaceId
        && customer.businessUnitId === scope.legacyBusinessUnitId
      ));
      const compatible = customers.map((customer): CommerceCustomer => ({
        id: customer.id, workspaceId: customer.workspaceId, businessUnitId: customer.businessUnitId,
        branchId: customer.branchId, name: customer.name, phone: customer.phone, email: customer.email,
        notes: customer.notes, createdAt: customer.createdAt, updatedAt: customer.updatedAt,
      }));
      return { ...previous, customers: [...retained, ...compatible] };
    });
  }), [services.customersCompatibility]);

  useEffect(() => {
    if (!isHydrated || !state.currentWorkspaceId || !state.currentBusinessUnitId) return;
    const scope: LegacyProductScope = {
      workspaceId: state.currentWorkspaceId,
      legacyBusinessUnitId: state.currentBusinessUnitId,
      ...(state.currentBranchId ? { branchId: state.currentBranchId } : {}),
    };
    void services.productsCompatibility.list(scope).catch(() => undefined);
  }, [
    isHydrated,
    services.productsCompatibility,
    state.currentWorkspaceId,
    state.currentBusinessUnitId,
    state.currentBranchId,
  ]);

  useEffect(() => {
    if (!isHydrated) return;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = state.lang;
  }, [isHydrated, state.lang]);

  useEffect(() => {
    if (!isHydrated) return;
    document.documentElement.setAttribute("data-theme", state.theme);
    writeBrowserStorage(STORAGE_KEYS.theme, state.theme, "local");
  }, [isHydrated, state.theme]);

  useEffect(() => {
    if (!isHydrated) return;
    if (typeof window === "undefined") return;
    if (state.currentUserId) writeSession(STORAGE_KEYS.currentUserId, state.currentUserId);
    else removeBrowserStorage(STORAGE_KEYS.currentUserId, "session");
    if (state.currentWorkspaceId) writeSession(STORAGE_KEYS.currentWorkspaceId, state.currentWorkspaceId);
    else removeBrowserStorage(STORAGE_KEYS.currentWorkspaceId, "session");
    if (state.currentOSId) writeSession(STORAGE_KEYS.currentOSId, state.currentOSId);
    else removeBrowserStorage(STORAGE_KEYS.currentOSId, "session");
    if (state.currentOSSubscriptionId) writeSession(STORAGE_KEYS.currentOSSubscriptionId, state.currentOSSubscriptionId);
    else removeBrowserStorage(STORAGE_KEYS.currentOSSubscriptionId, "session");
    if (state.currentBusinessUnitId) writeSession(STORAGE_KEYS.currentBusinessUnitId, state.currentBusinessUnitId);
    else removeBrowserStorage(STORAGE_KEYS.currentBusinessUnitId, "session");
    if (state.currentBranchId) writeSession(STORAGE_KEYS.currentBranchId, state.currentBranchId);
    else removeBrowserStorage(STORAGE_KEYS.currentBranchId, "session");
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
  const hasCommerceSetupContext = !!state.currentWorkspaceId
    && state.currentOSId === "commerce"
    && !!state.currentOSSubscriptionId;
  const currentCommerceSetup = useMemo(
    () => state.commerceSetups.find((cs) =>
      cs.workspaceId === state.currentWorkspaceId &&
      cs.businessUnitId === state.currentBusinessUnitId
    ) ?? null,
    [state.commerceSetups, state.currentWorkspaceId, state.currentBusinessUnitId]
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
      const eff = legacyEffectiveStock(p, state.currentBranchId, state.branchInventory);
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
  const attachMedia = useCallback(async (input: { source: LegacyMediaSource; ownerType: MediaOwnerType; ownerId?: string | null; fileName: string }) => {
    const outcome = await services.productMedia.attach({
      source: input.source,
      workspaceId: state.currentWorkspaceId ?? "",
      legacyBusinessUnitId: state.currentBusinessUnitId,
      branchId: state.currentBranchId,
      ownerType: input.ownerType,
      ownerId: input.ownerId ?? null,
      fileName: input.fileName,
    });
    if (!outcome.ok) {
      showToast(memoT(outcome.error), "error");
      return null;
    }
    setState((prev) => ({
      ...prev,
      mediaAssets: [...outcome.mediaAssets],
      workspaceStorageUsage: [...outcome.storageUsage],
    }));
    return { asset: outcome.asset, reference: outcome.reference };
  }, [memoT, services.productMedia, showToast, state.currentBranchId, state.currentBusinessUnitId, state.currentWorkspaceId]);

  // ---- auth ----
  const createUser = useCallback((data: { fullName: string; email: string; password: string }): "success" | "email_taken" => {
    const result = services.corePlatformCompatibility.createUser({ users: state.users, ...data });
    if (!result.ok) return result.error;
    setState((prev) => ({ ...prev, users: [...result.users], currentUserId: result.user.id }));
    return "success";
  }, [services.corePlatformCompatibility, state.users]);

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
    const result = services.corePlatformCompatibility.createWorkspace({ workspaces: state.workspaces, ownerUserId: state.currentUserId!, language: state.lang, ...data });
    setState((prev) => ({ ...prev, workspaces: [...result.workspaces], currentWorkspaceId: result.workspace.id }));
    return result.workspace;
  }, [services.corePlatformCompatibility, state.workspaces, state.currentUserId, state.lang]);

  // ---- onboarding ----
  const setLocale = useCallback((locale: Lang) => {
    setState((prev) => ({ ...prev, lang: locale }));
  }, []);

  const createBranch = useCallback((data: { name: string; city?: string; address?: string; country?: string; currency?: string; isMain: boolean }): Branch => {
    const result = services.corePlatformCompatibility.createBranch({
      branches: state.branches, enablements: state.osEnablements, workspaceId: state.currentWorkspaceId!,
      businessUnitId: state.currentBusinessUnitId || "", osSubscriptionId: state.currentOSSubscriptionId,
      workspaceCountry: currentWorkspace?.country, workspaceCurrency: currentWorkspace?.currency, ...data,
    });
    setState((prev) => ({ ...prev, branches: [...result.branches], osEnablements: [...result.enablements], currentBranchId: result.branch.id }));
    return result.branch;
  }, [currentWorkspace, services.corePlatformCompatibility, state.branches, state.currentBusinessUnitId, state.currentOSSubscriptionId, state.currentWorkspaceId, state.osEnablements]);

  const addBranch = useCallback((data: { name: string; city?: string; address?: string }): Branch => {
    const result = services.corePlatformCompatibility.addBranch({
      branches: state.branches, enablements: state.osEnablements, workspaceId: state.currentWorkspaceId!,
      businessUnitId: state.currentBusinessUnitId!, workspaceCountry: currentWorkspace?.country,
      workspaceCurrency: currentWorkspace?.currency, ...data,
    });
    setState((prev) => ({ ...prev, branches: [...result.branches], osEnablements: [...result.enablements], currentBranchId: result.branch.id }));
    return result.branch;
  }, [currentWorkspace, services.corePlatformCompatibility, state.branches, state.currentBusinessUnitId, state.currentWorkspaceId, state.osEnablements]);

  const selectOS = useCallback((osId: string) => {
    setState((prev) => ({ ...prev, currentOSId: osId }));
  }, []);

  const selectPlan = useCallback((planKey: "starter" | "pro" | "business") => {
    const planId = planIdFor(state.currentOSId || "commerce", planKey);
    const result = services.corePlatformCompatibility.selectPlan({ subscriptions: state.subscriptions, workspaceId: state.currentWorkspaceId!, osId: state.currentOSId || "commerce", planKey, planId });
    setState((prev) => ({ ...prev, subscriptions: [...result.subscriptions], currentOSSubscriptionId: result.subscription.id }));
  }, [services.corePlatformCompatibility, state.subscriptions, state.currentWorkspaceId, state.currentOSId]);

  const createBusinessUnit = useCallback((data: { name: string; preset: string; osId: string; industryType?: string }): BusinessUnit => {
    const result = services.corePlatformCompatibility.createBusinessUnit({
      businessUnits: state.businessUnits, branches: state.branches, enablements: state.osEnablements,
      subscriptions: state.subscriptions, workspaceId: state.currentWorkspaceId!,
      osSubscriptionId: state.currentOSSubscriptionId!, currentBranchId: state.currentBranchId, ...data,
    });
    setState((prev) => ({ ...prev, businessUnits: [...result.businessUnits], branches: [...result.branches], osEnablements: [...result.enablements], currentBusinessUnitId: result.businessUnit.id }));
    return result.businessUnit;
  }, [services.corePlatformCompatibility, state.businessUnits, state.branches, state.currentBranchId, state.currentOSSubscriptionId, state.currentWorkspaceId, state.osEnablements, state.subscriptions]);

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
    return services.setupCommands.read({
      workspaceId: state.currentWorkspaceId || "",
      legacyBusinessUnitId: state.currentBusinessUnitId || "",
      osSubscriptionId: state.currentOSSubscriptionId || "",
      industryOrPreset: currentBU?.industryType || currentBU?.presetId || "retail",
    });
  }, [currentBU, services.setupCommands, state.currentBusinessUnitId, state.currentOSSubscriptionId, state.currentWorkspaceId]);

  const saveCommerceSetup = useCallback((data: Partial<CommerceSetup>) => {
    const result = services.setupCommands.save({
      context: {
        workspaceId: state.currentWorkspaceId!,
        legacyBusinessUnitId: state.currentBusinessUnitId!,
        osSubscriptionId: state.currentOSSubscriptionId!,
        industryOrPreset: currentBU?.industryType || currentBU?.presetId || "retail",
      },
      changes: data,
    });
    setState((prev) => ({ ...prev, commerceSetups: [...result.setups] }));
  }, [currentBU, services.setupCommands, state.currentBusinessUnitId, state.currentOSSubscriptionId, state.currentWorkspaceId]);

  // ---- branch inventory ----
  const adjustStock = useCallback((data: {
    productId: string; branchId?: string; qty: number; lowStockThreshold?: number;
  }): { ok: true } | { ok: false; error: string } => {
    const result = services.stockAdjustments.adjust({
      workspaceId: state.currentWorkspaceId || "",
      legacyBusinessUnitId: state.currentBusinessUnitId || "",
      branchId: state.currentBranchId,
      actorId: currentUser?.id ?? "",
      actorDisplayName: getUserDisplayName(currentUser) || "Unknown",
      osId: "commerce", action: "inventory.adjust", resourceId: data.productId,
    }, data);
    if (!result.ok) return result;
    setState((prev) => ({ ...prev, branchInventory: [...result.branchInventory], stockMovements: [...result.stockMovements] }));
    return { ok: true };
  }, [currentUser, services.stockAdjustments, state.currentBranchId, state.currentBusinessUnitId, state.currentWorkspaceId]);

  // ---- stock transfers ----
  const transferStock = useCallback((data: {
    toBranchId: string; items: { productId: string; qty: number }[]; note?: string;
  }): { ok: true; transfer: StockTransfer } | { ok: false; error: string } => {
    const result = services.transfers.transfer({
      workspaceId: state.currentWorkspaceId || "",
      legacyBusinessUnitId: state.currentBusinessUnitId || "",
      branchId: state.currentBranchId,
      actorId: currentUser?.id ?? "",
      actorDisplayName: getUserDisplayName(currentUser) || "Unknown",
      osId: "commerce", action: "inventory.transfer",
    }, data);
    if (!result.ok) return result;
    setState((prev) => ({
      ...prev,
      branchInventory: [...result.branchInventory],
      stockMovements: [...result.stockMovements],
      stockTransfers: [...result.stockTransfers],
    }));
    return { ok: true, transfer: result.transfer };
  }, [currentUser, services.transfers, state.currentBranchId, state.currentBusinessUnitId, state.currentWorkspaceId]);

  // ---- returns ----
  const createReturn = useCallback((data: {
    orderId: string; items: { productId: string; qty: number }[]; reason: string;
    refundMethod: RefundMethod; restock: boolean;
  }): { ok: true; return: CommerceReturn } | { ok: false; error: string } => {
    const result = services.returns.create({
      workspaceId: state.currentWorkspaceId || "",
      legacyBusinessUnitId: state.currentBusinessUnitId || "",
      branchId: state.currentBranchId,
      actorId: currentUser?.id ?? "",
      actorDisplayName: getUserDisplayName(currentUser) || "Cashier",
      osId: "commerce", action: "return.create", resourceId: data.orderId,
    }, data);
    if (!result.ok) return result;
    setState((prev) => ({
      ...prev,
      orders: [...result.orders],
      invoices: [...result.invoices],
      commerceReturns: [...result.returns],
      branchInventory: [...result.branchInventory],
      stockMovements: [...result.stockMovements],
    }));
    return { ok: true, return: result.returnRecord };
  }, [currentUser, services.returns, state.currentBranchId, state.currentBusinessUnitId, state.currentWorkspaceId]);

  // ---- orders ----
  const createOrder = useCallback((data: {
    items: OrderItem[]; customerId: string | null; payment: "cash" | "card" | "wallet";
    discount: number; vat: number; subtotal: number; total: number; net: number;
  }): CommerceOrder => {
    const result = services.orderCommands.create({
      workspaceId: state.currentWorkspaceId || "",
      legacyBusinessUnitId: state.currentBusinessUnitId || "",
      branchId: state.currentBranchId,
      actorId: currentUser?.id ?? "",
      actorDisplayName: getUserDisplayName(currentUser) || "Cashier",
      osId: "commerce", action: "order.create",
    }, data);
    setState((prev) => ({
      ...prev,
      orders: [...result.orders],
      branchInventory: [...result.branchInventory],
      stockMovements: [...result.stockMovements],
    }));
    return result.order;
  }, [currentUser, services.orderCommands, state.currentBranchId, state.currentBusinessUnitId, state.currentWorkspaceId]);

  // ---- invoices ----
  const createInvoice = useCallback((orderId: string): CommerceInvoice => {
    const result = services.invoiceCommands.create({
      workspaceId: state.currentWorkspaceId || "",
      legacyBusinessUnitId: state.currentBusinessUnitId || "",
      branchId: state.currentBranchId,
      actorId: currentUser?.id ?? "",
      actorDisplayName: getUserDisplayName(currentUser) || "Cashier",
      osId: "commerce", action: "invoice.create", resourceId: orderId,
    }, { orderId });
    setState((prev) => ({ ...prev, invoices: [...result.invoices] }));
    return result.invoice;
  }, [currentUser, services.invoiceCommands, state.currentBranchId, state.currentBusinessUnitId, state.currentWorkspaceId]);

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
    adjustStock, transferStock, createReturn, createOrder, createInvoice,
    attachMedia,
    setCurrent,
  };

  return <AppCtx.Provider value={ctx}>{children}</AppCtx.Provider>;
}
