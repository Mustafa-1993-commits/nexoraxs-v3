# Feature Specification: Shops Onboarding Business Type Flow

**Feature Branch**: `019-shops-onboarding-business-type-flow`
**Created**: 2026-05-14
**Status**: Draft
**Design Reference**: `docs/magicpatterns/` (visual inspiration only — no package dependencies)

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Step 1: Business Type Selection (Priority: P1) 🎯 MVP

A first-time user arrives at `/onboarding`. Instead of a generic "Choose your shop mode" screen, they see a purposeful question: "What type of shop do you run?" Seven business type cards are displayed in a grid — Mobile Store, Accessories Store, Clothing Store, Supermarket, Electronics Store, Cosmetics Store, and Other Retail. Each card shows a distinct icon, title, short description, and example products. Selecting a card highlights it visually. The "Continue" button is disabled until a selection is made.

**Why this priority**: The business type is the first differentiating piece of information about the user's shop. It sets the context for the entire onboarding and makes the app feel tailored rather than generic. Without this step, all shops feel identical.

**Independent Test**: Open `/onboarding` in a clean session. A question heading "What type of shop do you run?" is visible. Seven business type cards are displayed. Clicking a card highlights it. The "Continue" button is disabled before selection and enabled after. Clicking "Continue" advances to Step 2.

**Acceptance Scenarios**:

1. **Given** the user opens `/onboarding` with no prior session data, **When** the page loads, **Then** Step 1 is shown with a step indicator displaying "Step 1 of 4" (or equivalent).
2. **Given** Step 1 is displayed, **Then** seven business type cards are visible: Mobile Store, Accessories Store, Clothing Store, Supermarket, Electronics Store, Cosmetics Store, Other Retail.
3. **Given** seven cards are visible, **Then** each card shows a distinct icon or visual marker, a title, a one-line description, and example products.
4. **Given** no card is selected, **Then** the "Continue" button is visually disabled and non-functional.
5. **Given** the user clicks a card, **Then** it transitions to a selected state (highlighted border, background tint, or badge) and all other cards show as unselected.
6. **Given** a card is selected, **Then** the "Continue" button is enabled and clickable.
7. **Given** the user clicks "Continue" with a card selected, **Then** Step 2 is shown and the business type selection is retained in memory for use in later steps.

---

### User Story 2 — Step 2: Sales Model Selection (Priority: P1)

The user sees the question "How do you sell?" and three large, readable option cards: "Physical store only", "Online store only", and "Both physical + online". Each card shows an icon and a concise list of the features it enables. "Both physical + online" is marked as recommended. Selecting an option highlights it and enables "Continue". Step 2 is visually distinct from Step 1 — it uses a wider single-column card layout rather than a grid.

**Why this priority**: The sales model determines which modules are enabled for the user's shop. It is the second most critical setup decision after business type, and it must be clearly communicated — especially the difference between physical-only (POS-focused) and online-only (storefront-focused).

**Independent Test**: After completing Step 1, Step 2 is shown. Three cards are visible. Each card shows an icon and a feature list. "Both physical + online" has a "Recommended" label. Selecting a card highlights it and enables "Continue". Clicking "Back" returns to Step 1 with the original business type still selected.

**Acceptance Scenarios**:

1. **Given** the user is on Step 2, **Then** three option cards are shown: "Physical store only", "Online store only", "Both physical + online".
2. **Given** each card is visible, **Then** it shows: a distinct icon, a one-line description, and a list of 3–4 enabled features for that model.
3. **Given** "Physical store only" is visible, **Then** its feature list includes: POS, Branch operations, Inventory, Walk-in customers.
4. **Given** "Online store only" is visible, **Then** its feature list includes: Product catalog, Online orders, Storefront, Customer checkout.
5. **Given** "Both physical + online" is visible, **Then** it carries a "Recommended" visual badge and its feature list includes: Unified inventory, POS, Storefront, Reports.
6. **Given** no option is selected, **Then** "Continue" is disabled.
7. **Given** the user selects an option, **Then** it becomes visually highlighted and "Continue" is enabled.
8. **Given** the user clicks "Back", **Then** Step 1 is shown with the previously selected business type still highlighted.

---

### User Story 3 — Step 3: Store Setup (Priority: P1)

