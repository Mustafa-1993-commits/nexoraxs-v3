# Core Platform Architecture v1.0 Freeze

## 1. Executive Summary

| Field | Value |
|---|---|
| Architecture Version | Core Platform Architecture v1.0 |
| Documentation Baseline | Core Platform Documentation Baseline v1.0.1 |
| Freeze Date | 2026-07-12 |
| Status | **FROZEN — READY FOR MILESTONE 2** |
| Milestone | Milestone 1 — Core Platform Architecture |
| Overall Architecture Score | **90 / 100** |
| Readiness Score | **83 / 100** |
| Architecture Review Recommendation | **Approved with Recommendations** |
| Readiness Status | **READY WITH MINOR IMPROVEMENTS** |

Core Platform Architecture v1.0 is the official release baseline produced by Milestone 1. It freezes the approved logical architecture, canonical terminology, ownership boundaries, principles, contracts, governance decisions, and evolution rules documented by Genesis v1.1, the Governance Foundation, the approved Core Platform Architecture Proposal v0.2, Core Platform Principles, Waves 1–4, and the approved Architecture Quality Review.

This freeze does not claim that every implementation decision is complete. The approved Architecture Review found the architecture internally consistent and ready for bounded implementation while preserving an explicit register of decisions that must be resolved before their affected production scope is finalized.

This document records the baseline. It does not add, reinterpret, or replace architecture.

### Freeze Alignment Patch v1.0.1

Core Platform Documentation Baseline v1.0.1 supersedes the previous documentation baseline.

Architecture version remains **Core Platform v1.0**.

- No architectural decision changed.
- No ADR changed.
- Only Freeze Alignment corrections were applied.

The approved alignment corrects the Wave 4 Roadmap to use the frozen Business Architect Pipeline component names and the accepted Implementation Option definition. The patch introduces no new architecture and remains fully backward-compatible.

## 2. Frozen Scope

The following 78 documents constitute Core Platform Architecture v1.0. Their authority follows the existing source hierarchy: Genesis remains ultimate authority; accepted Governance ADRs record approved decisions; the approved Proposal freezes the Core interpretation; Principles and Waves 1–4 expand it; the Architecture Review records the Milestone 1 quality gate.

### 2.1 Governance Foundation — 42 documents

#### ADR governance

1. `docs/00-governance/ADR/README.md`

#### Accepted Architecture Decision Records

