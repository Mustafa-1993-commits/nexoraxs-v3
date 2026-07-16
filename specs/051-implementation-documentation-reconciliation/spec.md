# Feature Specification: NexoraXS Implementation and Documentation Reconciliation

**Feature Branch**: `051-implementation-documentation-reconciliation`
**Feature ID**: `051-implementation-documentation-reconciliation`
**Created**: 2026-07-16
**Status**: Draft
**Input**: User description: "Compare the current NexoraXS frontend implementation with the new authoritative documentation, protect approved and working behavior, and define an evidence-based incremental reconciliation plan without changing product code."

This is a reconciliation and planning feature. It authorizes a later evidence-gathering audit and
its documentation deliverables; it does not authorize implementation, redesign, migration, or
architecture change. The governing principle is **preserve before improving**.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Establish a Complete Current-Implementation Baseline (Priority: P1)

A product, architecture, design, or engineering reviewer can see one evidence-backed inventory of
the Landing, Core Platform, Commerce OS, shared packages, routes, providers, browser-persisted mock
state, tests, and working cross-application journeys as they exist at the audit baseline.

**Why this priority**: No safe incremental backlog can be selected until the repository's actual
behavior is distinguished from assumptions, historical plans, and documentation expectations.

**Independent Test**: Compare the recorded baseline manifest with the repository at the captured
commit and confirm that every in-scope application, route, module, provider, state model, workflow,
and test surface has one inventory entry and supporting source or observed-behavior evidence.

**Acceptance Scenarios**:

1. **Given** the audit begins from a named branch and commit, **When** the baseline manifest is completed, **Then** it records the audit date, commit, applications, packages, route entry files, providers, state sources, persistence mechanisms, tests, and runnable journeys included in the review.
2. **Given** a route file, redirect, navigation destination, or cross-application handoff exists, **When** routes are inventoried, **Then** the route, owner, visible outcome, functional actions, visual-only actions, redirect behavior, hardcoded URL use, and documented expectation are recorded.
3. **Given** a current module has a visible screen, **When** it is assessed, **Then** the assessment distinguishes route existence, rendered UI, working interaction, persistence, operational relationships, state coverage, and test evidence rather than treating visibility as implementation completion.
4. **Given** an older specification or audit describes behavior, **When** that statement is used, **Then** it is revalidated against the captured repository baseline and is not substituted for current implementation evidence.

---

### User Story 2 - Protect Approved and Working Implementation (Priority: P1)

The Product Owner and delivery team can identify which current surfaces are protected, which are
already aligned, and which need bounded future work without turning documentation differences into
an automatic rewrite recommendation.

**Why this priority**: Existing working code and learned behavior are valuable evidence. The Core
Platform Login and Register screens have an explicit Product Owner visual freeze that must be
preserved.

**Independent Test**: Review every classification and recommendation, verify that Login and
Register appear in the protected register, and confirm that no protected or working surface is
recommended for redesign or replacement without the exact evidence and approval required by this
specification.

**Acceptance Scenarios**:

1. **Given** `/login` or `/register` is inspected, **When** the audit classifies it, **Then** it is classified only as **Protected** or **Protected — Critical Fix Required** and its route, journey, layout, hierarchy, colors, typography, spacing, branding, form arrangement, component placement, and responsive visual behavior are not recommended for preference-based change.
2. **Given** a possible issue is observed on a protected screen, **When** the issue does not meet the critical-fix definition, **Then** the screen remains **Protected** and no redesign, modernization, style change, route change, UX restructuring, component replacement, or preference-only refactor is proposed.
3. **Given** a protected screen has a reproducible functional defect, security defect, serious accessibility blocker, use-preventing responsive defect, or architecture-breaking dependency, **When** the evidence is complete, **Then** it may be recorded as **Protected — Critical Fix Required**, but implementation remains blocked pending explicit Product Owner approval.
4. **Given** working implementation is compatible with authoritative documentation, **When** a later action is proposed, **Then** the action preserves or incrementally extends that implementation and states exactly what current code and behavior will be reused.

---

### User Story 3 - Measure Functional Depth and Data Relationships (Priority: P1)

A product and quality reviewer can tell whether each Landing, Core, and Commerce surface is merely
visible, partially interactive, or functionally connected to persistent operational behavior.

**Why this priority**: A route or table alone does not prove that a business workflow is usable,
persistent, correctly owned, or reflected in related dashboards and reports.

**Independent Test**: Select each in-scope module and trace its route, controls, create/read/update/
delete behavior where applicable, browser persistence, related entities, downstream views, state
coverage, architecture owner, and automated evidence to the corresponding matrix and data-flow
records.

