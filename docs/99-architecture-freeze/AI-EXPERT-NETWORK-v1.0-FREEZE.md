# AI Expert Network Architecture v1.0 Freeze

**Architecture version:** AI Expert Network Architecture v1.0  
**Documentation baseline:** AI Expert Network Documentation Baseline v1.0  
**Proposal baseline:** AI Expert Network Proposal Baseline v0.1.2  
**Freeze date:** 2026-07-13  
**Freeze status:** FROZEN  
**Final Architecture Review verdict:** APPROVED FOR FREEZE  
**Milestone status after this artifact:** Frozen; readiness validation remains a separate gate

---

## 1. Freeze Summary

### 1.1 Freeze declaration

This document officially freezes AI Expert Network Architecture v1.0. It is the authoritative
architectural baseline for all future AI Expert Network work in Nexoraxs.

The Freeze records only architecture approved by the complete milestone and its Final
Architecture Review. It introduces no new Domain, Capability, owner, canonical fact, write model,
aggregate, read model, lifecycle, Security rule, privacy rule, Audit rule, operational rule,
extension rule, ADR, Deferred Decision, interface, Event, implementation, infrastructure,
deployment, or technology.

### 1.2 Freeze authority

The Freeze is governed by:

1. Governance Foundation and Accepted ADRs;
2. Genesis v1.1;
3. Core Platform Architecture v1.0 and Documentation Baseline v1.0.1;
4. Business Brain Architecture and Documentation Baseline v1.0;
5. Commerce OS Architecture v1.0;
6. Marketplace Architecture v1.0;
7. AI Expert Network Proposal Baseline v0.1.2;
8. approved AI Expert Network Documentation Waves 1–3; and
9. the AI Expert Network Final Architecture Review verdict `APPROVED FOR FREEZE`.

All inherited frozen milestones remain authoritative for the concepts and owners allocated to
them. This Freeze extends those baselines without modifying or superseding them.

### 1.3 Frozen baseline identity

| Baseline property | Frozen value |
|---|---|
| Architecture | AI Expert Network Architecture v1.0 |
| Documentation | AI Expert Network Documentation Baseline v1.0 |
| Proposal source | Proposal Baseline v0.1.2 |
| Logical Responsibility Domains | 6 |
| architectural Capabilities | 18 |
| canonical AI facts/artifacts | 11 |
| canonical AI write models | 2 |
| aggregate boundaries | 4 |
| logical read models | 9 |
| Proposal risks | 20 |
| Deferred Decisions | 24 |
| Draft ADR subjects | 12 |
| traced Discovery Open Questions | 60 of 60 |
| unresolved blocking findings | 0 |
| non-blocking documentation provenance findings | 1 |

### 1.4 Freeze validation

| Required validation | Result |
|---|---|
| Proposal Baseline v0.1.2 is the frozen architecture source | PASS |
| v0.1.2 precedence excludes superseded v0.1.1 Registry-only meanings | PASS |
| Documentation Waves introduced zero architecture | PASS |
| Final Architecture Review approved Freeze | PASS |
| all inherited frozen milestones remain authoritative | PASS |
| canonical ownership, facts, writers, aggregates, read models, and lifecycles are stable | PASS |
| all Deferred Decisions remain unresolved | PASS |
| all Draft ADR subjects remain Draft | PASS |
| all Proposal risks remain visible | PASS |
| F-AEN-FINAL-01 is recorded without architecture change | PASS |
| future architecture change requires Governance and a successor lifecycle/Freeze | PASS |

## 2. Included Documents

### 2.1 Frozen source manifest

The following twelve milestone artifacts form the traceable source set for this Freeze:

| Sequence | Document | Freeze role | Authority inside Freeze |
|---:|---|---|---|
| 1 | `docs/06-ai-expert-network/00-AI-EXPERT-NETWORK-DISCOVERY.md` | approved Discovery and problem-space provenance | provenance only; does not override Proposal Baseline |
| 2 | `docs/06-ai-expert-network/01-AI-EXPERT-NETWORK-CAPABILITY-MAP.md` | approved logical candidate map | provenance only; does not approve architecture independently |
| 3 | `docs/06-ai-expert-network/02-AI-EXPERT-NETWORK-PROPOSAL.md` | original Architecture Proposal v0.1 | controls every decision not superseded by a Patch |
| 4 | `docs/06-ai-expert-network/03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md` | first Freeze Alignment Patch | compatible clarifications only, subject to v0.1.2 precedence |
| 5 | `docs/06-ai-expert-network/04-AI-EXPERT-NETWORK-RE-REVIEW.md` | historical Re-Review of Proposal Baseline v0.1.1 | audit evidence only; failed verdict is superseded by later correction and approval |
| 6 | `docs/06-ai-expert-network/04A-AI-EXPERT-NETWORK-CONFLICT-ANALYSIS.md` | governance-level root-cause analysis | historical diagnostic evidence for the corrective Patch |
| 7 | `docs/06-ai-expert-network/03A-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.2.md` | corrective Proposal Patch | controlling correction for CR-AEN-01 through CR-AEN-05 |
| 8 | `docs/06-ai-expert-network/04B-AI-EXPERT-NETWORK-RE-REVIEW-v0.1.2.md` | independent merged-baseline Re-Review | current Proposal approval and stability evidence |
| 9 | `docs/06-ai-expert-network/05-AI-EXPERT-NETWORK-WAVE-1.md` | internal documentation navigation and traceability | approved documentation layer; no architecture authority |
| 10 | `docs/06-ai-expert-network/06-AI-EXPERT-NETWORK-WAVE-2.md` | cross-milestone consistency and owner navigation | approved documentation layer; no architecture authority |
| 11 | `docs/06-ai-expert-network/07-AI-EXPERT-NETWORK-WAVE-3.md` | completeness, governance, and freeze preparation | approved documentation layer; no architecture authority |
| 12 | `docs/06-ai-expert-network/08-AI-EXPERT-NETWORK-FINAL-ARCHITECTURE-REVIEW.md` | independent milestone-wide Final Architecture Review | final approval evidence; introduces no architecture |

This Freeze document is the release artifact derived from those twelve sources. It is not counted
as one of its own source documents.

### 2.2 Proposal Baseline v0.1.2 precedence

The frozen Proposal baseline must always be interpreted as:

```text
02-AI-EXPERT-NETWORK-PROPOSAL.md
  +
03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md
  +
03A-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.2.md
  =
AI Expert Network Proposal Baseline v0.1.2
```

