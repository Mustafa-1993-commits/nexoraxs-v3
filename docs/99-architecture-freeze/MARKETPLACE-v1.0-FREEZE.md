# Marketplace Architecture v1.0 Freeze

**Architecture Version:** Marketplace Architecture v1.0  
**Documentation Baseline:** Marketplace Documentation Baseline v1.0  
**Freeze Date:** 2026-07-13  
**Freeze Status:** FROZEN  
**Milestone:** Marketplace

---

## 1. Executive Summary

Marketplace Architecture v1.0 is the official frozen architectural baseline for the Nexoraxs
Marketplace milestone.

Marketplace is the platform ecosystem for governed discovery, distribution, installation,
activation, licensing, updates, compatibility, validation, and lifecycle management of platform
Assets. It is not an e-commerce marketplace and does not own target Operating System facts.

This Freeze supersedes the Marketplace Proposal and Proposal Patch as the primary architectural
reference. Those documents remain immutable provenance for the decisions summarized here. This
Freeze introduces no architecture, owner, Domain, Capability, canonical fact, write model,
aggregate, lifecycle, ADR, implementation, or technology.

The Marketplace Final Architecture Review returned **APPROVED FOR FREEZE** with:

- zero Blocking Issues;
- zero remaining Editorial Notes;
- 12 approved Domains;
- 24 approved Capabilities;
- 23 canonical facts;
- 18 canonical write models;
- 18 aggregate candidates;
- 50 preserved Deferred Decisions;
- 32 directly applicable Accepted ADR dependencies;
- 14 retained non-authoritative Draft ADR subjects; and
- six non-blocking residual risk groups.

## 2. Freeze Authority and Baseline

### 2.1 Governing authority

This Freeze is governed by, in order:

1. Accepted Governance ADRs and canonical Governance definitions;
2. Genesis v1.1;
3. Core Platform Architecture v1.0 and Documentation Baseline v1.0.1;
4. Business Brain Architecture v1.0 and Documentation Baseline v1.0;
5. Commerce OS Architecture v1.0 and Documentation Baseline v1.0; and
6. the approved Marketplace milestone source documents listed below.

### 2.2 Marketplace source documents included

| Order | Included document | Frozen role |
|---:|---|---|
| 1 | `docs/05-marketplace/00-MARKETPLACE-DISCOVERY.md` | Approved Discovery provenance |
| 2 | `docs/05-marketplace/01-MARKETPLACE-CAPABILITY-MAP.md` | Approved logical capability provenance |
| 3 | `docs/05-marketplace/02-MARKETPLACE-PROPOSAL.md` | Original Proposal architecture |
| 4 | `docs/05-marketplace/03-MARKETPLACE-ARCHITECTURE-REVIEW.md` | Independent Proposal findings |
| 5 | `docs/05-marketplace/04-MARKETPLACE-PROPOSAL-PATCH-v0.1.1.md` | Controlling PP-01 through PP-10 corrections |
| 6 | `docs/05-marketplace/05-MARKETPLACE-RE-REVIEW.md` | Approval of merged Proposal Baseline v0.1.1 |
| 7 | `docs/05-marketplace/06-MARKETPLACE-WAVE-1.md` | Terminology and baseline traceability |
| 8 | `docs/05-marketplace/07-MARKETPLACE-WAVE-2.md` | Cross-milestone and ownership navigation |
| 9 | `docs/05-marketplace/08-MARKETPLACE-WAVE-3.md` | Completeness and review-readiness validation |
| 10 | `docs/05-marketplace/09-MARKETPLACE-FINAL-ARCHITECTURE-REVIEW.md` | Final approval for Freeze |

### 2.3 Interpretation rule

This Freeze is the controlling Marketplace architectural reference. Source documents remain
provenance and audit evidence. They must be interpreted as Proposal v0.1 with Patch v0.1.1
applied and the Final Architecture Review satisfied.

If a future statement conflicts with this Freeze, this Freeze controls until an approved ADR,
Architecture Review, and updated Freeze explicitly supersede it.

## 3. Approved Scope

Marketplace v1.0 owns the following architectural scope:

1. Marketplace Publisher and Publisher Participation records referencing Core identity or
   organization facts without duplication.
2. Marketplace Asset identity, category assignment, descriptive information, and provenance.
3. Marketplace Asset Versions, Draft content, immutable Published content, release history, and
   shared lifecycle.
4. submission intake, Marketplace Review, validation evidence, Marketplace Certification, and
   derived Trust views.
5. Compatibility Declarations, Marketplace Compatibility Assessments, Dependency Declarations,
   and Installation-scoped Dependency Resolution outcomes.
6. Marketplace License Definitions and Marketplace Offers without Core financial ownership.
7. Workspace-scoped Marketplace Purchase and Marketplace Entitlement.
8. Distribution Availability for Published immutable Marketplace Asset Versions.
9. Workspace-scoped Marketplace Version Selection, Installation, Marketplace Scoped
   Configuration, and Activation.
10. Workspace- or selected-Business-scoped Marketplace Applicability.
11. upgrade, deactivation, and removal coordination for scoped Marketplace state while
    preserving immutable shared and attributable scoped history.
12. Marketplace discovery projections and Core Search participation.
13. participation in Implementation Option, Recommendation, Product Hub, Analytics, Audit,
    Notification, and AI Expert eligibility flows without external ownership transfer.
14. Marketplace Security, privacy, Governance, operations, support coordination, and
    observability responsibilities inside shared Core foundations.
15. official and future approved publisher participation under category-specific validation and
    Governance.

## 4. Approved Non-Scope

Marketplace v1.0 does not own or implement:

- physical-product or consumer-goods commerce;
- Commerce Product, Price, Stock, Inventory Movement, Transfer, Order, POS Transaction,
  Transactional Customer, Payment, Refund, tax, Commerce Document, Return, Exchange, Commercial
  Adjustment, Commerce Setup, or Commerce readiness truth;
- User identity, Authentication, Workspace Membership, canonical Permission grants, Workspace,
  Business, Business Unit, Department, or Branch identity;
- Core OS Product, Plan, billing, payment, invoice, settlement, tax, OS Subscription, or final OS
  readiness truth;
- Product Hub journey composition;
- Business DNA, Knowledge, Rule, or Capability definitions;
- Business Brain Decision or Recommendation Candidate content;
- Recommendation creation, prioritization, explanation, or disposition;
- Implementation Option mapping;
- Configuration Proposal or target configuration;
- AI Expert selection, AI orchestration, AI response, or AI Action Proposal;
- an Operating System's setup, navigation, Permission grant, workflow, configuration, or
  operational data;
