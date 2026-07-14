# Global Platform Discovery v0.1

**Milestone:** Global Platform  
**Artifact type:** Discovery  
**Status:** Discovery incomplete — required Genesis source unavailable  
**Discovery date:** 2026-07-14  
**Architecture authority:** None; this document approves no architecture  
**Owner:** Nexoraxs

---

## 1. Purpose

This document identifies the complete currently discoverable problem space for the Global
Platform milestone before any Capability Map or Architecture Proposal is created.

It records responsibilities to investigate, inherited boundaries, working assumptions, risks,
unknowns, and unanswered discovery questions. It does not select a solution, define an
architecture, approve a Domain, approve a Capability, assign new ownership, or resolve a future
decision.

The Discovery is constrained by a material source gap: the requested Genesis artifact
`docs/01-genesis/21-GLOBAL-PLATFORM.md` is not present in the repository. The available Genesis
Platform Ecosystem, frozen milestones, and approved Core Platform roadmap provide substantial
problem-space evidence, but they cannot be treated as a substitute for the missing named source.

## 2. Discovery Authority and Constraints

### 2.1 Available governing authorities

The following authorities govern this Discovery:

1. Governance and all Accepted ADRs;
2. Genesis v1.1 artifacts currently present in the repository;
3. Core Platform Architecture v1.0 and Documentation Baseline v1.0.1;
4. Business Brain Architecture and Documentation Baseline v1.0;
5. Commerce OS Architecture v1.0;
6. Marketplace Architecture v1.0;
7. AI Expert Network Architecture v1.0; and
8. the approved Milestone Lifecycle.

### 2.2 Missing named authority

| Requested authority | Repository result | Discovery consequence |
|---|---|---|
| `docs/01-genesis/20-PLATFORM-ECOSYSTEM.md` | PRESENT and reviewed | available foundation for ecosystem relationships |
| `docs/01-genesis/21-GLOBAL-PLATFORM.md` | MISSING | Proposal readiness cannot be established |

The missing document creates no permission to infer its content. This Discovery records the gap
as an unresolved dependency, unknown, risk, and Proposal-readiness blocker.

### 2.3 Discovery-only interpretation

In this document:

- **candidate** means a subject worth investigating, not an approved Capability;
- **theme** means a grouping of related questions, not a Domain or Component;
- **global** describes expansion concerns and never implies globally shared tenant state;
- **Region** and **Country** are problem-space labels only; no canonical model is approved;
- **responsibility to investigate** does not assign a canonical owner;
- **relationship** identifies a boundary question, not an integration design; and
- **conceptual only** means no API, Contract, Event, storage, runtime, infrastructure, deployment,
  or implementation mechanism is defined.

## 3. Mission

Explore how Nexoraxs could support businesses operating across countries, languages, currencies,
timezones, jurisdictions, legal contexts, and regional operating boundaries while preserving the
frozen platform model.

The Global Platform problem space is to enable expansion without fragmenting canonical truth,
weakening tenant isolation, duplicating existing owners, hardcoding country behavior, or making
one Operating System depend on another.

## 4. Vision

Nexoraxs should remain a unified Business Operating Platform that businesses can grow with and
never outgrow, including when they operate across regions and countries.

Global evolution should preserve one coherent platform language, explicit Business and Workspace
context, independent Operating Systems, governed intelligence, shared immutable ecosystem
assets, customer control, and backward-compatible evolution.

This vision is inherited from available Genesis and frozen milestones. It does not approve a
Global Platform design.

## 5. Goals

Discovery aims to:

1. identify every major global expansion concern already implied by frozen architecture;
2. distinguish presentation localization from canonical Business and operational facts;
3. expose Region, Country, jurisdiction, legal-entity, privacy, and residency ambiguities;
4. preserve Workspace as the highest tenant boundary;
5. preserve Core identity and organization ownership;
6. preserve Business-scoped Business DNA and explicit Workspace intelligence aggregation;
7. preserve each Operating System's independent ownership and core workflow;
8. identify how global context may affect Marketplace availability and scoped state without
   changing Marketplace ownership;
9. identify how global context may affect Knowledge, Rules, Business Brain, Recommendations,
   Configuration Proposals, and AI without transferring their ownership;
10. identify global navigation, administration, reporting, search, and observability questions;
11. identify migration, scalability, recovery, and long-term operational questions without
    selecting mechanisms;
12. trace inherited Deferred Decisions that constrain Global Platform work;
13. establish what evidence is still required before a Capability Map; and
14. prevent absent authority from being replaced by invented architecture.

## 6. Non-Goals

This Discovery does not:

- define Global Platform architecture;
- approve Domains, bounded contexts, Components, services, or deployment units;
- approve canonical Region, Country, jurisdiction, locale, currency, address, tax, legal-entity,
  residency, or compliance models;
- assign new canonical ownership;
- redefine Workspace, Business, Business Unit, Department, Branch, or Business DNA;
- redefine Settings and Localization Context;
- redesign Core Platform, Business Brain, Commerce OS, Marketplace, AI Expert Network, or any
  future Operating System;
- define interfaces, Contracts, Events, payloads, or protocols;
- define persistence, databases, schemas, partitions, or data movement mechanisms;
- select infrastructure, topology, hosting location, deployment, framework, runtime, vendor, or
  technology;
- choose a regulatory interpretation or claim compliance;
- decide tax behavior;
- resolve data residency, retention, deletion, export, or legal-hold policy;
- define translation or content-management implementation;
- approve cross-region replication, failover, routing, or consistency behavior;
- approve public, partner, developer, or administrative access mechanisms;
- resolve any inherited Deferred Decision; or
- compensate for the missing Genesis Global Platform authority.

## 7. Problem Statement

Nexoraxs has frozen architecture for a multi-tenant Core Platform, Business intelligence,
Commerce OS, Marketplace, and AI Expert Network. That architecture already recognizes country,
language, timezone, currency, localization, country-aware Knowledge, jurisdiction-aware
Marketplace distribution, privacy, residency, and future global operations.

The unresolved problem is how those concerns collaborate when a Workspace or Business operates
across multiple countries and regions without creating:

- a second identity or organization model;
- a global tenant that bypasses Workspace isolation;
- parallel Business DNA, Knowledge, Rule, Recommendation, configuration, Marketplace, AI, or OS
  truth;
- hardcoded country behavior inside applications;
- hidden jurisdiction or legal-entity assumptions;
- cross-region access that exceeds current authorization;
- a global report, search result, or administrative view with canonical write authority;
- a cross-OS dependency for basic operation;
- ungoverned migration or service extraction; or
- inconsistent behavior across language, time, currency, address, tax, privacy, and compliance
  contexts.

The missing Genesis `21-GLOBAL-PLATFORM.md` prevents confirmation that this formulation is
complete.

## 8. Success Criteria

Discovery succeeds when:

1. all requested global concern areas are represented;
2. inherited owners and frozen boundaries are preserved explicitly;
3. candidate capability themes remain non-authoritative;
4. Region, Country, localization, jurisdiction, legal entity, residency, privacy, and
   cross-region questions are visible;
5. every frozen milestone relationship is addressed;
6. operational, migration, and scalability concerns remain conceptual;
7. assumptions are separated from frozen facts;
8. unknowns are not silently answered;
9. risks have no implied solution;
10. every Open Question remains unanswered;
11. missing authority is disclosed; and
12. Proposal readiness is determined honestly.

