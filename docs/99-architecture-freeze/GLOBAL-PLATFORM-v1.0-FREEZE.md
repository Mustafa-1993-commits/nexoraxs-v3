# Global Platform Architecture Freeze v1.0

**Architecture version:** Global Platform v1.0  
**Documentation baseline:** Global Platform Documentation Baseline v1.0  
**Freeze date:** 2026-07-14  
**Freeze status:** FROZEN  
**Milestone:** Global Platform  
**Architecture changes introduced by Freeze:** 0  
**Remaining review findings:** 0

---

## 1. Executive Freeze Summary

Global Platform Architecture v1.0 is the official frozen architectural baseline for Global
Platform.

The frozen architecture is the reviewed Global Platform Proposal Baseline v0.1.1, consisting of
the Proposal plus its bounded Proposal Patch. It defines Global Platform as a Core-coordinated,
platform-wide, cross-cutting logical responsibility architecture. It is not a tenant, Operating
System, bounded context, global super-domain, replacement canonical owner, physical runtime, or
deployment unit.

The Freeze records:

- 10 approved, non-owning Logical Responsibility Domains;
- 30 approved Global Platform Architectural Capabilities;
- preserved canonical ownership and owner-local writes;
- preserved cross-milestone responsibilities and independent Operating Systems;
- 8 Aggregate Boundary Candidates;
- 15 Candidate Canonical Facts;
- 12 Candidate Write Models;
- 10 Candidate Read Models;
- 8 Candidate Lifecycles;
- 36 unresolved Deferred Decisions;
- 14 non-Accepted Draft ADR candidates; and
- 24 retained risks, of which 23 remain active.

No candidate artifact becomes approved through this Freeze. No Deferred Decision or open question
is resolved. No Draft ADR becomes Accepted. No inherited owner, boundary, responsibility,
lifecycle, or Freeze guarantee changes.

## 2. Freeze Authority

This Freeze is authorized by the completed Nexoraxs milestone lifecycle:

1. approved Global Platform Discovery Baseline v0.1.1;
2. approved Global Platform Capability Map;
3. Global Platform Proposal v0.1;
4. Independent Architecture Review;
5. bounded Proposal Patch v0.1.1;
6. Independent Re-Review of Proposal Baseline v0.1.1;
7. Documentation Waves 1–3;
8. Final Architecture Review with verdict `READY FOR FREEZE`; and
9. Governance, Genesis v1.1, Accepted ADRs, and every inherited Freeze.

The Freeze is a release artifact. It summarizes and fixes the reviewed architecture; it does not
create a new decision.

## 3. Frozen Baseline Composition

### 3.1 Included milestone documents

| Order | Included document | Frozen role |
|---:|---|---|
| 1 | [Discovery v0.1](../07-global-platform/00-GLOBAL-PLATFORM-DISCOVERY.md) | historical problem-space provenance |
| 2 | [Discovery Patch v0.1.1](../07-global-platform/00A-GLOBAL-PLATFORM-DISCOVERY-PATCH-v0.1.1.md) | controls repository authority and Discovery readiness correction only |
| 3 | [Capability Map](../07-global-platform/01-GLOBAL-PLATFORM-CAPABILITY-MAP.md) | approved candidate logical mapping |
| 4 | [Proposal v0.1](../07-global-platform/02-GLOBAL-PLATFORM-PROPOSAL.md) | base architectural Proposal |
| 5 | [Independent Architecture Review](../07-global-platform/03-GLOBAL-PLATFORM-ARCHITECTURE-REVIEW.md) | historical findings and authorized Patch scope |
| 6 | [Proposal Patch v0.1.1](../07-global-platform/03A-GLOBAL-PLATFORM-PROPOSAL-PATCH-v0.1.1.md) | controls RC-GP-01 through RC-GP-03 only |
| 7 | [Independent Re-Review](../07-global-platform/04-GLOBAL-PLATFORM-RE-REVIEW.md) | verifies the merged Proposal Baseline |
| 8 | [Documentation Wave 1](../07-global-platform/05-GLOBAL-PLATFORM-DOCUMENTATION-WAVE-1.md) | terminology, navigation, traceability, and editorial guidance |
| 9 | [Documentation Wave 2](../07-global-platform/06-GLOBAL-PLATFORM-DOCUMENTATION-WAVE-2.md) | documentation and repository integrity validation |
| 10 | [Documentation Wave 3](../07-global-platform/07-GLOBAL-PLATFORM-DOCUMENTATION-WAVE-3.md) | final documentation preparation and maintenance guidance |
| 11 | [Final Architecture Review](../07-global-platform/08-GLOBAL-PLATFORM-FINAL-ARCHITECTURE-REVIEW.md) | final independent approval for Freeze |

### 3.2 Proposal Baseline precedence

```text
02-GLOBAL-PLATFORM-PROPOSAL.md
  +
03A-GLOBAL-PLATFORM-PROPOSAL-PATCH-v0.1.1.md
  =
Global Platform Proposal Baseline v0.1.1
```

Proposal Patch precedence is limited to:

- RC-GP-01 — `GPC-01` through `GPC-30` are Global Platform Architectural Capabilities, not
  canonical Capability or Capability Registry entries;