- Audit Record, Notification state, Search Index, or platform Analytics projection;
- unrestricted execution of third-party code;
- automatic Permission assignment through Purchase, Installation, or Activation;
- a customer-owned copy of shared Marketplace Asset content;
- mutation or deletion of a Published Marketplace Asset Version; or
- physical implementation, API, Event, Contract, database, infrastructure, deployment, or
  technology choices.

## 5. Accepted Architectural Principles

1. Marketplace is a bounded context within Core Platform and remains distinct from Product Hub.
2. Business value takes precedence over Asset count.
3. Published Asset Versions are shared; customer state is separate and scoped.
4. Every canonical fact, write model, aggregate, lifecycle, and projection has one owner.
5. Capabilities precede implementation options; Marketplace owns no Decision or Recommendation.
6. Activation is not authorization and never grants Permission.
7. The target owner controls target configuration and operational state.
8. Marketplace integration remains optional for every independent OS core workflow.
9. Marketplace Assets create no parallel platform or OS truth.
10. A Published-version change creates a new immutable version.
11. Upgrade explicitly selects another immutable version and preserves history.
12. Marketplace Review and Compatibility Assessment do not replace target validation.
13. Trust views are attributable, explainable, and non-authoritative.
14. Tenant isolation, least privilege, privacy, and Auditability apply by default.
15. Search, Analytics, Trust, discovery, and operational projections are not ownership.
16. Logical Domains do not imply services, storage, deployment, or technology boundaries.

## 6. Approved Domains

| ID | Domain | Canonical responsibility | Explicit exclusion |
|---|---|---|---|
| MPD-01 | Marketplace Asset Catalog | Asset identity, category assignment, descriptive information, provenance | Asset Version publication and customer-scoped state |
| MPD-02 | Marketplace Publisher and Ecosystem Participation | Marketplace Publisher and Publisher Participation | Core identity, Workspace, Business, legal-party, or partner identity |
| MPD-03 | Marketplace Asset Lifecycle and Versioning | Marketplace Asset Version and shared version lifecycle | Review evidence, customer Installation, target configuration |
| MPD-04 | Marketplace Review, Validation, Certification, and Trust | Review, Certification, assurance evidence, Trust projection | publication transition and target authorization |
| MPD-05 | Marketplace Compatibility and Dependencies | Compatibility Declaration, Assessment, Dependency Declaration | final target decision and dependency target writes |
| MPD-06 | Marketplace Licensing and Commercial Participation | License Definition and Marketplace Offer | Core billing, payment, settlement, tax, invoice, dispute truth |
| MPD-07 | Marketplace Acquisition and Entitlement | Workspace Purchase and Marketplace Entitlement | License definition, billing truth, Installation, Permission |
| MPD-08 | Marketplace Distribution | Distribution Availability for Published immutable versions | Asset content, Purchase, Installation, delivery mechanism |
| MPD-09 | Marketplace Installation, Activation, Applicability, and Upgrade | Version Selection, Installation, Scoped Configuration, Activation, Applicability, upgrade and removal coordination | target configuration and operational facts |
| MPD-10 | Marketplace Discovery, Search, and Intelligence Participation | discovery and eligibility projections; Search and intelligence participation | Search Index, Decision, Recommendation, Implementation Option mapping |
| MPD-11 | Marketplace Security, Privacy, Audit, and Governance | Marketplace policy, required-Permission governance, Governance Action | Core grants, Audit Record, incident governance, target authorization |
| MPD-12 | Marketplace Operations and Analytics Participation | operational projections, coordination views, health and Analytics participation | source facts, support/incident source records, Core Analytics projection |

### 6.1 Domain guarantees

- MPD-01 owns Asset identity; MPD-03 owns Asset Version and publication lifecycle.
- MPD-04 owns Review and Certification evidence; MPD-03 alone changes publication state after
  validating required evidence.
- MPD-05 assesses compatibility; the target owner makes the final target decision.
- MPD-06 owns License and Offer; MPD-07 owns Purchase and Marketplace Entitlement; Core retains
  financial truth.
- MPD-08 owns Distribution Availability; MPD-09 owns scoped adoption state.
- MPD-10 and MPD-12 are projection-only and have no canonical write model or aggregate.
- MPD-11 may record Governance Action but cannot directly rewrite another Domain.

## 7. Approved Capabilities

| ID | Capability | Accountable Domain |
|---|---|---|
| MC-01 | Marketplace Asset Intake | MPD-01 |
| MC-02 | Marketplace Catalog Management | MPD-01 |
| MC-03 | Marketplace Asset Version Management | MPD-03 |
| MC-04 | Marketplace Review and Validation | MPD-04 |
| MC-05 | Marketplace Certification | MPD-04 |
| MC-06 | Marketplace Trust and Provenance | MPD-04 |
| MC-07 | Marketplace Discovery and Search Participation | MPD-10 |
| MC-08 | Marketplace Recommendation and Intelligence Participation | MPD-10 |
| MC-09 | Marketplace Compatibility Evaluation | MPD-05 |
| MC-10 | Marketplace Dependency Understanding | MPD-05 |
| MC-11 | Marketplace Licensing | MPD-06 |
| MC-12 | Marketplace Pricing and Commercial Participation | MPD-06 |
| MC-13 | Marketplace Acquisition | MPD-07 |
| MC-14 | Marketplace Entitlement | MPD-07 |
| MC-15 | Marketplace Distribution | MPD-08 |
| MC-16 | Marketplace Installation | MPD-09 |
| MC-17 | Marketplace Activation and Applicability | MPD-09 |
| MC-18 | Marketplace Upgrade and Removal | MPD-09 |
| MC-19 | Marketplace Shared Lifecycle Management | MPD-03 |
| MC-20 | Marketplace Security and Privacy Participation | MPD-11 |
| MC-21 | Marketplace Audit and Governance Participation | MPD-11 |
| MC-22 | Marketplace Analytics Participation | MPD-12 |
| MC-23 | Marketplace Publisher and Partner Participation | MPD-02 |
| MC-24 | Marketplace Operations and Support | MPD-12 |

Capability accountability never authorizes a write to another Domain.

## 8. Canonical Ownership

### 8.1 Canonical facts

