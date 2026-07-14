# AI Expert Network Documentation Wave 2

**Milestone:** AI Expert Network  
**Artifact type:** Cross-Milestone Documentation Consistency Layer  
**Status:** Proposed for review  
**Architecture baseline:** AI Expert Network Proposal Baseline v0.1.2  
**Documentation dependency:** Approved AI Expert Network Documentation Wave 1  
**Architecture authority added by this document:** None  
**Architectural changes introduced:** Zero

---

## 1. Purpose

AI Expert Network Documentation Wave 2 strengthens cross-milestone consistency, canonical-term
navigation, authority references, accepted-ADR references, Deferred Decision references, and
documentation maintainability across Nexoraxs.

This Wave is a documentation-only reference layer. It does not replace, supplement, reinterpret,
or amend Proposal Baseline v0.1.2 or any frozen milestone. If this Wave differs from a controlling
source, that source controls and the difference must be reported as a documentation issue rather
than silently resolved here.

## 2. Scope and Constraints

Wave 2 provides:

- a platform-wide authority and reading matrix;
- a canonical-definition source index;
- an external-owner-to-frozen-authority matrix;
- Governance, Genesis, Core Platform, Business Brain, Commerce OS, and Marketplace consistency
  navigation;
- Accepted ADR and inherited Deferred Decision navigation;
- canonical terminology and baseline-version consistency checks;
- cross-milestone interaction and no-ownership-transfer navigation;
- duplicate-definition controls; and
- reader and maintainer guidance.

Wave 2 changes no architecture, owner, Domain, Capability, canonical fact, write model, aggregate,
read model, lifecycle, Proposal decision, Patch decision, frozen guarantee, ADR, or Deferred
Decision. It introduces no implementation, API, Contract, Event, database, infrastructure,
runtime, deployment, framework, vendor, or technology.

## 3. Controlling Architecture and Documentation Order

### 3.1 Platform authority matrix

| Authority layer | Controlling role | AI Expert Network dependency | Ownership effect |
|---|---|---|---|
| Governance | canonical terminology, ADR status, milestone process, change control | constrains every AI Expert Network artifact | none; Governance does not become a domain writer |
| Genesis v1.1 | platform vision, constitutional principles, business-first intelligence, AI and ecosystem intent | defines why and within what principles the Network exists | none; Genesis intent does not transfer domain ownership |
| Core Platform Architecture v1.0 and Documentation Baseline v1.0.1 | shared identity, authorization, organization, AI Coordinator, intelligence, Marketplace, Audit, Search, Analytics, Security | supplies shared owners and frozen AI coordination boundary | Core owners remain canonical for Core facts |
| Business Brain Architecture v1.0 | deterministic analysis, candidate reasoning, completed Decision | supplies completed authorized Decision context only after Decision completion | Business Brain retains Decision ownership |
| Commerce OS Architecture v1.0 | Commerce Core, Commerce facts, target validation, operational lifecycle | may supply authorized projections or receive a separate proposal | Commerce OS retains every Commerce fact and effect |
| Marketplace Architecture v1.0 | Marketplace Asset/version, Publisher, assurance, commercial, Distribution, and scoped adoption state | supplies published Expert content/version and current Marketplace context | Marketplace retains every Marketplace fact and lifecycle |
| AI Expert Network Proposal Baseline v0.1.2 | approved AI Expert Network architecture | controls Documentation Waves | no upstream owner is displaced |
| AI Expert Network Re-Review v0.1.2 | validates baseline stability and approval | authorizes Documentation Waves | adds no architecture |
| AI Expert Network Wave 1 | milestone-local navigation, naming, and traceability | documentation dependency for this Wave | adds no architecture |
| AI Expert Network Wave 2 | platform-wide consistency and navigation | documentation-only overlay | adds no architecture |

### 3.2 AI Expert Network baseline reading rule

```text
AI Expert Network Proposal v0.1
  + Proposal Patch v0.1.1
  + Corrective Proposal Patch v0.1.2
  = Proposal Baseline v0.1.2
```

Corrective Patch v0.1.2 supersedes conflicting v0.1.1 Registry-only Definition ownership,
Registry-only version ownership, mandatory paired Registry version, aggregate allocation, and
dependent Draft ADR or validation wording. Compatible v0.1.1 clarifications remain preserved as
specified by CR-AEN-05. Independent Re-Review v0.1.2 is the current approval record.

### 3.3 Documentation dependency matrix

| Order | Artifact | Documentation role | Depends on | May change architecture? |
|---:|---|---|---|---|
| 1 | `00-AI-EXPERT-NETWORK-DISCOVERY.md` | approved problem-space record | frozen authorities | No |
| 2 | `01-AI-EXPERT-NETWORK-CAPABILITY-MAP.md` | approved candidate logical interaction map | Discovery | No |
| 3 | `02-AI-EXPERT-NETWORK-PROPOSAL.md` | original milestone architecture proposal | Discovery and Capability Map | Proposal stage only |
| 4 | `03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md` | historical first clarification layer | Proposal and initial review findings | No redesign; partly superseded |
| 5 | `04-AI-EXPERT-NETWORK-RE-REVIEW.md` | historical v0.1.1 failed quality gate | Proposal plus v0.1.1 Patch | No |
| 6 | `04A-AI-EXPERT-NETWORK-CONFLICT-ANALYSIS.md` | governance-level root-cause classification | frozen authorities and v0.1.1 baseline | No |
| 7 | `03A-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.2.md` | controlling corrective alignment | Proposal, v0.1.1 Patch, Conflict Analysis | No redesign; restores approved architecture |
| 8 | `04B-AI-EXPERT-NETWORK-RE-REVIEW-v0.1.2.md` | approval of merged Proposal Baseline v0.1.2 | all three baseline documents | No |
| 9 | `05-AI-EXPERT-NETWORK-WAVE-1.md` | internal navigation, terminology, and traceability | approved merged baseline | No |
| 10 | `06-AI-EXPERT-NETWORK-WAVE-2.md` | cross-milestone consistency and navigation | approved merged baseline and Wave 1 | No |

## 4. Cross-Milestone Reading Matrix

