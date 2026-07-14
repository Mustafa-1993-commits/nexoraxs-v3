# Core Platform Deployment Model

## 1. Purpose

This document defines the approved deployment model for the Core Platform. It translates the frozen logical architecture into deployment principles without selecting unapproved infrastructure technology or changing domain ownership.

The initial deployment posture is an enforced modular monolith. Logical boundaries remain explicit in code, data access, contracts, authorization, events, observability, and ownership so that deployment can evolve without redesigning the platform.

## 2. Scope

This document covers:

- deployment philosophy and the modular monolith strategy;
- logical module and runtime boundaries;
- environment and configuration strategy;
- storage, scalability, backup, recovery, and availability principles;
- criteria for future service extraction; and
- deployment invariants that every environment must preserve.

It does not select hosting products, infrastructure providers, container or orchestration technology, database engines, cache or queue products, search engines, object storage products, deployment pipelines, region topology, recovery objectives, or operational runbooks. Those decisions remain deferred.

## 3. Principles

1. **Architecture precedes topology.** Domain ownership and contracts do not change because modules share or stop sharing a runtime.
2. **Modular monolith first.** The Core Platform begins as an enforced modular monolith; physical distribution requires demonstrated need.
3. **Independent Operating Systems.** Each Operating System retains its domain model, setup, navigation, permissions, operational data, and release boundary.
4. **Canonical ownership.** A deployment boundary never grants a component ownership of another domain's write model.
5. **Contract first.** Module, API, Event, Webhook, and AI Tool API contracts remain technology-independent and explicitly versioned.
6. **Tenant isolation by default.** Workspace and applicable Business, Business Unit, Department, Branch, Operating System, and resource context are enforced in every runtime and storage path.
7. **Projection is never ownership.** Cache, search, analytics, Product Hub Projection, and other read models are reconstructable consumers.
8. **Configuration over code.** Business Knowledge, Rules, questions, Capabilities, and configuration metadata remain structured and versioned rather than embedded in deployment artifacts.
9. **Security, auditability, and observability by default.** Deployment must preserve least privilege, traceability, correlated diagnostics, and safe operational controls.
10. **Evolution through evidence.** Scaling or extraction follows measured capacity, security, release, reliability, or ownership needs and an approved ADR.

## 4. Deployment Philosophy

Core Platform deployment separates three concerns:

- **Logical architecture:** canonical domains, ownership, invariants, and contracts.
- **Runtime placement:** which approved modules execute together in a process or deployable unit.
- **Infrastructure placement:** where runtime, storage, network, and supporting capabilities operate.

Only the logical architecture is frozen by the approved Proposal and Waves 1–3. Initial runtime placement uses a modular monolith. Exact process, host, zone, region, and infrastructure topology remain implementation decisions subject to governance.

A deployment is conformant only when co-location does not create implicit data access, hidden authorization, unversioned integration, circular dependencies, or a shared source of truth. Operational simplicity is preferred until a different boundary has measurable value.

## 5. Modular Monolith Strategy

### 5.1 Initial posture

The Core Platform is deployed initially as an enforced modular monolith. Core logical modules may share a deployable runtime, but they communicate through typed internal commands, queries, and Domain Events rather than arbitrary cross-module table access.

The modular monolith must provide:

- explicit module entry points and dependency direction;
- owner-only write access to canonical aggregates;
- internal contracts that do not expose framework or database models as platform contracts;
- module-scoped authorization and invariant enforcement;
- module-attributed logs, metrics, traces, health, and audit correlation;
- independently versioned external contracts; and
- tests that detect prohibited dependencies and ownership violations.

### 5.2 What co-deployment does not mean

Co-deployment does not:

- combine domain ownership;
- allow a module to write another module's tables or aggregates;
- collapse Workspace, Business, Business Unit, Department, or Branch scopes;
- collapse availability, Recommendation, subscription, installation, setup, configuration, activation, and readiness states;
- make Product Hub or Marketplace the owner of composed source data;
- make AI the owner of Business facts, Knowledge, Rules, or operational records; or
- permit an Operating System to depend on another Operating System for its core workflow.

## 6. Logical Module Boundaries

The deployable Core Platform preserves the logical components approved by the Proposal and detailed in Wave 1:

| Boundary | Primary responsibility | Deployment rule |
|---|---|---|
| Identity and Access | Identity, Authentication, sessions, membership, roles, and scoped Permission evaluation | Remains the authority for platform identity and access context. |
| Workspace Management | Workspace lifecycle and Workspace Entitlement coordination | Does not absorb Business or OS operational ownership. |
| Business Registry | Canonical Business identity and lifecycle | Business DNA and operational Business Unit state remain distinct. |
| Organization Registry | Canonical Business Unit, Department, and Branch identity and parent relationships | Operating Systems retain scoped operational data and behavior. |
| Business Architect | Governed Business Architect Pipeline and reviewed Business understanding | Publishes Business DNA through approved ownership boundaries. |
| Business DNA Registry | Business-scoped Business DNA identity, snapshots, facts, provenance, and history | Software selection and configuration are excluded from Business DNA. |
| Capability, Knowledge, and Rules | Canonical Capability model, Knowledge, Knowledge Packs, and deterministic Rules | Published versions remain governed and immutable where approved. |
| Business Brain, Recommendation, and Configuration | Explainable decisions, Recommendations, Implementation Options, and Configuration Proposals | Configuration across boundaries is proposed; the owner validates and applies it. |
| Product, Plan, Subscription, Installation, and Readiness | Commercial and lifecycle control | Lifecycle states remain separate and explicitly owned. |
| Product Hub | Product discovery, lifecycle composition, setup handoff, launch, and recovery navigation | Product Hub Projection is a read model, not a source of truth. |
| Marketplace | Asset governance, publication, discovery, acquisition, installation coordination, and scoped Marketplace state | A bounded context within the Core Platform offering; may be co-deployed without becoming an undifferentiated Core module. |
| AI Coordinator | Context, policy, Expert routing, orchestration, validation, explanation, and Action Proposal coordination | AI uses governed tools and never receives unrestricted database access. |
| API Architecture | Internal, first-party, OS, Marketplace, public, partner, administrative, Event/Webhook, and AI Tool API surfaces | Gateway enforcement does not replace domain Authorization or invariants. |
| Shared platform services | Notifications, Audit, settings, localization, Search Coordination, Storage Coordination, and Analytics Intake | Shared capability does not transfer ownership of producer data. |

Physical package structure and the exact dependency map remain deferred, but any implementation must preserve these responsibilities and the no-circular-dependency rule.

## 7. Runtime Boundaries

### 7.1 Core runtime

The initial Core runtime may host the approved Core modules together. Module boundaries remain enforceable and observable within that runtime.

### 7.2 Marketplace runtime

Marketplace is a bounded context within the Core Platform offering. It may initially be co-deployed with the Core modular monolith and may later be deployed separately without changing Marketplace ownership or public contracts.

### 7.3 Operating System runtimes

Each Operating System is an independent product and runtime boundary. It owns OS-specific setup, Modules, workflows, permissions, domain configuration, operational records, dashboards, menus, reports, and endpoints. Core and an Operating System exchange only authorized, versioned contracts. No Operating System reads or writes another Operating System's database.

### 7.4 External and supporting boundaries

External AI providers, partner systems, Webhook consumers, and future ecosystem participants are untrusted boundaries. Search, Storage, analytics, cache, queue, and observability capabilities are supporting infrastructure, not canonical domain owners.

The exact number of deployable units and processes is deferred. Logical separation is mandatory even when runtime separation is not.

## 8. Environment Strategy

Environments must be isolated by identity, credentials, secrets, configuration, data, network access, observability, and deployment authority. No environment may rely on implicit access to another environment's canonical data or control plane.

Promotion follows versioned deployment artifacts, contracts, migrations, and environment-specific configuration. Production Business data must not be copied into another environment without approved authorization, minimization, protection, and audit controls.

Every environment must make its identity explicit in operational telemetry and administrative actions. Authorization, tenant isolation, contract conformance, and ownership rules apply in every environment; lower environments are not exemptions.

Environment names, count, promotion workflow, preview strategy, release gates, and rollback automation remain deferred.

## 9. Configuration Strategy

Deployment configuration is external to source code and deployment artifacts where appropriate. It is distinct from Business DNA, Recommendations, Configuration Proposals, and OS domain configuration.

Configuration must:

- be explicitly scoped to its environment and runtime;
- have an accountable owner and controlled change path;
- be validated before activation;
- be versioned or otherwise traceable where a change affects behavior;
- keep secrets separate from non-secret configuration;
- support safe rollback or recovery where approved;
- avoid embedding tenant-specific business facts in infrastructure configuration; and
- preserve bilingual localization and context requirements where applicable.