The user sees a form to finalise their store identity. The workspace context ("Mustafa's Co.") is shown as a read-only row — it already exists in Core Platform and is not editable here. The user can enter a Store Display Name and a Main Branch Name (pre-populated with any prior value from session). Currency and Country are shown with selectable values but are described as "inherited from workspace". Selections from Steps 1 and 2 are shown as read-only chips with back-navigation links. "Continue" is disabled until store name and branch are non-empty.

**Why this priority**: Step 3 is where the user's store identity is crystallised. Without it, the review screen and dashboard have nothing to display. The read-only workspace row is a critical design choice that reinforces the separation between Core Platform (workspace) and Shops (store).

**Independent Test**: After completing Step 2, Step 3 is shown. A read-only row shows "Workspace: Mustafa's Co." with a "(Read-only)" annotation. A text input for Store Display Name is present (pre-filled with a placeholder value or prior value). A text input for Main Branch is present (pre-filled from session or placeholder). Currency and Country show selectable values. "Continue" is disabled when either name or branch is empty.

**Acceptance Scenarios**:

1. **Given** the user is on Step 3, **Then** a read-only workspace row displays "Mustafa's Co." with a clear indication it cannot be edited.
2. **Given** Step 3 is shown, **Then** the business type and sales model selected in Steps 1 and 2 are shown as summary chips with links to go back to those steps.
3. **Given** the Store Display Name field is empty, **Then** the "Continue" button is disabled.
4. **Given** the Main Branch field is empty, **Then** the "Continue" button is disabled.
5. **Given** both fields are filled, **Then** the "Continue" button is enabled.
6. **Given** the user clicks "Continue", **Then** the entered store name, branch, currency, and country are stored in the session (not sent to a backend), and Step 4 is shown.
7. **Given** the user clicks "Back", **Then** Step 2 is shown with the previously selected sales model still highlighted.
8. **Given** the user previously completed Step 3 and navigates back and forward, **Then** the store name and branch retain their values.

---

### User Story 4 — Step 4: Review and Finish (Priority: P1)

The user sees a confirmation screen headed "Your shop workspace is ready". Below the heading, a grid of summary cards displays all chosen values: Workspace, Business Type, Sales Model, Store Name, Main Branch, Currency, Country. An "Enabled modules" grid shows the modules available based on the sales model (base modules plus POS for physical/both, Storefront for online/both). A "Next recommended actions" panel lists 4 items: Add first product, Set opening stock, Invite team member, Review settings. A "Finish setup" button at the bottom stores the onboarding completion flag in the session and routes to `/dashboard`.

**Why this priority**: The review screen is the payoff of the entire onboarding flow. It must feel like a real finish screen — showing the user exactly what they set up and what they should do next. Without it, the flow ends abruptly.

**Independent Test**: After completing Step 3, Step 4 is shown. All 7 summary cards display correct values. The enabled modules grid shows the correct modules for the selected sales model (e.g., "Both" shows POS and Storefront; "Online only" shows Storefront but no POS). All 4 next actions are listed. Clicking "Finish setup" sets `shops_onboarding_done` in session storage and navigates to `/dashboard`.

**Acceptance Scenarios**:

1. **Given** the user is on Step 4, **Then** a heading "Your shop workspace is ready" is visible.
2. **Given** Step 4 is shown, **Then** 7 summary cards are visible: Workspace, Business Type, Sales Model, Store Name, Main Branch, Currency, Country — each showing the correct value from the flow.
3. **Given** the sales model is "Physical store only", **Then** the enabled modules include: Dashboard, Products, Inventory, Customers, Sales, POS, Reports — but NOT Storefront.
4. **Given** the sales model is "Online store only", **Then** the enabled modules include: Dashboard, Products, Inventory, Customers, Sales, Reports, Storefront — but NOT POS.
5. **Given** the sales model is "Both physical + online", **Then** the enabled modules include all base modules plus POS and Storefront.
6. **Given** Step 4 is shown, **Then** 4 next action items are listed: "Add first product", "Set opening stock", "Invite team member", "Review settings".
7. **Given** the user clicks "Finish setup", **Then** `shops_onboarding_done` is written to sessionStorage, all session data from Steps 1–3 is also persisted, and the user is navigated to `/dashboard`.

---

### User Story 5 — Returning User and Dashboard Compatibility (Priority: P2)

A user who has already completed onboarding is not forced through the flow again. If `shops_onboarding_done` exists in sessionStorage, navigating to `/onboarding` shows the completion state ("You're all set") with a link to `/dashboard`. The Shops dashboard reads the new session keys (business type, store name, country) and remains consistent. The existing operations pages (`/products`, `/orders`, etc.) are unaffected.

