# Feature Specification: Shops Onboarding — New 4-Step Flow Redesign

**Feature Branch**: `035-shops-onboarding-redesign`  
**Created**: 2026-05-17  
**Status**: Draft  
**App**: `apps/shops-app`

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Step 1: Business Type & Sales Model (Priority: P1)

A merchant navigates to the shops onboarding and is presented with a merged first step asking what they sell and how they sell it. They pick a business type from a visual 3×3 grid (or enter a custom type), then choose their sales model from three prominent visual cards. A live dynamic preview updates in real time showing which modules will be enabled. Both selections are required before proceeding.

**Why this priority**: This is the first screen of onboarding and captures the two most important decisions that drive everything else in the platform — what kind of business this is and how it operates. Getting this right sets up the mode-aware dashboard and module visibility.

**Independent Test**: Can be tested by navigating to `/onboarding`, completing step 1 with each combination (business type × sales model), verifying the module preview updates correctly, and confirming the Next button activates only when both fields are selected.

**Acceptance Scenarios**:

1. **Given** a merchant starts onboarding, **When** they land on step 1, **Then** they see a 3×3 business type grid with icons and an "Other" custom input option, plus three sales model cards beneath it.
2. **Given** a merchant selects "Both physical + online", **When** the selection changes, **Then** the dynamic module preview immediately shows all modules (POS, Storefront, Inventory, Orders, Reports, +3 more).
3. **Given** a merchant selects "Physical store only", **When** viewing the preview, **Then** only physical-mode modules (POS, Inventory, Branches, Reports) appear as colored badges.
4. **Given** a merchant selects "Online store only", **When** viewing the preview, **Then** only online-mode modules (Storefront, Orders, Checkout, Reports) appear as colored badges.
5. **Given** a merchant has not selected a business type, **When** they try to proceed, **Then** the Next button remains disabled.
6. **Given** a merchant selects "Other" as business type, **When** they click it, **Then** a text input appears for custom entry and must be non-empty to proceed.
7. **Given** "Both physical + online" is pre-selected by default, **When** the page loads, **Then** that card appears visually active with a prominent purple glow border and "RECOMMENDED" tag.

---

### User Story 2 — Step 2: Store Setup (Priority: P1)

A merchant fills in their store details: display name, main branch name, optional branch address, country (which auto-sets currency and timezone), and optionally adjusts currency and timezone manually. A live preview card on the right (desktop) or below the form (mobile) shows a real-time avatar with initials, store name, branch name, and location/currency/timezone details.

**Why this priority**: Store name and country are essential — the rest of the platform cannot operate without them. This step captures the core identity of the merchant's store.

**Independent Test**: Can be tested by navigating to step 2, filling in each field, verifying the live preview card updates in real time, verifying country selection auto-sets currency and timezone, and confirming the Next button only activates when required fields are filled.

**Acceptance Scenarios**:

1. **Given** a merchant reaches step 2, **When** they type in the Store Display Name field, **Then** the live preview card immediately updates to show the entered name and its initials in the avatar.
2. **Given** a merchant selects a country, **When** the country changes, **Then** currency and timezone fields auto-populate with the correct defaults for that country.
3. **Given** auto-populated currency or timezone values, **When** the merchant edits them manually, **Then** the manually-entered values are preserved and override the auto-values.
4. **Given** required fields are empty (store name or country), **When** the merchant attempts to proceed, **Then** the Next button is disabled and inline validation messages appear.
5. **Given** branch address is left empty, **When** proceeding to the next step, **Then** no error is shown — it is optional.
6. **Given** no logo upload field is present on step 2, **When** viewing the step, **Then** there is no logo upload control and no store slug field (both moved to Settings).

---

### User Story 3 — Step 3: First Products (Priority: P2)

A merchant optionally adds up to 3 starter products — name, price (using the currency from step 2), and stock quantity. They can add up to 3 products using an "Add another product" button, remove any product with an × button, or skip the entire step using a "Skip for now →" link.