| Reader question | AI Expert Network source | External authority to read | Consistent interpretation |
|---|---|---|---|
| Who owns AI coordination and AI artifacts? | Proposal sections 16, 24–29 | Core Architecture; ADR-030 and ADR-031; Core Freeze | Core AI Coordinator owns interaction-specific coordination and AI artifacts |
| Who owns an AI Expert Definition? | Proposal sections 9–11; Corrective Patch sections 3–6 | Governance Glossary; Core Domain Model and Data Ownership; Core Freeze | Core or Marketplace according to mutually exclusive publication path |
| Who owns a Marketplace-published Definition version? | Corrective Patch sections 3–5 | Marketplace Freeze; ADR-028 | Marketplace through the exact Marketplace Asset Version |
| Who owns registration and eligibility metadata for a Marketplace-published Expert? | Proposal sections 9, 13, 16; Corrective Patch sections 3–5 | Core AI Coordinator architecture | Expert Registry owns Coordinator metadata and exact reference, not Marketplace content |
| Who owns Business understanding and Decision? | Proposal section 18 | Genesis Business Brain; Business Brain Freeze; ADR-012 and ADR-029 | Business Brain completes the deterministic Decision before AI consumes it |
| Who owns Recommendation? | Proposal section 19 | Genesis Recommendation Engine; Core Data Ownership; ADR-013 | Recommendation Engine owns Recommendation and disposition |
| Who owns Knowledge and Knowledge Pack content? | Proposal section 20 | Genesis Knowledge Engine and Knowledge Packs; ADR-009 and ADR-010 | Knowledge Engine owns canonical content and published versions |
| Who owns Capability? | Proposal sections 7, 10, and 24 | Genesis Capabilities; Core Domain Model; ADR-007 | Capability Registry owns canonical Capability; AEC entries are milestone architectural capabilities |
| Who owns Configuration Proposal and target application? | Proposal section 21 | Core Data Ownership; ADR-017; applicable OS Freeze | Configuration Engine owns Configuration Proposal; target owner authorizes and writes effects |
| Who owns Marketplace lifecycle state? | Proposal section 17 | Marketplace Freeze; ADR-027 and ADR-028 | Marketplace owns its shared and scoped lifecycle facts; Activation grants no Permission |
| Who owns Commerce facts? | Proposal section 23 | Commerce OS Freeze; ADR-024 and ADR-025 | Commerce OS owns all Commerce canonical facts, validation, and effects |
| Who owns identity, Permission, and authorization context? | Proposal sections 13, 22, and 30 | Core Permission Model; ADR-034; Core Freeze | applicable Core owner supplies and evaluates canonical context; AI only consumes current authorized scope |
| Who owns Audit Record? | Proposal section 32 | Core Data Ownership; ADR-038 | Core Audit Service owns append-only Audit Record; AI supplies evidence |
| Who owns provider/model truth? | Proposal sections 11, 24.2, and 36 | Core D-36; DD-AEN-04 | external ownership and service boundary remain deferred; AI records selected reference and observed provenance only |
| May an Operating System depend on AI Experts? | Proposal sections 23, 33–35 | Genesis OS lifecycle; Commerce Freeze; ADR-024 and ADR-025 | no; AI integration remains optional and failure-isolated |

## 5. Canonical Definition Source Index

This index identifies where a term is canonically defined or frozen. Its concise descriptions are
navigation labels, not replacement definitions.

| Canonical concept | Primary definition or freeze source | AI Expert Network usage | Duplicate-definition control |
|---|---|---|---|
| Workspace, Business, Business Unit, Department, Branch | Genesis Ontology and organization hierarchy; Core Domain Model and Freeze | explicit authorized context references only | do not redefine organization identity or hierarchy |
| User, Membership, Permission, Authorization Context | Core Permission Model and Security Model; Core Freeze | bounds every retrieval, Expert, tool, and target action | eligibility or Marketplace state never substitutes for authorization |
| Business DNA | Genesis Business DNA; Core Domain Model/Data Ownership | minimum authorized Business-scoped input | do not copy, modify, or reinterpret canonical facts |
| Workspace Intelligence Aggregation | Core Domain Model/Data Ownership | explicit authorized projection when required | never merge Business DNA ownership |
| Knowledge and Knowledge Object | Genesis Knowledge Engine; Core Domain Model/Data Ownership | exact applicable versioned input | Expert output cannot become Knowledge directly |
| Knowledge Pack | Genesis Knowledge Packs; Core and Marketplace freezes | applicable Knowledge dependency and Marketplace distribution reference | separate Knowledge content from Marketplace representation/state |
| Rule | Genesis/Core Rules authority; ADR-011 | deterministic evidence by reference | AI cannot invent or rewrite business Rules |
| Capability | Genesis Capabilities; Core Capability Registry | canonical identifier/version reference | AEC architectural capability is not a Capability record |
| Decision | Genesis Business Brain; Business Brain Freeze | completed authorized input after deterministic formation | Expert never contributes to canonical Decision formation |
| Recommendation | Genesis Recommendation Engine; Core Data Ownership | authorized explanation context only | Expert Contribution is never a Recommendation |
| Configuration Proposal | Core Data Ownership; ADR-017 | separately authorized external proposal path | AI Action Proposal and guidance remain distinct |
| Marketplace Asset and Marketplace Asset Version | Marketplace Freeze; ADR-027 and ADR-028 | exact published Expert content/version and Marketplace context | Registry must not duplicate Marketplace content |
| Marketplace Activation and Applicability | Marketplace Freeze | current external eligibility context | neither is Permission, Expert eligibility, or Interaction start |
| AI Coordinator | Governance Glossary; Core Architecture and Freeze | sole coordination plane | no Network-specific second orchestrator, router, or response owner |
| AI Interaction | Governance Glossary; Core Domain Model/Data Ownership | canonical scope for contributions, selection, evidence, response, and AI proposal | read models remain projections of canonical Interaction state |
| AI Action Proposal | Governance Glossary; Core Domain Model/Data Ownership | proposal-only AI output | target service reauthorizes and owns any effect |
| AI Expert | Governance Glossary; Genesis AI Expert Network | specialized participant selected by AI Coordinator | separate from provider/model identity |
| AI Expert Definition and version | Core Domain Model/Data Ownership plus Proposal Baseline v0.1.2 | publication-path-owned versioned definition | do not impose Registry-only or dual canonical ownership |
| Expert Contribution | Proposal Baseline v0.1.2 | bounded AI Interaction child content | not Recommendation, Decision, response, proposal, or target command |
| Commerce operational fact | Commerce OS Freeze | authorized projection input or external proposal target only | AI never creates parallel Commerce truth |
| Audit Record | Core Data Ownership and ADR-038 | correlation reference after attributable evidence submission | telemetry or evaluation is not Audit Record |

