# Core Platform Roadmap

## 1. Purpose

This document defines the implementation roadmap for the approved Core Platform architecture. It orders delivery into six dependency-aware phases while preserving Genesis v1.1, Governance, the frozen Proposal, Core Platform Principles, Waves 1–3, and the approved Architecture Quality Review.

The roadmap is architectural sequencing, not a calendar, release commitment, or authorization to implement every future capability immediately.

## 2. Scope

This roadmap covers:

- Phase 1 — Foundation;
- Phase 2 — Business Brain;
- Phase 3 — Commerce OS;
- Phase 4 — Marketplace;
- Phase 5 — AI Expert Network; and
- Phase 6 — Global Platform.

For each phase it identifies objectives, deliverables, dependencies, exit criteria, and risks already present in approved architecture. It does not select technologies, define detailed feature specifications, set commercial terms, resolve deferred decisions, or redesign any domain.

## 3. Roadmap Principles

1. **Genesis remains ultimate authority.** Delivery exists to realize the Business Operating Intelligence Platform, not to maximize application count.
2. **Business before software.** The platform establishes Business understanding before product selection and OS-specific configuration.
3. **Foundation before distribution.** The Core Platform begins as an enforced modular monolith with explicit logical boundaries.
4. **Independent Operating Systems.** Each OS works standalone and owns its setup, navigation, permissions, workflows, configuration, and operational data.
5. **Contracts before coupling.** Cross-boundary work uses versioned APIs, Events, Webhooks, handoffs, and AI tools rather than shared databases.
6. **Readiness remains separated.** Core Workspace Ready and Operating System Ready are distinct outcomes.
7. **Canonical ownership is unchanged by sequence.** A phase may consume or project another owner's data but never acquires ownership by delivering first.
8. **Human control remains explicit.** Consequential Recommendations, Configuration Proposals, Marketplace actions, and AI Action Proposals follow approved review and Authorization policy.
9. **Later capability is prepared, not prematurely built.** Stable identifiers, versioning, tenant scope, and extension contracts are created when needed without implementing deferred ecosystems early.
10. **Deferred decisions close through ADRs.** A phase cannot silently settle an unresolved architectural or technology choice.

## 4. Phase Relationships

| Phase | Primary outcome | Depends on |
|---|---|---|
| 1. Foundation | Secure, tenant-safe Core Platform and canonical contracts | Approved architecture and governance |
| 2. Business Brain | Explainable Business understanding, Recommendations, and Core Workspace Ready | Foundation |
| 3. Commerce OS | First independent OS handoff and Operating System Ready journey | Foundation and Business Brain contracts |
| 4. Marketplace | Governed shared asset ecosystem with scoped activation | Foundation, commercial lifecycle, and OS contracts |
| 5. AI Expert Network | Coordinated, permission-aware, explainable AI Experts | Business Brain, Knowledge, Rules, APIs, Security, and Observability |
| 6. Global Platform | Multi-OS, multi-country, enterprise, developer, and partner evolution | Proven earlier phases and governed operational maturity |

Phases express architectural dependency, not a requirement that all work is strictly sequential. Contract preparation and controlled discovery may occur earlier, but a phase does not meet its exit criteria until its dependencies and applicable deferred decisions are satisfied.

## 5. Phase 1 — Foundation

### 5.1 Objectives

- Establish the Core Platform as the shared control and intelligence plane.
- Implement the enforced modular monolith and approved logical boundaries.
- Establish canonical identity, Workspace, Business, and organization foundations.
- Establish tenant isolation, Permission, Security, Audit, API, Event, and Observability foundations.
- Prepare stable contracts for Business Architect, Product Hub, Marketplace, Operating Systems, and AI without implementing their later full scope.

### 5.2 Deliverables

