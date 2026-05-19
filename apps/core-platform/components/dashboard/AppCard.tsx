"use client";

import { useState } from "react";
import type { App } from "@/lib/mock-data/apps";
import { EnableModal } from "@/components/dashboard/EnableModal";

export function AppCard({ name, description, status, href, subtitle }: App) {
  const [enableModalOpen, setEnableModalOpen] = useState(false);

  const dimmed = status === "upgrade" || status === "coming-soon";

  return (
    <>
      <div
        className={`flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/20 ${dimmed ? "opacity-50" : ""}`}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base font-semibold text-white">{name}</h3>
          {status === "coming-soon" && (
            <span className="flex-shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/40">
              Coming Soon
            </span>
          )}
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
          {description}
        </p>
        {subtitle && (
          <span className="mt-2 block text-xs text-white/40">{subtitle}</span>
        )}
        <div className="mt-5">
          {status === "active" && href && (
            <a
              href={href}
              className="block w-full rounded-xl bg-blue-600 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-500"
            >
              Open →
            </a>
          )}
          {status === "enable" && (
            <button
              type="button"
              onClick={() => setEnableModalOpen(true)}
              className="w-full rounded-xl border border-white/20 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              Enable App
            </button>
          )}
          {status === "upgrade" && (
            <button
              type="button"
              className="w-full rounded-xl bg-amber-500/20 py-2.5 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-500/30"
            >
              Upgrade Plan
            </button>
          )}
          {status === "coming-soon" && (
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-xl border border-white/10 py-2.5 text-sm font-medium text-white/30"
            >
              Coming Soon
            </button>
          )}
        </div>
      </div>

      {enableModalOpen && (
        <EnableModal
          app={{ name, description }}
          onConfirm={() => setEnableModalOpen(false)}
          onClose={() => setEnableModalOpen(false)}
        />
      )}
    </>
  );
}
