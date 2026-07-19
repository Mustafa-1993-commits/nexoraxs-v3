<<<<<<< HEAD
# Product Decision Register

**Status:** Current product decision register
**Register date:** 2026-07-19
**Owner:** Product
**Scope:** Confirmed product direction for the current NexoraXS Core Platform and Commerce delivery horizon

## Purpose and authority

This register records confirmed product-level decisions. It does not replace Accepted ADRs,
architecture freezes, the Constitution, or owner-domain specifications. Product decisions establish
experience direction and delivery sequence; architecture sources continue to define canonical
ownership, boundaries, lifecycles, security constraints, and contract rules.

The date on each entry is the date the decision was recorded in this register. It does not imply
that an architecture source was approved or amended on that date.

## Decision summary

| ID | Title | Status | Date |
|---|---|---|---|
| PD-001 | Frontend First is the active delivery strategy | Confirmed | 2026-07-19 |
| PD-002 | Customers enter the Platform before an Operating System | Confirmed | 2026-07-19 |
| PD-003 | Business Architect is the primary onboarding experience | Confirmed | 2026-07-19 |
| PD-004 | Business Blueprint is the main onboarding output | Confirmed | 2026-07-19 |
| PD-005 | Recommendations follow business analysis and the Business Blueprint | Confirmed | 2026-07-19 |
| PD-006 | Laravel/backend integration follows frontend maturity | Confirmed | 2026-07-19 |
| PD-007 | Global localization and RTL/LTR are product requirements | Confirmed | 2026-07-19 |
| PD-008 | Delivery uses incremental reconciliation, not a rewrite | Confirmed | 2026-07-19 |
| PD-009 | Core Platform and Commerce separation is established | Confirmed | 2026-07-19 |
| PD-010 | EasyCar is outside the current product scope | Confirmed | 2026-07-19 |

## PD-001 — Frontend First is the active delivery strategy

- **Status:** Confirmed
- **Date:** 2026-07-19
- **Context:** The current repository is a frontend-first monorepo with deterministic browser
  compatibility clients. The active policy uses frontend behavior to validate workflow,
  terminology, states, localization, accessibility, and owner-facing client seams before
  feature-specific backend implementation.
- **Decision:** User-facing Core Platform and Commerce features mature through approved UX,
  deterministic frontend behavior, validation, and UI Freeze before their backend integration is
  implemented.
- **Implications:** Frontend slices must cover primary, loading, empty, error, unauthorized,
  recovery, and success behavior; Arabic/RTL and English/LTR; accessibility; stable page-facing
  boundaries; and explicit ownership. Frontend state remains temporary and must not be presented
  as production authorization or canonical truth.
- **Exclusions:** This decision does not authorize frontend ownership of canonical facts, resolve
  Deferred Decisions, define backend contracts, or delay urgent security and data-integrity work
  covered by the policy exceptions.
- **Related architecture references:** [Frontend-First Policy](../11-execution/05-FRONTEND-FIRST-POLICY.md),
  [Mock Data Standard](../11-execution/06-MOCK-DATA-STANDARD.md),
  [Engineering Roadmap](../11-execution/12-ENGINEERING-ROADMAP.md), and
  [ADR-035](./ADR/ADR-035-technology-independent-compatible-contracts.md).

## PD-002 — Customers enter the Platform before an Operating System

- **Status:** Confirmed
- **Date:** 2026-07-19
- **Context:** NexoraXS is a platform with a shared Core and independent Operating Systems. Core
  owns platform identity, Workspace and organization context, memberships, commercial context,
  Business understanding, recommendations, Product Hub, and approved read-only projections.
- **Decision:** A customer enters through Landing and the Core Platform, completes the applicable
  platform onboarding, reaches the Platform Dashboard and Product Hub, and launches Commerce only
  when Commerce access and readiness allow it.
- **Implications:** Authentication, Workspace creation, Business Architect, Business Blueprint,
  recommendations, platform setup, Dashboard, and Product Hub are Core experiences. An Operating
  System is never the customer's first canonical account or tenant boundary.
