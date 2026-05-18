import type { OnboardingProduct } from "@/lib/onboarding-types";

export type ShopsMode = "physical" | "online" | "both";
export type BusinessType =
  | "mobile"
  | "electronics"
  | "clothing"
  | "food-beverage"
  | "books-media"
  | "home-furniture"
  | "cosmetics"
  | "supermarket"
  | "other"
  | "accessories"; // legacy — kept for backward compat, not shown in UI grid

export interface CountryDefault {
  currency: string;
  timezone: string;
}

export const COUNTRY_DEFAULTS: Record<string, CountryDefault> = {
  "Egypt":                  { currency: "EGP", timezone: "Africa/Cairo"       },
  "Saudi Arabia":           { currency: "SAR", timezone: "Asia/Riyadh"        },
  "United Arab Emirates":   { currency: "AED", timezone: "Asia/Dubai"         },
  "Kuwait":                 { currency: "KWD", timezone: "Asia/Kuwait"        },
  "Qatar":                  { currency: "QAR", timezone: "Asia/Qatar"         },
  "Jordan":                 { currency: "JOD", timezone: "Asia/Amman"         },
  "Bahrain":                { currency: "BHD", timezone: "Asia/Bahrain"       },
  "Oman":                   { currency: "OMR", timezone: "Asia/Muscat"        },
  "Morocco":                { currency: "MAD", timezone: "Africa/Casablanca"  },
  "United States":          { currency: "USD", timezone: "America/New_York"   },
  "United Kingdom":         { currency: "GBP", timezone: "Europe/London"      },
};

const VALID_BUSINESS_TYPES: readonly BusinessType[] = [
  "mobile",
  "electronics",
  "clothing",
  "food-beverage",
  "books-media",
  "home-furniture",
  "cosmetics",
  "supermarket",
  "other",
  "accessories",
];

const KEY = "shops_mode";
const BRANCH_KEY = "shops_branch";
const CURRENCY_KEY = "shops_currency";
const ONBOARDING_KEY = "shops_onboarding_done";
const BUSINESS_TYPE_KEY = "shops_business_type";
const BUSINESS_TYPE_CUSTOM_KEY = "shops_business_type_custom";
const STORE_NAME_KEY = "shops_store_name";
const COUNTRY_KEY = "shops_country";
const BRANCH_ADDRESS_KEY = "shops_branch_address";
const TIMEZONE_KEY = "shops_timezone";
const PRODUCTS_KEY = "shops_onboarding_products";

export function setMode(mode: ShopsMode): void {
  if (typeof window !== "undefined") sessionStorage.setItem(KEY, mode);
}

export function getMode(): ShopsMode | null {
  if (typeof window === "undefined") return null;
  const value = sessionStorage.getItem(KEY);
  if (value === "physical" || value === "online" || value === "both") return value;
  return null;
}

export function clearMode(): void {
  if (typeof window !== "undefined") sessionStorage.removeItem(KEY);
}

export function setBranch(branch: string): void {
  if (typeof window !== "undefined") sessionStorage.setItem(BRANCH_KEY, branch);
}

export function getBranch(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(BRANCH_KEY);
}

export function setCurrency(currency: string): void {
  if (typeof window !== "undefined") sessionStorage.setItem(CURRENCY_KEY, currency);
}

export function getCurrency(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(CURRENCY_KEY);
}

export function setBusinessType(type: BusinessType): void {
  if (typeof window !== "undefined") sessionStorage.setItem(BUSINESS_TYPE_KEY, type);
}

export function getBusinessType(): BusinessType | null {
  if (typeof window === "undefined") return null;
  const value = sessionStorage.getItem(BUSINESS_TYPE_KEY);
  return VALID_BUSINESS_TYPES.includes(value as BusinessType) ? (value as BusinessType) : null;
}

export function setBusinessTypeCustom(label: string): void {
  if (typeof window !== "undefined") sessionStorage.setItem(BUSINESS_TYPE_CUSTOM_KEY, label);
}

export function getBusinessTypeCustom(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(BUSINESS_TYPE_CUSTOM_KEY);
}

export function setStoreName(name: string): void {
  if (typeof window !== "undefined") sessionStorage.setItem(STORE_NAME_KEY, name);
}

export function getStoreName(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(STORE_NAME_KEY);
}

export function setCountry(country: string): void {
  if (typeof window !== "undefined") sessionStorage.setItem(COUNTRY_KEY, country);
}

export function getCountry(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(COUNTRY_KEY);
}

export function setBranchAddress(addr: string): void {
  if (typeof window !== "undefined") sessionStorage.setItem(BRANCH_ADDRESS_KEY, addr);
}

export function getBranchAddress(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(BRANCH_ADDRESS_KEY);
}

export function setTimezone(tz: string): void {
  if (typeof window !== "undefined") sessionStorage.setItem(TIMEZONE_KEY, tz);
}

export function getTimezone(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TIMEZONE_KEY);
}

export function setOnboardingProducts(products: OnboardingProduct[]): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }
}

export function getOnboardingProducts(): OnboardingProduct[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(PRODUCTS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as OnboardingProduct[]) : [];
  } catch {
    return [];
  }
}

export function completeOnboarding(): void {
  if (typeof window !== "undefined") sessionStorage.setItem(ONBOARDING_KEY, "true");
}

export function isOnboardingComplete(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(ONBOARDING_KEY) === "true";
}

export function resetOnboarding(): void {
  if (typeof window !== "undefined") sessionStorage.removeItem(ONBOARDING_KEY);
}
