# Marketplace Documentation Wave 2

**Documentation Wave:** 2  
**Marketplace Architecture Baseline:** Proposal v0.1 plus Proposal Patch v0.1.1  
**Status:** Documentation traceability layer  
**Architecture impact:** None

---

## 1. Purpose

This document strengthens cross-document consistency and cross-milestone traceability for the
approved Marketplace Proposal Baseline v0.1.1. It provides navigation tables over decisions that
already exist. It does not amend, reinterpret, or supplement those decisions.

The Proposal and Patch remain the architecture authority. If this Wave is ever read differently
from them, the Proposal statement as corrected by the Patch controls.

## 2. Scope and Constraints

Wave 2 adds documentation-only navigation for:

- frozen authorities and milestone dependencies;
- Marketplace Domains, Capabilities, canonical facts, write models, and aggregates;
- shared and scoped lifecycles;
- read models and projections;
- Asset-family relationships;
- Deferred Decisions; and
- Accepted ADR dependencies and retained Draft ADR trace labels.

Wave 2 changes no Domain, Capability, owner, fact, write model, aggregate, lifecycle, Deferred
Decision, ADR status, Proposal decision, or Patch decision. It introduces no API, Event,
Contract, database, infrastructure, technology, deployment model, or implementation behavior.

## 3. Authoritative Reading and Navigation

### 3.1 Marketplace documentation dependency matrix

| Order | Artifact | Documentation role | Depends on | May change architecture? |
|---:|---|---|---|---|
| 1 | `00-MARKETPLACE-DISCOVERY.md` | Approved problem-space record | Frozen authorities | No |
| 2 | `01-MARKETPLACE-CAPABILITY-MAP.md` | Approved candidate logical collaboration map | Discovery | No |
| 3 | `02-MARKETPLACE-PROPOSAL.md` | Original architectural proposal | Discovery and Capability Map | Proposal stage only |
| 4 | `03-MARKETPLACE-ARCHITECTURE-REVIEW.md` | Independent findings and patch authority | Proposal and frozen authorities | No |
| 5 | `04-MARKETPLACE-PROPOSAL-PATCH-v0.1.1.md` | Controlling corrections PP-01 through PP-10 | Proposal and Review | No redesign; alignment only |
| 6 | `05-MARKETPLACE-RE-REVIEW.md` | Approval of the merged Proposal Baseline v0.1.1 | Proposal plus Patch | No |
| 7 | `06-MARKETPLACE-WAVE-1.md` | Terminology, editorial, and baseline traceability | Approved merged baseline | No |
| 8 | `07-MARKETPLACE-WAVE-2.md` | Cross-milestone and ownership navigation | Approved baseline and Wave 1 | No |

### 3.2 Cross-milestone reading matrix

| Reader question | Marketplace source | External authority to read | Navigation result |
|---|---|---|---|
| Why is Marketplace a Core bounded context? | Proposal sections 2–4 and 39 | ADR-002, ADR-027; Core Freeze | Core offers Marketplace; Marketplace owns its bounded-context facts |
| How are shared Assets separated from scoped state? | Proposal sections 13–18; Patch PP-01 | ADR-009, ADR-028; Genesis Marketplace Architecture | Published version is shared and immutable; adoption state is scoped |
| Who owns identity and organization context? | Proposal section 9 and Patch PP-10 | ADR-003, ADR-004, ADR-034, ADR-040; Core Freeze | Core owns identity and organization; Marketplace uses authorized references |
| Who owns Product Hub movement? | Proposal section 39; Patch PP-10 | ADR-019, ADR-020, ADR-037; Core Freeze | Product Hub composes and hands off; Marketplace owns its governed surface |
| Who owns Decision and Recommendation? | Proposal sections 32–33 and 39 | Genesis Business Brain and Recommendation Engine; Business Brain Freeze | Business Brain owns Decision; Recommendation Engine owns Recommendation |
| Who owns target configuration? | Proposal non-scope and sections 39–44 | ADR-017, ADR-024; applicable OS Freeze | Configuration Engine owns Configuration Proposal; target owner applies effects |
| Who owns Commerce facts? | Proposal section 39 and Extension boundaries | Commerce OS Freeze | Commerce OS remains sole owner of Commerce facts and configuration |
| Who owns Knowledge Pack content? | Proposal section 43; Patch PP-08 | ADR-010; Genesis Knowledge Engine and Knowledge Packs | Knowledge Engine retains content and use; Marketplace owns distribution representation |
| Who owns AI Expert execution and artifacts? | Proposal section 44 | ADR-029 through ADR-031; Genesis AI Strategy and AI Expert Network | AI Coordinator owns eligibility, coordination, and AI artifacts |
| Who owns Audit, Search, and platform Analytics? | Proposal sections 32, 34, and 37 | ADR-038; Core architecture and Freeze | Core owns shared records and projections; Marketplace supplies governed inputs |

