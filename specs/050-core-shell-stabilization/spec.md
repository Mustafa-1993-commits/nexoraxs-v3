# Feature Specification: Core Platform Application Shell Stabilization and Enhancement

**Feature Branch**: `050-core-shell-stabilization`

**Feature ID**: `050-core-shell-stabilization`

**Created**: 2026-07-14

**Status**: Approved

**Approved By**: Product Owner — explicit approval recorded in the 2026-07-14 Phase A
implementation instruction

**Approved Date**: 2026-07-14

**Approved Proposal**: DP-050-01 Proposal A — Conservative Stabilization

**Input**: User description: "Stabilize and enhance the existing Core Platform Application Shell incrementally while preserving routes, mock state, legacy compatibility, and approved visual behavior."

## Feature Intent and Guardrails

The existing Core Platform dashboard shell is the implementation baseline. This feature stabilizes
that shell as a coherent, responsive, accessible Core Platform surface. It is an incremental
compatibility feature, not a rewrite, architecture change, data migration, backend integration, or
automatic visual redesign.

The implementation MUST preserve current route URLs, browser-storage keys, seeded identifiers,
mock data, provider-facing compatibility, onboarding and Product Hub journeys, and working visual
patterns. No material replacement is authorized in this feature, and no approved design is
replaced merely because an alternative is available. Future material opportunities require a
separate approved `DX-*` Design Proposal and feature scope.

## Clarifications

### Session 2026-07-14

- Q: Which current shell structure and elements are authorized to change? → A: Preserve the existing shell structure, route order, topbar placement, theme behavior, and compatibility state. Improve only accessibility, responsive behavior, keyboard navigation, focus management, loading/empty/error states, visual consistency, component reuse, and performance. Record significant UX opportunities as future DX Design Proposals without implementing them.
- Q: Which organization contexts belong in the global Core shell? → A: The global Core shell shows Workspace only. Existing page-level Business presentation backed by legacy `BusinessUnit` remains compatible, while Branch stays page-specific or OS-specific. No global Business, Business Unit, or Branch selector is added.
- Q: What search, command, and AI entry behavior is authorized? → A: Implement lightweight Core-only search in the existing search placement for current Core navigation items, installed-application presentation entries, settings destinations, and already-available documentation links. Exclude business records, Commerce and other OS data, global search, AI search, command palettes, and AI Assistant entries.
- Q: How must the Core shell handle existing mock notifications? → A: Preserve the notification bell and current visible mock behavior through a shell-facing read-only presentation adapter. Treat Commerce-derived items as Legacy-compatible projections only; Core gains no notification ownership or write behavior. Add no notification center, backend, migration, or cross-domain business logic, and keep the UI seam replaceable by the future governed notification source.
- Q: Which shell patterns may become reusable platform primitives in this feature? → A: None. Keep Core shell composition, navigation, context, search, and notification adapter app-local; reuse existing `packages/ui` presentation primitives, and defer any new shared extraction until multiple consumers and separate approval justify it.

### Authority Conflict and Stopped Boundary

ADR-004 and the frozen Core Platform baseline define the canonical hierarchy as:

`Workspace -> Business -> Business Unit -> Department / Branch`

The current implementation and lower-authority AGENTS.md compatibility instruction use a legacy
model in which a `BusinessUnit` record is presented with the user-facing label **Business** and no
separate canonical Business record exists. These statements cannot be merged into a new canonical
model inside this feature.

Therefore:

- the current `BusinessUnit` identifiers, types, storage keys, records, and user-facing Business
  label are preserved as **Legacy-compatible** behavior;
- no claim is made that the legacy display label is canonical Business ownership;
- no Business or Business Unit data is renamed, duplicated, inferred, migrated, or re-parented;
- the shell may make the active legacy context understandable, but MUST NOT fabricate a missing
  Business level;
- canonical Business/Business Unit reconciliation is stopped at this boundary and requires a
  separate approved specification, migration plan, and applicable governance decision.

This bounded conflict does not prevent stabilization of navigation, presentation, accessibility,
responsive behavior, theme, locale, and shell states.

## Existing Implementation Classification Register

Every affected area uses exactly one required classification. **Keep** and **Legacy-compatible**
behavior is protected from replacement by this feature.

The official Feature 050 classification vocabulary is: **Keep**, **Improve**, **Reconcile**,
**Legacy-compatible**, **Remove later**, and **Missing**. Historical planning language is interpreted
only through this crosswalk and does not create additional classifications:

| Historical term | Official classification | Treatment note |
|---|---|---|
| Reuse unchanged | Keep | Preserve the current component and behavior. |
| Improve in place | Improve | Stabilize the current component without replacement. |
| Wrap with compatibility seam | Reconcile | Add the smallest compatibility seam while preserving current behavior. |
| Deprecate later | Remove later | Do not remove in Feature 050; removal needs separate evidence and approval. |
| Create only if missing | Missing | Creation is a treatment allowed only after evidence proves no existing component can satisfy the requirement. |
| Replace later | Remove later | Historical wording does not authorize replacement in Feature 050. |
| Blocked | Not a classification | `BLOCKED` is a gate result used when evidence, approval, or authority is insufficient. |

