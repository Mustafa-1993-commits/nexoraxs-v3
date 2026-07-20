# User Journeys

| Field | Value |
|---|---|
| Version | 1.1 reconciliation candidate |
| Status | Canonical UI/UX authority candidate; implementation not authorized |
| Owner | Product Experience; destination ownership remains with Core Platform or the applicable Operating System |
| Architecture | Core Platform Architecture v1.1 Freeze |

## 1. Purpose

This document defines presentation-level journeys consistent with Core Platform Architecture v1.1.
It describes customer intent, control, continuity, and recovery. It does not define routes, domain
states, persistence, APIs, permissions, or implementation.

## 2. Journey Rules

- Business Discovery is method-independent and is not restricted to a conversation, form, wizard,
  or route.
- Public Discovery is the primary value path, not a mandatory gate. Direct Register/Login remains
  compatible.
- Candidate Business Understanding is temporary, non-canonical, reviewable, correctable, and
  unable to authorize action.
- First Business DNA publication requires authenticated Workspace and Business ownership, material
  review, correction opportunity, and explicit approval.
- Guided Activation starts only after first publication and remains distinct from OS-Specific Setup.
- Business Blueprint is a governed authenticated non-writing projection, never a source of truth.
- Recommendations are optional, capability-first, explainable, and may be declined or postponed.
- Every journey is resumable where authority permits and must expose safe recovery.

## 3. Journey Template

Each journey records actor, starting context, goal, preconditions, experience stages, decision
points, customer control, recovery, successful outcome, non-goals, and unresolved deferrals.
Semantic destinations are used instead of route decisions.

## 4. J-01 — First-Time Visitor Through Discovery

- **Actor:** Unauthenticated visitor.
- **Starting context:** Public entry with no Workspace or Business identity.
- **Goal:** Receive credible value before deciding whether to register.
- **Preconditions:** None; anonymous Workspace or Business state is forbidden.
- **Experience stages:** Entry → choose or accept a suitable knowledge-acquisition method → provide
  or permit evidence → view inferred Candidate Business Understanding → inspect confidence and
  provenance → correct material inaccuracies → view Value Preview → Register or Login if choosing
  to continue.
- **Decision points:** Continue, change method, correct, pause, discard, or authenticate.
- **Customer control:** Evidence use, corrections, and authentication are explicit; no canonical
  publication occurs.
- **Recovery:** Preserve only the continuity that future approved retention policy permits; otherwise
  explain loss safely and allow restart.
- **Successful outcome:** Useful temporary reflection and an informed authentication choice.
- **Non-goals:** Creating Workspace, Business, Business DNA, subscription, or OS readiness.
- **Unresolved deferrals:** Discovery retention, candidate conversion mechanism, exact methods, and
  exact presentation destinations.

## 5. J-02 — Direct-Registering First-Time Customer

- **Actor:** Visitor choosing Register or Login without public Discovery.
- **Starting context:** Public identity entry.
- **Goal:** Establish authenticated ownership without bypassing understanding controls.
- **Preconditions:** Valid identity workflow.
- **Experience stages:** Register/Login → resolve or create Workspace → resolve or create Business →
  enter authenticated candidate-understanding work through the Business Architect pipeline → review
  and correct → explicit approval → first Business DNA v1 publication → Guided Activation.
- **Decision points:** Select or create authorized context, pause, correct, approve, or leave.
- **Customer control:** Registration, account details, “Next”, or completion never imply publication.
- **Recovery:** Return to the exact safe authenticated pipeline position represented by owner evidence.
- **Successful outcome:** First governed Business DNA publication for the selected Business.
- **Non-goals:** A second onboarding architecture or publication directly from account details.
- **Unresolved deferrals:** Exact Business create/select presentation and exact resume mechanism.

## 6. J-03 — Returning Authenticated Customer

- **Actor:** Authenticated member.
- **Starting context:** One or more accessible Workspaces and Businesses.
- **Goal:** Reach the safest useful destination without losing scope.
- **Preconditions:** Authenticated identity and server-authorized memberships.
- **Experience stages:** Resolve Workspace → resolve Business where required → inspect independent
  readiness/continuity signals → resume incomplete Business Architect or Guided Activation work, or
  enter Platform Dashboard → Product Hub → installed OS when authorized and ready.
- **Decision points:** Change context, resume work, enter Dashboard, inspect Blueprint, review a
  Recommendation, or hand off to an OS.
- **Customer control:** Context changes are visible and confirmation is required where unsaved work
  or consequence exists.
