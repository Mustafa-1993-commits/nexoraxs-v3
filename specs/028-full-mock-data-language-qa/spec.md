# Feature Specification: Full Mock Data Language QA

**Feature Branch**: `029-mock-data-language-qa`
**Created**: 2026-05-15
**Status**: Draft
**Design Reference**: `apps/core-platform`, `apps/shops-app`

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Shops Dashboard and Operational Pages: Consistent Sample Language (Priority: P1) 🎯 MVP

A user navigating the Shops app sees placeholder labels on pages that don't yet have real data (dashboard activity, products, orders, customers, reports). Currently some of these labels say "mock foundation", "mock data · foundation", and "mock order · foundation" in amber monospace chips. These are developer-internal terms that surface to the user. The user sees them as confusion — they don't know if the data is broken, in a test mode, or intentionally empty. After this change, every such label reads "Sample data" or "Local preview" in a consistent, professional way that signals this is a demo environment without implying anything is wrong.

**Why this priority**: The Shops dashboard is the end-state of the full journey. It's the most-visited surface after onboarding, and the current "mock foundation" labels appear in multiple pages. Fixing these first eliminates the most jarring inconsistency.

**Independent Test**: Complete Shops onboarding and open the Shops dashboard. Navigate to Products, Orders, Customers, and Reports. Verify: no chip, badge, or label reads "mock", "foundation", or "mock data · foundation". Every placeholder indicator reads "Sample data" or "Local preview". The amber chip color may be retained for visual distinction, but the text must be updated.

**Acceptance Scenarios**:

1. **Given** the user is on the Shops dashboard, **Then** no label, chip, or badge displays the text "mock foundation".
2. **Given** the user is on the Shops Products page, **Then** no chip reads "mock data · foundation" — it reads "Sample data" instead.
3. **Given** the user is on the Shops Orders page, **Then** the placeholder chip does not say "mock data" or "mock order · foundation" — it reads "Sample data" or "Sample order".
4. **Given** the user is on the Shops Customers page, **Then** the placeholder chip reads "Sample data" instead of "mock data".
5. **Given** the user is on the Shops Reports page, **Then** all chips/labels that previously said "mock data · foundation" now read "Sample data".
6. **Given** any accessible element (including screen reader labels) in the Shops app, **Then** it does not use developer-internal language like "not functional" — it uses "preview only" or equivalent user-friendly language.

---

### User Story 2 — Core Platform Dashboard: Consistent Sample Language (Priority: P1)

A user on the Core Platform main dashboard sees metric cards with a small label that reads "Commerce & POS · mock data". After this change, the label reads "Commerce & POS · Sample data" to match the language standard used across the rest of the platform.

**Why this priority**: The Core Platform dashboard is the first screen after workspace setup. The "mock data" label there should match the standard set by the Shops language fixes.

**Independent Test**: Complete workspace onboarding and open the Core Platform dashboard. Find the metric cards below the workspace name. Verify the label reads "Sample data" not "mock data".

**Acceptance Scenarios**:

1. **Given** the user is on the Core Platform dashboard, **Then** the metric sub-label that previously read "Commerce & POS · mock data" now reads "Commerce & POS · Sample data".
2. **Given** any other label, chip, or badge on the Core Platform dashboard, **Then** it does not contain "mock" as a standalone descriptor.

---

### User Story 3 — Core Platform Settings: API Key Language (Priority: P2)

A user on the Core Platform Settings → API Keys tab sees two mock API key entries. One is labelled "Production" with a key prefix `nxs_live_`. This combination implies the key is real and live, which is misleading for a mock flow. After this change, the "Production" entry is relabelled "Sample" and the key prefix reads `nxs_sample_` to make it clear this is demonstration data.

**Why this priority**: This is the only surface in core-platform where the word "Production" and a `live_` key prefix appear together, implying real credentials. Fixing it prevents user confusion about whether they should handle these keys securely.

**Independent Test**: Navigate to Core Platform Settings → API Keys tab. Verify the first key entry is labelled "Sample" (not "Production") and its key string reads `nxs_sample_` (not `nxs_live_`). Verify the second key remains "Sandbox" and its key string is unchanged.

**Acceptance Scenarios**:

1. **Given** the user is on the API Keys tab in Settings, **Then** the key previously labelled "Production" is now labelled "Sample".
2. **Given** the user is on the API Keys tab in Settings, **Then** the key string previously showing `nxs_live_` now shows `nxs_sample_`.
3. **Given** the "Sandbox" key entry, **Then** it remains unchanged — label and key string stay the same.

---

### Edge Cases

- What if a user reads the amber "Sample data" chip and wonders why data is not real? The chip is intended to communicate that this is a local preview environment. If they hover or tap it, no tooltip is provided — this is intentional, consistent with the current visual treatment. Adding a tooltip is out of scope.
- What if the amber chip color also communicates "warning" to the user? The amber color was chosen intentionally in the existing codebase to signal "this is placeholder, not production data." Retaining the color while improving the label text preserves this signal without requiring a color change.
- What if "Sample data" chips appear after the user has entered real data in onboarding (e.g., their own store name)? The chips appear on pages where no real data exists yet (products list, orders list, etc.). Session data like store name continues to be displayed correctly. The chips only annotate structural placeholder content, not user-entered content.
- What if there are additional uses of "mock" or "foundation" in aria-labels or title attributes? aria-labels are technically not user-visible but are read by screen readers. Changing "Mock search — not functional" to "Search (preview only)" makes the experience better for assistive technology users without affecting visual layout.
- What if the `nxs_live_` key string is being used as a test value in any application logic? It is not — it is a visual display string only with masked characters. Changing the display prefix does not affect any functionality.

