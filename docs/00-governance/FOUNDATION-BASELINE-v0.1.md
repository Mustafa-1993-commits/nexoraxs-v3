# Foundation Baseline v0.1

**Version:** 0.1

**Status:** Active — Approved Architecture Snapshot

**Owner:** NexoraXS Product Governance

**Approval scope:** Approved Architecture Sessions 1–4

**Authority class:** Governance baseline subordinate to the controlling Architecture Freezes,
Accepted ADRs, and Genesis

---

## 1. Purpose

Foundation Baseline v0.1 is the official architecture snapshot of the NexoraXS product foundation
approved through Architecture Sessions 1–4. It consolidates the approved product doctrine,
customer journey, discovery and understanding model, knowledge-to-advice model, Decision Lineage,
Business DNA publication lifecycle, and governance structure into one navigable baseline.

This document does not supersede Genesis, an Architecture Freeze, or an Accepted ADR. It records
their continuing guarantees together with the approved Sessions 1–4 decisions and provides a stable
entry point for future product governance.

## 2. Scope and exclusions

### 2.1 Included

This baseline covers:

- the approved concept hierarchy;
- durable product doctrine, laws, and principles;
- Business Discovery and its knowledge-acquisition model;
- Candidate Business Understanding and authenticated conversion;
- the Business Understanding, Business Insight, Recommendation, and Report Projection boundaries;
- the customer journey from value before registration through Growth and Marketplace;
- the Business DNA publication and revision boundary;
- the Decision Lineage foundation required from MVP;
- Core Platform and Operating System ownership boundaries; and
- the governance artifacts that control future change.

### 2.2 Excluded

This baseline explicitly excludes:

- Architecture Session 5, which has not started;
- Feature 056 or any successor implementation specification;
- endpoint, DTO, event, persistence, token, database, queue, storage, or deployment design;
- framework, package, service, or physical-module decisions;
- screen-level interaction design and implementation sequencing;
- resolution of any registered future RFC topic; and
- any claim that the approved foundation has been implemented.

## 3. Authority and source hierarchy

The repository authority order remains:

1. [Architecture Freezes](../99-architecture-freeze/);
2. Governance, including [Accepted ADRs](./ADR/README.md), the
   [Domain Lexicon](./glossary/GLOSSARY.md), and the
   [Product Decision Register](./PRODUCT-DECISIONS.md);
3. [Genesis](../01-genesis/);
4. approved milestone baselines;
5. the engineering [Constitution](../../.specify/memory/constitution.md); and
6. execution guidance, feature specifications, plans, tasks, and implementation documents.

Within this hierarchy:

- the [Product Constitution](../01-genesis/02-CONSTITUTION.md) states durable product doctrine,
  laws, and principles;
- this Foundation Baseline records the approved Sessions 1–4 snapshot;
- the Domain Lexicon controls canonical names and meanings for the covered concepts;
- Accepted ADRs control durable architecture decisions within their approved scope;
- the Product Decision Register controls confirmed product direction;
- the [Session Decision Register](./SESSION-DECISION-REGISTER.md) preserves the Sessions 1–4
  decision record;
- the [RFC Register](./RFC-REGISTER.md) records unresolved future work without approving it; and
- the [Change Log](./CHANGELOG.md) records governance evolution without rewriting
  history.

If a summary in this baseline is incomplete, the higher or more specific authoritative source
controls. If two controlling sources materially conflict, the affected work stops and follows
Governance; this baseline is not permission to invent a compromise.

## 4. Approval record

Architecture Sessions 1–4 are **Approved and Locked**. Their approval dates are not recorded in the
repository and are therefore not inferred here.

