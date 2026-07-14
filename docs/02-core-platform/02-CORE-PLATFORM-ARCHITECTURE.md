# Core Platform Architecture

Version: 1.0  
Status: Milestone 1 — Wave 1  
Authority: Genesis v1.1 and the approved Core Platform Architecture Proposal v0.2  
Owner: Nexoraxs

---

## Purpose

This document defines the detailed logical architecture of the Nexoraxs Core Platform for Milestone 1.

It expands the approved proposal into component boundaries, dependency direction, first-class flows, lifecycle coordination, API surfaces, navigation behavior, ownership, and extension points. It remains technology-independent except for the approved decision to begin with an enforced modular-monolith posture.

This is an architecture document, not an implementation specification. It does not define database tables, endpoint paths, event names, UI layouts, infrastructure topology, or the answers to open questions preserved by the approved proposal.

## Scope

This document covers:

- the Core Platform logical boundary;
- internal Core component groups and responsibilities;
- organizational and tenant context;
- the Business Architect Pipeline;
- Business DNA, Knowledge, Rules, Business Brain, recommendations, configuration proposals, and readiness;
- Product Hub internal composition and OS lifecycle handoff;
- Workspace entitlement, subscriptions, plans, billing coordination, installation, and activation;
- Marketplace as a separate bounded context within the Core Platform offering;
- shared platform services;
- AI Coordinator decomposition;
- API Architecture;
- Navigation Architecture;
- integration with independent Operating Systems;
- ownership and dependency rules;
- future architectural extension points.

It excludes OS operational architecture, physical data design, deployment implementation, detailed security design, API catalogs, UI specifications, and future-wave documents.

## Principles

### Shared intelligence, independent software

Knowledge, Capabilities, Rules, Business DNA interpretation, recommendations, and AI coordination are shared platform concerns. Each OS independently owns its domain software and operational truth.

### Logical boundaries before physical distribution

Core begins as an enforced modular monolith. Every module has an explicit owner, contract, allowed dependencies, and data access boundary. A future deployment split must preserve these semantics.

### Business context is explicit

Workspace, Business, Business Unit, Department, Branch, OS, and resource scopes are never inferred only from a route or user interface. Protected operations resolve and authorize all applicable context.

### Contract-first collaboration

Core modules, OSs, Marketplace, partners, and AI tools interact through governed contracts. Direct access to another domain's mutable tables is prohibited.

### Capability-first intelligence

The intelligence path recommends business improvements and Capabilities before mapping product, plan, or Marketplace implementation options.

### Lifecycle separation

Entitlement, subscription, installation, setup, configuration, activation, readiness, operation, pause, archive, and removal are distinct concepts. Architecture may project them together but must not collapse them.

### Explainability and provenance

Facts, inferences, rules, recommendations, configurations, and AI outputs retain the evidence, version, actor, assumptions, and decisions required to explain them.

### Human authority

AI and automation may propose and assist. Deterministic policy and authorized customers or services govern consequential state changes.

## Responsibilities

The Core Platform is responsible for five architectural outcomes.

### 1. Establish the shared platform context

Core authenticates users, maintains Workspace membership, records the canonical organization graph, resolves settings and localization, and supplies tenant-safe authorization primitives.

### 2. Understand every Business independently

Core runs a separate Business Architect Pipeline for each selected Business, publishes its versioned Business DNA, and supports explicit Workspace-level intelligence aggregation without merging Business DNA.

### 3. Produce governed intelligence

Core maintains shared Knowledge, Capabilities, deterministic Rules, the Business Brain, Recommendation Engine, configuration proposals, and readiness evaluation. It preserves the boundary between business facts, platform knowledge, recommendations, and software configuration.

### 4. Coordinate products and growth

Core uses Product Hub to present relevant recommendations, eligible implementation options, plans, subscription and installation state, Marketplace discovery, and OS setup handoff. It later supports upgrades and expansion without owning OS setup.

### 5. Provide reusable governance

Core supplies commercial control, APIs, integrations, notifications, audit, search, storage coordination, analytics intake, settings, localization, navigation coordination, and AI orchestration used across products.

## Architecture