**Acceptance Scenarios**:

1. **Given** a Commerce Products surface exists, **When** functional depth is assessed, **Then** the audit separately records whether products can be created, read, edited, persisted, associated with inventory, sold, reflected in stock, and represented in reports.
2. **Given** a button, link, filter, menu item, card, or control is rendered, **When** it is exercised, **Then** the inventory labels it functional, visual-only, disabled-by-design, broken, redirected, or blocked from validation, with evidence.
3. **Given** browser-persisted mock state supports a journey, **When** the journey is traced, **Then** storage key, seeded identifiers, readers, writers, persistence behavior, related modules, ownership alignment, migration sensitivity, and future backend-substitution impact are recorded without changing the state.
4. **Given** a dashboard or report displays operational data, **When** its source is assessed, **Then** the audit records whether relevant operational changes update the display, whether the data is real mock operational state or decoration, and whether ownership remains correct.

---

### User Story 4 - Expose Architecture Conflicts Without Inventing Solutions (Priority: P1)

An architecture reviewer can identify implementation conflicts with the frozen architecture,
understand their evidence and consequence, and route each conflict to the smallest governed future
action without the audit silently choosing a new canonical model or owner.

**Why this priority**: Reconciliation is unsafe if it converts a documentation conflict into an
unapproved data model, lifecycle, cross-domain contract, or migration.

**Independent Test**: For every architecture-conflict entry, verify that it cites both the current
implementation evidence and controlling authority, explains the conflict, uses an allowed
classification, names only a bounded future governance action, and contains no compromise
implementation.

**Acceptance Scenarios**:

1. **Given** legacy `BusinessUnit` storage or presentation differs from the canonical Business and Business Unit hierarchy, **When** it is assessed, **Then** compatibility is documented, no model is renamed or duplicated, and any migration is deferred to a separately governed feature.
2. **Given** Core, Commerce, a shared package, or an application appears to read or write another owner's state, **When** the boundary is assessed, **Then** the exact source and authoritative owner are cited and the finding is classified without moving behavior in this feature.
3. **Given** an implementation need touches the unresolved successor to legacy `OSEnablement` or the unresolved Core Organization Registry write protocol, **When** the audit reaches that boundary, **Then** it records **Blocked by Architecture** where applicable and does not define the missing aggregate, protocol, lifecycle, API, or default.
4. **Given** a documented future capability is absent, **When** it is not needed for the next product milestone, **Then** it is classified **Defer** rather than being treated automatically as a defect or implementation priority.

---

### User Story 5 - Select an Evidence-Based Incremental Backlog (Priority: P2)

The Product Owner can use the reconciliation report to choose the next bounded feature from actual
journey, ownership, functional-depth, and quality gaps while preserving reusable implementation.

**Why this priority**: A prioritized backlog is useful only after the current state, protected
surfaces, functional depth, and architecture constraints are known.

**Independent Test**: Trace every proposed backlog item to one or more report findings and verify
its required fields, priority rationale, dependencies, reuse statement, no-rewrite instruction,
and non-binding collision-checked proposed number.

**Acceptance Scenarios**:

1. **Given** the reconciliation findings are complete, **When** backlog candidates are ranked, **Then** the order considers broken critical journeys, architecture boundary conflicts, incomplete revenue-generating workflows, disconnected operational data flows, MVP-required visual-only modules, quality improvements, and deferred platform capabilities in that sequence.
2. **Given** a proposed next feature is selected, **When** its rationale is reviewed, **Then** selection is supported by current repository evidence and does not assume Products, Dashboard, or any other module is next merely because it is prominent.
3. **Given** a future feature is recommended, **When** its scope is recorded, **Then** it identifies current implementation to reuse, the exact gap, dependencies, risk, estimated complexity, classification, affected application, and an explicit **no rewrite** instruction.
4. **Given** incremental evolution appears impossible for a finding, **When** a rewrite is considered, **Then** the report first provides concrete technical evidence that compatible extension, bounded refactoring, and migration cannot work; otherwise no rewrite recommendation is permitted.

### Edge Cases

- A route entry file exists but always redirects, renders no distinct screen, or is reachable only
  through a seeded state; the route remains inventoried with its observed condition.
- Multiple navigation items target one route, one item changes destination by state, or a route is
  reachable but absent from navigation; each interaction and route relationship is recorded.
- A visible control is intentionally demonstrative or “coming soon”; it is recorded as
  visual-only or disabled-by-design, not silently counted as functioning.
- A workflow works only before refresh, only in one application, or only after another app writes
  browser state; persistence and coupling are reported separately from screen availability.