- RC-GP-02 — the structural definition is approved by the reviewed Proposal and no longer
  simultaneously deferred; corrected `DD-GP-01` and `DADR-GP-01` control; and
- RC-GP-03 — Logical Coordination, Canonical Ownership, Artifact Ownership, Deterministic
  Evaluation, Validation, and Execution remain distinct.

Every unaffected Proposal statement retains its reviewed meaning.

## 4. Governing Authorities

| Governing authority | Frozen effect |
|---|---|
| [Milestone Lifecycle](../00-governance/MILESTONE-LIFECYCLE.md) | controls proposal, review, Patch, documentation, Freeze, readiness, and future change process |
| [Governance Glossary](../00-governance/glossary/GLOSSARY.md) | controls canonical terminology and ownership meanings |
| [Governance ADR Repository](../00-governance/ADR/README.md) | controls Accepted ADR status and future ADR lifecycle |
| Genesis v1.1 | controls platform purpose, ontology, invariants, and ecosystem intent |
| [Genesis Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md) | complete approved Genesis ecosystem authority for this milestone |

The Freeze particularly depends on Accepted `ADR-002` through `ADR-007`, `ADR-009` through
`ADR-014`, `ADR-017`, `ADR-020`, and `ADR-024` through `ADR-040`. All 31 dependencies remain
Accepted and unchanged.

## 5. Inherited Frozen Baselines

| Inherited baseline | Preserved authority |
|---|---|
| [Core Platform v1.0](CORE-PLATFORM-v1.0-FREEZE.md) | shared control plane, identity, Workspace, organization, authorization, Settings, Localization, Navigation, Search, Audit, Observability, Marketplace foundation, and AI coordination |
| [Core Platform Documentation Baseline v1.0.1](CORE-PLATFORM-v1.0.1-READINESS.md) | aligned Core documentation and readiness authority |
| [Business Brain v1.0](BUSINESS-BRAIN-FREEZE-v1.0.md) | deterministic, reproducible, provider-independent Decision and intelligence boundaries |
| [Commerce OS v1.0](COMMERCE-OS-v1.0-FREEZE.md) | all Commerce facts, writes, setup, readiness, reports, validation, execution, and lifecycles |
| [Marketplace v1.0](MARKETPLACE-v1.0-FREEZE.md) | Marketplace Asset, version, Publisher, commercial state, assurance, Distribution, and scoped lifecycles |
| [AI Expert Network v1.0](AI-EXPERT-NETWORK-v1.0-FREEZE.md) | exclusive publication-path Definition ownership, one AI Coordinator, eligibility, Interaction, contribution, evaluation, and lifecycle separation |

Global Platform extends these baselines only through compatible logical responsibility and
context participation. It supersedes none of them.

## 6. Approved Architectural Scope

### 6.1 Architectural mission

Global Platform enables authorized business operation across countries and regional contexts
without fragmenting canonical truth, weakening Workspace isolation, duplicating existing owners,
hardcoding country behavior, hiding jurisdictional context, or coupling independent Operating
Systems.

It coordinates how source-owned context is identified, interpreted, presented, and supplied to
the frozen owner responsible for validation, decision, configuration, coordination, or
operational action. Context coordination never becomes canonical ownership.

### 6.2 Approved scope

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

### 6.3 Approved non-scope

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

## 7. Approved Logical Responsibility Domains

These are logical responsibility groupings only. They are not canonical owners, bounded
contexts, Components, services, aggregates, writers, runtimes, or deployment units.

| ID | Approved Logical Responsibility Domain | Purpose | Accountable coordination boundary | Source themes |
|---|---|---|---|---|
| GPLRD-01 | Global Context and Tenant Interpretation | resolve which tenant, organization, geographic, legal, and purpose contexts may be relevant | Core Platform context coordination | GPCT-01–GPCT-03, GPCT-12, GPCT-18 |
| GPLRD-02 | Localization and Internationalized Representation | resolve presentation context while preserving canonical values | Core Settings and Localization; each product retains its presentation surface | GPCT-04–GPCT-10 |
| GPLRD-03 | Jurisdiction and Compliance Applicability | coordinate source, version, evidence, and target-owner validation for possible obligations | Core context coordination with Knowledge, Rules, and applicable target owner | GPCT-11, GPCT-13 |
| GPLRD-04 | Privacy, Residency, and Isolation Applicability | coordinate purpose, classification, restriction, and fail-closed context questions | Core Security coordination; each canonical owner enforces its data boundary | GPCT-14, GPCT-15, GPCT-17 |
| GPLRD-05 | Cross-Region Collaboration and Administration | preserve explicit authorization, Delegation, visible context, and owner-local action | Core Identity and Access plus Navigation coordination | GPCT-16, GPCT-27 |
| GPLRD-06 | Marketplace and Operating System Global Participation | coordinate global context consumption without changing ecosystem or OS ownership | Marketplace for Marketplace participation; each OS for its own participation | GPCT-19, GPCT-20, GPCT-25 |
| GPLRD-07 | Intelligence, Configuration, Knowledge, and AI Global Participation | carry source-owned context through existing intelligence and AI boundaries | respective frozen intelligence owners under Core coordination | GPCT-21–GPCT-24 |
| GPLRD-08 | Global Navigation, Reporting, and Search | preserve current context through movement and authorized projections | Core Navigation and Search coordination; source owners retain facts | GPCT-26, GPCT-28 |
| GPLRD-09 | Global Operational Visibility | relate global health, dependency, incident, capacity, and continuity evidence | existing Observability and Audit boundaries plus source operations | GPCT-29 |
| GPLRD-10 | Global Migration and Scale Governance | govern compatibility, history, rollout evidence, migration, and evidence-based evolution | Governance and existing owner boundaries | GPCT-30 |

