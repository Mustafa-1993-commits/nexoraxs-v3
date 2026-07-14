# AI Expert Network Capability Map v0.1

**Milestone:** AI Expert Network  
**Artifact type:** Logical Capability Map  
**Status:** Candidate mapping  
**Architecture decisions:** None  
**Approved Domains, Components, services, ownership, or implementation:** None

---

## Purpose and Mapping Rules

This document transforms the approved AI Expert Network Discovery into a logical map of candidate
capabilities, responsibility relationships, information movement, decision points, dependencies,
and collaboration needs.

It is not architecture or a Proposal. Terms such as `candidate`, `flow`, `relationship area`, and
`lifecycle` describe logical analysis only. They do not approve a Domain, Component, owner,
service, model, Contract, Event, API, database, runtime, deployment, technology, or implementation.

The 18 candidate capabilities and 60 Open Questions come unchanged from Discovery. Frozen owners
remain authoritative throughout this map.

## 1. Mission Flow

### 1.1 Logical mission journey

```text
Authorized customer need
  -> explicit Workspace and Business context
  -> governed non-AI sources
     [Business DNA, Knowledge, Rules, Analytics,
      completed Business Brain Decision when applicable,
      governed Recommendation context when applicable]
  -> AI Coordinator resolves authorization and minimum context
  -> AI Coordinator evaluates eligible active/applicable Expert definition(s)
  -> one or more bounded candidate Expert contributions
  -> AI Coordinator validates evidence, exposes or resolves conflicts, and evaluates confidence
  -> AI Coordinator produces one unified Nexoraxs response
  -> customer remains in control
  -> any consequential action remains a separate proposal to the authorized target owner
```

This flow repeats frozen relationships only. It does not require a Business Brain Decision or
Recommendation for every customer question; when either is used, its canonical owner and
completed lifecycle remain controlling.

### 1.2 Mission guardrails

- customers interact with Nexoraxs, not individual Experts;
- AI Coordinator owns eligibility, selection, coordination, validation, synthesis, and AI
  artifacts;
- candidate Expert capabilities contribute advisory material only;
- Knowledge, Rules, Decision, Recommendation, Configuration Proposal, Permission, Audit Record,
  and OS facts retain their external owners;
- Marketplace Activation and Applicability enable possible eligibility evaluation only;
- no Expert executes a consequential target action; and
- AI failure cannot invalidate canonical Decision or OS operation.

## 2. Capability Flow

### 2.1 Candidate Capability groupings

The groupings below aid navigation. They do not create Domains or Components.

| Logical grouping | Candidate capabilities | Logical purpose |
|---|---|---|
| specialized understanding | AEC-01, AEC-03, AEC-09 | contribute domain-specific interpretation of authorized business and Analytics context |
| explanation and assessment | AEC-02, AEC-04, AEC-10, AEC-14, AEC-15 | explain governed meaning, risks, workflows, Security, and compliance context |
| opportunity and guidance | AEC-05, AEC-06, AEC-11, AEC-12, AEC-13, AEC-16 | contribute opportunities, alternatives, and non-executing guidance |
| communication and action framing | AEC-07, AEC-08 | contribute executive summary and advisory action-plan material |
| evidence and collaboration | AEC-17, AEC-18 | attach confidence/evidence and participate in bounded multi-Expert work |

### 2.2 End-to-end candidate Capability flow

```text
Relevant candidate contribution capability identified by AI Coordinator
  -> minimum authorized inputs selected by AI Coordinator
  -> one or more contribution capabilities applied by eligible Expert definition(s)
  -> AEC-17 attaches contribution-level confidence, sources, assumptions, and limitations
  -> AEC-18 permits bounded contribution to coordinated multi-Expert work where selected
  -> AI Coordinator validates, compares, synthesizes, and owns the final AI artifact
```

AEC-17 does not own final evidence validation or unified-response confidence. AEC-18 does not own
selection, orchestration, conflict resolution, or synthesis.

## 3. Responsibility Flow

| Logical responsibility | Candidate Expert contribution | Frozen accountable owner outside candidate capability | Boundary |
|---|---|---|---|
| understand customer intent | none | AI Coordinator Request Interpreter | Expert receives bounded instructions only |
| resolve current authorization | none | AI Coordinator and Core Identity/Access | capability never expands context |
| construct minimum context | none | AI Coordinator Context Builder | Expert does not retrieve unrestricted data |
| determine Expert eligibility and selection | none | AI Coordinator Expert Registry/Router | Marketplace state is an input, not the decision |
| contribute specialized understanding | AEC-01/AEC-03/AEC-09 | AI Coordinator owns Interaction and response | contribution remains advisory |
| explain governed context | AEC-02/AEC-10/AEC-14/AEC-15 | canonical source owner retains meaning | explanation never becomes source truth |
| contribute possible improvements | AEC-05/AEC-06/AEC-11/AEC-12/AEC-13/AEC-16 | Recommendation/Configuration/target owners remain external | suggestion has no canonical or execution authority |
| contribute summary or action framing | AEC-07/AEC-08 | AI Coordinator owns final artifact and Action Proposal boundary | contribution is not unified response or proposal by default |
| report contribution evidence/confidence | AEC-17 | AI Coordinator validates claims and final confidence | source owner remains authoritative |
| contribute to multi-Expert work | AEC-18 | AI Coordinator Collaboration Orchestrator | Expert does not coordinate peers |
| synthesize one response | none | AI Coordinator Response Synthesizer | customer never reconciles separate Experts |
| create canonical Recommendation | none | Recommendation Engine | candidate capability cannot create it |
| form canonical Decision | none | Business Brain | AI remains downstream |
| apply configuration or operational effect | none | Configuration Engine and target owner | consequential execution stays outside AI |

