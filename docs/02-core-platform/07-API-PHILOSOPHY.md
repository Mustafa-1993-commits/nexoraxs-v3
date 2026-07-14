# Core Platform API Philosophy

Version: 1.0  
Status: Milestone 1 — Wave 3  
Authority: Genesis v1.1, Governance Foundation, Core Platform Principles, approved Core Platform Architecture Proposal v0.2, and approved Core Platform Waves 1–2  
Owner: Nexoraxs

---

## 1. Purpose

This document defines the philosophy and architectural rules for every Core Platform API surface.

Core Platform APIs expose approved capabilities through stable contracts without exposing persistence, framework, deployment, or another domain's mutable state. APIs preserve canonical ownership, explicit context, tenant isolation, least privilege, backward compatibility, auditability, and independent Operating Systems.

This document does not define endpoint paths, payload schemas, protocol technology, token format, numeric limits, or an API catalog. Those details require later approved contracts within this philosophy.

## 2. Scope

This document covers:

- API Architecture vision.
- Public API.
- Internal API.
- Partner API.
- AI Tool API.
- Marketplace API.
- Webhook strategy.
- API versioning and compatibility.
- Contract governance.
- Error model.
- Pagination, sorting, filtering, and bounded query cost.
- Idempotency.
- Rate limiting.
- API security.
- API evolution.

It applies to Core Module Contracts, First-Party Experience API, OS Integration API, Marketplace API, Public Platform API, Administrative API, Event and Webhook API, and AI Tool API.

To preserve canonical terminology:

- **Public API** in this document means the approved **Public Platform API**.
- **Internal API** describes approved Core Module Contracts and first-party service boundaries; it is not a new source of ownership.
- **Partner API** describes authorized partner access through the Public Platform API, Marketplace API, or another explicitly approved surface; it is not a parallel ungoverned API layer.

## 3. Principles

### 3.1 Domain First

API resources and actions reflect canonical domains, ownership, invariants, and lifecycle. An API does not create a new domain merely to simplify a client.

### 3.2 Contract First

Meaning, owner, scope, inputs, outputs, errors, versions, security, idempotency, and compatibility are defined before implementation details.

### 3.3 API First

Approved platform capabilities are exposed through deliberate API surfaces appropriate to their consumers. Database schemas and framework endpoints are not contracts.

### 3.4 Canonical owner controls mutation

Only the canonical owner accepts a command that changes its write model. A gateway, composition API, partner, AI Expert, Marketplace adapter, or read model cannot write around that owner.

### 3.5 Explicit context

Every protected request carries or resolves actor, Workspace, applicable organization, OS, resource, Permission, entitlement, lifecycle, contract version, correlation, and idempotency context.

### 3.6 Least privilege

Each API surface exposes only the operations and fields required by its approved consumers. Internal placement, partnership, Marketplace activation, or AI execution never creates broad access.

### 3.7 Stable and minimal contracts

Contracts expose durable business meaning and the minimum authorized data required. Internal model shape and sensitive implementation detail remain private.

### 3.8 Compatible evolution

Compatible additive change is preferred. Breaking semantic or structural change requires a new version, migration path, and governed deprecation.

### 3.9 Observable boundaries

Every API request can be correlated across gateway, owner, Event, Audit, and dependent calls without logging secrets or unauthorized payloads.

### 3.10 Technology independence

API meaning and ownership survive framework, protocol, storage, and deployment changes.

## 4. Responsibilities

### 4.1 API Architecture

API Architecture owns shared contract governance, surface classification, context requirements, versioning rules, compatibility expectations, error rules, pagination and filtering constraints, idempotency policy, rate-limit policy, security baseline, and conformance expectations.

It does not own the business facts exposed by an API.

### 4.2 Canonical domain owner

The canonical owner:

- defines resources and approved actions;
- owns mutation semantics and invariants;
- authorizes the resource-level operation;
- defines stable domain errors;
- owns contract compatibility together with API governance;
- emits Domain Events after committed facts where appropriate;
- audits critical actions.

