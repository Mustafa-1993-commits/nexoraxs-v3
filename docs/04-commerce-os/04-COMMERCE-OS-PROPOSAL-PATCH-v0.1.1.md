# Commerce OS Proposal Freeze Alignment Patch v0.1.1

**Status:** Proposed Patch — Pending Independent Re-Review
**Patch type:** Freeze Alignment Patch
**Applies to:** Commerce OS Architecture Proposal v0.1
**Resulting review baseline:** Commerce OS Proposal v0.1 plus this Patch, read together as Proposal baseline v0.1.1
**Authority:** Commerce OS Architecture Review and the frozen Governance, Genesis, Core Platform, and Business Brain baselines

## 1. Purpose

This document is the authorized Freeze Alignment Patch for the Commerce OS Architecture Proposal v0.1.

It resolves only the substantive findings accepted by `03-COMMERCE-OS-ARCHITECTURE-REVIEW.md`. It does not replace, edit, or restate the complete Proposal. Where this Patch clarifies a reviewed statement, this Patch controls the interpretation of that statement during re-review. Every Proposal statement not addressed here remains unchanged.

This Patch does not authorize Documentation Waves or freeze Commerce OS architecture. Proposal baseline v0.1.1 requires independent architecture re-review.

## 2. Patch Authority

### 2.1 Authority statements

- **No architecture redesign:** this Patch preserves the Proposal's logical architecture and corrects only reviewed alignment defects.
- **No ownership redesign:** this Patch makes the Proposal's intended one-owner boundaries explicit and removes competing wording; it does not transfer a frozen responsibility.
- **No capability redesign:** all 18 proposed capabilities and all 16 proposed domains remain unchanged.
- **No implementation decisions:** no physical aggregate, persistence, runtime, transport, or delivery mechanism is selected.
- **No technology decisions:** no framework, database, queue, messaging product, cloud, vendor, or tooling choice is made.
- **Patch only:** this artifact is an overlay for Proposal v0.1 and has no independent authority beyond the approved patch scope.

### 2.2 Governing authority

This Patch restores alignment with:

- Genesis v1.1;
- Governance and Accepted ADR-001 through ADR-040;
- Core Platform Architecture v1.0 and Documentation Baseline v1.0.1;
- Business Brain Architecture and Documentation Baseline v1.0;
- approved Commerce OS Discovery;
- approved Commerce OS Capability Map; and
- the completed Commerce OS Architecture Review.

### 2.3 Change-control classification

| Concern | Classification |
|---|---|
| Architecture impact | None |
| Frozen predecessor impact | None |
| Capability count | Unchanged at 18 |
| Domain count | Unchanged at 16 |
| Accepted ADR impact | None |
| Draft ADR acceptance | None |
| Technology impact | None |
| Implementation impact | None |
| Backward compatibility | Fully compatible with the submitted Proposal direction and frozen predecessors |

## 3. Patch Scope

This Patch addresses only:

1. Explicit Business Context preservation;
2. Setup versus target-domain ownership clarification;
3. Commerce Operational Reports classification;
4. Commerce Access ownership clarification;
5. Draft ADR candidate normalization;
6. explicit aggregate owner attribution;
7. Product Identifier responsibility;
8. Event taxonomy alignment;
9. logical Contract governance ownership; and
10. Capability Map accountability and traceability.

The Patch does not answer DD-01 through DD-40, change Discovery, change the Capability Map, or change Proposal scope.

## 4. Patch Interpretation Rules

1. Proposal v0.1 remains the base document.
2. This Patch overrides only the conflicting or incomplete interpretation identified by the Architecture Review.
3. A clarification in this Patch must be read across every affected Proposal section, table, flow, invariant, risk, success criterion, and Draft ADR candidate.
4. No absence from this Patch removes an approved Proposal responsibility.
5. No statement in this Patch approves a deferred policy, schema, state vocabulary, or physical boundary.
6. References to an “owner” mean the one logical owner permitted to validate and change its canonical state through its contract.
7. Coordination, collection, seeding, projection, or invocation never transfers canonical ownership.

## 5. Alignment 1 — Explicit Business Context Preservation

### 5.1 Finding addressed

This alignment resolves Review finding **B-01**.

### 5.2 Canonical context rule

Every Proposal reference to Commerce context must be read as including:

```text
Actor
  + Workspace
  + applicable Business
  + operational Business Unit
  + applicable Department
  + applicable Branch
  + Commerce OS
  + Module where applicable
  + Resource
  + Permission
  + Entitlement and lifecycle context where applicable
```

“Applicable” preserves the frozen rule that a scope is included when the protected operation or resource requires it. It does not permit Business to be omitted merely because Business Unit ancestry is available.

Business and Business Unit remain distinct:

- Business is the selected Business context owned by the Core Business Registry;
- Business Unit is the operational organization identity owned by the Core Organization Registry; and
- Commerce operates on an authorized Business Unit within one explicit selected Business context.

Commerce does not own or duplicate either identity.

### 5.3 Corrected context ownership

| Context fact | Frozen owner | Commerce use |
|---|---|---|
| User and authenticated actor | Core Identity and Access | Verified reference only |
| Workspace | Core Workspace Management | Tenant and membership context |
| Business and selected Business context | Core Business Registry | Required parent business context |
| Business Unit, Department, Branch, and ancestry | Core Organization Registry | Operational scope references |
| OS access, Permission grants, Entitlement, Subscription, Installation, and Activation | applicable Core owner | Authorization and eligibility inputs |
| Commerce resource and Commerce invariant | applicable Commerce domain owner | Target-domain validation |

### 5.4 Corrected logical context contracts

The Proposal's single Organization Scope Context row is read as three owner-preserving logical contracts:

| Logical Contract | Governance owner | Provider | Commerce consumer | Purpose |
|---|---|---|---|---|
| Workspace Context | Core Workspace Management | Core Platform | Commerce Access and protected Commerce domains | Resolve tenant and Workspace context |
| Selected Business Context | Core Business Registry | Core Platform | Commerce Access and protected Commerce domains | Resolve selected Business and its Workspace relationship |
| Organization Scope Context | Core Organization Registry | Core Platform | Commerce Access and protected Commerce domains | Resolve Business Unit, Department, Branch, and canonical ancestry within selected Business |

The split is a documentation alignment of already frozen owners. It does not introduce an API, payload, or new Core responsibility.

### 5.5 Application across the Proposal

The following Proposal statements are corrected by this rule:

- the Mission context in Section 2;
- Explicit Context in Section 7.2;
- Operational Scope in Section 9;
- external ownership in Section 13.1;
- canonical write authorization in Section 14;
- projection scope in Section 17;
- inventory and tax context in Sections 22 and 27;
- AI action validation in Section 34;
- logical Core contracts in Section 36.1;
- protected action context in Section 38;
- scope deferral DD-14; and
- DADR-06.

DD-14 remains deferred for the fact-by-fact scoping matrix. The mandatory presence of applicable Business context is not deferred.

## 6. Alignment 2 — Setup Versus Target-Domain Ownership

### 6.1 Finding addressed

This alignment resolves Review finding **B-02**.

### 6.2 Setup responsibility rule

Setup and Configuration owns only:

- CWM-01 Commerce Setup;
- CWM-02 Commerce Readiness Assessment;
- Commerce Preset selection as part of Commerce Setup;
- Commerce Module Configuration as part of Commerce Setup;
- Commerce-owned billing and legal identity captured for setup;
- selling-mode setup state; and
- application of a Configuration Proposal only when the proposal targets a Setup and Configuration-owned fact.

Setup may collect, present, seed, or coordinate input for another Commerce domain. Those activities are requests to the target owner and never canonical target writes.

### 6.3 Target-owner clarification

| Setup or extension concern | Exactly one canonical target owner | Setup or Extensions responsibility |
|---|---|---|
| Commerce Setup, Preset selection, selling mode, and Module Configuration | Setup and Configuration | Own and apply within CWM-01 |
| Commerce Readiness contribution | Setup and Configuration | Own and evaluate within CWM-02 |
| Product, Variant, Category, Unit, Product Identifier, and accepted sample Product | Product Catalog | Collect or seed through Product Catalog Contract only |
| Price, Discount, and Promotion | Pricing | Collect or seed through Pricing Contract only |
| opening Stock or sample Inventory effect | Inventory | Request an attributable Inventory effect only |
| Commerce Tax Configuration and Tax Application | Taxes | Collect setup input and submit it to Taxes; never write Taxes state directly |
| document numbering and Commerce Document Template configuration | Invoices and Documents | Collect setup input and submit it to Invoices and Documents |
| Commerce role definitions and runtime enforcement semantics | Commerce Access | Present setup choice where authorized; never own Access semantics |
| Marketplace Asset identity, entitlement, installation, configuration lifecycle, and activation state | Marketplace | Consume verified Marketplace context only |
| Commerce Module Configuration | Setup and Configuration | Extensions consume effective configuration; Extensions do not own it |
| target-domain configuration introduced through an optional extension | applicable canonical Commerce target domain | Extensions coordinate an authorized target request only |
| non-Commerce external fact | its frozen external owner | Reference through the approved integration Contract only |

### 6.4 Tax write-model interpretation

CWM-15 remains one Taxes-owned logical write boundary. It is read as covering:

- Commerce Tax Configuration required by Taxes; and
- Tax Application produced by Taxes.

