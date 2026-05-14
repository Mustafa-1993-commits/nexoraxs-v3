# Tasks: Shops Onboarding Business Type Flow

**Input**: Design documents from `specs/019-shops-onboarding-business-type-flow/`
**Branch**: `019-shops-onboarding-business-type-flow`
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Research**: [research.md](./research.md) | **Contracts**: [contracts/step-components.md](./contracts/step-components.md)

**Scope**: `apps/shops-app` only. No new packages. No cross-app imports. All links within-app. No form submission to backend.

---

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no blocking dependency)
- **[Story]**: User story from spec.md (US1–US5)

---

## Phase 1: Setup

- [X] T001 Update `AGENTS.md` SPECKIT block — set current feature to `019-shops-onboarding-business-type-flow`; update plan and spec paths accordingly

**Checkpoint**: AGENTS.md reflects the active feature.

---

## Phase 2: Foundational — Type Migration and Icon Extension

**Purpose**: Both foundational tasks are blocking prerequisites. `lib/mode.ts` must be updated before any step component can use the new types. `Icon.tsx` must have the new icons before `StepBusinessType.tsx` can render them. Run in parallel — different files.

- [X] T002 [P] Update `apps/shops-app/lib/mode.ts` — (1) change `ShopsMode` type from `"business" | "store" | "both"` to `"physical" | "online" | "both"`; (2) update `getMode()` validation: replace `value === "business"` with `value === "physical"` and `value === "store"` with `value === "online"` (keep `"both"` check unchanged); (3) add new type: `export type BusinessType = "mobile" | "accessories" | "clothing" | "supermarket" | "electronics" | "cosmetics" | "other"`; (4) add constant `const BUSINESS_TYPE_KEY = "shops_business_type"` and two exports: `setBusinessType(t: BusinessType): void` (window-guarded `sessionStorage.setItem`) and `getBusinessType(): BusinessType | null` (window-guarded read, validate against all 7 BusinessType values); (5) add constant `const STORE_NAME_KEY = "shops_store_name"` and two exports: `setStoreName(name: string): void` and `getStoreName(): string | null`; (6) add constant `const COUNTRY_KEY = "shops_country"` and two exports: `setCountry(country: string): void` and `getCountry(): string | null`; keep ALL existing exports (`setMode`, `clearMode`, `setBranch`, `getBranch`, `setCurrency`, `getCurrency`, `completeOnboarding`, `isOnboardingComplete`, `resetOnboarding`) completely unchanged

- [X] T003 [P] Update `apps/shops-app/components/ui/Icon.tsx` — add 8 new entries to the `IconName` union and `paths` record: `"smartphone"` (Mobile Store — phone outline with home indicator dot), `"watch"` (Accessories Store — circle with tick marks and hands), `"shirt"` (Clothing Store — shirt/tee silhouette), `"shopping-cart"` (Supermarket — cart body with wheels), `"cpu"` (Electronics Store — chip square with pins and inner square), `"sparkles"` (Cosmetics Store — multi-point star burst), `"store-front"` (Other Retail — building facade with door), `"layers"` (Both sales model — 3 stacked layers); SVG paths for each: `smartphone: "M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-5 17a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"`, `watch: "M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2zm0 3v2.5l1.5 1M9 2h6M9 22h6"`, `shirt: "M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"`, `shopping-cart: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6M17 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"`, `cpu: "M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2M10 10h4v4h-4z"`, `sparkles: "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5zM5.5 15l.75 2.25L8.5 18l-2.25.75L5.5 21l-.75-2.25L2.5 18l2.25-.75zm13 0l.75 2.25L21.5 18l-2.25.75L18.5 21l-.75-2.25L15.5 18l2.25-.75z"`, `store-front: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10M2 9h20"`, `layers: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"`

**Checkpoint**: Run `pnpm tsc --noEmit` in `apps/shops-app` — zero errors. Confirm new `ShopsMode` values compile in any file that imports it.

---

## Phase 3: User Story 1 — Business Type Selection (Priority: P1) 🎯 MVP

**Goal**: Step 1 of the onboarding shows 7 selectable business type cards in a responsive grid. Each card has a distinct icon (from new Icon.tsx additions), tinted icon container, title, description, examples footer, and selected state. "Continue" is disabled until one is selected.

