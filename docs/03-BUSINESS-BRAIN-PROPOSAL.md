# Business Brain Architecture Proposal

Version: 0.1  
Status: Proposal — Architecture Review Required  
Milestone: Business Brain  
Architecture baseline: Core Platform v1.0  
Documentation baseline: Core Platform v1.0.1  
Discovery basis: Business Brain Discovery v0.1 and Business Brain Capability Map v0.1  
Owner: Nexoraxs

---

## Proposal Status

This is the first formal architecture proposal for the Business Brain milestone.

It converts the approved Discovery and Capability Map into a coherent proposed design. Nothing in this document supersedes Genesis, Governance, accepted ADRs, the Core Platform Freeze, or an existing canonical owner.

The proposed components, Decision structure, contracts, Event responsibilities, and draft ADRs require Architecture Review and explicit approval. No Business Brain Documentation Wave may begin before that approval.

## 1. Vision

Business Brain is the shared Nexoraxs decision engine that understands a Business and turns governed Business context into explainable decision support.

It should behave like an experienced business consultant:

- understand the Business before considering software;
- interpret one Business's Business DNA by default;
- apply shared Knowledge, deterministic Rules, Capabilities, goals, country, stage, analytics, and approved commercial context;
- identify business improvements and needed Capabilities;
- explain why each decision exists, what evidence supports it, and where uncertainty remains;
- provide recommendation candidates and configuration inputs to their existing downstream owners; and
- improve future guidance through governed feedback without rewriting source truth.

Business Brain succeeds when customers feel that Nexoraxs understands their Business and can justify its guidance.

## 2. Scope

This Proposal defines:

- the Business Brain logical domain boundary;
- proposed internal logical components and their dependency direction;
- the Business Brain Decision architecture;
- collaboration among the approved candidate capabilities;
- integration boundaries with Core Platform and external owning domains;
- canonical data ownership, read-model, and write-model rules;
- technology-independent contract responsibilities;
- Event ownership and consumption responsibilities;
- Security, tenant, Permission, Audit, and observability constraints;
- AI assistance boundaries;
- risks and intentionally deferred decisions;
- draft ADRs for the proposed design; and
- success criteria for approving the Proposal.

The initial architecture remains a logical module inside the enforced Core Platform modular monolith. This Proposal does not require separate deployment.

## 3. Non-Scope

This Proposal does not define:

- changes to Genesis, Governance, the Core Platform Freeze, or accepted ADRs;
- Business Architect Pipeline architecture or Business DNA publication;
- Knowledge Engine, Knowledge Pack, Capability Registry, or Rules Engine internals;
- Recommendation Engine internals, Recommendation lifecycle, customer disposition, or Implementation Option ownership;
- Configuration Engine internals, Configuration Proposal lifecycle, review policy, compatibility validation, or target application;
- Product Hub navigation, product discovery, commercial lifecycle, installation, setup handoff, or source projections;
- Marketplace asset, publisher, certification, sandbox, commercial, installation, activation, entitlement, or support architecture;
- Operating System setup, Modules, workflows, Permissions, configuration, operational data, dashboards, reports, navigation, endpoints, or execution;
- AI Coordinator decomposition, AI Expert Network, provider, model, tool, safety, evaluation, retention, residency, cost, or capacity architecture;
- API endpoints, protocols, serialization, schemas, paths, pagination, filtering, rate values, or gateway technology;
- Event names, envelopes, schema technology, delivery infrastructure, partitioning, retention, retry, dead-letter, or replay tooling;
- physical database schemas, tables, indexes, transactions, cache, queue, object storage, or search technology;
- deployment topology, framework, language, runtime, hosting, recovery mechanism, or service extraction;
- detailed Permission catalog, retention schedule, SLO, SLA, error budget, or incident runbook; or
- any Business Brain Documentation Wave.

## 4. Responsibilities

### 4.1 Direct Business Brain responsibilities

Business Brain is responsible for:

- interpreting authorized Business context without changing source facts;
- analyzing one selected Business by default;
- analyzing explicit Workspace Intelligence Aggregation only when requested and authorized;
- consuming exact, applicable versions of Business DNA, Knowledge, Rules, Capabilities, analytics, settings, goals, country, stage, and commercial context;
- identifying business needs and business improvements before software;
- selecting candidate Capabilities and explaining their relevance;
- producing Business Brain Decisions with pinned input references;
- producing health, growth, and risk reasoning within those Decisions;
- producing recommendation candidates for Recommendation Engine;
- producing configuration inputs for Configuration Engine's downstream use;
- exposing evidence, rationale, confidence, assumptions, alternatives, conflicts, and uncertainty;
- coordinating optional AI assistance through AI Coordinator without granting AI decision authority;
- interpreting approved feedback for future analysis under Governance; and
- emitting Business Brain-owned facts through governed contracts.

### 4.2 Responsibilities retained by other owners

| Responsibility | Canonical owner | Business Brain relationship |
|---|---|---|
| Business DNA identity, facts, provenance, publication, correction, and history | Business DNA Registry | Read exact published versions only. |
| Workspace Intelligence Aggregation source | Core intelligence projection over Business-owned DNA | Consume explicit authorized aggregation without creating merged DNA. |
| Capability definitions and lifecycle | Capability Registry | Reference and reason over canonical Capabilities. |
| Knowledge and Knowledge Pack content and lifecycle | Knowledge Engine | Consume applicable immutable published versions. |
| Rule definition, applicability, evaluation authority, and outcome | Rules domain | Consume deterministic outcomes and evidence. |
| Recommendation generation, prioritization, lifecycle, and disposition | Recommendation Engine | Supply recommendation candidates; consume approved feedback. |
| Implementation Option mapping | Core intelligence mapping | Provide business improvement and Capability reasoning only. |
| Configuration Proposal creation and lifecycle | Configuration Engine | Supply configuration input; never create or apply target state. |
| Product Hub journey and projections | Product Hub | Supply permitted Decision and insight information. |
| Marketplace assets and scoped state | Marketplace bounded context | Consume approved references only. |
| AI orchestration and AI Action Proposals | AI Coordinator | Request governed assistance and provide bounded context. |
| OS setup, domain configuration, operations, and execution | Applicable Operating System | Supply approved guidance; consume authorized signals only. |
| Identity, Authentication, Authorization foundation, and Membership | Core Identity and Access | Require verified actor, service, and scope context. |
| Audit Record | Audit Service | Supply actor, scope, versions, action, outcome, correlation, and causation. |
| Analytics source and intake governance | Analytics Intake and source owners | Consume purpose-bound approved projections. |