This document can satisfy the Discovery-record objective while still concluding that the
milestone is not ready for a Capability Map or Proposal.

## 9. Platform Scope to Explore

The potential Global Platform scope requires investigation across:

- global expansion of existing Workspace and Business journeys;
- Region, Country, jurisdiction, and legal-context interpretation;
- localization and internationalization across platform and OS experiences;
- language, direction, timezone, currency, number, and address behavior;
- tax-jurisdiction and compliance applicability at a conceptual level;
- data-residency and privacy applicability at a conceptual level;
- cross-region collaboration and isolation;
- global participation of Marketplace, Commerce OS, Business Brain, AI Expert Network,
  Configuration, Knowledge, Recommendation, and future Operating Systems;
- global navigation and administration;
- authorized global reporting and search projections;
- global observability and operational considerations;
- migration of existing contexts into future global behavior; and
- scalability under measured evidence and frozen ownership constraints.

No item in this list is approved architecture.

## 10. Platform Boundaries

### 10.1 Frozen boundaries that must remain intact

| Frozen subject | Existing authority that must remain intact | Global discovery boundary |
|---|---|---|
| tenant boundary | Workspace | Region or Country must not silently replace Workspace as tenant |
| organization identity | Core Organization Registry | no duplicate global organization hierarchy |
| Business identity | Business and Business-scoped Business DNA | no Global DNA or merged cross-Business DNA |
| organization levels | Workspace → Business → Business Unit → Department / Branch | no silent hierarchy change |
| settings and localization | Core Settings and Localization | explore extension without duplicate source truth |
| Knowledge and Rules | existing Knowledge and Rules owners | country applicability must not create copied rule truth |
| Decision | Business Brain | global context may be consumed only through approved inputs |
| Recommendation | Recommendation Engine | no Global Platform recommendation owner |
| Configuration Proposal | Configuration Engine | no global configuration write bypass |
| Product Hub | Core Product Hub | navigation and composition only; no source ownership |
| Marketplace | frozen Marketplace owners | global availability and scoped state must preserve immutable assets and owner boundaries |
| AI coordination | Core AI Coordinator | no regional or country-specific second coordinator |
| Operating System facts | applicable independent Operating System | global participation must not move OS facts into Core |
| Audit Record | Core Audit Service | global evidence must not become a second Audit source |
| search, analytics, and reports | authorized projections | global views must never become canonical write models |

### 10.2 Boundaries that remain unknown

Discovery does not yet know:

- whether Region or Country becomes canonical reference data, context, configuration, or another
  governed concept;
- how legal entity relates to Business, Business Unit, Branch, or external legal identity;
- how jurisdiction is selected when country, legal entity, operational location, customer,
  transaction, data subject, and service location differ;
- how Workspace defaults and Business-specific context interact across countries;
- how global administrative scope is represented and authorized;
- how cross-region collaboration is distinguished from cross-region data access;
- how residency obligations affect existing canonical owners;
- how global reporting avoids incompatible jurisdictional aggregation; and
- which global concerns belong in shared policy versus owner-domain behavior.

## 11. Platform Principles

The problem space is constrained by the following already-frozen principles:

1. Business before software.
2. Domain First and canonical ownership.
3. Single source of truth.
4. Explicit tenant, organization, resource, and Permission context.
5. Tenant isolation by default.
6. Projection is never ownership.
7. Read models are disposable.
8. Configuration over code.
9. Version everything that evolves.
10. Backward compatibility and governed migration.
11. Security, least privilege, privacy, and Auditability by default.
12. Immutable published assets and scoped activation.
13. AI assists and never owns Business facts.
14. Human approval for consequential decisions.
15. Independent Operating Systems.
16. Optional, failure-isolated cross-OS interaction.
17. No shared database or hidden cross-domain writer.
18. Physical extraction only through measured evidence and change control.

These principles constrain Discovery; they do not determine a Global Platform design.

## 12. Global Expansion Principles to Validate

The following are candidate interpretations requiring validation against the missing Genesis
source and future Proposal review:

- global expansion should extend existing identities rather than duplicate them;
- country, language, currency, and compliance behavior should be data-driven rather than
  hardcoded per application;
- presentation formatting should remain separate from canonical values;
- Workspace defaults should not erase Business-specific facts;
- one country's policy should not silently apply to another country;
- cross-region collaboration should not imply cross-region authorization;
- global aggregation should remain explicit, permission-filtered, and non-canonical;
- country-aware Knowledge and Rules should be selected by applicability and exact version;
- Marketplace availability should remain separate from Workspace acquisition, Installation,
  Activation, and Business Applicability;
- global AI participation should remain under one AI Coordinator and current context;
- global scale should not create a hard cross-OS dependency; and
- operational expansion should follow evidence, approved service objectives, recovery policy,
  and change control.

These are discovery hypotheses only.

## 13. Platform Governance Problem Space

Global Platform may intensify Governance concerns because country, jurisdiction, privacy,
commercial, operational, partner, and developer requirements can conflict or evolve
independently.

Questions to investigate include:

- which global changes require an ADR;
- how country-specific policy becomes versioned and auditable;
- how authoritative sources and effective periods are represented;
- how conflicting jurisdictional requirements are escalated;
- how customers review consequential global-context changes;
- how partner and developer participation is governed;
- how deprecation and migration preserve existing consumers;
- how global rollout readiness is reviewed;
- how emergency restrictions preserve evidence and ownership; and
- how a successor Freeze records global evolution.

No Governance body, policy, state, or workflow is approved here.

## 14. Identity and Organization Problem Space

### 14.1 Global Identity

Global Identity does not currently authorize a new identity model. Discovery must determine how
existing Core identities are interpreted across country and regional contexts while preserving:

- one canonical human or service identity;
- Workspace Membership and current authorization;
- explicit Business, Business Unit, Department, Branch, and resource scope;
- language and locale preferences without identity duplication;
- tenant isolation; and
- auditable Delegation and administrative access under future approved policy.

### 14.2 Workspace Identity

Workspace remains the highest tenant boundary. Global discovery must examine:

- whether a Workspace may span countries and regions;
- how Workspace country, language, timezone, and currency defaults behave;
- whether defaults are merely presentation context or have legal meaning;
- how Workspace-level policy coexists with Business-specific requirements;
- how explicit Workspace intelligence aggregation works across countries; and
- how global Workspace views avoid becoming canonical Business truth.

### 14.3 Organization Identity

Core Organization Registry retains organization identity and parent relationships. Discovery
must examine whether existing Business, Business Unit, Department, and Branch references are
sufficient for:

- regional management;
- country-specific operations;
- cross-country reporting scope;
- legal and tax applicability;
- administrative Delegation; and
- future Operating System participation.

No new hierarchy level is approved.

### 14.4 Legal Entity Boundaries

The relationship between Business identity and legal entity is unresolved. Discovery must not
assume that Business, Business Unit, Branch, billing identity, tax registration, or legal entity
are equivalent.

Questions include whether one Business may relate to multiple legal entities, whether one legal
entity may cover multiple Businesses, how Branch location affects legal obligations, and which
existing owner holds each canonical fact. Those questions remain open.

## 15. Region and Country Problem Space

### 15.1 Region Model — conceptual only

No canonical Region model is approved. Region could mean geographic grouping, operational
management scope, legal zone, data-residency grouping, commercial market, reporting grouping, or
presentation convenience. These meanings must not be conflated.

Discovery must determine:

- whether Region is required at all;
- whether Region is shared reference information or tenant-defined context;
- whether a Business may participate in multiple Regions;
- whether Region affects authorization;
- whether Region affects residency or compliance; and
- whether Region has any lifecycle independent of Country.

### 15.2 Country Model — conceptual only

Country already appears in Business DNA, Workspace context, Knowledge, Rules, Product Hub,
Marketplace compatibility and distribution, Business Brain inputs, Commerce tax context, and AI
eligibility. The canonical meaning and source of each use are not globally consolidated.

Discovery must separate:

- Business country;
- Workspace default country;
- organization and Branch operating country;
- legal-registration country;
- customer or counterparty country;
- transaction and tax country;
- data-subject country;
- residency location or permitted region;
- Marketplace availability country; and
- Knowledge or Rule applicability country.

No precedence among these meanings is approved.

## 16. Localization and Internationalization Problem Space

### 16.1 Localization

Core Settings and Localization Context already resolves language, locale, direction, timezone,
and currency context. Global Platform must not create a competing localization owner.

Discovery must examine:

- platform and OS label localization;
- customer-facing document localization;
- fallback behavior when content is unavailable;
- user-specific versus Workspace or Business preferences;
- RTL/LTR behavior;
- localized statuses and Marketplace content;
- translation governance and quality; and
- preservation of user-entered Business data as entered.

### 16.2 Internationalization

Internationalization concerns the ability of existing experiences and owner domains to represent
multiple global contexts without hardcoded assumptions. Discovery must examine whether every
frozen concept can remain stable while its presentation and applicability vary.

No internationalization framework, storage representation, or implementation method is selected.

### 16.3 Language Strategy

Language questions include:

- user preference versus Workspace or Business default;
- content availability and fallback;
- translated platform labels versus user-entered content;
- multilingual Marketplace descriptions and Knowledge;
- AI request and response language under current authorization;
- language-specific search behavior;
- document language requirements; and
- historical meaning when translations change.

### 16.4 Timezone Strategy

Timezone questions include:

- Workspace default versus Business, Branch, user, transaction, or report context;
- storage-independent canonical instants versus displayed local time;
- daylight-saving and historical timezone change;
- cross-timezone effective periods;
- scheduling and deadline interpretation;
- Audit and Event chronology;
- global reporting cutoffs; and
- legal-document time requirements.

No temporal model is approved.

### 16.5 Currency Strategy

Currency questions include:

- Workspace default versus Business, legal entity, Branch, Plan, transaction, or report currency;
- canonical monetary value and display currency separation;
- exchange-rate source, version, effective time, and correction;
- rounding and minor-unit behavior;
- multi-currency aggregation;
- Marketplace commercial currency;
- Commerce pricing, payment, refund, tax, and document boundaries; and
- auditability of historical conversions.

No exchange-rate, conversion, valuation, or accounting behavior is approved.

### 16.6 Number Formatting

Discovery must distinguish canonical numeric values from locale-specific presentation, including
decimal separators, digit systems, grouping, percentages, measurements, signs, rounding display,
and input normalization. Formatting must not mutate canonical facts.

### 16.7 Address Strategy

Addresses may represent Workspace defaults, Business identity, Branch operational location,
billing/legal address, customer address, delivery location, Marketplace Publisher address, or
another owner-specific fact.

Discovery must determine which existing owner controls each address, how country-specific formats
and validation differ, how optional fields are represented, how historical addresses are
preserved, and how privacy limits exposure. No universal address schema is approved.

## 17. Jurisdiction, Compliance, Residency, and Privacy Problem Space

### 17.1 Tax Jurisdiction — conceptual only

Commerce OS retains tax application and operational tax facts. Knowledge and Rules owners retain
country and compliance knowledge. Global Platform must not become a tax engine or tax record
owner.

Discovery must examine how applicable jurisdiction is identified, which facts are inputs, which
owner performs deterministic validation, which versions and evidence are retained, and how
conflicting or changing obligations are handled.

### 17.2 Compliance Boundaries

Global Platform must not claim compliance or invent official Rules. Discovery must explore:

- country and industry applicability;
- authoritative sources and versioning;
- legal effective periods;
- certification and evidence;
- customer obligations versus platform obligations;
- OS-specific compliance responsibilities;
- Marketplace Publisher and Asset obligations;
- AI and provider obligations; and
- incident and change communication.

### 17.3 Data Residency — conceptual only

Residency is deferred across Core, Business Brain, Marketplace, Commerce OS, and AI Expert
Network. Discovery must identify which categories of data and evidence may be subject to residency
without choosing physical locations or movement mechanisms.

Questions include source-owner responsibility, Workspace choice, jurisdictional mandates,
cross-region access, backups, exports, support access, AI provider use, analytics, search, Audit,
and legal hold.

### 17.4 Privacy Boundaries

Privacy must preserve purpose, minimization, tenant isolation, authorization, access, export,
retention, deletion, anonymization, masking, consent, residency, and legal-hold obligations under
future approved policy.

Discovery must identify where privacy context is evaluated without creating a second privacy
owner or allowing global reporting, search, AI, support, or administration to bypass canonical
owners.

## 18. Cross-Region Collaboration and Isolation

### 18.1 Cross-Region Collaboration

Potential collaboration includes authorized users, Businesses, Business Units, Branches,
Operating Systems, Marketplace assets, Knowledge, reports, and AI across regional contexts.

Discovery must distinguish collaboration from:

- ownership transfer;
- tenant merging;
- automatic cross-country access;
- shared write authority;
- global ordering;
- global transactions; and
- mandatory cross-OS dependency.

### 18.2 Cross-Region Isolation

Workspace isolation remains mandatory. Narrower isolation may also be required by Business,
Business Unit, Department, Branch, resource, jurisdiction, residency, confidentiality, or
purpose.

Discovery must determine how conflicting isolation requirements are expressed, evaluated,
audited, and revoked without approving mechanisms.

## 19. Multi-Tenant Global Model

The current tenant model is Workspace-first. Global discovery must preserve:

- Workspace as highest tenant boundary;
- Business-scoped Business DNA;
- explicit Workspace intelligence aggregation;
- scoped Marketplace acquisition and use;
- explicit authorization for every narrower resource;
- no typed or country-specific Workspace variants;
- no shared database assumption across Operating Systems;
- no global administrative bypass; and
- no global projection as a canonical write source.

Open questions remain about multi-country Workspace policy, regional administration, data-subject
scope, cross-Workspace partner access, and enterprise reporting.

## 20. Globalization Relationships with Frozen Milestones

### 20.1 Marketplace Globalization

Marketplace already owns shared immutable Assets, Marketplace Asset Versions, Publisher,
Distribution, commercial state, and scoped lifecycle facts according to its Freeze.

Global discovery must examine country and jurisdiction availability, language presentation,
License and Offer applicability, Publisher eligibility, tax and commercial obligations,
certification, compatibility, support, privacy, and regional operations without changing
Marketplace ownership or resolving `DD-MP-01` through `DD-MP-50`.

### 20.2 Commerce OS Globalization

Commerce OS remains independently usable and retains Product, Price, Stock, Order, customer,
Payment, Refund, Tax Application, Commerce Document, Return, adjustment, setup, readiness, and
reporting ownership according to its Freeze.

Global discovery must examine multi-country setup, currency, tax jurisdiction, document language,
numbering, address, retention, privacy, Branch location, cross-country reporting, and migration
without changing Commerce ownership or resolving `DD-01` through `DD-40`.

