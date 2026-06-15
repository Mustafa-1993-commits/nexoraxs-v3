"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Building2 } from "lucide-react";
import { useApp } from "@/lib/store";
import { BrandMark } from "@/components/ui/BrandMark";

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

export function ContextSwitcher({ mode }: ContextSwitcherProps) {
  const { currentWorkspace, currentBU, currentBranch, BUSINESS_UNITS, BRANCHES, setCurrent } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const name = mode === "commerce" ? (currentBU?.name ?? "Commerce OS") : (currentWorkspace?.name ?? "Workspace");
  const sub = mode === "commerce" ? (currentBranch?.name ?? "") : "Workspace";

  return (
    <div ref={ref} className="nx-sb-context">
      <button className="nx-sb-switch" onClick={() => setOpen((o) => !o)}>
        {mode === "core" ? <WorkspaceIcon size={32} /> : <BrandMark name={name} size={32} radius={8} />}
        <span className="nx-sb-switch-txt">
          <span className="nx-sb-switch-name">{name}</span>
          {sub && <span className="nx-sb-switch-sub">{sub}</span>}
        </span>
        <ChevronDown size={14} style={{ color: "var(--text-3)", flexShrink: 0 }} />
      </button>

      {open && (
        <div className="nx-dd left" style={{ top: "calc(100% + 4px)", width: "100%" }}>
          {mode === "core" && currentWorkspace && (
            <>
              <div className="nx-dd-label">Workspace</div>
              <button className="nx-dd-item" onClick={() => setOpen(false)}>
                <WorkspaceIcon size={22} />
                <span style={{ flex: 1, textAlign: "start" }}>{currentWorkspace.name}</span>
                <Check size={14} style={{ color: "var(--accent)" }} />
              </button>
            </>
          )}

          {mode === "commerce" && BUSINESS_UNITS.length > 0 && (
            <>
              <div className="nx-dd-label">Business</div>
              {BUSINESS_UNITS.map((bu) => (
                <button
                  key={bu.id}
                  className="nx-dd-item"
                  onClick={() => { setCurrent({ currentBusinessUnitId: bu.id }); setOpen(false); }}
                >
                  <BrandMark name={bu.name} size={22} radius={6} />
                  <span style={{ flex: 1, textAlign: "start" }}>{bu.name}</span>
                  {bu.id === currentBU?.id && <Check size={14} style={{ color: "var(--accent)" }} />}
                </button>
              ))}
            </>
          )}

          {mode === "commerce" && BRANCHES.length > 0 && (
            <>
              <div className="nx-dd-sep" />
              <div className="nx-dd-label">Branch</div>
              {BRANCHES.map((br) => (
                <button
                  key={br.id}
                  className="nx-dd-item"
                  onClick={() => { setCurrent({ currentBranchId: br.id }); setOpen(false); }}
                >
                  <span style={{ flex: 1, textAlign: "start" }}>{br.name}</span>
                  {br.id === currentBranch?.id && <Check size={14} style={{ color: "var(--accent)" }} />}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
