# Marketplace Proposal Patch v0.1.1

**Status:** Freeze Alignment Patch — Pending Independent Re-Review  
**Applies to:** Marketplace Architecture Proposal v0.1  
**Patch authority:** Marketplace Proposal v0.1 Independent Architecture Review  
**Architecture impact:** None  
**Ownership impact:** None  
**Domain impact:** None  
**Capability impact:** None  
**Implementation authority:** None

## 1. Purpose

This document is the official Freeze Alignment Patch for Marketplace Proposal v0.1. It applies
only PP-01 through PP-10 from the approved Independent Architecture Review.

The authoritative Proposal baseline for re-review is:

```text
Marketplace Architecture Proposal v0.1
  + Marketplace Proposal Patch v0.1.1
  = Marketplace Proposal Baseline v0.1.1
```

This Patch does not rewrite the Proposal. Where a statement in this Patch addresses an identified
Proposal statement, the corrected statement in this Patch governs the merged v0.1.1 baseline.
Every unaffected Proposal statement remains unchanged.

## 2. Patch Authority and Classification

### 2.1 Reason

The Independent Architecture Review accepted the Marketplace architecture with a required Patch.
It identified six blocking alignment defects and four non-blocking architecture-quality gaps. All
ten findings are bounded documentation and baseline-alignment corrections.

### 2.2 Authority

- Genesis v1.1;
- Accepted Governance ADRs;
- Core Platform Architecture v1.0 and Documentation Baseline v1.0.1;
- Business Brain Architecture and Documentation Baseline v1.0;
- Commerce OS Architecture and Documentation Baseline v1.0;
- approved Marketplace Discovery and Capability Map;
- Marketplace Proposal v0.1; and
- Marketplace Proposal v0.1 Independent Architecture Review.

### 2.3 Classification

**Freeze Alignment Patch**

### 2.4 Explicit constraints

This Patch:

- introduces no architecture redesign;
- introduces no Domain redesign;
- introduces no Capability redesign;
- introduces no lifecycle redesign;
- introduces no aggregate redesign;
- introduces no new canonical fact or write model;
- transfers no ownership;
- resolves no genuinely Deferred Decision;
- creates no ADR;
- introduces no API, Event, Contract, database, infrastructure, deployment, framework, vendor, or
  implementation decision; and
- modifies no frozen baseline or existing document.

## 3. Patch Application Rules

1. PP-01 through PP-10 are the complete Patch scope.
2. A corrected statement replaces only the conflicting or ambiguous meaning cited for that item.
3. Existing MPD-01 through MPD-12 identities and accountable responsibilities remain unchanged.
4. Existing MC-01 through MC-24 identities and accountable Domains remain unchanged.
5. Existing MWM-01 through MWM-18 write models remain unchanged.
6. Existing aggregate candidates remain unchanged.
7. Existing shared and scoped lifecycle identities and owners remain unchanged.
8. DD-MP-01 through DD-MP-50 remain present and unresolved. PP-02 narrows DD-MP-14 only to remove
   an attempted re-deferral of an already-frozen Genesis requirement.
9. Draft ADR labels remain non-authoritative and reserve no Governance number.
10. No correction in this Patch may be generalized into authority outside the cited baseline.

## 4. PP-01 — Published-Version Distribution Gate

### Finding Reference

- Architecture Review `B-01` — Distribution permits a non-Published Asset Version.
- Architecture Review Patch Item `PP-01`.

### Problem Summary

Proposal sections 2, 6, and 26 describe Distribution Availability for an “approved immutable”
Asset Version and permit an `Approved or Published` version. The same Proposal correctly states
elsewhere that a Marketplace Asset Version becomes immutable on publication.

### Baseline Reference

- Genesis Marketplace Architecture: published Marketplace Asset Versions are shared and
  immutable.
- `ADR-009`: published platform Asset versions are immutable.
- `ADR-028`: Published Marketplace Asset Versions are shared, versioned, and immutable.
- Core Platform Freeze sections 3.4 and 5.5.

### Original Proposal Statement

> governed Distribution Availability for approved immutable Asset Versions.

