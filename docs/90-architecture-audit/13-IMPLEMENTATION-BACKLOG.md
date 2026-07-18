# Implementation Backlog


> **Execution Scope Decision — 2026-07-18**

## 1. Backlog Policy

This backlog prioritizes future feature specifications; it is not a task list and does not
authorize implementation. Status means:

- **Ready:** sufficiently bounded to enter a future Spec Kit specification/plan lifecycle now.
- **Blocked:** target scope exists, but a hard dependency, decision, gate or owner is absent.
- **Deferred:** Product/Governance has not authorized the product/domain work.
- **Future:** deliberately outside the current Core+Commerce roadmap.

Current totals: **3 Ready, 29 Blocked, 0 Deferred, 0 Future**.

## 2. Ready Backlog

| Rank | Feature | Why Ready | Required first evidence | Scope guard |
|---:|---|---|---|---|
| 1 | F056 Governance, Technology and Product Decision Gate | Stage 4 explicitly permits Wave 0 decisions/spikes | reports 00–14, named Governance/Product/Security/Data/Ops participants | no code, schema, customer data or implicit approval |
| 2 | F084 Shared UI, Localization, Accessibility and Theme | Stage 4 marks pure presentation/a11y work safe | current critical-flow baseline and approved component scope | no domain logic, storage, permissions or broad rewrite |

Ready does not mean implementation may skip `spec.md`, `plan.md`, `tasks.md`, Constitution checks,
tests or review.

## 3. Blocked Backlog

| Feature | Primary blocker | Unblocking evidence | Release target |
|---|---|---|---|
| F057 CI/CD and Developer Quality Spine | F056 has not approved CI ownership/product/environment | accepted decision, owner, protected runner/secret model | Alpha |
| F058 Modular Backend Runtime Foundation | backend/database products remain Technical Spike Required | accepted technology ADRs and F057 baseline | Alpha |
| F059 Versioned API, Contracts and SDK v1 | backend runtime and REST/OpenAPI proposal not approved | F058 foundation and API Governance disposition | Alpha |
| F060 Audit and Observability Foundation | no backend/store/tool/retention/failure policy | F058/F059 plus Audit/telemetry owner decisions | Alpha |
| F061 Canonical Workspace and Organization Registry | no durable runtime, backup or approved legacy mapping | F058–F060, QG-03 backup and Business/BU mapping | Alpha |
| F062 Identity, Session and Recovery | authentication mechanism and canonical org absent | approved auth design, F061 and threat model | Alpha |
| F063 Membership, Roles, Permissions and Authorization | F061/F062 and canonical role/permission content absent | tenant/auth foundation and approved allow/deny catalog | Alpha |
| F064 Core Context, Administration and Organization UI Cutover | owner APIs/security unavailable | F059 and F061–F063 exit evidence | Alpha |
| F065 Business DNA Registry | canonical Business/security/version/Audit absent | F060–F064 and first approved DNA schema | Alpha |
| F066 Capability, Knowledge and Rule Registry | DNA and first governed asset slice absent | F065 and publication governance | Alpha |
| F067 Deterministic Business Brain Decisions | approved rule assets/decision semantics absent | F063/F065/F066 and one Product-approved decision type | Alpha |
| F068 Explainable Recommendations | no completed deterministic Decision runtime | F067 exit gate and first recommendation category | Alpha |
| F069 Product, Plan, Entitlement and Subscription Catalog | ADR-023 successor unresolved | accepted successor ADR, F059–F063 and catalog owner | Beta |
| F070 Commercial Policy: Limits, Billing and Branding | PD-05/08/09 unresolved | approved limits/provider/branding policy and F069 | Beta |
| F071 Product Hub and Secure Commerce Handoff | canonical commercial/access model unavailable | F069, F063 and approved handoff threat/contract design | Beta |
| F072 Commerce Setup and Settings | production tenant/API/security foundation absent | F059/F061–F063 and approved setup config scope | Beta |
| F073 Commerce Catalog and Pricing Separation | owner schemas/contracts/migration map absent | F072, F059/F063 and Catalog/Pricing field matrix | Beta |
| F074 Commerce Inventory and Branch Stock | Product split and branch-scoped persistence absent | F073 and concurrency/idempotency design | Beta |
| F075 Commerce Customers | production API/privacy/tenant policy absent | F059/F061–F063 and customer privacy rules | Beta |
| F076 Commerce Orders | Product/Inventory/Customer owner contracts incomplete | F073–F075 and approved order lifecycle | Beta |
| F077 Commerce POS Checkout Orchestration | Order/Inventory/Payment/Tax/Document owners incomplete | F074/F076/F078 and compensation policy | Beta |
| F078 Commerce Payments, Tax and Documents | Product/Finance/tax/document rules absent | F073/F076, provider/tax/numbering decisions | Beta |
| F079 Commerce Returns and Transfers | canonical owner commands and effect recovery absent | F074/F076–F078 and lifecycle/compensation policy | RC |
| F080 Commerce Reporting and Exports | canonical source owners/projections not stable | F073–F079 and report catalog/freshness policy | RC |
| F081 Private File Storage and Document Media | storage/recovery products and retention decisions absent | approved S4-ADR-020/032, F058–F063 | RC |
| F082 Background Jobs and Notifications | queue/channel products and operations absent | approved S4-ADR-021, F058–F060/F063 | RC |
| F083 Feature Flags and Platform Configuration | no server evaluator/config owner | F059/F060/F063 and flag lifecycle policy | Alpha |
| F086 Production Deployment, Monitoring, Backup and Recovery | all production services/operators/objectives absent | migrated slices, approved topology/RPO/RTO and restore owner | RC |
| F087 Compatibility Removal and Production Data Cutover | target consumers/data not migrated | F064/F071–F086, zero consumers/mismatches, rollback window | Production |

