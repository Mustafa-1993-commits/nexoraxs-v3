# Feature Specification: Onboarding Country & Currency From Workspace

**Feature Branch**: `023-onboarding-country-currency-from-workspace`
**Created**: 2026-05-14
**Status**: Draft
**Design Reference**: existing onboarding flows in `apps/core-platform` and `apps/shops-app`

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Core Platform Onboarding: Country Instead of Currency (Priority: P1) 🎯 MVP

A first-time user opens the Core Platform workspace onboarding. On Step 1, they see fields for workspace name, workspace slug, Country, and Region. There is no Currency field. They pick a country from the dropdown (e.g., "Egypt"). The Review step (Step 3) shows the country they chose. When they click "Continue to dashboard", the workspace country is saved. Currency is not collected at the workspace level.

**Why this priority**: Country is the foundational piece of data. Everything downstream (Shops currency, branch location) depends on knowing where the workspace operates. Currency belongs to the operational layer (Shops), not the workspace identity. Removing currency from workspace setup eliminates the ambiguity at the source.

**Independent Test**: Open `/onboarding` in a fresh session. Step 1 shows workspace name, slug, Country (select), and Region (select). No Currency field is present anywhere in Steps 1–3. Country options include Egypt, Saudi Arabia, United Arab Emirates, Kuwait, and Qatar. After completing the flow, the session storage workspace record contains a `country` field — not a `currency` field.

**Acceptance Scenarios**:

1. **Given** the user opens Step 1 of Core Platform onboarding, **Then** the form shows exactly: workspace name, workspace slug, Country select, and Region select — with no Currency field.
2. **Given** a Country select is shown, **Then** it includes at least: Egypt, Saudi Arabia, United Arab Emirates, Kuwait, and Qatar.
3. **Given** the user selects "Saudi Arabia", **Then** Step 3 review shows "Saudi Arabia" as the workspace country.
4. **Given** the user clicks "Continue to dashboard" on Step 3, **Then** the workspace session record contains `country` (not `currency`).
5. **Given** the user completes the flow and navigates back to `/onboarding`, **Then** the completion state ("Workspace already set up") is shown — the flow is not restarted.

---

### User Story 2 — Shops Onboarding Step 3: Inherited Country and Currency (Priority: P1)

A user completing the Shops onboarding reaches Step 3 (Store Setup). They see their workspace name, workspace country, and the workspace-derived currency — all read-only — in the workspace context row. They enter their store display name and main branch. There is no Country select and no Currency select to fill in. The currency shown (e.g., "EGP" for Egypt) is derived automatically from the workspace country using a local mapping with no API calls.

**Why this priority**: Showing editable Country and Currency in Shops setup after the user already set Country in the workspace onboarding creates confusion and data inconsistency. Inheriting these values from the workspace removes the redundancy and makes the relationship clear: workspace owns identity, Shops inherits it.

**Independent Test**: Navigate to Shops onboarding Step 3 (after Steps 1 and 2). The step card shows: a read-only workspace context row with workspace name, workspace country ("Egypt"), and workspace currency ("EGP"). The only editable fields are store display name and main branch. No Country dropdown, no Currency dropdown. Completing the step writes the workspace country and derived currency to session — the user never typed them.

**Acceptance Scenarios**:

1. **Given** the user is on Shops onboarding Step 3, **Then** a read-only workspace context section shows: workspace name ("Mustafa's Co."), workspace country (e.g., "Egypt"), and derived currency (e.g., "EGP").
2. **Given** the workspace country in session is "Saudi Arabia", **Then** the displayed currency is "SAR".
3. **Given** the workspace country in session is "United Arab Emirates", **Then** the displayed currency is "AED".
4. **Given** no workspace country is stored in session, **Then** the display defaults to "Egypt" / "EGP" — no error or empty value is shown.
5. **Given** Step 3 is shown, **Then** no editable Country select and no editable Currency select are present.
6. **Given** the user fills in store display name and main branch and clicks "Continue", **Then** the workspace country and derived currency are saved to session alongside the store details.

---

### User Story 3 — Shops Onboarding Step 4 Review: Inherited Fields (Priority: P1)

The Shops onboarding Review step (Step 4) shows a complete summary of the user's setup. The workspace section shows workspace name and workspace country. The store section shows store name, main branch, and the inherited currency — all clearly labelled. There are no editable input fields on this step.