Frozen invariants:

1. a `GPLRD` is not a canonical data owner;
2. a `GPLRD` does not create or change a bounded context;
3. cross-owner responsibility remains explicitly separated;
4. canonical validation and action return to one applicable frozen owner; and
5. physical decomposition cannot be inferred from these groupings.

**Frozen Logical Responsibility Domain count: 10**

## 8. Approved Global Platform Architectural Capabilities

`GPC-01` through `GPC-30` are Global Platform Architectural Capabilities: logical architectural
responsibilities, not canonical Capability definitions, Capability Registry entries, Genesis
Business Capabilities, Components, services, OS Modules, or owners.

| ID | Global Platform Architectural Capability | Source | Logical group | Accountable boundary |
|---|---|---|---|---|
| GPC-01 | Global Context Interpretation | GPCT-01 | GPLRD-01 | Core context coordination |
| GPC-02 | Region Context | GPCT-02 | GPLRD-01 | Core context coordination |
| GPC-03 | Country Context | GPCT-03 | GPLRD-01 | Core context coordination |
| GPC-04 | Localization Context | GPCT-04 | GPLRD-02 | Core Settings and Localization |
| GPC-05 | Internationalized Representation | GPCT-05 | GPLRD-02 | Core Settings and Localization coordination |
| GPC-06 | Language and Direction | GPCT-06 | GPLRD-02 | Core Settings and Localization |
| GPC-07 | Timezone Interpretation | GPCT-07 | GPLRD-02 | Core Settings and Localization coordination |
| GPC-08 | Currency Interpretation | GPCT-08 | GPLRD-02 | Core Settings and Localization coordination |
| GPC-09 | Number Formatting | GPCT-09 | GPLRD-02 | Core Settings and Localization |
| GPC-10 | Address Interpretation | GPCT-10 | GPLRD-02 | Core Settings and Localization coordination |
| GPC-11 | Tax Jurisdiction Context | GPCT-11 | GPLRD-03 | Core Platform context coordination |
| GPC-12 | Legal Entity Context | GPCT-12 | GPLRD-01 | Core organization-context coordination |
| GPC-13 | Compliance Applicability | GPCT-13 | GPLRD-03 | Core Platform context coordination |
| GPC-14 | Data Residency Context | GPCT-14 | GPLRD-04 | Core Security coordination |
| GPC-15 | Privacy Applicability | GPCT-15 | GPLRD-04 | Core Security coordination |
| GPC-16 | Cross-Region Collaboration | GPCT-16 | GPLRD-05 | Core Identity and Access coordination |
| GPC-17 | Cross-Region Isolation | GPCT-17 | GPLRD-04 | Core Security and Identity coordination |
| GPC-18 | Global Tenant Context | GPCT-18 | GPLRD-01 | Core Workspace Management |
| GPC-19 | Marketplace Global Participation | GPCT-19 | GPLRD-06 | Marketplace bounded context |
| GPC-20 | Commerce Global Participation | GPCT-20 | GPLRD-06 | Commerce OS |
| GPC-21 | Business Intelligence Global Context | GPCT-21 | GPLRD-07 | Business Brain |
| GPC-22 | Knowledge and Rule Global Applicability | GPCT-22 | GPLRD-07 | Core Platform shared intelligence coordination |
| GPC-23 | Recommendation and Configuration Global Context | GPCT-23 | GPLRD-07 | Core Platform shared intelligence coordination |
| GPC-24 | AI Expert Global Participation | GPCT-24 | GPLRD-07 | Core AI Coordinator |
| GPC-25 | Independent OS Global Participation | GPCT-25 | GPLRD-06 | each applicable Operating System |
| GPC-26 | Global Navigation | GPCT-26 | GPLRD-08 | Core Navigation coordination; products retain route ownership |
| GPC-27 | Global Administration | GPCT-27 | GPLRD-05 | Core Identity and Access coordination |
| GPC-28 | Global Reporting and Search | GPCT-28 | GPLRD-08 | Core projection coordination |
| GPC-29 | Global Operational Visibility | GPCT-29 | GPLRD-09 | Core Observability coordination |
| GPC-30 | Global Migration and Scale | GPCT-30 | GPLRD-10 | Governance |

Capability relationships, source mappings, logical-group mappings, responsibilities,
non-responsibilities, names, identifiers, and count are frozen exactly as reviewed. The Patch’s
responsibility allocation controls for `GPC-22`, `GPC-23`, and `GPC-25`.

**Frozen Global Platform Architectural Capability count: 30**

## 9. Preserved Ownership Boundaries

### 9.1 Canonical ownership