| Affected area | Classification | Current evidence | Required treatment in this feature |
|---|---|---|---|
| `/dashboard` route group and existing child route URLs | Keep | Core owns `/dashboard`, `/dashboard/apps`, `/dashboard/billing`, `/dashboard/team`, `/dashboard/integrations`, and `/dashboard/settings` | Preserve URLs, destinations, active-route behavior, and entry journey |
| Core dashboard authentication/onboarding redirect behavior | Legacy-compatible | `app/dashboard/layout.tsx` uses hydrated mock state and client redirects | Characterize and preserve as mock UX; never present it as production authorization |
| `CoreShell` and current two-region topbar/sidebar composition | Keep | `components/shell/CoreShell.tsx` supplies Core navigation to `Shell.tsx` | Preserve the composition, placement, and visual hierarchy |
| Sidebar structure, route order, labels, and destinations | Keep | Existing links preserve Core route ownership, order, and active destinations | Preserve without regrouping, adding hierarchy, or changing destinations |
| Sidebar interaction, responsive, keyboard, and focus behavior | Improve | Current drawer and links work but lack a complete accessible interaction contract | Improve semantics, current-page indication, closure, focus containment, and focus restoration without structural change |
| Top navigation structure, placement, and control order | Keep | Search, locale, theme, notifications, and profile controls already occupy established positions | Preserve placement and order without consolidation or relocation |
| Top navigation control semantics and responsive behavior | Improve | Existing controls need clearer supported states, accessible naming, keyboard behavior, and compact-layout handling | Improve behavior and consistency within the existing placement |
| Workspace context display | Improve | Core mode shows the active Workspace but does not provide a complete recovery experience | Keep the global shell Workspace-only; preserve current identity and define safe empty, stale, and unavailable states without inventing authority |
| `BusinessUnit` records displayed as Business | Legacy-compatible | Existing page-level and Product Hub UI labels `BUSINESS_UNITS` as Business/Businesses | Preserve IDs, storage, types, label, and page-level placement; disclose the compatibility boundary in tests and documentation |
| Canonical Business and Business Unit separation in the current shell | Missing | No separate canonical Business type/store/context exists | Do not create it here; route to a future governed migration specification |
| Branch context presentation in the global Core shell | Missing | Core mode does not expose Branch; Branch UI exists only at page or OS-oriented boundaries | Do not add it globally; preserve Branch context only where an existing page or OS workflow materially requires it |
| Context selection validation and recovery | Reconcile | `setCurrent` accepts client-selected identifiers; selectors are inputs, not authorization | Add mock-facing validation/recovery at the shell boundary while preserving identifiers and storage keys |
| Breadcrumbs | Missing | No current Core shell breadcrumb model exists | Do not add in this feature; any future need must be submitted as a DX Design Proposal |
| Core-only search entry | Improve | A visible placeholder input exists without an explicit result contract | Preserve placement and add lightweight search over current Core navigation, installed-application presentation entries, settings destinations, and available documentation links only |
| Notification bell placement and interaction entry | Keep | The existing topbar bell is a working, familiar shell entry | Preserve placement and current visible outcomes |
| Raw notification presentation source | Reconcile | Core notification UI directly derives items from shared Core and Commerce mock collections | Route current results through a shell-facing read-only adapter without changing behavior or adding business logic |
| Commerce-derived mock notification items | Legacy-compatible | Current low-stock, out-of-stock, and order items are visible in the Core bell | Preserve as read-only compatibility projections only; they remain non-canonical and replaceable |
| User profile menu | Improve | Current menu links to existing Core routes and signs out | Preserve actions; improve menu semantics, focus management, localization, and compact-layout usability |
| Language switching and document direction | Improve | Locale state changes `lang` and `dir`, but changed shell copy is not fully localized | Preserve storage and switching; complete Arabic/English coverage for affected shell surfaces |
| Light and dark theme switching | Keep | Theme is stored through existing compatibility state and applied through `data-theme` | Preserve key, values, and visual baseline; validate readability and focus in both themes |
| Responsive sidebar and scrim | Improve | Mobile drawer exists, uses logical inset, and closes on link/scrim | Improve focus containment, escape/close behavior, restoration, overflow, and tablet/mobile usability |
| Keyboard navigation and focus behavior | Improve | Native controls exist, but menus/drawer lack a complete keyboard and focus contract | Define deterministic order, visible focus, escape behavior, return focus, and skip navigation |
| Hydration/loading shell state | Improve | A fixed dark spinner is shown without an accessible status or recovery path | Preserve routing timing; add named, theme-readable, reduced-motion-safe status behavior |
| Empty, error, unauthorized, and recovery shell states | Missing | No shared shell-level state model covers all four outcomes | Add presentation states only; do not invent backend errors or authorization ownership |
| Command/quick-action entry | Missing | No current Core command surface exists | Not approved by this spec; requires evidence and an approved Design Proposal before implementation |
| AI Assistant entry | Missing | No current Core shell entry exists | Not approved by this spec; any future entry is non-functional until its owner, purpose, and approved Design Proposal exist |
| Deprecated `Topbar`, locale/theme helpers, and duplicate legacy shell paths | Remove later | Files are marked deprecated or superseded but may retain compatibility consumers | Do not remove in the first stabilization phase; remove only after usage proof and replacement tests |
| Core-local Commerce mode branches in `Shell.tsx` | Remove later | Core-local shell code contains a Commerce mode and Branch control, without a cross-app import | Do not expand or reintroduce it; retire only after independent Commerce behavior and replacement are proven |
| Shared `@nexoraxs/ui` visual tokens and Core theme styles | Keep | The shell already consumes shared presentation-only styles | Reuse before creating primitives; no new business logic in `packages/ui` |
| Core-local shell composition and behavior | Keep | Core navigation, context, search, and notification compatibility serve the Core application boundary | Keep app-local; do not extract a new shared shell or shell primitive in this feature |
| Core `useApp` page-facing mock facade | Legacy-compatible | Pages depend on the existing facade and browser mock storage | Preserve public behavior during this feature; add only the smallest shell-facing seam needed for stabilization |
| Core automated shell regression coverage | Missing | No Core shell test file was found | Add characterization and acceptance evidence before structural changes |

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Enter and Navigate the Existing Core Shell Safely (Priority: P1)

An existing user completes the current mock authentication and onboarding checks, enters the Core
dashboard, understands the active Core context, and moves among existing Core routes without losing
state or encountering a changed journey.

**Why this priority**: Preserving the working entry and route journey is the prerequisite for every
other shell improvement and protects existing users from an unnecessary rewrite.

**Independent Test**: Start with existing compatible browser state, enter each current dashboard
route through the shell, refresh, navigate back and forward, and confirm the same route, context,
theme, locale, and mock-state behavior remains available.

