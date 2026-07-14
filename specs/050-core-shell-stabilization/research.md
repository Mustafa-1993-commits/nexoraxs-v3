# Research: Core Platform Application Shell Stabilization

**Feature**: `050-core-shell-stabilization`
**Date**: 2026-07-14
**Approved design direction**: DP-050-01 Proposal A — Conservative Stabilization

This research resolves the implementation-planning uncertainties found while inspecting the frozen
architecture, current Core Platform application, implementation audit, Design Intelligence,
execution standards, and installed UI/UX Pro Max guidance. It does not authorize implementation;
`spec.md` is still marked Draft and must receive the repository's required approval before code work
begins.

## Decision 1 — Preserve the current shell and quarantine the organization conflict

**Decision**: Keep the current topbar/sidebar composition, route order, control placement, browser
storage, seeded IDs, mock records, redirects, and `useApp` page-facing behavior. Treat the existing
`BusinessUnit`-as-Business presentation as a Legacy-compatible view only. Do not include a canonical
Business entity, migration, selector, rename, inferred ID, or re-parenting operation in the design.

**Rationale**: The Core Platform freeze and ADR-037 make Core the owner of Core navigation, while
ADR-004 requires Business and Business Unit to remain distinct and explicitly requires a migration
decision for legacy synonyms. The feature spec stops work only at that migration boundary and
approves independent shell stabilization.

**Alternatives considered**:

- Add a canonical Business tier now — rejected because it would violate ADR-004's migration gate.
- Rename `BusinessUnit` to `Business` in frontend types — rejected because UI wording is not
  canonical ownership evidence.
- Replace the shell with a new hierarchy — rejected by DP-050-01 Proposal A and FR-009/FR-060.

## Decision 2 — Use one narrow, app-local shell presentation seam

**Decision**: Add a small typed Core-local `useShellPresentation` facade over the existing `useApp`
provider, with pure helpers for context evaluation, search entries, and notification projection.
The seam exposes only shell-ready presentation values and existing callbacks. It neither reads
browser storage from components nor becomes a generic repository/client abstraction. Existing
leaf pages continue to use `useApp` unchanged.

**Rationale**: The frontend-first and mock-data standards require components to consume an
app-owned facade while preserving the current mock adapter. The current shell directly consumes
raw Commerce collections for notifications and cannot distinguish missing from stale context
without a small additive context snapshot. A bounded facade is the smallest replaceable seam and
keeps Core shell logic out of `packages/ui`, `packages/sdk`, and another app.

**Alternatives considered**:

- Generic Repository Pattern — rejected as speculative and expressly out of scope.
- Broad `AppProvider` decomposition — rejected because it increases blast radius and would change
  page-facing behavior.
- Direct `localStorage`/`sessionStorage` reads in shell components — rejected by the frontend
  boundary and mock-data standards.
- Move the seam to `packages/shared` or `packages/sdk` — rejected because it would create ownerless
  behavior or prematurely define a backend client.

## Decision 3 — Keep Core search local, static, and destination-only

**Decision**: Implement the existing search placement as an app-local, client-side destination
search over the current Core navigation, existing settings destinations, and existing
installed-application presentation destinations. Include documentation links only if a current
runtime-owned link already exists; the current Core runtime has none, so no documentation link is
invented. Results navigate only to existing URLs.

**Rationale**: This satisfies FR-026 through FR-028 without creating platform-global search,
business-record search, Commerce data search, AI behavior, a command palette, an API, or a search
index that could be mistaken for canonical truth.

**Alternatives considered**:

- Search raw mock collections — rejected because it would expose Business/Commerce records and
  enlarge ownership scope.
- Add a backend or SDK search client — rejected by the frontend-only scope.
- Add command execution or AI search — rejected by the approved design direction.
- Leave search as a placeholder — rejected because the specification explicitly approves bounded
  Core-only search.

## Decision 4 — Isolate notifications as a read-only compatibility projection

