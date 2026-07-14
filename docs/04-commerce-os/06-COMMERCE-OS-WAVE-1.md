# Commerce OS Documentation Wave 1

**Architecture baseline:** Commerce OS Proposal Baseline v0.1.1
**Documentation status:** Wave 1 — Pending Review
**Scope:** Commerce Core, domains, ownership, canonical write models, aggregate responsibilities, logical domain interactions, and Core invariants

## 1. Purpose

This document expands the approved Commerce OS Proposal Baseline v0.1.1 into the first detailed Commerce OS architecture reference.

Wave 1 documents only approved logical architecture. It does not change the Proposal, create architecture, resolve a deferred decision, or define implementation.

The document establishes:

- the approved Commerce Core;
- sixteen logical domain responsibilities and boundaries;
- canonical ownership and non-ownership rules;
- eighteen canonical write models;
- eighteen aggregate candidates and their responsibilities;
- owner-preserving domain interactions; and
- Commerce Core invariants that every later Commerce document must preserve.

## 2. Authority and Interpretation

### 2.1 Authoritative Commerce baseline

This Wave reads the following documents together:

1. `02-COMMERCE-OS-PROPOSAL.md`;
2. `04-COMMERCE-OS-PROPOSAL-PATCH-v0.1.1.md`; and
3. `05-COMMERCE-OS-RE-REVIEW.md`.

Where Proposal v0.1 text was corrected by the Patch, the Patch interpretation controls. The Re-Review approved the merged baseline with one non-blocking editorial note.

### 2.2 Governing predecessors

Commerce OS extends and remains subordinate to:

- Governance and Accepted ADR-001 through ADR-040;
- Genesis v1.1;
- Core Platform Architecture v1.0 and Documentation Baseline v1.0.1; and
- Business Brain Architecture and Documentation Baseline v1.0.

### 2.3 Documentation rule

This Wave uses logical domains, facts, write models, aggregate candidates, responsibilities, and relationships. These terms do not imply:

- physical services;
- packages or runtime boundaries;
- databases or tables;
- API resources or endpoints;
- Event payloads or messaging;
- deployment topology; or
- implementation sequence.

## 3. Scope

### 3.1 Included

- Commerce Core composition;
- domain purpose, responsibilities, ownership, consumption, production, and exclusions;
- canonical fact ownership;
- canonical write responsibilities;
- aggregate candidate responsibilities;
- interaction direction among Commerce domains;
- interaction with approved Core-owned context at the ownership boundary; and
- cross-cutting Commerce invariants.

### 3.2 Excluded

- exact lifecycle state vocabularies and transition guards;
- physical aggregate subdivision or consistency mechanisms;
- contract fields and error structures;
- Event definitions beyond approved owner-preserving interaction principles;
- read-model detail beyond its ownership boundary;
- permission catalogs and configurable role policy;
- all technology, persistence, API, messaging, deployment, vendor, and operational target choices; and
- every item in DD-01 through DD-40.

## 4. Architectural Principles

Wave 1 applies these approved principles:

1. **Domain First:** Commerce responsibilities are organized by business meaning.
2. **Canonical Ownership:** every canonical Commerce fact has one owner.
3. **Single Source of Truth:** no channel, module, projection, asset, AI output, or integration creates parallel Commerce truth.
4. **Explicit Context:** every protected operation includes actor and applicable Workspace, Business, Business Unit, Department, Branch, Commerce OS, Module, resource, Permission, Entitlement, and lifecycle context.
5. **Tenant Isolation by Default:** no Commerce fact or projection crosses Workspace scope.
6. **Contract First:** non-owners request work from the owner; they never write another domain's state.
7. **Projection Is Never Ownership:** reports, dashboards, search, analytics, Product Hub views, and other projections do not own source facts.
8. **Configuration over Code:** presets and Module Configuration select allowed behavior without creating typed Workspaces or separate Commerce applications.
9. **Independent Operating System:** Commerce completes its core workflow without another Operating System.
10. **Optional Integration:** another OS, Marketplace Asset, or optional extension enhances Commerce but cannot unlock its core operation.
11. **AI Assists, Never Owns:** AI artifacts remain advisory and outside canonical Commerce writes.
12. **Human and Owner Authority:** consequential changes remain subject to authorization, target-owner validation, and approved human-control policy.
13. **Version and Auditability:** consequential owner transitions retain sufficient version, actor, scope, causation, and traceability.
14. **Backward Compatibility:** later detail must preserve approved logical boundaries and governed Contracts.

## 5. Commerce Core

### 5.1 Definition

Commerce Core is the mandatory, coherent set of Commerce capabilities and ownership boundaries required for an independently usable Commerce OS.

Commerce Core is not one component, service, database, aggregate, deployment, or user interface. It is the stable logical foundation that every Commerce configuration, channel, Module, preset, Marketplace extension, and integration must use.

### 5.2 Commerce Core responsibility set

Commerce Core contains:

1. Commerce Setup and readiness contribution;
2. Commerce Preset and Module Configuration;
3. Product Catalog;
4. Pricing;
5. Inventory;
6. Orders;
7. Point of Sale interaction with canonical Orders;
8. Transactional Customers;
9. Payments and Refunds;
10. Taxes;
11. Invoices and Commerce Documents;
12. Returns and Commercial Adjustments;
13. Inventory Transfers;
14. Commerce Reporting and Dashboards;
15. Commerce Access enforcement; and
16. explicit Commerce Operational Scope.

### 5.3 Commerce Core owner map

```text
Setup and Configuration
  ├── Commerce Setup
  ├── Preset selection
  ├── Module Configuration
  └── Commerce Readiness contribution

Product Catalog ── Pricing
  ├── Product, Variant, Category, Unit, Product Identifier
  └── Price, Discount, Promotion

Inventory ── Transfers
  ├── Stock and Inventory Movement
  └── Transfer intent and lifecycle

Orders ── Point of Sale
  ├── canonical Order
  └── POS Transaction

Transactional Customers
  └── Transactional Customer

Payments and Refunds ── Taxes
  ├── Payment and Refund
  └── Commerce Tax Configuration and Tax Application

Invoices and Documents
  └── Invoice, Receipt, Commerce Document, numbering, templates

Returns and Adjustments
  └── Return, Exchange, Commercial Adjustment

Reporting ── Access ── Operational Scope
  ├── non-canonical operational projections
  ├── Commerce permission semantics and enforcement
  └── canonical Core context interpretation
```

### 5.4 Optional behavior relationship

Optional Modules and Extensions sit outside canonical ownership. They use Commerce Core owners to perform permitted operations.

```text
Optional experience, Module, Marketplace Asset, or integration
  → supplies authorized intent or context
  → invokes the applicable Commerce Core owner
  → owner validates and writes its fact
  → optional consumer observes the governed result
```

An optional capability may add behavior or presentation. It cannot introduce a second Product, Price, Stock, Inventory Movement, Transfer, Order, POS commercial truth, Transactional Customer, Payment, Refund, Tax Application, Commerce Document, Return, Exchange, or Commercial Adjustment.

## 6. Domain Map

The approved architecture contains sixteen logical domains.

