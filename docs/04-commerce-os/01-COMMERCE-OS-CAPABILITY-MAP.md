# Commerce OS Capability Map

**Document Version:** 0.1  
**Status:** Logical Capability Mapping — Exploratory, Non-Architectural  
**Milestone:** 3 — Commerce OS  
**Date:** 2026-07-13  
**Source:** Approved Commerce OS Discovery v0.1  
**Predecessor Baselines:** Core Platform Architecture v1.0 / Documentation Baseline v1.0.1; Business Brain Architecture v1.0 / Documentation Baseline v1.0  
**Owner:** Nexoraxs

---

## Interpretation Rules

This document maps the eighteen candidate capabilities and sixteen candidate domains recorded by the approved Commerce OS Discovery v0.1.

It is not architecture. It does not approve a capability, domain boundary, responsibility allocation, lifecycle, module, aggregate, interface, message, storage model, technology, or implementation.

The following interpretation rules apply:

1. Every capability and domain remains a candidate.
2. A capability describes a logical business ability, not a component or Module.
3. A domain is a candidate grouping of business concerns, not an approved bounded context.
4. A flow shows logical progression, not orchestration, runtime order, transaction sequence, or state machine.
5. “Consumes” and “produces” describe information meaning only.
6. Ownership statements repeat frozen predecessor ownership and do not create Commerce internals.
7. Optional extension mapping does not approve an extension mechanism.
8. Every unresolved boundary remains an Open Question for the Proposal.

## 1. Mission Flow

### Logical Flow LF-01 — Commerce Mission

```text
Authorized Workspace, Business, Business Unit, and Branch context
  ↓
Approved commercial eligibility and Commerce handoff
  ↓
Business DNA, Knowledge, Rules, Capabilities, Decision, and Recommendation context
  ↓
Commerce-specific setup and readiness work
  ↓
Products or services, prices, stock, staff authority, and operating scope
  ↓
Orders and point-of-sale work
  ↓
Payments, taxes, invoices, receipts, and Commerce documents
  ↓
Returns, adjustments, transfers, and reconciliation where applicable
  ↓
Commerce reports, dashboards, and shared platform participation
  ↓
Optional Commerce extensions and optional integrations
  ↓
Observed Commerce outcomes for authorized downstream use
```

The mission flow expresses the business journey Commerce OS may need to support. It does not approve which steps are mandatory, their order in every scenario, or their internal ownership within Commerce.

### Mission ownership guardrails

- Core Platform retains identity, organization identity, commercial controls, Product Hub, and shared-service ownership.
- Business DNA, Knowledge, Rules, Capabilities, Business Brain Decisions, Recommendations, Configuration Proposals, Marketplace state, and AI artifacts retain their frozen owners.
- Commerce OS remains responsible for its approved setup, configuration, operational behavior, data, navigation, Permissions, reports, dashboards, and endpoints.
- No other Operating System is required to complete the Commerce core workflow.

## 2. Capability Flow

### Logical Flow LF-02 — Candidate Capability Collaboration

```text
Foundation and operating context
  CC-01 Commerce Setup and Readiness
  CC-02 Commerce Preset and Module Configuration
  CC-06 Branch Commerce Operations
  CC-16 Commerce Staff and Permission Enforcement
          ↓
Offer and availability understanding
  CC-03 Product and Category Management
  CC-04 Commerce Pricing
  CC-05 Inventory Management
          ↓
Commercial transaction work
  CC-07 Order Management
  CC-08 Point of Sale
  CC-09 Transactional Customer Management
  CC-10 Payment and Refund Recording
  CC-11 Tax Management
  CC-12 Invoice, Receipt, and Document Management
          ↓
Post-transaction and movement work
  CC-13 Return and Commercial Adjustment Management
  CC-14 Inventory Transfer
          ↓
Operational understanding and platform participation
  CC-15 Commerce Reporting and Dashboards
  CC-17 Commerce Notification, Audit, Search, and Analytics Participation
          ↓
Optional expansion
  CC-18 Optional Commerce Extension and Integration
```

This grouping is a reasoning aid. It does not decide a minimum Commerce Core, dependency direction, lifecycle, Module boundary, or implementation sequence.

### Cross-cutting participation

The map suggests that context, scope, access, reporting, and shared platform participation may affect several capabilities:

- CC-06 supplies explicit Business Unit and Branch context;
- CC-16 constrains authorized business action;
- CC-15 interprets Commerce-owned outcomes without becoming their source;
- CC-17 communicates with shared platform responsibilities without duplicating them; and
- CC-18 may extend only approved Commerce abilities without creating parallel Commerce truth.

Whether these remain independent capabilities or are responsibility aspects of other capabilities is unresolved.

## 3. Responsibility Flow

### Logical Flow LF-03 — Responsibility Progression