| Canonical fact | Exactly one owner | Boundary |
|---|---|---|
| Marketplace Publisher | MPD-02 | References Core identity/organization |
| Publisher Participation | MPD-02 | Marketplace eligibility and participation only |
| Marketplace Asset | MPD-01 | shared identity, category, metadata, provenance |
| Marketplace Asset Category Assignment | MPD-01 | Uses approved taxonomy without external redefinition |
| Marketplace Asset Version | MPD-03 | Draft and immutable Published content |
| Marketplace Asset Version lifecycle state | MPD-03 | shared publication lifecycle only |
| Marketplace Review | MPD-04 | version-scoped evidence and outcome |
| Marketplace Certification | MPD-04 | subject, scope, evidence, validity, status |
| Compatibility Declaration | MPD-05 | publisher or authorized-source declaration |
| Marketplace Compatibility Assessment | MPD-05 | Marketplace assessment, not target decision |
| Dependency Declaration | MPD-05 | Asset-Version dependency meaning |
| Marketplace License Definition | MPD-06 | rights and conditions, not customer payment truth |
| Marketplace Offer | MPD-06 | commercial presentation, not billing transaction |
| Marketplace Purchase | MPD-07 | Workspace acquisition outcome |
| Marketplace Entitlement | MPD-07 | Workspace continued Marketplace right |
| Distribution Availability | MPD-08 | availability of a Published immutable version |
| Marketplace Version Selection | MPD-09 | Workspace selection of an immutable version |
| Marketplace Installation | MPD-09 | Workspace installation state and history |
| Marketplace Scoped Configuration | MPD-09 | Marketplace lifecycle settings only |
| Marketplace Activation | MPD-09 | Workspace activation state and history |
| Marketplace Applicability | MPD-09 | Workspace or selected-Business applicability |
| Installation Dependency Resolution | MPD-09 | installation-scoped resolved references and outcomes |
| Marketplace Governance Action | MPD-11 | authorized intent/outcome; affected owner changes state |

### 8.2 Canonical write models

| ID | Canonical write model | Exactly one owner | Canonical responsibility |
|---|---|---|---|
| MWM-01 | Marketplace Publisher | MPD-02 | Publisher profile and Participation |
| MWM-02 | Marketplace Asset | MPD-01 | identity, category assignment, metadata, provenance |
| MWM-03 | Marketplace Asset Version | MPD-03 | Draft and immutable Published versions, lifecycle, required-Permission and data-access declarations |
| MWM-04 | Marketplace Review | MPD-04 | evidence, dimension outcomes, disposition |
| MWM-05 | Marketplace Certification | MPD-04 | subject, scope, evidence, validity, status |
| MWM-06 | Marketplace Compatibility | MPD-05 | Declaration and Assessment |
| MWM-07 | Marketplace Dependency | MPD-05 | Declaration and relationship history |
| MWM-08 | Marketplace License | MPD-06 | License Definition and versions |
| MWM-09 | Marketplace Offer | MPD-06 | commercial presentation and eligibility terms |
| MWM-10 | Marketplace Purchase | MPD-07 | Workspace acquisition history |
| MWM-11 | Marketplace Entitlement | MPD-07 | Workspace Marketplace right and lifecycle |
| MWM-12 | Marketplace Distribution | MPD-08 | Published-version availability and restrictions |
| MWM-13 | Marketplace Version Selection | MPD-09 | selected immutable version history |
| MWM-14 | Marketplace Installation | MPD-09 | Installation and resolved dependency outcomes |
| MWM-15 | Marketplace Scoped Configuration | MPD-09 | Marketplace-only scoped settings |
| MWM-16 | Marketplace Activation | MPD-09 | Activation and deactivation history |
| MWM-17 | Marketplace Applicability | MPD-09 | Workspace or Business Applicability history |
| MWM-18 | Marketplace Governance Action | MPD-11 | authorized policy/enforcement action and outcome |

Required-Permission and data-access declarations are version-scoped content of MWM-03. MPD-11
governs Marketplace policy; Core retains canonical Permission grants and the target owner retains
final authorization.

### 8.3 Aggregate ownership

| Aggregate candidate | Root | Exactly one owner | Must not own |
|---|---|---|---|
| Marketplace Publisher | Marketplace Publisher | MPD-02 | Core identity, legal party, Workspace, Business |
| Marketplace Asset | Marketplace Asset | MPD-01 | Asset Version content, Purchase, Installation |
| Marketplace Asset Version | Marketplace Asset Version | MPD-03 | Review evidence, customer-scoped state |
| Marketplace Review | Marketplace Review | MPD-04 | publication state, target authorization |
| Marketplace Certification | Marketplace Certification | MPD-04 | Review history, target decision |
| Marketplace Compatibility | Marketplace Compatibility Assessment | MPD-05 | target operational acceptance |
| Marketplace Dependency | Dependency Declaration | MPD-05 | dependency content, scoped Installation |
| Marketplace License | Marketplace License Definition | MPD-06 | billing, payment, invoice, settlement |
| Marketplace Offer | Marketplace Offer | MPD-06 | Purchase, Entitlement state |
| Marketplace Purchase | Marketplace Purchase | MPD-07 | License definition, billing outcome, Installation |
| Marketplace Entitlement | Marketplace Entitlement | MPD-07 | Permission, Activation, target configuration |
| Marketplace Distribution | Distribution Availability | MPD-08 | Asset content, scoped Installation |
| Marketplace Version Selection | Marketplace Version Selection | MPD-09 | immutable Asset Version content |
| Marketplace Installation | Marketplace Installation | MPD-09 | target configuration, target operational facts |
| Marketplace Scoped Configuration | Marketplace Scoped Configuration | MPD-09 | target-domain settings |
| Marketplace Activation | Marketplace Activation | MPD-09 | Permission grants, target use |
| Marketplace Applicability | Marketplace Applicability | MPD-09 | Business identity, target data |
| Marketplace Governance Action | Marketplace Governance Action | MPD-11 | direct writes to another aggregate |

Aggregates are logical invariant boundaries and do not define storage, transactions, services,
or deployment.

### 8.4 Non-canonical projections

The following remain read models or compositions, never canonical Marketplace facts:

- Marketplace Trust Profile — MPD-04 projection;
- Marketplace Discovery View — MPD-10 projection;
- Marketplace Search View — MPD-10 projection, while Core owns Search Index;
- Marketplace Eligibility View — MPD-10 projection;
- Marketplace Operational Dashboard and Marketplace Analytics views — MPD-12 projections;
- Product Hub Marketplace compositions — Product Hub-owned compositions; and
- Core Search Index and platform Analytics projections — applicable Core owners.

