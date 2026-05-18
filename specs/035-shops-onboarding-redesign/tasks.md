# Tasks: Shops Onboarding — New 4-Step Flow Redesign

**Input**: Design documents from `specs/035-shops-onboarding-redesign/`  
**Branch**: `035-shops-onboarding-redesign`  
**App**: `apps/shops-app`

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US5)
- All paths are relative to repo root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the shared type file and extend the session storage library. These block all step component work.

- [x] T001 Create `apps/shops-app/lib/onboarding-types.ts` — define and export: `OnboardingProduct` interface (`name: string; price: number; stock: number`), `StoreSetupFormData` interface (`storeName, branch, branchAddress, branchCountry, branchCurrency, branchTimezone: string`), `ModuleDefinition` interface (`id, label, icon: IconName, enabledFor: readonly ShopsMode[], disabledReason: string`), and the `MODULE_DEFINITIONS` constant (array of 7 modules: pos/inventory/branches/storefront/orders/checkout/reports with their `enabledFor` arrays and `disabledReason` strings per data-model.md)

- [x] T002 Extend `apps/shops-app/lib/mode.ts` — (a) add `"food-beverage" | "books-media" | "home-furniture"` to the `BusinessType` union (keep `"accessories"` for backward compat but keep it out of the BUSINESS_TYPES validation array for new entries); (b) add storage key constants `BRANCH_ADDRESS_KEY = "shops_branch_address"`, `TIMEZONE_KEY = "shops_timezone"`, `PRODUCTS_KEY = "shops_onboarding_products"`, `BUSINESS_TYPE_CUSTOM_KEY = "shops_business_type_custom"`; (c) add functions: `setBranchAddress(addr: string): void`, `getBranchAddress(): string | null`, `setTimezone(tz: string): void`, `getTimezone(): string | null`, `setOnboardingProducts(products: OnboardingProduct[]): void` (JSON.stringify), `getOnboardingProducts(): OnboardingProduct[]` (JSON.parse with fallback to `[]`), `setBusinessTypeCustom(label: string): void`, `getBusinessTypeCustom(): string | null`; (d) add `COUNTRY_DEFAULTS: Record<string, { currency: string; timezone: string }>` with 11 entries: Egypt→EGP/Africa/Cairo, Saudi Arabia→SAR/Asia/Riyadh, UAE→AED/Asia/Dubai, Kuwait→KWD/Asia/Kuwait, Qatar→QAR/Asia/Qatar, Jordan→JOD/Asia/Amman, Bahrain→BHD/Asia/Bahrain, Oman→OMR/Asia/Muscat, Morocco→MAD/Africa/Casablanca, United States→USD/America/New_York, United Kingdom→GBP/Europe/London; (e) export `COUNTRY_DEFAULTS` and `OnboardingProduct` type from the file

**Checkpoint**: `lib/mode.ts` and `lib/onboarding-types.ts` compile with no TypeScript errors.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: No separate foundational phase — the types and mode.ts from Phase 1 are the shared foundation. All user story phases can proceed after Phase 1.

**⚠️ CRITICAL**: Complete T001 and T002 before any step component work.

---

## Phase 3: User Story 1 — Step 1: Business Type & Sales Model (Priority: P1) 🎯 MVP

**Goal**: A fully working merged Step 1 that captures business type and sales model in one view with live module preview.

**Independent Test**: Navigate to `/onboarding`; verify: 3×3 emoji grid renders with 9 tiles; selecting "Other" reveals text input; selecting any sales model updates module preview; "Continue →" disabled until both businessType (non-empty if "other") and salesModel are selected; "Both physical + online" is pre-selected on load.

### Implementation for User Story 1

