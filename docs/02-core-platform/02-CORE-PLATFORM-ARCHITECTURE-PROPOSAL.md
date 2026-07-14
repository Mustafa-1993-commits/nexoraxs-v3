# Core Platform Architecture Proposal

Version: 0.2  
Status: Proposal — Review Required  
Authority: Genesis v1.1  
Owner: Nexoraxs  
Decision state: No section of this proposal is final until approved

---

## 1. Vision

The Core Platform is the shared control, organizational, and intelligence foundation of Nexoraxs.

It enables a customer to establish a Workspace, describe each Business, receive explainable recommendations, discover appropriate implementation options, and govern every independent Operating System from one trusted platform.

The Core Platform must make the Genesis promise possible:

> Describe your business. We'll build its operating system.

It is not only a SaaS shell around Operating Systems. It is where Nexoraxs understands the Business before software is selected. It combines shared platform services with Business DNA, Knowledge, deterministic Rules, the Business Brain, recommendations, configuration coordination, Product Hub, and the AI Coordinator.

The target experience is:

```text
Identity
  → Workspace
  → Business
  → Business Architect
  → Core Business DNA
  → Explainable recommendations
  → Product Hub
  → OS and plan selection
  → OS-specific setup
  → Operating System Ready
```

The Core Platform succeeds when customers feel that Nexoraxs understands their business, while the underlying structure, tenancy, subscriptions, permissions, and service coordination remain unobtrusive.

### Architectural intent

- Business concepts exist independently from software.
- Every Business owns one separate Business DNA identity.
- Knowledge and Capabilities are shared, platform-owned assets.
- Intelligence recommends business improvements and Capabilities before mapping software.
- Operating Systems are independent implementation options for Capabilities.
- AI amplifies governed knowledge; it does not create policy or bypass deterministic controls.
- Human customers retain control over recommendations and consequential actions.
- Shared platform behavior is data-driven, explainable, versioned, auditable, tenant-safe, and designed for long-term evolution.

---

## 2. Scope

This proposal defines the logical architecture and boundaries of the Core Platform. It covers the capabilities required to reach **Core Workspace Ready**, govern shared platform concerns, and coordinate the transition into an independently owned OS-specific setup.

### In scope

- Identity, authentication, sessions, and account recovery.
- Workspace creation, lifecycle, selection, settings, and mandatory Workspace entitlement.
- Business creation, selection, management, lifecycle state, and Workspace-to-Business relationships.
- The Business Architect Pipeline from context bootstrap through reviewed Core Business DNA publication and initial recommendations.
- Business DNA storage, version history, provenance, validation, and explicit Workspace-level aggregation views.
- Platform-owned Capabilities, Knowledge, Rules, terminology, and their versioned lifecycles.
- Business Brain orchestration, explainable recommendation generation, implementation-option mapping, and configuration coordination.
- Core Workspace Ready evaluation.
- Product Hub context resolution, recommendations, eligibility, discovery, OS and plan selection, lifecycle visibility, installation coordination, and routing to OS-specific setup.
- Workspace entitlement, OS subscriptions, plans, trials, billing coordination, limits, and commercial state.
- Shared authorization primitives for Workspace, Business, Business Unit, Department, Branch, OS, and resource scopes.
- User, Workspace membership, invitation, role, and access-assignment foundations.
- Platform-level Marketplace catalog, purchase, installation, activation, applicability, version selection, and governance.
- Shared notifications, audit logs, settings, localization, search, storage coordination, analytics intake, and the complete API Architecture for first-party, OS, partner, event, and webhook integration.
- AI Coordinator request understanding, authorized context assembly, policy enforcement, expert routing, response synthesis, confidence, evidence, action governance, and auditability.
- Shared contracts through which Operating Systems consume Core Platform services.
- Lifecycle state required to distinguish Core Workspace Ready from Operating System Ready.

### Scope horizon

The architecture includes permanent extension points for Marketplace assets, AI Experts, multiple Operating Systems, partners, developers, multi-Business Workspaces, and enterprise operation. Their full implementation is phased and is not implied by inclusion in the target boundary.

---

## 3. Non-Scope

The Core Platform must not absorb operational domain behavior merely because several Operating Systems may need related concepts.

The following are outside the Core Platform boundary:

- Commerce sales, products, orders, inventory, purchasing, payments, tax calculation, invoices, returns, POS, and commerce reports.
- CRM leads, pipelines, campaigns, follow-ups, and relationship workflows.
- HR employee records, attendance, payroll, leave, contracts, and workforce workflows.
- Healthcare patients, appointments, prescriptions, clinical records, and care workflows.
- Accounting ledgers, journals, reconciliation, and financial-closing workflows.
- Manufacturing, fleet, construction, projects, or other OS domain workflows and operational data.
- OS-specific setup questions, module selection, workflows, dashboards, menus, operational permissions, and domain configuration.
- OS-owned operational reports and daily operational dashboards.
- Direct cross-OS database access or mandatory cross-OS dependencies.
- Industry-specific applications or typed Workspace models.
- Hardcoded industry behavior. Industries inform Business DNA and Knowledge; Capabilities remain the reusable platform language.
- Autonomous AI approval of transactions, permission changes, compliance overrides, financial mutations, or other critical actions.
- Full Marketplace partner publishing, developer sandboxing, certification, revenue sharing, and arbitrary third-party code execution in the initial milestone.
- Full predictive learning, automated outcome optimization, or unrestricted AI Expert execution in the initial milestone.
- A requirement to deploy the Core Platform or Operating Systems as microservices. Logical boundaries do not dictate premature physical distribution.

---

## 4. Responsibilities

### 4.1 Establish customer and tenant context

The Core Platform creates and protects the identity hierarchy used by the entire platform:

```text
User
  → Workspace membership
      → Workspace
          → Business
              → Business DNA
              → Business Unit
                  ├── Department
                  └── Branch
```

The hierarchy is structural, not an authorization shortcut. Access must always be evaluated explicitly against membership, role, permission, scope, subscription, and lifecycle state.

### 4.2 Understand each Business

The Core Platform owns the Business Architect experience and builds Core Business DNA for one selected Business at a time. It should infer reasonable facts from existing context, ask only necessary questions, record where each fact came from, and allow the customer to review or correct inferred information.

Business DNA describes the Business, never its software. OS selections, plan choices, module states, and implementation configuration must not be stored as Business DNA facts.

### 4.3 Govern shared knowledge and deterministic rules

The Core Platform maintains one versioned source for platform Knowledge, Capabilities, Rules, terminology, compliance references, recommendation evidence, and configuration metadata. Published versions are immutable. Updates create new versions, while deprecation and archival preserve history.

### 4.4 Generate and explain recommendations

The Business Brain combines Business DNA, applicable Knowledge, deterministic Rules, goals, lifecycle stage, permitted analytics, country context, and subscription context. It produces business improvements and Capability recommendations first, then maps Operating Systems, plans, and Marketplace assets as implementation options.

Every recommendation must expose its evidence, assumptions, confidence, business impact, alternatives, risks, and the consequence of ignoring it. Acceptance and rejection are customer decisions and must be auditable.

### 4.5 Manage the platform-to-OS journey

