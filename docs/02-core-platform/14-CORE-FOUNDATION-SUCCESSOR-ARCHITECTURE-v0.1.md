# Core Platform Foundation Successor Architecture v0.1

**Target architecture version:** Core Platform Architecture v1.1, subject to Architecture Review and approval

**Artifact version:** 0.1

**Status:** Approved — successor architecture basis for Core Platform v1.1; not an Architecture Freeze

**Owner:** Core Platform Architecture

**Authority:** Approved successor architecture input under Foundation Governance Approval v2.0

**Predecessor:** Core Platform Architecture v1.0, documentation baseline v1.0.1

**Successor relationship:** Frozen by Core Platform Architecture v1.1 Freeze

**Prepared for:** Independent Architecture Review

**Approval state:** Approved by Foundation Governance Approval v2.0 after Architecture Review v2

---

## 1. Executive Summary

### 1.1 Purpose

This document specifies the minimum proposed Core Platform architecture delta needed to support the
approved Sessions 1–4 Foundation direction and
[ADR-042](../00-governance/ADR/ADR-042-pre-registration-business-discovery.md). The explicit
relationship to ADR-015 and ADR-016, including direct-registration compatibility, is proposed in
[ADR-043](../00-governance/ADR/ADR-043-foundation-discovery-and-business-architect-composition.md).

It is intended to become the architecture input to an independent review and, if approved, the basis
of a future Core Platform Architecture v1.1 Freeze. It does not itself update or supersede the
[Core Platform Architecture v1.0 Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md).

### 1.2 Scope

The proposal is limited to:

- Pre-Registration Business Discovery as a distinct temporary Core lifecycle;
- Candidate Business Understanding as temporary, non-canonical knowledge;
- Understanding Reflection and Business Report Preview before authentication;
- authenticated conversion into one Workspace and one Business context;
- an authenticated candidate/review entry for a new customer who registers directly;
- first governed Business DNA v1 publication at authenticated conversion;
- Business Architect continuation as Guided Activation;
- Business Blueprint as a governed authenticated projection;
- Business Insight as a conceptual responsibility inside the frozen Business Brain Decision
  boundary; and
- Decision Lineage as a required derivation responsibility distinct from Explainability and Audit.

Everything else remains inherited unchanged from Core Platform Architecture v1.0 and the other
controlling Architecture Freezes.

### 1.3 Status

This is a pre-release architecture proposal under
[Architectural Milestone Lifecycle section 6.1](../00-governance/MILESTONE-LIFECYCLE.md).
The repository requires a pre-release version before approval. Core Platform Architecture v1.1 is the
review target, not a current authority claim.

Architecture Review must confirm that the complete delta is compatible with a MINOR successor. If
the review cannot prove that classification, this proposal cannot become a v1.1 Freeze and must
return to Governance.

### 1.4 Non-goals

This proposal does not:

- redesign Core Platform outside the Foundation delta;
- redesign or physically extract Business Brain;
- redesign Marketplace, Product Hub, AI Coordinator, or any Operating System;
- create a new canonical aggregate, shared owner, service, module, package, API, Event, schema, or
  persistence model;
- define screens, routes, interactions, wireframes, UX flows, or frontend state;
- define exact lifecycle state machines beyond vocabulary explicitly accepted by ADR-042;
- choose retention periods, token mechanisms, storage, database, queue, framework, deployment, or
  integration technology;
- authorize migration or implementation;
- start Session 5; or
- start or create Feature 056.

### 1.5 Relationship to the Governance Disposition

The immediate Governance input is the
[Core Platform / Foundation Governance Disposition v0.1](../00-governance/CORE-PLATFORM-FOUNDATION-GOVERNANCE-DISPOSITION-v0.1.md).
That document separates compatible documentation alignment from material successor treatment.

This architecture proposal implements only the proposed bounded successor direction recorded in its
sections **6.2 Material replacement and extension matrix** and **7. Non-Replaced Statements**. It
does not promote the Disposition above its repository status. Approval of this architecture remains
conditional on the required Governance and ADR relationship disposition.

## 2. Architectural Delta

### 2.1 Delta summary

| Area | Core Platform Architecture v1.0 meaning | Proposed successor meaning | Change class |
|---|---|---|---|
| Primary new-customer journey | Authentication, Workspace, Business, then Business Architect Pipeline | Meaningful Discovery, Reflection, and Preview may precede authentication; direct registration enters an authenticated candidate/review path; canonical ownership begins only after review, approval, and publication | Material journey extension with compatible retained entry |
| Business Discovery | Business understanding occurs inside the authenticated selected-Business pipeline | A distinct temporary pre-registration Core lifecycle precedes and hands off into the retained pipeline | Material compatible extension |
| Discovery method | Governed conversation is the principal stated experience | Discovery is method-independent; Guided Business Conversation remains Experience v1 | Compatible clarification with explicit ADR relationship required |
| Candidate knowledge | Candidate Facts are inside the selected-Business pipeline | Candidate Business Understanding may exist before Workspace or Business context and remains non-canonical | Material compatible extension |
| First Business DNA publication | Reviewed publication culminates the authenticated Business Architect pipeline | Public candidates convert after authentication; direct registrants complete an authenticated candidate/review segment; both publish approved Business DNA v1 before Guided Activation | Material sequencing change with one publication invariant |
| Business Architect | Primary authenticated onboarding pipeline | Retained authenticated pipeline continuing after conversion as Guided Activation | Preserved responsibility with changed entry |
| Business Blueprint | Core projection under projection-is-not-ownership guarantees | Governed authenticated customer-facing projection from Business DNA and governed owner outputs | Compatible clarification |
| Business Insight | Decision-owned analysis and insight content inside Business Brain | Named conceptual responsibility inside the same sole Business Brain Decision boundary | Material compatible conceptual extension |
| Decision Lineage | Decisions are explainable, traceable, version-pinned, and auditable | Derivation and reverse-impact lineage are explicit and separate from presentation and Audit | Material compatible traceability extension |
| Product Ethics | Capability-first, explainable Recommendations under human authority | No-product, current-tool, and non-commercial-ranking outcomes become explicit constraints | Material compatible policy extension |