| Canonical responsibility | Preserved owner | Global Platform use |
|---|---|---|
| identity and authentication | Core Identity | resolve actor reference |
| Workspace and organization identities | Core Workspace, Business, and Organization Registries | resolve tenant and organization references |
| Membership, Permission, Delegation, and Authorization Context | Core Identity and Access plus owning domain | require current context for protected use |
| Settings and Localization Context | Core Settings and Localization | resolve presentation context |
| Business DNA | Core Business DNA Registry for one Business | consume pinned Business context |
| Knowledge and Knowledge Packs | Knowledge owners | consume exact source and version references |
| Rules and Rule outcomes | Rules Engine | consume deterministic outcomes and evidence |
| Business Brain Decision | Business Brain | supply permitted input and consume completed Decision |
| Recommendation | Recommendation Engine | supply context and consume explanation or disposition |
| Configuration Proposal | Configuration Engine | supply context and route to target owner |
| Marketplace facts and lifecycles | Marketplace | consume availability and scoped-state projections |
| Core-held AI Expert Definition | Core AI Coordinator Expert Registry path | reference exact eligible definition |
| Marketplace-published AI Expert Definition | Marketplace Asset Version path | reference exact published version |
| AI Interaction and AI output | Core AI Coordinator | supply minimum permitted context |
| Commerce facts and lifecycles | Commerce OS | consume or present authorized projections |
| future OS facts and lifecycles | applicable OS | consume or present authorized projections |
| Audit Record | Core Audit Service | contribute critical-action references |
| operational telemetry | applicable Observability boundary | consume tenant-safe operational evidence |
| Search, Reporting, and Analytics projections | projection owner with source-owner participation | present authorized global views |

### 9.2 Responsibility separation

The following responsibility kinds remain distinct:

| Responsibility kind | Frozen owner rule |
|---|---|
| Logical Coordination | accountable existing coordination boundary; owns no referenced fact or target action |
| Canonical Ownership | exactly one frozen source-of-truth owner |
| Artifact Ownership | exactly the frozen owner of that governed artifact |
| Deterministic Evaluation | Rules Engine or applicable frozen evaluating owner; never generic Core coordination or AI |
| Validation | exactly one applicable target owner |
| Execution | exactly one applicable target owner; no Global Platform execution authority |

Every canonical write remains inside one existing owner. Global interactions may request a write,
but the target owner resolves authorization, validates applicability and invariants, applies or
rejects the action, owns the result, and participates in Audit when consequential.

## 10. Preserved Cross-Milestone Responsibilities

| Authority or milestone | Retained responsibility | Frozen Global Platform participation | Result owner |
|---|---|---|---|
| Governance | terminology, ADRs, lifecycle, approval, versioning, review, Freeze, and change control | trace decisions and route material evolution through Governance | Governance |
| Genesis | mission, ontology, ecosystem, and foundational invariants | remain aligned with Genesis v1.1 and Platform Ecosystem | Genesis |
| Core Platform | shared identity, organization, context, control, navigation, security, intelligence, Marketplace foundation, and AI coordination | coordinate explicit global context through existing logical boundaries | applicable Core owner |
| Business Brain | deterministic, reproducible, provider-independent Decision | receive pinned, authorized, source-attributed global input | Business Brain |
| Recommendation Engine | Recommendation identity, explanation, lifecycle, disposition, and feedback | receive context references affecting relevance and eligibility | Recommendation Engine |
| Configuration Engine | versioned Configuration Proposal | receive global context; target independently validates and applies | Configuration Engine; target owns effect |
| Knowledge Engine and Rules Engine | shared versioned Knowledge and deterministic Rules | supply exact sources, versions, applicability, conflicts, and evidence | respective Knowledge or Rule owner |
| Commerce OS | all Commerce facts, writes, setup, readiness, reports, and lifecycles | consume source-owned global context and presentation constraints | Commerce OS |
| Marketplace | Assets, versions, Publisher, commercial state, assurance, Distribution, and scoped lifecycles | consume global discovery and applicability context | Marketplace bounded context |
| AI Expert Network | Definition publication paths, eligibility, Interaction, evaluation, and collaboration boundaries | consume minimum authorized global context through one AI Coordinator | AI Coordinator or exclusive publication-path owner |
| future Operating Systems | independent setup, configuration, permissions, workflows, facts, reports, and lifecycle | consume optional, versioned global context without hard dependency | each applicable OS |

No relationship transfers ownership, creates circular ownership, forms AI Decisions, bypasses a
Marketplace lifecycle, moves Commerce truth into Core, creates an umbrella OS Domain, or makes
one OS depend on another.

## 11. Candidate Registers Preserved

No candidate below is approved by this Freeze.

### 11.1 Aggregate Boundary Candidates

| ID | Candidate | Preserved status |
|---|---|---|
| GPABC-01 | Global Context Policy Candidate | Deferred — DD-GP-08/09 |
| GPABC-02 | Region Reference Candidate | Deferred — DD-GP-07 |
| GPABC-03 | Country Reference Candidate | Deferred — DD-GP-08 |
| GPABC-04 | Legal Entity Context Candidate | Deferred — DD-GP-06 |
| GPABC-05 | Global Applicability Policy Candidate | Deferred — DD-GP-15–DD-GP-19 |
| GPABC-06 | Cross-Region Collaboration Policy Candidate | Deferred — DD-GP-20–DD-GP-22 |
| GPABC-07 | Global Representation Policy Candidate | Deferred — DD-GP-10–DD-GP-14 |
| GPABC-08 | Global Rollout Governance Candidate | Deferred — DD-GP-33–DD-GP-36 |

