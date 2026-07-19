# User-Visible State Machines

- **Status:** Target UX state specification reconciled with current frontend evidence
- **Snapshot date:** 2026-07-19
- **Owner:** Product Experience with the applicable Core Platform or Commerce owner
- **Authority:** Presentation states only

## 1. Purpose

This document defines user-visible states and safe presentation transitions for the major
frontend flows. It does **not** define canonical domain state machines, database enums, backend
workflow states, API contracts, ownership, or persistence models. Each UI transition must
eventually be driven by an owner-approved fact, permission, or frontend fixture.

## 2. Scope

The models cover Authentication, Workspace Creation, Business Interview, Business Analysis,
Business Blueprint, Recommendations, Product Activation, and Commerce Setup.

## 3. Shared Rules

1. Loading, empty/not-started, unavailable, unauthorized, stale, error, retrying, and ready are
   presentation outcomes, not domain facts.
2. The UI never infers authorization from authentication, a client-provided ID, plan, or product
   availability.
3. A retry repeats only safe reads or explicitly idempotent actions. Consequential commands require
   known outcome handling.
4. A partial projection identifies unavailable sections; it never fabricates owner data.
5. State changes preserve current locale, direction, focus, safe form draft, and authorized context.
6. Core state machines cannot own Commerce setup/operations. Commerce cannot write Core identity,
   Workspace, Business, or subscription state.

## 4. Authentication Presentation State Machine

**Owner boundary:** Core Platform identity/session presentation.

```mermaid
stateDiagram-v2
    [*] --> ResolvingSession
    ResolvingSession --> Authenticated: valid session and context can continue
    ResolvingSession --> SignedOut: no valid session
    ResolvingSession --> Unavailable: session read failed
    SignedOut --> CollectingIdentifier: choose Login/Register
    CollectingIdentifier --> InvalidInput: client validation fails
    InvalidInput --> CollectingIdentifier: edit
    CollectingIdentifier --> CollectingSecret: valid identifier
    CollectingSecret --> Authenticating: submit
    Authenticating --> InvalidCredentials: rejected
    InvalidCredentials --> CollectingSecret: retry/edit
    Authenticating --> Authenticated: accepted mock result
    Authenticating --> Unavailable: unknown failure
    SignedOut --> RecoveringAccount: forgot password
    RecoveringAccount --> SignedOut: reset completed or canceled
    SignedOut --> Registering: create account
    Registering --> VerificationRequired: mock account created
    VerificationRequired --> Registering: account context missing
    VerificationRequired --> Authenticated: verification presentation complete
    Unavailable --> ResolvingSession: retry safe read
    Authenticated --> [*]: route to exact safe destination
```

| State | User-visible behavior | Valid next states | Guard/evidence |
|---|---|---|---|
| Resolving Session | Non-flashing progress state | Signed Out, Authenticated, Unavailable | Current browser session read |
| Signed Out | Login/Register choices | Collecting Identifier, Registering, Recovering Account | No accepted session |
| Collecting Identifier | Email/identifier entry | Invalid Input, Collecting Secret | Client validation only |
| Collecting Secret | Password entry | Authenticating, Collecting Identifier | Identifier preserved safely |
| Authenticating | Disabled submit and progress | Authenticated, Invalid Credentials, Unavailable | Current `loginUser` result; future owner fact |
| Registering | Account details and validation | Verification Required, Invalid Input, Unavailable | Current `createUser` result |
| Verification Required | OTP input/resend | Authenticated, Registering, Unavailable | Current mock accepts complete code; not production verification evidence |
| Recovering Account | Request/code/reset presentation | Signed Out, Invalid Input, Unavailable | Current local flow only |
| Authenticated | Resume resolution, not a final permission | Destination flow | Session exists; authorization still required |
| Unavailable | Safe explanation and retry | Resolving Session or Signed Out | Read/operation failure |

**Current implementation:** Login/Register/verification/recovery expose most form states. Session
resolution often returns `null` or redirects silently, and the post-login decision is only
completed-browser-onboarding versus `/onboarding`.

## 5. Workspace Creation Presentation State Machine

**Owner boundary:** Core Platform Workspace context. Workspace is the customer/tenant boundary and
must not be presented as canonical Business or Business Unit.

