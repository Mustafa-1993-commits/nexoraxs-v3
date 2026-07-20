# Foundation Governance Approval v1.0

**Version:** 1.0

**Status:** Final Governance decision — **REQUIRES ADDITIONAL GOVERNANCE**

**Decision date:** 2026-07-20

**Owner:** NexoraXS Architecture Governance Board

**Decision target:** Foundation successor package for proposed Core Platform Architecture v1.1

**Authorization result:** Preparation of Core Platform Architecture v1.1 Freeze is **not authorized**

---

## 1. Executive Summary

### 1.1 Purpose

This document records the Architecture Governance Board's formal decision on whether the completed
Foundation successor package may become the basis for Core Platform Architecture v1.1 Freeze.

The decision applies the repository's authority and approval controls. It does not create
architecture, approve a Freeze, accept or amend an ADR, or modify a reviewed source.

### 1.2 Scope

The Board evaluated:

- the approved Foundation direction and its authority boundary;
- the proposed Governance Disposition, Successor Architecture, and Freeze Alignment;
- the independent Architecture Review Report v1.0 and its formal Resolution;
- compatibility with Core Platform Freeze v1.0 and Business Brain Freeze v1.0;
- the relationship among ADR-015, ADR-016, and ADR-042;
- Genesis journey and source-version provenance; and
- the package's eligibility to proceed to a Core Platform v1.1 Freeze.

### 1.3 Authority

This is an explicit Governance decision record under
[Milestone Lifecycle phase 4](./MILESTONE-LIFECYCLE.md). It can approve, condition, defer, or reject
the reviewed package. It cannot silently supersede a Freeze, amend an Accepted ADR, or fill a missing
architecture boundary.

[Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md), section
**7. Change Control**, remains controlling. Material Core change requires an ADR where applicable,
Architecture Review, and an updated Freeze. [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md),
section **18. Change Control Policy**, independently governs Business Brain successor treatment.

### 1.4 Decision target

The decision target is the package formed by:

1. Foundation Baseline v0.1;
2. Foundation Audit v0.1;
3. Foundation Authority Crosswalk v0.1;
4. Core Platform / Foundation Governance Disposition v0.1;
5. Core Platform Foundation Successor Architecture v0.1;
6. Core Platform Freeze Alignment v0.1;
7. Foundation Governance Architecture Review Report v1.0; and
8. Architecture Review Resolution v1.0.

### 1.5 Current Governance state

The Foundation product direction and ADR-042 are approved inputs. The proposed successor chain is
bounded and preserves canonical ownership, but it is not approval-ready as a Freeze basis:

- the Governance Disposition, Successor Architecture, and Freeze Alignment remain Proposed;
- Architecture Review v1.0 returned **REQUIRES REVISION**;
- Resolution v1.0 closed ARB-007, partially closed ARB-008, and left ARB-001 through ARB-006 open;
- the direct-registration compatibility path is architecturally incomplete;
- the ADR-015/ADR-016/ADR-042 relationship remains undecided;
- required Business Brain successor treatment is absent;
- Genesis successor treatment and an exact immutable source manifest are absent; and
- repository authority wording remains unresolved for successor use.

Evidence: [Architecture Review Report sections 11–13](../02-core-platform/ARCHITECTURE-REVIEW-REPORT-v1.0.md)
and [Architecture Review Resolution sections 4, 6, and 8](../02-core-platform/ARCHITECTURE-REVIEW-RESOLUTION-v1.0.md).

### 1.6 Final decision

**REQUIRES ADDITIONAL GOVERNANCE**

The Board does not approve the current package as the basis for Core Platform Architecture v1.1
Freeze. This is not a rejection of the Foundation direction. It is a mandatory return to the
proposal and Governance controls because approval would otherwise infer missing architecture and
successor authority.

## 2. Reviewed Package

### 2.1 Governing and package artifacts

