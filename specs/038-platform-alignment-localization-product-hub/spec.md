# Feature Specification: Platform Alignment — Localization Foundation & Product Hub

**Feature Branch**: `038-platform-alignment-localization-product-hub`
**Created**: 2026-06-02
**Status**: Draft
**Architecture**: NexoraXS v5.2 Final Master Architecture

---

## Context

This spec aligns the Core Platform UI and Commerce OS shell with the v5.2 architecture. The platform is being renamed and restructured from an "Apps" model to a "Product Hub / Operating Systems" model. Three related concerns are addressed together because they share the same surfaces and strings: Product Hub terminology, OS card catalogue, and localization readiness.

### Current State (what exists today)

| Surface | Current label / value | Problem |
|---|---|---|
| Core Platform nav item | "Apps" | Should be "Product Hub" |
| Core Platform `/dashboard/apps` page heading | "App Launcher" | Should be "Product Hub" |
| Core Platform dashboard section | `// enabled apps` | Should reflect OS terminology |
| Core Platform dashboard active entry | "NexoraXS Shops" | Should be "Commerce OS" |
| Core Platform mock apps list | Shops, Clinics, Maintenance, Restaurants, CRM | Wrong OS catalogue; "Restaurants" is not an OS |
| Core Platform onboarding Step 2 | "Choose your apps" | Should be "Choose your operating systems" |
| Core Platform onboarding app cards | "NexoraXS Shops", "NexoraXS Clinics", "NexoraXS Restaurants", etc. | Wrong product names |
| Core Platform onboarding summary | "Enabled apps: Shops" | Should reflect OS language |
| Core Platform activity feed | "enabled the CRM app", "invited 3 team members to Shops" | Should use OS language |
| Commerce OS browser tab title | "NexoraXS Shops" | Should be "Commerce OS" |
| Commerce OS `<html lang>` | `lang="en"` hardcoded | Should support locale switching |
| Commerce OS business presets | Missing Pharmacy, Restaurant/Cafe by name; Gym present implicitly | Must clarify preset alignment |
| Platform-wide | No language switcher, no RTL support | Localization foundation missing |

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Product Hub replaces App Launcher (Priority: P1)

A workspace owner navigates to the Core Platform dashboard and sees a **Product Hub** section showing all Operating Systems. Commerce OS is shown as **Active** with a launch button. Healthcare OS, HR OS, CRM OS, Gym OS, and Maintenance OS are shown as **Coming Soon** (dimmed, non-interactive).

**Why this priority**: This is the primary architectural alignment. Every other surface references what is established here. It unblocks correct vocabulary for all future specs.

**Independent Test**: Navigate to `/dashboard/apps` (renamed to Product Hub) after workspace setup. Verify the page heading says "Product Hub" and all six OS cards are present with correct states.

**Acceptance Scenarios**:

1. **Given** a logged-in workspace owner, **When** they visit the Product Hub page, **Then** the page title reads "Product Hub" and the subtitle describes it as the workspace's operating systems, not "apps".
2. **Given** the Product Hub page is loaded, **When** the OS card list renders, **Then** exactly six OS cards appear: Commerce OS (active), Healthcare OS (coming soon), HR OS (coming soon), CRM OS (coming soon), Gym OS (coming soon), Maintenance OS (coming soon).
3. **Given** the Commerce OS card is shown as active, **When** the user clicks the launch/open button, **Then** they are navigated to the Commerce OS URL.
4. **Given** any Coming Soon OS card, **When** the user views it, **Then** the card is visually dimmed, the button is disabled and labelled "Coming Soon", and no click action is possible.
5. **Given** the sidebar navigation, **When** the user views the nav item that previously said "Apps", **Then** it now reads "Product Hub".

---

### User Story 2 — Terminology purge: "NexoraXS Shops" → "Commerce OS" (Priority: P1)

