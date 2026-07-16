# Feature 051 Reconciliation Report Contract

## Contract Status and Scope

This documentation contract defines the required structure and record formats for the later
Feature 051 audit report. It is not an API, SDK, database, TypeScript, runtime, or product-domain
contract. It authorizes no product code change.

**Required report path**:
`docs/09-reconciliation/NEXORAXS-IMPLEMENTATION-RECONCILIATION-v1.0.md`

The report SHOULD remain one Markdown file. Supporting files are allowed only when necessary for
readability and must be linked from the master report. Generated build/test output is evidence,
not a committed supporting report.

## Normative Report Order

1. Report identity, status, baseline, and evidence cutoff
2. Executive summary and release-neutral audit conclusion
3. Method, evidence hierarchy, authority order, scoring, and limitations
4. Repository implementation map
5. Authoritative expectation register
6. Protected implementation register
7. Application-by-application and module findings
8. Module reconciliation matrix
9. Route and interaction inventory
10. State and data-flow inventory
11. Architecture conflict register
12. Test and evidence register
13. UX/design findings, technical debt, compatibility risks, and blocked evidence
14. Prioritized incremental backlog
15. FR/SC-to-evidence traceability
16. Final blockers and audit conclusion

## Record Identifier Convention

| Record | Prefix |
|---|---|
| Audit baseline | `F051-BASE-###` |
| Authority expectation | `F051-EXP-###` |
| Implementation surface | `F051-SURF-###` |
| Evidence | `F051-EVD-###` |
| Runtime journey | `F051-JRN-###` |
| Finding | `F051-FND-###` |
| Architecture conflict | `F051-CON-###` |
| Score card | `F051-SCORE-###` |
| Backlog candidate | `F051-BLG-###` |

Identifiers are stable within report v1.0. Corrections append or supersede records; they do not
renumber evidence to hide a failed or blocked result.

## Evidence and Authority Rules

### Implementation evidence precedence

1. Current source code
2. Reproducible runtime behavior
3. Current automated tests and command results
4. Current feature evidence
5. Historical specifications/audits after current verification

The hierarchy establishes freshness and precedence, but an evidence channel cannot prove a claim
outside its scope. Source proves structure; runtime proves observed behavior; commands/tests prove
their exact assertions. Contradictions remain visible and lower or block confidence.

### Architecture expectation precedence

1. `docs/99-architecture-freeze/`
2. `docs/00-governance/`, including Accepted ADRs and glossary
3. `docs/01-genesis/`
4. approved milestone baselines under `docs/02-core-platform/` through
   `docs/07-global-platform/`
5. `.specify/memory/constitution.md`
6. `AGENTS.md`, Feature specs/evidence, Design Intelligence, and Execution guidance as applicable

`docs/archives/` may appear only as a record explicitly labelled **non-authoritative reference**.

## Required Schemas

### A. Baseline Header

| Field | Value |
|---|---|
| Baseline ID |  |
| Branch |  |
| Full commit SHA |  |
| Audit start/cutoff timestamps and timezone |  |
| Node/pnpm/Playwright versions |  |
| Initial working-tree status |  |
| Known unrelated uncommitted paths |  |
| Application/package manifest reference |  |
| Route/script manifest reference |  |
| Baseline status | `LOCKED`, `STALE`, or `SUPERSEDED` |
| Limitations |  |

The initial dirty-state record must distinguish Feature 050 closure artifacts from Feature 051
outputs. Feature 051 must not modify, stage, revert, or incorporate those unrelated files.

### B. Authority Expectation Register

| Expectation ID | Tier | Source and locator | Atomic expectation | Owner/scope | Applicability/deferred status | Linked surfaces | Notes |
|---|---|---|---|---|---|---|---|

Rules:

- Every architecture comparison cites an expectation ID.
- Unfinished proposals do not create requirements unless their controlling Freeze explicitly
  includes them.
- Deferred Decisions remain deferred and cannot be scored as missing implementation unless an
  approved current milestone requires a safe applicable behavior.

### C. Repository Implementation Map

| Surface ID | Application/package | Surface type | Name | Source paths | Route | Current owner | Evidence IDs | Status |
|---|---|---|---|---|---|---|---|---|

