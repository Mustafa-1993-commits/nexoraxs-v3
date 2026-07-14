# Core Platform Domain Model

Version: 1.0  
Status: Milestone 1 — Wave 1  
Authority: Genesis v1.1 and the approved Core Platform Architecture Proposal v0.2  
Owner: Nexoraxs

---

## Purpose

This document defines the conceptual domain model of the Nexoraxs Core Platform.

It identifies canonical concepts, bounded ownership, relationships, invariants, and lifecycle distinctions required by Genesis and the approved proposal. It provides the semantic model that later logical data, API, event, authorization, and implementation documentation must preserve.

This document is not a physical schema. It deliberately does not select table names, columns, indexes, storage engines, endpoint payloads, event names, or unresolved aggregate boundaries.

## Scope

The domain model covers:

- identity and Workspace membership concepts;
- Workspace, Business, Business Unit, Department, and Branch;
- Business DNA and Business Architect pipeline state;
- Capabilities, Knowledge, and Rules;
- Business Brain decisions, recommendations, implementation options, and configuration proposals;
- Core Workspace Ready and Operating System Ready concepts;
- product, plan, Workspace entitlement, OS subscription, installation, setup, configuration, and activation distinctions;
- Product Hub projections and handoffs;
- Marketplace assets and scoped commercial/activation state;
- shared authorization scope, notifications, audit, settings, localization, analytics context, API identity, and AI coordination concepts;
- relationships with independent Operating Systems.

The model excludes every OS operational domain model and leaves approved open questions unresolved.

## Principles

### Canonical language

Every concept uses the Genesis ontology. Workspace, Business, Business Unit, Department, Branch, Business DNA, Capability, Operating System, Module, Knowledge, Recommendation, Marketplace, and Knowledge Pack are distinct concepts and are not synonyms.

### One canonical owner

Every concept and state has one canonical owner. Other components may reference it, project it, or request changes through contracts, but cannot create competing truth.

### Business facts are separate from software state

Business DNA describes how one Business operates. Product selection, subscription, OS installation, modules, plan, and configuration are separate records.

### Shared assets are referenced, not copied

Capabilities, Knowledge, Rules, and published Marketplace versions are platform-wide assets. Workspace or Business applicability uses scoped references.

### Context is explicit

Tenant-owned data carries or resolves Workspace scope. Business, Business Unit, Department, Branch, OS, and resource scope are included whenever the concept requires them.

### Lifecycles remain distinct

Business Architect sessions, Business DNA publication, recommendations, subscription, installation, OS setup, configuration, activation, readiness, and Marketplace state each follow their own lifecycle.

### Projections do not own source data

Product Hub, Workspace intelligence aggregation, search, analytics, dashboards, and navigation may compose multiple sources. Composition never transfers write ownership.

## Responsibilities

The Core Platform domain model is responsible for:

- expressing the customer and organizational hierarchy;
- anchoring every Business DNA identity to one Business;
- distinguishing shared platform assets from tenant-scoped context;
- preserving provenance and versions for governed intelligence;
- connecting recommendations to business reasons, Capabilities, and implementation options;
- separating commercial, installation, setup, activation, and readiness state;
- giving independent OSs stable organization and entitlement references;
- preserving Marketplace ownership inside its bounded context;
- supporting tenant-safe authorization and audit relationships;
- providing conceptual continuity across later schemas and contracts.

## Architecture

### 1. Domain map

```text
Identity and Access
  └── User
      └── Workspace Membership
          └── Workspace
              ├── Workspace Entitlement
              ├── Businesses
              │   └── Business
              │       ├── Business DNA
              │       └── Business Units
              │           └── Business Unit
              │               ├── Departments
              │               └── Branches
              ├── OS Subscriptions
              └── Marketplace Scoped State

Platform Intelligence
  ├── Capabilities
  ├── Knowledge
  ├── Rules
  ├── Business Brain Decisions
  ├── Recommendations
  └── Configuration Proposals

Product Control
  ├── OS Products
  ├── Plans
  ├── Installation and Activation State
  ├── Readiness Projections
  └── Product Hub Projections and Handoffs

Ecosystem
  ├── Marketplace Assets and Versions
  ├── AI Expert Definitions
  └── Independent Operating Systems
```