### 3.3 Topic navigation matrix

| Topic | Primary baseline location | Controlling overlay | Wave navigation |
|---|---|---|---|
| Domains and Capabilities | Proposal sections 6–8 | Re-Review sections 2.3–2.4 | Sections 6–7 below |
| Facts, writes, and aggregates | Proposal sections 9–12 | Patch PP-05, PP-06, PP-09 | Sections 8–10 below |
| Shared Asset and scoped state | Proposal sections 13–18 | Patch PP-01, PP-03, PP-04 | Sections 11–12 below |
| Review and assurance | Proposal sections 19–23 | Patch PP-02, PP-05 | Sections 8 and 12 below |
| Commercial and adoption state | Proposal sections 24–31 | Patch PP-01, PP-03 through PP-06 | Sections 8–12 below |
| Read models and projections | Proposal sections 10.1 and 32–34 | Patch PP-09 | Section 13 below |
| External milestones | Proposal section 39 | Patch PP-06 and PP-10 | Sections 4–5 below |
| Asset families | Proposal sections 40–44 | Patch PP-08 | Section 14 below |
| Deferred Decisions | Proposal section 46 | Patch section 14; Re-Review section 3.5 | Section 15 below |
| ADR classification | Proposal section 45 | Patch PP-07 | Section 16 below |

## 4. Frozen Authority Matrix

| Authority layer | Governing subject | Marketplace dependency | Marketplace ownership effect |
|---|---|---|---|
| Governance | ADR lifecycle, canonical ownership, context, boundaries, compatibility, Audit | Marketplace decisions remain subordinate to Accepted ADRs | None; Governance does not become a Marketplace writer |
| Genesis v1.1 | Marketplace purpose, Asset model, Knowledge, AI, organization, OS independence | Defines constitutional meaning and ecosystem boundaries | None; Marketplace cannot redefine Genesis concepts |
| Core Platform v1.0 / documentation baseline v1.0.1 | Core identity, organization, commercial control, Product Hub, Security, Audit, Search, Analytics, navigation | Supplies shared context and services | Marketplace owns only its bounded-context facts |
| Business Brain v1.0 | Decision, reasoning, read models, AI-downstream boundary | Supplies completed authorized Decision context | Marketplace owns no Decision or candidate reasoning |
| Commerce OS v1.0 | Commerce facts, write models, configuration, operations, target validation | Consumes optional entitled Asset context | Marketplace owns no Commerce truth |
| Marketplace Proposal Baseline v0.1.1 | Twelve Domains, twenty-four Capabilities, facts, writes, aggregates, lifecycles | Direct Marketplace architecture authority | Controlling Marketplace ownership source |
| Marketplace Wave 1 | Terminology and baseline traceability | Reading aid | None |
| Marketplace Wave 2 | Cross-milestone and ownership navigation | Reading aid | None |

## 5. Marketplace and External Milestone Matrix

