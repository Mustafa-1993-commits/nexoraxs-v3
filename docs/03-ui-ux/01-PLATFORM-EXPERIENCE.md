# Platform Experience

| Field | Value |
|---|---|
| Version | 1.1 reconciliation candidate |
| Status | Reconciled canonical UI/UX authority candidate — implementation not authorized |
| Owner | Product Experience, with Core Platform and each Operating System retaining architecture ownership |
| Controlling architecture | Core Platform Architecture v1.1 Freeze |
| Scope | Customer experience from public entry through Core and optional Operating System handoff |

## 1. Purpose

This document defines the canonical NexoraXS customer-experience model within the boundaries frozen
by [Core Platform Architecture v1.1](../99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md).
It describes semantic destinations, customer control, continuity, and presentation obligations. It
does not define routes, screens, APIs, schemas, persistence, services, or implementation state.

Architecture owns canonical concepts, data, lifecycles, and cross-domain boundaries. This document
owns only the customer-facing experience interpretation of those approved boundaries.

## 2. Authority and Interpretation

Apply this document after:

1. [Core Platform Architecture v1.1 Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md);
2. Accepted [ADR-015](../00-governance/ADR/ADR-015-infer-before-asking-conversational-configuration.md),
   [ADR-016](../00-governance/ADR/ADR-016-business-architect-governed-pipeline.md),
   [ADR-042](../00-governance/ADR/ADR-042-pre-registration-business-discovery.md), and
   [ADR-043](../00-governance/ADR/ADR-043-foundation-discovery-and-business-architect-composition.md);
3. the [Foundation Journey Successor Addendum](../01-genesis/21-FOUNDATION-JOURNEY-SUCCESSOR-ADDENDUM-v1.0.md);
4. [Business Brain Foundation Compatibility](../03-business-brain/13-BUSINESS-BRAIN-FOUNDATION-COMPATIBILITY-v1.0.md);
5. the [Canonical Glossary](../00-governance/glossary/GLOSSARY.md); and
6. this UI/UX authority package.

If this document conflicts with a controlling source, the controlling source wins and the affected
experience work stops. Current frontend behavior remains evidence, never target authority.

## 3. Experience Principles

### 3.1 Value before registration

The primary new-customer path demonstrates useful, reviewable business understanding before asking
for registration. Registration preserves and converts value; it is not the first required step in
the primary path.

Direct Register and Login remain valid entry choices. Value before registration is a primary path,
not a mandatory gate or a prohibition on direct authentication.

### 3.2 Infer before asking

The experience uses approved evidence and existing context before requesting input. It asks only
for material missing, conflicting, uncertain, stale, or policy-required knowledge. It identifies
why a question matters and allows correction.

Infer-before-asking does not permit hidden assumptions, fabricated facts, or automatic canonical
publication.

### 3.3 Method independence

Business Discovery is a Core capability, not a chatbot, form, wizard, conversation, or route.
Knowledge acquisition may use a Guided Business Conversation, structured input, voice, file,
website analysis, import, integration, or another governed method. Guided Business Conversation is
an experience pattern only.

### 3.4 Progressive disclosure

The platform reveals only the information and controls needed for the current customer decision.
Detailed evidence, confidence, lineage, permissions, commercial choices, and setup requirements are
available when relevant without overwhelming the primary task.

### 3.5 Explicit customer control

The customer can inspect material candidate knowledge, distinguish supplied facts from Inferences
and Assessments, correct errors, defer non-required work, and explicitly approve first canonical
publication. `Next`, `Continue`, account creation, Workspace creation, Business creation, or form
completion never implies approval to publish Business DNA.

### 3.6 Confidence and provenance

Where material to understanding or advice, the experience communicates confidence, source,
assumptions, contradictions, and uncertainty in accessible language. It never presents uncertain
Inference as Observed Fact.

### 3.7 Recoverability

Interruption, expiry, validation failure, permission failure, unavailable sources, and partial
owner projections provide an honest recovery path. Resume must not silently cross authentication,
ownership, publication, or Operating System boundaries.

### 3.8 Accessible and global by default

English/LTR and Arabic/RTL have parity from the first approved user-facing slice. Experiences must
remain operable by keyboard and assistive technology, responsive across mobile and desktop,
direction-independent, and suitable for additional locales without redesign.

