# Core Platform Vision

Version: 1.0  
Status: Milestone 1 — Wave 1  
Authority: Genesis v1.1 and the approved Core Platform Architecture Proposal v0.2  
Owner: Nexoraxs

---

## Purpose

This document defines the product and architectural vision of the Nexoraxs Core Platform.

The Core Platform is the shared control, organizational, and intelligence foundation of Nexoraxs. It exists so a customer can establish a trusted organizational context, describe how each Business works, receive explainable advice, select appropriate implementation options, and govern independent Operating Systems without configuring the platform as a collection of disconnected applications.

The Core Platform operationalizes the Nexoraxs promise:

> Describe your business. We'll build its operating system.

The promise does not mean that Core owns every workflow. It means Core understands the Business, governs shared platform concerns, recommends business improvements and Capabilities, and coordinates a safe handoff to independently owned Operating Systems.

## Scope

The vision covers the permanent Core Platform responsibilities required to:

- identify and authenticate customers;
- create and govern Workspaces;
- create and govern Businesses and their organization structure;
- understand one selected Business through the Business Architect Pipeline;
- maintain one separate Business DNA identity for every Business;
- provide shared Capabilities, Knowledge, Rules, and intelligence;
- generate explainable, capability-first recommendations;
- determine Core Workspace Ready;
- guide customers through Product Hub;
- manage Workspace entitlement, OS subscriptions, plans, billing coordination, installation, and activation state;
- govern Marketplace as a separate bounded context within the Core Platform offering;
- provide shared permissions, notifications, audit, settings, localization, search, storage coordination, analytics intake, APIs, and integration contracts;
- coordinate AI Experts through a governed AI Coordinator;
- route customers to OS-specific setup and later back to Core governance surfaces.

### Non-scope

Core Platform does not own:

- operational Commerce, CRM, HR, Healthcare, Accounting, Manufacturing, Fleet, Construction, Projects, or future OS domain workflows;
- OS modules, menus, operational dashboards, domain reports, or operational data;
- OS-specific setup questions or configuration application;
- direct cross-OS database integrations;
- industry-specific applications or typed Workspaces;
- autonomous AI decisions that override customers, permissions, policy, compliance, or domain owners;
- arbitrary third-party execution as part of the initial milestone.

## Principles

### Knowledge before AI

Business Knowledge is the source of platform intelligence. AI may interpret, explain, summarize, or propose, but it cannot invent official rules or replace the Knowledge Engine.

### Business before software

Core first establishes Business identity and Core Business DNA. Recommendations first describe the business improvement and Capability need. Operating Systems, plans, and Marketplace assets appear only as implementation options.

### Capabilities before industries

Industries help describe Business DNA and Knowledge applicability. Capabilities remain the stable, reusable language for what a Business needs. No industry creates a new Core architecture.

### One Business, one Business DNA identity

Every Business owns its own Business DNA. A Workspace may aggregate intelligence across Businesses only through an explicit projection that never merges, replaces, or rewrites the underlying Business DNA identities.

### Infer before asking

The Business Architect should infer reasonable candidate facts from authorized context before asking the customer. Every inference remains traceable, confidence-aware, reviewable, and correctable.

### Explain every recommendation

A recommendation must explain why it exists, what problem it addresses, its expected value, risks, assumptions, alternatives, confidence, required Capabilities, and why any mapped implementation option is appropriate.

### Independent Operating Systems

Each OS functions independently, owns its operational domain, and consumes shared Core services. No OS requires another OS for its core workflow. Optional integration never transfers ownership.

### Human control

Nexoraxs may guide, recommend, and automate within approved policies. Customers decide which recommendations to accept, which products to select, and whether consequential proposals should be executed.

### Data-driven and versioned

Business DNA, Knowledge, Rules, Capabilities, recommendations, configurations, product definitions, and Marketplace assets use explicit version and provenance semantics appropriate to their ownership. Published shared assets are immutable.

### Tenant-safe by construction

Every protected action evaluates identity, Workspace, and all applicable Business, Business Unit, Department, Branch, OS, and resource scopes. Hierarchical membership alone never proves authorization.

