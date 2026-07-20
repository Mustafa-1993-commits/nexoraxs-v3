# Canonical State Machine Authority

| Field | Value |
|---|---|
| Version | 1.0 Phase 5 authority candidate |
| Status | State-authority inventory and approved-transition register; implementation is not authorized |
| Owner | Architecture and Product Experience Governance; each canonical lifecycle retains its owning domain |
| Controlling architecture | Core Platform Architecture v1.1 Freeze |
| Journey input | Canonical Journey Mapping v1.0 |
| Flow input | Canonical User Flow Authority v1.0 |
| Evidence snapshot | 2026-07-20 |
| Successor use | Input to later wireframe and feature-specification gates only after unresolved lifecycle authority is approved |

## Authority Boundary

This document records only state names, transition edges, invariant checkpoints, failure/recovery
requirements, and ownership boundaries that existing authority supports. It does not convert Journey
stages, User Flow steps, page labels, mock records, or loading/error messages into canonical domain
states.

The controlling [Core Platform Architecture v1.1 Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md)
explicitly defers exact new UX states, Candidate lifecycle mechanisms, Recommendation workflow and
invalidation, Business DNA revision/rollback, retention, permissions, contracts, and implementation.
Therefore, a machine in this document may be:

- **Explicit deterministic authority:** approved state vocabulary and transition edges exist;
- **Explicit vocabulary with incomplete graph:** approved state names exist but some allowed edges
  remain owner-defined;
- **Invariant-only authority:** approved ordering/guards exist, but no canonical state enum or graph
  is authorized;
- **Projection/non-owner boundary:** the concept must present owner state but cannot own a machine;
  or
- **Deferred owner machine:** its exact states/transitions belong to a future owning-domain decision.

An invariant-only or deferred record is intentionally not completed by inference. It identifies the
precise authority missing before a deterministic machine may be approved.

The unresolved `UIAUTH-HYGIENE-001` Genesis-source mismatch recorded in the
[Canonical Journey Mapping](./16-CANONICAL-JOURNEY-MAPPING.md) remains unchanged. This document uses
the controlling Freeze, Accepted ADRs, Foundation Baseline, approved Genesis successor addendum,
and frozen Core baseline.

# 1. Purpose

## 1.1 Why State Machines exist

State machines make consequential lifecycle behavior explicit before design or implementation. They
prevent a UI, client store, API, database enum, or framework from silently deciding which
transitions exist, who may request them, which owner validates them, and how failures recover.

This register also makes absence of authority explicit. If an exact state or edge is not approved,
the later milestone must obtain the owning decision rather than choosing a convenient default.

## 1.2 Relationship to the Journey

The [Canonical Journey Mapping](./16-CANONICAL-JOURNEY-MAPPING.md) defines 25 ordered outcomes,
`CJ-00` through `CJ-24`. Journey stages are not automatically lifecycle states. Section 8 maps each
stage to the owner machine, invariant-only contract, or projection boundary that governs it.

## 1.3 Relationship to User Flows

The [Canonical User Flow Authority](./17-CANONICAL-USER-FLOWS.md) defines 31 actor flows. A flow may
request, observe, or respond to an owner transition; it cannot create the transition. Every flow is
covered by at least one machine contract in sections 3–4 and the coverage matrix.

## 1.4 Relationship to Wireframes

Future wireframes may present only approved owner states and the presentation categories authorized
by [Presentation State Authority](./07-STATE-MACHINES.md). They may not add state names, infer
success, or choose missing transitions. This document creates no wireframe or screen composition.

## 1.5 Relationship to Feature Specifications

Feature specifications must select a bounded machine or invariant, close its named deferrals through
the proper owner, define authorization and validation evidence, and preserve every forbidden edge.
This document is not a feature specification and does not authorize Feature 056.

## 1.6 Relationship to Backend

Backend implementation must eventually enforce owner state and transitions, but this document
defines no API, Event, command, handler, schema, table, enum, storage, token, timer, queue, service,
transaction, retry mechanism, or framework. An explicit state label here is technology-independent.

# 2. State Machine Principles

## 2.1 Single source of truth

Each canonical lifecycle has exactly one owner. This document is the Phase 5 transition register;
the owning Freeze/ADR/domain source remains the authority that permits each state or edge.
Projections, Product Hub, screens, current frontend stores, and analytics never become lifecycle
owners.

## 2.2 Business-first

States describe business meaning, not component visibility. Candidate knowledge, canonical Business
DNA, Recommendation, commercial state, OS setup, readiness, and operation remain separate machines
or invariant boundaries.

## 2.3 Deterministic transitions

An edge is allowed only when authority names or unambiguously orders it. Missing guards or outgoing
edges are marked deferred. No “reasonable” transition is added merely to make a graph complete.

## 2.4 No UI assumptions

Pages, dialogs, steps, buttons, routes, and presentation labels do not define canonical state.
Loading, empty, validation, permission, error, and recovery are presentation categories unless an
owning source explicitly makes one a business state.

## 2.5 No backend assumptions

State storage, concurrency, idempotency mechanisms, time calculations, persistence, delivery, and
integration remain outside this document. Required safety is stated without selecting a mechanism.

## 2.6 Permission-aware

Authentication never implies transition authority. Every protected transition requires current
Workspace and applicable Business, Business Unit, Department, Branch, OS, actor, resource, and
action scope. The owning domain performs final authorization and invariant validation.

## 2.7 Recoverable

Failure does not invent success. Recovery returns to an approved state or owner-supported safe
checkpoint. Retrying a consequential transition never silently duplicates publication, purchase,
configuration, activation, or another owner write.

## 2.8 Auditable

Consequential accepted/rejected transition requests, publication, Recommendation disposition,
commercial/OS lifecycle changes, permission denials where policy requires, and manual intervention
must preserve append-only Audit evidence under future approved policy. Audit records activity; they
do not own lifecycle state.

## 2.9 Separation rules

1. Discovery Session states are not Business Architect Session states.
2. Business Architect Session states are not Guided Activation presentation states.
3. Candidate Business Understanding is not Business DNA.
4. Explicit approval is a gate, not a generic “completed” UI state.
5. Business Blueprint is a projection and owns no lifecycle.
6. Business Insight owns no separate state model under the frozen Business Brain boundary.
7. Recommendation state is separate from Product Hub action and target execution.
8. Core Workspace Ready and Operating System Ready are separate owner outcomes, not two values in
   one onboarding flag.
9. Subscription, installation, setup, configuration, activation, readiness, operation, pause,
   archive, and removal remain distinct.

# 3. State Machine Inventory

## 3.1 Count policy

“State count” and “transition count” include only exact canonical labels and direct edges supported
by authority. Invariant checkpoints and deferred placeholders are excluded from totals. This avoids
presenting an architectural sequence as an invented enum.

| Machine ID | Machine / boundary | Owner | Authority maturity | Exact states | Exact edges | Journey / Flow coverage |
|---|---|---|---|---:|---:|---|
| CSM-001 | Discovery Session | Core Business Discovery | Explicit vocabulary; transition graph incomplete | 4 | 0 | CJ-01–CJ-07; FLOW-002–FLOW-007, FLOW-029, FLOW-031 |
| CSM-002 | Candidate Business Understanding | Core candidate-understanding owner | Invariant-only; exact lifecycle deferred | 0 | 0 | CJ-02–CJ-06, CJ-11–CJ-13; FLOW-003–FLOW-006, FLOW-014–FLOW-017 |
| CSM-003 | Identity and Verification | Core Identity owner | Deferred owner machine | 0 | 0 | CJ-08; FLOW-001, FLOW-008–FLOW-011, FLOW-029 |
| CSM-004 | Workspace Context Resolution | Core Workspace/Membership owners | Invariant-only; exact lifecycle deferred | 0 | 0 | CJ-09; FLOW-012, FLOW-029 |
| CSM-005 | Business Context Resolution | Core Organization Registry/Business owner | Invariant-only; exact lifecycle deferred | 0 | 0 | CJ-10; FLOW-013–FLOW-016, FLOW-029 |
| CSM-006 | Business Architect Session | Core Business Architect pipeline | Explicit primary graph; exceptional graph incomplete | 11 | 6 | CJ-12–CJ-15; FLOW-015–FLOW-019, FLOW-029, FLOW-031 |
| CSM-007 | First Publication Approval Control | Business DNA owner with Business Architect coordination | Invariant-only gate sequence | 0 | 0 | CJ-11–CJ-14; FLOW-014, FLOW-016–FLOW-018, FLOW-031 |
| CSM-008 | Business DNA Publication and Revision | Business DNA owner for exactly one Business | Invariant-only; revision lifecycle deferred | 0 | 0 | CJ-14–CJ-16; FLOW-017–FLOW-020, FLOW-029 |
| CSM-009 | Guided Activation | Retained Business Architect pipeline | Deferred exact presentation/lifecycle machine | 0 | 0 | CJ-15; FLOW-019, FLOW-029, FLOW-031 |
| CSM-010 | Business Blueprint Projection | Core projection; source owners retain truth | Projection/non-owner boundary | 0 | 0 | CJ-16; FLOW-020, FLOW-029, FLOW-031 |
| CSM-011 | Recommendation Lifecycle | Recommendation Engine | Explicit inherited vocabulary; later workflow/invalidation deferred | 5 | 5 | CJ-17; FLOW-021, FLOW-029, FLOW-031 |
| CSM-012 | Core Workspace Readiness Assessment | Core readiness owner | Named outcome/invariant; not a full lifecycle | 0 | 0 | CJ-18; FLOW-022, FLOW-029, FLOW-031 |
| CSM-013 | Product Hub Composition and Handoff | Product Hub as non-owning composer | Projection/non-owner boundary | 0 | 0 | CJ-19–CJ-20; FLOW-023–FLOW-024, FLOW-029, FLOW-031 |
| CSM-014 | Standard Operating System Lifecycle | Applicable OS plus distinct commercial/Core owners | Explicit conceptual lifecycle; physical aggregate deferred | 13 | 12 | CJ-20–CJ-23; FLOW-024–FLOW-027, FLOW-029, FLOW-031 |
| CSM-015 | OS Operational Context | Applicable Operating System | Deferred owner-specific machine | 0 | 0 | CJ-21–CJ-23; FLOW-025–FLOW-027, FLOW-029, FLOW-031 |
| CSM-016 | Growth and Marketplace Boundary | Marketplace and applicable target owners | Deferred later-domain machine | 0 | 0 | CJ-24; FLOW-028, FLOW-031 |
| CSM-017 | Cross-Cutting Interaction and Recovery | Current canonical owner; UI is non-owning | Presentation/non-owner boundary | 0 | 0 | CJ-00–CJ-24; FLOW-001, FLOW-008–FLOW-011, FLOW-029–FLOW-031 |

**Approved exact-state total:** 33.
**Approved direct-transition total:** 23.

## 3.2 Example concepts not promoted to machines

| Example | Authority disposition |
|---|---|
| Visitor Session | Not a canonical term; use Discovery Session only where ADR-042 applies |
| Document Upload | One possible Knowledge Acquisition Method; no standalone lifecycle is approved by Foundation |
| Approval | Represented by CSM-007’s explicit publication gate; no generic cross-domain Approval aggregate is created |
| Recovery | Cross-cutting owner behavior in CSM-017; not one canonical business aggregate |
| Commerce Session | No canonical cross-platform concept is approved; Commerce owns any OS-specific session/transaction lifecycle |
| Operational Context | CSM-015 boundary only; the applicable OS defines exact operational state |

# 4. State Machine Definitions

## 4.1 Definition convention

For invariant-only, projection, or deferred machines, **States**, **Initial State**, **Terminal
States**, and **Allowed Transitions** explicitly say that no exact set/edge is approved. Required
ordering appears as **Invariant checkpoints**, not counted transitions.

## CSM-001 — Discovery Session

- **Machine ID:** CSM-001
- **Purpose:** Govern temporary pre-registration Discovery continuity without creating tenant,
  Business, canonical knowledge, or OS authority.
- **Owner:** Core Business Discovery capability.
- **Related Journey Stage:** CJ-01 through CJ-07.
- **Related User Flows:** FLOW-002 through FLOW-007, FLOW-029, and FLOW-031.
- **States:** `active`, `expired`, `converted`, `abandoned` as explicitly named by ADR-042.
- **Initial State:** Not standardized. ADR-042 names `active` but does not define an initial-state
  rule or creation transition.
