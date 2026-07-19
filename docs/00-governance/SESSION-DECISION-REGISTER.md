# Session Decision Register

**Version:** 0.1

**Status:** Active — Sessions 1–4 Approved and Locked

**Owner:** NexoraXS Product Governance

**Approval dates:** Not recorded

---

## 1. Purpose

This register preserves the approved product-foundation decisions made through Architecture
Sessions 1–4. Its local identifiers are permanent and must not be reused. The register summarizes
decisions; the linked Accepted ADRs, Product Decisions, Genesis documents, and Architecture Freezes
remain authoritative for their specific scope.

Session 5 is outside this register and has not started.

## 2. Status definitions

- **Approved and Locked** — approved within Sessions 1–4 and changeable only through Governance.
- **Superseded** — retained for history and replaced by an identified later decision.
- **Deferred to RFC** — no decision was made; the future question is recorded in the RFC Register.

## 3. Decision summary

| ID | Session | Decision | Status | Primary authority |
|---|---|---|---|---|
| S01-D01 | 1 | Value before registration | Approved and Locked | PD-011; ADR-042 |
| S01-D02 | 1 | Business Discovery is a product Capability | Approved and Locked | PD-012; ADR-042 |
| S01-D03 | 1 | Discovery is goal- and strategy-driven | Approved and Locked | ADR-042 |
| S01-D04 | 1 | Knowledge Acquisition Methods are plural and extensible | Approved and Locked | ADR-042 |
| S01-D05 | 1 | Guided Business Conversation is Discovery Experience v1 only | Approved and Locked | PD-012; ADR-042 |
| S02-D01 | 2 | Candidate Business Understanding is temporary and pre-canonical | Approved and Locked | PD-013; ADR-042 |
| S02-D02 | 2 | Business Mapping precedes canonical publication | Approved and Locked | Customer Journey v1.2; ADR-042 |
| S02-D03 | 2 | Understanding Reflection precedes conversion | Approved and Locked | ADR-042 |
| S02-D04 | 2 | Authenticated conversion publishes Business DNA v1 | Approved and Locked | PD-015; ADR-042 |
| S02-D05 | 2 | Guided Activation continues discovery after conversion | Approved and Locked | PD-016; ADR-042 |
| S02-D06 | 2 | Guided Activation and OS-Specific Setup remain separate | Approved and Locked | PD-016; ADR-024 |
| S03-D01 | 3 | Understanding, Insight, Recommendation, and Projection are conceptually separated | Approved and Locked | PD-017; ADR-042 |
| S03-D02 | 3 | Knowledge types retain distinct meanings | Approved and Locked | PD-017; ADR-042 |
| S03-D03 | 3 | Business Insight Engine is conceptually approved; extraction is deferred | Approved and Locked | ADR-042 |
| S03-D04 | 3 | Product Ethics Law governs advice | Approved and Locked | PD-018; ADR-042 |
| S03-D05 | 3 | Capabilities and business value precede product suggestions | Approved and Locked | PD-017; PD-018; ADR-013 |
| S04-D01 | 4 | Decision Lineage is required from MVP | Approved and Locked | ADR-042 |
| S04-D02 | 4 | Decision Lineage and Explainability are distinct | Approved and Locked | ADR-042 |
| S04-D03 | 4 | Recommendation versions preserve minimum reasoning evidence | Approved and Locked | ADR-042 |
| S04-D04 | 4 | Canonical terminology and identifiers are governed | Approved and Locked | ADR governance; Domain Lexicon |
| S04-D05 | 4 | Foundation governance uses eight named artifact classes | Approved and Locked | Approved Session 4 governance direction |

## 4. Detailed decisions

### Session 1 — Value before registration and Business Discovery

#### S01-D01 — Value before registration

- **Status:** Approved and Locked
- **Decision summary:** The primary new-customer journey provides useful, reviewable Business insight
  before account registration or Workspace creation.