- Core modular monolith structure with explicit module entry points and dependency rules.
- Identity and Access foundation for User identity, Authentication, sessions, Workspace Membership, roles, and scoped Permissions.
- Workspace lifecycle and mandatory Workspace Entitlement foundation.
- Business Registry and Organization Registry foundations for canonical Business, Business Unit, Department, and Branch identities and relationships.
- Settings, localization, Notifications, append-only Audit, Search Coordination, Storage Coordination, and Analytics Intake foundations at their approved scope.
- Contract skeletons for Core Module Contracts, First-Party API, Operating System API, Marketplace API, Event/Webhook surface, and AI Tool API.
- Owner-aligned write models and disposable projection foundations.
- Baseline structured logging, metrics, tracing, health, service diagnostics, and Audit correlation required to operate bounded foundation work.
- Environment, configuration, migration, backup, recovery, and deployment procedures to the level approved by Phase 1 ADRs.

### 5.3 Dependencies

- Accepted Governance ADRs and canonical Glossary.
- Genesis v1.1 and the approved Core Platform Proposal.
- Core Platform Principles and Waves 1–3.
- Approved Deployment Model and Technology Stack decisions needed for implementation.
- Closure of applicable decisions concerning organization write authority, physical aggregates, module/package layout, Authentication, sessions, service identity, secrets, encryption, and operational telemetry.

### 5.4 Exit Criteria

- Logical module boundaries are enforced and tested inside the modular monolith.
- Canonical ownership has no duplicated write authority.
- Workspace and applicable resource context are explicit on every protected path.
- Tenant-isolation, Authorization, Audit, API contract, Event contract, and observability tests pass for delivered foundation slices.
- Core organization identities can be registered without placing OS operational data in Core.
- Published contracts are versioned and do not expose framework or database models as the architecture definition.
- Deployment, migration, rollback or recovery, backup, and restore expectations are approved for the delivered production scope.
- No later-phase Marketplace, AI, or Operating System domain behavior has been embedded in Core.

### 5.5 Risks

- Unresolved Organization Registry write authority could cause duplicate ownership during OS-specific setup.
- Premature physical schema decisions could collapse approved aggregates or lifecycle states.
- Technology choices could accidentally replace canonical contracts with framework models.
- Authentication or tenant-context gaps could expose cross-Workspace data.
- Insufficient operational procedures could make a logically sound foundation unsafe to release.

## 6. Phase 2 — Business Brain

### 6.1 Objectives

- Implement the Business-first understanding flow before software selection.
- Deliver the governed Business Architect Pipeline and Business-scoped Business DNA.
- Establish Capability, Knowledge, Knowledge Pack, and deterministic Rule foundations.
- Produce explainable Recommendations and Implementation Options through the Business Brain.
- Reach Core Workspace Ready without collapsing OS readiness.

### 6.2 Deliverables

- Business Architect Pipeline components as frozen in the approved Proposal and Wave 1: Session Orchestrator, Context Resolver, Evidence Collector, Inference Service, Question Planner, Conversation Adapter, Answer Normalizer, Provenance Registry, DNA Assembler and Validator, Review Checkpoint, DNA Publisher, Analysis Trigger, and Pipeline State Store.
- Versioned Business DNA identity, snapshots, facts, provenance, validation, correction, and history for one Business.
- Explicit Workspace Intelligence Aggregation rather than a Workspace-owned Business DNA.
- Capability Registry, governed Knowledge, additive Knowledge Packs, and versioned deterministic Rules.
- Business Brain decision flow consuming approved Business context, Knowledge, Rules, goals, country, stage, analytics, and commercial context.
- Recommendation Engine outputs with evidence, confidence, explanation, lifecycle, and human review.
- Implementation Options that map a recommended business improvement or Capability to an Operating System, Plan, or Marketplace Asset without forcing product selection.
- Versioned Configuration Proposals delivered to the owning target for validation and application.
- Core Workspace Ready evaluation and Product Hub entry based on sufficient reviewed Business understanding and initial Recommendations.

### 6.3 Dependencies

