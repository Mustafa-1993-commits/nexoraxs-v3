# Commerce OS Discovery

**Document Version:** 0.1  
**Status:** Discovery — Exploratory, Non-Architectural  
**Milestone:** 3 — Commerce OS  
**Date:** 2026-07-12  
**Predecessor Baselines:** Core Platform Architecture v1.0 / Documentation Baseline v1.0.1; Business Brain Architecture v1.0 / Documentation Baseline v1.0  
**Owner:** Nexoraxs

---

## Discovery Status

This document identifies the Commerce OS architectural problem space. It records candidate capabilities, candidate domains, candidate responsibilities, boundaries, dependencies, questions, risks, and unknowns.

It is not a Proposal, architecture, aggregate design, API specification, Event specification, database design, component decomposition, implementation plan, or technology selection. A candidate is not approved merely because it appears here.

## 1. Vision

Commerce OS should become the first complete, independent Nexoraxs Operating System for businesses that sell products or services and need coherent day-to-day commerce operations.

It should transform approved Business context and governed platform guidance into an independently usable commerce experience while proving the frozen Nexoraxs model:

```text
Core Platform foundation
  + Business-scoped Business DNA
  + governed Business Brain Decision and Recommendation context
  + Commerce OS-owned setup and operations
  → Operating System Ready
  → independent commerce operation
```

Commerce OS must feel like a business operating system rather than a disconnected set of sales screens. It must remain one independent Operating System, not become Core Platform, a giant ERP, a POS-only product, or a container for unrelated operational domains.

## 2. Mission

Commerce OS exists to help an authorized Business Unit conduct and understand commerce operations through one coherent operational domain.

Its mission is to:

- establish an OS-owned commerce setup for an operational Business Unit;
- support the commercial journey from product or service definition through sale, fulfilment where applicable, payment, tax, invoice, adjustment, and reporting;
- coordinate branch-scoped commerce operations using canonical Core organization identities;
- provide fast, explainable, permission-aware operational experiences;
- preserve one Commerce source of truth for Commerce-owned records;
- remain independently usable without another Operating System;
- consume shared Core, Knowledge, Business Brain, Recommendation, Configuration, Marketplace, and AI capabilities through approved boundaries; and
- expose governed Commerce outputs without transferring Commerce ownership.

## 3. Scope

### 3.1 Frozen scope direction

The frozen Core Platform baseline already requires Commerce OS to own:

- Commerce-specific setup;
- Commerce Modules;
- Commerce workflows;
- Commerce-specific Permissions;
- Commerce domain configuration;
- Commerce operational data;
- Commerce navigation;
- Commerce dashboards;
- Commerce reports;
- Commerce endpoints; and
- its independent release and operational lifecycle.

### 3.2 Discovery scope

Discovery examines the problem space around:

- products, categories, variants, pricing, units, and identifiers;
- inventory and branch-scoped stock;
- orders and point-of-sale transactions;
- transactional customers;
- payments, refunds, and commercial adjustments;
- taxes, invoices, receipts, and Commerce documents;
- returns and transfers;
- Business Unit and Branch operational context;
- Commerce-specific setup, presets, Modules, settings, and readiness;
- operational staff roles and Commerce Permissions;
- reports, dashboards, Search, Analytics, Notifications, and Audit integration;
- optional fulfilment and Commerce extensions;
- upstream platform inputs and downstream owner-controlled integrations; and
- the boundaries that a later Capability Map and Proposal must decide.

### 3.3 Business problems in scope

Candidate problems Commerce OS may address include:

- fragmented product and price records;
- inaccurate or disconnected inventory across operating locations;
- slow, error-prone, or opaque checkout;
- orders that do not share one lifecycle across allowed sales channels;
- payments, refunds, taxes, and invoices that do not reconcile;
- branch operations without explicit Business Unit and Branch context;
- unclear staff authority over consequential Commerce actions;
- setup that is disconnected from Business needs, accepted Recommendations, and plan limits;
- reports that cannot be traced to Commerce source records;
- business presets that hardcode workflows instead of seeding configurable defaults;
- extension mechanisms that create parallel Commerce truth; and
- optional integrations that accidentally become dependencies for the Commerce core workflow.

## 4. Non-Scope

Discovery does not approve or design:

- Commerce aggregates, entities, value objects, schemas, or transactions;
- API resources, commands, queries, endpoints, webhooks, or payloads;
- Domain Events, Integration Events, transport, ordering, or delivery;
- physical modules, packages, services, runtime boundaries, or deployment topology;
- databases, caches, queues, search engines, object storage, vendors, or cloud services;
- detailed screens, navigation trees, visual design, or implementation specifications;
- pricing, plan names, plan limits, trials, billing policy, or commercial recovery;
- an evolution or replacement for the deferred legacy `OSEnablement` concept;
- Organization Registry write protocol during Commerce setup;
- final Commerce setup, activation, or readiness state machines;
- exact POS, inventory, order, payment, tax, invoice, return, transfer, or reporting lifecycles;
- online store, delivery, kitchen, loyalty, supplier purchase, pharmacy, or repair implementation;
- Marketplace publisher, sandbox, certification, settlement, or extension execution policy;
- AI provider, model, tool, prompt, retention, or execution policy;
- another Operating System's domain; or
- changes to Genesis, Governance, Core Platform, Business Brain, or their Freezes.

## 5. Responsibilities

The following responsibilities are frozen at the Operating System level and apply to Commerce OS. Exact internal allocation remains for the Proposal.

### 5.1 Commerce experience

- own the Commerce user experience;
- own Commerce navigation, menus, dashboards, and operational views;
- support Arabic and English and the shared localization foundation;
- preserve explicit Workspace, Business, Business Unit, Branch, and resource context; and
- provide loading, error, empty, stale, recovery, and authorization outcomes appropriate to Commerce work.

### 5.2 Commerce setup and configuration