## 9. Lifecycle Ownership

| Lifecycle subject | Exactly one owner | Frozen rule |
|---|---|---|
| Marketplace Asset identity | MPD-01 | Stable identity; exact closure states remain deferred |
| Marketplace Asset Version | MPD-03 | Draft → Review → Approved → Published → Deprecated → Archived |
| Marketplace Review | MPD-04 | Version-scoped evidence; all six Genesis dimensions mandatory |
| Marketplace Certification | MPD-04 | Evidence-backed attestation distinct from Review/publication |
| Marketplace Compatibility Assessment | MPD-05 | Marketplace evaluation distinct from target acceptance |
| Dependency Declaration | MPD-05 | shared version declaration distinct from scoped resolution |
| Marketplace License Definition | MPD-06 | distinct from Offer, Purchase, and Core billing |
| Marketplace Offer | MPD-06 | commercial presentation distinct from acquisition |
| Marketplace Purchase | MPD-07 | Workspace acquisition outcome |
| Marketplace Entitlement | MPD-07 | Workspace Marketplace right |
| Distribution Availability | MPD-08 | only a Published immutable version may be distributed in v1.0 |
| Marketplace Version Selection | MPD-09 | references an exact immutable version |
| Marketplace Installation | MPD-09 | Workspace-scoped, separate from Activation/target configuration |
| Marketplace Scoped Configuration | MPD-09 | Marketplace lifecycle settings only |
| Marketplace Activation | MPD-09 | possible authorized use; no Permission grant |
| Marketplace Applicability | MPD-09 | Workspace or selected Business only |
| upgrade and removal coordination | MPD-09 | changes scoped state; preserves shared and target history |
| Marketplace Governance Action | MPD-11 | records intent/outcome; canonical owner performs transition |

`New Version Published` is an outcome linking another Published immutable version, not a state
that mutates the current version. Review rejection or remediation vocabulary remains deferred.
Every scoped lifecycle remains separate from the shared Asset Version lifecycle.

## 10. Frozen Marketplace Models

### 10.1 Marketplace Asset and Asset Version

- Marketplace Asset is the stable shared identity for category, Publisher relationship,
  description, provenance, and version collection.
- Marketplace Asset contains no Purchase, Entitlement, Installation, Activation, Applicability,
  target configuration, or target operational data.
- Marketplace Asset Version is the versioned content boundary.
- an authorized Draft may change before publication;
- a Published version is platform-wide, shared, immutable, attributable, and preserved; and
- every semantic or content change after publication creates a new version.

### 10.2 Workspace-scoped state

```text
Marketplace Asset
  -> preserved immutable Marketplace Asset Versions

Workspace
  -> Marketplace Purchase
  -> Marketplace Entitlement
  -> Marketplace Version Selection
  -> Marketplace Installation
  -> Marketplace Scoped Configuration
  -> Marketplace Activation
  -> Marketplace Applicability to Workspace or selected Business
```

Scoped state references shared identifiers and never copies Published content. Marketplace
Applicability does not directly target Business Unit, Department, Branch, Module, or Resource in
v1.0. A target owner may own narrower applied configuration separately.

### 10.3 Publisher model

Marketplace Publisher is a Marketplace participation profile referencing an approved Core
identity, organization, partner, or legal-party relationship. Marketplace owns the profile and
Publisher Participation; Core retains canonical identity and organization. Final Publisher Type,
eligibility, verification, agreement, support, suspension, and termination policy remain
deferred.

### 10.4 Review, Certification, and Trust

- Marketplace Review is version-scoped and owned by MPD-04.
- Technical, Security, Business, UX, Performance, and Compatibility Review are mandatory
  dimensions; detailed criteria and category treatment remain deferred.
- MPD-03 validates required Review outcomes before publication.
- Marketplace Certification is an evidence-backed attestation with explicit subject, scope,
  evidence, authority, validity, status, provenance, and history.
- Certification is separate from Review, publication, Compatibility, rating, and authorization.
- Marketplace Trust Profile is derived and explainable; it grants no Permission and becomes no
  Recommendation or target decision.

### 10.5 Compatibility and dependencies

- Compatibility Declaration records an authorized source's version-specific supported contexts.
- Marketplace Compatibility Assessment is attributable, explainable, and version-specific.
- the target owner independently validates current target state and invariants.
- Dependency Declaration is shared, version-scoped meaning owned by MPD-05.
- Installation Dependency Resolution is Workspace Installation-scoped and owned by MPD-09.
- a declaration never acquires, installs, activates, licenses, entitles, or authorizes a
  dependency.
- a dependency cannot create a cross-OS hard dependency for a core workflow.

### 10.6 Licensing, Offer, Purchase, and Entitlement

- MPD-06 owns Marketplace License Definition and Marketplace Offer.
- Core retains billing account, payment, invoice, tax, refund, settlement, dispute, OS Plan, and
  Subscription truth.
- MPD-07 owns Workspace-scoped Marketplace Purchase and Marketplace Entitlement.
- Marketplace Entitlement is distinct from Core Workspace Entitlement and OS Subscription.
- Marketplace Entitlement does not own Distribution Availability and grants no Permission,
  Installation, Activation, Applicability, or target use.
- selected-Business Applicability references a Workspace-owned Marketplace Entitlement.

### 10.7 Distribution, Installation, Activation, and Applicability

- MPD-08 owns Distribution Availability for a Published immutable Asset Version.
- Distribution creates no Purchase, Entitlement, Installation, or Activation.
- MPD-09 owns Marketplace Installation after current authorization, Entitlement, version,
  Distribution, compatibility, dependencies, declarations, scope, and target acceptance are
  validated as applicable.
- Installation is separate from physical target application, Activation, and target
  configuration.
- Activation enables possible authorized use but assigns no Permission, Applicability, target
  configuration, or target readiness.
- Applicability is Workspace-wide or for one selected Business in that Workspace.
- upgrade coordinates a new Version Selection and owner-preserving scoped transitions without
  mutating Published content.
- removal affects scoped Marketplace state only and deletes no shared or target-owned history.

## 11. Participation and Operational Responsibilities

### 11.1 Search participation

MPD-10 owns Marketplace Discovery View and Marketplace Search View. Core Search owns Search
Index, query behavior, and shared Search infrastructure. Product Hub may compose results without
becoming source owner. Search participation preserves context, authorization, lifecycle,
freshness, localization, and source traceability.

### 11.2 Recommendation participation

