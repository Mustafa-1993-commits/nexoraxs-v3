# AI Expert Network Corrective Proposal Patch v0.1.2

**Milestone:** AI Expert Network  
**Artifact type:** Corrective Proposal Patch  
**Status:** Proposed for independent Re-Review  
**Applies to:** AI Expert Network Proposal Baseline v0.1.1  
**Correction scope:** CR-AEN-01 through CR-AEN-05 only  
**Architecture redesign:** None

---

## 1. Purpose

This document corrects only the architectural conflicts introduced by Proposal Patch v0.1.1 and
identified as F-AEN-RR-01 and F-AEN-RR-02 by the independent Re-Review and Conflict Analysis.

It restores Proposal v0.1's publication-path ownership, version ownership, write boundary, and
aggregate allocation exactly as permitted by Governance and the frozen Core Platform. It also
preserves every v0.1.1 clarification that remains compatible with those authorities.

This Patch is not a new Proposal, architecture redesign, Core Platform change, Marketplace change,
Governance change, Documentation Wave, ADR, or implementation specification.

The Proposal baseline for the next Re-Review is:

```text
02-AI-EXPERT-NETWORK-PROPOSAL.md
  +
03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md
  +
03A-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.2.md
  =
AI Expert Network Proposal Baseline v0.1.2
```

## 2. Patch Authority and Precedence

### 2.1 Authority

This corrective Patch follows:

- Governance canonical terminology and Milestone Lifecycle;
- Genesis v1.1;
- frozen Core Platform Architecture v1.0 and Documentation Baseline v1.0.1;
- frozen Business Brain Architecture v1.0;
- frozen Commerce OS Architecture v1.0;
- frozen Marketplace Architecture v1.0;
- AI Expert Network Proposal v0.1;
- the independent Re-Review; and
- the approved Conflict Analysis classification.

### 2.2 Precedence

For CR-AEN-01 through CR-AEN-05 only, this Patch supersedes conflicting statements in Proposal
Patch v0.1.1. Specifically:

1. v0.1.1 Registry-only ownership statements are superseded;
2. v0.1.1 Registry-only Definition Version statements are superseded;
3. v0.1.1 mandatory separate Registry Definition Version behind Marketplace publication is
   superseded;
4. v0.1.1 allocation of every Definition and Definition Version to Expert Registry Registration
   is superseded;
5. v0.1.1 normalization of `DADR-AEN-03` to Registry-only ownership is superseded; and
6. v0.1.1 consolidated baseline and validation claims are superseded wherever they depend on
   those statements.

Proposal v0.1 controls publication-path ownership, version ownership, write responsibility, and
aggregate placement as restated by this Patch. All Proposal v0.1 decisions outside this correction
remain unchanged.

The following valid v0.1.1 clarifications remain preserved subject to the corrected
publication-path owner:

- AEND-01 through AEND-06 are Logical Responsibility Domains only;
- lifecycle concerns remain separate;
- AEND-06 owns governed evaluation observations only;
- Marketplace AI Expert Asset terminology is category-qualified Marketplace terminology, not a
  new canonical type;
- Marketplace retains all frozen Marketplace facts and lifecycle concerns;
- AI Coordinator retains eligibility, selection, coordination, AI Interaction, and AI artifact
  ownership; and
- Published Marketplace Asset Versions remain immutable.

### 2.3 Classification

| Control | Result |
|---|---|
| Patch classification | Corrective Proposal alignment Patch |
| Architecture redesign | None; Proposal v0.1 architecture restored |
| Core Platform change | Zero |
| Governance change | Zero |
| Marketplace change | Zero |
| Domain changes | Zero |
| Capability changes | Zero |
| New canonical facts | Zero |
| New write models or aggregates | Zero |
| New Deferred Decisions | Zero |
| New ADRs or Draft ADR candidates | Zero |
| Implementation or technology decisions | Zero |

## 3. CR-AEN-01 — Restore Publication-Path Canonical Ownership

### 3.1 Controlling ownership rule