### 1. Architectural context

```text
Customers and Workspace Members
                │
                v
      Core Platform Experiences
                │
      ┌─────────┼──────────┐
      v         v          v
Business     Product    Core Governance
Architect      Hub        Surfaces
      │         │          │
      └─────────┼──────────┘
                v
      Core Platform Modules
                │
    ┌───────────┼────────────┐
    v           v            v
Marketplace  Independent   Partners and
Context      Operating     External Clients
             Systems
```

The Core Platform offers a unified customer journey while preserving distinct write ownership. Experience layers compose projections and send commands to canonical owners; they do not become owners merely because they present the data.

### 2. Logical component groups

#### 2.1 Identity, tenancy, and organization

| Component | Responsibility | Does not own |
|---|---|---|
| Identity and Access | User identity, authentication, sessions, recovery, Workspace membership, roles, and scoped authorization decisions. | HR employee profiles or OS operational roles as domain entities. |
| Workspace Management | Workspace lifecycle, selection, defaults, settings, mandatory entitlement relationship, and highest tenant boundary. | Business DNA or OS operational data. |
| Business Registry | Business identity, Workspace relationship, lifecycle, and selected Business context. | Business Units as substitutes for Business or OS domain identity. |
| Organization Registry | Canonical Business Unit, Department, and Branch identities, parent relationships, and scope identifiers. | OS-specific configuration or operational behavior. |
| Settings and Localization | Platform preferences, language, locale, direction, timezone, and currency context. | User-entered business data translation or OS-specific tax behavior. |

The canonical hierarchy is:

```text
Workspace
  └── Business
      └── Business Unit
          ├── Department
          └── Branch
```

Core owns the registry for this hierarchy. The approved proposal leaves the precise write protocol for OS-initiated Business Unit, Department, and Branch creation open; this document does not resolve it.

#### 2.2 Business understanding and intelligence

| Component | Responsibility | Principal output |
|---|---|---|
| Business Architect | Conversational and structured discovery for one selected Business. | Candidate Core Business DNA facts. |
| Business DNA Registry | One Business DNA identity per Business, with versions, provenance, validation, and aggregation projections. | Published Business DNA snapshot. |
| Capability Registry | Canonical reusable business functions and metadata. | Versioned Capability definitions. |
| Knowledge Engine | Structured platform expertise, sources, applicability, immutable published versions, and lifecycle. | Applicable Knowledge references. |
| Rules Engine | Deterministic, versioned, explainable evaluation. | Rule outcomes and evidence. |
| Business Brain | Business analysis, Capability selection, growth, health, risk reasoning, and decision orchestration. | Decision records and recommendation candidates. |
| Recommendation Engine | Prioritization, explanation, lifecycle, feedback, and implementation-option mapping. | Explainable recommendations. |
| Configuration Engine | Conversion of accepted recommendations into traceable configuration proposals. | Versioned platform or OS configuration proposal. |
| Readiness Service | Evaluation of Core Workspace Ready and observation of OS readiness milestones. | Readiness state and unmet conditions. |

Dependency direction is from Business facts and shared Knowledge toward decisions and proposals:

```text
Business DNA ──────────────┐
Knowledge Engine ──────────┤
Capability Registry ───────┤
Rules Engine ──────────────┤
                           v
                     Business Brain
                           │
                           v
                Recommendation Engine
                           │
              ┌────────────┴────────────┐
              v                         v
    Configuration Engine          Product Hub
```

Business Brain consumes Knowledge but never stores or owns it. Recommendations are stored separately from Business DNA. Configuration proposals are stored separately from recommendations and applied only by their owning targets under approved policy.

#### 2.3 Product, commercial, and lifecycle control

| Component | Responsibility | Principal output |
|---|---|---|
| Product and Plan Catalog | Canonical OS metadata, canonical plan names/codes, Capability mappings, compatibility, and setup destinations. | Versioned product and plan definitions. |
| Workspace Entitlement | Mandatory platform access relationship present during onboarding and included with an active OS subscription during MVP. | Core access entitlement state. |
| OS Subscription | Workspace-level commercial relationship for one OS and canonical plan. | Subscription and plan state. |
| Billing Coordination | Payment and billing-state coordination under transparent commercial rules. | Billing outcome and commercial status. |
| Installation and Activation Coordinator | Platform-side long-running installation and activation coordination for OSs and Marketplace assets. | Operation and lifecycle status. |
| Product Hub | Business-context advice, lifecycle composition, plan selection, and setup handoff. | Customer decision and owner-directed commands. |

