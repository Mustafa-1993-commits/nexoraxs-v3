# AI Expert Network Proposal Freeze Alignment Patch v0.1.1

**Milestone:** AI Expert Network  
**Artifact type:** Freeze Alignment Patch  
**Status:** Proposed for independent Re-Review  
**Applies to:** AI Expert Network Architecture Proposal v0.1  
**Patch scope:** PP-AEN-01 through PP-AEN-07 only  
**Architecture redesign:** None

---

## 1. Purpose

This document is the minimal Freeze Alignment Patch for AI Expert Network Proposal v0.1. It
resolves only the seven findings authorized by the completed Architecture Review.

This Patch is not a new Proposal, architecture redesign, Documentation Wave, implementation
specification, or new source of scope. It does not modify the Proposal. The authoritative
Proposal baseline for Re-Review is:

```text
02-AI-EXPERT-NETWORK-PROPOSAL.md
  +
03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md
  =
AI Expert Network Proposal Baseline v0.1.1
```

## 2. Patch Authority and Precedence

### 2.1 Authority

This Patch restores the Proposal wording to the reviewed interpretation of:

- Genesis v1.1;
- Governance Foundation and Accepted ADRs;
- frozen Core Platform Architecture v1.0;
- frozen Business Brain Architecture v1.0;
- frozen Commerce OS Architecture v1.0;
- frozen Marketplace Architecture v1.0;
- approved AI Expert Network Discovery and Capability Map; and
- the authorized Architecture Review findings PP-AEN-01 through PP-AEN-07.

### 2.2 Precedence

For PP-AEN-01 through PP-AEN-07 only, this Patch supersedes conflicting or conditional wording in
Proposal v0.1. All Proposal text outside these seven clarifications remains unchanged.

### 2.3 Classification

| Control | Result |
|---|---|
| Patch classification | Freeze Alignment Patch |
| Architecture redesign | None |
| Ownership redesign | None; the Architecture Review's controlling ownership interpretation is clarified |
| Domain changes | Zero |
| Capability changes | Zero |
| New canonical facts | Zero |
| New write models or aggregates | Zero |
| New Deferred Decisions | Zero |
| New ADR Candidates | Zero |
| Implementation or technology decisions | Zero |

## 3. PP-AEN-01 — Canonical AI Expert Definition Ownership

### Finding

Proposal v0.1 uses conditional ownership wording under which publication path can be read as
changing the canonical owner of AI Expert Definition content.

### Controlling Clarification

`AI Expert Definition` is always canonically owned by the **AI Coordinator Expert Registry**.
`AI Expert Definition Version` is also always canonically owned by the **AI Coordinator Expert
Registry**.

Publication path never transfers, replaces, shares, or conditionally changes that ownership.
The Expert Registry remains the sole canonical writer of:

- AI Expert Definition identity;
- AI Expert Definition Version;
- Definition version lineage;
- Definition Lifecycle; and
- the canonical relationship between an Expert Definition and its versions.

### Proposal Wording Superseded

The following Proposal interpretations are superseded wherever they occur:

- “Core or Marketplace according to publication” as AI Expert Definition ownership;
- “definition-content owner according to publication path”;
- Marketplace Asset Version as the owner of a published AI Expert Definition;
- conditional aggregate placement for AI Expert Definition Version; and
- any statement that publication makes Marketplace the canonical definition writer.

### Controlling Ownership Statement

```text
AI Coordinator Expert Registry
  -> owns AI Expert Definition
  -> owns AI Expert Definition Version
  -> owns Definition Lifecycle and lineage

Publication
  -> creates or updates a separate Marketplace representation
  -> never transfers canonical Definition ownership
```

### Impact

- Architecture impact: **NONE**
- Domain impact: **NONE**
- Capability impact: **NONE**
- Write responsibility impact: **clarification only**

## 4. PP-AEN-02 — Marketplace Representation Boundary

### Finding

