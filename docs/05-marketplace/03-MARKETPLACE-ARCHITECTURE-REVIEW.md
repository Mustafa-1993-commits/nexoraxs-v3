# Marketplace Proposal v0.1 — Independent Architecture Review

**Status:** Independent Architecture Quality Gate  
**Reviewed baseline:** Marketplace Architecture Proposal v0.1  
**Review authority:** Frozen Genesis v1.1, Accepted Governance ADRs, Core Platform v1.0/v1.0.1, Business Brain v1.0, and Commerce OS v1.0  
**Review posture:** Every Proposal claim was treated as untrusted until traced to a frozen source or tested against an approved ownership boundary  
**Verdict:** APPROVED WITH PATCH

This document reviews architecture only. It does not redesign Marketplace, approve a Documentation
Wave, resolve a Deferred Decision, create an ADR, or change a frozen predecessor.

## 1. Executive Summary

Marketplace Proposal v0.1 establishes a coherent Marketplace bounded context with twelve logical
Domains, twenty-four Capabilities, twenty-three stated canonical facts, eighteen canonical write
models, eighteen aggregate candidates, explicit external ownership boundaries, and fifty Deferred
Decisions. Its central architecture is aligned with the frozen baseline:

- Marketplace remains a bounded context within Core Platform.
- Marketplace Assets and published Marketplace Asset Versions remain shared and immutable.
- customer adoption state remains scoped and separate from shared Asset content.
- Product Hub remains a composition and handoff owner, not a Marketplace data owner.
- Business Brain, Recommendation Engine, Configuration Engine, Knowledge Engine, AI Coordinator,
  Core Platform, Commerce OS, and future Operating Systems retain their canonical facts.
- Marketplace projections do not become Search, Analytics, Audit, Notification, Recommendation,
  or Product Hub source truth.
- no implementation, database, infrastructure, framework, deployment, or vendor decision is made.

The Proposal is not ready for Documentation Waves unchanged. Six blocking findings require a
bounded Proposal Patch. Four further non-blocking architecture-quality findings should be included
in the same Patch. None requires rejection or a redesign of the proposed Marketplace bounded
context, Domain map, Capability catalog, or frozen predecessor architecture.

### 1.1 Review result

| Result | Count |
|---|---:|
| Blocking Issues | 6 |
| Non-Blocking Issues | 4 |
| Recommended Proposal Patch Items | 10 |
| Editorial Improvements | 4 |
| Technology decisions detected | 0 |
| Implementation or infrastructure leakage detected | 0 |

### 1.2 Architecture verdict

**APPROVED WITH PATCH**

The proposed architecture may proceed to a Freeze Alignment Proposal Patch. It must not proceed to
Documentation Waves until the Patch is independently re-reviewed.

## 2. Review Authority and Method

### 2.1 Frozen authorities applied

The review applied the following authority order:

1. Architecture Freeze documents under `docs/99-architecture-freeze/`;
2. Accepted Governance ADRs and the canonical Glossary under `docs/00-governance/`;
3. Genesis v1.1 under `docs/01-genesis/`;
4. approved Core Platform, Business Brain, and Commerce OS milestone baselines;
5. approved Marketplace Discovery and Capability Map; and
6. Marketplace Proposal v0.1 as the untrusted subject of review.

The most directly controlling decisions are:

- `ADR-002` — Core Platform is the shared control and intelligence plane;
- `ADR-003` and `ADR-004` — Workspace tenant boundary and canonical organization hierarchy;
- `ADR-009` and `ADR-010` — immutable published platform Assets and additive Knowledge Packs;
- `ADR-013`, `ADR-014`, and `ADR-017` — Recommendation, human authority, and target-owned
  configuration boundaries;
- `ADR-019` and `ADR-020` — Product Hub composition and handoff ownership;
- `ADR-021` through `ADR-026` — Core commercial and Operating System lifecycle ownership;
- `ADR-027` and `ADR-028` — Marketplace bounded context, shared Assets, and scoped state;
- `ADR-029` through `ADR-032` — AI and AI Expert authority limits;
- `ADR-034` through `ADR-038` — context, contracts, navigation, and Audit guarantees; and
- `ADR-040` — Core organization identity and OS operational ownership.

### 2.2 Validation method

The review traced:

1. each proposed Marketplace Domain to one accountable concern;
2. each Capability to one Domain;
3. each stated canonical fact to one owner;
4. each canonical write model and aggregate candidate to one owner;
5. each shared or scoped lifecycle to one owner;
6. every cross-boundary collaboration to its frozen source owner;
7. every Asset-category relationship to the corresponding Core, Knowledge, AI, or OS boundary;
8. all fifty Deferred Decisions against decisions already frozen; and
9. all Draft ADR candidates against the forty Accepted Governance ADRs.

## 3. Strengths

### 3.1 Correct bounded-context placement

The Proposal consistently keeps Marketplace within the Core Platform offering while separating it
from Product Hub, shared Core services, and Operating System operational ownership. This directly
aligns with `ADR-027` and the Core Platform Freeze.

### 3.2 Strong shared-Asset and scoped-state separation

The Proposal distinguishes Marketplace Asset, Marketplace Asset Version, Purchase, Marketplace
Entitlement, Version Selection, Installation, Marketplace Scoped Configuration, Activation, and
Applicability. It preserves immutable history and prevents tenant copies of published Asset
content, consistent with `ADR-009`, `ADR-010`, and `ADR-028`.

### 3.3 Explicit internal ownership

The twelve proposed Domains and twenty-four Capabilities each have one accountable home. The
canonical fact, write-model, and aggregate tables make the internal allocation reviewable. No
duplicate owner appears among the eighteen listed write models or eighteen listed aggregate
candidates.

### 3.4 External ownership is largely preserved

The Proposal correctly retains:

- Core identity, organization, commercial, Permission, Audit, Notification, Search, and Analytics
  ownership;
- Product Hub journey composition and handoff ownership;
- Business Brain Decision ownership;
- Recommendation Engine Recommendation ownership;
- Core intelligence mapping ownership of Implementation Options;
- Configuration Engine ownership of Configuration Proposals;
- Knowledge Engine ownership of Knowledge and Knowledge Pack content;
- AI Coordinator ownership of Expert eligibility, routing, execution, and AI artifacts; and
- Commerce OS and future OS ownership of target configuration and operational facts.

### 3.5 Target validation and no-parallel-truth rules

Compatibility Assessment, Review, Certification, Entitlement, Installation, and Activation do not
authorize target writes. The target owner validates and applies target state. Extensions,
Connectors, Templates, Themes, Knowledge Packs, and AI Experts are prevented from becoming parallel
Core, Knowledge, AI, or OS truth.

### 3.6 Projection governance

Trust, discovery, eligibility, Search participation, operational views, and Marketplace Analytics
views are explicitly non-canonical. Core retains Search Index and platform Analytics ownership.
This satisfies the frozen rule that projection is never ownership.

### 3.7 Security and AI boundaries

The Proposal preserves tenant isolation, least privilege, explicit context, separate Permission
assignment, target reauthorization, append-only Core Audit ownership, and AI Coordinator authority.
It does not permit Marketplace activation to grant data access or let customers bypass the AI
Coordinator to select an independent Expert.

### 3.8 Technology independence

No API endpoint, physical schema, database, message broker, framework, cloud provider,
infrastructure topology, deployment decision, or implementation sequence appears in the Proposal.

## 4. Findings

### 4.1 Validation matrix