Secret values must never enter source code, documentation, ordinary logs, traces, Events, errors, AI prompts, or URLs. Secret storage, delivery, rotation, backup, and emergency procedures remain deferred.

## 10. Storage Strategy

Storage follows canonical ownership:

- an owning domain controls its write model and invariants;
- other domains use identifiers, governed APIs, Events, or authorized projections;
- no shared database between Operating Systems is permitted;
- Product Hub Projection, Workspace Intelligence Aggregation, search indexes, analytics views, caches, and dashboards are disposable read models;
- published Knowledge, Knowledge Pack Versions, Marketplace Asset Versions, and other approved published assets are immutable;
- Audit Records remain append-only;
- version and provenance references required for explanation and replay are retained under future policy; and
- files and objects are accessed through Storage Coordination policies without transferring domain ownership.

Physical aggregate schemas, database products, cache products, queue products, object storage products, search products, partitioning, retention periods, archival tiers, and data residency placement remain deferred.

## 11. Scalability Strategy

Scalability starts with measured behavior and preserves the modular monolith while it remains sufficient. Approved strategies include:

1. optimize owner-controlled write and query paths without bypassing invariants;
2. use reconstructable read models for composed or high-read experiences;
3. use caching only as a non-authoritative optimization with explicit invalidation behavior;
4. use asynchronous Events where coupling, latency, or fan-out justifies them;
5. scale approved runtime units without changing ownership contracts; and
6. extract a module only when measured scaling, security, reliability, release, or ownership needs justify it.

Scaling may not introduce a competing source of truth, direct cross-domain storage access, global Event ordering assumptions, or mandatory cross-OS dependencies. Capacity thresholds, autoscaling policy, performance budgets, and infrastructure topology remain deferred.

## 12. Disaster Recovery Principles

Disaster recovery must restore trustworthy service, not merely restart infrastructure. Recovery planning must account for canonical write models, immutable published assets, versioned contracts, configuration, secrets, Audit history, Event processing state, and reconstructable projections.

Recovery must:

- preserve tenant isolation and least privilege;
- restore canonical owners before disposable projections;
- verify integrity and compatibility before resuming writes;
- make partial recovery and degraded state explicit;
- prevent duplicate side effects through idempotency and reconciliation;
- retain Audit correlation for recovery actions; and
- test recovery procedures under approved governance.

Recovery objectives, regional strategy, failover topology, runbooks, exercise frequency, and responsibility assignments remain deferred.

## 13. Backup Principles

Backups protect canonical data, required version history, configuration, and other approved recovery inputs according to future classification and retention policy.

Backups must be:

- tenant-safe and protected against unauthorized disclosure or modification;
- encrypted and access-controlled under future approved mechanisms;
- isolated sufficiently from the failure being recovered;
- version-compatible with the application and migration state;
- monitored for successful completion and integrity;
- restorable through regularly verified procedures; and
- audited when accessed or restored.

Disposable read models may be rebuilt from canonical sources and need not become independent sources of truth through backup. Backup products, schedules, retention, immutability controls, recovery points, and restore targets remain deferred.

## 14. High Availability Principles

Availability design protects critical customer journeys while preserving correctness and security. It must:

- avoid hidden single points of failure where risk and service objectives require redundancy;
- expose health and dependency state without disclosing sensitive data;
- isolate failure so one Operating System or external integration does not disable another's core workflow;
- use timeouts, bounded retries, idempotency, and explicit degraded states at remote boundaries;
- preserve Authorization, ownership, and audit controls during failover;
- favor safe unavailability over unauthorized or corrupt writes; and
- use SLOs, SLAs, error budgets, and capacity evidence once those values are approved.

Availability tiers, redundancy topology, load balancing, failover automation, and SLO/SLA values remain deferred.

## 15. Future Microservice Extraction Strategy

Microservice extraction is an optional deployment evolution, not a target state or milestone requirement. A candidate boundary may be extracted only when all of the following are demonstrated:

1. it is already an enforced logical module or bounded context with one accountable owner;
2. its canonical data and write invariants are identified;
3. consumers use explicit, versioned contracts rather than table access;
4. dependency direction is acyclic and failure semantics are defined;
5. Authorization, tenant context, Audit, observability, idempotency, and compatibility work across the new boundary;
6. migration, rollback, reconciliation, recovery, and operational ownership are documented;
7. contract and conformance tests protect current consumers;
8. the benefit is supported by measured scaling, security, reliability, release, or team-ownership evidence; and
9. an ADR approves the physical change without reopening canonical architecture.