| External owner | External facts or responsibilities retained | Marketplace collaboration | Forbidden Marketplace interpretation | Primary authority |
|---|---|---|---|---|
| Core Identity and Access | User, Authentication, Membership, canonical Permission grants | Consumes verified identity, context, and authorization | Publisher or Activation becomes a Permission grant | Proposal 9, 35; Patch PP-05 |
| Core organization registries | Workspace, Business, Business Unit, Department, Branch | Stores scoped references only | Marketplace owns organization identity | Proposal 9, 14, 29 |
| Core commercial owners | Core Product, Plan, Workspace Entitlement, OS Subscription, billing and financial truth | Consumes commercial outcomes and references | Marketplace Purchase or Entitlement replaces Core commercial facts | Proposal 9, 24–25; Patch PP-03/PP-04/PP-06 |
| Product Hub | Journey composition and OS/Marketplace handoff | Composes Marketplace projections and initiates authorized actions | Product Hub writes Marketplace state, or Marketplace owns Product Hub | Proposal 39; Patch PP-10 |
| Core Audit Service | Append-only Audit Record | Receives attributable Marketplace evidence | Marketplace evidence is itself the Audit Record | Proposal 37; ADR-038 |
| Core Notification Service | Notification state | Receives Marketplace notification intent | Marketplace owns platform notification state | Proposal 9 and 39 |
| Core Search | Search Index, query behavior, shared Search infrastructure | Receives minimized Marketplace source projection | Marketplace Search View becomes Search Index truth | Proposal 32 |
| Core Analytics | Platform Analytics projections | Receives authorized Marketplace outcomes | MPD-12 becomes platform Analytics source truth | Proposal 34; Patch PP-09 |
| Business DNA owner | Business DNA | Supplies authorized intelligence context | Marketplace writes or copies Business DNA | Proposal 9 and 39 |
| Business Brain | Decision and candidate reasoning | Consumes authorized Marketplace availability and outcome context | Marketplace forms or modifies Decision | Proposal 33 and 39 |
| Recommendation Engine | Recommendation lifecycle and priority | Consumes Marketplace Eligibility View; returns authorized context | Marketplace eligibility becomes Recommendation | Proposal 33 and 39 |
| Core intelligence mapping owner | Implementation Option mapping | May reference eligible Marketplace Asset identifiers | Marketplace owns Implementation Option mapping | Proposal 9 and 33 |
| Configuration Engine | Configuration Proposal | Marketplace supplies Asset context; target owner applies accepted effects | Marketplace creates or applies target configuration | Proposal 9, 40–44 |
| Capability Registry | Capability identity, meaning, dependencies, applicability, lifecycle | Capability Packs reference canonical identifiers | Capability Pack redefines Capability | Patch PP-08 |
| Knowledge Engine | Knowledge, Knowledge Pack content, Knowledge use and applicability interpretation | Marketplace distributes a referencing Asset representation | Marketplace duplicates or mutates Knowledge content | Proposal 43; Patch PP-08 |
| Rules owner | Deterministic Rule definitions | Automation Pack may reference governed Rules | Marketplace Asset becomes Rule truth | Patch PP-08 |
| AI Coordinator | Expert eligibility and selection, provider/model coordination, AI artifacts and safety behavior | Receives active/applicable Expert definition context | Marketplace selects Expert for an AI Interaction or owns AI output | Proposal 44 |
| Commerce OS | Commerce facts, target configuration, lifecycle, authorization, operational data | Independently validates optional Asset effects | Extension, Pack, Template, or Theme creates parallel Commerce truth | Proposal 39–42; Commerce Freeze |
| Future Operating System | Its setup, Permission semantics, configuration, workflow, navigation, operational data | Independently validates optional Asset effects | Marketplace becomes required for core workflow or target writer | Proposal 39; ADR-024/ADR-025 |

## 6. Capability to Domain to Owner Navigation

The accountable Domain is the approved logical owner of the Capability. Capability accountability
does not create an additional canonical writer.

| Capability | Accountable Domain | Canonical ownership navigation |
|---|---|---|
| MC-01 Marketplace Asset Intake | MPD-01 Marketplace Asset Catalog | Marketplace Asset identity and intake |
| MC-02 Marketplace Catalog Management | MPD-01 Marketplace Asset Catalog | Asset metadata and category assignment |
| MC-03 Marketplace Asset Version Management | MPD-03 Marketplace Asset Lifecycle and Versioning | Marketplace Asset Version |
| MC-04 Marketplace Review and Validation | MPD-04 Marketplace Review, Validation, Certification, and Trust | Marketplace Review |
| MC-05 Marketplace Certification | MPD-04 Marketplace Review, Validation, Certification, and Trust | Marketplace Certification |
| MC-06 Marketplace Trust and Provenance | MPD-04 Marketplace Review, Validation, Certification, and Trust | Assurance evidence and derived Trust Profile |
| MC-07 Marketplace Discovery and Search Participation | MPD-10 Marketplace Discovery, Search, and Intelligence Participation | Projection-only Discovery/Search Views |
| MC-08 Marketplace Recommendation and Intelligence Participation | MPD-10 Marketplace Discovery, Search, and Intelligence Participation | Projection-only Marketplace Eligibility View |
| MC-09 Marketplace Compatibility Evaluation | MPD-05 Marketplace Compatibility and Dependencies | Declaration and Marketplace Assessment |
| MC-10 Marketplace Dependency Understanding | MPD-05 Marketplace Compatibility and Dependencies | Dependency Declaration |
| MC-11 Marketplace Licensing | MPD-06 Marketplace Licensing and Commercial Participation | Marketplace License Definition |
| MC-12 Marketplace Pricing and Commercial Participation | MPD-06 Marketplace Licensing and Commercial Participation | Marketplace Offer |
| MC-13 Marketplace Acquisition | MPD-07 Marketplace Acquisition and Entitlement | Marketplace Purchase |
| MC-14 Marketplace Entitlement | MPD-07 Marketplace Acquisition and Entitlement | Marketplace Entitlement |
| MC-15 Marketplace Distribution | MPD-08 Marketplace Distribution | Distribution Availability |
| MC-16 Marketplace Installation | MPD-09 Marketplace Installation, Activation, Applicability, and Upgrade | Marketplace Installation |
| MC-17 Marketplace Activation and Applicability | MPD-09 Marketplace Installation, Activation, Applicability, and Upgrade | Activation and Applicability |
| MC-18 Marketplace Upgrade and Removal | MPD-09 Marketplace Installation, Activation, Applicability, and Upgrade | Owner-preserving scoped transitions |
| MC-19 Marketplace Shared Lifecycle Management | MPD-03 Marketplace Asset Lifecycle and Versioning | Shared Asset Version lifecycle |
| MC-20 Marketplace Security and Privacy Participation | MPD-11 Marketplace Security, Privacy, Audit, and Governance | Marketplace policy; Core retains canonical grants |
| MC-21 Marketplace Audit and Governance Participation | MPD-11 Marketplace Security, Privacy, Audit, and Governance | Governance Action; Core retains Audit Record |
| MC-22 Marketplace Analytics Participation | MPD-12 Marketplace Operations and Analytics Participation | Projection-only Analytics participation |
| MC-23 Marketplace Publisher and Partner Participation | MPD-02 Marketplace Publisher and Ecosystem Participation | Marketplace Publisher and Participation |
| MC-24 Marketplace Operations and Support | MPD-12 Marketplace Operations and Analytics Participation | Projection-only coordination views |