Recommendation Engine is the sole owner of Recommendation. MPD-10 owns the disposable
Marketplace Eligibility View. Marketplace may supply authorized eligible Asset context and
explain Asset facts, but it cannot form or modify Decision, create or prioritize Recommendation,
own Implementation Option mapping, auto-acquire an Asset, or treat selection as target
authorization.

### 11.3 Analytics participation

MPD-12 owns permission-filtered, minimized, source-attributed Marketplace operational and
business-value read models. Core Analytics owns platform Analytics projections. Marketplace
Analytics views remain non-canonical and cannot write source facts.

### 11.4 Security responsibilities

Marketplace:

- requires Core-authenticated identity and explicit current context;
- enforces Workspace isolation, least privilege, and resource/lifecycle authorization;
- validates Publisher Participation, Entitlement, version, Distribution, Installation,
  Activation, Applicability, and target context as applicable;
- requires version-scoped Permission and data-access declarations without assigning Permission;
- treats publishers, Assets, providers, AI Experts, executable content, inputs, and outputs as
  untrusted until validated;
- preserves version integrity and provenance;
- minimizes sensitive data in views and evidence;
- requires target-owner authorization for every target effect;
- fails closed on missing, stale, ambiguous, or mismatched context; and
- supplies consequential evidence to Core Audit Service.

Core retains identity, sessions, canonical grants, platform secrets, incident governance, and
shared Security foundations.

### 11.5 Privacy responsibilities

Marketplace applies purpose limitation, minimization, tenant isolation, source references,
same-or-narrower projection scope, approved data purposes, and restricted disclosure. Publisher,
partner, AI, OS, Search, Analytics, and Product Hub sharing remains authorized and minimized.
Operational telemetry remains distinct from Audit and business facts.

### 11.6 Audit responsibilities

Core Audit Service owns append-only Audit Records. Marketplace owners submit attributable
evidence for consequential Publisher, Asset, version, Review, publication, Certification,
Compatibility, License, Offer, Purchase, Entitlement, Distribution, scoped adoption,
declaration, target-validation, support, recovery, and Governance actions. Evidence preserves
Actor, context, owner, subject, version, action, correlation, causation, and outcome as
applicable; it is not itself the Audit Record.

### 11.7 Operational responsibilities

MPD-12 owns only operational projections and coordination views derived from authorized source
owners. It owns no support case, incident, service objective, recovery, continuity,
vulnerability, customer communication, or escalation source record in v1.0. Projection failure
cannot roll back a canonical fact, and optional dependency failure cannot create a second writer.
Detailed operating policy remains deferred.

## 12. External Ownership Boundaries

| External concept or responsibility | Frozen owner | Marketplace boundary |
|---|---|---|
| identity, Authentication, Membership, canonical Permission grants | applicable Core owners | verified/authorized references only |
| Workspace, Business, Business Unit, Department, Branch | applicable Core registry | scoped identifiers only |
| Core Product, Plan, Workspace Entitlement, OS Subscription, billing/financial truth | applicable Core commercial owner | eligibility and outcome context only |
| Product Hub journey | Product Hub | projection composition and authorized handoff only |
| Business DNA | Business DNA owner | authorized intelligence context only |
| Knowledge and Knowledge Pack content | Knowledge Engine | distribution reference without content transfer |
| Capability definitions | Capability Registry | canonical identifier references only |
| deterministic Rules | applicable Rules owner | governed references only |
| Decision and candidate reasoning | Business Brain | completed authorized context only |
| Recommendation and disposition | Recommendation Engine | eligibility input only |
| Implementation Option mapping | Core intelligence mapping owner | eligible Asset reference input only |
| Configuration Proposal | Configuration Engine | Marketplace neither proposes nor applies target configuration |
| AI Expert eligibility/selection and AI artifacts | AI Coordinator | active/applicable Expert-definition context only |
| OS setup, navigation, configuration, workflow, Permission semantics, operational facts | applicable OS | target validates and owns every effect |
| Audit Record | Core Audit Service | attributable evidence only |
| Notification state | Core Notification Service | notification intent only |
| Search Index | Core Search | governed source projection only |
| platform Analytics projection | Core Analytics | governed outcomes only |
| external-provider truth | external provider where a Connector participates | no ownership transfer to Marketplace or target |

Marketplace owns its governed Marketplace surface and route-local movement. Core owns context
entry and Product Hub handoff. Each OS owns setup and operational navigation. Cross-context or
cross-application movement reauthorizes.

## 13. Asset Family Boundaries

The approved top-level Marketplace Asset categories are Operating Systems, Extensions, Knowledge
Packs, Capability Packs, AI Experts, Automation Packs, Workflow Packs, Dashboard Packs,
Templates, and Themes.

| Asset family | Marketplace owns | External owner retained |
|---|---|---|
| Operating System | Marketplace representation, immutable version, and scoped Marketplace state | Core OS Product/Plan/commercial truth and applicable OS release/setup/readiness/operation |
| Extension | Marketplace Asset/version and scoped state | applicable target Core or OS facts, configuration, lifecycle, authorization |
| Connector | Extension-subtype representation and state | external-provider truth, Core secret policy, target facts |
| Knowledge Pack | distribution representation and scoped state | Knowledge Engine content, publication meaning, applicability interpretation, consumption |
| Capability Pack | Marketplace Asset/version | Capability Registry identity, meaning, dependencies, applicability, lifecycle |
| AI Expert | Marketplace Asset/version and scoped state | AI Coordinator selection/coordination/artifacts; Knowledge Engine Knowledge |
| Automation Pack | Marketplace Asset/version | Knowledge/Rules owners, Configuration Engine, target applied automation and outcomes |
| Workflow Pack | Marketplace Asset/version | Knowledge Engine where referenced; target workflow configuration, instances, lifecycle, records |
| Dashboard Pack | Marketplace Asset/version | Core Analytics or applicable OS facts, projections, applied dashboard/report configuration |
| Template | Marketplace Asset/version | target applied configuration and every generated business record |
| Theme | Marketplace Asset/version and scoped Marketplace state | target presentation configuration, logic, authorization, navigation truth |

Connectors are an Extension subtype. Reports are represented through Dashboard Packs or Templates,
not a top-level category. Industry Solutions are curated discovery compositions, not a new Asset
category or Operating System. Training and consulting services are ecosystem offerings, not
Marketplace Assets in v1.0.

## 14. Cross-Milestone Dependencies

### 14.1 Core Platform

Marketplace is a bounded context within the Core offering and consumes Core identity,
organization, commercial, Security, Audit, Notification, Search, Analytics, navigation, and
operational foundations. Core never becomes a Marketplace record writer.