### 2.2 What changed

The proposed successor adds one pre-pipeline architecture boundary and one governed handoff:

~~~text
temporary Core Discovery context
  → approved candidate understanding
  → authenticated Workspace and Business context
  → governed Business DNA publication
  → retained Business Architect pipeline
~~~

It also clarifies three conceptual responsibilities:

- Business Blueprint is a projection, not a canonical store.
- Business Insight is a conceptual responsibility within Business Brain, not a physical service.
- Decision Lineage records derivation; Explainability presents reasoning; Audit records activity.

### 2.3 What did not change

No canonical owner changes. In particular:

- Workspace remains the customer and tenant boundary.
- Business remains the sole owner context for Business DNA.
- Business DNA remains canonical, Business-scoped, versioned, and software-independent.
- Business Brain Decision remains the sole canonical Business Brain write model.
- Recommendation Engine remains the owner of Recommendations and their lifecycle.
- Product Hub remains a composition, discovery, navigation, and handoff boundary.
- Each Operating System remains independent and owns its setup and operational state.
- Marketplace and AI Coordinator retain their frozen boundaries.
- Core remains an enforced modular monolith.
- Existing security, Permission, Contract, API, Event, Audit, observability, and deployment
  guarantees remain binding.

### 2.4 Why the delta is required

[ADR-042 sections 1–9](../00-governance/ADR/ADR-042-pre-registration-business-discovery.md)
require meaningful Business Discovery before registration, temporary Candidate Business
Understanding, explicit reflection, a useful Business Report Preview, authenticated conversion, and
first Business DNA v1 publication before Guided Activation.

The frozen [Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md) and
[Core Platform Proposal](./02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md), **Navigation Architecture /
Canonical user movement**, place authentication and Workspace/Business creation before Business
Architect. This proposal preserves the earlier pipeline but adds the Accepted pre-pipeline boundary
and changes its entry relationship.

### 2.5 Delta boundaries

The delta begins when a visitor starts Pre-Registration Discovery or when a direct-registering new
customer enters the authenticated candidate/review path. It ends when the authenticated selected
Business has:

1. an approved Business DNA v1;
2. completed the applicable Guided Activation work;
3. received governed Blueprint and Recommendation projections; and
4. reached Core Workspace Ready under existing owner rules.

The delta does not extend into Operating System selection, subscription, setup, configuration,
activation, readiness, or operations. Those boundaries remain frozen.

## 3. Successor Journey

### 3.1 Primary new-customer architecture flow

~~~text
Public Landing
  ↓
Pre-Registration Business Discovery
  ↓
Business Mapping
  ↓
Candidate Business Understanding
  ↓
Understanding Reflection
  ↓
Business Report Preview
  ↓
Create Workspace Intent
  ↓
Authentication and identity verification when required
  ↓
Create or resolve Workspace
  ↓
Create or select Business
  ↓
Review and approve candidate conversion
  ↓
Publish approved Business DNA v1
  ↓
Guided Activation / retained Business Architect Pipeline
  ↓
Governed Business Blueprint projection
  ↓
Governed Recommendations
  ↓
Core Workspace Ready
  ↓
Platform Dashboard and Product Hub
  ↓
Operating System selection and commercial lifecycle
  ↓
Operating System-owned setup
  ↓
Operating System Ready
  ↓
Operating System-owned daily operations
~~~

This is an architecture sequence, not a screen map, route graph, or state machine.

### 3.2 Direct-registration compatibility

Pre-Registration Business Discovery is the primary value path, not a mandatory UI prerequisite. A
new customer may enter through Register/Login without an anonymous Discovery Session:

~~~text
Register or Login
  ↓
Create or resolve Workspace
  ↓
Create or select Business
  ↓
Authenticated candidate-understanding and review path
  ↓
Explicit approval
  ↓
Publish approved Business DNA v1
  ↓
Retained Business Architect Pipeline as Guided Activation
~~~

The authenticated candidate path uses the same method-independent Discovery, Business Mapping,
candidate/canonical separation, provenance, confidence, correction, and review responsibilities. It
is authorized and scoped to the selected Business as the intended publication target, but its
content remains temporary and non-canonical until Business DNA owner validation, explicit approval,
and publication.

Direct registration never publishes Business DNA from identity or account data and never begins
Guided Activation before first publication. This architecture defines no required screen, route,
API, service, database, token, or persistence mechanism.

### 3.3 Returning-customer relationship

Existing authenticated entry remains valid. A returning customer may resolve directly to an
authorized Workspace, Business, incomplete Guided Activation context, Product Hub, or Operating
System according to existing context, Permission, readiness, and safe-return rules.

Pre-Registration Discovery becomes the primary new-customer value path. It does not remove
authentication as an independent returning-customer entry.

### 3.4 Ordering invariants

1. No Workspace or Business is created anonymously.
2. Candidate Business Understanding precedes first canonical Business DNA publication.
3. Authentication, Workspace resolution, Business resolution, material review, and explicit approval
   precede publication for both public-candidate conversion and direct-registration entry.
4. First Business DNA v1 publication precedes Guided Activation.
5. Guided Activation may produce governed Business DNA revisions only through the Business DNA owner.
6. Business Blueprint remains distinct from Business Report Preview.
7. Governed Recommendations remain distinct from Business Blueprint.
8. Core Workspace Ready remains distinct from Operating System Ready.
9. Product Hub precedes Operating System-owned setup but does not perform that setup.
10. Operating System operational work occurs only inside the applicable Operating System boundary.

## 4. Discovery Boundary

### 4.1 Purpose

Business Discovery is the Core-owned capability that pursues a defined Discovery Goal by selecting a
Discovery Strategy, identifying material Knowledge Gaps, and selecting an appropriate Knowledge
Acquisition Method.

