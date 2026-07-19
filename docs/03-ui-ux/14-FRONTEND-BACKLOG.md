# Frontend Execution Backlog

- **Status:** Planning backlog; no implementation authorized by this document
- **Snapshot date:** 2026-07-19
- **Owner:** Frontend delivery with Product Experience and applicable architecture owners
- **Scope:** Frontend-first UX completion for Landing, Core Platform, and Commerce

## 1. Purpose

This backlog converts verified UX gaps into bounded frontend tasks. Each task still requires an
approved `spec.md`, `plan.md`, and `tasks.md`, applicable Constitution Checks, and owner approval
before code changes. The backlog does not create backend contracts, schemas, canonical state
models, or architecture decisions.

## 2. Ordering Rules

1. Preserve the frozen Core Platform/Commerce separation.
2. Make Platform Dashboard usable before Commerce readiness.
3. Establish shared locale/state foundations before duplicating fixes across screens.
4. Start Business Architect, deterministic analysis, Business Blueprint, and Recommendations at
   the earliest safe point after canonical Business entry/selection is approved.
5. Use governed, deterministic, replaceable frontend fixtures for planned Core intelligence flows;
   do not infer HTTP or persistence contracts.
6. Keep Commerce production/backend hardening separate from safe frontend UX completion.

## 3. Backlog Summary

| ID | Task | Priority | Size | Status | Depends on | Gaps |
|---|---|---|---|---|---|---|
| FE-001 | Locale Engine and translation foundation | P0 | XL | Ready for specification; persistence precedence partly blocked | None | UXG-018–024 |
| FE-002 | Platform-first entry and safe destination resolution | P0 | L | Ready for specification | None | UXG-012–013, 025–027 |
| FE-003 | Localized Landing and authentication journey | P0 | L | Depends on foundation | FE-001, FE-002 | UXG-002, 018, 020, 025–026, 039 |
| FE-004 | Workspace creation UX reconciliation | P0 | M | Ready after foundations | FE-001–003 | UXG-001, 011, 042 |
| FE-005 | Canonical Business context entry frontend | P0 | L | Blocked by product/architecture input | Approved Business entry/selection decision, FE-004 | UXG-014 |
| FE-006 | Business Architect introduction and interview vertical slice | P0 | XL | Blocked by FE-005 | FE-001, FE-004, FE-005 | UXG-003–004, 007 |
| FE-007 | Business Architect supporting information and Review | P0 | L | Blocked by FE-006 | FE-006 and approved evidence scope | UXG-005–006 |
| FE-008 | Deterministic Business Analysis frontend slice | P0 | XL | Blocked by reviewed input/fixture specification | FE-007; governed deterministic fixture | UXG-008 |
| FE-009 | Business Blueprint presentation | P0 | XL | Blocked by analysis projection fixture | FE-008 | UXG-009 |
| FE-010 | Explainable Recommendations and access continuation | P0 | XL | Blocked by Blueprint/Recommendation fixture | FE-009 | UXG-010–011 |
| FE-011 | Core Workspace Setup and final onboarding sequence | P0 | L | Depends on canonical intelligence flow | FE-004, FE-010 | UXG-001, 011 |
| FE-012 | Product Hub access/readiness state reconciliation | P1 | L | Partly blocked by permission catalog | FE-002, FE-010 | UXG-015–016, 027, 041 |
| FE-013 | Workspace selector, Team, and administration states | P1 | XL | Permission/membership details blocked | FE-001, approved permission catalog | UXG-015–017, 027 |
| FE-014 | Commerce localization completion | P0 | XL | Depends on Locale Engine | FE-001 | UXG-021, 023–024, 034, 039 |
| FE-015 | Commerce route state and safe recovery completion | P1 | L | Ready after localization foundation | FE-001, current Features 052–055 seams | UXG-025–030 |
| FE-016 | Responsive data-table and document experience | P1 | L | Ready for specification | FE-001, Design System patterns | UXG-024, 033–034, 039 |
| FE-017 | Commerce Returns list/detail | P2 | L | Requires approved frontend feature spec | FE-014–016; Commerce Return owner rules | UXG-031 |
| FE-018 | Commerce Stock Movements presentation | P2 | L | Requires approved frontend feature spec | FE-014–016; Inventory read model | UXG-032 |
| FE-019 | Profile, Notifications, and Audit read experiences | P2 | XL | Partly blocked by approved projections/permissions | FE-001, FE-002, owner read models | UXG-035–037 |
| FE-020 | Search, command, analytics, and journey observability | P2 | XL | Later-platform | FE-002, stable routes and permissions | UXG-038, 040 |
| FE-021 | Cross-route accessibility and UX regression gate | P0 | L | Continuous; final pass after each tranche | All affected feature tasks | UXG-024, 033–034, 039 |

