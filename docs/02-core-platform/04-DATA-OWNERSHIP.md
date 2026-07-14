# Core Platform Data Ownership

Version: 1.0  
Status: Milestone 1 — Wave 2  
Authority: Genesis v1.1, Governance Foundation, approved Core Platform Architecture Proposal v0.2, and Core Platform Wave 1  
Owner: Nexoraxs

---

## 1. Purpose

This document defines how the Nexoraxs Core Platform assigns canonical data ownership, separates write models from read models, references data across boundaries, governs projections, preserves versions and lifecycles, and maintains consistency without violating Operating System independence.

The goal is one authoritative owner for every concept and state. A component may display, index, cache, aggregate, or react to another owner's data, but those uses never create a competing source of truth.

This document expands approved architecture. It does not define physical tables, storage engines, endpoint payloads, event names, retention durations, or unresolved aggregate transaction shapes.

## 2. Scope

This document covers:

- Canonical ownership.
- Aggregate ownership.
- Source of truth.
- Write models and read models.
- Cross-domain references.
- Cross-OS ownership.
- Projection rules.
- Data lifecycle.
- Version ownership.
- Data consistency.
- Ownership invariants.
- Relationships between Core Platform, Marketplace, and independent Operating Systems.

It applies to Core modules, Product Hub, Marketplace, AI Coordinator, shared platform services, and every Operating System consuming Core contracts.

It does not define OS operational schemas or resolve the approved open questions concerning organization write authority during OS setup or the successor to legacy `OSEnablement` semantics.

## 3. Principles

### 3.1 One canonical owner

Every concept and state has one canonical owner. The canonical owner is the only domain authorized to validate and change its write model.

### 3.2 Ownership follows business meaning

Ownership is determined by the canonical concept, not by the screen, API, deployment, or database that happens to present or store a projection.

### 3.3 Business facts remain separate from software state

Business DNA describes one Business. Recommendations, Implementation Options, Plans, subscriptions, installations, Modules, Configuration Proposals, OS configuration, and readiness remain separate state owned by their applicable domains.

### 3.4 Shared assets are referenced

Knowledge, Rules, Capabilities, Knowledge Packs, and published Marketplace Asset Versions are shared, versioned platform assets. Workspace and Business context references them; it does not copy or own their content.

### 3.5 Projections never gain write authority

Product Hub Projection, Workspace Intelligence Aggregation, search indexes, analytics views, dashboards, and other read models are reconstructable views. Their convenience does not make them sources of truth.

### 3.6 Cross-boundary writes use owner contracts

A caller requests a change through the canonical owner's command or API contract. Direct writes to another domain's data are prohibited.

### 3.7 Operating Systems remain independent

Every OS owns its operational domain. No OS reads or writes another OS's database, and no cross-OS relationship transfers ownership.

### 3.8 History is preserved where architecture requires it

Published Knowledge and Marketplace Asset Versions are immutable. Audit Records are append-only. Business DNA publication, Recommendations, Configuration Proposals, and governed decisions retain the versions and provenance required for traceability.

### 3.9 Context is explicit

Tenant-owned data belongs to or resolves one Workspace. Business, Business Unit, Department, Branch, OS, and resource scope are included whenever their concept requires them.

## 4. Responsibilities

### 4.1 Canonical owners

Canonical owners must:

- define and enforce their invariants;
- authorize writes at the relevant scope;
- preserve required history and versions;
- expose stable contracts for approved consumers;
- publish or provide projections without transferring ownership;
- reject changes that violate lifecycle, permission, entitlement, or tenant constraints;
- record critical changes through Audit Service.

### 4.2 Consumers

Consumers must:

- treat owner-provided identifiers and versions as authoritative references;
- avoid copying another domain's data into a competing write model;
- tolerate projection delay where asynchronous integration is used;
- issue changes through owner contracts;
- apply authorization again for the consumer's own resource and action;
- preserve source references and version information when a decision depends on them;
- remove or rebuild projections without changing source data.

