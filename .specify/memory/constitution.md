<!--
Sync Impact Report
==================
Version change: 2.0.0 -> 2.0.1
Bump rationale: PATCH. Synchronizes Spec Kit governance with the approved Core Platform
Architecture v1.1 Freeze without changing constitutional principles, ownership, or delivery rules.

Authority synchronization:
- Core Platform Architecture v1.1 is now the active controlling Core Platform Freeze for its
  approved scope.
- Core Platform Architecture v1.0 and Documentation Baseline v1.0.1 remain immutable predecessor
  evidence for guarantees and history not replaced by the v1.1 successor.
- Accepted ADR-042 and ADR-043, the approved Foundation successor package, and the v1.1 source
  manifest are recognized through the existing authority order.

Modified principles:
- Principle I clarified with the active Core Platform v1.1 / predecessor v1.0 relationship.

Dependent artifacts:
- ✅ updated: AGENTS.md
- ✅ reviewed/no change required: .specify/templates/plan-template.md
- ✅ reviewed/no change required: .specify/templates/spec-template.md
- ✅ reviewed/no change required: .specify/templates/tasks-template.md

Follow-up TODOs: None. This amendment does not approve UI/UX, feature specifications, or
implementation and does not resolve any Deferred Decision.
-->

# NexoraXS Constitution

## Core Principles

### I. Frozen Architecture Is Authoritative

All specifications, plans, tasks, code, data models, contracts, user experiences, and operational
changes MUST conform to the frozen NexoraXS architecture. Authority is evaluated in this order:

1. `docs/99-architecture-freeze/`;
2. `docs/00-governance/`, including Accepted ADRs and the canonical glossary;
3. `docs/01-genesis/`;
4. approved milestone baselines under `docs/02-core-platform/` through
   `docs/07-global-platform/`;
5. this constitution for Spec Kit and engineering governance; and
6. `AGENTS.md`, feature specs, plans, tasks, and implementation guidance.

Historical Proposals, Patches, and Reviews provide provenance but MUST NOT override their
controlling Freeze. A detected conflict MUST stop the affected work and be reported with exact
sources. Agents and implementers MUST NOT reconcile contradictions by inventing a new owner,
entity, lifecycle, contract, or default.

For the Core Platform scope, `docs/99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md` is the
active controlling successor Freeze. Core Platform v1.0 and Documentation Baseline v1.0.1 remain
immutable predecessor evidence and continue to govern historical guarantees not explicitly changed
by the approved v1.1 delta. A later date, proposal, UI/UX artifact, or implementation file does not
establish supersession without the required approval and successor declaration.

Rationale: the architecture program completed formal review, Freeze, and readiness gates. Silent
reinterpretation would destroy that governance and its traceability.

### II. Canonical Ownership and the Core Platform Boundary

Every canonical concept, fact, write model, aggregate, and lifecycle MUST have exactly one
accountable owner and source of truth. Projections, caches, read models, search indexes,
dashboards, analytics, recommendations, and AI context MUST NOT become write authorities.

Core Platform owns shared identity and access, Users, Workspace membership, Workspaces,
Businesses, the canonical organization registry, Workspace Entitlement, OS Subscriptions,
Product and Plan catalog, Product Hub and product access composition, platform governance,
Business DNA, Knowledge, Rules, Capabilities, Business Brain, Recommendations, configuration
coordination, Marketplace governance, shared services, and AI coordination as defined by the
frozen Core baseline.

Core MUST NOT absorb Operating System operational facts or workflows. An OS MUST NOT duplicate
Core canonical identity, organization, commercial, Knowledge, Capability, Marketplace, Business
Brain, or AI Coordinator truth. A boundary-crossing change MUST be requested through the owning
domain's governed contract and validated by that owner.

Rationale: explicit ownership prevents parallel truth, accidental writes, and hidden coupling.

### III. Independent Operating Systems and Contract-Based Integration

Every Operating System MUST remain independently usable for its core workflow and MUST own its
UI, setup, operational domain model, business operations, domain data, reports, dashboards,
settings, permissions semantics, and release lifecycle within its approved boundary.

Cross-OS and Core-to-OS integration MUST be optional, authorized, versioned, observable,
failure-isolated, and contract-based. No OS may:

- require another OS to complete its core workflow;
- access another OS database, tables, internal state, or private implementation surface;
- write another domain's canonical model;
- create a shared mutable domain database; or
- treat co-deployment in the modular monolith as permission for direct data access.

Consumers MUST tolerate absence, pause, failure, upgrade, or removal of an optional integration.

Rationale: OS independence is the platform's primary protection against a coupled ERP monolith.

### IV. Explicit Organization Context and Tenant Isolation

The canonical organization hierarchy is:

```text
Workspace -> Business -> Business Unit -> Department / Branch
```

Business and Business Unit are distinct. Every Business belongs to one Workspace; every Business
Unit belongs to one Business; every Department and Branch belongs to one Business Unit. Legacy
models that conflate Business and Business Unit MUST NOT be treated as architectural authority
and require an explicit migration decision before their shape changes.

Every protected read, write, Event, search, analytics query, navigation transition, integration,
and AI context build MUST resolve the authenticated actor plus the applicable Workspace,
Business, Business Unit, Department, Branch, OS, resource, and action scope. Client-provided
identifiers are authorization inputs, never proof of access. Tenant isolation MUST be enforced at
the server and owning-domain boundaries and covered by tests.

Rationale: explicit context preserves Business DNA ownership, authorization scope, and
multi-Business operation without cross-tenant leakage.

### V. Capability-First, Knowledge-Driven Architecture

Product and engineering work MUST begin with the Business problem and required Capability, not an
industry-specific application, screen, module, framework, or AI prompt. Capabilities are
platform-wide business functions; OS Modules are implementation details and MUST NOT redefine
Capability ownership.

Business Knowledge, immutable published Knowledge versions, deterministic Rules, and authorized
Business context MUST precede Recommendations and AI output. Shared Knowledge, Rules,
Capabilities, and published Marketplace Asset Versions MUST be referenced by exact governed
versions rather than copied into tenants or Operating Systems. Published assets MUST NOT be
mutated in place.

Rationale: knowledge-driven, capability-first design keeps the platform explainable, reusable,
and independent from a particular software implementation.

### VI. Deterministic, Explainable Intelligence and Human Authority

Business Brain MUST consume governed Business DNA, Knowledge, Rules, analytics, goals, and
authorized context to create deterministic, reproducible, provider-independent Decisions. It may
produce Decisions, Recommendation Candidates, insights, and configuration inputs, but MUST NOT
silently write OS domain facts, apply target configuration, execute OS workflows, or assume the
target owner's authority.

Recommendations MUST identify the business problem, required Capability, evidence, source
versions, rationale, expected benefit, risk, assumptions, alternatives, confidence, and the
consequence of ignoring the Recommendation. Product, Plan, OS, and Marketplace choices are
Implementation Options after the business need is established.

AI MUST remain downstream of Knowledge, deterministic Rules, completed Business Brain Decisions,
and authorization. AI output is AI-owned advisory material and MUST NOT become Business DNA,
Knowledge, Rules, permissions, financial truth, or OS operational truth. Consequential changes
require explicit human approval plus owning-domain authorization, validation, execution, and
Audit evidence.

Rationale: explainability and human control make intelligence trustworthy without transferring
business authority to AI.

### VII. Commercial and Operational Lifecycle Separation

Workspace Entitlement, OS Product availability, Plan, OS Subscription, installation, setup,
configuration, activation, readiness, operational access, pause, archive, and removal MUST remain
separate concepts with their frozen owners and scopes.

An OS Subscription is Workspace-scoped commercial state. Operational use additionally resolves
the selected Business, Business Unit, permissions, and readiness state required by the applicable
lifecycle. Subscription alone MUST NOT imply installation, activation, authorization, or
readiness. Product Hub may compose and display owner projections but MUST NOT write OS setup or
operational state.

The exact successor to legacy `OSEnablement` semantics is unresolved. Specifications MUST express
the approved lifecycle distinctions and MUST NOT introduce a canonical `OSEnablement` aggregate,
schema, or state machine without an approved architectural decision.

Rationale: commercial purchase and operational readiness answer different questions and cannot
share one ambiguous state.

### VIII. Contract-First, Backward-Compatible Evolution

Architecture contracts MUST be technology-independent, owner-governed, explicitly scoped, and
versioned. APIs, Events, webhooks, navigation handoffs, configuration requests, Marketplace
interactions, and AI tools MUST preserve canonical ownership, authorization, correlation,
idempotency where repeat submission is possible, declared failure behavior, and observability.

