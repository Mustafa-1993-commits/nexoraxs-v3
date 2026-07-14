# NexoraXS Agent Instructions

> Runtime guidance for AI agents and contributors working in this repository.
>
> This file is subordinate to the frozen architecture and
> `.specify/memory/constitution.md`. It summarizes operating rules; it does not create
> architecture.

## 1. Authority Order

Read the applicable sources before changing code or documentation:

1. `docs/99-architecture-freeze/`
2. `docs/00-governance/`, including Accepted ADRs and the canonical glossary
3. `docs/01-genesis/`
4. approved milestone baselines:
   - `docs/02-core-platform/`
   - `docs/03-business-brain/`
   - `docs/04-commerce-os/`
   - `docs/05-marketplace/`
   - `docs/06-ai-expert-network/`
   - `docs/07-global-platform/`
5. `.specify/memory/constitution.md`
6. this file, feature specs, plans, tasks, and implementation guidance

Historical Proposals, Patches, and Reviews explain provenance. The controlling Freeze determines
the accepted baseline. Files under `docs/archives/` are non-authoritative references.

If two sources conflict:

- cite both exact statements and their authority levels;
- stop work at the affected boundary;
- do not invent a compromise model, owner, lifecycle, or default; and
- route architectural change through Governance.

## 2. Project Identity

NexoraXS is a Business Operating Intelligence Platform composed of a shared Core Platform and
independent Operating Systems. It is not a single application, a POS-only product, or a giant ERP
monolith.

The foundational architecture program is complete and frozen:

- Governance
- Genesis v1.1
- Core Platform Architecture v1.0; Documentation Baseline v1.0.1
- Business Brain Architecture v1.0
- Commerce OS Architecture v1.0
- Marketplace Architecture v1.0
- AI Expert Network Architecture v1.0
- Global Platform Architecture v1.0

Do not reopen these baselines unless a real implementation blocker demonstrates an architectural
conflict. Architecture changes require an ADR, explicit approval, Architecture Review, updated or
successor Freeze, and readiness validation.

## 3. Canonical Organization Model

The organization hierarchy is non-negotiable:

```text
Workspace
  -> Business
    -> Business Unit
      -> Department
      -> Branch
```

Rules:

- Workspace is the customer and tenant boundary.
- Business is a legal or operational organization inside one Workspace.
- Business Unit is an operating division inside one Business.
- Operating Systems operate on Business Units.
- Department and Branch each belong to exactly one Business Unit.
- Business and Business Unit are distinct canonical concepts and MUST NOT be synonyms.
- Business DNA belongs to exactly one Business and never to Workspace, Business Unit, Branch,
  or an Operating System.
- Typed Workspaces such as `RestaurantWorkspace` or `PharmacyWorkspace` are forbidden.

### Legacy implementation warning

Legacy code and earlier specs may use `BusinessUnit` as the storage model behind a user-facing
`Business` label. That mapping conflicts with Accepted ADR-004 when treated as canonical
architecture. Do not silently rename or duplicate production models. Any migration to the frozen
hierarchy requires an explicit feature spec, data migration plan, compatibility plan, and
Constitution Check.

## 4. Core Platform Boundary

Core Platform owns the shared control and intelligence plane, including:

- authentication, Users, sessions, Workspace Membership, and authorization foundations;
- Workspaces, Businesses, and canonical Business Unit, Department, and Branch identities and
  parent relationships;
- Workspace Entitlement, OS Subscriptions, Product and Plan catalog, billing coordination, and
  Product Hub;
- product discovery, access-state composition, setup handoff, launch, and recovery navigation;
- Business DNA, Capability Registry, Knowledge, Rules, Business Brain, Recommendations, and
  configuration coordination;
- Marketplace governance and bounded-context hosting responsibility;
- notifications, Audit, settings, localization, search coordination, storage coordination,
  analytics intake, API governance, and integrations;
- AI Coordinator and shared AI governance.

