# Architecture Decision Register


> **Execution Scope Decision — 2026-07-18**
> EasyCar is a separate standalone application and is excluded from the current NexoraXS Core + Commerce execution plan.
> No EasyCar feature, dependency, milestone, sprint, backlog item, release gate, or implementation task is authorized by this document set.
> EasyCar will have its own repository/application architecture, audit, roadmap, specifications, backlog, and release plan.

## Execution Scope Decision — EasyCar Independence

- **Status:** Accepted
- **Decision:** EasyCar is a standalone application and is excluded from the current NexoraXS Core + Commerce implementation roadmap.
- **Consequence:** F088, F089, and F090 are withdrawn from this program. No current migration wave, backlog, sprint, milestone, or release may include EasyCar work.
- **Boundary:** Any reuse of shared identity, tenancy, authorization, entitlement, audit, file, notification, UI, or contract packages must occur through explicit stable interfaces.
- **Next step:** Create a separate EasyCar architecture and delivery program when work on that application begins.
- **Authority:** User/product-owner decision dated 2026-07-18.


## 1. Purpose

This Stage 4 register translates verified findings into proposed target decisions. It is a
planning artifact, not an Accepted ADR and not evidence of business or Governance approval.
Existing Accepted ADRs and Freezes remain controlling. Any row that resolves a registered
Deferred Decision takes effect only after the ADR process in
`docs/11-execution/09-DOCUMENTATION-POLICY.md` §5.

Evidence shorthand:

- **S1:** `00-EXECUTIVE-SUMMARY.md` and `01-REPOSITORY-STATE.md`.
- **S2:** `02-DOCUMENTATION-INVENTORY.md` and `03-DOCUMENTATION-AUDIT.md`.
- **S3:** `04-IMPLEMENTATION-VERIFICATION.md` and `05-GAP-ANALYSIS.md`.
- **Freeze/ADR:** `docs/99-architecture-freeze/` and `docs/00-governance/ADR/`.

### 1.1 Evidence path index

Every Detailed Decision's **Evidence** line uses the following exact source families. An ADR ID
denotes the uniquely matching filename beginning with that ID in
`docs/00-governance/ADR/` (for example ADR-034 is
`docs/00-governance/ADR/ADR-034-explicit-tenant-and-resource-scope.md`).

| Evidence family | Exact repository path(s) |
|---|---|
| Authority/governance | `docs/99-architecture-freeze/NEXORAXS-ARCHITECTURE-v1.x-COMPLETE.md`; `docs/00-governance/ADR/`; `docs/00-governance/glossary/GLOSSARY.md`; `.specify/memory/constitution.md`; `AGENTS.md` |
| Core architecture | `docs/99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md`; `docs/02-core-platform/03-DOMAIN-MODEL.md`; `docs/02-core-platform/05-PERMISSION-MODEL.md`; `docs/02-core-platform/07-API-PHILOSOPHY.md`; `docs/02-core-platform/08-SECURITY-MODEL.md`; `docs/02-core-platform/09-OBSERVABILITY.md`; `docs/02-core-platform/10-DEPLOYMENT-MODEL.md`; `docs/02-core-platform/11-TECHNOLOGY-STACK.md` |
| Business Brain | `docs/99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md`; `docs/03-business-brain/03-BUSINESS-BRAIN-DOMAIN-MODEL.md`; `docs/03-business-brain/05-BUSINESS-BRAIN-CONTRACTS.md` |
| Commerce | `docs/99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md`; `docs/04-commerce-os/09-COMMERCE-OS-FINAL-ARCHITECTURE-REVIEW.md` |
| Engineering policy | `docs/11-execution/05-FRONTEND-FIRST-POLICY.md`; `docs/11-execution/06-MOCK-DATA-STANDARD.md`; `docs/11-execution/09-DOCUMENTATION-POLICY.md`; `docs/11-execution/12-ENGINEERING-ROADMAP.md` |
| Implementation | `apps/`; `packages/`; `scripts/check-frontend-architecture.mjs`; `tests/`; root workspace/configuration files |
| Audit reports | `docs/90-architecture-audit/00-EXECUTIVE-SUMMARY.md` through `docs/90-architecture-audit/05-GAP-ANALYSIS.md` |

## 2. Decision Status Definitions

| Status | Meaning in this register |
|---|---|
| Proposed | Stage 4 selects a direction for approval; it is not yet authority. |
| Accepted | Already approved through the repository Governance lifecycle. |
| Retained | Existing approved architecture or conforming implementation pattern remains the target. |
| Standardized | Stage 4 fixes a target behavior within existing authority; approval is still required where it adds implementation detail. |
| Migration Required | Current executable behavior differs from the controlling target. |
| Deferred | Existing authority explicitly withholds the decision or current scope does not require it. |
| Rejected | Direction is excluded by evidence or controlling authority. |
| Product Decision Required | Business scope/behavior lacks authoritative product evidence. |
| Technical Spike Required | Logical requirement is clear; physical technology needs governed evaluation before selection. |
| Unknown | Evidence is insufficient even to classify the decision owner. |

“Resolved” in the Stage 4 count means Retained, Standardized, Migration Required, Proposed, or
Rejected. It does not mean approved. This register contains **31 resolved directions, 2 deferred
directions, 9 product-decision clusters, and 5 technical-spike decisions**.

## 3. Decision Summary

