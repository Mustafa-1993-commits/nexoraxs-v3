# Commerce OS Documentation Wave 2

**Status:** Documentation Wave 2  
**Architecture basis:** Commerce OS Proposal Baseline v0.1.1  
**Predecessor:** Commerce OS Documentation Wave 1  
**Classification:** Approved-architecture expansion; logical interactions only

## 1. Purpose

This document expands the approved Commerce OS Proposal Baseline v0.1.1 and Wave 1 into a
single logical-interaction model. It documents how approved owners collaborate through logical
Contracts, completed-fact Events, Read Models, shared Core Platform services, and optional
external boundaries.

This Wave does not change a Domain, Capability, owner, canonical write model, aggregate
candidate, lifecycle, or deferred decision. It defines no physical implementation.

## 2. Authority and Interpretation

### 2.1 Authoritative baseline

The Commerce OS Proposal Baseline is the combined interpretation of:

1. `02-COMMERCE-OS-PROPOSAL.md`; and
2. `04-COMMERCE-OS-PROPOSAL-PATCH-v0.1.1.md`.

Where the Patch clarifies the Proposal, the Patch controls. The approved Re-Review confirms
that the merged baseline is suitable for documentation, and Wave 1 controls the detailed
Domain, ownership, canonical write-model, aggregate-candidate, and invariant vocabulary used
here.

### 2.2 Governing authorities

This document remains subordinate to:

- Architecture Freeze documents;
- accepted Governance ADRs;
- Genesis v1.1;
- the approved Core Platform baseline;
- the approved Business Brain baseline; and
- the approved Commerce OS Discovery, Capability Map, Proposal Baseline v0.1.1, Re-Review,
  and Wave 1.

### 2.3 Interpretation rules

- **Owner** means the single authority over a canonical fact, state transition, Contract
  meaning, Event meaning, or projection lifecycle as explicitly stated.
- **Provider**, **consumer**, and **governance owner** are distinct roles where necessary.
- A Contract, Event, reference, Read Model, report, or integration never transfers ownership.
- Business and Business Unit remain distinct. Every protected interaction preserves Actor,
  Workspace, applicable Business, operational Business Unit, applicable Department,
  applicable Branch, Commerce OS, Module where applicable, Resource, Permission, and
  Entitlement and lifecycle context where applicable.
- Capitalized canonical concepts retain the meaning assigned by the frozen baselines.

## 3. Scope

### 3.1 Included

This Wave documents:

- logical Contract families and their governance;
- logical Domain Event and Integration Event responsibilities;
- Commerce Read Models and projection ownership;
- Reporting, Search, Audit, Notification, and Analytics participation;
- authorization and security flow across logical boundaries;
- cross-Domain, cross-OS, Marketplace, AI, extension, Configuration Proposal, and
  Recommendation interactions; and
- failure isolation, observability, and reliability principles.

### 3.2 Excluded

This Wave does not define APIs, endpoints, persistence structures, Event payloads, messaging,
transport, runtime topology, infrastructure, frameworks, vendors, deployment, or implementation
sequence. It does not resolve DD-01 through DD-40.

## 4. Logical Interaction Architecture

The approved interaction direction is:

```text
Core-owned identity, organization, commercial lifecycle, and authorization context
  -> Commerce Operational Scope and Commerce Access evaluation
  -> applicable canonical Commerce owner
  -> completed owner result
  -> owner-governed Event or projection input where appropriate
  -> authorized Read Models and optional external consumers
```

The following rules apply to every interaction:

1. The target owner validates explicit context, authorization, eligibility, current state, and
   its own invariants.
2. Only the target owner may perform its canonical state transition.
3. A collaborating Domain communicates intent through an owner-governed logical Contract.
4. A completed owner fact precedes derived projection work.
5. Partial multi-owner progress remains explicit and traceable by correlation and causation.
6. Reporting and optional consumers never become write dependencies of a canonical owner.
7. No interaction assumes direct access to another owner's private state.

## 5. Logical Contracts

### 5.1 Contract philosophy

A logical Contract is an approved semantic boundary between an accountable provider or caller
and a target consumer. It describes purpose, governance, ownership preservation, context, and
expected logical result without prescribing a physical interface.

Contracts do not create shared ownership. A consumer may validate, reject, or project supplied
information, but it cannot reinterpret the source fact as consumer-owned truth.

### 5.2 Contract ownership and governance

Every logical Contract has exactly one governance owner accountable for:

- semantic meaning and invariant preservation;
- supported version identity;
- compatibility and deprecation decisions;
- logical error semantics; and
- clear ownership of any result.

Governance follows the approved source/target-owner rule:

| Contract kind | Governance owner |
|---|---|
| Context or fact Contract | Canonical provider of the context or fact |
| Command, operation, or effect-request Contract | Canonical target owner that validates and may change state |
| Result Contract | Owner that produces the result |
| Source-specific projection Contract | Canonical source owner for its published fact |
| Shared-service intake Contract | Receiving Core service for intake requirements; source owner retains source-fact governance |

A generic family that covers multiple canonical sources is not jointly governed. Each source
owner governs its source-specific Contract; the receiver governs only its ingestion or
projection requirements.

### 5.3 Core Platform Contract families

| ID | Logical Contract | Governance owner | Commerce consumer | Approved purpose |
|---|---|---|---|---|
| LC-01 | Authenticated Actor Context | Core Identity and Access | Commerce Access | Establish verified actor and authenticated context |
| LC-02 | Workspace Context | Core Workspace Management | Commerce Access and protected Domains | Resolve tenant and Workspace context |
| LC-03 | Selected Business Context | Core Business Registry | Commerce Access and protected Domains | Resolve selected Business and its Workspace relationship |
| LC-04 | Organization Scope Context | Core Organization Registry | Commerce Access and protected Domains | Resolve Business Unit, Department, Branch, and ancestry within selected Business |
| LC-05 | Commerce Eligibility Context | Applicable Core commercial lifecycle owner for each source fact | Setup, Access, Extensions | Validate Product, Plan, Entitlement, Subscription, Installation, Activation, and access state |
| LC-06 | Commerce Setup Handoff | Product Hub for handoff semantics; Setup owns target validation | Setup and Configuration | Transfer an authorized journey into Commerce-owned setup |
| LC-07 | Commerce Launch Handoff | Product Hub for handoff semantics; receiving Commerce boundary owns target validation | Commerce experience | Transfer an authorized journey into ready Commerce context |
| LC-08 | Audit Submission | Core Audit Service for intake; Commerce source owner retains its source fact | Core Audit Service | Submit attributable critical-action evidence |
| LC-09 | Notification Intent | Core Notification Service for intake; Commerce source owner retains its triggering fact | Core Notification Service | Request notification handling from a completed Commerce fact |
| LC-10 | Search Projection Input | Core Search for intake requirements; Commerce source owner retains its source-fact Contract | Core Search | Supply authorized searchable Commerce facts |
| LC-11 | Analytics Projection Input | Core Analytics for intake requirements; Commerce source owner retains its source-fact Contract | Core Analytics | Supply governed analytical Commerce facts |

### 5.4 Intelligence Contract families

| ID | Logical Contract | Governance owner | Commerce relationship | Approved purpose |
|---|---|---|---|---|
| LC-12 | Business Context | Business DNA owner | Authorized consumer | Supply versioned Business context without transferring ownership |
| LC-13 | Knowledge, Rule, and Capability Context | Respective frozen owner for each source-specific Contract | Authorized validation or Business Brain integration | Supply governed meaning and constraints |
| LC-14 | Completed Decision | Business Brain | Advisory consumer | Supply a completed, deterministic Decision |
| LC-15 | Recommendation | Recommendation Engine | Authorized user or workflow | Supply an advisory Recommendation |
| LC-16 | Implementation Option | Core intelligence mapping owner | Setup or operations | Describe target mapping without applying state |
| LC-17 | Configuration Proposal | Configuration Engine | Applicable Commerce target owner | Offer versioned proposed changes for independent target validation |
| LC-18 | Configuration Application Result | Applying Commerce target owner | Configuration Engine and authorized observers | Report target-owned application outcome without transferring target state |
| LC-19 | Commerce Outcome Feedback | Originating Commerce fact owner | Authorized Business Brain or Recommendation flow | Supply governed observed outcome without exporting ownership |

LC-13 is a family of separately governed source Contracts. It does not combine the ownership of
Knowledge, Rule, or Capability.

### 5.5 Marketplace and AI Contract families

| ID | Logical Contract | Governance owner | Consumer | Approved purpose |
|---|---|---|---|---|
| LC-20 | Marketplace Eligibility and Asset Context | Marketplace | Extensions | Prove asset version, Entitlement, activation, and allowed scope |
| LC-21 | Commerce Extension Invocation | Applicable canonical Commerce target owner | Canonical target owner | Request permitted target behavior without direct writes |
| LC-22 | AI Advisory Artifact | AI Coordinator | Authorized Commerce experience | Supply explanation, narrative, suggestion, advisory output, or Action Proposal after Decision formation |
| LC-23 | AI Action Application Result | Applying Commerce target owner | AI Coordinator and authorized observers | Report independently validated target outcome |

