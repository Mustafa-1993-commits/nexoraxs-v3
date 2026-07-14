# Marketplace Architecture Proposal v0.1

**Status:** Proposed — Pending Independent Architecture Review  
**Milestone:** Marketplace  
**Source:** Approved Marketplace Discovery v0.1 and Capability Map v0.1  
**Architecture authority:** None until approved  
**Implementation authority:** None

This Proposal converts the approved Marketplace Discovery and Capability Map into the first
complete Marketplace architectural proposal. It makes logical architecture decisions that remain
proposed until an independent Architecture Review approves them.

It introduces no physical interface, persistence, infrastructure, runtime, framework, vendor,
deployment, or implementation design.

## 1. Vision and Mission

### 1.1 Vision

Marketplace is the trusted platform ecosystem through which Nexoraxs customers discover and
adopt governed platform Assets that help a Business operate, improve, and grow.

Marketplace is not a general e-commerce marketplace. It distributes Nexoraxs platform Assets,
not customer merchandise or Commerce OS goods.

### 1.2 Mission

Marketplace provides one governed bounded context for:

- shared Marketplace Asset identity and immutable published Asset Versions;
- publisher participation and provenance;
- Review, Certification, Trust, Compatibility, and dependency understanding;
- licensing and Marketplace commercial-offer definition;
- Workspace Purchase and Marketplace Entitlement;
- governed distribution and immutable version availability;
- Workspace-scoped Installation, Activation, and version selection;
- Workspace- or Business-scoped Applicability;
- upgrade and removal without rewriting shared history;
- Marketplace discovery and participation in Product Hub, Search, Recommendation, Analytics,
  Audit, Notification, and AI Expert eligibility; and
- safe optional adoption by Core Platform and independent Operating Systems.

Marketplace increases business value without acquiring the canonical responsibilities of Core
Platform, Business Brain, Recommendation Engine, Configuration Engine, Product Hub, AI
Coordinator, Knowledge Engine, or an Operating System.

## 2. Approved Marketplace Scope

The proposed approved scope is:

1. Marketplace Publisher and Publisher Participation records that reference, but do not
   duplicate, Core identity or organization facts.
2. Marketplace Asset identity, category assignment, descriptive information, and provenance.
3. Marketplace Asset Versions, Draft content, immutable published content, release history, and
   shared lifecycle.
4. Asset submission intake, Review, validation evidence, Certification, and derived Trust views.
5. publisher compatibility declarations, Marketplace Compatibility Assessments, dependency
   declarations, and installation-scoped dependency resolution outcomes.
6. Marketplace License Definitions and Marketplace Offers without owning Core billing,
   settlement, tax, invoice, or payment truth.
7. Workspace-scoped Marketplace Purchase and Marketplace Entitlement.
8. governed Distribution Availability for approved immutable Asset Versions.
9. Workspace-scoped Marketplace Version Selection, Installation, Marketplace Scoped
   Configuration, and Activation.
10. Workspace- or selected-Business-scoped Marketplace Applicability.
11. upgrade, deactivation, and removal of scoped Marketplace state while preserving immutable
    shared Asset history and attributable scoped history.
12. Marketplace discovery projections and Core Search participation.
13. Marketplace participation in Implementation Option, Recommendation, Product Hub, Analytics,
    Audit, Notification, and AI Expert eligibility flows without assuming their external
    ownership.
14. Marketplace Security, privacy, Governance, operations, support, and observability
    responsibilities within shared Core foundations.
15. official and future approved publisher participation under category-specific validation and
    Governance.

## 3. Approved Non-Scope

Marketplace does not own or implement:

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
- a customer-owned copy of shared Marketplace Asset content; or
- mutation or deletion of a published Marketplace Asset Version.

This Proposal also excludes all physical implementation choices.

## 4. Architectural Principles

1. **Marketplace is a bounded context within Core Platform.** It remains distinct from Product
   Hub and other Core modules.
2. **Business value before Asset count.** Assets must address a real business or platform need.
3. **Shared Asset, scoped state.** Published Asset Versions are platform-wide, shared, versioned,
   immutable, and preserved; customer state is separate and scoped.
4. **Exactly one owner.** Every canonical fact, write model, aggregate, lifecycle, and projection
   has one owner.
5. **Capabilities before implementation options.** Marketplace does not form Business Decisions
   or Recommendations.
6. **Activation is not authorization.** Required Permissions remain separately assigned and
   re-evaluated.
7. **Target owner controls target state.** Marketplace never writes around Core or OS owners.
8. **Optional integration.** No Marketplace Asset becomes a hidden prerequisite for an
   independent OS core workflow.
9. **No parallel truth.** Assets and extensions reuse canonical Platform and OS owners.
10. **Immutable publication.** A published-version change creates a new version.
11. **Version selection is explicit.** Upgrade selects another immutable version and preserves
    history.
12. **Review does not replace target validation.** Marketplace evidence and Compatibility
    Assessment are not target authorization.
13. **Trust is explainable.** Trust views derive from attributable evidence and never become
    hidden authority.
14. **Security and privacy by default.** Tenant isolation, least privilege, minimization, and
    Auditability apply throughout.
15. **Derived views are not ownership.** Search, Analytics, Trust, discovery, and operational
    projections remain non-canonical.
16. **Technology independence.** Logical Domains do not imply physical services or deployment
    units.

## 5. Internal Logical Architecture

The proposed Marketplace architecture contains five collaborating logical layers:

```text
Participant and Shared Asset Layer
  MPD-01 Asset Catalog
  MPD-02 Publisher and Ecosystem Participation
  MPD-03 Asset Lifecycle and Versioning

Assurance Layer
  MPD-04 Review, Validation, Certification, and Trust
  MPD-05 Compatibility and Dependencies
  MPD-11 Security, Privacy, Audit, and Governance

Commercial and Distribution Layer
  MPD-06 Licensing and Commercial Participation
  MPD-07 Acquisition and Entitlement
  MPD-08 Distribution

Scoped Adoption Layer
  MPD-09 Installation, Activation, Applicability, and Upgrade

Experience and Operations Layer
  MPD-10 Discovery, Search, and Intelligence Participation
  MPD-12 Operations and Analytics Participation
```

These are logical groupings only. They do not approve service boundaries, physical tiers, or
runtime dependencies.

## 6. Approved Domains

The Proposal approves twelve logical Domains, subject to Architecture Review:

| ID | Proposed approved Domain | Canonical responsibility | Explicit exclusion |
|---|---|---|---|
| MPD-01 | Marketplace Asset Catalog | Marketplace Asset identity, category assignment, descriptive information, provenance | Asset Version publication and customer scoped state |
| MPD-02 | Marketplace Publisher and Ecosystem Participation | Marketplace Publisher and Publisher Participation | Core User, Workspace, Business, legal-party, or partner identity |
| MPD-03 | Marketplace Asset Lifecycle and Versioning | Marketplace Asset Version and shared Asset/version lifecycle | Review evidence, customer Installation, target configuration |
| MPD-04 | Marketplace Review, Validation, Certification, and Trust | Marketplace Review, Marketplace Certification, assurance evidence, Trust projection | publication transition and target authorization |
| MPD-05 | Marketplace Compatibility and Dependencies | Compatibility Declaration, Compatibility Assessment, Dependency Declaration | final target compatibility decision and dependency target writes |
| MPD-06 | Marketplace Licensing and Commercial Participation | Marketplace License Definition and Marketplace Offer | Core billing, payment, settlement, tax, invoice, dispute truth |
| MPD-07 | Marketplace Acquisition and Entitlement | Workspace-scoped Marketplace Purchase and Marketplace Entitlement | License definition, billing truth, Installation, Permission |
| MPD-08 | Marketplace Distribution | Distribution Availability for approved immutable versions | Asset content, Purchase, Installation, physical delivery mechanism |
| MPD-09 | Marketplace Installation, Activation, Applicability, and Upgrade | Version Selection, Installation, Marketplace Scoped Configuration, Activation, Applicability, upgrade and removal coordination | target-domain configuration and operational facts |
| MPD-10 | Marketplace Discovery, Search, and Intelligence Participation | Marketplace discovery and eligibility projections; Search and intelligence participation | Search Index, Decision, Recommendation, Implementation Option mapping |
| MPD-11 | Marketplace Security, Privacy, Audit, and Governance | Marketplace resource policy, required-Permission governance, Governance Action | Core grants, Audit Record, incident governance, target authorization |
| MPD-12 | Marketplace Operations and Analytics Participation | Marketplace operational projections, support coordination, health and Analytics participation | source Domain facts and Core Analytics projection |