Core Platform MUST NOT own OS operational facts or workflows such as Commerce Products,
Inventory, Orders, POS Transactions, Payments, Taxes, Invoices, Returns, clinical records, HR
payroll, CRM pipelines, memberships, or repair tickets.

Core Organization Registry owns organization identity. The applicable OS owns operational data,
behavior, configuration, and domain facts scoped to those identifiers.

## 5. Independent Operating Systems

Every Operating System:

- is independently usable for its core workflow;
- owns its UI, setup, navigation, workflows, operational domain model, data, reports, dashboards,
  settings, permission semantics, and release lifecycle;
- uses shared Core services through governed contracts; and
- cannot require another OS for basic operation.

Examples:

- Commerce can sell without HR.
- Healthcare can create prescriptions without Commerce.
- Maintenance can manage tickets without Commerce.
- CRM can manage leads without Commerce.

Commerce OS is the first Operating System and current implementation focus. Pharmacy and
Restaurant/Cafe are Commerce presets or modules, not separate applications. Clinical workflows
remain Healthcare-owned; employee lifecycle remains HR-owned; relationship workflows remain
CRM-owned; full repair-center operations remain Maintenance-owned.

## 6. Canonical Ownership and Data Access

Every canonical fact, write model, aggregate, and lifecycle has one owner.

- Only the owner writes canonical state or validates a requested change through its contract.
- Read models, caches, search indexes, analytics, dashboards, Product Hub compositions,
  Recommendations, and AI context never become sources of truth.
- No OS may access another OS database, tables, ORM models, internal state, or private service.
- Co-deployment in the modular monolith does not permit direct cross-module table access.
- Apps MUST NOT import from another app directly.
- Cross-domain changes use versioned APIs, Events, or authorized contracts.
- Consumers must tolerate absence, pause, failure, upgrade, or removal of optional integrations.

Every tenant-owned record and operation must resolve `workspace_id`. Business, Business Unit,
Department, Branch, OS, actor, resource, and action scope must be included where applicable.
Client-provided IDs are authorization inputs, not proof of access. Tenant isolation is enforced
server-side and at the owning-domain boundary.

## 7. Capability, Knowledge, Business Brain, and AI

The required ordering is:

```text
Business context and Business DNA
  -> Capabilities
  -> Knowledge and deterministic Rules
  -> Business Brain Decision
  -> Recommendation Candidate
  -> Recommendation Engine
  -> optional Implementation Options or Configuration Proposal
  -> target-owner validation and human-authorized execution
```

Rules:

- Business needs and Capabilities precede products, plans, modules, and AI prompts.
- Capabilities are platform-owned; OS Modules may implement them but do not redefine them.
- Published Knowledge, Rules, Capabilities, Marketplace Asset Versions, and other published
  platform assets are versioned and immutable.
- Business Brain owns its deterministic Decisions and advisory outputs, not Business DNA,
  Knowledge, Rules, OS facts, or target execution.
- Recommendations are optional and explainable, with evidence, rationale, assumptions,
  alternatives, risk, confidence, and expected benefit.
- AI is downstream of Knowledge, Rules, completed Decisions, and authorization.
- AI may explain, summarize, suggest, or propose actions; it never owns or silently changes
  canonical Business, permission, financial, or OS facts.
- Consequential action requires human approval and the owning domain's authorization,
  validation, execution, and Audit evidence.

## 8. Commercial and OS Lifecycle Separation

Keep these concepts distinct:

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

An OS Subscription is Workspace-scoped commercial state. It does not grant every user, Business,
Business Unit, or Branch access and does not imply installation, activation, or readiness.
Product Hub composes owner projections and routes to the OS-owned setup experience; it does not
implement OS setup or domain logic.

The exact successor to legacy `OSEnablement` semantics is unresolved by ADR-023. Do not create a
canonical `OSEnablement` aggregate, schema, or state machine from older guidance. A feature that
needs such a model must stop and obtain the applicable approved decision.

## 9. Marketplace and Shared Assets