### 4.3 Core Platform

Core Platform owns shared identity, organization, Business DNA, Knowledge, Rules, Capabilities, intelligence, commercial control, Product Hub orchestration, shared governance services, API contracts, navigation coordination, and AI coordination.

### 4.4 Marketplace

Marketplace is a bounded context within the Core Platform offering. It owns Marketplace assets, versions, publishers, purchase, installation, activation, applicability, review, and Marketplace lifecycle state.

### 4.5 Operating Systems

Each OS owns its setup, Modules, domain model, workflows, operational records, reports, dashboards, menus, settings, endpoints, configuration application, and operational lifecycle state.

## 5. Architecture

### 5.1 Ownership model

```text
Canonical Owner
  ├── owns the write model
  ├── enforces invariants and authorization
  ├── owns lifecycle and version semantics
  ├── exposes commands, queries, and Events
  └── produces stable projections
          │
          v
Approved Consumer
  ├── stores an identifier or version reference
  ├── builds a read model or local projection
  ├── evaluates its own permissions
  └── requests changes through the owner
```

The write model is the canonical representation used by an owner to validate state changes. A read model is a presentation or query representation derived from one or more canonical sources. A source of truth is the canonical owner's governed write model and preserved history, not whichever projection is most convenient to query.

### 5.2 Canonical source-of-truth map

| Concept or state | Canonical owner | Source of truth | Approved consumers |
|---|---|---|---|
| User identity, authentication, sessions | Core Identity and Access | Identity write model | All authorized platform surfaces and services |
| Workspace Membership, roles, scoped Permission assignments | Core Identity and Access | Membership and access write model | Core, Marketplace, and OS authorization |
| Workspace | Core Workspace Management | Workspace write model | Core modules, Marketplace, OSs, AI Coordinator |
| Business | Core Business Registry | Business write model | Business Architect, Product Hub, intelligence, OSs |
| Business Unit, Department, Branch identity and parent relationship | Core Organization Registry | Organization write model | Core authorization and applicable OSs |
| Business Architect Session and Candidate Facts | Core Business Architect | Pipeline write model | Business Architect experience and Audit Service |
| Business DNA Identity, Business DNA Snapshot, Business DNA Fact, Provenance | Core Business DNA Registry | Business-scoped DNA write model and published history | Business Brain, Recommendation Engine, Configuration Engine, approved OS setup, AI Coordinator |
| Workspace Intelligence Aggregation | Core intelligence projection | Underlying Business DNA identities remain authoritative | Product Hub, analytics, AI Coordinator |
| Capability and Capability metadata | Core Capability Registry | Versioned Capability write model | Business Brain, Product and Plan Catalog, Marketplace, OS mappings |
| Knowledge Object and published Knowledge version | Knowledge Engine | Versioned Knowledge write model | Rules Engine, Business Brain, AI Experts, OSs, Marketplace |
| Rule and Rule outcome | Core Rules domain | Versioned Rule write model and evaluation evidence | Business Brain, Configuration Engine, authorized consumers |
| Business Brain Decision | Core intelligence | Decision record with pinned inputs | Recommendation Engine, Product Hub, AI Coordinator |
| Recommendation and disposition | Core Recommendation Engine | Recommendation write model and lifecycle | Product Hub, Business Architect, AI Coordinator, approved OS surfaces |
| Implementation Option mapping | Core intelligence mapping | Mapping record referencing canonical product or asset identifiers | Product Hub |
| Configuration Proposal | Core Configuration Engine | Proposal write model | Owning platform component or selected OS |
| Readiness Assessment and Core Workspace Ready | Core Readiness Service | Core readiness write model and criteria result | Product Hub, navigation, AI Coordinator |
| OS-owned setup and operational readiness facts | Selected OS | OS setup and domain write model | Core Readiness Service through stable projection |
| OS Product and Plan | Core Product and Plan Catalog | Versioned catalog write model | Product Hub, commercial control, OSs |
| Workspace Entitlement, OS Subscription, commercial state | Core commercial control | Entitlement and subscription write model | Product Hub, authorization, selected OS |
| Platform-side installation and activation operation | Core Installation and Activation Coordinator | Long-Running Operation and lifecycle records | Product Hub, navigation, selected OS |
| Product Hub Projection | Core Product Hub projection | Canonical owners listed above remain authoritative | Product Hub experience |
| Setup Handoff | Core Product Hub for issuance; destination revalidates | Short-lived handoff record or reference | Selected OS setup |
| Marketplace Asset, Marketplace Asset Version, publisher, review | Marketplace bounded context | Marketplace asset write model and immutable published history | Product Hub, Business Brain, AI Coordinator, OSs |
| Marketplace Purchase, Installation, Activation, Applicability | Marketplace bounded context | Workspace-scoped Marketplace write model | Product Hub, Business Brain, authorized asset consumers |
| Notification and delivery state | Core Notification Service | Notification write model | Users, Core modules, authorized OS producers |
| Audit Record | Core Audit Service | Append-only audit history | Authorized governance surfaces |
| Settings and Localization Context | Core Settings and Localization | Settings write model and resolved context | Core experiences and OSs |
| Search projection | Core Search Coordination | Source domains remain authoritative | Authorized search consumers |
| Analytics projection | Core Analytics Intake and approved analytics views | Source domains remain authoritative | Business Brain and authorized analytics consumers |
| AI Expert Definition | Core or Marketplace according to publication | Versioned Expert Registry or Marketplace Asset Version | AI Coordinator |
| AI Interaction and AI Action Proposal | Core AI Coordinator | AI coordination write model | Authorized requester, Audit Service, owning action service |
| OS operational record | Owning OS | OS domain write model | Owning OS and authorized optional integrations |

