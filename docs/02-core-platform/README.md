# Core Platform Documentation — Milestone 1

Version: 1.0  
Status: Wave 1  
Authority: Genesis v1.1 and the approved Core Platform Architecture Proposal v0.2  
Owner: Nexoraxs

---

## Purpose

This folder contains the Milestone 1 documentation for the Nexoraxs Core Platform.

Wave 1 establishes the Core Platform vision, logical architecture, and conceptual domain model. It expands the approved proposal without changing its decisions, resolving its open questions, or defining implementation details that belong to later waves.

The Core Platform is the shared control, organizational, and intelligence foundation that allows a customer to create a Workspace, describe each Business, receive explainable recommendations, discover suitable implementation options, and govern independent Operating Systems.

## Scope

Wave 1 contains exactly four documents:

| Document | Scope |
|---|---|
| `README.md` | Authority, documentation map, boundaries, ownership, and reading order for Milestone 1. |
| `01-CORE-PLATFORM-VISION.md` | Core Platform purpose, product intent, principles, responsibilities, boundaries, and success conditions. |
| `02-CORE-PLATFORM-ARCHITECTURE.md` | Logical components, architectural flows, API and navigation architecture, bounded contexts, lifecycle coordination, and extension posture. |
| `03-DOMAIN-MODEL.md` | Canonical concepts, relationships, ownership, aggregates, invariants, lifecycle state, and conceptual domain boundaries. |

Wave 1 does not define physical database schemas, endpoint specifications, event catalogs, deployment topology, security controls in implementation detail, UI specifications, or OS domain models. Those remain later documentation or implementation concerns and must preserve this Wave 1 architecture.

## Principles

All documents in this folder follow these rules:

1. Genesis v1.1 is the ultimate architectural authority.
2. The approved Core Platform Architecture Proposal v0.2 is the frozen Core Platform boundary.
3. Business concepts exist independently from software.
4. Every Business owns one separate Business DNA identity.
5. Knowledge, Rules, Capabilities, and published Marketplace asset versions are shared platform assets.
6. Recommendations express business improvements and Capabilities before mapping Operating Systems, plans, or Marketplace assets.
7. Operating Systems remain independent and own their operational domains.
8. Product Hub owns discovery and handoff orchestration, not OS setup or source-domain data.
9. Marketplace is a separate bounded context within the Core Platform offering.
10. AI is downstream of Knowledge, deterministic Rules, authorization, and human control.
11. Core Workspace Ready and Operating System Ready are separate state machines.
12. Architecture contracts are technology-independent, versioned, tenant-safe, and backward-compatible.

## Responsibilities

This documentation set is responsible for:

- defining the permanent logical boundary of the Core Platform;
- showing how Core interprets and implements Genesis concepts;
- preserving canonical terminology across future specifications;
- documenting ownership between Core modules, Marketplace, and Operating Systems;
- describing the Business Architect, Product Hub, AI Coordinator, API, and navigation flows;
- defining the conceptual domain model and its invariants;
- identifying future extension points without implementing them;
- keeping unresolved proposal questions visible rather than deciding them implicitly.

This documentation set is not responsible for changing Genesis, amending the approved proposal, or documenting Commerce OS or any other operational OS.

## Architecture

The Core Platform is the shared control and intelligence plane of Nexoraxs.

```text
Customer Identity
  → Workspace
  → Business
  → Business Architect Pipeline
  → Core Business DNA
  → Business Brain and Recommendation Engine
  → Core Workspace Ready
  → Product Hub
  → OS and Plan Selection
  → OS-Specific Setup
  → Operating System Ready
```

The Core Platform contains logical modules for identity, organization, Business DNA, Knowledge, Capabilities, Rules, intelligence, readiness, Product Hub, product and plan catalog, entitlements, subscriptions, billing, installation coordination, Marketplace, notifications, audit, settings, localization, search, storage coordination, analytics intake, APIs, integrations, and AI coordination.

Initial implementation may remain an enforced modular monolith. Logical ownership, dependency direction, data access, and contracts must remain explicit so a deployment change does not require an architecture change.

## Ownership

### Documentation ownership

- Genesis owns permanent platform intent, ontology, principles, and ecosystem rules.
- The approved proposal owns the frozen Core Platform interpretation and draft ADR set.
- This folder expands those sources for Milestone 1 but cannot override them.
- Later documents may add implementation detail only within these boundaries.

### Platform ownership summary

| Owner | Owns |
|---|---|
| Core Platform | Identity, Workspace, Business, organization registry, Business DNA, Capabilities, Knowledge, Rules, Business Brain, recommendations, shared commercial control, Product Hub, readiness, shared governance, API contracts, navigation coordination, and AI coordination. |
| Marketplace bounded context | Asset catalog, publishers, immutable versions, purchase, installation, activation, applicability, reviews, and asset lifecycle. |
| Each Operating System | Its UI, setup, modules, domain model, operational workflows, operational data, menus, dashboards, reports, settings, and endpoints. |
| Customer | Confirmation and correction of Business facts, acceptance or rejection of recommendations, product and plan selection, and approval of consequential actions. |

## Relationships

### Document reading order

```text
Genesis v1.1
  → Approved Core Platform Architecture Proposal v0.2
  → README.md
  → 01-CORE-PLATFORM-VISION.md
  → 02-CORE-PLATFORM-ARCHITECTURE.md
  → 03-DOMAIN-MODEL.md
```

### Platform relationships

- A Workspace represents one customer account and may own zero or more Businesses; at least one selected Business is required to reach Core Workspace Ready.
- A Business owns one Business DNA identity and one or more Business Units.
- A Business Unit is an operational division and owns Departments and Branches.
- Operating Systems operate on Business Units.
- The Business Brain interprets Business DNA using shared Knowledge and Rules.
- Product Hub presents recommendations and implementation options in selected Business context.
- An OS subscription belongs to the Workspace; operational setup and activation reference the applicable Business and Business Unit context.
- Marketplace content is shared and immutable; purchase and activation are Workspace-scoped, with optional Business applicability.
- All cross-boundary access uses governed contracts rather than shared domain tables.

## Future Extension Points

The architecture permits later documentation and implementation for:

- complete data and persistence architecture;
- API schemas, endpoint catalogs, events, webhooks, and compatibility policy;
- detailed authentication, authorization, tenant isolation, privacy, audit, and security controls;
- Business Architect question, provenance, inference, review, and concurrency policies;
- Knowledge, Rules, Capability, recommendation, and configuration schemas;
- Product Hub projections, installation recovery, and OS handoff contracts;
- Marketplace publishing, partner governance, certification, and settlement;
- AI provider, expert, context, confidence, safety, and action policies;
- localization, navigation contracts, URL conventions, and accessibility;
- multiple Operating Systems, optional cross-OS integrations, and enterprise scale;
- public APIs, SDKs, testing sandboxes, and developer ecosystem capabilities.

These extension points do not authorize architectural redesign. Each must preserve Genesis, the approved proposal, and the ownership defined in Wave 1.

## References to Genesis

All Genesis documents are authoritative. The most direct references for this folder are:

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
- [Business Lifecycle](../01-genesis/15-BUSINESS-LIFECYCLE.md)
- [Operating System Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)
- [Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md)
- [AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

## References to the Approved Proposal

- [Core Platform Architecture Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)

The proposal is frozen. Its ADR-CP-001 through ADR-CP-020 decisions remain the governing Core Platform decisions unless a later approved architecture process explicitly supersedes them.