### 5.6 Internal Commerce Contract families

| ID | Logical Contract | Governance owner | Typical consumers | Approved purpose |
|---|---|---|---|---|
| LC-24 | Catalog Selection | Product Catalog | Pricing, Inventory, Orders, POS | Supply valid Product, Variant, Category, Unit, and Product Identifier facts |
| LC-25 | Pricing Determination | Pricing | Orders, POS, Returns and Adjustments | Supply eligible commercial terms without owning consumer history |
| LC-26 | Inventory Effect Request | Inventory | Orders, Returns and Adjustments, Transfers, authorized Setup or Extension flow | Request an attributable Inventory Movement |
| LC-27 | Inventory Effect Result | Inventory | Requesting Domain | Report accepted or rejected movement and resulting owner reference |
| LC-28 | Order Operation | Orders | POS and optional channels | Request creation or transition of the canonical Order |
| LC-29 | Monetary Operation | Payments and Refunds | POS, Orders, Returns and Adjustments | Record Payment or Refund through its owner |
| LC-30 | Tax Determination | Taxes | Orders, POS, Invoices and Documents, Returns and Adjustments | Produce a canonical Tax Application |
| LC-31 | Document Operation | Invoices and Documents | Orders, POS, Payments and Refunds, Returns and Adjustments | Issue or transition a Commerce Document through its owner |
| LC-32 | Return or Adjustment Operation | Returns and Adjustments | Orders, POS, authorized service flows | Record Return, Exchange, or Commercial Adjustment through its owner |
| LC-33 | Transfer Operation | Transfers | Authorized inventory operations | Record and evolve Transfer intent through its owner |
| LC-34 | Reporting Projection Input | Each canonical source owner for its source-specific Contract; Reporting owns ingestion and projection only | Reporting | Supply owned facts or Events for disposable Commerce projections |

### 5.7 Contract versioning principles

1. Every Contract use identifies a governed version.
2. The Contract governance owner controls version creation, support, deprecation, and retirement
   under Governance and applicable ADRs.
3. A version change cannot transfer canonical ownership or weaken an owner invariant.
4. Consumers validate that a version is supported before relying on it.
5. Source version, business context, correlation, and causation remain traceable across an
   interaction where applicable.
6. Version evolution preserves the meaning of accepted inputs and results for supported
   consumers.
7. Exact version formats, compatibility periods, and deprecation windows remain DD-29.

### 5.8 Contract compatibility principles

- Supported consumers must not be forced to reinterpret an established Contract meaning.
- A change that alters meaning, required context, authorization, target invariants, or ownership
  requires governed compatibility treatment.
- An unsupported or ambiguous Contract version is rejected explicitly; it is never guessed.
- Missing required Business or organization context is not recovered by inference.
- Repeated logical requests are accepted only under owner-defined idempotency semantics.
- Compatibility does not authorize a consumer to bypass current security or eligibility checks.
- Exact fields, logical error categories, compatibility periods, and idempotency semantics
  remain DD-29.

## 6. Logical Events

### 6.1 Event philosophy

An Event states that an authorized owner transition has completed. It is an immutable
observation, not a command, authorization grant, state container, or alternative source of
truth.

Only the canonical fact owner may publish the authoritative Domain Event for that fact. A
consumer may project or react to the Event within its own authority, but it cannot revise the
source fact or publish a competing authoritative Event.

### 6.2 Event taxonomy

| Classification | Meaning | Ownership rule |
|---|---|---|
| Commerce Domain Event | Completed canonical Commerce transition | Owned by the Domain that changed the canonical fact |
| Commerce Integration Event | Minimized, versioned external representation derived from a committed owner fact | Source fact owner governs meaning |
| Commerce Notification Input | Owner-directed request to Core Notification Service | Not a Domain Event or Notification record |
| Commerce Audit Input | Owner-supplied evidence to Core Audit Service | Not the Core-owned Audit Record |
| Commerce Intelligence Feedback | Authorized outcome representation for a future governed intelligence cycle | Cannot mutate Decision or Recommendation |
| Projection or observability signal | Projection health, freshness, or lifecycle information | Not a Domain Event or canonical Commerce fact |