### 5.3 Aggregate ownership

Aggregate ownership identifies the logical domain responsible for consistency and mutation. It does not prescribe a physical table layout or settle every transactional boundary.

| Logical aggregate ownership | Canonical owner | Included responsibility | Excluded responsibility |
|---|---|---|---|
| User and Workspace Membership | Core Identity and Access | Identity, membership lifecycle, roles, Permission assignments | HR employee profile; OS domain staff records |
| Workspace | Core Workspace Management | Workspace identity, lifecycle, defaults, tenant boundary | Business DNA; OS operational data |
| Business | Core Business Registry | Business identity, Workspace parent, lifecycle | Business Unit operational configuration; Business DNA facts |
| Organization Registry | Core Organization Registry | Business Unit, Department, Branch identity and parent constraints | OS-specific behavior and operational records |
| Business Architect Session | Core Business Architect | Pipeline stage, Candidate Facts, questions, validation, Review Checkpoint, retry state | Published Business DNA |
| Business DNA Identity | Core Business DNA Registry | Business DNA Snapshots, facts, Provenance, publication history | Recommendations and software configuration |
| Capability | Core Capability Registry | Definition, metadata, dependency and lifecycle state | OS Module behavior |
| Knowledge Object | Knowledge Engine | Content, source, immutable published versions, lifecycle | Workspace-owned content copies |
| Rule | Core Rules domain | Rule definition, version, applicability and governed evaluation | AI-generated policy changes |
| Business Brain Decision | Core intelligence | Pinned input references, decision evidence and outcome | Source Knowledge or Business DNA |
| Recommendation | Core Recommendation Engine | Recommendation content, evidence, priority, disposition and lifecycle | Product, Plan or Marketplace source records |
| Configuration Proposal | Core Configuration Engine | Proposal content, target, input versions, review and status | Target-domain application state |
| Product and Plan | Core Product and Plan Catalog | Product metadata, Plans, Capability mapping, compatibility and setup destination | OS Modules or operational configuration |
| Workspace Entitlement and OS Subscription | Core commercial control | Workspace commercial entitlement and OS Plan relationship | OS setup, activation, or operational access |
| Installation and Activation operation | Core control plane | Platform-side Long-Running Operation and transition status | OS domain setup and configuration application |
| Marketplace Asset | Marketplace bounded context | Asset metadata, publisher, immutable versions, review and publication lifecycle | Workspace activation state |
| Marketplace scoped state | Marketplace bounded context | Purchase, installation, activation, version selection, applicability | Shared Marketplace Asset content |
| Notification | Core Notification Service | Notification record, audience, preferences and delivery state | Producer domain facts |
| Audit Record | Core Audit Service | Append-only critical action history | Mutable correction of earlier records |
| AI Interaction | Core AI Coordinator | Authorized context references, policy, expert versions, evidence, confidence, response, Action Proposal | Execution of consequential target actions |
| OS domain aggregate | Owning OS | Domain rules, operational data, workflows and local history | Core identity, Knowledge, subscriptions, Marketplace, other OS data |

