"use client";

import { useState, useRef, useEffect } from "react";
import { GitBranch, ChevronDown, Check } from "lucide-react";
import { useApp } from "@/lib/store";

export function BranchPill() {
  const { currentBranch, BRANCHES, setCurrent } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  if (!currentBranch) return null;

  return (
    <div ref={ref} className="nx-pop-wrap">
      <button className="nx-branch-pill" onClick={() => setOpen((o) => !o)}>
        <GitBranch size={13} style={{ color: "#a5b4fc" }} />
        <span>{currentBranch.name}</span>
        <ChevronDown size={12} style={{ color: "#7b8294" }} />
      </button>

      {open && BRANCHES.length > 1 && (
        <div className="nx-dd" style={{ minWidth: 200 }}>
          <div className="nx-dd-label">Branch</div>
          {BRANCHES.map((br) => (
            <button
              key={br.id}
              className="nx-dd-item"
              onClick={() => { setCurrent({ currentBranchId: br.id }); setOpen(false); }}
            >
              <GitBranch size={14} />
              <span style={{ flex: 1, textAlign: "start" }}>{br.name}</span>
              {br.id === currentBranch.id && <Check size={14} style={{ color: "var(--accent)" }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
