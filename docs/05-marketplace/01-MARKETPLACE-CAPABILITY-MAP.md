# Marketplace Capability Map v0.1

**Status:** Logical Capability Map  
**Milestone:** Marketplace  
**Source:** Approved Marketplace Discovery v0.1  
**Architecture approval:** None  
**Domain approval:** None  
**Capability approval:** None  
**Component approval:** None

This document maps how the twenty-four candidate Marketplace Capabilities and twelve candidate
Domain clusters from the approved Discovery may logically collaborate. It describes
responsibility, information, decision, dependency, and Asset interaction flows only.

It is not architecture, a Proposal, a component model, an ownership model, or an implementation
design. Every Capability and Domain remains a candidate. All eighty Discovery Open Questions
remain unanswered.

## 1. Mission Flow

Marketplace exists to help an authorized customer find and adopt trusted platform Assets that
address Business needs while preserving shared immutable Asset Versions, scoped customer state,
independent Operating Systems, and canonical target ownership.

The logical mission flow is:

```text
Business need or independent discovery intent
  -> governed Business and Workspace context
  -> candidate Asset discovery
  -> candidate trust, License, compatibility, dependency, and eligibility understanding
  -> authorized customer choice
  -> candidate acquisition and Entitlement understanding
  -> candidate distribution and version selection understanding
  -> candidate Installation understanding
  -> candidate Activation and Applicability understanding
  -> target Platform or Operating System validation
  -> optional Asset use under target ownership
  -> candidate outcome, support, Audit, and Analytics participation
  -> future discovery and governed improvement
```

This flow is a problem-space journey. It does not approve an internal sequence, mandatory state
transition, actor authority, or implementation mechanism.

### Mission guardrails

- Business value precedes Asset volume.
- Business improvements and Capability needs precede implementation-option mapping.
- Marketplace is not a general e-commerce marketplace.
- Published Marketplace Asset Versions remain shared, versioned, immutable, and preserved.
- Purchase, Installation, Activation, version selection, and Applicability remain separate
  scoped concerns.
- Activation never grants Permission automatically.
- The target owner independently validates every target effect.
- Optional Assets never create parallel Platform or Operating System truth.

## 2. Capability Flow

### 2.1 End-to-end candidate Capability flow

```text
MC-23 Publisher and Partner Participation
  -> MC-01 Asset Intake
  -> MC-02 Catalog Management
  -> MC-03 Asset Version Management
  -> MC-04 Review and Validation
  -> MC-05 Certification, where applicable
  -> MC-06 Trust and Provenance
  -> MC-09 Compatibility Evaluation
  -> MC-10 Dependency Understanding
  -> MC-11 Licensing
  -> MC-12 Pricing and Commercial Participation
  -> MC-19 Shared Lifecycle Management
  -> MC-15 Distribution
  -> MC-07 Discovery and Search Participation
  -> MC-08 Recommendation and Intelligence Participation, where applicable
  -> MC-13 Acquisition
  -> MC-14 Entitlement
  -> MC-16 Installation
  -> MC-17 Activation and Applicability
  -> MC-18 Upgrade and Removal
  -> MC-20 Security and Privacy Participation
  -> MC-21 Audit and Governance Participation
  -> MC-22 Analytics Participation
  -> MC-24 Operations and Support
```

This does not imply that every Asset uses every candidate Capability or that the progression is
linear. Category applicability, ordering, repetition, optionality, rejection, recovery, and
authority remain open.

### 2.2 Logical flow inventory

| ID | Logical flow | Purpose |
|---|---|---|
| LF-01 | Marketplace Mission Flow | Connect Business value to governed optional Asset use |
| LF-02 | Candidate Asset Introduction Flow | Relate participant eligibility, intake, catalog, and version concerns |
| LF-03 | Candidate Review and Publication Flow | Relate validation, certification, trust, lifecycle, and distribution concerns |
| LF-04 | Candidate Discovery Flow | Relate Search, relevance, trust, compatibility, commercial, and scoped-state information |
| LF-05 | Candidate Acquisition Flow | Relate customer choice, License, Pricing, acquisition, and Entitlement concerns |
| LF-06 | Candidate Installation and Activation Flow | Relate version, prerequisites, dependencies, Installation, Activation, Applicability, and target validation |
| LF-07 | Candidate Upgrade and Removal Flow | Relate new immutable versions, compatibility, dependencies, scoped state, and history |
| LF-08 | Candidate Responsibility Flow | Map candidate responsibility participation without assigning ownership |
| LF-09 | Candidate Information Flow | Map source information, interpretation, and outputs without defining data design |
| LF-10 | Candidate Decision Flow | Map logical questions and approvals without approving decision authority |
| LF-11 | Candidate Input Flow | Map inbound context and evidence to candidate responsibility groups |
| LF-12 | Candidate Output Flow | Map logical outcomes to external consumers without defining interfaces |
| LF-13 | Candidate Capability Lifecycle | Show where candidate Capabilities may participate across the Asset journey |
| LF-14 | Logical Decision Lifecycle | Show decision progression from eligibility to ongoing use without approving states |
| LF-15 | Dependency Lifecycle | Show dependency understanding from declaration to removal impact |
| LF-16 | Asset Interaction Flow | Show shared Asset and scoped customer-state interaction boundaries |

**Logical flow count: 16**

## 3. Responsibility Flow

Candidate responsibility flows from shared Asset understanding to scoped customer adoption and
ongoing governance. The following matrix assigns no owner; it identifies only logical work that
later architecture must place.