The Core Platform determines when a Workspace is Core Workspace Ready, presents the Product Hub in the selected Business context, records the selected OS and canonical plan, creates the Workspace-level OS subscription, coordinates installation, and routes the customer to the selected OS.

The selected OS then selects or creates the operational Business Unit, performs its own setup, generates domain configuration, activates access, and becomes Operating System Ready. Core observes and displays lifecycle state but does not execute the OS domain setup.

### 4.6 Provide shared governance services

The Core Platform provides tenant-safe identity, authorization, subscriptions, billing, audit, notifications, settings, localization, storage coordination, search, analytics intake, integration contracts, API access, and AI coordination that every OS may consume without duplicating them.

### 4.7 Preserve OS independence

Core contracts must allow an OS to be installed, paused, archived, or removed without breaking another OS. Integrations are optional, contract-driven, permission-aware, and never rely on shared mutable domain tables.

---

## 5. Core Components

The components below are logical modules. Initial deployment may remain a modular monolith, provided boundaries are enforced in code, data access, APIs, and ownership.

| Component | Primary responsibility | Key outputs |
|---|---|---|
| Identity and Access | User identity, authentication, sessions, recovery, Workspace membership, roles, scoped permissions | Authenticated principal and authorization decisions |
| Workspace Management | Workspace lifecycle, selection, defaults, settings, entitlement, tenant boundary | Workspace context and lifecycle state |
| Business Registry | Business identity, lifecycle, selection, Workspace relationship | Business context |
| Organization Registry | Business Units, Departments, Branches, structural constraints, scope identifiers | Operational organization graph for platform and OS use |
| Business Architect | Conversational discovery, inference, question selection, answer provenance, customer review | Core Business DNA inputs |
| Business DNA Registry | One Business DNA identity per Business, validation, history, provenance, aggregation projections | Versioned Business DNA snapshots |
| Capability Registry | Canonical, reusable business functions and metadata | Versioned Capability definitions |
| Knowledge Engine | Platform Knowledge, sources, applicability, lifecycle, immutable publication | Applicable Knowledge references |
| Rules Engine | Deterministic, versioned, traceable rule evaluation | Rule outcomes and evidence |
| Business Brain | Business analysis, Capability selection, health/risk/growth reasoning, decision orchestration | Decision records and recommendation candidates |
| Recommendation Engine | Prioritization, explanation, lifecycle, feedback, implementation-option mapping | Explainable recommendations |
| Configuration Engine | Converts accepted recommendations into reviewed platform or OS configuration proposals | Versioned configuration instructions; never direct ungoverned domain mutation |
| Readiness Service | Evaluates Core Workspace Ready and observes OS readiness milestones | Readiness status and unmet requirements |
| Product Hub | Business-context discovery, recommendation presentation, OS/plan selection, lifecycle visibility, routing | Product selections and setup handoffs |
| Product and Plan Catalog | OS metadata, canonical plans, compatibility, Capability mappings, setup destinations | Versioned product/plan definitions |
| Entitlement, Subscription, and Billing | Mandatory Workspace entitlement, OS subscriptions, plan/limit evaluation, trials, billing state | Entitlement decisions and commercial state |
| Installation and Activation Coordinator | Coordinates platform-side OS and Marketplace lifecycle transitions | Installation/activation state; OS setup remains OS-owned |
| Marketplace Control Plane | Asset catalog, immutable versions, purchase, install, activation, applicability, governance | Workspace-scoped asset state referencing shared assets |
| Notification Service | Platform notifications and delivery preferences; accepts authorized OS events | Notification records and delivery attempts |
| Audit Service | Append-only records for critical platform and OS actions | Tenant-scoped audit history |
| Settings and Localization | Platform settings, language, locale, direction, timezone, currency preferences | Resolved contextual settings |
| Search and Storage Coordination | Shared search contracts, metadata, file/object policies, quotas, secure access | Authorized references and indexed projections |
| Analytics Intake | Permission-aware, purpose-bound platform and OS usage signals | Aggregated intelligence inputs |
| API Architecture | Stable service contracts, API surfaces, API keys, policy enforcement, rate limits, versioning, idempotency, webhooks/events, and integration governance | Governed first-party, OS, partner, and cross-boundary access |
| AI Coordinator | Context building, expert selection, response synthesis, confidence, evidence, safety | One governed, explainable response |

### Component interaction

```text
Business Architect ──writes──> Business DNA Registry
                                  │
Knowledge Engine ───────────────┐ │
Capability Registry ────────────┤ │
Rules Engine ───────────────────┤ │
                               v v
                          Business Brain
                               │
                               v
                    Recommendation Engine
                               │
                  ┌────────────┴────────────┐
                  v                         v
          Configuration Engine        Product Hub
                                            │
                              OS/plan selection and handoff
                                            │
                                            v
                                  Independent Operating System
```

### 5.1 Business Architect Pipeline

The Business Architect Pipeline is the first-class architectural flow that turns an authenticated customer conversation into a reviewed, traceable Core Business DNA snapshot and initial recommendations for one selected Business.

It is not a generic form engine, an OS setup wizard, or an AI-only conversation. It is a resumable, policy-governed pipeline whose deterministic stages may use AI assistance without surrendering ownership of facts, rules, or readiness decisions.

#### Pipeline components

| Component | Responsibility |
|---|---|
| Session Orchestrator | Creates, resumes, expires, and completes a Business Architect session for one Workspace and selected Business. |
| Context Resolver | Loads authorized Workspace, Business, country, language, existing DNA, prior answers, and applicable Knowledge/Rules context. |
| Evidence Collector | Collects customer answers and permitted imported or previously known facts without treating any source as automatically authoritative. |
| Inference Service | Proposes facts that can reasonably be inferred and records confidence, evidence, and assumptions. |
| Question Planner | Selects the smallest useful next question based on missing Core Business DNA, uncertainty, dependencies, and customer burden. |
| Conversation Adapter | Presents questions and explanations through conversational UI while preserving structured identifiers beneath localized language. |
| Answer Normalizer | Converts raw answers into typed candidate facts while retaining the original customer input. |
| Provenance Registry | Records source type, source reference, actor, timestamp, confidence, and transformation history for every candidate fact. |
| DNA Assembler and Validator | Builds the candidate Core Business DNA projection and checks schema, ontology, rule, and cross-field constraints. |
| Review Checkpoint | Shows inferred and customer-provided facts, unresolved conflicts, and material assumptions for customer correction or confirmation. |
| DNA Publisher | Creates the next versioned Business DNA snapshot for the selected Business without changing Knowledge or software configuration. |
| Analysis Trigger | Invokes the Business Brain, Recommendation Engine, and Readiness Service using the exact published DNA, Knowledge, and Rule versions. |
| Pipeline State Store | Persists stage, checkpoints, outstanding questions, recoverable errors, and idempotency keys independently from the published DNA. |

#### Canonical flow

```text
Start or Resume Session
  → Resolve Authorized Workspace and Business Context
  → Load Existing DNA, Knowledge, Rules, and Evidence
  → Identify Missing or Uncertain Core DNA
  → Infer Candidate Facts Where Reasonable
  → Plan the Next Minimum Question
  → Capture and Normalize the Answer
  → Attach Provenance and Validate
  → Repeat Until Core DNA Is Sufficient
  → Customer Review and Confirmation
  → Publish Business DNA Snapshot
  → Generate Initial Recommendations
  → Evaluate Core Workspace Ready
  → Enter Product Hub
```

