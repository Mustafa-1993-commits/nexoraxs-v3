"use client";

import { Badge, Icon, type IconName } from "@nexoraxs/ui";
import { type BusinessType } from "@/lib/mode";

export interface BusinessTypeOption {
  id: BusinessType;
  icon: IconName;
  title: string;
  desc: string;
  examples: string;
  tintText: string;
  tintBg: string;
  tintBorder: string;
}

const categories: BusinessTypeOption[] = [
  {
    id: "mobile",
    icon: "smartphone",
    title: "Mobile Store",
    desc: "Phones, tablets, and repairs",
    examples: "iPhone, Samsung, accessories",
    tintText: "text-cyan-400",
    tintBg: "bg-cyan-500/10",
    tintBorder: "border-cyan-500/20",
  },
  {
    id: "accessories",
    icon: "watch",
    title: "Accessories Store",
    desc: "Tech and lifestyle add-ons",
    examples: "Cases, chargers, headphones",
    tintText: "text-violet-400",
    tintBg: "bg-violet-500/10",
    tintBorder: "border-violet-500/20",
  },
  {
    id: "clothing",
    icon: "shirt",
    title: "Clothing Store",
    desc: "Apparel and fashion",
    examples: "Apparel, shoes, seasonal",
    tintText: "text-pink-400",
    tintBg: "bg-pink-500/10",
    tintBorder: "border-pink-500/20",
  },
  {
    id: "supermarket",
    icon: "shopping-cart",
    title: "Supermarket",
    desc: "Groceries and daily needs",
    examples: "Groceries, FMCG, household",
    tintText: "text-emerald-400",
    tintBg: "bg-emerald-500/10",
    tintBorder: "border-emerald-500/20",
  },
  {
    id: "electronics",
    icon: "cpu",
    title: "Electronics Store",
    desc: "Computers and home appliances",
    examples: "Laptops, TVs, appliances",
    tintText: "text-blue-400",
    tintBg: "bg-blue-500/10",
    tintBorder: "border-blue-500/20",
  },
  {
    id: "cosmetics",
    icon: "sparkles",
    title: "Cosmetics Store",
    desc: "Beauty and personal care",
    examples: "Makeup, skincare, fragrance",
    tintText: "text-fuchsia-400",
    tintBg: "bg-fuchsia-500/10",
    tintBorder: "border-fuchsia-500/20",
  },
  {
    id: "other",
    icon: "store-front",
    title: "Other Retail",
    desc: "General retail business",
    examples: "Tell us more in settings",
    tintText: "text-gray-400",
    tintBg: "bg-white/5",
    tintBorder: "border-white/10",
  },
];

export interface StepBusinessTypeProps {
  selected: BusinessType | null;
  onSelect: (type: BusinessType) => void;
}

export function StepBusinessType({
  selected,
  onSelect,
}: StepBusinessTypeProps) {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <p className="chip text-gray-500">{"// business type"}</p>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          What type of shop do you run?
        </h2>
        <p className="max-w-2xl text-sm text-gray-400">
          We&apos;ll tailor your workspace based on the products you sell.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {categories.map((category) => {
          const isSelected = selected === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              aria-pressed={isSelected}
              className={`group relative rounded-2xl border p-5 text-left transition-all ${
                isSelected
                  ? "border-blue-500/50 bg-blue-500/[0.05] ring-1 ring-blue-500/30"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              {isSelected && (
                <div className="absolute right-5 top-5">
                  <Badge variant="info">Selected</Badge>
                </div>
              )}

              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border ${category.tintBg} ${category.tintBorder} ${category.tintText}`}
              >
                <Icon name={category.icon} className="h-6 w-6" strokeWidth={2} />
              </div>

              <h3 className="text-base font-semibold text-white sm:text-lg">
                {category.title}
              </h3>
              <p className="mt-1 text-sm text-white/50">{category.desc}</p>

              <div className="mt-4 border-t border-white/5 pt-4">
                <p className="text-xs text-white/40">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/20">
                    Ex:
                  </span>{" "}
                  {category.examples}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