### 6.3 Domain Event responsibility families

| ID | Event responsibility family | Exactly one source owner | Represents |
|---|---|---|---|
| EV-01 | Commerce Setup changed or completed | Setup and Configuration | Completed Commerce Setup transition |
| EV-02 | Commerce readiness contribution changed | Setup and Configuration | Current Commerce-owned readiness result |
| EV-03 | Product, Variant, Category, Unit, or Product Identifier changed | Product Catalog | Completed catalog transition |
| EV-04 | Price, Discount, or Promotion changed | Pricing | Completed pricing transition |
| EV-05 | Stock changed | Inventory | Completed Inventory-owned position transition |
| EV-06 | Inventory Movement recorded | Inventory | Completed attributable Stock effect |
| EV-07 | Transfer changed | Transfers | Completed Transfer transition |
| EV-08 | Order changed | Orders | Completed Order transition |
| EV-09 | POS Transaction changed | Point of Sale | Completed POS-specific transition |
| EV-10 | Transactional Customer changed | Transactional Customers | Completed customer transition |
| EV-11 | Payment recorded or failed | Payments and Refunds | Recorded canonical Payment transition |
| EV-12 | Refund recorded or failed | Payments and Refunds | Recorded canonical Refund transition |
| EV-13 | Tax Configuration or Tax Application changed | Taxes | Completed tax transition |
| EV-14 | Commerce Document issued, replaced, or voided | Invoices and Documents | Completed document transition |
| EV-15 | Return or Exchange changed | Returns and Adjustments | Completed Return or Exchange transition |
| EV-16 | Commercial Adjustment changed | Returns and Adjustments | Completed adjustment transition |
| EV-17 | Commerce Operational Report projection changed | Reporting | Projection lifecycle or observability signal; explicitly not a Domain Event |

The Event responsibility catalog contains sixteen Domain Event families and one projection or
observability signal family.

### 6.4 Integration Events

A Commerce Integration Event may be produced only from an authorized, committed source fact.
It is intentionally minimized for an approved external consumer and retains source-owner,
context, version, correlation, and causation traceability appropriate to its use.

Integration Event creation does not transfer ownership to Reporting, Extensions, Product Hub,
Business Brain, AI Coordinator, another Operating System, Marketplace, or a receiving Core
service. External consumption cannot become a prerequisite for committing the source fact.

### 6.5 Event publication principles

1. The owner validates and completes the canonical transition before publishing its Event.
2. Publication never substitutes for the owner's canonical write.
3. Consumers process Events idempotently and do not assume global ordering.
4. Any required ordering is bounded to an explicitly identified source stream.
5. External publication minimizes tenant and sensitive information.
6. Replay may rebuild projections or retry permitted side effects; it cannot repeat an
   unauthorized canonical decision.
7. Event versions evolve under Governance and applicable ADR control.
8. Publication or delivery failure cannot create a second writer or erase committed owner state.
9. Notification, Audit, and Intelligence inputs retain their distinct taxonomy.
10. Exact names, publication criteria, versions, ordering scopes, retention, replay controls,
    and delivery guarantees remain DD-30.

## 7. Read Models and Projections

### 7.1 Read Model principles

Read Models are derived, disposable, authorization-filtered views. Their projection owner owns
the projection definition, build lifecycle, freshness state, and quality state. The projection
owner never acquires the source facts.

A Read Model:

- is rebuilt from owner-governed facts or Events;
- does not authorize a canonical write;
- cannot correct its source fact;
- exposes staleness or incompleteness honestly;
- preserves source attribution, version, scope, and freshness appropriate to its purpose; and
- applies the same or stricter access scope as its sources.

### 7.2 Commerce Read Model catalog