| Document | Purpose | Authority | Status | Relationship and coverage |
|---|---|---|---|---|
| [AGENTS.md](../../AGENTS.md) | Repository operating and conflict-stop rules | Subordinate operational guidance | Active | Establishes reading order, preservation, and stop-at-conflict behavior |
| [Milestone Lifecycle](./MILESTONE-LIFECYCLE.md) | Architecture milestone approval and change-control process | Governance Standard | Active | Controls proposal review, approval, Freeze, alignment, and readiness gates |
| [Foundation Baseline v0.1](./FOUNDATION-BASELINE-v0.1.md) | Sessions 1–4 approved Foundation snapshot | Approved Governance snapshot subordinate to Freezes and Accepted ADRs | Active — Approved Architecture Snapshot | Defines approved doctrine, capabilities, journey, knowledge lifecycle, projections, ownership boundaries, and exclusions |
| [Foundation Audit v0.1](../08-implementation-audit/FOUNDATION-AUDIT-v0.1.md) | Factual documentation and implementation-evidence assessment | Audit evidence | Complete | Identifies the Freeze/Foundation authority collision and reconciliation order |
| [Foundation Authority Crosswalk v0.1](./FOUNDATION-AUTHORITY-CROSSWALK-v0.1.md) | Maps authority compatibility and conflict | Analysis only | Proposed | Preserves conflict without choosing precedence; identifies successor actions |
| [Governance Disposition v0.1](./CORE-PLATFORM-FOUNDATION-GOVERNANCE-DISPOSITION-v0.1.md) | Proposes bounded conflict disposition and successor controls | Proposed Governance bridge | Proposed | Defines preserved guarantees, material replacements, required successor actions, and exit criteria |
| [Successor Architecture v0.1](../02-core-platform/14-CORE-FOUNDATION-SUCCESSOR-ARCHITECTURE-v0.1.md) | Specifies minimum proposed Core/Foundation architecture delta | Proposed architecture | Proposed | Defines Discovery, candidate, conversion, Guided Activation, Blueprint, Insight, and Lineage boundaries |
| [Freeze Alignment v0.1](../02-core-platform/15-CORE-PLATFORM-FREEZE-ALIGNMENT-v0.1.md) | Maps v1.0 predecessor guarantees to the proposed successor | Proposed alignment assessment | Proposed; exit verdict NOT PASSED | Preserves all 52 Core guarantees and lists four pending replacement areas |
| [Architecture Review Report v1.0](../02-core-platform/ARCHITECTURE-REVIEW-REPORT-v1.0.md) | Independent, non-modifying assessment of Freeze readiness | Review evidence | Final — REQUIRES REVISION | Records eight Freeze blockers, no ownership violation, and no Freeze authorization |
| [Architecture Review Resolution v1.0](../02-core-platform/ARCHITECTURE-REVIEW-RESOLUTION-v1.0.md) | Formal repository response to the eight review findings | Resolution record; not architecture approval | Final — READY FOR GOVERNANCE APPROVAL | Closes ARB-007, partially closes ARB-008, and leaves ARB-001–ARB-006 open |
| [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md) | Controlling Core Platform architecture baseline | Architecture Freeze | FROZEN | Supplies 52 guarantees, deferred decisions, and mandatory successor change control |
| [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md) | Controlling Business Brain architecture baseline | Architecture Freeze | Frozen | Protects the sole Business Brain Decision write model, Recommendation boundary, and physical architecture |
| [Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md) | Current detailed Foundation customer progression | Genesis Foundation experience source | Foundation v1.2 | Expresses value-before-registration, conversion, publication, activation, projection, and Recommendations |
| [Workspace Lifecycle v1.0](../01-genesis/12-WORKSPACE-LIFECYCLE.md) | Earlier Workspace-first customer lifecycle | Genesis source incorporated into Core Freeze v1.0 | Foundation v1.0; frozen-source relationship | Preserves the older Sign Up/Login → Workspace → Business Architect sequence that needs successor treatment |

### 2.2 Accepted ADR set

The Board reviewed all current Accepted ADRs: ADR-001 through ADR-040 and ADR-042. ADR-041 remains
Proposed and is not treated as an Accepted source.