**Why this priority**: Without this guard, completed-onboarding users are re-prompted on every visit, which breaks trust. Dashboard compatibility ensures the new onboarding output integrates cleanly with the existing operations suite.

**Independent Test**: Complete the full 4-step flow. Then navigate to `/onboarding` without clearing session. The completion state ("You're all set") is shown, not the step flow. Navigate to `/dashboard` — it loads normally. Navigate to `/products`, `/orders`, `/customers`, `/reports`, `/settings` — all render without error.

**Acceptance Scenarios**:

1. **Given** `shops_onboarding_done` is in sessionStorage, **When** the user navigates to `/onboarding`, **Then** a completion state is shown (not the step flow).
2. **Given** the completion state is shown, **Then** a link to `/dashboard` is visible (using `href="/dashboard"` not `href="#"`).
3. **Given** the user has completed onboarding, **When** they navigate to `/dashboard`, **Then** the dashboard loads without error and without the "Complete your setup" prompt card.
4. **Given** the user navigates to any of the five operations pages, **Then** each page renders without error (the onboarding change must not break existing pages).

---

### Edge Cases

- What if the user refreshes the page mid-flow (e.g., during Step 3)? The flow should restart from Step 1, but any values already persisted to sessionStorage (business type, sales model) from earlier steps should pre-populate or be retained. The step state (`currentStep`) is React state only — not persisted — so a refresh always returns to Step 1 (or the completion state if `shops_onboarding_done` is set).
- What if the user leaves Step 3's store name or branch empty and clicks "Continue"? The button must be non-functional (disabled) in this state — no navigation occurs.
- What if sessionStorage is unavailable (SSR context)? All sessionStorage reads must be guarded with the established `useSyncExternalStore` pattern so no server-side crash occurs.
- What if the sales model selected is `null` (user somehow bypasses validation)? The enabled modules section on Step 4 must fall back gracefully — show base modules only with no POS or Storefront.
- What if the user enters a very long store name or branch? Inputs should cap at a reasonable character limit (`maxLength`) or the display should truncate gracefully in the review cards.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The `/onboarding` page MUST be replaced with a 4-step flow: (1) Business Type, (2) Sales Model, (3) Store Setup, (4) Review — all within the same page URL, no new routes.
- **FR-002**: Step 1 MUST display 7 selectable business type cards: Mobile Store, Accessories Store, Clothing Store, Supermarket, Electronics Store, Cosmetics Store, Other Retail. Each MUST have a distinct visual identifier (icon or colour marker), title, description, and example products text.
- **FR-003**: The "Continue" button in Step 1 MUST be disabled until a business type is selected.
- **FR-004**: Step 2 MUST display 3 sales model cards: Physical store only, Online store only, Both physical + online. Each MUST show a feature list. "Both physical + online" MUST carry a "Recommended" badge.
- **FR-005**: The "Continue" button in Step 2 MUST be disabled until a sales model is selected.
- **FR-006**: Step 3 MUST show the workspace context "Mustafa's Co." as a read-only row — not editable and clearly labelled as read-only.
- **FR-007**: Step 3 MUST include an editable Store Display Name field and a Main Branch field. Both are required — the "Continue" button is disabled when either is empty.
- **FR-008**: Step 3 MUST show Currency and Country as selectable values.
- **FR-009**: Step 3 MUST show the previously selected business type and sales model as read-only summary chips with links to navigate back to Steps 1 or 2.
- **FR-010**: Step 4 MUST display 7 summary cards: Workspace, Business Type, Sales Model, Store Name, Main Branch, Currency, Country.
- **FR-011**: Step 4 MUST display an "Enabled modules" grid that varies by sales model: base modules always present (Dashboard, Products, Inventory, Customers, Sales, Reports); POS added when model is "physical" or "both"; Storefront added when model is "online" or "both".
- **FR-012**: Step 4 MUST display 4 next recommended actions: "Add first product", "Set opening stock", "Invite team member", "Review settings". All action items use `href="#"`.
- **FR-013**: Clicking "Finish setup" MUST write the onboarding state to sessionStorage and navigate to `/dashboard`.
- **FR-014**: The new sessionStorage keys added are: `shops_business_type`, `shops_store_name`, `shops_country`. The existing keys `shops_branch`, `shops_currency`, `shops_onboarding_done` are reused unchanged. The `shops_mode` key is repurposed to store the sales model value (`"physical"`, `"online"`, or `"both"`).
- **FR-015**: When `shops_onboarding_done` is present in sessionStorage, navigating to `/onboarding` MUST show the completion state — not the step flow.
- **FR-016**: A 4-step stepper indicator MUST be visible throughout the flow (Steps 1–4). The stepper MUST NOT appear on the completion state screen.
- **FR-017**: Each step transition MUST preserve previously entered values — "Back" navigation must not clear selections.
- **FR-018**: No new packages may be introduced. No Lucide icons, no Framer Motion. All icons use the existing `IconName` union in `components/ui/Icon.tsx`.
- **FR-019**: No form submission to any backend. All data written to sessionStorage only.
- **FR-020**: No cross-app imports. All changes scoped to `apps/shops-app`.
- **FR-021**: All links in the new onboarding flow that navigate outside the flow use `href="/dashboard"` (real path) or `href="#"`. No localhost URLs. No external links.

