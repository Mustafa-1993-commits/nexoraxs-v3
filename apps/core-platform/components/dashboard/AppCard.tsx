"use client";

import type { OSItem } from "@/lib/mock-data/apps";

export function OSCard({ name, description, state, href }: OSItem) {
  const dimmed = state === "coming-soon" || state === "locked";

  return (
    <div
      className={`flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/20 ${dimmed ? "opacity-50" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold text-white">{name}</h3>
        {state === "coming-soon" && (
          <span className="flex-shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/40">
            Coming Soon
          </span>
        )}
        {state === "trial" && (
          <span className="flex-shrink-0 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs text-amber-400">
            Trial
          </span>
        )}
      </div>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
        {description}
      </p>

      <div className="mt-5">
        {state === "active" && href && (
          <a
            href={href}
            className="block w-full rounded-xl bg-blue-600 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-500"
          >
            Open →
          </a>
        )}
        {state === "trial" && href && (
          <a
            href={href}
            className="block w-full rounded-xl bg-purple-600 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-purple-500"
          >
            Open (Trial) →
          </a>
        )}
        {state === "locked" && (
          <a
            href="/dashboard/billing"
            className="block w-full rounded-xl bg-amber-500/20 py-2.5 text-center text-sm font-medium text-amber-400 transition-colors hover:bg-amber-500/30"
          >
            Upgrade Plan
          </a>
        )}
        {state === "coming-soon" && (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="w-full cursor-not-allowed rounded-xl border border-white/10 py-2.5 text-sm font-medium text-white/30"
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
}