### 2. Identity and access domain

#### User

A User is the Core login identity. It is platform-owned and independent from an HR employee profile or an OS operational staff record.

A User may participate in one or more Workspaces through Workspace Memberships. Authentication proves User identity; it does not by itself prove access to any Workspace, Business, Business Unit, Branch, OS, or resource.

#### Workspace Membership

A Workspace Membership relates one User to one Workspace and provides the basis for Workspace role and scoped access assignment.

Conceptual responsibilities include:

- membership lifecycle;
- invitation and acceptance relationship;
- Workspace role assignment;
- OS, Business, Business Unit, Department, Branch, and resource access relationships where required;
- active, suspended, or removed access state as later defined.

The exact role and permission schema belongs to later documentation. The invariant is that every protected operation evaluates the relevant scope rather than trusting membership alone.

#### Authorization Context

Authorization Context is a resolved decision input, not permanent business ownership. It identifies:

- actor or service;
- Workspace;
- Business where applicable;
- Business Unit, Department, and Branch where applicable;
- OS and resource where applicable;
- permissions;
- entitlement and lifecycle constraints.

Client-supplied identifiers are requests for context and must be verified.

### 3. Organization domain

#### Workspace

A Workspace is the highest organizational and tenant boundary. It represents one customer account, not a company and not an industry-specific workspace.

A Workspace owns:

- Businesses;
- Workspace Memberships;
- subscriptions;
- settings and platform preferences;
- Marketplace purchases, installations, and activations;
- Knowledge and AI applicability context;
- audit, notification, billing, storage, and API-key context.

A Workspace does not own platform Knowledge, Capabilities, Rules, Business Brain, or the separate Business DNA identities of its Businesses.

#### Business

A Business is a legal or operational organization that performs commercial or service activities.

Invariants:

- every Business belongs to exactly one Workspace;
- a Workspace may own multiple Businesses;
- every Business owns exactly one Business DNA identity;
- every Business Unit belongs to exactly one Business;
- Business is not a synonym for Business Unit;
- Business identity is established before OS-specific operational setup.

#### Business Unit

A Business Unit is a logical operating division inside a Business. Operating Systems operate on Business Units, and Business Units own operational data through the applicable OS domains.

Invariants:

- every Business Unit belongs to exactly one Business;
- a Business may own multiple Business Units;
- Business Unit never owns Business DNA;
- Business Unit identity is canonical in Core, while OS-specific operational configuration is owned by the applicable OS;
- the OS-specific setup selects or creates the operational Business Unit through the future approved Core write protocol.

The proposal leaves that write protocol open, so this model does not decide whether Core alone writes after an OS command or an OS performs a transactional Core API operation.

#### Department

A Department is an internal organizational subdivision inside a Business Unit. It organizes people or responsibilities. It is not a Business Unit and does not replace the organization hierarchy.

Every Department belongs to exactly one Business Unit.

#### Branch

A Branch is a physical or virtual operating location. Every Branch belongs to exactly one Business Unit.

Branch is a canonical organizational scope. Operational Branch data remains in the applicable OS domain.

### 4. Business DNA domain

#### Business DNA Identity

Business DNA is the digital identity of one Business. It describes how that Business operates rather than what software it uses.

The Business DNA identity is stable across versions. A new published version is history of the same identity, not a second Business DNA.

Genesis Business DNA layers include:

1. Identity
2. Industry
3. Sub Industry
4. Business Stage
5. Business Model
6. Sales Channels
7. Organization
8. Customers
9. Products and Services
10. Capabilities
11. Compliance
12. Goals
13. Risks
14. Growth Plan

Core Business DNA is the minimum subset required to generate initial recommendations. It remains part of the Business's Business DNA.