| Candidate Capability | Receives from | Candidate responsibility | Supplies to |
|---|---|---|---|
| MC-01 Asset Intake | participant context, proposed Asset information | Check that submission information can enter candidate evaluation | MC-02, MC-04, MC-23 |
| MC-02 Catalog Management | MC-01, existing shared Asset context | Organize candidate Asset identity, category, descriptive information, provenance | MC-03, MC-06, MC-07, MC-09 |
| MC-03 Asset Version Management | MC-02, publisher change intent | Distinguish Draft content and immutable published version history | MC-04, MC-09, MC-15, MC-18, MC-19 |
| MC-04 Review and Validation | MC-01–MC-03, Security, compatibility, business evidence | Coordinate candidate quality questions and evidence | MC-05, MC-06, MC-19, MC-23 |
| MC-05 Certification | MC-04, external or reviewer evidence | Interpret possible attestations without approving their meaning | MC-06, MC-07, MC-09, MC-19 |
| MC-06 Trust and Provenance | MC-02–MC-05, lifecycle and support history | Present candidate provenance and trust evidence | MC-07, MC-13, MC-16, MC-18 |
| MC-07 Discovery and Search Participation | catalog, trust, compatibility, commercial, scoped context | Support candidate Asset discovery and Core Search participation | customer choice, Product Hub, MC-08, MC-13 |
| MC-08 Recommendation and Intelligence Participation | completed external intelligence, Marketplace facts | Relate Assets to Implementation Option and feedback questions | Product Hub, customer context, MC-07, MC-22 |
| MC-09 Compatibility Evaluation | Asset Version, target, country, OS, Plan, Permission context | Explore declared, validated, certified, and target-checked compatibility | MC-07, MC-10, MC-15–MC-18 |
| MC-10 Dependency Understanding | Asset Version, dependency declarations, compatibility | Explore dependency, conflict, cycle, and impact questions | MC-09, MC-13–MC-18, MC-24 |
| MC-11 Licensing | publisher terms, Asset or offer context | Explore License meaning, scope, acceptance, duration, and rights | MC-12–MC-18 |
| MC-12 Pricing and Commercial Participation | License, offer, billing and partner context | Explore commercial presentation and external billing relationships | MC-13, MC-14, MC-22, MC-23 |
| MC-13 Acquisition | authorized customer choice, License, Pricing, compatibility | Explore Purchase and selection questions | MC-14, MC-15, MC-21, MC-22 |
| MC-14 Entitlement | acquisition, billing, License, grant context | Explore Workspace Entitlement and continued-right questions | MC-15–MC-18, MC-21, MC-24 |
| MC-15 Distribution | published immutable version, restrictions, Entitlement | Explore governed version availability | MC-07, MC-16, MC-18, MC-24 |
| MC-16 Installation | Entitlement, version, compatibility, dependencies, target context | Explore safe, reversible, auditable installation questions | MC-17, MC-18, MC-21, MC-24 |
| MC-17 Activation and Applicability | Installation, Permission, target, Workspace and Business context | Explore Activation, deactivation, scope, and target-validation questions | target consumer, MC-18, MC-21, MC-22 |
| MC-18 Upgrade and Removal | current scoped state, new version, compatibility, dependency context | Explore update, rollback, deactivation, removal, and history questions | target consumer, MC-21, MC-22, MC-24 |
| MC-19 Shared Lifecycle Management | review, version, policy, publication context | Explore Draft-through-Archived shared lifecycle questions | MC-03, MC-06, MC-07, MC-15, MC-18 |
| MC-20 Security and Privacy Participation | actor, context, Asset risk, Permission and data needs | Explore shared Security and privacy obligations | every consequential candidate Capability |
| MC-21 Audit and Governance Participation | consequential candidate outcomes and policy context | Explore evidence, administration, enforcement, and change control | Core Audit, MC-06, MC-19, MC-24 |
| MC-22 Analytics Participation | authorized Marketplace outcomes | Explore operational and business-value projection questions | Core Analytics, MC-08, MC-23, MC-24 |
| MC-23 Publisher and Partner Participation | Core identity and future participant policy | Explore eligibility, submission, support, certification, and accountability | MC-01, MC-04–MC-06, MC-12, MC-24 |
| MC-24 Operations and Support | health, lifecycle, installation, support and incident outcomes | Explore availability, support, recovery, continuity, and global operations | customers, participants, governance, Analytics |

## 4. Information Flow

Information moves logically between canonical external sources, candidate Marketplace
responsibilities, and authorized consumers. This section does not define records, structures,
storage, or physical exchange.

### 4.1 Shared Asset information flow

```text
Participant and proposed Asset information
  -> candidate intake understanding
  -> candidate catalog and version understanding
  -> candidate review, certification, trust, compatibility, dependency,
     License, and lifecycle understanding
  -> published immutable Marketplace Asset Version context under frozen rules
  -> authorized discovery and distribution views
```

### 4.2 Scoped customer information flow

```text
Core identity, Workspace, selected Business, organization, Permission,
commercial, and lifecycle context
  + selected shared Asset Version context
  -> candidate acquisition and Entitlement understanding
  -> candidate Installation understanding
  -> candidate Activation and Applicability understanding
  -> target-owner validation
  -> authorized scoped outcome context
```

Shared Asset content is never copied into customer-owned truth. Scoped state references the
shared Asset and selected immutable version.

### 4.3 Intelligence information flow

```text
Completed Business Brain Decision and Recommendation context
  + Implementation Option mapping
  + authorized Marketplace availability, compatibility, trust, and scoped-state context
  -> Product Hub or Marketplace discovery presentation
  -> authorized customer choice
  -> governed Marketplace and target outcomes
  -> authorized Analytics or intelligence feedback participation
```

Marketplace information does not become Business DNA, Decision, Recommendation, or target
operational truth.

### 4.4 Operational information flow

