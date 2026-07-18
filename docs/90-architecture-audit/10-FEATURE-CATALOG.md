# Feature Catalog


> **Execution Scope Decision — 2026-07-18**
> EasyCar is a separate standalone application and is excluded from the current NexoraXS Core + Commerce execution plan.
> No EasyCar feature, dependency, milestone, sprint, backlog item, release gate, or implementation task is authorized by this document set.
> EasyCar will have its own repository/application architecture, audit, roadmap, specifications, backlog, and release plan.

## 1. Purpose and Planning Authority

This catalog converts the Stage 4 target into implementation-planning records. It does not create
approved feature specifications, implementation tasks, code, schema or business approval. A
feature marked Ready is ready only for a future Spec Kit feature lifecycle within the stated
scope. Stage 4 gates continue to control all architecture-sensitive work.

The catalog begins at F056 because F055 is the active repository feature. It defines **32
features across 12 epics**. Status distribution is: **3 Ready, 29 Blocked, 2 Deferred, 1 Future**.

Sources: `06-TARGET-ARCHITECTURE.md`, `07-MIGRATION-PLAN.md`,
`08-ARCHITECTURE-DECISIONS.md`, `09-RISK-AND-READINESS.md`, the frozen architecture, and the
implementation evidence in reports 00–05.

## 2. Epic, Capability, Module, and Application Map

| Epic | Capability outcome | Primary domain/modules | Applications/packages/infrastructure | Features |
|---|---|---|---|---|
| E01 Governance and Safety | approved decisions, owners and safe entry | Governance, Product, Security, Data | docs/ADR process; spike environments | F056 |
| E02 Delivery and Runtime Foundation | governed production execution boundary | Platform Runtime, API Governance, Audit/Observability | backend, contracts, SDK, CI/CD | F057–F060 |
| E03 Identity and Organization | trusted tenant, organization and access context | Core Identity, Organization Registry, Authorization | Core app, auth, SDK, backend Core | F061–F064 |
| E04 Business Intelligence | deterministic business context and advice | Business DNA, Capability, Knowledge, Rules, Brain, Recommendations | Core app/API/modules | F065–F068 |
| E05 Commercial and Product Hub | product access and secure OS launch | Product/Plan, Entitlement, Subscription, Product Hub | Core app/API, Commerce integration | F069–F071 |
| E06 Commerce Foundation | configured sellable catalog, stock and customers | Setup, Catalog, Pricing, Inventory, Customers | Commerce app/API/modules | F072–F075 |
| E07 Commerce Transactions | consistent sell/settle/document/return/report flows | Orders, POS, Payments, Tax, Documents, Returns, Transfers, Reporting | Commerce app/API/workers | F076–F080 |
| E08 Platform Services | secure files, asynchronous delivery and configuration | Storage, Notification, Feature Configuration | Core services, workers, object storage | F081–F083 |
| E09 Experience and Marketing | reusable bilingual accessible experiences | UI system, Localization, Landing | UI package, all apps, Landing | F084–F085 |
| E10 Production Operations | deployable, observable and recoverable service | Platform Operations | CI/CD, hosting, database, queue, storage, telemetry | F086 |
| E11 Migration Closure | one production authority and no expired shims | Migration/Compatibility Governance | apps, packages, backend, data, docs | F087 |

## 3. Master Feature Catalog Grouped by Domain

### 3.1 Governance and delivery foundation

| ID | Feature | Business purpose | Architecture area | Hard dependencies | Priority | Risk | Complexity | Size | Release | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| F056 | Governance, Technology and Product Decision Gate | turn Stage 4 proposals into owned, approved or explicitly blocked decisions | Governance / Wave 0 | reports 00–14 | Critical | Critical | L | M | Alpha entry | Ready |
| F057 | CI/CD and Developer Quality Spine | make every change reproducible and gateable | Delivery / Developer Experience | F056 | Critical | High | L | L | Alpha | Blocked |
| F058 | Modular Backend Runtime Foundation | provide the trusted modular-monolith execution boundary | Backend Platform | F056, F057 | Critical | Critical | XL | XL | Alpha | Blocked |
| F059 | Versioned API, Contracts and SDK v1 | give apps stable owner-oriented production contracts | API / Contracts / SDK | F056–F058 | Critical | High | XL | XL | Alpha | Blocked |
| F060 | Audit and Observability Foundation | create trusted consequential evidence and diagnosable runtime | Audit / Observability | F058, F059 | Critical | Critical | L | L | Alpha | Blocked |