- own the Commerce-specific setup experience after Product Hub handoff;
- select or create the operational Business Unit only through the future approved Core contract;
- use canonical Core Business Unit, Department, and Branch identities;
- validate and apply approved Commerce Configuration Proposals idempotently under approved policy;
- own Commerce presets, settings, and Module configuration without storing them in Business DNA; and
- determine Commerce readiness only within the approved OS lifecycle boundary.

### 5.3 Commerce operations

- own Commerce domain logic and workflows;
- own Commerce operational records;
- enforce Commerce-specific invariants and Permissions;
- own Commerce reports and dashboards derived from Commerce records;
- publish or expose approved Commerce facts through governed Contracts; and
- remain functional without another OS.

### 5.4 Shared platform participation

- consume Core authentication, authorization, organization, commercial, Notification, Audit, localization, Search Coordination, Storage Coordination, Analytics Intake, API, and observability capabilities;
- consume approved Business DNA, Knowledge, Rule, Capability, Business Brain, Recommendation, Configuration, Marketplace, and AI context without absorbing their ownership;
- reauthorize every protected handoff and deep link;
- emit Audit-ready activity for consequential Commerce operations; and
- preserve optional, versioned, failure-isolated integration.

## 6. Non-Responsibilities

Commerce OS must never own or duplicate:

### 6.1 Core Platform responsibilities

- identity, credentials, authentication, or sessions;
- Workspace, Business, Business Unit, Department, or Branch canonical identity and ancestry;
- Workspace Membership or the platform Permission framework;
- Product and Plan catalog, Workspace Entitlement, OS Subscription, OS Installation, billing, or commercial source records;
- Product Hub journey, projection, selection capture, handoff, or launch routing;
- platform Notifications, append-only Audit Records, localization source, Search Coordination, Storage Coordination, Analytics Intake, API gateway policy, or Event transport;
- Core Workspace Ready; or
- platform-wide lifecycle truth outside Commerce's owned stage responsibilities.

### 6.2 Intelligence responsibilities

- Business DNA identity, facts, snapshots, provenance, publication, correction, or history;
- Knowledge, Knowledge Packs, Rules, or Capability definitions;
- Business Brain Decisions or Decision history;
- Recommendation creation, prioritization, explanation, lifecycle, or disposition;
- Implementation Option mapping;
- Configuration Proposal identity or lifecycle;
- AI orchestration, AI Interactions, AI explanations, advisory outputs, or AI Action Proposals; or
- learning policy or automatic promotion into Business DNA, Knowledge, or Rules.

### 6.3 Ecosystem and other OS responsibilities

- Marketplace Assets, versions, purchase, installation, activation, applicability, or publisher lifecycle;
- another Operating System's domain model, records, setup, Permissions, navigation, or workflows;
- a cross-OS shared database;
- a mandatory dependency on CRM, HR, Healthcare, Maintenance, or any other OS; or
- operational truth that belongs to a future independent OS.

## 7. Relationships

### 7.1 Core Platform

**Frozen relationship:** Core Platform owns the shared control and intelligence plane. Commerce OS owns the Commerce operational domain.

Core supplies canonical identity, organization references, entitlement and subscription context, installation and lifecycle coordination, authorization foundations, handoffs, Notifications, Audit, localization, Search, Storage, Analytics, API, Event, Security, and observability foundations.

Commerce OS must reauthorize context on arrival, reference canonical Core organization identities, keep Commerce records inside the Commerce boundary, and use owner Contracts rather than direct Core data access.

**Discovery questions:** exact setup handoff, Organization Registry write protocol, lifecycle reconciliation, plan-limit enforcement, Permission split, and Operating System Ready evaluation.

### 7.2 Business Brain

**Frozen relationship:** Business Brain owns completed Business Brain Decisions and Decision-owned candidates. Commerce OS owns Commerce operations.

Commerce OS may consume authorized completed Decisions, Recommendations, Configuration Proposals, or bounded projections appropriate to Commerce. Commerce operational outputs may contribute only through approved Analytics or feedback boundaries; they never rewrite a completed Decision.

Business Brain cannot create a Commerce order, payment, inventory adjustment, invoice, tax record, return, transfer, setup record, or target configuration.

**Discovery questions:** which Decision and insight views Commerce needs, which Commerce outcomes may be returned, and how freshness and supersession are communicated.

### 7.3 Product Hub

**Frozen relationship:** Product Hub owns discovery, lifecycle composition, explanation, selection capture, setup routing, launch, and recovery navigation. It does not own Commerce setup or operational data.

Product Hub hands authorized context to Commerce OS. Commerce OS owns the setup experience and returns only approved lifecycle and readiness projections. Product Hub composes those projections without becoming their source of truth.

**Discovery questions:** setup and launch handoff content, recovery routes, stale-state presentation, and responsibility for each lifecycle status.

### 7.4 Marketplace

**Frozen relationship:** Marketplace owns shared immutable Marketplace Assets and scoped Marketplace state. Commerce OS owns Commerce behavior and data affected by an approved, compatible activation.

Commerce OS may consume Marketplace-provided extensions, templates, workflows, themes, or other compatible assets only through approved installation and activation boundaries. A Marketplace Asset cannot create parallel orders, inventory, customers, payments, invoices, taxes, or another Commerce source of truth.

**Discovery questions:** which Commerce extension points exist, how compatibility is declared, and how installation failure, pause, upgrade, removal, and data retention are handled.

### 7.5 AI Coordinator

**Frozen relationship:** AI Coordinator owns AI orchestration and all AI-owned outputs. Commerce OS owns Commerce facts, validation, and execution.

AI may receive minimum authorized Commerce context through approved tools or projections after platform authorization and governed reasoning. An AI Action Proposal may suggest a Commerce action but has no execution authority. Commerce OS must reauthorize, validate, apply, and Audit any consequential action under a separately approved workflow.

**Discovery questions:** permitted Commerce AI tools, read/write separation, human approval, evidence, confidence, data minimization, and failure behavior.

