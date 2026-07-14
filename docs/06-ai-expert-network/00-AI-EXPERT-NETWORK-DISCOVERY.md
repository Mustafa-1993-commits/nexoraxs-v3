# AI Expert Network Discovery v0.1

**Milestone:** AI Expert Network  
**Artifact type:** Discovery  
**Status:** Exploratory  
**Architecture decisions:** None  
**Approved Domains, Components, or ownership:** None

---

## 1. Purpose

This document defines the complete problem space for the AI Expert Network milestone. It records
known responsibilities, frozen boundaries, candidate concepts, unknowns, assumptions, risks, and
questions that must be understood before an architecture Proposal may be created.

This document is not architecture, a Proposal, a component design, or implementation guidance.
Candidate terms and relationships are exploratory unless already frozen by an upstream authority.

## 2. Mission

The AI Expert Network exists to make specialized, collaborative, explainable, context-aware, and
secure business expertise available through one unified Nexoraxs experience.

Customers interact with Nexoraxs rather than selecting or reconciling individual Experts. The
network must help businesses understand decisions, risks, opportunities, and possible actions
without becoming a source of business truth, canonical Recommendation, Permission, or execution.

## 3. Vision

Customers should experience an always-available executive advisory board in which the most
appropriate specialized expertise contributes to one coherent, evidence-aware response while
the customer and canonical owners remain in control.

## 4. Goals

Discovery investigates how the future milestone could:

1. represent specialized Industry, Functional, and Technical expertise without creating isolated
   customer-facing assistants;
2. let AI Coordinator identify eligible Expert definitions for explicit authorized context;
3. support one or multiple Expert contributions to a unified Nexoraxs response;
4. preserve Business-scoped context and explicit Workspace aggregation;
5. ground Expert contributions in approved Knowledge, deterministic Rules, completed Business
   Brain Decision context, authorized Analytics, and other owner-controlled evidence;
6. report confidence, evidence, sources, assumptions, alternatives, uncertainty, and conflicts;
7. keep Marketplace distribution distinct from AI Coordinator selection and execution;
8. keep advisory assistance distinct from canonical Recommendation and Configuration Proposal;
9. preserve tenant isolation, Permission, privacy, Auditability, and human control;
10. support official and future approved partner participation without weakening Governance;
11. allow Expert definitions to evolve without mutating Published Marketplace Asset Versions; and
12. create enough shared understanding for a logical Capability Map and later Proposal.

These goals identify the problem space. They do not approve a mechanism or design.

## 5. Non-Goals

Discovery does not:

- approve an AI Expert Network Domain, Component, service, or owner;
- redesign or duplicate AI Coordinator;
- define an Expert Registry, router, orchestrator, provider, model, prompt, tool, or runtime;
- create a customer-facing Expert selection experience;
- create or prioritize canonical Recommendation;
- form, validate, complete, amend, reinterpret, or supersede Business Brain Decision;
- own or change Business DNA, Knowledge, Rules, Capabilities, Analytics, or OS facts;
- define Configuration Proposal or apply target configuration;
- grant Permission or authorize a consequential action;
- define Marketplace Asset, Entitlement, Installation, Activation, or Applicability anew;
- approve third-party Expert publication or operation;
- define APIs, Contracts, Events, data models, databases, infrastructure, deployment, technology,
  frameworks, or implementation;
- select providers or commercial terms; or
- answer the Open Questions in this document.

## 6. Problem Statement

A single generic AI assistant cannot reliably represent the breadth of business, industry,
functional, technical, country, and operating context within Nexoraxs. It would obscure which
expertise was applied, what evidence was used, how conflicts were handled, whether context was
authorized, and which canonical owner remains responsible.

A collection of independent customer-facing Experts creates a different problem: customers would
need to select Experts, repeat context, compare competing answers, understand provider boundaries,
and decide whether a response is authoritative. That conflicts with the frozen rule that the AI
Coordinator selects specialized Experts and returns one unified Nexoraxs response.

The architectural problem space is therefore to understand how specialized Expert definitions
and contributions can participate in governed AI coordination while preserving all of the
following:

- Knowledge before AI;
- completed canonical Decision before AI;
- Recommendation Engine ownership of Recommendation;
- AI Coordinator ownership of AI Interaction, coordination, and AI artifacts;
- Marketplace ownership of AI Expert Asset distribution representation and scoped state;
- target-owner control of configuration and operational effects;
- explicit Workspace and Business context;
- evidence, confidence, explainability, and human authority; and
- replaceability of Experts, providers, and models without changing business truth.

## 7. Success Criteria

Discovery succeeds when a later Capability Map can trace, without making architecture decisions:

1. every candidate Expert concern to a frozen business or platform need;
2. every external dependency to its canonical owner;
3. Expert Definition, Marketplace representation, AI Coordinator eligibility, and AI Interaction
   contribution as distinct questions;
4. Industry, Functional, and Technical categories and their candidate families;
5. the conceptual lifecycle and its unresolved relationship to immutable Marketplace versions;
6. Workspace and Business scoping requirements;
7. candidate Expert capabilities without confusing them with AI Coordinator responsibilities;
8. collaboration, conflict, evidence, confidence, and unified-response problem areas;
9. Security, privacy, Audit, Governance, and operational unknowns;
10. all unresolved architecture questions and risks; and
11. why no candidate in Discovery is yet approved.