#### Pipeline states

`not_started → in_progress → review_required → publish_ready → published → analyzed → completed`

Exceptional states are `paused`, `blocked`, `expired`, and `superseded`. Retrying a stage must be idempotent. A failed analysis may be retried against the same published DNA snapshot; it must not republish or silently change Business DNA.

#### Pipeline invariants

- A session always belongs to one Workspace, one selected Business, and one authorized initiating actor.
- Additional Businesses run separate sessions and produce separate Business DNA.
- Raw input, normalized facts, inferred candidates, and published DNA remain distinguishable.
- Inferred facts expose confidence and source evidence and remain correctable by the customer.
- Material conflicts or low-confidence required facts trigger review rather than silent selection.
- Question order is adaptive, but readiness criteria and validation are deterministic and versioned.
- The pipeline never asks OS-specific setup questions or stores OS, plan, module, or configuration state as Business DNA.
- Publishing Business DNA and generating recommendations are separate auditable operations.

### 5.2 Product Hub internal architecture

Product Hub is a composed Core experience, not a single catalog screen. It resolves the selected Business context, presents prioritized business advice, maps that advice to eligible implementation options, and coordinates the platform-side portion of the OS lifecycle.

| Internal component | Responsibility |
|---|---|
| Hub Context Resolver | Resolves actor, Workspace, selected Business, optional explicit Workspace aggregation mode, locale, permissions, and lifecycle state. |
| Recommendation Feed | Presents Business improvement and Capability recommendations with reasons, evidence, impact, confidence, and disposition. |
| Implementation Option Mapper | Resolves eligible OS, plan, and Marketplace options already mapped by governed recommendation logic. |
| Product Catalog Projection | Provides customer-facing product metadata without becoming the canonical product/plan catalog. |
| Eligibility and Dependency Evaluator | Evaluates country, compatibility, plan, subscription, entitlement, permission, and declared dependency constraints. |
| Product Lifecycle Projection | Combines availability, recommendation, subscription, installation, setup, activation, readiness, pause, and update states without collapsing them. |
| Plan Comparison and Selection | Presents canonical plans and limits and records an explicit customer selection. |
| Subscription Coordinator | Creates or changes the Workspace-level OS subscription through the owning commercial component. |
| Installation Coordinator | Requests installation and exposes progress, recoverable failure, retry, and rollback state. |
| Setup Handoff Router | Creates a signed, short-lived, context-bound handoff to the OS-owned setup entry point. |
| Business Health and Growth View | Presents permitted health, maturity, coverage, risk, and growth projections produced by intelligence components. |
| Marketplace Discovery Adapter | Queries eligible Marketplace assets and scoped state without owning Marketplace catalog or transaction data. |

```text
Resolve Hub Context
  → Load Recommendations and Lifecycle Projections
  → Map and Filter Eligible Implementation Options
  → Explain Business Value and Alternatives
  → Customer Selects OS and Canonical Plan
  → Create or Update Subscription
  → Coordinate Installation
  → Create OS Setup Handoff
  → OS Owns Setup
  → Observe Readiness Projection
  → Launch Operational Dashboard When Ready
```

Product Hub read models may compose data from intelligence, subscriptions, product catalog, installation, Marketplace, and OS readiness sources. Those projections do not transfer canonical ownership to Product Hub.

### 5.3 AI Coordinator internal architecture

The AI Coordinator is the governed orchestration boundary between a customer request and one unified AI-assisted response. It is not itself an all-knowing expert and it does not own Business Knowledge, deterministic Rules, Business DNA, recommendations, permissions, or OS data.

| Internal component | Responsibility |
|---|---|
| Request Interpreter | Classifies intent, language, requested outcome, risk level, and required business or OS context. |
| Authorization Context Resolver | Establishes the actor and permitted Workspace, Business, Business Unit, Branch, OS, and resource scopes before retrieval. |
| Context Builder | Retrieves the minimum authorized Business DNA, Knowledge, recommendation, analytics, OS, and conversation context required for the request. |
| Policy and Safety Engine | Applies privacy, country, permission, action, data-use, and critical-operation policies before and after expert execution. |
| Expert Registry | Maintains versioned expert definitions, supported domains, required inputs, compatibility, status, and provenance. |
| Expert Router | Selects one or more appropriate experts using intent, context, capability, confidence requirements, and availability. |
| Instruction Assembler | Builds governed expert instructions from approved Knowledge, Rules, evidence, response policy, and task context. |
| Expert Execution Adapter | Invokes approved model or expert providers behind a replaceable interface with bounded tools, time, and data. |
| Collaboration Orchestrator | Coordinates multiple expert outputs, detects disagreement, and requests additional evidence when policy permits. |
| Evidence and Claim Validator | Checks that material claims are supported by permitted sources and flags uncertainty or unsupported output. |
| Response Synthesizer | Produces one coherent response rather than exposing internal expert conversations to the customer. |
| Confidence and Explainability Evaluator | Attaches confidence, assumptions, evidence references, alternatives, and human-verification guidance. |
| Action Proposal Broker | Converts requested actions into structured proposals for separate authorization and execution; it does not directly bypass owning services. |
| Conversation Context Manager | Maintains scoped conversation continuity under retention, consent, and tenant-isolation policies. |
| AI Audit and Observability | Records versions, context references, routing, policy decisions, tool/action proposals, latency, cost, and customer feedback. |

```text
Customer Request
  → Interpret Intent and Risk
  → Resolve Authorization Scope
  → Build Minimum Governed Context
  → Apply Pre-Execution Policy
  → Select Expert or Expert Set
  → Execute and Coordinate
  → Validate Evidence and Claims
  → Apply Post-Execution Policy
  → Synthesize One Explainable Response
  → Propose Separately Authorized Actions, If Any
  → Audit and Learn Through Approved Feedback
```

Low-confidence or materially conflicting expert outputs must be exposed as uncertainty, resolved through governed evidence, or escalated for human verification. They must never be converted silently into platform truth.

### 5.4 API Architecture

The API Architecture is the contract system through which Core modules, first-party applications, Operating Systems, Marketplace components, partners, and authorized external clients interact. The API Gateway is one enforcement and routing component within this architecture; it is not the architecture itself and does not own domain behavior.

#### API surfaces

| Surface | Intended consumers | Boundary |
|---|---|---|
| Core Module Contracts | Core logical modules inside the modular monolith | Typed internal commands, queries, and domain events; no arbitrary table access across modules. |
| First-Party Experience API | Core web/mobile surfaces and approved backend-for-frontend layers | Task-oriented compositions for onboarding, Business Architect, Product Hub, settings, and governance UI. |
| OS Integration API | Independent Nexoraxs Operating Systems | Identity context, organization references, entitlements, subscriptions, setup handoff, readiness, audit, notifications, and approved intelligence services. |
| Marketplace API | Product Hub, publishers, partners, and asset consumers according to role | Catalog, version, purchase, installation, activation, applicability, review, and governance contracts. |
| Public Platform API | Authorized customer and partner integrations | Stable, documented, rate-limited resources and actions; never internal implementation leakage. |
| Administrative API | Authorized Nexoraxs operators | Segregated operational controls with stronger authentication, approval, and audit requirements. |
| Event and Webhook API | OSs, internal consumers, customers, and partners | Versioned asynchronous notifications with explicit delivery, retry, ordering, and replay policies. |
| AI Tool API | AI Coordinator and approved experts | Narrow, permission-checked read or action-proposal tools; no unrestricted service or database access. |