- Decorative mock data resembles operational data; it is not credited as functional state unless
  a reproducible read/write relationship exists.
- A dashboard changes after a transaction but a related report does not, or vice versa; each
  downstream relationship receives its own evidence and functional-depth result.
- A storage key has aliases, compatibility readers, versioned content, or different session and
  local persistence; all readers and writers are recorded without normalizing the key.
- Seeded identifiers differ from identifiers created at runtime; both sets and their relationships
  are distinguished without modifying either.
- A shared utility is used by both Core and Commerce; reuse alone does not prove valid shared
  ownership, so presentation, contract, utility, and domain behavior are assessed separately.
- No direct app-to-app import exists but applications are coupled through browser storage, query
  parameters, hardcoded URLs, or duplicated shell behavior; those mechanisms remain in scope.
- A historical specification or archived visual contradicts a Freeze; the controlling authority
  wins, while historical material may be cited only as non-authoritative provenance.
- Evidence is incomplete, environment-dependent, or not reproducible; the finding states the gap,
  lowers confidence, and remains blocked rather than receiving an invented observation.
- An alignment or functional-depth denominator contains non-applicable or unknown checks; the
  estimate records its numerator, denominator, exclusions, confidence, and limitations.
- A protected Login or Register concern is desirable polish but not a critical defect; the concern
  cannot change the **Protected** classification or enter the implementation backlog.
- A serious protected-screen defect is reproduced; it may be documented, but no change is
  authorized until the Product Owner explicitly approves a bounded fix.
- A current implementation is more complete than an older document; the working compatible
  behavior is preserved and the documentation mismatch is recorded without removing functionality.
- A documented architecture capability has no approved near-term product requirement; it is
  classified **Defer**, not “missing MVP,” unless milestone evidence proves otherwise.
- Repository state changes while the audit is running; results remain tied to the captured commit,
  and any later change requires an explicit delta review rather than silent mixing of baselines.

## Requirements *(mandatory)*

### Functional Requirements

#### Audit Boundary and Evidence Rules

- **FR-001**: Feature 051 MUST remain a documentation-only reconciliation and planning feature; it MUST NOT modify application or package source code.
- **FR-002**: The later audit MUST capture its branch, commit identifier, date, repository status, relevant tool versions, and in-scope manifest before drawing implementation conclusions.
- **FR-003**: The audit MUST apply the repository authority order: Architecture Freezes; Governance, Accepted ADRs, and canonical glossary; Genesis; approved milestone baselines; Constitution; then runtime guidance, feature artifacts, and implementation guidance.
- **FR-004**: Files under `docs/archives/` MAY be used only as non-authoritative visual or implementation references and MUST NOT override an authoritative source.
- **FR-005**: Existing specifications, implementation evidence, and `docs/08-implementation-audit/` MUST be treated as prior evidence that is revalidated against the captured current baseline, not as proof of current behavior by themselves.
- **FR-006**: Every factual finding MUST cite reproducible implementation or observed-behavior evidence; every documentation expectation or conflict MUST cite the exact authoritative document and relevant section or statement.
- **FR-007**: The audit MUST distinguish confirmed observation, evidence-based inference, estimate, not-applicable result, unknown result, and blocked validation.
- **FR-008**: The audit MUST NOT invent builds, interactions, participants, user feedback, accessibility results, architecture approvals, or any other evidence.
- **FR-009**: A failed or unavailable validation MUST remain visible as failed or blocked; no threshold, denominator, or expected behavior may be weakened to obtain a pass.

#### Repository and Application Coverage

- **FR-010**: The audit MUST inspect `apps/landing/`, including marketing routes, calls to action, cross-application navigation, branding, responsive behavior, console/build warnings, and its relationship to Core Platform.
- **FR-011**: The audit MUST inspect `apps/core-platform/`, including authentication presentation, onboarding, Workspace flow, Business and legacy `BusinessUnit` presentation, Product Hub, billing, team and access, integrations, settings, application shell, search, notifications, locale, theme, cross-OS launch and recovery, and current lifecycle coupling with Commerce.
- **FR-012**: The audit MUST inspect `apps/commerce/`, including setup and onboarding; Business Unit and Branch context; dashboard; products; inventory; customers; sales; POS; orders; payments; reports; discounts; taxes; settings; transfers; returns and exchanges; sidebar destinations; visual-only routes or controls; and persistent mock operational flows.
- **FR-013**: The audit MUST inspect `packages/ui/`, `packages/shared/`, and `packages/types/` where present, including shared components, shared mock schema, storage keys, seeded identifiers, providers and facades, localization, theme, cross-app imports, hardcoded local URLs, duplicated shell behavior, deprecated compatibility code, and tests/evidence.
- **FR-014**: The audit MUST inventory every current route entry, dynamic route, redirect, navigation destination, and cross-application handoff in Landing, Core, and Commerce at the captured baseline.
- **FR-015**: The audit MUST inspect current providers, state facades, mock database and browser-persistence adapters, state readers/writers, seeded scenarios, automated tests, route guards, and reproducible working journeys.
- **FR-016**: The audit MUST inspect existing feature specifications and implementation evidence sufficiently to distinguish current contract commitments, characterized compatibility, historical intent, and unimplemented plans.
- **FR-017**: The audit MUST record missing routes or modules only where an authoritative or approved milestone expectation makes them applicable; absence alone MUST NOT create scope.

