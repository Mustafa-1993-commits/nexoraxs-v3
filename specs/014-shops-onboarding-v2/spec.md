# Feature Specification: Shops Onboarding V2

**Feature Branch**: `014-shops-onboarding-v2`  
**Created**: 2026-05-13  
**Status**: Draft  

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Clearer Mode Selection on Onboarding (Priority: P1)

A first-time user opens the Shops App onboarding page and sees three operation modes — Business Management, Storefront, and Both — each with a clear name, a short description of what it unlocks, and an icon. The "Both" mode is marked with a "Recommended" badge. The user selects a mode and taps "Continue to Setup" to proceed into the dashboard.

**Why this priority**: The onboarding mode selection is the entry point to the entire app. Without a clear, legible choice screen the user has no context for why the dashboard looks the way it does. This is the single most impactful UI improvement in v2.

**Independent Test**: Open `/onboarding` in the Shops App. Three mode cards are visible. The "Both" card shows a "Recommended" badge. Each card has a distinct icon (no emoji), a title, and 2–3 bullet-style feature descriptions. Selecting a card highlights it. Clicking "Continue to Setup" navigates to `/dashboard` and the chosen mode is persisted in sessionStorage.

**Acceptance Scenarios**:

1. **Given** the user is on `/onboarding`, **When** the page loads, **Then** three mode cards are displayed — "Business Management", "Storefront", and "Both" — with the "Both" card showing a "Recommended" badge.
2. **Given** three mode cards are visible, **When** the user clicks one, **Then** it becomes visually selected (highlighted border/background) and the others deselect.
3. **Given** a mode is selected, **When** the user clicks "Continue to Setup", **Then** `setMode(selected)` is called, and the user is navigated to `/dashboard`.
4. **Given** no mode is selected, **When** the user clicks "Continue to Setup", **Then** the button is visually disabled and no navigation occurs.

---

### User Story 2 — Setup Checklist on Dashboard (Priority: P1)

After completing onboarding, the user sees a "Setup checklist" panel on the dashboard. It lists 5 setup steps with visual checkmarks (all unchecked — mock only). The steps are: Choose shop mode, Add business profile, Add first product, Invite team member, Review settings. A progress indicator (e.g., "0 of 5 complete") is visible. No step is interactive — the checklist is a visual mock.

**Why this priority**: The setup checklist communicates to the user what the app expects them to do next, turning the empty dashboard into an actionable starting point. Without it, the dashboard after onboarding feels like a dead end.

**Independent Test**: Open `/dashboard` after completing onboarding. A "Setup checklist" card is visible, showing 5 items with unchecked state and a "0 of 5 complete" label. No items are clickable/interactive.

**Acceptance Scenarios**:

1. **Given** the user has completed onboarding and is on `/dashboard`, **When** the dashboard loads, **Then** a "Setup checklist" card is visible with 5 named steps.
2. **Given** the checklist card is visible, **When** the user inspects each item, **Then** all items show an unchecked visual state (circle or empty checkbox icon).
3. **Given** the checklist card is visible, **Then** a progress label reads "0 of 5 complete" (static mock, no interaction).
4. **Given** any checklist item, **When** the user clicks it, **Then** nothing happens (items are non-interactive).

---

### User Story 3 — Store Profile Card on Dashboard (Priority: P2)

The dashboard shows a compact "Store profile" card displaying mock store information: store name ("Mustafa's Co."), branch ("Maadi Main"), currency ("EGP"), the currently active mode label, and a "Foundation setup" status badge. All values are static mock data. The card is read-only — no edit interaction.

**Why this priority**: The store profile card gives the dashboard a sense of identity and grounds the mock data in a concrete context. It is lower priority than the checklist because the checklist directly addresses next-step guidance, while the profile is purely informational.

**Independent Test**: Open `/dashboard`. A card labelled "Store profile" or similar is visible. It shows "Mustafa's Co.", "Maadi Main", "EGP", the selected mode (e.g., "Both"), and a "Foundation setup" badge. No edit button or form is present.

**Acceptance Scenarios**:

1. **Given** the user is on `/dashboard`, **When** the page loads, **Then** a store profile card is visible with static mock values.
2. **Given** the store profile card is visible, **Then** it displays: store name, branch, currency, current mode, and a setup-phase badge.
3. **Given** the mode was set to "Business" during onboarding, **When** the dashboard loads, **Then** the mode label in the store profile reads "Business Management" (not the raw enum value).
4. **Given** any store profile field, **When** the user clicks it, **Then** nothing happens — the card is read-only with no interactive elements.

---

### User Story 4 — Mode-Adapted Dashboard Next Steps (Priority: P2)

Below the metrics on the dashboard, a "Next steps" section renders 2–3 contextual action suggestions based on the mode stored in sessionStorage. Business mode shows: "Review reports", "Invite team", "Configure tax settings". Store mode shows: "Add first product", "Configure POS", "Set up inventory". Both mode shows a combined set: "Add first product", "Review reports", "Configure POS". All actions use `href="#"` — no navigation.

**Why this priority**: Contextual next steps make the app feel responsive to the user's intent. They reinforce the mode selection decision and guide users toward key areas of the app. Lower than the checklist (US2) because the checklist covers the immediate setup steps more directly.

**Independent Test**: Open `/dashboard` after selecting "Business" mode in onboarding. A "Next steps" section shows 2–3 suggestions specific to business management (not storefront). Switch mode (by returning to onboarding), select "Store", re-enter dashboard — next steps change to store-specific suggestions.

