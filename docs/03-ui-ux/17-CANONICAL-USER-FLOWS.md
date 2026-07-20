# Canonical User Flow Authority

| Field | Value |
|---|---|
| Version | 1.0 Phase 4 authority candidate |
| Status | Canonical semantic-flow authority candidate; implementation is not authorized |
| Owner | Product Experience Governance; canonical actions remain controlled by their owning domains |
| Controlling architecture | Core Platform Architecture v1.1 Freeze |
| Journey input | Canonical Journey Mapping v1.0 |
| Evidence snapshot | 2026-07-20 |
| Successor use | Input to future presentation-state, wireframe, and feature-specification milestones only after their applicable approval gates |

## Authority Boundary

This document is the single stage-to-flow traceability authority for Phase 4. It translates the
approved architecture sequence into semantic actor flows. It does not create a domain lifecycle,
screen design, route, state machine, wireframe, API, Contract, Event, service, schema, persistence
mechanism, feature specification, or implementation task.

The controlling order used here is:

1. [Core Platform Architecture v1.1 Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md);
2. Accepted Architecture Decision Records;
3. [Foundation Baseline v0.1](../00-governance/FOUNDATION-BASELINE-v0.1.md) and the
   [Foundation Journey Successor Addendum v1.0](../01-genesis/21-FOUNDATION-JOURNEY-SUCCESSOR-ADDENDUM-v1.0.md);
4. approved Core Platform and Business Brain boundary documents;
5. the [Canonical Journey Mapping](./16-CANONICAL-JOURNEY-MAPPING.md); and
6. current UI/UX documents and frontend source as evidence only.

The existing `UIAUTH-HYGIENE-001` Genesis-source mismatch recorded by the Journey Mapping remains
unresolved. This document therefore relies on the controlling Freeze, Accepted ADRs, Foundation
Baseline, and approved Genesis successor addendum. It neither repairs nor conceals that issue.

# 1. Purpose

## 1.1 Why User Flows exist

Canonical journeys define the ordered customer and ownership outcomes. User flows make each outcome
reviewable by identifying the actor, trigger, context, checks, normal and alternative paths,
recoveries, and exit conditions without choosing an implementation.

They exist to prevent later design or feature work from:

- omitting an architecture stage;
- bypassing authenticated ownership, review, correction, or explicit approval;
- turning a projection into a source of truth;
- merging Core and Operating System responsibilities;
- treating a current route as target authority; or
- inventing business behavior to fill a documentation gap.

## 1.2 Relationship to the Journey

The [Canonical Journey Mapping](./16-CANONICAL-JOURNEY-MAPPING.md) controls the 25 stage identifiers
`CJ-00` through `CJ-24`. Every stage is covered by at least one flow in this document. A flow may
cover adjacent stages only when the architecture does not require a separate customer interaction.
The flow never replaces the Journey stage or its canonical owner.

## 1.3 Relationship to State Machines

This document records ordered interactions and decision branches, not states or transitions. A
future state-authority milestone may derive presentation-state requirements from these flows while
preserving the distinctions in [Presentation State Authority](./07-STATE-MACHINES.md). It must not
promote flow labels into domain or Session states.

## 1.4 Relationship to Wireframes

Future wireframes may decide visual composition, responsive placement, and interaction hierarchy
only after the applicable authority gate. They must demonstrate every normal, alternative, error,
permission, empty, and recovery path identified here. This document creates no wireframe or screen
layout.

## 1.5 Relationship to Feature Specifications

An approved feature specification may select a bounded subset of these flows and then define the
missing owner rules, contracts, permissions, validation, tests, and implementation scope. The flow
catalog is not a substitute for `spec.md`, `plan.md`, `tasks.md`, or Constitution Checks and does
not authorize Feature 056.

# 2. Flow Principles

## 2.1 Single source of truth

This document is the canonical catalog of semantic Foundation/Core user flows for Phase 4. Earlier
[User Flows](./06-USER-FLOWS.md) remain useful reconciled evidence, but their broad `F-*` groupings
do not replace the stage-level `FLOW-*` records here. Architecture and owning domains remain the
sources of truth for canonical facts and actions.

## 2.2 No implementation details

Flows use semantic destinations and owner responses. They do not define URLs, components, storage,
protocols, tokens, APIs, DTOs, Events, queues, services, databases, retries, timeouts, or technology.
Where authority requires retry safety or recovery, the requirement is recorded without choosing a
mechanism.

## 2.3 Business-first

Understanding and customer value precede product adoption. Facts, Inferences, Assessments, Needs,
Desired Outcomes, Capabilities, and Implementation Options remain distinct. A Recommendation may be
absent, may retain current tools, and never forces a NexoraXS product.

## 2.4 Actor-driven

Every flow identifies a primary actor and any supporting authority. A platform capability may
produce an owner-controlled result, but the UI never impersonates a customer decision or canonical
owner.

## 2.5 Permission-aware

Authentication never implies authorization. Protected flows revalidate Workspace, Business,
resource, action, and Operating System context as applicable. A client-selected identifier or
visible destination is never proof of access.

## 2.6 Recoverable

Every flow defines safe interruption, validation, error, permission-denied, and return behavior as
far as approved authority permits. Recovery never silently publishes, purchases, configures,
repeats a consequential action, or leaks protected data.

## 2.7 Localization-independent

Semantic intent is identical across locales and directions. English/LTR and Arabic/RTL are
first-class; language, direction, formatting, copy length, or translation fallback cannot change an
owner, permission, approval, or journey outcome.

## 2.8 Frontend-independent

Current pages and components are evidence only. A flow may map to no page, one page, a shared
surface, or multiple later surfaces. Exact decomposition is deferred.

## 2.9 Backend-independent

Inputs and owner outcomes name required information, not contracts or persistence. Missing backend
authority is reported as a dependency rather than inferred from frontend mock data.

## 2.10 Common safety contract

All flows inherit these rules:

1. no anonymous Workspace or Business is created;
2. candidate material is temporary and non-canonical;
3. canonical publication requires authenticated Business context, material review, correction
   opportunity, and explicit approval;
4. “Next”, “Continue”, registration, verification, or form completion is never publication
   approval;
5. Business Blueprint is a governed authenticated non-writing projection;
6. Recommendations are optional and owner-controlled;
7. Product Hub composes and hands off but does not own source records or OS operations;
8. Core Workspace Ready and Operating System Ready are distinct; and
9. customer-facing flows require Arabic/English parity, accessibility, and safe recovery.

# 3. Flow Inventory

| Flow ID | Name | Journey stage coverage | Kind | Current evidence |
|---|---|---|---|---|
| FLOW-001 | Public Entry Choice | CJ-00 | Primary | Landing exists; target hierarchy incomplete |
| FLOW-002 | Business Discovery | CJ-01 | Primary | Missing |
| FLOW-003 | Candidate Construction | CJ-02, CJ-03 | Supporting Core response | Missing presentation |
| FLOW-004 | Candidate Understanding Presentation | CJ-04 | Primary | Missing |
| FLOW-005 | Understanding Reflection and Correction | CJ-05 | Primary | Missing |
| FLOW-006 | Business Report Preview | CJ-06 | Primary | Missing |
| FLOW-007 | Create Workspace Intent | CJ-07 | Primary | Adjacent CTA evidence only |
| FLOW-008 | Registration | CJ-08 | Compatible identity branch | Existing partial screen |
| FLOW-009 | Login | CJ-08 | Compatible identity branch | Existing partial screen |
| FLOW-010 | Conditional Identity Verification | CJ-08 | Supporting identity flow | Existing partial screen and alias |
| FLOW-011 | Identity Recovery | CJ-08 | Supporting identity flow | Existing partial screens |
| FLOW-012 | Workspace Resolution | CJ-09 | Primary | Partial/conflicting mock |
| FLOW-013 | Business Resolution | CJ-10 | Primary | Canonical destination missing |
| FLOW-014 | Authenticated Candidate Conversion | CJ-11 | Primary | Missing |
| FLOW-015 | Authenticated Candidate Acquisition | CJ-12 | Direct-registration convergence | Missing |
| FLOW-016 | Material Candidate Review and Correction | CJ-12 | Primary | Missing |
| FLOW-017 | Explicit Publication Approval | CJ-13 | Primary consequential flow | Missing |
| FLOW-018 | Business DNA v1 Publication Result | CJ-14 | Owner-result presentation | Missing |
| FLOW-019 | Guided Activation | CJ-15 | Primary | Missing |
| FLOW-020 | Business Blueprint | CJ-16 | Primary projection flow | Missing |
| FLOW-021 | Optional Recommendation Review | CJ-17 | Conditional | Missing |
| FLOW-022 | Core Workspace Ready Entry | CJ-18 | Primary Core destination | Dashboard partial/conflicting |
| FLOW-023 | Product Hub Composition | CJ-19 | Primary Core destination | Partial mock |
| FLOW-024 | Operating System Selection | CJ-20 | Conditional | Partial/stale evidence |
| FLOW-025 | OS-Specific Setup Handoff and Continuation | CJ-21 | Conditional owner handoff | Commerce setup evidence |
| FLOW-026 | Operating System Ready Launch | CJ-22 | Conditional owner result | Commerce evidence |
| FLOW-027 | Operational Dashboard and Daily Operations Entry | CJ-23 | Conditional OS-owned flow | Substantial Commerce mock evidence |
| FLOW-028 | Growth and Marketplace Entry | CJ-24 | Later conditional scope | Missing |
| FLOW-029 | Returning and Resuming Customer Resolution | CJ-01–CJ-23 as applicable | Cross-journey | Partial routing evidence |
| FLOW-030 | Locale and Direction Change | CJ-00–CJ-24 where presented | Cross-journey | Partial current evidence |
| FLOW-031 | Correction, Failure, and Safe Recovery | CJ-01–CJ-24 where applicable | Cross-journey | Uneven current evidence |

# 4. Flow Definitions

## 4.1 Reading the definitions

“Validation” means an approved owner must validate the input or action; it does not define how.
“Current status” describes repository evidence, not production readiness. “Related screens” uses
semantic destinations and verified current pages; it does not approve a URL.

## FLOW-001 — Public Entry Choice

- **Flow ID:** FLOW-001
- **Journey Stage:** CJ-00 — Visitor / Public Entry.
- **Primary Actor:** Visitor.
- **Supporting Actors:** Landing presentation; Core Discovery and Identity boundaries as the next
  owners.
- **Purpose:** Let a visitor deliberately choose value exploration, Register, Login, or safe exit.
- **Trigger:** The visitor reaches a public NexoraXS entry.
- **Preconditions:** None; no Workspace, Business, membership, entitlement, or OS context exists.
- **Inputs:** Public product information, available locale/direction, and the visitor’s selected
  intent.
- **Business Rules:** Discovery is the primary value path but is not mandatory; direct Register and
  Login remain valid; public presentation creates no tenant authority.
- **Normal Path:** Present the public value proposition → offer Business Discovery and identity
  entry without false equivalence → visitor chooses one path → hand off to FLOW-002, FLOW-008, or
  FLOW-009.
- **Alternative Paths:** The visitor leaves; follows an authorized returning-customer entry; or
  changes locale through FLOW-030.
- **Permission Checks:** Public content requires no tenant permission; a protected deep link must
  enter authentication and later authorization resolution.
- **Validation Rules:** Each action must disclose its consequence; no CTA may imply Workspace,
  Business, Business DNA, subscription, or OS creation.
- **Error Conditions:** Public content or a selected destination is unavailable; a protected target
  cannot be resolved safely.
- **Recovery Paths:** Retry the public destination, select another valid entry, change locale, or
  leave without side effects.
- **Exit Conditions:** A deliberate Discovery, Register, Login, returning-context, or exit choice.
- **Success Result:** The visitor enters the chosen owner boundary without hidden canonical change.
- **Related Screens:** Current Landing `/` is a **Refactor** candidate; no new route is approved.
- **Authority References:** Freeze §§5.1–5.3; ADR-042 §§1, 7–8; ADR-043 “Direct-registration
  compatibility”; Journey Mapping CJ-00.
- **Current Status:** Partial current screen evidence; target CTA hierarchy is not implemented or
  approved for implementation.
- **Future Dependencies:** Approved public-entry UX, accessible localized copy, analytics authority,
  and feature specification.

## FLOW-002 — Business Discovery

- **Flow ID:** FLOW-002
- **Journey Stage:** CJ-01 — Business Discovery.
- **Primary Actor:** Visitor or authenticated customer.
- **Supporting Actors:** Core-owned Business Discovery capability and authorized Knowledge sources.
- **Purpose:** Acquire only the material knowledge needed for a defined Discovery Goal using an
  appropriate approved method.
- **Trigger:** The actor chooses Discovery or an authenticated candidate path identifies a material
  Knowledge Gap.
- **Preconditions:** A Discovery Goal can be established; authentication is not required for the
  public path; no anonymous Workspace or Business is created.
- **Inputs:** Discovery Goal, Discovery Strategy, known material, Knowledge Gaps, approved Knowledge
  Acquisition Methods, and actor-authorized source material.
- **Business Rules:** Infer before asking; Discovery is method-independent; Guided Business
  Conversation is one experience pattern only; collection stops at approved sufficiency for the
  current goal.
- **Normal Path:** Establish the goal → distinguish known material from material gaps → select or
  offer an appropriate acquisition method → acquire authorized evidence → disclose confidence and
  provenance as applicable → continue to FLOW-003.
- **Alternative Paths:** Choose another approved method; correct the goal/material; enter direct
  registration; pause or discard; or stop when the current goal is sufficiently met.
- **Permission Checks:** Public Discovery grants no tenant authority; access to protected sources
  requires the source owner’s authorization; authenticated Discovery remains scoped to its actor
  and selected context.
- **Validation Rules:** Acquired material must remain distinguishable by source and knowledge type;
  material uncertainty and contradictions cannot be hidden; exhaustive collection is forbidden.
- **Error Conditions:** Acquisition method failure, unavailable source, insufficient evidence,
  invalid continuity, or an owner-declared privacy/authorization failure.
- **Recovery Paths:** Retry where safe, select another approved method, correct supplied material,
  return to public entry, or resume only when future retention authority permits.
- **Exit Conditions:** Material proceeds to candidate construction, the actor chooses identity
  entry, or the flow ends without canonical creation.
- **Success Result:** Provenance-aware material sufficient for the current Discovery Goal, still
  temporary and non-canonical.
- **Related Screens:** Business Discovery is a **Future** semantic destination; current frontend has
  no verified screen.
- **Authority References:** Freeze §5.1; ADR-042 §§1–3; ADR-043 “ADR-015 relationship”; Foundation
  §§8, 11, 13.1; Journey Mapping CJ-01.
- **Current Status:** Architecture complete; presentation and implementation missing.
- **Future Dependencies:** Discovery experience choice, privacy/retention approval, source-specific
  authorization, owner contracts, accessibility/localization design, and feature specification.

## FLOW-003 — Candidate Construction

