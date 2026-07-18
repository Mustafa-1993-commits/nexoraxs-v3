# Migration Risk and Readiness


> **Execution Scope Decision — 2026-07-18**
> EasyCar is a separate standalone application and is excluded from the current NexoraXS Core + Commerce execution plan.
> No EasyCar feature, dependency, milestone, sprint, backlog item, release gate, or implementation task is authorized by this document set.
> EasyCar will have its own repository/application architecture, audit, roadmap, specifications, backlog, and release plan.

## 1. Executive Summary

Overall migration execution readiness is **Not Ready**. The repository is conditionally ready for
Governance review, technical spikes, characterization and migration specification, but not for
durable schema, authentication, tenant, workflow or production cutover work.

Eight critical migration risks dominate: cross-tenant leakage; canonical organization
mis-mapping; insecure identity/privilege migration; unresolved `OSEnablement` access semantics;
Commerce financial/stock divergence; insecure cross-app handoff; absent backup/rollback ability;
and unapproved EasyCar/product workflow assumptions. Each is a no-go trigger at its affected
boundary.

The current frontend and test estate reduces UI-regression risk and supports incremental
migration. It does not reduce server isolation, data integrity or recovery risk because those
surfaces do not exist. **Evidence:** S3 GAP-001–006, dependency risks DR-01–12, technical debt
TD-01–15 and readiness §14; S4-ADR-001–047; `07-MIGRATION-PLAN.md`.

## 2. Overall Readiness Verdict

**Verdict: Not Ready** for migration implementation or production cutover.

**Conditionally Ready** activities are limited to Wave 0 approval, owner assignment, data
classification, technology spikes with no customer data, current behavior characterization, and
future Spec Kit planning after decision gates. No report in this audit claims business approval.

The no-go basis is concrete:

- no approved physical backend/database/auth/storage/queue/recovery products;
- no backend, database, server policy, API, CI, deployment, backup or restore runtime;
- canonical organization differs from executable records;
- `OSEnablement` successor remains unresolved;
- nine Product decision clusters block EasyCar/workflow/limits/portal/insurance scope;
- no accountable operators or rehearsed rollback capability exist.

## 3. Readiness Matrix

| Area | Rating | Evidence | Blockers | Required Gate |
|---|---|---|---|---|
| Architecture clarity | Conditionally Ready | Frozen logical model, ADR-033–040, S4 target | physical technologies and ADR-023 unresolved | QG-01 Architecture approval |
| Codebase stability | Conditionally Ready | 277 unit tests pass; architecture scan passes 299 files | browser-only authority; semantic owner drift | QG-11 Test evidence |
| Frontend migration | Conditionally Ready | separate apps/facades/mocks and E2E suites | handoff/origin/auth/data contract gaps | QG-08/09 API + frontend |
| Backend foundation | Not Ready | no backend source/runtime | S4-ADR-005/006 and Wave 1 absent | QG-01/04/12 |
| Contract/API readiness | Not Ready | frontend-internal contracts only; HTTP unavailable | transport/version/OpenAPI approval | QG-08 API contract |
| Canonical organization | Not Ready | ADR-004 clear; current model conflicts | Business/BU mapping and data owner absent | QG-03–05 |
| Tenant isolation | Not Ready | only client scope filters | no server/database/policy enforcement | QG-05 Tenant isolation |
| Authentication/authorization | Not Ready | browser password/session; UI permissions | provider/session/policies/role catalog absent | QG-06/10 |
| Commercial lifecycle | Not Ready | ADR-023 explicit unresolved successor | `OSEnablement` mapping/owner/state absent | QG-01 plus successor ADR |
| Commerce data integrity | Not Ready | owner collapses/direct foreign writes | no canonical stores/transactions/reconciliation | QG-04/08/11 |
| Business DNA/Brain | Conditionally Ready | frozen architecture high confidence | canonical Business/security/version/Audit missing | Wave 2 gates + QG-06 |
| Test coverage | Conditionally Ready | strong frontend unit/static tests | no DB/API/tenant/security/ops tests possible | QG-11 Test evidence |
| Data safety | Not Ready | no production inventory/backup/restore | provenance, owner and restore unproven | QG-03 Data backup |
| Deployment maturity | Not Ready | no CI/infra/health/telemetry | technology, operators, environments absent | QG-12 Deployment |
| Rollback capability | Not Ready | mocks characterize behavior only | no durable backup/change journal/runbook | QG-13 Rollback readiness |
| Documentation maturity | Conditionally Ready | Defined/Mostly Clear, 00–08 traceability | conflicting historical status/weak operations | QG-02 Documentation source |
| Ownership | Not Ready | architecture names logical owners | no accountable implementation/data/ops owners | QG-01 Architecture approval |
| Environment consistency | Not Ready | root workspace exists | hard-coded origins, nested metadata, no isolated envs | QG-12 Deployment |
| Security posture | Not Ready | strong logical Security Model | no production controls/runtime | QG-10 Security |
| Product scope | Not Ready for EasyCar | S2/S3 prove absence | nine decisions in §16 | Product approvals before QG-07 |

