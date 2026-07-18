# Release Plan


> **Execution Scope Decision — 2026-07-18**

## 1. Release Strategy

The release sequence is Alpha → Beta → Release Candidate → Production. Releases are evidence
states, not dates. Each release promotes compatible vertical slices behind the retained frontend
plan.

| Release | Milestones | Feature scope | Audience/data posture | Primary outcome |
|---|---|---|---|---|
| Alpha | M0–M3 | F056–F068, F083–F085 | internal/approved testers; no unclassified customer data | governed runtime, trusted Core context, first deterministic intelligence value and frontend quality |
| Beta | M4–M6 | F069–F078 | approved pilot Workspaces after tenant/security gates | commercial/Product Hub and core Commerce sell workflow through owner APIs |
| Release Candidate | M6–M7 closure | F079–F082, F086 plus all prior regression | production-like staging/canary with approved data/operations | recoverable transactions, files, async delivery and production operations |
| Production | M8 | F087 plus accepted prior features | approved production Workspaces | one production authority, expired compatibility removed and accountable operations |

## 2. Alpha Release

### 2.1 Alpha purpose

Prove the architecture can deliver useful current/frontend and deterministic intelligence value on
a trusted Core foundation without waiting for all Commerce production migration.

### 2.2 Alpha entry criteria

- F056 dispositions approve backend/database/API/auth directions and assign owners.
- Any material pilot data is classified and backed up/restorable.
- F057 pipeline protects current lint/type/unit/architecture/build evidence.
- Alpha environments are isolated and contain no unapproved real customer data.
- F084/F085 scopes have Product/Design approval without domain claims.

### 2.3 Alpha included outcomes

- modular runtime, API/SDK v1 conventions, Audit/telemetry foundation (F058–F060);
- canonical Workspace/Business hierarchy, sessions, membership/authorization and Core UI cutover
  (F061–F064);
- Business DNA, governed inputs, deterministic Brain Decision and explainable advisory output
  (F065–F068);
- server-owned rollout configuration (F083);
- bilingual accessible shared UI/theme and canonical Landing content (F084–F085).

### 2.4 Alpha exit criteria

- two-Workspace negative matrix has no leak across API/database/cache/job/file surfaces in scope;
- browser passwords and localStorage records are not authority in Alpha runtime;
- one current Core journey works API-first with safe unauthorized/recovery states;
- one Business Brain decision replays exactly from immutable versions and cannot execute target
  changes;
- required Audit/correlation exists for allowed and denied consequential sample actions;
- Arabic/English, RTL/LTR, keyboard/focus/theme and accessibility evidence passes for Alpha flows;
- deploy/rollback of Alpha artifact works in its isolated environment.

### 2.5 Alpha rollback

Alpha can revert app/runtime artifacts and disable Alpha endpoints/flags. Durable canonical records
remain under migration-specific restore/reconciliation; browser mocks may continue only in test/demo
environments. Published immutable DNA/Knowledge/Rule/Decision/Audit history is preserved.

## 3. Beta Release

### 3.1 Beta purpose

Prove commercial composition and the independently usable Commerce setup/catalog/inventory/customer/
order/POS/financial workflow for controlled pilot Workspaces.

### 3.2 Beta entry criteria

- Alpha exit and security gates pass with no open Critical risk.
- ADR-023 successor is Accepted before F069 lifecycle work.
- PD-05/08/09 are approved for any limit/billing/branding behavior exposed.
- Product/Finance approve Commerce pricing/payment/tax/document rules included in Beta.
- Product Hub handoff threat model and compatibility/rollback plan are approved.
- Pilot Workspaces, support owner, data provenance and consent are explicit.

### 3.3 Beta included outcomes

- Product/Plan/Entitlement/Subscription and approved commercial policies (F069–F070);
- secure Product Hub discovery/handoff/recovery (F071);
- Commerce setup, Catalog/Pricing, Inventory and Customers (F072–F075);
- Orders, POS orchestration and separate Payment/Tax/Document facts (F076–F078).

F079/F080 may be implemented during M6 but do not become release-required until RC.

### 3.4 Beta exit criteria

- entitlement, subscription, setup, readiness and operational access are independently verified;
- expired/replayed/wrong-audience/wrong-context handoff denies and recovers;
- owner APIs contain no Product price/stock write or direct foreign Return/Transfer write in Beta
  paths;
- stock/order/payment/tax/document golden totals and idempotency pass under concurrency/failure;
- pilot canary error, denial, latency and reconciliation metrics remain within approved thresholds;
- all pilot changes are Audit-correlated and rollback/reconciliation rehearsed;
- no critical/high security or data-integrity finding remains unaccepted.

### 3.5 Beta rollout and rollback

Roll out by allow-listed Workspace/feature facade: shadow reads → canary writes → monitored cohort.
Rollback stops target writes, returns clients to the prior supported server/API version, drains or
quarantines outbox effects and reconciles canonical facts. It never returns pilot production state
to localStorage or deletes financial/Audit history.