2. `docs/00-governance/ADR/ADR-001-business-operating-intelligence-platform.md`
3. `docs/00-governance/ADR/ADR-002-core-shared-control-intelligence-plane.md`
4. `docs/00-governance/ADR/ADR-003-workspace-customer-multi-business-boundary.md`
5. `docs/00-governance/ADR/ADR-004-genesis-organization-hierarchy.md`
6. `docs/00-governance/ADR/ADR-005-business-dna-business-scoped-software-independent.md`
7. `docs/00-governance/ADR/ADR-006-workspace-intelligence-explicit-aggregation.md`
8. `docs/00-governance/ADR/ADR-007-capabilities-before-industries.md`
9. `docs/00-governance/ADR/ADR-008-modules-implement-capabilities.md`
10. `docs/00-governance/ADR/ADR-009-shared-versioned-immutable-knowledge.md`
11. `docs/00-governance/ADR/ADR-010-knowledge-packs-additive-immutable.md`
12. `docs/00-governance/ADR/ADR-011-deterministic-versioned-explainable-rules.md`
13. `docs/00-governance/ADR/ADR-012-business-brain-decision-engine.md`
14. `docs/00-governance/ADR/ADR-013-capability-first-explainable-recommendations.md`
15. `docs/00-governance/ADR/ADR-014-human-control-over-recommendations-and-ai.md`
16. `docs/00-governance/ADR/ADR-015-infer-before-asking-conversational-configuration.md`
17. `docs/00-governance/ADR/ADR-016-business-architect-governed-pipeline.md`
18. `docs/00-governance/ADR/ADR-017-configuration-proposals-respect-domain-ownership.md`
19. `docs/00-governance/ADR/ADR-018-separate-core-and-os-readiness.md`
20. `docs/00-governance/ADR/ADR-019-product-hub-discovery-and-os-handoff.md`
21. `docs/00-governance/ADR/ADR-020-product-hub-composition-not-data-ownership.md`
22. `docs/00-governance/ADR/ADR-021-mandatory-workspace-entitlement.md`
23. `docs/00-governance/ADR/ADR-022-independent-os-subscriptions-and-canonical-plans.md`
24. `docs/00-governance/ADR/ADR-023-workspace-subscription-business-unit-operation.md`
25. `docs/00-governance/ADR/ADR-024-independent-operating-system-domain-ownership.md`
26. `docs/00-governance/ADR/ADR-025-contract-based-optional-os-integration.md`
27. `docs/00-governance/ADR/ADR-026-standard-operating-system-lifecycle.md`
28. `docs/00-governance/ADR/ADR-027-marketplace-bounded-context-within-core.md`
29. `docs/00-governance/ADR/ADR-028-immutable-marketplace-assets-scoped-state.md`
30. `docs/00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md`
31. `docs/00-governance/ADR/ADR-030-ai-coordinator-separated-orchestration.md`
32. `docs/00-governance/ADR/ADR-031-coordinated-ai-expert-network.md`
33. `docs/00-governance/ADR/ADR-032-governed-ai-and-platform-learning.md`
34. `docs/00-governance/ADR/ADR-033-enforced-modular-monolith.md`
35. `docs/00-governance/ADR/ADR-034-explicit-tenant-and-resource-scope.md`
36. `docs/00-governance/ADR/ADR-035-technology-independent-compatible-contracts.md`
37. `docs/00-governance/ADR/ADR-036-contract-first-api-architecture.md`
38. `docs/00-governance/ADR/ADR-037-context-preserving-navigation.md`
39. `docs/00-governance/ADR/ADR-038-append-only-audit-history.md`
40. `docs/00-governance/ADR/ADR-039-data-driven-configurable-platform-assets.md`
41. `docs/00-governance/ADR/ADR-040-core-organization-identity-os-operational-data.md`

#### Canonical terminology

42. `docs/00-governance/glossary/GLOSSARY.md`

### 2.2 Genesis v1.1 — 20 documents

43. `docs/01-genesis/01-VISION.md`
44. `docs/01-genesis/02-CONSTITUTION.md`
45. `docs/01-genesis/03-BUSINESS-DNA.md`
46. `docs/01-genesis/04-CAPABILITIES.md`
47. `docs/01-genesis/05-KNOWLEDGE-ENGINE.md`
48. `docs/01-genesis/06-BUSINESS-BRAIN.md`
49. `docs/01-genesis/07-RECOMMENDATION-ENGINE.md`
50. `docs/01-genesis/08-AI-STRATEGY.md`
51. `docs/01-genesis/09-PLATFORM-BLUEPRINT.md`
52. `docs/01-genesis/10-NEXORAXS-ONTOLOGY.md`
53. `docs/01-genesis/11-CUSTOMER-JOURNEY.md`
54. `docs/01-genesis/12-WORKSPACE-LIFECYCLE.md`
55. `docs/01-genesis/13-PRODUCT-HUB.md`
56. `docs/01-genesis/14-SUBSCRIPTION-MODEL.md`
57. `docs/01-genesis/15-BUSINESS-LIFECYCLE.md`
58. `docs/01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md`
59. `docs/01-genesis/17-MARKETPLACE-ARCHITECTURE.md`
60. `docs/01-genesis/18-KNOWLEDGE-PACKS.md`
61. `docs/01-genesis/19-AI-EXPERT-NETWORK.md`
62. `docs/01-genesis/20-PLATFORM-ECOSYSTEM.md`

### 2.3 Approved Core Platform Architecture Proposal — 1 document

63. `docs/02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md`

The Proposal is frozen and approved as version 0.2. Its historical in-document review metadata does not change its approved authority; the approved Architecture Review records that metadata issue as documentation inconsistency I-02 with no architectural impact.

### 2.4 Core Platform index and Principles — 2 documents

64. `docs/02-core-platform/README.md`
65. `docs/02-core-platform/00-CORE-PLATFORM-PRINCIPLES.md`

### 2.5 Wave 1 — 3 documents

