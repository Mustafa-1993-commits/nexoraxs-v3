# Business Brain Logical Contracts

Version: 1.0  
Status: Wave 2 — Approved Baseline Expansion  
Milestone: Business Brain  
Architecture baseline: Core Platform v1.0  
Business Brain baseline: Approved Proposal v0.1.1 and Wave 1  
Owner: Nexoraxs

---

## 1. Purpose

This document defines the logical contracts through which Business Brain components collaborate and through which Business Brain exchanges information with existing owners.

Contracts describe meaning, responsibility, direction, ownership, scope, and invariants. They do not define APIs, endpoints, protocols, messages, schemas, serialization, transport, storage, or technology.

## 2. Scope

This document covers:

- internal logical contracts among the nine Business Brain components;
- external inbound contracts supplied by canonical Core owners;
- external outbound contracts supplied by Business Brain;
- contract ownership and consumer responsibility;
- Decision, candidate, configuration-input, Product Hub, AI, and feedback boundaries;
- context, version, authorization, idempotency, and compatibility rules; and
- deferred contract detail.

It does not define Event contracts, read-model schemas, physical implementation, or any new owner.

## 3. Contract Principles

1. Every contract has exactly one accountable provider.
2. A provider exposes only information it owns or is explicitly authorized to project.
3. A consumer never acquires source ownership by receiving information.
4. Every tenant-scoped contract resolves one Workspace.
5. Business scope is explicit; aggregation is explicit and separately authorized.
6. Versioned sources retain owner, identifier, and exact version where required.
7. Internal contracts do not permit arbitrary table access.
8. Mutation requests are reauthorized and validated by the owning domain.
9. Candidate contracts have no downstream execution authority.
10. Read contracts never prove current Permission by themselves.
11. AI receives only completed Decision context; AI output is never a Business Brain inbound Decision contract.
12. Contracts evolve compatibly and independently from framework or database models.

## 4. Contract Classification

| Class | Direction | Purpose | Count |
|---|---|---|---:|
| Internal contribution contracts | Business Brain component to Business Brain component | Compose one canonical Decision and future context. | 9 |
| External inbound contracts | Canonical external owner to Business Brain | Supply verified scope, source inputs, request intent, and approved feedback. | 10 |
| External outbound contracts | Business Brain to an approved consumer | Expose Decision information and bounded downstream candidates. | 5 |
| **Total** |  |  | **24** |

## 5. Shared Logical Contract Context

Each contract carries or resolves only the context required for its purpose. Applicable context includes:

- contract identity and supported version;
- provider and consumer responsibility;
- actor or service identity;
- Workspace;
- Business or explicit Workspace aggregation;
- Business Unit, Department, Branch, or OS when applicable;
- analysis purpose;
- source identifier and version;
- Decision identifier and version when applicable;
- Permission and policy outcome reference;
- correlation and causation;
- idempotency information for retryable mutation;
- locale, country, timezone, or currency when semantically required;
- freshness or source time where meaningful; and
- Security classification and minimization requirements.

This is not a payload schema. Exact fields and representation remain deferred.

## 6. Internal Contract Catalog

### BB-C-01 — Business Analysis Contribution

- **Provider:** Business Analyzer
- **Consumers:** Capability Selector, Health Analyzer, Growth Advisor, Risk Analyzer, Decision Orchestrator
- **Purpose:** Supply interpreted Business needs, conditions, evidence references, gaps, assumptions, conflicts, and uncertainty for one Decision evaluation.
- **Consumes upstream:** Approved source-owner contracts.
- **Ownership preserved:** Source Business facts, Knowledge, Rules, analytics, and commercial state remain external.
- **Invariant:** Contribution cannot be treated as Business DNA or a completed Decision.

### BB-C-02 — Capability Selection Contribution

- **Provider:** Capability Selector
- **Consumer:** Decision Orchestrator
- **Purpose:** Supply candidate Capability references and rationale based on canonical Capability metadata.
- **Ownership preserved:** Capability Registry owns Capability identity, meaning, dependencies, applicability, and lifecycle.
- **Invariant:** Contract contains no Product, Plan, Marketplace Asset, OS Module, or Implementation Option ownership.

### BB-C-03 — Health Insight Contribution

- **Provider:** Health Analyzer
- **Consumer:** Decision Orchestrator
- **Purpose:** Supply health reasoning, evidence, confidence, assumptions, and uncertainty when applicable.
- **Ownership preserved:** Operational facts, analytics, and KPI Knowledge remain with their owners.
- **Invariant:** Exact health semantics remain deferred; contribution is not an independent aggregate.