> Distribution Availability for approved immutable versions.

> MPD-08 owns Distribution Availability for an approved immutable Asset Version.

> requires an Approved or Published version under the shared lifecycle.

### Corrected Proposal Statement

For the merged v0.1.1 baseline, the cited statements mean:

> MPD-08 owns Distribution Availability only for a **Published immutable Marketplace Asset
> Version**. Distribution Availability, Marketplace Purchase, Marketplace Entitlement, Version
> Selection, and Marketplace Installation cannot make an `Approved` but unpublished version
> available to a customer Workspace. Any future preview, staged, private, or limited publication
> semantics remain governed by DD-MP-03 and DD-MP-35 and require later approval; they do not make
> `Approved` equivalent to `Published`.

The canonical fact table statement “Availability of a published immutable version” remains
unchanged and controlling.

### Architectural Rationale

This correction restores one publication boundary across MPD-03 and MPD-08. It does not add a
state or change a lifecycle. `Published` remains the existing gate after which the shared version
is immutable and eligible for governed Distribution Availability.

### Impact

- **Domains:** no change;
- **Capabilities:** no change;
- **Canonical facts/writes/aggregates:** no change;
- **Lifecycle:** no change;
- **Deferred Decisions:** preview and restricted-publication policy remains deferred; and
- **Blocking finding:** resolved.

## 5. PP-02 — Mandatory Genesis Review Dimensions

### Finding Reference

- Architecture Review `B-02` — Mandatory Review dimensions are weakened.
- Architecture Review Patch Item `PP-02`.

### Problem Summary

Proposal section 19 says required Review dimensions may vary by Asset category. DD-MP-14 also
appears to defer which dimensions are required. Genesis already requires every Asset to pass all
six named Review dimensions.

### Baseline Reference

- Genesis Marketplace Architecture, Quality section.
- Core Platform Freeze `D-32`, which defers detailed criteria rather than the existence of the six
  dimensions.

### Original Proposal Statement

> Required dimensions may vary by category under approved policy.

DD-MP-14 originally defers:

> Required Review dimensions, evidence, outcomes, re-review, expiry, and category variations.

### Corrected Proposal Statement

For the merged v0.1.1 baseline:

> Every Marketplace Asset must pass Technical Review, Security Review, Business Review, UX Review,
> Performance Review, and Compatibility Review. All six dimensions are mandatory. Category policy
> may specialize the criteria, evidence, evaluator qualifications, applicability treatment,
> outcome detail, re-review trigger, or expiry behavior for a dimension, but it may not omit a
> frozen Review dimension.

DD-MP-14 remains unresolved under the following aligned wording:

> **DD-MP-14:** Exact evidence, criteria, outcome detail, re-review, expiry, evaluator policy, and
> category-specific treatment for each of the six mandatory Genesis Review dimensions.

### Architectural Rationale

The correction does not design Review criteria or resolve certification policy. It restores an
existing universal Genesis quality gate and preserves all detailed policy as deferred.

### Impact

- **Review owner:** remains MPD-04;
- **publication owner:** remains MPD-03;
- **Review model:** unchanged;
- **DD-MP-14:** identifier and genuinely unresolved detail preserved;
- **new Review dimensions:** none; and
- **Blocking finding:** resolved.

## 6. PP-03 — Marketplace Entitlement Does Not Own Distribution

### Finding Reference

- Architecture Review `B-03` — Marketplace Entitlement crosses into Distribution ownership.
- Architecture Review Patch Item `PP-03`.

### Problem Summary

Proposal section 25.2 says Marketplace Entitlement proves a Workspace right to `distribute` an
Asset. MPD-08, not MPD-07, owns Distribution Availability.

### Baseline Reference

- `ADR-027`: Marketplace owns separate purchase, installation, activation, applicability, and
  lifecycle models.
- Core Platform Freeze section 5.5: acquisition, installation, configuration, activation,
  entitlement, and Business Assignment remain distinct.
- Proposal sections 6, 8, 10, 11, and 26: MPD-08 owns Distribution Availability.

### Original Proposal Statement

> Entitlement proves the Workspace's current Marketplace right to distribute, install, select,
> update, or use an Asset under License and Offer conditions.