These components keep commercial and operational concerns separate. A paid or active subscription does not prove installation, setup, activation, or Operating System Ready.

#### 2.4 Shared governance and utility services

| Component | Responsibility |
|---|---|
| Notification Service | Platform notifications, delivery preferences, and authorized OS-produced notifications. |
| Audit Service | Append-only records for critical platform and OS actions, including actor and scope context. |
| Search Coordination | Shared search contracts and authorized projections without transferring source ownership. |
| Storage Coordination | Shared file/object policy, secure references, quotas, and access coordination. |
| Analytics Intake | Purpose-bound, permission-aware platform and OS usage signals for approved analysis. |
| API Architecture | Governed first-party, module, OS, Marketplace, public, administrative, event/webhook, and AI-tool contracts. |
| Navigation Coordination | Context-aware movement across public, Core, Marketplace, setup, and OS operational surfaces. |
| AI Coordinator | Governed request interpretation, expert orchestration, synthesis, confidence, evidence, action proposals, and audit. |

### 3. Business Architect Pipeline

The Business Architect Pipeline is the first-class architecture flow from Business context to published Core Business DNA and initial recommendations.

#### 3.1 Internal components

| Component | Architectural role |
|---|---|
| Session Orchestrator | Owns resumable pipeline session state for one Workspace, Business, and initiating actor. |
| Context Resolver | Loads authorized organizational, locale, existing DNA, Knowledge, Rule, and prior-answer context. |
| Evidence Collector | Accepts customer answers and permitted sources as evidence. |
| Inference Service | Proposes reasonable candidate facts with confidence and assumptions. |
| Question Planner | Chooses the minimum useful next question based on missing or uncertain Core DNA. |
| Conversation Adapter | Presents localized conversational interaction while preserving canonical structured identifiers. |
| Answer Normalizer | Retains raw input and produces typed candidate facts. |
| Provenance Registry | Records actor, source, evidence, time, confidence, and transformations. |
| DNA Assembler and Validator | Produces a candidate Core DNA projection and applies schema, ontology, Rule, and cross-field validation. |
| Review Checkpoint | Exposes facts, inferences, conflicts, and material assumptions for customer correction or confirmation. |
| DNA Publisher | Publishes a new version for the existing Business DNA identity. |
| Analysis Trigger | Invokes Business Brain, recommendations, and readiness against pinned inputs. |
| Pipeline State Store | Preserves stage, checkpoint, retry, expiry, and idempotency state outside published DNA. |

#### 3.2 Canonical flow

```text
Start or Resume
  → Resolve Authorized Workspace and Business
  → Load Existing DNA and Applicable Intelligence Context
  → Identify Missing or Uncertain Core DNA
  → Infer Candidate Facts
  → Ask the Minimum Necessary Question
  → Capture, Normalize, and Attach Provenance
  → Validate
  → Repeat as Required
  → Customer Review
  → Publish DNA Snapshot
  → Generate Recommendations
  → Evaluate Core Workspace Ready
```

#### 3.3 States and invariants

The approved pipeline states are:

`not_started → in_progress → review_required → publish_ready → published → analyzed → completed`

Exceptional states are `paused`, `blocked`, `expired`, and `superseded`.

The pipeline:

- belongs to one Workspace and one selected Business;
- never combines the DNA of multiple Businesses;
- distinguishes raw, normalized, inferred, reviewed, and published information;
- treats validation and readiness as deterministic and versioned;
- keeps OS, plan, module, and setup configuration outside Business DNA;
- retries analysis without republishing or silently changing DNA;
- requires traceability for every published material fact.

The minimum Core Business DNA schema, confirmation threshold, session duration, and concurrent-edit policy remain open proposal questions.