| ID | Domain | Accountable capabilities | Canonical write models | Aggregate candidates |
|---|---|---|---:|---:|
| PD-01 | Setup and Configuration | PC-01, PC-02 | 2 | 2 |
| PD-02 | Product Catalog | PC-03 | 3 | 3 |
| PD-03 | Pricing | PC-04 | 1 | 1 |
| PD-04 | Inventory | PC-05 | 2 | 2 |
| PD-05 | Orders | PC-07 | 1 | 1 |
| PD-06 | Point of Sale | PC-08 | 1 | 1 |
| PD-07 | Transactional Customers | PC-09 | 1 | 1 |
| PD-08 | Payments and Refunds | PC-10 | 2 | 2 |
| PD-09 | Taxes | PC-11 | 1 | 1 |
| PD-10 | Invoices and Documents | PC-12 | 1 | 1 |
| PD-11 | Returns and Adjustments | PC-13 | 2 | 2 |
| PD-12 | Transfers | PC-14 | 1 | 1 |
| PD-13 | Reporting | PC-15, PC-17 | 0 | 0 |
| PD-14 | Access | PC-16 | 0 | 0 |
| PD-15 | Operational Scope | PC-06 | 0 | 0 |
| PD-16 | Extensions | PC-18 | 0 | 0 |
| **Total** | **16 domains** | **18 capabilities** | **18** | **18** |

Logical accountability does not grant a domain ownership of another domain's facts. PD-13 coordinates shared-service participation but originating domains retain source facts. PD-15 interprets canonical context but Core retains organization identity. PD-16 coordinates optional behavior but target domains retain canonical configuration and operational facts.

## 7. Domain Responsibilities and Boundaries

### 7.1 PD-01 — Setup and Configuration

**Purpose:** Establish Commerce-owned setup state and determine whether Commerce-owned operational prerequisites are satisfied.

**Owns:**

- Commerce Setup;
- Commerce Preset selection within Commerce Setup;
- Commerce Module Configuration within Commerce Setup;
- Commerce-owned billing and legal identity captured for Commerce use;
- selling-mode setup state; and
- Commerce Readiness contribution.

**Canonical write models:**

- CWM-01 Commerce Setup;
- CWM-02 Commerce Readiness Assessment.

**Aggregate candidates:**

- Commerce Setup;
- Commerce Readiness Assessment.

**Consumes:**

- authorized Product Hub setup handoff;
- Workspace and selected Business context;
- operational Business Unit and applicable Branch references;
- Core commercial, Installation, Activation, access, and lifecycle context;
- authorized Recommendation, Implementation Option, and Configuration Proposal context;
- Business context, Preset input, and target-domain application results.

**Produces:**

- canonical Commerce Setup state;
- target-owner requests for Product Catalog, Pricing, Inventory, Taxes, Invoices and Documents, or Access where applicable;
- effective Commerce Module Configuration;
- Commerce Readiness contribution; and
- setup and readiness projections for authorized consumers.

**Never owns:**

- Core Workspace, Business, Business Unit, Department, or Branch identity;
- Entitlement, OS Subscription, Installation, Activation, billing, or final Operating System Ready outcome;
- Product, Category, Variant, Unit, Product Identifier, Price, Stock, Tax, or Document target facts;
- Configuration Proposal; or
- Marketplace lifecycle state.

**Boundary rules:**

1. Commerce Setup is Business Unit-scoped and is not a child of Branch.
2. Setup may collect or recommend target-domain input but cannot write target-domain facts.
3. Setup applies a Configuration Proposal only when it targets Setup-owned state.
4. Readiness covers Commerce-owned prerequisites only; final Operating System Ready remains a frozen cross-owner outcome.
5. Preset application never hardcodes workflows or creates a separate OS boundary.
6. Exact setup inputs, state transitions, restart, migration, and readiness criteria remain deferred.

### 7.2 PD-02 — Product Catalog

**Purpose:** Own the sellable Commerce catalog used consistently by all Commerce channels and operational domains.

**Owns:**

- Product;
- Variant;
- Category;
- Unit; and
- Product Identifier.

**Canonical write models:**

- CWM-03 Product;
- CWM-04 Category;
- CWM-05 Commerce Unit.

**Aggregate candidates:**

- Product, including Variant and Product Identifier responsibility;
- Category;
- Commerce Unit.

**Consumes:**

- authorized organization context;
- customer-entered or Setup-originated catalog intent;
- permitted Business context and Knowledge references;
- target-domain Configuration Proposals; and
- authorized extension input.

**Produces:**

- canonical Product, Variant, Category, Unit, and Product Identifier facts;
- catalog selection information for Pricing, Inventory, Orders, POS, Taxes, Documents, Reporting, and Extensions; and
- owned catalog transitions for downstream projections.

**Never owns:**

- Core OS Product or Plan;
- Marketplace Asset;
- shared Capability or Knowledge definitions;
- Price;
- Stock;
- Order; or
- another OS's catalog.

**Boundary rules:**

1. A Commerce Product is a sellable Commerce record, not a Core OS Product.
2. Variant and Product Identifier remain within the Product logical boundary.
3. Category classifies Products but does not acquire Product ownership.
4. Unit expresses Commerce operational meaning; shared semantic Knowledge remains Knowledge-owned.
5. Setup and presets seed only through Product Catalog ownership.
6. Identifier type, uniqueness, reuse, merge, archive, and historic behavior remain deferred.

### 7.3 PD-03 — Pricing

**Purpose:** Own Commerce selling-price, discount, and promotion definitions and determine applicable commercial terms.

**Owns:**

- Price;
- Discount; and
- Promotion.

**Canonical write model:** CWM-06 Commerce Pricing.

**Aggregate candidate:** Commerce Pricing.

**Consumes:**

- Product and Variant references;
- explicit Business Unit and applicable Branch scope;
- authorized price input;
- applicable policy and version context;
- permitted configuration requests; and
- extension eligibility input where approved.

**Produces:**

- canonical Price, Discount, and Promotion definitions;
- applicable pricing determination for Orders, POS, Returns, Taxes, Documents, and Reporting; and
- owned pricing transitions.

**Never owns:**

- Core Plan price or billing;
- Product;
- Order;
- an Order's retained applied commercial terms;
- Tax Application; or
- Recommendation.

**Boundary rules:**

1. Pricing owns definitions; Order owns the applied commercial snapshot retained in Order history.
2. A Recommendation or AI artifact may suggest a pricing action but cannot apply it.
3. Branch and Business Unit applicability is explicit.
4. Precedence, stacking, currency, rounding, effective-period, and override behavior remain deferred.

### 7.4 PD-04 — Inventory

**Purpose:** Own current Commerce Stock and the attributable Inventory Movements that explain every Stock change.

**Owns:**

- Stock; and
- Inventory Movement.

**Canonical write models:**

- CWM-07 Inventory Position;
- CWM-08 Inventory Movement.

**Aggregate candidates:**

- Inventory Position;
- Inventory Movement.

**Consumes:**

- Product or Variant reference;
- explicit Business, Business Unit, and Branch context;
- owner-directed Inventory effect request from Orders, Returns and Adjustments, Transfers, authorized Setup, or an approved Extension; and
- source cause, actor, authorization, correlation, and version context.

**Produces:**

- canonical Stock position;
- attributable Inventory Movement;
- Inventory effect result for the requesting domain; and
- Stock and movement information for authorized read models.

**Never owns:**

- Product;
- Branch identity;
- Order;
- Return;
- Transfer intent;
- another OS's inventory; or
- a requesting domain's lifecycle.