- **Flow ID:** FLOW-003
- **Journey Stage:** CJ-02 — Business Mapping; CJ-03 — Business Understanding.
- **Primary Actor:** Customer whose authorized material is being understood.
- **Supporting Actors:** Core Business Mapping responsibility and Business Understanding
  responsibility.
- **Purpose:** Transform acquired material into structured, provenance-aware Candidate Business
  Understanding without creating canonical truth.
- **Trigger:** FLOW-002 yields authorized material, or the authenticated candidate path yields new
  evidence.
- **Preconditions:** Input material and its source relationship are available; no publication
  approval is implied.
- **Inputs:** Observed material, Evidence, Original Sources, corrections, known contradictions,
  confidence, and the current Discovery Goal.
- **Business Rules:** Observed Fact, Inference, Business Assessment, Need/Priority, Desired Outcome,
  and Recommendation remain distinct; mapping/understanding may not authorize actions or configure
  an OS.
- **Normal Path:** Accept authorized input → preserve provenance → normalize material without
  relabeling inference as fact → identify material gaps/contradictions → produce or update temporary
  candidate understanding → continue to FLOW-004.
- **Alternative Paths:** Insufficient material returns to FLOW-002; contradictions continue to
  FLOW-005 for visible reflection; material outside the goal is not collected merely for
  completeness.
- **Permission Checks:** Source access and authenticated context are revalidated where applicable;
  no pre-registration tenant permission is fabricated.
- **Validation Rules:** Preserve knowledge-type separation, provenance, confidence, contradictions,
  and correction history; do not publish or configure.
- **Error Conditions:** Material cannot be interpreted safely, its source is unavailable, or a
  contradiction prevents responsible candidate presentation.
- **Recovery Paths:** Request only the necessary gap through FLOW-002, permit customer correction,
  disclose inability to derive a result, or exit safely.
- **Exit Conditions:** A reviewable Candidate Business Understanding exists, or more evidence is
  explicitly required.
- **Success Result:** Temporary candidate material ready for presentation, never Business DNA.
- **Related Screens:** No standalone screen is required; Journey Mapping merges this responsibility
  into Discovery feedback and Candidate Reflection.
- **Authority References:** Freeze §§5.1–5.2; Foundation §§8–9 and 13; ADR-042 §§3–5; Journey Mapping
  CJ-02 and CJ-03.
- **Current Status:** No verified presentation or production owner integration.
- **Future Dependencies:** Owner calculation/validation specification, presentation feedback rules,
  source contracts, and tests; physical engine design remains outside this flow.

## FLOW-004 — Candidate Understanding Presentation

- **Flow ID:** FLOW-004
- **Journey Stage:** CJ-04 — Candidate Business Understanding.
- **Primary Actor:** Visitor or authenticated selected-Business participant.
- **Supporting Actors:** Core candidate owner boundary and authorized evidence sources.
- **Purpose:** Present temporary understanding clearly enough for informed reflection without
  implying canonical ownership.
- **Trigger:** FLOW-003 produces reviewable candidate material.
- **Preconditions:** Candidate material is available and remains temporary; the actor may view the
  material in the current context.
- **Inputs:** Candidate facts, Inferences, Assessments, needs, confidence, provenance,
  contradictions, unanswered gaps, and corrections.
- **Business Rules:** Candidate material is non-canonical, non-authorizing, correctable, and unable
  to configure an OS; before conversion it has no Workspace or Business owner.
- **Normal Path:** Present temporary status → separate supplied facts from derived knowledge → show
  material confidence/provenance and gaps → invite reflection → continue to FLOW-005.
- **Alternative Paths:** Return for more Discovery; postpone; discard when permitted; or, after
  sufficient reflection, continue toward preview or authenticated review.
- **Permission Checks:** Public material is limited to the current permitted candidate context;
  authenticated material requires actor and selected-context authorization.
- **Validation Rules:** Temporary and canonical labels must be unambiguous; protected evidence must
  not be exposed; uncertainty cannot be presented as certainty.
- **Error Conditions:** Candidate unavailable, incomplete beyond useful presentation, stale,
  conflicted, or inaccessible.
- **Recovery Paths:** Retry owner projection, return to FLOW-002, use FLOW-031 for correction/error,
  or leave without publication.
- **Exit Conditions:** The actor enters reflection, asks for more acquisition, pauses, or exits.
- **Success Result:** The actor understands what the platform currently believes and why, without
  mistaking it for Business DNA.
- **Related Screens:** **Future** Candidate Understanding destination; no current screen.
- **Authority References:** Freeze §5.2; ADR-042 §§3–4; Foundation §§10 and 13.2; Journey Mapping
  CJ-04.
- **Current Status:** Missing from current frontend; concept is architecturally complete.
- **Future Dependencies:** Approved candidate presentation, confidence/provenance semantics,
  permission filtering, recovery rules, wireframes, and feature specification.

## FLOW-005 — Understanding Reflection and Correction

- **Flow ID:** FLOW-005
- **Journey Stage:** CJ-05 — Understanding Reflection.
- **Primary Actor:** Candidate reviewer.
- **Supporting Actors:** Candidate owner boundary and authorized evidence/understanding owners.
- **Purpose:** Let the actor inspect, challenge, confirm, or correct material understanding before
  preview or publication.
- **Trigger:** FLOW-004 presents candidate understanding or a later flow requests correction.
- **Preconditions:** Candidate material is reviewable; correction authority is available for the
  current actor/context.
- **Inputs:** Material facts, Inferences, Assessments, assumptions, confidence, provenance,
  contradictions, and customer correction.
- **Business Rules:** Clear low-risk direct facts may not require repeated confirmation; inferred,
  consequential, conflicting, or low-confidence material requires explicit review; correction
  preserves provenance.
- **Normal Path:** Identify material under review → distinguish knowledge types → expose evidence,
  uncertainty, and contradictions → actor confirms or corrects → owner validates the correction →
  refresh candidate presentation → continue when material review is sufficient.
- **Alternative Paths:** Request more evidence through FLOW-002; leave an unresolved item visible;
  postpone; or return to FLOW-004 without approval.
- **Permission Checks:** Only authorized candidate material is shown; a customer correction does not
  grant canonical write authority.
- **Validation Rules:** Confirmation is selective and policy-driven; correction and publication
  approval are separate; historical source distinction is retained.
- **Error Conditions:** Correction rejected by owner validation, evidence unavailable, conflict
  unresolved, or permission changes during review.
- **Recovery Paths:** Preserve safe correction input, explain owner feedback, return to the affected
  item, request evidence, change authorized context, or exit.
- **Exit Conditions:** Material is reviewed sufficiently for FLOW-006 or FLOW-016, or the actor
  pauses/exits with no canonical change.
- **Success Result:** A corrected, reviewable candidate whose provenance and uncertainty remain
  visible.
- **Related Screens:** Candidate Reflection/Correction is a **Future or shared** destination; no
  current screen.
- **Authority References:** ADR-042 §4; Foundation §§11.3 and 13.2; Freeze §§5.2–5.4; Journey Mapping
  CJ-05.
- **Current Status:** Missing.
- **Future Dependencies:** Materiality policy, correction permissions, owner validation rules,
  presentation design, and feature specification.

## FLOW-006 — Business Report Preview

- **Flow ID:** FLOW-006
- **Journey Stage:** CJ-06 — Business Report Preview.
- **Primary Actor:** Visitor.
- **Supporting Actors:** Core Report Projection and governed candidate/insight/recommendation owners.
- **Purpose:** Deliver credible, useful value before registration while keeping the result temporary.
- **Trigger:** Public candidate material has completed sufficient reflection for the current goal.
- **Preconditions:** Reviewable temporary understanding exists; no authenticated Business owner or
  canonical publication is implied.
- **Inputs:** Candidate understanding, material facts/inferences/assessments, needs/priorities,
  desired outcomes, capability-first advice where appropriate, confidence, evidence, and remaining
  gaps.
- **Business Rules:** Preview is not Business DNA, Business Blueprint, a governed Recommendation
  aggregate, entitlement, subscription, implementation plan, or commitment; NexoraXS products are
  disclosed only when appropriate.
- **Normal Path:** Present a useful temporary summary → disclose evidence, assumptions, confidence,
  and remaining gaps → offer correction through FLOW-005 → offer deliberate continuation through
  FLOW-007 or safe exit.
- **Alternative Paths:** Recommend no product; suggest retaining current tools; return to Discovery;
  pause/discard; or enter identity without converting.
- **Permission Checks:** Show only material authorized for the current candidate context; protected
  external sources remain filtered.
- **Validation Rules:** Do not present candidate content as canonical or guaranteed; preserve
  Product Ethics and knowledge-type distinctions.
- **Error Conditions:** Projection unavailable, evidence too incomplete for credible value, or
  candidate continuity invalid.
- **Recovery Paths:** Retry the projection, return to reflection/acquisition, disclose unavailable
  sections, or exit without loss of canonical data because none exists.
- **Exit Conditions:** The actor chooses Workspace intent, correction, further Discovery, identity
  without conversion, or exit.
- **Success Result:** Meaningful pre-registration value with a clear temporary status and deliberate
  next choice.
- **Related Screens:** Business Report Preview/Value Preview is a **Future** semantic destination.
- **Authority References:** ADR-042 §§6–8; Foundation §§7 and 10; Addendum §3.1 and rule 9; Journey
  Mapping CJ-06.
- **Current Status:** Missing.
- **Future Dependencies:** Preview content policy, permission filtering, explanation policy,
  responsive/accessibility design, and feature specification.

## FLOW-007 — Create Workspace Intent

- **Flow ID:** FLOW-007
- **Journey Stage:** CJ-07 — Create Workspace Intent.
- **Primary Actor:** Visitor.
- **Supporting Actors:** Public preview presentation and Identity boundary.
- **Purpose:** Capture the visitor’s deliberate choice to continue toward durable authenticated
  ownership without creating that ownership anonymously.
- **Trigger:** The visitor selects continue/save/deepen from FLOW-006.
- **Preconditions:** A preview or public value context exists; no Workspace or Business has been
  created.
- **Inputs:** Continue choice and permitted candidate-continuity context.
- **Business Rules:** Intent is not Workspace creation, Business creation, membership, publication,
  subscription, or OS selection; registration remains a separate identity flow.
- **Normal Path:** Explain durable continuation and ownership boundary → actor confirms intent →
  choose Register or Login → continue to FLOW-008 or FLOW-009.
- **Alternative Paths:** Return to preview/correction; leave; discard; or proceed to identity without
  candidate conversion.
- **Permission Checks:** Not applicable to tenant resources; protected candidate continuity remains
  limited to its permitted context.
- **Validation Rules:** The chosen action must not be described as approval of Business DNA or terms
  not actually governed here.
- **Error Conditions:** Identity destination unavailable or candidate continuity cannot be retained.
- **Recovery Paths:** Return to preview, retry identity entry, continue without candidate transfer
  when explicitly disclosed, or exit.
- **Exit Conditions:** Registration, Login, preview return, or safe public exit.
- **Success Result:** A deliberate authentication entry choice with no anonymous canonical records.
- **Related Screens:** Shared with Preview CTA and existing Login/Register entry; no standalone
  screen is required.
- **Authority References:** Foundation §§12 and 16; ADR-042 §8; Addendum §3.1; Journey Mapping CJ-07.
- **Current Status:** Adjacent Landing/auth CTA evidence only.
- **Future Dependencies:** Continuity and privacy decision, approved CTA/copy, identity handoff
  specification, and recovery behavior.

## FLOW-008 — Registration

- **Flow ID:** FLOW-008
- **Journey Stage:** CJ-08 — Identity.
- **Primary Actor:** New customer.
- **Supporting Actors:** Core Identity owner; conditional verification flow.
- **Purpose:** Establish an authenticated identity that can later resolve authorized Workspace and
  Business context.
- **Trigger:** New customer chooses Register from FLOW-001 or FLOW-007.
- **Preconditions:** The actor is not using an existing identity for this entry; candidate continuity
  may or may not exist.
- **Inputs:** Identity registration information required by the future Identity specification and
  permitted candidate-continuity reference if applicable.
- **Business Rules:** Registration data is not Business truth and cannot publish Business DNA;
  registration creates no automatic OS access; verification is conditional when required by owner
  policy.
- **Normal Path:** Present registration requirements → actor supplies identity information → Identity
  owner validates → establish or require verification → continue to FLOW-010 when required or
  FLOW-012 otherwise.
- **Alternative Paths:** Existing customer chooses FLOW-009; actor returns to public value; candidate
  continuity is unavailable and continuation is disclosed safely.
- **Permission Checks:** Public registration grants identity only; Workspace/Business authorization
  is resolved later.
- **Validation Rules:** Apply owner-approved identity validation; do not request Business facts as a
  substitute for candidate review; acceptance of identity terms is not publication approval.
- **Error Conditions:** Invalid identity input, existing identity conflict, verification required,
  registration unavailable, or candidate continuity failure.
- **Recovery Paths:** Correct identity input, choose Login/recovery, complete verification, retry,
  return to public entry, or continue without candidate transfer only when explicitly permitted.
- **Exit Conditions:** Verified/conditionally authenticated identity proceeds to Workspace
  resolution, or the actor exits safely.
- **Success Result:** Identity evidence sufficient to begin authenticated context resolution; no
  Business DNA publication.
- **Related Screens:** Existing Core Register `/register` requires **Refactor**; exact target route is
  not approved.
- **Authority References:** Freeze §§5.3–5.4; ADR-042 §8 and Compatibility; ADR-043 “Direct-registration
  compatibility”; Addendum §§3.1–3.2; Journey Mapping CJ-08.
- **Current Status:** Existing partial browser-mock screen; production identity behavior unverified.
- **Future Dependencies:** Identity feature specification, verification policy, security/privacy,
  continuity policy, localization/accessibility, and contracts.

## FLOW-009 — Login

- **Flow ID:** FLOW-009
- **Journey Stage:** CJ-08 — Identity.
- **Primary Actor:** Returning or already-registered customer.
- **Supporting Actors:** Core Identity and authorization/context owners.
- **Purpose:** Authenticate an existing identity and proceed to safe owner-context resolution.
- **Trigger:** Actor chooses Login, reaches a protected destination, or must reauthenticate.
- **Preconditions:** An existing identity or recognized authentication path is available.
- **Inputs:** Identity authentication information and an optional semantic return intent.
- **Business Rules:** Authentication never implies authorization; Login does not recreate canonical
  understanding or force Discovery; protected return targets are revalidated.
- **Normal Path:** Present identity authentication → owner validates → resolve any required
  verification → continue to FLOW-029 for returning context or FLOW-012 for first-time Workspace
  resolution.
- **Alternative Paths:** Registration, identity recovery, public Discovery, safe exit, or context
  selection after authentication.
- **Permission Checks:** Protected target and tenant/resource authorization are evaluated only after
  authentication; failure must not reveal protected content.
- **Validation Rules:** Apply Identity-owner validation; ignore untrusted target/context identifiers
  until authorization resolves them.
