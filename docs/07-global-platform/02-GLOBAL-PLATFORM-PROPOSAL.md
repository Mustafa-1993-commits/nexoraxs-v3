# Global Platform Architecture Proposal v0.1

**Milestone:** Global Platform  
**Artifact type:** Architecture Proposal  
**Proposal baseline:** Global Platform Discovery Baseline v0.1.1 and approved Capability Map  
**Status:** Proposed — pending independent Architecture Review  
**Architecture authority:** Proposed only; not frozen or implementation-authoritative  
**Owner:** Nexoraxs

---

## Executive Summary

Global Platform is proposed as a Core-coordinated, platform-wide logical responsibility
architecture for operating Nexoraxs across countries, languages, currencies, timezones,
jurisdictions, privacy and residency contexts, and regional operating boundaries. It extends the
frozen platform through explicit context, source-owned facts, governed applicability, localized
representation, authorized collaboration, and non-canonical projections. It is not a new tenant,
an Operating System, a global super-domain, or a canonical owner that replaces existing owners.

This Proposal approves:

- 10 **Logical Responsibility Domains** that organize global responsibilities but are not
  bounded contexts, services, deployment units, or data-ownership domains;
- all 30 Discovery capability themes as logical platform capabilities, with explicit accountable
  boundaries and non-responsibilities;
- Core coordination of global context while canonical facts remain with their frozen owners;
- Workspace as the highest tenant boundary and explicit authorization at every narrower scope;
- source-attributed global context, owner-controlled validation, and no shared global writer;
- independent Operating Systems and optional, failure-isolated cross-OS collaboration;
- localization and internationalized representation without mutating canonical values;
- projection-only global Navigation, administration, Reporting, Search, Analytics, and
  operational visibility; and
- evidence-based, backward-compatible, governed global evolution.

This Proposal does not approve canonical Region, Country, legal-entity, tax-jurisdiction,
exchange-rate, address, compliance, privacy-policy, residency-placement, cross-region grant, or
global rollout models. It approves no new canonical fact, write model, aggregate, or lifecycle.
Those subjects remain candidate-only and are tracked by 36 stable Deferred Decisions.

The controlling baseline is:

```text
00-GLOBAL-PLATFORM-DISCOVERY.md
  +
00A-GLOBAL-PLATFORM-DISCOVERY-PATCH-v0.1.1.md
  +
01-GLOBAL-PLATFORM-CAPABILITY-MAP.md
  =
Approved Global Platform pre-Proposal baseline
```

The Discovery Patch controls repository interpretation: Genesis
`20-PLATFORM-ECOSYSTEM.md` is the complete approved ecosystem authority, and no Genesis 21
artifact is required.

## Proposal Decision Language

- **Approved** means proposed architecture submitted for independent review; it becomes frozen
  authority only after the remaining milestone lifecycle gates.
- **Logical Responsibility Domain** organizes related responsibilities without creating a
  bounded context, owner, Component, service, runtime, or deployment boundary.
- **Capability** describes governed work and has an accountable boundary; it does not imply a
  Component or implementation.
- **Candidate** names a possible future architectural concept and grants it no canonical status.
- **Deferred** means the Proposal intentionally does not decide the subject.
- **Frozen owner** means the canonical owner established by Governance, Genesis, or a current
  Freeze and unchanged by this Proposal.

## 1. Architectural Mission

Enable Nexoraxs to support authorized business operation across countries and regional contexts
without fragmenting canonical truth, weakening Workspace isolation, duplicating existing owners,
hardcoding country behavior, hiding jurisdictional context, or coupling independent Operating
Systems.

Global Platform coordinates how relevant source-owned context is identified, interpreted,
presented, and supplied to the frozen owner responsible for validation, decision, configuration,
coordination, or operational action. It never turns context coordination into canonical ownership.

## 2. Architectural Scope

### 2.1 Approved scope

Global Platform scope includes:

1. explicit interpretation of global tenant, organization, geographic, legal, presentation,
   jurisdictional, privacy, residency, and operational context;
2. localized and internationalized representation across Core, Marketplace, AI, and independent
   Operating System surfaces;
3. governed applicability of source-owned Knowledge, Rules, policy, Marketplace state,
   intelligence, Configuration, and AI context;
4. authorized cross-region collaboration while preserving owner-local writes and Workspace
   isolation;
5. platform-wide participation rules for Core Platform, Business Brain, Commerce OS,
   Marketplace, AI Expert Network, and future Operating Systems;
6. context-preserving Navigation and administration under Core authorization boundaries;
7. global Reporting, Search, Analytics, and operational visibility as authorized projections;
8. preservation of privacy, residency, Audit, Security, compatibility, and provenance across
   global interactions; and
9. governed migration, rollout, recovery, scale, and future evolution principles.

### 2.2 Approved non-scope

Global Platform does not:

- create a tenant above Workspace or a country-typed Workspace;
- alter `Workspace → Business → Business Unit → Department / Branch`;
- equate Business, Business Unit, Branch, billing identity, tax registration, or legal entity;
- own or merge Business DNA;
- replace Core identity, organization, Permission, Settings, Localization, Navigation, Search,
  Audit, Observability, commercial control, Product Hub, or AI Coordinator;
- own Knowledge, Rules, Business Brain Decision, Recommendation, Configuration Proposal,
  Marketplace, AI Expert, or Operating System facts;
- become a tax engine, compliance authority, privacy authority, currency converter, accounting
  owner, translation owner for user-entered data, or universal address owner;
- make a global report, search result, dashboard, or operational signal canonical truth;
- make one Operating System depend on another for its core workflow;
- approve public, partner, developer, or cross-region access mechanisms;
- resolve inherited Core, Business Brain, Commerce OS, Marketplace, or AI Expert Network
  deferrals;
- define interfaces, APIs, Events, persistence, infrastructure, deployment, framework, runtime,
  vendor, topology, or implementation sequence; or
- authorize regulatory or legal claims.

## 3. Approved Logical Responsibility Domains

The following domains are approved only as logical responsibility groupings. Their accountable
boundary identifies who coordinates the grouped responsibility; canonical facts and target
actions retain the owners listed elsewhere in this Proposal.

| ID | Approved Logical Responsibility Domain | Purpose | Accountable coordination boundary | Source themes | Never implies |
|---|---|---|---|---|---|
| GPLRD-01 | Global Context and Tenant Interpretation | resolve which tenant, organization, geographic, legal, and purpose contexts may be relevant | Core Platform context coordination | GPCT-01–GPCT-03, GPCT-12, GPCT-18 | a new tenant, organization level, Region model, Country model, or legal-entity owner |
| GPLRD-02 | Localization and Internationalized Representation | resolve presentation context while preserving canonical values | Core Settings and Localization; each product retains its presentation surface | GPCT-04–GPCT-10 | translated canonical user data, a universal value model, or implementation framework |
| GPLRD-03 | Jurisdiction and Compliance Applicability | coordinate source, version, evidence, and target-owner validation for possible obligations | Core context coordination with Knowledge, Rules, and applicable target owner | GPCT-11, GPCT-13 | tax ownership, a compliance claim, a new Rule owner, or automatic applicability |
| GPLRD-04 | Privacy, Residency, and Isolation Applicability | coordinate purpose, classification, restriction, and fail-closed context questions | Core Security coordination; each canonical owner enforces its data boundary | GPCT-14, GPCT-15, GPCT-17 | physical placement, a second privacy authority, or a new tenant boundary |
| GPLRD-05 | Cross-Region Collaboration and Administration | preserve explicit authorization, Delegation, visible context, and owner-local action | Core Identity and Access plus Navigation coordination | GPCT-16, GPCT-27 | automatic access, shared write authority, global superuser, or tenant merging |
| GPLRD-06 | Marketplace and Operating System Global Participation | coordinate global context consumption without changing ecosystem or OS ownership | Marketplace for Marketplace participation; each OS for its own participation | GPCT-19, GPCT-20, GPCT-25 | a shared OS domain, Marketplace ownership transfer, or mandatory cross-OS dependency |
| GPLRD-07 | Intelligence, Configuration, Knowledge, and AI Global Participation | carry source-owned context through existing intelligence and AI boundaries | respective frozen intelligence owners under Core coordination | GPCT-21–GPCT-24 | copied Knowledge, AI Decision formation, Recommendation ownership, or target-writer bypass |
| GPLRD-08 | Global Navigation, Reporting, and Search | preserve current context through movement and authorized projections | Core Navigation and Search coordination; source owners retain facts | GPCT-26, GPCT-28 | one global menu, hidden scope change, or a canonical global projection |
| GPLRD-09 | Global Operational Visibility | relate global health, dependency, incident, capacity, and continuity evidence | existing Observability and Audit boundaries plus source operations | GPCT-29 | telemetry as business truth or a second Audit source |
| GPLRD-10 | Global Migration and Scale Governance | govern compatibility, history, rollout evidence, migration, and evidence-based evolution | Governance and existing owner boundaries | GPCT-30 | physical extraction, topology, rollout approval, or implementation design |

