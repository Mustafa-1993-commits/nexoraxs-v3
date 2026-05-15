# Feature Specification: Onboarding Branch Country & Currency

**Feature Branch**: `024-onboarding-branch-country-currency`
**Created**: 2026-05-14
**Status**: Draft
**Design Reference**: existing Shops onboarding flow in `apps/shops-app`

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Shops Step 3: Collect Branch Country and Currency (Priority: P1) 🎯 MVP

A user completing the Shops onboarding reaches Step 3 (Set up your shop). They see their store display name and main branch inputs as before. In addition, they now see a "Branch country" select and a "Branch currency" select. When they choose a country, the currency automatically updates to the matching default (e.g., selecting "Saudi Arabia" sets the currency to "SAR"). The user can override the currency manually if needed. A short explanatory note makes clear that these settings belong to the first branch, and that additional branches can be added later from Shops Settings → Branches.

**Why this priority**: Shops operates per-branch, not per-workspace. A user who runs stores in Egypt and the UAE needs to specify branch-level country and currency, not a workspace-level override. Without this, multi-branch operators are forced to accept incorrect defaults. This is the root cause of the previous inheritance design being reversed.

**Independent Test**: Navigate to Shops onboarding Step 3. Verify: a "Branch country" select is visible with at least Egypt, Saudi Arabia, UAE, Kuwait, and Qatar. Selecting "Egypt" auto-sets currency to "EGP". Selecting "United Arab Emirates" auto-sets currency to "AED". The user can then change currency manually (e.g., switch to "USD") without resetting the country. The "Continue" button remains disabled until store display name and main branch are non-empty.

**Acceptance Scenarios**:

1. **Given** the user is on Step 3 of Shops onboarding, **Then** a "Branch country" select is visible with at least 5 options: Egypt, Saudi Arabia, United Arab Emirates, Kuwait, and Qatar.
2. **Given** the user selects "Egypt" in the Branch country select, **Then** the Branch currency select automatically updates to "EGP".
3. **Given** the user selects "Saudi Arabia" in the Branch country select, **Then** the Branch currency select automatically updates to "SAR".
4. **Given** the user selects "United Arab Emirates" in the Branch country select, **Then** the Branch currency select automatically updates to "AED".
5. **Given** the user selects "Kuwait" in the Branch country select, **Then** the Branch currency select automatically updates to "KWD".
6. **Given** the user selects "Qatar" in the Branch country select, **Then** the Branch currency select automatically updates to "QAR".
7. **Given** the currency has auto-updated from a country selection, **When** the user manually changes the currency select to a different value, **Then** the user's manual choice is preserved — the country selection does not override it again.
8. **Given** a note is visible near the Branch country and currency selects, **Then** it explains that these settings apply to the first branch and that more branches can be added from Shops Settings → Branches.
9. **Given** the user has not entered a store display name or main branch, **Then** "Continue" on Step 3 is disabled.

---

### User Story 2 — Shops Step 4 Review: Show Branch Country and Currency (Priority: P1)

The Shops onboarding Review step (Step 4) shows a complete summary of the user's setup. The summary includes branch country and branch currency as distinct labelled cards alongside the store name, main branch, business type, and sales model. The workspace is shown as read-only context. No unqualified country or currency labels appear.

**Why this priority**: The review step must accurately reflect what was collected. Without branch country and currency in the summary, the user cannot verify the operational setup of their first branch before completing onboarding.

**Independent Test**: Complete Steps 1–3 of Shops onboarding, selecting "Kuwait" for branch country (which defaults currency to "KWD"). On the Review step, verify that "Branch country" shows "Kuwait" and "Branch currency" shows "KWD". Verify no card is labelled with an unqualified "Country" or "Currency" alone.

**Acceptance Scenarios**:

1. **Given** the user is on the Review step, **Then** a "Branch country" summary card shows the country selected in Step 3.
2. **Given** the user is on the Review step, **Then** a "Branch currency" summary card shows the currency selected (whether auto-set or manually changed).
3. **Given** the user is on the Review step, **Then** summary cards also show: Workspace ("Mustafa's Co."), Store name, Main branch, Business type, and Sales model.
4. **Given** the user clicks "Finish setup", **Then** the Shops completion key is written and the user navigates to `/dashboard`.
5. **Given** the Review step is shown, **Then** no card uses an unqualified "Country" or "Currency" label — all labels include their scope qualifier ("Branch country", "Branch currency").