A workspace owner sees consistent "Commerce OS" terminology throughout the Core Platform. The string "NexoraXS Shops" no longer appears in user-facing UI within the Core Platform. In the Commerce OS shell, the browser tab title and page metadata reflect "Commerce OS".

**Why this priority**: Terminology inconsistency is a trust and brand problem. Shipping "NexoraXS Shops" on a platform sold as a "Business Operating Platform" contradicts the product identity. This is a hard requirement before any public demo or investor presentation.

**Independent Test**: Open the Core Platform dashboard and all accessible pages. Grep user-visible text for "NexoraXS Shops". Zero results should appear. Open Commerce OS and confirm the browser tab reads "Commerce OS".

**Acceptance Scenarios**:

1. **Given** the Core Platform dashboard overview page, **When** it renders the active OS section, **Then** the entry reads "Commerce OS" (not "NexoraXS Shops" or "Shops").
2. **Given** the Core Platform dashboard activity feed, **When** it shows mock activity events referencing the commerce product, **Then** those events say "Commerce OS" (not "Shops" or "NexoraXS Shops").
3. **Given** the Core Platform workspace onboarding Step 2 app card for the commerce product, **When** rendered, **Then** the card title reads "Commerce OS" and the description references commerce/POS operations.
4. **Given** the Core Platform workspace onboarding Step 3 summary, **When** the "Active OS" summary card renders, **Then** it shows "Commerce OS" (not "Shops").
5. **Given** the Commerce OS browser tab, **When** the application loads, **Then** the document title reads "Commerce OS" (or "NexoraXS — Commerce OS").

---

### User Story 3 — Onboarding OS catalogue alignment (Priority: P1)

During workspace onboarding Step 2 ("Choose your operating systems"), the user sees the correct OS catalogue matching v5.2 architecture. The entry "NexoraXS Restaurants" is removed (Restaurant/Cafe is a Commerce preset, not an OS). The entry "NexoraXS Clinics" is replaced with "Healthcare OS". Missing OS entries — HR OS, Gym OS — are added as Coming Soon.

**Why this priority**: Showing "Restaurants" as an OS during onboarding creates a false product impression that contradicts the architecture. Healthcare is a major future product; its absence from onboarding creates a gap that will confuse future buyers.

**Independent Test**: Complete workspace onboarding up to Step 2. Verify the OS list matches: Commerce OS (selectable), Healthcare OS (coming soon), HR OS (coming soon), CRM OS (coming soon), Gym OS (coming soon), Maintenance OS (coming soon). Confirm no "Restaurants" entry appears.

**Acceptance Scenarios**:

1. **Given** workspace onboarding Step 2, **When** the OS selection list renders, **Then** no entry labelled "Restaurants", "NexoraXS Restaurants", or "Clinics" / "NexoraXS Clinics" is present.
2. **Given** workspace onboarding Step 2, **When** the OS selection list renders, **Then** "Healthcare OS", "HR OS", and "Gym OS" entries are present and marked Coming Soon.
3. **Given** workspace onboarding Step 2, **When** the OS selection list renders, **Then** "Commerce OS" is the only selectable entry and is pre-selected by default.
4. **Given** workspace onboarding Step 2, **When** the user tries to deselect Commerce OS, **Then** the system prevents proceeding without at least one OS selected and shows an inline warning.
5. **Given** workspace onboarding Step 3 (Review), **When** the summary card for active OS renders, **Then** it shows "Commerce OS", not "Shops" or any deprecated label.

---

### User Story 4 — Language switcher UI (Priority: P2)

A user can toggle the platform language between English and Arabic using a persistent UI control. The switcher is accessible from the Core Platform dashboard (header or sidebar). The selected language is persisted across page navigation within the session. When Arabic is selected, the platform shell layout switches to RTL. When English is selected, it switches back to LTR.

**Why this priority**: Localization is a constitutional requirement (Article XI). The Middle East is the primary market. A visible language control unblocks RTL testing and demonstrates the localization commitment to Arabic-speaking users and investors.