## 4. Detailed Tasks

### FE-001 — Locale Engine and Translation Foundation

- **Objective:** Establish the open-ended locale registry, namespaces, fallback, plural/formatting,
  missing-key, direction, and test behavior in [Localization](./10-LOCALIZATION.md), while keeping
  final preference precedence replaceable.
- **Affected Screens:** Every Landing, Core Platform, and Commerce screen; first adoption scope may
  be Landing/auth/Core shell.
- **Dependencies:** Existing direction-aware styles; Design System; Governance decision only for
  final authenticated preference precedence.
- **Estimated Size:** XL.
- **Acceptance Criteria:**
  - Engine behavior has no `en | ar` language-count limitation.
  - English and Arabic launch namespaces are complete for the approved first slice.
  - Registry, fallback, plural, number/date/currency/timezone, missing-key, and direction behavior
    are testable.
  - A non-launch fixture locale proves extensibility without becoming customer-visible.
  - Current duplicate Core locale paths have an approved compatibility/removal plan.
- **Definition of Done:** Approved spec/plan/tasks; Constitution Check; launch-language resources;
  engine and affected-route tests; no hard-coded copy in the slice; docs synchronized; no backend
  contract or persistence precedence invented.

### FE-002 — Platform-First Entry and Safe Destination Resolution

- **Objective:** Let authorized users enter Platform Dashboard before Commerce readiness and route
  returning users to the exact safe Core destination.
- **Affected Screens:** Login, `/onboarding`, Platform Dashboard, Product Hub, Core protected layout,
  shell context states.
- **Dependencies:** Current Core session/context presentation and Product Decision “Platform entry
  before Operating Systems.”
- **Estimated Size:** L.
- **Acceptance Criteria:**
  - Platform Dashboard no longer depends on Commerce completion presentation.
  - Login distinguishes new/incomplete/complete Core stages without treating OS readiness as Core
    completion.
  - Missing/stale/cross-scope context keeps current Feature 050 safety behavior.
  - Deep links fall back to a safe authorized Core destination.
- **Definition of Done:** Routing/state specification approved; unit/E2E coverage for all branches;
  loading/unauthorized/retry localized; current Commerce handoff unchanged; no new lifecycle or
  backend state created.

### FE-003 — Localized Landing and Authentication Journey

- **Objective:** Make Landing → Register → Verify Email → Workspace introduction coherent,
  responsive, accessible, and localized.
- **Affected Screens:** Landing, Login, Register, Forgot Password, Reset Password, Verify Email,
  Welcome.
- **Dependencies:** FE-001, FE-002; current auth browser mock.
- **Estimated Size:** L.
- **Acceptance Criteria:**
  - Landing primary new-user action enters Register; Login remains distinct.
  - Every auth string/state uses owned translation namespaces.
  - Loading, validation, duplicate/invalid, resend, recovery, and success behavior is visible.
  - English/LTR and Arabic/RTL pass compact, keyboard, focus, and semantics checks.
- **Definition of Done:** All affected routes covered by route/journey tests; no hard-coded
  user-visible copy; no production identity mechanism inferred from the mock.

### FE-004 — Workspace Creation UX Reconciliation

- **Objective:** Reconcile Workspace introduction/creation with canonical terminology and prepare a
  clean handoff to the Business-context/Business Architect flow.
- **Affected Screens:** Welcome, `/onboarding` Workspace step, planned Core Workspace Setup boundary.
- **Dependencies:** FE-001–003; canonical Workspace hierarchy is already frozen.
- **Estimated Size:** M.
- **Acceptance Criteria:**
  - Workspace is presented as tenant/customer boundary, not company/Business/Business Unit/OS.
  - Validation, saving, failure/retry, and created states are explicit.
  - Country, currency, and timezone are locale-formatted and remain distinct preferences/context.
  - OS/Plan steps no longer immediately follow Workspace in the target journey.