## 4. Release Candidate

### 4.1 RC purpose

Close transaction recovery and demonstrate the complete production topology, storage, asynchronous
delivery, monitoring, backup, restore, incident and rollback capabilities.

### 4.2 RC entry criteria

- Beta exit passes and pilot reconciliation is complete.
- F079/F080 owner lifecycles/report catalog are approved.
- object storage, queue, notification, deployment and backup/recovery technology decisions are
  accepted with named operators.
- SLO/alert/RPO/RTO/retention/capacity targets required for go-live are approved.
- production-like staging matches intended routing, secrets and service topology.

### 4.3 RC included outcomes

- owner-correct Returns/Transfers and reconstructable Reporting/Exports (F079–F080);
- private file storage and secure document/media operations (F081);
- transactional jobs, retry/DLQ and localized notifications (F082);
- production deployment, monitoring, backup, restore and incident operations (F086).

### 4.4 RC exit criteria

- full tenant/auth/API/frontend/security/localization/a11y regression passes;
- failure-injected Return/Transfer/POS effects reconcile exactly once;
- report projections rebuild and exports contain only authorized fields/rows;
- file upload/download/scan/quarantine/hash/tenant/restore tests pass;
- outbox retry/DLQ/replay and notification privacy/localization tests pass;
- immutable artifact deploy, canary, rollback, database/object restore and incident drill meet
  approved objectives;
- operator dashboards/alerts are actionable and release/rollback responsibility is accepted;
- no Critical risk is open and each High risk has accepted treatment/owner.

### 4.5 RC rollback

Use the previous compatible artifact/API version and retained expand schema. Stop new commands,
uploads and workers as indicated; quarantine in-flight work; restore from the verified backup only
under runbook. Validate tenant/integrity before resuming writes.

## 5. Production Release

### 5.1 Production purpose

Establish a single trusted production authority and a clean baseline for subsequent approved
feature work.

### 5.2 Production entry criteria

- RC exit and all QG-01–QG-13 gates pass.
- zero unknown API/SDK/route/browser-key/schema/role/ID-map consumers remain for planned removals.
- data reconciliation has zero unexplained mismatch/quarantine, or an owner-approved non-destructive
  disposition.
- compatibility sunset/support and rollback windows are communicated and observed.
- security, Product, Architecture, Data, QA, Release and Operations owners sign the go/no-go record.

### 5.3 Production included outcome

F087 removes only compatibility mechanisms whose explicit removal conditions have passed. It
disables production mock/browser authority, sunsets old API/routes after support, contracts schemas
only after rollback closure, and preserves historical documentation, Audit, financial facts and
required ID/migration evidence.

### 5.4 Production exit criteria

- no production state or authentication depends on local/session storage;
- canonical organization, security, commercial and Commerce owner conformance scans/tests pass;
- all supported contracts/SDKs and consumers are inventoried/versioned;
- backup/restore/rollback/incident and operator evidence is current;
- release documentation/runbooks/API docs reflect actual versions and behavior;
- post-release health/business/security signals remain within approved thresholds for the defined
  observation window;
- architecture-sensitive feature freeze may be lifted only by the final readiness review.

## 6. Definition of Ready

A feature is Ready for implementation planning only when all applicable items pass:

1. Feature ID, business purpose, measurable outcome and non-scope are approved.
2. Controlling Freeze/Accepted ADRs and owning domain/canonical write owner are cited.
3. Product decisions and technical spikes affecting the boundary are closed; no Deferred Decision
   is inferred.
4. Workspace and applicable Business/BU/Department/Branch/OS/actor/resource scopes are explicit.
5. Entities, lifecycle, invariants, permissions and current/target data mapping are complete.
6. API/module/event contracts, stable errors, versioning, idempotency and consumer list are defined.
7. UI journeys and loading/empty/error/unauthorized/recovery/degraded states are approved.
8. Arabic/English, RTL/LTR, accessibility, theme/responsive/performance criteria are measurable.
9. Threat/privacy/data classification, Audit/observability and abuse/failure behavior are defined.
10. Dependencies, compatibility mechanisms, removal conditions and feature-flag semantics are
    explicit.
11. Backup, migration, validation, rollback triggers/procedure/owner and deployment impact are
    approved for any durable change.
12. Required unit/architecture/contract/integration/API/UI/security/migration/ops tests—or an
    explicit N/A rationale—are planned.
13. `spec.md`, `plan.md`, `tasks.md` and Constitution Checks are approved before implementation.
14. Accountable Product/Architecture/Engineering/QA/Security/Data/Ops owners are available.

new Product/Governance authority before the ordinary Definition of Ready applies.

## 7. Definition of Done

A feature is Done only when:

1. Approved acceptance criteria and business rules work in the target owner boundary.
2. No prohibited dependency, foreign write, browser production authority or unapproved canonical
   term/state/role/limit is introduced.