Guided Business Conversation is Discovery Experience v1. It is not the definition or sole permitted
method of Business Discovery.

### 4.2 Responsibilities

The Discovery boundary is responsible for:

- establishing the current Discovery Goal;
- selecting and adapting the Discovery Strategy;
- determining relevant knowledge domains and material Knowledge Gaps;
- selecting the best approved acquisition method for the current gap;
- acquiring only knowledge material to the current goal;
- coordinating Business Mapping into Candidate Business Understanding;
- supporting Understanding Reflection and correction;
- determining whether candidate understanding is sufficient for a Business Report Preview;
- producing temporary candidate-derived material for that Preview; and
- preparing an explicit continuation intent for authenticated conversion.

### 4.3 Inputs

Architectural inputs may include:

- information intentionally supplied by the visitor;
- approved source material supplied through a Knowledge Acquisition Method;
- Evidence and Original Source references;
- permitted public or contextual information;
- corrections and review decisions; and
- applicable governed Knowledge and Rules where their use is authorized.

The boundary may not infer access to tenant-protected data merely because a visitor supplies a
Workspace, Business, or organization identifier.

### 4.4 Outputs

The boundary may produce:

- Candidate Business Understanding;
- knowledge gaps, uncertainty, contradictions, and confidence context;
- Understanding Reflection material;
- temporary candidate-derived insight and advice content;
- Business Report Preview; and
- continuation intent for later authenticated conversion.

These outputs are temporary and non-canonical. Preview advice is not a governed Recommendation
aggregate. Candidate analysis is not a canonical Business Brain Decision.

### 4.5 Ownership

Core Platform owns the Discovery capability and temporary lifecycle coordination. Source owners
retain ownership of their source material. Discovery has accountability for its temporary candidate
context but owns no canonical Workspace, Business, Business DNA, Recommendation, entitlement,
subscription, Operating System, or operational state.

Explicitly:

- Discovery is not a Workspace.
- Discovery is not a Business.
- A Discovery Session is not a tenant.
- Discovery creates no Membership or Permission authority.
- Discovery owns nothing canonical.
- Discovery cannot configure or operate an Operating System.

### 4.6 Lifecycle

The lifecycle begins when a visitor enters an approved Discovery experience and ends through
conversion, expiry, or abandonment.

ADR-042 explicitly records the Discovery Session vocabulary **active**, **expired**, **converted**,
and **abandoned**. This proposal adopts those terms without inventing a transition graph. Exact
transition rules, retention duration, recovery, and deletion remain governed future work.

### 4.7 Constraints

- Temporary context must be privacy-aware, purpose-limited, and data-minimized.
- Candidate material cannot authorize an action or establish ownership.
- Discovery cannot issue a canonical Business Brain Decision.
- Discovery cannot create a governed Recommendation lifecycle.
- Discovery cannot write OS configuration or operational state.
- Candidate-derived content must remain distinguishable from canonical and governed outputs.
- Exact token, persistence, anti-abuse, retention, and recovery mechanisms remain deferred.

## 5. Candidate Business Understanding Boundary

### 5.1 Purpose

Candidate Business Understanding is the temporary, pre-canonical representation of what the platform
currently understands before authenticated conversion and explicit publication approval.

It protects Business DNA from unreviewed, anonymous, uncertain, or contradictory information.

### 5.2 Ownership and accountability

Before conversion, Candidate Business Understanding has no Workspace or Business owner. Core
Business Discovery is accountable for coordinating its temporary lifecycle, provenance, review, and
safe disposition.

This temporary accountability is not canonical ownership and does not make the candidate a Business
aggregate, Business DNA revision, Business Brain Decision, or Recommendation.

### 5.3 Content boundaries

Candidate Business Understanding may contain:

- raw supplied material;
- Observed Facts;
- Inferences;
- Business Assessments;
- Business Needs or Priorities;
- Desired Outcomes;
- Evidence and Original Source references;
- confidence and uncertainty;
- contradictions and unanswered gaps;
- corrections and review status; and
- candidate-derived advisory material.

The canonical knowledge types remain distinct. A fact is not an Inference, an Assessment is not a
Need, and a Recommendation is not an Assessment.

### 5.4 Confidence

Confidence is contextual evidence about derived candidate knowledge. It:

- accompanies the applicable derived item;
- never creates authority, ownership, Permission, or truth by itself;
- remains visible where material to review or conversion; and
- does not replace Evidence, provenance, or explicit approval.

No scoring scale, threshold, formula, or storage representation is approved here.

### 5.5 Review

Understanding Reflection must distinguish supplied facts, Inferences, Assessments, assumptions,
uncertainty, contradictions, and candidate advice.

Clear, direct, low-risk facts may avoid repeated confirmation under approved policy. Inferred,
consequential, conflicting, or low-confidence material requires explicit review before it may
contribute to canonical publication.

Correction preserves provenance and does not rewrite original source history.

### 5.6 Conceptual lifecycle

The approved conceptual progression is:

~~~text
Acquired source material
  → Business Mapping
  → Candidate Business Understanding
  → Understanding Reflection
  → approved candidate material
  → authenticated conversion
  → owner-validated Business DNA v1 publication
~~~

This progression describes responsibility and derivation, not persistence states.

ADR-042's Discovery Session vocabulary is retained. No exact Candidate Business Understanding state
machine is standardized by this proposal.

The only architectural outcome relationships standardized here are those directly supported by
ADR-042:

| Current session condition | Permitted outcome | Constraint |
|---|---|---|
| Active and still within approved policy | Continue acquisition, mapping, reflection, or Preview preparation | Remains temporary and non-canonical |
| Valid candidate plus successful authenticated conversion | Converted | Prevent repeated canonical consumption while preserving safe retry |
| Retention or validity limit reached | Expired | Becomes unusable under the applicable recovery policy |
| Visitor ends continuation before conversion | Abandoned | Creates no Workspace, Business, or canonical publication |