**Independent Test**: Navigate to `/onboarding` in a clean session. A grid of 7 cards is visible. Each has a different icon and colour tint. Clicking "Mobile Store" highlights it and enables Continue. Clicking another card deselects Mobile Store and selects the new one.

- [X] T004 [US1] Create `apps/shops-app/components/onboarding/StepBusinessType.tsx` — define type `BusinessTypeOption` as the category metadata shape; define `categories` constant array (7 entries per research Decision 5): each with `id: BusinessType`, `icon: IconName`, `title`, `desc`, `examples`, `tintText` (Tailwind text colour class), `tintBg` (Tailwind bg colour class), `tintBorder` (Tailwind border colour class); render: heading "What type of shop do you run?", subtitle "We'll tailor your workspace based on the products you sell.", then `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">` mapping over categories; each card is a `<button type="button">` with: selected state border `border-blue-500/50 bg-blue-500/[0.05] ring-1 ring-blue-500/30` / unselected state `border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]`; card contents: top-right "Selected" chip when `isSelected`; icon container `<div className="flex h-12 w-12 items-center justify-center rounded-xl border ${tintBg} ${tintBorder} ${tintText} mb-4">` with `<Icon name={icon} className="h-6 w-6" />`; title `text-base sm:text-lg font-semibold`; description `text-sm text-white/50`; examples footer `<div className="pt-4 border-t border-white/5"><p className="text-xs text-white/40"><span className="font-mono text-[10px] text-white/20 uppercase tracking-wider">Ex: </span>{examples}</p></div>`; import `Icon` from `@/components/ui/Icon` and `type { IconName }` from same; import `type { BusinessType }` from `@/lib/mode`; export props interface `StepBusinessTypeProps { selected: BusinessType | null; onSelect: (t: BusinessType) => void }`

**Checkpoint**: US1 component built — verify by importing it in any file and TypeScript shows no errors.

---

## Phase 4: User Story 2 — Sales Model Selection (Priority: P1)

**Goal**: Step 2 shows 3 large cards (Physical / Online / Both) each with an icon, description, and a 4-item feature checklist. "Both" has a "Recommended" badge. Selected state shows a left-edge blue accent bar.

**Independent Test**: Navigating to Step 2 shows 3 stacked cards. Each shows a checklist. "Both physical + online" has a "Recommended" badge. Clicking a card selects it (highlighted border + left accent bar). "Back" returns to Step 1 with the prior selection.

- [X] T005 [P] [US2] Create `apps/shops-app/components/onboarding/StepSalesModel.tsx` — define `models` constant array (3 entries per research Decision 1 / plan section 4): `physical` (icon `"dashboard"` as physical/shop placeholder, features: ["POS", "Branch operations", "Inventory", "Walk-in customers"], tint: emerald), `online` (icon `"shopping-bag"`, features: ["Product catalog", "Online orders", "Storefront", "Customer checkout"], tint: blue), `both` (icon `"layers"`, features: ["Unified inventory", "POS", "Storefront", "Reports"], tint: cyan, recommended: true); render: heading "How do you sell?", subtitle "Choose how customers reach your products. This shapes which modules are turned on."; model cards as `<div className="flex flex-col gap-4 sm:gap-5">`; each card `<button type="button" className="relative w-full text-left ...">`: selected state adds `border-blue-500/50 ring-1 ring-blue-500/30` and an absolute left-edge accent `<div className="absolute left-0 top-4 bottom-4 w-0.5 bg-blue-500 rounded-r" />`; card layout `flex flex-col sm:flex-row gap-6 sm:items-center`: left side has icon container + title + optional "Recommended" chip + desc; right side (on sm+ screens) has `sm:w-[240px] sm:border-l sm:border-white/10 sm:pl-6 flex flex-col gap-2` with 4 feature items each as `<div className="flex items-center gap-2 text-sm text-white/70"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 flex-shrink-0 text-blue-400 opacity-0 [.selected_&]:opacity-100"><path d="M20 6L9 17l-5-5" /></svg>{feature}</div>` (or use simpler bullet); export props `{ selected: ShopsMode | null; onSelect: (m: ShopsMode) => void }`; import `type { ShopsMode }` from `@/lib/mode`; import `Icon` from `@/components/ui/Icon`

