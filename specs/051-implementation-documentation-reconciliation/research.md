# Feature 051 Research: Reconciliation Audit Methodology

## Scope

This research resolves the audit-method decisions required to plan Feature 051. It introduces no
product technology, runtime contract, data migration, API, backend, or UI change. All decisions
apply only to documentation and evidence gathering.

## Decision 1 — Lock One Reproducible Audit Baseline

**Decision**: Capture and lock one baseline containing branch, full commit SHA, audit/cutoff dates,
tool versions, complete working-tree status, unrelated pre-existing changes, application/package
manifest, route manifest, and current scripts. Bind every evidence, surface, finding, score, and
backlog record to that baseline. If source changes, mark the baseline stale and perform an explicit
delta review or create a successor baseline.

**Rationale**: Feature 051 must not mix implementation states or absorb the existing Feature 050
closure files. A locked baseline makes every conclusion reproducible without stashing, deleting,
or reverting unrelated work.

**Alternatives considered**:

- Audit a live changing worktree — rejected because findings would not be attributable.
- Stash, clean, or revert Feature 050 files — rejected as destructive and outside scope.
- Copy Feature 050 evidence into Feature 051 — rejected because it would mix features and treat
  prior evidence as current without verification.

## Decision 2 — Separate Authority Expectations from Implementation Evidence

**Decision**: Maintain an AuthorityExpectation register and a separate EvidenceRecord register.
Every architecture comparison links both. Use the repository authority order for expectations and
the user-defined evidence hierarchy for current implementation findings.

Architecture precedence:

1. Architecture Freezes.
2. Governance, Accepted ADRs, and canonical glossary.
3. Genesis.
4. Approved milestone baselines.
5. Constitution.
6. AGENTS, Feature artifacts, Design Intelligence, and Execution standards.

Implementation evidence precedence:

1. Current source code.
2. Reproducible runtime behavior.
3. Current automated tests and command results.
4. Current feature evidence.
5. Historical specifications and audits after current verification.

**Rationale**: Constitution Principles I and XII require exact authority traceability and prohibit
silent reconciliation. Source, runtime, and tests prove different aspects and must remain visible
when they disagree. `docs/99-architecture-freeze/NEXORAXS-ARCHITECTURE-v1.x-COMPLETE.md` is a
completion locator/status summary by its Declaration Boundary, not a replacement authority.

**Alternatives considered**:

- Flatten all documentation into equal-weight requirements — rejected because it erases authority
  and status distinctions.
- Let runtime overwrite contradictory source, or source prove runtime outcomes — rejected because
  the evidence channels are complementary.
- Use historical audits as current truth — rejected because current verification is mandatory.
- Use `docs/archives/` as requirements — rejected; archives are non-authoritative references only.

## Decision 3 — Extract Atomic, Traceable Expectations

**Decision**: Each expectation record includes stable ID, concise requirement, exact path and
heading/ADR, authority tier, canonical owner, organization/lifecycle context, applicability,
Deferred Decision status, linked surfaces, and required evidence. Consolidate duplicate statements
into one atomic expectation with multiple citations so repetition does not inflate scoring.

Primary groups include:

- Platform identity, Core boundary, tenancy, and organization hierarchy: ADR-001–004 and
  `docs/99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md` sections 3.1 and 5.1–5.2.
- Core/OS readiness, Product Hub, commercial lifecycle, and OS independence: ADR-018–026 and Core
  Freeze sections 3.3 and 5.4.
- Modular boundaries, explicit context, compatible contracts, navigation, Audit, and organization
  ownership: ADR-033–040 and Core Freeze sections 3.6 and 5.7–5.9.
- Commerce facts, writes, lifecycles, contracts, and independence:
  `docs/99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md` sections 5–7, 10–15, and 19.
- Unresolved decisions: Core Freeze section 4.5, ADR-023 consequences, ADR-040 consequences, and
  Commerce Freeze section 22.
- UI and incremental compatibility guidance: `docs/10-design-intelligence/` and
  `docs/11-execution/`, subordinate to the sources above.

**Rationale**: Atomic expectations support evidence-based alignment scoring without turning entire
documents or repeated wording into hidden weights.

**Alternatives considered**:

- Score whole documents — rejected because applicability and ownership differ by surface.
- Infer requirements from unfinished proposals — rejected unless the controlling Freeze explicitly
  incorporates them.

## Decision 4 — Use the Bounded Conflict Stop Protocol

