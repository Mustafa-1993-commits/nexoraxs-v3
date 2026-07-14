# Marketplace Discovery v0.1

**Status:** Discovery  
**Milestone:** Marketplace  
**Classification:** Exploratory problem-space definition  
**Architecture approval:** None  
**Domain approval:** None  
**Capability approval:** None

This document explores the Marketplace problem space under the frozen Genesis v1.1, Core
Platform v1.0, Business Brain v1.0, and Commerce OS v1.0 baselines. It records known constraints,
candidate responsibility clusters, risks, unknowns, and questions. It does not propose or
approve Marketplace architecture.

## 1. Vision

Marketplace is the trusted expansion ecosystem through which Nexoraxs customers discover and
adopt governed platform assets that help a Business operate, improve, and grow.

Marketplace is not an e-commerce marketplace for general goods or consumer transactions. Its
problem space is the governed discovery, distribution, installation, activation, licensing,
updates, compatibility, validation, and lifecycle management of Nexoraxs platform assets.

The long-term vision described by Genesis is a platform ecosystem in which customers can find
the Operating Systems, Knowledge Packs, AI Experts, Extensions, Automation Packs, Dashboard
Packs, Workflow Packs, Templates, Themes, and other approved business-operating assets they need
without leaving Nexoraxs.

## 2. Mission

The Marketplace milestone must understand how Nexoraxs can make platform assets:

- discoverable for the correct Workspace and Business context;
- understandable as business-value implementation options rather than application volume;
- reviewable, trustworthy, compatible, versioned, and auditable;
- commercially and legally usable under explicit licensing and Entitlement;
- distributable without copying or mutating shared published Asset Versions;
- installable and activatable in authorized tenant scope;
- upgradable, deprecable, removable, and recoverable without losing history;
- safe for Core Platform and independent Operating Systems;
- useful to Product Hub, Business Brain, Recommendation Engine, Configuration Engine, and AI
  Coordinator without duplicating their responsibilities; and
- operable across official, partner, developer, expert, and future ecosystem participation.

This Discovery identifies the questions a Proposal must answer. It does not answer them.

## 3. Marketplace Scope

The Marketplace problem space includes exploration of:

- Marketplace Asset identity, category, descriptive information, publisher relationship, and
  provenance;
- immutable published Marketplace Asset Versions and their history;
- Draft, Review, Approved, Published, Deprecated, and Archived shared-asset states already named
  by Genesis;
- Workspace-scoped Purchase, Installation, Activation, and version selection;
- Workspace- or Business-scoped Applicability;
- discovery, Search, presentation, ranking, and Recommendation participation;
- dependencies, compatibility, supported countries, Operating Systems, Plans, and required
  Permissions;
- licensing, Pricing, Free Assets, Paid Assets, Subscriptions, one-time purchase, usage-based
  Pricing, and partner revenue sharing;
- validation, review, certification, trust, provenance, and quality;
- distribution, updates, upgrade choice, deprecation, removal, and recovery;
- official and future third-party publisher participation;
- platform Security, privacy, Audit, Analytics, and operations participation; and
- relationships with Core Platform, Business Brain, Commerce OS, future Operating Systems,
  Knowledge Packs, AI Experts, Connectors, Templates, Themes, Automation Packs, Extensions,
  Dashboard Packs, and Reports.

The scope is exploratory. Inclusion here does not approve a Marketplace Domain, Capability,
aggregate, write model, lifecycle detail, or owner beyond frozen predecessor decisions.

## 4. Non-Scope

This Discovery does not define or approve:

- a marketplace for physical products, consumer goods, or Commerce OS customer sales;
- Commerce Product, Order, Stock, Payment, Refund, Tax Application, or Commerce Document logic;
- a new Product Hub, Recommendation Engine, Business Brain, Configuration Engine, AI
  Coordinator, Knowledge Engine, or Operating System;
- publisher, partner, developer, reviewer, or administrator identity models;
- exact asset taxonomies, metadata, validation criteria, certification levels, or trust scores;
- exact licensing, Pricing, settlement, tax, refund, revenue-sharing, or financial policy;
- exact compatibility, dependency, upgrade, rollback, removal, or recovery behavior;
- physical interfaces, data structures, Events, Contracts, messaging, or transport;
- runtime, service, infrastructure, deployment, framework, cloud, or vendor choices;
- executable extension isolation, sandbox, or code-execution mechanisms;
- implementation tasks or implementation sequence;
- resolution of predecessor Deferred Decisions; or
- approval of the candidate Capabilities and candidate Domains recorded later in this document.

## 5. Marketplace Philosophy

Discovery is guided by frozen principles rather than new decisions:

1. **Business value before asset count:** Marketplace exists to help solve real business
   problems, not maximize listings.
2. **Capabilities before implementation options:** Business improvements and Capability needs
   precede mapping to a Marketplace Asset.
3. **Shared asset, scoped state:** Published Marketplace Asset Versions are platform-wide,
   shared, versioned, and immutable; customer lifecycle state is separate and scoped.
4. **Independent Operating Systems:** A Marketplace Asset can enhance an OS but cannot be
   required for its core workflow unless the asset is part of that OS's already-approved core.
5. **No parallel truth:** An Asset cannot become an alternate owner of Core or OS facts.
6. **Trust must be earned:** Review, validation, provenance, compatibility, and declared
   Permissions are part of the problem space.
7. **Activation is not authorization:** Installing or activating an Asset does not grant its
   required Permissions automatically.
8. **Version history is preserved:** Updating selects a new immutable version; it does not
   rewrite an earlier published version.
9. **Human control remains effective:** Consequential acquisition, activation, configuration,
   or target action remains governed and authorized.
10. **Discovery is not approval:** Candidate groupings in this document are questions for later
    phases, not architecture.

## 6. Platform Ecosystem

Marketplace sits inside the larger Nexoraxs ecosystem described by Genesis:

```text
Business context and Business DNA
  -> Knowledge and deterministic Rules
  -> Business Brain Decision
  -> Recommendation
  -> Implementation Option mapping
  -> Product Hub journey
  -> Marketplace discovery where applicable
  -> authorized Workspace acquisition and installation
  -> authorized Workspace or Business applicability
  -> target Platform or Operating System use
```

This is an exploratory relationship flow, not an approved Marketplace internal design.

The ecosystem includes:

- customers operating through Workspaces, Businesses, Business Units, Departments, and Branches;
- Core Platform control, intelligence, commercial, shared-service, and Product Hub concerns;
- independent Operating Systems;
- Business DNA, Knowledge, Rules, Capabilities, Decisions, Recommendations, Implementation
  Options, and Configuration Proposals;
- Marketplace Assets and scoped Marketplace state;
- AI Coordinator and the AI Expert Network;
- Nexoraxs, partners, developers, consultants, business experts, and training providers; and
- future country, industry, enterprise, and global participation.

Discovery must determine how Marketplace connects these participants without absorbing their
canonical responsibilities.

## 7. Marketplace Actors

The following are actors or actor roles visible in the problem space. Their exact identity,
authorization, relationship, and lifecycle models are unresolved.