Each AI Expert Definition instance and version has exactly one canonical owner selected by its
publication path.

| Publication path | Canonical Definition owner | Canonical Definition Version owner | Expert Registry responsibility |
|---|---|---|---|
| Core-held AI Expert Definition | Core AI Coordinator Expert Registry | Core AI Coordinator Expert Registry | owns Definition identity, content, versions, lineage, registration metadata, and Core-held Definition Lifecycle |
| Marketplace-published AI Expert Definition | Marketplace through the exact Marketplace Asset Version | Marketplace through the exact Marketplace Asset Version | owns registration, eligibility, and coordination metadata plus an exact reference to the canonical Marketplace version; does not duplicate Marketplace Definition content |

Ownership is mutually exclusive according to publication path. Core AI Coordinator and
Marketplace never jointly write the same Definition content or Definition Version.

### 3.2 Publication-path flow

```text
Core-held path
  -> AI Expert Definition
  -> AI Expert Definition Version
  -> canonical owner and writer: Core AI Coordinator Expert Registry

Marketplace-published path
  -> Marketplace Asset for AI Expert category
  -> exact Marketplace Asset Version
  -> canonical Definition content and version owner: Marketplace
  -> Expert Registry Registration stores exact external reference and Coordinator metadata only
```

### 3.3 Publication and lineage

Publication does not create shared ownership. If Core-held Definition content is later published
through Marketplace, publication creates a distinct Marketplace-owned immutable Asset Version
with explicit source lineage. That Marketplace version is canonical for the Marketplace-published
content. It does not transfer, replace, or rewrite the historical Core-held Definition Version,
which remains Core-owned and immutable.

A later change to Published Marketplace content creates a successor Marketplace Asset Version. It
does not update a Published version in place.

### 3.4 Superseded v0.1.1 meaning

The following v0.1.1 meaning no longer controls:

- AI Expert Definition is always Registry-owned;
- AI Expert Definition Version is always Registry-owned;
- Marketplace never owns a Marketplace-published AI Expert Definition; and
- publication path never affects canonical Definition ownership.

### 3.5 Impact

- F-AEN-RR-01 ownership conflict: **resolved**
- New owner introduced: **ZERO**
- Frozen owner changed: **ZERO**
- Shared or conditional simultaneous ownership introduced: **ZERO**

## 4. CR-AEN-02 — Restore Publication-Path Version Ownership

### 4.1 Controlling version model

| Versioned subject | Sole version owner | Meaning |
|---|---|---|
| Core-held AI Expert Definition Version | Core AI Coordinator Expert Registry | immutable version of Core-held Definition content once made available for AI Interaction use |
| Marketplace-published AI Expert Definition Version | Marketplace through the exact Marketplace Asset Version | immutable Published Marketplace content and version-scoped declarations used as the canonical Definition Version for that publication path |
| Expert Registry registration revision | Core AI Coordinator Expert Registry | Coordinator-owned registration, eligibility, compatibility, and coordination metadata; never a duplicate Definition Version for the Marketplace path |
| provider/model version | existing deferred external boundary | selected reference and observed provenance only |
| AI Interaction version references | Core AI Coordinator | exact selected Definition version and applicable source, provider/model, policy, and context references for one Interaction |

### 4.2 Marketplace-published version reference

For a Marketplace-published Expert, Expert Registry stores an exact reference to the canonical
Marketplace Asset Version.

```text
Expert Registry Registration
  -> registration metadata
  -> eligibility metadata
  -> coordination metadata
  -> exact Marketplace Asset Version reference

Marketplace Asset Version
  -> canonical Marketplace-published AI Expert Definition content
  -> canonical version owner: Marketplace
```

There is no mandatory separate Registry-owned canonical Definition Version behind a
Marketplace-published version. The exact Registry reference does not copy, relocate, or share the
Marketplace Definition content.

### 4.3 Version invariants