**Independent Test**: Locate and click the language switcher. Select Arabic. Verify the layout direction flips to RTL and the switcher label updates. Select English. Verify LTR returns.

**Acceptance Scenarios**:

1. **Given** the Core Platform dashboard, **When** it renders, **Then** a language switcher control is visible showing the current language (default: English).
2. **Given** the language switcher is set to English, **When** the user selects Arabic, **Then** the page layout direction changes to RTL and the switcher label reflects "AR" or "العربية".
3. **Given** the language switcher is set to Arabic, **When** the user navigates between dashboard pages, **Then** the RTL direction is preserved.
4. **Given** the language switcher is set to Arabic, **When** the user selects English, **Then** the layout direction reverts to LTR.
5. **Given** a fresh page load within the same session, **When** the language was previously set, **Then** the selected language is restored from session storage (no backend required at this stage).

---

### User Story 5 — RTL/LTR layout readiness for new UI surfaces (Priority: P2)

All new UI strings and layout elements introduced in this spec use logical CSS direction properties (start/end) rather than physical left/right values. The Product Hub page, OS cards, and language switcher render correctly in both LTR and RTL without broken alignment, overlapping text, or clipped elements.

**Why this priority**: RTL bugs discovered after widespread deployment are expensive. Any LTR-only assumption baked into new components now will require a full pass later.

**Independent Test**: Switch to Arabic (RTL). Inspect the Product Hub grid, OS cards, sidebar nav items, and onboarding steps. All layouts must mirror correctly — text aligns to the right, icons flip sides, card padding is symmetric.

**Acceptance Scenarios**:

1. **Given** the Product Hub page in RTL mode, **When** OS cards are displayed in a grid, **Then** text within cards aligns to the right and padding is correct on both sides.
2. **Given** the sidebar in RTL mode, **When** nav items render with an icon and label, **Then** the icon appears to the right of the label and the active indicator is on the correct (left in RTL) edge.
3. **Given** the workspace onboarding flow in RTL mode, **When** any step is shown, **Then** the step indicator, form fields, and action buttons all render without visual breakage.
4. **Given** new strings added by this spec (e.g., "Product Hub", "Operating Systems", "Commerce OS"), **When** they appear in both LTR and RTL, **Then** they are wrapped in localizable string containers (not hardcoded raw strings).

---

### User Story 6 — Commerce preset alignment in Commerce OS onboarding (Priority: P2)

The Commerce OS (shops-app) business preset list explicitly includes **Pharmacy** and **Restaurant / Cafe** as valid selectable presets. **Gym** does not appear as a Commerce preset. The label and description for each preset make clear it belongs to Commerce (product sales, POS, inventory) and not to its own OS.

**Why this priority**: Architecture states Pharmacy and Restaurant/Cafe are Commerce presets, not separate OS products. If a user searches for "Pharmacy" or "Restaurant" in the Commerce OS setup and finds nothing, they will be confused. The Gym boundary is equally important — it must not bleed into Commerce.

**Independent Test**: Start Commerce OS onboarding and reach the business type selection step. Verify "Pharmacy" and "Restaurant / Cafe" appear as selectable presets. Verify no "Gym" or "Healthcare" option appears.

**Acceptance Scenarios**:

1. **Given** Commerce OS onboarding business type selection, **When** the preset grid renders, **Then** "Pharmacy" is present as a selectable option with a description referencing product sales, barcode, and stock management (not clinical workflows).
2. **Given** Commerce OS onboarding business type selection, **When** the preset grid renders, **Then** "Restaurant / Cafe" is present as a selectable option with a description referencing POS and food-service commerce (not a separate app or OS).
3. **Given** Commerce OS onboarding business type selection, **When** the preset grid renders, **Then** no "Gym", "Healthcare", or "Clinic" option is present.
4. **Given** the current `BusinessType` union in `lib/mode.ts`, **When** this spec is implemented, **Then** `"pharmacy"` and `"restaurant"` (or `"restaurant-cafe"`) are added as valid business type values.
5. **Given** the `BUSINESS_TYPE_LABEL` map (or equivalent display label map), **When** "pharmacy" or "restaurant" is the active type, **Then** the correct human-readable label is shown in the Review step.