**Acceptance Scenarios**:

1. **Given** an authenticated user with completed onboarding and compatible mock state, **When** the user enters `/dashboard`, **Then** the current redirect/landing behavior completes and the Core shell renders without resetting stored context.
2. **Given** the shell is visible, **When** the user follows each existing sidebar or profile-menu destination, **Then** the current URL and destination remain unchanged and the active location is identifiable.
3. **Given** an unauthenticated or onboarding-incomplete user, **When** the dashboard route is requested, **Then** the existing mock redirect destination is preserved and the transition exposes an accessible loading status.
4. **Given** a Product Hub or Core page is open, **When** the shell is stabilized, **Then** no shell action creates or updates Products, Inventory, Orders, Payments, Invoices, Returns, Transfers, or other Commerce operational facts.

---

### User Story 2 - Understand and Change Available Context Without Migration (Priority: P1)

A user can identify the active Workspace and, where the current compatible state makes them
material, understand the selected legacy Business-labelled `BusinessUnit` and Branch without the
shell inventing a canonical Business record or silently switching tenant scope.

The global Core shell remains Workspace-only. Legacy Business-labelled `BusinessUnit` and Branch
context may remain visible only on existing pages or OS-specific surfaces where already material.

**Why this priority**: Visible, explicit context is essential to safe multi-tenant navigation, while
the legacy Business/BusinessUnit state must remain stable until a governed migration exists.

**Independent Test**: Use seeded Workspace, BusinessUnit, and Branch combinations, including stale
and mismatched identifiers, and verify that valid compatible choices are preserved while invalid
choices produce an explainable recovery state rather than an inferred replacement.

**Acceptance Scenarios**:

1. **Given** compatible existing `currentWorkspaceId`, `currentBusinessUnitId`, and `currentBranchId` values, **When** the shell loads, **Then** it reads those exact identifiers through the existing mock facade and does not rewrite the storage keys.
2. **Given** a legacy `BusinessUnit` is presented as Business, **When** the user views or selects it, **Then** the user-facing wording remains compatible and no separate Business record or identifier is created.
3. **Given** the selected Branch does not belong to the selected legacy `BusinessUnit`, **When** context is evaluated, **Then** the shell shows an explainable unavailable or recovery state and does not silently adopt a Branch from another scope.
4. **Given** a context identifier is stale or unavailable, **When** the user opens a protected shell surface, **Then** the shell explains the problem, offers a safe route back to a valid Core surface, and does not treat a client identifier as proof of access.
5. **Given** canonical Business/Business Unit separation is needed, **When** planning reaches that boundary, **Then** work stops and is referred to the separate migration decision rather than being implemented in this feature.
6. **Given** the global Core shell is rendered, **When** organization context is presented, **Then** it shows Workspace only and does not add a global Business, Business Unit, or Branch selector.

---

### User Story 3 - Use the Shell Across Desktop, Tablet, and Mobile (Priority: P2)

A user can navigate the Core Platform on desktop, tablet, and mobile without hidden destinations,
overlapping controls, trapped content, or a change to the current route map.

**Why this priority**: The shell must be a dependable application foundation across supported
screen classes before additional Core features are added.

**Independent Test**: Exercise all shell controls and current routes at representative narrow,
medium, and wide viewport sizes in both directions and confirm equivalent task completion.

**Acceptance Scenarios**:

1. **Given** a wide viewport, **When** the dashboard loads, **Then** the persistent sidebar, top controls, and page content remain readable without collision or unintended nested scrolling.
2. **Given** a tablet or mobile viewport, **When** the navigation trigger is activated, **Then** the drawer opens predictably, identifies its expanded state, keeps focus within the active navigation surface, and can be closed by selection, explicit close, Escape, or scrim.
3. **Given** the mobile drawer closes, **When** closure completes, **Then** focus returns to the control that opened it.
4. **Given** Arabic RTL is active, **When** the drawer opens or closes, **Then** it enters from the logical start side and all context, navigation, and menus remain usable without mirrored meaning errors.
5. **Given** a compact viewport, **When** topbar space is constrained, **Then** every critical action remains reachable and no icon-only control loses an accessible name.

---

### User Story 4 - Use a Bilingual, Theme-Safe, Keyboard-Accessible Shell (Priority: P2)

A keyboard or assistive-technology user can operate the same critical shell journey in Arabic or
English, light or dark theme, and with reduced motion enabled.

**Why this priority**: Arabic/English parity, accessibility, and theme readability are mandatory
quality gates, not optional polish.

**Independent Test**: Complete route navigation, context access, locale and theme changes,
notifications, profile actions, drawer use, and recovery without a pointing device in all four
locale/theme combinations, with a reduced-motion preference enabled in a separate pass.

**Acceptance Scenarios**:

1. **Given** English is selected, **When** the shell renders, **Then** document language is English, direction is LTR, and all changed user-facing shell strings are English-ready.
2. **Given** Arabic is selected, **When** the shell renders, **Then** document language is Arabic, direction is RTL, and all changed user-facing shell strings are Arabic-ready.
3. **Given** either theme is selected, **When** the user focuses, hovers, selects, disables, or encounters an error, **Then** text, icons, boundaries, and focus remain perceivable.
4. **Given** keyboard-only input, **When** the user traverses the shell, **Then** focus order follows visual and semantic order, the main content can be skipped to, and no menu or drawer traps focus after closure.
5. **Given** reduced motion is requested, **When** shell transitions or loading states occur, **Then** non-essential motion is removed or reduced without hiding state changes.

---

### User Story 5 - Receive Honest Shell Status and Recovery Feedback (Priority: P2)

A user understands whether the shell is loading, has no displayable data, encountered an error,
lacks access, or can recover, without being shown invented backend behavior.

**Why this priority**: A professional shell must explain transitional and failure states before a
real backend replaces the mock implementation.