### 4.3 API Gateway

API Gateway authenticates the boundary, validates coarse policy and contract shape, applies rate and abuse controls, routes requests, and records boundary telemetry. It cannot replace owning-domain Authorization or business invariants.

### 4.4 API consumer

A consumer:

- uses only an approved surface and supported version;
- supplies explicit context but does not assume it is trusted;
- respects pagination, filtering, idempotency, rate, and retry contracts;
- handles compatible additions and stable errors;
- never depends on undocumented fields or internal endpoints;
- never treats a successful read or gateway check as permission to write.

### 4.5 Governance

Material API decisions follow the ADR process. Canonical terms come from the Governance Glossary. A contract cannot redefine Workspace, Business, Business Unit, Department, Branch, Business DNA, Capability, Operating System, Marketplace, or another governed concept.

## 5. Architecture

### 5.1 API Architecture Vision

```text
Approved consumer
  → appropriate API surface
  → API Gateway or Core Module Contract
  → Authentication and coarse boundary policy
  → explicit Authorization Context
  → canonical owner
      ├── resource Authorization
      ├── domain invariants
      ├── write model or canonical query
      └── Audit and Domain Event where required
  → stable response or stable error
```

The API layer is a contract boundary, not a second business layer. Task-oriented first-party compositions may combine read models and owner commands, but every command still reaches its canonical owner.

### 5.2 API surface model

| Approved surface | Primary consumers | Purpose | Ownership boundary |
|---|---|---|---|
| Core Module Contract | Core logical modules | Typed commands, queries, and Domain Events inside the enforced modular monolith | Source module owns meaning and write model |
| First-Party Experience API | Core web/mobile experiences and approved composition layers | Task-oriented onboarding, Business Architect, Product Hub, and governance experiences | Composes owners without becoming a source of truth |
| OS Integration API | Independent Nexoraxs Operating Systems | Context, organization, entitlement, handoff, readiness, Audit, Notification, and approved intelligence integration | Core or source OS retains ownership by contract |
| Marketplace API | Product Hub, Marketplace publishers, partners, and asset consumers | Marketplace Asset, version, purchase, installation, activation, applicability, review, and publisher operations | Marketplace bounded context owns Marketplace state |
| Public Platform API | Authorized customers and external integrations | Stable, documented platform resources and actions | Each resource remains owner-controlled |
| Administrative API | Authorized Nexoraxs operators | Segregated operational and governance controls | Owning domain plus stronger Authorization and Audit |
| Event and Webhook API | Core modules, OSs, customers, partners, and external endpoints | Versioned asynchronous Integration Events and Webhook delivery | Source domain owns Event meaning |
| AI Tool API | AI Coordinator and approved AI Experts | Narrow reads and AI Action Proposals | Tool owner authorizes; AI never owns target action |

### 5.3 Public API

Public Platform API is the stable external platform surface for authorized customer and external integrations.

Public API rules:

1. Only approved resources and actions are exposed.
2. Contracts are documented, versioned, tenant-scoped, rate-limited, and auditable where required.
3. Public resources use canonical identifiers and terminology.
4. Internal Domain Events, internal module contracts, persistence models, and private fields are not exposed automatically.
5. A Public API consumer receives no broader access than its User or service identity, Permission, Workspace, organization, product, and resource scope.
6. Long-Running Operations expose explicit status rather than holding a request open.
7. Public compatibility is governed independently from internal releases.

The initial Public API resource catalog, eligibility, onboarding, and commercial policy remain deferred.

### 5.4 Internal API

Internal API describes communication among approved Core modules and first-party experiences.

Internal does not mean trusted without verification.

- Core Module Contracts prevent arbitrary cross-module table access.
- First-Party Experience API composes customer tasks without owning canonical source records.
- Internal callers use service identity and explicit tenant/resource context when accessing tenant data.
- A module cannot bypass another module's Authorization or invariants because both are co-deployed.
- Internal contracts remain versioned and testable even when no network boundary exists.
- Administrative API remains segregated from ordinary first-party experience access.

