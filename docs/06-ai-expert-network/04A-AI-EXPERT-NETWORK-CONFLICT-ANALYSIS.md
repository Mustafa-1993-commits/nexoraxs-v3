# AI Expert Network Proposal Baseline v0.1.1 Conflict Analysis

**Milestone:** AI Expert Network  
**Artifact type:** Governance-level architectural conflict analysis  
**Status:** Completed  
**Findings analyzed:** F-AEN-RR-01 and F-AEN-RR-02  
**Architecture changes made:** None  
**Documents modified:** None

---

## 1. Purpose

This document determines the source and authority of the two blocking conflicts identified by the
independent Re-Review of AI Expert Network Proposal Baseline v0.1.1.

It does not choose a new architecture, reinterpret an owner, create an ADR, amend a Freeze, or
produce another Proposal Patch. It compares the governing statements as they exist and assigns
exactly one required classification to each finding.

The baseline under analysis is:

```text
AI Expert Network Proposal v0.1
  +
AI Expert Network Proposal Patch v0.1.1
  =
AI Expert Network Proposal Baseline v0.1.1
```

## 2. Analysis Method and Authority

### 2.1 Questions applied to each finding

For F-AEN-RR-01 and F-AEN-RR-02, this analysis determines:

1. the actual conflicting statements;
2. the authority of each statement;
3. the first document that introduced the conflict;
4. whether the AI Expert Network baseline changed frozen architecture;
5. whether frozen Core Platform already allowed the original Proposal;
6. whether an Accepted ADR already resolves the issue;
7. whether a Draft ADR is sufficient; and
8. the single required classification.

### 2.2 Authority order used

| Authority level | Artifacts | Relevance |
|---|---|---|
| Ultimate architecture authority | Genesis v1.1 | Establishes coordinated, specialized, versioned AI Experts and Marketplace distribution, but does not assign the detailed canonical Definition owner or aggregate relationship. |
| Governance authority | Accepted ADRs, canonical Glossary, Milestone Lifecycle | Records accepted architectural decisions, canonical terminology, ADR requirements, and Patch limits. |
| Frozen Core authority | Core Platform Domain Model, Data Ownership, and Core Platform Freeze v1.0/v1.0.1 | Explicitly assigns AI Expert Definition and version ownership by publication path and freezes those source documents. |
| Frozen Marketplace authority | Marketplace Freeze v1.0 | Owns Marketplace Asset/version and scoped Marketplace facts while leaving AI selection, coordination, and artifacts to AI Coordinator. |
| Milestone proposal authority | AI Expert Network Proposal v0.1 | May propose milestone architecture only within the frozen upstream boundaries. |
| Proposal Patch authority | AI Expert Network Proposal Patch v0.1.1 | Supersedes Proposal v0.1 wording only for PP-AEN-01 through PP-AEN-07; it does not supersede Governance or an upstream Freeze. |

### 2.3 Governing change-control rule

The Governance Milestone Lifecycle requires an ADR when a decision materially affects canonical
terminology, aggregate or data ownership, lifecycle meaning, AI authority, cross-milestone
compatibility, or an Architecture Guarantee. A documentation or Freeze Alignment Patch may
clarify an already accepted decision but may not change canonical ownership, lifecycle semantics,
an ADR, or a frozen guarantee.

The Core Platform Freeze independently requires all three controls for a material architectural
change:

1. an Accepted ADR;
2. an independent Architecture Review; and
3. an updated Freeze.

## 3. F-AEN-RR-01 — Frozen Canonical Ownership Conflict

### 3.1 Actual conflicting statements

#### Governance Glossary

The Governance Glossary states:

- `AI Expert` owner: **Core or Marketplace according to publication**; and
- `Expert Registry` owner: **Core AI Coordinator/Marketplace for published experts**.

The Glossary wording is not the only evidence. It is repeated with the exact
`AI Expert Definition` concept in frozen Core documents.

#### Core Platform Domain Model

The frozen Domain Model states:

- an AI Expert Definition is a versioned platform **or Marketplace asset**; and
- canonical owner of `AI Expert Definition` is **Core or Marketplace according to publication**.

#### Core Platform Data Ownership

The frozen Data Ownership model states:

- source of truth for `AI Expert Definition` is **Core or Marketplace according to publication**;
- the write/source boundary is **Versioned Expert Registry or Marketplace Asset Version**; and
- version owner is **Expert Registry or Marketplace**.

#### AI Expert Network Proposal v0.1

The original Proposal follows the frozen model:

- a Core-held Definition is Core AI Coordinator-owned;
- a Marketplace-published Definition is Marketplace-owned through the exact Marketplace Asset
  Version;
- Expert Registry owns registration and Coordinator metadata for the Marketplace path; and
- publication-path ownership is exclusive per Definition instance, not simultaneous ownership.

#### AI Expert Network Proposal Patch v0.1.1

The Patch replaces that model with:

- every AI Expert Definition and Definition Version is always owned by AI Coordinator Expert
  Registry;
- Marketplace never owns or writes AI Expert Definition or Definition Version; and
- publication creates only a separate Marketplace representation.

These statements cannot all be true under one canonical owner model.

### 3.2 Source authority

| Statement | Authority status |
|---|---|
| Governance Glossary publication-path owner | Existing canonical Governance wording |
| Core Domain Model publication-path owner | Frozen Core Platform Wave 1 architecture |
| Core Data Ownership publication-path owner and source/write boundary | Frozen Core Platform Wave 2 architecture |
| Core Freeze inclusion of Domain Model and Data Ownership | Frozen architectural baseline |
| Original Proposal publication-path owner | Subordinate proposal statement aligned with the frozen baseline |
| Patch Registry-only owner | Later Proposal-baseline overlay, subordinate to Governance and upstream Freezes |

Patch precedence applies only to conflicting or conditional wording in Proposal v0.1. It does not
grant authority to override the Governance Glossary, Core Domain Model, Core Data Ownership, or
Core Platform Freeze.

### 3.3 Document that introduced the conflict

The conflict was introduced by
`03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md`.

The original Proposal did not introduce this conflict. Its publication-path discriminator matched
the Governance Glossary and frozen Core ownership model.

### 3.4 Did AI Expert Network change frozen architecture?

**Yes — the Proposal Patch did.**

The Patch changes the canonical owner, canonical writer, source of truth, and Definition Lifecycle
authority for Marketplace-published AI Expert Definitions. Calling the change a clarification or
stating Architecture impact `NONE` does not make it documentation-only when the controlling owner
differs from the frozen owner.

This conclusion applies to Proposal Baseline v0.1.1. It does not characterize Proposal v0.1 as the
source of the conflict.

### 3.5 Does frozen Core Platform already allow the Proposal?

**Yes, frozen Core allows Proposal v0.1.**

Core explicitly allows one of two exclusive canonical owners according to publication path.
Proposal v0.1 used that exact pattern. Frozen Core does not allow the Patch's mandatory
Registry-only owner without an approved architecture change.

### 3.6 Does an Accepted ADR resolve the issue?

**No.**

- ADR-027 assigns Marketplace ownership of its asset, publisher, version, purchase, installation,
  activation, applicability, review, and lifecycle models.
- ADR-028 makes Published Marketplace Asset Versions shared, versioned, and immutable and keeps
  scoped customer state separate.
- ADR-030 places Expert Registry and routing within the decomposed AI Coordinator but does not
  declare Expert Registry the sole owner of every published Definition.
- ADR-031 requires specialized, versioned Expert definitions and AI Coordinator selection but
  does not assign Definition content ownership.

No Accepted ADR supersedes the publication-path ownership recorded by Governance and frozen Core.

### 3.7 Is a Draft ADR sufficient?

**No.**

`DADR-AEN-03` remains a Draft subject inside the Proposal baseline. Normalizing its wording does
not make it Accepted, does not supersede an upstream Freeze, and does not authorize immediate use
of its decision as settled architecture.

### 3.8 Classification

# 1. Proposal must change.

This classification applies to the merged Proposal Baseline v0.1.1 because the conflicting
Registry-only statement was introduced by its Patch. It does not require modification of the
original frozen Core model to restore current-baseline consistency.

## 4. F-AEN-RR-02 — Version Relationship and Aggregate Allocation Conflict

### 4.1 Actual conflicting statements

#### Core Platform Domain Model and Data Ownership

Frozen Core permits a Marketplace-published AI Expert Definition to be a Marketplace asset whose
source and version owner is Marketplace Asset Version. It does not require a second,
Registry-owned canonical Definition Version behind every Marketplace Asset Version.

#### AI Expert Network Proposal v0.1

The original Proposal follows that allocation:

- `AEN-CF-01` is owned by Core AI Coordinator for Core-held content or Marketplace Asset Version
  for Marketplace-published content;
- Core-held Definition content is placed in Expert Registry Registration;
- Marketplace-published Definition content is placed in the external Marketplace Asset
  aggregate;