## 4. Information Flow

### 4.1 Governed information movement

```text
Canonical source owners
  -> authorized, version-attributed references or projections
  -> AI Coordinator authorization and policy filtering
  -> minimum Expert-specific context
  -> bounded Expert contribution
  -> AI Coordinator evidence and policy validation
  -> unified AI Coordinator-owned artifact
  -> authorized customer or owning-service proposal boundary
```

### 4.2 Information-flow rules

1. canonical source information moves by governed reference or permitted projection;
2. the AI Coordinator narrows context before Expert contribution;
3. Expert contributions retain source and version attribution where applicable;
4. multi-Expert work does not permit lateral sharing outside each Expert's authorized context;
5. synthesis cannot broaden Permission or scope;
6. output does not write back to a canonical source;
7. feedback and outcome references do not modify Business DNA, Knowledge, Rules, Capabilities,
   Decision, Recommendation, or OS facts; and
8. exact information shapes remain unresolved.

## 5. Decision Flow

This section maps logical decision points without creating a new canonical Decision lifecycle.
`Decision` with a capital `D` remains the Business Brain-owned canonical concept.

```text
Customer request exists
  -> AI Coordinator determines authorized context
  -> AI Coordinator determines whether any Expert definition is eligible
  -> AI Coordinator determines one or more appropriate Experts
  -> eligible Expert(s) contribute bounded advisory material
  -> AI Coordinator determines whether evidence is sufficient
  -> AI Coordinator exposes or resolves contribution conflicts through evidence
  -> AI Coordinator includes, excludes, qualifies, or requests verification guidance
  -> AI Coordinator returns one unified response
  -> customer decides whether to act
  -> consequential action, if requested, follows a separate owner-authorized proposal path
```

No candidate Expert capability determines canonical Recommendation priority, target
authorization, or execution.

## 6. Input Flow

| Input family | Canonical owner | Logical use in candidate contribution | Required preservation |
|---|---|---|---|
| Actor, Workspace, Business, resource context | Core and applicable organization owners | establish authorized scope before any contribution | explicit current context and tenant isolation |
| Business DNA | Business DNA owner | business-specific context | one Business DNA per Business; no AI write |
| Workspace intelligence aggregation | Core aggregation owner | explicit multi-Business context when authorized | never create Workspace DNA or merge Business truth |
| Knowledge and Knowledge Packs | Knowledge Engine | governed evidence and domain understanding | exact applicable version, provenance, no Expert ownership |
| Rules and Rule outcomes | Rules owner | deterministic policy/evidence context | Rules precede AI and remain reproducible |
| completed Business Brain Decision | Business Brain | downstream context when applicable | no AI contribution to Decision formation |
| Recommendation | Recommendation Engine | governed context or explanation target when applicable | contribution is not Recommendation |
| Capabilities | Capability Registry | specialization and relevance context | no redefinition |
| Analytics | Core or applicable OS Analytics owner | authorized interpretation context | no source or metric ownership |
| OS operational projections | applicable OS | authorized evidence context | no direct write or private-state access |
| Marketplace AI Expert state | Marketplace | version, Entitlement, Installation, Activation, Applicability context | not eligibility, selection, or Permission |
| conversation history | AI Coordinator | scoped continuity | current authorization, retention, and consent |
| customer goals and question | applicable owner/customer context | requested outcome and advisory focus | no silent change of intent |

## 7. Output Flow

### 7.1 Logical output progression

```text
Candidate Expert contribution
  -> contribution evidence, confidence, assumptions, alternatives, limitations
  -> AI Coordinator validation and policy filtering
  -> AI Coordinator conflict treatment and synthesis
  -> one AI Coordinator-owned unified response
  -> optional, separately governed AI Action Proposal
  -> human approval and owning-service reauthorization where consequential
```

### 7.2 Output boundary matrix

| Candidate output label | Logical meaning in this map | Never means |
|---|---|---|
| specialized contribution | bounded advisory material for AI Coordinator | customer-facing independent Expert response |
| Recommendation explanation contribution | explanation of governed context | canonical Recommendation creation or priority |
| business insight contribution | AI-owned advisory observation | Business Brain Decision content or Analytics truth |
| risk assessment contribution | advisory risk/uncertainty material | compliance approval or target decision |
| growth opportunity contribution | possible opportunity for synthesis | executable commitment or canonical Recommendation |
| automation suggestion contribution | non-executing advisory material | Rule, Automation Pack, Configuration Proposal, or applied automation |
| executive summary contribution | candidate summary material | final unified response ownership |
| action plan contribution | advisory sequence for synthesis | AI Action Proposal or execution by default |
| confidence and evidence | contribution-level claim context | final validation, canonical evidence, or authorization |

## 8. Candidate Capability Relationships

