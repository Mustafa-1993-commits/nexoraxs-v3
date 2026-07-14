# Core Platform Architectural Principles

Version: 1.0  
Status: Approved Architectural Foundation  
Authority: Genesis v1.1, Governance Foundation, approved Core Platform Architecture Proposal v0.2, and approved Core Platform Waves 1–2  
Owner: Nexoraxs

---

## 1. Purpose

This document is the consolidated architectural foundation for every future Core Platform document, Architecture Decision Record, specification, implementation plan, API contract, Event contract, data model, security model, and Operating System integration.

It collects principles already approved across Genesis v1.1, Governance, the frozen Core Platform Architecture Proposal v0.2, and approved Core Platform Waves 1–2. It does not create, amend, rank, or supersede those principles.

When a future design choice is uncertain, the choice must be evaluated against this document and its authoritative sources. A design that conflicts with an approved principle cannot be adopted silently.

## 2. Scope

These principles apply to:

- Core Platform bounded domains and logical modules;
- Marketplace as a bounded context within the Core Platform offering;
- independent Operating Systems consuming Core contracts;
- Business Architect, Business DNA, Knowledge, Rules, Business Brain, Recommendations, Configuration Proposals, Product Hub, and AI Coordinator;
- data ownership, read models, projections, APIs, Events, Permissions, Notifications, Audit, search, storage, and analytics;
- human and service access;
- future partners, public APIs, SDKs, AI Experts, Marketplace publishers, and optional cross-OS integrations;
- logical architecture regardless of deployment technology.

This document does not resolve open architecture questions, define implementation mechanisms, create new canonical terminology, or authorize Wave 3.

## 3. Relationship to Genesis

Genesis v1.1 is the ultimate authority.

Genesis defines Nexoraxs as a Business Operating Intelligence Platform and establishes permanent principles including Knowledge Before AI, Software Adapts to Business, Business Before Technology, Capabilities Before Industries, Explain Every Recommendation, Infer Before Asking, independent Operating Systems, optional integration, conversational configuration, simplicity, Data Before Code, human control, continuous learning, and long-term scale.

This document translates those permanent principles into one Core Platform architectural checklist. If this document and Genesis appear to conflict, Genesis governs and work stops until the discrepancy is reviewed.

## 4. Relationship to Governance

Governance provides the canonical Glossary and accepted ADR-001 through ADR-040.

- The Glossary controls canonical meaning and prevents synonyms from becoming competing concepts.
- Accepted ADRs record approved architectural decisions and their consequences.
- Future material decisions use the ADR lifecycle.
- This document summarizes those decisions but does not replace their Context, Alternatives Considered, or Related Documents.

If a future proposal conflicts with an accepted ADR, it must use a new ADR that explicitly supersedes the earlier decision after approval. Existing accepted ADRs are not rewritten to hide architectural change.

## 5. Relationship to the Core Platform Proposal

The approved Core Platform Architecture Proposal v0.2 is frozen.

It defines Core as the shared control and intelligence plane, establishes the organization hierarchy and ownership rules, separates Core Workspace Ready from Operating System Ready, defines Business Architect Pipeline, Product Hub, Marketplace, AI Coordinator, API Architecture, and Navigation Architecture boundaries, and records ADR-CP-001 through ADR-CP-020.

This principles document consolidates those approved decisions. It cannot widen Core scope, move Operating System domain logic into Core, collapse Marketplace into Product Hub, or resolve proposal open questions.

## 6. Core Architectural Principles

The principles are grouped by their primary architectural category. Categories do not create separate authority; principles apply together.

### 6.1 Domain Principles

#### P-01 — Domain First

Architecture begins with canonical business and platform domains, their meaning, ownership, invariants, and relationships. UI screens, frameworks, databases, APIs, and deployment units must follow those boundaries rather than define them.

#### P-02 — Business Before Software

The platform understands the Business before selecting or configuring software. Recommendations first express business improvements and Capabilities; Operating Systems, Plans, and Marketplace Assets are Implementation Options.