| Actor or role | Discovery interest | Boundary to preserve |
|---|---|---|
| Workspace customer | Discovers, evaluates, acquires, installs, activates, updates, and removes Assets | Workspace state does not own shared Asset content |
| Business stakeholder | Evaluates Business applicability and business value | Business Applicability does not create a Business-owned Asset copy |
| Authorized administrator | Performs consequential Marketplace actions | Authentication and role title do not imply authorization |
| Asset consumer | Uses an active applicable Asset in an approved context | Consumption cannot bypass target-owner validation |
| Nexoraxs publisher | May produce official Assets | Official status does not remove review, version, Security, or history needs |
| Certified Partner | May participate under future certification and commercial policy | Certification model remains unresolved |
| Independent Developer | May submit technical Assets under future policy | Developer identity and executable-code isolation remain unresolved |
| Consulting Company | May publish approved business assets or services | Service versus reusable Asset boundary remains unresolved |
| Business Expert | May contribute Knowledge or advisory Assets | Expert content cannot bypass Knowledge or AI ownership rules |
| Training Provider | May offer approved training-related value | Training service versus Marketplace Asset classification remains unresolved |
| Reviewer | Evaluates one or more quality concerns | Review authority, independence, and conflict rules remain unresolved |
| Certifier | May attest to approved quality or compatibility | Certification meaning, expiry, and revocation remain unresolved |
| Marketplace administrator | May govern shared Marketplace lifecycle under future policy | Administrative authority must not rewrite published history |
| Product Hub | Presents eligible Marketplace discovery and scoped state | Product Hub remains a composer and non-owner |
| Business Brain | Produces completed Decisions and candidate reasoning | Business Brain does not create Marketplace state |
| Recommendation Engine | Owns Recommendations | Marketplace discovery must not become Recommendation ownership |
| Configuration Engine | Owns Configuration Proposals | Marketplace installation cannot become target configuration authority |
| AI Coordinator | Coordinates AI participation and AI Experts | Marketplace does not coordinate customer-facing AI responses |
| Operating System | Consumes eligible Assets through its own owner boundary | Marketplace cannot own OS operational facts |
| Core shared service | Supplies identity, billing, Audit, Notification, Search, Analytics, and other shared concerns | Marketplace consumes rather than duplicates shared services |

Whether these roles map to separate actors, organizations, principals, memberships, or
responsibility assignments is an open question.

## 8. Marketplace Assets

A Marketplace Asset is a platform asset distributed through Marketplace. Frozen predecessors
already require published Marketplace Asset Versions to be shared, immutable, versioned, and
preserved.

Genesis identifies descriptive concerns such as:

- identity;
- name and description;
- category;
- version;
- developer, publisher, and owner references;
- supported countries, Operating Systems, and Plans;
- dependencies;
- Pricing and License information;
- documentation and release notes;
- AI support;
- required Permissions;
- review, certification, and status; and
- provenance and compatibility.

Discovery does not approve an Asset model or required-field set. It must determine which
concerns are universal, category-specific, version-specific, publisher-specific, commercial,
derived, or externally owned.

The distinction between an Asset identity and an immutable Asset Version is foundational.
Customer Purchase, Installation, Activation, version selection, and Applicability are separate
scoped states and never copies of the Asset.

## 9. Asset Categories

The source set names the following existing or potential Marketplace categories:

| Category or category question | Source basis | Discovery issue |
|---|---|---|
| Operating Systems | Genesis Marketplace | Relationship to Core OS Product, Plan, Subscription, Installation, Activation, and Product Hub |
| Extensions | Genesis Marketplace | Whether Extension is an umbrella category or a specific Asset kind |
| Knowledge Packs | Genesis Marketplace and Knowledge Packs | Dual relationship to Marketplace distribution and Knowledge Engine content ownership |
| Capability Packs | Genesis Ontology | Meaning and relationship to Capability Registry remain unresolved |
| AI Experts | Genesis Marketplace and AI Expert Network | Definition publication versus AI Coordinator runtime ownership |
| Automation Packs | Genesis Marketplace | Relationship to Automations, Workflow Packs, target configuration, and OS owner rules |
| Workflow Packs | Genesis Marketplace | Whether workflow content is Knowledge, configuration, extension behavior, or a composition |
| Dashboard Packs | Genesis Marketplace | Relationship to Reports, Analytics, and OS-owned projections |
| Templates | Genesis Marketplace | Difference among document, communication, workflow, and configuration templates |
| Themes | Genesis Marketplace | Presentation-only boundary and compatibility needs |
| Industry Solutions | Genesis Platform Ecosystem | Whether this is a bundle, category, Implementation Option, or presentation concept |
| Connectors and integrations | Named as Extension examples and by milestone scope | Whether they are Extensions, a separate category, or a technical subtype |
| Reports | Required relationship for this milestone | Relationship to Dashboard Packs, report definitions, and canonical source ownership |
| Training or consulting offerings | Genesis partner ecosystem | Whether services are Marketplace Assets or a separate ecosystem offering |

No final category taxonomy is approved here. The Proposal must avoid synonyms and determine
whether each item is a category, subtype, bundle, metadata classification, or non-Asset offering.

## 10. Asset Lifecycle

Genesis names the shared-asset lifecycle:

```text
Draft
  -> Review
  -> Approved
  -> Published
  -> New Version Published
  -> Deprecated
  -> Archived
```

It separately names customer-scoped states:

```text
Purchased by Workspace
  -> Installed in Workspace
  -> Activated in Workspace
  -> Applicable to Workspace or selected Business
```

Discovery must understand, without deciding:

- which states apply to Asset identity versus Asset Version;
- who may request, approve, publish, deprecate, or archive;
- whether Review and certification are states, evidence, gates, or parallel lifecycles;
- how rejection, withdrawal, suspension, remediation, republishing, and emergency restriction are
  represented;
- how shared-asset state affects existing scoped state;
- how scoped Purchase, Installation, Activation, version selection, and Applicability remain
  separate;
- how update, removal, rollback, and recovery relate to immutable history; and
- how category-specific lifecycle differences are expressed without fragmenting Marketplace.

No additional lifecycle state is approved by this Discovery.

## 11. Asset Discovery

Asset discovery must explore how an authorized customer can understand:

- what business problem or Capability an Asset addresses;
- why it is relevant to the current Business context;
- whether it is available, supported, trustworthy, and compatible;
- which countries, Operating Systems, Plans, Modules, versions, and scopes it supports;
- what it costs and which License applies;
- what Permissions and data access it requires;
- what dependencies or conflicts exist;
- what installation, configuration, or operational effects may follow;
- what publisher, review, certification, release, and support evidence exists; and
- whether the Asset is already purchased, installed, active, applicable, update-eligible,
  deprecated, or otherwise constrained for the current Workspace and Business.

Discovery must distinguish general catalog discovery, Product Hub composition, Recommendation
presentation, Search results, Business-context relevance, and customer-scoped lifecycle views.
It does not approve ranking, filtering, personalization, or presentation behavior.

## 12. Asset Installation