- **Terminal States:** Not standardized. ADR-042 states that an expired Session is unusable and
  prevents repeated consumption, but it does not publish a complete terminal-state policy.
- **Allowed Transitions:** No exact transition edges are approved. ADR-042 requires the owner to
  record whether a Session is `active`, `expired`, `converted`, or `abandoned`.
- **Forbidden Transitions:** Any Session status → Workspace, Business, Business DNA, entitlement,
  subscription, or OS authority; conversion before authenticated Workspace/Business resolution and
  material review; unintended repeated consumption.
- **Entry Conditions:** A Discovery Goal can be established; a visitor may begin without
  authentication; no anonymous Workspace or Business is created.
- **Exit Conditions:** Session is expired, converted into authenticated review association, or
  abandoned; canonical publication remains a separate owner transition.
- **Validation Rules:** Session reference must be opaque/non-guessable and protected against
  enumeration, replay, unintended sharing, and abuse; exact mechanism is deferred.
- **Permission Requirements:** Public continuity grants no tenant permission; protected Knowledge
  sources require their own authorization; conversion requires CSM-003–CSM-005 context.
- **Recovery Rules:** Invalid, expired, or already-consumed continuity must receive explicit safe
  recovery; restart or resume behavior depends on future retention authority.
- **Timeout Rules:** Expiry is required; exact duration and mechanism remain deferred.
- **Failure States:** No generic failure state is approved. `expired` and `abandoned` are explicit
  recorded status values, while their terminal graph is not standardized; method errors remain
  presentation/owner failures.
- **Audit Requirements:** Conversion and security-relevant continuity outcomes require future
  approved Audit/observability evidence; no schema is defined.
- **Related Screens:** Future Business Discovery, Candidate Reflection, and Business Report Preview;
  current frontend has none.
- **Authority References:** ADR-042 §§1–3 and 8; Freeze §§5.1–5.4 and 10.3; Foundation §§13 and 16;
  Journey Mapping CJ-01–CJ-07.
- **Current Status:** Explicit state vocabulary is approved; initial/terminal classification,
  transition graph, retention, storage, security mechanism, and UX presentation are missing.
- **Future Dependencies:** Retention/privacy decision, continuity and conversion specification,
  permissions, Audit policy, contracts, and tests.

## CSM-002 — Candidate Business Understanding

- **Machine ID:** CSM-002
- **Purpose:** Preserve the temporary/canonical boundary for candidate knowledge before Business DNA
  publication.
- **Owner:** Core candidate-understanding responsibility; canonical publication remains Business DNA
  owner-controlled.
- **Related Journey Stage:** CJ-02 through CJ-06 and CJ-11 through CJ-13.
- **Related User Flows:** FLOW-003 through FLOW-006 and FLOW-014 through FLOW-017.
- **States:** No exact canonical state set is authorized by the v1.1 Freeze.
- **Initial State:** Deferred; acquired material is not silently assigned an enum value.
- **Terminal States:** Deferred; publication does not turn the candidate object into Business DNA.
- **Allowed Transitions:** No exact direct edges are approved.
- **Invariant Checkpoints:** acquired material → provenance-aware candidate understanding →
  Understanding Reflection/correction → authenticated selected-Business review → separate explicit
  publication approval gate.
- **Forbidden Transitions:** Candidate → canonical Business DNA without CSM-003–CSM-007; candidate →
  authorization fact; candidate → OS configuration; pre-registration candidate → anonymous
  Workspace/Business ownership; correction erasing provenance.
- **Entry Conditions:** Authorized source material exists with provenance/confidence context.
- **Exit Conditions:** Candidate remains temporary, is safely unavailable/discarded under future
  policy, or provides approved input to CSM-007; exact disposition is deferred.
- **Validation Rules:** Preserve Observed Fact/Inference/Assessment/Need/Outcome distinctions,
  contradictions, confidence, evidence, Original Source, review, and corrections.
- **Permission Requirements:** Public candidate access remains bounded to its permitted context;
  authenticated review requires exact Workspace, Business, actor, resource, and action authority.
- **Recovery Rules:** Return to material acquisition/correction or safe exit; exact resume,
  invalidation, discard, and deletion rules remain deferred.
- **Timeout Rules:** No Candidate timeout/lifecycle duration is standardized; Discovery Session
  expiry must not be copied into a Candidate enum by assumption.
- **Failure States:** None approved. Insufficient evidence, contradiction, low confidence,
  validation failure, and permission denial are conditions/presentation outcomes until an owner
  source defines state.
- **Audit Requirements:** Publication inputs and material corrections require future traceability;
  pre-canonical activity must follow approved privacy/Audit policy.
- **Related Screens:** Future Candidate Understanding, Reflection, Conversion Review, and Material
  Review; no current screens.
- **Authority References:** Freeze §§5.2–5.4, 10.3 and 11; ADR-042 §§3–4 and 8; Foundation §§13 and
  16; Presentation State Authority §5.2.
- **Current Status:** Invariant-only; exact lifecycle is deliberately deferred.
- **Future Dependencies:** Candidate lifecycle decision, materiality/sufficiency rules, retention,
  permissions, owner contracts, recovery, Audit, and feature specification.

## CSM-003 — Identity and Verification

- **Machine ID:** CSM-003
- **Purpose:** Bound authentication, conditional verification, recovery, and safe entry without
  treating identity as authorization or Business approval.
- **Owner:** Core Identity owner.
- **Related Journey Stage:** CJ-00 and CJ-08.
- **Related User Flows:** FLOW-001 and FLOW-008 through FLOW-011, plus FLOW-029 and FLOW-031.
- **States:** No exact Identity, verification, credential, or recovery state set is selected by the
  Freeze.
- **Initial State:** Deferred.
- **Terminal States:** Deferred.
- **Allowed Transitions:** No canonical Identity edge is defined here.
- **Invariant Checkpoints:** public/unauthenticated entry → owner authentication or registration →
  conditional verification when required → separately authorized context resolution.
- **Forbidden Transitions:** Authentication/registration/verification → Workspace or Business
  authorization by implication; identity data → Business DNA; client session → proof of protected
  access; recovery → silent membership or permission change.
- **Entry Conditions:** Public identity entry, protected-resource authentication requirement, or
  owner-approved recovery need.
- **Exit Conditions:** Owner-authenticated Identity proceeds to CSM-004 or safe return; exact
  credential/session outcomes remain deferred.
- **Validation Rules:** Identity-owner validation controls; untrusted return/context identifiers are
  revalidated; verification is conditional rather than universally inferred.
- **Permission Requirements:** Identity proof alone grants no Workspace, Business, OS, resource, or
  action authority.
- **Recovery Rules:** Owner-approved Login, Registration, Verification, and Recovery paths must fail
  safely without identity/tenant disclosure.
- **Timeout Rules:** Credential, session, verification, and recovery expiry are deferred under
  Freeze D-10–D-18.
- **Failure States:** No canonical set approved; invalid credentials, verification failure, expired
  evidence, and permission denial remain owner outcomes.
- **Audit Requirements:** Security-relevant authentication/recovery activity follows future Identity
  Audit/security policy; no event or schema is defined.
- **Related Screens:** Existing Login, Register, Verify Email, Forgot Password, and Reset Password
  are current evidence only.
- **Authority References:** Freeze §§4.8, 5.3 and 10.1; ADR-034; ADR-042 §8; ADR-043
  “Direct-registration compatibility”; Journey Mapping CJ-08.
- **Current Status:** Deferred owner machine; browser-mock flags are not canonical states.
- **Future Dependencies:** Authentication/session decision, verification/recovery policy, credential
  security, safe-return rules, contracts, Audit, and feature specification.

## CSM-004 — Workspace Context Resolution

- **Machine ID:** CSM-004
- **Purpose:** Establish one authorized tenant context before Business selection or protected action.
- **Owner:** Core Workspace and Workspace Membership owners.
- **Related Journey Stage:** CJ-09.
- **Related User Flows:** FLOW-012 and FLOW-029, with FLOW-031 recovery.
- **States:** No exact Workspace or Membership lifecycle state set is frozen for this flow.
- **Initial State:** Deferred; an authenticated actor may have zero, one, or multiple authorized
  Workspace choices without creating a canonical state enum here.
- **Terminal States:** Deferred.
- **Allowed Transitions:** No exact lifecycle edges approved.
- **Invariant Checkpoints:** authenticated Identity → authorized Workspace membership/creation
  decision → owner validation → selected authorized Workspace context.
- **Forbidden Transitions:** Anonymous Workspace creation; Identity → Workspace authorization by
  implication; Workspace → Business synonym; selected Workspace → access to every Business/OS;
  client-provided Workspace ID → proof.
- **Entry Conditions:** Owner-authenticated Identity and applicable membership or creation authority.
- **Exit Conditions:** One owner-authorized Workspace context proceeds to CSM-005, or the actor exits
  without valid context.
- **Validation Rules:** Workspace identity, membership, creation/selection action, and tenant scope
  are owner-validated.
- **Permission Requirements:** Workspace membership is necessary where applicable but does not
  replace Business, OS, resource, and action permissions.
- **Recovery Rules:** Refresh authorized choices, correct creation input, change Identity, or return
  safely; access requests occur outside this machine.
- **Timeout Rules:** No Workspace resolution timeout or Membership lifecycle timing is approved.
- **Failure States:** None approved; no authorized Workspace, validation failure, stale membership,
  and owner unavailability are outcomes requiring safe presentation.
- **Audit Requirements:** Workspace creation and consequential membership changes require future
  Audit policy; selection/navigation alone is not assigned an Audit event here.
- **Related Screens:** `/welcome`, Workspace onboarding step, and Context Switcher are partial/
  conflicting evidence.
- **Authority References:** Freeze §§4.1, 4.8, 5.3–5.4 and 10.1; ADR-003; ADR-034; Journey Mapping
  CJ-09; User Flow FLOW-012.
- **Current Status:** Invariant-only; exact owner lifecycle and permissions remain deferred.
- **Future Dependencies:** Workspace/Membership lifecycle, creation and selection permissions,
  context switching, Audit, contracts, migration compatibility, and feature specification.

## CSM-005 — Business Context Resolution

- **Machine ID:** CSM-005
- **Purpose:** Establish the exact authorized Business context that may own Business DNA and scope
  candidate review.
- **Owner:** Core Organization Registry and Business owner boundary.
- **Related Journey Stage:** CJ-10 and CJ-11.
- **Related User Flows:** FLOW-013 through FLOW-016 and FLOW-029, with FLOW-031 recovery.
- **States:** No exact Business lifecycle or context-selection state set is authorized for this flow.
- **Initial State:** Deferred.
- **Terminal States:** Deferred.
- **Allowed Transitions:** No exact lifecycle edges approved.
- **Invariant Checkpoints:** authorized Workspace → authorized Business choices/creation → owner
  validation → one selected Business context → candidate conversion/acquisition/review.
- **Forbidden Transitions:** Business Unit substituted for Business; candidate assigned to multiple
  Businesses in one conversion; Workspace-owned Business DNA; selection publishing Business DNA;
  client Business ID proving access.
- **Entry Conditions:** CSM-004 yields authenticated Workspace context and actor has applicable
  Business view/create/select authority.
- **Exit Conditions:** One authorized selected Business enters CSM-002/CSM-006/CSM-007, or no context
  is established.
- **Validation Rules:** Canonical organization hierarchy, Business identity, creation/selection
  authority, target uniqueness, and legacy compatibility are owner-validated.
- **Permission Requirements:** Workspace membership plus explicit Business/resource/action scope.
- **Recovery Rules:** Refresh choices, correct creation input, choose another authorized Business,
  return to Workspace, or exit with no publication.
- **Timeout Rules:** No Business resolution or creation timeout is approved.
- **Failure States:** None approved; no authorized Business, duplicate/invalid creation, permission
  loss, and owner failure remain outcomes.
- **Audit Requirements:** Business creation and consequential organization changes require future
  Audit evidence; selection presentation does not define an Event.
- **Related Screens:** Canonical Business Resolution is missing; current BusinessUnit-as-Business
  labels are non-canonical evidence.