**Decision**: Preserve the current bell and its visible plan, out-of-stock, low-stock, latest-order,
badge, and empty outcomes through a pure notification presentation adapter. The adapter maps the
current `products`, `orders`, `COMMERCE_PLAN`, and formatting callback to presentation items; it
exposes no mutation and does not define canonical Notification records.

**Rationale**: Core owns the canonical Notification Service, while the source Commerce facts remain
Commerce-owned. The current UI is read-only but directly coupled to Commerce-shaped mock data. A
pure projection retains compatibility and makes the future governed source replaceable without
giving Core ownership of stock, orders, plans, or notification persistence.

**Alternatives considered**:

- Build a notification center/store — rejected as out of scope.
- Remove Commerce-derived items — rejected because current visible behavior is protected.
- Move Commerce logic into `packages/ui` — rejected because shared UI must remain presentation-only.
- Claim the items are canonical Core notifications — rejected by the ownership baseline.

## Decision 5 — Characterize with a Core-specific Playwright harness before structural work

**Decision**: Add a separate Core Playwright configuration and deterministic Core shell fixtures,
then characterize routes, redirects, stored context, controls, mobile drawer, search-unavailable
baseline, notifications, and invalid context before changing corresponding behavior. Use
`@axe-core/playwright` for automated accessibility checks and supplement it with keyboard and
screen-reader-oriented manual evidence. Keep the existing Commerce Playwright configuration
unchanged.

**Rationale**: The repository already uses Playwright, but its root configuration starts Commerce
on port 3002, forces headed mode, and adds 2000 ms `slowMo`; it cannot produce comparable Core
behavior or performance measurements. A separate Core config is the lowest-risk extension and
does not introduce an additional component-test stack solely for this feature.

**Alternatives considered**:

- Reconfigure the existing Commerce suite — rejected because it risks unrelated coverage.
- Add Jest/Vitest/React Testing Library immediately — deferred because the required behavior can be
  characterized through the existing browser test technology; introduce another runner only if a
  later task proves a pure helper cannot be tested adequately.
- Manual-only characterization — rejected because repeatable route, storage, focus, boundary, and
  performance evidence is required.

## Decision 6 — Measure relative local performance, not a production SLO

**Decision**: In Phase A, record a characterized local reference for initial shell readiness,
drawer open/close, menu open, locale switch, theme switch, and route readiness. Use one pinned
Chromium project, production build/serve for route readiness where practical, one machine/run
profile, disabled `slowMo`, one worker, deterministic fixtures, warm-up passes, and at least 10
recorded samples per scenario. Compare medians under identical conditions. Block a changed route
that is more than 10% slower; require visible local feedback within 100 ms for at least 95% of
measurable local mock interactions.

**Rationale**: The specification defines relative regression and visible-feedback gates, while the
freeze leaves production SLOs and observability values deferred (D-42). Median same-environment
comparison reduces local noise without pretending to predict production network/device behavior.

**Alternatives considered**:

- Invent fixed production hydration or navigation budgets — rejected because no production
  evidence exists.
- Use current headed/slow-motion Playwright timing — rejected because injected delay invalidates
  interaction measurement.
- Compare results across different developer machines — rejected as non-comparable unless each
  machine establishes and compares against its own baseline.

## Decision 7 — Improve existing interaction components in place

**Decision**: Keep `Shell`, `ContextSwitcher`, `NotificationsDropdown`, `UserMenuDropdown`,
`LocaleToggle`, and `ThemeToggle`. Add semantic landmarks, `aria-current`, accessible names and
states, deterministic Escape/outside/route closure, focus containment/restoration, a skip link,
logical-direction behavior, and reduced-motion styles without relocating controls. Create a
`ShellSearch` component only because no functional search component exists, and a small
`ShellStateNotice` only because no shell state presentation exists.

**Rationale**: Component Governance requires reuse before creation and states that similar Core and
Commerce shells are insufficient evidence for shared extraction. The current components are
working but incomplete; replacement would add regression risk without a user outcome.

**Alternatives considered**:

- Replace custom menus/drawer with a new component library — rejected as a material and dependency
  change unsupported by this scope.