### 14.2 Business Brain

Business Brain owns completed Decision and candidate reasoning. Marketplace supplies authorized
availability and outcome context and never contributes to canonical Decision formation.

### 14.3 Commerce OS and future Operating Systems

Every OS remains independently usable and owns its setup, navigation, Permission semantics,
configuration, workflows, and operational data. Marketplace distribution is optional, versioned,
owner-preserving, and target-validated. Commerce retains every Commerce fact and target
configuration; an Asset cannot create parallel Commerce truth.

### 14.4 Knowledge, Recommendation, Configuration, and AI

Knowledge Engine retains Knowledge; Recommendation Engine retains Recommendation; Configuration
Engine retains Configuration Proposal; AI Coordinator retains Expert coordination and AI
artifacts. Marketplace Activation or Applicability provides only authorized eligibility context.

## 15. Accepted Architecture and Freeze Guarantees

Future milestones, specifications, implementations, and documentation must preserve:

1. Marketplace remains a Core Platform bounded context distinct from Product Hub and OS domains.
2. Each of the 12 Domains and 24 Capabilities retains its approved identity and accountable home.
3. Every canonical fact, write model, aggregate, and lifecycle has exactly one owner.
4. MPD-10 and MPD-12 remain projection-only unless an approved architecture change supersedes
   this Freeze.
5. Marketplace Asset identity remains separate from Marketplace Asset Version.
6. Published Marketplace Asset Versions remain shared, immutable, versioned, and preserved.
7. Marketplace Purchase, Entitlement, Distribution, Version Selection, Installation, Scoped
   Configuration, Activation, Applicability, Permission, and target configuration remain
   separate facts.
8. Workspace remains the tenant boundary; Marketplace Applicability is Workspace or selected
   Business in v1.0.
9. Marketplace Publisher remains a Marketplace profile referencing, not duplicating, Core
   identity or organization.
10. Marketplace Review includes all six mandatory Genesis dimensions.
11. Review, Certification, Trust, publication, compatibility, and target authorization remain
    separate.
12. MPD-08 alone owns Distribution Availability; only Published immutable versions pass the
    v1.0 Distribution gate.
13. Activation never grants Permission, target configuration, or readiness.
14. target owners independently reauthorize and validate every target effect.
15. Marketplace and optional-Asset failure never block an independent OS core workflow.
16. no Asset or Pack creates parallel Core, Commerce, other OS, Knowledge, Rule, Capability,
    Decision, Recommendation, Configuration, AI, Audit, Search, or Analytics truth.
17. projections, compositions, dashboards, evidence, and coordination views are never source
    ownership.
18. upgrade and removal preserve immutable shared and attributable target history.
19. Security, privacy, tenant isolation, least privilege, explicit context, human control, and
    Auditability remain mandatory.
20. Marketplace owns its governed surface; Product Hub owns composition/handoff; each OS owns its
    operational navigation.
21. DD-MP-01 through DD-MP-50 remain unresolved until approved through change control.
22. Draft ADR subjects remain non-authoritative until independently accepted.

## 16. Explicit Freeze Exclusions

This Freeze does not:

- define implementation order or tasks;
- define API endpoints, protocols, or payloads;
- define Events, Event payloads, transports, or messaging;
- define logical Contracts beyond the already frozen external ownership boundaries;
- define schemas, tables, indexes, databases, or storage;
- define infrastructure, runtime topology, deployment, services, or extraction;
- select frameworks, vendors, cloud providers, or technology;
- approve unrestricted executable or third-party participation;
- approve a Permission catalog, reviewer policy, rating model, commercial terms, dependency
  semantics, recovery policy, or operational service objectives;
- accept a Draft ADR subject;
- resolve a Deferred Decision; or
- authorize a future artifact to reinterpret this baseline.

## 17. Deferred Decision Register

All 50 Deferred Decisions remain unresolved and frozen as deferrals. They do not defer canonical
ownership and may not transfer an owner silently.

### 17.1 Asset identity, categories, and versions

| ID | Deferred decision |
|---|---|
| DD-MP-01 | Universal versus category-specific Asset information and validation requirements |
| DD-MP-02 | Exact Asset identity lifecycle and closure semantics |
| DD-MP-03 | Exact version syntax, ordering, pre-release, preview, staged, and limited-release semantics |
| DD-MP-04 | Version support windows, latest/recommended meaning, and end-of-support policy |
| DD-MP-05 | Capability Pack content and publication eligibility |
| DD-MP-06 | Industry Solution curation and composition semantics |

### 17.2 Publishers and participation

| ID | Deferred decision |
|---|---|
| DD-MP-07 | Final Publisher Type values and relationship to Core identity, organization, partner, and legal-party models |
| DD-MP-08 | Publisher onboarding, verification, agreements, ongoing eligibility, suspension, and termination |
| DD-MP-09 | Submission authority by Asset category |
| DD-MP-10 | Reviewer, certifier, administrator identity, separation of duties, and conflict-of-interest policy |
| DD-MP-11 | Official versus partner versus independent participation requirements |
| DD-MP-12 | Third-party participation entry criteria and rollout policy |

### 17.3 Lifecycle, Review, Certification, and Trust

| ID | Deferred decision |
|---|---|
| DD-MP-13 | Rejection, withdrawal, remediation, suspension, emergency restriction, appeal, and reinstatement vocabulary |
| DD-MP-14 | Review criteria, evidence, outcomes, re-review, expiry, and category variations; all six Genesis dimensions remain mandatory |
| DD-MP-15 | Certification kinds, subjects, issuers, levels, validity, renewal, suspension, and revocation |
| DD-MP-16 | Trust Profile fields, explanation, uncertainty, freshness, and access policy |
| DD-MP-17 | Customer rating or review eligibility, moderation, manipulation, privacy, and relevance |
| DD-MP-18 | Publication approval thresholds and human-approval policy |
| DD-MP-19 | Deprecation, archive, existing-customer access, and historical availability policy |
| DD-MP-20 | Governance Action classes, authority, target-owner response, and emergency policy |

### 17.4 Compatibility and dependencies