```mermaid
stateDiagram-v2
    [*] --> ResolvingEligibility
    ResolvingEligibility --> NotStarted: authorized to create
    ResolvingEligibility --> Unauthorized: not permitted
    ResolvingEligibility --> Unavailable: context read failed
    NotStarted --> Drafting: first input
    Drafting --> Invalid: validation fails
    Invalid --> Drafting: edit
    Drafting --> Creating: submit valid draft
    Creating --> Created: owner accepts
    Creating --> Failed: write failed
    Failed --> Drafting: retain draft
    Failed --> Creating: safe retry
    Created --> BusinessArchitectEntry: target sequence
    Unauthorized --> [*]
    Unavailable --> ResolvingEligibility: retry
```

| State | User-visible behavior | Guard/evidence |
|---|---|---|
| Resolving Eligibility | Load session and creation eligibility | Authenticated Core context |
| Not Started | Introduction and empty form | No creation attempt |
| Drafting | Name and locale-aware defaults editable | Local draft only |
| Invalid | Field-specific accessible errors | Client validation; future server validation remains authoritative |
| Creating | Submit disabled; progress announced | Current mock `createWorkspace`; future owning operation |
| Created | Confirmation and next action | Workspace projection available in current context |
| Failed | Retained draft and retry/cancel | Known failure; no success assumed |
| Unauthorized | No create control; safe Core destination | Owner authorization result |
| Unavailable | Safe context error | Read dependency unavailable |

**Current implementation:** `/welcome` introduces creation and `/onboarding` step 1 calls
`createWorkspace`. Hydration can render blank, write failure is not surfaced, and success proceeds
to OS selection rather than Business Architect.

## 6. Business Interview Presentation State Machine

**Owner boundary:** Core Platform Business Architect and Business DNA intake/review. Answers and
draft candidates are not automatically published Business DNA.

```mermaid
stateDiagram-v2
    [*] --> ResolvingBusinessContext
    ResolvingBusinessContext --> NotStarted: authorized Business and no session
    ResolvingBusinessContext --> Resumable: safe draft exists
    ResolvingBusinessContext --> Unauthorized: context denied
    ResolvingBusinessContext --> Unavailable: context/session read failed
    NotStarted --> PromptLoading: start
    Resumable --> PromptLoading: resume
    PromptLoading --> Answering: prompt ready
    PromptLoading --> Failed: prompt unavailable
    Answering --> InvalidAnswer: validation/clarification needed
    InvalidAnswer --> Answering: revise
    Answering --> SupportingInformation: optional evidence path
    SupportingInformation --> Answering: return to prompt
    Answering --> SavingCheckpoint: continue or pause
    SavingCheckpoint --> PromptLoading: more prompts
    SavingCheckpoint --> Paused: user exits
    SavingCheckpoint --> ReviewReady: interview complete
    SavingCheckpoint --> Failed: save failed
    Failed --> PromptLoading: retry read
    Failed --> Answering: retained draft
    Paused --> Resumable: later authorized return
    ReviewReady --> [*]
```

| State | User-visible behavior | Guard/evidence |
|---|---|---|
| Resolving Business Context | Confirm Business and any safe session | Canonical Business context required; current implementation lacks it |
| Not Started | Introduction and start action | No draft session |
| Resumable | Explain saved point and resume | Authorized, non-superseded draft |
| Prompt Loading | Skeleton/progress for next prompt | Planned replaceable fixture/client read |
| Answering | One guided/conversational prompt | Prompt ready |
| Invalid Answer | Inline explanation without losing input | Presentation validation |
| Supporting Information | Optional supporting context | Approved evidence policy only |
| Saving Checkpoint | Announced progress; controls protected | Safe draft checkpoint operation |
| Paused | Confirmation and Core safe exit | Checkpoint known saved |
| Review Ready | Interview completion and Review action | All required prompts complete |
| Failed | Error type, retained input, safe retry | Known mock/client failure |
| Unauthorized | No Business details exposed | Owner access decision |

**Current implementation:** No Business Architect route, component, fixture seam, session, or state
model was found.

## 7. Business Analysis Presentation State Machine

**Owner boundary:** Business Brain owns deterministic Decisions/advisory outputs; Business DNA,
Knowledge, Rules, and OS facts retain their owners. This UI does not define analysis rules.