```text
Candidate lifecycle or scoped-operation outcome
  -> minimum Audit, Notification, Analytics, Search, and operational participation
  -> authorized projections and support context
```

Core shared services retain their frozen responsibilities. The precise information, freshness,
retention, and privacy rules remain open.

## 5. Decision Flow

This section maps logical decision questions. It does not approve a Decision model, decision
owner, state, automated rule, or approval policy.

```text
Is the participant eligible to submit?
  -> Is the proposed item eligible to be a Marketplace Asset?
  -> Is its category and provenance sufficiently understood?
  -> Is the candidate version complete enough for Review?
  -> Does available evidence satisfy unresolved validation expectations?
  -> Is certification relevant or required?
  -> May the immutable version be published or distributed?
  -> Is the Asset discoverable for the current customer context?
  -> Is it compatible with the selected target and dependencies?
  -> Are License, Pricing, Entitlement, and country conditions satisfied?
  -> Does the authorized customer choose acquisition?
  -> Can the selected version be installed safely?
  -> Can it be activated and made applicable in the requested scope?
  -> Does the target owner independently accept the intended use or effect?
  -> Should a new immutable version be selected later?
  -> What happens under deprecation, suspension, deactivation, removal, or failure?
```

Every question remains subject to Open Questions 1–80. This flow does not imply that Marketplace
alone answers any question whose canonical facts belong to Core Platform, Business Brain,
Recommendation Engine, Configuration Engine, an Operating System, or another frozen owner.

## 6. Input Flow

### 6.1 Candidate Marketplace inputs

| Input family | Canonical source or unresolved source | Candidate consumers | Boundary |
|---|---|---|---|
| Actor and authenticated context | Core Identity and Access | MC-01, MC-04, MC-13–MC-18, MC-20–MC-24 | Identity is never Marketplace-owned |
| Workspace and organization context | Core registries | scoped candidate Capabilities | Marketplace references explicit context only |
| Business context and Business DNA references | applicable frozen owners | MC-07, MC-08, MC-17, MC-22 | Marketplace does not own Business DNA |
| Permission and access context | Core and target authorization owners | MC-04, MC-09, MC-16–MC-21 | Activation never grants Permission |
| Product, Plan, Entitlement, billing, and lifecycle context | applicable Core owners | MC-07, MC-09, MC-11–MC-18 | Marketplace must not duplicate Core commercial facts |
| Completed Decision | Business Brain | MC-08 through authorized presentation | Marketplace does not form Decision content |
| Recommendation | Recommendation Engine | MC-08, MC-07, Product Hub collaboration | Marketplace does not own Recommendation |
| Implementation Option | Core intelligence mapping owner | MC-08, MC-07 | Marketplace Asset may be referenced as an option |
| Configuration Proposal | Configuration Engine | candidate target interaction where relevant | Marketplace does not apply target state |
| Capability and Knowledge context | Capability Registry and Knowledge Engine | MC-02, MC-04, MC-07–MC-09 | Marketplace does not redefine or own source content |
| OS and target operational context | applicable OS or target owner | MC-09, MC-10, MC-16–MC-18 | Target owner retains final validation |
| Publisher and submission context | unresolved participant model | MC-23, MC-01–MC-06 | Participant model remains open |
| Asset description and candidate version content | unresolved submitting participant and future governance | MC-01–MC-06, MC-09–MC-12, MC-19 | Intake does not imply approval |
| Review, certification, and trust evidence | unresolved reviewers or evidence sources | MC-04–MC-07, MC-09, MC-19 | Evidence authority remains open |
| License, Pricing, and commercial information | unresolved Marketplace and Core commercial relationship | MC-11–MC-14 | No commercial owner is approved here |
| Usage, outcome, support, and operational context | applicable source owners | MC-22, MC-24, MC-08 | Feedback never rewrites canonical sources |

### 6.2 Input validation flow

```text
Input arrives from an identified source
  -> source authority and context are understood
  -> candidate purpose and minimization are understood
  -> version and freshness questions are understood
  -> candidate Capability uses the input only for its logical responsibility
  -> target or external owner revalidates before any consequential effect
```

No specific validation mechanism is approved.

## 7. Output Flow

### 7.1 Candidate Marketplace outputs

| Candidate output | Potential consumer | Ownership-preserving interpretation |
|---|---|---|
| Candidate Asset intake outcome | submitting participant, Review participation | Does not approve or publish an Asset |
| Catalog and Asset Version context | Product Hub, Search, customers, target owners | Shared Marketplace context, not customer-owned copy |
| Review, validation, certification, or trust context | lifecycle, discovery, customer, target owner | Does not replace target validation |
| Compatibility and dependency context | discovery, installation, target owner | Does not authorize target use |
| License and commercial context | customer, billing collaboration, Entitlement understanding | Does not become Core billing truth |
| Discovery result | authorized customer or Product Hub | Does not become Recommendation |
| Scoped acquisition or Entitlement outcome | customer, installation understanding, Product Hub | Remains distinct from Permission and Activation |
| Distribution eligibility and selected version context | Installation or upgrade understanding | References immutable version |
| Installation outcome | Activation, support, customer | Does not imply Activation or target configuration |
| Activation and Applicability outcome | target Platform or OS, Product Hub, customer | Does not grant Permission or write target facts |
| Upgrade or removal outcome | target, customer, support | Does not mutate shared Asset history |
| Audit participation input | Core Audit Service | Core Audit owns resulting Audit Record |
| Notification participation input | Core Notification Service | Core Notification owns Notification state |
| Search participation input | Core Search | Core Search owns Search Index |
| Analytics participation input | Core Analytics | Core Analytics owns platform projections |
| Intelligence feedback candidate | authorized Business Brain or Recommendation flow | Originating facts and intelligence owners remain unchanged |
| Operational and support context | customer, participant, administration | Does not create a new canonical business owner |

