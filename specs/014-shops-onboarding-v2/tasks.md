# Tasks: Shops Onboarding V2

**Input**: Design documents from `specs/014-shops-onboarding-v2/`
**Branch**: `014-shops-onboarding-v2`
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

**Scope**: `apps/shops-app` only. UI-only. No new packages. No cross-app imports. All inter-app links use `href="#"`.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no blocking dependency)
- **[Story]**: User story from spec.md (US1–US4)

---

## Phase 1: Setup

**Purpose**: AGENTS.md update — no code dependencies, run first.

- [x] T001 Update `AGENTS.md` SPECKIT block — set current feature to `014-shops-onboarding-v2`; update plan and spec paths accordingly

**Checkpoint**: AGENTS.md reflects the active feature.

---

## Phase 2: Foundational — ModeCard Interface (Prerequisite for US1)

**Purpose**: Update `ModeCard.tsx` to accept the new props required by the upgraded onboarding screen. Must complete before T003.

- [x] T002 Update `apps/shops-app/components/onboarding/ModeCard.tsx` — change `icon` prop type from `string` to `IconName` (import `IconName` from `@/components/ui/Icon`); replace the emoji `<div>` with `<Icon name={icon} className="h-5 w-5" />` inside the icon container; add `features: string[]` prop — render as a `<ul>` of `<li>` bullets below the description; add `recommended?: boolean` prop — when true, render a `"Recommended"` chip (e.g., `<span className="chip … text-emerald-400">Recommended</span>`) anchored top-right on the card using `absolute` positioning (wrap card `button` in `relative`); keep all existing selected/deselected styling unchanged

**Checkpoint**: TypeScript compiles cleanly after the ModeCard change.

---

## Phase 3: User Story 1 — Mode Selection Upgrade (Priority: P1) 🎯 MVP

**Goal**: Onboarding mode cards show inline SVG icons (not emoji), feature bullet lists, and a "Recommended" badge on the "Both" card. Button text reads "Continue to Setup".

**Independent Test**: Open `/onboarding`. Three cards visible — Business Management (`chart-bar` icon), Storefront (`shopping-bag` icon), Both (`dashboard` icon + "Recommended" badge). Each card shows 2–3 bullet features. "Continue to Setup" button visible (disabled until selection). Selecting a card enables the button. Clicking it navigates to `/dashboard`.

- [x] T003 [US1] Update `apps/shops-app/app/onboarding/page.tsx` — replace the `modes` array's `icon` field from emoji strings to `IconName` values (`"chart-bar"`, `"shopping-bag"`, `"dashboard"`); add a `features: string[]` field to each mode entry with 2–3 bullet strings per mode (Business: `"Inventory & staff management"`, `"Daily sales reports"`, `"Multi-branch support"`; Store: `"Product catalogue & listings"`, `"Customer orders tracking"`, `"Cart & checkout flow"`; Both: `"All Business Management features"`, `"All Storefront features"`, `"Unified workspace"`); add `recommended: true` only to the `"both"` entry; pass `features`, `recommended` (defaulting to `false`) to `<ModeCard>`; change button text from `"Continue →"` to `"Continue to Setup"`; keep all other layout, routing, and sessionStorage logic unchanged

**Checkpoint**: US1 complete — onboarding page shows icon-based cards with bullets and Recommended badge; other behaviour unchanged.

---

## Phase 4: User Story 2 — Setup Checklist on Dashboard (Priority: P1)

**Goal**: A "Setup checklist" card appears on the dashboard showing 5 static unchecked steps and a "0 of 5 complete" progress label.

**Independent Test**: Open `/dashboard`. A card labelled "Setup checklist" is visible above the quick-actions bar. It shows 5 named steps, all unchecked (hollow circle icon or equivalent). A label reads "0 of 5 complete". No item responds to clicks.

