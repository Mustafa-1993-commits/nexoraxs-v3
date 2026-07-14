# Business Brain Data Ownership

Version: 1.0  
Status: Wave 1 — Approved Proposal Expansion  
Milestone: Business Brain  
Architecture baseline: Core Platform v1.0  
Documentation baseline: Core Platform v1.0.1  
Proposal baseline: Business Brain Proposal v0.1 + Freeze Alignment Patch v0.1.1  
Owner: Nexoraxs

---

## 1. Purpose

This document defines canonical data ownership for Business Brain Wave 1.

It identifies the sole Business Brain write model, source-of-truth boundaries, Decision-owned content, external references, read models, projection rules, history, version ownership, consistency rules, AI separation, and ownership invariants.

The goal is to ensure that Business Brain can reason over platform information without duplicating source truth or acquiring responsibilities owned by Core Platform, Recommendation Engine, Configuration Engine, Product Hub, Marketplace, AI Coordinator, or an Operating System.

## 2. Scope

This document covers:

- canonical Business Brain ownership;
- Business Brain Decision aggregate and write model;
- ownership of analysis, Capability, health, growth, risk, explanation, and candidate content;
- source references and version pinning;
- read models and projections;
- cross-domain read and write rules;
- immutable Decision history and reanalysis;
- downstream candidate handoff boundaries;
- AI artifact separation;
- consistency and Audit requirements; and
- deferred data decisions.

It does not define database schemas, storage engines, transactions, indexes, retention durations, APIs, Events, or implementation technology.

## 3. Data Ownership Principles

1. **One canonical owner.** Every state has one source of truth.
2. **One Business Brain write model.** Business Brain Decision is the sole new canonical Business Brain write model in Wave 1.
3. **Source references, not copies.** External facts remain referenced to their canonical owners.
4. **Derived reasoning is separate.** A Decision records what Business Brain concluded, not a replacement for its inputs.
5. **Business scope is explicit.** One Business is default; Workspace aggregation lists constituent Businesses and versions.
6. **Completed history is immutable.** A completed Decision is never updated in place.
7. **Reanalysis is additive.** New reasoning creates a new Decision.
8. **Projection is never ownership.** Read models cannot accept canonical writes or prove current Permission.
9. **Candidate is not downstream truth.** Recommendation candidate and configuration input do not become Recommendation or Configuration Proposal inside Business Brain.
10. **AI artifact is never Decision content.** AI Coordinator acts after completion and owns all AI output.
11. **Shared runtime grants no data authority.** Modular-monolith co-location does not allow foreign-table writes.
12. **Version ownership follows artifact ownership.** Each source owner versions its own artifact; Business Brain pins the versions used.

## 4. Canonical Ownership Summary

### 4.1 Business Brain owns

- Business Brain Decision identity and completed history;
- Decision scope and analysis purpose;
- exact Decision input manifest;
- derived Business analysis content;
- candidate Capability reasoning;
- health, growth, and risk reasoning;
- Business Brain Decision explanation;
- Decision confidence, assumptions, alternatives, conflicts, and uncertainty;
- Decision-owned recommendation candidate content;
- Decision-owned configuration input content;
- supersession relationship between Decisions; and
- governance references required to correlate Decision completion.

### 4.2 Business Brain does not own

- Workspace, Business, Business Unit, Department, or Branch identity;
- Business DNA or Workspace Intelligence Aggregation source data;
- Knowledge, Knowledge Packs, Capabilities, or Rules;
- settings, localization, goals, stage, subscription, Plan, or analytics source data;
- Recommendation or customer disposition;
- Implementation Option;
- Configuration Proposal or target configuration;
- Product Hub projection or navigation;
- Marketplace Assets or scoped state;
- AI Interaction, AI output, or AI Action Proposal;
- OS operational records or execution;
- Audit Record, Notification, search index, or observability telemetry; or
- Permission and Authorization source state.

## 5. Canonical Source-of-Truth Map

