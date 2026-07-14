# Tasks: Core Platform Application Shell Stabilization

**Feature**: `050-core-shell-stabilization`
**Input**: `spec.md`, `plan.md`, `research.md`, `data-model.md`,
`contracts/shell-presentation-contracts.md`, and `quickstart.md`
**Authority inputs**: `.specify/memory/constitution.md`, `AGENTS.md`,
`docs/08-implementation-audit/FRONTEND-CODE-RECONCILIATION-AUDIT-v1.0.md`,
`docs/10-design-intelligence/`, and `docs/11-execution/`
**Approved design**: DP-050-01 Proposal A — Conservative Stabilization
**Implementation posture**: Incremental frontend-first stabilization; no rewrite, backend,
Laravel, Repository Pattern, Business migration, BusinessUnit rename, storage-key or seeded-ID
change, route change, architecture change, speculative abstraction, or commit is authorized by this
task list.

## No UI Redesign

- Existing UI must be stabilized.
- Existing UI must not be replaced.
- Existing components must be reused whenever technically possible.
- Creating a new component requires explicit evidence that an existing component cannot satisfy
  the requirement.

## Task Format and Execution Rules

- Phase 0 prerequisite audits use `- [ ] Axxx Description with exact file paths`; existing
  implementation tasks retain `- [ ] Txxx [P?] [US?] Description with exact file paths`.
- The task-count summary for T001–T054 remains the implementation-task count; A000–A005 are six
  additional mandatory audit prerequisites and do not alter that numbering.
- `[P]` means the task can run concurrently with other `[P]` tasks whose listed dependencies are
  satisfied and whose write sets do not overlap.
- `[US1]` through `[US6]` trace to the user stories in `spec.md`; cross-cutting governance and gate
  tasks intentionally have no story label.
- A task is independently executable once its explicit dependencies are complete. It must be
  reviewable and reversible without relying on undocumented work.
- Tests and evidence are mandatory. Failing-first assertions must be observed before the related
  implementation is changed; existing behavior is characterized before structural work.
- **Priority** is implementation urgency: P0 release/blocking gate, P1 primary compatibility or
  critical journey, P2 required quality, P3 documentation/supporting evidence.
- **Complexity** is a relative estimate: S (small), M (medium), L (large).
- Phase 0 is mandatory. No T001–T054 task may begin until A000–A005 are complete and the Phase 0
  Compatibility Gate is approved.
- If Phase 0 or T001 cannot pass, stop. Do not weaken a Constitution Check or implement around an
  approval, architecture, ownership, or compatibility failure.

## User Story Trace

| Story | Priority | Independently testable outcome |
|---|---:|---|
| US1 — Enter and navigate the existing Core shell safely | P1 | All current entry/redirect and dashboard routes retain their URLs and outcomes, expose one usable main region, and identify the current destination. |
| US2 — Understand and change available context without migration | P1 | Valid Workspace and legacy BusinessUnit/Branch state remains compatible; stale, malformed, and cross-scope context is explained without storage mutation or data disclosure. |
| US3 — Use the shell across desktop, tablet, and mobile | P2 | The existing sidebar/topbar composition remains usable at required widths, and the compact drawer closes/restores focus deterministically. |
| US4 — Use a bilingual, theme-safe, keyboard-accessible shell | P2 | Critical shell journeys work in English LTR and Arabic RTL, light/dark, reduced motion, keyboard-only, and screen-reader review. |
| US5 — Receive honest shell status and recovery feedback | P2 | Loading, empty, error, unauthorized, unavailable, recovering, and ready states are distinct, localized, read-only, and non-destructive. |
| US6 — Use existing shell entry points without false capability claims | P3 | Search, notifications, profile, locale, and theme retain placement/outcomes and expose only approved local presentation behavior. |

---

## Phase 0 — Current Implementation Reconciliation

**Purpose**: Before any implementation work begins, reconcile the existing frontend implementation
with the approved Architecture Freeze. NexoraXS already contains production-quality frontend code;
the objective is to improve the current implementation rather than rebuild it.

This phase is mandatory. It is audit-only and creates no product-code change. No implementation
task T001–T054 may begin until all six prerequisite audits are complete and the Compatibility Gate
below is approved. The A-prefixed prerequisite IDs do not renumber the T001–T054 task sequence;
they form the mandatory entry dependency for T001.

- [X] A000 Audit all Core Platform shell components in `apps/core-platform/components/`, `apps/core-platform/app/dashboard/layout.tsx`, and `packages/ui/src/`; classify every component as Keep, Improve, Reconcile, Legacy-compatible, Remove later, or Missing, and record the Component Compatibility Map in `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Review scope**: Active shell/layout, sidebar/navigation, topbar controls, ContextSwitcher,
    profile, notifications, locale/theme, loading/state presentation, deprecated/legacy shell
    components, and relevant `@nexoraxs/ui` primitives.
  - **Required evidence**: Current consumers, source ownership, existing behavior, reuse decision,
    required bounded improvement, compatibility constraints, and evidence for any Remove later or
    Missing classification; use `BLOCKED` only as a gate result, never as a classification.
  - **Deliverable**: Approved **Component Compatibility Map**.

- [X] A001 Audit every existing Core Platform screen in `apps/core-platform/app/` and record the Screen Compatibility Map in `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Review scope**: `/`, all authentication/verification/recovery/onboarding screens, the
    dashboard guard/layout, all six current dashboard destinations, and currently missing
    shell-level presentation-state surfaces.
  - **Required evidence per screen**: Purpose, Current Status, Reuse Decision, Required
    Improvements, and Blocked Areas.
  - **Deliverable**: Approved **Screen Compatibility Map**.

- [X] A002 Audit every existing Core Platform route and transition in `apps/core-platform/app/`, `apps/core-platform/app/dashboard/layout.tsx`, and `apps/core-platform/lib/store/AppProvider.tsx`; record the Route Compatibility Matrix in `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Review scope**: Current routes, redirects, aliases, authentication/onboarding transitions,
    compatibility behavior, existing destinations, and explicitly forbidden route changes.
  - **Required evidence**: Source route, trigger/precondition, current destination/outcome, alias or
    redirect status, protected compatibility behavior, and forbidden change.
  - **Deliverable**: Approved **Route Compatibility Matrix**.

- [X] A003 Audit current providers and frontend state in `apps/core-platform/lib/store/AppProvider.tsx`, `apps/core-platform/lib/core-session.ts`, `apps/core-platform/lib/core-theme.ts`, `apps/core-platform/lib/locale.ts`, `packages/shared/src/mock-db/schema.ts`, and `packages/shared/src/mock-db/storage.ts`; record the State Compatibility Report in `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Review scope**: Current providers, context, page-facing `useApp`, storage keys, current
    session model, theme, locale, and current mock state.
  - **Required evidence**: State owner/source, readers/writers, current values and side effects,
    persistence scope, compatibility constraint, stale/invalid behavior, and items that must remain
    untouched.
  - **Deliverable**: Approved **State Compatibility Report**.

- [X] A004 Audit existing mock repositories, storage, seed IDs, entity relationships, and compatibility behavior in `packages/shared/src/mock-db/`, `apps/core-platform/lib/store/AppProvider.tsx`, and `tests/e2e/`; record the Mock Compatibility Report in `specs/050-core-shell-stabilization/evidence/characterization.md` without creating a Repository Pattern or changing mock data.
  - **Review scope**: Current mock repositories/facades where present, browser storage, session
    state, seeded identifiers, Workspace/legacy BusinessUnit/Branch/OS relationships, Commerce
    projections consumed by Core, and deprecated compatibility data.
  - **Required evidence**: Mock owner, source file, key/ID/relationship, current consumer, read/write
    behavior, compatibility requirement, prohibited mutation, and known limitation.
  - **Deliverable**: Approved **Mock Compatibility Report**.