**Acceptance Scenarios**:

1. **Given** mode is "Business", **When** the dashboard renders, **Then** the next steps section shows Business-oriented suggestions only.
2. **Given** mode is "Store", **When** the dashboard renders, **Then** the next steps section shows Store-oriented suggestions only.
3. **Given** mode is "Both", **When** the dashboard renders, **Then** the next steps section shows a combined set of suggestions.
4. **Given** any next step suggestion, **When** the user clicks it, **Then** no navigation error occurs (all links use `href="#"`).
5. **Given** mode is `null` (user navigated directly to `/dashboard` without onboarding), **When** the dashboard renders, **Then** the next steps section either shows the "Both" defaults or is hidden gracefully — no crash.

---

### Edge Cases

- What happens when `getMode()` returns `null` (user bypassed onboarding)? The dashboard must not crash — fall back to "Both" defaults or hide mode-dependent sections gracefully.
- What happens if the user refreshes the dashboard after selecting a mode? `sessionStorage` persists across page refresh but not across tabs — the mode should survive a single-tab refresh.
- What happens if the user clicks "Continue to Setup" without selecting a mode? The button should be visually disabled and the click should have no effect.
- What happens if sessionStorage is unavailable (SSR context)? The lazy `useState` initializer already guards against this with a `typeof window === "undefined"` check — the same pattern must be used in any new component that reads mode.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The onboarding page MUST display three mode cards — "Business Management", "Storefront", and "Both" — with distinct icons (inline SVG, no CDN), titles, and 2–3 feature bullet descriptions per card.
- **FR-002**: The "Both" mode card MUST display a "Recommended" badge visually attached to the card (e.g., top-right chip).
- **FR-003**: The onboarding page MUST show the "Continue to Setup" button in a disabled/muted visual state when no mode is selected, and enabled/highlighted when a mode is selected.
- **FR-004**: Clicking "Continue to Setup" with a selected mode MUST call `setMode(selected)` from `lib/mode.ts` and navigate to `/dashboard`.
- **FR-005**: The dashboard MUST display a static "Setup checklist" card with exactly 5 steps: Choose shop mode, Add business profile, Add first product, Invite team member, Review settings — all in unchecked state.
- **FR-006**: The setup checklist MUST show a static progress label "0 of 5 complete". No item may be interactive.
- **FR-007**: The dashboard MUST display a "Store profile" card with static mock values: store name "Mustafa's Co.", branch "Maadi Main", currency "EGP", selected mode label, and a "Foundation setup" badge.
- **FR-008**: The mode label in the store profile card MUST display human-readable text ("Business Management", "Storefront", "Both") — not the raw sessionStorage enum value.
- **FR-009**: The dashboard MUST display a "Next steps" section whose content varies based on the mode returned by `getMode()`.
- **FR-010**: All links and action elements in new dashboard sections MUST use `href="#"` — no hardcoded URLs, no localhost references.
- **FR-011**: New components that read mode from sessionStorage MUST use the lazy `useState` initializer pattern (`typeof window === "undefined" ? null : getMode()`) to avoid SSR crashes and linter violations.
- **FR-012**: No new packages may be introduced. All icons must use the existing `components/ui/Icon.tsx` inline SVG system. No CDN, no Lucide UMD.
- **FR-013**: No cross-app imports. All changes are scoped to `apps/shops-app`.

### Key Entities

- **ShopsMode**: `"business" | "store" | "both"` — persisted in sessionStorage via `lib/mode.ts`. Read in dashboard components via lazy useState. This entity already exists and must not be redefined.
- **SetupChecklistItem**: A display-only record with a label and a fixed `completed: false` state. Not persisted — purely a render-time constant.
- **NextStepSuggestion**: A display-only record with a label and `href: "#"`. Derived from mode at render time — not persisted.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can read all three mode options and understand their differences without additional explanation — measured by the presence of a title, icon, and description bullets on each card.
- **SC-002**: The onboarding "Continue to Setup" button is unreachable (disabled) until a mode is chosen — zero paths to `/dashboard` from onboarding without a mode being stored.
- **SC-003**: The dashboard renders the correct next-steps content for all three modes and the null/fallback case — four distinct render paths verified by visual inspection.
- **SC-004**: Both apps (`core-platform` and `shops-app`) pass `pnpm lint` and `pnpm build` with zero errors after implementation.
- **SC-005**: Zero `localhost` strings in all new or modified files — verified by grep.
- **SC-006**: Zero external URLs in JSX (no CDN links, no http/https hrefs) — all action links use `href="#"`.

---

## Assumptions

- The existing `lib/mode.ts` file and `ShopsMode` type are the source of truth for mode state — no additional persistence layer will be added.
- The existing `components/ui/Icon.tsx` icon set is sufficient; if a required icon shape is missing, an existing icon will be repurposed rather than adding a new dependency.
- The onboarding page currently uses `ModeCard` from `components/onboarding/ModeCard.tsx`. This component may be updated in place or replaced with an inline implementation — the final decision belongs to the implementation plan.
- The dashboard page already reads `getMode()` via a lazy useState initializer — new dashboard sections will use the same pattern, not introduce a new `useEffect`.
- All new dashboard sections (setup checklist, store profile, next steps) are inserted between existing sections without removing current content (stat cards, orders table, etc. remain in place).
- Mobile layout follows the existing Tailwind responsive conventions in the dashboard — no new breakpoints or custom media queries.
- "Foundation setup" badge on the store profile card is a static string — it does not reflect actual data or any computed state.