```text
Product Hub and Core provide authorized handoff context
  ↓
Commerce validates the selected operational scope
  ↓
Commerce interprets approved configuration and starter guidance
  ↓
Authorized Commerce actors establish operational Commerce information
  ↓
Commerce evaluates Commerce-specific rules and invariants
  ↓
Commerce records and exposes the resulting Commerce-owned outcome
  ↓
Shared Core services perform their notification, Audit, Search, and Analytics responsibilities
  ↓
Authorized downstream consumers use projections or references without ownership transfer
```

### Responsibility separation

| Logical responsibility | Commerce participation | Retained external responsibility |
|---|---|---|
| Enter Commerce setup | Validate handoff and continue OS-specific experience | Product Hub owns journey and routing; Core owns identity and context |
| Establish operating scope | Use canonical Business Unit and Branch references | Core Organization Registry owns identities and ancestry |
| Interpret business guidance | Use permitted Decision, Recommendation, and configuration context | Business Brain, Recommendation Engine, and Configuration Engine retain their artifacts |
| Seed starter defaults | Apply only approved, customer-controlled Commerce defaults | Business DNA and Knowledge remain source-owned |
| Conduct Commerce work | Validate and own Commerce operational outcomes | No external owner may write Commerce truth directly |
| Enforce access | Apply Commerce resource constraints | Core retains identity and Permission framework |
| Present Commerce insight | Derive Commerce operational understanding | Analytics Intake retains platform analytics governance |
| Notify and Audit | Supply the minimum owned facts | Core services own delivery and Audit Records |
| Extend Commerce | Validate Commerce-side effects | Marketplace and other OSs retain their own state |
| Consider AI assistance | Validate any proposed Commerce action | AI Coordinator owns the AI artifact and has no execution authority |

## 4. Information Flow

### Logical Flow LF-04 — Information Movement

```text
Canonical external owners
  ├── identity and organization context
  ├── commercial and lifecycle context
  ├── Business DNA and governed intelligence
  ├── Recommendation and Configuration context
  ├── Marketplace context
  └── optional AI or integration proposals
          ↓ minimum authorized information
Commerce candidate capabilities
  ├── interpret context
  ├── validate scope and business intent
  ├── perform Commerce responsibilities
  └── preserve Commerce operational truth
          ↓ purpose-limited Commerce output
Authorized external consumers
  ├── Product Hub projections
  ├── Notification and Audit responsibilities
  ├── Search and Analytics responsibilities
  ├── Business Brain and Recommendation feedback processes
  ├── AI Coordinator
  ├── Marketplace
  └── optional Operating System or partner consumers
```

### Information rules inherited from frozen baselines

1. Every information item retains one canonical owner.
2. Identity and scope accompany protected information.
3. Business DNA remains Business-scoped and software-independent.
4. Published Knowledge, Rules, Capabilities, and Marketplace versions remain externally owned.
5. Business Brain Decisions remain immutable and AI-independent.
6. A Recommendation candidate is not a Recommendation.
7. A Configuration input is not a Configuration Proposal.
8. A projection cannot become a write authority.
9. Optional integration cannot create shared or duplicate truth.
10. AI output cannot become Commerce fact without separate Commerce validation and authorization.

## 5. Decision Flow

### Logical Flow LF-05 — Governed Choice to Commerce Outcome

```text
Business context and governed platform guidance
  ↓
Authorized customer or operator choice where required
  ↓
Commerce scope and Permission evaluation
  ↓
Commerce-specific business validation
  ↓
Commerce operational outcome or explicit rejection
  ↓
Commerce explanation, Audit correlation, and operational visibility
  ↓
Optional feedback for future governed reasoning
```

### Decision authority distinctions

| Decision concern | Frozen authority | Commerce relationship |
|---|---|---|
| Business fact approval | Business DNA owner under its governance | Consume; never rewrite |
| Business reasoning | Business Brain | Consume completed Decision context only |
| Recommendation disposition | Recommendation Engine and authorized customer process | Consume accepted context where applicable |
| Configuration Proposal | Configuration Engine | Validate and apply only under approved target policy |
| Commerce operational validity | Commerce OS | Candidate owner of its domain validation and outcome |
| Identity and Permission | Core Platform plus owning-domain evaluation | Reauthorize and enforce Commerce resource rules |
| AI suggestion or Action Proposal | AI Coordinator owns artifact; human and target retain authority | Never treat as an authorized Commerce command |

The exact customer-review, approval, rejection, automatic-application, and escalation policies remain unresolved.

## 6. Input Flow

### Logical Flow LF-06 — Input Qualification

```text
Identify source owner
  ↓
Confirm authorized Workspace, Business, Business Unit, Branch, and resource scope
  ↓
Confirm purpose, applicability, and current version where relevant
  ↓
Distinguish fact, guidance, Recommendation, Configuration Proposal, projection, or user input
  ↓
Apply only the candidate Commerce capability that needs the information
  ↓
Preserve source reference and ownership
```

### Input-to-capability map

