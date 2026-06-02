# Tasks: Platform Alignment — Localization Foundation & Product Hub

**Input**: Design documents from `specs/038-platform-alignment-localization-product-hub/`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅ contracts/ ✅

**Tests**: No automated tests in scope — UI/mock only phase per spec.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

---

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1–US6)
- No test tasks — spec is UI/mock only, no test framework requested

---

## Phase 1: Setup

**Purpose**: Pre-implementation audit — confirm current file state matches plan before making changes

- [x] T001 Audit all 14 affected files listed in spec "Affected Areas" section and confirm they match the current-state descriptions in `specs/038-platform-alignment-localization-product-hub/research.md` (R-03, R-04, R-05, R-06); note any discrepancies before proceeding

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared infrastructure that US1–US5 depend on. Must complete before user story work begins.

**⚠️ CRITICAL**: The locale utility (T002) is referenced by US4 and US5. The OSState type (T003) is referenced by US1's mock data and card component. Both must be done first.

- [x] T002 Create `apps/core-platform/lib/locale.ts` — export `Locale = "en" | "ar"`, `getLocale()`, `setLocale()`, `subscribeToLocale()` using `"nexoraxs_locale"` session storage key and `window.dispatchEvent(new Event("nexoraxs:locale-change"))` as per `specs/038-platform-alignment-localization-product-hub/data-model.md`
- [x] T003 Update `apps/core-platform/lib/types.ts` — replace `AppStatus = "active" | "enable" | "upgrade" | "coming-soon"` with `OSState = "active" | "coming-soon" | "trial" | "locked"`; keep `export type AppStatus = OSState` as deprecated alias for backward compatibility

**Checkpoint**: Locale utility and OSState type are available — US1 through US5 can now proceed (US6 is fully independent of these).

---

## Phase 3: User Story 1 — Product Hub Replaces App Launcher (Priority: P1) 🎯 MVP

**Goal**: The Core Platform `/dashboard/apps` page becomes "Product Hub" showing 6 OS cards. Sidebar nav item updated. Commerce OS is active; all others are Coming Soon.

**Independent Test**: Navigate to `/dashboard/apps` — heading reads "Product Hub", 6 OS cards visible (Commerce OS active with "Open →", other 5 dimmed with disabled "Coming Soon" button), sidebar item reads "Product Hub".

- [x] T004 [P] [US1] Replace `App` interface and `mockApps` export in `apps/core-platform/lib/mock-data/apps.ts` with `OSItem` interface and `mockOS: OSItem[]` containing the 6-entry catalogue (Commerce OS active, Healthcare OS / HR OS / CRM OS / Gym OS / Maintenance OS all `coming-soon`) per `specs/038-platform-alignment-localization-product-hub/data-model.md`
- [x] T005 [P] [US1] Update `apps/core-platform/lib/mock-data/nav-items.ts` — change nav item label from `"Apps"` to `"Product Hub"` (href and icon unchanged)
- [x] T006 [US1] Update `apps/core-platform/components/dashboard/AppCard.tsx` — accept `OSItem` props (imported from `@/lib/mock-data/apps`); handle `state: "active"` (Open button → href), `state: "coming-soon"` (disabled Coming Soon button, `opacity-50` card, `aria-disabled="true"`); remove old `"enable"` and `"upgrade"` button branches; update `EnableModal` call to use OS language ("operating system" not "app")
- [x] T007 [US1] Update `apps/core-platform/app/dashboard/apps/page.tsx` — change page heading from `"App Launcher"` to `"Product Hub"` and subtitle from `"All NexoraXS apps available for your workspace."` to `"Your active and available operating systems."`; update import from `mockApps` to `mockOS`
- [x] T008 [US1] Update `apps/core-platform/components/dashboard/Topbar.tsx` — change `titles` map entry from `"/dashboard/apps": "App Launcher"` to `"/dashboard/apps": "Product Hub"`

**Checkpoint**: User Story 1 complete — Product Hub page renders with 6 OS cards, sidebar and topbar updated. Can demo independently.

---

## Phase 4: User Story 2 — Terminology Purge: "NexoraXS Shops" → "Commerce OS" (Priority: P1)

**Goal**: Zero instances of "NexoraXS Shops" remain in user-facing Core Platform UI. Commerce OS browser tab title updated.

**Independent Test**: Search visible text on all dashboard pages for "NexoraXS Shops" — zero results. Open `localhost:3002` — browser tab reads "Commerce OS".