66. `docs/02-core-platform/01-CORE-PLATFORM-VISION.md`
67. `docs/02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md`
68. `docs/02-core-platform/03-DOMAIN-MODEL.md`

### 2.6 Wave 2 — 3 documents

69. `docs/02-core-platform/04-DATA-OWNERSHIP.md`
70. `docs/02-core-platform/05-PERMISSION-MODEL.md`
71. `docs/02-core-platform/06-EVENT-ARCHITECTURE.md`

### 2.7 Wave 3 — 3 documents

72. `docs/02-core-platform/07-API-PHILOSOPHY.md`
73. `docs/02-core-platform/08-SECURITY-MODEL.md`
74. `docs/02-core-platform/09-OBSERVABILITY.md`

### 2.8 Wave 4 — 3 documents

75. `docs/02-core-platform/10-DEPLOYMENT-MODEL.md`
76. `docs/02-core-platform/11-TECHNOLOGY-STACK.md`
77. `docs/02-core-platform/12-CORE-PLATFORM-ROADMAP.md`

### 2.9 Architecture Review — 1 document

78. `docs/02-core-platform/99-CORE-PLATFORM-ARCHITECTURE-REVIEW.md`

## 3. Frozen Architectural Decisions

All 40 accepted Governance ADRs are part of this freeze. The following groups summarize their decisions without replacing the complete ADR text.

### 3.1 Platform identity, Core boundary, and organization

- Nexoraxs is a Business Operating Intelligence Platform whose purpose is to understand a Business and help it operate better, not to maximize application count. See `ADR-001`.
- Core Platform is the shared control and intelligence plane for identity, organization, commercial control, platform governance, Business DNA, Knowledge, Rules, Capabilities, Business Brain, Recommendations, configuration coordination, Product Hub, Marketplace governance, shared services, and AI coordination. See `ADR-002`.
- Workspace is the customer and tenant boundary and may contain multiple Businesses. See `ADR-003`.
- The canonical organization hierarchy is Workspace → Business → Business Unit → Department and Branch. See `ADR-004`.
- Each Business owns exactly one Business DNA identity. Business DNA is Business-scoped, versioned, and software-independent. See `ADR-005`.
- Workspace-level intelligence is an explicit aggregation of Business-scoped intelligence and never a competing Business DNA. See `ADR-006`.

Related ADRs:

- `docs/00-governance/ADR/ADR-001-business-operating-intelligence-platform.md`
- `docs/00-governance/ADR/ADR-002-core-shared-control-intelligence-plane.md`
- `docs/00-governance/ADR/ADR-003-workspace-customer-multi-business-boundary.md`
- `docs/00-governance/ADR/ADR-004-genesis-organization-hierarchy.md`
- `docs/00-governance/ADR/ADR-005-business-dna-business-scoped-software-independent.md`
- `docs/00-governance/ADR/ADR-006-workspace-intelligence-explicit-aggregation.md`

### 3.2 Capabilities, Knowledge, Rules, intelligence, and configuration

- Business needs are modeled as Capabilities before industries or software; Modules implement Capabilities but do not redefine them. See `ADR-007` and `ADR-008`.
- Knowledge is shared, governed, versioned, and immutable after publication. Knowledge Packs extend it additively through immutable versions and scoped activation. See `ADR-009` and `ADR-010`.
- Rules are deterministic, versioned, explainable, and separate from AI. See `ADR-011`.
- Business Brain is the explainable decision engine and owns neither source Knowledge nor Operating System software. See `ADR-012`.
- Recommendations are Capability-first, evidence-based, confidence-aware, and explainable. See `ADR-013`.
- Humans retain authority over material Business facts, Recommendations, AI output, configuration, and consequential actions. See `ADR-014`.
- Business understanding infers authorized information before asking and uses a governed conversational flow. See `ADR-015`.
- Business Architect is a governed pipeline that culminates in reviewed Business DNA publication. See `ADR-016`.
- Configuration crosses ownership boundaries as a versioned Configuration Proposal; the owning target validates and applies its state. See `ADR-017`.
- Core Workspace Ready and Operating System Ready are separate outcomes with separate conditions. See `ADR-018`.

Related ADRs:

- `docs/00-governance/ADR/ADR-007-capabilities-before-industries.md`
- `docs/00-governance/ADR/ADR-008-modules-implement-capabilities.md`
- `docs/00-governance/ADR/ADR-009-shared-versioned-immutable-knowledge.md`
- `docs/00-governance/ADR/ADR-010-knowledge-packs-additive-immutable.md`
- `docs/00-governance/ADR/ADR-011-deterministic-versioned-explainable-rules.md`
- `docs/00-governance/ADR/ADR-012-business-brain-decision-engine.md`
- `docs/00-governance/ADR/ADR-013-capability-first-explainable-recommendations.md`
- `docs/00-governance/ADR/ADR-014-human-control-over-recommendations-and-ai.md`
- `docs/00-governance/ADR/ADR-015-infer-before-asking-conversational-configuration.md`
- `docs/00-governance/ADR/ADR-016-business-architect-governed-pipeline.md`
- `docs/00-governance/ADR/ADR-017-configuration-proposals-respect-domain-ownership.md`
- `docs/00-governance/ADR/ADR-018-separate-core-and-os-readiness.md`

### 3.3 Product Hub, commercial lifecycle, and independent Operating Systems

- Product Hub owns discovery, lifecycle composition, setup handoff, launch, and recovery navigation. It does not own source data or OS-specific setup. See `ADR-019` and `ADR-020`.
- Workspace Entitlement is mandatory and distinct from independent OS Subscriptions and canonical Plans. See `ADR-021` and `ADR-022`.
- OS Subscription is Workspace-scoped; operational use is scoped through the applicable Business Unit and other explicit context. See `ADR-023`.
- Every Operating System owns its operational domain and remains independently usable. See `ADR-024`.
- Cross-OS integration is optional and contract-based; no direct cross-OS database access or core-workflow dependency is allowed. See `ADR-025`.
- The OS lifecycle preserves distinct selection, subscription, installation, setup, configuration, activation, readiness, operation, pause, archive, and removal concepts. See `ADR-026`.

Related ADRs:

- `docs/00-governance/ADR/ADR-019-product-hub-discovery-and-os-handoff.md`
- `docs/00-governance/ADR/ADR-020-product-hub-composition-not-data-ownership.md`
- `docs/00-governance/ADR/ADR-021-mandatory-workspace-entitlement.md`
- `docs/00-governance/ADR/ADR-022-independent-os-subscriptions-and-canonical-plans.md`
- `docs/00-governance/ADR/ADR-023-workspace-subscription-business-unit-operation.md`
- `docs/00-governance/ADR/ADR-024-independent-operating-system-domain-ownership.md`
- `docs/00-governance/ADR/ADR-025-contract-based-optional-os-integration.md`
- `docs/00-governance/ADR/ADR-026-standard-operating-system-lifecycle.md`

### 3.4 Marketplace

- Marketplace is a bounded context within the Core Platform offering and not an undifferentiated responsibility of Product Hub or other Core modules. See `ADR-027`.
- Marketplace Assets are shared; published Marketplace Asset Versions are immutable; acquisition, installation, configuration, activation, entitlement, and Business assignment remain separate and scoped. See `ADR-028`.

Related ADRs:

- `docs/00-governance/ADR/ADR-027-marketplace-bounded-context-within-core.md`
- `docs/00-governance/ADR/ADR-028-immutable-marketplace-assets-scoped-state.md`

### 3.5 AI

- AI is downstream of approved Business DNA, Knowledge, deterministic Rules, Authorization, and owner-controlled data. See `ADR-029`.
- AI coordination is decomposed into explicit context, policy, routing, orchestration, validation, explanation, proposal, and feedback responsibilities. See `ADR-030`.
- AI Experts form a coordinated network that returns governed, evidence-based assistance rather than independent ungoverned truth. See `ADR-031`.
- Learning is governed and cannot directly modify Business DNA, Knowledge, or Rules. See `ADR-032`.

Related ADRs:

- `docs/00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md`
- `docs/00-governance/ADR/ADR-030-ai-coordinator-separated-orchestration.md`
- `docs/00-governance/ADR/ADR-031-coordinated-ai-expert-network.md`
- `docs/00-governance/ADR/ADR-032-governed-ai-and-platform-learning.md`