**Why this priority**: Adding products is optional and can be done from the dashboard anytime. However, pre-populating even one product makes the post-onboarding dashboard feel immediately useful and reduces time-to-value.

**Independent Test**: Can be tested by navigating to step 3, adding 1–3 products, verifying the 4th add attempt is blocked, removing a product, and skipping entirely — then verifying session storage state in each case.

**Acceptance Scenarios**:

1. **Given** a merchant reaches step 3, **When** the page loads, **Then** one empty product form row is visible with name, price, and stock quantity fields.
2. **Given** one product row is visible, **When** the merchant clicks "+ Add another product", **Then** a second row appears (max 3 total).
3. **Given** 3 product rows are visible, **When** the merchant views the page, **Then** the "+ Add another product" button is hidden.
4. **Given** multiple product rows exist, **When** the merchant clicks × on a row, **Then** that row is removed.
5. **Given** a merchant fills in products and clicks Next, **When** they proceed to step 4, **Then** the product data is saved to session storage under `shops_onboarding_products`.
6. **Given** a merchant clicks "Skip for now →", **When** skipping, **Then** they advance to step 4 with no products saved.
7. **Given** the currency was set in step 2, **When** viewing step 3 price fields, **Then** the correct currency symbol or code is displayed alongside the input.

---

### User Story 4 — Step 4: Review & Launch (Priority: P1)

A merchant reviews a two-column summary of all their selections from steps 1–3: workspace, business type, and sales model on the left; store name, branch, country, currency, timezone, and product count on the right. Below both columns, a full-width modules grid shows all possible modules — green ✅ if enabled, gray ❌ with a reason if disabled. A large green "Launch Store →" button finalises onboarding.

**Why this priority**: The review step is the final commit point for all onboarding data. It prevents errors and gives the merchant confidence before launching their store.

**Independent Test**: Can be tested by completing steps 1–3 then arriving at step 4, verifying all summary data matches inputs, verifying the modules grid for each sales model combination, and clicking Launch Store to confirm session storage is written and redirect occurs.

**Acceptance Scenarios**:

1. **Given** a merchant reaches step 4, **When** they view the left column, **Then** they see workspace name (read-only), business type, and sales model.
2. **Given** a merchant reaches step 4, **When** they view the right column, **Then** they see store name, branch name, country, currency, timezone, and product count (or "No products added yet").
3. **Given** "Physical store only" was selected, **When** viewing the modules grid, **Then** POS, Inventory, and Branches show ✅; Storefront and Online Orders show ❌ with a reason.
4. **Given** "Both" was selected, **When** viewing the modules grid, **Then** all modules show ✅.
5. **Given** a merchant clicks "Launch Store →", **When** the action completes, **Then** `shops_onboarding_done` is written to session storage and the merchant is redirected to the dashboard.
6. **Given** a merchant clicks Back, **When** navigating, **Then** they return to step 3 with previously-entered data intact.

---

### User Story 5 — Mode-Aware Dashboard (Priority: P2)

After onboarding, the dashboard adapts its layout, badge, stats, sidebar items, and quick actions to match the sales model selected during onboarding. Physical-mode merchants see POS-focused content; online-mode merchants see e-commerce metrics; "both" merchants see the full unified experience.

**Why this priority**: The mode-aware dashboard is the visible payoff of the sales model selection. Without it, the choice made in step 1 has no tangible effect for the merchant.

**Independent Test**: Can be tested by completing onboarding with each of the three sales models and observing the dashboard title badge, stat cards, banner CTA, sidebar items, and quick actions in each case.

**Acceptance Scenarios**:

1. **Given** "Physical store only" was selected, **When** landing on the dashboard, **Then** the title shows an emerald "🏪 In-Store" badge, the stat row shows Sales Today / Products / Low Stock / Customers, and a cyan POS banner appears above the stats.
2. **Given** "Online store only" was selected, **When** landing on the dashboard, **Then** the title shows a blue "🌐 Online" badge, stats show Online Orders / Revenue / Products / Customers, and a blue Storefront banner appears above the stats.
3. **Given** "Both" was selected, **When** landing on the dashboard, **Then** the title shows a purple "⚡ Unified" badge, all 4 stats are shown, and both POS and Storefront CTAs are visible.
4. **Given** physical mode is active, **When** viewing the sidebar, **Then** POS is visible and Storefront is hidden.
5. **Given** online mode is active, **When** viewing the sidebar, **Then** Storefront is visible and POS is hidden.