## 8. Inherited Boundaries

The following are frozen constraints, not Discovery proposals.

### 8.1 AI boundary

- AI is downstream of authorized Business DNA, Knowledge, deterministic Rules, Analytics,
  completed Business Brain Decision, Recommendation context, Permission, and owner-controlled
  evidence.
- Business Brain completes canonical Decision independently before AI participation.
- AI Coordinator owns AI Interaction, context construction, policy filtering, Expert eligibility
  and routing, collaboration, validation, synthesis, explainability, Action Proposal, conversation
  context, and AI Audit/Observability responsibilities.
- customers interact with Nexoraxs, not individual Experts.
- Experts never receive unrestricted service or database access.
- AI artifacts have no execution authority.
- AI failure cannot invalidate Decision or canonical OS facts.

### 8.2 Marketplace boundary

- AI Expert is an approved Marketplace Asset family.
- Marketplace owns the Marketplace Asset representation, immutable Marketplace Asset Version,
  and approved Marketplace scoped state.
- Marketplace Activation and Applicability only make an Expert definition available for AI
  Coordinator eligibility evaluation.
- Marketplace does not select an Expert for an AI Interaction, grant data access, coordinate AI,
  or own AI output.
- exact Expert submission, evaluation, safety, country, Knowledge dependency, provider,
  commercial, capacity, fallback, and removal policy remains deferred by Marketplace v1.0.

### 8.3 Intelligence and target-owner boundary

- Knowledge Engine owns Knowledge and Knowledge Pack content.
- Rules owners retain deterministic Rule definitions and outcomes.
- Capability Registry owns Capability definitions.
- Business Brain owns completed Decision and candidate reasoning.
- Recommendation Engine owns Recommendation and disposition.
- Configuration Engine owns Configuration Proposal.
- the applicable Core or OS owner authorizes and applies target effects.
- Audit Service owns append-only Audit Records.

## 9. External Dependencies

| External dependency | Frozen responsibility | AI Expert Network problem-space dependency | Must never be inferred |
|---|---|---|---|
| Core Identity and Access | identity, Authentication, Membership, Permission grants, explicit context | verified Actor and minimum authorized scope | Expert identity or activation grants Permission |
| Business DNA owner | Business-scoped Business DNA and explicit Workspace aggregation | authorized business context | Expert modifies or creates Business DNA |
| Knowledge Engine | Knowledge and Knowledge Pack content, publication, applicability, use | governed sources for Expert contribution | Expert or Network owns Knowledge |
| Rules owner | deterministic, versioned, explainable Rules and outcomes | policy and decision evidence | generated output becomes Rule truth |
| Business Brain | completed Decision and candidate reasoning | authorized completed Decision context | Expert contributes to canonical Decision formation |
| Recommendation Engine | canonical Recommendation and disposition | authorized Recommendation context where applicable | Expert output is automatically canonical Recommendation |
| Capability Registry | Capability identity, meaning, dependencies, applicability, lifecycle | Capability context and Expert relevance | Expert redefines Capability |
| Configuration Engine | Configuration Proposal | downstream proposal boundary where separately authorized | Expert applies configuration |
| Core Analytics | platform Analytics projections | authorized evidence or outcome context | Expert owns Analytics source truth |
| Core Audit Service | append-only Audit Record | attributable AI evidence submission | Expert log is the Audit Record |
| AI Coordinator | request interpretation, authorization, context, policy, Expert registry/routing, orchestration, validation, synthesis, AI artifacts | central coordination boundary | Network duplicates coordinator responsibilities |
| Marketplace | AI Expert Asset representation, version, Review, Certification, Entitlement, Installation, Activation, Applicability | governed distribution and availability context | Marketplace activation compels selection or authorizes data access |
| Product Hub | journey composition and handoff | possible discovery/presentation context | Expert Network owns Product Hub journey |
| Commerce OS | Commerce configuration, authorization, workflows, and operational facts | optional authorized target/evidence context | Expert output mutates Commerce truth |
| future Operating Systems | their setup, Permissions, configuration, workflows, navigation, and operational facts | optional authorized target/evidence context | any OS depends on Expert Network for core operation |

## 10. Internal Dependencies to Explore

These are logical problem relationships, not approved Components or internal architecture.

| Candidate concern | Depends logically on | Discovery uncertainty |
|---|---|---|
| Expert Definition understanding | specialization, evidence needs, input requirements, compatibility, lifecycle | how AI Coordinator's frozen registry information relates to the Marketplace representation without duplication |
| Expert eligibility | explicit context, active/applicable version, policy, Permission, Knowledge, compatibility | eligibility criteria and precedence |
| Expert contribution | minimum authorized inputs, instructions, sources, confidence expectations | contribution shape and validation requirements |
| multi-Expert collaboration | eligible Expert set, question decomposition, evidence boundaries | collaboration roles and conflict handling |
| unified response | validated contributions, conflicts, uncertainty, customer context | what may be synthesized versus exposed |
| Action Proposal advisory path | completed AI response, customer intent, target owner | when advisory content becomes a separate proposal |
| feedback and learning | attributable Interaction outcome and approved feedback | what can improve definitions without rewriting Knowledge or truth |
| Expert lifecycle visibility | Marketplace version/state and AI Coordinator eligibility state | how independent lifecycles relate without duplication |

## 11. Relationship with Frozen Owners

