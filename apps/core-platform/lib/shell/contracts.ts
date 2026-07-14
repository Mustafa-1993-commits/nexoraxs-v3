import type { Branch, BusinessUnit, Workspace } from "@nexoraxs/types";

export type ShellNavIconName = "layout-grid" | "credit-card" | "users" | "plug" | "settings";

export type ShellNavigationItem = Readonly<{
  id: string;
  href: string;
  label: string;
  icon: ShellNavIconName;
  match: "exact" | "prefix";
  searchable: boolean;
}>;

export type CoreSearchKind = "navigation" | "installed-application" | "setting" | "documentation";
export type CoreSearchAvailability = "available" | "unavailable";

export type CoreSearchEntry = Readonly<{
  id: string;
  kind: CoreSearchKind;
  label: string;
  keywords: readonly string[];
  href: string;
  availability: CoreSearchAvailability;
}>;

export type CoreSearchResult = CoreSearchEntry & Readonly<{ score: number }>;

export type ShellContextSnapshot = Readonly<{
  actorId: string | null;
  workspaceId: string | null;
  workspace: Pick<Workspace, "id" | "name"> | null;
  legacyBusinessUnitId: string | null;
  legacyBusinessUnit: Pick<BusinessUnit, "id" | "name" | "workspaceId"> | null;
  branchId: string | null;
  branch: Pick<Branch, "id" | "name" | "workspaceId" | "businessUnitId"> | null;
}>;

export type ShellContextStatus = "ready" | "missing" | "stale" | "cross-scope" | "unavailable";

export type ShellContextReason =
  | "workspace-missing"
  | "workspace-not-found"
  | "business-unit-not-found"
  | "business-unit-workspace-mismatch"
  | "branch-not-found"
  | "branch-workspace-mismatch"
  | "branch-business-unit-mismatch"
  | "branch-business-unit-unavailable";

export type LegacyBusinessContext = Readonly<{
  businessUnitId: string;
  displayLabel: string;
  displayName: string;
  compatibilityStatus: "legacy-compatible";
}>;

export type ShellContextView = Readonly<{
  status: ShellContextStatus;
  workspaceId: string | null;
  workspaceName: string;
  globalDisplayLevel: "workspace";
  reason: ShellContextReason | null;
  recoveryHref: string | null;
  legacyBusinessContext: LegacyBusinessContext | null;
}>;

export type NotificationPresentationKind = "plan" | "out-of-stock" | "low-stock" | "latest-order";
export type NotificationSourceOwner = "core-compatibility" | "commerce-compatibility";

export type NotificationPresentationItem = Readonly<{
  id: string;
  kind: NotificationPresentationKind;
  tone: "accent" | "danger" | "warn" | "positive";
  message: string;
  sourceOwner: NotificationSourceOwner;
  readOnly: true;
}>;

export type NotificationProjection = Readonly<{
  items: readonly NotificationPresentationItem[];
  hasIndicator: boolean;
  state: "ready" | "empty" | "unavailable";
}>;

export type NotificationProjectionInput = Readonly<{
  products: readonly Readonly<{
    id: string;
    name: string;
    stock?: number | null;
    lowStockThreshold?: number | null;
  }>[];
  orders: readonly Readonly<{
    id: string;
    orderNumber: string;
    total: number;
  }>[];
  plan: Readonly<{ name: string; status: string }> | null;
  money: (amount: number) => string;
  locale: "en" | "ar";
}>;

export type ShellPresentationStateKind =
  | "loading"
  | "ready"
  | "empty"
  | "error"
  | "unauthorized"
  | "unavailable"
  | "recovering";

export type ShellPresentationState = Readonly<{
  kind: ShellPresentationStateKind;
  titleKey: string | null;
  descriptionKey: string | null;
  busy: boolean;
  action: "retry-context" | "retry-read" | null;
  announcement: "none" | "polite" | "assertive";
}>;

export type ShellPreferenceView = Readonly<{
  locale: "en" | "ar";
  direction: "ltr" | "rtl";
  theme: "light" | "dark";
  reducedMotion: boolean;
}>;

export type TransientSurfaceState = Readonly<{
  open: boolean;
  triggerId: string;
  surfaceId: string;
  openedBy: "keyboard" | "pointer" | "programmatic";
  restoreFocus: boolean;
}>;

export type ShellPresentationView = Readonly<{
  actor: Readonly<{ id: string | null; displayName: string; email: string | null }>;
  context: ShellContextView;
  state: ShellPresentationState;
  preferences: ShellPreferenceView;
  notifications: NotificationProjection;
  retryContext: () => void;
}>;