- **Error Conditions:** Invalid credentials, unavailable authentication, required verification,
  expired authentication, or invalid return target.
- **Recovery Paths:** Retry, FLOW-011 recovery, FLOW-010 verification, safe public return, or
  authorized context selection.
- **Exit Conditions:** Authenticated actor enters safe context resolution or exits.
- **Success Result:** Authenticated identity with no assumption about Workspace, Business, OS, or
  canonical publication.
- **Related Screens:** Existing Core Login `/login` requires **Refactor**; root redirect is evidence
  only.
- **Authority References:** Freeze §§4.8 and 5.3; ADR-043 “Direct-registration compatibility” and
  “Backward Compatibility”; Addendum §§3.2–3.3; Journey Mapping CJ-08.
- **Current Status:** Existing partial browser-mock screen; target routing and production identity
  are unverified.
- **Future Dependencies:** Identity/security specification, safe-return authority, context resolver,
  localized accessible errors, and owner contracts.

## FLOW-010 — Conditional Identity Verification

- **Flow ID:** FLOW-010
- **Journey Stage:** CJ-08 — Identity.
- **Primary Actor:** Customer whose identity requires verification.
- **Supporting Actors:** Core Identity owner.
- **Purpose:** Satisfy an Identity-owner verification requirement without implying business approval.
- **Trigger:** Registration, Login, recovery, or owner policy requires verification.
- **Preconditions:** Identity owner reports that verification is required; exact method remains an
  Identity decision.
- **Inputs:** Verification evidence required by the owner and safe semantic return intent.
- **Business Rules:** Verification is conditional; it does not authorize a Workspace/Business,
  approve candidate knowledge, publish Business DNA, or grant OS access.
- **Normal Path:** Explain the requirement → actor provides approved verification evidence → owner
  validates → continue to Workspace/return-context resolution.
- **Alternative Paths:** Resend/retry only when owner policy permits, change identity, use recovery,
  or exit.
- **Permission Checks:** Verification concerns Identity only; protected target context remains
  withheld until separately authorized.
- **Validation Rules:** Use Identity-owner rules; do not infer verification from page completion or
  client state.
- **Error Conditions:** Invalid, expired, unavailable, already-consumed, or inaccessible verification
  evidence.
- **Recovery Paths:** Request an owner-permitted replacement, retry, return to Login/recovery, or
  exit without canonical business change.
- **Exit Conditions:** Identity verified, verification still required, or flow safely abandoned.
- **Success Result:** Owner-confirmed identity verification sufficient for the next context step.
- **Related Screens:** Existing `/verify-email` is **Refactor** evidence; `/verify` is a current
  compatibility alias, not target route authority.
- **Authority References:** ADR-042 §8 (“Verify Identity when required”); Freeze §5.3; Journey Mapping
  CJ-08; Screen Map identity inventory.
- **Current Status:** Existing partial browser-mock screens; verification policy and production
  behavior are unverified.
- **Future Dependencies:** Identity verification policy, expiry/replacement rules, security,
  accessibility/localization, and feature specification.

## FLOW-011 — Identity Recovery

- **Flow ID:** FLOW-011
- **Journey Stage:** CJ-08 — Identity.
- **Primary Actor:** Customer who cannot complete normal authentication.
- **Supporting Actors:** Core Identity owner.
- **Purpose:** Recover Identity access safely and return to authentication without changing Business
  or OS facts.
- **Trigger:** Actor selects recovery or the Identity owner requires a recovery path.
- **Preconditions:** Identity recovery is available under future approved policy; the actor is not
  treated as authorized merely for starting recovery.
- **Inputs:** Recovery information and evidence required by the Identity owner.
- **Business Rules:** Recovery concerns Identity only; it cannot publish Business DNA, alter tenant
  membership silently, or reveal protected account/Business existence.
- **Normal Path:** Request recovery → owner accepts or rejects without unsafe disclosure → actor
  provides required evidence → owner validates → return to FLOW-009 or FLOW-010 as applicable.
- **Alternative Paths:** Return to Login/Register, abandon recovery, or use another owner-approved
  recovery channel.
- **Permission Checks:** Protected identity and tenant information remains withheld until owner
  validation succeeds.
- **Validation Rules:** Apply Identity-owner recovery policy; client completion is not recovery proof;
  repeated attempts must not weaken security.
- **Error Conditions:** Unrecognized or invalid input, expired/unavailable evidence, policy denial,
  dependency failure, or unsafe return target.
- **Recovery Paths:** Correct input, request an approved replacement, retry when permitted, return to
  Login, or exit safely.
- **Exit Conditions:** Authentication can resume, further owner action is required, or recovery ends
  without access.
- **Success Result:** Safe return to authentication with no unauthorized business-context change.
- **Related Screens:** Existing `/forgot-password` and `/reset-password` require **Reconciliation**;
  exact consolidation is deferred.
- **Authority References:** Freeze §4.8 security guarantees; Addendum §3.3 returning path; Journey
  Mapping CJ-08; Screen Map identity inventory.
- **Current Status:** Existing partial browser-mock surfaces; canonical recovery policy is missing.
- **Future Dependencies:** Identity recovery policy, abuse/security review, safe disclosure rules,
  accessibility/localization, owner contracts, and feature specification.

## FLOW-012 — Workspace Resolution

- **Flow ID:** FLOW-012
- **Journey Stage:** CJ-09 — Workspace Resolution.
- **Primary Actor:** Authenticated customer.
- **Supporting Actors:** Core Workspace and Membership owners.
- **Purpose:** Create or select the authorized customer/tenant boundary needed for later Business
  resolution.
- **Trigger:** First authenticated continuation, valid returning-context selection, or context
  change.
- **Preconditions:** Authenticated Identity; Workspace creation or membership-selection authority as
  applicable.
- **Inputs:** Identity evidence, authorized memberships, permitted Workspace-creation information,
  and safe return intent.
- **Business Rules:** Workspace is the customer and tenant boundary; it is not Business; selecting a
  Workspace does not imply access to every Business, OS, or resource.
- **Normal Path:** Resolve authorized Workspace choices → actor selects an existing Workspace or
  deliberately creates one when authorized → owner validates membership/creation → establish
  authorized Workspace context → continue to FLOW-013.
- **Alternative Paths:** No Workspace available; create when authorized; switch to another authorized
  Workspace; return to Dashboard/Login; or leave without creating one.
- **Permission Checks:** Identity, membership, creation authority, Workspace scope, and requested
  action are owner-validated; client-provided Workspace ID is not proof.
- **Validation Rules:** Required Workspace identity information follows owner policy; no Business,
  Business Unit, subscription, or OS state is inferred.
- **Error Conditions:** No authorized context, duplicate/invalid creation input, membership changed,
  owner unavailable, or unsafe return target.
- **Recovery Paths:** Refresh authorized choices, correct creation input, change Identity, request
  access outside this flow, or return safely.
- **Exit Conditions:** One authorized Workspace is selected/created, or the actor exits with no valid
  Workspace context.
- **Success Result:** Authorized Workspace context ready for Business resolution, not Business DNA
  publication.
- **Related Screens:** Current `/welcome`, Workspace step inside `/onboarding`, and Context Switcher
  are **Split/Refactor** evidence.
- **Authority References:** Freeze §§4.1, 4.8 and 5.3–5.4; ADR-003; ADR-034; Addendum §§3.1–3.3;
  Journey Mapping CJ-09.
- **Current Status:** Partial/conflicting browser mock; current onboarding mixes Workspace, OS, and
  Plan concerns.
- **Future Dependencies:** Workspace/Membership feature authority, creation and selection permissions,
  safe context switching, tests, and feature specification.

## FLOW-013 — Business Resolution

- **Flow ID:** FLOW-013
- **Journey Stage:** CJ-10 — Business Resolution.
- **Primary Actor:** Authenticated Workspace member.
- **Supporting Actors:** Core Organization Registry and Business owner boundary.
- **Purpose:** Create or select exactly one authorized Business context that may own Business DNA.
- **Trigger:** FLOW-012 resolves a Workspace or a protected flow requires selected-Business context.
- **Preconditions:** Authenticated authorized Workspace context and applicable Business access or
  creation authority.
- **Inputs:** Authorized Business choices, permitted Business-creation information, actor intent, and
  safe candidate-continuity context if present.
- **Business Rules:** Business and Business Unit are distinct; Business DNA belongs to exactly one
  Business; legacy BusinessUnit-as-Business implementation evidence is not canonical.
- **Normal Path:** Resolve Businesses visible to the actor → select one or deliberately create one
  when authorized → owner validates → establish selected-Business context → route public candidate
  to FLOW-014, direct-registration path to FLOW-015, or returning path to FLOW-029.
- **Alternative Paths:** Change Workspace, choose another Business, create when authorized, request
  access outside this flow, or return safely.
- **Permission Checks:** Workspace membership, Business/resource scope, Business creation/selection
  action, and actor authorization are owner-validated.
- **Validation Rules:** Business identity follows Core owner rules; Business Unit cannot be silently
  substituted; candidate material is not published during selection.
- **Error Conditions:** No authorized Business, invalid/duplicate creation input, permission change,
  owner failure, or candidate target conflict.
- **Recovery Paths:** Refresh choices, correct input, return to Workspace selection, choose another
  authorized Business, or exit without publication.
- **Exit Conditions:** One authorized Business context is selected/created, or no valid context is
  established.
- **Success Result:** Authenticated selected-Business context ready for candidate review/conversion.
- **Related Screens:** Canonical Business Resolution is **Future**; current legacy context labels are
  adjacent evidence only.
- **Authority References:** Freeze §§4.1, 5.4 and 6; ADR-004; ADR-005; ADR-034; Addendum §§3.1–3.3;
  Journey Mapping CJ-10.
- **Current Status:** Missing canonical screen and canonical frontend model.
- **Future Dependencies:** Core Business feature authority, creation/selection permissions,
  organization migration compatibility, contracts, and feature specification.

## FLOW-014 — Authenticated Candidate Conversion

- **Flow ID:** FLOW-014
- **Journey Stage:** CJ-11 — Authenticated Candidate Conversion.
- **Primary Actor:** Authenticated customer with authority in the selected Business.
- **Supporting Actors:** Core candidate/conversion coordinator and Business DNA owner boundary.
- **Purpose:** Bring permitted public candidate work into one authenticated Business review context
  without silently publishing it.
- **Trigger:** Public candidate continuation reaches authenticated Workspace and Business resolution.
- **Preconditions:** Authenticated Identity; one authorized Workspace and Business; permitted
  candidate continuity; no prior canonical publication from this conversion action.
- **Inputs:** Candidate material, provenance, confidence, corrections, selected Business, actor,
  and owner-provided conversion eligibility.
- **Business Rules:** Conversion targets one Business at a time; preserves provenance/corrections;
  is retry-safe or otherwise safe; prevents unintended repeated consumption; never becomes source
  of truth.
- **Normal Path:** Revalidate actor/Business → resolve permitted candidate continuity → disclose the
  target Business and temporary status → associate material with authenticated review context →
  present material through FLOW-016.
- **Alternative Paths:** Select another authorized Business; continue without the candidate when
  explicitly allowed; restart candidate acquisition; return to context selection; or abandon.
- **Permission Checks:** Candidate access, Workspace/Business membership, review action, target
  Business, and protected evidence are validated by their owners.
- **Validation Rules:** One target Business; no anonymous owner; no duplicate publication; material
  remains candidate until FLOW-017 and owner publication.
- **Error Conditions:** Candidate unavailable, invalid/expired/already-consumed under future owner
  policy, target mismatch, permission loss, unsafe retry, or owner failure.
- **Recovery Paths:** Explain unavailable continuity without leaking data, retry only when safe,
  choose authorized context, restart Discovery, or proceed with authenticated acquisition.
- **Exit Conditions:** Candidate enters authenticated material review, or conversion ends with no
  canonical change.
- **Success Result:** Temporary candidate material is available for review in exactly one authorized
  Business context.
- **Related Screens:** Shared **Future** Candidate Review entry; no standalone conversion screen is
  required or currently present.
- **Authority References:** Freeze §§5.3–5.4; ADR-042 §8; ADR-043 “Direct-registration compatibility”;
  Foundation §§8 and 16; Journey Mapping CJ-11.
- **Current Status:** Missing.
- **Future Dependencies:** Retention/continuity governance, conversion safety rules, owner permissions,
  privacy/security, contracts, and feature specification.

## FLOW-015 — Authenticated Candidate Acquisition

- **Flow ID:** FLOW-015
- **Journey Stage:** CJ-12 — Material Review and Correction (direct-registration entry segment).
- **Primary Actor:** Direct-registering authenticated customer in one selected Business.
- **Supporting Actors:** Retained Business Architect pipeline and method-independent Discovery/
  Mapping responsibilities.
- **Purpose:** Acquire sufficient candidate understanding for a direct-registering customer without
  forcing public Discovery or publishing registration data.
- **Trigger:** FLOW-013 resolves a Business for a new customer without a usable public candidate.
- **Preconditions:** Authenticated selected-Business context; Business DNA first publication has not
  occurred for this path; actor has participation authority.
- **Inputs:** Authorized Business context, existing governed information, Discovery Goal, material
  gaps, and actor-authorized evidence.
- **Business Rules:** Infer before asking; use the same candidate/canonical separation as public
  Discovery; registration data is not canonical Business truth; retained Business Architect
  pipeline remains governed and resumable.
- **Normal Path:** Resolve context and known authorized evidence → identify material gaps → acquire
  only necessary information using approved methods → construct temporary candidate → continue to
  FLOW-016.
- **Alternative Paths:** Pause using inherited owner continuity; correct evidence; change authorized
  Business; return to Dashboard; or stop without publication.
- **Permission Checks:** Workspace, Business, pipeline participation, evidence source, and requested
  action are revalidated.
- **Validation Rules:** Provenance, confidence, correction, and deterministic validation remain
  mandatory; no account field is silently promoted to Business DNA.
- **Error Conditions:** Context unavailable, inherited pipeline reports a blocker, evidence cannot be
  accessed, material remains insufficient, or permission changes.
- **Recovery Paths:** Present owner-supported pause/resume/recovery, ask only material gaps, change
  authorized context, or return safely.
- **Exit Conditions:** Candidate is ready for material review, the owner reports a resumable pause,
  or the actor exits.
- **Success Result:** Reviewable authenticated candidate understanding, still non-canonical.
- **Related Screens:** Business Architect entry/acquisition is a **Future** semantic destination;
  current onboarding is not this flow.
- **Authority References:** Freeze §§5.3 and 5.5; ADR-015; ADR-016; ADR-043 “ADR-016 relationship” and
  “Direct-registration compatibility”; Journey Mapping CJ-12.
- **Current Status:** Missing.
- **Future Dependencies:** Business Architect participation permissions, inherited Session projection,
  method experience, owner validation/contracts, and feature specification.

## FLOW-016 — Material Candidate Review and Correction

