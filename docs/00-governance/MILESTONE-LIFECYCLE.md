# Architectural Milestone Lifecycle

Version: 1.0  
Status: Governance Standard  
Owner: Nexoraxs

---

## 1. Purpose

This document defines the official lifecycle for every architectural milestone in Nexoraxs.

The lifecycle ensures that each milestone begins from an approved baseline, proposes architecture before expanding it, records durable decisions through ADRs, passes formal quality gates, freezes an explicit version, corrects documentation inconsistencies without disguising architectural change, and proves readiness before the next milestone begins.

This is a process standard. It does not define product, domain, data, API, Event, Security, AI, Marketplace, Operating System, deployment, or implementation architecture.

## 2. Governing Rules

Every milestone follows these rules:

1. Genesis remains the ultimate architectural authority.
2. Governance, accepted ADRs, the current Architecture Freeze, and approved milestone artifacts form the entry baseline.
3. Existing architecture is read completely before a proposal or change is written.
4. A proposal may extend an approved baseline but may not silently contradict, rename, transfer, or redesign frozen architecture.
5. Architectural decisions are reviewed and approved before detailed documentation expands them.
6. Documentation Waves add detail only within the approved proposal and existing freeze.
7. Contradictions are reported and stop affected work until they are classified and governed.
8. A Freeze records architecture; it does not imply that every implementation mechanism is decided.
9. Documentation-only alignment must not be used to introduce architecture.
10. A milestone is complete only after Readiness Validation confirms that no blocking inconsistency remains.

## 3. Lifecycle Overview

```text
Entry and Baseline Confirmation
  → Proposal
  → Proposal Architecture Review
  → Approval
  → Documentation Waves
  → Milestone Architecture Review
  → Freeze
  → Freeze Alignment Patch, if required
  → Readiness Validation
  → Milestone Complete
```

A Freeze Alignment Patch is conditional. If validation finds no documentation contradiction, the lifecycle proceeds directly from Freeze to Readiness Validation.

## 4. Milestone Lifecycle Phases

### Phase 1 — Entry and Baseline Confirmation

The milestone begins by establishing its authority, dependencies, boundary, and predecessor readiness.

Activities:

- identify Genesis, Governance, accepted ADRs, approved proposals, frozen architecture, and completed milestone artifacts that govern the work;
- confirm the preceding milestone is frozen and ready;
- identify the milestone objective and non-scope;
- identify known deferred decisions and constraints relevant to the milestone;
- verify canonical terminology and ownership before drafting;
- check for contradictions in the entry baseline; and
- stop and report any contradiction that prevents one authoritative interpretation.

No architecture deliverable is written until the entry baseline is known.

### Phase 2 — Proposal

The Proposal is the first milestone architecture artifact. It defines the proposed complete logical architecture for review without generating the detailed documentation set.

The Proposal should include, as applicable:

- vision;
- purpose, responsibilities, scope, and non-scope;
- logical components and internal architecture;
- domain boundaries and ownership rules;
- integration with existing platform components;
- data, API, Event, Security, AI, Marketplace, and deployment boundaries where relevant;
- risks and open questions;
- draft ADRs for material decisions; and
- measurable success criteria.

Proposal rules:

- use only canonical terminology;
- distinguish approved inherited decisions from proposed milestone decisions;
- preserve unresolved decisions as open questions;
- identify assumptions explicitly;
- remain implementation-independent unless an existing accepted decision requires a technology;
- do not generate detailed milestone documents before Proposal approval; and
- do not treat draft ADRs as Accepted.

### Phase 3 — Proposal Architecture Review

The Proposal receives a non-modifying Architecture Review before approval.

The review validates:

- conformance with Genesis and the current Freeze;
- consistency with accepted ADRs;
- canonical terminology;
- domain and data ownership;
- responsibility and lifecycle separation;
- cross-boundary API and Event behavior;
- Security, tenant, Permission, Audit, and human-control obligations;
- compatibility with completed and future milestones;
- proposed ADR coverage;
- risks, ambiguities, and deferred decisions; and
- whether the Proposal introduces an unapproved architecture change.