#### Business DNA Snapshot

A Business DNA Snapshot is a versioned view of the Business DNA at publication time. Conceptually it retains:

- the Business DNA identity and owning Business;
- version;
- validated facts;
- provenance references;
- publication actor and time;
- applicable schema and validation versions;
- status sufficient to distinguish draft pipeline state from published DNA.

The exact snapshot mutation and correction policy remains an open proposal question.

#### Business DNA Fact and Provenance

A Business DNA Fact is a structured statement about the Business. Provenance explains how the fact was obtained.

Provenance distinguishes:

- customer-provided raw input;
- normalized customer facts;
- deterministic inference;
- AI-proposed inference;
- imported or previously known evidence;
- customer correction or confirmation.

Confidence, assumptions, source reference, actor, time, and transformation history are attached as required. A fact does not become official platform Knowledge merely because it appears in Business DNA.

#### Workspace Intelligence Aggregation

Workspace Intelligence Aggregation is an explicit projection over selected Business DNA identities. It may support Workspace-level recommendations or analytics, but it never creates Workspace DNA and never merges or rewrites Business DNA.

### 5. Business Architect domain

#### Business Architect Session

A Business Architect Session represents one resumable pipeline execution for one Workspace, one selected Business, and one initiating actor.

It holds pipeline state, outstanding information, review requirements, errors, retries, and idempotency independently from published DNA.

Canonical states:

`not_started → in_progress → review_required → publish_ready → published → analyzed → completed`

Exceptional states:

`paused`, `blocked`, `expired`, `superseded`

The Session relates to evidence, candidate facts, questions, answers, validation outcomes, a review checkpoint, the published snapshot, analysis execution, and readiness evaluation.

#### Candidate Fact

A Candidate Fact is not yet published Business DNA. It may be customer-provided, normalized, or inferred. Conflicts and low-confidence required facts remain candidates until reviewed under future approved policy.

#### Review Checkpoint

A Review Checkpoint records the presentation and disposition of material facts, inferences, assumptions, and conflicts before publication. It preserves human control without turning every low-risk fact into an unnecessary form step.

The materiality threshold remains open.

### 6. Capability, Knowledge, and Rules domain

#### Capability

A Capability describes what a Business needs, not how software implements it.

Capability metadata includes the Genesis-defined concepts of identity, name, category, description, dependencies, optional dependencies, supported industries, OSs, countries, permissions, plans, AI support, and lifecycle status.

Capabilities are:

- platform-owned;
- reusable and composable;
- independent from industries;
- consumed, not owned, by Operating Systems;
- distinct from OS Modules.

#### Knowledge Object

A Knowledge Object is structured platform expertise. Genesis defines metadata including identity, name, category, description, tags, country, industry, Capability scope, related objects, source, version, status, owner, and update time.

Lifecycle:

`draft → review → approved → published → deprecated → archived`

Published versions are immutable. Workspace or Business activation and applicability reference Knowledge; they do not duplicate it.

#### Rule

A Rule is a versioned, deterministic, explainable platform asset applied by the Rules Engine. Rules may express business, compliance, validation, recommendation, or configuration logic according to later detailed classification.

A Rule outcome retains the Rule version and evidence necessary for reproducibility. AI cannot modify or bypass an official Rule.

### 7. Intelligence domain

#### Business Brain Decision

A Business Brain Decision records governed reasoning produced from:

- one Business's published Business DNA, or an explicit Workspace aggregation;
- applicable Knowledge and Rules;
- goals, country, stage, permitted analytics, and subscription context;
- the exact versions required for traceability.

The Business Brain does not own the inputs and does not own OS software.

#### Recommendation

A Recommendation is an explainable business suggestion.

It identifies:

- the selected Business by default, or explicit Workspace aggregation context;
- business improvement;
- Capability need;
- category and priority;
- impact, complexity, confidence, estimated value, and urgency where applicable;
- evidence, Knowledge and Rule references, and assumptions;
- risks and alternatives;
- implementation options;
- customer disposition.