- Phase 1 identity, Workspace, Business, organization, Permission, Audit, API, Event, and observability foundations.
- Approved canonical schemas and version rules for Business DNA, Capability, Knowledge, Rules, Recommendations, and Configuration Proposals.
- Analytics Intake contracts for authorized evidence where used.
- Closure of applicable deferred decisions for minimum Core Business DNA, confirmation materiality, correction, concurrent editing, and Configuration Proposal review policy.

### 6.4 Exit Criteria

- The Business Architect Pipeline produces reviewed, versioned Business DNA for exactly one Business.
- Business DNA contains Business facts and excludes OS, Plan, Module, subscription, and software configuration state.
- Business Brain outputs cite the Business DNA, Knowledge, Rule, and evidence versions used.
- Deterministic Rules remain separate from AI and produce explainable outcomes.
- Recommendations remain advisory, record confidence and rationale, and preserve human control.
- Configuration Proposals do not write OS-owned configuration directly.
- Core Workspace Ready is evaluated independently from subscription, installation, OS setup, configuration, activation, and Operating System Ready.
- Business Brain paths pass ownership, tenant-isolation, Authorization, explainability, Audit, and version reproducibility tests.

### 6.5 Risks

- An undefined minimum Business DNA could make readiness inconsistent.
- Weak Knowledge or Rule governance could produce unexplained Recommendations.
- Software choices could leak into Business DNA and corrupt the permanent Business model.
- Configuration automation could bypass the owning OS or required customer review.
- Analytics or AI-derived inference could be mistaken for approved Business fact.

## 7. Phase 3 — Commerce OS

### 7.1 Objectives

- Deliver Commerce OS as the first independent Operating System using stable Core contracts.
- Complete the Product Hub selection, commercial lifecycle, setup handoff, OS-owned setup, activation, and launch journey.
- Prove that an OS can operate independently while consuming shared Core capabilities.
- Preserve clear separation between Core Workspace Ready and Operating System Ready.

### 7.2 Deliverables

- Canonical Product and Plan catalog entries for Commerce OS.
- Separate Workspace Entitlement, OS Subscription, OS Installation, OS-specific setup, OS Configuration, OS Activation, access, and readiness records under their approved owners.
- Product Hub Projection that composes availability, Recommendation, subscription, installation, setup, activation, readiness, pause, and update states without owning them.
- Signed, short-lived Setup Handoff and Launch Handoff flows with reauthorized context and explainable recovery routes.
- Commerce OS-owned Business Unit selection or creation through the approved Organization Registry contract.
- Commerce OS-owned setup experience, Modules, workflows, permissions, domain configuration, operational records, navigation, dashboards, reports, and endpoints.
- Contract-driven consumption of Core identity, organization, commercial, Notification, Audit, localization, Search Coordination, Storage Coordination, Analytics Intake, API, and AI coordination where applicable.
- Operating System Ready evaluation that requires the approved lifecycle conditions.

### 7.3 Dependencies

- Phase 1 Core foundation and Phase 2 Business context and Recommendation contracts.
- Product Hub, Product/Plan, subscription, installation, Permission, API, Event, Navigation, Security, and Observability foundations.
- Approved Organization Registry write protocol during OS setup.
- Closure of the canonical lifecycle model that succeeds or evolves the legacy `OSEnablement` concept without collapsing approved states.
- Approved Workspace Entitlement, OS Subscription, Plan limit, trial, commercial recovery, handoff, URL, and navigation conventions needed for the delivered scope.

### 7.4 Exit Criteria

- Commerce OS completes its core workflow without requiring any other Operating System.
- Core owns shared identity, organization identity, commercial control, Product Hub, and platform governance; Commerce OS owns Commerce operational behavior and data.
- Every operational Business Unit uses the canonical Core identity while Commerce-owned records remain in Commerce OS.
- Product Hub accurately composes lifecycle states and never becomes their source of truth.
- Setup and launch handoffs preserve explicit Workspace, Business, Business Unit, and applicable Branch context and reauthorize on arrival.
- Commerce Configuration Proposals are validated and applied idempotently by Commerce OS under approved policy.
- No direct cross-OS database access or mandatory cross-OS dependency exists.
- Contract, lifecycle, failure-recovery, tenant-isolation, Permission, Audit, and observability tests pass.