| Information or state | Canonical owner | Source of truth | Business Brain use |
|---|---|---|---|
| Workspace | Workspace Management | Workspace write model | Mandatory tenant reference |
| Business | Business Registry | Business write model | Default analysis subject |
| Business Unit, Department, Branch | Organization Registry | Organization write model | Optional verified context |
| Business DNA Identity, Snapshot, Fact, Provenance | Business DNA Registry | Business-scoped DNA write model and history | Exact published input reference |
| Workspace Intelligence Aggregation | Core intelligence projection over Business DNA | Underlying Business DNA remains authoritative | Explicit multi-Business input |
| Capability | Capability Registry | Capability write model and history | Candidate need reference |
| Knowledge Object and published version | Knowledge Engine | Versioned Knowledge write model | Applicable evidence and reasoning input |
| Knowledge Pack Version | Knowledge Engine | Immutable published Knowledge Pack version | Applicable additive input |
| Rule and Rule outcome | Rules domain | Rule write model and deterministic outcome evidence | Exact outcome reference |
| Settings and Localization | Applicable Core owner | Settings write model | Approved context |
| Goal, country, stage | Business DNA or approved source owner | Applicable canonical write model | Approved context reference |
| Analytics projection | Analytics Intake/source owner | Source operational facts remain authoritative | Purpose-bound input with freshness |
| Workspace Entitlement, OS Subscription, Plan | Core commercial control | Commercial write model | Approved context, never business need ownership |
| Business Brain Decision | Business Brain | Completed immutable Decision write model | Canonical Business Brain reasoning |
| Recommendation candidate content | Business Brain Decision boundary | Decision-owned content until downstream handling | Recommendation Engine input |
| Recommendation and disposition | Recommendation Engine | Recommendation write model | Downstream artifact and feedback source |
| Implementation Option | Core intelligence mapping | Mapping record | Downstream reference only |
| Configuration input content | Business Brain Decision boundary | Decision-owned input content | Configuration Engine context |
| Configuration Proposal | Configuration Engine | Configuration Proposal write model | Downstream status reference only |
| Product Hub projection | Product Hub | Derived from canonical owners | Authorized presentation only |
| Marketplace Asset and scoped state | Marketplace | Marketplace write models | Approved reference only |
| AI Interaction, explanation, narrative, suggestion, advisory output, Action Proposal | AI Coordinator | AI coordination write model | Downstream artifact citing completed Decision |
| OS operational record | Owning OS | OS domain write model | Approved projection only |
| Audit Record | Audit Service | Append-only Audit history | Correlated external governance record |
| Search/analytics/observability projection | Applicable Core coordinator | Source owners remain authoritative | Authorized derived view |

## 6. Canonical Write Model

### 6.1 Business Brain Decision write model

Business Brain Decision is the only canonical Business Brain write model approved for Wave 1.

**Canonical owner:** Business Brain  
**Aggregate root:** Business Brain Decision  
**Completion owner:** Decision Orchestrator  
**Mutation after completion:** Prohibited

### 6.2 Write-model responsibility

The write model validates:

- authenticated and authorized operation context;
- one Workspace;
- one Business or explicit aggregation scope;
- canonical ancestry of referenced organizational context;
- exact source identifiers and required versions;
- approved analysis purpose;
- required analysis contributions;
- source-versus-derived distinction;
- candidate Capability references;
- evidence and explanation completeness;
- conflicts and uncertainty exposure;
- no product-first reasoning;
- no downstream execution authority;
- no AI material;
- idempotent completion where the future operation contract requires it; and
- append-preserving history and supersession.

### 6.3 Write path

```text
Authorized analysis request
  → owner-provided source references
  → Business Brain logical analysis contributions
  → Decision Orchestrator validation
  → completed Business Brain Decision
  → downstream candidates and projections
```

The write path does not include AI Coordinator. AI may consume the completed Decision afterward.

### 6.4 Prohibited writes

Business Brain write logic cannot:

- update a source owner;
- write another Core module's tables;
- write an OS database;
- update a completed Decision;
- convert a candidate into a Recommendation;
- create or apply a Configuration Proposal;
- update Product Hub or Marketplace canonical state;
- store an AI artifact in Decision content; or
- write an Audit Record directly as if Business Brain owned Audit history.