The modular monolith may optimize implementation while preserving the same logical contract.

### 5.5 Partner API

Partner access uses an approved existing surface according to partner role and purpose.

- General customer or business integrations use Public Platform API.
- Marketplace publishers and asset partners use Marketplace API for approved Marketplace responsibilities.
- Asynchronous partner notification uses Event and Webhook API.
- A partner does not receive Core Module Contracts, unrestricted Administrative API, or internal OS implementation access.
- Partnership status does not bypass Workspace Membership, service authorization, Permission, tenant isolation, rate limits, asset review, or Audit.
- Partner contracts expose the minimum fields and actions required by the approved integration.

Partner registration, certification, commercial access, sandboxing, and specific scopes remain future Marketplace and developer-ecosystem decisions.

### 5.6 OS Integration API

OS Integration API preserves the independence of Core and each Operating System.

It may expose approved contracts for:

- authenticated identity and Authorization Context;
- Workspace, Business, Business Unit, Department, and Branch references;
- Workspace Entitlement, OS Subscription, Plan, installation, and activation context;
- Setup Handoff and readiness coordination;
- Notification and Audit submission;
- approved Business DNA, Recommendation, Configuration Proposal, Knowledge, and Capability consumption;
- optional cross-OS Integration Events or authorized queries.

An OS never uses this surface to read another OS database, own Core identity, redefine Capability, or bypass optional-integration rules.

### 5.7 AI Tool API

AI Tool API is a narrow permission-checked surface for AI Coordinator and approved AI Experts.

Rules:

- every call is bound to one AI Interaction and authorized request context;
- Context Builder supplies only the minimum permitted data;
- an Expert or model provider receives no implicit platform access;
- read tools expose approved fields only;
- consequential operations return or accept an AI Action Proposal, not direct execution authority;
- the owning service reauthenticates or validates the principal context, reauthorizes, applies Rules and invariants, and audits any execution;
- tool inputs, outputs, versions, evidence, policy decisions, latency, and failures are observable under approved data-protection rules.

AI Tool API never becomes a general internal API or unrestricted database query interface.

### 5.8 Marketplace API

Marketplace API is owned by the Marketplace bounded context under shared API governance.

It exposes approved Marketplace operations for:

- Marketplace Asset and immutable Marketplace Asset Version discovery;
- publisher and review workflows when later approved;
- Workspace Purchase;
- Marketplace Installation and Activation;
- Marketplace Applicability to Workspace or Business;
- version selection, update, rollback, deprecation, archive, and scoped removal;
- dependency and compatibility information.

Product Hub reads Marketplace projections and issues commands through Marketplace API. It never writes Marketplace tables. Marketplace activation does not grant Permission automatically.

### 5.9 Webhook Strategy

Webhooks are an external delivery form of approved Integration Events.

Webhook requirements:

- registration and destination changes are authenticated, authorized, tenant-scoped, and auditable;
- delivery is signed through an approved future mechanism;
- payloads are minimized and versioned;
- delivery is retryable and observable;
- consumers tolerate duplicate and replayed delivery;
- no global ordering or exactly-once delivery is promised;
- the unique Event identifier supports idempotency;
- replay preserves the original Event meaning and contract version;
- sensitive follow-up data is retrieved through an authorized API rather than embedded unnecessarily;
- endpoint failure does not undo the source fact;
- pause, revocation, rotation, and failure handling are explicit.

Signing mechanism, secret lifecycle, retry schedule, retention, endpoint verification, and delivery SLO remain deferred.

### 5.10 Request context

Every protected request carries or resolves:

- User or service identity;
- correlation and trace identifiers;
- Workspace;
- Business when applicable;
- Business Unit, Department, Branch, OS, and resource when applicable;
- requested action and Permission;
- Workspace Entitlement, OS Subscription, Plan, and lifecycle when applicable;
- contract version;
- locale and timezone when semantically required;
- idempotency information for retryable mutation;
- causation for derived work.