**Approved Logical Responsibility Domain count: 10**

### 3.1 Domain status invariants

1. A `GPLRD` is not a canonical data owner.
2. A `GPLRD` does not create a bounded context or change an existing one.
3. Logical responsibility may cross frozen owners only through explicitly separated
   responsibilities.
4. Canonical validation and action always return to exactly one applicable frozen owner.
5. Physical decomposition cannot be inferred from this domain map.

## 4. Approved Capabilities

All 30 Discovery themes are approved as logical capabilities. Their `GPC` identifiers distinguish
approved Proposal capabilities from the exploratory `GPCT` identifiers while retaining
one-to-one traceability.

| ID | Approved Capability | Source | Logical domain | Accountable boundary | Discovery and Map justification |
|---|---|---|---|---|---|
| GPC-01 | Global Context Interpretation | GPCT-01 | GPLRD-01 | Core context coordination | both sources require explicit context without a new canonical context owner |
| GPC-02 | Region Context | GPCT-02 | GPLRD-01 | Core context coordination | distinct Region meanings must be separated even while the model remains deferred |
| GPC-03 | Country Context | GPCT-03 | GPLRD-01 | Core context coordination | frozen milestones already consume different Country meanings that must not be conflated |
| GPC-04 | Localization Context | GPCT-04 | GPLRD-02 | Core Settings and Localization | Core already owns presentation context and must remain the single coordinator |
| GPC-05 | Internationalized Representation | GPCT-05 | GPLRD-02 | Core Settings and Localization coordination | global variation must be data-driven while each owning surface remains responsible for presenting its facts |
| GPC-06 | Language and Direction | GPCT-06 | GPLRD-02 | Core Settings and Localization | multilingual and RTL/LTR participation is already a frozen platform requirement |
| GPC-07 | Timezone Interpretation | GPCT-07 | GPLRD-02 | Core Settings and Localization coordination | local presentation and historical temporal meaning must remain distinguishable while the fact owner retains canonical time |
| GPC-08 | Currency Interpretation | GPCT-08 | GPLRD-02 | Core Settings and Localization coordination | defaults, display, transaction, settlement, and reporting concerns must remain separate while monetary owners retain values |
| GPC-09 | Number Formatting | GPCT-09 | GPLRD-02 | Core Settings and Localization | locale presentation must not mutate numeric truth |
| GPC-10 | Address Interpretation | GPCT-10 | GPLRD-02 | Core Settings and Localization coordination | varied address meanings and formats cannot justify a universal address owner; each address fact retains its owner |
| GPC-11 | Tax Jurisdiction Context | GPCT-11 | GPLRD-03 | Core Platform context coordination | Commerce, Knowledge, and Rules boundaries require context without a global tax engine; target owner validates tax action |
| GPC-12 | Legal Entity Context | GPCT-12 | GPLRD-01 | Core organization-context coordination | legal context must be distinguished from the frozen organization hierarchy |
| GPC-13 | Compliance Applicability | GPCT-13 | GPLRD-03 | Core Platform context coordination | source, version, effective period, evidence, Rules authority, and target-owner validation must stay explicit |
| GPC-14 | Data Residency Context | GPCT-14 | GPLRD-04 | Core Security coordination | frozen deferrals require conceptual applicability without physical-placement architecture; each owner retains its data |
| GPC-15 | Privacy Applicability | GPCT-15 | GPLRD-04 | Core Security coordination | privacy must constrain every global consumer without creating a second authority; each owner enforces its record boundary |
| GPC-16 | Cross-Region Collaboration | GPCT-16 | GPLRD-05 | Core Identity and Access coordination | legitimate collaboration must remain distinct from shared writes and tenant merging; target owner authorizes action |
| GPC-17 | Cross-Region Isolation | GPCT-17 | GPLRD-04 | Core Security and Identity coordination | narrower restrictions may apply while Workspace remains the highest tenant boundary |
| GPC-18 | Global Tenant Context | GPCT-18 | GPLRD-01 | Core Workspace Management | multi-country operation must preserve Workspace-first tenancy and explicit aggregation |
| GPC-19 | Marketplace Global Participation | GPCT-19 | GPLRD-06 | Marketplace bounded context | Marketplace already needs country, commercial, assurance, support, and scoped-use context |
| GPC-20 | Commerce Global Participation | GPCT-20 | GPLRD-06 | Commerce OS | multi-country Commerce questions must be handled without moving operational ownership |
| GPC-21 | Business Intelligence Global Context | GPCT-21 | GPLRD-07 | Business Brain | global input supplied by Core must preserve Business scope, deterministic Decision, and explicit aggregation |
| GPC-22 | Knowledge and Rule Global Applicability | GPCT-22 | GPLRD-07 | Core Platform shared intelligence coordination | country-aware sources and exact versions must be reused rather than copied per OS; Knowledge Engine and Rules Engine retain separate artifact ownership |
| GPC-23 | Recommendation and Configuration Global Context | GPCT-23 | GPLRD-07 | Core Platform shared intelligence coordination | context can affect each result while Recommendation Engine and Configuration Engine retain separate canonical ownership |
| GPC-24 | AI Expert Global Participation | GPCT-24 | GPLRD-07 | Core AI Coordinator | eligibility, language, privacy, and residency must remain under one Coordinator while publication-path owners retain Definition content |
| GPC-25 | Independent OS Global Participation | GPCT-25 | GPLRD-06 | each applicable Operating System | every OS must consume global context while remaining standalone and owner-controlled |
| GPC-26 | Global Navigation | GPCT-26 | GPLRD-08 | Core Navigation coordination; products retain route ownership | user movement must preserve visible context and reauthorization |
| GPC-27 | Global Administration | GPCT-27 | GPLRD-05 | Core Identity and Access coordination | enterprise oversight requires governed scope without a cross-tenant superuser |
| GPC-28 | Global Reporting and Search | GPCT-28 | GPLRD-08 | Core projection coordination | global views must remain authorized, source-attributed, rebuildable, non-canonical, and supplied by source owners |
| GPC-29 | Global Operational Visibility | GPCT-29 | GPLRD-09 | Core Observability coordination | global operation needs evidence while telemetry, append-only Audit, and business facts remain separately owned |
| GPC-30 | Global Migration and Scale | GPCT-30 | GPLRD-10 | Governance | global evolution requires affected-owner participation, compatibility, history, measured evidence, and change control |

**Approved Capability count: 30**  
**Rejected candidate Capability count: 0**

No Discovery capability theme is rejected because each identifies a necessary logical
responsibility already evidenced by the Discovery and Capability Map. Approval of a capability
does not approve its deferred model, policy detail, aggregate, lifecycle, physical form, or
implementation.

Each `GPC` has exactly one accountable boundary in the table. References to source owners, target
owners, or contributing engines describe non-overlapping validation or artifact ownership and do
not create co-ownership of the capability.

## 5. Capability Responsibilities

| Capability family | Approved responsibility |
|---|---|
| GPC-01–GPC-03, GPC-12, GPC-18 | identify active tenant and organization context; distinguish possible Region, Country, and legal meanings; retain source, scope, freshness, and uncertainty |
| GPC-04–GPC-10 | resolve presentation context; distinguish canonical values from localized representation; preserve user-entered data and owner-specific facts |
| GPC-11, GPC-13 | assemble applicable source and evidence references; route deterministic validation to Rules and the target owner; expose conflicts |
| GPC-14, GPC-15, GPC-17 | carry privacy, residency, purpose, classification, and isolation constraints to every consumer; fail closed when required context is unresolved |
| GPC-16, GPC-27 | support explicitly authorized collaboration and oversight; reauthorize current scope; preserve Delegation, separation of duties, revocation, and Audit participation |
| GPC-19, GPC-20, GPC-25 | supply source-owned context to Marketplace and OS owners; preserve each lifecycle, write model, and standalone workflow |
| GPC-21–GPC-24 | supply permission-filtered global context to intelligence, Configuration, Knowledge, Rules, Recommendation, and AI owners; preserve exact versions and decision sequencing |
| GPC-26, GPC-28 | keep context visible through Navigation and produce only authorized, source-attributed projections |
| GPC-29 | correlate operational evidence without converting it into canonical Business or Audit truth |
| GPC-30 | preserve history, compatibility, rollback evidence, migration governance, and measured extraction criteria |