For CR-AEN-01 through CR-AEN-05, Patch v0.1.2 supersedes conflicting v0.1.1 statements that
assert or depend on:

- Registry-only ownership of every AI Expert Definition;
- Registry-only ownership of every AI Expert Definition Version;
- a mandatory separate Registry-owned Definition Version behind Marketplace publication;
- allocation of all Definition content and versions to Expert Registry Registration;
- Registry-only normalization of `DADR-AEN-03`; or
- validation claims derived from those statements.

Proposal v0.1 controls every unaffected decision. Compatible v0.1.1 clarifications remain frozen
only where CR-AEN-05 preserves them:

- AEND-01 through AEND-06 are Logical Responsibility Domains inside the frozen AI Coordination
  Domain;
- lifecycle concerns remain independent;
- AEND-06 owns governed evaluation observations only;
- Marketplace AI Expert Asset wording is category-qualified Marketplace terminology, not a new
  canonical type;
- Marketplace retains all frozen Marketplace facts and lifecycle concerns;
- AI Coordinator retains interaction eligibility, selection, coordination, and AI artifacts; and
- Published Marketplace Asset Versions remain immutable.

### 2.3 Documentation provenance note — F-AEN-FINAL-01

No standalone initial Proposal Architecture Review artifact exists in the repository manifest.
Patch v0.1.1 records that PP-AEN-01 through PP-AEN-07 were authorized by that completed review and
enumerates all seven findings. The v0.1.1 Re-Review and Conflict Analysis preserve their effects;
Corrective Patch v0.1.2 restores alignment; Independent Re-Review v0.1.2 and the Final Architecture
Review validate the complete corrected baseline with zero remaining architectural findings.

F-AEN-FINAL-01 is therefore frozen as a non-blocking historical documentation provenance note.
It changes no architecture, owner, register, verdict, or Freeze status. No reconstructed or
backfilled initial Review artifact is authorized by this Freeze.

## 3. Frozen Architectural Scope

### 3.1 Approved scope

AI Expert Network v1.0 freezes:

- specialized Industry, Functional, and Technical Expert participation under one AI Coordinator;
- versioned AI Expert Definitions owned exclusively according to publication path;
- Core-held Definition registration, versioning, eligibility, and coordination metadata;
- exact references to Marketplace-published Definition versions without content duplication;
- interaction-specific authorization, eligibility, selection, bounded execution, and isolation;
- bounded Expert Contributions, multi-Expert collaboration, evidence validation, confidence,
  explainability, conflict visibility, and one unified response;
- AI Action Proposals that remain separate from target execution;
- governed evaluation and feedback observations that never become source truth;
- logical read models, operational observations, audit participation, and optional extensions;
- explicit relationships with Core Platform, Business Brain, Recommendation Engine, Knowledge
  Engine, Capability Registry, Configuration Engine, Marketplace, Commerce OS, and future
  Operating Systems; and
- technology-independent Security, privacy, Audit, operational, reliability, and extension
  boundaries at the approved Proposal level.

### 3.2 Frozen non-scope

AI Expert Network v1.0 does not own or define:

- Core identity, Authentication, Membership, Permission, organization, entitlement, billing,
  Security, Search, Analytics, Notification, or Audit source truth;
- Business DNA, Workspace Intelligence Aggregation, Knowledge, Knowledge Packs, Rules,
  Capability, Business Brain Decision, Recommendation, Configuration Proposal, Implementation
  Option mapping, or Readiness truth;
- Marketplace Publisher, Asset/version, Review, Certification, Trust, Compatibility, Dependency,
  License, Offer, Purchase, Entitlement, Distribution, Installation, Activation, Applicability,
  Governance, Search, Analytics, or operational state;
- Commerce OS or any other OS setup, readiness, configuration, navigation, Permission semantics,
  canonical facts, write models, workflows, reports, lifecycles, or operational effects;
- provider/model truth or a resolved provider service boundary;
- independent customer chat with an Expert, a second AI Coordinator, a second Router, a second
  Registry, or a parallel response authority;
- direct target execution, automatic configuration, direct source mutation, or owner bypass; or
- any subject retained by DD-AEN-01 through DD-AEN-24 or an inherited deferral.

### 3.3 Frozen architectural principles

1. AI is downstream of Knowledge, Rules, current authorization, and completed Business Brain
   Decision where applicable.
2. Business Brain completes canonical Decision independently of AI.
3. Customers interact with Nexoraxs through one AI Coordinator-owned response.
4. AI Experts contribute bounded advisory content; they do not own the final response or external
   canonical facts.
5. Every canonical subject has one owner and one write boundary.
6. Publication path selects the one canonical owner of each AI Expert Definition instance and
   version.
7. Published Marketplace Asset Versions and used Definition versions are immutable; improvement
   creates a successor version.
8. Explicit current tenant, organization, resource, and Permission context is mandatory.
9. Context is minimum, purpose-bound, same-or-narrower, and isolated by contribution.
10. Evidence, provenance, assumptions, limitations, disagreement, uncertainty, and confidence
    remain visible through synthesis.
11. AI Action Proposal is not execution authority; target owner reauthorizes and validates.
12. AI observations never modify Business DNA, Knowledge, Rules, Decision, Recommendation,
    Marketplace Trust, provider truth, customer feedback, Business Outcome, or OS facts.
13. Marketplace state and AI Coordinator eligibility remain independent.
14. Every Operating System remains independently usable without AI Expert Network.
15. Logical responsibility separation does not imply service, runtime, deployment, or ownership
    separation.

### 3.4 Approved Logical Responsibility Domains

The following six areas are frozen as Logical Responsibility Domains inside the existing Core AI
Coordination Domain. They are not bounded contexts, services, deployment units, ownership Domains,
independent aggregates, or runtime authorities.

