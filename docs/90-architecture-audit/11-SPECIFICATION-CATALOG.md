# Specification Catalog


> **Execution Scope Decision — 2026-07-18**
> EasyCar is a separate standalone application and is excluded from the current NexoraXS Core + Commerce execution plan.
> No EasyCar feature, dependency, milestone, sprint, backlog item, release gate, or implementation task is authorized by this document set.
> EasyCar will have its own repository/application architecture, audit, roadmap, specifications, backlog, and release plan.

## 1. Purpose and Use

This file is a planning index, not a set of approved `spec.md` files. Each entry defines the
minimum content a future Spec Kit specification must resolve. Implementation remains prohibited
until the feature is Ready, its dependencies and Stage 4 gates pass, and its own specification,
plan and tasks are approved.

Feature metadata, surfaces, priorities and direct dependencies are controlled by
`10-FEATURE-CATALOG.md`. The entries below cover all 32 catalog features.

## 2. Governance and Runtime Foundation Specifications

### F056 — Governance, Technology and Product Decision Gate

- **Status / priority / release:** Ready / Critical / Alpha entry.
- **Purpose:** convert Stage 4 proposals into approved, rejected, deferred or explicitly blocked decisions with named owners.
- **Scope:** backend/database/auth/storage/queue/recovery spikes; ADR-023 routing; Product decisions PD-01–09; data classification; compatibility baseline.
- **Business rules:** no report self-approves; no product assumption becomes a default; spikes use no customer data.
- **UI:** none required; an optional read-only readiness dashboard cannot become authority.
- **Backend / database / infrastructure:** isolated disposable spike environments only; no canonical schema or production service.
- **API:** none; spike contracts are evidence, not public APIs.
- **Permissions:** Governance approver, Product Owner, Architect, Security, Data and Operations responsibilities are explicit.
- **Validation:** every decision has status, exact authority, owner, date/deadline, consequences, rollback/exit path and blocked boundary.
- **Events / notifications:** decision disposition may notify accountable owners; no runtime domain event.
- **Acceptance criteria:** five technology-spike decisions and nine Product clusters have recorded dispositions; ADR-023 remains blocked unless Governance closes it; real/demo data provenance is known.
- **Tests:** link/status/count checks, spike isolation, current test/build baseline, backup evidence for any material pilot data.
- **Dependencies:** reports 00–14 and Governance availability.
- **Open questions:** approvers, evaluation time boxes, physical products, RPO/RTO and Product decision answers.

### F057 — CI/CD and Developer Quality Spine

- **Status / priority / release:** Blocked / Critical / Alpha.
- **Purpose:** produce repeatable evidence for every current and future change.
- **Scope:** clean install, lint, types, unit, architecture, contract, build, artifact and release-promotion gates.
- **Business rules:** a green pipeline cannot waive tenant/security/domain evidence; protected artifacts are immutable and traceable.
- **UI:** developer feedback/check summaries only.
- **Backend / database / infrastructure:** runner isolation, caches, artifact store, protected environments and least-privilege secrets; no domain schema.
- **API:** check/result manifest for release evidence; no product API.
- **Permissions:** repository maintainers configure; release approvers promote; runners cannot access unrelated production secrets.
- **Validation:** clean checkout reproduces all required commands and rejects secret/config/architecture violations.
- **Events / notifications:** build/release status notifications with safe metadata.
- **Acceptance criteria:** current frontend checks pass in CI; failed required checks block merge; artifacts identify commit/config; promotion requires approval.
- **Tests:** pipeline positive/negative, cache poisoning, secret exposure, artifact integrity and rollback-selection tests.
- **Dependencies:** F056 technology/owner disposition.
- **Open questions:** CI product, runner hosting, retention and branch/release approval rules.

### F058 — Modular Backend Runtime Foundation

- **Status / priority / release:** Blocked / Critical / Alpha.
- **Purpose:** establish the trusted modular-monolith execution boundary.
- **Scope:** framework bootstrap, Core/Commerce module shells, dependency enforcement, configuration, health, migration runner, composition and adapter boundaries.
- **Business rules:** one owner per write model; no foreign tables/services; contracts and context are framework-independent.
- **UI:** none.
- **Backend / database / infrastructure:** approved backend runtime; isolated relational adapter; environment/secret boundary; no customer aggregates yet.
- **API:** health/readiness and one non-domain contract-conformance endpoint only.
- **Permissions:** service identities least-privilege; administrative health detail segregated.
- **Validation:** module graph acyclic; domain/application layers do not depend on HTTP/ORM; missing configuration fails safely.
- **Events / notifications:** outbox interface only; no business events.
- **Acceptance criteria:** staging deploy/rollback succeeds; module/foreign-write tests pass; correlation/health work without leaking secrets.
- **Tests:** architecture, module, config, adapter, deployment smoke and empty migration rollback.
- **Dependencies:** F056, F057; approved S4-ADR-005/006/029.
- **Open questions:** framework/module layout, database engine/schema strategy and runtime packaging.

### F059 — Versioned API, Contracts and SDK v1

- **Status / priority / release:** Blocked / Critical / Alpha.
- **Purpose:** give frontends stable owner-oriented production contracts without exposing persistence.
- **Scope:** OpenAPI v1 conventions, error/pagination/idempotency/version rules, generated base client, hand-written facades, legacy namespace and mock/HTTP parity.
- **Business rules:** client IDs are inputs; owner authorizes; additive compatibility preferred; no silent mock fallback.
- **UI:** only integration diagnostics; existing apps continue through facades.
- **Backend / database / infrastructure:** API boundary and contract publication; idempotency persistence interface; no owner schema in this feature.
- **API:** version/error/envelope/filter/sort/pagination/idempotency standards and conformance example.
- **Permissions:** API Governance publishes; domain owner approves each resource; consumer receives no implicit scope.
- **Validation:** generated client matches source; unsupported versions and malformed context fail safely; legacy exports remain private.
- **Events / notifications:** contract-change/deprecation notices; no domain event.
- **Acceptance criteria:** producer/consumer/sample mock and HTTP clients pass the same suite; public DTOs contain no framework models.
- **Tests:** OpenAPI lint, compatibility diff, provider/consumer, error, pagination, idempotency and generated-code checks.
- **Dependencies:** F056–F058; proposed S4-ADR-014 approval.
- **Open questions:** exact major-version syntax, schema publication tool and support window.

