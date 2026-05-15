# Tasks: Full Mock Data Language QA

**Input**: `specs/028-full-mock-data-language-qa/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅
**Tests**: Not requested.
**Scope**: 8 source files — text-only JSX string substitutions. No logic, no imports, no layout changes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on in-progress tasks)
- **[Story]**: US1 = Shops pages, US2 = Core Platform dashboard, US3 = Core Platform settings

---

## Phase 1: Setup (Read Current State)

**Purpose**: Read all 8 target files to confirm exact line content before editing.

- [X] T001 Read `apps/shops-app/app/(app)/dashboard/page.tsx` and confirm "mock foundation" at line 159
- [X] T002 [P] Read `apps/shops-app/app/(app)/products/page.tsx` and confirm aria-label at line 45 and chip at line 94
- [X] T003 [P] Read `apps/shops-app/app/(app)/orders/page.tsx` and confirm chip at line 42 and label at line 130
- [X] T004 [P] Read `apps/shops-app/app/(app)/customers/page.tsx` and confirm chip at line 43
- [X] T005 [P] Read `apps/shops-app/app/(app)/reports/page.tsx` and confirm chips at lines 66, 93, 110
- [X] T006 [P] Read `apps/shops-app/components/dashboard/Topbar.tsx` and confirm aria-label at line 59
- [X] T007 [P] Read `apps/core-platform/app/dashboard/page.tsx` and confirm label at line 40
- [X] T008 [P] Read `apps/core-platform/app/dashboard/settings/page.tsx` and confirm API key entry at line 167

---

## Phase 2: Foundational

**No foundational phase required.** All 12 changes are independent text substitutions in separate files. No shared infrastructure or blocking prerequisite exists.

---

## Phase 3: User Story 1 — Shops Dashboard and Operational Pages (Priority: P1) 🎯 MVP

**Goal**: Replace all developer-internal labels ("mock foundation", "mock data · foundation", "mock order · foundation", "mock data", "Mock search — not functional") with professional user-facing language ("Local preview", "Sample data", "Sample order", "Search (preview only)") across 6 Shops files. Chip color and styling unchanged.

**Independent Test**: Complete Shops onboarding. Navigate to Dashboard, Products, Orders, Customers, Reports pages in sequence. Verify: no chip reads "mock", "foundation", or any combination thereof. Every placeholder chip reads "Sample data" or "Local preview". The Topbar search aria-label reads "Search (preview only)" (verify in DevTools → Accessibility panel or screen reader).

### Implementation for User Story 1

- [X] T009 [US1] Replace `mock foundation` with `Local preview` in `apps/shops-app/app/(app)/dashboard/page.tsx` line 159
- [X] T010 [P] [US1] Replace `aria-label="Mock search — not functional"` with `aria-label="Search (preview only)"` in `apps/shops-app/app/(app)/products/page.tsx` line 45
- [X] T011 [US1] Replace `mock data · foundation` with `Sample data` in `apps/shops-app/app/(app)/products/page.tsx` line 94
- [X] T012 [P] [US1] Replace `mock data` chip text with `Sample data` in `apps/shops-app/app/(app)/orders/page.tsx` line 42
- [X] T013 [US1] Replace `mock order · foundation` with `Sample order` in `apps/shops-app/app/(app)/orders/page.tsx` line 130
- [X] T014 [P] [US1] Replace `mock data` chip text with `Sample data` in `apps/shops-app/app/(app)/customers/page.tsx` line 43
- [X] T015 [P] [US1] Replace `mock data` chip text with `Sample data` in `apps/shops-app/app/(app)/reports/page.tsx` line 66
- [X] T016 [US1] Replace `mock data · foundation` with `Sample data` in `apps/shops-app/app/(app)/reports/page.tsx` line 93
- [X] T017 [US1] Replace `mock data · foundation` with `Sample data` in `apps/shops-app/app/(app)/reports/page.tsx` line 110
- [X] T018 [P] [US1] Replace `aria-label="Mock search — not functional"` with `aria-label="Search (preview only)"` in `apps/shops-app/components/dashboard/Topbar.tsx` line 59

**Checkpoint**: Navigate all 5 Shops pages. Zero instances of "mock", "foundation", or "not functional" remain in user-visible text or aria-labels across the 6 files.

---

## Phase 4: User Story 2 — Core Platform Dashboard Metric Label (Priority: P1)

**Goal**: The Core Platform dashboard metric sub-label "Commerce & POS · mock data" becomes "Commerce & POS · Sample data" — consistent with the language standard set in US1.

**Independent Test**: Complete workspace onboarding and open Core Platform `/dashboard`. Find the metric cards section. Verify the sub-label reads "Commerce & POS · Sample data" not "Commerce & POS · mock data".

### Implementation for User Story 2

- [X] T019 [P] [US2] Replace `Commerce &amp; POS · mock data` with `Commerce &amp; POS · Sample data` in `apps/core-platform/app/dashboard/page.tsx` line 40

**Checkpoint**: Core Platform dashboard shows "Commerce & POS · Sample data".

---

## Phase 5: User Story 3 — Core Platform Settings API Key Language (Priority: P2)

**Goal**: The API Keys tab in Settings no longer shows a "Production" key with `nxs_live_` prefix. The entry is relabelled "Sample" with key prefix `nxs_sample_`. The "Sandbox" entry is unchanged.

**Independent Test**: Navigate to Core Platform Settings → API Keys tab. Verify: first key entry label reads "Sample" (not "Production"); first key string reads `nxs_sample_` (not `nxs_live_`). Verify second key entry is unchanged (label "Sandbox", prefix `nxs_test_`).

### Implementation for User Story 3

- [X] T020 [P] [US3] Replace `{ name: "Production", key: "nxs_live_••••••••••••4f2a", ... }` with `{ name: "Sample", key: "nxs_sample_••••••••4f2a", ... }` in `apps/core-platform/app/dashboard/settings/page.tsx` line 167

**Checkpoint**: Settings API Keys tab shows "Sample" + `nxs_sample_` for the first entry; "Sandbox" + `nxs_test_` unchanged.

---

## Phase 6: Polish & Validation

**Purpose**: Verify zero lint errors and clean builds for both affected apps. Verify by grep that all target strings are gone.

- [X] T021 [P] Run `pnpm --filter shops-app lint` — confirm zero errors
- [X] T022 [P] Run `pnpm --filter core-platform lint` — confirm zero errors
- [X] T023 Run `pnpm --filter shops-app build` — confirm zero TypeScript errors and clean build
- [X] T024 [P] Run `pnpm --filter core-platform build` — confirm zero TypeScript errors and clean build
- [X] T025 Verify by grep: `grep -rn "mock foundation\|mock data · foundation\|mock order · foundation\|nxs_live_\|\"Production\"" apps/ --include="*.tsx" --include="*.ts"` — confirm empty result

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — all reads parallel
- **Phase 3 (US1)**: Depends on Phase 1 reads — tasks within are mostly parallel (different files); tasks within the same file are sequential
- **Phase 4 (US2)**: Depends on Phase 1 read of dashboard page — fully parallel with Phase 3 and Phase 5 (different file)
- **Phase 5 (US3)**: Depends on Phase 1 read of settings page — fully parallel with Phase 3 and Phase 4 (different file)
- **Phase 6 (Polish)**: Depends on all prior phases

### Within Phase 3 — Parallelism by File

- T009 (dashboard) — independent
- T010, T011 (products) — T010 and T011 sequential (same file)
- T012, T013 (orders) — T012 and T013 sequential (same file)
- T014 (customers) — independent
- T015, T016, T017 (reports) — sequential (same file)
- T018 (Topbar) — independent

**Cross-file parallelism**: T009, T010, T012, T014, T015, T018 can all start simultaneously since they are in different files.

---

## Parallel Opportunities

```
Phase 1 — all parallel:
  T001 (dashboard)   T002 (products)   T003 (orders)
  T004 (customers)   T005 (reports)    T006 (Topbar)
  T007 (CP dashboard)  T008 (CP settings)