| ID | Topic | Decision | Status | Confidence | Migration Impact |
|---|---|---|---|---|---|
| S4-ADR-001 | Product identity | Use “Business Operating Intelligence Platform” | Retained | High | Documentation/UI terminology |
| S4-ADR-002 | Architecture style | Enforced modular monolith; no initial microservices | Retained | High | Backend structure and contracts |
| S4-ADR-003 | Monorepo | Retain pnpm/Turborepo and separate app/package boundaries | Retained | High | No repository rewrite |
| S4-ADR-004 | Frontend framework | Retain Next.js/React/TypeScript for current apps | Retained | High | Incremental UI migration |
| S4-ADR-005 | Backend framework | Evaluate Laravel modular monolith as leading candidate | Technical Spike Required | High | Blocks backend skeleton |
| S4-ADR-006 | Database | Evaluate PostgreSQL as leading candidate | Technical Spike Required | High | Blocks physical schema/migrations |
| S4-ADR-007 | Application boundaries | Retain Landing, Core Platform, Commerce; no app-to-app imports | Retained | High | Handoff replaces shared browser state |
| S4-ADR-008 | Backend module boundaries | Mirror canonical Core and Commerce owners in one runtime | Standardized | High | New backend module layout |
| S4-ADR-009 | Shared packages | Keep UI/auth/SDK/contracts/types/shared narrow and non-owning | Standardized | High | Extract legacy owner shapes |
| S4-ADR-010 | Tenant/organization model | Workspace tenant; distinct Business/BU/Department/Branch | Migration Required | High | Identity/data/UI compatibility |
| S4-ADR-011 | Employee authentication | Server-managed browser session; no browser credential authority | Standardized | High | Full replacement of mock auth |
| S4-ADR-012 | Authorization | Owner-enforced scoped RBAC plus contextual constraints | Standardized | High | Policies, denials, audit |
| S4-ADR-013 | Roles/permissions | Versioned permissions; role names/content product-configured | Standardized | High | Mapping/backfill required |
| S4-ADR-014 | API transport | REST/JSON with OpenAPI for first production boundary | Proposed | Medium | New versioned API |
| S4-ADR-015 | Contract evolution | Major API versions; additive compatibility and deprecation | Standardized | High | Contract/version registry |
| S4-ADR-016 | SDK | Generated transport types/client plus hand-written domain facades | Standardized | Medium | Wrap current SDK ports |
| S4-ADR-017 | Validation/errors/idempotency | Server authoritative; stable errors; idempotent commands where repeatable | Standardized | High | Contract and command changes |
| S4-ADR-018 | Commerce ownership | Separate Product/Pricing/Inventory/Order/POS/Payment/Tax/Document owners | Migration Required | High | Data/API/UI compatibility |
| S4-ADR-019 | EasyCar application workflow | No state model until Product approves semantics | Product Decision Required | High | Blocks workflow schema/API |
| S4-ADR-020 | File storage product | Private object-storage abstraction; evaluate S3-compatible product | Technical Spike Required | High | Upload/file migration |
| S4-ADR-021 | Queue product | Transactional outbox/worker abstraction; evaluate queue technology | Technical Spike Required | High | Async/notification delivery |
| S4-ADR-022 | Notifications | Core coordinates delivery; source owner emits minimal facts | Standardized | High | Event/outbox integration |
| S4-ADR-023 | Audit | Append-only AuditRecord correlated with owner operations | Standardized | High | Required in every command slice |
| S4-ADR-024 | Observability | Structured correlated logs, metrics, traces, health | Standardized | High | Cross-cutting runtime work |
| S4-ADR-025 | Feature flags | Operational rollout flags separate from capability/entitlement/permission | Standardized | High | New registry/evaluator |
| S4-ADR-026 | Plan catalog | Retain canonical Starter/Pro/Business/Enterprise codes where plans exist | Retained | High | Replace mock catalog only after Product data |
| S4-ADR-027 | Plan and usage limits | Product-owned, versioned entitlement rules; values unresolved | Product Decision Required | High | Blocks quota/limit migration |
| S4-ADR-028 | OS lifecycle successor | Do not canonicalize `OSEnablement`; await ADR-023 successor | Deferred | High | Blocks lifecycle data model |
| S4-ADR-029 | Deployment model | Single-site modular-monolith topology on VPS-equivalent initially | Proposed | Medium | Infrastructure approval needed |
| S4-ADR-030 | CI/CD | Required PR and release pipelines with gated promotion | Standardized | High | New delivery automation |
| S4-ADR-031 | Test strategy | Risk-based unit/contract/integration/E2E/security/ops evidence | Standardized | High | Extend current tests |
| S4-ADR-032 | Backup/recovery products and objectives | Logical recovery gates fixed; products/RPO/RTO need spike/owners | Technical Spike Required | High | Blocks production go-live |
| S4-ADR-033 | Documentation source of truth | Freeze → Governance → Genesis/baselines → Constitution → feature/runtime docs | Standardized | High | Supersession metadata/index |
| S4-ADR-034 | Browser mocks | Retain as deterministic test adapters; remove as production authority | Migration Required | High | Per-slice SDK cutover |
| S4-ADR-035 | Product Hub handoff | Signed, opaque, one-use/short-lived exchange with target reauthorization | Migration Required | High | Replace URL identifiers/storage bridge |
| S4-ADR-036 | Business DNA/Brain | Implement frozen deterministic sequence after canonical Business/security foundation | Retained | High | New Core modules and contracts |
| S4-ADR-037 | Marketplace/AI/global execution | Preserve architecture; defer runtime until separately authorized | Deferred | High | No current migration |
| S4-ADR-038 | Microservices/big-bang rewrite | Reject both as initial target | Rejected | High | Incremental modular slices |
| S4-ADR-039 | EasyCar scope and Dealer/Finance/Broker tenant types | Require Product/Governance definition; no typed Workspace subclasses | Product Decision Required | High | Blocks domain bounded context |
| S4-ADR-040 | Customer portal auth/uploads | Require product/security decision on link/session/OTP/lifetime | Product Decision Required | High | Blocks portal contracts/storage |
| S4-ADR-041 | Insurance model | Require decision whether child workflow, requirement, or external integration | Product Decision Required | High | Blocks status mapping/domain owner |
| S4-ADR-042 | Delegation and Viewer role | Require permission/workflow product semantics | Product Decision Required | High | Blocks role/approval mapping |
| S4-ADR-043 | Car/inventory/reservation/deposit/bank scope | Require bounded-context and MVP decisions | Product Decision Required | High | Blocks entities and APIs |
| S4-ADR-044 | Marketing pages | Retain Landing ownership; no canonical operational writes | Retained | High | API only for approved CMS later |
| S4-ADR-045 | Localization/accessibility | Arabic/English, RTL/LTR and accessible flows remain first-release gates | Retained | High | UI/test completion |
| S4-ADR-046 | Subscription billing provider | Require Product/Finance decision; Core retains coordination ownership | Product Decision Required | High | Blocks payment/provider contracts |
| S4-ADR-047 | Tenant branding | Require Product decision on plans, scope and override rules | Product Decision Required | Medium | Blocks branding schema/entitlements |

## 4. Detailed Decisions

For compactness, each entry combines paired required fields: **Context/current state** covers both
Context and Current State; **Rationale/alternatives** records rationale and alternatives considered;
**Consequences/risks** records both; **Dependencies/migration/validation** records dependencies,
migration requirement and validation; **Evidence** supplies Related Reports, original authority,
implementation evidence where applicable, and the relevant Stage 3 gap/drift identifier.

### S4-ADR-001 — Canonical Product Identity

- **Status:** Retained.
- **Context/current state:** Landing copy omits “Intelligence” (S3 AD-01/GAP-028).
- **Decision:** Canonical product identity remains “NexoraXS Business Operating Intelligence Platform.”
- **Rationale/alternatives:** ADR-001 is Accepted; historical “Platform/System” wording is rejected as canonical.
- **Consequences/risks:** Public copy and metadata need a later documentation/UI migration; no domain change.
- **Dependencies/migration/validation:** Governance glossary; terminology scan and approved copy evidence.
- **Owner/confidence:** Product + Architecture; High.
- **Evidence:** S2 CON-07; S3 §3/AD-01; `docs/00-governance/ADR/ADR-001-business-operating-intelligence-platform.md`; Landing source.

### S4-ADR-002 — Enforced Modular Monolith

- **Status:** Retained.
- **Context/current state:** Frontends are separated; no backend exists (S3 GAP-006).
- **Decision:** Initial Core/Commerce backend is one deployable modular monolith with enforced logical owner boundaries.
- **Rationale/alternatives:** ADR-033 and Deployment Model require this; microservices add unproven operational cost.
- **Consequences/risks:** Co-deployment cannot permit cross-module table access; extraction remains evidence-driven.
- **Dependencies/migration/validation:** S4-ADR-005/006; module dependency and owner-write tests.
- **Owner/confidence:** Architecture; High.
- **Evidence:** S2 DEC-033; S3 §§4,9; `docs/00-governance/ADR/ADR-033-enforced-modular-monolith.md`; `docs/02-core-platform/10-DEPLOYMENT-MODEL.md`.

