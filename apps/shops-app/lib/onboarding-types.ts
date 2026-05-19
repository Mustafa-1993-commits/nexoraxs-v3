import type { IconName } from "@nexoraxs/ui";
import type { ShopsMode } from "@/lib/mode";

export interface OnboardingProduct {
  name: string;
  price: number;
  stock: number;
}

export interface StoreSetupFormData {
  storeName: string;
  branch: string;
  branchAddress: string;
  branchCountry: string;
  branchCurrency: string;
  branchTimezone: string;
}

export interface ModuleDefinition {
  id: string;
  label: string;
  icon: IconName;
  enabledFor: readonly ShopsMode[];
  disabledReason: string;
}

export const MODULE_DEFINITIONS: ModuleDefinition[] = [
  {
    id: "pos",
    label: "POS",
    icon: "scan-line",
    enabledFor: ["physical", "both"],
    disabledReason: "Not available for online-only stores",
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: "package-search",
    enabledFor: ["physical", "both"],
    disabledReason: "Not available for online-only stores",
  },
  {
    id: "branches",
    label: "Branches",
    icon: "building",
    enabledFor: ["physical", "both"],
    disabledReason: "Not available for online-only stores",
  },
  {
    id: "storefront",
    label: "Storefront",
    icon: "shopping-bag",
    enabledFor: ["online", "both"],
    disabledReason: "Not available for in-store-only stores",
  },
  {
    id: "orders",
    label: "Online Orders",
    icon: "receipt",
    enabledFor: ["online", "both"],
    disabledReason: "Not available for in-store-only stores",
  },
  {
    id: "checkout",
    label: "Checkout",
    icon: "credit-card",
    enabledFor: ["online", "both"],
    disabledReason: "Not available for in-store-only stores",
  },
  {
    id: "reports",
    label: "Reports",
    icon: "chart-bar",
    enabledFor: ["physical", "online", "both"],
    disabledReason: "",
  },
];
