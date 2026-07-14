# Core Platform Security Model

Version: 1.0  
Status: Milestone 1 — Wave 3  
Authority: Genesis v1.1, Governance Foundation, Core Platform Principles, approved Core Platform Architecture Proposal v0.2, and approved Core Platform Waves 1–2  
Owner: Nexoraxs

---

## 1. Purpose

This document defines the technology-independent Security Model for Core Platform, Marketplace, independent Operating Systems, APIs, Events, AI Coordinator, data, services, and customer access.

Security protects canonical ownership, tenant isolation, explicit context, least privilege, immutable history, human authority, and optional OS integration. Security controls are part of every domain boundary and are not delegated exclusively to API Gateway, infrastructure, UI, or AI policy.

This document defines architectural requirements. It does not select identity providers, authentication protocols, token formats, encryption algorithms, key stores, secret stores, monitoring products, retention durations, or incident tools.

## 2. Scope

This document covers:

- Security Architecture.
- Trust boundaries.
- Identity model.
- Authentication and Authorization.
- Session management.
- Token strategy.
- Secret management.
- Encryption and key rotation.
- Tenant isolation.
- Audit security.
- AI, Marketplace, API, and Event security.
- Data protection.
- Compliance principles.
- Incident response.

It applies to Users, service identities, Workspace Memberships, Core modules, Marketplace, Operating Systems, partners, external clients, Webhooks, AI Experts, model providers, projections, observability, and administrative access.

## 3. Principles

### 3.1 Security by Default

A protected operation is permitted only when identity, context, Permission, entitlement, lifecycle, contract, and owning-domain checks succeed.

### 3.2 Tenant Isolation by Default

Every tenant-owned record, request, Event, projection, log, trace, AI context, and action belongs to or resolves one Workspace.

### 3.3 Least Privilege

Users, services, Marketplace Assets, OSs, integrations, and AI receive only the access needed for one approved responsibility and scope.

### 3.4 Explicit Trust Boundaries

Every transition between User, Core, Marketplace, OS, partner, external endpoint, AI provider, storage, Event, or observability context re-establishes the applicable trust and Authorization decision.

### 3.5 Authentication Is Not Authorization

Identity proof never grants unrestricted Workspace, Business, Business Unit, Department, Branch, OS, or resource access.

### 3.6 Canonical owner authorizes the resource

Boundary controls may reject early, but the resource owner enforces final Permission and domain invariants.

### 3.7 Minimize and separate sensitive data

Only the minimum data required for an approved purpose crosses a boundary. Credentials, secrets, tokens, and sensitive internal detail do not enter ordinary payloads, URLs, logs, Events, prompts, or errors.

### 3.8 Defense does not change ownership

Security infrastructure, API Gateway, Audit Service, and observability protect domains without becoming owners of their business facts.

### 3.9 Human control remains effective

AI and automation cannot bypass human approval, deterministic Rules, Permission, or canonical owner validation for consequential decisions.

### 3.10 Security is auditable and evolvable

Critical security actions and changes are append-only and correlated. Security mechanisms may evolve while contracts, scope, ownership, and historical evidence remain intact.

## 4. Responsibilities

### 4.1 Core Identity and Access

Owns User identity, Authentication, sessions, Workspace Membership, shared Permission assignment foundations, Authorization Context primitives, and service identity foundations.

### 4.2 Canonical domain owners

Each owner defines resource sensitivity, required Permission, scope, invariant, lifecycle, audit requirement, and safe failure behavior for its data and actions.

### 4.3 API Architecture and API Gateway

Own shared boundary-security requirements and gateway enforcement for Authentication, coarse policy, rate and abuse controls, contract validation, routing, and telemetry. The resource owner performs final Authorization.

### 4.4 Marketplace

Owns Marketplace Asset and scoped Marketplace security, publisher and review boundaries, declared required Permissions, compatibility, lifecycle, and Marketplace API authorization.

### 4.5 Operating Systems

Each OS owns operational Permission definitions, domain security, setup security, operational data protection, OS APIs, and local incident response while consuming shared Core identity and Authorization Context.

### 4.6 AI Coordinator

Owns authorized context construction, Policy and Safety Engine evaluation, Expert/provider boundary, AI Tool API constraints, evidence validation, confidence, AI Action Proposals, conversation context, and AI Audit and Observability.

### 4.7 Audit Service and observability

Audit Service owns append-only Audit Records. Observability provides diagnostic signals. Neither replaces source security policy, and access to both is itself protected.