Proposal v0.1 can be read as allowing Marketplace publication to make Marketplace the canonical
owner of an AI Expert Definition or its Definition Version.

### Controlling Clarification

For the Definition-versus-representation boundary addressed by this Patch, Marketplace owns only
its Marketplace representation and Marketplace-governed state:

- `Marketplace AI Expert Asset`;
- `Marketplace AI Expert Asset Version`;
- Publisher;
- Distribution;
- commercial state; and
- Marketplace Lifecycle.

In this Patch, `Marketplace AI Expert Asset` and `Marketplace AI Expert Asset Version` are
category-qualified references to the already-approved `Marketplace Asset` and `Marketplace Asset
Version` facts for an AI Expert asset. They are not new canonical fact types, subtypes, aggregates,
Domains, or write models.

This boundary list is not an exhaustive restatement or contraction of frozen Marketplace
ownership. Marketplace continues to own every approved Marketplace fact and its separate
lifecycle concern, including Review, Certification, Trust, Compatibility, Dependency, License,
Offer, Purchase, Entitlement, Distribution, Version Selection, Installation, scoped
configuration, Activation, Applicability, and Governance Action, where applicable. None of those
facts becomes an AI Expert Definition or transfers Definition ownership.

These Marketplace facts remain separate from the canonical AI Expert Definition. Marketplace
never owns, writes, mutates, versions, supersedes, or becomes the source of truth for:

- AI Expert Definition;
- AI Expert Definition Version;
- Expert Registry identity;
- Expert eligibility for an AI Interaction;
- Expert selection or coordination;
- Expert Contribution;
- unified AI response; or
- any other AI Coordinator-owned artifact.

### Boundary Statement

```text
Canonical expertise definition
  = AI Coordinator Expert Registry responsibility

Marketplace representation and Marketplace state
  = Marketplace responsibility

Representation
  != canonical Definition
```

Marketplace Activation or Applicability remains Marketplace Lifecycle context only. It does not
grant Permission, make an Expert eligible, select an Expert, start an AI Interaction, or authorize
an operational effect.

### Impact

- Marketplace Domain or lifecycle redesign: **NONE**
- AI Coordinator ownership change: **NONE**
- Marketplace ownership expansion: **NONE**

## 5. PP-AEN-03 — Version Relationship

### Finding

Proposal v0.1 can be read as treating a Marketplace AI Expert Asset Version as the canonical
published AI Expert Definition Version.

### Controlling Clarification

`Marketplace AI Expert Asset Version` references exactly one `AI Expert Definition Version`.

```text
AI Expert Definition
  -> AI Expert Definition Version
     owner: AI Coordinator Expert Registry

Marketplace AI Expert Asset
  -> Marketplace AI Expert Asset Version
     -> references exact AI Expert Definition Version
     owner: Marketplace
```

The two versions are separate canonical concepts with separate owners and separate lifecycle
concerns:

| Version concept | Canonical owner | Meaning |
|---|---|---|
| AI Expert Definition Version | AI Coordinator Expert Registry | exact version of the specialized Expert definition used for registration and AI coordination |
| Marketplace AI Expert Asset Version | Marketplace | version of the Marketplace representation that references one exact Definition Version; it is immutable after publication under frozen Marketplace rules |

A Marketplace version is never a second canonical Expert Definition. A reference does not copy or
transfer Definition ownership. Historical version lineage remains attributable on both sides
without collapsing the two version concepts.

### Impact

- New version concept: **NONE**
- Version owner change: **NONE**
- Marketplace immutability change: **NONE**
- Definition immutability change: **NONE**

## 6. PP-AEN-04 — Canonical Fact Alignment

### Finding

The Proposal's conditional ownership language makes `AI Expert Definition Version` and
`Marketplace AI Expert Asset Version` appear to be alternative owners of the same fact.

### Controlling Canonical Fact Matrix

This matrix supersedes conditional ownership wording in Proposal sections 3, 6, 8–12, 24–26,
37–40 wherever the same concepts are described.