- **Definition of Done:** Updated flow tests and copy evidence; safe draft behavior; next route is
  approved Business entry/Business Architect introduction; no organization model migration hidden
  in UI changes.

### FE-005 — Canonical Business Context Entry Frontend

- **Objective:** Supply the approved Core-owned Business create/select entry needed before Business
  Architect, without treating legacy `BusinessUnit` compatibility data as canonical Business.
- **Affected Screens:** Post-Workspace entry, Context Switcher, Business Architect Introduction.
- **Dependencies:** Explicit approved Business entry/selection product decision and feature spec;
  FE-004.
- **Estimated Size:** L.
- **Acceptance Criteria:**
  - UI distinguishes Workspace, Business, and Business Unit.
  - Entry covers no Business, one Business, multiple Businesses, inaccessible, loading, and error.
  - No silent rename/duplication of current production/mock models.
- **Definition of Done:** Required decision and migration/compatibility plan cited; frontend slice
  and fixtures approved; scope/access tests pass; documentation updated. Until then this task stays
  blocked.

### FE-006 — Business Architect Introduction and Interview Vertical Slice

- **Objective:** Deliver the first independently valuable guided interview slice with start, one
  complete prompt group, pause, resume, and safe exit.
- **Affected Screens:** Business Architect Introduction, Interview, resume entry, Platform Dashboard
  resume card/entry.
- **Dependencies:** FE-001, FE-004, FE-005; governed deterministic interview fixtures and replaceable
  frontend client boundary.
- **Estimated Size:** XL.
- **Acceptance Criteria:**
  - Introduction explains purpose, data use, output, duration, and resume.
  - Interview is guided/conversational, not a long static form or unstructured chatbot.
  - Current Business context is visible and scope-safe.
  - Draft/checkpoint, pause/resume, invalid, unavailable, and retry states work.
  - Raw answers are not labeled published Business DNA.
- **Definition of Done:** Approved feature artifacts; deterministic fixtures; responsive bilingual
  flow; accessibility and resume tests; no API/schema or AI decision invented.

### FE-007 — Supporting Information and Interview Review

- **Objective:** Add approved supporting context and let users review/correct material input before
  analysis.
- **Affected Screens:** Supporting Information, Interview, Review.
- **Dependencies:** FE-006; approved evidence types/privacy scope and material-review rules.
- **Estimated Size:** L.
- **Acceptance Criteria:**
  - Supporting context is optional/required only where approved and has no invented upload backend.
  - Review separates answers, inferred candidates, assumptions, conflicts, and gaps.
  - Corrections return to the exact prompt and back to Review.
  - Confirmation records the frontend fixture/input version used by FE-008.
- **Definition of Done:** Complete state/access/localization/a11y tests; fixture provenance visible;
  no automatic Business DNA publication.

### FE-008 — Deterministic Business Analysis Frontend Slice

- **Objective:** Present deterministic Business Brain analysis progress, validation blockers,
  failure/retry, and completion using governed fixtures.
- **Affected Screens:** Review confirmation, Analysis, safe return to Review.
- **Dependencies:** FE-007; approved deterministic scenario definitions that respect Business Brain
  ordering.
- **Estimated Size:** XL.
- **Acceptance Criteria:**
  - Analysis always consumes a confirmed versioned input fixture.
  - Progress labels are truthful and deterministic; no AI-only/fabricated reasoning.
  - Needs-correction, blocked, retryable failure, and completed states are distinct.
  - Retry with unchanged input is deterministic.
- **Definition of Done:** Scenario and UI tests prove identical inputs produce identical fixture
  results; provenance/audit expectations documented; no runtime/backend contract inferred.

### FE-009 — Business Blueprint Presentation

- **Objective:** Deliver the customer-facing result of Business Architect as a read-only composed
  presentation.