### 11.2 Candidate Canonical Facts

| ID | Candidate | Preserved status |
|---|---|---|
| GPCF-01 | Region Definition Candidate | Deferred — DD-GP-07 |
| GPCF-02 | Country Reference Candidate | Deferred — DD-GP-08 |
| GPCF-03 | Context Precedence Candidate | Deferred — DD-GP-09 |
| GPCF-04 | Legal Entity Reference Candidate | Deferred — DD-GP-06 |
| GPCF-05 | Jurisdiction Applicability Candidate | Deferred — DD-GP-15 |
| GPCF-06 | Compliance Applicability Evidence Candidate | Deferred — DD-GP-16 |
| GPCF-07 | Data Classification Candidate | Deferred — DD-GP-17 |
| GPCF-08 | Residency Constraint Candidate | Deferred — DD-GP-18 |
| GPCF-09 | Privacy Applicability Candidate | Deferred — DD-GP-17/19 |
| GPCF-10 | Cross-Region Collaboration Authorization Candidate | Deferred — DD-GP-20/21 |
| GPCF-11 | Translation Provenance Candidate | Deferred — DD-GP-10/11 |
| GPCF-12 | Exchange-Rate Evidence Candidate | Deferred — DD-GP-13 |
| GPCF-13 | Country Availability Candidate | Deferred — DD-GP-23 |
| GPCF-14 | Global Operational Readiness Candidate | Deferred — DD-GP-33 |
| GPCF-15 | Global Migration Assessment Candidate | Deferred — DD-GP-34/36 |

### 11.3 Candidate Write Models

| ID | Candidate | Preserved status |
|---|---|---|
| GPCWM-01 | Region Reference Write Candidate | Deferred — DD-GP-07 |
| GPCWM-02 | Country Reference Write Candidate | Deferred — DD-GP-08 |
| GPCWM-03 | Context Policy Write Candidate | Deferred — DD-GP-09 |
| GPCWM-04 | Legal Entity Relationship Write Candidate | Deferred — DD-GP-06 |
| GPCWM-05 | Applicability Policy Write Candidate | Deferred — DD-GP-15/16 |
| GPCWM-06 | Privacy and Residency Policy Write Candidate | Deferred — DD-GP-17–DD-GP-19 |
| GPCWM-07 | Collaboration Authorization Write Candidate | Deferred — DD-GP-20/21 |
| GPCWM-08 | Representation Policy Write Candidate | Deferred — DD-GP-10–DD-GP-14 |
| GPCWM-09 | Global Availability Policy Write Candidate | Deferred — DD-GP-23/25 |
| GPCWM-10 | Global Operations Policy Write Candidate | Deferred — DD-GP-33 |
| GPCWM-11 | Migration Assessment Write Candidate | Deferred — DD-GP-34/36 |
| GPCWM-12 | Global Scale Assessment Write Candidate | Deferred — DD-GP-35/36 |

### 11.4 Candidate Read Models

| ID | Candidate | Preserved status |
|---|---|---|
| GPRM-01 | Current Global Context View | Candidate — DD-GP-09 |
| GPRM-02 | Multi-Country Workspace Overview | Candidate — DD-GP-04/22 |
| GPRM-03 | Region and Country Applicability View | Candidate — DD-GP-07/08/15/16 |
| GPRM-04 | Global Marketplace Participation View | Candidate — DD-GP-23 |
| GPRM-05 | Global Commerce Overview | Candidate — DD-GP-24/32 |
| GPRM-06 | Global Intelligence Context View | Candidate — DD-GP-26–DD-GP-28 |
| GPRM-07 | Global AI Eligibility View | Candidate — DD-GP-29 |
| GPRM-08 | Global Reporting Projection | Candidate — DD-GP-32 |
| GPRM-09 | Global Search Projection | Candidate — DD-GP-32 |
| GPRM-10 | Global Operational Health View | Candidate — DD-GP-33 |

### 11.5 Candidate Lifecycles

| ID | Candidate | Preserved status |
|---|---|---|
| GPLC-01 | Region Reference Lifecycle | Deferred — DD-GP-07 |
| GPLC-02 | Country Reference Lifecycle | Deferred — DD-GP-08 |
| GPLC-03 | Applicability Policy Lifecycle | Deferred — DD-GP-15/16 |
| GPLC-04 | Cross-Region Collaboration Lifecycle | Deferred — DD-GP-20/21 |
| GPLC-05 | Global Availability Lifecycle | Deferred — DD-GP-23/25 |
| GPLC-06 | Country or Region Rollout Lifecycle | Deferred — DD-GP-33 |
| GPLC-07 | Global Migration Lifecycle | Deferred — DD-GP-34 |
| GPLC-08 | Global Scale Evolution Lifecycle | Deferred — DD-GP-35/36 |

| Candidate register | Preserved count | Approved by Freeze |
|---|---:|---:|
| Aggregate Boundary Candidates | 8 | 0 |
| Candidate Canonical Facts | 15 | 0 |
| Candidate Write Models | 12 | 0 |
| Candidate Read Models | 10 | 0 |
| Candidate Lifecycles | 8 | 0 |
| **Total candidate artifacts** | **53** | **0** |