### 3.2 Core identity and organization

| ID | Feature | Business purpose | Architecture area | Hard dependencies | Priority | Risk | Complexity | Size | Release | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| F061 | Canonical Workspace and Organization Registry | establish Workspace→Business→BU→Department/Branch truth | Core Organization / Tenancy | F058–F060 | Critical | Critical | XL | XL | Alpha | Blocked |
| F062 | Identity, Session and Recovery | securely authenticate members without browser credential authority | Core Identity / Security | F058–F061 | Critical | Critical | XL | XL | Alpha | Blocked |
| F063 | Membership, Roles, Permissions and Authorization | enforce least privilege at tenant/resource owner boundaries | Core Access / Security | F061, F062, F060 | Critical | Critical | XL | XL | Alpha | Blocked |
| F064 | Core Context, Administration and Organization UI Cutover | move current Core context/team/admin journeys to trusted APIs | Core Frontend / Admin | F059, F061–F063 | High | High | L | L | Alpha | Blocked |

### 3.3 Business intelligence

| ID | Feature | Business purpose | Architecture area | Hard dependencies | Priority | Risk | Complexity | Size | Release | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| F065 | Business DNA Registry | capture one versioned Business-owned context | Core Business DNA | F060–F064 | High | High | L | L | Alpha | Blocked |
| F066 | Capability, Knowledge and Rule Registry | publish immutable inputs for deterministic decisions | Core Intelligence Assets | F060, F065 | High | High | XL | XL | Alpha | Blocked |
| F067 | Deterministic Business Brain Decisions | produce reproducible explainable decisions | Business Brain | F063, F065, F066 | High | High | XL | XL | Alpha | Blocked |
| F068 | Explainable Recommendations | expose optional advice without target-owner mutation | Recommendations | F067 | Medium | High | L | L | Alpha | Blocked |

### 3.4 Commercial and Product Hub

| ID | Feature | Business purpose | Architecture area | Hard dependencies | Priority | Risk | Complexity | Size | Release | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| F069 | Product, Plan, Entitlement and Subscription Catalog | represent commercial product access without conflating readiness | Core Commercial | F056, F059–F063; ADR-023 successor | Critical | Critical | XL | XL | Beta | Blocked |
| F070 | Commercial Policy: Limits, Billing and Branding | define approved quotas, billing coordination and branding entitlement | Product/Finance/Core Commercial | F056, F069; PD-05/08/09 | Critical | High | L | L | Beta | Blocked |
| F071 | Product Hub and Secure Commerce Handoff | discover, compose and securely launch Commerce | Product Hub / Integration | F059, F063, F069 | Critical | Critical | XL | XL | Beta | Blocked |

### 3.5 Commerce foundation

| ID | Feature | Business purpose | Architecture area | Hard dependencies | Priority | Risk | Complexity | Size | Release | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| F072 | Commerce Setup and Settings | make Commerce independently configurable by Business Unit | Commerce Setup/Configuration | F059, F061–F063 | High | High | L | L | Beta | Blocked |
| F073 | Commerce Catalog and Pricing Separation | preserve product UX while separating price ownership | Commerce Catalog/Pricing | F059, F061–F063, F072 | High | High | XL | XL | Beta | Blocked |
| F074 | Commerce Inventory and Branch Stock | establish owner-correct positions, movements and adjustments | Commerce Inventory | F059, F061–F063, F073 | High | Critical | XL | XL | Beta | Blocked |
| F075 | Commerce Customers | provide tenant-safe customer records and history | Commerce Customers | F059, F061–F063 | High | High | L | L | Beta | Blocked |

### 3.6 Commerce transactions and reporting