## 7. Domain Relationship Summary

| Domain | Primary incoming dependency | Primary outgoing relationship | Boundary reminder |
|---|---|---|---|
| MPD-01 Asset Catalog | Core publisher/organization references | MPD-03 version collection | Owns identity, not version content |
| MPD-02 Publisher and Ecosystem Participation | Core identity/organization references | MPD-01 provenance and submission context | Owns Marketplace profile, not Core identity |
| MPD-03 Asset Lifecycle and Versioning | MPD-01 Asset; MPD-04 evidence | MPD-08 published version availability | Owns publication state, not Review evidence |
| MPD-04 Review, Validation, Certification, and Trust | MPD-03 version reference | Evidence to MPD-03 and projections | Evidence does not publish or authorize target use |
| MPD-05 Compatibility and Dependencies | Version and declared context | Assessment to MPD-09 and target owner | Assessment does not replace target validation |
| MPD-06 Licensing and Commercial Participation | Asset/version and Core commercial references | Offer context to MPD-07 | Owns no payment, Purchase, or Entitlement |
| MPD-07 Acquisition and Entitlement | Offer and Core billing outcomes | Entitlement validation for MPD-09 | Entitlement grants no Permission or Activation |
| MPD-08 Distribution | Published immutable version and restrictions | Availability validation for MPD-09 | Distribution creates no Installation |
| MPD-09 Installation, Activation, Applicability, and Upgrade | Entitlement, Distribution, compatibility, dependencies, target validation | Scoped state and target handoff | Owns no target configuration or operational fact |
| MPD-10 Discovery, Search, and Intelligence Participation | Authorized Marketplace source facts | Core Search, Recommendation, Product Hub | Projection-only; no canonical writer |
| MPD-11 Security, Privacy, Audit, and Governance | Core security and authorization context | Governance intent and Audit evidence | Action cannot write another Domain |
| MPD-12 Operations and Analytics Participation | Authorized canonical outcomes | Core Analytics and operational views | Projection-only under Patch PP-09 |

## 8. Domain to Canonical Fact Navigation

| Domain | Canonical facts | Fact count |
|---|---|---:|
| MPD-01 | Marketplace Asset; Marketplace Asset Category Assignment | 2 |
| MPD-02 | Marketplace Publisher; Publisher Participation | 2 |
| MPD-03 | Marketplace Asset Version; Marketplace Asset Version lifecycle state | 2 |
| MPD-04 | Marketplace Review; Marketplace Certification | 2 |
| MPD-05 | Compatibility Declaration; Marketplace Compatibility Assessment; Dependency Declaration | 3 |
| MPD-06 | Marketplace License Definition; Marketplace Offer | 2 |
| MPD-07 | Marketplace Purchase; Marketplace Entitlement | 2 |
| MPD-08 | Distribution Availability | 1 |
| MPD-09 | Marketplace Version Selection; Marketplace Installation; Marketplace Scoped Configuration; Marketplace Activation; Marketplace Applicability; Installation Dependency Resolution | 6 |
| MPD-10 | None; projection-only | 0 |
| MPD-11 | Marketplace Governance Action | 1 |
| MPD-12 | None; projection-only | 0 |
| **Total** | **Approved canonical Marketplace facts** | **23** |

## 9. Domain to Canonical Write Model Navigation

| Domain | Canonical write models | Count |
|---|---|---:|
| MPD-01 | MWM-02 Marketplace Asset | 1 |
| MPD-02 | MWM-01 Marketplace Publisher | 1 |
| MPD-03 | MWM-03 Marketplace Asset Version | 1 |
| MPD-04 | MWM-04 Marketplace Review; MWM-05 Marketplace Certification | 2 |
| MPD-05 | MWM-06 Marketplace Compatibility; MWM-07 Marketplace Dependency | 2 |
| MPD-06 | MWM-08 Marketplace License; MWM-09 Marketplace Offer | 2 |
| MPD-07 | MWM-10 Marketplace Purchase; MWM-11 Marketplace Entitlement | 2 |
| MPD-08 | MWM-12 Marketplace Distribution | 1 |
| MPD-09 | MWM-13 Marketplace Version Selection; MWM-14 Marketplace Installation; MWM-15 Marketplace Scoped Configuration; MWM-16 Marketplace Activation; MWM-17 Marketplace Applicability | 5 |
| MPD-10 | None; projection-only | 0 |
| MPD-11 | MWM-18 Marketplace Governance Action | 1 |
| MPD-12 | None; projection-only | 0 |
| **Total** | **Approved canonical write models** | **18** |