**Decision**: Every conflict must cite current implementation evidence and exact controlling
authority, explain the mismatch, classify it, record risk, preserve compatibility, stop only the
affected boundary, and name the smallest governed future action. Continue independent inventory
work. Do not propose a compromise model.

Use **Blocked by Architecture** only when resolution needs missing authority, an unresolved
Deferred Decision, an ADR, migration approval, or a successor specification. Use another allowed
classification when the target is already settled and only bounded future implementation work is
needed. The unresolved organization write protocol and `OSEnablement` successor remain unresolved.

**Rationale**: Constitution contradiction/deferral rules, AGENTS sections 1, 3, 8, and 15, Core
Freeze sections 4 and 7, and Commerce Freeze sections 22 and 25–29 require bounded stops and
Governance routing.

**Alternatives considered**:

- Let the audit choose the most convenient future model — rejected as architecture invention.
- Classify every mismatch as architecture-blocked — rejected because known bounded implementation
  gaps are not missing authority.
- Rewrite frozen or historical documents to match code — rejected.

## Decision 5 — Constrain Protected Login and Register

**Decision**: Protect `/login` at `apps/core-platform/app/login/page.tsx` and `/register` at
`apps/core-platform/app/register/page.tsx`. Trace dependencies read-only. Allow only `Protected` or
`Protected — Critical Fix Required`.

Critical status requires reproduced evidence of exactly one approved category: functional defect,
security defect, serious accessibility blocker, use-preventing responsive defect, or
architecture-breaking dependency. It still authorizes no correction and must record the explicit
Product Owner approval gate. Preference, modernization, component consolidation, and desired
polish cannot enter the backlog.

**Rationale**: Feature 051 FR-022–027 and FR-066 are an explicit Product Owner decision. Design
Memory is not updated merely to document this supplied protection: `docs/11-execution/11-DESIGN-MEMORY.md`
does not retroactively approve historical designs.

**Alternatives considered**:

- Use ordinary Keep/Improve/Refactor classes — rejected by the protected-surface contract.
- Treat all accessibility polish as critical — rejected because only a serious reproduced blocker
  qualifies.
- Create a retroactive DX record — rejected because no new design proposal is being decided.

## Decision 6 — Use Isolated, Non-Destructive Runtime Evidence

**Decision**: Run existing automated suites with their current configurations and perform manual
journeys in a disposable `/tmp` browser profile or isolated Playwright contexts using synthetic
seeded data. Do not clear a regular browser profile or change source/configuration to make a test
run. Record every action with one exact action result.

Core Playwright uses a production Core build and `playwright.core.config.ts`. Commerce uses the
existing headed `playwright.config.ts` and therefore requires a working graphical display. Landing
has no current automated suite and requires source plus manual runtime evidence.

**Rationale**: Registration, onboarding, POS, inventory, transfers, and returns intentionally
alter browser state. Isolation preserves ordinary user data and keeps product source unchanged.
Using existing configurations makes current tests evidence rather than Feature 051 implementation.

**Alternatives considered**:

- Add a Feature 051 Playwright configuration or tests — rejected as product/test-harness change.
- Use a regular browser profile and clear storage — rejected as destructive.
- Infer journeys from HTTP responses or route files alone — rejected because client redirects,
  guards, persistence, and visual-only controls require runtime evidence.

## Decision 7 — Keep One Master Report and One Planning Contract

**Decision**: Produce one later master report at
`docs/09-reconciliation/NEXORAXS-IMPLEMENTATION-RECONCILIATION-v1.0.md`. Define its schemas in one
planning contract, `contracts/reconciliation-report-contract.md`. Record command results directly
in the report's test/evidence register; keep ignored build/Playwright output as supporting runtime
artifacts only.

**Rationale**: One master report preserves traceability and meets the instruction to avoid
excessive documentation files. A single contract makes row completeness and classification rules
reviewable without creating runtime interfaces.

**Alternatives considered**:

- Separate files for every inventory and log — rejected as excessive and difficult to review.
- Append evidence to Feature 050 — rejected as cross-feature mixing.
- Define JSON/YAML/API schemas — rejected because the interface is documentation-only.

## Decision 8 — Apply Exclusive Classification Independently of Score

**Decision**: A completed surface receives exactly one of:

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

Apply protected constraints first; then verified architecture-block conditions; then determine
whether behavior is sufficiently aligned, needs bounded improvement, extension, internal
refactoring, or deferral. Scores inform review but never assign a class. Unknown/blocked evidence
is a status, not a ninth class. If classification-determining evidence remains unavailable, the
surface and applicable success criterion remain blocked.