## 5. Architectural Principles

1. **Business Before Software.** Analysis starts from Business context and Capability need, not a Product, Plan, or Marketplace Asset.
2. **Business-Scoped by Default.** Every Decision belongs to one Business unless explicit authorized Workspace aggregation is requested.
3. **Explicit Aggregation.** Workspace analysis references its constituent Businesses and never creates Workspace-owned Business DNA.
4. **Canonical Ownership.** Business Brain writes only Business Brain-owned state.
5. **Reference, Never Duplicate.** Business DNA, Knowledge, Rules, Capabilities, analytics, commercial state, Marketplace state, and OS facts are referenced from their owners.
6. **Deterministic Rules Before AI.** AI cannot replace, modify, or bypass official Rule outcomes.
7. **Capability First.** Candidate Capabilities precede Implementation Option mapping.
8. **Decision Is Not Recommendation.** A Business Brain Decision and recommendation candidate remain separate from a Recommendation.
9. **Configuration Is Proposed Elsewhere.** Configuration input is not a Configuration Proposal or target mutation.
10. **Explainability by Design.** Every Decision preserves sufficient evidence, versions, assumptions, alternatives, conflicts, confidence, and uncertainty.
11. **Human Control.** Guidance remains reviewable and optional; consequential action requires the appropriate human and owning-domain controls.
12. **AI Assists, Never Owns.** AI Coordinator may assist, but Business Brain validates what becomes part of a Decision.
13. **Immutable Decision History.** A completed Business Brain Decision is not rewritten; reanalysis creates a new Decision linked to prior history.
14. **Contract First.** Collaboration uses explicit, versioned, technology-independent contracts.
15. **Event-Driven Where Appropriate.** Events communicate committed facts, not hidden commands or proposals.
16. **Tenant Isolation by Default.** Context, data, projections, Events, and AI assistance remain Workspace-safe.
17. **Least Privilege.** Every analysis, query, aggregation, retry, and administration operation requires current authorization.
18. **Projection Is Never Ownership.** Product Hub, search, analytics, and other read models never become Decision write authority.
19. **Auditability.** Material analysis, Decision publication, reanalysis, failure, administration, and downstream handoff are correlated and auditable.
20. **Technology Independence.** Framework, storage, queue, model, and deployment choices do not define the domain.

## 6. Domain Boundaries

### 6.1 Business Brain owns

- Business Brain Decision identity and completed Decision history;
- pinned references to exact inputs used by a Decision;
- Business analysis reasoning contained in a Decision;
- candidate Capability selection reasoning contained in a Decision;
- health, growth, and risk insights contained in a Decision;
- Business Brain explanation, confidence, assumptions, alternatives, conflicts, and uncertainty;
- recommendation candidate content until accepted by Recommendation Engine under its contract;
- configuration input content supplied to downstream Configuration Engine context;
- logical correlation between a Decision and its downstream candidate outputs;
- reanalysis and supersession relationship between Business Brain Decisions; and
- Business Brain-specific feedback interpretation used only for future reasoning.

### 6.2 Business Brain consumes but never owns

- Workspace, Business, Business Unit, Department, and Branch identities;
- Business DNA and Workspace Intelligence Aggregation;
- Knowledge, Knowledge Packs, Capabilities, and Rules;
- settings, localization, goals, country, stage, subscription, and Plan state;
- analytics projections, usage, outcomes, adoption, and feedback;
- Marketplace Assets and scoped Marketplace state;
- OS lifecycle and operational facts exposed through approved contracts;
- Recommendation and disposition;
- Configuration Proposal and target application status;
- AI Interaction, Expert output, and AI Action Proposal; and
- Audit Records and observability telemetry.

### 6.3 Business Brain may not cross

- Business Brain never writes Business DNA, Knowledge, Rules, Capabilities, Recommendation, Product Hub, Marketplace, commercial, organization, AI Coordinator, or OS write models.
- Business Brain never reads another domain's tables directly merely because it shares a modular-monolith deployment.
- Business Brain never exposes an internal projection as proof of current Permission or source truth.
- Business Brain never lets a Workspace aggregate overwrite or obscure individual Business identity.
- Business Brain never performs an action merely because it recommended or analyzed it.

## 7. Internal Architecture

### 7.1 Proposed logical layers

| Layer | Purpose | Proposed components |
|---|---|---|
| Analysis | Interpret authorized Business context and identify needs, conditions, Capabilities, health, growth, and risk. | Business Analyzer, Capability Selector, Health Analyzer, Growth Advisor, Risk Analyzer |
| Decision | Coordinate contributions, pin exact inputs, enforce invariants, compose explanation, and publish the Business Brain Decision. | Decision Orchestrator |
| Downstream candidate formation | Produce bounded input for existing downstream owners. | Recommendation Candidate Builder, Configuration Input Builder |
| Governed feedback | Interpret approved outcomes and feedback for future Decisions without changing source truth. | Learning Interpreter |

These are logical components. They do not imply a process, service, package, database, queue, or one-to-one deployment boundary.

### 7.2 Proposed internal flow

```text
Verified Core Authorization Context
  + Published Business DNA or explicit Workspace Intelligence Aggregation
  + Applicable Knowledge, Rules, Capabilities, analytics, settings, goals,
    country, stage, and commercial context
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
                 Completed Business Brain Decision
                    ├──────────────────────┐
                    ↓                      ↓
 Recommendation Candidate Builder  Configuration Input Builder
                    ↓                      ↓
       Recommendation Engine      Configuration Engine context

Approved disposition, outcomes, adoption, usage, and feedback
                              ↓
                    Learning Interpreter
                              ↓
                 Future analysis context only
```

### 7.3 Dependency direction

1. Analysis components depend on owner-provided inputs, never owner write models.
2. Capability and insight analysis depend on Business Analyzer output.
3. Decision Orchestrator depends on all applicable analysis contributions.
4. Candidate builders depend on a completed Business Brain Decision.
5. Recommendation Engine and Configuration Engine do not depend on Business Brain internals; they depend on versioned boundary contracts.
6. Learning Interpreter may inform future analysis but cannot rewrite a completed Decision.
7. AI Coordinator remains adjacent to the flow and may assist only through governed contracts; it is not an internal Business Brain component.