**Independent Test**: Inject each shell presentation state through the mock-facing boundary and
verify distinct semantics, accessible announcement, safe recovery, and unchanged storage.

**Acceptance Scenarios**:

1. **Given** browser mock state is hydrating, **When** the user waits, **Then** a named, theme-safe loading status is announced and does not rely on motion alone.
2. **Given** a context or shell list is legitimately empty, **When** it renders, **Then** the empty state explains what is absent and offers only an action the current mock journey supports.
3. **Given** an expected mock read fails, **When** the shell cannot render the intended content, **Then** an error state distinguishes retry from navigation recovery and preserves existing compatible state.
4. **Given** the actor lacks the required mock context for a route, **When** the route is requested, **Then** an unauthorized/unavailable state does not expose unrelated tenant data and provides a safe Core destination.
5. **Given** a state changes after user action, **When** the result is important, **Then** the result is programmatically announced without duplicate or misleading notifications.

---

### User Story 6 - Use Existing Shell Entry Points Without False Capability Claims (Priority: P3)

A user can recognize search, notifications, and profile entry points and understand their current
mock-supported scope. New command or AI entry points appear only after explicit design approval and
must never imply an unavailable capability.

**Why this priority**: Honest affordances preserve trust while leaving space for later platform
capabilities.

**Independent Test**: Inspect and operate each entry point with populated, empty, and unavailable
mock state and verify that labels, outcomes, and ownership claims match the current implementation.

**Acceptance Scenarios**:

1. **Given** the existing search entry is visible, **When** a user searches, **Then** results are limited to current Core navigation items, installed-application presentation entries, settings destinations, and already-available documentation links.
2. **Given** the notification entry is opened, **When** content is shown, **Then** current visible mock outcomes remain unchanged through the read-only presentation adapter and the shell does not become owner or writer of Commerce operational facts.
3. **Given** the profile menu is opened, **When** the user selects an existing action, **Then** the current Core destination or logout behavior is preserved and focus is managed predictably.
4. **Given** no Design Proposal has been approved for a command surface or AI Assistant entry, **When** this feature is implemented, **Then** neither entry is added.
5. **Given** a later approved Design Proposal permits an AI entry, **When** that entry is added under a revised scope, **Then** it is explicitly non-functional until its governed interaction contract exists and is not presented as autonomous authority.
6. **Given** a query matches business records, Commerce facts, another OS, global content, AI output, or a command, **When** Core search evaluates it, **Then** no result from that excluded source is returned.

### Edge Cases

- Browser storage is unavailable, malformed, partially seeded, or contains a stale current-context identifier.
- The active Workspace exists but contains no compatible legacy `BusinessUnit` or Branch record.
- A Branch identifier belongs to a different Workspace or legacy `BusinessUnit` than the active context.
- A user changes locale or theme while a dropdown or mobile drawer is open.
- The active route is a nested or unknown Core route with no explicit breadcrumb/title mapping.
- A translated label is longer than its English equivalent on a narrow screen.
- User-entered names contain Arabic, English, mixed-direction text, long unbroken text, or empty display values.
- The notification source is empty, unavailable, or contains only legacy Commerce-derived presentation data.
- Core search has no match, an empty query, duplicate labels, a long mixed-direction query, or an unavailable optional documentation-link source.
- The user presses Escape with nested transient surfaces open; the most recently opened surface closes first.
- The user navigates back/forward while the mobile drawer or menu is open.
- Reduced-motion preference changes during a session.
- Theme or locale state uses an existing compatibility key from a deprecated helper; the feature must not create a competing key.
- A route or menu is rendered before mock hydration completes.

## Requirements *(mandatory)*

### Functional Requirements

#### Baseline Preservation

- **FR-001**: The existing Core dashboard shell MUST remain the implementation baseline; this feature MUST NOT rewrite the Core Platform or automatically replace a working screen.
- **FR-002**: The feature MUST preserve the existing dashboard route URLs and destinations: `/dashboard`, `/dashboard/apps`, `/dashboard/billing`, `/dashboard/team`, `/dashboard/integrations`, and `/dashboard/settings`.
- **FR-003**: The feature MUST preserve existing authentication/onboarding redirect destinations and compatible mock entry behavior.
- **FR-004**: The feature MUST preserve all existing browser-storage keys, identifier values, seeded records, and compatible mock data shapes.
- **FR-005**: The feature MUST preserve the existing `useApp` page-facing behavior unless a narrower shell-facing seam provides behaviorally equivalent compatibility.
- **FR-006**: No application-to-application source import MAY be introduced; Core may import only permitted packages and Core-local modules.
- **FR-007**: Existing **Keep** and **Legacy-compatible** classifications MUST have characterization evidence before any affected implementation changes.
- **FR-008**: Files classified **Remove later** MUST NOT be removed until live consumers are inventoried, replacement behavior exists, regression tests pass, and an approved removal scope exists.

#### Shell Structure and Navigation

- **FR-009**: The shell MUST retain the current Core-owned top navigation, sidebar structure and order, control placement, and page-content responsibilities; no material layout change is authorized in this feature.
- **FR-010**: Every existing navigation destination MUST expose an identifiable current state using semantics in addition to color.
- **FR-011**: Navigation ordering and labels MUST remain compatible unless a localized copy correction or approved Design Proposal authorizes a change.
- **FR-012**: The mobile navigation trigger MUST expose its accessible name, expanded state, and controlled navigation relationship.
- **FR-013**: Opening, closing, route selection, Escape, and outside interaction MUST produce deterministic drawer behavior and return focus to the opener when appropriate.
- **FR-014**: The shell MUST provide a keyboard-accessible skip path to the primary page content.
- **FR-015**: The shell MUST avoid duplicate main landmarks and avoid nested page-scrolling regions that interfere with keyboard, touch, or assistive-technology navigation.
- **FR-016**: Breadcrumbs MUST NOT be implemented in this feature; any future breadcrumb need MUST be submitted as a separate DX Design Proposal and MUST preserve existing route URLs.