#### P-03 — Capabilities Before Industries

Capabilities are reusable, platform-wide descriptions of what a Business needs. Industries describe Business DNA and Knowledge applicability; they do not create software boundaries, typed Workspaces, or duplicated applications.

#### P-04 — Canonical Ontology

Workspace, Business, Business Unit, Department, Branch, Business DNA, Capability, Module, Operating System, Knowledge, Recommendation, Marketplace, and every other governed concept retain one canonical meaning. A convenient synonym cannot create a second model.

#### P-05 — Business DNA Is Business-Scoped

Every Business owns exactly one Business DNA Identity. Business DNA describes how that Business operates, never its selected software. Workspace Intelligence Aggregation is explicit and never merges, replaces, or rewrites individual Business DNA.

#### P-06 — Independent Operating Systems

Each Operating System owns its complete operational domain, UI, setup, Modules, workflows, data, reports, dashboards, settings, APIs, and release lifecycle. Core provides shared services without absorbing OS domain behavior.

#### P-07 — Boundaries Follow Canonical Ownership

The owner of a concept owns its write model, lifecycle, invariants, versions, and domain decisions. Presentation, storage location, co-deployment, or consumption does not move the boundary.

#### P-08 — Capability-First Intelligence

Business Brain and Recommendation Engine identify the business improvement and Capability need before mapping an OS Product, Plan, or Marketplace Asset. Product-only recommendations are invalid.

#### P-09 — Infer Before Asking

Business Architect and configuration experiences infer reasonable Candidate Facts from authorized evidence before asking the customer. Inference remains confidence-aware, traceable, reviewable, correctable, and subordinate to deterministic validation.

### 6.2 Data Principles

#### P-10 — Canonical Ownership

Every canonical concept and state has one canonical owner. Only that owner validates and changes its write model. Other domains issue commands through owner contracts.

#### P-11 — Single Source of Truth

The canonical owner's governed write model and preserved history are the source of truth. A cache, index, dashboard, API composition, Event payload, Product Hub view, or consumer copy never becomes a competing truth.

#### P-12 — Business Facts and Software State Are Separate

Business DNA facts remain separate from Recommendations, Implementation Options, Plans, subscriptions, installations, Modules, Configuration Proposals, OS configuration, activation, and readiness.

#### P-13 — Projection Is Never Ownership

Product Hub Projection, Workspace Intelligence Aggregation, search, analytics, navigation state, and Event-derived views may compose sources but never gain authority to write or redefine them.

#### P-14 — Read Models Are Disposable

Read models are reconstructable from canonical owners. They may be denormalized, cached, localized, or rebuilt, but deleting or rebuilding them cannot change source state.

#### P-15 — Shared Assets Are Referenced, Not Copied

Knowledge, Rules, Capabilities, Knowledge Packs, and published Marketplace Asset Versions remain shared platform assets. Workspace or Business applicability uses identifiers and scoped state rather than tenant-owned content duplication.

#### P-16 — Immutable Published Assets

Published Knowledge and Marketplace Asset Versions are immutable. A change publishes a new version. Deprecation, archive, rollback, and removal preserve historical versions and never rewrite published content.

#### P-17 — Configuration Over Code

The approved Genesis rule is Data Before Code. Business Knowledge, Rules, questions, Recommendations, Capabilities, workflows, dashboards, reports, and configuration metadata exist as structured, governed, versioned data whenever possible rather than duplicated hardcoded behavior.

#### P-18 — Explainability and Provenance by Design

Facts, inferences, Rules, Recommendations, Business Brain Decisions, Configuration Proposals, Events, and AI outputs retain the source, actor, versions, evidence, assumptions, confidence, and disposition required to explain them.

#### P-19 — Auditability

Critical platform and OS actions produce append-only Audit Records with actor or service, tenant and resource scope, source domain, action, subject, time, correlation, and result references. Corrections create new records rather than changing history.

### 6.3 Integration Principles

#### P-20 — Contract First