### 7.4 Circular dependency prohibition

- Business Brain may consume Recommendation disposition, but Recommendation Engine may not require Business Brain to own Recommendation lifecycle.
- Business Brain may consume OS outcomes, but no OS core workflow may depend on Business Brain availability unless a later approved optional feature contract explicitly permits graceful degradation.
- Configuration Engine may consume Decision references and configuration input, but Business Brain may not depend on Configuration application to validate the original Business need.
- Product Hub may consume Decision projections, but Business Brain may not depend on Product Hub presentation state.

## 8. Candidate Component Architecture

The Proposal recommends nine logical components for Architecture Review.

### 8.1 Business Analyzer

- **Owns:** Interpretation and analysis contribution for one Decision evaluation.
- **Consumes:** Authorized Business scope; published Business DNA or explicit aggregation; applicable Knowledge, Rule outcomes, analytics, settings, goals, country, stage, and commercial context.
- **Produces:** Business understanding, identified needs and conditions, evidence references, gaps, assumptions, conflicts, and uncertainty.
- **Never owns:** Any source input, Business DNA correction, Knowledge, Rule, Capability, subscription, or analytics state.

### 8.2 Capability Selector

- **Owns:** Candidate Capability selection reasoning within the Business Brain Decision.
- **Consumes:** Business Analyzer contribution and canonical Capability metadata, dependencies, applicability, country, and lifecycle.
- **Produces:** Candidate Capability references and rationale.
- **Never owns:** Capability definitions, OS Modules, Products, Plans, Marketplace Assets, or Implementation Options.

### 8.3 Health Analyzer

- **Owns:** Health reasoning included in the Business Brain Decision.
- **Consumes:** Business Analyzer contribution, permitted analytics, Knowledge, Rules, goals, and stage.
- **Produces:** Health insight with evidence, confidence, assumptions, and uncertainty.
- **Never owns:** Operational facts, analytics source truth, KPI Knowledge, dashboard presentation, or Recommendation.

### 8.4 Growth Advisor

- **Owns:** Growth reasoning included in the Business Brain Decision.
- **Consumes:** Business Analyzer contribution, goals, stage, Capability reasoning, Knowledge, Rules, and approved outcomes.
- **Produces:** Growth insight and candidate improvement themes.
- **Never owns:** Business goals, Growth Plan facts, Recommendation, Product, Plan, Marketplace Asset, or execution.

### 8.5 Risk Analyzer

- **Owns:** Business risk reasoning included in the Business Brain Decision.
- **Consumes:** Business Analyzer contribution, Business DNA risk context, Knowledge, Rule outcomes, analytics, and approved operational facts.
- **Produces:** Risk insight with evidence, severity candidate, confidence, assumptions, and uncertainty.
- **Never owns:** Official Rules, compliance policy, Security incidents, OS incidents, Business DNA risks, Recommendation, or action.

### 8.6 Decision Orchestrator

- **Owns:** Decision evaluation coordination, exact input manifest, contribution validation, conflict exposure, Decision composition, Business Brain explanation, Decision identity, and completed Decision publication.
- **Consumes:** Applicable output from the five analysis components; verified context; source versions; correlation and causation.
- **Produces:** Completed Business Brain Decision and the authoritative link to its predecessor when reanalysis supersedes prior reasoning.
- **Never owns:** Authorization policy, source facts, Recommendation, Configuration Proposal, AI response, Audit Record, downstream projection, or target action.

Decision Orchestrator is not an AI orchestrator. It coordinates deterministic and governed Business Brain contributions. AI orchestration remains owned by AI Coordinator.

### 8.7 Recommendation Candidate Builder

- **Owns:** Formation of recommendation candidate content from a completed Decision.
- **Consumes:** Decision, selected Capability reasoning, relevant insight, evidence, risks, alternatives, confidence, and assumptions.
- **Produces:** Versioned recommendation candidate linked to the source Decision.
- **Never owns:** Recommendation identity after acceptance by Recommendation Engine, prioritization, lifecycle, disposition, customer acceptance, or Implementation Option mapping.

### 8.8 Configuration Input Builder

- **Owns:** Formation of configuration input linked to a completed Decision and applicable downstream Recommendation context.
- **Consumes:** Decision, Capability reasoning, Knowledge and Rule references, and Recommendation reference when available.
- **Produces:** Configuration input for Configuration Engine consideration.
- **Never owns:** Configuration Proposal, review policy, compatibility decision, target validation, target configuration, or application status.

### 8.9 Learning Interpreter

- **Owns:** Interpretation of approved feedback as a future-analysis contribution under governed policy.
- **Consumes:** Recommendation disposition, approved Business outcomes, feature adoption, usage patterns, customer feedback, and historical Decision references.
- **Produces:** Learning contribution eligible for future analysis context.
- **Never owns:** Consent, raw OS data, Business DNA correction, Knowledge promotion, Rule modification, Capability lifecycle, AI learning policy, or automatic behavior change.

### 8.10 Proposed component invariants

1. One logical responsibility has one proposed owner inside Business Brain.
2. No proposed component writes another domain's canonical state.
3. No proposed component becomes a source owner merely by caching or projecting source data.
4. Components exchange typed logical contributions inside the modular boundary; physical packaging remains deferred.
5. Explanation is composed by Decision Orchestrator from evidence supplied by every contributor.
6. Recommendation Candidate Builder and Configuration Input Builder have no downstream execution authority.
7. Learning Interpreter cannot mutate past Decisions or canonical sources.
8. AI Coordinator remains outside this decomposition.

## 9. Business Brain Decision Architecture

### 9.1 Definition

A Business Brain Decision is the canonical, versioned record of governed Business Brain reasoning for:

- one selected Business; or
- an explicit, authorized Workspace Intelligence Aggregation that identifies every included Business and Business DNA version.

It records what Business Brain concluded from exact approved inputs. It is not a Business fact, Recommendation, Implementation Option, Configuration Proposal, Product Hub state, AI response, or OS action.

### 9.2 Proposed Decision composition