Compatible additive evolution is preferred. Breaking changes require an approved versioning,
migration, deprecation, and consumer-transition plan. No database model or framework type may be
the only definition of a cross-boundary contract. Events MUST communicate governed facts without
disguising commands or transferring ownership.

Rationale: stable contracts let Core and independent Operating Systems evolve without synchronized
releases or silent breakage.

### IX. Security, Privacy, Audit, and Observability Are Quality Gates

Authentication never implies authorization. Least privilege, defense in depth, explicit context,
tenant isolation, safe delegation, data minimization, secret protection, encryption requirements,
and owner validation MUST be addressed in every affected spec and plan.

Consequential and security-relevant activity MUST produce append-only, correlated Audit evidence.
Logs, metrics, traces, health signals, APIs, Events, Marketplace activity, and AI interactions MUST
be correlatable without making observability a business-data owner. Telemetry MUST NOT expose
secrets or unauthorized tenant data.

A feature that lacks required authorization, privacy, Audit, failure, recovery, or observability
criteria MUST fail the Constitution Check and MUST NOT proceed to implementation.

Rationale: platform intelligence and multi-tenancy are unsafe without enforceable evidence,
isolation, and operational visibility.

### X. Bilingual, Accessible Product Quality

Arabic and English are first-class platform languages. Every user-facing feature MUST define and
verify localized content, Arabic RTL behavior, English LTR behavior, logical-direction layout,
and the treatment of user-entered data. User-entered Business data MUST remain as entered unless
an explicitly governed translation workflow exists.

Every user-facing feature MUST include applicable accessibility acceptance criteria and evidence,
including keyboard operation, semantic naming, focus behavior, readable states, and assistive
technology support. No feature may ship with hardcoded single-language labels, LTR-only layout,
color-only meaning, or inaccessible critical interaction.

Rationale: localization and accessibility are product correctness, not post-release polish.

### XI. Spec-Driven, Testable Delivery

No meaningful product or engineering change may begin implementation without an approved feature
specification and plan. Every specification MUST define ownership, scope, non-scope, organization
context, canonical data impact, integration boundaries, security, observability, accessibility,
localization, compatibility, measurable outcomes, and independently testable acceptance
scenarios.

Every plan MUST pass the Constitution Check before research/design and again after design. Every
task list MUST map work to requirements and include risk-appropriate automated or documented
verification. Tests MUST protect affected domain invariants, tenant isolation, authorization,
ownership, contracts, compatibility, idempotency, localization, accessibility, and critical user
journeys. A test exception MUST be explicit, justified, and approved; tests are not globally
optional.

Rationale: traceable specs and tests turn architecture principles into executable delivery gates.

### XII. Documentation and Implementation Stay Synchronized

Every implementation change MUST update its specification, plan, tasks, contracts, and affected
documentation in the same change set. Generated artifacts MUST cite the controlling Freeze or
Accepted ADR for every architectural constraint. Code MUST NOT silently establish a new canonical
term, owner, lifecycle, contract, permission scope, or cross-domain dependency.

When implementation reveals a real conflict, work MUST stop at the affected boundary. The conflict
MUST be documented with exact sources and routed through Governance. Historical documents MUST
remain available; supersession MUST be explicit rather than achieved by rewriting history.

Rationale: synchronized documentation prevents implementation behavior from becoming an
unreviewed shadow architecture.

## Additional Constraints

### Architecture and product constraints

- NexoraXS is a Business Operating Intelligence Platform built from a shared Core Platform and
  independent Operating Systems; it is not a single application or giant ERP.
- Core Platform begins as an enforced modular monolith. Logical module boundaries, dependency
  direction, isolated data access, contracts, tests, and observability remain mandatory.
- Physical extraction is evidence-driven and requires Governance when it affects frozen
  architecture. Microservices, infrastructure, runtime, deployment, and technology choices MUST
  NOT be inferred from logical domains or Components.
- Business DNA is scoped to exactly one Business, describes the Business rather than software,
  and MUST remain separate from Recommendations, subscriptions, Modules, and configuration.
- Read models and projections are disposable and reconstructable. They MUST NOT accept canonical
  writes.
- Marketplace published Asset Versions and other published platform assets are immutable; tenant
  acquisition, installation, activation, and applicability remain scoped state.

