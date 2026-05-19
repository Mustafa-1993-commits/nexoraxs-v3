# Tasks: Core Mock Account Session

**Input**: `specs/026-core-mock-account-session/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅
**Tests**: Not requested — no test tasks generated.
**Scope**: 6 files in `apps/core-platform`. No new packages, no API, no new routes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on in-progress tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup (Read Current State)

**Purpose**: Read all target files before editing to confirm current structure matches research.md findings.

- [X] T001 Read `apps/core-platform/lib/session.ts` and confirm existing exports
- [X] T002 [P] Read `apps/core-platform/app/register/page.tsx` and confirm uncontrolled input structure
- [X] T003 [P] Read `apps/core-platform/app/login/page.tsx` and confirm `handleSignIn` signature
- [X] T004 [P] Read `apps/core-platform/app/onboarding/page.tsx` and confirm `subscribeToNothing` pattern and Team owner SummaryCard
- [X] T005 [P] Read `apps/core-platform/app/workspaces/page.tsx` and confirm hardcoded user pill values
- [X] T006 [P] Read `apps/core-platform/components/dashboard/Topbar.tsx` and confirm hardcoded user button values

---

## Phase 2: Foundational (Blocking Prerequisite)

**Purpose**: Add the four mock user helpers to `lib/session.ts`. Every user story phase depends on these exports being present — TypeScript strict mode will surface missing imports immediately.

**⚠️ CRITICAL**: All user story tasks depend on this phase completing first.

- [X] T007 Add constants `MOCK_USER_NAME_KEY = "core_mock_user_name"` and `MOCK_USER_EMAIL_KEY = "core_mock_user_email"` plus `FALLBACK_NAME = "Workspace owner"` and `FALLBACK_EMAIL = "owner@nexoraxs.local"` to `apps/core-platform/lib/session.ts`
- [X] T008 Add `saveMockUser(name: string, email: string): void` export to `apps/core-platform/lib/session.ts` — sets both keys, applies name fallback if empty, never stores password
- [X] T009 Add `getMockUserName(): string | null` export to `apps/core-platform/lib/session.ts` — returns `sessionStorage.getItem(MOCK_USER_NAME_KEY)` with SSR guard
- [X] T010 Add `getMockUserEmail(): string | null` export to `apps/core-platform/lib/session.ts` — returns `sessionStorage.getItem(MOCK_USER_EMAIL_KEY)` with SSR guard
- [X] T011 Add `initMockUserFallback(): void` export to `apps/core-platform/lib/session.ts` — writes fallback values only when keys are absent or empty (idempotent)

**Checkpoint**: `lib/session.ts` exports `saveMockUser`, `getMockUserName`, `getMockUserEmail`, `initMockUserFallback`. TypeScript compilation confirms no errors in the module.

---

## Phase 3: User Story 1 — Mock Account Creation via Register (Priority: P1) 🎯 MVP

**Goal**: Register page captures name and email from controlled inputs, saves them to session via `saveMockUser`, then routes to `/login`. Password is never stored.

**Independent Test**: Navigate to `/register`. Enter full name "Mustafa Mohamed" and email "mustafa@example.com". Click "Create Account". Verify navigation to `/login`. Open DevTools → Application → Session Storage. Confirm `core_mock_user_name = "Mustafa Mohamed"` and `core_mock_user_email = "mustafa@example.com"` are present. Confirm no password key exists.

### Implementation for User Story 1

- [X] T012 [US1] Add `useState<string>("")` for `name` and `useState<string>("")` for `email` in `apps/core-platform/app/register/page.tsx`
- [X] T013 [US1] Add `value={name}` and `onChange={(e) => setName(e.target.value)}` to the Full name `<Input>` in `apps/core-platform/app/register/page.tsx`
- [X] T014 [US1] Add `value={email}` and `onChange={(e) => setEmail(e.target.value)}` to the Email address `<Input>` in `apps/core-platform/app/register/page.tsx`
- [X] T015 [US1] Import `saveMockUser` from `@/lib/session` and update the Create Account button `onClick` to call `saveMockUser(name.trim(), email.trim())` before `router.push("/login")` in `apps/core-platform/app/register/page.tsx`

**Checkpoint**: Register with "Mustafa Mohamed" / "mustafa@example.com" → session contains both keys → routed to `/login` → no password key present.

---

## Phase 4: User Story 2 — Login Routing and Fallback Initialisation (Priority: P1)

**Goal**: Login page calls `initMockUserFallback` on Sign In, writing safe defaults if no mock user exists. Existing routing logic (onboarding vs workspaces) is unchanged.

**Independent Test**: (A) Clear session storage. Navigate to `/login`. Click "Sign In". Confirm routing is correct. Open DevTools → confirm `core_mock_user_name = "Workspace owner"` and `core_mock_user_email = "owner@nexoraxs.local"`. (B) Register first ("Mustafa Mohamed"), then Sign In — confirm existing values are NOT overwritten by fallback.

### Implementation for User Story 2

- [X] T016 [US2] Import `initMockUserFallback` from `@/lib/session` in `apps/core-platform/app/login/page.tsx`
- [X] T017 [US2] Call `initMockUserFallback()` as the first line of `handleSignIn` in `apps/core-platform/app/login/page.tsx`, before the `router.push` call — routing logic unchanged

**Checkpoint**: Sign In without prior Register writes fallback values. Sign In after Register preserves registered values.

---

## Phase 5: User Story 3 — Identity Displayed Across Core Platform (Priority: P2)

**Goal**: Workspaces page user pill, Workspace Onboarding Step 3 Team owner card, and Dashboard Topbar user button all display `core_mock_user_name` (and email where applicable) from session. No hardcoded names remain. All reads use `useSyncExternalStore` for SSR safety.

**Independent Test**: Register as "Mustafa Mohamed" with "mustafa@example.com". Navigate through the full flow. On Workspaces page: confirm "Mustafa Mohamed" and "mustafa@example.com" appear in the user pill. On Onboarding Step 3 Review: confirm Team owner shows "Mustafa Mohamed". On Dashboard: confirm Topbar shows "Mustafa Mohamed" and initials "MM". Separately: clear session, sign in directly, confirm all surfaces show "Workspace owner" / "owner@nexoraxs.local" / "WO" initials.

### Implementation for User Story 3 — Onboarding Team Owner

- [X] T018 [US3] Import `getMockUserName` from `@/lib/session` in `apps/core-platform/app/onboarding/page.tsx`
- [X] T019 [US3] Add `useSyncExternalStore` call inside `OnboardingPage` using the existing `subscribeToNothing` constant to read `getMockUserName() ?? "Workspace owner"` as `mockUserName` in `apps/core-platform/app/onboarding/page.tsx`
- [X] T020 [US3] Replace the hardcoded `value="Workspace owner"` on the Team owner `SummaryCard` with `value={mockUserName}` in `apps/core-platform/app/onboarding/page.tsx`

### Implementation for User Story 3 — Workspaces Page User Pill

- [X] T021 [P] [US3] Add `subscribeToNothing` constant, `getInitials` helper function, and `useSyncExternalStore` import to `apps/core-platform/app/workspaces/page.tsx`
- [X] T022 [US3] Add `useSyncExternalStore` calls for `userName` (from `getMockUserName()`) and `userEmail` (from `getMockUserEmail()`) inside `WorkspacesPage` component in `apps/core-platform/app/workspaces/page.tsx`
- [X] T023 [US3] Replace hardcoded `"MA"` initials, `"Mustafa A."` name, and `"mustafa@nexoraxs.com"` email in the user pill with `{getInitials(userName)}`, `{userName}`, and `{userEmail}` in `apps/core-platform/app/workspaces/page.tsx`

### Implementation for User Story 3 — Dashboard Topbar

- [X] T024 [P] [US3] Add `useSyncExternalStore` import, `subscribeToNothing` constant, and `getInitials` helper function to `apps/core-platform/components/dashboard/Topbar.tsx`
- [X] T025 [US3] Add `useSyncExternalStore` call for `userName` (from `getMockUserName() ?? "Workspace owner"`) inside `Topbar` component in `apps/core-platform/components/dashboard/Topbar.tsx`
- [X] T026 [US3] Replace hardcoded `"MA"` initials and `"Mustafa A."` name in the user button with `{getInitials(userName)}` and `{userName}` in `apps/core-platform/components/dashboard/Topbar.tsx` — keep the `"Owner"` role label unchanged

**Checkpoint**: All three surfaces show mock user data. No "Mustafa A.", "Mustafa Ahmed", or "MA" hardcodes remain. Fallback values display correctly when session is empty.

---

## Phase 6: Polish & Validation

**Purpose**: Confirm zero lint errors, zero TypeScript errors, clean build.

- [X] T027 [P] Run `pnpm --filter core-platform lint` — confirm zero errors across all 6 modified files
- [X] T028 [P] Run `pnpm --filter core-platform build` — confirm zero TypeScript errors and zero build errors
- [X] T029 Verify no hardcoded personal name strings remain: run `grep -r "Mustafa A\." apps/core-platform/` and `grep -r "Mustafa Ahmed" apps/core-platform/` — both should return empty

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — read files in parallel
- **Phase 2 (Foundational)**: Depends on Phase 1 — session helpers BLOCK all user story tasks
- **Phase 3 (US1)**: Depends on Phase 2 — register page imports `saveMockUser`
- **Phase 4 (US2)**: Depends on Phase 2 — login page imports `initMockUserFallback`; can run in parallel with Phase 3 (different file)
- **Phase 5 (US3)**: Depends on Phase 2 — imports `getMockUserName`/`getMockUserEmail`; can start after Phase 2 (logically after US1+US2 set the data, but the components themselves only need the helpers to exist)
- **Phase 6 (Polish)**: Depends on all prior phases

### User Story Dependencies

- **US1 (Phase 3)** and **US2 (Phase 4)**: Both depend only on Phase 2 (session helpers) — can run in parallel since they touch different files
- **US3 (Phase 5)**: Depends only on Phase 2 for TypeScript correctness; logically follows US1+US2 but implementation-wise can run concurrently

### Within Each Phase

- T007–T011 (Phase 2): Sequential — all in the same file (`lib/session.ts`)
- T012–T015 (Phase 3): Sequential — all in `register/page.tsx`
- T016–T017 (Phase 4): Sequential — both in `login/page.tsx`
- T018–T020 (Phase 5, onboarding): Sequential — same file
- T021–T023 (Phase 5, workspaces): Sequential — same file
- T024–T026 (Phase 5, topbar): Sequential — same file
- T021/T024 can run in parallel with T018 (different files within Phase 5)
- T027/T028 in Phase 6 can run in parallel

---

## Parallel Opportunities

```
Phase 1 — all reads in parallel:
  T001 (session.ts)
  T002 (register)    ← parallel
  T003 (login)       ← parallel
  T004 (onboarding)  ← parallel
  T005 (workspaces)  ← parallel
  T006 (Topbar)      ← parallel

