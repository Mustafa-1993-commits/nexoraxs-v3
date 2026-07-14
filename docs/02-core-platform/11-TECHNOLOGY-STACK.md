# Core Platform Technology Stack

## 1. Purpose

This document records the technology choices and architectural standards approved for the Core Platform and separates them from decisions that remain deferred. It prevents implementation preferences from being mistaken for frozen architecture.

The authoritative documents approve architectural behavior, boundaries, and contracts. They do not approve named products or frameworks for most stack categories. This document therefore does not select technologies on their behalf.

## 2. Scope

This document covers:

- backend and frontend framework status;
- database, cache, queue, object storage, and search status;
- Authentication and API standards;
- Event and AI integration standards;
- infrastructure, testing, coding, and versioning standards; and
- the decisions that must be completed through future ADRs.

It does not resolve deferred decisions, define procurement preferences, compare vendors, prescribe implementation topology, or replace domain and contract documentation.

## 3. Governing Principles

1. Architecture contracts are technology-independent and backward-compatible.
2. The Core Platform begins as an enforced modular monolith.
3. Domain identifiers, schemas, APIs, Events, lifecycle states, and ownership contracts are not framework or database models.
4. Canonical ownership, explicit context, tenant isolation, least privilege, and Audit apply to every technology choice.
5. Business Knowledge and configuration assets are structured and versioned rather than hardcoded.
6. Technology must implement approved contracts; technology must not redefine canonical terminology or ownership.
7. A deferred decision remains deferred until an accepted ADR records it.

## 4. Approved Decisions

### 4.1 Stack decision register

| Category | Approved decision or standard | Named technology status |
|---|---|---|
| Backend framework | Backend implementation must preserve the enforced modular monolith, module contracts, owner-only writes, explicit context, tenant isolation, API contracts, Events, Audit, and observability. | Deferred; no framework is approved. |
| Frontend framework | Frontend implementation must preserve context-aware navigation, accessibility, localization, RTL/LTR behavior, route guards, Permission-aware presentation, and separation of UI from domain ownership. | Deferred; no framework is approved. |
| Database | Canonical write models have one owning domain. No Operating System reads or writes another Operating System's database. Schemas are not public contracts. | Deferred; no database engine is approved. |
| Cache | Cache is a non-authoritative optimization. It cannot prove current Permission or become a source of truth; invalidation behavior must be explicit. | Deferred; no cache technology is approved. |
| Queue | Asynchronous delivery is used where appropriate under Event ownership, versioning, idempotency, security, ordering, replay, and observability rules. | Deferred; no queue, broker, or delivery product is approved. |
| Object Storage | Storage Coordination governs authorized references, metadata, quotas, and secure access. Stored objects do not transfer ownership of domain data. | Deferred; no object storage product is approved. |
| Search | Search Coordination uses authorized projections. Search indexes are disposable read models and never canonical sources or Authorization authorities. | Deferred; no search engine is approved. |
| Authentication | Core Identity and Access owns Authentication, sessions, recovery foundations, and service identity. Authentication remains separate from Authorization. | Deferred; no provider, protocol, credential method, or authentication product is approved. |
| API Style | Contract First and API First. APIs are technology-independent, explicitly versioned, scoped, authorized, observable, idempotent where required, and backward-compatible. | Approved architecture standard; transport and schema technologies remain deferred. |
| Event Strategy | Event-Driven Where Appropriate. Domain Events remain within owner boundaries; Integration Events cross boundaries; Notification, AI, and Marketplace Events have approved semantics. | Approved architecture standard; event infrastructure and serialization technology remain deferred. |
| AI Integration Layer | The AI Coordinator is the governed integration layer: Context Builder, Policy and Permission Filter, Expert Registry, Expert Router, Orchestrator, Response Validator, Explanation Composer, Action Proposal Manager, and Learning Feedback Collector. AI uses the AI Tool API and approved contracts. | Approved logical architecture; providers, models, SDKs, and model infrastructure remain deferred. |
| Infrastructure Standards | Initial modular monolith; isolated environments; externalized configuration; protected secrets; tenant-safe storage; versioned contracts; observable runtimes; optional evidence-based extraction. | Approved standards; hosting and infrastructure products remain deferred. |
| Testing Strategy | Tests must protect module boundaries, domain invariants, tenant isolation, Authorization, API and Event contracts, compatibility, idempotency, ownership, navigation context, AI policy, and Marketplace scope. | Approved test obligations; frameworks, tools, coverage thresholds, and pipeline gates remain deferred. |
| Coding Standards | Use canonical terminology; keep business logic in owning domains; prohibit arbitrary cross-module table access and circular dependencies; keep Business Knowledge data-driven; do not expose framework types as platform contracts. | Approved architecture standards; languages, formatters, linters, and source layout remain deferred. |
| Versioning Strategy | Version APIs, Events, Knowledge, Rules, Capabilities, Business DNA snapshots, Recommendations, Configuration Proposals, Marketplace Asset Versions, AI evidence, and other governed contracts. Prefer additive compatible change and govern deprecation for breaking change. | Approved architecture standard; concrete version syntax and tooling remain deferred. |