### 11.1 Business Brain

Business Brain completes Decision without AI. An Expert may consume only the minimum authorized
completed Decision context made available by AI Coordinator. Expert output cannot form, validate,
complete, amend, supersede, recover, or reinterpret the canonical Decision.

Discovery must clarify how Decision context may inform Expert contribution without copying
Decision ownership or treating the contribution as candidate reasoning.

### 11.2 AI Coordinator

AI Coordinator is the exclusive coordination boundary. It understands requests, resolves
authorization context, builds minimum context, applies policy, determines Expert eligibility,
selects and coordinates Experts, validates evidence, synthesizes one response, reports confidence
and uncertainty, manages conversation context, and owns AI artifacts.

Discovery must not duplicate these responsibilities. It must determine what an Expert Definition
and Expert contribution need to expose to that frozen coordinator boundary.

### 11.3 Recommendation Engine

Recommendation Engine owns canonical Recommendation. Genesis describes Expert outputs using the
word “Recommendations”; this is a terminology question for the future Proposal. Discovery treats
such Expert output only as a possible AI-owned advisory contribution unless a governed external
Recommendation already exists. It does not redefine Recommendation.

### 11.4 Marketplace

Marketplace governs the discoverable and distributable AI Expert Asset representation, immutable
version, Review, Certification, commercial/scoped lifecycle state, and applicability. AI
Coordinator governs eligibility for a particular AI Interaction and every execution/output
responsibility.

The relationship between Marketplace Asset Version and the Expert definition used by AI
Coordinator requires clarification without introducing a second definition owner.

### 11.5 Knowledge Engine

Experts consume applicable, authorized Knowledge and never own or modify it. Candidate Knowledge
changes follow review, approval, publication, and versioning. Discovery must identify how
Knowledge sources, versions, applicability, freshness, and evidence are represented to an Expert
without designing a Contract.

### 11.6 Capability Registry

Capabilities may help express Expert specialization, eligibility, and relevance. Experts cannot
create, rename, mutate, or supersede canonical Capabilities. Discovery must determine whether and
how Expert definitions reference Capability identifiers.

### 11.7 Configuration Engine

An Expert may suggest an improvement or contribute advisory content. Configuration Engine owns
Configuration Proposal, and the target owner applies accepted configuration. Discovery must
distinguish an Expert contribution, AI Action Proposal, canonical Recommendation, and
Configuration Proposal without defining their implementation.

### 11.8 Core Platform

Core Platform supplies identity, explicit context, Permissions, AI Coordinator, Audit,
observability, Search, Marketplace, and shared Security. The AI Expert Network must extend those
foundations without creating a separate identity, authorization, Audit, navigation, or AI
coordination plane.

### 11.9 Commerce OS

Commerce OS may supply authorized evidence or receive an owner-validated proposal. It retains
every Commerce fact and configuration. Commerce Core must remain fully usable when AI Expert
Network is unavailable or not enabled.

### 11.10 Future Operating Systems

Future Operating Systems remain independent and define their own facts, Permissions,
configuration, workflows, and operational invariants. Expert specialization may include future OS
context, but no Expert may become an OS writer or required core dependency.

## 12. Expert Definition Problem Space

Genesis and Core documentation establish specialized, versioned Expert definitions and an Expert
Registry within AI Coordinator, while Marketplace freezes AI Expert as a versioned Asset family.
Discovery must determine the logical meaning and relationship of these concepts before any owner
or model is approved.

Candidate Expert Definition information to investigate includes:

- stable Expert identity and human-readable name;
- Industry, Functional, or Technical specialization;
- supported business problems and candidate Capabilities;
- required and optional input context;
- applicable Knowledge and Knowledge Pack relationships;
- supported Workspace, Business, country, language, OS, and Capability contexts;
- Permission and data-access needs;
- evidence, confidence, assumption, alternative, and explanation expectations;
- compatibility and dependency declarations;
- provider/model independence requirements;
- safety, privacy, and data-use constraints;
- collaboration suitability and conflict characteristics;
- lifecycle and version references;
- provenance, Publisher, Review, Certification, and Trust context; and
- operational health, capacity, fallback, and deprecation information.

This is an investigation list, not an approved schema or model.

## 13. Expert Lifecycle — Conceptual Only

Genesis identifies the conceptual Expert lifecycle:

```text
Designed
  -> Trained
  -> Validated
  -> Published
  -> Active
  -> Improved
  -> Deprecated
```

Discovery does not approve these as canonical states or create a new lifecycle owner. AI
Coordinator retains its frozen Expert Registry responsibility, while Marketplace retains its
Asset/version lifecycle. Discovery records the need to clarify:

- whether the sequence describes Expert Definition, Marketplace Asset Version, provider/model
  preparation, AI Coordinator eligibility, or multiple related lifecycles;
- how `Published` relates to immutable Marketplace Asset Version;
- whether `Improved` requires a new immutable version rather than changing Published content;
- how Marketplace Activation differs from AI Coordinator eligibility for an Interaction;
- whether deprecation affects discovery, eligibility, existing conversations, or fallback;
- what validation means and how it differs from Marketplace Review and Certification; and
- what history must remain attributable and reproducible.

No lifecycle transition beyond the inherited conceptual language is approved here.

## 14. Candidate Expert Categories and Families

### 14.1 Candidate categories from Genesis

