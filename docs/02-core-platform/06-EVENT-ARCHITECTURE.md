# Core Platform Event Architecture

Version: 1.0  
Status: Milestone 1 — Wave 2  
Authority: Genesis v1.1, Governance Foundation, approved Core Platform Architecture Proposal v0.2, and Core Platform Wave 1  
Owner: Nexoraxs

---

## 1. Purpose

This document defines the Core Platform Event Architecture used to announce committed facts, maintain projections, integrate bounded domains, produce Notifications, coordinate Marketplace and AI observations, and support optional cross-OS communication.

Events provide stable, versioned communication without shared domain tables or ownership transfer. Event Architecture is part of the approved contract-first API Architecture and remains independent from a specific queue, broker, database, or deployment technology.

## 2. Scope

This document covers:

- Event philosophy.
- Event ownership.
- Event taxonomy.
- Domain Events.
- Integration Events.
- Notification Events.
- AI Events.
- Marketplace Events.
- Event contracts.
- Contract versioning.
- Ordering.
- Idempotency.
- Replay policy.
- Event security.
- Event boundaries.
- Cross-OS Event communication.
- Relationships with projections, APIs, Audit Service, and canonical data owners.

This document does not select Event infrastructure, delivery guarantee, retention duration, partition strategy, schema technology, naming convention, or complete Event catalog. Those decisions remain deferred.

## 3. Principles

### 3.1 Events announce facts

An Event announces a fact that the owning domain has committed. It does not make a consumer the owner of the source fact and does not prove that a consumer has completed a reaction.

### 3.2 The source owner owns the Event meaning

The domain that owns the fact owns the Domain Event and the source meaning exposed through an Integration Event. A gateway, Event transport, projection, or consumer never becomes the fact owner.

### 3.3 Domain Events and Integration Events are distinct

A Domain Event expresses a committed fact inside its owning domain. An Integration Event is a stable, minimized, versioned fact exposed across a boundary. They may be related, but the internal Domain Event contract is not automatically a public Integration Event contract.

### 3.4 Events never replace owner commands

Consumers request source changes through owner commands or APIs. They do not edit source state by publishing a counterfeit Event.

### 3.5 Delivery is not ownership or authorization

Receiving an Event does not authorize a consumer to read additional source data or modify local data. The consumer verifies source, tenant, contract, and its own authorization before acting.

### 3.6 Duplicates are expected

Consumers must tolerate duplicate asynchronous delivery. Exactly-once delivery is not assumed.

### 3.7 No global ordering

The platform does not promise global order across domains, Workspaces, Businesses, Business Units, resources, or Operating Systems. Any required ordering boundary is declared by the Event contract.

### 3.8 Contracts are versioned and technology-independent

Event meaning, schema, ownership, scope, and compatibility are independent from framework models and Event infrastructure.

### 3.9 Payloads are minimized

Integration Events expose only the stable facts required by approved consumers. Sensitive or mutable detail remains behind an authorized owner query.

### 3.10 Cross-OS communication is optional

No OS requires another OS Event stream for its core workflow. Cross-OS Event communication uses platform-governed Integration Events and preserves each OS's ownership.

## 4. Responsibilities

### 4.1 Event producer

The canonical owner producing an Event must:

- publish only committed facts it owns;
- identify the Event uniquely;
- include contract version, owner, tenant scope, time, and correlation context;
- preserve causation where the fact resulted from another request or Event;
- minimize payload to the approved contract;
- apply publication Authorization and security policy;
- document ordering boundary, replay behavior, retention classification, and compatibility;
- avoid publishing unauthorized or cross-tenant data.

### 4.2 Event contract owner

The source domain owns Event semantics and compatible evolution. API Architecture governs shared contract rules, registration, validation, deprecation, and observability.

### 4.3 Event consumer

A consumer must:

- accept only approved sources and contract versions;
- verify Workspace and applicable Business, Business Unit, Department, Branch, OS, and resource scope;
- apply idempotency before changing local state;
- authorize its local action;
- preserve source identifier, version, correlation, and causation where required;
- tolerate duplicate, delayed, replayed, or out-of-order delivery within the declared contract;
- avoid treating Event payload as permanent authorization;
- expose failures and recovery without editing the source.