Marketplace is a bounded context within the Core Platform offering. It owns Marketplace Asset,
Asset Version, publisher, review, certification, trust, compatibility, dependency, licensing,
purchase, entitlement, distribution, installation, activation, applicability, upgrade, and
removal state within its frozen boundary.

Published Marketplace Asset Versions are shared, versioned, and immutable. Workspace and
Business acquisition, installation, activation, applicability, and version selection are scoped
state. Marketplace representation never transfers canonical ownership from an external asset
family owner.

## 10. Contracts and Evolution

- Architecture contracts are technology-independent and versioned.
- Compatible additive evolution is preferred.
- Breaking changes require approved migration, deprecation, and consumer-transition plans.
- Events communicate governed facts and never disguise commands or transfer ownership.
- Boundary operations declare context, authorization, correlation, failure behavior,
  idempotency where repeat submission is possible, and observability.
- Framework types and database schemas are not the only definitions of shared contracts.

Core Platform begins as an enforced modular monolith. Physical service extraction is allowed
only for demonstrated scaling, security, release, or ownership needs and must preserve the same
boundaries through Governance.

## 11. Security, Privacy, Audit, and Observability

Authentication does not imply authorization.

Every affected feature must define and verify:

- least privilege and explicit resource authorization;
- Workspace and applicable organization scope;
- tenant isolation and data minimization;
- secret and sensitive-data handling;
- append-only Audit evidence for consequential actions;
- structured logs, metrics, traces, health, and correlation;
- safe failure, retry, timeout, recovery, and dependency-isolation behavior; and
- telemetry that excludes secrets and unauthorized tenant data.

Owning domains enforce final authorization and invariants even when a gateway or Core boundary
has already authenticated and applied coarse policy.

## 12. Localization and Accessibility

Arabic and English are first-class languages from the first implementation of every user-facing
feature.

- All user-facing strings must have a translation path.
- Arabic uses RTL; English uses LTR.
- Layout uses logical direction rather than left/right assumptions.
- User-entered Business data is stored as entered unless a governed translation workflow exists.
- Critical flows must be keyboard-operable, semantically named, focus-safe, readable, and usable
  with applicable assistive technology.
- Color alone must not convey required meaning.
- Acceptance scenarios and tests must cover the applicable language, direction, and accessibility
  behavior.

## 13. Spec-Driven Development

Meaningful work requires an approved `spec.md`, `plan.md`, and `tasks.md` before implementation.
Every artifact must pass the Constitution Checks defined by
`.specify/memory/constitution.md` and the templates under `.specify/templates/`.

Every spec and plan must identify:

1. controlling Freeze and Accepted ADRs;
2. owning domain and canonical write owner;
3. Workspace and applicable organization/resource scope;
4. OS independence and cross-domain contracts;
5. Capability, Knowledge, Recommendation, Business Brain, and AI boundaries;
6. commercial and operational lifecycle impact;
7. security, privacy, Audit, and observability;
8. Arabic/English, RTL/LTR, and accessibility;
9. compatibility and migration impact;
10. required test evidence; and
11. documentation updates.

A failed Constitution Check stops the affected work. Do not use an assumption or complexity
justification to bypass frozen architecture.

## 14. Testing and Delivery Gates

Tests are not globally optional. Add risk-appropriate evidence for the changed surface:

- unit tests for domain logic and invariants;
- contract tests for owner/consumer boundaries and compatibility;
- integration tests for tenancy, authorization, persistence, Events, and cross-module behavior;
- end-to-end tests for critical user journeys;
- Arabic/English and RTL/LTR verification;
- accessibility verification; and
- Audit and observability verification for consequential flows.

Frameworks, exact coverage thresholds, and CI products remain implementation choices unless an
approved source defines them. Any omitted test category requires an explicit N/A rationale in the
plan. Required lint, type, test, and build checks for the affected project must pass before merge.

## 15. Documentation Synchronization