1. Every selected Expert resolves to one exact canonical Definition Version.
2. The version owner is determined by publication path.
3. A version already used by an AI Interaction is never rewritten.
4. A Published Marketplace Asset Version remains immutable.
5. Improvement or correction creates a successor version under the same canonical owner unless a
   separate governed publication path creates a distinct owner-specific version with lineage.
6. Registry registration revision never becomes a second Definition Version.
7. Version selection never grants Permission, confirms current eligibility, or authorizes a
   target effect.

### 4.4 Superseded v0.1.1 meaning

The following v0.1.1 meaning no longer controls:

- every Marketplace AI Expert Asset Version references a separate Registry-owned Definition
  Version;
- Definition Version and Marketplace Asset Version must always be two canonical version facts for
  Marketplace publication; and
- Marketplace Asset Version is representation-only when it is the canonical Definition Version
  for the Marketplace-published path.

### 4.5 Impact

- F-AEN-RR-02 version conflict: **resolved**
- New version concept introduced: **ZERO**
- Version owner changed from frozen baseline: **ZERO**
- Dual canonical Definition model introduced: **ZERO**

## 5. CR-AEN-03 — Restore Aggregate Allocation

### 5.1 Controlling aggregate matrix

| Aggregate | Sole owner | Contains | Explicit exclusion |
|---|---|---|---|
| Expert Registry Registration — Core-held path | Core AI Coordinator Expert Registry | registration identity and metadata; canonical Core-held Definition content; immutable Core-held versions; Definition Lifecycle and lineage | Marketplace content/state, Knowledge, Capability, provider truth |
| Expert Registry Registration — Marketplace-published path | Core AI Coordinator Expert Registry | registration identity; registration, eligibility, compatibility, and coordination metadata; exact Marketplace Asset Version reference | Marketplace-published Definition content/version, Marketplace state, Knowledge, Capability, provider truth |
| Marketplace Asset / Marketplace Asset Version | Marketplace | Marketplace-published AI Expert Definition content and version; Marketplace representation, declarations, provenance, and applicable Marketplace lifecycle facts | AI Interaction eligibility, selection, contribution, provider invocation, unified response, AI Action Proposal |
| AI Interaction | Core AI Coordinator | authorization/context references, exact selected version, eligibility, selection, Expert Contributions, collaboration, validation, assurance, unified response, Action Proposal, and governed observations | canonical Definition content, external source content, Marketplace state, or target execution |
| Audit Record | Core Audit Service | append-only consequential history | mutable AI telemetry, unrestricted context, or canonical Definition ownership |

The two Expert Registry Registration rows describe path-specific content rules for the same
approved aggregate. They do not create two aggregate types.

### 5.2 Aggregate invariants

1. Marketplace-published Definition content remains inside the Marketplace aggregate.
2. Expert Registry Registration does not duplicate Marketplace canonical Definition content.
3. Cross-aggregate references never transfer ownership.
4. Expert Contribution, eligibility, selection, collaboration lineage, assurance findings, and
   evaluation observations remain owned children of AI Interaction rather than hidden aggregate
   roots.
5. No aggregate writes another aggregate's canonical state directly.

### 5.3 Impact

- F-AEN-RR-02 aggregate conflict: **resolved**
- Aggregate introduced, removed, or renamed: **ZERO**
- Canonical content duplicated: **ZERO**
- Hidden aggregate introduced: **ZERO**

## 6. CR-AEN-04 — Remove Conflicting v0.1.1 Wording

The following controlling corrections apply wherever Proposal Patch v0.1.1 states or implies the
superseded meaning.