```mermaid
stateDiagram-v2
    [*] --> ReviewRequired
    ReviewRequired --> ReadyToAnalyze: user confirms versioned input
    ReviewRequired --> NeedsCorrection: incomplete/conflicting review
    NeedsCorrection --> ReviewRequired: answers corrected
    ReadyToAnalyze --> Queued: start accepted
    Queued --> Analyzing: deterministic run begins
    Queued --> Failed: start unavailable
    Analyzing --> NeedsCorrection: owner requests valid input
    Analyzing --> Failed: retryable failure
    Analyzing --> Completed: Decision/output available
    Failed --> Queued: safe retry same input/version
    Failed --> ReviewRequired: edit input
    Completed --> BlueprintAvailable: projection composed
    BlueprintAvailable --> [*]
```

| State | User-visible behavior | Guard/evidence |
|---|---|---|
| Review Required | Show material answers, provenance, gaps | Completed interview draft |
| Needs Correction | Link to exact correction point | Owner/fixture validation result |
| Ready to Analyze | Confirm exact input version | Review explicitly confirmed |
| Queued | Acknowledge request without invented progress | Planned deterministic fixture/result |
| Analyzing | Meaningful progress/status supplied by source | No AI-only or fabricated stage |
| Failed | Explain retry/edit paths | Known failure and outcome |
| Completed | Analysis completion; no recommendation shown yet | Completed deterministic result |
| Blueprint Available | Navigate to Blueprint | Blueprint projection ready |

**Current implementation:** No deterministic Business Brain frontend runtime, fixture, analysis
route, or progress state exists. The first frontend slice must not simulate ungoverned AI analysis.

## 8. Business Blueprint Presentation State Machine

**Owner boundary:** Core presentation composed from owner-approved projections. Business Blueprint
is not a new aggregate and does not own Business DNA or Recommendation lifecycle.

```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> Ready: all required sections available
    Loading --> Partial: required presentation can render with named omissions
    Loading --> Empty: no completed analysis/Blueprint
    Loading --> Stale: source versions changed
    Loading --> Unauthorized: access denied
    Loading --> Failed: read failed
    Partial --> Loading: retry missing sections
    Stale --> Loading: refresh approved projection
    Failed --> Loading: retry
    Ready --> InspectingSection: navigate within Blueprint
    InspectingSection --> Ready: return to overview
    Ready --> RecommendationsAvailable: continue
    Partial --> RecommendationsAvailable: only if owner projection permits
    Ready --> CorrectionRequested: request review path
    CorrectionRequested --> [*]: return to owner-approved correction flow
    RecommendationsAvailable --> [*]
```

| State | User-visible behavior | Guard/evidence |
|---|---|---|
| Loading | Section skeletons with context | Blueprint read in progress |
| Empty | Explain analysis prerequisite | No completed Blueprint projection |
| Partial | Render available sections and name unavailable ones | Partial owner projections; no fabricated values |
| Stale | Explain source version change and refresh path | Source version mismatch |
| Ready | Business DNA, summary, needs, challenges, opportunities, readiness, capabilities, roadmap | Approved composed projection |
| Inspecting Section | In-page navigation and provenance | Same read-only projection |
| Correction Requested | Link back to review; no direct canonical write | Approved correction workflow required |
| Recommendations Available | Separate next-stage action | Recommendation projection availability, not Blueprint mutation |
| Failed/Unauthorized | Retry or safe return; minimized details | Read/authorization result |

**Current implementation:** No Business Blueprint screen exists. Platform Dashboard and Product Hub
must not be mislabeled as this customer-facing Blueprint.

## 9. Recommendations Presentation State Machine

**Owner boundary:** Recommendation Engine and applicable owner projections. Recommendations are
optional, explainable, downstream of Business context, Capabilities, Knowledge, deterministic
Rules, and completed Business Brain Decisions.

```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> NoneAvailable: no recommendation candidates/results
    Loading --> Ready: recommendations available
    Loading --> Partial: one source unavailable
    Loading --> Stale: source version changed
    Loading --> Failed: read failed
    Loading --> Unauthorized: access denied
    Ready --> Inspecting: open rationale/evidence
    Inspecting --> Ready: close detail
    Ready --> Deferred: user chooses later
    Ready --> Dismissed: permitted disposition
    Ready --> Continuing: choose allowed next action
    Partial --> Loading: retry
    Stale --> Loading: refresh
    Failed --> Loading: retry
    Deferred --> [*]
    Dismissed --> [*]
    Continuing --> [*]: Plan/access or owner action flow
```