### Corrected Proposal Statement

> Marketplace Entitlement proves the Workspace's current Marketplace right to obtain, select,
> install, update, or use an Asset under applicable License and Offer conditions and subject to
> current owner validation. It grants no right to publish, make available, or distribute a
> Marketplace Asset Version. MPD-08 alone owns Distribution Availability.

### Architectural Rationale

This correction enforces the already-proposed MPD-07/MPD-08 separation. Entitlement remains a
Workspace-scoped right; Distribution Availability remains a Marketplace distribution fact. The
correction adds no commercial term or License rule.

### Impact

- **MPD-07:** retains Purchase and Marketplace Entitlement;
- **MPD-08:** retains Distribution Availability;
- **License and Offer policy:** remains deferred;
- **customer redistribution model:** none is introduced; and
- **Blocking finding:** resolved.

## 7. PP-04 — Marketplace Entitlement Versus Core Workspace Entitlement

### Finding Reference

- Architecture Review `B-04` — Marketplace Applicability references the wrong Entitlement
  concept.
- Architecture Review Patch Item `PP-04`.

### Problem Summary

Proposal section 25.3 correctly separates Marketplace Entitlement from Core Workspace Entitlement
and then states that Business Applicability references “a Workspace Entitlement.” `Workspace
Entitlement` is already a canonical Core-owned concept.

### Baseline Reference

- `ADR-021`: every Workspace has one mandatory Core Workspace Entitlement.
- Governance Glossary: Workspace Entitlement and Marketplace scoped concepts are distinct.
- Core Platform Domain Model and Core Platform Freeze.
- Commerce OS Freeze: Marketplace Entitlement remains Marketplace-owned.

### Original Proposal Statement

> Business Applicability references a Workspace Entitlement; a Business does not own the
> Entitlement.

### Corrected Proposal Statement

> Marketplace Applicability for a selected Business references the **Marketplace Entitlement that
> belongs to the containing Workspace**. The Business does not own that Marketplace Entitlement.
> Core Workspace Entitlement remains a separate Core-owned platform-access fact and, when
> applicable, is evaluated independently; it is not replaced, renamed, or written by Marketplace.

### Architectural Rationale

The correction uses the two already-approved concepts consistently. It changes neither their
owners nor their scopes.

### Impact

- **Core Workspace Entitlement:** unchanged and Core-owned;
- **Marketplace Entitlement:** unchanged and MPD-07-owned;
- **Marketplace Applicability:** unchanged and MPD-09-owned;
- **Business ownership:** none introduced; and
- **Blocking finding:** resolved.

## 8. PP-05 — Required-Permission and Data-Access Declaration Ownership

### Finding Reference

- Architecture Review `B-05` — required-Permission and data-access declarations have hidden
  ownership.
- Architecture Review Patch Item `PP-05`.

### Problem Summary

The Proposal requires each applicable Asset Version to declare required Permissions and data
access, but the declaration writer is implicit between MPD-03 Asset Version content and MPD-11
policy governance. Installation wording can also be read as checking a declaration without
checking current grants and target authorization.

### Baseline Reference

- Genesis Marketplace Architecture, Security section: Assets must declare required Permissions.
- Core Platform Permission Model section 5.12.
- Core Platform Security Model section 5.14.
- `ADR-034`: explicit scope for every protected operation.
- Core Platform Freeze security and Marketplace guarantees.

### Original Proposal Statement

> MPD-11 owns Marketplace resource policy, required-Permission governance, Governance Action.

> Asset Versions must declare Permissions and data needs.

> Before a successful Installation, MPD-09 validates required Permission declarations without
> assigning Permissions.

The canonical fact, write-model, and aggregate tables do not name a separate declaration root.

### Corrected Proposal Statement

For the merged v0.1.1 baseline:

> Required-Permission and data-access declarations are version-scoped content of the existing
> **Marketplace Asset Version** write model `MWM-03`, owned by `MPD-03`. They are not new aggregate
> roots, new write models, or Permission grants. `MPD-11` governs Marketplace policy for required
> declarations and validates policy compliance without becoming a second writer. `MPD-04` records
> Review evidence concerning the declarations without owning them.

