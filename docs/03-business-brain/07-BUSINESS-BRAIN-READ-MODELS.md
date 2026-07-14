# Business Brain Read Models

Version: 1.0  
Status: Wave 2 — Approved Baseline Expansion  
Milestone: Business Brain  
Architecture baseline: Core Platform v1.0  
Business Brain baseline: Approved Proposal v0.1.1 and Wave 1  
Owner: Nexoraxs

---

## 1. Purpose

This document defines the logical read-model and projection architecture used to present Business Brain Decisions and related information without transferring ownership or creating a second write path.

It identifies eleven approved read models or external projections, their owners, sources, consumers, projection rules, authorization behavior, freshness constraints, and prohibited uses.

It does not define queries, APIs, schemas, databases, indexes, search engines, caches, transport, Event infrastructure, UI layouts, or technology.

## 2. Scope

This document covers:

- Business Brain-owned read models;
- external projections that Business Brain consumes or supplies;
- projection ownership;
- source-to-projection relationships;
- Permission, tenant, and aggregation rules;
- current and historical Decision views;
- candidate, Product Hub, search, analytics, Audit, and AI views;
- Event and contract relationships at logical level; and
- deferred read-model decisions.

## 3. Read Model Principles

1. Read models never own canonical Decision state.
2. A read model has one accountable projection owner.
3. A projection may combine sources only for an approved purpose and scope.
4. Every projection remains Workspace-safe and permission-filtered.
5. Business scope is preserved; Workspace aggregation is explicit.
6. Source identifier, owner, and version remain traceable where applicable.
7. Projection freshness is visible and never implied silently.
8. A read model cannot accept canonical writes.
9. A read model cannot prove current Permission by itself.
10. Recommendation candidate cannot appear as Recommendation through projection.
11. AI artifact cannot appear as Business Brain Decision content.
12. Read models may be rebuilt or discarded according to source and owner rules.

## 4. Read Model Classification

| Classification | Owner group | Count |
|---|---|---:|
| Business Brain-owned Decision read models | Business Brain read side | 4 |
| Core intelligence input projection | Core intelligence projection | 1 |
| Product Hub-owned projections | Product Hub | 2 |
| Shared Search projection | Search Coordination | 1 |
| Analytics projection | Analytics Intake/approved analytics owner | 1 |
| Audit projection | Audit Service | 1 |
| Downstream AI projection | AI Coordinator | 1 |
| **Total** |  | **11** |

## 5. Business Brain-Owned Read Models

### RM-01 — Business Brain Decision View

**Owner:** Business Brain read side  
**Canonical source:** Completed Business Brain Decision write model  
**Purpose:** Present one authorized completed Decision.

Logical content may include:

- Decision identity and version;
- Workspace and Business/aggregation scope;
- purpose;
- input-manifest references;
- Business analysis and Capability reasoning;
- health, growth, and risk insights;
- Business Brain explanation;
- evidence, confidence, assumptions, alternatives, conflicts, and uncertainty;
- candidate output references;
- supersession reference; and
- safe governance and Audit correlation.

Rules:

- current Permission is evaluated before disclosure;
- source content is minimized;
- no AI artifact is embedded;
- view cannot update Decision; and
- exact layout and field selection remain deferred.

### RM-02 — Current Decision View

**Owner:** Business Brain read side  
**Canonical source:** Completed Decision history and future approved current-selection policy  
**Purpose:** Present the Decision considered current for one authorized purpose and scope.

Rules:

- “current” is a projection decision, not mutation of history;
- creation or publication time alone does not establish currentness unless future policy says so;
- superseded history remains accessible under Permission;
- stale or unresolved currentness is explicit; and
- current-selection, branching, concurrency, and freshness policy remain deferred.

### RM-03 — Decision History View

**Owner:** Business Brain read side  
**Canonical source:** Immutable completed Decisions and supersession references  
**Purpose:** Present authorized Decision history without rewriting it.

Rules:

- each Decision retains its original input manifest and explanation;
- history preserves supersession rather than deletion;
- source changes do not alter historical meaning;
- exact comparison and pagination behavior remain deferred; and
- retention and legal policy may govern visibility without changing source ownership.

### RM-04 — Candidate Output View

**Owner:** Business Brain read side  
**Canonical source:** Decision-owned recommendation candidate and configuration input content, plus future approved acknowledgement references  
**Purpose:** Present candidate content and known downstream handoff state without impersonating downstream canonical artifacts.

Rules:

- candidate remains distinguishable from Recommendation;
- configuration input remains distinguishable from Configuration Proposal;
- acknowledgement does not transfer downstream ownership back to Business Brain;
- candidate identity and acknowledgement remain deferred; and
- view has no resend or mutation authority by itself.

## 6. Core Intelligence Input Projection

### RM-05 — Workspace Intelligence Aggregation

**Owner:** Core intelligence projection over Business-owned Business DNA  
**Canonical sources:** Individual Business DNA identities and published Snapshots  
**Business Brain relationship:** Authorized input for explicit Workspace-level analysis.

Rules:

- aggregation is explicitly requested and authorized;
- every included Business and Snapshot version is identifiable;
- no Workspace-owned Business DNA is created;
- cross-Workspace aggregation is prohibited;
- Business Brain consumes but does not own this projection; and
- projection freshness and construction detail remain with future Core policy.

This is an input projection, not a projection of Business Brain Decisions.

### Deferred Workspace Decision Aggregation View

Wave 1 identified a possible Workspace Decision Aggregation View but deferred exact ownership. Wave 2 does not approve or count it as a separate read model. If later required, ownership, purpose, source selection, Permission, freshness, and relation to Workspace Intelligence Aggregation require explicit approval.

## 7. Product Hub-Owned Projections

### RM-06 — Business Health and Growth View

**Owner:** Product Hub  
**Sources:** Permitted Business Brain Decision insights and other approved intelligence projections  
**Purpose:** Present health, maturity, coverage, risk, and growth information in the Product Hub journey.

Rules:

- Product Hub owns presentation, not Decision source;
- view does not define health, growth, or risk semantics;
- stale Decision or projection state is visible;
- customer action routes to the applicable owner; and
- Product Hub cannot write Business Brain Decision.

### RM-07 — Recommendation Feed

**Owner:** Product Hub using Recommendation Engine output  
**Canonical source:** Recommendation Engine Recommendation write model  
**Business Brain relationship:** Recommendation candidates may contribute to Recommendation creation before feed projection.

Rules:

- unprocessed Business Brain candidate cannot appear as canonical Recommendation;
- Recommendation lifecycle and disposition come only from Recommendation Engine;
- Implementation Options remain mapped downstream under their owner;
- feed presentation does not own Recommendation; and
- rejected or unavailable candidate state cannot be silently shown as accepted advice.

## 8. Shared Core Projections

### RM-08 — Search Projection

**Owner:** Search Coordination  
**Sources:** Minimum authorized Business Brain Decision projections and approved external sources  
**Purpose:** Support governed discovery of permitted Decision information.

Rules:

- search index is disposable;
- search never proves current Permission or Decision currentness;
- results retain source identifier/version and freshness where applicable;
- sensitive reasoning is minimized; and
- search ranking, indexing, localization, and rebuild technology remain deferred.

### RM-09 — Analytics View

**Owner:** Analytics Intake or approved analytics owner  
**Sources:** Permitted Decision outcomes, usage, and owner-provided projections  
**Purpose:** Support approved analysis, adoption, quality, and future Business Brain context.

Rules:

- analytics does not own Business facts or Decisions;
- data use is purpose-bound and permission-aware;
- freshness, completeness, consent, retention, and anonymization remain visible and deferred;
- analytics cannot change Decision; and
- Learning Interpreter consumes only approved outputs.

### RM-10 — Audit View

**Owner:** Audit Service  
**Canonical source:** Append-only Audit Records  
**Purpose:** Present authorized governance history for Decision completion, supersession, administration, candidate handoff, replay, and Security activity.