Frozen predecessors describe installation as automatic, safe, reversible, versioned, auditable,
and Workspace-scoped. Discovery must explore what those qualities mean across very different
Asset categories.

Problem areas include:

- prerequisites and eligibility before installation;
- Purchase, Entitlement, Plan, country, OS, Module, Permission, and compatibility checks;
- dependency handling;
- exact immutable version selection;
- installation intent versus completed installation;
- target Platform or OS validation;
- long-running, partial, failed, interrupted, or uncertain installation;
- customer cancellation and retry;
- recovery and reversal without rewriting the Asset;
- evidence, Audit, Notification, and operational visibility;
- category-specific installation meaning; and
- distinction among distribution, installation, configuration, activation, and Applicability.

No installation state model or mechanism is approved.

## 13. Asset Activation

Activation is separate from Purchase, Installation, configuration, Permission assignment, and
Applicability. Discovery must determine the questions required to preserve those distinctions.

Relevant concerns include:

- who may activate or deactivate;
- which Workspace, Business, Business Unit, Department, Branch, OS, Module, or Resource context
  is applicable for each category;
- whether every Asset category uses Activation;
- whether Activation is possible before category-specific setup or configuration;
- how required Permissions are declared and separately assigned;
- how activation interacts with License, Entitlement, dependencies, compatibility, and Asset
  status;
- how a target owner accepts or rejects activation effects;
- how deactivation affects history, configuration, dependencies, and operational continuity; and
- how active but non-applicable state differs from applicable state.

Activation never grants Permission automatically under the frozen baseline.

## 14. Asset Upgrade

Updating selects a new immutable Marketplace Asset Version. It never mutates an earlier
published version.

Discovery must explore:

- upgrade eligibility and availability;
- automatic, recommended, scheduled, or customer-approved upgrade possibilities;
- compatibility across current Asset, dependency, Platform, OS, Plan, and target versions;
- configuration preservation and migration questions;
- preview, validation, and customer-impact explanation;
- in-progress, partial, failed, or uncertain upgrades;
- rollback or selection of a prior supported immutable version;
- security-critical update treatment;
- deprecation and end-of-support interaction;
- multi-Business and multi-target sequencing;
- dependency-chain upgrade coordination; and
- Audit, Notification, support, and recovery needs.

No upgrade, rollback, or migration policy is approved.

## 15. Asset Compatibility

Compatibility must potentially consider:

- Core Platform architecture and supported platform versions;
- applicable Operating System and OS version;
- Plan, Entitlement, Module, and feature eligibility;
- country, jurisdiction, language, and localization requirements;
- Workspace and Business context;
- dependency and conflict versions;
- required Capabilities, Knowledge, configuration, Permissions, or target state;
- data and privacy requirements;
- publisher certification and support status;
- immutable Asset Version and release status; and
- whether compatibility is declared, validated, inferred, certified, observed, or composed.

The Proposal must determine the boundary among publisher declarations, Marketplace validation,
target-owner validation, certification, and customer responsibility. Discovery does not approve
a compatibility model, rule language, matrix, or decision owner beyond frozen predecessor
constraints.

## 16. Asset Dependencies

Dependencies may exist among Marketplace Assets or between an Asset and Core Platform,
Operating Systems, Modules, Plans, Capabilities, Knowledge, Permissions, or external services.

Discovery must explore:

- required versus optional dependencies;
- version ranges versus exact immutable versions;
- direct versus transitive dependencies;
- conflicts, cycles, replacements, and mutually exclusive Assets;
- dependency acquisition, installation, activation, and Applicability;
- dependency Permission and License implications;
- partial dependency failure;
- upgrade and deprecation propagation;
- removal and orphaning effects;
- customer explanation and consent;
- target-owner validation; and
- whether different Asset categories require different dependency semantics.

No dependency resolution policy is approved.

## 17. Asset Versioning

The frozen baseline requires published Marketplace Asset Versions to be immutable and preserved.
Discovery must distinguish:

- Asset identity from Asset Version identity;
- Draft content from published immutable content;
- version label from compatibility meaning;
- release notes from canonical version content;
- correction before publication from a new version after publication;
- deprecation or archive from deletion;
- currently selected Workspace version from latest published version;
- version history from customer installation history;
- publisher support status from Marketplace shared lifecycle; and
- Asset Version from dependency, License, certification, or documentation versions.

The version format, ordering, branching, pre-release policy, support window, and compatibility
semantics remain open.

## 18. Asset Licensing

Licensing discovery must consider:

- Free Assets, Paid Assets, Subscriptions, one-time purchases, and usage-based Pricing;
- official versus partner-supplied License terms;
- Workspace License scope and possible Business Applicability;
- user, Business, Business Unit, Branch, usage, country, Plan, or feature limits;
- License versions and acceptance evidence;
- trial, renewal, expiry, cancellation, suspension, and termination;
- upgrade, downgrade, and version-selection effects;
- dependency License interaction;
- redistribution and sublicensing restrictions;
- publisher and customer obligations;
- support and maintenance rights;
- tax, invoicing, settlement, refund, dispute, and revenue-sharing relationships; and
- whether License is Asset-level, version-level, offer-level, or agreement-level.

No commercial, legal, billing, settlement, or License model is approved.

## 19. Asset Entitlements

Marketplace Entitlement must remain distinct from visibility, Purchase, License, Installation,
Activation, Applicability, Permission, and target authorization.

Discovery must explore:

- how Entitlement is obtained, proven, renewed, suspended, revoked, and expired;
- whether Entitlement is Workspace-scoped for every Asset category;
- how Plan, billing, trial, promotion, bundle, partner, or official grants influence Entitlement;
- how a specific Asset Version is selected under Entitlement;
- how Entitlement affects updates, support, and continued use;
- how dependencies acquire or require Entitlement;
- how a Business becomes applicable without owning the Entitlement;
- how entitlement changes affect already installed or active Assets; and
- how Marketplace Entitlement relates to Core Workspace Entitlement and OS Subscription without
  conflation.

No Entitlement lifecycle or commercial rule is approved.

## 20. Asset Distribution

Distribution concerns the governed availability of an approved immutable Asset Version to
authorized customers and targets. It is distinct from discovery, Purchase, Installation,
Activation, and execution.

Discovery areas include:

- country, region, jurisdiction, customer, Plan, OS, and publisher distribution constraints;
- public, private, limited, preview, staged, or official availability possibilities;
- withdrawal, suspension, deprecation, archive, and emergency restriction;
- integrity and provenance verification;
- distribution of content, metadata, documentation, dependencies, and release information;
- availability to existing versus new customers;
- category-specific distribution meaning;
- partner or publisher release control versus Marketplace governance;
- customer notification and impact; and
- historical reproducibility after distribution changes.

No channel, packaging, delivery, or physical distribution mechanism is approved.

## 21. Asset Validation

Genesis expects Technical, Security, Business, UX, Performance, and Compatibility Review.
Discovery must determine whether these are universal validation dimensions, category-dependent
review types, certification inputs, or policy examples.

Validation problem areas include:

- submission completeness;
- publisher identity and provenance;
- content integrity;
- business value and Capability alignment;
- Security, privacy, Permission, and data-access declarations;
- compatibility and dependency claims;
- quality, usability, localization, accessibility, and documentation;
- operational safety, failure isolation, and support readiness;
- licensing and commercial compliance;
- category-specific requirements;
- repeat validation for a new version;
- evidence expiry and revalidation;
- human, automated, partner, or external evidence;
- rejection, remediation, appeal, and escalation; and
- target-owner validation that remains necessary after Marketplace validation.

No validation criteria, score, gate, reviewer role, or approval authority is approved.

## 22. Asset Certification

Certification may represent an attestation about publisher, Asset, Asset Version, compatibility,
country suitability, Security, quality, support, or another approved concern. The meaning is not
yet defined.

Discovery must explore:

- what can be certified;
- who can certify;
- required evidence;
- certification levels or labels, if any;
- validity period, scope, conditions, renewal, suspension, and revocation;
- relationship to Review, Approval, publication, and continued listing;
- whether certification is mandatory or category-specific;
- conflict of interest and reviewer independence;
- external certification recognition;
- customer-facing explanation;
- liability and reliance boundaries; and
- how certification changes affect existing scoped state.

No certification program or certification status is approved.

## 23. Asset Trust

Trust is broader than a single review or badge. Discovery must explore how customers understand:

- publisher identity and provenance;
- official, partner, independent, or other participation context;
- Review and certification evidence;
- required Permissions and data access;
- compatibility and dependency claims;
- version history, update cadence, deprecation, and support;
- incident, vulnerability, or policy history where authorized;
- customer adoption, usage, feedback, and outcome evidence;
- documentation, support, and operational readiness;
- Business relevance and explainability; and
- what Marketplace does and does not guarantee.

Trust signals must not become hidden authorization, Recommendation ownership, or an unsupported
claim. No reputation, rating, review, trust score, badge, or ranking model is approved.

## 24. Asset Governance

Asset Governance discovery includes:

- publisher eligibility and accountability;
- submission, Review, Approval, publication, update, deprecation, and archive policy;
- immutable history and provenance;
- category and metadata governance;
- required Permissions and least privilege;
- compatibility and dependency declarations;
- License, commercial, and country policy;
- certification and trust evidence;
- policy violation, suspension, appeal, remediation, and emergency action;
- administrative access and separation of duties;
- Audit and evidentiary requirements;
- customer and publisher communication;
- change control and backward compatibility; and
- relationship to accepted Governance ADRs and future Marketplace ADRs.

This Discovery does not approve a governance body, workflow, policy, or authority assignment.

## 25. Marketplace Search

Marketplace Search must be explored as a Marketplace discovery concern that participates in the
Core Search boundary without duplicating the Core-owned Search Index.

Questions include:

- searchable asset, version, publisher, category, Capability, country, OS, Plan, License,
  compatibility, trust, and scoped-state information;
- tenant and Business context filtering;
- lifecycle and publication visibility;
- installed, active, applicable, update, and deprecation status;
- language, localization, synonyms, and canonical terminology;
- relevance, sorting, filtering, and explainability;
- sensitive or restricted listings;
- stale, incomplete, or unavailable Search state;
- Search projection ownership versus Marketplace source ownership; and
- relationship to Product Hub Search and OS-specific discovery.

No Search model, index, ranking method, filter syntax, or physical interface is approved.

## 26. Marketplace Recommendations

Recommendation Engine owns Recommendation. Business Brain identifies business improvements and
Capability needs before implementation options are mapped. Marketplace must not duplicate either
responsibility.

Discovery must explore:

- how Marketplace Assets become eligible Implementation Options;
- how Business DNA, Business Stage, goals, country, OS context, usage, and Analytics may inform
  relevance through their existing owners;
- how an accepted or presented Recommendation reaches Marketplace discovery;
- how compatibility, Entitlement, License, availability, and scoped state constrain presentation;
- how Marketplace explains why an Asset is shown without becoming the Recommendation owner;
- how customer choice, dismissal, acquisition, activation, and outcome feedback are recorded by
  their appropriate owners;
- how Marketplace avoids pay-to-rank distortion of governed business recommendations; and
- how non-recommended discovery remains possible without weakening explainability.

No Recommendation algorithm, ranking, sponsorship, feedback, or conversion model is approved.

## 27. Marketplace Intelligence

Marketplace Intelligence is an exploratory concern, not an approved engine or owner. It may
describe Marketplace participation in existing Business Brain, Recommendation Engine,
Implementation Option mapping, Analytics, Search, and AI Coordinator flows.

Discovery questions include:

- which Marketplace facts may inform Business Brain or Recommendation Engine;
- how Asset compatibility and availability constrain Implementation Options;
- how acquisition, Installation, Activation, Applicability, adoption, update, failure, and
  removal outcomes may become governed feedback;
- how Marketplace catalog intelligence remains distinct from Business Decision formation;
- whether AI may explain Marketplace information only after a completed Decision;
- how AI Expert Assets relate to AI Coordinator selection;
- how sensitive publisher, customer, and commercial information is minimized; and
- how learning avoids direct mutation of Assets, Business DNA, Knowledge, Rules, Decisions, or
  Recommendations.

No Marketplace intelligence component, model, Decision, Recommendation, learning, or AI
responsibility is approved.

## 28. Marketplace Analytics

Marketplace Analytics discovery must distinguish Marketplace-owned source facts from Core-owned
Analytics projections.

Potential analytical concerns include:

- discovery and Search behavior;
- listing visibility and relevance;
- acquisition and commercial outcomes;
- Installation, Activation, Applicability, update, deactivation, and removal outcomes;
- compatibility and dependency failures;
- Review, validation, certification, and publication throughput;
- version adoption and deprecation impact;
- customer, Business, country, OS, and category patterns;
- publisher quality, support, and operational performance;
- Marketplace value and business-outcome evidence;
- privacy-preserving and anonymous ecosystem learning; and
- data freshness, completeness, definitions, access, and source traceability.

No metric, KPI, report, score, dashboard, projection, retention, or learning policy is approved.

## 29. Marketplace Security

Frozen Core Security requires Marketplace to remain a separate bounded context using shared Core
identity, authorization, tenant isolation, least privilege, Audit, and incident foundations.

Security discovery includes:

- publisher, reviewer, administrator, customer, service, Asset, and target identities;
- Workspace, Business, Business Unit, Department, Branch, OS, Module, Resource, Entitlement, and
  lifecycle context where applicable;
- declared required Permissions and separate authorized assignment;
- submission, Review, publication, acquisition, Installation, Activation, Applicability, update,
  deactivation, and removal authorization;
- Asset integrity, provenance, authenticity, and supply-chain risk;
- data access and minimization;
- secrets and external-provider relationships;
- executable, content-only, configuration, Knowledge, AI, Connector, and presentation Asset risk;
- sandboxing and isolation as unresolved future concerns;
- vulnerability, incident, suspension, revocation, and emergency handling;
- cross-tenant and cross-Business isolation;
- target-owner validation; and
- Security evidence, Audit, monitoring, and recovery.

No Security mechanism, Permission catalog, identity model, trust tier, sandbox, or incident policy
is approved.

