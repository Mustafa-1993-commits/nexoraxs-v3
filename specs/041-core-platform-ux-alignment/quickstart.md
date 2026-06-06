# Quickstart: Core Platform UX Alignment

**Feature**: 041-core-platform-ux-alignment
**Date**: 2026-06-03

---

## Implementation Order

Build in this dependency order (each group depends on the previous):

1. **Foundation** (blocks everything else)
   - `lib/core-session.ts` — all 12 session key helpers
   - `lib/core-theme.ts` — theme helpers
   - `lib/locale.ts` — update LOCALE_KEY to "core_locale"
   - `components/CoreProvider.tsx` — applies locale + theme to `<html>`
   - `app/layout.tsx` — swap LocaleProvider → CoreProvider
   - `app/globals.css` — add CSS theme vars

2. **Onboarding** (blocks dashboard guard)
   - `components/onboarding/OnboardingStepper.tsx`
   - `components/onboarding/steps/StepLanguage.tsx`
   - `components/onboarding/steps/StepWorkspace.tsx`
   - `components/onboarding/steps/StepBusinessUnit.tsx`
   - `components/onboarding/steps/StepBranch.tsx`
   - `app/onboarding/page.tsx` — rewrite

3. **Shell controls** (can run in parallel after Foundation)
   - `components/dashboard/LocaleToggle.tsx`
   - `components/dashboard/ThemeToggle.tsx`
   - `components/dashboard/NotificationsDropdown.tsx`
   - `components/dashboard/UserMenuDropdown.tsx`
   - `components/dashboard/Topbar.tsx` — add all 4 controls
   - `components/dashboard/Sidebar.tsx` — nav cleanup
   - `lib/mock-data/nav-items.ts` — 6 links

4. **New routes** (can run in parallel after Shell controls)
   - `app/dashboard/team/page.tsx` + `components/dashboard/InviteUserModal.tsx`
   - `app/dashboard/integrations/page.tsx`

5. **Product Hub + Settings** (last, after session keys are established)
   - `lib/mock-data/apps.ts` — add businessUnit field
   - `components/dashboard/AppCard.tsx` — businessUnit prop
   - `app/dashboard/apps/page.tsx` — read core_bu_name
   - `app/dashboard/settings/page.tsx` — MVP sections
   - `app/dashboard/layout.tsx` — onboarding guard

---

## File-by-File Guide

### 1. `lib/core-session.ts` (NEW)

One `get` + `set` function per key. No subscribe needed (values are written once during onboarding and read reactively only for theme/locale which are already in `locale.ts` and the new `core-theme.ts`). For simplicity, use direct sessionStorage access (no event system for workspace/BU/branch keys — they only change during onboarding):

```ts
const KEYS = {
  THEME: "core_theme",
  WORKSPACE_NAME: "core_workspace_name",
  WORKSPACE_COUNTRY: "core_workspace_country",
  WORKSPACE_CURRENCY: "core_workspace_currency",
  WORKSPACE_TIMEZONE: "core_workspace_timezone",
  BU_NAME: "core_bu_name",
  BU_INDUSTRY: "core_bu_industry",
  BRANCH_NAME: "core_branch_name",
  BRANCH_CITY: "core_branch_city",
  BRANCH_COUNTRY: "core_branch_country",
  ONBOARDING_DONE: "core_onboarding_done",
} as const;

function ss(key: string): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(key);
}
function sw(key: string, value: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(key, value);
}

export const getTheme = (): "light" | "dark" => (ss(KEYS.THEME) === "light" ? "light" : "dark");
export const setThemeKey = (v: "light" | "dark") => sw(KEYS.THEME, v);
export const getWorkspaceName = () => ss(KEYS.WORKSPACE_NAME);
export const setWorkspaceName = (v: string) => sw(KEYS.WORKSPACE_NAME, v);
// ... repeat pattern for all 12 keys ...
export const isOnboardingDone = () => ss(KEYS.ONBOARDING_DONE) === "true";
export const completeOnboarding = () => sw(KEYS.ONBOARDING_DONE, "true");
```

### 2. `lib/core-theme.ts` (NEW)

Theme uses events for reactive updates (since ThemeToggle can change it while dashboard is mounted):

```ts
const THEME_KEY = "core_theme";
const THEME_EVENT = "nexoraxs:theme-change";

export type Theme = "light" | "dark";

export function getTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return sessionStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
}

export function setTheme(value: Theme): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(THEME_KEY, value);
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function subscribeToTheme(cb: () => void): () => void {
  window.addEventListener(THEME_EVENT, cb);
  return () => window.removeEventListener(THEME_EVENT, cb);
}
```

### 3. `lib/locale.ts` (MODIFY — 1 line)

```ts
// Old
const LOCALE_KEY = "nexoraxs_locale";
// New
const LOCALE_KEY = "core_locale";
```

### 4. `components/CoreProvider.tsx` (NEW — replaces LocaleProvider)