### 20.3 Business Brain Globalization

Business Brain retains deterministic, reproducible, provider-independent Decision ownership.
Global discovery must examine how authorized country, language, stage, Knowledge, Rules,
compliance, goals, and explicit Workspace aggregation become inputs without merging Business DNA,
duplicating Knowledge, or making AI part of Decision formation.

### 20.4 AI Expert Network Globalization

AI Expert Network remains inside one AI Coordination Domain and one AI Coordinator. Global
discovery must examine country and language eligibility, provider and model policy, privacy,
residency, evidence, cross-region context, Marketplace publication, safety, support, and global
operation while preserving the frozen publication-path owner and `DD-AEN-01` through
`DD-AEN-24`.

### 20.5 Configuration Globalization

Configuration Engine retains Configuration Proposal. Each target owner independently validates
and applies target state. Global discovery must examine how country, language, currency,
jurisdiction, and policy context influence proposals without creating automatic application or a
global target writer.

### 20.6 Knowledge Globalization

Knowledge Engine retains Knowledge. Existing Genesis recognizes Country Packs, country Rules,
currency Rules, compliance, labor law, and holiday context. Discovery must examine applicability,
source authority, versioning, translation, conflict, expiry, supersession, and cross-country use
without copying Knowledge into Global Platform.

### 20.7 Recommendation Globalization

Recommendation Engine retains Recommendation identity, explanation, lifecycle, disposition, and
feedback. Discovery must examine how country, language, Plan, compatibility, compliance, and
Business context affect recommendations without creating a separate global Recommendation.

### 20.8 Core Platform Globalization

Core retains identity, organization, settings, localization, commercial control, Product Hub,
Permission foundation, Audit, Search, Analytics, Navigation, API architecture, and AI
coordination according to its Freeze.

Discovery must examine extension of those existing boundaries without duplicating their source
records or assuming physical extraction.

### 20.9 Future Operating Systems

Every future Operating System must remain standalone, own its operational facts and workflows,
consume shared context through frozen boundaries, and localize without requiring another OS.

Global Platform must not become an umbrella operational Domain for future OS facts.

## 21. Operating System Independence

Global expansion must preserve the Golden Rule that each Operating System completes its core
workflow independently.

Discovery must investigate:

- optional cross-country and cross-OS collaboration;
- compatible context handoff;
- country-aware setup and readiness;
- OS-specific legal and compliance behavior;
- shared localization participation;
- failure isolation;
- owner-controlled projections; and
- backward-compatible evolution.

No shared operational write model, unified global OS workflow, or mandatory dependency is
approved.

## 22. Global Experience Problem Space

### 22.1 Global Navigation

Navigation Coordination remains a Core responsibility. Global discovery must examine how users
move across public, Core, Marketplace, setup, and OS operational surfaces while preserving:

- Workspace and Business context;
- optional Region and Country context if later approved;
- language and direction;
- Permission and entitlement;
- Product Hub and owner-specific navigation;
- deep-link context integrity;
- no single hardcoded global menu; and
- no hidden context switch.

### 22.2 Global Administration

Global Administration is a problem label, not an approved Component or role. Discovery must
examine authorized enterprise oversight, Delegation, regional administration, country-specific
restriction, support access, emergency access, separation of duties, Audit, and revocation.

No global superuser or cross-tenant administrative authority is approved.

### 22.3 Global Reporting

Global Reporting must remain an authorized projection over owner-controlled facts. Discovery must
examine currency normalization, timezone cutoffs, jurisdictional comparability, Business and
Workspace aggregation, privacy, lineage, freshness, correction, and drill-down without making a
report canonical truth.

### 22.4 Global Search

Search Coordination remains a shared projection pattern. Discovery must examine multilingual
search, locale-sensitive relevance, country applicability, tenant and resource filtering,
residency, deletion, freshness, source attribution, and cross-OS results without transferring
ownership.

## 23. Platform Observability — Conceptual Only

Global observability must preserve the separation among operational telemetry, domain facts, and
append-only Audit Records.

Discovery must examine:

- cross-region correlation;
- tenant-safe logs, metrics, traces, alerts, and dashboards;
- service-objective differences by country or customer commitment;
- privacy and residency of telemetry;
- regional failure and degradation visibility;
- dependency and cross-OS health;
- Marketplace and AI participation;
- capacity and demand evidence;
- incident evidence; and
- long-term historical analysis.

No telemetry technology, location, transport, retention period, service objective, or dashboard
design is selected.

## 24. Operational Considerations

Global operations may require investigation of:

- customer and partner support coverage;
- service objectives and error budgets;
- incident classification, escalation, and communication;
- continuity, backup, recovery, and restore expectations;
- regional or jurisdictional restriction changes;
- country launch and withdrawal readiness;
- operational ownership across Core, Marketplace, AI, and Operating Systems;
- capacity and cost visibility;
- certification and compliance evidence;
- emergency controls and later reconciliation;
- change windows and effective periods; and
- customer migration and rollback obligations.

These are operational questions, not approved processes.

## 25. Migration Considerations

Discovery must identify potential migration concerns without approving a migration design:

- existing Workspace, Business, Branch, country, language, timezone, and currency values;
- ambiguous or missing country context;
- historical records created under earlier formatting or policy;
- Business DNA versions and source evidence;
- Knowledge and Rule version applicability;
- Marketplace Asset and scoped-state history;
- Commerce price, tax, document, payment, and reporting history;
- Recommendation, Configuration Proposal, and Decision history;
- AI Interaction and provider evidence;
- identity and Permission continuity;
- search and analytics rebuildability;
- rollback, reconciliation, and auditability; and
- compatibility for existing consumers.

No data conversion, sequencing, dual-write, cutover, or rollback mechanism is approved.

## 26. Scalability Considerations

Global scale may increase Workspaces, Businesses, countries, languages, currencies, Marketplace
Assets, Operating Systems, users, transactions, Decisions, Recommendations, AI Interactions,
search projections, analytics signals, and operational evidence.

Discovery must examine:

- measured demand and capacity evidence;
- owner-local scaling without ownership change;
- failure isolation and backpressure expectations;
- global ordering assumptions to avoid;
- consistency and freshness needs by concern;
- expensive or slow jurisdictional evaluation;
- growth of immutable history and Audit evidence;
- projection rebuild and recovery expectations;
- operational cost and service objectives;
- Marketplace and partner growth;
- optional extraction criteria; and
- backward-compatible migration if extraction is ever justified.

No service extraction, physical topology, capacity target, or scaling mechanism is approved.

## 27. Dependencies

### 27.1 External dependencies

Potential external dependencies to investigate include:

- authoritative country and jurisdiction sources;
- official tax and compliance sources;
- language and locale standards;
- timezone and currency reference authorities;
- address and postal conventions;
- privacy and data-residency obligations;
- legal-entity and registration evidence;
- partner and Publisher obligations;
- certification authorities; and
- customer-specific legal and operational commitments.

This list approves no provider or source.

### 27.2 Internal dependencies

Global Platform Discovery depends on the frozen boundaries of:

- Core identity, organization, Membership, Permission, settings, localization, Product Hub,
  commercial control, Audit, Navigation, Search, Analytics, and Security;
- Business-scoped Business DNA and explicit Workspace aggregation;
- versioned Knowledge, Knowledge Packs, and deterministic Rules;
- Business Brain Decision and Recommendation Engine;
- Configuration Engine and target-owner application;
- Marketplace shared assets and scoped state;
- Commerce OS and future independent OSs;
- AI Coordinator and AI Expert Network;
- existing API, Event, observability, deployment, and change-control principles without defining
  their future details; and
