# Core Platform Observability

Version: 1.0  
Status: Milestone 1 — Wave 3  
Authority: Genesis v1.1, Governance Foundation, Core Platform Principles, approved Core Platform Architecture Proposal v0.2, and approved Core Platform Waves 1–2  
Owner: Nexoraxs

---

## 1. Purpose

This document defines technology-independent Observability for Core Platform, Marketplace, independent Operating Systems, APIs, Events, AI Coordinator, security boundaries, and customer journeys.

Observability makes system behavior understandable through correlated logs, metrics, traces, health, diagnostics, alerts, and dashboards. It supports reliability, security, capacity planning, incident response, and architecture conformance without becoming a source of business truth or replacing append-only Audit Records.

This document does not select telemetry products, storage, agents, query languages, dashboard products, alert channels, numeric targets, retention periods, or on-call procedures.

## 2. Scope

This document covers:

- Observability philosophy.
- Structured logging.
- Metrics.
- distributed tracing.
- health checks.
- service diagnostics.
- Audit correlation.
- Event monitoring.
- API monitoring.
- AI monitoring.
- Marketplace monitoring.
- alerting.
- Service Level Objectives (SLOs).
- Service Level Agreements (SLAs).
- error budgets.
- dashboards.
- capacity planning.

It applies to Core logical modules, API Gateway, Product Hub, Business Architect Pipeline, Marketplace, Operating Systems, Long-Running Operations, Event and Webhook API, Notification Service, Audit Service, search, storage, analytics boundaries, AI Experts, providers, partners, and external integrations.

## 3. Principles

### 3.1 Observability by design

Every approved boundary exposes enough safe diagnostic context to understand success, failure, latency, version, ownership, and dependency behavior.

### 3.2 Correlation across boundaries

Requests, commands, Long-Running Operations, Events, Webhooks, AI Interactions, Marketplace operations, and Audit Records preserve correlation and causation where applicable.

### 3.3 Tenant-safe telemetry

Logs, metrics, traces, alerts, and dashboards preserve Workspace isolation and minimize customer data. Observability access is Permission-controlled.

### 3.4 Telemetry is not source of truth

Operational signals describe system behavior. Canonical owners retain business state; Audit Service retains critical action history; Analytics Intake owns approved business-analysis inputs.

### 3.5 No secrets in telemetry

Credentials, tokens, secrets, keys, raw protected payloads, and unnecessary AI conversation content do not enter ordinary logs, metrics, traces, alerts, or dashboards.

### 3.6 Owner-aligned signals

Every signal identifies or resolves the component, domain, contract, and operation that owns the behavior. A shared observability layer does not obscure canonical ownership.

### 3.7 Actionable alerting

Alerts identify an observable condition, affected boundary, owner, severity, and response path. Alert volume alone is not reliability.

### 3.8 Measure customer journeys and contracts

Reliability includes the Business Architect Pipeline, Core Workspace Ready transition, Product Hub, subscription and installation, Setup Handoff, OS readiness coordination, Marketplace lifecycle, APIs, Events, and AI responses—not only process availability.

### 3.9 Version-aware diagnostics

API, Event, Marketplace Asset, AI Expert, Configuration Proposal, Rule, Knowledge, and relevant source versions are observable where they materially affect behavior.

### 3.10 Technology independence

Signal meaning, required context, ownership, security, and objectives remain stable if the implementation technology changes.

## 4. Responsibilities

### 4.1 Shared observability foundation

The shared Core observability foundation owns common signal contracts, correlation rules, access controls, retention-classification requirements, shared diagnostics, alert-routing foundations, and cross-boundary views.

It does not own domain facts or resource Authorization.

### 4.2 Canonical domain owner

Every domain:

- emits structured signals for its operations and dependencies;
- defines success and failure in domain terms;
- identifies critical customer journeys and contracts;
- owns diagnosis and remediation of its component behavior;
- protects sensitive data;
- correlates critical actions to Audit Records;
- supplies capacity and reliability indicators.

### 4.3 API Architecture and API Gateway

Own API boundary telemetry for request volume, latency, stable errors, versions, rate limits, routing, contract validation, and dependency behavior. Resource owners retain domain diagnostics.

### 4.4 Event producers and consumers

Producers observe publication; consumers observe delivery, validation, idempotency, processing, projection freshness, replay, and failure. Event transport does not own source facts.

### 4.5 AI Coordinator

