# Implementation Plan: NexoraXS Implementation and Documentation Reconciliation

**Branch**: `051-implementation-documentation-reconciliation` | **Date**: 2026-07-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/051-implementation-documentation-reconciliation/spec.md`

**Planning boundary**: This is an executable documentation-audit plan. “Implementation” means
executing evidence collection and writing the approved reconciliation report. It never means
editing product code, routes, storage, tests, backend, architecture, Design Intelligence, or the
protected Login/Register surfaces.

## Summary

Feature 051 will compare authoritative documentation, current repository source, and reproducible
runtime behavior from one locked Git baseline. It will inventory Landing, Core Platform, Commerce
OS, in-scope shared packages, current routes/providers/mock state/tests, then trace functional
depth, reconcile architecture boundaries, apply one evidence-based classification per completed
surface, and produce one master report with a no-rewrite incremental backlog.

The audit uses current source first, isolated runtime behavior second, current command/test results
third, current feature evidence fourth, and historical evidence only after current verification.
Architecture expectations follow the repository authority order. Failures remain failed or
blocked; no failing behavior is corrected in Feature 051.

Core Platform Login and Register remain Product Owner-protected. The audit may inspect and document
them only as `Protected` or `Protected — Critical Fix Required`. Even a critical finding requires
separate explicit Product Owner approval before any future implementation.

## Technical Context

**Language/Version**: Markdown documentation and Bash command procedures; current repository
Node.js/TypeScript versions are evidence inputs re-recorded at audit execution (planning observation:
Node v24.15.0, TypeScript through current workspaces).

**Primary Dependencies**: Git, ripgrep, Node.js, pnpm 9.15.9, current Next.js applications,
TypeScript compiler, Turborepo, Playwright 1.61.0, Chromium, curl, and existing browser mock state.
No dependency is added by this feature.

**Storage**: One Markdown master report plus Feature 051 planning artifacts. Existing
localStorage/sessionStorage is observed only in disposable test contexts; no storage schema or data
is migrated.

**Testing**: Route/import/storage/URL/link scans; per-app lint and builds; strict TypeScript for
three apps and three packages; root lint/build; existing Core and Commerce Playwright suites;
isolated manual runtime walkthroughs; final product-scope status and whitespace checks.

**Target Platform**: Local repository and three current web applications on ports 3000, 3001, and
3002; Chromium for current automated/runtime evidence. Environment-specific unavailable checks are
BLOCKED, not replaced.

**Project Type**: Documentation-only evidence audit of a pnpm monorepo containing three Next.js
frontend applications and shared TypeScript packages.

**Performance Goals**: N/A for product performance because no runtime behavior changes. Audit
quality goals are full in-scope inventory, attributable command/runtime evidence, and zero hidden
unknowns or false precision. Existing performance tests run only as current evidence.

**Constraints**: Zero product-source or product-test edits; zero commits; no new routes, backend,
Laravel, API, SDK, database, Repository Pattern, storage migration, BusinessUnit rename, canonical
Business migration, architecture change, Design Intelligence change, historical rewrite, or
deprecated-file deletion. Preserve unrelated Feature 050 worktree files.

**Scale/Scope**: `apps/landing/`, `apps/core-platform/`, `apps/commerce/`, `packages/ui/`,
`packages/shared/`, `packages/types/`, `tests/`, current specs/evidence, and the authoritative
documentation corpus. Exact file/route/module counts are captured at audit baseline, not frozen by
the plan.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Required evidence | Result |
|---|---|---|
| Frozen authority | Controlling Freeze/Accepted ADR references; no unresolved contradiction | **PASS** — authority precedence and exact expectation records are defined from the milestone Freezes, ADR-001–040, Genesis, and approved baselines. The architecture-completion document is treated only as a locator/status summary. |
| Ownership | Owning domain, canonical facts, write models, and target validation are explicit | **PASS** — audit documentation has no canonical write. Current Core, Commerce, and other owner boundaries are assessed without transferring ownership. |
| Organization and tenancy | Workspace, Business, Business Unit, Department, Branch, OS, actor, and resource scope are explicit as applicable | **PASS** — the audit traces current context and authorization evidence while preserving legacy `BusinessUnit` compatibility and introducing no canonical model. |
| OS independence | No core workflow requires another OS; no direct cross-OS database/internal-state access | **PASS** — OS independence and direct/indirect coupling are explicit audit subjects; no correction or new dependency is introduced. |
| Knowledge and AI order | Capability/Knowledge/Rules/Business Brain/Recommendation/AI boundaries are preserved | **N/A to new behavior / PASS for inspection** — no intelligence behavior is added; any current intelligence behavior encountered is compared with the frozen order. |
| Lifecycle separation | Entitlement, Subscription, installation, setup, configuration, activation, readiness, and access remain distinct as applicable | **PASS** — ADR-018 and ADR-021–026 control the comparison; the unresolved `OSEnablement` successor remains unresolved. |
| Contracts and compatibility | Boundary contracts are owner-governed, versioned, and backward-compatible or have an approved migration | **PASS** — only a non-runtime report schema is designed. Routes, keys, seeded IDs, facades, state, and compatibility behavior remain unchanged. |
| Security and operations | Authorization, privacy, Audit, observability, failure, and recovery requirements are planned | **PASS** — synthetic test state, data minimization, exact provenance, command results, failures, and blockers are recorded; no secret or real participant evidence is collected. |
| Product quality | Arabic/English, RTL/LTR, accessibility, and measurable UX criteria are planned | **PASS** — current behavior is inspected and evidence status recorded without modifying UI. Protected surfaces retain the stricter Product Owner gate. |
| Verification | Risk-appropriate automated/manual tests cover invariants and acceptance scenarios | **PASS** — all current lint/type/build/Playwright gates and manual journeys are planned; missing coverage and failed/unavailable evidence remain visible. No new product test is authorized. |
| Documentation sync | Specs, tasks, contracts, and affected docs will change with implementation; deferrals remain unresolved | **PASS** — planning artifacts and the later master report are the only Feature 051 outputs. Frozen, historical, Design Intelligence, and Feature 050 artifacts remain unchanged. |

**Pre-research verdict**: **PASS** — no unresolved clarification or Constitution violation blocks
documentation-only research.

**Post-design verdict**: **PASS** — `data-model.md` contains audit-document entities only;
`contracts/reconciliation-report-contract.md` is explicitly non-runtime/non-API;
`quickstart.md` uses current non-destructive commands and disposable state; all Deferred Decisions,
compatibility surfaces, protected UI, and product code remain unchanged.

## Project Structure

### Documentation (this feature)

```text
specs/051-implementation-documentation-reconciliation/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── checklists/
│   └── requirements.md
├── contracts/
│   └── reconciliation-report-contract.md
└── tasks.md                              # Later /speckit.tasks output; not created here

