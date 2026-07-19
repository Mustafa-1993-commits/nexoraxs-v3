# NexoraXS Domain Lexicon and Canonical Glossary

Version: 1.1

Status: Active Governance Foundation

Authority: Architecture Freezes, Accepted ADRs, Genesis, and Foundation Baseline v0.1

Owner: NexoraXS Product Governance

---

## Purpose

This document is the canonical Domain Lexicon and broader architecture glossary for NexoraXS. It
records concepts already approved by authoritative sources. It does not create synonyms, resolve
registered RFC topics, approve implementation, or replace the more specific source decision.

The **Foundation Domain Lexicon** uses the complete governance template approved for Foundation
Baseline v0.1. When a concept formerly appeared in both that section and the retained extended
architecture glossary, the Foundation Domain Lexicon entry controls the canonical name and meaning;
the former compact location now contains an explicit consolidation reference that preserves its v1.0
provenance without duplicating the definition.

## Usage Rules

- Use the exact canonical Name when referring to a concept.
- Do not substitute a related concept merely because its label sounds similar.
- Owner identifies canonical architectural ownership, not every consumer.
- Scope identifies where the concept applies or is instantiated.
- Source Documents remain authoritative if a summary here is incomplete.
- A concept that is ambiguous in the approved sources is listed under **Ambiguities Preserved** and is not redefined.
- One Concept has one Canonical Name and one Name has one Meaning.
- Customer-facing language may differ only when its mapping to the Canonical Name is explicit.
- Deprecated terms remain recorded and identify their replacement when one is approved.
- Canonical terms may not be added or materially changed without the applicable Product Decision,
  ADR, or approved governance change.

## Foundation Domain Lexicon

Every entry in this section uses the Foundation Baseline v0.1 template. `Not assigned` means that no
approved value exists; it is not permission to invent one. Arabic working names are deliberately not
created here without an approved localization source.

### Domain: Product Doctrine

- **Canonical Name:** Product Doctrine
- **Canonical Truth:** NexoraXS exists to understand and improve Businesses; product adoption is not its governing purpose.
- **Arabic Working Name:** Not assigned
- **Category:** Doctrine
- **Definition:** The durable statement of product purpose and position from which Product Laws, Principles, and Policies derive.
- **Owner:** NexoraXS Product Governance
- **Produced By:** Product Constitution approval
- **Consumed By:** Product decisions; architecture; experience policy; specifications
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Product purpose; customer value; governance authority
- **Outputs:** Product Laws; decision constraints
- **Related Concepts:** Product Law; Product Constitution; Foundation Baseline
- **Distinguished From:** Product marketing; roadmap priority; architecture implementation choice
- **Examples:** Business improvement before product adoption
- **Non-Examples:** A feature slogan; a pricing objective; a framework decision
- **Source Decisions:** S03-D04; S04-D05; PD-018; ADR-001; ADR-042
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Product Law

- **Canonical Name:** Product Law
- **Canonical Truth:** A Product Law is a non-negotiable product constraint derived from Product Doctrine.
- **Arabic Working Name:** Not assigned
- **Category:** Law
- **Definition:** A durable rule that every product decision, projection, recommendation, and experience must satisfy.
- **Owner:** NexoraXS Product Governance
- **Produced By:** Product Constitution approval
- **Consumed By:** Product policy; architecture review; specifications; acceptance review
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Product Doctrine; approved evidence and decisions
- **Outputs:** Product constraints and review criteria
- **Related Concepts:** Product Doctrine; Principle; Policy; Product Ethics Law
- **Distinguished From:** Guideline; implementation rule; feature acceptance criterion
- **Examples:** Value Before Registration; Product Ethics Law
- **Non-Examples:** Use a particular frontend framework
- **Source Decisions:** S03-D04; S04-D05; PD-011; PD-018; ADR-042
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Product Ethics Law

- **Canonical Name:** Product Ethics Law
- **Canonical Truth:** NexoraXS exists to improve businesses, not merely to increase product adoption.
- **Arabic Working Name:** Not assigned
- **Category:** Product Law
- **Definition:** The law requiring advice to remain credible, Capability-first, transparent about NexoraXS options, open to reasonable alternatives, and valid even when no sale results.
- **Owner:** NexoraXS Product Governance
- **Produced By:** Product Constitution and approved Sessions 1–4
- **Consumed By:** Business Insight Engine; Recommendation Engine; Product Hub presentation; product review
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Product Doctrine; customer-first governance
- **Outputs:** Recommendation and commercial-presentation constraints
- **Related Concepts:** Product Doctrine; Product Law; Recommendation; Implementation Option
- **Distinguished From:** Sales policy; product ranking; adoption target
- **Examples:** Recommend retaining a suitable current tool
- **Non-Examples:** Hiding a reasonable alternative because NexoraXS earns no revenue from it
- **Source Decisions:** S03-D04; PD-018; ADR-042 section 6
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** `Business Benefit Before Product Adoption` is the related PD-018 title, not a separate law

### Domain: Product Principle

- **Canonical Name:** Product Principle
- **Canonical Truth:** A Product Principle guides choices that must satisfy Product Doctrine and Product Laws.
- **Arabic Working Name:** Not assigned
- **Category:** Principle
- **Definition:** A durable decision guide below Laws and above scoped Policies in the approved concept hierarchy.
- **Owner:** NexoraXS Product Governance
- **Produced By:** Product Constitution approval
- **Consumed By:** Product policy; architecture and experience decisions
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Product Doctrine; Product Laws
- **Outputs:** Decision guidance; policy constraints
- **Related Concepts:** Product Doctrine; Product Law; Product Policy
- **Distinguished From:** Non-negotiable Law; scoped implementation rule
- **Examples:** Capabilities Before Industries
- **Non-Examples:** A component coding convention
- **Source Decisions:** S04-D05; Product Constitution v1.1
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Product Policy

- **Canonical Name:** Product Policy
- **Canonical Truth:** A Product Policy governs repeatable application of Doctrine, Laws, and Principles within a defined scope.
- **Arabic Working Name:** Not assigned
- **Category:** Policy
- **Definition:** An approved, scoped rule for making consistent product decisions without changing higher-order Doctrine or Laws.
- **Owner:** The named policy owner under Product Governance
- **Produced By:** Approved policy process
- **Consumed By:** Capabilities; experiences; specifications; reviews
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Doctrine; Laws; Principles; scope evidence
- **Outputs:** Repeatable constraints and review criteria
- **Related Concepts:** Product Principle; Capability; Product Decision
- **Distinguished From:** Product Law; architecture ownership decision; implementation default
- **Examples:** An approved privacy-aware Discovery policy
- **Non-Examples:** A framework convention without product effect
- **Source Decisions:** S04-D05; Foundation Baseline v0.1
- **Version:** 0.1
- **Status:** Approved concept
- **Deprecated Terms or Replaced By:** None

### Domain: Capability

- **Canonical Name:** Capability
- **Canonical Truth:** A Capability states what reusable business or platform function is needed independently of one industry, interface, product, or implementation.
- **Arabic Working Name:** Not assigned
- **Category:** Capability
- **Definition:** A stable, composable function governed by its canonical owner and implementable by one or more modules, experiences, or products without being redefined by them.
- **Owner:** Core Capability Registry for canonical definitions; the applicable domain owns execution
- **Produced By:** Capability governance
- **Consumed By:** Business understanding; Recommendations; Product Hub; Operating Systems
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Business need; governance evidence
- **Outputs:** Canonical Capability definition and applicability
- **Related Concepts:** Recommended Capability; Module; Operating System; Product Policy
- **Distinguished From:** Feature; Module; Experience Pattern; product
- **Examples:** Business Discovery; Inventory traceability
- **Non-Examples:** A chat screen; a Commerce menu item
- **Source Decisions:** ADR-007; ADR-008; S01-D02; S03-D05
- **Source Documents:** [Genesis Capabilities](../../01-genesis/04-CAPABILITIES.md); [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)
- **Version:** 0.1
- **Status:** Approved canonical concept
- **Deprecated Terms or Replaced By:** None

### Domain: Engine

- **Canonical Name:** Engine
- **Canonical Truth:** An Engine owns a named conceptual processing or reasoning responsibility and its approved outputs; the term does not imply physical deployment.
- **Arabic Working Name:** Not assigned
- **Category:** Concept hierarchy type
- **Definition:** A bounded logical responsibility that transforms governed inputs into named outputs under explicit ownership, lineage, and policy.
- **Owner:** The domain named by the specific Engine
- **Produced By:** Approved architecture decision
- **Consumed By:** Downstream Engines, Projections, and owning-domain workflows
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Defined by the named Engine
- **Outputs:** Defined by the named Engine
- **Related Concepts:** Capability; Projection; Business Understanding Engine; Business Insight Engine; Recommendation Engine
- **Distinguished From:** Service; package; database; user experience
- **Examples:** Recommendation Engine
- **Non-Examples:** Assuming Business Insight Engine is a deployable service
- **Source Decisions:** S03-D01; S03-D03; ADR-033; ADR-042
- **Version:** 0.1
- **Status:** Approved concept
- **Deprecated Terms or Replaced By:** None

### Domain: Projection

- **Canonical Name:** Projection
- **Canonical Truth:** A Projection presents or composes derived information and never becomes the source of truth for its inputs.
- **Arabic Working Name:** Not assigned
- **Category:** Concept hierarchy type
- **Definition:** A read-oriented, rebuildable or regenerable representation composed from authorized owner-controlled sources for a defined audience or purpose.
- **Owner:** The named projection owner; source owners retain canonical facts
- **Produced By:** Approved projection responsibility
- **Consumed By:** Customer experiences; reviewers; Product Hub; analytics where authorized
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Authorized canonical or derived source references
- **Outputs:** Purpose-specific representation
- **Related Concepts:** Report Projection; Business Report Preview; Business Blueprint; Product Hub
- **Distinguished From:** Aggregate; write model; canonical data store
- **Examples:** Business Blueprint
- **Non-Examples:** Treating a rendered report as Business DNA
- **Source Decisions:** ADR-020; S03-D01; ADR-042
- **Version:** 0.1
- **Status:** Approved concept
- **Deprecated Terms or Replaced By:** None

### Domain: Experience Pattern

- **Canonical Name:** Experience Pattern
- **Canonical Truth:** An Experience Pattern defines a reusable customer interaction approach without redefining the Capability or Engine it presents.
- **Arabic Working Name:** Not assigned
- **Category:** Concept hierarchy type
- **Definition:** A governed product-experience model used to present one or more Capabilities through a particular interaction approach.
- **Owner:** The applicable product experience owner
- **Produced By:** Approved experience design
- **Consumed By:** Customer journeys; screen and interaction specifications
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Capability intent; audience; context; accessibility and localization requirements
- **Outputs:** Interaction guidance and experience behavior
- **Related Concepts:** Discovery Experience; Guided Business Conversation; Capability; Projection
- **Distinguished From:** Capability; Engine; component implementation
- **Examples:** Guided Business Conversation
- **Non-Examples:** Business Discovery itself
- **Source Decisions:** S01-D05; S04-D05; ADR-042
- **Version:** 0.1
- **Status:** Approved concept
- **Deprecated Terms or Replaced By:** None

### Domain: Product Constitution

- **Canonical Name:** Product Constitution
- **Canonical Truth:** Product Constitution is the Genesis authority for durable NexoraXS Product Doctrine, Laws, and Principles.
- **Arabic Working Name:** Not assigned
- **Category:** Governance artifact
- **Definition:** The stable product-governance document that constrains product, architecture, experience, and implementation decisions without prescribing implementation detail.
- **Owner:** NexoraXS Product Governance
- **Produced By:** Product governance approval
- **Consumed By:** All lower product-governance and delivery artifacts
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Approved Doctrine; Laws; Principles
- **Outputs:** Durable product authority
- **Related Concepts:** Foundation Baseline; Product Doctrine; Product Law
- **Distinguished From:** Engineering Constitution; feature specification; Architecture Freeze
- **Examples:** `docs/01-genesis/02-CONSTITUTION.md`
- **Non-Examples:** `.specify/memory/constitution.md`
- **Source Decisions:** S04-D05; Foundation Baseline v0.1
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Foundation Baseline

- **Canonical Name:** Foundation Baseline
- **Canonical Truth:** Foundation Baseline is a versioned approved product-foundation architecture snapshot subordinate to higher controlling authorities.
- **Arabic Working Name:** Not assigned
- **Category:** Governance artifact
- **Definition:** The consolidated record of approved foundation decisions, concepts, lifecycles, boundaries, and governance references for a named version and approval scope.
- **Owner:** NexoraXS Product Governance
- **Produced By:** Approved architecture-session consolidation
- **Consumed By:** Future governance; product planning; architecture review; specifications
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Accepted ADRs; Product Decisions; Session Decisions; Genesis; Freezes
- **Outputs:** Navigable foundation snapshot
- **Related Concepts:** Product Constitution; Session Decision Register; RFC Register; Governance Change Log
- **Distinguished From:** Architecture Freeze; implementation baseline; roadmap
- **Examples:** Foundation Baseline v0.1
- **Non-Examples:** A claim that product features are implemented
- **Source Decisions:** S04-D05
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Domain Lexicon

- **Canonical Name:** Domain Lexicon
- **Canonical Truth:** Domain Lexicon is the governance authority for canonical names, meanings, distinctions, lifecycle language, and deprecation metadata.
- **Arabic Working Name:** Not assigned
- **Category:** Governance artifact
- **Definition:** The structured vocabulary that enforces One Concept, One Canonical Name and One Name, One Meaning across authoritative documents.
- **Owner:** NexoraXS Product Governance
- **Produced By:** Approved terminology governance
- **Consumed By:** ADRs; Product Decisions; RFCs; architecture; experience; specifications; implementation
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Approved concepts and decisions
- **Outputs:** Canonical definitions and distinctions
- **Related Concepts:** Product Constitution; Foundation Baseline; Architecture Decision Record
- **Distinguished From:** Marketing vocabulary; arbitrary synonym list; generated code symbols
- **Examples:** This Foundation Domain Lexicon section
- **Non-Examples:** A feature-local term silently treated as platform canonical
- **Source Decisions:** S04-D04; S04-D05
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** `Canonical Glossary` remains the repository file title component and extended reference, not a competing authority

### Domain: Architecture Decision Record

- **Canonical Name:** Architecture Decision Record
- **Canonical Truth:** An Architecture Decision Record preserves one durable architecture decision and its history under an immutable identifier.
- **Arabic Working Name:** Not assigned
- **Category:** Governance artifact
- **Definition:** A record of architecture context, decision, consequences, alternatives, status, and authoritative relationships governed by the ADR lifecycle.
- **Owner:** Architecture Governance
- **Produced By:** ADR review and approval process
- **Consumed By:** Architecture baselines; specifications; implementation review
- **Lifecycle:** Proposed → Accepted or Rejected → Deprecated or Superseded when applicable
- **States:** Proposed; Accepted; Rejected; Deprecated; Superseded
- **Inputs:** Architecture question; evidence; authoritative constraints
- **Outputs:** Durable decision and consequences
- **Related Concepts:** Foundation Baseline; Domain Lexicon; RFC Register
- **Distinguished From:** Product Decision; RFC entry; implementation note
- **Examples:** ADR-042
- **Non-Examples:** Reusing an old ADR identifier for a new question
- **Source Decisions:** S04-D04; ADR governance
- **Source Documents:** [ADR Index and lifecycle](../ADR/README.md)
- **Version:** 0.1
- **Status:** Approved concept
- **Deprecated Terms or Replaced By:** `ADR` is the approved abbreviation