- **Exclusions:** This decision does not make Product Hub the owner of Commerce setup or
  operational data, and it does not collapse entitlement, subscription, installation, setup,
  activation, readiness, or access.
- **Related architecture references:** [ADR-002](./ADR/ADR-002-core-shared-control-intelligence-plane.md),
  [ADR-018](./ADR/ADR-018-separate-core-and-os-readiness.md),
  [ADR-019](./ADR/ADR-019-product-hub-discovery-and-os-handoff.md),
  [ADR-020](./ADR/ADR-020-product-hub-composition-not-data-ownership.md), and
  [Core Platform Architecture, Navigation Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md#8-navigation-architecture).

## PD-003 — Business Architect is the primary onboarding experience

- **Status:** Confirmed
- **Date:** 2026-07-19
- **Context:** The platform promise begins by understanding a selected Business. A long static
  software-configuration form would contradict the infer-before-asking and governed-pipeline
  architecture.
- **Decision:** After Workspace creation and resolution of a selected Business context, the main
  onboarding experience is Business Architect: a guided, conversational, resumable interview that
  asks the minimum useful questions, exposes supporting evidence where relevant, and lets the
  customer review and correct material information.
- **Implications:** The experience must preserve raw answers, inferred candidate information,
  provenance, validation, review, pause/resume, and safe failure/recovery distinctions without
  presenting the UI as an unstructured chatbot or a fixed exhaustive wizard.
- **Exclusions:** This decision does not define a storage schema, backend operation, AI provider,
  materiality threshold, canonical Business migration, or replacement for the current legacy
  `BusinessUnit` compatibility model.
- **Related architecture references:** [ADR-015](./ADR/ADR-015-infer-before-asking-conversational-configuration.md),
  [ADR-016](./ADR/ADR-016-business-architect-governed-pipeline.md),
  [Genesis Customer Journey](../01-genesis/11-CUSTOMER-JOURNEY.md), and
  [Core Platform Architecture, Business Architect Pipeline](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md#3-business-architect-pipeline).

## PD-004 — Business Blueprint is the main onboarding output

- **Status:** Confirmed
- **Date:** 2026-07-19
- **Context:** Customers need a clear, useful result from the Business Architect process before
  being asked to select products or plans. Raw interview answers and internal decision records are
  not an adequate customer-facing outcome.
- **Decision:** The main customer-facing onboarding output is the **Business Blueprint**. It is a
  Core-owned presentation composed from Business DNA, a business summary, identified operational
  needs, challenges, opportunities, readiness indicators, recommended NexoraXS capabilities, and
  an implementation roadmap.
- **Implications:** The Blueprint must be understandable, explainable, reviewable, localizable,
  accessible, and traceable to the analysis that produced it. It is a presentation/projection;
  each underlying fact retains its canonical owner. “Recommended capabilities” describes
  capability fit discovered by analysis, not a forced product or plan choice.
- **Exclusions:** This decision does not rename the technology-independent
  [NexoraXS Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md), create a new canonical
  aggregate, merge Recommendations into Business DNA, or authorize configuration or execution.
- **Related architecture references:** [ADR-005](./ADR/ADR-005-business-dna-business-scoped-software-independent.md),
  [ADR-012](./ADR/ADR-012-business-brain-decision-engine.md),
  [Core Platform Data Ownership](../02-core-platform/04-DATA-OWNERSHIP.md), and
  [Platform Experience](../03-ui-ux/01-PLATFORM-EXPERIENCE.md).

## PD-005 — Recommendations follow business analysis and the Business Blueprint

- **Status:** Confirmed
- **Date:** 2026-07-19
- **Context:** NexoraXS recommendations must arise from reviewed Business understanding and
  deterministic, explainable analysis. They are not a substitute for the Blueprint and must not
  start with software promotion.
- **Decision:** The customer sees the Business Blueprint first. A separate Recommendations stage
  then presents explainable business improvements and capability needs, with Operating Systems,
  plans, or Marketplace assets shown only as optional implementation options.
- **Implications:** Recommendations must identify evidence, rationale, assumptions, alternatives,
  risk, confidence, and expected benefit; customers remain free to accept, reject, defer, or
  continue with access they already have.
- **Exclusions:** This decision does not let the Blueprint create Recommendation lifecycle state,
  make recommendations mandatory, or allow AI to bypass deterministic Decisions, authorization,
  human review, or owner validation.
- **Related architecture references:** [ADR-012](./ADR/ADR-012-business-brain-decision-engine.md),
  [ADR-013](./ADR/ADR-013-capability-first-explainable-recommendations.md),
  [ADR-014](./ADR/ADR-014-human-control-over-recommendations-and-ai.md), and
  [Genesis Recommendation Engine](../01-genesis/07-RECOMMENDATION-ENGINE.md).

## PD-006 — Laravel/backend integration follows frontend maturity

- **Status:** Confirmed
- **Date:** 2026-07-19
- **Context:** The repository currently validates product behavior through frontend clients and
  browser compatibility stores. Implementing feature-specific Laravel behavior before the UI and
  owner-facing contract stabilize would harden unvalidated behavior.
- **Decision:** Laravel/backend integration begins only after the applicable frontend vertical
  slice satisfies the documented maturity and UI Freeze gates. Integration proceeds per approved
  slice, not as one final big-bang backend phase.
- **Implications:** A mature frontend slice becomes the input to later API/integration planning,
  owner-side validation, server authorization, durability, audit, observability, parity testing,
  migration, and reversible cutover.
- **Exclusions:** This product sequence does not itself approve a backend contract, DTO, database
  schema, endpoint, queue, infrastructure topology, or Deferred Decision. It does not block urgent
  non-feature security or data-integrity work.
- **Related architecture references:** [Frontend-First Policy, Backend Integration Later](../11-execution/05-FRONTEND-FIRST-POLICY.md#9-backend-integration-later),
  [Engineering Roadmap, Backend Integration](../11-execution/12-ENGINEERING-ROADMAP.md#10-cross-cutting-phase--backend-integration),
  and [ADR-036](./ADR/ADR-036-contract-first-api-architecture.md).

## PD-007 — Global localization and RTL/LTR are product requirements

- **Status:** Confirmed
- **Date:** 2026-07-19
- **Context:** NexoraXS is intended for global use. Arabic and English are first-class launch
  languages, and user-facing experiences must be designed for locale-aware representation and
  both reading directions from their first implementation.
- **Decision:** Every current and future user-facing slice must provide a translation path,
  English/LTR and Arabic/RTL behavior, logical-direction layout, locale-aware presentation where
  policy is approved, and accessible interaction in both directions.
- **Implications:** Localization and accessibility are acceptance criteria, not later polish.
  User-entered Business data remains as entered unless a governed translation workflow exists.
- **Exclusions:** This decision does not mark proposed ADR-041 as Accepted, decide unresolved
  preference precedence or persistence, or let presentation context alter authorization,
  canonical facts, money, time, document meaning, or ownership.
- **Related architecture references:** [Global Platform Freeze](../99-architecture-freeze/GLOBAL-PLATFORM-v1.0-FREEZE.md),
  [Core Platform Domain Model, Settings and Localization Context](../02-core-platform/03-DOMAIN-MODEL.md#10-shared-service-domain-concepts),
  [proposed ADR-041](./ADR/ADR-041-global-localization-internationalized-representation.md), and
  [Frontend-First Policy, Frontend Maturity](../11-execution/05-FRONTEND-FIRST-POLICY.md#5-frontend-maturity).

## PD-008 — Delivery uses incremental reconciliation, not a rewrite

- **Status:** Confirmed
- **Date:** 2026-07-19
- **Context:** The repository already contains working, tested Landing, Core Platform, and Commerce
  frontend journeys. The implementation audit found that owner boundaries can be strengthened
  behind existing routes and page-facing seams.
- **Decision:** Preserve working routes, visible behavior, compatibility keys, and validated
  vertical slices while reconciling the implementation incrementally. A repository-wide rewrite
  is not the delivery strategy.
- **Implications:** Every implementation slice must be bounded, independently testable,
  compatibility-aware, and reversible. Legacy behavior is removed only after replacement and
  consumer evidence exists.
- **Exclusions:** Incremental delivery does not make legacy concepts canonical, permit permanent
  compatibility debt, or prevent a separately approved breaking migration when evidence requires
  it.
- **Related architecture references:** [Frontend Code Reconciliation Audit](../08-implementation-audit/FRONTEND-CODE-RECONCILIATION-AUDIT-v1.0.md),
  [Refactoring Standard](../11-execution/07-REFACTORING-STANDARD.md), and
  [Feature 054 implementation evidence](../../specs/054-architecture-hardening/implementation-evidence.md).

## PD-009 — Core Platform and Commerce separation is established

- **Status:** Confirmed
- **Date:** 2026-07-19
- **Context:** The frozen architecture assigns platform identity and control to Core and Commerce
  operational behavior to Commerce. Feature 054 implemented and verified the current frontend
  boundary through read-only projections, explicit handoff values, zero Core Commerce writers,
  zero Commerce Core-identity fallback writers, and cross-app import enforcement.
- **Decision:** Core Platform and Commerce are separate applications and domain owners. Core owns
  platform identity, Workspace and organization context, OS subscription context, memberships,
  authorization context, and approved read-only projections. Commerce owns Commerce setup,
  operational behavior, UI, and persistence. This separation is an established baseline, not an
  open product question.
- **Implications:** New experience work must preserve app-owned routes and communicate only through
  approved projections, navigation handoffs, or governed contracts. Product documentation must
  distinguish Core Workspace setup from Commerce OS setup.
- **Exclusions:** This decision does not approve the current browser compatibility handoff as a
  production contract, reopen the separation decision, or transfer Commerce operational facts to
  Product Hub, Core, shared packages, or the Business Blueprint.
- **Related architecture references:** [ADR-024](./ADR/ADR-024-independent-operating-system-domain-ownership.md),
  [ADR-025](./ADR/ADR-025-contract-based-optional-os-integration.md),
  [ADR-040](./ADR/ADR-040-core-organization-identity-os-operational-data.md),
  [Core Platform Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md),
  [Commerce OS Freeze](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md), and
  [Feature 054 implementation evidence](../../specs/054-architecture-hardening/implementation-evidence.md).

## PD-010 — EasyCar is outside the current product scope

- **Status:** Confirmed
- **Date:** 2026-07-19
- **Context:** The current implementation horizon is NexoraXS Landing, Core Platform, Commerce OS,
  shared frontend packages, and their later production foundations. EasyCar belongs to a separate
  product and planning process.
- **Decision:** EasyCar is excluded from the current NexoraXS Core Platform and Commerce product
  decisions, experience maps, implementation slices, and delivery roadmap.
- **Implications:** Current documents and specifications do not create EasyCar entities,
  workflows, roles, tenant types, modules, routes, APIs, or dependencies.
- **Exclusions:** This scope guard makes no decision about EasyCar's future architecture or product
  behavior and does not prevent a separately governed program from being proposed later.
- **Related architecture references:** [Execution Scope Decision](../90-architecture-audit/15-EXECUTION-SCOPE-DECISION.md).

## Verified Against

This register was verified against:

- `docs/00-governance/ADR/`, especially ADR-001 through ADR-005, ADR-012 through ADR-020,
  ADR-023 through ADR-025, ADR-035 through ADR-037, ADR-040, and proposed ADR-041;
- `docs/01-genesis/03-BUSINESS-DNA.md`, `07-RECOMMENDATION-ENGINE.md`,
  `09-PLATFORM-BLUEPRINT.md`, `11-CUSTOMER-JOURNEY.md`, `12-WORKSPACE-LIFECYCLE.md`, and
  `14-SUBSCRIPTION-MODEL.md`;
- `docs/02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md`, `03-DOMAIN-MODEL.md`,
  `04-DATA-OWNERSHIP.md`, `05-PERMISSION-MODEL.md`, and `12-CORE-PLATFORM-ROADMAP.md`;
- `docs/08-implementation-audit/FRONTEND-CODE-RECONCILIATION-AUDIT-v1.0.md`;
- `docs/11-execution/05-FRONTEND-FIRST-POLICY.md`, `06-MOCK-DATA-STANDARD.md`,
  `07-REFACTORING-STANDARD.md`, and `12-ENGINEERING-ROADMAP.md`;
- `docs/90-architecture-audit/00-EXECUTIVE-SUMMARY.md`, `04-IMPLEMENTATION-VERIFICATION.md`,
  `05-GAP-ANALYSIS.md`, and `15-EXECUTION-SCOPE-DECISION.md`;
- `specs/052-frontend-repository-foundation/` through
  `specs/055-commerce-order-command-boundary/`; and
- current route and boundary sources under `apps/core-platform/`, `apps/commerce/`,
  `packages/contracts/`, and `packages/sdk/`.
=======
# NexoraXS Product Decisions

**Document Type:** Product governance baseline  
**Status:** Active  
**Scope:** NexoraXS Core Platform and current Operating Systems  
**Last Updated:** 2026-07-19

## 1. Purpose

This document records approved product-direction decisions that must remain stable across design, specification, implementation, review, and future backend integration.

It complements Architecture Decision Records. ADRs govern architectural choices; this file governs the intended product experience and delivery direction.

## 2. Approved Product Decisions

### PD-001 — Frontend First

NexoraXS follows a frontend-first delivery policy.

The user experience, journeys, screens, states, navigation, accessibility, localization behavior, and frontend application boundaries must reach production-level maturity before canonical backend implementation begins.

Frontend First does not mean prototype-only code. The frontend must remain structured so local or in-memory implementations can later be replaced by remote implementations without redesigning pages or user journeys.

### PD-002 — Platform Before Operating System

Users enter and understand the NexoraXS Platform before entering Commerce or another Operating System.

The Core Platform owns the shared product experience, including workspace context, business identity, membership, access, platform navigation, subscription presentation, Product Hub, and cross-product entry.

Operating Systems remain separate product experiences reached through explicit platform navigation and handoff boundaries.

### PD-003 — Business Architect Is the Primary Onboarding Experience

Traditional setup forms alone are not the primary onboarding model.

The Business Architect guides the user through structured discovery, evidence collection, intelligent questions, review, and business analysis before the workspace is considered ready.

The experience must feel like a guided business consultation rather than a technical configuration wizard.

### PD-004 — Business Blueprint Is the Main Onboarding Outcome

The customer-facing outcome of the Business Architect is the **Business Blueprint**.

For product experience purposes:

```text
Business Blueprint =
Business DNA
+ Business Analysis
+ Identified Needs and Risks
+ Recommended NexoraXS Systems
+ Suggested Implementation Roadmap
+ Readiness Summary
```

Business DNA remains the structured internal representation. The Business Blueprint is the understandable, visual, customer-facing presentation of that analysis.

### PD-005 — Recommendations Precede Plan Selection

The platform should understand the business before asking the user to make a final package or product decision.

The preferred sequence is:

```text
Business Discovery
→ Business Blueprint
→ Recommendations
→ Plan or Product Selection
→ Workspace Activation
```

Commercial prompts must not interrupt the discovery experience unnecessarily. Pricing and plan selection should be contextual and supported by the findings of the Business Architect.

### PD-006 — One Coherent Platform Experience

Authentication, onboarding, workspace setup, Business Architect, Product Hub, billing presentation, account settings, notifications, and shared platform navigation must feel like one coherent NexoraXS product.

Individual Operating Systems may have specialized workflows and information architecture, but must retain consistent brand language, navigation principles, accessibility standards, localization behavior, and transition patterns.

### PD-007 — Core Platform and Commerce Boundary Is Established

The separation between Core Platform and Commerce is considered an established implementation baseline, not a new product task.

Core owns platform and organization context. Commerce owns Commerce operational behavior and persistence. Core may consume approved read-only projections and initiate explicit handoffs, but must not become a Commerce operational writer.

Future frontend work must preserve and verify the existing boundary rather than redesign or reimplement it.

### PD-008 — Incremental Reconciliation, Not Rewrite

The existing frontend must not be rewritten solely to achieve architectural purity.

Misaligned legacy areas are corrected incrementally when their flows are actively developed or when they create a material product, reliability, security, or maintainability risk.

Every reconciliation must preserve established user-visible behavior unless a separately approved product change explicitly replaces it.

### PD-009 — Backend Integration Comes After Frontend Maturity

The Laravel backend will be introduced after the relevant frontend journeys, application services, ports, states, and contracts are sufficiently mature.

The intended replacement path is:

```text
Page / Component
→ Feature Hook
→ Application Service
→ Application Port
→ Local or Memory Implementation (current)
→ Remote HTTP Implementation (later)
→ Laravel API
```

Backend integration must not force page-level rewrites or allow UI components to depend directly on transport details.

### PD-010 — Global Localization Is a Product Requirement

NexoraXS is intended to support global languages rather than a fixed Arabic/English-only model.

The product experience must account for:

- language and locale as separate concepts;
- LTR and RTL direction;
- translated navigation, validation, loading, empty, error, retry, pending, and success states;
- user preference, workspace default, browser preference, and platform fallback;
- locale-aware dates, numbers, currency, and formatting;
- layouts that remain usable with longer translated text.

Detailed architecture remains governed by the localization ADR and its approval status, but new UI must not introduce assumptions that block multilingual support.

### PD-011 — Production-Level UI Includes All States

A screen is not complete when only its ideal populated state is designed.

Each applicable screen or flow must define and implement:

- loading;
- empty;
- first-use guidance;
- validation;
- recoverable error and retry;
- unavailable or permission-denied;
- pending or processing;
- success and confirmation;
- responsive behavior;
- keyboard and assistive-technology behavior;
- localized LTR and RTL behavior.

### PD-012 — Small UI Changes May Use a Lightweight Process

The full governed development lifecycle is required for features, business behavior, shared contracts, architecture boundaries, and meaningful workflow changes.

Small visual corrections that do not change behavior, ownership, contracts, routes, persistence, authorization, or workflow may use a lightweight implementation and review path.

A change must move to the full lifecycle whenever its impact is uncertain.

## 3. Current Priority Journey

The current product-experience priority is:

```text
Register
→ Verify Identity or Email
→ Create or Resolve Workspace
→ Business Architect Welcome
→ Business Discovery Interview
→ Review Answers
→ Analysis
→ Business Blueprint
→ Recommendations
→ Platform Dashboard / Product Hub
```

This journey should be documented, mapped to screens, compared with the current frontend, and completed before expanding unrelated product areas.

## 4. Explicitly Deferred Decisions

The following topics are intentionally outside this baseline until separately requested and approved:

- the future product position or architecture of EasyCar;
- canonical Laravel HTTP endpoints and DTOs;
- final backend authorization and transport policies;
- final commercial package names and prices;
- backend synchronization and offline policy;
- redesign of the established Core Platform–Commerce boundary.

Deferred items must not block current product-experience work and must not be decided implicitly by implementation agents.

## 5. Change Control

A product decision in this document may be changed only through an explicit product review.

Any proposed change must state:

1. the decision being replaced;
2. the user or business problem motivating the change;
3. affected journeys and screens;
4. architecture or implementation impact;
5. migration and compatibility impact;
6. the approved replacement decision.

Implementation convenience alone is not sufficient reason to change an approved product decision.
>>>>>>> origin/main