### S4-ADR-003 — Monorepo and Workspace Tooling

- **Status:** Retained.
- **Context/current state:** pnpm/Turborepo works; nested metadata creates minor drift (S3 GAP-031).
- **Decision:** Keep one root pnpm workspace/Turborepo graph and eliminate secondary install authority during migration.
- **Rationale/alternatives:** Preserves working builds and avoids repository relocation.
- **Consequences/risks:** Every runtime/package declares ownership; one lockfile is release authority.
- **Dependencies/migration/validation:** CI bootstrap; reproducible install/build from clean checkout.
- **Owner/confidence:** Engineering; High.
- **Evidence:** S1 §§3,10; S3 technology table/AD-11; root manifests and `pnpm-workspace.yaml`.

### S4-ADR-004 — Current Frontend Stack

- **Status:** Retained.
- **Context/current state:** Three Next.js 16/React 19/TypeScript apps and substantive tests exist.
- **Decision:** Retain current stack and routes; migrate data access beneath SDK/facade boundaries without UI rewrite.
- **Rationale/alternatives:** No evidence justifies replacement; framework remains an implementation choice.
- **Consequences/risks:** Server/client boundaries, localization and route guards require continued enforcement.
- **Dependencies/migration/validation:** S4-ADR-014–017, 034–035; frontend regression gate.
- **Owner/confidence:** Frontend Engineering; High.
- **Evidence:** S1 app inventory; S3 §§3,8,13; `docs/11-execution/05-FRONTEND-FIRST-POLICY.md`; `apps/*/package.json`.

### S4-ADR-005 — Backend Framework Selection

- **Status:** Technical Spike Required.
- **Context/current state:** Historical/current execution guidance names Laravel, but Core Stack defers framework approval; no backend exists (S2 CON-08, S3 GAP-006).
- **Decision:** Laravel is the leading candidate only. No production backend skeleton or framework-shaped contract becomes authoritative before a Governance ADR compares it with at least one viable alternative.
- **Rationale/alternatives:** It matches repository direction and team assumptions, but the Freeze forbids implicit approval.
- **Consequences/risks:** Wave 1 backend work is blocked; spike must prove module enforcement, tenancy, policy, outbox, testing, operability and exit path.
- **Dependencies/migration/validation:** S4-ADR-002/006; accepted technology ADR and proof-of-boundary prototype.
- **Owner/confidence:** Architecture + Backend Engineering; High on status, Medium on Laravel selection.
- **Evidence:** S2 CON-08/UND-06; S3 technology verification; `docs/02-core-platform/11-TECHNOLOGY-STACK.md` §§4–6; no `backend/` source.

### S4-ADR-006 — Database Selection

- **Status:** Technical Spike Required.
- **Context/current state:** PostgreSQL is mentioned as planned; architecture defers engine/topology; no schema exists.
- **Decision:** Evaluate PostgreSQL as leading candidate for one logical database with module-owned schemas/tables and explicit cross-owner access controls.
- **Rationale/alternatives:** Relational constraints suit hierarchy, memberships, workflows and audit; engine approval still requires evidence.
- **Consequences/risks:** Physical schema, RLS choice, transaction boundaries and migration tooling remain blocked.
- **Dependencies/migration/validation:** S4-ADR-005/010; spike for constraint, tenant isolation, backup/restore and zero-downtime migration behavior.
- **Owner/confidence:** Architecture + Data/Operations; High on status, Medium on product.
- **Evidence:** S2 CON-08/UND-07; S3 §§10,14; Core Stack §§4.1,5; no database files.

### S4-ADR-007 — Application Boundaries

- **Status:** Retained.
- **Context/current state:** Landing, Core and Commerce are separate; direct app imports are absent, but browser-origin integration fails (GAP-003/018).
- **Decision:** Retain the three applications. Apps communicate through governed API/handoff contracts, never imports or shared browser persistence.
- **Rationale/alternatives:** Preserves OS independence and current UI investment.
- **Consequences/risks:** Production routing must give all apps secure session/API access while keeping release ownership explicit.
- **Dependencies/migration/validation:** S4-ADR-011, 014, 035; cross-app contract/E2E tests.
- **Owner/confidence:** Architecture + app owners; High.
- **Evidence:** S1 app map; S3 §§4,8 and GAP-003; ADR-024/025; `scripts/check-frontend-architecture.mjs`.

### S4-ADR-008 — Backend Module Boundaries

- **Status:** Standardized.
- **Context/current state:** No backend; Commerce browser services collapse owner boundaries (AD-06–09).
- **Decision:** Backend modules mirror canonical owners. Cross-module writes use application ports/commands; query composition uses owner projections.
- **Rationale/alternatives:** Direct table/service access is rejected even inside one process.
- **Consequences/risks:** More explicit contracts; fewer accidental transactions across owners.
- **Dependencies/migration/validation:** S4-ADR-002, 018; module graph and owner-write conformance tests.
- **Owner/confidence:** Architecture/domain owners; High.
- **Evidence:** S3 §§4.2–4.3/GAP-009–012; ADR-033/040; Commerce Final Review §7.2.

### S4-ADR-009 — Shared Package Scope

- **Status:** Standardized.
- **Context/current state:** package direction is strong, but legacy owner records reside in shared types/contracts/SDK (GAP-016).
- **Decision:** `ui` is presentation-only; `auth` frontend helpers only; `sdk` transport/facades; `contracts` versioned schemas/types; `types` context-neutral values/generated types; `shared` neutral utilities. No package owns business lifecycle.
- **Rationale/alternatives:** A shared business-logic layer would erase owners.
- **Consequences/risks:** Legacy shapes need bounded compatibility namespaces until removal.
- **Dependencies/migration/validation:** S4-ADR-015/016/034; export and dependency tests.
- **Owner/confidence:** Architecture + package maintainers; High.
- **Evidence:** S1 package inventory; S3 AD-11/TD-06; ADR-011/035; `packages/*`.

### S4-ADR-010 — Workspace Tenant and Canonical Organization

- **Status:** Migration Required.
- **Context/current state:** legacy Workspace → BusinessUnit → Branch conflicts with canonical hierarchy (GAP-001).
- **Decision:** Workspace is the tenant. Business, Business Unit, Department and Branch are distinct aggregates/identities with verified ancestry. `Tenant` is a semantic alias for Workspace boundary, not another entity.
- **Rationale/alternatives:** ADR-003/004 are Accepted; typed Workspaces and Business/BU synonymy are rejected.
- **Consequences/risks:** Highest-risk identity/backfill/UI compatibility migration; DNA attaches to Business.
- **Dependencies/migration/validation:** S4-ADR-006, 011–013; migration map, ancestry constraints, isolation tests.
- **Owner/confidence:** Core Organization Registry + Architecture; High.
- **Evidence:** S2 CON-02; S3 GAP-001/AD-02; ADR-003/004; `packages/types/src/core.ts`.

### S4-ADR-011 — Employee Authentication Model