### 7.6 Business DNA

**Frozen relationship:** every Business owns one Business-scoped, software-independent Business DNA identity. Commerce OS only consumes approved Business DNA context.

Business activity may guide Recommendations, presets, and defaults, but Business DNA never stores Commerce Module state, setup state, plan, subscription, product catalog, inventory, orders, or other software configuration.

**Discovery questions:** minimum Business DNA used for Commerce setup and how changed Business DNA may suggest—not silently apply—future Commerce changes.

### 7.7 Knowledge Engine

**Frozen relationship:** Knowledge Engine owns shared structured Knowledge and immutable published versions. Commerce OS consumes applicable Knowledge and does not copy or redefine it.

Commerce-specific Rules, terminology, KPIs, reports, workflows, compliance guidance, or templates that qualify as shared Knowledge remain Knowledge-owned. Commerce operational state remains Commerce-owned.

**Discovery questions:** applicable Commerce Knowledge domains, version selection, country and industry applicability, local operational configuration, and historical reproducibility.

### 7.8 Recommendation Engine

**Frozen relationship:** Recommendation Engine owns Recommendation creation, prioritization, explanation, lifecycle, disposition, and approved Implementation Option relationship. Commerce OS owns acceptance effects inside its domain only after the approved downstream process.

Commerce OS may receive accepted Recommendation context or a Configuration Proposal. It cannot treat a Business Brain candidate as an accepted Recommendation or apply a Recommendation directly as target state.

**Discovery questions:** Recommendation-to-setup handoff, Configuration Proposal validation, rejection and partial application, idempotency, customer review, and feedback.

## 8. Candidate Capabilities

The following eighteen capabilities are candidates for later mapping. They are not approved Commerce capabilities, Modules, components, or bounded contexts.

| ID | Candidate capability | Business problem addressed | Frozen constraint | Status |
|---|---|---|---|---|
| CC-01 | Commerce Setup and Readiness | A Business Unit needs a governed path from handoff to operational readiness. | Core owns organization and commercial truth; Commerce owns OS-specific setup. | Candidate |
| CC-02 | Commerce Preset and Module Configuration | Businesses need useful defaults without typed Workspaces or hardcoded workflows. | Presets seed suggestions; configuration stays outside Business DNA. | Candidate |
| CC-03 | Product and Category Management | Sellers need coherent products, services, categories, variants, units, and identifiers. | Capability definitions and Marketplace Assets remain external. | Candidate |
| CC-04 | Commerce Pricing | Sellers need controlled sell prices, discounts, and applicable price context. | Plan and billing pricing remain Core-owned; tax policy boundary remains open. | Candidate |
| CC-05 | Inventory Management | Businesses need accurate stock and availability by operational scope. | Branch identity is Core-owned; inventory state is Commerce-owned. | Candidate |
| CC-06 | Branch Commerce Operations | Commerce must operate within explicit Business Unit and Branch context. | Core owns organization identities; Commerce owns scoped behavior. | Candidate |
| CC-07 | Order Management | Sales channels need one coherent Commerce order lifecycle. | No extension may create a parallel order source. | Candidate |
| CC-08 | Point of Sale | Staff need fast, permission-aware in-person selling. | POS must use Commerce Core records and remain more than a standalone screen. | Candidate |
| CC-09 | Transactional Customer Management | Commerce needs customer context tied to transactions. | Broader lead, campaign, and relationship workflows remain outside Commerce. | Candidate |
| CC-10 | Payment and Refund Recording | Commerce needs traceable tender, payment, refund, and reconciliation records. | External payment processing and platform billing ownership remain separate. | Candidate |
| CC-11 | Tax Management | Sales need applicable tax calculation, evidence, and reporting. | Shared Rules and compliance Knowledge retain their owners. | Candidate |
| CC-12 | Invoice, Receipt, and Document Management | Commerce needs traceable commercial documents and templates. | Shared document patterns and Knowledge remain external where applicable. | Candidate |
| CC-13 | Return and Commercial Adjustment Management | Businesses need controlled reversal, exchange, cancellation, and adjustment behavior. | Exact legal, payment, inventory, and invoice effects remain open. | Candidate |
| CC-14 | Inventory Transfer | Multi-location businesses need controlled stock movement. | Both source and target use canonical Branch identities. | Candidate |
| CC-15 | Commerce Reporting and Dashboards | Operators need explainable sales, tax, inventory, and performance views. | Analytics Intake owns platform analytics governance; projections never own writes. | Candidate |
| CC-16 | Commerce Staff and Permission Enforcement | Commerce needs operational roles without requiring another OS. | Core owns identity and Permission framework; Commerce owns resource invariants and OS roles. | Candidate |
| CC-17 | Commerce Notification, Audit, Search, and Analytics Participation | Commerce needs shared platform services without duplicating them. | Core services retain their canonical records and policies. | Candidate |
| CC-18 | Optional Commerce Extension and Integration | Commerce may add fulfilment, store, delivery, kitchen, loyalty, supplier, pharmacy, repair, or cross-OS value. | Extensions are optional and cannot replace Commerce Core truth. | Candidate |

## 9. Candidate Domains

The following sixteen domain candidates organize questions only. Their boundaries, names, aggregates, cardinality, and internal structure are not approved.

