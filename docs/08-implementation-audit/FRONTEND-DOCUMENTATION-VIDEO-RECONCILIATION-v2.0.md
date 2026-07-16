# Frontend, Documentation, and Video Reconciliation Audit v2.0

Version: 2.0  
Status: Review Baseline  
Owner: NexoraXS  
Branch: `audit/frontend-doc-video-reconciliation-v2`

---

# Purpose

This audit reconciles three sources of truth before any structural refactor:

1. the frozen NexoraXS architecture and governance documents;
2. the current frontend implementation in the repository; and
3. the recorded end-to-end product journey supplied by the project owner.

The goal is to preserve working behavior, identify architectural drift, and define a safe implementation sequence that improves the code without breaking the current user journey.

This document does not authorize a rewrite.

---

# Review Scope

## Documentation reviewed

The supplied documentation package includes the current governance, Genesis, Core Platform, Business Brain, Commerce OS, Marketplace, AI Expert Network, Global Platform, Design Intelligence, Execution, Release, and Architecture Freeze baselines.

Primary authority remains:

1. `docs/99-architecture-freeze/`
2. `docs/00-governance/`
3. `docs/01-genesis/`
4. approved milestone baselines
5. `.specify/memory/constitution.md`
6. feature specs, plans, tasks, and implementation guidance

## Repository reviewed

Primary implementation areas:

- `apps/landing/`
- `apps/core-platform/`
- `apps/commerce/`
- `packages/shared/`
- `packages/ui/`
- `tests/e2e/`
- `specs/042-*` through `specs/050-*`
- `AGENTS.md`
- existing implementation audit material

## Video journey reviewed

The recorded journey demonstrates the current user-facing path across Landing, authentication, workspace creation, business setup, branch setup, Product Hub, Commerce setup, Commerce dashboard, products, inventory, customers, settings, and session recovery.

---

# Executive Finding

The implementation is structurally viable and should not be rewritten.

The current product already has a valuable working frontend prototype and a coherent user journey. The main issue is not visual quality or route completeness. The main issue is boundary drift between the frozen architecture and the mock implementation.

The correct strategy is:

```text
Preserve current UX
  -> characterize current behavior
  -> introduce compatibility seams
  -> separate Core and Commerce ownership
  -> migrate legacy organization semantics
  -> add deterministic Business Advisor behavior
  -> define backend contracts
  -> replace mock persistence incrementally
```

---

# Current Product Journey

The video and current frontend together establish the following baseline journey:

```text
Landing
  -> Register / Login
  -> Welcome and language selection
  -> Create Workspace
  -> Create or select Business
  -> Create Branch
  -> Product Hub
  -> Select Commerce OS and plan
  -> Commerce setup
  -> Commerce dashboard
  -> Products / Inventory / Orders / Customers / Reports / Settings
  -> Logout and login recovery
```

This journey must be protected before any model or provider refactor.

---

# Reconciliation Matrix

## 1. Application separation

**Frozen requirement**

NexoraXS is one platform composed of a shared Core Platform and independent Operating Systems. Applications must not import another application directly. Cross-domain behavior uses contracts, projections, APIs, or events.

**Current implementation**

The monorepo already separates:

- Landing
- Core Platform
- Commerce OS

**Video evidence**

The user visibly moves from the public site into Core Platform and then launches Commerce as a distinct product experience.

**Decision**

`KEEP`

**Required improvement**

Preserve the app boundaries and replace direct or implicit cross-app state coupling with explicit client and handoff contracts.

**Risk if changed incorrectly**

High. Combining the applications would destroy the intended independent-OS architecture.

---

## 2. Core shell and navigation

**Frozen requirement**

Core owns Product Hub, platform context, account-level navigation, launch handoff, and recovery navigation. Each OS owns its own shell, navigation, and operational workflows.

**Current implementation**

Core and Commerce already have separate shells and providers. Feature 050 stabilized the Core shell and presentation behavior.

**Video evidence**

Navigation is understandable and visually consistent. Product launch and return paths are usable.

**Decision**

`KEEP AND HARDEN`

**Required improvement**

Do not redesign the shell now. Add characterization tests for shell state, workspace switching, business context, language direction, and return navigation.

---

## 3. Workspace, Business, Business Unit, and Branch

**Frozen requirement**

The canonical hierarchy is:

```text
Workspace
  -> Business
    -> Business Unit
      -> Department
      -> Branch
```

Business DNA belongs to Business. Operating Systems operate on Business Units. Branch belongs to exactly one Business Unit.

**Current implementation**

Legacy frontend and mock contracts use `BusinessUnit` in places where the user-facing label and behavior represent a Business. Earlier specs and local-storage records reflect that legacy interpretation.

