# AI Expert Network Documentation Wave 1

**Milestone:** AI Expert Network  
**Artifact type:** Documentation Quality Layer  
**Status:** Proposed for review  
**Architecture baseline:** AI Expert Network Proposal Baseline v0.1.2  
**Architecture authority added by this document:** None  
**Architectural changes introduced:** Zero  
**Deferred Decisions resolved:** Zero

---

## 1. Purpose

AI Expert Network Documentation Wave 1 improves documentation navigation, cross-reference
consistency, canonical terminology, naming, table readability, traceability, and reader guidance
for the approved Proposal Baseline v0.1.2.

This document is a documentation-quality layer only. It does not replace the Proposal, either
Patch, or the independent Re-Review. It does not become a new source of architecture and does not
change a Domain, Capability, owner, canonical fact, write model, aggregate, lifecycle, Deferred
Decision, ADR, frozen boundary, or inherited decision.

## 2. Scope and Documentation Constraints

Wave 1 provides:

- one authoritative reading order for the AI Expert Network milestone;
- one precedence guide for the three-document Proposal Baseline v0.1.2;
- internal navigation by reader goal and architectural subject;
- canonical terminology and naming guidance aligned with Governance;
- normalized identifier and register navigation;
- Discovery-to-Capability-Map-to-Proposal traceability;
- Domain, Capability, owner, fact, write-model, aggregate, read-model, Patch, risk, Deferred
  Decision, and Draft ADR navigation;
- textual recommendations for future diagrams; and
- a documentation-only improvement register and validation.

Wave 1 does not define or modify:

- architecture or ownership;
- Domains or Capabilities;
- canonical facts, write models, aggregates, read models, or lifecycles;
- APIs, Contracts, Events, databases, infrastructure, runtime, deployment, frameworks, vendors,
  technology, or implementation;
- detailed policy retained by a Deferred Decision; or
- ADR status or content.

## 3. Authority and Baseline Interpretation

### 3.1 Authority order

The following authority order governs interpretation. This table is navigation, not a new
precedence decision.

| Order | Authority | Documentation role |
|---:|---|---|
| 1 | Governance, Accepted ADRs, and Architecture Freezes | control canonical terms, frozen ownership, change control, and inherited guarantees |
| 2 | Genesis v1.1 | controls platform vision, constitutional rules, AI principles, and ecosystem intent |
| 3 | Frozen Core Platform, Business Brain, Commerce OS, and Marketplace baselines | control upstream and adjacent ownership and interaction boundaries |
| 4 | AI Expert Network Discovery v0.1 | records the approved problem space, uncertainties, risks, and Open Questions |
| 5 | AI Expert Network Capability Map v0.1 | maps candidate logical relationships without approving architecture |
| 6 | AI Expert Network Proposal Baseline v0.1.2 | controls the approved milestone architecture for Documentation Waves |
| 7 | Independent Re-Review v0.1.2 | validates the merged Proposal baseline; adds no architecture |
| 8 | Documentation Wave 1 | supplies navigation, terminology, and traceability only |

### 3.2 Proposal Baseline v0.1.2

The authoritative AI Expert Network Proposal baseline must be read as:

```text
02-AI-EXPERT-NETWORK-PROPOSAL.md
  +
03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md
  +
03A-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.2.md
  =
AI Expert Network Proposal Baseline v0.1.2
```

Patch v0.1.1 supplies compatible clarifications only where Patch v0.1.2 preserves them. For
CR-AEN-01 through CR-AEN-05, Patch v0.1.2 supersedes conflicting v0.1.1 statements about:

1. Registry-only AI Expert Definition ownership;
2. Registry-only Definition Version ownership;
3. a mandatory separate Registry Definition Version behind Marketplace publication;
4. placement of all Definition content in Expert Registry Registration;
5. Registry-only wording for `DADR-AEN-03`; and
6. dependent validation or consolidated-baseline claims.

Proposal v0.1 controls every unaffected decision. Patch v0.1.2 preserves the compatible v0.1.1
clarifications concerning Logical Responsibility Domains, lifecycle separation, evaluation
boundaries, Marketplace terminology, Marketplace ownership, AI Coordinator ownership, and
Published Marketplace Asset Version immutability.

### 3.3 Current versus historical quality gates

| Artifact | Current interpretation |
|---|---|
| Proposal v0.1 | original architecture content; read with both Patches |
| Patch v0.1.1 | historical Freeze Alignment Patch; partly superseded by v0.1.2 |
| Re-Review for Baseline v0.1.1 | historical failed quality gate; not the current approval |
| Conflict Analysis | identifies why the v0.1.1 conflicts came from its Patch and required Proposal correction |
| Corrective Patch v0.1.2 | controlling correction for the two ownership/version conflicts |
| Independent Re-Review v0.1.2 | current approval: `APPROVED FOR DOCUMENTATION WAVES` |
| Documentation Wave 1 | non-authoritative documentation overlay |

The historical artifacts remain part of the audit trail. Their earlier status or superseded
wording must not be read as current architecture.

## 4. Reader Navigation

### 4.1 Complete reading path

| Sequence | Document | Reader objective |
|---:|---|---|
| 1 | `00-AI-EXPERT-NETWORK-DISCOVERY.md` | understand the problem space, inherited boundaries, assumptions, risks, and sixty Open Questions |
| 2 | `01-AI-EXPERT-NETWORK-CAPABILITY-MAP.md` | understand candidate logical flows and relationships without treating them as architecture |
| 3 | `02-AI-EXPERT-NETWORK-PROPOSAL.md` | read the proposed Domains, Capabilities, ownership, models, boundaries, risks, deferrals, and Draft ADR subjects |
| 4 | `03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md` | identify the first set of Proposal clarifications and their historical wording |
| 5 | `04-AI-EXPERT-NETWORK-RE-REVIEW.md` | understand the two blocking conflicts and the editorial publication-version ambiguity found in v0.1.1 |
| 6 | `04A-AI-EXPERT-NETWORK-CONFLICT-ANALYSIS.md` | understand the governing source of those conflicts and the required artifact class for correction |
| 7 | `03A-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.2.md` | apply the controlling publication-path, version, and aggregate corrections while preserving compatible clarifications |
| 8 | `04B-AI-EXPERT-NETWORK-RE-REVIEW-v0.1.2.md` | verify the merged baseline is stable and approved for Documentation Waves |
| 9 | `05-AI-EXPERT-NETWORK-WAVE-1.md` | navigate terminology, registers, and traceability without adding architecture |