3. Server-side tenant/resource authorization and negative tests pass for protected behavior.
4. Data migration/backfill counts/checksums/totals/quarantine and rollback evidence reconcile.
5. Versioned contracts, SDK/client, mock/HTTP parity and known consumer compatibility pass.
6. Unit, architecture, contract, integration, API, UI/E2E, security and applicable performance/
   recovery tests pass.
7. Arabic/English, RTL/LTR, accessibility, theme/responsive and critical states pass.
8. Consequential actions produce append-only Audit and correlated safe telemetry.
9. Deployment, health, alerts, backup/restore and rollback are verified for the changed production
   surface.
10. Temporary adapter/flag/alias has owner, introduction/removal conditions and no unintended
    consumer.
11. Specifications, plans, tasks, contracts, API docs, runbooks, release notes and decision/status
    indexes match implementation in the same change.
12. Required reviewers/owners approve and no Critical blocker or unaccepted High risk remains.
13. Release observation criteria pass; post-release issues and deviations are recorded.

Checked tasks alone, a passing UI demo or a successful deployment does not satisfy Done.

## 8. Quality Gates

| Gate | Required evidence | Applies before | Owner |
|---|---|---|---|
| Architecture approval | authority trace, owner, decision disposition, no boundary conflict | specification/implementation | Architect/Governance |
| Documentation source | approved artifacts, status/links/traceability | merge/release | Documentation owner |
| Data backup | inventory, backup ID and successful isolated restore | durable migration | Data/Operations |
| Schema validation | expand/backfill counts/checksums/constraints/quarantine | cutover/contraction | Data/domain owner |
| Tenant isolation | DB/API/job/cache/file/handoff two-Workspace matrix | protected traffic | Security/QA |
| Authorization | scoped allow/deny/resource/state matrix and Audit | protected writes | Identity/domain owner |
| Workflow | Product-approved states/guards/mapping and unknown fail-closed | workflow schema/API/UI | Product/workflow owner |
| API contract | OpenAPI/provider/consumer/version/error/idempotency | SDK/UI cutover | API/domain owner |
| Frontend regression | journeys/states/localization/a11y/theme/performance | cohort expansion | App/QA/Design |
| Security | threat/auth/IDOR/CSRF/file/secret/dependency evidence | release | Security |
| Test evidence | risk-required categories or approved N/A | sprint/milestone exit | QA/owners |
| Deployment | artifact/config/secrets/health/telemetry/canary | production promotion | Operations |
| Rollback readiness | triggers, prior compatible version, backup, procedure/rehearsal | cutover | Release/Data/Ops |

## 9. Feature-to-Test Strategy by Release

| Release | Unit/architecture | Integration/API | UI/E2E | Security | Migration/operations | Regression |
|---|---|---|---|---|---|---|
| Alpha | module/domain/version/determinism and dependency rules | contract/provider, identity/org/policy/Audit | Core context, DNA/Brain, Landing/UI quality | auth/CSRF/IDOR/two-tenant/redaction | mapping/backup/empty deploy rollback | current Core/Commerce browser baselines retained |
| Beta | commercial/Commerce owner/invariant/idempotency | catalog/inventory/customer/order/payment/tax/document/handoff | Product Hub/setup/catalog/POS critical journeys | tenant/role/handoff/payment/provider negatives | data backfill/reconciliation/canary rollback | mock/HTTP and current UI parity |
| RC | return/transfer/projection/file/outbox worker rules | full cross-owner failure/replay/file/notification contracts | reports/exports/files/notifications/degraded flows | file abuse/secrets/admin/privacy/full tenant matrix | load/deploy/backup/restore/DLQ/incident/rollback | complete Alpha+Beta suite |
| Production | compatibility/consumer/architecture conformance | supported versions and production smoke | critical journeys in production-safe mode | final scan/denial/monitoring review | contraction/restore/rollback and observation | full supported-platform release suite |

Every feature's exact test requirements are listed in `10-FEATURE-CATALOG.md` §5 and
`11-SPECIFICATION-CATALOG.md`.

## 10. Release Approval and Freeze Rules

- Alpha/Beta/RC/Production each require a written go/no-go record and named abort authority.
- A failed gate freezes only the affected boundary unless it invalidates shared tenant/security/
  data integrity, in which case dependent releases stop.
- Feature flags limit cohort only after the underlying model/security is valid.
- Emergency rollback preserves canonical/Audit/financial evidence and follows the runbook; it does
  not authorize ad hoc schema deletion or browser fallback.
- Release dates and sprint capacity are set only after Ready features have owners/estimates; none
  are invented in Stage 5.

## 11. Release Plan Verdict

The release plan exposes useful Alpha value—current frontend quality plus deterministic Business
Brain—before waiting for every Commerce/operations surface, while keeping tenant/security and
canonical Business identity as non-negotiable predecessors. Beta proves commercial and Commerce
value, RC proves recovery/operations, and Production removes compatibility only after consumer and
rollback evidence closes.