**Boundary rules:**

1. Stock is current position; Inventory Movement is attributable change history.
2. Both facts have one owner and must remain reconcilable.
3. No other domain edits Stock directly.
4. Transfer, Order, Return, Setup, and Extension concerns request effects through Inventory ownership.
5. Reservation, commitment, release, negative Stock, adjustment policy, counting, and correction behavior remain deferred.

### 7.5 PD-05 — Orders

**Purpose:** Own the single canonical Commerce Order lifecycle across every Commerce channel.

**Owns:** Order.

**Canonical write model:** CWM-10 Commerce Order.

**Aggregate candidate:** Commerce Order.

**Consumes:**

- Product and Variant selection;
- applicable pricing determination;
- Stock information;
- Transactional Customer reference where applicable;
- channel intent;
- Tax Application;
- Payment outcome;
- Document reference;
- Return or Adjustment relationship; and
- explicit authorized context.

**Produces:**

- canonical Order state and history;
- retained applied commercial terms;
- owner-directed requests for inventory, tax, payment, document, and other permitted effects; and
- Order information for projections and optional channels.

**Never owns:**

- POS Transaction;
- Product, Price definition, or Stock;
- Payment or Refund;
- Tax Application;
- Invoice or Receipt;
- Return, Exchange, or Commercial Adjustment; or
- channel-specific extension truth.

**Boundary rules:**

1. POS, Online Store, Delivery, Kitchen, and every optional channel converge on one Order truth.
2. Order references owner results and never writes another owner's model.
3. Applied Price terms become Order history without transferring Pricing definition ownership.
4. Completion, fulfillment, cancellation, partial result, and amendment semantics remain deferred.

### 7.6 PD-06 — Point of Sale

**Purpose:** Coordinate authorized in-person Commerce activity through Commerce Core and own POS-specific interaction state.

**Owns:** POS Transaction.

**Canonical write model:** CWM-11 POS Transaction.

**Aggregate candidate:** POS Transaction.

**Consumes:**

- Core-authenticated actor and Commerce Access result;
- selected Business, operational Business Unit, and Branch context;
- Product Catalog, Pricing, Stock, Customer, Order, Tax, Payment, and Document owner results; and
- effective Module Configuration.

**Produces:**

- canonical POS Transaction state;
- owner-directed Order, monetary, tax, inventory, and document requests; and
- references to completed canonical Commerce outcomes.

**Never owns:**

- Product;
- Order;
- Stock or Inventory Movement;
- Payment or Refund;
- Tax Application;
- Invoice or Receipt; or
- Core actor, Branch, or permission truth.

**Boundary rules:**

1. POS is a Commerce capability and workflow, not a separate commercial system.
2. POS-specific state cannot become a second Order or sale source.
3. Interaction or optimistic presentation state is not canonical completion.
4. Session, cart, offline, device, cash-drawer, and recovery semantics remain deferred.

### 7.7 PD-07 — Transactional Customers

**Purpose:** Own the Commerce customer fact necessary for Commerce transactions and purchase-facing history.

**Owns:** Transactional Customer.

**Canonical write model:** CWM-12 Transactional Customer.

**Aggregate candidate:** Transactional Customer.

**Consumes:**

- authorized customer input;
- Workspace, Business, Business Unit, and applicable Branch context;
- transaction references; and
- permitted privacy and consent context.

**Produces:**

- canonical Transactional Customer;
- customer reference for Orders, POS, Payments, Documents, Returns, and Reporting; and
- derived purchase-facing history from canonical Commerce facts.

**Never owns:**

- Core User identity;
- CRM lead, opportunity, campaign, pipeline, or follow-up;
- Order or Payment;
- another OS's customer or patient fact; or
- a separately mutable purchase-history ledger.

**Boundary rules:**

1. Commerce works without CRM OS.
2. Optional CRM integration exchanges governed references or projections only.
3. Customer matching, anonymous treatment, merge, erasure, retention, and CRM linkage remain deferred.

### 7.8 PD-08 — Payments and Refunds

**Purpose:** Own Commerce monetary collection and monetary reversal facts while preserving external provider boundaries.

**Owns:**

- Payment;
- Refund.

**Canonical write models:**

- CWM-13 Commerce Payment;
- CWM-14 Commerce Refund.

**Aggregate candidates:**

- Commerce Payment;
- Commerce Refund.

**Consumes:**

- payable or refundable Commerce reference;
- actor, scope, authorization, and tender context;
- external provider outcome where applicable;
- Return or Adjustment refund request; and
- correlation and idempotency context.

**Produces:**

- canonical Payment or Refund outcome;
- monetary result for Orders, POS, Returns, Documents, and Reporting; and
- traceable provider reference without owning provider truth.

**Never owns:**

- Core billing;
- external provider or settlement truth;
- Order;
- Return or Exchange;
- Tax Application; or
- Commerce Document.

**Boundary rules:**

1. Refund is monetary reversal; Return is a commercial reversal decision.
2. Returns and Adjustments requests Refund; Payments and Refunds alone records its outcome.
3. Payment-provider state does not replace Commerce Payment truth.
4. Authorization, capture, settlement observation, split tender, partial payment, cash, reconciliation, and provider-failure semantics remain deferred.

### 7.9 PD-09 — Taxes

**Purpose:** Own Commerce Tax Configuration and the deterministic, reproducible Tax Application recorded for a commercial operation.

**Owns:**

- Commerce Tax Configuration; and
- Tax Application.

**Canonical write model:** CWM-15 Taxes-owned logical write boundary.

**Aggregate candidate:** Tax Application.

**Consumes:**

- Setup-collected tax input routed to Taxes;
- Product, Price, Order, Customer, and jurisdiction context;
- applicable Knowledge and deterministic Rule outcomes;
- explicit Business, Business Unit, and Branch context; and
- authorized correction or reversal intent.

**Produces:**

- canonical Commerce Tax Configuration;
- canonical Tax Application with retained source and Rule-version traceability;
- tax result for Orders, POS, Documents, Returns, and Reporting; and
- owned tax transitions.

**Never owns:**

- external law, government authority, shared Knowledge, or Rule;
- Product, Price, Order, or Customer;
- Commerce Document; or
- Core configuration truth.

**Boundary rules:**

1. Setup collects input; Taxes validates and writes tax state.
2. Tax Application is reproducible from retained governed inputs and versions.
3. Order and Commerce Document reference Taxes-owned results.
4. Final aggregate subdivision between Tax Configuration and Tax Application remains deferred.
5. Inclusive/exclusive behavior, rounding, exemption, compound tax, jurisdiction, correction, and reporting-period semantics remain deferred.

### 7.10 PD-10 — Invoices and Documents

**Purpose:** Own Commerce Document configuration and the issuance lifecycle of Invoice, Receipt, and other Commerce Documents.

**Owns:**

- Commerce Document;
- Invoice;
- Receipt;
- document numbering; and
- Commerce Document Template configuration.

**Canonical write model:** CWM-16 Commerce Document.

**Aggregate candidate:** Commerce Document.

**Consumes:**

- Setup-collected numbering and template input routed to the domain;
- Order, Transactional Customer, Payment, Refund, Tax Application, Return, and Adjustment references as applicable;
- Commerce billing and legal identity;
- localization context; and
- authorized issuance, replacement, or void intent.