- **Flow ID:** FLOW-016
- **Journey Stage:** CJ-12 — Material Review and Correction.
- **Primary Actor:** Authorized selected-Business participant.
- **Supporting Actors:** Retained Business Architect pipeline, candidate owner, and Business DNA
  publication owner.
- **Purpose:** Complete authenticated material review and correction before explicit publication
  approval.
- **Trigger:** FLOW-014 converts public candidate work or FLOW-015 produces authenticated candidate
  understanding.
- **Preconditions:** Authenticated selected-Business context; candidate material available; actor has
  review authority.
- **Inputs:** Candidate knowledge, provenance, confidence, contradictions, prior corrections,
  selected Business, and material validation feedback.
- **Business Rules:** Public and direct paths converge here; candidate remains separate from Business
  DNA; review/correction is not approval; inherited Business Architect Session terms are owner
  evidence, not new UI states.
- **Normal Path:** Confirm selected Business and temporary status → present material knowledge and
  evidence → actor corrects/challenges/confirms → owner validates → disclose remaining material gaps
  and publication consequence → proceed to FLOW-017 when ready.
- **Alternative Paths:** Return to acquisition, pause/resume under inherited owner evidence, change
  context, leave unresolved material visible, or exit without publication.
- **Permission Checks:** Business membership, review/correction action, protected evidence, and
  prospective publication authority are checked separately.
- **Validation Rules:** Materiality, knowledge-type distinction, provenance, confidence, conflict,
  and owner validation; correction does not erase history.
- **Error Conditions:** Candidate unavailable/stale, correction rejected, unresolved contradiction,
  permission loss, context change, or owner dependency failure.
- **Recovery Paths:** Preserve safe correction input, refresh from owner, return to affected item,
  reacquire evidence, choose another authorized context, or pause.
- **Exit Conditions:** Material review is sufficient for explicit approval, more acquisition is
  required, or review pauses/ends.
- **Success Result:** Owner-validated reviewed candidate ready for a separate approval decision.
- **Related Screens:** Candidate Review/Correction is a **Future** destination shared by both entry
  paths.
- **Authority References:** Freeze §§5.3–5.5; ADR-016; ADR-042 §§4 and 8; ADR-043; Addendum rules 4–8;
  Journey Mapping CJ-12.
- **Current Status:** Missing.
- **Future Dependencies:** Materiality/readiness rules, role/action permissions, owner validation,
  presentation design, contracts, and feature specification.

## FLOW-017 — Explicit Publication Approval

- **Flow ID:** FLOW-017
- **Journey Stage:** CJ-13 — Explicit Publication Approval.
- **Primary Actor:** Authorized Business approver.
- **Supporting Actors:** Business DNA owner and retained Business Architect pipeline.
- **Purpose:** Capture a deliberate, informed authorization request for first Business DNA
  publication.
- **Trigger:** FLOW-016 reports that material candidate review is sufficient for approval.
- **Preconditions:** Authenticated selected-Business context; reviewed/corrected candidate; actor has
  publication-approval authority; consequence is presentable.
- **Inputs:** Reviewed candidate version, material summary, provenance/confidence disclosure,
  selected Business, actor, and explicit approval choice.
- **Business Rules:** Approval is separate from correction, “Next”, registration, verification, and
  form completion; only the Business DNA owner validates/publishes; retry cannot cause unintended
  repeated publication.
- **Normal Path:** Reconfirm Business and candidate version → disclose what will become canonical →
  offer return/correction and explicit approve actions → actor deliberately approves → owner
  validates request → continue to FLOW-018 on success.
- **Alternative Paths:** Return to FLOW-016, request more evidence, postpone, decline, or exit with
  candidate remaining non-canonical.
- **Permission Checks:** Current Business membership, publication-approval permission, resource
  scope, candidate version, and actor authority are owner-validated at action time.
- **Validation Rules:** Candidate is current/materially reviewed; target Business is exact; explicit
  action is unambiguous; owner invariants pass; repeated submission is safe.
- **Error Conditions:** Permission loss, stale candidate, Business/context mismatch, validation
  failure, owner unavailability, or uncertain action result.
- **Recovery Paths:** Never assume success; refresh owner result, return to review, correct validation
  issues, reauthenticate/change context, or retry only when owner safety permits.
- **Exit Conditions:** Owner accepts publication, actor returns to review, or approval ends without
  canonical change.
- **Success Result:** A validated owner-controlled first-publication outcome, never a client-only
  success assumption.
- **Related Screens:** Explicit Publication Approval is a **Future** semantic destination; exact
  screen composition is deferred.
- **Authority References:** Freeze §§5.3–5.5; ADR-042 §8; ADR-043 “Direct-registration compatibility”;
  Foundation §§7.6 and 16; Journey Mapping CJ-13.
- **Current Status:** Missing; this is a critical authority gap for future implementation.
- **Future Dependencies:** Approver permission, owner validation/response contract, Audit requirement,
  retry/uncertain-outcome policy, accessible confirmation design, and feature specification.

## FLOW-018 — Business DNA v1 Publication Result

- **Flow ID:** FLOW-018
- **Journey Stage:** CJ-14 — Business DNA v1 Publication.
- **Primary Actor:** Authorized Business participant receiving the owner result.
- **Supporting Actors:** Business DNA owner and retained Business Architect pipeline.
- **Purpose:** Present the authoritative publication outcome and continue only after confirmed first
  publication.
- **Trigger:** FLOW-017 submits an owner-validated approval request.
- **Preconditions:** Explicit approval occurred; Business DNA owner processes the request; client does
  not presume outcome.
- **Inputs:** Owner publication result, Business context, published version identity when successful,
  and safe failure information.
- **Business Rules:** Business DNA belongs to exactly one Business, is versioned and
  software-independent; conversion/orchestration never becomes source of truth; Guided Activation
  begins only after confirmed publication.
- **Normal Path:** Receive owner result → verify it concerns current Business/request → present
  confirmed Business DNA v1 publication → continue to FLOW-019.
- **Alternative Paths:** Owner reports validation failure or no publication; return to FLOW-016/017;
  actor pauses after confirmed publication; returning entry resolves the published owner fact later.
- **Permission Checks:** Viewing publication result and DNA context requires current Business/resource
  permission; owner controls publication.
- **Validation Rules:** Owner result, Business scope, version identity, and correlation to the
  deliberate request must be unambiguous; the UI does not derive publication.
- **Error Conditions:** Unknown outcome, unavailable result, stale context, permission loss, owner
  rejection, or mismatched Business/version.
- **Recovery Paths:** Refresh owner outcome, avoid repeated approval, return to safe review, change
  authorized context, or resume later through FLOW-029.
- **Exit Conditions:** Confirmed v1 publication proceeds to Guided Activation; otherwise return or
  pause without claiming success.
- **Success Result:** First governed Business-scoped Business DNA v1 is confirmed by its owner.
- **Related Screens:** Publication result may be **Shared/Merged** with approval outcome; no separate
  page is required.
- **Authority References:** Freeze §5.4; ADR-005; ADR-042 §8; Foundation §16; Addendum rules 5–7;
  Journey Mapping CJ-14.
- **Current Status:** Missing.
- **Future Dependencies:** Business DNA owner response, permission and Audit policy, uncertain-outcome
  recovery, accessible success/error presentation, and feature specification.

## FLOW-019 — Guided Activation

- **Flow ID:** FLOW-019
- **Journey Stage:** CJ-15 — Guided Activation.
- **Primary Actor:** Authorized selected-Business participant.
- **Supporting Actors:** Retained Business Architect pipeline, Business DNA owner, and governed
  understanding owners.
- **Purpose:** Continue post-publication understanding work, resolve material uncertainty, and
  prepare governed projections without performing OS setup.
- **Trigger:** FLOW-018 confirms Business DNA v1, or a returning actor resumes owner-supported Guided
  Activation context.
- **Preconditions:** Published Business DNA exists for the selected Business; actor has participation
  permission; inherited pipeline context is owner-reported.
- **Inputs:** Current approved Business DNA, remaining material gaps, provenance/confidence,
  authorized context, and inherited Business Architect Session evidence.
- **Business Rules:** Starts only after first publication; infer before asking; previously confirmed
  material is not repeated unless stale/conflicting/uncertain/policy-required; revisions use governed
  review/publication; not OS-Specific Setup.
- **Normal Path:** Resolve selected Business and owner continuation → present remaining material gaps
  → acquire/validate only necessary knowledge → route any canonical revision through separate review
  and approval → prepare owner outputs → continue to FLOW-020 when appropriate.
- **Alternative Paths:** Pause/resume when owner supports it; return to correction/revision; enter a
  safe Core destination; or stop without OS setup.
- **Permission Checks:** Business participation, protected evidence, revision request, and projection
  access are checked by owners.
- **Validation Rules:** Preserve inherited Session semantics without inventing Guided Activation
  states; no direct Business DNA or OS write; uncertainty remains visible.
- **Error Conditions:** Owner reports blocked/expired/superseded Session evidence, context change,
  permission loss, unresolved material conflict, or dependency failure.
- **Recovery Paths:** Present only owner-supported resume/recovery, reacquire material, return to
  owner review, choose safe Core destination, or reauthenticate/change context.
- **Exit Conditions:** Blueprint is available, owner-supported continuation remains, or actor exits
  to an authorized Core destination.
- **Success Result:** Governed post-publication understanding sufficient for the current projection,
  without collapsing OS setup.
- **Related Screens:** Guided Activation is a **Future** semantic destination; current Core onboarding
  is not evidence of this flow.
- **Authority References:** Freeze §5.5; ADR-015; ADR-016; ADR-042 §9; ADR-043 “ADR-016 relationship”;
  Addendum §5; Journey Mapping CJ-15.
- **Current Status:** Missing.
- **Future Dependencies:** Inherited Session read authority, participation permissions, revision
  governance, presentation continuation rules, contracts, and feature specification.

## FLOW-020 — Business Blueprint

- **Flow ID:** FLOW-020
- **Journey Stage:** CJ-16 — Business Blueprint.
- **Primary Actor:** Authorized Business viewer.
- **Supporting Actors:** Core projection boundary and permission-filtered Business DNA/owner-output
  sources.
- **Purpose:** Present the governed authenticated customer-facing result of Business understanding.
- **Trigger:** Guided Activation or a returning authorized destination requests the Blueprint.
- **Preconditions:** Authenticated selected-Business context, current approved Business DNA, allowed
  governed owner outputs, and view permission.
- **Inputs:** Current Business DNA version and other permission-filtered governed owner outputs.
- **Business Rules:** Blueprint is non-writing, not canonical storage, not a source of truth, and not
  an independent owner; it is distinct from Business Report Preview and Recommendations.
- **Normal Path:** Resolve authorized Business/version context → compose permission-filtered
  projection → present source/version/partiality context → offer owner-governed correction path,
  optional FLOW-021, FLOW-022, or FLOW-023.
- **Alternative Paths:** No Recommendation; return to Guided Activation/correction; switch authorized
  Business; continue to Core Dashboard/Product Hub; or leave.
- **Permission Checks:** Workspace, Business, Blueprint view, and each protected source projection are
  permission-filtered; absent permission reveals no protected content.
- **Validation Rules:** Projection version/source context must be clear; partial/stale output is
  disclosed; no direct edit or publication action is implied.
- **Error Conditions:** Projection unavailable, partial/stale beyond safe use, source failure,
  permission denial, or Business-context mismatch.
- **Recovery Paths:** Retry projection, return to owner workflow, change authorized context, use safe
  Dashboard return, or disclose unavailable sections without inventing content.
- **Exit Conditions:** Actor proceeds to optional Recommendations, Core Dashboard, Product Hub,
  correction, or safe exit.
- **Success Result:** Authorized customer understands the governed Business projection without
  mistaking it for canonical storage.
- **Related Screens:** Business Blueprint is a **Future** semantic destination; no current screen.
- **Authority References:** Freeze §5.6; Foundation §10; Addendum §6; ADR-043 preserved guarantees;
  Journey Mapping CJ-16.
- **Current Status:** Missing.
- **Future Dependencies:** Projection owner contract, permission filtering, version/partiality rules,
  Blueprint presentation/wireframes, accessibility/localization, and feature specification.

## FLOW-021 — Optional Recommendation Review

- **Flow ID:** FLOW-021
- **Journey Stage:** CJ-17 — Governed Recommendations.
- **Primary Actor:** Authorized Business viewer or decision-maker.
- **Supporting Actors:** Business Brain Decision boundary, Recommendation Engine, and governed
  evidence/Capability owners.
- **Purpose:** Let the actor understand optional capability-first advice, its evidence, alternatives,
  uncertainty, and available customer choices.
- **Trigger:** Blueprint, Dashboard, or another authorized destination presents an owner-provided
  Recommendation or valid no-Recommendation result.
- **Preconditions:** Authenticated Business context, view permission, and an owner-provided result;
  Business Insight remains conceptual inside Business Brain Decision.
- **Inputs:** Recommendation version, Desired Outcome, Capability, Business Need/Assessment,
  confidence, reasoning, alternatives, risk, lineage availability, and NexoraXS disclosure where
  applicable.
- **Business Rules:** Recommendations are optional, evidence-based, confidence-aware, explainable,
  and capability-first; no product, retaining current tools, or further Discovery are valid
  outcomes; consequential action remains human-authorized and target-owner validated.
- **Normal Path:** Present the business need/outcome before product → disclose rationale, evidence,
  confidence, assumptions, alternatives, and NexoraXS option → actor reviews → choose explore in
  FLOW-023, defer/decline, request correction through FLOW-031, or return neutrally.
- **Alternative Paths:** No Recommendation; insufficient confidence; retain current tools; request
  more understanding; compare non-hidden alternatives; or leave without product action.
- **Permission Checks:** Recommendation, supporting Business evidence, lineage, and any next action
  are permission-filtered separately; viewing advice does not grant execution authority.
- **Validation Rules:** Preserve knowledge-to-advice ordering and source/version context; do not
  present Recommendation as fact, approval, entitlement, or automatic action.
- **Error Conditions:** Recommendation unavailable/stale, evidence or lineage unavailable, permission
  denial, confidence below an owner threshold, or target option unavailable.
- **Recovery Paths:** Disclose limitation, return to Blueprint/Dashboard, refresh owner projection,
  request source correction, or withhold unsafe action.
- **Exit Conditions:** Product Hub exploration, neutral decline/defer, correction, further
  understanding, or safe return.
- **Success Result:** The actor makes an informed, non-coerced choice; no consequential action occurs
  automatically.
- **Related Screens:** Optional Recommendations and Business Insight presentation are **Future**;
  no current screen.
- **Authority References:** Freeze §§5.7–5.9 and 7; ADR-013; ADR-014; ADR-042 §§5–6 and 10;
  Foundation §§7, 14–15; Journey Mapping CJ-17.