- **Affected Screens:** Business Blueprint overview and sections; Platform Dashboard return entry.
- **Dependencies:** FE-008 and approved Blueprint projection fixtures.
- **Estimated Size:** XL.
- **Acceptance Criteria:**
  - Includes Business DNA, summary, needs, challenges, opportunities, readiness, capabilities, and
    implementation roadmap when supplied.
  - Loading, empty, partial, stale, unauthorized, error, and ready states are explicit.
  - Missing sections are named; values are never fabricated.
  - Blueprint is distinct from Platform Blueprint and Recommendations.
- **Definition of Done:** Responsive/print if in scope, localization/a11y, provenance, partial-state,
  and navigation tests pass; no new aggregate or write behavior is introduced.

### FE-010 — Explainable Recommendations and Access Continuation

- **Objective:** Present optional explainable Recommendations after Blueprint and route to available
  access, Plan, Core setup, or defer.
- **Affected Screens:** Recommendations, Business Blueprint next action, Plan/access continuation,
  Platform Dashboard/Product Hub.
- **Dependencies:** FE-009; approved deterministic Decision/Recommendation fixtures and product
  access projections.
- **Estimated Size:** XL.
- **Acceptance Criteria:**
  - Recommendations follow Blueprint and remain separate from it.
  - Rationale, evidence, assumptions, alternatives, risk, confidence, and expected benefit render
    only when provided.
  - No-results, partial, stale, error, defer, dismiss if approved, and continue states work.
  - Product/Plan presentation follows capability/need rather than preceding analysis.
- **Definition of Done:** Optional/defer paths reach Platform Dashboard; access actions remain
  permission-aware; fixture and UI tests pass; no target-owner execution is performed silently.

### FE-011 — Core Workspace Setup and Final Onboarding Sequence

- **Objective:** Complete minimal Core-owned setup and connect the full new-user sequence to
  Platform Dashboard.
- **Affected Screens:** Plan/Available Access, Core Workspace Setup, Platform Dashboard, Product Hub.
- **Dependencies:** FE-004, FE-010; approved required/optional Core setup fields.
- **Estimated Size:** L.
- **Acceptance Criteria:**
  - Available-access branch does not force Plan selection.
  - Core setup contains no Commerce operational configuration.
  - Completion reaches Platform Dashboard before optional Commerce setup.
  - Interrupted users resume the exact safe stage.
- **Definition of Done:** Complete new-user E2E in English/LTR and Arabic/RTL; failure/recovery and
  accessibility pass; current mock compatibility documented.

### FE-012 — Product Hub Access/Readiness State Reconciliation

- **Objective:** Make Product Hub cards accurately distinguish availability, access/Plan,
  subscription, setup, readiness, launch, pause/stale, and unauthorized presentation.
- **Affected Screens:** Platform Dashboard, Product Hub, Billing/Subscription, Commerce handoff.
- **Dependencies:** FE-002, FE-010; approved action permissions and current Feature 054 handoff.
- **Estimated Size:** L.
- **Acceptance Criteria:**
  - Per-owner loading/partial failure is visible.
  - Setup remains Commerce-owned; Hub performs no Commerce operational write.
  - Handoff/launch failure always offers safe Core return.
  - Environment-specific navigation is supplied through approved frontend configuration.
- **Definition of Done:** Product state and handoff test matrix passes; no legacy `OSEnablement`
  successor is declared; compatibility seam remains explicitly temporary.

### FE-013 — Workspace Selector, Team, and Administration States

- **Objective:** Complete multi-Workspace context selection and permission-aware administration
  presentation.
- **Affected Screens:** Context Switcher, Team, Settings, Billing, Integrations.
- **Dependencies:** FE-001; approved membership/role/permission catalog and action scope.
- **Estimated Size:** XL.
- **Acceptance Criteria:**
  - Selector covers none/one/many/stale/cross-scope/unavailable states.
  - Administration separates view/manage and personal/Workspace/OS concerns.
  - Team roles are not hard-coded as canonical.
  - Invite/settings actions have complete pending/success/failure/retry outcomes.
- **Definition of Done:** Scope and action matrix approved; role/access and cross-Workspace tests;
  localized/responsive/a11y presentation; no Commerce permission semantics moved into Core.

### FE-014 — Commerce Localization Completion