| ID | Feature | Business purpose | Architecture area | Hard dependencies | Priority | Risk | Complexity | Size | Release | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| F076 | Commerce Orders | own durable order creation and lifecycle | Commerce Orders | F073–F075, F060, F063 | High | Critical | XL | XL | Beta | Blocked |
| F077 | Commerce POS Checkout Orchestration | coordinate idempotent sell flow across canonical owners | Commerce POS | F076, F074, F078 | Critical | Critical | XL | XL | Beta | Blocked |
| F078 | Commerce Payments, Tax and Documents | separate monetary, tax and invoice facts | Commerce Payments/Tax/Documents | F059, F063, F073, F076 | Critical | Critical | XL | XL | Beta | Blocked |
| F079 | Commerce Returns and Transfers | coordinate reversible owner effects without foreign writes | Commerce Returns/Transfers | F074, F076–F078 | High | Critical | XL | XL | RC | Blocked |
| F080 | Commerce Reporting and Exports | provide reconstructable authorized operational projections | Commerce Reporting | F073–F079 | Medium | Medium | L | L | RC | Blocked |

### 3.7 Platform services, experience and operations

| ID | Feature | Business purpose | Architecture area | Hard dependencies | Priority | Risk | Complexity | Size | Release | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| F081 | Private File Storage and Document Media | store and serve authorized files privately | Storage Coordination | F056, F058–F063 | High | High | XL | XL | RC | Blocked |
| F082 | Background Jobs and Notifications | deliver tenant-aware asynchronous effects and messages | Queue/Event/Notification | F056, F058–F060, F063 | High | High | L | L | RC | Blocked |
| F083 | Feature Flags and Platform Configuration | control rollout without replacing entitlement/permission | Platform Configuration | F059, F060, F063 | High | Medium | M | M | Alpha | Blocked |
| F084 | Shared UI, Localization, Accessibility and Theme | make all experiences reusable, bilingual and accessible | Frontend / UI package | existing frontend authority; F057 soft | High | Medium | L | L | Alpha | Ready |
| F085 | Landing and Marketing Pages | present canonical product identity without duplicated commercial truth | Landing / Marketing | ADR-001; F069 only for future live catalog projection | Medium | Low | S | S | Alpha | Ready |
| F086 | Production Deployment, Monitoring, Backup and Recovery | operate migrated slices safely on approved infrastructure | Infrastructure / Operations | F057–F083; S4 technology/recovery approvals | Critical | Critical | XL | XL | RC | Blocked |
| F087 | Compatibility Removal and Production Data Cutover | retire browser authority and expired adapters safely | Migration Closure | F064, F071–F086 | High | High | L | L | Production | Blocked |

### 3.8 EasyCar candidate product scope

| ID | Feature | Business purpose | Architecture area | Hard dependencies | Priority | Risk | Complexity | Size | Release | Status |
|---|---|---|---|---|---|---|---|---|---|---|

## 4. Implementation Surface Requirements

