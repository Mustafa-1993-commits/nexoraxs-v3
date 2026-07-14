# Business Brain Discovery

Version: 0.1  
Status: Discovery — Non-Authoritative  
Milestone: Architectural Discovery  
Architecture baseline: Core Platform v1.0  
Documentation baseline: Core Platform v1.0.1  
Owner: Nexoraxs

---

## Discovery Status

This document describes the Business Brain architectural problem space before a Proposal is written.

It is exploratory. Candidate components, boundaries, responsibilities, interfaces, Events, APIs, ADR subjects, and questions in this document are not approved architecture. The document does not supersede Genesis, Governance, the Core Platform Freeze, accepted ADRs, or any frozen ownership rule.

Detailed architecture begins only through a separately reviewed and approved Proposal.

## 1. Vision

The Business Brain should make Nexoraxs feel like an experienced business consultant that understands a Business, applies shared governed Knowledge and deterministic Rules, identifies needed Capabilities, and produces explainable guidance.

The customer should experience business understanding before software selection. Business Brain reasoning should remain business-driven, traceable, configurable, auditable, and never random.

The Business Brain is not a software wizard, an Operating System, a Knowledge store, an AI model, or a Product Hub replacement.

## 2. Mission

The Business Brain's frozen mission is to act as the platform decision engine.

It consumes authorized, versioned Business context and shared intelligence inputs. It produces Business Brain Decisions, recommendation candidates, configuration inputs, and health, growth, and risk insights. It enables downstream components to generate and present Recommendations, map Implementation Options, prepare Configuration Proposals, coordinate AI assistance, and guide customer decisions without transferring ownership of source facts or target execution.

Discovery must determine how that mission can be expressed as a complete milestone architecture while preserving every Core Platform Architecture Guarantee.

## 3. Responsibilities

The following responsibilities are inherited from Genesis, accepted ADRs, and the frozen Core Platform. Discovery does not redefine them.

### 3.1 Business understanding

- interpret one Business's published Business DNA by default;
- use an explicit Workspace Intelligence Aggregation only when authorized and requested;
- analyze Business identity, Industry, Sub Industry, Business Stage, Business Model, Sales Channels, organization, customers, products and services, Capabilities, compliance, goals, risks, and growth context as available in approved inputs;
- distinguish source facts from analysis, inference, decisions, and downstream proposals; and
- preserve the source versions and evidence required to explain a decision.

### 3.2 Capability reasoning

- identify the business improvement or need before software;
- select or identify candidate Capabilities that describe what the Business needs;
- respect Capability dependencies, optional dependencies, applicability, lifecycle, country, and Business context;
- keep Capabilities independent from industries and Operating System Modules; and
- provide Capability reasoning to the Recommendation Engine without owning the Capability Registry.

### 3.3 Decision and insight production

- produce governed Business Brain Decision records;
- produce recommendation candidates rather than owning Recommendation lifecycle;
- produce configuration inputs rather than applying configuration;
- identify health, growth, and risk insights;
- expose confidence, evidence, assumptions, alternatives, and uncertainty where applicable;
- preserve auditability and reproducibility through pinned input references; and
- support business guidance throughout the Business lifecycle.

### 3.4 Coordination

- consume applicable Knowledge and deterministic Rule outcomes;
- use authorized analytics and commercial context without becoming their source of truth;
- provide outputs to the Recommendation Engine and authorized consumers;
- keep Implementation Option mapping downstream from business improvement and Capability reasoning;
- allow the Configuration Engine to transform accepted Recommendations into Configuration Proposals;
- allow Product Hub to present permitted projections without making Product Hub a decision owner;
- allow AI Coordinator to consume or assist within governed boundaries; and
- allow Operating Systems to consume approved outcomes without permitting Business Brain to own or execute OS workflows.

### 3.5 Learning relationship

- receive approved usage patterns, Business outcomes, feature adoption, and customer feedback through governed processes;
- allow learning to improve future Recommendations under approved policy; and
- ensure learning never modifies Business DNA, Knowledge, Rules, Permissions, or operational facts directly.

## 4. Non-Responsibilities

Business Brain must never own or perform the following responsibilities.

### 4.1 Business DNA ownership

Business Brain does not:

- own Business DNA Identity, Business DNA Snapshot, Business DNA Fact, or Provenance;
- create a second Business DNA model;
- merge separate Business DNA identities into Workspace-owned DNA;
- publish or correct Business DNA directly; or
- store Recommendations, Plans, Modules, subscriptions, or software configuration as Business DNA facts.

### 4.2 Knowledge, Capability, and Rule ownership

Business Brain does not:

- store or publish Knowledge;
- duplicate Knowledge per Workspace, Business, or Operating System;
- own Knowledge Pack lifecycle or activation;
- own Capability definitions or lifecycle;
- define or modify official Rules through AI or analysis; or
- replace deterministic Rule evaluation with opaque inference.

### 4.3 Recommendation and configuration ownership

Business Brain does not:

- own Recommendation lifecycle, prioritization, disposition, or customer acceptance;
- begin with an Operating System, Plan, or Marketplace Asset instead of a business improvement and Capability need;
- treat an Implementation Option as the Recommendation itself;
- own Configuration Proposal lifecycle;
- apply configuration in an owning Core component or Operating System; or
- bypass customer review or owning-target validation.