- all inherited Deferred Decision registers.

### 27.3 Blocking discovery dependency

The missing `docs/01-genesis/21-GLOBAL-PLATFORM.md` is the primary blocking dependency. Its
authority, scope, and intended relationship to Genesis v1.1 must be established before a
Capability Map or Proposal can be considered complete.

## 28. Candidate Capability Themes

The following are candidate discovery themes only. They are not approved Capabilities, Domains,
Components, services, ownership areas, or implementation units.

| ID | Candidate capability theme | Problem to explore | Never implies |
|---|---|---|---|
| GPCT-01 | Global Context Interpretation | identify applicable global context without hidden precedence | a new canonical context owner |
| GPCT-02 | Region Context | distinguish geographic, operational, legal, commercial, and residency meanings | an approved Region model |
| GPCT-03 | Country Context | distinguish Business, operational, legal, tax, customer, and applicability country | one universal country field |
| GPCT-04 | Localization Context | resolve presentation preferences through existing Core boundaries | duplicate localization ownership |
| GPCT-05 | Internationalized Representation | represent varied contexts without hardcoding | an implementation framework |
| GPCT-06 | Language and Direction | support language, fallback, RTL/LTR, and content distinction | translation of canonical user data |
| GPCT-07 | Timezone Interpretation | preserve local presentation and historical temporal meaning | an approved temporal model |
| GPCT-08 | Currency Interpretation | separate monetary truth, presentation, and possible conversion questions | conversion or accounting ownership |
| GPCT-09 | Number Formatting | preserve canonical numeric values across locale presentation | formatted text as canonical value |
| GPCT-10 | Address Interpretation | support owner-specific and country-specific address meanings | a universal address owner |
| GPCT-11 | Tax Jurisdiction Context | identify conceptual applicability inputs and owner boundaries | a Global Platform tax engine |
| GPCT-12 | Legal Entity Context | clarify relationship to Business and operational organization | an approved legal-entity model |
| GPCT-13 | Compliance Applicability | identify source, version, evidence, and effective-context questions | a compliance claim or new Rule owner |
| GPCT-14 | Data Residency Context | identify data categories and applicable restrictions conceptually | physical placement architecture |
| GPCT-15 | Privacy Applicability | preserve purpose, minimization, rights, and scope questions | a second privacy authority |
| GPCT-16 | Cross-Region Collaboration | explore authorized collaboration without owner transfer | automatic cross-region access |
| GPCT-17 | Cross-Region Isolation | explore narrower jurisdictional and residency isolation | a new tenant boundary by default |
| GPCT-18 | Global Tenant Context | preserve Workspace-first tenancy across countries | a global tenant or merged Workspaces |
| GPCT-19 | Marketplace Global Participation | explore availability, commercial, assurance, and scoped use concerns | Marketplace ownership change |
| GPCT-20 | Commerce Global Participation | explore tax, currency, document, address, and reporting concerns | Commerce ownership change |
| GPCT-21 | Business Intelligence Global Context | explore Business Brain inputs and explicit aggregation | Decision or Business DNA duplication |
| GPCT-22 | Knowledge and Rule Global Applicability | explore country-aware source, version, conflict, and expiry | copied Knowledge or Rule truth |
| GPCT-23 | Recommendation and Configuration Global Context | explore context effects while preserving separate owners | automatic target application |
| GPCT-24 | AI Expert Global Participation | explore language, country, provider, privacy, and residency constraints | a second AI Coordinator |
| GPCT-25 | Independent OS Global Participation | explore country-aware OS behavior and optional collaboration | shared OS operational truth |
| GPCT-26 | Global Navigation | preserve explicit context across surfaces | one hardcoded global menu |
| GPCT-27 | Global Administration | explore governed enterprise and regional oversight | a cross-tenant superuser |
| GPCT-28 | Global Reporting and Search | explore authorized projections across context | a canonical global write model |
| GPCT-29 | Global Operational Visibility | explore observability, incident, continuity, and capacity concerns | operational telemetry as business truth |
| GPCT-30 | Global Migration and Scale | explore compatibility, history, growth, and measured evolution | physical design or premature extraction |

**Candidate capability theme count: 30**

## 29. Candidate Responsibility Questions

The following table identifies responsibility areas to investigate. It does not assign owners.

| Responsibility question | Existing frozen constraint | Required future clarification |
|---|---|---|
| resolve global context | explicit current context and one owner per fact | sources, precedence, freshness, explanation, and failure behavior |
| interpret Region and Country | no approved consolidated model | meanings, identifiers, lifecycle, and applicability |
| present localized experiences | Core Settings and Localization remains authoritative | preference hierarchy, fallback, quality, and historical behavior |
| interpret time and currency | owner facts remain canonical | local display, effective periods, conversion, and aggregation boundaries |
| determine jurisdiction | owner domains retain validation | applicable facts, Rule sources, conflict, and evidence |
| protect privacy and residency | Core Security principles and owner data boundaries | classification, rights, consent, retention, location, and access |
| support cross-region work | Workspace isolation and explicit authorization | collaboration scope, isolation, Delegation, and auditability |
| globalize Marketplace participation | Marketplace Freeze remains controlling | country, commercial, assurance, support, and policy detail |
| globalize Commerce participation | Commerce Freeze remains controlling | setup, tax, documents, currency, reporting, and retention detail |
| globalize intelligence | existing intelligence owners remain controlling | applicable context, exact versions, aggregation, and explanation |
| globalize AI participation | one AI Coordinator and publication-path ownership | provider, language, residency, safety, support, and operations |
| support global navigation and administration | Core Navigation and Permission boundaries | visible context, oversight, Delegation, and emergency behavior |
| provide global reporting and search | projections never own source truth | normalization, comparability, privacy, freshness, and lineage |
| operate and evolve globally | frozen deployment and observability principles | service objectives, recovery, migration, capacity, and change control |

## 30. Major Global Concerns

| ID | Major concern | Why it matters |
|---|---|---|
| MGC-01 | missing Genesis Global Platform authority | complete intended scope and principles cannot be confirmed |
| MGC-02 | Region and Country semantic ambiguity | conflated meanings could create incorrect policy and ownership |
| MGC-03 | identity, organization, and legal-entity separation | duplication could break the frozen hierarchy and tenant model |
| MGC-04 | localization, language, and direction | inconsistent presentation could distort canonical meaning or exclude users |
| MGC-05 | time, currency, number, and address interpretation | hidden assumptions could corrupt historical, monetary, or legal meaning |
| MGC-06 | jurisdiction, tax, and compliance applicability | wrong precedence could create legal and operational exposure |
| MGC-07 | privacy, residency, retention, and legal hold | conflicting obligations could block lawful operation or data access |
| MGC-08 | cross-region collaboration and isolation | convenience could bypass authorization or tenant boundaries |
| MGC-09 | multi-tenant global operation | global aggregation could become a parallel tenant or source of truth |
| MGC-10 | Marketplace and ecosystem globalization | distribution and commercial expansion could bypass scoped lifecycle rules |
| MGC-11 | Commerce and future OS globalization | shared concerns could leak operational ownership into Core |
| MGC-12 | Knowledge, Business Brain, Recommendation, Configuration, and AI globalization | global context could fragment intelligence or create duplicate owners |
| MGC-13 | navigation, administration, reporting, and search | cross-context views could hide scope or become unauthorized write paths |
| MGC-14 | observability, operations, migration, and recovery | global rollout could exceed unapproved operational foundations |
| MGC-15 | scalability, partners, developers, and long-term evolution | growth could trigger premature extraction or ungoverned external access |