### 6.1 Domain invariants

- MPD-01 owns Asset identity; MPD-03 owns Asset Version and publication lifecycle.
- MPD-04 produces Review and Certification evidence; MPD-03 alone changes shared publication
  state after validating required evidence.
- MPD-05 assesses Marketplace compatibility; the target owner independently decides whether it
  accepts an Asset action.
- MPD-06 defines License and Offer; MPD-07 owns customer Purchase and Entitlement; Core retains
  billing and financial truth.
- MPD-08 governs availability of a published version; MPD-09 owns scoped adoption state.
- MPD-10 and MPD-12 own projections only and do not acquire source facts.
- MPD-11 may create a Governance Action but cannot directly rewrite another Domain's canonical
  state; the affected owner performs its transition.

## 7. Approved Capabilities and Capability Ownership

The Proposal approves twenty-four logical Capabilities and one accountable Domain for each,
subject to Architecture Review:

| ID | Proposed approved Capability | Accountable Domain |
|---|---|---|
| MC-01 | Marketplace Asset Intake | MPD-01 Asset Catalog |
| MC-02 | Marketplace Catalog Management | MPD-01 Asset Catalog |
| MC-03 | Marketplace Asset Version Management | MPD-03 Asset Lifecycle and Versioning |
| MC-04 | Marketplace Review and Validation | MPD-04 Review, Validation, Certification, and Trust |
| MC-05 | Marketplace Certification | MPD-04 Review, Validation, Certification, and Trust |
| MC-06 | Marketplace Trust and Provenance | MPD-04 Review, Validation, Certification, and Trust |
| MC-07 | Marketplace Discovery and Search Participation | MPD-10 Discovery, Search, and Intelligence Participation |
| MC-08 | Marketplace Recommendation and Intelligence Participation | MPD-10 Discovery, Search, and Intelligence Participation |
| MC-09 | Marketplace Compatibility Evaluation | MPD-05 Compatibility and Dependencies |
| MC-10 | Marketplace Dependency Understanding | MPD-05 Compatibility and Dependencies |
| MC-11 | Marketplace Licensing | MPD-06 Licensing and Commercial Participation |
| MC-12 | Marketplace Pricing and Commercial Participation | MPD-06 Licensing and Commercial Participation |
| MC-13 | Marketplace Acquisition | MPD-07 Acquisition and Entitlement |
| MC-14 | Marketplace Entitlement | MPD-07 Acquisition and Entitlement |
| MC-15 | Marketplace Distribution | MPD-08 Distribution |
| MC-16 | Marketplace Installation | MPD-09 Installation, Activation, Applicability, and Upgrade |
| MC-17 | Marketplace Activation and Applicability | MPD-09 Installation, Activation, Applicability, and Upgrade |
| MC-18 | Marketplace Upgrade and Removal | MPD-09 Installation, Activation, Applicability, and Upgrade |
| MC-19 | Marketplace Shared Lifecycle Management | MPD-03 Asset Lifecycle and Versioning |
| MC-20 | Marketplace Security and Privacy Participation | MPD-11 Security, Privacy, Audit, and Governance |
| MC-21 | Marketplace Audit and Governance Participation | MPD-11 Security, Privacy, Audit, and Governance |
| MC-22 | Marketplace Analytics Participation | MPD-12 Operations and Analytics Participation |
| MC-23 | Marketplace Publisher and Partner Participation | MPD-02 Publisher and Ecosystem Participation |
| MC-24 | Marketplace Operations and Support | MPD-12 Operations and Analytics Participation |

A Capability's accountable home does not allow it to write another Domain's model.

## 8. Domain Boundaries and Dependency Direction

### 8.1 Allowed logical direction

```text
Core identity, organization, commercial, and authorization context
  -> Publisher and Asset Catalog
  -> Asset Version and shared lifecycle
  -> Review, Certification, Trust, Compatibility, and Dependency assurance
  -> License, Offer, Purchase, Entitlement, and Distribution
  -> scoped Version Selection, Installation, Activation, and Applicability
  -> target-owner validation and target use
  -> discovery, Product Hub, Audit, Notification, Search, Analytics, and operations projections
```

### 8.2 Prohibited direction

- a projection writing a source Domain;
- Review directly publishing or mutating an Asset Version;
- Marketplace Compatibility Assessment overriding target validation;
- License or Offer directly granting Entitlement;
- Purchase directly granting Permission or Activation;
- Distribution directly creating Installation;
- Installation directly applying target configuration;
- Governance Action directly mutating another Domain's model;
- Marketplace Search or Analytics becoming catalog source truth;
- Marketplace requiring another OS to complete a target OS core workflow; or
- any Domain accessing another Domain's private mutable state.

## 9. Ownership Model

### 9.1 Ownership meaning

The canonical owner alone validates and changes its canonical fact. A collaborator may request,
reference, review, assess, project, explain, or observe that fact but cannot write it.

### 9.2 External ownership retained

| External concept | Frozen owner | Marketplace use |
|---|---|---|
| User, Authentication, Workspace Membership, canonical Permission grants | Core Identity and Access | Verified and authorized context only |
| Workspace, Business, Business Unit, Department, Branch | applicable Core registry | Scoped references only |
| Core Product, Plan, billing, payment, invoice, tax, settlement, Subscription, OS readiness | applicable Core commercial owner | Eligibility and commercial context only |
| Product Hub journey | Product Hub | Marketplace projection and action handoff only |
| Business DNA | Business DNA owner | Authorized intelligence context only |
| Knowledge and Knowledge Pack content | Knowledge Engine | Distribution relationship without content ownership transfer |
| Capability definitions | Capability Registry | Reference only |
| Decision | Business Brain | Completed Decision context only |
| Recommendation | Recommendation Engine | Marketplace participation only |
| Implementation Option | Core intelligence mapping owner | Eligible Asset reference input only |
| Configuration Proposal | Configuration Engine | No proposal or application ownership |
| AI Expert selection and AI artifacts | AI Coordinator | Expert eligibility context only |
| Operating System operational facts | applicable OS | Target owner validates and applies effects |
| Audit Record | Core Audit Service | Marketplace submits attributable evidence |
| Notification state | Core Notification Service | Marketplace submits notification intent |
| Search Index | Core Search | Marketplace supplies source projection input |
| platform Analytics projection | Core Analytics | Marketplace supplies governed source outcomes |

### 9.3 Ownership invariants

1. Every canonical Marketplace fact has exactly one owner.
2. Every canonical Marketplace write model has exactly one owner.
3. Every aggregate candidate has exactly one owner.
4. Every approved lifecycle has exactly one owner.
5. Scoped state references, and never copies, shared Asset content.
6. Publication, Purchase, Installation, Activation, Applicability, Permission, and target
   configuration remain separate.
7. No Asset, Publisher, customer, projection, or external consumer becomes a second writer.

## 10. Canonical Facts