- **Status:** Standardized.
- **Context/current state:** mock passwords and sessions live in browser storage (GAP-002).
- **Decision:** Use a server-managed session for first-party browser apps with Secure/HttpOnly/SameSite cookie transport, CSRF protection, revocation and recovery; exact provider/product remains subordinate to S4-ADR-005.
- **Rationale/alternatives:** Browser-local credentials and bearer tokens in localStorage are rejected.
- **Consequences/risks:** Cross-app origin/routing and session renewal need deliberate topology; authentication never grants Workspace access.
- **Dependencies/migration/validation:** S4-ADR-005, 012, 029; session threat model and E2E tests.
- **Owner/confidence:** Core Identity + Security; High on behavior.
- **Evidence:** S3 GAP-002/Security §11; Core Security Model §§5.3–5.7; Core `AppProvider`.

### S4-ADR-012 — Owner-Enforced Authorization

- **Status:** Standardized.
- **Context/current state:** client scopes and permission UI do not enforce access (GAP-002/005).
- **Decision:** Resolve principal, active Workspace Membership, organization ancestry, OS/resource/action, permission, entitlement/lifecycle and owner invariants on every protected operation.
- **Rationale/alternatives:** Gateway-only, frontend-only and implicit hierarchy inheritance are rejected.
- **Consequences/risks:** Deny by default; administrative access uses segregated audited policies.
- **Dependencies/migration/validation:** S4-ADR-010/011/013/023; negative isolation/authorization tests.
- **Owner/confidence:** Core Identity plus each resource owner; High.
- **Evidence:** S3 GAP-005; ADR-034; Core Permission Model §§5.2–5.6; no policies/guards.

### S4-ADR-013 — Roles and Permissions

- **Status:** Standardized.
- **Context/current state:** UI role/permission constants have no canonical enforcement; role names are deferred.
- **Decision:** Versioned permission keys are owner-defined; roles group permissions at explicit scopes; direct grants are exceptional and governed. Role names/content, Viewer availability and delegation remain Product decisions.
- **Rationale/alternatives:** Hard-coded global roles and automatic descendant access are rejected.
- **Consequences/risks:** Existing labels require mappings, not assumed equivalence.
- **Dependencies/migration/validation:** S4-ADR-012/042; permission catalog approval and matrix tests.
- **Owner/confidence:** Core Identity + OS owners + Product; High.
- **Evidence:** S2 authoritative source table; S3 GAP-005/020; Core Permission Model; Core team components.

### S4-ADR-014 — REST/OpenAPI First Production Transport

- **Status:** Proposed.
- **Context/current state:** no API; transport/schema are deferred (GAP-013).
- **Decision:** Use REST/JSON and OpenAPI 3.1 for the first first-party/public wire boundary, while keeping domain contracts transport-neutral.
- **Rationale/alternatives:** Fits Next/Laravel candidate ecosystem and incremental resource/command slices; GraphQL and RPC add no evidenced benefit now.
- **Consequences/risks:** Requires Governance approval because transport/schema were deferred; OpenAPI is not the domain model.
- **Dependencies/migration/validation:** S4-ADR-005/015–017; contract lint, consumer/provider tests.
- **Owner/confidence:** API Governance + Architecture; Medium.
- **Evidence:** S2 UND-08; S3 §§7,9/GAP-013; Core API Philosophy §§3–5; SDK HTTP unavailable.

### S4-ADR-015 — API Versioning and Evolution

- **Status:** Standardized.
- **Context/current state:** only frontend-internal legacy contracts exist.
- **Decision:** Publish explicit major versions, prefer additive evolution, retain old versions through a declared support window, and require migration/deprecation evidence for breaking changes. Exact URL/header syntax is approved with S4-ADR-014.
- **Rationale/alternatives:** Unversioned endpoints and persistence models as contracts are rejected.
- **Consequences/risks:** Contract owners maintain compatibility tests and consumer inventory.
- **Dependencies/migration/validation:** S4-ADR-014/016; breaking-change detector and deprecation register.
- **Owner/confidence:** API Governance + domain owner; High.
- **Evidence:** S2 DEC-035/036; S3 GAP-013; ADR-035/036; Core API Philosophy §§3.8, 5.

### S4-ADR-016 — SDK Strategy

- **Status:** Standardized.
- **Context/current state:** current SDK has useful ports/facades and browser adapters; HTTP mode is unavailable.
- **Decision:** Generate wire types/base client from approved OpenAPI, retain hand-written owner-oriented facades and injectable mock adapters, and keep UI independent of transport.
- **Rationale/alternatives:** Fully hand-written duplicated DTOs and generated domain/application logic are rejected.
- **Consequences/risks:** Generation drift is controlled by CI; compatibility adapters remain private.
- **Dependencies/migration/validation:** S4-ADR-014/015/034; mock/HTTP contract parity.
- **Owner/confidence:** API + SDK owner; Medium.
- **Evidence:** S3 GAP-013/016 and SDK verification; Features 052–055; `packages/sdk/`.

### S4-ADR-017 — Validation, Errors, and Idempotency

- **Status:** Standardized.
- **Context/current state:** mock services return local errors; no server validation exists.
- **Decision:** Client validation improves UX; server validates contract, scope and invariants. Errors use stable machine codes plus safe details/correlation. Repeatable create/command endpoints require scoped idempotency keys.
- **Rationale/alternatives:** Trusting client validation or leaking framework exceptions is rejected.
- **Consequences/risks:** Idempotency storage and conflict semantics are owner responsibilities.
- **Dependencies/migration/validation:** S4-ADR-014/023; replay, duplicate and invalid-scope tests.
- **Owner/confidence:** API Governance + owners; High.
- **Evidence:** S2 API decision inventory; S3 API/Security verification; Core API Philosophy §§3–5.

### S4-ADR-018 — Commerce Canonical Fact Ownership

- **Status:** Migration Required.
- **Context/current state:** Product includes price/stock; Return/Transfer write other owners; POS/Payment/Tax facts collapse (GAP-009–012).
- **Decision:** Preserve the Commerce Freeze owner matrix and coordinate cross-owner changes through commands/events with explicit consistency and failure semantics.
- **Rationale/alternatives:** Current broad operations store and direct foreign writes cannot become production architecture.
- **Consequences/risks:** DTO/read projections may preserve current UI shape while canonical writes split.
- **Dependencies/migration/validation:** S4-ADR-008, 014–017, 023; owner contract and failure/compensation tests.
- **Owner/confidence:** Commerce domain owners; High.
- **Evidence:** S3 AD-06–09/TD-07–09; Commerce Final Review §7.2; Commerce services/types.

### S4-ADR-019 — EasyCar Application Workflow

- **Status:** Product Decision Required.
- **Context/current state:** named statuses/entities are absent from authoritative docs and implementation (S3 §5.3/§6).
- **Decision:** Do not create a canonical state list, transition table or migration mapping until Product defines the workflow and Architecture assigns one owner.
- **Rationale/alternatives:** Inferring transitions from prompt examples would violate Governance.
- **Consequences/risks:** EasyCar application schema/API/UI work is frozen; unknown states fail closed in any importer.
- **Dependencies/migration/validation:** S4-ADR-039–043; approved product spec and state-machine tests.
- **Owner/confidence:** Product Owner + domain architect; High.
- **Evidence:** S2 §11; S3 §§5.3,6 and GAP-033; repository-wide absence.