**Major global concern count: 15**

## 31. Risks

| ID | Discovery risk | Potential consequence | Discovery treatment |
|---|---|---|---|
| GPR-01 | missing Genesis `21-GLOBAL-PLATFORM.md` | incomplete or misdirected problem space | block Capability Map readiness |
| GPR-02 | Region meanings are conflated | incorrect scope, policy, reporting, or residency behavior | preserve separate questions |
| GPR-03 | Country meanings are conflated | wrong tax, compliance, Marketplace, or Business context | enumerate meanings without precedence |
| GPR-04 | Global Identity becomes a duplicate identity model | conflicting users, services, Membership, or Audit | preserve Core identity boundary |
| GPR-05 | legal entity is silently equated with Business or Branch | ownership and compliance errors | keep relationship unresolved |
| GPR-06 | Workspace defaults override Business facts | Business DNA and operational context corruption | preserve scope distinctions |
| GPR-07 | localization mutates canonical user-entered data | loss of legal or historical meaning | preserve presentation/source separation |
| GPR-08 | timezone assumptions corrupt effective periods | incorrect lifecycle, reports, Audit, or documents | keep temporal strategy unresolved |
| GPR-09 | currency conversion is treated as formatting | inaccurate money, tax, refunds, or reports | separate value, display, and conversion questions |
| GPR-10 | universal address assumptions exclude countries | invalid legal, billing, delivery, or identity data | keep owner-specific address questions |
| GPR-11 | Global Platform becomes a tax or compliance owner | duplicate Rules and OS facts | preserve Knowledge, Rules, and target owners |
| GPR-12 | conflicting jurisdictions are silently prioritized | legal, privacy, tax, or operational breach | require future governed precedence |
| GPR-13 | residency is treated as an infrastructure shortcut | owner, privacy, backup, export, or support conflict | keep residency conceptual and deferred |
| GPR-14 | global administration bypasses tenant scope | cross-tenant exposure and unaudited authority | preserve explicit authorization questions |
| GPR-15 | cross-region collaboration implies shared writes | duplicate truth and circular ownership | preserve owner-local writes |
| GPR-16 | global reporting becomes canonical truth | hidden write model and incorrect aggregation | preserve projection boundary |
| GPR-17 | multilingual search leaks or misranks data | authorization, relevance, and privacy harm | preserve filtering and source attribution questions |
| GPR-18 | Marketplace country expansion bypasses lifecycle gates | unauthorized distribution, activation, or use | preserve Marketplace Freeze and deferrals |
| GPR-19 | Commerce global concerns move into Core | Commerce ownership leakage | preserve Commerce owner boundaries |
| GPR-20 | country Knowledge or Rules are copied per OS | fragmented intelligence and inconsistent compliance | preserve versioned shared sources |
| GPR-21 | AI provider or Expert context crosses regions improperly | privacy, residency, authorization, and evidence harm | preserve AI deferrals and one Coordinator |
| GPR-22 | a global layer creates cross-OS hard dependency | Operating Systems cannot work standalone | preserve optional integration |
| GPR-23 | global rollout precedes operational policy | weak incident, capacity, continuity, and recovery behavior | keep rollout readiness unresolved |
| GPR-24 | premature physical extraction is labeled global scale | complexity, ownership drift, and migration risk | require measured evidence and change control |

**Risk count: 24**

## 32. Assumptions

### 32.1 Frozen assumptions

The following are inherited facts, not Global Platform decisions:

1. Workspace is the highest tenant boundary.
2. Each Business owns separate Business DNA.
3. Workspace intelligence aggregation is explicit.
4. Core owns identity and organization identity.
5. Settings and Localization Context is a Core concept.
6. user-entered Business data remains as entered and is not automatically translated.
7. Knowledge, Rules, Capability, Decision, Recommendation, Configuration Proposal, Marketplace,
   AI, Audit, and OS facts retain their frozen owners.
8. Marketplace Assets are shared and immutable by version; Workspace state is scoped.
9. AI operates through one AI Coordinator and never owns Business facts.
10. each Operating System remains independently usable.
11. cross-OS integration remains optional.
12. projections never become canonical ownership.
13. explicit context and least privilege remain mandatory.
14. architecture change requires ADR, Architecture Review, successor Freeze, and Readiness.

### 32.2 Working assumptions to validate

The following are not approved and require evidence:

1. one Workspace may need to operate across multiple countries;
2. one Business may need multiple country or legal contexts;
3. Region may be useful for management but may not be a canonical organization level;
4. country applicability may differ by fact, action, Asset, user, and time;
5. language, locale, timezone, and currency may have different preference hierarchies;
6. global reporting may require normalization without changing source facts;
7. Marketplace and AI participation may require country-specific eligibility;
8. global operations may require stricter privacy, residency, and support policy;
9. existing contexts may require governed migration; and
10. scale alone may not justify physical extraction.

## 33. Unknowns

1. The content and authority of `docs/01-genesis/21-GLOBAL-PLATFORM.md` are unknown.
2. The intended definition of Global Platform is not available as a dedicated Genesis artifact.
3. The canonical meaning, source, and lifecycle of Region are unknown.
4. The canonical meaning and precedence of Country across contexts are unknown.
5. The relationship between Business and legal entity is unknown.
6. The relationship between organization location and jurisdiction is unknown.
7. localization preference precedence is unknown.
8. translation governance and fallback policy are unknown.
9. canonical temporal and currency semantics are unknown.
10. global address representation and ownership detail are unknown.
11. tax-jurisdiction selection and conflict policy are unknown.
12. compliance applicability and evidence policy are unknown.
13. privacy and residency classification are unknown.
14. cross-region access, collaboration, and isolation rules are unknown.
15. global administration and Delegation policy are unknown.
16. global reporting comparability and normalization rules are unknown.
17. global operational readiness and country rollout criteria are unknown.
18. migration and scale thresholds are unknown.

## 34. Open Questions

All questions remain unanswered.

### 34.1 Authority, mission, and scope — GPOQ-01 through GPOQ-06

1. **GPOQ-01:** What is the authoritative content and status of the missing Genesis
   `21-GLOBAL-PLATFORM.md`?
2. **GPOQ-02:** Does Global Platform describe a milestone, an expansion posture, a platform layer,
   or another concept?
3. **GPOQ-03:** Which outcomes are mandatory for Global Platform and which belong to later
   implementation or future milestones?
4. **GPOQ-04:** Which inherited Deferred Decisions must be resolved before Proposal versus later
   bounded work?
5. **GPOQ-05:** What evidence proves that earlier milestones are operationally mature enough for
   global expansion?
6. **GPOQ-06:** What conditions would make Global Platform explicitly out of scope for a Workspace
   or Business?

### 34.2 Identity, Workspace, organization, and legal entity — GPOQ-07 through GPOQ-12

7. **GPOQ-07:** How does one Core identity operate across countries without identity duplication?
8. **GPOQ-08:** Can one Workspace span multiple countries and Regions, and what remains a default
   rather than a fact?
9. **GPOQ-09:** Are the existing Business, Business Unit, Department, and Branch identities
   sufficient for regional management?