| Canonical fact | Sole canonical owner | Write boundary |
|---|---|---|
| AI Expert Definition | AI Coordinator Expert Registry | Expert Registry write model only |
| AI Expert Definition Version | AI Coordinator Expert Registry | Expert Registry write model only |
| Expert Registry registration | AI Coordinator Expert Registry | Expert Registry write model only |
| Marketplace AI Expert Asset | Marketplace | Marketplace write model only |
| Marketplace AI Expert Asset Version | Marketplace | Marketplace write model only; references exact Definition Version |
| Marketplace Publisher, Distribution, commercial state, and Marketplace Lifecycle | Marketplace | applicable frozen Marketplace write models only |
| interaction-specific eligibility, selection, Expert Contribution, collaboration lineage, assurance, unified response, and AI Action Proposal | AI Coordinator | AI coordination write model only |

### Aggregate Clarification

The **Expert Registry Registration aggregate, owned by AI Coordinator Expert Registry**, contains
canonical AI Expert Definition and Definition Version facts plus Registry-owned metadata. A
Marketplace aggregate contains only Marketplace-owned facts and state, including the
category-qualified Marketplace AI Expert Asset and Marketplace AI Expert Asset Version
references used by this Patch. Neither aggregate contains or writes the other's canonical facts.

### Draft ADR Candidate Wording Alignment

The existing Draft candidate `DADR-AEN-03` retains its identifier and Draft status, but its
Proposal wording is normalized by this Patch:

| Existing Draft ID | Controlling subject | Controlling scope |
|---|---|---|
| DADR-AEN-03 | AI Expert Definition Ownership and Marketplace Representation Reference | formalize sole AI Coordinator Expert Registry ownership of AI Expert Definition/Version and the separate Marketplace Asset Version reference |

This is not a new ADR or Draft candidate. It prevents the old “Publication-Path Ownership” wording
from preserving the conditional ownership ambiguity corrected by PP-AEN-01 through PP-AEN-04.

### Invariants

1. Each canonical fact has exactly one owner and one writer.
2. Publication never moves a Definition fact between aggregates.
3. Marketplace references are not Definition copies.
4. Expert Registry references to Marketplace state are not Marketplace writes.
5. Projections, registration, eligibility, and interaction history do not transfer ownership.

### Impact

- Canonical fact count changed: **ZERO**
- Canonical owner changed: **ZERO; ambiguous wording removed**
- Aggregate added or removed: **ZERO**
- Write model added or removed: **ZERO**

## 7. PP-AEN-05 — Logical Domain Clarification

### Finding

The six Proposal Domains require stronger wording so they cannot be interpreted as new bounded
contexts, deployable units, services, or independent ownership boundaries.

### Controlling Clarification

The following six Domains are **Logical Responsibility Domains inside the frozen AI Coordination
Domain**:

1. AEND-01 — Expert Definition and Version;
2. AEND-02 — Expert Eligibility Context;
3. AEND-03 — Expert Advisory Contribution;
4. AEND-04 — Expert Collaboration Participation;
5. AEND-05 — Expert Assurance and Explainability; and
6. AEND-06 — Expert Evaluation and Improvement.

They are not:

- bounded contexts;
- deployment units;
- services;
- ownership Domains;
- new AI Coordinator Components;
- independent aggregates; or
- independent runtime authorities.

The frozen Core AI Coordination Domain and AI Coordinator remain the sole accountable ownership
boundary. The six Logical Responsibility Domains organize responsibilities and documentation
only. Their IDs, names, count, and mapped capabilities remain unchanged.

### Impact

- Domain count: **6, unchanged**
- Bounded contexts introduced: **ZERO**
- Services or deployment units introduced: **ZERO**
- Ownership Domains introduced: **ZERO**

## 8. PP-AEN-06 — Lifecycle Clarification

### Finding

Proposal lifecycle wording requires an explicit statement that the different lifecycle concerns
cannot be combined into one canonical Expert Lifecycle.