#### Contract model

Every protected request or message carries or resolves:

- actor or service identity;
- correlation and trace identifiers;
- Workspace identifier;
- selected Business identifier when applicable;
- Business Unit, Department, Branch, OS, and resource scope when applicable;
- permission and entitlement context;
- contract version;
- locale and timezone when presentation or time semantics require them;
- idempotency key for retryable mutations;
- causation identifier for derived commands or events.

Clients may provide context identifiers, but Core must resolve and authorize them rather than trust them.

#### Interaction styles

- **Synchronous commands and queries** are used when a caller needs an immediate validated result.
- **Domain events** announce committed facts owned by one domain.
- **Integration events** expose stable, minimized facts across a boundary.
- **Webhooks** notify approved external consumers and are signed, retryable, observable, and replay-safe.
- **Long-running operations** such as installation use operation resources with explicit status rather than holding a request open.
- **Read projections** may compose several owners for a customer task, but a projection never becomes a new write authority.

#### API governance

- APIs are contract-first, technology-independent, and versioned independently from database schemas.
- Additive compatible change is preferred; breaking change requires a new version and published deprecation window.
- Resource identifiers and canonical lifecycle states remain stable across presentation surfaces.
- Mutations declare authorization, validation, idempotency, audit, and failure semantics.
- Errors use a stable machine-readable envelope with correlation identifiers and localized presentation handled separately.
- Collection APIs define pagination, filtering, sorting, field selection, and bounded query cost.
- Events define owner, schema version, causation, timestamp, tenant scope, ordering boundary, retention, and replay behavior.
- Consumers must tolerate duplicate asynchronous delivery; producers must not promise global ordering.
- Rate limits, quotas, abuse protection, and service-level policies are applied per identity, tenant, product, and risk.
- Observability covers latency, errors, authorization denials, contract version, dependency health, and tenant-safe traces.
- API documentation and conformance tests are generated from approved contracts after this proposal is approved.

The gateway authenticates, validates coarse policy, applies rate limits, routes, and records boundary telemetry. The owning domain still performs resource-level authorization, invariants, and business decisions. Gateway policy cannot replace domain policy.

---

## Navigation Architecture

Navigation is the governed movement of an authenticated user through Core Platform and independent OS experiences while preserving clear context, ownership, readiness, and permission boundaries.

### Navigation principles

- Navigation follows the customer journey: understand the Business before presenting software, then hand off to the owning OS.
- Workspace and selected Business context are always visible and explicit where they affect content or actions.
- Business Unit and Branch context appear when entering an OS or a Core governance task that requires operational scope.
- A context switch is validated before navigation and must never silently broaden access.
- Product Hub is the primary bridge between Core and Operating Systems; it is not the permanent shell around OS workflows.
- Every OS owns its internal menus, routes, dashboards, breadcrumbs, and module navigation.
- Core owns authentication, Workspace/Business selection, Business Architect, Product Hub, billing, team/access, Marketplace entry, notifications, and platform settings routes.
- Deep links must restore or request the required authorized context and pass readiness guards before showing the destination.
- Back, cancel, retry, and return-to-Product-Hub paths are first-class for setup and interrupted lifecycle operations.
- Labels and layouts are localized, bilingual-ready, and use logical direction for RTL/LTR behavior.

### Navigation surfaces

| Surface | Owner | Purpose |
|---|---|---|
| Public surface | Landing/marketing | Discovery, trust, pricing, and entry to authentication. |
| Authentication surface | Core Platform | Sign up, login, recovery, invitation acceptance, and session establishment. |
| Core onboarding surface | Core Platform | Workspace, Business identity, Business Architect Pipeline, review, recommendations, and Core Workspace Ready. |
| Core shell | Core Platform | Workspace/Business switching, Product Hub, team/access, billing, settings, notifications, audit, and Marketplace entry. |
| Product Hub | Core Platform | Recommended implementation options, lifecycle management, OS/plan selection, setup handoff, launch, upgrade, and expansion. |
| OS setup surface | Selected OS | Business Unit selection/creation and domain-specific setup, configuration review, activation, and readiness. |
| OS operational shell | Selected OS | Daily workflows, modules, operational context switching, reports, dashboards, and OS settings. |
| Marketplace surface | Marketplace bounded context presented through an approved Core entry | Asset discovery, evaluation, purchase, installation, activation, and applicability management. |

### Canonical user movement

```text
Public Surface
  → Authentication
  → Workspace Selection or Creation
  → Business Selection or Creation
  → Business Architect Pipeline
  → Recommendations
  → Core Workspace Ready
  → Product Hub
      ├── Core governance surfaces
      ├── Marketplace discovery
      └── Select OS and Plan
            → Subscription and Installation
            → Signed OS Setup Handoff
            → OS-Specific Setup
            → Operating System Ready
            → OS Operational Dashboard
                  └── Return to Product Hub or switch authorized context
```

### Context and route guards

Navigation decisions evaluate, in order:

1. authenticated identity and session validity;
2. Workspace membership and Workspace lifecycle;
3. selected Business access and Business lifecycle;
4. Core Workspace Ready for Product Hub entry;
5. required permission and entitlement for the requested surface;
6. subscription, installation, setup, activation, and OS readiness for OS routes;
7. Business Unit and Branch access for operational routes;
8. locale, direction, and safe return destination.

A failed guard routes to an explainable recovery state—such as context selection, access request, resume setup, subscription recovery, or Product Hub—rather than a generic dashboard or silent denial.

### Cross-application handoff

Core-to-OS movement uses a signed, short-lived handoff reference rather than placing sensitive state in a URL. The destination re-resolves identity, tenant context, permissions, subscription, and lifecycle state. The handoff may carry opaque references to Workspace, Business, selected product, selected plan, installation operation, and intended return location, but it does not transfer ownership or serve as permanent authorization.

OS-to-Core return navigation uses the same principles. An OS may link to Product Hub or Core governance tasks, but it must not reproduce those Core screens or assume that an earlier authorization decision remains valid.

---

## 6. Domain Boundaries

### 6.1 Core Platform versus Operating Systems

Core owns shared identity, organization, intelligence, governance, and commercial coordination. Each OS owns its user experience, operational domain model, business rules, workflows, setup, APIs, menus, dashboards, reports, settings, and operational data.

Core may know that an OS implements particular Capabilities. It must not reproduce that OS's modules or operational logic.

### 6.2 Platform concepts versus OS implementation details

- A **Capability** is a platform-owned description of what a Business needs.
- An **Operating System** is an independent implementation option for one or more Capabilities.
- A **Module** is an OS-owned implementation detail.
- A **Recommendation** identifies a business improvement or Capability before identifying implementation options.

An OS may reference Capability identifiers. It may not redefine the Capability to suit its module model.

### 6.3 Business structure versus operational data

Core owns the canonical organization graph: Workspace, Business, Business Unit, Department, and Branch identities and relationships. An OS owns operational records scoped to those identifiers.

