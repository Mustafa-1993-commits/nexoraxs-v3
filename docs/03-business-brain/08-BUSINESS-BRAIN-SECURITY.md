# Business Brain Security

**Document Type:** Business Brain Wave 3  
**Status:** Approved-baseline expansion  
**Architecture Baseline:** Business Brain Proposal v0.1.1  
**Core Platform Baseline:** Core Platform Architecture v1.0 / documentation baseline v1.0.1

## 1. Purpose

This document defines the technology-independent Security model for Business Brain. It explains how identity, authorization, tenant isolation, privacy, data handling, Audit, Events, projections, and downstream AI access preserve the ownership model established by the approved Business Brain baseline.

It introduces no new architecture, Permission catalog, infrastructure mechanism, or Security technology.

## 2. Scope

This document covers:

- Security boundaries around Business Brain analysis and Decision completion;
- authorization of requests, source access, Contracts, Events, and read models;
- Workspace and Business scope enforcement;
- privacy and data-minimization rules;
- Audit integration and Security observability; and
- the Security boundary between a completed Decision and downstream consumers.

It does not define authentication implementation, token formats, encryption algorithms, retention periods, Permission names, transport controls, incident procedures, or provider-specific controls. Those mechanisms remain owned by Core Platform or deferred through Governance.

## 3. Authority and Relationships

Business Brain extends Core Platform and inherits its identity, authentication, authorization, tenant-isolation, Audit, API, Event, and observability principles. Genesis defines the business-first and ownership-first intent. Governance and accepted ADRs control changes. The approved Proposal v0.1.1 defines the Business Brain boundary, and Waves 1–2 define its Domain Model, ownership, logical Contracts, Domain Events, and read models.

Security may restrict access to an owned fact; it does not transfer ownership of that fact.

## 4. Security Principles

1. **Explicit Context:** Every operation carries verified identity, Workspace, Business where applicable, purpose, and requested resource scope.
2. **Tenant Isolation by Default:** Access is denied when Workspace or Business scope is missing, ambiguous, or mismatched.
3. **Least Privilege:** Callers, components, and consumers receive only the access required for an approved responsibility.
4. **Owner Validation:** Each canonical owner validates access to its own source or write model.
5. **Single Writer:** Only Business Brain completes and records a Business Brain Decision.
6. **Data Minimization:** Contracts, Events, logs, and projections expose the minimum authorized information.
7. **Immutable History:** Security administration cannot rewrite a completed Decision.
8. **Projection Is Never Authority:** A read model cannot prove current Permission or grant access.
9. **AI Is Downstream:** AI Coordinator may consume only authorized completed Decision context and never participate in Decision formation.
10. **Auditability:** Consequential access, completion, supersession, replay, and administration are auditable without making Audit the owner of business facts.
11. **Fail Closed:** Missing or unverifiable authorization prevents protected processing or disclosure.
12. **Separation of Concerns:** Authentication, authorization, Audit, observability, and domain ownership remain distinct responsibilities.

## 5. Security Domains

### SD-01 — Identity and Authentication Boundary

Core Platform owns identity and authentication. Business Brain accepts only verified identity context through the approved logical boundary. It does not create identities, credentials, sessions, or authentication truth. An unauthenticated or unverifiable caller cannot request analysis, read a Decision, administer replay, or access a projection.

### SD-02 — Authorization Context

Business Brain requires the verified authorization context defined by BB-C-10 before protected work begins. Evaluation considers the actor, Workspace, applicable Business, purpose, requested operation, resource scope, and current owner-provided Permission result. Context must remain explicit across internal contribution and external handoff boundaries.

### SD-03 — Workspace and Business Tenant Isolation

Every Decision and Decision-owned output is Workspace-scoped and, where applicable, Business-scoped. Business DNA remains Business-scoped. Cross-Business analysis is not inferred. Workspace aggregation is allowed only through an explicit, authorized aggregation reference and never merges canonical Business ownership.

### SD-04 — Canonical Source Access

Business Brain reads published or otherwise approved references from their canonical owners: Business DNA, Capability Registry, Knowledge Engine, Rules Engine, Analytics, Core Platform settings and commercial context, and approved feedback sources. It cannot bypass owner authorization, mutate those sources, or treat a cached projection as current authority.