#### Classification Model

- **FR-018**: Every inspected module, route, screen, provider, state model, and workflow MUST receive exactly one classification from the classification register below.
- **FR-019**: Classification MUST be based on current evidence and authoritative expectation, not screen polish, personal preference, filename, or route existence alone.
- **FR-020**: A recommendation MUST remain consistent with its classification and MUST state the smallest governed future action, if any.
- **FR-021**: A finding with insufficient evidence MUST be marked blocked or unknown in its evidence status; uncertainty MUST NOT be converted into a stronger classification.

| Classification | Required meaning and treatment |
|---|---|
| **Protected** | Product Owner-approved implementation. Preserve it; no change may be recommended without explicit Product Owner approval. |
| **Protected — Critical Fix Required** | Protected implementation with evidence of a reproducible functional defect, security defect, serious accessibility blocker, use-preventing responsive defect, or architecture-breaking dependency. Document only; implementation still requires explicit Product Owner approval. |
| **Keep** | Implemented and sufficiently aligned with authoritative documentation. Preserve the implementation. |
| **Improve** | Working and architecturally compatible, but needs a bounded quality or UX improvement supported by evidence. |
| **Complete** | Partially implemented and should be extended using existing code and ownership. |
| **Refactor** | Preserve behavior, but plan a bounded internal correction for a demonstrated boundary, ownership, maintainability, or compatibility conflict. |
| **Defer** | Documented capability that is not required for the next product milestone. Do not implement it now. |
| **Blocked by Architecture** | Implementation and authority conflict in a way requiring Governance, an ADR, migration approval, or a successor specification. Stop at the affected boundary. |

#### Protected Implementation Register

- **FR-022**: Core Platform Login at `/login`, with entry file `apps/core-platform/app/login/page.tsx`, MUST be recorded as a protected surface.
- **FR-023**: Core Platform Register at `/register`, with entry file `apps/core-platform/app/register/page.tsx`, MUST be recorded as a protected surface.
- **FR-024**: The protected register MUST trace the protected entry files to their dependent auth components, styles, assets, providers, route behavior, and journey dependencies without recommending changes to those dependencies for preference only.
- **FR-025**: Protection MUST cover page layout, visual hierarchy, colors, typography, spacing, branding, form arrangement, component placement, responsive visual behavior, existing user journey, and routes.
- **FR-026**: The audit MUST NOT recommend redesign, rewrite, visual modernization, component replacement, style changes, route changes, UX restructuring, or preference-only refactoring for Login or Register.
- **FR-027**: A protected-screen critical-fix finding MUST include reproducible evidence, the qualifying critical category, affected behavior, and the explicit Product Owner approval gate; it MUST NOT include or perform the fix.

#### Functional-Depth Assessment

- **FR-028**: Every module assessment MUST separately record whether a route exists, UI renders, interactions work, state persists, and applicable create/read/update/delete behavior exists.
- **FR-029**: Every module assessment MUST record whether its state is correctly shared with related modules and whether dashboards, reports, inventory, documents, or other dependent views react to relevant operational changes.
- **FR-030**: Every module assessment MUST record applicable loading, empty, partial, stale, error, unauthorized, unavailable, success, and recovery states, distinguishing absent evidence from absent implementation.
- **FR-031**: Every module assessment MUST distinguish operational mock state from decorative or hardcoded presentation data.
- **FR-032**: Every visible action MUST be classified as functional, visual-only, intentionally disabled, broken, redirected, or blocked from validation.
- **FR-033**: Every module assessment MUST record applicable automated tests, manual reproducibility evidence, missing evidence, and architecture ownership.
- **FR-034**: Products MUST NOT be counted as fully implemented solely because a product table exists; the assessment MUST trace creation, persistence, editing, inventory relationship, sale behavior, stock effects, and reporting effects where those expectations apply.
- **FR-035**: Equivalent end-to-end relationship checks MUST be defined for other operational modules according to their documented purpose, without inventing unsupported domain behavior.