The reviewer reports contradictions and does not silently correct the Proposal or predecessor documents.

### Phase 4 — Approval

Approval converts the reviewed Proposal into the authoritative milestone architecture boundary for Documentation Waves.

Approval must be explicit. Approval records:

- Proposal version;
- approval status and date;
- accepted recommendations or conditions;
- unresolved open questions that remain deferred;
- draft ADRs authorized for extraction or acceptance; and
- the scope permitted for Documentation Waves.

Approval does not automatically accept a separate ADR. Each architectural decision follows the ADR lifecycle and must reach **Accepted** through the approved Governance process.

If approval requires architectural changes, the Proposal is revised and reviewed again before it becomes authoritative.

### Phase 5 — Documentation Waves

Documentation Waves expand the approved Proposal into detailed architecture documents in controlled groups.

Wave rules:

- each Wave has an explicit file list and must create only those artifacts;
- existing documents remain unchanged unless modification is separately authorized;
- every document traces to Genesis, Governance, the approved Proposal, prior approved Waves, and the current Freeze;
- inherited decisions are expanded, not reopened;
- new terminology, ownership, or architecture is prohibited unless already approved;
- deferred decisions remain deferred;
- each Wave receives review and explicit approval before becoming authority for the next Wave; and
- a contradiction stops the affected Wave and is reported rather than resolved silently.

Waves may cover different architectural concerns, but the lifecycle does not prescribe a fixed number, naming scheme, or subject sequence. The Proposal and milestone plan define the Wave set.

### Phase 6 — Milestone Architecture Review

After the planned Documentation Waves, the complete milestone receives a formal Architecture Quality Review.

The review is evidence-based and non-modifying. It evaluates:

- scope completeness;
- internal and cross-document consistency;
- terminology and Glossary alignment;
- ownership and responsibility uniqueness;
- lifecycle, API, Event, Security, deployment, and operational rule consistency;
- ADR coverage and unused or missing ADRs;
- traceability from Genesis through Proposal and Waves;
- risks and intentional deferrals;
- implementation readiness at the approved level; and
- readiness to freeze.

The review provides scores or equivalent quality evidence, a recommendation, documentation-only recommendations, a deferred-decision register, and a final verdict. It does not redesign architecture or resolve deferred decisions.

If the verdict requires revision, the affected artifact returns to its appropriate earlier phase and is reviewed again.

### Phase 7 — Freeze

The Architecture Freeze is the official release artifact for a completed milestone architecture.

The Freeze records:

- architecture version, date, status, and milestone;
- every artifact included in the frozen baseline;
- major approved architectural decisions and related ADRs;
- intentionally deferred decisions;
- Architecture Guarantees that future milestones must preserve;
- compatible evolution that future milestones may perform;
- change-control requirements;
- relationship to future milestones;
- recommended release identifier or Git tag, without creating it unless separately authorized; and
- a final approval statement.

The Freeze does not create new architecture. It records the approved baseline and makes its guarantees enforceable for future milestone work.

### Phase 8 — Freeze Alignment Patch, if required

A Freeze Alignment Patch corrects contradictions or inconsistencies inside the frozen documentation when the accepted architecture itself is already clear.

The process is:

1. stop the affected next-milestone work;
2. create a Patch Plan without modifying frozen artifacts;
3. identify each source document, conflicting document, exact concept, root cause, recommended correction, impact, and classification;
4. determine whether every recommended correction is documentation-only or architectural;
5. obtain explicit Patch Plan approval;
6. apply only the approved corrections;
7. add Patch Authority and compatibility information;
8. update the Freeze to record the new documentation baseline; and
9. perform Readiness Validation.

A Freeze Alignment Patch is permitted only when:

- the correction restores an already accepted decision;
- no architecture decision changes;
- no ADR changes;
- ownership, lifecycle, contracts, and guarantees remain unchanged; and
- backward compatibility is complete.

If a proposed correction changes architecture, it is not a Freeze Alignment Patch. It returns to ADR, Architecture Review, approval, and updated Freeze change control.

### Phase 9 — Readiness Validation

Readiness Validation confirms that the approved baseline is safe to use as authority for the next milestone.