This clarification does not decide their final aggregate subdivision, fields, state vocabulary, or physical consistency boundary. Those details remain within DD-01 and DD-23.

### 6.5 Document write-model interpretation

CWM-16 Commerce Document remains owned by Invoices and Documents and includes the domain's numbering and Commerce Document Template configuration responsibilities. Setup gathers or recommends values; Invoices and Documents validates and writes them.

No numbering or template responsibility moves into Setup.

### 6.6 Extension ownership interpretation

PD-16 Extensions owns optional-extension coordination and invocation only. It does not own:

- Commerce Module Configuration;
- Marketplace lifecycle state;
- another Commerce domain's target configuration;
- another OS's operational state; or
- any parallel Commerce Core fact.

Any future independently mutable extension-specific canonical state remains subject to DD-32 and future Governance. This Patch does not approve such state.

### 6.7 Configuration Proposal application

Configuration Engine remains the owner of Configuration Proposal. The target domain named by a proposal is the only Commerce domain allowed to validate and apply its own canonical state.

```text
Configuration Proposal
  → resolve exact target owner
  → target owner validates current context, version, authorization, and invariants
  → target owner accepts, rejects, expires, or applies under deferred policy
  → target owner reports Configuration Application Result
```

Setup and Configuration performs this sequence only for Setup-owned targets. DD-31 remains fully deferred.

## 7. Alignment 3 — Commerce Operational Reports Classification

### 7.1 Finding addressed

This alignment resolves Review finding **M-02**.

### 7.2 Classification

Commerce Operational Reports are logical read models and projections. They are not:

- canonical Commerce business facts;
- canonical write models;
- sources of truth for Orders, Products, Prices, Stock, Payments, Taxes, Documents, Returns, Transfers, or Access;
- authorization sources; or
- substitutes for platform Analytics ownership.

Reporting owns:

- the Commerce Operational Report definition;
- projection construction and rebuild behavior;
- projection freshness, completeness, and quality state; and
- authorized report presentation lifecycle.

Canonical Commerce domains retain ownership of every source fact.

### 7.3 Corrected ownership-table interpretation

The `Commerce Operational Reports` row in Proposal Section 13 is not a canonical-fact row. It is read as a projection-ownership annotation:

| Projection | Projection owner | Canonical source owners | Write authority |
|---|---|---|---|
| Commerce Operational Reports | Reporting | applicable Commerce canonical domains | None over source facts |

The Proposal remains at 18 canonical write models. No report write model or aggregate is added.

### 7.4 Lifecycle interpretation

The Commerce Operational Report lifecycle in Section 18 is a projection lifecycle owned by Reporting. It governs generation, freshness, supersession, expiry, and rebuild status only. It is not a canonical domain-fact lifecycle.

DD-08 and DD-28 remain deferred. This Patch does not decide whether a future export or snapshot is a separately governed artifact.

## 8. Alignment 4 — Commerce Access Ownership

### 8.1 Finding addressed

This alignment resolves Review finding **M-03**.

### 8.2 Access boundary

Core Platform retains ownership of:

- User identity and authentication;
- Workspace Membership;
- canonical Permission grants and assignments;
- OS, Business, Business Unit, Department, Branch, and resource access relationships; and
- shared authorization context and policy foundations.

Commerce Access owns:

- Commerce permission-resource and action semantics;
- Commerce operational role definitions such as cashier, manager, and inventory manager;
- Commerce resource invariants;
- interpretation of Core-issued authorization context for a Commerce action; and
- the runtime Commerce authorization result for the requested action.

### 8.3 Canonical-state clarification

Proposal baseline v0.1.1 approves no additional mutable Commerce Access aggregate or canonical write model.

For this Proposal baseline:

- Commerce operational role definitions and permission semantics are logical domain policy definitions;
- Core-owned grants and assignments remain the canonical user-access records;
- a runtime authorization result is an evaluated decision, not a persistent Commerce business fact;
- consequential authorization evidence may be submitted to the Core-owned Audit Service; and
- navigation visibility remains a projection of effective access, never authorization truth.

DD-34 remains deferred. If future configurable Commerce role templates, delegations, approval thresholds, or field-level policies require mutable Commerce canonical state, that decision requires the governed ADR and review process. This Patch does not approve it.

### 8.4 Lifecycle clarification

No separate Commerce Access record lifecycle is added. The Section 18 lifecycle inventory remains complete for the canonical Commerce write models approved by the Proposal. Core owns grant and assignment lifecycles; Commerce Access evaluates them against Commerce-owned semantics.

## 9. Alignment 5 — Draft ADR Candidate Normalization

### 9.1 Finding addressed

This alignment resolves Review finding **M-04**.

### 9.2 Normalization rules