### 4. Product Hub Architecture

Product Hub is a composed Core experience and lifecycle orchestrator. It is not a canonical owner of every record it displays.

#### 4.1 Internal components

| Component | Architectural role |
|---|---|
| Hub Context Resolver | Resolves actor, Workspace, selected Business, explicit aggregation mode, locale, permission, and lifecycle context. |
| Recommendation Feed | Presents explainable business improvement and Capability recommendations. |
| Implementation Option Mapper | Resolves mapped OS, plan, and Marketplace options from governed recommendation results. |
| Product Catalog Projection | Presents product metadata sourced from the canonical catalog. |
| Eligibility and Dependency Evaluator | Evaluates country, compatibility, plan, subscription, entitlement, permission, and declared dependency conditions. |
| Product Lifecycle Projection | Composes availability, recommendation, subscription, installation, setup, activation, readiness, pause, and update state. |
| Plan Comparison and Selection | Presents canonical `Starter / starter`, `Pro / pro`, `Business / business`, and `Enterprise / enterprise` choices where supplied by an OS. |
| Subscription Coordinator | Sends explicit subscription commands to the owning commercial component. |
| Installation Coordinator | Starts and observes long-running installation operations and recovery. |
| Setup Handoff Router | Produces a signed, short-lived handoff to the OS-owned setup destination. |
| Business Health and Growth View | Presents permitted projections from intelligence components. |
| Marketplace Discovery Adapter | Queries Marketplace catalog and scoped state through Marketplace contracts. |

#### 4.2 Flow

```text
Resolve Selected Business Context
  → Load Recommendations and Lifecycle Projections
  → Map and Filter Eligible Options
  → Explain Business Value, Confidence, and Alternatives
  → Customer Selects OS and Plan
  → Create or Change Workspace-Level Subscription
  → Coordinate Installation
  → Create OS Setup Handoff
  → Observe OS Setup and Readiness Projection
  → Launch OS When Operating System Ready
```

Product Hub owns journey composition, customer explanation, selection capture, and setup routing. The canonical owners retain product, subscription, installation, Marketplace, and OS setup records.

### 5. Marketplace Boundary

Marketplace is both a Core Platform responsibility and a distinct bounded context in the Nexoraxs ecosystem.

#### 5.1 Marketplace owns

- asset catalog and metadata;
- publisher and developer records;
- immutable asset versions;
- asset review, approval, publication, deprecation, and archive lifecycle;
- Workspace purchase, installation, activation, update, and removal state;
- Workspace or Business applicability;
- asset dependencies, compatibility, pricing, license, release notes, and reviews.

#### 5.2 Shared Core services own

- identity and authentication;
- Workspace, Business, and organization references;
- authorization primitives and tenant context;
- billing rails and shared commercial controls;
- notifications and audit;
- shared API governance.

#### 5.3 Boundary rules

- Product Hub reads Marketplace projections and issues commands through Marketplace contracts.
- Business Brain may map Marketplace assets as implementation options but cannot create Marketplace state.
- An installed asset remains a reference to an immutable shared version; installation does not copy ownership to a Workspace or OS.
- Business applicability is scoped state and does not alter the shared asset.
- Co-deployment inside the modular monolith does not permit cross-table ownership.
- Future extraction changes deployment only, not the bounded context.

### 6. AI Coordinator Architecture

AI Coordinator turns one authorized customer request into one governed, explainable response. It coordinates expertise; it does not own expertise, Knowledge, platform policy, Business DNA, permissions, or OS truth.

#### 6.1 Internal components