### Simplicity with durable boundaries

The customer should experience a natural business journey, not a technical configuration system. Internally, clear ownership and lifecycle boundaries preserve long-term scale.

## Responsibilities

### Establish trust and context

Core authenticates the user, resolves Workspace membership, and presents only authorized Workspace and Business contexts. It maintains the shared organization registry used by Core and independent OSs.

### Understand the Business

The Business Architect Pipeline gathers the minimum Core Business DNA for one selected Business through a resumable, conversational, structured, and governed process. It distinguishes raw answers, normalized facts, inferred candidates, customer confirmation, and published DNA.

### Provide shared intelligence

Core maintains platform Knowledge, deterministic Rules, canonical Capabilities, the Business Brain, Recommendation Engine, Configuration Engine coordination, and Readiness evaluation. Intelligence is explainable and auditable.

### Guide product selection

Product Hub presents prioritized recommendations in selected Business context. It maps recommendations to eligible OS, plan, and Marketplace implementation options, coordinates platform-side lifecycle steps, and routes the customer to the owning OS.

### Govern shared platform services

Core provides identity, authorization, entitlement, subscription, billing coordination, notifications, audit, settings, localization, search, storage coordination, analytics intake, API governance, and AI coordination.

### Preserve product independence

Core maintains stable, versioned contracts. It never gains independence by forcing OSs to share domain tables, and it never achieves a unified experience by absorbing OS behavior.

## Architecture

### Vision flow

```text
Identity
  → Workspace
  → Business
  → Business Architect Pipeline
  → Core Business DNA
  → Knowledge + Rules + Business Brain
  → Explainable Recommendations
  → Core Workspace Ready
  → Product Hub
  → OS and Plan Selection
  → Subscription and Installation
  → OS-Specific Setup
  → Operating System Ready
  → Daily Operations
  → Growth and Expansion
```

### Platform layers

The Core Platform participates in the Genesis intelligence flow:

```text
Business
  → Business DNA
  → Knowledge Engine
  → Rules Engine
  → Business Brain
  → Recommendation Engine
  → Configuration Engine
  → Operating Systems
  → Marketplace
  → AI Expert Network
```

These layers express responsibility and dependency direction. They do not require separate deployments.

### Readiness vision

Core uses two distinct outcomes:

- **Core Workspace Ready:** Workspace creation, Business identity, Core Business DNA, and initial recommendations are complete for the selected Business. Product Hub becomes available.
- **Operating System Ready:** An eligible OS subscription, installation, operational Business Unit, OS-specific setup, configuration, activation, and access are complete. The OS Operational Dashboard becomes available.

The customer may therefore be ready to choose software without yet being ready to operate that software.

### Experience vision

The customer moves through four coherent experiences:

1. **Establish:** authenticate and create or select the Workspace and Business.
2. **Understand:** complete the Business Architect Pipeline and review Core Business DNA.
3. **Decide:** review recommendations and select implementation options in Product Hub.
4. **Operate:** complete setup in the selected OS and begin daily work.

Core remains available afterward for governance, expansion, health, recommendations, subscriptions, Marketplace discovery, and movement between authorized products.

## Ownership

### Core-owned concerns

- User identity, authentication, sessions, and Workspace membership.
- Workspace and Business identities and lifecycle.
- Canonical Business Unit, Department, and Branch identities and relationships.
- Business Architect Pipeline state and Business DNA publication.
- Platform Capabilities, Knowledge, deterministic Rules, and terminology.
- Business Brain, recommendations, configuration proposals, and readiness evaluation.
- Product and plan catalog, Workspace entitlement, OS subscriptions, and shared commercial state.
- Product Hub orchestration and Core-to-OS setup handoff.
- Shared permissions, notifications, audit, settings, localization, APIs, and AI coordination.

### Marketplace-owned concerns

Marketplace is a bounded context within the Core Platform offering. It owns its asset catalog, publisher records, immutable asset versions, purchase, installation, activation, applicability, review, update, deprecation, archive, and removal state. It consumes shared Core identity, authorization, billing, audit, notifications, and tenant context.

### OS-owned concerns

