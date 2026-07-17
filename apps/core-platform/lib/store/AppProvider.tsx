"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from "react";
import { STORAGE_KEYS, PLAN_CATALOG, planIdFor } from "@nexoraxs/shared";
import {
  uid, nowISO, normalizeEmail, getUserDisplayName,
  readCollection, writeCollection,
  seedDB, storageUsagePercent, formatBytes,
  getCurrentOSEnablement,
} from "@nexoraxs/shared";
import { t as tFn, type Lang } from "@nexoraxs/shared";
import { money as moneyFn } from "@nexoraxs/shared";
import type {
  User, Workspace, Branch, OSSubscription, BusinessUnit, WorkspaceMember,
  OSEnablement, WorkspaceStorageUsage,
} from "@nexoraxs/types";
import { ensureCommerceBusinessEnablement, isBranchNameAvailableForBusiness } from "@/lib/domain/core-organization-compatibility";
import { coreCommerceIntegration } from "@/lib/commerce/createCoreCommerceIntegration";
import {
  emptyCoreCommerceProjection,
  readCoreCommerceProjection,
  type CoreCommerceProjection,
} from "@/lib/commerce/CommerceProjectionPort";
import {
  consumeCoreDemoFlag,
  readCoreSessionValue as readSession,
  removeCoreSessionValue,
  writeCoreSessionValue as writeSession,
} from "@/lib/infrastructure/browser/core-session-storage";
import {
  applyCoreTheme,
  readCoreTheme,
  writeCoreTheme,
} from "@/lib/infrastructure/browser/core-theme-storage";
import {
  applyCoreLocale,
  readCoreLocale,
  writeCoreLocale,
} from "@/lib/infrastructure/browser/core-locale-storage";
import type { ShellContextSnapshot } from "@/lib/shell/contracts";

// ---- types ----
export type { User, Workspace, Branch, OSSubscription, OSEnablement, BusinessUnit, WorkspaceMember };
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
  commerceProjection: CoreCommerceProjection;
  subscriptions: OSSubscription[];
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
    workspaceStorageUsage: [] as WorkspaceStorageUsage[],
  };
}

function loadState(): ReturnType<typeof emptyRuntimeState> {
  if (typeof window === "undefined") return emptyRuntimeState();

  if (consumeCoreDemoFlag()) {
    const seeded = seedDB();
    persistCoreState(seeded);
  }

  const theme = readCoreTheme();
  const lang = readCoreLocale();

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
    workspaceStorageUsage: readCollection<WorkspaceStorageUsage>(STORAGE_KEYS.workspaceStorageUsage),
  };
}

function persistCoreState(data: ReturnType<typeof seedDB>): void {
  writeCollection(STORAGE_KEYS.users, data.users);
  writeCollection(STORAGE_KEYS.workspaces, data.workspaces);
  writeCollection(STORAGE_KEYS.branches, data.branches);
  writeCollection(STORAGE_KEYS.osSubscriptions, data.subscriptions);
  writeCollection(STORAGE_KEYS.osEnablements, data.osEnablements);
  writeCollection(STORAGE_KEYS.businessUnits, data.businessUnits);
  writeCollection(STORAGE_KEYS.teamMembers, data.teamMembers);
  writeCollection(STORAGE_KEYS.workspaceStorageUsage, data.workspaceStorageUsage);
  if (data.currentUserId) writeSession(STORAGE_KEYS.currentUserId, data.currentUserId);
  if (data.currentWorkspaceId) writeSession(STORAGE_KEYS.currentWorkspaceId, data.currentWorkspaceId);
  if (data.currentOSId) writeSession(STORAGE_KEYS.currentOSId, data.currentOSId);
  if (data.currentOSSubscriptionId) writeSession(STORAGE_KEYS.currentOSSubscriptionId, data.currentOSSubscriptionId);
  if (data.currentBusinessUnitId) writeSession(STORAGE_KEYS.currentBusinessUnitId, data.currentBusinessUnitId);
  if (data.currentBranchId) writeSession(STORAGE_KEYS.currentBranchId, data.currentBranchId);
  writeSession(STORAGE_KEYS.onboardingState, data.onboardingState);
  writeSession(STORAGE_KEYS.locale, data.locale);
  writeCoreTheme(data.theme === "dark" ? "dark" : "light");
}