### S4-ADR-020 — Private File Storage

- **Status:** Technical Spike Required.
- **Context/current state:** media/documents use browser data URLs; no production storage exists (GAP-023).
- **Decision:** Files are private objects accessed only through Storage Coordination and owner-authorized short-lived operations. S3-compatible storage is the leading product class, not yet an approved product.
- **Rationale/alternatives:** Public paths, database blobs as default, and client-declared tenant paths are rejected.
- **Consequences/risks:** Metadata and business document ownership remain separate from object bytes.
- **Dependencies/migration/validation:** S4-ADR-006/011/012/029; encryption, malware scanning, tenancy, expiry, restore and cost spike.
- **Owner/confidence:** Core Storage Coordination + Security/Operations; High on behavior.
- **Evidence:** S2 UND-12; S3 GAP-023; Core Stack §4.1 and Security Model; `LegacyProductMediaService`.

### S4-ADR-021 — Queue and Background Execution

- **Status:** Technical Spike Required.
- **Context/current state:** no queue/jobs/events; products and delivery rules are deferred (GAP-024).
- **Decision:** Use transactional outbox plus idempotent workers for approved asynchronous effects. Evaluate Laravel queue with Redis or database transport after backend selection; no domain depends on a broker API.
- **Rationale/alternatives:** In-request fan-out and uncommitted event publication are rejected.
- **Consequences/risks:** Retry, DLQ, tenant context, ordering and replay policy are required before use.
- **Dependencies/migration/validation:** S4-ADR-005/006/023/024; failure/replay spike and outbox integration tests.
- **Owner/confidence:** Platform Operations + Event Governance; High on logical pattern, Medium on product.
- **Evidence:** S2 UND-12; S3 GAP-024; Core Event Architecture and Stack §§4.1,4.6.

### S4-ADR-022 — Notification Coordination

- **Status:** Standardized.
- **Context/current state:** toasts/local UI exist; no notification runtime.
- **Decision:** Source owners emit minimal committed facts; Core Notification owns preference, template/channel coordination and delivery status, not source workflow state.
- **Rationale/alternatives:** UI toasts and direct cross-domain notification writes are not canonical delivery.
- **Consequences/risks:** Delivery is asynchronous, idempotent, localized and tenant-scoped.
- **Dependencies/migration/validation:** S4-ADR-021/023/045; contract and retry tests.
- **Owner/confidence:** Core Notification + source owner; High.
- **Evidence:** S3 GAP-021/024; Core Freeze §6; Event Architecture.

### S4-ADR-023 — Append-Only Audit

- **Status:** Standardized.
- **Context/current state:** no Audit runtime (GAP-005/014).
- **Decision:** Every consequential owner command records an append-only AuditRecord with actor, Workspace, organization/resource/action, decision/outcome, correlation and safe metadata.
- **Rationale/alternatives:** Mutable logs, UI history and observability traces cannot substitute for Audit.
- **Consequences/risks:** Audit write failure policy must be explicit; sensitive payloads are minimized.
- **Dependencies/migration/validation:** S4-ADR-006/011/012/024; immutability, access and correlation tests.
- **Owner/confidence:** Core Audit + command owners; High.
- **Evidence:** S3 GAP-005/014; ADR-038; Core Security Model §4.7; no Audit source.

### S4-ADR-024 — Observability

- **Status:** Standardized.
- **Context/current state:** no structured production telemetry or health runtime (GAP-014).
- **Decision:** Emit correlated structured logs, metrics, traces and dependency/health signals; exclude secrets and unauthorized tenant data; define SLO values later.
- **Rationale/alternatives:** Console-only diagnostics and Audit-as-logging are rejected.
- **Consequences/risks:** Correlation crosses API, owner, outbox, worker and Audit.
- **Dependencies/migration/validation:** S4-ADR-005/021/023/029; telemetry schema and redaction tests.
- **Owner/confidence:** Operations + every runtime owner; High.
- **Evidence:** S2 UND-11; S3 GAP-014; `docs/02-core-platform/09-OBSERVABILITY.md`; no telemetry source.

### S4-ADR-025 — Feature Flag Semantics

- **Status:** Standardized.
- **Context/current state:** no canonical registry; capability, plan access and rollout risk can be conflated (GAP-022).
- **Decision:** Operational flags control rollout only. Capability, entitlement, permission and lifecycle are separate owner facts. Server evaluation is authoritative; client flags may only hide/present.
- **Rationale/alternatives:** Plan-as-flag and client-only authorization flags are rejected.
- **Consequences/risks:** Every flag has owner, scope, default, expiry/removal condition and Audit for changes.
- **Dependencies/migration/validation:** S4-ADR-012/027; registry contract and fail-safe tests.
- **Owner/confidence:** Platform Configuration + feature owner; High.
- **Evidence:** S2 UND-09/DOC-R12; S3 GAP-022; ADR-039 and Core commercial model.

### S4-ADR-026 — Canonical Plan Codes

- **Status:** Retained.
- **Context/current state:** browser catalog has Starter/Pro/Business only and unapproved limits (GAP-019).
- **Decision:** Where a product has plans, canonical codes remain Starter, Pro, Business and Enterprise; availability per product and prices are Product-owned catalog data.
- **Rationale/alternatives:** Browser constants cannot redefine the catalog.
- **Consequences/risks:** UI must tolerate plans being absent/unavailable and consume owner projections.
- **Dependencies/migration/validation:** S4-ADR-027/046; Product approval and catalog contract tests.
- **Owner/confidence:** Core Product/Plan Catalog + Product; High.
- **Evidence:** S2 CON-09; S3 AD-04/GAP-019; ADR-022; mock schema.

The Stage 4 prompt's `Core`, `Premium`, and `Enterprise` names have no authority over this catalog.
If they are intended as EasyCar-specific offers, PD-01/PD-05 must define them without silently
renaming NexoraXS canonical plan codes.

### S4-ADR-027 — Plan and Usage Limits

- **Status:** Product Decision Required.
- **Context/current state:** mock numeric user/storage limits are unapproved; monthly application limits are undocumented.
- **Decision:** Values, reset periods, overage behavior, grandfathering and tenant/product applicability require Product/Finance approval. Architecture stores versioned entitlement rules and usage measurements separately.
- **Rationale/alternatives:** Hard-coded UI limits and implicit defaults are rejected.
- **Consequences/risks:** Limit enforcement and data backfill are blocked; absence means deny paid-only claims, not invent a tier.
- **Dependencies/migration/validation:** S4-ADR-026/046; approved matrix and boundary tests.
- **Owner/confidence:** Product + Finance + Core Commercial; High.
- **Evidence:** S2 UND-10/DOC-R11; S3 GAP-019; ADR-022; `packages/shared/src/mock-db/schema.ts`.

### S4-ADR-028 — OS Lifecycle Successor

