# Commerce OS Architecture Proposal v0.1

**Status:** Proposed — Pending Independent Architecture Review
**Milestone:** 3 — Commerce OS
**Proposal authority:** Approved Commerce OS Discovery v0.1 and Commerce OS Capability Map
**Frozen foundations:** Genesis v1.1, Governance, Core Platform Architecture v1.0 with Documentation Baseline v1.0.1, and Business Brain Architecture and Documentation Baseline v1.0

This document proposes the first complete architecture for Commerce OS. It promotes approved discovery candidates into a coherent proposal without making them approved architecture. Approval requires an independent Architecture Review under the governed milestone lifecycle.

## 1. Vision

Commerce OS is an independently usable Operating System for businesses that sell products or services, manage commercial inventory, conduct transactions, receive payments, apply taxes, issue commercial documents, and understand operational performance.

It provides one coherent Commerce truth across setup, catalog, pricing, inventory, orders, point of sale, transactional customers, payments, tax, documents, returns, transfers, and reporting. Presets, optional modules, Marketplace Assets, AI, and cross-OS integrations may extend this truth but may never replace or duplicate it.

Commerce OS is built on the frozen Core Platform and may consume Business Brain outputs. It does not absorb platform identity, organization, subscription, Marketplace, intelligence, knowledge, recommendation, configuration-proposal, or AI coordination ownership.

## 2. Mission

Commerce OS enables an authorized user, in an explicit Workspace, Business Unit, and Branch context, to configure a Commerce operation and perform a complete core commercial journey without requiring another Operating System:

```text
Core eligibility and Commerce setup handoff
  → Commerce setup and readiness contribution
  → Catalog and pricing readiness
  → Stock readiness where applicable
  → Order creation
  → POS or other Commerce-owned order channel
  → Tax application
  → Payment recording
  → Invoice, receipt, or Commerce document issuance
  → Inventory and commercial effects
  → Return, exchange, refund, or adjustment where required
  → Operational projections and reports
```

The mission is to preserve deterministic, auditable, scope-safe Commerce behavior while allowing optional extension without parallel Commerce truth.

## 3. Scope

This Proposal covers the logical architecture of Commerce OS, including:

- Commerce-owned setup, configuration, and readiness contribution;
- Commerce Preset and Commerce Module configuration;
- sellable Product, Category, Variant, Unit, Price, Discount, and Promotion facts;
- Stock, Inventory Movement, and Inventory Transfer responsibilities;
- Order and POS Transaction responsibilities;
- Transactional Customer responsibilities;
- Payment and Refund recording;
- Tax Application;
- Invoice, Receipt, and other Commerce Document responsibilities;
- Return, Exchange, and Commercial Adjustment responsibilities;
- Commerce operational read models, dashboards, and reports;
- Commerce staff-role and permission enforcement within Core-authorized scope;
- optional Commerce modules and extensions that remain subordinate to Commerce Core;
- logical contracts and logical event responsibilities;
- security, observability, operational, and reliability responsibilities;
- optional integration with Business Brain, Marketplace, AI Coordinator, and other Operating Systems through governed boundaries.

The Proposal defines logical ownership and collaboration. It does not define physical implementation.

## 4. Non-Scope

The following are outside this Proposal:

- Core User identity, authentication, sessions, Workspace membership, and canonical authorization context;
- canonical Workspace, Business Unit, Department, or Branch identity and ancestry;
- Product Hub composition, subscription display, launch routing, or cross-product navigation;
- Core Product and Plan catalog, Entitlement, OS Subscription, Installation, Activation, billing, or commercial lifecycle ownership;
- Business DNA, Knowledge, Rule, Capability, Decision, Recommendation, Implementation Option, or Configuration Proposal ownership;
- Recommendation Engine, Configuration Engine, Business Brain, or AI Coordinator internals;
- Marketplace Asset publication, review, discovery, acquisition, entitlement, activation, or installation ownership;
- Audit Record, Notification, Search Index, or platform Analytics projection ownership;
- leads, opportunities, campaigns, and relationship workflows owned by CRM OS;
- employee profiles, attendance, payroll, leave, and contracts owned by HR OS;
- patients, prescriptions, medical records, and clinical workflows owned by Healthcare OS;
- full repair-ticket and repair-center workflows owned by Maintenance OS;
- database schemas, physical tables, API endpoints, event payload schemas, transport or messaging technology;
- deployment topology, frameworks, cloud providers, vendor products, or implementation tasks;
- final commercial policy details that remain explicitly deferred in Section 43.

## 5. Responsibilities

Commerce OS is responsible for:

1. Owning the canonical Commerce operational facts listed in Sections 13–15.
2. Owning each Commerce lifecycle listed in Section 18, without taking ownership of Core lifecycle states.
3. Validating and applying Commerce configuration within Commerce-owned boundaries.
4. Maintaining scope-safe Commerce operations against canonical Core organization identities.
5. Ensuring that POS and optional order channels use the canonical Order, Payment, Tax Application, Stock, and Commerce Document models.
6. Preserving separation between commercial returns and monetary refunds.
7. Producing Commerce-owned domain events and logical outputs without delegating fact ownership.
8. Producing Commerce operational read models, dashboards, and reports from canonical Commerce writes.
9. Enforcing Commerce permissions after Core authorization and scope establishment.
10. Integrating optionally through governed contracts while remaining independently usable.
11. Applying approved Configuration Proposals idempotently after Commerce validation and authorization.
12. Preserving auditability, explainability, traceability, and reproducibility for consequential Commerce operations.

## 6. Non-Responsibilities

Commerce OS must never:

- create a second Core User, Workspace, Business Unit, Department, or Branch identity;
- own OS Subscription, Entitlement, Installation, Product Hub, billing, or platform Activation truth;
- own the final cross-owner Operating System Ready lifecycle outcome;
- own Business DNA, Knowledge, Rules, Capabilities, Decisions, Recommendations, Implementation Options, or Configuration Proposals;
- own AI-generated explanations, narratives, suggestions, Action Proposals, or other AI artifacts;
- own Marketplace Assets or Marketplace lifecycle state;
- require another Operating System to complete the Commerce core workflow;
- read or write another Operating System's private store;
- allow an optional module, Marketplace Asset, preset, AI output, or integration to create parallel Product, Order, Stock, Payment, Tax Application, Document, Return, or Transfer truth;
- turn a business activity or Commerce Preset into a separate Operating System or hardcoded application boundary;
- place Commerce business logic in Core Platform, Product Hub, shared packages, or user-interface composition;
- reinterpret a Recommendation or Configuration Proposal as an authorized write;
- treat a read model, projection, report, search document, or dashboard as canonical Commerce ownership.

## 7. Architectural Principles

The Proposal applies the frozen principles as follows.

### 7.1 Domain and ownership principles

- **Domain First:** Commerce behavior is organized by explicit Commerce domains, not screens or technologies.
- **Canonical Ownership:** Every Commerce fact, write model, and lifecycle has exactly one logical owner.
- **Single Source of Truth:** A module or integration consumes and extends canonical Commerce facts; it does not fork them.
- **Projection Is Never Ownership:** Read models and external projections do not acquire write authority.
- **Read Models Are Disposable:** A read model can be rebuilt from canonical facts and owned events.
- **Business Before Software:** Commerce behavior expresses commercial meaning rather than implementation structure.

### 7.2 context and isolation principles

- **Explicit Context:** Every operation carries Workspace, Business Unit, Branch where applicable, actor, and Commerce OS context.
- **Tenant Isolation by Default:** No operation or projection crosses a Workspace boundary.
- **Canonical Organization References:** Commerce references Core-owned organization identities and does not duplicate their hierarchy.
- **Least Privilege:** Authorization is evaluated for the smallest applicable scope and action.

### 7.3 integration principles

- **Contract First:** Domain collaboration and external integration occur through explicit, versioned logical contracts.
- **API First:** Future interfaces must expose governed contracts rather than internal storage.
- **Event-Driven Where Appropriate:** Events communicate completed facts; they do not replace commands, authorization, or ownership.
- **Optional Cross-OS Integration:** Integration enhances Commerce but never unlocks its basic workflow.
- **Independent Operating Systems:** Commerce remains operational without another OS.
- **Backward Compatibility:** Contract evolution preserves supported consumers or follows governed version change.

### 7.4 configuration and extension principles

- **Configuration over Code:** Presets and module state configure allowed behavior without branching the architecture.
- **Immutable Published Assets:** Marketplace Asset versions are consumed as published and remain Marketplace-owned.
- **Marketplace Assets Are Shared, Activation Is Scoped:** Asset availability does not grant Commerce write authority.
- **Core Before Extension:** Optional behavior must use Commerce Core owners and contracts.

### 7.5 intelligence and security principles

- **AI Assists, Never Owns Business Facts:** AI output remains advisory until separately validated, authorized, and applied by Commerce.
- **Human Approval for Consequential Decisions:** Where frozen policy or authorization requires approval, no AI or integration may bypass it.
- **Explainability by Design:** Consequential applications retain source, reason, actor, and outcome traceability.
- **Security by Default:** Deny by default, validate scope, minimize data, and audit critical actions.
- **Auditability:** Critical Commerce changes produce evidence for the Core-owned Audit Service.

### 7.6 evolution principles

- **Version Everything:** Contracts, events, configuration inputs, and externally consumed projections are versioned.
- **No Circular Dependencies:** Commerce domains collaborate in directed flows through contracts.
- **No Hidden Context:** Context is never inferred from user-interface state alone.
- **Modular Monolith Compatibility:** Logical boundaries remain enforceable in the frozen deployment approach and extractable only through future governed decisions.

## 8. Proposed Capability Catalog

The Proposal promotes the 18 approved candidate capabilities into the following proposed capability catalog. Their approval remains subject to Architecture Review.