**Checkpoint**: US2 component built — 3 cards, feature lists, Recommended badge on "both".

---

## Phase 5: User Story 3 — Store Setup Form (Priority: P1)

**Goal**: Step 3 shows a two-column form card (desktop) with: read-only workspace row, business type + sales model summary chips with back-edit links, 4 input fields (store name, branch, currency select, country select), and a live preview card on the right.

**Independent Test**: Step 3 form shows "Mustafa's Co." as read-only. Typing in Store Display Name updates the live preview. Clearing the store name disables Continue. Currency select has 5 options. Country select has 4 options.

- [X] T006 [P] [US3] Create `apps/shops-app/components/onboarding/StepStoreSetup.tsx` — define and export `interface StoreSetupData { storeName: string; branch: string; currency: string; country: string }`; define props interface `StepStoreSetupProps { data: StoreSetupData; onChange: (d: StoreSetupData) => void; businessType: BusinessType | null; salesModel: ShopsMode | null; onGoToStep: (step: number) => void }`; define inline maps `businessTypeLabel: Record<BusinessType, string>` and `salesModelLabel: Record<ShopsMode, string>` per research Decision 7; render: heading "Set up your shop", subtitle "A few details so we can create your store."; `<div className="grid grid-cols-1 lg:grid-cols-5 gap-8">`: left `lg:col-span-3` form card `.card p-6 space-y-5` containing: (a) workspace read-only row `flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5` — left text "Workspace: Mustafa's Co." — right `<span className="text-xs text-white/30">(Read-only)</span>`; (b) summary chips row `flex flex-wrap gap-2` — business type chip `chip border border-white/10 flex items-center gap-1.5` with label + `<button type="button" onClick={() => onGoToStep(1)} className="text-white/30 hover:text-white transition-colors">edit</button>`; sales model chip similar with `onGoToStep(2)`; (c) store name input: `<label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1.5">Store Display Name</label><input type="text" value={data.storeName} onChange={(e) => onChange({...data, storeName: e.target.value})} maxLength={60} placeholder="e.g. Mustafa's Co." className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-gray-600" />`; (d) branch input: similar, label "Main Branch", placeholder "e.g. Maadi Main"; (e) two-column grid for currency select (options: EGP, USD, SAR, AED, EUR) and country select (options: Egypt, Saudi Arabia, UAE, USA) — both use `select` with same styling + `<Icon name="chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />` inside `relative` wrapper; right `lg:col-span-2` preview card `.card p-5` (`sticky top-8`) showing: store initials avatar (first char of storeName in `bg-blue-600 text-white rounded-lg h-10 w-10`), store name truncated, branch label, currency + country footer row; import `type { BusinessType, ShopsMode }` from `@/lib/mode` and `Icon` from `@/components/ui/Icon`

**Checkpoint**: US3 component built — form renders, live preview updates on type, currency/country selects have correct options.

---

## Phase 6: User Story 4 — Review and Finish Screen (Priority: P1)

**Goal**: Step 4 shows a confirmation heading, 7 summary cards, an enabled modules grid (sales-model-dependent), and 4 next action items. No interactive state — fully display-only.

**Independent Test**: Step 4 shows "Your shop workspace is ready". 7 summary cards show correct values. With "Online only" selected, the modules grid shows Storefront but no POS. With "Both" selected, both POS and Storefront appear. "Finish setup" button is present.