### Key Entities

- **BusinessType**: `"mobile" | "accessories" | "clothing" | "supermarket" | "electronics" | "cosmetics" | "other"` — new sessionStorage key `shops_business_type`.
- **SalesModel**: repurposes existing `ShopsMode` type via `shops_mode` key; new valid values `"physical" | "online" | "both"`.
- **StoreSetupData**: store name (`shops_store_name`), branch (`shops_branch`), currency (`shops_currency`), country (`shops_country`).
- **OnboardingStep**: `1 | 2 | 3 | 4` — React state only, not persisted.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can complete all 4 onboarding steps and arrive at `/dashboard` in a fresh session — verified end-to-end with browser DevTools open.
- **SC-002**: After clicking "Finish setup", all session keys are present: `shops_business_type`, `shops_mode`, `shops_store_name`, `shops_branch`, `shops_currency`, `shops_country`, `shops_onboarding_done` — verified via DevTools → Application → Session Storage.
- **SC-003**: Step 4 enabled modules accurately reflect the selected sales model — "Physical only" shows POS but not Storefront; "Online only" shows Storefront but not POS; "Both" shows both — verified by completing the flow three times with different model choices.
- **SC-004**: Returning to `/onboarding` after completion shows the completion card, not the step flow — verified by completing the flow and navigating back.
- **SC-005**: All five existing operations pages (`/products`, `/orders`, `/customers`, `/reports`, `/settings`) continue to render without error after the onboarding change — verified by navigating to each.
- **SC-006**: `pnpm lint` exits with zero errors.
- **SC-007**: `pnpm tsc --noEmit` exits with zero errors.
- **SC-008**: `pnpm --filter shops-app build` exits with zero errors.

---

## Assumptions

- The Magic Patterns export (`docs/magicpatterns/`) is used as visual design reference only. Its package dependencies (`framer-motion`, `lucide-react`) are not introduced. Animations from the reference are either omitted or approximated with CSS transitions.
- The `ShopsMode` type in `lib/mode.ts` will be extended or replaced to accommodate `"physical" | "online" | "both"`. Dashboard components (`NextSteps.tsx`, `StoreProfile.tsx`) that currently read `shops_mode` with old values (`"business" | "store" | "both"`) will need updating to match the new values.
- Step 3 has actual text inputs (not disabled) — the user types their store name and branch. This data is stored in sessionStorage only, never sent to a backend. This is consistent with the scope constraint "no real CRUD".
- The step state (`currentStep: 1 | 2 | 3 | 4`) is React component state only — not persisted. A page refresh restarts from Step 1 (or the completion state if `shops_onboarding_done` is set).
- Business type icons are drawn from the existing `IconName` union. Where a perfect icon match does not exist, the closest semantic icon is used and the distinction is communicated via card colour tinting, not icon shape alone.
- The `shops_country` value is a selection from a fixed list (Egypt, Saudi Arabia, UAE, USA) — not a free-text field.
- The `shops_currency` value is inherited from the workspace and displayed as a selectable field, but the user's selection is stored in `shops_currency` sessionStorage key.
- The existing `ModeCard` component from `components/onboarding/ModeCard.tsx` is NOT reused — the new onboarding page builds its step panels inline or with new lightweight sub-components, to avoid coupling the new flow to the old 3-step implementation.
- The existing dashboard and operations pages do not need changes beyond updating any references to the old `ShopsMode` values (`"business"`, `"store"`) to the new values (`"physical"`, `"online"`).
- The current `/onboarding/page.tsx` is fully replaced. The old step structure (mode → profile → checklist) is retired.