| ID | Deferred decision |
|---|---|
| DD-MP-21 | Compatibility policy language, precedence, evidence, expiry, refresh, and Assessment lifecycle |
| DD-MP-22 | Platform, OS, Plan, Module, country, Permission, configuration, and target version dimensions |
| DD-MP-23 | Required, optional, direct, transitive, conflicting, replacement, and mutually exclusive dependency semantics |
| DD-MP-24 | Dependency version ranges versus exact-version requirements |
| DD-MP-25 | Cycle prevention, conflict resolution, and incompatible-combination behavior |
| DD-MP-26 | Dependency acquisition, consent, License, Entitlement, Installation, and Activation policy |
| DD-MP-27 | Dependency update, deprecation, suspension, and removal propagation |

### 17.5 Licensing, commercial, Purchase, and Entitlement

| ID | Deferred decision |
|---|---|
| DD-MP-28 | License subject, version, acceptance, rights, restrictions, jurisdiction, renewal, and termination |
| DD-MP-29 | Free, Paid, Subscription, one-time, usage-based, trial, bundle, and promotional Offer rules |
| DD-MP-30 | Workspace, Business, user, Branch, usage, country, Plan, and feature limit semantics |
| DD-MP-31 | Core billing, tax, invoice, refund, dispute, settlement, and partner revenue-sharing collaboration |
| DD-MP-32 | Purchase reversal, cancellation, dispute, and zero-price acquisition semantics |
| DD-MP-33 | Entitlement trial, renewal, suspension, expiry, cancellation, revocation, and continued-use rules |
| DD-MP-34 | Bundle and dependency Entitlement composition |

### 17.6 Distribution and scoped adoption

| ID | Deferred decision |
|---|---|
| DD-MP-35 | Public, private, preview, staged, limited, country, customer, and existing-customer Distribution policy |
| DD-MP-36 | Distribution withdrawal, emergency restriction, integrity, and customer communication |
| DD-MP-37 | Category-specific meaning and prerequisites of Installation, Activation, and removal |
| DD-MP-38 | Installation long-running state, partial outcome, idempotency, cancellation, retry, timeout, recovery, and reversal |
| DD-MP-39 | Marketplace Scoped Configuration structure, versioning, conflict, and closure rules |
| DD-MP-40 | Activation and deactivation prerequisites, outcome vocabulary, and recovery |
| DD-MP-41 | Applicability transition, revocation, multi-Business behavior, and target reconciliation |
| DD-MP-42 | Upgrade optional, recommended, scheduled, mandatory, security-critical, migration, rollback, and partial-outcome policy |
| DD-MP-43 | Removal retained-state, target cleanup, orphan dependency, and continued-use policy |

### 17.7 Discovery, intelligence, Security, and operations

| ID | Deferred decision |
|---|---|
| DD-MP-44 | Marketplace discovery, Search ranking, filtering, localization, sponsorship, and stale-state policy |
| DD-MP-45 | Recommendation eligibility, explanation, feedback, conversion, and sponsored-visibility policy |
| DD-MP-46 | Analytics definitions, measures, access, retention, anonymous learning, dashboards, and reports |
| DD-MP-47 | Marketplace Permission catalog, role policy, administrative access, approval thresholds, and Delegation |
| DD-MP-48 | Data classification, consent, residency, retention, erasure, export, disclosure, masking, and legal hold |
| DD-MP-49 | Executable Asset classification, sandbox, isolation, testing, supply-chain, secrets, vulnerability, and provider controls |
| DD-MP-50 | Audit evidence detail, observability signals, service objectives, recovery objectives, support, incident, capacity, continuity, and global operations |

## 18. Remaining Risks

The six Final Architecture Review risk groups remain non-blocking and must be carried into future
decision work:

1. broad deferred-policy surface;
2. third-party and executable Asset Security;
3. Compatibility and dependency complexity;
4. Installation, upgrade, removal, and recovery behavior;
5. Publisher, assurance, commercial, and legal policy; and
6. discovery, intelligence, privacy, Analytics, and global operations.

Canonical ownership is already fixed. Future treatment may not resolve these risks by creating a
parallel owner or bypassing the Deferred Decision and ADR process.

## 19. ADR Status

### 19.1 Accepted ADR dependencies

Marketplace creates no new Accepted ADR. The following 32 existing Accepted ADRs directly govern
this frozen baseline:

| Accepted ADR | Marketplace dependency |
|---|---|
| ADR-002 | Marketplace is within the Core shared plane but remains bounded |
| ADR-003 | Workspace is the tenant and customer boundary |
| ADR-004 | canonical organization context is preserved |
| ADR-007 | Capabilities precede industry/software selection |
| ADR-008 | Modules/Assets do not redefine Capabilities |
| ADR-009 | shared published Assets are versioned and immutable |
| ADR-010 | Knowledge Packs are additive and immutable after publication |
| ADR-011 | deterministic Rules remain versioned and explainable |
| ADR-013 | Recommendation remains Capability-first and explainable |
| ADR-014 | consequential Recommendation/AI outcomes remain under human control |
| ADR-017 | Configuration Proposal preserves target ownership |
| ADR-019 | Product Hub owns discovery/handoff navigation |
| ADR-020 | Product Hub composition is not source ownership |
| ADR-021 | Core Workspace Entitlement remains separate |
| ADR-022 | OS Subscriptions and Plans remain canonical Core facts |
| ADR-023 | subscription and operational scope remain distinct |
| ADR-024 | every OS retains independent Domain ownership |
| ADR-025 | cross-OS integration is optional and owner-preserving |
| ADR-026 | OS lifecycle remains separate from Marketplace scoped state |
| ADR-027 | Marketplace is a bounded context within Core |
| ADR-028 | shared Marketplace Assets and scoped state remain separate |
| ADR-029 | AI remains downstream of Knowledge, Rules, and authorization |
| ADR-030 | AI Coordinator owns separated orchestration responsibilities |
| ADR-031 | AI Experts participate through the coordinated Expert network |
| ADR-032 | AI and platform learning remain governed |
| ADR-034 | tenant and resource scope are explicit |
| ADR-035 | Contracts remain technology-independent and compatible |
| ADR-036 | cross-boundary API architecture remains Contract First |
| ADR-037 | Marketplace surface and cross-context navigation preserve context |
| ADR-038 | Core Audit history remains append-only |
| ADR-039 | platform Assets remain structured, versioned, and configurable |
| ADR-040 | Core owns organization identity; OS owners retain operational data |

### 19.2 PP-07 normalized Accepted dependency mappings