- [X] T007 [P] [US4] Create `apps/shops-app/components/onboarding/StepReview.tsx` — import `StoreSetupData` from `@/components/onboarding/StepStoreSetup`, `type { BusinessType, ShopsMode }` from `@/lib/mode`, `Icon` from `@/components/ui/Icon`; define `businessTypeLabel`, `salesModelLabel` maps (same as StepStoreSetup); define `summaryCards` array (7 entries: Workspace/dashboard/"Mustafa's Co.", BusinessType/package/formatType(businessType), SalesModel/shopping-bag/formatSalesModel(salesModel), StoreName/file-text/setup.storeName, Branch/map-pin/setup.branch, Currency/banknote/setup.currency, Country/trending-up/setup.country); define base modules array (Dashboard/dashboard, Products/package, Inventory/package-search, Customers/users, Sales/receipt, Reports/chart-bar) and derive full modules by inserting POS/scan-line after Sales when `salesModel === "physical" || salesModel === "both"` and appending Storefront/shopping-bag when `salesModel === "online" || salesModel === "both"`; define `nextActions` array: [{title: "Add first product", desc: "Create items to sell"}, {title: "Set opening stock", desc: "Initialize your inventory"}, {title: "Invite team member", desc: "Add staff and assign roles"}, {title: "Review settings", desc: "Configure your preferences"}]; render: check icon circle `flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20` (use `<svg>` inline checkmark, not Icon component), heading "Your shop workspace is ready", subtitle; then `<div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">`: left `lg:col-span-2 space-y-8` containing: summary cards `<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">` (each `.card p-4 flex flex-col gap-2` with Icon + label chip + value); modules grid `<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">` (each `.card p-4` with Icon + name + desc, Storefront cards add an "Online" emerald chip); right `lg:col-span-1 .card p-2` listing 4 next actions as `<a href="#">` buttons each `flex items-center gap-4 p-4 rounded-xl hover:bg-white/5` with numbered circle + title + desc

**Checkpoint**: US4 component built — modules grid correctly shows/hides POS and Storefront based on props.

---

## Phase 7: Onboarding Page Rewrite (US1–US4 Integration)

**Goal**: Rewrite `app/onboarding/page.tsx` to orchestrate all 4 steps, manage shared state, handle navigation, persist to sessionStorage on finish, and show completion state for returning users.

**Independent Test**: Full end-to-end flow: (1) open `/onboarding` fresh — Step 1 shown; (2) select "Supermarket", click Continue — Step 2 shown, selected type remembered; (3) select "Physical store only", click Continue — Step 3 shown; (4) type "Mustafa's Market" + "Maadi Branch", click Continue — Step 4 shown with correct summary; (5) click "Finish setup" — navigates to `/dashboard`; DevTools shows all 7 session keys present.

- [X] T008 [US1] [US2] [US3] [US4] Rewrite `apps/shops-app/app/onboarding/page.tsx` — add `"use client"` directive; imports: `useState`, `useSyncExternalStore` from `react`; `useRouter` from `next/navigation`; `StepBusinessType` from `@/components/onboarding/StepBusinessType`; `StepSalesModel` from `@/components/onboarding/StepSalesModel`; `StepStoreSetup`, `type { StoreSetupData }` from `@/components/onboarding/StepStoreSetup`; `StepReview` from `@/components/onboarding/StepReview`; `type { BusinessType, ShopsMode }` and all needed helpers (`getBusinessType`, `getBranch`, `getCurrency`, `getCountry`, `getStoreName`, `getMode`, `isOnboardingComplete`, `setBusinessType`, `setMode`, `setStoreName`, `setBranch`, `setCurrency`, `setCountry`, `completeOnboarding`) from `@/lib/mode`; state: `const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)` then `const [currentStep, setCurrentStep] = useState<1|2|3|4>(1)`; `const [businessType, setBusinessType_] = useState<BusinessType | null>(null)` (use alias to avoid clash with imported `setBusinessType`); `const [salesModel, setSalesModel] = useState<ShopsMode | null>(null)`; `const [storeSetup, setStoreSetup] = useState<StoreSetupData>({ storeName: "", branch: "", currency: "EGP", country: "Egypt" })`; `const isComplete = mounted ? isOnboardingComplete() : false`; pre-populate on `mounted` change using a `useEffect` or inline — when `mounted` becomes true, if `getBusinessType()` is non-null set `businessType_`, if `getMode()` is non-null set `salesModel`, set `storeSetup` from session values; canProceed: step 1 = `businessType !== null`, step 2 = `salesModel !== null`, step 3 = `storeSetup.storeName.trim() !== "" && storeSetup.branch.trim() !== ""`, step 4 = `true`; handleContinue: steps 1+2 just advance; step 3 writes `setBranch`, `setCurrency`, `setCountry`, `setStoreName` to session then advances; step 4 ("Finish setup") writes ALL session keys (`setBusinessType(businessType!)`, `setMode(salesModel!)`, remaining session keys) then calls `completeOnboarding()` then `router.push("/dashboard")`; handleBack: decrement step; handleGoToStep(n): set step to n; 4-step stepper indicator: `<div className="flex items-center gap-2 mb-10">` with 4 pills + connecting lines; pill for current step: `bg-blue-600 text-white`; completed steps: `bg-blue-600/30 text-blue-400`; upcoming: `border border-white/20 text-white/30`; pill label below each pill in `font-mono text-[10px] text-gray-600`; step labels: "Business", "Sales", "Setup", "Review"; fixed bottom nav `<div className="fixed bottom-0 left-0 right-0 border-t border-white/5 bg-[#0a0a0f]/90 backdrop-blur-xl p-4 sm:p-6 z-50">` with Back button (hidden on step 1 via `opacity-0 pointer-events-none`) and Continue/Finish setup button; if `isComplete → <CompletionState />` (reuse the existing `CompletionState` function defined earlier in the file); if `!mounted → skeleton`; render stepper + step panels in `<main className="mx-auto max-w-5xl px-4 pt-8 pb-32">`