- [X] A005 Audit package reuse and boundaries in `packages/ui/`, `packages/shared/`, `packages/types/`, `packages/auth/`, `packages/sdk/`, `package.json`, and `pnpm-workspace.yaml`; record the Package Reuse Map in `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Review scope**: Shared presentation primitives, shared utilities, types, auth helpers, SDK
    clients, current Core imports/consumers, and packages that Feature 050 must leave untouched.
    `packages/auth/` and `packages/sdk/` are currently absent; record that absence and do not create
    either package for Feature 050.
  - **Required evidence**: Package/file, current responsibility, current Core consumer, reuse
    decision, permitted bounded use, forbidden use, and reason a new shared or app-local component
    is or is not required.
  - **Deliverable**: Approved **Package Reuse Map**.

### Phase 0 Compatibility Gate

Implementation MUST NOT begin until all approvals are recorded:

- [X] Component Audit approved.
- [X] Screen Audit approved.
- [X] Routing Audit approved.
- [X] State Audit approved.
- [X] Mock Audit approved.
- [X] Package Audit approved.

**Required approver**: The Product Owner approves all six maps and the final Compatibility Gate.
The Architecture Owner countersigns any Blocked boundary or ownership finding. Design and
Accessibility reviewers review the Component and Screen Compatibility Maps.

**Approval record location**: `specs/050-core-shell-stabilization/evidence/characterization.md`,
section `Phase 0 Approval Record`, containing approver role/name, decision (`APPROVED` or `BLOCKED`),
date, evidence revision, and comments.

**Blocked state**: Any incomplete audit, unknown live consumer, unresolved source/authority conflict,
missing compatibility evidence, or requested forbidden change records `BLOCKED` and prevents all
T001–T054 work.

**Approval criteria**: A000–A005 are complete; every item uses the official vocabulary; routes,
redirects, aliases, storage keys, seeded IDs, `useApp`, mock relationships, package boundaries, and
new-component evidence are source-verified; no architecture or compatibility invariant is weakened;
all reviewer comments are resolved or explicitly Blocked.

The six approved deliverables together form the **Feature 050 Compatibility Map** and become the
authoritative implementation reference for all T001–T054 work, subordinate to the approved
`spec.md`, `plan.md`, contracts, Architecture Freeze, Accepted ADRs, Constitution, AGENTS.md, and
repository governance. Any conflict is classified Blocked
and stops the affected work; the Compatibility Map cannot authorize redesign, replacement,
migration, route/storage/ID changes, ownership transfer, or another forbidden scope expansion.

**Phase 0 checkpoint**: Existing screens, routes, components, state, mocks, and packages are
source-verified; reuse and compatibility decisions are approved; no implementation code has
changed.

---

## Phase A — Characterization, Inventories, and Baselines

**Purpose**: Freeze current compatibility behavior and defects before changing product code. Phase
A changes only test infrastructure and implementation evidence.

- [X] T001 Establish the pre-implementation approval and Constitution gate in `specs/050-core-shell-stabilization/spec.md`, `specs/050-core-shell-stabilization/plan.md`, and `specs/050-core-shell-stabilization/evidence/characterization.md`; verify the approved scope is still DP-050-01 Proposal A and stop if the feature remains unapproved or any Constitution item is BLOCKED.
  - **Dependencies**: A000–A005 complete and the Phase 0 Compatibility Gate approved.
  - **Exact files**: `specs/050-core-shell-stabilization/spec.md`, `specs/050-core-shell-stabilization/plan.md`, `specs/050-core-shell-stabilization/evidence/characterization.md` (created in Phase 0; extend without recreating or replacing the approved maps).
  - **Validation**: Record approval evidence, controlling Freeze/ADR references, owner/write boundary, compatibility invariants, and every Constitution item as PASS or N/A with reason; no BLOCKED item may be bypassed.
  - **Rollback**: Remove only an incorrect gate record; preserve approval history and do not alter the approved design direction.
  - **Risk**: High — beginning implementation without the gate would violate governance.
  - **Priority**: P0.
  - **Estimated complexity**: S.
  - **Expected output**: A dated, reviewable implementation-entry decision with explicit stop conditions.
  - **Evidence**: Pre-implementation section in `evidence/characterization.md` linked to the governing sources.

- [X] T002 [P] Configure an isolated Core Playwright harness and test-only Axe dependency in `playwright.core.config.ts`, `package.json`, and `pnpm-lock.yaml` without modifying `playwright.config.ts` or Commerce test behavior.
  - **Dependencies**: T001.
  - **Exact files**: `playwright.core.config.ts` (new), `package.json`, `pnpm-lock.yaml`; read-only comparison with `playwright.config.ts`.
  - **Validation**: List the Core tests with port 3001, one worker for measurements, Chromium, no `slowMo`, and no runtime dependency addition; list the existing Commerce test with its original config.
  - **Rollback**: Revert only the Core config and test-only dependency entries; leave the existing Playwright/Commerce configuration unchanged.
  - **Risk**: Medium — config inheritance or lockfile drift could change unrelated test execution.
  - **Priority**: P0.
  - **Estimated complexity**: M.
  - **Expected output**: A dedicated, deterministic Core test entry point that does not alter application behavior.
  - **Evidence**: Successful Core and Commerce `--list` output captured as the task execution artifact and consolidated by T009.

- [X] T003 Build deterministic compatible browser-state fixtures in `tests/e2e/fixtures/core-050.ts` for valid, missing, malformed, stale, cross-scope, onboarding-incomplete, empty, and populated shell scenarios while preserving every current key and seeded identifier.
  - **Dependencies**: T002.
  - **Exact files**: `tests/e2e/fixtures/core-050.ts` (new), with read-only reference to `packages/shared/src/mock-db/schema.ts` and `packages/shared/src/mock-db/storage.ts`.
  - **Validation**: Snapshot fixture keys/IDs before and after setup; prove fixtures use only isolated Playwright contexts and include Workspace, legacy BusinessUnit, Branch, actor, subscription, and OS inputs where applicable.
  - **Rollback**: Remove the fixture file if it mutates non-test state; do not modify production seeds or normalize compatibility data.
  - **Risk**: High — a bad fixture could conceal storage or scope regressions.
  - **Priority**: P0.
  - **Estimated complexity**: L.
  - **Expected output**: Reusable deterministic fixtures covering all approved compatibility states without creating canonical Business data.
  - **Evidence**: Fixture self-checks and key/ID snapshots in `tests/e2e/fixtures/core-050.ts`.

- [X] T004 [P] Validate and freeze the approved Phase 0 Component Compatibility Map, Screen Compatibility Map, and Package Reuse Map against live source in `specs/050-core-shell-stabilization/evidence/characterization.md` without repeating, redefining, replacing, or deleting the approved audit results.
  - **Dependencies**: T001.
  - **Exact files**: `apps/core-platform/app/layout.tsx`, `apps/core-platform/app/page.tsx`, `apps/core-platform/app/login/page.tsx`, `apps/core-platform/app/register/page.tsx`, `apps/core-platform/app/forgot-password/page.tsx`, `apps/core-platform/app/reset-password/page.tsx`, `apps/core-platform/app/verify/page.tsx`, `apps/core-platform/app/verify-email/page.tsx`, `apps/core-platform/app/welcome/page.tsx`, `apps/core-platform/app/onboarding/page.tsx`, `apps/core-platform/app/dashboard/layout.tsx`, `apps/core-platform/app/dashboard/page.tsx`, `apps/core-platform/app/dashboard/apps/page.tsx`, `apps/core-platform/app/dashboard/billing/page.tsx`, `apps/core-platform/app/dashboard/team/page.tsx`, `apps/core-platform/app/dashboard/integrations/page.tsx`, `apps/core-platform/app/dashboard/settings/page.tsx`, `apps/core-platform/components/auth/AuthShell.tsx`, `apps/core-platform/components/shell/CoreShell.tsx`, `apps/core-platform/components/shell/Shell.tsx`, `apps/core-platform/components/shell/ContextSwitcher.tsx`, `apps/core-platform/components/dashboard/NotificationsDropdown.tsx`, `apps/core-platform/components/dashboard/UserMenuDropdown.tsx`, `apps/core-platform/components/dashboard/LocaleToggle.tsx`, `apps/core-platform/components/dashboard/ThemeToggle.tsx`, `apps/core-platform/components/dashboard/Topbar.tsx`, `apps/core-platform/components/dashboard/BranchPill.tsx`, `apps/core-platform/components/dashboard/LanguageSwitcher.tsx`, `apps/core-platform/components/CoreProvider.tsx`, `apps/core-platform/components/dashboard/DashboardOnboardingGuard.tsx`, `apps/core-platform/components/dashboard/EnableModal.tsx`, `apps/core-platform/components/dashboard/InviteUserModal.tsx`, `apps/core-platform/components/onboarding/OnboardingStepper.tsx`, `apps/core-platform/components/onboarding/PhaseStepper.tsx`, `apps/core-platform/components/ui/Toast.tsx`, `apps/core-platform/components/ui/Avatar.tsx`, `apps/core-platform/components/ui/BrandMark.tsx`, `apps/core-platform/lib/locale.ts`, `apps/core-platform/lib/core-theme.ts`, `apps/core-platform/lib/core-session.ts`, `packages/ui/src/branding/NexoraLogo.tsx`, `packages/ui/src/components/Button.tsx`, `packages/ui/src/components/Input.tsx`, `packages/ui/src/components/Card.tsx`, `packages/ui/src/components/Badge.tsx`, `packages/ui/src/components/Icon.tsx`, `packages/ui/src/components/Logo.tsx`, `packages/ui/src/index.ts`, `packages/ui/src/styles/core-theme.css`, `specs/050-core-shell-stabilization/plan.md`, `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Validation**: Confirm every Phase 0 map entry still resolves to its cited source/consumer, uses Keep/Improve/Reconcile/Legacy-compatible/Remove later/Missing, preserves the approved treatment, and contains evidence for either justified new component; record source drift as BLOCKED rather than creating a second inventory.
  - **Rollback**: Correct or re-approve the affected Phase 0 map entry with dated evidence; do not create a competing classification register or use validation to rename, revive, remove, move, or duplicate a component.
  - **Risk**: Medium — duplicating or silently diverging from the approved maps could authorize accidental replacement or miss a live compatibility consumer.
  - **Priority**: P0.
  - **Estimated complexity**: L.
  - **Expected output**: A dated Phase A validation record that freezes the approved Compatibility Map as the implementation baseline and reports any drift as BLOCKED.
  - **Evidence**: Map-validation and consumer-search commands appended to `evidence/characterization.md` without recreating its Phase 0 sections.

- [X] T005 [US1] Add failing-first characterization for current routes, authentication/onboarding redirects, dashboard readiness, context persistence, `useApp` outcomes, storage keys, and seeded IDs in `tests/e2e/core-050-shell.spec.ts` using `tests/e2e/fixtures/core-050.ts`.
  - **Dependencies**: T003, T004.
  - **Exact files**: `tests/e2e/core-050-shell.spec.ts` (new), `tests/e2e/fixtures/core-050.ts`.
  - **Validation**: Run only the characterization group and confirm all observed current outcomes are asserted, including `/`, auth aliases, reset flow, welcome/onboarding, all six dashboard destinations, and valid/stale context behavior; document known defects rather than silently fixing assertions.
  - **Rollback**: Revert an incorrect assertion to the last observed behavior; never alter product code to make the baseline green.
  - **Risk**: High — weak assertions would fail to protect the compatibility contract.
  - **Priority**: P0.
  - **Estimated complexity**: L.
  - **Expected output**: A repeatable route/redirect/context/storage characterization suite.
  - **Evidence**: Named Playwright tests plus before/after storage snapshots in `tests/e2e/core-050-shell.spec.ts`.

- [X] T006 [US6] Extend characterization in `tests/e2e/core-050-shell.spec.ts` for the existing sidebar order, topbar placement, unavailable search entry, notification projection/order/indicator, profile destinations/logout, locale/theme persistence, and mobile drawer behavior.
  - **Dependencies**: T005.
  - **Exact files**: `tests/e2e/core-050-shell.spec.ts`, `tests/e2e/fixtures/core-050.ts`.
  - **Validation**: Run the control-baseline group in populated/empty fixtures and prove exact destinations, labels, values, keys, notification outcomes, and current drawer close paths are captured before improvement.
  - **Rollback**: Remove only assertions disproven by source/runtime evidence; retain current defects as explicit baseline observations.
  - **Risk**: High — control parity is the main defense against an unauthorized redesign.
  - **Priority**: P0.
  - **Estimated complexity**: L.
  - **Expected output**: Reviewable baseline tests for every existing shell entry point and compatibility effect.
  - **Evidence**: Control outcome snapshots and test names in `tests/e2e/core-050-shell.spec.ts`.