- **Objective:** Adopt the Locale Engine throughout Commerce setup and daily operations.
- **Affected Screens:** Every Commerce route and shell surface.
- **Dependencies:** FE-001; current Commerce feature message files.
- **Estimated Size:** XL.
- **Acceptance Criteria:**
  - All Commerce copy, validation, state messages, documents, and accessible names use namespaces.
  - Currency/date/number/timezone presentation uses explicit approved inputs.
  - Setup, POS, tables, dialogs/drawers, and documents pass English/LTR and Arabic/RTL.
- **Definition of Done:** Namespace completeness and route tests pass; current repository/owner
  boundaries unchanged; no operational fact translated or reformatted at persistence level.

### FE-015 — Commerce Route State and Safe Recovery Completion

- **Objective:** Close loading/empty/error/not-found/partial/success gaps across Commerce routes.
- **Affected Screens:** Dashboard, POS Success, Reports, Settings, document routes, and weaker
  detail/list states identified in the matrix.
- **Dependencies:** FE-001; existing Features 052–055 seams.
- **Estimated Size:** L.
- **Acceptance Criteria:**
  - Each screen has applicable route/content states and a safe recovery target.
  - Sale Success distinguishes missing, failed, partial, and known success outcome.
  - Retry never blindly repeats a possibly committed command.
  - Direct/missing-context Commerce entry stays recovery-safe.
- **Definition of Done:** State matrix rows reconciled; repository failure/not-found fixtures and
  tests pass; no retained write is moved or expanded.

### FE-016 — Responsive Data-Table and Document Experience

- **Objective:** Standardize compact tables, dense records, document previews, and print behavior.
- **Affected Screens:** Team, Billing, Products, Inventory, Transfers, Customers, Orders, Invoices,
  Reports, Invoice/Return documents, setup previews.
- **Dependencies:** FE-001; Design System table/page/document patterns.
- **Estimated Size:** L.
- **Acceptance Criteria:**
  - Every table has an approved compact pattern with primary actions preserved.
  - RTL/LTR focus/reading order and mixed-script identifiers remain correct.
  - Documents handle missing data, long translations, compact preview, and print.
- **Definition of Done:** Viewport, zoom, keyboard, accessibility, bilingual direction, and print
  regression evidence for affected templates.

### FE-017 — Commerce Returns List and Detail

- **Objective:** Complete the Commerce-owned Return discovery and inspection UX around current
  Order initiation/document behavior.
- **Affected Screens:** Planned `/returns`, `/returns/[id]`, existing Order detail and Return
  document.
- **Dependencies:** FE-014–016; approved Commerce Return eligibility/read-model/lifecycle inputs.
- **Estimated Size:** L.
- **Acceptance Criteria:**
  - List/detail cover loading, empty/filter-empty, not found, unauthorized, error, and ready.
  - Source Order/Invoice/document links are scope-safe.
  - No Return lifecycle or compensation policy is invented by UI.
- **Definition of Done:** Feature artifacts approved; frontend fixtures/repository boundary and
  tests; owner rules cited; Screen Map/Matrix updated.

### FE-018 — Commerce Stock Movements Presentation

- **Objective:** Add a Commerce Inventory-owned read experience for scoped stock movement history.
- **Affected Screens:** Planned `/inventory/movements`, Inventory, Product/Order/Transfer source links.
- **Dependencies:** FE-014–016; approved Inventory movement read projection.
- **Estimated Size:** L.
- **Acceptance Criteria:**
  - List/filter/detail/source navigation uses only owner-approved projection fields.
  - Empty, partial, stale, error, unauthorized, and ready states exist.
  - UI does not create or mutate movements.
- **Definition of Done:** Approved feature spec, fixture/client seam, localization/a11y/responsive
  tests, and owner traceability.

### FE-019 — Profile, Notifications, and Audit Read Experiences

- **Objective:** Complete planned Core read/management surfaces without conflating personal,
  Workspace, notification-source, or Audit ownership.
- **Affected Screens:** Planned Profile, Notifications, Audit Logs; existing shell menus/dropdown.
- **Dependencies:** FE-001/002; approved fields, projections, permissions, minimization, and action
  scope for each surface.
