# Tasks: Core Workspace Onboarding Flow

**Input**: Design documents from `/specs/020-core-workspace-onboarding-flow/`
**Branch**: `020-core-workspace-onboarding-flow`

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Library additions and session helper — required before any step UI can be built.

- [X] T001 Add 4 new `IconName` values (`"check"`, `"building"`, `"globe"`, `"zap"`) to `apps/core-platform/lib/types.ts`
- [X] T002 Add 4 corresponding SVG paths to `apps/core-platform/components/ui/Icon.tsx` paths record
- [X] T003 Create `apps/core-platform/lib/session.ts` with `WorkspaceSetup` interface, `completeWorkspaceOnboarding`, `isWorkspaceOnboardingComplete`, and `saveWorkspaceSetup` helpers (all with `typeof window === "undefined"` guards)

**Checkpoint**: Icons and session helpers are in place — the onboarding page can now import them.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create the onboarding route scaffold — the `"use client"` page with hydration, state, step orchestration, header, and nav bar — but with empty step panels. All three user story phases slot their step panels into this scaffold.

- [X] T004 Create `apps/core-platform/app/onboarding/page.tsx` as a `"use client"` component with: `useSyncExternalStore` mounted/isComplete hydration, state variables (`currentStep`, `workspaceName`, `slug`, `slugManuallyEdited`, `region`, `currency`, `shopsEnabled`), `toSlug()` helper, `handleNameChange`/`handleSlugChange`, `canProceed` logic, `handleContinue`, `handleBack`, top-level layout (`flex min-h-screen flex-col bg-[#0a0a0f]`), sticky minimal header, sticky bottom nav bar (Back + Continue/Continue to dashboard buttons), and placeholder `<div>` for each of the 3 step panels

**Checkpoint**: `/onboarding` loads, renders the header and nav bar, step state advances/retreats correctly (even with empty panels), and `canProceed` gates the Continue button.

---

## Phase 3: User Story 1 — Step 1: Create Workspace (Priority: P1) 🎯 MVP

**Goal**: Render a fully interactive Step 1 panel inside the scaffold — workspace name input, slug preview with auto-generation, region select, currency select, informational note, and disabled Continue when name/slug are empty.

**Independent Test**: Open `/onboarding` in a fresh browser session. Step 1 is shown with a step indicator "Step 1 of 3". Typing "Mustafa's Co." auto-populates slug "mustafas-co". Clearing the name disables Continue. Manually editing the slug stops auto-gen. Region and currency dropdowns show ≥2 and ≥5 options respectively. Filling name + slug enables Continue.

- [X] T005 [US1] Add `StepIndicator` inline component inside `apps/core-platform/app/onboarding/page.tsx` — 3 numbered pills (1/2/3) with connecting lines, active/completed/upcoming visual states, labels "Workspace", "Apps", "Review", responsive at 375px
- [X] T006 [US1] Implement Step 1 panel inline in `apps/core-platform/app/onboarding/page.tsx` — heading "Set up your workspace", workspace name `<input>` with `autoFocus` and `onChange={handleNameChange}`, slug `<input>` with `nexoraxs.com/` prefix and `onChange={handleSlugChange}`, region `<select>` (ME Central / EU Central / US East / Asia Pacific SE), currency `<select>` (EGP / USD / SAR / AED / EUR), and an informational `<p>` note explaining each field

**Checkpoint**: US1 fully satisfies acceptance scenarios 1–7 from spec.md. Continue is disabled when name is empty; slug auto-generates; region and currency selects are populated; manual slug edit stops auto-gen.

---

## Phase 4: User Story 2 — Step 2: Choose Apps (Priority: P1)

**Goal**: Render Step 2 panel — 5 app cards where Shops is selectable/pre-selected and the other 4 show "Coming Soon". Continue disables when Shops is deselected. Back returns to Step 1 with data intact.