Creating an operational Business Unit is initiated within OS-specific setup because the OS knows the required operating context. The resulting canonical Business Unit identity is registered through Core; its OS domain configuration remains inside the OS.

### 6.4 Knowledge versus customer context

Knowledge content and published versions are platform-owned, shared, immutable assets. Workspace purchase, installation, activation, version selection, and Business applicability are scoped references. They never copy or mutate the shared Knowledge asset.

Business DNA and customer operational data are tenant-scoped. They are not platform Knowledge and must not silently become shared Knowledge through learning.

### 6.5 Deterministic rules versus AI

Rules determine governed outcomes. AI may explain, summarize, infer candidates, or propose actions, but it cannot authoritatively change permissions, subscriptions, financial records, compliance policy, Business DNA, or OS data without validated rules and explicit authorized action.

### 6.6 Product Hub versus Marketplace

Product Hub is the customer-facing advisor and lifecycle entry point. Marketplace is the governed distribution bounded context for versioned business assets and its own commercial and publication lifecycles. Product Hub consumes Marketplace catalog projections and scoped state but does not own Marketplace assets, purchases, installations, activations, reviews, publisher records, or lifecycle rules.

Genesis identifies Marketplace as a Core Platform responsibility while also describing it as a permanent ecosystem layer. This proposal interprets those statements as follows:

- The **Core Platform boundary** is accountable for providing and governing Marketplace as a shared platform capability.
- The **Marketplace bounded context** owns its catalog, asset/version lifecycle, publisher governance, purchase, installation, activation, applicability, update, deprecation, and removal records.
- Shared Core services continue to own identity, Workspace and Business references, authorization primitives, billing rails, audit, notifications, and tenant isolation used by Marketplace.
- Product Hub and Business Brain query Marketplace through contracts and stable projections. They never write Marketplace-owned tables or embed Marketplace lifecycle logic.
- Marketplace assets may extend an OS, Knowledge, automation, dashboards, workflows, themes, templates, or AI Experts, but installation never transfers ownership of the shared asset content to a Workspace or OS.
- Marketplace may begin as a logical module in the Core modular monolith and later become separately deployed without changing its bounded ownership or public contracts.

This separates architectural ownership from deployment. Marketplace remains part of the Nexoraxs Core Platform offering without becoming an undifferentiated responsibility of every Core module.

### 6.7 Core Workspace Ready versus Operating System Ready

**Core Workspace Ready** requires a Workspace, one selected Business identity, Core Business DNA for that Business, and initial recommendations. It permits entry to Product Hub.

**Operating System Ready** additionally requires an active eligible subscription, installation, an operational Business Unit, completed OS-specific setup, generated/reviewed configuration, activation, and access. It permits entry to that OS's Operational Dashboard.

These states must never be collapsed into a generic `onboarding_complete` flag.

---

## 7. Ownership Rules

### 7.1 Canonical ownership matrix

| Concept or data | Canonical owner | Scope | Consumers |
|---|---|---|---|
| User identity and credentials | Core Platform | Platform/User | All authorized platform surfaces |
| Workspace and membership | Core Platform | Workspace | Core and all OSs |
| Business identity | Core Platform | Workspace/Business | Business Architect, intelligence, OSs |
| Business DNA | Core Platform | Exactly one Business | Business Brain, recommendations, applicable OS configuration |
| Workspace intelligence aggregation | Core Platform projection | Workspace over explicit Business set | Product Hub, analytics, AI |
| Business Unit identity | Core Platform registry | Business | Applicable OSs and shared authorization |
| Department identity | Core Platform registry | Business Unit | Applicable OSs and shared authorization |
| Branch identity | Core Platform registry | Business Unit | Applicable OSs and shared authorization |
| Capabilities | Core Platform | Platform | Business Brain, Product Hub, OS mappings, Marketplace |
| Knowledge and Rules | Core Platform | Platform/versioned applicability | Business Brain, AI, OSs, Marketplace |
| Recommendation definition and decision record | Core Platform intelligence | Business by default; explicit Workspace aggregation when requested | Product Hub, Business Architect, AI, OS setup |
| OS product and plan catalog | Core Platform | Platform | Product Hub, subscriptions, OSs |
| Workspace entitlement | Core Platform | Workspace | All platform services |
| OS subscription | Core Platform | Workspace and OS | Product Hub and selected OS |
| OS installation/activation record | Core Platform control plane | Workspace, OS, and applicable Business/Business Unit context | Product Hub and selected OS |
| OS setup state and domain configuration | Selected OS | Business Unit/OS | Selected OS; readiness projection to Core |
| OS operational data and workflows | Selected OS | Workspace + Business + Business Unit/Branch as applicable | Owning OS and authorized integrations |
| Marketplace asset content/version | Core Platform Marketplace | Platform/shared/immutable | Product Hub, Business Brain, OSs, AI |
| Marketplace purchase/install/activation | Core Platform Marketplace | Workspace | Product Hub and authorized consumers |
| Marketplace applicability | Core Platform Marketplace | Workspace or Business | Business Brain, OSs, AI |
| Notification record | Core Platform | Workspace, with producer context | Core, users, authorized OSs |
| Audit record | Core Platform | Workspace, with source/domain context | Authorized governance surfaces |
| AI expert definition | Core Platform/Marketplace | Platform/versioned | AI Coordinator |
| AI response and evidence | Core Platform | User + Workspace + Business context | Authorized requester and audit controls |

### 7.2 Mandatory ownership rules

1. Every Business belongs to exactly one Workspace.
2. Every Business owns exactly one Business DNA identity; versions are history of that identity, not additional identities.
3. Workspace-level intelligence is an explicit projection and never merges or rewrites Business DNA.
4. Every Business Unit belongs to exactly one Business.
5. Every Department and Branch belongs to exactly one Business Unit.
6. Operating Systems operate on Business Units and scope operational data with the complete required tenant hierarchy.
7. OS subscriptions belong to the Workspace; operational activation must also identify its applicable Business and Business Unit context.
8. Platform Knowledge, Rules, Capabilities, and published Marketplace asset versions exist once and are referenced, never tenant-copied.
9. Recommendations are generated from governed inputs and stored separately from Business DNA.
10. An OS owns its modules and domain configuration but cannot own or redefine platform identity, Knowledge, Capabilities, subscriptions, or Business DNA.
11. No OS reads or writes another OS's database. Cross-OS collaboration uses authorized platform contracts and optional integrations.
12. Audit records are append-only; corrective actions create new records rather than altering history.
13. AI never becomes the canonical owner of Knowledge, Rules, Business DNA, permissions, or operational truth.

---

## 8. Integration with Genesis

This proposal is a bounded interpretation of Genesis v1.1 and must remain subordinate to it. Approval of this proposal clarifies Core Platform responsibilities; it does not amend Genesis.