- **Recovery:** Invalid/stale deep links return to the nearest safe parent with context explanation.
- **Successful outcome:** Correct authorized destination in preserved context.
- **Non-goals:** Inferring authorization from a remembered client identifier.
- **Unresolved deferrals:** Exact destination-resolution policy and route scheme.

## 7. J-04 — Resume Incomplete Public Discovery

- **Actor:** Returning unauthenticated visitor, or the same visitor after authentication.
- **Starting context:** A permitted incomplete Discovery continuity reference.
- **Goal:** Continue without repeating known facts.
- **Preconditions:** Continuity evidence is valid under the future approved retention policy.
- **Experience stages:** Re-enter → verify continuity availability → show current evidence and gaps →
  continue, correct, authenticate for conversion, or discard.
- **Decision points:** Resume, restart, change method, authenticate, or discard.
- **Customer control:** The UI explains whether information is temporary and what authentication will
  convert; it never presents temporary content as Business DNA.
- **Recovery:** Expired/unavailable continuity produces a clear explanation and safe restart.
- **Successful outcome:** Updated Candidate Business Understanding or intentional exit.
- **Non-goals:** Defining a Discovery Session state machine.
- **Unresolved deferrals:** Retention duration and conversion-token mechanics.

## 8. J-05 — Resume Incomplete Business Architect Work

- **Actor:** Authenticated member authorized for the selected Business.
- **Starting context:** Existing governed Business Architect Session evidence.
- **Goal:** Resume the inherited pipeline without conflating other lifecycles.
- **Preconditions:** Workspace and Business access is revalidated.
- **Experience stages:** Resolve context → present safe resume → continue inference/gap acquisition →
  review and correct → explicit approval when publication-ready.
- **Decision points:** Continue, pause, address a blocker, restart only when governed, or exit.
- **Customer control:** The inherited Session may progress, pause, block, expire, or be superseded as
  frozen; those are not Discovery or Guided Activation presentation states.
- **Recovery:** Explain expired/superseded work and route to an owner-authorized recovery path.
- **Successful outcome:** Continued governed pipeline or a safely recorded pause.
- **Non-goals:** Defining new Session states or combining Session and presentation lifecycles.
- **Unresolved deferrals:** Exact screen treatment and owner read contract.

## 9. J-06 — Review Candidate Business Understanding

- **Actor:** Authorized Business participant.
- **Starting context:** Authenticated temporary candidate associated through the governed pipeline.
- **Goal:** Understand and materially verify what may become canonical.
- **Preconditions:** Valid Workspace, Business, actor, candidate, and evidence context.
- **Experience stages:** Review Observed Facts and distinguished Inferences/Assessments → inspect
  confidence/provenance → identify contradictions/gaps → correct or supply evidence → re-review.
- **Decision points:** Correct, add evidence, defer, reject candidate material, or proceed to approval.
- **Customer control:** Corrections remain distinct from explicit publication approval.
- **Recovery:** Preserve review context where authorized; show stale/version conflict and reload.
- **Successful outcome:** Materially reviewed candidate ready for explicit approval or further work.
- **Non-goals:** Editing Business DNA through a projection.
- **Unresolved deferrals:** Materiality policy and exact evidence presentation.

## 10. J-07 — Approve First Business DNA Publication

- **Actor:** Authenticated actor with applicable Business authority.
- **Starting context:** Materially reviewed candidate.
- **Goal:** Publish Business DNA v1 deliberately.
- **Preconditions:** Workspace and Business ownership resolved; review complete enough under owner
  policy; approval authority verified.
- **Experience stages:** Publication summary → consequences and source disclosure → explicit approve
  or return to correction → owner validation → success or actionable failure.
- **Decision points:** Approve, correct, cancel, or seek authorized assistance.
- **Customer control:** Approval is a dedicated consequential action and cannot be inferred from
  navigation or account creation.
- **Recovery:** Validation/permission/conflict failure preserves the candidate and returns to review.
- **Successful outcome:** First canonical, versioned, Business-scoped Business DNA publication.
- **Non-goals:** Specifying command, API, signature, or database behavior.
- **Unresolved deferrals:** Exact permission and confirmation treatment.

## 11. J-08 — Continue Through Guided Activation

- **Actor:** Authorized participant for a Business with published Business DNA.
- **Starting context:** First publication completed or later governed revision context.
- **Goal:** Resolve material uncertainty and reach Core Workspace readiness.
- **Preconditions:** Published Business DNA exists.
- **Experience stages:** Explain remaining gaps → continue adaptive acquisition/validation → review
  proposed corrections or additions → publish governed revisions when explicitly approved → show
  Core readiness and next choices.