### 3.9 No false automation

The experience distinguishes platform observation, deterministic evaluation, AI assistance,
recommendation, proposal, customer approval, and owner execution. It does not claim that AI owns a
Decision, that advice executed an action, or that a background process completed when owner
evidence is unavailable.

### 3.10 No silent canonical publication

Candidate Business Understanding remains temporary and non-canonical until authenticated Workspace
and Business resolution, material review and correction, and explicit approval complete. Publication
occurs before Guided Activation.

## 4. Canonical Experience Model

The primary semantic progression is:

```text
Entry
  → Business Discovery
  → Candidate Business Understanding
  → Understanding Reflection and Value Preview
  → Register or Login
  → Workspace and Business resolution
  → Authenticated Candidate Review and Correction
  → Explicit Approval
  → First governed Business DNA v1 publication
  → Guided Activation
  → Business Blueprint
  → Product Hub
  → Optional Recommendations where useful
  → Operating System-specific setup
  → Operating System Ready
```

This is an architecture-aligned progression, not a mandatory single wizard. A customer may pause,
resume, revisit review, omit an optional Recommendation, continue with available access, or return
to an already ready Core or Operating System destination. Semantic destinations do not imply one
screen per node.

## 5. Primary New-Customer Journey

### 5.1 Entry

- **Customer goal:** Understand the product and decide whether to explore value or authenticate.
- **Platform goal:** Offer Business Discovery as the primary value action while keeping Register and
  Login visible.
- **Customer control:** Start Discovery, Register, Login, change locale, or leave.
- **Success:** The customer deliberately enters Discovery or authentication.
- **Owner:** Public presentation is Landing-owned; Discovery and identity entry are Core-owned.

### 5.2 Business Discovery

- **Customer goal:** Receive useful understanding with minimal effort.
- **Platform goal:** Pursue an explicit Discovery Goal by selecting the best approved knowledge
  acquisition method for material Knowledge Gaps.
- **Required behavior:** Infer before asking; expose uncertainty where material; support correction,
  interruption, and privacy-aware continuation.
- **Prohibited interpretation:** Discovery is not required to be conversational or implemented as a
  single surface.
- **Owner:** Core Business Discovery.

### 5.3 Candidate Business Understanding

- **Customer goal:** See what the platform currently understands.
- **Platform goal:** Organize temporary knowledge with provenance, confidence, contradictions, and
  material gaps.
- **Customer control:** Confirm, correct, add context, decline unsupported interpretation, or pause.
- **Boundary:** Candidate knowledge owns nothing canonical, authorizes no action, and configures no
  Operating System.
- **Owner:** Core candidate-understanding boundary.

### 5.4 Understanding Reflection and Value Preview

- **Customer goal:** Obtain useful value and decide whether the understanding is credible enough to
  save and continue.
- **Platform goal:** Present an honest, temporary projection of current understanding, needs,
  opportunities, uncertainty, and capability direction without pretending it is the authenticated
  Business Blueprint.
- **Customer control:** Correct, continue Discovery, register/login, or leave.
- **Boundary:** The preview is not Business DNA, Business Blueprint, a Recommendation lifecycle,
  Product Hub, entitlement, or an implementation commitment.

### 5.5 Authentication and ownership resolution

- **Customer goal:** Preserve progress and place it in the correct owned context.
- **Platform goal:** Authenticate the actor, resolve or create one authorized Workspace, and resolve
  or create the Business that will own Business DNA.
- **Customer control:** Register, Login, select authorized context, create permitted context, recover
  identity, or cancel.
- **Boundary:** No anonymous Workspace or Business is created. Authentication is not authorization.

### 5.6 Authenticated review and correction

- **Customer goal:** Inspect exactly what would become canonical for the selected Business.
- **Platform goal:** Preserve provenance, distinguish candidate from canonical information, expose
  material uncertainty/conflict, and avoid re-asking confirmed knowledge without cause.
- **Customer control:** Correct, return for more information, postpone, or proceed to explicit
  approval.
- **Boundary:** This review composes with the inherited authenticated Business Architect pipeline;
  it does not erase its session lifecycle.