## 30. Marketplace Privacy

Privacy discovery includes:

- data needed for discovery, acquisition, Installation, Activation, Applicability, support,
  Analytics, Recommendation participation, and operations;
- publisher and developer personal or organizational information;
- customer, Workspace, Business, usage, outcome, and commercial information;
- Asset-required data access and declared purpose;
- country, residency, consent, minimization, masking, retention, erasure, export, and legal hold;
- Review, certification, trust, incident, and enforcement evidence;
- AI Expert, Knowledge Pack, Connector, Automation Pack, and Analytics-specific sensitivity;
- data shared with publishers, partners, external services, or other Operating Systems;
- derived projections and anonymous ecosystem learning; and
- preservation of immutable Asset and Audit history under privacy obligations.

No classification, consent, retention, residency, disclosure, or erasure policy is approved.

## 31. Marketplace Audit

Core Audit Service owns append-only Audit Records. Marketplace source facts and actions may
participate in that shared Audit model without transferring Marketplace fact ownership.

Audit discovery must consider consequential:

- publisher and participant onboarding;
- submission and Asset changes before publication;
- Review, validation, certification, Approval, publication, deprecation, and archive;
- License, Pricing, acquisition, Entitlement, and commercial changes;
- Installation, Activation, Applicability, version selection, update, deactivation, removal, and
  recovery;
- Permission and data-access declarations;
- compatibility and dependency decisions;
- administrative, support, policy, suspension, and emergency actions;
- customer approvals and consequential target effects; and
- Analytics, Recommendation, AI, and cross-OS boundary participation.

Discovery must determine minimum evidence, correlation, provenance, access, and retention needs
without defining an Audit record or mechanism.

## 32. Marketplace Operations

Operational discovery includes:

- Marketplace catalog availability and data quality;
- Review and publication throughput;
- distribution availability and integrity;
- Installation, Activation, update, deactivation, removal, and recovery outcomes;
- compatibility and dependency evaluation quality;
- commercial, Entitlement, and License synchronization;
- publisher and customer support;
- incident, vulnerability, abuse, policy, and emergency response;
- long-running, partial, failed, uncertain, and reconciled work;
- optional dependency isolation;
- observability, health, alerting, support, service objectives, capacity, continuity, and
  disaster recovery;
- historical reproducibility and version availability;
- global, country, language, currency, and jurisdiction operations; and
- evolution from official Assets to approved partner and developer participation.

No operational target, runbook, recovery objective, support policy, staffing model, or physical
mechanism is approved.

## 33. Marketplace Boundaries

The following are frozen predecessor boundaries that Discovery must preserve:

- Marketplace is a bounded context within the Core Platform offering.
- Marketplace is distinct from Product Hub composition.
- Marketplace is distinct from Operating System operational ownership.
- Marketplace Asset identity, immutable versions, publisher, review, and scoped Marketplace
  lifecycle state remain within the Marketplace bounded context under Accepted ADR-027 and
  ADR-028.
- published Asset Versions are shared and immutable.
- customer Purchase, Installation, Activation, version selection, and Applicability are scoped
  and separate from Asset content.
- Marketplace activation never grants Permission automatically.
- Marketplace installation never bypasses target validation, compatibility, Permission, or
  approved human control.
- Product Hub and intelligence consumers use Marketplace projections or governed interactions
  and do not become Marketplace writers.
- Marketplace does not own Business DNA, Knowledge content, Capability definitions, Business
  Brain Decision, Recommendation, Configuration Proposal, AI coordination, Core organization
  identity, OS operational facts, or Core shared-service records.
- a Marketplace Asset cannot create parallel Platform or OS truth.

Everything inside those guardrails remains a Discovery question until approved through later
milestone phases.

## 34. Marketplace Relationship with Core Platform, Business Brain, and Operating Systems

### 34.1 Core Platform

Core Platform already provides the shared control, intelligence, commercial, Security, Audit,
Notification, Search, Analytics, navigation, and operational foundations Marketplace must use.
Marketplace is within the Core offering but remains a distinct bounded context.

Discovery must clarify future responsibility boundaries with identity, Workspace and
organization registries, billing, Product and Plan catalog, Entitlement, installation and
activation coordination, Product Hub, Configuration Engine, Search, Analytics, Notification,
Audit, and AI Coordinator without duplicating them.

### 34.2 Business Brain

Business Brain owns the completed Decision and candidate reasoning. Marketplace Assets may be
mapped as Implementation Options after business improvements and Capability needs are identified.
Business Brain may consume authorized Marketplace availability or outcome context but cannot
create Marketplace state.

The exact feedback, relevance, freshness, and availability relationship is unresolved.

### 34.3 Commerce OS

Commerce OS owns its Product, Price, Stock, Inventory Movement, Transfer, Order, POS Transaction,
Transactional Customer, Payment, Refund, tax, Commerce Document, Return, Exchange, Commercial
Adjustment, Setup, and readiness facts.

Marketplace may distribute eligible Commerce-related Assets. Commerce independently validates
any target effect. Marketplace never becomes a Commerce writer, and an optional Asset cannot be
required for Commerce Core. Commerce-specific extension Permission, compatibility, access,
failure, and removal policy remains a frozen Commerce Deferred Decision rather than a Discovery
answer here.

### 34.4 Future Operating Systems

Future Operating Systems remain independent and retain their Domain facts. Marketplace should be
capable of distributing relevant Assets without embedding one OS's assumptions into another or
creating cross-OS hard dependencies.

Discovery must understand how OS support, version compatibility, required Capabilities, Modules,
country context, target validation, and optional cross-OS Asset behavior can be represented
without deciding their implementation.

## 35. Marketplace Relationship with Asset Families

### 35.1 Knowledge Packs

Knowledge Pack is both a Marketplace-distributed Asset and a Knowledge asset. Knowledge Engine
retains Knowledge content ownership and applicability rules; Marketplace must not become a
parallel Knowledge repository. Purchase, Installation, Activation, version selection, and
Business Applicability remain scoped Marketplace concerns under frozen predecessors.

The boundary among Marketplace lifecycle, Knowledge publication, Knowledge applicability,
validation, country policy, and Business Brain consumption remains to be proposed.

### 35.2 AI Experts

AI Expert Definition may be a Core or Marketplace Asset according to publication. AI Coordinator
selects and coordinates Experts; customers do not select an Expert as a direct conversational
counterparty. Experts consume Knowledge and never own it.

Discovery must explore Expert submission, validation, compatibility, required Knowledge,
permissions, country and industry applicability, safety, evaluation, versioning, activation,
commercial state, and AI Coordinator eligibility without approving AI runtime architecture.

### 35.3 Connectors

Genesis lists payment, shipping, messaging, ERP, and other connectors as Extension examples.
Whether Connector is a separate Asset category or an Extension subtype remains open.

Discovery must consider external identity, credentials, required Permissions, data flow,
compatibility, target-owner validation, external failure, reconciliation, privacy, support,
versioning, and removal without defining a Connector mechanism.

### 35.4 Templates