- [X] T007 [US4] Extend the Phase A suite in `tests/e2e/core-050-shell.spec.ts` with accessibility, keyboard, English LTR, Arabic RTL, light/dark, reduced-motion, and responsive baseline observations at 375, 768, 879, 881, 1024, and 1440 pixels.
  - **Dependencies**: T006.
  - **Exact files**: `tests/e2e/core-050-shell.spec.ts`, `tests/e2e/fixtures/core-050.ts`, `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Validation**: Run Axe and targeted keyboard/viewport checks; distinguish known baseline violations from test infrastructure failures and record horizontal overflow, landmark, name/state, focus, direction, contrast, and motion findings.
  - **Rollback**: Revert only invalid test logic or measurements; never suppress an accessibility finding to pass the baseline.
  - **Risk**: Medium — automated checks alone can produce false confidence, so manual gaps must be explicit.
  - **Priority**: P0.
  - **Estimated complexity**: L.
  - **Expected output**: A reproducible accessibility/localization/responsive defect baseline.
  - **Evidence**: Axe results, keyboard observations, and viewport findings linked from `evidence/characterization.md`.

- [X] T008 [P] Create the local comparative performance sampler in `tests/e2e/core-050-performance.spec.ts` and baseline schema in `specs/050-core-shell-stabilization/evidence/performance-baseline.json` for hydration/readiness, drawer open/close, menu open, locale switch, theme switch, and route readiness.
  - **Dependencies**: T003.
  - **Exact files**: `tests/e2e/core-050-performance.spec.ts` (new), `tests/e2e/fixtures/core-050.ts`, `specs/050-core-shell-stabilization/evidence/performance-baseline.json` (new).
  - **Validation**: Use the same local production build, Chromium, machine, fixture, viewport, warm-up, and at least ten samples per measure; store raw samples, median, environment, Git revision, and method limitations without inventing a production SLO.
  - **Rollback**: Remove noisy or invalid samples and rerun under documented comparable conditions; do not loosen the approved relative gate.
  - **Risk**: High — timing noise or differing environments can create misleading regressions.
  - **Priority**: P0.
  - **Estimated complexity**: L.
  - **Expected output**: A repeatable local sampler and raw reference dataset for all six approved measures.
  - **Evidence**: `performance-baseline.json` with raw samples and documented measurement metadata.

- [X] T009 Execute and review the complete Phase A baseline using `playwright.core.config.ts`, then finalize `specs/050-core-shell-stabilization/evidence/characterization.md` and `specs/050-core-shell-stabilization/evidence/performance-baseline.json` before any product source changes.
  - **Dependencies**: T005, T006, T007, T008.
  - **Exact files**: `playwright.core.config.ts`, `tests/e2e/core-050-shell.spec.ts`, `tests/e2e/core-050-performance.spec.ts`, `specs/050-core-shell-stabilization/evidence/characterization.md`, `specs/050-core-shell-stabilization/evidence/performance-baseline.json`.
  - **Validation**: Re-run from a clean local build, confirm current defects are tagged as baseline rather than treated as implementation passes, and obtain review sign-off that routes, keys, IDs, control outcomes, inventories, accessibility, direction, and timings are protected.
  - **Rollback**: Discard only invalid evidence and rerun; do not proceed to T010 while any protected behavior lacks characterization.
  - **Risk**: High — all later rollback and regression decisions rely on this evidence.
  - **Priority**: P0.
  - **Estimated complexity**: M.
  - **Expected output**: Signed Phase A checkpoint establishing the immutable comparison baseline.
  - **Evidence**: Completed Phase A checklist and command/results log in `evidence/characterization.md`.

**Phase A checkpoint**: No product behavior has changed. All protected behavior, existing defects,
inventories, reuse decisions, and comparative measurements are reviewable.

---

## Phase B — Accessibility and Semantic Stabilization

**Purpose**: Improve semantics and non-drawer focus behavior in place without changing control
placement, route order, or visible outcomes.

- [X] T010 [US1] Add failing-first assertions in `tests/e2e/core-050-shell.spec.ts` for one primary `main`, semantic header/navigation regions, a skip link, localized navigation labels, logical page heading flow, and `aria-current` on every existing dashboard destination.
  - **Dependencies**: T009.
  - **Exact files**: `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Confirm the new assertions fail against the Phase A product baseline for the intended missing semantics and do not expect breadcrumbs, new routes, or reordered navigation.
  - **Rollback**: Revert only assertions that exceed FR-010, FR-014, FR-015, or FR-045; keep valid accessibility failures visible.
  - **Risk**: Medium — incorrect landmark expectations can create duplicate or invalid semantics.
  - **Priority**: P1.
  - **Estimated complexity**: M.
  - **Expected output**: Failing tests that precisely define the approved semantic delta.
  - **Evidence**: Recorded pre-change failure names and locators in the test review.

- [X] T011 [US4] Add failing-first assertions in `tests/e2e/core-050-shell.spec.ts` for programmatic names, roles, expanded/pressed states, popup ownership, Escape dismissal, focus restoration, a minimum 44 by 44 CSS-pixel activation area for primary shell controls at 375px/768px, and visible focus for `ContextSwitcher`, notifications, profile, locale, and theme controls.
  - **Dependencies**: T010.
  - **Exact files**: `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Confirm failures isolate missing semantics/focus behavior while preserving current labels, control order, destinations, and storage outcomes.
  - **Rollback**: Remove only an expectation unsupported by native/ARIA semantics; do not accept a color-only or pointer-only interaction.
  - **Risk**: Medium — conflicting ARIA and native semantics can reduce assistive-technology quality.
  - **Priority**: P1.
  - **Estimated complexity**: M.
  - **Expected output**: A failing-first interaction contract for every existing non-drawer shell control.
  - **Evidence**: Named test failures and keyboard focus traces in `tests/e2e/core-050-shell.spec.ts`.

- [X] T012 [P] [US1] Improve `apps/core-platform/components/shell/Shell.tsx` in place with semantic header/navigation/main regions, a keyboard-visible skip link, stable main/nav IDs, typed navigation icons, and `aria-current` while preserving the existing five-item order, `/dashboard` behavior, topbar/sidebar structure, and control placement.
  - **Dependencies**: T011.
  - **Exact files**: `apps/core-platform/components/shell/Shell.tsx`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Make T010 pass; rerun route/order characterization and inspect the accessibility tree in English and Arabic.
  - **Rollback**: Revert the bounded semantic markup as a unit while retaining Phase A tests; never add breadcrumbs or a replacement navigation component.
  - **Risk**: High — landmark or active-route logic can affect every dashboard page.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: The current shell structure with correct landmarks, skip behavior, and destination state semantics.
  - **Evidence**: Passing T010 assertions and unchanged route/order snapshots.

- [X] T013 [US4] Improve `apps/core-platform/components/shell/ContextSwitcher.tsx` in place with localized names, popup state/ownership, keyboard dismissal, and focus restoration without exposing Business, Business Unit, or Branch in the global Core shell.
  - **Dependencies**: T012.
  - **Exact files**: `apps/core-platform/components/shell/ContextSwitcher.tsx`, `packages/shared/src/mock-db/schema.ts`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Make the ContextSwitcher portion of T011 pass in EN/AR and verify the same Workspace value and no new selector/options/storage writes.
  - **Rollback**: Revert only the popup semantic/focus changes; retain the current Workspace-only presentation and storage state.
  - **Risk**: High — scope leakage could imply an unauthorized canonical organization model.
  - **Priority**: P1.
  - **Estimated complexity**: M.
  - **Expected output**: An accessible Workspace-only context popup with behaviorally identical compatibility outcomes.
  - **Evidence**: Passing keyboard/name/state assertions and storage snapshots.

- [X] T014 [US4] Improve ARIA state, popup relationships, Escape/outside dismissal, and opener focus restoration in `apps/core-platform/components/dashboard/NotificationsDropdown.tsx`, `apps/core-platform/components/dashboard/UserMenuDropdown.tsx`, `apps/core-platform/components/dashboard/LocaleToggle.tsx`, and `apps/core-platform/components/dashboard/ThemeToggle.tsx` without changing their data sources or outcomes yet.
  - **Dependencies**: T013.
  - **Exact files**: `apps/core-platform/components/dashboard/NotificationsDropdown.tsx`, `apps/core-platform/components/dashboard/UserMenuDropdown.tsx`, `apps/core-platform/components/dashboard/LocaleToggle.tsx`, `apps/core-platform/components/dashboard/ThemeToggle.tsx`, `packages/shared/src/mock-db/schema.ts`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Make the corresponding T011 assertions pass and rerun Phase A notification/profile/locale/theme parity tests.
  - **Rollback**: Revert each control independently to its characterized implementation; preserve destinations, logout, notification ordering, and preference keys.
  - **Risk**: Medium — popup focus changes can break pointer behavior or existing actions.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: Accessible existing controls with deterministic non-drawer focus behavior and unchanged outcomes.
  - **Evidence**: Passing popup keyboard/focus tests plus outcome and key parity assertions.

- [X] T015 [P] [US4] Add scoped focus-visible, skip-link, semantic state, and minimum 44 by 44 CSS-pixel primary-control activation-area styles in `packages/ui/src/styles/core-theme.css` without redesigning tokens, typography, palette, or component placement.
  - **Dependencies**: T011.
  - **Exact files**: `packages/ui/src/styles/core-theme.css`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Inspect light/dark and LTR/RTL focus indicators, test 200% zoom, verify every primary shell control is at least 44 by 44 CSS pixels at 375px/768px, and build all current `@nexoraxs/ui` consumers.
  - **Rollback**: Revert only scoped `.nx-app-root` rules that regress a consumer; do not alter global tokens or remove visible focus.
  - **Risk**: Medium — shared CSS can affect Core and Commerce consumers.
  - **Priority**: P2.
  - **Estimated complexity**: M.
  - **Expected output**: Theme-safe, direction-safe visible focus and activation sizing using existing visual patterns.
  - **Evidence**: Passing focus/touch assertions and consumer build results.

- [X] T016 Run the Phase B semantic/accessibility checkpoint and append results to `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Dependencies**: T012, T013, T014, T015.
  - **Exact files**: `tests/e2e/core-050-shell.spec.ts`, `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Validation**: Run the Phase A parity suite, T010/T011, Axe, and manual landmark/name/order/focus checks in EN/AR and both themes; verify no route, storage, or seeded-ID diff.
  - **Rollback**: Roll back only the failing Phase B component/style unit and rerun the checkpoint; retain the failing evidence until corrected.
  - **Risk**: High — incomplete validation could carry a global focus regression into drawer work.
  - **Priority**: P0.
  - **Estimated complexity**: M.
  - **Expected output**: A reviewed PASS checkpoint for semantic stabilization with compatibility intact.
  - **Evidence**: Phase B command log, Axe summary, and manual findings in `evidence/characterization.md`.

**Phase B checkpoint**: US1 semantic navigation is independently testable, and existing controls
have accessible names/states/focus without any material layout change.

---

## Phase C — Responsive Shell Stabilization

**Purpose**: Stabilize the existing sidebar/mobile drawer across compact, tablet, desktop, and wide
desktop layouts without replacing the current shell.

- [X] T017 [US3] Add failing-first responsive drawer tests in `tests/e2e/core-050-shell.spec.ts` for logical-start opening, expanded/controlled state, modal focus containment only at compact widths, explicit close/link/Escape/scrim/history/breakpoint closure, focus restoration, background interaction blocking, topbar reachability, and overflow at 375, 768, 879, 881, 1024, and 1440 pixels.
  - **Dependencies**: T016.
  - **Exact files**: `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Observe the intended failures against Phase B and confirm the test retains existing 880 px behavior, sidebar items, topbar order, and route URLs.
  - **Rollback**: Remove only an expectation outside the drawer contract; keep focus, overflow, and reachability failures visible.
  - **Risk**: High — responsive tests can be flaky if they rely on animation timing instead of state.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: A deterministic failing-first contract for mobile, tablet, and desktop shell behavior.
  - **Evidence**: Named viewport/focus test failures in `tests/e2e/core-050-shell.spec.ts`.