| Candidate Capability | Primary logical inputs | Related candidate capabilities | Logical output | Frozen boundary |
|---|---|---|---|---|
| AEC-01 Specialized Business Question Contribution | question, authorized business/Knowledge context | AEC-03, AEC-17, AEC-18 | specialized understanding | AI Coordinator owns intent and response |
| AEC-02 Recommendation Explanation Contribution | governed Recommendation context, evidence | AEC-07, AEC-17 | explanation contribution | Recommendation Engine owns Recommendation |
| AEC-03 Business Insight Contribution | Business DNA, Knowledge, Analytics | AEC-01, AEC-04, AEC-05, AEC-17 | insight contribution | not Decision or Analytics truth |
| AEC-04 Risk Assessment Contribution | governed evidence, Rules, country context | AEC-03, AEC-15, AEC-17 | risk/uncertainty contribution | no approval or override |
| AEC-05 Growth Opportunity Contribution | goals, stage, evidence, Capabilities | AEC-03, AEC-16, AEC-17 | opportunity contribution | no Recommendation priority |
| AEC-06 Automation Suggestion Contribution | workflow, Rule, Capability, OS context | AEC-10, AEC-11, AEC-13, AEC-17 | automation suggestion | no Rule/configuration/application ownership |
| AEC-07 Executive Summary Contribution | validated candidate material | AEC-02, AEC-03, AEC-04, AEC-17 | summary contribution | AI Coordinator synthesizes final response |
| AEC-08 Action Plan Contribution | authorized need and advisory findings | AEC-05, AEC-06, AEC-11, AEC-16, AEC-17 | action-plan contribution | not Action Proposal/execution by default |
| AEC-09 Analytics Interpretation Contribution | authorized Analytics | AEC-03, AEC-04, AEC-05, AEC-17 | interpretation contribution | no metric/projection ownership |
| AEC-10 Workflow Explanation Contribution | governed workflow context | AEC-06, AEC-11, AEC-17 | workflow explanation | no workflow definition/instance ownership |
| AEC-11 Configuration Guidance Contribution | governed configuration context | AEC-06, AEC-08, AEC-10, AEC-17 | configuration guidance | Configuration Engine/target retain ownership |
| AEC-12 Reporting Guidance Contribution | authorized reporting/Analytics context | AEC-07, AEC-09, AEC-17 | reporting guidance | no Report/dashboard/source ownership |
| AEC-13 Integration Advisory Contribution | authorized target and integration context | AEC-06, AEC-08, AEC-17 | integration considerations | no Connector/Contract/execution ownership |
| AEC-14 Security Advisory Contribution | authorized Security evidence/policy context | AEC-04, AEC-13, AEC-15, AEC-17 | Security advisory contribution | no policy, Permission, authorization ownership |
| AEC-15 Compliance Advisory Contribution | country Rules, Knowledge, governed evidence | AEC-04, AEC-14, AEC-17 | compliance explanation | no legal authority/Rule/approval |
| AEC-16 Alternative Option Contribution | evidence, goals, constraints | AEC-05, AEC-08, AEC-17 | alternatives/tradeoffs | no Implementation Option mapping |
| AEC-17 Confidence and Evidence Reporting | sources, assumptions, limitations | all contribution capabilities | contribution confidence/evidence | AI Coordinator validates and owns final confidence |
| AEC-18 Multi-Expert Collaboration Contribution | bounded instructions and context | any selected contribution capabilities | collaboration-ready contribution | AI Coordinator selects/orchestrates/synthesizes |

No relationship in this table approves an execution order or mandatory coupling.

## 9. Candidate Domain Relationships

The following ten candidate Domain relationship areas group unresolved concerns. They are not
approved Domains, bounded contexts, Components, services, owners, or future Proposal decisions.

| ID | Candidate Domain relationship area | Candidate capabilities/concerns grouped | Primary frozen boundary |
|---|---|---|---|
| CDR-01 | Expert Specialization and Definition | AEC-01; categories, families, definition information | AI Coordinator Expert Registry remains frozen owner |
| CDR-02 | Expert Version and Lifecycle Alignment | definition version, Marketplace version, conceptual lifecycle | Marketplace and AI Coordinator lifecycles remain distinct |
| CDR-03 | Eligibility and Explicit Context | activation, applicability, Permission, minimum context | AI Coordinator owns eligibility/selection |
| CDR-04 | Bounded Advisory Contribution | AEC-01 through AEC-16 contribution meaning | AI Coordinator owns AI artifacts and response |
| CDR-05 | Evidence, Confidence, and Explainability | AEC-17, sources, assumptions, alternatives, limitations | source owners remain canonical; Coordinator validates |
| CDR-06 | Multi-Expert Collaboration | AEC-18, overlap, conflicts, synthesis participation | AI Coordinator owns orchestration/conflict/synthesis |
| CDR-07 | Marketplace and Ecosystem Participation | Publisher, Asset, Review, Certification, commercial/scoped state | Marketplace ownership remains unchanged |
| CDR-08 | Security, Privacy, Audit, and Governance | isolation, policy, evidence, human control | Core/shared owners and AI Coordinator remain unchanged |
| CDR-09 | Feedback, Learning, and Evaluation | outcomes, approved feedback, Knowledge changes | no direct rewrite of canonical truth |
| CDR-10 | Operational Continuity | availability, capacity, failure, fallback, support, deprecation | no new source owner; policy remains unresolved |

**Candidate Domain relationship area count: 10**

### 9.1 Logical relationships among candidate areas

```text
CDR-01 Specialization/Definition
  <-> CDR-02 Version/Lifecycle Alignment
  -> CDR-03 Eligibility/Context
  -> CDR-04 Bounded Advisory Contribution
  <-> CDR-05 Evidence/Confidence/Explainability
  <-> CDR-06 Multi-Expert Collaboration

CDR-07 Marketplace/Ecosystem Participation
  -> supplies governed availability context to CDR-03

CDR-08 Security/Privacy/Audit/Governance
  -> constrains every relationship area

CDR-09 Feedback/Learning/Evaluation
  -> observes approved outcomes without source writes

CDR-10 Operational Continuity
  -> observes availability/failure without changing canonical ownership
```