The ordering places the corrective Patch after its diagnostic history. When applying architecture,
however, the precedence rule in section 3.2 controls regardless of file-name order.

### 4.2 Goal-based reading paths

| Reader goal | Minimum path |
|---|---|
| Understand mission and boundaries | Discovery sections 2–8; Capability Map sections 1 and 15–17; Proposal sections 2–5 |
| Verify approved logical Domains and Capabilities | Proposal sections 6–8; Corrective Patch section 7.1; Re-Review v0.1.2 sections 3.4 and 7 |
| Verify publication-path ownership | Proposal sections 9–11 and 24–26; Corrective Patch sections 3–6 and 8–9; Re-Review v0.1.2 sections 2–4 |
| Verify AI Coordinator containment | Proposal sections 16 and 29; Corrective Patch sections 7.1 and 7.5 |
| Verify external-owner preservation | Proposal sections 17–23 and 24.2; Re-Review v0.1.2 section 4 |
| Verify lifecycle separation | Proposal section 12; Corrective Patch section 7.2; Re-Review v0.1.2 section 3.5 |
| Verify evaluation and learning limits | Proposal sections 8, 32–35; Corrective Patch sections 7.3 and 8; Re-Review v0.1.2 section 3.6 |
| Locate unresolved work | Proposal sections 35–38; Corrective Patch section 10.3; this Wave section 14 |
| Confirm approval and stability | Re-Review v0.1.2 sections 5–8 |

## 5. Canonical Terminology and Glossary Alignment

### 5.1 Canonical term navigation

| Canonical term | Documentation meaning | Canonical navigation source |
|---|---|---|
| AI Expert Network | collection of specialized AI Experts coordinated into one Nexoraxs response | Governance Glossary; Genesis AI Expert Network; Proposal vision and scope |
| AI Coordinator | Core component that governs request context, selects and coordinates Experts, and returns one response | Governance Glossary; Core Platform architecture; Proposal section 16 |
| AI Expert | specialized AI participant focused on an industry, function, or technical domain and consuming governed Knowledge | Governance Glossary; Genesis AI Expert Network |
| AI Expert Definition | versioned definition of one specialized Expert; owner follows the mutually exclusive publication path | Core Domain Model; Proposal sections 9–10; Corrective Patch section 3 |
| AI Expert Definition Version | immutable exact Definition version selected for an AI Interaction; owner follows publication path | Proposal section 11; Corrective Patch section 4 |
| Core-held AI Expert Definition | Definition whose canonical content, version, lineage, and lifecycle are held by Core AI Coordinator Expert Registry | Corrective Patch sections 3–5 |
| Marketplace-published AI Expert Definition | Definition whose canonical published content and version are held by Marketplace through the exact Marketplace Asset Version | Corrective Patch sections 3–5 |
| Expert Registry | frozen AI Coordinator Component that maintains Core-held Definitions and Coordinator registration metadata or exact Marketplace references | Governance Glossary; Proposal sections 9, 16, and 26 |
| Expert Registry Registration | Core AI Coordinator aggregate for registration and path-specific permitted content | Proposal section 26; Corrective Patch section 5 |
| Marketplace Asset Version | immutable Published Marketplace version and canonical Definition version for the Marketplace-published path | Marketplace Freeze; Corrective Patch sections 3–5 |
| AI Interaction | scoped, auditable AI-coordinated request and unified response record | Governance Glossary; Proposal sections 24–28 |
| Expert Contribution | bounded AI Interaction content contributed for validation and synthesis | Proposal sections 15 and 24 |
| unified AI response | AI Coordinator-owned response synthesized from governed contributions | Proposal sections 14–16 and 24 |
| AI Action Proposal | AI Coordinator-owned proposal that grants no execution authority | Governance Glossary; Proposal sections 16, 21, and 24–28 |
| Decision | deterministic Business Brain fact completed before AI consumes it | Business Brain Freeze; Proposal section 18 |
| Recommendation | Recommendation Engine-owned canonical fact, never an Expert Contribution | Proposal section 19 |
| Configuration Proposal | Configuration Engine-owned canonical fact, distinct from guidance and AI Action Proposal | Proposal section 21 |
| Knowledge | Knowledge Engine-owned canonical content consumed by reference and exact version | Genesis Knowledge Engine; Proposal section 20 |
| Capability | Capability Registry-owned platform concept; not an AEC architectural capability | Proposal sections 5 and 7 |
| Permission | Core-owned authorization concept; Marketplace declaration, eligibility, or Expert selection is not a Permission grant | Core Permission Model; Proposal sections 13, 17, and 30 |

This table indexes approved meanings. It does not replace the Governance Glossary or redefine a
term.

### 5.2 Required distinctions

| Do not collapse | Required distinction |
|---|---|
| AI Expert and provider/model | Expert identity and Definition version remain separate from replaceable provider/model references |
| AI Expert Definition and Expert Registry registration | Definition content follows publication path; registration metadata remains Core AI Coordinator-owned |
| Core-held Definition Version and Marketplace Asset Version | each is canonical only for its own publication path; there is no mandatory paired version |
| Marketplace Asset Version and Registry registration revision | Marketplace version owns published content; Registry revision owns Coordinator metadata only |
| Marketplace Activation and Expert eligibility | Activation is Marketplace scoped state; AI Coordinator independently evaluates eligibility |
| Expert eligibility and Expert selection | eligibility establishes permitted candidates; Expert Router owns interaction-specific selection |
| Expert Contribution and unified AI response | a contribution is isolated input; Response Synthesizer owns the one response |
| Expert Contribution and Recommendation | Expert output is advisory AI content; Recommendation Engine alone creates a Recommendation |
| Action Plan Contribution and AI Action Proposal | contribution is advisory; only Action Proposal Broker creates the separate proposal when requested |
| AI Action Proposal and Configuration Proposal | AI Coordinator proposes; Configuration Engine retains its separate canonical proposal |
| Marketplace Trust and AI evaluation | Marketplace owns Trust; AI Coordinator owns governed evaluation observations only |
| evaluation observation and source truth | an observation cannot mutate Business Outcomes, Knowledge, provider truth, customer feedback, or target state |
| Logical Responsibility Domain and bounded context | AEND areas organize responsibility inside the frozen AI Coordination Domain; they are not owners or deployment boundaries |
| AEC architectural capability and canonical Capability | AEC labels describe milestone contribution capabilities; canonical Capability remains Capability Registry-owned |

