# Gap Analysis

## 1. Gap Summary

This report records differences between the documented architecture and the implementation at
commit `31937784e4b2c0951cff1d803ab1537835f6b14c` on 2026-07-18. It does not select a target
architecture, prescribe remediation, or begin migration planning.

The repository has a substantial frontend implementation and a disciplined set of frontend
boundaries, but it does not implement the production platform described by the frozen
architecture. The dominant executable model is a browser-local Core Platform and Commerce mock.
Several legacy concepts are deliberately retained by the frontend-first compatibility policy;
that policy explains their presence but does not make them canonical.

**Documentation source:** `docs/99-architecture-freeze/`,
`docs/00-governance/accepted/`, `docs/11-execution/05-FRONTEND-FIRST-POLICY.md`,
`docs/11-execution/06-MOCK-DATA-STANDARD.md`, and
`.specify/memory/constitution.md`. **Implementation evidence:** `apps/`, `packages/`, `tests/`,
root manifests/tooling, and the absence of backend, database, API, CI, and deployment runtime
areas. **Confidence:** High.

### 1.1 Reconciliation totals

| Measure | Count | Basis |
|---|---:|---|
| Major documented decisions verified | 50 | Stage 2 `DEC-01`–`DEC-50` |
| Major documented requirements verified | 30 | Stage 2 `REQ-01`–`REQ-30` |
| Implemented ledger items | 5 | 3 decisions and 2 requirements |
| Partially Implemented ledger items | 33 | 16 decisions and 17 requirements |
| Missing ledger items | 26 | 20 decisions and 6 requirements |
| Different ledger items | 11 | 7 decisions and 4 requirements |
| Unknown ledger items | 5 | 4 decisions and 1 requirement |
| Architecture drift clusters | 13 | §6 |
| Critical gaps | 6 | §8 |

The counts are classifications of the 80-item verification ledger, not percentages of all
possible platform behavior. **Documentation source:**
`docs/90-architecture-audit/03-DOCUMENTATION-AUDIT.md` §§5–6. **Implementation evidence:**
`docs/90-architecture-audit/04-IMPLEMENTATION-VERIFICATION.md` §§15–16. **Confidence:** High.

### 1.2 Gap register