## 6. Capability Non-Responsibilities

Every approved capability is prohibited from:

1. creating or rewriting a canonical fact owned elsewhere;
2. proving authorization from a client-supplied identifier;
3. translating, formatting, aggregating, or projecting data into a new source of truth;
4. selecting a legal, tax, compliance, privacy, or residency outcome without the applicable
   deterministic Rule and target-owner validation;
5. applying a Recommendation or Configuration Proposal automatically unless an already-approved
   owner policy explicitly permits it;
6. allowing AI to form, validate, amend, or supersede a Business Brain Decision;
7. transferring Marketplace or OS lifecycle ownership;
8. creating mandatory cross-OS or cross-region dependencies;
9. selecting physical data placement, infrastructure, deployment, technology, or runtime; or
10. resolving a Deferred Decision implicitly.

Specific capability prohibitions remain those documented under each `GPCT` theme in Discovery and
the `Never owns` boundaries in the Capability Map.

## 7. Approved Capability Relationships

The approved logical relationship is:

```text
GPC-01 Global Context Interpretation
  ↓ uses explicit Core authorization and source references
GPC-02 / GPC-03 / GPC-12 / GPC-18
Region, Country, legal, and tenant meanings
  ↓ inform without becoming canonical owners
GPC-04 through GPC-10
localized and internationalized representation
  ↓ constrained by
GPC-11 / GPC-13 / GPC-14 / GPC-15 / GPC-17
jurisdiction, compliance, residency, privacy, and isolation applicability
  ↓ permits only explicitly authorized participation through
GPC-16 and GPC-27
collaboration and administration
  ↓ supplies source-owned context to
GPC-19 through GPC-25
Marketplace, Commerce, intelligence, AI, and independent OS participation
  ↓ appears through
GPC-26 / GPC-28 / GPC-29
Navigation, projections, and operational evidence
  ↓ evolves only through
GPC-30 Global Migration and Scale
```

Relationship guarantees:

- the flow is logical, not runtime ordering;
- context interpretation precedes consequential use;
- every participant revalidates authorization and its own invariants;
- a downstream consumer never becomes owner of its upstream references;
- failure of optional collaboration is isolated from each OS core workflow; and
- uncertainty and conflict remain visible rather than being silently prioritized.

## 8. Approved Domain Relationships

| Upstream logical domain | Downstream or collaborating domain | Approved relationship | Boundary guarantee |
|---|---|---|---|
| GPLRD-01 | GPLRD-02–GPLRD-10 | supplies explicit, source-attributed context | no canonical global context record is approved |
| GPLRD-02 | GPLRD-06–GPLRD-09 | supplies presentation interpretation | canonical values and owner facts remain unchanged |
| GPLRD-03 | GPLRD-06 and GPLRD-07 | supplies possible obligation context and governed evidence | target owner and deterministic Rules retain final validation |
| GPLRD-04 | every logical domain | constrains permitted use, visibility, and collaboration | no physical residency or new tenant model is implied |
| GPLRD-05 | GPLRD-06–GPLRD-09 | coordinates authorized collaboration and administration | target owners retain writes and lifecycles |
| GPLRD-06 | GPLRD-08 and GPLRD-09 | contributes Marketplace and OS projections and health evidence | Marketplace and OS canonical ownership remains intact |
| GPLRD-07 | GPLRD-06 and GPLRD-08 | supplies owner-produced Decisions, Recommendations, Configuration Proposals, Knowledge, Rules, and AI outputs | no merged intelligence owner or AI decision formation |
| GPLRD-08 | users and authorized owner surfaces | presents Navigation, Reporting, and Search views | every view is a non-canonical projection |
| GPLRD-09 | GPLRD-10 and owner operations | supplies operational evidence | evidence does not become a Business fact or Audit replacement |
| GPLRD-10 | every logical domain | governs compatible evolution | no physical extraction or rollout is pre-approved |

No relationship creates circular ownership: context and evidence can be consumed in either
direction only as immutable references or non-canonical projections, while writes always return
to one owner.

## 9. Cross-Milestone Responsibilities

| Milestone or authority | Retained responsibility | Approved Global Platform responsibility toward it | Result ownership |
|---|---|---|---|
| Governance | terminology, ADRs, lifecycle, approval, versioning, review, Freeze, and change control | trace decisions and route material evolution through Governance | Governance |
| Genesis | platform mission, ontology, ecosystem, and foundational invariants | remain aligned with Genesis v1.1 and Platform Ecosystem | Genesis remains foundational authority |
| Core Platform | identity, Workspace, organization, Settings, Localization, Permission, Navigation, commercial control, Product Hub, Search, Audit, Observability, shared intelligence, and AI coordination | coordinate explicit global context by extending existing logical boundaries compatibly | applicable Core owner |
| Business Brain | deterministic, reproducible, provider-independent Decision | provide pinned, authorized, source-attributed global inputs when applicable | Business Brain owns completed Decision |
| Recommendation Engine | Recommendation identity, explanation, lifecycle, disposition, and feedback | provide context references affecting relevance and eligibility | Recommendation Engine |
| Configuration Engine | versioned Configuration Proposal | provide explicit global context; preserve target-owner validation and application | Configuration Engine owns Proposal; target owns application |
| Knowledge Engine and Rules Engine | shared versioned Knowledge and deterministic Rules | support exact source, version, applicability, conflict, and evidence selection | respective Knowledge and Rule owner |
| Commerce OS | all Commerce facts, writes, setup, readiness, reports, and lifecycles | supply source-owned global context and shared presentation constraints | Commerce OS |
| Marketplace | Assets, versions, Publisher, commercial state, assurance, Distribution, and scoped lifecycles | supply global discovery and applicability context without changing shared/scoped separation | Marketplace bounded context |
| AI Expert Network | Expert Definition publication paths, eligibility, interaction, evaluation, and collaboration boundaries | supply minimum authorized global context through one AI Coordinator | frozen AI Coordinator or publication-path owner |
| future Operating Systems | independent setup, configuration, permissions, workflows, facts, reports, and lifecycle | make global context optional, versioned, and consumable without hard dependency | each applicable OS |

## 10. Cross-Milestone Non-Responsibilities

Global Platform must never:

- move shared identity or organization identity out of Core;
- create a separate global Business, Business DNA, Workspace intelligence, Knowledge, Rule,
  Decision, Recommendation, Configuration, Marketplace, AI, or OS record;
- cause Business Brain to depend on AI for Decision completion;
- alter the mutually exclusive AI Expert Definition publication-path ownership frozen by Core,
  Marketplace, and AI Expert Network;
- permit Marketplace global availability to bypass Purchase, Entitlement, Installation,
  Activation, Applicability, compatibility, review, certification, trust, or scoped lifecycle
  ownership;
- move Commerce tax, monetary, document, Payment, Refund, customer, inventory, Order, setup,
  readiness, or reporting truth into Core;
- create an umbrella operational Domain for future Operating Systems;
- let Product Hub own an OS setup, Marketplace state, Recommendation, or source record;
- convert Search, Reporting, Analytics, Navigation, or Observability into canonical ownership; or
- resolve another milestone's Deferred Decision.

## 11. Canonical Responsibility Boundaries

| Canonical responsibility | Exact owner retained | Approved Global Platform use | Invariant |
|---|---|---|---|
| identity and authentication | Core Identity | resolve actor reference | one canonical identity |
| Workspace and organization identities | Core Workspace, Business, and Organization Registries | resolve tenant and organization references | hierarchy unchanged |
| Membership, Permission, Delegation, and Authorization Context | Core Identity and Access plus owning domain | require current context for every protected use | identifiers are not proof of authority |
| Settings and Localization Context | Core Settings and Localization | resolve language, locale, direction, timezone, and currency presentation context | user-entered data remains as entered |
| Business DNA | Core Business DNA Registry for one Business | consume pinned Business context | no Global DNA or Workspace DNA |
| Knowledge and Knowledge Packs | Knowledge owners | consume exact source and version references | no copied Knowledge truth |
| Rules and Rule outcomes | Rules Engine | consume deterministic applicable outcomes and evidence | no global Rule override |
| Business Brain Decision | Business Brain | supply permitted input; consume completed Decision | AI and Global Platform never form the Decision |
| Recommendation | Recommendation Engine | supply context; consume explanation and disposition | Recommendation remains optional |
| Configuration Proposal | Configuration Engine | supply context; route to target | target owner independently validates and applies |
| Marketplace facts and lifecycles | Marketplace | consume availability and scoped-state projections | immutable shared versions and scoped state remain separate |
| Core-held AI Expert Definition | Core AI Coordinator Expert Registry path | reference exact eligible definition | no Marketplace duplicate |
| Marketplace-published AI Expert Definition | Marketplace Asset Version path | reference exact published version | no Registry duplicate of definition content |
| AI Interaction and AI output | Core AI Coordinator | supply minimum permitted context | AI owns only AI artifacts, never Business facts |
| Commerce facts and lifecycles | Commerce OS | consume or present authorized projections | Commerce remains sole operational owner |
| future OS facts and lifecycles | applicable OS | consume or present authorized projections | each OS remains standalone |
| Audit Record | Core Audit Service | contribute critical-action references | append-only source unchanged |
| operational telemetry | applicable Observability boundary | consume tenant-safe operational evidence | telemetry is not Audit or business truth |
| Search, Reporting, and Analytics projections | projection owner with source-owner participation | present authorized global views | projection is never ownership |