### 4.4 Product Hub and Marketplace ownership

Business Brain does not:

- own Product Hub navigation, product discovery, lifecycle composition, subscription coordination, installation coordination, or setup handoff;
- own Product, Plan, Workspace Entitlement, OS Subscription, installation, activation, or readiness state;
- own Marketplace Assets, Marketplace Asset Versions, publisher state, acquisition, installation, configuration, activation, entitlement, or Business Assignment; or
- mutate Product Hub or Marketplace projections as canonical state.

### 4.5 Operating System ownership

Business Brain does not:

- own an Operating System or its Modules;
- implement OS-specific setup questions, workflows, Permissions, configuration, operational records, navigation, dashboards, reports, settings, or endpoints;
- write an Operating System database;
- require one Operating System to complete another Operating System's core workflow; or
- execute an operational action merely because it recommended it.

### 4.6 AI ownership and authority

Business Brain does not:

- replace the AI Coordinator;
- select providers or AI Experts outside AI Coordinator policy;
- send unrestricted Workspace or Business data to an AI Expert;
- treat AI output as Business fact, Knowledge, Rule, Permission, or authorization;
- grant an AI Action Proposal durable execution authority; or
- allow AI to bypass human control or the owning service.

### 4.7 Shared Core responsibilities

Business Brain does not own identity, Authentication, Workspace Membership, Permissions, organization identity, settings, localization, subscriptions, billing, Notifications, Audit Records, Search Coordination, Storage Coordination, Analytics Intake, API gateway policy, Event transport, or observability infrastructure.

## 5. Relationships

### 5.1 Business DNA

**Frozen relationship:** Business DNA is the Business-scoped source describing one Business. Business Brain is a consumer.

Business Brain analysis begins from a published Business DNA Snapshot or an explicitly requested Workspace Intelligence Aggregation. It records the Business DNA version used and never writes findings, Recommendations, or software state back into Business DNA.

Discovery must leave unresolved the exact minimum Business DNA, materiality, stale-input, correction, concurrent-edit, and reanalysis policies already deferred by the Core Platform baseline.

### 5.2 Knowledge Engine

**Frozen relationship:** Knowledge Engine owns structured, shared, governed Knowledge and immutable published versions. Business Brain consumes applicable Knowledge references.

Business Brain decisions must be traceable to the Knowledge versions used. Business or Workspace applicability does not create a duplicate Knowledge copy. Business Brain cannot publish, mutate, deprecate, or archive Knowledge.

Discovery must identify, but not answer, how applicable Knowledge versions are selected, pinned, invalidated, and reconciled with later Knowledge publication.

### 5.3 Recommendation Engine

**Frozen relationship:** Business Brain produces decisions and recommendation candidates. Recommendation Engine owns Recommendation generation, prioritization, explanation, lifecycle, disposition, feedback, and the approved implementation-option relationship.

The boundary must preserve:

```text
Business improvement and Capability reasoning
  → Business Brain Decision and recommendation candidate
  → Recommendation Engine
  → Recommendation
  → Operating System, Plan, or Marketplace Asset as Implementation Option
```

Discovery must not decide the candidate handoff contract, deduplication policy, prioritization boundary, or feedback behavior.

### 5.4 Core Platform

**Frozen relationship:** Business Brain is a logical Core Platform component inside the shared control and intelligence plane and initial enforced modular monolith.

It consumes Core identity, organization, Business DNA, Capability, Knowledge, Rules, settings, analytics, commercial context, Permission, API, Event, Audit, Security, and Observability contracts. Co-deployment does not permit direct writes into another Core module's canonical state.

Core Platform provides the context and governance required for Business Brain; Business Brain does not duplicate Core Platform services.

### 5.5 Product Hub

**Frozen relationship:** Product Hub is a Business-context advisor, lifecycle composition, selection, and handoff experience. It consumes permitted Business Brain and Recommendation projections.

Business Brain may provide health, growth, risk, Decision, and Recommendation-related inputs to Product Hub through approved contracts. Product Hub owns presentation and journey composition, while Business Brain and the Recommendation Engine retain their respective sources of truth.

Discovery must not define Product Hub navigation, projection refresh, ranking display, or lifecycle behavior.

### 5.6 Marketplace

**Frozen relationship:** Marketplace is a bounded context within the Core Platform offering. It owns Marketplace Assets and scoped Marketplace lifecycle state.

Business Brain may consume approved Marketplace metadata or applicability through Marketplace contracts when downstream Implementation Option mapping requires it. It cannot query private Marketplace state without Permission, copy Marketplace content into Business-owned truth, or create Marketplace state.

Discovery must not define publisher, certification, sandbox, commercial, settlement, or Marketplace operational policy.

### 5.7 Operating Systems

**Frozen relationship:** Every Operating System is independent and owns its operational domain.

Operating Systems may consume approved Business Brain Decisions, Recommendations, or Configuration Proposals through Core contracts. Business Brain may consume only approved OS Integration Events or analytics projections for authorized analysis. Neither side uses direct database access.

Business Brain output remains advisory or proposal input. The owning OS reauthorizes, validates, and executes its own changes.