**Rationale**: This preserves the specification's exhaustive vocabulary without turning a low
percentage or environment issue into an architecture conclusion.

**Alternatives considered**:

- Add `Unknown` as a classification — rejected by the specification.
- Derive classification from score thresholds — rejected because ownership, protection, and
  applicability are qualitative gates.
- Force a best guess when evidence is blocked — rejected as fabrication.

## Decision 9 — Report Fractions, Coverage, and Ordinal Confidence

**Decision**: Score atomic checks as `SATISFIED`, `VIOLATED`, `UNKNOWN`, `BLOCKED`, or `N/A`.

```text
score = SATISFIED / (SATISFIED + VIOLATED) × 100

evaluation coverage = (SATISFIED + VIOLATED) /
                      (SATISFIED + VIOLATED + UNKNOWN + BLOCKED) × 100
```

Show raw fractions before whole-number estimates. Report `N/E` when no check is evaluable. List
unknown, blocked, and N/A checks. Represent partial behavior through separate atomic checks rather
than half-points. Use confidence `HIGH`, `MEDIUM`, `LOW`, or `BLOCKED` based on current-source
support, applicable runtime/test corroboration, material gaps, and contradictions. Historical
evidence alone cannot exceed LOW.

**Rationale**: The formula distinguishes observed misalignment from unavailable evidence while
coverage and confidence prevent an inflated percentage from appearing complete.

**Alternatives considered**:

- Count unknown as failure — rejected because absence of evidence is not disproof.
- Silently exclude unknown — rejected because it hides coverage gaps.
- Use hidden weights or 0.5 partial scores — rejected as false precision.
- Publish a confidence percentage — rejected in favor of auditable evidence conditions.

## Decision 10 — Run Current Gates Without Correcting Failures

**Decision**: The audit runs exact route/import/storage/URL scans, per-app lint/build, strict
TypeScript for all three apps and three packages, root lint/build, the existing Core and Commerce
Playwright suites, source/HTTP/browser link inspection, and manual journeys. Every exact result is
recorded. A failed or unavailable command remains FAIL or BLOCKED and does not authorize a fix.

Build and test tools may update ignored `.next`, `.turbo`, `test-results`, and
`playwright-report` outputs. Any tracked product-file change is unexpected and blocks the audit
until explained; Feature 051 still does not fix it.

**Rationale**: There is no root typecheck script, no Landing automated suite, and the current
Commerce config is headed. Exact existing commands provide attributable evidence without adding
dependencies or harnesses.

**Alternatives considered**:

- Treat a successful build as the strict TypeScript gate — rejected because the request requires
  explicit strict checks.
- Install a link checker or new test harness — rejected as implementation/dependency change.
- Weaken or replace a failing current command — rejected.

## Decision 11 — Rank Only Evidence-Backed, No-Rewrite Future Features

**Decision**: Rank backlog candidates by the seven specified tiers. Every candidate traces to
findings/evidence, identifies current code and behavior to reuse, defines a bounded gap and
dependencies, uses a non-binding collision-checked number, and states **no rewrite**. Proposed
numbers reserve nothing. Protected polish cannot enter the backlog.

**Rationale**: The audit exists to select future incremental work from evidence, not to preselect
Dashboard, Products, or a favored redesign.

**Alternatives considered**:

- Choose the next feature before completing comparative evidence — rejected.
- Bundle unrelated architecture, backend, and UX work — rejected as unbounded.
- Recommend rewrite when refactoring or migration remains viable — rejected.

## Decision 12 — Treat Documentation Correction as the Only Rollback Surface

**Decision**: Feature 051 has no product rollout or product rollback. If evidence is wrong,
preserve the prior record, append a correction or superseding evidence record, and keep the report
blocked until re-reviewed. Do not use destructive Git commands. Generated ignored artifacts are
not product state.

**Rationale**: The audit writes documentation only. Reversible evidence correction and immutable
history are safer than rewriting a failed result into a pass.

**Alternatives considered**:

- “Fix forward” in product code — rejected by scope.
- Delete failed evidence — rejected because it destroys traceability.
- Commit an implementation rollback — rejected because commits and implementation are prohibited.

## Clarification and Blocker Result

No planning clarification or Constitution blocker remains. Expected audit-time blockers include
unavailable dependencies/browser/display/ports/seeded state, baseline drift, missing
classification-determining evidence, or an authority conflict. Each remains explicitly BLOCKED at
the affected boundary and cannot be converted into a pass.