No canonical responsibility transfers to Global Platform by virtue of global context, broader
geographic use, aggregation, localization, or scale.

## 12. Ownership Boundaries

### 12.1 Global Platform coordination ownership

Core Platform is accountable for coordinating shared global context because it already owns the
shared control plane, Authorization Context, Workspace and organization identity, Settings and
Localization Context, Navigation, Search coordination, shared Security, Audit, Observability,
Business intelligence coordination, Marketplace provision, and AI coordination.

This accountability is limited to:

- resolving source references and current scope;
- exposing precedence, freshness, effective-time, uncertainty, and conflict;
- supplying minimum authorized context to the applicable owner;
- preserving shared representation and security principles; and
- coordinating non-canonical projections and governed user movement.

It does not make Core the owner of legal, tax, monetary, Marketplace, AI Expert publication,
Commerce, or other OS operational facts.

### 12.2 Owner-local write rule

Every canonical write remains inside one existing owner. A global interaction may request a
write, but the owner must independently:

1. resolve current Authorization Context;
2. validate source versions and applicability;
3. enforce its invariants and relevant privacy or isolation constraints;
4. apply or reject the action under its lifecycle;
5. expose an owner-controlled result; and
6. participate in append-only Audit when consequential.

No shared global transaction, dual writer, cross-OS database dependency, or global write-through
projection is approved.

## 13. Aggregate Boundary Candidates

No Global Platform aggregate is approved. The following logical candidates exist only to focus
future analysis; each is controlled by the cited Deferred Decision.

| ID | Logical aggregate boundary candidate | Possible responsibility | Existing owner boundary to preserve | Status |
|---|---|---|---|---|
| GPABC-01 | Global Context Policy Candidate | precedence, required context, effective time, uncertainty, and conflict | Core context coordination and each source owner | Deferred — DD-GP-08/09 |
| GPABC-02 | Region Reference Candidate | distinguish a governed Region meaning and relationships | organization, policy, and owner facts must not be copied | Deferred — DD-GP-07 |
| GPABC-03 | Country Reference Candidate | distinguish country meanings and reference evidence | all owner-specific country facts remain canonical | Deferred — DD-GP-08 |
| GPABC-04 | Legal Entity Context Candidate | relate legal evidence to existing organization references | Core hierarchy remains unchanged; canonical owner unresolved | Deferred — DD-GP-06 |
| GPABC-05 | Global Applicability Policy Candidate | relate jurisdiction, compliance, privacy, residency, Marketplace, Knowledge, and Rule context | Rules and target owners retain validation | Deferred — DD-GP-15–DD-GP-19 |
| GPABC-06 | Cross-Region Collaboration Policy Candidate | represent explicit collaboration constraints and revocation | Core Permission and Delegation remain authoritative | Deferred — DD-GP-20–DD-GP-22 |
| GPABC-07 | Global Representation Policy Candidate | relate locale, language, time, currency, number, and address presentation | Settings and canonical owner values remain authoritative | Deferred — DD-GP-10–DD-GP-14 |
| GPABC-08 | Global Rollout Governance Candidate | represent country launch, restriction, withdrawal, migration, and readiness evidence | Governance and owner operations retain approval | Deferred — DD-GP-33–DD-GP-36 |

Candidate boundaries may be rejected, split, combined, or represented without aggregates. Their
names do not enter the canonical glossary through this Proposal.

## 14. Candidate Canonical Facts

No new canonical fact is approved. Existing frozen facts remain canonical. The following
possible facts require a future decision before their necessity, definition, owner, scope, and
lifecycle can be accepted.

| ID | Candidate fact | Candidate purpose | Ownership question | Status |
|---|---|---|---|---|
| GPCF-01 | Region Definition Candidate | name one precise Region meaning | Core reference, tenant context, policy source, or no canonical fact | Deferred — DD-GP-07 |
| GPCF-02 | Country Reference Candidate | identify a governed country reference | shared reference versus owner-specific context | Deferred — DD-GP-08 |
| GPCF-03 | Context Precedence Candidate | explain which context applies for a purpose and time | Core coordination without taking source ownership | Deferred — DD-GP-09 |
| GPCF-04 | Legal Entity Reference Candidate | relate legal identity to frozen organization references | canonical owner unresolved | Deferred — DD-GP-06 |
| GPCF-05 | Jurisdiction Applicability Candidate | retain applicable jurisdiction source and evidence | Rules or target owner, not Global Platform tax ownership | Deferred — DD-GP-15 |
| GPCF-06 | Compliance Applicability Evidence Candidate | retain source, version, effective period, and validation evidence | source Rule and target owner boundaries | Deferred — DD-GP-16 |
| GPCF-07 | Data Classification Candidate | identify protection category and purpose | Core Security governance versus source owner detail | Deferred — DD-GP-17 |
| GPCF-08 | Residency Constraint Candidate | identify applicable residency restriction | policy source and canonical data owner | Deferred — DD-GP-18 |
| GPCF-09 | Privacy Applicability Candidate | identify relevant privacy purpose, rights, and restriction | Core Security and canonical owner responsibilities | Deferred — DD-GP-17/19 |
| GPCF-10 | Cross-Region Collaboration Authorization Candidate | represent approved collaboration beyond ordinary access | Core Permission/Delegation relationship | Deferred — DD-GP-20/21 |
| GPCF-11 | Translation Provenance Candidate | preserve source, review, version, and historical meaning | Core Localization versus content owner | Deferred — DD-GP-10/11 |
| GPCF-12 | Exchange-Rate Evidence Candidate | identify rate source, version, effective time, and correction | monetary owner or future approved reference owner | Deferred — DD-GP-13 |
| GPCF-13 | Country Availability Candidate | expose Marketplace or product availability by context | Marketplace or applicable product owner | Deferred — DD-GP-23 |
| GPCF-14 | Global Operational Readiness Candidate | capture evidence for country or regional operation | owner operations and Governance | Deferred — DD-GP-33 |
| GPCF-15 | Global Migration Assessment Candidate | retain compatibility, meaning, reconciliation, and rollback evidence | affected canonical owner | Deferred — DD-GP-34/36 |

These names are analytical placeholders, not canonical terminology.

## 15. Candidate Canonical Write Models

No Global Platform write model is approved. Candidate write responsibilities below cannot be
implemented or treated as authority until their Deferred Decisions are resolved through review.

| ID | Candidate write model | Potential write responsibility | Required ownership constraint | Status |
|---|---|---|---|---|
| GPCWM-01 | Region Reference Write Candidate | create or revise an approved Region meaning | must not alter organization identity or owner-domain location facts | Deferred — DD-GP-07 |
| GPCWM-02 | Country Reference Write Candidate | maintain governed shared country reference metadata | must not replace context-specific country facts | Deferred — DD-GP-08 |
| GPCWM-03 | Context Policy Write Candidate | version precedence and required-context policy | Core coordination only; sources retain facts | Deferred — DD-GP-09 |
| GPCWM-04 | Legal Entity Relationship Write Candidate | relate legal evidence to organization references | owner and lifecycle unresolved; hierarchy unchanged | Deferred — DD-GP-06 |
| GPCWM-05 | Applicability Policy Write Candidate | version global applicability policy | Knowledge, Rules, and target owners remain separate | Deferred — DD-GP-15/16 |
| GPCWM-06 | Privacy and Residency Policy Write Candidate | version classification and restriction policy | no physical placement or canonical-data transfer | Deferred — DD-GP-17–DD-GP-19 |
| GPCWM-07 | Collaboration Authorization Write Candidate | grant, restrict, expire, or revoke cross-region collaboration | Core Permission and Delegation remain authoritative | Deferred — DD-GP-20/21 |
| GPCWM-08 | Representation Policy Write Candidate | version localization and formatting policy | canonical values and user-entered content remain unchanged | Deferred — DD-GP-10–DD-GP-14 |
| GPCWM-09 | Global Availability Policy Write Candidate | govern contextual Marketplace or product availability | Marketplace and product lifecycles remain authoritative | Deferred — DD-GP-23/25 |
| GPCWM-10 | Global Operations Policy Write Candidate | govern rollout, suspension, withdrawal, and recovery criteria | Governance and owner operations approve actions | Deferred — DD-GP-33 |
| GPCWM-11 | Migration Assessment Write Candidate | record compatibility, reconciliation, and rollback assessment | no canonical data mutation authority | Deferred — DD-GP-34/36 |
| GPCWM-12 | Global Scale Assessment Write Candidate | record measured evidence for evolution or extraction | Accepted ADR and frozen owner boundaries required | Deferred — DD-GP-35/36 |