### 7.2 Output progression

```text
Candidate responsibility produces an owner-attributed logical outcome
  -> appropriate external boundary validates purpose and scope
  -> authorized consumer uses minimum necessary information
  -> consumer retains its own responsibility
  -> any resulting target change occurs only through the target owner
```

## 8. Candidate Capability Relationships

The relationship map preserves all twenty-four Discovery candidates without approval.

| Candidate Capability | Strong logical collaborators | Relationship question |
|---|---|---|
| MC-01 Asset Intake | MC-02, MC-04, MC-23 | What minimum submission enters evaluation? |
| MC-02 Catalog Management | MC-01, MC-03, MC-06–MC-09, MC-19 | Which information belongs to Asset identity versus Version? |
| MC-03 Asset Version Management | MC-02, MC-04, MC-09, MC-15, MC-18, MC-19 | What becomes immutable, and when? |
| MC-04 Review and Validation | MC-01–MC-06, MC-09, MC-19–MC-21, MC-23 | Which evidence and gates apply by category? |
| MC-05 Certification | MC-04, MC-06, MC-09, MC-19, MC-23 | What is certified, by whom, and for how long? |
| MC-06 Trust and Provenance | MC-02–MC-07, MC-19, MC-21–MC-24 | Which signals are explanatory rather than authoritative? |
| MC-07 Discovery and Search Participation | MC-02, MC-06, MC-08–MC-12, MC-14, MC-15, MC-17–MC-19 | How is relevant discoverability composed? |
| MC-08 Recommendation and Intelligence Participation | MC-07, MC-09, MC-14, MC-17, MC-22 | How do Marketplace facts participate without owning intelligence? |
| MC-09 Compatibility Evaluation | MC-02–MC-05, MC-07, MC-10, MC-15–MC-19 | How are declaration, validation, certification, and target check separated? |
| MC-10 Dependency Understanding | MC-03, MC-09, MC-11, MC-13–MC-19, MC-24 | How are dependency effects and cycles understood? |
| MC-11 Licensing | MC-02, MC-03, MC-10, MC-12–MC-18 | What is licensed and at what scope? |
| MC-12 Pricing and Commercial Participation | MC-11, MC-13, MC-14, MC-22, MC-23 | How are Marketplace and Core commercial concerns separated? |
| MC-13 Acquisition | MC-07, MC-09–MC-12, MC-14, MC-21, MC-22 | What does customer choice create without implying use? |
| MC-14 Entitlement | MC-10–MC-18, MC-21, MC-24 | What continued right exists under changing commercial state? |
| MC-15 Distribution | MC-03, MC-07, MC-09–MC-11, MC-14, MC-16, MC-18, MC-19 | Which version may be made available to whom? |
| MC-16 Installation | MC-09–MC-11, MC-14, MC-15, MC-17, MC-18, MC-20, MC-21, MC-24 | What does Installation mean by category? |
| MC-17 Activation and Applicability | MC-09–MC-11, MC-14, MC-16, MC-18, MC-20–MC-22 | What scope and target validation are required? |
| MC-18 Upgrade and Removal | MC-03, MC-09–MC-11, MC-14–MC-17, MC-19–MC-24 | What changes while history remains preserved? |
| MC-19 Shared Lifecycle Management | MC-02–MC-06, MC-09, MC-15, MC-18, MC-21, MC-23 | Which shared lifecycle transitions exist and who may request them? |
| MC-20 Security and Privacy Participation | all candidate Capabilities | What protection applies without making Security the business owner? |
| MC-21 Audit and Governance Participation | all consequential candidate Capabilities | Which evidence and governance actions are required? |
| MC-22 Analytics Participation | MC-07, MC-08, MC-12–MC-18, MC-23, MC-24 | Which outcomes may be projected and for what purpose? |
| MC-23 Publisher and Partner Participation | MC-01, MC-04–MC-06, MC-11, MC-12, MC-19–MC-24 | Which participant models and obligations are needed? |
| MC-24 Operations and Support | MC-03–MC-06, MC-09–MC-10, MC-14–MC-23 | How are availability, failure, support, recovery, and continuity governed? |

No relationship creates an approved dependency direction or owner.

## 9. Candidate Domain Relationships

The twelve Discovery Domain clusters remain overlapping problem-space groupings.

| Candidate Domain cluster | Logical neighboring clusters | Unresolved boundary |
|---|---|---|
| MD-01 Asset Catalog | MD-02–MD-05, MD-08, MD-10 | Asset identity, category, provenance, and version placement |
| MD-02 Publisher and Ecosystem Participation | MD-01, MD-04, MD-06, MD-11, MD-12 | Participant identity, eligibility, responsibility, support, and commercial relationship |
| MD-03 Asset Lifecycle and Versioning | MD-01, MD-04, MD-05, MD-08, MD-09, MD-11 | Shared state, immutable version, publication, deprecation, and history |
| MD-04 Review, Validation, Certification, and Trust | MD-01–MD-03, MD-05, MD-10–MD-12 | Review evidence, certification, trust, governance, and lifecycle gates |
| MD-05 Compatibility and Dependencies | MD-01, MD-03, MD-04, MD-06–MD-10, MD-12 | Declaration, validation, certification, dependency, and target-owner checks |
| MD-06 Licensing and Commercial Participation | MD-02, MD-05, MD-07–MD-10, MD-12 | License, Pricing, billing, settlement, tax, and Entitlement separation |
| MD-07 Acquisition and Entitlement | MD-05, MD-06, MD-08, MD-09, MD-11, MD-12 | Purchase, Entitlement, License, continued rights, and scoped state |
| MD-08 Distribution | MD-01, MD-03, MD-05–MD-07, MD-09, MD-10, MD-12 | Published availability, restriction, integrity, and Installation handoff |
| MD-09 Installation, Activation, Applicability, and Upgrade | MD-03, MD-05–MD-08, MD-10–MD-12 | Scoped states, target validation, update, removal, and recovery |
| MD-10 Discovery, Search, and Intelligence Participation | MD-01, MD-04–MD-09, MD-12 | Search, Recommendation, Product Hub, Analytics, and customer-choice separation |
| MD-11 Security, Privacy, Audit, and Governance | all candidate clusters | Cross-cutting protection versus business responsibility placement |
| MD-12 Operations and Analytics Participation | all candidate clusters | Source facts, projections, support, incidents, continuity, and feedback |