| ID | Frozen Logical Responsibility Domain | Accountable frozen owner | Frozen responsibility |
|---|---|---|---|
| AEND-01 | Expert Definition and Version | Core AI Coordinator through Expert Registry; Marketplace owns published content according to publication path | maintain Core-held or reference Marketplace-published exact canonical Definition/version for registration and use |
| AEND-02 | Expert Eligibility Context | Core AI Coordinator | evaluate current interaction-specific eligibility under authorization, policy, version, compatibility, Marketplace, source, and operational context |
| AEND-03 | Expert Advisory Contribution | Core AI Coordinator within AI Interaction | contain bounded specialized advisory material for validation and synthesis |
| AEND-04 | Expert Collaboration Participation | Core AI Coordinator through Collaboration Orchestrator | preserve membership, contribution isolation, overlap, disagreement, gaps, and synthesis lineage |
| AEND-05 | Expert Assurance and Explainability | Core AI Coordinator | validate material claims and preserve evidence, uncertainty, confidence, assumptions, alternatives, and limitations |
| AEND-06 | Expert Evaluation and Improvement | Core AI Coordinator under Governance | retain governed evaluation and feedback observations without changing canonical source truth |

**Frozen Logical Responsibility Domain count: 6**

### 3.5 Approved Capabilities

The following eighteen capabilities are frozen as AI Expert Network architectural contribution
Capabilities. They are not canonical platform Capability records and do not transfer Capability
Registry ownership.

| ID | Frozen architectural Capability | Home Domain | Frozen output boundary |
|---|---|---|---|
| AEC-01 | Specialized Business Question Contribution | AEND-03 | specialized understanding; not request interpretation or final response |
| AEC-02 | Recommendation Explanation Contribution | AEND-03 | explanation of authorized context; not canonical Recommendation |
| AEC-03 | Business Insight Contribution | AEND-03 | advisory insight; not Decision content or Analytics truth |
| AEC-04 | Risk Assessment Contribution | AEND-03 | advisory risk and uncertainty; not approval or target decision |
| AEC-05 | Growth Opportunity Contribution | AEND-03 | possible opportunity; not priority, commitment, or execution |
| AEC-06 | Automation Suggestion Contribution | AEND-03 | advisory automation need; not Rule, Automation Pack, Configuration Proposal, or application |
| AEC-07 | Executive Summary Contribution | AEND-03 | summary material; not the unified response |
| AEC-08 | Action Plan Contribution | AEND-03 | advisory sequence; not AI Action Proposal or executable plan by default |
| AEC-09 | Analytics Interpretation Contribution | AEND-03 | interpretation of authorized Analytics; not source, metric, or projection ownership |
| AEC-10 | Workflow Explanation Contribution | AEND-03 | explanation; not workflow definition, instance, or configuration |
| AEC-11 | Configuration Guidance Contribution | AEND-03 | advisory implications; not Configuration Proposal or target configuration |
| AEC-12 | Reporting Guidance Contribution | AEND-03 | reporting advice; not Report, dashboard, or source truth |
| AEC-13 | Integration Advisory Contribution | AEND-03 | advisory considerations; not interface ownership or execution |
| AEC-14 | Security Advisory Contribution | AEND-03 | advisory considerations; not Security policy, Permission, or authorization |
| AEC-15 | Compliance Advisory Contribution | AEND-03 | governed explanation; not legal authority, Rule, or approval |
| AEC-16 | Alternative Option Contribution | AEND-03 | alternatives and tradeoffs; not canonical Implementation Option mapping |
| AEC-17 | Confidence and Evidence Reporting | AEND-05 | contribution evidence/confidence; not source or final-response confidence ownership |
| AEC-18 | Multi-Expert Collaboration Contribution | AEND-04 | isolated participation; not selection, orchestration, conflict resolution, or synthesis |

**Frozen Capability count: 18**

### 3.6 Approved Canonical Facts

| ID | Frozen canonical fact or AI artifact | Sole owner | Frozen aggregate placement |
|---|---|---|---|
| AEN-CF-01 | AI Expert Definition and version | Core AI Coordinator for Core-held content; Marketplace through exact Marketplace Asset Version for Marketplace-published content, selected exclusively per instance | Expert Registry Registration for Core-held content or Marketplace Asset aggregate for Marketplace-published content |
| AEN-CF-02 | Expert Registry registration | Core AI Coordinator | Expert Registry Registration |
| AEN-CF-03 | interaction-specific Expert eligibility evaluation | Core AI Coordinator | AI Interaction |
| AEN-CF-04 | Expert selection and selected-version reference | Core AI Coordinator | AI Interaction |
| AEN-CF-05 | Expert Contribution | Core AI Coordinator | AI Interaction child |
| AEN-CF-06 | contribution assurance finding | Core AI Coordinator | AI Interaction child |
| AEN-CF-07 | Expert collaboration membership and lineage | Core AI Coordinator | AI Interaction child |
| AEN-CF-08 | interaction-specific Expert evaluation observation | Core AI Coordinator | AI Interaction |
| AEN-CF-09 | governed Expert feedback observation | Core AI Coordinator; source feedback remains externally owned | AI Interaction; source remains external |
| AEN-CF-10 | unified AI response and final confidence | Core AI Coordinator | AI Interaction |
| AEN-CF-11 | AI Action Proposal | Core AI Coordinator as proposal owner; target effect remains external | AI Interaction |

The AEN-CF-01 owner is an exclusive publication-path discriminator, not shared ownership.

**Frozen canonical AI fact/artifact count: 11**

### 3.7 Approved Canonical Write Models

| ID | Frozen canonical AI write model | Sole owner | Frozen writes | Frozen exclusion |
|---|---|---|---|---|
| AEN-WM-01 | Expert Registry write model | Core AI Coordinator | Core-held Definition/version, registration, Coordinator metadata, Core-held lifecycle, and exact Marketplace version references | never writes Marketplace-published Definition content or scoped state |
| AEN-WM-02 | AI coordination write model | Core AI Coordinator | AI Interaction, eligibility, selection, Contribution, collaboration, assurance, response, final confidence, AI Action Proposal, and governed observations | never writes source facts or target effects |

Marketplace Asset Version/scoped-state, Decision, Recommendation, Configuration Proposal, target,
and Audit write models remain externally owned.

**Frozen canonical AI write-model count: 2**

### 3.8 Approved Read Models