| Gap | Classification | Severity | Documented expectation | Implementation evidence | Confidence |
|---|---|---|---|---|---|
| GAP-001 | Different | Critical | Canonical `Workspace -> Business -> Business Unit -> Department/Branch`; ADR-004 and Core Domain Model §§3–7 | `packages/types/src/core.ts`; `packages/shared/src/mock-db/schema.ts` omit Business and Department and label legacy BusinessUnit as Business | High |
| GAP-002 | Missing / Different | Critical | Server-enforced authentication, authorization, resource scope, tenant isolation; ADR-034 and Constitution VI | `apps/core-platform/lib/store/AppProvider.tsx` authenticates browser records/plain passwords; no server, middleware, policy, guard, or database exists | High |
| GAP-003 | Different | Critical | Signed, short-lived, opaque Product Hub handoff with reauthentication; ADR-037 and Core Domain Model §12 | `packages/sdk/src/commerce/integration/BrowserLegacyCommerceIntegrationStore.ts` persists client context; `packages/contracts/src/commerce/common/legacy-commerce-handoff.ts` accepts identifiers; no signature, expiry, or server validation | High |
| GAP-004 | Different | Critical | Entitlement, subscription, setup, activation, readiness, and access are separate; ADR-023 leaves the successor to `OSEnablement` unresolved | `packages/types/src/core.ts` and Core `AppProvider` make `OSEnablement` first-class and create it during plan/setup flows | High |
| GAP-005 | Missing | Critical | Permissions must be enforced by owning domains and consequential actions audited; ADR-034/038 | permission UI/constants exist, but no enforcement or append-only Audit runtime exists | High |
| GAP-006 | Missing | Critical | Production behavior requires governed APIs, durable persistence, server isolation, and owning-domain validation; Core Tech Stack §§4, 8–10 | `packages/sdk/src/commerce/runtime/createCommerceServices.ts` makes HTTP mode throw `http_unavailable`; all state is browser storage; no API routes/backend/database exist | High |
| GAP-007 | Missing | High | Business DNA, Capability Registry, Knowledge, Rules, deterministic Business Brain and Recommendations; Core/Brain freezes | no corresponding production entity, port, service, route, page, persistence, or test exists | High |
| GAP-008 | Different / Missing | High | Workspace Entitlement and OS Subscription are distinct; Core Domain Model §§10–11 | only `OSSubscription` and `OSEnablement` browser records exist; no Workspace Entitlement aggregate | High |
| GAP-009 | Different | High | Product owns identity/classification, not Price or Inventory; Commerce Final Review §7.2 | `packages/types/src/commerce.ts` Product combines price, cost and stock | High |
| GAP-010 | Different | High | Return validates and coordinates through owning domains; it does not own monetary, tax, document or stock writes; Commerce Final Review §7.2 | `apps/commerce/features/returns/application/LegacyReturnCreationService.ts` writes invoice return IDs and inventory positions/movements | High |
| GAP-011 | Different | High | Transfer owns transfer lifecycle while Inventory owns positions and movements; Commerce Final Review §7.2 | transfer completion directly writes inventory positions/movements in Commerce services | High |
| GAP-012 | Different / Missing | High | POS Transaction, Order, Payment, Tax and Document are separate owner facts; Commerce Final Review §7.2 | checkout coordinates Order and Invoice without POS Transaction/Payment/Tax aggregates and has no rollback/compensation after partial writes | High |
| GAP-013 | Missing | High | Versioned technology-independent API contracts and declared boundary failures; Constitution VII and Core Tech Stack §4 | contracts are expressly frontend-internal compatibility types and no HTTP/OpenAPI runtime exists | High |
| GAP-014 | Missing | High | Append-only Audit evidence and structured logs/metrics/traces/health/correlation; ADR-038 and Constitution IX | no Audit aggregate/store, logging, metrics, traces, health, or correlation implementation exists | High |
| GAP-015 | Partially Implemented | High | Arabic/English, RTL/LTR and accessibility apply from first user-facing implementation; ADR-039/040 | dictionaries, direction switching and selected tests exist; many hard-coded English strings and locale assumptions remain | High |
| GAP-016 | Partially Implemented | High | Canonical shared packages remain non-owning and apps do not cross-import; ADR-001/011 and AGENTS §16 | scanner reports no app cross-imports, but shared types/SDK carry legacy Core and Commerce owner-specific compatibility models | High |
| GAP-017 | Missing | High | Required checks and risk-appropriate contract/integration/E2E/security evidence gate delivery; AGENTS §14 | unit and static checks exist, but no CI workflows and no server tenancy/authorization/Audit/observability integration tests exist | High |
| GAP-018 | Partially Implemented | Medium | Product Hub composes owner projections and routes to OS-owned setup; Core Freeze §7 and ADR-037 | UI/projection boundaries exist, but browser origins cannot share localStorage and fresh Core onboarding creates no BusinessUnit required by the handoff URL | High |
| GAP-019 | Different | Medium | Plans are Product-owned and include an Enterprise tier; ADR-022 and Stage 2 plan requirements | browser catalog hard-codes Starter, Pro, Business with invented numeric limits and no Enterprise | High |
| GAP-020 | Partially Implemented | Medium | Core owns membership/auth foundations; Core Freeze §6 | member records and team UI exist; invitations and permission changes are component-local and unenforced | High |
| GAP-021 | Partially Implemented | Medium | Core owns settings, notification, storage and integration coordination; Core Freeze §6 | shell pages and local storage helpers exist; settings use timeout/toast behavior and no production coordination services exist | High |
| GAP-022 | Missing | Medium | Feature access derives from governed entitlement/subscription/access state rather than an ad hoc flag list; Core Domain Model §§10–12 | no feature-flag registry or evaluation service exists | High |
| GAP-023 | Missing | Medium | Production file storage follows governed, tenant-scoped storage coordination; Core Freeze §6 and Constitution VI | mock documents/images are browser values/data URLs; no object-storage adapter or server enforcement exists | High |
| GAP-024 | Missing | Medium | Background processing, notifications and resilient dependency behavior are defined at owning boundaries; Constitution IX | no queue, job, event bus, retry, timeout or dependency-isolation runtime exists | High |
| GAP-025 | Partially Implemented | Medium | Commerce modules own independent setup, workflow, reports and settings; Commerce Freeze | broad UI exists, but data is browser-local and several owner boundaries are collapsed | High |
| GAP-026 | Missing | Medium | Deployment, operations, monitoring, backup and recovery evidence accompany production operation; Constitution IX and Stage 2 coverage findings | no deployment, CI, monitoring, backup, recovery or runbook runtime/configuration exists | High |
| GAP-027 | Partially Implemented | Medium | Current feature artifacts and repository guidance remain synchronized; Documentation Policy and AGENTS §15 | Features 052–055 have evidence, while root `TESTING.md` describes only older Feature 044 scope | High |
| GAP-028 | Different | Low | Canonical identity is “Business Operating Intelligence Platform”; Genesis and AGENTS §2 | Landing copy uses “Business Operating Platform/System” | High |
| GAP-029 | Different | Low | Public commercial claims and in-product catalog share governed Product/Plan ownership; ADR-022 | Landing describes future paid plans as undefined while Core presents three paid tiers | High |
| GAP-030 | Partially Implemented | Low | Application/package documentation identifies actual owned surfaces; Documentation Policy | app READMEs are generic Next.js scaffolding and do not describe the implemented domain surfaces | High |
| GAP-031 | Different | Low | One workspace/package-manager baseline; ADR-001 | nested lockfiles/manifests coexist with the root pnpm workspace | Medium |
| GAP-032 | Missing | Low | Search, localization, notification, analytics intake and integration coordination are Core capabilities; Core Freeze §6 | only partial UI/local helpers exist; canonical coordination runtimes are absent | High |
| GAP-033 | Unknown | Low | Deferred global/AI/Marketplace policies require later approved implementation scope; relevant freezes and ADR-029–032 | no runtime exists from which prohibited behavior or completeness can be verified | High |

## 2. Implemented Features

These are implemented against the bounded requirement being verified; they do not imply that the
entire production platform is implemented.

| Area | Concrete implementation | Documentation source | Implementation evidence | Confidence |
|---|---|---|---|---|
| Commerce presets | Pharmacy and Restaurant/Cafe are presets/modules inside Commerce, not separate applications | ADR-015; Commerce Freeze | Commerce preset catalog and setup UI; no pharmacy or restaurant app directory | High |
| Browser repository boundary | Commerce components use repositories/application services rather than direct browser-storage access | Mock Data Standard §§5–8; Features 052–055 | `packages/sdk/src/commerce/products/BrowserStorageCommerceStore.ts`; Commerce service composition; architecture tests | High |
| App independence at import boundary | Applications do not directly import another application | ADR-011; AGENTS §§5–6 | `scripts/check-frontend-architecture.mjs` passed across 299 production files; app imports use packages | High |
| Monorepo frontend workspace | Landing, Core Platform and Commerce are separate pnpm/Turborepo applications | ADR-001; Engineering Roadmap | root `pnpm-workspace.yaml`, `turbo.json`, and three `apps/*/package.json` files | High |
| Frontend-first delivery mode | Executable product work is frontend-first and uses bounded browser mocks pending backend slices | Frontend-First Policy; Mock Data Standard | Next.js apps, SDK mock adapters, no backend runtime, and Feature 052–055 artifacts | High |

