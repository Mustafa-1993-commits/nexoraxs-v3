# Tasks: App Launcher — Complete Card States

**Input**: Design documents from `specs/030-app-launcher-card-states/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅

**Tests**: Not requested — no test tasks generated.

**Organization**: Tasks are grouped by user story. Each story phase is a compilable, independently verifiable increment.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US4)

## Path Conventions

- Web app: `apps/core-platform/`
- Components: `apps/core-platform/components/dashboard/`
- Types: `apps/core-platform/lib/types.ts`
- Mock data: `apps/core-platform/lib/mock-data/apps.ts`

---

## Phase 1: Setup

*No new infrastructure required — all files exist. Skipped.*

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the `AppStatus` type and migrate the `App` interface before any card state can be rendered.

**⚠️ CRITICAL**: All user story phases depend on this phase completing successfully.

- [x] T001 Add `AppStatus` union type export (`"active" | "enable" | "upgrade" | "coming-soon"`) to `apps/core-platform/lib/types.ts`
- [x] T002 Update `App` interface in `apps/core-platform/lib/mock-data/apps.ts` — import `AppStatus` from `@/lib/types`, replace `available: boolean` with `status: AppStatus`, remove `buttonLabel?: string`
- [x] T003 Update all 5 mock entries in `apps/core-platform/lib/mock-data/apps.ts` — `shops` → `status: "active"` (keep `href: SHOPS_URL`); `crm` → `status: "upgrade"`; `clinics`, `maintenance`, `restaurants` → `status: "coming-soon"`; remove all `buttonLabel` fields

**Checkpoint**: `apps.ts` compiles cleanly with the new interface. `AppCard.tsx` will have TypeScript errors until Phase 3.

---

## Phase 3: User Story 1 — Active State (Priority: P1) 🎯 MVP

**Goal**: Shops card renders a blue "Open →" link that navigates to `SHOPS_URL`.

**Independent Test**: View the App Launcher at `http://localhost:3001/dashboard/apps`. The Shops card must show an "Open →" button in blue. Clicking it must navigate to the Shops app. No other states are required to pass this test.

### Implementation for User Story 1

- [x] T004 [US1] Refactor `apps/core-platform/components/dashboard/AppCard.tsx` — update prop signature to use `App` type with `status`; implement `active` case as `<a href={href}>` with blue styling and "Open →" label; add placeholder fallback (`null`) for all other status values; remove all `available`-based logic

**Checkpoint**: Shops card renders and navigates correctly. Other cards render nothing (expected stub). TypeScript compiles cleanly.

---

## Phase 4: User Story 2 — Enable State (Priority: P2)

**Goal**: An `enable`-status card shows an outline "Enable App" button. Clicking it opens a confirmation modal. The user can confirm or cancel.

**Independent Test**: View the App Launcher. Any card with `status: "enable"` must show the outline button. Clicking "Enable App" must open the modal. Confirm closes the modal. Cancel closes the modal without side effects.

### Implementation for User Story 2

- [x] T005 [P] [US2] Create `apps/core-platform/components/dashboard/EnableModal.tsx` — `"use client"` directive; props: `{ app: { name: string; description: string }; onConfirm: () => void; onClose: () => void }`; fixed overlay with semi-transparent backdrop; app name and description in modal body; "Enable" primary button (calls `onConfirm` then `onClose`) and "Cancel" secondary button (calls `onClose`); dismiss on backdrop click; dismiss on Escape keydown via `useEffect`
- [x] T006 [US2] Add `enable` case to `apps/core-platform/components/dashboard/AppCard.tsx` — add `"use client"` directive at top of file; add `useState<boolean>(false)` for `enableModalOpen`; implement `enable` case: outline-styled "Enable App" `<button>` that sets `enableModalOpen(true)`; render `<EnableModal app={{ name, description }} onConfirm={() => setEnableModalOpen(false)} onClose={() => setEnableModalOpen(false)} />` when `enableModalOpen === true`

**Checkpoint**: Enable flow works end-to-end. Modal opens, closes on confirm and cancel, closes on backdrop click and Escape. Shops active card still works.

---

## Phase 5: User Story 3 — Upgrade State (Priority: P3)

**Goal**: CRM card renders dimmed with an amber "Upgrade Plan" button. No navigation on click.

**Independent Test**: View the App Launcher. The CRM card must appear at 50% opacity with an amber "Upgrade Plan" button. Clicking the button must not navigate away.

### Implementation for User Story 3

- [x] T007 [US3] Add `upgrade` case to `apps/core-platform/components/dashboard/AppCard.tsx` — wrap card root `div` in conditional `opacity-50` when status is `upgrade` or `coming-soon`; implement `upgrade` case: amber-background `<button>` with label "Upgrade Plan" and a placeholder `onClick` (no navigation in mock phase)

