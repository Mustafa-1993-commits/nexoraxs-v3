# Foundation Authority Crosswalk v0.1

**Version:** 0.1

**Status:** Proposed — analysis for Governance approval; not an authority-changing artifact

**Owner:** NexoraXS Product Governance

**Prepared:** 2026-07-20; this is the preparation date, not an approval date

**Subject:** Relationship between the frozen v1.x architecture and the approved Foundation
Sessions 1–4 direction

---

## 1. Purpose

This crosswalk describes how the following repository artifacts relate without silently choosing
precedence between conflicting statements:

- the six Architecture v1.0 Freezes and the v1.x Program Completion declaration;
- Accepted ADR-042;
- Foundation Baseline v0.1;
- Product Constitution v1.1;
- the approved and locked Sessions 1–4 decisions;
- Customer Journey v1.2; and
- older Workspace-first and conversation-centric documents incorporated into or adjacent to the
  frozen Core Platform baseline.

The need for this artifact is recorded by [Foundation Audit v0.1](../08-implementation-audit/FOUNDATION-AUDIT-v0.1.md),
`4.2 Authority collision requiring Governance clarification`, finding `FA-001`, and
`15. Recommended reconciliation order` item 1.

This document is a proposed authority analysis. It records compatibility, conflicts, blocked
boundaries, and the repository's required change path. It does not approve that change path or
perform any step in it.

## 2. Scope

### 2.1 Included

This crosswalk covers:

- authority class, scope, and limits of each material artifact;
- chronological evolution where an artifact records a date;
- compatibility of later Foundation direction with frozen guarantees;
- direct and implied conflicts between frozen sources and later approved direction;
- the difference between a compatible extension, a documentation clarification, and a material
  architectural change;
- historical-preservation requirements;
- the effect of unresolved authority on UX reconciliation; and
- the governance mechanism required before an affected baseline can change.

### 2.2 Excluded

This crosswalk does not:

- amend, supersede, accept, deprecate, or reinterpret an Architecture Freeze, ADR, Product Decision,
  Genesis artifact, Session Decision, or Foundation Baseline;
- decide whether ADR-042 formally supersedes or narrows ADR-015 or ADR-016;
- create an ADR, Freeze, Freeze Alignment Patch, Architecture Review, readiness validation, RFC,
  product decision, lifecycle, contract, route, screen, or implementation specification;
- define Discovery Session retention, token, persistence, privacy, or anti-abuse mechanisms;
- define exact UX states, navigation, page composition, wireframes, or copy;
- change Core Platform, Business Brain, Product Hub, Marketplace, or Operating System ownership;
- start Architecture Session 5; or
- start or create Feature 056.

## 3. Applicable authority hierarchy

### 3.1 Current operational rule

[AGENTS.md](../../AGENTS.md), `1. Authority Order`, directs repository work to read and apply:

1. Architecture Freezes;
2. Governance, including Accepted ADRs and the canonical glossary;
3. Genesis;
4. approved milestone baselines;
5. the engineering Constitution; and
6. agent guidance, specifications, plans, tasks, and implementation guidance.

The same section requires work to stop at an affected boundary when controlling sources conflict.
It prohibits an agent from inventing a compromise model, owner, lifecycle, or default.

[Foundation Baseline v0.1](./FOUNDATION-BASELINE-v0.1.md), `3. Authority and source hierarchy`,
records substantially the same repository order and explicitly states that the baseline does not
resolve a material conflict between controlling sources.

This crosswalk applies that stop rule. Applying the rule is not a decision that one conflicting
architecture statement has superseded another.

### 3.2 Authority wording that is not internally uniform

The repository's authority descriptions are not identical:

| Source | Exact heading | Recorded order or claim | Assessment |
|---|---|---|---|
| [AGENTS.md](../../AGENTS.md) | `1. Authority Order` | Freezes, then Governance, then Genesis | Current operational reading order; subordinate guidance that creates no architecture |
| [Foundation Baseline v0.1](./FOUNDATION-BASELINE-v0.1.md) | `3. Authority and source hierarchy` | Freezes, Governance, Genesis, milestone baselines | Repeats the current operational order; baseline remains subordinate |
| [Core Platform Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md) | `2. Frozen Scope` | Says Genesis remains ultimate authority, Accepted ADRs record decisions, and the approved Proposal freezes the Core interpretation | Frozen Core interpretation; wording differs from the current operational order |
| [Business Brain Freeze](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md) | `2. Freeze Authority` | Calls Genesis v1.1 the ultimate architecture authority and says the Freeze does not supersede Genesis or Accepted ADRs | Frozen Business Brain interpretation |
| [Commerce OS Freeze](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md) | `5. Baseline Authority` | Places Architecture Freeze documents before Accepted ADRs, Genesis, and inherited baselines | Matches the current operational order |
| [Marketplace Freeze](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md) | `2.1 Governing authority` and `2.3 Interpretation rule` | Lists Accepted ADRs before Genesis, but says its Freeze controls Marketplace conflicts until an ADR, review, and updated Freeze supersede it | Scope-specific Freeze precedence |

This proposed crosswalk does not normalize those statements. Their different formulations are an
authority-navigation issue requiring Governance disposition. Until disposition, the conservative
rule is to preserve all applicable guarantees and stop where their outcomes differ.

### 3.3 Specificity does not equal automatic supersession

- [ADR-042](./ADR/ADR-042-pre-registration-business-discovery.md), `Status`, is Accepted and is the
  most specific approved decision for Pre-Registration Business Discovery.
- [Core Platform Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md), `7. Change Control`,
  requires an ADR, Architecture Review, and updated Freeze for a material Core architecture change.