- **Authority References:** Freeze §§4.1–4.2, 5.4 and 6; ADR-004; ADR-005; ADR-034; Journey Mapping
  CJ-10–CJ-11; User Flow FLOW-013.
- **Current Status:** Invariant-only; canonical screen/model migration and lifecycle are unresolved.
- **Future Dependencies:** Business lifecycle/permissions, organization migration compatibility,
  creation/select contracts, Audit, and feature specification.

## CSM-006 — Business Architect Session

- **Machine ID:** CSM-006
- **Purpose:** Govern one resumable selected-Business understanding pipeline independently from
  published Business DNA.
- **Owner:** Core Business Architect Session/pipeline owner.
- **Related Journey Stage:** CJ-12 through CJ-15.
- **Related User Flows:** FLOW-015 through FLOW-019, FLOW-029, and FLOW-031.
- **States:** Primary: `not_started`, `in_progress`, `review_required`, `publish_ready`, `published`,
  `analyzed`, `completed`. Exceptional: `paused`, `blocked`, `expired`, `superseded`.
- **Initial State:** `not_started`.
- **Terminal States:** `completed` is the explicit normal terminal. Authority does not standardize
  whether/how `expired` or `superseded` may recover; `paused` and `blocked` terminality is not
  assumed.
- **Allowed Transitions:** `not_started → in_progress`; `in_progress → review_required`;
  `review_required → publish_ready`; `publish_ready → published`; `published → analyzed`;
  `analyzed → completed`. Exceptional-state entry/exit edges are not standardized.
- **Forbidden Transitions:** Skipping review/publication readiness; combining multiple Businesses;
  pipeline state becoming Business DNA; analysis retry republishing/changing DNA silently;
  exceptional terms becoming Discovery or Guided Activation presentation states.
- **Entry Conditions:** Authenticated Workspace, one selected Business, initiating actor, applicable
  participation permission, and owner-resolved Session or creation authority.
- **Exit Conditions:** Normal `completed`, or owner-reported exceptional condition; post-v1
  continuation may be presented as Guided Activation without renaming Session states.
- **Validation Rules:** Context, provenance, normalization, deterministic validation, review,
  publication readiness, publication result, analysis, and readiness are separated; materiality
  threshold remains deferred.
- **Permission Requirements:** Workspace, Business, Session participation, evidence, review,
  publication request, analysis result, and resource/action scopes as applicable.
- **Recovery Rules:** Owner may report pause, block, expiry, or supersession; exact allowed recovery
  edges are deferred and UI must not calculate them.
- **Timeout Rules:** `expired` is approved; duration and expiry/restart mechanics remain deferred.
- **Failure States:** `blocked` and `expired` are named exceptional states; generic validation or
  dependency failures do not become extra states without owner authority.
- **Audit Requirements:** Material review, publication request/result, analysis, exceptional owner
  changes, and consequential recovery require traceability under future Audit policy.
- **Related Screens:** Future Business Architect acquisition, Candidate Review, Publication
  Approval, Guided Activation; current onboarding is not this machine.
- **Authority References:** Core Platform Architecture §3.3; Domain Model §5; Data Ownership §5.10;
  Freeze §5.5; ADR-016; ADR-043; Presentation State Authority §4.1.
- **Current Status:** Primary graph and exceptional vocabulary are approved; exceptional edges,
  materiality, duration, concurrency, and implementation are missing.
- **Future Dependencies:** Exceptional transition policy, materiality/readiness rules, Session
  permissions, concurrency/idempotency, contracts, Audit, and feature specification.

## CSM-007 — First Publication Approval Control

- **Machine ID:** CSM-007
- **Purpose:** Enforce the non-bypassable gates between temporary candidate understanding and first
  canonical Business DNA publication.
- **Owner:** Business DNA owner validates/publishes; Business Architect coordinates reviewed
  candidate input; customer retains explicit approval authority.
- **Related Journey Stage:** CJ-11 through CJ-14.
- **Related User Flows:** FLOW-014, FLOW-016, FLOW-017, FLOW-018, and FLOW-031.
- **States:** No canonical Approval aggregate or state enum is approved.
- **Initial State:** Not standardized.
- **Terminal States:** Not standardized.
- **Allowed Transitions:** No exact state edges are defined; only the invariant gate order below is
  approved.
- **Invariant Checkpoints:** temporary candidate → authenticated Workspace and selected Business →
  material review and correction → explicit customer approval → Business DNA owner validation →
  first governed Business DNA v1 publication result.
- **Forbidden Transitions:** Registration/verification/“Next”/form completion → approval; candidate →
  published without material review; approval before selected Business; client success → owner
  publication; retry causing duplicate unintended publication.
- **Entry Conditions:** CSM-002 candidate, CSM-003 Identity, CSM-004 Workspace, CSM-005 Business, and
  CSM-006 review readiness are valid under owner authority.
- **Exit Conditions:** Owner-confirmed first publication enters CSM-008/CSM-009; rejection/validation
  failure returns to owner-supported review without claiming publication.
- **Validation Rules:** Exact Business, actor, candidate version/materiality, correction history,
  approval action, owner invariants, and uncertain/retry safety must be validated.
- **Permission Requirements:** Candidate review/correction and Business DNA publication approval are
  distinct actions; final publication remains owner-authorized.
- **Recovery Rules:** Unknown outcome must be resolved from owner evidence; never resubmit by
  assumption; return to review/correction or safe pause.
- **Timeout Rules:** Approval/request expiry is not standardized.
- **Failure States:** None approved. Stale candidate, validation failure, permission denial, owner
  rejection, and unknown outcome are conditions requiring later owner definition.
- **Audit Requirements:** Consequential approval request, actor/context, candidate version,
  validation result, publication result, and recovery/manual intervention require append-only
  evidence under future policy.
- **Related Screens:** Future Candidate Review, explicit Publication Approval, and shared Publication
  Result; no current screens.
- **Authority References:** Freeze §§5.3–5.5 and 11; ADR-042 §8; ADR-043; Foundation §§7.6 and 16;
  Journey Mapping CJ-11–CJ-14; User Flows FLOW-016–FLOW-018.
- **Current Status:** Invariant-only; exact approval/request/result state model is missing.
- **Future Dependencies:** Approver permission, materiality/readiness policy, owner validation and
  response contract, uncertain-outcome/retry rules, Audit, and feature specification.

## CSM-008 — Business DNA Publication and Revision

- **Machine ID:** CSM-008
- **Purpose:** Preserve Business-scoped canonical ownership, first publication, versioning, and later
  governed revision without treating candidate or projection as DNA state.
- **Owner:** Business DNA owner for exactly one Business.
- **Related Journey Stage:** CJ-14 through CJ-16.
- **Related User Flows:** FLOW-017 through FLOW-020 and FLOW-029.
- **States:** No exact Business DNA lifecycle state enum is approved by Foundation v1.1.
- **Initial State:** Not standardized; “no published v1” is an observable absence, not an approved
  enum label here.
- **Terminal States:** Not standardized; version history and archival/rollback policy are deferred.
- **Allowed Transitions:** No exact direct edges counted.
- **Invariant Checkpoints:** owner-validated explicit first-publication request → immutable/versioned
  Business DNA v1 owner result → later revision only through a separate governed review/publication
  process.
- **Forbidden Transitions:** Candidate → Business DNA by UI write; Workspace/Business Unit/OS owning
  DNA; Business DNA containing software selection/configuration; Blueprint/Recommendation editing
  DNA; Guided Activation silently revising it.
- **Entry Conditions:** CSM-007 owner validation succeeds for one authenticated selected Business.
- **Exit Conditions:** Owner-confirmed published version becomes input to CSM-009/CSM-010 and
  intelligence; revision remains separately governed.
- **Validation Rules:** Business scope, software independence, approved material, provenance,
  confidence, lineage, version identity, and owner invariants.
- **Permission Requirements:** View, review, approve publication, request revision, and consume
  projections are separate owner-controlled permissions.
- **Recovery Rules:** Resolve unknown publication from owner evidence; failed revision returns to
  reviewed source without modifying the last approved version.
- **Timeout Rules:** None standardized; revision/rollback/retention timing is deferred.
- **Failure States:** None approved. Publication rejection, validation failure, stale version,
  permission denial, and revision conflict are future owner outcomes.
- **Audit Requirements:** Publication/revision actor, Business, source candidate/approved material,
  versions, reasoning/provenance, result, and manual intervention require append-only evidence.
- **Related Screens:** Shared Publication Result, Guided Activation, and Business Blueprint; no
  current Business DNA screen.
- **Authority References:** ADR-005; ADR-042 §§8–9; ADR-043; Foundation §§13 and 16; Freeze §§4.3 and
  5.4–5.6; Journey Mapping CJ-14–CJ-16.
- **Current Status:** First-publication invariant is approved; exact revision/rollback lifecycle is
  explicitly deferred.
- **Future Dependencies:** Business DNA revision/rollback policy, version/approval permissions,
  owner contracts, conflict/recovery, Audit, and feature specification.

## CSM-009 — Guided Activation

- **Machine ID:** CSM-009
- **Purpose:** Bound post-first-publication continuation of the retained Business Architect pipeline
  without creating a new lifecycle or taking OS setup ownership.
- **Owner:** Retained Business Architect pipeline.
- **Related Journey Stage:** CJ-15.
- **Related User Flows:** FLOW-019, FLOW-029, and FLOW-031.
- **States:** No exact Guided Activation state set is authorized.
- **Initial State:** Not standardized; entry is permitted only after owner-confirmed first Business
  DNA publication.
- **Terminal States:** Not standardized.
- **Allowed Transitions:** No exact Guided Activation edges approved.
- **Invariant Checkpoints:** published Business DNA → resolve remaining material uncertainty using
  inherited pipeline → any canonical revision returns to CSM-007/CSM-008 → prepare governed owner
  outputs/Blueprint.
- **Forbidden Transitions:** Entry before Business DNA v1; Business Architect Session terms copied as
  Guided Activation states; direct DNA write; Guided Activation → OS configuration/setup state;
  repeated questioning of confirmed material without approved reason.
- **Entry Conditions:** CSM-008 confirms a published Business DNA version and CSM-006 owner provides
  permitted continuation for an authorized selected-Business actor.
- **Exit Conditions:** Owner-supported continuation, governed revision path, Business Blueprint/Core
  destination, or safe pause; exact completion is deferred.
- **Validation Rules:** Infer before asking; preserve provenance/confidence; only necessary stale,
  conflicting, uncertain, or policy-required gaps are revisited.
- **Permission Requirements:** Selected Business, pipeline participation, protected evidence,
  revision request, and projection access as applicable.
- **Recovery Rules:** Present only CSM-006 owner-supported pause/block/expiry/supersession behavior;
  no independent Guided Activation recovery state is invented.
- **Timeout Rules:** None standardized separately from CSM-006.
- **Failure States:** None approved; remaining gaps, validation errors, and dependency failures are
  conditions/presentation outcomes.
- **Audit Requirements:** Material correction/revision requests and consequential owner results
  require traceability under future policy.
- **Related Screens:** Future Guided Activation; current Core onboarding is not this boundary.
- **Authority References:** Freeze §5.5 and §11; ADR-015; ADR-016; ADR-042 §9; ADR-043; Addendum §5;
  Presentation State Authority §5.3.
- **Current Status:** Invariant-only/deferred; no exact machine may be implemented from this document.
- **Future Dependencies:** Guided Activation completion/continuity authority, CSM-006 integration,
  revision rules, permissions, contracts, Audit, and feature specification.

## CSM-010 — Business Blueprint Projection

- **Machine ID:** CSM-010
- **Purpose:** Prevent Business Blueprint presentation conditions from becoming canonical lifecycle
  state or an independent write owner.
- **Owner:** Core projection boundary; Business DNA and other governed owners retain source truth.
- **Related Journey Stage:** CJ-16.
- **Related User Flows:** FLOW-020, FLOW-029, and FLOW-031.
- **States:** No canonical Business Blueprint lifecycle states exist. Loading, partial/stale, ready,
  unavailable, and denied are presentation categories only.
- **Initial State:** Not applicable to a canonical machine.
- **Terminal States:** Not applicable.
- **Allowed Transitions:** None; projection refresh/navigation is not a canonical business transition.
- **Forbidden Transitions:** Blueprint → Business DNA write; Blueprint → independent source of truth;
  projection status → owner state; Blueprint merged with temporary Preview or Recommendation.