| ID | Read Model | Projection owner | Source owners | Approved purpose |
|---|---|---|---|---|
| RM-01 | Commerce Setup and Readiness View | Setup and Configuration | Setup and applicable Core lifecycle owners | Show remaining Commerce prerequisites and handoff status |
| RM-02 | Commerce Catalog View | Product Catalog | Product Catalog, Pricing, Inventory | Support browsing and operational selection |
| RM-03 | Effective Pricing View | Pricing | Pricing, Product Catalog | Present applicable Price, Discount, and Promotion information |
| RM-04 | Stock Availability View | Inventory | Inventory, Product Catalog, Core Branch references | Present scoped operational availability |
| RM-05 | Commerce Order View | Orders | Orders and referenced completion owners | Present canonical Order status and linked outcomes |
| RM-06 | POS Operations View | Point of Sale | POS, Orders, Payments and Refunds, Invoices and Documents | Support POS workflow without owning linked facts |
| RM-07 | Transactional Customer History View | Transactional Customers | Transactional Customers, Orders, Payments and Refunds, Returns and Adjustments | Present Commerce purchase-facing history |
| RM-08 | Payment and Refund View | Payments and Refunds | Payments and Refunds, referenced Orders and Returns | Present monetary outcomes |
| RM-09 | Tax Operations View | Taxes | Taxes and referenced commercial owners | Support tax inspection and reporting |
| RM-10 | Commerce Document View | Invoices and Documents | Invoices and Documents and referenced source owners | Present issued Commerce Documents and status |
| RM-11 | Return and Adjustment View | Returns and Adjustments | Returns and Adjustments and downstream outcome owners | Present reversal workflow and effects |
| RM-12 | Transfer Operations View | Transfers | Transfers and Inventory | Present Transfer progress and Inventory Movement outcomes |
| RM-13 | Commerce Operational Dashboard | Reporting | Approved Commerce source owners | Present authorized operational status |
| RM-14 | Commerce Operational Reports | Reporting | Canonical Commerce source owners | Present approved sales, tax, inventory, and product-performance views |

### 7.3 Projection responsibilities and ownership

The projection owner:

- defines how approved source facts are represented for the Read Model's purpose;
- validates source identity, version, tenant, and applicable organization scope;
- applies authorization filtering and data minimization;
- tracks freshness, completeness, source traceability, and rebuild status;
- rejects unsupported or ambiguous source input; and
- rebuilds or corrects projection state without changing canonical facts.

The canonical source owner remains responsible for its source fact and source-specific
projection Contract. Reporting owns Reporting ingestion requirements and Reporting projections
only.

### 7.4 Reporting flow

```text
Canonical Commerce owner completes an authorized fact
  -> source owner exposes approved, versioned projection input
  -> Reporting validates source, context, version, and authorization scope
  -> Reporting updates the applicable disposable projection
  -> Reporting exposes freshness, completeness, and source attribution
  -> authorized user or shared Core service consumes the projection
```

Commerce Operational Reports and the Commerce Operational Dashboard are non-canonical.
Reporting never writes Product, Price, Stock, Order, Payment, Refund, Tax Application, Commerce
Document, Return, Transfer, Setup, or any other owner fact.

Report definitions, freshness rules, accounting-grade status, exports, snapshots, retention,
time boundaries, and detailed authorization filtering remain DD-08 and DD-28.

## 8. Core Shared-Service Participation

### 8.1 Search participation

- A canonical Commerce owner supplies only authorized searchable facts through its
  source-specific Search Projection Input.
- Core Search governs intake requirements and owns the Search Index.
- Search results are projections and cannot authorize or perform Commerce writes.
- Search failure or stale indexing cannot invalidate a canonical Commerce fact or block
  Commerce Core.
- Search access remains tenant-, context-, resource-, and permission-filtered.

### 8.2 Audit participation

- The accountable Commerce owner submits minimum critical-action evidence with Actor,
  explicit context, action, owner, correlation, causation, version, and outcome as applicable.
- Core Audit Service governs the intake Contract and owns the Audit Record.
- Commerce does not rewrite an Audit Record, and Audit Service does not own the Commerce fact.
- Authorization decisions and consequential Setup, pricing, Stock, Order, Payment, Refund, tax,
  document, Return, Transfer, extension, and permission outcomes remain audit-ready.
- Audit submission failure is visible and governed without creating a second Commerce writer.

### 8.3 Notification participation

- A canonical Commerce owner may produce Notification Intent only from an authorized owner
  fact or outcome.
- Core Notification Service governs intake and owns Notification state and lifecycle.
- A Notification is not a Domain Event and never becomes canonical Commerce truth.
- Notification failure cannot roll back or duplicate a completed Commerce write.
- Recipient scope and supplied information remain minimized and authorized.

### 8.4 Analytics participation

- Each Commerce source owner governs its source-specific analytical fact Contract.
- Core Analytics governs intake requirements and owns the platform Analytics projection.
- Reporting may coordinate approved projection participation but never becomes source owner.
- Analytics results cannot silently change canonical Commerce facts or become authorization
  truth.
- Analytics failure cannot block Commerce Core.

## 9. Authorization and Security

### 9.1 Authorization flow