## 4. Deferred Backlog

| Feature | Deferred because | Decision required | Earliest reconsideration |
|---|---|---|---|

## 5. Future Backlog

| Feature | Future scope condition | Explicit non-scope now |
|---|---|---|

## 6. Ranked Feature Backlog

| Rank | Feature | Status | Priority | Size | Dependency/gate that controls start | Risk reduced or value produced |
|---:|---|---|---|---|---|---|
| 1 | F056 Decision Gate | Ready | Critical | M | reports 00–14 | prevents unapproved architecture/product/data work |
| 2 | F084 Shared UI/i18n/a11y/theme | Ready | High | L | bounded presentation scope | immediate quality/access value and regression protection |
| 3 | F085 Landing/Marketing | Ready | Medium | S | approved copy | canonical truthful public experience |
| 4 | F057 CI/CD spine | Blocked | Critical | L | F056 | reproducible merge/release evidence |
| 5 | F058 Backend runtime | Blocked | Critical | XL | F056/F057 tech approval | trusted execution boundary |
| 6 | F059 API/contracts/SDK | Blocked | Critical | XL | F058 | stable incremental frontend/backend seam |
| 7 | F060 Audit/observability | Blocked | Critical | L | F058/F059 | consequential evidence and diagnosis |
| 8 | F061 Organization Registry | Blocked | Critical | XL | runtime/backup/mapping | removes highest-centrality model drift |
| 9 | F062 Identity/session/recovery | Blocked | Critical | XL | F061/auth approval | replaces browser credential risk |
| 10 | F063 Membership/authorization | Blocked | Critical | XL | F061/F062/F060 | tenant/resource least privilege |
| 11 | F064 Core UI cutover | Blocked | High | L | F059/F061–F063 | trusted current Core journeys |
| 12 | F083 Feature flags/config | Blocked | High | M | F059/F060/F063 | safe cohort rollout without access conflation |
| 13 | F065 Business DNA | Blocked | High | L | F060–F064 | first canonical business context value |
| 14 | F066 Capability/Knowledge/Rules | Blocked | High | XL | F065 | governed deterministic inputs |
| 15 | F067 Brain Decisions | Blocked | High | XL | F063/F065/F066 | deterministic explainable intelligence |
| 16 | F068 Recommendations | Blocked | Medium | L | F067 | advisory user value without execution risk |
| 17 | F069 Commercial catalog | Blocked | Critical | XL | ADR-023/F059–F063 | correct product/access composition |
| 18 | F070 Limits/billing/branding | Blocked | Critical | L | Product decisions/F069 | approved commercial policy only |
| 19 | F071 Product Hub/handoff | Blocked | Critical | XL | F063/F069 | secure Commerce discovery/launch |
| 20 | F072 Commerce setup/settings | Blocked | High | L | F059/F061–F063 | independent OS configuration |
| 21 | F073 Catalog/Pricing | Blocked | High | XL | F072 | owner-correct sellable catalog |
| 22 | F075 Customers | Blocked | High | L | F059/F061–F063 | tenant-safe customer workflow |
| 23 | F074 Inventory | Blocked | High | XL | F073 | accurate branch stock foundation |
| 24 | F076 Orders | Blocked | High | XL | F073–F075 | durable order fact |
| 25 | F078 Payments/Tax/Documents | Blocked | Critical | XL | F073/F076 + Product rules | separate financial/document integrity |
| 26 | F077 POS checkout | Blocked | Critical | XL | F074/F076/F078 | core Commerce sell workflow |
| 27 | F079 Returns/Transfers | Blocked | High | XL | F074/F076–F078 | owner-correct reversible effects |
| 28 | F080 Reporting/Exports | Blocked | Medium | L | F073–F079 | authorized reconstructable insight |
| 29 | F081 Private files | Blocked | High | XL | storage/recovery approval | secure document/media capability |
| 30 | F082 Jobs/Notifications | Blocked | High | L | queue approval/runtime | reliable async delivery/reconciliation |
| 31 | F086 Production operations | Blocked | Critical | XL | migrated services/operators | deployable/recoverable RC |
| 32 | F087 Compatibility removal | Blocked | High | L | all target consumers/gates | clean production authority |