### 5.3 Naming consistency rules

1. Use `AI Expert Network`, `AI Coordinator`, `AI Expert`, `AI Interaction`, `AI Action Proposal`,
   `Expert Contribution`, and `Expert Registry` with their canonical capitalization.
2. Use `Core AI Coordinator Expert Registry` when the full canonical owner must be explicit; use
   `Expert Registry` when referring to the frozen Component in established context.
3. Use `Marketplace through the exact Marketplace Asset Version` when identifying the canonical
   owner for a Marketplace-published Definition or version.
4. Treat `Marketplace AI Expert Asset` and `Marketplace AI Expert Asset Version` as
   category-qualified references to existing Marketplace concepts, never as new canonical types.
5. Qualify `Definition Lifecycle` as Core-held or Marketplace-published where the owner could be
   ambiguous.
6. Use `Logical Responsibility Domain` for AEND-01 through AEND-06; do not shorten it to an
   ownership Domain, service, or bounded context.
7. Use `architectural capability` for AEC-01 through AEC-18 when distinction from canonical
   platform `Capability` matters.
8. Preserve `Published` when referring to immutable Marketplace Asset Versions.
9. Preserve the canonical names Decision, Recommendation, Configuration Proposal, Knowledge,
   Permission, Marketplace Activation, and Marketplace Applicability.
10. Do not use a reference, projection, eligibility result, confidence value, or observation as a
    synonym for canonical ownership.

## 6. Identifier and Register Navigation

| Prefix | Register | Range/count | Authority or status |
|---|---|---:|---|
| `OQ-AEN-*` | Discovery Open Questions | OQ-AEN-01 through OQ-AEN-60 | traced; resolved, partially resolved, or preserved by Proposal disposition |
| `AEC-*` | AI Expert Network architectural capabilities | AEC-01 through AEC-18 | approved by Proposal Baseline v0.1.2 |
| `CDR-*` | candidate Domain relationship areas | CDR-01 through CDR-10 | Capability Map candidates; not approved Domains |
| `AEND-*` | Logical Responsibility Domains | AEND-01 through AEND-06 | approved inside frozen AI Coordination Domain |
| `AEN-CF-*` | canonical AI facts or artifacts | AEN-CF-01 through AEN-CF-11 | approved ownership catalog |
| `AEN-WM-*` | canonical AI write models | AEN-WM-01 through AEN-WM-02 | approved; exactly two AI writers |
| `AEN-RM-*` | logical read models | AEN-RM-01 through AEN-RM-09 | rebuildable, permission-filtered projections |
| `R-AEN-*` | Proposal risks | R-AEN-01 through R-AEN-20 | preserved and non-blocking after Re-Review |
| `DD-AEN-*` | AI Expert Network Deferred Decisions | DD-AEN-01 through DD-AEN-24 | unresolved and preserved |
| `DADR-AEN-*` | Draft ADR subjects | DADR-AEN-01 through DADR-AEN-12 | Draft only; no Governance number reserved |
| `PP-AEN-*` | Patch v0.1.1 items | PP-AEN-01 through PP-AEN-07 | historical clarification set, subject to v0.1.2 precedence |
| `F-AEN-RR-*` | v0.1.1 Re-Review findings | F-AEN-RR-01 through F-AEN-RR-03 | diagnostic history; no current finding remains |
| `CR-AEN-*` | corrective Patch v0.1.2 items | CR-AEN-01 through CR-AEN-05 | controlling correction and preservation rules |

Identifier ranges are navigation aids. They do not create a missing record, change a record's
status, or imply authority beyond the named source.

## 7. Discovery and Capability Map Traceability

### 7.1 Phase-role traceability

| Phase artifact | What it contributes | What it cannot authorize |
|---|---|---|
| Discovery | mission, boundaries, candidate categories/capabilities, assumptions, risks, sixty Open Questions | architecture, Domains, Components, ownership, or implementation |
| Capability Map | logical flows, candidate capability relationships, ten candidate Domain relationship areas, dependency and decision navigation | approved Domains, ownership, Components, interfaces, or runtime |
| Proposal Baseline v0.1.2 | approved logical architecture, owners, facts, models, boundaries, deferrals, and Draft ADR subjects | accepted ADRs, implementation, or answers to deferrals |
| Re-Review v0.1.2 | approval and stability validation | new or replacement architecture |
| Documentation Wave 1 | cross-references, naming, traceability, and editorial guidance | architecture of any kind |

### 7.2 Candidate relationship area to approved Domain traceability

| Capability Map relationship area | Approved Proposal destination | Boundary preserved |
|---|---|---|
| CDR-01 Expert Specialization and Definition | AEND-01 Expert Definition and Version | Expert Registry and publication-path ownership retained |
| CDR-02 Expert Version and Lifecycle Alignment | AEND-01 Expert Definition and Version | Definition, Marketplace, provider, eligibility, and Interaction lifecycles remain distinct |
| CDR-03 Eligibility and Explicit Context | AEND-02 Expert Eligibility Context | AI Coordinator eligibility and selection retained |
| CDR-04 Bounded Advisory Contribution | AEND-03 Expert Advisory Contribution | Expert Contribution remains AI Interaction content |
| CDR-05 Evidence, Confidence, and Explainability | AEND-05 Expert Assurance and Explainability | source owners remain canonical |
| CDR-06 Multi-Expert Collaboration | AEND-04 Expert Collaboration Participation | Coordinator owns orchestration and synthesis |
| CDR-07 Marketplace and Ecosystem Participation | AEND-01 and AEND-02 | Marketplace content/state remains external; Registry references and eligibility stay Core-owned |
| CDR-08 Security, Privacy, Audit, and Governance | cross-cutting AEND-01 through AEND-06 | Core/shared owners and Coordinator controls remain unchanged |
| CDR-09 Feedback, Learning, and Evaluation | AEND-06 Expert Evaluation and Improvement | observations cannot rewrite canonical truth |
| CDR-10 Operational Continuity | AEND-02 and AEND-06 | operational context affects eligibility/observation without becoming source truth |

The ten CDR areas remain historical candidate groupings. This trace does not convert them into
approved Domains.

## 8. Logical Domain and Capability Navigation

### 8.1 Approved Logical Responsibility Domains