Core modules, Marketplace, Operating Systems, partners, external clients, and AI tools interact through explicit, governed, versioned contracts. Contracts define meaning and ownership independently from implementation.

#### P-21 — API First

Approved platform capabilities are exposed through deliberate API surfaces appropriate to their consumers. Database schemas, framework endpoints, and internal implementation details are not platform contracts.

#### P-22 — Cross-Boundary Writes Use Owner Contracts

A caller requests a state change through the canonical owner's command or API. Direct writes to another domain's tables or write model are prohibited.

#### P-23 — Optional Cross-OS Integration

Operating Systems may cooperate through approved platform contracts, but no OS requires another OS to complete its core workflow. Integration adds value without becoming a dependency for basic operation.

#### P-24 — Event-Driven Where Appropriate

Events are used when a committed fact must cross a module, product, Marketplace, OS, partner, or external boundary asynchronously or maintain an approved projection. Synchronous commands and queries remain appropriate when an immediate validated result is required.

#### P-25 — Source Owner Owns Event Meaning

The domain that commits a fact owns its Domain Event and the meaning exposed in an Integration Event. Event transport, gateways, consumers, and projections do not become fact owners.

#### P-26 — Asynchronous Consumers Are Idempotent and Order-Aware

Consumers tolerate duplicate, delayed, replayed, and out-of-order delivery within the Event contract. Exactly-once delivery and global ordering are not assumed.

#### P-27 — Integration Contracts Are Stable and Minimal

Integration Events, APIs, and Webhooks expose only the stable, authorized facts required by consumers. Internal models and unnecessary sensitive detail remain behind owner boundaries.

### 6.4 Security Principles

#### P-28 — Explicit Context

Every protected operation resolves the actor plus applicable Workspace, Business, Business Unit, Department, Branch, OS, resource, Permission, entitlement, and lifecycle context. Client-provided identifiers are inputs to validation, not proof.

#### P-29 — Tenant Isolation by Default

Every tenant-owned record, query, Event, projection, AI context, and action belongs to or resolves one Workspace. Cross-Workspace access is never inferred from route, cache, service location, or product membership.

#### P-30 — Security by Default

Protected operations require successful identity, scope, Permission, entitlement, lifecycle, contract, and owning-domain checks. Missing, invalid, expired, or unresolved requirements do not create access.

#### P-31 — Least Privilege

Users, services, Marketplace Assets, Operating Systems, integrations, AI Coordinator, and AI Experts receive only the access required for the approved action and explicit scope. Internal placement never implies platform-wide access.

#### P-32 — Authentication Is Not Authorization

Authentication establishes identity. Authorization evaluates one requested action against current membership, Permission, scope, attributes, entitlement, lifecycle, and resource policy.

#### P-33 — Organization Hierarchy Is Not Permission Inheritance

Workspace → Business → Business Unit → Department/Branch is structural. It does not grant descendant, sibling, parent, OS, or resource access unless an approved Permission contract and explicit assignment authorize it.

#### P-34 — Owning Domains Make Final Authorization Decisions

API Gateway and shared Core authorization may reject requests early, but the canonical resource owner validates resource-level Permission and invariants. A successful boundary check cannot bypass the owner.

### 6.5 AI Principles

#### P-35 — Knowledge Before AI

AI consumes approved Knowledge, Rules, Business Brain results, Recommendations, and authorized context. AI is not the source of official business knowledge or deterministic policy.

#### P-36 — AI Assists and Never Owns Business Facts

AI may infer Candidate Facts, explain, summarize, recommend, and create AI Action Proposals. It never becomes the canonical owner of Business DNA, Knowledge, Rules, Permissions, subscriptions, financial records, or OS operational facts.

#### P-37 — Human Approval for Consequential Decisions

AI and automation cannot approve transactions, modify Permissions, override compliance, change financial or operational truth, or perform other critical actions without separately authorized, validated, and auditable execution by the owning service and required human approval.

#### P-38 — AI Is Explainable and Confidence-Aware