**Why this priority**: The review step confirms what was collected. If the currency shown here is inconsistent with what the user experienced in Step 3, they lose confidence in the setup. The review must accurately reflect the inherited read-only values from Steps 1–3.

**Independent Test**: Complete all four Shops onboarding steps. The Review step shows summary cards including: Workspace ("Mustafa's Co."), Workspace country (the selected country), Store name, Main branch, and Currency (the derived value matching the workspace country). No card labelled just "Country" or just "Currency" without a qualifier appears. The "Finish setup" action navigates to `/dashboard` and writes the completion key.

**Acceptance Scenarios**:

1. **Given** the user is on the Review step, **Then** a "Workspace" summary card shows "Mustafa's Co.".
2. **Given** the user is on the Review step, **Then** a "Workspace country" summary card shows the workspace country (from session or default "Egypt").
3. **Given** the user is on the Review step, **Then** a "Currency" summary card shows the derived currency (e.g., "EGP") — not an editable field.
4. **Given** the user clicks "Finish setup", **Then** the shops onboarding completion key is written to session and the user navigates to `/dashboard`.
5. **Given** the Review step is shown, **Then** no standalone unqualified "Country" label appears — workspace country is shown with the "Workspace country" label.

---

### Edge Cases

- What if the user navigates directly to Shops onboarding without first completing Core Platform onboarding? The session will have no `core_workspace_country`. The Shops onboarding defaults to displaying "Egypt" / "EGP" — the user sees a valid state and is not blocked.
- What if the workspace country does not appear in the local country-to-currency mapping? The fallback currency is "EGP" — the mapping has a safe default.
- What if the user navigates Back from Step 3 to Step 2 and returns? The store display name and main branch values are preserved in state. The inherited country and currency continue to display as before.
- What if a user sets workspace country to "Kuwait" or "Qatar"? The mapping must cover all five countries listed (Egypt → EGP, Saudi Arabia → SAR, United Arab Emirates → AED, Kuwait → KWD, Qatar → QAR).
- What if the Shops "Finish setup" button is clicked before store display name or main branch is filled in? The button remains disabled — the requirement for store name and branch is unchanged.

---

## Requirements *(mandatory)*

### Functional Requirements

**Core Platform — Onboarding Step 1:**

- **FR-001**: The Currency select on Step 1 MUST be removed entirely and replaced with a Country select.
- **FR-002**: The Country select MUST offer at least 5 options: Egypt, Saudi Arabia, United Arab Emirates, Kuwait, Qatar.
- **FR-003**: "Continue" on Step 1 MUST remain disabled until workspace name, slug, and a country are all present.

**Core Platform — Onboarding Step 3 (Review):**

- **FR-004**: The Currency summary card MUST be replaced with a Country summary card showing the selected workspace country.
- **FR-005**: No Currency value MUST appear anywhere on the Review step.

**Core Platform — Session Storage:**

- **FR-006**: The workspace setup record written on completion MUST contain a `country` field (not `currency`). The key `core_workspace_country` MUST also be written as a standalone session key so Shops can read it without parsing the full workspace setup JSON.
- **FR-007**: The `WorkspaceSetup` data type MUST replace `currency` with `country`.

**Shops App — Step 3 (Store Setup):**

- **FR-008**: The editable Country select MUST be removed from Step 3.
- **FR-009**: The editable Currency select MUST be removed from Step 3.
- **FR-010**: A read-only workspace context section MUST be shown at the top of Step 3, displaying: workspace name ("Mustafa's Co."), workspace country (read from session key `core_workspace_country`, default "Egypt"), and derived currency (from the local country-to-currency mapping).
- **FR-011**: The `StoreSetupData` type MUST remove `currency` and `country` as editable fields (they are no longer collected in the form). The `StoreSetupData` interface MAY retain them as read-only/derived values passed in from the parent, or they may be removed from the interface entirely.
- **FR-012**: The local country-to-currency mapping MUST cover exactly: Egypt → EGP, Saudi Arabia → SAR, United Arab Emirates → AED, Kuwait → KWD, Qatar → QAR. The default fallback MUST be EGP.
- **FR-013**: Store display name and main branch remain required inputs. "Continue" on Step 3 is disabled when either is empty.
- **FR-014**: On "Continue" from Step 3, the resolved country and currency MUST be written to session storage keys `shops_country` and `shops_currency` respectively.

**Shops App — Step 4 (Review):**