// ---- AppProvider ----
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(emptyRuntimeState);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const commerceProjectionPort = coreCommerceIntegration.projection;
  const [commerceProjection, setCommerceProjection] = useState(emptyCoreCommerceProjection);

  useEffect(() => {
    // Hydrate browser-only mock storage after SSR and the first client render match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(loadState());
    setIsHydrated(true);
  }, []);

  // RTL: set dir on mount + whenever lang changes
  useEffect(() => {
    if (!isHydrated) return;
    applyCoreLocale(state.lang);
    writeCoreLocale(state.lang);
  }, [isHydrated, state.lang]);

  // theme: set data-theme on mount + whenever theme changes
  useEffect(() => {
    if (!isHydrated) return;
    applyCoreTheme(state.theme);
    writeCoreTheme(state.theme);
  }, [isHydrated, state.theme]);

  // persist session keys on every change
  useEffect(() => {
    if (!isHydrated) return;
    if (typeof window === "undefined") return;
    if (state.currentUserId) writeSession(STORAGE_KEYS.currentUserId, state.currentUserId);
    else removeCoreSessionValue(STORAGE_KEYS.currentUserId);
    if (state.currentWorkspaceId) writeSession(STORAGE_KEYS.currentWorkspaceId, state.currentWorkspaceId);
    else removeCoreSessionValue(STORAGE_KEYS.currentWorkspaceId);
    if (state.currentOSId) writeSession(STORAGE_KEYS.currentOSId, state.currentOSId);
    else removeCoreSessionValue(STORAGE_KEYS.currentOSId);
    if (state.currentOSSubscriptionId) writeSession(STORAGE_KEYS.currentOSSubscriptionId, state.currentOSSubscriptionId);
    else removeCoreSessionValue(STORAGE_KEYS.currentOSSubscriptionId);
    if (state.currentBusinessUnitId) writeSession(STORAGE_KEYS.currentBusinessUnitId, state.currentBusinessUnitId);
    else removeCoreSessionValue(STORAGE_KEYS.currentBusinessUnitId);
    if (state.currentBranchId) writeSession(STORAGE_KEYS.currentBranchId, state.currentBranchId);
    else removeCoreSessionValue(STORAGE_KEYS.currentBranchId);
    writeSession(STORAGE_KEYS.onboardingState, state.onboardingState);
    writeSession(STORAGE_KEYS.locale, state.lang);
  }, [state.currentUserId, state.currentWorkspaceId, state.currentOSId,
    state.currentOSSubscriptionId, state.currentBusinessUnitId, state.currentBranchId,
    state.onboardingState, state.lang, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    const workspaceId = state.currentWorkspaceId;
    const legacyBusinessUnitId = state.currentBusinessUnitId;
    const branchId = state.currentBranchId;
    if (!workspaceId || !legacyBusinessUnitId) return;
    let active = true;
    void readCoreCommerceProjection(commerceProjectionPort, {
      workspaceId,
      legacyBusinessUnitId,
      branchId,
    }).then((projection) => {
      if (active) setCommerceProjection(projection);
    }).catch(() => {
      if (active) setCommerceProjection(emptyCoreCommerceProjection({ workspaceId, legacyBusinessUnitId, branchId }));
    });
    return () => { active = false; };
  }, [commerceProjectionPort, isHydrated, state.currentBranchId, state.currentBusinessUnitId, state.currentWorkspaceId]);

  const scopedCommerceProjection = useMemo(() => {
    if (
      commerceProjection.scope.workspaceId !== (state.currentWorkspaceId ?? "")
      || commerceProjection.scope.legacyBusinessUnitId !== (state.currentBusinessUnitId ?? "")
      || commerceProjection.branchId !== (state.currentBranchId ?? null)
    ) {
      return emptyCoreCommerceProjection({
        workspaceId: state.currentWorkspaceId,
        legacyBusinessUnitId: state.currentBusinessUnitId,
        branchId: state.currentBranchId,
      });
    }
    return commerceProjection;
  }, [commerceProjection, state.currentBranchId, state.currentBusinessUnitId, state.currentWorkspaceId]);

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
  const isCommerceSetupComplete = scopedCommerceProjection.isSetupComplete;

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
    removeCoreSessionValue(STORAGE_KEYS.currentUserId);
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
    // Read fresh from browser persistence so a preceding synchronous createBranch call's
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
    commerceProjection: scopedCommerceProjection, subscriptions: state.subscriptions,
    setCurrent,
  };

  return <AppCtx.Provider value={ctx}>{children}</AppCtx.Provider>;
}