No other transition, reopening rule, or combined Discovery/Guided Activation state model is approved
by this proposal.

### 5.7 Deletion and retention

Candidate context is temporary. It must not be retained indefinitely by default or treated as
canonical history.

Exact retention duration, expiration, deletion, legal hold, recovery, and post-conversion retention
are not decided here. They remain governed by
[RFC-003](../00-governance/RFC-REGISTER.md) and the applicable future privacy, security, and
operations decisions.

Before candidate context is disposed, authenticated conversion must preserve the provenance,
corrections, confidence, and Decision Lineage required by ADR-042 in the applicable owner-governed
context. This statement defines an information-preservation obligation, not a storage mechanism.

### 5.8 Conversion constraints

Candidate Business Understanding:

- may target exactly one authenticated Business context per conversion;
- cannot publish itself;
- cannot be consumed repeatedly without an explicitly approved safe-retry outcome;
- cannot overwrite an existing Business DNA identity;
- cannot bypass Business DNA owner validation or explicit customer approval; and
- cannot be used to configure an Operating System.

Conversion into a Business that already has published Business DNA is outside this first-publication
path. It must not silently overwrite existing DNA and remains subject to the governed revision policy
registered as [RFC-009](../00-governance/RFC-REGISTER.md).

## 6. Authenticated Conversion Boundary

### 6.1 Purpose

Authenticated Conversion is the Core-owned orchestration boundary that admits approved candidate
knowledge into one authenticated Business context and requests first Business DNA v1 publication
from the Business DNA owner.

The orchestrator coordinates owners; it does not absorb their canonical state.

### 6.2 Entry conditions

Conversion requires:

1. a Discovery Session that satisfies approved validity and consumption policy;
2. an authenticated actor;
3. identity verification where required by existing policy;
4. one resolved Workspace under existing tenant rules;
5. one created or selected Business inside that Workspace;
6. authorization to establish or approve canonical information for that Business;
7. completed material Understanding Reflection;
8. explicit approval of material candidate information; and
9. preserved provenance, Evidence, confidence, correction, and lineage context.

The exact validation mechanism is outside scope.

### 6.3 Workspace and Business relationship

Workspace remains the customer and tenant boundary. Business remains a legal or operational
organization inside that Workspace and the sole context that owns Business DNA.

The conversion boundary may coordinate:

- Workspace resolution or creation through Workspace Management;
- Business resolution or creation through Business Registry; and
- Business DNA publication through Business DNA Registry.

It cannot create anonymous Workspace or Business state and cannot write those owners directly.

### 6.4 Business creation

A new Business, when required, is created through the existing Core Business Registry boundary under
the canonical organization hierarchy. Candidate Business Understanding does not become the Business
identity and does not prove the actor is authorized to create or select one.

No Business Unit is substituted for Business.

### 6.5 Business DNA publication

For the first-publication path:

1. approved candidate material is admitted into the authenticated selected-Business pipeline;
2. Business DNA Registry validates its publication invariants;
3. explicit approval remains required;
4. the first governed Business DNA v1 is published for exactly one Business;
5. Business DNA remains software-independent; and
6. later governed revisions may be proposed through Guided Activation without modifying historical
   versions in place.

The conversion orchestrator does not become the Business DNA source of truth.

### 6.6 Exit conditions

Successful conversion establishes:

- one authenticated Workspace and Business context;
- one approved Business DNA v1 publication for the first-publication path;
- preserved required provenance and lineage;
- a Discovery Session outcome recorded as converted under ADR-042 vocabulary; and
- eligibility to continue into Guided Activation.

It does not establish Core Workspace Ready, Product Hub eligibility, an OS Subscription, OS setup,
Operating System Ready, or operational access by itself.

### 6.7 Failure principles

- Retry must be idempotent or otherwise prevent duplicate canonical outcomes.
- Unknown outcomes must not be presented as success.
- Expired, invalid, abandoned, unauthorized, or already-consumed contexts must fail safely.
- Failure cannot create partial tenant authority or an orphan canonical Business DNA publication.
- Recovery must preserve ownership and authorization checks.
- Audit and observability remain separate owner-governed responsibilities.
- Exact compensation, transaction, protocol, token, and persistence mechanisms are deferred.

## 7. Guided Activation Boundary

### 7.1 What remains from Business Architect

The authenticated selected-Business Business Architect Pipeline remains intact as the governed Core
path for:

- infer-before-ask business understanding;
- acquiring missing Business-scoped knowledge;
- review and correction;
- validating material facts;
- publishing governed Business DNA revisions through the Business DNA owner;
- supporting deterministic analysis and readiness evaluation; and
- preparing governed customer-facing projections.

The pipeline is not replaced by anonymous Discovery.

For a direct-registering new customer, the retained pipeline's authenticated pre-publication segment
coordinates candidate understanding, review, and publication readiness. This segment remains
separate from published Business DNA. After first publication, the pipeline continues as Guided
Activation.

### 7.2 What changes

Business Architect no longer owns the first meaningful customer value or the first Business DNA v1
publication stage.

After conversion it continues as **Guided Activation**. Guided Activation:

- starts with approved Business DNA v1 and preserved candidate context;
- reuses confirmed knowledge;
- asks only for material missing, stale, contradictory, uncertain, or policy-required information;
- may request governed Business DNA revisions;
- prepares the authenticated Business Blueprint and governed Recommendation context; and
- contributes to Core Workspace Ready under existing readiness ownership.

The frozen Business Architect Session record lifecycle remains applicable to the retained
authenticated pipeline: a record may progress, pause, block, expire, or be superseded where already
defined by frozen Core Data Ownership. Those are pipeline-record lifecycle terms. They are not
Discovery Session states and are not Guided Activation presentation states.

Exact new UX or Guided Activation presentation states remain subject to an approved owning-domain or
UX specification. Foundation's deferral does not remove the inherited record lifecycle. This
proposal creates no combined Discovery/Business Architect/Guided Activation state machine.

### 7.3 Relationship with Business Blueprint