---

### User Story 3 — Workspace Onboarding: No Currency Requirement (Priority: P2)

The Core Platform workspace onboarding does not need to collect or display currency. If the current workspace onboarding includes a Country field for company context, that is acceptable — but it must not be used as the authoritative source for branch currency in Shops. The workspace onboarding is unchanged unless its Country field causes confusion, in which case simplification is acceptable.

**Why this priority**: This user story documents a design boundary rather than a new feature. It ensures that future developers do not re-introduce the inheritance pattern that caused the earlier bug. It is P2 because the primary fix is in Shops (US1 and US2).

**Independent Test**: Complete workspace onboarding in Core Platform. Open Shops onboarding. Verify that the branch country and currency shown in Shops Step 3 are independent of whatever country was chosen during workspace onboarding. The Shops country and currency fields should behave identically regardless of whether workspace onboarding was completed.

**Acceptance Scenarios**:

1. **Given** a user completes workspace onboarding with country "Egypt", **When** they reach Shops Step 3, **Then** the Branch country select is not pre-filled from the workspace country — it starts at the first available option or a neutral default.
2. **Given** a user skips workspace onboarding and goes directly to Shops onboarding, **When** they reach Step 3, **Then** the Branch country and currency selects are visible and functional with no error or empty state.
3. **Given** the workspace onboarding currently shows a Country field, **Then** that field remains unchanged by this feature — neither added nor removed.

---

### Edge Cases

- What if the user selects a country and then immediately changes the currency manually before hitting Continue? The manual currency selection is preserved — the country selection only auto-suggests currency, it does not enforce it.
- What if the user navigates Back from Step 3 to Step 2 and returns to Step 3? Branch country and currency selections are preserved in state and re-displayed when they return.
- What if the user's country is not in the mapping (unlikely given the fixed list)? The currency defaults to "EGP" as a safe fallback and the user can change it manually.
- What if the user leaves branch currency as the auto-suggested value? That value is saved as their explicit choice — it is treated the same as a manual selection.
- What if the user completes onboarding, then runs Shops onboarding again (after clearing session)? The country and currency selects start fresh — no stale values are pre-populated.

---

## Requirements *(mandatory)*

### Functional Requirements

**Shops App — Step 3 (Store Setup):**

- **FR-001**: A "Branch country" select MUST be added to Step 3 of Shops onboarding, with at least 5 options: Egypt, Saudi Arabia, United Arab Emirates, Kuwait, Qatar.
- **FR-002**: A "Branch currency" select MUST be added to Step 3 of Shops onboarding, with at least 5 options: EGP, SAR, AED, KWD, QAR.
- **FR-003**: When the user selects a Branch country, the Branch currency MUST automatically update to the matching default using a static local mapping: Egypt → EGP, Saudi Arabia → SAR, United Arab Emirates → AED, Kuwait → KWD, Qatar → QAR.
- **FR-004**: After the currency auto-updates from a country selection, the user MUST be able to manually change the currency to any other available option, and that manual selection MUST be preserved.
- **FR-005**: A contextual note MUST be displayed near the Branch country/currency section explaining that these settings apply to the first branch and that additional branches can be added from Shops Settings → Branches.
- **FR-006**: The `StoreSetupData` entity MUST include `branchCountry` and `branchCurrency` fields to carry these values through the step components.
- **FR-007**: "Continue" on Step 3 MUST remain disabled until at minimum the store display name and main branch are non-empty — the branch country and currency always have a valid default so they do not block continuation.
- **FR-008**: Branch country and currency MUST NOT be sourced from workspace onboarding session data. The Shops Step 3 country/currency fields are independent of any Core Platform session keys.

**Shops App — Step 4 (Review):**

