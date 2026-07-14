# Business Brain Observability

**Document Type:** Business Brain Wave 3  
**Status:** Approved-baseline expansion  
**Architecture Baseline:** Business Brain Proposal v0.1.1  
**Core Platform Baseline:** Core Platform Architecture v1.0 / documentation baseline v1.0.1

## 1. Purpose

This document defines technology-independent observability for Business Brain. It establishes what must be visible across analysis, Decision completion, logical Contracts, Domain Events, candidate handoffs, read models, Security, and downstream AI boundaries without turning telemetry into business ownership.

## 2. Scope

This document covers structured logging boundaries, metrics, correlation and tracing, health monitoring, diagnostics, alerting principles, dashboards, capacity signals, and their relationship to Audit.

It does not select tools, vendors, storage, agents, protocols, dashboards, alert thresholds, service-level targets, or telemetry-retention periods.

## 3. Observability Principles

1. Observability explains system behavior; it does not own or alter business facts.
2. Every operation is attributable to explicit Workspace and Business scope without exposing unnecessary protected content.
3. Correlation spans logical Contracts, Domain Events, projections, and downstream handoffs.
4. Canonical references and versions are observable; raw source payloads are not logged by default.
5. Decision completion is distinguished from post-completion delivery and projection health.
6. A downstream failure never makes a completed Decision appear incomplete.
7. Security and tenant-boundary failures are visible without leaking denied data.
8. Health is reported per responsibility and dependency boundary, not as a single ambiguous status.
9. Metrics and traces support diagnosis, capacity planning, and quality review without becoming Decision evidence.
10. Audit Records and observability telemetry remain separate.

## 4. Ownership

Business Brain owns telemetry about its components, Decision completion, owned Contracts, owned Domain Events, and owned read models. Each external owner observes its own source, write model, and consumer behavior. Core Platform provides shared observability and Audit foundations. Audit Service owns Audit Records. Product Hub, Recommendation Engine, Configuration Engine, AI Coordinator, and each Operating System observe their own downstream processing.

Correlation connects those views but does not consolidate their ownership.

## 5. Observability Domains

### OD-01 — Analysis Request and Scope Resolution

Observe request acceptance, rejection, purpose, authorized Workspace and Business scope, idempotency intent, and causal origin. Do not log credentials or denied payload content.

### OD-02 — Source Dependency Resolution

Observe the availability, applicability, version selection, freshness indication, and access outcome for Business DNA, Knowledge, Rules, Capabilities, Analytics, Core settings, commercial context, and approved feedback. This visibility does not make Business Brain the source owner.

### OD-03 — Component Contribution

Observe participation, completion, validation, duration, failure category, and required-versus-optional contribution status for Business Analyzer, Capability Selector, Health Analyzer, Growth Advisor, Risk Analyzer, and Learning Interpreter. Do not log raw contribution content by default.

### OD-04 — Decision Completion and History

Observe invariant validation, Decision identity, scope, Decision version, source-version references, completion outcome, supersession relationship, and completion duration. A completed Decision is the canonical recovery anchor.

### OD-05 — Contract Boundary

Observe logical Contract identity, version, owner, consumer, validation result, authorization outcome, idempotency context, and compatibility failure. Telemetry must not expose full Contract content by default.

### OD-06 — Domain Event

Observe Business Brain Decision Completed, Business Brain Decision Superseded, and Recommendation Candidate Available publication and consumption status, ordering context, duplicate handling, replay, and consumer lag where measurable. Telemetry does not replace the Event fact.

### OD-07 — Candidate Handoff

Observe Recommendation Candidate and Configuration Input formation, submission, acknowledgment where defined, retry, and terminal handoff outcome. Recommendation and Configuration lifecycles remain observable by their respective owners.

### OD-08 — Read Model and Projection

Observe projection freshness, source position, rebuild progress, replay outcome, authorization filtering, stale state, and divergence indicators for all eleven approved logical read models. Projection health never changes canonical Decision status.