### 5.7 Explicit approval and first publication

- **Customer goal:** Deliberately approve the first governed Business DNA version.
- **Platform goal:** Make the consequence, selected Business, material reviewed content, and next
  step unambiguous.
- **Approval rule:** The approval action must use explicit publication language. It cannot be a
  generic continue action.
- **Success:** Business DNA v1 is published for exactly one authenticated Business.
- **Recovery:** Failure leaves candidate/canonical separation intact and must not imply publication.

### 5.8 Guided Activation

- **Customer goal:** Complete material Core understanding still needed for useful platform use.
- **Platform goal:** Continue the authenticated Business Architect pipeline after first publication,
  resolve uncertainty, validate material facts, and support governed revisions.
- **Boundary:** Guided Activation is not public Discovery, not a replacement for Business Architect,
  not Product Hub, not OS onboarding, and not OS-Specific Setup.

### 5.9 Business Blueprint

- **Customer goal:** Understand the approved Business context and useful implications.
- **Platform goal:** Present a governed authenticated customer-facing projection derived from
  Business DNA and other governed owner outputs.
- **Boundary:** Business Blueprint is non-writing, not canonical storage, not a source of truth, and
  not an independent owner. Partial or unavailable owner outputs remain visibly partial or
  unavailable.

### 5.10 Product Hub

- **Customer goal:** Discover available products and understand valid next actions.
- **Platform goal:** Compose owner-provided availability, entitlement, subscription, setup,
  readiness, and Recommendation projections without taking ownership of them.
- **Boundary:** Product Hub navigates and hands off. It does not own Business DNA, Recommendations,
  subscription records, OS setup, or operational data.

### 5.11 Optional Recommendations

- **Customer goal:** Consider useful advice without coercion.
- **Platform goal:** Present capability-first, evidence-based, confidence-aware, explainable advice
  and any owner-approved implementation options.
- **Customer control:** Review, defer, decline, revisit, or continue without accepting a product.
- **Boundary:** Exact review, disposition, freshness, and invalidation lifecycles remain deferred.
  Product Hub may link to Recommendations but never owns them.

### 5.12 Operating System-specific setup and readiness

- **Customer goal:** Configure an intentionally selected Operating System for its owned operation.
- **Platform goal:** Hand off authorized context and preserve safe return.
- **Owner:** The selected Operating System owns setup, operational configuration, data, commands,
  dashboard, and readiness validation.
- **Boundary:** Core Workspace Ready and Operating System Ready remain distinct. Subscription does
  not imply setup, activation, readiness, or user access.

## 6. Compatible Direct-Registration Journey

Direct registration is a compatible entry into the same publication architecture:

```text
Register or Login
  → Workspace resolution or creation
  → Business resolution or creation
  → authenticated candidate-understanding acquisition and review
  → correction and material validation
  → explicit approval
  → first governed Business DNA v1 publication
  → Guided Activation
```

The direct path may begin with no reusable public candidate. The authenticated Business Architect
pipeline can acquire the missing knowledge using an approved experience. It must still infer before
asking and must not publish Business DNA from account, Workspace, or Business creation fields.

The path is not a second onboarding architecture. Both primary and direct entries converge at one
authenticated review/publication boundary and one Business DNA owner.

## 7. Returning-Customer Experience

Destination resolution uses owner-provided context and authorization; exact routing is deferred.

| Starting context | Experience obligation | Safe outcome |
|---|---|---|
| No valid session | Offer Login/recovery without exposing protected context | Authenticated resume or public entry |
| Existing Workspace, no selected Business | Resolve an authorized Business or offer permitted creation | Selected Business context |
| Existing Business, no published Business DNA | Resume authenticated candidate review/Business Architect work | Explicit approval boundary or safe pause |
| Existing Business DNA, incomplete Guided Activation | Resume the inherited Business Architect pipeline at an owner-supported safe point | Guided Activation continuation or Core destination |
| Core Workspace Ready | Enter an authorized Core destination without requiring OS readiness | Platform Dashboard, Business Blueprint, or Product Hub |
| Installed/setup-incomplete OS | Product Hub identifies owner state and hands off to OS-owned setup | OS setup resume or safe Core return |
| Operating System Ready | Launch the OS after destination authorization | OS-owned operational destination |
| Interrupted public Discovery | Resume only through an approved valid continuation mechanism | Candidate reflection or honest restart/recovery |
| Expired, superseded, or inaccessible context | Explain the safe limitation without leaking existence | Restart, select context, request access, or return |