#### State, Persistence, and Future Substitution

- **FR-036**: Every identified state or entity MUST record its current owner, source, storage key if any, readers, writers, persistence behavior, related modules, architecture alignment, migration sensitivity, and future backend-substitution impact.
- **FR-037**: Storage keys, seeded identifiers, legacy `BusinessUnit` behavior, and compatibility state MUST be documented exactly as found and MUST NOT be renamed, normalized, deleted, or promoted to canonical architecture by this feature.
- **FR-038**: The audit MUST assess whether current page-facing providers or facades permit a future Laravel-backed client substitution without page rewrites, but MUST NOT design or introduce Laravel, an API, SDK, authentication replacement, database work, or a Repository Pattern.
- **FR-039**: Shared mock storage MUST NOT be interpreted as shared canonical domain ownership; Core and Commerce readers, writers, calculations, and lifecycle behavior MUST be evaluated against their authoritative owners.

#### Architecture Comparison and Conflict Protocol

- **FR-040**: The audit MUST compare implementation with the canonical hierarchy `Workspace -> Business -> Business Unit -> Department / Branch`, while preserving the documented legacy `BusinessUnit` compatibility boundary.
- **FR-041**: The audit MUST compare implementation with Core ownership, Commerce ownership, independent OS lifecycle, Product Hub responsibilities, explicit tenant and organization scope, contract-based cross-application interaction, and one canonical owner per operational fact.
- **FR-042**: The audit MUST verify whether applications directly import another application's source and MUST separately examine coupling through shared storage, URLs, query state, route guards, providers, duplicated behavior, and hardcoded local destinations.
- **FR-043**: The audit MUST verify that Product Hub composes and hands off owner-provided state rather than owning Commerce setup or operational facts.
- **FR-044**: The audit MUST assess whether Commerce remains independently usable for its core workflow and whether Core lifecycle or readiness depends improperly on Commerce state.
- **FR-045**: The audit MUST keep entitlement, subscription, installation, setup, configuration, activation, Operating System Ready, operational access, pause, archive, and removal distinct when evaluating implementation behavior.
- **FR-046**: The audit MUST assess frontend-first mock behavior as temporary executable evidence, not as production authorization, production security, or canonical backend schema.
- **FR-047**: When implementation and authority conflict, the finding MUST: cite implementation evidence; cite authoritative documentation; explain the conflict; classify it; define the smallest future governed action; and omit any compromise implementation.
- **FR-048**: The audit MUST stop rather than silently resolve an architecture conflict, Deferred Decision, missing canonical owner, organization migration, lifecycle successor, contract, or authorization protocol.
- **FR-049**: The audit MUST NOT change a Freeze, Accepted ADR, Genesis document, Design Intelligence standard, or historical audit artifact to make implementation appear aligned.

#### Required Audit Deliverables

- **FR-050**: The later audit MUST produce the master report at `docs/09-reconciliation/NEXORAXS-IMPLEMENTATION-RECONCILIATION-v1.0.md`; Feature 051 specification creation MUST NOT create that report early.
- **FR-051**: The master report MUST contain an executive summary, repository implementation map, architecture alignment summary, protected implementation register, application-by-application findings, module-by-module findings, route/workflow findings, data/state findings, UX/design findings, test coverage findings, technical debt, architecture conflicts, compatibility risks, and recommended incremental actions.
- **FR-052**: The report MUST contain or link a module reconciliation matrix with every field defined below.
- **FR-053**: The report MUST contain or link a route and interaction inventory with every field defined below.
- **FR-054**: The report MUST contain or link a state and data-flow inventory with every field defined below.
- **FR-055**: The report MUST contain or link a protected implementation register with every field defined below.
- **FR-056**: The report MUST contain or link a prioritized incremental backlog with every field and ranking rule defined below.
- **FR-057**: The report MUST make its evidence cutoff, commands, limitations, blocked validations, and confidence conventions explicit so later readers do not mistake the audit for timeless implementation truth.