Lifecycle:

`generated → reviewed → accepted | rejected → learned`

Learning from disposition may improve future recommendations through approved processes. It never modifies Business DNA or official Knowledge directly.

#### Implementation Option

An Implementation Option maps an accepted or presented business improvement and Capability to an OS, canonical plan, or Marketplace asset. It is not the recommendation itself.

The mapping explains why the implementation option is appropriate and retains eligibility and dependency context. A product-only recommendation is invalid.

#### Configuration Proposal

A Configuration Proposal is a versioned, traceable proposal derived from an accepted recommendation. It identifies source recommendation, Knowledge and Rule versions, target scope, compatibility, review policy, and status.

For an OS target, the OS validates and applies its own domain configuration idempotently. Core does not mutate OS data silently.

The exact distinction between automatic and customer-approved application remains open.

#### Readiness Assessment

A Readiness Assessment evaluates a named readiness state against explicit criteria and reports unmet requirements.

- Core Workspace Ready is Core-owned.
- Operating System Ready is based on the OS-owned setup and operational state plus Core-owned commercial and installation conditions.

A readiness assessment is not a replacement for the underlying lifecycle records.

### 8. Product and commercial domain

#### OS Product

An OS Product is the canonical Product Hub and subscription representation of an independent Operating System. It relates to supported Capabilities, plans, availability, compatibility, and OS-owned setup destinations.

The product record does not own OS modules or domain behavior.

#### Plan

A Plan is a canonical commercial level for one OS. Genesis plan names and codes are:

- Starter / `starter`
- Pro / `pro`
- Business / `business`
- Enterprise / `enterprise`

Plans may differ by users, storage, Capabilities, automation, AI features, support, and limits. Exact limits are not defined in Wave 1.

#### Workspace Entitlement

Workspace Entitlement is the mandatory platform-access relationship for a Workspace. It exists during onboarding before the first OS is selected and is not independently billed during MVP. Any active OS subscription includes Core Platform entitlement during MVP.

Workspace Entitlement is distinct from an OS Subscription.

#### OS Subscription

An OS Subscription is the Workspace-level commercial relationship for one OS and selected Plan.

It does not prove that the OS is installed, configured, activated, ready, or accessible to a particular User.

Genesis permits independent OS trial, install, pause, upgrade, downgrade, and removal behavior. The exact canonical subscription state model is deferred to later documentation.

#### Installation, Setup, Configuration, Activation, and Operation

These are distinct lifecycle concepts:

- **Installation:** the OS is installed for the Workspace.
- **Setup:** the OS-owned experience selects or creates an operational Business Unit and gathers domain requirements.
- **Configuration:** reviewed configuration is generated and applied by the owning OS.
- **Activation:** OS access, permissions, menus, and availability become effective.
- **Operating System Ready:** all required commercial, installation, organization, setup, configuration, activation, and access criteria are satisfied.
- **Operational:** daily domain activity has begun.

The approved proposal explicitly leaves the final canonical record that replaces or evolves earlier `OSEnablement` semantics open. This model therefore preserves the concepts without inventing a combined aggregate.

#### Product Hub Projection

Product Hub Projection is a Business-context read model that may combine:

- recommendation;
- product and plan;
- eligibility and dependency;
- subscription;
- installation;
- setup and activation projection;
- readiness;
- Marketplace state;
- Business health and growth projections.

It is disposable and reconstructable from canonical owners. Product Hub sends commands to owners rather than writing their records.

#### Setup Handoff

Setup Handoff is a signed, short-lived, opaque cross-application reference that allows an OS to re-resolve authorized Workspace, Business, product, plan, installation operation, and return context.

It is not permanent authorization and does not transfer ownership.

### 9. Marketplace domain

#### Marketplace Asset

A Marketplace Asset is a platform-wide asset such as an OS, extension, Knowledge Pack, AI Expert, automation pack, dashboard pack, workflow pack, template, or theme.