> MPD-09 verifies the applicable version-scoped declarations during Installation and Activation.
> The current Core or target-owned Permission grants, actor authorization, resource scope, and
> target-owner authorization are evaluated independently. A declaration, Review outcome,
> Installation, or Activation never creates or broadens a Permission grant or data-access right.

### Architectural Rationale

The original Proposal already assigns all Asset Version content to MPD-03 and all canonical Core
Permission grants to Core Identity and Access. This correction makes that existing split explicit.
It adds no canonical fact, write model, aggregate, Domain, or Permission policy.

### Impact

- **MWM-03:** unchanged; the declaration is explicitly recognized as version content;
- **MPD-11:** remains policy/governance owner, not content writer;
- **MPD-04:** remains Review evidence owner;
- **MPD-09:** remains scoped lifecycle owner and validation coordinator;
- **Core/OS Permissions:** ownership unchanged; and
- **Blocking finding:** resolved.

## 9. PP-06 — Operating System as a Marketplace Asset

### Finding Reference

- Architecture Review `B-06` — Operating System Asset and OS lifecycle ownership are not
  separated.
- Architecture Review Patch Item `PP-06`.

### Problem Summary

Operating Systems are a frozen Marketplace category. The Proposal says an OS Asset references Core
OS Product and Plan facts, but it does not explicitly distinguish the Marketplace representation
and Marketplace-scoped state from the canonical Core and OS product, release, commercial,
installation, setup, configuration, activation, readiness, and operational lifecycles.

### Baseline Reference

- Genesis Marketplace Architecture: Operating Systems are Marketplace Assets.
- `ADR-019` and `ADR-020`: Product Hub owns composition and handoff, not source records.
- `ADR-021` through `ADR-023`: Workspace Entitlement, OS Subscription, Plan, and operational scope.
- `ADR-024` and `ADR-026`: each OS owns its domain and release/operational lifecycle.
- Core Platform Domain Model and Freeze sections 5.4 and 5.5.
- Marketplace Discovery risk `R-06`.

### Original Proposal Statement

> Operating System Assets reference Core OS Product and Plan facts; they do not duplicate them.

The Proposal otherwise applies the general Marketplace Asset Version and scoped adoption models
without an explicit OS-category separation statement.

### Corrected Proposal Statement

> For the Operating System category, Marketplace owns the Marketplace Asset listing, Marketplace
> Asset Version representation and distribution metadata, and any Marketplace-scoped Purchase,
> Marketplace Entitlement, Version Selection, Installation, Activation, or Applicability fact that
> is valid for that Marketplace representation. These facts do not replace or prove canonical OS
> operation.

> Core owners retain OS Product, Plan, Workspace Entitlement, OS Subscription, billing, and the
> platform-side installation or activation operation. The applicable Operating System retains its
> release artifacts and release lifecycle, OS-specific setup, domain configuration, operational
> Activation contribution, Operating System Ready contribution, navigation, workflows, and
> operational facts. Product Hub retains composition, selection capture, and handoff.

> A Marketplace Asset Version for an Operating System references the canonical OS Product and the
> applicable OS-owned release/version identifier. Marketplace does not duplicate the OS release
> artifact or make a Marketplace version transition into an OS release transition.

> Marketplace Installation and Activation, where applicable to the Marketplace representation,
> remain distinct from the Core installation operation and the OS lifecycle states `Installed` and
> `Activated`. Neither state can be inferred from the other. The relevant owners coordinate through
> owner-preserving references and handoffs without creating parallel truth.

### Architectural Rationale

This is the explicit separation already required by the frozen Core, Product Hub, Marketplace, and
independent-OS architecture. It creates no new lifecycle, state, owner, or handoff mechanism.

### Impact

- **Operating Systems category:** retained;
- **Marketplace owners:** unchanged;
- **Core commercial and installation owners:** unchanged;
- **OS release, setup, configuration, readiness, and operational owners:** unchanged;
- **Product Hub owner:** unchanged;
- **implementation mechanism:** not defined; and
- **Blocking finding:** resolved.