---

### Edge Cases

- What happens if a user with a session that has the old `shops` OS key stored visits the Product Hub after the terminology update? The Product Hub should still show Commerce OS as active — the underlying data key (`shops`) is not user-facing and does not change.
- What happens if the language switcher is toggled while a modal or slide-over is open? The direction change should apply without closing the modal; no visual breakage should occur.
- What happens when the browser/OS is in Arabic locale but the user selects English in the switcher? The user-selected language takes precedence over the browser locale.
- What happens if a new string is added by another developer during this phase without wrapping it in the localization utility? The spec requires new strings to be localization-ready; a code review check (or linting rule) should catch bare hardcoded strings introduced alongside this work.
- What happens on Coming Soon OS cards if a user tries to interact programmatically (e.g., via keyboard)? The button must have `disabled` and `aria-disabled="true"` so it is not reachable via keyboard focus sequences.
- What happens to the existing `food-beverage` business type in `lib/mode.ts`? It must be retained for backward compatibility (sessions already using it); the new `restaurant` / `restaurant-cafe` type is added alongside it. The display in UI should map both to a food-service label.

---

## Requirements *(mandatory)*

### Functional Requirements

**Product Hub**

- **FR-001**: The Core Platform sidebar navigation item currently labelled "Apps" MUST be relabelled "Product Hub".
- **FR-002**: The Core Platform `/dashboard/apps` page heading MUST read "Product Hub" and the subtitle MUST describe the section as the workspace's operating systems.
- **FR-003**: The mock OS catalogue displayed in the Product Hub MUST contain exactly these six entries: Commerce OS (active), Healthcare OS (coming soon), HR OS (coming soon), CRM OS (coming soon), Gym OS (coming soon), Maintenance OS (coming soon).
- **FR-004**: The "Restaurants" entry MUST be removed from the OS catalogue. Restaurant/Cafe is a Commerce preset and MUST NOT appear as a separate OS.
- **FR-005**: Each Coming Soon OS card MUST be visually dimmed, have a disabled button labelled "Coming Soon", and provide no interactive action.
- **FR-006**: The Commerce OS card MUST show an "Open" / "Launch" action button that navigates to the Commerce OS URL.

**Terminology**

- **FR-007**: The string "NexoraXS Shops" MUST be removed from all user-facing UI in the Core Platform. Internal code labels (`shops-app`, session keys `shops_*`) are NOT changed by this spec.
- **FR-008**: Every reference to the commerce product in Core Platform user-facing text MUST use "Commerce OS".
- **FR-009**: The Core Platform dashboard "enabled apps" section heading and section comment MUST be updated to reflect OS/Product Hub terminology (e.g., "Active Operating Systems").
- **FR-010**: Mock activity feed entries that reference "Shops" or "apps" MUST be updated to use OS-consistent language.
- **FR-011**: The Commerce OS browser metadata title (`<title>`) MUST read "Commerce OS" or "NexoraXS — Commerce OS".

**Onboarding**

- **FR-012**: Core Platform onboarding Step 2 heading MUST read "Choose your operating systems" (not "Choose your apps").
- **FR-013**: Core Platform onboarding OS cards MUST use the corrected OS names: Commerce OS, Healthcare OS, HR OS, CRM OS, Gym OS, Maintenance OS. "NexoraXS Clinics" and "NexoraXS Restaurants" MUST be removed.
- **FR-014**: Core Platform onboarding Step 3 summary card for the selected OS MUST display "Commerce OS" (not "Shops" or "Enabled apps").

**Localization**