| State | User-visible behavior | Guard/evidence |
|---|---|---|
| Loading | Recommendation skeleton/progress | Recommendation read pending |
| None Available | Neutral empty state; Dashboard continuation | Valid empty result |
| Ready | Ranked/grouped explainable Recommendations | Owner projection ready |
| Inspecting | Rationale, evidence, assumptions, alternatives, risk, confidence, benefit | Fields supplied by projection |
| Partial/Stale | Name limitation and retry/refresh | Source state |
| Deferred | Preserve optional future review | Accepted disposition if approved |
| Dismissed | Confirmation without rewriting Blueprint | Accepted disposition if approved |
| Continuing | Route to access/plan/owner action | Separate authorization and validation |
| Failed/Unauthorized | Retry or safe return | Read/access outcome |

**Current implementation:** No Recommendation screen or fixture exists. Product Hub's current
static/derived cards are not a substitute for capability-first explainable Recommendations.

## 10. Product Activation Presentation State Machine

**Owner boundary:** Core Product Hub composes owner projections and handoff. Commercial and
operational lifecycle concepts remain distinct. The unresolved successor to legacy `OSEnablement`
is not defined here.

```mermaid
stateDiagram-v2
    [*] --> LoadingProjections
    LoadingProjections --> Unavailable: product unavailable/future
    LoadingProjections --> Available: product can be considered
    LoadingProjections --> Partial: one owner projection failed
    LoadingProjections --> Unauthorized: product/action not visible
    LoadingProjections --> Failed: composition failed
    Available --> AccessRequired: no approved access
    Available --> SetupRequired: access exists, OS not ready
    Available --> Ready: access and OS readiness projections permit launch
    AccessRequired --> AccessPending: allowed commercial action begins
    AccessPending --> SetupRequired: access projection confirms
    AccessPending --> AccessRequired: rejected/failed
    SetupRequired --> HandoffPending: start setup
    HandoffPending --> HandoffRejected: target rejects context
    HandoffRejected --> SetupRequired: return/retry
    HandoffPending --> InOwnerSetup: target accepts
    InOwnerSetup --> SetupRequired: save/exit incomplete
    InOwnerSetup --> Ready: owner reports ready
    Ready --> LaunchPending: launch
    LaunchPending --> InOperatingSystem: target accepts
    LaunchPending --> Ready: launch failure
    Partial --> LoadingProjections: retry
    Failed --> LoadingProjections: retry
```

| State | User-visible behavior | Guard/evidence |
|---|---|---|
| Loading Projections | Per-owner loading, not one fabricated global state | Product/access/readiness reads |
| Unavailable | Coming later/unavailable explanation | Product catalog projection |
| Available | Product information and next allowed action | Availability alone grants nothing |
| Access Required/Pending | Billing/access route and outcome | Core commercial owner projection |
| Setup Required | Setup action without claiming operational readiness | Access plus OS owner readiness projection |
| Handoff Pending/Rejected | Cross-app progress or safe return | Accepted current frontend handoff boundary |
| In Owner Setup | Commerce owns UI and writes | Target app accepted context |
| Ready | Launch action if user is authorized | Owner readiness plus access/permission projections |
| Launch Pending/In OS | Target navigation and accepted operational context | Target owner result |
| Partial/Failed/Unauthorized | Minimized state, retry, or no action | Composition/access result |

**Current implementation:** Product Hub currently derives subscription/setup booleans and builds a
Commerce handoff. Core Dashboard layout incorrectly requires Commerce in `completedOS` before
entry. Current `osEnablements` records are legacy compatibility state and remain non-canonical.

## 11. Commerce Setup Presentation State Machine

**Owner boundary:** Commerce owns setup UI, operational configuration, validation, persistence, and
readiness. Core supplies approved read-only context/handoff only.