**Independent Test**: After clicking Continue on Step 1, Step 2 shows 5 cards. Shops card has a selected visual state by default. Deselecting Shops disables Continue. Re-selecting re-enables Continue. Clicking Back returns to Step 1 with name, slug, region, and currency still populated.

- [X] T007 [US2] Implement Step 2 panel inline in `apps/core-platform/app/onboarding/page.tsx` — 5 app cards (`flex flex-col gap-3`): Shops card (clickable, toggles `shopsEnabled`, blue ring when selected, check badge when selected), Clinics/Maintenance/Restaurants/CRM cards (`opacity-50 pointer-events-none`, "Coming Soon" badge), helper note "At least one app must be selected to continue." shown when `shopsEnabled === false`

**Checkpoint**: US2 fully satisfies acceptance scenarios 1–6 from spec.md. All 5 cards visible, Shops toggleable, others inert, Back preserves Step 1 data.

---

## Phase 5: User Story 3 — Step 3: Review Workspace (Priority: P1)

**Goal**: Render Step 3 read-only summary panel — workspace name, slug with `nexoraxs.com/` prefix, region, currency, team owner, enabled apps — and wire "Continue to dashboard" to write sessionStorage and navigate to `/dashboard/apps`.

**Independent Test**: After completing Steps 1 and 2, Step 3 shows all workspace details in summary cards. No input fields are present. "Continue to dashboard" button is visible. Clicking it writes `core_workspace_onboarding_done` to sessionStorage and navigates to `/dashboard/apps`. Browser DevTools → Application → Session Storage confirms the key is set.

- [X] T008 [US3] Implement Step 3 review panel inline in `apps/core-platform/app/onboarding/page.tsx` — heading "Your workspace is ready" with green `check` icon accent, subtitle, summary card grid (`grid grid-cols-2 sm:grid-cols-3 gap-3`) showing: workspace name (building icon), slug with `nexoraxs.com/` prefix (globe icon), region (globe icon), currency (trending-up icon), team owner "Mustafa Ahmed" (users icon), enabled apps (apps icon); no editable inputs
- [X] T009 [US3] Wire "Continue to dashboard" in `handleContinue` for step 3: call `saveWorkspaceSetup({ workspaceName, slug, region, currency, shopsEnabled })`, call `completeWorkspaceOnboarding()`, then `router.push("/dashboard/apps")`

**Checkpoint**: US3 fully satisfies acceptance scenarios 1–6 from spec.md. Review is read-only, CTA navigates correctly, sessionStorage key is written.

---

## Phase 6: User Story 4 — Returning User Guard (Priority: P2)

**Goal**: When `core_workspace_onboarding_done` is set in sessionStorage and the user navigates to `/onboarding`, show a completion card ("Workspace already set up") with a "Go to dashboard" link instead of the 3-step flow.

**Independent Test**: Complete the full 3-step flow and click "Continue to dashboard". Navigate back to `/onboarding` (without clearing session). The 3-step form is NOT shown — a completion card with a "Go to dashboard" link to `/dashboard/apps` appears instead. Clearing sessionStorage manually and revisiting `/onboarding` shows Step 1 again.

- [X] T010 [US4] Implement completion state inline in `apps/core-platform/app/onboarding/page.tsx` — centered card with green check icon, heading "Workspace already set up", descriptive subtitle, and an `<a href="/dashboard/apps">` styled as a primary button labeled "Go to dashboard"; rendered when `isComplete === true` (guarded behind `mounted` check)

**Checkpoint**: US4 fully satisfies acceptance scenarios 1–3 from spec.md. Returning users see the completion card; fresh sessions see Step 1.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Responsiveness validation, edge cases, lint/type checks.

