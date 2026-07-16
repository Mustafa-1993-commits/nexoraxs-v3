# Feature 051 Audit Documentation Data Model

## Purpose and Boundary

This model defines the documentation records used by the Feature 051 reconciliation audit. It is
not a product-domain model, database schema, API model, TypeScript contract, or migration design.
It creates no canonical Business, Business Unit, lifecycle, authorization, or operational state.

All records are rendered in or linked from the single master report at
`docs/09-reconciliation/NEXORAXS-IMPLEMENTATION-RECONCILIATION-v1.0.md` unless a later audit finds
that a supporting artifact is strictly necessary for readability.

## Relationship Overview

```text
AuditBaseline
  ├── AuthorityExpectation
  ├── EvidenceRecord
  ├── RuntimeJourney
  └── ImplementationSurface
        ├── ModuleAssessment
        ├── RouteInteractionRecord
        ├── StateDataFlowRecord
        ├── ProtectedSurface
        └── ReconciliationFinding
              ├── ScoreCard
              ├── ArchitectureConflict (optional)
              └── BacklogCandidate (zero or more)
```

Every record references one Audit Baseline. Evidence and expectations may support multiple
surfaces and findings through stable record identifiers. A completed surface has exactly one
classification.

## Entities

### 1. AuditBaseline

Represents the immutable repository state to which all audit results apply.

| Field | Required | Description |
|---|---|---|
| `baseline_id` | Yes | Stable Feature 051 identifier, such as `F051-BASE-001`. |
| `branch` | Yes | Current branch captured at audit start. |
| `commit_sha` | Yes | Full Git commit SHA. |
| `audit_started_at` | Yes | ISO-8601 timestamp and timezone. |
| `audit_cutoff_at` | Yes | ISO-8601 evidence cutoff timestamp. |
| `node_version` | Yes | Observed Node version. |
| `pnpm_version` | Yes | Observed pnpm version. |
| `playwright_version` | Yes or Blocked | Observed local Playwright version or blocked reason. |
| `working_tree_status` | Yes | Exact initial `git status --short --branch` result. |
| `unrelated_uncommitted_paths` | Yes | Paths present before Feature 051 execution, including Feature 050 closure artifacts. |
| `application_package_manifest` | Yes | In-scope applications/packages and manifest sources. |
| `route_manifest` | Yes | Current route/layout/handler entry inventory. |
| `script_manifest` | Yes | Current repository and application scripts. |
| `status` | Yes | `CAPTURED`, `LOCKED`, `STALE`, or `SUPERSEDED`. |
| `limitations` | Yes | Environment or evidence limitations. |

Validation rules:

- One report uses one locked baseline.
- Existing unrelated changes are recorded, never stashed, deleted, reverted, or presented as
  Feature 051 output.
- A source change after lock marks the baseline `STALE`; it requires a documented delta review or
  a new baseline, not a silent refresh.

### 2. AuthorityExpectation

Represents one atomic, applicable expectation from authoritative documentation.

| Field | Required | Description |
|---|---|---|
| `expectation_id` | Yes | Stable identifier, such as `F051-EXP-001`. |
| `authority_tier` | Yes | Freeze; Governance/Accepted ADR/Glossary; Genesis; milestone baseline; Constitution; or lower implementation guidance. |
| `canonical_path` | Yes | Repository-relative source path. |
| `locator` | Yes | Heading, section, ADR decision, or precise line locator. |
| `expectation` | Yes | Concise requirement without reinterpretation. |
| `owner_scope` | Yes | Applicable Core, Commerce, shared, organization, lifecycle, or quality boundary. |
| `applicability` | Yes | `APPLICABLE`, `NOT_APPLICABLE`, `DEFERRED`, or `CONFLICTING_AUTHORITY`. |
| `deferred_status` | Yes | Stable Deferred Decision identifier/status where present, otherwise `N/A`. |
| `surface_ids` | Yes | Linked implementation surfaces. |
| `notes` | Yes | Precedence or interpretation limits. |

Validation rules:

- Archived files cannot create AuthorityExpectation records.
- Historical proposals and audits may explain provenance but cannot override their controlling
  Freeze.
- Duplicate wording from several authorities becomes one atomic expectation with multiple source
  references, not extra scoring weight.

### 3. EvidenceRecord

Represents one current, reproducible item of implementation evidence.

| Field | Required | Description |
|---|---|---|
| `evidence_id` | Yes | Stable identifier, such as `F051-EVD-001`. |
| `baseline_id` | Yes | The immutable audit baseline. |
| `evidence_type` | Yes | `SOURCE`, `RUNTIME`, `COMMAND`, `AUTOMATED_TEST`, `MANUAL_OBSERVATION`, `CURRENT_FEATURE_EVIDENCE`, or `HISTORICAL_REFERENCE`. |
| `surface_ids` | Yes | One or more linked surfaces. |
| `source_or_command` | Yes | File/line, exact command, or named journey. |
| `environment` | Yes | App, URL, browser, locale, theme, viewport, seeded state, or N/A. |
| `observed_result` | Yes | Concise unembellished observation. |
| `result` | Yes | `PASS`, `FAIL`, `BLOCKED`, or `N/A`. |
| `collected_at` | Yes | ISO-8601 timestamp. |
| `reviewer` | Yes | Accountable reviewer or audit role. |
| `artifact_reference` | Yes | Report section, test artifact, or `N/A`. |
| `limitations` | Yes | Missing channels, environmental limits, or interpretation constraints. |
| `supersedes` | No | Earlier evidence ID when a rerun is necessary. |