## 3. Partially Implemented Features

| Area | Implemented portion | Missing or different portion | Documentation source | Implementation evidence | Confidence |
|---|---|---|---|---|---|
| Core shell and Product Hub | navigation, catalog, cards, projections and launch/setup routes | canonical commercial/access composition and reliable cross-origin handoff | Core Freeze §§6–7; ADR-037 | Core routes/components and SDK projection/handoff adapters | High |
| Commerce workflows | products, customers, inventory, orders, invoices, returns, transfers, reports and settings UI | canonical fact ownership, durable writes and server validation | Commerce Freeze and Final Review §7.2 | `apps/commerce/` routes/services; `packages/types/src/commerce.ts` | High |
| Organization setup | Workspace, legacy BusinessUnit and Branch browser flows | canonical Business, canonical Business Unit and Department hierarchy | ADR-004; Core Domain Model §§3–7 | Core types/store/onboarding | High |
| Membership | member records, team page and permission matrix presentation | invitation lifecycle and owning-domain permission enforcement | Core Freeze §6; ADR-034 | `WorkspaceMember` and Core team components | High |
| Authentication | browser login/session UX | server authentication, secure credentials, sessions, authorization and reauthentication | ADR-034/037; Constitution VI | Core `AppProvider`; local/session storage | High |
| Multi-tenancy | repository queries commonly accept workspace/business-unit identifiers | identifiers are client filters, not server authorization or isolation | ADR-034 | Commerce scope contracts/repositories; no server boundary | High |
| Localization | Arabic/English dictionaries and direction switching | complete string coverage, consistent locale formatting and full test coverage | ADR-039/040 | app dictionaries/layouts plus hard-coded English occurrences | High |
| Accessibility | selected semantic and E2E checks | repository-wide critical-flow evidence | ADR-040; AGENTS §14 | UI primitives and selected Playwright checks | Medium |
| Testing | 277 unit/contract/architecture tests pass; E2E suites exist | production backend, security, Audit, observability, migration and CI evidence | Core Tech Stack §6; AGENTS §14 | Vitest/Playwright configs, `tests/`, no CI | High |
| Architecture enforcement | static import/storage/composition/owner checks | semantic canonical-owner and lifecycle violations are outside scanner coverage | ADR-011; Constitution V/VII | `scripts/check-frontend-architecture.mjs` passes despite GAP-001/004/009–012 | High |
| Contracts and SDK | typed frontend ports, DTO-like compatibility records, adapters and error results | public versioned HTTP contracts and a working HTTP adapter | Constitution VII; Features 052–055 | `packages/contracts/`, `packages/sdk/`; HTTP mode throws unavailable | High |
| Storage | browser repository isolates local/session-storage calls | durable, tenant-scoped, encrypted/controlled production persistence | Mock Data Standard; Constitution VI | BrowserStorageCommerceStore and Core browser stores | High |
| Reports | derived Commerce report views | production data source, authorization, auditability and scale behavior | Commerce Freeze | report services/pages derive browser data | High |
| Settings | settings forms and user feedback | persisted canonical settings and owning coordination service | Core Freeze §6; Commerce Freeze | settings handlers primarily use local state/timeouts/toasts | High |

## 4. Missing Features

“Missing” means required by the cited documentation but absent from the inspected implementation.
It does not assert that the item belongs in the current delivery milestone.

| Area | Documented expectation | Documentation source | Implementation evidence | Confidence |
|---|---|---|---|---|
| Canonical Business hierarchy | Business and Department plus canonical parent relations | ADR-004; Core Domain Model §§3–7 | no corresponding types, stores, services, routes or tests | High |
| Business DNA | one versioned Business-owned DNA model | ADR-005; Core/Brain freezes | no Business DNA implementation symbols or persistence | High |
| Capability/Knowledge/Rules | platform-owned versioned assets feeding deterministic decisions | ADR-006–008; Brain Freeze | no registries, publishers, rule runtime or versions | High |
| Business Brain | deterministic decision and advisory output pipeline | ADR-009; Brain Freeze | no Brain decision service, entity, UI, persistence or tests | High |
| Recommendations | explainable optional recommendations downstream of decisions | ADR-010; Brain Freeze | no recommendation engine/candidate implementation | High |
| Server/API | versioned owner APIs with validation/failure semantics | Constitution VII; Core Tech Stack §4 | no route handlers, controllers, middleware, OpenAPI or backend source | High |
| Database | durable Workspace-scoped persistence and owner schemas | Constitution VI; Core Tech Stack §§8–9 | no migrations/schema/database runtime | High |
| Production auth | secure credentials, sessions, authorization and resource checks | ADR-034; Constitution VI | only browser mock authentication exists | High |
| Permission enforcement | owner-boundary authorization | ADR-034 | only UI/constants; no guard/policy/server checks | High |
| Append-only Audit | actor/context/correlation/outcome evidence | ADR-038 | no Audit entity/store/service | High |
| Observability | logs, metrics, traces, health and correlation | Constitution IX | no implementation or infrastructure | High |
| Workspace Entitlement | commercial entitlement separate from subscription/access | ADR-022/023; Core Domain Model §§10–12 | no aggregate or service | High |
| Public contract evolution | versioned compatible API/event contracts | Constitution VII; AGENTS §10 | frontend compatibility contracts explicitly disclaim HTTP/canonical status | High |
| CI/CD and deployment | automated gates and deployment topology | AGENTS §14; Constitution IX | no `.github/workflows`, Docker, deploy config or pipelines | High |
| Backup/recovery | operational protection for production state | Constitution IX | no persistent production state or operational artifacts | High |
| Marketplace runtime | frozen Marketplace bounded context | ADR-027/028; Marketplace Freeze | no Marketplace implementation | High |
| AI Expert runtime | governed AI downstream of completed decisions | ADR-029–032; AI Expert Freeze | no AI runtime | High |