| Conflicting v0.1.1 meaning removed | Controlling v0.1.2 meaning |
|---|---|
| Registry always owns every AI Expert Definition | Registry owns Core-held Definitions; Marketplace Asset Version owns Marketplace-published Definitions. |
| Registry always owns every AI Expert Definition Version | Version ownership follows the same mutually exclusive publication path. |
| Marketplace never owns a published AI Expert Definition | Marketplace owns the Definition content/version published as its exact Marketplace Asset Version. |
| Every Marketplace Asset Version references a separate Registry-owned Definition Version | Registry references the exact canonical Marketplace Asset Version; no separate Registry Definition Version is mandatory for this path. |
| Expert Registry Registration contains every Definition and Definition Version | It contains canonical Definition content only for Core-held Definitions; Marketplace path contains metadata and exact external reference only. |
| Marketplace AI Expert Asset Version is always only a separate representation | It is category-qualified Marketplace terminology and is the canonical Definition content/version for a Marketplace-published Expert. |
| Publication creates or updates a separate Marketplace representation | Publication creates an immutable Published Marketplace Asset Version; later Published change creates a successor version. |
| `DADR-AEN-03` formalizes sole Registry ownership | Original Proposal wording is restored: `AI Expert Definition Publication-Path Ownership`, formalizing exclusive Core-held versus Marketplace-published ownership and Registry reference. |

### 6.1 No dual canonical Definition

The publication-path model does not create two canonical Definitions for one Definition instance.
Each instance has one canonical owner and version source. Historical Core-held source lineage and
a separately published Marketplace Asset Version remain distinct owner-specific versions; neither
is a mutable duplicate of the other.

### 6.2 Draft ADR status

`DADR-AEN-03` retains its original Proposal v0.1 identifier, subject, scope, and Draft status. No
ADR is created, accepted, rejected, reopened, or superseded by this Patch.

## 7. CR-AEN-05 — Preserve Valid v0.1.1 Clarifications

### 7.1 Logical Responsibility Domains

The following six approved Domains remain **Logical Responsibility Domains inside the frozen AI
Coordination Domain**:

1. AEND-01 — Expert Definition and Version;
2. AEND-02 — Expert Eligibility Context;
3. AEND-03 — Expert Advisory Contribution;
4. AEND-04 — Expert Collaboration Participation;
5. AEND-05 — Expert Assurance and Explainability; and
6. AEND-06 — Expert Evaluation and Improvement.

They are not bounded contexts, ownership Domains, services, deployment units, new AI Coordinator
Components, independent aggregates, or runtime authorities. AEND-01 organizes AI Coordinator
responsibility to own Core-held Definitions or reference Marketplace-owned Definitions according
to publication path; it does not make AI Coordinator the owner of Marketplace content.

### 7.2 Lifecycle separation

The lifecycle concerns remain independent:

| Lifecycle concern | Controlling owner or boundary | Preserved separation |
|---|---|---|
| Core-held Definition Lifecycle | Core AI Coordinator Expert Registry | governs Core-held Definition and Definition Version only |
| Marketplace-published Definition and Marketplace lifecycle concerns | Marketplace | Marketplace Asset Version is the canonical published Definition Version; Marketplace publication and each scoped Marketplace lifecycle remain separate |
| Eligibility Lifecycle | AI Coordinator | interaction-specific evaluation under current authorization, policy, version, and context |
| Interaction Lifecycle | AI Coordinator | governs AI Interaction and AI-owned artifacts only |
| Provider Lifecycle | existing deferred external boundary | observed by AI Coordinator without becoming Definition, Marketplace, eligibility, or Interaction truth |

There is no single unified Expert Lifecycle and no aggregate or owner spanning these concerns.
Marketplace Review, Certification, licensing, purchase, entitlement, distribution, installation,
Activation, Applicability, upgrade, removal, and Governance lifecycles remain separately frozen.

`Improved` never permits mutation of a used Definition Version or Published Marketplace Asset
Version. Exact state vocabulary and provider policy remain under existing Deferred Decisions.

### 7.3 Evaluation boundary

AEND-06 owns only governed evaluation observations inside the AI Coordinator boundary. It never
owns:

- Marketplace Trust or Marketplace Trust Profile;
- Business Outcomes;
- Knowledge evolution, Knowledge changes, Knowledge Objects, or Knowledge Packs;
- provider truth or Provider Lifecycle;
- customer feedback source truth;
- Business DNA, Rules, Capabilities, Decision, Recommendation, or Configuration Proposal;
- target configuration or Operating System facts; or
- Audit Records.