### 4.8 Every consumer

Every User, service, OS, Marketplace Asset, partner, Webhook consumer, or AI Expert must authenticate through an approved mechanism, use explicit context, obey least privilege, protect received data, and avoid inferring access beyond the contract.

## 5. Architecture

### 5.1 Security Architecture

```text
Identity proof
  → Authentication
  → session or service context
  → explicit Authorization Context
  → API, Event, Marketplace, OS, or AI boundary controls
  → canonical owner Authorization and invariants
  → protected read, write, or AI Action Proposal
  → Audit and correlated observability
```

Security is layered:

1. identity and session security;
2. tenant and organization context;
3. Permission and entitlement;
4. API, Event, Marketplace, OS, or AI boundary controls;
5. owning-domain policy and invariants;
6. data, secret, token, and encryption protection;
7. Audit, observability, detection, and response.

No layer is sufficient by itself.

### 5.2 Trust Boundaries

| Trust boundary | Security requirement |
|---|---|
| Public client → Authentication/API Gateway | Validate identity proof, request shape, rate, abuse, and safe failure before protected routing. |
| Authenticated User → Workspace | Resolve current Workspace Membership; identity alone does not establish tenant access. |
| Workspace → Business/Business Unit/Department/Branch | Verify canonical ancestry and explicit Permission; hierarchy is not automatic inheritance. |
| Core module → Core module | Use Core Module Contracts and service authorization; co-deployment is not implicit trust. |
| Core → Operating System | Use OS Integration API, explicit tenant/organization/OS scope, entitlement, Permission, lifecycle, and stable contract. |
| Operating System → Core | Reauthenticate service context and authorize the requested Core resource; OS status is not platform-wide privilege. |
| OS → OS | Use optional platform-governed Integration Events or approved APIs; no direct database access or authority transfer. |
| Core/Product Hub → Marketplace | Use Marketplace API; Marketplace owns Asset and scoped state. |
| Marketplace Asset → customer data | Require declared Permissions, active scoped state, approved API, tenant isolation, and target-domain Authorization. |
| AI Coordinator → AI Expert/provider | Send only minimum authorized context under provider, policy, retention, and data-protection rules. |
| AI Expert → AI Tool API | Apply narrow tool Permission and owning-service Authorization; no unrestricted data access. |
| Platform → Webhook endpoint | Use approved destination, signing, minimized payload, retry, replay, and revocation rules. |
| Domain → Event boundary | Verify producer ownership, tenant scope, contract version, payload, consumer authorization, and replay policy. |
| Domain → storage/search/analytics/observability | Preserve tenant scope, least privilege, data minimization, retention, and source ownership. |
| Administrative API → canonical owner | Require segregated administrative access, stronger approval where later defined, and append-only Audit. |

### 5.3 Identity Model

The approved identity model contains:

- **User:** Core login identity for a person.
- **Workspace Membership:** relationship between User and Workspace and foundation for roles and scoped access.
- **service identity:** authenticated non-human principal for approved service-to-service responsibility.
- **Authorization Context:** resolved actor, tenant, organization, OS, resource, Permission, entitlement, and lifecycle context.

An HR employee profile, OS operational staff record, partner organization, Marketplace publisher, AI Expert, token, session, API key, or device is not automatically a User. If one acts as a principal, it must use an approved identity relationship and explicit scope.

The full partner, publisher, device, and external-client identity models remain deferred.

### 5.4 Authentication

Authentication validates the identity of a User or service through an approved future mechanism.

Requirements:

- identity proof is validated before a protected session or service context is established;
- failed Authentication reveals no sensitive account or tenant detail;
- account and service status are checked;
- recovery cannot bypass identity or tenant protections;
- higher-risk operations may require a stronger future-approved Authentication step;
- Authentication Events and critical changes are auditable;
- Authentication does not embed permanent resource Authorization.

Authentication methods, factors, provider, recovery flow, and step-up rules remain deferred.

### 5.5 Authorization

Authorization follows the approved Permission Model:

1. authenticate the principal;
2. validate session or service identity state;
3. resolve Workspace and Workspace Membership or service relationship;
4. resolve Business, Business Unit, Department, Branch, OS, and resource ancestry as applicable;
5. resolve role and Permission assignment;
6. apply approved contextual attributes;
7. validate Workspace Entitlement, OS Subscription, Plan, installation, activation, and readiness where required;
8. apply canonical owner policy and invariants;
9. allow or deny one operation;
10. record required Audit and observability.