| ID | Candidate domain | Candidate concern | Boundary uncertainty | Status |
|---|---|---|---|---|
| CD-01 | Commerce Setup and Configuration | Commerce preset, settings, Modules, target validation, readiness contribution | Boundary with Core lifecycle, Configuration Engine, and Product Hub | Candidate |
| CD-02 | Product Catalog | Products, services, categories, variants, units, identifiers | Relationship to Marketplace assets and shared product Knowledge | Candidate |
| CD-03 | Commerce Pricing | Sell prices, discounts, price context | Tax, promotion, plan, and future pricing boundaries | Candidate |
| CD-04 | Inventory | Stock, availability, adjustments, counts | Ledger shape, valuation, reservations, batches, expiry, and serial tracking | Candidate |
| CD-05 | Orders | Commercial commitment and order lifecycle | Channel, fulfilment, cancellation, return, and invoice relationships | Candidate |
| CD-06 | Point of Sale | Checkout session and in-person transaction workflow | Session, offline, device, shift, and order boundaries | Candidate |
| CD-07 | Transactional Customers | Customer identity used by Commerce transactions | Boundary with Core identity, privacy, and future CRM workflows | Candidate |
| CD-08 | Payments and Refunds | Payment and refund records linked to Commerce transactions | Processor, settlement, cash, reconciliation, and billing boundaries | Candidate |
| CD-09 | Taxes | Commerce tax settings, calculation, evidence, and reporting | Country policy, Rules Engine, invoice, and product classification boundaries | Candidate |
| CD-10 | Invoices and Commerce Documents | Receipts, invoices, refund documents, numbering, templates | Legal immutability, localization, template, and order boundaries | Candidate |
| CD-11 | Returns and Adjustments | Returns, exchanges, cancellations, corrections | Effects on order, payment, inventory, tax, invoice, and Audit | Candidate |
| CD-12 | Transfers | Stock movement between canonical Branch scopes | Ownership, transit, receipt, and failure boundaries | Candidate |
| CD-13 | Commerce Reporting | Operational dashboards and reports | Read models, Analytics Intake, freshness, and auditability | Candidate |
| CD-14 | Commerce Access | OS roles, resource authorization, staff operating context | Core Permission framework versus Commerce invariant enforcement | Candidate |
| CD-15 | Commerce Operational Scope | Business Unit and Branch-scoped Commerce configuration and behavior | Core organization identity versus Commerce operational attributes | Candidate |
| CD-16 | Commerce Extensions | Optional online store, delivery, kitchen, loyalty, supplier, pharmacy, and repair extensions | Module versus Marketplace versus future OS boundary | Candidate |

## 10. Candidate Responsibilities

| Candidate responsibility | Possible Commerce responsibility | Retained external owner | Proposal work required |
|---|---|---|---|
| Interpret Setup Handoff | Validate and continue Commerce setup | Product Hub owns handoff journey; Core owns context | Define handoff Contract and recovery |
| Select operational scope | Use approved Business Unit and Branch identities | Core Organization Registry | Define selection/create protocol |
| Apply Commerce Configuration | Validate and apply approved target changes | Configuration Engine owns Proposal | Define policy, idempotency, rejection, rollback |
| Seed Commerce defaults | Materialize allowed preset suggestions | Business DNA and Recommendation owners retain truth | Define preset and Module model |
| Manage products and prices | Own Commerce catalog and sell-price state | Knowledge/Capability/Marketplace owners retain assets | Define catalog and pricing boundaries |
| Manage stock | Own Commerce inventory state and movement | Core owns organization identity | Define stock truth and concurrency |
| Conduct sales | Own order and POS workflows | Core owns commercial subscription, not sale | Define transaction boundary |
| Record payments and refunds | Own Commerce payment evidence and effects | External processors and Core billing retain their domains | Define reconciliation boundary |
| Calculate taxes and issue documents | Own Commerce calculation/application and records | Knowledge/Rules own shared policy | Define tax and document invariants |
| Manage returns and transfers | Own Commerce reversal and movement workflows | No external lifecycle owner identified yet | Decide aggregate relationships |
| Enforce Commerce access | Enforce resource and domain authorization | Core owns identity and Permission framework | Define OS roles and scopes |
| Present operational insight | Own Commerce reports and dashboards | Analytics Intake owns platform aggregation | Define read models and freshness |
| Publish Commerce facts | Expose approved state changes | Core owns Event governance and transport | Identify Domain Events and consumers |
| Support optional extensions | Validate Commerce-side compatibility and effects | Marketplace or other OS retains its state | Define extension contracts |
| Support AI proposals | Validate approved Commerce action requests | AI Coordinator owns AI artifacts | Define tools, approval, and audit boundaries |

No candidate responsibility establishes a component, aggregate, Contract, Event, or write model.

## 11. Candidate Boundaries

### 11.1 Commerce OS versus Core Platform

Candidate boundary: Core owns shared identity, organization identity, commercial controls, Product Hub, and shared services. Commerce owns Commerce-specific setup, configuration, operations, and records scoped to Core identifiers.

Open boundary: exact Organization Registry write protocol, lifecycle reconciliation, plan enforcement, handoff, and readiness evaluation.

### 11.2 Commerce OS versus Business Brain

Candidate boundary: Business Brain owns governed Decisions; Commerce owns operational execution. Business Brain output may inform Commerce but cannot mutate Commerce state directly.

Open boundary: which Decision, Recommendation, and Configuration context Commerce consumes and which outcomes are eligible feedback.

### 11.3 Commerce OS versus Product Hub

Candidate boundary: Product Hub routes and composes; Commerce sets up and operates. Product Hub never implements Commerce setup or logic.

Open boundary: handoff Contract, status projection, stale state, failure recovery, and launch readiness.

### 11.4 Commerce OS versus Marketplace

Candidate boundary: Marketplace owns immutable assets and scoped lifecycle; Commerce owns Commerce-side validation, activation effects, and operational truth.

Open boundary: extension points, compatibility, isolation, uninstall, data retention, and recovery.

### 11.5 Commerce OS versus AI Coordinator

Candidate boundary: AI proposes or explains; Commerce authorizes, validates, and executes through its own domain boundary.

Open boundary: tool catalog, read/write separation, human approval, context minimization, and traceability.

### 11.6 Commerce OS versus Business DNA, Knowledge, Rules, and Capabilities

Candidate boundary: Commerce references approved business and platform intelligence; it never creates competing source truth. Commerce configuration is not Business DNA, and Commerce operational data is not platform Knowledge.

Open boundary: applicability, version pinning, local configuration, and change propagation.