- **Current Status:** Missing; exact Recommendation review/disposition lifecycle remains deferred.
- **Future Dependencies:** Recommendation review/invalidation governance, permission filtering,
  Explainability policy, lineage presentation, target-action contracts, and feature specification.

## FLOW-022 — Core Workspace Ready Entry

- **Flow ID:** FLOW-022
- **Journey Stage:** CJ-18 — Core Workspace Ready.
- **Primary Actor:** Authorized Workspace member.
- **Supporting Actors:** Core readiness/context owners and Core navigation.
- **Purpose:** Provide an authorized Core destination independently of Operating System readiness.
- **Trigger:** Governed Foundation work permits Core entry, or a returning actor resolves to a Core
  destination.
- **Preconditions:** Authenticated authorized Workspace context and any required Business context;
  Core owner provides applicable readiness/access information.
- **Inputs:** Workspace/Business context, actor permissions, Core owner readiness and continuation
  projections.
- **Business Rules:** Core Workspace Ready and Operating System Ready are distinct; Commerce or any
  OS completion must not block valid Core value; readiness is owner-reported, not client-derived.
- **Normal Path:** Revalidate context → resolve allowed Core destination → present Core Dashboard and
  available continuation choices → actor may enter Blueprint, Product Hub, settings, team, or other
  separately authorized Core surfaces.
- **Alternative Paths:** Resume Guided Activation; select another authorized context; handle no
  installed OS; enter Product Hub; or return safely.
- **Permission Checks:** Workspace, Business/resource where applicable, Core destination, and action
  permissions are enforced independently.
- **Validation Rules:** Do not derive Core readiness from subscription, onboarding completion, or OS
  readiness; unavailable owner projection remains unavailable.
- **Error Conditions:** Context missing/stale, permission denial, readiness projection unavailable,
  or invalid deep link.
- **Recovery Paths:** Reauthenticate, select authorized context, return to owner-supported Foundation
  continuation, use safe Core home, or retry owner projection.
- **Exit Conditions:** Authorized Core destination, Product Hub, Foundation continuation, or safe
  exit.
- **Success Result:** Customer reaches usable Core value regardless of optional OS status.
- **Related Screens:** Current `/dashboard` is a **Refactor** candidate; its Commerce-dependent guard
  conflicts with this authority.
- **Authority References:** Freeze §§4.4, 5.5–5.6 and 5.10; ADR-018; Addendum rules 7 and 13; Journey
  Mapping CJ-18.
- **Current Status:** Partial/conflicting mock evidence.
- **Future Dependencies:** Core readiness/access owner projection, Dashboard IA, route resolution,
  permissions, accessibility/localization, and feature specification.

## FLOW-023 — Product Hub Composition

- **Flow ID:** FLOW-023
- **Journey Stage:** CJ-19 — Product Hub.
- **Primary Actor:** Authorized customer.
- **Supporting Actors:** Product Hub composition plus product, commercial, Marketplace, Recommendation,
  and OS owner projections.
- **Purpose:** Compose governed owner information and route the actor to learning, commercial,
  setup, launch, or recovery destinations without taking ownership.
- **Trigger:** Actor enters Product Hub from Core, a Recommendation, or an authorized return path.
- **Preconditions:** Authenticated Workspace context; Business context where required by the owner
  projection; Product Hub access permission.
- **Inputs:** Owner-provided availability, Recommendation, entitlement, subscription, installation,
  setup, readiness, access, permission, and recovery projections as applicable.
- **Business Rules:** These lifecycle concepts remain distinct; Product Hub owns composition and
  handoff only; it does not own Business DNA, Recommendations, subscription source records,
  Marketplace Assets, OS setup, or operational data.
- **Normal Path:** Resolve authorized context → request/compose owner projections → label distinct
  next actions → actor chooses learn/commercial owner, FLOW-024 selection, FLOW-025 setup, FLOW-026
  launch, or neutral return.
- **Alternative Paths:** No products available, no Recommendation, no subscription, setup incomplete,
  OS not ready, permission denied, owner projection unavailable, or actor returns to Core.
- **Permission Checks:** Product Hub access, each source projection, commercial action, OS access,
  Business assignment, and launch permission remain owner-controlled.
- **Validation Rules:** Never equate subscription with access/readiness; never calculate owner state
  from browser data; stale/missing projections are disclosed.
- **Error Conditions:** One or more owner projections unavailable/stale, context mismatch, permission
  denial, handoff unavailable, or no safe next action.
- **Recovery Paths:** Preserve Core context, refresh owner projections, choose another authorized
  context, return to Core, or enter owner-provided recovery.
- **Exit Conditions:** Owner destination, OS selection/setup/launch, Core return, or safe stop.
- **Success Result:** Actor reaches an owner-authorized next action with ownership distinctions intact.
- **Related Screens:** Current `/dashboard/apps` is a **Refactor** candidate; existing cards/handoff
  are partial evidence.
- **Authority References:** Freeze §§4.4 and 5.10; ADR-019; ADR-020; Foundation §§8 and 17; Journey
  Mapping CJ-19.
- **Current Status:** Partial browser mock and compatibility-lifecycle evidence.
- **Future Dependencies:** Owner projection contracts, permission/action matrix, commercial authority,
  recovery semantics, Product Hub UX, and feature specification.

## FLOW-024 — Operating System Selection

- **Flow ID:** FLOW-024
- **Journey Stage:** CJ-20 — Operating System Selection.
- **Primary Actor:** Authorized customer with applicable selection authority.
- **Supporting Actors:** Product Hub and product/commercial/OS owners.
- **Purpose:** Let the actor deliberately select an available Operating System next action without
  collapsing commercial and operational lifecycles.
- **Trigger:** FLOW-023 presents one or more owner-projected Operating System options.
- **Preconditions:** Authenticated authorized context; selected option is presented by Product Hub
  from owner projections.
- **Inputs:** Product availability, Capability/recommendation context where permitted, commercial
  owner information, actor permission, and owner next actions.
- **Business Rules:** Selection is not Recommendation, entitlement, subscription, installation,
  setup, activation, readiness, or access; product adoption remains optional.
- **Normal Path:** Review available OS option and disclosed source context → actor deliberately
  selects → resolve the relevant owner-controlled next action → continue to commercial owner,
  FLOW-025 setup, FLOW-026 launch, or safe return.
- **Alternative Paths:** Defer/decline, compare options, retain current tools, choose no OS, request
  more understanding, or return to Core.
- **Permission Checks:** Selection, commercial action, Business assignment, setup, and launch
  permissions are distinct owner checks.
- **Validation Rules:** Option remains currently available/compatible under owner rules; selection
  does not fabricate a subscription or readiness outcome.
- **Error Conditions:** Option unavailable/stale, permission denied, incompatible context, owner
  destination unavailable, or handoff failure.
- **Recovery Paths:** Refresh Product Hub, choose another option, return neutrally, change authorized
  context, or use owner-provided recovery.
- **Exit Conditions:** A valid owner next action is entered, or no selection is made.
- **Success Result:** Deliberate selection reaches the correct owner boundary without ownership
  transfer.
- **Related Screens:** Current Core onboarding OS step is a **Replace** candidate; Product Hub cards
  are **Refactor** evidence.
- **Authority References:** Freeze §§4.4, 5.9–5.10 and 11; ADR-018–020; Foundation §§12 and 17;
  Journey Mapping CJ-20.
- **Current Status:** Partial/stale current evidence; current onboarding placement is not target
  authority.
- **Future Dependencies:** Product/commercial decision authority, compatibility projection,
  selection permissions, Product Hub/OS handoff specification, and tests.

## FLOW-025 — OS-Specific Setup Handoff and Continuation

- **Flow ID:** FLOW-025
- **Journey Stage:** CJ-21 — OS-Specific Setup.
- **Primary Actor:** Authorized OS setup actor.
- **Supporting Actors:** Product Hub handoff and the applicable Operating System owner.
- **Purpose:** Transfer navigation safely from Core composition into OS-owned setup and allow the OS
  to present its own continuation.
- **Trigger:** FLOW-023 or FLOW-024 receives an owner-projected setup-required next action.
- **Preconditions:** Authenticated context, selected OS, owner-provided setup eligibility, and actor
  permission; Core does not presume setup state.
- **Inputs:** Authorized handoff context and OS-owner prerequisites; exact payload/contract is
  deferred.
- **Business Rules:** OS owns setup UI, data, validation, configuration, permissions, continuation,
  and readiness; Product Hub only hands off; Guided Activation is not OS setup.
- **Normal Path:** Product Hub identifies setup owner → hand off semantic context → OS reauthenticates
  and reauthorizes → OS presents owner-defined setup work → actor continues under OS rules → OS
  reports a continuation/readiness result → proceed to FLOW-026 when allowed.
- **Alternative Paths:** Pause under OS authority, return to Product Hub, fail prerequisites, choose
  another authorized context, or cancel without Core inventing a setup result.
- **Permission Checks:** Core handoff permission and OS setup/resource permission are validated by
  their respective owners; subscription alone grants neither.
- **Validation Rules:** OS owner validates all operational/configuration input; Core cannot write or
  calculate setup completion; exact OS lifecycle remains owning-domain authority.
- **Error Conditions:** Handoff failure, reauthorization denial, missing prerequisites, owner
  validation failure, setup dependency failure, or lost context.
- **Recovery Paths:** Preserve safe owner-supported progress, return to Product Hub, retry handoff when
  safe, correct OS-owned input, reauthenticate, or select another authorized context.
- **Exit Conditions:** OS reports readiness/launch eligibility, owner-supported continuation remains,
  or actor returns safely to Core.
- **Success Result:** Setup remains entirely OS-owned while Core retains a safe return/handoff path.
- **Related Screens:** Commerce `/setup` is **Keep/Refactor** evidence for Commerce ownership; its
  exact current steps are not universal authority.
- **Authority References:** Freeze §§4.2, 4.4 and 5.10; ADR-024; ADR-026; Foundation §17; Addendum rule
  12; Journey Mapping CJ-21.
- **Current Status:** Commerce mock evidence exists; production and generic OS setup authority do not.
- **Future Dependencies:** OS-specific specification, setup permission/rules/contracts, Product Hub
  handoff, recovery/Audit requirements, and tests.

## FLOW-026 — Operating System Ready Launch

- **Flow ID:** FLOW-026
- **Journey Stage:** CJ-22 — Operating System Ready.
- **Primary Actor:** Authorized OS actor.
- **Supporting Actors:** Applicable OS readiness/access owner and Product Hub composition.
- **Purpose:** Launch an Operating System only when its owner reports readiness and current access.
- **Trigger:** OS setup reports an eligible result or Product Hub presents an owner-projected launch
  action.
- **Preconditions:** Authenticated actor, applicable organization/OS context, OS owner readiness,
  access, and permission evidence.
- **Inputs:** OS owner readiness, access/permission, context, and safe launch/return information.
- **Business Rules:** OS Ready is distinct from Core Ready, subscription, installation, and setup;
  OS owner controls readiness and operational access; Product Hub does not infer either.
- **Normal Path:** Revalidate context and actor → obtain owner readiness/access result → present
  launch when allowed → OS reauthorizes entry → continue to FLOW-027.
- **Alternative Paths:** Setup required, access denied, paused/unavailable under owner authority,
  choose another OS/context, or return to Product Hub/Core.
- **Permission Checks:** Workspace, organization, OS, resource, action, readiness, and access checks
  apply as owner authority requires.
- **Validation Rules:** Use current owner result; never rely on client completion or subscription as
  readiness proof; safe failure preserves Core return.
- **Error Conditions:** Readiness projection stale/unavailable, permission denial, setup incomplete,
  launch dependency failure, or context mismatch.
- **Recovery Paths:** Return to OS setup, refresh owner projection, change authorized context, return
  to Product Hub, or use OS owner recovery.
- **Exit Conditions:** Authorized OS entry, setup/recovery continuation, or safe Core return.
- **Success Result:** Actor enters the OS only through current owner-controlled readiness and access.
- **Related Screens:** Commerce Dashboard and setup handoff are **Refactor** evidence; no generic
  launch screen is approved.
- **Authority References:** Freeze §§4.4 and 5.10; ADR-018; ADR-026; Addendum rules 12–13; Journey
  Mapping CJ-22.
- **Current Status:** Partial Commerce browser evidence; production owner result unverified.
- **Future Dependencies:** OS readiness/access contract, launch permission, recovery behavior,
  Product Hub projection, and OS feature specification.

## FLOW-027 — Operational Dashboard and Daily Operations Entry

- **Flow ID:** FLOW-027
- **Journey Stage:** CJ-23 — Operational Dashboard and Daily Operations.
- **Primary Actor:** Authorized Operating System user.
- **Supporting Actors:** Applicable Operating System owner.
- **Purpose:** Enter independent OS-owned work without transferring operational ownership to Core.
- **Trigger:** FLOW-026 authorizes launch or an authenticated returning actor resolves directly to an
  allowed OS destination.
- **Preconditions:** OS owner validates context, readiness/access, actor permission, and requested
  operational destination.
- **Inputs:** OS-owned navigation/read projections, actor permissions, organization/resource scope,
  and requested action.
- **Business Rules:** Each OS owns its UI, setup, navigation, workflow, operational facts,
  configuration, reports, dashboards, settings, permissions, and lifecycle; no OS depends on another
  OS for its core workflow.
- **Normal Path:** Enter OS owner boundary → revalidate requested destination → present OS Dashboard
  or authorized operational module → actor performs only OS-specified actions → return or continue
  under owning feature authority.
- **Alternative Paths:** Different authorized module, no-data, permission denial, owner recovery,
  return to Product Hub/Core, or safe exit.
- **Permission Checks:** OS, organization, resource, action, and data-scope permissions are enforced
  by the OS owner for every operation.
- **Validation Rules:** Operational rules are OS-specific and must come from approved OS feature
  specifications; this flow defines no generic operation or write behavior.
- **Error Conditions:** OS unavailable, unauthorized destination, operational dependency failure,
  stale read, validation failure, or context loss.
- **Recovery Paths:** Use OS-owner recovery, retry when safe, return to OS Dashboard, Product Hub, or
  Core without crossing database/domain boundaries.
- **Exit Conditions:** Continued OS operation, another authorized OS destination, Product Hub/Core
  return, or logout.
- **Success Result:** Independent OS work begins and remains inside its owner boundary.
- **Related Screens:** Commerce Dashboard, POS, Products, Inventory, Customers, Orders, Invoices,
  Reports, and Settings are current **Keep/Refactor** evidence.
- **Authority References:** Freeze §§4.2, 4.9 and 5.10; ADR-024; Foundation §17.2; Journey Mapping
  CJ-23.
- **Current Status:** Substantial Commerce browser-mock evidence; production contracts and readiness
  remain unverified.
- **Future Dependencies:** Applicable OS feature specs, permissions, contracts, persistence/security,
  operational recovery, accessibility/localization, and tests.

## FLOW-028 — Growth and Marketplace Entry