| Deliverable | Required fields/content |
|---|---|
| **Module reconciliation matrix** | Application; module; source paths; current route; current implementation status; documentation expectation; alignment percentage; functional-depth percentage; classification; missing behavior; architecture conflict; recommended action; priority; dependencies; risk; protected status. |
| **Route and interaction inventory** | Route; owning application; route status; visible page; functional actions; visual-only actions; redirects; broken links; hardcoded application URLs; cross-application handoff; expected documentation behavior. |
| **State and data-flow inventory** | Entity or state; owner; current source; storage key; readers; writers; persistence behavior; related modules; architecture alignment; migration sensitivity; future backend-substitution impact. |
| **Protected implementation register** | Login and Register exact source files; dependent components/styles/assets/providers; protected routes; approved behavior; allowed critical-fix exceptions; Product Owner approval requirement. |
| **Prioritized incremental backlog** | Proposed feature number; title; business value; current implementation reused; exact gap; dependencies; risk; estimated complexity; classification; affected application; explicit no-rewrite instruction; source finding references. |

- **FR-058**: Alignment and functional-depth percentages MUST be evidence-based estimates, reported with the applicable checks, numerator, denominator, exclusions, confidence, and limitation note; they MUST NOT imply precision unsupported by evidence.
- **FR-059**: The default alignment estimate MUST reflect satisfied applicable authoritative expectations divided by evaluated applicable expectations; any alternative weighting MUST be disclosed and justified consistently.
- **FR-060**: The default functional-depth estimate MUST reflect applicable evidence across route, rendered UI, working interaction, persistence, CRUD where relevant, related-module flow, state coverage, operational reactivity, action functionality, tests, and ownership; non-applicable checks and unknown checks MUST be visible.

#### Incremental Backlog and Recommendation Rules

- **FR-061**: Backlog priority MUST first address broken critical journeys, then architecture boundary conflicts, incomplete revenue-generating workflows, disconnected operational data flows, MVP-required visual-only modules, quality improvements, and deferred platform capabilities.
- **FR-062**: The proposed next feature MUST be selected from repository evidence and MUST NOT presume Products, Dashboard, or another named module is next without comparative findings.
- **FR-063**: Every proposed feature MUST reuse identified current implementation and MUST contain an explicit no-rewrite instruction.
- **FR-064**: Proposed feature numbers MUST be unique, non-binding planning identifiers checked for repository collisions at report time; the audit MUST NOT create branches, directories, or reservations for those features.
- **FR-065**: A rewrite recommendation is prohibited unless the report supplies concrete evidence that preservation, compatible extension, bounded refactoring, and governed migration are technically impossible.
- **FR-066**: A recommendation to modify a protected surface is prohibited unless the critical-fix evidence and Product Owner approval gate in FR-027 are satisfied.
- **FR-067**: Recommendations MUST remain bounded by concern and MUST NOT combine unrelated application, architecture, migration, backend, and redesign work merely to reduce the number of future features.

#### Explicit Non-Scope

- **FR-068**: Feature 051 MUST NOT modify Login or Register, redesign any screen, implement missing modules, add new routes, or delete deprecated files.
- **FR-069**: Feature 051 MUST NOT add backend or Laravel work, APIs, SDKs, authentication, databases, migrations, storage-schema changes, or a Repository Pattern.
- **FR-070**: Feature 051 MUST NOT rename `BusinessUnit`, create canonical Business data, perform a Business/Business Unit migration, or define the unresolved organization write protocol.
- **FR-071**: Feature 051 MUST NOT replace, remove, redefine, or promote legacy `OSEnablement` compatibility into a canonical aggregate or lifecycle.
- **FR-072**: Feature 051 MUST NOT change storage keys, seeded identifiers, routes, Commerce ownership, Core ownership, cross-domain contracts, or lifecycle behavior.
- **FR-073**: Feature 051 MUST NOT alter the architecture Freeze, Accepted ADRs, Genesis, Design Intelligence, Execution standards, historical audits, or archived sources.
- **FR-074**: Creating this specification MUST NOT perform the reconciliation audit or create the master reconciliation report, matrices, inventories, protected register, or backlog outcomes.
- **FR-075**: The later audit MUST compare applicable UX, component, localization, accessibility, mock-data, frontend-first, refactoring, review, documentation, and Design Memory behavior with `docs/10-design-intelligence/` and `docs/11-execution/`, while treating those standards as subordinate to frozen architecture and never using them to redesign a protected surface.

### Key Entities *(include if feature involves data)*

These are documentation records produced by the later audit; they are not new runtime models or
canonical product data.