### 5.8 AI Coordinator

**Frozen relationship:** AI Coordinator owns governed AI request interpretation, context filtering, policy, Expert routing, orchestration, validation, explanation, AI Action Proposals, and learning feedback collection.

Business Brain may provide decisions, evidence references, and bounded reasoning context to AI Coordinator. AI Coordinator may assist analysis or explanation only after Authorization, Knowledge, deterministic Rules, and policy. AI never bypasses Business Brain where the request concerns Business Brain decision authority, and Business Brain never absorbs AI Coordinator responsibilities.

Discovery must not select AI providers, models, Experts, SDKs, retention, residency, safety mechanisms, evaluation policy, capacity, or cost controls.

## 6. Candidate Components

Genesis names eight Business Brain components. Discovery records all eight as candidates without approving their final placement, granularity, or interfaces.

| # | Candidate component | Genesis responsibility | Discovery boundary observation | Approval status |
|---:|---|---|---|---|
| 1 | Business Analyzer | Understands Business DNA. | Possible internal Business Brain analysis responsibility; exact boundary is undecided. | Not approved by Discovery |
| 2 | Capability Selector | Determines which Capabilities the Business needs. | Possible internal Business Brain reasoning responsibility; Capability definitions remain owned by Capability Registry. | Not approved by Discovery |
| 3 | Recommendation Engine | Generates Recommendations. | Frozen Core architecture treats this as a separate owning component downstream of Business Brain; it is a candidate collaborator, not presumed internal ownership. | Existing external boundary retained; no new decision |
| 4 | Configuration Engine | Transforms accepted Recommendations into Configuration Proposals. | Frozen Core architecture treats this as a separate owning component downstream of Recommendation Engine. | Existing external boundary retained; no new decision |
| 5 | Growth Advisor | Suggests future improvements. | Possible internal Business Brain insight responsibility; exact decision and output shape are undecided. | Not approved by Discovery |
| 6 | Health Analyzer | Evaluates operational health. | Possible internal Business Brain insight responsibility; health definition and evidence remain open. | Not approved by Discovery |
| 7 | Risk Analyzer | Detects business risks. | Possible internal Business Brain insight responsibility; risk taxonomy, severity, and lifecycle remain open. | Not approved by Discovery |
| 8 | AI Coordinator | Coordinates AI Experts. | Frozen Core architecture treats this as a separate Core component with its own decomposition and authority limits. | Existing external boundary retained; no new decision |

### Candidate interpretation requiring Proposal review

The frozen Core Platform already groups **business analysis, Capability selection, growth, health, risk reasoning, and decision orchestration** under Business Brain responsibility. This suggests that Business Analyzer, Capability Selector, Growth Advisor, Health Analyzer, and Risk Analyzer may be internal candidates.

That suggestion is not an approved decomposition. The Proposal must decide whether these names represent durable logical components, responsibilities within fewer components, or views over one decision process. It must do so without absorbing Recommendation Engine, Configuration Engine, or AI Coordinator.

### Candidate enabling responsibilities, not approved components

The following needs are visible in the frozen requirements but are not approved as independent components:

- authorized input resolution;
- input-version pinning;
- applicability resolution;
- deterministic Rule-result consumption;
- decision orchestration;
- decision record persistence;
- evidence and explanation assembly;
- confidence and conflict handling;
- trigger, retry, idempotency, and reanalysis coordination;
- recommendation-candidate handoff;
- insight projection;
- feedback intake; and
- Audit and observability correlation.

The Proposal must decide where these responsibilities belong. Discovery does not create component names for them.

## 7. Candidate Boundaries

The following are boundary candidates to evaluate, not approved physical or aggregate designs.

### 7.1 Business Brain write boundary

Candidate boundary: Business Brain may own Business Brain Decision records containing pinned input references, evidence, reasoning outcomes, and direct analysis results.

Questions remain about aggregate shape, lifecycle, versioning, immutability, reanalysis, supersession, concurrency, and partial failure.

### 7.2 Source-input boundary

Candidate boundary: Business Brain reads published or approved inputs through owner contracts and stores references rather than copies that compete with source truth.

Questions remain about snapshots, freshness, applicability, cache use, invalidation, and historical access.

### 7.3 Recommendation boundary

Candidate boundary: Business Brain emits recommendation candidates; Recommendation Engine creates and owns Recommendations.

Questions remain about candidate identity, deduplication, prioritization inputs, rejected candidates, and disposition feedback.

### 7.4 Insight boundary

Candidate boundary: health, growth, and risk are Business Brain analysis outcomes or projections associated with Business Brain Decisions.

Questions remain about whether each insight is part of one Decision record, a separately versioned record, or a disposable read model.

### 7.5 Configuration boundary

Candidate boundary: Business Brain provides configuration inputs through accepted Recommendations; Configuration Engine owns Configuration Proposals; target owners apply their configuration.

Questions remain about input structure, review policy, compatibility, failure, and reconciliation.

### 7.6 Analytics boundary

Candidate boundary: Business Brain consumes permission-aware Analytics Intake and approved analytics projections without owning OS operational data or analytics source truth.

Questions remain about signal contracts, purpose, consent, freshness, aggregation, retention, and missing data.

### 7.7 AI boundary