| ID | Approved Logical Responsibility Domain | Accountable frozen owner | Primary Proposal navigation |
|---|---|---|---|
| AEND-01 | Expert Definition and Version | Core AI Coordinator through Expert Registry, with Marketplace publication-path ownership | sections 9–12, 16–17, 24–26 |
| AEND-02 | Expert Eligibility Context | Core AI Coordinator | sections 13, 16–17, 24, 27–30 |
| AEND-03 | Expert Advisory Contribution | Core AI Coordinator within AI Interaction | sections 15, 24–29 |
| AEND-04 | Expert Collaboration Participation | Core AI Coordinator through Collaboration Orchestrator | sections 14, 24, 27–29 |
| AEND-05 | Expert Assurance and Explainability | Core AI Coordinator | sections 14–16, 24, 27–32 |
| AEND-06 | Expert Evaluation and Improvement | Core AI Coordinator under Governance | sections 8, 24, 27, 32–35 |

All six remain responsibility partitions inside the frozen AI Coordination Domain. None is an
independent owner, service, bounded context, aggregate, deployment unit, or runtime authority.

### 8.2 Approved architectural capabilities

| ID | Approved capability | Home Domain | Output-boundary navigation |
|---|---|---|---|
| AEC-01 | Specialized Business Question Contribution | AEND-03 | specialized understanding, not request interpretation or final response |
| AEC-02 | Recommendation Explanation Contribution | AEND-03 | explanation, not canonical Recommendation |
| AEC-03 | Business Insight Contribution | AEND-03 | advisory insight, not Decision or Analytics truth |
| AEC-04 | Risk Assessment Contribution | AEND-03 | advisory risk, not approval or target decision |
| AEC-05 | Growth Opportunity Contribution | AEND-03 | possible opportunity, not priority or commitment |
| AEC-06 | Automation Suggestion Contribution | AEND-03 | suggestion, not Rule, Automation Pack, Configuration Proposal, or application |
| AEC-07 | Executive Summary Contribution | AEND-03 | summary material, not unified response |
| AEC-08 | Action Plan Contribution | AEND-03 | advisory sequence, not AI Action Proposal or execution by default |
| AEC-09 | Analytics Interpretation Contribution | AEND-03 | interpretation, not metric or projection ownership |
| AEC-10 | Workflow Explanation Contribution | AEND-03 | explanation, not workflow definition, instance, or configuration |
| AEC-11 | Configuration Guidance Contribution | AEND-03 | guidance, not Configuration Proposal or target configuration |
| AEC-12 | Reporting Guidance Contribution | AEND-03 | advice, not Report, dashboard, or source truth |
| AEC-13 | Integration Advisory Contribution | AEND-03 | considerations, not interface ownership or execution |
| AEC-14 | Security Advisory Contribution | AEND-03 | advice, not Security policy, Permission, or authorization |
| AEC-15 | Compliance Advisory Contribution | AEND-03 | explanation, not legal authority, Rule, or approval |
| AEC-16 | Alternative Option Contribution | AEND-03 | alternatives, not canonical Implementation Option mapping |
| AEC-17 | Confidence and Evidence Reporting | AEND-05 | contribution assurance, not source or final-response confidence ownership |
| AEC-18 | Multi-Expert Collaboration Contribution | AEND-04 | isolated participation, not selection, orchestration, conflict resolution, or synthesis |

No capability name, home Domain, output boundary, relationship, or owner is changed by this Wave.

## 9. Canonical Artifact and Projection Navigation

### 9.1 Canonical fact and AI artifact catalog

| ID | Canonical fact or AI artifact | Sole-owner navigation |
|---|---|---|
| AEN-CF-01 | AI Expert Definition and version | Core AI Coordinator for Core-held content; Marketplace through exact Marketplace Asset Version for Marketplace-published content |
| AEN-CF-02 | Expert Registry registration | Core AI Coordinator |
| AEN-CF-03 | interaction-specific Expert eligibility evaluation | Core AI Coordinator |
| AEN-CF-04 | Expert selection and selected-version reference | Core AI Coordinator |
| AEN-CF-05 | Expert Contribution | Core AI Coordinator within AI Interaction |
| AEN-CF-06 | contribution assurance finding | Core AI Coordinator within AI Interaction |
| AEN-CF-07 | Expert collaboration membership and lineage | Core AI Coordinator within AI Interaction |
| AEN-CF-08 | interaction-specific Expert evaluation observation | Core AI Coordinator within AI Interaction |
| AEN-CF-09 | governed Expert feedback observation | Core AI Coordinator; source feedback remains externally owned |
| AEN-CF-10 | unified AI response and final confidence | Core AI Coordinator |
| AEN-CF-11 | AI Action Proposal | Core AI Coordinator as proposal owner; target effect remains external |

The AEN-CF-01 owner is selected exclusively per Definition instance by publication path. It is
not shared, simultaneous, or optional ownership.

### 9.2 Write-model and aggregate navigation

| Documentation layer | Identifier or aggregate | Sole owner | Boundary navigation |
|---|---|---|---|
| Canonical AI write model | AEN-WM-01 Expert Registry write model | Core AI Coordinator | Core-held Definition/version and Coordinator metadata; exact Marketplace references only for Marketplace path |
| Canonical AI write model | AEN-WM-02 AI coordination write model | Core AI Coordinator | AI Interaction and AI-owned artifacts; no source or target write |
| Aggregate | Expert Registry Registration | Core AI Coordinator Expert Registry | path-specific content rule; no duplicated Marketplace content |
| Aggregate | Marketplace Asset / Marketplace Asset Version | Marketplace | Marketplace-published content, version, and Marketplace lifecycle facts |
| Aggregate | AI Interaction | Core AI Coordinator | selected versions, eligibility, contributions, collaboration, assurance, response, proposal, and observations |
| Aggregate | Audit Record | Core Audit Service | append-only consequential history |

External Marketplace, Decision, Recommendation, Configuration Proposal, target, and Audit write
models remain owned by their frozen services. This Wave does not reproduce them as AI write
models.

### 9.3 Logical read-model navigation

| ID | Logical read model | Projection owner | Canonical-source boundary |
|---|---|---|---|
| AEN-RM-01 | Expert Registry View | Core AI Coordinator | AEN-WM-01 plus referenced Marketplace versions; not Marketplace source |
| AEN-RM-02 | Expert Eligibility View | Core AI Coordinator | current external and Coordinator facts; time-bound eligibility projection |
| AEN-RM-03 | Expert Contribution View | Core AI Coordinator | AI Interaction |
| AEN-RM-04 | Collaboration Lineage View | Core AI Coordinator | AI Interaction |
| AEN-RM-05 | Contribution Assurance View | Core AI Coordinator | AI Interaction and permitted source references |
| AEN-RM-06 | Unified AI Response View | Core AI Coordinator | AI Interaction; never independent Expert chat |
| AEN-RM-07 | Expert Evaluation View | Core AI Coordinator | governed observations; never Knowledge, Marketplace Trust, or target truth |
| AEN-RM-08 | Expert Operations View | Core AI Coordinator | authorized telemetry and observations; not provider or incident source truth |
| AEN-RM-09 | Marketplace AI Expert Availability View | Marketplace | Marketplace write models; external eligibility context only |

