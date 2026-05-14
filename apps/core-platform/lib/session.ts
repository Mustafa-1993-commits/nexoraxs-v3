export interface WorkspaceSetup {
  workspaceName: string;
  slug: string;
  region: string;
  country: string;
  shopsEnabled: boolean;
}

const ONBOARDING_KEY = "core_workspace_onboarding_done";
const SETUP_KEY = "core_workspace_setup";

export function completeWorkspaceOnboarding(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ONBOARDING_KEY, "true");
}

export function isWorkspaceOnboardingComplete(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(ONBOARDING_KEY) === "true";
}

export function saveWorkspaceSetup(data: WorkspaceSetup): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SETUP_KEY, JSON.stringify(data));
}

export function saveWorkspaceCountry(country: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("core_workspace_country", country);
}