Candidate boundary: deterministic and governed Business Brain reasoning remains authoritative for Business Brain decisions; AI assistance enters only through AI Coordinator and cannot become source truth or executor.

Questions remain about which analysis steps may use AI assistance, how AI evidence is validated, and how non-determinism is isolated.

### 7.8 API and Event boundary

Candidate boundary: Business Brain exposes governed Core Module Contracts and approved API/Event surfaces without exposing persistence models or internal Domain Events automatically.

Questions remain about consumers, commands, queries, Event facts, contract versions, idempotency, ordering, replay, and long-running work.

## 8. Candidate Responsibilities

This section groups possible responsibility allocations for Proposal evaluation. It does not approve them.

| Candidate responsibility | Possible Business Brain relationship | Existing owner that must remain authoritative | Proposal decision needed |
|---|---|---|---|
| Interpret published Business DNA | Direct analysis responsibility | Business DNA Registry | Define input and stale-version behavior. |
| Interpret explicit Workspace aggregation | Conditional analysis responsibility | Underlying Business DNA owners; Core intelligence projection | Define authorization, aggregation evidence, and output scope. |
| Select needed Capabilities | Direct reasoning responsibility | Capability Registry | Define selection evidence and dependency behavior. |
| Consume Knowledge applicability | Input responsibility | Knowledge Engine | Define version and applicability contract. |
| Consume deterministic Rule outcomes | Input responsibility | Rules domain | Define evaluation request and evidence contract. |
| Produce Business Brain Decision | Direct write responsibility | Business Brain | Define aggregate, lifecycle, version, and invariants. |
| Produce recommendation candidates | Downstream handoff responsibility | Recommendation Engine owns Recommendation | Define candidate contract and deduplication. |
| Provide configuration inputs | Downstream handoff responsibility | Configuration Engine owns Configuration Proposal | Define source Recommendation and decision references. |
| Produce health insight | Possible direct analysis responsibility | Source domains retain facts | Define calculation, evidence, lifecycle, and presentation boundary. |
| Produce growth insight | Possible direct analysis responsibility | Source domains retain facts | Define horizon, evidence, and relation to Recommendation. |
| Produce risk insight | Possible direct analysis responsibility | Source domains retain facts | Define severity, confidence, review, and relation to Rule outcomes. |
| Consume analytics | Authorized input responsibility | Analytics Intake and source domains | Define purpose, freshness, minimization, and retention. |
| Consume subscription context | Context responsibility | Core commercial control | Define whether context affects business need, eligibility, or only downstream mapping. |
| Support explanation | Direct decision requirement | Knowledge, Rules, and source owners retain evidence | Define minimum explanation and provenance. |
| Support learning | Feedback consumer under policy | Recommendation Engine, AI Coordinator, Knowledge governance, source owners | Define approved signals and prohibit silent source mutation. |
| Trigger Product Hub projection refresh | Possible derived notification | Product Hub owns its projection | Define Event contract without ownership transfer. |
| Support AI assistance | Governed collaboration | AI Coordinator | Define allowed requests, inputs, validation, and human control. |
| Support OS consumption | Contract provider | Each OS owns local use and execution | Define minimal approved outputs and no hard dependency. |

## 9. Open Architectural Questions

The Proposal must answer, explicitly defer, or route each question to Governance. Discovery does not answer them.

### Internal decomposition and decision ownership

1. Are Business Analyzer, Capability Selector, Growth Advisor, Health Analyzer, and Risk Analyzer durable internal components or named responsibilities within a smaller decomposition?
2. Does decision orchestration require a distinct logical component, or is it the coordinating responsibility of Business Brain itself?
3. What is the logical aggregate boundary of a Business Brain Decision?
4. What lifecycle states does a Business Brain Decision require, if any?
5. Does reanalysis create a new immutable Decision, a new Decision version, or a superseding relationship?
6. How are duplicate analysis requests detected and made idempotent?
7. How are partial analysis success, failed insight types, retry, cancellation, and recovery represented?
8. Which component calculates and owns confidence, conflict, and uncertainty for a Business Brain Decision?

### Scope, context, and input applicability

9. Which operations are Business-scoped by default, and which explicitly allow Workspace Intelligence Aggregation?
10. How does a Workspace-level Decision preserve each underlying Business, Business DNA version, and aggregation method without creating Workspace-owned DNA?
11. What minimum published Business DNA is required before analysis may begin?
12. What happens when Business DNA changes while an analysis is running or after a Decision is published?
13. How are applicable Knowledge and Knowledge Pack versions selected and pinned?
14. How are applicable deterministic Rules selected, evaluated, and linked to the Decision?
15. What freshness, completeness, and provenance are required for Workspace Analytics and Usage Analytics inputs?
16. How may subscription context influence analysis without turning a business need into a product-first recommendation?

### Recommendation, Implementation Option, and configuration boundaries

17. What is the contract between a Business Brain Decision and a recommendation candidate?
18. Which prioritization responsibilities belong to Business Brain and which belong exclusively to Recommendation Engine?
19. How do Genesis Recommendation Levels relate, if at all, to Recommendation category, priority, urgency, and lifecycle?
20. At what point may an Operating System, Plan, or Marketplace Asset be mapped as an Implementation Option?
21. What configuration inputs may Business Brain produce without creating or owning a Configuration Proposal?
22. Which Configuration Proposals may apply automatically and which require explicit customer review?
23. How does Recommendation disposition return to Business Brain without changing Business DNA or historical Decisions?