docs/09-reconciliation/
└── NEXORAXS-IMPLEMENTATION-RECONCILIATION-v1.0.md
                                             # Later audit output; not created by /speckit.plan
```

### Source and Evidence Inputs (read-only)

```text
apps/
├── landing/
├── core-platform/
└── commerce/

packages/
├── ui/
├── shared/
└── types/

tests/
└── e2e/

docs/
├── 00-governance/
├── 01-genesis/
├── 02-core-platform/ ... 07-global-platform/
├── 08-implementation-audit/
├── 10-design-intelligence/
├── 11-execution/
└── 99-architecture-freeze/

specs/                                      # Existing specs and current evidence
.specify/memory/constitution.md
AGENTS.md
playwright.config.ts
playwright.core.config.ts
package.json
pnpm-workspace.yaml
turbo.json
```

**Structure Decision**: Use one Feature 051 planning directory and, during later audit execution,
one master report. Inspect all product and authority paths read-only. Do not add a source directory,
test harness, report-per-module file set, or product abstraction.

## Complexity Tracking

No Constitution violation or exceptional implementation complexity is required. The single report
and single documentation contract are the simplest structures that preserve traceability.

## Evidence and Record Strategy

### Baseline rule

Every record references one locked AuditBaseline. Initial dirty state is an explicit allow-list,
including unrelated Feature 050 closure paths. Source changes after lock make the baseline stale;
they do not silently update prior findings.

### Evidence rule

Keep AuthorityExpectation and EvidenceRecord separate. Source, runtime, current commands/tests,
current feature evidence, and historical references use distinct evidence IDs. A test file's
existence is not a pass; the executed current result must be recorded. Source/runtime disagreement
is preserved and lowers or blocks confidence.

### Report rule

Write evidence directly into the master report's structured registers. Generated `.next`,
`.turbo`, `test-results`, and `playwright-report` outputs may support a result but are not committed
as additional Feature 051 documentation. Screenshots are optional, concise, anonymous, and kept
outside the repository unless a reviewer establishes a material need.

### Failure rule

No command, route, interaction, or requirement is repaired by Feature 051. Record exact failure or
BLOCKED evidence, affected acceptance criteria, limitation, and smallest future governed action.
Do not weaken thresholds or substitute a different test/configuration.

## Audit Execution Plan

### Phase 0 — Baseline Isolation

**Goal**: Establish an immutable, reproducible evidence boundary and isolate unrelated work.

**Inputs**: Current branch/HEAD, worktree, package manifests, repository scripts, Feature 051 spec,
and existing Feature 050 uncommitted paths.

**Procedure**:

1. Capture branch, full SHA, commit timestamp/subject, audit date/timezone, Node/pnpm/Playwright/Git/
   ripgrep versions, and workspace package list.
2. Capture exact `git status` including untracked files, tracked diff names, and untracked names.
3. Record all pre-existing unrelated paths in the baseline allow-list. Do not stash, stage, reset,
   delete, rename, or copy them into Feature 051.
4. Capture application/package manifests and every current script.
5. Capture the current source/route manifest and assign one baseline ID.
6. Lock the baseline. Define delta-review handling before any runtime observation.

**Output**: Audit Baseline section and baseline evidence records in the later master report.

**Exit gate**:

- branch/SHA/date/tooling/status/manifests are complete;
- Feature 050 paths are explicitly excluded;
- one baseline is locked; and
- no product path changed during capture.

### Phase 1 — Repository Static Inventory

**Goal**: Inventory every current implementation surface without inferring runtime functionality.

**Procedure**:

1. Enumerate all files under Landing, Core, Commerce, UI/shared/types packages, tests, and current
   specs/evidence.
2. Derive routes from App Router page/layout/route/error/loading/not-found files, including route
   groups and dynamic segments.
3. Inventory navigation, redirects, calls to action, links, visible controls, disabled/placeholder
   markers, route guards, and cross-application handoffs.
4. Inventory components, shells, providers, facades, context switchers, state selectors, browser
   persistence, exact storage keys, seed IDs, readers, writers, and current compatibility code.
5. Inventory dependencies and import direction, including direct app-to-app imports and indirect
   URL/query/storage/shared-package coupling.
6. Inventory hardcoded origins, duplicated shell/control behavior, deprecated names, tests,
   Playwright configuration, and evidence artifacts.
7. Create provisional ImplementationSurface, RouteInteractionRecord, and StateDataFlowRecord rows.
   Do not classify runtime behavior from source presence alone.

**Output**: Repository implementation map, static route candidates, state/data-flow candidates,
and source evidence register.

**Exit gate**:

- all three applications and three in-scope packages are represented;
- every current route entry and navigation target is represented;
- all visible controls/providers/storage boundaries/tests are accounted for or explicitly blocked;
- no finding relies only on a text match; and
- no source was modified.

### Phase 2 — Authoritative Expectation Extraction

**Goal**: Build a traceable, precedence-correct expectation register.

**Procedure**:

1. Read the applicable milestone Freezes first, then Accepted ADRs/glossary, Genesis, milestone
   baselines, Constitution, and subordinate implementation/design guidance.
2. Create one atomic expectation per applicable owner, hierarchy, lifecycle, contract, quality, or
   compatibility requirement with exact path and heading/ADR locator.
3. Record applicability, canonical owner/scope, organization/lifecycle context, evidence required,
   and Deferred Decision status.
4. Consolidate repeated requirements without duplicate scoring weight.
5. Keep proposals/reviews/historical specs/audits as provenance only and revalidate them against
   current source.
6. Exclude archives from the expectation register; any provenance mention is labelled
   non-authoritative.

**Output**: Authoritative expectation register linked to implementation surfaces.

**Exit gate**:

- every architecture comparison has an exact controlling source;
- every selected expectation has applicability and owner/scope;
- unresolved `BusinessUnit` migration, organization write protocol, `OSEnablement` successor, and
  other Deferred Decisions remain unresolved; and
- no archive or unfinished proposal has created product scope.

### Phase 3 — Runtime Journey Validation

**Goal**: Observe current behavior non-destructively in isolated browser state.

**Preconditions**:

- baseline remains locked;
- required dependencies/browser are available;
- ports are checked without terminating unrelated processes;
- current lint/build/type gates and existing suites are run and recorded; and
- a disposable `/tmp` browser profile or isolated Playwright context is used.

**Procedure**:

1. Run exact lint, build, strict TypeScript, Core Playwright, and Commerce Playwright commands from
   `quickstart.md`. Record current results; do not add/fix a test or config.
2. Start Landing, Core, and Commerce on their current ports using existing scripts.
3. Perform source/HTTP/browser link checks and record client redirects/final destinations.
4. Walk Landing to Core; authentication/recovery; Core onboarding/Workspace; Product Hub; Commerce
   setup/onboarding; dashboard; Products; inventory; customers; sales/POS; orders/invoices/payments;
   reports; settings/tax/discount/document controls; Branches; transfers; and returns/exchanges
   where present.
5. Open dynamic routes through generated links, never fabricated IDs.
6. Record each action as functional, visual-only, intentionally disabled, redirected, broken, or
   blocked from validation.
7. Record relevant browser-state keys and before/after facts with data minimization; do not clear a
   regular profile or treat browser state as production authorization.
8. Inspect Login and Register read-only as Protected. A possible critical issue must meet one exact
   category and still record the Product Owner implementation gate.
9. Record applicable English/Arabic, LTR/RTL, theme, responsive, keyboard/focus,
   loading/empty/error/success/recovery, and console observations without improving them.

**Output**: RuntimeJourney, action, command/test, link, accessibility/localization, and state
evidence records.

**Exit gate**:

- every required journey has current evidence or an explicit blocker;
- Login/Register have only protected treatment;
- runtime state is confined to disposable contexts;
- no product/config/test file changed; and
- every failed/unavailable observation remains failed/BLOCKED.

### Phase 4 — Functional-Depth Tracing

**Goal**: Determine whether each module is merely present or operationally connected.

**Procedure**:

1. For each module create atomic checks for route, rendered UI, interaction, persistence, each
   applicable CRUD operation, related-module flow, applicable UI states, operational/decorative
   data, dependent-view reactivity, visible actions, tests, and architecture ownership.
2. Trace Product creation -> persistence -> inventory -> POS/sale -> stock effect ->
   dashboard/report effect.
3. Trace equivalent applicable chains for onboarding/handoff, customer-to-sale/order history,
   Branch/inventory/transfer movement, sale/order/invoice/payment/return, and settings/tax/document
   effects.
4. Distinguish absent route, embedded capability, visual-only control, intentional deferral,
   broken behavior, and blocked validation.
5. Link every check to current evidence and applicable expectation; do not count a visible screen
   as completion.

**Output**: Complete ModuleAssessment records and functional-depth atomic checks.

**Exit gate**:

- every in-scope Core and Commerce area has a complete, N/A-with-reason, or BLOCKED assessment;
- every Landing route/action has appropriate depth evidence;
- every current data relationship is traced or explicitly unknown/blocked; and
- dashboards/reports are assessed against actual operational changes where evidence permits.

### Phase 5 — Architecture Reconciliation

**Goal**: Compare current implementation with frozen ownership and compatibility rules without
implementing a compromise.

**Required comparisons**:

- canonical `Workspace -> Business -> Business Unit -> Department / Branch` hierarchy;
- Core shared control/organization/commercial ownership;
- Commerce operational ownership;
- independent OS lifecycle and Commerce core usability;
- Product Hub composition, handoff, and no OS setup ownership;
- one canonical owner per operational fact;
- no direct app-to-app source imports;
- indirect coupling through URLs, query state, browser storage, providers, shared packages, and
  duplicated shell behavior;
- legacy `BusinessUnit` compatibility without migration;
- unresolved `OSEnablement` successor and organization write protocol; and
- frontend-first mock/facade path for future Laravel substitution without page rewrites.

**Conflict procedure**:

1. cite implementation evidence;
2. cite exact controlling authority and tier;
3. explain the mismatch;
4. apply an allowed classification;
5. record risk and affected boundary;
6. preserve compatibility and stop only that boundary;
7. identify the smallest governed future action and explicit stop condition; and
8. omit all compromise implementation.

**Output**: Architecture conflict register and architecture-alignment atomic checks.

**Exit gate**:

- every conflict has dual-source evidence, risk, governed action, and stop condition;
- evidence unavailability is not mislabeled as an architecture blocker;
- Deferred Decisions remain unresolved; and
- independent audit work continues outside stopped boundaries.

### Phase 6 — Classification and Scoring

**Goal**: Apply one exclusive classification and transparent estimates without false precision.

**Allowed classifications**:

```text
Protected
Protected — Critical Fix Required
Keep
Improve
Complete
Refactor
Defer
Blocked by Architecture
```

**Procedure**:

1. Apply the protected constraint before ordinary classification.
2. Classify architecture-blocked work only when missing authority/Governance/migration approval or
   a successor specification is genuinely required.
3. Score atomic alignment and functional-depth checks as SATISFIED, VIOLATED, UNKNOWN, BLOCKED, or
   N/A.
4. Compute and show the raw satisfied/known fraction, whole-number estimate or N/E, evaluation
   coverage, exclusions, unknowns, blocked checks, confidence, and limitation note.
5. Use separate atomic checks instead of half-points for partial behavior.
6. Assign confidence HIGH, MEDIUM, LOW, or BLOCKED from current evidence quality and material gaps.
7. Keep score, classification, priority, and evidence status distinct.
8. If classification-determining evidence remains blocked, block the surface and applicable success
   criterion instead of guessing.

**Output**: Final surface classifications, alignment/functional-depth ScoreCards, confidence, and
limitations.

**Exit gate**:

- every completed surface has exactly one allowed classification;
- both protected routes use only the two protected classes;
- every percentage has the required fraction/check/coverage/confidence disclosures;
- no score mechanically assigns classification; and
- unknown or blocked evidence remains visible.

### Phase 7 — Master Deliverable Assembly

**Goal**: Produce one traceable reconciliation report without excessive files.

**Procedure**:

1. Create only
   `docs/09-reconciliation/NEXORAXS-IMPLEMENTATION-RECONCILIATION-v1.0.md` unless a later reviewer
   establishes a readability need for a linked support file.
2. Follow `contracts/reconciliation-report-contract.md` section order and schemas.
3. Include repository map, expectation register, protected register, application/module findings,
   module matrix, route/interaction inventory, state/data-flow inventory, conflict register,
   test/evidence register, UX/design/test debt and compatibility risks, and limitations.
4. Complete FR/SC-to-evidence traceability and retain failed/BLOCKED requirements.
5. Record the evidence cutoff and baseline status; do not imply the report remains current after
   source changes.
6. Verify no final-report statement invents observations, approvals, participants, performance,
   accessibility, or runtime outcomes.

**Output**: The later master reconciliation report. This plan command does not create it.

**Exit gate**:

- all required sections/fields exist;
- all claims trace to current evidence or are explicitly labelled inference/estimate/block;
- protected and architecture gates are intact;
- no excessive documentation files are added; and
- the report passes whitespace, link, classification, and scope scans.

### Phase 8 — Evidence-Based Incremental Backlog

**Goal**: Rank the smallest future features from actual gaps while preserving reusable code.

**Priority tiers**:

1. broken critical journeys;
2. architecture boundary conflicts;
3. incomplete revenue-generating workflows;
4. disconnected operational flows;
5. MVP-required visual-only modules;
6. bounded quality improvements; and
7. deferred platform capabilities.

**Procedure**:

1. Create candidates only after comparative findings are complete.
2. Give each candidate a non-binding, collision-checked proposed number that reserves no branch or
   directory.
3. Include title, business value, finding/evidence references, current code/behavior reused, exact
   gap, dependencies, risk, estimated complexity, source classification, affected application,
   and the literal instruction **no rewrite**.
4. Keep candidates bounded by concern. Do not combine architecture, backend, migration, and UX work
   merely to reduce feature count.
5. Do not select Dashboard, Products, or any named module as next without comparative evidence.
6. Exclude protected-screen polish. A verified protected critical finding remains approval-gated.

**Output**: Prioritized non-binding backlog section in the later master report.

**Exit gate**:

- every candidate traces to actual findings;
- every candidate names reusable implementation and says **no rewrite**;
- numbering is non-binding and collision-checked;
- the seven-tier ordering is applied; and
- no backlog item silently implements or resolves a stopped architecture boundary.

## Validation Strategy

The exact commands and runtime procedure are in [quickstart.md](./quickstart.md). Required evidence
categories are:

| Category | Planned evidence | Failure treatment |
|---|---|---|
| Baseline | Git branch/SHA/status, dates, tools, package/route/script manifests | Baseline remains unlocked/BLOCKED |
| Static inventory | Route/navigation/control/import/storage/provider/URL/compatibility scans | Record scan/inspection failure; do not add tooling |
| Lint | Landing, Core, Commerce, and root lint | FAIL; document only |
| Strict TypeScript | Landing, Core, Commerce, UI, Shared, and Types `tsc --noEmit` | FAIL; document only |
| Builds | Landing, Core, Commerce, and root build | FAIL; document only |
| Core automated | Existing shell and performance suites with Core config | FAIL/BLOCKED; no config/test change |
| Commerce automated | Existing Commerce 044 suite with current headed config | FAIL/BLOCKED if display unavailable |
| Landing runtime | Source, HTTP, console, responsive/link/action manual evidence | BLOCKED where manual evidence unavailable |
| Runtime journeys | Isolated current journeys and action classifications | Broken/BLOCKED; no product correction |
| Functional depth | Before/after state and cross-module traces | Unknown/BLOCKED reduces coverage/confidence |
| Architecture | Dual-source expectation/evidence comparison | Stop affected boundary; no compromise |
| Report | Contract completeness, links, trace, scope, classifications | Report remains BLOCKED |
| Repository isolation | Product-scoped status/diff, `git diff --check`, untracked-report whitespace check | BLOCKED; do not repair unrelated files |

HTTP status is supporting evidence only; browser activation proves client-side destinations and
guards. Screenshots are optional evidence, not design proposals. No new test or product source is
created to fill coverage gaps.

## Security, Privacy, and Evidence Handling

- Use deterministic synthetic seed data and disposable browser profiles.
- Record only fields necessary to prove scope, persistence, and relationships.
- Do not expose real credentials, customer data, participant identities, or secrets.
- Browser identifiers are evidence of current mock behavior, never proof of production
  authorization.
- Record source paths, commands, timestamps, exit codes, environment, evidence status, limitations,
  and reviewer role for traceability.
- Treat console, test, build, and runtime output as evidence, not a new operational Audit system.

## Documentation-Only Recovery and Rollback

Feature 051 has no product deployment, migration, or product rollback. If evidence is incorrect:

1. retain the earlier evidence record;
2. append a correction or superseding record;
3. state why the earlier result changed;
4. re-evaluate affected findings/scores/classifications;
5. keep affected criteria BLOCKED until review completes; and
6. never use product code or destructive Git commands as an audit correction.

Ignored build/test artifacts do not change product source. An unexpected tracked product change
stops the audit and is reported; Feature 051 does not fix or commit it.

## Phase and Requirement Traceability

| Spec scope | Planned phase/output |
|---|---|
| FR-001–009 audit/evidence boundary | Phase 0 baseline; EvidenceRecord contract; failure rule |
| FR-010–017 repository/application coverage | Phase 1 implementation map and inventories |
| FR-018–021 classifications | Phase 6 classification and completion gate |
| FR-022–027 protected surfaces | Phases 1 and 3 dependency/runtime trace; protected register |
| FR-028–035 functional depth | Phase 4 ModuleAssessment and relationship traces |
| FR-036–039 state/substitution | Phases 1, 4, and 5 state/data-flow inventory |
| FR-040–049 architecture/conflicts | Phases 2 and 5 expectation/conflict registers |
| FR-050–060 report/scoring | Phases 6 and 7; report contract |
| FR-061–067 incremental backlog | Phase 8 backlog |
| FR-068–075 non-scope/design/execution | All phase gates; final product-scope diff |
| SC-001–018 | Phase 7 FR/SC trace and final audit conclusion |

## Planning Completion Gate

Planning is complete when:

- `plan.md`, `research.md`, `data-model.md`, `quickstart.md`, and the single report contract exist;
- all artifacts are documentation-only and contain no unresolved clarification marker;
- the post-design Constitution Check remains PASS;
- AGENTS points to this Feature 051 plan;
- the final reconciliation report has not been created early;
- product, architecture, Design Intelligence, historical audit, and Feature 050 files were not
  changed by planning;
- `git diff --check` and explicit untracked-artifact whitespace checks pass; and
- no commit is created.