The Capability Map does not merge, split, or approve these clusters. The Proposal must determine
whether any candidate cluster becomes a Domain, is absorbed elsewhere, remains cross-cutting, or
is rejected.

## 10. Logical Dependency Flow

### 10.1 Candidate dependency chain

```text
Asset and version identity understood
  -> publisher and lifecycle eligibility understood
  -> License and distribution eligibility understood
  -> target and category compatibility understood
  -> direct and transitive dependency declarations understood
  -> dependency compatibility understood
  -> dependency acquisition and Entitlement questions understood
  -> dependency Installation and Activation questions understood
  -> target-owner validation
  -> dependency health, update, deprecation, and removal impact understood
```

### 10.2 Dependency relationship types to explore

- Asset-to-Asset;
- Asset-to-Asset-Version;
- Asset-to-Core Platform version;
- Asset-to-Operating-System or OS version;
- Asset-to-Plan, Module, or feature eligibility;
- Asset-to-Capability or Knowledge context;
- Asset-to-country, jurisdiction, language, or localization context;
- Asset-to-Permission or data-access need;
- Asset-to-external provider; and
- Asset-to-target configuration or operational prerequisite.

These are questions, not approved dependency types.

### 10.3 Dependency guardrails

- A dependency never transfers canonical ownership.
- A dependency cannot make another Operating System required for an OS's core workflow.
- Dependency satisfaction cannot grant Permission automatically.
- Dependency resolution cannot silently acquire, purchase, install, activate, or configure
  another Asset.
- Exact dependency semantics remain Open Questions 33–40.

## 11. Ownership Boundaries

This section restates frozen predecessor ownership only. It approves no new Marketplace owner or
internal ownership allocation.

### 11.1 Frozen Marketplace boundary

Accepted ADR-027 and ADR-028 establish that Marketplace is a bounded context within Core
Platform. The bounded context retains Marketplace Asset, immutable Asset Version, publisher,
Review, Purchase, Installation, Activation, Applicability, and Marketplace lifecycle concerns.
Published versions are shared and immutable; scoped state never copies or mutates them.

The internal allocation among candidate Capabilities or candidate Domain clusters is not
approved.

### 11.2 Frozen external boundaries

| Concept | Frozen external owner | Marketplace relationship |
|---|---|---|
| Identity, Authentication, Workspace Membership | Core Identity and Access | Consume verified context |
| Workspace, Business, Business Unit, Department, Branch | applicable Core registry | Reference explicit scope |
| Core Product, Plan, billing, Subscription, shared lifecycle | applicable Core commercial owner | Consume without duplication |
| Product Hub journey | Product Hub | Supply authorized discovery and scoped-state information |
| Business DNA | Business DNA owner | Consume only through authorized intelligence context |
| Knowledge and Knowledge Packs content | Knowledge Engine | Marketplace distribution must not become Knowledge ownership |
| Capability definitions | Capability Registry | Reference without redefining |
| Decision | Business Brain | Consume completed Decision context only where authorized |
| Recommendation | Recommendation Engine | Participate in presentation without creating Recommendation |
| Implementation Option | Core intelligence mapping owner | Provide eligible Asset context without owning mapping |
| Configuration Proposal | Configuration Engine | Never apply target state |
| AI coordination and AI artifacts | AI Coordinator | Distribute eligible AI Expert Definitions without coordinating responses |
| OS operational facts | applicable Operating System | Target owner validates every effect |
| Audit Record | Core Audit Service | Supply attributable evidence only |
| Notification state | Core Notification Service | Supply notification-relevant source context only |
| Search Index | Core Search | Supply authorized Marketplace source information only |
| Analytics projection | Core Analytics | Supply governed source outcomes only |

### 11.3 Boundary invariants

- Product Hub is not Marketplace.
- Marketplace is not Business Brain or Recommendation Engine.
- Marketplace discovery is not Recommendation ownership.
- Marketplace installation is not target configuration.
- Marketplace Activation is not Permission assignment.
- Marketplace Applicability is not ownership of the Business or target resource.
- Marketplace Asset is not an OS operational fact.
- Marketplace Analytics is not source truth.
- No candidate internal boundary may weaken these frozen constraints.

## 12. External Dependencies