The approved architecture leaves the final physical aggregate for organization creation during OS setup and the combined OS lifecycle record unresolved. Those questions remain deferred.

### 5.4 Write-model rules

1. Only the canonical owner accepts a state-changing command for its write model.
2. The owner re-resolves Authentication, Authorization Context, Permission, Workspace Entitlement, lifecycle, and resource invariants.
3. Cross-domain callers submit canonical identifiers, expected versions where required, and idempotency information where retry is possible.
4. An owner never trusts a projection as proof that a write remains valid.
5. The owner records the resulting canonical state and required Audit Record before exposing a committed fact.
6. OSs and Core modules do not write through shared tables to coordinate behavior.

### 5.5 Read-model rules

Read models may:

- denormalize owner-provided data for a bounded query or customer task;
- combine multiple canonical sources;
- localize presentation labels;
- retain source identifier, source owner, source version, projection time, and correlation information;
- be rebuilt or discarded without changing source data;
- apply consumer-specific authorization before returning results.

Read models must not:

- accept canonical state changes directly;
- hide a source lifecycle or ownership boundary;
- merge separate Business DNA identities;
- copy shared Knowledge or Marketplace content into tenant-owned truth;
- imply that projected readiness, entitlement, or Permission remains valid without owner re-evaluation;
- become a cross-OS shared operational database.

### 5.6 Product Hub and Workspace aggregation

Product Hub Projection composes Recommendations, product and Plan metadata, eligibility, Workspace Entitlement, OS Subscription, installation, OS readiness, Marketplace state, and Business health. Each source retains ownership.

Workspace Intelligence Aggregation composes selected Business DNA identities. It is explicit, non-destructive, and cannot write back into individual Business DNA.

Both projections must make their context visible and preserve source references. A projection failure or delay produces an explainable partial, pending, stale, or unavailable state rather than invented success.

### 5.7 Cross-domain references

Cross-domain relationships use identifiers and, where the decision depends on a historical definition, version identifiers.

Required reference behavior:

- a Business Unit reference includes or resolves its Business and Workspace ancestry;
- a Branch or Department reference resolves its Business Unit ancestry;
- an OS operational record carries or resolves the required Workspace, Business, Business Unit, Branch, OS, and resource context;
- a Recommendation references its Business DNA Snapshot, Knowledge, Rule, Capability, and decision inputs as required for explanation;
- an Implementation Option references the canonical OS Product, Plan, or Marketplace Asset Version;
- Marketplace Applicability references Workspace or Business without copying the Marketplace Asset;
- Audit Records reference subjects without becoming their owner;
- references to removed or archived data follow the source owner's retention and lifecycle policy rather than being silently repointed.

A consumer may store a local projection of descriptive fields for performance, but the canonical identifier and source remain explicit. A projected label is not an independent source of truth.