| ID | Proposed capability | Purpose | Primary logical owner | Never owns |
|---|---|---|---|---|
| PC-01 | Commerce Setup and Readiness | Configure Commerce-owned operational prerequisites and publish the Commerce readiness contribution | Setup and Configuration domain | Core subscription, installation, activation, or final OS Ready outcome |
| PC-02 | Commerce Preset and Module Configuration | Apply Commerce presets and manage Commerce module state within eligibility | Setup and Configuration domain | Business activity, Entitlement, Plan, or Marketplace Asset lifecycle |
| PC-03 | Product and Category Management | Manage sellable Commerce Products, Variants, Categories, and Units | Product Catalog domain | Core OS Products or Marketplace Assets |
| PC-04 | Commerce Pricing | Manage Prices, Discounts, and Promotions and determine applicable Commerce pricing | Pricing domain | Plan pricing, billing, or Business Brain Recommendations |
| PC-05 | Inventory Management | Maintain Stock and record Inventory Movements | Inventory domain | Core Branch identity or another OS's stock |
| PC-06 | Branch Commerce Operations | Apply Commerce behavior in canonical Branch context | Operational Scope boundary with relevant domain owner | Branch identity or hierarchy |
| PC-07 | Order Management | Own the canonical Commerce Order lifecycle | Orders domain | POS-specific interaction state, Payment, Tax Application, or Invoice truth |
| PC-08 | Point of Sale | Conduct branch-scoped point-of-sale workflows and own POS Transaction facts | POS domain | canonical Order, Payment, Stock, Tax, or Document truth |
| PC-09 | Transactional Customer Management | Maintain Commerce customer identity and transaction-facing history | Transactional Customers domain | CRM lead, campaign, or relationship workflow |
| PC-10 | Payment and Refund Recording | Record Commerce payment and monetary refund facts | Payments and Refunds domain | provider settlement truth or Return decision |
| PC-11 | Tax Management | Determine and record Commerce Tax Applications | Taxes domain | external tax authority rules or Core configuration truth |
| PC-12 | Invoice, Receipt, and Document Management | Issue and manage Commerce Documents using Commerce facts and templates | Invoices and Documents domain | payments, orders, external legal registries, or another OS's documents |
| PC-13 | Return and Commercial Adjustment Management | Own Returns, Exchanges, and Commercial Adjustments | Returns and Adjustments domain | monetary Refund or original Order truth |
| PC-14 | Inventory Transfer | Own stock movement intent and lifecycle between canonical Branch scopes | Transfers domain | Branch identity or Stock truth |
| PC-15 | Commerce Reporting and Dashboards | Project Commerce facts into operational views, dashboards, and reports | Reporting domain | canonical source facts or Core Analytics ownership |
| PC-16 | Commerce Staff and Permission Enforcement | Enforce Commerce actions and roles within Core-authorized scope | Access domain | identity, Workspace membership, or Core permission grants |
| PC-17 | Commerce Notification, Audit, Search, and Analytics Participation | Supply governed Commerce facts to Core shared services | Originating Commerce domain; external projection owner remains Core | Audit Records, Notifications, Search Index, or Analytics projections |
| PC-18 | Optional Commerce Extension and Integration | Extend Commerce through optional modules, Marketplace Assets, and cross-OS contracts | Extensions domain for Commerce-owned extension state; canonical fact owners remain unchanged | parallel Commerce truth or external domain truth |

## 9. Proposed Domain Boundaries

Sixteen logical domain boundaries are proposed.

| ID | Proposed domain | Owns | Consumes | Boundary invariant |
|---|---|---|---|---|
| PD-01 | Setup and Configuration | Commerce Setup, module configuration, Commerce readiness contribution | Core lifecycle context, preset inputs, Configuration Proposals | Does not own Core lifecycle states |
| PD-02 | Product Catalog | Product, Variant, Category, Unit | organization scope, approved configuration inputs | Commerce Product is not a Core OS Product or Marketplace Asset |
| PD-03 | Pricing | Price, Discount, Promotion | Product references, scope, applicable policy inputs | Does not own Order totals after Order records them |
| PD-04 | Inventory | Stock and Inventory Movement | Product and Branch references, completed commercial effects | Movement history and current Stock remain internally consistent |
| PD-05 | Orders | Order | catalog, pricing, tax, customer, channel input | Every channel converges on the canonical Order |
| PD-06 | Point of Sale | POS Transaction | authorized branch context and Commerce Core contracts | POS never creates parallel commercial facts |
| PD-07 | Transactional Customers | Transactional Customer | scoped customer input and transaction references | Does not become CRM ownership |
| PD-08 | Payments and Refunds | Payment and Refund | payable/refundable references and provider outcomes | Refund is not Return |
| PD-09 | Taxes | Tax Application | taxable facts and applicable tax configuration | Tax Application is the recorded Commerce result |
| PD-10 | Invoices and Documents | Invoice, Receipt, Commerce Document | completed commercial facts and templates | Documents do not own their source facts |
| PD-11 | Returns and Adjustments | Return, Exchange, Commercial Adjustment | original transaction facts and policy inputs | Financial and inventory effects are requested from their owners |
| PD-12 | Transfers | Transfer | Stock references and source/destination Branch context | Transfer does not mutate Stock directly outside Inventory contract |
| PD-13 | Reporting | Commerce Operational Reports and read-model lifecycle | owned domain events and authorized projections | Reports never become write sources |
| PD-14 | Access | Commerce role mapping and enforcement policy within Commerce | Core actor, grant, scope, entitlement, and subscription context | Does not issue identity or Core authorization grants |
| PD-15 | Operational Scope | Commerce interpretation of Workspace, Business Unit, and Branch context | Core-owned organization references | A cross-cutting boundary, not a duplicate organization registry |
| PD-16 | Extensions | Commerce-owned extension configuration and orchestration | module, Marketplace, integration, and canonical Commerce contracts | Extensions cannot bypass canonical owners |

PD-15 is a logical context boundary applied by all Commerce domains. It does not become a second owner of any fact listed in Section 13.

## 10. Internal Logical Architecture

Commerce OS is proposed as five collaborating logical layers. These are logical responsibilities, not deployable services or physical tiers.

```text
Commerce Experience and Navigation
  ├── Setup experience
  ├── Operational experiences
  └── Module-driven navigation
          │
          ▼
Context, Access, and Readiness Boundary
  ├── explicit Workspace / Business Unit / Branch context
  ├── Core authorization and Commerce permission enforcement
  └── Commerce setup and readiness contribution
          │
          ▼
Commerce Core Domains
  ├── Product Catalog ── Pricing
  ├── Inventory ── Transfers
  ├── Orders ── POS
  ├── Transactional Customers
  ├── Payments and Refunds ── Taxes
  ├── Invoices and Documents
  └── Returns and Adjustments
          │
          ▼
Projection and Participation Boundary
  ├── Commerce read models, dashboards, and reports
  └── Audit, notification, search, analytics, and Product Hub projections
          │
          ▼
Optional Extension and Integration Boundary
  ├── Commerce modules
  ├── Marketplace Asset use
  ├── Business Brain and AI advisory inputs
  └── optional cross-OS integration
```

### 10.1 Dependency direction

- Experience depends on logical contracts, not domain storage.
- Context and Access guard every command before it reaches a canonical owner.
- POS, optional channels, and extensions depend on Commerce Core contracts.
- Reporting and external projections depend on completed facts and owned events.
- Canonical owners do not depend on read models, Product Hub, Marketplace presentation, or AI outputs.
- Cross-domain flows may request work from another owner but may not write that owner's model.

### 10.2 Logical command progression

```text
Authenticated actor and explicit scope
  → Core authorization context
  → Commerce readiness and module eligibility check
  → Commerce permission enforcement
  → owning domain validation
  → canonical write by exactly one owner
  → owned domain event
  → internal and external projections
```

## 11. Commerce Core

Commerce Core is the mandatory, invariant set of Commerce capabilities used by every Commerce configuration. It is not a single database, service, or aggregate.

Commerce Core contains the canonical ownership boundaries for:

- Commerce Setup and readiness contribution;
- Product Catalog;
- Pricing;
- Inventory;
- Orders;
- POS interaction with canonical Orders;
- Transactional Customers;
- Payments and Refunds;
- Taxes;
- Invoices and Commerce Documents;
- Returns and Commercial Adjustments;
- Transfers;
- Commerce operational reporting;
- Commerce access enforcement and operational context.

Commerce Core invariants are:

1. Every order channel uses the Orders domain.
2. Every stock effect is recorded by the Inventory domain.
3. Every monetary collection or reversal is recorded by Payments and Refunds.
4. Every Commerce tax result is recorded as a Tax Application by Taxes.
5. Every Invoice, Receipt, or other Commerce Document is owned by Invoices and Documents.
6. Every Return, Exchange, and Commercial Adjustment is owned by Returns and Adjustments.
7. Every Branch reference resolves to the Core Organization Registry.
8. No preset, module, Marketplace Asset, integration, read model, or AI artifact can become an alternative Commerce Core owner.

## 12. Optional Modules and Extensions

Optional modules may add experiences, validation, orchestration, and fields that are allowed by their governed contract. They must extend Commerce Core rather than replace it.

Candidate optional extension areas inherited from the approved baselines include Online Store, Delivery, Kitchen, Loyalty, Supplier Purchases, advanced Pharmacy behavior, and simple Commerce Repairs. Their inclusion here records the extension boundary only; it does not approve their detailed architecture or implementation.

### 12.1 Extension rules

- Online Store, Delivery, and Kitchen use the canonical Order lifecycle.
- Supplier-related stock effects use the canonical Inventory Movement model.
- Loyalty-driven benefits use the canonical Discount or Promotion responsibilities.
- Pharmacy extensions use canonical Products, Stock, Orders, Payments, Taxes, and Documents; Healthcare remains owner of clinical facts.
- Commerce Repairs may cover simple repair intake attached to a Commerce sale; full repair-center operations remain Maintenance OS.
- A module can be enabled, disabled, trial, locked, or deprecated within Commerce configuration, subject to Core eligibility.
- A preset recommends module configuration; it does not own modules or hardcode workflows.
- A Marketplace Asset may configure or extend permitted behavior only after Marketplace entitlement and scoped activation; it remains Marketplace-owned.
- Extensions use the same authorization, audit, event, observability, reliability, and versioning obligations as Commerce Core.

### 12.2 No-parallel-truth rule

An optional module must never introduce a separate Product, Order, Stock, Inventory Movement, Payment, Refund, Tax Application, Invoice, Receipt, Return, Exchange, Commercial Adjustment, or Transfer model. Module-specific state may exist only when it does not duplicate a canonical Commerce fact and its ownership is accepted through future review.