| Decision section | Required meaning |
|---|---|
| Identity | Stable Decision identifier and Decision version. |
| Scope | Workspace; one Business by default; explicit aggregation marker and included Businesses where applicable. |
| Purpose | Approved analysis purpose and requesting context classification. |
| Input manifest | Exact Business DNA, Knowledge, Knowledge Pack, Rule outcome, Capability, analytics, settings, goal, country, stage, subscription, and other source references and versions used. |
| Business analysis | Interpreted needs, conditions, gaps, assumptions, and conflicts. |
| Capability reasoning | Candidate Capability references, dependency reasoning, applicability, and rationale. |
| Health insight | Health reasoning, evidence, confidence, assumptions, and uncertainty where applicable. |
| Growth insight | Growth reasoning, evidence, confidence, assumptions, and uncertainty where applicable. |
| Risk insight | Risk reasoning, evidence, severity candidate, confidence, assumptions, and uncertainty where applicable. |
| Explanation | Why the Decision exists, problem addressed, evidence, benefits, risks, alternatives, conflicts, and consequence of inaction where applicable. |
| Candidate output references | Recommendation candidate and configuration input references produced from the Decision. |
| History | Prior Decision reference when this Decision supersedes earlier reasoning for the same approved purpose and scope. |
| Governance context | Contract versions, actor or service context, correlation, causation, policy result, and Audit correlation. |

Exact field names, schemas, storage, and required/optional rules remain deferred.

### 9.3 Decision invariants

1. A Decision has exactly one Workspace scope.
2. A Business-scoped Decision has exactly one Business.
3. A Workspace-aggregation Decision explicitly lists every included Business and source Business DNA version.
4. Aggregation never creates or updates Business DNA.
5. Every canonical source in the reasoning is identifiable by owner, identifier, and version where versioned.
6. A Decision records derived reasoning separately from source facts.
7. A completed Decision is immutable.
8. Reanalysis creates a new Decision and may link it as superseding an earlier Decision.
9. A newer Decision does not erase historical explanation or input versions.
10. Failed or cancelled evaluation does not create a completed Decision; operational failure handling remains separate and deferred.
11. A Decision may contain no Product, Plan, or Marketplace recommendation without a prior business improvement and Capability reason.
12. A Decision has no customer disposition or target execution authority.
13. AI-assisted material is distinguishable from deterministic Rule outcomes and validated before inclusion.
14. Missing required context, unresolved Permission, or invalid ancestry prevents Decision completion.
15. Decision publication and material administrative access are auditable.

### 9.4 Decision history and reanalysis

The Proposal recommends append-preserving history:

- a completed Decision remains unchanged;
- new source versions do not silently invalidate or mutate history;
- reanalysis uses a new input manifest and creates a new Decision;
- a new Decision may reference the prior Decision it supersedes for the same purpose and scope;
- consumers choose current or historical Decisions through approved read rules, not by overwriting records; and
- exact freshness, automatic reanalysis, retention, and current-Decision selection policies remain deferred.

### 9.5 Decision versus downstream artifacts

| Artifact | Owner | Relationship to Decision |
|---|---|---|
| Recommendation candidate | Business Brain until downstream acceptance | Derived from one completed Decision. |
| Recommendation | Recommendation Engine | May reference one or more source Decisions or candidates; owns its lifecycle. |
| Implementation Option | Core intelligence mapping | Maps a Recommendation's business improvement and Capability to OS, Plan, or Marketplace Asset. |
| Configuration input | Business Brain | Derived context with no proposal or application authority. |
| Configuration Proposal | Configuration Engine | References accepted Recommendation and applicable Decision/configuration input. |
| Product Hub projection | Product Hub | Displays authorized Decision and downstream state without ownership transfer. |
| AI response or Action Proposal | AI Coordinator | May cite Decision; remains governed AI state. |
| OS action | Owning OS | Independently authorized and validated; never executed by Decision. |

## 10. Capability Collaboration

### 10.1 Collaboration model

The eleven approved Discovery candidate capabilities map to the proposed components as follows:

| Candidate capability | Proposed logical owner |
|---|---|
| Business Understanding | Business Analyzer |
| Business Analysis | Business Analyzer |
| Capability Selection | Capability Selector |
| Health Analysis | Health Analyzer |
| Growth Guidance | Growth Advisor |
| Risk Analysis | Risk Analyzer |
| Decision Support | Decision Orchestrator |
| Decision Explainability | Decision Orchestrator |
| Recommendation Candidate Formation | Recommendation Candidate Builder |
| Configuration Input Formation | Configuration Input Builder |
| Learning Interpretation | Learning Interpreter |

### 10.2 Collaboration rules

- Business Analyzer establishes the shared analysis contribution used by specialist reasoning.
- Specialist analyzers may identify conflicts but cannot resolve policy outside Rules ownership.
- Capability Selector reasons over canonical definitions and does not map software.
- Decision Orchestrator validates contribution scope and source references before Decision completion.
- Decision Orchestrator composes explanation; contributors remain responsible for supplying evidence and uncertainty.
- Candidate builders operate only from a completed Decision.
- Learning Interpreter supplies future context only after approved policy; it cannot influence a Decision already completed.
- Optional AI assistance is requested through AI Coordinator and returns as explicitly identified advisory evidence.

### 10.3 Graceful partial analysis

The logical architecture permits a Decision to omit a non-required specialist insight when the Proposal-approved purpose does not require it. It does not permit silent loss of a required contribution.

Exact required capabilities by purpose, partial-result policy, retry, failure, and customer messaging remain deferred.

## 11. External Integrations

### 11.1 Core Platform

Business Brain uses Core identity, scope, Permission, organization, settings, localization, commercial, Audit, API, Event, Security, Observability, Analytics Intake, and deployment foundations. It does not duplicate them.

### 11.2 Business DNA Registry

Business Brain consumes exact published Business DNA references. It never publishes or corrects DNA. Business Architect's Analysis Trigger may request Business Brain analysis after DNA publication through a future approved contract.

### 11.3 Knowledge Engine and Rules Engine

Business Brain consumes applicable published Knowledge references and deterministic Rule outcomes. It never embeds duplicate business knowledge or changes official Rules.

### 11.4 Capability Registry

Business Brain consumes canonical Capability identity, metadata, dependencies, applicability, and lifecycle. It never creates competing Capability definitions.

### 11.5 Recommendation Engine

Business Brain sends recommendation candidates. Recommendation Engine decides whether and how to create, prioritize, explain, and lifecycle a Recommendation. Disposition may return as approved feedback.

### 11.6 Configuration Engine