**Produces:**

- canonical Invoice, Receipt, and Commerce Document;
- owned numbering and template configuration;
- document references for source domains and projections; and
- traceable document lifecycle outcomes.

**Never owns:**

- Order, Customer, Payment, Refund, Tax Application, Return, or Adjustment;
- external tax authority or legal registry;
- another OS's document; or
- a source fact merely because it appears on a document.

**Boundary rules:**

1. Invoice and Receipt are Commerce Document types under one owner.
2. Setup gathers or recommends configuration; Invoices and Documents validates and writes it.
3. Issued history remains traceable to its sources and versions.
4. Document taxonomy, numbering concurrency, immutable fields, correction instruments, signing, delivery, and retention remain deferred.

### 7.11 PD-11 — Returns and Adjustments

**Purpose:** Own the commercial reversal and correction intent represented by Return, Exchange, and Commercial Adjustment.

**Owns:**

- Return;
- Exchange;
- Commercial Adjustment.

**Canonical write models:**

- CWM-17 Commerce Return;
- CWM-18 Commercial Adjustment.

**Aggregate candidates:**

- Commerce Return, including Exchange responsibility;
- Commercial Adjustment.

**Consumes:**

- original Order and relevant commercial references;
- actor, authorization, reason, policy, and scope;
- Payment, Tax Application, Inventory, and Document information; and
- permitted customer-service or POS intent.

**Produces:**

- canonical Return, Exchange, or Commercial Adjustment;
- owner-directed requests for Refund, Inventory, Tax, Document, or replacement Order effects; and
- correlated reversal or correction outcome.

**Never owns:**

- original Order;
- Refund or Payment;
- Stock or Inventory Movement;
- Tax Application;
- Invoice, Receipt, or replacement Order.

**Boundary rules:**

1. Commercial reversal intent is separate from monetary, inventory, tax, document, and Order effects.
2. Other owners perform their own requested effects.
3. Return, Exchange, and Adjustment retain reason, actor, scope, and authorization traceability.
4. Windows, conditions, partial behavior, valuation, approval thresholds, tax, and document treatment remain deferred.

### 7.12 PD-12 — Transfers

**Purpose:** Own Transfer intent and lifecycle between canonical operational Branch scopes.

**Owns:** Transfer.

**Canonical write model:** CWM-09 Inventory Transfer.

**Aggregate candidate:** Inventory Transfer.

**Consumes:**

- Product or Variant reference;
- Stock information;
- Core-owned source and destination Branch references;
- actor, authorization, and scope;
- Inventory effect results.

**Produces:**

- canonical Transfer intent and state;
- source and destination Inventory effect requests;
- reconciliation of Inventory-owned results into Transfer state; and
- Transfer information for authorized projections.

**Never owns:**

- Branch identity;
- Stock;
- Inventory Movement;
- Order; or
- non-Commerce logistics truth.

**Boundary rules:**

1. Transfer owns business intent; Inventory owns every Stock effect.
2. Source and destination remain canonical Core Branch references.
3. Partial or failed effects are explicit and cannot be hidden by projections.
4. Reservation, dispatch, transit, receipt, partial receipt, loss, cancellation, and compensation remain deferred.

### 7.13 PD-13 — Reporting

**Purpose:** Build authorized Commerce operational read models, dashboards, and reports and coordinate Commerce participation in shared Core projections.

**Owns logically:**

- Commerce Operational Report definitions;
- Commerce read-model projection construction and rebuild behavior;
- projection freshness, completeness, and quality state;
- authorized report presentation lifecycle; and
- PC-17 shared-service participation coordination.

**Canonical write models:** None.

**Aggregate candidates:** None.

**Consumes:**

- authorized, versioned Commerce facts and owner-produced transitions;
- explicit Workspace, Business, Business Unit, Department, Branch, user, Permission, and resource context;
- freshness and source-version information; and
- source-specific projection input governed by each canonical owner.

**Produces:**

- Commerce operational dashboards and reports;
- domain-specific operational read models;
- projection health and freshness signals; and
- coordinated owner-directed input to Core Audit, Notification, Search, and Analytics services.

**Never owns:**

- a source Commerce fact;
- a canonical write model;
- authorization truth;
- Audit Record, Notification, Search Index, or platform Analytics projection;
- Product Hub source state; or
- Business Brain Decision or Recommendation.

**Boundary rules:**

1. Commerce Operational Reports are projections, not canonical facts.
2. Reporting coordination does not transfer originating-domain fact ownership.
3. A report correction changes only the projection unless the canonical owner independently corrects its fact.
4. A projection may be rebuilt without source write access.
5. Exact report definitions, snapshots, exports, freshness targets, and accounting-grade status remain deferred.

### 7.14 PD-14 — Access

**Purpose:** Define Commerce permission semantics and enforce Commerce resource invariants against verified Core authorization context.

**Owns logically:**

- Commerce permission-resource and action semantics;
- Commerce operational role definitions;
- Commerce resource invariants;
- interpretation of Core authorization context for a Commerce action; and
- runtime Commerce authorization result.

**Canonical write models:** None approved in this baseline.

**Aggregate candidates:** None approved in this baseline.

**Consumes:**

- Core-authenticated actor;
- Workspace Membership and canonical grants;
- selected Business and operational organization context;
- Commerce OS, Module, resource, action, Entitlement, Subscription, and lifecycle context; and
- applicable Commerce domain invariant.

**Produces:**

- runtime allow or deny result for the target Commerce action;
- effective Commerce role interpretation; and
- authorization evidence eligible for Core Audit Service.

**Never owns:**

- User identity or session;
- Workspace Membership;
- canonical Permission grant or assignment;
- Core organization identity;
- HR employee profile; or
- target Commerce business fact.

**Boundary rules:**

1. Authentication never implies authorization.
2. Navigation visibility never substitutes for authorization.
3. Commerce roles do not require HR OS.
4. Runtime authorization result is an evaluated decision, not a canonical Commerce business record.
5. Configurable role templates, delegation, approval thresholds, and field-level access remain DD-34.

### 7.15 PD-15 — Operational Scope

**Purpose:** Interpret frozen Core context for Commerce operations without duplicating the organization graph.

**Owns logically:** Commerce interpretation and validation of applicable operational context.

**Canonical write models:** None.

**Aggregate candidates:** None.

**Consumes:**

- Core-owned Workspace;
- selected Business;
- Business Unit;
- applicable Department and Branch;
- canonical ancestry;
- OS, Module, resource, Entitlement, and lifecycle context.

**Produces:**

- validated context for Setup, Inventory, POS, Transfers, Reporting, Access, and every other protected Commerce operation; and
- context-mismatch or missing-context outcome.

**Never owns:**

- Workspace, Business, Business Unit, Department, or Branch identity;
- organization ancestry;
- Core membership or Permission grant; or
- a target domain's operational fact.

**Boundary rules:**

1. Business and Business Unit remain distinct.
2. Context is never inferred only from route or UI state.
3. Context switching and handoff require reauthorization.
4. Fact-by-fact scope and exact context-switch behavior remain DD-14.

### 7.16 PD-16 — Extensions

**Purpose:** Coordinate optional Commerce Module, Marketplace, AI, and cross-OS behavior through canonical Commerce owners.

**Owns logically:** optional-extension coordination and invocation only.