## 13. Domain Ownership Model

The following ownership matrix is normative for this Proposal. “Owner” means the only domain permitted to create and mutate the canonical fact through its governed lifecycle.

| Canonical fact | Exactly one proposed owner | Non-owners and consumers | Ownership invariant |
|---|---|---|---|
| Product | Product Catalog domain | Pricing, Inventory, Orders, POS, Reporting, extensions | A Commerce Product is the sellable Commerce record, not a Core OS Product |
| Category | Product Catalog domain | Setup, navigation, Reporting, extensions | Category classification does not own Products |
| Variant | Product Catalog domain | Pricing, Inventory, Orders, POS | Variant is governed through the Product Catalog boundary |
| Unit | Product Catalog domain | Pricing, Inventory, Orders, POS | Commerce Unit is an operational catalog fact; shared semantic knowledge remains Knowledge-owned |
| Price | Pricing domain | Orders, POS, Reporting | The applied price captured by an Order is part of Order history; the Price definition remains Pricing-owned |
| Discount | Pricing domain | Orders, POS, Returns, Reporting | Consumers may apply an eligible Discount but cannot redefine it |
| Promotion | Pricing domain | Orders, POS, extensions, Reporting | Modules may propose eligibility inputs, not own Promotion truth |
| Stock | Inventory domain | POS, Orders, Transfers, Reporting | Stock is the current Commerce inventory position for explicit scope |
| Inventory Movement | Inventory domain | Orders, POS, Returns, Transfers, Reporting | Every stock change has an Inventory-owned movement cause |
| Transfer | Transfers domain | Inventory, Reporting | Transfer owns movement intent and lifecycle; Inventory owns resulting movements and Stock |
| Order | Orders domain | POS, Payments, Taxes, Documents, Returns, Reporting, extensions | Every Commerce channel converges on one Order truth |
| POS Transaction | POS domain | Orders, Payments, Documents, Reporting | POS Transaction owns POS interaction state, not parallel commercial facts |
| Transactional Customer | Transactional Customers domain | Orders, POS, Reporting, optional CRM integration | CRM facts remain CRM-owned |
| Payment | Payments and Refunds domain | Orders, POS, Documents, Reporting | Payment records the Commerce monetary outcome, not provider settlement ownership |
| Refund | Payments and Refunds domain | Returns, Orders, Documents, Reporting | Refund is the monetary reversal; Return remains separately owned |
| Tax Application | Taxes domain | Orders, POS, Documents, Reporting | It records applied Commerce tax and does not own external tax rules |
| Invoice | Invoices and Documents domain | Orders, Payments, Taxes, Reporting | Invoice is a Commerce Document type and never owns source facts |
| Receipt | Invoices and Documents domain | POS, Payments, Taxes, Reporting | Receipt is a Commerce Document type and never owns Payment truth |
| Commerce Document | Invoices and Documents domain | all Commerce domains as authorized consumers | Templates and issued documents remain within this boundary |
| Return | Returns and Adjustments domain | Orders, Payments, Inventory, Documents, Reporting | Return owns commercial reversal intent and lifecycle |
| Exchange | Returns and Adjustments domain | Orders, Inventory, Payments, Documents | Exchange is governed through the Return and Adjustment boundary |
| Commercial Adjustment | Returns and Adjustments domain | Orders, Pricing, Taxes, Payments, Documents, Reporting | Other domains perform their own requested effects |
| Commerce Setup | Setup and Configuration domain | Product Hub, Access, all Commerce domains | Commerce setup is Business Unit-scoped and not a Branch child |
| Commerce Readiness | Setup and Configuration domain | Core OS lifecycle coordination and Product Hub projection | This fact is Commerce's readiness contribution, not the final cross-owner OS Ready result |
| Commerce Operational Reports | Reporting domain | authorized Commerce users and external projection consumers | Reporting owns report projection lifecycle, never the source writes |

### 13.1 External ownership retained

| External fact | Frozen owner | Commerce relationship |
|---|---|---|
| Workspace, Business Unit, Department, Branch identity and ancestry | Core Organization Registry | Reference only |
| Actor identity, membership, grants, and canonical authorization context | Core Platform | Consume and enforce |
| OS Product, Plan, Entitlement, OS Subscription, Installation, Activation | Core commercial lifecycle owners | Consume eligibility and lifecycle context |
| Product Hub journey and handoff | Product Hub | Receive setup or launch handoff; publish projections |
| Business DNA | Business DNA owner | Consume authorized, versioned context |
| Knowledge, Rule, Capability | Knowledge Engine, Rules Engine, Capability Registry | Consume governed inputs |
| Decision | Business Brain | Consume completed Decision only |
| Recommendation | Recommendation Engine | Consume advisory Recommendation |
| Implementation Option | Core intelligence mapping owner | Consume mapped option |
| Configuration Proposal | Configuration Engine | Validate and apply; do not own proposal |
| AI artifact and Action Proposal | AI Coordinator | Consume only after validation and authorization |
| Marketplace Asset and Marketplace lifecycle | Marketplace | Consume entitled and activated asset |
| Audit Record, Notification, Search Index, platform Analytics projection | respective Core services | Supply source facts; do not own projection |

## 14. Canonical Write Responsibilities

Canonical writes follow a single-owner protocol.

1. The actor and explicit scope arrive from Core-authenticated context.
2. Access validates OS access, Workspace, Business Unit, Branch where applicable, and Commerce permission.
3. The owning Commerce domain validates its invariants and current state.
4. A non-owning domain communicates intent through a logical contract; it never writes the owner's model.
5. The owner performs the canonical state transition once.
6. The owner records correlation, causation, actor, scope, and version information required by frozen governance.
7. The owner emits the corresponding completed-fact domain event where an event is appropriate.
8. Projections, reports, notifications, audit, search, analytics, and integrations update from the completed fact without acquiring ownership.

### 14.1 Cross-domain effect examples

- Completing an Order does not directly change Stock. Orders requests an Inventory effect; Inventory records Inventory Movements and updates Stock.
- Completing a Return does not directly create a Refund. Returns and Adjustments requests a monetary reversal; Payments and Refunds records the Refund.
- POS does not write Order, Payment, Tax Application, or Receipt state directly. It coordinates their owners through contracts and owns only POS Transaction state.
- A Transfer does not directly edit Stock. Transfers owns Transfer intent and lifecycle; Inventory owns source and destination movements and positions.
- A Configuration Proposal does not write Commerce Setup. Setup and Configuration validates and applies the proposal idempotently under authorization.

### 14.2 Consistency invariant

When a business operation spans owners, each owner remains authoritative for its completed fact. The logical operation must expose an explicit in-progress, completed, failed, or compensating state where required. Physical transaction and consistency mechanisms remain deferred; no mechanism may collapse owners or permit dual writes.

## 15. Canonical Write Models

Eighteen logical canonical write models are proposed. They define ownership and invariant boundaries, not database structures.

| ID | Canonical write model | Owner | Canonical facts represented | Core invariants |
|---|---|---|---|---|
| CWM-01 | Commerce Setup | Setup and Configuration | Commerce Setup, preset selection, module configuration | Business Unit-scoped; Core eligibility respected; editable billing data preserved |
| CWM-02 | Commerce Readiness Assessment | Setup and Configuration | Commerce Readiness contribution | Derived from Commerce-owned prerequisites; final OS Ready remains external |
| CWM-03 | Product | Product Catalog | Product, Variant | Stable identity; lifecycle controlled only by Product Catalog |
| CWM-04 | Category | Product Catalog | Category | Classification changes do not transfer Product ownership |
| CWM-05 | Commerce Unit | Product Catalog | Unit | Operational unit meaning remains explicit and version-aware |
| CWM-06 | Commerce Pricing | Pricing | Price, Discount, Promotion | Eligibility and effective state governed by Pricing; applied snapshot preserved by consumer |
| CWM-07 | Inventory Position | Inventory | Stock | Unique canonical position per Product or Variant and operational scope |
| CWM-08 | Inventory Movement | Inventory | Inventory Movement | Every Stock change is attributable and auditable |
| CWM-09 | Inventory Transfer | Transfers | Transfer | Explicit source, destination, status, and authorized lifecycle |
| CWM-10 | Commerce Order | Orders | Order | One Order truth across all channels; recorded commercial terms preserved |
| CWM-11 | POS Transaction | POS | POS Transaction | Explicit Branch and actor context; references canonical Commerce results |
| CWM-12 | Transactional Customer | Transactional Customers | Transactional Customer | Workspace and Business Unit isolation; no CRM workflow ownership |
| CWM-13 | Commerce Payment | Payments and Refunds | Payment | References a payable Commerce fact; provider outcome is traceable |
| CWM-14 | Commerce Refund | Payments and Refunds | Refund | References refundable value and reason; distinct from Return |
| CWM-15 | Tax Application | Taxes | Tax Application | Captures applied rule basis and amount without owning external rule source |
| CWM-16 | Commerce Document | Invoices and Documents | Invoice, Receipt, Commerce Document | Issued version is traceable and source references are immutable as required |
| CWM-17 | Commerce Return | Returns and Adjustments | Return, Exchange | References original commercial facts; downstream effects remain owner-controlled |
| CWM-18 | Commercial Adjustment | Returns and Adjustments | Commercial Adjustment | Reason, authorization, and requested effects remain explicit |

Commerce Operational Reports are intentionally not a canonical write model. They are Reporting-owned logical read models derived from canonical Commerce facts.

## 16. Aggregate Candidates

The following aggregate candidates align with the canonical write models. They are logical consistency candidates pending detailed domain modeling; no persistence or transaction boundary is implied.