Only the existing canonical owner may accept, write, publish, version, or apply a change arising
from an evaluation observation.

### 7.4 Marketplace representation and terminology

`Marketplace AI Expert Asset` and `Marketplace AI Expert Asset Version` remain category-qualified
references to the approved `Marketplace Asset` and `Marketplace Asset Version` concepts for the
AI Expert category. They do not create a new subtype, fact family, aggregate, Domain, or write
model.

Marketplace retains every frozen Marketplace fact and lifecycle concern, including Publisher,
Review, Certification, Trust, Compatibility, Dependency, License, Offer, Purchase, Entitlement,
Distribution, Version Selection, Installation, scoped configuration, Activation, Applicability,
and Governance Action.

For the Marketplace-published path, the Marketplace representation contains the canonical
published Definition content. For the Core-held path, any Marketplace projection or discovery
reference does not transfer the Core-held Definition's ownership.

### 7.5 AI Coordinator boundary

AI Coordinator remains the sole owner of:

- current authorization resolution and minimum context construction;
- policy and safety enforcement;
- Expert registration metadata and interaction-specific eligibility;
- Expert selection, provider/model coordination, and bounded execution;
- Expert Contribution, collaboration, validation, assurance, and synthesis;
- unified AI response and final confidence;
- AI Action Proposal; and
- AI Interaction evidence, observability, and governed evaluation observations.

Marketplace publication, Activation, or Applicability never grants Permission, determines
interaction eligibility, selects an Expert, starts an AI Interaction, owns AI output, or
authorizes a target effect.

## 8. Restored Canonical Fact and Write Boundaries

### 8.1 Canonical fact matrix

| Canonical fact or artifact | Sole owner |
|---|---|
| Core-held AI Expert Definition and Definition Version | Core AI Coordinator Expert Registry |
| Marketplace-published AI Expert Definition and Definition Version | Marketplace through exact Marketplace Asset Version |
| Expert Registry registration and Coordinator metadata | Core AI Coordinator Expert Registry |
| Marketplace Publisher, representation, Review, Certification, Trust, Compatibility, Dependency, commercial, Distribution, and scoped lifecycle facts | Marketplace through applicable frozen Marketplace owners |
| interaction-specific eligibility, selection, Expert Contribution, collaboration lineage, assurance, unified response, final confidence, and AI Action Proposal | Core AI Coordinator |
| governed Expert evaluation observation | Core AI Coordinator; referenced source facts remain externally owned |

### 8.2 Canonical write models

The Proposal's two AI write-model boundaries remain unchanged:

| Canonical write model | Sole owner | Restored write responsibility |
|---|---|---|
| AEN-WM-01 — Expert Registry write model | Core AI Coordinator | Core-held Definition/version, registration, Coordinator metadata, Core-held lifecycle, and exact Marketplace version references; never writes Marketplace-published Definition content or scoped state |
| AEN-WM-02 — AI coordination write model | Core AI Coordinator | AI Interaction and AI-owned eligibility, selection, contribution, collaboration, assurance, response, proposal, and observation artifacts; never writes Definition content owned by Marketplace, source facts, or target effects |

Marketplace Asset Version and Marketplace scoped-state write models remain Marketplace-owned.
Decision, Recommendation, Configuration Proposal, target facts, and Audit Record retain their
frozen external write owners.

## 9. Consolidated Proposal Baseline v0.1.2

For the next Re-Review, Proposal v0.1, Patch v0.1.1, and this corrective Patch must be read with
these controlling statements:

1. AI Expert Definition and Definition Version ownership is mutually exclusive according to
   publication path.
2. Core AI Coordinator Expert Registry owns Core-held Definition content, versions, lineage, and
   lifecycle.
3. Marketplace through exact Marketplace Asset Version owns Marketplace-published Definition
   content, version, and publication lifecycle.
4. Expert Registry owns registration, eligibility, and coordination metadata and references the
   exact canonical Marketplace version without duplicating its content.