| External dependency | What candidate Capabilities need from it | What Marketplace must not absorb |
|---|---|---|
| Core Identity and Access | Actor, authentication, Membership, Permission and service context | identity or canonical grants |
| Core organization registries | Workspace, Business, Business Unit, Department, Branch context | organization identity or hierarchy |
| Product and Plan Catalog | canonical Platform and OS Product and Plan context | product or Plan source records |
| Billing and commercial control | billing and commercial outcome context | Core billing truth or settlement without approval |
| Product Hub | customer journey and discovery composition | journey ownership |
| Business DNA Registry | authorized Business context | Business facts or DNA |
| Knowledge Engine | Knowledge Pack and Knowledge content context | Knowledge ownership |
| Capability Registry | Capability definitions and references | Capability ownership |
| Business Brain | completed Decision context | Decision formation or history |
| Recommendation Engine | Recommendation and disposition context | Recommendation creation or prioritization |
| Implementation Option mapping | mapped Asset reference context | implementation-option ownership |
| Configuration Engine | Configuration Proposal context where relevant | proposal or target configuration ownership |
| Core Search | Marketplace search projection participation | Search Index ownership |
| Core Analytics | analytical projection participation | platform Analytics ownership |
| Core Audit | append-only evidence participation | Audit Record ownership |
| Core Notification | customer and participant notification participation | Notification state ownership |
| AI Coordinator | AI Expert eligibility and AI-owned runtime context | expert selection and AI response coordination |
| Commerce OS | target validation and Commerce-owned outcomes | Commerce facts |
| Future Operating Systems | category-specific target validation and outcomes | future OS facts |
| External providers | unresolved Connector, License, validation, commercial, or support context | external source truth |

The exact shape, timing, availability, and failure treatment of every dependency remain open.

## 13. Marketplace Inputs

Marketplace candidate Capabilities may logically consume:

1. proposed Asset and candidate version information;
2. participant identity, eligibility, provenance, and agreement context;
3. review, validation, certification, Security, compatibility, performance, UX, business, and
   support evidence;
4. immutable published Asset Version context;
5. Core Product, Plan, Entitlement, billing, and lifecycle context;
6. Workspace, Business, Business Unit, Department, Branch, OS, Module, Resource, and Permission
   context where applicable;
7. supported country, jurisdiction, language, localization, and target context;
8. License, Pricing, commercial offer, and continued-right information;
9. compatibility and dependency declarations;
10. completed Business Brain Decision and Recommendation context where authorized;
11. Implementation Option references;
12. target Platform and Operating System validation outcomes;
13. customer choice and scoped lifecycle intent;
14. Installation, Activation, Applicability, update, deactivation, removal, and recovery outcomes;
15. operational, support, incident, vulnerability, and quality context; and
16. authorized usage, adoption, outcome, Search, and Analytics context.

This inventory neither defines required fields nor assigns input ownership beyond frozen
external owners.

## 14. Marketplace Outputs

Candidate logical outputs may include:

1. intake completeness or rejection context;
2. shared Asset identity and descriptive context;
3. Draft or immutable published version references;
4. review, validation, certification, trust, provenance, and lifecycle context;
5. compatibility and dependency understanding;
6. License, Pricing, and commercial presentation context;
7. discovery and Search participation context;
8. Implementation Option eligibility context;
9. Purchase or acquisition outcome context;
10. Workspace Entitlement context;
11. distribution availability and selected immutable version context;
12. Installation outcome context;
13. Activation, deactivation, and Applicability context;
14. upgrade, rollback-selection, removal, and retained-history context;
15. target-owner validation request or outcome context without target ownership;
16. Audit, Notification, Search, and Analytics participation inputs;
17. Product Hub lifecycle and discovery projections;
18. authorized intelligence feedback candidates; and
19. operational, support, incident, and recovery context.

No output format, record, interface, or publication mechanism is approved.

## 15. Marketplace Responsibilities

Frozen predecessor decisions establish Marketplace responsibility for its bounded context. This
Capability Map explores, without internally allocating or approving, logical responsibility for:

- Marketplace Asset and immutable Asset Version understanding;
- publisher and Review problem space;
- shared Marketplace lifecycle understanding;
- customer Purchase, Installation, Activation, version selection, and Applicability concerns;
- asset discovery and distribution participation;
- License, Entitlement, compatibility, dependency, validation, certification, trust, and
  Governance questions;
- Marketplace Security, privacy, Audit, Search, Analytics, and operations participation;
- target-owner-safe adoption and optional use; and
- preserved history across version, update, deprecation, and removal.

This is a responsibility problem inventory. The Proposal must decide which responsibilities are
inside Marketplace, externally retained, or shared only as collaboration—without contradicting
ADR-027 or ADR-028.

## 16. Marketplace Non-Responsibilities

Marketplace must not become responsible for:

- physical-product or consumer-goods commerce;
- Core User, Authentication, Membership, organization identity, or canonical Permission grants;
- Core Product, Plan, billing, OS Subscription, or final OS readiness source truth;
- Product Hub journey composition;
- Business DNA, Knowledge content, Rule, or Capability ownership;
- Business Brain Decision formation or history;
- Recommendation creation, prioritization, or disposition;
- Implementation Option mapping;
- Configuration Proposal or target configuration;
- AI Expert selection, AI orchestration, or AI response ownership;
- Commerce OS or another Operating System's operational facts;
- Core Audit Record, Notification state, Search Index, or Analytics projection;
- automatic Permission assignment through Activation;
- a customer-owned copy of shared Asset content;
- mutation of a published Asset Version; or
- a parallel source of Platform or Operating System truth.

## 17. Marketplace Collaboration with Platform and Milestone Owners

### 17.1 Core Platform

Core Platform supplies shared identity, organization, commercial, Product Hub, Security, Audit,
Notification, Search, Analytics, navigation, and operational foundations. Marketplace remains a
distinct bounded context within that offering.

Candidate collaboration questions include eligibility context, commercial state, scoped
lifecycle coordination, shared services, and future partner participation. Marketplace cannot
duplicate Core source records.

### 17.2 Product Hub

Product Hub composes Business context, Recommendations, Implementation Options, Product and Plan
information, Marketplace discovery, scoped state, and setup routing. Marketplace supplies
authorized Marketplace context; Product Hub neither writes Marketplace state nor becomes its
source.

The detailed discovery, selection, handoff, stale-state, failure, and presentation relationship
remains open.