### Domain: Product Decision Register

- **Canonical Name:** Product Decision Register
- **Canonical Truth:** Product Decision Register is the single register of confirmed product direction and its amendments or supersession.
- **Arabic Working Name:** Not assigned
- **Category:** Governance artifact
- **Definition:** The permanent, identifier-based record of product-level direction, implications, guardrails, and relationships to architecture authority.
- **Owner:** Product
- **Produced By:** Product review and confirmation
- **Consumed By:** Customer journeys; architecture interpretation; specifications; roadmap governance
- **Lifecycle:** Decision added → Confirmed, amended, superseded, or otherwise changed through explicit product review
- **States:** Confirmed; Amended; Superseded; other states only through approved register governance
- **Inputs:** Product evidence and approval
- **Outputs:** Confirmed product direction
- **Related Concepts:** Session Decision Register; Architecture Decision Record; Foundation Baseline
- **Distinguished From:** ADR; roadmap; feature specification
- **Examples:** PD-018
- **Non-Examples:** Reusing PD-018 for another decision
- **Source Decisions:** S04-D04; Product Decision Register change control
- **Source Documents:** [Product Decision Register](../PRODUCT-DECISIONS.md)
- **Version:** 0.1
- **Status:** Approved concept
- **Deprecated Terms or Replaced By:** None

### Domain: Session Decision Register

- **Canonical Name:** Session Decision Register
- **Canonical Truth:** Session Decision Register preserves approved architecture-session decisions under stable local identifiers without replacing their source authorities.
- **Arabic Working Name:** Not assigned
- **Category:** Governance artifact
- **Definition:** The decision inventory for a named set of architecture sessions, including status, rationale, affected concepts, relationships, and RFC implications.
- **Owner:** NexoraXS Product Governance
- **Produced By:** Approved session consolidation
- **Consumed By:** Foundation Baseline; RFC Register; future session governance
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Approved session outcomes; ADRs; Product Decisions
- **Outputs:** Stable session decision history
- **Related Concepts:** Foundation Baseline; RFC Register; Product Decision Register
- **Distinguished From:** Meeting notes; Product Decision Register; ADR
- **Examples:** S03-D04
- **Non-Examples:** An unapproved Session 5 assumption
- **Source Decisions:** S04-D05
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: RFC Register

- **Canonical Name:** RFC Register
- **Canonical Truth:** RFC Register names deferred future architecture questions and opening triggers without deciding or implementing them.
- **Arabic Working Name:** Not assigned
- **Category:** Governance artifact
- **Definition:** The permanent identifier-based inventory of unresolved topics that require a future scoped Request for Comments and approval process.
- **Owner:** NexoraXS Product Governance
- **Produced By:** Deferral governance
- **Consumed By:** Architecture planning; session entry checks; feature blockers
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Unresolved architecture question; reason for deferral; opening trigger
- **Outputs:** Bounded future RFC topic
- **Related Concepts:** Architecture Decision Record; Foundation Baseline; Session Decision Register
- **Distinguished From:** Accepted decision; feature; implementation task
- **Examples:** RFC-001 Physical Extraction of Business Insight Engine
- **Non-Examples:** Treating registration as approval to implement
- **Source Decisions:** S04-D05
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Change Log

- **Canonical Name:** Change Log
- **Canonical Truth:** Change Log records product-governance evolution without rewriting accepted or historical sources.
- **Arabic Working Name:** Not assigned
- **Category:** Governance artifact
- **Definition:** The chronological or versioned record of governance artifacts added, updated, superseded, or deferred and their explicit non-effects.
- **Owner:** NexoraXS Product Governance
- **Produced By:** Approved governance change
- **Consumed By:** Reviewers; future baseline authors; audit and provenance work
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Approved governance change and evidence
- **Outputs:** Change provenance
- **Related Concepts:** Foundation Baseline; Product Decision Register; Architecture Decision Record
- **Distinguished From:** Product release notes; source-control history; implementation completion report
- **Examples:** Foundation Baseline v0.1 entry
- **Non-Examples:** Claiming backend completion because an architecture document was added
- **Source Decisions:** S04-D05
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** `Governance Change Log` is a descriptive phrase, not a separate canonical artifact

### Domain: Business Discovery

- **Canonical Name:** Business Discovery
- **Canonical Truth:** Business Discovery is a goal-driven, method-independent Core Platform Capability.
- **Arabic Working Name:** Not assigned
- **Category:** Capability
- **Definition:** The capability that identifies material Knowledge Gaps and acquires sufficient business knowledge for a defined Discovery Goal through the best available governed method.
- **Owner:** Core Platform
- **Produced By:** Product foundation architecture
- **Consumed By:** Business Mapping; Business Understanding Engine; Business Architect experience
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Discovery Goal; available knowledge; Knowledge Gaps; available acquisition methods
- **Outputs:** Acquired source material; evidence; candidate knowledge; unresolved gaps
- **Related Concepts:** Discovery Goal; Discovery Strategy; Knowledge Acquisition Method; Discovery Session
- **Distinguished From:** Discovery Experience; Guided Business Conversation; questionnaire; Business Architect
- **Examples:** Selecting document analysis to resolve an ownership gap
- **Non-Examples:** A long static form; an unbounded chatbot; a product quiz
- **Source Decisions:** S01-D01–S01-D05; PD-012; ADR-042
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** `Business conversation` is not a replacement for Business Discovery

### Domain: Discovery Goal

- **Canonical Name:** Discovery Goal
- **Canonical Truth:** A Discovery Goal defines the bounded business-understanding outcome a Discovery Session is pursuing.
- **Arabic Working Name:** Not assigned
- **Category:** Discovery policy concept
- **Definition:** The explicit outcome used to determine relevant Knowledge Domains, material gaps, acquisition priority, and completion sufficiency.
- **Owner:** Core Platform Business Discovery
- **Produced By:** Discovery initiation and approved goal policy
- **Consumed By:** Discovery Strategy; completion evaluation
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Visitor intent; known context; applicable policy
- **Outputs:** Bounded discovery objective; sufficiency context
- **Related Concepts:** Discovery Strategy; Knowledge Gap; Discovery Session
- **Distinguished From:** Business Goal; Desired Outcome; product-selection objective
- **Examples:** Understand the most material operating constraints sufficiently to produce a report preview
- **Non-Examples:** Collect all possible information; sell Commerce OS
- **Source Decisions:** S01-D03; ADR-042 section 1
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Discovery Strategy

- **Canonical Name:** Discovery Strategy
- **Canonical Truth:** Discovery Strategy chooses what material knowledge to acquire next and how to acquire it.
- **Arabic Working Name:** Not assigned
- **Category:** Discovery policy concept
- **Definition:** The goal-relative policy that evaluates known knowledge, material Knowledge Gaps, expected value, available methods, and stopping sufficiency.
- **Owner:** Core Platform Business Discovery
- **Produced By:** Discovery planning responsibility
- **Consumed By:** Discovery Experience; Knowledge Acquisition Method selection; completion evaluation
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Discovery Goal; candidate knowledge; confidence; contradictions; available methods
- **Outputs:** Next material gap; selected method; stop or continue decision
- **Related Concepts:** Discovery Goal; Knowledge Gap; Knowledge Acquisition Method
- **Distinguished From:** Conversation script; form order; Recommendation strategy
- **Examples:** Prefer website analysis over asking for publicly available service information
- **Non-Examples:** A fixed questionnaire sequence
- **Source Decisions:** S01-D03; ADR-042 section 1
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Knowledge Gap

- **Canonical Name:** Knowledge Gap
- **Canonical Truth:** A Knowledge Gap is missing, conflicting, stale, withheld, or insufficiently supported knowledge relevant to a Discovery Goal.
- **Arabic Working Name:** Not assigned
- **Category:** Knowledge state
- **Definition:** A named deficiency in current understanding whose materiality can be evaluated without assuming that every unknown must be acquired.
- **Owner:** Business Understanding Engine
- **Produced By:** Comparison of available understanding with Discovery Goal requirements
- **Consumed By:** Discovery Strategy; Understanding Reflection; Guided Activation
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Candidate knowledge; confidence; contradictions; goal sufficiency policy
- **Outputs:** Acquisition need or explicit unresolved state
- **Related Concepts:** Discovery Goal; Discovery Strategy; Knowledge Acquisition Method
- **Distinguished From:** Business Need; software requirement; missing form field
- **Examples:** Current inventory process is unknown and material to the stated goal
- **Non-Examples:** Every optional profile field not supplied
- **Source Decisions:** S01-D03; ADR-042 sections 1 and 3
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Knowledge Acquisition Method

- **Canonical Name:** Knowledge Acquisition Method
- **Canonical Truth:** A Knowledge Acquisition Method is one governed way to obtain evidence or source material for a Knowledge Gap.
- **Arabic Working Name:** Not assigned
- **Category:** Discovery method
- **Definition:** A method selected by Discovery Strategy according to the goal, gap, source availability, consent, trust, effort, and policy.
- **Owner:** Core Platform Business Discovery governance
- **Produced By:** Approved method catalog and policy
- **Consumed By:** Discovery Experience; Discovery Strategy
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Knowledge Gap; source availability; customer consent; method policy
- **Outputs:** Source material; Evidence; acquisition errors or uncertainty
- **Related Concepts:** Guided Business Conversation; Discovery Experience; Evidence; Original Source
- **Distinguished From:** Business Discovery Capability; fixed onboarding step
- **Examples:** Guided conversation; form; voice; website analysis; document analysis; system import; external integration
- **Non-Examples:** A Recommendation; canonical publication
- **Source Decisions:** S01-D04; PD-012; ADR-042 section 1
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Discovery Experience

- **Canonical Name:** Discovery Experience
- **Canonical Truth:** A Discovery Experience presents Business Discovery through one or more Knowledge Acquisition Methods.
- **Arabic Working Name:** Not assigned
- **Category:** Experience Pattern
- **Definition:** A customer-facing interaction pattern that carries a Discovery Strategy without becoming the Capability or canonical knowledge owner.
- **Owner:** Core Platform product experience
- **Produced By:** Approved experience design
- **Consumed By:** Visitors and authenticated customers participating in discovery
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Discovery Strategy; selected method; customer context
- **Outputs:** Customer interaction; acquired source material; corrections; progress presentation
- **Related Concepts:** Business Discovery; Guided Business Conversation; Discovery Session
- **Distinguished From:** Discovery Strategy; Business Understanding Engine; Business DNA
- **Examples:** Guided Business Conversation
- **Non-Examples:** Business Discovery itself; a backend contract
- **Source Decisions:** S01-D04; S01-D05; ADR-042
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Guided Business Conversation

- **Canonical Name:** Guided Business Conversation
- **Canonical Truth:** Guided Business Conversation is Discovery Experience v1, not the Business Discovery Capability.
- **Arabic Working Name:** Not assigned
- **Category:** Experience Pattern and Knowledge Acquisition Method
- **Definition:** A guided, adaptive, conversational interaction used to acquire and reflect material business knowledge for the current Discovery Goal.
- **Owner:** Core Platform product experience
- **Produced By:** Business Discovery experience design
- **Consumed By:** Visitors; Business Architect; Discovery Strategy
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Discovery Strategy; current gap; prior candidate knowledge
- **Outputs:** Source material; corrections; Evidence; candidate knowledge
- **Related Concepts:** Discovery Experience; Knowledge Acquisition Method; Business Architect
- **Distinguished From:** Business Discovery; unbounded chatbot; static form
- **Examples:** Asking one contextual question because a material fact cannot be inferred
- **Non-Examples:** Defining every Discovery Session as a chat
- **Source Decisions:** S01-D05; PD-012; ADR-015; ADR-042
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** Former generalized phrase `configuration conversation` does not define Business Discovery

### Domain: Discovery Session