Every read model remains permission-filtered, rebuildable, and non-canonical. A projection never
becomes an owner because it is listed, displayed, searched, or used during eligibility.

## 10. Cross-Milestone Ownership Navigation

| External subject | Canonical owner | AI Expert Network relationship | Primary baseline navigation |
|---|---|---|---|
| identity, Membership, Permission, and authorization context | applicable Core owner | consumes current explicit context only | Core Freeze; Proposal sections 13, 22, and 30 |
| Business DNA | Business DNA owner | consumes minimum authorized exact context | Genesis Business DNA; Proposal sections 18 and 24.2 |
| Knowledge and Knowledge Pack content | Knowledge Engine | consumes exact applicable versions; cannot publish or modify | Genesis Knowledge Engine; Proposal section 20 |
| Rule and Rule outcome | applicable Rules owner | consumes deterministic evidence | Core/Genesis Rules authority; Proposal section 24.2 |
| Capability | Capability Registry | references canonical identifier/version | Genesis Capabilities; Proposal sections 7 and 24.2 |
| completed Decision and candidate reasoning | Business Brain | consumes minimum completed Decision context after completion | Business Brain Freeze; Proposal section 18 |
| Recommendation and disposition | Recommendation Engine | may explain authorized context; never creates or disposes | Genesis Recommendation Engine; Proposal section 19 |
| Configuration Proposal | Configuration Engine | may reference when authorized; never creates canonical Configuration Proposal | Proposal section 21 |
| Marketplace Asset, Asset Version, and scoped state | Marketplace | consumes exact authorized state for eligibility | Marketplace Freeze; Proposal section 17 |
| target configuration and operational fact | applicable Core or Operating System owner | may receive a separate authorized proposal; AI never directly writes | frozen OS baselines; Proposal section 23 |
| Audit Record | Core Audit Service | submits attributable evidence only | ADR-038; Proposal section 32 |
| provider/model availability and provenance | existing deferred external boundary | records selected reference and observed provenance only | DD-AEN-04 and inherited Core D-36 |

The table centralizes navigation only. It neither completes the deferred provider boundary nor
transfers any external fact into the AI Expert Network.

## 11. AI Coordinator Component Navigation

The AI Expert Network uses the fifteen already-frozen AI Coordinator Components. It does not add a
second coordination plane.

| Sequence | Frozen Component | Documentation responsibility navigation |
|---:|---|---|
| 1 | Request Interpreter | request intent, language, desired outcome, domain, and risk |
| 2 | Authorization Context Resolver | current authorized organizational, OS, and resource scope |
| 3 | Context Builder | minimum purpose-bound owner-controlled context |
| 4 | Policy and Safety Engine | pre- and post-execution policy |
| 5 | Expert Registry | Core-held Definitions or exact Marketplace references plus Coordinator metadata |
| 6 | Expert Router | interaction-specific eligibility and selection |
| 7 | Instruction Assembler | bounded governed Expert instructions |
| 8 | Expert Execution Adapter | replaceable approved provider invocation under boundaries |
| 9 | Collaboration Orchestrator | multi-Expert coordination, disagreement, and gap treatment |
| 10 | Evidence and Claim Validator | material-claim validation and unsupported-content findings |
| 11 | Response Synthesizer | one unified Nexoraxs response |
| 12 | Confidence and Explainability Evaluator | final confidence, evidence, uncertainty, alternatives, and verification guidance |
| 13 | Action Proposal Broker | separate AI Action Proposal creation only when requested |
| 14 | Conversation Context Manager | scoped continuity under current authorization and retained policy |
| 15 | AI Audit and Observability | attributable evidence, telemetry, lineage, performance, and governed observations |

This sequence mirrors the approved logical flow for navigation. It does not prescribe runtime,
deployment, interface, persistence, or implementation order.

## 12. Patch and Re-Review Traceability

### 12.1 Patch-item precedence

| v0.1.1 item | Documentation subject | v0.1.2 treatment | Current reading status |
|---|---|---|---|
| PP-AEN-01 | Definition ownership | corrected by CR-AEN-01 and CR-AEN-04 | publication-path ownership controls |
| PP-AEN-02 | Marketplace representation boundary | compatible Marketplace-boundary wording preserved by CR-AEN-05; conflicting Definition-owner implication subject to CR-AEN-01/04 | preserved only within v0.1.2 boundary |
| PP-AEN-03 | version relationship | corrected by CR-AEN-02 and CR-AEN-04 | publication-path version owner controls; no mandatory paired Registry version |
| PP-AEN-04 | canonical fact, aggregate, and DADR wording | corrected by CR-AEN-01 through CR-AEN-04 | original publication-path fact and Draft ADR subject restored |
| PP-AEN-05 | Logical Responsibility Domains | preserved by CR-AEN-05 | six AEND areas remain responsibility partitions only |
| PP-AEN-06 | lifecycle separation | preserved by CR-AEN-05 | independent lifecycle concerns remain |
| PP-AEN-07 | evaluation boundary | preserved by CR-AEN-05 | governed observations only |

### 12.2 Finding closure

| Historical finding | Diagnostic result | Corrective location | Current result |
|---|---|---|---|
| F-AEN-RR-01 | v0.1.1 contradicted frozen publication-path canonical ownership | CR-AEN-01 and CR-AEN-04 | RESOLVED by Re-Review v0.1.2 |
| F-AEN-RR-02 | v0.1.1 introduced a paired version model and aggregate-content conflict | CR-AEN-02 through CR-AEN-04 | RESOLVED by Re-Review v0.1.2 |
| F-AEN-RR-03 | “creates or updates” could imply in-place Published Marketplace version mutation | CR-AEN-01 section 3.3 and CR-AEN-02 version invariants require a successor Published version | RESOLVED editorial ambiguity; remaining findings are zero |

### 12.3 Corrective Patch navigation