Patch PP-05 places required-Permission and data-access declarations inside MWM-03. It creates no
additional write model. Patch PP-09 confirms that MPD-12 has none.

## 10. Domain to Aggregate Navigation

| Domain | Aggregate candidates | Count |
|---|---|---:|
| MPD-01 | Marketplace Asset | 1 |
| MPD-02 | Marketplace Publisher | 1 |
| MPD-03 | Marketplace Asset Version | 1 |
| MPD-04 | Marketplace Review; Marketplace Certification | 2 |
| MPD-05 | Marketplace Compatibility; Marketplace Dependency | 2 |
| MPD-06 | Marketplace License; Marketplace Offer | 2 |
| MPD-07 | Marketplace Purchase; Marketplace Entitlement | 2 |
| MPD-08 | Marketplace Distribution | 1 |
| MPD-09 | Marketplace Version Selection; Marketplace Installation; Marketplace Scoped Configuration; Marketplace Activation; Marketplace Applicability | 5 |
| MPD-10 | None; projection-only | 0 |
| MPD-11 | Marketplace Governance Action | 1 |
| MPD-12 | None; projection-only | 0 |
| **Total** | **Approved aggregate candidates** | **18** |

These are logical invariant boundaries only. This table does not define storage or transaction
boundaries.

## 11. Canonical Ownership Chain Navigation

| Architectural subject | Identity or source owner | Mutation owner | Invariant owner | Projection consumer |
|---|---|---|---|---|
| Asset identity | MPD-01 | MWM-02 / MPD-01 | Marketplace Asset aggregate / MPD-01 | MPD-10, MPD-12, Product Hub, Core Search |
| Asset Version | MPD-03 | MWM-03 / MPD-03 | Marketplace Asset Version aggregate / MPD-03 | Review, Distribution, scoped adoption, projections |
| Review and Certification | MPD-04 | MWM-04/MWM-05 / MPD-04 | Review/Certification aggregates / MPD-04 | MPD-03 validation, Trust Profile, projections |
| Compatibility and Dependency declarations | MPD-05 | MWM-06/MWM-07 / MPD-05 | Compatibility/Dependency aggregates / MPD-05 | MPD-09 and target owner |
| License and Offer | MPD-06 | MWM-08/MWM-09 / MPD-06 | License/Offer aggregates / MPD-06 | MPD-07; Core financial owners retain their facts |
| Purchase and Entitlement | MPD-07 | MWM-10/MWM-11 / MPD-07 | Purchase/Entitlement aggregates / MPD-07 | MPD-09 and authorized projections |
| Distribution Availability | MPD-08 | MWM-12 / MPD-08 | Marketplace Distribution aggregate / MPD-08 | MPD-09 and discovery projections |
| Scoped adoption | MPD-09 | MWM-13 through MWM-17 / MPD-09 | Five MPD-09 aggregates | Target owners and authorized projections |
| Governance Action | MPD-11 | MWM-18 / MPD-11 | Marketplace Governance Action aggregate | Affected canonical owner and Core Audit |
| Discovery and Search views | Source Domains remain canonical | No MPD-10 canonical write | No MPD-10 aggregate | MPD-10 projections and Core Search |
| Operations and Analytics views | Source Domains remain canonical | No MPD-12 canonical write | No MPD-12 aggregate | MPD-12 projections and Core Analytics |

## 12. Lifecycle to Owner Navigation