### 7.5 Risks

- Legacy `OSEnablement` assumptions could collapse subscription, setup, activation, and readiness.
- Product Hub could accumulate OS domain setup or operational business logic.
- Organization creation during setup could create competing Core and OS write authority.
- Billing success and installation or activation failure could leave unreconciled lifecycle state.
- A first-OS implementation could accidentally hardcode Core around Commerce OS.

## 8. Phase 4 — Marketplace

### 8.1 Objectives

- Implement Marketplace as a governed bounded context within the Core Platform offering.
- Enable discovery and lifecycle management of shared Marketplace Assets while keeping acquisition, installation, configuration, activation, entitlement, and Business assignment scoped.
- Begin with controlled official assets and expand only when partner governance is approved.
- Preserve Marketplace separation from Product Hub composition and Operating System domain ownership.

### 8.2 Deliverables

- Marketplace Asset, immutable Marketplace Asset Version, compatibility, publisher, review, publication, deprecation, and withdrawal foundations at the approved delivery scope.
- Scoped discovery using Business context, Capabilities, Compatibility Rules, Plan, country, language, and applicable Operating System context.
- Separate Marketplace Acquisition, Marketplace Installation, Marketplace Configuration, Marketplace Activation, Marketplace Entitlement, and Business Assignment state.
- Marketplace API and Event contracts with tenant scope, Permission, versioning, idempotency, security, and observability.
- Product Hub links or projections that present Marketplace lifecycle state without absorbing Marketplace ownership.
- Controlled installation coordination with the owning Core or Operating System target.
- Audit, Notification, support, recovery, and lifecycle visibility for delivered Marketplace actions.

### 8.3 Dependencies

- Phase 1 Core foundation and Phase 3 product, commercial, installation, and Operating System integration contracts.
- Approved Marketplace bounded context, asset immutability, scoped-state, Permission, API, Event, Security, and Observability rules.
- Compatibility and version governance for target Core and Operating System contracts.
- Before third-party participation: approved publisher identity, certification criteria, sandbox and isolation, commercial model, settlement, incident handling, support, SLO, and installation recovery policy.

### 8.4 Exit Criteria

- Marketplace is an explicit bounded context even if co-deployed in the Core modular monolith.
- Published Marketplace Asset Versions are immutable.
- Shared asset identity and content are not duplicated per tenant.
- Acquisition, installation, configuration, activation, entitlement, and Business Assignment remain separate and scoped.
- Product Hub displays Marketplace state through projections and links without owning Marketplace Assets or lifecycle writes.
- Installation never bypasses target-domain validation, Compatibility Rules, Permission, or human approval policy.
- Official/controlled assets can complete their approved lifecycle with Audit and recovery.
- Third-party publication remains unavailable until all applicable partner, sandbox, certification, security, commercial, and operational decisions are approved.

### 8.5 Risks

- Mutable published assets could break installed customers and historical evidence.
- Shared Marketplace state could leak across Workspaces or Businesses.
- Arbitrary partner code could bypass tenant, Permission, or OS boundaries.
- Unresolved licensing, settlement, support, or incident policy could make third-party operation unsafe.
- Marketplace or Product Hub could become a second owner of OS configuration.

## 9. Phase 5 — AI Expert Network

### 9.1 Objectives

- Deliver the coordinated AI Expert Network through the AI Coordinator.
- Keep AI downstream of Business DNA, Knowledge, Rules, Permissions, and Business Brain decisions.
- Provide evidence-based, confidence-aware, explainable assistance across approved Core and OS contexts.
- Preserve human approval for consequential decisions and actions.