## 12. Deferred Decisions Preserved

All 36 Deferred Decisions remain unresolved. `DD-GP-01` uses the controlling RC-GP-02 wording;
`GPOQ-02` is not mapped back into it.

| ID | Preserved Deferred Decision | Discovery questions |
|---|---|---|
| DD-GP-01 | mandatory Global Platform outcomes and explicit exclusion criteria not already fixed by the proposed Mission, Scope, and Non-Scope | GPOQ-03, GPOQ-06 |
| DD-GP-02 | inherited deferrals required before each global rollout and evidence of upstream operational maturity | GPOQ-04, GPOQ-05 |
| DD-GP-03 | cross-country operation of one Core identity without duplication | GPOQ-07 |
| DD-GP-04 | whether and how one Workspace spans countries or Regions, including default-versus-fact semantics | GPOQ-08 |
| DD-GP-05 | sufficiency of Business, Business Unit, Department, and Branch for regional administration | GPOQ-09 |
| DD-GP-06 | Legal Entity meaning, multiplicity, relationship to organization and billing identity, evidence, owner, and lifecycle | GPOQ-10–GPOQ-12 |
| DD-GP-07 | necessity, meanings, source, scope, relationships, and lifecycle of Region | GPOQ-13, GPOQ-14 |
| DD-GP-08 | canonical, referenced, derived, and presentational Country meanings and applicability selection | GPOQ-15, GPOQ-16 |
| DD-GP-09 | global context precedence, freshness, effective time, explanation, ambiguity, conflict, and fail-closed behavior | GPOQ-17, GPOQ-18 |
| DD-GP-10 | language and locale preference precedence, content treatment, and fallback | GPOQ-19–GPOQ-21 |
| DD-GP-11 | RTL/LTR separation, translation provenance, version, correction, history, and cross-owner localization participation | GPOQ-22–GPOQ-24 |
| DD-GP-12 | timezone precedence, daylight-saving, historical change, deadlines, effective periods, and Reporting cutoffs | GPOQ-25, GPOQ-26 |
| DD-GP-13 | monetary-value and currency meanings, exchange-rate authority, version, correction, evidence, and conversion policy | GPOQ-27, GPOQ-28 |
| DD-GP-14 | number, measurement, minor-unit, input, display-rounding, and owner-specific address semantics | GPOQ-29, GPOQ-30 |
| DD-GP-15 | facts, sources, deterministic Rule participation, and target-owner validation determining tax jurisdiction | GPOQ-31, GPOQ-32 |
| DD-GP-16 | compliance source authority, version, effective period, evidence, conflicts, participant obligations, and approval controls | GPOQ-33–GPOQ-36 |
| DD-GP-17 | data classification and privacy-rights policy across facts, projections, evidence, telemetry, exports, backups, and AI | GPOQ-37, GPOQ-38 |
| DD-GP-18 | residency-constrained data categories, applicability authority, cross-region access, support, projections, AI, Audit, and recovery constraints | GPOQ-39, GPOQ-40 |
| DD-GP-19 | narrower isolation below Workspace and visible fail-closed privacy/residency conflict behavior | GPOQ-41, GPOQ-42 |
| DD-GP-20 | legitimate collaboration scenarios and distinction from cross-region write authority or tenant merging | GPOQ-43, GPOQ-44 |
| DD-GP-21 | cross-region user/service authorization, scope revalidation, Delegation, separation of duties, emergency access, revocation, and Audit | GPOQ-45, GPOQ-46 |
| DD-GP-22 | non-canonical Workspace aggregation and constrained cross-Workspace partner or support relationships | GPOQ-47, GPOQ-48 |
| DD-GP-23 | country, jurisdiction, language, commercial, Publisher, certification, support, and scoped-lifecycle effects on Marketplace availability and use | GPOQ-49, GPOQ-50 |
| DD-GP-24 | multi-country Commerce setup, currency, tax, documents, addresses, payments, refunds, privacy, retention, and Reporting | GPOQ-51 |
| DD-GP-25 | shared platform context versus OS facts, future OS adoption, and optional cross-country/cross-OS relationship policy | GPOQ-52–GPOQ-54 |
| DD-GP-26 | country-aware Knowledge and Rule selection, translation, versioning, expiry, conflict, and reconciliation | GPOQ-55 |
| DD-GP-27 | Business Brain global input, Business-scoped Decision, explicit aggregation, and Recommendation explanation under differing context | GPOQ-56, GPOQ-57 |
| DD-GP-28 | Configuration Proposal representation of global context and target-application policy | GPOQ-58 |
| DD-GP-29 | AI Expert eligibility, provider, language, country, privacy, residency, evidence, safety, and cross-country learning policy | GPOQ-59, GPOQ-60 |
| DD-GP-30 | contexts preserved and displayed through Global Navigation and protection against hidden, stale, or unauthorized movement | GPOQ-61, GPOQ-62 |
| DD-GP-31 | global and regional administrative views, prohibitions, support scope, and Delegation policy | GPOQ-63 |
| DD-GP-32 | global Reporting normalization, multilingual Search, dashboard/export/alert/Notification context, lineage, privacy, freshness, and comparability | GPOQ-64–GPOQ-66 |
| DD-GP-33 | service objectives, capacity, incidents, continuity, recovery, communication, country launch, suspension, withdrawal, and restoration criteria | GPOQ-67, GPOQ-68 |
| DD-GP-34 | migration of current country, locale, time, currency, address, privacy, and historical records without changing meaning | GPOQ-69 |
| DD-GP-35 | concern-specific consistency, freshness, ordering, failure isolation, and evidence thresholds for future physical extraction | GPOQ-70, GPOQ-71 |
| DD-GP-36 | Proposal follow-on decisions, Draft ADR disposition, reviews, lifecycle exit criteria, and any physical implementation choices | GPOQ-72 |