## 4. Migration Risk Register

| Risk ID | Risk | Area | Likelihood | Impact | Severity | Detection | Rollback Requirement |
|---|---|---|---|---|---|---|---|
| MR-001 | Cross-Workspace data exposure during/after scope migration | Tenancy | High | Critical | Critical | two-Workspace API/DB/job/cache/file negative matrix; telemetry | disable target traffic, revoke access, preserve evidence, restore/reconcile scoped backup |
| MR-002 | Legacy BusinessUnit maps to wrong Business/BU ancestry | Domain/data | High | Critical | Critical | deterministic ID map, orphan/ambiguity quarantine, FK/count checks | retain source and mapping; stop writes; restore target snapshot |
| MR-003 | Browser identity/role mapping grants unauthorized access or locks out users | Security | High | Critical | Critical | session/role allow-deny comparison, anomaly/Audit monitoring | revoke uncertain grants, revert catalog/policy/session path, operator recovery |
| MR-004 | `OSEnablement` semantics create wrong subscription/setup/access state | Commercial lifecycle | High | Critical | Critical | decision/state mapping review; entitlement/access E2E | no migration before ADR; disable target projection/handoff; retain read-only source |
| MR-005 | Commerce migration duplicates or loses money, stock, tax or documents | Data integrity | High | Critical | Critical | golden totals, effect/idempotency ledgers, reconciliation queries | stop commands, drain/quarantine effects, reconcile facts; never erase financial/Audit history |
| MR-006 | Handoff leaks/replays identity or resolves wrong context | Integration/security | High | Critical | Critical | expiry/audience/replay/context adversarial tests and telemetry | stop issuance/exchange, invalidate tokens, recovery route, prior read-only launch path |
| MR-007 | Migration cannot restore durable data or compatible application state | Recovery/deployment | High | Critical | Critical | isolated restore and rollback rehearsal | verified backup/PITR, previous artifact/config, migration journal |
| MR-008 | Unapproved EasyCar/workflow/plan/insurance assumptions become schema truth | Product/domain | High | Critical | Critical | authority/product gate and unknown-value scan | abort affected work; quarantine values; no target writes |
| MR-009 | Framework/database choice cannot enforce module or tenant boundaries | Technology | Medium | High | High | spike boundary/isolation/operability criteria | abandon spike resources; choose alternative through ADR |
| MR-010 | Legacy TS records become accidental public API | Contracts | High | High | High | export/schema/consumer inventory and contract review | keep legacy namespace private; revert API publication |
| MR-011 | API/SDK version mismatch breaks current UI or causes duplicate command | API | Medium | High | High | provider/consumer/idempotency tests; canary error telemetry | route prior API/client, disable new writes |
| MR-012 | Production silently falls back to browser mock storage | Frontend/data | Medium | Critical | High | environment assertions, storage write scan, runtime telemetry | fail closed; restore prior server version, never use mock as production data |
| MR-013 | File migration exposes objects or attaches them to wrong resource | Storage/security | Medium | Critical | High | authorization/hash/tenant/scan/expiry tests | disable access, quarantine objects, serve validated source only |
| MR-014 | Hard-coded plan limits deny/allow service incorrectly | Commercial/product | High | High | High | catalog/entitlement version comparison and Product approval | revert catalog version; disable enforcement where no approved rule |
| MR-015 | Audit write/correlation gaps remove consequential evidence | Audit | Medium | Critical | High | Audit coverage/immutability/correlation tests and alerts | stop affected critical command or use approved fail-safe; restore Audit store |
| MR-016 | Outbox retry duplicates effects or drops notifications | Async | Medium | High | High | failure injection, idempotency, lag/DLQ metrics | pause workers, quarantine DLQ, replay under runbook |
| MR-017 | Secrets or tenant data enter logs/builds/client bundles | Security/ops | Medium | Critical | High | secret scans, telemetry schema/redaction tests | rotate secrets, block release, purge protected telemetry under incident process |
| MR-018 | Compatibility adapters become permanent parallel architecture | Maintainability | High | High | High | owner/date/removal-condition register and import/traffic scan | block new consumers; enforce sunset or approved extension |
| MR-019 | Read projection lags canonical owners and misleads Product Hub/reports | Data/read models | Medium | High | High | freshness/rebuild/reconciliation metrics | rebuild projection; expose degraded/stale state; no canonical rollback |
| MR-020 | Current route/origin changes lose sessions or create redirect loops | Frontend/deployment | Medium | High | High | environment E2E for routes/cookies/handoff/recovery | revert proxy/frontend artifact and route config |
| MR-021 | Arabic/RTL/a11y regression blocks critical users | Frontend/quality | Medium | High | High | bilingual/RTL/keyboard/focus/semantic regression | revert affected UI release/flag while server remains compatible |
| MR-022 | CI passes static rules while semantic owner drift remains | Architecture/testing | High | High | High | owner matrix reviews and integration tests beyond scanner | block merge/cutover; revert offending slice |
| MR-023 | Hidden real data in browser/demo stores is lost or imported without consent | Data/privacy | Medium | Critical | High | provenance inventory and customer/operator confirmation | preserve encrypted export, stop import, quarantine data |
| MR-024 | Deployment single-site failure exceeds business tolerance | Availability | Medium | High | High | approved SLO/RTO exercise, health/capacity tests | restore/relocate under runbook; explicit degraded/unavailable state |
| MR-025 | Historical “Final”/generated docs redirect implementation | Governance | High | High | High | authority/supersession gate and references scan | stop affected work; route decision through Governance |
| MR-026 | Business Brain consumes unversioned/hard-coded assumptions | Intelligence | Medium | High | High | provenance/version/replay and rule publication tests | disable decision invocation; preserve versions/Audit |
| MR-027 | Admin/support access becomes unscoped super-admin bypass | Security/tenancy | Medium | Critical | High | segregated policy, reason/approval, cross-tenant Audit review | revoke operator role/session; incident response |
| MR-028 | Schema contraction removes data/consumer fields too early | Data/API | Medium | High | High | traffic/consumer inventory, backup and compatibility window | restore compatible artifact/schema from verified backup |
| MR-029 | Notification content leaks sensitive data or wrong language | Notification/privacy | Medium | High | High | template/data-minimization/locale/recipient tests | pause channel/template version and quarantine delivery |
| MR-030 | No accountable operator responds to failed migration | Ownership/ops | High | High | High | named RACI/on-call/release record before gate | abort release; no unattended cutover |