- **Rationale:** A customer should experience the platform's core value before being asked to commit.
- **Affected concepts:** Business Discovery; Business Report Preview; Create Workspace Intent
- **Related ADRs:** [ADR-042](./ADR/ADR-042-pre-registration-business-discovery.md)
- **Related product decisions:** [PD-011](./PRODUCT-DECISIONS.md#pd-011--customers-experience-value-before-registration)
- **Related documents:** [Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md)
- **Future RFC implications:** Discovery Session retention and conversion-token implementation

#### S01-D02 — Business Discovery is a product Capability

- **Status:** Approved and Locked
- **Decision summary:** Business Discovery is the Core-owned Capability that acquires the business
  knowledge material to a Discovery Goal. It is not a conversation, questionnaire, form, or chatbot.
- **Rationale:** The capability must survive changes in interface and acquisition technology.
- **Affected concepts:** Business Discovery; Discovery Goal; Discovery Strategy
- **Related ADRs:** [ADR-042](./ADR/ADR-042-pre-registration-business-discovery.md)
- **Related product decisions:** [PD-012](./PRODUCT-DECISIONS.md#pd-012--business-discovery-begins-before-workspace-creation)
- **Related documents:** [Domain Lexicon](./glossary/GLOSSARY.md#domain-business-discovery)
- **Future RFC implications:** Knowledge Acquisition integrations

#### S01-D03 — Discovery is goal- and strategy-driven

- **Status:** Approved and Locked
- **Decision summary:** A Discovery Goal defines the understanding outcome. Discovery Strategy
  identifies material Knowledge Gaps, selects the next valuable knowledge need, chooses the best
  Knowledge Acquisition Method, and determines when the goal is sufficiently met.
- **Rationale:** Discovery should acquire material knowledge rather than maximize questions or data.
- **Affected concepts:** Discovery Goal; Discovery Strategy; Knowledge Gap
- **Related ADRs:** [ADR-042](./ADR/ADR-042-pre-registration-business-discovery.md)
- **Related product decisions:** PD-012
- **Related documents:** [Foundation Baseline](./FOUNDATION-BASELINE-v0.1.md#131-discovery-planning)
- **Future RFC implications:** Acquisition-method policy and sufficiency implementation

#### S01-D04 — Knowledge Acquisition Methods are plural and extensible

- **Status:** Approved and Locked
- **Decision summary:** Discovery may use guided conversation, forms, voice, website analysis, file
  or document analysis, ERP or system import, external integrations, and future governed sources.
- **Rationale:** The best method depends on the Knowledge Gap and available evidence.
- **Affected concepts:** Knowledge Acquisition Method; Discovery Experience
- **Related ADRs:** ADR-042
- **Related product decisions:** PD-012
- **Related documents:** [Domain Lexicon](./glossary/GLOSSARY.md#domain-knowledge-acquisition-method)
- **Future RFC implications:** Knowledge Acquisition integrations

#### S01-D05 — Guided Business Conversation is Discovery Experience v1 only

- **Status:** Approved and Locked
- **Decision summary:** Guided Business Conversation is the first approved customer-facing Discovery
  Experience. It does not define the Business Discovery Capability.
- **Rationale:** A current experience pattern must not constrain the durable product capability.
- **Affected concepts:** Guided Business Conversation; Discovery Experience; Business Discovery
- **Related ADRs:** ADR-042; ADR-015
- **Related product decisions:** PD-012
- **Related documents:** [Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md#phase-2--business-discovery)
- **Future RFC implications:** None beyond method-specific experience specifications

### Session 2 — Understanding, conversion, and Guided Activation

#### S02-D01 — Candidate Business Understanding is temporary and pre-canonical

- **Status:** Approved and Locked
- **Decision summary:** Pre-registration knowledge is provenance-aware, confidence-aware, reviewable,
  and correctable Candidate Business Understanding. It has no Workspace or Business owner before
  conversion and cannot authorize actions or configure an Operating System.
- **Rationale:** Anonymous or temporary input cannot silently become canonical Business truth.
- **Affected concepts:** Candidate Business Understanding; Observed Fact; Inference; Evidence
- **Related ADRs:** ADR-042; ADR-005
- **Related product decisions:** PD-013
- **Related documents:** [Domain Lexicon](./glossary/GLOSSARY.md#domain-candidate-business-understanding)
- **Future RFC implications:** Retention, token, persistence, and conversion implementation

#### S02-D02 — Business Mapping precedes canonical publication

- **Status:** Approved and Locked
- **Decision summary:** Business Mapping structures acquired material into Candidate Business
  Understanding before review or canonical publication.
- **Rationale:** Raw input, derived interpretation, uncertainty, and provenance must remain
  distinguishable before approval.
- **Affected concepts:** Business Mapping; Candidate Business Understanding
- **Related ADRs:** ADR-042
- **Related product decisions:** PD-013
- **Related documents:** [Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md#phase-3--business-mapping)
- **Future RFC implications:** Backend persistence contracts

#### S02-D03 — Understanding Reflection precedes conversion

- **Status:** Approved and Locked
- **Decision summary:** Material candidate knowledge is reflected for confirmation or correction,
  with supplied facts, Inferences, Assessments, uncertainty, and contradictions distinguished.
- **Rationale:** The customer must be able to correct meaning before canonical publication.
- **Affected concepts:** Understanding Reflection; Explainability; provenance
- **Related ADRs:** ADR-042
- **Related product decisions:** PD-013; PD-015
- **Related documents:** [Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md#phase-4--understanding-reflection)
- **Future RFC implications:** Explainability presentation policy

#### S02-D04 — Authenticated conversion publishes Business DNA v1

- **Status:** Approved and Locked
- **Decision summary:** After authentication, Workspace resolution, Business selection, and explicit
  approval, candidate knowledge is safely converted into the selected Business's first governed
  Business DNA publication.
- **Rationale:** Business DNA is canonical, Business-scoped, and cannot be anonymously owned.
- **Affected concepts:** Workspace; Business; Business DNA; Business DNA Revision
- **Related ADRs:** ADR-003; ADR-005; ADR-042
- **Related product decisions:** PD-015
- **Related documents:** [Business DNA](../01-genesis/03-BUSINESS-DNA.md)
- **Future RFC implications:** Candidate conversion token; Business DNA revision and rollback policy

#### S02-D05 — Guided Activation continues discovery after conversion

- **Status:** Approved and Locked
- **Decision summary:** Business Architect continues as Guided Activation, resolving material gaps,
  validating facts, publishing governed Business DNA revisions, and preparing governed authenticated
  projections such as Business Blueprint.
- **Rationale:** Registration converts and preserves prior understanding; it does not restart an
  unrelated onboarding interview.
- **Affected concepts:** Guided Activation; Business Architect; Business Blueprint
- **Related ADRs:** ADR-016; ADR-042
- **Related product decisions:** PD-016
- **Related documents:** [Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md#phase-11--guided-activation--business-architect)
- **Future RFC implications:** Business DNA revision policy

#### S02-D06 — Guided Activation and OS-Specific Setup remain separate

- **Status:** Approved and Locked
- **Decision summary:** Guided Activation is Core-owned business-understanding work. OS-Specific
  Setup is owned by the selected Operating System and governs its operational readiness.
- **Rationale:** Core and Operating Systems retain separate ownership and readiness outcomes.
- **Affected concepts:** Guided Activation; OS-Specific Setup; Core Workspace Ready; Operating System Ready
- **Related ADRs:** ADR-018; ADR-024; ADR-040; ADR-042
- **Related product decisions:** PD-009; PD-016
- **Related documents:** [Operating System Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)
- **Future RFC implications:** None within Sessions 1–4

### Session 3 — Insight, Recommendation, and Product Ethics

#### S03-D01 — Understanding, Insight, Recommendation, and Projection are conceptually separated

- **Status:** Approved and Locked
- **Decision summary:** The conceptual chain is Business Understanding Engine → Business Insight
  Engine → Recommendation Engine → Report Projection.
- **Rationale:** Source understanding, evaluation, advice, and presentation require distinct meanings
  and accountable responsibilities.
- **Affected concepts:** Business Understanding Engine; Business Insight Engine; Recommendation Engine; Report Projection
- **Related ADRs:** ADR-012; ADR-013; ADR-042
- **Related product decisions:** PD-017
- **Related documents:** [Foundation Baseline](./FOUNDATION-BASELINE-v0.1.md#9-approved-engines-and-conceptual-responsibilities)
- **Future RFC implications:** Physical extraction of Business Insight Engine

#### S03-D02 — Knowledge types retain distinct meanings

- **Status:** Approved and Locked
- **Decision summary:** Observed Fact, Inference, Business Assessment, Business Need, Desired Outcome,
  and Recommendation cannot be collapsed into one generic insight or recommendation type.
- **Rationale:** Trust, correction, lineage, confidence, and review depend on knowing what kind of
  knowledge is being presented.
- **Affected concepts:** All listed knowledge types
- **Related ADRs:** ADR-013; ADR-042
- **Related product decisions:** PD-017
- **Related documents:** [Domain Lexicon](./glossary/GLOSSARY.md)
- **Future RFC implications:** Backend persistence contracts

#### S03-D03 — Business Insight Engine is conceptually approved; extraction is deferred

- **Status:** Approved and Locked
- **Decision summary:** Business Insight Engine owns the conceptual responsibility for Inferences,
  Assessments, strengths, risks, opportunities, Priorities, and Needs. No physical module, service,
  aggregate, database, or contract is approved by this decision.
- **Rationale:** Conceptual clarity is needed now; physical extraction requires implementation and
  operational evidence.
- **Affected concepts:** Business Insight Engine; Business Brain Decision
- **Related ADRs:** ADR-012; ADR-033; ADR-042
- **Related product decisions:** PD-017
- **Related documents:** [Business Brain Freeze](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- **Future RFC implications:** RFC-001

#### S03-D04 — Product Ethics Law governs advice

- **Status:** Approved and Locked
- **Decision summary:** NexoraXS exists to improve businesses, not merely to increase product
  adoption. Advice remains credible even when it generates no sale.
- **Rationale:** Recommendations lose their business value when commercial return determines advice.
- **Affected concepts:** Product Law; Recommendation; Implementation Option
- **Related ADRs:** ADR-013; ADR-014; ADR-042
- **Related product decisions:** PD-018
- **Related documents:** [Product Constitution](../01-genesis/02-CONSTITUTION.md#laws)
- **Future RFC implications:** Recommendation review and lifecycle policy

#### S03-D05 — Capabilities and business value precede product suggestions

- **Status:** Approved and Locked
- **Decision summary:** The pipeline identifies the Business Need and Desired Outcome, recommends a
  Capability, and only then offers Implementation Options or a NexoraXS product when appropriate.
- **Rationale:** The product must solve the Business need rather than redefine it as software demand.
- **Affected concepts:** Business Need; Desired Outcome; Recommended Capability; Implementation Option
- **Related ADRs:** ADR-007; ADR-013; ADR-019; ADR-042
- **Related product decisions:** PD-017; PD-018
- **Related documents:** [Recommendation Engine](../01-genesis/07-RECOMMENDATION-ENGINE.md)
- **Future RFC implications:** Recommendation lifecycle and review workflow

### Session 4 — Lineage, Explainability, and Governance

#### S04-D01 — Decision Lineage is required from MVP

- **Status:** Approved and Locked
- **Decision summary:** Every Recommendation retains a traversable derivation path through Capability,
  Need, Assessment, Inference, Observed Fact, Evidence, and Original Source.
- **Rationale:** Historical recommendations must remain auditable, correctable, and attributable.
- **Affected concepts:** Decision Lineage; Recommendation; Evidence; Original Source
- **Related ADRs:** ADR-013; ADR-038; ADR-042
- **Related product decisions:** PD-017
- **Related documents:** [Foundation Baseline](./FOUNDATION-BASELINE-v0.1.md#15-decision-lineage-baseline)
- **Future RFC implications:** Full Decision Traceability UI

#### S04-D02 — Decision Lineage and Explainability are distinct

- **Status:** Approved and Locked
- **Decision summary:** Lineage records derivation. Explainability presents understandable reasoning
  to a customer or reviewer. Delivery of one does not imply completion of the other.
- **Rationale:** A technical derivation graph and a comprehensible explanation serve different needs.
- **Affected concepts:** Decision Lineage; Explainability
- **Related ADRs:** ADR-013; ADR-042
- **Related product decisions:** PD-017
- **Related documents:** [Domain Lexicon](./glossary/GLOSSARY.md#domain-decision-lineage)
- **Future RFC implications:** Full traceability UI; Explainability presentation policy

#### S04-D03 — Recommendation versions preserve minimum reasoning evidence

- **Status:** Approved and Locked
- **Decision summary:** Each Recommendation version retains a reasoning snapshot, input knowledge
  version, generation timestamp, generator identity, confidence, and review status.
- **Rationale:** Later changes must not make a historical Recommendation impossible to explain.
- **Affected concepts:** Recommendation; Decision Lineage; Explainability
- **Related ADRs:** ADR-013; ADR-038; ADR-042
- **Related product decisions:** PD-017
- **Related documents:** [Foundation Baseline](./FOUNDATION-BASELINE-v0.1.md#15-decision-lineage-baseline)
- **Future RFC implications:** Recommendation lifecycle and invalidation policy

#### S04-D04 — Canonical terminology and identifiers are governed

- **Status:** Approved and Locked
- **Decision summary:** One Concept has one Canonical Name; one Name has one Meaning; customer-facing
  labels may differ only through an explicit mapping. Deprecated terms remain recorded with their
  replacements. Decision and ADR identifiers are immutable and never reused.
- **Rationale:** Silent naming drift destroys ownership, traceability, and decision history.
- **Affected concepts:** Domain Lexicon; Product Decision; ADR; deprecated term
- **Related ADRs:** ADR governance applies
- **Related product decisions:** Product Decision Register change control
- **Related documents:** [Domain Lexicon](./glossary/GLOSSARY.md); [ADR Index](./ADR/README.md)
- **Future RFC implications:** None

#### S04-D05 — Foundation governance uses eight named artifact classes

- **Status:** Approved and Locked
- **Source:** Approved Session 4 governance direction. This register preserves that source decision;
  Foundation Baseline v0.1 documents the approved result but did not create it.
- **Decision summary:** Product Governance contains Product Constitution, Foundation Baseline,
  Domain Lexicon, ADRs, Product Decision Register, Session Decision Register, RFC Register, and
  Change Log.
- **Rationale:** Each governance concern needs one named, navigable authority and an explicit change
  lifecycle.
- **Affected concepts:** All governance artifacts
- **Related ADRs:** None created; existing ADR lifecycle remains unchanged
- **Related product decisions:** Existing Product Decision Register remains canonical
- **Related documents:** [Foundation Baseline](./FOUNDATION-BASELINE-v0.1.md#18-governance-artifact-map),
  which documents this approved Session 4 direction
- **Future RFC implications:** None

## 5. Change control

- A Session Decision ID is never reused.
- Material change requires a new Session Decision or another applicable governance decision that
  explicitly supersedes the prior entry.
- Existing entries remain visible after supersession.
- This register cannot accept an ADR, open an RFC, approve implementation, or start Session 5.

## 6. References

- [Foundation Baseline v0.1](./FOUNDATION-BASELINE-v0.1.md)
- [Product Decision Register](./PRODUCT-DECISIONS.md)
- [ADR-042](./ADR/ADR-042-pre-registration-business-discovery.md)
- [Domain Lexicon](./glossary/GLOSSARY.md)
- [Customer Journey v1.2](../01-genesis/11-CUSTOMER-JOURNEY.md)
- [RFC Register](./RFC-REGISTER.md)