Validation is non-design work. It checks only the approved readiness scope, including:

- canonical terminology;
- frozen architecture consistency;
- ADR consistency;
- cross-document traceability;
- Freeze integrity;
- relevant next-milestone prerequisites; and
- remaining blocking issues.

The verdict is binary:

- **READY FOR NEXT MILESTONE**; or
- **NOT READY FOR NEXT MILESTONE**.

When not ready, every blocking issue is listed. When ready, the validation states that the next Proposal may begin from the named architecture and documentation baseline.

### Phase 10 — Milestone Complete

A milestone is complete when:

- its Proposal is approved;
- required ADRs are Accepted or explicitly deferred;
- all planned Documentation Waves are approved;
- the Milestone Architecture Review passes at the approved threshold;
- the Freeze is issued;
- any required Freeze Alignment Patch is approved and applied;
- Readiness Validation returns **READY FOR NEXT MILESTONE**; and
- no blocking issue remains.

Completion authorizes the next milestone to begin its Proposal phase. It does not authorize detailed documents or implementation beyond their separately approved scope.

## 5. ADR Usage

### 5.1 When an ADR is required

An ADR is required when a decision materially affects one or more of:

- canonical terminology or ontology;
- domain, aggregate, data, or contract ownership;
- responsibilities or bounded contexts;
- lifecycle meaning or invariants;
- API, Event, Security, tenant, Permission, Audit, or AI authority;
- cross-milestone compatibility;
- deployment posture or a material technology constraint;
- deprecation, supersession, or breaking change; or
- an Architecture Guarantee.

### 5.2 When an ADR is not required

An ADR is not required for:

- editorial corrections that do not change meaning;
- link repairs;
- formatting changes;
- clarification that restates an accepted decision without expanding it;
- generated indexes or traceability metadata; or
- implementation detail already permitted by the frozen architecture and not materially constraining future design.

If classification is uncertain, Governance review decides before the change is made.

### 5.3 ADR lifecycle within a milestone

1. Search existing ADRs before drafting.
2. Record a proposed durable decision as a draft in the Proposal when appropriate.
3. Create one official ADR per independently changeable decision using the next permanent number.
4. Keep the ADR **Proposed** during review.
5. Review it against Genesis, the current Freeze, related ADRs, ownership, compatibility, and the milestone Proposal.
6. Mark it **Accepted** or **Rejected** only after explicit approval.
7. Use **Superseded** or **Deprecated** only through the Governance rules.
8. Never rewrite an Accepted ADR to conceal a later change.

The ADR repository rules and status values in `docs/00-governance/ADR/README.md` remain authoritative.

## 6. Versioning Policy

### 6.1 Proposal versions

Before approval, a Proposal uses a pre-release version such as `v0.1`, `v0.2`, and so on. A revision increments the Proposal version when review changes its proposed boundary or decisions.

Proposal approval freezes that Proposal version as the authority for Documentation Waves. Later editorial metadata may record approval without rewriting its historical decision content.

### 6.2 Architecture versions

Frozen architecture uses:

```text
MAJOR.MINOR
```

Examples: `v1.0`, `v1.1`, `v2.0`.

- **MAJOR** changes represent incompatible architectural change.
- **MINOR** changes represent backward-compatible architectural extension.

An architecture version changes only through accepted ADRs, Architecture Review, approval, and an updated Freeze.

### 6.3 Documentation baseline versions

Documentation-only alignment uses:

```text
MAJOR.MINOR.PATCH
```

The `MAJOR.MINOR` portion identifies the unchanged architecture version. `PATCH` identifies an approved documentation baseline correction.

Example relationship:

```text
Architecture v1.0
Documentation baseline v1.0.1
```

A Patch never implies architecture v1.1.

### 6.4 Artifact versions

Every Proposal, Review, Freeze, Patch Plan, and Readiness Validation states its version, status, authority, and relationship to the architecture baseline. Historical versions remain available for traceability.

## 7. Patch Policy

### 7.1 Permitted Patch content

A documentation Patch may:

- restore canonical terminology;
- correct a conflicting restatement of an accepted decision;
- repair references, links, counts, indexes, or status metadata;
- add Patch Authority and baseline-version metadata; and
- clarify text when the accepted meaning is already unambiguous.

