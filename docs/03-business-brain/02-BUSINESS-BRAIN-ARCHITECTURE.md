# Business Brain Architecture

Version: 1.0  
Status: Wave 1 — Approved Proposal Expansion  
Milestone: Business Brain  
Architecture baseline: Core Platform v1.0  
Documentation baseline: Core Platform v1.0.1  
Proposal baseline: Business Brain Proposal v0.1 + Freeze Alignment Patch v0.1.1  
Owner: Nexoraxs

---

## 1. Purpose

This document expands the approved Business Brain Proposal baseline into the detailed logical architecture for Wave 1.

It defines the internal logical layers, nine logical components, dependency direction, Decision formation flow, downstream boundaries, and architectural invariants. It does not define physical packages, services, APIs, Events, databases, technologies, or deployment topology.

## 2. Scope

This document covers:

- Business Brain's logical boundary inside Core Platform;
- internal architecture and logical layers;
- the nine approved Proposal components;
- component responsibilities, inputs, outputs, and prohibited ownership;
- component collaboration and dependency direction;
- canonical Decision formation;
- downstream Recommendation, Configuration, Product Hub, AI, Marketplace, and OS relationships;
- write-model and read-model placement at architecture level; and
- unresolved decisions that remain deferred.

It does not redesign Core Platform, define the detailed Domain Model or Data Ownership rules duplicated in companion Wave 1 documents, or authorize implementation.

## 3. Authority and Interpretation

The architecture follows this authority order:

1. Genesis v1.1;
2. Governance and accepted ADRs;
3. Core Platform Architecture v1.0 and Documentation Baseline v1.0.1;
4. approved Business Brain Discovery and Capability Map;
5. Business Brain Proposal v0.1 as aligned by Patch v0.1.1; and
6. approved Business Brain Architecture Re-Review.

Patch v0.1.1 governs every AI-related conflict in the original Proposal. Business Brain completes its canonical Decision without AI. AI Coordinator acts only after completion and owns every downstream AI artifact.

## 4. Mission

Business Brain is the shared Core Platform decision engine.

Its mission is to transform authorized, versioned Business context into a deterministic, explainable, provider-independent Business Brain Decision that:

- understands one Business by default;
- preserves explicit Workspace aggregation when authorized;
- identifies business needs and candidate Capabilities before software;
- evaluates health, growth, and risk;
- preserves evidence, rationale, confidence, assumptions, alternatives, conflicts, and uncertainty;
- forms recommendation candidates and configuration inputs for existing downstream owners; and
- supports future learning from approved feedback without rewriting source truth.

## 5. Architectural Principles

1. Business before software.
2. Business scope by default; Workspace aggregation only when explicit and authorized.
3. One canonical owner for every source and output.
4. Business Brain references Business DNA, Knowledge, Rules, Capabilities, analytics, and commercial state; it does not duplicate them.
5. Deterministic Rules remain authoritative and separate from AI.
6. Capability reasoning precedes Implementation Option mapping.
7. Business Brain Decision is not a Recommendation.
8. Recommendation candidate is not a Recommendation.
9. Configuration input is not a Configuration Proposal or target change.
10. Completed Decisions are immutable and append-preserving.
11. Reanalysis creates a new Decision rather than rewriting history.
12. Explanation is part of Decision formation.
13. Human control and owning-domain validation remain mandatory for consequential action.
14. AI is downstream of the completed Decision and never contributes to Decision formation.
15. Logical components do not imply physical services.
16. Contracts remain technology-independent and versioned.
17. Projections remain disposable and never prove current Permission.
18. Tenant isolation, least privilege, Audit, and observability apply throughout.

## 6. Logical Boundary

### 6.1 Inside Business Brain

Business Brain contains logical responsibility for:

- Business understanding and analysis;
- candidate Capability reasoning;
- health, growth, and risk reasoning;
- Decision evaluation coordination;
- exact input-manifest composition;
- contribution validation and conflict exposure;
- Decision explanation and completion;
- recommendation candidate formation;
- configuration input formation; and
- governed interpretation of approved feedback for future reasoning.

### 6.2 Outside Business Brain

