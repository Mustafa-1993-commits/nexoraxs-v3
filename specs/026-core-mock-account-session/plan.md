# Implementation Plan: Core Mock Account Session

**Branch**: `027-mock-account-session` | **Date**: 2026-05-15 | **Spec**: [spec.md](./spec.md)

## Summary

Add a lightweight mock account identity layer to `apps/core-platform`. A new session helper module provides `saveMockUser`, `getMockUserName`, `getMockUserEmail`, and `initMockUserFallback`. The Register page becomes controlled (adds `useState` for name and email) and calls `saveMockUser` before routing. The Login page calls `initMockUserFallback` on Sign In to guarantee downstream pages always have identity data. The Workspaces page user pill, the Workspace Onboarding Step 3 Team owner card, and the Dashboard Topbar user button all read from session via `useSyncExternalStore` — the same SSR-safe pattern already used throughout this project.

---

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)
**Primary Dependencies**: Next.js 16.x (App Router), React 19.x (`useState`, `useSyncExternalStore`)
**Storage**: `sessionStorage` — keys `core_mock_user_name`, `core_mock_user_email`
**Testing**: None
**Target Platform**: Web (desktop + mobile)
**Project Type**: UI enhancement — controlled inputs + session read/write in 6 existing files
**Constraints**: No new packages; no API; no backend; no cross-app imports; no new routes

---

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I — Modular Monolith | ✅ Pass | All changes inside `apps/core-platform` |
| II — Multi-Tenant Isolation | N/A | No database |
| III — App Boundary Enforcement | ✅ Pass | No cross-app imports; helpers added to existing `lib/session.ts` |
| IV — Type Safety | ✅ Pass | All helpers typed; no `any`; controlled inputs use `string` state |
| V — SDK-First | N/A | No API calls |
| VI — Spec-Driven | ✅ Pass | Spec written before plan |

---

## Project Structure

### Documentation (this feature)

```text
specs/026-core-mock-account-session/
├── spec.md              ✅ written
├── plan.md              ✅ this file
├── research.md          (generated below)
└── checklists/
    └── requirements.md  ✅ written
```

### Source Code Changes

```text
apps/core-platform/
├── lib/
│   └── session.ts                          MODIFY — add mock user helpers
├── app/
│   ├── register/page.tsx                   MODIFY — controlled inputs + saveMockUser
│   ├── login/page.tsx                      MODIFY — initMockUserFallback on Sign In
│   └── onboarding/page.tsx                 MODIFY — Team owner reads core_mock_user_name
├── app/workspaces/page.tsx                 MODIFY — user pill reads from session
└── components/dashboard/Topbar.tsx         MODIFY — user button reads from session

AGENTS.md                                   MODIFY — update SPECKIT block to 026
```

---

## Detailed Implementation Notes

### 1. `lib/session.ts` — Mock User Helpers

Add four new exports after the existing workspace helpers:

```typescript
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
```

Rules:
- `saveMockUser` never receives or stores a password.
- `saveMockUser` applies name fallback at write time (empty string → "Workspace owner").
- `initMockUserFallback` is idempotent — only writes if key is absent or empty.
- All four functions guard `typeof window === "undefined"` for SSR safety.

---

### 2. `app/register/page.tsx` — Controlled Inputs + Save

**Current state**: Inputs are uncontrolled. Create Account onClick is `() => router.push("/login")`.

**Changes**:
- Add `useState<string>` for `name` and `email`.
- Pass `value={name}` + `onChange={(e) => setName(e.target.value)}` to the name `<Input>`.
- Pass `value={email}` + `onChange={(e) => setEmail(e.target.value)}` to the email `<Input>`.
- Import `saveMockUser` from `@/lib/session`.
- Button onClick: `saveMockUser(name.trim(), email.trim()); router.push("/login")`.
- Password `<Input>` is not captured — no change.

---

### 3. `app/login/page.tsx` — Fallback Initialisation

**Current state**: `handleSignIn` calls `router.push(isWorkspaceOnboardingComplete() ? "/workspaces" : "/onboarding")`.

**Change**: Import `initMockUserFallback` and call it before routing:

```typescript
const handleSignIn = () => {
  initMockUserFallback();
  router.push(isWorkspaceOnboardingComplete() ? "/workspaces" : "/onboarding");
};
```

No other changes. Routing logic is unchanged.

---

### 4. `app/onboarding/page.tsx` — Team Owner from Session

**Current state**: `<SummaryCard icon="users" label="Team owner" value="Workspace owner" />` — static fallback.

**Pattern**: This file already has `subscribeToNothing = () => () => {}` and uses `useSyncExternalStore`. Extend with:

```typescript
import { getMockUserName, ... } from "@/lib/session"; // add to existing import

// Inside OnboardingPage():
const mockUserName = useSyncExternalStore(
  subscribeToNothing,
  () => getMockUserName() ?? "Workspace owner",
  () => "Workspace owner",
);
```

Update the SummaryCard:
```tsx
<SummaryCard icon="users" label="Team owner" value={mockUserName} />
```

---

### 5. `app/workspaces/page.tsx` — User Pill from Session

**Current state**: Hardcoded `"MA"` initials, `"Mustafa A."` name, `"mustafa@nexoraxs.com"` email.

**Add module-level helper** (not exported):
```typescript
const subscribeToNothing = () => () => {};

function getInitials(name: string): string {
  return name.trim().split(/\s+/).filter(Boolean)
    .slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("") || "WO";
}
```

**Inside the component**:
```typescript
import { useSyncExternalStore } from "react";
import { getMockUserName, getMockUserEmail } from "@/lib/session";

const userName  = useSyncExternalStore(subscribeToNothing,
  () => getMockUserName()  ?? "Workspace owner",     () => "Workspace owner");
const userEmail = useSyncExternalStore(subscribeToNothing,
  () => getMockUserEmail() ?? "owner@nexoraxs.local", () => "owner@nexoraxs.local");
```

Update user pill JSX (replace hardcoded values):
```tsx
<div ...>{getInitials(userName)}</div>
<p className="text-xs font-medium text-white">{userName}</p>
<p className="font-mono text-[10px] text-white/40">{userEmail}</p>
```

---

### 6. `components/dashboard/Topbar.tsx` — User Button from Session

**Current state**: Hardcoded `"MA"` initials, `"Mustafa A."` name. The `"Owner"` role label is correct and stays.

**Add**:
```typescript
import { useSyncExternalStore } from "react";
import { getMockUserName } from "@/lib/session";

const subscribeToNothing = () => () => {};

function getInitials(name: string): string {
  return name.trim().split(/\s+/).filter(Boolean)
    .slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("") || "WO";
}
```

**Inside `Topbar`**:
```typescript
const userName = useSyncExternalStore(subscribeToNothing,
  () => getMockUserName() ?? "Workspace owner",
  () => "Workspace owner",
);
```

Update user button JSX:
```tsx
<div ...>{getInitials(userName)}</div>
<div className="text-xs font-medium text-white">{userName}</div>
<div className="font-mono text-[10px] text-white/40">Owner</div>
```

---

## Complexity Tracking

No constitution violations. Changes touch 6 files, all within `apps/core-platform`. The `useSyncExternalStore` pattern is already established — no new patterns introduced. The controlled input change in `register/page.tsx` is the only structural change; all other files are read-only session consumers. TypeScript strict mode enforces completeness at every callsite.