- [X] T011 Verify responsive layout at 375px: step indicator pills fit without overflow, Step 1 inputs stack correctly, Step 2 cards are readable, Step 3 summary grid wraps to 2 columns, bottom nav bar does not obscure content at mobile viewport
- [X] T012 [P] Handle edge cases in `apps/core-platform/app/onboarding/page.tsx`: empty slug after manual clear shows validation hint or keeps Continue disabled, workspace name cleared after slug was auto-generated keeps slug value but disables Continue (per spec edge cases)
- [X] T013 [P] Run `pnpm lint` in `apps/core-platform` and fix any errors
- [X] T014 [P] Run `pnpm tsc --noEmit` in `apps/core-platform` and fix any type errors
- [X] T015 Run `pnpm --filter core-platform build` and confirm `/onboarding` appears as a compiled route with zero errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1, T001–T003)**: No dependencies — start immediately; T001/T002 can run in parallel (different files), T003 is independent
- **Foundational (Phase 2, T004)**: Depends on T001–T003 (imports icons and session helpers) — BLOCKS all story phases
- **US1 (Phase 3, T005–T006)**: Depends on T004 (scaffold in place)
- **US2 (Phase 4, T007)**: Depends on T004 — can proceed in parallel with US1 if the scaffold file is split, but since all inline in one file, do sequentially after T006
- **US3 (Phase 5, T008–T009)**: Depends on T004 — sequentially after T007
- **US4 (Phase 6, T010)**: Depends on T009 (session write must be wired first)
- **Polish (Phase 7, T011–T015)**: Depends on all story phases complete

### User Story Dependencies

- **US1**: After Foundational — no dependency on other stories
- **US2**: After US1 (same file — scaffold must have Step 1 complete to test Step 2 navigation)
- **US3**: After US2 (same file — Step 2 must work to reach Step 3)
- **US4**: After US3 (completion flag only written by Step 3 CTA)

### Parallel Opportunities

- T001 and T002 can run in parallel (different files: `lib/types.ts` vs `components/ui/Icon.tsx`)
- T003 is independent of T001/T002 (new file)
- T013, T014 can run in parallel (lint and typecheck are independent processes)

---

## Parallel Example: Phase 1 Setup

```
Parallel batch:
  T001 — apps/core-platform/lib/types.ts (add IconName values)
  T002 — apps/core-platform/components/ui/Icon.tsx (add SVG paths)
  T003 — apps/core-platform/lib/session.ts (new file, fully independent)
```

---

## Implementation Strategy

### MVP First (US1 + US2 + US3 — all P1)

All three story phases are P1 and together form the complete end-to-end flow:

1. Complete Phase 1: Setup (T001–T003) — ~10 min
2. Complete Phase 2: Foundational (T004) — scaffold with empty panels
3. Complete Phase 3: US1 (T005–T006) — Step 1 fully interactive
4. Complete Phase 4: US2 (T007) — Step 2 app cards
5. Complete Phase 5: US3 (T008–T009) — Step 3 review + CTA wired
6. **STOP and VALIDATE**: Complete end-to-end flow (SC-001 through SC-005)

### Incremental Delivery

1. T001–T003 → icons and session helpers ready
2. T004 → scaffold renders (empty steps, working nav bar)
3. T005–T006 → Step 1 interactive (SC-003, SC-004 verifiable)
4. T007 → Step 2 working (SC-004 verifiable)
5. T008–T009 → Step 3 wired (SC-001, SC-002 verifiable)
6. T010 → returning user guard (SC-005 verifiable)
7. T011–T015 → polish and build validation (SC-006, SC-007, SC-008)

---

## Notes

- All tasks are in `apps/core-platform` — no cross-app imports
- `app/onboarding/page.tsx` is a new file; no existing route is modified
- The onboarding page does NOT use `app/dashboard/layout.tsx`
- All step panels are inline in the single page file (no extracted component files)
- sessionStorage writes happen only on "Continue to dashboard" (Step 3 CTA), not at each step
- `slugManuallyEdited` flag prevents auto-gen from overwriting after user edits slug
- `mounted` (from `useSyncExternalStore`) must gate all sessionStorage reads to prevent SSR crashes