- [x] T009 [P] [US2] Update `apps/core-platform/app/dashboard/page.tsx` — change active OS entry: `"NexoraXS Shops"` → `"Commerce OS"`, `"Commerce & POS · Sample data"` remains descriptive; change section chip from `"// enabled apps"` to `"// active os"`; change section heading `"Active in this workspace"` (unchanged or update to "Operating Systems active in this workspace")
- [x] T010 [P] [US2] Update `apps/core-platform/lib/mock-data/activity.ts` — change `"enabled the CRM app"` → `"activated CRM OS"`; change `"invited 3 team members to Shops"` → `"invited 3 team members to Commerce OS"`
- [x] T011 [P] [US2] Update `apps/core-platform/components/dashboard/EnableModal.tsx` — change `"This app will be activated for your workspace. You can disable it at any time from settings."` → `"This operating system will be activated for your workspace. You can disable it at any time from settings."`
- [x] T012 [P] [US2] Update `packages/ui/src/components/Logo.tsx` — in `ShopsLogo`, change rendered `<span>Shops</span>` to `<span>Commerce OS</span>`; keep `LogoApp = "core" | "shops"` prop type and `app="shops"` call sites unchanged
- [x] T013 [P] [US2] Update `apps/shops-app/app/layout.tsx` — change `title: "NexoraXS Shops"` → `title: "Commerce OS"` and `description: "NexoraXS Business Operating System — Shops"` → `description: "NexoraXS — Commerce OS"`

**Checkpoint**: User Story 2 complete — all "NexoraXS Shops" strings purged from user-facing UI. Can verify by visual inspection and browser tab check.

---

## Phase 5: User Story 3 — Onboarding OS Catalogue Alignment (Priority: P1)

**Goal**: Core Platform onboarding Step 2 shows correct OS catalogue (6 entries, no "Restaurants"), Step 3 summary reflects OS language.

**Independent Test**: Clear session storage, complete onboarding to Step 2 — shows "Choose your operating systems" with 6 OS entries and no "Restaurants" or "Clinics". Step 3 summary shows "Commerce OS".

- [x] T014 [US3] Update `apps/core-platform/app/onboarding/page.tsx` — (a) Replace `appCards` array: remove "NexoraXS Clinics", "NexoraXS Maintenance", "NexoraXS Restaurants", "NexoraXS CRM"; add entries for "Commerce OS" (available: true), "Healthcare OS", "HR OS", "CRM OS", "Gym OS", "Maintenance OS" (all available: false); (b) Update Step 2 heading from `"Choose your apps"` to `"Choose your operating systems"` and subtitle from `"Select the apps you want to enable..."` to `"Select the operating systems you want to activate..."`; (c) Update Step 3 `SummaryCard` label from `"Enabled apps"` to `"Active OS"` and value from `shopsEnabled ? "Shops" : "None selected"` to `shopsEnabled ? "Commerce OS" : "None selected"`; (d) Update the warning message from `"At least one app must be selected"` to `"At least one operating system must be selected"`

**Checkpoint**: User Story 3 complete — onboarding shows correct OS catalogue. All 3 P1 user stories are now complete.

---

## Phase 6: User Story 4 — Language Switcher UI (Priority: P2)

**Goal**: EN/AR language switcher appears in the topbar. Clicking AR sets `dir="rtl"` on the document. Preference persists in session storage across navigation.

**Independent Test**: Click "AR" in topbar — `<html dir="rtl">` confirmed in DevTools, layout mirrors. Navigate to another page — RTL persists. Click "EN" — LTR returns.

- [x] T015 [US4] Create `apps/core-platform/components/LocaleProvider.tsx` — `"use client"` component; reads locale via `useSyncExternalStore(subscribeToLocale, getLocale, () => "en")`; `useEffect` sets `document.documentElement.dir` (`"rtl"` for `"ar"`, `"ltr"` for `"en"`) and `document.documentElement.lang` on locale change; renders children as passthrough
- [x] T016 [US4] Update `apps/core-platform/app/layout.tsx` — import `LocaleProvider` from `@/components/LocaleProvider`; wrap `{children}` inside `<LocaleProvider>{children}</LocaleProvider>` within the `<body>` element
- [x] T017 [US4] Create `apps/core-platform/components/dashboard/LanguageSwitcher.tsx` — `"use client"` component; renders two pill buttons `EN` and `AR`; active pill uses filled style; inactive pill uses ghost/outline style; calls `setLocale("en")` / `setLocale("ar")` from `@/lib/locale`; reads current locale via `useSyncExternalStore(subscribeToLocale, getLocale, () => "en")`
- [x] T018 [US4] Update `apps/core-platform/components/dashboard/Topbar.tsx` — import `LanguageSwitcher`; place it in the right-side action area between the search bar and the notification bell button
- [x] T019 [P] [US4] Create `apps/shops-app/lib/locale.ts` — identical shape to `apps/core-platform/lib/locale.ts`; uses the same `"nexoraxs_locale"` session storage key so the Core Platform locale preference is read by Commerce OS in the same browser session