### 4.4 API Architecture

API Architecture owns common Event and Webhook contract governance. It does not own the domain facts carried by Events.

### 4.5 Audit Service

Audit Service owns append-only Audit Records for critical actions. An Event may cause or reference an Audit Record, but an Event transport log is not automatically the canonical Audit Record.

### 4.6 Notification Service

Notification Service consumes authorized notification-relevant Events or requests, applies recipient and delivery policy, owns Notification records and delivery state, and may expose its own lifecycle facts.

### 4.7 Marketplace and AI Coordinator

Marketplace owns Marketplace Events derived from Marketplace facts. AI Coordinator owns AI coordination Events derived from AI Interactions and AI Action Proposals. Neither may publish another domain's fact as if it owned it.

## 5. Architecture

### 5.1 Event flow

```text
Command or authorized action
  → canonical owner validates and changes its write model
  → committed fact
  → Domain Event
  → optional stable Integration Event
  → approved consumers
      ├── update local projection
      ├── evaluate a local action
      ├── create Notification through Notification Service
      └── record required Audit and observability
```

The source write completes under the source owner's consistency rules. Cross-domain consumer reactions complete independently and do not retroactively change ownership of the source fact.

### 5.2 Event taxonomy

The primary contract taxonomy is Domain Event and Integration Event. Notification Events, AI Events, and Marketplace Events classify Events by owner or purpose and must still declare whether their contract is domain-internal or cross-boundary.

| Event type | Meaning | Owner | Boundary |
|---|---|---|---|
| Domain Event | A versioned Event announcing a committed fact owned within one domain. | Domain that owns the fact | Owning domain or approved Core Module Contract |
| Integration Event | A stable, minimized, versioned fact exposed beyond the owning domain. | Source domain | Core module, Marketplace, OS, partner, or external boundary according to contract |
| Notification Event | A notification-relevant fact submitted to Notification Service, or a Notification lifecycle fact owned by Notification Service. | Source domain for business fact; Notification Service for Notification lifecycle | Notification boundary |
| AI Event | A fact about AI Interaction, expert coordination, policy, confidence, evidence, or AI Action Proposal. | AI Coordinator | AI boundary; may become an Integration Event only through approved contract |
| Marketplace Event | A fact about Marketplace Asset or scoped Marketplace lifecycle. | Marketplace bounded context | Marketplace boundary; may be exposed as an Integration Event |

An Event can therefore be both a Marketplace Event and an Integration Event. The owner/purpose category does not replace the Domain Event or Integration Event classification.

### 5.3 Domain Events

A Domain Event:

- describes a fact in past-tense business meaning;
- is emitted only after the owning domain commits the fact;
- uses the owning domain's canonical identifiers;
- carries the minimum internal facts required by approved consumers;
- may contain domain details that are not suitable for external exposure;
- may trigger local projections or local workflow reactions;
- is versioned according to domain and API governance;
- cannot be published by a consumer to impersonate the owner.

Examples of Event subjects already approved by architecture include lifecycle changes to Workspace, Business Architect Session, Business DNA Snapshot publication, Recommendation disposition, OS Subscription, installation operation, Marketplace scoped state, Notification delivery, and AI Interaction. This document does not define exact Event names or payloads.

### 5.4 Integration Events

An Integration Event is deliberately designed for a boundary.

It:

- exposes a stable subset of a committed source fact;
- identifies the source owner and contract version;
- includes explicit tenant and applicable organization context;
- omits internal implementation details;
- preserves source references needed for authorized follow-up queries;
- follows compatibility and deprecation policy;
- states ordering and replay expectations;
- permits optional consumers to evolve independently.

An Integration Event is not a serialized source table, framework model, or unrestricted domain object.

### 5.5 Notification Events

Notification Events support the shared Notification Service without moving producer-domain ownership into that service.

Two ownership cases exist:

1. **Notification-relevant source fact:** Core, Marketplace, or an OS owns a fact and exposes an authorized Integration Event suitable for Notification Service.
2. **Notification lifecycle fact:** Notification Service owns creation, audience resolution, preference application, delivery attempt, delivery result, and Notification lifecycle facts.

Rules:

- Notification Service does not recreate the producer's domain decision.
- The source Event identifies Workspace and producer context.
- Notification Service resolves authorized audience and preferences using its own write model.
- A delivery failure does not undo the source fact.
- Notification delivery state is not the source of truth for the producer event.
- Sensitive source detail is queried through authorized contracts rather than copied into every Event.

Exact Notification Event names, channels, retry schedules, and retention remain deferred.

### 5.6 AI Events

AI Events represent AI coordination facts, not new business truth.

Approved subject areas include:

- AI Interaction progression;
- Expert selection and version references;
- Policy and Safety Engine outcome;
- Evidence and Claim validation result;
- confidence and explainability result;
- AI Action Proposal creation or disposition;
- AI provider or tool execution observability;
- approved customer feedback.

Rules:

- AI Events are scoped to the authorized AI Interaction context.
- They cannot modify official Knowledge, Rules, Business DNA, Permissions, subscriptions, financial records, or OS data.
- An AI Action Proposal Event does not authorize execution.
- An owning service treats any proposed action as a new protected command and performs full authorization and validation.
- AI Event payloads minimize conversation and customer data according to future retention and privacy policy.
- AI learning consumes only approved signals and never rewrites Business DNA or official Knowledge directly.

### 5.7 Marketplace Events

Marketplace Events are owned by the Marketplace bounded context and relate to:

- Marketplace Asset review and lifecycle;
- Marketplace Asset Version publication, deprecation, or archive;
- Workspace Purchase;
- Marketplace Installation;
- Marketplace Activation;
- Marketplace Applicability;
- version selection, update, rollback, or scoped removal;
- publisher, compatibility, or dependency state where later approved.

Rules:

- shared Marketplace Asset content and Workspace-scoped state remain separate.
- an Event about scoped state identifies the Workspace and optional Business applicability.
- an update Event references a new immutable Marketplace Asset Version; it never implies mutation of an earlier version.
- removal Events represent scoped removal only and never deletion of the shared asset or historical versions.
- Product Hub consumes Marketplace projections but does not own or publish Marketplace Events as source.

### 5.8 Event contracts

Every Event contract defines:

| Contract field or rule | Requirement |
|---|---|
| Unique Event identifier | Identifies one logical Event for idempotency and traceability. |
| Event type | Uses the approved canonical Event classification and source-domain meaning. |
| Contract version | Identifies the schema and semantic version accepted by consumers. |
| Source owner | Identifies the canonical domain that owns the fact. |
| Occurred time | Records when the source fact became committed according to source semantics. |
| Published time | Records when the Event was made available when distinct from occurred time. |
| Workspace | Required for tenant-scoped Events. |
| Business | Included when the fact is Business-scoped. |
| Business Unit, Department, Branch | Included or resolvable when applicable to the fact. |
| Operating System | Included when the fact or boundary is OS-specific. |
| Subject identifier | References the canonical source record or aggregate subject. |
| Subject version | Included where ordering, concurrency, or historical meaning requires it. |
| Correlation identifier | Connects related work across requests, operations, and Events. |
| Causation identifier | Identifies the command, request, or Event that caused this Event where applicable. |
| Payload | Contains only stable approved facts required by the contract. |
| Ordering boundary | States the subject or stream within which order may matter, if any. |
| Replay classification | States whether and how the Event may be replayed. |
| Retention classification | References the future approved retention policy. |
| Security classification | Identifies handling and access requirements without placing secrets in the payload. |

The physical envelope, schema format, registry, and naming convention remain deferred.

### 5.9 Event versioning

Event contracts evolve independently from source persistence and framework models.

Versioning rules:

1. Compatible additive evolution is preferred.
2. A change that alters meaning, removes required data, changes scope, or breaks consumers requires a new contract version.
3. Producers publish only approved versions.
4. Consumers declare and monitor supported versions.
5. Deprecation uses a published compatibility window established by future policy.
6. Replay uses the original Event contract version unless an explicitly approved transformation is provided.
7. Historical Event meaning is never silently rewritten.
8. A new source record version does not automatically require a new Event contract version; data version and contract version remain distinct.

Exact version-number format and deprecation duration remain deferred.

### 5.10 Ordering

The platform guarantees no global ordering.

Consumers follow these rules:

- never infer order across different Workspaces or source domains;
- never infer order across different subjects unless the contract declares a shared ordering boundary;
- use source subject version or sequence information when the approved contract supplies it;
- handle late or out-of-order Events without overwriting newer local projection state;
- query the canonical owner when order cannot be resolved safely;
- do not use published time alone as canonical business order;
- treat cross-OS ordering as independent unless a specific integration contract later defines a boundary.

The infrastructure mechanism used to preserve an ordering boundary remains deferred.

### 5.11 Idempotency

Every Event consumer is idempotent for one logical Event.

Idempotency rules:

- use the unique Event identifier to recognize duplicate delivery;
- preserve consumer outcome or processing status sufficiently to avoid duplicate local mutation;
- make repeated projection updates converge on the same source version;
- do not issue duplicate external side effects without an additional approved side-effect guard;
- distinguish a genuinely new Event from a replayed delivery of the same Event;
- retain idempotency information for the period required by the future replay and retention policy;
- record failed processing so retry does not masquerade as success.

Idempotent consumption does not permit a consumer to skip authorization or contract validation.

### 5.12 Replay policy

Replay restores an approved consumer or projection from preserved Events. It does not change the historical source fact.

Replay rules:

1. Replay is authorized for a specific consumer, Workspace or scope, Event type, version range, and time or subject range.
2. Replayed delivery preserves the original Event identifier, source, occurred time, contract version, correlation, and causation.
3. Replay delivery is distinguishable operationally without changing the Event's business meaning.
4. Consumers apply the same tenant, contract, security, idempotency, and ordering checks.
5. External side effects, Notifications, billing actions, AI Action Proposals, and other consequential reactions require explicit replay-safe handling and are not blindly repeated.
6. Rebuilding a projection never writes back into the source owner.
7. Unsupported historical versions cause an explicit failure or approved transformation, never silent reinterpretation.
8. Replay access and execution are auditable.

Which Events are retained, for how long, in what storage, and with what transformation support remains deferred.

### 5.13 Event security

Event security applies at publication, transport, consumption, replay, and follow-up query.

Security rules:

- authenticate or otherwise verify the producer identity through approved platform mechanisms;
- authorize the producer to publish the Event type for the declared owner and scope;
- reject a producer claiming facts owned by another domain;
- validate Workspace and organization ancestry where applicable;
- minimize payload and exclude credentials, secrets, and unnecessary personal or operational detail;
- protect Event data according to its security classification in transit and storage using later approved controls;
- authorize each consumer subscription or delivery scope;
- validate contract version and payload before processing;
- prevent cross-Workspace delivery and projection leakage;
- treat Webhooks as signed, retryable, observable external delivery and apply endpoint authorization policy;
- audit critical Event publication, replay, administrative access, and security failure;
- preserve AI and Marketplace permission boundaries;
- never treat Event possession as Permission to query additional data.

### 5.14 Event boundaries

#### Core module boundary

Core Module Contracts may use Domain Events inside the modular monolith. Co-deployment does not permit modules to subscribe to private data without an approved contract.

#### Core-to-OS boundary

Core exposes stable Integration Events for approved shared facts such as organization, entitlement, installation, readiness coordination, Notification, or Audit context. The exact catalog is deferred.

#### OS-to-Core boundary

An OS exposes stable Integration Events for approved lifecycle and operational facts required by Core services. Core does not consume OS internal Domain Events as unrestricted domain objects.

#### Marketplace boundary

Marketplace publishes Marketplace-owned Integration Events. Product Hub, Business Brain, OSs, and AI consume only approved contracts and remain non-owners.

#### External boundary

Event and Webhook API delivers only approved Integration Events. Internal Domain Events are not exposed automatically.

#### AI boundary

AI Coordinator publishes AI-owned facts and consumes only authorized, minimized context. AI cannot use Event access to bypass AI Tool API or resource authorization.

### 5.15 Cross-OS Event communication

```text
Source OS commits its fact
  → Source OS Domain Event
  → approved, minimized Integration Event
  → platform-governed Event boundary
  → authorized consuming OS
  → consumer idempotency and Authorization
  → consumer-owned projection or local action
```

Cross-OS rules:

1. Integration is optional.
2. The source OS remains source of truth.
3. The consumer owns only its local projection or reaction.
4. No consumer writes into the source OS database.
5. No OS requires another OS Event to complete its core workflow.
6. Shared Workspace, Business, Business Unit, Branch, User, or resource identifiers are correlation context, not ownership transfer.
7. The consumer verifies that the source Workspace and organization context matches its authorized integration context.
8. Pause, archive, removal, or failure of one OS is handled without corrupting another OS.
9. Missing, duplicate, delayed, replayed, and out-of-order Events follow the approved contract behavior.
10. Cross-OS conflicts are resolved by canonical owners or explicit integration workflow, never by overwriting a source projection.

### 5.16 Event-driven projections

Product Hub Projection, search, analytics, Workspace Intelligence Aggregation, Marketplace views, and OS integration views may be maintained from Integration Events.

A projection:

- records source owner, identifier, version, and update context;
- can be rebuilt through owner queries or approved replay;
- applies tenant and Permission checks when read;
- never becomes proof of current Authorization or source mutation;
- represents lag, failure, deprecation, archive, and removal explicitly;
- does not publish source-domain facts under the projection owner's identity.

### 5.17 Failure handling and observability

Event processing exposes:

- publication success or failure;
- delivery attempt and result where supported;
- consumer processing success, retry, rejection, or terminal failure;
- contract validation failure;
- authorization or tenant-scope rejection;
- idempotency outcome;
- projection freshness or rebuild state;
- correlation and causation across boundaries.

Failure remains visible. A consumer never edits canonical source data to hide divergence. Exact retry schedules, dead-letter handling, alert thresholds, and service-level objectives remain deferred.

## 6. Ownership

| Event family | Fact owner | Contract governance | Typical consumers |
|---|---|---|---|
| Identity and Workspace Events | Core Identity and Access or Workspace Management | API Architecture plus source domain | Core modules, Marketplace, approved OSs |
| Business and organization Events | Business Registry or Organization Registry | API Architecture plus source domain | Business Architect, Product Hub, approved OSs |
| Business DNA Events | Business DNA Registry | API Architecture plus source domain | Business Brain, Recommendation Engine, approved OS setup, AI Coordinator |
| Knowledge, Rule, Capability Events | Corresponding Core registry or engine | API Architecture plus source domain | Business Brain, AI, Product Hub, approved OSs |
| Recommendation and Configuration Events | Recommendation Engine or Configuration Engine | API Architecture plus source domain | Product Hub, Business Architect, owning target |
| Commercial and installation Events | Commercial control or Installation and Activation Coordinator | API Architecture plus source domain | Product Hub, selected OS, navigation |
| OS lifecycle and operational Events | Selected OS | API Architecture plus source OS | Core readiness and authorized optional integrations |
| Marketplace Events | Marketplace bounded context | API Architecture plus Marketplace | Product Hub, Business Brain, AI, authorized OSs |
| Notification Events | Producer for source fact; Notification Service for Notification lifecycle | API Architecture plus applicable owner | Notification Service, users, authorized observability |
| AI Events | AI Coordinator | API Architecture plus AI Coordinator | Authorized AI observability, Audit Service, owning action service |
| Audit-related Events | Source domain for action; Audit Service owns Audit Record | Shared Audit contract | Audit Service and authorized governance surfaces |

The Event transport and API Gateway own no business fact carried in an Event.

## 7. Relationships

### 7.1 Data ownership

Event Architecture depends on the canonical owners in [Data Ownership](04-DATA-OWNERSHIP.md). An Event references source truth; it does not replace it.

### 7.2 Permissions

Publication, consumption, replay, and follow-up queries follow [Permission Model](05-PERMISSION-MODEL.md). An Event is never a bearer of permanent authority.

### 7.3 API Architecture

Event and Webhook API is one API surface. API Architecture supplies shared versioning, context, security, idempotency, error, and observability governance.

### 7.4 Product Hub

Product Hub may consume Integration Events to build Product Lifecycle Projection and Product Hub Projection. It does not publish source facts for domains it does not own.

### 7.5 Audit and Notifications

Audit Service and Notification Service own their records. Event transport telemetry is operational evidence, not a substitute for either canonical record.

