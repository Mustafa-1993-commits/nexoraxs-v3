export type ShopsMode = "physical" | "online" | "both";
export type BusinessType =
  | "mobile"
  | "accessories"
  | "clothing"
  | "supermarket"
  | "electronics"
  | "cosmetics"
  | "other";

const KEY = "shops_mode";
const BRANCH_KEY = "shops_branch";
const CURRENCY_KEY = "shops_currency";
const ONBOARDING_KEY = "shops_onboarding_done";
const BUSINESS_TYPE_KEY = "shops_business_type";
const STORE_NAME_KEY = "shops_store_name";
const COUNTRY_KEY = "shops_country";

const BUSINESS_TYPES: readonly BusinessType[] = [
  "mobile",
  "accessories",
  "clothing",
  "supermarket",
  "electronics",
  "cosmetics",
  "other",
];

export function setMode(mode: ShopsMode): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(KEY, mode);
  }
}

export function getMode(): ShopsMode | null {
  if (typeof window === "undefined") return null;
  const value = sessionStorage.getItem(KEY);
  if (value === "physical" || value === "online" || value === "both") {
    return value;
  }
  return null;
}

export function clearMode(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(KEY);
  }
}

export function setBranch(branch: string): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(BRANCH_KEY, branch);
  }
}

export function getBranch(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(BRANCH_KEY);
}

export function setCurrency(currency: string): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(CURRENCY_KEY, currency);
  }
}

export function getCurrency(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(CURRENCY_KEY);
}

export function setBusinessType(type: BusinessType): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(BUSINESS_TYPE_KEY, type);
  }
}

export function getBusinessType(): BusinessType | null {
  if (typeof window === "undefined") return null;
  const value = sessionStorage.getItem(BUSINESS_TYPE_KEY);
  return BUSINESS_TYPES.includes(value as BusinessType) ? (value as BusinessType) : null;
}

export function setStoreName(name: string): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(STORE_NAME_KEY, name);
  }
}

export function getStoreName(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(STORE_NAME_KEY);
}

export function setCountry(country: string): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(COUNTRY_KEY, country);
  }
}

export function getCountry(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(COUNTRY_KEY);
}

export function completeOnboarding(): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(ONBOARDING_KEY, "true");
  }
}

export function isOnboardingComplete(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(ONBOARDING_KEY) === "true";
}

export function resetOnboarding(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ONBOARDING_KEY);
  }
}