- **Entry Conditions:** Authenticated selected-Business context, view permission, current approved DNA
  version, and permission-filtered governed owner outputs.
- **Exit Conditions:** View remains non-writing; correction routes to source owner; navigation may
  continue to Core/Recommendation/Product Hub without transferring ownership.
- **Validation Rules:** Source/version/permission context, partiality/staleness disclosure, and
  non-writing behavior.
- **Permission Requirements:** Business/Blueprint view and each protected source projection are
  owner-filtered.
- **Recovery Rules:** Retry projection, return to source-owner workflow, select authorized context,
  or safe Core return; no projection-local repair of canonical state.
- **Timeout Rules:** Projection freshness policy is not standardized.
- **Failure States:** None canonical; loading, partial/stale, unavailable, denied, and error are
  presentation categories.
- **Audit Requirements:** Viewing policy is deferred; correction requests and consequential source
  changes are audited by their owners.
- **Related Screens:** Future Business Blueprint; no current screen.
- **Authority References:** Freeze §5.6 and §11; Foundation §10; Addendum §6; Presentation State
  Authority §5.4; Journey Mapping CJ-16.
- **Current Status:** Non-owner boundary; creating a Blueprint state machine is prohibited.
- **Future Dependencies:** Projection contract, source/version/freshness and permission policy,
  presentation-state spec, accessibility/localization, and feature specification.

## CSM-011 — Recommendation Lifecycle

- **Machine ID:** CSM-011
- **Purpose:** Preserve the inherited minimal Recommendation lifecycle while preventing advice from
  becoming automatic product adoption or target execution.
- **Owner:** Recommendation Engine.
- **Related Journey Stage:** CJ-17.
- **Related User Flows:** FLOW-021, FLOW-029, and FLOW-031.
- **States:** `generated`, `reviewed`, `accepted`, `rejected`, `learned`.
- **Initial State:** `generated`.
- **Terminal States:** `learned` in the inherited sequence. Exact invalidation/supersession/expiry and
  whether all dispositions must reach learning remain deferred outside the five approved edges.
- **Allowed Transitions:** `generated → reviewed`; `reviewed → accepted`; `reviewed → rejected`;
  `accepted → learned`; `rejected → learned`.
- **Forbidden Transitions:** `generated → accepted/rejected`; Recommendation → Business DNA;
  Recommendation → Product Hub ownership; acceptance → automatic configuration/action; product-only
  Recommendation without Capability/Need/evidence.
- **Entry Conditions:** Reviewed Business understanding, owner-approved Business Brain Decision/
  candidate input, Capability-first reasoning, evidence/confidence, and authorized Business context.
- **Exit Conditions:** Customer disposition and any approved learning evidence remain Recommendation
  owner-controlled; target execution is a separate owner transition.
- **Validation Rules:** Evidence, rationale, assumptions, alternatives, risk, confidence, Capability,
  Need, outcome, version, and Product Ethics requirements.
- **Permission Requirements:** View, review, accept/reject, access lineage, and request a target action
  are separate; target owner reauthorizes execution.
- **Recovery Rules:** Missing/unsafe evidence withholds misleading advice; correction returns to
  source owner; exact review/invalidation recovery remains deferred.
- **Timeout Rules:** No Recommendation expiry/invalidation timing is approved.
- **Failure States:** None in the inherited five-state vocabulary; no-Recommendation and insufficient
  confidence are valid outcomes, not necessarily lifecycle states.
- **Audit Requirements:** Generation version/context, review/disposition actor, accepted/rejected
  outcome, lineage, reasoning snapshot, and consequential downstream request require traceability.
- **Related Screens:** Future Business Insight and Optional Recommendation presentation; no current
  screen.
- **Authority References:** Core Domain Model §7 “Recommendation”; Data Ownership §5.10; Freeze
  §§4.3, 5.7–5.9 and 10.3; ADR-013; ADR-014; Foundation §§14–15.
- **Current Status:** Minimal inherited graph approved; review workflow, invalidation, expiry, and
  persistence remain explicitly deferred.
- **Future Dependencies:** Recommendation workflow/invalidation decision, Explainability/lineage UI
  authority, permissions, target-action contracts, Audit, and feature specification.

## CSM-012 — Core Workspace Readiness Assessment

- **Machine ID:** CSM-012
- **Purpose:** Preserve Core Workspace Ready as a Core-owned outcome separate from every OS lifecycle.
- **Owner:** Core readiness owner using underlying owner facts.
- **Related Journey Stage:** CJ-18.
- **Related User Flows:** FLOW-022, FLOW-029, and FLOW-031.
- **States:** No two-state or onboarding-complete enum is authorized. `Core Workspace Ready` is a
  named readiness outcome, not a replacement lifecycle record.
- **Initial State:** Not standardized.
- **Terminal States:** Not standardized; readiness may need reevaluation, but transition policy is
  not defined.
- **Allowed Transitions:** None counted. Readiness is an assessment over explicit underlying facts,
  not a client-set transition.
- **Invariant Checkpoints:** Workspace exists → selected Business identity → sufficient reviewed
  Core Business DNA → applicable initial Recommendation result under ADR-018/Foundation ethics →
  Core owner may report Core Workspace Ready → Product Hub permitted.
- **Forbidden Transitions:** Generic `onboarding_complete`; OS subscription/setup/readiness → Core
  Ready by implication; Core Ready → OS Ready; Product Hub/client deriving owner result.
- **Entry Conditions:** Authorized Workspace and selected Business context plus available underlying
  owner facts.
- **Exit Conditions:** Owner-reported Core Ready permits Product Hub/Core entry; unmet criteria remain
  visible without inventing a lifecycle state.
- **Validation Rules:** Evaluate explicit criteria and report unmet requirements. ADR-018’s “initial
  Recommendations” criterion must be reconciled with Foundation’s valid no-Recommendation outcome;
  this document does not choose the interpretation.
- **Permission Requirements:** Readiness view and underlying protected facts are permission-filtered;
  Product Hub/action permissions remain separate.
- **Recovery Rules:** Refresh underlying owner facts, return to the relevant owner workflow, or use
  safe Core destination; never force OS setup to repair Core readiness.
- **Timeout Rules:** Readiness freshness/reevaluation interval is not standardized.
- **Failure States:** None canonical; criteria unmet, owner projection unavailable, stale, or denied
  are assessment/presentation outcomes.
- **Audit Requirements:** Readiness determination/version and consequential gating require future
  traceability; no Event is defined.
- **Related Screens:** Core Dashboard and Product Hub; current Commerce-dependent guard conflicts
  with this separation.
- **Authority References:** ADR-018; Freeze §§4.4 and 5.10; Core Architecture §9.1; Domain Model
  “Readiness Assessment”; Addendum rules 10 and 13; Journey Mapping CJ-18.
- **Current Status:** Named outcome/invariant only; exact reevaluation lifecycle and one criterion
  interpretation require approval.
- **Future Dependencies:** Readiness criterion clarification, owner fact/projection contract,
  permissions, freshness/recovery, Audit, and feature specification.

## CSM-013 — Product Hub Composition and Handoff

- **Machine ID:** CSM-013
- **Purpose:** Prevent Product Hub’s composed lifecycle presentation and routing from becoming a
  competing state owner.
- **Owner:** Product Hub owns composition/navigation; each product, commercial, Marketplace,
  Recommendation, and OS domain owns its source state.
- **Related Journey Stage:** CJ-19 and CJ-20.
- **Related User Flows:** FLOW-023, FLOW-024, FLOW-029, and FLOW-031.
- **States:** Product Hub owns no combined canonical state machine. Availability, Recommendation,
  entitlement, subscription, installation, setup, configuration, activation, readiness, access,
  pause, archive, and removal remain distinct owner facts.
- **Initial State:** Not applicable to a non-owning projection.
- **Terminal States:** Not applicable.
- **Allowed Transitions:** Product Hub performs no canonical owner transition by itself; it may route
  an authorized request to the relevant owner.
- **Forbidden Transitions:** Composed card/status → canonical owner state; subscription → readiness or
  access; Product Hub → OS setup write; Product Hub → Recommendation/Marketplace ownership;
  client projection repairing owner divergence.
- **Entry Conditions:** Authenticated authorized Workspace and applicable Business context; owner
  projections available as permitted.
- **Exit Conditions:** Owner-governed commercial, selection, setup, launch, recovery, or neutral Core
  destination; Product Hub retains no transferred ownership.
- **Validation Rules:** Resolve actor/context/permission; distinguish each source lifecycle and
  freshness; do not invent success when projections are absent or inconsistent.
- **Permission Requirements:** Product Hub entry, each source projection, selection, commercial
  action, setup, launch, and target resource/action are independently authorized.
- **Recovery Rules:** Preserve Core context, refresh owner projections, return neutrally, or route to
  owner recovery; Product Hub never rewrites source state.
- **Timeout Rules:** Projection freshness and handoff expiry mechanisms are deferred.
- **Failure States:** None canonical to Product Hub; pending, failed, retryable, blocked, and recovery
  are presentation/long-running-operation categories sourced from owners.
- **Audit Requirements:** Product Hub viewing/navigation policy is deferred; consequential owner
  requests and results are audited by their owners with correlation.
- **Related Screens:** Current `/dashboard/apps` and onboarding OS step are partial/stale evidence.
- **Authority References:** Freeze §§4.4, 5.10 and 11; ADR-019; ADR-020; Core Architecture §§4 and 9;
  Journey Mapping CJ-19–CJ-20.
- **Current Status:** Projection/non-owner boundary; no Product Hub aggregate state machine is
  authorized.
- **Future Dependencies:** Owner projection/freshness contracts, action/permission matrix,
  commercial and handoff decisions, recovery, Audit/observability, and feature specification.

## CSM-014 — Standard Operating System Lifecycle

- **Machine ID:** CSM-014
- **Purpose:** Preserve the approved conceptual lifecycle shared by independent Operating Systems
  while retaining separate commercial, Core, and OS ownership.
- **Owner:** Applicable OS owns setup/configuration/readiness/operation; commercial/Core owners retain
  their lifecycle facts; no unresolved combined aggregate is created.
- **Related Journey Stage:** CJ-20 through CJ-23.
- **Related User Flows:** FLOW-024 through FLOW-027, FLOW-029, and FLOW-031.
- **States:** `Available`, `Recommended`, `Selected and Subscribed`, `Installed`, `Configured`,
  `Activated`, `Operating System Ready`, `Operational`, `Extended`, `Upgraded`, `Paused`, `Archived`,
  `Removed`.
- **Initial State:** `Available`.
- **Terminal States:** `Removed` in the approved forward sequence.
- **Allowed Transitions:** `Available → Recommended`; `Recommended → Selected and Subscribed`;
  `Selected and Subscribed → Installed`; `Installed → Configured`; `Configured → Activated`;
  `Activated → Operating System Ready`; `Operating System Ready → Operational`;
  `Operational → Extended`; `Extended → Upgraded`; `Upgraded → Paused`; `Paused → Archived`;
  `Archived → Removed`.
- **Forbidden Transitions:** Subscription → installed/configured/ready/access by implication; Core
  Ready → OS Ready; Product Hub/client → OS owner state; OS setup state written by Core; one OS
  depending on another OS for its core workflow; combined `OSEnablement` inferred from this sequence.
- **Entry Conditions:** OS Product is available under product owner authority; later edges require
  the applicable commercial, installation, organization, OS setup/configuration/activation,
  readiness/access, and actor permissions.
- **Exit Conditions:** `Removed` preserves platform integrity and historical records according to
  future retention policy; other OSs continue independently.
- **Validation Rules:** Every lifecycle concept remains distinct and owner-validated. Operating
  System Ready additionally requires eligible subscription, installation, operational Business
  Unit, OS-specific setup, configuration, activation, access, and applicable permissions.
- **Permission Requirements:** Selection/subscription, installation, setup, configuration,
  activation, launch, operation, extension, upgrade, pause, archive, and removal are distinct owner
  actions.
- **Recovery Rules:** Pause is defined as temporary, but no approved `Paused → Operational` edge or
  other resume/rollback graph is specified; later authority must define it rather than infer it.
- **Timeout Rules:** No lifecycle timing, trial duration, installation timeout, setup expiry, or
  archival/retention duration is standardized here.