## 16. Candidate Read Models

All read models are disposable, permission-filtered, source-attributed projections. None is
approved for implementation; exact composition, freshness, privacy, retention, and owner remain
deferred.

| ID | Candidate Read Model | Source owners | Candidate purpose | Status |
|---|---|---|---|---|
| GPRM-01 | Current Global Context View | Core identity, Workspace, organization, Settings, and owner references | make active scope, source, uncertainty, and conflicts visible | Candidate — DD-GP-09 |
| GPRM-02 | Multi-Country Workspace Overview | Core plus selected Business and OS projections | explicit non-canonical Workspace aggregation | Candidate — DD-GP-04/22 |
| GPRM-03 | Region and Country Applicability View | source owners, Knowledge, Rules, and target owners | explain applicable contexts without universal country truth | Candidate — DD-GP-07/08/15/16 |
| GPRM-04 | Global Marketplace Participation View | Marketplace | show authorized availability and scoped lifecycle projections | Candidate — DD-GP-23 |
| GPRM-05 | Global Commerce Overview | Commerce OS | show authorized multi-country Commerce projections | Candidate — DD-GP-24/32 |
| GPRM-06 | Global Intelligence Context View | Business DNA, Business Brain, Recommendation, Configuration, Knowledge, and Rules owners | expose pinned input and owner result references | Candidate — DD-GP-26–DD-GP-28 |
| GPRM-07 | Global AI Eligibility View | AI Coordinator, AI Expert Network, and Marketplace publication-path owners | explain permitted Expert and provider context | Candidate — DD-GP-29 |
| GPRM-08 | Global Reporting Projection | participating owner domains | compare authorized data with lineage, time, currency, and jurisdiction context | Candidate — DD-GP-32 |
| GPRM-09 | Global Search Projection | Search Coordination and source owners | provide multilingual, country-aware, permission-filtered results | Candidate — DD-GP-32 |
| GPRM-10 | Global Operational Health View | owner operations, Observability, and Audit references | show tenant-safe health, dependency, incident, and capacity evidence | Candidate — DD-GP-33 |

## 17. Candidate Lifecycle Concepts

No unified Global Platform lifecycle is approved. Existing Workspace, Business, OS, Marketplace,
Recommendation, Configuration, AI, and owner-domain lifecycles remain independent.

| ID | Candidate lifecycle concern | Candidate stages requiring future definition | Boundary | Status |
|---|---|---|---|---|
| GPLC-01 | Region Reference Lifecycle | proposal, review, effective use, revision, deprecation, retirement | does not change organization hierarchy | Deferred — DD-GP-07 |
| GPLC-02 | Country Reference Lifecycle | source adoption, effective use, correction, supersession, retirement | owner-specific country facts remain separate | Deferred — DD-GP-08 |
| GPLC-03 | Applicability Policy Lifecycle | draft, evidence review, approval, effective, superseded, withdrawn | deterministic Rules and target-owner validation required | Deferred — DD-GP-15/16 |
| GPLC-04 | Cross-Region Collaboration Lifecycle | request, review, grant, active, restricted, expired, revoked | current Authorization Context and Audit required | Deferred — DD-GP-20/21 |
| GPLC-05 | Global Availability Lifecycle | eligible, restricted, unavailable, restored | Marketplace and product lifecycles remain authoritative | Deferred — DD-GP-23/25 |
| GPLC-06 | Country or Region Rollout Lifecycle | assess, approve, launch, operate, restrict, suspend, withdraw, recover | operational evidence and Governance approval required | Deferred — DD-GP-33 |
| GPLC-07 | Global Migration Lifecycle | assess, prepare, validate, migrate, reconcile, rollback, complete | affected owners retain canonical writes | Deferred — DD-GP-34 |
| GPLC-08 | Global Scale Evolution Lifecycle | observe, measure, propose, review, accept ADR, evolve, validate | no physical extraction without evidence and change control | Deferred — DD-GP-35/36 |

Lifecycle terminology in this table is candidate-only and does not authorize transitions.

## 18. Cross-Region Collaboration Principles

1. **Workspace remains the tenant boundary.** Cross-region work never merges Workspaces or
   creates a tenant above them.
2. **Collaboration is not ownership.** Reading, referencing, projecting, reviewing, or requesting
   work never transfers canonical write authority.
3. **Context is explicit.** Actor, Workspace, Business, Business Unit, Department, Branch, OS,
   resource, purpose, and any applicable country or regional context must be visible and resolved.
4. **Authorization is current.** Context switches, deep links, Delegation, and target-owner action
   reauthorize at the point of use.
5. **Least privilege applies.** Broader geographic responsibility does not imply broader tenant,
   Business, resource, or data access.
6. **Owner-local writes apply.** The owning domain validates and performs every canonical action.
7. **Aggregation is explicit and non-canonical.** Workspace or cross-context views never merge
   source facts or create Workspace DNA.
8. **Cross-OS collaboration is optional.** No OS needs another OS to complete its core workflow.
9. **Failure is isolated.** Failure or unavailability of optional collaboration cannot corrupt the
   owner's local state or silently weaken controls.
10. **Consequential activity is auditable.** Critical grants, restrictions, actions, reversals,
    and emergency use participate in append-only Audit.

## 19. Cross-Region Isolation Principles

1. Tenant isolation by Workspace remains mandatory.
2. Narrower isolation may be required by Business, Business Unit, Department, Branch, OS,
   resource, jurisdiction, residency, confidentiality, or purpose, but no new default tenant
   hierarchy is approved.
3. Every protected read, projection, AI context, administrative view, and owner action resolves
   tenant and resource scope independently.
4. Privacy and residency restrictions constrain Search, Reporting, Analytics, AI, support,
   export, backup, recovery, and operational evidence as well as canonical records.
5. Missing, stale, ambiguous, or conflicting isolation context must not be treated as permission.
   Detailed fail-closed behavior remains deferred.
6. Cross-region visibility does not imply cross-region mutation.
7. Emergency access, support access, and Delegation remain time-bound, revocable, minimum
   necessary, and auditable; exact policy remains deferred.
8. Physical data placement is not approved by this logical isolation architecture.

## 20. Localization Principles

1. Core Settings and Localization Context remains the presentation-context authority.
2. User preference, Workspace default, Business context, OS context, document requirement, and
   customer preference are distinct; their exact precedence is deferred.
3. User-entered Business and owner-domain data is stored and presented as entered unless the
   owning workflow explicitly manages a separate translated representation.
4. Platform labels, statuses, Marketplace content, Knowledge presentation, documents, Search,
   and AI responses must be able to participate in multiple languages without duplicating
   canonical ownership.
5. RTL/LTR direction is presentation context and never changes canonical content meaning.
6. Missing translations, fallback, translation provenance, review, correction, and historical
   meaning require governed policy under DD-GP-10 and DD-GP-11.
7. Localization never authorizes a write, changes scope, or substitutes a formatted value for a
   canonical value.

## 21. Internationalization Principles

1. Global variation is represented through structured, versioned, data-driven context rather
   than application-specific country branches.
2. Canonical identifiers and owner-domain meanings remain stable across languages and locales.
3. Time, currency, numbers, measurements, addresses, documents, and status labels separate
   canonical meaning from presentation.
4. Existing products remain independently usable when optional global context is unavailable.
5. Internationalized representation is a shared architectural standard, while each owning
   product remains responsible for its own user and document surfaces.
6. No universal temporal, monetary, number, or address write model is approved.
7. Backward compatibility, historical meaning, and source provenance are mandatory for evolving
   representation policy.

## 22. Compliance Principles