Each OS owns its domain data, setup, configuration application, workflows, modules, menus, dashboards, reports, settings, APIs, releases, and operational lifecycle. Core observes agreed lifecycle projections but does not become the domain owner.

### Customer-owned decisions

Customers confirm or correct Business facts, accept or reject recommendations, select OSs and plans, choose Marketplace assets, review material configuration, and approve consequential actions.

## Relationships

### Organizational relationships

```text
Workspace
  └── Business
      ├── Business DNA
      └── Business Unit
          ├── Department
          └── Branch
```

- One Workspace owns one or more Businesses.
- Every Business belongs to exactly one Workspace.
- Every Business owns one Business DNA identity.
- Every Business Unit belongs to exactly one Business.
- Every Department and Branch belongs to exactly one Business Unit.
- Operating Systems operate on Business Units.

### Intelligence relationships

- Business DNA describes the Business.
- Knowledge provides shared expertise.
- Rules provide deterministic evaluation.
- Business Brain interprets context and produces decision records and recommendation candidates.
- Recommendation Engine prioritizes and explains recommendations.
- Configuration Engine creates versioned proposals for the owning target to validate and apply.
- AI Coordinator provides governed explanation and assistance downstream of these sources.

### Product relationships

- Product Hub presents recommendations and lifecycle projections.
- Product and Plan Catalog owns canonical OS and plan definitions.
- Subscription services own commercial state.
- Installation coordination owns platform-side operation state.
- The selected OS owns setup and operational readiness.
- Marketplace provides optional versioned assets and remains independently bounded.

## Future Extension Points

The vision supports future growth without changing the Core boundary:

- additional Businesses inside a Workspace;
- additional Business Units, Departments, Branches, countries, languages, currencies, and operating contexts;
- independent Commerce, CRM, HR, Healthcare, Accounting, Manufacturing, Fleet, Projects, Construction, and future Operating Systems;
- broader Knowledge, compliance, Capability, automation, dashboard, and workflow coverage;
- governed Marketplace publishers, partners, assets, and commercial models;
- additional AI Experts and model providers behind the AI Coordinator;
- public APIs, SDKs, webhooks, partner integrations, and developer tooling;
- enterprise governance, analytics, storage, search, API, and operational scale;
- physical extraction of logical modules only when measured operational needs justify it.

Future extensions must not create Workspace DNA, OS-owned Business DNA, duplicate Knowledge, direct cross-OS database dependencies, or autonomous AI authority.

## Success Conditions

The Core Platform vision is realized when:

- customers feel understood rather than configured;
- each Business has accurate, reviewable Business DNA;
- recommendations are explainable and measurably relevant;
- customers reach Product Hub with minimal unnecessary questioning;
- OS and plan choices follow Business needs rather than catalog browsing;
- Operating Systems can be added, upgraded, paused, archived, or removed independently;
- platform governance remains consistent across every OS;
- tenant context and permission boundaries remain explicit and safe;
- future products extend the platform without redefining its ontology.

## References to Genesis

- [Nexoraxs Vision](../01-genesis/01-VISION.md)
- [Nexoraxs Constitution](../01-genesis/02-CONSTITUTION.md)
- [Business DNA](../01-genesis/03-BUSINESS-DNA.md)
- [Capabilities Model](../01-genesis/04-CAPABILITIES.md)
- [Knowledge Engine](../01-genesis/05-KNOWLEDGE-ENGINE.md)
- [Business Brain](../01-genesis/06-BUSINESS-BRAIN.md)
- [Recommendation Engine](../01-genesis/07-RECOMMENDATION-ENGINE.md)
- [AI Strategy](../01-genesis/08-AI-STRATEGY.md)
- [Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md)
- [Customer Journey](../01-genesis/11-CUSTOMER-JOURNEY.md)
- [Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md)
- [Product Hub](../01-genesis/13-PRODUCT-HUB.md)
- [Subscription Model](../01-genesis/14-SUBSCRIPTION-MODEL.md)
- [Operating System Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)
- [Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

## References to the Approved Proposal

- [Core Platform Architecture Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- Governing decisions: ADR-CP-001 through ADR-CP-020 in the approved proposal.