| Canonical fact | Exactly one owner | Boundary |
|---|---|---|
| Marketplace Publisher | MPD-02 | References Core identity or organization; does not duplicate it |
| Publisher Participation | MPD-02 | Marketplace eligibility and participation only |
| Marketplace Asset | MPD-01 | Shared Asset identity, category, metadata, provenance |
| Marketplace Asset Category Assignment | MPD-01 | Uses approved category taxonomy without redefining external concepts |
| Marketplace Asset Version | MPD-03 | Draft content and immutable published content |
| Marketplace Asset Version lifecycle state | MPD-03 | Shared publication lifecycle only |
| Marketplace Review | MPD-04 | Version-scoped review evidence and outcome |
| Marketplace Certification | MPD-04 | Explicit subject, scope, evidence, validity, status |
| Compatibility Declaration | MPD-05 | Publisher or authorized source declaration |
| Marketplace Compatibility Assessment | MPD-05 | Marketplace assessment; not target decision |
| Dependency Declaration | MPD-05 | Asset-Version dependency meaning |
| Marketplace License Definition | MPD-06 | Rights and conditions; not customer payment truth |
| Marketplace Offer | MPD-06 | Marketplace commercial presentation; not billing transaction |
| Marketplace Purchase | MPD-07 | Workspace-scoped acquisition outcome |
| Marketplace Entitlement | MPD-07 | Workspace-scoped continued Marketplace right |
| Distribution Availability | MPD-08 | Availability of a published immutable version |
| Marketplace Version Selection | MPD-09 | Workspace selection of one immutable version |
| Marketplace Installation | MPD-09 | Workspace-scoped installation state and history |
| Marketplace Scoped Configuration | MPD-09 | Marketplace lifecycle settings only; never target configuration |
| Marketplace Activation | MPD-09 | Workspace-scoped activation state and history |
| Marketplace Applicability | MPD-09 | Workspace- or selected-Business applicability only |
| Installation Dependency Resolution | MPD-09 | Installation-scoped resolved dependency references and outcomes |
| Marketplace Governance Action | MPD-11 | Authorized governance intent and outcome; affected owner performs state change |

### 10.1 Non-canonical facts and projections

- Marketplace Trust Profile is an MPD-04 projection.
- Marketplace Discovery View is an MPD-10 projection.
- Marketplace Search View is an MPD-10 projection; Core owns the Search Index.
- Marketplace Eligibility View is an MPD-10 projection.
- Marketplace Operational Dashboard and Analytics views are MPD-12 projections.
- Product Hub projections remain Product Hub-owned compositions.

## 11. Canonical Write Responsibilities

The Proposal defines eighteen logical canonical write models:

| ID | Canonical write model | Exactly one owner | Canonical responsibility |
|---|---|---|---|
| MWM-01 | Marketplace Publisher | MPD-02 | Publisher profile and Marketplace participation |
| MWM-02 | Marketplace Asset | MPD-01 | Asset identity, category assignment, metadata, provenance |
| MWM-03 | Marketplace Asset Version | MPD-03 | Draft and immutable published versions, shared lifecycle |
| MWM-04 | Marketplace Review | MPD-04 | Review evidence, dimension outcomes, disposition |
| MWM-05 | Marketplace Certification | MPD-04 | Certification subject, scope, evidence, validity, status |
| MWM-06 | Marketplace Compatibility | MPD-05 | Compatibility Declaration and Assessment |
| MWM-07 | Marketplace Dependency | MPD-05 | Dependency Declaration and relationship history |
| MWM-08 | Marketplace License | MPD-06 | License Definition and versions |
| MWM-09 | Marketplace Offer | MPD-06 | Commercial presentation and eligibility terms |
| MWM-10 | Marketplace Purchase | MPD-07 | Workspace acquisition history |
| MWM-11 | Marketplace Entitlement | MPD-07 | Workspace Marketplace right and lifecycle |
| MWM-12 | Marketplace Distribution | MPD-08 | Published-version availability and restrictions |
| MWM-13 | Marketplace Version Selection | MPD-09 | Workspace-selected immutable version history |
| MWM-14 | Marketplace Installation | MPD-09 | Installation and resolved dependency outcome history |
| MWM-15 | Marketplace Scoped Configuration | MPD-09 | Marketplace-only scoped settings |
| MWM-16 | Marketplace Activation | MPD-09 | Workspace Activation and deactivation history |
| MWM-17 | Marketplace Applicability | MPD-09 | Workspace or Business Applicability history |
| MWM-18 | Marketplace Governance Action | MPD-11 | Authorized policy or enforcement action and outcome |

MPD-10 and MPD-12 own projections only. They have no canonical Marketplace write model in v0.1.

## 12. Aggregate Responsibilities

| Aggregate candidate | Root | Exactly one owner | Must not own |
|---|---|---|---|
| Marketplace Publisher | Marketplace Publisher | MPD-02 | Core identity, legal party, Workspace, Business |
| Marketplace Asset | Marketplace Asset | MPD-01 | Asset Version content, Purchase, Installation |
| Marketplace Asset Version | Marketplace Asset Version | MPD-03 | Review evidence, customer scoped state |
| Marketplace Review | Marketplace Review | MPD-04 | publication state or target authorization |
| Marketplace Certification | Marketplace Certification | MPD-04 | Review history or target compatibility decision |
| Marketplace Compatibility | Marketplace Compatibility Assessment | MPD-05 | target operational acceptance |
| Marketplace Dependency | Dependency Declaration | MPD-05 | dependency Asset content or scoped installation state |
| Marketplace License | Marketplace License Definition | MPD-06 | billing, payment, invoice, settlement |
| Marketplace Offer | Marketplace Offer | MPD-06 | Purchase or Entitlement state |
| Marketplace Purchase | Marketplace Purchase | MPD-07 | License definition, billing outcome, Installation |
| Marketplace Entitlement | Marketplace Entitlement | MPD-07 | Permission, Activation, target configuration |
| Marketplace Distribution | Distribution Availability | MPD-08 | Asset content or scoped Installation |
| Marketplace Version Selection | Marketplace Version Selection | MPD-09 | immutable Asset Version content |
| Marketplace Installation | Marketplace Installation | MPD-09 | target configuration or target operational facts |
| Marketplace Scoped Configuration | Marketplace Scoped Configuration | MPD-09 | target-domain settings |
| Marketplace Activation | Marketplace Activation | MPD-09 | Permission grants or target use |
| Marketplace Applicability | Marketplace Applicability | MPD-09 | Business identity or target data |
| Marketplace Governance Action | Marketplace Governance Action | MPD-11 | direct writes to another aggregate |

Aggregate candidates are logical invariant boundaries, not physical transaction or storage
boundaries.

## 13. Shared Asset Model

### 13.1 Marketplace Asset

Marketplace Asset is the stable shared identity for one governed platform Asset. It identifies
category, publisher relationship, descriptive information, provenance, and version collection.

Marketplace Asset does not contain customer Purchase, Entitlement, Installation, Activation,
Applicability, target configuration, or target operational data.

### 13.2 Marketplace Asset Version

Marketplace Asset Version is the versioned content boundary. Before publication, an authorized
Draft may change under the proposed lifecycle. On publication, that version becomes platform-wide,
shared, immutable, and preserved.

A published correction, content change, compatibility change that alters version meaning, or
release change creates a new Marketplace Asset Version. An earlier published version remains
unchanged even when deprecated or archived.

### 13.3 Shared-versus-scoped invariant

```text
Marketplace Asset
  -> preserved Marketplace Asset Versions

Workspace
  -> Purchase
  -> Entitlement
  -> Version Selection
  -> Installation
  -> Marketplace Scoped Configuration
  -> Activation
  -> Applicability to Workspace or selected Business
```

Scoped facts reference Asset and Version identifiers. They never contain a tenant-owned copy of
published Asset content.

## 14. Workspace-Scoped State

The following decisions are proposed:

- Marketplace Purchase belongs to one Workspace.
- Marketplace Entitlement belongs to one Workspace.
- Marketplace Version Selection belongs to one Workspace and references one immutable version.
- Marketplace Installation belongs to one Workspace.
- Marketplace Scoped Configuration belongs to one Workspace and may include a Business
  reference only when the setting controls Marketplace lifecycle behavior for that applicability.
- Marketplace Activation belongs to one Workspace.
- Marketplace Applicability targets either the Workspace or one selected Business.
- Marketplace Applicability does not directly target Business Unit, Department, Branch, Module,
  or Resource in v0.1. Target owners may apply their own narrower configuration under separate
  ownership.
- removing scoped state never deletes the shared Asset or a published Asset Version.
- scoped history remains attributable and auditable even when current applicability ends.

Purchase, Entitlement, Installation, Scoped Configuration, Activation, Applicability, Permission,
and target configuration remain separate facts.

## 15. Publisher Model

### 15.1 Marketplace Publisher

Marketplace Publisher is a Marketplace-specific participation profile. It references an
approved Core identity, organization, partner, or legal-party relationship without duplicating
that identity.

Marketplace owns the canonical publisher profile used for Marketplace submission, provenance,
support, commercial participation, and Governance. Intellectual property and legal rights are
represented through approved License and agreement references and are not redefined as platform
data ownership.

### 15.2 Publisher Participation

Publisher Participation describes eligibility to submit, maintain, support, or commercially
participate in Marketplace under approved scope. It is separate from:

- Core User or Workspace Membership;
- Marketplace Certification;
- Asset Review or Approval;
- Asset publication;
- customer Entitlement; and
- target authorization.

### 15.3 Publisher categories

The architecture recognizes Genesis actor families—official Nexoraxs, Certified Partners,
Independent Developers, Consulting Companies, Business Experts, and Training Providers—without
freezing a final Publisher Type value set. Exact eligibility, verification, agreement, support,
and suspension policy remains deferred.

## 16. Asset Categories

### 16.1 Approved top-level categories

The following top-level Marketplace Asset categories are proposed:

1. Operating Systems;
2. Extensions;
3. Knowledge Packs;
4. Capability Packs;
5. AI Experts;
6. Automation Packs;
7. Workflow Packs;
8. Dashboard Packs;
9. Templates; and
10. Themes.

### 16.2 Category relationships

- **Connectors** are an Extension subtype, not a separate top-level category.
- **Reports** are not a top-level category in v0.1. A distributable Report definition belongs
  to a Dashboard Pack when it defines an authorized view or to Templates when it defines output
  presentation. The target owner retains source facts and applied report configuration.
- **Industry Solutions** are curated discovery compositions of existing Assets, not a new
  canonical Asset category and not a new Operating System.
- **Training and consulting services** are ecosystem offerings, not Marketplace Assets in v0.1.
- **Automations** are behavior described by Automation Packs; Automation Pack remains the
  canonical category name.

### 16.3 Category invariants

- Category never changes the owner of an external concept.
- Operating System Assets reference Core OS Product and Plan facts; they do not duplicate them.
- Knowledge Packs reference Knowledge Engine content.
- Capability Packs reference Capability Registry definitions and cannot redefine Capabilities.
- AI Experts remain subject to AI Coordinator eligibility and do not own Knowledge.
- every category uses the shared Asset/version model, while category-specific validation and
  scoped lifecycle applicability may vary under approved policy.

## 17. Asset Lifecycle

### 17.1 Asset identity lifecycle

MPD-01 owns Marketplace Asset identity lifecycle. The identity is created, maintained, and may
be closed from new publication while its preserved version history remains referenceable. Exact
identity states and closure policy remain deferred.

### 17.2 Asset Version lifecycle

MPD-03 owns the shared Marketplace Asset Version lifecycle:

```text
Draft
  -> Review
  -> Approved
  -> Published
  -> Deprecated
  -> Archived
```

`New Version Published` is an outcome linking the Asset to another Published immutable version,
not mutation of the current version and not an additional state.

The proposed lifecycle permits rejection or return for remediation before publication as an
outcome of Review; the exact vocabulary remains deferred. Emergency restriction is represented
by an MPD-11 Governance Action followed by an authorized MPD-03 lifecycle transition.

### 17.3 Scoped lifecycle separation

Marketplace Purchase, Entitlement, Distribution, Version Selection, Installation, Scoped
Configuration, Activation, and Applicability each have separate lifecycles owned by their
canonical Domains. No shared Asset lifecycle transition directly changes a scoped fact.

## 18. Asset Versioning

1. Marketplace Asset identity is stable across versions.
2. Each Marketplace Asset Version has one identity and references one Marketplace Asset.
3. Draft content is mutable only before publication under MPD-03 authority.
4. Published content is immutable and platform-wide.
5. Any content or semantic change after publication creates a new version.
6. Version labels, release notes, License references, compatibility declarations, dependency
   declarations, certification evidence, and documentation remain attributable to the version
   they describe.
7. Workspace Version Selection references an exact immutable Marketplace Asset Version.
8. Latest published version and selected Workspace version remain distinct.
9. Deprecation and archive do not delete content or history.
10. Exact version syntax, pre-release rules, support windows, and compatibility ranges remain
    deferred.

## 19. Review Model

Marketplace Review is version-scoped and owned by MPD-04.

The Review model recognizes the Genesis dimensions:

- Technical Review;
- Security Review;
- Business Review;
- UX Review;
- Performance Review; and
- Compatibility Review.

A Marketplace Review records attributable evidence and a dimension outcome for one Asset Version.
Required dimensions may vary by category under approved policy.

Review does not:

- publish an Asset Version;
- certify a publisher or Asset automatically;
- replace Marketplace Compatibility Assessment;
- replace target-owner validation;
- grant customer Entitlement or Permission; or
- guarantee future operational behavior.

MPD-03 validates required Review outcomes before an Asset Version publication transition.

## 20. Certification Model

Marketplace Certification is a canonical, evidence-backed attestation owned by MPD-04. Every
Certification declares:

- its subject, such as Publisher, Marketplace Asset, or Marketplace Asset Version;
- its certification kind and scope;
- evidence references;
- issuing authority reference;
- validity context and period where applicable;
- current Certification lifecycle state; and
- provenance and history.

Certification is separate from Review, Approval, publication, Compatibility Assessment,
customer rating, and target authorization.

Certification is optional unless category or Governance policy explicitly requires it. Exact
kinds, issuers, levels, validity rules, renewal, suspension, and revocation policy remain
deferred.

## 21. Trust Model

Marketplace Trust Profile is a derived MPD-04 read model, not a canonical write model or hidden
score.

It may compose authorized:

- publisher provenance and Participation state;
- Asset and version history;
- Review evidence and outcomes;
- Certification evidence and status;
- required-Permission and data-access declarations;
- Compatibility Assessment and dependency information;
- support, deprecation, incident, and policy evidence; and
- authorized adoption or operational projections.

The Trust Profile explains evidence and uncertainty. It never grants Permission, determines
target compatibility, replaces customer choice, or becomes Recommendation. Customer rating and
review models remain deferred and are not approved in v0.1.

## 22. Compatibility Model

### 22.1 Compatibility Declaration

Compatibility Declaration is the publisher- or authorized-source statement of supported
Platform, Operating System, Plan, Module, country, jurisdiction, language, Permission, dependency,
and other applicable contexts for one Asset Version.

### 22.2 Marketplace Compatibility Assessment

MPD-05 evaluates a declared Asset Version against current canonical context and approved
compatibility policy. The assessment is versioned, attributable, and explainable.

### 22.3 Target validation

Marketplace Compatibility Assessment is necessary where policy requires it but never sufficient
to authorize target use. The applicable Core or OS owner performs final validation using current
target state and invariants.

### 22.4 Compatibility invariants