**Checkpoint**: CRM card is visually dimmed with amber button. All prior states continue to work.

---

## Phase 6: User Story 4 — Coming-Soon State (Priority: P4)

**Goal**: Clinics, Maintenance, and Restaurants cards render dimmed with a disabled "Coming Soon" button and a "Coming Soon" badge. No interaction possible.

**Independent Test**: View the App Launcher. Clinics, Maintenance, and Restaurants cards must all appear at 50% opacity. Their buttons must be `disabled` with no hover or click response. A "Coming Soon" badge must be visible in the card header area.

### Implementation for User Story 4

- [x] T008 [US4] Add `coming-soon` case to `apps/core-platform/components/dashboard/AppCard.tsx` — implement `coming-soon` case: `<button disabled>` with `cursor-not-allowed` and muted styling, label "Coming Soon"; render the "Coming Soon" badge `<span>` in the card header (replacing the existing conditional badge); ensure card opacity dimming from T007 applies to this state as well

**Checkpoint**: All four card states render correctly. The visual hierarchy (active/enable fully opaque, upgrade/coming-soon dimmed) is consistent across all 5 app cards.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Verify type safety, linting, and visual correctness before merge.

- [x] T009 [P] Run TypeScript check with zero errors: `pnpm --filter core-platform exec tsc --noEmit` in repo root
- [x] T010 [P] Run linter with zero errors: `pnpm lint` in repo root
- [x] T011 Start the dev server (`pnpm --filter core-platform dev`) and manually verify all four card states at `http://localhost:3001/dashboard/apps` — confirm Shops opens link, enable modal works, CRM is amber+dimmed, coming-soon cards are disabled+dimmed

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 2)**: No dependencies — start immediately
- **US1 (Phase 3)**: Depends on Phase 2 (T001–T003)
- **US2 (Phase 4)**: Depends on Phase 3 (T004) — `EnableModal` references `AppCard` prop types
- **US3 (Phase 5)**: Depends on Phase 3 (T004) — adds a case to the refactored component
- **US4 (Phase 6)**: Depends on Phase 5 (T007) — reuses the opacity dimming logic
- **Polish (Phase 7)**: Depends on all implementation phases complete (T008)

### User Story Dependencies

- **US1 (P1)**: Only depends on Foundational. The true MVP.
- **US2 (P2)**: Depends on US1 (shares AppCard; EnableModal is a new file that can be written in parallel with T004)
- **US3 (P3)**: Depends on US1 (adds a case to AppCard)
- **US4 (P4)**: Depends on US3 (reuses the `opacity-50` dimming logic set up in T007)

### Within Each Phase

- Foundation: T001 → T002 → T003 (sequential, same file after T001)
- US2: T005 and T006 are independent files — T005 [P] can be written while T004 is in progress; T006 requires T005 to exist for the import

### Parallel Opportunities

- T005 (`EnableModal.tsx` creation) can be written in parallel with T004 (`AppCard.tsx` refactor for US1)
- T009 (TypeScript check) and T010 (lint) can run in parallel after T008
- US3 and US4 are both AppCard changes and must be sequential (same file)

---

## Parallel Example: Phase 4 (US2)

```bash
# T005 and T004 can overlap:
Task A: "Create EnableModal component in apps/core-platform/components/dashboard/EnableModal.tsx"
Task B: "Refactor AppCard active state in apps/core-platform/components/dashboard/AppCard.tsx"

# Both must complete before T006:
Task C: "Add enable case + modal wiring to AppCard.tsx" (depends on A and B)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 2: Foundational (T001–T003)
2. Complete Phase 3: User Story 1 (T004)
3. **STOP and VALIDATE**: View App Launcher — Shops card navigates to shops app
4. Proceed to US2–US4 incrementally

### Incremental Delivery

1. T001–T003 → Data model ready
2. T004 → Active state works (Shops card) — **MVP**
3. T005–T006 → Enable flow works (modal confirmed)
4. T007 → Upgrade state works (CRM dimmed + amber)
5. T008 → Coming-soon state works (Clinics/Maintenance/Restaurants)
6. T009–T011 → Types clean, linted, visually verified

---

## Notes

- [P] tasks = different files or independent checks, no mutual dependencies
- [US*] label maps each task to its user story for traceability
- Each phase checkpoint should be verified in the browser before proceeding
- `"use client"` is added in T006 (US2) — the first phase requiring interactive state
- The `opacity-50` dimming introduced in T007 is intentionally reused by T008 — this is by design, not a shortcut
- No backend, SDK, or cross-app changes in this feature