## 8. Future Extension Points

Future approved documentation may define:

- Event naming and schema conventions;
- Event registry and contract review workflow;
- infrastructure and deployment topology;
- publication consistency mechanism;
- exact delivery guarantees;
- retry, backoff, dead-letter, and recovery procedures;
- retention periods and storage classifications;
- ordering and partition mechanisms;
- consumer checkpoint and idempotency storage;
- replay authorization, tooling, transformations, and side-effect controls;
- Webhook registration, signing, secret rotation, and delivery policy;
- complete Core, Marketplace, AI, and OS Event catalogs;
- Notification channel and delivery Events;
- cross-region, residency, privacy, and legal-hold controls;
- monitoring, tracing, alerting, and service-level objectives;
- integration certification and compatibility tests.

No extension may expose private Domain Events automatically, promise global ordering, assume exactly-once delivery, weaken tenant isolation, permit direct cross-OS database access, or make an Event consumer the owner of the source fact.

## 9. References to Genesis

- [Constitution](../01-genesis/02-CONSTITUTION.md)
- [Knowledge Engine](../01-genesis/05-KNOWLEDGE-ENGINE.md)
- [Business Brain](../01-genesis/06-BUSINESS-BRAIN.md)
- [AI Strategy](../01-genesis/08-AI-STRATEGY.md)
- [Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md)
- [Nexoraxs Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md)
- [Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md)
- [Product Hub](../01-genesis/13-PRODUCT-HUB.md)
- [Operating System Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)
- [Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md)
- [AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

## 10. References to Governance

- [Canonical Glossary](../00-governance/glossary/GLOSSARY.md)
- [ADR-009 — Shared Versioned Immutable Knowledge](../00-governance/ADR/ADR-009-shared-versioned-immutable-knowledge.md)
- [ADR-017 — Configuration Proposals Respect Ownership](../00-governance/ADR/ADR-017-configuration-proposals-respect-domain-ownership.md)
- [ADR-024 — Independent OS Domain Ownership](../00-governance/ADR/ADR-024-independent-operating-system-domain-ownership.md)
- [ADR-025 — Contract-Based Optional OS Integration](../00-governance/ADR/ADR-025-contract-based-optional-os-integration.md)
- [ADR-027 — Marketplace Bounded Context](../00-governance/ADR/ADR-027-marketplace-bounded-context-within-core.md)
- [ADR-028 — Immutable Marketplace Assets and Scoped State](../00-governance/ADR/ADR-028-immutable-marketplace-assets-scoped-state.md)
- [ADR-029 — AI Downstream of Knowledge, Rules, and Authorization](../00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md)
- [ADR-032 — Governed Learning](../00-governance/ADR/ADR-032-governed-ai-and-platform-learning.md)
- [ADR-034 — Explicit Tenant and Resource Scope](../00-governance/ADR/ADR-034-explicit-tenant-and-resource-scope.md)
- [ADR-035 — Technology-Independent Compatible Contracts](../00-governance/ADR/ADR-035-technology-independent-compatible-contracts.md)
- [ADR-036 — Contract-First API Architecture](../00-governance/ADR/ADR-036-contract-first-api-architecture.md)
- [ADR-038 — Append-Only Audit History](../00-governance/ADR/ADR-038-append-only-audit-history.md)

## 11. References to the Approved Proposal

- [Core Platform Architecture Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- API surfaces, Event contracts, interaction styles, versioning, idempotency, ordering, and replay: proposal section 5.4.
- Cross-domain and cross-OS boundaries: proposal sections 6 and 7.
- Governing decisions: ADR-CP-009, ADR-CP-010, ADR-CP-013, ADR-CP-014, ADR-CP-017, ADR-CP-018, and ADR-CP-020.

## 12. References to Wave 1

- [Wave 1 README](README.md)
- [Core Platform Vision](01-CORE-PLATFORM-VISION.md)
- [Core Platform Architecture](02-CORE-PLATFORM-ARCHITECTURE.md)
- [Core Platform Domain Model](03-DOMAIN-MODEL.md)
- [Wave 2 Data Ownership](04-DATA-OWNERSHIP.md)
- [Wave 2 Permission Model](05-PERMISSION-MODEL.md)