| Candidate aggregate | Candidate root | Included responsibility | Excluded responsibility |
|---|---|---|---|
| Commerce Setup | Commerce Setup | preset, module configuration, Commerce-owned setup state | Entitlement, Subscription, Installation, Activation |
| Commerce Readiness Assessment | Commerce Readiness | evaluation of Commerce prerequisites | final cross-owner Operating System Ready result |
| Product | Product | Product and Variant lifecycle | Price and Stock |
| Category | Category | Commerce catalog classification | Product ownership |
| Commerce Unit | Unit | operational sellable or inventory unit definition | shared Knowledge ownership |
| Commerce Pricing | Commerce Pricing | Price, Discount, Promotion definitions and eligibility | Order's recorded applied terms |
| Inventory Position | Stock | current inventory position for explicit scope | movement intent owned by Orders, Returns, or Transfers |
| Inventory Movement | Inventory Movement | attributable stock effect | source business lifecycle |
| Inventory Transfer | Transfer | transfer intent and transfer state | canonical Stock and Inventory Movement writes |
| Commerce Order | Order | order lines, commercial state, recorded applied terms | Payment, Tax Application, or Document ownership |
| POS Transaction | POS Transaction | point-of-sale interaction and completion references | Order and Payment truth |
| Transactional Customer | Transactional Customer | Commerce transactional identity and attributes | CRM relationship workflow |
| Commerce Payment | Payment | monetary collection record and outcome | provider settlement master data |
| Commerce Refund | Refund | monetary reversal record and outcome | Return or Commercial Adjustment decision |
| Tax Application | Tax Application | applied tax result and traceability | external tax rules |
| Commerce Document | Commerce Document | Invoice, Receipt, and other issued document lifecycle | source commercial facts |
| Commerce Return | Return | Return and Exchange lifecycle | monetary and inventory writes |
| Commercial Adjustment | Commercial Adjustment | adjustment reason, approval, and effect requests | direct writes to another aggregate |

Whether any candidate is subdivided without changing ownership is a deferred detailed-domain decision.

## 17. Read Models and Projections

Read models are derived, disposable, authorization-filtered views. Their owner controls projection definition and lifecycle, not the source facts.

### 17.1 Proposed Commerce read models

| Read model | Projection owner | Source owners | Purpose |
|---|---|---|---|
| Commerce Setup and Readiness View | Setup and Configuration | Setup plus Core lifecycle context | Show remaining Commerce prerequisites and handoff status |
| Commerce Catalog View | Product Catalog | Product Catalog, Pricing, Inventory | Support browsing and operational selection |
| Effective Pricing View | Pricing | Pricing, Product Catalog | Present applicable prices, discounts, and promotions |
| Stock Availability View | Inventory | Inventory, Product Catalog, Core Branch references | Present scoped operational availability |
| Commerce Order View | Orders | Orders plus referenced completion outcomes | Present canonical Order status and linked effects |
| POS Operations View | POS | POS, Orders, Payments, Documents | Support point-of-sale workflow without owning linked facts |
| Transactional Customer History View | Transactional Customers | Customers, Orders, Payments, Returns | Show Commerce purchase-facing history |
| Payment and Refund View | Payments and Refunds | Payments, Refunds, referenced Orders and Returns | Present monetary outcomes |
| Tax Operations View | Taxes | Tax Applications and referenced commercial facts | Support tax inspection and reporting |
| Commerce Document View | Invoices and Documents | Documents plus referenced source facts | Present issued documents and status |
| Return and Adjustment View | Returns and Adjustments | Returns, Exchanges, Adjustments, downstream outcomes | Present reversal workflow and effects |
| Transfer Operations View | Transfers | Transfers and linked Inventory Movements | Present transfer progress and outcome |
| Commerce Operational Dashboard | Reporting | all approved Commerce domain events and projections | Present authorized operational status |
| Commerce Operational Reports | Reporting | canonical Commerce owners | Present sales, tax, inventory, and product performance views |

### 17.2 External projections

- Product Hub receives a minimal Commerce lifecycle and readiness projection through Core-governed contracts.
- Audit Service receives attributable critical-action facts and owns Audit Records.
- Notification Service receives notification intents and owns Notification state.
- Search owns its Search Index built from authorized Commerce projection input.
- Analytics owns platform Analytics projections built from governed Commerce facts.
- Business Brain and Recommendation Engine may consume authorized feedback or outcome projections without gaining Commerce ownership.

### 17.3 Projection rules

1. Projection failure cannot mutate or invalidate the canonical write.
2. Rebuilding a projection must not require write access to its source domain.
3. Projection access applies the same or stricter tenant and resource scope as source access.
4. A projection carries source version, correlation, and freshness information appropriate to its use.
5. Stale or incomplete projections must be represented honestly and must not be used as an implicit authorization source.
6. A reporting or dashboard correction changes the projection unless the owning canonical domain independently corrects its source fact.

## 18. Commerce Lifecycle Responsibilities

Each lifecycle below has exactly one owner. A collaborating domain may request a transition but cannot perform it directly.

| Lifecycle | Exactly one owner | Starts from | Ends or stabilizes at | Non-owner effects |
|---|---|---|---|---|
| Commerce Setup | Setup and Configuration | valid Core setup handoff | Commerce configuration complete, paused, or superseded | Product Hub observes projection only |
| Commerce Readiness contribution | Setup and Configuration | Commerce prerequisites evaluable | ready or not ready contribution | Core coordinates final OS Ready outcome |
| Product | Product Catalog | authorized creation | active, archived, or governed terminal state | Pricing and Inventory reference Product |
| Category | Product Catalog | authorized creation | active or archived | Consumers update projections |
| Variant | Product Catalog | Product-governed creation | active or archived | Pricing and Inventory reference Variant |
| Unit | Product Catalog | authorized definition | active or archived | Consumers retain historic applied meaning |
| Price | Pricing | authorized definition | effective, expired, replaced, or withdrawn | Orders preserve applied snapshot |
| Discount | Pricing | authorized definition | eligible, applied, expired, or withdrawn | Orders record application outcome |
| Promotion | Pricing | authorized definition | scheduled, active, expired, or withdrawn | Modules supply eligible inputs only |
| Stock | Inventory | inventory position established | current position reflecting owned movements | Other domains request effects |
| Inventory Movement | Inventory | accepted movement cause | recorded or rejected | Cause owner observes outcome |
| Transfer | Transfers | authorized transfer intent | completed, cancelled, or failed | Inventory owns movements |
| Order | Orders | authorized order intent | completed, cancelled, returned in part, or governed terminal state | Channels request transitions |
| POS Transaction | POS | authorized POS interaction | completed, cancelled, or failed | References owner outcomes |
| Transactional Customer | Transactional Customers | authorized capture | active, merged, restricted, or archived subject to policy | CRM integration remains optional |
| Payment | Payments and Refunds | authorized payment attempt | recorded, failed, reversed, or governed terminal state | Order observes outcome |
| Refund | Payments and Refunds | authorized refund request | recorded, failed, or governed terminal state | Return observes outcome |
| Tax Application | Taxes | taxable operation submitted | applied, corrected through governed action, or voided | Documents consume result |
| Commerce Document | Invoices and Documents | eligible issuance request | issued, voided, replaced, or archived under policy | Source facts remain owned externally |
| Return | Returns and Adjustments | authorized return intent | completed, rejected, cancelled, or partial outcome | Payments and Inventory perform effects |
| Exchange | Returns and Adjustments | authorized exchange intent | completed, rejected, or cancelled | Orders and Inventory perform owned effects |
| Commercial Adjustment | Returns and Adjustments | authorized adjustment intent | applied, rejected, cancelled, or compensated | Affected owners perform effects |
| Commerce Operational Report | Reporting | projection criteria and sources available | generated/current, stale, superseded, or expired | Never mutates source facts |

The exact state vocabularies and transition guards remain deferred. The owner assignments do not.

## 19. Setup and Readiness Boundaries

### 19.1 Core-owned boundary

Core Platform retains canonical ownership of Workspace and organization identity, Product and Plan catalog entries, Entitlement, OS Subscription, Installation, Activation, billing state, and the governed OS lifecycle. Product Hub owns selection, display, and setup or launch handoff composition.

### 19.2 Commerce-owned boundary

Setup and Configuration owns:

- the Commerce setup experience after a valid handoff;
- Business Unit-scoped Commerce Setup;
- selection and application of a Commerce Preset;
- Commerce-owned billing and legal identity used by Commerce documents;
- Commerce tax configuration inputs;
- numbering and Commerce document-template configuration;
- Commerce categories, units, selling mode, and allowed sample data configuration;
- Commerce module configuration subject to eligibility;
- validation and idempotent application of an authorized Configuration Proposal;
- the Commerce Readiness contribution stating whether Commerce-owned prerequisites are satisfied.

Commerce Setup may use Workspace defaults and Branch operational address as defaults. User-edited Commerce billing address and legal details remain Commerce-owned and must be preserved.

### 19.3 Organization boundary

Commerce Setup belongs to Business Unit and is not modeled as a child of Branch. Commerce may select or request creation of an operational Business Unit only through a future approved Core organization contract. Branch is an operational scope for POS, Stock, Orders, Documents, Reports, Transfers, and Returns. Commerce never creates independent organization identity.

### 19.4 Readiness boundary

`Commerce Readiness` in this Proposal means the Commerce-owned readiness contribution. It assesses only Commerce prerequisites. The final `Operating System Ready` outcome remains in the frozen cross-owner OS lifecycle coordination and also depends on Core-owned subscription, installation, activation, scope, and access conditions. This separation prevents dual ownership.

## 20. Product Catalog Boundaries

Product Catalog owns Commerce Products, Variants, Categories, and Units used in commercial workflows.

### 20.1 Commerce Product distinction

A Commerce Product is a sellable Commerce record. It is distinct from:

- the Core OS Product that represents Commerce OS in Product Hub and subscription catalogs;
- a Marketplace Asset that extends the platform;
- Knowledge that describes reusable business knowledge;
- an external OS record referenced through optional integration.

### 20.2 Boundary rules

- A Product may have Variants governed within the Product aggregate boundary.
- Category classifies Products but does not own them.
- Unit defines Commerce operational measurement or selling semantics; reusable semantic knowledge remains Knowledge-owned.
- Product Catalog does not own Price, Stock, Tax Application, or document truth.
- Presets may seed or recommend categories, units, fields, and optional sample Products; after accepted application, Product Catalog owns the resulting Commerce facts.
- Optional modules may add permitted attributes or behavior through governed extension contracts but cannot create a parallel product catalog.
- Deletion, archiving, merge, and historic-reference policy remain deferred.

## 21. Pricing Boundaries

Pricing owns Price, Discount, and Promotion definitions, eligibility, and lifecycle within Commerce.