## 7. Decision-Owned Content

The following content is owned within the Business Brain Decision aggregate. It does not create independent aggregate ownership.

| Decision-owned content | Logical contributor | Ownership rule |
|---|---|---|
| Input manifest | Decision Orchestrator | References exact external owners and versions. |
| Business analysis | Business Analyzer | Derived reasoning only. |
| Capability selection reasoning | Capability Selector | References canonical Capabilities. |
| Health insight | Health Analyzer | Decision section; not independent aggregate. |
| Growth insight | Growth Advisor | Decision section; not independent aggregate. |
| Risk insight | Risk Analyzer | Decision section; not independent aggregate. |
| Decision explanation | Decision Orchestrator | Non-AI explanation of Business Brain reasoning. |
| Evidence, confidence, assumptions, alternatives, conflicts, uncertainty | Applicable contributor; composed by Decision Orchestrator | Retains source distinction and cannot become external truth. |
| Recommendation candidate content | Recommendation Candidate Builder | Candidate only; downstream Recommendation ownership unchanged. |
| Configuration input content | Configuration Input Builder | Input only; Configuration Proposal ownership unchanged. |
| Supersession reference | Decision Orchestrator | Prior Decision remains immutable. |
| Governance context | Decision Orchestrator | Correlation reference; does not own Authorization or Audit state. |

## 8. Candidate Output Ownership

### 8.1 Recommendation candidate

Business Brain owns candidate content derived from a completed Decision until the future downstream contract processes it.

The candidate:

- identifies a business improvement and Capability need;
- references its source Decision;
- may carry evidence, risks, alternatives, confidence, and assumptions;
- has no Recommendation lifecycle or disposition;
- cannot appear as an accepted Recommendation through a read model; and
- cannot map an OS, Plan, or Marketplace Asset as if it owned Implementation Options.

Candidate identity, deduplication, acknowledgement, retry, and physical persistence remain deferred. No independent candidate aggregate is approved.

### 8.2 Configuration input

Business Brain owns Decision-linked input content only.

The input:

- may reference Decision, Capability, Knowledge, Rule, and applicable Recommendation context;
- has no Configuration Proposal identity or lifecycle;
- has no review or automatic-apply policy;
- has no compatibility authority;
- cannot mutate target state; and
- cannot authorize Configuration Engine activity without its required accepted Recommendation and owner policy.

Structure, timing, persistence, delivery, and acknowledgement remain deferred. No independent configuration-input aggregate is approved.

## 9. External Reference Rules

Every external reference must, where applicable, preserve:

- canonical owner;
- stable identifier;
- version used;
- Workspace scope;
- Business and organization scope;
- source purpose and applicability;
- source freshness or occurred time where meaningful;
- correlation and causation; and
- Security classification or handling requirements.

An external reference never:

- transfers write authority;
- copies a shared asset into Business Brain truth;
- proves current Permission indefinitely;
- permits direct database access; or
- allows Business Brain to reinterpret a source lifecycle.

## 10. Read Models

### 10.1 Business Brain-owned read models

| Read model | Purpose | Canonical source | Write authority |
|---|---|---|---|
| Business Brain Decision View | Show one authorized completed Decision. | Decision write model | None |
| Current Decision View | Resolve current Decision under future selection policy. | Decision history | None |
| Decision History View | Present append-preserved Decisions and supersession links. | Decision history | None |
| Candidate Output View | Present Decision-owned candidate content and downstream acknowledgement where approved. | Decision and future delivery references | None |

### 10.2 Externally owned read models

| Read model | Owner | Business Brain relationship |
|---|---|---|
| Workspace Intelligence Aggregation | Core intelligence projection | Consume source or contribute Decision summaries under future policy. |
| Business Health and Growth View | Product Hub | Supply permitted Decision insights. |
| Recommendation Feed | Product Hub using Recommendation Engine | Supply no unprocessed candidate as canonical Recommendation. |
| Search projection | Search Coordination | Supply minimum authorized Decision projection. |
| Analytics view | Analytics Intake/approved analytics owner | Supply permitted Decision outcomes; never source truth. |
| Audit view | Audit Service | Correlate Decision activity. |
| AI view | AI Coordinator | Present AI artifacts linked to completed Decision. |