- **Flow ID:** FLOW-028
- **Journey Stage:** CJ-24 — Growth and Marketplace.
- **Primary Actor:** Authorized customer or publisher as applicable.
- **Supporting Actors:** Marketplace bounded context, Product Hub composition, and target owners.
- **Purpose:** Represent the optional later transition from operations to governed growth or
  Marketplace activity without pulling that scope into Foundation implementation.
- **Trigger:** An authorized later-scope destination is made available by approved Marketplace/
  product authority.
- **Preconditions:** Applicable future milestone is approved; actor/context/permission are valid;
  current Foundation delivery does not satisfy these preconditions by default.
- **Inputs:** Marketplace or growth owner projections and applicable context.
- **Business Rules:** Marketplace remains a distinct bounded context; Product Hub composition does
  not own Marketplace Assets; acquisition, installation, configuration, activation, entitlement,
  and Business Assignment remain separate.
- **Normal Path:** Enter owner-authorized later destination → review owner-provided scope and next
  actions → continue only under separate Marketplace/growth authority.
- **Alternative Paths:** No available later action, decline/defer, return to OS/Core/Product Hub, or
  leave.
- **Permission Checks:** Marketplace/customer/publisher/resource/action permissions belong to their
  owners; no Foundation permission is inferred.
- **Validation Rules:** Published Asset Versions remain immutable; target-owner validation and human
  authority remain required where applicable.
- **Error Conditions:** Scope not authorized, projection unavailable, permission denial,
  compatibility failure, or owner destination unavailable.
- **Recovery Paths:** Return to Product Hub/OS/Core, refresh owner projection, or use separately
  approved Marketplace recovery.
- **Exit Conditions:** Separately governed later flow begins, or actor returns safely.
- **Success Result:** Later growth/Marketplace work starts only under its own authority.
- **Related Screens:** **Future**; no current Foundation journey screen.
- **Authority References:** Freeze §4.5; Marketplace Architecture v1.0 Freeze; Foundation §§12 and 17;
  Journey Mapping CJ-24.
- **Current Status:** Deferred later scope; missing current screen and feature authority.
- **Future Dependencies:** Marketplace/growth milestone, permissions, feature specification,
  compatibility rules, and implementation readiness.

## FLOW-029 — Returning and Resuming Customer Resolution

- **Flow ID:** FLOW-029
- **Journey Stage:** CJ-01–CJ-23 as applicable; returning entry is a cross-journey resolver.
- **Primary Actor:** Returning authenticated or authenticating customer.
- **Supporting Actors:** Identity, Workspace, Business, Business Architect, Core readiness, Product
  Hub, and OS owners as applicable.
- **Purpose:** Resolve a safe current destination without forcing completed customers through the
  primary new-customer journey again.
- **Trigger:** Login, retained authenticated entry, deep link, context switch, or deliberate resume.
- **Preconditions:** Actor can authenticate; any target is treated as untrusted until owner context
  and permission are revalidated.
- **Inputs:** Identity, authorized memberships/contexts, semantic return intent, and independent
  owner continuation/readiness projections.
- **Business Rules:** Existing canonical understanding need not be recreated; public Discovery is not
  mandatory; Business Architect, Guided Activation, Core Ready, Product Hub, and OS continuation
  remain distinct owner outcomes.
- **Normal Path:** Authenticate/revalidate → resolve Workspace → resolve Business when required → ask
  relevant owners for permitted continuation → present only valid choices → enter FLOW-015/016/019/
  020/022/023/025/026/027 as supported.
- **Alternative Paths:** No saved continuation, multiple authorized contexts, invalid deep link,
  context change, reauthentication, or safe Core fallback.
- **Permission Checks:** Every target’s Workspace, Business, OS, resource, and action scope is
  revalidated; destination knowledge does not prove access.
- **Validation Rules:** Do not collapse owner outcomes into a single onboarding-complete flag; do not
  infer continuation from current mock browser data.
- **Error Conditions:** No authorized context, stale/invalid target, permission change, owner
  projection unavailable, or conflicting continuity evidence.
- **Recovery Paths:** Reauthenticate, select authorized Workspace/Business, choose safe Core home,
  refresh owner projection, or exit without leaking target content.
- **Exit Conditions:** One safe authorized destination is entered, a valid choice is presented, or
  the actor exits.
- **Success Result:** Returning customer reaches the best owner-supported destination without
  repeating unnecessary work.
- **Related Screens:** Login, Context Switcher, Dashboard, Product Hub, and Commerce routes are
  **Shared/Refactor** evidence.
- **Authority References:** Freeze §§5.3–5.6 and 5.10; ADR-043 direct/return compatibility; Addendum
  §3.3; Journey Mapping §2.3 and CJ-08–CJ-23.
- **Current Status:** Partial routing/mock evidence; current redirect rules are not target authority.
- **Future Dependencies:** Destination-resolution policy, owner continuation/readiness projections,
  permission checks, deep-link/safe-return authority, and feature specifications.

## FLOW-030 — Locale and Direction Change

- **Flow ID:** FLOW-030
- **Journey Stage:** CJ-00–CJ-24 wherever a customer-facing presentation exists.
- **Primary Actor:** Visitor or authenticated customer.
- **Supporting Actors:** Localization presentation authority and current destination owner.
- **Purpose:** Change language, direction, and locale-sensitive presentation without changing
  semantic context or canonical facts.
- **Trigger:** Actor selects another available locale or a governed locale choice applies.
- **Preconditions:** Destination offers a locale choice or approved preference; current semantic
  context can be represented safely.
- **Inputs:** Selected locale, available translation resources, formatting/direction rules, and safe
  current context.
- **Business Rules:** English/LTR and Arabic/RTL are first-class; architecture has no fixed
  two-language ceiling; locale/direction cannot change permissions, owner outcomes, or Business data;
  user-entered Business data remains as entered absent governed translation.
- **Normal Path:** Actor chooses locale → validate availability → apply language declaration,
  direction, formatting, and translated resources coherently → preserve semantic destination and
  safe input → continue the same flow.
- **Alternative Paths:** Governed fallback, choose another locale, keep current locale, or defer a
  preference when ownership/precedence is unresolved.
- **Permission Checks:** Locale choice normally grants no business permission; preference access may
  be owner-governed in authenticated contexts.
- **Validation Rules:** No hardcoded user-facing text in future implementation; handle pluralization,
  names, dates, numbers, currency, mixed direction, and directional affordances consistently.
- **Error Conditions:** Resource missing, unsupported locale, inconsistent direction/resource load,
  or preference unavailable.
- **Recovery Paths:** Use governed fallback with disclosure/observability, restore last coherent
  locale, retry resources, or continue without losing semantic context.
- **Exit Conditions:** Same semantic flow in a coherent locale/direction, or safe fallback.
- **Success Result:** Language/direction changes without losing work, context, accessibility, or
  business meaning.
- **Related Screens:** Shared across all current/future surfaces; current locale controls are partial
  evidence.
- **Authority References:** Repository AGENTS §12; ADR-041; [Localization](./10-LOCALIZATION.md);
  Journey Mapping presentation constraints.
- **Current Status:** Partial browser-mock support; hardcoded strings and uneven parity remain.
- **Future Dependencies:** Preference ownership/precedence decision, translation governance,
  resource coverage, accessibility validation, and per-feature acceptance criteria.

## FLOW-031 — Correction, Failure, and Safe Recovery

- **Flow ID:** FLOW-031
- **Journey Stage:** CJ-01–CJ-24 wherever correction, failure, interruption, or denied access applies.
- **Primary Actor:** Visitor or authenticated customer encountering an incorrect or incomplete flow.
- **Supporting Actors:** Current canonical owner, authorization owner, and presentation boundary.
- **Purpose:** Provide a safe recovery pattern without inventing owner state or repeating a
  consequential action.
- **Trigger:** Incorrect inference, validation failure, low confidence, contradiction, stale data,
  unavailable dependency, interruption, permission denial, uncertain outcome, or explicit correction
  request.
- **Preconditions:** The current flow can identify its semantic owner and safe return boundary; only
  authorized context may be retained.
- **Inputs:** Owner-provided error/validation/permission result, safe user input, affected semantic
  context, and permitted recovery actions.
- **Business Rules:** Correction and approval are separate; provenance is preserved; retries do not
  silently publish/purchase/configure; permission denial leaks no protected content; UI labels do not
  create domain states.
- **Normal Path:** Explain what could not be completed without false certainty → preserve safe input
  and context → present only owner-authorized retry/correct/reauthenticate/change-context/return
  actions → actor chooses → re-enter the affected flow at a safe point.
- **Alternative Paths:** Pause, discard permitted temporary work, return to parent/Core/public entry,
  request owner help outside this flow, or stop.
- **Permission Checks:** Revalidate actor/context before showing protected details or retrying; safe
  return never grants access.
- **Validation Rules:** Owner error and validation rules control; uncertain consequential outcomes
  are resolved from owner evidence rather than repeated optimistically.
- **Error Conditions:** Recovery itself unavailable, repeated owner failure, context lost, permission
  changed, or no safe continuation exists.
- **Recovery Paths:** Escalate to a safe neutral destination, preserve only authorized information,
  disclose restart where required, or terminate without further side effects.
- **Exit Conditions:** A safe re-entry succeeds, actor returns/pauses/exits, or owner resolution is
  explicitly required.
- **Success Result:** Customer retains agency and clarity while canonical ownership and security are
  preserved.
- **Related Screens:** Shared cross-flow recovery/error presentation; current coverage is uneven and
  no dedicated route is implied.
- **Authority References:** Freeze §§4.8, 5.2–5.10 and 11; ADR-014; ADR-042 §§3–4 and 8;
  [Presentation State Authority](./07-STATE-MACHINES.md); Journey Mapping §§7 and 9.
- **Current Status:** Partial current evidence; missing across most Foundation successor surfaces.
- **Future Dependencies:** Per-owner error/validation/permission contracts, safe retry policy,
  accessibility/localization, Audit/observability where consequential, and feature specifications.

# 5. Flow Relationships

The relationship maps below show semantic flow order. They are not state machines and do not define
routes, persistence, or automatic transitions.

## 5.1 Primary value-before-registration relationship

```text
FLOW-001 Public Entry Choice
→ FLOW-002 Business Discovery
→ FLOW-003 Candidate Construction
→ FLOW-004 Candidate Understanding Presentation
→ FLOW-005 Understanding Reflection and Correction
→ FLOW-006 Business Report Preview
→ FLOW-007 Create Workspace Intent
→ FLOW-008 Registration or FLOW-009 Login
→ FLOW-010 Conditional Identity Verification when required
→ FLOW-012 Workspace Resolution
→ FLOW-013 Business Resolution
→ FLOW-014 Authenticated Candidate Conversion
→ FLOW-016 Material Candidate Review and Correction
→ FLOW-017 Explicit Publication Approval
→ FLOW-018 Business DNA v1 Publication Result
→ FLOW-019 Guided Activation
→ FLOW-020 Business Blueprint
→ FLOW-021 Optional Recommendation Review or no-Recommendation path
→ FLOW-022 Core Workspace Ready Entry
→ FLOW-023 Product Hub Composition
→ FLOW-024 Operating System Selection when chosen
→ FLOW-025 OS-Specific Setup Handoff and Continuation
→ FLOW-026 Operating System Ready Launch
→ FLOW-027 Operational Dashboard and Daily Operations Entry
→ FLOW-028 Growth and Marketplace Entry when separately authorized
```

## 5.2 Direct-registration relationship

```text
FLOW-001 Public Entry Choice
→ FLOW-008 Registration or FLOW-009 Login
→ FLOW-010 Conditional Identity Verification when required
→ FLOW-012 Workspace Resolution
→ FLOW-013 Business Resolution
→ FLOW-015 Authenticated Candidate Acquisition
→ FLOW-016 Material Candidate Review and Correction
→ FLOW-017 Explicit Publication Approval
→ FLOW-018 Business DNA v1 Publication Result
→ rejoin at FLOW-019 Guided Activation
```

This is not a second onboarding architecture. FLOW-014 is omitted only because no public candidate
is being converted; the same temporary candidate, review, approval, Business DNA owner, and
post-publication rules apply.

## 5.3 Returning/resume relationship

```text
FLOW-009 Login or retained authenticated entry
→ FLOW-029 Returning and Resuming Customer Resolution
→ one owner-supported destination:
   ├─ FLOW-012 / FLOW-013 context resolution
   ├─ FLOW-015 / FLOW-016 retained Business Architect work
   ├─ FLOW-019 Guided Activation
   ├─ FLOW-020 Business Blueprint
   ├─ FLOW-022 Core Workspace Ready Entry
   ├─ FLOW-023 Product Hub
   ├─ FLOW-025 OS setup continuation
   └─ FLOW-026 / FLOW-027 OS launch or operations
```

## 5.4 Optional and corrective branches

- FLOW-021 may yield no Recommendation, decline/defer, retain current tools, further Discovery, or
  Product Hub exploration.
- FLOW-023 may route to learning, commercial owner action, OS setup, OS launch, recovery, or neutral
  Core return.
- FLOW-030 applies without changing the current semantic destination.
- FLOW-031 may return to any affected flow at an owner-approved safe point.
- FLOW-011 returns only to Identity flows; it does not bypass context or publication controls.

# 6. Screen Mapping

“Future” identifies a semantic design requirement, not an approved page or route. No current route
is deprecated or removable solely by this document.