| Lifecycle subject | Exactly one owner | Approved relationship | Detailed policy status |
|---|---|---|---|
| Marketplace Asset identity | MPD-01 | Identity may be created, maintained, and closed from new publication while history remains | Exact states and closure remain DD-MP-02 |
| Marketplace Asset Version | MPD-03 | Draft → Review → Approved → Published → Deprecated → Archived | Rejection/remediation and detailed policy remain DD-MP-03, DD-MP-04, DD-MP-13, DD-MP-19 |
| Marketplace Review | MPD-04 | Version-scoped evidence and outcomes; MPD-03 validates required outcomes | Dimension detail and re-review policy remain DD-MP-14 |
| Marketplace Certification | MPD-04 | Evidence-backed attestation distinct from Review and publication | Kinds and lifecycle detail remain DD-MP-15 |
| Marketplace Compatibility Assessment | MPD-05 | Versioned Marketplace assessment; target owner decides target acceptance | Policy and assessment lifecycle remain DD-MP-21/DD-MP-22 |
| Dependency Declaration | MPD-05 | Shared version-scoped declaration distinct from installation resolution | Semantics and propagation remain DD-MP-23 through DD-MP-27 |
| Marketplace License Definition | MPD-06 | License and its versions remain distinct from Offer and Purchase | Legal and lifecycle detail remains DD-MP-28 |
| Marketplace Offer | MPD-06 | Commercial presentation distinct from billing and acquisition | Offer rules remain DD-MP-29 through DD-MP-31 |
| Marketplace Purchase | MPD-07 | Workspace-scoped acquisition outcome | Reversal and cancellation remain DD-MP-32 |
| Marketplace Entitlement | MPD-07 | Workspace-scoped continued Marketplace right | Trial through continued-use policy remains DD-MP-33/DD-MP-34 |
| Distribution Availability | MPD-08 | Availability of a Published immutable version | Distribution policy remains DD-MP-35/DD-MP-36 |
| Marketplace Version Selection | MPD-09 | Workspace selects an exact immutable version | Upgrade and rollback policy remains DD-MP-42 |
| Marketplace Installation | MPD-09 | Workspace-scoped state, separate from Activation and target configuration | State, retry, timeout, recovery remain DD-MP-37/DD-MP-38 |
| Marketplace Scoped Configuration | MPD-09 | Marketplace lifecycle settings only | Structure and closure remain DD-MP-39 |
| Marketplace Activation | MPD-09 | Enables possible authorized use; grants no Permission | Transition and recovery remain DD-MP-40 |
| Marketplace Applicability | MPD-09 | Workspace or selected Business scope only | Transition and multi-Business behavior remain DD-MP-41 |
| Upgrade and removal coordination | MPD-09 | Changes scoped state while preserving immutable history and external ownership | Detailed behavior remains DD-MP-42/DD-MP-43 |
| Marketplace Governance Action | MPD-11 | Records authorized intent/outcome; affected owner performs its transition | Classes and emergency policy remain DD-MP-20 |
| OS lifecycle | Applicable Core coordinator and selected OS | Marketplace state never substitutes for OS lifecycle state | External frozen lifecycle; not a Marketplace decision |

## 13. Read Model and Projection Navigation

| Read model or projection | Projection owner | Canonical sources retained by | External relationship | Ownership guardrail |
|---|---|---|---|---|
| Marketplace Trust Profile | MPD-04 | Marketplace source Domains and authorized external owners | Supports assurance and eligibility context | Never a hidden score, Permission, Recommendation, or target decision |
| Marketplace Discovery View | MPD-10 | Marketplace canonical Domains | Product Hub and authorized discovery | Disposable, non-canonical |
| Marketplace Search View | MPD-10 | Marketplace canonical Domains | Supplies minimized input to Core Search | Core owns Search Index and query behavior |
| Marketplace Eligibility View | MPD-10 | Marketplace canonical Domains and authorized context owners | Recommendation Engine, Product Hub, Implementation Option mapping | Eligibility is not Recommendation or target authorization |
| Marketplace Operational Dashboard | MPD-12 | Authorized Marketplace and Core source owners | Marketplace operations coordination | No support, incident, SLO, recovery, or continuity source record |
| Marketplace Analytics views | MPD-12 | Authorized Marketplace source owners | Supplies outcomes to Core Analytics | Core owns platform Analytics projections |
| Product Hub Marketplace composition | Product Hub | Marketplace and Core source owners | Journey display and handoff | Product Hub writes no Marketplace model |
| Core Search Index | Core Search | Marketplace supplies governed source projection | Platform Search | Marketplace does not own the index |
| Platform Analytics projection | Core Analytics | Marketplace supplies governed outcomes | Platform Analytics | MPD-12 remains projection-only |

Projection rules are unchanged: same-or-narrower authorization and scope, source attribution,
freshness visibility, rebuildability, and no write-back to canonical owners. Exact fields,
ranking, measures, retention, dashboards, and access policy remain deferred under DD-MP-44 through
DD-MP-46 and DD-MP-50.

## 14. Asset-Family Navigation

Marketplace owns the Marketplace Asset representation, immutable Marketplace Asset Version, and
approved Marketplace lifecycle facts. The external owner column identifies canonical meaning or
target facts that remain outside Marketplace.