| Review area | Result | Evidence and assessment |
|---|---|---|
| Marketplace Scope | Conditional Pass | Bounded correctly; distribution publication gate requires correction under B-01. |
| Marketplace Non-Scope | Pass | Core, intelligence, AI, Knowledge, Product Hub, Commerce, and OS exclusions are explicit. |
| Domain Boundaries | Conditional Pass | Internal direction is coherent; required-declaration ownership and OS Asset dual lifecycle require correction. |
| Capability Ownership | Pass | All 24 Capabilities have one accountable Domain. |
| Canonical Facts | Conditional Pass | Stated facts are singly owned; required-Permission and data-access declarations are hidden under B-05. |
| Canonical Write Models | Conditional Pass | All 18 listed models are singly owned; B-05 identifies an omitted consequential declaration write boundary. |
| Aggregate Responsibilities | Conditional Pass | All 18 listed aggregates are singly owned; category-specific and declaration boundaries need clarification. |
| Shared Asset Model | Pass | Shared immutable published versions and scoped references align with ADR-009/028. |
| Workspace Scoped State | Conditional Pass | Scope aligns; Entitlement terminology in B-04 must be corrected. |
| Publisher Model | Pass | Marketplace participation profile references rather than duplicates Core identity. |
| Asset Categories | Conditional Pass | Taxonomy is coherent; OS and several Pack category boundaries require B-06/NB-02 clarification. |
| Asset Lifecycle | Pass | Asset identity and Asset Version lifecycle ownership are separated. |
| Versioning | Pass | Publication immutability, exact selection, and preserved history are explicit. |
| Review Model | Fail | B-02 weakens six mandatory Genesis Review dimensions. |
| Certification Model | Pass | Certification remains distinct from Review, publication, compatibility, and authorization. |
| Trust Model | Pass | Trust Profile is explainable, derived, and non-authoritative. |
| Compatibility Model | Pass | declaration, assessment, certification, and target decision remain separate. |
| Dependency Model | Pass | declaration and scoped resolution are separated; target writes remain external. |
| Licensing | Pass | Marketplace License and Offer do not become Core billing truth. |
| Purchase | Pass | Purchase is Workspace-scoped and Marketplace-owned. |
| Entitlement | Fail | B-03 and B-04 create Distribution authority and canonical-name ambiguity. |
| Distribution | Fail | B-01 permits an Approved, not necessarily Published, version. |
| Installation | Conditional Pass | Scope and target validation align; required-Permission declaration/grant boundary needs B-05 correction. |
| Activation | Pass | Activation is separate from Permission, Applicability, target configuration, and readiness. |
| Applicability | Conditional Pass | Workspace/Business scope is correct; the Entitlement reference requires B-04 correction. |
| Upgrade | Pass | Selects a new immutable version and preserves prior history. |
| Removal | Pass | Removes scoped state only and leaves owner histories intact. |
| Search Participation | Pass | Marketplace supplies projections; Core owns Search Index and query behavior. |
| Recommendation Participation | Pass | Recommendation Engine remains the sole Recommendation owner. |
| Analytics Participation | Pass | Marketplace views are derived; Core Analytics retains platform projection ownership. |
| Security | Conditional Pass | Overall model aligns; B-05 must make required declarations and current grants unambiguous. |
| Privacy | Pass | Minimization, references, tenant isolation, and narrower projections are preserved. |
| Audit | Pass | Core owns append-only Audit Records; Marketplace supplies evidence only. |
| Operations | Conditional Pass | Projection-only MPD-12 conflicts with unspecified support/incident state under NB-03. |
| Core Platform Collaboration | Pass | Marketplace consumes Core foundations without acquiring Core facts. |
| Product Hub Collaboration | Pass | Product Hub composes and initiates; Marketplace owners write state. |
| Business Brain Collaboration | Pass | Marketplace supplies context and never forms Decision content. |
| Recommendation Engine Collaboration | Pass | Eligibility input does not become Recommendation. |
| Commerce OS Collaboration | Pass | Commerce retains all target configuration and canonical Commerce facts. |
| Future OS Collaboration | Conditional Pass | General target boundary is correct; OS-as-Asset dual lifecycle requires B-06. |
| Extension Model | Pass | Extension is optional and owns no target fact. |
| Connector Model | Pass | Connector is an Extension subtype and owns no provider or target truth. |
| Template Model | Pass | Marketplace owns reusable version; target owns applied configuration and records. |
| Theme Model | Pass | Theme owns no logic, authorization, navigation truth, or canonical business data. |
| Knowledge Pack Relationship | Pass | Marketplace distribution and Knowledge Engine content ownership are separated. |
| AI Expert Relationship | Pass | Marketplace distribution does not replace Expert Registry/AI Coordinator operational authority. |
| Draft ADR Candidates | Conditional Pass | Candidate register needs accepted-ADR normalization under NB-01. |
| Deferred Decisions | Conditional Pass | Fifty are preserved; DD-MP-14 must not re-defer the mandatory six Review dimensions. |
| No duplicated ownership | Conditional Pass | No duplicate in tables; B-03/B-06 create semantic overlap that must be removed. |
| No hidden ownership | Fail | B-05 and NB-03 identify missing canonical-source attribution. |
| No circular ownership | Pass | Evidence, lifecycle, and target validation form directed collaboration without cross-writes. |
| No lifecycle conflict | Fail | B-01 and B-06 require correction. |
| No technology or implementation leakage | Pass | None detected. |

## 5. Blocking Issues

### B-01 — Distribution permits a non-Published Asset Version

- **Proposal sections:** 2, 6, and 26
- **Conflicting baseline:** Genesis Marketplace Architecture; `ADR-009`; `ADR-028`; Core Platform
  Freeze sections 3.4 and 5.5
