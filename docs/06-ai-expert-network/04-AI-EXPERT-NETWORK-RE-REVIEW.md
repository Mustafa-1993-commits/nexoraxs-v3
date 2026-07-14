# AI Expert Network Proposal Baseline v0.1.1 Independent Re-Review

**Milestone:** AI Expert Network  
**Artifact type:** Independent Proposal Re-Review  
**Baseline reviewed:** Proposal v0.1 + Proposal Patch v0.1.1  
**Review mode:** Non-modifying quality gate  
**Status:** Completed  
**Final verdict:** **PATCH REQUIRES ADDITIONAL WORK**

---

## 1. Executive Summary

This Re-Review evaluates the AI Expert Network Proposal and Proposal Patch together as the single
Proposal Baseline v0.1.1. Patch precedence is applied to the Proposal wherever PP-AEN-01 through
PP-AEN-07 provide controlling wording. The Proposal and Patch are not assessed as independent
architectures.

The merged baseline is internally explicit about the intended AI Expert Definition,
Marketplace representation, logical responsibility Domain, lifecycle, and evaluation boundaries.
PP-AEN-05, PP-AEN-06, and PP-AEN-07 are fully resolved. The Patch also preserves the full frozen
Marketplace fact and lifecycle model, contains no implementation or technology design, adds no
Domain or capability, and retains the existing Deferred Decision and Draft ADR registers.

The baseline nevertheless fails the cross-milestone authority test in two related but independently
material ways:

1. PP-AEN-01, PP-AEN-02, and PP-AEN-04 assign every AI Expert Definition and Definition Version
   exclusively to AI Coordinator Expert Registry. Frozen Governance and Core Platform documents
   instead assign the canonical owner to Core/Expert Registry or Marketplace according to
   publication.
2. PP-AEN-03 and PP-AEN-04 require a Marketplace AI Expert Asset Version to reference a separate,
   Registry-owned AI Expert Definition Version and place all Definition facts inside the Expert
   Registry Registration aggregate. Frozen Core permits Marketplace Asset Version itself to be
   the source and version owner for a Marketplace-published AI Expert Definition.

These are canonical ownership, write-model, aggregate, lifecycle, and cross-milestone compatibility
changes. A Proposal Patch whose declared Architecture and ownership impact is zero cannot override
the frozen Governance and Core Platform baselines. The existing `DADR-AEN-03` remains Draft and no
Accepted ADR or updated Core Platform Freeze authorizes the change.

### 1.1 Re-Review result

| Assessment | Result |
|---|---|
| PP-AEN items fully validated | 3 of 7 |
| PP-AEN items internally clear but not cross-milestone aligned | 4 of 7 |
| Blocking findings | 2 |
| Editorial findings | 1 |
| New Domains detected | Zero |
| New capabilities detected | Zero |
| New ADR identifiers or statuses detected | Zero |
| New Deferred Decisions detected | Zero |
| Implementation or technology leakage | Zero |
| Architecture stability | **NOT STABLE at the Definition ownership and version/aggregate boundary** |

## 2. Patch Verification

### 2.1 PP-AEN verification matrix

| Patch item | Re-Review result | Verification |
|---|---|---|
| PP-AEN-01 — Canonical AI Expert Definition Ownership | **NOT FULLY RESOLVED** | Registry-only ownership is clear inside the merged baseline, but it contradicts frozen publication-path ownership in Governance and Core Platform. |
| PP-AEN-02 — Marketplace Representation Boundary | **NOT FULLY RESOLVED** | The category-qualified Marketplace representation and full frozen Marketplace state are documented correctly, but the statement that Marketplace can never own a published AI Expert Definition conflicts with the frozen owner matrix. |
| PP-AEN-03 — Version Relationship | **NOT FULLY RESOLVED** | The exact reference is unambiguous, but the required separate Registry-owned Definition Version changes the frozen Marketplace-published definition/version relationship and the original Proposal aggregate allocation. |
| PP-AEN-04 — Canonical Fact Alignment | **NOT FULLY RESOLVED** | The matrix assigns one owner per fact internally, but its Definition owner, writer, and aggregate placement conflict with the frozen source-of-truth model. |
| PP-AEN-05 — Logical Domain Clarification | **PASS** | AEND-01 through AEND-06 are explicitly Logical Responsibility Domains inside the frozen AI Coordination Domain and are not bounded contexts, ownership Domains, services, deployment units, or runtime authorities. |
| PP-AEN-06 — Lifecycle Clarification | **PASS** | Definition, Marketplace-owned, eligibility, Interaction, and provider lifecycle concerns remain independent; the Patch also preserves the separate lifecycles inside Marketplace. |
| PP-AEN-07 — Evaluation Boundary | **PASS** | AEND-06 owns governed evaluation observations only and explicitly excludes Marketplace Trust, Business Outcomes, Knowledge evolution, provider truth, and every referenced external source fact. |

