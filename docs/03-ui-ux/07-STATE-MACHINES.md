# Presentation State Authority

| Field | Value |
|---|---|
| Version | 1.1 reconciliation candidate |
| Status | Canonical UI state-classification authority candidate; implementation not authorized |
| Owner | Product Experience; owning domains retain lifecycle authority |
| Architecture | Core Platform Architecture v1.1 Freeze |

## 1. Purpose

This document prevents presentation behavior from becoming an accidental domain state machine. It
classifies the kinds of state a UI may present and identifies which exact lifecycles are inherited,
deferred, or evidence-only.

## 2. State Categories

| Category | Meaning | Authority | Examples allowed here |
|---|---|---|---|
| Domain lifecycle | Canonical owner-governed fact and transitions | Freeze, Accepted ADR, owning-domain authority | Business DNA publication/revision boundary; Core Workspace Ready distinct from OS Ready |
| Session lifecycle | Governed continuity record | Owning pipeline authority | Inherited Business Architect Session may progress, pause, block, expire, or be superseded |
| Presentation state | What a surface currently shows | UI/UX authority and later feature spec | Review offered, correction visible, confirmation requested |
| Loading state | Awaiting required presentation input | Design System and feature spec | Initial load, refresh, incremental content |
| Validation state | User input or prerequisite needs attention | Owner rules plus UI presentation | Missing required material, stale review, invalid local input |
| Permission state | Actor cannot view or act | Authorization owner | Unauthenticated, unauthorized, access changed |
| Empty state | Authorized scope contains no displayable item | Owner read projection plus UI | No Recommendation is valid; no installed OS |
| Error state | Requested presentation cannot complete | Owning boundary and UI | Unavailable, timeout, stale/conflict, dependency failure |
| Recovery state | Safe next action after interruption/failure | Owner contract plus UI | Retry, re-authenticate, change context, return, correct |
| Offline/degraded state | Connectivity or dependency cannot support normal work | Future feature specification | Read-only cached view only if later authorized; never implied here |

## 3. Normative Rules

1. A presentation label does not create a canonical state, enum, transition, Event, or permission.
2. Exact domain lifecycles not frozen by authority are **deferred**.
3. Current code labels are **evidence-only** unless a controlling source adopts them.
4. Loading, empty, error, permission, and recovery outcomes must be distinguishable and localized.
5. Client state never proves authorization, canonical publication, subscription, setup, or readiness.
6. “Continue”, “Next”, account creation, and form completion never imply Business DNA approval.
7. Retrying must not silently repeat a consequential action.

## 4. Inherited Domain and Session Authority

### 4.1 Business Architect Session

The authenticated selected-Business pipeline retains the frozen Session lifecycle. Its record may
**progress, pause, block, expire, or be superseded** under the inherited authority in Core Platform
Architecture v1.1 section 5.6 and ADR-016/ADR-043.

These exact inherited terms:

- are not Discovery Session states;
- are not Candidate Business Understanding lifecycle states;
- are not Guided Activation presentation states;
- are not Business DNA publication states; and
- must not be combined into a new UI or domain state machine.

The UI may present the owner-reported condition and a safe action. It must not calculate or write
the condition.

### 4.2 Business DNA publication

The approved ordering is review/correction → explicit authenticated approval → first Business DNA
v1 publication → Guided Activation. This is an architectural invariant, not a complete state list.
Exact revision, rollback, invalidation, and approval mechanics remain deferred.

### 4.3 Readiness

Core Workspace Ready and Operating System Ready are separate owner facts. UI composition may show
both but must never derive one from the other.

## 5. Experience-State Matrices

The labels below are presentation categories, not domain states.

### 5.1 Public Discovery

| Presentation concern | Required behavior | Classification |
|---|---|---|
| Entry | Explain value, temporary status, method choice, privacy, and customer control | Presentation-only |
| Loading | Identify acquisition or analysis activity without false certainty | Presentation-only |
| No evidence | Explain the gap and offer another appropriate method | Presentation-only |
| Low confidence | Show uncertainty and invite review/correction | Presentation-only |
| Contradiction | Present conflicting material without silently choosing truth | Presentation-only |
| Interrupted | Resume only if retention authority permits; otherwise explain restart | Deferred owner input |
| Error | Retry, alternate method, or safe exit | Presentation-only |
| Completion | Value Preview or authentication choice, never canonical publication | Architectural invariant |

No exact Discovery Session state names are authorized.

### 5.2 Candidate Review and First Publication

| Presentation concern | Required behavior | Classification |
|---|---|---|
| Loading | Load candidate, evidence, confidence, and context | Presentation-only |
| Empty | Explain insufficient material and return to knowledge acquisition | Presentation-only |
| Review | Distinguish Observed Fact, Inference, Assessment, and owner output | Architectural terminology |
| Correction | Permit challenge/correction without implying publication | Architectural invariant |
| Approval required | Dedicated explicit action with consequence disclosure | Architectural invariant |
| Validation failure | Preserve candidate and return to actionable review | Presentation-only |
| Permission denied | Withhold action/content and offer safe return/context change | Authorization outcome |
| Publication success | Confirm versioned Business-scoped publication | Owner fact presentation |