## 10. PP-07 — Draft ADR Candidate Normalization

### Finding Reference

- Architecture Review `NB-01` — Draft ADR candidates re-propose Accepted decisions.
- Architecture Review Patch Item `PP-07`.

### Problem Summary

The Proposal lists twenty Draft ADR candidates without separating net-new Marketplace-internal
decisions from rules already governed by Accepted ADRs. That presentation could reopen or duplicate
frozen decisions.

### Baseline Reference

- Governance ADR Repository and lifecycle.
- `ADR-009`, `ADR-010`, `ADR-013`, `ADR-014`, `ADR-020`, `ADR-027` through `ADR-031`, and `ADR-034`.
- Core Platform Freeze change-control and Marketplace guarantees.

### Original Proposal Statement

> The following are Draft ADR candidates only. They create no Accepted ADR and reserve no
> Governance number.

The original table places DADR-MP-01 through DADR-MP-20 in one candidate set.

### Corrected Proposal Statement

The original `DADR-MP-*` trace labels are preserved, but their governance classification for the
merged v0.1.1 baseline is normalized as follows.

#### Accepted ADR dependencies — not future ADR candidates

| Original trace label | Governed by existing authority | Normalized status |
|---|---|---|
| DADR-MP-03 | ADR-009 and ADR-028 | Accepted dependency; no new ADR candidate |
| DADR-MP-13 | ADR-027, ADR-028, and Core Freeze section 5.5 | Accepted dependency; no new ADR candidate |
| DADR-MP-14 | ADR-028 | Accepted dependency; no new ADR candidate |
| DADR-MP-15 | ADR-009 and ADR-028 | Accepted dependency; no new ADR candidate |
| DADR-MP-17 | ADR-014, ADR-034, Core Permission Model, and Core Freeze | Accepted dependency; no new ADR candidate |
| DADR-MP-20 | ADR-010 and ADR-029 through ADR-031 | Accepted dependency; no new ADR candidate |

#### Retained net-new Draft ADR candidates

The following trace labels remain possible Marketplace-internal ADR subjects only:

- DADR-MP-01 — Marketplace Internal Domain Map;
- DADR-MP-02 — Marketplace Capability Catalog;
- DADR-MP-04 — Marketplace Asset and Version Ownership;
- DADR-MP-05 — Marketplace Publisher Participation;
- DADR-MP-06 — Marketplace Category Taxonomy;
- DADR-MP-07 — Asset Version Publication Lifecycle allocation;
- DADR-MP-08 — Review, Certification, and Trust Separation;
- DADR-MP-09 — Marketplace Compatibility Assessment and Target Validation Separation;
- DADR-MP-10 — Dependency Declaration and Installation Resolution;
- DADR-MP-11 — Marketplace-internal License, Offer, Purchase, and Entitlement Separation;
- DADR-MP-12 — Distribution Availability Boundary;
- DADR-MP-16 — Marketplace projection participation in Search and Recommendation flows;
- DADR-MP-18 — Marketplace Governance Action Boundary; and
- DADR-MP-19 — Extension and Connector Model.

Each retained label remains Draft, reserves no Governance number, and gains no authority from this
Patch. Before an ADR is drafted, its scope must be checked again against all Accepted ADRs and
narrowed to a net-new Marketplace-internal decision.

### Architectural Rationale

This correction changes governance classification only. It does not accept, reject, or create an
ADR and does not alter the Proposal decisions represented by the trace labels.

### Impact

- **Accepted ADRs:** unchanged;
- **new ADRs:** zero;
- **original trace labels:** preserved for auditability;
- **net-new Draft candidates after normalization:** 14;
- **architecture:** unchanged; and
- **Non-Blocking finding:** addressed.

## 11. PP-08 — Boundaries for Capability, Automation, Workflow, and Dashboard Packs

### Finding Reference

- Architecture Review `NB-02` — several approved Pack categories lack explicit external-owner
  boundaries.
- Architecture Review Patch Item `PP-08`.

### Problem Summary