### 5.8 Cross-OS ownership rules

1. Each OS owns its complete operational domain and local domain invariants.
2. No OS reads or writes another OS's database or internal write model.
3. Cross-OS communication uses stable Integration Events or authorized API contracts through platform governance.
4. The source OS remains owner of the source fact.
5. A consuming OS owns only its local response, link, or projection.
6. Integration is optional and cannot unlock another OS's basic workflow.
7. Removal, pause, or failure of one OS must not corrupt another OS's canonical state.
8. Shared Core identifiers support correlation but do not turn Core into the owner of OS operational facts.
9. Conflicting updates are resolved by canonical owners; a consumer cannot overwrite the source to reconcile a projection.

### 5.9 Projection rules

Every projection declares:

- its owning projection component;
- canonical source domains;
- tenant and organizational scope;
- source identifiers and relevant versions;
- last successful update or build context;
- authorization policy for reading it;
- whether delay is permitted;
- rebuild and invalidation behavior;
- how deletion, archive, deprecation, or removal from the source is represented.

Projection refresh may use synchronous queries or versioned Events according to the approved API Architecture. The choice does not change canonical ownership.

### 5.10 Data lifecycle

| Data category | Lifecycle rule |
|---|---|
| Workspace and organization identity | Follows its canonical lifecycle. Archive or removal never authorizes another domain to reuse the identity as a different concept. |
| Business Architect Session | May progress, pause, block, expire, or be superseded. Pipeline state remains separate from published Business DNA. |
| Business DNA | Publication creates governed history for one stable Business DNA Identity. Correction and snapshot mutation policy remains deferred. |
| Knowledge, Rule, Capability | Uses versioned governance. Published Knowledge is immutable; Rule and Capability decisions retain version references. |
| Recommendation | Preserves generated, reviewed, accepted or rejected, and learned disposition according to its lifecycle. It never becomes Business DNA. |
| Configuration Proposal | Preserves source versions, target, review status, and target response. Target application remains target-owned. |
| Workspace Entitlement and OS Subscription | Commercial lifecycle remains distinct from installation, setup, configuration, activation, readiness, and operation. |
| OS operational data | Follows the owning OS lifecycle. Paused access, archived read-only history, and removed-product retention follow approved OS policy. |
| Marketplace Asset Version | Published versions are immutable and preserved through deprecation and archive. |
| Marketplace scoped state | Purchase, installation, activation, version selection, and applicability may change without modifying the shared asset. |
| Audit Record | Append-only. Correction creates a later record. |
| Notification | Delivery and retention follow Notification Service policy without changing producer facts. |
| Projection | Rebuildable and disposable. Removal does not delete its source. |
| AI Interaction | Preserves governed context references and audit data under future retention, privacy, and residency policy. |

Exact retention periods, deletion handling, anonymization, and residency remain deferred.

### 5.11 Version ownership

The domain that owns content owns its version sequence and compatibility rules.

| Versioned concept | Version owner | Consumer obligation |
|---|---|---|
| Business DNA Snapshot | Business DNA Registry | Reference the exact snapshot used for a decision. |
| Capability | Capability Registry | Use canonical identifiers and supported versions. |
| Knowledge Object | Knowledge Engine | Never mutate a published version; retain evidence reference. |
| Rule | Rules domain | Pin the version used for governed evaluation. |
| Recommendation | Recommendation Engine | Preserve source versions and disposition history. |
| Configuration Proposal | Configuration Engine | Target validates proposal version and compatibility. |
| OS Product and Plan definition | Product and Plan Catalog | Consumers tolerate compatible catalog evolution. |
| Marketplace Asset Version | Marketplace | Activation selects an immutable version. |
| AI Expert Definition | Expert Registry or Marketplace | AI Interaction records the selected version. |
| API or Event contract | API Architecture and source domain | Consumers follow compatibility and deprecation policy. |

Version ownership does not allow a domain to change canonical terms or violate a higher-authority lifecycle.