- Create a shared shell in `packages/ui` — rejected because shell semantics remain owner-specific.
- Remove deprecated shell helpers now — rejected until consumers, replacement, compatibility, and
  rollback are proven.

## Decision 8 — Keep shell CSS bounded to the Core app/theme

**Decision**: Reuse current semantic tokens and Core shell classes. Make necessary shell focus,
responsive, touch-target, logical-direction, and reduced-motion improvements in the existing Core
theme/app stylesheet; do not introduce a new palette, typography system, token family, or global
shell primitive. Run a consumer-impact check before changing `packages/ui/src/styles/core-theme.css`.

**Rationale**: Current styling is working compatibility evidence. Component Governance allows
incremental presentation changes but requires token/consumer review. DP-050-01 prohibits a visual
redesign.

**Alternatives considered**:

- Adopt the UI/UX Pro Max OLED palette, Hebrew typeface, horizontal journey, or floating CTA —
  rejected as irrelevant or materially conflicting with the current Core shell.
- Add page-specific hard-coded colors — rejected because both themes must remain coherent.
- Consolidate Core and Commerce theme files — rejected as unrelated broad refactoring.

## Decision 9 — Apply only the compatible UI/UX Pro Max guidance

**Decision**: Use the skill's high-confidence guidance for visible focus, accessible names, skip
navigation, keyboard parity, touch targets, avoiding horizontal overflow, representative
breakpoint testing, and `prefers-reduced-motion`. Reject its generated style/palette/typeface and
layout recommendations where they conflict with the approved Core baseline.

**Rationale**: `docs/10-design-intelligence/08-NEXORAXS-DESIGN-LAYER.md` makes the skill advisory and
subordinate to architecture, the current approved design, and Design Intelligence. The targeted UX
search directly supports the identified shell defects; the broad style result does not.

**Alternatives considered**:

- Persist the generated design system — rejected because it would create an unapproved competing
  design source.
- Ignore the skill entirely — rejected because the request explicitly requires it and its
  accessibility guidance is relevant.

## Decision 10 — Synchronize evidence without rewriting frozen history

**Decision**: During implementation Phase H, add the approved DP-050-01 Proposal A outcome to the
Design Memory register using the next available DX identifier, link it back to this feature, update
the frontend audit classifications only where evidence changed, and store characterization,
performance, accessibility, localization, and design-quality evidence under this feature. Do not
edit frozen architecture to make implementation look compliant.

**Rationale**: Documentation and implementation must change together, and the Design Memory
register is currently empty. Design Memory records approval scope but does not create architecture
or expand implementation authority.

**Alternatives considered**:

- Treat `DP-050-01` as a replacement for the central DX register — rejected because Design Memory
  requires repository-global DX allocation.
- Modify frozen architecture documents — rejected because no architecture change is approved.
- Omit implementation evidence — rejected by the Constitution and frontend-first maturity gate.

## Resolved technical context

- **Runtime**: current repository implementation choice—TypeScript 5 strict mode, React 19.2,
  Next.js 16.2 App Router, client components only where current shell interaction requires them.
- **Presentation**: current Tailwind 4/CSS theme files, Lucide icons, and existing
  `@nexoraxs/ui` presentation-only tokens/components.
- **Persistence**: existing browser `sessionStorage`/`localStorage` through `useApp` and
  `@nexoraxs/shared`; no new storage or key.
- **Testing**: Playwright 1.61 with a separate Core config, Axe browser checks, lint, TypeScript, and
  Core build; manual keyboard/screen-reader/visual matrix evidence where automation is insufficient.
- **Interfaces**: app-local typed presentation/context/search/notification seam only; no API,
  backend, database, SDK, auth package, or Repository Pattern.
- **Unresolved architecture intentionally preserved**: D-22 organization write protocol, D-23
  legacy `OSEnablement` successor, D-30 cross-application handoff conventions, and D-42 production
  observability/SLO choices.

There are no remaining `NEEDS CLARIFICATION` items for planning.