**Canonical write models:** None.

**Aggregate candidates:** None.

**Consumes:**

- effective Commerce Module Configuration from Setup and Configuration;
- Marketplace eligibility and Asset context;
- applicable canonical Commerce facts or projections;
- authorized AI advisory artifact;
- optional other-OS integration context; and
- target-owner operation result.

**Produces:**

- authorized target-owner invocation;
- optional experience or behavior composed from canonical results;
- failure-isolated extension outcome; and
- governed feedback where permitted.

**Never owns:**

- Commerce Module Configuration;
- Marketplace Asset or lifecycle state;
- target-domain configuration;
- another OS's fact;
- AI artifact;
- Product, Price, Stock, Order, Payment, Tax, Document, Return, or Transfer truth.

**Boundary rules:**

1. Extensions are optional and cannot unlock Commerce Core.
2. Extensions cannot bypass Access or target-domain validation.
3. Failure, pause, upgrade, or removal cannot corrupt canonical Commerce truth.
4. Future extension-specific canonical state, compatibility, data access, and removal effects remain DD-32.

## 8. Canonical Ownership Model

### 8.1 Ownership meaning

The owner is the only domain permitted to validate and change a canonical fact through its governed responsibility. A consumer may reference, project, request, explain, or display the fact. Those activities never create write authority.

### 8.2 Canonical Commerce facts

| Canonical fact or responsibility | Exactly one owner | Key non-owner rule |
|---|---|---|
| Commerce Setup | Setup and Configuration | Product Hub hands off but never performs setup |
| Commerce Preset selection | Setup and Configuration | Business activity may suggest but never owns it |
| Commerce Module Configuration | Setup and Configuration | Extensions consume but never own it |
| Commerce Readiness contribution | Setup and Configuration | Core coordinates final Operating System Ready |
| Product | Product Catalog | Not Core OS Product or Marketplace Asset |
| Variant | Product Catalog | Pricing and Inventory reference only |
| Category | Product Catalog | Setup may seed only through Product Catalog |
| Unit | Product Catalog | Shared semantics remain Knowledge-owned |
| Product Identifier | Product Catalog | Type and uniqueness remain deferred |
| Price | Pricing | Order preserves applied terms without owning definition |
| Discount | Pricing | Consumers apply but do not redefine |
| Promotion | Pricing | Modules provide eligible input only |
| Stock | Inventory | No other domain edits current position |
| Inventory Movement | Inventory | Requesting domain retains cause lifecycle only |
| Transfer | Transfers | Inventory owns resulting Stock effects |
| Order | Orders | Every channel converges here |
| POS Transaction | Point of Sale | Does not duplicate Order or Payment |
| Transactional Customer | Transactional Customers | CRM relationship workflows remain external |
| Payment | Payments and Refunds | Provider record remains external |
| Refund | Payments and Refunds | Return remains separately owned |
| Commerce Tax Configuration | Taxes | Setup collects input only |
| Tax Application | Taxes | Shared Rules and law remain external |
| Invoice | Invoices and Documents | References source facts without owning them |
| Receipt | Invoices and Documents | Does not own Payment |
| Commerce Document | Invoices and Documents | Source facts retain their owners |
| document numbering | Invoices and Documents | Setup collects input only |
| Commerce Document Template configuration | Invoices and Documents | Shared Knowledge remains external where applicable |
| Return | Returns and Adjustments | Refund and Stock effects remain external |
| Exchange | Returns and Adjustments | Replacement Order remains Orders-owned |
| Commercial Adjustment | Returns and Adjustments | Each affected owner performs its effect |

### 8.3 Non-canonical and external responsibilities

| Responsibility | Owner | Classification |
|---|---|---|
| Commerce Operational Reports | Reporting | non-canonical read models and projections |
| Commerce authorization result | Access | runtime evaluated decision, not canonical Commerce business fact |
| operational context interpretation | Operational Scope | validation result over Core-owned context |
| extension coordination | Extensions | orchestration without target ownership |
| Workspace | Core Workspace Management | external canonical context |
| Business | Core Business Registry | external canonical context |
| Business Unit, Department, Branch | Core Organization Registry | external canonical context |
| OS Subscription, Entitlement, Installation, Activation | applicable Core owner | external commercial and lifecycle truth |
| Operating System Ready | frozen cross-owner lifecycle outcome | not Commerce Readiness contribution |
| Recommendation | Recommendation Engine | advisory external fact |
| Configuration Proposal | Configuration Engine | external proposal; target owner applies state |
| Marketplace Asset and lifecycle | Marketplace | external ecosystem truth |
| AI artifact | AI Coordinator | advisory external artifact |
| Audit Record, Notification, Search Index, platform Analytics projection | applicable Core shared service | external shared-service record |

### 8.4 Ownership invariants

1. A fact has one owner even when many domains collaborate in its lifecycle.
2. A domain cannot write another domain's aggregate.
3. A reference never transfers ownership.
4. A projection never transfers ownership.
5. A Configuration Proposal never transfers target ownership.
6. A completed target application is owned by the target domain, not Configuration Engine.
7. A source owner governs the meaning of its published fact.
8. A channel owns channel-specific state only.
9. A business intent and its downstream effects may have different owners.
10. External provider state never replaces Commerce truth.

## 9. Canonical Write Models

### 9.1 Write-model rules

A canonical write model:

- belongs to exactly one domain;
- accepts change only through owner validation;
- retains explicit actor, context, version, and causation appropriate to the fact;
- is not written through a read model, report, UI state, AI artifact, or extension;
- reports cross-domain results without transferring ownership; and
- does not imply a physical aggregate, table, transaction, or service.

### 9.2 Write-model catalog

| ID | Canonical write model | Owner | Includes | Excludes |
|---|---|---|---|---|
| CWM-01 | Commerce Setup | Setup and Configuration | Setup, Preset selection, Module Configuration, legal/billing identity, selling mode | Core lifecycle state and target-domain facts |
| CWM-02 | Commerce Readiness Assessment | Setup and Configuration | Commerce-owned readiness contribution and unmet Commerce prerequisites | final Operating System Ready result |
| CWM-03 | Product | Product Catalog | Product, Variant, Product Identifier responsibility | Price, Stock, Core OS Product |
| CWM-04 | Category | Product Catalog | Commerce category classification | Product ownership |
| CWM-05 | Commerce Unit | Product Catalog | Commerce operational Unit | shared Knowledge ownership |
| CWM-06 | Commerce Pricing | Pricing | Price, Discount, Promotion | Order's retained applied terms and Core Plan price |
| CWM-07 | Inventory Position | Inventory | current scoped Stock | Transfer or Order lifecycle |
| CWM-08 | Inventory Movement | Inventory | attributable Stock effect | source business intent ownership |
| CWM-09 | Inventory Transfer | Transfers | Transfer intent and state | Stock and Inventory Movement writes |
| CWM-10 | Commerce Order | Orders | canonical Order and retained applied commercial terms | Payment, Tax, Document, Return, POS state |
| CWM-11 | POS Transaction | Point of Sale | POS-specific interaction state and owner-result references | Order, Payment, Stock, Tax, Document truth |
| CWM-12 | Transactional Customer | Transactional Customers | Commerce transaction-facing customer fact | Core identity and CRM workflow |
| CWM-13 | Commerce Payment | Payments and Refunds | Commerce monetary collection outcome | provider settlement truth |
| CWM-14 | Commerce Refund | Payments and Refunds | Commerce monetary reversal outcome | Return and Adjustment decision |
| CWM-15 | Taxes-owned logical write boundary | Taxes | Commerce Tax Configuration and Tax Application | shared Rule, law, Product, Order, Document ownership |
| CWM-16 | Commerce Document | Invoices and Documents | Invoice, Receipt, other Commerce Document, numbering, template configuration | source Commerce facts |
| CWM-17 | Commerce Return | Returns and Adjustments | Return and Exchange responsibility | Refund, Stock effect, replacement Order |
| CWM-18 | Commercial Adjustment | Returns and Adjustments | adjustment reason, authorization, and effect requests | direct writes to affected owners |