Consumers may submit context identifiers, but Core and the owning domain verify them against canonical sources.

### 5.11 API Versioning

API contract version and source-data version are distinct.

Versioning rules:

1. Every externally or independently consumed contract has an explicit supported version.
2. Compatible additions do not change existing field meaning.
3. Removing a field, changing meaning, narrowing or broadening scope, changing error semantics, or changing required behavior is breaking.
4. Breaking change requires a new contract version.
5. A consumer declares or selects a supported version through the future approved mechanism.
6. The owner preserves old supported versions for the governed compatibility window.
7. Historical requests, Events, Audit Records, and AI Interactions retain the version used.
8. Version identifiers do not encode a framework or deployment release.

The version format and selection mechanism remain deferred.

### 5.12 API Compatibility

Compatibility includes more than schema shape.

A compatible change preserves:

- canonical meaning and owner;
- tenant and organization scope;
- Authorization expectations;
- lifecycle and idempotency behavior;
- existing stable error meaning;
- pagination, filtering, and ordering contract;
- rate-limit and retry semantics where contractually exposed;
- Event and Webhook relationships;
- consumer ability to ignore unknown additive fields.

Consumers must tolerate documented compatible additions. Producers must not reinterpret an existing field or state silently.

### 5.13 Contract Governance

Every API contract identifies:

- canonical owner;
- approved API surface and consumers;
- business purpose and related Capability;
- resource and action semantics;
- tenant and organization scope;
- Authentication and Authorization requirements;
- request, response, and stable error contracts;
- version and compatibility rules;
- idempotency, pagination, filtering, sorting, and bounded cost where applicable;
- rate-limit and abuse classification;
- Audit, Event, observability, privacy, and retention implications;
- dependencies and failure behavior;
- migration and deprecation impact.

Material changes use the ADR process. Contract review checks Genesis, Glossary, Principles, ownership, Permission Model, Event Architecture, and affected consumers. Exact registry tooling and approval workflow remain deferred.

### 5.14 Error Model

APIs return a stable machine-readable error envelope and keep localization separate from machine meaning.

The error contract provides, as applicable:

- stable error identifier or code;
- non-sensitive human-readable summary;
- correlation identifier;
- contract version context;
- safe field or validation details;
- whether retry may be appropriate;
- reference to Long-Running Operation or recovery state when applicable.

Error rules:

- Authorization failure does not disclose unauthorized resource existence or data;
- internal stack, storage, framework, secret, and provider detail is not exposed;
- the same stable error meaning is used across compatible versions;
- partial failure and pending state are not reported as success;
- consumers do not parse localized prose as machine policy;
- unexpected errors remain observable through correlation without exposing internals.

Exact envelope field names and error catalog remain deferred.

### 5.15 Pagination and Sorting

Every collection API is bounded.

- default and maximum page sizes are declared by contract;
- pagination preserves tenant and Permission filtering;
- ordering is explicit and stable within the contract's supported boundary;
- a continuation cannot broaden context or bypass current Authorization;
- page navigation tolerates concurrent changes according to documented resource semantics;
- totals are optional and are not required when expensive, sensitive, or misleading;
- one API cannot return an unbounded cross-Workspace or cross-domain dataset.

Cursor, offset, continuation format, page sizes, and consistency behavior remain contract-specific deferred choices.

### 5.16 Filtering and Field Selection

Filtering, sorting, and field selection are explicit allowlisted contract capabilities.

- filterable and sortable fields are owned by the resource contract;
- filtering never bypasses tenant, Permission, Marketplace Applicability, OS, or lifecycle policy;
- unsupported or excessive query cost is rejected through stable error behavior;
- arbitrary query language over internal persistence is prohibited;
- fields from other domains are included through approved projections or references, not hidden joins into their write models;
- sensitive fields remain excluded even if requested;
- localization affects presentation, not canonical filter meaning.