1. Global Platform does not claim compliance and does not invent official Rules.
2. Applicability identifies source, version, effective period, scope, evidence, and uncertainty.
3. Knowledge supplies governed information; deterministic Rules supply explainable outcomes; the
   target owner validates and performs the domain action.
4. Tax Application and operational tax facts remain with Commerce or the applicable future OS.
5. Platform, Workspace, Business, Publisher, Asset, AI provider, and OS obligations remain
   distinct until approved policy defines them.
6. Conflicting jurisdictional obligations must be exposed and escalated, not silently
   prioritized.
7. Consequential compliance changes require appropriate customer or human control and Audit
   participation.
8. Source authority, conflict policy, certification, and legal interpretation remain deferred;
   this Proposal creates no regulatory conclusion.

## 23. Privacy Principles

1. Purpose limitation, minimization, explicit scope, least privilege, and tenant isolation apply
   before any global context is consumed.
2. A broader global view receives only the data required for its authorized purpose.
3. Canonical data owners retain responsibility for their records; Core Security coordinates
   shared privacy constraints without becoming a second data owner.
4. Search, Reporting, Analytics, AI, support, exports, telemetry, and read models are subject to
   the same authorization and privacy constraints as source access.
5. Consent, retention, deletion, anonymization, masking, export, legal hold, and data-subject
   rights remain deferred and must not be inferred from product behavior.
6. AI receives only minimum permitted context and cannot use privacy-sensitive context to bypass
   deterministic Rules or owner validation.
7. Privacy conflicts remain visible and fail closed under future approved policy.
8. Append-only Audit preserves critical evidence while access, retention, export, and privacy
   filtering remain governed.

## 24. Data Residency Principles

1. Residency is an applicability constraint, not a physical topology decision in this Proposal.
2. Residency evaluation distinguishes canonical facts, projections, evidence, telemetry, exports,
   backups, recovery copies, support access, and AI provider context.
3. The canonical owner does not lose ownership because residency constrains storage, access, or
   processing.
4. Workspace choice, jurisdictional mandate, source classification, permitted location, and
   service capability are separate inputs.
5. Cross-region access, Search, Analytics, AI, Audit, backup, and recovery must honor applicable
   restrictions.
6. No replication, routing, partitioning, regional placement, provider, movement, or recovery
   mechanism is approved.
7. Applicability, conflict, evidence, and fail-closed policy remain DD-GP-17 through DD-GP-19.

## 25. Marketplace Integration Principles

1. Marketplace remains the bounded context and canonical owner established by Marketplace v1.0.
2. Shared Marketplace Asset Versions remain immutable; customer acquisition and use remain
   scoped.
3. Country, jurisdiction, language, License, Offer, Publisher, certification, compatibility,
   privacy, and support context may constrain Marketplace-owned availability and lifecycle
   behavior only through future approved policy.
4. Availability is distinct from Purchase, Entitlement, Distribution, Installation, Activation,
   Applicability, upgrade, and removal.
5. Global context never copies Asset content or creates a parallel Marketplace version.
6. AI Expert Definition publication-path ownership remains mutually exclusive as frozen.
7. Marketplace Search, Recommendation participation, and Analytics remain projections or owner
   outputs; Global Platform does not own them.
8. `DD-MP-01` through `DD-MP-50` remain unresolved. Global Platform deferrals may constrain later
   global behavior but do not answer Marketplace policy.

## 26. Commerce OS Integration Principles

1. Commerce OS remains independently usable and owns all Commerce canonical facts, writes,
   aggregates, setup, readiness, lifecycles, reports, and operational actions.
2. Global context may inform Commerce-owned country setup, currency, tax jurisdiction, documents,
   language, numbering, addresses, payments, refunds, privacy, retention, and reporting.
3. Commerce independently validates every configuration or operational action.
4. Workspace defaults and global presentation never overwrite Business, Branch, transaction,
   customer, monetary, document, tax, or historical Commerce facts.
5. Global Reporting consumes authorized Commerce projections and never becomes Commerce truth.
6. Cross-country Commerce behavior does not require another Operating System.
7. `DD-01` through `DD-40` in the Commerce Freeze remain unresolved.

## 27. Business Brain Integration Principles

1. Business Brain remains the sole owner of the canonical deterministic Decision.
2. Global context is a pinned, source-attributed input only when authorized and applicable to the
   selected Business or explicit Workspace aggregation.
3. Business DNA remains Business-scoped; global aggregation never creates or rewrites DNA.
4. Knowledge and Rules remain separate, versioned inputs with retained provenance.
5. Business Brain completes Decision independently of AI, provider, model, or Expert.
6. Recommendation Engine receives Decision outputs under its own ownership; Configuration Engine
   receives accepted Recommendation context under its own ownership.
7. Global context conflicts, missing inputs, and uncertainty must remain explainable and cannot be
   silently replaced by AI inference.
8. Business Brain Deferred Decisions 1 through 24 remain unresolved.

## 28. AI Expert Network Integration Principles

1. One Core AI Coordinator interprets, authorizes, builds context, applies policy, selects
   Experts, coordinates contributions, validates evidence, synthesizes output, evaluates
   confidence, proposes actions, and participates in Audit.
2. AI remains downstream of authorized context, Knowledge, Rules, Analytics, and completed
   Business Brain Decision where a Decision applies.
3. Country, language, provider, privacy, residency, evidence, safety, and support context may
   constrain eligibility but cannot create a second Coordinator.
4. Core-held AI Expert Definitions remain on the Core Expert Registry publication path;
   Marketplace-published Definitions remain on the Marketplace Asset Version path.
5. AI outputs remain AI-owned artifacts and never become Business, Knowledge, Rule,
   Recommendation, Configuration, Marketplace, or OS truth.
6. AI Action Proposals have no execution authority; the target owner validates authorized action.
7. Cross-country learning cannot directly rewrite Business DNA, Knowledge, Rules, Decisions, or
   owner facts.
8. `DD-AEN-01` through `DD-AEN-24` remain unresolved.

## 29. Future Operating System Principles

1. Every future Operating System remains a complete independent application for its operational
   domain.
2. Each OS owns its setup, configuration, Permissions, workflows, canonical records, reports,
   dashboards, Navigation, and lifecycle.
3. Core supplies identity, organization, commercial, Security, Settings, Localization, global
   context, Search coordination, Audit, and other shared platform boundaries.
4. Country-aware setup and behavior remain OS-owned and may consume source-owned global context.
5. Optional cross-OS collaboration is versioned, authorized, observable, backward-compatible,
   and failure-isolated.
6. No OS accesses another OS's canonical store or requires another OS for its core workflow.
7. A future OS cannot redefine Global Platform, Region, Country, legal, compliance, privacy, or
   residency context for other owners.
8. New OS evolution follows Governance, Accepted ADRs, Architecture Review, Freeze, and Readiness.

## 30. Proposal Risks

All 24 Discovery risk identifiers remain preserved. Discovery risk `GPR-01` retains its historical
wording, while Discovery Patch v0.1.1 controls its interpretation: the missing-Genesis premise is
invalid and non-blocking. `GPR-02` through `GPR-24` remain active Proposal risks.