Missing or unresolved context does not create access. API Gateway approval, route access, Event receipt, object identifier, Marketplace activation, or AI context never replaces this evaluation.

### 5.6 Session Management

A session represents an authenticated User context, not permanent Authorization.

Session requirements:

- session identity is bound to one User;
- Workspace and selected Business context are explicit and revalidated;
- context switching cannot silently broaden access;
- session validity, account state, and Workspace Membership are re-evaluated according to future approved policy;
- sensitive state is not placed in routes or exposed to unauthorized clients;
- session termination, revocation, and recovery are supported by the future mechanism;
- critical session creation, revocation, and suspicious behavior are observable and auditable as later defined;
- an OS or Marketplace surface re-resolves current context rather than trusting an old navigation decision.

Session storage, duration, renewal, concurrency, device, and revocation propagation remain deferred.

### 5.7 Token Strategy

A token is evidence used by an approved Authentication, session, service, handoff, API, or Webhook mechanism. It is not a canonical source of current Permission.

Token strategy requirements:

- purpose and intended consumer are explicit;
- lifetime is limited according to risk and use; exact lifetimes remain deferred;
- scope is no broader than required;
- Workspace and organization context is revalidated rather than trusted solely from token claims;
- Permission, entitlement, membership, and lifecycle may be rechecked against current canonical owners;
- tokens are protected from logs, Events, prompts, errors, analytics, and ordinary URLs;
- revocation or expiry results in no access;
- token validation rejects unsupported purpose, consumer, version, integrity, or time context;
- Setup Handoff uses a signed, short-lived, opaque reference and is not permanent Authorization;
- token issuance, rotation, rejection, and critical use are observable without recording the token value.

Token format, claims, signing mechanism, storage, refresh, exchange, and revocation technology remain deferred.

### 5.8 Secret Management

Secrets include sensitive values used to authenticate services, protect tokens or Webhooks, access external providers, or protect keys and integrations.

Secret requirements:

1. Secrets are never embedded in source code, committed documentation, public configuration, ordinary logs, traces, Events, errors, AI prompts, or URLs.
2. Access is restricted by service identity, purpose, environment, and least privilege.
3. Secret retrieval and administrative change are auditable without recording the secret.
4. Secrets have an owner and lifecycle including creation, use, rotation, revocation, and replacement.
5. A Marketplace Asset, partner, OS, or AI provider receives only secrets required by its approved contract.
6. Secret compromise triggers revocation, replacement, investigation, and affected-context review.
7. Shared secrets are avoided where they would blur caller identity or tenant boundaries; exact mechanisms remain deferred.

Secret storage, injection, backup, recovery, and rotation technology remain deferred.

### 5.9 Encryption

Data is protected against unauthorized disclosure and modification across trust boundaries and in persistent storage according to future approved classification and compliance policy.

Requirements:

- protected network communication uses approved encryption;
- tenant data, credentials, tokens, secrets, keys, backups, and sensitive observability data receive protection appropriate to their risk;
- encryption does not replace Authorization or data minimization;
- integrity of immutable Knowledge, Marketplace Asset Versions, Audit Records, Events, Configuration Proposals, and software/configuration artifacts is verifiable through approved future controls;
- encryption context does not merge tenant ownership;
- failure to establish required protection results in no protected data transfer.

Algorithms, protocols, key sizes, storage encryption mechanism, field-level protection, and classification rules remain deferred.

### 5.10 Key Rotation

Keys used by approved token, encryption, Webhook, service, or integrity mechanisms have an owned and auditable lifecycle.

Rotation requirements:

- key purpose and owner are explicit;
- active and retiring keys are distinguishable through the future mechanism;
- rotation preserves supported verification during an approved transition without allowing indefinite old-key use;
- compromised or unauthorized keys can be revoked;
- consumers reject unsupported or revoked keys;
- rotation does not silently invalidate immutable historical evidence where verification remains required;
- key material never appears in ordinary telemetry or customer payloads.

Rotation frequency, storage, distribution, emergency procedure, and verification-retention policy remain deferred.

### 5.11 Tenant Isolation

Workspace is the highest tenant boundary.

Tenant isolation applies to:

- writes and queries;
- Business and organization ancestry;
- Permissions and roles;
- APIs, Events, Webhooks, and Long-Running Operations;
- Product Hub and Workspace Intelligence Aggregation;
- Marketplace Purchase, Installation, Activation, and Applicability;
- OS setup and operational data;
- search, storage, analytics, cache, backup, and export;
- AI Context Builder, Conversation Context Manager, tools, providers, and AI Interaction;
- logs, metrics, traces, alerts, dashboards, and Audit Records.