Inherited Deferred Decision registers also remain open:

| Frozen milestone | Preserved register |
|---|---|
| Core Platform | `D-01` through `D-42`, unselected technologies, and operational detail |
| Business Brain | Deferred Decisions 1 through 24 |
| Commerce OS | `DD-01` through `DD-40` |
| Marketplace | `DD-MP-01` through `DD-MP-50` |
| AI Expert Network | `DD-AEN-01` through `DD-AEN-24` |

Overlapping deferrals do not supersede one another.

## 13. Draft ADR Candidates Preserved

These are future ADR subjects only. They are not ADR files, remain non-Accepted, and create no
authority through this Freeze.

| ID | Preserved Draft ADR subject | Related deferrals |
|---|---|---|
| DADR-GP-01 | Global Platform as a Core-coordinated cross-cutting logical responsibility architecture | proposed structural decision; DD-GP-01 only for remaining outcome and exclusion alignment |
| DADR-GP-02 | Explicit global context interpretation and precedence | DD-GP-08, DD-GP-09 |
| DADR-GP-03 | Region and Country semantic separation | DD-GP-07, DD-GP-08 |
| DADR-GP-04 | Legal Entity relationship and ownership | DD-GP-06 |
| DADR-GP-05 | Localization and internationalized representation | DD-GP-10, DD-GP-11 |
| DADR-GP-06 | Temporal, currency, numeric, and address interpretation | DD-GP-12–DD-GP-14 |
| DADR-GP-07 | Jurisdiction and compliance applicability coordination | DD-GP-15, DD-GP-16 |
| DADR-GP-08 | Privacy, residency, and narrower isolation | DD-GP-17–DD-GP-19 |
| DADR-GP-09 | Cross-region collaboration and authorization | DD-GP-20–DD-GP-22 |
| DADR-GP-10 | Global Navigation, Reporting, Search, and administration projections | DD-GP-30–DD-GP-32 |
| DADR-GP-11 | Marketplace and independent OS global participation | DD-GP-23–DD-GP-25 |
| DADR-GP-12 | Global intelligence, Configuration, Knowledge, and AI context | DD-GP-26–DD-GP-29 |
| DADR-GP-13 | Global operational readiness and migration governance | DD-GP-33, DD-GP-34 |
| DADR-GP-14 | Evidence-driven global scale and physical extraction | DD-GP-35, DD-GP-36 |

**Preserved Draft ADR candidate count: 14**  
**Accepted by this Freeze: 0**  
**Rejected by this Freeze: 0**

## 14. Risk Register Preserved

| ID | Preserved risk | Frozen treatment or state |
|---|---|---|
| GPR-01 | historical claim that Genesis 21 is a missing required authority | historical only; Discovery Patch establishes Genesis 20 as complete authority |
| GPR-02 | Region meanings are conflated | separate meanings; model remains DD-GP-07 |
| GPR-03 | Country meanings are conflated | preserve multiple meanings; semantics remain DD-GP-08 |
| GPR-04 | Global Identity duplicates Core identity | Core identity remains sole owner |
| GPR-05 | legal entity is equated with Business or Branch | separate context; model remains DD-GP-06 |
| GPR-06 | Workspace defaults override Business or owner facts | defaults remain context; precedence remains DD-GP-04/09 |
| GPR-07 | localization mutates canonical data | representation remains separate from truth |
| GPR-08 | timezone assumptions corrupt effective periods | owner time remains canonical; semantics remain DD-GP-12 |
| GPR-09 | currency conversion is treated as formatting | value, display, and conversion remain separate under DD-GP-13 |
| GPR-10 | universal address assumptions exclude valid country forms | owner-specific address facts remain under DD-GP-14 |
| GPR-11 | Global Platform becomes tax or compliance owner | coordination only; target owner validates |
| GPR-12 | jurisdiction conflicts are silently prioritized | conflicts stay visible; policy remains DD-GP-16 |
| GPR-13 | residency is reduced to infrastructure placement | residency remains logical and deferred under DD-GP-18 |
| GPR-14 | global administration bypasses tenant scope | Core authorization remains controlling; detail stays DD-GP-21/31 |
| GPR-15 | cross-region collaboration implies shared writes | owner-local writes and optional collaboration remain mandatory |
| GPR-16 | global Reporting becomes canonical truth | projections remain disposable and source-attributed |
| GPR-17 | multilingual Search leaks or misranks data | Search remains permission-filtered; detail stays DD-GP-32 |
| GPR-18 | Marketplace expansion bypasses lifecycle gates | Marketplace Freeze and its Deferred Decisions remain controlling |
| GPR-19 | Commerce global concerns move into Core | Commerce OS remains accountable for Commerce participation |
| GPR-20 | country Knowledge or Rules are copied per OS | exact shared versions remain source-owned |
| GPR-21 | AI context crosses regions improperly | one Coordinator and minimum authorized context remain mandatory |
| GPR-22 | a global layer creates cross-OS hard dependency | OS independence and failure isolation remain guarantees |
| GPR-23 | rollout precedes operational policy | rollout remains DD-GP-33 and requires readiness evidence |
| GPR-24 | global scale justifies premature extraction | measured evidence and Accepted ADR remain mandatory |