- [X] T018 [US3] Stabilize existing drawer state and focus logic in `apps/core-platform/components/shell/Shell.tsx`, including close control, Escape, scrim, route/history, breakpoint transitions, body/background interaction, focus containment, and opener restoration without creating a new drawer/sidebar component.
  - **Dependencies**: T017.
  - **Exact files**: `apps/core-platform/components/shell/Shell.tsx`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Make drawer state/focus assertions pass with keyboard and touch in LTR/RTL; verify no focus lock, body lock, or inert state remains after close/navigation/resize.
  - **Rollback**: Revert drawer JavaScript as one unit to the characterized class-toggle behavior while retaining valid trigger semantics; clear any active lock on rollback.
  - **Risk**: High — trapped focus or persistent inert/body lock can make the application unusable.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: Deterministic, focus-safe behavior for the existing responsive drawer.
  - **Evidence**: Passing drawer lifecycle/focus assertions at all boundary widths.

- [X] T019 [US3] Stabilize existing sidebar, scrim, topbar, and compact-control CSS in `packages/ui/src/styles/core-theme.css` for phone, tablet, desktop, and wide desktop widths while preserving logical direction, control order, current visual patterns, and the 880 px breakpoint contract.
  - **Dependencies**: T018.
  - **Exact files**: `packages/ui/src/styles/core-theme.css`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Make overflow/reachability assertions pass at 375, 768, 879, 881, 1024, and 1440 in EN/AR, light/dark, touch, keyboard, 200% zoom, and with the drawer open during a breakpoint change.
  - **Rollback**: Revert drawer and compact CSS together to the Phase B snapshot; do not relocate, hide, regroup, or reorder a critical control to fix overflow.
  - **Risk**: High — compact styling can make controls unreachable or invert RTL motion.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: The same shell composition usable without horizontal page overflow across the required widths.
  - **Evidence**: Passing viewport matrix tests and annotated screenshots/measurements referenced from `evidence/characterization.md`.

- [X] T020 Run the Phase C responsive/focus checkpoint and record drawer open/close feedback samples and rollback observations in `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Dependencies**: T019.
  - **Exact files**: `tests/e2e/core-050-shell.spec.ts`, `tests/e2e/core-050-performance.spec.ts`, `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Validation**: Run the full drawer matrix and Phase A/B regressions; verify visible local feedback is within 100 ms where measurable and no changed shell route exceeds its baseline gate.
  - **Rollback**: Restore the Phase B Shell/CSS pair if focus, overflow, or timing cannot be corrected within scope.
  - **Risk**: High — drawer regressions affect every compact-width route.
  - **Priority**: P0.
  - **Estimated complexity**: M.
  - **Expected output**: A reviewed PASS checkpoint for US3 with a proven bounded rollback.
  - **Evidence**: Phase C results and samples in `evidence/characterization.md`.

**Phase C checkpoint**: US3 is independently usable and testable at all required widths without a
sidebar/topbar replacement.

---

## Phase D — Workspace Context Stabilization

**Purpose**: Add the minimum read-only presentation/context seam for Workspace validation and safe
recovery while quarantining legacy BusinessUnit-as-Business compatibility.

- [X] T021 [US2] Add failing-first context contract scenarios in `tests/e2e/core-050-shell.spec.ts` and `tests/e2e/fixtures/core-050.ts` for valid, missing, malformed, stale, cross-Workspace, BusinessUnit/Branch mismatch, true incomplete onboarding, and completed-but-stale onboarding states.
  - **Dependencies**: T020.
  - **Exact files**: `tests/e2e/core-050-shell.spec.ts`, `tests/e2e/fixtures/core-050.ts`.
  - **Validation**: Confirm failures express the statuses and invariants in `contracts/shell-presentation-contracts.md`: no silent selection, no cross-scope disclosure, no key/ID rewrite, no inferred Business, and unchanged `useApp`/`setCurrent` behavior.
  - **Rollback**: Revert only scenarios inconsistent with current data relationships or the approved contract; do not relax cross-scope rejection.
  - **Risk**: High — incorrect context tests can normalize an architecture conflict or disclose foreign records.
  - **Priority**: P0.
  - **Estimated complexity**: L.
  - **Expected output**: A failing-first executable context-validation contract covering every approved status.
  - **Evidence**: Named fixture/status tests and before/after storage snapshots.

- [X] T022 [US2] Define only the approved shell presentation/context types in `apps/core-platform/lib/shell/contracts.ts`, including navigation/search presentation, `ShellContextSnapshot`, validation results, legacy Business context annotation, notification presentation, shell states, preferences, and transient surface state.
  - **Dependencies**: T021.
  - **Exact files**: `apps/core-platform/lib/shell/contracts.ts` (new), `specs/050-core-shell-stabilization/data-model.md`, `specs/050-core-shell-stabilization/contracts/shell-presentation-contracts.md`.
  - **Validation**: Type-check strict TypeScript; review that types are presentation-only, app-local, additive, storage-agnostic, and contain no Repository, backend, canonical Business migration, authorization proof, or Commerce write API.
  - **Rollback**: Remove the unused type file if it cannot stay bounded; do not move it to `packages/types`, `packages/sdk`, or `packages/shared`.
  - **Risk**: Medium — overly broad types could become a speculative abstraction.
  - **Priority**: P1.
  - **Estimated complexity**: M.
  - **Expected output**: A minimal typed vocabulary matching the approved data model and contracts.
  - **Evidence**: Type-check output and contract-to-type review notes.

- [X] T023 [US2] Implement the pure read-only context evaluator in `apps/core-platform/lib/shell/presentation.ts` using the current Workspace, legacy BusinessUnit, and Branch relationships without importing storage, rewriting identifiers, selecting fallbacks, or creating canonical Business data.
  - **Dependencies**: T022.
  - **Exact files**: `apps/core-platform/lib/shell/presentation.ts` (new), `apps/core-platform/lib/shell/contracts.ts`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Make the pure/status portions of T021 pass for every tuple; prove deterministic output and zero storage/Commerce writes with before/after snapshots and source scans.
  - **Rollback**: Remove the evaluator and return to Phase C pass-through display; preserve fixtures and failing contract evidence for correction.
  - **Risk**: High — fallback or ancestry mistakes could expose or silently select unrelated scope.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: A deterministic, side-effect-free compatibility evaluator for shell presentation only.
  - **Evidence**: Passing status matrix and zero-write assertions.

- [X] T024 [US2] Add the narrow `useShellPresentation` adapter in `apps/core-platform/lib/shell/useShellPresentation.ts` and only the minimum additive read-only snapshot exposure in `apps/core-platform/lib/store/AppProvider.tsx`, leaving all existing page-facing `useApp` fields, `setCurrent` behavior, storage effects, and consumers intact.
  - **Dependencies**: T023.
  - **Exact files**: `apps/core-platform/lib/shell/useShellPresentation.ts` (new), `apps/core-platform/lib/store/AppProvider.tsx`, `apps/core-platform/lib/shell/contracts.ts`, `apps/core-platform/lib/shell/presentation.ts`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Type-check current consumers, run route/context characterization, inspect rerenders, and prove no leaf dashboard page import or behavior must change to adopt the shell seam.
  - **Rollback**: Remove the additive adapter/snapshot and restore the exact prior provider interface; retain pure evaluator tests and do not change storage.
  - **Risk**: High — provider changes can cause hydration loops or broad rerenders.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: A bounded shell-only facade over current `useApp` data with behavioral compatibility.
  - **Evidence**: Existing consumer type/build pass, rerender observation, and storage parity tests.

- [X] T025 [US2] Wrap `apps/core-platform/components/shell/ContextSwitcher.tsx` with the validated read-only shell presentation seam while preserving Workspace-only global presentation and the dormant legacy commerce-mode compatibility branch without expanding or removing it.
  - **Dependencies**: T024.
  - **Exact files**: `apps/core-platform/components/shell/ContextSwitcher.tsx`, `apps/core-platform/lib/shell/useShellPresentation.ts`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Pass valid/stale/malformed/cross-scope tests and confirm no global Business/Business Unit/Branch selector, no record disclosure, no storage rewrite, and unchanged valid Workspace display.
  - **Rollback**: Switch ContextSwitcher back to characterized `useApp` pass-through as one bounded change; keep provider state and storage untouched.
  - **Risk**: High — context presentation errors can be mistaken for authorization or canonical identity.
  - **Priority**: P1.
  - **Estimated complexity**: M.
  - **Expected output**: Existing context UI backed by validated read-only presentation state.
  - **Evidence**: Passing context UI/status tests and zero-storage-diff snapshots.