| ID | Proposal risk or preserved provenance item | Architectural consequence | Proposal control; not final resolution |
|---|---|---|---|
| GPR-01 | historical claim that Genesis 21 is a missing required authority | none under the controlling Repository Alignment Patch | preserved for provenance; Patch v0.1.1 establishes Genesis 20 as complete authority and removes the blocker |
| GPR-02 | Region meanings are conflated | incorrect scope, policy, Reporting, or residency behavior | GPC-02 separates meanings; model remains DD-GP-07 |
| GPR-03 | Country meanings are conflated | incorrect tax, compliance, Marketplace, or Business context | GPC-03 preserves multiple meanings; semantics remain DD-GP-08 |
| GPR-04 | Global Identity duplicates Core identity | conflicting users, Membership, authorization, or Audit | Core identity remains sole owner |
| GPR-05 | legal entity is equated with Business or Branch | hierarchy and compliance errors | GPC-12 separates context; model remains DD-GP-06 |
| GPR-06 | Workspace defaults override Business or owner facts | Business DNA or operational corruption | defaults are context only; precedence remains DD-GP-04/09 |
| GPR-07 | localization mutates canonical data | loss of legal or historical meaning | GPLRD-02 separates representation from truth |
| GPR-08 | timezone assumptions corrupt effective periods | incorrect lifecycle, reporting, Audit, or document meaning | owner time remains canonical; semantics remain DD-GP-12 |
| GPR-09 | currency conversion is treated as formatting | inaccurate money, tax, refund, or reporting | value, display, and conversion remain separate under DD-GP-13 |
| GPR-10 | universal address assumptions exclude valid country forms | invalid legal, billing, delivery, or identity data | address facts remain owner-specific under DD-GP-14 |
| GPR-11 | Global Platform becomes tax or compliance owner | duplicate Rules and OS facts | GPLRD-03 coordinates only; target owner validates |
| GPR-12 | jurisdiction conflicts are silently prioritized | legal, privacy, tax, or operational breach | conflicts remain visible; policy remains DD-GP-16 |
| GPR-13 | residency is reduced to infrastructure placement | ownership, privacy, backup, export, or support conflict | residency stays logical and deferred under DD-GP-18 |
| GPR-14 | global administration bypasses tenant scope | cross-tenant exposure and unaudited authority | GPC-27 remains inside Core authorization; detail DD-GP-21/31 |
| GPR-15 | cross-region collaboration implies shared writes | duplicate truth and circular ownership | owner-local writes and optional collaboration are mandatory |
| GPR-16 | global Reporting becomes canonical truth | hidden writer and invalid aggregation | GPRM projections remain disposable and source-attributed |
| GPR-17 | multilingual Search leaks or misranks data | authorization, privacy, relevance, or source harm | Search remains permission-filtered; detail DD-GP-32 |
| GPR-18 | Marketplace expansion bypasses lifecycle gates | unauthorized distribution, activation, or use | Marketplace Freeze and DD-MP register remain controlling |
| GPR-19 | Commerce global concerns move into Core | Commerce ownership leakage | GPC-20 is accountable to Commerce OS |
| GPR-20 | country Knowledge or Rules are copied per OS | fragmented intelligence and inconsistent compliance | exact shared versions remain source-owned |
| GPR-21 | AI context crosses regions improperly | privacy, residency, authorization, and evidence harm | one Coordinator and minimum authorized context remain mandatory |
| GPR-22 | a global layer creates cross-OS hard dependency | OS core workflow becomes unavailable | OS independence and failure isolation remain guarantees |
| GPR-23 | rollout precedes operational policy | weak incident, capacity, continuity, or recovery behavior | rollout remains DD-GP-33 and requires readiness evidence |
| GPR-24 | global scale is used to justify premature extraction | complexity, ownership drift, and migration risk | measured evidence and Accepted ADR remain mandatory |

**Proposal Risk register count: 24**  
**Active unresolved Proposal Risk count: 23**

## 31. Deferred Decisions

All unresolved architectural choices receive a stable `DD-GP` identifier. A Deferred Decision is
not an approved default, and implementation cannot answer one implicitly.

### 31.1 Global Platform Deferred Decision register

| ID | Deferred Decision | Discovery questions preserved | Required authority before resolution |
|---|---|---|---|
| DD-GP-01 | final architectural definition, mandatory outcomes, and exclusion criteria for Global Platform | GPOQ-02, GPOQ-03, GPOQ-06 | Proposal review and successor Freeze |
| DD-GP-02 | inherited deferrals required before each global rollout and evidence of upstream operational maturity | GPOQ-04, GPOQ-05 | affected freezes, readiness evidence, and Governance |
| DD-GP-03 | cross-country operation of one Core identity without duplication | GPOQ-07 | Core Identity and Security review |
| DD-GP-04 | whether and how one Workspace spans countries or Regions, including default-versus-fact semantics | GPOQ-08 | Core Workspace and Settings review |
| DD-GP-05 | sufficiency of Business, Business Unit, Department, and Branch for regional administration | GPOQ-09 | Core Organization Registry and ADR review if changed |
| DD-GP-06 | Legal Entity meaning, multiplicity, relationship to organization and billing identity, evidence, owner, and lifecycle | GPOQ-10–GPOQ-12 | Core organization, commercial, legal, and Governance review |
| DD-GP-07 | necessity, meanings, source, scope, relationships, and lifecycle of Region | GPOQ-13, GPOQ-14 | Architecture Review and ADR |
| DD-GP-08 | canonical, referenced, derived, and presentational Country meanings and applicability selection | GPOQ-15, GPOQ-16 | source-owner review and ADR |
| DD-GP-09 | global context precedence, freshness, effective time, explanation, ambiguity, conflict, and fail-closed behavior | GPOQ-17, GPOQ-18 | Core context and Security review |
| DD-GP-10 | language and locale preference precedence, content treatment, and fallback | GPOQ-19–GPOQ-21 | Core Settings and Localization review |
| DD-GP-11 | RTL/LTR separation, translation provenance, version, correction, history, and cross-owner localization participation | GPOQ-22–GPOQ-24 | Core Localization and content-owner review |
| DD-GP-12 | timezone precedence, daylight-saving, historical change, deadlines, effective periods, and Reporting cutoffs | GPOQ-25, GPOQ-26 | Core context and owner-domain review |
| DD-GP-13 | monetary-value and currency meanings, exchange-rate authority, version, correction, evidence, and conversion policy | GPOQ-27, GPOQ-28 | commercial and monetary owner review |
| DD-GP-14 | number, measurement, minor-unit, input, display-rounding, and owner-specific address semantics | GPOQ-29, GPOQ-30 | Core Localization and owner-domain review |
| DD-GP-15 | facts, sources, deterministic Rule participation, and target-owner validation determining tax jurisdiction | GPOQ-31, GPOQ-32 | Knowledge, Rules, and applicable OS review |
| DD-GP-16 | compliance source authority, version, effective period, evidence, conflicts, participant obligations, and approval controls | GPOQ-33–GPOQ-36 | Governance, Rules, legal review, and target owners |
| DD-GP-17 | data classification and privacy-rights policy across facts, projections, evidence, telemetry, exports, backups, and AI | GPOQ-37, GPOQ-38 | Core Security, privacy, and owner review |
| DD-GP-18 | residency-constrained data categories, applicability authority, cross-region access, support, projections, AI, Audit, and recovery constraints | GPOQ-39, GPOQ-40 | Security, privacy, owner, and infrastructure review |
| DD-GP-19 | narrower isolation below Workspace and visible fail-closed privacy/residency conflict behavior | GPOQ-41, GPOQ-42 | Core Authorization and Security review |
| DD-GP-20 | legitimate collaboration scenarios and distinction from cross-region write authority or tenant merging | GPOQ-43, GPOQ-44 | Core Identity, owner domains, and Architecture Review |
| DD-GP-21 | cross-region user/service authorization, scope revalidation, Delegation, separation of duties, emergency access, revocation, and Audit | GPOQ-45, GPOQ-46 | Core Identity, Security, and Audit review |
| DD-GP-22 | non-canonical Workspace aggregation and constrained cross-Workspace partner or support relationships | GPOQ-47, GPOQ-48 | ADR-006, Security, and Governance review |
| DD-GP-23 | country, jurisdiction, language, commercial, Publisher, certification, support, and scoped-lifecycle effects on Marketplace availability and use | GPOQ-49, GPOQ-50 | Marketplace DD-MP register and Marketplace review |
| DD-GP-24 | multi-country Commerce setup, currency, tax, documents, addresses, payments, refunds, privacy, retention, and Reporting | GPOQ-51 | Commerce DD register and Commerce review |
| DD-GP-25 | shared platform context versus OS facts, future OS adoption, and optional cross-country/cross-OS relationship policy | GPOQ-52–GPOQ-54 | independent-OS Governance and affected owners |
| DD-GP-26 | country-aware Knowledge and Rule selection, translation, versioning, expiry, conflict, and reconciliation | GPOQ-55 | Knowledge and Rules owner review |
| DD-GP-27 | Business Brain global input, Business-scoped Decision, explicit aggregation, and Recommendation explanation under differing context | GPOQ-56, GPOQ-57 | Business Brain and Recommendation owner review |
| DD-GP-28 | Configuration Proposal representation of global context and target-application policy | GPOQ-58 | Configuration Engine and target-owner review |
| DD-GP-29 | AI Expert eligibility, provider, language, country, privacy, residency, evidence, safety, and cross-country learning policy | GPOQ-59, GPOQ-60 | AI Expert Network, Core AI, and inherited AI deferrals |
| DD-GP-30 | contexts preserved and displayed through Global Navigation and protection against hidden, stale, or unauthorized movement | GPOQ-61, GPOQ-62 | Core Navigation and Security review |
| DD-GP-31 | global and regional administrative views, prohibitions, support scope, and Delegation policy | GPOQ-63 | Core Identity, Navigation, Audit, and Governance review |
| DD-GP-32 | global Reporting normalization, multilingual Search, dashboard/export/alert/Notification context, lineage, privacy, freshness, and comparability | GPOQ-64–GPOQ-66 | projection owners, source owners, and Security review |
| DD-GP-33 | service objectives, capacity, incidents, continuity, recovery, communication, country launch, suspension, withdrawal, and restoration criteria | GPOQ-67, GPOQ-68 | operations readiness, Governance, and affected owners |
| DD-GP-34 | migration of current country, locale, time, currency, address, privacy, and historical records without changing meaning | GPOQ-69 | affected owners and migration Governance |
| DD-GP-35 | concern-specific consistency, freshness, ordering, failure isolation, and evidence thresholds for future physical extraction | GPOQ-70, GPOQ-71 | measured evidence and Accepted ADR |
| DD-GP-36 | Proposal follow-on decisions, Draft ADR disposition, reviews, lifecycle exit criteria, and any physical implementation choices | GPOQ-72 | Milestone Lifecycle and future implementation governance |