| ID | Required entities | Required APIs/contracts | Required UI | Required backend/database | Required infrastructure |
|---|---|---|---|---|---|
| F056 | Decision, owner, data-classification records (documentation only) | none | decision/readiness views optional, not required | technology spikes only; no customer schema | isolated spike environments |
| F057 | pipeline/release evidence | check/result manifests | developer feedback only | no domain backend | CI runners, artifact/secret controls |
| F058 | module/port/runtime identities | health, correlation and module contracts | none | modular runtime, migration runner, isolated DB adapter | staging runtime and secrets |
| F059 | API version, contract, error/idempotency metadata | OpenAPI v1, module contracts, generated SDK base | facade integration diagnostics | API gateway/HTTP adapters, contract store | schema publication/CI |
| F060 | AuditRecord, correlation/health signals | Audit submission/query, telemetry conventions | authorized Audit/health views | append-only Audit store and instrumentation | logs, metrics, traces, health storage |
| F061 | Workspace, Business, BusinessUnit, Department, Branch, ID map | organization commands/queries/events | create/select/manage organization/context | owner aggregates, ancestry constraints, migration map | relational DB/backup |
| F062 | User, credential proof, Session, Recovery token | login/logout/session/recovery/context | auth/recovery/session-expiry screens | identity/session/recovery stores | secure mail/channel if approved; rate controls |
| F063 | Membership, Role, Permission, Assignment, AuthorizationDecision | membership/assignment/policy contracts | team, role/access and denial/recovery states | policy engine/owner guards and scoped records | security telemetry |
| F064 | context/admin projections | Core first-party/admin API | Core context, organization, team/admin journeys | composition queries/commands only through owners | none beyond Core runtime |
| F065 | BusinessDNA, DNARevision/provenance | DNA create/review/publish/read | Business DNA author/review/history | immutable/versioned DNA store | audit/backup |
| F066 | Capability, KnowledgeVersion, RuleVersion | publish/query/evaluate asset contracts | registry/publish/review screens | immutable registry/evaluator | version storage |
| F067 | BrainDecision, EvidenceReference | decision request/result/replay | decision explanation/history | deterministic engine and result store | observability/compute |
| F068 | Recommendation, alternative/rationale/evidence | recommendation query/lifecycle | recommendation list/detail/dismiss | recommendation composer/read model | none beyond Brain runtime |
| F069 | OSProduct, Plan, WorkspaceEntitlement, OSSubscription, approved lifecycle facts | catalog/subscription/access projections | plan/catalog/subscription states | Core Commercial owner stores | billing adapter only after decision |
| F070 | LimitRule, UsageMeasurement, BillingCoordination, BrandingPolicy | limit/usage/billing/branding contracts | usage/plan/branding administration | versioned policy/measurement stores | provider adapters after Product approval |
| F071 | ProductHubProjection, HandoffReference | discovery/access/handoff exchange/recovery | Product Hub cards/setup/launch/recovery | projection composer and secure exchange | shared session/routing, signing/secrets |
| F072 | CommerceSetup, configuration revision | setup/settings commands/queries | setup wizard/settings/module navigation | Commerce setup/config owner | none beyond core runtime |
| F073 | CommerceProduct, Price/PriceList | catalog/pricing CRUD/query | product/catalog/pricing views | separate Catalog/Pricing stores | optional search later |
| F074 | InventoryPosition, StockMovement, Adjustment | stock query/adjust/reserve effect contracts | inventory/adjustment/branch stock | Inventory owner with concurrency | DB transaction/locking support |
| F075 | Customer, customer history projection | customer CRUD/history | customer list/detail/form/history | Customer owner store | privacy controls |
| F076 | Order, OrderLine, status/history | order create/get/list/command | order list/detail/create/recovery | Orders owner and idempotency | outbox |
| F077 | POSTransaction, checkout command/result | draft/quote/checkout/idempotency | POS workspace/keyboard/receipt recovery | POS orchestrator; no foreign writes | low-latency telemetry |
| F078 | Payment, Refund, TaxApplication, Invoice/Document | authorize/capture/refund/tax/document contracts | payment/tax/invoice/print states | separate owner stores/adapters | payment provider only after approval |
| F079 | Return, Transfer, owner-effect ledger | return/transfer commands and effect status | return/transfer journeys/reconciliation | intent owners plus owner commands/outbox | workers/reconciliation |
| F080 | report/export projection/job | report/query/export status | reports/filter/export/download | reconstructable projections/export service | queue/object storage for large exports |
| F081 | ObjectMetadata, UploadIntent, ScanResult, FileReference | upload/confirm/download/delete/retention | upload/progress/error/preview/download | Storage Coordination and owner attachment | private object store, scanner, encryption |
| F082 | OutboxMessage, DeliveryAttempt, Notification/Preference | event/delivery/preference contracts | notification center/preferences/status | dispatcher/workers/channel adapters | queue/DLQ/providers |
| F083 | FeatureFlag, ConfigurationVersion | evaluate/admin/change contracts | authorized flag/config admin | server evaluator/version store | config/secret separation |
| F084 | UI primitives/tokens/locales (no domain entities) | component/localization contracts | shared components, RTL/theme/a11y states | none | visual/a11y test tooling |
| F085 | MarketingPage/public projection | optional public product projection | Landing pages, bilingual marketing | no canonical writes; optional read API | CDN/frontend hosting |
| F086 | Release, Backup, RestoreExercise, Incident evidence | health/readiness/ops interfaces | operator dashboards only | deploy/runtime operational adapters | VPS-equivalent, DB, queue, object, telemetry, backups |
| F087 | compatibility/consumer/migration records | deprecation/version terminal behavior | removal of legacy recovery paths | schema contraction and legacy disablement | archive/backup retention |

## 5. Security, Acceptance, and Test Summary