### 17.3 Business Brain

Business Brain owns completed Decisions and candidate reasoning. It may consume authorized
Marketplace facts as context or feedback and may identify a Marketplace-relevant implementation
need only through the established intelligence path. It cannot create Marketplace state.

### 17.4 Recommendation Engine

Recommendation Engine owns Recommendation and disposition. Marketplace may supply Asset
availability and eligibility context and present mapped implementation options. It cannot create,
prioritize, or dispose of Recommendations.

### 17.5 Commerce OS

Commerce OS retains all canonical Commerce facts. A Commerce-related Asset remains optional,
uses target-owner validation, and cannot create parallel Product, Price, Stock, Inventory
Movement, Transfer, Order, POS Transaction, Transactional Customer, Payment, Refund, tax,
Commerce Document, Return, Exchange, Commercial Adjustment, Setup, or readiness truth.

### 17.6 Future Operating Systems

Future Operating Systems remain independent. Marketplace may distribute eligible Assets for
them without embedding another OS as a core dependency or acquiring target facts. Category,
compatibility, target-validation, and outcome relationships remain open.

## 18. Marketplace Collaboration with Asset Families

### 18.1 Knowledge Packs

Marketplace participates in Purchase, Installation, Activation, version selection, and Business
Applicability for a Knowledge Pack. Knowledge Engine retains Knowledge content and Knowledge
applicability meaning. The two lifecycles must remain distinguishable.

### 18.2 AI Experts

Marketplace may distribute eligible AI Expert Definitions. AI Coordinator retains expert
selection, orchestration, and AI output. AI Experts consume Knowledge and never own it.

### 18.3 Extensions

Extensions may coordinate optional behavior through target-owner boundaries. Whether Extension
is an umbrella or category, and how executable versus content-only risk differs, remain open.

### 18.4 Connectors

Connector may be an Extension subtype or another category; the taxonomy remains unresolved.
External identity, credentials, required Permissions, data flow, reconciliation, privacy,
failure, support, and removal require later definition.

### 18.5 Automation Packs

Automation Packs may describe optional governed behavior but cannot execute around human
approval, target authorization, or target ownership. Trigger, condition, action, retry, and
removal semantics remain open.

### 18.6 Workflow Packs

Workflow Packs may relate to Knowledge, target configuration, or optional extension behavior.
The boundary remains unresolved. They cannot create parallel target workflow truth.

### 18.7 Dashboard Packs

Dashboard Packs may distribute presentation or projection definitions. Source facts and
Analytics projections retain their canonical owners; dashboards are never write authority.

### 18.8 Reports

Whether Report is an Asset, Dashboard Pack element, template, or target-owned projection
definition remains Open Question 7. Marketplace distribution cannot make a Report canonical
source truth.

### 18.9 Templates

Marketplace may distribute immutable Template versions. Target Domains retain applied template
configuration and generated record ownership. Template category and legal boundaries remain
open.

### 18.10 Themes

Themes remain presentation concerns and cannot own business logic, authorization, navigation,
or canonical facts. Compatibility, localization, accessibility, branding, scope, and removal
remain open.

## 19. Candidate Capability Lifecycle

This lifecycle shows logical participation of candidate Capabilities across the problem journey.
It is not an Asset lifecycle, state machine, or architecture decision.

```text
Explore participant eligibility
  -> explore Asset intake
  -> explore catalog and candidate version
  -> explore Review, validation, certification, and trust
  -> explore shared lifecycle and distribution
  -> explore discovery and intelligence participation
  -> explore License, Pricing, acquisition, and Entitlement
  -> explore compatibility and dependencies
  -> explore Installation
  -> explore Activation and Applicability
  -> explore target use
  -> explore upgrade, deactivation, removal, and retained history
  -> explore Analytics, Audit, operations, support, and future improvement
```

Cross-cutting candidate participation:

- MC-20 Security and Privacy Participation may apply throughout;
- MC-21 Audit and Governance Participation may apply to consequential points;
- MC-22 Analytics Participation may observe authorized outcomes;
- MC-23 Publisher and Partner Participation may apply from submission through support; and
- MC-24 Operations and Support may apply throughout availability, failure, and recovery.

Whether these remain Capabilities, become responsibilities of other candidates, or are split is
not decided.

## 20. Logical Decision Lifecycle

The logical decision lifecycle maps questions, not an approved Decision entity or authority.

```text
Candidate participation decision
  -> candidate Asset eligibility decision
  -> candidate category and identity decision
  -> candidate version readiness decision
  -> candidate Review and certification decision
  -> candidate publication and distribution decision
  -> candidate discovery eligibility decision
  -> candidate customer selection decision
  -> candidate License and Entitlement decision
  -> candidate compatibility and dependency decision
  -> candidate Installation decision
  -> candidate Activation and Applicability decision
  -> independent target-owner decision
  -> candidate upgrade, deactivation, removal, or recovery decision
  -> candidate lifecycle continuation, deprecation, or archive decision
```

At every point, the Proposal must distinguish:

- fact source from decision participant;
- declaration from validation;
- validation from certification;
- Marketplace decision from target-owner decision;
- customer choice from authorization;
- automated evaluation from required human approval; and
- current decision from immutable historical evidence.

No decision policy or owner is approved.

## 21. Dependency Lifecycle

The candidate dependency lifecycle is:

```text
Dependency is declared or discovered
  -> dependency identity and version need are understood
  -> required, optional, direct, transitive, conflicting, or replacement meaning is questioned
  -> compatibility and License implications are questioned
  -> customer acquisition and Entitlement implications are questioned
  -> Installation and Activation implications are questioned
  -> target owner validates affected use
  -> dependency health and selected version are observed
  -> update or deprecation impact is evaluated
  -> deactivation or removal impact is evaluated
  -> retained history remains traceable
```