Phase 3 — cross-file parallel (same-file tasks sequential):
  T009 (shops dashboard)
  T010 → T011 (products)          ← parallel with T009
  T012 → T013 (orders)            ← parallel with T009, T010
  T014 (customers)                ← parallel with all above
  T015 → T016 → T017 (reports)    ← parallel with all above
  T018 (Topbar)                   ← parallel with all above

Phase 4 — parallel with Phase 3 and Phase 5:
  T019 (CP dashboard)             ← parallel with all Phase 3 tasks

Phase 5 — parallel with Phase 3 and Phase 4:
  T020 (CP settings)              ← parallel with all Phase 3 tasks and T019

Phase 6:
  T021 (shops lint)               ← parallel with T022, T024
  T022 (CP lint)                  ← parallel with T021
  T023 (shops build)              ← after lint passes (or run together)
  T024 (CP build)                 ← parallel with T023
  T025 (grep verify)              ← after all builds complete
```

---

## Implementation Strategy

### MVP First (US1 only — 10 changes in Shops)

1. Read Shops files (T001–T006)
2. Apply all 10 Shops text changes (T009–T018)
3. Lint + build Shops (T021, T023)
4. Verify by grep for Shops files

### Full Pass

1. All reads in parallel (Phase 1)
2. All text changes in parallel by file group (Phases 3, 4, 5)
3. Lint both apps (T021, T022)
4. Build both apps (T023, T024)
5. Final grep verify (T025)

---

## Notes

- All changes are plain JSX string substitutions — no TypeScript types affected, no ESLint rules triggered
- Chip styling (amber color `text-amber-400/80`, `font-mono`, `text-[11px]`) is unchanged — only inner text changes
- `aria-label` attributes are not user-visible but are read by screen readers — updating them is accessibility-correct
- T020 key string: `nxs_live_••••••••••••4f2a` → `nxs_sample_••••••••4f2a` — two fewer masked dots to absorb the longer prefix while keeping the visual length similar
- T025 grep includes `"Production"` in quotes to avoid false positives from comments or other uses of the word