Owns safe AI Interaction, provider, Expert, tool, policy, evidence, confidence, cost, latency, and failure telemetry without exposing unauthorized context.

### 4.6 Marketplace

Owns observability for Marketplace Asset and scoped Marketplace lifecycle, API behavior, dependency compatibility, and publisher/consumer boundaries.

### 4.7 Operating Systems

Each OS owns operational observability and exposes approved integration health and lifecycle signals to Core. An OS does not gain access to another OS's private telemetry.

### 4.8 Audit Service

Audit Service owns append-only Audit Records. Observability correlates to Audit but cannot replace, rewrite, or infer missing Audit history.

## 5. Architecture

### 5.1 Observability Philosophy

```text
User, service, API, Event, Marketplace, OS, or AI action
  → structured logs
  → metrics
  → distributed trace and correlation
  → health and diagnostics
  → dashboards and alerts
  → investigation and incident response

Critical action
  → append-only Audit Record
  ↔ correlation reference to operational telemetry
```

Observability answers:

- What happened operationally?
- Which domain and contract owned it?
- Which Workspace and approved scope were affected without exposing unauthorized data?
- Which version, dependency, and lifecycle state were involved?
- Where did time or failure accumulate?
- Is the behavior isolated, repeated, growing, or customer-impacting?
- What safe recovery path exists?

Audit answers who performed a critical action and preserves governance evidence. Canonical data answers the current business state. These responsibilities remain distinct.

### 5.2 Signal model

| Signal | Primary purpose | Not a replacement for |
|---|---|---|
| Structured log | Explain one operational occurrence with safe context | Audit Record or canonical business record |
| Metric | Quantify behavior over time | Per-action evidence or detailed diagnosis |
| Distributed trace | Show a correlated path and latency across boundaries | Authorization or data ownership |
| Health check | Report current ability of a component or dependency to serve its approved function | Core Workspace Ready or Operating System Ready |
| Service diagnostic | Support protected investigation and recovery | Public API or customer-facing error contract |
| Alert | Notify an owner of an actionable condition | Root-cause analysis or incident process |
| Dashboard | Present approved operational views for an audience | Canonical source of truth |
| Audit Record | Preserve append-only evidence of a critical action | General operational telemetry |

### 5.3 Structured Logging

Structured logs use stable fields and machine-readable meaning.

A log record includes, as applicable:

- occurred time;
- severity or operational importance;
- owning domain and component;
- operation or Event type;
- outcome and stable error code;
- correlation and trace identifiers;
- causation identifier where applicable;
- API or Event contract version;
- Long-Running Operation identifier where applicable;
- safe Workspace and organization references where policy permits;
- OS, Marketplace, AI Expert, provider, or dependency reference where applicable;
- duration or measured quantity;
- retry, idempotency, replay, or projection status;
- safe diagnostic detail.

Logging rules:

1. Logs are structured at the source rather than reconstructed from prose.
2. Canonical identifiers are used consistently.
3. Secrets, credentials, token values, keys, raw protected payloads, and unnecessary personal or Business data are excluded.
4. Authorization failure avoids disclosing resource existence or data.
5. Log severity is consistent enough to support alerting and diagnosis; exact levels remain deferred.
6. Logs from one Workspace are not exposed to another Workspace.
7. Logs are not edited to correct history; later diagnostic records explain corrections.
8. Retention and access follow future data-protection policy.

### 5.4 Metrics

Metrics quantify rates, totals, durations, sizes, saturation, failures, retries, and state distributions without carrying unrestricted high-detail payloads.

Metric categories include:

- request and operation volume;
- success, stable error, Authorization denial, validation failure, and dependency failure rates;
- latency and Long-Running Operation duration;
- Event publication, delivery, processing, duplication, replay, and projection lag;
- queue or pending work where later implemented;
- rate-limit and bounded-query behavior;
- Business Architect Pipeline stage and recovery behavior without exposing Business answers;
- Product Hub projection freshness and handoff outcomes;
- Marketplace installation, activation, update, rollback, and failure behavior;
- AI routing, provider/tool latency, policy outcomes, confidence distribution, token or usage cost where later approved, and failures;
- storage, search, analytics, and external dependency capacity;
- resource utilization and saturation according to future implementation.

Metrics do not become Business Analytics or Business Brain inputs automatically. Any such use follows Analytics Intake, Permission, purpose, and data-protection policy.