1. A Draft ADR candidate does not become Accepted through the Proposal or this Patch.
2. An Accepted ADR is referenced and applied; it is not duplicated as a new Commerce ADR.
3. One future ADR records one principal independently changeable decision.
4. A Commerce-specific decision may cite Accepted platform constraints without restating them as new authority.
5. Any material conflict with an Accepted ADR requires explicit supersession under Governance; this Patch creates none.

### 9.3 Normalized candidate register

| Proposal candidate | Normalized status for re-review | Existing authority or remaining subject |
|---|---|---|
| DADR-01 Commerce OS Independent Operating Boundary | Existing Accepted ADR application; no duplicate ADR | ADR-024 and ADR-025 |
| DADR-02 Commerce Capability Catalog | Potential new Commerce ADR subject | Approval of the 18-capability Commerce catalog |
| DADR-03 Commerce Domain Map | Potential new Commerce ADR subject | Approval of the 16-domain Commerce map |
| DADR-04 Commerce Core and No-Parallel-Truth Rule | Potential Commerce-specific ADR subject | Apply ADR-024 to Commerce Core and optional channels without restating OS independence |
| DADR-05 Commerce Setup and Readiness Ownership | Existing Accepted ADR application; no duplicate ADR | ADR-018, ADR-023, ADR-026, and OS-owned readiness facts |
| DADR-06 Canonical Organization Reference Boundary | Existing Accepted ADR application; no duplicate ADR | ADR-004 and ADR-040; includes distinct Business context under this Patch |
| DADR-07 Commerce Catalog Ownership | Potential new Commerce ADR subject | Product Catalog ownership including Product Identifier |
| DADR-08 Commerce Pricing Ownership | Potential new Commerce ADR subject | Price, Discount, and Promotion ownership |
| DADR-09 Inventory Position and Movement Ownership | Potential new Commerce ADR subject | Stock and Inventory Movement ownership and reconciliation invariant |
| DADR-10 Transfer and Inventory Separation | Potential new Commerce ADR subject | Transfer intent versus Inventory effect ownership |
| DADR-11 Order and Channel Convergence | Potential new Commerce ADR subject | One Order truth across Commerce channels |
| DADR-12 POS Transaction Boundary | Potential new Commerce ADR subject | POS-specific state versus canonical Commerce owners |
| DADR-13 Transactional Customer and CRM Boundary | Potential new Commerce ADR subject | Commerce transactional customer versus CRM workflow |
| DADR-14 Payment, Refund, Return, and Adjustment Separation | Must be assessed for split before drafting | Independently changeable monetary and commercial reversal decisions must not be combined silently |
| DADR-15 Tax Application Ownership | Potential new Commerce ADR subject | Taxes-owned Commerce Tax Configuration and Tax Application boundary |
| DADR-16 Commerce Document Ownership | Potential new Commerce ADR subject | Invoice, Receipt, Commerce Document, numbering, and template boundary |
| DADR-17 Commerce Read Models and Reporting | Potential new Commerce ADR subject | Non-canonical Commerce report and projection boundary |
| DADR-18 Commerce Access Enforcement Boundary | Existing constraints plus deferred Commerce-specific subject | ADR-034 and Core Permission Model apply; mutable Commerce policy remains DD-34 |
| DADR-19 Optional Module and Marketplace Boundary | Must be narrowed before drafting | Marketplace aspects are governed by ADR-027 and ADR-028; any Commerce Module decision must not duplicate them |
| DADR-20 Commerce AI Advisory Boundary | Existing Accepted ADR application; no duplicate ADR | ADR-014, ADR-017, ADR-029, and ADR-030 |
| DADR-21 Commerce Cross-OS Integration Boundary | Existing Accepted ADR application; no duplicate ADR | ADR-025 |
| DADR-22 Commerce Contract, Event, and Reliability Rules | Not a valid single ADR candidate | ADR-035, ADR-036, and ADR-038 govern shared rules; independently changeable Commerce-specific decisions require separate future assessment |

This normalization preserves the Proposal's Draft ADR trace labels for review history. It does not reserve ADR numbers, create files, accept decisions, or decide which potential subject must ultimately become an ADR.

## 10. Alignment 6 — Explicit Aggregate Owner Attribution

### 10.1 Finding addressed

This alignment resolves Review finding **m-01**.

### 10.2 Aggregate owner table

| Aggregate candidate | Exactly one proposed owner |
|---|---|
| Commerce Setup | Setup and Configuration |
| Commerce Readiness Assessment | Setup and Configuration |
| Product | Product Catalog |
| Category | Product Catalog |
| Commerce Unit | Product Catalog |
| Commerce Pricing | Pricing |
| Inventory Position | Inventory |
| Inventory Movement | Inventory |
| Inventory Transfer | Transfers |
| Commerce Order | Orders |
| POS Transaction | POS |
| Transactional Customer | Transactional Customers |
| Commerce Payment | Payments and Refunds |
| Commerce Refund | Payments and Refunds |
| Tax Application | Taxes |
| Commerce Document | Invoices and Documents |
| Commerce Return | Returns and Adjustments |
| Commercial Adjustment | Returns and Adjustments |