Every current application, in-scope package, route, module, provider/state boundary, workflow, and
test surface must appear or be linked from this map.

### D. Protected Implementation Register

| Surface ID | Route | Entry file | Dependent components/styles/assets/providers | Protected behavior | Evidence IDs | Critical category/evidence | Classification | Product Owner gate |
|---|---|---|---|---|---|---|---|---|

Required entries:

- `/login` — `apps/core-platform/app/login/page.tsx`
- `/register` — `apps/core-platform/app/register/page.tsx`

Allowed classifications are exactly:

- `Protected`
- `Protected — Critical Fix Required`

A critical classification requires reproducible evidence of one of: functional defect, security
defect, serious accessibility blocker, use-preventing responsive defect, or architecture-breaking
dependency. It still authorizes no fix and must state that explicit Product Owner approval is
required before implementation.

### E. Module Reconciliation Matrix

| Surface ID | Application | Module | Source paths | Current route | Current implementation status | Documentation expectation IDs | Alignment score | Functional-depth score | Classification | Missing behavior | Architecture conflict | Recommended action | Priority | Dependencies | Risk | Protected status | Evidence IDs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

Every score cell must link or include this block:

```text
Checks used:
Satisfied numerator:
Known denominator:
Whole-number estimate or N/E:
Unknown checks:
Blocked checks:
N/A exclusions and reasons:
Evaluation coverage fraction:
Confidence: HIGH | MEDIUM | LOW | BLOCKED
Limitation note:
```

### F. Route and Interaction Inventory

| Surface ID | Route | Owning application | Entry path | Route status | Visible page | Functional actions | Visual-only actions | Intentionally disabled actions | Redirects | Broken links | Hardcoded URLs | Cross-app handoff | Expected behavior IDs | Classification | Evidence IDs |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

Each action uses exactly one ActionResult:

```text
functional
visual-only
intentionally-disabled
redirected
broken
blocked-from-validation
```

Route absence is recorded only when an applicable approved expectation exists; absence alone does
not create product scope.

### G. State and Data-Flow Inventory

| Surface ID | Entity/state | Authoritative owner | Current source | Exact storage key/N/A | Readers | Writers | Persistence | Related modules | Architecture alignment | Migration sensitivity | Future backend-substitution impact | Evidence IDs | Limitations |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

Rules:

- Record storage keys, aliases, seeded IDs, `BusinessUnit`, and `OSEnablement` compatibility
  exactly as found.
- Never normalize, rename, migrate, delete, or promote compatibility data to canonical
  architecture.
- Shared storage does not imply shared ownership.

### H. Reconciliation Finding

| Finding ID | Surface ID | Observation | Expectation IDs | Evidence IDs | Classification | Rationale | Risk | Compatibility impact | Smallest future action/no action | Stop condition | Confidence | Limitations |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

Allowed classifications are exactly:

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

Every completed surface has one classification. `Unknown` and environmental `Blocked` are record
statuses, not alternative classifications. If a classification-determining fact cannot be
verified, the surface and applicable success criterion remain blocked.

### I. Architecture Conflict Register

| Conflict ID | Surface/finding | Implementation evidence IDs | Controlling expectation IDs/authority | Conflict explanation | Risk | Classification | Smallest governed future action | Affected boundary | Explicit stop condition |
|---|---|---|---|---|---|---|---|---|---|

Every row must contain both evidence sides, risk, a governance/successor-feature route, and a stop
condition. It must not contain a compromise implementation. Environment or evidence unavailability
alone is not `Blocked by Architecture`.

### J. Test and Evidence Register

| Evidence ID | Baseline ID | Evidence type | Surface IDs | Exact command/journey/source | Environment | Result | Observation | Artifact/reference | Limitations | Date/reviewer | Supersedes |
|---|---|---|---|---|---|---|---|---|---|---|---|

Allowed results: `PASS`, `FAIL`, `BLOCKED`, `N/A`.

- A failure is documented, not fixed.
- An unavailable required command or manual check is `BLOCKED`, not passed.
- A rerun appends a new evidence record and links the earlier result through `Supersedes`.
- Current source/runtime/test evidence is required before historical evidence supports a current
  conclusion.

### K. Prioritized Incremental Backlog