**Video evidence**

The user creates a workspace, then creates what is presented as a business, then creates a branch. Business Unit is not yet a clear separate user concept.

**Decision**

`RECONCILE WITH COMPATIBILITY`

**Required improvement**

Create a dedicated feature specification for canonical organization reconciliation. Do not perform a global rename. Preserve legacy identifiers and storage records through an adapter and migration layer.

**Minimum compatibility requirements**

- existing workspace IDs remain valid;
- existing legacy business-unit IDs remain readable;
- current onboarding routes continue to work;
- branch relations are migrated without orphaning data;
- user-facing labels remain stable during the transition;
- no duplicate canonical Business and legacy BusinessUnit records are created silently.

**Risk**

Critical if performed as a simple rename.

---

## 4. Business DNA and onboarding intelligence

**Frozen requirement**

Business context and Business DNA must precede capabilities, products, plans, recommendations, and AI. Onboarding should infer before asking and should feel conversational rather than technical.

**Current implementation**

The current flow captures basic business setup data and uses predefined choices and setup state. It does not yet implement a canonical Business DNA profile or explainable recommendation pipeline.

**Video evidence**

The flow is clear but behaves primarily as a guided wizard. It does not yet explain why a plan, OS, capability, or configuration is recommended.

**Decision**

`IMPROVE IN A SEPARATE MVP`

**Required improvement**

Add a deterministic Business Advisor MVP after compatibility stabilization:

```text
Business Profile
  -> dynamic questions
  -> deterministic rules
  -> capability candidates
  -> OS recommendation
  -> plan recommendation
  -> configuration proposal
  -> user approval
  -> OS-owned setup
```

Generative AI must not be the source of the first implementation.

---

## 5. Core Platform ownership

**Frozen requirement**

Core owns platform identity, workspace and organization identities, memberships, subscriptions, Product Hub, intelligence coordination, notifications, audit, and shared governance.

Core must not own Commerce Products, Orders, Inventory, POS, Payments, Invoices, Returns, or Commerce operational workflows.

**Current implementation**

The Core mock provider exposes or coordinates some Commerce-shaped records and actions to support the prototype journey.

**Video evidence**

Core successfully prepares and launches Commerce, but the user cannot see the hidden ownership overlap.

**Decision**

`RECONCILE BEHIND THE CURRENT UI`

**Required improvement**

Introduce explicit boundaries without changing pages:

```text
CorePlatformClient
CoreOrganizationClient
ProductHubProjectionClient
CommerceHandoffClient
```

Core may compose Commerce readiness and summaries, but it must not become the source of truth for Commerce operations.

---

## 6. Commerce OS ownership

**Frozen requirement**

Commerce owns its operational model, including catalog, products, pricing, sales, purchasing, inventory, orders, POS, returns, reports, and Commerce settings.

Commerce must reference Core organization identities and cannot redefine Workspace, Business, Business Unit, Branch, User, or Subscription.

**Current implementation**

Commerce has a substantial UI and mock operational model, but its provider also participates in some platform-level setup and identity behavior.

**Video evidence**

Commerce is already useful as an independent operational surface.

**Decision**

`KEEP DOMAIN UI; SEPARATE PLATFORM WRITES`

**Required improvement**

Move platform writes behind Core contracts. Commerce should receive authorized context and write only Commerce-owned state.

---

## 7. Subscription, installation, setup, activation, and readiness

**Frozen requirement**

The following are distinct concepts:

- Workspace Entitlement
- OS Product availability
- Plan
- OS Subscription
- installation
- OS-specific setup
- configuration
- activation
- Operating System Ready
- operational access
- pause, archive, and removal

An OS Subscription does not automatically imply installation, activation, readiness, or user access.

**Current implementation**

The prototype compresses parts of plan selection, setup, enablement, and launch into a simplified journey.

**Video evidence**

The user chooses Commerce and proceeds quickly into setup and an operational dashboard, which is effective for demonstration but not yet a complete commercial lifecycle model.

**Decision**

`RECONCILE; DO NOT INVENT OSEnablement`

**Required improvement**

Use a compatibility projection for the current UI. Do not create a new canonical `OSEnablement` aggregate until the unresolved architecture boundary is approved through Governance.

---

## 8. Product Hub

**Frozen requirement**

Product Hub owns discovery, access-state composition, setup handoff, launch, and recovery navigation. It does not own OS setup or OS domain logic.

**Current implementation**

Product Hub already functions as the central product selection and launch surface.

**Video evidence**

The Product Hub concept is understandable and supports the multi-OS direction.

**Decision**

`KEEP`

**Required improvement**