10. **GPOQ-10:** What is a legal entity relative to Business, Business Unit, Branch, and billing
    identity?
11. **GPOQ-11:** Can multiple legal entities relate to one Business or vice versa?
12. **GPOQ-12:** Which owner holds legal registration, operating location, and jurisdictional
    evidence without duplicating organization identity?

### 34.3 Region, Country, and context precedence — GPOQ-13 through GPOQ-18

13. **GPOQ-13:** Is Region required, and which distinct meanings must it represent or avoid?
14. **GPOQ-14:** Is Region shared reference information, tenant-defined context, or something else?
15. **GPOQ-15:** Which Country meanings are canonical, referenced, derived, or presentational?
16. **GPOQ-16:** How is applicable Country selected when Business, Branch, customer, transaction,
    legal entity, and data-subject countries differ?
17. **GPOQ-17:** How are context precedence, freshness, effective time, and explanation represented?
18. **GPOQ-18:** What happens when required Region, Country, or jurisdiction context is absent,
    ambiguous, stale, or conflicting?

### 34.4 Localization, language, and internationalization — GPOQ-19 through GPOQ-24

19. **GPOQ-19:** What is the preference order among user, Workspace, Business, OS, document, and
    customer language or locale?
20. **GPOQ-20:** What content is translated, localized, preserved as entered, or unavailable?
21. **GPOQ-21:** What fallback behavior applies when a translation or locale variant is missing?
22. **GPOQ-22:** How are RTL/LTR, localized labels, and user-entered data kept distinct?
23. **GPOQ-23:** How are translation provenance, version, review, correction, and historical meaning
    governed?
24. **GPOQ-24:** How do Marketplace, Knowledge, Search, AI, Commerce Documents, and future OSs
    participate without duplicating localization ownership?

### 34.5 Time, currency, number, and address — GPOQ-25 through GPOQ-30

25. **GPOQ-25:** What precedence applies among Workspace, Business, Branch, user, transaction, and
    report timezone?
26. **GPOQ-26:** How are daylight-saving, historical timezone changes, deadlines, and reporting
    cutoffs interpreted?
27. **GPOQ-27:** What distinguishes canonical monetary values, display currency, transaction
    currency, settlement currency, and reporting currency?
28. **GPOQ-28:** Who supplies exchange-rate identity, version, effective time, correction, and
    evidence if conversion is required?
29. **GPOQ-29:** How are number, measurement, minor-unit, rounding-display, and input conventions
    represented without changing canonical values?
30. **GPOQ-30:** How do owner-specific addresses support country variation, validation, history,
    privacy, and legal use without a universal owner?

### 34.6 Tax, compliance, and legal applicability — GPOQ-31 through GPOQ-36

31. **GPOQ-31:** Which facts determine tax jurisdiction for each owner-domain action?
32. **GPOQ-32:** How do Knowledge, deterministic Rules, and OS validation collaborate without
    duplicate tax or compliance truth?
33. **GPOQ-33:** How are authoritative sources, versions, effective periods, evidence, and
    supersession governed?
34. **GPOQ-34:** How are conflicting jurisdictional obligations detected and escalated?
35. **GPOQ-35:** Which compliance obligations apply to platform, Workspace, Business, Publisher,
    Asset, AI provider, and Operating System respectively?
36. **GPOQ-36:** What approvals and customer controls are required for consequential compliance
    changes?

### 34.7 Privacy, residency, and isolation — GPOQ-37 through GPOQ-42

37. **GPOQ-37:** What data-classification scheme is required across canonical facts, projections,
    evidence, telemetry, exports, backups, and AI context?
38. **GPOQ-38:** Which privacy rights, consent, retention, deletion, anonymization, masking,
    export, and legal-hold obligations apply by context?
39. **GPOQ-39:** Which data categories have residency constraints and who determines
    applicability?
40. **GPOQ-40:** How are cross-region access, support, analytics, search, AI, Audit, and recovery
    constrained without choosing physical topology here?
41. **GPOQ-41:** What narrower isolation is required below Workspace by Business, organization,
    resource, jurisdiction, confidentiality, or purpose?
42. **GPOQ-42:** How are privacy and residency conflicts made visible and failed closed?

### 34.8 Cross-region collaboration and global tenancy — GPOQ-43 through GPOQ-48

43. **GPOQ-43:** Which cross-region collaboration scenarios are legitimate business needs?
44. **GPOQ-44:** How is collaboration distinguished from cross-region write authority or tenant
    merging?
45. **GPOQ-45:** Can a user or service operate across Regions, and what current scope must be
    reauthorized?
46. **GPOQ-46:** How are Delegation, separation of duties, emergency access, revocation, and Audit
    governed globally?
47. **GPOQ-47:** How does explicit Workspace aggregation remain non-canonical across countries?
48. **GPOQ-48:** How are cross-Workspace partner or support relationships constrained without a
    global administrative bypass?

### 34.9 Marketplace, Commerce, and Operating Systems — GPOQ-49 through GPOQ-54

49. **GPOQ-49:** How do country, jurisdiction, language, License, Offer, Publisher, certification,
    and support context affect Marketplace availability without changing Marketplace owners?
50. **GPOQ-50:** How do acquisition, Entitlement, Installation, Activation, Applicability, upgrade,
    and removal behave when global context changes?
51. **GPOQ-51:** How does Commerce handle multi-country setup, currency, tax, documents, addresses,
    payments, refunds, privacy, and reports while retaining sole ownership?
52. **GPOQ-52:** Which global concerns are shared platform context versus OS-specific operational
    facts?
53. **GPOQ-53:** How do future Operating Systems adopt global context while remaining standalone?
54. **GPOQ-54:** How are optional cross-country and cross-OS relationships versioned,
    authorized, observable, and failure-isolated without defining mechanisms here?

### 34.10 Intelligence, Configuration, and AI — GPOQ-55 through GPOQ-60

55. **GPOQ-55:** How are country-aware Knowledge and Rules selected, translated, versioned,
    expired, and reconciled without duplication?
56. **GPOQ-56:** How does Business Brain consume global context while preserving Business-scoped
    Decision and explicit Workspace aggregation?
57. **GPOQ-57:** How do Recommendations remain explainable when country, language, compliance,
    Marketplace, and Plan context differ?
58. **GPOQ-58:** How does Configuration Engine express global context without automatic target
    application or target-owner bypass?
59. **GPOQ-59:** How do AI Expert eligibility, language, country, provider, privacy, residency,
    evidence, and safety interact under one AI Coordinator?
60. **GPOQ-60:** How are learning and feedback governed across countries without rewriting Business
    DNA, Knowledge, Rules, Decision, Recommendation, Marketplace Trust, or OS facts?

### 34.11 Navigation, administration, reporting, and search — GPOQ-61 through GPOQ-66

61. **GPOQ-61:** Which contexts must Global Navigation display and preserve across Core,
    Marketplace, setup, and OS surfaces?
62. **GPOQ-62:** How are hidden context switches, stale scope, and unauthorized deep links
    prevented?
63. **GPOQ-63:** What global and regional administrative views are required, and what can they
    never do?
64. **GPOQ-64:** How are global reports normalized for currency, time, jurisdiction, lineage,
    privacy, and comparability without becoming source truth?
65. **GPOQ-65:** How does multilingual, country-aware Search preserve authorization, relevance,
    residency, deletion, freshness, and source attribution?
66. **GPOQ-66:** How do dashboards, exports, alerts, and notifications preserve context and owner
    boundaries?