The aggregate count remains 18. This table makes explicit the ownership already established by the matching canonical write models. Aggregate subdivision remains DD-01.

## 11. Alignment 7 — Product Identifier Responsibility

### 11.1 Finding addressed

This alignment resolves Review finding **m-02**.

### 11.2 Ownership

Product Catalog owns Product Identifier meaning and lifecycle within Commerce.

A Product Identifier:

- identifies or references a Commerce Product or Variant for authorized Commerce operations;
- is part of the CWM-03 Product logical write boundary;
- is governed through the Product aggregate candidate;
- may be consumed by Inventory, Orders, POS, Pricing, Documents, Reporting, and authorized extensions; and
- is not a Core OS Product identifier, Marketplace Asset identifier, shared Capability identifier, or another OS's canonical identifier.

### 11.3 Deferral preservation

The following remain deferred under DD-02 and related detailed modeling:

- identifier types;
- uniqueness scope;
- assignment and reuse;
- merge and archive behavior;
- historic reference behavior; and
- integration mapping.

This Patch assigns responsibility only. It defines no field, barcode rule, SKU format, or schema.

## 12. Alignment 8 — Event Taxonomy Alignment

### 12.1 Finding addressed

This alignment resolves Review finding **m-03**.

### 12.2 Taxonomy rules

- A **Commerce Domain Event** states a completed canonical transition owned by the domain that changed the fact.
- A **Commerce Integration Event** is a minimized, versioned external representation derived from a committed owner fact. The source fact owner governs its meaning.
- A **Commerce Notification Input** is an owner-directed request to Core Notification Service; it is not a Domain Event or Notification record.
- A **Commerce Audit Input** is owner-supplied evidence to Core Audit Service; it is not the Audit Record.
- **Commerce Intelligence Feedback** is an authorized outcome representation for a future governed intelligence cycle; it cannot mutate a Decision or Recommendation.
- A **projection or observability signal** describes projection health or freshness and is not a Domain Event.

### 12.3 Corrected event responsibility map

| Event responsibility family | Logical classification | Exactly one source owner |
|---|---|---|
| Commerce Setup changed or completed | Commerce Domain Event | Setup and Configuration |
| Commerce readiness contribution changed | Commerce Domain Event | Setup and Configuration |
| Product, Variant, Category, Unit, or Product Identifier changed | Commerce Domain Event | Product Catalog |
| Price, Discount, or Promotion changed | Commerce Domain Event | Pricing |
| Stock changed | Commerce Domain Event | Inventory |
| Inventory Movement recorded | Commerce Domain Event | Inventory |
| Transfer changed | Commerce Domain Event | Transfers |
| Order changed | Commerce Domain Event | Orders |
| POS Transaction changed | Commerce Domain Event | POS |
| Transactional Customer changed | Commerce Domain Event | Transactional Customers |
| Payment recorded or failed | Commerce Domain Event where a canonical Payment transition is recorded | Payments and Refunds |
| Refund recorded or failed | Commerce Domain Event where a canonical Refund transition is recorded | Payments and Refunds |
| Tax Configuration or Tax Application changed | Commerce Domain Event | Taxes |
| Commerce Document issued, replaced, or voided | Commerce Domain Event | Invoices and Documents |
| Return or Exchange changed | Commerce Domain Event | Returns and Adjustments |
| Commercial Adjustment changed | Commerce Domain Event | Returns and Adjustments |
| Commerce Operational Report projection changed | Projection or observability signal, not a Domain Event | Reporting |

### 12.4 External derivation

An external Integration Event, Notification Input, Audit Input, or Intelligence Feedback item must derive from an authorized completed source fact and retain that source owner's identity. Creating the external representation never transfers ownership to Reporting, Extensions, Product Hub, Business Brain, AI Coordinator, or the receiving Core service.

DD-30 remains deferred for exact names, schemas, publication criteria, versions, ordering, retention, and replay.

## 13. Alignment 9 — Logical Contract Governance Ownership

### 13.1 Finding addressed

This alignment resolves Review finding **m-04**.

### 13.2 Contract governance rule

Every logical Contract has one governance owner accountable for meaning, invariant preservation, compatibility, versioning, deprecation, and error semantics.

- A context or fact Contract is governed by the canonical provider of that context or fact.
- A command, operation, or effect-request Contract is governed by the canonical target owner that validates and may change state.
- A result Contract is governed by the owner that produced the result.
- A generic table row representing a family of source-specific projection Contracts does not create shared governance; each source owner governs its own published fact Contract.