Every tenant operation resolves Workspace from canonical context and verifies narrower scope. A shared platform asset may be global, but its Workspace activation and access remain scoped and cannot leak another Workspace's data.

### 5.12 Audit Security

Audit Records are append-only security and governance evidence, not ordinary mutable logs.

Audit security requirements:

- critical actions record actor or service, Workspace and applicable scope, source domain, action, subject, time, correlation, and result references;
- correction or reversal creates a later Audit Record;
- access to Audit Records is Permission-controlled and tenant-scoped;
- Audit content is minimized while remaining sufficient for accountability;
- retention, export, legal hold, and deletion follow future approved country and compliance policy;
- Audit availability and integrity are monitored;
- operational logs and traces correlate to Audit Records but do not replace them;
- AI, Marketplace, service, administrative, Permission, subscription, and integration actions use the shared Audit pattern where critical.

### 5.13 AI Security

AI security enforces Knowledge Before AI, explicit Authorization, least privilege, human control, and explainability.

Requirements:

- Authorization Context Resolver runs before Context Builder;
- Context Builder retrieves only the minimum authorized data required for the request;
- Policy and Safety Engine applies before and after Expert execution;
- Expert Registry and Expert Router select only approved versions and compatible providers;
- provider and Expert boundaries do not expand tenant or resource scope;
- AI Tool API exposes narrow approved operations;
- Evidence and Claim Validator flags unsupported or uncertain output;
- low-confidence or conflicting results remain explicit;
- AI cannot modify Business DNA, Knowledge, Rules, Permissions, subscription, financial, compliance, or OS facts directly;
- AI Action Proposal has no execution authority;
- Conversation Context Manager cannot mix Workspaces or Businesses without explicit authorized aggregation;
- prompts, responses, tools, evidence, versions, policy, cost, and failures are monitored under data-protection limits;
- AI learning never rewrites Business DNA or official Knowledge directly.

Provider eligibility, data residency, retention, model evaluation, adversarial testing, and content-safety mechanisms remain deferred.

### 5.14 Marketplace Security

Marketplace is a separate bounded context and follows shared Core security.

Marketplace security requires:

- publisher and administrative identity through future approved models;
- Asset review and lifecycle governance;
- immutable published Marketplace Asset Versions;
- declared required Permissions, dependencies, countries, OSs, Plans, compatibility, and data access;
- Workspace-scoped Purchase, Installation, Activation, and version selection;
- Workspace or Business-scoped Marketplace Applicability;
- target OS Permission and lifecycle validation where an Asset extends an OS;
- no Permission grant merely from Asset activation;
- no bypass of tenant isolation or canonical owner APIs;
- auditable installation, update, rollback, activation, deactivation, and removal;
- safe, reversible, versioned installation and removal of scoped state;
- no arbitrary third-party code execution in the approved initial scope.

Partner certification, sandboxing, code execution isolation, security review criteria, settlement, and incident process remain deferred.

### 5.15 API Security

API Security follows API Philosophy and Permission Model.

- protected surfaces authenticate Users or service identities;
- request context and ancestry are validated;
- canonical owner authorizes the resource;
- contracts and inputs are validated;
- response fields are minimized and Permission-filtered;
- errors avoid unauthorized resource disclosure and internal detail;
- retryable mutations use idempotency;
- rate and abuse controls protect availability and cost;
- pagination, filtering, sorting, and field selection are bounded and allowlisted;
- contract version and compatibility are enforced;
- critical actions are audited;
- correlation supports diagnostics without sensitive-data leakage.

### 5.16 Event Security

Event Security follows Event Architecture.

- producer identity and fact ownership are verified;
- Workspace and applicable organization scope are explicit;
- contract version and payload are validated;
- Integration Event payloads are minimized;
- consumer access and local action are authorized;
- duplicates, replay, and out-of-order delivery do not bypass invariants;
- replay is authorized, scoped, idempotent, and auditable;
- Webhooks use approved signing, retry, revocation, and destination policy;
- possession of an Event is not Permission to query more data;
- cross-OS Events preserve source ownership and optional integration.

### 5.17 Data Protection

Data protection follows ownership, purpose, minimization, and lifecycle.

Requirements:

1. The canonical owner identifies protected data and approved consumers.
2. Collection is limited to information required for an approved business purpose.
3. Business DNA, customer operational data, AI context, Audit, and observability remain tenant-scoped.
4. Shared Knowledge and Marketplace Assets contain no tenant-owned copy unless explicitly modeled by a different approved concept.
5. Data in APIs, Events, search, analytics, exports, backups, logs, traces, prompts, and errors is minimized.
6. Retention, deletion, archive, anonymization, legal hold, and residency follow future approved policy.
7. Learning uses approved, protected signals and never changes customer truth directly.
8. Access, export, and administrative operations are authorized and auditable.

Detailed classification, privacy rights, country requirements, residency, retention periods, and anonymization mechanisms remain deferred.

### 5.18 Compliance Principles

Compliance is based on approved Knowledge and deterministic, versioned, explainable Rules.

- country and industry applicability are explicit;
- AI never invents or overrides official compliance Rules;
- compliance-sensitive actions use owning-domain validation and required human approval;
- source versions and evidence are retained for explanation;
- Marketplace Assets and Knowledge Packs declare country and compliance applicability;
- Permission, Audit, retention, data protection, and incident obligations are applied according to future approved jurisdiction policy;
- a compliance change produces a new governed Knowledge or Rule version rather than silent mutation.

This document does not claim compliance with a specific regulation or certification.

### 5.19 Incident Response

Incident Response is a coordinated security process that preserves ownership and evidence.

Architectural stages are:

```text
Detect and correlate
  → validate scope and severity
  → contain affected identity, token, key, service, integration, Asset, OS, or Workspace path
  → revoke or restrict compromised access
  → preserve Audit and diagnostic evidence
  → recover canonical services and projections safely
  → verify tenant and data integrity
  → communicate through approved responsibility
  → review causes and corrective actions
  → use ADR or documentation governance for material architecture change
```

Incident actions cannot bypass canonical ownership casually. Emergency access, if later approved, requires explicit scope and Audit. Incident runbooks, roles, severity definitions, notification obligations, recovery objectives, and tooling remain deferred.

### 5.20 Security Invariants

1. Every protected operation has one authenticated principal.
2. Every tenant operation resolves one Workspace.
3. Client-provided scope is never trusted without canonical validation.
4. Authentication never implies resource Authorization.
5. Organization hierarchy never implies Permission inheritance.
6. A token, session, route, Event, projection, or API key is not permanent Authorization.
7. Owning domains perform final resource Authorization.
8. Internal services receive no implicit cross-tenant access.
9. No OS reads or writes another OS database.
10. Marketplace activation does not grant Permission automatically.
11. AI has no implicit privilege or direct consequential execution authority.
12. Secrets, keys, credentials, and tokens never enter ordinary telemetry or payloads.
13. Published immutable assets and append-only Audit history are not rewritten.
14. Security failure produces no access and no unauthorized data disclosure.
15. Critical security changes and incident actions are auditable.

## 6. Ownership

| Security concern | Canonical owner |
|---|---|
| User identity, Authentication, sessions, Workspace Membership | Core Identity and Access |
| Shared Authorization Context and Permission assignment foundation | Core Identity and Access |
| Resource Permission and invariants | Canonical domain owner |
| Workspace and organization ancestry | Workspace Management, Business Registry, Organization Registry |
| Workspace Entitlement and OS Subscription security context | Core commercial control |
| API boundary security | API Architecture and API Gateway; resource owner retains final Authorization |
| Event publication meaning and security | Source domain under Event Architecture governance |
| Marketplace security | Marketplace bounded context using shared Core security |
| OS operational security | Owning Operating System |
| AI coordination security | AI Coordinator; owning tool service authorizes tools and actions |
| Audit security | Audit Service |
| Shared security diagnostics | Observability with source-domain and data-protection boundaries |
| Secret, token, encryption, and key mechanisms | Future approved security implementation owners under this model |

Security ownership does not transfer business-fact ownership.

## 7. Relationships

### 7.1 API Philosophy

API surfaces implement Authentication, explicit context, resource Authorization, validation, rate protection, safe errors, idempotency, versioning, and correlated diagnostics.

### 7.2 Data Ownership

Security protects canonical owners and projections without creating duplicate sources of truth. Sensitive decisions use current owner state rather than stale projections.

### 7.3 Permission Model

Permission Model defines RBAC, applicable ABAC constraints, scopes, inheritance limits, service access, AI access, and evaluation order used by this Security Model.

### 7.4 Event Architecture