| Genesis foundation | Core Platform interpretation |
|---|---|
| Vision and Constitution | Core prioritizes business understanding, explainability, inference, human control, data-driven configuration, simplicity, and durable scale. |
| Business DNA | Core maintains one Business-scoped DNA identity and explicit, non-destructive Workspace aggregation. |
| Capabilities | Core provides the canonical Capability Registry; OSs consume Capabilities and implement them through OS-owned modules. |
| Knowledge Engine | Core governs shared, structured, versioned, immutable published Knowledge and traceable sources. |
| Business Brain | Core hosts decision orchestration without duplicating Knowledge or owning OS software. |
| Recommendation Engine | Core recommends improvements and Capabilities first, with OSs, plans, and Marketplace assets mapped second. |
| AI Strategy and AI Expert Network | Core coordinates permission-aware experts after Knowledge, Rules, and analytics, while preserving human authority. |
| Platform Blueprint and Ecosystem | Core supplies the shared platform and intelligence services consumed by independent Operating Systems and the broader ecosystem. |
| Ontology | Core schemas, APIs, events, UI language, and documentation use the canonical Workspace → Business → Business Unit → Department/Branch hierarchy and defined platform terms. |
| Customer Journey | Core navigation guides the customer through the resumable Business Architect Pipeline, Core Workspace Ready, and Product Hub, then performs a governed handoff to OS-specific setup. |
| Workspace and Business Lifecycles | Core records lifecycle state and provides intelligence that evolves with each Business without forcing software changes. |
| Product Hub | Core composes Business context, recommendations, eligibility, lifecycle projections, plan selection, installation coordination, and setup routing without becoming a static catalog or owning OS setup. |
| Subscription Model | Core owns mandatory Workspace entitlement, independent Workspace-level OS subscriptions, canonical plans, optional Marketplace purchases, and transparent state. |
| Operating System Lifecycle | Core coordinates selection, subscription, installation, and platform activation; the OS owns setup, domain configuration, operational readiness, and daily operation. |
| Marketplace and Knowledge Packs | Marketplace is a Core Platform capability with its own bounded ownership; it separates immutable shared asset versions from Workspace purchase/install/activation and Business applicability. |

### Genesis conformance tests

Any later architecture or implementation should be rejected if it:

- stores Business DNA at Workspace, Business Unit, Branch, or OS scope instead of Business scope;
- asks the customer to select software before enough Business understanding exists to provide recommendations;
- recommends an OS without first expressing the business improvement and Capability need;
- duplicates Knowledge, Capabilities, subscriptions, identity, or Business Brain logic inside an OS;
- moves OS-specific setup or operational domain logic into Product Hub;
- treats an OS subscription as proof that the OS is configured or ready;
- mutates published Knowledge or Marketplace asset versions in place;
- permits direct cross-OS database dependencies;
- allows AI to bypass permissions, deterministic rules, customer approval, or audit;
- collapses the Workspace, Business, Business Unit, Department, and Branch concepts.

---

## 9. Relationship to Future Milestones

This proposal defines boundaries that future milestones may implement incrementally. It does not authorize all target components for immediate delivery and does not replace milestone-specific specifications.

### Milestone relationship

| Milestone horizon | Core Platform outcome | Deferred or dependent work |
|---|---|---|
| Genesis foundation | Genesis v1.1 remains the permanent authority; this proposal establishes a reviewable Core interpretation. | No implementation implied. |
| Core architecture documentation | After proposal approval, produce detailed Core domain, data, service, security, lifecycle, and integration documentation. | Must not begin before approval. |
| Core foundation implementation | Identity, Workspace, Business, tenant isolation, settings/localization, entitlement, membership, audit foundation, and canonical contracts. | Advanced intelligence and ecosystem features may remain staged. |
| Business understanding | Business Architect, Core Business DNA, Knowledge/Capability foundations, deterministic Rules, recommendations, and Core Workspace Ready. | Continuous learning and broad knowledge coverage may evolve later. |
| Product selection and first OS handoff | Product Hub, canonical product/plan catalog, subscription/install state, readiness separation, and contract-driven handoff to the first OS. | The OS owns its setup and operational implementation. |
| Multi-OS platform expansion | Reuse the same Core contracts for additional independent Operating Systems and optional integrations. | No redesign of Core identity or intelligence per OS. |
| Marketplace ecosystem | Asset governance, partner publishing, certification, installation, versioning, billing, and scoped applicability. | Initial Product Hub may expose only official products. |
| AI Expert Network | Governed expert routing, evidence, confidence, permission-aware context, feedback, and premium AI services. | AI remains downstream of Knowledge, Rules, and Business Brain. |
| Enterprise and developer ecosystem | Multi-country governance, advanced analytics, public APIs, webhooks/events, SDKs, partner tools, testing sandbox, and certification. | Physical service extraction occurs only when justified by measured needs. |

Every milestone must preserve stable identifiers, explicit versioning, tenant scope, ownership boundaries, and backward-compatible contracts so the platform can grow without rebuilding customer systems.

---

## 10. Risks

| Risk | Consequence | Proposed mitigation |
|---|---|---|
| Core becomes an oversized “everything” domain | Slow delivery, unclear ownership, high coupling | Enforce logical modules, explicit ownership, dependency direction, contract tests, and separate data access boundaries. |
| Intelligence scope delays the usable foundation | No shippable path to the first OS | Deliver thin end-to-end slices: Business DNA and explainable rules first, broader knowledge and AI later. |
| Old architecture language survives in code and UX | Conflicting hierarchy and duplicated models | Treat Genesis ontology as authoritative; inventory and migrate legacy terms through explicit compatibility decisions. |
| Business and Business Unit are conflated | Incorrect DNA ownership and future multi-Business failure | Use Business for identity/DNA and Business Unit for OS operational divisions; validate parentage at every boundary. |
| Product Hub becomes an app catalog | Genesis value proposition is lost | Require recommendation reason, Capability mapping, Business context, impact, and explanation for prioritized products. |
| Recommendations become opaque or AI-led | Low trust, unsafe decisions, poor auditability | Store rule/knowledge versions, evidence, assumptions, confidence, alternatives, and customer decisions. |
| Tenant or scope leakage | Severe security and privacy failure | Require Workspace scope on tenant data, hierarchical scope checks, row-level enforcement strategy, security tests, and audited service identities. |
| Shared organization registry leaks OS domain logic | Core becomes coupled to operational workflows | Store canonical identities and relationships only; keep domain attributes and behavior inside the owning OS. |
| Subscription, installation, configuration, and readiness are collapsed | Incorrect access and broken lifecycle transitions | Model each lifecycle state separately with idempotent transitions and explicit invariants. |
| Immutable asset rules are ignored | Lost traceability and unsafe updates | Content-address/version published assets; represent activation as scoped references to exact versions. |
| Configuration Engine mutates OS data without governance | Hidden coupling and unsafe automation | Exchange versioned configuration proposals through OS contracts; require validation, idempotency, review policy, and audit. |
| Shared analytics becomes uncontrolled surveillance | Loss of customer trust and regulatory exposure | Apply purpose limitation, consent/legal basis, minimization, retention, aggregation, and permission-aware access. |
| AI context crosses Business or Workspace boundaries | Confidentiality breach | Build context from authorized identifiers, filter before retrieval, log evidence references, and red-team isolation. |
| Premature microservice decomposition | Operational complexity without business value | Start with enforced modular boundaries; extract only for demonstrated scaling, security, release, or ownership needs. |
| Genesis and current implementation materially diverge | Migration cost and inconsistent customer state | Complete an explicit gap assessment after proposal approval and sequence migrations before new dependent features. |
| Business Architect becomes an ungoverned chatbot or fixed wizard | Untraceable facts, excessive questions, or invalid DNA | Enforce the staged pipeline, structured facts, provenance, deterministic validation, resumability, and customer review. |
| Product Hub read models become accidental write owners | Subscription, Marketplace, or readiness state diverges | Keep commands with canonical owners; treat Hub compositions as disposable projections with contract tests. |
| AI Coordinator accumulates domain decisions | AI bypasses Rules, Business Brain, or owning services | Separate routing, context, policy, evidence, synthesis, and action proposal; authorize execution outside AI. |
| API surface proliferation creates inconsistent contracts | High integration cost and tenant-security gaps | Apply one governance model, canonical context, schema registry, compatibility policy, and conformance tests across surfaces. |
| Navigation loses or silently changes tenant context | Users act in the wrong Business, Business Unit, or Branch | Make context visible, reauthorize every switch and handoff, use readiness guards, and provide explicit recovery routes. |
| Marketplace is treated either as Product Hub data or as an unrelated external system | Ownership ambiguity, duplicated commerce, and broken asset lifecycle | Preserve a separate Marketplace bounded context inside the Core Platform offering and integrate only through contracts. |