## 7. Backlog by Repository Module

| Repository surface | Features | Ownership constraint |
|---|---|---|
| Governance/docs/spec lifecycle | F056, F087 | never rewrites Freeze/history; approval required |
| CI/scripts/developer tools | F057 | no domain authority or production secrets |
| `backend/platform` | F058–F060, F081–F083, F086 | adapters/composition only; no ownerless business logic |
| Core backend modules | F061–F071 | Core owners; no Commerce operational facts |
| Commerce backend modules | F072–F080 | Commerce owners; no direct Core/foreign writes |
| `packages/contracts` / `packages/sdk` / `packages/auth` | F059, F062–F064, all API-backed slices | contracts/facades only; legacy namespace bounded |
| `packages/ui` and frontend apps | F064, F068, F071–F085 | presentation and app-owned UX; server final authority |
| infrastructure/operations | F057, F060, F081–F083, F086–F087 | explicit operators, rollback and tenant-safe services |

## 8. Blocker Register

| Blocker | Affected features | Closure evidence |
|---|---|---|
| B-01 Stage 4/Governance disposition | F057–F083, F086–F087 | F056 accepted decision register and owners |
| B-02 backend/database technology | F058–F063 and all backend slices | accepted tech ADRs/spike exit |
| B-03 data provenance/backup/mapping | F061, F069, F073–F081, F087 | inventory, isolated restore and approved maps |
| B-04 ADR-023 lifecycle successor | F069–F071 | accepted successor ADR and state migration design |
| B-05 Product commercial policy | F070, parts of F069/F078/F086 | PD-05/08/09 and Finance/Legal acceptance |
| B-06 authentication/role policy | F062–F064, all protected features | mechanism + role/permission catalog and threat model |
| B-07 storage/queue/recovery products | F081–F082, F086 | approved spikes, operators and restore/replay tests |
| B-08 Commerce domain/financial rules | F073–F080 | owner field/state matrices and Product/Finance rules |
| B-09 Operations ownership/objectives | F086–F087 | named operators, SLO/RPO/RTO, runbooks/rehearsal |

## 9. Size and Capacity Profile

| Estimated size | Feature count | Features |
|---|---:|---|
| XS | 0 | — |
| S | 1 | F085 |
| M | 2 | F056, F083 |
| L | 12 | F057, F060, F064, F065, F068, F070, F072, F075, F080, F082, F084, F087 |

Size is relative and does not establish time or team count. A future plan may split an XL feature
into stories/tasks only if the parent acceptance, owner and migration boundary remain traceable.

## 10. Backlog Readiness Verdict

The implementation backlog is intentionally front-loaded with decision safety, current frontend
data isolation, authorization, integrity and rollback. Three bounded features can enter
specification now; all other starts are evidence-gated.