- [x] T003 [US1] Create `apps/shops-app/components/onboarding/StepBusinessAndSales.tsx` — full component with 3 sections: **Section 1** "What do you sell?" — 3×3 grid (9 tiles: Mobile Store 📱, Electronics 💻, Clothing & Fashion 👕, Food & Beverage 🍕, Books & Media 📚, Home & Furniture 🏠, Cosmetics & Beauty 💄, Supermarket 🛒, Other 🔧); emoji rendered as text in a colored tile; selected tile gets blue ring; "Other" tile reveals a text input below the grid for custom label; **Section 2** "How do you sell?" — 3 sales model cards stacked: Physical card (emerald glow, building-2 Icon from @nexoraxs/ui, "IN-STORE" chip tag, features: POS · Inventory · Branches · Walk-in), Online card (blue glow, globe Icon, "E-COMMERCE" chip tag, features: Storefront · Cart · Checkout · Shipping), Both card (purple glow + ring border, zap Icon, "RECOMMENDED" chip tag + full-width prominent styling, features: Everything above + Unified inventory); Both is the DEFAULT selected state; **Section 3** "Based on your choices, we'll enable:" — colored Badge pills (from @nexoraxs/ui) that update immediately when salesModel changes: Physical→[POS][Inventory][Branches][Reports], Online→[Storefront][Orders][Checkout][Reports], Both→[POS][Storefront][Inventory][Orders][Reports][+3 more]; Props: `businessType: BusinessType | null`, `customBusinessType: string`, `salesModel: ShopsMode | null`, `onBusinessTypeChange: (t: BusinessType) => void`, `onCustomBusinessTypeChange: (s: string) => void`, `onSalesModelChange: (m: ShopsMode) => void`; all strictly typed with no `any`; uses types from `@/lib/mode` and `@nexoraxs/ui`

**Checkpoint**: Step 1 renders, grid selection works, sales model toggle works, module preview updates live, "Continue →" disabled correctly.

---

## Phase 4: User Story 2 — Step 2: Store Setup (Priority: P1)

**Goal**: Step 2 enhanced with branch address, timezone, and country-auto-fill for currency+timezone.

**Independent Test**: Navigate to Step 2 (after completing Step 1); verify: Branch Address field present (optional); Country dropdown triggers auto-fill of Currency AND Timezone; manual override of currency/timezone preserved; live preview card shows initials avatar + store name + branch + country/currency/timezone; Next disabled when Store Name or Country empty.

### Implementation for User Story 2

- [x] T004 [US2] Modify `apps/shops-app/components/onboarding/StepStoreSetup.tsx` — (a) change the `StoreSetupData` import/type to `StoreSetupFormData` from `@/lib/onboarding-types` (update all usages); (b) add a `branchAddress` optional text input field after the branch name field with placeholder "123 Main Street (optional)"; (c) add a `branchTimezone` select field after currency — auto-populates from `COUNTRY_DEFAULTS[country].timezone` when country changes (import `COUNTRY_DEFAULTS` from `@/lib/mode`); (d) update `handleCountryChange` to set both `branchCurrency` and `branchTimezone` from `COUNTRY_DEFAULTS[newCountry]` with fallback to `{ currency: "EGP", timezone: "Africa/Cairo" }`; (e) extend country list to all 11 countries from `COUNTRY_DEFAULTS`; (f) update the live preview card to also display timezone; (g) update the Props interface to use `StoreSetupFormData`

**Checkpoint**: Country auto-fills currency + timezone; manual overrides work; live preview shows timezone; address field is optional and has no validation.

---

## Phase 5: User Story 3 — Step 3: First Products (Priority: P2)

**Goal**: A new optional product entry step allowing 0–3 products with skip functionality.

**Independent Test**: Navigate to Step 3; verify: 1 empty row shown on load; "+ Add another product" adds rows up to 3; button disappears at 3; × removes a row; "Skip for now →" advances without saving products; filling products and clicking Next saves to session storage.

### Implementation for User Story 3

- [x] T005 [US3] Create `apps/shops-app/components/onboarding/StepProducts.tsx` — header "Add your first products" with subtext "Start with 1–3 products to see how your store looks."; renders a list of 1–3 product form rows managed by local array state (initialized with 1 empty row `{ name: "", price: 0, stock: 0 }`); each row contains: name text input (placeholder "Product name"), price number input with currency code prefix from `currency` prop (e.g. "EGP 0.00"), stock number input (placeholder "Qty"), and an × remove button (not shown when only 1 row); "+ Add another product" button (hidden when `products.length >= 3`); "Skip for now →" link rendered below the form that calls `onSkip()`; Props: `currency: string`, `products: OnboardingProduct[]`, `onChange: (products: OnboardingProduct[]) => void`, `onSkip: () => void`; types from `@/lib/onboarding-types`; no `any` types; "Skip for now →" styled as a subdued link not a button