| Accepted ADRs | Purpose and coverage | Relationship to this decision |
|---|---|---|
| [ADR-001](./ADR/ADR-001-business-operating-intelligence-platform.md)–[ADR-006](./ADR/ADR-006-workspace-intelligence-explicit-aggregation.md) | Platform identity, Core boundary, Workspace, organization hierarchy, Business DNA, Workspace aggregation | Preserved without ownership change |
| [ADR-007](./ADR/ADR-007-capabilities-before-industries.md)–[ADR-014](./ADR/ADR-014-human-control-over-recommendations-and-ai.md) | Capability, Module, Knowledge, Rules, Business Brain, Recommendation, and human authority | Preserved; Foundation ethics and lineage remain additive only when governed |
| [ADR-015](./ADR/ADR-015-infer-before-asking-conversational-configuration.md) | Infer-before-asking and conversational configuration experience | Infer-before-asking remains compatible; relationship to method-independent Discovery is unresolved |
| [ADR-016](./ADR/ADR-016-business-architect-governed-pipeline.md) | Selected-Business Business Architect pipeline and publication | Pipeline remains; entry and first-publication placement require explicit relationship treatment |
| [ADR-017](./ADR/ADR-017-configuration-proposals-respect-domain-ownership.md)–[ADR-020](./ADR/ADR-020-product-hub-composition-not-data-ownership.md) | Configuration, readiness, Product Hub handoff, and non-ownership | Preserved without transfer |
| [ADR-021](./ADR/ADR-021-mandatory-workspace-entitlement.md)–[ADR-028](./ADR/ADR-028-immutable-marketplace-assets-scoped-state.md) | Entitlement, subscriptions, OS scope and lifecycle, OS independence, Marketplace | Preserved without change |
| [ADR-029](./ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md)–[ADR-040](./ADR/ADR-040-core-organization-identity-os-operational-data.md) | AI boundaries, modular monolith, scope, Contracts, APIs, navigation, Audit, data-driven assets, organization identity | Preserved; no new physical service, Contract, API, or owner is approved |
| [ADR-042](./ADR/ADR-042-pre-registration-business-discovery.md) | Accepted pre-registration Discovery, candidate understanding, conversion, ethics, lineage, and ownership constraints | Approved Foundation architecture input; does not itself issue a successor Freeze or explicitly disposition ADR-015/016 |

The grouping above is an inventory convenience only. It does not merge, replace, or weaken any
individual ADR.

## 3. Governance Evaluation

### 3.1 Foundation

Foundation Baseline v0.1 is internally coherent within its declared scope. Its sections **12–17**
preserve Workspace and Business ownership, Business-scoped Business DNA, candidate/canonical
separation, projection non-ownership, Product Hub handoff, and Core/OS separation. It also states in
sections **1**, **3**, and **22** that it does not supersede a Freeze or Accepted ADR.

The Foundation direction is therefore valid input to successor Governance. Its prior approval does
not prove that the Core and Business Brain successor lifecycles are complete.

### 3.2 Governance

The Governance Disposition correctly identifies the material journey, pipeline-entry,
first-publication, ADR relationship, Business Brain, Genesis, and provenance work. Its section
**1.5 Approval requirements** and section **10. Exit Criteria** expressly require actions that do not
yet exist.

The Board accepts the Disposition as accurate proposal evidence. It does not approve it as a
completed successor authority because its own exit criteria are unmet.

### 3.3 Successor Architecture

The Successor is bounded and preserves frozen ownership. Its sections **2–11** introduce no new
physical service or canonical owner and carry the 52 Core guarantees forward.

It is not approval-ready because the direct-registration compatibility path remains incomplete.
Architecture Review finding ARB-003 shows that sections **3.2–3.3**, **7**, and **13** preserve
Login/Register while requiring Business DNA v1 before Guided Activation without defining the
architecture relationship for a direct-registering new customer. Milestone Lifecycle phase 4
requires revision and re-review when approval requires an architectural correction.

### 3.4 Freeze Alignment

Freeze Alignment sections **4–6** accurately preserve all Core guarantees and expose pending
replacements. Section **8** records the current authority conflict as Blocked. Section **10** records
the exit verdict **NOT PASSED**.

The Alignment is suitable as review evidence but cannot serve as approved alignment while its own
mandatory criteria remain unmet.

### 3.5 Architecture Review and Resolution

The independent Review is complete, evidence-based, and non-modifying. It found no ownership
violation and returned **REQUIRES REVISION** with eight Freeze blockers.

The Resolution appropriately avoids fabricating closure:

- ARB-007 is closed through an existing-source lifecycle clarification;
- ARB-008 is partially closed at the ownership level but still requires terminology correction;
- ARB-001 through ARB-006 remain open; and
- Architecture Review v2 and Freeze preparation remain ineligible until required changes exist.

The Board does not convert those open findings into approval conditions when they require a missing
architecture choice, ADR relationship, successor action, or source artifact.

### 3.6 Business Brain

The proposed Business Insight responsibility remains conceptually inside the sole Business Brain
Decision boundary. Recommendation Engine ownership and the nine-component physical boundary remain
unchanged. This is structurally compatible with Business Brain Freeze sections **8.4**, **10–12**.