AI outputs identify evidence, Knowledge sources, assumptions, alternatives, and confidence. Low-confidence or conflicting output remains explicit and prompts governed verification rather than silent conversion into truth.

#### P-39 — AI Has No Implicit Privilege

AI Coordinator operates within the requesting principal's authorized context and the narrower access of approved AI Tool APIs. Expert selection, collaboration, conversation history, or provider access never broadens Permission.

### 6.6 Marketplace Principles

#### P-40 — Marketplace Is a Separate Bounded Context Within Core

Core Platform is accountable for Marketplace, while Marketplace owns its Asset, publisher, version, purchase, installation, activation, applicability, review, and lifecycle models behind explicit contracts.

#### P-41 — Marketplace Assets Are Shared and Activation Is Scoped

Marketplace Asset Versions are platform-wide, shared, immutable, and versioned. Purchase, installation, activation, and version selection belong to a Workspace; applicability may target the Workspace or one Business.

#### P-42 — Knowledge Packs Are Additive and Non-Destructive

Knowledge Packs extend the Knowledge Engine without replacing or mutating Core Knowledge. Updating selects a new immutable version; removal deletes scoped state only.

### 6.7 Evolution Principles

#### P-43 — Version Everything That Crosses Time or Boundaries

Knowledge, Rules, Capabilities, Business DNA Snapshots, Recommendations, Configuration Proposals, product definitions, Marketplace Assets, AI Experts, APIs, and Event contracts retain explicit versions where required for traceability and compatibility.

#### P-44 — Backward Compatibility

Architecture contracts evolve independently from framework and persistence models. Compatible additive change is preferred; breaking change requires a new version, explicit migration, and governed deprecation.

#### P-45 — Logical Boundaries Before Physical Distribution

Core begins as an enforced modular monolith with explicit ownership, dependency direction, contracts, data access boundaries, and conformance tests. Co-deployment does not weaken boundaries.

#### P-46 — Physical Extraction Requires Evidence

Marketplace or another logical module may be extracted only for demonstrated scaling, security, release, or ownership needs. Deployment changes preserve the same canonical concepts and contracts.

#### P-47 — Lifecycle States Remain Separate

Workspace Entitlement, OS Subscription, installation, setup, configuration, activation, Core Workspace Ready, Operating System Ready, operation, pause, archive, and removal remain distinct. A convenience projection cannot collapse them into one flag.

#### P-48 — Architectural Evolution Uses ADRs

Every material new or changed architectural decision follows the Governance ADR lifecycle, uses canonical Glossary terms, references affected sources, explains alternatives and consequences, and receives explicit approval before becoming authoritative.

## 7. Principle Application

Every future Core Platform document must:

1. identify the canonical domain and owner;
2. state the tenant and organizational context;
3. distinguish source data, write model, read model, projection, and reference;
4. identify synchronous API and asynchronous Event boundaries;
5. preserve OS and Marketplace independence;
6. define Authorization at the owning resource boundary;
7. state version, compatibility, audit, and failure behavior;
8. keep AI downstream of Knowledge, Rules, Permission, and human authority;
9. list deferred decisions instead of inventing them;
10. reference the Genesis, ADR, proposal, and approved Wave sources that authorize the design.

A future implementation may choose technology inside these constraints. It may not treat technology choice as permission to change the constraints.

## 8. Architectural Anti-Patterns

### AP-01 — Shared Database Between Operating Systems

One OS directly reading or writing another OS's database or mutable domain tables violates independent ownership and optional integration.

### AP-02 — Multiple Sources of Truth

Creating a second writable copy of Workspace, Business, Business DNA, Knowledge, subscription, Marketplace, Permission, or OS domain state creates conflicting ownership.

### AP-03 — Hidden Context

Inferring Workspace, Business, Business Unit, Branch, OS, or resource scope only from UI state, route shape, cache, or implicit session behavior violates explicit context.

### AP-04 — Implicit Authorization