| Input category | Source owner | Candidate capability consumers | Never becomes |
|---|---|---|---|
| Authorization Context | Core Platform | CC-01, CC-06, CC-08, CC-16 and every protected capability | Commerce identity truth |
| Organization identifiers | Core Organization Registry | CC-01, CC-05, CC-06, CC-08, CC-14, CC-15 | Commerce-owned organization identity |
| Commercial and lifecycle context | Core commercial owners | CC-01, CC-02, CC-18 | Commerce-owned subscription or billing truth |
| Setup and Launch Handoff | Product Hub/Core boundary | CC-01 | Product Hub-owned Commerce setup |
| Business DNA Snapshot | Business DNA Registry | CC-01, CC-02, CC-03, CC-15 | Commerce configuration or software state |
| Knowledge and Knowledge Pack references | Knowledge Engine | CC-02 through CC-15 where applicable | Commerce-owned shared Knowledge |
| Deterministic Rule outcomes | Rules Engine | CC-04, CC-07, CC-10, CC-11, CC-12, CC-13 | Hidden local policy or AI rule |
| Capability references | Capability Registry | CC-02, CC-03, CC-15, CC-18 | Commerce-owned Capability definition |
| Completed Business Brain Decision | Business Brain | CC-01, CC-02, CC-15 | Commerce write authority by itself |
| Accepted Recommendation | Recommendation Engine | CC-01, CC-02, CC-18 | Commerce operational outcome by itself |
| Configuration Proposal | Configuration Engine | CC-01, CC-02 and affected target capability | Applied state without Commerce validation |
| Marketplace context | Marketplace | CC-02, CC-12, CC-18 | Commerce-owned Marketplace state |
| AI Action Proposal | AI Coordinator | Candidate target capability after authorization | Authorized Commerce action by itself |
| User-entered Commerce information | Authorized Commerce actor | Applicable operational capability | Valid Commerce fact before validation |
| Optional external information | Source owner | CC-18 and applicable target capability | Mandatory dependency or transferred ownership |

## 7. Output Flow

### Logical Flow LF-07 — Commerce Outcome Distribution

```text
Validated Commerce responsibility
  ↓
Commerce-owned operational outcome
  ↓
Purpose and scope filtering
  ↓
One or more authorized uses
  ├── Commerce operational view
  ├── Commerce report or dashboard
  ├── Product Hub lifecycle projection
  ├── Notification or Audit participation
  ├── Search or Analytics participation
  ├── optional feedback reference
  ├── AI context
  ├── Marketplace compatibility context
  └── optional integration context
```

### Output-to-owner map

| Candidate Commerce output category | Candidate producing capabilities | External use | Ownership retained |
|---|---|---|---|
| Setup and readiness outcome | CC-01, CC-02, CC-06, CC-16 | Product Hub lifecycle composition | Commerce for Commerce-owned status; Core/Product Hub retain their lifecycles |
| Product and category information | CC-03 | Orders, POS, inventory, reporting, optional extensions | Commerce candidate source |
| Commerce price outcome | CC-04 | Orders, POS, documents, reporting | Commerce candidate source; Core billing remains separate |
| Inventory and availability outcome | CC-05, CC-06, CC-14 | Orders, POS, reporting, optional integration | Commerce candidate source |
| Order outcome | CC-07, CC-08 | Payments, taxes, documents, adjustments, reporting | Commerce candidate source |
| Transactional customer context | CC-09 | Orders, documents, reporting | Commerce candidate source; broader relationship workflows remain external |
| Payment or refund outcome | CC-10, CC-13 | Orders, documents, reporting, reconciliation | Commerce candidate source within approved processor boundary |
| Tax outcome | CC-11 | Orders, documents, reporting | Commerce candidate source using external policy |
| Invoice, receipt, or document outcome | CC-12 | Customer presentation, Audit, reporting | Commerce candidate source within legal-policy boundary |
| Return or adjustment outcome | CC-13 | Order, payment, inventory, tax, document, reporting concerns | Commerce candidate source |
| Transfer outcome | CC-14 | Inventory and reporting | Commerce candidate source scoped to Core Branch identities |
| Operational insight | CC-15 | Commerce users, Product Hub, Analytics, Business Brain feedback | Source records remain with their Commerce owners |
| Shared-service participation | CC-17 | Notification, Audit, Search, Analytics | Each shared service owns its own resulting record or projection |
| Extension or integration outcome | CC-18 | Marketplace or optional external consumer | Each domain retains its own truth |

No output category is an approved entity, record, schema, or message.

## 8. Candidate Capability Relationships

The following relationship map preserves all eighteen Discovery candidates.