- the Expert Registry write model writes Core-held Definitions and exact Marketplace references,
  never Marketplace-published content; and
- the Registry registration for a Marketplace-published Expert contains the exact external
  version reference and Coordinator metadata only.

#### AI Expert Network Proposal Patch v0.1.1

The Patch instead requires:

- a canonical Registry-owned AI Expert Definition Version;
- a separate Marketplace AI Expert Asset Version;
- exactly one reference from the Marketplace version to the Registry Definition Version; and
- all canonical Definition and Definition Version facts inside the Expert Registry Registration
  aggregate.

The Patch therefore changes more than terminology. It changes the canonical version relationship,
source/write boundary, aggregate content, and Definition Lifecycle authority.

### 4.2 Source authority

| Statement | Authority status |
|---|---|
| Marketplace Asset Version may source and own a Marketplace-published Definition/version | Frozen Core Domain and Data Ownership model |
| Original Proposal uses external Marketplace Asset aggregate for published Definition content | Proposal decision aligned with frozen Core |
| Patch requires separate Registry Definition Version and exact one-to-one Marketplace reference | Subordinate Patch statement not authorized by an upstream Accepted ADR or updated Freeze |

Marketplace Freeze confirms that Marketplace owns Marketplace Asset/version and scoped state and
that AI Coordinator owns eligibility, selection, coordination, and AI artifacts. It does not state
that every Marketplace AI Expert Asset Version must reference a separate Registry-owned canonical
Definition Version, and it does not explicitly supersede the Core publication-path owner.

### 4.3 Document that introduced the conflict

The conflict was introduced by
`03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md`.

Proposal v0.1 kept the version, write-model, and aggregate allocation already permitted by frozen
Core. The Patch replaced it while claiming no new canonical fact, write model, aggregate, owner,
or architectural impact.

### 4.4 Did AI Expert Network change frozen architecture?

**Yes — the Proposal Patch did.**

Requiring two separate canonical version concepts for the Marketplace publication path and moving
all Definition content into Expert Registry Registration materially constrains ontology,
aggregate ownership, version lineage, and write authority. Those are architectural decisions
under the Milestone Lifecycle, not editorial clarification.

### 4.5 Does frozen Core Platform already allow the Proposal?

**Yes, frozen Core allows Proposal v0.1.**

The original Proposal's Marketplace-published path uses Marketplace Asset Version as the
Definition content/version source and keeps only Registry reference and metadata in Core. That is
the model explicitly allowed by frozen Core.

Frozen Core does not already authorize the Patch's mandatory separate Registry Definition Version
for Marketplace-published Experts. Such a relationship could become authoritative only through
approved architectural change control.

### 4.6 Does an Accepted ADR resolve the issue?

**No.**

ADR-028 permits exact-version dependency references generally, but it does not mandate this
specific AI Expert Definition-Version relationship or move Definition content into the Expert
Registry aggregate. ADR-030 and ADR-031 establish Coordinator decomposition and coordinated,
versioned Experts without deciding this aggregate allocation.

### 4.7 Is a Draft ADR sufficient?

**No.**

The Proposal expressly states that Draft ADR candidates are not authoritative. `DADR-AEN-03`
cannot supersede frozen ownership or aggregate allocation until the applicable Governance process
produces an Accepted ADR and updated affected Freeze. Merely retaining the Draft identifier and
changing its wording is insufficient.

### 4.8 Classification

# 1. Proposal must change.

This classification applies to Proposal Baseline v0.1.1 because its Patch introduced the
two-version and aggregate-allocation conflict. It does not classify the original Proposal as
inconsistent with frozen Core.

## 5. Cross-Document Determination

| Question | F-AEN-RR-01 | F-AEN-RR-02 |
|---|---|---|
| Actual conflict exists | Yes | Yes |
| Original Proposal aligned with frozen Core | Yes | Yes |
| Proposal Patch introduced the conflicting statement | Yes | Yes |
| Frozen Core already permits original Proposal | Yes | Yes |
| Marketplace Freeze supersedes the Core owner/allocation | No | No |
| Governance wording alone is the only conflict source | No; Core repeats it explicitly | No; Core source/write and version models are explicit |
| Accepted ADR resolves the conflict | No | No |
| Draft ADR is sufficient | No | No |
| Re-Review finding is a false positive | No | No |
| Required classification | **1. Proposal must change.** | **1. Proposal must change.** |

## 6. Root Cause Classification

### 6.1 Primary root cause

The primary root cause is the Proposal Patch's attempt to treat an architectural ownership and
aggregate change as a zero-impact Freeze Alignment clarification.