Business Brain supplies configuration input. Configuration Engine creates Configuration Proposals only from approved downstream context. The target owner validates and applies its configuration.

### 11.7 Product Hub

Product Hub consumes authorized Decision, insight, and Recommendation projections. It owns customer presentation, lifecycle composition, selection, and handoff.

### 11.8 Marketplace

Marketplace supplies approved asset metadata and applicability only for downstream Implementation Option mapping. Business Brain never owns shared Assets or scoped Marketplace state.

### 11.9 Operating Systems

Business Brain may consume approved Integration Events or Analytics Intake projections from an OS and may expose approved Decision or Recommendation information. No direct database access, mandatory cross-OS dependency, or target execution is permitted.

### 11.10 AI Coordinator

Business Brain may request bounded assistance or explanation support. AI Coordinator authorizes context, routes Experts, validates evidence, and owns AI Interaction and AI Action Proposal. Business Brain determines whether validated advisory material is eligible for inclusion in its Decision under approved policy.

## 12. Data Ownership

| Information or state | Canonical owner | Business Brain rights | Business Brain prohibition |
|---|---|---|---|
| Workspace, Business, organization identity | Applicable Core registry | Resolve authorized references | No identity mutation |
| Business DNA and Provenance | Business DNA Registry | Read exact published version | No copy as competing truth; no correction |
| Workspace Intelligence Aggregation | Core intelligence projection over Business DNA | Read explicit authorized aggregation | No merged Workspace DNA |
| Capability | Capability Registry | Read and reference | No definition or lifecycle mutation |
| Knowledge and Knowledge Pack | Knowledge Engine | Read applicable published versions | No duplication or publication |
| Rule and Rule outcome | Rules domain | Request/consume deterministic outcome | No Rule mutation or AI override |
| Analytics projection | Analytics Intake and source owner | Consume purpose-bound permitted view | No operational source ownership |
| Subscription and Plan state | Core commercial control | Consume approved context | No commercial mutation |
| Business Brain Decision | Business Brain | Create and preserve completed history | No rewrite after completion |
| Recommendation candidate | Business Brain until accepted by downstream contract | Create from completed Decision | No Recommendation lifecycle |
| Recommendation | Recommendation Engine | Read authorized reference and disposition | No write |
| Implementation Option | Core intelligence mapping | Supply Capability and business reason | No Product/Plan/Asset ownership |
| Configuration input | Business Brain | Create from completed Decision | No target application |
| Configuration Proposal | Configuration Engine | Supply reference input; observe authorized status | No write or application |
| Product Hub projection | Product Hub | Supply source information | No projection ownership |
| Marketplace Asset and scoped state | Marketplace | Read approved reference | No write |
| AI Interaction and Action Proposal | AI Coordinator | Request and consume authorized result | No AI ownership or execution |
| OS operational record | Owning OS | Consume approved projection | No direct read/write of database |
| Audit Record | Audit Service | Supply audit context | No mutable audit history |

## 13. Read Models

Read models are disposable, permission-filtered views. They never become sources of truth or write paths.

### 13.1 Business Brain Decision view

Shows an authorized completed Decision, its scope, input versions, reasoning, Capability references, insights, explanation, candidates, and history.

Owner remains Business Brain Decision write model. Exact view structure is deferred.

### 13.2 Current Decision view

Resolves the current permitted Decision for one Business or explicit aggregation purpose while retaining historical Decision access. “Current” selection policy remains deferred and cannot mutate history.

### 13.3 Workspace Intelligence Aggregation view

Combines permitted Decision summaries across Businesses only when explicit aggregation is requested and authorized. It preserves each Business and Decision identity.

### 13.4 Business Health and Growth View

Product Hub owns this presentation projection using permitted health, growth, risk, maturity, and coverage information. Business Brain supplies source Decision information but does not own Product Hub presentation.

### 13.5 Recommendation Feed relationship

Recommendation Feed is owned by Product Hub and uses Recommendation Engine output. A Business Brain recommendation candidate cannot appear as an accepted Recommendation merely through projection.

### 13.6 Search, analytics, Audit, and observability views

Authorized projections may support search, analytics, governance, Audit correlation, diagnostics, and capacity evidence. They are minimized, rebuildable where appropriate, and never grant current Permission or canonical ownership.

## 14. Write Models

### 14.1 Business Brain Decision write model

The only new canonical Business Brain write model proposed for this milestone is the Business Brain Decision aggregate.

It validates:

- one Workspace and correct Business or aggregation scope;
- current authorization at the protected operation boundary;
- source identifiers and required versions;
- required analysis contributions for the stated purpose;
- distinction between source facts and derived reasoning;
- candidate Capability references;
- evidence and explanation completeness;
- no product-first or target-execution content;
- no duplicate completed Decision for the same idempotent request; and
- append-preserving completion and supersession rules.

### 14.2 Candidate outputs

Recommendation candidate and configuration input are proposed as Decision-owned outputs or Decision-linked boundary values, not independent competing domain aggregates.

Whether they require separate physical records for delivery, retry, or acknowledgement is an implementation and contract decision deferred to later review. Such records would not acquire Recommendation or Configuration Proposal ownership.

### 14.3 Evaluation and operation state

Requested, evaluating, failed, cancelled, retry, timeout, and recovery state may require an operational model, especially if analysis is long-running. This Proposal does not approve that write model. It remains deferred and cannot be confused with a completed Business Brain Decision.

### 14.4 Learning state

Learning Interpreter does not receive a new canonical learning write model in this Proposal. Approved feedback remains owned by its source. Any future persisted learning contribution requires policy, ownership, retention, consent, and ADR review.

## 15. Contracts

Contracts are logical, technology-independent, versioned, and owner-governed. This Proposal defines responsibilities, not endpoints or schemas.

### 15.1 Inbound contract responsibilities