### 21.1 Ownership separation

- Core owns OS Plan and platform billing price; Commerce Pricing owns sellable Commerce pricing.
- Pricing determines eligible commercial terms from authorized context.
- Orders owns the applied commercial snapshot recorded on an Order.
- Returns and Adjustments owns adjustment intent; Pricing may calculate or validate pricing implications.
- Business Brain and Recommendation Engine may recommend pricing-related actions but never own or apply Price, Discount, or Promotion.
- AI may explain or suggest; it cannot modify pricing facts.

### 21.2 Pricing invariants

1. Every applied Price, Discount, or Promotion is traceable to the Pricing-owned definition or an explicitly authorized governed adjustment.
2. Historic Orders preserve the commercial terms applied at the time of their owning transition.
3. Branch or Business Unit applicability is explicit.
4. Overlap, precedence, stacking, rounding, currency, and temporal rules remain deferred and cannot be inferred silently.

## 22. Inventory Boundaries

Inventory owns Stock and Inventory Movement.

### 22.1 Fact distinction

- **Stock** is the current canonical inventory position for a Product or Variant at an explicit operational scope.
- **Inventory Movement** is the attributable canonical fact explaining a change to Stock.
- **Transfer** is the Transfers-owned business intent and lifecycle that may cause multiple Inventory Movements.

Stock and Inventory Movement have the same domain owner but are distinct canonical facts. This is not duplicate ownership: current position and movement history must reconcile under Inventory invariants.

### 22.2 Sources of inventory effect

Orders, Returns and Adjustments, Transfers, setup seed activity, and optional modules may request inventory effects. Inventory alone validates and records movements and updates Stock. The exact timing of reservation, commitment, deduction, release, and compensation remains deferred.

### 22.3 Scope rules

- Inventory is at least Workspace-, Business Unit-, and Branch-aware where operationally applicable.
- Branch identity comes from Core Organization Registry.
- Another OS may request an optional integration effect but cannot write Commerce Stock.
- Search, reports, POS, and dashboards consume Stock projections, never Stock write authority.

## 23. Order Boundaries

Orders owns the canonical Commerce Order across every Commerce channel.

### 23.1 Order responsibilities

- create and evolve Order intent and commercial state;
- preserve ordered items and applied commercial terms;
- reference Transactional Customer where applicable;
- coordinate owner-controlled Price, Tax Application, Payment, Stock, Document, Return, and Adjustment outcomes;
- expose owned events and read projections;
- prevent channels from creating parallel order truth.

### 23.2 Boundary separation

- POS owns POS Transaction, not Order.
- Delivery, Kitchen, and Online Store extensions may extend fulfillment or presentation but use the same Order.
- Pricing owns definitions; Order owns its recorded applied terms.
- Taxes owns Tax Application; Order references the result.
- Payments owns Payment and Refund; Order references the outcomes.
- Documents owns Invoice and Receipt; Order references them.
- Inventory owns Stock effects.
- The precise relationship between Order and sale completion, fulfillment, cancellation, and partial outcomes remains deferred.

## 24. Point-of-Sale Boundaries

POS is a Commerce transaction capability and interaction flow, not merely a screen. POS owns the POS Transaction model and coordinates Commerce Core owners.

### 24.1 POS may

- establish an authorized Branch and actor context;
- build and validate an interaction-level cart or checkout state;
- request pricing, tax, Order, Payment, Inventory, and Document operations;
- record POS-specific completion, cancellation, and failure state;
- provide keyboard-first, barcode-ready, fast-checkout, tax-visible, bilingual-ready experiences in future implementation.

### 24.2 POS may not

- create a POS-only Product, Order, Customer, Stock, Payment, Tax, Invoice, or Receipt store;
- bypass Orders to record a sale;
- directly mutate Stock;
- treat optimistic user-interface state as canonical completion;
- infer Branch or employee context without Core authorization and Commerce scope validation.

Offline behavior, session semantics, cart persistence, cash-drawer concepts, and completion orchestration are deferred.

## 25. Transactional Customer Boundaries

Transactional Customers owns the Commerce customer fact required for Commerce transactions and purchase-facing history.

### 25.1 Commerce ownership

Commerce may own customer contact and identification data needed for Orders, Payments, Documents, Returns, and operational service, subject to data classification and consent rules.

### 25.2 CRM boundary

CRM OS owns leads, opportunities, pipelines, campaigns, follow-ups, and relationship workflows. Commerce may operate without CRM. Optional Commerce–CRM integration may share governed projections or references, but neither system writes the other's canonical facts.

### 25.3 Boundary invariants

- Customer identity and matching are Workspace-isolated.
- Anonymous or walk-in treatment, merge rules, duplicates, erasure, retention, and CRM linking remain deferred.
- Purchase history is derived from Commerce facts; it is not a separate mutable customer ledger.

## 26. Payment and Refund Boundaries

Payments and Refunds owns Commerce Payment and Refund facts.

### 26.1 Payment boundary

A Payment records a Commerce monetary collection attempt or outcome against an eligible Commerce obligation. External providers retain ownership of their provider records and settlement facts. Commerce stores governed references and outcomes required for its own truth.

### 26.2 Refund boundary

A Refund is a monetary reversal owned by Payments and Refunds. It is distinct from:

- a Return or Exchange owned by Returns and Adjustments;
- an Order cancellation owned by Orders;
- a Commercial Adjustment owned by Returns and Adjustments;
- an external provider reversal record.

Returns and Adjustments may request a Refund. Payments and Refunds alone authorizes within its boundary, records the outcome, and emits the completed fact.

### 26.3 Deferred payment semantics

Authorization, capture, settlement observation, partial payment, split payment, cash handling, failure, reversal, reconciliation, provider callback validation, and tender-specific policy remain deferred.

## 27. Tax Boundaries

Taxes owns Tax Application, the canonical Commerce record of tax applied to a commercial operation.

Taxes may consume Commerce tax configuration, Product and Price context, Order facts, and external rules or knowledge through approved contracts. It does not own external legal rules, Business DNA, Knowledge, or Core configuration truth.

### 27.1 Tax invariants

- Tax evaluation occurs in explicit Workspace, Business Unit, Branch where applicable, jurisdiction, and transaction context.
- Applied tax is deterministic and reproducible from retained inputs and rule versions.
- Orders and Documents reference Taxes-owned results.
- Corrections and voiding are governed actions, not destructive rewrites of issued history.
- Inclusive/exclusive behavior, rounding, exemptions, compound tax, jurisdiction resolution, and reporting periods remain deferred.

## 28. Invoice, Receipt, and Document Boundaries

Invoices and Documents owns Invoice, Receipt, and other Commerce Document facts and their issuance lifecycle.

### 28.1 Document ownership

- Invoice and Receipt are Commerce Document types within one ownership boundary.
- Commerce Document configuration includes authorized templates, numbering, bilingual presentation, and legal identity inputs.
- An issued Commerce Document references its source Order, Payment, Refund, Tax Application, Return, or Adjustment as applicable but does not own those facts.
- A document version issued for a completed operation remains traceable; correction occurs through governed replacement, void, credit, or adjustment behavior once defined.

### 28.2 External boundary

Commerce does not own external tax authority, fiscal device, signing, delivery, or archival services. Future integrations use contracts and cannot rewrite Commerce Document truth.

Exact document taxonomy, numbering concurrency, immutable fields, correction instruments, signing, delivery, retention, and jurisdiction policy remain deferred.

## 29. Return and Adjustment Boundaries

Returns and Adjustments owns Return, Exchange, and Commercial Adjustment.

### 29.1 Responsibility separation

- Return owns the commercial decision and lifecycle for returning previously transacted value or items.
- Exchange is governed through the same domain and coordinates any replacement Order or inventory effects through their owners.
- Commercial Adjustment owns an authorized non-original modification intent and its effect requests.
- Payments and Refunds owns monetary Refund.
- Inventory owns Stock and Inventory Movement.
- Taxes owns Tax Application correction or reversal.
- Invoices and Documents owns resulting documents.
- Orders owns Order state and any replacement Order.

### 29.2 Invariants

Every Return, Exchange, or Commercial Adjustment references an eligible original fact, explicit reason, actor, scope, and authorization. It never directly mutates another domain's canonical model.

Return windows, item condition, partial returns, exchange valuation, adjustment categories, approval thresholds, tax treatment, and document treatment remain deferred.

## 30. Inventory Transfer Boundaries

Transfers owns Transfer intent and lifecycle between canonical operational scopes. Inventory owns every resulting Inventory Movement and Stock position.

### 30.1 Transfer responsibilities

- validate authorized source and destination references;
- record transfer intent, contents, responsibility, and lifecycle;
- request source and destination inventory effects;
- reconcile owner outcomes into Transfer state;
- expose Transfer events and projections.

### 30.2 Transfer invariants

- Source and destination Branches are Core-owned canonical identities under allowed Commerce scope.
- A Transfer cannot directly edit Stock.
- A failed or partial inventory effect remains explicit; it is not hidden by projection state.
- Transfer does not create a second shipment, order, or inventory truth.

Reservation, in-transit representation, receipt acceptance, partial receipt, cancellation, loss, and compensation remain deferred.

## 31. Reporting and Dashboard Boundaries

Reporting owns Commerce Operational Reports, dashboard definitions, projection lifecycle, and projection quality state. It does not own source facts.

### 31.1 Reporting responsibilities

- consume authorized, versioned Commerce facts and domain events;
- build Workspace-, Business Unit-, Branch-, user-, and permission-scoped projections;
- expose freshness, completeness, and source traceability;
- support sales, tax, inventory, product performance, payment, return, and operational views as approved;
- rebuild projections without mutating source domains;
- supply governed data to Core Analytics without owning the platform Analytics projection.

### 31.2 Boundary rules

- A dashboard is not an authorization source.
- A report correction cannot silently correct canonical writes.
- Cross-domain aggregation preserves owner attribution.
- Sensitive fields remain minimized and scope-filtered.
- Report definitions, snapshot/export artifacts, retention, freshness targets, and accounting-grade status remain deferred.

## 32. Permission and Staff Boundaries

Core Platform owns identity, Workspace membership, canonical authorization grants, organization scope, OS access, and shared permission evaluation foundations. Commerce Access owns Commerce-specific role mapping and enforcement policy for Commerce actions.