Rules:

- Business Brain supplies correlation context but does not own Audit Records;
- Audit history is append-only;
- Audit View does not expose unauthorized Decision content; and
- Audit Record correction or retention follows Audit governance, not Business Brain projection logic.

## 9. Downstream AI Projection

### RM-11 — AI View

**Owner:** AI Coordinator  
**Sources:** AI Interactions and AI-owned artifacts linked to a completed Business Brain Decision  
**Purpose:** Present AI explanations, narratives, suggestions, advisory outputs, or AI Action Proposals separately from canonical Decision content.

Rules:

- AI View exists only downstream of completed Decision;
- Decision context supplied to AI Coordinator is minimum and permission-filtered;
- AI artifact retains its own provider, Expert, evidence, validation, confidence, assumptions, policy, cost, and outcome context under future policy;
- AI View cannot amend or reinterpret the canonical Decision;
- AI failure cannot change Decision View; and
- AI Action Proposal has no execution authority.

## 10. Projection Ownership Matrix

| Read model | Sole owner | Canonical source owner | Business Brain write authority |
|---|---|---|---|
| Business Brain Decision View | Business Brain read side | Business Brain | None through read model |
| Current Decision View | Business Brain read side | Business Brain | None through read model |
| Decision History View | Business Brain read side | Business Brain | None through read model |
| Candidate Output View | Business Brain read side | Business Brain Decision boundary | None through read model |
| Workspace Intelligence Aggregation | Core intelligence projection | Business DNA Registry per Business | None |
| Business Health and Growth View | Product Hub | Business Brain and other approved sources | None |
| Recommendation Feed | Product Hub | Recommendation Engine | None |
| Search Projection | Search Coordination | Applicable source owners | None |
| Analytics View | Analytics Intake/approved analytics owner | Applicable source owners | None |
| Audit View | Audit Service | Audit Service | None |
| AI View | AI Coordinator | AI Coordinator; completed Decision referenced | None |

No read model has joint ownership.

## 11. Projection Flow

```text
Completed Business Brain Decision
  ├──→ Business Brain Decision View
  ├──→ Current Decision View
  ├──→ Decision History View
  ├──→ Candidate Output View
  ├──→ Product Hub Business Health and Growth View
  ├──→ Search Projection
  ├──→ Analytics View
  ├──→ Audit correlation
  └──→ minimum completed Decision context
        → AI Coordinator
        → separate AI View

Recommendation candidate
  → Recommendation Engine
  → Recommendation
  → Product Hub Recommendation Feed
```

Projection direction never points back into the Business Brain Decision write model.

## 12. Projection Rules

Every projection:

1. identifies its sole owner;
2. identifies canonical source owners;
3. preserves Workspace scope;
4. preserves Business or explicit aggregation scope;
5. retains source identifier and version where applicable;
6. records projection freshness or generation context where future policy requires;
7. applies current Permission before returning data;
8. minimizes source content;
9. rejects cross-Workspace mixing;
10. remains distinguishable from source truth;
11. tolerates rebuild and duplicate source facts;
12. does not write back to source;
13. does not collapse separate lifecycle concepts;
14. does not include AI output in Decision projection; and
15. does not transform candidate output into downstream canonical state.

## 13. Projection Update Sources

Logical projection updates may follow:

- direct authorized query of the canonical owner;
- approved internal Decision completion fact;
- approved Domain Event consumption;
- source-version reconciliation; or
- explicit rebuild.

The chosen mechanism is not defined by Wave 2.

Relevant Business Brain Domain Events are:

- Business Brain Decision Completed;
- Business Brain Decision Superseded; and
- Recommendation Candidate Available.

Event observation does not transfer projection or source ownership.

## 14. Freshness and Currentness

- every projection may be stale relative to its source;
- freshness is visible when material;
- Current Decision View uses future approved selection policy, not timestamp assumption;
- Product Hub and Search cannot infer current Permission from cached state;
- source owner is queried when current canonical state is required;
- candidate acknowledgement and downstream state may lag;
- AI View freshness is independent from Decision freshness; and
- exact freshness targets, lag thresholds, invalidation, refresh, and cache policy remain deferred.