## 5. Undocumented Features

These executable behaviors are not established as canonical behavior by the frozen architecture.
Some are explicitly temporary compatibility behavior rather than accidental additions.

| Behavior | Implementation evidence | Documentation relationship | Confidence |
|---|---|---|---|
| Plain browser credential comparison | Core `AppProvider` creates and compares a stored password value | permitted only as mock behavior; conflicts with production security requirements in ADR-034 | High |
| Three hard-coded plan records and numeric limits | `packages/shared/src/mock-db/schema.ts` | ADR-022 establishes Product/Plan ownership but not these Starter/Pro/Business values | High |
| BusinessUnit presented as “Business” | shared dictionary and Core/Commerce UI | explicitly protected legacy seam in Frontend-First Policy §11; contradicts ADR-004 if canonicalized | High |
| First-class `OSEnablement` active/disabled/locked record | `packages/types/src/core.ts` and Core store/provider | legacy seam protected; canonical successor explicitly unresolved by ADR-023 | High |
| Client-generated handoff context | Core handoff URL/store and Commerce ingress | browser compatibility behavior; not the signed handoff required by ADR-037 | High |
| Component-local invitations and permission edits | Core team components | UI demonstration is not a documented canonical membership/authorization lifecycle | High |
| Timeout/toast settings saves | Core and Commerce settings pages | presentation behavior does not establish a settings write contract | High |
| Data-URL/browser document storage | mock repositories and fixtures | Mock Standard permits browser data; production storage contract remains absent | High |
| Order checkout partial-commit behavior | checkout service notes no rollback/compensation | no frozen decision authorizes partial canonical commits | High |
| Cross-owner invoice and inventory mutations | Return and Transfer services | contradicts Commerce owner matrix rather than defining a new accepted feature | High |

The prompt also names EasyCar, dealer/finance/broker tenants, cars, offers, insurance, vehicle
change requests, portal sessions, bank module, and states such as `waiting`, `need_docs`, `insured`,
`no_insurance`, `archived`, and `reject`. Stage 2 found no authoritative NexoraXS requirements for
those concepts, and Stage 3 found no implementation. They therefore remain **Unknown**, not
missing documented requirements. **Documentation source:**
`03-DOCUMENTATION-AUDIT.md` §§8, 9, 11. **Implementation evidence:** repository-wide symbol and
path search. **Confidence:** High.

## 6. Architecture Drift

| Drift | Canonical authority | Actual implementation | Classification | Confidence |
|---|---|---|---|---|
| AD-01 Platform identity | Genesis; AGENTS §2 | Landing omits “Intelligence” | Different | High |
| AD-02 Organization hierarchy | ADR-004; Core Domain Model | Workspace -> legacy BusinessUnit -> Branch | Different | High |
| AD-03 OS lifecycle | ADR-023; Core Domain Model | first-class OSEnablement and collapsed plan/setup/access behavior | Different | High |
| AD-04 Plan catalog | ADR-022 | hard-coded Starter/Pro/Business catalog, Enterprise absent | Different | High |
| AD-05 Core ownership ingress | Core Freeze; ADR-037 | Commerce browser compatibility adapter creates Core-shaped records | Different | High |
| AD-06 Product ownership | Commerce Final Review §7.2 | Product includes price/cost/stock | Different | High |
| AD-07 Return ownership | Commerce Final Review §7.2 | Return service mutates Invoice and Inventory stores | Different | High |
| AD-08 Transfer ownership | Commerce Final Review §7.2 | Transfer completion mutates Inventory stores | Different | High |
| AD-09 POS/financial ownership | Commerce Final Review §7.2 | Order/Invoice checkout replaces separate POS Transaction, Payment and Tax facts | Different | High |
| AD-10 Product Hub handoff | ADR-037 | client identifier query/context with no signature or expiry | Different | High |
| AD-11 Shared-package ownership | ADR-011; AGENTS §16 | shared types/SDK contain legacy owner-specific compatibility models | Partially Implemented | High |
| AD-12 Data-driven platform assets | Core Freeze; Business Brain Freeze | plans/presets are hard-coded; capabilities/knowledge/rules absent | Different / Missing | High |
| AD-13 Contract/runtime boundary | Constitution VII; Core Tech Stack §4 | frontend-internal types are the only contracts and HTTP mode is unavailable | Missing | High |

The count is 13 drift clusters. Temporary compatibility status is an explanation, not a
reclassification of canonical alignment. **Documentation source:** Frontend-First Policy §11 and
Mock Data Standard §8. **Implementation evidence:** compatibility comments in `packages/contracts`
and `packages/sdk`. **Confidence:** High.

## 7. Documentation Drift