| ID | Candidate capability | Logically consumes | Collaborates with | Logically produces | Never owns |
|---|---|---|---|---|---|
| CC-01 | Commerce Setup and Readiness | handoff, scope, eligibility, guidance, configuration context | CC-02, CC-06, CC-16 | setup understanding and readiness contribution | Core lifecycle, Product Hub journey, organization identity |
| CC-02 | Commerce Preset and Module Configuration | Business context, accepted guidance, plan context | CC-01, CC-03–CC-18 as applicable | proposed Commerce defaults and enabled-behavior context | Business DNA, Recommendation, Configuration Proposal, Capability definitions |
| CC-03 | Product and Category Management | business context, Knowledge, user input | CC-04, CC-05, CC-07, CC-08, CC-11, CC-12, CC-15, CC-18 | product, service, category, variant, unit, and identifier meaning | Marketplace Assets, shared Knowledge, Capability definitions |
| CC-04 | Commerce Pricing | product context, policy, authorized price input | CC-03, CC-07, CC-08, CC-11, CC-12, CC-13, CC-15 | applicable Commerce sell-price and discount meaning | Core Plan pricing, billing, tax policy |
| CC-05 | Inventory Management | product, Branch, movement, order, adjustment context | CC-03, CC-06, CC-07, CC-08, CC-13, CC-14, CC-15, CC-18 | stock and availability meaning | Branch identity, supplier domain, other OS state |
| CC-06 | Branch Commerce Operations | canonical Business Unit and Branch context | CC-01, CC-05, CC-08, CC-14, CC-15, CC-16 | scoped operational context | Core organization identity or ancestry |
| CC-07 | Order Management | offer, price, stock, customer, policy, user choice | CC-03–CC-13, CC-15, CC-16, CC-18 | order intent and lifecycle meaning | payment processor, tax policy, Marketplace state |
| CC-08 | Point of Sale | actor, Branch, offer, stock, price, customer, payment context | CC-03–CC-13, CC-16 | in-person sale workflow outcome | independent parallel product, order, inventory, payment, or invoice truth |
| CC-09 | Transactional Customer Management | authorized customer and transaction context | CC-07, CC-08, CC-10, CC-12, CC-13, CC-15 | Commerce transactional customer meaning | Core identity, CRM lead, campaign, or relationship workflow |
| CC-10 | Payment and Refund Recording | order, tender, refund, actor, external outcome | CC-07, CC-08, CC-09, CC-12, CC-13, CC-15 | Commerce payment, refund, and reconciliation meaning | Core billing or external processor truth |
| CC-11 | Tax Management | product, price, order, customer, jurisdiction, Rule outcome | CC-03, CC-04, CC-07, CC-08, CC-12, CC-13, CC-15 | applied Commerce tax meaning and evidence | shared Rules, compliance Knowledge, government authority |
| CC-12 | Invoice, Receipt, and Document Management | order, customer, payment, tax, identity and template context | CC-03, CC-04, CC-07–CC-13, CC-15, CC-18 | Commerce document meaning | shared template Knowledge or external legal authority |
| CC-13 | Return and Commercial Adjustment Management | original order, payment, inventory, tax, document, authorization | CC-05, CC-07, CC-08, CC-10–CC-12, CC-15, CC-16 | return, exchange, cancellation, refund, or adjustment meaning | original record mutation authority not approved by Proposal |
| CC-14 | Inventory Transfer | product, stock, source Branch, target Branch, authorization | CC-05, CC-06, CC-15, CC-16 | movement and receipt meaning | Branch identity or non-Commerce logistics domain |
| CC-15 | Commerce Reporting and Dashboards | authorized Commerce outcomes and freshness | CC-01–CC-14, CC-17, CC-18 | operational insight and presentation meaning | source operational facts or platform Analytics governance |
| CC-16 | Commerce Staff and Permission Enforcement | Core identity, access assignment, scope, requested action | every protected Commerce capability | authorization result within Commerce responsibility | identity, session, Core Permission framework, HR employee profile |
| CC-17 | Commerce Notification, Audit, Search, and Analytics Participation | minimum Commerce-owned outcome and purpose | CC-01–CC-18 as applicable | owner-directed shared-service input | Notification delivery, Audit Record, search index, analytics source truth |
| CC-18 | Optional Commerce Extension and Integration | compatible Commerce context and optional external context | any explicitly supported capability | optional extended behavior or integration meaning | Commerce Core truth, Marketplace state, another OS's state |

This table does not approve the cardinality, direction, or mandatory nature of an internal dependency.

## 9. Candidate Domain Relationships

The sixteen Discovery domain candidates provide alternate groupings of the same problem space.