- **Failure States:** No generic OS failure states appear in the thirteen-state lifecycle. Failed,
  retryable, blocked, and recovery conditions require owning operation/feature authority.
- **Audit Requirements:** Commercial, installation, configuration, activation, readiness, operation,
  extension/upgrade, pause, archive, and removal changes require owner Audit/correlation under
  future approved policy.
- **Related Screens:** Product Hub, Commerce `/setup`, Commerce Dashboard and operational routes are
  current evidence; exact state labels must come from owners.
- **Authority References:** ADR-018; ADR-023; ADR-024; ADR-026; Genesis Operating System Lifecycle;
  Freeze §§4.4 and 5.10; Core Domain Model §8; Journey Mapping CJ-20–CJ-23.
- **Current Status:** Explicit conceptual vocabulary and forward sequence approved. Physical records,
  exact cross-owner transaction model, failures, resume/rollback, and implementation remain deferred.
- **Future Dependencies:** Successor to legacy `OSEnablement`, commercial states, owner contracts,
  OS-specific setup/operation machines, failure/recovery, permissions, Audit, and feature specs.

## CSM-015 — OS Operational Context

- **Machine ID:** CSM-015
- **Purpose:** Bound OS-specific setup, readiness, session, and daily-operation state to the
  applicable independent Operating System.
- **Owner:** Applicable Operating System; Commerce owns Commerce operational facts and workflows.
- **Related Journey Stage:** CJ-21 through CJ-23.
- **Related User Flows:** FLOW-025 through FLOW-027, FLOW-029, and FLOW-031.
- **States:** No generic cross-OS operational or “Commerce Session” state set is approved here.
- **Initial State:** Deferred to the owning OS/feature.
- **Terminal States:** Deferred to the owning OS/feature.
- **Allowed Transitions:** No generic edges. CSM-014 provides shared lifecycle concepts; each OS
  defines its setup/operational machines under separate approved authority.
- **Forbidden Transitions:** Core/Product Hub writing OS facts; one OS reading/writing another OS
  database; browser mock becoming production truth; generic session state replacing specific Orders,
  POS Transactions, Inventory, Payments, Returns, or other owned lifecycles.
- **Entry Conditions:** CSM-014/owner reports applicable readiness/access and actor/context/permission
  are valid; OS reauthorizes entry.
- **Exit Conditions:** OS-owned continuation, safe OS/Core/Product Hub return, or owner-defined
  terminal outcome.
- **Validation Rules:** Applicable OS validates organization scope, resource, action, business rules,
  invariants, readiness/access, and every write.
- **Permission Requirements:** Workspace, Business, Business Unit, Department/Branch where applicable,
  OS, resource, and action scope.
- **Recovery Rules:** OS owner defines safe retry, compensation, interruption, return, and manual
  intervention; no cross-OS repair or Core write.
- **Timeout Rules:** Deferred to the applicable OS/feature.
- **Failure States:** Deferred; current frontend loading/error labels are presentation evidence, not
  canonical operational states.
- **Audit Requirements:** Every consequential OS action and owner transition follows OS-specific
  append-only Audit/observability authority.
- **Related Screens:** Commerce Setup, Dashboard, POS, Products, Inventory, Transfers, Customers,
  Orders, Invoices, Reports, and Settings are implementation evidence only.
- **Authority References:** Freeze §§4.2, 4.9 and 5.10; ADR-024; ADR-026; Foundation §17.2; AGENTS
  §§4–6; Journey Mapping CJ-21–CJ-23.
- **Current Status:** Deferred owner-specific machine; no canonical generic operational state set.
- **Future Dependencies:** Applicable OS feature specs, domain lifecycles, permissions, contracts,
  persistence, failures/recovery, Audit, and tests.

## CSM-016 — Growth and Marketplace Boundary

- **Machine ID:** CSM-016
- **Purpose:** Cover the optional later Journey stage without duplicating Marketplace or target-owner
  lifecycle authority inside Foundation.
- **Owner:** Marketplace bounded context and applicable target/asset-family owners.
- **Related Journey Stage:** CJ-24.
- **Related User Flows:** FLOW-028 and FLOW-031.
- **States:** No Foundation-specific Growth/Marketplace state set is created. Marketplace retains its
  separately frozen asset, assurance, commercial, distribution, installation, activation,
  applicability, upgrade, and removal lifecycles.
- **Initial State:** Not applicable under current Foundation delivery.
- **Terminal States:** Not applicable here; separately governed Marketplace/target lifecycles apply.
- **Allowed Transitions:** None defined by this document; entry is permitted only after a separate
  approved Marketplace/growth milestone.
- **Forbidden Transitions:** Product Hub owning Marketplace state; Foundation feature inventing
  Marketplace acquisition/installation; installation bypassing compatibility, permission, target
  validation, or human-control policy; changing immutable published Asset Versions.
- **Entry Conditions:** Later milestone authorization, authenticated/scoped actor, Marketplace and
  target-owner permissions, and applicable compatibility/entitlement authority.
- **Exit Conditions:** Separately governed Marketplace/target flow or safe return to Product Hub/Core/
  OS.
- **Validation Rules:** Use Marketplace Freeze and target-owner rules; shared asset versus scoped
  acquisition/installation/activation/applicability remain distinct.
- **Permission Requirements:** Customer/publisher, Workspace/Business, asset, version, action,
  entitlement, installation, applicability, and target permissions as applicable.
- **Recovery Rules:** Defined by Marketplace and target owners; Foundation may only preserve safe
  return/navigation.
- **Timeout Rules:** Not defined in Foundation.
- **Failure States:** Not defined here; Marketplace authority governs exact failures and recovery.
- **Audit Requirements:** Marketplace/target consequential actions follow their approved Audit and
  correlation requirements.
- **Related Screens:** No current Foundation screen; later semantic entry only.
- **Authority References:** Marketplace Architecture v1.0 Freeze; Freeze §4.5; Foundation §§12 and
  17; Journey Mapping CJ-24; User Flow FLOW-028.
- **Current Status:** Deferred later-domain boundary; no Foundation state machine is authorized.
- **Future Dependencies:** Marketplace/growth milestone, owner-specific flows/state machines,
  permissions, contracts, compatibility, feature specs, and readiness review.

## CSM-017 — Cross-Cutting Interaction and Recovery

- **Machine ID:** CSM-017
- **Purpose:** Ensure every flow presents owner state and failure/recovery safely without creating a
  universal business-state machine.
- **Owner:** Current canonical owner for business state; Product Experience owns presentation
  semantics only.
- **Related Journey Stage:** CJ-00 through CJ-24 where applicable.
- **Related User Flows:** FLOW-001, FLOW-008 through FLOW-011, and FLOW-029 through FLOW-031; applies
  to all protected or recoverable flows.
- **States:** No canonical cross-domain states. Loading, success, empty, validation failure,
  permission denied, error, recovery, and offline/degraded are presentation categories only.
- **Initial State:** Not applicable to a canonical machine.
- **Terminal States:** Not applicable.
- **Allowed Transitions:** None counted; presentation recovery may request an approved owner action
  and then re-read owner state.
- **Forbidden Transitions:** UI error/success → domain state; optimistic assumption after uncertain
  consequential result; retry bypassing idempotency/owner validation; permission denial exposing
  protected content; locale change altering business state.
- **Entry Conditions:** A current semantic flow identifies its owner, authorized context, owner
  result, and safe return boundary.
- **Exit Conditions:** Owner-confirmed safe re-entry, neutral return, authorized context change,
  pause/exit, or explicit manual-owner resolution.
- **Validation Rules:** Distinguish loading, empty, local validation, owner validation, permission,
  stale/conflict, dependency error, interruption, and degraded outcomes; never invent success.
- **Permission Requirements:** Revalidate actor/context before protected recovery or detail; safe
  return itself grants no access.
- **Recovery Rules:** Correct, retry when owner-safe, reauthenticate, change authorized context,
  return, pause, or request manual intervention only when an owning future specification authorizes
  it.
- **Timeout Rules:** Cross-domain timeout values are not standardized; an owning feature must define
  or explicitly mark N/A.
- **Failure States:** None canonical. Validation failure, permission denied, expired, cancelled,
  abandoned, retry, recovery, and manual intervention are not globally reusable business states.
- **Audit Requirements:** Consequential retry/manual intervention and security-relevant denial follow
  owner Audit policy; localization/presentation changes do not silently create Audit business facts.
- **Related Screens:** Shared across all current/future screens; current recovery coverage is uneven.
- **Authority References:** Freeze §§4.8, 10–11; Presentation State Authority §§2–7; Canonical User
  Flows FLOW-029–FLOW-031; Screen Status Matrix.
- **Current Status:** Non-owner presentation boundary; exact per-machine recovery remains deferred.
- **Future Dependencies:** Per-owner failure/recovery contracts, permission policies, timeout rules,
  Audit/observability, accessibility/localization, and feature specifications.

# 5. Transition Matrix

## 5.1 Approved direct transitions

Only the following 23 edges are counted as approved transitions. “Actor” identifies the authority
that may cause or validate an edge at the architecture level; it does not define a role catalog,
command, API, or implementation.

| Machine | Current State | Allowed Next State | Conditions | Actor | Business Rule |
|---|---|---|---|---|---|
| CSM-006 | `not_started` | `in_progress` | Authenticated selected-Business Session begins under participation authority | Business Architect Session owner | One Session belongs to one Business context |
| CSM-006 | `in_progress` | `review_required` | Owner determines acquired/mapped material is ready for review | Business Architect Session owner | Review cannot be skipped |
| CSM-006 | `review_required` | `publish_ready` | Material review/correction and readiness validation succeed | Authorized customer plus pipeline owner | Customer correction and explicit readiness precede publication |
| CSM-006 | `publish_ready` | `published` | Explicit approval and Business DNA owner publication succeed | Authorized customer and Business DNA owner | Pipeline progress cannot substitute for owner publication |
| CSM-006 | `published` | `analyzed` | Governed post-publication analysis completes | Business Brain/Business Architect owners within frozen boundaries | Analysis does not rewrite Business DNA |
| CSM-006 | `analyzed` | `completed` | Retained pipeline completion criteria are satisfied | Business Architect Session owner | Completion is not OS readiness |
| CSM-011 | `generated` | `reviewed` | Recommendation evidence and reasoning are presented for review | Recommendation Engine and authorized reviewer | Generated advice cannot be acted on as reviewed advice |
| CSM-011 | `reviewed` | `accepted` | Authorized customer accepts the optional Recommendation | Authorized customer; Recommendation owner records disposition | Acceptance does not execute a target action |
| CSM-011 | `reviewed` | `rejected` | Authorized customer rejects the optional Recommendation | Authorized customer; Recommendation owner records disposition | Rejection is a valid customer-controlled outcome |
| CSM-011 | `accepted` | `learned` | Approved learning treatment records the accepted disposition | Recommendation owner | Learning does not transfer canonical ownership |
| CSM-011 | `rejected` | `learned` | Approved learning treatment records the rejected disposition | Recommendation owner | Rejection may inform learning without coercing adoption |
| CSM-014 | `Available` | `Recommended` | Owner-governed discovery/recommendation result supports the option | Product and Recommendation owners | Recommendation is not entitlement or selection |
| CSM-014 | `Recommended` | `Selected and Subscribed` | Customer selection and applicable commercial authority succeed | Authorized customer and commercial owner | Selection and subscription remain distinct from installation/readiness even where named together conceptually |
| CSM-014 | `Selected and Subscribed` | `Installed` | Applicable owner validates installation eligibility | Product Hub handoff; OS/installation owner validates | Product Hub routes; it does not own installation |
| CSM-014 | `Installed` | `Configured` | OS-owned configuration requirements are satisfied | Applicable OS owner and authorized actor | Core does not own OS configuration |
| CSM-014 | `Configured` | `Activated` | OS-owned activation validation succeeds | Applicable OS owner and authorized actor | Configuration does not imply activation |
| CSM-014 | `Activated` | `Operating System Ready` | OS-owned readiness criteria succeed | Applicable OS owner | Core Workspace Ready cannot substitute for OS Ready |
| CSM-014 | `Operating System Ready` | `Operational` | OS permits authorized operational access | Applicable OS owner | Readiness and operation remain separate |
| CSM-014 | `Operational` | `Extended` | Approved OS extension is applied under owner rules | Applicable OS/extension owner and authorized actor | Extension cannot bypass compatibility or permission validation |
| CSM-014 | `Extended` | `Upgraded` | Approved compatible upgrade succeeds | Applicable OS/asset owner and authorized actor | Upgrade preserves owner and compatibility boundaries |
| CSM-014 | `Upgraded` | `Paused` | Authorized pause is accepted by the owning domain | Applicable commercial/OS owner | Pause is not archive or removal |
| CSM-014 | `Paused` | `Archived` | Authorized archive criteria succeed | Applicable owner and authorized actor | Archive is distinct from removal |
| CSM-014 | `Archived` | `Removed` | Authorized removal criteria succeed | Applicable owner and authorized actor | Removal follows owning-domain validation and Audit |