Provider, caller, and governance owner are distinct roles where necessary.

### 13.3 Internal Contract governance

| Logical Contract | Governance owner |
|---|---|
| Catalog Selection | Product Catalog |
| Pricing Determination | Pricing |
| Inventory Effect Request | Inventory |
| Inventory Effect Result | Inventory |
| Order Operation | Orders |
| Monetary Operation | Payments and Refunds |
| Tax Determination | Taxes |
| Document Operation | Invoices and Documents |
| Return or Adjustment Operation | Returns and Adjustments |
| Transfer Operation | Transfers |
| Reporting Projection Input | each canonical source owner for its source-specific Contract; Reporting owns only ingestion requirements and its projection |

### 13.4 External and shared Contract governance

| Contract family | Governance owner |
|---|---|
| Authenticated Actor Context | Core Identity and Access |
| Workspace Context | Core Workspace Management |
| Selected Business Context | Core Business Registry |
| Organization Scope Context | Core Organization Registry |
| Commerce Eligibility Context | applicable Core commercial lifecycle owner for each source fact |
| Commerce Setup Handoff and Commerce Launch Handoff | Product Hub for handoff semantics; receiving Commerce boundary owns target validation |
| Audit Submission | Core Audit Service for intake Contract; Commerce source owner owns submitted source fact |
| Notification Intent | Core Notification Service for intake Contract; Commerce source owner owns triggering fact |
| Search Projection Input | Core Search for intake requirements; Commerce source owner owns source fact Contract |
| Analytics Projection Input | Core Analytics for intake requirements; Commerce source owner owns source fact Contract |
| Completed Decision | Business Brain |
| Recommendation | Recommendation Engine |
| Implementation Option | Core intelligence mapping owner |
| Configuration Proposal | Configuration Engine |
| Configuration Application Result | applying Commerce target owner |
| Commerce Outcome Feedback | originating Commerce fact owner |
| Marketplace Eligibility and Asset Context | Marketplace |
| Commerce Extension Invocation | applicable canonical Commerce target owner for target operation semantics |
| AI Advisory Artifact | AI Coordinator |
| AI Action Application Result | applying Commerce target owner |

Where a row names “applicable owner,” it represents a family of separately governed source Contracts, not shared ownership of one Contract.

DD-29 remains deferred for fields, error categories, compatibility periods, and idempotency semantics.

## 14. Alignment 10 — Capability Accountability and Capability Map Traceability

### 14.1 Findings addressed

This alignment resolves Review findings **M-01** and **m-05**.

### 14.2 One accountable logical home per capability

The capability catalog remains unchanged. Accountability is clarified as follows:

| Capability | One accountable logical home | Ownership guardrail |
|---|---|---|
| PC-01 Commerce Setup and Readiness | PD-01 Setup and Configuration | Core lifecycle truth remains external |
| PC-02 Commerce Preset and Module Configuration | PD-01 Setup and Configuration | Target-domain writes follow Section 6 of this Patch |
| PC-03 Product and Category Management | PD-02 Product Catalog | Includes Product Identifier responsibility |
| PC-04 Commerce Pricing | PD-03 Pricing | Core Plan pricing remains external |
| PC-05 Inventory Management | PD-04 Inventory | Branch identity remains Core-owned |
| PC-06 Branch Commerce Operations | PD-15 Operational Scope | Owns context interpretation only; relevant canonical domains own operational facts |
| PC-07 Order Management | PD-05 Orders | Channels cannot own parallel Order truth |
| PC-08 Point of Sale | PD-06 Point of Sale | Owns POS Transaction only |
| PC-09 Transactional Customer Management | PD-07 Transactional Customers | CRM workflow remains external |
| PC-10 Payment and Refund Recording | PD-08 Payments and Refunds | Provider settlement and Return remain separate |
| PC-11 Tax Management | PD-09 Taxes | Shared Rules and authority policy remain external |
| PC-12 Invoice, Receipt, and Document Management | PD-10 Invoices and Documents | Source commerce facts retain their owners |
| PC-13 Return and Commercial Adjustment Management | PD-11 Returns and Adjustments | Refund and Inventory effects retain their owners |
| PC-14 Inventory Transfer | PD-12 Transfers | Inventory owns Stock effects |
| PC-15 Commerce Reporting and Dashboards | PD-13 Reporting | Reports remain non-canonical projections |
| PC-16 Commerce Staff and Permission Enforcement | PD-14 Access | Core owns identity and canonical grants |
| PC-17 Commerce Notification, Audit, Search, and Analytics Participation | PD-13 Reporting | Reporting owns participation coordination only; originating domains own source facts and Core services own external records |
| PC-18 Optional Commerce Extension and Integration | PD-16 Extensions | No extension acquires target-domain ownership |