## 6. External Owner Authority Matrix

| External subject or responsibility | Correct canonical owner | Frozen or accepted authority | AI Expert Network may | AI Expert Network never owns |
|---|---|---|---|---|
| identity and Authentication | Core Identity and Access | Core Freeze; Core Security Model | retain current principal/context reference | User identity or Authentication state |
| Membership, role, Permission grant | Core Identity and Access or applicable owning resource domain | Core Permission Model; ADR-034 | consume evaluated outcome and required scope | Permission definition, assignment, or domain authorization decision |
| organization identity and hierarchy | applicable Core organization owner | Genesis; Core Domain Model and Freeze | retain exact scoped identifiers | Workspace, Business, Business Unit, Department, or Branch truth |
| Business DNA | Core Business DNA Registry / Business DNA owner | Genesis Business DNA; Core Data Ownership | consume authorized version and provenance | Business DNA identity, facts, snapshots, or publication |
| Workspace Intelligence Aggregation | Core intelligence projection owner | Core Data Ownership; ADR-006 | consume explicit authorized projection | underlying Business DNA or aggregation policy |
| Capability | Core Capability Registry | Genesis Capabilities; Core Data Ownership; ADR-007 | reference identifier, version, and permitted metadata | Capability identity, meaning, dependencies, applicability, or lifecycle |
| Knowledge and Knowledge Pack content | Knowledge Engine | Genesis Knowledge Engine/Knowledge Packs; ADR-009/010 | consume exact applicable authorized versions | Knowledge content, publication, applicability interpretation, or evolution |
| Rule and deterministic outcome | applicable Rules owner | Genesis/Core Rules authority; ADR-011 | consume attributable deterministic evidence | Rule definition, execution truth, or business policy |
| Decision and candidate reasoning | Business Brain | Business Brain Freeze; ADR-012/029 | consume minimum completed Decision context | Decision formation, amendment, completion, or history |
| Recommendation and disposition | Recommendation Engine | Genesis Recommendation Engine; Core Data Ownership; ADR-013 | explain authorized Recommendation context | Recommendation generation, identity, priority, disposition, or feedback lifecycle |
| Configuration Proposal | Configuration Engine | Core Data Ownership; ADR-017 | reference a separately authorized proposal | Configuration Proposal content, lifecycle, or target application |
| Marketplace Asset/version and Marketplace lifecycle facts | Marketplace | Marketplace Freeze; ADR-027/028 | consume exact authorized current references | Marketplace canonical content or state |
| Marketplace Trust Profile and assurance context | Marketplace projection/assurance owner | Marketplace Freeze | consume attributable non-authoritative context | Marketplace Trust, Review, Certification, or publication decision |
| target configuration and operational facts | applicable Core or Operating System owner | ADR-017/024/025; applicable Freeze | issue or reference a separately governed proposal | target write, lifecycle transition, readiness, or operational record |
| Search Index and shared Search behavior | Core Search | Core Freeze | supply permitted AI or source references where approved | Search Index or query policy |
| platform Analytics projections | Core Analytics | Core Freeze | consume authorized projections and submit governed observations | source facts, metric truth, or platform Analytics ownership |
| Notification state | Core Notification Service | Core Freeze | submit an approved notification intent where applicable | platform Notification state |
| Audit Record | Core Audit Service | Core Data Ownership; ADR-038 | submit attributable evidence and retain correlation reference | append-only Audit Record |
| customer feedback source and Business Outcome | customer or applicable target owner | Proposal owner matrix; ADR-032 boundary | retain governed attributable observation | source feedback or Business Outcome truth |
| provider/model availability and provenance | external boundary remains deferred | Core D-36; DD-AEN-04 | retain selected reference and observed provenance | provider truth or a completed deferred service boundary |

Every row preserves one canonical owner or one explicitly deferred external boundary. Consumption,
projection, evidence, explanation, confidence, or observation never transfers ownership.

## 7. Governance and Accepted ADR Consistency

### 7.1 Governance reference matrix

| Governance source | Subject used by AI Expert Network | Consistency result |
|---|---|---|
| Governance Glossary | AI Coordinator, AI Expert, AI Expert Network, AI Interaction, AI Action Proposal, Expert Registry, and external canonical terms | PASS — Wave 1 naming rules and Proposal v0.1.2 align |
| ADR Repository README | ADR statuses, numbering, review, and acceptance | PASS — all DADR-AEN subjects remain Draft and reserve no number |
| Milestone Lifecycle | Proposal, review, correction, Re-Review, Documentation Waves, Freeze, readiness | PASS — this Wave follows the approved documentation phase |
| Accepted ADRs | inherited decisions and constraints | PASS — referenced as authority, never rewritten as milestone-local decisions |

### 7.2 Accepted ADR dependency navigation

| Concern | Accepted ADR dependency | Consistent AI Expert Network expression |
|---|---|---|
| Business-scoped intelligence and aggregation | ADR-005 and ADR-006 | Business DNA stays Business-scoped; aggregation is explicit and non-destructive |
| Capability and module separation | ADR-007 and ADR-008 | AEC capabilities do not redefine canonical Capability or Module |
| immutable Knowledge and Knowledge Packs | ADR-009 and ADR-010 | Experts consume exact versions and never modify Knowledge directly |
| deterministic Rules | ADR-011 | AI consumes governed Rule evidence and cannot invent business Rules |
| Business Brain Decision | ADR-012 and ADR-029 | Decision completes independently before AI consumes it |
| Recommendation ownership | ADR-013 | Expert explanation never becomes canonical Recommendation |
| human control | ADR-014 | AI outputs remain advisory or proposal-only; consequential target action is reauthorized |
| Configuration Proposal ownership | ADR-017 | Configuration Engine and target owner retain proposal/application boundaries |
| OS independence and optional integration | ADR-024 and ADR-025 | every OS remains usable without AI Expert Network |
| Marketplace boundary and immutable scoped state | ADR-027 and ADR-028 | Marketplace owns published versions and scoped state; AI Coordinator owns eligibility/artifacts |
| AI downstream boundary | ADR-029 | Knowledge, Rules, Authorization, and completed Decision precede AI participation |
| separated AI orchestration | ADR-030 | fifteen frozen AI Coordinator Components remain one coordination plane |
| coordinated AI Expert Network | ADR-031 | customers receive one Coordinator-owned response, not independent Expert chats |
| governed learning | ADR-032 | observations cannot rewrite canonical sources |
| explicit tenant and resource scope | ADR-034 | every Expert operates under current minimum authorized context |
| append-only Audit history | ADR-038 | AI submits attributable evidence; Core Audit Service owns Audit Record |
| Core versus OS data ownership | ADR-040 | AI references organization identity and preserves OS operational ownership |