- **Status:** Deferred.
- **Context/current state:** first-class browser `OSEnablement` conflicts with ADR-023 (GAP-004).
- **Decision:** No canonical successor, schema or state machine is selected in Stage 4. Compatibility remains read-bounded and may not gain new semantics.
- **Rationale/alternatives:** Governance explicitly says the successor is unresolved.
- **Consequences/risks:** Commercial/access migration and some Product Hub work remain blocked.
- **Dependencies/migration/validation:** Approved successor ADR; characterization of all existing reads/writes.
- **Owner/confidence:** Architecture Governance + Core Commercial/Product Hub; High.
- **Evidence:** S2 CON-03; S3 GAP-004; ADR-023; Core type/provider.

### S4-ADR-029 — Initial Deployment Topology

- **Status:** Proposed.
- **Context/current state:** no deployment; target product mentions VPS or equivalent; products/topology are deferred.
- **Decision:** Begin with one environment-isolated deployment unit: reverse proxy, retained frontend runtimes, one modular backend runtime, one primary relational database, queue workers and private object storage. VPS-equivalent compute is acceptable only if gates and recovery are met.
- **Rationale/alternatives:** Minimal operations fit current maturity; orchestration/multi-region/microservices lack evidence.
- **Consequences/risks:** Single-site availability limits must be explicit; secrets, backups and workers remain isolated.
- **Dependencies/migration/validation:** S4-ADR-005/006/020/021/032; deployment rehearsal and restore test.
- **Owner/confidence:** Operations + Architecture; Medium.
- **Evidence:** S2 UND-05; S3 GAP-026; Deployment Model §§1–16; no infra config.

### S4-ADR-030 — CI/CD Gates

- **Status:** Standardized.
- **Context/current state:** local tests exist; no CI workflow (GAP-017/026).
- **Decision:** PR pipeline runs format/lint/type/unit/architecture/contract checks; release pipeline adds integration/E2E/security/migration/rollback/build/deploy verification and controlled promotion.
- **Rationale/alternatives:** Manual-only production release is incompatible with required evidence.
- **Consequences/risks:** Exact CI product remains implementation choice; protected environments and approvals required.
- **Dependencies/migration/validation:** S4-ADR-029/031/032; clean-run reproducibility.
- **Owner/confidence:** Engineering/Operations; High.
- **Evidence:** S1 workflow; S3 GAP-017/026; AGENTS §14; no `.github/workflows`.

### S4-ADR-031 — Test Strategy

- **Status:** Standardized.
- **Context/current state:** 277 unit tests pass; production security/integration/ops evidence is impossible today.
- **Decision:** Keep current unit/static/E2E estate and add owner-domain, API contract, database integration, tenant isolation, authorization, migration, Audit/observability, accessibility/localization and recovery tests per slice.
- **Rationale/alternatives:** A single coverage percentage cannot replace risk evidence.
- **Consequences/risks:** Every omitted category needs an explicit N/A rationale.
- **Dependencies/migration/validation:** all migration waves; gate register in `09-RISK-AND-READINESS.md`.
- **Owner/confidence:** Quality Engineering + owners; High.
- **Evidence:** S3 §13/GAP-017; Core Stack §4.9; `tests/`, Vitest/Playwright configs.

### S4-ADR-032 — Backup and Recovery Selection

- **Status:** Technical Spike Required.
- **Context/current state:** no durable data/backups/runbooks; products and RPO/RTO are deferred.
- **Decision:** Production requires encrypted, isolated, monitored, restorable backups and version-compatible rollback/recovery. Product, schedule, RPO/RTO, retention and operator ownership require a governed spike and business criticality input.
- **Rationale/alternatives:** “Provider backup enabled” without restore evidence is rejected.
- **Consequences/risks:** Production go-live remains blocked until restore rehearsal passes.
- **Dependencies/migration/validation:** S4-ADR-006/020/029; restore and point-in-time recovery exercise.
- **Owner/confidence:** Operations + Data owners + Product; High.
- **Evidence:** S2 UND-03/04/DOC-R14; S3 GAP-026; Deployment Model §§12–13.

### S4-ADR-033 — Documentation Source of Truth

- **Status:** Standardized.
- **Context/current state:** authority is mostly clear, but 18 contradictions/duplications and stale “Final” material remain.
- **Decision:** Preserve repository hierarchy: Freeze, Governance/Accepted ADR/glossary, Genesis, frozen milestone baselines, Constitution, engineering governance, approved feature/runtime/operations evidence. Add status/supersession indexing without rewriting history.
- **Rationale/alternatives:** Filename claims and generated guidance cannot establish authority.
- **Consequences/risks:** This Stage 4 report remains Proposed until approved through the correct class.
- **Dependencies/migration/validation:** Architecture/documentation gate; link/status/owner review.
- **Owner/confidence:** Architect + Documentation owners; High.
- **Evidence:** S2 §§1–4,10/DOC-R01–05; Freeze completion §4; Documentation Policy §§2,11–14.

### S4-ADR-034 — Browser Mock Disposition

- **Status:** Migration Required.
- **Context/current state:** browser stores are the only runtime state and a useful deterministic compatibility seam.
- **Decision:** Keep mock adapters for tests/demo/rollback rehearsal; production selects HTTP SDK per vertical slice. Browser records never become canonical customer data by default.
- **Rationale/alternatives:** Big-bang deletion loses regression evidence; production fallback to localStorage is insecure.
- **Consequences/risks:** Runtime mode is environment-controlled and fail-closed; no silent fallback.
- **Dependencies/migration/validation:** S4-ADR-014–017/030/031; mock/HTTP parity and cutover tests.
- **Owner/confidence:** SDK/app owners; High.
- **Evidence:** S3 GAP-006/TD-04; Frontend-First Policy §§9–11; Mock Standard; SDK stores.

### S4-ADR-035 — Product Hub Handoff

- **Status:** Migration Required.
- **Context/current state:** URL identifiers/browser context are unsigned, non-expiring and cross-origin-incoherent (GAP-003/018).
- **Decision:** Core issues an opaque, audience-bound, one-use or short-lived handoff reference. Commerce exchanges it server-side, reauthenticates, reauthorizes and resolves current owner projections.
- **Rationale/alternatives:** Query-string identity/context and shared localStorage are rejected.
- **Consequences/risks:** Expiry, replay, unavailable-target and recovery paths must be explicit.
- **Dependencies/migration/validation:** S4-ADR-010–017/028; signed/exchange contract and adversarial E2E tests.
- **Owner/confidence:** Core Product Hub + Commerce integration + Security; High.
- **Evidence:** S3 GAP-003/018; ADR-037; Core/Commerce handoff adapters.

### S4-ADR-036 — Business DNA and Deterministic Brain

- **Status:** Retained.
- **Context/current state:** entire sequence is missing (GAP-007) but frozen architecture is complete.
- **Decision:** Implement only after canonical Business, identity/authorization, versioned assets and Audit foundations: Business DNA → Capability → Knowledge/Rules → Brain Decision → Recommendation → optional proposal → owner-authorized action.
- **Rationale/alternatives:** AI-first prompts, hard-coded industry logic and Brain-owned Business facts are rejected.
- **Consequences/risks:** Earliest safe vertical slice follows S4-ADR-010–013/023, without waiting for Marketplace/AI.
- **Dependencies/migration/validation:** version/provenance/explainability and deterministic replay tests.
- **Owner/confidence:** Core Business Registry/Brain owners; High.
- **Evidence:** S3 GAP-007; ADR-005–017/029; Business Brain Freeze; no runtime.