- **Description:** The Proposal describes Distribution Availability for an “approved immutable”
  version and permits an `Approved or Published` version. Elsewhere the Proposal correctly states
  that immutability begins on publication and that Distribution Availability concerns a published
  immutable version.
- **Why blocking:** `Approved` precedes `Published` in the frozen lifecycle. Allowing an Approved
  version to be distributed can expose mutable or not-yet-published content and contradicts the
  frozen published-version guarantee.
- **Required correction:** Require Distribution Availability, customer acquisition, and
  Installation to reference a `Published` immutable Marketplace Asset Version. Preview, staged,
  private, or limited publication semantics must remain deferred until explicitly approved; they
  cannot be implemented by treating `Approved` as distributable.
- **Proposal Patch required:** YES

### B-02 — Mandatory Review dimensions are weakened

- **Proposal sections:** 19 and DD-MP-14
- **Conflicting baseline:** Genesis Marketplace Architecture, Quality section
- **Description:** Genesis requires every Marketplace Asset to pass Technical, Security, Business,
  UX, Performance, and Compatibility Review. The Proposal says required dimensions may vary by
  category and defers which dimensions are required.
- **Why blocking:** This converts a frozen universal quality gate into optional category policy.
  It weakens an explicit Genesis invariant.
- **Required correction:** Preserve all six dimensions as mandatory for every Asset. Category
  policy may specialize criteria, evidence, evaluators, applicability treatment, and outcomes but
  may not omit a frozen dimension. Narrow DD-MP-14 accordingly.
- **Proposal Patch required:** YES

### B-03 — Marketplace Entitlement crosses into Distribution ownership

- **Proposal section:** 25.2
- **Conflicting proposal boundary:** MPD-07 versus MPD-08; sections 6, 8, 10, 11, 24–26
- **Description:** Marketplace Entitlement is said to prove a Workspace right to `distribute` an
  Asset. Distribution Availability is a separate canonical fact and aggregate owned by MPD-08.
- **Why blocking:** The statement creates overlapping authority between Entitlement and
  Distribution and could be interpreted as permitting a customer Workspace to publish or
  redistribute an Asset.
- **Required correction:** Remove Distribution authority from Marketplace Entitlement. Entitlement
  may prove the Workspace’s current right to acquire/obtain, select, install, update, or use an
  Asset subject to License and owner validation; MPD-08 alone owns Distribution Availability.
- **Proposal Patch required:** YES

### B-04 — Marketplace Applicability references the wrong Entitlement concept

- **Proposal section:** 25.3
- **Conflicting baseline:** `ADR-021`, the Governance Glossary, Core Platform Domain Model, and Core
  Freeze
- **Description:** The Proposal first distinguishes Marketplace Entitlement from canonical Core
  `Workspace Entitlement`, then states that Business Applicability references “a Workspace
  Entitlement.”
- **Why blocking:** Workspace Entitlement is an existing Core-owned canonical concept. The wording
  can make Marketplace Applicability depend on or transfer meaning to the wrong entitlement source.
- **Required correction:** State that Marketplace Applicability references the Marketplace
  Entitlement belonging to the Workspace. Core Workspace Entitlement, when required for platform
  access, remains an independently evaluated Core fact and is not renamed or replaced.
- **Proposal Patch required:** YES

### B-05 — Required-Permission and data-access declarations have hidden ownership

- **Proposal sections:** 6, 19, 21, 27, 35, 37, 40, and 41
- **Conflicting baseline:** Genesis Marketplace Security; Core Permission Model; Core Security
  Model; Core Freeze ownership guarantees
- **Description:** Asset Versions must declare required Permissions and data access, and changes to
  those declarations are consequential and auditable. They do not appear in the canonical fact,
  write-model, or aggregate maps. MPD-11 owns required-Permission governance while MPD-03 owns
  Asset Version content, leaving the declaration writer implicit.
- **Why blocking:** A security-critical canonical declaration has no explicit source owner. The
  Proposal also validates declarations during Installation without clearly separating declaration
  validity from current Permission grants and target authorization.
- **Required correction:** Assign each version-scoped required-Permission and data-access
  declaration to exactly one existing proposed owner and write boundary. Keep policy validation
  separate from declaration ownership, and state that current grants and target authorization are
  independently evaluated; declaration or Activation never grants access.
- **Proposal Patch required:** YES