**Global Platform Deferred Decision count: 36**

`GPOQ-01` is preserved in Discovery provenance but creates no current Deferred Decision because
Discovery Patch v0.1.1 authoritatively establishes that no Genesis 21 artifact is required. The
Patch resolves only repository interpretation, not architecture.

### 31.2 Inherited deferrals preserved

| Frozen milestone | Deferred register preserved | Effect on this Proposal |
|---|---|---|
| Core Platform | D-01 through D-42 plus unselected technologies and operational detail | no inherited choice is resolved |
| Business Brain | Deferred Decisions 1 through 24 | no Decision, input, insight, AI, Security, or operation detail is resolved |
| Commerce OS | DD-01 through DD-40 | no global Commerce policy is resolved |
| Marketplace | DD-MP-01 through DD-MP-50 | no Marketplace global policy is resolved |
| AI Expert Network | DD-AEN-01 through DD-AEN-24 | no global AI policy is resolved |

Where a `DD-GP` overlaps an inherited deferral, both remain open. A future resolution must cite
and govern every affected register rather than treating one as superseding another.

## 32. Draft ADR Candidates

These are subjects for future ADR preparation. They are not ADR files, have no Accepted status,
and create no authority.

| ID | Draft ADR candidate subject | Proposed decision question | Related deferrals |
|---|---|---|---|
| DADR-GP-01 | Global Platform as a Core-coordinated cross-cutting responsibility architecture | should the Proposal's non-owner, non-OS structural role be accepted? | DD-GP-01 |
| DADR-GP-02 | Explicit global context interpretation and precedence | how should source, scope, freshness, effective time, conflict, and explanation be governed? | DD-GP-08, DD-GP-09 |
| DADR-GP-03 | Region and Country semantic separation | which Region and Country meanings require canonical or referenced treatment? | DD-GP-07, DD-GP-08 |
| DADR-GP-04 | Legal Entity relationship and ownership | how should legal identity relate to the frozen organization hierarchy? | DD-GP-06 |
| DADR-GP-05 | Localization and internationalized representation | how should preferences, fallback, provenance, direction, and owner content be separated? | DD-GP-10, DD-GP-11 |
| DADR-GP-06 | Temporal, currency, numeric, and address interpretation | how should presentation and canonical owner values remain distinct? | DD-GP-12–DD-GP-14 |
| DADR-GP-07 | Jurisdiction and compliance applicability coordination | how should source-owned Knowledge, Rules, evidence, conflict, and target validation collaborate? | DD-GP-15, DD-GP-16 |
| DADR-GP-08 | Privacy, residency, and narrower isolation | how should classification, purpose, restriction, and fail-closed applicability be governed without selecting topology? | DD-GP-17–DD-GP-19 |
| DADR-GP-09 | Cross-region collaboration and authorization | how should collaboration, reauthorization, Delegation, revocation, and owner-local writes interact? | DD-GP-20–DD-GP-22 |
| DADR-GP-10 | Global Navigation, Reporting, Search, and administration projections | how should visible context and authorized non-canonical views be governed? | DD-GP-30–DD-GP-32 |
| DADR-GP-11 | Marketplace and independent OS global participation | how should global context constrain participation without changing lifecycle or ownership? | DD-GP-23–DD-GP-25 |
| DADR-GP-12 | Global intelligence, Configuration, Knowledge, and AI context | how should pinned context flow through separate owners without duplicate truth or AI authority? | DD-GP-26–DD-GP-29 |
| DADR-GP-13 | Global operational readiness and migration governance | what evidence and approvals govern launch, restriction, withdrawal, recovery, and meaning-preserving migration? | DD-GP-33, DD-GP-34 |
| DADR-GP-14 | Evidence-driven global scale and physical extraction | what measurements and compatibility conditions justify physical change? | DD-GP-35, DD-GP-36 |

**Draft ADR Candidate count: 14**

All Accepted Governance ADRs remain controlling. This Proposal particularly depends on ADR-002
through ADR-007, ADR-009 through ADR-014, ADR-017, ADR-020, ADR-024 through ADR-040. No Accepted
ADR is reopened or changed.

## 33. Proposal Readiness

### 33.1 Completeness assessment

| Requirement | Result |
|---|---|
| Architectural Mission and Scope defined | PASS |
| Logical Responsibility Domains approved and bounded | PASS — 10 |
| Discovery capabilities evaluated and justified | PASS — 30 approved, 0 rejected |
| capability and domain relationships defined | PASS |
| cross-milestone responsibilities and prohibitions defined | PASS |
| canonical and ownership boundaries preserved | PASS |
| aggregate, fact, write, read, and lifecycle candidates clearly non-canonical | PASS |
| cross-region collaboration and isolation principles defined | PASS |
| localization and internationalization principles defined | PASS |
| compliance, privacy, and residency principles defined | PASS |
| Marketplace, Commerce, Business Brain, AI Expert Network, and future OS integration principles defined | PASS |
| risks preserved | PASS — 24 retained; 23 active; Discovery GPR-01 controlled by Patch |
| every Proposal deferral has stable identifier | PASS — DD-GP-01 through DD-GP-36 |
| every Discovery open question accounted for | PASS — GPOQ-02 through GPOQ-72 mapped; GPOQ-01 governed by Patch |
| inherited deferrals preserved | PASS |
| Draft ADR candidates have stable identifiers | PASS — DADR-GP-01 through DADR-GP-14 |
| implementation, technology, physical topology, interfaces, and persistence absent | PASS |

### 33.2 Architecture Review focus

Independent Architecture Review must validate:

1. whether Core coordination adds only compatible global responsibilities;
2. whether each approved capability has a sufficiently exact accountable boundary;
3. whether GPLRD logical grouping avoids hidden bounded contexts or ownership domains;
4. whether any candidate fact, write model, aggregate, read model, or lifecycle wording implies
   premature approval;
5. whether the 36 deferrals cover all unresolved Discovery questions without resolving inherited
   milestone deferrals;
6. whether Business Brain Decision and AI sequencing remain exact;
7. whether Marketplace and AI Expert publication-path ownership remains exact;
8. whether Commerce and future OS independence remains intact;
9. whether privacy, residency, compliance, and jurisdiction language avoids unsupported claims;
   and
10. whether all frozen guarantees remain traceable and unchanged.

The Proposal is complete for independent review. It is not frozen architecture and does not
authorize Documentation Waves until approved through the Milestone Lifecycle.

# READY FOR ARCHITECTURE REVIEW

## References

### Approved Global Platform inputs

- [Global Platform Discovery v0.1](00-GLOBAL-PLATFORM-DISCOVERY.md)
- [Global Platform Discovery Patch v0.1.1](00A-GLOBAL-PLATFORM-DISCOVERY-PATCH-v0.1.1.md)
- [Global Platform Capability Map](01-GLOBAL-PLATFORM-CAPABILITY-MAP.md)

### Governance and Genesis

- [Milestone Lifecycle](../00-governance/MILESTONE-LIFECYCLE.md)
- [Governance ADR Repository](../00-governance/ADR/README.md)
- [Governance Glossary](../00-governance/glossary/GLOSSARY.md)
- [Genesis Vision](../01-genesis/01-VISION.md)
- [Genesis Constitution](../01-genesis/02-CONSTITUTION.md)
- [Genesis Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

### Frozen milestone authorities

- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Core Platform Documentation Readiness v1.0.1](../99-architecture-freeze/CORE-PLATFORM-v1.0.1-READINESS.md)
- [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Commerce OS Freeze v1.0](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md)
- [Marketplace Freeze v1.0](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md)
- [AI Expert Network Freeze v1.0](../99-architecture-freeze/AI-EXPERT-NETWORK-v1.0-FREEZE.md)