Wave 2 creates, accepts, rejects, renumbers, reopens, or changes no ADR.

## 8. Genesis Consistency

| Genesis source | Inherited principle or concept | AI Expert Network baseline expression | Result |
|---|---|---|---|
| Vision and Constitution | Business Before Software, explainability, human control, independent Operating Systems | AI is advisory, governed, and optional | PASS |
| Business DNA | Business-scoped understanding and explicit Workspace aggregation | minimum authorized Business DNA and explicit aggregation references | PASS |
| Capabilities | canonical Capability precedes implementation | Expert Definitions reference Capability Registry; AEC labels remain architectural contributions | PASS |
| Knowledge Engine | shared governed Knowledge with evidence and versioning | Experts consume version-attributed Knowledge and cannot publish changes directly | PASS |
| Business Brain | deterministic business analysis and Decision ownership | completed Decision precedes every AI contribution | PASS |
| Recommendation Engine | capability-first explainable Recommendation lifecycle | Experts may explain but never create or dispose Recommendations | PASS |
| AI Strategy | AI assists under authorization, provenance, human approval, and owner-controlled effects | AI Coordinator owns artifacts; target owner reauthorizes effects | PASS |
| Platform Blueprint and Ontology | Core shared plane, independent OSs, canonical concept separation | no second AI plane or cross-OS owner is introduced | PASS |
| Marketplace Architecture | governed shared Assets and scoped adoption | Marketplace-published Expert content and state remain Marketplace-owned | PASS |
| Knowledge Packs | Knowledge content separate from Marketplace distribution state | exact references preserve both owners | PASS |
| AI Expert Network | specialized, collaborative, explainable Experts coordinated into one answer | eighteen contribution capabilities remain under one AI Coordinator | PASS |
| Platform Ecosystem | optional governed ecosystem participation | Marketplace and third-party participation cannot bypass eligibility, policy, or owner boundaries | PASS |

Genesis example categories, lifecycle words, outputs, and expert labels remain source material for
the approved Proposal and retained deferrals. Wave 2 does not promote an example into a new
taxonomy, state machine, owner, or implementation requirement.

## 9. Core Platform Consistency

| Core Platform authority | Core responsibility retained | AI Expert Network dependency | Result |
|---|---|---|---|
| Core Principles | canonical ownership, explicit context, Security, projection and immutability rules | applies every principle without creating a local variant | PASS |
| Core Architecture | AI Coordination Domain and fifteen AI Coordinator Components | extends the existing Components through logical responsibility mapping only | PASS |
| Core Domain Model | AI Expert Definition, AI Interaction, AI Action Proposal, organization, Marketplace, intelligence concepts | uses canonical identifiers and publication-path Definition owner | PASS |
| Core Data Ownership | source owners, writers, cross-domain references, version owners | preserves Core-or-Marketplace Definition source and every external writer | PASS |
| Core Permission Model | current Authorization Context, Permission, scope, owner validation | eligibility and tools remain same-or-narrower than current authorization | PASS |
| Core Event Architecture | inherited event boundaries remain external to this documentation Wave | no Event is introduced or inferred | PASS |
| Core API Philosophy | inherited contract and compatibility principles remain external to this Wave | no API or Contract is introduced or inferred | PASS |
| Core Security Model | trust boundaries, tenant isolation, AI and Marketplace Security | Expert isolation and minimum context preserve Core policy | PASS |
| Core Observability | shared correlation, AI monitoring, Audit distinction | AI observations remain distinct from source facts and Audit Record | PASS |
| Core Deployment/Technology deferrals | physical, runtime, provider, deployment, and technology decisions | DD-AEN-24 and inherited deferrals remain open | PASS |
| Core Freeze v1.0 / documentation baseline v1.0.1 | frozen Architecture Guarantees and corrected documentation alignment | no Core decision is reopened or modified | PASS |

### 9.1 Core AI Coordinator containment

The following names remain the frozen Component vocabulary: Request Interpreter, Authorization
Context Resolver, Context Builder, Policy and Safety Engine, Expert Registry, Expert Router,
Instruction Assembler, Expert Execution Adapter, Collaboration Orchestrator, Evidence and Claim
Validator, Response Synthesizer, Confidence and Explainability Evaluator, Action Proposal Broker,
Conversation Context Manager, and AI Audit and Observability.

AEND-01 through AEND-06 remain Logical Responsibility Domains inside this one AI Coordination
Domain. They do not rename, duplicate, split, deploy, or replace the Components.

### 9.2 Core publication-path alignment

| Publication path | Canonical Definition/version owner | Registry relationship | Core consistency |
|---|---|---|---|
| Core-held | Core AI Coordinator Expert Registry | owns Definition content, versions, lineage, registration metadata, and Core-held lifecycle | aligned with Core Domain Model and Data Ownership |
| Marketplace-published | Marketplace through exact Marketplace Asset Version | owns registration, eligibility, compatibility, and coordination metadata plus exact reference only | aligned with Core Domain Model, Data Ownership, and Marketplace Freeze |

## 10. Business Brain Consistency

| Business Brain subject | Business Brain owner/boundary | AI Expert Network relationship | Result |
|---|---|---|---|
| authorized Business inputs | applicable source owners consumed by Business Brain | AI does not enter canonical analysis input formation | PASS |
| candidate reasoning | Business Brain | AI may consume minimum completed context only where authorized | PASS |
| Decision | Business Brain | immutable completed Decision reference is downstream AI context | PASS |
| Decision lifecycle and evidence | Business Brain | AI failure cannot block, amend, recover, or invalidate completion | PASS |
| Recommendation Candidate handoff | Business Brain to Recommendation Engine boundary | Expert Contribution never becomes a Recommendation Candidate | PASS |
| Business Brain read models | Business Brain projection owners | AI receives only separately authorized context, never ownership | PASS |
| AI narrative, explanation, suggestion, Action Proposal | AI Coordinator after Decision exists | remains AI-owned and outside Decision history | PASS |