- [X] T026 [US5] Create the minimal `apps/core-platform/components/shell/ShellStateNotice.tsx` and integrate safe localized invalid-context recovery in `apps/core-platform/app/dashboard/layout.tsx` without changing true auth/onboarding redirects, clearing state, creating records, or simulating backend authorization.
  - **Dependencies**: T025.
  - **Exact files**: `apps/core-platform/components/shell/ShellStateNotice.tsx` (new), `apps/core-platform/app/dashboard/layout.tsx`, `apps/core-platform/lib/shell/contracts.ts`, `apps/core-platform/lib/shell/useShellPresentation.ts`, `packages/shared/src/mock-db/schema.ts`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Pass incomplete-onboarding redirect and completed-but-stale recovery scenarios; verify localized semantic status, safe Core navigation/retry, no foreign names, and byte-equivalent storage before/after recovery reads.
  - **Rollback**: Revert layout/context notice integration to the Phase C guard while leaving all stored data untouched; do not convert stale context into onboarding migration.
  - **Risk**: High — guard changes can cause redirect loops, data loss, or misleading authorization claims.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: Honest read-only context recovery that preserves every valid legacy journey.
  - **Evidence**: Passing guard/recovery tests, accessibility assertions, and storage snapshots.

- [X] T027 Run the Phase D context/compatibility checkpoint and record BusinessUnit-as-Business, Branch-validation, stale recovery, and provider-compatibility results in `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Dependencies**: T026.
  - **Exact files**: `tests/e2e/core-050-shell.spec.ts`, `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Validation**: Run every context tuple plus all route/redirect/key/ID tests, source-scan for canonical Business additions and Commerce writes, and verify existing leaf `useApp` behavior.
  - **Rollback**: Revert T025–T026 integration to the Phase C checkpoint if any compatibility invariant fails; retain the pure seam only if it remains unused and fully bounded.
  - **Risk**: High — this is the main architecture/compatibility boundary of Feature 050.
  - **Priority**: P0.
  - **Estimated complexity**: M.
  - **Expected output**: A reviewed PASS checkpoint for US2 and its no-migration/no-write guarantees.
  - **Evidence**: Context matrix, boundary scan, and rollback result in `evidence/characterization.md`.

**Phase D checkpoint**: US2 is independently testable. Legacy BusinessUnit and Branch data remains
unchanged, while invalid context receives safe presentation-only recovery.

---

## Phase E — Topbar Stabilization

**Purpose**: Stabilize search, notifications, profile, locale, and theme in their current locations
through the bounded presentation seam.

- [X] T028 [US6] Add failing-first topbar tests in `tests/e2e/core-050-shell.spec.ts` for Core-only search query/results/empty/unavailable/keyboard behavior, exact notification projection parity, profile destinations/logout, popup coordination, and unchanged locale/theme values and storage keys.
  - **Dependencies**: T027.
  - **Exact files**: `tests/e2e/core-050-shell.spec.ts`, `tests/e2e/fixtures/core-050.ts`.
  - **Validation**: Confirm failures describe only the approved bounded improvements and explicitly reject business records, OS operational facts, Marketplace/global/AI content, commands, invented documentation links, new routes, and new storage keys.
  - **Rollback**: Remove only an assertion outside FR-026–FR-040; retain exact parity assertions for notification/profile/preferences.
  - **Risk**: High — search or projection tests can accidentally authorize false capabilities or ownership.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: A failing-first executable contract for all current topbar entry points.
  - **Evidence**: Named search allow/deny, notification parity, profile, locale, and theme test cases.

- [X] T029 [US6] Extend `apps/core-platform/lib/shell/contracts.ts` and `apps/core-platform/lib/shell/presentation.ts` with the approved static destination filter and read-only notification presentation mapping, preserving current notification order/count/indicator and using an empty documentation source because no current shell documentation links exist.
  - **Dependencies**: T028.
  - **Exact files**: `apps/core-platform/lib/shell/contracts.ts`, `apps/core-platform/lib/shell/presentation.ts`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Pass pure allow/deny search cases and exact populated/empty notification fixtures; source-scan for storage writes, API calls, OS imports, commands, AI, records, or repository abstractions.
  - **Rollback**: Remove the search/projection functions and keep the Phase D seam; do not alter source mock collections or notification outcomes.
  - **Risk**: High — the adapter must not become a second canonical notification or Commerce owner.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: Pure, replaceable search and notification presentation functions with no operational write capability.
  - **Evidence**: Passing source-filter and notification parity assertions.

- [X] T030 [US6] Create `apps/core-platform/components/shell/ShellSearch.tsx` in the existing search placement with localized accessible input/combobox semantics, query/result/empty/unavailable states, deterministic keyboard navigation, existing-route navigation only, and no command-palette behavior.
  - **Dependencies**: T029.
  - **Exact files**: `apps/core-platform/components/shell/ShellSearch.tsx` (new), `apps/core-platform/lib/shell/contracts.ts`, `apps/core-platform/lib/shell/useShellPresentation.ts`, `packages/shared/src/mock-db/schema.ts`, `packages/ui/src/styles/core-theme.css`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Pass search query, keyboard, focus restoration, EN/AR, empty/unavailable, allowed-source, disallowed-source, route-existence, and 100 ms visible-feedback assertions.
  - **Rollback**: Remove ShellSearch and restore the characterized unavailable input in the same placement; keep routes and presentation catalog unchanged.
  - **Risk**: High — incorrect semantics or sources could expose excluded data or imply a command palette.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: A single justified Core-local component implementing destination-only search in place.
  - **Evidence**: Passing search interaction/allowlist/performance tests.

- [X] T031 [US6] Reuse the existing `CoreShell` navigation metadata for search and integrate `ShellSearch` in `apps/core-platform/components/shell/CoreShell.tsx` and `apps/core-platform/components/shell/Shell.tsx` without duplicating the sidebar list, changing route order, or relocating a control.
  - **Dependencies**: T030.
  - **Exact files**: `apps/core-platform/components/shell/CoreShell.tsx`, `apps/core-platform/components/shell/Shell.tsx`, `apps/core-platform/components/shell/ShellSearch.tsx`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Assert one route metadata source, exact five-item order, `/dashboard` remains absent from sidebar, every search result targets an existing approved route, and compact topbar reachability remains intact.
  - **Rollback**: Restore CoreShell/Shell to the Phase D input integration and disable ShellSearch without changing metadata or routes.
  - **Risk**: Medium — duplicating metadata could let search and navigation drift.
  - **Priority**: P1.
  - **Estimated complexity**: M.
  - **Expected output**: Search consumes existing navigation presentation data through one bounded reuse path.
  - **Evidence**: Route-source parity test and unchanged navigation snapshots.

- [X] T032 [US6] Wrap `apps/core-platform/components/dashboard/NotificationsDropdown.tsx` with the read-only presentation projection from `apps/core-platform/lib/shell/useShellPresentation.ts` while preserving current visible outcomes, ordering, indicator, empty state, placement, and focus behavior.
  - **Dependencies**: T031.
  - **Exact files**: `apps/core-platform/components/dashboard/NotificationsDropdown.tsx`, `apps/core-platform/lib/shell/useShellPresentation.ts`, `apps/core-platform/lib/shell/presentation.ts`, `packages/shared/src/mock-db/schema.ts`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Pass exact populated/empty fixtures in EN/AR, inspect no Commerce writes or app imports, and confirm notification count/order/dot parity with Phase A.
  - **Rollback**: Switch the dropdown to the prior characterized read-only computation; do not change mock records or UI placement.
  - **Risk**: High — projection drift or ownership leakage violates compatibility and domain boundaries.
  - **Priority**: P1.
  - **Estimated complexity**: M.
  - **Expected output**: Existing notification UI consuming a minimal replaceable read-only presentation seam.
  - **Evidence**: Exact parity assertions and zero-write/source-scan results.

- [X] T033 [US6] Stabilize `apps/core-platform/components/dashboard/UserMenuDropdown.tsx` interaction and compact presentation while preserving Settings, Billing, Team, and sign-out destinations and existing logout behavior.
  - **Dependencies**: T032.
  - **Exact files**: `apps/core-platform/components/dashboard/UserMenuDropdown.tsx`, `packages/shared/src/mock-db/schema.ts`, `packages/ui/src/styles/core-theme.css`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Pass keyboard/pointer dismissal, menu semantics, opener restoration, compact width, destination, and logout redirect/storage characterization in EN/AR.
  - **Rollback**: Revert profile-only changes to the Phase D component; preserve all routes and logout side effects.
  - **Risk**: Medium — a menu change can break sign-out or navigation.
  - **Priority**: P2.
  - **Estimated complexity**: M.
  - **Expected output**: Focus-safe profile behavior with exact existing outcomes.
  - **Evidence**: Passing profile destination/logout/focus tests.

- [X] T034 [US4] Stabilize `apps/core-platform/components/dashboard/LocaleToggle.tsx` and `apps/core-platform/components/dashboard/ThemeToggle.tsx` names, states, focus, compact reachability, and immediate feedback while preserving `nexoraxs.session.locale`, `nexoraxs.ui.theme`, existing values, document language/direction effects, and theme effects.
  - **Dependencies**: T033.
  - **Exact files**: `apps/core-platform/components/dashboard/LocaleToggle.tsx`, `apps/core-platform/components/dashboard/ThemeToggle.tsx`, `packages/shared/src/mock-db/schema.ts`, `packages/ui/src/styles/core-theme.css`, `tests/e2e/core-050-shell.spec.ts`, `tests/e2e/core-050-performance.spec.ts`.
  - **Validation**: Pass EN/AR and light/dark switching, focus retention, exact key/value snapshots, document `lang`/`dir`, visible feedback within 100 ms where measurable, and no deprecated/new key writes.
  - **Rollback**: Revert each toggle independently to its Phase D behavior; preserve stored values and document effects.
  - **Risk**: High — preference-key drift or competing effects can break compatibility across sessions.
  - **Priority**: P1.
  - **Estimated complexity**: M.
  - **Expected output**: Existing locale/theme controls with accessible, responsive behavior and unchanged persistence.
  - **Evidence**: Key/value snapshots and passing locale/theme interaction/performance tests.