| Contract responsibility | Owning provider | Business Brain use |
|---|---|---|
| Verified actor/service and Authorization Context | Core Identity and Access and owning policy | Establish permitted Workspace, Business, aggregation, purpose, and action. |
| Published Business DNA reference | Business DNA Registry | Resolve exact Business DNA Snapshot and Provenance references. |
| Explicit Workspace aggregation | Core intelligence projection | Resolve included Businesses and exact source versions. |
| Capability reference and applicability | Capability Registry | Resolve canonical Capability meaning and dependencies. |
| Knowledge applicability | Knowledge Engine | Resolve applicable immutable published Knowledge versions. |
| Deterministic Rule evaluation | Rules domain | Receive Rule outcomes and evidence. |
| Analytics Intake | Analytics Intake and source owners | Receive purpose-bound authorized projections with freshness. |
| Settings and commercial context | Applicable Core owner | Receive locale, country, stage, settings, subscription, or Plan context where approved. |
| Approved feedback | Recommendation Engine or applicable source owner | Receive disposition, outcomes, adoption, usage, or feedback under policy. |
| AI assistance result | AI Coordinator | Receive validated, bounded advisory evidence with Expert/provider versions and policy outcome. |

### 15.2 Business Brain contract responsibilities

| Contract responsibility | Approved consumer | Meaning |
|---|---|---|
| Request analysis | Business Architect Analysis Trigger and other future approved Core consumers | Ask Business Brain to evaluate an authorized scope and purpose; exact command remains deferred. |
| Read Decision | First-party Core, Product Hub, AI Coordinator, approved OS consumers | Return permission-filtered Decision or projection. |
| Submit recommendation candidate | Recommendation Engine | Transfer candidate content and source Decision reference without transferring Business Brain Decision ownership. |
| Supply configuration input | Configuration Engine | Supply Decision-linked input without creating a Configuration Proposal. |
| Supply Product Hub projection input | Product Hub | Provide authorized Decision and insight summaries. |
| Supply AI context | AI Coordinator | Provide minimum authorized Decision references and evidence. |
| Observe downstream disposition | Business Brain/Learning Interpreter | Receive approved Recommendation disposition or target outcome for future analysis only. |

### 15.3 Contract invariants

- every tenant-scoped contract includes or resolves Workspace;
- Business is required for Business-scoped analysis;
- aggregation is explicit and authorization-checked;
- source identifiers and contract versions remain explicit;
- mutation contracts use idempotency where retry is possible;
- owning domains reauthorize their writes;
- errors do not expose unauthorized data or implementation detail;
- contracts do not expose database or framework models;
- compatible additive evolution is preferred; and
- protocol, schema, paths, version syntax, and tooling remain deferred.

## 16. Event Responsibilities

### 16.1 Events Business Brain may consume

Business Brain may consume approved Integration Events representing committed facts from canonical owners, including categories such as:

- Business DNA publication;
- Knowledge, Knowledge Pack, Rule, or Capability publication/deprecation;
- approved analytics availability;
- Recommendation disposition;
- approved Business outcome or adoption signal;
- relevant commercial-context change; and
- approved OS operational fact.

Consumption does not require automatic reanalysis. Trigger policy remains deferred.

### 16.2 Events Business Brain owns

Business Brain owns Domain Events arising from committed changes to its Decision aggregate. It may publish minimal Integration Events that communicate:

- a completed Business Brain Decision is available;
- a new Decision supersedes an earlier Decision;
- an approved recommendation candidate is available to Recommendation Engine; or
- Business Brain evaluation failed operationally when a consumer needs a governed recovery fact.

Exact Event names, payloads, catalogs, and the distinction between Domain and Integration exposure require Event contract review.

### 16.3 Events Business Brain does not own

- Business DNA Events;
- Knowledge, Rule, or Capability Events;
- Recommendation or disposition Events;
- Configuration Proposal or target-application Events;
- Product Hub lifecycle Events;
- Marketplace Events;
- AI Events;
- OS operational Events;
- Notification lifecycle Events; or
- Audit Records.

### 16.4 Event invariants

- Events communicate committed facts, not analysis commands, Recommendations, Configuration Proposals, or AI Action Proposals.
- The canonical state-changing owner owns the fact.
- No global ordering is assumed.
- duplicate delivery is tolerated through idempotent consumers.
- replay never repeats consequential downstream action blindly.
- Workspace and applicable Business scope are explicit.
- payloads are minimized and contain no secrets.
- Event transport owns no Business fact.
- infrastructure, retention, ordering mechanism, retry, dead-letter, and replay tooling remain deferred.

## 17. Security Considerations

### 17.1 Authentication and Authorization

- Authentication establishes identity but never grants Business Brain resource access by itself.
- Every protected operation resolves actor or service identity, Workspace, Business or explicit aggregation scope, purpose, requested action, and resource.
- Client-provided context is verified against canonical Core registries.
- Business Brain performs final authorization for its Decision resources under shared Core policy.
- Downstream owners independently authorize their own resources and writes.

### 17.2 Business and Workspace isolation

- analysis is Business-scoped by default;
- aggregation requires explicit Permission and records included Businesses;
- no query, cache, Event, AI context, trace, or projection may mix Workspaces;
- one Business's Decision is not exposed through another Business context; and
- missing or unresolved scope fails closed.

### 17.3 Data protection

- consume minimum necessary fields for the approved purpose;
- preserve source references without copying unnecessary payloads;
- exclude secrets, credentials, tokens, and unnecessary personal or operational data from Decisions, Events, logs, and AI context;
- apply future classification, retention, deletion, residency, encryption, and key policies;
- restrict historical Decision access according to current Permission and future policy; and
- audit sensitive access and administration.

### 17.4 Integrity and human control

- deterministic Rule outcomes cannot be overwritten by AI or a projection;
- confidence and conflict cannot be silently upgraded;
- a Decision cannot authorize its own downstream action;
- recommendation candidates remain optional downstream inputs;
- Configuration Engine and target owners validate configuration separately; and
- critical administration, replay, correction, or recovery is auditable.

### 17.5 Observability security

Monitoring may record safe identifiers, scope classification, component, duration, outcome, source-version categories, confidence category, policy result, and correlation. Raw Business DNA, Knowledge content, operational payloads, prompts, responses, secrets, and unauthorized values are not logged by default.

Specific Permissions, retention, encryption, tokens, service identity, incident policy, and monitoring technology remain deferred.

## 18. AI Boundaries

### 18.1 AI is optional assistance

Business Brain must remain capable of deterministic, Rule-governed analysis without requiring AI for authoritative Rule outcomes, Capability identity, Permission, or source ownership.

AI may assist with bounded interpretation, hypothesis generation, explanation alternatives, or narrative synthesis only through AI Coordinator and approved policy.

### 18.2 AI request path