| Session | Approved concern | Controlling record |
|---|---|---|
| Session 1 | Value before registration and method-independent Business Discovery | [Session decisions S01-D01–S01-D05](./SESSION-DECISION-REGISTER.md#session-1--value-before-registration-and-business-discovery) |
| Session 2 | Candidate understanding, reflection, conversion, Business DNA v1, and Guided Activation | [Session decisions S02-D01–S02-D06](./SESSION-DECISION-REGISTER.md#session-2--understanding-conversion-and-guided-activation) |
| Session 3 | Insight and Recommendation separation, knowledge types, and Product Ethics Law | [Session decisions S03-D01–S03-D05](./SESSION-DECISION-REGISTER.md#session-3--insight-recommendation-and-product-ethics) |
| Session 4 | Decision Lineage, explainability distinction, recommendation version evidence, and governance model | [Session decisions S04-D01–S04-D05](./SESSION-DECISION-REGISTER.md#session-4--lineage-explainability-and-governance) |

## 5. Approved concept hierarchy

The approved hierarchy is:

```text
Doctrine
→ Laws
→ Principles
→ Policies
→ Capabilities
→ Engines
→ Projections
→ Experience Patterns
```

These levels are not interchangeable:

- **Doctrine** states why NexoraXS exists and the durable position from which product decisions are
  made.
- **Laws** are non-negotiable product constraints.
- **Principles** guide choices that satisfy the Laws.
- **Policies** govern repeatable application of those principles in a defined scope.
- **Capabilities** state what the platform can do independently of one interface or implementation.
- **Engines** own named reasoning responsibilities and outputs.
- **Projections** present derived information without becoming its source of truth.
- **Experience Patterns** define customer interaction approaches and never redefine a Capability.

## 6. Approved product doctrine

NexoraXS is a Business Operating Intelligence Platform. It exists to understand a Business and help
that Business operate and improve with confidence. Software, products, plans, and adoption are means;
they are not the product's governing purpose.

The durable doctrine is:

1. improve the Business before promoting product adoption;
2. provide credible value before requiring registration;
3. understand before recommending;
4. recommend business value and Capabilities before products or plans;
5. preserve customer agency over approval, correction, and action; and
6. keep advice credible when no NexoraXS product is appropriate.

The complete durable statement is the
[NexoraXS Product Constitution](../01-genesis/02-CONSTITUTION.md).

## 7. Approved product laws

### 7.1 Product Ethics Law

> NexoraXS exists to improve businesses, not merely to increase product adoption.

Therefore:

- NexoraXS may recommend no product;
- NexoraXS may recommend retaining current tools;
- NexoraXS options are disclosed as NexoraXS options;
- reasonable alternatives are not intentionally hidden;
- recommendation order is not determined by NexoraXS commercial return; and
- advice must remain credible when it does not generate a sale.

### 7.2 Value Before Registration

The primary new-customer journey provides useful, reviewable business understanding before account
registration or Workspace creation. Pre-registration value creates no anonymous Workspace,
Business, membership, entitlement, subscription, or Operating System authority.

### 7.3 Understand Before Recommend

Observed Facts, Inferences, Assessments, Needs, and Desired Outcomes precede a Recommendation.
Missing, contradictory, or materially uncertain knowledge remains visible and reviewable.

### 7.4 Advice Before Product

A Recommended Capability follows an identified Business Need. An Implementation Option follows the
Capability. A NexoraXS product is suggested only when appropriate and must be identified as one
option rather than the business need itself.

### 7.5 Evidence and Provenance

Material derived knowledge preserves its Evidence, Original Source, confidence, review state, and
derivation relationship. Correction does not erase provenance.

### 7.6 Customer Agency and Human Authority

Candidate knowledge is reviewable and correctable. Canonical publication requires explicit approval
in an authenticated Business context. Recommendations remain optional. Consequential action remains
subject to current authorization and validation by the owning domain.

### 7.7 Canonical Ownership

Each canonical fact and lifecycle has one owner. Projections do not become canonical stores.
Core Platform does not own Operating System operational facts; an Operating System does not own
Core identity, Business DNA, Recommendations, or platform governance.

### 7.8 Governed Change

Canonical names, decision identifiers, ownership boundaries, and accepted architecture cannot change
silently. Material change requires the appropriate new Product Decision, ADR, RFC, review, approval,
and baseline update without erasing prior history.

## 8. Approved capabilities

| Capability | Approved responsibility | Boundary |
|---|---|---|
| Business Discovery | Pursue a defined Discovery Goal by finding material Knowledge Gaps and choosing the best Knowledge Acquisition Method | A product Capability; never defined as a questionnaire, chatbot, or conversation |
| Business Mapping | Normalize acquired material into structured, provenance-aware Candidate Business Understanding | Produces temporary candidate knowledge, not Business DNA |
| Understanding Reflection | Present material facts, interpretations, uncertainty, and contradictions for review and correction | Review experience; not canonical publication |
| Authenticated Conversion | Associate one approved Candidate Business Understanding with exactly one authenticated Business context for safe publication | Creates no anonymous tenant or Business authority |
| Business DNA Governance | Publish and revise approved, Business-scoped, versioned, software-independent Business DNA | Business DNA is canonical and belongs to exactly one Business |
| Guided Activation | Continue discovery after conversion, resolve uncertainty, validate material facts, and prepare governed authenticated projections | Does not replace OS-Specific Setup |
| Decision Lineage | Preserve the derivation path between Recommendations and their supporting knowledge and sources | Required from MVP; full traceability UI is deferred |
| Product Hub composition | Present relevant Capability and product-access projections and route to owner-controlled setup or launch | Does not own Recommendations, OS setup, or operational data |

## 9. Approved engines and conceptual responsibilities

The approved conceptual architecture is:

```text
Business Understanding Engine
→ Business Insight Engine
→ Recommendation Engine
→ Report Projection
```

### 9.1 Business Understanding Engine

Owns the understanding responsibility for:

- Observed Facts;
- Evidence and Original Sources;
- contradictions and unresolved knowledge;
- confidence and provenance; and
- Candidate Business Understanding.

It does not publish Business DNA without authenticated conversion and explicit approval.

### 9.2 Business Insight Engine

Owns the conceptual insight responsibility for:

- observations expressed as insight;
- Inferences;
- Business Assessments;
- strengths, risks, and opportunities;
- Business Priorities; and
- Business Needs.

This is an approved conceptual separation. It does not create a service, package, aggregate,
database, or contract. Under the current frozen Business Brain baseline, applicable insight content
may remain represented within the Business Brain Decision boundary. Any physical extraction or
canonical write-model change requires the registered RFC and Governance approval.

### 9.3 Recommendation Engine

Owns the Recommendation responsibility for:

- Desired Outcomes;
- Recommended Capabilities;
- actions and advisory Recommendations;
- Implementation Options; and
- suggested NexoraXS Operating Systems or products only when appropriate.

It does not own Business DNA, source evidence, Product Hub navigation, or target-domain execution.

### 9.4 Report Projection

Composes customer-facing views from governed source knowledge and derived outputs. A Report Projection
is never a source of truth and does not transfer ownership from the originating engine or domain.

## 10. Approved projections

| Projection | Purpose | Authority boundary |
|---|---|---|
| Understanding Reflection | Review and correct material candidate understanding | Temporary and pre-canonical |
| Business Report Preview | Provide useful business insight before registration | Temporary; not Business DNA, the governed authenticated Business Blueprint projection, entitlement, or implementation commitment |
| Business Blueprint | Present a governed authenticated customer-facing projection of Business DNA and governed owner outputs, including analysis, needs, Capabilities, roadmap, and readiness | Projection only; Business DNA and governed owner outputs remain the sources of truth |
| Recommendation presentation | Explain governed Recommendations, alternatives, confidence, and lineage | Does not own Recommendation lifecycle or execution |
| Product Hub composition | Present selected-Business or explicitly aggregated Workspace product context | Does not own source Recommendations, subscriptions, OS readiness, setup, or operational facts |

## 11. Approved experience patterns

### 11.1 Guided Business Conversation

Guided Business Conversation is Discovery Experience v1. It is one Knowledge Acquisition Method and
may use a conversational presentation. It is not Business Discovery itself.

### 11.2 Multi-method discovery

Business Discovery may acquire knowledge through forms, voice, website analysis, file or document
analysis, ERP or system import, external integrations, and future governed sources. The Discovery
Strategy selects the method appropriate to the current Knowledge Gap.

### 11.3 Understanding Reflection

The customer can distinguish supplied facts from Inferences and Business Assessments, see material
uncertainty, and correct the understanding before canonical publication.

### 11.4 Guided Activation

Business Architect continues after registration as Guided Activation. It reuses confirmed knowledge,
asks only where needed, and keeps Business activation separate from OS-Specific Setup.

## 12. Customer journey baseline

The approved product flow is:

```text
Value Before Registration
→ Business Discovery
→ Business Mapping
→ Business Understanding
→ Understanding Reflection
→ Business Report Preview
→ Create Workspace Intent
→ Authentication
→ Create or Select Workspace
→ Create or Select Business
→ Convert Candidate Business Understanding
→ Publish approved Business DNA v1
→ Guided Activation
→ Business Blueprint (governed authenticated projection)
→ Governed Recommendations
→ Product Hub
→ Operating System Selection
→ OS-Specific Setup
→ Daily Operations
→ Growth and Marketplace
```

The [Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md) is the detailed experience
authority. Existing Login and Register entry paths remain available for returning customers and for
authenticated conversion.

## 13. Knowledge lifecycle baseline

### 13.1 Discovery planning

```text
Discovery Goal
→ Discovery Strategy
→ Knowledge Gaps
→ Best Knowledge Acquisition Method
```

Discovery gathers only the knowledge material to the current goal. Completion means the goal's
approved sufficiency criteria are met, not that all conceivable business information has been
collected.

### 13.2 Understanding lifecycle

```text
Business Discovery
→ Business Mapping
→ Business Understanding Engine
→ Candidate Business Understanding
→ Understanding Reflection
→ Approved Business DNA
```

Candidate Business Understanding is temporary, pre-canonical, provenance-aware, confidence-aware,
reviewable, and correctable. Before conversion it is not owned by a Workspace or Business, cannot
authorize actions, and cannot configure an Operating System.

### 13.3 Knowledge-type separation

The following canonical knowledge types remain distinct:

```text
Observed Fact
→ Inference
→ Business Assessment
→ Business Need or Priority
→ Desired Outcome
→ Recommendation
```

An arrow records derivation order; it does not mean the concepts have the same meaning or lifecycle.

## 14. Insight and recommendation baseline

The approved knowledge-to-advice pipeline is:

```text
Observed Fact
→ Inference
→ Business Assessment
→ Business Need or Priority
→ Desired Outcome
→ Recommended Capability
→ Implementation Option
→ Suggested NexoraXS Product only when appropriate
```

Rules for this pipeline:

- an Observed Fact records what a source supplied or what was directly observed;
- an Inference is a derived interpretation and is never relabeled as a direct fact;
- a Business Assessment evaluates what the understanding means for the Business;
- a Business Need states a gap or improvement requirement;
- a Desired Outcome states the result sought;
- a Recommendation proposes a governed course of action;
- a Recommended Capability states what the Business needs independent of software; and
- an Implementation Option states one way to satisfy the Capability.

## 15. Decision Lineage baseline

Decision Lineage is mandatory from MVP:

```text
Recommendation
→ Recommended Capability
→ Business Need
→ Business Assessment
→ Inference
→ Observed Fact
→ Evidence
→ Original Source
```

The lineage must also support reverse impact traversal from an Original Source to affected facts,
inferences, assessments, needs, and recommendations.

At minimum, a Recommendation version preserves:

- its reasoning snapshot;
- the input knowledge version;
- generation timestamp;
- generator identity;
- confidence; and
- review status.

Lineage and Explainability are related but separate:

- **Decision Lineage** records how a derived result was produced; and
- **Explainability** presents understandable reasoning to the customer or reviewer.

Deferral of the full Decision Traceability UI does not defer the lineage foundation.

## 16. Business DNA publication lifecycle

```text
Discovery Session
→ Candidate Business Understanding
→ Understanding Reflection
→ Create Workspace Intent
→ Authentication
→ Workspace resolution
→ Business selection
→ Explicit approval
→ Publish Business DNA v1
→ Guided Activation
→ Governed Business DNA Revision
```

Publication rules:

1. No anonymous Workspace or Business state is created.
2. Candidate knowledge remains non-canonical until conversion.
3. Conversion targets exactly one authenticated Business context at a time.
4. Only approved material is published.
5. Provenance, corrections, confidence, and lineage are preserved.
6. Business DNA v1 is the first governed publication.
7. Guided Activation may publish governed revisions; it does not replace or duplicate first
   publication.
8. Business DNA remains software-independent and never becomes a report, product selection, plan,
   or OS configuration.

## 17. Core Platform and Operating System boundaries

### 17.1 Core Platform owns

- identity, authentication, Workspace and organization context;
- Business Discovery, Candidate Business Understanding, and conversion orchestration;
- Business DNA publication and governance;
- Business Understanding and platform intelligence responsibilities within their approved
  conceptual and frozen boundaries;
- governed Recommendations and approved Core projections;
- Product Hub composition and setup handoff; and
- shared platform governance and coordination.

### 17.2 Each Operating System owns

- OS-Specific Setup;
- its operational domain model and facts;
- operational commands, workflows, configuration, and validation;
- its UI, navigation, reports, dashboards, and settings; and
- Operating System readiness and daily operations within its boundary.

### 17.3 Boundary guarantees

- Pre-registration discovery may recommend Capabilities but cannot write OS data.
- Guided Activation does not replace OS-Specific Setup.
- Product Hub may compose owner projections and route the customer; it owns neither Recommendations
  nor OS operational state.
- Core Workspace Ready and Operating System Ready remain distinct.
- A co-deployed module or frontend projection does not gain canonical ownership.

## 18. Governance artifact map

```text
Product Governance
├── Product Constitution
├── Foundation Baseline
├── Domain Lexicon
├── Architecture Decision Records
├── Product Decision Register
├── Session Decision Register
├── RFC Register
└── Change Log
```

| Artifact | Canonical location | Responsibility |
|---|---|---|
| Product Constitution | [Genesis Product Constitution](../01-genesis/02-CONSTITUTION.md) | Durable Doctrine, Laws, and Principles |
| Foundation Baseline | This document | Approved product-foundation snapshot |
| Domain Lexicon | [Canonical Glossary / Domain Lexicon](./glossary/GLOSSARY.md) | Canonical names, meanings, distinctions, and deprecations |
| Architecture Decision Records | [ADR directory](./ADR/README.md) | Durable accepted architecture decisions and history |
| Product Decision Register | [PRODUCT-DECISIONS.md](./PRODUCT-DECISIONS.md) | Confirmed product direction and amendments |
| Session Decision Register | [SESSION-DECISION-REGISTER.md](./SESSION-DECISION-REGISTER.md) | Sessions 1–4 approval record |
| RFC Register | [RFC-REGISTER.md](./RFC-REGISTER.md) | Deferred architectural questions and opening triggers |
| Change Log | [CHANGELOG.md](./CHANGELOG.md) | Product-governance baseline evolution |

## 19. Open RFC topics

The following topics are registered but not approved or started:

- physical extraction of Business Insight Engine;
- full Decision Traceability UI;
- Discovery Session retention duration;
- Candidate conversion token implementation;
- backend persistence contracts;
- Knowledge Acquisition integrations;
- Recommendation review workflow;
- cross-Business Workspace aggregation rules;
- Business DNA revision and rollback policy;
- Explainability presentation policy; and
- Recommendation lifecycle and invalidation policy.

The complete status and opening conditions are in the [RFC Register](./RFC-REGISTER.md). Registering
an RFC does not start Session 5 or authorize implementation.

## 20. Baseline change policy

Foundation Baseline v0.1 is preserved as an immutable approved snapshot. Corrections that change no
approved meaning may be recorded through an explicitly reviewed documentation patch. A material
change must:

1. identify the affected Doctrine, Law, Principle, Capability, Engine, Projection, Experience
   Pattern, owner, or lifecycle;
2. cite the decision or ADR being changed;
3. receive the applicable Product or Architecture approval;
4. use a new permanent decision or ADR identifier where required;
5. update the Domain Lexicon and affected authoritative documents;
6. record supersession or replacement metadata without reusing identifiers;
7. add a Change Log entry; and
8. publish a successor baseline version rather than rewriting this version to hide evolution.

One Concept has one Canonical Name. One Name has one Meaning. Customer-facing language may differ
only when its relationship to the canonical term is explicit.

## 21. Authoritative references

### Governance

- [Product Constitution](../01-genesis/02-CONSTITUTION.md)
- [Product Decision Register](./PRODUCT-DECISIONS.md)
- [Session Decision Register](./SESSION-DECISION-REGISTER.md)
- [RFC Register](./RFC-REGISTER.md)
- [Change Log](./CHANGELOG.md)
- [Domain Lexicon](./glossary/GLOSSARY.md)
- [ADR-042: Pre-Registration Business Discovery](./ADR/ADR-042-pre-registration-business-discovery.md)
- [ADR Index](./ADR/README.md)

### Genesis and frozen architecture

- [Genesis Vision](../01-genesis/01-VISION.md)
- [Business DNA](../01-genesis/03-BUSINESS-DNA.md)
- [Business Brain](../01-genesis/06-BUSINESS-BRAIN.md)
- [Recommendation Engine](../01-genesis/07-RECOMMENDATION-ENGINE.md)
- [Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md)
- [Product Hub](../01-genesis/13-PRODUCT-HUB.md)
- [Operating System Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)
- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)

## 22. Baseline declaration

Foundation Baseline v0.1 is active as the approved architecture snapshot for Sessions 1–4. It
records approved product-foundation meaning while preserving the superior authority and history of
Genesis, Architecture Freezes, and Accepted ADRs.

Session 5 is explicitly not started. This baseline approves no implementation.