- **Canonical Name:** Discovery Session
- **Canonical Truth:** A Discovery Session is temporary pre-registration discovery state with no tenant, membership, entitlement, or operational authority.
- **Arabic Working Name:** Not assigned
- **Category:** Temporary lifecycle context
- **Definition:** A resumable, privacy-aware container for one pre-registration Discovery Goal, strategy, acquired material, Candidate Business Understanding, and conversion status.
- **Owner:** Core Platform Business Discovery
- **Produced By:** Start of pre-registration Business Discovery
- **Consumed By:** Business Discovery; Business Mapping; authenticated conversion
- **Lifecycle:** Created → Active → Converted, Abandoned, or Expired; resumability is bounded by the approved retention policy.
- **States:** Active; Expired; Converted; Abandoned. Explicitly defined by [ADR-042 section 8](../ADR/ADR-042-pre-registration-business-discovery.md#8-authenticated-conversion-and-business-dna-v1).
- **Inputs:** Visitor intent; acquired source material; candidate knowledge
- **Outputs:** Candidate Business Understanding; Business Report Preview; conversion context
- **Related Concepts:** Discovery Goal; Candidate Business Understanding; Business Report Preview
- **Distinguished From:** Workspace; Business; Business Architect Session; authenticated session
- **Examples:** A resumable anonymous discovery identified by an opaque reference
- **Non-Examples:** An anonymous Workspace; a permission context; an OS setup session
- **Source Decisions:** S01-D01; S02-D01; PD-012; ADR-042 sections 2 and 8
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Business Mapping

- **Canonical Name:** Business Mapping
- **Canonical Truth:** Business Mapping structures acquired material into Candidate Business Understanding without making it canonical.
- **Arabic Working Name:** Not assigned
- **Category:** Capability
- **Definition:** The normalization and classification responsibility that distinguishes source material, Observed Facts, Inferences, Assessments, uncertainty, provenance, corrections, and unresolved questions.
- **Owner:** Core Platform Business Understanding responsibility
- **Produced By:** Product foundation architecture
- **Consumed By:** Business Understanding Engine; Understanding Reflection
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Acquired source material; Evidence; Original Sources
- **Outputs:** Structured Candidate Business Understanding
- **Related Concepts:** Business Discovery; Candidate Business Understanding; Observed Fact; Inference
- **Distinguished From:** Business DNA publication; report presentation; OS configuration mapping
- **Examples:** Separating a customer statement from an inferred operating risk
- **Non-Examples:** Writing Business DNA directly from raw input
- **Source Decisions:** S02-D02; Customer Journey v1.2; ADR-042
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Business Understanding Engine

- **Canonical Name:** Business Understanding Engine
- **Canonical Truth:** The Business Understanding Engine owns the conceptual responsibility for candidate facts, Evidence, Original Sources, contradictions, confidence, and Candidate Business Understanding.
- **Arabic Working Name:** Not assigned
- **Category:** Engine
- **Definition:** The conceptual engine that turns governed source material into reviewable business understanding while preserving fact, evidence, provenance, confidence, correction, and uncertainty.
- **Owner:** Core Platform
- **Produced By:** Product foundation architecture
- **Consumed By:** Business Insight Engine; Understanding Reflection; authenticated conversion
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Source material; Evidence; Original Sources; corrections; Discovery Strategy
- **Outputs:** Observed Facts; confidence; contradictions; Candidate Business Understanding
- **Related Concepts:** Business Mapping; Candidate Business Understanding; Business Insight Engine
- **Distinguished From:** Business Insight Engine; Recommendation Engine; Business DNA Registry
- **Examples:** Recording what is known, why it is known, and what remains uncertain
- **Non-Examples:** Recommending a product; executing an OS action
- **Source Decisions:** S03-D01; ADR-042 sections 3–5
- **Version:** 0.1
- **Status:** Approved conceptual responsibility
- **Deprecated Terms or Replaced By:** None

### Domain: Candidate Business Understanding

- **Canonical Name:** Candidate Business Understanding
- **Canonical Truth:** Candidate Business Understanding is temporary, pre-canonical, provenance-aware, confidence-aware, reviewable, and correctable.
- **Arabic Working Name:** Not assigned
- **Category:** Candidate knowledge
- **Definition:** The structured body of pre-publication business knowledge produced during discovery and mapping before authenticated approval into Business DNA.
- **Owner:** Core Platform Business Understanding lifecycle; no Workspace or Business owner before conversion
- **Produced By:** Business Mapping and Business Understanding Engine
- **Consumed By:** Understanding Reflection; Business Report Preview; authenticated conversion
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Raw input; Evidence; Observed Facts; Inferences; Assessments; corrections
- **Outputs:** Business Report Preview; approved conversion material
- **Related Concepts:** Discovery Session; Understanding Reflection; Business DNA
- **Distinguished From:** Business DNA; Workspace state; Business Blueprint; OS configuration
- **Examples:** A reviewable candidate operating model with confidence and provenance
- **Non-Examples:** Canonical Business truth; authorization fact; operational record
- **Source Decisions:** S02-D01; PD-013; ADR-042 section 3
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** Candidate Fact is a narrower retained pipeline term, not a synonym for the complete Candidate Business Understanding

### Domain: Understanding Reflection

- **Canonical Name:** Understanding Reflection
- **Canonical Truth:** Understanding Reflection lets the customer review and correct material candidate understanding before conversion.
- **Arabic Working Name:** Not assigned
- **Category:** Projection and Experience Pattern
- **Definition:** A review presentation that distinguishes supplied facts, Inferences, Business Assessments, assumptions, uncertainty, contradictions, and corrections.
- **Owner:** Core Platform product experience
- **Produced By:** Business Understanding Engine and Business Insight Engine outputs composed for review
- **Consumed By:** Visitor or authenticated reviewer; conversion policy
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Candidate Business Understanding; Inferences; Assessments; confidence
- **Outputs:** Corrections; review evidence; approval readiness
- **Related Concepts:** Candidate Business Understanding; Explainability; Business Report Preview
- **Distinguished From:** Canonical publication; generic report; recommendation acceptance
- **Examples:** Correcting an inferred sales-channel assessment while preserving the original evidence
- **Non-Examples:** A checkbox that silently approves all candidate knowledge
- **Source Decisions:** S02-D03; ADR-042 section 4
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** Review Checkpoint is a narrower pipeline stage, not a replacement for the customer-facing concept

### Domain: Observed Fact

- **Canonical Name:** Observed Fact
- **Canonical Truth:** An Observed Fact states what an identified Original Source supplied or what was directly observed; it is not an interpretation.
- **Arabic Working Name:** Not assigned
- **Category:** Knowledge type
- **Definition:** A sourced statement retained with Evidence, provenance, confidence appropriate to the observation, and correction history.
- **Owner:** Business Understanding Engine for candidate understanding; approved canonical facts remain owned by the applicable canonical registry
- **Produced By:** Knowledge Acquisition Method and normalization
- **Consumed By:** Business Insight Engine; Decision Lineage; Understanding Reflection
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Original Source; Evidence
- **Outputs:** Sourced fact and lineage node
- **Related Concepts:** Evidence; Original Source; Inference; Business DNA Fact
- **Distinguished From:** Inference; Business Assessment; assumption
- **Examples:** The customer states that the Business has three branches
- **Non-Examples:** The Business is operationally fragmented
- **Source Decisions:** S03-D02; S04-D01; PD-017; ADR-042
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Evidence

- **Canonical Name:** Evidence
- **Canonical Truth:** Evidence is the material supporting an Observed Fact or derived conclusion and retains a relationship to its Original Source.
- **Arabic Working Name:** Not assigned
- **Category:** Knowledge support
- **Definition:** A reference or governed representation of customer input, document content, system data, observation, or other source material used in understanding or lineage.
- **Owner:** Business Understanding Engine for discovery evidence; originating domain retains canonical source ownership
- **Produced By:** Knowledge Acquisition Method or authorized source
- **Consumed By:** Observed Fact; Inference; Assessment; Decision Lineage; Explainability
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Original Source; acquisition context
- **Outputs:** Support reference; provenance and confidence input
- **Related Concepts:** Original Source; Observed Fact; Provenance; Decision Lineage
- **Distinguished From:** The Fact itself; an unsupported assertion; a Recommendation
- **Examples:** A cited section of an uploaded process document
- **Non-Examples:** A confidence score without source material
- **Source Decisions:** S02-D01; S04-D01; ADR-013; ADR-038; ADR-042
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Original Source

- **Canonical Name:** Original Source
- **Canonical Truth:** Original Source identifies where Evidence first came from without transferring ownership of that source.
- **Arabic Working Name:** Not assigned
- **Category:** Provenance concept
- **Definition:** The identifiable person, document, website, system, integration, observation, or other origin from which Evidence was acquired.
- **Owner:** Originating source owner; Core owns only the governed reference within discovery
- **Produced By:** Source registration during acquisition
- **Consumed By:** Evidence; provenance; Decision Lineage; correction and impact analysis
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Source identity and acquisition context
- **Outputs:** Source reference
- **Related Concepts:** Evidence; Provenance; Decision Lineage
- **Distinguished From:** Evidence extracted from the source; a derived Inference
- **Examples:** A named uploaded document version or authorized ERP export
- **Non-Examples:** `The platform` without a specific source reference
- **Source Decisions:** S04-D01; ADR-038; ADR-042
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Inference

- **Canonical Name:** Inference
- **Canonical Truth:** An Inference is a derived interpretation and must never be represented as an Observed Fact.
- **Arabic Working Name:** Not assigned
- **Category:** Knowledge type
- **Definition:** A reasoned conclusion derived from one or more Observed Facts, Evidence references, assumptions, and a named rule or generator context.
- **Owner:** Business Insight Engine conceptual responsibility
- **Produced By:** Governed insight reasoning
- **Consumed By:** Business Assessment; Understanding Reflection; Decision Lineage
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Observed Facts; Evidence; assumptions; rule or generator version
- **Outputs:** Derived interpretation with confidence and lineage
- **Related Concepts:** Observed Fact; Business Assessment; Decision Lineage
- **Distinguished From:** Fact; Assessment; Recommendation
- **Examples:** Inferring manual stock reconciliation from described processes
- **Non-Examples:** The customer directly states that stock is reconciled manually
- **Source Decisions:** S03-D02; PD-017; ADR-042 section 5
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Business Assessment

- **Canonical Name:** Business Assessment
- **Canonical Truth:** A Business Assessment evaluates what Observed Facts and Inferences mean for the Business; it is not a direct fact or a Recommendation.
- **Arabic Working Name:** Not assigned
- **Category:** Knowledge type
- **Definition:** A contextual evaluation of strengths, risks, opportunities, constraints, readiness, or operating condition based on traceable understanding.
- **Owner:** Business Insight Engine conceptual responsibility
- **Produced By:** Governed insight reasoning
- **Consumed By:** Business Need; Business Priority; Decision Lineage; Report Projection
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Observed Facts; Inferences; context; applicable Knowledge and Rules
- **Outputs:** Traceable evaluation with confidence and assumptions
- **Related Concepts:** Inference; Business Need; Business Priority
- **Distinguished From:** Observed Fact; Recommendation; Business DNA
- **Examples:** Current inventory controls create a material stock-accuracy risk
- **Non-Examples:** Enable inventory software
- **Source Decisions:** S03-D02; PD-017; ADR-042
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Business Need

- **Canonical Name:** Business Need
- **Canonical Truth:** A Business Need states a business gap or improvement requirement independent of a product.
- **Arabic Working Name:** Not assigned
- **Category:** Knowledge type
- **Definition:** A traceable requirement for the Business to address a material Assessment, achieve a goal, reduce a risk, or improve an outcome.
- **Owner:** Business Insight Engine conceptual responsibility
- **Produced By:** Business Assessment and prioritization
- **Consumed By:** Desired Outcome; Recommended Capability; Decision Lineage
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Business Assessment; Business context; customer goals
- **Outputs:** Product-independent improvement requirement
- **Related Concepts:** Business Priority; Desired Outcome; Recommended Capability
- **Distinguished From:** Product requirement; feature request; Implementation Option
- **Examples:** Improve traceability of stock changes
- **Non-Examples:** Buy Commerce OS
- **Source Decisions:** S03-D02; S03-D05; PD-017; ADR-013; ADR-042
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Business Priority

- **Canonical Name:** Business Priority
- **Canonical Truth:** A Business Priority expresses the relative importance and timing of a Business Need in a defined context.
- **Arabic Working Name:** Not assigned
- **Category:** Insight and prioritization concept
- **Definition:** A contextual ordering of Business Needs using evidence, impact, urgency, risk, dependencies, confidence, and customer intent.
- **Owner:** Business Insight Engine conceptual responsibility
- **Produced By:** Governed prioritization
- **Consumed By:** Desired Outcome; Recommendation Engine; Report Projection
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Business Needs; Assessments; goals; constraints; confidence
- **Outputs:** Ranked or categorized priority with rationale
- **Related Concepts:** Business Need; Desired Outcome; Recommendation
- **Distinguished From:** Recommendation rank based on commercial return; Plan tier
- **Examples:** Stock accuracy is a near-term high priority because current losses are material
- **Non-Examples:** Commerce OS is priority one because it is a NexoraXS product
- **Source Decisions:** S03-D02; S03-D04; PD-017; PD-018; ADR-042
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Desired Outcome

- **Canonical Name:** Desired Outcome
- **Canonical Truth:** A Desired Outcome describes the business result sought before choosing a Capability or Implementation Option.
- **Arabic Working Name:** Not assigned
- **Category:** Knowledge-to-advice concept
- **Definition:** A clear, product-independent outcome derived from an approved Business Need or Priority and used to evaluate advice.
- **Owner:** Recommendation Engine conceptual responsibility
- **Produced By:** Recommendation reasoning from reviewed Need or Priority
- **Consumed By:** Recommended Capability; Recommendation; outcome evaluation
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Business Need; Business Priority; customer goal
- **Outputs:** Outcome statement and success context
- **Related Concepts:** Business Need; Recommended Capability; Recommendation
- **Distinguished From:** Product selection; feature; Implementation Option
- **Examples:** Reduce unexplained stock variance
- **Non-Examples:** Install the inventory module
- **Source Decisions:** S03-D02; S03-D05; PD-017; ADR-042
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Business Insight Engine

- **Canonical Name:** Business Insight Engine
- **Canonical Truth:** Business Insight Engine is the approved conceptual responsibility for Inferences, Assessments, strengths, risks, opportunities, Priorities, and Business Needs.
- **Arabic Working Name:** Not assigned
- **Category:** Engine
- **Definition:** The conceptual engine between Business Understanding Engine and Recommendation Engine that evaluates what known business information means.
- **Owner:** Core Platform intelligence; physical and canonical write-model placement remains governed by the Business Brain Freeze and RFC-001
- **Produced By:** Product foundation architecture
- **Consumed By:** Recommendation Engine; Report Projection; Understanding Reflection
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification. Conceptual separation is approved; physical extraction remains deferred.
- **Inputs:** Observed Facts; Evidence; Inferences; context; Knowledge; Rules
- **Outputs:** Inferences; Assessments; strengths; risks; opportunities; Priorities; Business Needs
- **Related Concepts:** Business Understanding Engine; Business Brain Decision; Recommendation Engine
- **Distinguished From:** A currently approved service, aggregate, database, or deployable module
- **Examples:** Evaluating that current stock controls create a material risk
- **Non-Examples:** A new backend service implied by this lexicon
- **Source Decisions:** S03-D01; S03-D03; PD-017; ADR-012; ADR-033; ADR-042; RFC-001
- **Version:** 0.1
- **Status:** Approved conceptual responsibility; physical extraction deferred
- **Deprecated Terms or Replaced By:** None

### Domain: Recommendation Engine

- **Canonical Name:** Recommendation Engine
- **Canonical Truth:** Recommendation Engine owns governed advice from Desired Outcome through Recommended Capability and Implementation Options.
- **Arabic Working Name:** Not assigned
- **Category:** Engine
- **Definition:** The Core Platform engine that forms, prioritizes, explains, versions, and tracks optional Recommendations without executing target-domain changes.
- **Owner:** Core Platform Recommendation Engine
- **Produced By:** Approved Core Platform architecture
- **Consumed By:** Business Blueprint; Product Hub projections; customers; owning target domains through governed proposals
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification. Recommendation output states are defined separately under Recommendation.
- **Inputs:** Desired Outcomes; Business Needs; Assessments; Capabilities; Knowledge; Rules; authorized context
- **Outputs:** Recommendations; Recommended Capabilities; Implementation Options; version evidence
- **Related Concepts:** Recommendation; Recommended Capability; Implementation Option; Decision Lineage
- **Distinguished From:** Business Insight Engine; Product Hub; target-domain executor
- **Examples:** Recommend a stock-control Capability with alternative ways to implement it
- **Non-Examples:** Silently enabling an OS module
- **Source Decisions:** S03-D01; S03-D05; PD-017; PD-018; ADR-013; ADR-014; ADR-042
- **Source Documents:** [Genesis Recommendation Engine](../../01-genesis/07-RECOMMENDATION-ENGINE.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Recommendation

- **Canonical Name:** Recommendation
- **Canonical Truth:** A Recommendation is optional, explainable, evidence-based advice intended to improve the Business.
- **Arabic Working Name:** Not assigned
- **Category:** Governed advisory output
- **Definition:** A versioned course of action linked to a Desired Outcome, Recommended Capability, rationale, evidence, assumptions, alternatives, risk, expected benefit, confidence, and review status.
- **Owner:** Core Platform Recommendation Engine
- **Produced By:** Recommendation Engine
- **Consumed By:** Customer; Business Blueprint; Product Hub projection; configuration coordination when accepted
- **Lifecycle:** Generated → Reviewed → Accepted or Rejected → Learned. Exact supersession, freshness, and invalidation policy remains deferred.
- **States:** Generated; Reviewed; Accepted; Rejected; Learned. Explicitly defined by the [Genesis Recommendation Lifecycle](../../01-genesis/07-RECOMMENDATION-ENGINE.md#recommendation-lifecycle).
- **Inputs:** Desired Outcome; Recommended Capability; Decision Lineage; authorized context
- **Outputs:** Optional advice; explanation; review record; Implementation Options
- **Related Concepts:** Recommended Capability; Implementation Option; Decision Lineage; Explainability
- **Distinguished From:** Observed Fact; Business Assessment; product advertisement; command
- **Examples:** Improve stock-change traceability through a governed control capability
- **Non-Examples:** An automatic configuration change; a hidden product upsell
- **Source Decisions:** S03-D04; S03-D05; S04-D01–S04-D03; PD-017; PD-018; ADR-013; ADR-014; ADR-042
- **Source Documents:** [Genesis Recommendation Engine](../../01-genesis/07-RECOMMENDATION-ENGINE.md); [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Recommended Capability

- **Canonical Name:** Recommended Capability
- **Canonical Truth:** A Recommended Capability states what reusable business function can satisfy a Business Need before selecting software.
- **Arabic Working Name:** Not assigned
- **Category:** Recommendation output
- **Definition:** A Recommendation's reference to a canonical Capability justified by a Business Need, Desired Outcome, and Decision Lineage.
- **Owner:** Recommendation Engine owns the recommendation; Capability Registry owns the referenced Capability definition
- **Produced By:** Recommendation Engine
- **Consumed By:** Customer; Implementation Option mapping; Product Hub projection
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Business Need; Desired Outcome; canonical Capability definition
- **Outputs:** Capability-first advice and mapping context
- **Related Concepts:** Capability; Business Need; Desired Outcome; Implementation Option
- **Distinguished From:** Capability definition; OS Module; product SKU
- **Examples:** Inventory traceability Capability
- **Non-Examples:** Commerce OS plan selection
- **Source Decisions:** S03-D05; PD-017; ADR-007; ADR-013; ADR-042
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** `Capability Recommendation` may be customer-facing language only when mapped explicitly to Recommended Capability

### Domain: Implementation Option

- **Canonical Name:** Implementation Option
- **Canonical Truth:** An Implementation Option is one disclosed way to satisfy a Recommended Capability and is not the Business Need itself.
- **Arabic Working Name:** Not assigned
- **Category:** Recommendation output
- **Definition:** A process change, retained tool, external alternative, NexoraXS Operating System, Plan, Marketplace Asset, or other approach that may implement a Recommended Capability.
- **Owner:** Recommendation Engine owns the advisory option; the referenced solution owner retains its canonical state
- **Produced By:** Recommendation Engine and governed option mapping
- **Consumed By:** Customer; Product Hub projection; target setup handoff when selected
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Recommended Capability; constraints; compatibility; entitlements; alternatives
- **Outputs:** Disclosed implementation choice with rationale and trade-offs
- **Related Concepts:** Recommended Capability; Operating System; Product Hub
- **Distinguished From:** Recommendation; Business Need; automatic configuration
- **Examples:** Retain the current tool; improve a process; select Commerce OS when appropriate
- **Non-Examples:** Hiding non-NexoraXS alternatives
- **Source Decisions:** S03-D04; S03-D05; PD-017; PD-018; ADR-013; ADR-042
- **Source Documents:** [Genesis Business Brain](../../01-genesis/06-BUSINESS-BRAIN.md); [Genesis Recommendation Engine](../../01-genesis/07-RECOMMENDATION-ENGINE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Decision Lineage

- **Canonical Name:** Decision Lineage
- **Canonical Truth:** Decision Lineage records the traversable derivation path from a Recommendation to its Original Sources and the reverse impact path from sources to derived outputs.
- **Arabic Working Name:** Not assigned
- **Category:** Governance and knowledge integrity capability
- **Definition:** The version-aware graph of derived-from relationships, derivation types, generator or rule versions, confidence, review state, and creation context for governed knowledge and advice.
- **Owner:** Each owning engine records its lineage edge; Core governance defines cross-engine lineage requirements
- **Produced By:** Business Understanding Engine; Business Insight Engine; Recommendation Engine
- **Consumed By:** Audit; correction; impact analysis; reviewers; Explainability presentations
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Source and derived entity references; derivation metadata; versions; confidence; review status
- **Outputs:** Forward derivation and reverse impact traversal
- **Related Concepts:** Evidence; Original Source; Explainability; Recommendation
- **Distinguished From:** Explainability UI; Audit Record; generic log
- **Examples:** Recommendation → Capability → Need → Assessment → Inference → Fact → Evidence → Source
- **Non-Examples:** A prose explanation with no source relationship
- **Source Decisions:** S04-D01; S04-D02; PD-017; ADR-038; ADR-042 section 10
- **Version:** 0.1
- **Status:** Approved; required from MVP
- **Deprecated Terms or Replaced By:** `Decision Traceability UI` is a future presentation, not a replacement for Decision Lineage

### Domain: Explainability

- **Canonical Name:** Explainability
- **Canonical Truth:** Explainability presents understandable reasoning; it does not replace or redefine Decision Lineage.
- **Arabic Working Name:** Not assigned
- **Category:** Product and governance quality
- **Definition:** Audience-appropriate communication of rationale, evidence, assumptions, alternatives, uncertainty, confidence, expected benefit, risk, and consequences.
- **Owner:** Owning decision or recommendation domain for content; presentation policy remains RFC-010
- **Produced By:** Deterministic explanation and authorized projection responsibilities
- **Consumed By:** Customers; reviewers; support; Audit investigations
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Decision Lineage; reasoning snapshot; evidence; assumptions; confidence
- **Outputs:** Comprehensible explanation
- **Related Concepts:** Decision Lineage; Recommendation; Understanding Reflection; Report Projection
- **Distinguished From:** Lineage graph; marketing copy; unsupported narrative
- **Examples:** Explaining why stock traceability is recommended and what alternatives exist
- **Non-Examples:** `Recommended by the platform` without reasons
- **Source Decisions:** S04-D02; PD-017; ADR-013; ADR-042; RFC-010
- **Version:** 0.1
- **Status:** Approved requirement; presentation policy deferred
- **Deprecated Terms or Replaced By:** None

### Domain: Business Report Preview

- **Canonical Name:** Business Report Preview
- **Canonical Truth:** Business Report Preview is a useful temporary pre-registration projection, not Business DNA or the governed authenticated Business Blueprint projection.
- **Arabic Working Name:** Not assigned
- **Category:** Projection
- **Definition:** A customer-facing composition of Candidate Business Understanding, material insight, Needs, Desired Outcomes, Recommended Capabilities, Implementation Options, uncertainty, and remaining gaps.
- **Owner:** Core Platform Report Projection
- **Produced By:** Candidate understanding, insight, and Recommendation outputs composed before conversion
- **Consumed By:** Visitor; Create Workspace Intent
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Candidate Business Understanding; insights; preview Recommendations; lineage
- **Outputs:** Pre-registration value; correction and continuation actions
- **Related Concepts:** Understanding Reflection; Business Blueprint; Create Workspace Intent
- **Distinguished From:** Business DNA; governed authenticated Business Blueprint projection; entitlement; implementation plan
- **Examples:** A report that shows current understanding, risks, Capabilities, alternatives, and remaining gaps
- **Non-Examples:** A persisted canonical Business record
- **Source Decisions:** S01-D01; PD-014; ADR-042 section 7
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Workspace

- **Canonical Name:** Workspace
- **Canonical Truth:** Workspace is one customer account and the highest tenant boundary; pre-registration discovery does not create one anonymously.
- **Arabic Working Name:** Not assigned
- **Category:** Canonical organization concept
- **Definition:** The tenant and customer boundary that contains Users through Memberships, Businesses, commercial context, and shared platform context.
- **Owner:** Core Workspace Management
- **Produced By:** Authenticated Workspace creation or selection under Core policy
- **Consumed By:** Core Platform; Operating Systems through authorized context; Membership and commercial boundaries
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification. No anonymous Workspace state is permitted.
- **Inputs:** Authenticated customer intent; required Core context
- **Outputs:** Tenant identity and scope
- **Related Concepts:** Business; Workspace Membership; Core Workspace Ready
- **Distinguished From:** Business; Discovery Session; Operating System
- **Examples:** One customer account containing multiple Businesses
- **Non-Examples:** A company; an anonymous discovery container; a typed industry Workspace
- **Source Decisions:** ADR-003; ADR-004; ADR-034; ADR-042; PD-015
- **Source Documents:** [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Workspace Lifecycle](../../01-genesis/12-WORKSPACE-LIFECYCLE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)
- **Version:** 0.1
- **Status:** Approved canonical concept
- **Deprecated Terms or Replaced By:** Typed Workspace concepts are forbidden

### Domain: Business

- **Canonical Name:** Business
- **Canonical Truth:** Business is a legal or operational organization inside one Workspace and owns exactly one Business DNA identity.
- **Arabic Working Name:** Not assigned
- **Category:** Canonical organization concept
- **Definition:** A distinct organization that performs commercial or service activity and contains Business Units.
- **Owner:** Core Business Registry
- **Produced By:** Authenticated Business creation or selection under Core policy
- **Consumed By:** Business DNA Registry; Core intelligence; Operating Systems through Business Unit context
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Workspace context; authorized organization information
- **Outputs:** Canonical Business identity
- **Related Concepts:** Workspace; Business Unit; Business DNA
- **Distinguished From:** Workspace; Business Unit; Discovery Session
- **Examples:** A legal company or distinct operating organization within a customer Workspace
- **Non-Examples:** A Commerce branch; a tenant synonym; anonymous candidate understanding
- **Source Decisions:** ADR-003; ADR-004; ADR-005; ADR-040; PD-015
- **Source Documents:** [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Business DNA](../../01-genesis/03-BUSINESS-DNA.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)
- **Version:** 0.1
- **Status:** Approved canonical concept
- **Deprecated Terms or Replaced By:** Legacy BusinessUnit-as-Business mappings are implementation compatibility, not canonical terminology

### Domain: Business DNA

- **Canonical Name:** Business DNA
- **Canonical Truth:** Business DNA is the canonical, Business-scoped, versioned, governed, software-independent understanding of exactly one Business.
- **Arabic Working Name:** Not assigned
- **Category:** Canonical business knowledge
- **Definition:** The governed digital identity describing how a Business operates, independent of software, products, plans, or Operating System configuration.
- **Owner:** Core Business DNA Registry for the Business
- **Produced By:** Explicit authenticated approval and governed publication
- **Consumed By:** Business Brain; Recommendations; approved projections; Operating Systems through governed read context
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification. Candidate Business Understanding remains outside Business DNA until authenticated conversion and publication.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Approved candidate or revision material; provenance; validation; Business context
- **Outputs:** Published Business DNA version or revision
- **Related Concepts:** Business; Business DNA Revision; Candidate Business Understanding; Business Blueprint
- **Distinguished From:** Business Report Preview; Business Blueprint; software configuration; Workspace DNA
- **Examples:** Versioned approved operating model and goals for one Business
- **Non-Examples:** A report; a product list; merged Workspace-wide DNA
- **Source Decisions:** S02-D04; PD-013; PD-015; ADR-005; ADR-042
- **Source Documents:** [Genesis Business DNA](../../01-genesis/03-BUSINESS-DNA.md); [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)
- **Version:** 0.1
- **Status:** Approved canonical concept
- **Deprecated Terms or Replaced By:** `Workspace DNA` is not an approved replacement

### Domain: Business DNA Revision

- **Canonical Name:** Business DNA Revision
- **Canonical Truth:** A Business DNA Revision is a governed new version of one Business's existing Business DNA identity.
- **Arabic Working Name:** Not assigned
- **Category:** Canonical knowledge lifecycle
- **Definition:** An approved publication that changes, corrects, or extends Business DNA while preserving prior version history, provenance, and Business scope.
- **Owner:** Core Business DNA Registry
- **Produced By:** Guided Activation or another approved Business DNA governance flow
- **Consumed By:** Business Brain; Recommendations; approved projections; historical review
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification. Governed revisions preserve version identity and history.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Existing Business DNA version; proposed changes; Evidence; corrections; approval
- **Outputs:** New published Business DNA version
- **Related Concepts:** Business DNA; Guided Activation; Decision Lineage
- **Distinguished From:** Editing a published version in place; candidate understanding; rollback implementation
- **Examples:** Publishing a corrected operating-channel fact as the next governed version
- **Non-Examples:** Mutating Business DNA v1 silently
- **Source Decisions:** S02-D05; ADR-005; ADR-016; ADR-042; RFC-009
- **Version:** 0.1
- **Status:** Approved concept; detailed rollback policy deferred
- **Deprecated Terms or Replaced By:** Business DNA Snapshot is a retained architecture view of a published version, not a replacement

### Domain: Guided Activation

- **Canonical Name:** Guided Activation
- **Canonical Truth:** Guided Activation is the post-registration continuation of Business Architect that resolves material uncertainty and publishes governed Business DNA revisions.
- **Arabic Working Name:** Not assigned
- **Category:** Capability and Experience Pattern
- **Definition:** A Core Platform onboarding phase that reuses confirmed discovery knowledge, completes material gaps, validates facts, and prepares the governed authenticated Business Blueprint projection and Recommendations.
- **Owner:** Core Platform Business Architect
- **Produced By:** Authenticated conversion and onboarding continuation
- **Consumed By:** Authenticated Business participants; Business DNA governance; Report Projection
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Published Business DNA; remaining Knowledge Gaps; candidate material; corrections
- **Outputs:** Governed Business DNA Revisions; readiness evidence; governed projection inputs
- **Related Concepts:** Business Architect; Business DNA Revision; Business Blueprint
- **Distinguished From:** Pre-registration Business Discovery; OS-Specific Setup; Business DNA v1 publication
- **Examples:** Validating an uncertain operating fact after authentication before a governed revision
- **Non-Examples:** Configuring Commerce inventory or POS
- **Source Decisions:** S02-D05; S02-D06; PD-016; ADR-016; ADR-042
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** The authenticated part of the earlier generic Business Architect onboarding is clarified as Guided Activation

### Domain: Business Architect

- **Canonical Name:** Business Architect
- **Canonical Truth:** Business Architect is the Core-owned customer experience for guided business understanding; after conversion it continues as Guided Activation.
- **Arabic Working Name:** Not assigned
- **Category:** Product experience
- **Definition:** The governed product experience through which a customer participates in discovery, review, correction, activation, and preparation of governed authenticated business-understanding projections.
- **Owner:** Core Platform
- **Produced By:** Core product experience
- **Consumed By:** Visitors and authenticated Business participants
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Discovery Strategy; Candidate Business Understanding; Business DNA; Knowledge Gaps
- **Outputs:** Acquired knowledge; corrections; approval inputs; activation progress
- **Related Concepts:** Business Discovery; Guided Business Conversation; Guided Activation; Business Blueprint
- **Distinguished From:** Business Discovery Capability; Business Understanding Engine; OS-Specific Setup
- **Examples:** A guided experience that chooses conversation or another method according to the current gap
- **Non-Examples:** A long static form; an OS setup wizard; a canonical data store
- **Source Decisions:** S01-D05; S02-D05; PD-012; PD-016; ADR-015; ADR-016; ADR-042
- **Source Documents:** [Genesis Customer Journey](../../01-genesis/11-CUSTOMER-JOURNEY.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** Earlier definition as only an authenticated conversation is superseded by PD-012, PD-016, and ADR-042

### Domain: Business Blueprint

- **Canonical Name:** Business Blueprint
- **Canonical Truth:** Business Blueprint is a governed authenticated customer-facing projection of Business DNA and governed owner outputs; it is not the canonical data store.
- **Arabic Working Name:** Not assigned
- **Category:** Projection
- **Definition:** A presentation composed from Business DNA, business summary, identified operational needs, challenges, opportunities, readiness indicators, Recommended Capabilities, and an implementation roadmap.
- **Owner:** Core Platform Report Projection
- **Produced By:** Governed Business DNA, insight, Recommendation, and readiness outputs
- **Consumed By:** Authenticated customers; Product Hub journey; reviewers
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Business DNA version; Assessments; Needs; Opportunities; Recommendations; readiness
- **Outputs:** Customer-facing canonical onboarding result
- **Related Concepts:** Business DNA; Business Report Preview; Report Projection; Recommendation
- **Distinguished From:** Business DNA; Candidate Business Understanding; pre-registration Business Report Preview
- **Examples:** A governed presentation of how the Business operates, what it needs, and possible next steps
- **Non-Examples:** The aggregate that owns Business facts
- **Source Decisions:** S02-D05; PD-004; PD-014; PD-016; ADR-042
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Report Projection

- **Canonical Name:** Report Projection
- **Canonical Truth:** A Report Projection presents governed source and derived information without becoming its source of truth.
- **Arabic Working Name:** Not assigned
- **Category:** Projection responsibility
- **Definition:** The conceptual responsibility that composes authorized understanding, insight, Recommendations, lineage, and readiness into audience-appropriate reports.
- **Owner:** Core Platform projection boundary
- **Produced By:** Projection composition over owner-controlled inputs
- **Consumed By:** Business Report Preview; Business Blueprint; customer and reviewer experiences
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Permission-filtered engine and owner projections
- **Outputs:** Customer-facing report presentation
- **Related Concepts:** Business Report Preview; Business Blueprint; Explainability
- **Distinguished From:** Business DNA Registry; Recommendation Engine; canonical write model
- **Examples:** Composing a Blueprint from a named Business DNA and Recommendation version
- **Non-Examples:** Writing back to Business DNA from rendered report content
- **Source Decisions:** S03-D01; ADR-020; ADR-042
- **Version:** 0.1
- **Status:** Approved conceptual responsibility
- **Deprecated Terms or Replaced By:** None

### Domain: Product Hub

- **Canonical Name:** Product Hub
- **Canonical Truth:** Product Hub composes product-access context and routes to owning experiences; it does not own Recommendations, OS setup, or operational data.
- **Arabic Working Name:** Not assigned
- **Category:** Core Platform experience and composition boundary
- **Definition:** The Core-owned place for contextual product discovery, access-state composition, selection, handoff, launch, and recovery navigation.
- **Owner:** Core Platform Product Hub
- **Produced By:** Core Platform architecture
- **Consumed By:** Authenticated Workspace and Business participants
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification. Product Hub composes owner projections and does not own their states.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Business context; Recommendations; product catalog; entitlement, subscription, installation, and readiness projections
- **Outputs:** Contextual presentation; selection intent; secure setup or launch handoff
- **Related Concepts:** Recommendation; Implementation Option; Operating System; OS-Specific Setup
- **Distinguished From:** Recommendation Engine; Marketplace; OS operational shell; product source registry
- **Examples:** Presenting Commerce OS as one disclosed option and routing to Commerce-owned setup
- **Non-Examples:** Writing a Commerce order or declaring Commerce ready
- **Source Decisions:** ADR-019; ADR-020; ADR-024; PD-009; ADR-042
- **Source Documents:** [Genesis Product Hub](../../01-genesis/13-PRODUCT-HUB.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Operating System

- **Canonical Name:** Operating System
- **Canonical Truth:** An Operating System is an independently usable business application that owns one operational domain and operates on Business Units.
- **Arabic Working Name:** Not assigned
- **Category:** Independent application and bounded context
- **Definition:** A product that owns its UI, setup, operational model, facts, workflows, reports, settings, permission semantics, and release lifecycle within one domain.
- **Owner:** The applicable Operating System
- **Produced By:** Approved Operating System architecture and product lifecycle
- **Consumed By:** Authorized customers through Product Hub handoff and OS navigation
- **Lifecycle:** Available → Recommended → Selected and Subscribed → Installed → Configured → Activated → Operating System Ready → Operational → Extended → Upgraded → Paused → Archived → Removed.
- **States:** Available; Recommended; Selected and Subscribed; Installed; Configured; Activated; Operating System Ready; Operational; Extended; Upgraded; Paused; Archived; Removed. Explicitly defined by the [Genesis Operating System Lifecycle](../../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md#operating-system-lifecycle).
- **Inputs:** Authorized Core context; selected Business Unit; owner-controlled operational input
- **Outputs:** Operational behavior and facts; readiness projection; reports
- **Related Concepts:** Product Hub; OS-Specific Setup; Operating System Ready
- **Distinguished From:** Core Platform; Capability; OS Module; Workspace
- **Examples:** Commerce OS
- **Non-Examples:** A shared Core feature; an industry-typed Workspace; a module presented as an OS
- **Source Decisions:** ADR-024; ADR-025; ADR-026; ADR-040; PD-009
- **Source Documents:** [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Operating System Lifecycle](../../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)
- **Version:** 0.1
- **Status:** Approved canonical concept
- **Deprecated Terms or Replaced By:** Separate Restaurant or Pharmacy applications are not approved OS concepts

### Domain: OS-Specific Setup

- **Canonical Name:** OS-Specific Setup
- **Canonical Truth:** OS-Specific Setup is owned by the selected Operating System and prepares its operational context without becoming Core Guided Activation.
- **Arabic Working Name:** Not assigned
- **Category:** Operating System lifecycle
- **Definition:** The owner-controlled process that gathers and validates information required for the Operating System's modules, workflows, permissions, configuration, and readiness.
- **Owner:** Selected Operating System
- **Produced By:** Product Hub handoff after selection and applicable commercial conditions
- **Consumed By:** Authorized OS participants and OS readiness evaluation
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Authorized Workspace, Business, Business Unit, actor, product, and subscription context; OS-specific information
- **Outputs:** OS-owned setup and configuration state; readiness evidence
- **Related Concepts:** Guided Activation; Product Hub; Operating System Ready
- **Distinguished From:** Business Discovery; Guided Activation; subscription; activation
- **Examples:** Commerce-owned setup of operational modules and defaults
- **Non-Examples:** Publishing Business DNA; selecting a plan alone
- **Source Decisions:** S02-D06; ADR-018; ADR-019; ADR-024; ADR-026
- **Source Documents:** [Genesis Customer Journey](../../01-genesis/11-CUSTOMER-JOURNEY.md); [Genesis Operating System Lifecycle](../../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** Generic `platform setup` must not collapse Core and OS setup

### Domain: Core Workspace Ready

- **Canonical Name:** Core Workspace Ready
- **Canonical Truth:** Core Workspace Ready is a Core readiness outcome and does not imply that any Operating System is ready.
- **Arabic Working Name:** Not assigned
- **Category:** Readiness state
- **Definition:** The state in which authenticated Workspace and selected Business context, sufficient governed Business DNA, and required initial Core analysis and Recommendations satisfy the approved Core readiness criteria.
- **Owner:** Core Platform Readiness Service
- **Produced By:** Core readiness evaluation over owner-controlled evidence
- **Consumed By:** Product Hub; platform navigation; customer readiness presentation
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification. Core Workspace Ready remains the approved named outcome and criteria set.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Workspace context; selected Business; Business DNA; required Core outputs
- **Outputs:** Core readiness result and unmet requirements
- **Related Concepts:** Business DNA; Product Hub; Operating System Ready
- **Distinguished From:** Workspace creation; subscription; Operating System Ready
- **Examples:** The customer may enter Product Hub with sufficient Core context while Commerce remains unconfigured
- **Non-Examples:** Commerce subscription exists
- **Source Decisions:** ADR-018; PD-004; PD-016; Customer Journey v1.2
- **Source Documents:** [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Customer Journey](../../01-genesis/11-CUSTOMER-JOURNEY.md); [Genesis Workspace Lifecycle](../../01-genesis/12-WORKSPACE-LIFECYCLE.md)
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** None

### Domain: Operating System Ready

- **Canonical Name:** Operating System Ready
- **Canonical Truth:** Operating System Ready is an owner-controlled OS readiness outcome distinct from Core Workspace Ready and commercial subscription.
- **Arabic Working Name:** Not assigned
- **Category:** Readiness state
- **Definition:** The state reached when the selected Operating System's applicable subscription, installation, OS-Specific Setup, configuration, activation, authorization, and readiness conditions are satisfied.
- **Owner:** Selected Operating System, with Core commercial conditions supplied by their owners
- **Produced By:** OS readiness evaluation
- **Consumed By:** OS launch and operational navigation; Product Hub projection
- **Lifecycle:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification. Operating System Ready remains the approved named outcome and criteria set.
- **States:** Exact lifecycle states are not standardized by Foundation Baseline v0.1 and remain subject to an approved UX or owning-domain specification.
- **Inputs:** Owner projections for subscription, installation, setup, configuration, activation, permissions, and operational context
- **Outputs:** Readiness result and unmet requirements
- **Related Concepts:** Core Workspace Ready; OS-Specific Setup; Operational
- **Distinguished From:** Subscription; installation; activation alone; Core readiness
- **Examples:** Commerce is launchable only after its owner-defined readiness conditions pass
- **Non-Examples:** The customer selected a Commerce plan
- **Source Decisions:** ADR-018; ADR-023; ADR-026; PD-009
- **Source Documents:** [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Operating System Lifecycle](../../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)
- **Version:** 0.1
- **Status:** Approved
- **Deprecated Terms or Replaced By:** Legacy `OSEnablement` does not replace this distinct state

## Extended Architecture Glossary

### NexoraXS Platform

- **Name:** NexoraXS Platform
- **Definition:** The unified Business Operating Intelligence Platform composed of Core Platform, independent Operating Systems, Marketplace, Knowledge, intelligence, and AI.
- **Owner:** NexoraXS
- **Scope:** Platform
- **Related Concepts:** Core Platform; Operating System; Marketplace; Business Brain
- **Deprecated Terms:** `Nexoraxs` is historical capitalization; use `NexoraXS` in current documents.
- **Source Documents:** [Genesis Vision](../../01-genesis/01-VISION.md); [Genesis Platform Blueprint](../../01-genesis/09-PLATFORM-BLUEPRINT.md); [Genesis Platform Ecosystem](../../01-genesis/20-PLATFORM-ECOSYSTEM.md)

### Core Platform

- **Name:** Core Platform
- **Definition:** The shared control, organizational, commercial, governance, and intelligence foundation of NexoraXS.
- **Owner:** NexoraXS Core Platform
- **Scope:** Platform
- **Related Concepts:** Workspace; Business DNA; Product Hub; Marketplace; AI Coordinator
- **Source Documents:** [Genesis Platform Blueprint](../../01-genesis/09-PLATFORM-BLUEPRINT.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### User

- **Name:** User
- **Definition:** The Core login identity of a person who authenticates to NexoraXS.
- **Owner:** Core Identity and Access
- **Scope:** Platform/User
- **Related Concepts:** Workspace Membership; Authorization Context
- **Source Documents:** [Genesis Workspace Lifecycle](../../01-genesis/12-WORKSPACE-LIFECYCLE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Workspace Membership

- **Name:** Workspace Membership
- **Definition:** The relationship that grants a User participation in one Workspace and forms the basis for roles and scoped access.
- **Owner:** Core Identity and Access
- **Scope:** Workspace
- **Related Concepts:** User; Workspace; Permission; Authorization Context
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Permission

- **Name:** Permission
- **Definition:** A named authorization grant evaluated at its applicable Workspace, Business, Business Unit, Department, Branch, OS, resource, or action scope.
- **Owner:** Core Identity and Access
- **Scope:** Declared resource scope
- **Related Concepts:** Workspace Membership; Authorization Context; Operating System
- **Source Documents:** [Genesis Platform Blueprint](../../01-genesis/09-PLATFORM-BLUEPRINT.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Authorization Context

- **Name:** Authorization Context
- **Definition:** The resolved actor, tenant, organizational, OS, resource, permission, entitlement, and lifecycle context used for an authorization decision.
- **Owner:** Core Identity and Access plus owning domain
- **Scope:** Protected operation
- **Related Concepts:** User; Workspace; Permission; Workspace Entitlement
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Consolidation Reference: Workspace

- **Canonical Entry:** [Domain: Workspace](#domain-workspace)
- **Status:** Consolidated reference; not a second canonical definition
- **Provenance:** The compact Extended Architecture Glossary record was consolidated into the complete Foundation Domain Lexicon record. Its source-document references are preserved there.

### Consolidation Reference: Business

- **Canonical Entry:** [Domain: Business](#domain-business)
- **Status:** Consolidated reference; not a second canonical definition
- **Provenance:** The compact Extended Architecture Glossary record was consolidated into the complete Foundation Domain Lexicon record. Its source-document references are preserved there.

### Business Unit

- **Name:** Business Unit
- **Definition:** A logical operating division inside one Business on which Operating Systems operate.
- **Owner:** Core Organization Registry for identity; applicable OS for operational data
- **Scope:** Business
- **Related Concepts:** Business; Department; Branch; Operating System
- **Source Documents:** [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Workspace Lifecycle](../../01-genesis/12-WORKSPACE-LIFECYCLE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Department

- **Name:** Department
- **Definition:** An internal organizational subdivision that organizes people or responsibilities inside one Business Unit.
- **Owner:** Core Organization Registry
- **Scope:** Business Unit
- **Related Concepts:** Business Unit; Branch
- **Source Documents:** [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Workspace Lifecycle](../../01-genesis/12-WORKSPACE-LIFECYCLE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Branch

- **Name:** Branch
- **Definition:** A physical or virtual operating location that belongs to exactly one Business Unit.
- **Owner:** Core Organization Registry for identity; applicable OS for operational data
- **Scope:** Business Unit
- **Related Concepts:** Business Unit; Department; Operating System
- **Source Documents:** [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Workspace Lifecycle](../../01-genesis/12-WORKSPACE-LIFECYCLE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Consolidation Reference: Business DNA

- **Canonical Entry:** [Domain: Business DNA](#domain-business-dna)
- **Status:** Consolidated reference; not a second canonical definition
- **Provenance:** The compact Extended Architecture Glossary record was consolidated into the complete Foundation Domain Lexicon record. Its source-document references are preserved there.

### Business DNA Identity

- **Name:** Business DNA Identity
- **Definition:** The stable identity of one Business's Business DNA across its version history.
- **Owner:** Core Business DNA Registry
- **Scope:** Business
- **Related Concepts:** Business DNA; Business DNA Snapshot
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Core Business DNA

- **Name:** Core Business DNA
- **Definition:** The minimum part of one Business's Business DNA required to generate initial Recommendations.
- **Owner:** Core Business DNA Registry
- **Scope:** Business
- **Related Concepts:** Business DNA; Core Workspace Ready; Business Architect Pipeline
- **Source Documents:** [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Customer Journey](../../01-genesis/11-CUSTOMER-JOURNEY.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Business DNA Snapshot

- **Name:** Business DNA Snapshot
- **Definition:** A published, versioned view of one Business DNA identity at a point in time.
- **Owner:** Core Business DNA Registry
- **Scope:** Business
- **Related Concepts:** Business DNA Identity; Business DNA Fact; Provenance
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Business DNA Fact

- **Name:** Business DNA Fact
- **Definition:** A structured statement about one Business stored as part of its Business DNA.
- **Owner:** Core Business DNA Registry
- **Scope:** Business
- **Related Concepts:** Candidate Fact; Provenance; Business DNA Snapshot
- **Source Documents:** [Genesis Business DNA](../../01-genesis/03-BUSINESS-DNA.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Provenance

- **Name:** Provenance
- **Definition:** The source, actor, time, confidence, assumptions, evidence, and transformation history that explains a fact or decision input.
- **Owner:** Owning Core domain
- **Scope:** Fact or decision record
- **Related Concepts:** Business DNA Fact; Recommendation; Rule; AI Interaction
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Workspace Intelligence Aggregation

- **Name:** Workspace Intelligence Aggregation
- **Definition:** An explicit, non-destructive projection over selected Business DNA identities for Workspace-level analysis.
- **Owner:** Core intelligence projection
- **Scope:** Workspace over an explicit Business set
- **Related Concepts:** Workspace; Business DNA; Product Hub
- **Source Documents:** [Genesis Business DNA](../../01-genesis/03-BUSINESS-DNA.md); [Genesis Product Hub](../../01-genesis/13-PRODUCT-HUB.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Consolidation Reference: Business Architect

- **Canonical Entry:** [Domain: Business Architect](#domain-business-architect)
- **Status:** Consolidated reference; not a second canonical definition
- **Provenance:** The compact Extended Architecture Glossary record was consolidated into the complete Foundation Domain Lexicon record. Its source-document references are preserved there.

### Business Architect Pipeline

- **Name:** Business Architect Pipeline
- **Definition:** The resumable governed flow from authorized Business context through evidence, inference, questions, validation, review, DNA publication, analysis, and readiness.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Business Architect; Business DNA Snapshot; Core Workspace Ready
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Business Architect Session

- **Name:** Business Architect Session
- **Definition:** One resumable execution of the Business Architect Pipeline for one Workspace, one Business, and one initiating actor.
- **Owner:** Core Business Architect
- **Scope:** Business
- **Related Concepts:** Pipeline State Store; Candidate Fact; Review Checkpoint
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Candidate Fact

- **Name:** Candidate Fact
- **Definition:** A customer-provided, normalized, imported, or inferred Business fact that has not yet become published Business DNA.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Business DNA Fact; Provenance; Review Checkpoint
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Review Checkpoint

- **Name:** Review Checkpoint
- **Definition:** The pipeline stage that presents material facts, inferences, conflicts, and assumptions for customer correction or confirmation.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Candidate Fact; DNA Publisher
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Session Orchestrator

- **Name:** Session Orchestrator
- **Definition:** The Business Architect component that creates, resumes, expires, and completes a session for one Workspace and Business.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Pipeline State Store; Business Architect Pipeline
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Context Resolver

- **Name:** Context Resolver
- **Definition:** The component that loads authorized Workspace, Business, locale, existing DNA, prior answers, Knowledge, and Rule context for the pipeline.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Authorization Context; Knowledge; Rule
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Evidence Collector

- **Name:** Evidence Collector
- **Definition:** The Business Architect component that collects customer answers and permitted existing or imported evidence.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Candidate Fact; Provenance
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Inference Service

- **Name:** Inference Service
- **Definition:** The Business Architect component that proposes facts reasonably inferred from authorized evidence and records confidence and assumptions.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Candidate Fact; Provenance; Question Planner
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Question Planner

- **Name:** Question Planner
- **Definition:** The Business Architect component that selects the smallest useful next question based on missing or uncertain Core Business DNA.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Inference Service; Conversation Adapter; Core Business DNA
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Conversation Adapter

- **Name:** Conversation Adapter
- **Definition:** The Business Architect component that presents localized conversational interaction while preserving structured canonical identifiers.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Question Planner; Answer Normalizer
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Answer Normalizer

- **Name:** Answer Normalizer
- **Definition:** The Business Architect component that retains raw answers and produces typed Candidate Facts.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Conversation Adapter; Candidate Fact; Provenance Registry
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Provenance Registry

- **Name:** Provenance Registry
- **Definition:** The Business Architect component that records source type, evidence, actor, time, confidence, and transformation history for Candidate Facts.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Provenance; Candidate Fact
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### DNA Assembler and Validator

- **Name:** DNA Assembler and Validator
- **Definition:** The component that builds candidate Core Business DNA and applies schema, ontology, Rule, and cross-field validation.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Core Business DNA; Rule; Review Checkpoint
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### DNA Publisher

- **Name:** DNA Publisher
- **Definition:** The component that publishes the next Business DNA Snapshot without changing Knowledge or software configuration.
- **Owner:** Core Business DNA Registry
- **Scope:** Business
- **Related Concepts:** Business DNA Snapshot; Analysis Trigger
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Analysis Trigger

- **Name:** Analysis Trigger
- **Definition:** The component that invokes Business Brain, Recommendation Engine, and Readiness Service against the published input versions.
- **Owner:** Core Business Architect orchestration
- **Scope:** Published Business DNA Snapshot
- **Related Concepts:** Business Brain; Recommendation Engine; Readiness Service
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Pipeline State Store

- **Name:** Pipeline State Store
- **Definition:** The store of Business Architect stage, checkpoints, outstanding questions, recoverable errors, expiry, and idempotency outside published Business DNA.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Session Orchestrator; Review Checkpoint
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Industry

- **Name:** Industry
- **Definition:** A description of what a Business does; industries are combinations of Capabilities and are not software.
- **Owner:** NexoraXS Platform ontology
- **Scope:** Platform taxonomy and Business DNA
- **Related Concepts:** Capability; Business DNA; Knowledge
- **Source Documents:** [Genesis Business DNA](../../01-genesis/03-BUSINESS-DNA.md); [Genesis Capabilities](../../01-genesis/04-CAPABILITIES.md); [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md)

### Business Stage

- **Name:** Business Stage
- **Definition:** The maturity state of a Business used to adapt Recommendations, including Startup, Growing, Scaling, and Enterprise in Business DNA.
- **Owner:** Business
- **Scope:** Business
- **Related Concepts:** Business DNA; Business Lifecycle; Recommendation
- **Source Documents:** [Genesis Business DNA](../../01-genesis/03-BUSINESS-DNA.md); [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Business Lifecycle](../../01-genesis/15-BUSINESS-LIFECYCLE.md)

### Business Lifecycle

- **Name:** Business Lifecycle
- **Definition:** The Genesis progression through Business Idea, Launch, Operate, Grow, Scale, Expand, Enterprise, and Global.
- **Owner:** Business; interpreted by Business Brain
- **Scope:** Business
- **Related Concepts:** Business Stage; Recommendation; Customer Journey
- **Source Documents:** [Genesis Business Lifecycle](../../01-genesis/15-BUSINESS-LIFECYCLE.md); [Genesis Business Brain](../../01-genesis/06-BUSINESS-BRAIN.md)

### Consolidation Reference: Capability

- **Canonical Entry:** [Domain: Capability](#domain-capability)
- **Status:** Consolidated reference; not a second canonical definition
- **Provenance:** The compact Extended Architecture Glossary record was consolidated into the complete Foundation Domain Lexicon record. Its source-document references are preserved there.

### Capability Registry

- **Name:** Capability Registry
- **Definition:** The Core component that maintains canonical, versioned Capability definitions and metadata.
- **Owner:** Core Platform
- **Scope:** Platform
- **Related Concepts:** Capability; Business Brain; Product and Plan Catalog
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Module

- **Name:** Module
- **Definition:** A functional area inside an Operating System and an implementation detail of that OS.
- **Owner:** Owning Operating System
- **Scope:** Operating System
- **Related Concepts:** Capability; Operating System
- **Source Documents:** [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis OS Lifecycle](../../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Knowledge

- **Name:** Knowledge
- **Definition:** Structured business expertise including Rules, workflows, KPIs, compliance, terminology, Recommendations, and best practices.
- **Owner:** NexoraXS Platform
- **Scope:** Platform with applicability context
- **Related Concepts:** Knowledge Object; Knowledge Engine; Knowledge Pack
- **Source Documents:** [Genesis Knowledge Engine](../../01-genesis/05-KNOWLEDGE-ENGINE.md); [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md)

### Knowledge Object

- **Name:** Knowledge Object
- **Definition:** One structured, sourced, versioned unit of platform Knowledge.
- **Owner:** Knowledge Engine
- **Scope:** Platform/versioned applicability
- **Related Concepts:** Knowledge; Rule; Knowledge Pack
- **Source Documents:** [Genesis Knowledge Engine](../../01-genesis/05-KNOWLEDGE-ENGINE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Knowledge Engine

- **Name:** Knowledge Engine
- **Definition:** The central source that governs shared structured Business Knowledge and its lifecycle.
- **Owner:** Core Platform
- **Scope:** Platform
- **Related Concepts:** Knowledge Object; Business Brain; AI Expert
- **Source Documents:** [Genesis Knowledge Engine](../../01-genesis/05-KNOWLEDGE-ENGINE.md); [Genesis Platform Blueprint](../../01-genesis/09-PLATFORM-BLUEPRINT.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Knowledge Pack

- **Name:** Knowledge Pack
- **Definition:** A shared, immutable, versioned Knowledge asset that additively extends the Knowledge Engine.
- **Owner:** Marketplace and Knowledge Engine
- **Scope:** Platform asset; Workspace activation; optional Business applicability
- **Related Concepts:** Knowledge; Marketplace Asset; AI Expert
- **Source Documents:** [Genesis Knowledge Packs](../../01-genesis/18-KNOWLEDGE-PACKS.md); [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Rule

- **Name:** Rule
- **Definition:** A deterministic, versioned, explainable platform asset applied to governed decisions.
- **Owner:** Core Rules domain
- **Scope:** Platform/versioned applicability
- **Related Concepts:** Rules Engine; Knowledge; Recommendation
- **Source Documents:** [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Rules Engine

- **Name:** Rules Engine
- **Definition:** The deterministic Core component that evaluates versioned Rules and returns traceable outcomes.
- **Owner:** Core Platform
- **Scope:** Platform
- **Related Concepts:** Rule; Business Brain; Configuration Engine
- **Source Documents:** [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Platform Blueprint](../../01-genesis/09-PLATFORM-BLUEPRINT.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Business Brain

- **Name:** Business Brain
- **Definition:** The shared platform decision engine that interprets Business DNA using Knowledge, Rules, context, and permitted analytics.
- **Owner:** Core Platform
- **Scope:** Business by default; explicit Workspace aggregation when requested
- **Related Concepts:** Business DNA; Knowledge Engine; Recommendation Engine
- **Source Documents:** [Genesis Business Brain](../../01-genesis/06-BUSINESS-BRAIN.md); [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Business Brain Decision

- **Name:** Business Brain Decision
- **Definition:** A traceable decision record produced by Business Brain from pinned governed inputs.
- **Owner:** Core intelligence
- **Scope:** Business or explicit Workspace aggregation
- **Related Concepts:** Business Brain; Recommendation; Provenance
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Consolidation Reference: Recommendation

- **Canonical Entry:** [Domain: Recommendation](#domain-recommendation)
- **Status:** Consolidated reference; not a second canonical definition
- **Provenance:** The compact Extended Architecture Glossary record was consolidated into the complete Foundation Domain Lexicon record. Its source-document references are preserved there.

### Consolidation Reference: Recommendation Engine

- **Canonical Entry:** [Domain: Recommendation Engine](#domain-recommendation-engine)
- **Status:** Consolidated reference; not a second canonical definition
- **Provenance:** The compact Extended Architecture Glossary record was consolidated into the complete Foundation Domain Lexicon record. Its source-document references are preserved there.

### Consolidation Reference: Implementation Option

- **Canonical Entry:** [Domain: Implementation Option](#domain-implementation-option)
- **Status:** Consolidated reference; not a second canonical definition
- **Provenance:** The compact Extended Architecture Glossary record was consolidated into the complete Foundation Domain Lexicon record. Its source-document references are preserved there.

### Configuration Engine

- **Name:** Configuration Engine
- **Definition:** The Core component that transforms accepted Recommendations into versioned Configuration Proposals.
- **Owner:** Core Platform
- **Scope:** Target configuration scope
- **Related Concepts:** Recommendation; Configuration Proposal; Operating System
- **Source Documents:** [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Business Brain](../../01-genesis/06-BUSINESS-BRAIN.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)

### Configuration Proposal

- **Name:** Configuration Proposal
- **Definition:** A traceable versioned proposal for platform or OS configuration that the owning target validates and applies.
- **Owner:** Core Configuration Engine; target owns application
- **Scope:** Workspace, Business, Business Unit, or OS target
- **Related Concepts:** Configuration Engine; Recommendation; OS-Specific Setup
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Readiness Service

- **Name:** Readiness Service
- **Definition:** The Core component that evaluates Core Workspace Ready and observes Operating System readiness milestones.
- **Owner:** Core Platform
- **Scope:** Workspace/Business/OS context
- **Related Concepts:** Readiness Assessment; Core Workspace Ready; Operating System Ready
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Readiness Assessment

- **Name:** Readiness Assessment
- **Definition:** An evaluation of a named readiness state against explicit criteria with unmet requirements.
- **Owner:** Core Readiness Service; OS contributes OS state
- **Scope:** Workspace/Business/OS context
- **Related Concepts:** Core Workspace Ready; Operating System Ready
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Consolidation Reference: Core Workspace Ready

- **Canonical Entry:** [Domain: Core Workspace Ready](#domain-core-workspace-ready)
- **Status:** Consolidated reference; not a second canonical definition
- **Provenance:** The compact Extended Architecture Glossary record was consolidated into the complete Foundation Domain Lexicon record. Its source-document references are preserved there.

### Consolidation Reference: Operating System Ready

- **Canonical Entry:** [Domain: Operating System Ready](#domain-operating-system-ready)
- **Status:** Consolidated reference; not a second canonical definition
- **Provenance:** The compact Extended Architecture Glossary record was consolidated into the complete Foundation Domain Lexicon record. Its source-document references are preserved there.

### Consolidation Reference: Operating System

- **Canonical Entry:** [Domain: Operating System](#domain-operating-system)
- **Status:** Consolidated reference; not a second canonical definition
- **Provenance:** The compact Extended Architecture Glossary record was consolidated into the complete Foundation Domain Lexicon record. Its source-document references are preserved there.

### Operating System Lifecycle

- **Name:** Operating System Lifecycle
- **Definition:** The standard progression from Available through Recommended, Selected and Subscribed, Installed, Configured, Activated, Ready, Operational, Extended, Upgraded, Paused, Archived, and Removed.
- **Owner:** Core control plane and owning OS by stage
- **Scope:** Workspace/OS and operational context
- **Related Concepts:** OS Subscription; OS Installation; Operating System Ready
- **Source Documents:** [Genesis OS Lifecycle](../../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### OS Product

- **Name:** OS Product
- **Definition:** The canonical catalog representation of one independent Operating System.
- **Owner:** Core Product and Plan Catalog
- **Scope:** Platform/OS
- **Related Concepts:** Operating System; Plan; Product Hub
- **Source Documents:** [Genesis Product Hub](../../01-genesis/13-PRODUCT-HUB.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Plan

- **Name:** Plan
- **Definition:** A canonical commercial level for an Operating System: Starter, Pro, Business, or Enterprise with matching lowercase code.
- **Owner:** Core Product and Plan Catalog; commercial owner
- **Scope:** Operating System
- **Related Concepts:** OS Product; OS Subscription; Workspace Entitlement
- **Source Documents:** [Genesis Subscription Model](../../01-genesis/14-SUBSCRIPTION-MODEL.md); [Genesis Customer Journey](../../01-genesis/11-CUSTOMER-JOURNEY.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Product and Plan Catalog

- **Name:** Product and Plan Catalog
- **Definition:** The Core component that owns OS metadata, Plan definitions, Capability mappings, compatibility, and setup destinations.
- **Owner:** Core Platform
- **Scope:** Platform
- **Related Concepts:** OS Product; Plan; Product Hub
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Consolidation Reference: Product Hub

- **Canonical Entry:** [Domain: Product Hub](#domain-product-hub)
- **Status:** Consolidated reference; not a second canonical definition
- **Provenance:** The compact Extended Architecture Glossary record was consolidated into the complete Foundation Domain Lexicon record. Its source-document references are preserved there.

### Hub Context Resolver

- **Name:** Hub Context Resolver
- **Definition:** The Product Hub component that resolves actor, Workspace, selected Business, optional aggregation, locale, permission, and lifecycle context.
- **Owner:** Core Product Hub
- **Scope:** Product Hub session/request
- **Related Concepts:** Authorization Context; Product Hub Projection
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Recommendation Feed

- **Name:** Recommendation Feed
- **Definition:** The Product Hub component that presents business improvement and Capability Recommendations with evidence and disposition.
- **Owner:** Core Product Hub
- **Scope:** Selected Business or explicit aggregation
- **Related Concepts:** Recommendation; Implementation Option Mapper
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Implementation Option Mapper

- **Name:** Implementation Option Mapper
- **Definition:** The Product Hub component that resolves governed OS, Plan, and Marketplace options already mapped to Recommendations.
- **Owner:** Core intelligence/Product Hub composition
- **Scope:** Recommendation context
- **Related Concepts:** Implementation Option; Eligibility and Dependency Evaluator
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Product Catalog Projection

- **Name:** Product Catalog Projection
- **Definition:** The customer-facing Product Hub projection of canonical OS Product and Plan metadata.
- **Owner:** Core Product Hub projection
- **Scope:** Product Hub context
- **Related Concepts:** Product and Plan Catalog; OS Product
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Eligibility and Dependency Evaluator

- **Name:** Eligibility and Dependency Evaluator
- **Definition:** The Product Hub component that evaluates country, compatibility, Plan, subscription, entitlement, permission, and declared dependencies.
- **Owner:** Core Product Hub using owner contracts
- **Scope:** Implementation Option context
- **Related Concepts:** Workspace Entitlement; OS Subscription; Plan
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Product Lifecycle Projection

- **Name:** Product Lifecycle Projection
- **Definition:** The Product Hub composition of availability, Recommendation, subscription, installation, setup, activation, readiness, pause, and update states.
- **Owner:** Core Product Hub projection
- **Scope:** Workspace/Business/OS context
- **Related Concepts:** Operating System Lifecycle; Product Hub Projection
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Plan Comparison and Selection

- **Name:** Plan Comparison and Selection
- **Definition:** The Product Hub component that presents canonical Plans and records explicit customer selection.
- **Owner:** Core Product Hub
- **Scope:** Workspace/selected Business/OS
- **Related Concepts:** Plan; OS Subscription; Subscription Coordinator
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Subscription Coordinator

- **Name:** Subscription Coordinator
- **Definition:** The Product Hub component that sends subscription commands to the owning commercial component.
- **Owner:** Core Product Hub orchestration
- **Scope:** Workspace/OS
- **Related Concepts:** OS Subscription; Plan Comparison and Selection
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Installation and Activation Coordinator

- **Name:** Installation and Activation Coordinator
- **Definition:** The Core control-plane component that coordinates platform-side OS and Marketplace installation and activation operations.
- **Owner:** Core Platform control plane
- **Scope:** Workspace/product/context
- **Related Concepts:** OS Installation; OS Activation; Marketplace Installation
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Setup Handoff Router

- **Name:** Setup Handoff Router
- **Definition:** The Product Hub component that creates a signed, short-lived, context-bound handoff to OS-owned setup.
- **Owner:** Core Product Hub
- **Scope:** Workspace/Business/OS setup transition
- **Related Concepts:** Setup Handoff; OS-Specific Setup
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Business Health and Growth View

- **Name:** Business Health and Growth View
- **Definition:** The Product Hub view of permitted health, maturity, coverage, risk, and growth projections from intelligence components.
- **Owner:** Core Product Hub projection
- **Scope:** Selected Business or explicit Workspace aggregation
- **Related Concepts:** Business Brain; Recommendation; Product Hub
- **Source Documents:** [Genesis Product Hub](../../01-genesis/13-PRODUCT-HUB.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Marketplace Discovery Adapter

- **Name:** Marketplace Discovery Adapter
- **Definition:** The Product Hub adapter that queries eligible Marketplace Assets and scoped state through Marketplace contracts.
- **Owner:** Core Product Hub
- **Scope:** Selected Business/Workspace
- **Related Concepts:** Marketplace; Marketplace Asset; Marketplace Applicability
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Product Hub Projection

- **Name:** Product Hub Projection
- **Definition:** A reconstructable Business-context read model combining owner-provided Recommendation, catalog, commercial, lifecycle, Marketplace, and readiness state.
- **Owner:** Core Product Hub projection
- **Scope:** Selected Business or explicit aggregation
- **Related Concepts:** Product Lifecycle Projection; Recommendation Feed
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Setup Handoff

- **Name:** Setup Handoff
- **Definition:** A signed, short-lived, opaque reference used to re-resolve authorized context when moving from Core to OS setup.
- **Owner:** Core Product Hub; destination revalidates
- **Scope:** Cross-application transition
- **Related Concepts:** Setup Handoff Router; OS-Specific Setup; Navigation Architecture
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Workspace Entitlement

- **Name:** Workspace Entitlement
- **Definition:** The mandatory Workspace-level platform-access relationship available during onboarding and included with active OS Subscription during MVP.
- **Owner:** Core commercial control
- **Scope:** Workspace
- **Related Concepts:** Core Platform; OS Subscription; Product Hub
- **Source Documents:** [Genesis Subscription Model](../../01-genesis/14-SUBSCRIPTION-MODEL.md); [Genesis Customer Journey](../../01-genesis/11-CUSTOMER-JOURNEY.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### OS Subscription

- **Name:** OS Subscription
- **Definition:** The Workspace-level commercial relationship for one Operating System and selected Plan.
- **Owner:** Core commercial control
- **Scope:** Workspace and OS
- **Related Concepts:** Workspace Entitlement; Plan; Operating System Lifecycle
- **Source Documents:** [Genesis Subscription Model](../../01-genesis/14-SUBSCRIPTION-MODEL.md); [Genesis OS Lifecycle](../../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### OS Installation

- **Name:** OS Installation
- **Definition:** The lifecycle state or operation in which an Operating System is installed for a Workspace before OS-owned setup and operation.
- **Owner:** Core installation control plane
- **Scope:** Workspace and OS
- **Related Concepts:** OS Subscription; OS-Specific Setup; OS Activation
- **Source Documents:** [Genesis OS Lifecycle](../../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Consolidation Reference: OS-Specific Setup

- **Canonical Entry:** [Domain: OS-Specific Setup](#domain-os-specific-setup)
- **Status:** Consolidated reference; not a second canonical definition
- **Provenance:** The compact Extended Architecture Glossary record was consolidated into the complete Foundation Domain Lexicon record. Its source-document references are preserved there.

### OS Configuration

- **Name:** OS Configuration
- **Definition:** The OS-owned lifecycle state in which validated configuration derived from Business context is applied to the OS.
- **Owner:** Selected Operating System
- **Scope:** Business Unit and OS
- **Related Concepts:** Configuration Proposal; OS Activation
- **Source Documents:** [Genesis OS Lifecycle](../../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### OS Activation

- **Name:** OS Activation
- **Definition:** The lifecycle state in which an installed and configured OS becomes available to authorized users and its access and navigation become effective.
- **Owner:** Core control plane and selected OS
- **Scope:** Workspace/Business/Business Unit/OS
- **Related Concepts:** OS Configuration; Operating System Ready
- **Source Documents:** [Genesis OS Lifecycle](../../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Operational

- **Name:** Operational
- **Definition:** The OS lifecycle state in which daily domain activities have begun after Operating System Ready.
- **Owner:** Selected Operating System
- **Scope:** Business Unit/OS
- **Related Concepts:** Operating System Ready; Operating System Lifecycle
- **Source Documents:** [Genesis OS Lifecycle](../../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Marketplace

- **Name:** Marketplace
- **Definition:** The governed distribution bounded context for versioned business assets within the Core Platform offering.
- **Owner:** Marketplace bounded context
- **Scope:** Platform with Workspace and Business scoped state
- **Related Concepts:** Marketplace Asset; Product Hub; Workspace Entitlement
- **Source Documents:** [Genesis Marketplace](../../01-genesis/17-MARKETPLACE-ARCHITECTURE.md); [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)

### Marketplace Asset

- **Name:** Marketplace Asset
- **Definition:** A governed asset distributed by Marketplace, including an OS, extension, Knowledge Pack, AI Expert, automation, dashboard, workflow, template, or theme.
- **Owner:** Marketplace bounded context
- **Scope:** Platform asset
- **Related Concepts:** Marketplace Asset Version; Marketplace Purchase; Marketplace Applicability
- **Source Documents:** [Genesis Marketplace](../../01-genesis/17-MARKETPLACE-ARCHITECTURE.md); [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Marketplace Asset Version

- **Name:** Marketplace Asset Version
- **Definition:** One immutable published version of a Marketplace Asset.
- **Owner:** Marketplace bounded context
- **Scope:** Platform/shared/versioned
- **Related Concepts:** Marketplace Asset; Marketplace Installation
- **Source Documents:** [Genesis Marketplace](../../01-genesis/17-MARKETPLACE-ARCHITECTURE.md); [Genesis Knowledge Packs](../../01-genesis/18-KNOWLEDGE-PACKS.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Marketplace Purchase

- **Name:** Marketplace Purchase
- **Definition:** The Workspace-scoped commercial state recording acquisition of a Marketplace Asset.
- **Owner:** Marketplace bounded context
- **Scope:** Workspace
- **Related Concepts:** Marketplace Asset; Marketplace Installation
- **Source Documents:** [Genesis Marketplace](../../01-genesis/17-MARKETPLACE-ARCHITECTURE.md); [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Marketplace Installation

- **Name:** Marketplace Installation
- **Definition:** The Workspace-scoped state recording installation of a selected immutable Marketplace Asset Version.
- **Owner:** Marketplace bounded context
- **Scope:** Workspace
- **Related Concepts:** Marketplace Purchase; Marketplace Activation
- **Source Documents:** [Genesis Marketplace](../../01-genesis/17-MARKETPLACE-ARCHITECTURE.md); [Genesis Knowledge Packs](../../01-genesis/18-KNOWLEDGE-PACKS.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Marketplace Activation

- **Name:** Marketplace Activation
- **Definition:** The Workspace-scoped state making an installed Marketplace Asset Version active.
- **Owner:** Marketplace bounded context
- **Scope:** Workspace
- **Related Concepts:** Marketplace Installation; Marketplace Applicability
- **Source Documents:** [Genesis Marketplace](../../01-genesis/17-MARKETPLACE-ARCHITECTURE.md); [Genesis Knowledge Packs](../../01-genesis/18-KNOWLEDGE-PACKS.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Marketplace Applicability

- **Name:** Marketplace Applicability
- **Definition:** The scoped state identifying whether an activated Marketplace Asset applies to the whole Workspace or a selected Business.
- **Owner:** Marketplace bounded context
- **Scope:** Workspace or Business
- **Related Concepts:** Marketplace Activation; Business; Business Brain
- **Source Documents:** [Genesis Marketplace](../../01-genesis/17-MARKETPLACE-ARCHITECTURE.md); [Genesis Knowledge Packs](../../01-genesis/18-KNOWLEDGE-PACKS.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Marketplace Asset Lifecycle

- **Name:** Marketplace Asset Lifecycle
- **Definition:** The shared asset progression through Draft, Review, Approved, Published, new versions, Deprecated, and Archived.
- **Owner:** Marketplace bounded context
- **Scope:** Platform asset/version
- **Related Concepts:** Marketplace Asset; Marketplace Asset Version
- **Source Documents:** [Genesis Marketplace](../../01-genesis/17-MARKETPLACE-ARCHITECTURE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### AI Coordinator

- **Name:** AI Coordinator
- **Definition:** The Core component that selects and coordinates AI Experts and returns one governed, explainable response.
- **Owner:** Core Platform
- **Scope:** Authorized request context
- **Related Concepts:** AI Expert; AI Interaction; AI Action Proposal
- **Source Documents:** [Genesis AI Strategy](../../01-genesis/08-AI-STRATEGY.md); [Genesis AI Expert Network](../../01-genesis/19-AI-EXPERT-NETWORK.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)

### AI Expert

- **Name:** AI Expert
- **Definition:** A specialized AI assistant focused on an industry, function, or technical domain and consuming governed Knowledge.
- **Owner:** Core or Marketplace according to publication
- **Scope:** Platform/versioned; authorized request context
- **Related Concepts:** AI Coordinator; Knowledge Pack; Expert Registry
- **Source Documents:** [Genesis Ontology](../../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis AI Expert Network](../../01-genesis/19-AI-EXPERT-NETWORK.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### AI Expert Network

- **Name:** AI Expert Network
- **Definition:** The collection of specialized AI Experts coordinated into one NexoraXS response.
- **Owner:** Core AI layer
- **Scope:** Platform
- **Related Concepts:** AI Coordinator; AI Expert
- **Source Documents:** [Genesis AI Strategy](../../01-genesis/08-AI-STRATEGY.md); [Genesis AI Expert Network](../../01-genesis/19-AI-EXPERT-NETWORK.md)

### AI Interaction

- **Name:** AI Interaction
- **Definition:** The scoped auditable record of one AI-coordinated request and unified response, including versions, context, policy, evidence, and confidence.
- **Owner:** Core AI Coordinator
- **Scope:** Authorized User/Workspace/Business context
- **Related Concepts:** AI Coordinator; Provenance; AI Action Proposal
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### AI Action Proposal

- **Name:** AI Action Proposal
- **Definition:** A structured AI-generated request for a consequential action that still requires owning-service authorization, validation, approval, execution, and audit.
- **Owner:** Core AI Coordinator proposes; owning service executes
- **Scope:** Authorized target scope
- **Related Concepts:** Action Proposal Broker; Audit Record
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Request Interpreter

- **Name:** Request Interpreter
- **Definition:** The AI Coordinator component that classifies intent, language, desired outcome, domain, and risk.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** AI Coordinator; Expert Router
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Authorization Context Resolver

- **Name:** Authorization Context Resolver
- **Definition:** The AI Coordinator component that establishes permitted organizational, OS, and resource scope before retrieval.
- **Owner:** Core AI Coordinator with Core authorization
- **Scope:** AI Interaction
- **Related Concepts:** Authorization Context; Context Builder
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Context Builder

- **Name:** Context Builder
- **Definition:** The AI Coordinator component that retrieves the minimum authorized Business DNA, Knowledge, Recommendation, analytics, OS, and conversation context.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Authorization Context Resolver; Policy and Safety Engine
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Policy and Safety Engine

- **Name:** Policy and Safety Engine
- **Definition:** The AI Coordinator component that applies privacy, country, permission, action, and data-use policy before and after expert execution.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Context Builder; Evidence and Claim Validator
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Expert Registry

- **Name:** Expert Registry
- **Definition:** The AI component that maintains versioned expert definitions, domains, inputs, compatibility, provenance, and lifecycle.
- **Owner:** Core AI Coordinator/Marketplace for published experts
- **Scope:** Platform
- **Related Concepts:** AI Expert; Expert Router
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Expert Router

- **Name:** Expert Router
- **Definition:** The AI component that selects one or more appropriate Experts based on intent, context, Capability, confidence needs, and availability.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Expert Registry; Collaboration Orchestrator
- **Source Documents:** [Genesis AI Expert Network](../../01-genesis/19-AI-EXPERT-NETWORK.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Instruction Assembler

- **Name:** Instruction Assembler
- **Definition:** The AI component that builds governed expert instructions from approved Knowledge, Rules, evidence, policy, and task context.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Knowledge; Rule; Expert Execution Adapter
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Expert Execution Adapter

- **Name:** Expert Execution Adapter
- **Definition:** The replaceable AI component that invokes approved expert or model providers with bounded tools, time, and data.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction/provider boundary
- **Related Concepts:** AI Expert; Instruction Assembler
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Collaboration Orchestrator

- **Name:** Collaboration Orchestrator
- **Definition:** The AI component that coordinates multiple Expert outputs, detects disagreement, and seeks permitted evidence.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Expert Router; Response Synthesizer
- **Source Documents:** [Genesis AI Expert Network](../../01-genesis/19-AI-EXPERT-NETWORK.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Evidence and Claim Validator

- **Name:** Evidence and Claim Validator
- **Definition:** The AI component that checks material claims against permitted sources and flags unsupported or uncertain output.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Provenance; Confidence and Explainability Evaluator
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Response Synthesizer

- **Name:** Response Synthesizer
- **Definition:** The AI component that produces one coherent NexoraXS response from coordinated expert results.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Collaboration Orchestrator; Confidence and Explainability Evaluator
- **Source Documents:** [Genesis AI Expert Network](../../01-genesis/19-AI-EXPERT-NETWORK.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Confidence and Explainability Evaluator

- **Name:** Confidence and Explainability Evaluator
- **Definition:** The AI component that attaches confidence, assumptions, evidence, alternatives, and verification guidance.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Evidence and Claim Validator; AI Interaction
- **Source Documents:** [Genesis AI Strategy](../../01-genesis/08-AI-STRATEGY.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Action Proposal Broker

- **Name:** Action Proposal Broker
- **Definition:** The AI component that converts a requested action into a structured AI Action Proposal for separate authorization and execution.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction/target scope
- **Related Concepts:** AI Action Proposal; Authorization Context
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Conversation Context Manager

- **Name:** Conversation Context Manager
- **Definition:** The AI component that maintains scoped conversation continuity under retention, consent, and tenant-isolation policy.
- **Owner:** Core AI Coordinator
- **Scope:** User/Workspace/Business conversation
- **Related Concepts:** AI Interaction; Authorization Context
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### AI Audit and Observability

- **Name:** AI Audit and Observability
- **Definition:** The AI component that records model and expert versions, context references, policy, tools, proposals, latency, cost, and feedback.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Audit Record; AI Interaction
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### API Architecture

- **Name:** API Architecture
- **Definition:** The contract system governing Core modules, first-party applications, Operating Systems, Marketplace, partners, external clients, events, webhooks, and AI tools.
- **Owner:** Core Platform
- **Scope:** Platform interfaces
- **Related Concepts:** API Gateway; OS Integration API; Event and Webhook API
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### API Gateway

- **Name:** API Gateway
- **Definition:** The API Architecture component that authenticates boundaries, applies coarse policy and rate limits, routes requests, and records telemetry without owning domain logic.
- **Owner:** Core Platform
- **Scope:** API boundary
- **Related Concepts:** API Architecture; Authorization Context
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Core Module Contract

- **Name:** Core Module Contract
- **Definition:** A typed command, query, or domain-event boundary between logical Core modules that prevents arbitrary cross-module table access.
- **Owner:** Owning Core modules
- **Scope:** Core modular monolith
- **Related Concepts:** API Architecture; Domain Event
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### First-Party Experience API

- **Name:** First-Party Experience API
- **Definition:** The task-oriented API surface used by approved Core experiences and backend-for-frontend layers.
- **Owner:** Core Platform API Architecture
- **Scope:** First-party experience
- **Related Concepts:** Business Architect; Product Hub; API Gateway
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### OS Integration API

- **Name:** OS Integration API
- **Definition:** The governed Core API surface used by independent Operating Systems for context, organization, entitlement, handoff, readiness, audit, notification, and approved intelligence.
- **Owner:** Core Platform API Architecture
- **Scope:** Core-to-OS boundary
- **Related Concepts:** Operating System; Setup Handoff; Integration Event
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Marketplace API

- **Name:** Marketplace API
- **Definition:** The governed API surface for Marketplace catalog, versions, purchases, installation, activation, applicability, review, and publisher operations.
- **Owner:** Marketplace bounded context under API governance
- **Scope:** Marketplace boundary
- **Related Concepts:** Marketplace; Product Hub; API Gateway
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Public Platform API

- **Name:** Public Platform API
- **Definition:** The stable, documented, rate-limited API surface for authorized customer and partner integrations.
- **Owner:** Core Platform API Architecture
- **Scope:** Authorized external client
- **Related Concepts:** API Gateway; Webhook
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Administrative API

- **Name:** Administrative API
- **Definition:** The segregated API surface for authorized NexoraXS operators with stronger authentication, approval, and audit requirements.
- **Owner:** Core Platform and owning administrative domains
- **Scope:** Internal administration
- **Related Concepts:** Authorization Context; Audit Record
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Event and Webhook API

- **Name:** Event and Webhook API
- **Definition:** The asynchronous API surface for versioned internal, OS, customer, and partner notifications.
- **Owner:** Core Platform API Architecture; event owner
- **Scope:** Asynchronous integration
- **Related Concepts:** Domain Event; Integration Event; Webhook
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### AI Tool API

- **Name:** AI Tool API
- **Definition:** The narrow, permission-checked API surface exposed to AI Coordinator and approved Experts for reads or Action Proposals.
- **Owner:** Core Platform API Architecture and owning services
- **Scope:** AI interaction
- **Related Concepts:** AI Coordinator; AI Action Proposal
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Domain Event

- **Name:** Domain Event
- **Definition:** A versioned event announcing a committed fact owned by one domain.
- **Owner:** Domain that owns the fact
- **Scope:** Owning domain
- **Related Concepts:** Integration Event; Core Module Contract
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Integration Event

- **Name:** Integration Event
- **Definition:** A stable, minimized versioned fact exposed across a domain boundary.
- **Owner:** Source domain
- **Scope:** Cross-domain integration
- **Related Concepts:** Domain Event; OS Integration API
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Webhook

- **Name:** Webhook
- **Definition:** A signed, retryable, observable external notification delivered through the Event and Webhook API.
- **Owner:** Source domain under API governance
- **Scope:** Authorized external endpoint
- **Related Concepts:** Event and Webhook API; Integration Event
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Long-Running Operation

- **Name:** Long-Running Operation
- **Definition:** An explicit status resource for work such as installation that cannot complete safely within one synchronous request.
- **Owner:** Owning operation coordinator
- **Scope:** Workspace/product/operation
- **Related Concepts:** Installation and Activation Coordinator; API Architecture
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Notification

- **Name:** Notification
- **Definition:** A Workspace-scoped platform record and delivery process for Core or authorized OS-produced messages.
- **Owner:** Core Notification Service
- **Scope:** Workspace with producer context
- **Related Concepts:** Workspace; Operating System; Notification Service
- **Source Documents:** [Genesis Platform Blueprint](../../01-genesis/09-PLATFORM-BLUEPRINT.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Notification Service

- **Name:** Notification Service
- **Definition:** The shared Core service that owns Notification records, delivery preferences, and delivery attempts.
- **Owner:** Core Platform
- **Scope:** Workspace
- **Related Concepts:** Notification; Operating System
- **Source Documents:** [Genesis Platform Blueprint](../../01-genesis/09-PLATFORM-BLUEPRINT.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Audit Record

- **Name:** Audit Record
- **Definition:** An append-only record of a critical action with actor, scope, source, subject, time, correlation, and result references.
- **Owner:** Core Audit Service
- **Scope:** Workspace with source and domain context
- **Related Concepts:** Audit Service; Authorization Context; AI Interaction
- **Source Documents:** [Genesis Platform Blueprint](../../01-genesis/09-PLATFORM-BLUEPRINT.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Audit Service

- **Name:** Audit Service
- **Definition:** The shared Core service that preserves append-only critical action history.
- **Owner:** Core Platform
- **Scope:** Workspace with producer context
- **Related Concepts:** Audit Record; Authorization Context
- **Source Documents:** [Genesis Platform Blueprint](../../01-genesis/09-PLATFORM-BLUEPRINT.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Settings and Localization Context

- **Name:** Settings and Localization Context
- **Definition:** The resolved platform preferences for language, locale, direction, timezone, and currency context without translating user-entered Business data.
- **Owner:** Core Settings and Localization
- **Scope:** Workspace/User/Business presentation context
- **Related Concepts:** Navigation Architecture; Workspace
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md); [Wave 1 Domain Model](../../02-core-platform/03-DOMAIN-MODEL.md)

### Search Coordination

- **Name:** Search Coordination
- **Definition:** The shared contracts and authorized projections used to search across platform-owned sources without transferring ownership.
- **Owner:** Core Platform
- **Scope:** Authorized tenant and resource scope
- **Related Concepts:** Authorization Context; API Architecture
- **Source Documents:** [Genesis OS Lifecycle](../../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Storage Coordination

- **Name:** Storage Coordination
- **Definition:** The shared file and object policies, quotas, secure references, and access coordination consumed across products.
- **Owner:** Core Platform
- **Scope:** Workspace and resource scope
- **Related Concepts:** Authorization Context; Workspace Entitlement
- **Source Documents:** [Genesis OS Lifecycle](../../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Analytics Intake

- **Name:** Analytics Intake
- **Definition:** The permission-aware, purpose-bound intake of approved platform and OS usage signals for analysis.
- **Owner:** Core Platform
- **Scope:** Workspace/Business/OS context
- **Related Concepts:** Business Brain; Workspace Intelligence Aggregation
- **Source Documents:** [Genesis Business Brain](../../01-genesis/06-BUSINESS-BRAIN.md); [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Navigation Architecture

- **Name:** Navigation Architecture
- **Definition:** The governed movement of users through Core, Marketplace, OS setup, and OS operational surfaces while preserving context and route ownership.
- **Owner:** Core coordinates; each bounded product owns its routes
- **Scope:** Authenticated platform journey
- **Related Concepts:** Core Shell; Setup Handoff; OS Operational Shell
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Core Shell

- **Name:** Core Shell
- **Definition:** The Core-owned navigation surface for context selection, Product Hub, team/access, billing, settings, notifications, audit, and Marketplace entry.
- **Owner:** Core Platform
- **Scope:** Authenticated Core experience
- **Related Concepts:** Product Hub; Marketplace; Navigation Architecture
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### OS Setup Surface

- **Name:** OS Setup Surface
- **Definition:** The selected OS-owned navigation surface for Business Unit selection or creation, domain setup, configuration review, activation, and readiness.
- **Owner:** Selected Operating System
- **Scope:** OS setup context
- **Related Concepts:** OS-Specific Setup; Setup Handoff
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### OS Operational Shell

- **Name:** OS Operational Shell
- **Definition:** The selected OS-owned navigation surface for daily workflows, Modules, operational context, dashboards, reports, and OS settings.
- **Owner:** Selected Operating System
- **Scope:** Business Unit/Branch/OS
- **Related Concepts:** Operational; Module; Navigation Architecture
- **Source Documents:** [Approved Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Customer Journey

- **Name:** Customer Journey
- **Definition:** The complete customer progression from discovery and authentication through Workspace, Business Architect, Recommendations, Product Hub, OS setup, operation, growth, and Marketplace.
- **Owner:** NexoraXS Platform
- **Scope:** Customer lifecycle
- **Related Concepts:** Business Architect Pipeline; Core Workspace Ready; Operating System Lifecycle
- **Source Documents:** [Genesis Customer Journey](../../01-genesis/11-CUSTOMER-JOURNEY.md); [Genesis Workspace Lifecycle](../../01-genesis/12-WORKSPACE-LIFECYCLE.md); [Wave 1 Vision](../../02-core-platform/01-CORE-PLATFORM-VISION.md)

### Workspace Lifecycle

- **Name:** Workspace Lifecycle
- **Definition:** The progression from Workspace creation through Business understanding, Core readiness, OS selection, operation, growth, multi-Business, and enterprise.
- **Owner:** Core Platform
- **Scope:** Workspace
- **Related Concepts:** Customer Journey; Core Workspace Ready; OS Subscription
- **Source Documents:** [Genesis Workspace Lifecycle](../../01-genesis/12-WORKSPACE-LIFECYCLE.md); [Wave 1 Architecture](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

## Ambiguities Preserved

The following phrases or model boundaries are intentionally not defined as new canonical concepts:

1. **Business Identity** — the sources use this phrase for creation of the platform Business identity, for the Identity layer of Business DNA, and distinguish both from OS-specific legal, billing, tax, or document identity. The phrase requires its surrounding scope and is not a standalone replacement for Business, Business DNA, or OS legal identity.
2. **OSEnablement** — earlier architecture used this name, but the approved proposal leaves its successor or evolution open. The authoritative model now distinguishes subscription, installation, setup, configuration, activation, and readiness; no combined replacement concept has been approved.
3. **Organization write authority during OS setup** — Core owns canonical Business Unit, Department, and Branch identities, while an OS owns its setup and operational data. Whether Core is the only writer after an OS command or the OS creates identity transactionally through a Core API remains open.
4. **Core Platform entitlement** — Genesis uses this descriptively alongside the canonical Workspace Entitlement. This glossary does not create a second entitlement concept.
5. **Product** — Product Hub uses the word broadly for Operating Systems and Marketplace offerings. Use OS Product, Marketplace Asset, Plan, or another specific canonical concept when ownership matters.

## Authoritative References

- [Architecture Freezes](../../99-architecture-freeze/)
- [Foundation Baseline v0.1](../FOUNDATION-BASELINE-v0.1.md)
- [Product Constitution](../../01-genesis/02-CONSTITUTION.md)
- [Genesis v1.1](../../01-genesis/)
- [Approved Core Platform Architecture Proposal v0.2](../../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Core Platform Wave 1](../../02-core-platform/README.md)
- [Architecture Decision Records](../ADR/README.md)
- [Product Decision Register](../PRODUCT-DECISIONS.md)
- [Session Decision Register](../SESSION-DECISION-REGISTER.md)