### F060 — Audit and Observability Foundation

- **Status / priority / release:** Blocked / Critical / Alpha.
- **Purpose:** provide immutable consequential evidence and diagnosable runtime behavior.
- **Scope:** AuditRecord model/port, correlation propagation, structured logs, metrics, traces, health and safe telemetry schema.
- **Business rules:** Audit is append-only and separate from logs; every tenant record resolves Workspace; secrets/payloads minimized.
- **UI:** authorized Audit query and operator health projection only when permissions are approved.
- **Backend / database / infrastructure:** append-only Audit store, telemetry exporters, health registry and protected retention.
- **API:** owner Audit submission contract; authorized Audit query; health/readiness surfaces.
- **Permissions:** command owners write through Audit contract; only scoped auditors/operators read; no update/delete permission.
- **Validation:** actor/scope/action/outcome/correlation recorded; telemetry redaction and Audit immutability enforced.
- **Events / notifications:** alert events for approved operational thresholds; Audit creation is not a mutable notification.
- **Acceptance criteria:** a sample allowed and denied command can be traced API→owner→Audit; no secret or cross-tenant data appears.
- **Tests:** immutability, access, redaction, correlation, failure policy, health and retention-adapter tests.
- **Dependencies:** F058, F059; S4-ADR-023/024.
- **Open questions:** telemetry products, Audit failure mode by command class, retention and SLOs.

## 3. Core Identity and Organization Specifications

### F061 — Canonical Workspace and Organization Registry

- **Status / priority / release:** Blocked / Critical / Alpha.
- **Purpose:** establish canonical tenant and organization ancestry for every downstream domain.
- **Scope:** Workspace, Business, Business Unit, Department, Branch; legacy ID mapping/quarantine; owner APIs and Core UI integration boundary.
- **Business rules:** Workspace is tenant; Business and BU are distinct; DNA belongs Business; Department/Branch each belong one BU; typed Workspaces forbidden.
- **UI:** create/select/manage hierarchy, context visibility, ambiguity/recovery states; compatibility label only under bounded adapter.
- **Backend / database / infrastructure:** Core Organization aggregates, non-null scope, ancestry/uniqueness constraints and migration journal.
- **API:** versioned create/read/update/list/context queries; no client-provided parent proof.
- **Permissions:** explicit organization read/manage permissions at verified scopes; no implicit descendant access.
- **Validation:** normalized identifiers/names; full parent ancestry; duplicate/orphan/ambiguous legacy records quarantine.
- **Events / notifications:** owner events after committed identity changes; optional admin notifications.
- **Acceptance criteria:** deterministic mapping accounts for every source record; two-Workspace ancestry tests deny; no canonical BusinessUnit-as-Business write remains.
- **Tests:** domain/FK/migration/property, API/IDOR, UI context, bilingual/a11y and rollback reconciliation.
- **Dependencies:** F058–F060; approved data mapping and backup gate.
- **Open questions:** legacy Business creation rules, ambiguous pilot data and retention of ID map.

### F062 — Identity, Session and Recovery

- **Status / priority / release:** Blocked / Critical / Alpha.
- **Purpose:** securely authenticate members and recover access without browser credential authority.
- **Scope:** User identity, session lifecycle, login/logout, recovery/reset, revocation, rate/abuse controls and cross-app same-site behavior.
- **Business rules:** authentication is not authorization; session identifies one User; browser passwords/tokens in localStorage are prohibited.
- **UI:** login, logout, recovery/reset, expired/revoked session and safe account-not-found messaging.
- **Backend / database / infrastructure:** approved credential/session/recovery stores, token hashing, rate controls and delivery adapter.
- **API:** authenticate/session/logout/recovery request/complete; safe stable errors and CSRF controls.
- **Permissions:** public auth endpoints are rate-controlled; account/session management requires current identity or purpose-bound recovery proof.
- **Validation:** email/identity normalization, one-use expiring proof, account status, session rotation/revocation.
- **Events / notifications:** security/Audit events and approved recovery message; no credential data.
- **Acceptance criteria:** browser credential fields cease authority; enumeration, replay, expired proof and CSRF attacks fail safely.
- **Tests:** auth unit/integration, CSRF, rate/enumeration, token expiry/replay, session fixation/revocation and cross-app E2E.
- **Dependencies:** F058–F061; approved auth mechanism from F056.
- **Open questions:** provider, credential/factor policy, session lifetime, recovery delivery and step-up rules.

### F063 — Membership, Roles, Permissions and Authorization