However, Governance Disposition sections **1.5(6)** and **10(8)**, Successor section **15.2**, Freeze
Alignment sections **1.2(4)** and **10**, and review finding ARB-004 all require an approved Business
Brain compatibility or successor action. None exists. The Board cannot approve an absent successor
record through this decision.

### 3.7 ADR relationships

ADR-042 is Accepted and supplies the later Foundation direction. It does not explicitly state that
ADR-015 or ADR-016 is narrowed, partially superseded, or otherwise successor-related. ADR governance
requires explicit historical relationship treatment when Accepted meaning changes materially.

Review finding ARB-002 and Resolution ARB-002 leave this decision open. This Board record does not
select a relationship because doing so would exceed an approval-only task and could require a new
ADR under the existing lifecycle.

### 3.8 Authority chain

The current operational stop rule is safe: preserve all applicable guarantees and stop where
controlling sources differ. It is not a final successor authority interpretation.

AGENTS and Foundation place Freezes first, while the Core and Business Brain Freezes describe
Genesis as ultimate authority. Crosswalk section **3.2**, review finding ARB-006, and Resolution
ARB-006 all leave the successor-use interpretation unresolved. The Board cannot declare the chain
closed without changing repository authority, which this decision is prohibited from doing.

## 4. Decision Matrix

The matrix classifies readiness of each area for use in the proposed v1.1 Freeze basis. It does not
alter an artifact's pre-existing status.

| Review area | Decision | Evidence | Governance effect |
|---|---|---|---|
| Foundation | **Approved** | Foundation sections 12–17 and 22; ADR-042 | Remains approved successor input, not Freeze authority |
| Governance | **Deferred** | Disposition 1.5 and 10; ARB-001 | Proposed chain has no complete approval record and contains unmet exits |
| Authority | **Deferred** | Crosswalk 3.2–3.3; ARB-006 | Successor-use hierarchy remains unresolved |
| Compatibility | **Deferred** | Successor 3.2–3.3, 7, 13; ARB-003 | Direct-registration new-customer relationship remains incomplete |
| Business Brain | **Deferred** | Business Brain Freeze 18; Disposition 10(8); ARB-004 | Required compatibility/successor action is absent |
| Successor | **Deferred** | Successor 1.3, 15.1–15.2; Review verdict REQUIRES REVISION | Proposal must be corrected and re-reviewed before approval |
| Freeze Alignment | **Deferred** | Alignment 8–10 | Exit criteria are not passed; no effective replacement exists |
| ADR Relationships | **Deferred** | ADR-015, ADR-016, ADR-042; ADR governance; ARB-002 | Relationship requires explicit Governance treatment |
| Genesis | **Deferred** | Customer Journey v1.2; Workspace Lifecycle v1.0; ARB-005 | Versioned successor/addendum and exact source manifest are absent |
| Review Quality | **Approved** | Review sections 2–13; Resolution sections 2–9 | Review evidence is sufficient to prevent premature Freeze approval |

No area is Rejected. The Board finds the direction bounded but incomplete at mandatory authority and
compatibility gates.

## 5. Approval Conditions

Because the final decision is **REQUIRES ADDITIONAL GOVERNANCE**, the items below are re-entry
conditions rather than conditions attached to an approval.

| Condition | Requirement | Mandatory before Freeze | May be deferred | Documentation only | Governance only | Evidence |
|---|---|---:|---:|---:|---:|---|
| GOV-C01 | Explicitly govern the ADR-015/ADR-016/ADR-042 relationship without editing Accepted history; use a new unused ADR identifier if the ADR lifecycle requires it | Yes | No | No | Yes | ARB-002; Disposition 9.1(2–3) |
| GOV-C02 | Correct the Successor compatibility boundary so each retained new-customer entry has one architecture-consistent relationship to candidate review, authenticated conversion, first Business DNA publication, and Guided Activation | Yes, before re-review | No | No | No — bounded architecture correction and Governance approval | ARB-003; Resolution ARB-003 |
| GOV-C03 | Complete and approve the required Business Brain compatibility or successor action while preserving the sole Decision write model and physical boundary | Yes | No | No | No — Business Brain architecture review and Governance approval | ARB-004; Business Brain Freeze 18 |
| GOV-C04 | Publish the versioned Genesis successor/addendum and exact immutable source-version manifest while preserving Customer Journey and Workspace Lifecycle history | Yes | No | Yes — no new architecture | No — explicit Governance approval is also required | ARB-005; Disposition 9.1(5–6) |
| GOV-C05 | Approve one successor-use authority interpretation without rewriting historical Freezes | Yes | No | No | Yes | ARB-006; Crosswalk 3.2 |
| GOV-C06 | Carry the ARB-007 Business Architect Session lifecycle clarification into the revised successor/Freeze package | Yes | No | Yes | No | Resolution ARB-007 |
| GOV-C07 | Correct ambiguous Business Blueprint canonical-language usage while preserving Business DNA and governed owner outputs as sources of truth | Yes, before final Freeze manifest | No | Yes | No | Resolution ARB-008 |
| GOV-C08 | Re-review the revised complete package and obtain a Freeze-authorizing Architecture Review verdict before recording Successor and Alignment approval | Yes | No | No | Yes | Milestone Lifecycle phases 3–4 and 6–7; ARB-001 |