- compatibility is version-specific;
- compatibility never transfers target ownership;
- a stale or unsupported assessment is represented honestly;
- declaration, Marketplace Assessment, Certification, and target decision remain distinct; and
- exact policy, precedence, ranges, evidence, expiry, and re-evaluation remain deferred.

## 23. Dependency Model

### 23.1 Dependency Declaration

MPD-05 owns version-scoped Dependency Declarations. Each declaration identifies a referenced
dependency, required or optional meaning, version constraint, purpose, and declared conflict or
replacement information.

### 23.2 Dependency Resolution

MPD-09 owns Installation Dependency Resolution for one Workspace Installation. It records the
exact immutable versions and external prerequisites evaluated for that installation and their
outcomes.

### 23.3 Dependency invariants

- a declaration does not install, acquire, activate, or authorize a dependency;
- transitive dependencies are explicit in the resolved installation view;
- cycles and unresolved required dependencies prevent successful Installation under future
  policy;
- dependency Permission, License, Entitlement, Compatibility, and target validation remain
  separately enforced;
- a dependency never creates cross-OS hard dependency for a core workflow; and
- exact range, conflict, cycle, auto-acquisition, consent, update, and removal policy remains
  deferred.

## 24. Licensing Responsibilities

MPD-06 owns Marketplace License Definition. A License Definition states the rights, restrictions,
scope, duration, usage basis, support or update rights, and applicable agreement references for
an Asset or Asset Version.

MPD-06 also owns Marketplace Offer, which presents a License under Free, Paid, Subscription,
one-time, usage-based, trial, bundle, or promotional commercial terms.

Core commercial owners retain:

- payment, invoice, tax, refund, settlement, dispute, and billing account truth;
- Core Plan and OS Subscription truth; and
- partner financial settlement under future approved commercial policy.

License Definition and Offer do not create Purchase, Entitlement, Installation, Activation, or
Permission. Exact legal, commercial, jurisdiction, acceptance, renewal, termination, and
revenue-sharing rules remain deferred.

## 25. Entitlement Responsibilities

### 25.1 Marketplace Purchase

MPD-07 owns Workspace-scoped Marketplace Purchase. Purchase records the authorized acquisition
outcome for one Marketplace Offer and Asset, including zero-price acquisition where applicable.
It references, but does not own, Core billing outcomes.

### 25.2 Marketplace Entitlement

MPD-07 owns Workspace-scoped Marketplace Entitlement. Entitlement proves the Workspace's current
Marketplace right to distribute, install, select, update, or use an Asset under License and
Offer conditions.

### 25.3 Entitlement invariants

- Marketplace Entitlement is distinct from Core Workspace Entitlement and OS Subscription.
- Entitlement never grants Permission, Installation, Activation, Applicability, or target use.
- Business Applicability references a Workspace Entitlement; a Business does not own the
  Entitlement.
- billing failure or License change affects Entitlement only through governed MPD-07 transition.
- exact trial, renewal, suspension, expiry, cancellation, continued-use, dependency, and bundle
  policy remains deferred.

## 26. Distribution Responsibilities

MPD-08 owns Distribution Availability for an approved immutable Asset Version.

Distribution Availability defines whether that version may be discovered or obtained in an
authorized context according to publication state, country, jurisdiction, customer class,
Workspace, Plan, Operating System, category, Publisher, License, and Governance restrictions.

Distribution:

- requires an Approved or Published version under the shared lifecycle;
- never copies or mutates Asset content;
- does not create Purchase, Entitlement, Installation, or Activation;
- distinguishes availability to existing customers from availability to new customers;
- preserves integrity and provenance references; and
- may be withdrawn or restricted through an authorized MPD-08 transition initiated by policy or
  Governance Action.

Exact public, private, preview, staged, limited, country, withdrawal, and emergency availability
policy remains deferred.

## 27. Installation Responsibilities

MPD-09 owns Marketplace Installation.

Before a successful Installation, MPD-09 validates:

- Actor and Workspace authorization;
- Marketplace Entitlement;
- selected immutable Asset Version;
- Distribution Availability;
- Marketplace Compatibility Assessment;
- dependency resolution;
- required Permission declarations without assigning Permissions;
- target context and target-owner acceptance where applicable; and
- current scoped state and idempotency identity.

Installation is Workspace-scoped, versioned, auditable, reversible under future policy, and
separate from Activation and target configuration.

Long-running states, partial outcomes, cancellation, retry, timeout, recovery, and physical
installation meaning by category remain deferred. Installation failure cannot mutate the shared
Asset or create a second target writer.

## 28. Activation Responsibilities

MPD-09 owns Workspace-scoped Marketplace Activation.

Activation means that an installed selected version is enabled for possible authorized use. It
requires current Entitlement, Installation, Compatibility, dependencies, declared Permissions,
and target validation as applicable.

Activation does not:

- assign Permission;
- create Marketplace Applicability automatically unless a separately authorized transition is
  made;
- apply target configuration;
- execute an Asset around the target owner;
- guarantee target operational readiness; or
- transfer Asset ownership to the Workspace.

Deactivation ends current activation under future policy while preserving attributable history.

## 29. Applicability Responsibilities

MPD-09 owns Marketplace Applicability.

Applicability specifies whether an active Asset Version applies to:

- the entire Workspace; or
- one selected Business within that Workspace.

The selected Business must belong to the Workspace and remain currently authorized.

Applicability does not own Business identity, Business DNA, Business Unit, Department, Branch,
target configuration, or target operational data. Narrower Business Unit, Department, Branch,
Module, or Resource application is owned by the target Domain if supported and is not
Marketplace Applicability in v0.1.

Applicability is version-aware, independently revocable, auditable, and distinct from
Installation, Activation, Permission, and Recommendation relevance.

## 30. Upgrade Responsibilities

An upgrade is an MPD-09 coordinated change in Workspace Version Selection followed by governed
Installation, Activation, and Applicability transitions as necessary. It never mutates a
published Asset Version.

The proposed upgrade flow is:

```text
new immutable version available
  -> current Entitlement and Distribution validation
  -> Compatibility and dependency evaluation
  -> customer or approved-policy selection
  -> target-owner impact validation
  -> new Version Selection
  -> Installation transition
  -> Activation and Applicability reconciliation
  -> preserved prior selection and outcome history
```

Automatic, recommended, scheduled, mandatory, security-critical, rollback, migration,
multi-Business, partial, and failed-upgrade policy remains deferred.

## 31. Removal Responsibilities

Removal affects scoped Marketplace state only.

MPD-09 coordinates:

- Applicability removal;
- deactivation;
- Installation closure or removal under future category policy;
- Marketplace Scoped Configuration closure;
- Version Selection history; and
- dependency and target-impact reconciliation.

Removal never deletes Marketplace Asset, Marketplace Asset Version, Publisher, Review,
Certification, License, Purchase, Entitlement history, Audit Record, or target-owned historical
fact. Entitlement cancellation remains MPD-07 responsibility. Distribution withdrawal remains
MPD-08 responsibility. Target owners handle their own configuration and operational effects.

Exact uninstall, retained data, rollback, orphan dependency, target cleanup, and continued-use
policy remains deferred.

## 32. Marketplace Search Participation

MPD-10 owns Marketplace Search View and Marketplace Discovery View projections. It consumes
authorized Marketplace source facts and supplies minimized source information to Core Search.

Core Search owns the Search Index, query behavior, and shared Search infrastructure. Product Hub
may compose Marketplace Search results without becoming source owner.

Search participation preserves:

- publication and Distribution Availability;
- Workspace and Business context;
- Permission, Entitlement, Installation, Activation, Applicability, and lifecycle filtering;
- category, Capability, country, OS, Plan, License, Compatibility, Trust, and Publisher context;
- localization and canonical terminology; and
- source version, freshness, and traceability.

Exact Search fields, ranking, filtering, synonym, sponsorship, and stale-state policy remain
deferred.