- [ADR governance](./ADR/README.md), `ADR lifecycle` and `Review workflow`, requires an Accepted ADR
  that replaces another Accepted ADR to state the supersession relationship; Accepted historical
  ADR content is not silently rewritten.
- [Foundation Baseline v0.1](./FOUNDATION-BASELINE-v0.1.md), `1. Purpose`, expressly states that it
  does not supersede Genesis, an Architecture Freeze, or an Accepted ADR.
- [Product Decision Register](./PRODUCT-DECISIONS.md), `Purpose and authority`, states that Product
  Decisions establish product and experience direction but do not replace Architecture Freezes or
  Accepted ADRs.
- [Session Decision Register](./SESSION-DECISION-REGISTER.md), `1. Purpose`, is a provenance register
  and does not replace its linked source authorities.

Therefore, later approval and greater topic specificity identify the intended direction but do not,
by themselves, prove that the frozen Core baseline or an earlier Accepted ADR has completed its
required successor lifecycle.

## 4. Chronological evolution

Dates below are used only when the artifact records them. `Not recorded` is retained where the
repository does not contain an approval date.

| Date or sequence | Artifact and exact heading | Recorded development | Authority consequence |
|---|---|---|---|
| 2026-07-12 | [Core Platform Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md), `1. Executive Summary`; [Business Brain Freeze](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md), document metadata | Core Platform v1.0 and Business Brain v1.0 frozen | Frozen baselines for the affected Core and Business Brain scope |
| 2026-07-13 | [Commerce OS Freeze](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md), document metadata; [Marketplace Freeze](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md), document metadata; [AI Expert Network Freeze](../99-architecture-freeze/AI-EXPERT-NETWORK-v1.0-FREEZE.md), document metadata | Commerce, Marketplace, and AI Expert Network v1.0 frozen | Later Foundation work must preserve their inherited boundaries unless governed successor work changes them |
| 2026-07-14 | [Global Platform Freeze](../99-architecture-freeze/GLOBAL-PLATFORM-v1.0-FREEZE.md), document metadata | Global Platform v1.0 frozen | Preserves inherited owners and makes no new canonical owner |
| 2026-07-14 | [Architecture v1.x Program Completion](../99-architecture-freeze/NEXORAXS-ARCHITECTURE-v1.x-COMPLETE.md), `Declaration Boundary` and `11. Future Evolution Policy` | Six milestones declared complete; future evolution requires governed successor work | Declaration is not architecture and cannot reinterpret a detailed Freeze |
| 2026-07-19 | [Product Decision Register](./PRODUCT-DECISIONS.md), `Decision summary`, PD-011 through PD-018 | Value before registration, pre-Workspace Discovery, Candidate Business Understanding, report preview, conversion, Guided Activation, reviewed advice, and Product Ethics recorded as confirmed product direction | Product direction is confirmed; architecture replacement is not implied |
| 2026-07-19 | [ADR-042](./ADR/ADR-042-pre-registration-business-discovery.md), `Status`, `Decision date`, and `Decision` | Pre-Registration Business Discovery accepted as architecture | Accepted later architecture direction; relationship to the existing Freeze and ADR-015/016 still requires explicit successor treatment where meanings differ |
| 2026-07-19 | [Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md), document metadata and `Journey overview` | Detailed product journey changed to value-before-registration and authenticated conversion | Detailed current experience authority under Foundation v0.1; cannot silently rewrite the meaning captured by the earlier Freeze |
| Not recorded | [Product Constitution v1.1](../01-genesis/02-CONSTITUTION.md), `Amendment Crosswalk: v1.0 to v1.1` | Adds Doctrine and Product Laws and materially supersedes the old Principle 11 wording | Durable approved product doctrine; material relationship to the frozen Genesis source set requires explicit record |
| Not recorded | [Session Decision Register](./SESSION-DECISION-REGISTER.md), `3. Decision summary` | Sessions 1–4 recorded as Approved and Locked | Provenance and approval record only; approval dates are explicitly not recorded |
| Not recorded | [Foundation Baseline v0.1](./FOUNDATION-BASELINE-v0.1.md), `4. Approval record` and `22. Baseline declaration` | Sessions 1–4 consolidated into an approved architecture snapshot | Active subordinate snapshot; no Freeze or ADR is superseded by the baseline itself |
| 2026-07-20 | [Foundation Audit v0.1](../08-implementation-audit/FOUNDATION-AUDIT-v0.1.md), document metadata and `4.2 Authority collision requiring Governance clarification` | Conflict and reconciliation requirements recorded | Evidence only; approves no resolution |

### 4.1 Frozen-path provenance problem

The [Core Platform Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md), `2.2 Genesis
v1.1`, includes `docs/01-genesis/11-CUSTOMER-JOURNEY.md` in its frozen source set. The current file
at that path identifies itself as [Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md),
`Last Updated: 2026-07-19`, while the Freeze date is 2026-07-12. The current path therefore does not,
by itself, preserve the exact journey text reviewed on the Freeze date.

The same preservation concern applies to [Product Constitution v1.1](../01-genesis/02-CONSTITUTION.md),
whose `Amendment Crosswalk: v1.0 to v1.1` records material amendments to the earlier Constitution.
Repository history preserves the prior content, but the frozen source manifest links a mutable path
rather than an immutable version artifact.

This is not a finding that Customer Journey v1.2 or Constitution v1.1 lacks approval. It is a finding
that the relationship between their later approved content and the earlier Freeze is not fully
represented by versioned successor artifacts.

## 5. Artifact-by-artifact authority matrix