### 3.6 Architecture, contracts, navigation, audit, configuration, and organization ownership

- Core begins as an enforced modular monolith. Logical boundaries are preserved in code, ownership, data access, contracts, and observability; physical extraction is evidence-driven. See `ADR-033`.
- Tenant and resource scope are explicit for every protected read, write, Event, search, analytics query, AI context, and navigation handoff. See `ADR-034`.
- Architecture contracts are technology-independent, explicitly versioned, and backward-compatible. See `ADR-035`.
- API Architecture is contract-first and exposes governed surfaces without turning the gateway into a domain owner. See `ADR-036`.
- Navigation preserves visible context, reauthorizes switches and deep links, and separates Core, Marketplace, and OS-owned movement. See `ADR-037`.
- Audit history is append-only and correlated with consequential activity. See `ADR-038`.
- Business Knowledge, Rules, questions, Recommendations, Capabilities, and configuration metadata are data-driven and versioned whenever possible. See `ADR-039`.
- Core Organization Registry owns canonical Business Unit, Department, and Branch identities and parent relationships; each OS owns operational data and behavior scoped to those identifiers. See `ADR-040`.

Related ADRs:

- `docs/00-governance/ADR/ADR-033-enforced-modular-monolith.md`
- `docs/00-governance/ADR/ADR-034-explicit-tenant-and-resource-scope.md`
- `docs/00-governance/ADR/ADR-035-technology-independent-compatible-contracts.md`
- `docs/00-governance/ADR/ADR-036-contract-first-api-architecture.md`
- `docs/00-governance/ADR/ADR-037-context-preserving-navigation.md`
- `docs/00-governance/ADR/ADR-038-append-only-audit-history.md`
- `docs/00-governance/ADR/ADR-039-data-driven-configurable-platform-assets.md`
- `docs/00-governance/ADR/ADR-040-core-organization-identity-os-operational-data.md`

## 4. Deferred Decisions

Deferred decisions are intentional boundaries of this freeze. They do not weaken the frozen architecture and must not be resolved implicitly by code, framework defaults, vendor selection, or later documentation. The approved Architecture Review identifiers `D-01` through `D-42` remain the canonical deferred-decision register.

### 4.1 Infrastructure

- **D-41:** Event infrastructure, schema technology, naming, registry, complete Event catalog, delivery guarantees, ordering and partition mechanisms, idempotency storage, retry, dead-letter handling, replay, retention, and Webhook delivery infrastructure.
- **D-42:** Observability technology, telemetry schemas, redaction, sampling, retention, health checks, alerting and on-call mechanisms, numeric SLO/SLA/error budgets, dashboards, and capacity thresholds.
- Hosting provider, regions, network topology, compute model, packaging, orchestration, delivery pipeline, environment count, secret-management infrastructure, and encryption/key infrastructure remain unselected.

### 4.2 Technology

- **D-01–D-09:** Public and Partner API eligibility and access; endpoint paths, protocol, serialization, schemas, API catalog, version negotiation, error envelope, pagination, filtering, sorting, idempotency implementation, numeric rate limits, and Webhook mechanisms.
- Backend and frontend frameworks, languages, runtimes, package layout, rendering model, state management, UI library, and build tooling remain unselected.
- Database, cache, queue, object storage, and search products and their physical mechanisms remain unselected.
- Authentication products, transport and schema technologies, API gateway technology, AI SDKs, testing tools, coding tools, versioning tools, and conformance tooling remain unselected.
- The approved architectural standards in the Technology Stack remain mandatory regardless of later selections.

### 4.3 AI

- **D-36:** AI Expert and model-provider eligibility, contracts, fallback, and service boundaries.
- **D-37:** AI data residency, retention, conversation retention, provider data use, and deletion.
- **D-38:** Model and Expert evaluation, adversarial testing, content safety, evidence quality, and release criteria.
- **D-39:** Approved feedback, anonymous learning, consent, minimization, re-identification prevention, and Knowledge promotion workflow.
- **D-40:** AI capacity, provider limits, cost policy, SLO, error budget, and degradation behavior.

### 4.4 Marketplace