### Health, growth, and risk insights

24. What is the canonical meaning and evidence threshold of a Business health insight?
25. What is the canonical meaning and time horizon of a growth insight?
26. What is the canonical meaning, severity, and confidence model of a risk insight?
27. How are health, growth, and risk changes compared across time and input versions?
28. How are conflicts between health, growth, risk, Rule outcomes, and customer goals exposed without silent resolution?

### Triggers, Events, APIs, and projections

29. Which approved facts may trigger initial analysis or reanalysis?
30. Which Business Brain facts require Domain Events, and which require Integration Events for approved consumers?
31. What ordering, idempotency, replay, and stale-result rules apply to analysis triggered by Events?
32. Which Core Module Contract, First-Party API, Operating System API, or AI Tool API operations are required?
33. Is Business Brain analysis a synchronous operation, a Long-Running Operation, or a contract-dependent combination?
34. Which read models or projections are required, who owns them, and how is their freshness communicated?

### AI, learning, Security, and operations

35. Which Business Brain responsibilities may request AI assistance through AI Coordinator?
36. At what stage may AI assistance occur without bypassing deterministic Rules or Business Brain decision authority?
37. How are deterministic outcomes separated from non-deterministic AI suggestions in one explanation?
38. What evidence, confidence, provider, Expert-version, and validation requirements apply to AI-assisted reasoning?
39. Which usage, Business outcome, adoption, disposition, and customer-feedback signals are approved for learning?
40. What Permission, privacy, consent, retention, deletion, residency, and minimization rules apply to Decisions and learning inputs?
41. What scoped Permissions and service authorizations are required to request, view, aggregate, retry, or administer analysis?
42. What observability signals, SLOs, SLAs, error budgets, capacity thresholds, incident controls, and recovery objectives are required?

## 10. Risks

| Risk | Consequence | Discovery treatment |
|---|---|---|
| Business Brain duplicates Business DNA | Analysis becomes a competing Business source of truth. | Preserve reference-only input and separate Decision ownership as a Proposal constraint. |
| Business Brain duplicates Knowledge or Rules | Shared platform expertise fragments and decisions become irreproducible. | Require versioned references to canonical owners. |
| Business Brain absorbs Recommendation Engine | Recommendation lifecycle, disposition, and prioritization ownership become ambiguous. | Keep the frozen downstream boundary explicit. |
| Business Brain absorbs Configuration Engine | Analysis could mutate target configuration or bypass review. | Preserve Configuration Proposal and target validation boundaries. |
| Product-first reasoning | Recommendations become software sales rather than business advice. | Require business improvement and Capability before Implementation Option mapping. |
| Workspace aggregation becomes merged DNA | Multi-Business analysis corrupts Business identity. | Require explicit aggregation with source Business references. |
| Stale or mixed input versions | Decisions cannot be reproduced or trusted. | Make pinning and stale-result policy a Proposal question. |
| Analytics treated as canonical fact | Projections or incomplete signals could override owner data. | Require purpose-bound, provenance-aware Analytics Intake. |
| AI bypasses deterministic reasoning | Generated output could become hidden policy or truth. | Keep AI downstream and routed only through AI Coordinator. |
| Unclear insight semantics | Health, growth, and risk outputs may conflict or become arbitrary. | Require definitions, evidence, confidence, and lifecycle decisions in Proposal. |
| Direct OS execution | A recommendation could become an unauthorized operational change. | Preserve owner reauthorization and Configuration Proposal boundaries. |
| Cross-tenant or cross-Business leakage | Sensitive context could be analyzed or exposed outside scope. | Require explicit context, ancestry validation, least privilege, and no implicit aggregation. |
| Event-triggered duplicate work | Reanalysis may produce duplicate Decisions or downstream side effects. | Keep idempotency, ordering, replay, and supersession open for Proposal. |
| Opaque explanations | Customers and auditors cannot understand or challenge decisions. | Require pinned evidence, versions, assumptions, alternatives, and confidence. |
| Learning mutates source truth | Feedback could silently rewrite DNA, Knowledge, or Rules. | Preserve governed candidate change and human approval processes. |
| Premature physical design | Framework, database, or queue choices could define the domain incorrectly. | Keep Discovery and Proposal logical and technology-independent. |

## 11. Unknowns

The following facts are not yet available or approved:

- initial Business Brain Decision schema and aggregate shape;
- analysis lifecycle and versioning rules;
- minimum Core Business DNA and materiality threshold;
- initial Knowledge, Knowledge Pack, Capability, and Rule schema coverage available to analysis;
- expected Business and Workspace analysis volume;
- acceptable analysis latency and freshness;
- analytics signals available during the initial milestone;
- historical data required for health, growth, and risk reasoning;
- initial country, Industry, Sub Industry, and compliance coverage;
- Permission catalog for Business Brain operations;
- API resource catalog and contract schemas;
- Event catalog and delivery infrastructure;
- data retention, deletion, classification, and residency policy;
- AI provider, model, Expert, evaluation, safety, and retention policy;
- physical module, database, cache, queue, search, and deployment choices;
- observability technology and service-objective values;
- operational owner, support, incident, backup, and recovery procedures; and
- implementation sequence within the approved milestone roadmap.

