"use client";

import { Badge } from "@/components/dashboard/Badge";
import { Icon, type IconName } from "@/components/ui/Icon";
import { type ShopsMode } from "@/lib/mode";

interface SalesModelOption {
  id: ShopsMode;
  icon: IconName;
  title: string;
  desc: string;
  features: readonly string[];
  tint: "emerald" | "blue" | "cyan";
  recommended?: boolean;
}

const models: SalesModelOption[] = [
  {
    id: "physical",
    icon: "dashboard",
    title: "Physical store only",
    desc: "Sell in-person at a brick-and-mortar location.",
    features: ["POS", "Branch operations", "Inventory", "Walk-in customers"],
    tint: "emerald",
  },
  {
    id: "online",
    icon: "shopping-bag",
    title: "Online store only",
    desc: "Sell exclusively through your e-commerce website.",
    features: ["Product catalog", "Online orders", "Storefront", "Customer checkout"],
    tint: "blue",
  },
  {
    id: "both",
    icon: "layers",
    title: "Both physical + online",
    desc: "Manage in-store and online sales from one place.",
    features: ["Unified inventory", "POS", "Storefront", "Reports"],
    tint: "cyan",
    recommended: true,
  },
];

const tintMap: Record<SalesModelOption["tint"], string> = {
  emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
  blue: "text-blue-400 border-blue-500/20 bg-blue-500/10",
  cyan: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
};

export interface StepSalesModelProps {
  selected: ShopsMode | null;
  onSelect: (model: ShopsMode) => void;
}

export function StepSalesModel({
  selected,
  onSelect,
}: StepSalesModelProps) {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <p className="chip text-gray-500">{"// sales model"}</p>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          How do you sell?
        </h2>
        <p className="max-w-2xl text-sm text-gray-400">
          Choose how customers reach your products. This shapes which modules are turned on.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:gap-5">
        {models.map((model) => {
          const isSelected = selected === model.id;

          return (
            <button
              key={model.id}
              type="button"
              onClick={() => onSelect(model.id)}
              aria-pressed={isSelected}
              className={`relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all sm:p-6 ${
                isSelected
                  ? "border-blue-500/50 ring-1 ring-blue-500/30"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              {isSelected && (
                <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r bg-blue-500" />
              )}

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex flex-1 items-start gap-4">
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border ${tintMap[model.tint]}`}
                  >
                    <Icon name={model.icon} className="h-6 w-6" strokeWidth={2} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-white sm:text-lg">
                        {model.title}
                      </h3>
                      {model.recommended && (
                        <Badge color="emerald">Recommended</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-white/50">{model.desc}</p>
                  </div>
                </div>

                <div className="grid gap-2 sm:w-[240px] sm:border-l sm:border-white/10 sm:pl-6">
                  {model.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-white/70"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5 flex-shrink-0 text-blue-400 opacity-100"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