### 9.2 Deliverables

- AI Coordinator decomposition: Context Builder, Policy and Permission Filter, Expert Registry, Expert Router, Orchestrator, Response Validator, Explanation Composer, Action Proposal Manager, and Learning Feedback Collector.
- Governed AI Expert registration, capability declaration, eligibility, routing, availability, confidence, and evidence behavior.
- AI Tool API with narrow permission-checked reads and Action Proposals; no unrestricted service or database access.
- Multi-Expert orchestration with conflict and low-confidence handling.
- Explanations that identify source context, Knowledge, Rules, evidence, uncertainty, and proposed effects.
- Human review and owner-domain validation for consequential Action Proposals.
- AI Events, Audit correlation, safety, cost, latency, quality, capacity, and degradation monitoring at approved levels.
- Governed feedback flow that never modifies Business DNA, Knowledge, or Rules directly.

### 9.3 Dependencies

- Phase 1 Security, Permission, API, Event, Audit, and Observability foundations.
- Phase 2 Business DNA, Knowledge, Rules, Business Brain, Recommendation, explanation, and provenance foundations.
- Phase 3 and Phase 4 owner-controlled tools and contracts where AI assists those domains.
- Approved AI provider eligibility, data residency, retention, model and Expert evaluation, adversarial testing, content safety, evidence quality, feedback, consent, capacity, cost, SLO, error-budget, fallback, and degradation decisions.

### 9.4 Exit Criteria

- Every AI request receives an explicit authorized context and policy evaluation.
- Expert selection is governed and explainable rather than hidden provider routing.
- AI responses expose confidence, evidence, uncertainty, and material conflicts.
- AI cannot modify Business DNA, Knowledge, Rules, Marketplace state, or OS operational state directly.
- Consequential actions remain Action Proposals until the owning domain validates and approved human-control policy is satisfied.
- Provider failure or low confidence degrades safely without inventing platform truth.
- AI data use, retention, residency, evaluation, cost, safety, and operational controls are approved for production scope.
- Permission, evidence, safety, adversarial, Audit, Event, and observability tests pass.

### 9.5 Risks

- AI could be treated as a source of truth rather than a governed consumer.
- Provider data handling could violate tenant isolation, privacy, or residency obligations.
- Weak evidence and evaluation could produce confident but unsafe guidance.
- Tool access could bypass owner-domain Authorization and human approval.
- Unbounded cost, latency, or provider dependency could degrade platform reliability.

## 10. Phase 6 — Global Platform

### 10.1 Objectives

- Expand the proven platform to multiple independent Operating Systems, countries, languages, currencies, and enterprise contexts.
- Enable optional cross-OS integrations without creating hard dependencies.
- mature public and partner API, Webhook/Event, SDK, certification, and ecosystem capabilities.
- scale platform operations through measured evidence while preserving frozen domain boundaries.

### 10.2 Deliverables

- Additional independent Operating Systems that reuse Core identity, organization, commercial, Business intelligence, Product Hub, Marketplace, API, Event, Security, and Observability contracts.
- Optional, versioned cross-OS Integration Contracts with explicit ownership and failure isolation.
- Multi-country Knowledge, Rules, compliance references, localization, currency, and data-governance support under approved jurisdictional policy.
- Enterprise governance and advanced analytics built from authorized projections without transferring canonical ownership.
- Public Platform API, Partner API, Webhooks/Events, SDKs, partner tools, testing sandbox, and certification after applicable Governance approval.
- Mature SLOs, SLAs, error budgets, capacity planning, incident response, backup, recovery, availability, residency, and compliance controls.
- Evidence-based runtime scaling or selective extraction approved by ADR where justified.
- Governed ecosystem feedback into candidate Knowledge, Rule, Capability, Marketplace, and AI improvements.

### 10.3 Dependencies

