"use client";

import { useSyncExternalStore } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { getMode, type ShopsMode } from "@/lib/mode";

interface Step {
  label: string;
  icon: IconName;
  description: string;
}

const steps: Record<ShopsMode, Step[]> = {
  business: [
    { label: "Review reports",        icon: "chart-bar",  description: "See today's sales summary" },
    { label: "Invite team member",    icon: "users",       description: "Add staff to your workspace" },
    { label: "Configure tax settings",icon: "settings",    description: "Set up VAT and tax rules" },
  ],
  store: [
    { label: "Add first product", icon: "package",        description: "Start building your catalogue" },
    { label: "Configure POS",     icon: "scan-line",      description: "Set up point of sale" },
    { label: "Set up inventory",  icon: "package-search", description: "Track stock levels" },
  ],
  both: [
    { label: "Add first product", icon: "package",   description: "Start building your catalogue" },
    { label: "Review reports",    icon: "chart-bar", description: "See today's sales summary" },
    { label: "Configure POS",     icon: "scan-line", description: "Set up point of sale" },
  ],
};

export function NextSteps() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const mode = mounted ? getMode() : null;

  if (!mounted) {
    return (
      <div className="card p-5">
        <p className="chip mb-1 text-gray-500">{"// next steps"}</p>
        <div className="h-4 w-32 rounded bg-white/5" />
        <div className="mt-4 flex gap-3">
          <div className="h-24 flex-1 rounded-xl bg-white/[0.02]" />
          <div className="h-24 flex-1 rounded-xl bg-white/[0.02]" />
          <div className="h-24 flex-1 rounded-xl bg-white/[0.02]" />
        </div>
      </div>
    );
  }

  const activeSteps = steps[mode ?? "both"];

  return (
    <div className="card p-5">
      <p className="chip mb-1 text-gray-500">{"// next steps"}</p>
      <h3 className="text-base font-semibold text-white">Where to go next</h3>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        {activeSteps.map((step) => (
          <a
            key={step.label}
            href="#"
            className="flex flex-1 items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:bg-white/5"
          >
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400">
              <Icon name={step.icon} className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <div>
              <div className="text-sm font-medium text-white">{step.label}</div>
              <div className="mt-0.5 text-xs text-white/40">{step.description}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
