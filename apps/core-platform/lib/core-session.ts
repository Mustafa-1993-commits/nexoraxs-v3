// @deprecated — use lib/store/ instead
import {
  readCoreSessionText,
  removeCoreSessionValue,
  writeCoreSessionText,
} from "./infrastructure/browser/core-session-storage";

const KEYS = {
  THEME:                "core_theme",
  WORKSPACE_NAME:       "core_workspace_name",
  WORKSPACE_COUNTRY:    "core_workspace_country",
  WORKSPACE_CURRENCY:   "core_workspace_currency",
  WORKSPACE_TIMEZONE:   "core_workspace_timezone",
  BU_NAME:              "core_bu_name",
  BU_INDUSTRY:          "core_bu_industry",
  BRANCH_NAME:          "core_branch_name",
  BRANCH_CITY:          "core_branch_city",
  BRANCH_COUNTRY:       "core_branch_country",
  ONBOARDING_DONE:      "core_onboarding_done",
} as const;

export const CORE_SESSION_KEYS = Object.values(KEYS);

function ss(key: string): string | null {
  return readCoreSessionText(key);
}

function sw(key: string, value: string): void {
  writeCoreSessionText(key, value);
}

export const getWorkspaceName    = () => ss(KEYS.WORKSPACE_NAME);
export const setWorkspaceName    = (v: string) => sw(KEYS.WORKSPACE_NAME, v);
export const getWorkspaceCountry = () => ss(KEYS.WORKSPACE_COUNTRY);
export const setWorkspaceCountry = (v: string) => sw(KEYS.WORKSPACE_COUNTRY, v);
export const getWorkspaceCurrency= () => ss(KEYS.WORKSPACE_CURRENCY);
export const setWorkspaceCurrency= (v: string) => sw(KEYS.WORKSPACE_CURRENCY, v);
export const getWorkspaceTimezone= () => ss(KEYS.WORKSPACE_TIMEZONE);
export const setWorkspaceTimezone= (v: string) => sw(KEYS.WORKSPACE_TIMEZONE, v);

export const getBUName     = () => ss(KEYS.BU_NAME);
export const setBUName     = (v: string) => sw(KEYS.BU_NAME, v);
export const getBUIndustry = () => ss(KEYS.BU_INDUSTRY);
export const setBUIndustry = (v: string) => sw(KEYS.BU_INDUSTRY, v);

export const getBranchName    = () => ss(KEYS.BRANCH_NAME);
export const setBranchName    = (v: string) => sw(KEYS.BRANCH_NAME, v);
export const getBranchCity    = () => ss(KEYS.BRANCH_CITY);
export const setBranchCity    = (v: string) => sw(KEYS.BRANCH_CITY, v);
export const getBranchCountry = () => ss(KEYS.BRANCH_COUNTRY);
export const setBranchCountry = (v: string) => sw(KEYS.BRANCH_COUNTRY, v);

export const isOnboardingDone  = () => ss(KEYS.ONBOARDING_DONE) === "true";
export const completeOnboarding= () => sw(KEYS.ONBOARDING_DONE, "true");

export function clearCoreSession(): void {
  for (const key of CORE_SESSION_KEYS) {
    removeCoreSessionValue(key);
  }
}