| Corrective item | Documentation subject | Architectural effect |
|---|---|---|
| CR-AEN-01 | restore mutually exclusive publication-path canonical ownership | restores approved Proposal/frozen baseline; no new decision |
| CR-AEN-02 | restore publication-path version ownership and exact reference | restores approved Proposal/frozen baseline; no new decision |
| CR-AEN-03 | restore path-specific aggregate allocation | restores approved Proposal/frozen baseline; no new decision |
| CR-AEN-04 | remove controlling effect of conflicting v0.1.1 wording and restore DADR-AEN-03 | no ADR or ownership change |
| CR-AEN-05 | preserve compatible v0.1.1 clarifications | no new Domain, Capability, owner, or lifecycle |

## 13. Risk, Open Question, Deferred Decision, and ADR Navigation

### 13.1 Open Question disposition

All sixty Discovery Open Questions are traced in Proposal section 37. A disposition of
`Resolved` means the Proposal defines the architectural boundary. `Partially resolved` means the
owner or invariant is fixed while policy detail remains deferred. `Deferred` means the Proposal
intentionally supplies no answer beyond its boundary and dependency references.

| Open Question group | Proposal navigation | Primary retained deferral area |
|---|---|---|
| OQ-AEN-01–06 — identity and definition | sections 9–11 and 37 | DD-AEN-02–04 where named |
| OQ-AEN-07–12 — categories, families, capabilities | sections 7, 10, and 37 | DD-AEN-01–02 |
| OQ-AEN-13–18 — lifecycle and versioning | sections 11–12 and 37 | DD-AEN-04–05, DD-AEN-13 |
| OQ-AEN-19–24 — eligibility, activation, discovery | sections 13, 17, and 37 | DD-AEN-04–07 |
| OQ-AEN-25–30 — context and scope | sections 13, 16, 22–23, and 37 | DD-AEN-06, DD-AEN-08–09, DD-AEN-13, DD-AEN-17 |
| OQ-AEN-31–36 — collaboration, conflict, synthesis | sections 14–15 and 37 | DD-AEN-10–12 |
| OQ-AEN-37–42 — outputs and owner boundaries | sections 15, 18–24, and 37 | DD-AEN-12–14 |
| OQ-AEN-43–48 — Security, privacy, Audit | sections 30–32 and 37 | DD-AEN-08, DD-AEN-13, DD-AEN-15–18 |
| OQ-AEN-49–54 — Governance, Marketplace, partners | sections 17, 34, 37–38 | DD-AEN-05, DD-AEN-16, DD-AEN-19 |
| OQ-AEN-55–60 — learning and operations | sections 33, 35–38 | DD-AEN-16, DD-AEN-19–23 |

This grouped navigation does not replace the exact row-by-row disposition in Proposal section 37
and does not answer any Open Question.

### 13.2 Deferred Decision register

`DD-AEN-01` through `DD-AEN-24` remain unresolved. They cover taxonomy and definition detail,
provenance, provider/model policy, detailed lifecycle and eligibility policy, context and
collaboration policy, evidence and retention, proposal classes, Security/privacy/Audit detail,
third-party participation, governed learning, measures, operational resilience, support, and all
future physical or implementation choices.

The following inherited deferrals also remain controlling:

- Core D-36 through D-40;
- Business Brain deferred decision 18;
- Commerce OS DD-32 through DD-37; and
- Marketplace DD-MP-01 through DD-MP-50.

No documentation statement, example, table, recommendation, or future diagram may be used as an
interim answer to one of these deferrals.

### 13.3 Draft ADR navigation

| Range | Status | Documentation rule |
|---|---|---|
| DADR-AEN-01 through DADR-AEN-12 | Draft subjects only | no accepted status, Governance number, or authority is implied |
| DADR-AEN-03 | `AI Expert Definition Publication-Path Ownership` | original Proposal wording controls; Registry-only v0.1.1 normalization is superseded |
| Accepted ADR-027 through ADR-032 and other inherited Accepted ADRs | external Governance authority | references remain dependencies; this Wave neither reopens nor duplicates them |

### 13.4 Risk navigation

`R-AEN-01` through `R-AEN-20` remain the approved Proposal risk register. The independent
Re-Review classifies them as unchanged and non-blocking. Documentation must continue to preserve
their controls and associated deferrals without treating a proposed control as a completed policy
or implementation.

## 14. Documentation Structure and Table Conventions

These conventions apply to this documentation layer and are recommendations for later Waves. They
do not rewrite prior artifacts.

### 14.1 Heading and numbering consistency

1. Use one H1 document title.
2. Use numbered H2 sections for the document's main reading order.
3. Use decimal H3 headings beneath the corresponding numbered H2.
4. Keep validation and recommendation near the end, followed by references.
5. Do not infer precedence from file name or heading number; use section 3.2.
6. Preserve source identifiers exactly rather than renumbering a register for presentation.

### 14.2 Table normalization

| Table purpose | Preferred columns | Documentation rule |
|---|---|---|
| owner table | subject, sole owner, boundary/source | never abbreviate an owner so far that publication-path ownership becomes ambiguous |
| capability table | ID, canonical name, home Domain, output boundary | distinguish AEC capability from canonical Capability |
| fact table | ID, canonical fact/artifact, sole owner, aggregate placement | state external ownership rather than implying an AI copy |
| write-model table | ID, write model, sole owner, writes, exclusions | one owner only; references are not writes |
| aggregate table | aggregate, sole owner, contains, excludes | path-specific content must not be mistaken for a new aggregate type |
| read-model table | ID, view, projection owner, canonical sources, boundary | always state that projection is not ownership |
| lifecycle table | lifecycle concern, owner, distinct concerns | do not invent one unified Expert Lifecycle |
| traceability table | source concern, target location, preserved boundary | trace without creating authority |
| validation table | validation, result, evidence | use `PASS`, `ZERO`, `NONE`, or an explicit status consistently |

### 14.3 Cross-reference consistency

- Link to the exact controlling artifact rather than citing “the architecture” generically.
- Cite Proposal and both Patches together when a subject is affected by precedence.
- Use Re-Review v0.1.2 for current approval; identify the v0.1.1 Re-Review as historical.
- Link to frozen owners for external facts instead of repeating their complete architecture.
- Use section and identifier references together where practical.
- Do not cite a Draft ADR as authority.
- Do not use this Wave as a source for an architectural decision.

## 15. Textual Diagram Recommendations

The following are documentation recommendations only. They describe useful future visual subjects
without specifying implementation or introducing a new flow.