- **Audit Baseline**: The branch, commit, date, repository status, tool context, application/package manifest, and evidence cutoff to which all findings apply.
- **Implementation Surface**: An application, module, route, screen, provider, state model, workflow, component boundary, package, or test that receives one classification.
- **Reconciliation Finding**: A current observation joined to implementation evidence, authoritative expectation, classification, confidence, risk, and smallest recommended action.
- **Protected Surface**: Login or Register plus source, dependencies, protected behavior, approved exceptions, and Product Owner approval gate.
- **Route Interaction Record**: A route and its owner, visible result, actions, redirects, links, hardcoded destinations, handoffs, and documentation expectation.
- **State/Data-Flow Record**: A state or entity with owner, source, storage identity, readers, writers, persistence, relationships, alignment, sensitivity, and substitution impact.
- **Architecture Conflict**: A cited implementation/authority contradiction whose affected work stops until the named Governance or successor-feature action occurs.
- **Backlog Candidate**: A non-binding proposed feature traced to findings and describing value, reuse, gap, dependencies, risk, complexity, classification, application, and no-rewrite boundary.
- **Evidence Reference**: A source location, command result, test result, or reproducible observation with date/baseline and status; it never represents fabricated or assumed evidence.

## Constitution Requirements *(mandatory)*

### Authority and Ownership

- **Controlling authority**: `docs/99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md`, `docs/99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md`, and the other applicable milestone Freezes under `docs/99-architecture-freeze/`; Accepted ADR-001 through ADR-040, particularly ADR-001–004, ADR-018–026, and ADR-033–040; Genesis v1.1; and the approved milestone baselines. `docs/99-architecture-freeze/NEXORAXS-ARCHITECTURE-v1.x-COMPLETE.md` is a completion locator and status summary, not a replacement architecture authority.
- **Owning domain**: Documentation-only reconciliation has no product-domain write owner. Each inspected fact retains its frozen owner: Core for shared control/organization/commercial/platform facts, Commerce for Commerce operational facts, and the applicable owner for all other domains.
- **Canonical writes affected**: None. The feature reads repository evidence and later writes documentation only.
- **Projection/read-model impact**: None. Inventories and estimates are audit records, not runtime projections or sources of truth.
- **Deferred Decisions touched**: The unresolved successor to legacy `OSEnablement` under ADR-023, the unresolved Core Organization Registry write protocol under ADR-040, and any stable Deferred Decisions encountered in the controlling Freezes remain unresolved and may only be cited and stopped.

### Scope and Boundaries

- **Tenant context**: No tenant operation is performed. The audit must trace whether current behavior resolves Workspace, Business, Business Unit, Department, Branch, OS, and resource scope where applicable, while distinguishing legacy `BusinessUnit` compatibility from canonical architecture.
- **Authorization context**: No authorization behavior is changed. The audit records actor, OS, resource, action, client-provided context, owning-domain validation, and evidence gaps where applicable; browser mock behavior is not accepted as production authorization proof.
- **Cross-domain interaction**: No contract is introduced or changed. Existing imports, browser persistence, URL handoffs, query parameters, providers, facades, shared packages, and duplicated behavior are inspected against versioned-contract and ownership requirements.
- **OS independence**: The audit verifies that Commerce can perform its core workflow without another OS and that Core/Commerce lifecycle coupling does not transfer ownership; it does not implement a correction.
- **Lifecycle impact**: None. The audit compares existing behavior with distinct entitlement, subscription, installation, setup, configuration, activation, readiness, access, pause, archive, and removal concepts without defining a successor lifecycle.

### Intelligence and Product Quality

- **Capability/Knowledge/Rules/AI order**: No intelligence behavior is added. Any inspected intelligence or recommendation behavior must preserve the frozen Capability → Knowledge/Rules → Decision → Recommendation → optional implementation → human/owner-authorized execution order.
- **Explainability and human approval**: No recommendation or AI action is executed. Audit recommendations must expose evidence, uncertainty, risk, alternatives where material, and required human/Governance approval.
- **Arabic/English and direction**: The audit must assess applicable Arabic/English content, RTL/LTR direction, logical layout, mixed content, and user-entered data treatment for current user-facing surfaces; it must not modify copy or layout.
- **Accessibility**: The audit must record available evidence for keyboard operation, semantics, accessible names, focus, readable states, contrast/non-color cues, reflow, and assistive-technology behavior. Protected screens may be escalated only for a serious reproducible accessibility blocker and still require Product Owner approval before change.

### Security, Operations, and Compatibility