#### Context and Compatibility

- **FR-017**: The active Workspace MUST remain the only organization context shown by the global Core shell and MUST remain visible where material to Core navigation and governance tasks; no global Business, Business Unit, or Branch selector may be added.
- **FR-018**: Client-provided or browser-stored Workspace, BusinessUnit, and Branch identifiers MUST be treated as context inputs, not proof of authorization.
- **FR-019**: Shell context evaluation MUST reject or explain stale and cross-scope combinations rather than silently switching to an unrelated Workspace, legacy `BusinessUnit`, or Branch.
- **FR-020**: A `BusinessUnit` MAY continue to be displayed with the legacy user-facing label Business solely for compatibility with the current journey.
- **FR-021**: The feature MUST NOT rename `BusinessUnit`, create a duplicate canonical Business record, infer a Business identifier, migrate data, re-parent records, or modify BusinessUnit IDs or storage keys.
- **FR-022**: The feature MUST NOT describe the legacy Business UI label as proof that Business and Business Unit are the same canonical concept.
- **FR-023**: Branch context MUST NOT be added to the global Core shell; it MAY remain on an existing page or OS-specific surface when material and supported by compatible data, and Core MUST NOT absorb Branch operational data or OS behavior.
- **FR-024**: Any context recovery action MUST preserve valid existing state and route the user to a safe Core surface; it MUST NOT create missing organization records as a side effect.
- **FR-025**: Canonical Business/Business Unit migration MUST be excluded and recorded as a separate governed feature dependency.

#### Top Navigation Entry Points

- **FR-026**: The existing search entry MUST retain its approved placement and MUST expose an explicit accessible label, query state, result state, empty state, and keyboard interaction.
- **FR-027**: Search MUST be limited to current Core navigation items, installed-application presentation entries already available to Core, settings destinations, and static documentation links already available to the shell.
- **FR-028**: Search MUST NOT query or return business records, Commerce facts, HR or other OS data, Marketplace content, platform-global content, AI output, commands, or content obtained through a new backend/API dependency; every result MUST navigate only to an existing compatible destination without introducing, renaming, or rewriting route URLs.
- **FR-029**: The notification bell MUST retain its approved placement, accessible name, current visible mock outcomes, empty state, keyboard behavior, and focus restoration.
- **FR-030**: Core shell notification presentation MUST be read-only and MUST NOT write notification or Commerce facts, become the canonical owner of OS notification content, or introduce cross-domain business logic.
- **FR-031**: Existing Core and Commerce-derived mock notification results MUST be isolated behind the smallest shell-facing presentation adapter without changing their current behavior; the adapter MUST expose presentation data only and remain replaceable by the future governed notification source without changing the shell UI.
- **FR-032**: The user profile menu MUST preserve existing Settings, Billing, Team, and Sign-out outcomes while providing correct menu/dialog semantics and focus behavior.
- **FR-033**: A command palette or quick-action surface MUST NOT be introduced by this feature; any future need requires separate evidence, an approved `DX-*` Design Proposal, and a revised feature scope.
- **FR-034**: An AI Assistant entry MUST NOT be introduced by this feature; any future approved entry requires a separate governed interaction specification and MUST NOT be presented as functional before that specification is approved.

#### Localization, Theme, Responsive Behavior, and Accessibility

- **FR-035**: Every user-facing string changed or introduced in the shell MUST have Arabic and English variants through the existing localization path.
- **FR-036**: Locale switching MUST update the document language and direction without changing existing locale storage keys.
- **FR-037**: Layout, ordering, spacing, icons, drawer direction, menus, and focus indicators MUST use logical RTL/LTR behavior and MUST NOT assume left-only or right-only placement.
- **FR-038**: User-entered organization names MUST display as entered and MUST NOT be auto-translated.
- **FR-039**: Theme switching MUST preserve the existing theme values and storage key and MUST keep text, boundaries, controls, states, and focus readable in light and dark modes.
- **FR-040**: Critical shell navigation and actions MUST remain usable at narrow mobile, tablet, desktop, and wide desktop viewports without horizontal page overflow or unreachable controls.
- **FR-041**: All interactive shell controls MUST be operable by keyboard and expose a programmatic name, role, state, and deterministic focus behavior.
- **FR-042**: Visible focus MUST be present in both themes and directions and MUST not be removed without an equivalent or stronger indicator.
- **FR-043**: Touch targets for primary shell controls MUST be large enough for reliable touch use, and compact presentation MUST NOT reduce accessible activation areas below the project quality gate.
- **FR-044**: Non-essential shell motion MUST respect reduced-motion preferences; status comprehension MUST NOT depend on animation.
- **FR-045**: Shell semantics MUST include one primary main landmark, identifiable navigation regions, and a logical heading structure supplied by the current page.

#### Loading, Empty, Error, Unauthorized, and Recovery States

- **FR-046**: Hydration/loading state MUST expose a named status that is perceivable without motion and readable in both themes.
- **FR-047**: Empty, error, unauthorized/unavailable, and recovery states MUST be visually and semantically distinguishable.
- **FR-048**: Error and recovery states MUST preserve compatible mock state unless the user explicitly chooses a supported reset action outside this feature.
- **FR-049**: Unauthorized or invalid-context states MUST NOT reveal records from another Workspace, Business, Business Unit, Branch, or OS scope.
- **FR-050**: Retry actions MUST retry only the failed presentation read or context evaluation and MUST NOT duplicate writes.
- **FR-051**: Important asynchronous state changes MUST be announced through an appropriate non-duplicative status mechanism.

#### Boundaries, Reuse, and Future Substitution

