"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronsUpDown, Check, Building2, Store, MapPin } from "lucide-react";
import { useApp } from "@/lib/store";
import { BrandMark } from "@/components/ui/BrandMark";

interface ContextSwitcherProps {
  mode: "core" | "commerce";
}

export function ContextSwitcher({ mode }: ContextSwitcherProps) {
  const { currentWorkspace, currentBU, currentBranch, commerceIdentity, BUSINESS_UNITS, BRANCHES, setCurrent } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const name = mode === "commerce" ? commerceIdentity.name : (currentWorkspace?.name ?? "Workspace");
  const sub = mode === "commerce" ? commerceIdentity.subtitle : "Workspace";

  return (
    <div ref={ref} className="nx-sb-context">
      <button className="nx-sb-switch" onClick={() => setOpen((o) => !o)}>
        {mode === "core" ? (
          <span className="nx-choice-ic" style={{ width: 34, height: 34, background: "#14161d", color: "#fff" }}>
            <Building2 size={17} />
          </span>
        ) : (
          <BrandMark name={name} logo={commerceIdentity.logo} variant="selector" />
        )}
        <span className="nx-sb-switch-txt">
          <span className="nx-sb-switch-name">{name}</span>
          <span className="nx-sb-switch-sub">{sub}</span>
        </span>
        <ChevronsUpDown size={15} style={{ color: "var(--text-3)", flexShrink: 0 }} />
      </button>
      {open && (
        <div className="nx-dd left" style={{ top: "calc(100% + 4px)", width: "100%", minWidth: 256 }}>
          <div className="nx-dd-label">Workspace</div>
          <button className="nx-dd-item" onClick={() => setOpen(false)}>
            <span className="nx-choice-ic" style={{ width: 28, height: 28, background: "#14161d", color: "#fff" }}>
              <Building2 size={14} />
            </span>
            <span style={{ flex: 1, textAlign: "start" }}>{currentWorkspace?.name ?? "Workspace"}</span>
            <Check size={15} style={{ color: "var(--accent)" }} />
          </button>
          {mode === "commerce" && BUSINESS_UNITS.length > 0 && (
            <>
              <div className="nx-dd-label">Business unit</div>
              {BUSINESS_UNITS.map((bu) => {
                const isCurrent = bu.id === currentBU?.id;
                const buName = isCurrent ? commerceIdentity.name : bu.name;
                const buMeta = isCurrent ? `${bu.name} · Commerce OS` : "Commerce OS";

                return (
                  <button
                    key={bu.id}
                    className="nx-dd-item"
                    onClick={() => { setCurrent({ currentBusinessUnitId: bu.id }); setOpen(false); }}
                  >
                    {isCurrent ? (
                      <BrandMark name={commerceIdentity.name} logo={commerceIdentity.logo} variant="selector" />
                    ) : (
                      <span className="nx-choice-ic" style={{ width: 32, height: 32, background: "var(--accent-weak)", color: "var(--accent)" }}>
                        <Store size={15} />
                      </span>
                    )}
                    <span className="nx-dd-item-text">
                      <span className="nx-dd-item-main">{buName}</span>
                      <span className="nx-dd-item-sub">{buMeta}</span>
                    </span>
                    {isCurrent && <Check size={15} style={{ color: "var(--accent)" }} />}
                  </button>
                );
              })}
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
                  <span className="nx-choice-ic" style={{ width: 28, height: 28 }}>
                    <MapPin size={14} />
                  </span>
                  <span style={{ flex: 1, textAlign: "start" }}>{br.name}</span>
                  {br.id === currentBranch?.id && <Check size={15} style={{ color: "var(--accent)" }} />}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