- **Status / priority / release:** Blocked / Critical / Alpha.
- **Purpose:** enforce least privilege for every Workspace, organization, OS and resource operation.
- **Scope:** Workspace Membership, permission catalog, role definition/assignment, authorization context/evaluator, owner-policy interface and admin/break-glass rules.
- **Business rules:** role groups permissions; assignment scope explicit; no hierarchy inheritance by default; owner makes final decision.
- **UI:** team/member/role assignment and clear unauthorized/recovery states; frontend checks are presentation only.
- **Backend / database / infrastructure:** membership/assignment/version stores, evaluator and owner policy adapters; security telemetry.
- **API:** membership/role/assignment administration and authorization-context queries; no generic allow-all endpoint.
- **Permissions:** segregated membership/role management; OS permission owners remain distinct; break-glass reason/approval/Audit.
- **Validation:** membership active, scope ancestry verified, permission version valid, entitlement/state/resource guards applied.
- **Events / notifications:** membership/assignment change events and security notifications without sensitive detail.
- **Acceptance criteria:** approved allow/deny matrix passes; no unexplained broader grant; client IDs/role labels cannot bypass owner policy.
- **Tests:** policy unit/property, API IDOR, two-tenant matrix, role mapping, admin segregation, Audit and UI regression.
- **Dependencies:** F060–F062; Product decision for Viewer/delegation only where applicable.
- **Open questions:** canonical role names/content, direct grants, break-glass workflow and Viewer availability.

### F064 — Core Context, Administration and Organization UI Cutover

- **Status / priority / release:** Blocked / High / Alpha.
- **Purpose:** migrate current Core context/team/admin journeys to trusted APIs while preserving routes and UX.
- **Scope:** Workspace/Business/BU/Branch switcher, organization management, team/access screens, admin separation, loading/error/unauthorized/recovery.
- **Business rules:** context switch reauthorizes; UI never writes browser canonical state; admin projections do not own source data.
- **UI:** retained Core routes/components through target facades; bilingual/RTL/a11y states.
- **Backend / database / infrastructure:** composition queries and owner commands only; no new aggregate.
- **API:** consumes F061–F063 contracts through F059 SDK; administrative surface segregated.
- **Permissions:** each action reflects but does not replace server permissions; operator/admin scope visible.
- **Validation:** stale/forged context, revoked membership and missing ancestry recover safely.
- **Events / notifications:** consume owner changes for cache invalidation; optional member notifications.
- **Acceptance criteria:** current Core journeys pass over HTTP; browser keys are non-authoritative; all context switches re-resolve access.
- **Tests:** facade parity, route/context E2E, unauthorized/expiry, localization/a11y, performance and regression.
- **Dependencies:** F059, F061–F063, F084 quality rules.
- **Open questions:** exact admin navigation, legacy route support window and context URL representation.

## 4. Business Intelligence Specifications

### F065 — Business DNA Registry

- **Status / priority / release:** Blocked / High / Alpha.
- **Purpose:** maintain one software-independent, versioned Business context for deterministic intelligence.
- **Scope:** DNA identity, revision/draft/review/publish/history/provenance and authorized read projections.
- **Business rules:** exactly one DNA identity per Business; versions immutable after publication; Workspace/BU cannot own DNA.
- **UI:** Business DNA authoring, review, history, provenance and correction journeys.
- **Backend / database / infrastructure:** Business DNA aggregate/version store linked to canonical Business; backup/Audit.
- **API:** create draft, revise, review, publish and read version/history.
- **Permissions:** scoped Business DNA author/reviewer/publisher/read permissions; no implicit Workspace-wide access.
- **Validation:** canonical Business exists; provenance/version/revision concurrency complete; published version not mutated.
- **Events / notifications:** DNA draft/review/published/corrected facts; reviewer notification where approved.
- **Acceptance criteria:** versions reproduce history, cross-Business access denies and published content cannot update in place.
- **Tests:** domain/version/property, authorization, API concurrency, UI history, Audit, restore.
- **Dependencies:** F060–F064; ADR-005/006.
- **Open questions:** initial approved DNA schema, reviewer roles and data-retention/correction policy.

### F066 — Capability, Knowledge and Rule Registry

- **Status / priority / release:** Blocked / High / Alpha.
- **Purpose:** publish governed immutable inputs before decisions, recommendations or AI.
- **Scope:** Capability definitions, Knowledge/Rule drafts, review/publication/versioning/applicability and deterministic evaluation port.
- **Business rules:** Capabilities precede products; modules implement but do not redefine them; published versions immutable.
- **UI:** registry list/detail, draft/review/publish/version comparison and applicability views.
- **Backend / database / infrastructure:** separate owner registries, immutable versions and evaluation adapters.
- **API:** publish/query/version/applicability/evaluation contracts; no direct consumer mutation.
- **Permissions:** platform publisher/reviewer/admin; authorized consumers receive applicable minimal versions.
- **Validation:** unique stable IDs, provenance, version dependencies, schema and deterministic Rule validity.
- **Events / notifications:** published/deprecated version facts and reviewer notifications.
- **Acceptance criteria:** exact published input versions are addressable/replayable; no hard-coded industry logic bypasses registry.
- **Tests:** immutability, version dependency, deterministic evaluation, permission, API and UI/a11y.
- **Dependencies:** F060, F065; accepted ADR-007–011.
- **Open questions:** first approved capability/knowledge/rule slice and publication governance roles.

### F067 — Deterministic Business Brain Decisions

- **Status / priority / release:** Blocked / High / Alpha.
- **Purpose:** produce reproducible, explainable decisions from approved Business context and rule assets.
- **Scope:** decision request/context, policy filtering, exact input versions, deterministic evaluation, result/evidence/explanation/history.
- **Business rules:** Brain owns Decisions only; no DNA/Rule/OS fact mutation; AI absent; same inputs/versions yield same result.
- **UI:** request/run approved decision, result/explanation/evidence/history and unavailable/conflict states.
- **Backend / database / infrastructure:** deterministic engine, immutable Decision result/version references, telemetry and Audit.
- **API:** submit/evaluate/read/replay Decision contracts with explicit Business context.
- **Permissions:** authorized Business decision requester/reader; input access revalidated; no target execution permission.
- **Validation:** all input versions present/applicable; assumptions/conflicts/confidence and safe failure recorded.
- **Events / notifications:** DecisionCompleted fact; optional authorized availability notification.
- **Acceptance criteria:** deterministic replay matches; explanation references every material input; no target-owner state changes.
- **Tests:** deterministic/property/golden rules, version replay, authorization, failure, API/UI, Audit/correlation.
- **Dependencies:** F063, F065, F066.
- **Open questions:** first decision type and Product-approved decision semantics; performance thresholds.