No destination may infer authority from client-provided identifiers or current frontend storage.

## 8. Business Architect Session Carry-Forward

The inherited Business Architect Session record may progress, pause, block, expire, or be
superseded as frozen. Those are owner record terms for the authenticated pipeline. They are not:

- Discovery Session states;
- Candidate Business Understanding lifecycle states;
- Guided Activation presentation states;
- Business DNA publication states; or
- Operating System setup states.

This document does not add transitions, terminal rules, persistence, or UI labels to that lifecycle.

## 9. Cross-Experience Requirements

### 9.1 Localization and direction

- English/LTR and Arabic/RTL have equivalent task outcomes.
- Customer-authored Business content remains as entered.
- Dates, times, numbers, currency, names, and addresses use approved locale/context presentation.
- Directional affordances adapt without mirroring brand marks, media meaning, or data incorrectly.

### 9.2 Accessibility

All critical paths must meet the approved accessibility baseline in
[Accessibility](./09-ACCESSIBILITY.md), including keyboard operation, semantic structure, focus,
status/error announcement, zoom/reflow, reduced motion, and non-color confidence/provenance.

### 9.3 Mobile and desktop continuity

The same customer outcome, owner boundary, review evidence, correction ability, and recovery path
remain available across supported viewport classes. Responsive adaptation cannot remove required
information or approval consequences.

### 9.4 Permissions and privacy

The UI distinguishes unauthenticated, unauthorized, unavailable, incomplete, and failed outcomes.
It minimizes sensitive Discovery and Business information and never treats hidden UI as final
authorization.

### 9.5 Analytics

Future approved analytics may measure stage entry, completion, interruption, correction, recovery,
and safe handoff. They must not become canonical state or capture sensitive answer content without
approved policy.

## 10. Current Implementation Relationship

The current frontend implements Landing, authentication, Workspace/OS/Plan onboarding, Platform
Dashboard, Product Hub, and Commerce routes. It does not implement the v1.1 Discovery/candidate/
publication/Guided Activation journey. Current routes and browser data remain dated implementation
evidence in [Screen Map](./02-SCREEN-MAP.md) and [Screen Status Matrix](./12-SCREEN-STATUS-MATRIX.md).

This authority does not rename current routes, create screens, or authorize code.

## 11. Deferred Decisions

This document does not resolve:

- exact public or authenticated presentation states;
- exact routes, URLs, deep links, context selectors, or handoff conventions;
- Discovery retention and resume mechanics;
- candidate conversion token or persistence;
- exact permission/role catalog;
- Business DNA materiality, revision, rollback, or concurrent editing;
- Recommendation review, disposition, freshness, or invalidation lifecycle;
- complete Decision Traceability or Explainability presentation policy;
- concrete API, Event, Contract, storage, queue, or backend behavior; or
- exact feature boundaries, screens, components, wireframes, or implementation sequence.

## 12. Open Questions for UI/UX Authority Review

1. Which semantic destinations require separate presentation surfaces versus one adaptive
   experience? This must be decided during later feature design, not here.
2. Which confidence and provenance detail is required in the first approved Discovery and Blueprint
   slices while RFC-010 remains deferred?
3. Which customer-facing terms best distinguish temporary Candidate Understanding from published
   Business DNA in English and Arabic?

## 13. Cross References

- [UI/UX Documentation Index](./README.md)
- [Information Architecture](./04-INFORMATION-ARCHITECTURE.md)
- [User Journeys](./05-USER-JOURNEYS.md)
- [User Flows](./06-USER-FLOWS.md)
- [Presentation State Authority](./07-STATE-MACHINES.md)
- [Accessibility](./09-ACCESSIBILITY.md)
- [Localization](./10-LOCALIZATION.md)
- [UI Copy Guidelines](./11-UI-COPY-GUIDELINES.md)
- [Design System](../04-design-system/README.md)