### 7.2 Forbidden Patch content

A documentation Patch may not:

- introduce or remove a domain concept;
- change canonical ownership;
- change lifecycle semantics or invariants;
- add an API, Event, Permission, Security, AI, Marketplace, or deployment decision;
- expand the scope of an accepted decision;
- accept, reject, deprecate, or supersede an ADR;
- change an Architecture Guarantee; or
- disguise an architectural change as clarification.

### 7.3 Patch authority

Every applied Patch records:

- reason;
- authority;
- classification;
- architecture impact;
- ADR impact;
- backward compatibility;
- architecture and documentation version impact; and
- required change control for anything beyond the Patch.

### 7.4 Patch validation

After application, validation confirms that only approved files and text changed, no prohibited architecture was introduced, the Freeze records the new documentation baseline, and readiness remains valid.

## 8. Major vs Minor Changes

### 8.1 Major architectural change

A change is **Major** when it breaks or replaces an existing architectural guarantee or requires consumers and future milestones to adopt incompatible meaning.

Examples of Major change categories include:

- changing canonical hierarchy or ontology;
- transferring domain or data ownership;
- merging previously independent bounded contexts or lifecycle states;
- removing Operating System independence;
- changing the meaning of Business DNA, Knowledge, Recommendation, Marketplace, AI, API, Event, Security, or tenant guarantees;
- permitting a previously prohibited dependency or write path; or
- replacing a public or cross-boundary contract incompatibly without a compatible migration path.

A Major change requires a new MAJOR architecture version.

### 8.2 Minor architectural change

A change is **Minor** when it adds backward-compatible architecture within existing guarantees.

Examples of Minor change categories include:

- adding a new optional component inside an existing bounded context without transferring ownership;
- adding a compatible API or Event surface;
- adding an independent Operating System or optional integration that uses frozen contracts;
- approving a previously deferred mechanism without changing the logical architecture; or
- extending a governed lifecycle through compatible additive state or metadata.

A Minor change still requires an ADR when material, Architecture Review, approval, and an updated MINOR Freeze.

### 8.3 Patch change

A **Patch** changes documentation only. It restores or clarifies the accepted baseline without changing architectural meaning.

If review cannot prove that a correction is documentation-only and fully compatible, it is not a Patch.

## 9. Entry Criteria

A milestone may enter the Proposal phase only when:

1. the previous architecture baseline is frozen;
2. Readiness Validation authorizes the next milestone;
3. authoritative sources and their hierarchy are identified;
4. milestone purpose, scope, non-scope, and expected proposal deliverable are defined;
5. relevant accepted ADRs and deferred decisions are known;
6. canonical terminology is available;
7. predecessor ownership and Architecture Guarantees are understood;
8. no unresolved contradiction blocks one authoritative interpretation; and
9. no detailed documentation for the new milestone has been generated prematurely.

If any entry criterion fails, the milestone does not begin.

## 10. Exit Criteria

A milestone exits as complete only when:

1. the approved Proposal defines its complete logical boundary;
2. all material milestone decisions have an accepted ADR or remain explicitly deferred;
3. all planned Documentation Waves are complete and approved;
4. canonical terminology, ownership, responsibilities, lifecycles, APIs, Events, Security, deployment, and relationships are internally consistent at the documented scope;
5. the Architecture Quality Review reaches an approved freeze recommendation;
6. the Freeze lists the authoritative scope, decisions, guarantees, deferrals, and change controls;
7. required documentation-only contradictions are corrected through an approved Freeze Alignment Patch;
8. Readiness Validation returns **READY FOR NEXT MILESTONE**;
9. no blocking issue remains; and
10. the final milestone status and baseline version are explicit.

## 11. Deliverables