---

## 11. Open Questions

The following questions require decisions during review or subsequent detailed architecture. They do not block review of the overall boundary unless marked foundational.

1. **Foundational — Business migration:** How will existing records that use `BusinessUnit` as the user-visible Business be migrated into the Genesis Workspace → Business → Business Unit hierarchy without duplicating identity or losing tenant data?
2. **Foundational — organization write authority:** Should Core be the only writer of Business Unit, Department, and Branch identities, with OSs issuing commands, or may an OS create them transactionally through a Core-owned API during setup?
3. **Foundational — activation scope:** What canonical record replaces or evolves the earlier `OSEnablement` concept so it represents Genesis subscription, installation, configuration, activation, Business, and Business Unit relationships without collapsing lifecycle states?
4. What is the minimum approved Core Business DNA schema needed to declare Core Workspace Ready?
5. Which Business DNA changes create a new immutable snapshot, and which fields may be corrected in place before publication?
6. What provenance and confidence model applies to customer answers, deterministic inferences, imported data, partner data, and AI-proposed facts?
7. Are generated recommendations durable versioned records, reproducible projections, or both, and what retention is required for rejected or superseded recommendations?
8. How are Knowledge and Rule versions pinned for reproducibility while still allowing customers to benefit from safe updates?
9. Which configuration instructions may apply automatically, and which always require explicit customer approval or OS confirmation?
10. What is the initial plan-limit model for users, Businesses, Business Units, Branches, storage, Capabilities, AI, and usage, and which limits are commercial versus safety controls?
11. Which lifecycle states are canonical for Workspace entitlement, OS subscription, installation, setup, configuration, activation, readiness, pause, archive, and removal?
12. Does Marketplace remain a Core logical module indefinitely, or become a separately deployed control plane while retaining Core ownership and contracts?
13. What event delivery guarantees, ordering, idempotency, schema versioning, replay, and retention are required before optional cross-OS integrations are introduced?
14. What data may be used for anonymous learning, under which consent and residency rules, and how is re-identification prevented?
15. Which audit events are legally or operationally immutable, and what retention/export requirements apply by country?
16. What are the recovery semantics when billing succeeds but installation fails, or OS setup completes but Core activation acknowledgement fails?
17. How will Arabic/English terminology, RTL/LTR behavior, country rules, currencies, and timezones be represented across platform and OS contracts?
18. What compatibility policy and deprecation window will Core APIs, schemas, events, Capability definitions, and product catalog entries guarantee to Operating Systems?
19. Which Business Architect facts are material enough to require explicit confirmation before DNA publication, and which high-confidence inferences may be accepted through streamlined review?
20. How long may a Business Architect session remain resumable, and how are concurrent sessions or edits for the same Business reconciled?
21. Which Product Hub projections require real-time consistency, and which may be eventually consistent without misleading the customer during purchase, installation, or readiness transitions?
22. Which AI model and expert providers may receive which classes of data, and what provider, residency, retention, and fallback policies apply?
23. Which API surfaces are required for the first OS handoff, and which remain target architecture until partner or public integration milestones?
24. What canonical URL, subdomain, context-selector, deep-link, and return-route conventions will apply across Core, Marketplace, and independent OS applications?

---

## 12. Architecture Decisions (Draft ADRs)

These draft Architecture Decision Records are contained in this proposal for review. They must not be split into separate ADR files or treated as accepted until this proposal is approved and each decision is confirmed.

### ADR-CP-001 — Core Platform is the shared control and intelligence plane

- **Status:** Draft
- **Decision:** Core owns shared identity, organization, commercial control, platform governance, Knowledge, Rules, Business DNA, Business Brain, recommendations, configuration coordination, Product Hub, Marketplace control, and AI coordination.
- **Rationale:** Genesis makes business understanding and shared intelligence foundational platform concerns, not optional OS features.
- **Consequence:** Core requires strong internal modularity; an OS must consume contracts rather than duplicate these concerns.

### ADR-CP-002 — Adopt the Genesis organization hierarchy

- **Status:** Draft
- **Decision:** The canonical hierarchy is Workspace → Business → Business Unit → Department/Branch. Every Business belongs to one Workspace; every Business Unit belongs to one Business; every Department and Branch belongs to one Business Unit.
- **Rationale:** These concepts have distinct Genesis meanings and ownership.
- **Consequence:** Legacy models that treated Business and Business Unit as synonyms require an explicit migration and compatibility plan.

### ADR-CP-003 — Business DNA is Business-scoped and software-independent

- **Status:** Draft
- **Decision:** Each Business owns exactly one Business DNA identity. Business DNA contains business facts, not OS, plan, module, or configuration state. Workspace intelligence uses explicit aggregation projections.
- **Rationale:** This preserves multi-Business accuracy and prevents software choices from redefining the Business.
- **Consequence:** Recommendation and configuration records must be stored separately.

### ADR-CP-004 — Knowledge, Rules, Capabilities, and published assets are shared versioned platform assets

- **Status:** Draft
- **Decision:** Published versions are immutable and referenced by identifier and version. Tenant purchase, activation, applicability, and version selection are scoped records, not content copies.
- **Rationale:** Genesis requires one source of Knowledge, traceability, reuse, and preservation of history.
- **Consequence:** Updates publish new versions; rollback changes a reference rather than mutating content.

### ADR-CP-005 — Recommendations are capability-first and explainable

- **Status:** Draft
- **Decision:** Recommendation records identify the business improvement and Capability before mapping OS, plan, or Marketplace implementation options. They retain evidence, versions, assumptions, confidence, impact, alternatives, and customer disposition.
- **Rationale:** Product selection must follow business understanding and remain transparent.
- **Consequence:** A product-only recommendation is invalid even if commercially useful.

### ADR-CP-006 — Core Workspace Ready and Operating System Ready are separate state machines

- **Status:** Draft
- **Decision:** Core readiness ends at sufficient Business understanding and initial recommendations; OS readiness additionally requires subscription, installation, Business Unit context, OS setup, configuration, activation, and access.
- **Rationale:** Genesis defines different customer and operational outcomes for the two states.
- **Consequence:** A single onboarding completion flag is prohibited.

### ADR-CP-007 — Product Hub owns discovery and handoff, not OS setup