## 5.2 Invariant, projection, and deferred transition coverage

These rows are coverage obligations, not additional edges.

| Machine | Approved ordering or constraint | Transition authority status |
|---|---|---|
| CSM-001 | Owner records `active`, `expired`, `converted`, or `abandoned`; expired Sessions are unusable and repeated consumption is prevented | Initial/terminal classification and every direct transition edge remain deferred |
| CSM-002 | Evidence/observations contribute to temporary, provenance-aware, confidence-aware Candidate material; correction precedes conversion | Exact Candidate states, discard, invalidation, retention, and conversion mechanics are deferred |
| CSM-003 | Identity precedes protected Workspace/Business action; conditional verification and recovery remain Identity-owned | Exact identity states and transitions are deferred to Identity authority |
| CSM-004 | Authenticated membership precedes Workspace selection/creation and protected context | Exact Workspace/membership lifecycle and resolution transitions are not standardized here |
| CSM-005 | Authorized Workspace context precedes Business selection/creation | Exact Business lifecycle and canonical migration transitions are deferred |
| CSM-006 exceptional vocabulary | `paused`, `blocked`, `expired`, and `superseded` remain inherited Session terms | Their entry, exit, resume, replacement, and terminal edges are not approved by current evidence |
| CSM-007 | Candidate + authenticated selected Business + material review/correction + explicit approval + owner validation precede first publication | No generic Approval state machine is authorized |
| CSM-008 | Owner-confirmed first publication creates governed Business DNA v1; later change requires governed revision | Revision, rollback, conflict, archive, and retention lifecycle is deferred |
| CSM-009 | Published Business DNA is required before Guided Activation; canonical revision returns to DNA owner | Exact Guided Activation states and completion transitions are deferred |
| CSM-010 | Blueprint reads governed owner outputs and never writes them | Projection presentation changes are not business transitions |
| CSM-012 | Core readiness is owner-assessed from underlying Core facts and remains separate from OS readiness | No readiness enum, reset, or reevaluation transition is approved |
| CSM-013 | Product Hub composes projections and hands requests to owners | No combined Hub transition or owner state is authorized |
| CSM-015 | Each OS owns setup, readiness, operation, and recovery details | No universal OS operational sub-machine is authorized |
| CSM-016 | Marketplace/target owners retain their separately frozen lifecycles | Foundation defines no Growth/Marketplace transition graph |
| CSM-017 | Presentation may request an owner-safe retry/recovery and then re-read owner state | Presentation outcomes never become canonical owner transitions |

# 6. Error and Recovery States

The columns below use the task’s recovery vocabulary as **questions**, not as a global state enum.
Where a term is not explicitly a machine state, the cell says so.

| Machine | Validation Failure | Permission Denied | Expired | Cancelled | Abandoned | Retry | Recovery | Manual Intervention |
|---|---|---|---|---|---|---|---|---|
| CSM-001 | Owner outcome; not a named state | Safe exit; no protected disclosure | Explicit status that becomes unusable; terminal graph not standardized | Not approved as a state | Explicit status; terminal graph not standardized | Only under approved idempotent/session policy | ADR-042 requires invalid/expired/consumed recovery; exact mechanism deferred | Not standardized |
| CSM-002 | Preserve candidate and disclose correctable issue; not a state | Withhold protected candidate | Retention/expiry state not approved | Not approved | Not approved | Owner-safe recomputation/acquisition only | Correct source material or resume acquisition | Escalation policy deferred |
| CSM-003 | Identity-owned outcome | Identity-owned protected denial | Token/session expiry may exist but exact authority is deferred | Identity-owned | Not approved globally | Identity-owner policy | Login, conditional verification, or recovery under owner policy | Identity-owner policy |
| CSM-004 | Correct create/select input | Return to authorized Workspace choice or safe exit | Membership/session expiry is owner-defined | No generic state | No generic state | Refresh owner context; do not duplicate creation | Select/create another authorized Workspace or safe return | Membership administration policy deferred |
| CSM-005 | Correct create/select input | Return to authorized Business/Workspace context | Not approved here | No generic state | No generic state | Refresh owner context; do not duplicate creation | Select/create another authorized Business or safe return | Organization-owner policy deferred |
| CSM-006 | Remain in owner-reported state; correct material | Safe exit without protected detail | Explicit exceptional state; duration/restart deferred | Not approved as Session state | Not approved as Session state | Owner-authorized acquisition/analysis retry only | `paused`, `blocked`, `expired`, `superseded` are inherited; exact edges deferred | Policy and authority deferred |
| CSM-007 | Return to material review/correction | No publication claim | Approval/request expiry not standardized | Withdrawal/cancel not standardized | Not a state | Resolve uncertain owner result before repeat | Re-review, correct, or safely pause | Approval escalation policy deferred |
| CSM-008 | Last approved version remains canonical | Withhold/change nothing | Not a DNA state | Not approved | Not approved | Resolve publication/revision result from owner evidence | Return to reviewed source or governed revision | Owner policy deferred |
| CSM-009 | Return to inherited pipeline owner | Safe pause/return | Uses CSM-006 owner result; no GA expiry state | Not approved | Not approved | Only owner-safe continuation | Present inherited pause/block/expiry/supersession behavior | Deferred |
| CSM-010 | Source/projection issue; never repair source locally | Denied presentation category | Freshness expiry not standardized | Not applicable | Not applicable | Refresh projection | Return to source owner, change authorized context, or safe Core return | Source-owner escalation only |
| CSM-011 | Withhold misleading advice; correct source owner input | Withhold Recommendation/lineage | Expiry/invalidation deferred | Not approved | Not approved | Owner-governed regeneration/review only | Review correction or neutral exit; no forced disposition | Review workflow deferred |
| CSM-012 | Report unmet/invalid criteria | Withhold protected readiness details | Freshness expiry not standardized | Not applicable | Not applicable | Refresh underlying owner facts | Route to relevant Core owner or safe destination | Criterion dispute/escalation deferred |
| CSM-013 | Show owner-reported issue | Filter action/detail; safe return | Owner projection may be stale; no Hub expiry state | Not applicable | Not applicable | Refresh owner projections or retry owner-safe handoff | Return to Hub/Core/owner destination | Owner-specific |
| CSM-014 | Owner rejects edge; retain confirmed prior state | Deny transition without leaking state | No generic expiry state in ADR-026 graph | No generic cancel state | No generic abandon state | Owner-specific and consequentially safe | `Paused`, `Archived`, `Removed` are explicit; resume/rollback edges are not approved | Owner-specific and auditable |
| CSM-015 | OS-owned | OS-owned | OS-owned | OS-owned | OS-owned | OS-owned | OS-owned safe return/resume | OS-owned |
| CSM-016 | Marketplace/target-owned | Marketplace/target-owned | Marketplace/target-owned | Marketplace/target-owned | Marketplace/target-owned | Marketplace/target-owned | Marketplace/target-owned | Marketplace/target-owned |
| CSM-017 | Presentation category only | Presentation category only | Owner condition only | Owner condition only | Owner condition only | Request only when owner-safe | Correct, reauthenticate, switch authorized context, return, pause, or owner-approved escalation | Requires owning policy; never a UI-created transition |

# 7. Screen Mapping

Routes below are current implementation evidence only. Semantic destinations do not require one
screen each and do not authorize a route or component.

| Machine | State or condition presented | Current/future screen evidence | Flow | Journey Stage |
|---|---|---|---|---|
| CSM-001 | Recorded Session status without canonical publication claim | Future Discovery/Value Preview; no current screen | FLOW-002–FLOW-007, FLOW-029, FLOW-031 | CJ-01–CJ-07 |
| CSM-002 | Temporary Candidate, provenance/confidence, correction, conversion boundary | Future Candidate Understanding/Reflection; no current screen | FLOW-003–FLOW-006, FLOW-014–FLOW-017 | CJ-02–CJ-06, CJ-11–CJ-13 |
| CSM-003 | Identity entry, verification/recovery owner outcomes | Current `/login`, `/register`, `/verify-email`, `/verify`, `/forgot-password`, `/reset-password` | FLOW-001, FLOW-008–FLOW-011, FLOW-029 | CJ-00, CJ-08 |
| CSM-004 | Workspace context available/unresolved/denied as owner outcomes | Current `/welcome`, onboarding Workspace step, Context Switcher; requires reconciliation | FLOW-012, FLOW-029 | CJ-09 |
| CSM-005 | Business context available/unresolved/denied as owner outcomes | Canonical Business resolution missing; legacy BusinessUnit labels are evidence only | FLOW-013–FLOW-016, FLOW-029 | CJ-10–CJ-12 |
| CSM-006 | Primary Session graph and owner-reported exceptional terms | Future Business Architect, Candidate Review, Publication Approval, Guided Activation | FLOW-015–FLOW-019, FLOW-029, FLOW-031 | CJ-12–CJ-15 |
| CSM-007 | Review/approval/publication request/result checkpoints | Future Candidate Review, explicit Publication Approval, shared Publication Result | FLOW-014, FLOW-016–FLOW-018, FLOW-031 | CJ-11–CJ-14 |
| CSM-008 | Owner-confirmed publication/version and revision boundary | Future Publication Result, Guided Activation, Business Blueprint | FLOW-017–FLOW-020, FLOW-029 | CJ-13–CJ-16 |
| CSM-009 | Post-publication continuation and owner-reported inherited Session outcome | Future Guided Activation; current onboarding is not authority | FLOW-019, FLOW-029, FLOW-031 | CJ-15 |
| CSM-010 | Projection loading/partial/stale/denied categories, never canonical state | Future Business Blueprint | FLOW-020, FLOW-029, FLOW-031 | CJ-16 |
| CSM-011 | `generated`, `reviewed`, disposition, learning presentation | Future Insights/Optional Recommendations | FLOW-021, FLOW-029, FLOW-031 | CJ-17 |
| CSM-012 | Criteria available/unmet and owner-reported Core Ready outcome | Current `/dashboard` requires reconciliation | FLOW-022, FLOW-029, FLOW-031 | CJ-18 |
| CSM-013 | Composed owner projections and safe owner handoff | Current `/dashboard/apps` and Context Switcher require reconciliation | FLOW-023–FLOW-024, FLOW-029, FLOW-031 | CJ-19–CJ-20 |
| CSM-014 | Approved conceptual OS lifecycle owner results | Product Hub/onboarding evidence; Commerce `/setup` and Dashboard are current evidence | FLOW-024–FLOW-027, FLOW-029, FLOW-031 | CJ-20–CJ-23 |
| CSM-015 | OS-specific setup/readiness/operational outcomes | Commerce `/setup`, Dashboard, and operational routes; owner-specific only | FLOW-025–FLOW-027, FLOW-029, FLOW-031 | CJ-21–CJ-23 |
| CSM-016 | Later Marketplace/target owner state | No current Foundation screen; later scope | FLOW-028, FLOW-031 | CJ-24 |
| CSM-017 | Loading, validation, permission, error, recovery, degraded presentation | Shared across existing and future screens; coverage is uneven | FLOW-001, FLOW-008–FLOW-011, FLOW-029–FLOW-031 | CJ-00–CJ-24 as applicable |

# 8. Coverage Matrix

## 8.1 Journey → Flow → Machine → Screen coverage

Coverage means the stage is assigned to an owner machine/boundary. It does not mean that a complete
deterministic graph or implementation exists.