```text
Core authenticates Actor and supplies verified identity context
  -> Core supplies Workspace, selected Business, organization scope, grants, OS access,
     Entitlement, Subscription, Installation, and Activation context as applicable
  -> Commerce Access validates required context and Commerce permission semantics
  -> applicable target Domain validates Module, Resource, current state, and Domain invariants
  -> target owner permits or denies the requested transition
  -> consequential authorization evidence is submitted to Core Audit Service
```

Authentication never implies authorization. Commerce Access owns Commerce permission-resource
and action semantics, operational role definitions, interpretation of Core-issued context, and
the runtime Commerce authorization result. Core retains identity, authentication, Membership,
canonical grants and assignments, organization access relationships, and shared authorization
foundations.

### 9.2 Security responsibilities

Commerce must:

- require verified identity and valid session context from Core;
- validate applicable Workspace, Business, Business Unit, Department, Branch, Commerce OS,
  Module, Resource, Permission, Entitlement, and lifecycle context;
- enforce permission and target invariants at the canonical owner boundary;
- isolate tenants and reject missing, ambiguous, stale, or mismatched context;
- minimize and protect customer, payment, tax, document, staff, extension, intelligence, and
  integration information;
- treat external and optional inputs as untrusted;
- protect sensitive information in operational records, Events, projections, exports, and AI
  interactions under frozen policy; and
- fail closed when required security context cannot be proven.

Core retains authentication, session and token strategy, secret standards, platform keys,
canonical Permission grants, security audit infrastructure, and incident governance.

### 9.3 Cross-Domain validation

Every target Domain independently validates:

1. the caller's verified Actor and explicit organization context;
2. OS, Module, Resource, Permission, Entitlement, and lifecycle eligibility where applicable;
3. Contract version and correlation information;
4. references to facts owned by other Domains without attempting to write them;
5. current target state and target invariants; and
6. whether the requested transition can be completed once without duplicate effects.

Prior validation by a caller, UI, Reporting projection, extension, or another Domain never
replaces validation by the canonical target owner.

### 9.4 External-interaction security

- Marketplace Assets, AI artifacts, cross-OS inputs, external provider outcomes, callbacks,
  and extension requests are untrusted until authenticated, authorized, scope-checked,
  version-checked, and target-validated.
- External references never grant access or transfer ownership.
- Data supplied outside Commerce is minimized to the authorized purpose and context.
- Consequential AI or Configuration Proposal actions follow current authorization and human
  approval policy before the target owner may act.
- An optional dependency cannot expand the caller's Core or Commerce authority.

### 9.5 Security invariants

1. Workspace remains the tenant boundary.
2. Business context is explicit and never inferred solely from Business Unit ancestry.
3. Navigation and Read Models are never authorization sources.
4. A non-owner cannot bypass the target owner through a Contract, Event, projection, or
   extension.
5. Core grants and assignments remain canonical; this Wave adds no Commerce Access write model.
6. Commerce operational roles remain independently usable without HR OS.
7. Security failure produces no unauthorized canonical write.
8. Recovery and replay re-evaluate applicable authorization and tenant isolation.

The detailed Commerce permission catalog, role templates, delegation, approval thresholds,
field-level access, data classification, consent, retention, masking, and legal-hold rules remain
DD-34 and DD-35.

## 10. External and Optional Interaction Rules

### 10.1 Cross-OS interaction principles

- Every Operating System remains independently usable for its core workflow.
- Cross-OS interaction is optional, explicit, versioned, reference-based, and authorized.
- Each OS retains its canonical facts and validates incoming requests at its own boundary.
- No shared write store, direct private-state access, or cross-OS cascade may bypass an owner.
- A reference or projection does not transfer ownership.
- Failure in another OS cannot corrupt Commerce state or create parallel Commerce truth.
- Exact reference, consent, failure, reconciliation, and feedback Contracts remain DD-33.

### 10.2 Marketplace interaction rules

Marketplace retains Marketplace Asset identity, immutable published versions, review,
discovery, acquisition, Marketplace Entitlement, and scoped activation or installation state.

Commerce may consume an entitled and activated asset version, maintain Commerce-owned target
configuration, invoke permitted canonical owner Contracts, and supply authorized outcome or
usage signals. Commerce cannot publish, mutate, review, version, entitle, or install a
Marketplace Asset as Commerce-owned state. Visibility never proves entitlement, and an Asset
cannot bypass Access or create parallel Product, Order, Stock, Payment, Tax, Document, Return,
or Transfer truth.