### Controlling Clarification

The following are independent lifecycle concerns:

| Lifecycle concern | Controlling boundary | Explicit separation |
|---|---|---|
| Definition Lifecycle | AI Coordinator Expert Registry | governs canonical AI Expert Definition and Definition Version only |
| Marketplace-owned lifecycle concerns, collectively referenced here as Marketplace Lifecycle | Marketplace | govern Marketplace Asset and Asset Version, Publisher, Distribution, commercial, and scoped Marketplace facts while preserving every separately frozen Marketplace lifecycle |
| Eligibility Lifecycle | AI Coordinator | interaction-specific evaluation under current authorization, policy, version, and context |
| Interaction Lifecycle | AI Coordinator | governs AI Interaction and AI-owned artifacts only |
| Provider Lifecycle | external boundary whose detailed ownership and policy remain under existing deferrals | observed by AI Coordinator without becoming Definition, Marketplace, eligibility, or Interaction truth |

There is no single unified Expert Lifecycle and no aggregate or owner spanning all five concerns.
“Marketplace Lifecycle” is only a boundary label in this Patch; it does not combine the separate
Marketplace Asset, Asset Version, Review, Certification, licensing, purchase, entitlement,
distribution, installation, activation, applicability, upgrade, removal, or governance
lifecycles.

The Genesis lifecycle vocabulary remains interpreted within these independent boundaries.
`Improved` never permits mutation of a prior Definition Version or Marketplace Asset Version.
Exact provider policy and other already-deferred lifecycle detail remain deferred; this Patch adds
no state, transition, or Deferred Decision.

### Impact

- Lifecycle owner change: **ZERO**
- Lifecycle merge: **ZERO**
- New lifecycle states or transitions: **ZERO**
- Existing Deferred Decisions resolved: **ZERO**

## 9. PP-AEN-07 — Evaluation Boundary

### Finding

AEND-06 Expert Evaluation and Improvement requires a stricter non-ownership boundary.

### Controlling Clarification

AEND-06 owns only **governed evaluation observations** inside the existing AI Coordinator
ownership boundary. These observations may reference authorized facts, outcomes, feedback,
versions, Marketplace projections, or provider observations, but the references never become a
second source of truth.

AEND-06 never owns:

- Marketplace Trust or the Marketplace Trust Profile;
- Business Outcomes;
- Knowledge evolution, Knowledge changes, Knowledge Objects, or Knowledge Packs;
- provider truth or Provider Lifecycle;
- customer feedback source truth;
- Business DNA, Rules, Capabilities, Decision, Recommendation, or Configuration Proposal;
- target configuration or Operating System facts; or
- Audit Records.

Evaluation and improvement may identify evidence, quality concerns, gaps, or candidate future
changes. Only the existing canonical owner can accept, write, publish, version, or apply any
resulting change through its governed lifecycle.

### Impact

- AEND-06 owner: **unchanged — AI Coordinator**
- AEND-06 write scope: **clarified as governed observations only**
- External ownership transferred: **ZERO**
- Automatic learning or source mutation introduced: **ZERO**

## 10. Consolidated Proposal Baseline v0.1.1

For Re-Review, Proposal v0.1 must be read with these controlling statements:

1. AI Coordinator Expert Registry always owns AI Expert Definition and Definition Version.
2. Publication never transfers canonical Definition ownership.
3. Marketplace owns the category-qualified Marketplace AI Expert Asset and Marketplace AI Expert
   Asset Version representation, Publisher, Distribution, commercial state, and Marketplace
   lifecycle concerns; this Definition boundary does not contract any other frozen Marketplace
   ownership.
4. Marketplace AI Expert Asset Version references one exact AI Expert Definition Version.
5. Definition Version and Marketplace Asset Version are separate facts with one owner each.
6. AEND-01 through AEND-06 are Logical Responsibility Domains inside the frozen AI Coordination
   Domain, not ownership or deployment boundaries.