| Component | Architectural role |
|---|---|
| Request Interpreter | Identifies intent, language, outcome, domain, and risk. |
| Authorization Context Resolver | Establishes permitted Workspace, Business, Business Unit, Branch, OS, and resource scope before retrieval. |
| Context Builder | Retrieves only the authorized Business DNA, Knowledge, recommendation, analytics, OS, and conversation context required. |
| Policy and Safety Engine | Applies privacy, country, permission, action, and data-use policy before and after execution. |
| Expert Registry | Maintains versioned expert definitions, domains, input requirements, compatibility, and lifecycle. |
| Expert Router | Selects an appropriate expert or expert set. |
| Instruction Assembler | Builds governed instructions using approved Knowledge, Rules, evidence, response policy, and request context. |
| Expert Execution Adapter | Invokes replaceable approved providers with bounded data, tools, time, and cost. |
| Collaboration Orchestrator | Coordinates multiple experts and identifies disagreement or missing evidence. |
| Evidence and Claim Validator | Checks material claims and flags uncertainty or unsupported output. |
| Response Synthesizer | Produces one coherent customer response. |
| Confidence and Explainability Evaluator | Reports confidence, evidence, assumptions, alternatives, and verification guidance. |
| Action Proposal Broker | Converts actions into structured proposals for authorization and execution by owning services. |
| Conversation Context Manager | Maintains scoped conversation continuity under retention and consent policy. |
| AI Audit and Observability | Records versions, context references, policy, routing, tools, proposals, performance, and feedback. |

#### 6.2 Flow and authority

```text
Request
  → Interpret Intent and Risk
  → Resolve Authorization
  → Build Minimum Context
  → Apply Policy
  → Route and Execute Experts
  → Coordinate and Validate Evidence
  → Apply Policy Again
  → Synthesize Explainable Response
  → Submit Action Proposal if Requested
  → Audit
```

Consequential execution remains outside AI Coordinator. An owning service reauthorizes the actor, validates deterministic rules and domain invariants, records approval, executes, and audits the action.

### 7. API Architecture

The API Architecture is the governed contract system for every Core boundary. The API Gateway is one boundary-enforcement component and cannot replace domain authorization or business invariants.

#### 7.1 Surfaces

| Surface | Consumers | Purpose |
|---|---|---|
| Core Module Contracts | Core logical modules | Typed commands, queries, and domain events without arbitrary cross-module table access. |
| First-Party Experience API | Approved Core experiences and backend-for-frontend layers | Task-oriented compositions for onboarding, Business Architect, Product Hub, and governance. |
| OS Integration API | Nexoraxs Operating Systems | Context, organization, entitlement, subscription, setup handoff, readiness, audit, notification, and approved intelligence contracts. |
| Marketplace API | Product Hub, publishers, partners, and asset consumers | Marketplace-owned catalog and lifecycle operations. |
| Public Platform API | Authorized customers and partners | Stable, documented, rate-limited platform resources and actions. |
| Administrative API | Authorized Nexoraxs operators | Segregated controls with stronger authentication, approval, and audit. |
| Event and Webhook API | Internal consumers, OSs, customers, and partners | Asynchronous fact notification and external delivery. |
| AI Tool API | AI Coordinator and approved experts | Narrow, permission-checked reads and action proposals. |

#### 7.2 Required context

Every protected request or message carries or resolves:

- actor or service identity;
- correlation and trace identifiers;
- Workspace identifier;
- selected Business identifier when applicable;
- Business Unit, Department, Branch, OS, and resource scope when applicable;
- permission and entitlement context;
- contract version;
- locale and timezone when semantically required;
- idempotency key for retryable mutations;
- causation identifier for derived commands and events.

Client-provided scope is an input to authorization, never proof of authorization.

#### 7.3 Interaction styles

- Synchronous commands and queries return immediate validated results.
- Domain events announce committed facts owned within a domain.
- Integration events expose stable, minimized facts across boundaries.
- Webhooks provide signed, retryable, observable external notification.
- Long-running operations expose status resources instead of holding connections open.
- Composed read projections may combine owners without gaining write authority.

#### 7.4 Governance

- Contracts are technology-independent and versioned separately from persistence.
- Compatible additive evolution is preferred.
- Breaking change requires a new version and deprecation policy.
- Mutations define authorization, validation, idempotency, audit, and failure behavior.
- Errors use a stable machine-readable shape with correlation identifiers.
- Collections have bounded pagination, filtering, sorting, and query cost.
- Events identify owner, version, causation, tenant scope, ordering boundary, retention, and replay policy.
- Consumers tolerate duplicate asynchronous delivery; global ordering is not promised.
- Boundary controls include authentication, coarse policy, rate limits, quotas, routing, and telemetry.
- Owning domains still enforce resource authorization and invariants.