Marketplace extension permissions, compatibility, data access, failure isolation, and removal
effects remain DD-32.

### 10.3 AI interaction rules

- AI Coordinator exclusively coordinates AI participation and owns AI artifacts.
- Business Brain completes the canonical Decision independently before AI participation.
- AI never contributes to canonical Decision formation and never owns a Commerce fact.
- AI may supply an explanation, narrative, suggestion, advisory output, or Action Proposal
  after the Decision exists.
- Commerce independently validates Actor, explicit context, authorization, current state,
  input version, target invariants, and required human approval.
- Only the applicable Commerce target owner may apply an accepted action.
- AI failure cannot block Commerce Core or alter a completed Decision.

### 10.4 Extension interaction rules

```text
Extension consumes effective eligibility and approved Module Configuration
  -> Commerce Access validates the requested action
  -> extension invokes the applicable target-owner Contract
  -> target owner validates and performs any canonical write
  -> extension consumes the owner result
```

An extension coordinates permitted behavior only. It owns no canonical target Commerce fact,
cannot access another Domain's private state, and cannot become required for Commerce Core.
Optional Module and extension failure remains isolated from unaffected Core workflows.

### 10.5 Configuration Proposal consumption

Configuration Engine owns the Configuration Proposal. The applicable Commerce target owner:

1. validates proposal identity and version, Actor, explicit context, authorization, current
   target state, and target invariants;
2. accepts, rejects, expires, or applies the proposal only under the still-deferred target
   policy;
3. owns any resulting target state; and
4. owns the Configuration Application Result.

Setup and Configuration participates only when the proposal targets Setup-owned state.
Proposal validation, conflict, expiry, partial application, rollback, and detailed result
semantics remain DD-31.

### 10.6 Recommendation consumption

Recommendation Engine owns Recommendation. Commerce consumes it as advisory input only.

- A Recommendation does not authorize, configure, or write Commerce state.
- Acceptance by a user or workflow does not bypass target-owner validation.
- A Recommendation may inform selection of an Implementation Option or Configuration Proposal,
  but those concepts retain their frozen owners.
- Rejection or non-use of a Recommendation does not prevent Commerce Core operation.
- Commerce Outcome Feedback remains owned by the originating Commerce fact owner and cannot
  mutate the Recommendation.

## 11. Failure Isolation Principles

1. Validation or authorization failure performs no canonical write.
2. An owner failure remains owner-scoped and observable.
3. Partial multi-owner progress is explicit; no projection may hide it.
4. A projection failure does not invalidate a completed canonical write.
5. Search, Audit intake, Notification, Analytics, Reporting, AI, Marketplace, another OS, and
   optional extension failures cannot create a second writer.
6. Optional dependency failure degrades only the dependent optional capability.
7. A compensation request is processed by the affected owner and never authorizes direct
   mutation by the requester.
8. Timeout means an outcome is unknown or pending unless completion or failure is proven.
9. Retries remain bounded and are permitted only when the target owner can preserve idempotency,
   Actor, scope, request identity, correlation, and causation.
10. Recovery begins through the owner that can validate and reconcile its fact.

Exact recovery workflows, reconciliation policy, operational approval, and incident runbooks
remain DD-37. Retry values and physical coordination remain deferred.

## 12. Observability Principles

Commerce logical interactions remain traceable across owner boundaries without exposing
sensitive or cross-tenant information.

Observability covers:

- Setup and readiness progression;
- catalog and pricing transitions;
- Stock, Inventory Movement, and Transfer reconciliation;
- Order, POS, Payment, Refund, tax, document, Return, Exchange, and Adjustment progression;
- Contract and Event processing outcomes;
- Read Model freshness, completeness, and rebuild state;
- authorization denial and tenant-boundary violations;
- Marketplace, AI, extension, shared-service, and cross-OS boundary participation; and
- optional dependency health and degraded operation.

Logical observability records preserve correlation, causation, owner, explicit scope, version,
and outcome as applicable. Observability never becomes authorization, canonical truth, or an
Audit Record. Signal names, measures, thresholds, service objectives, retention, escalation,
and tooling remain DD-36.

## 13. Reliability Principles

1. **Canonical writes before projections:** An owner commits source truth before derived work
   is considered complete.
2. **Idempotency for repeatable requests:** Repetition cannot create duplicate canonical facts.
3. **Explicit partial state:** Multi-owner work never hides partial completion.
4. **Owner-local recovery:** Recovery is initiated through the owner that validates its fact.
5. **No assumed global transaction:** Logical consistency does not depend on an unspecified
   distributed transaction.