| Candidate category | Candidate families explicitly named in Genesis |
|---|---|
| Industry Experts | Retail Expert; Restaurant Expert; Healthcare Expert; Construction Expert; Manufacturing Expert; Education Expert; Logistics Expert; Hospitality Expert; Real Estate Expert; Automotive Expert |
| Functional Experts | CEO Advisor; COO Advisor; CFO Advisor; HR Director; Marketing Director; Sales Director; Operations Director; Customer Success Advisor; Compliance Advisor; Legal Advisor |
| Technical Experts | Analytics Expert; Automation Expert; Workflow Expert; Reporting Expert; Integration Expert; Security Expert; AI Strategy Expert; Data Expert |

These three categories and 28 family labels are candidate discovery inputs. Discovery does not
approve their taxonomy, boundaries, overlap, lifecycle, or ownership.

### 14.2 Additional Genesis example labels

Genesis AI Strategy also names Finance Expert, HR Expert, CRM Expert, Operations Expert,
Compliance Expert, and Marketplace Expert. Their alignment with the three candidate categories,
the Advisor/Director labels, Operating Systems, and Marketplace categories remains unresolved.

### 14.3 Participation labels are not Expert categories

Genesis also uses Official Nexoraxs Experts, Certified Partner Experts, Industry Experts, Premium
Experts, and Marketplace Experts. Discovery records a possible overlap between specialization,
provenance, certification, commercial presentation, and distribution labels. It does not approve
a combined taxonomy or synonym.

## 15. Candidate Expert Capabilities

The following eighteen candidate capabilities describe possible Expert contributions. They do
not approve a Capability catalog, Domain, Component, owner, or execution path.

| ID | Candidate Expert Capability | Problem-space purpose | Explicit boundary |
|---|---|---|---|
| AEC-01 | Specialized Business Question Contribution | contribute domain-specific understanding to an authorized request | not request interpretation or final response ownership |
| AEC-02 | Recommendation Explanation Contribution | explain an existing governed Recommendation or advisory rationale | not create canonical Recommendation |
| AEC-03 | Business Insight Contribution | identify evidence-backed business insight for synthesis | not canonical Decision or Analytics truth |
| AEC-04 | Risk Assessment Contribution | identify risks, assumptions, and uncertainty | not compliance approval or target decision |
| AEC-05 | Growth Opportunity Contribution | identify possible growth opportunities | not Recommendation priority or execution |
| AEC-06 | Automation Suggestion Contribution | suggest possible automation needs | not Rule, Automation Pack, Configuration Proposal, or application |
| AEC-07 | Executive Summary Contribution | contribute concise executive interpretation | not unified customer response ownership |
| AEC-08 | Action Plan Contribution | outline advisory steps for synthesis | not AI Action Proposal or executable plan by default |
| AEC-09 | Analytics Interpretation Contribution | interpret authorized Analytics context | not Analytics source, projection, or metric ownership |
| AEC-10 | Workflow Explanation Contribution | explain a governed workflow | not workflow definition, instance, or configuration |
| AEC-11 | Configuration Guidance Contribution | explain possible configuration implications | not Configuration Proposal or target configuration |
| AEC-12 | Reporting Guidance Contribution | explain reporting needs or findings | not Report source truth or applied dashboard ownership |
| AEC-13 | Integration Advisory Contribution | identify possible integration considerations | not Connector, Contract, or integration execution |
| AEC-14 | Security Advisory Contribution | identify Security considerations within authorized evidence | not Security policy, Permission, or authorization |
| AEC-15 | Compliance Advisory Contribution | explain applicable governed compliance context | not legal authority, Rule, approval, or override |
| AEC-16 | Alternative Option Contribution | identify evidence-based alternatives and tradeoffs | not canonical Implementation Option mapping |
| AEC-17 | Confidence and Evidence Reporting | report confidence, sources, assumptions, and limitations | not evidence validation or final confidence synthesis ownership |
| AEC-18 | Multi-Expert Collaboration Contribution | provide a bounded contribution for coordinated synthesis | not Expert selection, conflict resolution, or orchestration |

**Candidate Capability count: 18**

## 16. Expert Eligibility Problem Space

Expert eligibility is distinct from Marketplace discovery, Entitlement, Installation, Activation,
Applicability, and customer preference. AI Coordinator owns eligibility and selection for an
authorized AI Interaction.

Eligibility may need to consider, without approving criteria:

- current Actor, Workspace, Business, and resource context;
- Marketplace Entitlement, Installation, Activation, and Applicability;
- exact immutable Expert Asset Version;
- Expert lifecycle and deprecation context;
- request subject and required specialization;
- Business DNA, Business stage, goals, country, and language;
- applicable Knowledge Packs and their versions;
- OS and Capability context;
- required Permissions and data-access declarations;
- provider/model and country compatibility;
- safety, privacy, residency, retention, and consent policy;
- evidence availability and freshness;
- capacity, health, fallback, and cost policy; and
- single- versus multi-Expert suitability.

The criteria, precedence, freshness, and failure behavior remain Open Questions.

## 17. Expert Activation — Conceptual Only

Marketplace Activation is a Workspace-scoped Marketplace fact. It enables possible authorized
use of an installed selected Asset Version. Marketplace Applicability may target the Workspace or
one selected Business.

For an AI Expert, Activation and Applicability make the definition available for AI Coordinator
eligibility evaluation. They do not:

- compel Expert selection;
- grant Permission or data access;
- prove the Expert is suitable for the current request;
- override country, privacy, safety, capacity, or provider policy;
- begin an AI Interaction;
- make an Expert customer-facing;
- transfer AI artifact ownership to Marketplace; or
- authorize a target action.

Discovery does not define activation transitions or their relationship with the conceptual Expert
lifecycle.

## 18. Expert Discovery

Expert discovery has at least two distinct problem contexts:

1. customer/Publisher discovery of AI Expert Assets through Marketplace; and
2. AI Coordinator discovery of eligible Expert definitions for one authorized Interaction.

Marketplace owns its discovery projections and Asset lifecycle; AI Coordinator owns eligibility
and selection. Product Hub may compose Marketplace information without owning either source.
Discovery must determine the terminology and information boundaries that prevent these meanings
from collapsing.

## 19. Expert Composition and Collaboration

Genesis permits multiple Experts to collaborate while AI Coordinator returns one unified answer.
Candidate collaboration problems include:

- identifying which expertise is needed without customer manual selection;
- decomposing a business question without losing the original context;
- giving each Expert only its minimum authorized context;
- preserving source and version attribution across contributions;
- combining Industry, Functional, and Technical perspectives;
- identifying duplicated, complementary, and conflicting claims;
- resolving conflicts through evidence or exposing unresolved disagreement;
- preserving minority, alternative, and low-confidence views;
- preventing one Expert from silently overriding another or a canonical owner;
- synthesizing one response without inventing unsupported certainty;
- maintaining conversation continuity without broadening access; and
- degrading safely when one Expert is unavailable or unsuitable.

No collaboration topology, role, protocol, or execution sequence is approved.

## 20. Expert Isolation

Discovery must explore isolation across:

- Workspace tenants;
- Businesses within a Workspace;
- explicit Workspace-level Business aggregation;
- Experts and Expert versions;
- Publishers and providers;
- Knowledge and data scopes;
- conversations and AI Interactions;
- OS and target resources;
- tools and proposed actions;
- external providers and jurisdictions;
- logs, evidence, feedback, and learning; and
- failures, capacity, and fallback.

Isolation must prevent unauthorized context sharing, unrestricted data access, cross-Business
leakage, provider ownership of platform truth, and one Expert's failure or output becoming another
owner's canonical state. Exact controls remain unresolved.

## 21. Expert Ownership Questions

Frozen owners remain controlling, but the future Proposal must answer the following without
duplication:

- What exact logical information does AI Coordinator's frozen Expert Registry maintain for an
  Expert Definition?
- Is the definition used by AI Coordinator identical to or referenced by the Marketplace Asset
  Version?
- How do AI Coordinator-owned specialization, input-requirement, compatibility, and lifecycle
  information relate to Marketplace-owned representation and version facts without duplication?
- What remains a Marketplace Asset fact versus an AI Coordinator registry concern?
- What is an Expert contribution, and is it a separately retained AI artifact?
- How are AI Coordinator-owned eligibility outcome, selection rationale, collaboration
  membership, contribution evidence, and synthesis lineage distinguished and retained?
- How are provider/model relationships represented without making them Expert identity?
- How is a new Expert version related to Knowledge or policy changes?
- How do the frozen Marketplace lifecycle and AI Coordinator registry/eligibility responsibilities
  correlate across validation, publication, activation, eligibility, and deprecation?
- What feedback is an AI-owned observation versus a Marketplace, Knowledge, Recommendation, or
  target-owned outcome?

Discovery does not answer these ownership questions.

## 22. Workspace and Business Scope

### 22.1 Workspace scope

Workspace remains the tenant boundary. Marketplace Purchase, Entitlement, Version Selection,
Installation, and Activation are Workspace-scoped. Any AI Interaction must use current
Workspace authorization, and Workspace-level intelligence may aggregate Business context only
through the frozen explicit aggregation rule.

### 22.2 Business scope

Every Business retains separate Business DNA. Marketplace Applicability may identify one selected
Business. AI Coordinator must build minimum authorized Business context and cannot silently merge
Business DNA, conversation, evidence, or outcomes across Businesses.

### 22.3 Scope questions

The later architecture must clarify how one Expert may be active for a Workspace yet eligible only
for a selected Business, and how explicit Workspace-level aggregation affects multi-Expert
collaboration without creating Workspace DNA or cross-Business leakage.

## 23. Inputs and Outputs to Explore

### 23.1 Candidate inputs

Genesis names Business-scoped Business DNA, explicit Workspace aggregation where required,
Business stage, applicable Knowledge Packs, Workspace context, country Rules, Operating Systems,
Capabilities, Analytics, conversation history, and Permissions.

Discovery adds no new canonical input. It records the need to determine minimum necessary scope,
source versions, freshness, provenance, authorization, and applicability for each input.

### 23.2 Candidate Expert contributions

Genesis names Recommendations, explanations, business insights, risk assessments, growth
opportunities, automation suggestions, executive summaries, and action plans. AI Strategy also
names natural language, summaries, predictions, draft documents, suggested automations, and
learning suggestions.

These labels require normalization against frozen owners. In Discovery:

- `Recommendation` must not imply canonical Recommendation ownership;
- an action plan must not automatically be an AI Action Proposal;
- a suggestion must not be a Configuration Proposal or command;
- an insight must not be Business Brain Decision content;
- a report or summary must not become Analytics or OS source truth; and
- learning suggestions must not change Business DNA, Knowledge, Rules, or completed Decisions.