- [X] T035 Run the Phase E topbar checkpoint and append search, notification, profile, popup, locale/theme, and local-response evidence to `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Dependencies**: T031, T032, T033, T034.
  - **Exact files**: `tests/e2e/core-050-shell.spec.ts`, `tests/e2e/core-050-performance.spec.ts`, `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Validation**: Run all Phase A–E tests, exact key/destination/projection parity, allowed/disallowed search scans, EN/AR popup review, and 100 ms visible-feedback samples.
  - **Rollback**: Roll back only the failing topbar unit through its documented seam; restore the characterized unavailable search input if search cannot meet scope.
  - **Risk**: High — topbar controls share limited compact space and popup/focus state.
  - **Priority**: P0.
  - **Estimated complexity**: M.
  - **Expected output**: A reviewed PASS checkpoint for US6 and preference behavior with no false capability claims.
  - **Evidence**: Phase E results and bounded rollback references in `evidence/characterization.md`.

**Phase E checkpoint**: US6 is independently testable. Every current topbar entry point retains
placement and outcomes while consuming only approved presentation data.

---

## Phase F — Presentation States

**Purpose**: Complete loading, empty, error, unauthorized, unavailable, recovering, and ready
presentation without inventing backend behavior, writes, or canonical authorization.

- [X] T036 [US5] Add failing-first state fixtures and assertions in `tests/e2e/core-050-shell.spec.ts` for loading, empty, error, unauthorized, unavailable, recovering, ready, retry, non-duplicative announcements, no foreign-record disclosure, and zero-write recovery.
  - **Dependencies**: T035.
  - **Exact files**: `tests/e2e/core-050-shell.spec.ts`, `tests/e2e/fixtures/core-050.ts`.
  - **Validation**: Confirm intended failures against Phase E and verify test copy/statuses do not claim production authorization, backend reachability, or new business outcomes.
  - **Rollback**: Remove only an unsupported simulated state; retain all states required by FR-046–FR-051.
  - **Risk**: High — misleading states can imply authority or operations the frontend does not possess.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: A failing-first, read-only shell presentation-state contract.
  - **Evidence**: Named state/announcement/retry/no-write tests.

- [X] T037 [US5] Complete the presentation-state union in `apps/core-platform/lib/shell/contracts.ts` and the reusable semantic rendering in `apps/core-platform/components/shell/ShellStateNotice.tsx`, with localized title/body/action/status behavior and no domain decisions.
  - **Dependencies**: T036.
  - **Exact files**: `apps/core-platform/lib/shell/contracts.ts`, `apps/core-platform/components/shell/ShellStateNotice.tsx`, `packages/shared/src/mock-db/schema.ts`, `packages/ui/src/styles/core-theme.css`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Pass state distinction, programmatic name/status, announcement, EN/AR, light/dark, reduced-motion, and action-availability assertions.
  - **Rollback**: Revert to the Phase D invalid-context-only notice; preserve safe recovery and do not add state-specific writes.
  - **Risk**: Medium — live-region misuse can duplicate announcements or overwhelm users.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: One justified Core-local state component covering every required presentation status.
  - **Evidence**: Passing semantic/state matrix tests.

- [X] T038 [US5] Integrate named hydration/loading and safe empty/error/unauthorized/unavailable/recovery rendering in `apps/core-platform/app/dashboard/layout.tsx` and `apps/core-platform/components/shell/Shell.tsx` through the existing presentation seam without changing auth/onboarding routes or duplicating retry/write actions.
  - **Dependencies**: T037.
  - **Exact files**: `apps/core-platform/app/dashboard/layout.tsx`, `apps/core-platform/components/shell/Shell.tsx`, `apps/core-platform/components/shell/ShellStateNotice.tsx`, `apps/core-platform/lib/shell/useShellPresentation.ts`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Pass every state fixture, redirect characterization, no-disclosure, zero-write retry, announcement, focus, and theme/direction assertion.
  - **Rollback**: Restore the Phase E layout/Shell rendering while retaining the Phase D safe context notice; never clear stored context as rollback.
  - **Risk**: High — layout state routing can cause loops, blank screens, or duplicate main/status landmarks.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: Honest, accessible shell-level presentation states with read-only recovery.
  - **Evidence**: Passing layout-state and redirect/storage parity tests.

- [X] T039 [US1] Reconcile scroll ownership by removing only the characterized duplicate `.nx-main-scroll` wrappers from the six dashboard pages while preserving page content, width, padding, routes, data, and one primary main landmark.
  - **Dependencies**: T038.
  - **Exact files**: `apps/core-platform/app/dashboard/page.tsx`, `apps/core-platform/app/dashboard/apps/page.tsx`, `apps/core-platform/app/dashboard/billing/page.tsx`, `apps/core-platform/app/dashboard/integrations/page.tsx`, `apps/core-platform/app/dashboard/settings/page.tsx`, `apps/core-platform/app/dashboard/team/page.tsx`, `packages/ui/src/styles/core-theme.css`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Compare each route against Phase A at required widths, 200% zoom, keyboard, and touch; assert one scroll owner/main, equivalent page spacing, reachable content, and unchanged page actions/data.
  - **Rollback**: Restore the wrapper only for a route with a proven layout regression while keeping one main landmark; do not rewrite page composition.
  - **Risk**: High — wrapper removal can change scroll position, sticky behavior, or spacing.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: Six behaviorally equivalent dashboard pages with one shell-owned scrolling region.
  - **Evidence**: Per-route semantic/scroll/visual comparison results.

- [X] T040 Run the Phase F presentation-state and route-layout checkpoint and record results in `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Dependencies**: T039.
  - **Exact files**: `tests/e2e/core-050-shell.spec.ts`, `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Validation**: Execute all state fixtures and every dashboard route in EN/AR, light/dark, compact/desktop, keyboard/touch; verify no storage/domain writes, no disclosure, no duplicate announcements, and no layout regression.
  - **Rollback**: Revert only the failing state integration or route wrapper per T037–T039; retain earlier passing phase checkpoints.
  - **Risk**: High — this phase crosses shell guard and all dashboard route containers.
  - **Priority**: P0.
  - **Estimated complexity**: M.
  - **Expected output**: A reviewed PASS checkpoint for US1 loading/scroll semantics and US5 state/recovery behavior.
  - **Evidence**: State and per-route comparison table in `evidence/characterization.md`.

**Phase F checkpoint**: US5 is independently testable, and US1 now includes named loading and one
usable page scroll/main owner without route or page rewrites.

---

## Phase G — Localization, Direction, Theme, and Motion

**Purpose**: Close bilingual, RTL/LTR, dark-mode, reduced-motion, keyboard, and assistive-technology
gaps across the completed shell behavior.

- [X] T041 [US4] Complete English and Arabic translation coverage for every changed or introduced shell string and accessible name in `packages/shared/src/mock-db/schema.ts` and all affected shell components, preserving user-entered organization names exactly as stored.
  - **Dependencies**: T040.
  - **Exact files**: `packages/shared/src/mock-db/schema.ts`, `apps/core-platform/components/shell/Shell.tsx`, `apps/core-platform/components/shell/ShellSearch.tsx`, `apps/core-platform/components/shell/ShellStateNotice.tsx`, `apps/core-platform/components/shell/ContextSwitcher.tsx`, `apps/core-platform/components/dashboard/NotificationsDropdown.tsx`, `apps/core-platform/components/dashboard/UserMenuDropdown.tsx`, `apps/core-platform/components/dashboard/LocaleToggle.tsx`, `apps/core-platform/components/dashboard/ThemeToggle.tsx`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Assert zero fallback/missing keys in both locales, no automatic translation of seeded/user-entered names, and exact locale key/value compatibility.
  - **Rollback**: Revert only the faulty translation mapping while keeping the functional control and semantic name available in both languages.
  - **Risk**: Medium — shared dictionary changes can affect other consumers or hide missing copy behind fallback.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: Complete bilingual shell copy and accessible naming through the existing localization path.
  - **Evidence**: Translation-key parity assertions and missing-key scan output.

- [X] T042 [US4] Reconcile logical RTL/LTR layout, ordering, spacing, drawer/menu/search positioning, focus order, and directional-icon behavior in the affected Core shell components and `packages/ui/src/styles/core-theme.css` without mirroring non-directional icons or changing control order.
  - **Dependencies**: T041.
  - **Exact files**: `apps/core-platform/components/shell/Shell.tsx`, `apps/core-platform/components/shell/ShellSearch.tsx`, `apps/core-platform/components/shell/ShellStateNotice.tsx`, `apps/core-platform/components/shell/ContextSwitcher.tsx`, `apps/core-platform/components/dashboard/NotificationsDropdown.tsx`, `apps/core-platform/components/dashboard/UserMenuDropdown.tsx`, `apps/core-platform/components/dashboard/LocaleToggle.tsx`, `apps/core-platform/components/dashboard/ThemeToggle.tsx`, `apps/core-platform/lib/shell/presentation.ts`, `packages/ui/src/styles/core-theme.css`, `tests/e2e/core-050-shell.spec.ts`.
  - **Validation**: Run English LTR and Arabic RTL at 375/768/1024/1440 plus 879/881 drawer boundaries with long and mixed-direction names; verify logical start/end, readable ordering, deterministic focus, and no overflow.
  - **Rollback**: Revert only the failing logical property/icon mapping; do not force one physical direction or change the stored locale.
  - **Risk**: High — direction errors can make navigation and overlays unusable in Arabic.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: Equivalent, logical shell behavior in LTR and RTL across every required width.
  - **Evidence**: Direction/viewport matrix assertions and annotated findings in `evidence/accessibility-localization-matrix.md`.

- [X] T043 [US4] Validate and bound light/dark text, boundary, status, control, overlay, and focus readability in `packages/ui/src/styles/core-theme.css` using existing tokens and visual patterns only.
  - **Dependencies**: T042.
  - **Exact files**: `packages/ui/src/styles/core-theme.css`, `tests/e2e/core-050-shell.spec.ts`, `specs/050-core-shell-stabilization/evidence/accessibility-localization-matrix.md`.
  - **Validation**: Run Axe contrast checks plus manual focus/status/overlay review in both themes and directions at all required widths; build current UI package consumers.
  - **Rollback**: Revert only the failing scoped color/focus rule; do not redesign the palette or introduce a second theme system/key.
  - **Risk**: Medium — shared token overrides can regress other applications.
  - **Priority**: P2.
  - **Estimated complexity**: M.
  - **Expected output**: Readable existing shell patterns and visible focus in light and dark modes.
  - **Evidence**: Theme/contrast rows in `evidence/accessibility-localization-matrix.md` and consumer build output.