- **FR-052**: Core shell code MUST NOT create or update Commerce operational facts, including Product, Stock, Inventory Movement, Transfer, Order, POS Transaction, Transactional Customer, Payment, Refund, Tax Application, Invoice, Receipt, Return, Exchange, or Commercial Adjustment.
- **FR-053**: Product Hub and shell presentation MAY consume existing mock projections for compatibility but MUST NOT create a second canonical truth.
- **FR-054**: Existing shared presentation components and tokens MUST be reused where applicable, but Core shell composition, navigation, context, search, and notification adapter MUST remain app-local and this feature MUST NOT extract a new shared shell or shell primitive.
- **FR-055**: `packages/ui` MUST remain presentation-only; this feature MUST NOT place tenant selection, authorization, routing, notification ownership, or other business decisions in it.
- **FR-056**: No real API call, backend, database, Laravel implementation, infrastructure, or deployment change MAY be introduced.
- **FR-057**: No SDK layer is required by this feature. A typed mock-facing shell interface MAY be introduced only when it is the smallest seam needed to replace raw presentation coupling and does not become a speculative repository abstraction.
- **FR-058**: Page-facing shell consumers MUST depend on a stable presentation/context seam so a future mock client and Laravel-backed client can be substituted without rewriting page composition.
- **FR-059**: The feature MUST NOT resolve Core deferred organization write protocol, legacy `OSEnablement` successor, or cross-application URL/handoff decisions.
- **FR-060**: No approved visual pattern MAY be materially moved, replaced, regrouped, or restructured in this feature.

#### Regression and Documentation

- **FR-061**: Characterization MUST cover existing route navigation, mock redirects, context persistence, theme, locale, notifications, profile actions, and responsive drawer behavior before corresponding changes.
- **FR-062**: Validation MUST cover English LTR and Arabic RTL in both light and dark themes at representative mobile, tablet, desktop, and wide desktop widths.
- **FR-063**: Validation MUST include keyboard-only and reduced-motion passes for all critical shell interactions.
- **FR-064**: Boundary validation MUST prove that no app-to-app source import, storage-key change, route change, Commerce write, or duplicate Business truth was introduced.
- **FR-065**: Any approved implementation change MUST update its applicable specification, test evidence, and shell/design documentation in the same governed change.
- **FR-066**: Shell-only enhancements MUST NOT regress the characterized median route-readiness or critical-control response time by more than 10% under the same reference conditions.
- **FR-067**: Any discovered opportunity that would significantly alter shell UX MUST be recorded as a future `DX-*` Design Proposal and MUST NOT be implemented by this feature.

### Key Entities *(presentation and compatibility concepts only)*

- **Shell Navigation Item**: A Core-owned presentation entry with an existing route, localized label,
  icon, current-state indication, and optional access presentation. It is not a permission grant.
- **Shell Context View**: A reconstructable global display of the current Workspace only. It
  references the existing Workspace identifier and never becomes canonical organization truth;
  compatible BusinessUnit or Branch context remains outside the global shell.
- **Legacy Business Context**: The current compatibility presentation of a `BusinessUnit` record
  using the UI label Business. It retains the existing `BusinessUnit` ID and storage contract and
  is not a replacement for canonical Business.
- **Branch Context View**: A read-only shell presentation of an existing Branch identity and parent
  compatibility context. It does not own Branch operations.
- **Breadcrumb Segment**: A proposed route/context navigation label derived from existing Core
  routes and visible context. It creates no new route and remains approval-gated.
- **Shell Entry Point**: Search, notifications, profile, locale, or theme access presented by the
  shell. Each entry must state its current supported scope and owner.
- **Notification Presentation Item**: A read-only shell view produced by the compatibility adapter.
  Commerce-derived items are Legacy-compatible projections and never become Core-owned canonical
  notification or Commerce facts.
- **Shell Presentation State**: One of ready, loading, empty, error, unauthorized/unavailable, or
  recovering. It carries user-facing explanation and safe actions but no new domain ownership.
- **Shell Preference View**: The existing locale, direction, theme, and reduced-motion presentation
  state consumed without changing compatibility storage keys.

## Design Proposal Gate

No material redesign is approved by this specification. The current approved shell remains active.
The following proposal comparison records the accepted conservative stabilization boundary;
material reorganization, breadcrumbs, new context tiers, quick actions, and AI entries remain
future `DX-*` proposal subjects outside this feature.

### DP-050-01 — Shell Information and Action Hierarchy

**Problem**: The current shell contains a useful topbar/sidebar baseline, but the search placeholder
needs a bounded Core-only behavior, breadcrumbs are absent, and compact layouts crowd top controls. The Core
shell is intentionally Workspace-only for this feature; any additional organization tier is a
future DX proposal. Material reorganization could improve clarity but could also disrupt working
routes and visual familiarity.

**Current behavior**: A dark topbar contains branding, a mobile trigger, search placeholder, locale,
theme, notifications, and profile controls. A light/dark sidebar contains Workspace context and
current Core routes. Mobile uses a start-side drawer and scrim. The route map and compatibility
state work and remain authoritative for this feature.

#### Proposal A — Conservative Stabilization *(Approved for this feature)*

Preserve the current topbar/sidebar structure and control placement. Improve semantics, focus,
responsive overflow, lightweight Core-only search, context recovery, and shell states. Do not add
breadcrumbs, regroup navigation, move controls, or introduce a new context tier.

- **Pros**: Lowest regression and migration risk; protects familiar workflows; supports incremental
  testing; best aligned with the current feature scope.
- **Cons**: Does not fully solve information density; missing context levels remain constrained by
  legacy data; future approved improvements may require another iteration.

#### Proposal B — Context-Focused Header

Keep the sidebar routes but introduce a structured page header for Workspace, approved material
organization context, and breadcrumbs; move secondary topbar controls into responsive overflow.

- **Pros**: Stronger hierarchy and context visibility; can scale to deeper Core routes.
- **Cons**: Materially changes layout and focus order; risks implying a canonical Business level
  that current data cannot support; needs additional responsive and migration validation.

#### Proposal C — Command-Centered Shell

Use a command/quick-action entry as the primary topbar discovery surface and consolidate search,
navigation, and future AI assistance behind it while retaining visible critical controls.