### F068 — Explainable Recommendations

- **Status / priority / release:** Blocked / Medium / Alpha.
- **Purpose:** convert completed Decisions into optional advice with human control.
- **Scope:** recommendation candidate/composition, rationale, evidence, alternatives, risk, confidence, expected benefit, dismiss/acknowledge history.
- **Business rules:** recommendation optional/advisory; no silent execution; owner validates any later proposal/action.
- **UI:** recommendation list/detail, compare alternatives, dismiss/acknowledge and evidence views.
- **Backend / database / infrastructure:** Recommendation store/composer and read projections; no AI provider.
- **API:** create from completed Decision, query, acknowledge/dismiss; no target mutation endpoint.
- **Permissions:** Business-scoped readers; creator service may use only authorized Decision context.
- **Validation:** completed Decision and exact evidence versions; required rationale/alternatives/risk/confidence fields.
- **Events / notifications:** RecommendationAvailable/Acknowledged/Dismissed facts; optional user notification.
- **Acceptance criteria:** recommendation cannot execute; every item is explainable and absent/failed recommendation never blocks OS use.
- **Tests:** non-mutation, contract completeness, permission, optionality/failure, UI/a11y and regression.
- **Dependencies:** F067.
- **Open questions:** first recommendation category, prioritization and expiry policy.

## 5. Commercial and Product Hub Specifications

### F069 — Product, Plan, Entitlement and Subscription Catalog

- **Status / priority / release:** Blocked / Critical / Beta.
- **Purpose:** represent product availability and commercial state without granting operational access implicitly.
- **Scope:** OS Product, Plan versions/codes, Workspace Entitlement, OS Subscription and approved lifecycle successor projections.
- **Business rules:** Starter/Pro/Business/Enterprise codes where plans exist; subscription Workspace-scoped; setup/readiness/access distinct; no canonical `OSEnablement` before successor ADR.
- **UI:** authorized catalog/plan/subscription states with unavailable/past-due/recovery handling; no unapproved values.
- **Backend / database / infrastructure:** Core Commercial owner aggregates, versioned catalog and migration mapping.
- **API:** product/plan projections, entitlement/subscription commands/queries and access composition inputs.
- **Permissions:** catalog admin segregated; Workspace commercial read/manage permissions; owner revalidates state.
- **Validation:** canonical codes/version/effective dates; Workspace scope; mutually valid transitions; approved source mapping only.
- **Events / notifications:** catalog/subscription/entitlement facts; commercial notifications after committed change.
- **Acceptance criteria:** entitlement, subscription, setup, readiness and access can be independently tested; legacy `OSEnablement` has no new writes.
- **Tests:** domain/state/version, migration, authorization, API/SDK/UI, handoff preconditions and Audit.
- **Dependencies:** F056, F059–F063 and approved ADR-023 successor.
- **Open questions:** successor lifecycle, plan applicability/prices/trials, provider interaction and grandfathering.

### F070 — Commercial Policy: Limits, Billing and Branding

- **Status / priority / release:** Blocked / Critical / Beta.
- **Purpose:** encode only Product/Finance-approved quotas, billing coordination and tenant branding entitlements.
- **Scope:** versioned LimitRule, UsageMeasurement, reset/overage/grandfathering, billing-provider coordination and branding scope/assets.
- **Business rules:** no mock limit is authority; flags are not entitlements; Core coordinates billing; branding does not create typed tenant.
- **UI:** usage/limit status, billing/reconciliation states and approved branding management.
- **Backend / database / infrastructure:** policy/measurement/version stores; provider/object adapters only after decisions.
- **API:** limit/usage, billing coordination and branding policy/resource contracts.
- **Permissions:** Product/Finance catalog admins; Workspace billing/branding admins; scoped read permissions.
- **Validation:** approved matrix/version/effective period, non-negative measurements, provider idempotency and asset constraints.
- **Events / notifications:** threshold/subscription/provider/branding facts and approved notices.
- **Acceptance criteria:** exact Product-approved rules evaluate consistently; Core/Premium examples do not rename NexoraXS canonical plans; unavailable policy fails safely.
- **Tests:** boundary/reset/overage, versioning, provider contract, authorization, tenant isolation and UI.
- **Dependencies:** F056, F069; PD-05, PD-08 and PD-09.
- **Open questions:** all limit values, billing provider/tax/refund flow, branding plans/scopes and notification policy.

### F071 — Product Hub and Secure Commerce Handoff

- **Status / priority / release:** Blocked / Critical / Beta.
- **Purpose:** let authorized members discover and launch Commerce with current context and recovery.
- **Scope:** Product Hub projections, availability/access states, setup/launch actions, opaque exchange, audience/expiry/use/revocation and recovery routes.
- **Business rules:** Product Hub composes, never owns OS setup/data; target reauthenticates/reauthorizes; no IDs/token secrets trusted from URL.
- **UI:** cards/status/reason, setup/launch/recovery/expired/unauthorized states; routes preserved through bounded redirects.
- **Backend / database / infrastructure:** projection composer and short-lived handoff reference store/signing/exchange.
- **API:** Product Hub query; issue/exchange/invalidate handoff; Commerce readiness projection contract.
- **Permissions:** Workspace/organization/OS/resource plus entitlement/lifecycle; Commerce owner rechecks.
- **Validation:** audience, purpose, expiry, one-use/replay, current membership/ancestry/access and target availability.
- **Events / notifications:** handoff issued/exchanged/rejected security evidence; no token in logs.
- **Acceptance criteria:** valid flow launches correct context; forged/replayed/expired/wrong-audience flow denies and recovers; cross-origin storage is unnecessary.
- **Tests:** adversarial handoff contract/E2E, route/session, tenant/IDOR, projection freshness, localization/a11y and rollback.
- **Dependencies:** F059, F063, F069; F084 quality requirements.
- **Open questions:** exact expiry, route/host topology, reauthentication threshold and failure support policy.