- [X] T044 [US4] Add scoped reduced-motion behavior in `packages/ui/src/styles/core-theme.css` and verify immediate, perceivable drawer/menu/search/status feedback without relying on animation.
  - **Dependencies**: T043.
  - **Exact files**: `packages/ui/src/styles/core-theme.css`, `tests/e2e/core-050-shell.spec.ts`, `tests/e2e/core-050-performance.spec.ts`, `specs/050-core-shell-stabilization/evidence/accessibility-localization-matrix.md`.
  - **Validation**: Emulate `prefers-reduced-motion: reduce`, complete every critical shell interaction, verify focus/status remains perceivable, and sample visible feedback within 100 ms where measurable.
  - **Rollback**: Revert only a motion override that suppresses state visibility; preserve reduced-motion support through a corrected bounded rule.
  - **Risk**: Medium — broad transition suppression can hide feedback or affect other consumers.
  - **Priority**: P2.
  - **Estimated complexity**: M.
  - **Expected output**: Motion-independent shell comprehension with existing behavior intact.
  - **Evidence**: Reduced-motion test results and feedback samples in the accessibility/localization matrix.

- [X] T045 Complete the full accessibility/localization matrix in `specs/050-core-shell-stabilization/evidence/accessibility-localization-matrix.md` for English LTR and Arabic RTL, light/dark, 375/768/1024/1440 widths, keyboard-only, screen-reader semantics, reduced motion, touch, 200% zoom, long/mixed-direction data, and 879/881 boundary behavior.
  - **Dependencies**: T044.
  - **Exact files**: `tests/e2e/core-050-shell.spec.ts`, `specs/050-core-shell-stabilization/evidence/accessibility-localization-matrix.md` (new).
  - **Validation**: Every matrix row records PASS or an explicit blocking defect with locale, direction, theme, viewport, exact OS/browser/current-stable NVDA versions where manual assistive technology applies, scripted journey, expected outcome, observed announcement/focus result, command/manual method, reviewer, date, and linked evidence; every primary control is at least 44 by 44 CSS pixels at 375px/768px, and no required combination may be marked N/A without an approved reason.
  - **Rollback**: Correct invalid evidence and rerun the affected row; do not delete failing rows or weaken acceptance criteria.
  - **Risk**: High — missing matrix combinations can conceal direction/theme/responsive regressions.
  - **Priority**: P0.
  - **Estimated complexity**: L.
  - **Expected output**: A complete, reproducible product-quality matrix proving US4.
  - **Evidence**: The completed `accessibility-localization-matrix.md` with commands, observations, and reviewer fields.

**Phase G checkpoint**: US4 is independently testable across the full required language,
direction, theme, viewport, input, assistive-technology, and motion matrix.

---

## Phase H — Validation, Documentation, Design Memory, and Evidence

**Purpose**: Run the complete acceptance/boundary/performance gates, exercise rollback, synchronize
Design Memory and local execution documentation, and close the final Constitution Check.

- [X] T046 [P] Execute the complete Core Playwright characterization and acceptance suite with `playwright.core.config.ts` and the existing Commerce regression suite with `playwright.config.ts`, recording commands, environment, passed/failed/skipped tests, artifacts, and rerun results in `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Dependencies**: T045.
  - **Exact files**: `playwright.core.config.ts`, `playwright.config.ts`, `tests/e2e/core-050-shell.spec.ts`, `tests/e2e/core-050-performance.spec.ts`, `tests/e2e/commerce-044.spec.ts`, `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Validation**: All required Core journeys pass without retries masking deterministic failures; Commerce retains its original behavior/config; every skip has an approved rationale.
  - **Rollback**: Fix or roll back the owning phase for a regression and rerun; do not relax characterization or acceptance assertions.
  - **Risk**: High — test instability can hide real shell or cross-app regressions.
  - **Priority**: P0.
  - **Estimated complexity**: L.
  - **Expected output**: Reproducible green end-to-end evidence for all six user stories and unchanged Commerce coverage.
  - **Evidence**: Full command/result ledger and artifact references in `evidence/characterization.md`.

- [ ] T047 [P] Execute the final automated Axe/keyboard/touch/focus/reduced-motion review and the required manual current-stable NVDA/current-stable Google Chrome screen-reader review on Windows, then reconcile results in `specs/050-core-shell-stabilization/evidence/accessibility-localization-matrix.md`.
  - **Status**: **Blocked by Environment**.
  - **Waiting for**: **Windows Validation** using `docs/12-release/WINDOWS-VALIDATION.md`; this is neither a pass nor an implementation failure.
  - **Dependencies**: T045.
  - **Exact files**: `tests/e2e/core-050-shell.spec.ts`, `specs/050-core-shell-stabilization/evidence/accessibility-localization-matrix.md`.
  - **Validation**: Record exact Windows/NVDA/Chrome versions and the prescribed manual evidence fields; confirm one main, named navigation, logical headings, deterministic focus, no duplicate announcements, no color-only status, no unreachable control, primary controls at least 44 by 44 CSS pixels at 375px/768px, and no unresolved critical/serious Axe result.
  - **Rollback**: Roll back the smallest responsible component/style change and rerun the entire affected matrix slice.
  - **Risk**: High — automated success without manual semantic review is insufficient.
  - **Priority**: P0.
  - **Estimated complexity**: L.
  - **Expected output**: Final accessibility/localization acceptance evidence with no blocking gap.
  - **Evidence**: Completed matrix rows with tool/manual method and reviewer result.

- [X] T048 [P] Re-run the comparative performance sampler and create `specs/050-core-shell-stabilization/evidence/performance-comparison.json` against the Phase A baseline using identical documented local conditions.
  - **Dependencies**: T045.
  - **Exact files**: `tests/e2e/core-050-performance.spec.ts`, `specs/050-core-shell-stabilization/evidence/performance-baseline.json`, `specs/050-core-shell-stabilization/evidence/performance-comparison.json` (new).
  - **Validation**: Store raw samples/medians and prove no changed shell route is more than 10% slower than baseline and at least 95% of measurable user-triggered mock interactions show visible feedback within 100 ms; document environmental limitations.
  - **Rollback**: Roll back or optimize the responsible bounded shell change, then rerun both comparable sets; never compare dissimilar environments or invent an absolute production budget.
  - **Risk**: High — invalid comparison methodology can approve a regression or reject a sound change.
  - **Priority**: P0.
  - **Estimated complexity**: L.
  - **Expected output**: Auditable relative performance evidence for all approved measures and gates.
  - **Evidence**: `performance-comparison.json` with raw data, computed deltas, gate outcomes, and limitations.

- [ ] T049 Run the final boundary and compatibility scan across the changed tree and record zero app-to-app source imports, route changes, storage-key changes, seeded-ID changes, Commerce operational writes, canonical Business additions, BusinessUnit renames, Repository abstractions, backend/Laravel/API/SDK/auth work, OSEnablement replacement, or shell duplication in `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Dependencies**: T046.
  - **Exact files**: `apps/core-platform/`, `packages/ui/src/styles/core-theme.css`, `packages/shared/src/mock-db/schema.ts`, `tests/e2e/`, `package.json`, `pnpm-lock.yaml`, `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Validation**: Use documented `rg`, route-list, storage snapshot, seeded-ID snapshot, import graph, and diff checks; compare against Phase A inventory and the compatibility map in `plan.md`.
  - **Rollback**: Remove the violating change or roll back its owning phase; do not whitelist a forbidden boundary to pass the scan.
  - **Risk**: High — a hidden boundary or compatibility change would invalidate the feature scope.
  - **Priority**: P0.
  - **Estimated complexity**: M.
  - **Expected output**: A zero-violation boundary and compatibility report.
  - **Evidence**: Commands, match review, snapshots, and PASS/BLOCKED conclusions in `evidence/characterization.md`.