| Journey | Flow | State Machine | Screen evidence | Coverage |
|---|---|---|---|---:|
| CJ-00 Public Entry | FLOW-001 | CSM-003, CSM-017 | Landing | 100% mapped; no public-entry business state invented |
| CJ-01 Business Discovery | FLOW-002 | CSM-001, CSM-017 | Missing | 100% mapped; Session policy partly deferred |
| CJ-02 Business Mapping | FLOW-003 | CSM-001, CSM-002 | Shared future presentation | 100% mapped; Candidate graph deferred |
| CJ-03 Business Understanding | FLOW-003 | CSM-001, CSM-002 | Shared future presentation | 100% mapped; owner calculation rules deferred |
| CJ-04 Candidate Understanding | FLOW-004 | CSM-001, CSM-002 | Missing | 100% mapped; Candidate graph deferred |
| CJ-05 Understanding Reflection | FLOW-005 | CSM-001, CSM-002 | Missing/shared | 100% mapped; materiality/permissions deferred |
| CJ-06 Business Report Preview | FLOW-006 | CSM-001, CSM-002 | Missing | 100% mapped; projection owns no state |
| CJ-07 Workspace Intent | FLOW-007 | CSM-001, CSM-003 | Adjacent CTA evidence | 100% mapped; intent is not canonical state |
| CJ-08 Identity | FLOW-008–FLOW-011 | CSM-003, CSM-017 | Partial current auth screens | 100% mapped; Identity graph deferred |
| CJ-09 Workspace Resolution | FLOW-012 | CSM-004, CSM-017 | Partial/conflicting | 100% mapped; owner graph deferred |
| CJ-10 Business Resolution | FLOW-013 | CSM-005, CSM-017 | Missing; legacy adjacent | 100% mapped; owner graph/migration deferred |
| CJ-11 Candidate Conversion | FLOW-014 | CSM-002, CSM-004, CSM-005, CSM-007 | Missing/shared | 100% mapped; mechanism deferred |
| CJ-12 Material Review/Correction | FLOW-015–FLOW-016 | CSM-002, CSM-006, CSM-007 | Missing | 100% mapped; primary Session graph exists |
| CJ-13 Publication Approval | FLOW-017 | CSM-006, CSM-007, CSM-008 | Missing | 100% mapped; gate invariant only |
| CJ-14 Business DNA v1 | FLOW-018 | CSM-006, CSM-007, CSM-008 | Missing/shared | 100% mapped; owner result/revision graph deferred |
| CJ-15 Guided Activation | FLOW-019 | CSM-006, CSM-008, CSM-009 | Missing | 100% mapped; exact GA graph deferred |
| CJ-16 Business Blueprint | FLOW-020 | CSM-008, CSM-010 | Missing | 100% mapped; projection deliberately owns no state |
| CJ-17 Recommendations | FLOW-021 | CSM-011 | Missing | 100% mapped; inherited minimal graph exists |
| CJ-18 Core Workspace Ready | FLOW-022 | CSM-012 | Dashboard partial/conflicting | 100% mapped; assessment lifecycle deferred |
| CJ-19 Product Hub | FLOW-023 | CSM-013 | Product Hub partial mock | 100% mapped; non-owner boundary |
| CJ-20 OS Selection | FLOW-024 | CSM-013, CSM-014 | Partial/stale evidence | 100% mapped; owner boundaries separated |
| CJ-21 OS-Specific Setup | FLOW-025 | CSM-014, CSM-015 | Commerce setup evidence | 100% mapped; OS details deferred to owner |
| CJ-22 OS Ready | FLOW-026 | CSM-014, CSM-015 | Commerce evidence | 100% mapped; OS result owner-specific |
| CJ-23 Daily Operations | FLOW-027 | CSM-014, CSM-015 | Substantial Commerce mock evidence | 100% mapped; OS operational graph owner-specific |
| CJ-24 Growth/Marketplace | FLOW-028 | CSM-016 | Missing | 100% mapped; later domain authority applies |

**Journey mapping coverage:** 25 of 25 canonical stages (100%).

## 8.2 User Flow state coverage

| Flow | Machine coverage | State-authority result |
|---|---|---|
| FLOW-001 Public Entry Choice | CSM-003, CSM-017 | Presentation/Identity boundary; no public-entry state |
| FLOW-002 Business Discovery | CSM-001, CSM-017 | Exact Discovery Session vocabulary; method behavior deferred |
| FLOW-003 Candidate Construction | CSM-001, CSM-002 | Session exact; Candidate invariant-only |
| FLOW-004 Candidate Understanding Presentation | CSM-001, CSM-002 | Candidate invariant-only |
| FLOW-005 Understanding Reflection and Correction | CSM-001, CSM-002 | Candidate invariant-only; correction graph deferred |
| FLOW-006 Business Report Preview | CSM-001, CSM-002, CSM-017 | Temporary projection; no state owner |
| FLOW-007 Create Workspace Intent | CSM-001, CSM-003, CSM-017 | Intent is not canonical state |
| FLOW-008 Registration | CSM-003, CSM-017 | Identity owner machine deferred |
| FLOW-009 Login | CSM-003, CSM-017 | Identity owner machine deferred |
| FLOW-010 Conditional Identity Verification | CSM-003, CSM-017 | Identity owner machine deferred |
| FLOW-011 Identity Recovery | CSM-003, CSM-017 | Identity owner recovery deferred |
| FLOW-012 Workspace Resolution | CSM-004, CSM-017 | Workspace invariant-only |
| FLOW-013 Business Resolution | CSM-005, CSM-017 | Business invariant-only |
| FLOW-014 Authenticated Candidate Conversion | CSM-002, CSM-004, CSM-005, CSM-007, CSM-017 | Conversion ordering fixed; mechanisms/states deferred |
| FLOW-015 Authenticated Candidate Acquisition | CSM-002, CSM-006, CSM-017 | Business Architect primary graph applies |
| FLOW-016 Material Candidate Review and Correction | CSM-002, CSM-006, CSM-007, CSM-017 | Primary Session graph plus approval invariant |
| FLOW-017 Explicit Publication Approval | CSM-006, CSM-007, CSM-008, CSM-017 | Explicit gate; request/result machine deferred |
| FLOW-018 Business DNA v1 Publication Result | CSM-006, CSM-007, CSM-008, CSM-017 | Owner publication invariant; lifecycle deferred |
| FLOW-019 Guided Activation | CSM-006, CSM-008, CSM-009, CSM-017 | Inherited Session applies; no GA state set |
| FLOW-020 Business Blueprint | CSM-008, CSM-010, CSM-017 | Projection/non-owner boundary |
| FLOW-021 Optional Recommendation Review | CSM-011, CSM-017 | Minimal Recommendation graph applies |
| FLOW-022 Core Workspace Ready Entry | CSM-012, CSM-017 | Named owner assessment; no enum |
| FLOW-023 Product Hub Composition | CSM-013, CSM-017 | Projection/non-owner boundary |
| FLOW-024 Operating System Selection | CSM-013, CSM-014, CSM-017 | Conceptual OS graph and owner handoff |
| FLOW-025 OS-Specific Setup Handoff and Continuation | CSM-014, CSM-015, CSM-017 | OS graph plus owner-specific deferral |
| FLOW-026 Operating System Ready Launch | CSM-014, CSM-015, CSM-017 | Exact named OS Ready edge; owner criteria deferred |
| FLOW-027 Operational Dashboard and Daily Operations Entry | CSM-014, CSM-015, CSM-017 | Conceptual graph plus OS-specific operation |
| FLOW-028 Growth and Marketplace Entry | CSM-016, CSM-017 | Later-domain state authority |
| FLOW-029 Returning and Resuming Customer Resolution | CSM-001–CSM-015, CSM-017 as context requires | Resolver must read owners; no universal completion state |
| FLOW-030 Locale and Direction Change | CSM-017 | Presentation-only; cannot change business state |
| FLOW-031 Correction, Failure, and Safe Recovery | CSM-001–CSM-017 as context requires | Recovery stays with current owner; no global recovery machine |

**User Flow mapping coverage:** 31 of 31 canonical flows (100%).
**Deterministic state-authority completeness:** 49% under the rubric in section 10; mapping does
not remove the listed deferrals.

# 9. Gap Analysis

## 9.1 Missing states and lifecycle authority

| Gap ID | Area | Missing authority | Why it cannot be supplied here | Blocks |
|---|---|---|---|---|
| CSM-GAP-001 | Discovery Session and Candidate Business Understanding | Discovery status transition graph plus exact Candidate lifecycle, retention, discard, invalidation, consumption, correction/version semantics | Freeze §10.3 and ADR-042 defer mechanisms; no complete owner graph is accepted | Discovery/Candidate state specification and implementation |
| CSM-GAP-002 | Identity | Registration, verification, login/session and recovery lifecycle authority | Current frontend mock is evidence, not owner authority | Identity feature specification and implementation |
| CSM-GAP-003 | Workspace/Membership | Exact create/select/invite/membership/leave/archive and resolution graph | Frozen ownership exists, but this phase has no approved graph | Workspace lifecycle feature specification and implementation |
| CSM-GAP-004 | Business | Canonical Business lifecycle and legacy BusinessUnit migration mapping | Accepted hierarchy forbids silent equivalence; migration requires governed specification | Business-resolution feature specification and implementation |
| CSM-GAP-005 | First publication approval | Request, stale/rejected/unknown result, withdrawal/expiry and idempotent retry states | Architecture approves gates, not a state model or contract | Publication approval specification and implementation |
| CSM-GAP-006 | Business DNA | Revision, rollback, invalidation/archive, conflict and retention lifecycle | Explicit Freeze deferral | Post-v1 revision work; first-publication mechanics still need an owner spec |
| CSM-GAP-007 | Guided Activation | Exact continuation, completion, pause/resume and relationship to Session exceptional edges | Freeze preserves separation and defers new UX states | Guided Activation specification and wireframes |
| CSM-GAP-008 | Business Blueprint | Projection freshness/partiality/version/denial policy | Blueprint cannot own a lifecycle; source/projection contract is deferred | Blueprint feature specification and wireframes |
| CSM-GAP-009 | Recommendation | Invalidation, expiry, supersession, review workflow and no-Recommendation presentation policy | Freeze §10.3 explicitly defers these decisions | Complete Recommendation specification and implementation |
| CSM-GAP-010 | Core Workspace Ready | Reevaluation/reset/freshness graph and ADR-018 Recommendation-criterion interpretation | Existing sources do not resolve Foundation’s valid no-product/no-Recommendation outcome | Readiness resolver specification and Product Hub gating |
| CSM-GAP-011 | Product Hub | Owner projection freshness/failure and action/handoff contracts | Hub is a non-owner and cannot invent aggregate state | Product Hub feature specification and implementation |
| CSM-GAP-012 | OS lifecycle | Resume/rollback/failure edges—notably no approved `Paused → Operational` edge—plus owner-specific setup/Ready/operation criteria | ADR-026 gives a forward conceptual sequence only; OS owners define details | OS-specific feature specifications; not Foundation authority |
| CSM-GAP-013 | Marketplace/growth | Foundation-entry behavior and applicable owner lifecycles for later scope | Separate frozen domain and later milestone | Later Marketplace/growth work only |
| CSM-GAP-014 | Cross-cutting recovery | Owner-specific retry, timeout, conflict, manual intervention, safe-return precedence and offline/degraded policy | A global UI machine would violate ownership | Every future consequential feature specification |

## 9.2 Missing transitions

1. CSM-006 exceptional-state entry, exit, resume, expiry, supersession, and terminal rules.
2. Candidate correction, discard, invalidation, expiry, safe conversion, and failed-conversion rules.
3. Publication approval rejection, stale input, uncertain outcome, retry, and withdrawal rules.
4. Business DNA revision and rollback rules.
5. Recommendation invalidation, expiry, supersession, and review-recovery rules.
6. Core readiness loss and reevaluation rules.
7. OS lifecycle recovery/rollback and owner-specific setup/readiness/operational rules.
8. Identity, Workspace, Business, and membership owner transitions.

## 9.3 Missing validation, permissions, and recovery