- **Status:** Draft
- **Decision:** Product Hub presents prioritized recommendations, records OS/plan selection, coordinates subscription and installation, shows lifecycle state, and routes to the OS. The OS owns all domain-specific setup.
- **Rationale:** This keeps Product Hub intelligent and cross-platform while preserving OS independence.
- **Consequence:** Core needs a versioned setup-handoff contract and readiness callback/projection.

### ADR-CP-008 — OS subscriptions are Workspace-scoped; operation is Business Unit-scoped

- **Status:** Draft
- **Decision:** The commercial subscription belongs to the Workspace and OS. Installation, setup, and activation records additionally reference the selected Business and operational Business Unit as their lifecycle requires.
- **Rationale:** Commercial purchase and operational use are different concerns.
- **Consequence:** Entitlement evaluation combines Workspace subscription with explicit operational scope and access.

### ADR-CP-009 — Operating Systems integrate through contracts, never shared domain tables

- **Status:** Draft
- **Decision:** OSs consume Core APIs/events and use optional, versioned integration contracts for cross-OS collaboration. Direct cross-OS database access is prohibited.
- **Rationale:** OSs must remain independently installable, upgradeable, pausable, and removable.
- **Consequence:** Contracts require versioning, idempotency, authorization, observability, and failure recovery.

### ADR-CP-010 — AI is downstream of Knowledge, Rules, and authorization

- **Status:** Draft
- **Decision:** AI receives only authorized context assembled by Core, cites governed evidence, reports confidence and assumptions, and cannot perform critical mutations without deterministic validation and explicit authorized approval.
- **Rationale:** Genesis places Knowledge first, AI fourth, with humans retaining control.
- **Consequence:** AI outputs are proposals or explanations unless a separately authorized action workflow exists.

### ADR-CP-011 — Begin as an enforced modular monolith

- **Status:** Draft
- **Decision:** Implement Core logical modules within the existing modular-monolith strategy while enforcing dependency direction, module APIs, isolated data access, and contract tests. Physical extraction is a later operational decision.
- **Rationale:** Logical independence is required now; distributed-system complexity is not.
- **Consequence:** Module boundaries must be strong enough to permit later extraction without making extraction a current requirement.

### ADR-CP-012 — Configuration is proposed across boundaries, not silently imposed

- **Status:** Draft
- **Decision:** The Configuration Engine emits versioned, traceable configuration proposals. The owning OS validates and applies its domain configuration idempotently under an explicit auto-apply or customer-review policy.
- **Rationale:** Core may coordinate intelligent configuration but cannot own OS domain state or bypass human control.
- **Consequence:** Configuration contracts must include source recommendation, Knowledge/Rule versions, target scope, compatibility, status, and audit data.

### ADR-CP-013 — Tenant and scope are explicit in every protected operation

- **Status:** Draft
- **Decision:** Authentication establishes identity; every protected read, write, event, search, analytics query, and AI context build additionally evaluates Workspace and applicable Business, Business Unit, Department, Branch, OS, and resource scope.
- **Rationale:** Hierarchical ownership alone does not prove authorization.
- **Consequence:** Scope propagation, policy evaluation, logging, and isolation tests are platform requirements.

### ADR-CP-014 — Architecture contracts are technology-independent and backward-compatible

- **Status:** Draft
- **Decision:** Domain identifiers, schemas, APIs, events, lifecycle states, and ownership contracts are specified independently from framework and deployment choices and evolve through explicit versions.
- **Rationale:** Genesis is intended to survive technology generations, and independent OSs require stable integration surfaces.
- **Consequence:** Framework types and database models cannot become the only definition of a platform contract.

### ADR-CP-015 — Business Architect is a resumable governed pipeline

- **Status:** Draft
- **Decision:** Business Architect operates as explicit context, inference, question-planning, capture, normalization, provenance, validation, review, publication, analysis, and readiness stages for one selected Business.
- **Rationale:** Business DNA must be efficient to collect while remaining structured, explainable, correctable, and independent from AI or presentation format.
- **Consequence:** Conversation UI and AI assistance may evolve without changing pipeline ownership, checkpoints, invariants, or published DNA semantics.

### ADR-CP-016 — Product Hub is a composition boundary, not a data owner

- **Status:** Draft
- **Decision:** Product Hub composes Business context, recommendations, catalog, eligibility, subscriptions, installation, Marketplace, and OS readiness through projections and owner-directed commands. It owns customer journey orchestration and setup routing, not the underlying domain records.
- **Rationale:** Product Hub must provide one coherent advisor experience without collapsing independent lifecycles and owners.
- **Consequence:** Product Hub requires stable query projections, command contracts, explainable partial-failure states, and no direct writes to source-domain tables.

### ADR-CP-017 — Marketplace is a separate bounded context within the Core Platform offering

- **Status:** Draft
- **Decision:** Nexoraxs Core Platform is accountable for Marketplace, while Marketplace owns its asset, publisher, version, purchase, installation, activation, applicability, review, and lifecycle models behind explicit contracts.
- **Rationale:** This reconciles Genesis Core ownership with Marketplace's role as a permanent ecosystem layer and prevents Product Hub or unrelated Core modules from absorbing Marketplace logic.
- **Consequence:** Marketplace may be co-deployed initially and extracted later without changing ownership; it consumes shared Core identity, billing, authorization, audit, and notification services.

### ADR-CP-018 — The API Gateway is part of a contract-first API Architecture

- **Status:** Draft
- **Decision:** Core exposes governed internal, first-party, OS, Marketplace, public, administrative, event/webhook, and AI-tool surfaces under shared context, security, versioning, idempotency, error, observability, and compatibility rules. The gateway handles boundary enforcement and routing, while owning domains enforce resource authorization and invariants.
- **Rationale:** Independent OSs and future ecosystem participants require stable contracts rather than a routing proxy or shared database.
- **Consequence:** API schemas and conformance tests become first-class architecture assets after approval; database schemas and framework endpoints are not public contracts.

### ADR-CP-019 — Navigation preserves explicit context and route ownership

- **Status:** Draft
- **Decision:** Core owns movement through authentication, Workspace/Business context, Business Architect, Product Hub, and Core governance; each OS owns setup and operational navigation. Cross-application movement uses short-lived handoffs and re-evaluated route guards.
- **Rationale:** Navigation must feel unified without hiding tenant scope, readiness, or independent product ownership.
- **Consequence:** Context selectors, deep links, return routes, readiness recovery, localization, and RTL/LTR behavior require shared navigation contracts rather than one global hardcoded menu.

### ADR-CP-020 — AI Coordinator separates orchestration from expertise and action execution

- **Status:** Draft
- **Decision:** AI coordination is decomposed into request interpretation, authorization context, context building, policy, expert registry/routing, bounded execution, collaboration, evidence validation, synthesis, confidence, action proposals, conversation context, and audit. Consequential action execution remains with authorized owning services.
- **Rationale:** Internal separation prevents AI from becoming an opaque source of Knowledge, Rules, permissions, or domain authority.
- **Consequence:** Expert providers and models remain replaceable, all context is least-privilege, and low-confidence or conflicting outputs require explicit uncertainty or human verification.

---

End of proposal. Detailed Core Platform documentation must not be generated until this proposal is reviewed and approved.