Validation rules:

- Source, runtime, tests/commands, current feature evidence, and historical evidence remain
  distinct.
- Historical evidence alone cannot prove a current finding.
- A rerun appends a superseding record and preserves the earlier failure/block.
- No participant, accessibility, runtime, build, test, or approval evidence may be invented.

### 4. RuntimeJourney

Defines one non-destructive journey and its action-level observations.

| Field | Required | Description |
|---|---|---|
| `journey_id` | Yes | Stable identifier. |
| `name` | Yes | Landing/Core/Commerce journey name. |
| `start_url` | Yes | Exact local URL. |
| `seeded_starting_state` | Yes | Disposable test context and relevant IDs/keys. |
| `preconditions` | Yes | Required running applications and state. |
| `steps` | Yes | Ordered actions. |
| `action_results` | Yes | One allowed ActionResult per action. |
| `state_before_after` | As applicable | Exact read-only snapshot references. |
| `evidence_ids` | Yes | Linked current evidence. |
| `limitations` | Yes | Unavailable or unverified portions. |

### 5. ImplementationSurface

Represents an application, package, module, route, screen, component boundary, provider, state
model, workflow, or test surface.

| Field | Required | Description |
|---|---|---|
| `surface_id` | Yes | Stable identifier. |
| `surface_type` | Yes | `APPLICATION`, `PACKAGE`, `MODULE`, `ROUTE`, `SCREEN`, `PROVIDER`, `STATE_MODEL`, `WORKFLOW`, or `TEST`. |
| `name` | Yes | Human-readable label. |
| `owning_application_domain` | Yes | Landing, Core, Commerce, shared presentation/contracts, or documented owner. |
| `source_paths` | Yes | One or more repository-relative paths. |
| `route` | As applicable | Route or `N/A`. |
| `expectation_ids` | Yes | Applicable expectation references. |
| `evidence_ids` | Yes | Current evidence references. |
| `classification` | At completion | Exactly one allowed Feature 051 classification. |
| `status` | Yes | `INVENTORIED`, `EVIDENCE_COLLECTED`, `SCORED`, `CLASSIFIED`, `REVIEWED`, `BLOCKED`, or `STALE`. |

### 6. ModuleAssessment

Records functional depth for one module surface.

Required attributes are: application, module, source paths, current route, current implementation
status, documentation expectation, alignment ScoreCard, functional-depth ScoreCard,
classification, missing behavior, architecture conflict, recommended action, priority,
dependencies, risk, and protected status.

The assessment also identifies atomic checks for route, UI, interaction, persistence, applicable
CRUD operations, related-module flow, applicable UI states, operational/decorative data,
dashboard/report reactivity, visible actions, test evidence, and architecture ownership.

### 7. RouteInteractionRecord

Records one current route and its interactions.

Required attributes are: route, owning application, entry path, route status, visible page,
functional actions, visual-only actions, intentionally disabled actions, redirects, broken links,
hardcoded application URLs, cross-application handoff, documented expectation, evidence IDs, and
classification.

### 8. StateDataFlowRecord

Records one state/entity flow without redefining the state.

Required attributes are: state/entity label, authoritative owner, current source, exact storage
key or N/A, readers, writers, persistence behavior, related modules, architecture alignment,
migration sensitivity, future backend-substitution impact, evidence IDs, and limitations.

Storage keys and seeded identifiers are transcribed exactly; they are never normalized or
renamed by the audit.

### 9. ProtectedSurface

A constrained subtype for Core Login and Register.

| Field | Required | Description |
|---|---|---|
| `surface_id` | Yes | Linked Login or Register surface. |
| `route` | Yes | `/login` or `/register`. |
| `entry_file` | Yes | Exact protected page source. |
| `dependent_sources` | Yes | Components, styles, assets, providers, and journey dependencies discovered through tracing. |
| `protected_behavior` | Yes | Visual, route, responsive, and journey characteristics from the Product Owner decision. |
| `classification` | Yes | Only `Protected` or `Protected — Critical Fix Required`. |
| `critical_category` | Conditional | One approved category or `N/A`. |
| `critical_evidence_ids` | Conditional | Reproducible evidence or `N/A`. |
| `approval_gate` | Yes | Explicit Product Owner approval required before any implementation. |

### 10. ReconciliationFinding

Joins one current observation to authority, evidence, classification, risk, and bounded future
action.

Required attributes are: finding ID, surface, observation, expectation IDs, evidence IDs,
classification, classification rationale, risk/severity, compatibility impact, smallest future
action or no action, stop condition, confidence, and limitations.