| Flow | Current screen evidence | Mapping class | Future/shared semantic surface | Deprecated/replacement note | Rationale |
|---|---|---|---|---|---|
| FLOW-001 | Landing `/` | Current screen — Refactor | Public Entry | None deprecated | Existing entry is valid; CTA hierarchy must expose value path and preserve direct identity entry |
| FLOW-002 | None | Missing screen / Future | Business Discovery | None | Capability needs presentation, but exact method and screen count are deferred |
| FLOW-003 | None | Shared screen | Discovery feedback / Candidate presentation | None | Mapping and understanding are owner responsibilities, not mandatory standalone pages |
| FLOW-004 | None | Missing screen / Future | Candidate Understanding | None | Temporary candidate status, provenance and confidence require visible distinction |
| FLOW-005 | None | Missing or Shared / Future | Candidate Reflection and Correction | None | May compose with Candidate presentation while preserving review semantics |
| FLOW-006 | None | Missing screen / Future | Business Report Preview / Value Preview | None | Temporary pre-registration projection must be distinct from Blueprint |
| FLOW-007 | Landing/auth CTA evidence | Shared screen | Preview continuation and identity choice | None | Intent need not be a standalone screen or aggregate |
| FLOW-008 | `/register` | Current screen — Refactor | Registration | None | Direct entry is valid; current mock cannot publish DNA or prove production identity |
| FLOW-009 | `/login`; Core root redirect | Current screen — Refactor | Login and safe return | None | Existing Login remains valid; target context resolution is incomplete |
| FLOW-010 | `/verify-email`; `/verify` alias | Current screen — Refactor/Shared | Conditional Verification | Alias remains compatibility evidence | Verification is conditional and exact route policy is deferred |
| FLOW-011 | `/forgot-password`; `/reset-password` | Current screens — Reconcile | Identity Recovery | No removal authorized | Current two surfaces overlap; Identity authority must decide consolidation |
| FLOW-012 | `/welcome`; onboarding Workspace step; Context Switcher | Current/Shared — Split/Refactor | Workspace Resolution | Composite onboarding composition is replaced conceptually | Workspace must be separated from OS and Plan concerns |
| FLOW-013 | Legacy BusinessUnit labels only | Missing screen / Future | Business Resolution | Legacy mapping is non-canonical | Canonical Business create/select destination is absent |
| FLOW-014 | None | Missing or Shared / Future | Candidate Conversion entry | None | Conversion may compose with authenticated review but must remain explicit |
| FLOW-015 | None | Missing screen / Future | Business Architect candidate acquisition | Current onboarding is not this flow | Direct registration requires governed candidate work |
| FLOW-016 | None | Missing screen / Future | Material Candidate Review/Correction | None | Public and direct paths must converge on one authenticated review boundary |
| FLOW-017 | None | Missing screen / Future | Explicit Publication Approval | None | Consequential approval must be distinct and deliberate |
| FLOW-018 | None | Shared screen / Future | Publication Result | None | Owner result may share the approval surface; separate page is not required |
| FLOW-019 | None | Missing screen / Future | Guided Activation | Current onboarding is not this flow | Post-publication continuation must remain distinct from OS setup |
| FLOW-020 | None | Missing screen / Future | Business Blueprint | Historical “canonical blueprint” wording is superseded | Governed authenticated non-writing projection is absent |
| FLOW-021 | None | Missing screen / Future | Insights and Optional Recommendations | None | Capability-first evidence/explanation and neutral choices are absent |
| FLOW-022 | `/dashboard` | Current screen — Refactor | Core Dashboard | Commerce-dependent guard must be replaced by later approved work | Core entry cannot depend on OS readiness |
| FLOW-023 | `/dashboard/apps` | Current screen — Refactor | Product Hub | None | Correct composition candidate; current lifecycle data is compatibility evidence |
| FLOW-024 | Onboarding OS step; Product Hub cards | Current/Shared — Replace/Refactor | Product Hub OS selection | Onboarding OS step is not target authority | Selection belongs to owner-projection composition after governed understanding |
| FLOW-025 | Commerce `/setup` | Current screen — Keep/Refactor | OS-owned Setup | No generic replacement | Correct owner; current step sequence is not universal authority |
| FLOW-026 | Commerce setup/dashboard handoff | Shared current evidence — Refactor | OS Ready Launch | None | OS owner result is required; client completion is insufficient |
| FLOW-027 | Commerce Dashboard and operational routes | Current screens — Keep/Refactor | OS Dashboard and owned modules | None | Correct OS ownership; browser mock is not production authority |
| FLOW-028 | None | Missing screen / Future later scope | Growth/Marketplace entry | None | Requires separate later milestone; Foundation does not authorize it now |
| FLOW-029 | Login, Context Switcher, Dashboard, Product Hub, Commerce routes | Shared current evidence — Refactor | Returning Destination Resolver | Current redirects are evidence only | Owner projections must determine safe return, not one completion flag |
| FLOW-030 | Current locale controls across Core/Commerce | Shared current evidence — Refactor | Locale/Direction control | None | Semantic context must persist across English/LTR and Arabic/RTL |
| FLOW-031 | Uneven loading/error/recovery surfaces | Shared current evidence — Refactor/Future | Cross-flow Correction and Recovery | None | Every consequential flow needs owner-safe recovery; no dedicated route is implied |

# 7. Coverage Matrix

## 7.1 Coverage method

Coverage measures authority documentation, not delivery:

- **100%:** semantic flow is fully determined by approved authority for this phase;
- **75%:** semantic flow is complete, but owner-specific permission, validation, lifecycle,
  retention, or contract rules remain explicitly deferred;
- **50%:** boundary is traceable, but the detailed experience belongs to a later independent domain
  or milestone;
- **25%:** adjacent evidence only; and
- **0%:** no traceable flow authority.

Cross-flow FLOW-029, FLOW-030, and FLOW-031 supplement the primary stage flows and do not inflate
journey-stage coverage.

| Journey Stage | Primary Flow | Current Screen | Documentation Status | Authority Coverage |
|---|---|---|---|---:|
| CJ-00 Public Entry | FLOW-001 | Landing | Complete semantic entry choices | 100% |
| CJ-01 Business Discovery | FLOW-002 | Missing | Complete boundary; method/retention/contracts deferred | 75% |
| CJ-02 Business Mapping | FLOW-003 | Shared future presentation | Complete boundary; owner processing rules deferred | 75% |
| CJ-03 Business Understanding | FLOW-003 | Shared future presentation | Complete boundary; owner calculation/validation deferred | 75% |
| CJ-04 Candidate Understanding | FLOW-004 | Missing | Complete temporary/canonical distinction; exact presentation deferred | 75% |
| CJ-05 Understanding Reflection | FLOW-005 | Missing/shared | Complete review rules; materiality/permissions deferred | 75% |
| CJ-06 Business Report Preview | FLOW-006 | Missing | Complete projection boundary; content policy deferred | 75% |
| CJ-07 Workspace Intent | FLOW-007 | Adjacent CTA only | Complete semantic choice; continuity mechanics deferred | 75% |
| CJ-08 Identity | FLOW-008–FLOW-011 | Partial current auth screens | Complete semantic branches; Identity policies/contracts deferred | 75% |
| CJ-09 Workspace Resolution | FLOW-012 | Partial/conflicting | Complete owner/context boundary; permissions/details deferred | 75% |
| CJ-10 Business Resolution | FLOW-013 | Missing; legacy adjacent | Complete canonical boundary; UX/migration/permissions deferred | 75% |
| CJ-11 Candidate Conversion | FLOW-014 | Missing/shared | Complete safe handoff boundary; retention/mechanics deferred | 75% |
| CJ-12 Material Review/Correction | FLOW-015–FLOW-016 | Missing | Complete convergence and review semantics; readiness/permissions deferred | 75% |
| CJ-13 Publication Approval | FLOW-017 | Missing | Complete approval invariant; owner action contract deferred | 75% |
| CJ-14 Business DNA v1 | FLOW-018 | Missing/shared | Complete owner-result boundary; response/recovery deferred | 75% |
| CJ-15 Guided Activation | FLOW-019 | Missing | Complete separation/entry; exact continuation rules deferred | 75% |
| CJ-16 Business Blueprint | FLOW-020 | Missing | Complete projection semantics; content/version details deferred | 75% |
| CJ-17 Recommendations | FLOW-021 | Missing | Complete ethics/ownership; lifecycle/explainability details deferred | 75% |
| CJ-18 Core Workspace Ready | FLOW-022 | Partial/conflicting Dashboard | Complete readiness distinction; resolver contract deferred | 75% |
| CJ-19 Product Hub | FLOW-023 | Partial mock | Complete composition boundary; owner projections deferred | 75% |
| CJ-20 OS Selection | FLOW-024 | Partial/stale | Complete distinction; commercial/compatibility details deferred | 75% |
| CJ-21 OS-Specific Setup | FLOW-025 | Commerce mock | Boundary only; detailed flow belongs to each OS | 50% |
| CJ-22 OS Ready | FLOW-026 | Commerce evidence | Boundary only; readiness/access rules belong to each OS | 50% |
| CJ-23 Daily Operations | FLOW-027 | Substantial Commerce mock | Boundary only; operations require OS feature authority | 50% |
| CJ-24 Growth/Marketplace | FLOW-028 | Missing | Later-scope boundary only | 50% |

## 7.2 Coverage totals

| Measure | Result | Meaning |
|---|---:|---|
| Journey stages with at least one primary flow | 25/25 — 100% | No journey-stage orphan |
| Canonical flow definitions | 31/31 — 100% | Every inventory record has a complete definition |
| Required definition fields | 651/651 — 100% | 31 flows × 21 required fields |
| Stage-weighted authority documentation | 72% | Exact owner-specific and later-domain details remain deferred |
| Flow-weighted authority documentation | 73% | One 100%, twenty-six 75%, and four 50% flows |
| Current frontend stage coverage | 26% | Carried from the verified Canonical Journey Mapping |

# 8. Gap Analysis

## 8.1 Missing flows

No canonical Journey stage lacks a semantic flow. The following detailed flows are intentionally not
defined because current authority assigns them to future owner-specific work:

- method-specific Discovery interactions;
- exact Identity verification and recovery procedures;
- exact Workspace/Business creation policies;
- Recommendation review/invalidation/disposition behavior;
- commercial purchase/subscription behavior;
- OS-specific setup steps and operational actions; and
- Marketplace acquisition, installation, activation, and publisher workflows.

Creating them here would invent business logic or pre-empt their owning feature/domain authority.

## 8.2 Incomplete flows

| Flow cluster | Missing authoritative detail | Why incomplete |
|---|---|---|
| FLOW-002–FLOW-007 | Discovery retention, method authorization, sufficiency/materiality, continuity and privacy | Explicit Freeze/RFC deferrals |
| FLOW-008–FLOW-011 | Identity validation, verification, recovery, expiry and abuse policy | Current mock is evidence, not Identity authority |
| FLOW-012–FLOW-013 | Exact create/select permission catalog and canonical Business migration compatibility | Role catalog and implementation migration are unresolved |
| FLOW-014 | Candidate continuity, retention, safe-consumption and retry mechanism | Architecture states invariant but defers mechanism |
| FLOW-015–FLOW-019 | Pipeline participation, material review readiness, approver role, owner outcomes and revision policy | Requires owning feature/Business DNA authority |
| FLOW-020 | Projection content/version/partiality and permission filtering | Projection boundary is frozen; exact contract is not |
| FLOW-021 | Explainability presentation and Recommendation review/invalidation lifecycle | Registered Foundation deferrals |
| FLOW-022–FLOW-024 | Core destination resolver, owner projections, commercial next actions and compatibility rules | Product Hub cannot invent owner results |
| FLOW-025–FLOW-027 | OS-specific setup/readiness/operational rules | Each OS owns them independently |
| FLOW-028 | Later Marketplace/growth feature scope | Outside current delivery authorization |
| FLOW-029–FLOW-031 | Safe-return precedence, locale preference ownership, per-owner recovery rules | Requires cross-cutting and owning-feature decisions |

## 8.3 Duplicated flows

No duplicate `FLOW-*` authority is introduced. Similar-looking flows remain distinct for an
authority reason:

- FLOW-005 is public/temporary Understanding Reflection; FLOW-016 is authenticated selected-Business
  material review before publication.
- FLOW-008 and FLOW-009 are separate Registration and Login entries but converge before canonical
  publication.
- FLOW-006 is a temporary public Business Report Preview; FLOW-020 is an authenticated governed
  Business Blueprint projection.
- FLOW-022 is Core Workspace Ready entry; FLOW-026 is owner-reported Operating System Ready launch.
- FLOW-019 is Guided Activation; FLOW-025 is OS-owned setup.
- FLOW-021 owns no Product Hub action; FLOW-023 owns no Recommendation.

The earlier [User Flows](./06-USER-FLOWS.md) document groups concerns under `F-01`–`F-10`. Those
records remain predecessor evidence and do not create competing IDs or canonical definitions.

## 8.4 Missing screens

Current frontend lacks direct evidence for Business Discovery, Candidate Understanding, Reflection,
Business Report Preview, canonical Business Resolution, Candidate Conversion/Review, explicit
Publication Approval, Guided Activation, Business Blueprint, Business Insight presentation,
optional Recommendations, and later Growth/Marketplace entry.

Missing screen evidence does not prove that each flow needs a separate page. Screen decomposition,
shared surfaces, responsive composition, and routes remain later design decisions.

## 8.5 Missing documentation

1. Resolution of `UIAUTH-HYGIENE-001`, the active Genesis Customer Journey/source-manifest mismatch.
2. Independent UI/UX Authority Review and Approval for the reconciled candidate package.
3. Approved role/action catalog for review, correction, publication, projection, Product Hub, and OS
   handoff.
4. Identity verification/recovery and safe-return authority.
5. Discovery privacy, retention, continuity, and method-specific authority.
6. Candidate conversion/retry and first-publication owner specification.
7. Blueprint content/version and Recommendation Explainability/review authority.
8. Product/commercial and OS-specific specifications.
9. Approved presentation-state, wireframe, and feature-specification artifacts for the selected
   implementation slice.

## 8.6 Missing business rules

- Discovery sufficiency and material Knowledge Gap policies;
- what candidate material is material enough to require explicit review;
- who may correct, approve publication, view Blueprint/lineage, and act on Recommendations;
- exact Workspace and Business creation/selection rules;
- identity verification and recovery policy;
- candidate continuity, expiry, deletion, consumption and safe retry behavior;
- Business DNA revision/rollback after first publication;
- Core destination/safe-return precedence;
- Recommendation review, invalidation and customer-disposition policy;
- commercial selection/purchase/subscription behavior; and
- each OS’s setup, readiness, operational and recovery rules.

These are gaps, not implicit defaults.

## 8.7 Missing permissions

Authority establishes that permissions are required but does not provide the complete actor/action
catalog for:

- Workspace and Business creation/selection;
- Candidate access, correction and conversion;
- Business Architect participation and resume;
- first-publication approval;
- Business DNA/Blueprint/Insight/lineage/Recommendation viewing;
- Product Hub commercial, setup and launch actions;
- OS setup/readiness/operation; and
- Marketplace/growth actions.

Current frontend role labels and hard-coded matrices are not authorization evidence.

## 8.8 Missing recovery paths

Semantic recovery exists for every flow, but exact owner behavior remains missing for expired or
unavailable candidate continuity, uncertain publication outcome, verification/recovery evidence,
stale Blueprint/Recommendation projections, invalid deep links, Product Hub owner failures, OS
handoff/setup interruption, and repeated dependency failure.

## 8.9 Missing validation

Missing owner validation includes Discovery sufficiency, candidate materiality, Business creation,
conversion eligibility, candidate version currency, publication approver authority, publication
retry safety, Blueprint projection currency, Recommendation action eligibility, Product Hub
compatibility, and OS setup/readiness/operational validation.

## 8.10 Missing contracts

Future feature specifications must identify owner-approved boundaries for Identity; Workspace and
Business context; candidate/provenance/confidence reads; correction and explicit publication;
Business Architect continuation; Business DNA publication result; Blueprint and Recommendation
projections; Product Hub owner projections; OS handoff/readiness; permissions; Audit; and
observability.

This gap list defines no API, DTO, SDK shape, Event, service, repository, schema, token, storage,
queue, or runtime behavior.

# 9. Readiness

## 9.1 Scoring rules

- **Journey Ready:** 100% when the flow maps to frozen Journey authority.
- **Documentation Ready:** uses the section 7 authority-coverage rubric.
- **UX Ready:** 25% means current or predecessor presentation evidence exists but is not approved
  target UX; 0% means no usable current evidence.