The Proposal explicitly defines Extension, Connector, Template, Theme, Knowledge Pack, and AI
Expert boundaries. Capability Pack, Automation Pack, Workflow Pack, and Dashboard Pack have only
the general Asset/version model, leaving their relationship to frozen external owners insufficiently
explicit.

### Baseline Reference

- Genesis Capabilities Model and Knowledge Engine.
- Genesis Marketplace Architecture and Platform Ecosystem.
- `ADR-007`, `ADR-008`, `ADR-009`, `ADR-011`, `ADR-017`, `ADR-024`, `ADR-039`, and `ADR-040`.
- Core and Commerce Freeze ownership guarantees.

### Original Proposal Statement

> Capability Packs reference Capability Registry definitions and cannot redefine Capabilities.

Automation Packs, Workflow Packs, and Dashboard Packs are approved categories without equivalent
category-specific owner-preserving statements.

### Corrected Proposal Statement

The following statements clarify the existing shared Asset model without defining category
content schemas or resolving category-specific policy:

#### Capability Pack

> Marketplace owns the Marketplace Asset representation and immutable Marketplace Asset Version.
> Capability Registry remains the sole owner of Capability identity, meaning, dependencies,
> applicability, and lifecycle. A Capability Pack may reference or compose canonical Capability
> identifiers but cannot create, rename, mutate, or supersede a Capability. Exact Capability Pack
> content and eligibility remain DD-MP-05.

#### Automation Pack

> Marketplace owns the shared Automation Pack Asset representation and immutable Marketplace
> Asset Version. Knowledge Engine and Rules owners retain canonical Knowledge and deterministic
> Rule definitions. Configuration Engine retains Configuration Proposal ownership, and the target
> Core or OS owner validates and owns applied automation configuration, execution, outcomes, and
> operational facts. Marketplace lifecycle state does not execute an automation or become its
> target state.

#### Workflow Pack

> Marketplace owns the shared Workflow Pack Asset representation and immutable Marketplace Asset
> Version. Canonical Knowledge workflows remain Knowledge Engine-owned where referenced. The
> applicable target owner retains applied workflow configuration, workflow instances, lifecycle,
> authorization, and operational records. Marketplace does not create a parallel target workflow
> engine or workflow truth.

#### Dashboard Pack

> Marketplace owns the shared Dashboard Pack Asset representation and immutable Marketplace Asset
> Version. Source facts remain with their canonical Domains. Core Analytics or the applicable OS
> retains its projections, applied dashboard/report configuration, authorization, freshness,
> rebuild, and presentation ownership. A Dashboard Pack is never an Analytics or operational
> source of truth.

Exact Pack structures, compatibility, application, migration, and removal effects remain within
the existing Deferred Decision register and require later approval.

### Architectural Rationale

These statements apply the Proposal's existing no-parallel-truth and target-owner rules to four
already-approved categories. They do not create a category, content model, aggregate, or target
application mechanism.

### Impact

- **Asset categories:** unchanged;
- **Marketplace Asset/version ownership:** unchanged;
- **Capability, Knowledge, Rule, Configuration, Analytics, and OS owners:** unchanged;
- **category implementation and policy:** remains deferred; and
- **Non-Blocking finding:** addressed.

## 12. PP-09 — MPD-12 Projection-Only Operations Boundary

### Finding Reference

- Architecture Review `NB-03` — operations and support coordination lacks an explicit source
  owner.
- Architecture Review Patch Item `PP-09`.

### Problem Summary

The Proposal states that MPD-12 owns projections only while also assigning it Marketplace
operations and support coordination. It does not explicitly prevent future documentation from
creating an undeclared support or incident source model.

### Baseline Reference

- Core Platform Freeze: projection is never ownership.
- Core Platform Freeze `D-35`: Marketplace incident handling, support, SLO, installation recovery,
  and partner operational policy remain deferred.
- Proposal DD-MP-50.

### Original Proposal Statement

> MPD-12 owns Marketplace operational projections, support coordination, health and Analytics
> participation.

> MPD-10 and MPD-12 own projections only. They have no canonical Marketplace write model in v0.1.

### Corrected Proposal Statement