## 6. Commerce Foundation Specifications

### F072 — Commerce Setup and Settings

- **Status / priority / release:** Blocked / High / Beta.
- **Purpose:** make Commerce independently usable and configured per approved Business Unit/Branch scope.
- **Scope:** setup version, module/preset configuration, operational settings, readiness contribution and recovery.
- **Business rules:** Commerce owns setup; presets recommend/configure but do not create separate apps; Product Hub only hands off.
- **UI:** retained setup wizard/settings/navigation with loading/error/recovery and bilingual/RTL/a11y.
- **Backend / database / infrastructure:** Commerce Setup aggregate/version store and owner validation.
- **API:** setup read/save/complete/readiness projection; no Core write-through.
- **Permissions:** Commerce setup/settings permissions at Workspace+BU and applicable Branch.
- **Validation:** canonical organization/subscription references, configuration version/concurrency and permitted preset/module values.
- **Events / notifications:** setup saved/completed/readiness fact; optional admin notification.
- **Acceptance criteria:** setup works without another OS, survives reload and contributes readiness without changing commercial state.
- **Tests:** domain/config, API/tenant/auth, UI/E2E/localization/a11y, migration parity and recovery.
- **Dependencies:** F059, F061–F063; F071 only for launch integration.
- **Open questions:** first production preset/module catalog and readiness fields after ADR-023 successor.

### F073 — Commerce Catalog and Pricing Separation

- **Status / priority / release:** Blocked / High / Beta.
- **Purpose:** preserve current product management while restoring Catalog/Pricing ownership.
- **Scope:** Commerce Product identity/classification, Price/PriceList facts, combined compatibility read projection and migration.
- **Business rules:** Product cannot own price, cost or stock; Pricing writes its facts; read composition may combine authorized projections.
- **UI:** current catalog/product/pricing views through owner-aware facades; clear stale/error states.
- **Backend / database / infrastructure:** separate Catalog and Pricing aggregates/tables plus reconstructable combined projection.
- **API:** Catalog CRUD/query and Pricing commands/queries; versioned combined read DTO during support window.
- **Permissions:** separate catalog and pricing permissions at Workspace+BU; field minimization.
- **Validation:** SKU/name/classification and monetary/currency/effective-date rules; no stock field accepted by Product command.
- **Events / notifications:** Product/Price changed facts for projections/cache.
- **Acceptance criteria:** owner write tests prohibit price/stock through Product; UI parity and migration totals pass.
- **Tests:** domain/owner-boundary, API/contract, migration/projection parity, tenant/permission and UI regression.
- **Dependencies:** F059, F061–F063, F072.
- **Open questions:** pricing model/discount scope and first catalog fields beyond current compatibility data.

### F074 — Commerce Inventory and Branch Stock

- **Status / priority / release:** Blocked / High / Beta.
- **Purpose:** maintain accurate tenant/Business Unit/Branch stock under concurrency.
- **Scope:** InventoryPosition, StockMovement, Adjustment, sale/return/transfer effect ports, branch projection and migration.
- **Business rules:** Inventory alone writes positions/movements; Product identity referenced; effects idempotent and branch-scoped.
- **UI:** stock list/detail/adjustment/low-stock/movement and conflict/recovery states.
- **Backend / database / infrastructure:** Inventory aggregate/ledger, locking or optimistic concurrency, indexes and projection.
- **API:** list/get positions/movements; adjustment and owner-effect commands with idempotency/revision.
- **Permissions:** inventory read/adjust/owner-effect service permissions scoped to Workspace+BU+Branch.
- **Validation:** positive/allowed quantities, product/branch ancestry, expected revision and duplicate effect key.
- **Events / notifications:** position/movement/low-stock facts; notification is downstream.
- **Acceptance criteria:** concurrent/duplicate effects never corrupt stock; cross-branch/tenant access denies; movement ledger reconciles positions.
- **Tests:** domain/property/concurrency, DB/API/idempotency, tenant/IDOR, migration, UI and performance.
- **Dependencies:** F059, F061–F063, F073.
- **Open questions:** reservation semantics, negative stock policy and inventory valuation scope.

### F075 — Commerce Customers

- **Status / priority / release:** Blocked / High / Beta.
- **Purpose:** provide tenant-safe customer records and authorized transactional history.
- **Scope:** Customer CRUD, identity/contact fields, history projection, deduplication and current facade migration.
- **Business rules:** Commerce owns transactional Customer; Core User is not Customer; history is a projection, not owner.
- **UI:** list/search/detail/create/update/history with privacy-aware empty/error states.
- **Backend / database / infrastructure:** Customer aggregate/store/indexes; optional search projection later.
- **API:** list/get/create/update and authorized history query, retaining bounded F053 behavior during migration.
- **Permissions:** customer read/create/update and history permissions scoped Workspace+BU; field-level minimization.
- **Validation:** normalized contact fields, duplicate policy, scope and optimistic concurrency.
- **Events / notifications:** Customer created/updated facts; no unsolicited contact without Product policy.
- **Acceptance criteria:** scoped CRUD/history parity passes; Core identity is not created/changed; unauthorized fields/tenants deny.
- **Tests:** domain/validation, API/contract, privacy/IDOR, migration, UI/E2E and regression.
- **Dependencies:** F059, F061–F063.
- **Open questions:** customer deduplication, consent/retention and cross-BU customer visibility.