### 11.7 Commerce Core versus optional extensions

Candidate boundary: products, inventory, orders, transactional customers, payments, taxes, invoices, and their core records remain singular. Optional modules and Marketplace assets extend these records rather than replace them.

Open boundary: the minimum immutable Commerce Core and which candidates are core, optional Module, Marketplace extension, or future OS integration.

### 11.8 Commerce OS versus other Operating Systems

Candidate boundary: Commerce remains standalone. Optional integrations use versioned, authorized Contracts and preserve each source owner.

Open boundary: customer/lead, employee/staff, prescription/sale, repair/parts, membership/payment, and similar future integration mappings.

## 12. Upstream Dependencies

| Upstream dependency | Owner | Commerce need | Dependency rule |
|---|---|---|---|
| Identity and authentication context | Core Platform | Verified actor or service | Commerce never owns credentials or sessions |
| Workspace, Business, Business Unit, Department, Branch | Core Organization Registry | Canonical operating scope | References only; operational attributes remain Commerce-owned |
| Workspace Entitlement, OS Subscription, Product, Plan, installation | Core commercial owners | Eligibility and lifecycle context | Commerce never owns billing truth |
| Setup and Launch Handoff | Product Hub/Core boundary | Authorized entry and recovery context | Reauthorize on arrival |
| Permission framework | Core Permissions | Identity, roles, assignments, scopes | Commerce enforces its own resource invariants |
| Business DNA | Business DNA Registry | Business-scoped context | Consume published version only |
| Knowledge and Knowledge Packs | Knowledge Engine | Applicable commerce guidance | Consume immutable versioned references |
| Rules | Rules Engine | Deterministic outcomes | Never override with AI or local hidden policy |
| Capabilities | Capability Registry | Canonical Capability references | Commerce Modules may implement; never redefine |
| Business Brain Decision | Business Brain | Governed Decision and insight context | Read only; never mutate |
| Recommendation | Recommendation Engine | Accepted business improvement context | Candidate is not sufficient |
| Configuration Proposal | Configuration Engine | Proposed target configuration | Commerce validates and applies under policy |
| Marketplace Asset and scoped state | Marketplace | Compatible optional extensions | Marketplace retains asset lifecycle |
| AI Action Proposal | AI Coordinator | Optional advisory action request | No execution authority |
| Notifications, Audit, localization, Search, Storage, Analytics, API, Events, observability | Core shared services | Platform capabilities | Consume through approved Contracts |

An upstream dependency must not turn another Operating System into a requirement for the Commerce core workflow.

## 13. Downstream Dependencies

Commerce OS may become an upstream source for the following consumers. These relationships remain candidates until approved Contracts are defined.

| Candidate downstream consumer | Possible Commerce output | Ownership rule |
|---|---|---|
| Product Hub | setup, activation, readiness, pause, update, and recovery projections | Product Hub owns composition; Commerce owns Commerce source status where applicable |
| Core Notifications | Commerce notification request or fact | Notification service owns delivery state |
| Audit Service | consequential Commerce action reference | Audit Service owns Audit Records |
| Search Coordination | authorized Commerce projection | Search owns index projection, not Commerce truth |
| Analytics Intake | approved Commerce metric or event projection | Analytics owns intake/aggregation, not operational records |
| Business Brain and Recommendation feedback processes | approved outcome reference | No source rewrite; future reasoning only |
| AI Coordinator | minimum authorized Commerce context and owner-controlled tools | AI owns AI artifact; Commerce owns facts and execution |
| Marketplace | compatibility, activation outcome, or extension health | Marketplace owns asset/scoped lifecycle |
| Optional Operating System integrations | authorized Commerce facts | Source ownership remains Commerce; consumer remains optional |
| External partners | approved future public or Partner Contract | No direct database or internal model exposure |

## 14. Inputs

### 14.1 Frozen input categories

| Input | Canonical owner | Candidate Commerce use |
|---|---|---|
| Authorization Context | Core Platform | Scope every protected operation |
| Workspace and organization identifiers | Core Organization Registry | Anchor Commerce records and navigation |
| Product, Plan, entitlement, subscription, installation context | Core commercial owners | Determine eligibility and limits without copying truth |
| Setup/Launch Handoff | Product Hub/Core boundary | Begin or resume Commerce experience |
| Business DNA Snapshot | Business DNA Registry | Suggest appropriate setup and configuration |
| Knowledge and Knowledge Pack versions | Knowledge Engine | Apply governed commerce guidance |
| Deterministic Rule outcomes | Rules Engine | Apply governed policy and evidence |
| Capability references | Capability Registry | Relate Commerce behavior to business need |
| Completed Business Brain Decision | Business Brain | Consume authorized guidance or insight |
| Accepted Recommendation | Recommendation Engine | Establish approved improvement context |
| Configuration Proposal | Configuration Engine | Validate and apply allowed Commerce configuration |
| Marketplace asset and scoped state | Marketplace | Consume compatible optional asset |
| AI Action Proposal | AI Coordinator | Request separately authorized validation and action |
| User-entered operational data | Authorized Commerce actor | Create Commerce-owned facts after validation |
| External integration input | External owner through approved Contract | Extend optional workflows without ownership transfer |

### 14.2 Input questions

- Which inputs are mandatory for Commerce setup versus daily operation?
- Which exact source versions must be pinned to configuration or transactions?
- How is stale, withdrawn, superseded, or unavailable upstream context handled?
- Which external inputs are commands, proposals, facts, projections, or evidence?
- Which inputs require human confirmation before Commerce creates operational state?

## 15. Outputs

### 15.1 Candidate Commerce-owned outputs