The canonical sequence remains:

```text
governed non-AI inputs
  -> deterministic Business Brain analysis
  -> completed Decision
  -> minimum authorized completed Decision context
  -> AI Coordinator and selected AI Experts
  -> AI-owned contribution and unified response artifacts
```

This is a cross-reference to the frozen sequence, not a new flow.

## 11. Commerce OS Consistency

| Commerce concern | Commerce OS retains | AI Expert Network boundary | Result |
|---|---|---|---|
| Commerce setup and readiness | canonical setup, readiness contribution, and target validation | AI may provide advisory material or separate proposal only | PASS |
| Product, Category, Variant, Unit | canonical catalog facts and writes | authorized projection input only | PASS |
| Price, Discount, Promotion | commercial truth and lifecycle | no AI write or parallel pricing truth | PASS |
| Stock, movement, Transfer | inventory truth and lifecycle | no AI write, reconciliation, or command authority | PASS |
| Order and POS Transaction | transaction lifecycle | no AI creation or lifecycle transition | PASS |
| Transactional Customer | Commerce transactional customer truth | no CRM-like or AI-owned customer truth | PASS |
| Payment and Refund | canonical financial operational records | no AI write or authorization bypass | PASS |
| Tax Application | Commerce tax determination/application | AI advice is not tax truth or approval | PASS |
| Invoice, Receipt, Commerce Document | document facts and lifecycle | no AI generation becomes canonical without Commerce owner action | PASS |
| Return, Exchange, Commercial Adjustment | Commerce lifecycle and invariants | no AI direct transition or target write | PASS |
| Reports and dashboards | Commerce operational reporting truth and projections | AI interpretation does not own source metrics or reports | PASS |
| Commerce Security, Audit, operations, reliability | Commerce owner under shared Core foundations | AI integration remains same-or-narrower, attributable, and failure-isolated | PASS |

Commerce Core remains independently usable. An unavailable, ineligible, degraded, or removed AI
Expert cannot block a sale, order, payment, refund, inventory change, document, return, transfer,
report, setup, or other Commerce core workflow.

## 12. Marketplace Consistency

| Marketplace subject | Marketplace owner | AI Coordinator relationship | Result |
|---|---|---|---|
| Marketplace Publisher and Participation | MPD-02 | consumes authorized provenance and participation context | PASS |
| Marketplace Asset and Asset Version | MPD-01/MPD-03 | references exact published Expert version; never duplicates content | PASS |
| Marketplace Review and Certification | MPD-04 | may consume attributable assurance context; does not own it | PASS |
| Marketplace Trust Profile | Marketplace projection | treats as non-authoritative context; AI evaluation remains separate | PASS |
| Compatibility and Dependency facts | MPD-05 | consumes current declarations/assessments during eligibility | PASS |
| License, Offer, Purchase, Entitlement | MPD-06/MPD-07 | consumes only applicable state; no commercial ownership | PASS |
| Distribution Availability | MPD-08 | only exact Published immutable version may be eligible for distribution use | PASS |
| Version Selection, Installation, Scoped Configuration, Activation, Applicability | MPD-09 | consumes current authorized state as eligibility input | PASS |
| Search and discovery projections | MPD-10 with Core Search boundary | Marketplace discovery never selects an Expert for an AI Interaction | PASS |
| Security, privacy, Audit, Governance | MPD-11 with Core shared owners | AI Coordinator applies its independent safety and authorization controls | PASS |
| Operations and Analytics projections | MPD-12 with Core shared owners | may consume permitted observations without source ownership | PASS |

### 12.1 Marketplace/Coordinator boundary summary

Marketplace publication, Purchase, Entitlement, Distribution, Installation, Activation, or
Applicability never:

- grants Permission;
- proves current authorization;
- determines AI interaction eligibility;
- selects an Expert;
- starts an AI Interaction;
- invokes a provider/model;
- owns an Expert Contribution or unified response;
- creates an AI Action Proposal; or
- authorizes a target effect.

AI Coordinator registration, eligibility, selection, interaction, or observation never writes
Marketplace content, version, commercial state, Review, Certification, Trust, Distribution, or
scoped adoption state.

## 13. Canonical Cross-Milestone Interaction Navigation

### 13.1 Governed context and response chain

```text
canonical source owners
  -> Core authorization and explicit context
  -> completed Business Brain Decision when applicable
  -> exact Core-held or Marketplace-published Expert Definition version
  -> interaction-specific AI Coordinator eligibility and selection
  -> isolated Expert Contribution(s)
  -> Coordinator validation, synthesis, confidence, and explanation
  -> one AI Coordinator-owned response
  -> optional separate AI Action Proposal after explicit intent
  -> owning service reauthorization, validation, approval, and target-owned effect
  -> attributable Core Audit evidence
```

This chain consolidates already-approved relationships. It is logical documentation navigation,
not interface, Event, runtime, or implementation design.

### 13.2 Ownership-preservation checkpoints

| Checkpoint | Source owner remains | Consumer obligation | No-transfer rule |
|---|---|---|---|
| authorization | Core/access owner | use current exact context and narrower permitted scope | identity or Permission never becomes AI-owned |
| Business understanding | Business DNA and Business Brain owners | consume exact authorized version/reference | AI cannot amend Business DNA or Decision |
| Knowledge and evidence | Knowledge, Rules, Capability, Analytics, and OS owners | preserve source, version, freshness, and scope | contribution does not become source truth |
| Marketplace publication | Marketplace | use exact immutable published version and current scoped state | Registry reference does not copy content |
| AI interaction | AI Coordinator | own eligibility, contributions, response, and AI proposal | AI ownership stops before target effect |
| target effect | applicable Core or OS owner | reauthorize and enforce domain invariants | accepted advice does not bypass target validation |
| Audit | Core Audit Service | append attributable consequential evidence | telemetry is not mutable Audit truth |

## 14. Canonical Terminology Consistency Audit