## 7. Commerce Transaction and Reporting Specifications

### F076 — Commerce Orders

- **Status / priority / release:** Blocked / High / Beta.
- **Purpose:** own durable order facts and lifecycle independently of payment, tax, inventory and documents.
- **Scope:** Order/OrderLine create/read/list, revision/status/history, product/customer snapshots and owner-effect interfaces.
- **Business rules:** Order owns order fact only; repeat create is idempotent; return/payment/inventory updates use published contracts.
- **UI:** order list/detail/create/status/history and partial/unavailable recovery states.
- **Backend / database / infrastructure:** Orders aggregate/store, idempotency and outbox.
- **API:** order create/get/list and approved owner commands; no broad operations-store endpoint.
- **Permissions:** order read/create/manage at Workspace+BU+Branch and explicit service permissions.
- **Validation:** product/customer/scope references, quantity/snapshot integrity, expected revision and state guard.
- **Events / notifications:** OrderCreated/Changed committed facts; notifications downstream.
- **Acceptance criteria:** duplicate submission creates one order; order data remains correct if optional integrations fail; no foreign table write.
- **Tests:** domain/state/idempotency, API/contract, DB/outbox, tenant/authorization, migration and UI/E2E.
- **Dependencies:** F060, F063, F073–F075.
- **Open questions:** authoritative order lifecycle, cancellation rules and numbering policy.

### F077 — Commerce POS Checkout Orchestration

- **Status / priority / release:** Blocked / Critical / Beta.
- **Purpose:** complete a sale consistently across canonical owners without re-collapsing them.
- **Scope:** POS draft/quote, checkout command, owner command coordination, idempotency, result/recovery and current POS UX migration.
- **Business rules:** POS owns transaction/orchestration; Orders/Inventory/Payments/Tax/Documents own their facts; partial failure explicit/reconcilable.
- **UI:** retained keyboard-focused POS, quote/totals, submitting/success/partial/error/recovery and last-transaction view.
- **Backend / database / infrastructure:** POSTransaction/orchestration state, saga/command journal as approved, outbox and low-latency telemetry.
- **API:** draft/quote/checkout/status/retry or reconcile contracts; one scoped idempotency key.
- **Permissions:** cashier/POS permissions at Workspace+BU+Branch; owner commands use narrow service identity.
- **Validation:** current branch/session, sellable product, price/tax snapshot, stock policy, payment request and expected revisions.
- **Events / notifications:** POSTransaction completed/failed facts; receipt/notification only after committed owner outcomes.
- **Acceptance criteria:** duplicate/retry never double-sells or double-pays; failure identifies committed/pending effects; golden totals match.
- **Tests:** orchestration/failure injection, idempotency, concurrency, performance, owner contract, Audit and E2E.
- **Dependencies:** F074, F076, F078, F060, F063.
- **Open questions:** transaction/compensation policy, offline behavior, payment provider and performance budget.

### F078 — Commerce Payments, Tax and Documents

- **Status / priority / release:** Blocked / Critical / Beta.
- **Purpose:** own monetary, tax and issued-document facts separately and reconcile checkout.
- **Scope:** Payment/Refund, TaxApplication/config snapshot, Invoice/Document issuance/print/read and provider adapters if approved.
- **Business rules:** only Payment owner changes monetary facts; Tax owns application; Documents own invoice history; no Return/POS direct writes.
- **UI:** payment method/status, tax breakdown, invoice/detail/print and failure/reconciliation states.
- **Backend / database / infrastructure:** separate owner aggregates/stores, immutable issued snapshots, idempotency/outbox and provider adapters.
- **API:** authorize/capture/refund/status, calculate/apply tax and issue/read document contracts.
- **Permissions:** finance/payment, tax configuration and document permissions separated; provider service identity narrow.
- **Validation:** currency/amount/tax/version/order scope, duplicate provider reference, immutable issued document.
- **Events / notifications:** Payment/Refund/TaxApplied/DocumentIssued facts; receipt notification after commit.
- **Acceptance criteria:** monetary/tax/document totals reconcile; duplicate provider callback/effect is safe; owner-write rules pass.
- **Tests:** golden calculations, provider contract/idempotency, authorization, migration, immutable documents, UI/E2E and Audit.
- **Dependencies:** F059, F063, F073, F076; Product/Finance rules for real payments/tax.
- **Open questions:** provider, tender types, tax jurisdictions, refunds, numbering and legal retention.

### F079 — Commerce Returns and Transfers

- **Status / priority / release:** Blocked / High / RC.
- **Purpose:** coordinate return and transfer intent while owners apply stock, money, order and document effects exactly once.
- **Scope:** Return/Transfer intent lifecycle, validation, owner-effect commands, effect ledger, reconciliation and UI migration.
- **Business rules:** Return/Transfer never writes Inventory/Payment/Order/Document tables; each owner validates current state.
- **UI:** create/view status, partial/pending/reconcile/error flows for returns and inter-branch transfers.
- **Backend / database / infrastructure:** intent aggregates, effect journal/outbox, reconciler workers.
- **API:** return/transfer create/get/list/status/retry-reconcile and narrow owner commands.
- **Permissions:** return and transfer permissions plus source/destination branch and owner-service checks.
- **Validation:** source order/item/quantity/reason/refund/restock; source/destination branch/stock; idempotency/revision.
- **Events / notifications:** intent/effect/completion/failure facts and authorized operational notifications.
- **Acceptance criteria:** no direct foreign write; repeated command/effect is exactly once; partial effects reconcile without deleting history.
- **Tests:** state/property, failure/compensation, concurrency, owner contracts, tenant/branch IDOR, Audit and E2E.
- **Dependencies:** F074, F076–F078, F082 for asynchronous reconciliation.
- **Open questions:** approved return/transfer lifecycles, exchange scope and financial compensation policy.