### 10.3 Read-model rules

Read models:

- remain permission-filtered;
- retain source identity and version where relevant;
- may be rebuilt or discarded according to owner rules;
- never accept Decision writes;
- never become current Authorization evidence by themselves;
- never merge Business DNA;
- never make AI output part of Decision; and
- never collapse Recommendation candidate into Recommendation.

## 11. Workspace Aggregation Ownership

Workspace analysis is a projection relationship, not new Business ownership.

Rules:

1. aggregation is explicit and authorized;
2. every included Business remains identifiable;
3. every included Business DNA Snapshot version remains identifiable;
4. aggregation never creates Workspace Business DNA;
5. an aggregation Decision still belongs to one Workspace;
6. cross-Workspace aggregation is prohibited;
7. Business-level source facts remain with their owners; and
8. exact aggregation persistence and projection ownership detail remain deferred.

## 12. Decision History and Version Ownership

### 12.1 Business Brain versions

Business Brain owns Decision identity, Decision version or historical identity, and supersession relationship.

Exact version syntax is deferred.

### 12.2 Source versions

Each canonical owner versions its own artifact:

- Business DNA Registry versions Business DNA Snapshots;
- Knowledge Engine versions Knowledge and Knowledge Packs;
- Rules domain versions Rules and preserves outcome evidence;
- Capability Registry versions Capability definitions where required;
- contract owners version contracts; and
- AI Coordinator versions or references AI artifacts independently downstream.

Business Brain pins but does not assign these source versions.

### 12.3 Reanalysis

Reanalysis:

- resolves new authorized source versions;
- creates a new Decision;
- may supersede prior Decision reasoning;
- never updates the prior Decision; and
- never copies downstream disposition into historical Decision content.

Automatic triggers, concurrency, branching, freshness, and current selection remain deferred.

## 13. Data Lifecycle

### 13.1 Before completion

Analysis contributions may exist logically while Decision formation is in progress. Their physical storage, retention, retry, and recovery are not approved. They are not completed Decisions or new canonical aggregates.

### 13.2 Completion

Decision Orchestrator validates and completes one canonical Decision. Completion establishes immutable Decision content and source references.

### 13.3 Downstream use

After completion:

- candidate builders may form Decision-owned outputs;
- Recommendation Engine may process a candidate;
- Configuration Engine may use approved input under accepted Recommendation context;
- Product Hub may display an authorized projection;
- AI Coordinator may create separate AI-owned artifacts; and
- Operating Systems may consume approved guidance without ownership transfer.

### 13.4 Supersession

New reasoning may supersede prior reasoning through a new Decision reference. Supersession does not delete, edit, or invalidate source history automatically.

### 13.5 Retention and deletion

Retention, deletion, anonymization, legal hold, residency, export, and historical-access policy remain deferred. Immutability does not override future approved privacy or legal policy; any reconciliation requires Governance and must preserve Audit and historical meaning appropriately.

## 14. AI Data Boundary

The completed Business Brain Decision contains no AI-generated or AI-assisted material.

Data direction is one-way:

```text
Completed Business Brain Decision
  → minimum authorized projection
  → AI Coordinator
  → separate AI-owned artifact
```

AI artifacts:

- may reference the Decision;
- retain their own provider, Expert, evidence, validation, confidence, assumption, cost, policy, and outcome information under future policy;
- cannot be written back into Decision content;
- cannot amend Decision history; and
- cannot acquire Business Brain, Recommendation, Configuration, Product Hub, Marketplace, or OS ownership.

## 15. Cross-Domain Consistency

### 15.1 Consistency principle

Business Brain requires reproducible Decision content, not one distributed transaction across source owners.

A completed Decision pins the exact input versions used. Later source changes produce new context for reanalysis; they do not rewrite the Decision.

### 15.2 Owner validation