| Asset family | Marketplace-owned representation | External owner retained | Never becomes Marketplace-owned |
|---|---|---|---|
| Operating System | Marketplace Asset/version and Marketplace lifecycle state | Core Product/Plan and OS commercial owners; applicable OS lifecycle and operational owner | OS Product, Plan, Subscription, installation/readiness truth, setup, operational facts |
| Extension | Marketplace Asset/version and scoped Marketplace state | Applicable target Core or OS owner | Target business facts, configuration, lifecycle, authorization |
| Connector | Extension-subtype Asset/version and scoped state | External provider owns its truth; target owner owns target facts | External-provider truth, Core secrets policy, target facts |
| Knowledge Pack | Marketplace distribution representation and scoped state | Knowledge Engine | Knowledge Pack content, publication meaning, applicability interpretation, consumption |
| Capability Pack | Marketplace Asset/version | Capability Registry | Capability identity, meaning, dependencies, applicability, lifecycle |
| AI Expert | Marketplace Asset/version and scoped state | AI Coordinator; Knowledge Engine for Knowledge | Expert selection/coordination, AI artifacts, Knowledge |
| Automation Pack | Marketplace Asset/version | Knowledge/Rules owners, Configuration Engine, target owner | Knowledge, Rules, Configuration Proposal, applied automation and outcomes |
| Workflow Pack | Marketplace Asset/version | Knowledge Engine where referenced; applicable target owner | Canonical workflow Knowledge, applied configuration, workflow instances and records |
| Dashboard Pack | Marketplace Asset/version | Core Analytics or applicable OS | Source facts, projections, applied dashboard/report configuration and presentation |
| Template | Marketplace Asset/version | Applicable target owner | Applied target configuration and generated Invoice, Receipt, contract, message, or record |
| Theme | Marketplace Asset/version and scoped Marketplace state | Applicable target owner | Applied presentation configuration, business logic, authorization, navigation truth |
| Report definition | Dashboard Pack or Template representation, as approved | Core Analytics or applicable OS/target owner | Source facts, applied report configuration, generated operational truth |
| Industry Solution | Curated discovery composition only | Every composed Asset and target owner retains ownership | New Asset category, new OS, or parallel canonical truth |

Category-specific structures and application details remain deferred. This table does not approve
content schemas, execution behavior, or new categories.

## 15. Deferred Decision Navigation

All fifty Deferred Decisions remain unresolved. The ranges below are navigation groupings copied
from Proposal section 46; they are not decisions or answers.

| Range | Subject | Related navigation sections | Status |
|---|---|---|---|
| DD-MP-01–DD-MP-06 | Asset identity, categories, versions, Capability Packs, Industry Solutions | 8, 12, 14 | Preserved |
| DD-MP-07–DD-MP-12 | Publishers and participation | 5–8 | Preserved |
| DD-MP-13–DD-MP-20 | lifecycle, Review, Certification, Trust, Governance | 8, 12, 13 | Preserved; DD-MP-14 remains aligned by PP-02 |
| DD-MP-21–DD-MP-27 | compatibility and dependencies | 7, 8, 12 | Preserved |
| DD-MP-28–DD-MP-34 | License, commercial participation, Purchase, Entitlement | 5, 8–12 | Preserved |
| DD-MP-35–DD-MP-43 | Distribution and scoped adoption | 8–12 | Preserved |
| DD-MP-44–DD-MP-46 | discovery, Search, Recommendation, Analytics | 5 and 13 | Preserved |
| DD-MP-47–DD-MP-50 | Security, privacy, Audit, operations, global behavior | 5, 13, 14 | Preserved |

## 16. ADR Dependency Navigation

### 16.1 Accepted Governance dependencies

| Concern | Accepted ADR dependencies | Marketplace navigation |
|---|---|---|
| Core bounded context and organization | ADR-002 through ADR-004, ADR-027, ADR-040 | Sections 4–5 |
| Capability and Module boundaries | ADR-007, ADR-008 | Sections 6 and 14 |
| shared immutable Assets and scoped state | ADR-009, ADR-010, ADR-028, ADR-039 | Sections 8, 11–14 |
| human control and Configuration Proposal | ADR-014, ADR-017 | Sections 5, 12, 14 |
| Product Hub and OS independence | ADR-019, ADR-020, ADR-024 through ADR-026 | Sections 3–5 and 14 |
| AI boundaries | ADR-029 through ADR-032 | Sections 5 and 14 |
| explicit context and compatibility | ADR-034 through ADR-037 | Sections 3–5, 12–13 |
| Audit and source ownership | ADR-038, ADR-040 | Sections 5, 11, 13 |

### 16.2 PP-07 normalized Draft trace labels

| Classification | Trace labels | Status effect |
|---|---|---|
| Accepted dependencies, not new candidates | DADR-MP-03, DADR-MP-13, DADR-MP-14, DADR-MP-15, DADR-MP-17, DADR-MP-20 | Governed by existing Accepted ADRs; no new ADR |
| Retained possible net-new subjects | DADR-MP-01, DADR-MP-02, DADR-MP-04 through DADR-MP-12, DADR-MP-16, DADR-MP-18, DADR-MP-19 | Draft only; no reserved number or authority |