- **FR-015**: A language switcher control (EN / AR) MUST be added to the Core Platform dashboard — either in the header or the sidebar footer.
- **FR-016**: Selecting Arabic in the language switcher MUST apply `dir="rtl"` to the document root and switch layout to RTL.
- **FR-017**: Selecting English MUST apply `dir="ltr"` and restore LTR layout.
- **FR-018**: The selected language MUST be persisted in session storage so it survives in-session navigation.
- **FR-019**: All new user-facing string literals introduced by this spec MUST be wrapped in a localizable string utility or constant (not inline hardcoded strings) to allow future translation without a code refactor.
- **FR-020**: New layout components introduced by this spec MUST use logical CSS properties (`start`, `end`) for directional spacing and alignment where TailwindCSS equivalents exist (`ms-`, `me-`, `ps-`, `pe-`, `rounded-s-`, etc.).

**Commerce OS Presets**

- **FR-021**: The `BusinessType` union in `apps/shops-app/lib/mode.ts` MUST be extended to include `"pharmacy"` and `"restaurant"` (or `"restaurant-cafe"`) as valid values.
- **FR-022**: The Commerce OS onboarding business type selection grid MUST display "Pharmacy" and "Restaurant / Cafe" as selectable options.
- **FR-023**: Neither "Gym", "Healthcare", nor "Clinic" MUST appear as a business preset option in Commerce OS onboarding.
- **FR-024**: Descriptions for the Pharmacy preset MUST reference product sales, stock, and barcode scanning — not clinical workflows, patient records, or prescriptions.
- **FR-025**: Descriptions for the Restaurant / Cafe preset MUST reference POS, food-service commerce, and table/counter operations — not kitchen OS, delivery platform, or a separate app.

### Key Entities

- **Operating System (OS)**: A named platform product with a `state` value of `active`, `coming_soon`, `trial`, `locked`, or `available`. Displayed as a card in the Product Hub. Identified by a stable `id` (e.g., `"commerce"`, `"healthcare"`) that is decoupled from its display label.
- **Language Preference**: A workspace-session-level setting (`"en"` or `"ar"`) stored in session storage. Controls `dir` attribute and future translation lookups.
- **Business Preset**: A starter configuration option within Commerce OS onboarding. Has an `id`, display `label`, `description`, and optional `icon`. Does not define an OS boundary.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user navigating the Core Platform can reach the Product Hub and identify all six operating systems within 10 seconds of landing on the page, without any prior instruction.
- **SC-002**: Zero instances of the string "NexoraXS Shops" are visible in any user-facing text across the Core Platform after this spec is implemented.
- **SC-003**: Zero instances of "Restaurants" appear as an OS-level entry in the Product Hub or onboarding OS list.
- **SC-004**: The language switcher is discoverable without scrolling on desktop viewport (≥ 1024px width); switching language takes one click and direction change is visually confirmed within 300ms.
- **SC-005**: All six Product Hub OS cards render without visual breakage in both LTR (English) and RTL (Arabic) layouts.
- **SC-006**: Commerce OS onboarding business type selection shows at least 10 presets including "Pharmacy" and "Restaurant / Cafe", and zero entries for Gym or Healthcare.
- **SC-007**: A developer can add a new OS card to the Product Hub by adding one entry to the mock OS data source, with no changes to the card component or page layout.

---

## Assumptions