---

## Requirements *(mandatory)*

### Functional Requirements

**Shops App — Dashboard:**

- **FR-001**: The "mock foundation" chip/label in the Shops dashboard MUST be replaced with "Sample data" or "Local preview".

**Shops App — Products page:**

- **FR-002**: The "mock data · foundation" chip MUST be replaced with "Sample data".
- **FR-003**: The aria-label "Mock search — not functional" on the search input MUST be updated to user-friendly language (e.g., "Search (preview only)").

**Shops App — Orders page:**

- **FR-004**: The "mock data" chip MUST be replaced with "Sample data".
- **FR-005**: The "mock order · foundation" inline label MUST be replaced with "Sample order".

**Shops App — Customers page:**

- **FR-006**: The "mock data" chip MUST be replaced with "Sample data".

**Shops App — Reports page:**

- **FR-007**: All instances of "mock data" chip MUST be replaced with "Sample data".
- **FR-008**: All instances of "mock data · foundation" label MUST be replaced with "Sample data".

**Shops App — Topbar:**

- **FR-009**: The aria-label "Mock search — not functional" on the Topbar search input MUST be updated to user-friendly language (e.g., "Search (preview only)").

**Core Platform — Dashboard:**

- **FR-010**: The label "Commerce & POS · mock data" MUST be updated to "Commerce & POS · Sample data".

**Core Platform — Settings / API Keys:**

- **FR-011**: The API key entry labelled "Production" MUST be relabelled "Sample".
- **FR-012**: The key string showing `nxs_live_` prefix MUST be updated to `nxs_sample_`.

**General:**

- **FR-013**: No user-visible text, chip, badge, or label in core-platform or shops-app MAY read "mock foundation", "mock data · foundation", "mock order · foundation", or bare "mock" as a standalone descriptor after these changes.
- **FR-014**: No new layout changes, logic, backend calls, packages, or authentication MUST be introduced.
- **FR-015**: The visual style of chips (color, size, font) MUST remain unchanged — only the text content changes.

### Key Entities

- **Placeholder chip**: A small amber monospace chip used across Shops pages to mark sections where real data would appear in a live environment. Text changes from "mock …" to "Sample data" or "Local preview".
- **API key entry**: A display-only row in Settings → API Keys showing a label, a masked key string, and a creation date. No real key material is involved.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A text search for "mock foundation" across all `.tsx` and `.ts` source files in `apps/core-platform` and `apps/shops-app` returns zero results — verified by grep.
- **SC-002**: A text search for "mock data · foundation" and "mock order · foundation" across all source files returns zero results — verified by grep.
- **SC-003**: A text search for `nxs_live_` in `apps/core-platform` source files returns zero results — verified by grep.
- **SC-004**: A text search for the word "Production" as a key label in `apps/core-platform/app/dashboard/settings/page.tsx` returns zero results — verified by grep.
- **SC-005**: The Shops dashboard, Products, Orders, Customers, and Reports pages all show "Sample data" chips — verified by visual inspection after loading each page.
- **SC-006**: The Core Platform dashboard metric label reads "Commerce & POS · Sample data" — verified by visual inspection.
- **SC-007**: `pnpm --filter core-platform lint` passes with zero errors.
- **SC-008**: `pnpm --filter shops-app lint` passes with zero errors.
- **SC-009**: `pnpm --filter core-platform build` exits with zero errors.
- **SC-010**: `pnpm --filter shops-app build` exits with zero errors.

---

## Assumptions

- "mock foundation" and "mock data · foundation" are display-only strings in JSX/TSX. No runtime logic depends on these exact string values — they are cosmetic labels only.
- The amber chip color (`text-amber-400/80`, `font-mono`) is intentionally used to signal placeholder state. This spec does not change the color or font styling — only the text content.
- The `nxs_live_` and `nxs_test_` key strings in Settings are hardcoded display strings with masked characters (`••••`). They are not real API keys and have no interaction with any authentication or API system.
- The `aria-label="Mock search — not functional"` on search inputs is the only aria-label using developer language. Changing it to "Search (preview only)" improves accessibility without affecting visual layout.
- "// live preview" in the Shops onboarding `StepStoreSetup.tsx` chip refers to the real-time form preview panel — this is standard UI terminology, not a live-data claim, and is left unchanged.
- The word "foundation" in "mock data · foundation" is a developer-internal term for the scaffolded placeholder state, not a product concept. Users see it as noise.
- Landing page sections are not included — the audit found no confusing mock/live language in the landing sections that require fixing.
- All changes are text-only substitutions in JSX. No component structure, routing, state, or logic changes.
- The Core Platform billing page phrase "once public pricing goes live" is contextual language about a future product launch event, not a claim about current data being live. It is left unchanged.