| ID | Documentation claim or condition | Implementation evidence | Classification | Confidence |
|---|---|---|---|---|
| DD-01 | Landing public text describes NexoraXS without the canonical “Intelligence” identity | landing page content | Different | High |
| DD-02 | Landing pricing says paid plans are future/undefined | Core browser app exposes three plan tiers and limits | Different | High |
| DD-03 | App READMEs remain default Next.js guidance | apps contain extensive domain pages/providers/services | Partially Implemented | High |
| DD-04 | root `TESTING.md` centers Feature 044 validation | repository includes later Feature 050–055 tests/evidence | Partially Implemented | High |
| DD-05 | Some roadmap/release prose claims architecture-complete/frozen platform maturity | runtime remains frontend mock without canonical server capabilities | Different as implementation-status implication; freezes remain authoritative architecture | High |
| DD-06 | Feature 052–055 documents explicitly describe bounded legacy seams and missing backend enforcement | implementation matches those limitations | Implemented claim | High |
| DD-07 | Root package/manifests define pnpm/Turborepo workspace | nested lockfiles/manifests create secondary installation state | Different | Medium |

**Documentation source:** Genesis, Engineering Roadmap, Frontend-First Policy, Mock Data Standard,
Features 052–055, app READMEs, `TESTING.md`. **Implementation evidence:** landing/Core UI, root and
nested manifests, current tests/source. **Confidence:** High except where marked Medium.

## 8. Critical Gaps

### GAP-001 — Canonical organization model is not executable

The frozen hierarchy requires distinct Workspace, Business, Business Unit, Department, and
Branch concepts. The implementation has Workspace, a legacy BusinessUnit directly under it, and
Branch. UI translations present that BusinessUnit as “Business.” No Business or Department
aggregate exists. This prevents implementation-level verification of Business ownership,
Business DNA attachment, canonical OS scope, and complete organization authorization context.

- **Documentation source:** ADR-004; Core Platform Domain Model §§3–7; Core Freeze §5; AGENTS §3.
- **Implementation evidence:** `packages/types/src/core.ts`,
  `packages/shared/src/mock-db/schema.ts`, Core onboarding/provider, and absence of Business and
  Department runtime models.
- **Classification:** Different.
- **Confidence:** High.

### GAP-002 — Production identity, authorization, and isolation are absent

The current sign-up and login path creates browser records and compares a browser-stored password
value. Repository scopes filter client-side identifiers. There is no server authentication,
session authority, policy/guard layer, trusted membership check, or server-enforced Workspace and
resource isolation. Therefore an identifier supplied by the browser is functionally trusted by
the mock.

- **Documentation source:** ADR-034; Constitution VI; Core Freeze §6; AGENTS §§6, 11, 17.
- **Implementation evidence:** `apps/core-platform/lib/store/AppProvider.tsx`, Core browser stores,
  Commerce repository scope objects, and absence of middleware/controllers/policies/backend.
- **Classification:** Missing / Different.
- **Confidence:** High.

### GAP-003 — Product Hub handoff is neither secure nor operationally coherent across apps

The documented handoff is signed, short-lived, opaque, and reauthenticated at the target. The
implementation transports client identifiers and persists a client-provided context without
signature, expiry, replay control, or server validation. Fresh Core onboarding does not create
the legacy BusinessUnit required by the handoff builder, so it can route back to Product Hub.
Core and Commerce normally run on different origins (`:3001` and `:3002`); browser localStorage
records written on one origin cannot satisfy projections on the other. Commerce ingress creates
some projection state only in memory, so a reload can lose it.

- **Documentation source:** ADR-037; Core Platform Domain Model §12; Product Hub ownership in
  Core Freeze §7.
- **Implementation evidence:** Core Product Hub/setup link builder, Core onboarding provider,
  `packages/sdk/src/commerce/integration/BrowserLegacyCommerceIntegrationStore.ts`, Commerce
  handoff ingress and app scripts.
- **Classification:** Different / Missing.
- **Confidence:** High.

### GAP-004 — Unresolved OS lifecycle is implemented as canonical browser state

The architecture separates entitlement, subscription, installation, setup, activation,
readiness, operational access, pause, archive, and removal. ADR-023 explicitly leaves the
successor to legacy `OSEnablement` unresolved. The browser model nevertheless defines
`OSEnablement` and creates/updates it during plan selection and organization setup. That makes an
unresolved compatibility record participate in executable access/setup decisions.

- **Documentation source:** ADR-023; Core Platform Domain Model §§10–12; AGENTS §8.
- **Implementation evidence:** `packages/types/src/core.ts`, Core browser store and
  `apps/core-platform/lib/store/AppProvider.tsx`.
- **Classification:** Different.
- **Confidence:** High.

### GAP-005 — Permission presentation exists without permission enforcement or Audit

The Core UI presents team roles and permission matrices, but no owning-domain policy validates a
command against those permissions. Consequential browser changes produce no append-only Audit
record with actor, scope, correlation, decision, and outcome. Authentication UX therefore cannot
establish authorization compliance.

- **Documentation source:** ADR-034; ADR-038; Constitution VI and IX; AGENTS §11.
- **Implementation evidence:** Core team/permission components; absence of policy, guard, Audit
  aggregate/store/service and Audit tests.
- **Classification:** Missing.
- **Confidence:** High.

### GAP-006 — No production execution boundary or durable state exists

All executable domain state is stored in localStorage/sessionStorage or React memory. The SDK's
HTTP mode returns `http_unavailable`. No route handler, controller, backend framework source,
database schema/migration, queue, server-side validation, deployment topology, or runtime health
surface exists. The repository can demonstrate frontend behavior but cannot meet the documented
production ownership, isolation, durability, recovery, or operability requirements.