Wave 2 accepts, rejects, drafts, renumbers, or reopens no ADR.

## 17. Documentation Improvement Register

| ID | Documentation improvement | Primary value | Architecture impact |
|---|---|---|---|
| W2-01 | Marketplace documentation dependency matrix | Establishes authoritative reading order | NONE |
| W2-02 | Cross-milestone reading matrix | Connects common questions to frozen owners | NONE |
| W2-03 | Topic navigation matrix | Locates Proposal, Patch, and Wave references | NONE |
| W2-04 | Frozen authority matrix | Makes authority precedence visible | NONE |
| W2-05 | Marketplace/external milestone matrix | Consolidates collaboration and exclusions | NONE |
| W2-06 | Capability-to-Domain-to-owner table | Audits all 24 accountable homes | NONE |
| W2-07 | Domain relationship summary | Shows approved dependency direction | NONE |
| W2-08 | Domain-to-fact table | Navigates all 23 canonical facts | NONE |
| W2-09 | Domain-to-write-model table | Navigates all 18 write models | NONE |
| W2-10 | Domain-to-aggregate table | Navigates all 18 aggregate candidates | NONE |
| W2-11 | Canonical ownership-chain table | Links source, mutation, invariant, and projection layers | NONE |
| W2-12 | Lifecycle-to-owner table | Distinguishes approved allocation from deferred detail | NONE |
| W2-13 | Read-model and projection table | Prevents projection/source conflation | NONE |
| W2-14 | Asset-family/external-owner table | Preserves external owner boundaries by family | NONE |
| W2-15 | Deferred Decision range navigation | Keeps DD-MP-01 through DD-MP-50 findable and unresolved | NONE |
| W2-16 | Accepted ADR dependency table | Connects Marketplace concerns to Governance | NONE |
| W2-17 | PP-07 ADR classification table | Separates Accepted dependencies from Draft trace labels | NONE |

**Documentation improvements: 17**  
**Cross-milestone improvements: 6** — W2-02, W2-04, W2-05, W2-14, W2-16, W2-17.  
**Navigation improvements: 11** — W2-01, W2-03, W2-06 through W2-13, W2-15.

## 18. Validation

| Required validation | Result | Evidence |
|---|---:|---|
| Architecture changes introduced | ZERO | Every section reproduces or links approved baseline content |
| Ownership changes | ZERO | Existing owners are copied without reassignment |
| Capability changes | ZERO | MC-01 through MC-24 and accountable Domains are unchanged |
| Domain changes | ZERO | MPD-01 through MPD-12 are unchanged |
| Canonical fact changes | ZERO | The approved 23 facts are only regrouped by owner |
| Canonical write-model changes | ZERO | MWM-01 through MWM-18 are unchanged |
| Aggregate changes | ZERO | The approved 18 candidates are unchanged |
| Lifecycle changes | ZERO | Approved owners are navigated; detailed policy remains deferred |
| Deferred Decisions changed | ZERO | DD-MP-01 through DD-MP-50 remain preserved and unresolved |
| ADR changes | ZERO | PP-07 classifications remain unchanged; no ADR is created |
| Proposal or Patch decisions changed | ZERO | Proposal plus Patch remains the controlling architecture |
| Implementation or technology introduced | ZERO | No API, Event, Contract, schema, infrastructure, deployment, framework, or vendor is defined |

## 19. Recommendation

# READY FOR DOCUMENTATION WAVE 3

Wave 2 completes its cross-document and cross-milestone navigation scope without changing the
approved Marketplace Proposal Baseline v0.1.1.

## References

### Marketplace baseline and documentation

- [Marketplace Discovery v0.1](00-MARKETPLACE-DISCOVERY.md)
- [Marketplace Capability Map v0.1](01-MARKETPLACE-CAPABILITY-MAP.md)
- [Marketplace Architecture Proposal v0.1](02-MARKETPLACE-PROPOSAL.md)
- [Marketplace Independent Architecture Review](03-MARKETPLACE-ARCHITECTURE-REVIEW.md)
- [Marketplace Proposal Patch v0.1.1](04-MARKETPLACE-PROPOSAL-PATCH-v0.1.1.md)
- [Marketplace Independent Re-Review](05-MARKETPLACE-RE-REVIEW.md)
- [Marketplace Documentation Wave 1](06-MARKETPLACE-WAVE-1.md)

### Governance and Genesis

- [Governance ADR Repository](../00-governance/ADR/README.md)
- [Canonical Glossary](../00-governance/glossary/GLOSSARY.md)
- [Genesis Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [Genesis Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md)
- [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Genesis Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

### Frozen milestone baselines

- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Core Platform Readiness v1.0.1](../99-architecture-freeze/CORE-PLATFORM-v1.0.1-READINESS.md)
- [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Commerce OS Freeze v1.0](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md)