Treating Authentication, Workspace Membership, a role name, route access, Event receipt, or object identifier as sufficient Authorization bypasses owning-domain Permission checks.

### AP-05 — Organization Hierarchy as an Authorization Shortcut

Automatically granting descendant, sibling, parent, or OS access from organizational position violates the approved Permission Model.

### AP-06 — AI Modifying Business Facts

Allowing AI to write published Business DNA, official Knowledge, Rules, Permissions, financial truth, or OS operational facts makes AI an unauthorized owner.

### AP-07 — AI Executing Consequential Actions Directly

Treating an AI response or AI Action Proposal as execution authority bypasses human control, deterministic policy, owner validation, and Audit.

### AP-08 — Cross-OS Tight Coupling

Making one OS depend on another OS's availability, internal API, Module, Event stream, or data model for its core workflow violates OS independence.

### AP-09 — Business Logic in UI

Embedding canonical Rules, ownership decisions, Permission policy, lifecycle transitions, or domain invariants only in UI components makes presentation the accidental domain owner.

### AP-10 — Technology-Driven Architecture

Letting a framework, database, broker, cloud product, or deployment topology define permanent domain concepts or contracts violates Business Before Technology.

### AP-11 — Circular Dependencies

Two domains requiring each other's internal models or synchronous mutation to complete their own invariants destroys canonical ownership and independent evolution.

### AP-12 — Long-Lived Mutable Shared Assets

Editing published Knowledge, Rules, Capability definitions, Knowledge Packs, or Marketplace Asset Versions in place destroys reproducibility and history.

### AP-13 — Tenant Copies of Shared Knowledge or Assets

Copying shared platform Knowledge or Marketplace content into Workspace-owned truth duplicates ownership and prevents governed updates.

### AP-14 — Projection as Write Model

Writing canonical state through Product Hub Projection, search, analytics, navigation state, or another read model makes a disposable view authoritative.

### AP-15 — Product-First Recommendations

Recommending an OS, Plan, upgrade, or Marketplace Asset without first stating the business improvement and Capability violates capability-first intelligence.

### AP-16 — Typed or Industry-Specific Workspaces

Creating PharmacyWorkspace, RestaurantWorkspace, or other software- or industry-defined Workspace types collapses Business DNA, Capability, and organization boundaries.

### AP-17 — Product Hub Owning OS Setup or Source Data

Moving OS-specific setup, Marketplace lifecycle, subscription truth, or OS operational state into Product Hub violates its composition boundary.

### AP-18 — Collapsed Lifecycle State

Using one `onboarding_complete`, enabled, active, or ready flag for entitlement, subscription, installation, setup, configuration, activation, and readiness hides owners and recovery states.

### AP-19 — Direct Cross-Domain Writes

Bypassing the canonical owner's command, API, Authorization, invariants, or Audit through table access or internal implementation calls violates contract-first ownership.

### AP-20 — Global Event Ordering or Exactly-Once Assumptions

Designing consumers around global ordering or exactly-once delivery contradicts approved Event principles. Consumers must be idempotent and respect declared local ordering boundaries.

## 9. Future Evolution Rules

### 9.1 Use the ADR process

A future architectural decision begins as a Proposed ADR. It states Context, Decision, Consequences, Alternatives Considered, and Related Documents, uses the next permanent ADR number, and remains non-authoritative until explicitly accepted.

### 9.2 Demonstrate principle conformance

Every Proposed ADR must identify:

- the principles it applies;
- whether it strengthens, constrains, or appears to conflict with them;
- affected canonical owners and contracts;
- tenant, Permission, version, lifecycle, and audit impact;
- migration and backward-compatibility impact;
- deferred decisions that remain unresolved.

### 9.3 Never override silently

If a proposal conflicts with Genesis, work stops until Genesis is changed through its own approved process. If it conflicts with an accepted ADR, the Proposed ADR must explicitly supersede that decision after approval. If it conflicts with this consolidation but not its source, the consolidation is corrected through an authorized documentation change without changing the source decision.

### 9.4 Preserve canonical terminology