### F080 — Commerce Reporting and Exports

- **Status / priority / release:** Blocked / Medium / RC.
- **Purpose:** deliver authorized operational insight without making reports a source of truth.
- **Scope:** reconstructable projections, report queries/filters, export jobs/files, freshness/degraded indicators.
- **Business rules:** projections disposable; every row/field tenant/permission scoped; export is asynchronous when bounded request cost requires.
- **UI:** dashboards/reports/filter/sort/export status/download and stale/degraded states.
- **Backend / database / infrastructure:** projection builders/stores, export worker and private output storage.
- **API:** report queries and export create/status/download; bounded pagination/filter grammar.
- **Permissions:** report/export permissions by domain/scope; sensitive financial/customer fields separately authorized.
- **Validation:** allowed filters/date ranges/row limits, projection version/freshness and export expiry.
- **Events / notifications:** source facts update projections; ExportReady/Failed notification.
- **Acceptance criteria:** projections rebuild from canonical owners; cross-tenant rows never appear; export matches authorized query totals.
- **Tests:** projection rebuild/reconciliation, tenant/field security, API/filter/load, export/file and UI regression.
- **Dependencies:** F073–F079, F081/F082 for large exports.
- **Open questions:** first report catalog, freshness targets, export formats/retention and performance limits.

## 8. Platform Service Specifications

### F081 — Private File Storage and Document Media

- **Status / priority / release:** Blocked / High / RC.
- **Purpose:** securely store/serve files while business owners retain document metadata and authorization.
- **Scope:** upload intent, private object transfer, hash/size/type, scan/quarantine, confirmation/attachment, authorized download/delete/retention and migration.
- **Business rules:** client never chooses canonical path; object ID not authorization; public storage forbidden; bytes do not transfer domain ownership.
- **UI:** upload/progress/scan/error/retry/preview/download/expired states, bilingual and accessible.
- **Backend / database / infrastructure:** Storage Coordination metadata, private object adapter, scanner worker, encryption/key integration and backup.
- **API:** create intent, confirm, status, authorized download, detach/delete/retention commands.
- **Permissions:** resource-owner upload/read/delete plus storage service identity; every operation resolves Workspace/resource.
- **Validation:** size/type/hash, scan result, quota if approved, scope/ownership, expiry and duplicate content policy.
- **Events / notifications:** ObjectUploaded/Scanned/Attached/Rejected facts; owner/user notifications where approved.
- **Acceptance criteria:** wrong-tenant/resource access denies; public URL absent; hash/scan/restore/migration reconciliation pass.
- **Tests:** file abuse, IDOR/tenant, integration, malware/quarantine, expiry, migration hash and backup/restore.
- **Dependencies:** F056, F058–F063; approved S4-ADR-020/032.
- **Open questions:** object product, encryption/keys, quotas, retention, residency and legal deletion.

### F082 — Background Jobs and Notifications

- **Status / priority / release:** Blocked / High / RC.
- **Purpose:** execute approved asynchronous effects and localized delivery reliably without blocking owners.
- **Scope:** transactional outbox, dispatcher, idempotent tenant-aware workers, retry/DLQ/replay, Notification/preferences/templates/channels/status.
- **Business rules:** events are committed facts; jobs carry minimal context and revalidate; Notification owns delivery, not source workflow.
- **UI:** notification center/preferences/delivery status and operator reconciliation views as authorized.
- **Backend / database / infrastructure:** outbox/delivery stores, queue/worker/channel adapters and DLQ operations.
- **API:** notification query/preferences, delivery/admin reconciliation; internal event/worker contracts.
- **Permissions:** recipient scope; preference management; segregated operator/replay; service identity minimal.
- **Validation:** event version/idempotency, recipient/locale/channel, retry limit, payload minimization and current tenant context.
- **Events / notifications:** source events feed Notification; delivery attempts/results remain Notification facts.
- **Acceptance criteria:** duplicate/replay safe, one tenant cannot affect another, localized delivery works and DLQ is observable/recoverable.
- **Tests:** outbox transaction, retry/DLQ/replay, tenant/privacy, provider contract, localization and failure/degraded tests.
- **Dependencies:** F056, F058–F060, F063; approved S4-ADR-021.
- **Open questions:** queue/channel products, retry/retention, notification preferences and incident ownership.

### F083 — Feature Flags and Platform Configuration

- **Status / priority / release:** Blocked / High / Alpha.
- **Purpose:** control rollout/configuration safely without confusing flags with business access.
- **Scope:** flag/config registry, owner/scope/default/effective version/expiry, server evaluation, admin change/Audit and client projection.
- **Business rules:** flag never grants permission/entitlement; fail-safe default explicit; temporary flags have removal condition.
- **UI:** segregated flag/config admin and read-only diagnostics; ordinary UI consumes evaluated result.
- **Backend / database / infrastructure:** versioned registry/evaluator/cache with explicit invalidation.
- **API:** evaluate authorized projection; create/update/retire admin contracts; no client override.
- **Permissions:** configuration administrator segregated; feature owner approval; all changes audited.
- **Validation:** stable key, owner, scope, default, expiry/removal, environment and dependency rules.
- **Events / notifications:** FlagChanged/Retired facts and owner expiry notification.
- **Acceptance criteria:** missing/evaluator failure follows approved default; authorization remains enforced; expired flags detected/removed.
- **Tests:** evaluator/default/scope/cache, authorization bypass negative, Audit, admin UI and expiry scan.
- **Dependencies:** F059, F060, F063.
- **Open questions:** registry product, cohort strategy and maximum flag lifetime.

## 9. Experience and Operations Specifications