```text
Authorized Business Brain purpose and context
  → Core Authorization Context
  → AI Coordinator Context Builder and Policy Filter
  → approved AI Expert and bounded tools
  → AI Coordinator validation, evidence, confidence, and explanation
  → advisory result returned to Business Brain
  → Business Brain validates eligibility for Decision inclusion
```

This flow does not make AI Coordinator internal to Business Brain.

### 18.3 AI prohibitions

AI cannot:

- create or modify Business DNA;
- publish Knowledge, Knowledge Packs, Capabilities, or Rules;
- issue an official Rule outcome;
- grant Permission or broaden analysis scope;
- create a completed Business Brain Decision without Business Brain validation;
- create or accept a Recommendation on behalf of the customer;
- create or apply a Configuration Proposal directly;
- mutate Product Hub, Marketplace, commercial, or OS state;
- hide provider, Expert, evidence, uncertainty, or conflict where material; or
- learn from tenant data outside approved consent, minimization, retention, and residency policy.

### 18.4 AI-assisted Decision traceability

When AI-assisted material is included, the Decision must be able to retain, under future approved schemas and retention policy:

- AI Coordinator interaction reference;
- Expert and provider version references;
- bounded context source categories;
- evidence references;
- policy and validation outcome;
- confidence and assumptions; and
- distinction from deterministic Rule outcomes.

Provider eligibility, model selection, retention, residency, safety, evaluation, cost, capacity, SLO, and degradation remain deferred.

## 19. Risks

| # | Risk | Consequence | Proposed mitigation |
|---:|---|---|---|
| 1 | Business Brain becomes a second Business DNA source | Business identity and facts diverge. | Reference exact published DNA; prohibit DNA writes. |
| 2 | Knowledge or Rules are duplicated in Decision logic | Reasoning becomes inconsistent and irreproducible. | Consume canonical versions and deterministic outcomes. |
| 3 | Product-first reasoning enters analysis | Platform guidance becomes sales-driven. | Enforce business improvement and Capability before mapping. |
| 4 | Recommendation Candidate Builder duplicates Recommendation Engine | Lifecycle and disposition ownership split. | Candidate ends at explicit downstream contract; Recommendation Engine remains owner. |
| 5 | Configuration Input Builder becomes Configuration Engine | Target state could change without review. | Configuration input has no Proposal or application authority. |
| 6 | Insight meanings remain vague | Health, growth, and risk become arbitrary or contradictory. | Require Proposal/Wave definitions before implementation; preserve evidence and uncertainty. |
| 7 | Mixed or stale input versions | Decisions cannot be reproduced or trusted. | Pin exact input manifest; create new Decision on reanalysis. |
| 8 | Workspace aggregation merges Businesses | Business-scoped DNA and accountability are lost. | Explicit aggregation with constituent Business/version references. |
| 9 | AI becomes hidden decision authority | Generated output may bypass Rules or human control. | Route through AI Coordinator; distinguish and validate advisory material. |
| 10 | Analytics projections become truth | Incomplete or delayed signals override source owners. | Treat analytics as purpose-bound input with freshness and provenance. |
| 11 | Event-triggered duplicate Decisions | Duplicate recommendations or side effects occur. | Require idempotency; defer exact trigger and operation design. |
| 12 | Circular dependencies with downstream owners | Modular boundaries and independent evolution fail. | One-way candidate contracts and owner-controlled feedback. |
| 13 | Cross-tenant or cross-Business leakage | Sensitive information is exposed. | Explicit scope, least privilege, minimization, and fail-closed behavior. |
| 14 | Immutable history increases retention burden | Cost, privacy, and compliance risks grow. | Define retention, classification, deletion, and legal policy before production. |
| 15 | Premature physical decomposition | Technology choices harden the wrong boundary. | Keep logical modular-monolith design; defer physical packaging. |

## 20. Deferred Decisions

The following 24 decisions remain intentionally deferred. They are not resolved by implication.

### Decision structure and operation

1. Exact Business Brain Decision fields, required/optional rules, and schema.
2. Exact operational evaluation model for requested, evaluating, failed, cancelled, retry, timeout, and recovery behavior.
3. Whether analysis is synchronous, long-running, or contract-dependent.
4. Current-Decision selection, freshness, supersession visibility, and historical comparison policy.

### Input sufficiency and applicability

5. Minimum Core Business DNA required for each analysis purpose.
6. Behavior when Business DNA or another input changes during evaluation.
7. Knowledge and Knowledge Pack applicability and version-selection mechanism.
8. Rule selection, evaluation request, and historical outcome-access mechanism.
9. Analytics completeness, freshness, purpose, consent, and missing-data policy.
10. Exact influence of subscription and Plan context on reasoning versus downstream eligibility.

### Insight and candidate semantics

11. Canonical health definition, measures, confidence, and comparison horizon.
12. Canonical growth definition, horizon, and relationship to goals and Recommendations.
13. Canonical risk taxonomy, severity, confidence, and relationship to Rules and incidents.
14. Confidence, scoring, conflict, uncertainty, and partial-result models.
15. Recommendation candidate identity, deduplication, prioritization handoff, and acknowledgement.
16. Configuration input structure and which Configuration Proposals require automatic versus customer review policy.

### Learning and AI

17. Approved feedback, outcome, adoption, and learning policy, including consent and Knowledge promotion.
18. AI assistance eligibility, provider/model policy, residency, retention, evaluation, safety, cost, capacity, fallback, and degradation.

### Contracts, Security, and operations

19. API resource catalog, commands, queries, protocol, schema, version syntax, error, idempotency, and compatibility detail.
20. Event catalog, trigger policy, schema, infrastructure, delivery, ordering, retry, replay, dead-letter, and retention detail.
21. Business Brain Permission catalog, service identity, delegation, administrative, and emergency-access policy.
22. Data classification, retention, deletion, privacy, residency, encryption, key, export, and legal-hold policy.
23. Observability schemas, redaction, sampling, dashboards, alerts, SLOs, SLAs, error budgets, capacity, incidents, and recovery.
24. Physical module/package layout, database, cache, queue, search, framework, runtime, deployment, backup, and extraction choices.

## 21. Draft ADRs

The following twelve draft ADRs are Proposed within this Proposal. Official numbering and acceptance occur only through Governance.

### Draft ADR-BB-001 — Business Brain uses nine logical internal components

**Status:** Proposed