### 2.2 Patch-scope preservation

| Required constraint | Result | Evidence |
|---|---|---|
| Proposal and Patch read as one baseline | PASS | Patch section 2.2 controls only PP-AEN-01 through PP-AEN-07 interpretations. |
| Proposal source document modified | NO | Re-Review is non-modifying. |
| Domain added, removed, or renamed | ZERO | Six AEND logical responsibility Domains remain. |
| Capability added, removed, or renamed | ZERO | Eighteen AEC capabilities remain. |
| Deferred Decision added or resolved | ZERO | `DD-AEN-01` through `DD-AEN-24` remain preserved. |
| Draft ADR identifier or status added/changed | ZERO | Twelve Draft candidates remain; `DADR-AEN-03` remains Draft. |
| Accepted ADR changed | ZERO | None. |
| API, Contract, Event, database, infrastructure, runtime, deployment, framework, provider, vendor, or implementation design introduced | ZERO | The baseline remains technology independent. |

The count and identifier checks pass. They do not cure the substantive ownership and aggregate
changes embodied by the controlling Patch wording.

## 3. Ownership Verification

### 3.1 Canonical ownership and facts

| Canonical subject | Merged Proposal Baseline v0.1.1 | Frozen authority | Result |
|---|---|---|---|
| AI Expert Definition | Always AI Coordinator Expert Registry | Core or Marketplace according to publication | **CONFLICT** |
| AI Expert Definition Version | Always AI Coordinator Expert Registry | Expert Registry or Marketplace according to publication | **CONFLICT** |
| Expert Registry registration and Coordinator metadata | AI Coordinator Expert Registry | Core AI Coordinator | PASS |
| Marketplace Asset and Marketplace Asset Version for the AI Expert category | Marketplace | Marketplace | PASS |
| Publisher, Review, Certification, Trust, Compatibility, Dependency, License, Offer, Purchase, Entitlement, Distribution, Version Selection, Installation, scoped configuration, Activation, Applicability, and Governance Action | Marketplace | Marketplace | PASS |
| interaction-specific eligibility and selection | AI Coordinator | AI Coordinator | PASS |
| Expert Contribution, collaboration lineage, assurance, unified response, and AI Action Proposal | AI Coordinator | AI Coordinator | PASS |
| completed Decision and candidate reasoning | Business Brain | Business Brain | PASS |
| Recommendation and disposition | Recommendation Engine | Recommendation Engine | PASS |
| Knowledge and Knowledge Pack content | Knowledge Engine | Knowledge Engine | PASS |
| Configuration Proposal | Configuration Engine | Configuration Engine | PASS |
| target configuration and operational facts | Applicable Core or Operating System owner | Applicable Core or Operating System owner | PASS |
| Audit Record | Core Audit Service | Core Audit Service | PASS |

### 3.2 Canonical write models

| Write boundary | Verification |
|---|---|
| AI coordination write model | PASS. It remains AI Coordinator-owned and writes only AI Interaction and AI-owned artifacts. |
| Expert Registry write model | **CONFLICT.** The Patch makes it the sole Definition and Definition Version writer for every publication path, while frozen Core permits Marketplace Asset Version to be the source/write boundary for Marketplace-published definitions. |
| Marketplace write models | PASS for Marketplace facts and state; **CONFLICT** only where the Patch removes their frozen publication-path Definition ownership. |
| Decision, Recommendation, Configuration Proposal, target, and Audit write models | PASS. No writer moved into AI Expert Network. |

There is no duplicate writer inside the Patch's own replacement model. The failure is that the
replacement model is not the model frozen by the governing baseline.

### 3.3 Aggregate ownership