- **Documentation source:** Constitution V–IX; Core Tech Stack §§4, 6, 8–10; Engineering
  Roadmap; AGENTS §§10–14.
- **Implementation evidence:** `packages/sdk/src/commerce/runtime/createCommerceServices.ts`, browser
  stores, and complete inventory showing no backend/database/API/infrastructure runtime.
- **Classification:** Missing.
- **Confidence:** High.

## 9. High Gaps

| Gap | Effect visible in current architecture | Documentation source | Implementation evidence | Confidence |
|---|---|---|---|---|
| GAP-007 | Canonical intelligence sequence cannot execute or be verified | Core/Brain freezes; ADR-005–010 | no DNA/Capability/Knowledge/Rule/Decision/Recommendation runtime | High |
| GAP-008 | Commercial entitlement cannot be distinguished from subscription/access | ADR-022/023; Core Domain Model | OSSubscription and OSEnablement only | High |
| GAP-009 | Product becomes an owner of Price and stock facts | Commerce Final Review §7.2 | combined Product type and product services | High |
| GAP-010 | Return writes facts owned by Invoice and Inventory | Commerce Final Review §7.2 | return service direct repository mutations | High |
| GAP-011 | Transfer writes Inventory positions and movements directly | Commerce Final Review §7.2 | transfer completion service | High |
| GAP-012 | POS/Payment/Tax facts are absent and multi-write checkout can partially commit | Commerce Final Review §7.2; Constitution IX | checkout service and combined Order/Invoice types | High |
| GAP-013 | Consumers have no public/versioned production contract to verify | Constitution VII; Core Tech Stack §4 | frontend-internal contracts; unavailable HTTP adapter | High |
| GAP-014 | Consequential operations have no production Audit or telemetry evidence | ADR-038; Constitution IX | no Audit/observability source or tests | High |
| GAP-015 | Bilingual/a11y policy is not uniformly evidenced across current UI | ADR-039/040 | partial dictionaries/tests plus hard-coded strings | High |
| GAP-016 | Compatibility packages carry canonical-looking owner-specific shapes | ADR-011; AGENTS §16 | types/contracts/SDK compatibility exports | High |
| GAP-017 | Passing local checks cannot establish production delivery readiness | AGENTS §14; Core Tech Stack §6 | unit/static tests pass; CI/security/integration evidence absent | High |

## 10. Medium Gaps

| Gap | Effect visible in current architecture | Documentation source | Implementation evidence | Confidence |
|---|---|---|---|---|
| GAP-018 | Product Hub composition cannot reliably observe Commerce setup across normal origins | Core Freeze §7; ADR-037 | separate ports and origin-local browser stores | High |
| GAP-019 | In-product plan names and limits are not traceable to a canonical catalog | ADR-022 | hard-coded mock plan array | High |
| GAP-020 | Membership UI can imply authority not enforced at the owner boundary | ADR-034 | local team state and permission constants | High |
| GAP-021 | Settings/notification/integration surfaces are mostly presentation demonstrations | Core Freeze §6 | timeouts, toasts and local state | High |
| GAP-022 | Feature availability has no governed evaluator | Core Domain Model §§10–12 | no feature-flag/capability-access service | High |
| GAP-023 | Document/file state lacks production tenant-scoped storage semantics | Constitution VI; Core Freeze §6 | browser values/data URLs | High |
| GAP-024 | No asynchronous/resilience behavior can be verified | Constitution IX | no jobs/events/queues/retry runtime | High |
| GAP-025 | Commerce is broad in UI coverage but incomplete as canonical owner implementation | Commerce Freeze | browser services plus owner collapses | High |
| GAP-026 | Operational readiness claims cannot be tested | Constitution IX | no deployment/monitoring/backup/recovery artifacts | High |
| GAP-027 | General testing guidance trails the current feature evidence | Documentation Policy | root `TESTING.md` versus Features 050–055/tests | High |

## 11. Low Gaps

| Gap | Effect visible in current architecture | Documentation source | Implementation evidence | Confidence |
|---|---|---|---|---|
| GAP-028 | Public identity is terminologically inconsistent | Genesis; AGENTS §2 | Landing copy | High |
| GAP-029 | Public and in-app commercial messages conflict | ADR-022 | Landing pricing versus Core plans | High |
| GAP-030 | Module onboarding docs do not describe actual surfaces | Documentation Policy | generic app READMEs | High |
| GAP-031 | Install state can diverge between root and nested package metadata | ADR-001 | nested lockfiles/manifests | Medium |
| GAP-032 | Several Core coordination capabilities have only shell-level representation | Core Freeze §6 | no search/analytics/integration coordination runtime | High |
| GAP-033 | Future Marketplace/AI policy compliance is not executable and thus cannot be assessed | relevant freezes and ADR-029–032 | no runtime | High |

Severity expresses architectural and production consequence, not delivery sequence. Marketplace
and AI absence is Low for current implementation scope because the Engineering Roadmap identifies
them as later work; the frozen architecture remains authoritative for any future implementation.
**Documentation source:** Engineering Roadmap and relevant freezes. **Implementation evidence:**
current source inventory. **Confidence:** High.

## 12. Dependency Risks