### B-06 — Operating System Asset and OS lifecycle ownership are not separated

- **Proposal sections:** 3, 9, 16, 17, 25–30, and 39
- **Conflicting baseline:** `ADR-019` through `ADR-026`; Core Domain Model; Core Freeze; Discovery
  risk R-06
- **Description:** Operating Systems are approved as a top-level Marketplace Asset category, while
  Marketplace owns Asset Version, Purchase, Entitlement, Installation, Activation, Applicability,
  and upgrade state. The Proposal says an OS Asset references Core Product and Plan but does not
  distinguish Marketplace Asset Version from the OS-owned release/version, or Marketplace scoped
  adoption from Core OS Subscription, platform-side installation, OS setup, configuration,
  Activation, readiness, and OS release lifecycle.
- **Why blocking:** Without an explicit dual-boundary rule, an Operating System listing can create
  parallel Product, version, commercial, Installation, Activation, or lifecycle truth and conflict
  with frozen Product Hub/Core/OS owners.
- **Required correction:** Define the OS-category relationship without changing any owner:
  Marketplace owns its Asset/listing/version representation and Marketplace-scoped state; the
  canonical OS Product, Plan, OS Subscription, platform-side installation operation, OS release,
  setup, configuration, Activation, readiness, and operational lifecycle remain with their frozen
  Core and OS owners. References and handoffs must not collapse these facts.
- **Proposal Patch required:** YES

## 6. Non-Blocking Issues

### NB-01 — Draft ADR candidates re-propose Accepted decisions

- **Proposal section:** 45
- **Description:** DADR-MP-03, DADR-MP-13, DADR-MP-14, and DADR-MP-15 substantially restate
  `ADR-028`; DADR-MP-17 overlaps accepted Permission/context decisions; DADR-MP-20 overlaps
  `ADR-010` and `ADR-029` through `ADR-031`. Other candidates also combine frozen rules with
  Marketplace-internal refinements.
- **Impact:** A later ADR workflow could appear to reopen or duplicate frozen authority.
- **Recommended action:** Split the register into Accepted ADR dependencies and net-new Draft ADR
  candidates. Narrow any retained Draft to a Marketplace-internal decision not already accepted.
- **Proposal Patch required:** YES

### NB-02 — Several approved Pack categories lack explicit external-owner boundaries

- **Proposal sections:** 16 and 40–44
- **Description:** Extension, Connector, Template, Theme, Knowledge Pack, and AI Expert receive
  explicit boundary models. Capability Pack, Automation Pack, Workflow Pack, and Dashboard Pack do
  not receive equivalent rules despite overlap risk with Capability Registry, Knowledge Engine,
  Rules, Configuration Engine, Core Analytics, and OS-owned workflows, dashboards, reports, and
  target configuration.
- **Impact:** The shared Marketplace Asset Version owner is stated, but the meaning and target
  effect of these categories can still be read as ownership of external canonical content.
- **Recommended action:** Add concise boundary statements: Marketplace owns the shared Asset
  representation and immutable version; existing owners retain Capability definitions, Knowledge,
  Rules, Configuration Proposals, applied target configuration, workflows, reports, dashboards,
  Analytics, and operational facts. Keep unresolved category semantics deferred.
- **Proposal Patch required:** YES

### NB-03 — Operations and support coordination lacks an explicit source owner

- **Proposal sections:** 6, 11, 34, and 38
- **Description:** MPD-12 is declared projection-only yet coordinates operations and support. The
  Proposal does not state who owns any support case, incident, service objective, recovery, or
  continuity record, while DD-MP-50 correctly defers those operational decisions.
- **Impact:** Future documentation could introduce a hidden MPD-12 write model or make a projection
  the source of operational truth.
- **Recommended action:** State that MPD-12 owns only Marketplace operational projections and
  coordination views. No support or incident write model is approved by v0.1; canonical operational
  records remain with an applicable frozen shared owner or a future owner approved through the
  deferred-decision and ADR process.
- **Proposal Patch required:** YES

### NB-04 — Marketplace governed-surface ownership is not stated

- **Proposal sections:** 2, 3, and 39
- **Conflicting omission:** `ADR-037` and Core Freeze navigation guarantees
- **Description:** The Proposal correctly excludes Product Hub composition but does not state that
  Marketplace owns its governed Marketplace surface and route-local movement while Core owns
  context entry and Product Hub handoff.