| ID | Frozen logical read model | Projection owner | Frozen boundary |
|---|---|---|---|
| AEN-RM-01 | Expert Registry View | Core AI Coordinator | authorized Definition/version and registration discovery; not Marketplace source |
| AEN-RM-02 | Expert Eligibility View | Core AI Coordinator | current, time-bound eligibility projection; never Permission or Marketplace truth |
| AEN-RM-03 | Expert Contribution View | Core AI Coordinator | authorized AI Interaction contribution and provenance |
| AEN-RM-04 | Collaboration Lineage View | Core AI Coordinator | selected Experts, contributions, overlap, conflict, and synthesis lineage |
| AEN-RM-05 | Contribution Assurance View | Core AI Coordinator | validation disposition without owning source evidence |
| AEN-RM-06 | Unified AI Response View | Core AI Coordinator | customer-authorized one-response projection; never independent Expert chat |
| AEN-RM-07 | Expert Evaluation View | Core AI Coordinator | quality/feedback observation view; never Knowledge, Marketplace Trust, or target truth |
| AEN-RM-08 | Expert Operations View | Core AI Coordinator | health/capacity/degradation view; not provider or incident source truth |
| AEN-RM-09 | Marketplace AI Expert Availability View | Marketplace | external eligibility context only; Marketplace remains owner |

All read models are permission-filtered, rebuildable, and non-canonical. Projection never becomes
ownership.

**Frozen logical read-model count: 9**

### 3.9 Aggregate boundaries

| Frozen aggregate | Sole owner | Contains | Explicitly excludes |
|---|---|---|---|
| Expert Registry Registration — Core-held path | Core AI Coordinator Expert Registry | registration identity/metadata, canonical Core-held Definition content, immutable Core-held versions, lifecycle, lineage | Marketplace content/state, Knowledge, Capability, provider truth |
| Expert Registry Registration — Marketplace-published path | Core AI Coordinator Expert Registry | registration identity, registration/eligibility/compatibility/coordination metadata, exact Marketplace Asset Version reference | Marketplace-published Definition content/version, Marketplace state, Knowledge, Capability, provider truth |
| Marketplace Asset / Marketplace Asset Version | Marketplace | Marketplace-published AI Expert Definition content/version, representation, declarations, provenance, Marketplace lifecycle facts | AI Interaction eligibility, selection, Contribution, provider invocation, response, AI proposal |
| AI Interaction | Core AI Coordinator | authorization/context references, exact selected versions, eligibility, selection, Contributions, collaboration, validation, assurance, response, AI proposal, observations | canonical source content and target execution |
| Audit Record | Core Audit Service | append-only consequential history | mutable telemetry, unrestricted context, Definition ownership |

The two Expert Registry Registration rows are path-specific content rules for one approved
aggregate type. Therefore the frozen aggregate-boundary count remains four: Expert Registry
Registration, Marketplace Asset / Marketplace Asset Version, AI Interaction, and Audit Record.

**Frozen aggregate-boundary count: 4**

### 3.10 Ownership boundaries

| External subject | Frozen canonical owner | AI Expert Network boundary |
|---|---|---|
| identity, Authentication, Membership, organization, Permission | applicable Core owner | consume current explicit context only |
| Business DNA | Business DNA owner | consume minimum authorized version/reference only |
| Workspace Intelligence Aggregation | Core intelligence projection owner | consume only explicit authorized projection |
| Knowledge and Knowledge Pack content | Knowledge Engine | consume exact applicable versions; never embed or modify competing content |
| Rule and deterministic outcome | applicable Rules owner | consume attributable evidence only |
| Capability | Capability Registry | reference exact canonical identity/version only |
| completed Decision and candidate reasoning | Business Brain | consume minimum completed context only after Decision completion |
| Recommendation and disposition | Recommendation Engine | explain authorized context only; never create/dispose canonical Recommendation |
| Configuration Proposal | Configuration Engine | remain distinct from guidance and AI Action Proposal |
| Marketplace Asset/version and scoped state | Marketplace | consume exact current references for eligibility; never write them |
| Search Index, platform Analytics, Notification state | applicable Core shared owner | use approved shared participation without source ownership |
| target configuration and operational fact | applicable Core or OS owner | may receive separate proposal; independently reauthorizes and writes effect |
| customer feedback and Business Outcome | customer or applicable target owner | retain attributable governed observation only |
| provider/model truth | existing deferred external boundary | retain selected reference and observed provenance only |
| Audit Record | Core Audit Service | submit attributable evidence and retain correlation reference |

### 3.11 Lifecycle boundaries

| Frozen lifecycle concern | Controlling owner/boundary | Frozen separation |
|---|---|---|
| Core-held Definition Lifecycle | Core AI Coordinator Expert Registry | Core-held Definition/version only |
| Marketplace-published Definition and Marketplace lifecycle concerns | Marketplace | exact Marketplace Asset Version and separately frozen Marketplace lifecycles |
| eligibility lifecycle | Core AI Coordinator | interaction-specific current evaluation only |
| AI Interaction lifecycle | Core AI Coordinator | AI Interaction and AI-owned artifacts only |
| provider lifecycle | existing deferred external boundary | observed without becoming Definition, Marketplace, eligibility, or Interaction truth |
| target lifecycle | applicable Core or OS owner | never advanced by Expert contribution, confidence, or proposal alone |

There is no single unified Expert Lifecycle and no aggregate or owner spanning these concerns.

### 3.12 Security boundaries

AI Expert Network v1.0 freezes the following Security guarantees:

- Core retains identity, Authentication, Membership, Permission grants, shared Security policy,
  tenant context, secrets policy, and incident Governance.
- AI Coordinator resolves current explicit authorization before context retrieval or Expert use.
- Each Expert receives minimum purpose-bound, same-or-narrower context.
- Experts, providers, Marketplace Assets, instructions, Contributions, tools, and outputs are
  untrusted boundaries subject to policy and validation.
- Mandatory context that is missing, stale, ambiguous, or unauthorized fails closed.
- Marketplace Purchase, Entitlement, Installation, Activation, Applicability, or discovery never
  grants Permission or starts an AI Interaction.
- Expert eligibility and selection do not grant target write authority.
- AI Action Proposal requires target-owner reauthorization, domain validation, and human approval
  where required.
- No Expert may modify Permission, source truth, Security policy, or consequential target state
  directly.

Detailed Security policy retained by DD-AEN-08, DD-AEN-15 through DD-AEN-18, and inherited Core
deferrals remains unresolved.

### 3.13 Privacy boundaries

AI Expert Network v1.0 freezes:

- explicit tenant, organizational, resource, and purpose scope;
- data minimization and contribution isolation;
- source attribution and minimum disclosure;
- authorization-aware continuity and output filtering;
- no ownership transfer through retrieval, provider use, telemetry, or observation; and
- retention, consent, residency, deletion, export, masking, confidentiality, legal hold, and
  provider data-use detail as unresolved under DD-AEN-17 and inherited Core deferrals.