| Original trace label | Existing authority | Status |
|---|---|---|
| DADR-MP-03 | ADR-009 and ADR-028 | Accepted dependency; no new ADR |
| DADR-MP-13 | ADR-027, ADR-028, Core Freeze Marketplace guarantees | Accepted dependency; no new ADR |
| DADR-MP-14 | ADR-028 | Accepted dependency; no new ADR |
| DADR-MP-15 | ADR-009 and ADR-028 | Accepted dependency; no new ADR |
| DADR-MP-17 | ADR-014, ADR-034, Core Permission Model and Freeze | Accepted dependency; no new ADR |
| DADR-MP-20 | ADR-010 and ADR-029 through ADR-031 | Accepted dependency; no new ADR |

### 19.3 Draft ADR subjects

The following 14 subjects remain Draft, reserve no Governance number, and have no authority:

| Trace label | Draft subject |
|---|---|
| DADR-MP-01 | Marketplace Internal Domain Map |
| DADR-MP-02 | Marketplace Capability Catalog |
| DADR-MP-04 | Marketplace Asset and Version Ownership |
| DADR-MP-05 | Marketplace Publisher Participation |
| DADR-MP-06 | Marketplace Category Taxonomy |
| DADR-MP-07 | Asset Version Publication Lifecycle allocation |
| DADR-MP-08 | Review, Certification, and Trust Separation |
| DADR-MP-09 | Marketplace Compatibility Assessment and Target Validation Separation |
| DADR-MP-10 | Dependency Declaration and Installation Resolution |
| DADR-MP-11 | Marketplace-internal License, Offer, Purchase, and Entitlement Separation |
| DADR-MP-12 | Distribution Availability Boundary |
| DADR-MP-16 | Marketplace projection participation in Search and Recommendation flows |
| DADR-MP-18 | Marketplace Governance Action Boundary |
| DADR-MP-19 | Extension and Connector Model |

## 20. Change Control Rules

After this Freeze:

1. documentation may clarify or cross-reference the baseline without changing meaning;
2. a Deferred Decision may be resolved only through the approved milestone and ADR process where
   applicable;
3. any change to a Domain, Capability, owner, canonical fact, write model, aggregate, lifecycle,
   invariant, external boundary, Asset category, or compatibility guarantee requires an ADR;
4. every architectural change requires independent Architecture Review;
5. an approved change requires an updated Marketplace Freeze;
6. a breaking change requires governed versioning and migration treatment;
7. an implementation concern cannot silently redefine the frozen architecture; and
8. rejected or superseded proposals remain history and gain no authority through implementation.

The required change path is:

```text
Proposed change
  -> ADR or approved decision process
  -> independent Architecture Review
  -> Patch when documentation alignment only is authorized
  -> updated Freeze
  -> Readiness validation
```

## 21. Freeze Validation

| Validation requirement | Result | Freeze evidence |
|---|---|---|
| Every approved architectural decision represented | PASS | Sections 3–15 |
| No rejected decision included | PASS | only Proposal as corrected by PP-01 through PP-10 is frozen |
| No Deferred Decision resolved | PASS | all DD-MP-01 through DD-MP-50 preserved in section 17 |
| No Domain introduced or changed | PASS | MPD-01 through MPD-12 reproduced unchanged |
| No Capability introduced or changed | PASS | MC-01 through MC-24 reproduced unchanged |
| No ownership introduced or changed | PASS | canonical owner tables reproduce approved assignments |
| No canonical fact introduced or changed | PASS | 23 approved facts reproduced |
| No write model introduced or changed | PASS | MWM-01 through MWM-18 reproduced |
| No aggregate introduced or changed | PASS | 18 approved candidates reproduced |
| No lifecycle introduced or changed | PASS | approved lifecycle owners and states summarized only |
| No ADR introduced | PASS | 32 dependencies remain external; 14 subjects remain Draft |
| No implementation or technology introduced | PASS | explicit exclusions in sections 4 and 16 |
| Final Architecture Review satisfied | PASS | verdict APPROVED FOR FREEZE; zero Blocking Issues |
| Architecture modified by Freeze | NO | summary and baseline declaration only |

## 22. Official Freeze Declaration

# MARKETPLACE ARCHITECTURE v1.0 IS FROZEN

Marketplace Architecture v1.0 is the authoritative Marketplace architectural baseline of
Nexoraxs.

The Marketplace Proposal documents are superseded as the primary architectural reference but
remain frozen provenance. All future Marketplace specifications, implementation work, Operating
System integrations, partner participation, Asset families, and global evolution must conform to
this Freeze until an approved change-control cycle publishes an updated baseline.

## References

### Marketplace milestone provenance

- [Marketplace Discovery v0.1](../05-marketplace/00-MARKETPLACE-DISCOVERY.md)
- [Marketplace Capability Map v0.1](../05-marketplace/01-MARKETPLACE-CAPABILITY-MAP.md)
- [Marketplace Architecture Proposal v0.1](../05-marketplace/02-MARKETPLACE-PROPOSAL.md)
- [Marketplace Independent Architecture Review](../05-marketplace/03-MARKETPLACE-ARCHITECTURE-REVIEW.md)
- [Marketplace Proposal Patch v0.1.1](../05-marketplace/04-MARKETPLACE-PROPOSAL-PATCH-v0.1.1.md)
- [Marketplace Independent Re-Review](../05-marketplace/05-MARKETPLACE-RE-REVIEW.md)
- [Marketplace Documentation Wave 1](../05-marketplace/06-MARKETPLACE-WAVE-1.md)
- [Marketplace Documentation Wave 2](../05-marketplace/07-MARKETPLACE-WAVE-2.md)
- [Marketplace Documentation Wave 3](../05-marketplace/08-MARKETPLACE-WAVE-3.md)
- [Marketplace Final Architecture Review](../05-marketplace/09-MARKETPLACE-FINAL-ARCHITECTURE-REVIEW.md)

### Governance and Genesis

- [Governance ADR Repository](../00-governance/ADR/README.md)
- [Canonical Glossary](../00-governance/glossary/GLOSSARY.md)
- [Architectural Milestone Lifecycle](../00-governance/MILESTONE-LIFECYCLE.md)
- [Genesis Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [Genesis Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md)
- [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Genesis Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

### Frozen upstream baselines

- [Core Platform Freeze v1.0](CORE-PLATFORM-v1.0-FREEZE.md)
- [Core Platform Readiness v1.0.1](CORE-PLATFORM-v1.0.1-READINESS.md)
- [Business Brain Freeze v1.0](BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Business Brain Readiness](BUSINESS-BRAIN-READINESS.md)
- [Commerce OS Freeze v1.0](COMMERCE-OS-v1.0-FREEZE.md)
- [Commerce OS Readiness](COMMERCE-OS-READINESS.md)