## 33. Marketplace Recommendation Participation

Recommendation Engine remains the only owner of Recommendation.

MPD-10 owns Marketplace Eligibility View, a disposable projection that states which Marketplace
Asset Versions are available and eligible for consideration in explicit context. It may supply
that projection to Implementation Option mapping, Recommendation Engine, Product Hub, or
authorized discovery.

Marketplace may explain Asset facts and eligibility but cannot:

- form or modify Business Brain Decision;
- create, prioritize, or dispose of Recommendation;
- own Implementation Option mapping;
- convert sponsored visibility into governed Recommendation priority;
- acquire or activate an Asset automatically; or
- treat customer selection as target authorization.

Authorized Purchase, Installation, Activation, Applicability, adoption, failure, and removal
outcomes may participate in future feedback without changing source ownership. Exact ranking,
sponsorship, feedback, and conversion policy remains deferred.

## 34. Marketplace Analytics Participation

MPD-12 owns Marketplace operational and business-value read models built from authorized source
facts. Core Analytics owns platform Analytics projections.

Marketplace Analytics participation may cover:

- catalog and discovery outcomes;
- Review, Certification, publication, and version throughput;
- Purchase, Entitlement, Installation, Activation, Applicability, update, and removal outcomes;
- Compatibility and dependency failures;
- category, country, OS, Publisher, and version adoption;
- support, incident, deprecation, and operational health; and
- authorized business-value and outcome feedback.

Analytics is derived, permission-filtered, minimized, source-attributed, and non-canonical. Exact
definitions, measures, retention, anonymous learning, reports, dashboards, and access policy
remain deferred.

## 35. Marketplace Security Responsibilities

Marketplace extends shared Core Security and remains a separate trust boundary.

Marketplace must:

- require Core-authenticated identity and current explicit context;
- enforce Workspace tenant isolation;
- authorize Marketplace resource and lifecycle actions under least privilege;
- validate Publisher Participation, Entitlement, selected version, Distribution, Installation,
  Activation, Applicability, and target context as applicable;
- require Asset Versions to declare Permissions and data needs;
- keep Permission assignment separate from Activation;
- treat publisher, Asset, Connector, external provider, AI Expert, executable content, customer
  input, and target output as untrusted until validated;
- preserve immutable-version integrity and provenance;
- minimize sensitive data in Review, Trust, Search, Analytics, Audit, and operational views;
- require target-owner authorization for every target effect;
- fail closed on missing, stale, ambiguous, or mismatched context; and
- submit consequential evidence to Core Audit Service.

Core owns identity, sessions, canonical grants, platform secrets, incident governance, and shared
Security foundations. Exact Marketplace Permission catalog, administrative access, approval,
sandbox, isolation, testing, supply-chain, vulnerability, and emergency policy remains deferred.

## 36. Marketplace Privacy Responsibilities

Marketplace privacy follows purpose limitation, minimization, tenant isolation, and source
ownership.

Marketplace must:

- collect only information required for Asset, Publisher, scoped lifecycle, assurance,
  commercial, support, or operational purpose;
- prefer canonical references over copies of identity, organization, Business DNA, customer,
  target, billing, or OS data;
- constrain Publisher and Asset access to declared, approved purposes;
- apply same-or-narrower scope to projections;
- minimize information shared with publishers, partners, external providers, AI Experts, other
  Operating Systems, Search, Analytics, and Product Hub;
- preserve privacy obligations across immutable shared history and scoped customer state; and
- keep operational telemetry distinct from Audit and business facts.

Exact classification, consent, residency, retention, erasure, export, disclosure, masking,
anonymous learning, and legal-hold policy remains deferred.

## 37. Marketplace Audit Responsibilities

Core Audit Service owns append-only Audit Records. Marketplace canonical owners submit
attributable evidence for consequential:

- Publisher Participation and administration;
- Asset creation and category or provenance change;
- Draft, Review, Approval, publication, deprecation, archive, and Governance Action;
- Certification and Compatibility Assessment;
- License and Offer change;
- Purchase and Entitlement change;
- Distribution restriction or withdrawal;
- Version Selection, Installation, Scoped Configuration, Activation, Applicability, upgrade,
  deactivation, and removal;
- required-Permission or data-access declaration change;
- target validation and consequential customer approval; and
- recovery, support, policy, and emergency action.

Marketplace Audit input preserves Actor, explicit context, owner, subject reference, version,
action, correlation, causation, and outcome as applicable. It is not an Audit Record and does not
transfer source ownership.

## 38. Marketplace Operational Responsibilities

MPD-12 coordinates Marketplace operations and support without acquiring source facts.

Operational responsibilities include:

- catalog and Distribution Availability health;
- Review and publication progression;
- License, Purchase, Entitlement, and scoped-state reconciliation;
- Installation, Activation, Applicability, upgrade, and removal progress;
- Compatibility and dependency assessment quality;
- projection freshness and rebuild status;
- Publisher and customer support coordination;
- incident, vulnerability, policy, and emergency visibility;
- optional dependency isolation;
- historical version availability and reproducibility;
- global country, language, License, and support readiness; and
- observability through correlated records, measures, traces, health, alerts, and dashboards.

Canonical owner failure remains owner-scoped. A projection failure cannot roll back a source
fact. A target or optional dependency failure cannot create a second writer. Long-running state,
retry, timeout, recovery, service objectives, continuity, support, incident, and capacity policy
remains deferred.

## 39. Collaboration with Frozen Platform Owners

### 39.1 Core Platform

Marketplace consumes Core identity, organization, commercial, Security, Audit, Notification,
Search, Analytics, navigation, and operational foundations. Marketplace remains within Core
Platform offering but owns only its bounded-context facts.

### 39.2 Product Hub

Product Hub composes Marketplace discovery, eligibility, Purchase, Entitlement, Installation,
Activation, Applicability, and update projections with other journey information. It initiates
authorized Marketplace actions but never writes Marketplace models.

### 39.3 Business Brain

Business Brain owns completed Decision and candidate reasoning. Marketplace supplies authorized
availability and outcome context and never forms Decision content or Marketplace state on behalf
of Business Brain.

### 39.4 Recommendation Engine

Recommendation Engine owns Recommendation. Marketplace supplies eligible Asset context and
receives authorized mapping or presentation context without owning Recommendation.

### 39.5 Commerce OS

Commerce OS retains every Commerce fact and target configuration. Marketplace supplies entitled,
active, applicable Asset context; Commerce independently validates and applies any Commerce
effect. Commerce Core remains usable without optional Marketplace Assets.

### 39.6 Future Operating Systems

Future Operating Systems retain their own setup, Permission semantics, target configuration,
workflow, and operational data. Marketplace distribution remains optional, versioned,
owner-preserving, and target-validated.

## 40. Extension Model

Extension is an approved top-level Marketplace Asset category for optional platform or OS
behavior.

An Extension:

- uses the shared Asset/version, Review, Compatibility, License, Entitlement, Distribution, and
  scoped-state model;
- declares supported targets, versions, dependencies, Permissions, data needs, and external
  relationships;
- invokes target behavior only through the target owner's approved boundary;
- owns no target business fact;
- cannot create a parallel order, inventory, customer, payment, document, identity, Business DNA,
  Knowledge, Decision, Recommendation, or configuration truth;
- remains optional for target core operation; and
- may require stricter category-specific Review and isolation before third-party participation.

Executable-content classification, isolation, sandbox, lifecycle effects, compatibility, and
removal behavior remain deferred.

## 41. Connector Model

Connector is an Extension subtype that relates Nexoraxs to an external provider or system.

Connector-specific requirements include declared:

- external provider and purpose;
- supported Platform or OS targets;
- required Permissions and data access;
- credential and secret needs without owning Core secret policy;
- external source-of-truth boundaries;
- Compatibility and dependencies;
- failure, timeout, retry, reconciliation, and support expectations; and
- removal and retained-history effects.