## 10. Logical Dependency Flow

### 10.1 Dependency sequence

```text
Frozen canonical source available
  -> current authorization and explicit scope established
  -> relevant source versions and applicability established
  -> Marketplace Expert Asset state available where required
  -> AI Coordinator evaluates Expert eligibility
  -> minimum context and policy constraints assembled
  -> candidate contribution capability invoked logically
  -> evidence/confidence attached
  -> AI Coordinator validates and synthesizes
  -> response or separate proposal boundary
```

### 10.2 Dependency types to keep distinct

| Logical dependency type | Example | Must not imply |
|---|---|---|
| source dependency | Knowledge, Decision, Analytics | source ownership transfer |
| scope dependency | Workspace, Business, Permission | permanent authorization |
| Marketplace dependency | exact active/applicable Expert Asset Version | automatic eligibility or selection |
| specialization dependency | Industry, Functional, Technical relevance | customer manual Expert choice |
| evidence dependency | source/version/provenance | guaranteed truth without validation |
| collaboration dependency | another selected contribution | peer orchestration or unrestricted sharing |
| target dependency | Commerce or future OS context | target write access or hard OS coupling |
| operational dependency | provider/health/capacity/fallback context | provider as Expert or canonical owner |

## 11. Ownership Boundaries

This map introduces no owner. It preserves these frozen boundaries:

| Canonical subject | Frozen owner | Candidate-map use only |
|---|---|---|
| identity, Membership, Permission grants, organization context | Core owners | authorized references |
| Business DNA | Business DNA owner | minimum Business context |
| Knowledge and Knowledge Packs | Knowledge Engine | applicable evidence |
| deterministic Rules | Rules owner | governed outcomes/evidence |
| Capability definitions | Capability Registry | relevance references |
| completed Decision and candidate reasoning | Business Brain | downstream completed context |
| Recommendation and disposition | Recommendation Engine | explanation/context where authorized |
| Implementation Option mapping | Core intelligence mapping owner | never produced by candidate capability |
| Configuration Proposal | Configuration Engine | downstream boundary only |
| target configuration and operational facts | applicable Core/OS owner | evidence or separate proposal target only |
| AI Expert Marketplace representation and scoped state | Marketplace | availability context only |
| Expert Registry, eligibility, routing, orchestration, validation, synthesis, AI artifacts | AI Coordinator | frozen coordination boundary |
| Audit Record | Core Audit Service | receives attributable evidence |

## 12. External Dependencies

| Dependency | Required logical relationship | Failure/isolation question retained |
|---|---|---|
| Core Identity and Access | current Actor, tenant, Business, resource, Permission context | stale or changed authority during conversation |
| Business DNA | authorized Business context | cross-Business aggregation and freshness |
| Knowledge Engine | applicable versioned sources | stale, changed, missing, or conflicting Knowledge |
| Rules owner | deterministic outcomes | version and country applicability |
| Business Brain | completed Decision when applicable | AI unavailable without invalidating Decision |
| Recommendation Engine | governed Recommendation context when applicable | advisory contribution must not become Recommendation |
| Capability Registry | canonical Capability references | evolving definitions and eligibility impact |
| Configuration Engine | separate proposal boundary | guidance must not become configuration |
| Marketplace | Expert Asset/version/scoped state | removal, deprecation, Entitlement, or applicability change |
| Core Platform | AI Coordinator, Security, Audit, Analytics, observability | shared-service failure and reauthorization |
| Commerce OS | optional authorized target/evidence context | Commerce Core remains independent |
| future Operating Systems | optional authorized target/evidence context | no hard dependency or cross-OS write |

## 13. AI Expert Network Inputs

The map recognizes only inputs already named by Discovery and frozen authorities:

- authorized customer question and goals;
- explicit Actor, Workspace, Business, and applicable resource context;
- Business-scoped Business DNA;
- explicit Workspace-level Business aggregation when required and authorized;
- Business stage;
- applicable Knowledge and Knowledge Pack versions;
- country Rules and deterministic Rule outcomes;
- completed Business Brain Decision when applicable;
- governed Recommendation context when applicable;
- Capability references;
- authorized Analytics and OS projections;
- Marketplace Expert Asset/version, Entitlement, Installation, Activation, and Applicability
  context;
- conversation history under current authorization, consent, and retention; and
- Permission, privacy, country, policy, evidence-freshness, provider, health, and capacity context.

The map does not approve a required input set or information shape.

## 14. AI Expert Network Outputs

At the logical map level, candidate Expert capabilities produce bounded contribution material
only. Candidate contribution types include specialized understanding, explanation, insight, risk,
opportunity, automation suggestion, summary, action-plan material, Analytics interpretation,
workflow/configuration/reporting/integration/Security/compliance guidance, alternatives, and
contribution-level confidence/evidence.

AI Coordinator owns the customer-facing unified response and any separate AI Action Proposal.
Canonical Recommendation, Configuration Proposal, Decision, Audit Record, and target outcome
remain externally owned.

No output model, lifecycle, retention rule, or Contract is approved.

## 15. AI Expert Network Responsibilities

Candidate network-level responsibilities to map for the Proposal include:

- make specialized Expert contribution concerns explicit;
- preserve Industry, Functional, and Technical specialization without approving taxonomy;
- relate candidate contribution capabilities to authorized business problems;
- preserve evidence, confidence, assumptions, alternatives, limitations, and conflict visibility;
- support logical single- or multi-Expert contribution under AI Coordinator control;
- preserve Marketplace-to-AI Coordinator distinction;
- preserve Workspace/Business scope and minimum context;
- prevent advisory material from becoming canonical truth or execution;
- preserve provider/model replaceability and version attribution questions;
- expose Governance, Security, privacy, Audit, learning, and operations unknowns; and
- retain all questions for Proposal decision-making.

These are mapping responsibilities, not approved ownership.

## 16. AI Expert Network Non-Responsibilities

The AI Expert Network must not be mapped as owner of:

- AI Coordinator request interpretation, authorization, context building, policy, registry,
  routing, execution adapters, orchestration, validation, synthesis, conversation, or AI Audit;
- Business DNA, Workspace aggregation, Knowledge, Rules, Capabilities, Decision, Recommendation,
  Implementation Option mapping, Configuration Proposal, or Analytics truth;
- Marketplace Asset/version, Publisher, Review, Certification, Entitlement, Installation,
  Activation, or Applicability state;
- Core identity, Permission grants, Audit Records, Notifications, Search, Product Hub, or shared
  Security;
- Commerce or future OS setup, configuration, workflow, navigation, authorization, or operational
  facts;
- customer manual Expert selection;
- consequential action approval or execution;
- a new lifecycle, Domain, Component, service, API, Contract, Event, database, infrastructure,
  deployment, technology, or runtime; or
- an answer to any preserved Open Question.

## 17. Collaboration with Frozen Owners

### 17.1 Business Brain

Completed Decision context may flow downstream through AI Coordinator. Candidate Expert
contributions cannot participate in Decision formation, validation, completion, amendment, or
supersession.

### 17.2 AI Coordinator

AI Coordinator remains the exclusive owner of Expert Registry, eligibility, selection, minimum
context, policy, orchestration, collaboration control, evidence validation, conflict treatment,
synthesis, final confidence, unified response, Action Proposal, conversation context, and AI
Audit/Observability. Candidate capabilities contribute within that boundary only.

### 17.3 Recommendation Engine

Recommendation Engine remains sole owner of Recommendation and disposition. AEC-02 may
contribute explanation of authorized governed context; no AEC creates, ranks, or disposes of a
Recommendation.

### 17.4 Knowledge Engine

Knowledge Engine retains Knowledge and Knowledge Pack content, publication, applicability, and
use. Candidate capabilities consume applicable versions through minimum authorized context and
cannot publish or modify Knowledge.

### 17.5 Capability Registry

Capability Registry retains Capability identity, meaning, dependencies, applicability, and
lifecycle. Candidate specialization and contribution capabilities may reference identifiers only.

### 17.6 Configuration Engine

Configuration Engine retains Configuration Proposal. AEC-06, AEC-08, and AEC-11 remain advisory
contributions and cannot create or apply configuration.

### 17.7 Marketplace

Marketplace retains AI Expert Asset representation, immutable version, Publisher/Review/
Certification relationships, commercial and scoped state. AI Coordinator uses eligible context
without Marketplace selecting an Expert or owning AI artifacts.

### 17.8 Core Platform

Core retains identity, explicit context, Permission, AI Coordinator, Audit, Search, Analytics,
Product Hub, shared Security, and observability. Candidate mapping creates no parallel platform
plane.

### 17.9 Commerce OS

Commerce may supply authorized evidence or receive a separately owner-validated proposal. It
retains every Commerce fact and remains usable without AI Expert Network.

### 17.10 Future Operating Systems

Future OSs retain setup, Permissions, configuration, workflows, navigation, and operational
facts. Candidate Expert specialization creates no target write or hard dependency.

## 18. Candidate Expert Definition Relationships

| Relationship | Frozen side | Unresolved side preserved |
|---|---|---|
| AI Coordinator Expert Registry -> Expert Definition | AI Coordinator maintains versioned definitions, domains, inputs, compatibility, lifecycle | exact logical information and invariant boundaries |
| Marketplace Asset -> AI Expert representation | Marketplace owns representation and provenance | relationship to registry identity |
| Marketplace Asset Version -> definition version reference | Published Marketplace version is immutable | identity/version alignment and update semantics |
| Expert Definition -> category/family | Genesis supplies candidate labels | final taxonomy and overlaps |
| Expert Definition -> Capability references | Capability Registry owns Capabilities | reference semantics and suitability |
| Expert Definition -> Knowledge relationships | Knowledge Engine owns Knowledge | dependency, applicability, freshness, re-evaluation |
| Expert Definition -> provider/model | provider/model must remain replaceable | relationship, compatibility, provenance, fallback |
| Expert Definition -> Permission/data needs | Core owns grants; version declares needs | declaration detail and evaluation policy |

No definition model or owner beyond frozen responsibilities is approved.

## 19. Candidate Expert Version Relationships

```text
Stable Marketplace AI Expert Asset identity
  -> immutable Marketplace Asset Version
     -> references or aligns with AI Coordinator Expert Definition version
        -> eligible only under current Marketplace and AI Coordinator context
           -> used in attributable AI Interaction contribution
```

The relationship is conceptual. Whether versions are identical, linked, synchronized, or governed
through another approved meaning remains OQ-AEN-02 through OQ-AEN-05. `Improved` must not be read
as authorization to mutate a Published Marketplace version.

## 20. Candidate Expert Lifecycle Relationships