- **Frontend Ready:** 0% for every flow because canonical UI authority, feature specifications,
  plans, tasks, and implementation authorization are absent.
- **Backend Ready:** 0% because no approved Foundation successor contracts or implementation
  specifications exist.
- **Production Ready:** 0% because neither implementation nor production evidence is authorized.

| Flow | Journey Ready | Documentation Ready | UX Ready | Frontend Ready | Backend Ready | Production Ready |
|---|---:|---:|---:|---:|---:|---:|
| FLOW-001 | 100% | 100% | 25% evidence | 0% | 0% | 0% |
| FLOW-002 | 100% | 75% | 0% | 0% | 0% | 0% |
| FLOW-003 | 100% | 75% | 0% | 0% | 0% | 0% |
| FLOW-004 | 100% | 75% | 0% | 0% | 0% | 0% |
| FLOW-005 | 100% | 75% | 0% | 0% | 0% | 0% |
| FLOW-006 | 100% | 75% | 0% | 0% | 0% | 0% |
| FLOW-007 | 100% | 75% | 0% | 0% | 0% | 0% |
| FLOW-008 | 100% | 75% | 25% evidence | 0% | 0% | 0% |
| FLOW-009 | 100% | 75% | 25% evidence | 0% | 0% | 0% |
| FLOW-010 | 100% | 75% | 25% evidence | 0% | 0% | 0% |
| FLOW-011 | 100% | 75% | 25% evidence | 0% | 0% | 0% |
| FLOW-012 | 100% | 75% | 25% evidence | 0% | 0% | 0% |
| FLOW-013 | 100% | 75% | 0% | 0% | 0% | 0% |
| FLOW-014 | 100% | 75% | 0% | 0% | 0% | 0% |
| FLOW-015 | 100% | 75% | 0% | 0% | 0% | 0% |
| FLOW-016 | 100% | 75% | 0% | 0% | 0% | 0% |
| FLOW-017 | 100% | 75% | 0% | 0% | 0% | 0% |
| FLOW-018 | 100% | 75% | 0% | 0% | 0% | 0% |
| FLOW-019 | 100% | 75% | 0% | 0% | 0% | 0% |
| FLOW-020 | 100% | 75% | 0% | 0% | 0% | 0% |
| FLOW-021 | 100% | 75% | 0% | 0% | 0% | 0% |
| FLOW-022 | 100% | 75% | 25% evidence | 0% | 0% | 0% |
| FLOW-023 | 100% | 75% | 25% evidence | 0% | 0% | 0% |
| FLOW-024 | 100% | 75% | 25% evidence | 0% | 0% | 0% |
| FLOW-025 | 100% | 50% | 25% evidence | 0% | 0% | 0% |
| FLOW-026 | 100% | 50% | 25% evidence | 0% | 0% | 0% |
| FLOW-027 | 100% | 50% | 25% evidence | 0% | 0% | 0% |
| FLOW-028 | 100% | 50% | 0% | 0% | 0% | 0% |
| FLOW-029 | 100% | 75% | 25% evidence | 0% | 0% | 0% |
| FLOW-030 | 100% | 75% | 25% evidence | 0% | 0% | 0% |
| FLOW-031 | 100% | 75% | 25% evidence | 0% | 0% | 0% |

## 9.2 Readiness totals

| Dimension | Result | Verdict |
|---|---:|---|
| Journey readiness | 100% | Complete authority mapping |
| Documentation readiness | 73% | Complete semantic catalog with explicit owner/later-domain deferrals |
| UX readiness | 12% evidence-weighted | Current evidence only; not approved target UX |
| Frontend readiness | 0% | NOT AUTHORIZED |
| Backend readiness | 0% | NOT AUTHORIZED |
| Production readiness | 0% | NOT READY |

# 10. Final Report

## 10.1 Total flows

**31 canonical semantic flows**:

- 28 primary, supporting, or conditional stage flows; and
- 3 cross-journey flows for returning/resume, locale/direction, and correction/recovery.

## 10.2 Journey coverage

**25 of 25 canonical Journey stages — 100%.** Every `CJ-00` through `CJ-24` stage has at least one
primary flow, an authority reference, screen mapping, coverage classification, and readiness row.

## 10.3 Documentation coverage

**73% flow-weighted authority coverage.** All semantic flow records exist, but exact owner-specific
permission, validation, retention, lifecycle, contract, OS, commercial, and Marketplace details
remain deferred. Stage-weighted coverage is **72%**.

## 10.4 Flow completeness

**31/31 definitions and 651/651 required fields — 100% record completeness.** This means the
required documentation fields are populated. It does not mean UX, contracts, implementation, or
production are complete.

## 10.5 Missing documentation

The blocking documentation gaps are:

1. `UIAUTH-HYGIENE-001` Genesis-source integrity resolution;
2. independent UI/UX Authority Review and Approval;
3. Identity, role/action, candidate conversion, publication, projection, Product Hub, and OS owner
   specifications;
4. approved presentation-state authority derived from this catalog without domain-state invention;
5. approved wireframes after the state-authority gate; and
6. feature specifications, plans, tasks, tests, and implementation-readiness evidence.

## 10.6 Blocking risks

| Risk | Severity | Evidence | Effect |
|---|---|---|---|
| Active Genesis source does not match the v1.1 immutable source manifest | Critical | UIAUTH-HYGIENE-001 in Journey Mapping | UI/UX authority cannot receive reproducible final approval |
| Candidate review and explicit publication owner boundaries have no approved feature contract | Critical | FLOW-014–FLOW-018 dependencies | Implementation could collapse candidate/canonical truth or repeat a consequential action |
| UI/UX package has not passed independent Review/Approval | Critical | Journey Mapping authorization status | These flows cannot authorize wireframes, specs, or implementation |
| Canonical role/action catalog is missing | High | Sections 8.5–8.7 | Protected actions cannot be specified safely |
| Current onboarding encodes Workspace→OS→Plan ordering | High | Screen Map and FLOW-012/FLOW-024 mapping | Existing screens could be mistaken for successor authority |
| Legacy BusinessUnit-as-Business evidence remains | High | FLOW-013 and AGENTS legacy warning | Business/DNA ownership could be modeled incorrectly |
| Deferred lifecycle names may be invented during design | High | Freeze §10; Presentation State Authority | UI terminology could create unauthorized domain states |
| Product Hub/commercial/OS owner projections are unspecified | High | FLOW-023–FLOW-027 | Handoff could collapse subscription, setup, readiness, or access |
| Arabic/English, accessibility, and recovery applied late | High | FLOW-030–FLOW-031; current evidence matrix | Critical flows would be structurally incomplete |
| Marketplace later scope pulled into Foundation feature work | Medium | FLOW-028 | Unauthorized scope expansion |

## 10.7 Quality score

**88/100**:

| Quality dimension | Score |
|---|---:|
| Controlling-authority traceability | 25/25 |
| Journey-to-flow coverage | 20/20 |
| Required flow-definition completeness | 20/20 |
| Authority/evidence/implementation separation | 15/15 |
| Gap, screen, and readiness traceability | 8/10 |
| Canonical Genesis source integrity | 0/10 |

The score measures this documentation package, not implementation maturity.

## 10.8 Confidence score

**93/100 — High** for semantic flow coverage and ownership boundaries. Confidence comes from the
frozen v1.1 architecture, Accepted ADR-043 relationship, Foundation Baseline, approved Genesis
successor addendum, the 25-stage Journey Mapping, and verified current screen inventory. Confidence
is reduced by the Genesis source mismatch and the deliberately deferred owner-specific rules,
contracts, permissions, routes, and lifecycles.

## 10.9 Recommended next phase

1. Resolve `UIAUTH-HYGIENE-001` without rewriting historical evidence.
2. Complete independent UI/UX Authority Review and Approval.
3. If approved, begin **Phase 5 Presentation-State Authority** using these flows only to identify
   presentation, loading, validation, permission, empty, error, recovery, and degraded behavior.

Phase 5 must not convert flow nodes into domain or Session states. Wireframes and feature
specifications remain later gates.

## 10.10 Authorization status

| Work | Status |
|---|---|
| Canonical semantic-flow catalog | Complete as Phase 4 authority candidate |
| State Machines | Not created; not authorized by this document |
| Wireframes | Not created; not authorized |
| Feature Specifications | Not created; blocked pending authority gates |
| Frontend | Not modified; NOT AUTHORIZED |
| Backend | Not modified; NOT AUTHORIZED |
| Implementation | NOT AUTHORIZED |
| Feature 056 | Not started |
| Session 5 | Not started |

# 11. Evidence Index

## 11.1 Controlling Foundation and architecture

- [Core Platform Architecture v1.1 Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md),
  especially §§4–6, 10–11 and 14;
- [Foundation Baseline v0.1](../00-governance/FOUNDATION-BASELINE-v0.1.md), especially §§7–17;
- [Foundation Journey Successor Addendum v1.0](../01-genesis/21-FOUNDATION-JOURNEY-SUCCESSOR-ADDENDUM-v1.0.md),
  especially §§3–7;
- [Business Brain Foundation Compatibility](../03-business-brain/13-BUSINESS-BRAIN-FOUNDATION-COMPATIBILITY-v1.0.md);
- [Marketplace Architecture v1.0 Freeze](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md); and
- [Canonical Glossary](../00-governance/glossary/GLOSSARY.md).

## 11.2 Accepted ADRs

- [ADR-003 — Workspace boundary](../00-governance/ADR/ADR-003-workspace-customer-multi-business-boundary.md)
- [ADR-004 — Organization hierarchy](../00-governance/ADR/ADR-004-genesis-organization-hierarchy.md)
- [ADR-005 — Business DNA ownership](../00-governance/ADR/ADR-005-business-dna-business-scoped-software-independent.md)
- [ADR-013 — Capability-first Recommendations](../00-governance/ADR/ADR-013-capability-first-explainable-recommendations.md)
- [ADR-014 — Human control](../00-governance/ADR/ADR-014-human-control-over-recommendations-and-ai.md)
- [ADR-015 — Infer before asking](../00-governance/ADR/ADR-015-infer-before-asking-conversational-configuration.md)
- [ADR-016 — Governed Business Architect pipeline](../00-governance/ADR/ADR-016-business-architect-governed-pipeline.md)
- [ADR-018 — Separate Core and OS readiness](../00-governance/ADR/ADR-018-separate-core-and-os-readiness.md)
- [ADR-019 — Product Hub handoff](../00-governance/ADR/ADR-019-product-hub-discovery-and-os-handoff.md)
- [ADR-020 — Product Hub composition](../00-governance/ADR/ADR-020-product-hub-composition-not-data-ownership.md)
- [ADR-024 — Independent OS ownership](../00-governance/ADR/ADR-024-independent-operating-system-domain-ownership.md)
- [ADR-026 — OS lifecycle](../00-governance/ADR/ADR-026-standard-operating-system-lifecycle.md)
- [ADR-034 — Tenant/resource scope](../00-governance/ADR/ADR-034-explicit-tenant-and-resource-scope.md)
- [ADR-041 — Localization architecture](../00-governance/ADR/ADR-041-global-localization-internationalized-representation.md)
- [ADR-042 — Pre-Registration Business Discovery](../00-governance/ADR/ADR-042-pre-registration-business-discovery.md)
- [ADR-043 — Discovery/Business Architect composition](../00-governance/ADR/ADR-043-foundation-discovery-and-business-architect-composition.md)

## 11.3 UI/UX authority and evidence

- [Canonical Journey Mapping](./16-CANONICAL-JOURNEY-MAPPING.md)
- [Platform Experience](./01-PLATFORM-EXPERIENCE.md)
- [Screen Map](./02-SCREEN-MAP.md)
- [Information Architecture](./04-INFORMATION-ARCHITECTURE.md)
- [User Journeys](./05-USER-JOURNEYS.md)
- [Predecessor User Flows](./06-USER-FLOWS.md)
- [Presentation State Authority](./07-STATE-MACHINES.md)
- [Accessibility](./09-ACCESSIBILITY.md)
- [Localization](./10-LOCALIZATION.md)
- [UI Copy Guidelines](./11-UI-COPY-GUIDELINES.md)
- [Screen Status Matrix](./12-SCREEN-STATUS-MATRIX.md)
- [UX Gaps](./13-UX-GAPS.md)

## 11.4 Current implementation evidence

- `apps/landing/src/app/` and `apps/landing/src/sections/`;
- `apps/core-platform/app/`, `apps/core-platform/components/`, and `apps/core-platform/lib/`;
- `apps/commerce/app/`, `apps/commerce/components/`, and `apps/commerce/features/`; and
- `packages/contracts/` and `packages/sdk/` only as current compatibility evidence, never target
  backend-contract authority.

# 12. Validation Record

Validation was executed on 2026-07-20 against the repository working tree.

| Validation | Executed result |
|---|---|
| Journey-stage coverage | PASS — all 25 IDs, `CJ-00` through `CJ-24`, occur in the Flow Inventory |
| Flow inventory | PASS — 31 rows and 31 unique `FLOW-*` IDs |
| Flow definitions | PASS — 31 definitions and 31 unique definition IDs |
| Required definition fields | PASS — 651/651 fields present; 21 fields for each of 31 flows |
| Authority references | PASS — 31/31 definitions contain a non-empty Authority References field |
| Orphan flows | PASS — all 31 flow IDs occur in the relationship map |
| Inventory/definition agreement | PASS — no inventory flow lacks a definition and no definition lacks an inventory record |
| Screen mapping | PASS — 31/31 flows mapped; no missing or duplicate mapping row |
| Readiness mapping | PASS — 31/31 flows assessed; no missing or duplicate readiness row |
| Relative Markdown links | PASS — 44 checked; 0 broken |
| Markdown formatting | PASS — final newline present, six balanced text fences, and zero trailing-whitespace lines |
| State-machine artifacts | PASS — no `stateDiagram`, sequence diagram, transition table, or domain lifecycle was created |
| Wireframe artifacts | PASS — no wireframe or visual design artifact was created |
| Business-rule provenance | PASS — semantic rules cite controlling architecture; unapproved owner-specific details are explicitly deferred |
| Implementation detail review | PASS — no route, API, Contract, Event, schema, service, persistence, token, queue, runtime, or technology is defined |
| `git diff --check` | PASS — no output |
| Phase 4 changed path | `docs/03-ui-ux/17-CANONICAL-USER-FLOWS.md` only |
| Working-tree paths | `16-CANONICAL-JOURNEY-MAPPING.md` remains the pre-existing Phase 3 untracked input; this Phase created only `17-CANONICAL-USER-FLOWS.md` |
| Prohibited repository changes | PASS — no Architecture, Freeze, ADR, Foundation, frontend, backend, test, package, configuration, CI, database, infrastructure, or runtime file changed |
| Future milestones | PASS — Feature 056 and Session 5 remain not started; no state-machine, wireframe, or feature-specification artifact was created |