**Checkpoint**: Full onboarding flow works end-to-end — all 4 steps advance and back correctly; "Finish setup" routes to `/dashboard` with all 7 session keys set.

---

## Phase 8: User Story 5 — Dashboard Compatibility (Priority: P2)

**Goal**: Update the 3 dashboard components that hardcode old `ShopsMode` string values (`"business"`, `"store"`) to use the new values (`"physical"`, `"online"`). All 3 changes are in different files and can run in parallel.

**Independent Test**: After completing onboarding with "Online store only" selected, navigate to `/dashboard`. `NextSteps` component shows online-appropriate suggestions (not business suggestions). `StoreProfile` shows "Online Store" (not "Storefront"). `/settings` shows the correct mode label.

- [X] T009 [P] [US5] Update `apps/shops-app/components/dashboard/NextSteps.tsx` — rename the `steps` record keys from `business` to `physical` and `store` to `online`; update the `steps[mode ?? "both"]` fallback accordingly; import `type { ShopsMode }` — the type is already updated via T002 so TypeScript will validate the new keys; keep all step content (labels, icons, descriptions) unchanged — only the key names change

- [X] T010 [P] [US5] Update `apps/shops-app/components/dashboard/StoreProfile.tsx` — rename `modeLabel` record keys: `business: "Business Management"` → `physical: "Physical Store"` and `store: "Storefront"` → `online: "Online Store"` (keep `both: "Both"` unchanged); TypeScript will flag the old keys since `ShopsMode` no longer includes `"business"` or `"store"` — the fix is just renaming the keys

- [X] T011 [P] [US5] Update `apps/shops-app/app/(app)/settings/page.tsx` — rename `modeLabel` record keys identically to T010: `physical: "Physical Store"`, `online: "Online Store"`, `both: "Both"`; no other changes to settings page

**Checkpoint**: US5 complete — TypeScript compiles cleanly; dashboard components show correct labels for new mode values.

---

## Phase 9: Build Gate

- [X] T012 Run `pnpm lint` in `apps/shops-app` — fix all errors
- [X] T013 Run `pnpm tsc --noEmit` in `apps/shops-app` — must exit 0
- [X] T014 Run `pnpm --filter shops-app build` — must exit 0; confirm `/onboarding` and all 5 operations pages appear in build output

---

## Dependencies & Execution Order

### Phase Dependencies

```
T001 (AGENTS.md)         → no deps
T002 (lib/mode.ts)       → no deps; blocks T004–T011 (all need updated types)
T003 (Icon.tsx)          → no deps; [P] with T002; blocks T004 (business type icons)

T004 (StepBusinessType)  → depends on T002 + T003
T005 (StepSalesModel)    → depends on T002; [P] with T004 (different file)
T006 (StepStoreSetup)    → depends on T002; [P] with T004, T005 (different file)
T007 (StepReview)        → depends on T002; [P] with T004, T005, T006 (different file)

T008 (page.tsx rewrite)  → depends on T004 + T005 + T006 + T007 all complete

T009 (NextSteps)         → depends on T002; [P] with T004–T008 (different file)
T010 (StoreProfile)      → depends on T002; [P] with T004–T008 (different file)
T011 (settings)          → depends on T002; [P] with T004–T008 (different file)

T012 (lint)              → depends on T008 + T009 + T010 + T011 all complete
T013 (tsc)               → [P] with T012
T014 (build)             → depends on T012 + T013
```