### S4-ADR-037 — Later Platform Contexts

- **Status:** Deferred.
- **Context/current state:** Marketplace/AI/global architecture is frozen but no implementation is authorized.
- **Decision:** Preserve contracts/boundaries; do not place these contexts on the Core+Commerce migration critical path.
- **Rationale/alternatives:** Architecture availability does not equal delivery authorization.
- **Consequences/risks:** Current modules may not preempt their ownership or create incompatible shortcuts.
- **Dependencies/migration/validation:** separately approved product scope/specs.
- **Owner/confidence:** Product + applicable domain owners; High.
- **Evidence:** S3 GAP-033; Engineering Roadmap §§6–10; relevant Freezes.

### S4-ADR-038 — No Microservices or Complete Rewrite

- **Status:** Rejected.
- **Context/current state:** maturity is frontend-heavy with no production backend or operations.
- **Decision:** Reject initial microservices and a full frontend/backend rewrite. Use owner-scoped vertical slices behind retained facades.
- **Rationale/alternatives:** Incremental cutover is safer and required by Deployment/Engineering Roadmap.
- **Consequences/risks:** Temporary adapters must have removal conditions; modular discipline is mandatory.
- **Dependencies/migration/validation:** S4-ADR-002/034; per-slice rollback evidence.
- **Owner/confidence:** Architecture; High.
- **Evidence:** S3 readiness; ADR-033; Deployment Model §15; Engineering Roadmap §10.

### S4-ADR-039 — EasyCar and Tenant-Type Scope

- **Status:** Product Decision Required.
- **Context/current state:** EasyCar, Dealer, Finance and Broker tenants have no authoritative NexoraXS definition or implementation.
- **Decision:** No EasyCar bounded context or typed Workspace subclass is included in the approved target baseline. Product must define actors, value, boundaries and MVP; if approved, all customer organizations still resolve Workspace tenancy.
- **Rationale/alternatives:** Prompt examples cannot override ADR-003/004; `DealerWorkspace`-style types are forbidden.
- **Consequences/risks:** EasyCar domain/API/migration work is frozen.
- **Dependencies/migration/validation:** Product discovery and Governance ownership review.
- **Owner/confidence:** Product Owner + Architecture; High.
- **Evidence:** S2 §11; S3 §5.3; ADR-003/004; AGENTS §3.

### S4-ADR-040 — Customer Portal and Upload Authentication

- **Status:** Product Decision Required.
- **Context/current state:** no portal link/session/upload requirements or code.
- **Decision:** Product/Security must decide identity proof, one-time link, session duration, OTP/step-up, revocation, upload permissions and customer relationship before contracts exist.
- **Rationale/alternatives:** Guessing a public token model risks data leakage.
- **Consequences/risks:** Portal/UI/routes/files are blocked; any future link is opaque, short-lived, purpose/audience-bound and audited.
- **Dependencies/migration/validation:** S4-ADR-011/012/020/039; threat model and abuse tests.
- **Owner/confidence:** Product + Security + future domain owner; High.
- **Evidence:** S2 UND areas; S3 §5.3; Core Security Model token rules; no portal source.

### S4-ADR-041 — Insurance Ownership and Lifecycle

- **Status:** Product Decision Required.
- **Context/current state:** `insured`/`no_insurance` and insurance records are undocumented/unimplemented.
- **Decision:** Product must decide whether insurance is required, optional, external, and a child workflow or application attribute. No target status mapping is approved.
- **Rationale/alternatives:** Collapsing an evidence-bearing sub-workflow into application status is not assumed.
- **Consequences/risks:** Insurance entities/transitions/integrations are frozen.
- **Dependencies/migration/validation:** S4-ADR-019/039; approved lifecycle and ownership tests.
- **Owner/confidence:** Product + future Application/Insurance owners; High.
- **Evidence:** S3 §§5.3,6; repository-wide absence.

### S4-ADR-042 — Delegation and Viewer Semantics

- **Status:** Product Decision Required.
- **Context/current state:** canonical role names/content and approval delegation are deferred; UI matrix is not enforcement.
- **Decision:** Product must define Viewer availability, delegated approver scope/duration/revocation, manager conditions and plan dependence. Architecture requires explicit scoped assignments and Audit.
- **Rationale/alternatives:** Role-label inference and Enterprise-only assumptions are rejected.
- **Consequences/risks:** Role/status backfills and approval guards remain blocked.
- **Dependencies/migration/validation:** S4-ADR-012/013/019/027.
- **Owner/confidence:** Product + Core Identity + workflow owner; High.
- **Evidence:** S2 roles authority Medium; S3 GAP-005/020; Core Permission Model.

### S4-ADR-043 — Car, Inventory, Reservation, Deposit, and Bank Scope

- **Status:** Product Decision Required.
- **Context/current state:** prompt concepts have no EasyCar authority; Commerce Inventory is a different frozen context.
- **Decision:** Product must assign bounded contexts and MVP/later status. Bank Submission remains future unless approved. No concept may borrow Commerce ownership solely because names overlap.
- **Rationale/alternatives:** A generic shared vehicle/application module would create ownerless business logic.
- **Consequences/risks:** Entities/APIs/migrations are frozen; Commerce operational inventory remains Commerce-owned.
- **Dependencies/migration/validation:** S4-ADR-039 and product domain discovery.
- **Owner/confidence:** Product + Architecture; High.
- **Evidence:** S2 §11; S3 §5.3; Commerce Freeze; no matching runtime.

### S4-ADR-044 — Marketing Pages

- **Status:** Retained.
- **Context/current state:** Landing owns public marketing; copy/catalog claims drift from Core.
- **Decision:** Landing remains presentation/discovery owner and consumes approved Product/Plan projections where needed; it owns no subscription or OS facts.
- **Rationale/alternatives:** Duplicated hard-coded commercial truth is rejected.
- **Consequences/risks:** A future CMS is optional/product-approved, not a prerequisite.
- **Dependencies/migration/validation:** S4-ADR-001/026/027; copy/projection tests.
- **Owner/confidence:** Marketing/Product + Landing; High.
- **Evidence:** S3 GAP-028/029; ADR-020/022; Landing source.

### S4-ADR-045 — Localization and Accessibility

- **Status:** Retained.
- **Context/current state:** partial bilingual/RTL/a11y implementation (GAP-015).
- **Decision:** Arabic/English, RTL/LTR, keyboard/semantic/focus safety and non-color-only meaning are acceptance gates for every migrated user flow.
- **Rationale/alternatives:** Deferral to post-production conflicts with frozen global requirements.
- **Consequences/risks:** Contracts support localized messages via codes/data, not server-rendered UI strings alone.
- **Dependencies/migration/validation:** S4-ADR-031; bilingual/a11y regression evidence.
- **Owner/confidence:** Product/Design/App owners; High.
- **Evidence:** S3 GAP-015; ADR-041; AGENTS §12; current dictionaries/tests.

### S4-ADR-046 — Subscription Billing Provider