| Conceptual lifecycle concern | Frozen relationship | Question retained |
|---|---|---|
| Designed | Genesis conceptual label | definition of subject and entry criteria |
| Trained | Genesis conceptual label | provider/model versus definition meaning |
| Validated | distinct from automatic publication or target authorization | relationship to Marketplace Review/Certification and AI evaluation |
| Published | Marketplace Published Asset Version is immutable | alignment with registry visibility |
| Active | Marketplace Activation is scoped state only | distinction from AI Coordinator eligibility |
| Improved | Published content cannot mutate | new-version and re-evaluation semantics |
| Deprecated | history remains preserved | discovery, eligibility, fallback, and active-conversation effects |

No canonical state, transition, or owner is approved by this table.

## 21. Candidate Eligibility Relationships

| Eligibility input relationship | Frozen owner | Logical influence only | Unresolved question range |
|---|---|---|---|
| Actor and explicit scope | Core | constrains all evaluation | OQ-AEN-25–OQ-AEN-30, OQ-AEN-43–OQ-AEN-48 |
| Marketplace Entitlement/Installation/Activation/Applicability | Marketplace | makes an exact version available for consideration | OQ-AEN-19–OQ-AEN-24 |
| Expert definition/version/lifecycle | AI Coordinator Registry and Marketplace as frozen | specialization and current status context | OQ-AEN-01–OQ-AEN-18 |
| Business DNA/stage/goals | Business DNA and applicable owners | business relevance | OQ-AEN-25–OQ-AEN-30 |
| Knowledge/Rules/Capabilities | their canonical owners | evidence and specialization relevance | OQ-AEN-25–OQ-AEN-30, OQ-AEN-55–OQ-AEN-56 |
| country/language/OS context | applicable canonical owners | compatibility and policy context | OQ-AEN-19–OQ-AEN-30 |
| Permission/data policy | Core and AI Coordinator policy boundary | authorization and minimization | OQ-AEN-43–OQ-AEN-48 |
| provider/health/capacity | unresolved detailed policy under AI Coordinator boundary | operational suitability | OQ-AEN-55–OQ-AEN-60 |

AI Coordinator remains the owner of eligibility and selection. This map approves no criterion or
precedence.

## 22. Candidate Collaboration Relationships

### 22.1 Logical collaboration map

```text
AI Coordinator-selected eligible Expert A
  -> bounded contribution + evidence/confidence

AI Coordinator-selected eligible Expert B
  -> bounded contribution + evidence/confidence

AI Coordinator Collaboration Orchestrator
  -> compares complementarity, overlap, disagreement, and missing evidence
  -> Evidence and Claim Validator checks material claims
  -> Response Synthesizer returns one unified response
```

### 22.2 Collaboration relationship types

| Candidate relationship | Logical purpose | Must not become |
|---|---|---|
| complementary | combine different specialization perspectives | unrestricted context sharing |
| corroborating | compare independently grounded claims | automatic proof or majority rule |
| conflicting | expose incompatible claims or assumptions | silent winner selection |
| dependent | one contribution requires governed context from another concern | direct Expert-to-Expert authority |
| alternative | preserve materially different options | Implementation Option mapping ownership |
| fallback | contribute when a selected Expert is unavailable/unsuitable | bypass of policy or eligibility |

## 23. Candidate Capability Lifecycle

This logical lifecycle describes candidate capability participation, not a canonical entity or
state machine:

```text
business need recognized
  -> candidate capability relevance considered by AI Coordinator
  -> eligible Expert definition selected by AI Coordinator
  -> minimum authorized inputs supplied
  -> bounded candidate contribution produced
  -> contribution evidence/confidence attached
  -> AI Coordinator validates and includes, qualifies, excludes, or seeks verification
  -> outcome/feedback may be observed through governed learning
```

No capability state, persistence, execution mechanism, or owner is approved.

## 24. Logical Decision Lifecycle

This map distinguishes three meanings:

| Meaning | Owner | Logical place |
|---|---|---|
| canonical Business Brain Decision | Business Brain | completed before downstream AI use when applicable |
| AI Coordinator coordination decision point | AI Coordinator | authorization, eligibility, selection, validation, conflict, synthesis |
| customer or target-owner decision | customer/applicable owner | approval and consequential action outside Expert contribution |

```text
canonical Decision already complete when applicable
  -> AI Coordinator coordination decision points
  -> bounded Expert advisory contribution(s)
  -> unified AI artifact
  -> customer choice
  -> target-owner authorization and execution if separately requested
```

The map creates no new canonical Decision.

## 25. Dependency Lifecycle

This is a logical dependency-observation flow only:

```text
dependency identified
  -> canonical owner and exact context referenced
  -> authorization and applicability checked by AI Coordinator
  -> source/version/freshness attached
  -> dependency used in bounded contribution
  -> change, expiry, revocation, or deprecation observed
  -> eligibility/context re-evaluated by AI Coordinator
  -> history remains attributable
```

The flow does not define polling, notification, Event, Contract, storage, or runtime behavior.

## 26. Proposal Readiness

### 26.1 Mapping completeness

| Required map area | Result |
|---|---|
| Mission, Capability, Responsibility, Information, Decision, Input, and Output flows | COMPLETE |
| 18 candidate Capability relationships | COMPLETE, NOT APPROVED |
| 10 candidate Domain relationship areas | COMPLETE, NOT APPROVED |
| dependency and ownership boundaries | COMPLETE |
| all required external dependencies and collaborations | COMPLETE |
| Expert Definition, version, lifecycle, eligibility, and collaboration relationships | COMPLETE AS QUESTIONS |
| candidate Capability, logical Decision, and dependency lifecycles | COMPLETE AS LOGICAL MAPS |
| 60 Discovery Open Questions | PRESERVED, UNANSWERED |