New documents and ADRs use the Governance Glossary. An ambiguous concept is reported and reviewed; it is not redefined locally or assigned a convenient synonym.

### 9.5 Prefer compatible extension

New architecture extends existing owners, contracts, versions, and lifecycle states. It does not create parallel ownership, merge distinct states, or require all consumers to migrate without a governed compatibility path.

### 9.6 Keep implementation decisions subordinate

Framework, database, API style, Event infrastructure, AI provider, cloud service, and deployment choices may evolve. They remain subordinate to domain ownership, explicit context, tenant isolation, Permission, immutable history, contract compatibility, and independent Operating Systems.

## 10. References

### Governance

- [ADR Repository](../00-governance/ADR/README.md)
- [Canonical Glossary](../00-governance/glossary/GLOSSARY.md)
- [ADR-001 — Business Operating Intelligence Platform](../00-governance/ADR/ADR-001-business-operating-intelligence-platform.md)
- [ADR-002 — Core Shared Control and Intelligence Plane](../00-governance/ADR/ADR-002-core-shared-control-intelligence-plane.md)
- [ADR-005 — Business-Scoped Business DNA](../00-governance/ADR/ADR-005-business-dna-business-scoped-software-independent.md)
- [ADR-009 — Shared Versioned Immutable Knowledge](../00-governance/ADR/ADR-009-shared-versioned-immutable-knowledge.md)
- [ADR-013 — Capability-First Explainable Recommendations](../00-governance/ADR/ADR-013-capability-first-explainable-recommendations.md)
- [ADR-014 — Human Control](../00-governance/ADR/ADR-014-human-control-over-recommendations-and-ai.md)
- [ADR-020 — Product Hub Is Not a Data Owner](../00-governance/ADR/ADR-020-product-hub-composition-not-data-ownership.md)
- [ADR-024 — Independent OS Domain Ownership](../00-governance/ADR/ADR-024-independent-operating-system-domain-ownership.md)
- [ADR-025 — Optional Contract-Based OS Integration](../00-governance/ADR/ADR-025-contract-based-optional-os-integration.md)
- [ADR-027 — Marketplace Bounded Context](../00-governance/ADR/ADR-027-marketplace-bounded-context-within-core.md)
- [ADR-028 — Shared Marketplace Assets and Scoped State](../00-governance/ADR/ADR-028-immutable-marketplace-assets-scoped-state.md)
- [ADR-029 — AI Downstream of Knowledge, Rules, and Authorization](../00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md)
- [ADR-033 — Enforced Modular Monolith](../00-governance/ADR/ADR-033-enforced-modular-monolith.md)
- [ADR-034 — Explicit Tenant and Resource Scope](../00-governance/ADR/ADR-034-explicit-tenant-and-resource-scope.md)
- [ADR-035 — Technology-Independent Compatible Contracts](../00-governance/ADR/ADR-035-technology-independent-compatible-contracts.md)
- [ADR-036 — Contract-First API Architecture](../00-governance/ADR/ADR-036-contract-first-api-architecture.md)
- [ADR-038 — Append-Only Audit History](../00-governance/ADR/ADR-038-append-only-audit-history.md)
- [ADR-039 — Data-Driven Configurable Platform Assets](../00-governance/ADR/ADR-039-data-driven-configurable-platform-assets.md)

### Genesis

- [Vision](../01-genesis/01-VISION.md)
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

### Approved Proposal

- [Core Platform Architecture Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)

### Wave 1

- [Wave 1 README](README.md)
- [Core Platform Vision](01-CORE-PLATFORM-VISION.md)
- [Core Platform Architecture](02-CORE-PLATFORM-ARCHITECTURE.md)
- [Core Platform Domain Model](03-DOMAIN-MODEL.md)

### Wave 2

- [Data Ownership](04-DATA-OWNERSHIP.md)
- [Permission Model](05-PERMISSION-MODEL.md)
- [Event Architecture](06-EVENT-ARCHITECTURE.md)