### 5.5 Distributed Tracing

Distributed tracing follows an operation across API Gateway, Core modules, Marketplace, OS Integration API, Event publication/consumption, Webhook delivery, Long-Running Operations, AI tools/providers, and approved external dependencies.

Tracing requirements:

- correlation begins at the accepted boundary or initiating internal operation;
- trace context crosses only approved contracts;
- each component records its own span or equivalent diagnostic boundary without claiming another owner's work;
- source, target, contract version, operation, outcome, and duration are visible;
- tenant and resource references are minimized and access-controlled;
- trace context is not Authorization;
- raw payloads, secrets, tokens, keys, and prompts are excluded;
- asynchronous Event causation remains correlated even when execution time is separated;
- replay and retry are distinguishable from the original business occurrence;
- sampling or retention choices cannot remove required Audit evidence.

Trace format, propagation mechanism, sampling, and storage remain deferred.

### 5.6 Health Checks

Health checks report whether a component can perform its approved technical responsibility.

Health covers, as applicable:

- component availability;
- ability to accept or complete approved operations;
- required dependency availability;
- contract and configuration validity;
- ability to reach canonical storage or approved external dependency;
- backlog or saturation severe enough to prevent service;
- Event publication or consumption path health;
- degraded versus unavailable behavior.

Technical health is not **Core Workspace Ready** or **Operating System Ready**. Those are business/platform lifecycle states with different owners and criteria.

Health endpoints or signals expose no secrets, tenant data, internal topology, or exploitable diagnostic detail to unauthorized callers. Exact check types, intervals, thresholds, and orchestration behavior remain deferred.

### 5.7 Service Diagnostics

Service diagnostics provide protected detail for investigation beyond public error responses and health summaries.

Diagnostics may include:

- configuration and contract version presence without secret values;
- dependency state and last successful interaction;
- Long-Running Operation state and recoverable failure;
- Event consumer position or projection freshness according to future implementation;
- rate-limit, retry, and idempotency status;
- provider or partner dependency state;
- data migration or compatibility status where later approved;
- safe resource ownership and scope references;
- recent correlated failures.

Diagnostics are Permission-controlled, tenant-safe, auditable where sensitive, and never exposed as an unrestricted Public Platform API.

### 5.8 Audit Correlation

Critical operations correlate operational telemetry with Audit Records.

Correlation rules:

- the initiating request or service action receives a correlation identifier;
- the canonical owner records the critical Audit Record;
- related API calls, Events, Long-Running Operations, Marketplace actions, AI Action Proposals, and OS handoffs preserve correlation or causation;
- telemetry may reference the Audit Record safely where policy permits;
- Audit Records do not store raw logs, traces, secrets, or unnecessary payloads;
- deleting or expiring telemetry never deletes required Audit history;
- replay, retry, correction, reversal, and incident actions generate distinguishable evidence.

### 5.9 Event Monitoring

Event monitoring covers producers, Event and Webhook API, consumers, projections, and replay.

Required visibility includes:

- publication success or failure;
- source domain, Event type, and contract version;
- tenant-safe scope and ordering boundary;
- delivery attempt and result where applicable;
- consumer contract validation;
- idempotency outcome and duplicate delivery;
- processing latency and failure;
- out-of-order or unsupported-version handling;
- projection lag and last successful update;
- replay authorization, range, progress, and failure;
- Webhook retry, pause, revocation, and endpoint failure;
- consumer backlog or saturation where applicable.

Event monitoring never treats transport success as consumer completion or source business success. Exact retention, retry, dead-letter, and alert thresholds remain deferred.

### 5.10 API Monitoring

API monitoring applies to every approved API surface.

It includes:

- request volume by surface, contract version, owner, and safe scope;
- latency and outcome;
- Authentication, Authorization, validation, and stable error categories;
- rate-limit and abuse-control decisions;
- pagination, filtering, sorting, field-selection, and bounded-query behavior;
- idempotency use, conflict, and replayed outcome;
- Long-Running Operation creation and completion;
- dependency latency and failure;
- deprecated-version usage and migration progress;
- gateway versus owning-domain failure location;
- response-size and capacity indicators where later approved.

API monitoring excludes credentials, tokens, secrets, protected payloads, and unauthorized field values.

### 5.11 AI Monitoring

AI monitoring makes AI coordination explainable, secure, and cost-aware without making telemetry an owner of AI or Business facts.