Open Questions 33–40 govern this exploration. No dependency type, resolver, cycle rule, automatic
action, or failure policy is approved.

## 22. Asset Interaction Flow

### 22.1 Shared Asset and scoped state

```text
Marketplace Asset identity
  -> one or more preserved Marketplace Asset Versions
  -> one published immutable version selected for authorized distribution
  -> Workspace-scoped acquisition or Entitlement context
  -> Workspace-scoped Installation context
  -> Workspace-scoped Activation context
  -> Workspace or selected Business Applicability context
  -> target-owner use under separate authorization
```

This restates the frozen separation; it does not approve a detailed model.

### 22.2 Update interaction

```text
New immutable Asset Version becomes available
  -> compatibility, dependency, License, Entitlement, and target impact are understood
  -> authorized version-selection question
  -> candidate upgrade and target-validation flow
  -> selected version and outcome become traceable
  -> prior published version remains immutable and preserved
```

### 22.3 Removal interaction

```text
Authorized deactivation or removal intent
  -> dependency, License, target, and history impact are understood
  -> scoped Activation, Applicability, Installation, or selection is affected under future policy
  -> target owner handles its own configuration and operational effects
  -> shared Asset and historical versions remain preserved
```

### 22.4 Intelligence interaction

```text
Business Brain completes Decision
  -> Recommendation Engine owns Recommendation
  -> Implementation Option mapping may reference Marketplace Asset Version
  -> Product Hub or Marketplace presents authorized option and evidence
  -> customer chooses or declines
  -> target owner validates any intended effect
  -> authorized outcome may participate in future intelligence
```

Marketplace never forms the Decision or Recommendation.

## 23. Proposal Readiness

### 23.1 Mapping completeness

The Capability Map documents:

- sixteen logical flows;
- all twenty-four candidate Capabilities from Discovery;
- all twelve candidate Domain clusters from Discovery;
- candidate responsibility, information, input, output, decision, and dependency flows;
- candidate Capability and Domain relationships;
- frozen ownership and external dependency boundaries;
- Marketplace responsibility and non-responsibility problem spaces;
- collaboration with Core Platform, Product Hub, Business Brain, Recommendation Engine,
  Commerce OS, and future Operating Systems;
- collaboration with ten named Asset families or family questions;
- candidate Capability, decision, dependency, and Asset interaction lifecycles; and
- all eighty unresolved Discovery questions.

### 23.2 Proposal obligations

Before approval, a Proposal must determine, without contradicting frozen baselines:

- the approved Marketplace scope and non-scope;
- which candidate Capabilities are accepted, merged, split, renamed, deferred, or rejected;
- which candidate Domain clusters become approved Domains, cross-cutting responsibilities, or
  external dependencies;
- exactly-one ownership for every Marketplace fact, write responsibility, aggregate candidate,
  lifecycle, decision, and projection;
- shared Asset versus scoped-state models;
- category, publisher, Review, certification, trust, lifecycle, version, compatibility,
  dependency, License, Entitlement, commercial, distribution, Installation, Activation,
  Applicability, update, and removal boundaries;
- Security, privacy, Audit, Analytics, Search, operations, and target-validation boundaries;
- external collaboration and no-parallel-truth invariants;
- Deferred Decisions and Draft ADR candidates; and
- success criteria for independent Architecture Review.

This Capability Map does not supply those decisions.

### 23.3 Recommendation

# READY FOR PROPOSAL

The logical collaboration problem is sufficiently mapped to begin a Marketplace Proposal. The
Proposal must make explicit architecture decisions through the approved methodology and must not
treat any candidate in this document as already approved.

## 24. Open Questions

All eighty Discovery Open Questions remain authoritative and unanswered. They are reproduced by
reference group below without resolution.

### 24.1 Purpose, category, and Asset identity — OQ-01 through OQ-08

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

### 24.2 Actors, publishers, and participation — OQ-09 through OQ-16

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

### 24.3 Shared Asset lifecycle and versioning — OQ-17 through OQ-24

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

### 24.4 Scoped acquisition, Installation, Activation, and Applicability — OQ-25 through OQ-32

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

### 24.5 Compatibility and dependencies — OQ-33 through OQ-40

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

### 24.6 Upgrade, rollback, and removal — OQ-41 through OQ-48

41. Who chooses an upgraded immutable Asset Version?
42. Which updates may be optional, recommended, scheduled, mandatory, or security-critical?
43. How are target configuration and customer overrides preserved or migrated?
44. What validation is required before and after upgrade?
45. Under what conditions may a Workspace select a prior supported version?
46. How are partial multi-Business or multi-target upgrades represented and recovered?
47. What happens when a selected version is deprecated, suspended, archived, or no longer
    supported?
48. What scoped state, configuration, data, dependencies, and history remain after removal?

### 24.7 Licensing, Pricing, billing, and Entitlement — OQ-49 through OQ-56

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

### 24.8 Review, certification, trust, and governance — OQ-57 through OQ-64

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

### 24.9 Discovery, Recommendation, Search, and intelligence — OQ-65 through OQ-72

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

### 24.10 Security, privacy, Audit, operations, and global scale — OQ-73 through OQ-80

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

**Remaining Open Questions: 80**

None is answered by this Capability Map.

## References

### Governing and frozen baselines

- `docs/00-governance/`
- `docs/01-genesis/`
- `docs/02-core-platform/`
- `docs/03-business-brain/`
- `docs/04-commerce-os/`
- `docs/99-architecture-freeze/`

### Marketplace Discovery

- `docs/05-marketplace/00-MARKETPLACE-DISCOVERY.md`