PC-06 and PC-17 remain the same proposed capabilities. This table makes their accountable home explicit without changing their collaboration or external ownership boundaries.

### 14.3 Capability Map open-question traceability

| Capability Map question | Proposal v0.1.1 outcome |
|---:|---|
| 1 | Decided by Proposal Section 8: all 18 candidates are proposed capabilities, pending architecture approval. |
| 2 | Decided by Proposal Sections 8–9 and Patch Section 14.2: cross-cutting participation has one accountable logical home without transferring source ownership. |
| 3 | Decided by PC-01: Commerce Setup and Readiness remains one capability with two distinct write responsibilities. |
| 4 | Decided by PC-06 and PD-15: Branch Commerce Operations is a capability whose accountable home is Operational Scope and whose canonical facts remain with target domains. |
| 5 | Decided by PC-16 and PD-14: Commerce Staff and Permission Enforcement remains a capability applied as a constraint to protected capabilities. |
| 6 | Decided by PC-17 and Patch Section 14.2: shared-service participation remains one capability coordinated by Reporting, with source and external ownership preserved. |
| 7 | Decided by PC-08 and PD-06: POS is a capability and workflow over Commerce Core that owns only POS Transaction. |
| 8 | Decided by PC-13, PC-14, PD-11, and PD-12: Return and Transfer remain separate. |
| 9 | Decided by Patch Section 14.2: every capability maps to one accountable domain. |
| 10 | Decided by Proposal collaboration rules and Patch Section 14.2: capability collaboration may cross domains without transferring accountability or canonical ownership. |
| 11 | Decided by Proposal Section 11: Commerce Core is the mandatory coherent owner set defined there. |
| 12 | Partly decided by Section 12; exact Module eligibility and transition remains DD-13. |
| 13 | Boundary decided by Section 33; exact Marketplace extension permission and compatibility remains DD-32. |
| 14 | Boundary decided by Section 35; integration-specific detail remains DD-33. |
| 15 | Decided by Sections 14 and 36: the initiating lifecycle coordinates requests, while every effect is performed by its canonical owner. Detailed consistency remains DD-01 and DD-37. |
| 16 | Decided at ownership level by Sections 18, 23, and 29; exact correction and reversal semantics remain DD-19 and DD-25 through DD-26. |
| 17 | Deferred to DD-10 and DD-11 for exact mandatory setup inputs and readiness criteria. |
| 18 | Deferred across DD-14 and the affected domain-semantic decisions for exact mandatory operational inputs. |
| 19 | Principle decided by versioning and reproducibility rules; exact retained fields and Contract versions remain DD-29 and DD-30. |
| 20 | Boundary decided by Section 17.2; exact Product Hub projection Contract remains DD-29. |
| 21 | Boundary decided by Commerce Outcome Feedback in Section 36; exact feedback Contract remains DD-33 and frozen Business Brain policy. |
| 22 | Decided by Proposal Section 13 and Patch Sections 6–8 and 11. |
| 23 | Deferred to DD-31 and DD-34 for exact direct-choice and approval policy. |
| 24 | Deferred to DD-31 and the frozen Core decision governing automatic versus reviewed Configuration Proposal application. |
| 25 | Decided by Proposal Section 11: the listed concerns are part of Commerce Core. |
| 26 | Decided by Proposal Section 11: Returns, Adjustments, and Transfers are within Commerce Core; detailed semantics remain DD-25 through DD-27. |
| 27 | Boundary decided by Sections 12 and 33: extension uses target Contracts and cannot create parallel truth; exact extension detail remains DD-32. |
| 28 | Reliability boundary decided by Sections 40–41; extension-specific removal and recovery remains DD-32 and DD-37. |
| 29 | Boundary decided by Sections 12 and 19 as corrected by Patch Section 6; exact Preset behavior remains DD-12 and DD-13. |
| 30 | Deferred to DD-12 and DD-32. |
| 31 | Candidate extension boundary retained in Section 12; final detailed classification remains DD-32 and DD-33. |
| 32 | External ownership boundary decided by Sections 12 and 35; integration-specific allocation remains DD-33. |
| 33 | Deferred to DD-31 and the frozen Recommendation/Configuration approval policy. |
| 34 | Deferred to DD-34 and DD-35. |
| 35 | Ownership decided by PC-01 and CWM-02; exact readiness criteria remain DD-10. |
| 36 | Principle decided by optional-dependency isolation in Sections 40–41; exact health and degraded-mode targets remain DD-36 and DD-37. |
| 37 | Principle decided by explicit uncertainty and truthful failure rules; exact Contract and recovery representation remains DD-29 and DD-37. |
| 38 | Mandatory context corrected by Patch Section 5; fact-by-fact scoping remains DD-14. |
| 39 | Decided by PC-17, Sections 37–39, and Patch Sections 12–14: originating fact owners supply evidence through governed participation. |
| 40 | Addressed by Patch Section 9: existing Accepted ADR applications are separated from potential new Commerce ADR subjects and continued deferrals. |