> MPD-12 owns only Marketplace operational projections and coordination views derived from
> authorized canonical owners. It owns no support case, incident, service-objective, recovery,
> continuity, vulnerability, customer communication, or escalation source record under Proposal
> v0.1. No additional MPD-12 write model or aggregate is approved.

> Where a frozen Core or Marketplace canonical owner already exists, MPD-12 consumes its governed
> reference or outcome. Where no owner is yet approved, ownership, lifecycle, and operating policy
> remain unresolved under Core Freeze D-35 and DD-MP-50 and must be introduced through the approved
> ADR and milestone process. A projection or coordination view cannot become interim source truth.

### Architectural Rationale

The correction makes the Proposal's existing statement—MPD-12 is projection-only—controlling over
the ambiguous word “coordinates.” It does not select a future operational owner.

### Impact

- **MPD-12:** remains projection-only;
- **MWM count:** remains 18;
- **aggregate count:** unchanged;
- **support and incident owner:** remains deferred where not frozen;
- **DD-MP-50:** fully preserved; and
- **Non-Blocking finding:** addressed.

## 13. PP-10 — Marketplace Governed-Surface Ownership

### Finding Reference

- Architecture Review `NB-04` — Marketplace governed-surface ownership is not stated.
- Architecture Review Patch Item `PP-10`.

### Problem Summary

The Proposal correctly excludes Product Hub journey composition and OS navigation ownership but
does not repeat the frozen rule that Marketplace owns its governed Marketplace surface and
route-local movement.

### Baseline Reference

- `ADR-037`: Marketplace owns its governed surface; context switches and deep links reauthorize.
- Core Platform Freeze navigation guarantees.
- `ADR-019` and `ADR-020`: Product Hub owns composition and handoff, not source-domain surfaces.
- `ADR-024`: each OS owns its setup and operational navigation.

### Original Proposal Statement

> Product Hub journey composition is outside Marketplace ownership.

> Product Hub composes Marketplace discovery and initiates authorized Marketplace actions.

No explicit Marketplace governed-surface ownership statement is present.

### Corrected Proposal Statement

> Marketplace owns its governed Marketplace surface and route-local movement within explicit,
> reauthorized context. Core Platform owns Authentication, Workspace and Business context entry,
> Core governance movement, and Product Hub handoff. Product Hub owns journey composition and
> routing into Marketplace but not the Marketplace surface. Each Operating System retains its
> setup and operational navigation. Cross-context or cross-application movement reauthorizes under
> ADR-037.

This Patch defines no route, screen, navigation tree, deep-link format, token, or implementation
mechanism.

### Architectural Rationale

The statement records an Accepted ADR boundary that already governs Marketplace. It does not add a
new Marketplace Capability or navigation component.

### Impact

- **Marketplace surface owner:** documented from frozen authority;
- **Product Hub owner:** unchanged;
- **Core context owner:** unchanged;
- **OS navigation owners:** unchanged;
- **navigation design:** not introduced; and
- **Non-Blocking finding:** addressed.

## 14. Deferred Decision Preservation

All fifty Deferred Decision identifiers remain present and unresolved:

```text
DD-MP-01 through DD-MP-50
```

Preservation rules:

1. PP-01 does not decide preview, staged, private, or limited publication; it only restores the
   current Published-version gate.
2. PP-02 does not decide Review criteria or evidence; it preserves the six frozen dimensions and
   narrows DD-MP-14 to genuinely unresolved details.
3. PP-03 and PP-04 do not decide Marketplace commercial lifecycle policy.
4. PP-05 does not define a Permission catalog, grant policy, data classification, or declaration
   schema.
5. PP-06 does not define OS acquisition choreography, handoff, installation implementation, or
   category-specific lifecycle policy.
6. PP-07 creates no ADR and accepts no Draft ADR candidate.
7. PP-08 does not define Pack contents, target application, compatibility, migration, or removal
   behavior.
8. PP-09 leaves operational ownership and policy unresolved wherever no frozen owner exists.
9. PP-10 does not define navigation design or implementation.
10. No Deferred Decision may be treated as answered by inference from this Patch.

## 15. Patch Validation

### 15.1 Blocking Issues