| Recommendation | Textual subject | Existing source to visualize | Constraint |
|---|---|---|---|
| DR-01 | authority and document-precedence map | Wave sections 3–4 | distinguish historical audit artifacts from current controlling baseline |
| DR-02 | publication-path ownership fork | Proposal sections 9–11; Corrective Patch sections 3–5 | show exactly one owner per Definition instance and no duplicate Marketplace content |
| DR-03 | Logical Responsibility Domain containment | Proposal section 6; Corrective Patch section 7.1 | show six AEND areas inside one frozen AI Coordination Domain, not services |
| DR-04 | AI Coordinator governed contribution flow | Proposal section 29 | use the fifteen existing Components only and label the flow logical, not runtime |
| DR-05 | lifecycle-separation map | Proposal section 12; Corrective Patch section 7.2 | keep Core-held Definition, Marketplace, eligibility, Interaction, and provider concerns independent |
| DR-06 | external-owner boundary map | Proposal sections 17–24; Wave section 10 | arrows represent authorized references or proposals, never ownership transfer |
| DR-07 | fact-write-aggregate-read trace | Proposal sections 24–28 | distinguish canonical writes from disposable projections |
| DR-08 | Open Question-to-Deferred Decision map | Proposal sections 36–38 | retain unresolved status and avoid suggesting implementation sequence |

No diagram is created by this Wave. A later diagram may only visualize the cited baseline and
must be reviewed for semantic equivalence.

## 16. Documentation Improvement Register

Every improvement below has Architectural Impact `NONE`.

### 16.1 Navigation and organization improvements

| Reference | Documentation issue | Improvement | Reason | Architectural Impact |
|---|---|---|---|---|
| DI-01 | Three documents form the Proposal baseline, but file order alone does not reveal precedence. | Added one merged-baseline formula and explicit precedence summary. | Prevents superseded v0.1.1 wording from being treated as current. | NONE |
| DI-02 | Diagnostic and corrective artifacts are interleaved by filename. | Added a complete conceptual reading path. | Preserves history while making current interpretation clear. | NONE |
| DI-03 | Different readers need different portions of the milestone. | Added goal-based reading paths. | Reduces search effort and accidental partial reading. | NONE |
| DI-04 | Current and historical reviews share similar names. | Added an artifact-status table. | Directs approval checks to Re-Review v0.1.2. | NONE |
| DI-05 | Key subjects are distributed across forty-two Proposal sections. | Added subject-level navigation for owners, models, lifecycles, boundaries, and deferrals. | Improves internal navigation. | NONE |
| DI-06 | Future Waves need a consistent structure without rewriting earlier artifacts. | Added heading and numbering conventions. | Improves section consistency. | NONE |
| DI-07 | Source tables use different columns because they serve different lifecycle stages. | Added purpose-specific table conventions. | Improves table readability without normalizing away meaning. | NONE |
| DI-08 | Useful architecture relationships may later require visual explanation. | Added eight text-only diagram recommendations tied to approved sources. | Makes later visualization reviewable without creating architecture. | NONE |

### 16.2 Terminology and editorial improvements

| Reference | Documentation issue | Improvement | Reason | Architectural Impact |
|---|---|---|---|---|
| EI-01 | `AI Expert`, `AI Expert Definition`, and registration metadata can be read as one concept. | Added a canonical-term table and required distinctions. | Prevents identity, content, and registration ownership from collapsing. | NONE |
| EI-02 | Core-held and Marketplace-published version terms were the source of prior conflict. | Added publication-path naming rules. | Keeps the corrective Patch visible in ordinary reading. | NONE |
| EI-03 | Marketplace AI Expert terms can look like new Marketplace types. | Clarified that they are category-qualified references only. | Preserves Marketplace canonical terminology. | NONE |
| EI-04 | `Domain` can imply a bounded context or owner. | Standardized `Logical Responsibility Domain` for AEND areas. | Preserves Core AI Coordination containment. | NONE |
| EI-05 | AEC capabilities can be confused with canonical platform Capability. | Standardized `architectural capability` where distinction is required. | Preserves Capability Registry ownership. | NONE |
| EI-06 | Contribution, response, Recommendation, and proposal terms can be used loosely. | Added an output-term distinction matrix. | Protects canonical output ownership. | NONE |
| EI-07 | Activation, eligibility, selection, and Interaction start are easy to collapse. | Added separate canonical navigation for each concern. | Preserves lifecycle and authorization boundaries. | NONE |
| EI-08 | Repetition of full external architectures can cause wording drift. | Added concise owner navigation and a link-first rule. | Reduces future duplicate wording while preserving source authority. | NONE |

### 16.3 Traceability improvements

| Reference | Documentation issue | Improvement | Reason | Architectural Impact |
|---|---|---|---|---|
| TI-01 | Discovery, Capability Map, Proposal, and Re-Review have different authority roles. | Added phase-role traceability. | Prevents candidate content from being mistaken for approval. | NONE |
| TI-02 | Ten CDR relationship areas were consolidated into six AEND areas. | Added candidate-to-approved Domain traceability. | Preserves continuity and boundaries. | NONE |
| TI-03 | Capability names and output exclusions require manual comparison. | Added an eighteen-capability navigation table. | Makes responsibility leakage easier to detect. | NONE |
| TI-04 | Fact, write-model, aggregate, and read-model catalogs are separate. | Added a canonical-artifact navigation chain. | Makes source-of-truth and projection separation easier to audit. | NONE |
| TI-05 | External owners are spread across multiple Proposal boundary sections. | Added one cross-milestone ownership navigation table. | Protects inherited ownership. | NONE |
| TI-06 | Fifteen frozen AI Coordinator Components appear across Core and Proposal documents. | Added one component navigation sequence. | Demonstrates there is no second coordinator. | NONE |
| TI-07 | PP-AEN, CR-AEN, and F-AEN-RR identifiers span four quality-gate documents. | Added Patch precedence and finding-closure matrices. | Makes the corrective history auditable. | NONE |
| TI-08 | Sixty Open Questions and twenty-four Deferred Decisions require different reading rules. | Added group navigation and status guidance. | Preserves unresolved work without answering it. | NONE |
| TI-09 | Accepted ADR dependencies and Draft ADR subjects can be conflated. | Added ADR-status navigation, including restored DADR-AEN-03 wording. | Preserves Governance discipline. | NONE |

### 16.4 Improvement counts