Unknowns are not permission to infer an answer. The Proposal must classify each as an architectural decision, implementation decision, policy decision, dependency, or continued deferral.

## 12. Required ADRs

### 12.1 Existing accepted ADR authority

The Proposal must conform to existing accepted ADRs, especially:

- `ADR-002` — Core Platform is the shared control and intelligence plane;
- `ADR-005` and `ADR-006` — Business DNA is Business-scoped and Workspace intelligence is explicit aggregation;
- `ADR-007` through `ADR-011` — Capability, Knowledge, Knowledge Pack, and Rule boundaries;
- `ADR-012` — Business Brain is the platform decision engine;
- `ADR-013` and `ADR-014` — Capability-first, explainable, optional Recommendations and human control;
- `ADR-016` and `ADR-017` — governed Business Architect Pipeline and Configuration Proposals;
- `ADR-018` through `ADR-020` — readiness and Product Hub boundaries;
- `ADR-024` and `ADR-025` — independent Operating Systems and optional integrations;
- `ADR-027` through `ADR-032` — Marketplace and AI boundaries;
- `ADR-033` through `ADR-036` — modular monolith, explicit context, compatible contracts, and API Architecture;
- `ADR-038` and `ADR-039` — append-only Audit and data-driven assets; and
- `ADR-040` — Core organization identity and OS operational data separation.

### 12.2 Candidate new ADR subjects

Governance must determine which Proposal decisions require new ADRs. Candidate subjects include:

1. Business Brain internal decomposition and component boundaries;
2. Business Brain Decision aggregate, lifecycle, versioning, and supersession;
3. Business-scoped analysis and explicit Workspace aggregation contract;
4. input applicability, version pinning, stale-result, and reanalysis policy;
5. recommendation-candidate handoff and separation from Recommendation lifecycle;
6. health, growth, and risk insight semantics and ownership;
7. Analytics Intake and learning boundaries;
8. AI assistance boundary between Business Brain and AI Coordinator;
9. Business Brain API and Event contract surfaces; and
10. Security, retention, Audit, observability, and operational requirements that materially constrain future implementations.

These are ADR candidates, not approved ADRs. A subject may remain within an existing accepted decision or become implementation detail after Governance review.

## 13. Dependencies

### 13.1 Required architectural dependencies

- Core Platform Architecture v1.0 and Documentation Baseline v1.0.1;
- Governance Foundation, Glossary, Milestone Lifecycle, and accepted ADRs;
- published Business DNA and Business DNA Registry contracts;
- Workspace Intelligence Aggregation contract for explicit multi-Business analysis;
- Capability Registry;
- Knowledge Engine and Knowledge Pack governance;
- deterministic Rules Engine;
- Recommendation Engine;
- Configuration Engine;
- Readiness Service;
- Identity and Access, Authorization Context, and Permission evaluation;
- Workspace, Business, and Organization registries;
- Settings and Localization;
- Analytics Intake and authorized projections;
- Product and Plan Catalog and commercial context;
- Product Hub projection and presentation contracts;
- Marketplace API for approved asset and applicability references;
- AI Coordinator and AI Tool API;
- Audit Service, Notification Service, API Architecture, Event Architecture, Security, and Observability; and
- Operating System contracts for approved consumption and optional feedback.

### 13.2 Process dependencies

- Discovery approval or acceptance as sufficient input to Proposal planning;
- Proposal creation as one planning artifact;
- Proposal Architecture Review;
- explicit Proposal approval before Documentation Waves;
- ADR review for material new decisions; and
- adherence to the approved Milestone Lifecycle.

## 14. Inputs

### 14.1 Frozen input categories

| Input | Canonical owner | Scope and constraint |
|---|---|---|
| Published Business DNA Snapshot | Business DNA Registry | One Business by default; version must be identifiable. |
| Workspace Intelligence Aggregation | Core intelligence projection | Explicit, authorized aggregation; never merged DNA. |
| Capability definitions and metadata | Capability Registry | Shared platform assets; referenced, not copied. |
| Knowledge and Knowledge Pack versions | Knowledge Engine | Applicable published immutable versions. |
| Rule outcomes and evidence | Rules domain | Deterministic, versioned, explainable evaluation. |
| Platform Settings | Settings and Localization | Authorized locale, country, timezone, currency, and other applicable context. |
| Country Rules | Knowledge and Rules owners | Governed applicable versions, not embedded Business Brain policy. |
| Customer Goals and Business Stage | Business DNA or approved source context | Source and version remain explicit. |
| Workspace Analytics and Usage Analytics | Analytics Intake and source domains | Purpose-bound, permission-aware, freshness-visible projections. |
| Subscription Information | Core commercial control | Context only; must not replace business-first reasoning. |
| Business outcomes, adoption, and feedback | Applicable source owner through approved intake | Learning use remains governed and non-mutating. |
| Actor, Workspace, Business, organization, Permission, locale, correlation, and causation context | Applicable Core owner | Explicit, verified, minimal, and auditable. |