### 34.12 Operations, migration, scale, and governance — GPOQ-67 through GPOQ-72

67. **GPOQ-67:** What service objectives, capacity evidence, incident policy, continuity,
    recovery, and customer communication are required before global rollout?
68. **GPOQ-68:** What country or regional launch, suspension, withdrawal, and recovery criteria are
    required?
69. **GPOQ-69:** How are existing country, locale, timezone, currency, address, privacy, and
    historical records migrated without changing meaning?
70. **GPOQ-70:** Which consistency, freshness, ordering, and failure-isolation expectations differ
    by concern?
71. **GPOQ-71:** What measured evidence and accepted ADR would justify any future physical
    extraction?
72. **GPOQ-72:** Which Proposal decisions, Draft ADR subjects, reviews, and exit criteria are
    required after the missing Genesis authority is restored?

**Open Question count: 72**

## 35. Proposal Readiness

### 35.1 Coverage assessment

| Discovery requirement | Result |
|---|---|
| mission, vision, goals, and non-goals | COVERED |
| problem statement and success criteria | COVERED |
| platform scope, boundaries, and principles | COVERED |
| global expansion and Governance concerns | COVERED |
| identity, Workspace, organization, Region, and Country concerns | COVERED |
| localization, internationalization, language, time, currency, number, and address concerns | COVERED |
| tax, legal entity, compliance, residency, and privacy concerns | COVERED |
| cross-region collaboration, isolation, and global tenancy concerns | COVERED |
| Marketplace, Commerce OS, Business Brain, AI, Configuration, Knowledge, Recommendation, and OS relationships | COVERED |
| navigation, administration, reporting, search, and observability concerns | COVERED |
| operational, migration, and scalability concerns | COVERED |
| candidate capability themes | 30, all explicitly unapproved |
| risks | 24, unresolved |
| Open Questions | 72, unanswered |
| requested Genesis Platform Ecosystem source | PRESENT |
| requested Genesis Global Platform source | MISSING |

### 35.2 Readiness blockers

The milestone is not ready for a Capability Map or Proposal because:

1. `docs/01-genesis/21-GLOBAL-PLATFORM.md` is missing;
2. the authoritative Global Platform mission, scope, non-scope, principles, and terminology
   cannot be confirmed;
3. the status and intended place of that document inside Genesis v1.1 are unknown;
4. 72 discovery questions remain intentionally unanswered; and
5. the candidate themes cannot be validated against the missing authority.

Open Questions are expected during Discovery and do not all need resolution before a Capability
Map. The missing named Genesis authority is different: it prevents validation that the map would
cover the correct problem space.

### 35.3 Required next action

Before Capability Map work begins, Governance must establish one of the following without this
Discovery choosing between them:

- restore the authoritative `docs/01-genesis/21-GLOBAL-PLATFORM.md`; or
- formally state that no such Genesis artifact governs Milestone 6 and name the complete
  alternative authority set.

After that action, this Discovery should be reviewed against the established authority. Any
material mismatch must be corrected through the Milestone Lifecycle before a Capability Map.

## 36. Discovery Conclusions

The available frozen baseline establishes a strong set of non-negotiable constraints for global
expansion: Workspace-first tenancy, Business-scoped Business DNA, Core identity and organization,
single-source ownership, independent Operating Systems, immutable Marketplace assets with scoped
state, deterministic Business Brain, one AI Coordinator, explicit context, Security, privacy,
Auditability, projection boundaries, versioning, backward compatibility, and governed evolution.

The currently discoverable Global Platform problem space includes multi-country and enterprise
context, Region and Country semantics, localization, language, timezone, currency, formatting,
addresses, jurisdiction, legal entities, compliance, privacy, residency, cross-region work,
globalized Marketplace and OS participation, globalized intelligence and AI context, navigation,
administration, reporting, search, observability, operations, migration, and scale.

These concerns are sufficiently visible to prevent premature design, but not sufficiently
authoritative to begin a Capability Map. The missing Genesis Global Platform document is a
material baseline gap and must not be replaced by inference.

# MORE DISCOVERY REQUIRED

## 37. References

### Governance

- [Governance Milestone Lifecycle](../00-governance/MILESTONE-LIFECYCLE.md)
- [Governance ADR Repository](../00-governance/ADR/README.md)
- [Governance Glossary](../00-governance/glossary/GLOSSARY.md)

### Genesis

- [Genesis Vision](../01-genesis/01-VISION.md)
- [Genesis Constitution](../01-genesis/02-CONSTITUTION.md)
- [Genesis Business DNA](../01-genesis/03-BUSINESS-DNA.md)
- [Genesis Knowledge Engine](../01-genesis/05-KNOWLEDGE-ENGINE.md)
- [Genesis Business Brain](../01-genesis/06-BUSINESS-BRAIN.md)
- [Genesis Recommendation Engine](../01-genesis/07-RECOMMENDATION-ENGINE.md)
- [Genesis AI Strategy](../01-genesis/08-AI-STRATEGY.md)
- [Genesis Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md)
- [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md)
- [Genesis Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md)
- [Genesis Business Lifecycle](../01-genesis/15-BUSINESS-LIFECYCLE.md)
- [Genesis Operating System Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)
- [Genesis Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [Genesis Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md)
- [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Genesis Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

Requested but unavailable: `docs/01-genesis/21-GLOBAL-PLATFORM.md`.

### Frozen milestone baselines

- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Core Platform Readiness v1.0.1](../99-architecture-freeze/CORE-PLATFORM-v1.0.1-READINESS.md)
- [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Business Brain Readiness](../99-architecture-freeze/BUSINESS-BRAIN-READINESS.md)
- [Commerce OS Freeze v1.0](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md)
- [Commerce OS Readiness](../99-architecture-freeze/COMMERCE-OS-READINESS.md)
- [Marketplace Freeze v1.0](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md)
- [Marketplace Readiness](../99-architecture-freeze/MARKETPLACE-READINESS.md)
- [AI Expert Network Freeze v1.0](../99-architecture-freeze/AI-EXPERT-NETWORK-v1.0-FREEZE.md)
- [AI Expert Network Readiness](../99-architecture-freeze/AI-EXPERT-NETWORK-READINESS.md)

### Detailed frozen architecture references

- [Core Platform Principles](../02-core-platform/00-CORE-PLATFORM-PRINCIPLES.md)
- [Core Platform Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)
- [Core Platform Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)
- [Core Platform Data Ownership](../02-core-platform/04-DATA-OWNERSHIP.md)
- [Core Platform Permission Model](../02-core-platform/05-PERMISSION-MODEL.md)
- [Core Platform Security Model](../02-core-platform/08-SECURITY-MODEL.md)
- [Core Platform Observability](../02-core-platform/09-OBSERVABILITY.md)
- [Core Platform Roadmap](../02-core-platform/12-CORE-PLATFORM-ROADMAP.md)
- [Business Brain Final Architecture Review](../03-business-brain/12-BUSINESS-BRAIN-ARCHITECTURE-REVIEW.md)
- [Commerce OS Final Architecture Review](../04-commerce-os/09-COMMERCE-OS-FINAL-ARCHITECTURE-REVIEW.md)
- [Marketplace Final Architecture Review](../05-marketplace/09-MARKETPLACE-FINAL-ARCHITECTURE-REVIEW.md)
- [AI Expert Network Final Architecture Review](../06-ai-expert-network/08-AI-EXPERT-NETWORK-FINAL-ARCHITECTURE-REVIEW.md)