| Term pair or family | Cross-milestone consistency rule | Validation result |
|---|---|---|
| AI Expert / AI Expert Definition / Expert Registry Registration | participant, versioned definition content, and Coordinator registration remain distinct | PASS |
| Core-held / Marketplace-published Definition | mutually exclusive publication-path owner per Definition instance | PASS |
| AI Expert Definition Version / Marketplace Asset Version / Registry revision | exact canonical version follows path; registration revision is metadata, not duplicate content | PASS |
| Marketplace Activation / Expert eligibility / Expert selection / AI Interaction start | four distinct state or decision concerns with different owners | PASS |
| Logical Responsibility Domain / AI Coordination Domain | AEND areas are internal responsibility partitions, not new ownership Domains | PASS |
| AEC architectural capability / Capability | contribution classification versus Capability Registry canonical record | PASS |
| Expert Contribution / unified response | isolated child content versus Coordinator-synthesized response | PASS |
| Expert Contribution / Recommendation / Recommendation Candidate | AI artifact versus Recommendation Engine and Business Brain concepts | PASS |
| Action Plan Contribution / AI Action Proposal / Configuration Proposal | advisory sequence, AI proposal, and Configuration Engine proposal remain distinct | PASS |
| AI evaluation observation / Marketplace Trust / Business Outcome / Knowledge evolution | AI observation remains separate from every external canonical subject | PASS |
| evidence / Audit Record | supporting attributable material versus Core-owned append-only record | PASS |
| projection / canonical fact | read models remain rebuildable and never become source owner | PASS |
| Permission / entitlement / activation / applicability | authorization, commercial right, enabled state, and scope remain distinct | PASS |
| Decision / AI explanation | deterministic Business Brain fact versus downstream AI artifact | PASS |

No conflicting canonical terminology remains in the approved milestone baselines when Proposal
Baseline v0.1.2 precedence is applied. Historical v0.1.1 Registry-only wording remains visible
only as superseded audit history.

## 15. Frozen Baseline Reference Consistency

| Baseline | Canonical reference form in AI Expert Network documentation | Version/status distinction |
|---|---|---|
| Governance | Governance Foundation, Governance Glossary, Accepted ADRs, Milestone Lifecycle | process and decision authority, not product architecture |
| Genesis | Genesis v1.1 | ultimate architectural intent and principles |
| Core Platform | Core Platform Architecture v1.0; Documentation Baseline v1.0.1 | architecture version and documentation patch remain distinct |
| Business Brain | Business Brain Architecture v1.0; Documentation Baseline v1.0 | frozen Decision architecture |
| Commerce OS | Commerce OS Architecture v1.0 | frozen first Operating System architecture |
| Marketplace | Marketplace Architecture v1.0 | frozen Marketplace ecosystem architecture |
| AI Expert Network | Proposal Baseline v0.1.2 | approved for Documentation Waves; not yet milestone Freeze v1.0 |

Do not describe the AI Expert Network as frozen before its final review and Freeze phases. Do not
describe a Documentation Wave as an architecture version.

## 16. Deferred Decision Reference Consistency

### 16.1 AI Expert Network Deferred Decisions

`DD-AEN-01` through `DD-AEN-24` remain unresolved and unchanged. Wave 1 and Wave 2 may navigate
them but cannot narrow, answer, prioritize, implement, or assign an interim owner for them.

### 16.2 Inherited deferred dependencies

| Inherited register | AI Expert Network dependency | Reference rule | Status |
|---|---|---|---|
| Core D-36 through D-40 | provider/model integration, retention/privacy, safety/quality, learning, and operations | cite the Core identifier with the related DD-AEN row | Preserved |
| Business Brain deferred decision 18 | downstream AI enrichment detail | Decision-before-AI invariant remains fixed; detail stays deferred | Preserved |
| Commerce OS DD-32 through DD-37 | Marketplace, AI, extensions, cross-OS, observability, operational specifics | AI remains optional and target-owner preserving | Preserved |
| Marketplace DD-MP-01 through DD-MP-50 | category content, assurance, compatibility, commercial, adoption, discovery, Security, and operations detail | cite exact range or row; never infer Marketplace policy from AI eligibility | Preserved |
| AI Expert Network DD-AEN-01 through DD-AEN-24 | milestone-specific policy and future physical decisions | Proposal section 36 remains the controlling register | Preserved |

### 16.3 Deferred Decision maintenance rules

1. Use the exact identifier and source milestone.
2. Distinguish a fixed owner/invariant from its deferred policy details.
3. Do not interpret a cross-reference as resolution.
4. Do not copy a deferred item into a new milestone-local owner.
5. Resolution requires applicable ADR and milestone change control.
6. Implementation cannot silently resolve an architectural deferral.

## 17. Duplicate-Definition and Reference Control

### 17.1 Definition-source rule

One document or frozen baseline remains the canonical definition source for each inherited
concept. AI Expert Network documents may summarize the relationship needed at their boundary but
must link to the source and preserve the canonical name and owner.

| Documentation pattern | Allowed? | Maintenance interpretation |
|---|---:|---|
| exact cross-reference to canonical source | Yes | preferred for inherited definitions |
| concise boundary summary plus source link | Yes | not a duplicate authority when owner and exclusions remain unchanged |
| complete restatement with altered wording | No | risks a competing definition |
| milestone-local synonym for a canonical concept | No | creates terminology drift |
| local read model named like a source fact without `View` or projection boundary | No | risks hidden ownership |
| category-qualified Marketplace label explicitly tied to Marketplace Asset | Yes | navigation label only, not a new type |
| Draft ADR treated as accepted definition source | No | Draft has no architectural authority |
| historical superseded Patch text quoted as current rule | No | v0.1.2 precedence must be shown |

### 17.2 Duplicate-definition validation

No parallel or competing architectural definition remains in the current approved baseline:

- Core and Marketplace Definition ownership is mutually exclusive by publication path;
- Expert Registry registration does not duplicate Marketplace Definition content;
- AEC capabilities do not duplicate canonical Capability;
- Expert Contribution does not duplicate Decision, Recommendation, Configuration Proposal, or
  target truth;
- AI evaluation does not duplicate Marketplace Trust, Knowledge evolution, Business Outcome,
  provider truth, or Audit Record;
- AI read models do not duplicate canonical source facts; and
- Wave 1 and Wave 2 are navigation layers, not alternate definition sources.

Necessary summaries across milestone documents remain traceable references, not duplicated
architectural authority.

## 18. Reader Navigation and Documentation Maintainability

### 18.1 Topic-to-milestone navigation

