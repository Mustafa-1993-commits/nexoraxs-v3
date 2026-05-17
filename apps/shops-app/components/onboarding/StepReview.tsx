"use client";

import { Badge, Icon, type IconName } from "@nexoraxs/ui";
import { type BusinessType, type ShopsMode } from "@/lib/mode";
import { type StoreSetupData } from "@/components/onboarding/StepStoreSetup";

interface SummaryItem {
  label: string;
  value: string;
  icon: IconName;
}

interface ModuleItem {
  label: string;
  icon: IconName;
}

const businessTypeLabel: Record<BusinessType, string> = {
  mobile: "Mobile Store",
  accessories: "Accessories Store",
  clothing: "Clothing Store",
  supermarket: "Supermarket",
  electronics: "Electronics Store",
  cosmetics: "Cosmetics Store",
  other: "Other Retail",
};

const salesModelLabel: Record<ShopsMode, string> = {
  physical: "Physical only",
  online: "Online only",
  both: "Physical + Online",
};

const baseModules: ModuleItem[] = [
  { label: "Dashboard", icon: "dashboard" },
  { label: "Products", icon: "package" },
  { label: "Inventory", icon: "package-search" },
  { label: "Customers", icon: "users" },
  { label: "Sales", icon: "receipt" },
  { label: "Reports", icon: "chart-bar" },
];

const nextActions = [
  "Add first product",
  "Set opening stock",
  "Invite team member",
  "Review settings",
];

function buildSummary(
  businessType: BusinessType | null,
  salesModel: ShopsMode | null,
  setup: StoreSetupData,
): SummaryItem[] {
  return [
    { label: "Workspace",         value: "Mustafa's Co.",                                               icon: "dashboard"    },
    { label: "Business Type",     value: businessType ? businessTypeLabel[businessType] : "Unselected",  icon: "package"      },
    { label: "Sales Model",       value: salesModel ? salesModelLabel[salesModel] : "Unselected",       icon: "shopping-bag" },
    { label: "Store Name",        value: setup.storeName    || "—",                                     icon: "file-text"    },
    { label: "Main Branch",       value: setup.branch       || "—",                                     icon: "map-pin"      },
    { label: "Branch country",    value: setup.branchCountry  || "—",                                   icon: "map-pin"      },
    { label: "Branch currency",   value: setup.branchCurrency || "—",                                   icon: "banknote"     },
  ];
}

function buildModules(salesModel: ShopsMode | null): ModuleItem[] {
  const modules = [...baseModules];

  if (salesModel === "physical" || salesModel === "both") {
    modules.splice(5, 0, { label: "POS", icon: "scan-line" });
  }

  if (salesModel === "online" || salesModel === "both") {
    modules.push({ label: "Storefront", icon: "shopping-bag" });
  }

  return modules;
}

export interface StepReviewProps {
  businessType: BusinessType | null;
  salesModel: ShopsMode | null;
  setup: StoreSetupData;
}

export function StepReview({
  businessType,
  salesModel,
  setup,
}: StepReviewProps) {
  const summary = buildSummary(businessType, salesModel, setup);
  const modules = buildModules(salesModel);

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            <div>
              <p className="chip text-gray-500">{"// review"}</p>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Your shop workspace is ready
              </h2>
            </div>
          </div>
          <p className="max-w-2xl text-sm text-gray-400">
            Review your setup. You can change anything later from Settings.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {summary.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/60">
                <Icon name={item.icon} className="h-4 w-4" />
              </div>
              <div className="text-xs uppercase tracking-wider text-white/30">
                {item.label}
              </div>
              <div className="mt-1 text-sm font-medium text-white">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="chip mb-1 text-gray-500">{"// enabled modules"}</p>
              <h3 className="text-base font-semibold text-white">Modules turned on</h3>
            </div>
            <Badge variant="info">{modules.length}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {modules.map((module) => (
              <div
                key={module.label}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
                  <Icon name={module.icon} className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-white">{module.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5 lg:col-span-1">
        <div className="card p-6">
          <p className="chip mb-3 text-gray-500">{"// next actions"}</p>
          <h3 className="text-base font-semibold text-white">Next recommended actions</h3>
          <div className="mt-4 space-y-3">
            {nextActions.map((action) => (
              <a
                key={action}
                href="#"
                onClick={(event) => event.preventDefault()}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/5"
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300">
                  <Icon name="arrow-up-right" className="h-4 w-4" />
                </span>
                <span className="text-sm text-white/80">{action}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <p className="chip mb-3 text-gray-500">{"// summary"}</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">Business Type</span>
              <span className="text-white">
                {businessType ? businessTypeLabel[businessType] : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">Sales Model</span>
              <span className="text-white">
                {salesModel ? salesModelLabel[salesModel] : "—"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">Store</span>
              <span className="text-white">{setup.storeName || "—"}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">Branch</span>
              <span className="text-white">{setup.branch || "—"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