- **D-31:** Publisher, developer, partner, and Marketplace administrative identity models.
- **D-32:** Technical, security, business, UX, performance, and compatibility certification criteria.
- **D-33:** Marketplace sandbox, arbitrary code isolation, testing, and Permission enforcement mechanisms.
- **D-34:** Pricing, licensing, subscriptions, one-time purchase, usage billing, settlement, and revenue sharing.
- **D-35:** Marketplace incident handling, support, SLOs, installation recovery, and partner operational policy.

### 4.5 Deployment

- **D-22:** Organization Registry write authority and transaction protocol during OS-specific setup.
- **D-23:** The canonical model that replaces or evolves legacy `OSEnablement` while preserving separate lifecycle concepts.
- **D-24:** Minimum Core Business DNA, confirmation materiality, correction, snapshot mutation, session duration, and concurrent editing.
- **D-25:** Which Configuration Proposals may apply automatically and which require explicit customer review.
- **D-26:** Exact Workspace Entitlement and OS Subscription states, Plan limits, trials, bundles, and commercial recovery behavior.
- **D-27:** Physical aggregates, transaction boundaries, database schemas, indexing, partitioning, and concurrency mechanisms.
- **D-28:** Physical module/package map, deployment topology, scaling boundaries, and extraction triggers.
- **D-29:** Migration, rollback, backup, restore, disaster recovery, recovery objectives, and historical-data retention.
- **D-30:** Canonical subdomain, URL, deep-link, context selector, navigation return, and Setup Handoff conventions.

### 4.6 Operations

- **D-10–D-13:** Authentication methods and providers, session mechanisms, tokens, service identity, credentials, rotation, audience, and workload mechanisms.
- **D-14–D-16:** Secret storage and delivery, encryption, key storage, rotation, revocation, emergency procedures, and historical verification.
- **D-17–D-18:** Role and Permission catalogs, direct grants, explicit deny, role composition, delegation, emergency access, expiry, approval, revocation, and Audit policy.
- **D-19:** Data classification, privacy, retention, deletion, anonymization, residency, export, and legal hold.
- **D-20:** Incident roles, severity, runbooks, notification obligations, recovery targets, and exercises.
- **D-21:** Jurisdiction-specific compliance controls and certifications.
- Operational ownership, release gates, backup schedules, restore verification, high-availability topology, on-call arrangements, service objectives, capacity thresholds, and production runbooks remain deferred where not already covered by `D-29`, `D-41`, and `D-42`.

## 5. Architecture Guarantees

Future milestones, specifications, implementations, technology selections, and ADRs MUST preserve the following guarantees unless an explicitly approved architecture change supersedes this freeze.

### 5.1 Workspace and organization hierarchy

1. Workspace remains the customer and tenant boundary.
2. The canonical hierarchy remains Workspace → Business → Business Unit → Department and Branch.
3. Business and Business Unit remain distinct concepts.
4. Core Organization Registry remains the owner of canonical Business Unit, Department, and Branch identities and parent relationships.
5. Operating Systems remain owners of operational data and behavior scoped to canonical organization identifiers.

### 5.2 Domain and data ownership

1. Every canonical concept has one accountable owner and source of truth.
2. Only the owning domain writes its canonical aggregate or validates a requested change through its contract.
3. Read models, Product Hub Projection, Workspace Intelligence Aggregation, search indexes, analytics views, caches, dashboards, and AI context are not sources of truth.
4. No Operating System reads or writes another Operating System's database.
5. Cross-domain references use stable identifiers and governed contracts rather than duplicated ownership.

### 5.3 Business DNA, Knowledge, Rules, and intelligence

1. Each Business owns exactly one Business DNA identity.
2. Business DNA remains Business-scoped and describes the Business, never software selection or configuration.
3. Workspace intelligence remains an explicit aggregation.
4. Knowledge remains shared, governed, versioned, and immutable after publication.
5. Knowledge Packs remain additive and published versions remain immutable.
6. Rules remain deterministic, versioned, explainable, and separate from AI.
7. Recommendations remain Capability-first, evidence-based, confidence-aware, explainable, and subject to human authority.
8. Configuration crossing ownership boundaries remains a proposal that the owning target validates and applies.

### 5.4 Product Hub and lifecycle