**Checkpoint**: Product rows add/remove correctly; max 3 enforced; skip link works; currency prefix shows from props.

---

## Phase 6: User Story 4 — Step 4: Review & Launch (Priority: P1)

**Goal**: Redesigned review step with 2-column summary, full modules grid, and Launch Store CTA. Fully rewritten onboarding orchestrator wiring all 4 steps.

**Independent Test**: Complete Steps 1–3 and arrive at Step 4; verify: left column shows workspace/businessType/salesModel; right column shows store name, branch, country, currency, timezone, and product count; modules grid shows correct ✅/❌ per sales model; "Launch Store →" writes all session keys and redirects to /dashboard; Back button returns to Step 3 with products intact.

### Implementation for User Story 4

- [x] T006 [US4] Rewrite `apps/shops-app/components/onboarding/StepReview.tsx` — **Layout**: 2-column grid (`lg:grid-cols-2` gap-8); **Left column**: workspace row (read-only "Mustafa's Co." or from session), businessType row (shows `customBusinessType` if type is "other", else label from a local `BUSINESS_TYPE_LABEL` map extended for new types: food-beverage, books-media, home-furniture), salesModel row (physical/online/both label); **Right column**: store name, branch name, country, currency, timezone, products count (number from `productsCount` prop or "No products added yet"); **Full-width modules grid below both columns**: renders all 7 `MODULE_DEFINITIONS` from `@/lib/onboarding-types` as cards; each card: if `module.enabledFor.includes(salesModel)` → green bg with ✅ icon + module label; else → gray bg with ❌ icon + module label + `module.disabledReason` in small text; grid: `sm:grid-cols-2 lg:grid-cols-4`; **No "Next recommended actions" panel** (removed); Props: `businessType: BusinessType | null`, `customBusinessType: string`, `salesModel: ShopsMode | null`, `setup: StoreSetupFormData`, `productsCount: number`; import all types from `@/lib/onboarding-types` and `@/lib/mode`

- [x] T007 [US4] Rewrite `apps/shops-app/app/onboarding/page.tsx` — complete orchestrator rewrite: (a) updated `STEP_LABELS`: `{ 1: "Business & Sales", 2: "Store Setup", 3: "Products", 4: "Review & Launch" }`; (b) new state: `customBusinessType: string` (useState ""), `products: OnboardingProduct[]` (useState `[{ name: "", price: 0, stock: 0 }]`); update `storeSetup` state type to `StoreSetupFormData` with new fields `branchAddress: ""`, `branchTimezone: "Africa/Cairo"`; (c) `canProceed` updated: step 1 = `businessType !== null && salesModel !== null && (businessType !== "other" || customBusinessType.trim() !== "")`, step 2 = unchanged (storeName + branch non-empty), step 3 = always `true` (optional step), step 4 = always `true`; (d) `handleContinue`: step 1 → persist `persistBusinessType(businessType)`, `setMode(salesModel)`, `setBusinessTypeCustom(customBusinessType)`, advance to step 2; step 2 → persist `setStoreName`, `setBranch`, `setBranchAddress`, `setCurrency`, `setCountry`, `setTimezone`, advance to step 3; step 3 → `setOnboardingProducts(products.filter(p => p.name.trim()))`, advance to step 4; (e) `handleFinish`: persist all remaining keys + `completeOnboarding()` + `router.push("/dashboard")`; (f) `handleSkipProducts`: `setOnboardingProducts([])` + advance to step 4; (g) render: step 1 → `<StepBusinessAndSales>` with all props; step 2 → `<StepStoreSetup>` (updated to StoreSetupFormData type); step 3 → `<StepProducts currency={storeSetup.branchCurrency} products={products} onChange={setProducts} onSkip={handleSkipProducts} />`; step 4 → `<StepReview>` with businessType, customBusinessType, salesModel, setup, productsCount; remove old StepBusinessType/StepSalesModel imports; add new imports; update the fixed bottom nav bar: on step 3 the Continue button label = "Continue →", on step 4 = "Launch Store →" (green); on step 4 there is NO Back button disable — it goes back to step 3