## 5. Critical Risks

### MR-001 — Tenant leakage

Any target read/write/job/cache/file operation that crosses Workspace scope is a release-stopping
security incident. Database constraints, owner repositories and policies must all fail safely;
frontend filtering is irrelevant to the gate. **Evidence:** S3 GAP-002, DR-03/05/10; ADR-034.

### MR-002 — Canonical organization mis-mapping

Business/Business Unit identity is upstream of DNA, permissions, OS scope and all operational data.
Ambiguous legacy records cannot be auto-assigned. **Evidence:** S2 CON-02; S3 GAP-001/DR-01;
ADR-004.

### MR-003 — Identity and privilege migration

Plain browser credentials cannot be imported as trusted password material. Role labels cannot be
assumed equivalent to target permissions. Recovery, account claim and deny-by-default mappings are
required. **Evidence:** S3 GAP-002/005 and TD-03/10.

### MR-004 — Unresolved lifecycle/access semantics

`OSEnablement` affects commercial access but has no approved successor. Any migration before the
successor ADR risks unauthorized access or lost subscriptions. **Evidence:** S2 CON-03; S3 GAP-004;
ADR-023.

### MR-005 — Commerce fact divergence

Sequential browser effects and cross-owner writes can produce money/stock/tax/document
inconsistency when split. Owner commands, idempotency, outbox and reconciliation must be proved
before target writes. **Evidence:** S3 GAP-009–012 and TD-07–09.