**Decision:** Structure Business Brain around Business Analyzer, Capability Selector, Health Analyzer, Growth Advisor, Risk Analyzer, Decision Orchestrator, Recommendation Candidate Builder, Configuration Input Builder, and Learning Interpreter. Recommendation Engine, Configuration Engine, Product Hub, and AI Coordinator remain external owners.

**Consequence:** Candidate capabilities have one proposed logical owner without forcing physical services or packages.

### Draft ADR-BB-002 — Business analysis is Business-scoped by default

**Status:** Proposed

**Decision:** Every Decision evaluates one Business by default. Workspace analysis requires explicit authorized Workspace Intelligence Aggregation and retains every constituent Business and source version.

**Consequence:** Workspace insight cannot become merged Business DNA.

### Draft ADR-BB-003 — Completed Business Brain Decisions are immutable and version-pinned

**Status:** Proposed

**Decision:** A completed Decision records exact source references and versions and is never updated in place.

**Consequence:** Historical reasoning remains explainable and reproducible subject to retention policy.

### Draft ADR-BB-004 — Reanalysis creates a new Decision

**Status:** Proposed

**Decision:** A new evaluation creates a new completed Decision and may reference the prior Decision it supersedes; source changes never silently rewrite history.

**Consequence:** Consumers require a governed current-versus-historical selection policy.

### Draft ADR-BB-005 — Specialist insights are sections of the Business Brain Decision

**Status:** Proposed

**Decision:** Health, growth, risk, Capability, analysis, and explanation contributions are owned within the Business Brain Decision rather than becoming independent canonical aggregates in this milestone.

**Consequence:** Insight read models remain projections; exact future extraction would require review.

### Draft ADR-BB-006 — Recommendation candidates remain separate from Recommendations

**Status:** Proposed

**Decision:** Business Brain forms Decision-linked recommendation candidates. Recommendation Engine alone creates, prioritizes, lifecycles, and records disposition for Recommendations.

**Consequence:** Candidate delivery cannot bypass Recommendation ownership or customer control.

### Draft ADR-BB-007 — Configuration input has no proposal or execution authority

**Status:** Proposed

**Decision:** Business Brain may form Decision-linked configuration input. Configuration Engine owns Configuration Proposals, and the target owner validates and applies target configuration.

**Consequence:** No Business Brain component mutates platform or OS configuration.

### Draft ADR-BB-008 — Decision Orchestrator owns Business Brain explanation composition

**Status:** Proposed

**Decision:** Each analysis contributor supplies evidence, confidence, assumptions, and conflicts; Decision Orchestrator composes the Business Brain explanation and validates required traceability.

**Consequence:** Explainability is mandatory without creating another source owner or duplicating AI Coordinator's response explanation.

### Draft ADR-BB-009 — AI assistance enters only through AI Coordinator

**Status:** Proposed

**Decision:** Business Brain requests AI assistance only through AI Coordinator. AI output remains advisory, distinguishable, evidence-bound, and ineligible for Decision inclusion until validated under Business Brain policy.

**Consequence:** AI cannot replace deterministic Rules, Business Brain authority, Permission, or target execution.

### Draft ADR-BB-010 — Learning informs future Decisions only

**Status:** Proposed

**Decision:** Learning Interpreter consumes only approved feedback and outcomes and may contribute to future analysis; it never changes historical Decisions or canonical Business DNA, Knowledge, Rules, Capabilities, or operational facts.

**Consequence:** Learning policy and persisted learning state remain separately governed.

### Draft ADR-BB-011 — Business Brain collaboration is contract-based and owner-authorized

**Status:** Proposed

**Decision:** Business Brain consumes and supplies information only through explicit versioned contracts. Each owner authorizes its data and reauthorizes its writes; shared deployment grants no direct table access.

**Consequence:** Physical implementation can evolve without changing domain ownership.

### Draft ADR-BB-012 — Business Brain owns only Decision facts in Events

**Status:** Proposed

**Decision:** Business Brain owns Events about committed Business Brain Decision state and exposes minimal Integration Events where approved. It never republishes another owner's fact as its own.

**Consequence:** Recommendation, Configuration, Marketplace, AI, commercial, and OS Event ownership remains unchanged.

## 22. Success Criteria

The Proposal is successful and ready for approval when Architecture Review confirms:

1. all content conforms to Genesis, Governance, Core Platform v1.0, Documentation Baseline v1.0.1, Discovery, and Capability Map;
2. the nine proposed components cover all eleven candidate capabilities without duplicating another owner;
3. Business Brain Decision has one clear canonical owner, scope, input manifest, history, and invariants;
4. one Business is the default and Workspace aggregation remains explicit and non-merging;
5. Business DNA, Knowledge, Rules, Capabilities, analytics, commercial state, Marketplace, and OS facts remain external sources;
6. Recommendation candidate is separate from Recommendation and Implementation Option;
7. configuration input is separate from Configuration Proposal and target application;
8. Product Hub remains presentation and lifecycle composition, not intelligence write ownership;
9. AI Coordinator remains the only AI orchestration owner and AI cannot become Business truth or executor;
10. every responsibility has exactly one owner;
11. read models remain disposable and Permission-filtered;
12. the Business Brain Decision is the only new canonical write model proposed;
13. contracts remain technology-independent, versioned, scoped, authorized, auditable, and compatible;
14. Event responsibilities preserve source-owner facts and do not invent infrastructure;
15. Security preserves explicit context, tenant isolation, least privilege, data minimization, human control, and Audit;
16. all 15 risks have credible architecture-level mitigations;
17. all 24 deferred decisions remain explicit and are not silently resolved;
18. all 12 draft ADRs are accepted, rejected, consolidated, or mapped to existing ADR authority through Governance;
19. no detailed Business Brain Documentation Wave begins before Proposal approval; and
20. the Architecture Review verdict authorizes Documentation Waves.

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
- `docs/00-governance/ADR/ADR-025-contract-based-optional-os-integration.md`
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

### Approved Discovery and Capability Map

- `docs/03-business-brain/00-BUSINESS-BRAIN-DISCOVERY.md`
- `docs/03-business-brain/01-BUSINESS-BRAIN-CAPABILITY-MAP.md`

### Core Platform and Freeze

- `docs/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md`
- `docs/02-core-platform/00-CORE-PLATFORM-PRINCIPLES.md`
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
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md`
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.0.1-READINESS.md`