It includes, as permitted:

- AI Interaction volume, latency, outcome, and authorized scope classification;
- Request Interpreter intent and risk category without unnecessary raw conversation content;
- Expert and provider version selection;
- Context Builder source categories and size without protected values;
- Policy and Safety Engine decisions;
- Expert execution and Collaboration Orchestrator behavior;
- Evidence and Claim Validator results;
- confidence and explainability outcomes;
- AI Tool API calls, Permission failures, latency, and Action Proposals;
- provider failures, retries, capacity, and cost indicators;
- customer feedback and approved learning signals;
- data-protection, retention, residency, and tenant-isolation violations.

Raw prompts, responses, Business DNA, customer data, or provider payloads are not logged by default. Any retained content requires explicit future policy, purpose, Permission, minimization, and retention.

AI monitoring never authorizes a model action or promotes generated output into Knowledge, Rules, or Business DNA.

### 5.12 Marketplace Monitoring

Marketplace monitoring preserves Marketplace ownership and shared/scoped state separation.

It includes:

- Marketplace API request, latency, error, rate, and version behavior;
- Asset review and publication lifecycle diagnostics;
- Marketplace Asset Version adoption and compatibility;
- Workspace Purchase, Installation, Activation, Applicability, update, rollback, and scoped removal outcomes;
- dependency and target OS compatibility failures;
- declared Permission and Plan eligibility failures;
- Product Hub Marketplace Discovery Adapter and projection freshness;
- publisher, partner, and external dependency behavior where later approved;
- security, tenant-isolation, and unauthorized-access attempts;
- installation reversibility and recovery.

Marketplace telemetry never copies shared Asset content into Workspace-owned truth or exposes one Workspace's state to another.

### 5.13 Security Monitoring

Security monitoring observes:

- Authentication success, failure, recovery, revocation, and suspicious behavior;
- Workspace Membership, role, Permission, and access-assignment changes;
- Authorization denial patterns and scope mismatch;
- token, key, secret, service identity, Webhook, and administrative lifecycle actions without sensitive values;
- cross-Workspace access attempts;
- API and Event contract validation failures;
- AI policy, tool, provider, and tenant-boundary failures;
- Marketplace review, installation, and Permission violations;
- Audit availability and integrity failures;
- incident containment and recovery actions.

Detection rules, thresholds, anomaly models, retention, and response automation remain deferred and cannot bypass human and owning-domain authority.

### 5.14 Alerting

An alert represents an actionable deviation from an approved objective, invariant, security boundary, capacity threshold, or customer journey.

Alert requirements:

- identify owning component or domain;
- identify affected API, Event, Marketplace, OS, AI, security, or journey boundary;
- state severity and impact according to future policy;
- include safe correlation and diagnostic references;
- avoid secrets and customer payloads;
- reduce duplicate notifications without hiding independent failures;
- define acknowledgement, escalation, and resolution ownership;
- correlate to an incident when impact requires coordinated response;
- distinguish symptom from confirmed cause;
- close only when recovery is verified.

Alert channels, severity definitions, thresholds, routing, schedules, escalation times, and automation remain deferred.

### 5.15 Service Level Objectives

An SLO is an internal measurable reliability objective for a defined service, contract, or customer journey over a defined period.

Every future SLO identifies:

- owner;
- measured service, API, Event, projection, AI, Marketplace operation, or customer journey;
- eligible and excluded observations;
- success criterion;
- measurement source;
- time window;
- target;
- dependency assumptions;
- reporting audience;
- associated error budget.

Potential SLO subjects include API availability and latency, Event processing, projection freshness, Business Architect completion path, Product Hub lifecycle projection, Setup Handoff, Marketplace installation, AI response, and Audit availability.

No numeric SLO is approved in this document.

### 5.16 Service Level Agreements

An SLA is an external or commercial commitment derived from explicitly approved service scope and measurement.

SLA rules:

- an SLA is not created implicitly by an internal SLO or dashboard;
- commercial, legal, product, support, and architecture owners approve it through future governance;
- measurement definitions are unambiguous and auditable;
- dependencies, exclusions, remedies, and reporting are explicit;
- one OS or partner SLA does not silently become a platform-wide commitment;
- SLA commitments cannot weaken security, tenant isolation, data integrity, or human-control requirements.

No SLA or numeric commitment is approved in this document.

### 5.17 Error Budgets