### 14.2 Input questions

Discovery does not approve required/optional fields, schema, transport, retention, cache, freshness, or fallback behavior. Those remain Proposal questions or deferred implementation decisions.

## 15. Outputs

### 15.1 Direct frozen output categories

| Output | Candidate owner relationship | Constraint |
|---|---|---|
| Business Brain Decision | Business Brain | Must retain pinned inputs, evidence, rationale, and scope; exact model is open. |
| Recommendation candidate | Business Brain produces; Recommendation Engine consumes | Not a Recommendation and has no customer disposition lifecycle by itself. |
| Capability selection reasoning | Business Brain | References Capability Registry; does not modify Capability definitions. |
| Configuration input | Business Brain produces for downstream flow | Not a Configuration Proposal and cannot apply target configuration. |
| Health insight | Candidate Business Brain output | Meaning, lifecycle, and record shape remain open. |
| Growth insight | Candidate Business Brain output | Meaning, lifecycle, and record shape remain open. |
| Risk insight | Candidate Business Brain output | Meaning, severity, lifecycle, and record shape remain open. |

### 15.2 Downstream outputs owned elsewhere

| Downstream output | Canonical owner | Business Brain relationship |
|---|---|---|
| Recommendation | Recommendation Engine | Derived from decision and candidate inputs under Recommendation ownership. |
| Implementation Option | Core intelligence mapping | Maps a business improvement or Capability to an Operating System, Plan, or Marketplace Asset. |
| Configuration Proposal | Configuration Engine | Derived from an accepted Recommendation; target owns application. |
| Product Hub presentation and projection | Product Hub | Displays permitted Decision, Recommendation, health, growth, and risk projections. |
| Marketplace state | Marketplace bounded context | Never created or owned by Business Brain. |
| AI response or AI Action Proposal | AI Coordinator | May use Business Brain context; remains under AI governance. |
| OS configuration or operational change | Owning Operating System | Requires OS validation, Authorization, and execution. |
| Audit Record | Audit Service | Business Brain supplies actor, scope, versions, action, and result context. |

### 15.3 Output questions

Discovery does not approve schemas, lifecycle states, severity scales, scores, ranking, API resources, Event names, projection layouts, retention, or service objectives.

## 16. Success Criteria for Proposal

The future Proposal is ready for Architecture Review when it:

1. defines a complete Business Brain logical boundary without changing the frozen Core Platform;
2. clearly separates inherited decisions, proposed decisions, and deferred questions;
3. decides or explicitly defers the placement of all eight Genesis-named candidate components;
4. assigns every candidate responsibility to one accountable owner without duplication;
5. defines the Business Brain Decision concept, scope, invariants, and relationship to source versions at proposal level;
6. preserves Business-scoped analysis by default and explicit Workspace aggregation only when requested and authorized;
7. defines how Business Brain consumes Business DNA, Capabilities, Knowledge, Rules, analytics, settings, goals, stage, and subscription context without owning them;
8. defines the boundary with Recommendation Engine, Implementation Option mapping, Configuration Engine, Product Hub, Marketplace, Operating Systems, and AI Coordinator;
9. keeps business improvement and Capability reasoning before software mapping;
10. defines candidate API and Event responsibilities without choosing unapproved protocols or infrastructure;
11. applies explicit context, tenant isolation, least privilege, Audit, data minimization, human control, and observability;
12. defines explainability, evidence, confidence, assumptions, alternatives, and conflict behavior at logical level;
13. addresses all 42 Discovery questions by decision, deferral, dependency, or candidate ADR;
14. lists all applicable inherited and proposed ADRs;
15. preserves the Core Platform deferred-decision register;
16. identifies risks, mitigations, unknowns, dependencies, and measurable milestone success;
17. introduces no synonym, ownership transfer, shared OS database, cross-OS hard dependency, AI authority expansion, or silent configuration path; and
18. remains one planning document pending review and approval before Documentation Waves.

## 17. Discovery Conclusions

### 17.1 Established problem space

The frozen baseline already establishes that Business Brain is the shared platform decision engine. Its problem is not whether Nexoraxs needs Business intelligence, but how to structure governed analysis and decision records around existing sources and downstream owners.

The central architectural challenge is to make Business Brain useful and explainable without allowing it to become:

- a second Business DNA Registry;
- a duplicate Knowledge or Rules store;
- the owner of Recommendation or Configuration lifecycle;
- a Product Hub or Marketplace replacement;
- an Operating System workflow engine; or
- an unrestricted AI layer.

### 17.2 Candidate landscape

Genesis supplies eight named candidate components. Frozen Core architecture already clarifies that Recommendation Engine, Configuration Engine, and AI Coordinator are separate collaborators. Business Analyzer, Capability Selector, Growth Advisor, Health Analyzer, and Risk Analyzer remain possible internal candidates whose final granularity and placement require Proposal review.

No candidate is approved by this Discovery document.

### 17.3 Unresolved work

Forty-two architectural questions remain across decomposition, decision ownership, input applicability, versioning, aggregation, Recommendation and configuration boundaries, insight semantics, triggers, APIs, Events, AI, learning, Security, and operations.