The customer-facing unified response remains AI Coordinator-owned.

## 24. Security Questions

1. What minimum context may each Expert receive for each candidate capability?
2. How are required-Permission and data-access declarations validated for an Expert version?
3. How does current authorization re-evaluate across long conversations and context changes?
4. Which Expert, Publisher, provider, tool, content, and output boundaries are treated as
   untrusted?
5. How are prompt manipulation, unsafe instruction, data exfiltration, and cross-Expert influence
   evaluated without choosing technology?
6. What actions always require human approval and owning-service reauthorization?
7. How are country, jurisdiction, provider, and data-use restrictions applied before and after an
   Expert contribution?
8. How does the network fail closed when context, Permission, evidence, or policy is stale or
   ambiguous?

## 25. Privacy Questions

1. What data classification applies to Expert inputs, contributions, unified responses,
   conversation history, evidence, and feedback?
2. What purposes justify sharing each context element with an Expert or external provider?
3. How are minimization and same-or-narrower scope demonstrated?
4. What consent is required for provider processing, feedback, learning, and anonymous patterns?
5. How are residency, retention, deletion, export, masking, legal hold, and confidentiality
   handled?
6. How is cross-Business or Workspace-level aggregated context kept attributable and isolated?
7. What information may a Publisher receive about adoption, use, failure, or outcomes?
8. How are immutable Marketplace history and privacy obligations reconciled?

## 26. Audit Questions

1. Which Expert-definition, eligibility, selection, collaboration, contribution, synthesis,
   confidence, Action Proposal, and feedback activities are consequential?
2. What evidence must be submitted to Core Audit Service?
3. How are Actor, Workspace, Business, Expert/version, source/version, policy, provider, model,
   correlation, causation, and outcome preserved?
4. How are conversation history, observability, AI evidence, and Audit Record distinguished?
5. How is multi-Expert lineage represented without defining an Event or data model?
6. What must remain reviewable after Expert or provider deprecation?
7. How are failed, rejected, unsafe, and low-confidence contributions audited?
8. Who may view each kind of AI evidence under current authorization and privacy policy?

## 27. Governance Questions

1. Which decisions require new ADRs versus application of ADR-029 through ADR-032?
2. What governance approves an Expert Definition and changes to it?
3. How do Marketplace Review/Certification differ from AI safety, quality, or eligibility
   evaluation?
4. What separation of duties is required among Publisher, reviewer, certifier, policy owner, and
   AI operations?
5. What evidence permits Official, Certified Partner, Premium, or other participation labels?
6. How are conflicts of interest, sponsored visibility, and commercial influence prevented from
   affecting Expert selection or unified answers?
7. How do Knowledge updates trigger evaluation without allowing AI to publish Knowledge?
8. What human-control policy applies to advisory outputs and Action Proposals by consequence?

## 28. Operational Questions

1. What does availability mean for an Expert Definition, Marketplace Asset, provider, and
   Interaction eligibility?
2. How are capacity, degradation, timeout, cancellation, fallback, and recovery represented?
3. What happens when one Expert in a multi-Expert collaboration fails or becomes ineligible?
4. How are evidence freshness and Knowledge-version drift detected?
5. How are low confidence, conflicting contributions, and incomplete synthesis surfaced?
6. What health, quality, safety, cost, and business-value measures are meaningful without becoming
   source truth?
7. What service objectives, continuity, incident, support, and escalation policies are required?
8. How are version deprecation, provider withdrawal, Marketplace removal, and active conversation
   continuity coordinated?

## 29. Assumptions

### 29.1 Frozen assumptions

The following are treated as inherited facts for Discovery:

- AI Coordinator remains the exclusive coordinator.
- customers do not manually choose or directly interact with individual Experts.
- Business Brain Decision is completed before AI.
- Expert definitions are specialized and versioned.
- Published Marketplace Asset Versions are immutable.
- Marketplace Activation does not equal AI Interaction eligibility.
- Knowledge and Rules remain governed and external to AI ownership.
- canonical Recommendation and Configuration Proposal remain externally owned.
- Experts use minimum authorized context and cannot execute consequential changes.
- every OS remains independently usable without AI Expert Network.

### 29.2 Working assumptions to validate later

- multiple Experts may be useful for some requests but not all;
- category and family labels may overlap and require governed normalization;
- an Expert contribution may need independent provenance from the unified response;
- Expert quality may vary by country, language, Knowledge version, provider, and Business context;
- Marketplace and AI Coordinator may need different views of one Expert definition; and
- future partner Experts may require stricter Governance than official Experts.

Working assumptions have no architectural authority.

## 30. Risks