No privacy deferral is resolved by this Freeze.

### 3.14 Audit boundaries

- Core Audit Service alone owns append-only Audit Record.
- AI Coordinator owns AI evidence, telemetry, lineage, performance, and governed observations.
- Consequential target owners submit attributable action/outcome evidence.
- AI Interaction preserves exact versions, context references, policy outcomes, evidence,
  confidence, and applicable correlation.
- Telemetry, evaluation, explanation, confidence, or source evidence is not itself Audit Record.
- Detailed consequential evidence, access, retention, export, and privacy filtering remain
  deferred under DD-AEN-18 and ADR-038 governance.

### 3.15 Operational boundaries

AI Expert Network v1.0 freezes logical responsibility for:

- current authorization and exact-version resolution;
- interaction eligibility and fail-closed ambiguity;
- bounded Expert/provider execution and contribution isolation;
- visible partial failure, missing expertise, conflict, uncertainty, and degradation;
- re-evaluation after relevant version, Marketplace, policy, authorization, or operational change;
- evidence, lineage, observability, and governed evaluation observations;
- optional, failure-isolated integration with every OS; and
- no source or target mutation during failure, retry, recovery, or feedback.

Provider/model binding, capacity, timeout, retry, cancellation, fallback, recovery, service
objectives, error budgets, incident handling, customer communication, and global-operation policy
remain deferred under DD-AEN-04 and DD-AEN-21 through DD-AEN-24 plus Core D-36 through D-40.

### 3.16 Extension boundaries

Future extensions may participate only within the frozen architecture. They may add approved
Definition versions, specializations, categories/families, governed contribution capabilities, or
optional collaboration through existing owners and change control.

An extension must not:

- create an independent Expert chat surface that bypasses AI Coordinator;
- introduce a second Coordinator, Router, Registry, synthesis owner, or response authority;
- create a parallel Definition, Knowledge, Rule, Decision, Recommendation, Configuration,
  Marketplace, OS, provider, or Audit truth;
- bypass current authorization, eligibility, policy, Marketplace state, evidence, or target-owner
  validation;
- execute an AI Action Proposal directly;
- make an Operating System dependent on Expert availability; or
- silently answer a Deferred Decision.

### 3.17 Cross-milestone authority summary

| Milestone or owner | Frozen authority retained | AI Expert Network relationship |
|---|---|---|
| Governance | canonical terminology, ADR lifecycle, milestone process, change control | remains subordinate to all Accepted Governance authority |
| Genesis v1.1 | platform intent, AI principles, customer control, independent OSs | realizes the approved AI Expert Network problem space without redefining Genesis |
| Core Platform | identity, organization, authorization, AI Coordinator, shared Security, Audit, Search, Analytics, Notifications, Marketplace foundation | consumes and extends no parallel shared service |
| Business Brain | deterministic analysis, candidate reasoning, completed Decision | AI begins only after completed Decision where applicable |
| Commerce OS | all Commerce facts, writes, lifecycles, operations, target validation | optional advisory/proposal relationship; Commerce remains standalone |
| Marketplace | published Asset/version content and every Marketplace lifecycle fact | exact version/state references for eligibility; no Marketplace write |
| Knowledge Engine | Knowledge and Knowledge Pack content, publication, applicability, evolution | exact authorized consumption and governed observation only |
| Recommendation Engine | Recommendation generation, priority, lifecycle, disposition | explanation contribution only |
| Capability Registry | canonical Capability identity, meaning, dependencies, applicability, lifecycle | exact reference only |
| Configuration Engine | Configuration Proposal | AI guidance and AI Action Proposal remain distinct |
| applicable target owner | canonical configuration, operational facts, invariants, lifecycle, outcomes | reauthorizes and owns any effect |

### 3.18 Accepted ADR dependencies

The following Accepted ADRs remain governing dependencies. This Freeze does not duplicate,
modify, reopen, or supersede them.

| Accepted ADR | Frozen dependency |
|---|---|
| ADR-005 | Business DNA remains Business-scoped and software-independent |
| ADR-006 | Workspace intelligence aggregation remains explicit and non-destructive |
| ADR-007 | canonical Capability precedes industry or implementation labels |
| ADR-008 | Module implementation remains separate from Capability meaning |
| ADR-009 | published Knowledge remains shared, versioned, and immutable |
| ADR-010 | Knowledge Packs remain additive, versioned, and immutable |
| ADR-011 | Rules remain deterministic, versioned, explainable, and source-owned |
| ADR-012 | Business Brain owns deterministic Decision formation |
| ADR-013 | Recommendation Engine retains capability-first Recommendation ownership |
| ADR-014 | human control remains mandatory for consequential Recommendation and AI action |
| ADR-017 | Configuration Proposals respect target-domain ownership |
| ADR-024 | Operating Systems retain independent domain ownership |
| ADR-025 | cross-OS integration remains optional and contract-based |
| ADR-027 | Marketplace remains a bounded context within Core |
| ADR-028 | Published Marketplace Asset Versions remain immutable and scoped state remains separate |
| ADR-029 | AI remains downstream of Knowledge, Rules, authorization, and completed Decision |
| ADR-030 | AI Coordinator retains separated orchestration through its frozen Components |
| ADR-031 | AI Experts participate through one coordinated Expert network |
| ADR-032 | AI and platform learning remain governed and cannot rewrite source truth |
| ADR-034 | tenant and resource scope remain explicit |
| ADR-038 | Audit history remains append-only |
| ADR-040 | Core organization identity remains separate from OS operational data |

## 4. Deferred Decisions Preserved

All twenty-four AI Expert Network Deferred Decisions remain unresolved. Their inclusion freezes
their status as deferrals; it does not approve a solution or interim owner.