### 9.3 Write-model interaction rule

```text
Non-owner intent
  → Access and Operational Scope validation
  → owning domain validation
  → one canonical write model transition
  → owner result
  → non-owner projection or follow-up request
```

The consistency mechanism for a multi-owner business operation remains deferred. The owner boundary does not.

## 10. Aggregate Responsibilities

### 10.1 Aggregate interpretation

Aggregate candidates describe logical invariant and consistency responsibility. They do not approve physical persistence, transaction size, locking, partitioning, or service boundaries.

### 10.2 Aggregate catalog

| Aggregate candidate | Owner | Responsible for | Must not contain or own |
|---|---|---|---|
| Commerce Setup | Setup and Configuration | Setup, Preset selection, Module Configuration, Setup-owned identity and selling mode | target-domain facts or Core lifecycle truth |
| Commerce Readiness Assessment | Setup and Configuration | evaluation of Commerce-owned prerequisites | final Operating System Ready outcome |
| Product | Product Catalog | Product, Variant, Product Identifier lifecycle and invariants | Price or Stock |
| Category | Product Catalog | Commerce catalog classification | Product lifecycle |
| Commerce Unit | Product Catalog | Commerce operational Unit definition | shared Knowledge lifecycle |
| Commerce Pricing | Pricing | Price, Discount, Promotion definition and eligibility | Order history |
| Inventory Position | Inventory | current Stock position at explicit scope | Transfer or Order intent |
| Inventory Movement | Inventory | attributable Stock effect | source business lifecycle |
| Inventory Transfer | Transfers | Transfer intent, scope, and owner-result reconciliation | direct Stock writes |
| Commerce Order | Orders | Order intent, state, lines, and retained applied terms | Payment, Tax, Document, Return, POS truth |
| POS Transaction | Point of Sale | POS-specific interaction and completion references | parallel Order or sale truth |
| Transactional Customer | Transactional Customers | Commerce customer identity and transaction-facing attributes | CRM relationship workflow |
| Commerce Payment | Payments and Refunds | monetary collection record and outcome | provider settlement truth |
| Commerce Refund | Payments and Refunds | monetary reversal record and outcome | Return or Adjustment decision |
| Tax Application | Taxes | applied tax result and traceability | external Rule or law ownership |
| Commerce Document | Invoices and Documents | Invoice, Receipt, document issuance and approved document-domain configuration | Order, Payment, Tax, Return truth |
| Commerce Return | Returns and Adjustments | Return and Exchange intent and lifecycle | Refund, Stock, Tax, Document, replacement Order writes |
| Commercial Adjustment | Returns and Adjustments | adjustment reason, approval, and requested effects | direct target-domain writes |

### 10.3 Approved nesting and separation

- Variant and Product Identifier are responsibilities within Product.
- Exchange is governed within Commerce Return.
- Invoice and Receipt are types within Commerce Document.
- Price, Discount, and Promotion are within Commerce Pricing.
- Commerce Tax Configuration is within the Taxes-owned write boundary; its final aggregate subdivision remains deferred.
- Reporting, Access, Operational Scope, and Extensions introduce no aggregate candidate in this baseline.

### 10.4 Aggregate invariants

1. An aggregate candidate has one owner.
2. One aggregate never embeds another domain's canonical fact as owned state.
3. Cross-domain relationships use stable references and owner outcomes.
4. Historic references preserve the meaning required by the owning lifecycle.
5. Reclassification or subdivision cannot change domain ownership without Governance.

## 11. Domain Interactions

### 11.1 Interaction rules

1. A non-owner communicates intent; the owner decides whether its invariant permits a change.
2. Every protected interaction carries explicit context and current authorization.
3. Cross-domain completion may be partial, pending, failed, or compensating; hidden success is prohibited.
4. A timeout does not prove failure and cannot authorize a duplicate write.
5. A projection or report never drives an unvalidated canonical write.
6. Optional integration failure cannot corrupt or disable Commerce Core.
7. Interaction detail must not resolve DD-01, DD-29, DD-30, DD-36, or DD-37.

### 11.2 Setup interaction

```text
Product Hub handoff
  → Access validates actor, Core lifecycle, and context
  → Operational Scope validates Workspace / Business / Business Unit / Branch as applicable
  → Setup records Setup-owned choices
  → Setup submits target-domain intent
      ├── Product Catalog owns catalog seed outcome
      ├── Pricing owns pricing outcome
      ├── Inventory owns opening inventory effect
      ├── Taxes owns tax configuration
      ├── Invoices and Documents owns numbering and template configuration
      └── Access retains Commerce permission semantics
  → Setup observes target results
  → Setup evaluates Commerce Readiness contribution
  → Core coordinates final Operating System Ready outcome
```

No target result is written by Setup.

### 11.3 Sale interaction

```text
Authorized channel intent
  → Product Catalog supplies catalog facts
  → Pricing supplies applicable commercial terms
  → Transactional Customers supplies optional customer reference
  → Orders owns canonical Order transition
  → Taxes owns Tax Application
  → Payments and Refunds owns Payment outcome
  → Inventory owns Inventory Movement and Stock result
  → Invoices and Documents owns Invoice or Receipt
  → channel records only its channel-specific result
  → Reporting builds authorized projections
```

The exact timing and consistency mechanism among these owners remains deferred.

### 11.4 POS interaction

```text
POS validates actor and Branch context
  → POS coordinates approved Commerce Core interactions
  → Orders writes Order
  → Taxes writes Tax Application
  → Payments and Refunds writes Payment
  → Inventory writes Inventory Movement and Stock
  → Invoices and Documents writes Receipt or Invoice
  → POS writes POS Transaction with owner-result references
```

POS never becomes a second writer for any referenced fact.

### 11.5 Return and Exchange interaction

```text
Authorized reversal intent
  → Returns and Adjustments writes Return or Exchange
  → Payments and Refunds may write Refund
  → Inventory may write Inventory Movement and Stock result
  → Taxes may write governed Tax Application correction
  → Invoices and Documents may write resulting Commerce Document
  → Orders may write a permitted Order transition or replacement Order
  → Returns and Adjustments observes correlated owner outcomes
```

Return is not Refund. Exchange is not replacement Order. The owner of each result remains unchanged.

### 11.6 Commercial Adjustment interaction

```text
Authorized adjustment intent
  → Returns and Adjustments writes Commercial Adjustment
  → affected domain independently validates requested effect
  → affected domain writes only its fact
  → Commercial Adjustment observes effect result
```

Adjustment taxonomy, approval, and effect detail remain deferred.

### 11.7 Transfer interaction