### 26.2 Logical flow inventory

| ID | Logical flow documented |
|---|---|
| LF-AEN-01 | Mission Flow |
| LF-AEN-02 | Capability Flow |
| LF-AEN-03 | Responsibility Flow |
| LF-AEN-04 | Information Flow |
| LF-AEN-05 | Decision Flow |
| LF-AEN-06 | Input Flow |
| LF-AEN-07 | Output Flow |
| LF-AEN-08 | Logical Dependency Flow |
| LF-AEN-09 | Expert Definition and Version Relationship Flow |
| LF-AEN-10 | Expert Eligibility Flow |
| LF-AEN-11 | Multi-Expert Collaboration Flow |
| LF-AEN-12 | Capability and Dependency Lifecycle Flow |

**Logical flow count: 12**

### 26.3 Validation

| Required validation | Result | Evidence |
|---|---|---|
| AI Coordinator ownership remains unchanged | PASS | sections 3, 11, 17, 21–22 |
| Marketplace ownership remains unchanged | PASS | sections 11, 17–21 |
| Business Brain ownership remains unchanged | PASS | sections 5, 11, 17, 24 |
| Recommendation ownership remains unchanged | PASS | sections 3, 7, 11, 17 |
| Configuration ownership remains unchanged | PASS | sections 3, 7, 11, 17 |
| Knowledge ownership remains unchanged | PASS | sections 4, 6, 11, 17 |
| Domains approved | ZERO | CDR-01 through CDR-10 are relationship areas only |
| Components/services approved | ZERO | none defined |
| architecture decisions introduced | ZERO | logical mapping only |
| Open Questions resolved | ZERO | all 60 remain open |
| API, Contract, Event, database, infrastructure, runtime, deployment, technology introduced | ZERO | explicitly excluded |

### 26.4 Readiness conclusion

The approved Discovery and this logical Capability Map provide sufficient organized problem-space
understanding for a Proposal to evaluate architecture. Proposal authority remains responsible for
deciding—or explicitly deferring—Domains, Components, ownership, canonical concepts, models, and
lifecycles under independent Architecture Review.

# READY FOR PROPOSAL

## 27. Open Questions

All 60 Discovery questions remain unanswered. The Capability Map adds relationships and
traceability only.

### 27.1 Expert identity and definition — OQ-AEN-01 through OQ-AEN-06

1. **OQ-AEN-01:** What exact logical information constitutes the Expert Definition maintained by
   AI Coordinator's frozen Expert Registry?
2. **OQ-AEN-02:** How does Expert Definition relate to Marketplace Asset and immutable Asset
   Version?
3. **OQ-AEN-03:** How does AI Coordinator-owned definition information reference Marketplace-owned
   representation and version facts without duplication?
4. **OQ-AEN-04:** How are stable Expert identity, version, provider, and model kept distinct?
5. **OQ-AEN-05:** What information is universal versus category- or family-specific?
6. **OQ-AEN-06:** What provenance and ownership evidence is required for an Expert definition?

### 27.2 Categories, families, and capabilities — OQ-AEN-07 through OQ-AEN-12

7. **OQ-AEN-07:** Are Industry, Functional, and Technical the complete specialization categories?
8. **OQ-AEN-08:** How are Advisor, Director, and Expert labels normalized without creating
   synonyms?
9. **OQ-AEN-09:** Where do Finance, HR, CRM, Operations, Compliance, and Marketplace Expert labels
   belong?
10. **OQ-AEN-10:** How are specialization categories separated from Publisher, Certification,
    and commercial labels?
11. **OQ-AEN-11:** Which candidate Expert capabilities belong in a later logical Capability Map?
12. **OQ-AEN-12:** How do Expert capabilities reference canonical Capability Registry
    definitions?

### 27.3 Lifecycle and versioning — OQ-AEN-13 through OQ-AEN-18

13. **OQ-AEN-13:** Which subject does the Genesis Designed-to-Deprecated lifecycle describe?
14. **OQ-AEN-14:** How does that lifecycle relate to Marketplace Asset Version lifecycle?
15. **OQ-AEN-15:** Does `Improved` always create a new immutable version after publication?
16. **OQ-AEN-16:** What validation is distinct from Marketplace Review and Certification?
17. **OQ-AEN-17:** How do deprecation, withdrawal, fallback, and active conversations interact?
18. **OQ-AEN-18:** What history is required for reproducibility after version/provider changes?

### 27.4 Eligibility, activation, and discovery — OQ-AEN-19 through OQ-AEN-24

19. **OQ-AEN-19:** What criteria determine Expert eligibility for one AI Interaction?
20. **OQ-AEN-20:** How are criteria ordered when Marketplace, country, Permission, Knowledge,
    provider, and capacity contexts differ?
21. **OQ-AEN-21:** How is stale or ambiguous eligibility represented?
22. **OQ-AEN-22:** How are Marketplace discovery and AI Coordinator Expert discovery named and
    separated?
23. **OQ-AEN-23:** Can customer preferences influence routing without becoming manual selection?
24. **OQ-AEN-24:** How do Activation, Applicability, eligibility, selection, and Interaction start
    remain distinct?

### 27.5 Context and scope — OQ-AEN-25 through OQ-AEN-30