| ID | Discovery risk | Potential consequence | Discovery treatment |
|---|---|---|---|
| R-AEN-01 | AI Expert Network duplicates AI Coordinator | competing orchestration and ownership | preserve frozen coordinator boundary and keep ownership open |
| R-AEN-02 | Expert output is treated as canonical Recommendation | Recommendation ownership conflict | flag terminology and preserve Recommendation Engine boundary |
| R-AEN-03 | Expert contributes to Business Brain Decision formation | deterministic Decision and provider independence fail | preserve post-Decision sequence |
| R-AEN-04 | Marketplace Activation is treated as eligibility or authorization | unsuitable or unauthorized Expert use | keep concepts distinct and question criteria |
| R-AEN-05 | Marketplace and AI Coordinator create parallel Expert definitions | identity and version divergence | require Proposal to resolve the relationship |
| R-AEN-06 | `Improved` mutates a Published Expert version | immutability and reproducibility fail | record lifecycle ambiguity without resolving it |
| R-AEN-07 | category, family, provenance, certification, and commercial labels collapse | taxonomy and policy become inconsistent | keep label dimensions exploratory |
| R-AEN-08 | Experts receive broad Workspace or cross-Business data | tenant and Business isolation fail | require minimum explicit authorized context |
| R-AEN-09 | multi-Expert synthesis hides disagreement | false certainty and unsafe advice | retain conflict, evidence, and uncertainty questions |
| R-AEN-10 | Expert or provider invents Knowledge or Rules | platform truth becomes non-reproducible | preserve Knowledge/Rules ownership |
| R-AEN-11 | advisory output becomes executable action | authorization and human control fail | preserve Action Proposal and owner-validation boundary |
| R-AEN-12 | provider/model identity becomes Expert identity | replaceability and provenance blur | keep relationship unresolved and explicit |
| R-AEN-13 | partner participation begins without Governance | Security, quality, legal, and trust exposure | preserve Marketplace and Governance gates |
| R-AEN-14 | evidence is stale, unavailable, or misattributed | explainability and confidence become misleading | require freshness/provenance questions |
| R-AEN-15 | feedback or learning rewrites canonical facts | Business DNA, Knowledge, Rules, or Decision corruption | preserve governed learning boundary |
| R-AEN-16 | AI Expert failure blocks OS core operation | OS independence fails | preserve optional dependency and failure isolation |
| R-AEN-17 | conversation continuity broadens authorization | data exposure across time or scope changes | require current reauthorization questions |
| R-AEN-18 | observability or AI evidence becomes Audit/business truth | source ownership conflict | preserve Core Audit and canonical source boundaries |
| R-AEN-19 | low confidence is hidden by unified synthesis | customer over-trust and unsafe action | require visible confidence/verification behavior questions |
| R-AEN-20 | Discovery candidates are mistaken for approved architecture | premature design becomes authority | label every candidate and require later quality gates |

**Risk count: 20**

## 31. Open Questions

All questions below remain unanswered.

### 31.1 Expert identity and definition — OQ-AEN-01 through OQ-AEN-06

1. **OQ-AEN-01:** What exact logical information constitutes the Expert Definition maintained by
   AI Coordinator's frozen Expert Registry?
2. **OQ-AEN-02:** How does Expert Definition relate to Marketplace Asset and immutable Asset
   Version?
3. **OQ-AEN-03:** How does AI Coordinator-owned definition information reference Marketplace-owned
   representation and version facts without duplication?
4. **OQ-AEN-04:** How are stable Expert identity, version, provider, and model kept distinct?
5. **OQ-AEN-05:** What information is universal versus category- or family-specific?
6. **OQ-AEN-06:** What provenance and ownership evidence is required for an Expert definition?

### 31.2 Categories, families, and capabilities — OQ-AEN-07 through OQ-AEN-12

7. **OQ-AEN-07:** Are Industry, Functional, and Technical the complete specialization categories?
8. **OQ-AEN-08:** How are Advisor, Director, and Expert labels normalized without creating
   synonyms?
9. **OQ-AEN-09:** Where do Finance, HR, CRM, Operations, Compliance, and Marketplace Expert labels
   belong?
10. **OQ-AEN-10:** How are specialization categories separated from Publisher, Certification, and
    commercial labels?
11. **OQ-AEN-11:** Which candidate Expert capabilities belong in a later logical Capability Map?
12. **OQ-AEN-12:** How do Expert capabilities reference canonical Capability Registry definitions?

### 31.3 Lifecycle and versioning — OQ-AEN-13 through OQ-AEN-18

13. **OQ-AEN-13:** Which subject does the Genesis Designed-to-Deprecated lifecycle describe?
14. **OQ-AEN-14:** How does that lifecycle relate to Marketplace Asset Version lifecycle?
15. **OQ-AEN-15:** Does `Improved` always create a new immutable version after publication?
16. **OQ-AEN-16:** What validation is distinct from Marketplace Review and Certification?
17. **OQ-AEN-17:** How do deprecation, withdrawal, fallback, and active conversations interact?
18. **OQ-AEN-18:** What history is required for reproducibility after version/provider changes?

### 31.4 Eligibility, activation, and discovery — OQ-AEN-19 through OQ-AEN-24

19. **OQ-AEN-19:** What criteria determine Expert eligibility for one AI Interaction?
20. **OQ-AEN-20:** How are criteria ordered when Marketplace, country, Permission, Knowledge,
    provider, and capacity contexts differ?
21. **OQ-AEN-21:** How is stale or ambiguous eligibility represented?
22. **OQ-AEN-22:** How are Marketplace discovery and AI Coordinator Expert discovery named and
    separated?
23. **OQ-AEN-23:** Can customer preferences influence routing without becoming manual selection?
24. **OQ-AEN-24:** How do Activation, Applicability, eligibility, selection, and Interaction start
    remain distinct?

### 31.5 Context and scope — OQ-AEN-25 through OQ-AEN-30