- [x] T004 [P] [US2] Create `apps/shops-app/components/dashboard/SetupChecklist.tsx` — Server Component (no `"use client"`); define a `steps` constant array of 5 strings: `"Choose shop mode"`, `"Add business profile"`, `"Add first product"`, `"Invite team member"`, `"Review settings"`; render a `.card p-5` wrapper with: a `chip mb-1 text-gray-500` label `{"// setup checklist"}`, an `h3` "Get started", a `"0 of 5 complete"` progress line in `font-mono text-xs text-gray-500`, then a `<ul>` of items each showing a hollow circle `<span>` + step label in `text-sm text-white/70`; the hollow circle is a `h-4 w-4 rounded-full border-2 border-white/20 flex-shrink-0` span; no `onClick` handlers anywhere

---

## Phase 5: User Story 3 — Store Profile Card on Dashboard (Priority: P2)

**Goal**: A "Store profile" card shows mock store identity alongside the setup checklist.

**Independent Test**: Open `/dashboard`. Next to (or below) the setup checklist, a "Store profile" card shows: store name "Mustafa's Co.", branch "Maadi Main", currency "EGP", the selected mode label (e.g., "Both"), and a "Foundation setup" badge. No edit button. No clickable elements.

- [x] T005 [P] [US3] Create `apps/shops-app/components/dashboard/StoreProfile.tsx` — `"use client"` component; read mode via lazy `useState<ShopsMode | null>(() => typeof window === "undefined" ? null : getMode())`; define a `modeLabel` map: `{ business: "Business Management", store: "Storefront", both: "Both" }`; render a `.card p-5` wrapper with: a `chip mb-1 text-gray-500` label `{"// store profile"}`, an `h3` "Mustafa's Co.", then a list of rows (icon + label pairs) for: branch (`map-pin` icon, "Maadi Main"), currency (`banknote` icon, "EGP"), mode (`dashboard` icon, `modeLabel[mode] ?? "—"`); add a `"Foundation setup"` badge at the bottom using `chip border border-blue-500/20 bg-blue-500/10 text-blue-300`; no interactive elements; import `Icon` from `@/components/ui/Icon`, `getMode` and `ShopsMode` from `@/lib/mode`

---

## Phase 6: User Story 4 — Mode-Adapted Next Steps on Dashboard (Priority: P2)

**Goal**: A "Next steps" card below the stat cards shows 2–3 contextual action suggestions based on the selected mode.

**Independent Test**: Open `/dashboard` after selecting "Business" in onboarding → next steps show "Review reports", "Invite team member", "Configure tax settings". Select "Store" → shows "Add first product", "Configure POS", "Set up inventory". Select "Both" (or null) → shows "Add first product", "Review reports", "Configure POS". All links use `href="#"`.

- [x] T006 [P] [US4] Create `apps/shops-app/components/dashboard/NextSteps.tsx` — `"use client"` component; read mode via lazy useState (same pattern as StoreProfile); define a `nextStepsMap` keyed by mode (`"business"`, `"store"`, `"both"`) each with an array of `{ label: string; icon: IconName; description: string }` objects per the plan research table; fallback to `"both"` suggestions when mode is `null`; render a `.card p-5` wrapper with: `chip mb-1 text-gray-500` label `{"// next steps"}`, an `h3` "Where to go next", then a `flex flex-col sm:flex-row gap-3 mt-4` row of action items; each action item is an `<a href="#">` card (`rounded-xl border border-white/10 bg-white/[0.02] p-4 flex items-start gap-3 hover:bg-white/5 transition-colors`); action items for each mode:
  - `"business"`: `{ label: "Review reports", icon: "chart-bar", description: "See today's sales summary" }`, `{ label: "Invite team member", icon: "users", description: "Add staff to your workspace" }`, `{ label: "Configure tax settings", icon: "settings", description: "Set up VAT and tax rules" }`
  - `"store"` / `null` (both maps): `{ label: "Add first product", icon: "package", description: "Start building your catalogue" }`, `{ label: "Configure POS", icon: "scan-line", description: "Set up point of sale" }`, `{ label: "Set up inventory", icon: "package-search", description: "Track stock levels" }`
  - `"both"` / fallback: `{ label: "Add first product", icon: "package", description: "Start building your catalogue" }`, `{ label: "Review reports", icon: "chart-bar", description: "See today's sales summary" }`, `{ label: "Configure POS", icon: "scan-line", description: "Set up point of sale" }`

---