### MR-006 — Handoff compromise

Current URL/context handoff has no signature/expiry/replay protection and cannot coherently share
origin-local state. It is not a production compatibility option. **Evidence:** S3 GAP-003/018;
ADR-037.

### MR-007 — No recovery path

The repository has no backup/restore/deployment runtime. No durable migration can proceed until an
isolated restore and compatible application rollback are rehearsed. **Evidence:** S2 UND-03/04;
S3 GAP-026.

### MR-008 — Product assumptions becoming data architecture

EasyCar and its statuses/entities are absent from authority and code. Creating them would turn a
prompt into business truth and could make later data migration destructive. **Evidence:** S2 §11;
S3 §§5.3,6; S4-ADR-019/039–043.

## 6. Tenant Isolation Risks

| Scenario | Required detection/control | No-go signal |
|---|---|---|
| forged `workspace_id`/organization ID | canonical membership/ancestry resolution; owner policy | any object existence or data disclosed |
| missing Workspace on row | non-null/schema validation and quarantine | any tenant row with unknown scope |
| background job replayed in wrong tenant | immutable verified scope + consumer revalidation | worker accepts producer scope blindly |
| cache key collision | tenant/resource/version key contract and cross-tenant test | same key/value visible across Workspaces |
| file object reused across tenants | opaque metadata authorization and object-owner scope | URL/object ID grants access |
| projection/search leakage | source scope, authorization filter, rebuild test | unauthorized result or count disclosed |
| support/operator access | segregated role, reason/approval, Audit | unscoped admin bypass |

Risk remains Critical until QG-05 passes across every migrated storage and execution surface.

## 7. Security Risks

- Browser-stored passwords/session IDs require replacement, not migration as secrets.
- Employee authentication mechanism is blocked by technical approval; portal authentication is a
  separate Product/Security decision.
- Authorization requires membership, permission, ancestry, entitlement/state and owner guards;
  role or token claims alone are insufficient.
- Handoff/file/webhook tokens must be purpose/audience/expiry/integrity bound and excluded from
  logs ordinary URLs where the Security Model prohibits them.
- Administrative and migration credentials are least-privilege, time-bounded and audited.
- CI/build/telemetry secret exposure blocks release and triggers rotation/incident handling.
- Unknown privacy/retention/compliance obligations block collection of real EasyCar/customer data.

## 8. Data Integrity Risks

The highest-integrity surfaces are organization ancestry, memberships/roles, subscription/access,
Commerce money/stock/tax/documents, immutable Business Brain inputs/outputs, files and Audit.
Every migration uses source/target version, counts/checksums/totals, quarantine, change journal and
restore identifier. A successful script exit is not acceptance. Financial/Audit facts are never
deleted to simulate rollback; reconciliation or compensating owner facts preserve history.

## 9. API Compatibility Risks

| Risk | Control | Detection |
|---|---|---|
| legacy record promoted as v1 | explicit legacy namespace and owner review | schema/export diff |
| generated client/server drift | OpenAPI source and CI generation check | provider/consumer tests |
| breaking additive assumption | compatibility analyzer and version policy | old-client contract suite |
| duplicate create/command | scoped idempotency and replay-safe owner | duplicate/failure injection |
| error leakage/instability | stable code/problem format and safe correlation | negative contract tests |
| unknown consumer at sunset | traffic/version telemetry and consumer register | zero-traffic window |