Genesis asset metadata includes identity, name, description, category, version, developer, owner, supported countries, OSs, plans, dependencies, pricing, license, documentation, release notes, AI support, and status.

#### Marketplace Asset Version

A published Marketplace Asset Version is shared and immutable. A change creates a new version.

Shared asset lifecycle:

`draft → review → approved → published → new version published → deprecated → archived`

#### Marketplace Purchase, Installation, Activation, and Applicability

These are Workspace-scoped state concepts:

```text
Purchased by Workspace
  → Installed in Workspace
  → Activated in Workspace
  → Applicable to Workspace or selected Business
```

Updating selects a different immutable version. Removing deletes scoped state only, never the shared asset or historical version.

Marketplace owns these records. Product Hub and Business Brain consume them through Marketplace contracts.

#### Knowledge Pack

A Knowledge Pack is a versioned Marketplace and Knowledge asset that extends the Knowledge Engine without changing platform code. Its content is shared and immutable; its purchase, installation, activation, and applicability remain scoped.

### 10. Shared service domain concepts

#### Notification

A Notification is a Workspace-scoped platform record with producer context, recipient or audience, category, content reference, delivery preference, and delivery state as later defined. OSs may produce authorized notification requests without owning the shared delivery record.

#### Audit Record

An Audit Record is an append-only record of a critical action. It identifies actor or service, Workspace and applicable scopes, source domain, action, subject, time, correlation, and relevant result or change reference.

Corrective action creates another record; it does not rewrite history.

#### Settings and Localization Context

Settings and Localization Context resolves platform preferences such as language, locale, direction, timezone, and currency context. User-entered Business data remains as entered and is not automatically translated.

#### API Client or Service Identity

An API Client or Service Identity is an authenticated non-human actor governed by Workspace, product, permission, entitlement, rate, and audit policies. It cannot bypass domain authorization.

### 11. AI coordination domain

#### AI Expert Definition

An AI Expert Definition is a versioned platform or Marketplace asset that describes a specialized expert's domain, inputs, compatibility, lifecycle, and provenance. Experts consume Knowledge and never own it.

#### AI Interaction

An AI Interaction is a scoped, auditable coordination record for one request and unified response. It references authorization context, approved input context, expert/model versions, policy decisions, evidence, confidence, assumptions, proposed actions, and response metadata under later retention policy.

#### AI Action Proposal

An AI Action Proposal is a structured request for a consequential action. It is not execution. The owning service reauthorizes, validates deterministic policy and domain invariants, obtains required approval, executes, and audits.

AI never becomes the canonical owner of Knowledge, Rules, Business DNA, permissions, recommendations, or operational facts.

## Ownership

### Ownership matrix

| Concept | Canonical owner | Scope |
|---|---|---|
| User and Workspace Membership | Core Identity and Access | User/Workspace |
| Workspace | Core Workspace Management | Workspace |
| Business | Core Business Registry | Workspace/Business |
| Business Unit, Department, Branch identity | Core Organization Registry | Business and Business Unit |
| Business Architect Session | Core Business Architect | Business |
| Business DNA identity and snapshot | Core Business DNA Registry | Exactly one Business |
| Workspace intelligence aggregation | Core projection | Explicit Workspace Business set |
| Capability | Core Capability Registry | Platform |
| Knowledge Object and Rule | Core Knowledge/Rules | Platform/versioned applicability |
| Business Brain Decision and Recommendation | Core Intelligence | Business by default |
| Configuration Proposal | Core Configuration Engine | Target scope |
| Product and Plan | Core Product and Plan Catalog | Platform/OS |
| Workspace Entitlement and OS Subscription | Core commercial control | Workspace |
| Installation coordination | Core control plane | Workspace/OS/context |
| OS setup and operational configuration | Selected OS | Business Unit/OS |
| Product Hub Projection | Core Product Hub | Selected Business or explicit aggregation view |
| Marketplace asset and scoped lifecycle | Marketplace bounded context | Platform asset and Workspace/Business state |
| Notification and Audit Record | Core shared services | Workspace with producer context |
| AI Expert Definition | Core or Marketplace according to publication | Platform/versioned |
| AI Interaction and Action Proposal | Core AI Coordinator | Authorized request context |