| External responsibility | Canonical owner |
|---|---|
| Business DNA facts, publication, correction, provenance, and history | Business DNA Registry |
| Knowledge and Knowledge Pack content and lifecycle | Knowledge Engine |
| Capability definitions and lifecycle | Capability Registry |
| Rule definitions and official outcomes | Rules domain |
| Analytics source truth and intake governance | Analytics Intake and source owners |
| Recommendation identity, prioritization, lifecycle, and disposition | Recommendation Engine |
| Implementation Option mapping | Core intelligence mapping |
| Configuration Proposal and target handoff | Configuration Engine |
| Product Hub journey and presentation | Product Hub |
| Marketplace Assets and scoped state | Marketplace bounded context |
| AI orchestration, AI outputs, and AI Action Proposals | AI Coordinator |
| OS setup, configuration, operations, and execution | Applicable Operating System |
| Authentication, Membership, shared Permission foundation | Core Identity and Access |
| Audit Records | Audit Service |

### 6.3 Boundary invariant

Sharing a modular-monolith runtime does not permit direct writes across these boundaries. Every owner validates its own state through an approved logical contract.

## 7. Internal Architecture

### 7.1 Logical layers

| Layer | Responsibility | Components |
|---|---|---|
| Analysis | Interpret authorized Business context and identify needs, Capabilities, health, growth, and risk. | Business Analyzer, Capability Selector, Health Analyzer, Growth Advisor, Risk Analyzer |
| Decision | Coordinate contributions, pin inputs, enforce invariants, explain, and complete the canonical Decision. | Decision Orchestrator |
| Candidate formation | Produce bounded downstream input from a completed Decision. | Recommendation Candidate Builder, Configuration Input Builder |
| Governed feedback | Interpret approved feedback for future reasoning only. | Learning Interpreter |

### 7.2 Canonical internal flow

```text
Verified Authorization Context
  + published Business DNA or explicit Workspace Intelligence Aggregation
  + applicable Knowledge, deterministic Rule outcomes, Capabilities,
    approved analytics, settings, goals, country, stage, and commercial context
                              ↓
                       Business Analyzer
                              ↓
        ┌─────────────────────┼─────────────────────┐
        ↓                     ↓                     ↓
Capability Selector     Health Analyzer      Growth Advisor
                              ↓                     ↓
                         Risk Analyzer ─────────────┘
        └─────────────────────┼─────────────────────┘
                              ↓
                     Decision Orchestrator
                              ↓
              Completed canonical Business Brain Decision
                    ├──────────────────────┐
                    ↓                      ↓
 Recommendation Candidate Builder  Configuration Input Builder
                    ↓                      ↓
       Recommendation Engine      Configuration Engine context

Approved disposition, outcomes, adoption, usage, and feedback
                              ↓
                    Learning Interpreter
                              ↓
                 Future non-AI analysis context only
```

### 7.3 Downstream AI flow

```text
Completed canonical Business Brain Decision
  → minimum permission-filtered Decision context
  → AI Coordinator
  → separate AI-owned explanation, narrative, suggestion,
    advisory output, or AI Action Proposal
```

There is no path from AI output back into the completed Decision. Business Brain availability and Decision completion do not depend on AI Coordinator, an AI Expert, a model, or a provider.

## 8. Logical Components

### 8.1 Business Analyzer

**Purpose:** Create the shared Business understanding and analysis contribution for one Decision evaluation.

**Consumes:**

- verified Workspace and Business scope;
- published Business DNA or explicit Workspace Intelligence Aggregation;
- applicable Knowledge and deterministic Rule outcomes;
- approved analytics, settings, goals, country, stage, and commercial context; and
- source identifiers and versions.

**Produces:**

- interpreted needs and conditions;
- source and evidence references;
- gaps, assumptions, conflicts, and uncertainty; and
- the base contribution used by specialist components.

**Never owns:** Any consumed source, Business DNA correction, Knowledge, Rule, Capability, analytics, settings, or commercial state.

### 8.2 Capability Selector

**Purpose:** Identify candidate Capabilities that describe what the Business needs before software mapping.

**Consumes:** Business Analyzer contribution and canonical Capability metadata, dependencies, applicability, country, and lifecycle.

**Produces:** Candidate Capability references and selection rationale included in the Decision.

**Never owns:** Capability definitions, OS Modules, Products, Plans, Marketplace Assets, or Implementation Options.

### 8.3 Health Analyzer

**Purpose:** Produce Business health reasoning from approved Business context.

**Consumes:** Business Analyzer contribution, approved analytics, Knowledge, Rules, goals, and stage.

**Produces:** Health insight contribution with evidence, confidence, assumptions, and uncertainty.

**Never owns:** Operational facts, analytics source truth, KPI Knowledge, dashboards, or Recommendations.

Exact health semantics remain deferred.

### 8.4 Growth Advisor

**Purpose:** Identify future improvement direction aligned with Business goals, stage, Capabilities, Knowledge, Rules, and approved outcomes.

**Produces:** Growth insight contribution and candidate improvement themes.