- **Decision points:** Continue, pause, correct, approve revision, or enter an allowed Core destination.
- **Customer control:** Guided Activation never silently writes DNA and never performs OS setup.
- **Recovery:** Resume from owner evidence; distinguish pipeline Session lifecycle from presentation.
- **Successful outcome:** More complete governed understanding and/or Core Workspace Ready.
- **Non-goals:** Product Hub ownership or OS-Specific Setup.
- **Unresolved deferrals:** Exact completion/readiness presentation and revision policy.

## 12. J-09 — View Business Blueprint

- **Actor:** Authorized Business viewer.
- **Starting context:** Governed owner outputs available for projection.
- **Goal:** Understand the Business through an accessible customer-facing synthesis.
- **Preconditions:** Business access; projection availability.
- **Experience stages:** Load projection → inspect Business DNA-based summary, needs, challenges,
  opportunities, readiness indicators, capabilities, and roadmap views → inspect source/context where
  available → navigate to correction or next destination.
- **Decision points:** Explore, request correction through owner workflow, proceed to Product Hub, or
  review optional Recommendations.
- **Customer control:** The Blueprint is read-only and never presented as canonical storage.
- **Recovery:** Partial/stale/unavailable projection is disclosed; no fabricated completeness.
- **Successful outcome:** Understandable governed projection without ownership confusion.
- **Non-goals:** Direct canonical edits or a new Blueprint aggregate.
- **Unresolved deferrals:** Exact projection composition and correction entry.

## 13. J-10 — Enter Product Hub

- **Actor:** Authenticated member in authorized Workspace/Business context as applicable.
- **Starting context:** Core destination, Blueprint, Dashboard, or Recommendation.
- **Goal:** Understand available products, access, readiness, and safe next actions.
- **Preconditions:** Core access and owner projections.
- **Experience stages:** View composed product/access/readiness information → inspect context and
  availability → choose owner-governed commercial action, OS setup handoff, launch, or return.
- **Decision points:** Learn, subscribe where authorized, continue setup, launch ready OS, or defer.
- **Customer control:** Product Hub does not imply Recommendation acceptance.
- **Recovery:** Stale/unavailable owner projections are identified; safe retry/return remains.
- **Successful outcome:** Correct handoff without ownership transfer.
- **Non-goals:** Owning subscriptions, OS facts, Business DNA, or OS setup.
- **Unresolved deferrals:** Exact entitlement/subscription successor semantics and routes.

## 14. J-11 — Review Optional Recommendation

- **Actor:** Authorized Business viewer or decision-maker.
- **Starting context:** Recommendation presentation in Business context.
- **Goal:** Assess advice without pressure or false certainty.
- **Preconditions:** Owner-provided Recommendation evidence.
- **Experience stages:** View need/outcome/capability → inspect reasoning, evidence, assumptions,
  alternatives, risk, confidence, and NexoraXS disclosure → accept only an allowed next step, defer,
  decline, or retain current tools.
- **Decision points:** Explore capability, compare option, defer, decline, or request correction.
- **Customer control:** No product is required; no consequential action is automatic.
- **Recovery:** Unavailable/stale lineage is disclosed and action is withheld where required.
- **Successful outcome:** Informed choice independent of product adoption.
- **Non-goals:** Inventing Recommendation lifecycle states or directly configuring an OS.
- **Unresolved deferrals:** Recommendation review/disposition and invalidation policy.

## 15. J-12 — Start OS-Specific Setup

- **Actor:** Authorized member selecting an available Operating System.
- **Starting context:** Product Hub handoff with explicit Workspace, Business Unit, and other required
  scope.
- **Goal:** Begin OS-owned setup safely.
- **Preconditions:** Required commercial/access state and permission; Core context revalidated by the
  OS owner.
- **Experience stages:** Product Hub handoff → OS accepts/rejects context → OS-owned setup → OS owner
  reports readiness → operational entry.
- **Decision points:** Continue setup, pause, return to Hub, or launch when ready.
- **Customer control:** Core Workspace Ready is never presented as Operating System Ready.
- **Recovery:** Failed handoff returns safely to Product Hub without synthesizing OS state.
- **Successful outcome:** Owner-validated OS setup or safe return.
- **Non-goals:** Core-owned OS setup, routes, or operational data.
- **Unresolved deferrals:** Exact OS setup contracts and implementation.

## 16. J-13 — Recover From Interruption or Validation Failure