Detailed guarantees, first-milestone surfaces, schemas, and deprecation windows remain open for later approved documentation.

### 8. Navigation Architecture

Navigation governs user movement while preserving selected context, permission, readiness, and route ownership.

#### 8.1 Surface ownership

| Surface | Owner | Purpose |
|---|---|---|
| Public | Landing/marketing | Discovery and authentication entry. |
| Authentication | Core | Sign up, login, recovery, invitation, and session establishment. |
| Core onboarding | Core | Workspace, Business, Business Architect, review, recommendations, and readiness. |
| Core shell | Core | Context selection, Product Hub, team/access, billing, settings, notifications, audit, and Marketplace entry. |
| Product Hub | Core | Advice, selection, lifecycle, setup handoff, launch, upgrade, and expansion. |
| Marketplace | Marketplace through an approved Core entry | Asset discovery and Marketplace lifecycle actions. |
| OS setup | Selected OS | Business Unit selection or creation, domain setup, configuration review, activation, and readiness. |
| OS operational shell | Selected OS | Daily modules, workflows, operational context, dashboards, reports, and OS settings. |

#### 8.2 Route guards

Navigation resolves, in order:

1. identity and session;
2. Workspace membership and lifecycle;
3. selected Business access and lifecycle;
4. Core Workspace Ready where Product Hub is required;
5. permission and entitlement;
6. subscription, installation, setup, activation, and readiness for OS destinations;
7. Business Unit and Branch access for operational routes;
8. locale, direction, and safe return location.

A failed guard presents an explainable recovery path such as selecting context, requesting access, resuming setup, recovering subscription, or returning to Product Hub.

#### 8.3 Cross-application handoff

Core-to-OS navigation uses a signed, short-lived, opaque handoff reference. The OS re-resolves identity, context, permission, subscription, and lifecycle state. URLs do not carry sensitive permanent authorization.

OS-to-Core return navigation follows the same rule. Each product owns its routes and menus. A shared navigation contract creates coherence without one hardcoded global menu.

Canonical subdomain, URL, deep-link, selector, and return-route conventions remain an approved proposal open question.

### 9. Readiness and lifecycle coordination

#### 9.1 Core Workspace Ready

Core Workspace Ready requires:

- an authenticated customer context;
- a Workspace;
- a selected Business identity;
- sufficient reviewed and published Core Business DNA for that Business;
- initial recommendations generated from pinned governed inputs.

It permits Product Hub entry. It does not imply any OS is ready.

#### 9.2 Operating System Ready

Operating System Ready additionally requires:

- an eligible Workspace-level OS subscription and plan;
- installation;
- selected Business context;
- an operational Business Unit;
- completed OS-specific setup;
- generated and accepted/applied domain configuration;
- activation and assigned access.

It permits entry to the OS Operational Dashboard.

#### 9.3 Lifecycle ownership

Core owns subscription and platform-side installation/activation coordination. The selected OS owns setup, domain configuration application, and operational state. Core receives or queries a stable readiness projection. Failure recovery must remain explicit and idempotent; its detailed transaction protocol remains open.

### 10. Deployment posture

Core begins as an enforced modular monolith:

- logical modules expose contracts rather than tables;
- dependencies point toward canonical owners;
- module data access is isolated;
- cross-module behavior is observable and testable;
- contract versions are independent from framework code;
- extraction occurs only for measured scaling, security, release, or ownership needs.

Marketplace or another module may later be separately deployed without changing its bounded context. No physical split may create direct OS dependencies on Core implementation details.

## Ownership

### Canonical ownership matrix