**Never owns:** Business goals, Growth Plan facts, Recommendations, Products, Plans, Marketplace Assets, or execution.

Exact growth semantics and horizon remain deferred.

### 8.5 Risk Analyzer

**Purpose:** Identify Business risk reasoning from approved facts, Knowledge, deterministic Rules, and analytics.

**Produces:** Risk insight contribution with evidence, candidate severity, confidence, assumptions, and uncertainty.

**Never owns:** Official Rules, compliance policy, incidents, Business DNA risk facts, Recommendations, or actions.

Exact risk taxonomy, severity, and confidence remain deferred.

### 8.6 Decision Orchestrator

**Purpose:** Coordinate Business Brain evaluation and complete the canonical Business Brain Decision.

**Owns logically:**

- evaluation coordination;
- exact input manifest;
- contribution validation;
- required-contribution checks;
- conflict and uncertainty exposure;
- Decision explanation;
- Decision identity and version;
- immutable Decision completion; and
- supersession link to prior Decision where applicable.

**Never owns:** Authorization policy, source facts, Recommendation, Configuration Proposal, AI artifact, Audit Record, Product Hub projection, or target action.

Decision Orchestrator is not AI orchestration. It uses no AI input when forming the Decision.

### 8.7 Recommendation Candidate Builder

**Purpose:** Form a Decision-linked recommendation candidate containing a business improvement and Capability need.

**Consumes:** Completed Decision, Capability reasoning, relevant insight, evidence, risks, alternatives, confidence, and assumptions.

**Produces:** Versioned candidate content for Recommendation Engine.

**Never owns:** Recommendation prioritization, category, lifecycle, disposition, customer acceptance, or Implementation Option mapping.

Candidate identity, deduplication, acknowledgement, and physical delivery remain deferred.

### 8.8 Configuration Input Builder

**Purpose:** Form Decision-linked configuration input for downstream Configuration Engine consideration.

**Consumes:** Completed Decision, Capability reasoning, Knowledge and Rule references, and applicable Recommendation context.

**Never owns:** Configuration Proposal, review policy, compatibility decision, target validation, target state, or application status.

Configuration input cannot authorize Configuration Engine action without accepted Recommendation context and applicable owner rules. Exact timing and structure remain deferred.

### 8.9 Learning Interpreter

**Purpose:** Interpret approved Recommendation disposition, Business outcomes, adoption, usage patterns, and customer feedback for future analysis.

**Produces:** A non-canonical learning contribution eligible for future context under approved policy.

**Never owns:** Source feedback, consent, raw OS data, Business DNA correction, Knowledge promotion, Rule modification, Capability lifecycle, AI learning policy, or automatic behavior change.

No persisted learning write model is approved in Wave 1.

## 9. Component Responsibility Matrix

| Responsibility | Single logical owner |
|---|---|
| Business understanding and general analysis | Business Analyzer |
| Candidate Capability reasoning | Capability Selector |
| Health reasoning | Health Analyzer |
| Growth reasoning | Growth Advisor |
| Risk reasoning | Risk Analyzer |
| Input manifest and Decision composition | Decision Orchestrator |
| Business Brain Decision explanation | Decision Orchestrator |
| Completed Decision publication | Decision Orchestrator |
| Recommendation candidate formation | Recommendation Candidate Builder |
| Configuration input formation | Configuration Input Builder |
| Future-context feedback interpretation | Learning Interpreter |
| Recommendation lifecycle | Recommendation Engine, outside Business Brain |
| Configuration Proposal lifecycle | Configuration Engine, outside Business Brain |
| AI orchestration and outputs | AI Coordinator, outside Business Brain |

## 10. Dependency Rules

1. Business Analyzer depends only on approved owner contracts and verified scope.
2. Capability Selector and specialist analyzers depend on Business Analyzer contribution.
3. Decision Orchestrator depends on applicable component contributions.
4. Candidate builders depend on a completed Decision.
5. Learning Interpreter depends on approved feedback sources and informs future context only.
6. Recommendation Engine and Configuration Engine depend on boundary contracts, not Business Brain internals.
7. Product Hub depends on authorized projections, not the write model.
8. AI Coordinator may depend on a completed Decision; Business Brain never depends on AI for Decision completion.
9. No component writes another component's or domain's canonical state directly.
10. Circular dependencies are prohibited.

## 11. Decision Formation

Business Brain Decision formation follows these logical steps:

1. resolve current Authentication and Authorization Context through Core;
2. verify Workspace, Business, and aggregation scope;
3. resolve exact source references and versions;
4. produce Business Analyzer contribution;
5. produce applicable Capability, health, growth, and risk contributions;
6. expose missing required contributions, conflicts, and uncertainty;
7. compose explanation and input manifest;
8. validate Decision invariants;
9. complete one immutable Business Brain Decision; and
10. form downstream candidate outputs from that completed Decision.

Failed or cancelled evaluation does not create a completed Decision. The operational model for requested, evaluating, failed, cancelled, retry, timeout, and recovery remains deferred.

## 12. Write and Read Architecture

### Canonical write architecture

Business Brain Decision is the only new canonical write model approved by the Proposal baseline for this milestone.

Recommendation candidate and configuration input are Decision-owned outputs or Decision-linked boundary values. Their delivery persistence, identity, and acknowledgement do not create independent domain ownership and remain deferred.

### Read architecture

Authorized consumers may use:

- Business Brain Decision view;
- Current Decision view under future selection policy;
- explicit Workspace Decision aggregation view;
- Product Hub Business Health and Growth View;
- Recommendation Feed after Recommendation Engine processing; and
- authorized search, analytics, Audit, and observability projections.

Every read model is rebuildable or derived as appropriate, permission-filtered, and non-authoritative for writes.

## 13. External Collaboration

| Collaborator | Business Brain supplies | Business Brain consumes | Ownership retained outside |
|---|---|---|---|
| Business DNA Registry | Decision references only | Published DNA | DNA facts and history |
| Knowledge Engine | Usage references | Published Knowledge | Knowledge lifecycle |
| Rules domain | Evaluation context | Rule outcomes | Rule authority |
| Capability Registry | Selection references | Capability metadata | Capability lifecycle |
| Recommendation Engine | Recommendation candidate | Disposition feedback | Recommendation lifecycle |
| Configuration Engine | Configuration input | Authorized status reference | Configuration Proposal |
| Product Hub | Decision/insight projection input | No source state required | Journey and projection |
| Marketplace | Business/Capability reason through downstream mapping | Approved asset reference where authorized | Assets and scoped state |
| Operating System | Approved Decision/Recommendation information | Approved operational projection | OS domain and execution |
| AI Coordinator | Completed Decision context | No Decision-forming input | AI artifacts and orchestration |

## 14. Architecture Invariants

1. There are nine logical Business Brain components.
2. All eleven candidate capabilities have one proposed logical owner.
3. Business Brain Decision is the sole new canonical aggregate and write model in Wave 1.
4. A Decision has one Workspace and one Business by default.
5. Workspace aggregation remains explicit and preserves each Business and source version.
6. Source information remains owned by its canonical domain.
7. Completed Decisions are immutable.
8. Reanalysis creates a new Decision and preserves history.
9. Candidate outputs have no downstream execution authority.
10. Recommendation Engine, Configuration Engine, Product Hub, Marketplace, AI Coordinator, and each OS remain separate owners.
11. AI acts only after Decision completion and never enters Decision content.
12. No implementation technology or physical deployment boundary is implied.

## 15. Remaining Deferred Decisions

Wave 1 does not resolve:

- exact Decision schema and fields;
- evaluation operation model and long-running behavior;
- current-Decision selection and freshness;
- minimum Business DNA by analysis purpose;
- changing-input behavior;
- Knowledge, Rule, and analytics applicability mechanisms;
- commercial-context influence detail;
- health, growth, risk, confidence, conflict, and partial-result semantics;
- candidate identity, deduplication, acknowledgement, and delivery;
- configuration input structure and timing;
- persisted learning state and policy;
- provider/model and downstream AI operations policy;
- API and Event catalogs or implementation;
- Permission, privacy, retention, encryption, and residency detail;
- observability and reliability values; and
- physical technology, storage, packaging, deployment, and extraction.

## 16. References

- `docs/03-BUSINESS-BRAIN-PROPOSAL.md`
- `docs/03-business-brain/03-BUSINESS-BRAIN-PROPOSAL-PATCH-v0.1.1.md`
- `docs/03-BUSINESS-BRAIN-ARCHITECTURE-REREVIEW.md`
- `docs/03-business-brain/00-BUSINESS-BRAIN-DISCOVERY.md`
- `docs/03-business-brain/01-BUSINESS-BRAIN-CAPABILITY-MAP.md`
- `docs/00-governance/ADR/ADR-012-business-brain-decision-engine.md`
- `docs/00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md`
- `docs/02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md`
- `docs/02-core-platform/03-DOMAIN-MODEL.md`
- `docs/02-core-platform/04-DATA-OWNERSHIP.md`
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md`