- Implementation is UI/mock only — no backend API calls, no database writes, no billing integration.
- The `shops_*` session storage keys and the `shops-app` internal code label are **not renamed** by this spec. Renaming is a separate migration effort.
- The 037 auth screens (login, register, forgot-password, reset-password, verify-email) are **not modified** by this spec unless a specific string in those pages violates the terminology rules (e.g., if "NexoraXS Shops" appeared there, it would be corrected; otherwise those files are untouched).
- The language switcher in this spec stores the preference in session storage only. Persisting the language preference to a user profile is a future backend concern.
- "Localization-ready" in this spec means: new strings use a simple locale constant map or a lightweight `t()` helper (even a thin wrapper returning the English string for now). It does not require integrating a full i18n framework (e.g., `next-intl`, `i18next`) unless the project already has one.
- RTL layout correctness is validated visually; automated RTL tests are out of scope for this spec.
- The existing `food-beverage` business type in Commerce OS is retained for backward compatibility. It is not removed or replaced — `restaurant` / `restaurant-cafe` is added as an additional type.
- The `accessories` legacy type in `lib/mode.ts` remains unchanged (already marked as "legacy — kept for backward compat, not shown in UI grid").
- The Commerce OS nav item in the Core Platform sidebar currently pointing to `/dashboard/apps` will continue to point to the same route; only the label changes to "Product Hub". The URL slug can be addressed in a later spec if desired.

---

## Out of Scope

The following are explicitly excluded from this spec:

| Item | Reason |
|---|---|
| Renaming `shops-app` directory or internal code labels | Breaking change requiring full migration; deferred |
| Renaming `shops_*` session storage keys | Backward compatibility; deferred |
| Backend i18n infrastructure or translation file system | Not needed until backend work begins |
| Full translation of existing strings to Arabic | Only new strings introduced by this spec must be localizable; existing strings are addressed in a future i18n sweep |
| Real billing / subscription integration for OS states | Mock data only |
| Building any new OS application (Healthcare OS, HR OS, etc.) | Not now; only Product Hub cards |
| Commerce OS online store, delivery, or kitchen modules | Commerce module expansion is a separate spec |
| Multi-language document templates or invoices | Future spec (039) |
| Restoring the "Restaurants" app or `restaurants-app` directory | Deprecated per v5.2 architecture |
| Modifying 037 auth screens | Boundary rule |
| Any changes to the Laravel backend | UI/mock scope only |

---

## Affected Areas to Inspect

Before implementation, the following files and directories must be reviewed for alignment:

**Core Platform (`apps/core-platform/`)**

| File | What to check |
|---|---|
| `lib/mock-data/apps.ts` | OS catalogue definition — primary source of truth for Product Hub cards |
| `lib/mock-data/nav-items.ts` | "Apps" nav label |
| `lib/mock-data/activity.ts` | "Shops" / "CRM app" string references in mock events |
| `lib/types.ts` | `AppStatus` type — may need new values (e.g., `coming_soon` renamed for consistency) |
| `app/dashboard/apps/page.tsx` | Page heading, subtitle |
| `app/dashboard/page.tsx` | "enabled apps" section heading, "NexoraXS Shops" active entry |
| `app/onboarding/page.tsx` | Step 2 heading, `appCards` array, Step 3 summary card "Enabled apps" label |
| `components/dashboard/AppCard.tsx` | OS card component — may need new `state` variant for `coming_soon` vs current `coming-soon` string |
| `components/dashboard/Sidebar.tsx` | Nav item label, potential language switcher placement |
| `components/dashboard/Topbar.tsx` | Potential language switcher placement (alternative to sidebar) |

**Commerce OS (`apps/shops-app/`)**

| File | What to check |
|---|---|
| `app/layout.tsx` | `<title>` and `<meta description>` |
| `lib/mode.ts` | `BusinessType` union — add `pharmacy`, `restaurant` / `restaurant-cafe`; verify `VALID_BUSINESS_TYPES` array |
| `components/onboarding/StepBusinessAndSales.tsx` | Preset option grid — add Pharmacy, Restaurant/Cafe; remove any Gym/Healthcare entry |
| `components/onboarding/StepReview.tsx` | `BUSINESS_TYPE_LABEL` map — add labels for new preset values |

**Shared Packages (`packages/`)**

| Package | What to check |
|---|---|
| `packages/types/` | Any shared `OSState`, `AppStatus`, or `ProductHubItem` types that may need new values |
| `packages/ui/` | If `Logo` component renders "NexoraXS Shops" anywhere; if any component hardcodes LTR-only layout |