| ID | Tenant scope / roles / permissions | Minimum acceptance outcome | Test strategy |
|---|---|---|---|
| F056 | Governance scope; named decision owners | every spike/decision has status, owner, evidence, deadline and blocked boundary | document/link/count review; spike isolation proof |
| F057 | no tenant data in CI by default; least-privilege runners | clean checkout produces identical required checks and protected artifacts | pipeline positive/negative, secret/artifact tests |
| F058 | every protected port requires Workspace context | modular runtime deploys with zero cycles/foreign writes and safe health | architecture, module, integration, config tests |
| F059 | context IDs are inputs; owner permission enforced later | generated SDK and provider conform to v1, stable errors and idempotency | OpenAPI lint, provider/consumer, compatibility/replay |
| F060 | Audit access scoped; telemetry minimized | consequential sample action has immutable Audit and end-to-end correlation | immutability, redaction, correlation, health tests |
| F061 | Workspace tenant; Core org permissions | canonical ancestry is enforced and ambiguous legacy mappings quarantine | migration, FK, two-tenant/ancestry, UI/E2E |
| F062 | User plus active session; membership not implied | browser passwords cease authority; login/recovery/revocation fail safely | auth, CSRF, rate, enumeration, expiry, E2E |
| F063 | scoped role/permission and owner policy | allow/deny matrix has no broader unexplained grant and all denials are safe | policy unit, API/IDOR, two-tenant, Audit |
| F064 | authorized Core admin/context scopes | current Core journeys operate over APIs with unauthorized/recovery states | contract, UI, bilingual/a11y E2E, regression |
| F065 | one Business scope; DNA author/reviewer permissions | versions/provenance immutable and Business isolation enforced | domain/version, auth, API, UI, recovery |
| F066 | publisher/reviewer permissions and applicability | published assets immutable; evaluator references exact versions | publication, immutability, replay, permission tests |
| F067 | Business/decision permission; no target-write permission | same inputs/versions reproduce decision and explanation | deterministic unit/property, API, auth, Audit |
| F068 | authorized Business readers; advisory only | recommendation includes rationale/evidence/alternatives and cannot execute | contract, non-mutation, UI/a11y, regression |
| F069 | Workspace commercial permissions | entitlement/subscription/setup/access remain distinct; no inferred `OSEnablement` | domain, migration, policy, API/UI E2E |
| F070 | Product/Finance/admin permissions | only approved versioned limits/billing/branding rules evaluate | boundary, period/overage, policy and Product acceptance tests |
| F071 | Workspace/org/OS access plus audience-bound handoff | replay/expired/wrong-context handoff denies; valid flow reauthorizes | adversarial security, contract, route/E2E, recovery |
| F072 | Workspace+BU Commerce setup permission | Commerce setup remains OS-owned and configuration versioned | domain/API/UI/tenant/a11y tests |
| F073 | Workspace+BU catalog/pricing permissions | Product writes cannot mutate price/stock; current read UX preserved | owner-boundary, contract, migration, UI regression |
| F074 | Workspace+BU+Branch inventory permissions | stock changes exactly once under concurrency and never cross branch/tenant | domain/concurrency, DB/API, IDOR, migration |
| F075 | Workspace+BU customer permissions/privacy | scoped CRUD/history works with minimal authorized fields | validation, privacy/IDOR, API/UI regression |
| F076 | Workspace+BU+Branch order permissions | duplicate create is idempotent and order owner controls lifecycle | domain, API/idempotency, integration, E2E |
| F077 | cashier/POS scoped permission and workflow guards | checkout coordinates owners, exposes partial failure and never double-sells | orchestration/failure injection, performance, E2E |
| F078 | scoped finance/tax/document permissions and segregation | monetary/tax/document totals reconcile and owner facts stay separate | golden totals, provider contract, security, API/UI |
| F079 | return/transfer permissions and owner guards | effects execute once through owners; reconciliation handles failure | failure/compensation, concurrency, Audit, E2E |
| F080 | authorized report/export scope and field minimization | projections rebuild and exports contain only authorized rows/fields | projection rebuild, tenant/export, load, UI |
| F081 | current resource permission on upload/download | private file cannot cross tenant/resource; hash/scan/restore pass | file abuse, tenant/IDOR, integration, restore |
| F082 | Workspace recipient/preferences; admin channel permissions | delivery is idempotent, localized, retryable and observable | outbox/retry/DLQ, privacy, locale, integration |
| F083 | segregated config permission; flags never grant access | flag has owner/default/expiry and server authorization still applies | evaluator/default/failure, Audit, UI/admin |
| F084 | user-facing scope; no authorization role | critical UI works Arabic/English, RTL/LTR, keyboard/focus/theme | unit/visual/a11y/localization/E2E regression |
| F085 | public; admin only if future CMS | canonical identity, no unapproved commercial claims, accessible bilingual pages | content/link/SEO/a11y/localization regression |
| F086 | segregated operator roles and audited break-glass | deploy, health, alert, backup restore and rollback rehearsal meet approved objectives | deploy/restore/security/load/degraded/incident tests |
| F087 | migration/operator permission only | zero production browser authority/legacy consumers and rollback window closes | consumer scan, full regression, migration/restore |