### F084 — Shared UI, Localization, Accessibility and Theme

- **Status / priority / release:** Ready / High / Alpha.
- **Purpose:** make retained apps consistent, bilingual, RTL/LTR, theme-safe and accessible without moving domain logic into UI.
- **Scope:** presentation primitives/tokens, translation path, logical layout/direction, theme, critical states, keyboard/focus/semantic guidance and test harness.
- **Business rules:** UI package presentation-only; no permission/storage/domain ownership; Arabic and English first-class.
- **UI:** shared components and selective migration of duplicated primitives; no broad visual rewrite.
- **Backend / database / infrastructure:** none; locale preference backend use only when separately owned.
- **API:** component/localization contracts only.
- **Permissions:** none created; components render server authorization results safely.
- **Validation:** no hard-coded critical strings, logical CSS direction, focus behavior, contrast/semantics and non-color-only meaning.
- **Events / notifications:** none.
- **Acceptance criteria:** selected critical current journeys pass Arabic/English, RTL/LTR, keyboard/focus, theme and screen-reader-oriented checks.
- **Tests:** unit/visual/a11y/localization, E2E regression, responsive/theme/performance.
- **Dependencies:** current frontend authority; F057 is soft for automated gating.
- **Open questions:** first shared component migration set and exact visual regression tooling.

### F085 — Landing and Marketing Pages

- **Status / priority / release:** Ready / Medium / Alpha.
- **Purpose:** present canonical product identity and truthful scope without duplicating commercial authority.
- **Scope:** Landing copy/navigation/marketing pages, bilingual/a11y/SEO/performance and optional later public Product projection.
- **Business rules:** canonical “Business Operating Intelligence Platform”; no unapproved plans/limits/EasyCar claims; Landing owns no subscription fact.
- **UI:** retained Landing sections/routes with approved content and states.
- **Backend / database / infrastructure:** none for static content; future CMS/public projection separately approved.
- **API:** none initially; read-only public projection only after F069.
- **Permissions:** public read; content change follows Product/Marketing review.
- **Validation:** authority-aligned terminology/links/claims, locale/direction, metadata and no hard-coded unapproved commercial values.
- **Events / notifications:** analytics only under approved privacy policy; no domain event.
- **Acceptance criteria:** canonical identity used; conflicting paid-plan claims removed/avoided; pages meet bilingual/a11y/performance baselines.
- **Tests:** content/link/SEO, localization/RTL, a11y, responsive/performance and visual regression.
- **Dependencies:** ADR-001; F069 only for a live plan catalog.
- **Open questions:** approved marketing copy, analytics/privacy and future CMS ownership.

### F086 — Production Deployment, Monitoring, Backup and Recovery

- **Status / priority / release:** Blocked / Critical / RC.
- **Purpose:** operate approved Core/Commerce slices safely and recoverably.
- **Scope:** isolated environments, TLS/routing, immutable promotion, secrets, database/object/queue/workers, health/telemetry/alerts, backup/PITR/restore, incident and rollback runbooks.
- **Business rules:** safe unavailability over corrupt/unauthorized writes; restore canonical owners before projections; no release without named operator.
- **UI:** authorized operator dashboards; user-facing degraded/maintenance states in affected apps.
- **Backend / database / infrastructure:** approved VPS-equivalent topology and all production services/configuration/backup controls.
- **API:** health/readiness/diagnostics segregated; no sensitive internals public.
- **Permissions:** least-privilege deploy/migration/operator/break-glass with approval and Audit.
- **Validation:** artifact/config/schema compatibility, secret isolation, capacity, alert actionability, backup integrity and restore objectives.
- **Events / notifications:** operational alerts/incidents/deploy/restore evidence.
- **Acceptance criteria:** staging/canary deploy and rollback succeed; isolated restore meets approved RPO/RTO; critical alerts and incident ownership prove effective.
- **Tests:** deploy/rollback, backup/restore, secret/security, load, worker/degraded, health/alert and incident drill.
- **Dependencies:** F057–F083 as applicable; approved S4-ADR-029/032 and Operations owner.
- **Open questions:** provider/topology, SLO/RPO/RTO, retention, on-call and capacity thresholds.

### F087 — Compatibility Removal and Production Data Cutover

- **Status / priority / release:** Blocked / High / Production.
- **Purpose:** establish one production authority and retire expired browser/legacy compatibility debt.
- **Scope:** consumer inventory, HTTP default, browser-key/legacy contract/route/DTO/flag removal, schema contraction, final data reconciliation and readiness evidence.
- **Business rules:** unknown consumer/data blocks removal; historical/Audit preserved; no browser fallback; destructive contraction last.
- **UI:** remove legacy recovery paths only after target recovery proven; documented terminal behavior for sunset routes.
- **Backend / database / infrastructure:** disable old writes/reads, contract compatible schema, retain backups/ID maps per policy.
- **API:** sunset old versions/endpoints after support/zero-traffic window.
- **Permissions:** migration/release operator only; removal actions audited.
- **Validation:** zero consumers/traffic, source-target reconciliation, rollback window, backup restore and all quality gates.
- **Events / notifications:** deprecation/sunset notices and release evidence.
- **Acceptance criteria:** no production browser authority, legacy BusinessUnit-as-Business write, direct foreign write or expired adapter remains.
- **Tests:** full contract/security/tenant/E2E/migration/restore/rollback and import/export scans.
- **Dependencies:** F064, F071–F086.
- **Open questions:** support windows, retention of ID maps/fixtures and final go-live owner acceptance.


## 11. Specification Catalog Verdict

There are **32 specification entries for 32 catalog features**. Each has an explicit status,
purpose, scope, business rules, UI, backend/database/infrastructure, API, permissions, validation,
events, notifications, acceptance, tests, dependencies and open questions.