- **Pros**: Potentially efficient for experienced users and future platform breadth.
- **Cons**: Highest learning, accessibility, discoverability, and compatibility risk; no current
  evidence justifies it; AI and global search ownership are not specified.

**Approved option**: Proposal A was accepted for this feature on 2026-07-14. It delivers the
stabilization goal with the smallest behavioral surface and preserves the current design.

**Compatibility impact**: Proposal A preserves routes, storage, identifiers, provider-facing mock
behavior, and control placement. Proposals B and C require additional compatibility analysis.

**Responsive impact**: Proposal A improves the current drawer and topbar without changing the
mental model. Proposal B needs a new small-screen header hierarchy. Proposal C needs an alternative
when command discovery or keyboard input is unavailable.

**RTL/LTR impact**: Every option must use logical placement, preserve reading order, and validate
mixed-direction organization names. Proposals B and C add greater bidirectional-layout risk.

**Accessibility impact**: Proposal A repairs existing focus and semantics with limited new
interaction. Proposals B and C introduce new focus models and require dedicated assistive-
technology validation.

**Approval status**: Proposal A is approved for this feature. Proposals B and C are not approved.
Any significant UX opportunity beyond Proposal A MUST be recorded as a future `DX-*` Design
Proposal with Product Owner, Design, and Architecture review; it MUST NOT be implemented here.

### UI/UX Pro Max Use

UI/UX Pro Max is an advisory design engine beneath the NexoraXS Design Intelligence authority. Its
general guidance on visible focus, semantic landmarks, responsive navigation, error recovery,
touch targets, and breadcrumb restraint informs quality criteria. Its generated cyberpunk/neon
visual direction and font/palette suggestions are rejected for this feature because they conflict
with the current professional Core Platform baseline and would constitute an unapproved redesign.
No skill output changes architecture, tokens, typography, colors, or approved layout by itself.

## Constitution Requirements *(mandatory)*

### Authority and Ownership

- **Controlling authority**: Core Platform freezes in `docs/99-architecture-freeze/`; ADR-004,
  ADR-020, ADR-023, ADR-033, ADR-034, ADR-037, and ADR-040; frozen Core Platform baseline;
  Constitution v2.0.0. Lower authorities apply only where consistent.
- **Owning domain**: Core Platform owns this application shell, Core navigation, Workspace and
  organization identity presentation, Product Hub journey routing, identity/session presentation,
  and Core governance entry points. Each OS retains its setup and operational navigation.
- **Canonical writes affected**: None. This feature changes no canonical fact, write model,
  aggregate, subscription, enablement, organization record, or OS operational record.
- **Projection/read-model impact**: Reconstructable shell/context/notification presentation only.
  Existing compatible mock data remains the source during frontend-first development.
- **Deferred Decisions touched**: Core D-22 (organization write protocol), D-23 (legacy
  `OSEnablement` successor), and D-30 (cross-application URL/deep-link/context conventions) are
  encountered but explicitly preserved and unresolved.

### Scope and Boundaries

- **Tenant context**: Active actor plus explicit Workspace and, only where material and supported,
  compatible BusinessUnit and Branch identifiers. Canonical Business separation is not fabricated.
- **Authorization context**: Current client mock guards are compatibility UX only. Every context
  input must be validated for display scope; future protected operations still require actor,
  Workspace, Business, Business Unit, Branch, OS, resource, action, and owner authorization.
- **Cross-domain interaction**: No new cross-domain contract. Existing Commerce-derived
  notification compatibility may be wrapped only as a presentation seam and cannot become a new
  owner or direct write path.
- **OS independence**: Core and every OS retain separate navigation and ownership. This shell does
  not make an OS depend on Core operational data or make Core own OS operations.
- **Lifecycle impact**: None. Subscription, installation, setup, configuration, activation,
  readiness, and access semantics are not redefined. Existing mock navigation state is preserved.

### Intelligence and Product Quality

- **Capability/Knowledge/Rules/AI order**: The feature adds no capability, knowledge, rule, or AI
  decision. Search and any future AI entry cannot bypass their canonical owners.
- **Explainability and human approval**: No AI action is implemented. Material design changes need
  the explicit DP-050-01 approval; future consequential recommendations need explanation and human
  confirmation under the Constitution.
- **Arabic/English and direction**: All affected shell copy, states, accessible names, ordering,
  menus, drawer behavior, and mixed-direction content require English LTR and Arabic RTL evidence.
- **Accessibility**: Keyboard parity, visible focus, skip navigation, semantic landmarks,
  accessible names/states, focus containment/restoration, status announcements, theme contrast,
  touch targets, and reduced-motion behavior are mandatory.
- **Touch-target threshold**: Primary shell controls MUST expose an activation area of at least
  44 by 44 CSS pixels at 375px and 768px widths in both directions. Inline text links are outside
  this primary-control threshold but must still satisfy WCAG 2.2 AA.
- **Assistive-technology pair**: The supported manual validation pair is current stable NVDA with
  current stable Google Chrome on Windows. The exact OS, NVDA, and Chrome versions used at execution
  time MUST be recorded; Axe and Playwright Chromium supplement but do not replace this manual pass.
- **Accessibility evidence format**: Record locale, direction, theme, viewport, OS/browser/assistive-
  technology versions, scripted journey, expected semantic outcome, observed announcement or focus
  result, PASS/BLOCKED decision, reviewer, date, and linked defect/evidence for every manual pass.

### Security, Operations, and Compatibility

- **Security and privacy**: Tenant identifiers are untrusted inputs; invalid scope must not expose
  another tenant's data. No new sensitive data, credential, URL context, telemetry payload, or
  storage record is introduced. Error copy must minimize sensitive detail.
- **Audit and observability**: Frontend validation must make route, context, recovery, and failure
  outcomes testable without logging sensitive data. Production audit persistence, metrics, traces,
  and health systems are outside this frontend-only feature and are not simulated as canonical.
