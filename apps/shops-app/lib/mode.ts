export type ShopsMode = "business" | "store" | "both";

const KEY = "shops_mode";
const BRANCH_KEY = "shops_branch";
const CURRENCY_KEY = "shops_currency";
const ONBOARDING_KEY = "shops_onboarding_done";

export function setMode(mode: ShopsMode): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(KEY, mode);
  }
}

export function getMode(): ShopsMode | null {
  if (typeof window === "undefined") return null;
  const value = sessionStorage.getItem(KEY);
  if (value === "business" || value === "store" || value === "both") {
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