### 11. ArchitectureConflict

Represents a verified implementation/authority conflict whose affected boundary must stop.

Required attributes are: conflict ID, linked finding/surface, implementation evidence,
controlling expectation/authority, conflict explanation, risk, classification, smallest governed
future action, affected boundary, and explicit stop condition. It cannot contain a compromise
model or transition to resolved during Feature 051.

### 12. ScoreCard

Records transparent alignment or functional-depth scoring.

| Field | Required | Description |
|---|---|---|
| `score_type` | Yes | `ALIGNMENT` or `FUNCTIONAL_DEPTH`. |
| `checks` | Yes | Atomic check IDs and evidence/expectation references. |
| `satisfied` | Yes | Count of `SATISFIED` checks. |
| `violated` | Yes | Count of `VIOLATED` checks. |
| `unknown` | Yes | Count and IDs of `UNKNOWN` checks. |
| `blocked` | Yes | Count and IDs of `BLOCKED` checks. |
| `not_applicable` | Yes | Count and rationale for `N/A` checks. |
| `fraction` | Yes | `SATISFIED / (SATISFIED + VIOLATED)` or `N/E`. |
| `percentage` | Yes | Whole-number estimate or `N/E`. |
| `evaluation_coverage` | Yes | Known checks over known + unknown + blocked. |
| `confidence` | Yes | `HIGH`, `MEDIUM`, `LOW`, or `BLOCKED`. |
| `limitation_note` | Yes | Plain-language caution against false precision. |

### 13. BacklogCandidate

Represents one non-binding future feature proposal.

Required attributes are: proposed number, title, priority tier 1–7, business value, finding and
evidence references, current code/behavior to reuse, exact gap, dependencies, risk, estimated
complexity, source classification, affected application, and the literal instruction **no
rewrite**.

The proposed number is collision-checked at audit time but creates no branch, directory,
reservation, or implementation authority.

## Enumerations and Invariants

### Allowed final classifications

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

- Every completed surface has exactly one classification.
- `Unknown` and environmental `Blocked` are evidence/status results, not classifications.
- A classification-determining evidence gap blocks the surface and the applicable success
  criterion rather than forcing a guess.
- Scores inform review but do not mechanically assign classification or priority.

### Allowed action results

```text
functional
visual-only
intentionally-disabled
redirected
broken
blocked-from-validation
```

### Evidence and audit state transitions

```text
AuditBaseline: DRAFT -> CAPTURED -> LOCKED -> STALE -> SUPERSEDED
EvidenceRecord: PLANNED -> COLLECTED -> VERIFIED
                              \-> FAILED
                              \-> BLOCKED
ImplementationSurface: INVENTORIED -> EVIDENCE_COLLECTED -> SCORED -> CLASSIFIED -> REVIEWED
                                           \-> BLOCKED
ArchitectureConflict: CANDIDATE -> VERIFIED -> GOVERNANCE_REQUIRED
BacklogCandidate: PROPOSED -> RANKED
```

Feature 051 never transitions an ArchitectureConflict to resolved or a BacklogCandidate to
approved/implemented.

## Scoring Rules

### Architecture alignment

Atomic expectation checks use `SATISFIED`, `VIOLATED`, `UNKNOWN`, `BLOCKED`, or `N/A`.

```text
alignment = SATISFIED / (SATISFIED + VIOLATED) × 100
coverage  = (SATISFIED + VIOLATED) /
            (SATISFIED + VIOLATED + UNKNOWN + BLOCKED) × 100
```

When the alignment denominator is zero, the score is `N/E` rather than 0% or 100%. Unknown,
blocked, and N/A checks are always listed even though they do not enter the alignment denominator.

### Functional depth

Functional-depth checks use the same statuses and formula. Partial behavior is represented by
separate atomic checks rather than hidden half-points. Applicable CRUD operations, UI states, and
visible actions each receive their own checks, so module denominators may differ and must always be
shown.

### Confidence

- **HIGH**: All classification-determining claims have current source evidence plus applicable
  runtime/test corroboration, with no material unknown or blocked check.
- **MEDIUM**: Determining claims have current source evidence and behavioral claims have current
  corroboration where feasible; remaining gaps are non-material.
- **LOW**: The classification remains supportable but depends primarily on static evidence or
  inference, or material non-determining gaps remain.
- **BLOCKED**: A classification-determining claim cannot be verified or current evidence
  materially contradicts.

Historical evidence alone can never produce confidence above LOW.

## Completion Validation

The data set is complete only when:

1. every required surface is inventoried;
2. every final surface has exactly one classification;
3. every finding references current evidence and applicable authority;
4. every protected surface obeys its constrained classification and approval gate;
5. every percentage displays fraction, checks, exclusions, unknowns, coverage, confidence, and a
   limitation note;
6. every architecture conflict has a stop condition and no compromise implementation;
7. every backlog item traces to findings and reusable implementation; and
8. all blocked evidence remains blocked in the final decision.