## 10. Frontend Regression Risks

Current routes and broad Commerce journeys are assets. Migration risk comes from session/cookie
topology, context switching, combined-read projection changes, missing loading/error/unauthorized
states, hard-coded localhost values, localization and browser-key cleanup. Each facade cutover uses
shadow reads/canary writes and preserves a compatible server/API version for rollback. Browser mocks
remain tests only; production rollback reverts server/client artifacts, not canonical data authority.

## 11. Deployment Risks

- No current CI, immutable artifact, environment isolation, secret store, health, telemetry,
  backup, restore or operator process exists.
- A VPS-equivalent target concentrates failure; its accepted availability/RTO must be explicit.
- Application rollback can fail if schema is contracted too early; expand compatibility stays
  through the rollback window.
- Queue workers can run incompatible code during deploy; worker/API/schema versions require a
  rollout order and drain/quarantine controls.
- Object/database backups must be mutually compatible with release versions.
- Deployment without a named operator and abort authority is no-go.

## 12. Documentation and Governance Risks

S2 found 18 contradiction and 18 duplication clusters. The authority chain reduces but does not
eliminate the chance that v5.3 “Final,” Specs 047–049 or generated guidance reintroduces the wrong
organization/lifecycle/technology model. Every migration spec must cite exact controlling
Freeze/ADR and S4 decision; historical documents remain untouched but receive status/index links
through a separately approved documentation change. Stage 4 itself remains Proposed.

## 13. Ranked Migration Backlog

This is a ranked architecture backlog, not implementation tasks or feature specifications.

| Rank | Item | Priority | Dependency | Risk Reduced | Blocking |
|---:|---|---|---|---|---|
| 1 | Architecture/Governance disposition and named owners | Critical | Stage 4 complete | MR-009/025/030 | all waves |
| 2 | Classify real/demo/pilot data and prove backup/restore path | Critical | owners | MR-007/023 | durable migration |
| 3 | Backend framework modularity/security spike | Critical | rank 1 | MR-009 | Wave 1 |
| 4 | Database/tenancy/migration/recovery spike | Critical | ranks 1–2 | MR-001/002/007 | Wave 1–2 |
| 5 | CI/contract/deploy/rollback spine | Critical | ranks 3–4 | MR-007/010/011/017 | all cutovers |
| 6 | Canonical Business/BU mapping decision and quarantine rules | Critical | rank 4 | MR-002 | tenancy/Brain/Commerce |
| 7 | Server identity/session/recovery model | Critical | ranks 3–5 | MR-003 | protected operations |
| 8 | Tenant/resource authorization and negative matrix | Critical | ranks 6–7 | MR-001/003/027 | production writes |
| 9 | ADR-023 lifecycle successor decision | Critical | rank 1 + Product/Core owners | MR-004 | Product Hub/access |
| 10 | Append-only Audit/correlation foundation | Critical | ranks 3–8 | MR-015/027 | consequential writes |
| 11 | v1 API/OpenAPI/version/error/idempotency standard | High | ranks 3–5 | MR-010/011 | SDK/backend slices |
| 12 | Secure Product Hub handoff/recovery contract | Critical | ranks 8–11 + 9 | MR-006 | OS launch |
| 13 | Commerce owner/data mapping and reconciliation design | High | ranks 6,8,11 | MR-005 | Commerce writes |
| 14 | Product/Pricing/Inventory/Customer owner cutovers | High | rank 13 | MR-005/019 | transaction owners |
| 15 | POS/Order/Payment/Tax/Document/Return/Transfer consistency | Critical | rank 14 | MR-005/016 | Commerce production |
| 16 | Private file/storage security spike and migration design | High | ranks 4,8 | MR-013/023 | file features |
| 17 | Queue/outbox/DLQ/notification operations | High | ranks 5,10 | MR-016/029 | async release |
| 18 | Business DNA/Knowledge/Rules/Brain deterministic slice | High | ranks 6,8,10 | MR-026 | intelligence value |
| 19 | Observability, backup, restore, incident and deployment rehearsal | Critical | ranks 5,10,16–17 | MR-007/017/024/030 | production go-live |
| 20 | Compatibility removal and final readiness review | High | all migrated consumers | MR-018/028 | feature baseline |