| Artifact | Exact governing headings | Authority class | What it controls | What it cannot do in this relationship |
|---|---|---|---|---|
| [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md) | `2. Frozen Scope`; `3. Frozen Architectural Decisions`; `5. Architecture Guarantees`; `7. Change Control` | Frozen architecture | Core logical architecture, included source interpretation, ownership, journey/readiness constraints, and successor process | It does not prevent governed evolution, but remains controlling for frozen Core meaning until successor controls complete |
| [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md) | `7. Governing Authorities`; `8. Accepted Architecture`; `10. Accepted Ownership Rules`; `18. Change Control Policy` | Frozen architecture | Business Brain Decision ownership, deterministic decision boundary, candidate outputs, and recommendation-owner separation | It does not define Pre-Registration Discovery or physically approve a Business Insight Engine service |
| [Commerce OS Freeze v1.0](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md) | `5. Baseline Authority`; `25. Change Control Rules`; `28. Compatibility Guarantees` | Frozen architecture | Commerce-owned setup, operations, facts, and lifecycle | It cannot move Business Discovery into Commerce or let Core write Commerce operations |
| [Marketplace Freeze v1.0](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md) | `2. Freeze Authority and Baseline`; `20. Change Control Rules` | Frozen architecture | Marketplace Asset and scoped Marketplace lifecycles | It does not own Recommendations, Product Hub, or Business DNA |
| [AI Expert Network Freeze v1.0](../99-architecture-freeze/AI-EXPERT-NETWORK-v1.0-FREEZE.md) | `1.2 Freeze authority`; `1.4 Freeze validation`; `7. Future Change Control` | Frozen architecture | AI coordination/expert boundaries downstream of governed sources and decisions | It cannot make AI the owner of discovery knowledge, Business DNA, Decisions, or Recommendations |
| [Global Platform Freeze v1.0](../99-architecture-freeze/GLOBAL-PLATFORM-v1.0-FREEZE.md) | `4. Governing Authorities`; `5. Inherited Frozen Baselines`; `16. Change Control Policy` | Frozen architecture | Non-owning global coordination and inherited boundary preservation | It cannot become the owner that resolves this Core/Foundation conflict |
| [Architecture v1.x Program Completion](../99-architecture-freeze/NEXORAXS-ARCHITECTURE-v1.x-COMPLETE.md) | `Declaration Boundary`; `11. Future Evolution Policy`; `12. Successor Architecture Guidance` | Release declaration, not architecture | Records completion and the successor path | It cannot reinterpret a Freeze or make later changes automatically part of v1.x |
| [ADR-042](./ADR/ADR-042-pre-registration-business-discovery.md) | `Status`; `Decision`; `Compatibility`; `Alternatives considered` | Accepted ADR | Specific approved architecture for temporary pre-registration Discovery, conversion, knowledge-to-advice separation, ethics, and lineage | Its file does not explicitly mark ADR-015 or ADR-016 Superseded and does not itself issue an updated Freeze |
| [Foundation Baseline v0.1](./FOUNDATION-BASELINE-v0.1.md) | `1. Purpose`; `3. Authority and source hierarchy`; `12. Customer journey baseline`; `20. Baseline change policy` | Approved Governance snapshot, subordinate | Consolidates approved Sessions 1–4 meaning and exclusions | Explicitly cannot supersede a Freeze, Genesis, or Accepted ADR |
| [Product Constitution v1.1](../01-genesis/02-CONSTITUTION.md) | `Doctrine`; `Laws`; `Principles`; `Amendment Crosswalk: v1.0 to v1.1` | Active Genesis product doctrine | Durable Doctrine, Laws, and Principles | Does not define implementation or by itself document a completed Freeze successor lifecycle |
| [Session Decision Register](./SESSION-DECISION-REGISTER.md) | `1. Purpose`; `3. Decision summary`; `5. Change control` | Governance provenance register | Preserves Sessions 1–4 approval, stable IDs, sources, and deferrals | Cannot accept an ADR, change a Freeze, approve implementation, or start Session 5 |
| [Product Decision Register](./PRODUCT-DECISIONS.md) | `Purpose and authority`; PD-011 through PD-019; `Change control` | Product decision authority | Confirmed product direction and delivery/experience guardrails | Cannot replace architecture ownership, lifecycle, security, or contract decisions |
| [Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md) | `Journey overview`; phases 2–16; `Journey guardrails` | Current detailed Foundation experience authority | Detailed customer progression and customer-facing outcomes | Cannot transfer ownership, create contracts, or silently change a frozen architecture baseline |
| [Workspace Lifecycle v1.0](../01-genesis/12-WORKSPACE-LIFECYCLE.md) | `Workspace Lifecycle`; `Stage 1`; `Stage 2`; `Stage 3`; `Stage 4` | Genesis source incorporated by Core Freeze | Earlier Workspace-first lifecycle and readiness progression | Cannot be silently relabeled historical while the Freeze still includes it without successor disposition |
| [Older duplicate Customer Journey v1.0](../genesis/11-CUSTOMER-JOURNEY.md) | `Journey Philosophy`; stages 2–7 | Unclear-status historical duplicate outside canonical `docs/01-genesis/` tree | Provenance for account-first, Workspace-first, conversation-centric product language | Does not override the canonical `docs/01-genesis/` path or a Freeze; should not be used as current UX authority |
| [Core Platform Proposal v0.2](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md) | `4.2 Understand each Business`; `5.1 Business Architect Pipeline`; `Navigation Architecture` | Frozen Core source despite historical in-file Proposal status | Authenticated selected-Business pipeline, Core navigation, Product Hub, readiness | Cannot be updated through subordinate UX documents |
| [Core Platform Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md) | `2. Logical component groups`; `3. Business Architect Pipeline`; `8. Navigation Architecture`; `9. Readiness and lifecycle coordination` | Frozen Core source | Detailed logical Core components and flows | Does not contain the later anonymous Discovery boundary |
| [Core Platform Data Ownership](../02-core-platform/04-DATA-OWNERSHIP.md) | `5.2 Canonical source-of-truth map`; `5.10 Data lifecycle` | Frozen Core source | Canonical owners and approved Core data-lifecycle statements | Cannot be silently narrowed by a subordinate glossary or UX state document |
| [Foundation Audit v0.1](../08-implementation-audit/FOUNDATION-AUDIT-v0.1.md) | `4.2 Authority collision requiring Governance clarification`; `15. Recommended reconciliation order`; `17. Conclusion` | Factual audit evidence | Identifies conflicts, gaps, and safe next governance step | Does not decide precedence or authorize reconciliation |