- Commerce setup and configuration outcomes;
- Commerce readiness contribution and operational status;
- product, category, variant, unit, identifier, and sell-price records;
- inventory and branch-scoped stock records;
- orders and order history;
- POS operational records;
- transactional customer records;
- payments, refunds, and reconciliation evidence;
- tax calculation and reporting records;
- invoices, receipts, numbering, and Commerce documents;
- returns, exchanges, cancellations, adjustments, and transfers;
- Commerce role and resource-authorization outcomes;
- Commerce reports, dashboards, and read projections;
- Commerce Domain Events when later approved; and
- Audit, Notification, Search, Analytics, Product Hub, Marketplace, AI, or integration inputs that expose only owned Commerce facts.

Every item remains a candidate output category. Exact write models, owners within Commerce, lifecycles, schemas, Events, and Contracts require Proposal decisions.

### 15.2 Outputs never produced as Commerce-owned truth

- Workspace, Business, Business Unit, Department, or Branch identity;
- Business DNA;
- Knowledge, Rule, or Capability definitions;
- Recommendation or disposition;
- Implementation Option;
- Configuration Proposal;
- Product Hub lifecycle composition;
- Marketplace Asset or Marketplace scoped state;
- AI artifact or AI Action Proposal;
- Audit Record; or
- another OS's operational record.

## 16. Open Questions

The following questions are intentionally unanswered.

### 16.1 Commerce identity and scope

1. What is the exact operational identity of one Commerce installation within a Workspace, Business, and Business Unit?
2. Can one Business operate more than one Commerce Business Unit, and what remains shared versus separate?
3. Which Commerce data is Business Unit-scoped, Branch-scoped, Workspace-scoped, or platform-shared?
4. How does Commerce select or request creation of a Business Unit through the deferred Organization Registry contract?
5. Which Commerce operations require one Main Branch, and how is that canonical relationship consumed?

### 16.2 Commerce Core and Modules

6. What is the minimum immutable Commerce Core?
7. Which candidate capabilities are core, optional Modules, Marketplace extensions, or future integrations?
8. How are Module states, dependencies, compatibility, entitlements, and plan limits represented?
9. What may a Commerce preset seed, recommend, or configure?
10. How are preset updates separated from user-owned configuration?
11. How is module-driven navigation derived without hardcoding a business preset?

### 16.3 Setup, configuration, and readiness

12. What exact Commerce setup steps are required before Operating System Ready?
13. Which fields are Core organization identity versus Commerce legal, billing, tax, or operational configuration?
14. How does Commerce consume and validate a Configuration Proposal?
15. Which changes require customer review versus approved automatic application?
16. How are partial application, rejection, incompatibility, retry, rollback, and Audit represented?
17. Which lifecycle owner determines installed, configured, activated, ready, operational, paused, archived, and removed status?
18. How does the architecture evolve or replace legacy `OSEnablement` without collapsing lifecycle concepts?

### 16.4 Product catalog and pricing

19. What are the canonical Commerce product, service, category, variant, unit, SKU, and barcode concepts?
20. Which identifiers are unique within Workspace, Business Unit, Branch, or Commerce installation?
21. How are price lists, discounts, promotions, tax-inclusive prices, cost, and history separated?
22. Which product attributes are core, preset-provided, Module-provided, or extension-provided?
23. How are deleted, archived, merged, or superseded catalog records handled historically?

### 16.5 Inventory and transfers

24. What is the canonical stock source of truth?
25. Is inventory represented as current balance, immutable movement history, or another governed model?
26. How are reservations, availability, adjustments, counts, negative stock, and concurrency handled?
27. What is the transfer lifecycle between canonical Branch scopes?
28. Which batch, expiry, serial, IMEI, supplier, or valuation concerns are core versus future Modules?
29. How do order, return, refund, transfer, and inventory effects remain consistent without a shared cross-domain write owner?

### 16.6 Orders and POS

30. What is the canonical Order aggregate and lifecycle?
31. Which sales channels use the same Order model?
32. How are draft, held, completed, cancelled, returned, refunded, and failed outcomes distinguished?
33. What does a POS session own, and how is it scoped to Workspace, Business Unit, Branch, and operator?
34. Which POS behaviors require online authority, and what offline-tolerant behavior is allowed later?
35. How are discounts, taxes, payments, inventory, invoices, and Audit coordinated during checkout?
36. What idempotency and recovery rules prevent duplicate sales or effects?

### 16.7 Customers, payments, taxes, and documents

37. What is the minimum transactional customer model, and how does it differ from Core identity or future CRM?
38. What consent, privacy, retention, merge, anonymization, and deletion policies apply to customer data?
39. What does Commerce own about payment versus an external processor, settlement provider, or Core billing?
40. How are split tender, cash, partial payment, refund, chargeback, reconciliation, and failure represented?
41. How are country-specific tax applicability and deterministic Rule outcomes applied and versioned?
42. What are the immutable boundaries among order, payment, tax, invoice, receipt, and refund documents?
43. How are numbering, bilingual templates, correction, cancellation, and legal preservation governed?

### 16.8 Returns, reports, and operational access

44. What are the distinct responsibilities and lifecycles for return, exchange, cancellation, refund, and adjustment?
45. Which reports are operational Commerce read models versus platform Analytics projections?
46. What freshness, historical reproducibility, export, and reconciliation guarantees do reports require?
47. Which Commerce roles and Permissions are required at Business Unit, Branch, and resource scope?
48. How are lightweight Commerce staff roles supported without HR OS?
49. Which actions require separation of duties, additional approval, or append-only Audit evidence?

### 16.9 Contracts, Events, extensions, and operations

50. What internal and external Commerce Contracts are required?
51. Which Commerce state changes require Domain Events, and which approved consumers need Integration Events?
52. What are the idempotency, ordering, replay, retention, compatibility, and failure-recovery rules?
53. Which Product Hub projections and handoff Contracts are required?
54. Which Marketplace extension points may affect Commerce behavior without creating parallel truth?
55. Which optional cross-OS integration facts may Commerce publish or consume?
56. Which AI tools may read or propose Commerce actions, and which actions always require human approval?
57. What Security classification, encryption, retention, legal hold, and incident rules apply?
58. What observability, SLO, SLA, error-budget, capacity, backup, recovery, and continuity requirements apply?
59. Which logical domains become modules inside the modular monolith, and which dependency directions are allowed?
60. What is the exact MVP boundary versus future Commerce extensions?