## 15. Authorization and Tenant Isolation

Read access requires:

- authenticated user or service identity;
- current Workspace Membership or approved service context;
- verified Workspace;
- Business and organization scope when applicable;
- explicit aggregation Permission for Workspace views;
- requested resource and action Permission;
- applicable entitlement and lifecycle checks; and
- owner-controlled field filtering.

Rules:

- client-provided scope is verified;
- projection possession grants no authority;
- one Workspace's data cannot appear in another Workspace's view;
- one Business's Decision is not exposed through another Business without authorized aggregation;
- Authorization failure avoids unauthorized existence disclosure; and
- AI View follows AI Coordinator and Decision-source authorization independently.

## 16. Rebuild and Replay

Business Brain-owned projections may be rebuilt from completed Decisions and Domain Events where future retention permits.

Rebuild:

- does not mutate Decision history;
- preserves source versions and supersession;
- applies idempotency and ordering checks;
- does not recreate Recommendations, Configuration Proposals, AI outputs, Notifications, or OS actions blindly;
- is scoped and authorized; and
- is auditable.

Exact replay source, retention, transformation, tooling, and rebuild objectives remain deferred.

## 17. Prohibited Read Model Behavior

A read model cannot:

- accept canonical Business Brain writes;
- correct Business DNA or another source;
- prove Permission without current owner evaluation;
- merge Workspaces;
- create Workspace-owned Business DNA;
- hide the Business source of aggregation;
- mutate or delete Decision history;
- turn recommendation candidate into Recommendation;
- turn configuration input into Configuration Proposal;
- embed AI artifact in Decision View;
- grant AI Action Proposal execution authority;
- own an OS operational fact; or
- become a shared database between domains.

## 18. Read Model Count

| Read model | Owner |
|---|---|
| Business Brain Decision View | Business Brain read side |
| Current Decision View | Business Brain read side |
| Decision History View | Business Brain read side |
| Candidate Output View | Business Brain read side |
| Workspace Intelligence Aggregation | Core intelligence projection |
| Business Health and Growth View | Product Hub |
| Recommendation Feed | Product Hub |
| Search Projection | Search Coordination |
| Analytics View | Analytics Intake/approved analytics owner |
| Audit View | Audit Service |
| AI View | AI Coordinator |
| **Total** | **11** |

## 19. Remaining Deferred Decisions

- Current Decision selection and freshness policy;
- Workspace Decision Aggregation View necessity and ownership;
- read-model fields and schemas;
- query, filtering, sorting, pagination, and localization;
- candidate acknowledgement projection;
- projection update mechanism;
- cache and invalidation policy;
- projection lag and freshness objectives;
- search indexing, ranking, and rebuild;
- analytics consent, completeness, retention, and anonymization;
- Audit presentation and retention;
- AI View retention, provider detail, and field minimization;
- replay, rebuild, transformation, and recovery;
- Permission catalog and field filtering; and
- database, cache, search, analytics, and observability technology.

## 20. References

- `docs/03-BUSINESS-BRAIN-PROPOSAL.md`
- `docs/03-business-brain/03-BUSINESS-BRAIN-PROPOSAL-PATCH-v0.1.1.md`
- `docs/03-BUSINESS-BRAIN-ARCHITECTURE-REREVIEW.md`
- `docs/03-business-brain/03-BUSINESS-BRAIN-DOMAIN-MODEL.md`
- `docs/03-business-brain/04-BUSINESS-BRAIN-DATA-OWNERSHIP.md`
- `docs/03-business-brain/05-BUSINESS-BRAIN-CONTRACTS.md`
- `docs/03-business-brain/06-BUSINESS-BRAIN-EVENTS.md`
- `docs/02-core-platform/04-DATA-OWNERSHIP.md`
- `docs/02-core-platform/05-PERMISSION-MODEL.md`
- `docs/02-core-platform/09-OBSERVABILITY.md`