- [x] T008 [US4] Delete 3 obsolete files: remove `apps/shops-app/components/onboarding/StepBusinessType.tsx`, remove `apps/shops-app/components/onboarding/StepSalesModel.tsx`, remove `apps/shops-app/components/onboarding/ModeCard.tsx` — these are fully replaced by `StepBusinessAndSales.tsx`

**Checkpoint**: Full 4-step onboarding flow works end-to-end; all session keys written on Launch; redirect to dashboard works; Back navigation preserves all state.

---

## Phase 7: User Story 5 — Mode-Aware Dashboard (Priority: P2)

**Goal**: Dashboard and sidebar adapt layout, stats, banners, and navigation items to the sales model selected during onboarding.

**Independent Test**: Complete onboarding with each of the 3 sales models; verify dashboard badge, stats, CTA banner, sidebar items, and quick actions match the selected mode exactly.

### Implementation for User Story 5

- [x] T009 [P] [US5] Modify `apps/shops-app/app/(app)/dashboard/page.tsx` — (a) define 3 stats arrays: `physicalStats` (Sales Today, Products, Low Stock, Customers — existing stats), `onlineStats` (Online Orders, Revenue, Products, Customers — new online-focused values), `bothStats` (same as existing 4 stats); (b) define 3 quickActions arrays: `physicalActions` (Add product, New sale, Stock adjustment, Daily Z-report), `onlineActions` (Add product, View orders, Manage storefront, Reports), `bothActions` (existing 5 actions); (c) add mode badge next to title: physical → `<span className="... bg-emerald-500/15 text-emerald-300 ...">🏪 In-Store</span>`, online → `<span className="... bg-blue-500/15 text-blue-300 ...">🌐 Online</span>`, both → `<span className="... bg-purple-500/15 text-purple-300 ...">⚡ Unified</span>`; (d) add mode-specific CTA banner above stats grid: physical → cyan POS banner (`rounded-xl border border-cyan-500/20 bg-cyan-500/[0.07] px-4 py-3 flex items-center justify-between` with "Open POS →" link to /pos), online → blue Storefront banner (`border-blue-500/20 bg-blue-500/[0.07]` with "Visit Storefront →" link), both → show both banners stacked or a combined banner; (e) render `const stats = mode === "physical" ? physicalStats : mode === "online" ? onlineStats : bothStats` and same pattern for quickActions; (f) read `mode` via existing `getMode()` + `useSyncExternalStore` pattern already in the file

- [x] T010 [P] [US5] Modify `apps/shops-app/components/dashboard/Sidebar.tsx` — (a) read mode at runtime: add `const mode = useSyncExternalStore(() => () => {}, getMode, () => null)` at the top of the `Sidebar` function; import `getMode` from `@/lib/mode`; (b) add Storefront to the `operations` nav items array: `{ label: "Storefront", href: "#", icon: "shopping-bag", disabled: true }` positioned after POS; (c) filter nav items before rendering: `const visibleOperations = operations.filter(item => { if (item.label === "POS" && mode === "online") return false; if (item.label === "Storefront" && mode === "physical") return false; return true; })`; use `visibleOperations` in the map render instead of `operations`; (d) no change to the Configure section or POS card at the bottom

**Checkpoint**: Physical mode → POS visible, Storefront hidden, emerald badge; Online mode → Storefront visible, POS hidden, blue badge; Both mode → all items visible, purple badge.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Validate TypeScript correctness, linting, build integrity, and run manual scenario verification.

- [x] T011 Run `pnpm --filter shops-app exec tsc --noEmit` from repo root and fix all TypeScript errors until 0 errors remain — common issues to check: `StoreSetupFormData` vs old `StoreSetupData` type mismatches, `OnboardingProduct` import paths, `BusinessType` union exhaustiveness in switch/label maps, `ModuleDefinition.enabledFor` narrowing