## 17. Risks

| ID | Discovery risk | Potential impact | Discovery control |
|---|---|---|---|
| R-01 | Commerce becomes a POS-only product. | Order, inventory, payment, tax, invoice, and reporting architecture fragments. | Define the Commerce operating problem before screens. |
| R-02 | Commerce becomes a giant ERP. | Unrelated domains move into one OS and violate independence. | Keep Commerce limited to its operational domain and optional integrations. |
| R-03 | Core absorbs Commerce setup or logic. | Core becomes Commerce-specific and future OSs inherit wrong assumptions. | Preserve OS-owned setup and Core-owned shared services. |
| R-04 | Commerce duplicates Core organization identity. | Business Unit and Branch ancestry diverge. | Reference canonical Core identifiers through approved Contracts. |
| R-05 | Subscription, installation, setup, activation, readiness, and operation collapse into one state. | Product Hub, billing, recovery, and launch become inconsistent. | Preserve the standard OS lifecycle as separate concepts. |
| R-06 | Business DNA stores Commerce software state. | Permanent Business truth becomes product-dependent. | Keep presets, Modules, plans, and configuration outside Business DNA. |
| R-07 | Business Brain or Recommendation output mutates Commerce directly. | Owner validation and customer control are bypassed. | Require Configuration Proposal and Commerce-side authorization. |
| R-08 | Presets hardcode workflows or navigation. | Businesses cannot configure Modules independently. | Treat presets as candidate starter defaults only. |
| R-09 | Optional modules create parallel products, orders, inventory, customers, payments, invoices, or taxes. | Commerce loses one source of truth. | Define Commerce Core invariants before extension design. |
| R-10 | Transaction boundaries are chosen before domain ownership is clear. | Partial sales, duplicate effects, and unreconciled state result. | Defer aggregate and transaction design to the Proposal and Waves. |
| R-11 | Branch scope is implicit. | Cross-location data leakage and incorrect stock or reporting occur. | Require explicit Business Unit, Branch, and resource context. |
| R-12 | Commerce customer data expands into CRM ownership. | Independent OS boundaries blur. | Limit candidate customer scope to Commerce transactions. |
| R-13 | Commerce operational roles require HR OS. | Commerce cannot operate independently. | Preserve lightweight OS roles using Core identity and access. |
| R-14 | Marketplace extensions receive unrestricted Commerce authority. | Tenant isolation, integrity, and source ownership fail. | Keep extension, sandbox, and tool authority unresolved until governed. |
| R-15 | AI output becomes transaction authority. | Consequential actions bypass humans, Permissions, and invariants. | Keep AI downstream and action proposals non-executing. |
| R-16 | Reports or Search become a second source of truth. | Reconciliation and recovery become unreliable. | Keep projections disposable and source-owned facts canonical. |
| R-17 | Commerce requires another OS for a core workflow. | Standalone operation and subscription independence fail. | Make all cross-OS integrations optional and failure-isolated. |
| R-18 | Logical candidates are treated as physical services or technologies. | Premature distribution conflicts with the modular monolith. | Keep Discovery technology-independent and candidate-only. |

## 18. Unknowns

The current baseline does not yet determine:

- the approved Commerce capability catalog;
- the approved Commerce bounded contexts;
- the minimum Commerce Core;
- aggregate, entity, value-object, and write-model boundaries;
- canonical Commerce lifecycle states;
- required versus optional Modules;
- exact preset semantics;
- Commerce setup and readiness criteria;
- Organization Registry write protocol;
- Plan limit and entitlement enforcement split;
- POS session and transaction semantics;
- product, pricing, inventory, order, customer, payment, tax, invoice, return, and transfer models;
- configuration, correction, supersession, archival, and deletion policies;
- Contract and Event catalogs;
- read models, Search, Analytics, reporting, and freshness;
- OS roles and Permission catalog;
- data classification, privacy, retention, residency, and compliance;
- Marketplace extension points and isolation;
- AI tool and action boundaries;
- reliability, recovery, offline, capacity, and service-level expectations;
- physical module/package decomposition; and
- the MVP and future-release boundary at architecture level.

These unknowns are not contradictions. They are inputs to the Capability Map, Proposal, ADR, and Documentation Wave phases.

## 19. Required ADRs

### 19.1 Existing Accepted ADR authority

Commerce OS is already governed by the forty Accepted Governance ADRs. The most directly applicable include:

- `ADR-002` — Core shared control and intelligence plane;
- `ADR-003` through `ADR-006` — tenant, hierarchy, Business DNA, and aggregation;
- `ADR-007` through `ADR-011` — Capabilities, Modules, Knowledge, Knowledge Packs, and Rules;
- `ADR-012` through `ADR-017` — Business Brain, Recommendations, human control, Business Architect, and configuration;
- `ADR-018` through `ADR-023` — readiness, Product Hub, entitlement, subscription, and Business Unit operation;
- `ADR-024` — independent OS domain ownership;
- `ADR-025` — optional Contract-based OS integration;
- `ADR-026` — standard OS lifecycle;
- `ADR-027` and `ADR-028` — Marketplace boundary and immutable assets;
- `ADR-029` through `ADR-032` — governed downstream AI and learning;
- `ADR-033` — enforced modular monolith;
- `ADR-034` through `ADR-037` — explicit scope, compatible Contracts, API architecture, and navigation;
- `ADR-038` — append-only Audit;
- `ADR-039` — data-driven configuration; and
- `ADR-040` — Core organization identity and OS operational ownership.

Discovery changes none of these ADRs.

### 19.2 Candidate Commerce ADR subjects

The following are candidate ADR subjects, not approved decisions or new ADRs:

1. Commerce OS mission and bounded operational domain.
2. Minimum Commerce Core versus optional Modules and extensions.
3. Commerce operational scope over canonical Business Unit and Branch identities.
4. Commerce setup, configuration, activation, readiness, and lifecycle ownership.
5. Commerce Configuration Proposal validation and application boundary.
6. Product catalog and Commerce pricing boundaries.
7. Inventory source-of-truth and movement model.
8. Order and POS transaction boundaries.
9. Transactional customer boundary versus future CRM.
10. Payment, refund, reconciliation, and external processor boundaries.
11. Tax, invoice, receipt, and Commerce document boundaries.
12. Return, exchange, adjustment, and transfer boundaries.
13. Commerce operational roles and Permission scopes.
14. Commerce report, projection, Search, and Analytics boundaries.
15. Commerce Contract and Domain Event ownership.
16. Commerce Core extension and Marketplace integration rules.
17. Optional cross-OS integration boundaries.
18. Commerce AI Tool and AI Action Proposal validation boundary.
19. Commerce reliability, offline, recovery, and continuity principles.
20. Commerce logical module dependency direction inside the modular monolith.

Governance review must determine whether a subject requires a new ADR, is already covered by an Accepted ADR, belongs in the Proposal, or remains deferred.

## 20. Proposal Exit Criteria

Discovery is sufficient to proceed toward a Capability Map and later Proposal only if the next phases:

1. preserve all Core Platform and Business Brain Freeze guarantees;
2. keep Commerce OS independently usable;
3. define an approved Commerce capability map without treating capabilities as components;
4. define the minimum Commerce Core and optional extension boundary;
5. assign every canonical Commerce responsibility and write model to exactly one owner;
6. preserve Core organization identity while locating Commerce operational attributes inside Commerce;
7. preserve distinct commercial, installation, setup, configuration, activation, readiness, and operational lifecycles;
8. define Commerce setup and Product Hub handoff boundaries;
9. define Business Brain, Recommendation, Configuration, Marketplace, and AI relationships without ownership duplication;
10. identify candidate aggregates and lifecycles without exposing physical storage;
11. define logical Contract, Event, read-model, Security, Audit, observability, and reliability responsibilities at Proposal level;
12. keep Business DNA software-independent and Knowledge/Rules/Capabilities externally owned;
13. preserve accepted Recommendation context before Configuration application;
14. ensure optional Modules cannot create parallel Commerce Core truth;
15. keep all cross-OS integration optional;
16. record unresolved MVP, policy, schema, technology, and operational decisions explicitly;
17. identify which candidate ADR subjects need Governance action; and
18. pass an independent Proposal Architecture Review before Documentation Waves begin.

## 21. Discovery Conclusions

### 21.1 Established problem space

Commerce OS is the first independent Operating System built on the frozen Core Platform and Business Brain baselines. It must own Commerce-specific setup, configuration, workflows, operational data, navigation, Permissions, dashboards, reports, and endpoints while consuming shared platform capabilities through governed Contracts.

The central architectural problem is not whether Nexoraxs needs Commerce. It is how to define a coherent Commerce operational domain that:

- supports selling from setup through operational insight;
- preserves one source of truth for core Commerce records;
- uses canonical Core organization and commercial context;
- responds to governed Business intelligence without surrendering target ownership;
- permits presets, Modules, Marketplace assets, AI assistance, and cross-OS integrations without parallel truth or mandatory coupling; and
- remains a logical modular-monolith domain until evidence and Governance justify physical evolution.

### 21.2 Candidate landscape

Discovery records:

- **18 candidate capabilities**;
- **16 candidate domains**;
- **15 candidate responsibility areas**;
- **8 candidate boundary groups**;
- **60 open architectural questions**;
- **18 risks**;
- **20 candidate ADR subjects**; and
- a defined set of unresolved Commerce unknowns.

None is approved architecture by this document.

### 21.3 Readiness assessment

The frozen predecessor baselines provide sufficient ownership, lifecycle, Security, Contract, Event, AI, Marketplace, and independent-OS constraints to organize the next logical discovery artifact.

The remaining questions are substantial but are the intended inputs to a Commerce OS Capability Map. They do not reveal a contradiction that blocks continued discovery.

### 21.4 Recommendation

# READY FOR CAPABILITY MAP

No Commerce OS Proposal or detailed Documentation Wave is authorized by this conclusion.

## References

### Governance

- `docs/00-governance/`
- `docs/00-governance/MILESTONE-LIFECYCLE.md`
- `docs/00-governance/ADR/ADR-024-independent-operating-system-domain-ownership.md`
- `docs/00-governance/ADR/ADR-025-contract-based-optional-os-integration.md`
- `docs/00-governance/ADR/ADR-026-standard-operating-system-lifecycle.md`
- `docs/00-governance/ADR/ADR-040-core-organization-identity-os-operational-data.md`

### Genesis

- `docs/01-genesis/02-CONSTITUTION.md`
- `docs/01-genesis/03-BUSINESS-DNA.md`
- `docs/01-genesis/04-CAPABILITIES.md`
- `docs/01-genesis/05-KNOWLEDGE-ENGINE.md`
- `docs/01-genesis/06-BUSINESS-BRAIN.md`
- `docs/01-genesis/07-RECOMMENDATION-ENGINE.md`
- `docs/01-genesis/08-AI-STRATEGY.md`
- `docs/01-genesis/09-PLATFORM-BLUEPRINT.md`
- `docs/01-genesis/13-PRODUCT-HUB.md`
- `docs/01-genesis/14-SUBSCRIPTION-MODEL.md`
- `docs/01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md`
- `docs/01-genesis/17-MARKETPLACE-ARCHITECTURE.md`

### Frozen predecessor milestones

- `docs/02-core-platform/`
- `docs/03-business-brain/`
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md`
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.0.1-READINESS.md`
- `docs/99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md`
- `docs/99-architecture-freeze/BUSINESS-BRAIN-READINESS.md`