Phase 2 — sequential (same file):
  T007 → T008 → T009 → T010 → T011

After Phase 2:
  Phase 3 (register)   ← parallel with Phase 4 and Phase 5
  Phase 4 (login)      ← parallel with Phase 3 and Phase 5
  Phase 5 subgroups:
    T018→T020 (onboarding)  ← parallel with T021→T023 and T024→T026
    T021→T023 (workspaces)  ← parallel with T018→T020 and T024→T026
    T024→T026 (topbar)      ← parallel with T018→T020 and T021→T023

Phase 6:
  T027 (lint) ← parallel with T028 (build)
  T029 (grep check) — after T027 and T028
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1 (read files)
2. Complete Phase 2 (session helpers)
3. Complete Phase 3 (Register → saveMockUser)
4. **STOP and VALIDATE**: Register with real values, confirm session keys written
5. Proceed to Phase 4 + Phase 5

### Incremental Delivery

1. Phase 2 → Foundation ready
2. Phase 3 → Register saves identity *(MVP)*
3. Phase 4 → Login guarantees fallback
4. Phase 5 → Identity visible across platform
5. Phase 6 → Lint + build verified

---

## Notes

- [P] tasks = different files, no dependency on in-progress tasks in the same phase
- `useSyncExternalStore(() => () => {}, clientSnapshot, serverSnapshot)` is the established SSR-safe session read pattern in this codebase — do not use `useEffect` or direct `sessionStorage` reads in render
- `getInitials` helper is duplicated in workspaces and Topbar (two separate files) — this is intentional; no shared utility file is introduced (no new packages, no cross-app code)
- The `"Owner"` role label in Topbar is a role designation, not a name — it is never replaced with session data
- `initMockUserFallback` is idempotent — safe to call multiple times; only writes when keys are absent
- Password is never captured, stored, or logged — FR-003/FR-018 enforced at the task level (T015 description explicitly excludes password)