## 6. Compatibility matrix

`Extended` means the later artifact adds compatible approved meaning without contradicting the
listed frozen guarantee. It does not mean the repository has completed any required updated-Freeze
or documentation lifecycle.

| Boundary | Frozen or earlier source | Later approved source | Relationship | Constraint |
|---|---|---|---|---|
| Workspace and Business ownership | Core Freeze `3.1`; ADR-003–005 | ADR-042 `8. Authenticated conversion and Business DNA v1`; Foundation `16. Business DNA publication lifecycle` | Compatible | No anonymous Workspace or Business; canonical DNA publishes only to one authenticated Business |
| Core vs Operating System ownership | Core Freeze `3.3`; Commerce Freeze `Approved Architecture Scope`; ADR-024 | ADR-042 `11. Ownership and boundaries`; Foundation `17. Core Platform and Operating System boundaries` | Compatible | Pre-registration Discovery writes no OS state; OS owns setup and operations |
| Core Workspace Ready vs Operating System Ready | Core Freeze `3.2`; ADR-018 | Customer Journey phases 13–17; Foundation `17.3 Boundary guarantees` | Compatible | Product Hub can precede OS readiness; no generic combined readiness flag |
| Product Hub composition | ADR-019/020; Core Architecture `4. Product Hub Architecture` | Foundation `17.3 Boundary guarantees`; Customer Journey phase 14 | Compatible | Product Hub presents and routes; it does not own Recommendations or OS operational state |
| Guided Activation vs OS-Specific Setup | Existing selected-Business Business Architect pipeline; ADR-024 | PD-016; ADR-042 `9. Guided Activation`; Session S02-D06 | Extended | Guided Activation can name the post-conversion continuation only; it cannot absorb OS setup |
| Capability-first recommendations | ADR-013; Core Freeze `3.2` | PD-017/018; ADR-042 `5. Knowledge-to-advice pipeline` and `6. Product ethics` | Extended | Business Need and Capability remain before products; no-product advice is permitted |
| Decision Lineage and Explainability | Business Brain Freeze `8.4 Canonical Decision architecture` and `9. Accepted Principles`; ADR-013 | ADR-042 `10. Decision lineage foundation`; Session S04-D01–D03 | Extended | Lineage records derivation; Explainability presents reasoning; neither changes canonical owners |
| Business Insight Engine | Business Brain Freeze `8.2 Logical capabilities`, `8.4 Canonical Decision architecture`, and `11.1 Business Brain owns` | ADR-042 `5. Knowledge-to-advice pipeline`; Foundation `9.2 Business Insight Engine` | Extended at conceptual responsibility level | Insight content remains within the frozen Business Brain Decision boundary unless future governed physical extraction is approved |
| Business Blueprint | Projection-is-not-ownership rules in Core Architecture `1. Architectural context` and Data Ownership `3.5 Projections never gain write authority` | Customer Journey phase 12; Foundation `10. Approved projections` and `12. Customer journey baseline` | Compatible clarification | Blueprint is a governed authenticated customer-facing projection; Business DNA and owner outputs remain sources |
| Business Report Preview | Existing projection and no-parallel-truth rules | ADR-042 `7. Business Report Preview`; PD-014 | Extended in projection semantics, but its pre-registration placement participates in conflict `AUTH-CX-02` | Preview remains temporary and non-canonical |
| Product Ethics Law | ADR-013 capability-first advice; ADR-014 human control; Marketplace Freeze `5. Accepted Architectural Principles` | Constitution `Law 1 — Product Ethics`; PD-018; ADR-042 `6. Product ethics` | Extended | The platform may recommend no product or current tools; commercial return cannot rank advice |
| Knowledge-type separation | Existing facts/inference/evidence/recommendation distinctions in ADR-013–016 and Business Brain Freeze | ADR-042 `5. Knowledge-to-advice pipeline`; Session S03-D02 | Extended | Observed Fact, Inference, Assessment, Need, Outcome, and Recommendation do not collapse |

## 7. Explicit authority conflicts

The table does not select a winner. `UX effect` follows the repository stop rule at the affected
boundary.