This table traces every Capability Map question without silently answering a decision that the Proposal deferred.

## 15. Deferred Decisions Preserved

DD-01 through DD-40 remain deferred exactly as a governed decision register. This Patch narrows no policy choice beyond removal of reviewed ownership ambiguity.

In particular, this Patch does not decide:

- physical aggregate subdivision or transaction boundaries;
- detailed lifecycle state vocabularies;
- Product Identifier formats or uniqueness rules;
- pricing, promotion, inventory, Order, POS, payment, refund, tax, document, Return, Exchange, Transfer, or reporting policy details;
- configurable Commerce role templates or delegation;
- Marketplace extension compatibility or removal behavior;
- Contract fields, event payloads, ordering, replay, or delivery;
- Security classifications, SLOs, recovery targets, or runbooks; or
- any persistence, API, messaging, runtime, infrastructure, framework, cloud, or vendor decision.

## 16. Findings Resolution Matrix

| Review finding | Patch alignment | Status after Patch |
|---|---|---|
| B-01 Applicable Business context absent | Alignment 1 | Resolved for re-review |
| B-02 Setup claims competing target ownership | Alignment 2 | Resolved for re-review |
| M-01 Two capabilities lack one accountable home | Alignment 10 | Resolved for re-review |
| M-02 Reports are canonical fact and projection | Alignment 3 | Resolved for re-review |
| M-03 Commerce Access state boundary incomplete | Alignment 4 | Resolved for re-review |
| M-04 Draft ADR candidates duplicate Accepted authority | Alignment 5 | Resolved for re-review |
| m-01 Aggregate owners implicit | Alignment 6 | Resolved for re-review |
| m-02 Product Identifier implicit | Alignment 7 | Resolved for re-review |
| m-03 Event taxonomy not mapped | Alignment 8 | Resolved for re-review |
| m-04 Contract governance owner absent | Alignment 9 | Resolved for re-review |
| m-05 Capability Map question traceability absent | Alignment 10 | Resolved for re-review |
| e-01 Heading capitalization | Outside authorized substantive Patch scope; no architecture impact | Remains editorial and non-blocking |

## 17. Remaining Findings

No Blocking, Major, or Minor Architecture Review finding remains unaddressed by Proposal baseline v0.1.1.

One non-blocking editorial observation remains:

- **e-01:** Section 7.2 heading capitalization in Proposal v0.1.

The Proposal was not modified, and this Patch was not authorized to edit that heading. It has no effect on architecture, ownership, capability, security, compatibility, or readiness for re-review.

## 18. Patch Validation Criteria

Independent re-review must validate that Proposal v0.1 and this Patch, read together:

1. preserve Business separately from Business Unit in every applicable context;
2. leave every setup-produced value with exactly one target owner;
3. keep Commerce Operational Reports non-canonical;
4. preserve Core grant ownership and Commerce Access enforcement semantics without hidden mutable state;
5. treat existing ADR applications as references rather than duplicate candidates;
6. assign each aggregate candidate one explicit owner;
7. assign Product Identifier to Product Catalog without deciding its detailed model;
8. classify Domain Events, Integration Events, shared-service inputs, and projection signals consistently;
9. assign every logical Contract one governance owner or a source-specific owner rule;
10. map PC-06 and PC-17 to one accountable domain each;
11. trace all 40 Capability Map questions to a decision, risk, or deferral;
12. leave DD-01 through DD-40 unresolved where intended;
13. introduce no new architecture, capability, technology, API, database, event payload, or deployment decision; and
14. leave every frozen predecessor authority unchanged.

## 19. Recommendation

Proposal v0.1 and this Freeze Alignment Patch v0.1.1 should be treated together as the authoritative Proposal baseline v0.1.1 for the next quality gate.

# READY FOR RE-REVIEW

This recommendation does not authorize Documentation Waves or architecture freeze.

## References

- `docs/00-governance/`
- `docs/01-genesis/`
- `docs/02-core-platform/`
- `docs/03-business-brain/`
- `docs/04-commerce-os/00-COMMERCE-OS-DISCOVERY.md`
- `docs/04-commerce-os/01-COMMERCE-OS-CAPABILITY-MAP.md`
- `docs/04-commerce-os/02-COMMERCE-OS-PROPOSAL.md`
- `docs/04-commerce-os/03-COMMERCE-OS-ARCHITECTURE-REVIEW.md`
- `docs/99-architecture-freeze/`