Implementation, specifications, plans, tasks, contracts, and affected documentation change
together. Code must not silently introduce a new canonical owner, term, lifecycle, permission
scope, contract, or cross-domain dependency.

Do not rewrite historical architecture to conceal a change. Use ADRs, bounded patches, updated
Freezes, and readiness gates as required. Unresolved Deferred Decisions retain their stable IDs
and must not be answered in implementation tasks.

## 16. Repository Structure and Current Implementation

Current repository structure:

```text
apps/landing/          marketing experience
apps/core-platform/    Core Platform frontend
apps/commerce/         Commerce OS frontend
backend/               current API implementation area
packages/ui/           shared presentation components only
packages/sdk/          API clients and fetch helpers only
packages/auth/         shared auth helpers only
packages/types/        shared contract types only
packages/shared/       shared utilities and non-owning helpers
infra/                 current infrastructure configuration
docs/                  governed documentation and archives
.specify/              Spec Kit workflow and constitution
```

`apps/commerce` is the current Commerce OS application. `shops-app` is a deprecated legacy label
and must not be reintroduced. `restaurants-app` is a deprecated separate-app concept.

Current repository technologies include Next.js, React, TypeScript, TailwindCSS, pnpm,
Turborepo, Laravel, PostgreSQL, and Redis. These are implementation choices and do not override
the technology-independent architecture or its Deferred Decisions. A feature plan must verify
that the relevant technology is approved for that implementation scope.

Shared packages must not become ownerless business-logic modules. Runtime code must not import
from archived prototypes or `docs/`.

## 17. Coding Standards

### TypeScript and React

- TypeScript strict mode remains enabled.
- Do not introduce `any` without a documented, reviewed exception.
- Use shared contract types where ownership and compatibility permit.
- Prefer Server Components in Next.js; use client components only when client behavior requires
  them.
- Keep components focused and keep business logic in the owning domain layer.
- Data-driven UI includes loading, empty, error, unauthorized, and recovery states.

### API and data access

- Frontend components use governed SDK/client boundaries rather than hardcoded service URLs.
- Validate all client input server-side.
- Enforce tenant and resource scope server-side.
- Never expose internal database models as the sole public contract.
- Never bypass the owning domain for convenience.

### Git

- Do not commit directly to `main` unless the repository workflow explicitly authorizes it.
- Do not commit `node_modules/`, build outputs, secrets, or local credentials.
- Use scoped, descriptive commit messages.
- Preserve unrelated user changes in a dirty worktree.

## 18. Current Delivery Scope

The current implementation focus is Core Platform plus Commerce OS. Future Operating Systems,
Marketplace executable/plugin sandboxing, broad cross-OS runtime integration, and deferred global
policies are not implicitly authorized by their frozen architecture.

Do not implement a deferred capability merely because its architecture exists. The controlling
feature spec must establish that the required decisions, contracts, security policy, and tests are
approved.

## 19. Final Agent Checklist

Before writing or approving code, answer:

1. Which frozen source and Accepted ADR govern this work?
2. Which domain owns the canonical fact and write?
3. What Workspace, Business, Business Unit, Department, Branch, OS, actor, and resource context
   applies?
4. Does any OS core workflow depend on another OS?
5. Does any code directly access another domain's internal state?
6. Are Capability, Knowledge, Rules, Business Brain, Recommendation, and AI boundaries preserved?
7. Are entitlement, subscription, setup, activation, readiness, and access distinct?
8. Are security, privacy, Audit, and observability testable?
9. Are Arabic/English, RTL/LTR, and accessibility testable?
10. Are contracts backward-compatible and documentation synchronized?
11. Do `spec.md`, `plan.md`, and `tasks.md` pass the Constitution Checks?

If any answer is unclear because architecture is missing or contradictory, stop the affected work
and report the exact sources. Do not invent the answer.

<!-- SPECKIT START -->
## Active Spec Kit Plan

- `specs/050-core-shell-stabilization/plan.md`
<!-- SPECKIT END -->