## 6. Features Grouped by Priority

| Priority | Features | Count |
|---|---|---:|
| High | F064–F067, F072–F076, F079, F081–F084, F087 | 15 |
| Low | None | 0 |

Priority counts overlap no features and must total 32; the Critical range notation expands to the
IDs listed, not every numeric ID between disjoint ranges.

## 7. Features Grouped by Release

| Release target | Features | Outcome |
|---|---|---|
| Alpha entry/foundation | F056–F068, F083–F085 | governed runtime, trusted Core context, first deterministic Brain value, frontend quality |
| Beta | F069–F078 | commercial/Product Hub and independently usable Commerce foundation/checkout |
| Release Candidate | F079–F082, F086 | transaction recovery, reports, files, async delivery and production operations |
| Production | F087 | compatibility removal and single-authority cutover |

## 8. Dependency Matrix

| Feature | Direct hard predecessors | Unblocks |
|---|---|---|
| F056 | reports 00–14 | F057–F063, F069–F071, F081–F083, F086 |
| F057 | F056 | F058, F086 |
| F058 | F056, F057 | F059–F063, F081–F083 |
| F059 | F056–F058 | all API-backed Core/Commerce features |
| F060 | F058, F059 | F061–F083 consequential slices |
| F061 | F058–F060 | F062–F075, F081 |
| F062 | F058–F061 | F063–F064 |
| F063 | F060–F062 | all protected domain features |
| F064 | F059, F061–F063 | F065 and Core production context |
| F065 | F060–F064 | F066–F068 |
| F066 | F060, F065 | F067 |
| F067 | F063, F065, F066 | F068 |
| F068 | F067 | later AI/recommendation consumers |
| F069 | F056, F059–F063, ADR-023 successor | F070, F071 |
| F070 | F056, F069, Product decisions | production quotas/billing/branding |
| F071 | F059, F063, F069 | secure Commerce launch, F087 |
| F072 | F059, F061–F063 | F073–F074 |
| F073 | F059, F061–F063, F072 | F074, F076, F078 |
| F074 | F059, F061–F063, F073 | F076, F077, F079–F080 |
| F075 | F059, F061–F063 | F076, F080 |
| F076 | F060, F063, F073–F075 | F077–F080 |
| F077 | F074, F076, F078 | F079–F080 |
| F078 | F059, F063, F073, F076 | F077, F079–F080 |
| F079 | F074, F076–F078 | F080, F087 |
| F080 | F073–F079 | F087 |
| F081 | F056, F058–F063 | F080 exports, future portal files, F086 |
| F082 | F056, F058–F060, F063 | F079 notifications, F086 |
| F083 | F059, F060, F063 | controlled rollout for migrated slices |
| F084 | current frontend authority | all user-facing feature quality |
| F085 | ADR-001; F069 only for live commercial projection | Alpha marketing outcome |
| F086 | F057–F083 and approved operations decisions | F087, production go/no-go |
| F087 | F064, F071–F086 | clean production feature baseline |

## 9. Catalog Verdict

The catalog is complete for the Stage 4 Core+Commerce target and explicitly accounts for every
are currently Ready within narrow scopes; every architecture-sensitive implementation feature is
blocked until its predecessor gates close.