| ID | Topic | Older authoritative statement | Later approved statement | Relationship | Affected documents | Required Governance action | UX effect |
|---|---|---|---|---|---|---|---|
| AUTH-CX-01 | Authority hierarchy wording | Core Freeze `2. Frozen Scope` and Business Brain Freeze `2. Freeze Authority` call Genesis ultimate; Marketplace Freeze orders Accepted ADRs before Genesis | AGENTS `1. Authority Order`, Foundation `3. Authority and source hierarchy`, and Commerce Freeze `5. Baseline Authority` place Freezes first | Unresolved | AGENTS; Foundation; Core, Business Brain, Commerce, and Marketplace Freezes | Approve one repository-wide authority-navigation statement without rewriting the historical Freezes; record how scope-specific Freeze control and later Accepted ADRs interact | Evidence gathering may proceed; UX may not use hierarchy ambiguity to choose a conflicting journey |
| AUTH-CX-02 | Primary new-customer order | Workspace Lifecycle `Workspace Lifecycle` and stages 1–3; Core Proposal `Navigation Architecture — Canonical user movement`; Core Architecture `8. Navigation Architecture` put authentication/Workspace/Business before Business Architect | PD-011/012/015; ADR-042 `Decision` and `8. Authenticated conversion and Business DNA v1`; Customer Journey `Journey overview`; Foundation `12. Customer journey baseline` put meaningful Discovery and Report Preview before registration | Conflicting | Core Freeze and its Genesis/Core sources; ADR-042; PD Register; Customer Journey; Foundation | Architecture impact review followed by the required Core successor lifecycle. A documentation-only alignment patch is insufficient if the sequence changes frozen meaning | Canonical onboarding order, routes, screen map, and execution backlog remain blocked; factual gap analysis may proceed |
| AUTH-CX-03 | Business Discovery defined through conversation | Core Freeze `3.2` says Business understanding “uses a governed conversational flow”; ADR-015 `Decision` says the experience feels like a consultant conversation; old Constitution Principle 11 required configuration to feel like conversation | ADR-042 `1. Discovery goal and strategy` and rejected alternative `Define Business Discovery as a conversation engine`; Constitution Principle 11 and its amendment crosswalk; S01-D02/S01-D05 define a method-independent Capability and conversation as Experience v1 | Conflicting at the universal capability definition; potentially compatible for Experience v1 | Core Freeze; ADR-015; Constitution; ADR-042; Session Register | Review whether ADR-042 explicitly narrows or supersedes part of ADR-015. If the existing ADR relationship is insufficient, use a new ADR with a new ID; then update the affected Freeze through its lifecycle | Conversation may be documented as Experience v1, but UX may not define it as the durable Discovery capability or preclude other methods |
| AUTH-CX-04 | Anonymous candidate context vs selected-Business pipeline | ADR-016 `Decision` and Core Proposal `5.1 Business Architect Pipeline` scope pipeline stages to one authenticated selected Business; Core Data Ownership `5.2` gives Business Architect Session/Candidate Facts a Core pipeline write model | ADR-042 sections 2–4 create a temporary anonymous Discovery Session and Candidate Business Understanding with no Workspace/Business authority before conversion; PD-013/015 and S02-D01–D04 preserve that boundary | Extended in concepts but conflicting in entry context if treated as the same pipeline | Core Freeze; ADR-016; Core Proposal/Architecture/Data Ownership; ADR-042; Foundation | Architecture Review must decide whether Pre-Registration Discovery is a new pre-pipeline Core lifecycle or an extension of the frozen pipeline, and record the result in an updated/successor Core Freeze | UX may distinguish temporary candidate from canonical state; exact surface ownership, handoff, resume, and conversion design remain blocked |
| AUTH-CX-05 | Business Architect lifecycle states | Core Data Ownership `5.10 Data lifecycle` states a Business Architect Session may progress, pause, block, expire, or be superseded | Foundation Audit `9.2 Claims lacking current Foundation lifecycle authority` and Foundation Lexicon entries defer exact Foundation lifecycle states to approved UX or owning-domain specifications | Unresolved, potentially conflicting | Frozen Core Data Ownership; Domain Lexicon; Foundation Audit; future UX state documents | Governance must determine whether the Core lifecycle statement remains authoritative for its pipeline record and how it maps to Discovery/Guided Activation presentation states. Do not delete either statement silently | Exact Business Architect, Discovery, and Guided Activation UX state machines remain blocked |
| AUTH-CX-06 | Constitution Principle 11 and new Doctrine/Laws | Constitution v1.0 wording preserved in Constitution v1.1 `Amendment Crosswalk` made configuration conversational and had no separate Doctrine/Laws | Constitution v1.1 materially supersedes Principle 11 and adds Product Ethics, Value Before Registration, Advice Before Product, lineage, privacy, and governance Laws under PD-011/012/018 and ADR-042 | Conflicting for Principle 11; extended for other Doctrine/Laws | Constitution; Core Freeze included Genesis set; ADR-042; Product Decisions; Foundation | Preserve v1.0 as historical; govern v1.1 as a versioned Genesis successor in the architecture impact review and successor Freeze. Do not describe Principle 11 as an editorial change | UX can apply Ethics and customer-agency constraints; method and journey changes remain subject to `AUTH-CX-02` and `AUTH-CX-03` |
| AUTH-CX-07 | Mutable source paths inside a Freeze | Core Freeze `2.2 Genesis v1.1` includes the Customer Journey and Constitution by path as reviewed source artifacts | Current Customer Journey identifies v1.2 and a 2026-07-19 update; current Constitution identifies v1.1 and material amendments | Unresolved provenance/versioning conflict | Core Freeze; current Customer Journey; current Constitution; repository history | Successor Freeze must identify exact successor source versions and preserve the earlier reviewed content as history; future Freeze manifests should identify immutable versions or versioned artifacts | UX must cite current approved wording and the unresolved Freeze relationship; it may not claim that v1.2 was the text frozen on 2026-07-12 |
| AUTH-CX-08 | Foundation snapshot versus non-supersession | Foundation `22. Baseline declaration` calls Sessions 1–4 an active approved architecture snapshot | Foundation `1. Purpose` and `3. Authority and source hierarchy` also state it supersedes no Freeze or Accepted ADR, while its customer journey conflicts with frozen Core sources | Unresolved authority relationship | Foundation; Core Freeze; ADR-042; Session Register | Approve the crosswalk disposition and complete the applicable Core/Genesis successor lifecycle; publish a successor Foundation baseline only if its own approved meaning later changes | Foundation terminology can guide analysis, but conflicting flow execution remains blocked |

## 8. Later extensions that do not conflict with frozen ownership

The following later approvals are compatible with existing owners when applied within the stated
limits. They still require normal documentation traceability and any update that the Architecture
Review determines necessary.