The following may remain deferred because the Successor already excludes them and this Board makes no
decision about them:

- UI, UX, screens, routes, and presentation state machines;
- APIs, Contracts, Events, services, persistence, schemas, tokens, storage, and deployment mechanisms;
- implementation, migration mechanics, and Feature 056;
- exact retention, conversion-token, Recommendation-review, Business DNA revision, Lineage storage,
  and Explainability-presentation mechanisms; and
- every unaffected Core and Business Brain deferred decision.

Deferral does not authorize implementation or permit an implementation default to become
architecture.

## 6. Governance Decision

### REQUIRES ADDITIONAL GOVERNANCE

The package is not approved to become the basis for Core Platform Architecture v1.1 Freeze in its
current state.

The decision is required because:

1. a reviewed architecture compatibility boundary remains incomplete;
2. two Accepted ADR relationships remain unresolved;
3. a required Business Brain successor action is missing;
4. Genesis successor provenance and the immutable source manifest are missing;
5. successor-use authority interpretation is unresolved; and
6. the independent review has not returned an APPROVED or APPROVED WITH MINOR FINDINGS verdict.

Approving with conditions would be improper because GOV-C02 requires a substantive proposal
correction and GOV-C01, GOV-C03, GOV-C04, and GOV-C05 require Governance artifacts or decisions that
do not yet exist. Under Milestone Lifecycle phase 4, a proposal requiring architectural correction
must be revised and reviewed again before becoming authoritative.

This decision preserves:

- Foundation Baseline v0.1 and ADR-042 as approved successor inputs;
- every Core Platform Freeze v1.0 guarantee;
- every Business Brain Freeze v1.0 ownership and physical-boundary guarantee;
- the complete Accepted ADR history;
- Customer Journey and Workspace Lifecycle provenance; and
- the possibility of a bounded Core Platform v1.1 successor after re-entry conditions pass.

## 7. Authorization

The repository is **not authorized to prepare Core Platform Architecture v1.1 Freeze** from the
current package.

This decision authorizes only the bounded Governance and proposal-remediation work listed in
GOV-C01 through GOV-C08. It does not authorize:

- creation or modification of an Architecture Freeze;
- canonical UI/UX reconciliation;
- Feature 056 or another Foundation implementation specification;
- frontend, backend, database, service, API, Contract, Event, persistence, or migration work; or
- Session 5.

Freeze preparation becomes eligible only after the revised package passes Architecture Review v2
with an explicit Freeze-authorizing verdict and receives the applicable approval record. Freeze
issuance and readiness remain later, separate gates.

## 8. Next Authorized Milestone

The exact next authorized milestone is:

**Foundation Successor Governance Remediation and Proposal Revision**

Its scope is limited to GOV-C01 through GOV-C07, followed by **independent Architecture Review v2**
under GOV-C08. The Milestone Lifecycle route is:

```text
Governance and proposal remediation
  → revised complete successor package
  → independent Architecture Review v2
  → explicit Governance approval decision
  → eligibility to prepare Core Platform Architecture v1.1 Freeze
```

If Architecture Review v2 does not return a Freeze-authorizing verdict, the package returns to the
affected earlier phase. No Freeze may be prepared by inference from this decision.

---

**Final Governance Decision:** **REQUIRES ADDITIONAL GOVERNANCE**

**Core Platform Architecture v1.1 Freeze preparation:** **NOT AUTHORIZED**