- Production evidence and stable contracts from Phases 1–5.
- Proven independent OS lifecycle, tenant isolation, contract compatibility, and failure recovery.
- Approved public and partner eligibility, onboarding, scopes, commercial access, API catalog, versioning, Webhook, Marketplace, security, privacy, compliance, and infrastructure decisions.
- Country and jurisdiction-specific Knowledge, Rule, data classification, retention, residency, export, legal-hold, and certification policy.
- Measured demand and an accepted ADR for any physical service extraction.

### 10.4 Exit Criteria

- Additional Operating Systems work standalone and do not require another OS for core workflows.
- Cross-OS collaboration is optional, authorized, versioned, observable, and failure-isolated.
- Country, language, currency, and compliance behavior is data-driven and governed rather than hardcoded per application.
- Public and partner consumers use certified contracts and cannot access internal databases or bypass owning-domain Authorization.
- Global operations have approved service objectives, capacity, incident, recovery, privacy, residency, and compliance controls.
- Any extracted service preserves canonical ownership, stable contracts, tenant context, Audit, and rollback/recovery behavior.
- Ecosystem learning follows review, approval, publication, and versioning; it never silently changes Business DNA, Knowledge, or Rules.

### 10.5 Risks

- Multi-country expansion could fragment canonical terminology or duplicate Knowledge and Rules.
- Additional Operating Systems could introduce cross-OS hard dependencies or shared databases.
- Public and partner access could expand the attack and data-exposure surface.
- Jurisdictional requirements could conflict if data classification and residency remain unresolved.
- Premature service extraction could add operational complexity without business value.
- Global scale could exceed unapproved SLO, capacity, backup, and recovery foundations.

## 11. Cross-Phase Ownership Rules

The following apply in every phase:

1. Core owns shared identity, organization identity, commercial control, Business DNA, Knowledge, Rules, Capabilities, Business Brain, Recommendations, configuration coordination, Product Hub, Marketplace governance, shared services, and AI coordination according to their detailed boundaries.
2. A Business owns one Business DNA identity; Workspace intelligence is an explicit aggregation.
3. Product Hub composes and navigates lifecycle state but does not own source records or OS setup.
4. Marketplace owns shared Marketplace Assets and scoped Marketplace lifecycle state; it does not own OS operational configuration.
5. Each Operating System owns its setup, Modules, domain configuration, workflows, permissions, operational records, dashboards, navigation, reports, and endpoints.
6. Core Organization Registry owns Business Unit, Department, and Branch identity and parent relationships; an OS owns operational records scoped to those identifiers.
7. AI coordinates and proposes; it never owns Business facts or silently mutates consequential state.
8. Projections, search, analytics, caches, and dashboards never become canonical write models.

## 12. Cross-Phase Decision Gates

A phase may enter detailed implementation only when:

- its affected High risks from the approved Architecture Quality Review have documented closure criteria;
- unresolved decisions required for the slice are accepted through ADRs;
- API, Event, Permission, Security, Audit, and Observability contracts exist at the necessary fidelity;
- owner and consumer contract tests are defined;
- migration, rollback or recovery, and data lifecycle implications are known; and
- the implementation does not require changing approved architecture.

Decisions not needed by the current bounded slice remain deferred. A phase must not resolve unrelated future choices merely to make the roadmap appear complete.

## 13. Deferred Decisions by Roadmap Phase