- **FR-015**: The Review step MUST show a "Workspace country" summary card with the workspace country value.
- **FR-016**: The Review step MUST show a "Currency" summary card with the derived currency value.
- **FR-017**: No editable Country or Currency input MUST appear on the Review step.
- **FR-018**: The "Finish setup" action MUST write `shops_onboarding_done` and navigate to `/dashboard` — unchanged from the current behaviour.

**General:**

- **FR-019**: No new packages. All changes use existing icons, components, and Tailwind utilities.
- **FR-020**: No cross-app imports. All workspace country reading in Shops is done via `sessionStorage.getItem("core_workspace_country")` — a plain string key read, not an import from core-platform code.
- **FR-021**: No backend, API, auth, or CRUD.
- **FR-022**: No live data wording. All displayed values are from session or static mock.

### Key Entities

- **WorkspaceSetup (core-platform, updated)**: `{ workspaceName: string; slug: string; region: string; country: string; shopsEnabled: boolean }` — `currency` removed, `country` added.
- **CountryToCurrency mapping (shops-app, new local constant)**: `{ Egypt: "EGP", "Saudi Arabia": "SAR", "United Arab Emirates": "AED", Kuwait: "KWD", Qatar: "QAR" }` — static, no API.
- **StoreSetupData (shops-app, updated)**: `{ storeName: string; branch: string }` — `currency` and `country` removed as editable fields; they are derived and displayed in the workspace context row, not stored in this interface.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Core Platform onboarding Step 1 contains a Country select and no Currency select — verified visually in a browser session.
- **SC-002**: Core Platform onboarding Step 3 review shows "Country" with the chosen value and no currency card — verified end-to-end.
- **SC-003**: After completing Core Platform onboarding, session storage contains `core_workspace_country` as a standalone key — verified via DevTools → Application → Session Storage.
- **SC-004**: Shops onboarding Step 3 shows no Country or Currency input fields — verified by visual inspection.
- **SC-005**: Shops onboarding Step 3 shows the inherited workspace country and derived currency in a read-only context row — verified in browser.
- **SC-006**: Setting workspace country to "Kuwait" shows "KWD" in the Shops context row — verified by completing the flow with "Kuwait" selected.
- **SC-007**: Shops Review step shows "Workspace country" and "Currency" summary cards without editable inputs — verified by completing the full 4-step Shops onboarding.
- **SC-008**: Shops "Finish setup" writes `shops_onboarding_done` and navigates to `/dashboard` — verified by completing the flow.
- **SC-009**: `pnpm lint` passes with zero errors for `apps/core-platform` and `apps/shops-app`.
- **SC-010**: TypeScript check passes with zero errors for both apps.
- **SC-011**: `pnpm --filter core-platform build` and `pnpm --filter shops-app build` each exit with zero errors.

---

## Assumptions

- The Core Platform onboarding page currently uses `currency` state and a Currency select. This feature removes them and replaces with `country` + a Country select. The existing Region select is unchanged.
- The Shops onboarding `StepStoreSetup` component currently collects `currency` and `country` as editable form fields. This feature removes both editable fields; the interface simplifies to `{ storeName: string; branch: string }`. Derived values (workspace country, currency) are passed in as read-only display props from the parent or read directly from session.
- The standalone session key `core_workspace_country` is written by Core Platform when onboarding completes. Shops reads this key directly from session storage without importing any Core Platform code — a plain string key read, not a cross-app import.
- The country-to-currency mapping is a static local constant in the Shops app. It does not make any API calls and is not configurable at runtime.
- The Core Platform Country options (Egypt, Saudi Arabia, United Arab Emirates, Kuwait, Qatar) are a superset of what was shown before. The Region select options (Middle East Central, EU Central, US East, Asia Pacific SE) are unchanged.
- The Shops `shops_country` and `shops_currency` session keys are written on "Continue" from Step 3, preserving compatibility with any downstream reads of these keys.
- The Shops live preview card (in Step 3) currently shows currency and country. After this change, it shows the inherited workspace country and derived currency in read-only display — there is nothing for the user to edit in the preview.
- No changes are made to the Shops onboarding Steps 1 (Business Type) or 2 (Sales Model). Only Step 3 (Store Setup) and Step 4 (Review) are modified.
- No changes are made to the Core Platform Sidebar, Topbar, dashboard pages, or any route other than `/onboarding`.