| Aggregate | Verification |
|---|---|
| Expert Registry Registration | **CONFLICT.** The Patch places every canonical Definition and Definition Version in this aggregate. The frozen and original Proposal publication-path model placed Marketplace-published definition content/version in the Marketplace Asset aggregate and retained only an exact external reference plus Coordinator metadata in Registry Registration. |
| Marketplace Asset / Marketplace Asset Version | PASS for the existing Marketplace representation and state; **CONFLICT** where Definition content is removed from the frozen Marketplace publication path. |
| AI Interaction | PASS. Expert Contributions, eligibility, selection, collaboration, assurance, response, and observations remain owned children rather than hidden aggregate roots. |
| Audit Record | PASS. Core Audit Service remains the sole owner. |

No hidden aggregate was otherwise detected.

### 3.4 Domain and capability ownership

- AEND-01 through AEND-06 remain documentation-level Logical Responsibility Domains inside the
  frozen AI Coordination Domain.
- They do not become bounded contexts, deployment units, services, ownership Domains, aggregate
  roots, or independent runtime authorities.
- The fifteen frozen AI Coordinator Components remain unchanged.
- The eighteen AEC capabilities remain advisory contribution capabilities and do not become
  canonical platform Capability definitions.
- No capability leaks into Business Brain, Recommendation Engine, Knowledge Engine,
  Configuration Engine, Marketplace, Commerce OS, or a future Operating System.

Domain and capability containment therefore passes independently of the Definition ownership
blocker.

### 3.5 Lifecycle separation

The merged baseline correctly keeps these concerns independent:

- Definition Lifecycle;
- the separately frozen Marketplace lifecycles;
- interaction-specific Eligibility Lifecycle;
- AI Interaction Lifecycle; and
- Provider Lifecycle under existing deferrals.

There is no hidden unified Expert Lifecycle. The remaining conflict concerns who owns Definition
and Definition Version, and therefore who controls the Definition Lifecycle for a
Marketplace-published Expert; it does not invalidate the separation principle itself.

## 4. Cross-Milestone Verification

### 4.1 Authority matrix

| Authority | Result | Re-Review evidence |
|---|---|---|
| Genesis v1.1 | PASS WITH GOVERNANCE DEPENDENCY | Genesis requires specialized, versioned, coordinated Experts, Marketplace participation, governed Knowledge use, one unified response, and the conceptual lifecycle. It does not establish an exclusive Registry owner that supersedes the more specific frozen Governance/Core owner matrix. |
| Governance — Accepted ADRs | PARTIAL | ADR-029 through ADR-032 preserve downstream AI, Coordinator decomposition, coordinated Experts, and governed learning. No Accepted ADR transfers every published Definition to sole Registry ownership. |
| Governance — canonical Glossary | **FAIL** | `AI Expert` is owned by Core or Marketplace according to publication; `Expert Registry` ownership includes Marketplace for published Experts. |
| Governance — Milestone Lifecycle | **FAIL** | A Freeze Alignment Patch may not change canonical ownership, lifecycle, aggregate/data ownership, AI authority, or frozen compatibility while declaring Architecture impact zero. |
| Core Platform v1.0/v1.0.1 | **FAIL** | Domain Model and Data Ownership explicitly assign AI Expert Definition/version to Core/Expert Registry or Marketplace according to publication and permit Marketplace Asset Version as the source/version owner. |
| Business Brain v1.0 | PASS | Canonical Decision completes deterministically before AI; Expert contributions cannot enter Decision formation or history. |
| Commerce OS v1.0 | PASS | Commerce facts and effects remain Commerce-owned; AI participation is optional, advisory, and failure-isolated. |
| Marketplace v1.0 | PASS WITH UPSTREAM CONFLICT NOTED | The Patch now preserves all frozen Marketplace facts and separate lifecycles, category-qualifies AI Expert Asset references, and keeps selection/AI artifacts in AI Coordinator. Marketplace Freeze does not explicitly supersede the Core publication-path Definition owner. |

### 4.2 External-owner verification

| External owner | Result |
|---|---|
| Business Brain | PASS — completed Decision and candidate reasoning remain Business Brain-owned. |
| Recommendation Engine | PASS — Expert Contribution never becomes Recommendation or Recommendation Candidate. |
| Knowledge Engine | PASS — Experts consume authorized, versioned Knowledge and cannot publish or evolve it. |
| Capability Registry | PASS — Expert definitions reference canonical Capabilities without redefining them. |
| Configuration Engine | PASS — advisory content and AI Action Proposal remain distinct from Configuration Proposal. |
| Commerce OS and future Operating Systems | PASS — every target validates and owns its writes; no OS requires AI Expert Network for core operation. |
| Core Identity, Permission, Security, Audit, Search, Analytics, and Notification owners | PASS — no ownership moves into the Network. |