The Connector never becomes the owner of external-provider truth or target Platform/OS facts.
Exact provider identity, credential, data-flow, reconciliation, and operational policy remains
deferred.

## 42. Template and Theme Models

### 42.1 Template

Template is a Marketplace Asset category for versioned reusable presentation or content
structure. Marketplace owns the shared Template Asset Version; the applicable target owner owns
selected target configuration and every generated business record.

Templates cannot own Invoice, Receipt, contract, message, workflow, or another generated fact.
Template kinds, variables, localization, legal constraints, compatibility, preview, and target
application remain deferred.

### 42.2 Theme

Theme is a Marketplace Asset category for presentation configuration. A Theme cannot own
business logic, authorization, navigation truth, accessibility policy, or canonical data.

Marketplace owns the shared Theme Asset Version and scoped Marketplace state. The target owner
owns applied target presentation configuration. Compatibility, localization, accessibility,
branding, override, preview, and removal behavior remains deferred.

## 43. Knowledge Pack Relationship

Knowledge Pack is both a Marketplace-distributed Asset and a Knowledge Engine-owned Knowledge
asset.

The boundary is:

- Marketplace owns the Marketplace Asset record, Marketplace Asset Version distribution
  metadata, Purchase, Entitlement, Installation, Activation, Version Selection, and
  Applicability.
- Knowledge Engine owns Knowledge Pack content, Knowledge publication meaning, Knowledge
  applicability interpretation, and Knowledge consumption.
- the Marketplace Asset Version references the canonical immutable Knowledge Pack version; it
  does not duplicate its content.
- Marketplace Activation and Applicability make the Knowledge Pack eligible for Knowledge Engine
  use in authorized Workspace or Business context; Knowledge Engine performs final applicability
  validation.
- removing Marketplace scoped state does not delete Knowledge history.

Exact dual-version alignment, Review, country applicability, License, dependency, and feedback
policy remains deferred.

## 44. AI Expert Relationship

AI Expert Definition may be published as a Marketplace Asset Version. Marketplace owns the Asset,
version distribution metadata, Review, Certification, Compatibility, License, Entitlement,
Installation, Activation, and Applicability facts.

AI Coordinator owns:

- Expert eligibility for a specific authorized AI Interaction;
- Expert selection and coordination;
- provider and model use;
- AI context, output, explanation, and Action Proposal; and
- AI operational and safety behavior.

AI Experts consume Knowledge and never own it. Marketplace discovery never lets customers bypass
AI Coordinator to select an Expert as an independent conversational authority. Marketplace
Activation makes an Expert definition available for eligibility evaluation; it does not compel
selection or grant data access.

Exact Expert submission, evaluation, safety, country, Knowledge dependency, provider,
commercial, capacity, fallback, and removal policy remains deferred.

## 45. Future ADR Candidates

The following are Draft ADR candidates only. They create no Accepted ADR and reserve no
Governance number.

| ID | Draft ADR candidate | Principal proposed decision |
|---|---|---|
| DADR-MP-01 | Marketplace Internal Domain Map | Approve twelve logical Marketplace Domains |
| DADR-MP-02 | Marketplace Capability Catalog | Approve twenty-four Marketplace Capabilities and accountable homes |
| DADR-MP-03 | Shared Asset and Scoped State Separation | Separate immutable Asset Versions from Workspace and Business state |
| DADR-MP-04 | Marketplace Asset and Version Ownership | Separate Asset identity from version publication ownership |
| DADR-MP-05 | Marketplace Publisher Participation | Define Marketplace Publisher as a profile referencing Core identity |
| DADR-MP-06 | Marketplace Category Taxonomy | Approve top-level categories and subtype/composition rules |
| DADR-MP-07 | Asset Version Publication Lifecycle | Apply Draft-through-Archived lifecycle to immutable versions |
| DADR-MP-08 | Review, Certification, and Trust Separation | Keep evidence, attestation, projection, and publication distinct |
| DADR-MP-09 | Compatibility and Target Validation Separation | Marketplace assessment never replaces target-owner validation |
| DADR-MP-10 | Dependency Declaration and Installation Resolution | Separate shared declaration from scoped resolved dependencies |
| DADR-MP-11 | License, Offer, Billing, Purchase, and Entitlement Separation | Preserve distinct commercial owners and facts |
| DADR-MP-12 | Distribution Availability Boundary | Separate shared version availability from scoped Installation |
| DADR-MP-13 | Marketplace Scoped Adoption Model | Separate Version Selection, Installation, Activation, and Applicability |
| DADR-MP-14 | Marketplace Applicability Scope | Limit Marketplace Applicability to Workspace or selected Business |
| DADR-MP-15 | Upgrade and Removal Preserve Immutable History | Change scoped selection without rewriting shared versions |
| DADR-MP-16 | Search and Recommendation Participation | Keep Marketplace projections outside Search and Recommendation ownership |
| DADR-MP-17 | Marketplace Security and Required Permission Boundary | Activation never grants Permission and target owner reauthorizes |
| DADR-MP-18 | Marketplace Governance Action Boundary | Governance action requests owner transition without direct cross-Domain writes |
| DADR-MP-19 | Extension and Connector Model | Connector as Extension subtype with no target ownership |
| DADR-MP-20 | Knowledge Pack and AI Expert Dual Boundaries | Preserve Knowledge Engine and AI Coordinator ownership while Marketplace distributes Assets |

Architecture Review may accept the Proposal without accepting these ADR candidates. Each
candidate requires independent Governance disposition.

## 46. Deferred Decisions

The Proposal deliberately defers detailed decisions without deferring canonical ownership.

### 46.1 Asset identity, categories, and versions

| ID | Deferred decision |
|---|---|
| DD-MP-01 | Universal versus category-specific Asset information and validation requirements |
| DD-MP-02 | Exact Asset identity lifecycle and closure semantics |
| DD-MP-03 | Exact version syntax, ordering, pre-release, preview, staged, and limited-release semantics |
| DD-MP-04 | Version support windows, latest/recommended meaning, and end-of-support policy |
| DD-MP-05 | Capability Pack content and publication eligibility |
| DD-MP-06 | Industry Solution curation and composition semantics |

### 46.2 Publishers and participation

| ID | Deferred decision |
|---|---|
| DD-MP-07 | Final Publisher Type values and relationship to Core identity, organization, partner, and legal-party models |
| DD-MP-08 | Publisher onboarding, verification, agreements, ongoing eligibility, suspension, and termination |
| DD-MP-09 | Submission authority by Asset category |
| DD-MP-10 | Reviewer, certifier, administrator identity, separation of duties, and conflict-of-interest policy |
| DD-MP-11 | Official versus partner versus independent participation requirements |
| DD-MP-12 | Third-party participation entry criteria and rollout policy |

### 46.3 Lifecycle, Review, Certification, and Trust

| ID | Deferred decision |
|---|---|
| DD-MP-13 | Rejection, withdrawal, remediation, suspension, emergency restriction, appeal, and reinstatement vocabulary |
| DD-MP-14 | Required Review dimensions, evidence, outcomes, re-review, expiry, and category variations |
| DD-MP-15 | Certification kinds, subjects, issuers, levels, validity, renewal, suspension, and revocation |
| DD-MP-16 | Trust Profile fields, explanation, uncertainty, freshness, and access policy |
| DD-MP-17 | Customer rating or review eligibility, moderation, manipulation, privacy, and relevance |
| DD-MP-18 | Publication approval thresholds and human-approval policy |
| DD-MP-19 | Deprecation, archive, existing-customer access, and historical availability policy |
| DD-MP-20 | Governance Action classes, authority, target-owner response, and emergency policy |

### 46.4 Compatibility and dependencies