- **Actor:** Any public or authenticated participant.
- **Starting context:** Interrupted, stale, invalid, unavailable, or permission-changed experience.
- **Goal:** Understand what happened and continue safely.
- **Preconditions:** None beyond the affected experience.
- **Experience stages:** Detect → preserve safe user input where authorized → explain effect → offer
  retry, correction, re-authentication, context change, safe return, or support.
- **Decision points:** Retry, leave, re-authenticate, change context, or discard temporary work.
- **Customer control:** No hidden retry, publication, purchase, or operational action.
- **Recovery:** The recovery action itself is keyboard-accessible, localized, and idempotent at the
  presentation level; domain behavior remains owner-defined.
- **Successful outcome:** Safe continuation or explicit exit.
- **Non-goals:** Defining backend retry semantics.
- **Unresolved deferrals:** Timeout, retention, and conflict policies.

## 17. J-14 — Correct Incorrect Inferred Information

- **Actor:** Visitor reviewing a candidate or authenticated Business participant.
- **Starting context:** Displayed inference or assessment considered inaccurate.
- **Goal:** Correct the understanding without hiding provenance or mutating unrelated owners.
- **Preconditions:** Correction path allowed for the displayed artifact.
- **Experience stages:** Identify item → inspect supporting evidence/confidence → propose correction or
  provide evidence → review changed interpretation → explicitly approve publication if canonical
  change is later requested.
- **Decision points:** Correct, challenge source, defer, or cancel.
- **Customer control:** Correction is distinct from canonical publication and consequential action.
- **Recovery:** Conflicts/staleness preserve both understandable context and safe return.
- **Successful outcome:** Corrected candidate or owner-governed revision request.
- **Non-goals:** Direct Blueprint or Insight writes.
- **Unresolved deferrals:** Correction policy per knowledge type.

## 18. J-15 — Decline or Postpone a Recommendation

- **Actor:** Authorized Recommendation viewer.
- **Starting context:** Optional Recommendation detail.
- **Goal:** Decline or defer without losing product access or receiving deceptive pressure.
- **Preconditions:** Recommendation presentation available.
- **Experience stages:** Review rationale/options → choose not now, decline where owner policy permits,
  retain current tools, or simply return → receive neutral confirmation.
- **Decision points:** Postpone, decline, compare, or leave.
- **Customer control:** Product Ethics Law governs; no negative consequence is invented.
- **Recovery:** Accidental choice uses owner-approved reversible treatment if available; exact
  Recommendation lifecycle is not inferred.
- **Successful outcome:** Customer choice respected and clearly communicated.
- **Non-goals:** Standardizing Recommendation disposition states.
- **Unresolved deferrals:** Recommendation review and lifecycle policy.

## 19. Cross-Journey Requirements

Every journey must support English/LTR and Arabic/RTL, keyboard operation, visible focus,
appropriate language declaration, responsive reflow, understandable loading/empty/error/recovery
states, permission-safe failure, and non-color-only meaning. Analytics, where later authorized,
measure presentation events without becoming canonical state or exposing sensitive evidence.

## 20. Relationships

- [Platform Experience](./01-PLATFORM-EXPERIENCE.md) defines the canonical experience model.
- [User Flows](./06-USER-FLOWS.md) decomposes these journeys into semantic interactions.
- [Presentation State Authority](./07-STATE-MACHINES.md) classifies state categories.
- [Information Architecture](./04-INFORMATION-ARCHITECTURE.md) owns semantic destinations.
- [Screen Map](./02-SCREEN-MAP.md) separates current implementation evidence from target authority.

## 21. Open Questions

Only the deferrals stated per journey remain open; they must be resolved by the owning Governance,
UI/UX design, feature specification, or implementation milestone and must not be inferred here.

## 22. Verified Against

- `docs/99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md`
- `docs/00-governance/ADR/ADR-015-infer-before-asking-conversational-configuration.md`
- `docs/00-governance/ADR/ADR-016-business-architect-governed-pipeline.md`
- `docs/00-governance/ADR/ADR-042-pre-registration-business-discovery.md`
- `docs/00-governance/ADR/ADR-043-foundation-discovery-and-business-architect-composition.md`
- `docs/01-genesis/21-FOUNDATION-JOURNEY-SUCCESSOR-ADDENDUM-v1.0.md`
- `docs/03-business-brain/13-BUSINESS-BRAIN-FOUNDATION-COMPATIBILITY-v1.0.md`
- `docs/00-governance/glossary/GLOSSARY.md`

