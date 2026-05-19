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

const MOCK_USER_NAME_KEY  = "core_mock_user_name";
const MOCK_USER_EMAIL_KEY = "core_mock_user_email";

const FALLBACK_NAME  = "Workspace owner";
const FALLBACK_EMAIL = "owner@nexoraxs.local";

export function saveMockUser(name: string, email: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(MOCK_USER_NAME_KEY, name || FALLBACK_NAME);
  sessionStorage.setItem(MOCK_USER_EMAIL_KEY, email);
}

export function getMockUserName(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(MOCK_USER_NAME_KEY);
}

export function getMockUserEmail(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(MOCK_USER_EMAIL_KEY);
}

export function initMockUserFallback(): void {
  if (typeof window === "undefined") return;
  if (!sessionStorage.getItem(MOCK_USER_NAME_KEY)) {
    sessionStorage.setItem(MOCK_USER_NAME_KEY, FALLBACK_NAME);
  }
  if (!sessionStorage.getItem(MOCK_USER_EMAIL_KEY)) {
    sessionStorage.setItem(MOCK_USER_EMAIL_KEY, FALLBACK_EMAIL);
  }
}