25. **OQ-AEN-25:** What minimum input context is required by each candidate capability?
26. **OQ-AEN-26:** How is Business scope preserved across a multi-Expert Interaction?
27. **OQ-AEN-27:** When is explicit Workspace-level Business aggregation allowed and useful?
28. **OQ-AEN-28:** How are country, language, OS, Capability, and Knowledge applicability combined?
29. **OQ-AEN-29:** How are context freshness and authorization changes handled during a
    conversation?
30. **OQ-AEN-30:** What context may be retained between Interactions without broadening scope?

### 31.6 Collaboration, conflict, and synthesis — OQ-AEN-31 through OQ-AEN-36

31. **OQ-AEN-31:** When should one Expert versus multiple Experts contribute?
32. **OQ-AEN-32:** How is a request decomposed without changing customer intent?
33. **OQ-AEN-33:** How are overlapping and conflicting contributions identified?
34. **OQ-AEN-34:** Which conflicts may be resolved by evidence and which must remain visible?
35. **OQ-AEN-35:** What contribution provenance must survive unified synthesis?
36. **OQ-AEN-36:** How does synthesis avoid converting uncertainty into false consensus?

### 31.7 Outputs and owner boundaries — OQ-AEN-37 through OQ-AEN-42

37. **OQ-AEN-37:** What is the canonical term for a bounded Expert contribution?
38. **OQ-AEN-38:** How is an Expert advisory contribution distinguished from Recommendation?
39. **OQ-AEN-39:** When, if ever, can advisory content become an AI Action Proposal?
40. **OQ-AEN-40:** How are Action Plan, Configuration guidance, and Configuration Proposal kept
    distinct?
41. **OQ-AEN-41:** Which confidence belongs to a contribution versus the unified response?
42. **OQ-AEN-42:** What AI artifacts and lineage must AI Coordinator retain?

### 31.8 Security, privacy, and Audit — OQ-AEN-43 through OQ-AEN-48

43. **OQ-AEN-43:** What Permission and data declarations are required for each Expert version?
44. **OQ-AEN-44:** What Security and safety evaluation is required before and after contribution?
45. **OQ-AEN-45:** What provider, residency, retention, consent, and confidentiality rules apply?
46. **OQ-AEN-46:** How is cross-Expert, cross-Business, and cross-provider isolation demonstrated?
47. **OQ-AEN-47:** Which consequential AI activities require Core Audit evidence?
48. **OQ-AEN-48:** Who may inspect contribution evidence, conversation context, and synthesis
    lineage?

### 31.9 Governance, Marketplace, and partners — OQ-AEN-49 through OQ-AEN-54

49. **OQ-AEN-49:** Which AI Expert Network decisions require new ADRs?
50. **OQ-AEN-50:** What separates Marketplace Review/Certification from AI safety and quality
    evaluation?
51. **OQ-AEN-51:** What policies govern official and future partner Expert participation?
52. **OQ-AEN-52:** How are conflicts of interest, sponsorship, and commercial influence governed?
53. **OQ-AEN-53:** What Marketplace removal or deprecation effects must AI Coordinator observe?
54. **OQ-AEN-54:** Which Marketplace DD-MP decisions must be resolved before partner Expert work?

### 31.10 Learning and operations — OQ-AEN-55 through OQ-AEN-60

55. **OQ-AEN-55:** What feedback and outcomes may improve an Expert without rewriting canonical
    truth?
56. **OQ-AEN-56:** How do Knowledge changes trigger re-evaluation or new Expert versions?
57. **OQ-AEN-57:** What health, quality, safety, confidence, cost, and value measures are needed?
58. **OQ-AEN-58:** How are capacity, failure, timeout, fallback, recovery, and continuity handled?
59. **OQ-AEN-59:** What support, incident, escalation, and customer communication policies apply?
60. **OQ-AEN-60:** What must be approved before global or third-party production operation?

**Open Question count: 60**

## 32. Proposal Readiness

### 32.1 Discovery completeness

| Discovery area | Status |
|---|---|
| Mission, Vision, Goals, Non-Goals, Problem Statement | COVERED |
| frozen boundaries and external dependencies | COVERED |
| relationships with all required milestones and owners | COVERED |
| Expert Definition and conceptual lifecycle | COVERED AS QUESTIONS |
| candidate categories and families | COVERED, NOT APPROVED |
| 18 candidate Expert capabilities | COVERED, NOT APPROVED |
| eligibility, activation, discovery, composition, collaboration, isolation | COVERED AS PROBLEM SPACE |
| Workspace and Business scope | COVERED |
| Security, privacy, Audit, Governance, and operations | COVERED AS QUESTIONS |
| assumptions, risks, and 60 Open Questions | COVERED |

### 32.2 Readiness limits

Discovery is not sufficient for a Proposal by itself. A Capability Map must first organize the
candidate capabilities, logical responsibility flow, information flow, decision flow, external
dependencies, collaboration boundaries, and unresolved questions without approving architecture.

No candidate Domain, Component, owner, write model, lifecycle, API, Contract, Event, data model,
or technology is approved by this Discovery.

### 32.3 Recommendation

# READY FOR CAPABILITY MAP

The problem space is sufficiently mapped to begin a logical Capability Map. The Capability Map
must preserve every frozen owner and keep all 60 Open Questions unresolved until the authorized
Proposal phase.

## 33. References

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