- [ ] T050 Complete the Design Quality Checklist for DP-050-01 Proposal A and execute the SC-009 representative-user usability validation in `specs/050-core-shell-stabilization/evidence/design-quality-checklist.md` and `specs/050-core-shell-stabilization/evidence/usability-validation.md` after accessibility, performance, and boundary evidence exists.
  - **Dependencies**: T047, T048, T049.
  - **Exact files**: `docs/10-design-intelligence/DESIGN-QUALITY-CHECKLIST.md`, `specs/050-core-shell-stabilization/plan.md`, `specs/050-core-shell-stabilization/evidence/design-quality-checklist.md` (new), `specs/050-core-shell-stabilization/evidence/usability-validation.md` (new), `specs/050-core-shell-stabilization/evidence/performance-comparison.json`, `specs/050-core-shell-stabilization/evidence/accessibility-localization-matrix.md`, `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Validation**: Link every applicable checklist item to completed source/test evidence and record PASS or BLOCKED; then run the approved script with 20 representative Core users (10 English LTR, 10 Arabic RTL) from the same seeded state, require each participant to identify all seven SC-009 elements without prompts, require at least 19 of 20 successes, and record only anonymized participant codes, per-element outcomes, aggregate rate, locale/direction, script revision, environment, moderator, date, observed confusion, and linked defects. N/A requires a specific reason, participant personal data is prohibited, and no rejected/deferred design may appear implemented.
  - **Rollback**: Correct the implementation/evidence or mark BLOCKED; never weaken the checklist or retroactively broaden Proposal A.
  - **Risk**: High — incomplete final evidence, a biased/unrecorded participant method, or premature checklist approval can overstate design quality and SC-009 success.
  - **Priority**: P0.
  - **Estimated complexity**: L.
  - **Expected output**: A traceable Design Intelligence quality gate plus executable, privacy-safe evidence that at least 95% of the defined representative sample satisfies SC-009.
  - **Evidence**: Completed `design-quality-checklist.md` linked to final evidence and `usability-validation.md` containing the script, anonymized outcomes, aggregate calculation, PASS/BLOCKED result, and follow-up defects.

- [ ] T051 Synchronize DP-050-01 Proposal A, rejected/deferred opportunities, validated commands, shell boundaries, and compatibility notes in `docs/11-execution/11-DESIGN-MEMORY.md`, `apps/core-platform/README.md`, and the Feature 050 planning artifacts without rewriting frozen architecture or the historical frontend audit.
  - **Dependencies**: T046, T047, T048, T049, T050.
  - **Exact files**: `docs/11-execution/11-DESIGN-MEMORY.md`, `apps/core-platform/README.md`, `specs/050-core-shell-stabilization/spec.md`, `specs/050-core-shell-stabilization/plan.md`, `specs/050-core-shell-stabilization/research.md`, `specs/050-core-shell-stabilization/data-model.md`, `specs/050-core-shell-stabilization/contracts/shell-presentation-contracts.md`, `specs/050-core-shell-stabilization/quickstart.md`, `specs/050-core-shell-stabilization/tasks.md`.
  - **Validation**: Allocate the next unused DX identifier only at update time, record real approvers/statuses only, validate links/commands/traceability, and confirm breadcrumbs, command palette, AI entry, material relocation, and Business migration remain rejected or deferred rather than authorized.
  - **Rollback**: Correct factual documentation with dated evidence and supersession; preserve decision history and never delete the original approval/rejection record.
  - **Risk**: High — inaccurate Design Memory can authorize future work or conceal a boundary change.
  - **Priority**: P1.
  - **Estimated complexity**: L.
  - **Expected output**: Synchronized, truthful design/execution documentation and reproducible local validation guidance.
  - **Evidence**: Link/path check and requirement-to-test trace captured in the updated feature artifacts.

- [ ] T052 Exercise and document rollback for focus regressions, drawer behavior, context recovery, storage compatibility, locale/theme compatibility, notification projection, test instability, and performance regression in `specs/050-core-shell-stabilization/evidence/rollback-validation.md` without destructive Git operations or data migration.
  - **Dependencies**: T051.
  - **Exact files**: `specs/050-core-shell-stabilization/evidence/rollback-validation.md` (new), with read-only references to Phase A baselines and changed files.
  - **Validation**: For every risk, identify trigger, smallest rollback unit, preserved invariants, verification command, and result; rehearse through reversible local edits/configuration or documented diff application without clearing user data.
  - **Rollback**: The artifact itself is corrected by dated amendment; do not erase prior rehearsal results or use `git reset --hard`/destructive checkout.
  - **Risk**: High — an unproven rollback can leave focus locks, incompatible storage, or projection/performance regressions active.
  - **Priority**: P0.
  - **Estimated complexity**: L.
  - **Expected output**: A tested rollback runbook covering every risk explicitly required by the plan.
  - **Evidence**: Completed `rollback-validation.md` with commands, invariant checks, and outcomes.

- [ ] T053 Run final static and repository gates from `specs/050-core-shell-stabilization/quickstart.md`: Core/UI builds, strict TypeScript, applicable lint, Core and Commerce Playwright suites, boundary scans, link/path checks, `git diff --check`, and changed-file review; record results in `specs/050-core-shell-stabilization/evidence/characterization.md`.
  - **Dependencies**: T052.
  - **Exact files**: `specs/050-core-shell-stabilization/quickstart.md`, `specs/050-core-shell-stabilization/evidence/characterization.md`, and the complete Git diff.
  - **Validation**: Every required command passes; generated/build output is not committed; only plan-bounded files are changed; unrelated user changes remain preserved and identified.
  - **Rollback**: Fix or roll back the owning task for any failed gate and rerun the full final set; do not suppress checks or alter unrelated changes.
  - **Risk**: High — a green partial suite does not prove merge readiness.
  - **Priority**: P0.
  - **Estimated complexity**: M.
  - **Expected output**: A clean, reproducible final delivery-gate ledger and reviewed changed-file list.
  - **Evidence**: Command results and changed-file inventory in `evidence/characterization.md`.

- [ ] T054 Complete the post-implementation Constitution Check and requirement-to-evidence trace in `specs/050-core-shell-stabilization/plan.md` and `specs/050-core-shell-stabilization/evidence/characterization.md`, reporting every item PASS, N/A with reason, or BLOCKED and stopping release for any failure.
  - **Dependencies**: T053.
  - **Exact files**: `specs/050-core-shell-stabilization/plan.md`, `specs/050-core-shell-stabilization/spec.md`, `specs/050-core-shell-stabilization/tasks.md`, `specs/050-core-shell-stabilization/evidence/characterization.md`, `specs/050-core-shell-stabilization/evidence/accessibility-localization-matrix.md`, `specs/050-core-shell-stabilization/evidence/design-quality-checklist.md`, `specs/050-core-shell-stabilization/evidence/performance-baseline.json`, `specs/050-core-shell-stabilization/evidence/performance-comparison.json`, `specs/050-core-shell-stabilization/evidence/usability-validation.md`, `specs/050-core-shell-stabilization/evidence/rollback-validation.md`.
  - **Validation**: Trace every FR/SC, user story, contract, compatibility invariant, quality matrix row, performance gate, boundary rule, rollback item, and documentation update to passing evidence; no check may be weakened or inferred from intent alone.
  - **Rollback**: Mark BLOCKED and return to the owning task/phase; do not change the Constitution, Freeze, ADR, requirement, or acceptance threshold to force PASS.
  - **Risk**: High — this is the final governance and release decision.
  - **Priority**: P0.
  - **Estimated complexity**: L.
  - **Expected output**: A complete post-design/post-implementation Constitution result and auditable release decision.
  - **Evidence**: Final Constitution table and FR/SC-to-test/evidence matrix in `evidence/characterization.md`.

**Phase H checkpoint**: All six user stories, compatibility invariants, boundaries, quality gates,
performance thresholds, rollback paths, documentation, and Constitution checks are proven. Any
BLOCKED result stops release without weakening the failed check.

---

## Dependencies and Execution Order

### Phase Dependencies

```text
Phase 0 audits in parallel (A000–A005)
  -> Product Owner approval of the Phase 0 Compatibility Gate
    -> T001 approval/Constitution gate
      -> Phase A characterization and baselines (T002–T009)
        -> Phase B accessibility/semantics (T010–T016)
          -> Phase C responsive drawer (T017–T020)
            -> Phase D context compatibility/recovery (T021–T027)
              -> Phase E topbar presentation (T028–T035)
                -> Phase F shell states/scroll ownership (T036–T040)
                  -> Phase G bilingual/direction/theme/motion matrix (T041–T045)
                    -> Phase H validation/evidence/docs/Constitution (T046–T054)
```

- Phase order is mandatory because the approved plan requires behavior to be characterized before
  change and validated before the next structural surface is touched.
- Each implementation task starts only after its failing-first test task and ends with evidence.
- `[P]` tasks may run concurrently only when all listed dependencies are complete. Do not parallelize
  tasks that edit the same file even if their conceptual concerns differ.
- A checkpoint failure returns work to the smallest owning task; it never authorizes a later phase.

### User Story Completion Points

| Story | Primary tasks | Independent completion gate |
|---|---|---|
| US1 | T005, T010, T012, T039, T040 | Existing routes/redirects/navigation/load/scroll behavior passes Phase F plus final H validation. |
| US2 | T021–T027 | Full valid/stale/malformed/cross-scope context matrix passes with zero storage migration/write and unchanged `useApp`. |
| US3 | T017–T020 | Drawer and shell controls pass all compact/tablet/desktop widths, direction, input, focus, and overflow checks. |
| US4 | T007, T011, T013–T015, T034, T041–T045 | Full accessibility/localization matrix passes in both languages, directions, themes, motion settings, and required widths. |
| US5 | T026, T036–T040 | Every state and retry is distinct, localized, non-disclosing, non-duplicative, and zero-write. |
| US6 | T006, T028–T035 | Search allowlist and exact notification/profile/locale/theme outcome tests pass with no false capability or key/route change. |

### Parallel Opportunities

- A000–A005 may run in parallel when their audit scopes do not overlap; T001 remains blocked until
  the consolidated Phase 0 Compatibility Gate is approved.
- After T001, T002 and T004 can run in parallel because they write different files.
- After T003, T008 can run in parallel with T005–T007 because the performance spec/evidence and
  shell spec write sets are separate.
- After T011, T012 and T015 can run in parallel because their write sets are limited to the shell
  component and scoped CSS respectively; T013–T014 then serialize shared localization work.
- Phase E is intentionally serialized after T029 because search, notification, profile, locale,
  and theme share the shell facade, localization dictionary, or bounded CSS.
- After T045, T046–T048 can run in parallel because they produce distinct validation artifacts;
  T049 follows T046, T050 follows T047–T049 so accessibility, performance, and boundary evidence
  already exists, and T051 waits for all.

## Implementation Strategy

### Conservative Increment

1. Complete A000–A005 and obtain Product Owner approval of the Phase 0 Compatibility Gate. No T task
   may start before this checkpoint.
2. Complete T001–T009 and stop for baseline review. No product source changes are permitted before
   this checkpoint.
3. Complete and validate one bounded phase at a time in the required A–H order.
4. For each phase, observe failing-first assertions, implement only the approved delta, rerun all
   earlier phase tests, capture evidence, and prove the rollback before proceeding.
5. Release only after T054 reports no BLOCKED Constitution item.

### MVP Compatibility Slice

The smallest dependency-complete internal demonstration checkpoint is the approved Phase 0 gate
plus T001–T040 (Phases A–F). It demonstrates the characterized, accessible, responsive, compatible
shell and its presentation states without skipping the mandatory dependencies between those tasks.
Phase H cannot be selected as an "applicable" partial gate because it depends on Phase G evidence.
This checkpoint is **not release-ready**: the release candidate is the full dependency chain through
T054, including Phase G and every Phase H gate.

## Task Count Summary

| Phase | Tasks | IDs |
|---|---:|---|
| 0 — Current implementation reconciliation | 6 | A000–A005 |
| A — Characterization, inventories, baselines | 9 | T001–T009 |
| B — Accessibility and semantics | 7 | T010–T016 |
| C — Responsive shell | 4 | T017–T020 |
| D — Workspace context | 7 | T021–T027 |
| E — Topbar | 8 | T028–T035 |
| F — Presentation states | 5 | T036–T040 |
| G — Localization/direction/theme/motion | 5 | T041–T045 |
| H — Validation/docs/evidence | 9 | T046–T054 |
| **Implementation subtotal** | **54** | **T001–T054** |
| **Overall total** | **60** | **A000–A005, T001–T054** |