```mermaid
stateDiagram-v2
    [*] --> Hydrating
    Hydrating --> MissingContext: no accepted Core handoff
    Hydrating --> AuthenticationRequired: handoff exists but actor session absent
    Hydrating --> LoadingSetup: context accepted
    Hydrating --> Failed: browser read failed
    MissingContext --> [*]: return Product Hub or Login
    AuthenticationRequired --> [*]: Core Login
    LoadingSetup --> Drafting: new or incomplete setup
    LoadingSetup --> Ready: setup already complete
    LoadingSetup --> Failed: read failed
    Drafting --> InvalidStep: continue with invalid input
    InvalidStep --> Drafting: edit
    Drafting --> Saving: save/exit or step checkpoint
    Saving --> Drafting: saved and continue
    Saving --> Failed: write failed
    Drafting --> Reviewing: final step
    Reviewing --> Drafting: edit earlier step
    Reviewing --> Completing: finish
    Completing --> Ready: owner setup reports complete
    Completing --> Failed: completion failed
    Failed --> LoadingSetup: retry read
    Failed --> Drafting: retained safe draft
    Ready --> CommerceDashboard
    CommerceDashboard --> [*]
```

| State | User-visible behavior | Guard/evidence |
|---|---|---|
| Hydrating | Progress without rendering another context | Commerce AppProvider hydration |
| Missing Context | Explain Product Hub entry requirement | No valid handoff compatibility context |
| Authentication Required | Safe Core Login action | Handoff exists; current actor absent |
| Loading Setup | Load existing Commerce setup | Commerce owner store/service |
| Drafting | Eight setup steps and live preview | Local Commerce draft |
| Invalid Step | Accessible field errors; stay on step | Commerce presentation validation |
| Saving | Disable conflicting actions, announce progress | Commerce setup service write |
| Reviewing | Summary and edit links | Required draft sections present |
| Completing | Finish operation pending | Commerce owner service |
| Ready | Commerce Dashboard action | Commerce setup projection reports complete |
| Failed | Known outcome, retained safe draft, retry | Read/write/completion failure |

**Current implementation:** All eight steps and missing-context recovery exist. Hydration has a
spinner; setup uses current browser services. Copy is mostly hard-coded English, route-level role
guards are absent, and production persistence/authorization are intentionally not defined.

## 12. State Coverage Matrix

| Machine | Current coverage | Primary missing UX |
|---|---|---|
| Authentication | Partial to strong | Unified session/resume state, complete localization, non-silent hydration/error |
| Workspace Creation | Partial | Visible failure/retry and Business Architect exit |
| Business Interview | Missing | Entire guided/resumable presentation and fixture seam |
| Business Analysis | Missing | Entire deterministic progress/recovery presentation |
| Business Blueprint | Missing | Entire composed read-only presentation |
| Recommendations | Missing | Entire explainable optional recommendation presentation |
| Product Activation | Partial | Correct Platform-first gate, distinct projection states, permission-aware actions |
| Commerce Setup | Strong frontend mock | Localization, permission presentation, stronger failure/resume evidence |

## 13. Relationships

- [User Journeys](./05-USER-JOURNEYS.md)
- [User Flows](./06-USER-FLOWS.md)
- [Screen Status Matrix](./12-SCREEN-STATUS-MATRIX.md)
- [Design System Interaction Patterns](../04-design-system/05-INTERACTION-PATTERNS.md)
- [Core Platform Architecture](../02-core-platform/README.md)

## 14. Open Questions

- Which owner-approved permission catalog gates each action represented above?
- Which canonical Business entry/selection state precedes Business Interview?
- What approved product decision defines user-visible restart/discard behavior for an interview
  draft?

## 15. Verified Against

- current route, layout, shell, auth, onboarding, setup, Product Hub, POS, and feature-state source
  under `apps/core-platform` and `apps/commerce`;
- current mock storage, repositories, services, and Features 052–055 test evidence;
- [Platform Experience](./01-PLATFORM-EXPERIENCE.md), [Screen Map](./02-SCREEN-MAP.md),
  [User Journeys](./05-USER-JOURNEYS.md), and [User Flows](./06-USER-FLOWS.md);
- Core Platform, Business Brain, and Commerce OS architecture/freeze documents; and
- Accepted ADR-016, ADR-023, Product Decisions, the Constitution, and repository AGENTS guidance.

