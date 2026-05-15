# Tasks: Full Mock User Journey QA

**Input**: `specs/027-full-mock-user-journey-qa/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅
**Tests**: Not requested.
**Scope**: 3 files in `apps/landing` only. All other journey steps are already implemented.

> The plan audit confirmed that US2–US8 are fully implemented across features 024–026 and earlier fixes.
> The only remaining gaps are 3 broken/inconsistent CTAs in `apps/landing`. This task list reflects that.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on in-progress tasks)
- **[Story]**: US1 = Landing CTAs (the only story requiring implementation work)

---

## Phase 1: Setup (Read Current State)

**Purpose**: Read all 3 target files to confirm the exact lines and href values that need changing.

- [X] T001 Read `apps/landing/src/sections/navbar/navbar.tsx` and confirm mobile Get Started is `href="#"` at the expected line
- [X] T002 [P] Read `apps/landing/src/sections/pricing/pricing.tsx` and confirm Join Beta CTA is `href="#"` at the expected line
- [X] T003 [P] Read `apps/landing/src/sections/cta/cta.tsx` and confirm Get Started CTA is `href="#pricing"` at the expected line

---

## Phase 2: Foundational

**No foundational phase required.** The `CORE_LOGIN_URL` pattern is already established in `navbar.tsx` (reused in T004) and follows the identical pattern in `hero.tsx`. No shared infrastructure changes are needed.

---

## Phase 3: User Story 1 — Landing CTAs Route Correctly (Priority: P1) 🎯

**Goal**: All "Get Started" and conversion CTA buttons on the landing page navigate to the Core Platform login page. No broken `href="#"` links remain.

**Independent Test**: Open the landing page. Resize to mobile and open the hamburger menu — verify "Get Started" navigates to Core Platform. Scroll to the Pricing section — verify "Join Beta" navigates to Core Platform. Scroll to the CTA section — verify "Get Started" navigates to Core Platform. Verify no `href="#"` remains on any CTA button in the landing page source.

### Implementation for User Story 1

- [X] T004 [US1] Replace `href="#"` on the mobile menu "Get Started" `<a>` tag with `href={CORE_LOGIN_URL}` in `apps/landing/src/sections/navbar/navbar.tsx` — the `CORE_LOGIN_URL` constant is already declared at the top of this file
- [X] T005 [P] [US1] Add `const CORE_LOGIN_URL = (process.env.NEXT_PUBLIC_CORE_PLATFORM_URL ?? "http://localhost:3001") + "/login"` at the top of `apps/landing/src/sections/pricing/pricing.tsx` and replace `href="#"` on the "Join Beta" `<a>` tag with `href={CORE_LOGIN_URL}`
- [X] T006 [P] [US1] Add `const CORE_LOGIN_URL = (process.env.NEXT_PUBLIC_CORE_PLATFORM_URL ?? "http://localhost:3001") + "/login"` at the top of `apps/landing/src/sections/cta/cta.tsx` and replace `href="#pricing"` on the "Get Started" `<a>` tag with `href={CORE_LOGIN_URL}`

**Checkpoint**: All landing CTAs now route to Core Platform. No `href="#"` or `href="#pricing"` on conversion buttons. Verify: hero ✅ (pre-existing), navbar desktop ✅ (pre-existing), navbar mobile ✅ (T004), pricing Join Beta ✅ (T005), CTA Get Started ✅ (T006).

---

## Phase 4: Polish & Validation

**Purpose**: Confirm zero lint errors and a clean build for the affected app. Verify no broken CTAs remain in source.

- [X] T007 Run `pnpm --filter landing lint` — confirm zero errors
- [X] T008 [P] Run `pnpm --filter landing build` — confirm zero TypeScript errors and clean build
- [X] T009 Verify no `href="#"` remains on CTA buttons: `grep -n 'href="#"' apps/landing/src/sections/` — confirm the two fixed files no longer appear in results for anchor tags (note: other non-CTA elements may legitimately use `href="#"` with `onClick` handlers)
- [X] T010 [P] Verify the full journey is documented complete: `grep -r "Mustafa Ahmed" apps/ --include="*.tsx" --include="*.ts"` — confirm empty result

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — all reads in parallel
- **Phase 3 (US1)**: Depends on Phase 1 reads — all three fixes are in different files and fully parallel (T005 and T006 are independent of each other and of T004)
- **Phase 4 (Polish)**: Depends on Phase 3 completion

### Within Phase 3

- T004 (navbar), T005 (pricing), T006 (cta) — all parallel — different files, no shared state

### Within Phase 4

- T007 (lint) and T008 (build) — parallel
- T009 (grep CTA check) and T010 (Mustafa Ahmed check) — parallel

---

## Parallel Opportunities

```
Phase 1:
  T001 (navbar)   ← parallel with T002 and T003
  T002 (pricing)  ← parallel
  T003 (cta)      ← parallel

Phase 3 — all parallel (different files):
  T004 (navbar mobile fix)
  T005 (pricing Join Beta fix)  ← parallel with T004 and T006
  T006 (cta Get Started fix)    ← parallel with T004 and T005

Phase 4 — all parallel:
  T007 (lint)
  T008 (build)    ← parallel with T007
  T009 (grep)     ← parallel
  T010 (grep)     ← parallel
```

---

## Implementation Strategy

### MVP First

Since there are only 3 code changes, all can be done in one pass:

1. Read files (Phase 1)
2. Fix mobile navbar (T004)
3. Fix pricing Join Beta (T005) — parallel with T004
4. Fix CTA Get Started (T006) — parallel with T004 and T005
5. Lint + Build + Verify (Phase 4)

### Journey Verification Checklist (manual, post-implementation)

After lint/build pass, a human tester can verify the complete journey end-to-end:

1. Landing → click any Get Started → Core `/login` ✅
2. `/login` → Sign In (no prior session) → `/onboarding` ✅
3. `/register` → enter name/email → Create Account → `/login` → Sign In → `/onboarding` ✅
4. Workspace onboarding → change region → country resets ✅
5. Workspace onboarding review → Team owner shows registered name ✅
6. Workspace onboarding → Finish → `/dashboard/apps` ✅
7. App Launcher → Open Shops → Shops `/onboarding` (same tab) ✅
8. Shops onboarding → select Saudi Arabia → currency auto-sets SAR ✅
9. Shops onboarding → Finish setup → Shops `/dashboard` ✅
10. Shops dashboard → store name / branch from session ✅
11. Shops dashboard → Back to Platform → Core `/dashboard` ✅
12. Core `/login` again → Sign In → `/workspaces` (not `/onboarding`) ✅
13. Open Shops again → Shops `/dashboard` (not Shops `/onboarding`) ✅

---

## Notes

- T004 requires no new constant — `CORE_LOGIN_URL` is already declared in `navbar.tsx`
- T005 and T006 each need a one-line constant added at the top of the file (same pattern as hero.tsx and navbar.tsx)
- The env var `NEXT_PUBLIC_CORE_PLATFORM_URL` is already in use across the project — no new env setup needed
- `href="#pricing"` in the CTA section is intentionally replaced: a primary conversion CTA should take users to Core Platform, not scroll to a pricing table
- T009 grep is advisory — some `href="#"` usages with `onClick` + `event.preventDefault()` are legitimate (e.g., Next.js action links); only bare `href="#"` on anchor tags without handlers are broken