| ID | Candidate domain | Related capabilities | Candidate neighboring domains | Relationship question |
|---|---|---|---|---|
| CD-01 | Commerce Setup and Configuration | CC-01, CC-02, CC-06, CC-16 | every affected Commerce domain | Does setup own state, coordinate state, or only establish target configuration? |
| CD-02 | Product Catalog | CC-03 | Pricing, Inventory, Orders, POS, Taxes, Documents, Reporting, Extensions | What is canonical catalog truth and what may extensions add? |
| CD-03 | Commerce Pricing | CC-04 | Product Catalog, Orders, POS, Taxes, Documents, Returns, Reporting | Are price, discount, promotion, and history one concern or several? |
| CD-04 | Inventory | CC-05 | Product Catalog, Operational Scope, Orders, POS, Returns, Transfers, Reporting | What is stock truth and how are competing movements reconciled? |
| CD-05 | Orders | CC-07 | Catalog, Pricing, Inventory, POS, Customers, Payments, Taxes, Documents, Returns | Which responsibilities belong inside the order boundary? |
| CD-06 | Point of Sale | CC-08 | Operational Scope, Access, Catalog, Pricing, Inventory, Orders, Customers, Payments, Taxes, Documents | Is POS only a workflow over other domains or does it own distinct state? |
| CD-07 | Transactional Customers | CC-09 | Orders, POS, Payments, Documents, Reporting | What customer information is necessary for Commerce only? |
| CD-08 | Payments and Refunds | CC-10 | Orders, POS, Customers, Documents, Returns, Reporting | What does Commerce own versus processor and settlement domains? |
| CD-09 | Taxes | CC-11 | Catalog, Pricing, Orders, Customers, Documents, Returns, Reporting | How does governed policy become reproducible Commerce application? |
| CD-10 | Invoices and Commerce Documents | CC-12 | Orders, Customers, Payments, Taxes, Returns, Reporting, Extensions | Which documents are immutable records versus templates or views? |
| CD-11 | Returns and Adjustments | CC-13 | Orders, Inventory, Payments, Taxes, Documents, Reporting | Is reversal coordinated or owned by one candidate domain? |
| CD-12 | Transfers | CC-14 | Inventory, Operational Scope, Access, Reporting | When does a movement become sent, in transit, received, failed, or reversed? |
| CD-13 | Commerce Reporting | CC-15, CC-17 | all Commerce candidates and platform Analytics | Which views are operational, analytical, or external projections? |
| CD-14 | Commerce Access | CC-16 | every protected Commerce candidate | Which rules belong to Core access versus Commerce resource invariants? |
| CD-15 | Commerce Operational Scope | CC-01, CC-05, CC-06, CC-08, CC-14, CC-15, CC-16 | Setup, Inventory, POS, Transfers, Reporting, Access | Which configuration and behavior belong at Business Unit or Branch scope? |
| CD-16 | Commerce Extensions | CC-18 and affected capabilities | every explicitly extended candidate domain | Which extensions are Modules, Marketplace assets, or optional OS integrations? |

No relationship in this table creates an approved bounded context.

## 10. Candidate Responsibility Relationships

| Candidate responsibility from Discovery | Primary capability relationship | Supporting capability relationships | External boundary retained |
|---|---|---|---|
| Interpret Setup Handoff | CC-01 | CC-02, CC-06, CC-16 | Product Hub/Core handoff ownership |
| Select operational scope | CC-06 | CC-01, CC-16 | Core Organization Registry |
| Apply Commerce Configuration | CC-01, CC-02 | every affected capability | Configuration Engine owns Proposal |
| Seed Commerce defaults | CC-02 | CC-03–CC-18 as applicable | Business DNA, Knowledge, Recommendation ownership |
| Manage products and prices | CC-03, CC-04 | CC-11, CC-15 | Capability, Knowledge, Marketplace ownership |
| Manage stock | CC-05 | CC-06, CC-07, CC-08, CC-13, CC-14 | Core organization identity |
| Conduct sales | CC-07, CC-08 | CC-03–CC-13, CC-16 | Core commercial subscription remains separate |
| Record payments and refunds | CC-10 | CC-07, CC-08, CC-12, CC-13 | Processor and Core billing boundaries |
| Calculate taxes and issue documents | CC-11, CC-12 | CC-03, CC-04, CC-07–CC-10, CC-13 | Knowledge and Rules ownership |
| Manage returns and transfers | CC-13, CC-14 | CC-05–CC-12, CC-15, CC-16 | No external source ownership transferred |
| Enforce Commerce access | CC-16 | every protected capability | Core identity and Permission framework |
| Present operational insight | CC-15 | CC-01–CC-14, CC-17, CC-18 | Analytics governance and source truth |
| Publish Commerce facts | CC-17 | every outcome-producing capability | Shared platform governance remains external |
| Support optional extensions | CC-18 | any explicitly extended capability | Marketplace and other OS ownership |
| Support AI proposals | target capability plus CC-16 | CC-17 for Audit participation | AI Coordinator owns AI artifact |

The Proposal must determine whether any candidate responsibility is a capability, a cross-cutting responsibility, or part of another capability.

## 11. Ownership Boundaries

### 11.1 Frozen owners

| Concern | Frozen owner | Commerce capability-map rule |
|---|---|---|
| Identity, authentication, Workspace, Business, organization identity | Core Platform owners | Consume explicit authorized references only |
| Product, Plan, entitlement, subscription, installation, billing | Core commercial owners | Consume eligibility and limits only |
| Product Hub journey and handoff | Product Hub | Commerce begins its own responsibility after authorized handoff |
| Business DNA | Business DNA Registry | Use Business context without software-state write-back |
| Knowledge and Knowledge Packs | Knowledge Engine | Consume applicable immutable versions |
| Rules | Rules Engine | Consume deterministic outcomes |
| Capability definitions | Capability Registry | Reference; never redefine |
| Business Brain Decision | Business Brain | Consume completed Decision or authorized projection only |
| Recommendation and disposition | Recommendation Engine | Consume accepted context only |
| Configuration Proposal | Configuration Engine | Validate and apply at Commerce target under future policy |
| Marketplace Assets and scoped state | Marketplace | Consume compatible optional assets only |
| AI artifacts and Action Proposals | AI Coordinator | Treat as non-executing proposals |
| Audit Records and shared platform records | Applicable Core service | Supply minimum Commerce-owned facts |
| Commerce operational facts | Commerce OS | Candidate capabilities must preserve one Commerce owner per fact |
| Other OS operational facts | Applicable Operating System | Optional integration only |