1. Product Hub remains a Core Platform component responsible for discovery, lifecycle composition, handoff, launch, and recovery navigation.
2. Product Hub does not own product source records, subscription source records, Marketplace Assets, Business DNA, or OS setup and operational data.
3. Availability, Recommendation, entitlement, subscription, installation, setup, configuration, activation, readiness, operation, pause, archive, and removal remain distinct where approved.
4. Core Workspace Ready and Operating System Ready remain separate readiness outcomes.

### 5.5 Marketplace

1. Marketplace remains a bounded context within the Core Platform offering.
2. Marketplace remains distinct from Product Hub composition and from OS operational ownership.
3. Marketplace Assets are shared; published Marketplace Asset Versions are immutable.
4. Acquisition, installation, configuration, activation, entitlement, and Business Assignment remain separate and scoped.
5. Marketplace installation never bypasses target-domain validation, Compatibility Rules, Permission, or approved human-control policy.

### 5.6 AI Coordinator

1. AI remains downstream of approved Business DNA, Knowledge, Rules, Permission, evidence, and owner-controlled data.
2. AI Coordinator retains explicit context-building, policy filtering, Expert registration and routing, orchestration, validation, explanation, Action Proposal, and governed-feedback responsibilities.
3. AI Experts use narrow, authorized AI Tool API contracts and never receive unrestricted service or database access.
4. AI does not own or directly modify Business DNA, Knowledge, Rules, Marketplace state, or OS operational state.
5. Consequential actions remain proposals until the owning domain validates them and approved human-control policy is satisfied.

### 5.7 APIs, Events, and integration

1. APIs remain Contract First, API First, technology-independent, explicitly scoped, versioned, observable, and backward-compatible.
2. The API Gateway enforces the boundary but never replaces owning-domain Authorization or invariants.
3. The domain that changes canonical state owns the resulting Domain Event.
4. Integration Events expose governed facts across boundaries without transferring ownership.
5. Events do not disguise commands, Recommendations, Configuration Proposals, or Action Proposals.
6. No global Event ordering is assumed; idempotency, replay, security, and compatibility remain explicit.
7. Cross-OS integration remains optional, authorized, versioned, observable, and failure-isolated.

### 5.8 Security, audit, and observability

1. Authentication never implies Authorization.
2. Every protected action uses explicit Workspace and applicable Business, Business Unit, Department, Branch, Operating System, and resource context.
3. Tenant isolation, least privilege, safe delegation, data minimization, and defense in depth remain mandatory.
4. Consequential activity remains auditable; Audit history remains append-only.
5. Logs, metrics, traces, health, Events, APIs, AI, Marketplace, and Audit remain correlatable without making observability a business-data owner.
6. Security, recovery, and failover never bypass canonical ownership or tenant boundaries.

### 5.9 Deployment and evolution

1. Core Platform begins as an enforced modular monolith.
2. Co-deployment never collapses logical module boundaries or data ownership.
3. Each Operating System remains independently usable and owns its domain, setup, navigation, Permissions, configuration, and operational lifecycle.
4. Deployment topology never becomes the definition of canonical architecture.
5. Physical service extraction is optional, evidence-driven, contract-preserving, and approved through ADR.
6. Published immutable assets are never updated in place.
7. Compatible additive evolution is preferred; breaking change requires a governed version and migration path.

## 6. Allowed Evolution

Future milestones MAY extend this baseline in the following compatible ways:

1. Add implementation detail for frozen logical components without transferring ownership or renaming canonical concepts.
2. Select frameworks, infrastructure, storage, search, messaging, Authentication, observability, testing, and delivery technology through accepted ADRs that satisfy the frozen standards.
3. Define physical aggregates, schemas, packages, runtime topology, environments, migrations, backup, recovery, high availability, and operational controls within the Deployment Model invariants.
4. Add compatible API resources, Event contracts, Webhooks, AI tools, and projections under owning-domain governance.
5. Add new immutable versions of Knowledge, Knowledge Packs, Rules, Capabilities, Business DNA snapshots, Marketplace Assets, and other governed artifacts.
6. Add independent Operating Systems that reuse Core contracts and remain standalone.
7. Add optional cross-OS Integration Contracts that preserve ownership and failure isolation.
8. Extend Marketplace from official and controlled assets to approved partner participation after its deferred identity, certification, sandbox, commercial, security, and operations decisions are accepted.
9. Extend the AI Expert Network with approved Experts, providers, tools, evaluation, safety, feedback, and operational policy while preserving AI authority limits.
10. Add multi-country, multi-language, multi-currency, enterprise, public API, partner, analytics, and compliance capabilities as data-driven, versioned extensions.
11. Add or rebuild read models, search indexes, analytics projections, dashboards, and caches without making them sources of truth.
12. Extract an existing bounded module into a separate deployable service when measured evidence and an accepted ADR satisfy the Deployment Model criteria.