The frozen sources are mutually consistent on the disputed model:

- Governance permits Core or Marketplace ownership according to publication;
- Core Domain Model repeats that owner for AI Expert Definition;
- Core Data Ownership permits Expert Registry or Marketplace Asset Version as the source/version
  boundary;
- Proposal v0.1 follows that model; and
- Marketplace Freeze preserves Marketplace Asset/version ownership without explicitly
  superseding the Core publication-path Definition owner.

Governance wording could be made more granular in a future approved change, but clarification
alone cannot make the current Patch authoritative because the Core frozen owner, write source,
and version owner are already explicit. Therefore **Governance clarification required** is not the
classification of either present finding.

### 6.2 Rejected classifications

| Candidate classification | Determination |
|---|---|
| 2. Core Platform must change. | Not required to restore consistency with the currently authoritative model; Core already permits Proposal v0.1. Core would need architectural change only if Registry-only ownership were separately selected and approved. |
| 3. Governance clarification required. | Insufficient because the conflict is repeated in frozen Core ownership and version models, not only ambiguous Glossary wording. |
| 4. False positive in Re-Review. | Rejected because the Patch and frozen sources assign different canonical owners, writers, version relationships, and aggregate content. |

## 7. Recommended Authority

Until explicitly superseded through approved change control, the controlling authority is:

1. the Governance canonical publication-path ownership and Patch policy;
2. the Core Platform Domain Model and Data Ownership model included in Core Platform v1.0;
3. the Core Platform Freeze change-control rules; and
4. the Marketplace Freeze for Marketplace Asset/version, scoped state, and AI Coordinator
   interaction boundaries.

The original Proposal v0.1 is consistent with that authority for the two analyzed findings. The
merged Proposal Baseline v0.1.1 is not, because its Patch supplies the conflicting controlling
statements.

## 8. Recommended Next Action

No document is changed by this analysis. Before another Re-Review, the AI Expert Network Proposal
baseline must be aligned to the currently frozen publication-path owner and version/aggregate
model, unless a separately authorized architecture-change process first supersedes those upstream
authorities.

This recommendation does not select a new architecture and does not authorize a Patch in this
task. It identifies which artifact class must next be corrected under the approved milestone
workflow.

# PROPOSAL PATCH REQUIRED

## 9. Validation

| Validation | Result |
|---|---|
| F-AEN-RR-01 analyzed | PASS |
| F-AEN-RR-02 analyzed | PASS |
| Exactly one classification assigned to F-AEN-RR-01 | PASS — 1. Proposal must change. |
| Exactly one classification assigned to F-AEN-RR-02 | PASS — 1. Proposal must change. |
| Architecture modified | ZERO |
| Proposal or Proposal Patch modified | ZERO |
| Governance or frozen baseline modified | ZERO |
| ADR created or modified | ZERO |
| Implementation, API, Event, database, infrastructure, runtime, deployment, or technology introduced | ZERO |

## References

### Findings and AI Expert Network baseline

- [AI Expert Network Re-Review](04-AI-EXPERT-NETWORK-RE-REVIEW.md)
- [AI Expert Network Proposal v0.1](02-AI-EXPERT-NETWORK-PROPOSAL.md)
- [AI Expert Network Proposal Patch v0.1.1](03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md)

### Governance

- [Governance Glossary](../00-governance/glossary/GLOSSARY.md)
- [Governance Milestone Lifecycle](../00-governance/MILESTONE-LIFECYCLE.md)
- [ADR-027 — Marketplace Bounded Context](../00-governance/ADR/ADR-027-marketplace-bounded-context-within-core.md)
- [ADR-028 — Immutable Marketplace Assets and Scoped State](../00-governance/ADR/ADR-028-immutable-marketplace-assets-scoped-state.md)
- [ADR-029 — AI Downstream of Knowledge, Rules, and Authorization](../00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md)
- [ADR-030 — AI Coordinator Separated Orchestration](../00-governance/ADR/ADR-030-ai-coordinator-separated-orchestration.md)
- [ADR-031 — Coordinated AI Expert Network](../00-governance/ADR/ADR-031-coordinated-ai-expert-network.md)
- [ADR-032 — Governed AI and Platform Learning](../00-governance/ADR/ADR-032-governed-ai-and-platform-learning.md)

### Frozen baselines

- [Core Platform Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)
- [Core Platform Data Ownership](../02-core-platform/04-DATA-OWNERSHIP.md)
- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Marketplace Freeze v1.0](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md)