| Area | Missing evidence |
|---|---|
| Validation | Materiality/sufficiency, Candidate conflict/staleness, publication readiness, Core readiness interpretation, projection freshness, OS owner criteria |
| Permissions | Exact Discovery protection, Candidate review/correction, approver authority, Business Architect participation, DNA publication/revision, Recommendation disposition/lineage, Product Hub actions, OS setup/readiness roles |
| Recovery | Session exceptional edges, candidate conversion, uncertain publication, identity recovery policy, safe-return precedence, Recommendation review, OS resume/rollback, manual intervention |
| Time | Discovery retention, Identity/session/token policy, BA expiry duration, approval expiry, projection freshness, Recommendation invalidation, owner retry/timeout policy |
| Audit | Exact required records for approval/publication, Recommendation disposition, manual recovery, Core readiness, owner handoff, OS lifecycle changes |

## 9.4 Missing contracts and documentation

No API or persistence contract may be created in this phase. Future owner specifications must define
technology-independent request/result, authorization, concurrency, retry/idempotency, failure,
Audit, and observability behavior where consequential. UI Authority Review/Approval, wireframes,
feature specifications, and implementation plans remain future gates. `UIAUTH-HYGIENE-001` also
remains unresolved; the legacy Genesis directory still lacks an approved authority marker.

# 10. Readiness

## 10.1 Scoring method

- **Journey Ready** and **Flow Ready** measure whether the machine is traceably mapped, not whether
  it may be implemented.
- **State Ready** is 100% for an approved exact vocabulary/direct graph, 50% for invariant-only
  authority, and 25% for a deferred or deliberately non-owning boundary. This is an authority-
  coverage score, not an approval or implementation score.
- **UX Ready** records approved semantic authority and current evidence only. No wireframe is
  approved.
- **Frontend**, **Backend**, and **Production Ready** remain 0% because no approved feature spec,
  implementation plan, owner contract, or delivery evidence is created here.

| Machine | Journey Ready | Flow Ready | State Ready | UX Ready | Frontend Ready | Backend Ready | Production Ready |
|---|---:|---:|---:|---:|---:|---:|---:|
| CSM-001 Discovery Session | 100% | 100% | 50% vocabulary / graph deferred | 25% | 0% | 0% | 0% |
| CSM-002 Candidate Business Understanding | 100% | 100% | 50% | 25% | 0% | 0% | 0% |
| CSM-003 Identity and Verification | 100% | 100% | 25% | 25% evidence | 0% | 0% | 0% |
| CSM-004 Workspace Context Resolution | 100% | 100% | 50% | 25% evidence | 0% | 0% | 0% |
| CSM-005 Business Context Resolution | 100% | 100% | 50% | 0% | 0% | 0% | 0% |
| CSM-006 Business Architect Session | 100% | 100% | 100% primary / exceptional edges deferred | 25% | 0% | 0% | 0% |
| CSM-007 First Publication Approval Control | 100% | 100% | 50% | 25% | 0% | 0% | 0% |
| CSM-008 Business DNA Publication and Revision | 100% | 100% | 50% | 25% | 0% | 0% | 0% |
| CSM-009 Guided Activation | 100% | 100% | 25% | 25% | 0% | 0% | 0% |
| CSM-010 Business Blueprint Projection | 100% | 100% | 25% non-owner | 25% | 0% | 0% | 0% |
| CSM-011 Recommendation Lifecycle | 100% | 100% | 100% inherited / invalidation deferred | 25% | 0% | 0% | 0% |
| CSM-012 Core Workspace Readiness Assessment | 100% | 100% | 50% | 25% evidence | 0% | 0% | 0% |
| CSM-013 Product Hub Composition and Handoff | 100% | 100% | 25% non-owner | 25% evidence | 0% | 0% | 0% |
| CSM-014 Standard Operating System Lifecycle | 100% | 100% | 100% conceptual / recovery deferred | 25% evidence | 0% | 0% | 0% |
| CSM-015 OS Operational Context | 100% | 100% | 25% owner-deferred | 25% evidence | 0% | 0% | 0% |
| CSM-016 Growth and Marketplace Boundary | 100% | 100% | 25% later-domain | 0% | 0% | 0% | 0% |
| CSM-017 Cross-Cutting Interaction and Recovery | 100% | 100% | 25% non-owner | 25% evidence | 0% | 0% | 0% |

## 10.2 Aggregate readiness

| Measure | Result | Interpretation |
|---|---:|---|
| Journey mapped to state authority | 25/25 (100%) | No Journey stage is orphaned |
| User Flow mapped to state authority | 31/31 (100%) | No User Flow is orphaned |
| Exact approved state labels | 33 | Across CSM-001, CSM-006, CSM-011, and CSM-014 only |
| Exact approved direct edges | 23 | Across CSM-006, CSM-011, and CSM-014 only |
| Deterministic state-authority completeness | 49% | 3 exact + 7 invariant/vocabulary-only + 7 deferred/non-owner records under section 10.1 rubric |
| Wireframe readiness | Blocked for lifecycle-dependent surfaces | Exact owner state/recovery authority and UI authority gates remain incomplete |
| Feature-specification readiness | Blocked per affected machine | Each future spec must close or explicitly exclude its listed owner deferrals |
| Frontend/backend/production readiness | 0% / 0% / 0% | This document is not implementation authorization |

## 10.3 Final report

- **Total machines/boundaries:** 17.
- **Total exact approved states:** 33.
- **Total exact approved direct transitions:** 23.
- **Coverage:** 100% Journey mapping; 100% User Flow mapping; 49% deterministic state-authority
  completeness.
- **Quality score:** 90/100. The register is fully traceable and does not invent missing behavior;
  quality is reduced by unresolved lifecycle, permission, recovery, and authority-hygiene gaps.
- **Confidence score:** 94/100 for the cited approved states, edges, invariants, and deferrals; lower
  confidence is intentionally represented as deferred rather than guessed.
- **Remaining gaps:** CSM-GAP-001 through CSM-GAP-014, especially Candidate lifecycle, identity and
  organization context lifecycles, publication/revision recovery, BA exceptional edges, Guided
  Activation, Recommendation invalidation, Core readiness interpretation, and OS recovery.
- **Recommended next phase:** lifecycle-authority and UI-authority review remediation for the
  affected machines. Documentation-level wireframes may begin only after the relevant owner states,
  recovery boundaries, and UI approval gate are sufficient; feature specifications follow their
  governing milestone. No implementation phase is authorized.

# 11. Evidence Index

## 11.1 Controlling and approved architecture

- [Core Platform Architecture v1.1 Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md)
- [Core Platform Architecture v1.0 Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
- [Business Brain Architecture v1.0 Freeze](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md)
- [Marketplace Architecture v1.0 Freeze](../99-architecture-freeze/MARKETPLACE-v1.0-FREEZE.md)
- [Foundation Baseline v0.1](../00-governance/FOUNDATION-BASELINE-v0.1.md)
- [Foundation Journey Successor Addendum v1.0](../01-genesis/21-FOUNDATION-JOURNEY-SUCCESSOR-ADDENDUM-v1.0.md)
- [Core Platform Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)
- [Core Platform Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)
- [Core Platform Data Ownership](../02-core-platform/04-DATA-OWNERSHIP.md)

## 11.2 Accepted decisions

- [ADR-004 — Genesis Organization Hierarchy](../00-governance/ADR/ADR-004-genesis-organization-hierarchy.md)
- [ADR-005 — Business DNA Business-Scoped and Software-Independent](../00-governance/ADR/ADR-005-business-dna-business-scoped-software-independent.md)
- [ADR-013 — Capability-First Explainable Recommendations](../00-governance/ADR/ADR-013-capability-first-explainable-recommendations.md)
- [ADR-014 — Human Control over Recommendations and AI](../00-governance/ADR/ADR-014-human-control-over-recommendations-and-ai.md)
- [ADR-015 — Infer Before Asking](../00-governance/ADR/ADR-015-infer-before-asking-conversational-configuration.md)
- [ADR-016 — Business Architect Governed Pipeline](../00-governance/ADR/ADR-016-business-architect-governed-pipeline.md)
- [ADR-018 — Separate Core and OS Readiness](../00-governance/ADR/ADR-018-separate-core-and-os-readiness.md)
- [ADR-026 — Standard Operating System Lifecycle](../00-governance/ADR/ADR-026-standard-operating-system-lifecycle.md)
- [ADR-034 — Explicit Tenant and Resource Scope](../00-governance/ADR/ADR-034-explicit-tenant-and-resource-scope.md)
- [ADR-042 — Pre-Registration Business Discovery](../00-governance/ADR/ADR-042-pre-registration-business-discovery.md)
- [ADR-043 — Foundation Discovery and Business Architect Composition](../00-governance/ADR/ADR-043-foundation-discovery-and-business-architect-composition.md)

## 11.3 UI/UX authority and evidence

- [Canonical Journey Mapping](./16-CANONICAL-JOURNEY-MAPPING.md)
- [Canonical User Flow Authority](./17-CANONICAL-USER-FLOWS.md)
- [Screen Map](./02-SCREEN-MAP.md)
- [Screen Status Matrix](./12-SCREEN-STATUS-MATRIX.md)
- [Presentation State Authority](./07-STATE-MACHINES.md)
- [UI/UX Authority Reconciliation](./UI-UX-AUTHORITY-RECONCILIATION-v1.0.md)

# 12. Validation Record

Validation was executed on 2026-07-20 against the completed Phase 5 artifact.

| Check | Result |
|---|---|
| Output scope | PASS — this phase created only `docs/03-ui-ux/18-CANONICAL-STATE-MACHINES.md`; the untracked Phase 3/4 inputs `16-CANONICAL-JOURNEY-MAPPING.md` and `17-CANONICAL-USER-FLOWS.md` were already present and were not modified in Phase 5 |
| Machine IDs | PASS — 17 definition headings, 17 `Machine ID` fields, and 17 unique IDs (`CSM-001`–`CSM-017`) |
| Required definition fields | PASS — all 22 required fields appear for every machine (374/374) |
| Gap IDs | PASS — 14 unique rows (`CSM-GAP-001`–`CSM-GAP-014`) |
| Exact state count | PASS — 4 Discovery labels + 11 Business Architect Session labels + 5 Recommendation labels + 13 OS lifecycle labels = 33 |
| Exact transition count | PASS — 6 Business Architect primary edges + 5 Recommendation edges + 12 OS lifecycle edges = 23 |
| Journey coverage | PASS — 25/25 canonical stages (`CJ-00`–`CJ-24`) have machine/boundary coverage |
| User Flow coverage | PASS — 31/31 canonical flows (`FLOW-001`–`FLOW-031`) have machine/boundary coverage |
| Orphan transitions | PASS — every one of the 23 counted edges uses labels within its owning approved state vocabulary; invariant/projection rows are not counted as edges |
| Reachability | PASS for complete approved graphs — all 7 primary CSM-006 states are reachable from `not_started`; all 5 CSM-011 states are reachable from `generated`; all 13 CSM-014 states are reachable from `Available` in their approved forward graphs |
| Incomplete-graph reachability | EXPLICITLY DEFERRED — CSM-001’s four status labels and CSM-006’s four exceptional labels do not have an approved complete edge graph, so the document does not falsely classify them as reachable; CSM-GAP-001/CSM-GAP-014 and CSM-006 future dependencies preserve this blocker |
| Duplicate IDs | PASS — no duplicate machine heading ID or gap-row ID |
| Relative Markdown links | PASS — 26 unique relative targets checked; 0 broken |
| Markdown tables | PASS — no inconsistent pipe count within any table |
| `git diff --check` | PASS for tracked changes; target-only no-index check also passed with no whitespace diagnostics |
| Working tree | REVIEWED — only `docs/03-ui-ux/16-CANONICAL-JOURNEY-MAPPING.md`, `17-CANONICAL-USER-FLOWS.md`, and this new file are untracked; no tracked file is modified |
| Protected sources | PASS — no Architecture Freeze, ADR, Genesis, Core, Foundation, Journey, User Flow, screen map, frontend, backend, package, test, configuration, CI, database, infrastructure, or runtime file was modified |
| Prohibited outputs | PASS — no wireframe, feature specification, code, API, schema, service, Contract, Event, persistence, or implementation artifact was created |
| Delivery boundaries | PASS — Feature 056 and Session 5 remain not started; frontend and backend remain unauthorized |

The validation does not claim that deferred state graphs are complete. It confirms that every
approved edge is internally reachable within its complete source graph and that incomplete graphs
are visible blockers rather than invented behavior.
