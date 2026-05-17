"use client";

import type { ShopsMode } from "@/lib/mode";
import { Icon, type IconName } from "@nexoraxs/ui";

interface ModeCardProps {
  mode: ShopsMode;
  title: string;
  description: string;
  icon: IconName;
  features: string[];
  recommended?: boolean;
  selected: boolean;
  onSelect: (mode: ShopsMode) => void;
}

export function ModeCard({ mode, title, description, icon, features, recommended, selected, onSelect }: ModeCardProps) {
  return (
    <div className="relative">
      {recommended && (
        <span className="absolute -top-2.5 right-4 z-10 chip rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-400">
          Recommended
        </span>
      )}
      <button
        type="button"
        onClick={() => onSelect(mode)}
        className={`w-full rounded-2xl border p-5 text-left transition-all duration-200 ${
          selected
            ? "border-blue-500/50 bg-blue-500/5 shadow-[0_0_24px_-6px_rgba(59,130,246,0.35)]"
            : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 transition-colors ${
              selected ? "text-blue-400" : "text-gray-400"
            }`}
            style={{
              background: selected
                ? "linear-gradient(135deg,rgba(59,130,246,0.25),rgba(139,92,246,0.15))"
                : "rgba(255,255,255,0.05)",
            }}
          >
            <Icon name={icon} className="h-5 w-5" strokeWidth={1.8} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">{title}</span>
              {selected && (
                <span className="chip rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-blue-300">
                  Selected
                </span>
              )}
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-white/50">{description}</p>
            <ul className="mt-2.5 space-y-1">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-1.5 text-xs text-white/40">
                  <span className="h-1 w-1 flex-shrink-0 rounded-full bg-white/30" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`mt-0.5 h-5 w-5 flex-shrink-0 rounded-full border-2 transition-colors ${
              selected ? "border-blue-400 bg-blue-400" : "border-white/20 bg-transparent"
            }`}
          >
            {selected && (
              <svg viewBox="0 0 20 20" fill="white" className="h-full w-full p-0.5">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
      </button>
    </div>
  );
}