```tsx
"use client";
import { useEffect, useSyncExternalStore } from "react";
import { getLocale, subscribeToLocale } from "@/lib/locale";
import { getTheme, subscribeToTheme } from "@/lib/core-theme";

export function CoreProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribeToLocale, getLocale, () => "en" as const);
  const theme  = useSyncExternalStore(subscribeToTheme,  getTheme,  () => "dark" as const);

  useEffect(() => {
    document.documentElement.dir  = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
}
```

### 5. `app/layout.tsx` (MODIFY)

```tsx
// Change import:
import { CoreProvider } from "@/components/CoreProvider";
// Remove: import { LocaleProvider } from "@/components/LocaleProvider";

// In JSX: replace <LocaleProvider> with <CoreProvider>
```

### 6. `app/globals.css` (MODIFY — add theme system)

After the existing `:root` block, add:

```css
:root {
  --bg-page: #0a0a0f;
  --bg-surface: rgba(255,255,255,0.04);
  --border-default: rgba(255,255,255,0.08);
  --text-primary: #e5e7eb;
  --text-muted: rgba(255,255,255,0.5);
}

[data-theme="light"] {
  --bg-page: #f8fafc;
  --bg-surface: #ffffff;
  --border-default: #e2e8f0;
  --text-primary: #0f172a;
  --text-muted: #64748b;
}

body {
  background: var(--bg-page);
  color: var(--text-primary);
}

.card {
  background: var(--bg-surface);
  border-color: var(--border-default);
}
```

### 7. Onboarding page structure

```tsx
export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>(1);
  // Step-level form state per step
  // Guards: useEffect checks isOnboardingDone() → redirect to /dashboard
  return (
    <div data-theme="inherit"> {/* inherits from html */}
      <OnboardingTopbar /> {/* Logo + LocaleToggle + ThemeToggle */}
      <main className="flex min-h-screen items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          <OnboardingStepper currentStep={step} />
          <div className="mt-8 card rounded-2xl p-8">
            {step === 1 && <StepLanguage onNext={() => setStep(2)} />}
            {step === 2 && <StepWorkspace onNext={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <StepBusinessUnit onNext={() => setStep(4)} onBack={() => setStep(2)} />}
            {step === 4 && <StepBranch onFinish={handleFinish} onBack={() => setStep(3)} />}
          </div>
        </div>
      </main>
    </div>
  );
}
```

### 8. Sidebar nav-items.ts (MODIFY)

Replace array with 6 items. Add "Team & Access" (`icon: "users"`, href: `/dashboard/team`) and "Integrations" (`icon: "layers"`, href: `/dashboard/integrations`). Remove resources array. Remove the bottom beta card from `Sidebar.tsx`.

### 9. Topbar.tsx (MODIFY)

Right side of topbar:
```tsx
<div className="flex items-center gap-2">
  <LocaleToggle />
  <ThemeToggle />
  <NotificationsDropdown />
  <UserMenuDropdown />
</div>
```

### 10. `app/dashboard/layout.tsx` (MODIFY — add onboarding guard)

```tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isOnboardingDone } from "@/lib/core-session";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    if (!isOnboardingDone()) router.replace("/onboarding");
  }, [router]);
  // ... existing layout JSX
}
```

---

## Verification Checklist

After implementation:

- [ ] `pnpm --filter core-platform build` passes — zero TypeScript errors
- [ ] Visiting `/` with no session redirects to `/onboarding`
- [ ] Onboarding: horizontal stepper shows 4 steps with correct active/completed states
- [ ] Step 1: selecting Arabic immediately flips layout to RTL
- [ ] Completing Step 4 writes `core_onboarding_done = "true"` and redirects to `/dashboard`
- [ ] Visiting `/onboarding` after completion redirects to `/dashboard`
- [ ] Visiting `/dashboard` before completion redirects to `/onboarding`
- [ ] ThemeToggle switches between dark and light; change persists on page refresh within session
- [ ] LocaleToggle switches EN/AR; `document.dir` updates immediately without reload
- [ ] Sidebar shows exactly 6 primary links; no Documentation/Changelog/Support
- [ ] Topbar shows LocaleToggle, ThemeToggle, Notifications bell, User avatar
- [ ] Clicking Notifications opens dropdown with 3 mock items
- [ ] Clicking User avatar opens menu with Account (disabled), Billing (navigates), Team (navigates), Sign out (clears + redirects)
- [ ] Product Hub: Commerce OS card shows BU name pill from session
- [ ] Product Hub: no "Apps" text anywhere
- [ ] `/dashboard/team` page loads; Invite User button opens modal with all 7 fields
- [ ] Invite modal: empty email shows validation error; valid submit adds mock member
- [ ] `/dashboard/integrations` page loads with 5 integration cards
- [ ] All visible buttons are either functional, navigating, or disabled/Coming Soon
- [ ] Light mode: page background changes to `#f8fafc`, card backgrounds to white
- [ ] Arabic mode: layout direction is RTL throughout