## 14. Quality Gates

| Gate | Minimum evidence | Owner | Failure blocks |
|---|---|---|---|
| Architecture approval | accepted disposition, owners, Freeze/ADR trace | Architect/Governance | affected migration/spec |
| Documentation source | one controlling source, approved artifacts, valid links/status | Documentation owner | merge/release |
| Data backup | inventory + successful isolated restore | Data/Ops | durable changes |
| Schema validation | expand/backfill counts/checksums/constraints/quarantine | Data/domain owner | cutover/contraction |
| Tenant isolation | cross-Workspace DB/API/job/cache/file/handoff matrix | Security/QA | any production traffic |
| Authorization | scoped allow/deny/state/owner matrix + Audit | Identity/domain owner | protected write |
| Workflow | Product-approved states/map/guards and unknown fail-closed | Product/workflow owner | workflow schema/API/UI |
| API contract | OpenAPI/provider/consumer/version/error/idempotency | API/domain owner | SDK/UI cutover |
| Frontend regression | current/target journeys, language/direction/a11y/performance | Apps/QA/Design | cohort expansion |
| Security | threat model, auth/IDOR/CSRF/file/secret/dependency evidence | Security | release |
| Test coverage | required risk categories or approved N/A | QA/owners | wave exit |
| Deployment | immutable artifact, config/secrets, health/telemetry/canary | Operations | production promotion |
| Rollback readiness | triggers, backup, prior version, compatibility, rehearsal | Release/Data/Ops | cutover |

These gates are identical in meaning to QG-01–13 in `07-MIGRATION-PLAN.md` §17.

## 15. Feature Freeze Rules

### 15.1 Overall disposition

New feature work is **partially frozen**. Architecture-sensitive domain, persistence, security,
workflow, commercial and integration work is frozen until its gates close. Isolated behavior that
cannot deepen migration debt may continue through normal Spec Kit approval.

| Classification | Repository areas/work | Rule and evidence |
|---|---|---|
| Safe for feature work | test characterization; architecture checks; pure presentation fixes in `packages/ui`; isolated Landing presentation with approved copy; bilingual/a11y corrections | must not add canonical terms, owner writes, storage keys, APIs or Product claims; S3 retained strengths |
| Conditional feature work | existing Core/Commerce UI behind current facades; read-only projections; deterministic mock/test adapters | requires approved spec, no blocked boundary, compatibility/test plan and no new cross-owner write |
| Architecture migration only | Core/Commerce providers; `packages/types/contracts/sdk/shared`; auth/session; organization; tenancy; Product Hub handoff; Commerce command services; production storage | only an approved migration-wave specification may change these; GAP-001–018 |
| Frozen | `OSEnablement` successor; production tenant/auth/permission schemas; destructive data cleanup; EasyCar workflow/status; plan limits; portal/insurance/delegation/bank scope | authority/Product/backup gates unresolved |
| Requires Product decision | EasyCar MVP; Dealer/Finance/Broker meaning; application states; portal OTP; insurance; Viewer/delegation; inventory/reservation/deposit/bank; billing; branding | S4-ADR-019/027/039–043/046/047 |

Feature flags do not authorize frozen work. They may limit rollout only after the underlying model,
security and migration are approved.

## 16. Outstanding Product Decisions