---

### Edge Cases

- What happens if a merchant refreshes mid-onboarding? Session storage preserves filled data and the stepper returns to the correct step.
- What happens if "Other" business type is selected but the text input is empty? The Next button remains disabled.
- What if a product price is entered as 0 or negative? The field shows inline validation and the merchant cannot proceed with invalid prices.
- What if session storage is unavailable? Onboarding completes gracefully; the dashboard defaults to "both" mode.
- What if the merchant navigates directly to `/dashboard` without completing onboarding? The existing `shops_onboarding_done` guard redirects back to `/onboarding`.
- What if the country has no mapped timezone or currency? Defaults to UTC and USD respectively.

## Requirements *(mandatory)*

### Functional Requirements

**Step 1 — Business Type & Sales Model**

- **FR-001**: Step 1 MUST present a 3×3 visual grid of business types (Mobile Store, Electronics, Clothing & Fashion, Food & Beverage, Books & Media, Home & Furniture, Cosmetics & Beauty, Supermarket, Other) with emoji icons and labels.
- **FR-002**: Selecting "Other" in the business type grid MUST reveal a text input for custom entry; this input must be non-empty for the Next button to activate.
- **FR-003**: Step 1 MUST present three sales model cards — Physical (emerald, "IN-STORE" tag), Online (blue, "E-COMMERCE" tag), Both (purple, "RECOMMENDED" tag, full-width, default selected) — as large interactive visual cards with icons and feature lists.
- **FR-004**: Step 1 MUST show a live dynamic module preview that updates immediately when the sales model changes, displaying colored badge pills per enabled module.
- **FR-005**: The Next button on step 1 MUST remain disabled until both a business type and a sales model are selected.

**Step 2 — Store Setup**

- **FR-006**: Step 2 MUST include: Store Display Name (required), Main Branch Name (required), Branch Address (optional), Country (required), Currency (required, auto-set from country), Timezone (required, auto-set from country).
- **FR-007**: Selecting a country MUST automatically populate Currency and Timezone with that country's defaults, while allowing manual override.
- **FR-008**: Step 2 MUST display a live preview card updating in real time — showing initials avatar, store name, branch name, and country/currency/timezone.
- **FR-009**: Logo upload and store slug fields MUST NOT appear in onboarding.
- **FR-010**: The Next button on step 2 MUST be disabled if Store Display Name or Country is empty.

**Step 3 — First Products**

- **FR-011**: Step 3 MUST allow adding 0 to 3 products, each with name, price, and stock quantity fields.
- **FR-012**: The "+ Add another product" button MUST be hidden when 3 products are already present.
- **FR-013**: Each product row MUST have an × remove button that removes only that row.
- **FR-014**: Step 3 MUST have a prominent "Skip for now →" option that advances to step 4 with no products saved.
- **FR-015**: Product data MUST be saved to `shops_onboarding_products` (JSON string) in session storage when proceeding from step 3.
- **FR-016**: Price fields MUST display the currency code from step 2.

**Step 4 — Review & Launch**

- **FR-017**: Step 4 MUST display a two-column summary: left column (workspace, business type, sales model), right column (store name, branch, country, currency, timezone, product count).
- **FR-018**: Step 4 MUST display a full-width modules grid with all platform modules shown as cards: ✅ green if enabled, ❌ gray with reason if disabled.
- **FR-019**: Module enabled/disabled mapping: Physical → POS ✅, Inventory ✅, Branches ✅, Storefront ❌, Online Orders ❌; Online → Storefront ✅, Online Orders ✅, Checkout ✅, POS ❌, Branches ❌; Both → all ✅.
- **FR-020**: Clicking "Launch Store →" MUST write `shops_onboarding_done: true` to session storage and redirect to `/dashboard`.