5. No mandatory Registry-owned Definition Version exists behind the Marketplace-published path.
6. Aggregate content follows publication-path ownership.
7. AEND-01 through AEND-06 remain Logical Responsibility Domains inside the frozen AI Coordination
   Domain.
8. Definition, Marketplace, eligibility, Interaction, and provider lifecycle concerns remain
   independent.
9. AEND-06 owns governed evaluation observations only.
10. Marketplace retains its full frozen architecture; AI Coordinator retains interaction-specific
    coordination and AI artifacts.
11. All other Proposal decisions, risks, Deferred Decisions, and Draft ADR candidates remain
    unchanged.
12. `DADR-AEN-03` retains its Proposal v0.1 wording and Draft status.

## 10. Conflict Resolution Validation

### 10.1 Finding validation

| Re-Review finding | Corrective result | Evidence |
|---|---|---|
| F-AEN-RR-01 — frozen canonical ownership conflict | **RESOLVED** | sections 3, 6, 8, and 9 restore mutually exclusive publication-path ownership |
| F-AEN-RR-02 — version relationship and aggregate allocation conflict | **RESOLVED** | sections 4–6 and 8 restore Marketplace version ownership and path-specific aggregate placement |

### 10.2 Required validation

| Required validation | Result |
|---|---|
| Proposal v0.1 publication-path architecture remains intact | PASS |
| Governance Glossary ownership alignment | PASS |
| Core Platform Domain Model alignment | PASS |
| Core Platform Data Ownership alignment | PASS |
| Core Platform Freeze integrity | PASS |
| Marketplace Freeze ownership and lifecycle integrity | PASS |
| Logical Responsibility Domains clarification preserved | PASS |
| Lifecycle separation preserved | PASS |
| Evaluation boundary preserved | PASS |
| Marketplace terminology clarification preserved | PASS |
| AI Coordinator boundary clarification preserved | PASS |
| Published Marketplace version immutability preserved | PASS |
| Domain or capability introduced, removed, or renamed | ZERO |
| Canonical owner introduced or moved beyond frozen architecture | ZERO |
| Deferred Decision introduced, removed, or resolved | ZERO |
| ADR or Draft ADR identifier/status introduced or changed | ZERO |
| Implementation, API, Event, database, infrastructure, runtime, deployment, or technology introduced | ZERO |
| Remaining blocking Re-Review findings | ZERO |

### 10.3 Preserved registers

- Logical Responsibility Domains: 6, unchanged;
- architectural capabilities: 18, unchanged;
- Deferred Decisions: 24 (`DD-AEN-01` through `DD-AEN-24`), unchanged;
- Draft ADR candidates: 12 (`DADR-AEN-01` through `DADR-AEN-12`), unchanged; and
- Discovery Open Questions traced: 60, unchanged.

## 11. Recommendation

# READY FOR RE-REVIEW

The corrective Patch removes only the v0.1.1 ownership, version, and aggregate conflicts. Proposal
v0.1 architecture is restored, all compatible v0.1.1 clarifications remain preserved, and no
frozen authority or register is changed.

## 12. References

### AI Expert Network baseline and quality gates

- [AI Expert Network Discovery v0.1](00-AI-EXPERT-NETWORK-DISCOVERY.md)
- [AI Expert Network Capability Map v0.1](01-AI-EXPERT-NETWORK-CAPABILITY-MAP.md)
- [AI Expert Network Proposal v0.1](02-AI-EXPERT-NETWORK-PROPOSAL.md)
- [AI Expert Network Proposal Patch v0.1.1](03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md)
- [AI Expert Network Re-Review](04-AI-EXPERT-NETWORK-RE-REVIEW.md)
- [AI Expert Network Conflict Analysis](04A-AI-EXPERT-NETWORK-CONFLICT-ANALYSIS.md)

### Governing authority

- [Governance Glossary](../00-governance/glossary/GLOSSARY.md)
- [Governance Milestone Lifecycle](../00-governance/MILESTONE-LIFECYCLE.md)
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