Guided Activation prepares the governed owner outputs from which Business Blueprint is composed.
It does not make Blueprint canonical and does not give the projection write authority.

### 7.4 Relationship with Recommendations

Guided Activation may establish sufficient approved understanding for Business Brain analysis and
Recommendation formation. Recommendation Engine remains the sole owner of governed Recommendations,
their prioritization, explanation, lifecycle, and disposition.

### 7.5 Relationship with Product Hub

Guided Activation and Product Hub are separate Core responsibilities.

- Guided Activation completes business-understanding and readiness work.
- Product Hub composes authorized owner projections and manages product/Operating System discovery,
  lifecycle navigation, setup handoff, launch, and recovery.
- Product Hub does not own Guided Activation, Business DNA, Business Brain Decisions, Recommendations,
  subscriptions, Marketplace Assets, or Operating System setup.
- Product Hub does not own Pre-Registration Business Discovery. “Discovery” in its inherited boundary
  means product and implementation-option discovery after governed business understanding.

### 7.6 Relationship with Operating Systems

Guided Activation does not perform OS-Specific Setup. It cannot write OS configuration, operational
facts, or readiness.

An applicable Operating System receives only an approved, authorized handoff through existing
governed boundaries and remains the final owner of its setup and operational lifecycle.

## 8. Business Blueprint

### 8.1 Architectural definition

Business Blueprint is a governed authenticated customer-facing projection composed from:

- the current approved Business DNA version;
- authorized Business Brain Decision and analysis outputs;
- governed Capability, Need, Priority, Desired Outcome, and readiness outputs;
- other permission-filtered owner outputs approved for the projection.

### 8.2 Projection rules

Business Blueprint:

- is a projection only;
- is never canonical;
- never becomes a source of truth;
- never writes Business DNA, Business Brain Decision, Recommendation, Product Hub, Marketplace, or OS
  state;
- identifies its applicable Business and source context;
- reflects partial, unavailable, stale, or superseded owner outputs without fabricating truth; and
- remains distinct from the temporary pre-registration Business Report Preview.

Business DNA and each governed output owner remain authoritative for their own facts.

### 8.3 Recommendation relationship

The customer journey may present Blueprint before the separate governed Recommendations stage. That
journey order does not make Blueprint the producer or owner of Recommendations.

Blueprint may present approved capability and readiness projections. Recommendation Engine retains
the Recommendation aggregate and lifecycle.

## 9. Business Insight

### 9.1 Conceptual responsibility

Business Insight Engine names the conceptual responsibility that transforms governed understanding
into:

- Inferences;
- Business Assessments;
- strengths;
- risks;
- opportunities;
- priorities; and
- Business Needs.

It remains distinct from Business Understanding and Recommendation responsibility.

### 9.2 Frozen Business Brain relationship

Business Insight remains inside the sole frozen Business Brain Decision boundary:

- Business Brain Decision remains the only canonical Business Brain aggregate and write model.
- Decision Orchestrator remains the only component that completes a Decision.
- Existing Business Analyzer, Health Analyzer, Growth Advisor, Risk Analyzer, Capability Selector,
  and Decision Orchestrator responsibilities may contribute insight content.
- Recommendation candidate remains Decision-owned candidate content, not a Recommendation.
- Recommendation Engine remains the Recommendation owner.

### 9.3 Pre-registration boundary

Pre-registration candidate-derived insight may support Business Report Preview, but it is temporary
and non-canonical. It is not a completed canonical Business Brain Decision and is not a governed
Recommendation aggregate.

Canonical Business Brain Decisions continue to require the applicable authenticated Business scope,
published Business DNA, authorized inputs, and frozen Decision invariants.

### 9.4 No physical extraction

Business Insight Engine is not approved as:

- a physical service;
- a tenth Business Brain component;
- a package or module;
- a database or write model;
- an API or Event boundary; or
- a separate deployment or scaling unit.

Physical extraction remains deferred under
[RFC-001](../00-governance/RFC-REGISTER.md). No ownership transfers from Business Brain.

## 10. Decision Lineage

### 10.1 Purpose

Decision Lineage preserves how derived business advice was produced and which upstream knowledge and
sources materially supported it.

The minimum conceptual lineage remains:

~~~text
Recommendation
  → Recommended Capability
  → Business Need
  → Business Assessment
  → Inference
  → Observed Fact
  → Evidence
  → Original Source
~~~

Reverse impact must be conceptually traceable from a changed source to affected facts, Inferences,
Assessments, Needs, Capabilities, and Recommendations.

### 10.2 Scope

Lineage applies to material candidate-derived content, governed Business Brain Decisions,
Recommendation versions, and projections that present derived advice.

Each Recommendation version preserves, at minimum, equivalent information for:

- its reasoning snapshot;
- input knowledge version;
- generation time;
- generator identity;
- confidence; and
- review status.

This document establishes responsibility and required evidence only. It defines no record shape,
identifier syntax, schema, or storage location.

### 10.3 Relationship with Explainability

Decision Lineage and Explainability are related but separate:

- **Decision Lineage** records the derivation and dependency path.
- **Explainability** presents understandable reasoning, evidence, assumptions, uncertainty,
  alternatives, and expected benefit to an authorized audience.

A clear explanation does not prove complete lineage. A complete lineage graph does not by itself
provide an appropriate customer explanation.

### 10.4 Relationship with Audit

Decision Lineage and Audit are also separate:

- Lineage records how derived knowledge and advice relate.
- Audit records consequential activity, actors, authorization context, outcomes, and change history.

Audit Service remains the owner of append-only Audit Records. Business Brain, Recommendation Engine,
source owners, and projection owners retain responsibility for the lineage references applicable to
their outputs. Lineage cannot replace Audit, and Audit cannot become the derivation model.

### 10.5 Deferred mechanisms

This proposal does not define lineage persistence, graph technology, Event shape, cross-owner
contract, retention, deletion, invalidation, or presentation.