### SD-05 — Decision Write Security

Decision Orchestrator is the sole component that completes the Business Brain Decision aggregate. Completion requires authorized scope, validated source references and versions, required component contributions, deterministic rule outcomes, and aggregate invariants. No caller, read model, AI output, recommendation, configuration result, or administrative action may alter a completed Decision.

### SD-06 — Contract and Candidate Handoff Security

Logical Contracts preserve owner, consumer, scope, purpose, version, minimization, and authorization context. Recommendation candidate submission goes only to Recommendation Engine; configuration input goes only to Configuration Engine; Product Hub receives only authorized projection input. Receipt by a consumer does not transfer ownership of the Decision or its history.

### SD-07 — Event Security

Business Brain-owned Domain Events disclose the minimum information needed to state an owned fact. Publication, consumption, replay, and projection updates require tenant checks, current authorization where disclosure occurs, contract compatibility, ordering, and idempotency. Event payloads cannot become alternate write paths or authorization evidence.

### SD-08 — Read Model and Projection Security

Read models enforce the same or narrower scope than their sources. Projection builders and readers are separate responsibilities. Search, Analytics, Audit, Product Hub, and AI views expose only their approved purpose-specific fields. Rebuild and replay reapply current Security controls. A stale or over-broad projection is withheld rather than treated as canonical.

### SD-09 — Downstream AI Security

AI Coordinator receives completed Decision context only after Decision completion through BB-C-24 or the authorized AI View. AI-generated explanations, narratives, suggestions, Action Proposals, and advisory outputs remain AI Coordinator-owned. They cannot be written into the Decision, presented as deterministic Decision evidence, or used to bypass human approval and target-owner authorization.

### SD-10 — Privacy, Audit, and Administrative Security

Business Brain minimizes personal and sensitive business information and favors canonical references over copied payloads. Audit Service owns append-only Audit Records for consequential actions. Administrative access, replay, recovery, and diagnostic activity remain authorized, attributable, purpose-bound, and auditable. Observability telemetry is not an Audit Record or business fact.

## 6. Authorization Evaluation

Authorization is evaluated in this order:

1. verify the identity context through Core Platform;
2. verify active Workspace membership and applicable access;
3. resolve explicit Workspace and Business scope;
4. verify the requested Business Brain operation and resource scope;
5. verify access to every canonical source through its owner;
6. apply component and Contract minimization boundaries;
7. validate downstream consumer scope before disclosure; and
8. record required Audit correlation for consequential activity.

A later check cannot widen a scope rejected by an earlier check. Permission inheritance and delegation follow Core Platform; Business Brain does not define independent inheritance or delegation semantics.

## 7. Authorization Boundaries by Responsibility

| Responsibility | Security authority | Business Brain rule |
|---|---|---|
| Identity and authentication | Core Platform | Consume verified context only |
| Workspace and Business access | Core Platform Permissions | Require explicit authorized scope |
| Business DNA access | Business DNA owner | Read published authorized references only |
| Knowledge, Rule, and Capability access | Respective canonical owner | Preserve applicability, version, and scope |
| Decision completion | Business Brain / Decision Orchestrator | Sole authorized write boundary |
| Recommendation lifecycle | Recommendation Engine | Submit candidate; do not authorize disposition |
| Configuration Proposal and application | Configuration Engine and target owner | Supply input; do not authorize or apply |
| Product Hub presentation | Product Hub | Supply minimized projection input |
| AI output | AI Coordinator | Supply completed Decision context only |
| Audit Records | Audit Service | Emit auditable facts; do not own Audit history |

## 8. Privacy and Data Handling

Information is handled according to its canonical source, business sensitivity, tenant scope, approved purpose, and consumer need. This document does not create new classification labels.

| Information | Handling rule |
|---|---|
| Business DNA | Business-scoped; reference published versions; never broaden through Workspace aggregation |
| Knowledge, Rules, Capabilities | Preserve owner version, applicability, and entitlement constraints |
| Analytics and approved feedback | Consume only relevant authorized inputs; do not make them canonical Business facts |
| Business Brain Decision | Restrict to authorized scope; preserve immutable evidence and version references |
| Candidate outputs | Disclose only to approved owner and authorized views |
| Events | Minimize content; prefer identifiers and references when sufficient |
| Read models | Purpose-specific, rebuildable, and no broader than sources |
| Audit Records | Owned and protected by Audit Service |
| Telemetry | Exclude raw Business DNA, Knowledge, operational payloads, secrets, and AI content by default |
| AI context | Minimized completed Decision context only; AI output remains separate |

