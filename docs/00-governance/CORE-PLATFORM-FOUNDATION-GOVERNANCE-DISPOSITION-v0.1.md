# Core Platform / Foundation Governance Disposition v0.1

**Version:** 0.1

**Status:** Approved — Foundation/Core Governance disposition; not an Architecture Freeze

**Owner:** Architecture Governance

**Authority:** Approved Governance disposition for the bounded Foundation/Core successor

**Predecessors:** Foundation Authority Crosswalk v0.1 and Core/Foundation Architecture Impact Review v0.1

**Successor relationship:** Incorporated into Core Platform Architecture v1.1 Freeze without rewriting v1.0 history

**Architecture baseline affected:** Core Platform Architecture v1.0, documentation baseline v1.0.1

**Approval scope:** Bounded disposition of the Sessions 1–4 Foundation impact on frozen Core Platform and Business Brain boundaries

**Approval state:** Approved by Foundation Governance Approval v2.0 after Architecture Review v2

---

## 1. Executive Summary

### 1.1 Purpose

This document defines the proposed Governance disposition for the authority collision between the
[Core Platform Architecture v1.0 Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
and the later Accepted direction in
[ADR-042](./ADR/ADR-042-pre-registration-business-discovery.md), the approved
[Foundation Baseline v0.1](./FOUNDATION-BASELINE-v0.1.md), and
[Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md).

The proposed disposition preserves the frozen Core architecture except for the minimum explicitly
identified successor treatment needed for:

1. the primary new-customer journey order;
2. the boundary between Pre-Registration Business Discovery and the authenticated Business
   Architect Pipeline;
3. the placement of first Business DNA v1 publication;
4. the relationship between ADR-042 and ADR-015/ADR-016; and
5. the conceptual Business Insight and Decision Lineage extensions to the Business Brain baseline.

This document is the governance bridge between Foundation analysis and a future Architecture Review.
It does not itself make the replacement effective.

### 1.2 Scope

This disposition covers:

- the authority relationship among the Core Platform Freeze, Accepted ADRs, approved Foundation
  sources, Genesis, Product Decisions, and Sessions 1–4;
- frozen Core and Business Brain guarantees that remain unchanged;
- compatible Foundation extensions;
- statements proposed for explicit successor treatment;
- the minimum documentation-only alignment that could qualify as a Freeze Alignment Patch;
- material items that require ADR, Architecture Review, approval, an updated or successor Freeze,
  and readiness validation; and
- downstream documentation and delivery work that remains allowed or blocked.

### 1.3 Non-goals

This document does not:

- edit, supersede, amend, or approve an Architecture Freeze or Accepted ADR;
- create or accept an ADR, assign a future ADR identifier, or choose a successor architecture
  version;
- rewrite Genesis, Product Decisions, Sessions 1–4, Foundation sources, or historical evidence;
- define routes, screens, APIs, persistence, schemas, tokens, contracts, or exact lifecycle states;
- authorize frontend, backend, data, or operational migration;
- start Session 5; or
- start or create Feature 056.

### 1.4 Proposed disposition

The disposition proposed for approval is:

1. **Preserve the existing Freezes unchanged as historical authority until successors are approved.**
2. **Retain all Core and Business Brain ownership, tenancy, security, contract, Operating System,
   Marketplace, AI, and readiness guarantees listed in sections 4 and 7.**
3. **Treat ADR-042 as the Accepted source for Pre-Registration Business Discovery, while recognizing
   that it does not silently rewrite the earlier Freeze or ADR-015/ADR-016.**
4. **Require an explicit ADR relationship disposition and a bounded Core successor architecture
   lifecycle for the material journey, pipeline-entry, and first-publication changes.**
5. **Require separate Business Brain successor treatment for conceptual Business Insight and Decision
   Lineage extensions without extracting a physical service or changing the sole Business Brain
   Decision owner.**
6. **Limit any later Freeze Alignment Patch to compatible documentation corrections in section 6.1.
   Material items in section 6.2 are not Patch-eligible.**

### 1.5 Approval requirements

This Proposed artifact becomes actionable only after all applicable Governance authorities approve
the disposition. Material alignment then requires, in order:

1. explicit approval of this disposition or an approved equivalent;
2. an explicit ADR relationship decision for ADR-015, ADR-016, and ADR-042, using a new unused ADR
   identifier if Governance confirms that a new ADR is required;
3. bounded successor Core architecture documentation;
4. independent Core Architecture Review and explicit approval;
5. an updated or successor Core Platform Freeze whose version is selected by that review;
6. the applicable Business Brain Architecture Review and successor action;
7. a versioned Genesis successor or addendum that preserves the older journey and lifecycle;
8. an exact immutable source-version manifest; and
9. readiness validation before dependent UX specifications or implementation begin.

The existing [Core Patch Plan v1.0.1](../02-core-platform/98-CORE-PLATFORM-PATCH-v1.0.1.md)
and documentation baseline already use the v1.0.1 identifier. This artifact therefore does not reuse
that version or present the material Foundation changes as a second v1.0.1 Patch.

This Proposed artifact is located in the Governance area because it is a disposition for future
approval. The Architecture Freeze area remains reserved for the controlling Freeze, readiness
evidence, and any later approved updated or successor Freeze.

## 2. Why This Disposition Exists

### 2.1 Governing evidence

| Source | Exact heading | Evidence used |
|---|---|---|
| [Foundation Baseline v0.1](./FOUNDATION-BASELINE-v0.1.md) | **12. Customer journey baseline**; **16. Business DNA publication lifecycle**; **20. Baseline change policy** | Records Discovery and Preview before authentication, authenticated conversion and first Business DNA v1 publication, and the non-supersession/change policy. |
| [Foundation Audit v0.1](../08-implementation-audit/FOUNDATION-AUDIT-v0.1.md) | **4.2 Authority collision requiring Governance clarification**; **7. Foundation boundary findings matrix**; **15. Recommended reconciliation order** | Establishes the factual collision and identifies Governance disposition before UX reconciliation. |
| [Foundation Authority Crosswalk v0.1](./FOUNDATION-AUTHORITY-CROSSWALK-v0.1.md) | **7. Explicit authority conflicts**; **9. Decisions requiring successor or addendum treatment**; **13. Recommended governance mechanism** | Maps the conflict without resolving it and requires successor treatment. The Crosswalk remains Proposed analysis. |
| [Core/Foundation Architecture Impact Review v0.1](../02-core-platform/13-CORE-FOUNDATION-ARCHITECTURE-IMPACT-REVIEW-v0.1.md) | **18. Compatibility matrix**; **20. Material-change matrix**; **24. Required governance actions**; **25. Recommended successor sequence** | Classifies the journey order and first-publication placement as material architectural changes and separates compatible alignment from successor work. The Review remains Proposed analysis. |
| [ADR-042](./ADR/ADR-042-pre-registration-business-discovery.md) | **Decision**; **8. Authenticated conversion and Business DNA v1**; **9. Guided Activation**; **10. Decision lineage foundation**; **11. Ownership and boundaries** | Accepts the later architecture direction and explicitly preserves Workspace, Business, Business DNA, Recommendation, and Operating System boundaries. |
| [Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md) | **Journey overview**; phases 2–13 | Expresses the current Foundation journey from pre-registration Discovery through authenticated conversion, Guided Activation, Blueprint, and Recommendations. |
| [Core Platform Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md) | **2. Frozen Scope**; **3. Frozen Architectural Decisions**; **5. Architecture Guarantees**; **7. Change Control** | Freezes the earlier Core source set, journey/pipeline meaning, and mandatory guarantees. |
| [Milestone Lifecycle](./MILESTONE-LIFECYCLE.md) | **Phase 8 — Freeze Alignment Patch, if required**; **5. ADR Usage**; **7. Patch Policy**; **8. Major vs Minor Changes** | Prohibits a documentation Patch from adding concepts, changing lifecycle meaning, superseding ADRs, or changing guarantees. |

### 2.2 What changed after the frozen Core source set

The approved Sessions 1–4 direction and ADR-042 add or materially place:

- useful Business Discovery and Business Report Preview before registration;
- a temporary anonymous Discovery Session with no tenant or Business authority;
- Candidate Business Understanding before canonical Business DNA;
- Understanding Reflection before conversion;
- authenticated conversion into exactly one Business context;
- first governed Business DNA v1 publication at conversion;
- Business Architect continuation as Guided Activation;
- method-independent Discovery with Guided Business Conversation as Experience v1 only;
- conceptual separation of Understanding, Insight, Recommendation, and Projection;
- Product Ethics and capability-first advice, including a valid no-product outcome; and
- Decision Lineage as distinct from customer-facing Explainability.

These statements are explicit in ADR-042 sections 1–10, Foundation Baseline sections 7–16, and
[Session Decision Register](./SESSION-DECISION-REGISTER.md) decisions S01-D01 through S04-D05.

### 2.3 Why the collision is material

The frozen [Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md), **Workspace Lifecycle**,
places Sign Up/Login, Workspace creation, and Business identity before Business Architect. The frozen
[Core Proposal](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md),
**Navigation Architecture / Canonical user movement**, similarly places Authentication, Workspace,
and Business before the Business Architect Pipeline. ADR-016, **Decision**, places reviewed Business
DNA publication at the culmination of the selected-Business pipeline.

ADR-042, **8. Authenticated conversion and Business DNA v1**, instead places meaningful Discovery,
Reflection, and Preview before authentication and places first governed Business DNA v1 publication
at authenticated conversion before Guided Activation. The approved direction is therefore not merely
a documentation alignment. It changes primary movement and the entry/publication relationship of a
frozen pipeline.

Under Milestone Lifecycle **Phase 8** and **7.2 Forbidden Patch content**, those changes cannot be
applied through a documentation-only Freeze Alignment Patch.

### 2.4 What did not change

ADR-042 **Context**, **11. Ownership and boundaries**, **Consequences**, and **Compatibility**
explicitly preserve:

- Workspace as the tenant boundary;
- Business as the owner of Business DNA;
- Business DNA as canonical, Business-scoped, versioned, and software-independent;
- the authenticated selected-Business Business Architect Pipeline;
- Recommendation Engine ownership and human authority;
- Core Platform and independent Operating System ownership;
- incremental compatibility rather than immediate replacement of existing Login/Register paths.

The unchanged Core Freeze sections 5.4 and 5.9, ADR-019, ADR-020, ADR-024, PD-016, and S02-D06
separately preserve Product Hub as a composition/handoff boundary, Operating System independence,
and the separation of Guided Activation from OS-Specific Setup.

No evidence authorizes a rewrite, an anonymous Workspace or Business, a new physical Business Insight
service, Core-owned OS operational data, or implementation of a backend mechanism.

## 3. Authority Relationship

### 3.1 Applied authority rule

Repository [AGENTS.md](../../AGENTS.md), **1. Authority Order**, places Architecture Freezes before
Governance, Accepted ADRs, Genesis, and milestone documentation. It also requires work to stop at a
conflicting boundary and route architectural change through Governance. Later dates or narrower scope
do not create automatic supersession.

The proposed disposition therefore records successor relationships; it does not choose silent
precedence.

### 3.2 Authority matrix

| Artifact | Authority | Current status | Relationship | Action required |
|---|---|---|---|---|
| [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md) | Controlling frozen Core baseline | Frozen; documentation baseline v1.0.1 | Earlier authority whose guarantees remain active until an approved successor | Preserve unchanged; issue updated/successor Freeze only after ADR disposition, review, and approval. |
| [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md) | Controlling frozen Business Brain baseline | Frozen | Sole Business Brain Decision owner is compatible; named Insight/lineage responsibilities are later material extensions | Preserve unchanged; perform separate Business Brain impact approval and successor action. |
| [ADR-042](./ADR/ADR-042-pre-registration-business-discovery.md) | Accepted architecture decision | Accepted | Later source for Pre-Registration Discovery and related boundaries; does not explicitly supersede ADR-015/016 or a Freeze | Retain unchanged; record explicit ADR and Freeze relationship through Governance. |
| [ADR-015](./ADR/ADR-015-infer-before-asking-conversational-configuration.md) | Accepted architecture decision | Accepted | Infer-first remains compatible; universal conversational wording is narrowed by method-independent Discovery | Preserve history; require explicit relationship disposition. |
| [ADR-016](./ADR/ADR-016-business-architect-governed-pipeline.md) | Accepted architecture decision | Accepted | Selected-Business pipeline remains; entry and first-publication placement are changed/extended | Preserve history; require explicit relationship disposition. |
| [Foundation Baseline v0.1](./FOUNDATION-BASELINE-v0.1.md) | Approved Governance snapshot subordinate to Freezes and Accepted ADRs | Active approved architecture snapshot | Consolidates Sessions 1–4; expressly non-superseding | Preserve; use as approved target evidence, not as the mechanism that edits the Freeze. |
| [Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md) | Current Foundation customer-journey source | Foundation v1.2 | Expresses later approved product journey; current path postdates the Core Freeze | Preserve; include through a versioned Genesis successor/addendum and exact source manifest. |
| [Product Decisions](./PRODUCT-DECISIONS.md) | Confirmed product-level direction | PD-011–PD-019 Confirmed | Defines product intent and amendments; cannot replace architecture authority | Preserve unchanged; cite as product rationale. |
| [Session Decision Register](./SESSION-DECISION-REGISTER.md) | Provenance register for approved Sessions 1–4 | Active; Sessions 1–4 Approved and Locked | Records source decisions; does not compete with Product Decisions or Accepted ADRs | Preserve unchanged; cite provenance only. |
| [Product Constitution v1.1](../01-genesis/02-CONSTITUTION.md) | Durable product doctrine and laws | Active foundation | Product Ethics, value-before-registration, and method-independent Discovery extend/amend historical v1.0 language | Preserve amendment history; include exact version through Genesis successor treatment. |
| [Genesis Workspace Lifecycle v1.0](../01-genesis/12-WORKSPACE-LIFECYCLE.md) | Genesis source incorporated by Core Freeze | Frozen-source relationship; current file remains account-first | Conflicts with later journey order | Preserve unchanged; explicitly classify its relationship in a versioned Genesis successor/addendum. |
| [Foundation Audit v0.1](../08-implementation-audit/FOUNDATION-AUDIT-v0.1.md) | Factual audit evidence | Final audit evidence | Identifies collision; makes no decision | Preserve; no authority promotion. |
| [Foundation Authority Crosswalk v0.1](./FOUNDATION-AUTHORITY-CROSSWALK-v0.1.md) | Proposed authority analysis | Proposed | Maps but does not resolve conflicts | Preserve Proposed status; use as evidence only. |
| [Core/Foundation Impact Review v0.1](../02-core-platform/13-CORE-FOUNDATION-ARCHITECTURE-IMPACT-REVIEW-v0.1.md) | Proposed independent architecture assessment | Proposed | Classifies compatibility and material change | Approve or replace through Architecture Governance before successor work. |
| This disposition | Proposed Governance bridge | Proposed | Specifies the minimum controlled resolution path | Obtain explicit approval; it does not itself supersede any source. |

### 3.3 Proposed successor relationship

If approved, Governance should record the relationship as follows:

~~~text
Core Platform Architecture v1.0 Freeze
  remains immutable historical authority
        ↓
ADR-042 and explicit ADR-015/016 relationship disposition
        ↓
bounded Core successor architecture + Architecture Review
        ↓
updated or successor Core Platform Freeze
        ↓
versioned Genesis successor/addendum + exact source manifest
        ↓
Readiness Validation
        ↓
UX reconciliation and future Feature specification eligibility
~~~

The successor Freeze must state exactly which earlier statements are replaced and must carry forward
every unchanged guarantee. It must not edit the original Freeze to imply that the later journey was
frozen on 2026-07-12.

## 4. Frozen Guarantees

### 4.1 Disposition rule

All guarantees below remain frozen. The proposed Foundation successor treatment changes only the
bounded journey, pipeline-entry, publication-placement, and later conceptual extension statements
identified in section 6. No ownership guarantee is transferred.

### 4.2 Workspace and organization hierarchy

The following [Core Freeze section 5.1](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
guarantees remain unchanged:

1. Workspace remains the customer and tenant boundary.
2. The canonical hierarchy remains Workspace → Business → Business Unit → Department and Branch.
3. Business and Business Unit remain distinct concepts.
4. Core Organization Registry remains the owner of canonical Business Unit, Department, and Branch
   identities and parent relationships.
5. Operating Systems remain owners of operational data and behavior scoped to canonical organization
   identifiers.

### 4.3 Domain and data ownership

The following Core Freeze section 5.2 guarantees remain unchanged:

1. Every canonical concept has one accountable owner and source of truth.
2. Only the owning domain writes its canonical aggregate or validates a requested change through its
   contract.
3. Read models, Product Hub Projection, Workspace Intelligence Aggregation, search indexes, analytics
   views, caches, dashboards, and AI context are not sources of truth.
4. No Operating System reads or writes another Operating System database.
5. Cross-domain references use stable identifiers and governed contracts rather than duplicated
   ownership.

### 4.4 Business DNA, Knowledge, Rules, intelligence, and Recommendations

The following Core Freeze section 5.3 guarantees remain unchanged:

1. Each Business owns exactly one Business DNA identity.
2. Business DNA remains Business-scoped and describes the Business, never software selection or
   configuration.
3. Workspace intelligence remains an explicit aggregation.
4. Knowledge remains shared, governed, versioned, and immutable after publication.
5. Knowledge Packs remain additive and published versions remain immutable.
6. Rules remain deterministic, versioned, explainable, and separate from AI.
7. Recommendations remain Capability-first, evidence-based, confidence-aware, explainable, and
   subject to human authority.
8. Configuration crossing ownership boundaries remains a proposal that the owning target validates
   and applies.

ADR-042 adds Product Ethics and lineage obligations; it does not transfer Recommendation ownership or
turn Candidate Business Understanding, Business Blueprint, or Product Hub into a Recommendation
source of truth.

### 4.5 Product Hub and lifecycle

The following Core Freeze section 5.4 guarantees remain unchanged:

1. Product Hub remains a Core Platform component responsible for discovery, lifecycle composition,
   handoff, launch, and recovery navigation.
2. Product Hub does not own product source records, subscription source records, Marketplace Assets,
   Business DNA, or OS setup and operational data.
3. Availability, Recommendation, entitlement, subscription, installation, setup, configuration,
   activation, readiness, operation, pause, archive, and removal remain distinct where approved.
4. Core Workspace Ready and Operating System Ready remain separate readiness outcomes.

### 4.6 Marketplace

All Core Freeze section 5.5 guarantees remain unchanged:

1. Marketplace remains a bounded context within the Core Platform offering.
2. Marketplace remains distinct from Product Hub composition and OS operational ownership.
3. Marketplace Assets remain shared and published Marketplace Asset Versions remain immutable.
4. Acquisition, installation, configuration, activation, entitlement, and Business Assignment
   remain separate and scoped.
5. Marketplace installation never bypasses target-owner validation, Compatibility Rules,
   Permission, or approved human-control policy.

### 4.7 AI Coordinator

All Core Freeze section 5.6 guarantees remain unchanged:

1. AI remains downstream of approved Business DNA, Knowledge, Rules, Permission, evidence, and
   owner-controlled data.
2. AI Coordinator retains explicit context-building, policy-filtering, routing, orchestration,
   validation, explanation, Action Proposal, and governed-feedback responsibilities.
3. AI Experts use narrow, authorized contracts and never receive unrestricted service or database
   access.
4. AI does not own or directly modify Business DNA, Knowledge, Rules, Marketplace state, or OS
   operational state.
5. Consequential actions remain proposals until the owning domain validates them and approved
   human-control policy is satisfied.

### 4.8 APIs, Events, and integration

All Core Freeze section 5.7 guarantees remain unchanged:

1. APIs remain Contract First, API First, technology-independent, explicitly scoped, versioned,
   observable, and backward-compatible.
2. The API Gateway enforces the boundary but never replaces owning-domain Authorization or
   invariants.
3. The domain that changes canonical state owns the resulting Domain Event.
4. Integration Events expose governed facts without transferring ownership.
5. Events do not disguise commands, Recommendations, Configuration Proposals, or Action Proposals.
6. No global Event ordering is assumed; idempotency, replay, security, and compatibility remain
   explicit.
7. Cross-OS integration remains optional, authorized, versioned, observable, and failure-isolated.

This disposition approves no API, Event, persistence, or backend contract.

### 4.9 Security, Audit, and observability

All Core Freeze section 5.8 guarantees remain unchanged:

1. Authentication never implies Authorization.
2. Every protected action uses explicit Workspace and applicable Business, Business Unit,
   Department, Branch, Operating System, and resource context.
3. Tenant isolation, least privilege, safe delegation, data minimization, and defense in depth remain
   mandatory.
4. Consequential activity remains auditable and Audit history remains append-only.
5. Logs, metrics, traces, health, Events, APIs, AI, Marketplace, and Audit remain correlatable without
   making observability a business-data owner.
6. Security, recovery, and failover never bypass canonical ownership or tenant boundaries.

An anonymous Discovery Session has no tenant authority. Its later mechanism must meet these
guarantees without creating an anonymous Workspace or Business.

### 4.10 Deployment and evolution

All Core Freeze section 5.9 guarantees remain unchanged:

1. Core Platform begins as an enforced modular monolith.
2. Co-deployment never collapses logical module boundaries or data ownership.
3. Each Operating System remains independently usable and owns its domain, setup, navigation,
   Permissions, configuration, and operational lifecycle.
4. Deployment topology never becomes the definition of canonical architecture.
5. Physical service extraction remains optional, evidence-driven, contract-preserving, and approved
   through ADR.
6. Published immutable assets are never updated in place.
7. Compatible additive evolution is preferred; breaking change requires a governed version and
   migration path.

### 4.11 Business Brain guarantees

The following guarantees from the
[Business Brain Freeze](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md),
**8. Accepted Architecture**, **9. Accepted Principles**, **10. Accepted Ownership Rules**, and
**11. Accepted Domain Boundaries**, remain unchanged:

- Business Brain Decision remains the sole canonical Business Brain entity, aggregate root, and
  write model approved in v1.0.
- Decision Orchestrator alone completes that Decision.
- Completed Decisions remain immutable, deterministic at the governed level, reproducible from
  pinned inputs, explainable, auditable, and additive across reanalysis.
- Recommendation candidate remains Decision-owned candidate content and is not a Recommendation.
- Recommendation Engine remains the owner of Recommendation creation, prioritization, explanation,
  lifecycle, and disposition.
- Configuration input remains non-executing input and is not a Configuration Proposal.
- Business Brain consumes but never owns Business DNA, Knowledge, Rules, Capabilities, owner facts,
  OS state, Marketplace state, Recommendation lifecycle, or Product Hub journeys.
- Projections never gain ownership.
- AI remains downstream and never owns Decision content.
- Logical boundaries do not imply physical services.

The conceptual Business Insight Engine may be reconciled only inside this sole Decision boundary
unless a future approved RFC/ADR explicitly authorizes physical extraction.

## 5. Foundation Extensions

| Extension | Approved source and exact heading | Compatibility disposition | Boundary preserved |
|---|---|---|---|
| Pre-Registration Business Discovery | ADR-042 **Decision**; Foundation **8. Approved capabilities** | Material compatible extension to Core responsibilities, but its placement creates the section 6 journey conflict | Core-owned lifecycle; no anonymous Workspace, Business, membership, or entitlement |
| Candidate Business Understanding | ADR-042 **3. Candidate Business Understanding**; Foundation **13.2 Understanding lifecycle** | Material compatible extension | Temporary, non-canonical, cannot authorize or configure an OS |
| Understanding Reflection | ADR-042 **4. Understanding Reflection**; Foundation **13.2 Understanding lifecycle** | Material compatible extension | Review/correction of candidate knowledge; no canonical write by presentation |
| Business Report Preview | ADR-042 **7. Business Report Preview**; Foundation **10. Approved projections** | Compatible projection extension whose pre-registration placement participates in the journey change | Temporary projection; not Business DNA, Blueprint, Recommendation aggregate, or entitlement |
| Guided Activation | ADR-042 **9. Guided Activation**; S02-D05/S02-D06 | Compatible name for post-conversion continuation, with material pipeline-entry/publication implications | Core-owned understanding work; does not replace OS-Specific Setup |
| Product Ethics Law | ADR-042 **6. Product ethics**; Constitution **Law 1 — Product Ethics**; S03-D04/S03-D05 | Material policy extension | Recommendation owner and human authority unchanged; no product is a valid outcome |
| Business Insight concept | ADR-042 **5. Knowledge-to-advice pipeline**; S03-D01/S03-D03 | Material conceptual extension | Remains within the frozen Business Brain Decision boundary; physical extraction deferred |
| Decision Lineage | ADR-042 **10. Decision lineage foundation**; S04-D01–S04-D03 | Material traceability extension | Separate from Explainability; no schema or trace UI approved here |
| Governed Business Blueprint projection | Foundation **10. Approved projections**; S02-D05 | Compatible clarification | Governed authenticated customer-facing projection; Business DNA and governed owner outputs remain sources |

These extensions are not a rewrite. They retain original owners and add bounded responsibilities or
policies. Their inclusion in frozen architecture nevertheless requires the change control shown in
sections 6 and 9.

## 6. Explicit Replacement Matrix and Minimum Alignment Package

### 6.1 Documentation-only alignment eligible for a future Patch

Only the following corrections are potentially eligible for a Freeze Alignment Patch after the
material successor direction is approved and the accepted meaning is unambiguous:

| Eligible correction | Existing accepted meaning restored | Architecture effect |
|---|---|---|
| Label Business Blueprint consistently as a governed authenticated customer-facing projection | Core projection-is-not-ownership guarantees; Foundation **10. Approved projections** | None; no Blueprint aggregate or write owner created |
| Add cross-references from stale subordinate documents to the approved successor journey | Approved successor authority after it exists | None; references only |
| Mark old source versions as historical without deleting or rewriting them | Governance historical-preservation rules | None; provenance only |
| Repair links, indexes, status metadata, and exact source-version manifests | Milestone Lifecycle **7.1 Permitted Patch content** | None |
| Record Patch Authority and compatibility metadata | Milestone Lifecycle **7.3 Patch authority** | None |

This is the **minimum documentation alignment patch**. It cannot substitute for the material
successor package below.

### 6.2 Material replacement and extension matrix

The “new statement” column is the disposition proposed for future approval, not a statement that the
old authority has already been superseded.

| ID | Old statement | New statement proposed for successor | Reason | Authority required | Migration required? |
|---|---|---|---|---|---|
| GD-01 | Workspace Lifecycle **Workspace Lifecycle**: Visitor → Sign Up/Login → Workspace → Business Identity → Business Architect | Meaningful Business Discovery, Mapping, Reflection, and Report Preview occur before Create Workspace Intent and authentication; canonical publication still waits for an authenticated Business | Value before registration demonstrates useful understanding without weakening tenancy | ADR-042 **Decision** and **8**; Customer Journey **Journey overview**; Foundation **12** | Governance/documentation successor required; later UX and implementation migration require separate approved specs |
| GD-02 | Core Proposal **Navigation Architecture / Canonical user movement**: Public → Authentication → Workspace → Business → Business Architect Pipeline | Public entry may enter temporary Core-owned Discovery before authentication; authentication/Workspace/Business remain mandatory before canonical conversion | Adds a pre-pipeline lifecycle without anonymous tenant state | ADR-042 sections 2, 3, and 8; approved Core successor | Architecture successor and readiness required; routes are not authorized here |
| GD-03 | ADR-015 **Decision** and old Constitution Principle 11 make conversation the durable configuration/discovery experience | Business Discovery is method-independent; Guided Business Conversation is Discovery Experience v1 selected by Discovery Strategy | One acquisition method cannot define the Core capability | Explicit ADR-015/ADR-042 relationship; Constitution v1.1 amendment crosswalk | Governance relationship and documentation migration; no acquisition integration authorized |
| GD-04 | ADR-016 **Decision** and Core pipeline sources begin with one authenticated selected Business | Pre-Registration Discovery is a distinct temporary pre-pipeline Core lifecycle that hands approved candidate knowledge into the retained selected-Business pipeline | Preserves ADR-016 ownership while adding candidate acquisition before authenticated entry | Explicit ADR-016/ADR-042 relationship and approved Core successor | Architecture and later compatibility specification required |
| GD-05 | ADR-016 and Core Proposal **5.1 Business Architect Pipeline** culminate in first reviewed Business DNA publication | Authenticated conversion publishes first approved Business DNA v1; Guided Activation may publish governed revisions | Removes ambiguity over first publication while retaining Business-scoped explicit approval | ADR-042 **8** and **9**; explicit ADR-016 relationship; approved Core successor | Architecture successor, readiness, and later migration/compatibility plan required |
| GD-06 | Older UX labels use “canonical Business Blueprint” or imply a main canonical output | Business Blueprint is a governed authenticated customer-facing projection of Business DNA and governed owner outputs | Prevents projection from being mistaken for canonical storage | Existing projection guarantees; Foundation **10**; S02-D05 | Documentation-only correction after authority alignment; no data migration implied |
| GD-07 | Frozen Business Brain uses Business Analysis and Decision-owned insight content without a separately named Business Insight Engine | Business Insight Engine is an approved conceptual responsibility inside the sole frozen Business Brain Decision boundary | Makes knowledge-type responsibility explicit without physical extraction | ADR-042 **5**; Business Brain Architecture Review and successor action | Architecture documentation successor; no service, package, or schema migration authorized |
| GD-08 | Frozen traceability/explainability requirements do not contain the full minimum Decision Lineage baseline | Decision Lineage records derivation and reverse impact; Explainability separately presents understandable reasoning | Preserves evidence for derived advice from MVP | ADR-042 **10**; Business Brain/Core successor action | Architecture documentation then later mechanism specification; full trace UI remains deferred |
| GD-09 | Capability-first Recommendation guidance does not explicitly require no-product/current-tool outcomes and commercial-neutral ranking | Product Ethics permits no product, current tools, or non-product improvement and requires disclosed NexoraXS options | Advice credibility must not depend on a sale | ADR-042 **6**; Constitution Law 1; S03-D04/S03-D05 | Policy/documentation successor and later testable UX specification; no commercial implementation authorized |

### 6.3 Disposition of the central conflict

The conflict is proposed to be resolved by **bounded successor treatment**, not precedence by date:

- the old Core Freeze and its source versions remain immutable historical authority;
- the successor carries forward every guarantee in section 4;
- the successor explicitly replaces only GD-01 through GD-05 and incorporates GD-07 through GD-09
  as reviewed extensions;
- GD-06 may be applied as a compatible terminology/projection correction;
- the explicit ADR relationship records which portions of ADR-015 and ADR-016 remain Accepted and
  which later ADR controls the newly approved subject; and
- readiness validation proves that no owner, tenant, security, contract, or OS boundary was weakened.

Until that sequence is approved, both controlling statements remain visible and journey execution at
the conflict boundary remains blocked.

## 7. Non-Replaced Statements

The successor package must explicitly state that the following are not replaced:

1. Workspace is the customer and tenant boundary.
2. Business is distinct from Workspace and Business Unit and owns one Business DNA identity.
3. No anonymous Workspace, Business, membership, entitlement, subscription, or Operating System
   state is created.
4. Candidate Business Understanding is temporary, pre-canonical, provenance-aware, confidence-aware,
   reviewable, and unable to authorize actions or configure an Operating System.
5. Business DNA remains Business-scoped, canonical, versioned, software-independent, explicitly
   approved, and published only in authenticated Business context.
6. Business Architect remains a governed selected-Business pipeline; Guided Activation names its
   post-conversion continuation and does not erase that pipeline.
7. Business Blueprint remains a governed authenticated customer-facing projection, never the
   canonical data store.
8. Recommendation Engine owns Recommendation lifecycle and disposition; Business Brain owns only
   Decision and candidate content within its frozen boundary.
9. Product Hub composes owner projections and performs discovery, handoff, and navigation; it owns no
   Business DNA, Recommendation, subscription, Marketplace, setup, or OS operational source state.
10. Core Platform owns no Operating System operational facts, setup behavior, commands, or readiness.
11. Guided Activation and OS-Specific Setup remain separate.
12. Core Workspace Ready and Operating System Ready remain separate outcomes.
13. Every Operating System remains independently usable and owns its operational domain.
14. Marketplace ownership, acquisition, publication, installation, and activation boundaries remain
    unchanged.
15. AI remains downstream, non-owning, and unable to execute consequential changes silently.
16. Contract-first APIs, owner-authored Events, tenant isolation, least privilege, append-only Audit,
    and observability guarantees remain unchanged.
17. Core remains an enforced modular monolith unless a later evidence-driven ADR authorizes physical
    extraction.
18. Existing Login and Register routes may remain during an approved incremental transition; no
    immediate rewrite is authorized.

## 8. Documentation Impact

### 8.1 Impact matrix

| Document | Current relationship | Status for this disposition | Required future action |
|---|---|---|---|
| Core Platform Freeze v1.0 | Controlling frozen baseline | No Change | Preserve; replace only through an approved successor Freeze. |
| Business Brain Freeze v1.0 | Controlling frozen Decision boundary | No Change pending successor | Preserve; separately review conceptual Insight and Lineage extensions. |
| ADR-042 | Accepted later direction | No Change | Retain; add explicit relationship through Governance, not by editing ADR history. |
| ADR-015 and ADR-016 | Accepted earlier decisions | No Change pending relationship decision | Preserve; use a new decision artifact if material partial supersession must be recorded. |
| Foundation Baseline v0.1 | Approved non-superseding snapshot | No Change | Retain as target evidence. |
| Foundation Audit v0.1 | Factual audit | No Change | Retain as evidence. |
| Foundation Authority Crosswalk v0.1 | Proposed analysis | No Change | Retain Proposed; it does not approve precedence. |
| Core/Foundation Impact Review v0.1 | Proposed architecture assessment | Approval required | Approve or replace before successor drafting. |
| Customer Journey v1.2 | Current Foundation journey | Future versioned incorporation | Preserve current file; include through a Genesis successor/addendum and exact manifest. |
| Workspace Lifecycle v1.0 | Earlier account-first frozen source | Historical after successor approval only | Do not relabel or edit before successor disposition; preserve for provenance. |
| Product Constitution v1.1 | Active durable doctrine | Future exact-version incorporation | Preserve amendment crosswalk; include through Genesis successor treatment. |
| Core Proposal, Architecture, and Data Ownership | Frozen Core sources | Needs successor update after approval | Do not edit now; produce bounded versioned successor documents. |
| Core UX documents | Subordinate target UX based on older sequence | Blocked for canonical-flow execution | Reconcile only after successor/readiness; current-state inventories may remain factual. |
| Frontend backlog and future feature specs | Delivery guidance | Blocked at affected journey boundary | Rebuild only after architecture authority and readiness; do not start Feature 056 now. |
| Backend and contract documents | No approved Foundation mechanisms | Blocked | Await approved architecture, security/retention policy, and feature specifications. |

### 8.2 Repository-wide account/workspace-first journey inventory

A repository-wide Markdown search checked ordered occurrences of public/Landing entry,
registration/authentication, Workspace, and Business Architect, followed by manual review of each
candidate. The following documents still describe or depend on the older account/Workspace-first
progression without an in-file historical notice for that sequence. They are listed only; none is
modified by this disposition.

| Document | Exact heading or location | Remaining statement | Current treatment |
|---|---|---|---|
| [Workspace Lifecycle v1.0](../01-genesis/12-WORKSPACE-LIFECYCLE.md) | **Workspace Lifecycle**; **Stage 1**; **Stage 2** | Visitor → Sign Up/Login → Workspace → Business Identity → Business Architect | Frozen-source conflict; preserve until Genesis/Core successor treatment. |
| [Core Platform Architecture Proposal](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md) | **Navigation Architecture / Canonical user movement** | Public → Authentication → Workspace → Business → Business Architect Pipeline | Frozen Core source; preserve and supersede only through approved Core successor. |
| [Core Platform Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md) | **8. Navigation Architecture / 8.1 Surface ownership** | Public is Discovery/authentication entry; authenticated Core onboarding contains Workspace, Business, and Business Architect | Frozen Core source; preserve and reconcile only through approved Core successor. |
| [Platform Experience](../03-ui-ux/01-PLATFORM-EXPERIENCE.md) | **2. Canonical journey**; **3.1 Business Architect** | Landing → Register → Verify → Workspace → Business Architect; Business Architect called primary onboarding | Conflicting subordinate UX; reconciliation blocked. |
| [Screen Map](../03-ui-ux/02-SCREEN-MAP.md) | **4. Target journey flow**; **10. Navigation and ownership rules** | Landing/Register/Verify/Workspace precede Business Architect | Partially aligned inventory; target-flow reconciliation blocked. |
| [Frontend Experience Gap Analysis](../03-ui-ux/03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md) | **4. Canonical journey gap matrix** | Workspace creation is expected to end at Business Architect entry; pre-registration Discovery/conversion absent | Current implementation evidence may remain; proposed target slice is blocked. |
| [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md) | **5. Platform Structure**; **6. Major Area Navigation Contracts** | Landing → Authentication → Workspace/Business → Business Architect | Ownership content is useful; canonical navigation order requires reconciliation. |
| [User Journeys](../03-ui-ux/05-USER-JOURNEYS.md) | **4. New User Journey** | Registration and Workspace creation precede Business Architect interview | Subordinate target journey; reconciliation blocked. |
| [User Flows](../03-ui-ux/06-USER-FLOWS.md) | **4. Flow F-01 — Registration, Verification, and Workspace Creation** | Landing → Register → Verify → Workspace → Business Architect Introduction | Subordinate target flow; reconciliation blocked. |
| [State Machines](../03-ui-ux/07-STATE-MACHINES.md) | **5. Workspace Creation Presentation State Machine**; **6. Business Interview Presentation State Machine** | Created Workspace transitions into Business Architect flow | Presentation inventory is usable; cross-machine canonical order is blocked. |
| [Screen Status Matrix](../03-ui-ux/12-SCREEN-STATUS-MATRIX.md) | **5. Documented Screens Not Yet Implemented**; **6. Cross-Screen Findings** | Business Architect routes are planned under authenticated onboarding without pre-registration Foundation stages | Factual missing-screen status is usable; proposed route/order is blocked. |
| [UX Gaps](../03-ui-ux/13-UX-GAPS.md) | **UXG-001** through **UXG-004** | Recommends Workspace → Business Architect → Blueprint/Recommendations and BA immediately after Workspace | Historical target recommendation after Foundation; do not execute. |
| [Frontend Backlog](../03-ui-ux/14-FRONTEND-BACKLOG.md) | **FE-003** through **FE-006** | Localized Landing/Register then Workspace and Business Architect slices | Execution order is blocked and must be rebuilt after readiness. |

Two additional account-first sources do not use the exact Business Architect chain but remain relevant:

| Document | Exact heading | Relationship |
|---|---|---|
| [Duplicate Customer Journey v1.0](../genesis/11-CUSTOMER-JOURNEY.md) | **Journey Stages**, stages 2–5 | Account → Workspace → conversational Business Understanding → Business DNA. Unclear-status duplicate outside canonical Genesis tree; preserve as historical evidence. |
| [Platform Master Architecture](../NexoraXS_Platform_Documentation_v5_3_Final_Master_Architecture.md) | **11A. MVP Business Onboarding Journey / Final MVP onboarding flow** | Sign Up/Login → Workspace → Business → Product Hub/Commerce; omits Foundation Discovery and Business Architect. Historical planning evidence, not current authority. |
| [Feature 049 specification](../../specs/049-onboarding-architecture-v2/spec.md) | **User Story 1**; **Functional Requirements**, FR-001; **Migration Strategy** | Register/Login → Workspace → Business → Product Hub; explicitly retains registration/login as entry and omits Foundation Discovery/Business Architect. Historical feature specification, not current Foundation authority. |

The [Foundation Audit](../08-implementation-audit/FOUNDATION-AUDIT-v0.1.md), **6. Document inventory**,
also records historical Feature specifications and audit roadmaps that preserve earlier onboarding
assumptions. Those records and specifications are evidence, not additional canonical journey
authorities.

### 8.3 Historical preservation rule

No document in section 8.2 may be silently rewritten to make the later journey appear original. The
approved follow-up must either:

- publish a versioned successor and retain the earlier file;
- add a bounded historical/supersession notice after the successor is approved; or
- preserve the historical claim and add an explicit current canonical-path reference.

## 9. Required Follow-up Work

### 9.1 Governance

1. Review and explicitly approve, reject, or amend this disposition.
2. Decide the exact ADR-015/ADR-016/ADR-042 relationship.
3. If a new ADR is required, create it with a new unused identifier through the ADR lifecycle; do
   not edit Accepted history.
4. Decide whether the Core successor is a backward-compatible MINOR architecture version or an
   incompatible MAJOR version under Milestone Lifecycle sections 8.1 and 8.2.
5. Record exact source versions and immutable provenance in the successor Freeze.
6. Preserve Sessions 1–4 and Product Decision identifiers unchanged.

### 9.2 Architecture

1. Produce bounded successor Core architecture documents covering only:
   - the pre-pipeline Discovery boundary;
   - anonymous candidate-to-authenticated-pipeline handoff;
   - first Business DNA publication placement;
   - retained Business Architect/Guided Activation pipeline;
   - journey/navigation relationship; and
   - carried-forward guarantees.
2. Perform independent Architecture Review.
3. Issue an updated or successor Core Platform Freeze after explicit approval.
4. Review Business Insight and Decision Lineage against the Business Brain Freeze.
5. Issue the required Business Brain successor action without physical extraction.
6. Publish the required Genesis successor/addendum and exact version manifest.

### 9.3 UI/UX

Allowed before successor approval:

- factual current-screen, route, and implementation inventory;
- terminology analysis that labels Business Discovery method-independently;
- candidate/canonical and projection/ownership distinctions;
- Product Ethics, customer agency, and no-product outcome requirements at a conceptual level;
- Core/OS ownership, Product Hub handoff, and separate readiness guardrails; and
- accessibility, Arabic/English, RTL/LTR, and generic state-quality requirements that do not choose
  the disputed flow.

Blocked until successor approval and readiness:

- canonical new-customer route/screen order;
- exact Discovery Session, resume, recovery, conversion, and handoff flows;
- exact Business Architect and Guided Activation state machines;
- exact publication/approval interaction;
- Decision Traceability UI; and
- an execution-ready replacement for the stale UX backlog.

### 9.4 Frontend

No frontend change is authorized by this document. After architecture readiness, a separately
approved feature specification must define an incremental compatibility path that preserves existing
Login/Register behavior until replacement evidence permits retirement. Browser state must remain
non-canonical.

### 9.5 Backend

Backend work remains blocked. Later approved specifications must separately govern:

- temporary-session persistence and retention;
- token, anti-abuse, privacy, recovery, and deletion behavior;
- authenticated idempotent conversion;
- Business DNA revision/publication behavior;
- Decision Lineage persistence and invalidation; and
- observability, Audit, and failure recovery.

This list is an obligation inventory, not a contract or schema.

### 9.6 Feature specifications

1. Do not start Feature 056 from the historical architecture-audit roadmap.
2. Do not create a Foundation implementation specification before successor Freezes and readiness
   validation are approved.
3. When eligible, create a new Spec Kit feature through the repository sequence and include all
   controlling Freeze, ADR, compatibility, ownership, tenancy, localization, accessibility,
   security, Audit, and test evidence.
4. Separate frontend discovery/experience slices from later backend production mechanisms where the
   approved architecture permits, without promoting frontend fixtures to canonical contracts.

### 9.7 Testing and validation

Readiness and later feature plans must require evidence for:

- unchanged Workspace/Business/Business Unit boundaries;
- no anonymous tenant or Business state;
- candidate versus canonical information;
- explicit approval before Business DNA publication;
- safe retry and no duplicate conversion outcome;
- Core/OS ownership and separate readiness;
- Product Hub projection/handoff only;
- Recommendation ethics, lineage, and explainability separation;
- tenant isolation, authorization, privacy, Audit, and observability;
- English/LTR and Arabic/RTL; and
- accessibility and recovery for each approved critical flow.

No test implementation is authorized by this disposition.

## 10. Exit Criteria

This Governance milestone is complete only when all applicable criteria below are objectively met:

1. This disposition or an approved equivalent has an explicit approval record.
2. Every GD identifier has an approved disposition and no material item is mislabeled as a Patch.
3. The ADR-015/ADR-016/ADR-042 relationship is explicit and Accepted ADR history remains unchanged.
4. The successor architecture version is selected through Architecture Review, not inferred here.
5. The Core successor documentation identifies exact replacements and carries forward every
   guarantee in section 4.
6. The Core Architecture Review is approved.
7. The updated or successor Core Platform Freeze is issued with an exact source-version manifest.
8. Business Insight and Decision Lineage receive approved Business Brain successor treatment, while
   the sole Business Brain Decision owner and physical boundary remain intact.
9. The Genesis successor/addendum preserves Customer Journey v1.0, Workspace Lifecycle v1.0,
   Customer Journey v1.2, and Constitution amendment provenance.
10. Any documentation-only Patch contains only section 6.1 content and records Patch Authority.
11. Readiness validation confirms terminology, ownership, tenancy, contracts, security, lifecycle
    separation, source provenance, and cross-document consistency.
12. Every remaining stale journey document in section 8.2 has an approved reconciliation action;
    none has been silently rewritten.
13. Session 5 remains not started until separately approved.
14. Feature 056 remains not started and no implementation file has been created.
15. Only after criteria 1–14 pass may canonical UX reconciliation and future implementation
    specification work proceed at the affected boundary.

### 10.1 Stage 1 remediation evidence

The following Proposed artifacts implement the reviewable evidence required by this disposition
without making the successor effective:

- [ADR-043](./ADR/ADR-043-foundation-discovery-and-business-architect-composition.md) explicitly
  composes ADR-042 with ADR-015 and ADR-016 and defines direct-registration compatibility;
- [Foundation Successor Authority Interpretation](./FOUNDATION-SUCCESSOR-AUTHORITY-INTERPRETATION-v1.0.md)
  reconciles successor-use authority wording without rewriting historical sources;
- [Genesis Foundation Journey Successor Addendum](../01-genesis/21-FOUNDATION-JOURNEY-SUCCESSOR-ADDENDUM-v1.0.md)
  preserves Workspace-first history and defines the proposed primary and direct-registration paths;
- [Business Brain Foundation Compatibility](../03-business-brain/13-BUSINESS-BRAIN-FOUNDATION-COMPATIBILITY-v1.0.md)
  preserves the sole Decision owner and physical boundary;
- the revised [Successor Architecture](../02-core-platform/14-CORE-FOUNDATION-SUCCESSOR-ARCHITECTURE-v0.1.md)
  carries the direct-registration and Business Architect lifecycle relationships; and
- the [Core Platform v1.1 Source Manifest](./CORE-PLATFORM-v1.1-SOURCE-MANIFEST.md) records exact
  repository provenance where available and conservative treatment where no commit exists.

These inputs remained Proposed at Stage 1. Architecture Review v2 returned APPROVED and Foundation
Governance Approval v2.0 approved the exact reviewed content. This section remains the Stage 1
evidence record and does not itself replace criteria 1–15.

## 11. Non-Supersession Statement

This approved Governance Disposition does not itself supersede, amend, deprecate, or replace any
Architecture Freeze, Accepted ADR, Product Decision, Genesis artifact, Foundation artifact, or
Session decision. Its approved successor treatment becomes controlling only through the Core
Platform v1.1 Freeze.

Until required approvals, successor Freezes, Genesis treatment, and readiness validation are
complete, existing Freezes remain in force and implementation at the conflicting journey and
pipeline boundary remains blocked.

## 12. References

### Governance and Foundation

- [AGENTS.md](../../AGENTS.md)
- [Architectural Milestone Lifecycle](./MILESTONE-LIFECYCLE.md)
- [Product Decision Register](./PRODUCT-DECISIONS.md)
- [Session Decision Register](./SESSION-DECISION-REGISTER.md)
- [Foundation Baseline v0.1](./FOUNDATION-BASELINE-v0.1.md)
- [Foundation Authority Crosswalk v0.1](./FOUNDATION-AUTHORITY-CROSSWALK-v0.1.md)
- [Foundation Audit v0.1](../08-implementation-audit/FOUNDATION-AUDIT-v0.1.md)

### Accepted ADRs

- [ADR-003: Workspace boundary](./ADR/ADR-003-workspace-customer-multi-business-boundary.md)
- [ADR-005: Business DNA](./ADR/ADR-005-business-dna-business-scoped-software-independent.md)
- [ADR-013: Recommendations](./ADR/ADR-013-capability-first-explainable-recommendations.md)
- [ADR-015: Infer before asking](./ADR/ADR-015-infer-before-asking-conversational-configuration.md)
- [ADR-016: Business Architect pipeline](./ADR/ADR-016-business-architect-governed-pipeline.md)
- [ADR-018: Separate readiness](./ADR/ADR-018-separate-core-and-os-readiness.md)
- [ADR-019: Product Hub handoff](./ADR/ADR-019-product-hub-discovery-and-os-handoff.md)
- [ADR-020: Product Hub composition](./ADR/ADR-020-product-hub-composition-not-data-ownership.md)
- [ADR-024: Independent Operating Systems](./ADR/ADR-024-independent-operating-system-domain-ownership.md)
- [ADR-033: Enforced modular monolith](./ADR/ADR-033-enforced-modular-monolith.md)
- [ADR-042: Pre-Registration Business Discovery](./ADR/ADR-042-pre-registration-business-discovery.md)

### Frozen and milestone architecture

- [Core Platform Architecture v1.0 Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Business Brain Architecture v1.0 Freeze](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Core Platform Architecture Proposal](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Core Platform Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)
- [Core Platform Data Ownership](../02-core-platform/04-DATA-OWNERSHIP.md)
- [Core/Foundation Architecture Impact Review v0.1](../02-core-platform/13-CORE-FOUNDATION-ARCHITECTURE-IMPACT-REVIEW-v0.1.md)

### Genesis and experience evidence

- [Product Constitution v1.1](../01-genesis/02-CONSTITUTION.md)
- [Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md)
- [Workspace Lifecycle v1.0](../01-genesis/12-WORKSPACE-LIFECYCLE.md)
- [UI/UX documentation index](../03-ui-ux/README.md)