| Backlog ID | Non-binding proposed number | Priority tier | Title | Business value | Finding/evidence references | Current code/behavior reused | Exact gap | Dependencies | Risk | Estimated complexity | Source classification | Affected application | No-rewrite instruction |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

Priority tiers are:

1. broken critical journeys;
2. architecture boundary conflicts;
3. incomplete revenue-generating workflows;
4. disconnected operational flows;
5. MVP-required visual-only modules;
6. bounded quality improvements; and
7. deferred platform capabilities.

Every proposed number is collision-checked but reserves nothing. Every row must state the current
implementation to reuse and include the literal instruction **no rewrite**. Dashboard, Products,
or any other module cannot be selected as next without comparative evidence.

### L. FR/SC Traceability

| Requirement/criterion | Report sections/record IDs | Evidence IDs | Status | Blocker/notes |
|---|---|---|---|---|

All Feature 051 functional requirements and success criteria must be present. A blocked
requirement remains blocked in the final audit conclusion.

## Scoring Contract

### Check status

Every atomic alignment and functional-depth check uses exactly one status:

```text
SATISFIED
VIOLATED
UNKNOWN
BLOCKED
N/A
```

### Alignment and functional-depth calculation

```text
score = SATISFIED / (SATISFIED + VIOLATED) × 100

evaluation coverage = (SATISFIED + VIOLATED) /
                      (SATISFIED + VIOLATED + UNKNOWN + BLOCKED) × 100
```

- Show the raw fraction before a whole-number estimate.
- If `SATISFIED + VIOLATED = 0`, report `N/E`; never report 0% or 100%.
- List UNKNOWN, BLOCKED, and N/A checks even though they are excluded from the score denominator.
- Use equal atomic checks. Represent partial behavior as separate checks, not half-points.
- Scores do not assign classification or backlog priority.

### Functional-depth dimensions

Create applicable atomic checks for:

1. route existence;
2. rendered UI;
3. working interactions;
4. persistence;
5. each applicable CRUD operation;
6. related-module data flow;
7. each applicable loading/empty/partial/stale/error/unauthorized/unavailable/success/recovery state;
8. operational versus decorative data;
9. dashboard/report/dependent-view reactivity;
10. each visible action;
11. automated/manual test evidence; and
12. architecture ownership.

Different modules may have different denominators; the check list and coverage prevent misleading
comparison.

### Confidence

| Confidence | Required evidence |
|---|---|
| `HIGH` | All classification-determining claims have current source plus applicable runtime/test corroboration; no material unknown/block. |
| `MEDIUM` | Determining claims have current source; behavioral claims have current corroboration where feasible; remaining gaps are non-material. |
| `LOW` | Classification is supportable but relies mainly on static evidence/inference or has material non-determining gaps. |
| `BLOCKED` | A classification-determining claim is unavailable or current evidence materially contradicts. |

Historical evidence alone cannot exceed LOW confidence.

## Classification Guardrails

Use this ordered review without turning it into a score threshold:

1. Apply the Protected constraint first for Login/Register.
2. Use `Blocked by Architecture` only for a verified authority conflict requiring Governance,
   migration approval, or a successor specification.
3. Use `Refactor` when behavior is preserved but a demonstrated internal ownership, boundary,
   maintainability, or compatibility conflict needs correction.
4. Use `Complete` for partial applicable behavior extendable in place.
5. Use `Improve` for working, compatible behavior with a bounded quality/UX gap.
6. Use `Keep` for sufficiently aligned implementation.
7. Use `Defer` for documented capability not required by the next milestone.

Split a surface only when the concerns are independently ownable and independently evidentiary.
Never choose a class solely from a percentage or severity label.

## Final Contract Validation

The report contract passes only when:

- one locked baseline governs every record;
- all required report sections exist;
- every in-scope final surface has exactly one allowed classification;
- Login/Register obey the protected classification and approval gate;
- all percentages show checks, fraction, denominator, exclusions, unknowns, coverage, confidence,
  and limitation;
- every conflict has dual-source evidence and an explicit stop condition;
- every command/journey has an exact current result;
- every backlog row traces to findings, names reusable code/behavior, and says **no rewrite**;
- all failed/blocked requirements remain visible; and
- no product, architecture, historical audit, Design Intelligence, route, schema, storage, or
  compatibility artifact is modified.