Exact Candidate Business Understanding lifecycle states are deferred.

### 5.3 Guided Activation

| Presentation concern | Required behavior | Classification |
|---|---|---|
| Entry | Only after published Business DNA | Architectural invariant |
| Remaining gaps | Present incompleteness/confidence without false finality | Presentation-only |
| Correction/revision | Return to governed review and explicit publication | Architectural invariant |
| Pause/resume | Present owner-supported continuity | Deferred owner input |
| Completion | Indicate owner-reported Core readiness; do not infer OS readiness | Owner fact presentation |

No exact Guided Activation state names are authorized.

### 5.4 Business Blueprint

| Presentation concern | Required behavior | Classification |
|---|---|---|
| Loading | Preserve context; identify projection loading | Presentation-only |
| Partial/stale | Disclose incompleteness/version context | Presentation-only |
| Ready | Present governed authenticated non-writing projection | Owner projection |
| Correction requested | Navigate to owner workflow; never edit projection directly | Architectural invariant |
| Unavailable/denied | Safe retry/return without leaking Business data | Presentation-only / authorization |

No canonical “Blueprint lifecycle” is created.

### 5.5 Insight and Recommendation

| Presentation concern | Required behavior | Classification |
|---|---|---|
| No insight/recommendation | Valid, neutral empty outcome | Product Ethics / presentation |
| Low confidence | Explain uncertainty and withhold false certainty | Presentation-only |
| Evidence/lineage unavailable | Disclose limitation; restrict action if required | Presentation-only |
| Review | Show rationale, evidence, alternatives, risk, confidence | Frozen Recommendation guarantee |
| Decline/postpone | Neutral customer choice; exact persistence/disposition deferred | Presentation-only |
| Consequential next action | Require owner validation and human authority | Frozen invariant |

Business Insight remains conceptual inside Business Brain Decision. No Recommendation lifecycle is
standardized here.

### 5.6 Product Hub and OS handoff

| Presentation concern | Required behavior | Classification |
|---|---|---|
| Product unavailable | Explain owner-projected availability | Owner projection |
| Commercial action unavailable | Separate permission/entitlement/subscription reasons | Owner projection |
| Setup required | Handoff to OS-owned setup | Architectural invariant |
| OS not ready | Present OS owner result; never infer from Core readiness | Owner projection |
| Launch allowed | Requires readiness, access, and actor permission | Architectural invariant |
| Handoff failure | Preserve Core context and safe return | Presentation-only |

No canonical `OSEnablement` or merged activation state machine is authorized.

## 6. Current Implementation Evidence

Current frontend labels and browser data under `apps/core-platform/` and `apps/commerce/` are an
implementation snapshot only. In particular, current onboarding completion, `osEnablements`,
legacy BusinessUnit-as-Business presentation, and Commerce setup labels must not be promoted into
v1.1 lifecycle authority.

## 7. Required State Coverage Per Future Surface

Every future specification must explicitly address:

- initial and incremental loading;
- success/ready presentation;
- empty/no-data;
- local validation and owner validation;
- unauthenticated and unauthorized;
- stale/conflict;
- dependency and generic error;
- interruption, timeout where applicable, and resume;
- offline/degraded behavior or an explicit N/A rationale;
- recovery and safe return; and
- English/LTR, Arabic/RTL, keyboard, focus, screen-reader, and responsive behavior.

## 8. Deferred Decisions

Exact Discovery, Candidate, Guided Activation, Blueprint, Insight, Recommendation, Product Hub,
and OS setup lifecycle states remain deferred to an approved owning-domain source or feature
specification. This document does not create an RFC or answer them.

## 9. Relationships

- [User Flows](./06-USER-FLOWS.md)
- [Interaction Patterns](../04-design-system/05-INTERACTION-PATTERNS.md)
- [Screen Map](./02-SCREEN-MAP.md)
- [Core Platform Architecture v1.1](../99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md)
- [Business Brain Compatibility](../03-business-brain/13-BUSINESS-BRAIN-FOUNDATION-COMPATIBILITY-v1.0.md)

## 10. Open Questions

Only the deferred exact lifecycles and owner contracts described above remain open. They are not
resolved through UI labels.

## 11. Verified Against

- `docs/99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md` sections 4–6, 10–11
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md` guarantee register
- `docs/00-governance/ADR/ADR-016-business-architect-governed-pipeline.md`
- `docs/00-governance/ADR/ADR-043-foundation-discovery-and-business-architect-composition.md`
- `docs/00-governance/glossary/GLOSSARY.md`