### 11.2 Ownership invariants

1. Capability collaboration never transfers canonical ownership.
2. A candidate Commerce capability cannot approve its own external prerequisite.
3. A shared projection cannot become Commerce or external source truth.
4. Business DNA never contains Commerce setup, Module, Plan, or operational state.
5. Business Brain and Recommendation outputs do not execute Commerce changes.
6. Commerce validates and owns only its target operational outcome.
7. Marketplace assets and optional integrations cannot create parallel Commerce Core truth.
8. AI output has no Commerce execution authority.
9. Core organization identities remain canonical while Commerce operational attributes remain inside Commerce.
10. No other OS is mandatory for Commerce's core workflow.

## 12. External Dependencies

| External dependency | Logical value supplied | Candidate capability relationship | Dependency limit |
|---|---|---|---|
| Core identity and authorization | verified actor, service, tenant, and resource context | CC-01, CC-06, CC-08, CC-16 and protected capabilities | Commerce cannot replace identity or Permission truth |
| Core Organization Registry | Workspace, Business, Business Unit, Department, Branch identity and ancestry | CC-01, CC-05, CC-06, CC-08, CC-14, CC-15 | Commerce cannot create competing identity |
| Core commercial lifecycle | eligibility, Plan, entitlement, subscription, installation, lifecycle context | CC-01, CC-02, CC-18 | Commerce cannot own billing or subscription |
| Product Hub | setup and launch journey context | CC-01 | Product Hub cannot perform Commerce setup |
| Business DNA Registry | published Business context | CC-01, CC-02, CC-03, CC-15 | Commerce cannot write Business DNA |
| Knowledge Engine | applicable governed Knowledge | applicable CC-02–CC-15 | Commerce cannot duplicate shared Knowledge |
| Rules Engine | deterministic policy outcomes | CC-04, CC-07, CC-10–CC-13 | Commerce cannot silently redefine Rules |
| Capability Registry | canonical Capability references | CC-02, CC-03, CC-15, CC-18 | Commerce cannot own definitions |
| Business Brain | completed Decision and insight context | CC-01, CC-02, CC-15 | Business Brain cannot execute Commerce work |
| Recommendation Engine | accepted Recommendation context | CC-01, CC-02, CC-18 | Candidate content alone cannot authorize change |
| Configuration Engine | Configuration Proposal | CC-01, CC-02 and affected capabilities | Commerce retains target validation |
| Marketplace | asset and scoped lifecycle context | CC-02, CC-12, CC-18 | Assets cannot replace Commerce truth |
| AI Coordinator | AI explanation or Action Proposal | applicable target capability, CC-16, CC-17 | AI cannot execute or own Commerce fact |
| Shared Core services | Notification, Audit, Search, Analytics, localization, Storage, and observability participation | CC-17 and relevant capabilities | Each service retains its canonical records |
| Optional Operating Systems | source-owned optional information | CC-18 and applicable target capability | No hard dependency or direct ownership transfer |

## 13. Upstream Dependencies

### Logical Flow LF-08 — Upstream Context to Commerce Capability

```text
Core control and organization context
  + Business and intelligence context
  + customer-approved Recommendation or Configuration context
  + optional Marketplace, AI, or integration context
          ↓
scope, purpose, ownership, applicability, and authorization checks
          ↓
only the candidate Commerce capability that needs the context
```

### Upstream dependency classes

- **Required shared foundation candidates:** identity, authorization, organization scope, commercial eligibility, Product Hub handoff, and applicable shared Core services.
- **Governed business-intelligence candidates:** Business DNA, Knowledge, Rules, Capabilities, completed Decisions, Recommendations, and Configuration Proposals.
- **Optional ecosystem candidates:** Marketplace assets, AI proposals, and other OS information.

The Proposal must determine which inputs are required for setup, readiness, and each operational responsibility. This map does not decide availability or failure policy.

## 14. Downstream Dependencies

### Logical Flow LF-09 — Commerce Outcome to External Use

```text
Commerce-owned outcome
  ↓
purpose, authorization, minimization, and scope
  ↓
authorized downstream responsibility
  ├── Product Hub composition
  ├── Notification delivery
  ├── append-only Audit
  ├── Search projection
  ├── Analytics intake
  ├── Business Brain or Recommendation feedback process
  ├── AI context
  ├── Marketplace lifecycle or compatibility
  └── optional OS or partner use
```

### Downstream dependency rules