### OD-09 — Security and Audit Correlation

Observe authentication-context failure, authorization denial, scope mismatch, prohibited access, privileged operation, and Audit correlation. Security telemetry is minimized; Audit Service remains the owner of append-only Audit Records.

### OD-10 — Downstream AI Boundary and Capacity

Observe authorized transfer of completed Decision context to AI Coordinator, response status, isolation from canonical completion, and aggregate demand and capacity signals. AI prompts, model content, generated output, and provider details are not logged by Business Brain by default.

## 6. Structured Logging Boundaries

Structured logs should identify, where applicable:

- correlation and causation references;
- actor or service identity reference;
- Workspace and Business scope references;
- component, Contract, Event, or read-model identifier;
- Decision and source-version references;
- operation category and outcome;
- failure category and retry indication;
- timing and freshness metadata; and
- Audit correlation reference for consequential actions.

Logs must not contain raw Business DNA, Knowledge content, operational payloads, secrets, credentials, full Event or Contract payloads, AI prompts, or AI-generated content by default. Any approved diagnostic exception must be purpose-bound, minimized, authorized, time-bounded, and auditable.

## 7. Metrics

Metrics describe behavior without establishing target values in this Wave.

| Metric area | Examples of logical measures |
|---|---|
| Demand | Analysis requests by authorized scope and purpose |
| Completion | Completed, rejected, failed-before-completion, and superseding analyses |
| Duration | Source resolution, component contribution, validation, completion, handoff, and projection update duration |
| Dependency | Availability, access failures, stale references, and applicability failures by canonical owner |
| Quality | Invariant failures, missing required contributions, conflicts, uncertainty presence, and reproducibility checks |
| Contracts | Validation, version compatibility, authorization, duplicate, and handoff outcomes |
| Events | Publication, consumption, replay, ordering, duplicate, and lag indicators |
| Projections | Freshness, rebuild, divergence, authorization filtering, and stale-view indicators |
| Security | Denial and scope-mismatch counts without sensitive dimensions |
| Capacity | Request volume, concurrent work, contribution demand, projection workload, and downstream pressure |

Metrics must not rank Businesses in ways not approved by the business purpose or expose cross-tenant information.

## 8. Correlation and Tracing

A logical trace follows one causal journey:

```text
Authorized Analysis Request
→ Source Resolution
→ Component Contributions
→ Decision Validation
→ Decision Completion
→ Owned Domain Events
→ Candidate Handoffs
→ Projection Updates
→ Optional Downstream AI Consumption
```

Trace context preserves causation across owner boundaries while each owner remains responsible for its own work. A trace identifier is diagnostic metadata, not aggregate identity, Event identity, Permission, or idempotency proof. Tracing must distinguish the canonical completion boundary from downstream activity.

## 9. Health Monitoring

Health is evaluated at separate logical boundaries:

- **Business Brain readiness:** ability to accept authorized work;
- **source dependency health:** ability to access required canonical sources;
- **component health:** ability to produce and validate required contributions;
- **Decision completion health:** ability to enforce aggregate invariants and commit immutable Decisions;
- **Contract and Event health:** ability to exchange approved logical information;
- **projection health:** freshness and rebuildability of read models;
- **downstream handoff health:** delivery to Recommendation Engine and Configuration Engine; and
- **optional AI boundary health:** downstream AI availability without Decision dependency.

A degraded optional consumer does not make Business Brain Decision completion unhealthy. A required source or required contribution failure prevents completion and is reported distinctly.

## 10. Diagnostics

Diagnostics must answer:

- which authorized request and scope initiated the work;
- which canonical source versions were selected;
- which required contribution failed or was absent;
- whether a Decision completed and which invariants were evaluated;
- whether failure occurred before or after completion;
- which Contract or Event boundary failed;
- which projection is stale or rebuilding;
- whether a retry or replay is safe and idempotent; and
- whether an issue belongs to Business Brain or an external owner.