### Contradiction and deferral protocol

1. Cite the exact conflicting statements and their authority levels.
2. Stop only the work affected by the conflict; continue safe independent work where possible.
3. Do not choose a winner below the explicit authority order.
4. Do not convert an unresolved Deferred Decision into a default, TODO implementation, schema, or
   technology choice.
5. Add a constitution TODO only when constitution governance information is truly missing and
   cannot be derived from repository history or authoritative documentation.
6. Route architecture changes through an ADR, explicit approval, Architecture Review, updated or
   successor Freeze, and readiness validation.

### Repository implementation guidance

Implementation MAY use current repository technologies and structures recorded in `AGENTS.md`
and approved feature plans. Such choices are subordinate implementation decisions unless an
Accepted ADR or Freeze explicitly promotes them to architecture. Shared packages MUST remain
boundary-safe: UI packages contain presentation, SDK packages contain clients, type packages
contain shared contracts, and no shared package becomes an ownerless business-logic domain.

## Development Workflow and Quality Gates

### Constitution Checks

Every `spec.md`, `plan.md`, and `tasks.md` MUST contain or inherit verifiable checks for:

1. frozen authority and ADR traceability;
2. owning domain and canonical write ownership;
3. Workspace, Business, Business Unit, Department, Branch, OS, resource, and actor scope as
   applicable;
4. OS independence and absence of direct cross-domain data access;
5. Capability, Knowledge, Rules, Recommendation, Business Brain, and AI ordering as applicable;
6. entitlement, subscription, installation, setup, configuration, activation, readiness, and
   access separation as applicable;
7. contract versioning and backward compatibility;
8. security, privacy, Audit, and observability;
9. Arabic/English, RTL/LTR, and accessibility;
10. tests and measurable acceptance evidence; and
11. documentation synchronization and deferred-decision preservation.

A failed check is a gate, not a note. The plan MUST either conform or stop and identify the
required Governance action. Complexity tables MUST NOT be used to waive frozen architecture.

### Delivery evidence

Before merge, the change owner MUST provide evidence appropriate to the affected surface:

- requirement-to-task traceability;
- passing unit, integration, contract, and end-to-end tests where applicable;
- tenant and authorization boundary tests for protected operations;
- compatibility tests for changed contracts;
- Arabic/English and RTL/LTR verification for user-facing changes;
- accessibility verification for user-facing changes;
- structured observability and Audit verification for consequential flows;
- documentation updates; and
- a clean Constitution Check after design and implementation.

### Review discipline

Reviewers MUST reject changes that introduce hidden ownership, duplicate truth, cross-OS hard
dependencies, implicit authorization, AI authority over canonical facts, unresolved architectural
decisions, unversioned breaking contracts, or undocumented behavior. Review approval MUST be based
on evidence, not the absence of an obvious failure.

## Governance

This constitution is the authoritative Spec Kit and engineering-governance summary derived from
the frozen architecture. It governs specifications, plans, tasks, and implementation practice but
MUST remain subordinate to the authority order in Principle I.

### Amendment procedure

- A wording-only clarification that preserves meaning may use a PATCH amendment.
- A new principle or materially expanded enforceable guidance requires a MINOR amendment.
- Removal, redefinition, or authority change that breaks prior governance requires a MAJOR
  amendment.
- An amendment that changes frozen architecture additionally requires an Accepted ADR, explicit
  architecture approval, Architecture Review, updated or successor Freeze, and readiness gate.
- Every amendment MUST update the Sync Impact Report and all affected Spec Kit templates and
  runtime guidance in the same change.

### Compliance review

- `/speckit.specify`, `/speckit.plan`, and `/speckit.tasks` outputs MUST pass their Constitution
  Checks before implementation.
- Plans MUST re-run the check after design because research cannot silently weaken a principle.
- Pull requests and architecture reviews MUST cite exceptions and their approving authority.
- Unjustified constitutional violations block merge and release.
- `AGENTS.md` and other runtime guidance MUST be corrected whenever they conflict with this
  constitution or a higher authority.

### Version policy

Constitution versions use semantic versioning. Ratification history and amendment dates are
preserved. The original constitution was ratified from repository history; this amendment date is
the date the frozen architecture authority was incorporated.

**Version**: 2.0.1 | **Ratified**: 2026-05-11 | **Last Amended**: 2026-07-20