- Product Hub receives only the Commerce lifecycle information needed for composition.
- Shared services own their resulting delivery, Audit, Search, or Analytics records.
- Business Brain learning and Recommendation feedback cannot rewrite Commerce or source truth.
- AI receives only minimum authorized context and cannot execute Commerce work.
- Marketplace and OS consumers retain their own state and tolerate Commerce absence or pause where the relationship is optional.
- No downstream consumer gains direct Commerce write authority through possession of Commerce information.

## 15. Commerce Core vs Optional Extensions

### Logical Flow LF-10 — Core Continuity and Optional Extension

```text
Candidate coherent Commerce truth
  ├── products and categories
  ├── prices
  ├── inventory
  ├── orders and POS
  ├── transactional customers
  ├── payments and refunds
  ├── taxes
  ├── invoices, receipts, and documents
  ├── returns, adjustments, and transfers
  └── operational insight and access
          ↓ referenced and extended, never replaced
Optional Commerce behavior
  ├── online store
  ├── delivery
  ├── kitchen
  ├── loyalty
  ├── supplier-related capability
  ├── pharmacy-related capability
  ├── repair-related capability
  └── optional cross-OS or Marketplace integration
```

This is a candidate coherence map, not an approved Commerce Core catalog. The Proposal must decide the minimum core and the status of each extension candidate.

### Frozen extension constraints

1. Commerce must remain usable without optional extensions or another OS.
2. An extension may add behavior but cannot create a second source for products, orders, inventory, customers, payments, taxes, invoices, or other approved Commerce Core facts.
3. A preset may suggest or seed allowed defaults but cannot own Modules or hardcode workflows.
4. Marketplace retains Marketplace Asset and scoped-state ownership.
5. Another OS retains its operational facts.
6. Extension absence, failure, pause, upgrade, or removal must not corrupt Commerce-owned truth.

### Unresolved classification map

| Concern | Possible classification | Still unanswered |
|---|---|---|
| POS | Commerce Core workflow or required Module | exact state and relationship to Orders |
| Online store | optional Commerce Module or extension | catalog, order, customer, payment, fulfilment boundary |
| Delivery | optional Module, Marketplace extension, or integration | order and fulfilment ownership |
| Kitchen | optional Module or extension | order preparation ownership |
| Loyalty | optional Module or future integration | customer and benefit ownership |
| Supplier-related behavior | optional Module or external domain relationship | purchasing, supplier, cost, and inventory boundary |
| Pharmacy-specific behavior | preset, optional Module, or Healthcare integration | batch, expiry, prescription, sale, and clinical boundary |
| Repair behavior | limited Commerce extension or Maintenance OS integration | intake, ticket, parts, invoice, and warranty boundary |

## 16. Capability Lifecycle

### Logical Flow LF-11 — Candidate Capability Lifecycle

The capability lifecycle is a logical reasoning loop, not a persistent lifecycle or state model.

```text
Business need is recognized
  ↓
Relevant candidate capability is identified
  ↓
Required external context and ownership are recognized
  ↓
Related candidate capabilities collaborate logically
  ↓
Authorized Commerce responsibility is performed
  ↓
Commerce-owned outcome is observed
  ↓
Operational insight and optional feedback are considered
  ↓
Changed need may begin another logical cycle
```

### Lifecycle constraints

- capability identity and versioning are unresolved;
- a capability does not own source context by consuming it;
- one logical cycle cannot silently approve a Recommendation or Configuration Proposal;
- optional feedback affects only a future governed cycle;
- a changed need does not rewrite historical Commerce or external facts; and
- the Proposal must decide whether any capability has a distinct lifecycle at all.

## 17. Logical Operational Flow

### Logical Flow LF-12 — Representative Operational Collaboration

This flow shows responsibility collaboration during a representative Commerce journey. It is not a transaction design or universal workflow.

```text
Authorized actor enters Commerce in explicit operational context
  ↓
Commerce scope and access are evaluated
  ↓
Relevant offer, price, availability, customer, policy, and configuration context is assembled logically
  ↓
Actor expresses a permitted Commerce intent
  ↓
Relevant Commerce capabilities validate their own concerns
  ↓
Commerce produces an owned operational outcome or a clear rejection
  ↓
Related payment, tax, document, inventory, adjustment, or transfer concerns are reflected where applicable
  ↓
Operational views and shared-service participation are updated logically
  ↓
Authorized downstream consumers observe minimum required information
```

### Logical failure distinctions

The Proposal must later distinguish:

- missing or invalid Core context;
- unavailable or stale external guidance;
- insufficient Commerce setup or readiness;
- denied Commerce access;
- invalid product, price, stock, order, payment, tax, or document context;
- partially completed related responsibilities;
- unavailable optional extension;
- unavailable downstream shared service; and
- uncertain Commerce outcome.

No retry, timeout, compensation, rollback, or recovery behavior is approved here.

## 18. Open Questions

The following forty questions remain unresolved.

### 18.1 Capability identity and overlap

