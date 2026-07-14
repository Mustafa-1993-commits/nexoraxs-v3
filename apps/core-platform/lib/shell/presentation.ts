import type {
  CoreSearchEntry,
  CoreSearchKind,
  CoreSearchResult,
  LegacyBusinessContext,
  NotificationPresentationItem,
  NotificationProjection,
  NotificationProjectionInput,
  ShellContextReason,
  ShellContextSnapshot,
  ShellContextStatus,
  ShellContextView,
  ShellPresentationState,
  ShellPresentationStateKind,
} from "./contracts";
import { t } from "@nexoraxs/shared";

const SEARCHABLE_KINDS = new Set<CoreSearchKind>([
  "navigation",
  "installed-application",
  "setting",
  "documentation",
]);

export function searchCoreDestinations(
  entries: readonly CoreSearchEntry[],
  query: string,
  locale: "en" | "ar",
): readonly CoreSearchResult[] {
  const normalizedQuery = query.trim().toLocaleLowerCase(locale);
  if (!normalizedQuery) return [];

  return entries.flatMap((entry, index) => {
    if (!SEARCHABLE_KINDS.has(entry.kind) || entry.availability !== "available") return [];
    const label = entry.label.toLocaleLowerCase(locale);
    const keywords = entry.keywords.map((keyword) => keyword.toLocaleLowerCase(locale));
    const score = label === normalizedQuery
      ? 300
      : label.startsWith(normalizedQuery)
        ? 200
        : label.includes(normalizedQuery) || keywords.some((keyword) => keyword.includes(normalizedQuery))
          ? 100
          : 0;
    return score > 0 ? [{ ...entry, score: score - index / 1000 }] : [];
  }).sort((left, right) => right.score - left.score);
}

function localizedPlanStatus(status: string, locale: "en" | "ar"): string {
  const keyByStatus: Record<string, string> = {
    "Free Trial": "notification_status_free_trial",
    Active: "notification_status_active",
    "Past Due": "notification_status_past_due",
    Canceled: "notification_status_canceled",
  };
  return keyByStatus[status] ? t(keyByStatus[status], locale) : status;
}

export function projectShellNotifications(input: NotificationProjectionInput): NotificationProjection {
  const items: NotificationPresentationItem[] = [];
  const outOfStock = input.products.filter((product) => (product.stock ?? 0) === 0);
  const lowStock = input.products.filter((product) => {
    const stock = product.stock ?? 0;
    return stock > 0 && stock <= (product.lowStockThreshold || 5);
  });
  const latestOrder = input.orders.length > 0 ? input.orders[input.orders.length - 1] : null;

  if (input.plan) {
    items.push({
      id: `plan:${input.plan.name}`,
      kind: "plan",
      tone: "accent",
      message: `${input.plan.name} ${t("notification_plan", input.locale)} — ${localizedPlanStatus(input.plan.status, input.locale)}`,
      sourceOwner: "core-compatibility",
      readOnly: true,
    });
  }
  for (const product of outOfStock) {
    items.push({
      id: `out:${product.id}`,
      kind: "out-of-stock",
      tone: "danger",
      message: `${t("notification_out_of_stock", input.locale)}: ${product.name}`,
      sourceOwner: "commerce-compatibility",
      readOnly: true,
    });
  }
  for (const product of lowStock) {
    const stock = product.stock ?? 0;
    items.push({
      id: `low:${product.id}`,
      kind: "low-stock",
      tone: "warn",
      message: input.locale === "ar"
        ? `${t("notification_low_stock", input.locale)}: ${product.name} (${t("notification_left", input.locale)} ${stock})`
        : `${t("notification_low_stock", input.locale)}: ${product.name} (${stock} ${t("notification_left", input.locale)})`,
      sourceOwner: "commerce-compatibility",
      readOnly: true,
    });
  }
  if (latestOrder) {
    items.push({
      id: `order:${latestOrder.id}`,
      kind: "latest-order",
      tone: "positive",
      message: `${t("notification_new_order", input.locale)} ${latestOrder.orderNumber} — ${input.money(latestOrder.total)}`,
      sourceOwner: "commerce-compatibility",
      readOnly: true,
    });
  }

  return {
    items,
    hasIndicator: outOfStock.length > 0 || lowStock.length > 0 || input.plan !== null,
    state: items.length > 0 ? "ready" : "empty",
  };
}