**Mode-Aware Dashboard**

- **FR-021**: The dashboard MUST read `shops_mode` from session storage on mount and apply the corresponding layout.
- **FR-022**: Physical mode MUST show: emerald "🏪 In-Store" badge, Sales Today / Products / Low Stock / Customers stats, cyan POS banner, POS sidebar item visible, Storefront sidebar item hidden.
- **FR-023**: Online mode MUST show: blue "🌐 Online" badge, Online Orders / Revenue / Products / Customers stats, blue Storefront banner, Storefront sidebar item visible, POS sidebar item hidden.
- **FR-024**: Both mode MUST show: purple "⚡ Unified" badge, all 4 stats, POS and Storefront CTAs, all sidebar items visible (current default behavior).

**Session Storage**

- **FR-025**: Onboarding MUST write these session storage keys: `shops_business_type` (string), `shops_mode` ("physical" | "online" | "both"), `shops_store_name` (string), `shops_branch` (string), `shops_branch_address` (string), `shops_country` (string), `shops_currency` (string), `shops_timezone` (string), `shops_onboarding_products` (JSON string), `shops_onboarding_done` (boolean as string).
- **FR-026**: Existing keys (`shops_store_name`, `shops_branch`, `shops_country`, `shops_currency`, `shops_mode`) MUST remain backward compatible — no renames.

**General**

- **FR-027**: All 4 steps MUST be fully responsive and usable on screens 375px wide and above.
- **FR-028**: A stepper indicator MUST be visible at the top showing 4 labeled steps, with completed steps marked and the current step highlighted.
- **FR-029**: Navigating back between steps MUST preserve all previously-entered data — no data loss on back navigation.

### Key Entities

- **BusinessType**: What the merchant sells — one of 8 predefined categories or a custom free-text value.
- **SalesModel**: How the merchant sells — "physical", "online", or "both". Drives module availability and dashboard layout.
- **OnboardingStore**: Store configuration captured in step 2 — name, branch, address, country, currency, timezone.
- **OnboardingProduct**: A lightweight product record from step 3 — name, price, stock quantity. Up to 3 per onboarding.
- **Module**: A feature area of the platform with enabled/disabled state derived from the sales model (POS, Storefront, Inventory, Orders, Checkout, Branches, Reports).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Merchants can complete the full 4-step onboarding flow in under 3 minutes.
- **SC-002**: 100% of required fields show visible validation messages when empty and the merchant attempts to advance — no silent failures.
- **SC-003**: The dynamic module preview on step 1 updates within one interaction cycle of changing the sales model — no perceptible delay.
- **SC-004**: The live preview card on step 2 reflects the current store name input within one keystroke.
- **SC-005**: The modules grid on step 4 correctly reflects the enabled/disabled state for all 3 sales model combinations in 100% of test cases.
- **SC-006**: After completing onboarding, the dashboard badge, stats, sidebar, and quick actions are correct for the selected sales model in 100% of test cases.
- **SC-007**: All 4 steps are fully usable on a 375px-wide mobile screen — no horizontal scroll, no clipped elements, no unusable tap targets.
- **SC-008**: Navigating back from any step preserves 100% of data entered in that previous step.

## Assumptions

- The existing onboarding route (`/onboarding`) and its prior step structure are fully replaced by this 4-step design.
- Country-to-currency and country-to-timezone mapping is implemented as a static lookup table — no external API required.
- The workspace name shown in step 4 is read from the existing session storage key already set before onboarding begins.
- Product data saved in step 3 is session-storage only — no backend write occurs during onboarding.
- The "Launch Store →" button writes session storage and redirects — no API call is made in the MVP.
- Business type grid items use emoji characters as visual icons (rendered as text), not SVG icon components.
- No new npm packages are introduced — all UI is built with existing Tailwind utilities and `@nexoraxs/ui` components.
- "Both" sales model is pre-selected by default when step 1 first loads.
- Backward compatibility with existing session storage keys is required throughout the rest of the app (sidebar, topbar, dashboard, POS header).