Diagnostics cannot edit canonical state or silently replay consequential downstream actions.

## 11. Alerting and Escalation Principles

Alerts should be actionable, owner-routed, deduplicated, scope-safe, and classified by affected boundary. Conditions may include sustained completion failure, required-source unavailability, invariant failure, tenant-isolation violation, Event or Contract incompatibility, projection divergence, replay failure, and sustained downstream handoff failure.

Alert thresholds, escalation paths, notification channels, and response times remain deferred. AI Coordinator degradation is reported independently unless it affects its own downstream commitment; it never blocks or invalidates the canonical Decision.

## 12. Dashboards and Reporting

Logical dashboard views should cover:

- request demand and Decision completion;
- dependency and component health;
- Contract and Domain Event behavior;
- candidate handoff outcomes;
- projection freshness and rebuilds;
- Security and Audit correlation;
- downstream owner health; and
- capacity and trend indicators.

Views must enforce tenant and administrative scope. Operational dashboards are observability views, not Product Hub business projections or canonical Analytics facts.

## 13. SLO, SLA, and Error Budgets

Service-level objectives, service-level agreements, measurement windows, target values, and error budgets are not approved in the Business Brain baseline. When introduced, they must:

- distinguish Decision completion from downstream delivery and projection freshness;
- assign each measure to one accountable owner;
- avoid making optional AI a Decision-availability dependency;
- use measurable approved indicators; and
- enter through Governance without changing domain ownership.

## 14. Capacity Planning

Capacity planning uses observed request volume, Business and Workspace distribution, source-resolution demand, component workload, Decision completion duration, Event and projection workload, read demand, retry pressure, and downstream handoff pressure. Planning preserves tenant isolation and independent owner scaling. It does not preselect runtime topology or technology.

## 15. Observability Invariants

1. Telemetry is never canonical Business Brain data.
2. Audit Records are not replaced by logs or traces.
3. Raw protected content is not logged by default.
4. Every completed Decision is distinguishable from downstream processing.
5. Correlation never transfers ownership.
6. Tenant scope applies to telemetry access and aggregation.
7. Read-model freshness never changes Decision truth.
8. Replay and retry are observable and idempotent.
9. Optional AI failure never degrades canonical Decision correctness.
10. Observability cannot authorize or execute business action.

## 16. Remaining Deferred Decisions

This document preserves deferral of:

- telemetry implementation, storage, transport, and retention;
- exact log fields and approved diagnostic-content exceptions;
- metric names, dimensions, aggregation windows, and target values;
- tracing propagation mechanism and sampling policy;
- health interfaces and dependency-status representation;
- alert thresholds, escalation paths, and incident procedures;
- dashboard implementation and access roles;
- SLO, SLA, error-budget definitions, and ownership targets;
- capacity thresholds and scaling triggers; and
- evaluation-operation state and its possible operational telemetry model.

## 17. References

- `docs/00-governance/`
- `docs/01-genesis/`
- `docs/02-core-platform/00-CORE-PLATFORM-PRINCIPLES.md`
- `docs/02-core-platform/09-OBSERVABILITY.md`
- `docs/99-architecture-freeze/`
- `docs/03-BUSINESS-BRAIN-PROPOSAL.md`
- `docs/03-business-brain/03-BUSINESS-BRAIN-PROPOSAL-PATCH-v0.1.1.md`
- `docs/03-BUSINESS-BRAIN-ARCHITECTURE-REREVIEW.md`
- `docs/03-business-brain/02-BUSINESS-BRAIN-ARCHITECTURE.md`
- `docs/03-business-brain/04-BUSINESS-BRAIN-DATA-OWNERSHIP.md`
- `docs/03-business-brain/05-BUSINESS-BRAIN-CONTRACTS.md`
- `docs/03-business-brain/06-BUSINESS-BRAIN-EVENTS.md`
- `docs/03-business-brain/07-BUSINESS-BRAIN-READ-MODELS.md`