1. **Product Ethics and no-product advice.** Constitution `Law 1 — Product Ethics`, PD-018, and
   ADR-042 `6. Product ethics` strengthen ADR-013's Capability-first Recommendation rule without
   changing the Recommendation Engine owner.
2. **Knowledge-type precision.** ADR-042 `5. Knowledge-to-advice pipeline` adds a conceptual
   derivation vocabulary while preserving Business DNA, Business Brain Decision, Recommendation,
   and Capability ownership.
3. **Conceptual Business Insight responsibility.** Foundation `9.2 Business Insight Engine`
   explicitly permits the responsibility to remain represented within the frozen Business Brain
   Decision boundary. Physical extraction remains future governance work.
4. **Decision Lineage distinct from Explainability.** ADR-042 `10. Decision lineage foundation`
   adds minimum derivation evidence; it does not transfer Audit, Business DNA, Business Brain
   Decision, or Recommendation ownership.
5. **Business Blueprint projection terminology.** Foundation `10. Approved projections` clarifies
   that the Blueprint is a governed authenticated customer-facing projection. It is not the
   canonical data store.
6. **Guided Activation versus OS setup.** PD-016 and ADR-042 `9. Guided Activation` preserve the
   Core continuation of business understanding while ADR-024 and every applicable Freeze preserve
   OS-Specific Setup under the selected OS.
7. **Product Hub boundary.** Foundation `17.3 Boundary guarantees` preserves ADR-019/020: Product
   Hub composes projections and routes to the selected OS but owns neither Recommendations nor OS
   operational state.
8. **Readiness separation.** Customer Journey phases 13–17 and Foundation `17.3` retain the frozen
   distinction between Core Workspace Ready and Operating System Ready.

These compatibility findings do not remove the entry-order, Discovery-definition, or lifecycle
conflicts in section 7.

## 9. Decisions requiring successor or addendum treatment

| Subject | Current evidence | Minimum follow-up to consider | Why a simple documentation edit is insufficient |
|---|---|---|---|
| Core new-customer journey | `AUTH-CX-02` | Independent Core architecture impact review, then an updated or successor Core Freeze under Core Freeze `7. Change Control` | Registration/Workspace order is part of frozen navigation and included Genesis meaning |
| Method-independent Discovery | `AUTH-CX-03` | ADR relationship disposition for ADR-015/042; if existing Accepted text does not express the replacement, a new ADR with a new unused ID; then Core Freeze successor treatment | It materially changes the universal conversation framing while retaining conversation only as Experience v1 |
| Anonymous Discovery and conversion | `AUTH-CX-04` | Core architecture impact review and successor Freeze treatment that defines its relationship to the selected-Business pipeline without implementation contracts | It adds a pre-authentication lifecycle with no Workspace/Business authority |
| Genesis journey and lifecycle | Customer Journey v1.2 vs Workspace Lifecycle v1.0 | Versioned Genesis successor/addendum treatment that preserves both historical versions and states which journey applies after approval | The current files disagree on order; silent edits would conceal evolution |
| Constitution v1.1 | Constitution `Amendment Crosswalk` | Explicit inclusion in the reviewed successor source set | The document itself records material, not editorial, amendments |
| Business Architect states | `AUTH-CX-05` | Governance disposition mapping frozen pipeline-record semantics to later Discovery/Guided Activation concepts; exact UX states remain a separate approved specification | The current Lexicon deferral cannot silently erase frozen Data Ownership wording |
| Business Insight Engine | Foundation `9.2`; Business Brain Freeze `8.4` | Architecture Review should record “compatible conceptual decomposition” if physical ownership remains unchanged; physical extraction requires its deferred RFC/ADR/successor lifecycle | A documentation alignment can describe responsibilities but cannot create a new canonical write owner or deployable boundary |
| v1.x completion record | Program Completion `11. Future Evolution Policy` | A new versioned completion/addendum record only after affected successor Freeze and readiness work is complete, if Governance wants a current program index | The existing declaration is historical and explicitly non-architectural |

No follow-up artifact above is created or approved by this crosswalk.

## 10. Historical preservation rules

The applicable rules are stated by [ADR governance](./ADR/README.md), `ADR lifecycle` and `Review
workflow`; [Core Platform Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md), `7. Change
Control`; [Architecture v1.x Program Completion](../99-architecture-freeze/NEXORAXS-ARCHITECTURE-v1.x-COMPLETE.md),
`11. Future Evolution Policy`; and Foundation `20. Baseline change policy`.

Any approved follow-up must:

1. preserve the existing Freezes and Accepted ADR text as historical evidence;
2. preserve Constitution v1.0 wording through the existing v1.1 amendment crosswalk or a stronger
   versioned successor record;
3. preserve the Workspace-first Customer Journey and Workspace Lifecycle as historical provenance;
4. avoid treating the unclear-status [duplicate Journey v1.0](../genesis/11-CUSTOMER-JOURNEY.md)
   as a second current authority;
5. identify explicit supersession, narrowing, amendment, or compatibility relationships;
6. never reuse an ADR, Product Decision, Session Decision, or RFC identifier;
7. use a new versioned Freeze when architectural meaning changes;
8. use a Freeze Alignment Patch only for demonstrably compatible documentary correction;
9. retain unresolved deferrals and risks until their own governing process changes them; and
10. avoid editing an old artifact so that it appears to have contained a later decision at its
    original approval time.

## 11. Impact on UX reconciliation

### 11.1 UX work that may proceed without deciding the conflict

Documentation-only reconciliation may proceed for statements already compatible across the sources:

- preserve Workspace as tenant boundary and Business as Business DNA owner;
- label Candidate Business Understanding as temporary and non-canonical;
- label Guided Business Conversation as Discovery Experience v1, not the durable Capability;
- keep Business Blueprint a governed authenticated customer-facing projection;
- keep Recommendations separate from the Blueprint and capability-first;
- distinguish Decision Lineage from Explainability;
- preserve Product Ethics, customer agency, correction, provenance, and no-product outcomes;
- preserve Product Hub as a composition/handoff boundary;
- preserve Guided Activation as separate from OS-Specific Setup;
- preserve Core Workspace Ready as separate from Operating System Ready; and
- inventory current UX gaps without selecting routes, states, screens, or implementation.

### 11.2 UX work blocked by unresolved authority

The following remain blocked until the applicable governance follow-up is approved:

- declaring one canonical new-customer route order where frozen Core and later Foundation sources
  differ;
- changing current route ownership or redirect behavior;
- deciding whether anonymous Discovery is part of the existing Business Architect pipeline or a
  separate pre-pipeline lifecycle;
- defining exact Discovery, Business Architect, Guided Activation, conversion, or Blueprint states;
- selecting persistence, retention, resume, token, security, or conversion mechanics;
- claiming the Core Freeze already contains the current Customer Journey v1.2 meaning;
- converting the Foundation Audit's missing UX specifications into implementation work; and
- starting Feature 056 or Session 5.

The current safe UX output is therefore a traceable reconciliation proposal, not an approved target
flow or executable frontend specification.

## 12. Implementation restrictions

Until the authority conflicts are resolved, implementation must not infer:

- an anonymous Workspace or Business;
- a canonical Candidate Business Understanding aggregate schema;
- a Discovery Session API, token format, persistence store, retention period, or state machine beyond
  the exact ADR-042 conceptual boundary;
- a new Business Insight Engine service, package, database, write model, or contract;
- a Product Hub write model for Recommendations or Operating System state;
- a Business Blueprint canonical store;
- a replacement for the frozen Business Architect pipeline;
- direct Core writes to Operating System operational state;
- one combined Core/OS readiness flag; or
- a claim that frontend mock state is canonical, production, authorization, or backend contract
  evidence.

[ADR-042](./ADR/ADR-042-pre-registration-business-discovery.md), `Costs and constraints` and
`Compatibility`, requires incremental introduction and preserves existing Login/Register entry
behavior until replacement and migration evidence are approved. This crosswalk adds no
implementation permission.

## 13. Recommended governance mechanism

The repository's own lifecycle is recorded by Core Freeze `7. Change Control`, Business Brain
Freeze `18. Change Control Policy`, and Program Completion `11. Future Evolution Policy`.

The recommended follow-up sequence is:

1. **Approve or reject this crosswalk as an analysis record.** Approval would confirm the mapped
   relationships and blocked boundaries; it would not supersede any source.
2. **Perform an independent Core/Foundation Architecture Review.** The review should classify each
   item in section 7 as compatible, material-compatible extension, incompatible change, or unresolved
   and identify every affected frozen guarantee and deferred decision.
3. **Disposition the ADR-015/ADR-016 relationship to ADR-042.** If ADR-042 does not satisfy the
   repository's explicit supersession requirements for the intended change, create a new Proposed
   ADR with a new unused identifier and process it normally. Do not edit the Accepted ADR history.
4. **Prepare a bounded Core proposal or patch under milestone authority.** A Freeze Alignment Patch
   is appropriate only for conclusions the Architecture Review finds fully compatible and
   non-architectural. Material journey, owner, or lifecycle changes require the architectural path.
5. **Issue an updated or successor Core Platform Freeze.** It should identify exact included source
   versions, the accepted ADR set, superseded baseline, compatibility impact, and retained deferrals.
6. **Evaluate Business Brain impact separately.** If conceptual Business Insight separation leaves
   the frozen Decision owner and physical boundary unchanged, record that compatibility. Otherwise,
   use the Business Brain successor lifecycle; do not infer extraction.
7. **Publish versioned Genesis successor/addendum treatment.** Preserve Workspace Lifecycle v1.0,
   Customer Journey history, and Constitution amendment history rather than editing them to imply
   one continuous unchanged baseline.
8. **Run readiness validation.** Only after the applicable Freeze and readiness controls pass should
   subordinate UX sources declare the reconciled flow authoritative.
9. **Reconcile UX as a controlled package.** Apply the approved sequence and terminology without
   inventing exact lifecycle or implementation decisions.

This sequence uses existing Governance. It does not require a new artifact class. Whether a new ADR
is required is itself a decision for the Architecture Review under the current ADR lifecycle.

## 14. Unresolved approval questions

1. Does ADR-042 formally supersede or only narrow ADR-015's conversational-experience requirement?
2. Is Pre-Registration Business Discovery a separate Core lifecycle before the ADR-016 Business
   Architect pipeline, or an approved extension of that pipeline with a different authority context?
3. Which frozen Core guarantees are materially changed by moving value before registration, and
   which are preserved unchanged?
4. Should Customer Journey v1.2 and Constitution v1.1 enter a successor Core Freeze as explicit
   versioned sources?
5. What successor treatment should preserve Workspace Lifecycle v1.0 while establishing the current
   new-customer sequence?
6. Does the Core Data Ownership `5.10` Business Architect Session lifecycle remain controlling for a
   pipeline record, and how is that distinct from Discovery and UX presentation states?
7. Is conceptual Business Insight Engine separation fully compatible with the frozen Business Brain
   Decision boundary, or does any approved responsibility wording require a Business Brain updated
   Freeze?
8. What one repository-wide authority statement reconciles the differing hierarchy wording in
   AGENTS, Foundation, and the milestone Freezes?
9. After successor approval, should a new versioned program-completion addendum be issued to index the
   current accepted ADR and Freeze set?