Replace direct assumptions with a composed read model containing independently sourced states:

- product availability;
- entitlement;
- subscription;
- installation/setup status;
- readiness;
- access decision;
- launch destination;
- recovery action.

---

## 9. Core-to-Commerce handoff

**Frozen requirement**

Cross-domain launch and setup use governed contracts. URL values and client-provided identifiers are inputs, not proof of authorization.

**Current implementation**

The prototype passes context through browser state, routes, query parameters, and shared mock persistence.

**Video evidence**

The transition works smoothly from the user's perspective.

**Decision**

`KEEP USER EXPERIENCE; REPLACE AUTHORITY MECHANISM`

**Required improvement**

Define a versioned setup and launch handoff contract. The frontend may initially mock it, but the contract must include:

- workspace context;
- business and business-unit context where applicable;
- selected product and plan reference;
- correlation ID;
- expiration;
- expected destination;
- authorization outcome;
- recovery behavior;
- idempotency behavior for repeated setup submission.

---

## 10. Mock database and local persistence

**Frozen requirement**

Mock data is allowed during frontend-first execution, but must obey ownership, tenant scope, contracts, and migration discipline.

**Current implementation**

Shared mock schema and application providers support the working end-to-end experience through browser persistence.

**Video evidence**

Created products, customers, branch context, and setup state remain available during the recorded session.

**Decision**

`KEEP TEMPORARILY AND FREEZE`

**Required improvement**

Before changing schemas, document:

- storage keys;
- schema version;
- default seed records;
- ID formats;
- relationship assumptions;
- recovery/reset behavior;
- app ownership of each collection;
- migration behavior from prior schema versions.

No storage key or shape may change without a compatibility migration and tests.

---

## 11. Commerce dashboard and empty states

**Frozen requirement**

Each OS owns its dashboard and must provide context-aware, accessible, localized operational value.

**Current implementation**

Commerce dashboard and setup-readiness surfaces are implemented. Some dashboard sections are sparse before operational data exists.

**Video evidence**

The dashboard looks coherent, but setup guidance and daily operations compete for attention and empty data leaves large low-value areas.

**Decision**

`IMPROVE AFTER BASELINE TESTS`

**Required improvement**

Separate:

- setup and readiness guidance;
- first-value actions;
- daily operational KPIs;
- recommendations;
- empty-state education.

Do not redesign before characterization tests exist.

---

## 12. Product, inventory, customer, and settings screens

**Frozen requirement**

Commerce owns these screens and their operational state.

**Current implementation**

The prototype includes working product creation, inventory-related configuration, customer creation, and Commerce settings.

**Video evidence**

These screens represent real implementation value and should be protected.

**Decision**

`KEEP AND CHARACTERIZE`

**Required improvement**

Create E2E coverage for:

- create product;
- product validation;
- inventory defaults;
- create customer;
- branch context persistence;
- Commerce settings persistence;
- refresh and session recovery.

---

## 13. Localization and accessibility

**Frozen requirement**

Arabic and English are first-class languages. Arabic is RTL, English is LTR, and layouts must use logical direction. Accessibility is required from the first implementation.

**Current implementation**

Localization foundations exist, and Feature 050 includes presentation stabilization. Full recorded Arabic and keyboard/accessibility validation is not yet evidenced across the complete journey.

**Decision**

`RETAIN FOUNDATION; COMPLETE VALIDATION`

**Required improvement**

Add a release gate for:

- full English journey;
- full Arabic RTL journey;
- keyboard navigation;
- focus visibility;
- screen-reader labels;
- color contrast;
- responsive layouts;
- Windows browser validation.

---

## 14. Business Brain, recommendations, and AI

**Frozen requirement**

The required order is:

```text
Business context and Business DNA
  -> Capabilities
  -> Knowledge and deterministic Rules
  -> Business Brain Decision
  -> Recommendation Candidate
  -> Recommendation Engine
  -> optional implementation options or configuration proposal
  -> target-owner validation and human-authorized execution
```

AI is downstream and cannot silently change canonical facts.

**Current implementation**

The architecture is documented, but the current application does not yet implement the full pipeline.

**Video evidence**

No true explainable Business Advisor is yet visible.

**Decision**

`DEFER AI; IMPLEMENT DETERMINISTIC ADVISOR FIRST`

---

# Protected Existing Behaviors

The following behaviors become compatibility commitments for the first reconciliation feature:

1. Landing can route users to authentication.
2. Registration and login complete successfully.
3. A new user can create a Workspace.
4. The user can create the current legacy business representation.
5. The user can create a Branch.
6. Product Hub displays Commerce state.
7. The user can select Commerce and a plan.
8. Commerce setup can be completed.
9. Commerce launches into its dashboard.
10. Product creation works.
11. Customer creation works.
12. Branch and business context survive navigation.
13. Settings survive refresh where currently expected.
14. Logout and login recovery work.
15. Existing local mock data remains readable after compatible changes.