**Checkpoint**: User Story 4 complete — language switcher functional, session-persisted, RTL direction applied on AR selection.

---

## Phase 7: User Story 5 — RTL/LTR Layout Readiness for New Surfaces (Priority: P2)

**Goal**: All new layout elements introduced by this spec use Tailwind v4 logical CSS properties. Product Hub, OS cards, language switcher, and onboarding OS section render without visual breakage in RTL.

**Independent Test**: Switch to Arabic (AR). Inspect Product Hub OS card grid, sidebar nav items, language switcher pills, and onboarding OS selection list — all mirror correctly in RTL with no overlapping text or broken padding.

- [x] T020 [P] [US5] Audit `apps/core-platform/components/dashboard/AppCard.tsx` — replace any `left-*`, `right-*`, `ml-*`, `mr-*`, `pl-*`, `pr-*`, `rounded-l-*`, `rounded-r-*` classes introduced in T006 with Tailwind v4 logical equivalents (`ms-*`, `me-*`, `ps-*`, `pe-*`, `rounded-s-*`, `rounded-e-*`); confirm the card renders symmetrically in both LTR and RTL
- [x] T021 [P] [US5] Audit `apps/core-platform/components/dashboard/LanguageSwitcher.tsx` (created in T017) — verify all spacing uses logical utilities; confirm the EN pill and AR pill order reads naturally in both LTR and RTL
- [x] T022 [P] [US5] Audit `apps/core-platform/components/dashboard/Sidebar.tsx` — for any new markup introduced by this spec (e.g. new labels, Product Hub nav changes), replace physical directional Tailwind classes with logical equivalents; existing unchanged markup is out of scope
- [x] T023 [P] [US5] Audit `apps/core-platform/app/onboarding/page.tsx` — for the new OS card list section added in T014, replace any physical directional classes with logical equivalents; verify the OS selection cards mirror correctly in RTL

**Checkpoint**: User Story 5 complete — new surfaces verified RTL-safe. Language switcher + LocaleProvider from US4 demonstrate the full round-trip.

---

## Phase 8: User Story 6 — Commerce OS Preset Alignment (Priority: P2)

**Goal**: Commerce OS onboarding shows Pharmacy and Restaurant/Cafe presets. No Gym or Healthcare entries appear.

**Independent Test**: Start Commerce OS onboarding, reach business type selection — "Pharmacy" (💊) and "Restaurant / Cafe" (🍽️) visible and selectable. No Gym or Healthcare option present. Select Pharmacy, advance to Review — label reads "Pharmacy".

- [x] T024 [P] [US6] Update `apps/shops-app/lib/mode.ts` — add `"pharmacy"` and `"restaurant"` to `BusinessType` union; add both values to `VALID_BUSINESS_TYPES` array (retain all existing values including `"food-beverage"` and `"accessories"` for backward compatibility)
- [x] T025 [P] [US6] Update `apps/shops-app/components/onboarding/StepBusinessAndSales.tsx` — add two entries to `BUSINESS_TYPES` array: `{ id: "pharmacy", emoji: "💊", label: "Pharmacy" }` and `{ id: "restaurant", emoji: "🍽️", label: "Restaurant / Cafe" }`; confirm no Gym, Healthcare, or Clinic entries exist in the array
- [x] T026 [US6] Update `apps/shops-app/components/onboarding/StepReview.tsx` — add two entries to `BUSINESS_TYPE_LABEL` map: `pharmacy: "Pharmacy"` and `restaurant: "Restaurant / Cafe"`; TypeScript will enforce exhaustiveness if the union is a mapped type — resolve any compile errors

**Checkpoint**: User Story 6 complete — Pharmacy and Restaurant/Cafe available as Commerce presets. Fully independent from US1–US5 (separate app, no shared files).

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Build verification, type-check, and final validation across all stories

- [x] T027 [P] Run `pnpm --filter packages/ui build` (or `pnpm --filter @nexoraxs/ui build`) and confirm TypeScript compiles clean after Logo.tsx change (T012)
- [x] T028 [P] Run `pnpm --filter core-platform build` (or `pnpm --filter @nexoraxs/core-platform build`) and confirm zero TypeScript errors after all core-platform changes (T002–T023)
- [x] T029 [P] Run `pnpm --filter shops-app build` (or `pnpm --filter @nexoraxs/shops-app build`) and confirm zero TypeScript errors after all shops-app changes (T024–T026)
- [x] T030 Manually walk through `specs/038-platform-alignment-localization-product-hub/quickstart.md` — verify all 5 test scenarios pass visually (Product Hub, terminology, onboarding, language switcher, Commerce presets)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — blocks US1–US5
- **US1 (Phase 3)**: Depends on T003 (OSState type) — can start after T003
- **US2 (Phase 4)**: No dependency on US1 — can run in parallel with US1 after Foundational
- **US3 (Phase 5)**: No dependency on US1 or US2 — can run in parallel after Foundational
- **US4 (Phase 6)**: Depends on T002 (locale utility) — can start after T002
- **US5 (Phase 7)**: Depends on T006 (AppCard), T017 (LanguageSwitcher), T014 (onboarding) — must follow US1, US4, US3
- **US6 (Phase 8)**: No dependency on any other phase — can run in parallel from the start
- **Polish (Phase 9)**: Depends on all story phases complete