Allowed evolution must remain backward-compatible or use explicit governed versioning, migration, deprecation, and consumer communication.

## 7. Change Control

Any future material architectural change requires all three controls:

1. **ADR** — create a new Proposed ADR using the Governance lifecycle. The ADR must state the affected frozen guarantees, existing ADRs, alternatives, compatibility, migration, ownership, tenant, security, operational, and rollback consequences. It must become Accepted before the change is authoritative.
2. **Architecture Review** — perform a non-modifying review against Genesis, Governance, the current freeze, affected milestones, contracts, ownership, lifecycle, security, Events, deployment, and deferred decisions. Contradictions must be reported, not silently resolved.
3. **Updated Freeze** — issue a new versioned freeze artifact that explicitly identifies the superseded baseline, accepted ADRs, changed scope, compatibility impact, remaining deferrals, and approval status.

Accepted historical ADRs and freeze artifacts are not rewritten to hide a material change. A superseding ADR and new freeze preserve the decision history.

Implementation detail that stays within this baseline does not require reopening the architecture. When doubt exists about whether a proposed change is architectural, Governance review determines whether an ADR is required.

## 8. Relationship to Future Milestones

### 8.1 Business Brain

Business Brain must build on the frozen Business Architect Pipeline, Business-scoped Business DNA, Capability Registry, Knowledge, Knowledge Packs, deterministic Rules, explainable Recommendations, Configuration Proposals, human control, and Core Workspace Ready boundary. It must not make AI a source of truth or store software state in Business DNA.

### 8.2 Commerce OS

Commerce OS must be the first independent OS implementation of the frozen Core contracts. It owns Commerce setup, Modules, workflows, Permissions, configuration, operational data, navigation, dashboards, reports, and endpoints. It must use canonical Core organization identities, commercial lifecycle, Product Hub handoffs, and optional contract-based integrations without moving Commerce logic into Core or depending on another OS.

### 8.3 Marketplace

Marketplace must build as the frozen bounded context within the Core Platform offering. It must preserve immutable shared Marketplace Asset Versions and separate scoped acquisition, installation, configuration, activation, entitlement, and Business Assignment. Third-party participation must wait for the applicable deferred governance, sandbox, security, commercial, and operational decisions.

### 8.4 AI Expert Network

AI Expert Network must build through the frozen AI Coordinator decomposition and AI Tool API. It must remain downstream of authorized Business context, Knowledge, Rules, Business Brain, evidence, Permission, and human approval. Provider, residency, retention, evaluation, safety, feedback, capacity, cost, and degradation decisions require future approval.

### 8.5 Global Platform

Global Platform must reuse the frozen identity, organization, ownership, commercial, API, Event, Security, Observability, Marketplace, AI, and independent-OS contracts. Multi-country, enterprise, developer, partner, and multi-OS expansion must be data-driven, versioned, optional across OS boundaries, and backward-compatible. Physical extraction may occur only through measured evidence and change control.

## 9. Recommended Git Tag

The recommended Git tag for the repository state containing this approved freeze is:

```text
architecture/core-platform-v1.0
```

This document records the recommendation only. It does not create or authorize creation of the Git tag.

## 10. Final Approval Statement

**Core Platform Architecture v1.0 is the official architectural baseline of Nexoraxs.**

Milestone 1 architecture is frozen. Future milestones must build on this baseline, close deferred decisions through Governance when required, preserve the Architecture Guarantees, and follow Change Control for any material architectural change.

**Final Freeze Status: READY FOR MILESTONE 2**