---

# Change Classification

## Keep

- monorepo application separation;
- Landing, Core, and Commerce product surfaces;
- current visual shell direction;
- Product Hub concept;
- Commerce operational screens;
- frontend-first and mock-first development workflow;
- pnpm, Turborepo, and Playwright foundations.

## Improve

- empty states;
- context display;
- localization validation;
- accessibility validation;
- Product Hub access-state projection;
- setup explanations;
- recommendation rationale;
- test coverage.

## Reconcile

- Business versus legacy BusinessUnit semantics;
- Core and Commerce write ownership;
- subscription versus setup and readiness;
- Core-to-Commerce handoff;
- shared mock schema ownership;
- canonical platform and OS contracts.

## Defer

- generative AI decision-making;
- backend replacement;
- Marketplace implementation;
- additional Operating Systems;
- service extraction;
- large visual redesign;
- destructive data migration.

---

# Safe Execution Sequence

## Phase 1 — Characterization and Compatibility Baseline

Create automated tests and evidence for all protected current behaviors.

No domain rename, provider split, or storage migration is allowed in this phase.

## Phase 2 — Contract Seams

Introduce explicit interfaces around current providers without changing the UI:

- Core organization client;
- Product Hub projection client;
- Commerce domain client;
- Commerce handoff client;
- mock persistence adapter.

## Phase 3 — Ownership Separation

Move Commerce canonical operations behind the Commerce client and platform writes behind Core clients.

Maintain compatibility facades until all consumers migrate.

## Phase 4 — Organization Model Reconciliation

Introduce canonical Business and Business Unit behavior using a documented migration and compatibility strategy.

## Phase 5 — Commercial Lifecycle Reconciliation

Separate subscription, setup, readiness, access, pause, and recovery projections without inventing unresolved canonical aggregates.

## Phase 6 — Business Advisor MVP

Implement deterministic Business DNA questions, capability selection, explainable recommendations, and configuration proposals.

## Phase 7 — Backend Contract Baseline

Freeze API contracts before replacing mock persistence with Laravel and PostgreSQL.

---

# Proposed First Feature Specification

Recommended feature name:

```text
051-characterization-compatibility-baseline
```

If `051` is already reserved in the active Spec Kit sequence, use the next available feature number.

## Feature objective

Protect the current product journey and document the compatibility surface before architectural reconciliation.

## Required deliverables

- route inventory;
- provider API inventory;
- shared mock-schema inventory;
- local-storage key inventory;
- ID and relationship inventory;
- E2E characterization tests;
- compatibility contract document;
- known architectural debt register;
- no-behavior-change validation report.

## Explicit non-goals

- no Business/BusinessUnit migration;
- no provider ownership migration;
- no backend;
- no UI redesign;
- no new OS;
- no AI;
- no destructive storage changes.

---

# Acceptance Criteria for the First Feature

1. All protected behaviors are represented by automated tests or explicit manual evidence.
2. Existing tests remain green.
3. Current mock records remain readable.
4. No current route is removed.
5. No user-facing journey changes without approved evidence.
6. Core and Commerce provider APIs are inventoried.
7. Every shared collection has a documented current owner and intended canonical owner.
8. Legacy organization-model debt is documented but not silently changed.
9. The feature produces a safe starting point for the next reconciliation spec.

---

# Risk Register

| Risk | Severity | Mitigation |
|---|---|---|
| Global rename of BusinessUnit | Critical | Dedicated migration spec and compatibility adapter |
| Changing local-storage keys | Critical | Schema versioning and migration tests |
| Moving provider methods in one step | High | Facades, contract seams, and incremental consumer migration |
| Treating subscription as readiness | High | Composed lifecycle read model |
| Direct Core-to-Commerce writes | High | Versioned handoff and owning-domain clients |
| UI redesign during refactor | High | Freeze presentation until characterization passes |
| AI introduced before rules | High | Deterministic Business Advisor MVP first |
| Shared mock DB becomes permanent architecture | Medium | Ownership inventory and backend contract baseline |
| Incomplete RTL/accessibility evidence | Medium | Release validation matrix |

---

# Final Decision

NexoraXS should continue from the current implementation.

The existing frontend is not throwaway work. It is the presentation and journey baseline that the frozen architecture must be reconciled with.

The next action is not a rewrite and not a new feature surface.

The next action is a Characterization and Compatibility Baseline that makes the current behavior safe to refactor.