| Phase | Deferred decision groups referenced |
|---|---|
| Phase 1 — Foundation | Organization Registry write authority; physical aggregates and transaction boundaries; module/package and deployment topology; Authentication, session, service identity, secret, encryption, key, Permission, delegation, incident, recovery, infrastructure, and observability mechanisms. |
| Phase 2 — Business Brain | Minimum Core Business DNA; correction, confirmation, and concurrency; Configuration Proposal auto-apply versus review; Knowledge/Rule schema detail; Analytics Intake and learning policy. |
| Phase 3 — Commerce OS | Successor or evolution of legacy `OSEnablement`; exact entitlement, subscription, Plan, trial, recovery, lifecycle, URL, deep-link, handoff, and navigation conventions; failure reconciliation. |
| Phase 4 — Marketplace | Publisher identity; certification; sandbox and isolation; pricing, licensing, settlement, and revenue sharing; incident, support, SLO, and installation recovery. |
| Phase 5 — AI Expert Network | Provider and model eligibility; residency and retention; evaluation, adversarial testing, safety, evidence quality; feedback and consent; capacity, cost, SLO, error budget, fallback, and degradation. |
| Phase 6 — Global Platform | Public and Partner API details; jurisdictional compliance; data classification, privacy, retention, residency, and legal hold; production infrastructure, Event, observability, capacity, availability, recovery, and evidence-based extraction decisions. |

## 14. Relationships

- The Proposal defines the frozen scope, ownership, components, future milestone relationship, risks, and draft decisions expanded here.
- Principles constrain every phase and future ADR.
- Wave 1 defines vision, architecture, and domain concepts.
- Wave 2 defines data ownership, Permission, and Event contracts.
- Wave 3 defines API, Security, and Observability requirements.
- Deployment Model and Technology Stack define how implementation may begin without selecting unapproved architecture.
- The Architecture Quality Review provides readiness scores, risks, recommendations, and the deferred-decision register used by phase gates.

## 15. Future Extension Points

The roadmap can gain detailed implementation plans, specifications, acceptance tests, dates, teams, and release slices after approval. Those artifacts must reference these phases, preserve the approved architecture, and route material decisions through ADRs.

The roadmap may be refined as evidence accumulates, but refinement may not silently:

- rename canonical concepts;
- merge lifecycle states;
- transfer ownership;
- create a shared OS database;
- make an Operating System depend on another for core functionality;
- turn AI output into unreviewed fact or action; or
- treat deployment extraction as a goal without measured justification.

## 16. References

### Governance

- `docs/00-governance/ADR/README.md`
- `docs/00-governance/ADR/ADR-001-business-operating-intelligence-platform.md`
- `docs/00-governance/ADR/ADR-002-core-shared-control-intelligence-plane.md`
- `docs/00-governance/ADR/ADR-016-business-architect-governed-pipeline.md`
- `docs/00-governance/ADR/ADR-018-separate-core-and-os-readiness.md`
- `docs/00-governance/ADR/ADR-019-product-hub-discovery-and-os-handoff.md`
- `docs/00-governance/ADR/ADR-024-independent-operating-system-domain-ownership.md`
- `docs/00-governance/ADR/ADR-027-marketplace-bounded-context-within-core.md`
- `docs/00-governance/ADR/ADR-030-ai-coordinator-separated-orchestration.md`
- `docs/00-governance/ADR/ADR-031-coordinated-ai-expert-network.md`
- `docs/00-governance/ADR/ADR-033-enforced-modular-monolith.md`
- `docs/00-governance/ADR/ADR-035-technology-independent-compatible-contracts.md`

### Genesis

- `docs/01-genesis/01-VISION.md`
- `docs/01-genesis/02-CONSTITUTION.md`
- `docs/01-genesis/09-PLATFORM-BLUEPRINT.md`
- `docs/01-genesis/11-CUSTOMER-JOURNEY.md`
- `docs/01-genesis/12-WORKSPACE-LIFECYCLE.md`
- `docs/01-genesis/13-PRODUCT-HUB.md`
- `docs/01-genesis/14-SUBSCRIPTION-MODEL.md`
- `docs/01-genesis/15-BUSINESS-LIFECYCLE.md`
- `docs/01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md`
- `docs/01-genesis/17-MARKETPLACE-ARCHITECTURE.md`
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
- `docs/02-core-platform/11-TECHNOLOGY-STACK.md`
- `docs/02-core-platform/99-CORE-PLATFORM-ARCHITECTURE-REVIEW.md`