An error budget is the allowable unreliability derived from an approved SLO over its measurement period.

Error-budget rules:

- budget belongs to the SLO and owner;
- consumption is measured from the same approved observations as the SLO;
- budget status informs release, reliability, capacity, and remediation decisions under future policy;
- separate services and journeys do not share one budget without explicit approval;
- security incidents, tenant leakage, ownership violations, corrupted Audit history, or immutable-asset mutation are not normalized as acceptable merely because budget remains;
- an exhausted budget does not authorize architecture bypass or hidden failure.

Thresholds, decision policy, exceptions, and reporting cadence remain deferred.

### 5.18 Dashboards

Dashboards present audience-specific operational views from approved telemetry.

Dashboard categories may include:

- platform and Core component health;
- API surface and contract versions;
- Event and projection behavior;
- Business Architect and Product Hub customer journeys;
- Marketplace lifecycle and dependencies;
- AI providers, Experts, tools, policy, confidence, cost, and failures;
- security and tenant-isolation conditions;
- SLO, SLA, and error budgets after approval;
- capacity and saturation;
- incident and recovery progress.

Dashboards preserve least privilege, tenant isolation, owner boundaries, data minimization, and safe aggregation. They are read models and never become sources of truth.

### 5.19 Capacity Planning

Capacity planning uses approved metrics and trends to prepare the platform for growth without changing domain architecture.

It evaluates:

- Workspace, Business, Business Unit, Branch, User, and OS growth;
- API request and Long-Running Operation demand;
- Event production, delivery, replay, and projection demand;
- storage, search, analytics, Audit, and telemetry growth;
- Marketplace Assets, installations, versions, and partner traffic;
- AI Interaction, Expert, provider, tool, context, and cost demand;
- external dependency limits;
- regional, country, privacy, and residency requirements when later approved;
- failure and recovery capacity;
- observed SLO and error-budget trends.

Capacity change may justify physical extraction only through evidence and ADR governance. Scaling cannot create shared OS databases, hidden tenant context, or technology-driven domain changes.

### 5.20 Observability Invariants

1. Every signal has an identifiable owner and purpose.
2. Telemetry never becomes canonical business truth.
3. Observability never replaces Audit Records.
4. Logs, metrics, traces, alerts, and dashboards preserve tenant isolation.
5. Secrets, token values, keys, credentials, and unnecessary protected payloads are excluded.
6. Correlation context is not Authorization.
7. Technical health is not Core Workspace Ready or Operating System Ready.
8. A successful Event delivery is not proof of consumer processing.
9. A successful API Gateway result is not proof of domain success.
10. AI telemetry does not authorize actions or own Business facts.
11. Marketplace telemetry does not own Marketplace state.
12. Dashboards and projections are disposable read models.
13. Numeric SLOs, SLAs, error budgets, alert thresholds, and retention require explicit future approval.

## 6. Ownership

| Observability concern | Canonical owner |
|---|---|
| Shared signal contracts, correlation, access foundation | Core observability foundation |
| Domain logs, metrics, diagnostics, health, and remediation | Canonical domain owner |
| API boundary telemetry | API Gateway and API Architecture; domain owner retains domain outcome |
| Event publication telemetry | Source domain |
| Event delivery infrastructure telemetry | Future approved Event infrastructure owner |
| Event consumer telemetry | Consuming domain |
| Audit Record | Audit Service |
| Marketplace monitoring | Marketplace bounded context |
| AI monitoring | AI Coordinator and owning AI Tool services |
| OS operational monitoring | Owning Operating System |
| SLO | Approved service or journey owner |
| SLA | Future approved commercial/legal/product owner set |
| Error budget | Owner of the associated approved SLO |
| Dashboard | Approved observability view owner; sources retain canonical ownership |

## 7. Relationships

### 7.1 API Philosophy

API monitoring uses stable surface, owner, contract version, context, outcome, error, rate, idempotency, and latency semantics defined by API Philosophy.

### 7.2 Security Model

Observability supports detection and incident response while applying least privilege, tenant isolation, secret exclusion, protected access, and retention policy.

### 7.3 Data Ownership

Telemetry references canonical data safely but never becomes a competing source of truth. Projections and dashboards remain disposable read models.

### 7.4 Permission Model

Observability access, service diagnostics, dashboards, replay, and administrative investigation require explicit Authentication and Authorization Context.

### 7.5 Event Architecture