### BB-C-04 — Growth Insight Contribution

- **Provider:** Growth Advisor
- **Consumer:** Decision Orchestrator
- **Purpose:** Supply growth reasoning and candidate improvement themes.
- **Ownership preserved:** Business goals, Growth Plan facts, Recommendations, Products, and execution remain external.
- **Invariant:** Contribution cannot become a Recommendation by internal use.

### BB-C-05 — Risk Insight Contribution

- **Provider:** Risk Analyzer
- **Consumer:** Decision Orchestrator
- **Purpose:** Supply risk reasoning, evidence, candidate severity, confidence, assumptions, and uncertainty.
- **Ownership preserved:** Official Rules, compliance policy, incidents, and source risk facts remain external.
- **Invariant:** Risk contribution has no action authority.

### BB-C-06 — Decision Completion

- **Provider:** Decision Orchestrator
- **Consumers:** Business Brain Decision write model, Recommendation Candidate Builder, Configuration Input Builder, approved Business Brain read side
- **Purpose:** Establish that all required non-AI contributions and invariants have been validated and one immutable Decision is complete.
- **Ownership preserved:** Audit Service owns Audit Records; external sources retain their facts.
- **Invariant:** Completion contains no AI-generated or AI-assisted material.

### BB-C-07 — Recommendation Candidate Formation

- **Provider:** Decision Orchestrator through completed Decision
- **Consumer:** Recommendation Candidate Builder
- **Purpose:** Supply completed Decision content eligible for candidate formation.
- **Ownership preserved:** Recommendation Engine owns Recommendation identity, prioritization, lifecycle, and disposition.
- **Invariant:** Builder cannot act before Decision completion or create a Recommendation.

### BB-C-08 — Configuration Input Formation

- **Provider:** Decision Orchestrator through completed Decision
- **Consumer:** Configuration Input Builder
- **Purpose:** Supply Decision and Capability reasoning for possible configuration input formation under applicable Recommendation context.
- **Ownership preserved:** Configuration Engine owns Configuration Proposal; target owner owns application.
- **Invariant:** Contract has no proposal, compatibility, review, or execution authority.

### BB-C-09 — Learning Contribution

- **Provider:** Learning Interpreter
- **Consumer:** Future Business Analyzer context under approved policy
- **Purpose:** Supply interpretation of approved disposition, outcomes, adoption, usage, and feedback for future reasoning.
- **Ownership preserved:** Feedback sources, consent, Knowledge, Rules, Business DNA, Capabilities, and AI learning policy remain external.
- **Invariant:** Contribution cannot modify a completed Decision or any canonical source.

## 7. External Inbound Contract Catalog

### BB-C-10 — Verified Authorization Context

- **Provider:** Core Identity and Access and applicable owning policy
- **Consumer:** Business Brain protected boundary
- **Purpose:** Establish actor/service, Workspace, Business or aggregation, purpose, action, and permitted resource context.
- **Invariant:** Authentication alone is insufficient; unresolved scope fails closed.

### BB-C-11 — Analysis Request

- **Provider:** Business Architect Analysis Trigger or another future approved Core consumer
- **Consumer:** Business Brain
- **Purpose:** Request analysis for an authorized scope and purpose.
- **Invariant:** Request is not a Decision, Event, Recommendation, or durable authority. Exact command and operation model remain deferred.

### BB-C-12 — Published Business DNA Reference

- **Provider:** Business DNA Registry
- **Consumer:** Business Analyzer and Decision Orchestrator input manifest
- **Purpose:** Supply exact published Business DNA Snapshot and applicable Provenance references.
- **Invariant:** Business Brain cannot correct, republish, or copy DNA as competing truth.

### BB-C-13 — Explicit Workspace Aggregation Reference

- **Provider:** Core intelligence projection over Business-owned DNA
- **Consumer:** Business Analyzer and Decision Orchestrator
- **Purpose:** Supply authorized included Businesses and their exact source versions.
- **Invariant:** Cannot mix Workspaces or create Workspace-owned Business DNA.

### BB-C-14 — Capability Reference and Applicability

- **Provider:** Capability Registry
- **Consumers:** Business Analyzer, Capability Selector, Decision Orchestrator
- **Purpose:** Supply canonical Capability meaning, dependencies, applicability, and lifecycle.
- **Invariant:** Business Brain cannot redefine or mutate Capability.

### BB-C-15 — Knowledge Applicability

