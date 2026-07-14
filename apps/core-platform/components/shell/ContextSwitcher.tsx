"use client";

import { memo, useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Building2 } from "lucide-react";
import { useApp } from "@/lib/store";
import { BrandMark } from "@/components/ui/BrandMark";
import { useShellPresentation } from "@/lib/shell/useShellPresentation";

function WorkspaceIcon({ size }: { size: number }) {
  const ic = Math.round(size * 0.5);
  return (
    <span
      className="nx-choice-ic"
      style={{
        width: size, height: size, borderRadius: Math.round(size * 0.28),
        background: "#14161d", color: "#fff", flexShrink: 0,
      }}
    >
      <Building2 size={ic} strokeWidth={2} />
    </span>
  );
}

interface ContextSwitcherProps {
  mode: "core" | "commerce";
}

export const ContextSwitcher = memo(function ContextSwitcher({ mode }: ContextSwitcherProps) {
  const { currentWorkspace, currentBU, currentBranch, BUSINESS_UNITS, BRANCHES, setCurrent, t } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { context } = useShellPresentation();

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    function dismiss(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    }
    document.addEventListener("keydown", dismiss);
    return () => document.removeEventListener("keydown", dismiss);
  }, [open]);

  const name = mode === "commerce"
    ? (currentBU?.name ?? "Commerce OS")
    : (context.workspaceName || t("workspace"));
  const sub = mode === "commerce" ? (currentBranch?.name ?? "") : t("workspace");

  return (
    <div
      ref={ref}
      className="nx-sb-context"
      data-shell-context-status={context.status === "ready" ? "ready" : undefined}
    >
      <button
        ref={triggerRef}
        type="button"
        className="nx-sb-switch"
        onClick={() => setOpen((o) => !o)}
        aria-label={mode === "core" ? t("workspace_menu") : t("business_context_menu")}
        aria-controls="workspace-menu"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {mode === "core" ? <WorkspaceIcon size={32} /> : <BrandMark name={name} size={32} radius={8} />}
        <span className="nx-sb-switch-txt">
          <span className="nx-sb-switch-name" dir="auto">{name}</span>
          {sub && <span className="nx-sb-switch-sub">{sub}</span>}
        </span>
        <ChevronDown aria-hidden size={14} style={{ color: "var(--text-3)", flexShrink: 0 }} />
      </button>

      {open && (
        <div
          ref={menuRef}
          id="workspace-menu"
          className="nx-dd left"
          role="menu"
          aria-label={mode === "core" ? t("workspace_menu") : t("business_context_menu")}
          style={{ top: "calc(100% + 4px)", width: "100%" }}
        >
          {mode === "core" && currentWorkspace && (
            <>
              <div className="nx-dd-label">{t("workspace")}</div>
              <button type="button" role="menuitemradio" aria-checked="true" className="nx-dd-item" onClick={() => setOpen(false)}>
                <WorkspaceIcon size={22} />
                <span dir="auto" style={{ flex: 1, textAlign: "start" }}>{currentWorkspace.name}</span>
                <Check size={14} style={{ color: "var(--accent)" }} />
              </button>
            </>
          )}

          {mode === "commerce" && BUSINESS_UNITS.length > 0 && (
            <>
              <div className="nx-dd-label">{t("business")}</div>
              {BUSINESS_UNITS.map((bu) => (
                <button
                  key={bu.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={bu.id === currentBU?.id}
                  className="nx-dd-item"
                  onClick={() => { setCurrent({ currentBusinessUnitId: bu.id }); setOpen(false); }}
                >
                  <BrandMark name={bu.name} size={22} radius={6} />
                  <span dir="auto" style={{ flex: 1, textAlign: "start" }}>{bu.name}</span>
                  {bu.id === currentBU?.id && <Check size={14} style={{ color: "var(--accent)" }} />}
                </button>
              ))}
            </>
          )}

          {mode === "commerce" && BRANCHES.length > 0 && (
            <>
              <div className="nx-dd-sep" />
              <div className="nx-dd-label">{t("branch")}</div>
              {BRANCHES.map((br) => (
                <button
                  key={br.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={br.id === currentBranch?.id}
                  className="nx-dd-item"
                  onClick={() => { setCurrent({ currentBranchId: br.id }); setOpen(false); }}
                >
                  <span dir="auto" style={{ flex: 1, textAlign: "start" }}>{br.name}</span>
                  {br.id === currentBranch?.id && <Check size={14} style={{ color: "var(--accent)" }} />}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
});