- **Contract compatibility**: Existing routes, storage keys, identifiers, mock data, and page-facing
  facade behavior remain backward compatible. Deprecation/removal requires separate evidence and
  migration; no direct BusinessUnit rename is permitted.
- **Required test evidence**: Core route and state characterization; component interaction tests;
  responsive and browser E2E; keyboard and assistive-technology checks; Arabic/English, RTL/LTR,
  light/dark, reduced-motion, invalid-context, and boundary scans; build, type, lint, and diff checks.
- **Documentation synchronization**: Approved DP-050-01 outcome, implementation deviations,
  compatibility decisions, tests, and any new presentation seam must be recorded in the feature
  artifacts and relevant design/execution documentation in the same governed change.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the six current dashboard destinations remain reachable at the same URLs
  through the shell, including refresh and back/forward navigation.
- **SC-002**: 100% of characterized compatible user journeys retain their existing Workspace,
  BusinessUnit, Branch, locale, theme, and onboarding state without storage-key or identifier
  changes.
- **SC-003**: 100% of critical shell interactions are completable with keyboard only, with visible
  focus and no focus loss or trap after a menu or drawer closes.
- **SC-004**: All acceptance journeys pass in English LTR and Arabic RTL, in both light and dark
  themes, at representative 375px, 768px, 1024px, and 1440px viewport widths.
- **SC-005**: Every loading, empty, error, unauthorized/unavailable, and recovery state is
  distinguishable by text and semantics, and every announced loading/error outcome is understandable
  with non-essential motion disabled.
- **SC-006**: Automated boundary checks find zero new application-to-application source imports,
  zero Core shell writes to Commerce operational facts, and zero new business logic in
  `packages/ui`.
- **SC-007**: Compatibility checks find zero changed route URLs, storage keys, seeded identifiers,
  or direct `BusinessUnit` renames and zero newly created canonical Business records.
- **SC-008**: 100% of changed or introduced user-facing shell strings and accessible names have
  English and Arabic coverage.
- **SC-009**: At least 95% of representative users in task validation can identify the current
  Core destination, active Workspace, available context recovery, notifications, profile menu,
  locale, and theme controls without assistance.
- **SC-010**: No horizontal page overflow, unreachable critical control, or overlapping navigation
  occurs in the required viewport, locale, direction, and theme matrix.
- **SC-011**: Zero material screen replacements, control relocations, sidebar regroupings,
  breadcrumbs, command surfaces, or AI entries ship in this feature; significant opportunities are
  recorded only as future `DX-*` Design Proposals.
- **SC-012**: The stabilized page-facing shell consumes mock data through a defined compatibility
  seam such that replacing its data source later does not require changing page layout, route
  composition, or user interaction contracts.
- **SC-013**: At least 95% of local mock-state drawer, menu, locale, theme, and route-selection
  interactions provide visible feedback within 100 milliseconds, and no measured shell route is
  more than 10% slower to become ready than its characterized pre-change baseline under the same
  reference conditions.
- **SC-014**: 100% of search results resolve to an existing Core navigation, installed-application
  presentation, settings, or available documentation destination, with zero results sourced from
  business records, Commerce, another OS, global search, AI, or command execution.

### SC-009 Validation Method

SC-009 is validated through a moderated-but-unassisted task study with 20 representative Core users:
10 complete the journey in English LTR and 10 in Arabic RTL. Each participant starts from the same
seeded authenticated/onboarded state and, without prompting after the task begins, must identify the
current Core destination, active Workspace, available context recovery, notifications, profile menu,
locale control, and theme control. A participant succeeds only when all seven elements are identified.
The gate passes when at least 19 of 20 participants succeed. Evidence records the anonymized
participant code, locale/direction, task script revision, success/failure for each element, aggregate
rate, observed confusion, moderator, date, environment, and linked follow-up defect; it MUST contain
no participant personal data.

## Out of Scope

- Canonical Business/Business Unit migration, rename, data backfill, or hierarchy reconciliation.
- Changes to browser-storage key names, stored identifiers, seed identities, or existing route URLs.
- Backend, Laravel, database, authentication service, API, real authorization, infrastructure,
  deployment, or production telemetry implementation.
- New Product Hub, Commerce setup, subscription, enablement, organization, or OS lifecycle rules.
- Commerce operational feature work or canonical Commerce writes.
- Cross-application handoff redesign or resolution of D-30.
- Broad provider decomposition, shared-package ownership migration, or speculative Repository
  Pattern introduction beyond the smallest shell-facing seam.
- New cross-application shell extraction or creation of shared shell/navigation/context/search/
  notification primitives.
- Automatic visual redesign, new token/palette/typeface system, or silent replacement of approved
  UI.
- Business-data, Commerce, cross-OS, Marketplace, platform-global, or AI search; command palettes,
  quick actions, or AI Assistant behavior.
- Notification center creation, notification persistence, backend integration, notification data
  migration, notification ownership changes, or definition of the future notification source.
- Removal of deprecated helpers or compatibility files without separate proof and approval.

## Assumptions

- The current Core dashboard routes, mock storage, provider facade, and visual shell remain the
  starting implementation throughout planning.
- Frontend-first validation uses existing mock data and current providers/facades; backend
  substitution is future work.
- Existing authenticated/onboarded mock states can be characterized without changing their keys or
  records.
- Current shared presentation tokens and components are sufficient for stabilization; new
  primitives are exceptional and require reuse evidence.
- WCAG 2.2 AA is the minimum accessibility target for affected shell surfaces.
- Representative viewport widths are validation samples, not a license to hardcode layout behavior
  only for those sizes.
- DP-050-01 Proposal A is approved for this feature. Planning is limited to its non-material
  stabilization scope; later material UI work requires a separate approved `DX-*` proposal.
- The canonical Business/Business Unit conflict is intentionally not resolved by this feature; a
  future migration feature must cite ADR-004 and preserve compatibility.