### 4.3 Deferred Decision preservation

All twenty-four AI Expert Network Deferred Decisions remain present and unresolved. Core
`D-36` through `D-40`, Business Brain, Commerce OS, and Marketplace inherited deferrals remain
referenced without silent resolution. The blocker is not a lost Deferred Decision; it is an
immediate controlling ownership and aggregate decision that conflicts with already-frozen facts.

### 4.4 ADR discipline

- No Accepted ADR has been modified or reopened.
- No new ADR identifier or status was introduced.
- `DADR-AEN-03` remains Draft after its subject was normalized by the Patch.
- A Draft candidate cannot supersede frozen Governance or Core Platform ownership.
- Core Platform Change Control requires an Accepted ADR, independent Architecture Review, and an
  updated Freeze for a material ownership or aggregate change.

ADR discipline therefore fails for the controlling ownership change even though the ADR register
counts remain unchanged.

### 4.5 Proposal completeness

The baseline otherwise covers its proposed Domains, capabilities, ownership model, canonical
facts, write models, aggregates, read models, lifecycle concerns, collaboration, Security,
privacy, Audit, operations, risks, Deferred Decisions, Draft ADR candidates, and success criteria.
Completeness cannot compensate for a conflict with a frozen canonical owner.

## 5. Remaining Findings

### F-AEN-RR-01 — Frozen canonical ownership conflict

**Severity:** Blocking  
**Affected patch items:** PP-AEN-01, PP-AEN-02, PP-AEN-04  
**Architecture impact:** Canonical owner, writer, and Definition Lifecycle authority  
**Documentation Waves blocked:** Yes

**Description**

The Patch assigns AI Expert Definition and AI Expert Definition Version exclusively to AI
Coordinator Expert Registry and states that Marketplace never owns either. Frozen Governance and
Core Platform explicitly assign Definition ownership to Core/Expert Registry or Marketplace
according to publication.

**Why it matters**

The two baselines can direct different implementations to different sources of truth. Patch
precedence supersedes Proposal v0.1 only; it does not supersede Governance, Core Platform Wave 1,
Core Platform Wave 2, or the Core Platform Freeze that includes those artifacts. Classifying the
change as Architecture impact `NONE` does not remove the conflict.

**Evidence**

- Patch: `03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md`, lines 73–94, 147–151,
  235–248, and 396–403.
- Governance Glossary: `docs/00-governance/glossary/GLOSSARY.md`, lines 871–878 and 943–950.
- Core Data Ownership: `docs/02-core-platform/04-DATA-OWNERSHIP.md`, lines 170 and 321.
- Core Domain Model: `docs/02-core-platform/03-DOMAIN-MODEL.md`, lines 518–520 and 556.

**Required action before another Re-Review**

Use approved change control to establish one authoritative owner model. Either the Proposal
Baseline must preserve the currently frozen publication-path ownership, or an Accepted ADR,
Architecture Review, and updated affected Freeze must explicitly supersede it. This Re-Review
does not choose or implement either outcome.

### F-AEN-RR-02 — New version relationship and aggregate allocation presented as clarification

**Severity:** Blocking  
**Affected patch items:** PP-AEN-03, PP-AEN-04  
**Architecture impact:** Canonical version relationship, source of truth, aggregate content, and write boundary  
**Documentation Waves blocked:** Yes

**Description**

The Patch requires each Marketplace AI Expert Asset Version to reference exactly one separate,
Registry-owned AI Expert Definition Version and places all canonical Definition facts inside the
Expert Registry Registration aggregate. The frozen Core model permits Marketplace Asset Version
itself to be the source/version owner for a Marketplace-published AI Expert Definition. Proposal
v0.1 followed that frozen allocation before the Patch superseded it.

**Why it matters**

The change creates a different two-version relationship and moves canonical content between
aggregate boundaries. It is therefore not merely an editorial removal of conditional language.
It affects reproducibility, version lineage, write authority, lifecycle authority, and
cross-milestone compatibility. `DADR-AEN-03` remains Draft and cannot make this decision
authoritative over a frozen baseline.

**Evidence**

- Patch: `03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md`, lines 191–214, 227–263.
- Original Proposal: `02-AI-EXPERT-NETWORK-PROPOSAL.md`, lines 653–668, 690–719, and
  1113–1131.