| ID | Frozen Deferred Decision | Controlling dependency |
|---|---|---|
| DD-AEN-01 | final family taxonomy, Advisor/Director/Expert label normalization, multi-category membership, and future category extension | Capability Registry and Marketplace category Governance |
| DD-AEN-02 | category/family-specific Definition information and exact canonical Capability mapping | Capability Registry |
| DD-AEN-03 | exact provenance and Definition-approval evidence | Core Governance; Marketplace DD-MP-07 through DD-MP-20 |
| DD-AEN-04 | provider/model eligibility, binding, substitution, service boundary, and fallback policy | Core D-36 |
| DD-AEN-05 | exact Definition lifecycle vocabulary, transition authority, support, withdrawal, deprecation, and active-conversation effects | Core D-36/D-38; Marketplace lifecycle deferrals |
| DD-AEN-06 | eligibility criteria language, precedence, refresh, stale-state handling, and explanation | Core D-36/D-38; Marketplace compatibility/adoption deferrals |
| DD-AEN-07 | customer preference policy and permitted routing influence | ADR-031; Core D-36 |
| DD-AEN-08 | minimum input declarations per Capability and exact context-freshness requirements | Core Security/Permission deferrals |
| DD-AEN-09 | permitted Workspace Intelligence Aggregation uses and retained cross-Interaction context | ADR-006; Core D-37 |
| DD-AEN-10 | single-versus-multi-Expert thresholds, decomposition, sequencing, and collaboration limits | Core D-36/D-38 |
| DD-AEN-11 | overlap, conflict, evidence escalation, unresolved disagreement, and false-consensus policy | Core D-38 |
| DD-AEN-12 | evidence-quality rules and Contribution/final confidence calculation and calibration | Core D-38 |
| DD-AEN-13 | Contribution, AI Interaction, conversation, evidence, and lineage retention and inspection | Core D-37; ADR-038 |
| DD-AEN-14 | permitted AI Action Proposal classes and conversion from advisory content after explicit request | ADR-014/017; target-owner Governance |
| DD-AEN-15 | Permission/data-access declarations, service identity, Delegation, administrative, and emergency access | Core Permission deferrals; Marketplace DD-MP-47/49 |
| DD-AEN-16 | adversarial testing, content safety, evidence evaluation, model/Expert release, and re-evaluation criteria | Core D-38; Marketplace assurance deferrals |
| DD-AEN-17 | privacy classification, consent, residency, retention, deletion, export, masking, confidentiality, legal hold, and provider data use | Core D-37/D-39; Marketplace DD-MP-48 |
| DD-AEN-18 | consequential Audit evidence catalog, access, retention, export, and privacy filtering | ADR-038; Marketplace DD-MP-50 |
| DD-AEN-19 | official, partner, third-party, Premium, Marketplace, and commercial participation Governance | Marketplace publisher/commercial/operations deferrals |
| DD-AEN-20 | governed feedback, outcome observation, anonymous learning, Knowledge-change promotion, and re-evaluation workflow | Core D-39; ADR-032 |
| DD-AEN-21 | health, quality, safety, confidence, cost, and value measure definitions and ownership | Core D-38/D-40; Marketplace DD-MP-46/50 |
| DD-AEN-22 | capacity, timeout, retry, cancellation, fallback, recovery, provider limits, degradation, and continuity policy | Core D-36/D-40; Marketplace operations deferrals |
| DD-AEN-23 | support, incident, escalation, service objectives, error budgets, customer communication, and global-operation entry criteria | Core D-40; Marketplace DD-MP-50 |
| DD-AEN-24 | future interface, Event, persistence, physical module, runtime, infrastructure, deployment, framework, vendor, and implementation decisions | Core API/Event/technology/deployment deferrals |

### 4.1 Inherited deferrals

The following inherited registers remain authoritative and unresolved where referenced:

- Core D-36 through D-40;
- Business Brain deferred decision 18;
- Commerce OS DD-32 through DD-37; and
- Marketplace DD-MP-01 through DD-MP-50.

### 4.2 Deferred Decision guarantees

1. Deferral creates no interim owner.
2. Implementation cannot silently answer a Deferred Decision.
3. A reference to an inherited deferral does not resolve or copy it.
4. Business Brain Decision-before-AI sequencing is not deferred.
5. No deferral permits a second writer or direct target execution.
6. Resolution requires applicable Governance, ADR, Architecture Review, compatibility assessment,
   and a successor frozen baseline.

**Deferred Decisions preserved: 24**

## 5. Draft ADRs Preserved

The following twelve subjects remain Draft only. They reserve no Governance number and gain no
Accepted status through this Freeze.

| Draft ID | Preserved Draft ADR subject | Frozen Draft scope |
|---|---|---|
| DADR-AEN-01 | AI Expert Network Logical Domain Map | six areas as internal responsibility Domains of frozen AI Coordination Domain |
| DADR-AEN-02 | AI Expert Network Capability Catalog | eighteen contribution capabilities distinguished from canonical Capability |
| DADR-AEN-03 | AI Expert Definition Publication-Path Ownership | exclusive Core-held versus Marketplace-published owner and Registry reference |
| DADR-AEN-04 | Expert Version and Lifecycle Immutability | separate Definition, Marketplace, provider, eligibility, Interaction, and target lifecycles |
| DADR-AEN-05 | Interaction-Specific Expert Eligibility | mandatory gates, fail-closed ambiguity, Coordinator-only selection |
| DADR-AEN-06 | Expert Contribution as AI Interaction Content | advisory AI Interaction child, not aggregate root or Recommendation |
| DADR-AEN-07 | Coordinator-Hub Multi-Expert Collaboration | isolated Contributions, Coordinator orchestration, conflict visibility, one response |
| DADR-AEN-08 | Expert Evidence, Confidence, and Explainability | contribution assurance separated from source ownership and final confidence |
| DADR-AEN-09 | AI Expert Security, Privacy, and Isolation | minimum context, tenant/resource scope, provider boundary, no durable authority |
| DADR-AEN-10 | Marketplace AI Expert Dual Boundary | Marketplace Asset/version/scoped state separated from Coordinator eligibility/artifacts |
| DADR-AEN-11 | Governed Expert Evaluation and Improvement | observations and approved promotion paths only |
| DADR-AEN-12 | Expert Operational Resilience Boundary | OS independence, failure isolation, reauthorization, provider/model replaceability |

### 5.1 Draft ADR guarantees

- All twelve identifiers retain Draft status.
- `DADR-AEN-03` retains its original publication-path wording.
- No Draft subject overrides an Accepted ADR or frozen architecture.
- Architecture Review may later reject, replace, merge, or accept a subject only through the
  Governance ADR lifecycle.
- This Freeze neither accepts nor rejects any Draft ADR.

**Draft ADRs preserved: 12**

## 6. Risks Preserved

### 6.1 Approved architectural risk register

All twenty Proposal risks remain frozen as known, non-blocking architectural risks. Their controls
are preserved; detailed control policy remains subject to the named deferrals and future
implementation Governance.