### Ownership invariants

1. A concept has one canonical owner.
2. Every tenant-owned record belongs to or resolves one Workspace.
3. Business DNA belongs to Business only.
4. Operating Systems own operational data and workflows.
5. Product Hub and Workspace aggregation are projections, not write owners.
6. Shared published assets remain immutable and tenant-independent.
7. AI output cannot become canonical truth without the owning domain's governed process.

## Relationships

### Cardinality and containment

```text
Workspace 1 ── owns ── 0..* Business
Business  1 ── owns ── 1 Business DNA identity
Business  1 ── owns ── 0..* Business Unit
Business Unit 1 ── owns ── 0..* Department
Business Unit 1 ── owns ── 0..* Branch
Workspace 1 ── has ── 1 Workspace Entitlement
Workspace 1 ── has ── 0..* OS Subscription
OS Product 1 ── offers ── 1..* Plan when plans are available
Marketplace Asset 1 ── has ── 1..* preserved Version over its lifecycle
```

The `0..*` organizational cardinalities describe conceptual possibility, not an operational readiness rule. A selected Business is required for Core Workspace Ready, and an OS may require a Business Unit or Branch for its readiness according to its own setup contract.

### Reference relationships

- Business DNA facts may reference platform Capability identifiers without giving Business ownership of Capability definitions.
- Recommendations reference Business DNA, Knowledge, Rule, and Capability versions.
- Implementation Options reference Product, Plan, or Marketplace asset versions.
- OS subscriptions reference Workspace, OS Product, and Plan.
- Setup and activation state reference Workspace, Business, and Business Unit as required.
- OS operational records reference the complete required tenant and organization identifiers.
- Marketplace applicability references Workspace or Business without copying the asset.
- Audit records reference subjects without owning them.

### Boundary relationships

```text
Core Canonical Owner
  → Versioned Contract
  → Authorized Consumer
  → Local Projection or Scoped Reference
```

No consumer may turn a local projection into a conflicting canonical record. No OS may use another OS's database as a relationship mechanism.

## Future Extension Points

The conceptual model supports later detail for:

- physical identifiers, schemas, persistence, history, archival, and retention;
- exact permission, role, invitation, and service-identity models;
- Business Architect concurrency, confidence, source, review, and correction rules;
- Knowledge, Rule, Capability, recommendation, and configuration schemas;
- exact Workspace Entitlement and OS lifecycle state machines;
- an approved successor to earlier `OSEnablement` semantics;
- plan limits, billing entities, trials, proration, bundles, and commercial recovery;
- API resources, events, webhooks, idempotency, ordering, and compatibility;
- Marketplace publishers, certification, pricing, settlement, dependencies, and review;
- AI providers, model policy, context retention, residency, feedback, and evaluation;
- enterprise organizations, regions, countries, storage, analytics, and public developer access;
- additional OS references and optional cross-OS integration records.

No extension may introduce typed Workspaces, Workspace DNA, OS-owned Business DNA, mutable published Knowledge, product-first recommendations, or direct cross-OS database ownership.

## References to Genesis

- [Business DNA](../01-genesis/03-BUSINESS-DNA.md)
- [Capabilities Model](../01-genesis/04-CAPABILITIES.md)
- [Knowledge Engine](../01-genesis/05-KNOWLEDGE-ENGINE.md)
- [Business Brain](../01-genesis/06-BUSINESS-BRAIN.md)
- [Recommendation Engine](../01-genesis/07-RECOMMENDATION-ENGINE.md)
- [Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md)
- [Nexoraxs Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md)
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
- Domain boundaries and ownership: proposal sections 6 and 7.
- Unresolved model decisions: proposal section 11.
- Governing decisions: ADR-CP-002 through ADR-CP-010 and ADR-CP-012 through ADR-CP-020.