### 4.2 Backend architectural standard

The backend must implement the Core Platform as an enforced modular monolith at initial deployment. Each logical module owns its aggregate behavior and write model. Cross-module collaboration uses typed commands, queries, and Domain Events; external and cross-runtime collaboration uses approved API, Integration Event, Webhook, handoff, or AI Tool API contracts.

The framework may not:

- make one shared application layer the owner of every domain;
- expose persistence models as the only contract definition;
- permit arbitrary cross-module database access;
- erase explicit Workspace and resource context; or
- couple one Operating System's core workflow to another Operating System.

### 4.3 Frontend architectural standard

Frontend surfaces implement the approved Navigation Architecture:

- Core owns Authentication, Workspace and Business context, Business Architect, Product Hub, and Core governance navigation.
- Marketplace owns its governed surface.
- Each Operating System owns setup and operational navigation.
- Cross-application movement uses short-lived handoffs and re-evaluated route guards.
- Context is visible and preserved; every context switch is reauthorized.
- Presentation is permission-aware but never the final Authorization authority.
- User-facing surfaces support localization, accessibility, and RTL/LTR behavior.

### 4.4 Data technology standard

Regardless of persistence technology:

- every canonical concept has one source of truth and one accountable owner;
- write models enforce aggregate invariants;
- references across domains use stable identifiers and governed contracts;
- projections, cache, search, analytics, and Product Hub views are reconstructable;
- published assets that are approved as immutable are never updated in place;
- Audit history is append-only; and
- retention, archival, deletion, residency, and recovery follow future approved policy.

### 4.5 API and integration standard

The approved API Architecture includes Core Module Contracts, First-Party API, Operating System API, Marketplace API, Public API, Partner API, Administrative API, Event and Webhook surface, and AI Tool API.

All surfaces follow:

- explicit contract and resource ownership;
- explicit tenant and resource context;
- Authentication plus owning-domain Authorization;
- stable identifiers and versioned schemas;
- consistent error semantics;
- filtering, pagination, idempotency, and rate controls where applicable;
- correlated Audit and observability;
- compatible additive evolution; and
- governed deprecation for breaking changes.

The API Gateway performs boundary Authentication, coarse policy, rate protection, routing, and telemetry. It does not own domain data or replace resource Authorization and invariants in the owning domain.

### 4.6 Event standard

Events communicate facts that have already occurred. Commands, Recommendations, Configuration Proposals, and Action Proposals are not mislabeled as Events.

Approved Event behavior includes:

- the domain that changes canonical state owns the Domain Event;
- Integration Events expose the minimum contract needed across boundaries;
- consumers tolerate duplicate asynchronous delivery where required;
- no global ordering is assumed;
- ordering is explicit only for an approved owner and aggregate stream;
- replay never bypasses current security or ownership rules;
- sensitive data is minimized; and
- producers and consumers support contract, compatibility, idempotency, and observability tests.

### 4.7 AI integration standard

AI is downstream of canonical Business DNA, Knowledge, Rules, Permissions, and owner-controlled operational data. The AI Coordinator:

1. builds authorized context;
2. applies policy and Permission filters;
3. selects approved AI Experts;
4. orchestrates governed tool use;
5. validates confidence, evidence, conflicts, and policy;
6. composes an explainable response;
7. produces Action Proposals rather than silent consequential mutations; and
8. records governed feedback without modifying Business DNA, Knowledge, or Rules directly.

Specific AI providers, models, routing products, embeddings, vector storage, evaluation tools, and SDKs are not approved.

### 4.8 Infrastructure standards

Any selected infrastructure must support:

- isolated environments and least-privilege service identities;
- explicit configuration and secret boundaries;
- tenant-safe persistence, backup, recovery, search, analytics, and telemetry;
- correlated logs, metrics, traces, Events, Audit, and AI activity;
- health and diagnostic signals without sensitive-data disclosure;
- compatible migrations and rollback or recovery paths;
- measured capacity and service objectives; and
- future extraction without changing domain ownership or public contracts.

### 4.9 Testing strategy

The approved architecture requires test coverage by behavior, independent of test technology:

| Test concern | Required assurance |
|---|---|
| Domain invariants | Invalid aggregate transitions and ownership violations are rejected. |
| Module boundaries | Prohibited dependencies, circular dependencies, and direct foreign writes are detected. |
| Tenant isolation | Cross-Workspace and out-of-scope access fail safely. |
| Permission and Security | Authentication, context, lifecycle, Permission, denial, delegation, and sensitive-data rules are enforced. |
| API contracts | Producers and consumers conform to versioned schemas, errors, idempotency, and compatibility rules. |
| Event contracts | Ownership, versioning, ordering assumptions, duplicate handling, replay, and security are verified. |
| Navigation and handoff | Context is visible, signed handoffs are bounded, guards reauthorize, and failure routes are explainable. |
| Marketplace | Immutable versions, scoped acquisition/installation, and tenant separation are enforced. |
| AI | Context filtering, tool permissions, evidence, confidence, human approval, and prohibited mutation paths are verified. |
| Observability | Correlation, health, safe telemetry, alert evidence, and Audit linkage are verifiable. |

### 4.10 Coding standards

Implementation must:

- use the canonical names in Governance and the Domain Model;
- express module boundaries and dependency direction explicitly;
- locate business invariants in the owning domain, not in UI or gateway code;
- separate commands, facts, Recommendations, Configuration Proposals, and Action Proposals;
- use stable identifiers and explicit context in contracts;
- avoid duplicated business Knowledge and hardcoded industry logic;
- treat projections as disposable and write models as authoritative;
- include compatible contract and migration paths for change; and
- include Security, Audit, and observability behavior with the feature rather than as a later overlay.

### 4.11 Versioning strategy

Version ownership remains with the owner of the versioned artifact or contract. Published immutable assets create new versions rather than being mutated in place. Consumers record the Knowledge, Rule, Capability, Business DNA, Recommendation, Configuration Proposal, Marketplace Asset, API, Event, or AI evidence versions needed for explanation and reproduction.

Compatible additive change is preferred. Breaking change requires a new governed version, migration and compatibility plan, deprecation policy, consumer visibility, and an ADR when it materially changes architecture.

## 5. Deferred Decisions

The following are intentionally unresolved and must not be inferred from this document:

| Area | Deferred decision |
|---|---|
| Backend | Framework, language, runtime, package/module layout, dependency enforcement tools, and background execution model. |
| Frontend | Framework, language, rendering model, state management, UI library, build system, and frontend deployment topology. |
| Database | Engine, topology, schema-per-module or other isolation mechanism, transaction boundaries, migration tooling, replicas, partitioning, and archival. |
| Cache | Product, cache layers, key design, invalidation, consistency, eviction, and tenant isolation mechanism. |
| Queue and Events | Broker or queue, delivery guarantees, serialization/schema registry, retention, dead-letter handling, retry policy, replay tooling, and ordering implementation. |
| Object Storage | Product, access mechanism, encryption controls, object versioning, quotas, lifecycle, residency, and recovery. |
| Search | Engine, indexing pipeline, query language, ranking, localization behavior, freshness targets, and rebuild process. |
| Authentication | Identity provider, protocols, credentials, factors, recovery, session storage, session lifetime, token format, claims, signing, refresh, exchange, revocation, and step-up rules. |
| API implementation | Transport, schema language, contract publication tool, gateway technology, API-key mechanism, exact version syntax, pagination format, filter grammar, rate values, and deprecation intervals. |
| AI | Providers, models, SDKs, model routing, embeddings, vector technology, evaluation tooling, data residency, retention, adversarial testing, and provider failover. |
| Infrastructure | Hosting provider, regions, network topology, compute model, packaging, orchestration, delivery pipeline, environment count, secret manager, encryption and key technology, and operational ownership. |
| Resilience | Backup product and schedule, restore tooling, high-availability topology, disaster recovery topology, RPO, RTO, failover, rollback, and incident runbooks. |
| Observability | Logging, metrics, tracing, dashboard, alerting, and incident tooling; SLI definitions; SLO, SLA, and error-budget values; telemetry retention and sampling. |
| Testing | Test frameworks, fixtures, environment strategy, coverage thresholds, performance targets, security tools, conformance tooling, and release gates. |
| Coding | Language-specific style, formatter, linter, static analysis, generated-code policy, repository source layout, and review automation. |
| Versioning | Concrete version syntax, support windows, deprecation timelines, compatibility tooling, migration automation, and retention durations. |

## 6. Decision Process for Deferred Technology

A technology may become approved only through the Governance ADR lifecycle. The ADR must:

1. identify the approved architectural requirement it implements;
2. demonstrate conformance with Core Platform Principles and existing ADRs;
3. state ownership, tenant, security, data, contract, operability, migration, and exit implications;
4. evaluate alternatives without changing canonical terminology or architecture;
5. define compatibility and rollback or recovery expectations; and
6. receive approval before this document is updated.

An implementation experiment does not by itself approve a technology.

## 7. Ownership and Relationships

Technology selection is subordinate to the owning domain and cross-platform governance:

- domain owners retain their canonical data and invariants;
- API and Event owners retain their contracts;
- Core Identity and Access retains Authentication and Authorization responsibilities;
- Marketplace retains Marketplace Asset and scoped lifecycle ownership;
- the AI Coordinator retains AI orchestration and policy responsibilities;
- every Operating System retains its independent domain and operational data; and
- future platform operations ownership will manage approved infrastructure without acquiring domain ownership.

This document works with the Deployment Model, API Philosophy, Event Architecture, Security Model, Observability, and Data Ownership. Where a product choice conflicts with those documents, the product choice is non-conformant.

## 8. Future Extension Points

Future ADRs may approve specific technology for any deferred category. Such decisions may add implementation detail but may not:

- reopen frozen domain boundaries without a proven conflict;
- turn a framework or database model into the canonical architecture contract;
- introduce shared databases between Operating Systems;
- weaken explicit context, tenant isolation, least privilege, Audit, or human control;
- create mandatory cross-OS dependencies; or
- mutate immutable published assets in place.

## 9. References

### Governance

- `docs/00-governance/ADR/README.md`
- `docs/00-governance/ADR/ADR-033-enforced-modular-monolith.md`
- `docs/00-governance/ADR/ADR-034-explicit-tenant-and-resource-scope.md`
- `docs/00-governance/ADR/ADR-035-technology-independent-compatible-contracts.md`
- `docs/00-governance/ADR/ADR-036-contract-first-api-architecture.md`
- `docs/00-governance/ADR/ADR-038-append-only-audit-history.md`
- `docs/00-governance/ADR/ADR-039-data-driven-configurable-platform-assets.md`

### Genesis

- `docs/01-genesis/02-CONSTITUTION.md`
- `docs/01-genesis/08-AI-STRATEGY.md`
- `docs/01-genesis/09-PLATFORM-BLUEPRINT.md`
- `docs/01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md`
- `docs/01-genesis/19-AI-EXPERT-NETWORK.md`
- `docs/01-genesis/20-PLATFORM-ECOSYSTEM.md`

### Approved Core Platform architecture

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
- `docs/02-core-platform/99-CORE-PLATFORM-ARCHITECTURE-REVIEW.md`