### 32.1 Commerce responsibilities

- declare Commerce permission resources and actions using the frozen `{os}.{resource}.{action}` convention;
- map Commerce operational roles such as cashier, manager, and inventory manager without requiring HR OS;
- enforce Business Unit, Branch, resource, module, subscription, and entitlement context for each action;
- deny operations when required context is absent, ambiguous, stale, or insufficient;
- provide critical authorization outcomes to Audit Service.

### 32.2 Boundary rules

- Commerce does not create Core User or Workspace Member identity.
- Commerce operational staff roles work without HR OS.
- Optional HR integration may reference an HR-owned employee profile but cannot make HR required for Commerce access.
- Module visibility is not authorization; navigation filters complement but never replace permission enforcement.
- Permission catalog, role templates, delegation, approval thresholds, and field-level restrictions remain deferred.

## 33. Marketplace Boundaries

Marketplace owns Marketplace Asset identity, immutable published versions, review, discovery, acquisition, Marketplace Entitlement, and scoped activation or installation state.

Commerce may:

- display eligible Commerce extension possibilities through governed Marketplace projections;
- consume an entitled and activated Marketplace Asset version;
- maintain Commerce-owned configuration that applies the asset to permitted Commerce behavior;
- invoke permitted extension contracts;
- disable Commerce use without mutating the published asset;
- provide governed outcome or usage signals where authorized.

Commerce must never:

- publish, mutate, version, review, entitle, or install Marketplace Assets as if Commerce-owned;
- infer entitlement from visibility;
- allow an asset to bypass Commerce authorization or canonical owners;
- let an asset create parallel Products, Orders, Stock, Payments, Taxes, Documents, Returns, or Transfers;
- expose unrestricted Commerce internals or data.

Marketplace extension permissions, compatibility declarations, failure isolation, data access policy, and removal effects remain deferred to future governed work.

## 34. AI Boundaries

AI Coordinator remains the exclusive coordinator and owner of AI artifacts. Commerce does not embed an alternative AI coordinator or use AI to form canonical Business Brain Decisions.

### 34.1 Allowed AI participation

After a canonical Business Brain Decision exists, AI may, through AI Coordinator:

- explain Commerce context or an existing Decision;
- generate a narrative, suggestion, advisory output, or Action Proposal;
- assist a user in understanding operational projections;
- propose an authorized Commerce action for validation;
- help map human intent to an existing logical Commerce contract.

### 34.2 Commerce application boundary

An AI output is never a Commerce write. Commerce must independently:

1. authenticate the acting context;
2. validate Workspace, Business Unit, Branch, resource, and module scope;
3. validate current canonical state and input version;
4. require human approval where consequential policy requires it;
5. apply through the exactly-one owning Commerce domain;
6. record source, actor, correlation, result, and explanation evidence;
7. reject, expire, or supersede stale or unsafe proposals.

AI providers never receive authority over Product, Price, Stock, Order, Payment, Tax, Document, Return, Transfer, Setup, or readiness facts. Canonical Commerce outcomes remain deterministic, reproducible, and provider-independent.

## 35. Cross-OS Integration Boundaries

Cross-OS integration is optional, contract-based, and versioned. No integration may become a prerequisite for Commerce core operation.

| Integration | External owner | Commerce owner | Boundary |
|---|---|---|---|
| Commerce–CRM | CRM owns leads, campaigns, pipelines, follow-ups | Commerce owns Transactional Customer and purchase facts | Share governed references or projections only |
| Commerce Pharmacy–Healthcare | Healthcare owns prescription and clinical workflow | Commerce owns Product, Stock, Order, Payment, Tax, Invoice, dispensing-related commercial fact | Either OS completes its core workflow independently |
| Commerce–HR | HR owns employee profile, attendance, payroll, leave, contract | Commerce owns operational Commerce role and access enforcement | HR profile link is optional |
| Commerce–Maintenance | Maintenance owns repair ticket and repair-center workflow | Commerce owns linked part, Stock, Order, Payment, Invoice | Simple sale-linked intake may remain Commerce extension; no duplicate ticket truth |
| Commerce–other OS | Other OS owns its domain fact | Commerce owns its commercial facts | Integration uses explicit references and contracts |

### 35.1 Cross-OS invariants

- No direct database access or shared write store.
- No cross-OS cascade that bypasses the receiving owner's authorization and validation.
- References do not transfer ownership.
- Integration failure does not corrupt canonical Commerce state.
- Correlation and version information enable audit and replay-safe handling where approved.
- Contract semantics, failure states, and reconciliation policy remain deferred.

## 36. Logical Contracts

The following contracts are logical boundaries only. They do not define endpoints, transports, payload schemas, or physical services.

### 36.1 Core Platform contracts consumed by Commerce

| Contract | Provider | Consumer | Logical purpose |
|---|---|---|---|
| Authenticated Actor Context | Core Identity and Access | Commerce Access | Establish actor and authenticated session context |
| Organization Scope Context | Core Organization Registry | all Commerce domains | Resolve Workspace, Business Unit, Department, and Branch references and ancestry |
| Commerce Eligibility Context | Core commercial lifecycle owners | Setup, Access, Extensions | Validate Product, Plan, Entitlement, Subscription, Installation, Activation, and access state |
| Commerce Setup Handoff | Product Hub | Setup and Configuration | Transfer authorized user journey into Commerce-owned setup |
| Commerce Launch Handoff | Product Hub | Commerce experience | Transfer authorized journey into ready Commerce context |
| Audit Submission | Commerce fact owner | Core Audit Service | Submit attributable critical-action evidence |
| Notification Intent | Commerce fact owner | Core Notification Service | Request a user-facing notification from completed Commerce state |
| Search Projection Input | Commerce fact owner | Core Search | Supply authorized searchable facts |
| Analytics Projection Input | Commerce fact owner | Core Analytics | Supply governed analytical facts |

### 36.2 Intelligence contracts consumed or produced

| Contract | Provider | Consumer | Logical purpose |
|---|---|---|---|
| Business Context | Business DNA owner | authorized Commerce evaluation | Supply versioned business context without transferring ownership |
| Knowledge, Rule, and Capability Context | respective frozen owners | Commerce validation or Business Brain integration | Supply governed external meaning and constraints |
| Completed Decision | Business Brain | Commerce advisory flow | Supply a completed, deterministic Decision |
| Recommendation | Recommendation Engine | authorized Commerce user or workflow | Supply advisory Recommendation |
| Implementation Option | Core intelligence mapping owner | Commerce setup or operations | Describe target mapping without applying state |
| Configuration Proposal | Configuration Engine | Setup and Configuration or another target domain | Offer versioned changes for target validation and application |
| Configuration Application Result | applying Commerce owner | Configuration Engine and authorized observers | Report accepted, rejected, expired, failed, or applied outcome |
| Commerce Outcome Feedback | originating Commerce owner | authorized Business Brain or Recommendation flow | Supply governed observed outcome without exporting ownership |

### 36.3 Marketplace and AI contracts

| Contract | Provider | Consumer | Logical purpose |
|---|---|---|---|
| Marketplace Eligibility and Asset Context | Marketplace | Extensions | Prove asset version, entitlement, activation, and allowed scope |
| Commerce Extension Invocation | Extensions | canonical Commerce owner | Request permitted behavior without direct writes |
| AI Advisory Artifact | AI Coordinator | authorized Commerce experience | Supply explanation, narrative, suggestion, or Action Proposal after Decision formation |
| AI Action Application Result | applying Commerce owner | AI Coordinator and authorized observers | Report validated outcome without transferring canonical ownership |

### 36.4 Internal Commerce contracts

| Contract | Provider | Consumer | Logical purpose |
|---|---|---|---|
| Catalog Selection | Product Catalog | Pricing, Inventory, Orders, POS | Supply valid Product, Variant, Category, and Unit facts |
| Pricing Determination | Pricing | Orders, POS, Returns | Supply eligible terms without owning consumer history |
| Inventory Effect Request | Orders, Returns, Transfers, authorized setup or extension | Inventory | Request an attributable Inventory Movement |
| Inventory Effect Result | Inventory | requesting domain | Report accepted or rejected movement and resulting reference |
| Order Operation | Orders | POS and optional channels | Create or transition the canonical Order through Orders |
| Monetary Operation | Payments and Refunds | POS, Orders, Returns | Record Payment or Refund through its owner |
| Tax Determination | Taxes | Orders, POS, Documents, Returns | Produce a canonical Tax Application |
| Document Operation | Invoices and Documents | Orders, POS, Payments, Returns | Issue or transition a Commerce Document through its owner |
| Return or Adjustment Operation | Returns and Adjustments | Orders, POS, customer service flows | Record a Return, Exchange, or Commercial Adjustment |
| Transfer Operation | Transfers | authorized inventory operations | Record and evolve Transfer intent |
| Reporting Projection Input | canonical Commerce owner | Reporting | Supply owned facts or events for disposable projections |

All contracts require explicit context, authorization, version, correlation, idempotency semantics where repeat submission is possible, and declared error behavior. Exact fields are deferred.

## 37. Logical Event Responsibilities

Events communicate completed facts after owner validation and write. They are not commands, authorization grants, or alternative truth.

### 37.1 Event taxonomy

- **Commerce Domain Events:** owned facts used inside Commerce boundaries.
- **Commerce Integration Events:** deliberately published, minimized representations for external consumers.
- **Commerce Notification Inputs:** completed facts that may lead Core Notification Service to own a Notification.
- **Commerce Audit Inputs:** critical-action evidence submitted to Core Audit Service.
- **Commerce Intelligence Feedback:** governed outcomes supplied to authorized Business Brain or Recommendation flows.

### 37.2 Proposed owner-event map