### 5.12 Data consistency principles

- The canonical owner validates a write against its current write model.
- A write affecting one owner is committed by that owner before a Domain Event announces the fact.
- Cross-domain projections may be updated after the source commit and may therefore be temporarily behind the owner.
- Consumers must not infer successful source mutation from a request, projection, or Event delivery attempt alone.
- Retryable commands and Event consumers use idempotency.
- A consumer that misses or rejects an update recovers through owner queries or approved replay without editing the source.
- No global transaction or global Event ordering is assumed across independent domains or Operating Systems.
- Where an immediate decision is safety- or permission-critical, the owner is queried or the decision is re-evaluated rather than relying on a stale projection.
- Partial failure remains observable and recoverable; it is not repaired by bypassing ownership.

The exact consistency mechanisms, transaction boundaries, and service-level objectives are implementation decisions for later approved documentation.

### 5.13 Ownership invariants

1. Every canonical concept has exactly one canonical owner.
2. Every tenant-owned record belongs to or resolves one Workspace.
3. Every Business belongs to exactly one Workspace.
4. Every Business owns exactly one Business DNA Identity.
5. Every Business Unit belongs to exactly one Business.
6. Every Department and Branch belongs to exactly one Business Unit.
7. Business DNA never owns or contains software state.
8. Knowledge, Rules, Capabilities, and published Marketplace Asset Versions are not tenant-owned copies.
9. Product Hub and Workspace Intelligence Aggregation are projections, not write owners.
10. Marketplace owns Marketplace state even when presented through Product Hub.
11. OS Subscription is Workspace-scoped; operational state includes the applicable Business and Business Unit context.
12. An OS owns its operational data and never another OS's data.
13. Core owns organization identity but not OS operational behavior.
14. AI cannot become the source of truth for Knowledge, Rules, Business DNA, Permission, or operational facts.
15. Audit history is append-only.
16. Published immutable versions are never edited in place.
17. Cross-domain references do not transfer ownership.
18. A read model cannot authorize a write by itself.

## 6. Ownership

### 6.1 Ownership boundary summary

```text
Core Platform
  ├── Identity, Workspace, Business, organization identity
  ├── Business DNA, Knowledge, Rules, Capabilities
  ├── Business Brain, Recommendations, Configuration Proposals
  ├── catalog, entitlement, subscription, installation coordination
  ├── Product Hub composition
  ├── Notification, Audit, settings, API and AI coordination
  └── Core readiness

Marketplace bounded context
  ├── Marketplace Assets and immutable versions
  └── purchase, installation, activation, applicability and lifecycle

Each Operating System
  ├── OS-specific setup and configuration application
  ├── Modules, workflows and operational data
  ├── OS reports, dashboards, menus and settings
  └── OS operational readiness facts
```

### 6.2 Ownership disputes

When two components appear to own the same data:

1. Identify the canonical concept in the Glossary.
2. Identify its accepted ADR and Wave 1 owner.
3. Separate source data from projection or reference data.
4. Preserve the higher-authority owner.
5. If ambiguity remains, stop and use the ADR process rather than creating a second owner.

## 7. Relationships

### 7.1 Organization relationship

```text
Workspace
  └── Business
      ├── Business DNA Identity
      └── Business Unit
          ├── Department
          └── Branch
```

The relationship defines identity and scope. It is not an authorization shortcut and does not give Core ownership of OS operational behavior.

### 7.2 Intelligence relationship

```text
Business DNA Snapshot + Knowledge + Rules + Capability
  → Business Brain Decision
  → Recommendation
  → Implementation Option
  → Configuration Proposal
  → owning target validates and applies
```

Every arrow is a reference or governed contract, not ownership transfer.

### 7.3 Product relationship

```text
Product Hub Projection
  ← Recommendation Engine
  ← Product and Plan Catalog
  ← commercial control
  ← Installation and Activation Coordinator
  ← Marketplace
  ← selected OS readiness projection
```