25. **OQ-AEN-25:** What minimum input context is required by each candidate capability?
26. **OQ-AEN-26:** How is Business scope preserved across a multi-Expert Interaction?
27. **OQ-AEN-27:** When is explicit Workspace-level Business aggregation allowed and useful?
28. **OQ-AEN-28:** How are country, language, OS, Capability, and Knowledge applicability combined?
29. **OQ-AEN-29:** How are context freshness and authorization changes handled during a
    conversation?
30. **OQ-AEN-30:** What context may be retained between Interactions without broadening scope?

### 27.6 Collaboration, conflict, and synthesis — OQ-AEN-31 through OQ-AEN-36

31. **OQ-AEN-31:** When should one Expert versus multiple Experts contribute?
32. **OQ-AEN-32:** How is a request decomposed without changing customer intent?
33. **OQ-AEN-33:** How are overlapping and conflicting contributions identified?
34. **OQ-AEN-34:** Which conflicts may be resolved by evidence and which must remain visible?
35. **OQ-AEN-35:** What contribution provenance must survive unified synthesis?
36. **OQ-AEN-36:** How does synthesis avoid converting uncertainty into false consensus?

### 27.7 Outputs and owner boundaries — OQ-AEN-37 through OQ-AEN-42

37. **OQ-AEN-37:** What is the canonical term for a bounded Expert contribution?
38. **OQ-AEN-38:** How is an Expert advisory contribution distinguished from Recommendation?
39. **OQ-AEN-39:** When, if ever, can advisory content become an AI Action Proposal?
40. **OQ-AEN-40:** How are Action Plan, Configuration guidance, and Configuration Proposal kept
    distinct?
41. **OQ-AEN-41:** Which confidence belongs to a contribution versus the unified response?
42. **OQ-AEN-42:** What AI artifacts and lineage must AI Coordinator retain?

### 27.8 Security, privacy, and Audit — OQ-AEN-43 through OQ-AEN-48

43. **OQ-AEN-43:** What Permission and data declarations are required for each Expert version?
44. **OQ-AEN-44:** What Security and safety evaluation is required before and after contribution?
45. **OQ-AEN-45:** What provider, residency, retention, consent, and confidentiality rules apply?
46. **OQ-AEN-46:** How is cross-Expert, cross-Business, and cross-provider isolation demonstrated?
47. **OQ-AEN-47:** Which consequential AI activities require Core Audit evidence?
48. **OQ-AEN-48:** Who may inspect contribution evidence, conversation context, and synthesis
    lineage?

### 27.9 Governance, Marketplace, and partners — OQ-AEN-49 through OQ-AEN-54

49. **OQ-AEN-49:** Which AI Expert Network decisions require new ADRs?
50. **OQ-AEN-50:** What separates Marketplace Review/Certification from AI safety and quality
    evaluation?
51. **OQ-AEN-51:** What policies govern official and future partner Expert participation?
52. **OQ-AEN-52:** How are conflicts of interest, sponsorship, and commercial influence governed?
53. **OQ-AEN-53:** What Marketplace removal or deprecation effects must AI Coordinator observe?
54. **OQ-AEN-54:** Which Marketplace DD-MP decisions must be resolved before partner Expert work?

### 27.10 Learning and operations — OQ-AEN-55 through OQ-AEN-60

55. **OQ-AEN-55:** What feedback and outcomes may improve an Expert without rewriting canonical
    truth?
56. **OQ-AEN-56:** How do Knowledge changes trigger re-evaluation or new Expert versions?
57. **OQ-AEN-57:** What health, quality, safety, confidence, cost, and value measures are needed?
58. **OQ-AEN-58:** How are capacity, failure, timeout, fallback, recovery, and continuity handled?
59. **OQ-AEN-59:** What support, incident, escalation, and customer communication policies apply?
60. **OQ-AEN-60:** What must be approved before global or third-party production operation?

**Remaining Open Questions: 60**

## References

### Approved AI Expert Network Discovery

- [AI Expert Network Discovery v0.1](00-AI-EXPERT-NETWORK-DISCOVERY.md)

### Governance and Genesis

- [Governance ADR Repository](../00-governance/ADR/README.md)
- [Canonical Glossary](../00-governance/glossary/GLOSSARY.md)
- [Architectural Milestone Lifecycle](../00-governance/MILESTONE-LIFECYCLE.md)
- [Genesis AI Strategy](../01-genesis/08-AI-STRATEGY.md)
- [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Genesis Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

### Frozen milestone baselines

- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Core Platform Readiness v1.0.1](../99-architecture-freeze/CORE-PLATFORM-v1.0.1-READINESS.md)
- [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Business Brain Readiness](../99-architecture-freeze/BUSINESS-BRAIN-READINESS.md)
- [Commerce OS Freeze v1.0](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md)
- [Commerce OS Readiness](../99-architecture-freeze/COMMERCE-OS-READINESS.md)
- [Marketplace Architecture v1.0 Freeze](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md)
- [Marketplace Readiness](../99-architecture-freeze/MARKETPLACE-READINESS.md)

### Accepted AI authority

- [ADR-029 — AI Downstream of Knowledge, Rules, and Authorization](../00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md)
- [ADR-030 — AI Coordinator Separation](../00-governance/ADR/ADR-030-ai-coordinator-separated-orchestration.md)
- [ADR-031 — Coordinated AI Expert Network](../00-governance/ADR/ADR-031-coordinated-ai-expert-network.md)
- [ADR-032 — Governed AI and Platform Learning](../00-governance/ADR/ADR-032-governed-ai-and-platform-learning.md)