Templates may apply to documents, communications, contracts, workflows, or other approved
purposes. Marketplace distribution must remain distinct from target-domain template
configuration and generated records.

Template category boundaries, localization, variables, compatibility, legal constraints,
preview, immutable version content, and target application remain open.

### 35.5 Themes

Themes are presentation Assets and must not acquire business logic, authorization, navigation
truth, accessibility policy, or canonical data ownership.

Discovery must explore compatibility, localization, accessibility, branding, target scope,
preview, versioning, override, and removal without approving a presentation architecture.

### 35.6 Automations and Automation Packs

Genesis uses **Automation Packs** as the canonical Marketplace category. The task term
**Automations** may describe behavior delivered by an Automation Pack, but whether it is a
separate governed concept is unresolved and must not be assumed as a synonym.

Discovery must explore triggers, conditions, target actions, human approval, Configuration
Proposal relationship, target-owner validation, failure, retry, Audit, compatibility,
dependencies, and removal without defining automation behavior.

### 35.7 Extensions

Extensions may integrate, configure, present, or coordinate optional platform and OS behavior.
They must declare Permissions, remain scoped, preserve target ownership, and never create
parallel truth.

The Extension umbrella, subtype taxonomy, executable-content boundary, isolation, validation,
compatibility, lifecycle, and support model remain unresolved.

### 35.8 Reports and Dashboard Packs

Genesis names Dashboard Packs; the milestone also requires exploration of Reports. Whether a
Report is an Asset, a definition within a Dashboard Pack, a template, an OS-owned projection, or
another concept is unresolved.

Marketplace distribution must never make a report or dashboard the owner of source facts. Data
source compatibility, authorization filtering, definitions, localization, freshness,
rebuildability, export, and target Analytics relationships remain open.

## 36. Risks

| ID | Discovery risk | Potential consequence |
|---|---|---|
| R-01 | Marketplace is confused with an e-commerce marketplace | Platform Asset governance is replaced by consumer-goods assumptions |
| R-02 | Marketplace is merged into Product Hub | Composition acquires source ownership and lifecycle responsibility |
| R-03 | Asset identity, Asset Version, and scoped customer state are conflated | Immutable history and tenant isolation fail |
| R-04 | Installation, Activation, Applicability, Entitlement, License, and Permission collapse into one state | Unauthorized or inconsistent use results |
| R-05 | Asset categories are approved before canonical taxonomy is resolved | Synonyms and category-specific exceptions fragment the platform |
| R-06 | Operating System listing duplicates Core OS Product and Subscription truth | Product and commercial ownership become ambiguous |
| R-07 | Knowledge Pack distribution duplicates Knowledge content ownership | Knowledge Engine and Marketplace become competing sources |
| R-08 | AI Expert listing is mistaken for AI orchestration | Marketplace bypasses AI Coordinator and Knowledge-before-AI rules |
| R-09 | Recommendation participation becomes pay-to-rank ownership | Business-first Recommendation integrity is weakened |
| R-10 | Marketplace validation is treated as target-owner authorization | Assets bypass OS or Core invariants |
| R-11 | Activation grants Permissions implicitly | Least privilege and human control fail |
| R-12 | Publisher declarations are trusted as proven compatibility | Installation or operation damages customer workflows |
| R-13 | Dependency resolution creates cycles or hidden acquisition | Customers receive unapproved Assets, cost, or access |
| R-14 | Upgrade mutates a published version | Historical reproducibility and Audit fail |
| R-15 | Deprecation or removal deletes shared history | Existing installations and evidence become unverifiable |
| R-16 | License and Entitlement are conflated | Commercial access and legal rights diverge |
| R-17 | Third-party participation starts before identity, certification, Security, and operations are governed | Ecosystem trust and platform safety are exposed |
| R-18 | Executable and content-only Assets share an undifferentiated risk model | Review and isolation are insufficient or excessively restrictive |
| R-19 | Connector credentials or customer data are overexposed | Privacy, Security, and external-provider risk increase |
| R-20 | Template, Theme, Automation Pack, Dashboard Pack, and Report boundaries overlap | Target ownership and compatibility become unclear |
| R-21 | Analytics becomes a source of Marketplace or Business truth | Derived projections override canonical facts |
| R-22 | Scoped state is copied for each Business | Shared asset ownership and version history fragment |
| R-23 | Cross-OS Assets create hard dependencies | Independent Operating System guarantees fail |
| R-24 | Country, jurisdiction, localization, tax, or legal constraints are under-modeled | Global distribution becomes unsafe or misleading |
| R-25 | Reviews, ratings, certification, and trust signals are conflated | Customers cannot understand evidence or responsibility |
| R-26 | Long-running installation or upgrade uncertainty is hidden | Duplicate actions and inconsistent scoped state result |
| R-27 | Marketplace Audit is confused with operational telemetry | Append-only evidence and diagnostics lose their boundaries |
| R-28 | Commercial settlement is designed inside Asset lifecycle | Billing, revenue, tax, License, and Marketplace responsibilities blur |
| R-29 | Official Assets bypass normal history or governance | Platform trust becomes inconsistent |
| R-30 | Discovery attempts to solve deferred architecture prematurely | Proposal starts from unapproved decisions |

These are Discovery risks, not approved risk ratings or mitigations.

## 37. Open Questions

### 37.1 Purpose, category, and asset identity

1. What exact business problem makes an item eligible to become a Marketplace Asset?
2. Which concerns belong to Asset identity and which belong to an immutable Asset Version?
3. Which Asset information is universal and which is category-specific?
4. What is the canonical category taxonomy across Operating Systems, Extensions, Knowledge
   Packs, Capability Packs, AI Experts, Automation Packs, Workflow Packs, Dashboard Packs,
   Templates, Themes, Connectors, Reports, Industry Solutions, training, and consulting?
5. Is Extension an umbrella, an Asset category, or both under different classifications?
6. Is Connector a separate Asset category or an Extension subtype?
7. Is Report a Marketplace Asset, a Dashboard Pack element, a template, or a target-owned
   projection definition?
8. Are services such as training and consulting Marketplace Assets or separate ecosystem
   offerings?

### 37.2 Actors, publishers, and participation

9. What canonical concepts represent publisher, developer, partner, reviewer, certifier, and
   Marketplace administrator?
10. How does a publisher relate to a Core User, Workspace, Business, partner organization, or
    external legal entity?
11. Which actor may submit each Asset category?
12. Which actor may Review, approve, certify, publish, suspend, deprecate, or archive?
13. How are separation of duties and reviewer conflicts handled?
14. What distinguishes official, certified-partner, independent-developer, expert, and other
    publisher participation?
15. What onboarding, verification, agreement, and ongoing eligibility apply to publishers?
16. When may third-party participation begin without violating frozen deferred constraints?

### 37.3 Shared Asset lifecycle and versioning

17. Does the named Draft-to-Archived lifecycle apply to Asset identity, Asset Version, or both?
18. How are rejected, withdrawn, suspended, remediating, or emergency-restricted states
    represented, if required?