### User Story Dependencies

```
T001 (audit)
  └─> T002 (locale.ts) ──────────> US4 (T015–T019)
  └─> T003 (OSState type) ──────> US1 (T004–T008) ──> US5 (T020–T023)
                                ↗
  └─> US2 (T009–T013)  [parallel after Phase 2]
  └─> US3 (T014)       [parallel after Phase 2]
  └─> US6 (T024–T026)  [fully independent, can start after T001]
```

### US5 (RTL audit) dependencies within the phase

- T020 depends on T006 (AppCard updated in US1)
- T021 depends on T017 (LanguageSwitcher created in US4)
- T022 depends on Phase 2 completion (no new US1 changes to Sidebar)
- T023 depends on T014 (onboarding updated in US3)

### Parallel Opportunities

**Within Phase 3 (US1)**:
- T004 and T005 can run in parallel (different files)
- T006, T007, T008 depend on T004

**Within Phase 4 (US2)**:
- T009, T010, T011, T012, T013 — all in different files, fully parallel

**Within Phase 6 (US4)**:
- T015, T016 are sequential (T016 needs T015 to exist)
- T017 is independent of T015/T016
- T018 depends on T017
- T019 is fully independent (shops-app)

**Within Phase 8 (US6)**:
- T024, T025 can run in parallel (same file but separate exports)
- T026 depends on T024 (needs the new type values)

**Cross-phase parallel** (after Phase 2 completes):
- US2 (T009–T013) and US3 (T014) can run fully in parallel
- US6 (T024–T026) can run in parallel with US1–US5 throughout

---

## Parallel Execution Examples

### Parallel Example: Phase 4 (US2 — Terminology, all 5 tasks at once)

```text
T009: apps/core-platform/app/dashboard/page.tsx
T010: apps/core-platform/lib/mock-data/activity.ts
T011: apps/core-platform/components/dashboard/EnableModal.tsx
T012: packages/ui/src/components/Logo.tsx
T013: apps/shops-app/app/layout.tsx
```
All different files with no interdependency. Dispatch as 5 parallel sub-agents.

### Parallel Example: Phase 8 (US6 — Commerce presets)

```text
T024: apps/shops-app/lib/mode.ts           (type definitions)
T025: apps/shops-app/components/onboarding/StepBusinessAndSales.tsx (UI options)
```
T024 and T025 can be done together; T026 (StepReview.tsx label map) should follow T024.

---

## Implementation Strategy

### MVP First (P1 stories only — Phases 1–5)

1. Complete Phase 1: Setup audit
2. Complete Phase 2: Foundational (OSState type + locale utility)
3. Complete Phase 3 (US1): Product Hub page
4. Complete Phase 4 (US2): Terminology purge — run in parallel with Phase 3
5. Complete Phase 5 (US3): Onboarding alignment
6. **STOP and VALIDATE**: All 3 P1 acceptance criteria satisfied
7. Run T027–T029 build checks for P1 scope

### Full Delivery (all P1 + P2)

8. Complete Phase 6 (US4): Language switcher
9. Complete Phase 7 (US5): RTL/LTR audit
10. Complete Phase 8 (US6): Commerce presets — can run in parallel with Phase 6–7
11. Complete Phase 9: Full build verification + quickstart walkthrough

### Parallel Team Strategy

With 2 developers after Phase 2:
- **Dev A**: US1 (T004–T008) → US5 partial (T020, T022)
- **Dev B**: US2 (T009–T013) + US3 (T014) → US6 (T024–T026)

With US4 (T015–T019): can be done by either dev after US1 is complete (LocaleProvider uses AppCard and Topbar).

---

## Notes

- [P] tasks = different files, no dependencies on other in-progress tasks
- [US#] label maps each task to its user story for traceability
- No automated tests in this phase — all verification via quickstart.md manual walkthrough
- Commit after each phase checkpoint (or after each task if using atomic commits)
- US6 (Commerce OS presets) is fully independent — a solo developer can ship it without touching core-platform
- Do not rename `shops_*` session storage keys or the `shops-app` directory — out of scope per spec
- Do not modify 037 auth screens (login/register/forgot-password/reset-password/verify-email) — out of scope per spec