function result(
  snapshot: ShellContextSnapshot,
  status: ShellContextStatus,
  reason: ShellContextReason | null,
): ShellContextView {
  const workspaceIsSelected = snapshot.workspace?.id === snapshot.workspaceId;
  const legacyBusinessContext: LegacyBusinessContext | null = status === "ready" && snapshot.legacyBusinessUnit
    ? {
        businessUnitId: snapshot.legacyBusinessUnit.id,
        displayLabel: "Business",
        displayName: snapshot.legacyBusinessUnit.name,
        compatibilityStatus: "legacy-compatible",
      }
    : null;

  return {
    status,
    workspaceId: snapshot.workspaceId,
    workspaceName: workspaceIsSelected ? snapshot.workspace?.name ?? "" : "",
    globalDisplayLevel: "workspace",
    reason,
    recoveryHref: null,
    legacyBusinessContext,
  };
}

export function evaluateShellContext(snapshot: ShellContextSnapshot): ShellContextView {
  if (!snapshot.workspaceId) return result(snapshot, "missing", "workspace-missing");
  if (!snapshot.workspace || snapshot.workspace.id !== snapshot.workspaceId) {
    return result(snapshot, "stale", "workspace-not-found");
  }

  if (snapshot.legacyBusinessUnitId) {
    if (!snapshot.legacyBusinessUnit || snapshot.legacyBusinessUnit.id !== snapshot.legacyBusinessUnitId) {
      return result(snapshot, "stale", "business-unit-not-found");
    }
    if (snapshot.legacyBusinessUnit.workspaceId !== snapshot.workspaceId) {
      return result(snapshot, "cross-scope", "business-unit-workspace-mismatch");
    }
  }

  if (snapshot.branchId) {
    if (!snapshot.branch || snapshot.branch.id !== snapshot.branchId) {
      return result(snapshot, "stale", "branch-not-found");
    }
    if (snapshot.branch.workspaceId !== snapshot.workspaceId) {
      return result(snapshot, "cross-scope", "branch-workspace-mismatch");
    }
    if (!snapshot.legacyBusinessUnitId || !snapshot.legacyBusinessUnit) {
      return result(snapshot, "unavailable", "branch-business-unit-unavailable");
    }
    if (snapshot.branch.businessUnitId !== snapshot.legacyBusinessUnitId) {
      return result(snapshot, "cross-scope", "branch-business-unit-mismatch");
    }
  }

  return result(snapshot, "ready", null);
}

const STATE_COPY: Record<Exclude<ShellPresentationStateKind, "ready">, {
  titleKey: string;
  descriptionKey: string;
}> = {
  loading: {
    titleKey: "shell_state_loading_title",
    descriptionKey: "shell_state_loading_description",
  },
  empty: {
    titleKey: "shell_state_empty_title",
    descriptionKey: "shell_state_empty_description",
  },
  error: {
    titleKey: "shell_state_error_title",
    descriptionKey: "shell_state_error_description",
  },
  unauthorized: {
    titleKey: "shell_state_unauthorized_title",
    descriptionKey: "shell_state_unauthorized_description",
  },
  unavailable: {
    titleKey: "shell_state_unavailable_title",
    descriptionKey: "shell_state_unavailable_description",
  },
  recovering: {
    titleKey: "shell_state_recovering_title",
    descriptionKey: "shell_state_recovering_description",
  },
};

export function createShellPresentationState(
  kind: ShellPresentationStateKind,
  action: ShellPresentationState["action"] = null,
): ShellPresentationState {
  if (kind === "ready") {
    return {
      kind,
      titleKey: null,
      descriptionKey: null,
      busy: false,
      action: null,
      announcement: "none",
    };
  }

  return {
    kind,
    ...STATE_COPY[kind],
    busy: kind === "loading" || kind === "recovering",
    action,
    announcement: kind === "error" ? "assertive" : "polite",
  };
}

export function shellStateForContext(context: ShellContextView): ShellPresentationState {
  switch (context.status) {
    case "ready":
      return createShellPresentationState("ready");
    case "missing":
      return createShellPresentationState("empty", "retry-context");
    case "cross-scope":
      return createShellPresentationState("unauthorized", "retry-context");
    case "stale":
    case "unavailable":
      return createShellPresentationState("unavailable", "retry-context");
  }
}