### 5.17 Idempotency

Retryable mutations use an explicit idempotency contract.

The idempotency context is bound to:

- caller identity;
- Workspace and applicable organization scope;
- API surface and operation;
- contract version;
- normalized request meaning;
- an idempotency value supplied or resolved through the approved mechanism.

The same logical retry returns or resolves the same completed outcome. Reusing the same idempotency value for conflicting request meaning is rejected. Idempotency never bypasses current Authentication, Authorization, or safety checks.

Storage mechanism, retention period, concurrency behavior, and exact response replay rules remain deferred.

### 5.18 Rate Limiting

Rate limiting protects fairness, availability, cost, external dependencies, and risk boundaries. It does not replace Authorization.

Limits may be evaluated by:

- User or service identity;
- Workspace;
- API surface;
- OS Product, Plan, or Workspace Entitlement where commercially applicable;
- resource or operation cost;
- partner, Marketplace, AI, or external-provider risk;
- repeated invalid or abusive behavior.

Rate-limit decisions return stable, non-sensitive behavior that permits a consumer to respond safely. Critical internal recovery and administrative access follow separately approved policy rather than silently bypassing limits.

Numeric limits, windows, algorithms, response fields, and commercial quotas remain deferred.

### 5.19 API Security

API security requires:

1. Authentication at every protected boundary.
2. Explicit Authorization Context and verified ancestry.
3. Least-privilege surface, operation, and field exposure.
4. Owning-domain resource Authorization and invariants.
5. Tenant isolation for requests, responses, errors, logs, traces, Events, and projections.
6. Contract and input validation before domain processing.
7. Protection of credentials, tokens, secrets, and sensitive payloads.
8. Rate, abuse, and bounded-query controls.
9. Idempotency for retryable mutations.
10. Append-only Audit Records for critical actions.
11. Correlated observability without secret or unauthorized data leakage.
12. Safe deprecation and version enforcement.

Security mechanisms and cryptographic choices are defined by the Security Model and future approved implementation decisions.

### 5.20 API Evolution

API evolution follows this path:

```text
Need for change
  → identify canonical owner and consumers
  → assess Principles, Permission, data, Event, security, and observability impact
  → classify compatible or breaking
  → use ADR when materially architectural
  → define new or additive contract
  → validate conformance and migration
  → publish support and deprecation policy
  → observe adoption and failures
  → retire only after approved compatibility obligations
```

A new version cannot be used to rename canonical concepts, create parallel ownership, expose private Domain Events, weaken tenant isolation, or make a previously optional OS integration mandatory.

## 6. Ownership

| API concern | Canonical owner |
|---|---|
| Shared API philosophy and governance | Core API Architecture |
| Resource meaning, write model, invariants, and resource Authorization | Canonical domain owner |
| Boundary Authentication, coarse policy, rate enforcement, routing, telemetry | API Gateway |
| Core Module Contract | Source Core module |
| First-Party Experience composition | Core experience/API composition layer; source domains retain data ownership |
| OS Integration resource | Core or source OS according to the fact or command |
| Marketplace API | Marketplace bounded context |
| Public Platform API resource | Canonical resource owner under API governance |
| Administrative API action | Canonical owner with administrative policy |
| Integration Event and Webhook meaning | Source domain |
| AI Tool API operation | Owning tool service; AI Coordinator owns orchestration only |
| Audit Record | Audit Service |

No API consumer, gateway, documentation system, SDK, or projection becomes a source owner.

## 7. Relationships

### 7.1 Data Ownership

API commands reach canonical write owners. Queries may return owner data or approved projections. Read Models and API compositions never gain write authority.

### 7.2 Permission Model

Every protected API follows Authentication, explicit scope, RBAC and applicable ABAC constraints, entitlement, lifecycle, and owning-domain Authorization. API possession is not Permission.