Product Hub owns the journey and projection only.

### 7.4 Cross-OS relationship

```text
Source OS write model
  → stable Integration Event or authorized API
  → consuming OS projection or local action
```

The source OS remains source of truth. The consumer owns its response and local state.

## 8. Future Extension Points

Future documentation may define:

- physical aggregate and transaction boundaries;
- database schemas, indexes, partitioning, archival, retention, deletion, and residency;
- projection storage, rebuild, invalidation, freshness, and service-level objectives;
- optimistic concurrency and expected-version behavior;
- organization write authority during OS setup;
- the canonical successor to legacy `OSEnablement` semantics;
- Business DNA correction and immutable snapshot policy;
- exact lifecycle retention for removed Operating Systems and Marketplace scoped state;
- anonymous learning data, consent, minimization, and re-identification controls;
- backup, restore, export, and legal-hold requirements;
- cross-region and enterprise consistency behavior.

These extensions must preserve canonical ownership, tenant scope, immutable shared assets, OS independence, and contract-only cross-domain writes.

## 9. References to Genesis

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
- [Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

## 10. References to Governance

- [Canonical Glossary](../00-governance/glossary/GLOSSARY.md)
- [ADR-004 — Genesis Organization Hierarchy](../00-governance/ADR/ADR-004-genesis-organization-hierarchy.md)
- [ADR-005 — Business DNA Ownership](../00-governance/ADR/ADR-005-business-dna-business-scoped-software-independent.md)
- [ADR-006 — Workspace Intelligence Aggregation](../00-governance/ADR/ADR-006-workspace-intelligence-explicit-aggregation.md)
- [ADR-009 — Shared Versioned Immutable Knowledge](../00-governance/ADR/ADR-009-shared-versioned-immutable-knowledge.md)
- [ADR-017 — Configuration Proposals](../00-governance/ADR/ADR-017-configuration-proposals-respect-domain-ownership.md)
- [ADR-020 — Product Hub Composition](../00-governance/ADR/ADR-020-product-hub-composition-not-data-ownership.md)
- [ADR-023 — Workspace Subscription and Business Unit Operation](../00-governance/ADR/ADR-023-workspace-subscription-business-unit-operation.md)
- [ADR-024 — Independent OS Domain Ownership](../00-governance/ADR/ADR-024-independent-operating-system-domain-ownership.md)
- [ADR-025 — Contract-Based Optional Integration](../00-governance/ADR/ADR-025-contract-based-optional-os-integration.md)
- [ADR-027 — Marketplace Bounded Context](../00-governance/ADR/ADR-027-marketplace-bounded-context-within-core.md)
- [ADR-028 — Marketplace Asset and Scoped State](../00-governance/ADR/ADR-028-immutable-marketplace-assets-scoped-state.md)
- [ADR-038 — Append-Only Audit History](../00-governance/ADR/ADR-038-append-only-audit-history.md)
- [ADR-040 — Core Organization Identity and OS Operational Data](../00-governance/ADR/ADR-040-core-organization-identity-os-operational-data.md)

## 11. References to the Approved Proposal

- [Core Platform Architecture Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- Ownership matrix and mandatory rules: proposal section 7.
- Domain boundaries: proposal section 6.
- API and projection rules: proposal sections 5.2 and 5.4.
- Governing decisions: ADR-CP-003, ADR-CP-004, ADR-CP-008, ADR-CP-009, ADR-CP-012, ADR-CP-013, ADR-CP-014, ADR-CP-016, and ADR-CP-017.

## 12. References to Wave 1

- [Wave 1 README](README.md)
- [Core Platform Vision](01-CORE-PLATFORM-VISION.md)
- [Core Platform Architecture](02-CORE-PLATFORM-ARCHITECTURE.md)
- [Core Platform Domain Model](03-DOMAIN-MODEL.md)