- **Status:** Product Decision Required.
- **Context/current state:** subscription browser records exist; internal/external billing and payment provider are undocumented.
- **Decision:** Product/Finance must select commercial process, provider responsibility, currencies/tax/refunds and reconciliation. Core remains Product/Plan/Subscription and billing-coordination owner, not payment-provider fact owner.
- **Rationale/alternatives:** Browser subscription creation cannot define commercial acceptance.
- **Consequences/risks:** Production subscription activation/payment integration is blocked.
- **Dependencies/migration/validation:** S4-ADR-026–028; finance/legal/security review.
- **Owner/confidence:** Product + Finance + Core Commercial; High.
- **Evidence:** S2 plan/subscription authority; S3 GAP-008/019; ADR-021–023; Core provider.

### S4-ADR-047 — Tenant Branding Policy

- **Status:** Product Decision Required.
- **Context/current state:** branding scope and plan dependence have no canonical rule.
- **Decision:** Product must define Workspace/Business applicability, inheritance, plan entitlement and allowed assets before schema or UI migration.
- **Rationale/alternatives:** Treating branding as a client flag or typed tenant is rejected.
- **Consequences/risks:** Branding beyond current static application themes is blocked.
- **Dependencies/migration/validation:** S4-ADR-010/020/025/027.
- **Owner/confidence:** Product + Design + Core Settings; Medium.
- **Evidence:** S2 coverage matrix; S3 frontend/settings findings; no canonical branding model.

## 5. Deferred Decisions

| ID | Deferred subject | Blocking effect | Required resolution path |
|---|---|---|---|
| S4-ADR-028 | successor to legacy `OSEnablement` and exact commercial/operational lifecycle | canonical lifecycle schema, access composition and backfill | Governance ADR updating ADR-023/Freeze inputs |
| S4-ADR-037 | executable Marketplace, AI Expert and Global Platform scope | no current feature work in those contexts | Product authorization plus applicable feature lifecycle |

Physical technologies in S4-ADR-005, 006, 020, 021 and 032 are **Technical Spike Required**, not
silently resolved deferrals. Their logical obligations are fixed; product/tool selection is not.

## 6. Rejected Directions

| Direction | Reason | Authority/evidence |
|---|---|---|
| Initial microservices | No scale/team/operational evidence; modular monolith is frozen | ADR-033; Deployment Model §15; S3 readiness |
| Full rewrite | Working frontend boundaries and tests can support vertical replacement | Frontend-First Policy; S3 implemented/partial surfaces |
| Typed Workspace subclasses | Conflicts with canonical organization model | ADR-003/004; AGENTS §3 |
| BusinessUnit as canonical Business | Explicit canonical conflict | S2 CON-02; S3 GAP-001 |
| Canonical `OSEnablement` inferred from legacy code | ADR-023 explicitly defers successor | S2 CON-03; S3 GAP-004 |
| Browser storage as production authority | Cannot enforce tenancy/security/durability | S3 GAP-002/006 |
| Client flags/roles as authorization | Owning domain must enforce current context | ADR-034; S3 GAP-005 |
| Shared ownerless business module | Violates one-owner and OS independence | ADR-024/040; AGENTS §§4–6 |
| AI-first Business Brain | Violates deterministic ordering and human control | ADR-005–017/029–032 |

## 7. Product Decisions Required

| ID | Decision cluster | Required owner | Deadline |
|---|---|---|---|
| S4-ADR-019 | EasyCar application lifecycle and transitions | Product + domain owner | Before any workflow schema/API spec |
| S4-ADR-027 | plan limits, quotas, reset/overage/grandfathering | Product + Finance | Before entitlement enforcement/backfill |
| S4-ADR-039 | EasyCar MVP and Dealer/Finance/Broker concepts | Product + Architecture | Wave 0; before EasyCar work enters roadmap |
| S4-ADR-040 | portal identity/link/session/OTP/upload policy | Product + Security | Before portal/file contract |
| S4-ADR-041 | insurance obligation, owner and lifecycle | Product + domain owner | Before workflow decision closes |
| S4-ADR-042 | delegation, conditional manager review and Viewer role | Product + Identity/workflow owner | Before role/workflow backfill |
| S4-ADR-043 | car/inventory/reservation/deposit/bank ownership and phase | Product + Architecture | Before domain/API specification |
| S4-ADR-046 | internal/external subscription billing model | Product + Finance | Before production subscriptions |
| S4-ADR-047 | tenant branding scope and plan dependence | Product + Design | Before branding schema/entitlements |

No default business answer is authorized. The technical default while unresolved is to omit the
capability and reject unknown lifecycle/permission values rather than infer access or state.

## 8. Superseded Documentation

After this register is approved through Governance, the following claims should be labeled by
their owners as superseded or historical; Stage 4 does not edit them:

| Document/claim | Superseded by or subordinate to | Reason |
|---|---|---|
| `docs/NexoraXS_Platform_Documentation_v5_3_Final_Master_Architecture.md` “Final Master” authority | Freeze/ADR/Constitution hierarchy | S2 CON-01 |
| Specs 047–049 BusinessUnit-as-Business canonical claim | ADR-004 plus a future migration specification | S2 CON-02 |
| Specs 047–049 canonical `OSEnablement` claim | ADR-023 and future successor ADR | S2 CON-03 |
| Historical Product Hub-owned OS setup claims | ADR-019/020 and Core Freeze | S2 CON-04 |
| `shops-app`/separate restaurant/pharmacy app claims | current Commerce boundary | S2 CON-05/06 |
| Named Laravel/Sanctum/PostgreSQL/Redis as frozen technology | Core Technology Stack deferral plus future tech ADRs | S2 CON-08 |
| Mock Starter/Pro/Business limit values as product truth | ADR-022 and S4-ADR-027 Product decision | S3 GAP-019 |
| Browser handoff as production navigation contract | ADR-037 and S4-ADR-035 | S3 GAP-003 |

Historical files remain intact and retain provenance.

## 9. Proposed Source-of-Truth Hierarchy

1. `docs/99-architecture-freeze/`.
2. `docs/00-governance/ADR/` Accepted ADRs, glossary and Governance policy.
3. `docs/01-genesis/`.
4. Frozen milestone baselines (`docs/02-*` through `docs/07-*`).
5. `.specify/memory/constitution.md`.
6. `AGENTS.md` and `docs/11-execution/` engineering governance.
7. Approved feature `spec.md`, `plan.md`, `tasks.md`, contracts and design records.
8. Implementation/API/runbook/release evidence generated with the change.
9. Historical/proposal/archive/generated material as provenance only.

This ordering is retained from existing authority; the only proposed governance addition is a
maintained status/index surface that links superseded claims to their controlling successors.

## 10. Decision Register Verdict

The logical target is decidable and incremental: retained Next.js frontends, an enforced modular
monolith, canonical Workspace/Business hierarchy, owner-enforced security, versioned contracts,
private storage, deterministic Business Brain ordering and owner-correct Commerce modules.

The physical backend/database/storage/queue/recovery products are not approved by current
architecture and require five technical spikes. Two architecture subjects remain deferred,
including the critical `OSEnablement` successor. Nine clusters require Product decisions, so no
EasyCar workflow, tenant-type, plan-limit, portal, insurance, delegation, bank, billing-provider,
or branding assumption is treated as accepted.