| Lifecycle phase | Required deliverable | Conditional deliverable |
|---|---|---|
| Entry and Baseline Confirmation | Authority and scope identified in the task or milestone initiation record | Contradiction report |
| Proposal | One versioned milestone Proposal | Draft ADR sections |
| Proposal Architecture Review | Review findings and recommendation | Required Proposal revision |
| Approval | Explicit approval record | Approval conditions |
| Documentation Waves | Only the approved files for each Wave | Wave-specific review record |
| Milestone Architecture Review | Formal Architecture Quality Review | Documentation recommendations and deferred-decision register |
| Freeze | Versioned Architecture Freeze | Recommended release tag or identifier |
| Freeze Alignment Patch | None when no inconsistency exists | Patch Plan, approved corrections, Patch Authority, updated documentation baseline |
| Readiness Validation | Versioned readiness document and binary verdict | Blocking-issue list |
| Milestone Complete | Completion statement and next-milestone authority | None |

No phase authorizes extra files outside its approved deliverable list.

## 12. Quality Gates

### Gate 1 — Entry Gate

Pass conditions:

- previous baseline is frozen and ready;
- sources and scope are explicit;
- no blocking contradiction exists.

Failure result: milestone work does not begin.

### Gate 2 — Proposal Conformance Gate

Pass conditions:

- Proposal is complete at logical architecture level;
- Genesis, Governance, Freeze, ownership, and terminology align;
- risks, open questions, and draft decisions are explicit;
- no detailed milestone documents were generated early.

Failure result: revise the Proposal or resolve a predecessor contradiction through Governance.

### Gate 3 — Proposal Approval Gate

Pass conditions:

- Architecture Review recommendations are addressed or accepted as conditions;
- proposed scope and decisions receive explicit approval;
- Documentation Wave authority is explicit.

Failure result: Proposal remains non-authoritative.

### Gate 4 — Wave Gate

Pass conditions for each Wave:

- only approved files were created or modified;
- all content expands approved architecture only;
- required references and sections are present;
- no new contradiction, terminology, ownership, or decision was introduced;
- the Wave receives explicit approval.

Failure result: later Waves do not begin.

### Gate 5 — Architecture Quality Gate

Pass conditions:

- milestone scope is complete at the approved level;
- cross-document consistency and traceability pass;
- ADR coverage, risks, and deferrals are known;
- final verdict authorizes freezing, with only accepted non-blocking recommendations remaining.

Failure result: return affected content to the relevant Proposal or Wave phase.

### Gate 6 — Freeze Gate

Pass conditions:

- frozen artifact manifest is complete;
- decisions and Architecture Guarantees match approved sources;
- deferred decisions remain visible;
- change control and version are explicit;
- no new architecture is introduced by the Freeze.

Failure result: Freeze is not authoritative.

### Gate 7 — Freeze Alignment Gate

This gate is conditional.

Pass conditions:

- every contradiction is classified;
- only documentation-only, fully compatible corrections use a Patch;
- Patch Plan is approved before application;
- applied changes match the approved plan exactly;
- Architecture and ADR impact are both none.

Failure result: stop Patch execution and use architectural change control.

### Gate 8 — Readiness Gate

Pass conditions:

- canonical terminology, architecture, ADRs, traceability, and Freeze integrity validate;
- next-milestone prerequisites are sufficient for Proposal planning;
- no blocking issue remains;
- verdict is **READY FOR NEXT MILESTONE**.

Failure result: list all blockers and do not begin the next milestone.

## 13. Process Invariants

1. Proposal precedes detailed Documentation Waves.
2. Review precedes approval.
3. Approval precedes authoritative expansion.
4. Each Wave is bounded and explicitly approved.
5. Architecture Review is non-modifying.
6. Freeze records approved architecture and never invents it.
7. A Patch cannot change architecture or ADRs.
8. Readiness Validation does not redesign architecture.
9. Contradictions are reported, never silently resolved.
10. A next milestone begins only from a named frozen and ready baseline.

## 14. References

- `docs/00-governance/ADR/README.md`
- `docs/01-genesis/02-CONSTITUTION.md`
- `docs/02-core-platform/00-CORE-PLATFORM-PRINCIPLES.md`
- `docs/02-core-platform/98-CORE-PLATFORM-PATCH-v1.0.1.md`
- `docs/02-core-platform/99-CORE-PLATFORM-ARCHITECTURE-REVIEW.md`
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md`
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.0.1-READINESS.md`