### 7.3 Event Architecture

Synchronous commands and queries provide immediate validated outcomes. Domain Events announce committed owner facts. Integration Events and Webhooks expose stable minimized facts asynchronously.

### 7.4 Observability and Audit

Correlation and trace context connects gateway, owner, dependent calls, Long-Running Operations, Events, and Audit Records. Operational telemetry does not replace append-only Audit history.

## 8. Future Extension Points

Future approved documentation may define:

- endpoint and resource catalogs;
- request, response, and error schemas;
- protocol and serialization choices;
- version format and negotiation;
- compatibility and deprecation durations;
- Public and Partner API eligibility and commercial policy;
- SDK and developer documentation policy;
- sandboxing and certification;
- Webhook registration, signing, secret rotation, retry, and retention;
- pagination and continuation mechanisms;
- query-cost calculation and maximum limits;
- idempotency storage and retention;
- numeric rate limits and quota policy;
- API contract registry and automated conformance tests;
- service identity and token mechanisms;
- field-level data-protection classifications;
- API SLO, SLA, and error-budget targets.

No extension may expose internal persistence as a contract, bypass canonical ownership, weaken explicit context, or create a mandatory cross-OS dependency.

## 9. References to Genesis

- [Constitution](../01-genesis/02-CONSTITUTION.md)
- [Capabilities Model](../01-genesis/04-CAPABILITIES.md)
- [AI Strategy](../01-genesis/08-AI-STRATEGY.md)
- [Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md)
- [Nexoraxs Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md)
- [Product Hub](../01-genesis/13-PRODUCT-HUB.md)
- [Operating System Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)
- [Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

## 10. References to Governance

- [ADR Repository](../00-governance/ADR/README.md)
- [Canonical Glossary](../00-governance/glossary/GLOSSARY.md)
- [ADR-024 — Independent OS Domain Ownership](../00-governance/ADR/ADR-024-independent-operating-system-domain-ownership.md)
- [ADR-025 — Contract-Based Optional OS Integration](../00-governance/ADR/ADR-025-contract-based-optional-os-integration.md)
- [ADR-029 — AI Downstream of Authorization](../00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md)
- [ADR-033 — Enforced Modular Monolith](../00-governance/ADR/ADR-033-enforced-modular-monolith.md)
- [ADR-034 — Explicit Tenant and Resource Scope](../00-governance/ADR/ADR-034-explicit-tenant-and-resource-scope.md)
- [ADR-035 — Technology-Independent Compatible Contracts](../00-governance/ADR/ADR-035-technology-independent-compatible-contracts.md)
- [ADR-036 — Contract-First API Architecture](../00-governance/ADR/ADR-036-contract-first-api-architecture.md)
- [ADR-038 — Append-Only Audit History](../00-governance/ADR/ADR-038-append-only-audit-history.md)

## 11. References to the Approved Proposal

- [Core Platform Architecture Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- API Architecture and governance: proposal section 5.4.
- Tenant, ownership, and OS boundaries: proposal sections 6 and 7.
- Governing decisions: ADR-CP-009, ADR-CP-013, ADR-CP-014, ADR-CP-018, and ADR-CP-020.

## 12. References to Core Platform Principles

- [Core Platform Architectural Principles](00-CORE-PLATFORM-PRINCIPLES.md)
- Primary principles: P-01, P-07, P-10, P-11, P-20 through P-34, P-43, P-44, and P-48.

## 13. References to Wave 1

- [Wave 1 README](README.md)
- [Core Platform Vision](01-CORE-PLATFORM-VISION.md)
- [Core Platform Architecture](02-CORE-PLATFORM-ARCHITECTURE.md)
- [Core Platform Domain Model](03-DOMAIN-MODEL.md)

## 14. References to Wave 2

- [Data Ownership](04-DATA-OWNERSHIP.md)
- [Permission Model](05-PERMISSION-MODEL.md)
- [Event Architecture](06-EVENT-ARCHITECTURE.md)