Event Security validates producer, owner, tenant scope, contract, consumer, idempotency, replay, and optional cross-OS boundaries.

### 7.5 Observability

Security events, access failures, token/key/secret lifecycle, API behavior, AI policy, Marketplace lifecycle, and incident activity require correlated observability. Telemetry is minimized and protected.

## 8. Future Extension Points

Future approved documentation may define:

- identity providers and Authentication methods;
- session duration, renewal, revocation, concurrency, and device policy;
- token formats, claims, lifetimes, exchange, storage, and revocation;
- service identity and workload mechanisms;
- secret storage, delivery, backup, and rotation;
- encryption algorithms, protocols, field-level protection, and key stores;
- key rotation frequency and emergency revocation;
- data classification, privacy, retention, deletion, residency, anonymization, and legal hold;
- role catalog, Permission catalog, direct grants, deny precedence, Delegation, and emergency access;
- Marketplace partner security, certification, sandbox, and code execution isolation;
- AI provider security, model evaluation, adversarial testing, retention, and residency;
- incident roles, severity, runbooks, notification, recovery, and exercises;
- security SLO, SLA, error budgets, dashboards, and alerts;
- jurisdiction-specific compliance controls and certifications.

Every extension requires principle conformance and an ADR when materially architectural.

## 9. References to Genesis

- [Constitution](../01-genesis/02-CONSTITUTION.md)
- [Business DNA](../01-genesis/03-BUSINESS-DNA.md)
- [Knowledge Engine](../01-genesis/05-KNOWLEDGE-ENGINE.md)
- [AI Strategy](../01-genesis/08-AI-STRATEGY.md)
- [Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md)
- [Nexoraxs Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md)
- [Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md)
- [Subscription Model](../01-genesis/14-SUBSCRIPTION-MODEL.md)
- [Operating System Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)
- [Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md)
- [AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

## 10. References to Governance

- [ADR Repository](../00-governance/ADR/README.md)
- [Canonical Glossary](../00-governance/glossary/GLOSSARY.md)
- [ADR-014 — Human Control](../00-governance/ADR/ADR-014-human-control-over-recommendations-and-ai.md)
- [ADR-024 — Independent OS Domain Ownership](../00-governance/ADR/ADR-024-independent-operating-system-domain-ownership.md)
- [ADR-025 — Optional Contract-Based Integration](../00-governance/ADR/ADR-025-contract-based-optional-os-integration.md)
- [ADR-027 — Marketplace Bounded Context](../00-governance/ADR/ADR-027-marketplace-bounded-context-within-core.md)
- [ADR-029 — AI Downstream of Authorization](../00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md)
- [ADR-030 — AI Coordinator Separation](../00-governance/ADR/ADR-030-ai-coordinator-separated-orchestration.md)
- [ADR-034 — Explicit Tenant and Resource Scope](../00-governance/ADR/ADR-034-explicit-tenant-and-resource-scope.md)
- [ADR-036 — Contract-First API Architecture](../00-governance/ADR/ADR-036-contract-first-api-architecture.md)
- [ADR-037 — Context-Preserving Navigation](../00-governance/ADR/ADR-037-context-preserving-navigation.md)
- [ADR-038 — Append-Only Audit History](../00-governance/ADR/ADR-038-append-only-audit-history.md)

## 11. References to the Approved Proposal

- [Core Platform Architecture Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- Identity, Authorization, API, AI, Marketplace, navigation, and tenant boundaries: proposal sections 5 through 7 and Navigation Architecture.
- Governing decisions: ADR-CP-009, ADR-CP-010, ADR-CP-013, ADR-CP-018, ADR-CP-019, and ADR-CP-020.

## 12. References to Core Platform Principles

- [Core Platform Architectural Principles](00-CORE-PLATFORM-PRINCIPLES.md)
- Primary principles: P-07, P-10, P-18 through P-20, P-28 through P-39, P-41, P-43, P-44, and P-48.

## 13. References to Wave 1

- [Wave 1 README](README.md)
- [Core Platform Vision](01-CORE-PLATFORM-VISION.md)
- [Core Platform Architecture](02-CORE-PLATFORM-ARCHITECTURE.md)
- [Core Platform Domain Model](03-DOMAIN-MODEL.md)

## 14. References to Wave 2

- [Data Ownership](04-DATA-OWNERSHIP.md)
- [Permission Model](05-PERMISSION-MODEL.md)
- [Event Architecture](06-EVENT-ARCHITECTURE.md)