- **Impact:** Later documentation could place Marketplace navigation inside Product Hub or an OS.
- **Recommended action:** Add the frozen ownership statement only. Do not define routes, screens,
  navigation design, or implementation.
- **Proposal Patch required:** YES

## 7. Recommended Proposal Patch Items

The following Patch is sufficient. No Domain, Capability, aggregate, frozen owner, or milestone
scope redesign is recommended.

| Patch item | Required alignment |
|---|---|
| PP-01 | Restrict Distribution Availability, acquisition, and Installation to Published immutable Marketplace Asset Versions. |
| PP-02 | Restore all six Genesis Review dimensions as mandatory; narrow DD-MP-14 to criteria and evidence variation only. |
| PP-03 | Remove any Workspace/customer right to distribute from Marketplace Entitlement. |
| PP-04 | Replace the ambiguous Workspace Entitlement reference with the Workspace-owned Marketplace Entitlement while preserving Core Workspace Entitlement separately. |
| PP-05 | Assign required-Permission and data-access declarations to one explicit canonical owner/write boundary and separate declarations from current grants. |
| PP-06 | Clarify OS-as-Marketplace-Asset representation and scoped state versus Core/OS Product, release, Subscription, Installation, setup, Activation, readiness, and operational lifecycles. |
| PP-07 | Normalize Draft ADR candidates against Accepted ADRs and retain only net-new Marketplace-internal decisions. |
| PP-08 | Add explicit owner-preserving boundaries for Capability Packs, Automation Packs, Workflow Packs, and Dashboard Packs. |
| PP-09 | Confirm MPD-12 is projection/coordination only and approve no hidden support or incident write model. |
| PP-10 | Record Marketplace ownership of its governed surface under ADR-037 without defining navigation design. |

The Patch must preserve all fifty Deferred Decision identifiers. It may narrow a Deferred Decision
that currently attempts to re-defer a frozen rule, but it must not answer any genuinely deferred
policy or implementation question.

## 8. Editorial Improvements

These items are not Architecture or Freeze blockers and do not require an architectural decision.

### E-01 — Clarify proposal-status labels

Sections titled “Approved” also say “subject to Architecture Review.” Use a consistent phrase such
as “Proposed for Approval” until the re-review approves the merged baseline.

### E-02 — Add an authority trace table

The References section names only `ADR-027` and `ADR-028` as Marketplace-specific authority.
Adding a compact trace table for the other Accepted ADRs applied by the Proposal would make the
independent re-review faster without changing architecture.

### E-03 — Distinguish Review state from Marketplace Review record typographically

The lifecycle state `Review` and canonical `Marketplace Review` evidence record are logically
separated in the text but visually easy to conflate. A terminology note would improve precision.

### E-04 — Add Discovery-question traceability

Map the major Proposal decisions and Deferred Decisions to Discovery OQ groups and risks R-01
through R-30. This is traceability only and must not reopen Discovery.

## 9. Architecture Verdict

# APPROVED WITH PATCH

Marketplace Proposal v0.1 has a viable and internally coherent architectural core. It is not
rejected because the Domain map, Capability allocation, shared Asset model, scoped-state model,
target-owner boundaries, Product Hub separation, Business Brain and Recommendation boundaries,
Commerce independence, Knowledge Pack boundary, AI Coordinator boundary, security principles,
and technology independence are fundamentally sound.

The six blocking findings are precise baseline-alignment defects and ownership ambiguities that
can be corrected without redesign. A Proposal Patch must address PP-01 through PP-10 and then
undergo independent re-review before any Documentation Wave begins.

## References

### Marketplace artifacts reviewed

- [Marketplace Discovery v0.1](00-MARKETPLACE-DISCOVERY.md)
- [Marketplace Capability Map v0.1](01-MARKETPLACE-CAPABILITY-MAP.md)
- [Marketplace Architecture Proposal v0.1](02-MARKETPLACE-PROPOSAL.md)

### Governance and Genesis

- [Governance ADR Repository](../00-governance/ADR/README.md)
- [Canonical Glossary](../00-governance/glossary/GLOSSARY.md)
- [Genesis Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [Genesis Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md)
- [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Genesis Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

### Frozen milestone authorities

- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Core Platform Readiness v1.0.1](../99-architecture-freeze/CORE-PLATFORM-v1.0.1-READINESS.md)
- [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Commerce OS Freeze v1.0](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md)
- [Commerce OS Readiness](../99-architecture-freeze/COMMERCE-OS-READINESS.md)