- **Provider:** Knowledge Engine
- **Consumers:** Business Analyzer and applicable specialist analyzers
- **Purpose:** Supply applicable immutable published Knowledge and Knowledge Pack references.
- **Invariant:** Business or Workspace use never duplicates Knowledge content.

### BB-C-16 — Deterministic Rule Outcome

- **Provider:** Rules domain
- **Consumers:** Business Analyzer, specialist analyzers, Decision Orchestrator
- **Purpose:** Supply deterministic Rule outcome, Rule version, and evidence.
- **Invariant:** Business Brain and AI cannot modify or override the official outcome.

### BB-C-17 — Analytics Intake

- **Provider:** Analytics Intake and source owners
- **Consumers:** Business Analyzer and applicable specialist analyzers
- **Purpose:** Supply purpose-bound, permission-aware analytics projections with provenance and freshness.
- **Invariant:** Projection never becomes operational source truth.

### BB-C-18 — Settings and Commercial Context

- **Provider:** Applicable Core settings, localization, and commercial owners
- **Consumer:** Business Analyzer
- **Purpose:** Supply approved locale, country, stage, settings, subscription, or Plan context.
- **Invariant:** Commercial context cannot replace business need or cause product-first reasoning.

### BB-C-19 — Approved Feedback

- **Provider:** Recommendation Engine or applicable source owner
- **Consumer:** Learning Interpreter
- **Purpose:** Supply approved disposition, Business outcomes, adoption, usage, or customer feedback for future analysis.
- **Invariant:** Feedback cannot rewrite Business DNA, Knowledge, Rules, Capabilities, or completed Decisions.

## 8. External Outbound Contract Catalog

### BB-C-20 — Decision Read

- **Provider:** Business Brain read side
- **Consumers:** Authorized first-party Core surfaces, Product Hub, AI Coordinator, and approved OS consumers
- **Purpose:** Supply a permission-filtered completed Decision or logical projection.
- **Ownership preserved:** Business Brain retains Decision ownership.
- **Invariant:** Read result is not durable Permission and cannot accept writes.

### BB-C-21 — Recommendation Candidate Submission

- **Provider:** Recommendation Candidate Builder
- **Consumer:** Recommendation Engine
- **Purpose:** Supply Decision-linked business improvement and Capability candidate content.
- **Ownership preserved:** Recommendation Engine alone creates and owns Recommendation.
- **Invariant:** Candidate has no disposition or Implementation Option authority.

### BB-C-22 — Configuration Input Supply

- **Provider:** Configuration Input Builder
- **Consumer:** Configuration Engine
- **Purpose:** Supply Decision-linked configuration input under applicable accepted Recommendation context.
- **Ownership preserved:** Configuration Engine owns Configuration Proposal; target owner applies configuration.
- **Invariant:** Input cannot initiate or apply configuration by itself.

### BB-C-23 — Product Hub Projection Input

- **Provider:** Business Brain
- **Consumer:** Product Hub
- **Purpose:** Supply authorized Decision and insight summaries for Product Hub-owned presentation.
- **Ownership preserved:** Product Hub owns its read models and journey; Business Brain owns Decision source.
- **Invariant:** Unprocessed recommendation candidate cannot appear as canonical Recommendation.

### BB-C-24 — Completed Decision Context for AI Coordinator

- **Provider:** Business Brain
- **Consumer:** AI Coordinator
- **Purpose:** Supply minimum authorized completed Decision references or a permission-filtered projection for downstream AI use.
- **Ownership preserved:** AI Coordinator owns every AI Interaction, explanation, narrative, suggestion, advisory output, and AI Action Proposal.
- **Invariant:** AI output never returns as Decision input or changes Decision content.

## 9. Contract Boundary Matrix

| Boundary | Information crossing | Information that does not cross as owned state |
|---|---|---|
| Business DNA → Business Brain | Published Snapshot references and permitted Provenance | DNA mutation authority |
| Knowledge/Rules/Capabilities → Business Brain | Applicable versions, outcomes, metadata, evidence | Definitions and lifecycle ownership |
| Analytics → Business Brain | Approved projection and freshness | Operational source truth |
| Business Brain → Recommendation Engine | Recommendation candidate | Recommendation lifecycle or disposition |
| Business Brain → Configuration Engine | Configuration input | Configuration Proposal or target authority |
| Business Brain → Product Hub | Decision/insight projection input | Product Hub presentation ownership |
| Business Brain → AI Coordinator | Completed Decision context | AI output ownership or Decision mutation |
| Business Brain ↔ OS | Approved Decision/read projection and source-owned operational projection | Direct database access or mandatory dependency |
| Feedback owner → Learning Interpreter | Approved feedback reference | Source correction or learning policy ownership |