| ID | Deferred decision |
|---|---|
| DD-MP-21 | Compatibility policy language, precedence, evidence, expiry, refresh, and Assessment lifecycle |
| DD-MP-22 | Platform, OS, Plan, Module, country, Permission, configuration, and target version dimensions |
| DD-MP-23 | Required, optional, direct, transitive, conflicting, replacement, and mutually exclusive dependency semantics |
| DD-MP-24 | Dependency version ranges versus exact-version requirements |
| DD-MP-25 | Cycle prevention, conflict resolution, and incompatible-combination behavior |
| DD-MP-26 | Dependency acquisition, consent, License, Entitlement, Installation, and Activation policy |
| DD-MP-27 | Dependency update, deprecation, suspension, and removal propagation |

### 46.5 Licensing, commercial, Purchase, and Entitlement

| ID | Deferred decision |
|---|---|
| DD-MP-28 | License subject, version, acceptance, rights, restrictions, jurisdiction, renewal, and termination |
| DD-MP-29 | Free, Paid, Subscription, one-time, usage-based, trial, bundle, and promotional Offer rules |
| DD-MP-30 | Workspace, Business, user, Branch, usage, country, Plan, and feature limit semantics |
| DD-MP-31 | Core billing, tax, invoice, refund, dispute, settlement, and partner revenue-sharing collaboration |
| DD-MP-32 | Purchase reversal, cancellation, dispute, and zero-price acquisition semantics |
| DD-MP-33 | Entitlement trial, renewal, suspension, expiry, cancellation, revocation, and continued-use rules |
| DD-MP-34 | Bundle and dependency Entitlement composition |

### 46.6 Distribution and scoped adoption

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

### 46.7 Discovery, intelligence, Security, and operations

| ID | Deferred decision |
|---|---|
| DD-MP-44 | Marketplace discovery, Search ranking, filtering, localization, sponsorship, and stale-state policy |
| DD-MP-45 | Recommendation eligibility, explanation, feedback, conversion, and sponsored-visibility policy |
| DD-MP-46 | Analytics definitions, measures, access, retention, anonymous learning, dashboards, and reports |
| DD-MP-47 | Marketplace Permission catalog, role policy, administrative access, approval thresholds, and Delegation |
| DD-MP-48 | Data classification, consent, residency, retention, erasure, export, disclosure, masking, and legal hold |
| DD-MP-49 | Executable Asset classification, sandbox, isolation, testing, supply-chain, secrets, vulnerability, and provider controls |
| DD-MP-50 | Audit evidence detail, observability signals, service objectives, recovery objectives, support, incident, capacity, continuity, and global operations |

**Deferred Decision count: 50**

No Deferred Decision may transfer a frozen owner silently.

## 47. Risks

| ID | Proposed architecture risk | Impact | Proposed architectural treatment |
|---|---|---|---|
| R-01 | Asset and scoped state are conflated | Immutable history and tenant isolation fail | Separate write models and aggregates |
| R-02 | Product Hub becomes a Marketplace writer | Composition and source ownership conflict | Marketplace projections and owner actions only |
| R-03 | Review or Certification is treated as target authorization | Unsafe target use | Mandatory independent target validation |
| R-04 | Activation grants Permission | Least privilege fails | Separate grants and Activation |
| R-05 | Category taxonomy becomes inconsistent | Discovery and policy fragment | Ten top-level categories and explicit subtype/composition rules |
| R-06 | Publisher profile duplicates Core identity | Identity divergence | Reference Core identity or organization |
| R-07 | License, Purchase, Entitlement, and billing collapse | Commercial state conflicts | Separate Domains and write models |
| R-08 | Compatibility declarations are trusted as proof | Installation harms target | Marketplace Assessment plus target-owner decision |
| R-09 | Dependencies trigger hidden acquisition or hard OS coupling | Cost, access, and independence fail | Explicit declarations, resolution, and consent policy deferral |
| R-10 | Upgrade mutates a published version | Reproducibility fails | New immutable version and Version Selection |
| R-11 | Removal deletes shared or target history | Audit and ownership fail | Scoped closure only; target owner handles target facts |
| R-12 | Marketplace discovery becomes Recommendation | Intelligence ownership conflicts | Eligibility projection only |
| R-13 | Knowledge Pack distribution duplicates Knowledge | Competing content source | Reference canonical Knowledge Pack version |
| R-14 | AI Expert distribution bypasses AI Coordinator | AI safety and ownership fail | Activation provides eligibility only |
| R-15 | Extensions create parallel OS truth | Domain integrity fails | Target-owner-only write invariant |
| R-16 | Third-party executable participation begins prematurely | Platform Security risk | Deferred sandbox and entry criteria |
| R-17 | Analytics becomes source truth | Derived data overrides facts | Projection-only Domains |
| R-18 | Governance Domain writes another Domain directly | Hidden cross-Domain ownership | Governance Action plus owner transition |
| R-19 | Installation uncertainty creates duplicate effects | Scoped state divergence | Idempotency and recovery detail deferred under fixed owner |
| R-20 | Fifty deferrals are treated as optional implementation choices | Inconsistent implementation | Governance resolution required before affected work |

All risks require independent Review. This Proposal does not classify them as accepted.

## 48. Success Criteria

This Proposal is ready for independent Architecture Review when reviewers can verify that:

1. Marketplace remains a Core Platform bounded context without merging into Product Hub.
2. twelve logical Domains have non-overlapping canonical responsibilities.
3. twenty-four Capabilities each have one accountable Domain.
4. every canonical fact, write model, aggregate candidate, and lifecycle has one owner.
5. Marketplace Asset and immutable Asset Version remain distinct from scoped customer state.
6. Publisher references Core identity without duplicating it.
7. category taxonomy preserves OS, Knowledge, Capability, AI, Extension, Connector, Template,
   Theme, Dashboard, Report, and Automation boundaries.
8. Review, Certification, Trust, publication, Compatibility, and target validation remain
   distinct.
9. License, Offer, Core billing, Purchase, Entitlement, Distribution, Installation, Activation,
   Applicability, Permission, and target configuration remain distinct.
10. upgrade and removal preserve immutable shared history.
11. Search, Recommendation, Analytics, Audit, Notification, and Product Hub participation do not
    transfer ownership.
12. Core Platform, Business Brain, Recommendation Engine, Configuration Engine, Commerce OS,
    future OS, Knowledge Engine, and AI Coordinator boundaries remain frozen.
13. Extension, Connector, Template, Theme, Knowledge Pack, and AI Expert models create no parallel
    truth.
14. all fifty Deferred Decisions are explicit and none hides an ownership gap.
15. all twenty Draft ADR candidates remain unaccepted.
16. no physical implementation or technology choice is introduced.

## 49. Recommendation

# READY FOR ARCHITECTURE REVIEW

Marketplace Proposal v0.1 defines a complete proposed logical architecture while preserving the
frozen Genesis, Core Platform, Business Brain, and Commerce OS baselines. It requires independent
Architecture Review before any Documentation Wave or Freeze activity.

## References

### Governing and frozen baselines

- `docs/00-governance/`
- `docs/01-genesis/`
- `docs/02-core-platform/`
- `docs/03-business-brain/`
- `docs/04-commerce-os/`
- `docs/99-architecture-freeze/`

### Marketplace approved discovery artifacts

- `docs/05-marketplace/00-MARKETPLACE-DISCOVERY.md`
- `docs/05-marketplace/01-MARKETPLACE-CAPABILITY-MAP.md`

### Marketplace-specific accepted authority

- `docs/00-governance/ADR/ADR-027-marketplace-bounded-context-within-core.md`
- `docs/00-governance/ADR/ADR-028-immutable-marketplace-assets-scoped-state.md`
- `docs/01-genesis/17-MARKETPLACE-ARCHITECTURE.md`
- `docs/01-genesis/20-PLATFORM-ECOSYSTEM.md`