19. Is Review one lifecycle state or a set of parallel evidence and gates?
20. How does certification relate to Approval and publication?
21. What version scheme and compatibility meaning apply across different Asset categories?
22. How are pre-release, preview, staged, or limited versions represented, if allowed?
23. What may change before publication, and what requires a new immutable version after
    publication?
24. How are deprecation, end of support, archive, and historical availability distinguished?

### 37.4 Scoped acquisition, Installation, Activation, and Applicability

25. What is the exact distinction among acquisition, Purchase, Entitlement, License,
    distribution, Installation, configuration, Activation, version selection, and Applicability?
26. Does every Asset category require each scoped state?
27. Which scoped states are always Workspace-owned, and which may reference a selected Business?
28. Can Applicability target Business Unit, Department, Branch, OS, Module, or Resource, or only
    Workspace and Business under the frozen ontology?
29. What are the prerequisites for Installation and Activation by category?
30. How are long-running, partial, failed, interrupted, cancelled, or uncertain operations
    represented?
31. How does deactivation differ from removal, uninstallation, License expiry, Entitlement loss,
    or non-applicability?
32. How are scoped history and current state preserved without copying shared Asset content?

### 37.5 Compatibility and dependencies

33. Who declares compatibility, who validates it, who certifies it, and who performs final
    target-owner validation?
34. Which Platform, OS, Plan, Module, country, Permission, Capability, configuration, and target
    versions may participate in compatibility?
35. How is compatibility represented across immutable Asset Versions?
36. How are required, optional, conflicting, replaced, and transitive dependencies distinguished?
37. Are dependency version ranges permitted, or must selected dependencies resolve to exact
    immutable versions?
38. How are dependency cycles and incompatible combinations prevented or explained?
39. Can dependency acquisition or activation ever be automatic, and what customer approval is
    required?
40. How do dependency update, deprecation, suspension, License, Entitlement, and removal affect
    dependents?

### 37.6 Upgrade, rollback, and removal

41. Who chooses an upgraded immutable Asset Version?
42. Which updates may be optional, recommended, scheduled, mandatory, or security-critical?
43. How are target configuration and customer overrides preserved or migrated?
44. What validation is required before and after upgrade?
45. Under what conditions may a Workspace select a prior supported version?
46. How are partial multi-Business or multi-target upgrades represented and recovered?
47. What happens when a selected version is deprecated, suspended, archived, or no longer
    supported?
48. What scoped state, configuration, data, dependencies, and history remain after removal?

### 37.7 Licensing, Pricing, billing, and Entitlement

49. Is License defined per Asset, Asset Version, offer, publisher, Workspace agreement, or a
    composition of these?
50. How do Free, Paid, Subscription, one-time, usage-based, trial, bundle, and promotional models
    relate to Marketplace Entitlement?
51. Which limits may be Workspace-, Business-, user-, Branch-, usage-, country-, Plan-, or
    feature-scoped?
52. How are License acceptance, version, renewal, expiry, cancellation, suspension, and
    termination evidenced?
53. How do Core billing, Marketplace Pricing, settlement, tax, invoice, refund, dispute, and
    partner revenue-sharing responsibilities remain separate?
54. What continued-use and update rights remain after Entitlement or License change?
55. How do dependencies affect Pricing, License, Purchase, and Entitlement?
56. How are commercial state and target operational state reconciled without joint ownership?

### 37.8 Review, certification, trust, and governance

57. Which validation dimensions are universal and which are category-specific?
58. What evidence is required for Technical, Security, Business, UX, Performance, and
    Compatibility Review?
59. What is certification, what may be certified, and who may certify it?
60. How do certification scope, expiry, renewal, suspension, and revocation work?
61. What trust signals may customers see, and what does each signal guarantee or not guarantee?
62. Are customer ratings or reviews part of Marketplace, and how are manipulation, privacy, and
    relevance governed?
63. How are policy violation, remediation, appeal, emergency restriction, and reinstatement
    handled?
64. Which Marketplace decisions require human approval or stronger separation of duties?

### 37.9 Discovery, Recommendation, Search, and intelligence

65. How does an Asset become an eligible Implementation Option without becoming a Recommendation?
66. Which Marketplace facts may Business Brain, Recommendation Engine, Product Hub, or AI
    Coordinator consume?
67. How is Business-context relevance explained without Marketplace owning the Business Decision?
68. How are compatibility, availability, License, Entitlement, and scoped state applied to
    Recommendation presentation?
69. How do general discovery, Search, Recommendation presentation, sponsored visibility, and
    customer choice remain distinct?
70. How does Marketplace Search participate in Core Search without owning the Search Index?
71. Which Marketplace outcomes may become governed feedback, and which owner interprets them?
72. How are AI Expert discovery and eligibility separated from AI Coordinator expert selection?

### 37.10 Security, privacy, Audit, operations, and global scale

73. What Permission catalog and authorization scopes are required for each Marketplace action?
74. How are required Asset Permissions declared, reviewed, assigned separately, changed, and
    revoked?
75. Which Asset categories can access customer data, secrets, external providers, or executable
    behavior, and what different risk treatment is required?
76. What sandbox, isolation, testing, and supply-chain controls are required before third-party
    executable participation?
77. What data classification, consent, residency, retention, erasure, export, disclosure, and
    legal-hold policy applies?
78. Which actions require append-only Audit evidence, and what minimum evidence is sufficient?
79. What health, service objectives, recovery objectives, support, incident, vulnerability,
    continuity, and escalation policies are required?
80. How do country, jurisdiction, language, localization, currency, tax, License, certification,
    distribution, privacy, and support rules scale to the Global Platform?

**Open Question count: 80**

None of these questions is answered by this Discovery.

## 38. Candidate Capabilities

The following are candidate logical Capabilities for Capability Map exploration. They are not
approved, are not components, and do not assign ownership.