```text
Authorized transfer intent
  → Operational Scope validates source and destination Branch references
  → Transfers writes Transfer
  → Transfers requests source and destination Inventory effects
  → Inventory writes Inventory Movements and Stock results
  → Transfers reconciles owner results into Transfer state
  → Reporting projects Transfer and Stock outcomes
```

Transfer never edits Stock directly.

### 11.8 Reporting and shared-service interaction

```text
Canonical Commerce owner completes a fact
  → owner supplies authorized source-specific projection input
  → Reporting builds Commerce operational projection
  → Reporting coordinates shared-service participation where applicable
  → Core Audit / Notification / Search / Analytics owner creates its own record
```

Reporting does not become the source owner. A projection-health change is an observability signal, not a canonical Commerce transition.

### 11.9 Configuration Proposal interaction

```text
Configuration Engine owns Configuration Proposal
  → applicable Commerce target owner validates proposal, context, version, authorization, and invariants
  → target owner accepts, rejects, expires, or applies under deferred policy
  → target owner owns any applied target state
  → target owner produces application result
```

Setup participates only when the proposal targets Setup-owned state.

### 11.10 Extension interaction

```text
Extension receives effective eligibility and Module Configuration
  → Access validates permitted action
  → extension invokes canonical target owner
  → target owner writes canonical fact
  → extension consumes owner result
```

Marketplace, AI, or another OS retains ownership of its external fact. The extension owns no target Commerce fact.

## 12. Dependency Direction

### 12.1 Allowed logical direction

```text
Core-owned context
  → Operational Scope and Access
  → Setup or Commerce experience
  → applicable canonical Commerce owner
  → owner result
  → Reporting and optional external consumers
```

### 12.2 Domain dependency rules

- Product Catalog supplies references to Pricing, Inventory, Orders, POS, Taxes, Documents, Reporting, and Extensions.
- Pricing supplies applicable terms to Orders, POS, Returns, Taxes, Documents, and Reporting.
- Inventory accepts effect requests from approved domains but does not depend on their write models.
- Orders references owner outcomes without acquiring their state.
- POS depends on Commerce Core owner interactions and owns only POS Transaction.
- Returns and Transfers coordinate effects without writing affected domains.
- Reporting depends on completed source facts and never becomes a write dependency of canonical domains.
- Access and Operational Scope guard actions but never acquire target facts.
- Extensions depend on canonical owner boundaries; canonical owners do not depend on Extensions for core operation.

### 12.3 Prohibited dependency direction

- canonical owner → read model as write authority;
- canonical owner → optional extension for core completion;
- Commerce domain → another domain's private data store;
- Commerce OS → another OS for core workflow;
- Commerce write → AI artifact without independent target validation;
- target domain → Configuration Engine as target-state owner;
- Product Hub → Commerce domain state mutation; and
- cyclic ownership in which each domain claims the other's fact.

## 13. Core Invariants

### 13.1 Context invariants

1. Workspace is the tenant boundary.
2. Business and Business Unit remain distinct.
3. Every operational Business Unit resolves under one selected Business context.
4. Business Unit, Department, and Branch identities remain Core-owned.
5. Commerce Setup is Business Unit-scoped and not a Branch child.
6. Branch is operational scope where the fact requires it.
7. Protected actions never infer context solely from UI or route state.
8. Context switch and handoff require authorization re-evaluation.

### 13.2 Ownership invariants

9. Every canonical Commerce fact has exactly one owner.
10. Every canonical write model has exactly one owner.
11. Every aggregate candidate has exactly one owner.
12. Every approved lifecycle has exactly one owner or is explicitly a projection lifecycle.
13. A non-owner never writes the owner's model.
14. A reference, Contract use, projection, or deployment arrangement never transfers ownership.
15. A target owner alone validates and applies its state.
16. No hidden, shared, or circular canonical ownership is permitted.

### 13.3 Commerce Core invariants

17. Every channel uses the canonical Order.
18. POS owns POS Transaction only.
19. Every Stock change is recorded by Inventory.
20. Transfer owns intent; Inventory owns Stock effects.
21. Payment and Refund remain monetary facts.
22. Return, Exchange, and Commercial Adjustment remain commercial intent facts.
23. Tax Application remains Taxes-owned.
24. Invoice, Receipt, numbering, and Commerce Document Template configuration remain Invoices and Documents-owned.
25. Product Identifier remains Product Catalog-owned.
26. Order retains applied commercial terms without owning Pricing definitions.

### 13.4 Setup and readiness invariants

27. Product Hub owns handoff; Commerce owns OS-specific setup.
28. Setup owns only Setup-owned state.
29. Setup-collected target input is not target truth.
30. Commerce Readiness is Commerce's contribution, not final Operating System Ready.
31. Subscription, Installation, Setup, Configuration, Activation, readiness, and operation remain distinct.
32. Presets recommend or seed allowed defaults without owning Modules or target facts.

### 13.5 Projection invariants

33. Commerce Operational Reports are non-canonical projections.
34. Reporting never corrects a canonical fact.
35. Projection failure never invalidates a completed canonical write.
36. Projections preserve source owner, scope, version, and freshness appropriate to use.
37. Audit, Notification, Search, Analytics, and Product Hub projections retain their Core owners.

### 13.6 Extension and integration invariants

38. Commerce Core operates without an optional Module, Marketplace Asset, AI, or another OS.
39. An extension never creates parallel Commerce truth.
40. Marketplace retains Asset and Marketplace lifecycle ownership.
41. AI Coordinator retains AI artifact ownership.
42. Business Brain completes Decision without Commerce or AI ownership transfer.
43. Recommendation remains Recommendation Engine-owned and advisory.
44. Configuration Proposal remains Configuration Engine-owned.
45. Cross-OS integration remains optional and reference-based.
46. Extension failure cannot corrupt Commerce Core.

### 13.7 Security and evolution invariants

47. Authentication never implies authorization.
48. Access evaluates explicit context and target-domain invariants.
49. Commerce operational roles do not require HR OS.
50. Navigation visibility never substitutes for authorization.
51. Consequential actions remain auditable.
52. AI, Marketplace, integration, and extension inputs are untrusted until validated.
53. Later documentation cannot resolve a deferred decision silently.
54. Later architecture changes require Governance and applicable ADR review.
55. No physical implementation choice may redefine these logical boundaries.

## 14. Responsibility Matrices

### 14.1 Fact-to-owner matrix

| Fact family | Owner |
|---|---|
| Setup, Preset, Module Configuration, Commerce Readiness contribution | Setup and Configuration |
| Product, Variant, Category, Unit, Product Identifier | Product Catalog |
| Price, Discount, Promotion | Pricing |
| Stock, Inventory Movement | Inventory |
| Transfer | Transfers |
| Order | Orders |
| POS Transaction | Point of Sale |
| Transactional Customer | Transactional Customers |
| Payment, Refund | Payments and Refunds |
| Commerce Tax Configuration, Tax Application | Taxes |
| Invoice, Receipt, Commerce Document, numbering, template configuration | Invoices and Documents |
| Return, Exchange, Commercial Adjustment | Returns and Adjustments |
| Commerce operational projections | Reporting |
| Commerce permission semantics and runtime enforcement | Access |
| Commerce context interpretation | Operational Scope |
| optional coordination and invocation | Extensions |