| ID | Preserved risk | Frozen control or deferral |
|---|---|---|
| R-AEN-01 | Logical Domains are implemented as a second AI coordination plane. | explicit containment inside frozen AI Coordination Domain |
| R-AEN-02 | Core and Marketplace both write published Expert content. | exclusive publication-path ownership and exact reference |
| R-AEN-03 | Expert Contribution is treated as Recommendation. | canonical advisory term and Recommendation boundary |
| R-AEN-04 | Expert participates in Decision formation. | completed-Decision-before-AI invariant |
| R-AEN-05 | Marketplace Activation is treated as eligibility or Permission. | independent Coordinator eligibility gates |
| R-AEN-06 | `Improved` mutates a used or Published version. | successor-version-only rule |
| R-AEN-07 | provider/model becomes Expert identity. | separate version dimensions |
| R-AEN-08 | broad or cross-Business context reaches Experts. | explicit authorization and minimum context |
| R-AEN-09 | multi-Expert synthesis hides disagreement. | provenance, conflict, uncertainty, and confidence preservation |
| R-AEN-10 | Contribution becomes a command or target write. | separate AI Action Proposal and target-owner reauthorization |
| R-AEN-11 | AI learning rewrites canonical sources. | governed observation and promotion-only boundary |
| R-AEN-12 | category/family labels overlap canonical Capabilities. | architectural Capability distinction and Registry references |
| R-AEN-13 | Marketplace Trust substitutes for AI safety or quality evaluation. | separate Marketplace and Coordinator assurance concerns |
| R-AEN-14 | source evidence is stale or misattributed. | exact versions, freshness evaluation, fail-closed ambiguity |
| R-AEN-15 | conversation continuity preserves expired access. | current reauthorization and scoped continuity |
| R-AEN-16 | partial failure silently produces complete-looking advice. | explicit degradation, missing expertise, and verification guidance |
| R-AEN-17 | telemetry or Audit evidence becomes business truth. | projection/evidence separation |
| R-AEN-18 | third-party participation begins before policy approval. | retained partner and Marketplace deferrals |
| R-AEN-19 | operational deferrals are treated as implementation details. | Governance gates before affected implementation |
| R-AEN-20 | an Operating System becomes dependent on Expert availability. | optional, failure-isolated integration invariant |

**Approved architectural risks preserved: 20**

### 6.2 Documentation maintenance risks

The following six low-severity documentation risks from the Final Architecture Review remain
visible for long-term maintenance:

1. a reader applies one Proposal/Patch artifact without merged-baseline precedence;
2. lifecycle-time status metadata is read without the current role map;
3. inherited definitions are copied and drift from canonical sources;
4. identifier range summaries are mistaken for architectural decisions or status;
5. an upstream source changes while its link continues to resolve; and
6. freeze preparation or this Freeze is confused with post-Freeze readiness completion.

Documentation Waves 1–3, this manifest, and future change control mitigate these risks. They do
not alter the architecture risk register.

### 6.3 Provenance finding preservation

F-AEN-FINAL-01 remains a documentation provenance note, not an architectural risk or blocking
finding. It is recorded in section 2.3 and must remain visible in future updated Freeze artifacts
unless an authorized governance artifact supersedes its treatment.

## 7. Future Change Control

### 7.1 Frozen change-control rule

AI Expert Network Architecture v1.0 may not be changed by implementation, documentation cleanup,
a Documentation Wave, a Draft ADR, configuration, provider choice, Marketplace publication, or a
downstream milestone.

Any future architectural change requires:

1. explicit classification of the proposed change against this Freeze;
2. an ADR where the change creates, supersedes, or materially alters an architectural decision;
3. entry into the approved milestone lifecycle with named governing baselines;
4. an updated Proposal or other authorized architecture-change artifact;
5. independent Architecture Review;
6. compatibility and migration assessment for existing frozen consumers;
7. preservation or explicit governance of affected Deferred Decisions, risks, and Draft ADRs;
8. an updated successor Freeze; and
9. readiness validation before the changed baseline becomes complete.

### 7.2 Documentation-only alignment

A documentation-only correction may use the approved Patch process only when it:

- changes no architecture or ownership;
- changes no Domain, Capability, fact, write model, aggregate, read model, lifecycle, Security,
  privacy, Audit, operational, extension, or compatibility meaning;
- resolves no Deferred Decision;
- changes no Accepted or Draft ADR status;
- is fully backward compatible; and
- is independently validated against this Freeze.

If a correction changes meaning, it is architectural and cannot be classified as Freeze
Alignment.

### 7.3 Compatibility guarantees

Future evolution must preserve compatibility with these frozen guarantees unless explicitly
superseded through the full change-control path:

- one AI Coordinator and one unified response;
- Business Brain Decision completed before AI;
- publication-path Definition/version ownership;
- no duplicated Marketplace content in Expert Registry;
- one owner for every fact, writer, aggregate, and lifecycle concern;
- AEND areas contained within AI Coordination Domain;
- AEC contributions distinct from canonical Capability;
- AI artifacts distinct from Decision, Recommendation, Configuration Proposal, source truth,
  target effect, and Audit Record;
- current explicit authorization and minimum context;
- independent Marketplace and AI eligibility/state boundaries;
- immutable used and Published versions;
- independent Operating Systems and optional AI integration;
- governed observation-only learning; and
- retained evidence, provenance, confidence, limitations, and human control.

### 7.4 Allowed evolution without architecture change

Subject to approved policy, existing owners may add new owner-controlled versions, Definitions,
Marketplace publications, observations, or implementation conforming to this Freeze. Such work
must not silently resolve a Deferred Decision, create a new architectural owner or concept,
weaken compatibility, or introduce a parallel truth.

### 7.5 Prohibited post-Freeze changes without successor architecture

The following cannot change without the full change-control process:

- publication-path ownership;
- the six Logical Responsibility Domains or their containment;
- the eighteen Capability identities, home Domains, or output boundaries;
- the eleven canonical fact/artifact meanings or owners;
- the two canonical AI write models;
- the four aggregate boundaries;
- the nine logical read models or their projection ownership;
- lifecycle separation;
- AI Coordinator and external owner boundaries;
- Security, privacy, Audit, operational, and extension guarantees;
- Accepted ADR dependencies;
- Deferred Decision or Draft ADR status; or
- the independent-OS and target-owner guarantees.

## 8. Recommendation