Full Decision Traceability UI remains deferred under
[RFC-002](../00-governance/RFC-REGISTER.md).

## 11. Preserved Architecture

### 11.1 Normative inheritance

All 52 guarantees in
[Core Platform Freeze section 5](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
are inherited unchanged and incorporated by reference.

Omission or shorter wording in this proposal does not weaken a frozen guarantee. In a conflict, the
current Freeze controls until an approved successor Freeze explicitly records otherwise.

### 11.2 Preserved ownership and boundary matrix

| Area | Preserved successor rule |
|---|---|
| Workspace | Remains the customer and tenant boundary; no anonymous Workspace is created |
| Business | Remains distinct from Workspace and Business Unit and is the owner context for Business DNA |
| Organization hierarchy | Remains Workspace → Business → Business Unit → Department and Branch |
| Business DNA | Remains one Business-scoped, versioned, software-independent canonical identity |
| Business DNA Registry | Remains the owner of DNA identity, publication, versions, provenance, and history |
| Business Brain | Retains the sole canonical Business Brain Decision write boundary and frozen deterministic invariants |
| Recommendation Engine | Retains Recommendation creation, prioritization, explanation, lifecycle, and disposition |
| Business Blueprint | Remains a non-writing projection over governed owner outputs |
| Product Hub | Retains product/OS discovery, composition, lifecycle navigation, handoff, launch, and recovery; owns neither Pre-Registration Business Discovery nor source records |
| Operating Systems | Remain independent and own setup, navigation, Permission semantics, configuration, readiness, operations, data, reports, and lifecycle |
| Marketplace | Retains its bounded context, asset/version ownership, scoped acquisition and installation semantics, and target-owner validation |
| AI Coordinator | Remains downstream and owns AI interactions and proposals, never canonical Business, Decision, Recommendation, Marketplace, or OS state |
| Capability Registry | Retains platform Capability definitions; OS Modules implement but do not redefine them |
| Knowledge and Rules | Retain governed, versioned ownership; published assets remain immutable; Rules remain deterministic and separate from AI |
| Configuration | Cross-owner change remains a Configuration Proposal validated and applied by the target owner |
| Readiness | Core Workspace Ready and Operating System Ready remain separate outcomes |
| Commercial lifecycle | Entitlement, Plan, OS Subscription, installation, setup, configuration, activation, readiness, access, pause, archive, and removal remain distinct |
| Permissions | Authentication never implies Authorization; explicit tenant, organization, actor, resource, and action scope remains required |
| Security and privacy | Tenant isolation, least privilege, data minimization, defense in depth, and owner reauthorization remain mandatory |
| Audit and observability | Audit remains append-only; logs, metrics, traces, health, and correlation remain non-owning |
| APIs and Contracts | Remain contract-first, technology-independent, versioned, scoped, observable, and backward-compatible |
| Events | Remain owner-authored facts; never disguised commands or ownership transfer |
| Integration | Cross-OS integration remains optional, authorized, versioned, observable, and failure-isolated |
| Deployment | Core remains an enforced modular monolith; logical boundaries and data ownership remain independent of topology |
| Evolution | Compatible additive change is preferred; breaking change requires governed versioning, migration, and deprecation |
| Localization and accessibility | Arabic/English, RTL/LTR, translation paths, and accessible critical flows remain mandatory implementation obligations |
| Historical governance | Accepted ADRs, Freezes, Genesis versions, Product Decisions, and Session identifiers remain immutable historical evidence |

### 11.3 Explicit no-change statement

Everything not explicitly changed in sections 2 through 10 remains exactly as defined by:

- the Core Platform Architecture v1.0 Freeze;
- the Business Brain, Commerce OS, Marketplace, AI Expert Network, and Global Platform Freezes;
- the Accepted ADR set;
- unaffected Genesis principles; and
- the approved milestone baselines.

This proposal transfers no owner and relaxes no guarantee.

## 12. Architecture Context Diagram

~~~text
PUBLIC / TEMPORARY CORE CONTEXT
┌──────────────────────────────────────────────────────────────────────────┐
│ Visitor                                                                  │
│    ↓                                                                     │
│ Core Business Discovery                                                  │
│    ├─ Discovery Goal / Strategy / Knowledge Gaps / Acquisition Method    │
│    ↓                                                                     │
│ Candidate Business Understanding — temporary, non-canonical              │
│    ↓                                                                     │
│ Understanding Reflection                                                 │
│    ↓                                                                     │
│ Business Report Preview — temporary projection                           │
│                                                                          │
│ No Workspace, Business, Membership, entitlement, Recommendation,         │
│ Business Brain Decision, or Operating System authority exists here.      │
└──────────────────────────────────────────────────────────────────────────┘
                                  ↓ explicit continue intent
AUTHENTICATION AND TENANT BOUNDARY
┌──────────────────────────────────────────────────────────────────────────┐
│ Core Identity and Access                                                 │
│    ↓ authenticated and authorized actor                                  │
│ Workspace Management → Workspace — customer / tenant boundary            │
│    ↓                                                                     │
│ Business Registry → Business — Business DNA owner context                │
└──────────────────────────────────────────────────────────────────────────┘
                                  ↓ reviewed candidate conversion
CANONICAL CORE BUSINESS CONTEXT
┌──────────────────────────────────────────────────────────────────────────┐
│ Business DNA Registry → approved Business DNA v1                         │
│    ↓                                                                     │
│ Business Architect / Guided Activation → governed DNA revisions          │
│    ↓                                                                     │
│ Business Brain Decision boundary                                         │
│    ├─ conceptual Business Insight responsibility                         │
│    └─ Decision-owned Recommendation candidate                            │
│    ↓                                      ↓                              │
│ Business Blueprint projection          Recommendation Engine             │
│ — governed, authenticated, non-writing  — Recommendation owner           │
│    └──────────────────────┬───────────────┘                              │
│                           ↓ journey composition                           │
│ Product Hub — owner-projection composition and handoff only              │
└──────────────────────────────────────────────────────────────────────────┘
                                  ↓ authorized setup handoff
INDEPENDENT OPERATING SYSTEM BOUNDARY
┌──────────────────────────────────────────────────────────────────────────┐
│ Applicable Operating System                                              │
│    ↓                                                                     │
│ OS-Specific Setup → Operating System Ready → Daily Operations            │
│                                                                          │
│ The Operating System owns its setup, configuration, readiness, and       │
│ operational state. Core does not write those facts.                      │
└──────────────────────────────────────────────────────────────────────────┘
~~~

The diagram shows ownership boundaries, not physical services, deployment units, APIs, data stores,
or user-interface surfaces.

## 13. Compatibility

### 13.1 Backward compatibility

Existing Login and Register entry remain supported during an approved incremental transition.
The existing authenticated Workspace and Business Architect architecture path is not removed merely
because Pre-Registration Discovery becomes the primary new-customer path.

A direct-registering new customer enters the authenticated candidate/review path in section 3.2 and
cannot bypass explicit approval or first publication controls. A returning customer does not need to
repeat Discovery where the required canonical understanding already exists.

### 13.2 Incremental migration

The architecture supports bounded adoption:

1. preserve existing authenticated paths and route direct-registering new customers through the
   authenticated candidate/review boundary;
2. introduce temporary Discovery without tenant authority;
3. validate candidate/canonical separation;
4. add authenticated conversion under owner validation;
5. move first Business DNA v1 publication to the approved conversion boundary;
6. continue the retained pipeline as Guided Activation; and
7. retire legacy entry assumptions only after separately approved compatibility and consumer
   evidence.

This is sequencing guidance, not an implementation plan.

### 13.3 No rewrite

The successor is additive around the frozen selected-Business pipeline. It does not replace Core,
Business Brain, Product Hub, Marketplace, AI Coordinator, Operating Systems, shared contracts, or the
modular-monolith baseline.

### 13.4 Historical preservation

The original Core Freeze, ADR-015, ADR-016, Customer Journey v1.0, Workspace Lifecycle v1.0, and
earlier Core documents remain preserved.

A future successor Freeze must identify:

- the exact predecessor;
- the Accepted ADR relationship;
- the exact changed statements;
- unchanged guarantees;
- source versions;
- compatibility impact; and
- approval status.

Historical artifacts must not be rewritten to imply that the successor journey was part of the
original v1.0 Freeze.

### 13.5 Successor relationship

The intended controlled sequence is:

~~~text
Governance Disposition
  → Proposed ADR-043 relationship for ADR-015 / ADR-016 / ADR-042
  → this successor architecture proposal
  → independent Architecture Review
  → explicit architecture approval
  → Core Platform Architecture v1.1 Freeze, if MINOR classification is confirmed
  → Genesis successor/addendum and source manifest
  → Readiness Validation
~~~

Until that sequence completes, Core Platform Architecture v1.0 remains the controlling Freeze.

## 14. Out of Scope

This proposal explicitly excludes:

- frontend architecture and frontend implementation;
- backend architecture and backend implementation;
- UI and UX design;
- screens, routes, navigation mechanics, wireframes, and interaction state;
- Feature 056 and any implementation specification;
- database, schema, migration, query, and transaction design;
- persistence, cache, queue, search, file, and storage design;
- Discovery token technology and retention duration;
- API, DTO, command, query, Event, webhook, and SDK design;
- service, module, package, and deployment extraction;
- exact Permission catalogs and role definitions;
- exact lifecycle state machines;
- exact confidence scales and sufficiency thresholds;
- Business DNA revision and rollback policy;
- Recommendation review, invalidation, and disposition workflow;
- Decision Lineage storage and full traceability presentation; and
- operating-system-specific setup or operations.

No excluded subject may be inferred from the conceptual boundaries in this proposal.

## 15. Architecture Readiness

### 15.1 Gate A — Architecture Review entry

Before formal Architecture Review:

- the Governance Disposition and authority interpretation are complete review inputs;
- Proposed ADR-043 explicitly defines the ADR-015/ADR-016/ADR-042 relationship;
- every delta in section 2 has exact source evidence;
- every Core Freeze section 5 guarantee is mapped as preserved;
- Business Brain impact is recorded in the Foundation compatibility artifact;
- the Genesis successor/addendum and immutable source manifest are present;
- no deferred RFC mechanism is presented as decided; and
- all relative links and document structure checks pass.

### 15.2 Gate B — Freeze alignment and Core Platform Architecture v1.1 Freeze

Before issuing a v1.1 Freeze:

- Architecture Review confirms the delta is a backward-compatible MINOR extension;
- all material review findings are resolved through Governance;
- any required new ADR is Accepted with a new unused identifier;
- the successor explicitly records its relationship to ADR-015, ADR-016, and ADR-042;
- the Business Brain successor action for conceptual Insight and Decision Lineage is approved;
- exact Genesis and Foundation source versions are identified;
- all 52 Core guarantees and inherited milestone boundaries are carried forward;
- compatibility, rollback, and historical-preservation obligations are approved;
- no unresolved issue requires a MAJOR architecture version; and
- explicit architecture approval is recorded.

If any condition fails, no v1.1 Freeze may be issued.

For this material delta, Freeze alignment is achieved through the approved successor Freeze. A
documentation-only Freeze Alignment Patch cannot replace this gate.

### 15.3 Gate C — Documentation alignment and UI/UX reconciliation

Before canonical UI/UX reconciliation:

- the successor Core Freeze is issued;
- Genesis successor/addendum treatment is approved;
- readiness validation passes;
- the canonical journey authority is unambiguous;
- temporary, candidate, canonical, projected, recommended, and operational concepts are
  distinguished;
- exact lifecycle/state questions remain clearly deferred where not approved; and
- stale UI/UX documents have an approved reconciliation inventory.

Factual current-state inventory and non-conflicting terminology analysis may continue before this
gate. Canonical flow, routes, screens, and state design may not.

### 15.4 Gate D — Feature 056 eligibility

Feature 056 remains not started. Before it or any equivalent Foundation feature may be created:

- Gate C passes;
- Governance confirms the feature identity and scope;
- no historical roadmap is treated as approval;
- the applicable Spec Kit specification is created through the normal sequential process;
- the specification cites the successor Freeze and Accepted ADRs; and
- product, ownership, compatibility, security, privacy, localization, accessibility, and testing
  decisions required for that slice are available.

### 15.5 Gate E — Implementation readiness

Before implementation:

- an approved specification, plan, and tasks exist;
- Constitution Checks pass;
- frontend and backend scope are separated where architecture permits;
- required retention, privacy, security, authorization, safe-retry, Audit, and observability
  decisions are approved;
- compatibility and migration plans protect existing behavior;
- Arabic/English, RTL/LTR, accessibility, failure, recovery, and test evidence are defined; and
- no frontend fixture or browser state is promoted into canonical platform truth.

This proposal supplies architecture context only. It does not satisfy implementation readiness.

## 16. Non-Supersession and Approval Statement

This approved successor architecture does not itself supersede, amend, deprecate, reinterpret, or
replace any Architecture Freeze, Accepted ADR, Product Decision, Genesis artifact, Foundation
artifact, or historical record.

Architecture Review v2 and Foundation Governance Approval v2.0 approved it as the basis for the
successor Freeze. It becomes controlling Core architecture only through Core Platform Architecture
v1.1 Freeze and remains subject to post-Freeze readiness.

## 17. Authoritative References

### 17.1 Controlling architecture and Governance

- [Core Platform Architecture v1.0 Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Business Brain Architecture v1.0 Freeze](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Architectural Milestone Lifecycle](../00-governance/MILESTONE-LIFECYCLE.md)
- [Core Platform / Foundation Governance Disposition v0.1](../00-governance/CORE-PLATFORM-FOUNDATION-GOVERNANCE-DISPOSITION-v0.1.md)
- [Foundation Authority Crosswalk v0.1](../00-governance/FOUNDATION-AUTHORITY-CROSSWALK-v0.1.md)
- [Foundation Audit v0.1](../08-implementation-audit/FOUNDATION-AUDIT-v0.1.md)
- [Core/Foundation Architecture Impact Review v0.1](./13-CORE-FOUNDATION-ARCHITECTURE-IMPACT-REVIEW-v0.1.md)

### 17.2 Accepted decisions and Foundation

- [ADR-003 — Workspace boundary](../00-governance/ADR/ADR-003-workspace-customer-multi-business-boundary.md)
- [ADR-004 — Organization hierarchy](../00-governance/ADR/ADR-004-genesis-organization-hierarchy.md)
- [ADR-005 — Business DNA](../00-governance/ADR/ADR-005-business-dna-business-scoped-software-independent.md)
- [ADR-013 — Recommendations](../00-governance/ADR/ADR-013-capability-first-explainable-recommendations.md)
- [ADR-014 — Human authority](../00-governance/ADR/ADR-014-human-control-over-recommendations-and-ai.md)
- [ADR-015 — Infer before asking](../00-governance/ADR/ADR-015-infer-before-asking-conversational-configuration.md)
- [ADR-016 — Business Architect pipeline](../00-governance/ADR/ADR-016-business-architect-governed-pipeline.md)
- [ADR-018 — Separate readiness](../00-governance/ADR/ADR-018-separate-core-and-os-readiness.md)
- [ADR-019 — Product Hub handoff](../00-governance/ADR/ADR-019-product-hub-discovery-and-os-handoff.md)
- [ADR-020 — Product Hub composition](../00-governance/ADR/ADR-020-product-hub-composition-not-data-ownership.md)
- [ADR-024 — Independent Operating Systems](../00-governance/ADR/ADR-024-independent-operating-system-domain-ownership.md)
- [ADR-033 — Enforced modular monolith](../00-governance/ADR/ADR-033-enforced-modular-monolith.md)
- [ADR-042 — Pre-Registration Business Discovery](../00-governance/ADR/ADR-042-pre-registration-business-discovery.md)
- [Accepted ADR-043 — Foundation Discovery and Business Architect composition](../00-governance/ADR/ADR-043-foundation-discovery-and-business-architect-composition.md)
- [Foundation Baseline v0.1](../00-governance/FOUNDATION-BASELINE-v0.1.md)
- [Product Constitution v1.1](../01-genesis/02-CONSTITUTION.md)
- [Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md)
- [Session Decision Register](../00-governance/SESSION-DECISION-REGISTER.md)
- [Domain Lexicon](../00-governance/glossary/GLOSSARY.md)
- [RFC Register](../00-governance/RFC-REGISTER.md)
- [Foundation Successor Authority Interpretation](../00-governance/FOUNDATION-SUCCESSOR-AUTHORITY-INTERPRETATION-v1.0.md)
- [Genesis Foundation Journey Successor Addendum](../01-genesis/21-FOUNDATION-JOURNEY-SUCCESSOR-ADDENDUM-v1.0.md)
- [Business Brain Foundation Compatibility](../03-business-brain/13-BUSINESS-BRAIN-FOUNDATION-COMPATIBILITY-v1.0.md)

### 17.3 Preserved Core sources

- [Core Platform Architecture Proposal](./02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Core Platform Architecture](./02-CORE-PLATFORM-ARCHITECTURE.md)
- [Core Platform Data Ownership](./04-DATA-OWNERSHIP.md)
- [Core Platform Permission Model](./05-PERMISSION-MODEL.md)
- [Core Platform Event Architecture](./06-EVENT-ARCHITECTURE.md)
- [Core Platform API Philosophy](./07-API-PHILOSOPHY.md)
- [Core Platform Security Model](./08-SECURITY-MODEL.md)
- [Core Platform Observability](./09-OBSERVABILITY.md)
- [Core Platform Deployment Model](./10-DEPLOYMENT-MODEL.md)