7. Definition, Marketplace, eligibility, Interaction, and provider lifecycle concerns remain
   independent.
8. AEND-06 owns governed evaluation observations only.
9. All other Proposal decisions, risks, deferrals, and Draft ADR candidates remain unchanged;
   DADR-AEN-03 retains its identifier and Draft status with the normalized wording in PP-AEN-04.

## 11. Patch Validation

| Required validation | Result |
|---|---|
| PP-AEN-01 resolved | PASS |
| PP-AEN-02 resolved | PASS |
| PP-AEN-03 resolved | PASS |
| PP-AEN-04 resolved | PASS |
| PP-AEN-05 resolved | PASS |
| PP-AEN-06 resolved | PASS |
| PP-AEN-07 resolved | PASS |
| Architecture redesign introduced | ZERO |
| Domains added, removed, or renamed | ZERO |
| Capabilities added, removed, or renamed | ZERO |
| Ownership Domains introduced | ZERO |
| New canonical facts, write models, or aggregates introduced | ZERO |
| New Deferred Decisions introduced | ZERO |
| Existing Deferred Decisions resolved | ZERO |
| New ADRs or Draft ADR candidates introduced | ZERO |
| Existing ADR status changed | ZERO |
| Existing Draft ADR identifiers or count changed | ZERO; DADR-AEN-03 wording normalized only |
| Implementation detail introduced | ZERO |
| API, Event, database, infrastructure, runtime, deployment, or technology decision introduced | ZERO |
| Remaining authorized Architecture Review findings | ZERO |

### 11.1 Preserved registers

- approved Logical Responsibility Domains: 6, unchanged;
- approved architectural capabilities: 18, unchanged;
- Deferred Decisions: 24 (`DD-AEN-01` through `DD-AEN-24`), unchanged;
- Draft ADR candidates: 12 (`DADR-AEN-01` through `DADR-AEN-12`), unchanged; and
- traced Discovery Open Questions: 60, unchanged.

## 12. Recommendation

# READY FOR RE-REVIEW

All seven authorized Freeze Alignment findings are resolved by clarification only. Proposal v0.1
remains unchanged on disk and must be evaluated together with this Patch as Proposal Baseline
v0.1.1.

## 13. References

### AI Expert Network baseline

- [AI Expert Network Discovery v0.1](00-AI-EXPERT-NETWORK-DISCOVERY.md)
- [AI Expert Network Capability Map v0.1](01-AI-EXPERT-NETWORK-CAPABILITY-MAP.md)
- [AI Expert Network Proposal v0.1](02-AI-EXPERT-NETWORK-PROPOSAL.md)

### Governing authority

- [Governance ADR Repository](../00-governance/ADR/README.md)
- [Canonical Glossary](../00-governance/glossary/GLOSSARY.md)
- [Genesis AI Strategy](../01-genesis/08-AI-STRATEGY.md)
- [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Core Platform Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)
- [Core Platform Data Ownership](../02-core-platform/04-DATA-OWNERSHIP.md)
- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Commerce OS Freeze v1.0](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md)
- [Marketplace Architecture v1.0 Freeze](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md)

### Accepted AI and Marketplace ADRs

- [ADR-027 — Marketplace Bounded Context Within Core](../00-governance/ADR/ADR-027-marketplace-bounded-context-within-core.md)
- [ADR-028 — Immutable Marketplace Assets and Scoped State](../00-governance/ADR/ADR-028-immutable-marketplace-assets-scoped-state.md)
- [ADR-029 — AI Downstream of Knowledge, Rules, and Authorization](../00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md)
- [ADR-030 — AI Coordinator Separated Orchestration](../00-governance/ADR/ADR-030-ai-coordinator-separated-orchestration.md)
- [ADR-031 — Coordinated AI Expert Network](../00-governance/ADR/ADR-031-coordinated-ai-expert-network.md)
- [ADR-032 — Governed AI and Platform Learning](../00-governance/ADR/ADR-032-governed-ai-and-platform-learning.md)