| Decision ID | Question | Why it matters | Options (not approval) | Architecture/migration impact | Default technical assumption while open | Required owner | Deadline |
|---|---|---|---|---|---|---|---|
| PD-01 / S4-ADR-039 | Is EasyCar an approved NexoraXS product/bounded context, and are Dealer/Finance/Broker roles, organizations or product classifications? | defines owners, tenancy and MVP | separate OS; Core product; external product; not in scope | domain modules, contracts, routes, data mapping | omit; Workspace remains tenant; no typed Workspace | Product + Architecture | Wave 0 before roadmap entry |
| PD-02 / S4-ADR-019 | What is the Application state machine? | controls schema, guards, notifications and migration | Product supplies complete lifecycle | workflow/API/UI/data migration | no canonical states; reject unknown writes | Product + workflow owner | before any workflow spec/QG-07 |
| PD-03 / S4-ADR-041 | Is insurance mandatory/optional/external and a child workflow or application attribute? | determines owner and whether `insured/no_insurance` are states | sub-workflow; attribute; external integration; out of MVP | status map, evidence, integrations | no insurance model/status | Product + domain owner | with PD-02 |
| PD-04 / S4-ADR-042 | Is delegation allowed, conditional/plan-limited, and is Viewer enabled? | affects role assignments and approval guards | scoped delegation variants; viewer on/off | permission/backfill/Audit/workflow | no delegation; no Viewer grant | Product + Identity/workflow | before role/workflow mapping |
| PD-05 / S4-ADR-027 | What user/application/storage limits, periods, overage and grandfathering apply per plan? | determines entitlement/enforcement/billing | Product/Finance matrix | catalog versions, counters, backfill, UI | no unapproved enforcement; mock values ignored | Product + Finance | before commercial cutover |
| PD-06 / S4-ADR-040 | How does portal identity work: one-time link, session, OTP/step-up, expiry and revocation? | protects customer documents/data | link+session; OTP; account; no portal MVP | identity/API/file/threat model | no portal/routes/uploads | Product + Security | before portal/file spec |
| PD-07 / S4-ADR-043 | Who owns Car, Offer, Vehicle Change, Reservation, Deposit, Inventory and Bank Submission, and which are MVP? | prevents shared/Commerce ownership collision | bounded contexts/phases supplied by Product | domain graph, financial/storage/API migrations | none created; Bank deferred | Product + Architecture/Finance | before entity specs |
| PD-08 / S4-ADR-046 | Are subscriptions billed internally or by an external provider, with what tax/refund/reconciliation rules? | controls activation and financial ownership | internal; external provider; manual pilot | commercial contracts/webhooks/ops | no paid activation automation | Product + Finance | before production subscriptions |
| PD-09 / S4-ADR-047 | Is tenant branding allowed and plan/Workspace/Business scoped? | controls settings/assets/entitlement | no branding; plan-based; scoped overrides | schema, object storage, UI and limits | static platform branding only | Product + Design | before branding work |

## 17. Go / No-Go Criteria

### Go for Wave 0 only

- reports 00–09 exist and Stage 1–3 hashes are unchanged;
- Governance accepts the reports for review, not as automatic authority;
- no runtime/config/customer data changes are included;
- owners can conduct bounded spikes and data discovery safely.

### No-go for Wave 1

Any missing backend/database decision owner, unapproved technology selection, unknown customer data,
missing CI environment or inability to isolate spike data is no-go.

### No-go for any tenant/auth/data cutover

Missing backup restore, unresolved Business mapping, incomplete negative tenant matrix, browser
credentials treated as production truth, unexplained broader access, or absent Audit/rollback owner
is no-go.

### No-go for commercial/Product Hub cutover

ADR-023 successor unresolved, plan values unapproved, lifecycle mapping incomplete, or handoff
replay/context tests failing is no-go.

### No-go for Commerce transaction cutover

Any money/stock/tax/document mismatch, direct foreign write, duplicate effect, unreconciled outbox
or missing Finance/Commerce owner approval is no-go.

### No-go for production

Any open Critical risk; any unaccepted High security/data risk; failed tenant/auth/API/frontend/
backup/restore/deploy gate; unknown consumer; missing operator/incident/rollback ownership; or
unapproved collection of product/customer data is no-go.

## 18. Final Readiness Verdict

**Overall migration readiness: Not Ready.**

The repository is ready to approve and specify Wave 0 work, and conditionally ready to preserve
frontend value through its existing facades and tests. It is not ready for migration execution
because trusted runtime, data safety, tenant security, operator ownership and rollback capability
are absent, while critical domain/lifecycle and Product decisions remain open.

Readiness changes only through gate evidence. Completing documents or time-boxed spikes without
accepted decisions, restore proof, isolation tests and named owners does not change the verdict.