| ID | Candidate Capability | Candidate problem responsibility | Status |
|---|---|---|---|
| MC-01 | Marketplace Asset Intake | Understand submission and initial Asset information needs | Candidate only |
| MC-02 | Marketplace Catalog Management | Understand shared Asset identity, category, metadata, and provenance | Candidate only |
| MC-03 | Marketplace Asset Version Management | Understand Draft and immutable published version history | Candidate only |
| MC-04 | Marketplace Review and Validation | Understand quality evidence, review dimensions, remediation, and approval questions | Candidate only |
| MC-05 | Marketplace Certification | Understand attestations, scope, validity, renewal, and revocation questions | Candidate only |
| MC-06 | Marketplace Trust and Provenance | Understand publisher, evidence, history, required Permission, and customer trust information | Candidate only |
| MC-07 | Marketplace Discovery and Search Participation | Understand catalog discovery and Core Search participation | Candidate only |
| MC-08 | Marketplace Recommendation and Intelligence Participation | Understand Implementation Option, Recommendation, feedback, Analytics, and AI relationships | Candidate only |
| MC-09 | Marketplace Compatibility Evaluation | Understand declared, validated, certified, and target-checked compatibility | Candidate only |
| MC-10 | Marketplace Dependency Understanding | Understand dependency, conflict, cycle, version, and customer-impact problems | Candidate only |
| MC-11 | Marketplace Licensing | Understand License terms, acceptance, limits, renewal, and continued-use questions | Candidate only |
| MC-12 | Marketplace Pricing and Commercial Participation | Understand Free, Paid, Subscription, one-time, usage, billing, and partner commercial boundaries | Candidate only |
| MC-13 | Marketplace Acquisition | Understand customer selection and Purchase questions | Candidate only |
| MC-14 | Marketplace Entitlement | Understand Workspace entitlement, renewal, suspension, expiry, and dependency questions | Candidate only |
| MC-15 | Marketplace Distribution | Understand governed version availability and restriction questions | Candidate only |
| MC-16 | Marketplace Installation | Understand eligibility, version selection, long-running work, reversal, and recovery questions | Candidate only |
| MC-17 | Marketplace Activation and Applicability | Understand Activation, deactivation, scope, Permission, and target-validation questions | Candidate only |
| MC-18 | Marketplace Upgrade and Removal | Understand new-version selection, migration, rollback, deprecation, removal, and history questions | Candidate only |
| MC-19 | Marketplace Shared Lifecycle Management | Understand Draft through Archived shared-asset lifecycle questions | Candidate only |
| MC-20 | Marketplace Security and Privacy Participation | Understand shared Core Security, tenant, Permission, data, Asset, and publisher risk questions | Candidate only |
| MC-21 | Marketplace Audit and Governance Participation | Understand Audit evidence, policy, administration, enforcement, and change-control questions | Candidate only |
| MC-22 | Marketplace Analytics Participation | Understand governed operational and business-value projection questions | Candidate only |
| MC-23 | Marketplace Publisher and Partner Participation | Understand publisher identity, eligibility, certification, support, and ecosystem questions | Candidate only |
| MC-24 | Marketplace Operations and Support | Understand health, support, incident, recovery, continuity, and global operations questions | Candidate only |

**Candidate Capability count: 24**

The Capability Map may merge, split, rename using canonical terminology, defer, or reject these
candidates. This Discovery approves none of them.

## 39. Candidate Domains

The following are candidate problem-space clusters for later boundary analysis. They are not
approved Domains, bounded contexts, modules, components, write models, or owners.

| ID | Candidate Domain cluster | Candidate concerns | Status |
|---|---|---|---|
| MD-01 | Marketplace Asset Catalog | Asset identity, category, descriptive information, provenance | Candidate only |
| MD-02 | Marketplace Publisher and Ecosystem Participation | Publisher, partner, developer, expert, reviewer, certifier, support relationships | Candidate only |
| MD-03 | Marketplace Asset Lifecycle and Versioning | Draft through Archived lifecycle, immutable versions, deprecation, history | Candidate only |
| MD-04 | Marketplace Review, Validation, Certification, and Trust | Evidence, quality, approval, certification, trust, policy | Candidate only |
| MD-05 | Marketplace Compatibility and Dependencies | Platform, OS, Plan, country, Permission, version, dependency, conflict | Candidate only |
| MD-06 | Marketplace Licensing and Commercial Participation | License, Pricing, offers, billing relationship, settlement relationship | Candidate only |
| MD-07 | Marketplace Acquisition and Entitlement | Purchase, entitlement, trial, renewal, suspension, continued rights | Candidate only |
| MD-08 | Marketplace Distribution | Version availability, restrictions, integrity, withdrawal, customer access | Candidate only |
| MD-09 | Marketplace Installation, Activation, Applicability, and Upgrade | Scoped state, version selection, target validation, update, removal, recovery | Candidate only |
| MD-10 | Marketplace Discovery, Search, and Intelligence Participation | discovery, Search, Product Hub, Recommendation, Implementation Option, feedback | Candidate only |
| MD-11 | Marketplace Security, Privacy, Audit, and Governance | tenant isolation, Permissions, data, evidence, administration, enforcement | Candidate only |
| MD-12 | Marketplace Operations and Analytics Participation | observability, support, incidents, continuity, value and operational projections | Candidate only |

**Candidate Domain count: 12**

These clusters intentionally expose overlap. The Proposal cannot approve them until the
Capability Map clarifies logical collaboration, responsibility flow, and external boundaries.

## 40. Proposal Readiness

### 40.1 Discovery coverage

Discovery has identified:

- the Marketplace vision, mission, scope, non-scope, and philosophy;
- the platform ecosystem and visible actors;
- Marketplace Asset, Asset Version, category, shared lifecycle, and scoped-state problem spaces;
- discovery, Search, Recommendation, intelligence, and Analytics participation;
- installation, Activation, Applicability, upgrade, compatibility, dependencies, versioning,
  licensing, Entitlement, distribution, validation, certification, trust, Governance, Security,
  privacy, Audit, and operations concerns;
- frozen relationships with Core Platform, Business Brain, Commerce OS, and future Operating
  Systems;
- special relationships with Knowledge Packs, AI Experts, Connectors, Templates, Themes,
  Automation Packs, Extensions, Reports, and Dashboard Packs;
- thirty Discovery risks;
- eighty unresolved architectural questions;
- twenty-four candidate Capabilities; and
- twelve candidate Domain clusters.

### 40.2 Readiness limits

Discovery does not yet provide:

- an approved Capability catalog;
- an approved Domain map;
- approved internal architecture;
- approved ownership, write-model, aggregate, lifecycle, Contract, Event, or projection design;
- an approved publisher, review, certification, commercial, Security, or operational model; or
- any physical implementation decision.

Those absences are expected at Discovery. The next phase must logically map candidate
Capabilities, flows, boundaries, dependencies, and questions without approving architecture.

### 40.3 Recommendation

# READY FOR CAPABILITY MAP

The Marketplace problem space is sufficiently broad, bounded by frozen predecessor guarantees,
and explicit about uncertainty to begin a logical Capability Map. The Capability Map must remain
exploratory and must not answer the eighty Open Questions or approve the twenty-four candidate
Capabilities and twelve candidate Domain clusters.

## References

### Governing and frozen baselines

- `docs/00-governance/`
- `docs/01-genesis/`
- `docs/02-core-platform/`
- `docs/03-business-brain/`
- `docs/04-commerce-os/`
- `docs/99-architecture-freeze/`

### Marketplace-specific authority

- `docs/00-governance/ADR/ADR-027-marketplace-bounded-context-within-core.md`
- `docs/00-governance/ADR/ADR-028-immutable-marketplace-assets-scoped-state.md`
- `docs/01-genesis/10-NEXORAXS-ONTOLOGY.md`
- `docs/01-genesis/17-MARKETPLACE-ARCHITECTURE.md`
- `docs/01-genesis/18-KNOWLEDGE-PACKS.md`
- `docs/01-genesis/19-AI-EXPERT-NETWORK.md`
- `docs/01-genesis/20-PLATFORM-ECOSYSTEM.md`
- `docs/02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md`
- `docs/02-core-platform/03-DOMAIN-MODEL.md`
- `docs/02-core-platform/04-DATA-OWNERSHIP.md`
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md`
- `docs/99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md`
- `docs/04-commerce-os/10-COMMERCE-OS-v1.0-FREEZE.md`