### 14.2 Intent-to-effect matrix

| Initiating intent | Intent owner | Possible effect | Effect owner |
|---|---|---|---|
| Setup selection | Setup and Configuration | Product or Category seed | Product Catalog |
| Setup selection | Setup and Configuration | opening Stock effect | Inventory |
| Setup selection | Setup and Configuration | Tax Configuration | Taxes |
| Setup selection | Setup and Configuration | document numbering/template configuration | Invoices and Documents |
| Order progression | Orders | Stock change | Inventory |
| Order progression | Orders | Tax Application | Taxes |
| Order progression | Orders | Payment | Payments and Refunds |
| Order progression | Orders | Invoice or Receipt | Invoices and Documents |
| POS workflow | Point of Sale | Order | Orders |
| Return | Returns and Adjustments | Refund | Payments and Refunds |
| Return or Exchange | Returns and Adjustments | Stock effect | Inventory |
| Return or Adjustment | Returns and Adjustments | tax effect | Taxes |
| Return or Adjustment | Returns and Adjustments | Commerce Document | Invoices and Documents |
| Exchange | Returns and Adjustments | replacement Order | Orders |
| Transfer | Transfers | source/destination Stock effects | Inventory |
| Optional extension | Extensions | any canonical Commerce change | applicable target domain |

### 14.3 External-boundary matrix

| External concern | Frozen owner | Commerce responsibility |
|---|---|---|
| identity, authentication, Workspace Membership | Core Identity and Access | consume and enforce verified context |
| Workspace | Core Workspace Management | tenant reference |
| Business | Core Business Registry | selected Business reference |
| Business Unit, Department, Branch | Core Organization Registry | operational scope reference |
| Product Hub journey and handoff | Product Hub | receive handoff and return projection |
| Entitlement, Subscription, Installation, Activation | applicable Core owner | enforce eligibility and lifecycle context |
| Business DNA | Business DNA owner | consume authorized Business context |
| Decision | Business Brain | consume completed Decision only |
| Recommendation | Recommendation Engine | consume advisory Recommendation |
| Configuration Proposal | Configuration Engine | target owner validates and applies target state |
| Marketplace Asset and lifecycle | Marketplace | consume entitled and activated context |
| AI artifact | AI Coordinator | independently validate any proposed target action |
| another OS fact | applicable OS | optional governed reference or projection only |
| Audit, Notification, Search, Analytics record | applicable Core service | submit minimum owner-directed input |

## 15. Deferred Decisions

Wave 1 preserves all forty Proposal deferred decisions. They are repeated here for visibility, not resolved.

### 15.1 Domain model and aggregate detail

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

### 15.2 Setup, readiness, context, and Modules

| ID | Deferred decision |
|---|---|
| DD-09 | Exact Core Contract for Commerce-led Business Unit selection or creation during setup |
| DD-10 | Exact Commerce readiness criteria and readiness freshness or revocation rules |
| DD-11 | Setup restart, resume, migration, setup-version upgrade, and reconfiguration semantics |
| DD-12 | Commerce Preset versioning, reapplication, conflict, and user-override rules |
| DD-13 | Commerce Module eligibility, dependency, transition, and deprecation rules |
| DD-14 | Final Workspace-, Business-, Business Unit-, Department-, and Branch-scoping matrix for each Commerce fact and command |

DD-14 is shown with the mandatory Business and applicable Department context restored by the approved Patch. Its fact-by-fact scope remains deferred.

### 15.3 Commerce domain semantics

| ID | Deferred decision |
|---|---|
| DD-15 | Pricing precedence, stacking, effective periods, currency, rounding, and Branch override semantics |
| DD-16 | Discount and Promotion eligibility, approval, budget, and usage constraints |
| DD-17 | Stock reservation, commitment, deduction, release, negative-Stock, and reconciliation semantics |
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

### 15.4 Contracts, Events, intelligence, and integration

| ID | Deferred decision |
|---|---|
| DD-29 | Exact logical Contract fields, error categories, compatibility periods, and idempotency semantics |
| DD-30 | Exact Domain Event and Integration Event names, publication criteria, versions, ordering scopes, and replay policy |
| DD-31 | Configuration Proposal validation, conflict, expiry, partial application, rollback, and result semantics within Commerce |
| DD-32 | Marketplace extension permission model, compatibility, data access, failure isolation, and removal effects |
| DD-33 | Cross-OS reference, consent, failure, reconciliation, and feedback Contracts for each integration |

### 15.5 Security, privacy, and operations

| ID | Deferred decision |
|---|---|
| DD-34 | Commerce permission catalog, role templates, delegation, approval thresholds, and field-level access |
| DD-35 | Data classification, consent, residency, retention, erasure, masking, export, and legal-hold rules by Commerce fact |
| DD-36 | SLOs, health criteria, observability signal definitions, thresholds, error budgets, and escalation policy |
| DD-37 | Operational recovery, reconciliation, support approval, and incident runbooks for multi-owner workflows |

### 15.6 Implementation choices outside Wave 1

| ID | Deferred decision |
|---|---|
| DD-38 | Physical persistence schemas, indexes, concurrency controls, and storage partitioning |
| DD-39 | API endpoint shapes, Event payload schemas, transport, messaging, and coordination mechanisms |
| DD-40 | Runtime topology, scaling units, infrastructure, framework use, cloud environment, and vendor integration products |

## 16. Wave 1 Validation Checklist

| Validation | Result |
|---|---|
| Commerce Core documented without becoming one physical component | Pass |
| All sixteen domains documented | Pass |
| Every domain has responsibilities and exclusions | Pass |
| Every canonical fact has one owner | Pass |
| All eighteen canonical write models documented | Pass |
| All eighteen aggregate candidates have one owner | Pass |
| Domain interactions preserve target ownership | Pass |
| Business and Business Unit remain distinct | Pass |
| Commerce Operational Reports remain non-canonical | Pass |
| Product Identifier responsibility preserved | Pass |
| Access introduces no hidden mutable write model | Pass |
| Extensions introduce no parallel truth | Pass |
| No deferred decision answered | Pass |
| No API, technology, database, deployment, or ADR introduced | Pass |

## 17. Future Documentation Boundary

Later Commerce OS Documentation Waves may expand only the approved Proposal Baseline v0.1.1 and this Wave 1 reference.

They may document approved logical Contracts, Events, read models, security, observability, operations, or reliability when authorized. They must not:

- redesign these domains;
- change an owner;
- add a write model or aggregate without Governance;
- convert a projection into canonical truth;
- resolve DD-01 through DD-40 silently; or
- introduce implementation design before its authorized milestone phase.

## 18. References

### Governance and frozen predecessors

- `docs/00-governance/`
- `docs/01-genesis/`
- `docs/02-core-platform/`
- `docs/03-business-brain/`
- `docs/99-architecture-freeze/`

### Commerce OS baseline

- `docs/04-commerce-os/00-COMMERCE-OS-DISCOVERY.md`
- `docs/04-commerce-os/01-COMMERCE-OS-CAPABILITY-MAP.md`
- `docs/04-commerce-os/02-COMMERCE-OS-PROPOSAL.md`
- `docs/04-commerce-os/04-COMMERCE-OS-PROPOSAL-PATCH-v0.1.1.md`
- `docs/04-commerce-os/05-COMMERCE-OS-RE-REVIEW.md`