6. **Reconciliation by reference:** Owner outcomes remain traceable through stable references,
   correlation, and causation.
7. **Projection rebuildability:** Read Models can be rebuilt without changing canonical writes.
8. **Bounded retries:** Retry behavior is finite, observable, and safe for the operation.
9. **Honest timeout semantics:** Timeout never fabricates failure or authorizes duplicate work.
10. **Optional dependency isolation:** Optional consumers and integrations cannot block
    Commerce Core.
11. **Deterministic owner rules:** Canonical transitions remain reproducible from retained
    context and versions.
12. **Backward-compatible Contracts:** Supported consumers are protected by version governance.
13. **Secure recovery:** Recovery never bypasses current authorization, tenant isolation, or
    audit obligations.
14. **Data integrity over availability:** Commerce refuses or holds unsafe work rather than
    fabricate success.
15. **Independent operability:** Commerce Core remains usable without another Operating System.

## 14. Deferred Decisions

Wave 2 preserves the complete approved DD-01 through DD-40 register without resolution or
reinterpretation.

| Group | Deferred decisions preserved |
|---|---|
| Domain model and aggregate detail | DD-01 through DD-08 |
| Setup, readiness, context, and Modules | DD-09 through DD-14 |
| Commerce Domain semantics | DD-15 through DD-28 |
| Contracts, Events, intelligence, and integration | DD-29 through DD-33 |
| Security, privacy, and operations | DD-34 through DD-37 |
| Physical implementation choices | DD-38 through DD-40 |

In particular, this Wave does not decide exact Contract fields or error taxonomies (DD-29),
Event names or publication mechanics (DD-30), Configuration Proposal application policy
(DD-31), Marketplace extension policy (DD-32), cross-OS Contract detail (DD-33), security and
operations detail (DD-34 through DD-37), or any physical implementation choice (DD-38 through
DD-40).

## 15. Documentation Constraints

This document must be interpreted only as logical architecture documentation.

- The LC, EV, and RM identifiers are local documentation references; they do not create new
  architecture concepts or physical artifacts.
- Contract tables express logical semantic boundaries, not APIs or endpoints.
- Event tables express ownership and classification, not payloads or delivery mechanisms.
- Read Model tables express logical projections, not storage structures.
- Flow diagrams express responsibility order, not implementation sequence or runtime topology.
- Owner names preserve the approved Domain map and do not create services or deployment units.
- No statement in this Wave resolves DD-01 through DD-40.
- Any future architectural change requires Governance, applicable ADR treatment, Architecture
  Review, and an updated approved baseline.

## 16. Wave 2 Validation

| Validation | Result |
|---|---|
| Logical Contract families preserve exactly-one governance ownership | Pass |
| Context Contracts preserve Workspace, Business, Business Unit, Department, and Branch ownership | Pass |
| Domain Event families preserve canonical source ownership | Pass |
| Integration Events do not transfer source ownership | Pass |
| Commerce Operational Report changes remain projection or observability signals | Pass |
| Read Models remain disposable and non-canonical | Pass |
| Reporting, Search, Audit, Notification, and Analytics retain approved ownership | Pass |
| Authorization preserves Core grants and Commerce target enforcement | Pass |
| Cross-Domain, cross-OS, Marketplace, AI, and extension boundaries remain owner-safe | Pass |
| Configuration Proposal and Recommendation retain their frozen owners | Pass |
| Failure isolation preserves Commerce Core independence | Pass |
| DD-01 through DD-40 remain deferred | Pass |
| No physical or implementation-specific design is introduced | Pass |

## 17. References

### 17.1 Governance and frozen architecture

- `docs/00-governance/`
- `docs/01-genesis/`
- `docs/02-core-platform/`
- `docs/03-business-brain/`
- `docs/99-architecture-freeze/`

### 17.2 Commerce OS approved baseline

- `docs/04-commerce-os/00-COMMERCE-OS-DISCOVERY.md`
- `docs/04-commerce-os/01-COMMERCE-OS-CAPABILITY-MAP.md`
- `docs/04-commerce-os/02-COMMERCE-OS-PROPOSAL.md`
- `docs/04-commerce-os/04-COMMERCE-OS-PROPOSAL-PATCH-v0.1.1.md`
- `docs/04-commerce-os/05-COMMERCE-OS-RE-REVIEW.md`
- `docs/04-commerce-os/06-COMMERCE-OS-WAVE-1.md`