- **Estimated Size:** XL.
- **Acceptance Criteria:**
  - Each screen is separately specified and can be delivered independently.
  - Notification links return to authorized source context.
  - Audit is read-only, append-only in presentation, and explicitly permissioned.
  - Profile does not absorb Workspace settings.
- **Definition of Done:** Owner projections and permissions approved; state/a11y/localization tests;
  no backend contract inferred.

### FE-020 — Search, Command, Analytics, and Journey Observability

- **Objective:** Complete permission-aware navigation discovery and privacy-safe funnel evidence.
- **Affected Screens:** Core shell search/command entry, Product Hub, Commerce shell/navigation, all
  canonical journey stages.
- **Dependencies:** Stable route map, FE-002, approved permission/actions and analytics policy.
- **Estimated Size:** XL.
- **Acceptance Criteria:**
  - Search scope and command actions match Information Architecture and authorization.
  - No command bypasses owner validation or creates a cross-app write.
  - Journey events distinguish view, success, failure, interruption, resume, and safe return
    without recording sensitive answer/content data.
- **Definition of Done:** Search/command keyboard and locale tests; analytics schema/privacy review;
  event validation; no analytics record becomes canonical product state.

### FE-021 — Cross-Route Accessibility and UX Regression Gate

- **Objective:** Make accessibility, direction, responsive behavior, and full state coverage a
  release gate for every frontend tranche.
- **Affected Screens:** All changed screens from FE-001–020.
- **Dependencies:** Runs with each task and as a final suite.
- **Estimated Size:** L cumulative.
- **Acceptance Criteria:**
  - Keyboard, focus, semantic names, errors/live regions, reduced motion, zoom/text expansion,
    English/LTR, Arabic/RTL, compact viewport, and critical automated accessibility checks pass.
  - Loading, empty, error, unauthorized, success, and recovery fixtures are covered where
    applicable.
- **Definition of Done:** Evidence is attached to each feature/release gate; omissions have an
  explicit approved N/A rationale; Screen Status Matrix reflects verified results.

## 5. Suggested Delivery Tranches

| Tranche | Tasks | Outcome |
|---|---|---|
| Foundation | FE-001, FE-002, continuous FE-021 | Open-ended locale/state foundation and Platform-first entry |
| Current new-user coherence | FE-003, FE-004 | Localized Landing/auth/Workspace journey ready for Business entry |
| Business understanding | FE-005–FE-009 | Canonical Business context, guided interview, deterministic analysis, Business Blueprint |
| Recommendation and Core completion | FE-010–FE-012 | Recommendations, access continuation, Core setup, Product Hub reconciliation |
| Administration | FE-013, relevant FE-019 | Multi-Workspace and permission-aware Core administration |
| Commerce UX completion | FE-014–FE-018 | Localized, state-complete, responsive Commerce including planned Returns/Movements |
| Later platform | remaining FE-019, FE-020 | Profile/notifications/Audit/search/command/analytics after approved inputs |

## 6. Relationships

- [Screen Status Matrix](./12-SCREEN-STATUS-MATRIX.md)
- [UX Gaps](./13-UX-GAPS.md)
- [User Journeys](./05-USER-JOURNEYS.md)
- [User Flows](./06-USER-FLOWS.md)
- [State Machines](./07-STATE-MACHINES.md)
- [Localization](./10-LOCALIZATION.md)
- [Frontend-First Policy](../11-execution/05-FRONTEND-FIRST-POLICY.md)

## 7. Open Questions

- FE-005 remains blocked until an approved canonical Business entry/selection experience exists.
- FE-013 and action-level portions of FE-012/019 remain blocked until an approved permission
  catalog and assignment model can be cited.
- Final authenticated locale/timezone preference precedence requires Governance approval; FE-001
  can proceed with a replaceable resolver and browser-scope launch behavior.

## 8. Verified Against

- [Screen Status Matrix](./12-SCREEN-STATUS-MATRIX.md), [UX Gaps](./13-UX-GAPS.md), and all completed
  Phase 1 journey/flow/state/localization documents;
- all current frontend routes, components, state sources, compatibility repositories, and tests;
- Features 052–055, current execution policy, and Spec Kit/Constitution requirements; and
- Product Decisions, Accepted ADRs, frozen Core/Business Brain/Commerce architecture, and
  repository AGENTS instructions.