- **Security and privacy**: Inspection uses repository content and non-sensitive seeded/test state only. Reports must not expose secrets, real credentials, personal participant data, or unauthorized tenant data. Security concerns are documented with evidence, not exploited or fixed in this feature.
- **Audit and observability**: Product Audit records, logs, metrics, traces, and health behavior are not changed. The reconciliation report must record commands, evidence provenance, failures, dates, and correlation to the captured baseline.
- **Contract compatibility**: All routes, storage keys, seeded IDs, current public page/provider behavior, and compatibility state remain unchanged. Future recommendations must identify migration and backward-compatibility needs without implementing them.
- **Required test evidence**: Specification validation requires content review, unresolved-marker scan, repository diff review, and `git diff --check`. The later audit must use current automated tests, lint/type/build evidence, reproducible interaction checks, route/link inspection, state tracing, and applicable localization/accessibility evidence; unavailable validation remains blocked.
- **Documentation synchronization**: This command creates only `spec.md`, its specification-quality checklist, and the active feature pointer. The later audit is responsible for the approved reconciliation report and its internal traceability; architecture and historical documents remain unchanged.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the three current applications—Landing, Core Platform, and Commerce OS—appear in the captured baseline and application-by-application findings.
- **SC-002**: 100% of current route entries, dynamic routes, redirects, navigation destinations, and cross-application handoffs in the captured baseline receive a route-inventory record and one classification.
- **SC-003**: 100% of the in-scope Commerce areas named in FR-012 receive a module finding, including an explicit route/UI/interaction/persistence/relationship/state/test/ownership assessment or a documented non-applicable or blocked result.
- **SC-004**: 100% of the in-scope Core areas named in FR-011 receive a module finding with the same evidence-depth requirements.
- **SC-005**: Login and Register each appear in the protected implementation register with exact entry files, dependent surfaces, protected routes/behavior, critical-fix exceptions, and Product Owner approval requirement.
- **SC-006**: Zero working, architecture-compatible surfaces are recommended for replacement without cited evidence showing why preservation or incremental improvement cannot meet the need.
- **SC-007**: 100% of inventoried visible actions distinguish functional, visual-only, intentionally disabled, broken, redirected, or blocked-from-validation behavior.
- **SC-008**: 100% of identified browser-persisted state and operational relationships have a state/data-flow record identifying owner, source, storage identity, readers, writers, persistence, related modules, architecture alignment, migration sensitivity, and backend-substitution impact.
- **SC-009**: 100% of identified cross-application, cross-owner, and shared-package conflicts cite both implementation evidence and authoritative ownership/boundary evidence.
- **SC-010**: 100% of architecture conflicts use the stop-and-govern protocol; zero conflicts are silently resolved through an invented model, owner, lifecycle, contract, or default.
- **SC-011**: 100% of backlog candidates trace to actual reconciliation findings and include all fields required by FR-056.
- **SC-012**: 100% of recommended future features identify current implementation to reuse and include an explicit no-rewrite instruction.
- **SC-013**: The Feature 051 reconciliation change set contains zero modifications to application code, package code, routes, product tests, storage/schema files, frozen architecture, Design Intelligence, or historical audit documents.
- **SC-014**: Zero rewrite recommendations appear without concrete evidence that incremental preservation, extension, bounded refactoring, and governed migration are technically impossible.
- **SC-015**: 100% of module-matrix rows contain all required fields, and every percentage includes its evidence basis, numerator/denominator, exclusions, confidence, and limitation note.
- **SC-016**: The master report contains or links all five required supporting deliverables and every required report section from FR-051, with no unresolved evidence gap presented as passed.
- **SC-017**: The proposed priority order is reproducible from cited severity, business value, dependency, architecture, functional-depth, and risk evidence; no module is selected as next by assumption alone.
- **SC-018**: Independent reviewers can trace every recommendation from authoritative expectation to current evidence, classification, risk, and bounded future action without consulting undocumented assumptions.

## Assumptions

- The later audit uses a freshly captured repository commit as its evidence baseline; this
  specification does not freeze implementation facts beyond the scope needed to define the audit.
- Existing `docs/08-implementation-audit/` material, feature specifications, and evidence remain
  useful provenance but may be stale and require current-source verification.
- “Alignment percentage” and “functional-depth percentage” are transparent estimates for
  comparison and prioritization, not claims of mathematical certainty or product completeness.
- A finding can be **Blocked by Architecture** without blocking unrelated inventory work; only the
  affected boundary stops.
- Protected Login and Register status is a binding Product Owner decision supplied with this
  feature. No clarification is needed to preserve them.
- Proposed backlog feature numbers are planning labels only until a later feature is explicitly
  authorized and created through the repository workflow.
- The later audit may execute non-destructive build, lint, type, test, link, route, and journey
  validation to gather evidence, but it may not correct failures within Feature 051.
- Current browser mock behavior is valid implementation evidence and a compatibility surface, but
  it is not proof of production security, canonical persistence architecture, or future API shape.
- The final reconciliation report directory does not need to exist during specification creation;
  it is created only when the later audit is authorized and executed.