Event monitoring follows source ownership, contract version, idempotency, ordering boundary, replay, consumer outcome, and projection freshness.

### 7.6 Business Brain and Analytics

Operational metrics do not enter Business Brain or customer analytics automatically. Approved Analytics Intake, purpose, Permission, anonymization, and data-protection policy govern any reuse.

## 8. Future Extension Points

Future approved documentation may define:

- telemetry schemas and field registry;
- logging levels, sampling, retention, and redaction;
- metric names, dimensions, aggregation, and cardinality limits;
- trace context, propagation, sampling, and storage;
- health-check types, thresholds, intervals, and exposure;
- diagnostic access and support workflows;
- Audit correlation and retention;
- Event lag, replay, retry, and dead-letter monitoring;
- API, AI, Marketplace, OS, and external-provider monitoring catalogs;
- alert severity, thresholds, routing, escalation, and on-call ownership;
- numeric SLOs, SLA commitments, error budgets, and reporting periods;
- dashboard audiences, access, and standard views;
- capacity models, forecasts, and scaling thresholds;
- incident detection, response, recovery, and exercise metrics;
- telemetry data residency, privacy, anonymization, and legal hold;
- observability implementation technology.

Material choices that alter ownership, contracts, security, or customer commitments require ADR approval.

## 9. References to Genesis

- [Constitution](../01-genesis/02-CONSTITUTION.md)
- [Business Brain](../01-genesis/06-BUSINESS-BRAIN.md)
- [AI Strategy](../01-genesis/08-AI-STRATEGY.md)
- [Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md)
- [Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md)
- [Product Hub](../01-genesis/13-PRODUCT-HUB.md)
- [Operating System Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)
- [Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

## 10. References to Governance

- [ADR Repository](../00-governance/ADR/README.md)
- [Canonical Glossary](../00-governance/glossary/GLOSSARY.md)
- [ADR-014 — Human Control](../00-governance/ADR/ADR-014-human-control-over-recommendations-and-ai.md)
- [ADR-020 — Product Hub Composition](../00-governance/ADR/ADR-020-product-hub-composition-not-data-ownership.md)
- [ADR-024 — Independent OS Domain Ownership](../00-governance/ADR/ADR-024-independent-operating-system-domain-ownership.md)
- [ADR-025 — Optional Contract-Based Integration](../00-governance/ADR/ADR-025-contract-based-optional-os-integration.md)
- [ADR-027 — Marketplace Bounded Context](../00-governance/ADR/ADR-027-marketplace-bounded-context-within-core.md)
- [ADR-029 — AI Downstream of Authorization](../00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md)
- [ADR-030 — AI Coordinator Separation](../00-governance/ADR/ADR-030-ai-coordinator-separated-orchestration.md)
- [ADR-034 — Explicit Tenant and Resource Scope](../00-governance/ADR/ADR-034-explicit-tenant-and-resource-scope.md)
- [ADR-035 — Technology-Independent Contracts](../00-governance/ADR/ADR-035-technology-independent-compatible-contracts.md)
- [ADR-036 — Contract-First API Architecture](../00-governance/ADR/ADR-036-contract-first-api-architecture.md)
- [ADR-038 — Append-Only Audit History](../00-governance/ADR/ADR-038-append-only-audit-history.md)

## 11. References to the Approved Proposal

- [Core Platform Architecture Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- Observability responsibilities: proposal Core Components, Business Architect, Product Hub, AI Coordinator, API Architecture, Navigation Architecture, Risks, and ADR-CP-013 through ADR-CP-020.

## 12. References to Core Platform Principles

- [Core Platform Architectural Principles](00-CORE-PLATFORM-PRINCIPLES.md)
- Primary principles: P-07, P-10, P-11, P-13, P-14, P-18 through P-20, P-25 through P-32, P-34 through P-39, P-43 through P-48.

## 13. References to Wave 1

- [Wave 1 README](README.md)
- [Core Platform Vision](01-CORE-PLATFORM-VISION.md)
- [Core Platform Architecture](02-CORE-PLATFORM-ARCHITECTURE.md)
- [Core Platform Domain Model](03-DOMAIN-MODEL.md)

## 14. References to Wave 2

- [Data Ownership](04-DATA-OWNERSHIP.md)
- [Permission Model](05-PERMISSION-MODEL.md)
- [Event Architecture](06-EVENT-ARCHITECTURE.md)