These questions are sufficiently identified to begin a Proposal. They need not all be resolved immediately; the Proposal may preserve appropriate implementation and policy deferrals while making the logical architecture reviewable.

### 17.4 Discovery recommendation

No contradiction blocks Proposal planning. The authoritative baseline, candidate set, boundary constraints, risks, dependencies, inputs, outputs, unknowns, and ADR subjects are sufficiently documented.

**READY FOR PROPOSAL**

The Proposal must remain a planning document and must receive Architecture Review and explicit approval before any Business Brain Documentation Wave begins.

## References

### Governance

- `docs/00-governance/MILESTONE-LIFECYCLE.md`
- `docs/00-governance/ADR/README.md`
- `docs/00-governance/glossary/GLOSSARY.md`
- `docs/00-governance/ADR/ADR-002-core-shared-control-intelligence-plane.md`
- `docs/00-governance/ADR/ADR-005-business-dna-business-scoped-software-independent.md`
- `docs/00-governance/ADR/ADR-006-workspace-intelligence-explicit-aggregation.md`
- `docs/00-governance/ADR/ADR-007-capabilities-before-industries.md`
- `docs/00-governance/ADR/ADR-009-shared-versioned-immutable-knowledge.md`
- `docs/00-governance/ADR/ADR-011-deterministic-versioned-explainable-rules.md`
- `docs/00-governance/ADR/ADR-012-business-brain-decision-engine.md`
- `docs/00-governance/ADR/ADR-013-capability-first-explainable-recommendations.md`
- `docs/00-governance/ADR/ADR-014-human-control-over-recommendations-and-ai.md`
- `docs/00-governance/ADR/ADR-017-configuration-proposals-respect-domain-ownership.md`
- `docs/00-governance/ADR/ADR-020-product-hub-composition-not-data-ownership.md`
- `docs/00-governance/ADR/ADR-024-independent-operating-system-domain-ownership.md`
- `docs/00-governance/ADR/ADR-027-marketplace-bounded-context-within-core.md`
- `docs/00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md`
- `docs/00-governance/ADR/ADR-030-ai-coordinator-separated-orchestration.md`
- `docs/00-governance/ADR/ADR-033-enforced-modular-monolith.md`
- `docs/00-governance/ADR/ADR-034-explicit-tenant-and-resource-scope.md`
- `docs/00-governance/ADR/ADR-035-technology-independent-compatible-contracts.md`
- `docs/00-governance/ADR/ADR-036-contract-first-api-architecture.md`
- `docs/00-governance/ADR/ADR-038-append-only-audit-history.md`
- `docs/00-governance/ADR/ADR-039-data-driven-configurable-platform-assets.md`

### Genesis

- `docs/01-genesis/01-VISION.md`
- `docs/01-genesis/02-CONSTITUTION.md`
- `docs/01-genesis/03-BUSINESS-DNA.md`
- `docs/01-genesis/04-CAPABILITIES.md`
- `docs/01-genesis/05-KNOWLEDGE-ENGINE.md`
- `docs/01-genesis/06-BUSINESS-BRAIN.md`
- `docs/01-genesis/07-RECOMMENDATION-ENGINE.md`
- `docs/01-genesis/08-AI-STRATEGY.md`
- `docs/01-genesis/09-PLATFORM-BLUEPRINT.md`
- `docs/01-genesis/10-NEXORAXS-ONTOLOGY.md`
- `docs/01-genesis/11-CUSTOMER-JOURNEY.md`
- `docs/01-genesis/12-WORKSPACE-LIFECYCLE.md`
- `docs/01-genesis/13-PRODUCT-HUB.md`
- `docs/01-genesis/14-SUBSCRIPTION-MODEL.md`
- `docs/01-genesis/15-BUSINESS-LIFECYCLE.md`
- `docs/01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md`
- `docs/01-genesis/17-MARKETPLACE-ARCHITECTURE.md`
- `docs/01-genesis/18-KNOWLEDGE-PACKS.md`
- `docs/01-genesis/19-AI-EXPERT-NETWORK.md`
- `docs/01-genesis/20-PLATFORM-ECOSYSTEM.md`

### Core Platform and Freeze

- `docs/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md`
- `docs/02-core-platform/00-CORE-PLATFORM-PRINCIPLES.md`
- `docs/02-core-platform/01-CORE-PLATFORM-VISION.md`
- `docs/02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md`
- `docs/02-core-platform/03-DOMAIN-MODEL.md`
- `docs/02-core-platform/04-DATA-OWNERSHIP.md`
- `docs/02-core-platform/05-PERMISSION-MODEL.md`
- `docs/02-core-platform/06-EVENT-ARCHITECTURE.md`
- `docs/02-core-platform/07-API-PHILOSOPHY.md`
- `docs/02-core-platform/08-SECURITY-MODEL.md`
- `docs/02-core-platform/09-OBSERVABILITY.md`
- `docs/02-core-platform/10-DEPLOYMENT-MODEL.md`
- `docs/02-core-platform/11-TECHNOLOGY-STACK.md`
- `docs/02-core-platform/12-CORE-PLATFORM-ROADMAP.md`
- `docs/02-core-platform/99-CORE-PLATFORM-ARCHITECTURE-REVIEW.md`
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md`
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.0.1-READINESS.md`