| Event responsibility | Exactly one event owner | Represents |
|---|---|---|
| Commerce Setup changed or completed | Setup and Configuration | completed Commerce Setup transition |
| Commerce readiness contribution changed | Setup and Configuration | current Commerce-owned readiness result |
| Product, Variant, Category, or Unit changed | Product Catalog | completed catalog transition |
| Price, Discount, or Promotion changed | Pricing | completed pricing transition |
| Stock changed | Inventory | completed Inventory-owned position transition |
| Inventory Movement recorded | Inventory | completed attributable stock effect |
| Transfer changed | Transfers | completed Transfer transition |
| Order changed | Orders | completed Order transition |
| POS Transaction changed | POS | completed POS-specific transition |
| Transactional Customer changed | Transactional Customers | completed customer transition |
| Payment recorded or failed | Payments and Refunds | completed Payment transition |
| Refund recorded or failed | Payments and Refunds | completed Refund transition |
| Tax Application completed or corrected | Taxes | completed tax transition |
| Commerce Document issued, replaced, or voided | Invoices and Documents | completed document transition |
| Return or Exchange changed | Returns and Adjustments | completed Return or Exchange transition |
| Commercial Adjustment changed | Returns and Adjustments | completed adjustment transition |
| Commerce Operational Report projection changed | Reporting | completed projection lifecycle transition, never source truth |

### 37.3 Event rules

1. Only the canonical fact owner emits the authoritative event for that fact.
2. Events are immutable observations of completed transitions.
3. Consumers are idempotent and cannot assume global ordering.
4. Ordering guarantees, if needed, are bounded to an explicitly identified source stream and remain deferred.
5. External publication minimizes sensitive and tenant data.
6. Replay rebuilds projections or retries permitted side effects; it does not repeat unauthorized canonical decisions.
7. Event versions preserve compatibility under Governance and ADR control.
8. An event delivery failure must not create a second writer or cause silent loss of owner state.

Exact event names, schemas, publication criteria, ordering scope, retention, replay controls, and delivery guarantees remain deferred.

## 38. Security Responsibilities

Commerce Security extends the frozen Core security model and never replaces it.

### 38.1 Trust boundaries

- user or client to Commerce experience;
- Product Hub handoff to Commerce setup or launch;
- Commerce domain to Commerce domain through logical contracts;
- Commerce to Core shared service;
- Commerce to Marketplace extension;
- Commerce to AI Coordinator;
- Commerce to another OS;
- Commerce to an external payment, tax, document, or integration provider.

### 38.2 Security responsibilities

Commerce must:

- require Core-authenticated identity and validated session context;
- authorize Workspace, Business Unit, Branch, OS, module, resource, and action scope;
- enforce Commerce permissions at canonical owner boundaries, not only in UI;
- validate entitlement, subscription, activation, and module eligibility where relevant;
- isolate tenant data and reject ambiguous or mismatched context;
- classify and minimize customer, payment, tax, document, staff, and integration data;
- protect sensitive data in transit, at rest, in logs, events, projections, exports, and AI prompts through frozen policy;
- validate replay, stale input, idempotency, and correlation controls for consequential writes;
- submit critical authorization, pricing, stock, order, payment, refund, tax, document, return, transfer, setup, and permission actions to Audit Service;
- treat extensions, AI outputs, cross-OS inputs, callbacks, and external providers as untrusted until validated;
- fail closed when required security context is absent.

### 38.3 Security ownership retained externally

Core owns authentication, session and token strategy, secret standards, platform keys, canonical permission grants, security audit infrastructure, and incident governance. Commerce owns domain-specific validation and enforcement at its boundaries. Exact data classification levels, retention, approval thresholds, and external-provider controls remain deferred.

## 39. Observability Responsibilities

Commerce observability must make logical operations traceable without exposing sensitive or cross-tenant data.

### 39.1 Observability domains

- setup and readiness progression;
- catalog and pricing changes;
- Stock and Inventory Movement reconciliation;
- Transfer progress and failures;
- Order and POS progression;
- Payment and Refund outcomes;
- Tax Application and Commerce Document issuance;
- Return, Exchange, and Commercial Adjustment progression;
- contract and event processing;
- projection freshness and rebuild status;
- Marketplace extension, AI, and cross-OS boundary calls;
- authorization denial and tenant-boundary violations;
- dependency health and degraded-mode behavior.

### 39.2 Required signals

- structured operational records carrying correlation, causation, owner, scope, and outcome;
- metrics for volume, latency, failure, rejection, retry, stale projection, and reconciliation state;
- traces across logical owner transitions without treating trace context as authorization;
- health signals that distinguish Commerce Core readiness from optional dependency health;
- audit correlation that links canonical actions to Core-owned Audit Records;
- alerts based on user impact, data integrity, security, and reliability risk;
- dashboards scoped to operational responsibility and least privilege.

Signal names, metric definitions, thresholds, SLO values, retention, and tooling remain deferred.

## 40. Operational Responsibilities

### 40.1 Operational lifecycle

Commerce operations proceed through:

```text
Validate Core context
  → validate Commerce readiness and module eligibility
  → authorize Commerce action
  → validate owning-domain invariants
  → perform one canonical owner transition
  → publish owner result
  → update projections and integrations
  → reconcile or expose failure explicitly
```

### 40.2 Failure handling

- Validation and authorization failures perform no canonical write.
- Owner failures remain owner-scoped and observable.
- Partial cross-domain progress is represented explicitly and reconciled through owner contracts.
- Projection failure does not roll back a completed canonical fact.
- Optional dependency failure degrades only the dependent optional capability.
- Cross-OS, Marketplace, AI, notification, search, analytics, or reporting failure cannot make Commerce Core unavailable unless the requested operation inherently requires its own canonical Commerce owner.
- Compensation requests never authorize direct mutation of another owner's model.

### 40.3 Retry and timeout philosophy

- Reads may retry only when safe and bounded.
- Writes retry only with owner-defined idempotency and preserved actor, scope, causation, and request identity.
- Timeouts produce unknown or pending outcomes when completion cannot be proven; they do not imply failure or authorize duplicate writes.
- Human-visible operations expose truthful pending, failed, or recovery state.
- Retry counts, timeout values, backoff, and physical coordination mechanisms remain deferred.

### 40.4 Operational governance

Operational actions with data or financial consequence require traceability, authorization, recoverability, and version-aware contract handling. Runbooks, support boundaries, operational approvals, and service objectives remain deferred.

## 41. Reliability Principles

1. **Canonical writes before projections:** Source truth is committed by its owner before derived work is considered complete.
2. **Idempotency for repeatable requests:** A repeated logical request cannot create duplicate Order, Payment, Refund, Document, Movement, Transfer, Return, or Adjustment facts.
3. **Explicit partial state:** Multi-owner work never hides partial completion.
4. **Owner-local recovery:** Recovery is initiated through the owner that can validate its fact.
5. **No assumed global transaction:** Logical consistency does not depend on an unspecified distributed transaction.
6. **Reconciliation by reference:** Related owner outcomes remain traceable by stable references, correlation, and causation.
7. **Projection rebuildability:** Read models and reports can be rebuilt without changing canonical writes.
8. **Bounded retries:** Retry behavior is finite, observable, and safe for the operation.
9. **Honest timeout semantics:** Timeout is not automatically failure and never permits unsafe duplicate execution.
10. **Optional dependency isolation:** AI, Marketplace, another OS, search, analytics, notifications, and other optional consumers cannot block Commerce Core.
11. **Deterministic owner rules:** Canonical transitions remain reproducible from retained context and versions.
12. **Backward-compatible contracts:** Supported consumers are protected through version governance.
13. **Secure recovery:** Recovery never bypasses current authorization, tenant isolation, or audit obligations.
14. **Data integrity over availability:** When safe completion cannot be proven, Commerce refuses or holds the operation rather than fabricate success.
15. **Independent operability:** Commerce Core remains usable without another Operating System.

## 42. Risks

| ID | Risk | Likelihood | Impact | Proposal treatment |
|---|---|---|---|---|
| R-01 | Commerce Product is confused with Core OS Product or Marketplace Asset | Medium | High | Explicit terminology and ownership boundary |
| R-02 | Setup or readiness duplicates Core lifecycle truth | Medium | High | Commerce owns only setup and readiness contribution |
| R-03 | POS becomes a parallel Order, Payment, Stock, or Document system | Medium | High | POS owns only POS Transaction and uses owner contracts |
| R-04 | Optional modules fork Commerce Core models | Medium | High | No-parallel-truth invariant |
| R-05 | Stock position and movement history diverge | Medium | High | One Inventory owner and reconciliation invariant |
| R-06 | Order, payment, tax, document, and inventory coordination leaves hidden partial state | High | High | Explicit owner outcomes, correlation, and recovery requirements |
| R-07 | Return and Refund are conflated | Medium | High | Separate owners and explicit contracts |
| R-08 | Transfer writes Stock directly | Medium | High | Transfer owns intent; Inventory owns effects |
| R-09 | Reports or dashboards are treated as canonical facts | Medium | Medium | Disposable projection rule and source attribution |
| R-10 | Branch or Business Unit identity is duplicated inside Commerce | Low | High | Core Organization Registry references only |
| R-11 | Commerce staff becomes dependent on HR OS | Low | High | Lightweight Commerce roles remain independent |
| R-12 | CRM integration takes ownership of Commerce customers or purchase history | Medium | Medium | Optional reference/projection integration only |
| R-13 | AI or Recommendations apply consequential changes without owner validation | Medium | High | Advisory-only boundary and target-owner application |
| R-14 | Marketplace Asset gains unrestricted Commerce access | Medium | High | Entitlement, scoped activation, permission, and contract boundary |
| R-15 | Pricing, tax, rounding, or document semantics remain too ambiguous for implementation | High | High | Recorded as deferred decisions requiring ADR or detailed design |
| R-16 | Payment provider semantics are mistaken for Commerce Payment truth | Medium | High | Explicit external-provider boundary |
| R-17 | Cross-OS integration becomes a hard dependency | Low | High | Independent-operability invariant |
| R-18 | Event replay causes duplicate consequential writes | Medium | High | Events are observations; idempotent consumers and owner validation |
| R-19 | Sensitive customer, payment, tax, or document data leaks through projections or AI | Medium | High | Minimization, scope filtering, classification, and trust boundaries |
| R-20 | Very broad first milestone increases domain-modeling scope | High | Medium | Preserve domain boundaries and resolve details in governed waves |
| R-21 | Overlapping Commerce module and domain terminology creates ownership ambiguity | Medium | Medium | Domain owner matrix governs regardless of module presentation |
| R-22 | Commerce readiness becomes stale relative to Core eligibility | Medium | High | Versioned context, freshness, and separate final OS Ready coordination |