| Risk | Dependency relationship | Evidence | Likelihood | Impact | Confidence |
|---|---|---|---|---|---|
| DR-01 | Business DNA and OS scope depend on the missing canonical Business/Business Unit hierarchy | ADR-004; Brain Freeze; absent Business model | High | Critical | High |
| DR-02 | Product Hub access composition depends on entitlement, subscription, setup/readiness and authorization facts that are missing or conflated | Core Domain Model §§10–12; browser OSEnablement flow | High | Critical | High |
| DR-03 | Commerce launch/setup depends on cross-origin Core identity/projection state that browser storage cannot share | ADR-037; app ports and localStorage adapters | High | Critical | High |
| DR-04 | Any backend adapter would depend on public contracts that do not yet exist; current records disclaim that role | Constitution VII; contracts package comments | High | High | High |
| DR-05 | Permission enforcement depends on canonical membership/resource scopes and owning-domain server boundaries | ADR-034; UI-only permission model | High | Critical | High |
| DR-06 | Business Brain decisions depend on versioned DNA, Capabilities, Knowledge and Rules, all absent | Brain Freeze ordering; no runtime | High | High | High |
| DR-07 | Recommendation and AI behavior depends on completed deterministic decisions and authorization evidence | ADR-029–032; no Brain/Audit runtime | High | High | High |
| DR-08 | Commerce checkout consistency depends on separate Order, Inventory, Payment, Tax and Document owner contracts | Commerce Final Review §7.2; partial browser multi-write flow | High | High | High |
| DR-09 | Audit and observability evidence depends on trusted actor/context/correlation at a server boundary | ADR-038; browser-only execution | High | High | High |
| DR-10 | Production testing depends on backend, database, contract and deployment surfaces that do not exist | AGENTS §14; test inventory | High | High | High |
| DR-11 | Localization completeness depends on all user-facing strings using a translation path | ADR-039; hard-coded UI strings | Medium | Medium | High |
| DR-12 | Static architecture validation depends on encoded rules and therefore does not detect canonical semantic drift | Constitution Checks; scanner scope | High | High | High |

## 13. Technical Debt

This section records present implementation obligations and liabilities; it does not prescribe a
repair plan.

| Debt | Current form | Architecture/documentation authority | Affected surfaces | Confidence |
|---|---|---|---|---|
| TD-01 Legacy organization vocabulary | BusinessUnit storage shown as Business | ADR-004; Frontend-First Policy §11 | Core, Commerce, contracts, SDK, tests | High |
| TD-02 Legacy lifecycle record | first-class OSEnablement browser model | ADR-023; Frontend-First Policy §11 | types, Core provider/store, Product Hub | High |
| TD-03 Browser identity model | plain credential and client session state | ADR-034 | Core auth, all scoped repositories | High |
| TD-04 Browser persistence coupling | local/session-storage keys are runtime integration contracts | Mock Data Standard | Core/Commerce state and tests | High |
| TD-05 Origin coupling | Core projections and Commerce data live in different origin stores | ADR-037 | Product Hub and setup handoff | High |
| TD-06 Contract promotion risk | internal compatibility shapes resemble reusable platform types | Constitution VII; package comments | types/contracts/SDK consumers | High |
| TD-07 Product aggregate collapse | price/cost/stock embedded in Product | Commerce owner matrix | catalog, inventory, POS, reports | High |
| TD-08 Cross-owner mutation | Return and Transfer write other owner stores | Commerce owner matrix | inventory, invoices, returns, transfers | High |
| TD-09 Partial commit exposure | checkout has sequential writes without rollback/compensation | Constitution IX | orders, inventory, invoices | High |
| TD-10 UI-only permissions | presentation state has no enforcement | ADR-034 | team, settings, all commands | High |
| TD-11 No Audit/telemetry seam | browser operations produce no trusted evidence | ADR-038; Constitution IX | all consequential actions | High |
| TD-12 Hard-coded platform data | plan/preset catalog compiled into mock schema | Core/Commerce freezes | Product Hub, onboarding, setup | High |
| TD-13 Incomplete localization path | literal English and locale-specific formatting | ADR-039/040 | user-facing pages/components | High |
| TD-14 Documentation lag | generic READMEs and older testing overview | Documentation Policy | developer workflow | High |
| TD-15 Delivery automation absence | no CI/deployment runtime | AGENTS §14; Constitution IX | repository-wide delivery | High |

## 14. Readiness Assessment

### 14.1 Readiness by boundary

| Boundary | Readiness | Evidence-based assessment | Documentation source | Implementation evidence | Confidence |
|---|---|---|---|---|---|
| Frontend interaction prototype | Partially Implemented | broad Core/Commerce journeys, state views and automated tests exist | Frontend-First Policy; Engineering Roadmap | three Next.js apps and tests | High |
| Frontend architecture enforcement | Partially Implemented | package/import/storage rules pass; semantic owner rules are incomplete | ADR-011; Constitution V | passing architecture scanner plus AD-02–13 | High |
| Canonical Core domain | Missing / Different | canonical hierarchy, entitlement and intelligence plane are absent or replaced by legacy shapes | Core Freeze; ADR-004/023 | Core types/provider/store | High |
| Canonical Commerce domain | Partially Implemented / Different | many workflows exist, but several fact owners are collapsed or crossed | Commerce Freeze | Commerce types/services | High |
| Cross-application integration | Different | handoff/projections are browser-local and insecure/unreliable across origins | ADR-037 | app ports and browser adapters | High |
| Production security | Missing | no server auth, authorization, isolation, Audit or protected storage | ADR-034/038 | no backend/security runtime | High |
| Production data | Missing | no database, migrations, durable owner schemas, backup or recovery | Constitution VI/IX | browser persistence only | High |
| Production API/contracts | Missing | no server API and frontend records are not public contracts | Constitution VII | unavailable HTTP mode | High |
| Production operations | Missing | no deployment, CI, health, telemetry, recovery or runbooks tied to runtime | Constitution IX | absent infrastructure/CI | High |
| Business DNA/Brain | Missing | required deterministic intelligence sequence has no executable surface | Brain Freeze | no implementation | High |
| Marketplace/AI/global runtime | Unknown / Missing | architecture exists, but current roadmap treats these as later and no runtime is present | relevant freezes; Engineering Roadmap | no implementation | High |