| Improvement category | Count |
|---|---:|
| Navigation and organization | 8 |
| Terminology and editorial | 8 |
| Traceability | 9 |
| **Total documentation improvements** | **25** |

## 17. Duplicate-Wording and Editorial Guidance

Future AI Expert Network documents should:

1. reference the canonical owner matrix instead of restating external owner responsibilities in
   new language;
2. reference the v0.1.2 publication-path table whenever Definition content or version ownership
   is relevant;
3. reference AEN-CF, AEN-WM, aggregate, and AEN-RM identifiers rather than creating alternate
   labels;
4. repeat an invariant only where it prevents a local ambiguity, and link back to its controlling
   source;
5. preserve explicit exclusions when summarizing a Capability or Component;
6. identify candidate, approved, Draft, deferred, historical, and frozen status explicitly;
7. avoid converting examples from Genesis or Discovery into approved taxonomy or workflow;
8. avoid turning the logical Component sequence into implementation order;
9. avoid introducing synonyms for Expert Contribution, AI Action Proposal, Recommendation,
   Configuration Proposal, Marketplace Asset Version, or Expert Registry Registration; and
10. use `NONE` or `ZERO` consistently when validating documentation-only impact.

These rules reduce future duplicate wording. They do not edit or invalidate necessary repetition
already present in the approved audit trail.

## 18. Wave 1 Validation

### 18.1 Baseline preservation

| Validation | Result | Evidence |
|---|---|---|
| Architectural changes introduced | ZERO | all additions are navigation, terminology, traceability, conventions, or editorial guidance |
| Ownership changes | ZERO | publication-path and all external owners are reproduced without transfer |
| Capability changes | ZERO | AEC-01 through AEC-18 retain names, home Domains, and output boundaries |
| Domain changes | ZERO | AEND-01 through AEND-06 remain Logical Responsibility Domains inside AI Coordination Domain |
| Canonical fact changes | ZERO | AEN-CF-01 through AEN-CF-11 remain unchanged |
| Write-model changes | ZERO | AEN-WM-01 and AEN-WM-02 remain the only AI write models |
| Aggregate changes | ZERO | four approved aggregate boundaries remain unchanged |
| Read-model changes | ZERO | AEN-RM-01 through AEN-RM-09 remain logical projections |
| Lifecycle changes | ZERO | lifecycle concerns are indexed, not merged or altered |
| ADR changes | ZERO | Accepted ADRs remain external; twelve DADR subjects remain Draft |
| Deferred Decision changes | ZERO | DD-AEN-01 through DD-AEN-24 remain unresolved |
| Frozen baseline changes | ZERO | every upstream boundary is referenced without reinterpretation |

### 18.2 Documentation constraint validation

Wave 1 introduces:

- no architecture;
- no new owner or ownership interpretation;
- no API or endpoint;
- no Contract;
- no Event or payload;
- no database or persistence design;
- no infrastructure;
- no runtime or deployment topology;
- no framework, provider, vendor, or technology;
- no implementation sequence;
- no new ADR or Draft ADR subject;
- no new Deferred Decision; and
- no resolution of an existing Deferred Decision.

### 18.3 Documentation quality validation

| Quality objective | Result |
|---|---|
| Cross references improved | PASS |
| Internal navigation improved | PASS |
| Section and heading guidance normalized | PASS |
| Terminology and naming aligned | PASS |
| Governance Glossary navigation added | PASS |
| Table conventions documented | PASS |
| Identifier and numbering consistency documented | PASS |
| Text-only diagram recommendations added | PASS |
| Candidate-to-approved traceability improved | PASS |
| Canonical reference consistency improved | PASS |
| Duplicate wording guidance added | PASS |
| Reader and maintainer guidance improved | PASS |
| Architecture authority added | NONE |

**Architectural changes introduced: 0**

## 19. Recommendation

# READY FOR DOCUMENTATION WAVE 2

Documentation Wave 1 completes its documentation-quality scope. Later Waves may use its
navigation, terminology, conventions, and traceability tables, but must continue to treat Proposal
Baseline v0.1.2 as the architecture authority and preserve every frozen owner, all twenty-four
Deferred Decisions, and all twelve Draft ADR subjects.

## References

### AI Expert Network milestone

- [AI Expert Network Discovery v0.1](00-AI-EXPERT-NETWORK-DISCOVERY.md)
- [AI Expert Network Capability Map v0.1](01-AI-EXPERT-NETWORK-CAPABILITY-MAP.md)
- [AI Expert Network Proposal v0.1](02-AI-EXPERT-NETWORK-PROPOSAL.md)
- [AI Expert Network Proposal Patch v0.1.1](03-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.1.md)
- [AI Expert Network Corrective Proposal Patch v0.1.2](03A-AI-EXPERT-NETWORK-PROPOSAL-PATCH-v0.1.2.md)
- [AI Expert Network Re-Review for Baseline v0.1.1](04-AI-EXPERT-NETWORK-RE-REVIEW.md)
- [AI Expert Network Conflict Analysis](04A-AI-EXPERT-NETWORK-CONFLICT-ANALYSIS.md)
- [AI Expert Network Independent Re-Review v0.1.2](04B-AI-EXPERT-NETWORK-RE-REVIEW-v0.1.2.md)

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
- [Genesis Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [Genesis Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md)
- [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Genesis Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

### Frozen milestone authorities

- [Core Platform Principles](../02-core-platform/00-CORE-PLATFORM-PRINCIPLES.md)
- [Core Platform Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)
- [Core Platform Data Ownership](../02-core-platform/04-DATA-OWNERSHIP.md)
- [Core Platform Permission Model](../02-core-platform/05-PERMISSION-MODEL.md)
- [Core Platform Security Model](../02-core-platform/08-SECURITY-MODEL.md)
- [Core Platform Freeze v1.0](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Core Platform Readiness v1.0.1](../99-architecture-freeze/CORE-PLATFORM-v1.0.1-READINESS.md)
- [Business Brain Freeze v1.0](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Commerce OS Freeze v1.0](../99-architecture-freeze/COMMERCE-OS-v1.0-FREEZE.md)
- [Marketplace Freeze v1.0](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md)

### Directly relevant Accepted ADRs

- [ADR-006 — Workspace Intelligence Explicit Aggregation](../00-governance/ADR/ADR-006-workspace-intelligence-explicit-aggregation.md)
- [ADR-009 — Shared Versioned Immutable Knowledge](../00-governance/ADR/ADR-009-shared-versioned-immutable-knowledge.md)
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
