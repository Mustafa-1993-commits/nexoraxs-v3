"use client";

import { AlertCircle, AlertTriangle, CircleOff, LoaderCircle, RefreshCw } from "lucide-react";
import { useApp } from "@/lib/store";
import type { ShellContextStatus, ShellPresentationState } from "@/lib/shell/contracts";

interface ShellStateNoticeProps {
  state: ShellPresentationState;
  contextStatus?: ShellContextStatus;
  onAction?: () => void;
}

export function ShellStateNotice({ state, contextStatus, onAction }: ShellStateNoticeProps) {
  const { t } = useApp();
  if (state.kind === "ready" || !state.titleKey || !state.descriptionKey) return null;

  const Icon = state.kind === "loading" || state.kind === "recovering"
    ? LoaderCircle
    : state.kind === "error"
      ? AlertCircle
      : state.kind === "empty"
        ? CircleOff
        : AlertTriangle;

  return (
    <section
      className="nx-shell-state-notice nx-card nx-card-pad"
      data-shell-state={state.kind}
      data-shell-context-status={contextStatus}
      role={state.announcement === "assertive" ? "alert" : "status"}
      aria-live={state.announcement === "none" ? undefined : state.announcement}
      aria-atomic="true"
      aria-busy={state.busy}
    >
      <Icon aria-hidden size={24} className={state.busy ? "nx-shell-state-spinner" : undefined} />
      <div>
        <h1>{t(state.titleKey)}</h1>
        <p>{t(state.descriptionKey)}</p>
        {state.action && onAction && (
          <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={onAction}>
            <RefreshCw aria-hidden size={15} />
            {t(state.action === "retry-context" ? "retry_context" : "retry_read")}
          </button>
        )}
      </div>
    </section>
  );
}