| Blocking finding | Patch item | Validation result |
|---|---|---|
| B-01 — non-Published Distribution | PP-01 | Resolved: Published immutable version is the sole current distribution gate |
| B-02 — optional Review dimensions | PP-02 | Resolved: all six Genesis dimensions remain mandatory |
| B-03 — Entitlement owns Distribution right | PP-03 | Resolved: MPD-08 alone owns Distribution Availability |
| B-04 — wrong Entitlement reference | PP-04 | Resolved: Marketplace Entitlement and Core Workspace Entitlement remain distinct |
| B-05 — hidden declaration ownership | PP-05 | Resolved: existing MWM-03/MPD-03 owns version declarations; grants remain external |
| B-06 — OS Asset dual lifecycle ambiguity | PP-06 | Resolved: Marketplace representation/state is distinct from Core and OS truth |

**Blocking Issues resolved: 6 of 6**

### 15.2 Non-Blocking Issues

| Non-Blocking finding | Patch item | Validation result |
|---|---|---|
| NB-01 — Draft ADR duplication | PP-07 | Addressed: Accepted dependencies separated from net-new Draft candidates |
| NB-02 — Pack boundary gaps | PP-08 | Addressed: external owners preserved explicitly |
| NB-03 — hidden operations/support writes | PP-09 | Addressed: MPD-12 remains projection-only |
| NB-04 — governed-surface omission | PP-10 | Addressed: ADR-037 ownership recorded without design |

**Non-Blocking Issues addressed: 4 of 4**

### 15.3 Architecture preservation

| Validation | Result |
|---|---|
| Marketplace Scope changed | NO |
| Marketplace Non-Scope changed | NO |
| Domains redesigned | NO |
| Capabilities redesigned | NO |
| Canonical facts added, removed, or transferred | NO |
| Canonical write models added, removed, or transferred | NO |
| Aggregates redesigned | NO |
| Lifecycle states added, removed, or transferred | NO |
| Frozen external owner changed | NO |
| New ADR created or accepted | NO |
| Deferred Decision resolved | NO |
| API, Event, or Contract introduced | NO |
| Database, infrastructure, deployment, or technology introduced | NO |
| Existing document modified | NO |

**New architectural decisions introduced: 0**

## 16. Re-Review Baseline

The Independent Architecture Re-Review must evaluate Proposal v0.1 and this Patch together. It
must verify:

1. every corrected statement governs the conflicting Proposal statement;
2. PP-01 through PP-10 are complete;
3. B-01 through B-06 are resolved;
4. NB-01 through NB-04 are addressed;
5. the twelve Domains and twenty-four Capabilities remain unchanged;
6. all stated canonical write and aggregate owners remain unique;
7. all fifty Deferred Decision identifiers remain preserved;
8. no Accepted ADR is reopened;
9. no new architecture or implementation detail appears; and
10. the merged baseline is ready, or not ready, for Documentation Waves.

## 17. Recommendation

# READY FOR RE-REVIEW

Marketplace Proposal Baseline v0.1.1 consists of Marketplace Proposal v0.1 plus this approved-scope
Freeze Alignment Patch. It must pass independent Architecture Re-Review before any Marketplace
Documentation Wave begins.

## References

### Marketplace baseline

- [Marketplace Discovery v0.1](00-MARKETPLACE-DISCOVERY.md)
- [Marketplace Capability Map v0.1](01-MARKETPLACE-CAPABILITY-MAP.md)
- [Marketplace Architecture Proposal v0.1](02-MARKETPLACE-PROPOSAL.md)
- [Marketplace Proposal v0.1 Independent Architecture Review](03-MARKETPLACE-ARCHITECTURE-REVIEW.md)

### Frozen authority

- [Governance ADR Repository](../00-governance/ADR/README.md)
- [Canonical Glossary](../00-governance/glossary/GLOSSARY.md)
- [Genesis Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [Genesis Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md)
- [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Genesis Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)
- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Core Platform Readiness v1.0.1](../99-architecture-freeze/CORE-PLATFORM-v1.0.1-READINESS.md)
- [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Commerce OS Freeze v1.0](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md)