- Capability Map: `01-AI-EXPERT-NETWORK-CAPABILITY-MAP.md`, Expert Version Relationships,
  which retained the exact identical/linked/synchronized/governed relationship for Proposal
  decision.
- Core Data Ownership: `docs/02-core-platform/04-DATA-OWNERSHIP.md`, lines 170 and 321.
- Governance Milestone Lifecycle: `docs/00-governance/MILESTONE-LIFECYCLE.md`, ADR and
  architectural change-control rules.

**Required action before another Re-Review**

Classify and govern the version/source/aggregate decision consistently with F-AEN-RR-01. Do not
proceed on a claim of zero architectural impact while the frozen and patched models differ.

### F-AEN-RR-03 — Marketplace publication update wording

**Severity:** Editorial  
**Affected patch item:** PP-AEN-01  
**Freeze blocking by itself:** No

The Patch says publication “creates or updates” a Marketplace representation. Frozen Marketplace
rules allow Draft content to change but prohibit mutation of a Published Marketplace Asset
Version; published change creates a successor version. A future authorized correction should
distinguish updating mutable Draft/metadata from creating a successor Published version. Other
Patch wording correctly states immutability after publication, so this is an editorial ambiguity
rather than a separate architecture conflict.

### 5.1 Remaining risks

| ID | Remaining risk | Consequence |
|---|---|---|
| R-AEN-RR-01 | Different teams follow Registry-only versus publication-path ownership | parallel AI Expert Definition truths and incompatible write models |
| R-AEN-RR-02 | Documentation Waves expand the unapproved aggregate allocation | the conflict becomes distributed across detailed architecture and harder to correct |
| R-AEN-RR-03 | Draft DADR wording is treated as accepted authority | frozen architecture is changed without Governance approval or traceable supersession |
| R-AEN-RR-04 | “updates” is read as in-place Published Marketplace version mutation | Marketplace immutability and reproducibility are weakened |

## 6. Recommendation

The Proposal Baseline v0.1.1 must not enter Documentation Wave 1 while F-AEN-RR-01 and
F-AEN-RR-02 remain open. The next review must validate a single owner, writer, source-of-truth,
version relationship, and aggregate allocation that is authoritative across Governance, Core
Platform, Marketplace, and AI Expert Network.

This Re-Review introduces no replacement architecture and selects no corrective design. It only
reports the unresolved cross-baseline conflict and applies the approved quality gate.

# PATCH REQUIRES ADDITIONAL WORK

## References

### Proposal Baseline v0.1.1

- [AI Expert Network Discovery v0.1](00-AI-EXPERT-NETWORK-DISCOVERY.md)
- [AI Expert Network Capability Map v0.1](01-AI-EXPERT-NETWORK-CAPABILITY-MAP.md)
- [AI Expert Network Proposal v0.1](02-AI-EXPERT-NETWORK-PROPOSAL.md)
- [AI Expert Network Proposal Patch v0.1.1](03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md)

### Governing authority

- [Governance Milestone Lifecycle](../00-governance/MILESTONE-LIFECYCLE.md)
- [Governance Canonical Glossary](../00-governance/glossary/GLOSSARY.md)
- [Governance ADR Repository](../00-governance/ADR/README.md)
- [Genesis AI Strategy](../01-genesis/08-AI-STRATEGY.md)
- [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Genesis Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)
- [Core Platform Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)
- [Core Platform Data Ownership](../02-core-platform/04-DATA-OWNERSHIP.md)
- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Commerce OS Freeze v1.0](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md)
- [Marketplace Freeze v1.0](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md)

### Directly relevant Accepted ADRs

- [ADR-027 — Marketplace Bounded Context Within Core](../00-governance/ADR/ADR-027-marketplace-bounded-context-within-core.md)
- [ADR-028 — Immutable Marketplace Assets and Scoped State](../00-governance/ADR/ADR-028-immutable-marketplace-assets-scoped-state.md)
- [ADR-029 — AI Downstream of Knowledge, Rules, and Authorization](../00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md)
- [ADR-030 — AI Coordinator Separated Orchestration](../00-governance/ADR/ADR-030-ai-coordinator-separated-orchestration.md)
- [ADR-031 — Coordinated AI Expert Network](../00-governance/ADR/ADR-031-coordinated-ai-expert-network.md)
- [ADR-032 — Governed AI and Platform Learning](../00-governance/ADR/ADR-032-governed-ai-and-platform-learning.md)