## 10. Contract Use Rules

### 10.1 Internal use

- Internal contracts carry logical contributions, not database models.
- A component validates its own contribution responsibility.
- Decision Orchestrator validates aggregate completeness.
- Internal co-location does not bypass contract direction.

### 10.2 External use

- Provider authorizes disclosure.
- Business Brain verifies scope and contract compatibility.
- Downstream owner reauthorizes any state change.
- External consumers cannot reach internal components or write models directly.

### 10.3 AI use

- No AI result appears in the inbound catalog.
- Only BB-C-24 crosses from a completed Decision to AI Coordinator.
- AI-owned outputs use AI Coordinator contracts outside Business Brain.

## 11. Contract Versioning and Compatibility

Contract versioning follows Core Platform rules:

- contract version and source-data version are distinct;
- compatible additive change is preferred;
- field meaning, owner, scope, Authorization, and lifecycle semantics cannot change silently;
- breaking change requires governed versioning and migration;
- consumers declare supported versions through future approved mechanisms;
- historical Decisions retain contract versions required for traceability; and
- framework and database versions do not define contract versions.

Exact version syntax, registry, support window, negotiation, deprecation duration, and tooling remain deferred.

## 12. Idempotency and Concurrency

- analysis request retry requires future idempotency policy;
- Decision completion cannot create duplicate completed Decisions for one approved idempotent request;
- candidate submission and configuration-input supply require duplicate-safe downstream handling;
- read contracts have no write concurrency authority;
- source changes during analysis are handled by future changing-input policy; and
- exact keys, retention, locks, optimistic concurrency, and response replay remain deferred.

## 13. Security and Audit

Every logical contract:

- uses authenticated user or service identity where protected;
- verifies Workspace and applicable Business ancestry;
- enforces least privilege and purpose;
- minimizes information;
- excludes secrets and unnecessary payloads;
- preserves safe correlation and causation;
- avoids unauthorized resource disclosure;
- supports Audit correlation for material actions; and
- never treats gateway approval as final owner Authorization.

Exact Permission catalog, credentials, tokens, encryption, retention, and Audit payload remain deferred.

## 14. Prohibited Contracts

Wave 2 does not permit contracts that:

- write Business DNA, Knowledge, Rules, Capabilities, Marketplace, commercial, Product Hub, AI, or OS state from Business Brain;
- send AI output into Decision formation;
- expose Business Brain internal persistence;
- let a read model mutate Decision;
- let recommendation candidate bypass Recommendation Engine;
- let configuration input bypass Configuration Engine or accepted Recommendation context;
- merge Businesses or Workspaces;
- grant Permission through data possession; or
- create cross-OS hard dependency.

## 15. Remaining Deferred Decisions

- exact contract schemas and required fields;
- analysis request and evaluation-operation semantics;
- Decision purpose catalog;
- source applicability and changing-input behavior;
- candidate identity, deduplication, acknowledgement, retry, and delivery;
- configuration input structure, timing, acknowledgement, and delivery;
- feedback eligibility, consent, retention, and learning policy;
- API surface, endpoints, protocols, errors, pagination, filtering, rates, and gateway mechanism;
- Event mapping and Event contract detail;
- contract registry, version syntax, compatibility windows, and deprecation;
- idempotency storage and concurrency mechanisms;
- Permission catalog and service identity;
- retention, privacy, residency, and encryption; and
- implementation and transport technology.

## 16. Contract Count

| Contract group | Count |
|---|---:|
| Internal logical contracts | 9 |
| External inbound contracts | 10 |
| External outbound contracts | 5 |
| **Total logical contracts** | **24** |

## 17. References

- `docs/03-BUSINESS-BRAIN-PROPOSAL.md`
- `docs/03-business-brain/03-BUSINESS-BRAIN-PROPOSAL-PATCH-v0.1.1.md`
- `docs/03-BUSINESS-BRAIN-ARCHITECTURE-REREVIEW.md`
- `docs/03-business-brain/02-BUSINESS-BRAIN-ARCHITECTURE.md`
- `docs/03-business-brain/03-BUSINESS-BRAIN-DOMAIN-MODEL.md`
- `docs/03-business-brain/04-BUSINESS-BRAIN-DATA-OWNERSHIP.md`
- `docs/02-core-platform/07-API-PHILOSOPHY.md`
- `docs/00-governance/ADR/ADR-035-technology-independent-compatible-contracts.md`
- `docs/00-governance/ADR/ADR-036-contract-first-api-architecture.md`