| Topic | Start in AI Expert Network | Then read | Why |
|---|---|---|---|
| publication-path Definition ownership | Corrective Patch sections 3–6 | Core Domain Model/Data Ownership; Marketplace Freeze | verify owner and version source |
| AI Coordinator Components and interaction ownership | Proposal sections 16 and 24–29 | Core Architecture, Domain Model, Data Ownership | verify one coordination plane |
| Business Decision sequencing | Proposal section 18 | Business Brain Freeze; ADR-012/029 | verify deterministic completion before AI |
| Recommendation explanation | Proposal section 19 | Genesis Recommendation Engine; Core Data Ownership | preserve Recommendation ownership |
| Knowledge consumption and learning | Proposal sections 20 and 35–36 | Genesis Knowledge Engine/Packs; ADR-009/010/032 | preserve source and governed promotion boundary |
| Marketplace Expert publication and eligibility | Proposal section 17; Corrective Patch sections 3–5 | Marketplace Freeze; ADR-027/028 | separate Marketplace state from Coordinator eligibility |
| Commerce advice or action proposal | Proposal section 23 | Commerce Freeze; ADR-017/024/025 | preserve Commerce target owner and independence |
| Security, privacy, and authorization | Proposal sections 30–32 | Core Permission and Security models; ADR-034/038 | preserve current context and Audit boundary |
| unresolved policy or implementation | Proposal section 36 | inherited Core/Business Brain/Commerce/Marketplace registers | avoid silent resolution |

### 18.2 Maintainer rules

1. Link to a freeze or accepted source before repeating an inherited owner.
2. Cite Proposal plus both Patches when publication-path ownership is summarized.
3. Use Re-Review v0.1.2, not the v0.1.1 Re-Review, as the current approval reference.
4. Preserve architecture-version and documentation-baseline version distinctions.
5. Keep Governance ADR links separate from DADR-AEN Draft subjects.
6. Name the source milestone whenever referencing an inherited Deferred Decision.
7. Prefer identifier-and-link navigation over copied definitions.
8. Mark projections and observations explicitly as non-canonical.
9. Preserve external-owner exclusions when shortening a table.
10. Treat any discovered divergence as a review finding; do not normalize it silently.

### 18.3 Editorial consistency rules

- Capitalize canonical concepts consistently: Business DNA, Knowledge, Knowledge Pack, Rule,
  Capability, Decision, Recommendation, Configuration Proposal, Permission, Marketplace Asset
  Version, AI Coordinator, AI Expert, AI Interaction, AI Action Proposal, and Audit Record.
- Use `Operating System` on first reference and `OS` only after the meaning is clear.
- Use `Core Platform Architecture v1.0` and `Documentation Baseline v1.0.1` precisely.
- Use `Proposal Baseline v0.1.2` for the merged AI Expert Network architecture.
- Label v0.1.1 Registry-only statements as superseded when historically referenced.
- Use `external owner`, `canonical owner`, `projection owner`, and `accountable Component` only for
  their approved meanings.
- Avoid `owns` when the relationship is consumes, references, projects, observes, explains,
  proposes, or submits evidence.
- Do not abbreviate an owner where the Core-held/Marketplace-published distinction matters.

## 19. Documentation Improvement Register

Every improvement in this register has Architectural Impact `NONE`.

### 19.1 Cross-milestone improvements

| ID | Improvement | Cross-milestone value | Architectural Impact |
|---|---|---|---|
| CM-01 | Platform authority matrix | shows the role and ownership effect of every governing/frozen layer | NONE |
| CM-02 | Cross-milestone reading matrix | connects fifteen common questions to the correct external authority | NONE |
| CM-03 | Canonical definition source index | identifies the primary source for inherited concepts | NONE |
| CM-04 | External owner authority matrix | maps every consumed external fact to its frozen or deferred owner | NONE |
| CM-05 | Governance and Accepted ADR matrices | normalizes Governance references and decision dependencies | NONE |
| CM-06 | Genesis consistency matrix | traces AI Expert Network behavior to constitutional source documents | NONE |
| CM-07 | Core Platform consistency matrix | verifies shared service, context, owner, and AI Coordinator boundaries | NONE |
| CM-08 | Business Brain and Commerce OS matrices | preserves Decision sequencing and independent OS ownership | NONE |
| CM-09 | Marketplace consistency matrix | preserves published content, scoped state, and eligibility separation | NONE |
| CM-10 | Cross-milestone interaction checkpoints | makes no-ownership-transfer boundaries easy to audit | NONE |

### 19.2 Documentation consistency improvements

| ID | Improvement | Consistency value | Architectural Impact |
|---|---|---|---|
| DC-01 | Proposal Baseline and document-dependency matrices | makes current versus historical authority explicit | NONE |
| DC-02 | Canonical terminology consistency audit | validates fourteen commonly conflated term families | NONE |
| DC-03 | Frozen baseline reference matrix | normalizes architecture and documentation version labels | NONE |
| DC-04 | Inherited Deferred Decision matrix | connects Core, Business Brain, Commerce, Marketplace, and AEN deferrals | NONE |
| DC-05 | Duplicate-definition source rule | prevents milestone-local alternate definitions | NONE |
| DC-06 | Duplicate-definition validation | distinguishes traceable summaries from competing authority | NONE |
| DC-07 | Topic-to-milestone navigation | supplies maintainable cross-document reading paths | NONE |
| DC-08 | Maintainer reference rules | standardizes links, identifiers, projection labels, and divergence handling | NONE |

### 19.3 Editorial improvements

| ID | Improvement | Editorial value | Architectural Impact |
|---|---|---|---|
| ED-01 | Canonical capitalization guide | reduces name drift across milestone documents | NONE |
| ED-02 | Architecture/documentation version labels | prevents release-status ambiguity | NONE |
| ED-03 | Current versus historical review labels | prevents v0.1.1 findings from being read as current baseline | NONE |
| ED-04 | Relationship-verb guidance | distinguishes owning, consuming, referencing, observing, and proposing | NONE |
| ED-05 | Projection and observation labels | prevents read-model or evidence language from implying ownership | NONE |
| ED-06 | Source-milestone label for inherited deferrals | makes unresolved work traceable and maintainable | NONE |

### 19.4 Improvement counts

| Improvement category | Count |
|---|---:|
| Cross-milestone improvements | 10 |
| Documentation consistency improvements | 8 |
| Editorial improvements | 6 |
| **Total documentation improvements** | **24** |

## 20. Wave 2 Validation

### 20.1 Required consistency validation