Marketplace is explicitly eligible for later separate deployment under these rules. Eligibility does not require extraction.

## 16. Deployment Invariants

1. The initial Core Platform deployment is an enforced modular monolith.
2. Deployment topology never changes canonical domain ownership.
3. Core, Marketplace, and every Operating System preserve their approved bounded responsibilities.
4. No module writes another module's canonical write model except through the owning contract.
5. No Operating System reads or writes another Operating System's database.
6. Every protected operation carries explicit tenant and resource context and is authorized by the owning domain.
7. Authentication never implies Authorization.
8. Product Hub, search, analytics, cache, and other projections never become sources of truth.
9. Business DNA remains Business-scoped and software-independent.
10. Published Knowledge and Marketplace Asset Versions remain immutable; Audit history remains append-only.
11. APIs, Events, Webhooks, handoffs, and AI tools remain versioned, observable, and backward-compatible under governance.
12. AI receives governed context and tools only and never owns Business facts or applies consequential changes without approved human control.
13. An Operating System remains independently usable without another Operating System.
14. Secrets and sensitive tenant data are not embedded in deployment artifacts or telemetry.
15. Recovery and failover never bypass ownership, tenant isolation, Authorization, or Audit.
16. Physical extraction requires evidence and an approved ADR.

## 17. Ownership and Responsibilities

| Concern | Accountable owner |
|---|---|
| Canonical Core data and invariants | Applicable Core owning domain |
| Marketplace data and lifecycle | Marketplace bounded context |
| OS operational data, setup, configuration, and workflows | Applicable Operating System |
| Cross-boundary policy and contract governance | Core API Architecture and applicable owning domains |
| Identity, Authentication, and platform access context | Core Identity and Access |
| Deployment configuration and operational controls | Future approved platform operations ownership |
| Backup, recovery, availability, and environment operation | Future approved platform operations ownership, with domain-owner participation |
| Observability production and service diagnostics | Every producing runtime; platform-wide correlation follows Observability architecture |

This document does not name a new organizational owner for infrastructure operations. That ownership remains a deferred implementation decision.

## 18. Relationships

- The Domain Model defines the concepts and ownership that deployment must preserve.
- Data Ownership defines authoritative write models and disposable projections.
- Permission Model and Security Model define context, trust, least privilege, and tenant-isolation requirements.
- Event Architecture and API Philosophy define cross-boundary communication and compatibility.
- Observability defines the evidence required to operate and evolve deployments.
- Product Hub and Navigation Architecture preserve context across Core, Marketplace, and Operating System runtime boundaries.
- Technology Stack records which implementation choices are approved and which remain deferred.

## 19. Future Extension Points

The approved architecture permits, but does not yet decide:

- physical package and module layout;
- environment and release topology;
- infrastructure provider and regional placement;
- separately deployed Marketplace;
- measured extraction of other logical modules;
- cache, queue, search, object storage, and analytics implementations;
- backup, recovery, high-availability, and data-residency mechanisms; and
- operational ownership, SLOs, SLAs, error budgets, and capacity thresholds.

Each material choice requires an ADR and must conform to Core Platform Principles.

## 20. References

### Governance

- `docs/00-governance/ADR/ADR-002-core-shared-control-intelligence-plane.md`
- `docs/00-governance/ADR/ADR-024-independent-operating-system-domain-ownership.md`
- `docs/00-governance/ADR/ADR-025-contract-based-optional-os-integration.md`
- `docs/00-governance/ADR/ADR-027-marketplace-bounded-context-within-core.md`
- `docs/00-governance/ADR/ADR-033-enforced-modular-monolith.md`
- `docs/00-governance/ADR/ADR-034-explicit-tenant-and-resource-scope.md`
- `docs/00-governance/ADR/ADR-035-technology-independent-compatible-contracts.md`
- `docs/00-governance/ADR/ADR-038-append-only-audit-history.md`
- `docs/00-governance/ADR/ADR-040-core-organization-identity-os-operational-data.md`

### Genesis

- `docs/01-genesis/02-CONSTITUTION.md`
- `docs/01-genesis/09-PLATFORM-BLUEPRINT.md`
- `docs/01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md`
- `docs/01-genesis/17-MARKETPLACE-ARCHITECTURE.md`
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
- `docs/02-core-platform/99-CORE-PLATFORM-ARCHITECTURE-REVIEW.md`
