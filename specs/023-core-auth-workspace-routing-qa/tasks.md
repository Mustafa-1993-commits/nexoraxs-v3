# Tasks: Core Auth & Workspace Routing QA

**Input**: Design documents from `/specs/023-core-auth-workspace-routing-qa/`
**Branch**: `024-core-auth-workspace-routing-qa`

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no incomplete task dependencies)
- **[Story]**: Which user story this task belongs to (US1–US3)

---

## Phase 1: Setup

**Purpose**: No shared infrastructure tasks for this feature — all changes are independent file edits. Proceed directly to user story phases.

*(No setup tasks — both story phases can start immediately in parallel.)*

---

## Phase 2: User Story 1 — Register: Create Account Routes to Login (Priority: P1) 🎯 MVP

**Goal**: Make the "Create Account" button on `/register` navigate to `/login` on click. No form validation. No credential handling.

**Independent Test**: Open `/register`. Click "Create Account". Confirm the browser navigates to `/login` without a 404 or error.

- [X] T001 [P] [US1] In `apps/core-platform/app/register/page.tsx`: add `"use client"` directive at the top of the file; add `import { useRouter } from "next/navigation"`; add `const router = useRouter()` inside the component function; add `onClick={() => router.push("/login")}` to the existing `<Button variant="primary" type="button">Create Account</Button>` — no other changes

**Checkpoint**: US1 done when clicking "Create Account" on `/register` navigates to `/login`.

---

## Phase 3: User Story 2 — Login: Route Based on Onboarding State (Priority: P1)

**Goal**: Make the "Sign In" button on `/login` read the `core_workspace_onboarding_done` session key at click time and navigate to `/onboarding` (if key absent) or `/workspaces` (if key present).

**Independent Test (first-time)**: Open `/login` in a fresh browser session with no session data. Click "Sign In". Confirm navigation to `/onboarding`.

**Independent Test (returning)**: Complete workspace onboarding so `core_workspace_onboarding_done` is set. Navigate to `/login`. Click "Sign In". Confirm navigation to `/workspaces`.

- [X] T002 [P] [US2] In `apps/core-platform/app/login/page.tsx`: add `"use client"` directive at the top of the file; add `import { useRouter } from "next/navigation"`; add `import { isWorkspaceOnboardingComplete } from "@/lib/session"`; add `const router = useRouter()` inside the component function; add `const handleSignIn = () => { router.push(isWorkspaceOnboardingComplete() ? "/workspaces" : "/onboarding"); }` inside the component function; add `onClick={handleSignIn}` to the existing `<Button variant="primary" type="button">Sign In</Button>` — no other changes

**Checkpoint**: US2 done when "Sign In" navigates to `/onboarding` in a fresh session and to `/workspaces` after onboarding completion.

---

## Phase 4: User Story 3 — Onboarding Finish Routes to App Launcher (Priority: P1)

**Goal**: Verify the end-to-end flow: onboarding completion writes the session flag, navigates to `/dashboard/apps`, and the App Launcher page renders with five app cards. No code changes — this is a verification phase.

**Independent Test**: Complete workspace onboarding Steps 1–3. Click "Continue to dashboard". Confirm `/dashboard/apps` renders with the App Launcher heading and five app cards (Shops enabled, four Coming Soon). Confirm `core_workspace_onboarding_done` is in DevTools Session Storage.

- [X] T003 [US3] Run `pnpm --filter core-platform build` from the monorepo root and confirm that `/dashboard/apps`, `/onboarding`, `/register`, and `/login` all appear in the compiled route list with zero build errors

**Checkpoint**: US3 done when the build confirms all routes compile and the App Launcher page renders correctly end-to-end.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Lint and typecheck verification for all modified files.

- [X] T004 [P] Run `pnpm --filter core-platform lint` from the monorepo root and fix any ESLint errors in `apps/core-platform/app/register/page.tsx` and `apps/core-platform/app/login/page.tsx`
- [X] T005 [P] Run `pnpm --filter core-platform tsc --noEmit` (or equivalent typecheck command) from the monorepo root and confirm zero TypeScript errors — specifically that the `isWorkspaceOnboardingComplete` import resolves correctly and `router.push` calls are typed correctly

---

## Dependencies & Execution Order

### Phase Dependencies

- **US1 (T001)**: No dependencies — start immediately
- **US2 (T002)**: No dependency on US1 — start immediately in parallel (different file)
- **US3 (T003)**: Depends on US1 and US2 being complete (the build will fail if "use client" + useRouter changes have TypeScript errors)
- **Polish (T004, T005)**: Depends on US1 and US2 complete; T004 and T005 can run in parallel

### User Story Dependencies

- **US1 and US2**: Fully independent — different files (`register/page.tsx` vs `login/page.tsx`), can be done simultaneously
- **US3**: Verification only — run after US1 and US2

### Parallel Opportunities

- T001 and T002 can run in parallel (different files: `register/page.tsx` vs `login/page.tsx`)
- T004 and T005 can run in parallel (lint vs typecheck are independent processes)

---

## Parallel Example: US1 and US2 Together

```
Parallel batch:
  T001 — apps/core-platform/app/register/page.tsx (add "use client" + onClick)
  T002 — apps/core-platform/app/login/page.tsx (add "use client" + conditional routing)
```

---

## Implementation Strategy

### MVP First (US1 alone)

1. T001 → Register button navigates to /login
2. **STOP and VALIDATE**: /register → click Create Account → lands on /login

### Full Routing Fix (all 3 stories)

1. T001 + T002 in parallel → both buttons wired
2. T003 → build verification
3. T004 + T005 in parallel → lint + typecheck

---

## Notes

- T001 and T002 are the only code changes in this feature — ~6 new lines total
- The `isWorkspaceOnboardingComplete` helper is already exported from `apps/core-platform/lib/session.ts` — no helper changes needed
- The session flag read in T002 happens inside `handleSignIn` (click handler), not on mount — no `useSyncExternalStore` or `useEffect` required
- The `Button` component already accepts `onClick?: () => void` — no component changes needed
- No new files, no new routes, no new packages
- T003 is a verification task only — `/dashboard/apps` already exists and requires no code change