### 14.2 Overall readiness finding

The repository is demonstrably ready as a frontend-first interaction and boundary prototype for
selected Core and Commerce journeys. It is not verifiably ready as a production multi-tenant
Business Operating Intelligence Platform because the trusted server, canonical organization and
commercial models, public contracts, durable owner state, security enforcement, Audit,
observability, and operations surfaces do not exist. Commerce has greater executable breadth than
Core's intelligence plane, but its current aggregates do not fully match the frozen owner matrix.

**Documentation source:** Genesis; Core/Brain/Commerce freezes; Constitution; Frontend-First
Policy. **Implementation evidence:** sections 1–13 and
`04-IMPLEMENTATION-VERIFICATION.md`. **Confidence:** High.

This assessment does not convert future-scope absence into a delivery failure. It distinguishes
current frontend value from production and canonical architecture readiness.

## 15. Stage 4 Inputs

The following are evidence packages for a later planning stage. They are not migration steps or
recommendations.

| Input | Current implementation fact | Canonical/documented fact | Dependencies or unresolved authority | Evidence set | Confidence |
|---|---|---|---|---|---|
| S4-01 Organization model | Workspace -> legacy BusinessUnit -> Branch | Workspace -> Business -> Business Unit -> Department/Branch | ADR-004; compatibility restriction against silent rename | Core types/store/provider; ADR-004; Core Domain Model | High |
| S4-02 Commercial lifecycle | OSSubscription + OSEnablement drive browser setup/access | Entitlement, subscription, setup, activation, readiness and access are distinct | ADR-023 successor remains unresolved | types/provider/Product Hub; ADR-022/023 | High |
| S4-03 Handoff | client IDs/browser context across separate origins | signed short-lived opaque handoff plus reauthentication | requires trusted identity and public contract boundary | Core/Commerce handoff code; ADR-037 | High |
| S4-04 Production identity | browser credentials and client scopes | server auth, membership, authorization and tenant/resource isolation | canonical organization/resource scopes | Core provider/repositories; ADR-034 | High |
| S4-05 Contracts | frontend-internal compatibility records | versioned technology-independent APIs/events | no approved public DTO set exists | contracts/SDK comments; Constitution VII | High |
| S4-06 Persistence | browser local/session storage | durable owner-scoped state with recovery | backend/database technology details remain implementation decisions where deferred | stores; Core Tech Stack register | High |
| S4-07 Product ownership | Product includes price/cost/stock | Product, Pricing and Inventory have separate fact ownership | canonical Commerce service contracts absent | Commerce types/services; owner matrix | High |
| S4-08 Return/Transfer | services directly mutate Inventory/Invoice | owner validates/writes canonical state through contracts | owner command/idempotency/failure contracts absent | services; Commerce Final Review | High |
| S4-09 Checkout | sequential Order/Inventory/Invoice browser writes | separate POS/Order/Payment/Tax/Document owners | transaction/compensation and command decisions required | checkout service; Commerce owner matrix | High |
| S4-10 Business intelligence | no runtime | DNA -> Capability -> Knowledge/Rules -> Brain Decision -> Recommendation | depends on canonical Business and immutable versioning | Brain/Core freezes; source absence | High |
| S4-11 Audit/observability | no trusted evidence | append-only Audit plus logs/metrics/traces/health/correlation | depends on server actor/context and owner commands | ADR-038; source absence | High |
| S4-12 Localization/a11y | partial dictionaries/direction/tests | full Arabic/English, RTL/LTR and accessible critical flows | complete UI inventory/test criteria | ADR-039/040; UI/tests | High |
| S4-13 Testing/delivery | local unit/static/E2E suites | risk-appropriate unit/contract/integration/E2E/security/Audit/ops gates | production surfaces and CI are absent | tests/config; AGENTS §14 | High |
| S4-14 Future contexts | no Marketplace/AI/global runtime | frozen bounded contexts and deferred policies | current delivery scope does not authorize implicit implementation | freezes; Engineering Roadmap | High |

The unresolved status of ADR-023 and any other Deferred Decision is a Stage 4 input constraint.
This is recorded by the authority hierarchy, not proposed as a planning outcome. **Documentation
source:** ADR-023; AGENTS §§1, 8, 15. **Implementation evidence:** first-class browser
`OSEnablement`. **Confidence:** High.

## 16. Gap Analysis Verdict

The implementation is aligned with the repository's documented frontend-first mode and has
meaningful structure: separate apps, typed frontend boundaries, ports/adapters, repository-based
browser storage, feature-level tests, and static dependency checks. The major reconciliation gap
is between that frontend mock and the frozen canonical/production architecture.

Six critical gaps prevent a claim of canonical production readiness: the organization model,
trusted identity and isolation, secure/reliable handoff, resolved commercial/OS lifecycle,
permission enforcement with Audit, and a production execution/persistence boundary. Thirteen
architecture drift clusters show where current executable concepts differ from or fall short of
frozen ownership and lifecycle rules. The Business DNA and deterministic Business Brain sequence
is wholly absent, while Commerce operational UI is broad but crosses or collapses several
canonical owner boundaries.

**Documentation source:** frozen architecture and Accepted ADRs cited in §§1–15.
**Implementation evidence:** repository implementation/configuration/test corpus and
`04-IMPLEMENTATION-VERIFICATION.md`. **Confidence:** High.