Retention, deletion, legal classification, residency, and subject-handling mechanisms remain deferred and must be aligned with Core Platform policy and canonical-owner obligations.

## 9. Audit Integration

The following activity is auditable when applicable:

- analysis request acceptance or rejection;
- authorization and tenant-scope failure;
- canonical source-version selection;
- Decision completion and supersession;
- recommendation candidate and configuration input handoff;
- Domain Event publication and governed replay;
- projection administration or rebuild;
- privileged diagnostic, recovery, or administrative activity; and
- disclosure of completed Decision context to AI Coordinator.

Audit entries correlate actor, scope, purpose, resource, Decision or source reference, outcome, and causal context without copying unnecessary protected content. Audit Service owns the resulting Audit Records.

## 10. Security Failure Behavior

- Missing, expired, unverifiable, or mismatched context fails closed.
- Cross-tenant references are rejected before analysis or disclosure.
- A source-access failure cannot be replaced with unauthorized cached content.
- A Security failure before completion produces no completed Decision.
- A Security failure after completion cannot invalidate or mutate the completed Decision; it blocks the affected disclosure or downstream operation.
- A projection suspected of overexposure is withheld and rebuilt from authorized sources.
- Downstream consumer failure cannot broaden Business Brain access or ownership.
- Security telemetry and Audit correlation must not expose protected payloads.

## 11. Security Invariants

1. Every protected operation has explicit verified context.
2. Every Decision is bound to one Workspace and applicable Business scope.
3. Business DNA is never implicitly aggregated across Businesses.
4. Only Decision Orchestrator completes the Decision write model.
5. Completed Decisions are immutable under administrative and Security operations.
6. No Event, Contract, or projection bypasses owner authorization.
7. No read model grants Permission or becomes canonical ownership.
8. Recommendation and Configuration owners authorize their own lifecycles.
9. AI never enters canonical Decision formation.
10. Audit and observability do not own Business Brain facts.
11. Security failure does not create an alternate business write path.
12. Cross-OS access remains optional, explicit, and owner-authorized.

## 12. Remaining Deferred Decisions

This document does not resolve:

- concrete authentication, session, token, credential, encryption, key, or secret mechanisms;
- exact Permission catalog, delegation rules, or administrative roles;
- formal information-classification scheme and field-level handling policy;
- retention, deletion, legal hold, residency, privacy-request, and compliance procedures;
- Event and Contract protection mechanisms;
- Security alert thresholds, incident response procedures, or recovery authorities;
- AI provider controls, redaction mechanisms, or output-retention policy;
- evaluation-operation state or Security ownership for such state; or
- physical deployment and infrastructure Security controls.

Each remains subject to Governance, Core Platform ownership, and future approved ADRs.

## 13. References

- `docs/00-governance/`
- `docs/01-genesis/`
- `docs/02-core-platform/00-CORE-PLATFORM-PRINCIPLES.md`
- `docs/02-core-platform/05-PERMISSION-MODEL.md`
- `docs/02-core-platform/08-SECURITY-MODEL.md`
- `docs/99-architecture-freeze/`
- `docs/03-BUSINESS-BRAIN-PROPOSAL.md`
- `docs/03-business-brain/03-BUSINESS-BRAIN-PROPOSAL-PATCH-v0.1.1.md`
- `docs/03-BUSINESS-BRAIN-ARCHITECTURE-REREVIEW.md`
- `docs/03-business-brain/02-BUSINESS-BRAIN-ARCHITECTURE.md`
- `docs/03-business-brain/03-BUSINESS-BRAIN-DOMAIN-MODEL.md`
- `docs/03-business-brain/04-BUSINESS-BRAIN-DATA-OWNERSHIP.md`
- `docs/03-business-brain/05-BUSINESS-BRAIN-CONTRACTS.md`
- `docs/03-business-brain/06-BUSINESS-BRAIN-EVENTS.md`
- `docs/03-business-brain/07-BUSINESS-BRAIN-READ-MODELS.md`