All risks are non-approving observations. Architecture Review must determine whether any becomes blocking.

## 43. Deferred Decisions

The following 40 decisions remain intentionally deferred. None changes the owner assignments in this Proposal.

### 43.1 Domain model and aggregate detail

| ID | Deferred decision |
|---|---|
| DD-01 | Final aggregate subdivision and transaction consistency boundaries within each proposed owner |
| DD-02 | Product and Variant lifecycle states, identity, merge, archive, and historic-reference rules |
| DD-03 | Category hierarchy, reuse, ordering, and archive semantics |
| DD-04 | Commerce Unit conversion, precision, versioning, and shared-Knowledge linkage |
| DD-05 | Transactional Customer matching, anonymous customer, merge, erasure, and retention rules |
| DD-06 | Commerce Document taxonomy beyond Invoice and Receipt |
| DD-07 | Commercial Adjustment taxonomy and approval classes |
| DD-08 | Whether report exports or snapshots become governed artifacts distinct from disposable projections |

### 43.2 Setup, readiness, context, and modules

| ID | Deferred decision |
|---|---|
| DD-09 | Exact Core contract for Commerce-led Business Unit selection or creation during setup |
| DD-10 | Exact Commerce readiness criteria and readiness freshness or revocation rules |
| DD-11 | Setup restart, resume, migration, setup-version upgrade, and reconfiguration semantics |
| DD-12 | Commerce Preset versioning, reapplication, conflict, and user-override rules |
| DD-13 | Commerce Module eligibility, dependency, transition, and deprecation rules |
| DD-14 | Final Workspace-, Business Unit-, and Branch-scoping matrix for each Commerce fact and command |

### 43.3 Commerce domain semantics

| ID | Deferred decision |
|---|---|
| DD-15 | Pricing precedence, stacking, effective periods, currency, rounding, and branch override semantics |
| DD-16 | Discount and Promotion eligibility, approval, budget, and usage constraints |
| DD-17 | Stock reservation, commitment, deduction, release, negative-stock, and reconciliation semantics |
| DD-18 | Inventory adjustment reasons, approval thresholds, counting, and correction rules |
| DD-19 | Order state vocabulary, completion point, cancellation, fulfillment, partial outcome, and amendment semantics |
| DD-20 | POS session, cart, cash handling, drawer, offline, suspend, resume, and recovery semantics |
| DD-21 | Payment authorization, capture, cash, split tender, partial payment, reversal, and reconciliation semantics |
| DD-22 | Refund eligibility, partial refund, provider failure, and reconciliation semantics |
| DD-23 | Tax inclusive/exclusive, rounding, exemption, compound tax, jurisdiction, correction, and reporting-period semantics |
| DD-24 | Document numbering concurrency, immutable fields, replacement, voiding, signing, delivery, and retention semantics |
| DD-25 | Return window, item condition, partial return, reason, approval, and downstream-effect semantics |
| DD-26 | Exchange valuation, replacement Order, payment difference, tax, and document semantics |
| DD-27 | Transfer reservation, dispatch, in-transit, receipt, partial receipt, loss, cancellation, and compensation semantics |
| DD-28 | Reporting definitions, freshness, accounting-grade status, time boundaries, and authorization filtering |

### 43.4 Contracts, events, intelligence, and integration

| ID | Deferred decision |
|---|---|
| DD-29 | Exact logical contract fields, error categories, compatibility periods, and idempotency semantics |
| DD-30 | Exact domain and integration event names, publication criteria, versions, ordering scopes, and replay policy |
| DD-31 | Configuration Proposal validation, conflict, expiry, partial application, rollback, and result semantics within Commerce |
| DD-32 | Marketplace extension permission model, compatibility, data access, failure isolation, and removal effects |
| DD-33 | Cross-OS reference, consent, failure, reconciliation, and feedback contracts for each integration |

### 43.5 Security, privacy, and operations

| ID | Deferred decision |
|---|---|
| DD-34 | Commerce permission catalog, role templates, delegation, approval thresholds, and field-level access |
| DD-35 | Data classification, consent, residency, retention, erasure, masking, export, and legal-hold rules by Commerce fact |
| DD-36 | SLOs, health criteria, observability signal definitions, thresholds, error budgets, and escalation policy |
| DD-37 | Operational recovery, reconciliation, support approval, and incident runbooks for multi-owner workflows |

### 43.6 Implementation choices explicitly outside this Proposal

| ID | Deferred decision |
|---|---|
| DD-38 | Physical persistence schemas, indexes, concurrency controls, and storage partitioning |
| DD-39 | API endpoint shapes, event payload schemas, transport, messaging, and coordination mechanisms |
| DD-40 | Runtime topology, scaling units, infrastructure, framework use, cloud environment, and vendor integration products |

## 44. Draft ADR Candidates

The following 22 ADR candidates are proposed for review. They are drafts only and do not create Accepted ADRs.

| ID | Draft ADR candidate | Decision to capture |
|---|---|---|
| DADR-01 | Commerce OS Independent Operating Boundary | Commerce completes its core workflow without another OS |
| DADR-02 | Commerce Capability Catalog | Accept or amend the 18 proposed capabilities |
| DADR-03 | Commerce Domain Map | Accept or amend the 16 proposed logical domains |
| DADR-04 | Commerce Core and No-Parallel-Truth Rule | Require every module and channel to use canonical Commerce owners |
| DADR-05 | Commerce Setup and Readiness Ownership | Separate Commerce setup/readiness contribution from Core lifecycle ownership |
| DADR-06 | Canonical Organization Reference Boundary | Reference Core-owned Workspace, Business Unit, Department, and Branch identities |
| DADR-07 | Commerce Catalog Ownership | Assign Product, Variant, Category, and Unit to Product Catalog |
| DADR-08 | Commerce Pricing Ownership | Assign Price, Discount, and Promotion to Pricing |
| DADR-09 | Inventory Position and Movement Ownership | Assign Stock and Inventory Movement to Inventory with reconciliation invariant |
| DADR-10 | Transfer and Inventory Separation | Assign Transfer intent to Transfers and inventory effects to Inventory |
| DADR-11 | Order and Channel Convergence | Require POS and optional channels to use the canonical Order |
| DADR-12 | POS Transaction Boundary | Assign only POS-specific state to POS |
| DADR-13 | Transactional Customer and CRM Boundary | Preserve Commerce customer ownership without CRM dependency |
| DADR-14 | Payment, Refund, Return, and Adjustment Separation | Assign monetary and commercial reversal facts to distinct owners |
| DADR-15 | Tax Application Ownership | Assign recorded Commerce tax outcomes to Taxes |
| DADR-16 | Commerce Document Ownership | Unify Invoice, Receipt, and Commerce Document ownership |
| DADR-17 | Commerce Read Models and Reporting | Keep reports and dashboards disposable and non-canonical |
| DADR-18 | Commerce Access Enforcement Boundary | Separate Core authorization grants from Commerce enforcement |
| DADR-19 | Optional Module and Marketplace Boundary | Constrain extensions to governed Commerce Core contracts |
| DADR-20 | Commerce AI Advisory Boundary | Keep AI downstream, advisory, and outside canonical Commerce writes |
| DADR-21 | Commerce Cross-OS Integration Boundary | Require optional, versioned, owner-preserving integration |
| DADR-22 | Commerce Contract, Event, and Reliability Rules | Govern owner contracts, completed-fact events, idempotency, recovery, and projection behavior |

Architecture Review may recommend consolidating, splitting, deferring, or rejecting a candidate. No candidate is Accepted until Governance workflow is completed.

## 45. Success Criteria

This Proposal is successful and ready for independent Architecture Review when reviewers can verify that:

1. The proposed architecture extends, and does not redesign, the frozen Core Platform and Business Brain baselines.
2. All 18 approved candidate capabilities have a proposed logical home and boundary.
3. All 16 approved candidate domains have clear ownership, consumption, and non-ownership rules.
4. Every mandatory canonical fact has exactly one owner.
5. All 18 canonical write models have exactly one owner.
6. Every listed Commerce lifecycle has exactly one owner.
7. Commerce Setup and Commerce readiness contribution are separated from Core lifecycle truth.
8. Commerce Product is clearly separated from Core OS Product and Marketplace Asset.
9. POS, optional modules, Marketplace Assets, AI, and cross-OS integrations cannot create parallel Commerce truth.
10. Order, POS Transaction, Payment, Refund, Return, Exchange, Commercial Adjustment, Tax Application, Commerce Document, Transfer, Stock, and Inventory Movement boundaries are unambiguous.
11. Commerce can perform its core workflow without another Operating System.
12. Product Hub, Marketplace, AI Coordinator, Business DNA, Business Brain, Recommendation Engine, and Configuration Engine retain their frozen ownership.
13. Logical contracts preserve owner validation and do not imply endpoints or transport.
14. Logical events have one owner and describe completed facts rather than commands.
15. Read models, dashboards, reports, and Core projections are explicitly non-canonical.
16. Security, observability, operational, and reliability rules preserve tenant isolation and canonical ownership.
17. Risks are visible and unresolved details are listed as deferred decisions rather than silently decided.
18. No database schema, API endpoint, event payload, messaging technology, topology, framework, cloud provider, vendor product, or implementation task has been introduced.

**Proposal recommendation:** READY FOR ARCHITECTURE REVIEW, subject to independent validation of this proposed architecture, its 22 draft ADR candidates, 40 deferred decisions, and the risks recorded above.

## References

- `docs/00-governance/` — Governance Foundation, accepted ADRs, glossary, principles, and milestone lifecycle
- `docs/01-genesis/` — Genesis v1.1
- `docs/02-core-platform/` — Core Platform approved documentation baseline v1.0.1
- `docs/03-business-brain/` — Business Brain approved documentation baseline v1.0
- `docs/04-commerce-os/00-COMMERCE-OS-DISCOVERY.md` — approved Commerce OS Discovery v0.1
- `docs/04-commerce-os/01-COMMERCE-OS-CAPABILITY-MAP.md` — approved Commerce OS Capability Map
- `docs/99-architecture-freeze/` — frozen Core Platform and Business Brain baselines