| Domain | Canonical owner | Allowed relationships |
|---|---|---|
| Identity, Workspace, membership | Core | Referenced by every authorized product. |
| Business and organization registry | Core | OS setup may request or coordinate organization changes through Core contracts. |
| Business DNA | Core, scoped to one Business | Consumed by intelligence and applicable OS configuration. |
| Capabilities, Knowledge, Rules | Core platform assets | Referenced by intelligence, OSs, Marketplace, and AI. |
| Business Brain and recommendations | Core intelligence | Presented by Business Architect, Product Hub, AI, and authorized OS surfaces. |
| Product and plan definitions | Core catalog | Presented through Product Hub and used by subscriptions. |
| Workspace entitlement and OS subscription | Core commercial control | Consumed by Product Hub and OS authorization. |
| Product Hub composition | Core | Reads projections and directs commands to canonical owners. |
| Marketplace domain | Marketplace bounded context | Consumes shared Core services and exposes Marketplace contracts. |
| OS setup and operational data | Selected OS | Exposes stable lifecycle and integration contracts to Core. |
| Audit and notification records | Core shared services | Accept authorized domain context and producer input. |
| AI response and evidence | Core AI coordination | Scoped to the authorized request context. |

### Prohibited ownership transfers

- Product Hub does not own subscriptions, Marketplace state, or OS readiness source data.
- AI does not own Business facts, Knowledge, Rules, permissions, or action execution.
- An OS does not own Workspace, Business DNA, Capabilities, Knowledge, subscriptions, or Marketplace.
- Core organization identity does not include OS operational behavior.
- Read projections do not gain write authority.

## Relationships

### Dependency relationships

- Experience modules depend on canonical domain contracts.
- Intelligence depends on Business DNA, Knowledge, Capabilities, Rules, and permitted context.
- Recommendation mapping depends on intelligence output and product/Marketplace catalogs.
- Product Hub depends on projections from recommendation, catalog, commercial, installation, Marketplace, and OS readiness owners.
- AI Coordinator depends on authorized context and approved expert providers.
- Operating Systems depend on shared Core contracts, never another OS database.

### Cross-boundary relationship pattern

```text
Caller
  → Gateway or Module Contract
  → Authentication and Context Resolution
  → Owning Domain Authorization
  → Domain Invariants
  → State Change or Query
  → Audit and Observable Result
  → Stable Projection or Integration Event
```

### Failure relationships

Partial failure is visible. Product Hub, navigation, and long-running operations must expose pending, failed, retryable, blocked, and recovery states without inventing success. Cross-domain retries use idempotency, and no component silently rewrites another owner's state to repair divergence.

## Future Extension Points

The architecture allows later addition of:

- comprehensive API schemas, events, webhooks, SDKs, and public developer contracts;
- deeper Business Architect inference, import, concurrency, and review policies;
- broader Knowledge, Rules, Capabilities, and recommendation coverage;
- Marketplace partner publishing, certification, settlement, and sandboxing;
- additional AI Experts, providers, collaboration strategies, and premium AI services;
- additional independent Operating Systems and optional integrations;
- enterprise identity, governance, multi-country, data residency, and analytics;
- dedicated search, storage, event, or integration infrastructure;
- physical service extraction where justified.

These extension points must preserve the approved ADRs, ownership, ontology, capability-first recommendations, tenant isolation, and OS independence.

## References to Genesis

- [Constitution](../01-genesis/02-CONSTITUTION.md)
- [Business DNA](../01-genesis/03-BUSINESS-DNA.md)
- [Capabilities Model](../01-genesis/04-CAPABILITIES.md)
- [Knowledge Engine](../01-genesis/05-KNOWLEDGE-ENGINE.md)
- [Business Brain](../01-genesis/06-BUSINESS-BRAIN.md)
- [Recommendation Engine](../01-genesis/07-RECOMMENDATION-ENGINE.md)
- [AI Strategy](../01-genesis/08-AI-STRATEGY.md)
- [Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md)
- [Nexoraxs Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md)
- [Customer Journey](../01-genesis/11-CUSTOMER-JOURNEY.md)
- [Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md)
- [Product Hub](../01-genesis/13-PRODUCT-HUB.md)
- [Subscription Model](../01-genesis/14-SUBSCRIPTION-MODEL.md)
- [Operating System Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)
- [Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md)
- [AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

## References to the Approved Proposal

- [Core Platform Architecture Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- Component model and flows: proposal sections 5.1 through 5.4 and Navigation Architecture.
- Boundaries and ownership: proposal sections 6 and 7.
- Governing decisions: ADR-CP-001 through ADR-CP-020.