- **FR-009**: The Review step MUST show a "Branch country" summary card displaying the selected branch country.
- **FR-010**: The Review step MUST show a "Branch currency" summary card displaying the selected branch currency.
- **FR-011**: No unqualified "Country" or "Currency" label MAY appear in the Review step — all labels MUST include their scope qualifier.
- **FR-012**: "Finish setup" MUST write `shops_country` and `shops_currency` to session storage with the branch-level values selected in Step 3.
- **FR-013**: "Finish setup" MUST write `shops_onboarding_done` and navigate to `/dashboard` — unchanged from the current completion behaviour.

**Session Storage:**

- **FR-014**: `shops_country` MUST store the branch country string (e.g., "Egypt").
- **FR-015**: `shops_currency` MUST store the branch currency string (e.g., "EGP").
- **FR-016**: These keys MUST be written by Shops onboarding and read by Shops dashboard components — they MUST NOT be populated from Core Platform session keys.

**General:**

- **FR-017**: No new packages.
- **FR-018**: No cross-app imports. Changes are isolated to `apps/shops-app`.
- **FR-019**: No backend, API, auth, or CRUD.
- **FR-020**: The Shops dashboard (Topbar, StoreProfile) continues to read `shops_country` and `shops_currency` from session — no changes to dashboard components are required.

### Key Entities

- **StoreSetupData (shops-app, updated)**: `{ storeName: string; branch: string; branchCountry: string; branchCurrency: string }` — adds `branchCountry` and `branchCurrency` as explicitly collected fields.
- **BranchCountryMap (static local constant)**: `{ Egypt: "EGP", "Saudi Arabia": "SAR", "United Arab Emirates": "AED", Kuwait: "KWD", Qatar: "QAR" }` — no API.
- **Session keys written on completion**: `shops_country` (branch country), `shops_currency` (branch currency), `shops_store_name`, `shops_branch`, `shops_onboarding_done`.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Step 3 shows a "Branch country" select with at least 5 country options — verified visually in a browser.
- **SC-002**: Selecting "Saudi Arabia" in Branch country automatically updates Branch currency to "SAR" — verified by interaction test.
- **SC-003**: After a country auto-sets the currency, the user can manually change currency to "USD" and the change is preserved — verified by interaction test.
- **SC-004**: The Review step shows "Branch country" and "Branch currency" cards with the correct values from Step 3 — verified by completing the full 4-step Shops onboarding.
- **SC-005**: After completing Shops onboarding, `shops_country` in session storage contains the branch country — verified via DevTools → Application → Session Storage.
- **SC-006**: After completing Shops onboarding, `shops_currency` in session storage contains the branch currency — verified via DevTools → Application → Session Storage.
- **SC-007**: The Branch country and currency in Shops Step 3 are unaffected by the workspace country selected in Core Platform onboarding — verified by testing with different workspace country values.
- **SC-008**: `pnpm lint` passes with zero errors for `apps/shops-app`.
- **SC-009**: TypeScript check passes with zero errors for `apps/shops-app`.
- **SC-010**: `pnpm --filter shops-app build` exits with zero errors.

---

## Assumptions

- The current `StoreSetupData` interface contains only `{ storeName: string; branch: string }` (simplified in feature 022). This feature extends it with `branchCountry` and `branchCurrency`.
- The Shops onboarding orchestrator (`app/onboarding/page.tsx`) currently reads workspace country from `core_workspace_country` session key to derive currency. This feature removes that dependency — the orchestrator will instead use the user's explicit selection from Step 3.
- Default initial values: `branchCountry: "Egypt"`, `branchCurrency: "EGP"` — the first option in each list, ensuring the form always has a valid state without user interaction.
- The currency auto-update when country changes is implemented as a client-side mapping only. No API is called to validate or suggest currencies.
- The "Branch currency" select always shows all 5 currency options regardless of which country is selected. The auto-update is a suggestion, not a constraint.
- The Shops dashboard components (`Topbar.tsx`, `StoreProfile.tsx`) already read `shops_country` and `shops_currency` from session storage — they require no changes.
- Core Platform workspace onboarding's Country field (if present) is left unchanged. Shops explicitly does not read from `core_workspace_country`.
- The contextual note about branches is a static text string — no link to Settings → Branches is required in this MVP scope.
- `shops_onboarding_done` completion key and navigation to `/dashboard` are unchanged from the current implementation.