No answer is assumed in this Proposed crosswalk.

## 15. Crosswalk verdict

The approved Foundation Sessions 1–4 direction is partly compatible with and partly material to the
frozen v1.x architecture:

- **compatible:** Workspace/Business ownership, Business-scoped Business DNA, Core/OS separation,
  Product Hub composition, readiness separation, capability-first advice, Product Ethics, projection
  non-ownership, and the conceptual distinction between Lineage and Explainability;
- **compatible conceptual extension:** knowledge-type precision, Business Insight responsibility
  while it remains inside the frozen Decision boundary, and a governed authenticated Business
  Blueprint projection;
- **material conflict or unresolved extension:** value-before-registration journey order,
  method-independent Discovery versus universal conversation framing, anonymous candidate context
  versus the selected-Business pipeline, Business Architect lifecycle semantics, and mutable Genesis
  source paths inside the Core Freeze; and
- **governance consequence:** a Proposed crosswalk cannot make the later direction part of a frozen
  baseline. The affected work remains blocked until the existing ADR/review/updated-or-successor
  Freeze/readiness lifecycle records the approved relationship.

## 16. Non-supersession statement

**Foundation Authority Crosswalk v0.1 does not supersede, amend, accept, reject, deprecate, narrow, or
reinterpret an Architecture Freeze, Accepted ADR, Product Decision, Genesis artifact, Session
Decision, Foundation Baseline, Customer Journey, or milestone source document.**

It is Proposed analysis only. If approved, it records the relationship and the required follow-up;
it does not itself complete that follow-up.

Session 5 and Feature 056 remain not started.

## 17. Evidence index

### 17.1 Operational and Governance sources

- [AGENTS.md](../../AGENTS.md) — `1. Authority Order`; `15. Documentation Synchronization`
- [ADR Index](./ADR/README.md) — `ADR lifecycle`; `Review workflow`; `Current decision set`
- [ADR-015](./ADR/ADR-015-infer-before-asking-conversational-configuration.md) — `Decision`
- [ADR-016](./ADR/ADR-016-business-architect-governed-pipeline.md) — `Decision`
- [ADR-018](./ADR/ADR-018-separate-core-and-os-readiness.md) — `Decision`
- [ADR-019](./ADR/ADR-019-product-hub-discovery-and-os-handoff.md) — `Decision`
- [ADR-020](./ADR/ADR-020-product-hub-composition-not-data-ownership.md) — `Decision`
- [ADR-024](./ADR/ADR-024-independent-operating-system-domain-ownership.md) — `Decision`
- [ADR-042](./ADR/ADR-042-pre-registration-business-discovery.md) — `Decision`; `Consequences`;
  `Compatibility`; `Alternatives considered`
- [Product Decision Register](./PRODUCT-DECISIONS.md) — `Purpose and authority`; PD-011–PD-019;
  `Current priority journey`; `Change control`
- [Foundation Baseline v0.1](./FOUNDATION-BASELINE-v0.1.md) — `1. Purpose`; `3. Authority and source
  hierarchy`; sections 9–17; `20. Baseline change policy`; `22. Baseline declaration`
- [Session Decision Register](./SESSION-DECISION-REGISTER.md) — `1. Purpose`; `3. Decision summary`;
  detailed Sessions 1–4 decisions; `5. Change control`
- [Domain Lexicon](./glossary/GLOSSARY.md) — Foundation entries for Business Discovery, Candidate
  Business Understanding, Business Architect, Business Blueprint, Product Hub, and readiness

### 17.2 Genesis and Core sources

- [Product Constitution v1.1](../01-genesis/02-CONSTITUTION.md) — `Doctrine`; `Laws`; Principle 11;
  `Amendment Crosswalk: v1.0 to v1.1`
- [Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md) — `Journey overview`; phases 2–16;
  `Journey guardrails`
- [Workspace Lifecycle v1.0](../01-genesis/12-WORKSPACE-LIFECYCLE.md) — `Workspace Lifecycle`;
  stages 1–4
- [Older duplicate Customer Journey v1.0](../genesis/11-CUSTOMER-JOURNEY.md) — `Journey
  Philosophy`; stages 2–7
- [Core Platform Proposal](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md) — `4.2
  Understand each Business`; `5.1 Business Architect Pipeline`; `Navigation Architecture`
- [Core Platform Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md) — `2. Logical
  component groups`; `3. Business Architect Pipeline`; `8. Navigation Architecture`; `9. Readiness
  and lifecycle coordination`
- [Core Platform Data Ownership](../02-core-platform/04-DATA-OWNERSHIP.md) — `5.2 Canonical
  source-of-truth map`; `5.10 Data lifecycle`

### 17.3 Frozen architecture and audit sources

- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md) — sections 2,
  3.2, 5, 6, and 7
- [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md) — sections
  7–11 and 18
- [Commerce OS Freeze v1.0](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md) — sections 5, 25,
  and 28
- [Marketplace Freeze v1.0](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md) — sections 2 and
  20
- [AI Expert Network Freeze v1.0](../99-architecture-freeze/AI-EXPERT-NETWORK-v1.0-FREEZE.md) —
  sections 1.2–1.4 and `7. Future Change Control`
- [Global Platform Freeze v1.0](../99-architecture-freeze/GLOBAL-PLATFORM-v1.0-FREEZE.md) — sections
  4, 5, 16, and 17
- [Architecture v1.x Program Completion](../99-architecture-freeze/NEXORAXS-ARCHITECTURE-v1.x-COMPLETE.md)
  — `Declaration Boundary`; sections 11–13
- [Foundation Audit v0.1](../08-implementation-audit/FOUNDATION-AUDIT-v0.1.md) — sections 4.2, 7,
  9.2, 10–15, and 17