**Risks retained:** 24  
**Active risks:** 23  
**Historical Patch-controlled risk:** 1 (`GPR-01`)

## 15. Repository Freeze State

### 15.1 Frozen source manifest

| Repository validation | Freeze state |
|---|---|
| included Global Platform source documents | 11 |
| source documents present | 11 of 11 |
| Freeze artifacts | 1 |
| complete frozen artifact set | 12 |
| pre-Freeze source links | 265 |
| Freeze document links | 21 |
| complete frozen link set | 286 |
| unresolved link targets | 0 |
| registered identifier families | 12 |
| expected registered identifiers | 269 |
| missing registered identifiers | 0 |
| accepted ADR dependencies | 31 of 31 present and Accepted |
| Final Architecture Review verdict | `READY FOR FREEZE` |
| remaining Critical findings | 0 |
| remaining Major findings | 0 |
| remaining Minor findings | 0 |
| total remaining findings | 0 |

### 15.2 Controlling repository artifact

This file is the authoritative Global Platform Architecture v1.0 Freeze. The included Proposal,
Patch, reviews, and Waves remain part of its provenance. They must not be read in a way that
overrides this Freeze or their documented precedence.

## 16. Change Control Policy

Any future material architectural change requires:

1. an ADR or ADR update through Governance;
2. impact analysis against this Freeze and every affected inherited Freeze;
3. compatibility and ownership validation;
4. an independent Architecture Review;
5. a bounded Patch when the change is documentation alignment only;
6. an updated or successor Freeze when architecture changes; and
7. Readiness Validation through the approved Milestone Lifecycle.

A documentation correction may not alter architecture, ownership, responsibility, capability,
identifier, mapping, ADR status, Deferred Decision, risk, fact, model, lifecycle, cross-milestone
boundary, or implementation choice. Any such change exits documentation-only scope.

## 17. Successor Evolution Rules

Future work may extend Global Platform only when it:

- preserves Governance, Genesis, and all affected Freeze authorities;
- keeps Workspace as the highest tenant boundary;
- retains one canonical owner and one canonical write boundary for every fact;
- preserves Business-scoped Business DNA;
- keeps `GPC` distinct from canonical Capability;
- keeps Logical Responsibility Domains non-owning and non-physical;
- preserves the six responsibility kinds and target-owner validation and execution;
- preserves independent Operating Systems and optional cross-OS integration;
- preserves Business Brain Decision independence from AI;
- preserves Marketplace and AI Expert publication-path ownership;
- preserves projection as non-ownership;
- resolves a Deferred Decision only through its required authorities and every overlapping
  inherited register;
- promotes a candidate fact or model only through an Accepted ADR and reviewed owner assignment;
  and
- produces a successor reviewed Freeze rather than mutating this baseline silently.

No successor may infer implementation, API, Component, service, database, infrastructure,
runtime, deployment, or technology choices from this Freeze.

## 18. Freeze Integrity Validation

| Freeze integrity condition | Result |
|---|---|
| Freeze matches Proposal Baseline v0.1.1 | PASS |
| RC-GP-01 terminology and mappings preserved | PASS |
| RC-GP-02 structural decision and corrected registers preserved | PASS |
| RC-GP-03 responsibility separation preserved | PASS |
| all original review findings remain closed | PASS — 3 of 3 |
| Final Architecture Review remains satisfied | PASS |
| inherited Freeze authorities remain respected | PASS |
| approved Logical Responsibility Domains preserved | PASS — 10 |
| approved Global Platform Architectural Capabilities preserved | PASS — 30 |
| candidate registers preserved without approval | PASS — 53 candidates; 0 approved |
| Deferred Decisions preserved without resolution | PASS — 36 unresolved |
| Draft ADR candidates preserved without status change | PASS — 14 non-Accepted |
| risk register preserved | PASS — 24 retained / 23 active |
| ownership changes introduced | 0 |
| responsibility changes introduced | 0 |
| capability, identifier, or mapping changes introduced | 0 |
| architectural changes introduced | 0 |
| remaining findings | 0 |

## 19. Final Freeze Declaration

Global Platform Architecture v1.0 is frozen as the official architectural baseline for all
future Global Platform work and future platform evolution that consumes global context.

The Freeze is subordinate to Governance and Genesis and composes with the frozen Core Platform,
Business Brain, Commerce OS, Marketplace, and AI Expert Network baselines. Future work must
preserve this baseline or change it only through the approved Governance lifecycle.

# GLOBAL PLATFORM v1.0 FROZEN