Proposal Baseline v0.1.2 is frozen. Documentation Waves 1–3 introduced zero architecture. The
Final Architecture Review approved Freeze. Every inherited frozen milestone remains authoritative,
and all future architectural evolution is subject to Governance, ADR discipline, the milestone
lifecycle, independent review, compatibility assessment, and an updated Freeze.

# AI EXPERT NETWORK v1.0 FROZEN

## References

### AI Expert Network frozen source artifacts

- [AI Expert Network Discovery v0.1](../06-ai-expert-network/00-AI-EXPERT-NETWORK-DISCOVERY.md)
- [AI Expert Network Capability Map v0.1](../06-ai-expert-network/01-AI-EXPERT-NETWORK-CAPABILITY-MAP.md)
- [AI Expert Network Proposal v0.1](../06-ai-expert-network/02-AI-EXPERT-NETWORK-PROPOSAL.md)
- [AI Expert Network Proposal Patch v0.1.1](../06-ai-expert-network/03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md)
- [AI Expert Network Re-Review for Baseline v0.1.1](../06-ai-expert-network/04-AI-EXPERT-NETWORK-RE-REVIEW.md)
- [AI Expert Network Conflict Analysis](../06-ai-expert-network/04A-AI-EXPERT-NETWORK-CONFLICT-ANALYSIS.md)
- [AI Expert Network Corrective Proposal Patch v0.1.2](../06-ai-expert-network/03A-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.2.md)
- [AI Expert Network Independent Re-Review v0.1.2](../06-ai-expert-network/04B-AI-EXPERT-NETWORK-RE-REVIEW-v0.1.2.md)
- [AI Expert Network Documentation Wave 1](../06-ai-expert-network/05-AI-EXPERT-NETWORK-WAVE-1.md)
- [AI Expert Network Documentation Wave 2](../06-ai-expert-network/06-AI-EXPERT-NETWORK-WAVE-2.md)
- [AI Expert Network Documentation Wave 3](../06-ai-expert-network/07-AI-EXPERT-NETWORK-WAVE-3.md)
- [AI Expert Network Final Architecture Review](../06-ai-expert-network/08-AI-EXPERT-NETWORK-FINAL-ARCHITECTURE-REVIEW.md)

### Governance and Genesis

- [Governance ADR Repository](../00-governance/ADR/README.md)
- [Governance Milestone Lifecycle](../00-governance/MILESTONE-LIFECYCLE.md)
- [Governance Glossary](../00-governance/glossary/GLOSSARY.md)
- [Genesis Constitution](../01-genesis/02-CONSTITUTION.md)
- [Genesis Business DNA](../01-genesis/03-BUSINESS-DNA.md)
- [Genesis Capabilities](../01-genesis/04-CAPABILITIES.md)
- [Genesis Knowledge Engine](../01-genesis/05-KNOWLEDGE-ENGINE.md)
- [Genesis Business Brain](../01-genesis/06-BUSINESS-BRAIN.md)
- [Genesis Recommendation Engine](../01-genesis/07-RECOMMENDATION-ENGINE.md)
- [Genesis AI Strategy](../01-genesis/08-AI-STRATEGY.md)
- [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md)
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
- [Marketplace Freeze v1.0](MARKETPLACE-v1.0-FREEZE.md)
- [Marketplace Readiness](MARKETPLACE-READINESS.md)

### Accepted ADR dependencies

- [ADR-005 — Business DNA Business-Scoped and Software-Independent](../00-governance/ADR/ADR-005-business-dna-business-scoped-software-independent.md)
- [ADR-006 — Workspace Intelligence Explicit Aggregation](../00-governance/ADR/ADR-006-workspace-intelligence-explicit-aggregation.md)
- [ADR-007 — Capabilities Before Industries](../00-governance/ADR/ADR-007-capabilities-before-industries.md)
- [ADR-008 — Modules Implement Capabilities](../00-governance/ADR/ADR-008-modules-implement-capabilities.md)
- [ADR-009 — Shared Versioned Immutable Knowledge](../00-governance/ADR/ADR-009-shared-versioned-immutable-knowledge.md)
- [ADR-010 — Knowledge Packs Additive and Immutable](../00-governance/ADR/ADR-010-knowledge-packs-additive-immutable.md)
- [ADR-011 — Deterministic Versioned Explainable Rules](../00-governance/ADR/ADR-011-deterministic-versioned-explainable-rules.md)
- [ADR-012 — Business Brain Decision Engine](../00-governance/ADR/ADR-012-business-brain-decision-engine.md)
- [ADR-013 — Capability-First Explainable Recommendations](../00-governance/ADR/ADR-013-capability-first-explainable-recommendations.md)
- [ADR-014 — Human Control over Recommendations and AI](../00-governance/ADR/ADR-014-human-control-over-recommendations-and-ai.md)
- [ADR-017 — Configuration Proposals Respect Domain Ownership](../00-governance/ADR/ADR-017-configuration-proposals-respect-domain-ownership.md)
- [ADR-024 — Independent Operating System Domain Ownership](../00-governance/ADR/ADR-024-independent-operating-system-domain-ownership.md)
- [ADR-025 — Contract-Based Optional OS Integration](../00-governance/ADR/ADR-025-contract-based-optional-os-integration.md)
- [ADR-027 — Marketplace Bounded Context Within Core](../00-governance/ADR/ADR-027-marketplace-bounded-context-within-core.md)
- [ADR-028 — Immutable Marketplace Assets and Scoped State](../00-governance/ADR/ADR-028-immutable-marketplace-assets-scoped-state.md)
- [ADR-029 — AI Downstream of Knowledge, Rules, and Authorization](../00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md)
- [ADR-030 — AI Coordinator Separated Orchestration](../00-governance/ADR/ADR-030-ai-coordinator-separated-orchestration.md)
- [ADR-031 — Coordinated AI Expert Network](../00-governance/ADR/ADR-031-coordinated-ai-expert-network.md)
- [ADR-032 — Governed AI and Platform Learning](../00-governance/ADR/ADR-032-governed-ai-and-platform-learning.md)
- [ADR-034 — Explicit Tenant and Resource Scope](../00-governance/ADR/ADR-034-explicit-tenant-and-resource-scope.md)
- [ADR-038 — Append-Only Audit History](../00-governance/ADR/ADR-038-append-only-audit-history.md)
- [ADR-040 — Core Organization Identity and OS Operational Data](../00-governance/ADR/ADR-040-core-organization-identity-os-operational-data.md)