- source owners validate source state and access;
- Business Brain validates Decision invariants;
- Recommendation Engine validates Recommendation creation;
- Configuration Engine validates Configuration Proposal creation;
- target owners validate application;
- Product Hub validates presentation scope;
- AI Coordinator validates AI context and outputs; and
- Audit Service owns append-only Audit Records.

### 15.3 Failure boundaries

- source-read failure prevents completion when required input is unavailable;
- candidate-delivery failure does not invalidate a completed Decision;
- Recommendation rejection does not mutate the Decision;
- Configuration failure does not mutate the Decision;
- Product Hub projection lag does not mutate the Decision;
- AI failure does not prevent or mutate Decision completion; and
- OS unavailability does not transfer OS state ownership to Business Brain.

Exact retry, reconciliation, timeout, and recovery mechanisms remain deferred.

## 16. Audit and Observability Ownership

Business Brain supplies safe context for Audit and observability, including as applicable:

- actor or service;
- Workspace and Business/aggregation scope;
- Decision identifier and version;
- source-version categories;
- purpose;
- completion, failure, or administration outcome;
- candidate handoff outcome;
- correlation and causation; and
- safe confidence, conflict, or uncertainty categories.

Audit Service owns Audit Records. Observability systems own telemetry, not Business facts. Raw Business DNA, Knowledge, operational payloads, secrets, and AI content are not logged by default.

## 17. Ownership Invariants

1. Business Brain Decision is the only canonical Business Brain write model in Wave 1.
2. Every completed Decision has one owner: Business Brain.
3. Every source fact retains its original owner.
4. A source reference never becomes a copied source of truth.
5. Workspace aggregation never becomes Business DNA.
6. Insight content remains inside Decision aggregate in this milestone.
7. No independent recommendation-candidate aggregate is approved.
8. No independent configuration-input aggregate is approved.
9. No evaluation-operation aggregate is approved.
10. No learning aggregate is approved.
11. Recommendation Engine alone owns Recommendation lifecycle.
12. Configuration Engine alone owns Configuration Proposal lifecycle.
13. Product Hub owns its projections and journey, not Decision writes.
14. Marketplace owns Assets and scoped Marketplace state.
15. AI Coordinator owns every AI artifact and acts only after Decision completion.
16. Each OS owns its operational data and execution.
17. Audit Service owns Audit Records.
18. A completed Decision is immutable.
19. Reanalysis creates new history.
20. Read models and projections never accept canonical writes.

## 18. Remaining Deferred Decisions

This document does not resolve:

- physical schema, aggregate representation, or transaction boundary;
- evaluation-operation state and persistence;
- exact Decision identity and version syntax;
- required input and contribution fields;
- candidate identity, cardinality, deduplication, acknowledgement, and delivery persistence;
- configuration input structure, timing, and delivery persistence;
- learning persistence and policy;
- current-Decision selection and freshness;
- supersession concurrency and branching;
- aggregation persistence detail;
- analytics freshness and retention;
- data classification, retention, deletion, anonymization, residency, export, and legal hold;
- API and Event contract detail;
- idempotency, retry, reconciliation, and recovery implementation; and
- database, cache, queue, search, object storage, or other technology.

## 19. References

- `docs/03-BUSINESS-BRAIN-PROPOSAL.md`
- `docs/03-business-brain/03-BUSINESS-BRAIN-PROPOSAL-PATCH-v0.1.1.md`
- `docs/03-BUSINESS-BRAIN-ARCHITECTURE-REREVIEW.md`
- `docs/03-business-brain/02-BUSINESS-BRAIN-ARCHITECTURE.md`
- `docs/03-business-brain/03-BUSINESS-BRAIN-DOMAIN-MODEL.md`
- `docs/02-core-platform/04-DATA-OWNERSHIP.md`
- `docs/02-core-platform/05-PERMISSION-MODEL.md`
- `docs/02-core-platform/06-EVENT-ARCHITECTURE.md`
- `docs/00-governance/ADR/ADR-012-business-brain-decision-engine.md`
- `docs/00-governance/ADR/ADR-017-configuration-proposals-respect-domain-ownership.md`
- `docs/00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md`