## Phase 7: Dashboard Integration

**Purpose**: Wire up the three new components into the dashboard page. Depends on T004, T005, T006 all complete.

**Independent Test**: Open `/dashboard`. Above the quick-actions bar: Next steps card visible (mode-responsive). Below next steps: two-column grid with SetupChecklist on the left and StoreProfile on the right (stacks on mobile). All existing content (stat cards, orders table, low stock, top products, bar chart) remains unchanged.

- [x] T007 [US2] [US3] [US4] Update `apps/shops-app/app/(app)/dashboard/page.tsx` — add imports for `SetupChecklist`, `StoreProfile`, `NextSteps` from their respective `@/components/dashboard/` paths; insert `<NextSteps />` immediately after the stat cards grid (`mt-5`); insert a two-column grid `<div className="mt-5 grid gap-5 lg:grid-cols-2">` containing `<SetupChecklist />` and `<StoreProfile />` immediately after `<NextSteps />`; keep all existing sections (quick actions, orders table, low stock, top products, bar chart) below unchanged; do not add a separate mode `useState` to the page — each new component manages its own mode read internally

**Checkpoint**: All four user stories complete — dashboard shows next steps, checklist, and store profile; onboarding shows upgraded cards.

---

## Phase 8: Polish & Build Gate

**Purpose**: Lint and build to confirm zero errors.

- [x] T008 Run `pnpm lint` in `apps/shops-app` — fix all errors
- [x] T009 Run `pnpm --filter shops-app build` — must exit 0

---

## Dependencies & Execution Order

### Phase Dependencies

```
T001 (AGENTS.md)       → no deps ✅ done
T002 (ModeCard)        → no deps; blocks T003
T003 (Onboarding page) → depends on T002
T004 (SetupChecklist)  → no deps; parallel with T005, T006
T005 (StoreProfile)    → no deps; parallel with T004, T006
T006 (NextSteps)       → no deps; parallel with T004, T005
T007 (Dashboard page)  → depends on T004 + T005 + T006 all complete
T008 (lint)            → depends on T003, T007
T009 (build)           → depends on T008
```

### Parallel Opportunities

```
T001 ✅
T002 → T003           (ModeCard interface → onboarding page)

T004 ─┐
T005 ─┤→ T007          (all three new components → dashboard wiring)
T006 ─┘

T004/T005/T006 can run in parallel with T002/T003 (different files)

After T003 + T007 → T008 → T009
```

### Fastest Sequential Order

```
T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009
```

---

## Implementation Strategy

### MVP First (US1 + US2 — core onboarding + first dashboard signal)

1. T001 (AGENTS.md — done)
2. T002 (ModeCard interface)
3. T003 (Onboarding page upgrade)
4. T004 (SetupChecklist component)
5. T007 partial — add only SetupChecklist to dashboard
6. **STOP and VALIDATE**: Onboarding shows richer cards; dashboard shows checklist
7. Continue T005 → T006 → T007 (full) → T008 → T009

### Incremental Delivery

1. T001 + T002 + T003 → Onboarding fully upgraded
2. + T004 + T007 (checklist only) → Dashboard has setup guidance
3. + T005 + T007 (profile) → Store profile visible
4. + T006 + T007 (next steps) → Mode-adapted guidance visible
5. T008 + T009 → Both lints and builds pass, feature complete

---

## Notes

- T002 changes `icon` from `string` to `IconName` — run `pnpm tsc --noEmit` in `apps/shops-app` immediately after T002 to verify no type errors before proceeding to T003
- T003 passes `features` and `recommended` as new props — if TypeScript reports missing props, T002 was not applied correctly
- T004 is a Server Component — do NOT add `"use client"` to `SetupChecklist.tsx`
- T005 and T006 both use the lazy useState pattern: `useState<ShopsMode | null>(() => typeof window === "undefined" ? null : getMode())` — do NOT use `useEffect` for this
- T007 must not add a mode useState to `dashboard/page.tsx` itself — each new component is self-contained
- The `"both"` entry in `nextStepsMap` and the `null` fallback should render identical content — define once and reuse
- T008/T009: both lint and build must exit 0 before marking the feature complete