- [x] T012 Run `pnpm --filter shops-app lint` from repo root and fix all lint errors until 0 errors remain — check for unused imports from deleted step files, missing return types, `any` usage

- [x] T013 Run `pnpm --filter shops-app build` from repo root and verify exit code 0 — fix any build errors not caught by TypeScript standalone check

- [x] T014 Manual browser verification per `specs/035-shops-onboarding-redesign/quickstart.md` — complete all 7 scenarios; check all items in the Verification Checklist section; pay special attention to: mobile 375px viewport (all 4 steps), "Other" custom text flow, back navigation data preservation, modules grid ✅/❌ correctness per sales model, session storage key values after Launch

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 3 (US1)**: Requires T001 + T002 complete
- **Phase 4 (US2)**: Requires T001 + T002 complete (parallel with Phase 3)
- **Phase 5 (US3)**: Requires T001 complete (parallel with Phases 3 and 4)
- **Phase 6 (US4)**: Requires T003, T004, T005 complete — T006 can start after T003; T007 requires T003+T004+T005+T006; T008 requires T007
- **Phase 7 (US5)**: Requires T002 complete; T009 and T010 are parallel with each other
- **Phase 8 (Polish)**: Requires all previous phases complete

### User Story Dependencies

- **US1, US2, US3 (Phases 3–5)**: All independently startable after Phase 1 — parallel
- **US4 (Phase 6)**: Depends on US1 (T003) + US2 (T004) + US3 (T005) components existing; then wires in T007
- **US5 (Phase 7)**: Independent of US1–US4; only needs T002 (mode.ts) from Phase 1

### Within Phase 6

- T006 (StepReview) → can start as soon as T001 is done (needs OnboardingProduct + ModuleDefinition types)
- T007 (page.tsx) → requires T003 + T004 + T005 + T006 (all step components must exist)
- T008 (delete files) → requires T007 (imports must be removed before deleting)

### Parallel Opportunities

```bash
# After T001+T002 complete, these 3 tasks can run in parallel:
Task: T003 — Create StepBusinessAndSales.tsx
Task: T004 — Modify StepStoreSetup.tsx
Task: T005 — Create StepProducts.tsx

# After all step components exist (T003+T004+T005+T006), these run sequentially:
Task: T006 → T007 → T008

# T009 and T010 can run in parallel (different files):
Task: T009 — Dashboard mode-awareness
Task: T010 — Sidebar mode-awareness
```

---

## Implementation Strategy

### MVP First (Steps 1–4 Flow)

1. Complete Phase 1: T001, T002
2. Complete Phase 3–5 in parallel: T003, T004, T005
3. Complete Phase 6: T006 → T007 → T008
4. **STOP and VALIDATE**: Full onboarding flow works end-to-end
5. Complete Phase 7: T009 + T010 in parallel
6. Complete Phase 8: T011 → T012 → T013 → T014

### Incremental Delivery

1. T001+T002 → foundation ready
2. T003+T004+T005+T006+T007+T008 → full onboarding flow working
3. T009+T010 → dashboard mode-awareness added (visible payoff of sales model selection)
4. T011–T014 → quality gates + manual verification

---

## Notes

- `[P]` tasks touch different files with no cross-dependencies — safe to implement together
- `[Story]` label maps to spec.md user stories (US1=Step1, US2=Step2, US3=Step3, US4=Step4, US5=Dashboard)
- T008 (file deletion) is irreversible — only run after T007 confirms no remaining imports of the deleted files
- The page.tsx rewrite (T007) is the heaviest task — it replaces the entire orchestration logic; take it one section at a time: state → canProceed → handleContinue → handleFinish → handleSkipProducts → render
- The `BUSINESS_TYPE_LABEL` map in StepReview must include all 11 BusinessType values (including legacy "accessories") to avoid TypeScript exhaustiveness errors
- Session key `shops_onboarding_done` is already managed by `completeOnboarding()` — do not write it directly