1. Are all eighteen candidates durable Commerce capabilities?
2. Which candidates are cross-cutting responsibilities rather than independent capabilities?
3. Should Commerce Setup and Readiness remain one capability or be separated logically?
4. Is Branch Commerce Operations a capability or context applied to other capabilities?
5. Is Commerce Staff and Permission Enforcement a capability or a constraint on every capability?
6. Is shared-service participation one capability or separate participation responsibilities?
7. Is Point of Sale a capability, a workflow over other capabilities, or both?
8. Do Return Management and Inventory Transfer belong in one post-transaction grouping?

### 18.2 Capability and domain mapping

9. Does every candidate capability map to exactly one candidate domain?
10. Which domains need multiple capabilities, and which capabilities cross domains?
11. What is the minimum coherent Commerce Core capability set?
12. Which candidates are optional Modules rather than core capabilities?
13. Which candidates are Marketplace extension points rather than Commerce capabilities?
14. Which candidates belong to optional integration with another OS?
15. Which domain owns coordination when an outcome affects order, inventory, payment, tax, and document concerns?
16. Which domain owns historical correction versus operational reversal?

### 18.3 Information and responsibility flow

17. Which input categories are mandatory for Commerce setup?
18. Which inputs are mandatory for normal Commerce operation?
19. Which source versions must be retained for operational reproducibility?
20. Which Commerce outputs may Product Hub display?
21. Which Commerce outcomes may inform Business Brain or Recommendation feedback?
22. Which candidate capability owns each Commerce operational fact?
23. Which logical responsibilities require direct customer choice?
24. Which responsibilities may use approved automatic configuration?

### 18.4 Commerce Core and extensions

25. Are products, prices, inventory, orders, customers, payments, taxes, and documents all mandatory core concerns?
26. Which return, adjustment, and transfer responsibilities belong in the minimum core?
27. How can an extension add fields or behavior without creating parallel truth?
28. What happens logically when an extension is unavailable, paused, upgraded, or removed?
29. Which preset suggestions are allowed to affect capability configuration?
30. How is customer customization preserved when a preset or extension evolves?
31. Which online store, delivery, kitchen, loyalty, supplier, pharmacy, and repair concerns remain inside Commerce?
32. Which of those concerns require an optional external owner?

### 18.5 Authority, lifecycle, and readiness

33. Which Commerce choices require Recommendation acceptance before configuration?
34. Which Commerce changes require human approval or separation of duties?
35. Which candidate capabilities contribute to Operating System Ready?
36. Which capability remains usable during partial setup or degraded optional dependencies?
37. How is uncertain or conflicting upstream context exposed without inventing truth?
38. How do capability outcomes preserve Business Unit and Branch scope during context switching?
39. Which candidate capability supplies operational evidence for Audit and observability?
40. Which capability and domain decisions require new ADRs rather than Proposal detail or continued deferral?

## 19. Proposal Readiness

### 19.1 Readiness evidence

The logical map now provides:

- one Commerce mission flow;
- a collaboration map for all eighteen candidate capabilities;
- a relationship map for all sixteen candidate domains;
- a mapping of the fifteen Discovery responsibility areas;
- explicit frozen ownership boundaries;
- upstream and downstream dependency maps;
- a candidate Commerce Core versus optional-extension view;
- a non-persistent capability lifecycle;
- a representative logical operational flow; and
- forty unresolved Proposal questions.

### 19.2 Conditions for the Proposal

The Proposal must:

1. decide the approved capability catalog without treating capabilities as components;
2. decide the Commerce domain and ownership boundaries;
3. define the minimum Commerce Core and optional-extension boundary;
4. assign every Commerce write responsibility exactly once;
5. preserve Core organization, commercial, Product Hub, and shared-service ownership;
6. preserve Business DNA, Knowledge, Rule, Capability, Business Brain, Recommendation, Configuration, Marketplace, and AI ownership;
7. define setup, configuration, readiness, and operational boundaries without collapsing the frozen OS lifecycle;
8. define candidate internal architecture only after ownership is clear;
9. define logical data, Contract, Event, read-model, Security, observability, operational, and reliability responsibilities without implementation technology;
10. retain every unresolved question as a decision, risk, or explicit deferral;
11. identify required ADRs without treating draft decisions as Accepted; and
12. pass an independent Architecture Review before any Documentation Wave.

### 19.3 Readiness assessment

The approved Discovery and this Capability Map define enough logical problem structure for a Proposal to evaluate and decide Commerce OS architecture.

The remaining questions are intentional Proposal inputs. No contradiction with Governance, Genesis, Core Platform, Business Brain, or their Freezes was identified by this mapping.

### 19.4 Recommendation

# READY FOR PROPOSAL

This recommendation authorizes no Proposal content, architecture, ADR, or Documentation Wave by itself.

## References

### Commerce OS Discovery

- `docs/04-commerce-os/00-COMMERCE-OS-DISCOVERY.md`

### Governance and Genesis

- `docs/00-governance/`
- `docs/01-genesis/`

### Frozen predecessor baselines

- `docs/02-core-platform/`
- `docs/03-business-brain/`
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md`
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.0.1-READINESS.md`
- `docs/99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md`
- `docs/99-architecture-freeze/BUSINESS-BRAIN-READINESS.md`