### Parallel Opportunities

```
T001 + T002 + T003     (setup — different files)

After T002 + T003:
  T004 ─┐
  T005 ─┤  (step components — different files, all parallel)
  T006 ─┤
  T007 ─┘

  T009 ─┐
  T010 ─┤  (dashboard updates — different files, parallel with step components)
  T011 ─┘

After T004+T005+T006+T007 → T008  (page rewrite — needs all 4 step components)
After T008+T009+T010+T011 → T012+T013 → T014
```

### Fastest Sequential Order

```
T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010 → T011 → T012 → T013 → T014
```

---

## Implementation Strategy

### MVP First (US1 only — business type selection works)

1. T001 (AGENTS.md)
2. T002 (lib/mode.ts) + T003 (Icon.tsx) — parallel
3. T004 (StepBusinessType.tsx)
4. T008 partial — rewrite page.tsx with only Step 1 rendering (stub Steps 2–4 as placeholder divs)
5. **STOP and VALIDATE**: `/onboarding` shows Step 1 with 7 selectable cards; Continue advances to Step 2 placeholder
6. Complete T005 → T006 → T007 → T008 (full page wiring)

### Incremental Delivery

1. T001 + T002 + T003 → Foundation ready
2. + T004 → Step 1 has full business type grid
3. + T005 → Step 2 has sales model cards
4. + T006 → Step 3 has store setup form
5. + T007 → Step 4 has review screen
6. + T008 → Full onboarding flow end-to-end
7. + T009 + T010 + T011 → Dashboard compatibility restored
8. T012 + T013 + T014 → Feature ships

---

## Notes

- T002: Run `pnpm tsc --noEmit` immediately after T002 to catch all type errors in components that depend on `ShopsMode`. TypeScript will flag T009–T011 files (still using old keys) — this is expected and will be resolved in those tasks.
- T003: The 8 new icon paths are provided verbatim in the task description. Use them exactly — do not approximate. Verify each is valid SVG path data by inspection (each `M/L/a/z` command should be syntactically valid).
- T004: The `categories` array uses Tailwind classes like `text-cyan-400`, `bg-cyan-500/10`, `border-cyan-500/20`. These are standard Tailwind v4 classes and do not require custom config.
- T005: The inline check icon SVG in the feature list (`<path d="M20 6L9 17l-5-5" />`) is simpler to render inline than adding another icon to `Icon.tsx`. Use it as an inline `<svg>` directly.
- T006: The `useEffect` to pre-populate `storeSetup` from sessionStorage should only run once (empty deps `[]`), and should only run client-side (guard with `if (mounted)` check or rely on `useEffect` always being client-only).
- T007: The check icon in the heading (`Your shop workspace is ready`) is also simplest as inline SVG with path `"M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3"`.
- T008: The pre-population `useEffect` in the onboarding page should use an empty dependency array `[]` to run once on mount. It sets `businessType_`, `salesModel`, and `storeSetup` from sessionStorage. This is a one-time read; subsequent user selections update React state only (not sessionStorage) until Continue is clicked.
- T008: Name the `useState` setter `setBusinessType_` (trailing underscore) to avoid collision with the imported `setBusinessType` helper from `lib/mode.ts`. Alternatively, import it with an alias: `import { setBusinessType as persistBusinessType } from "@/lib/mode"`.
- T008: The `CompletionState` component can be inlined in the page file (not imported from the old `ModeCard.tsx` or any other file) — it's a simple card with "You're all set" heading and `/dashboard` link.
- T009–T011: These 3 tasks are purely key-renaming changes in `modeLabel` or `steps` objects. Each is a 2-line change.
- T012–T013: Run lint and tsc in parallel — they're independent checks.
- T014: If build fails, investigate TypeScript errors first (tsc output); ESLint errors second (lint output). Both must pass before T014.