| Required validation | Result | Evidence |
|---|---|---|
| Every external owner points to the correct frozen authority | PASS | section 6 maps each subject to its frozen or explicitly deferred source |
| Every inherited concept references the correct milestone | PASS | sections 4–12 and 18 provide source and reading navigation |
| Every canonical term is used consistently | PASS | sections 5, 14, and 18.3 preserve canonical names and distinctions |
| No conflicting terminology exists across approved milestones | PASS | section 14 finds no current conflict under v0.1.2 precedence |
| No duplicated architectural definitions remain | PASS | section 17 confirms one definition source and no competing current authority |
| Navigation between milestones is complete | PASS | sections 3, 4, and 18 cover Governance, Genesis, every frozen milestone, and AEN artifacts |
| Governance references are consistent | PASS | section 7 separates Governance authority, Accepted ADRs, and Draft ADR subjects |
| Genesis references are consistent | PASS | section 8 preserves intent without promoting examples into decisions |
| Frozen baseline references are consistent | PASS | section 15 preserves exact version/status distinctions |
| Deferred Decision references are consistent | PASS | section 16 preserves all local and inherited registers |

### 20.2 Architecture preservation

| Validation | Result |
|---|---:|
| Architecture changes introduced | ZERO |
| Ownership changes | ZERO |
| Domain changes | ZERO |
| Capability changes | ZERO |
| Canonical fact changes | ZERO |
| Write-model changes | ZERO |
| Aggregate changes | ZERO |
| Read-model changes | ZERO |
| Lifecycle changes | ZERO |
| ADR changes | ZERO |
| Deferred Decision changes | ZERO |
| Frozen baseline changes | ZERO |

### 20.3 Prohibited-content validation

Wave 2 introduces:

- no implementation;
- no API, endpoint, or protocol;
- no Contract;
- no Event or payload;
- no database or persistence design;
- no infrastructure;
- no runtime or deployment topology;
- no framework, provider, vendor, or technology;
- no new architecture term;
- no new ADR or Draft ADR subject;
- no new Deferred Decision; and
- no resolution of an existing Deferred Decision.

**Architectural changes introduced: 0**

## 21. Recommendation

# READY FOR DOCUMENTATION WAVE 3

Documentation Wave 2 completes its cross-milestone consistency and maintainability scope without
changing Proposal Baseline v0.1.2 or any frozen authority. Future documentation must continue to
use the source-of-definition, external-owner, baseline-precedence, ADR, and Deferred Decision
rules recorded here as navigation only.

## References

### AI Expert Network baseline and documentation

- [AI Expert Network Discovery v0.1](00-AI-EXPERT-NETWORK-DISCOVERY.md)
- [AI Expert Network Capability Map v0.1](01-AI-EXPERT-NETWORK-CAPABILITY-MAP.md)
- [AI Expert Network Proposal v0.1](02-AI-EXPERT-NETWORK-PROPOSAL.md)
- [AI Expert Network Proposal Patch v0.1.1](03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md)
- [AI Expert Network Corrective Proposal Patch v0.1.2](03A-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.2.md)
- [AI Expert Network Re-Review for Baseline v0.1.1](04-AI-EXPERT-NETWORK-RE-REVIEW.md)
- [AI Expert Network Conflict Analysis](04A-AI-EXPERT-NETWORK-CONFLICT-ANALYSIS.md)
- [AI Expert Network Independent Re-Review v0.1.2](04B-AI-EXPERT-NETWORK-RE-REVIEW-v0.1.2.md)
- [AI Expert Network Documentation Wave 1](05-AI-EXPERT-NETWORK-WAVE-1.md)

### Governance and Genesis

- [Governance ADR Repository](../00-governance/ADR/README.md)
- [Governance Milestone Lifecycle](../00-governance/MILESTONE-LIFECYCLE.md)
- [Governance Glossary](../00-governance/glossary/GLOSSARY.md)
- [Genesis Vision](../01-genesis/01-VISION.md)
- [Genesis Constitution](../01-genesis/02-CONSTITUTION.md)
- [Genesis Business DNA](../01-genesis/03-BUSINESS-DNA.md)
- [Genesis Capabilities](../01-genesis/04-CAPABILITIES.md)
- [Genesis Knowledge Engine](../01-genesis/05-KNOWLEDGE-ENGINE.md)
- [Genesis Business Brain](../01-genesis/06-BUSINESS-BRAIN.md)
- [Genesis Recommendation Engine](../01-genesis/07-RECOMMENDATION-ENGINE.md)
- [Genesis AI Strategy](../01-genesis/08-AI-STRATEGY.md)
- [Genesis Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md)
- [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md)
- [Genesis Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [Genesis Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md)
- [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Genesis Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

### Core Platform

- [Core Platform Principles](../02-core-platform/00-CORE-PLATFORM-PRINCIPLES.md)
- [Core Platform Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)
- [Core Platform Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)
- [Core Platform Data Ownership](../02-core-platform/04-DATA-OWNERSHIP.md)
- [Core Platform Permission Model](../02-core-platform/05-PERMISSION-MODEL.md)
- [Core Platform Security Model](../02-core-platform/08-SECURITY-MODEL.md)
- [Core Platform Observability](../02-core-platform/09-OBSERVABILITY.md)
- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Core Platform Readiness v1.0.1](../99-architecture-freeze/CORE-PLATFORM-v1.0.1-READINESS.md)

### Business Brain, Commerce OS, and Marketplace

- [Business Brain Architecture](../03-business-brain/02-BUSINESS-BRAIN-ARCHITECTURE.md)
- [Business Brain Domain Model](../03-business-brain/03-BUSINESS-BRAIN-DOMAIN-MODEL.md)
- [Business Brain Data Ownership](../03-business-brain/04-BUSINESS-BRAIN-DATA-OWNERSHIP.md)
- [Business Brain Final Architecture Review](../03-business-brain/12-BUSINESS-BRAIN-ARCHITECTURE-REVIEW.md)
- [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Commerce OS Final Architecture Review](../04-commerce-os/09-COMMERCE-OS-FINAL-ARCHITECTURE-REVIEW.md)
- [Commerce OS Freeze v1.0](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md)
- [Marketplace Final Architecture Review](../05-marketplace/09-MARKETPLACE-FINAL-ARCHITECTURE-REVIEW.md)
- [Marketplace Freeze v1.0](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md)

### Directly relevant Accepted ADRs

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
