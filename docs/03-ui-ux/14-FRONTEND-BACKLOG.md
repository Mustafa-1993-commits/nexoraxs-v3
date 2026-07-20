# Frontend Backlog and Feature-Intake Register

| Field | Value |
|---|---|
| Version | 1.1 reconciliation planning snapshot |
| Status | Planning only; no specification or implementation authorization |
| Owner | Product Experience and future feature-intake owners |

## 1. Purpose

Classify prior frontend backlog ideas after Core Platform Architecture v1.1. This file is not a
`tasks.md`, roadmap approval, feature specification, or delivery authorization. IDs remain stable as
planning references only.

## 2. Allowed Classifications

- **Documentation reconciliation** — authority wording/index work.
- **Design work** — wireframes, content, accessibility, localization, responsive, and interaction
  decisions within approved architecture.
- **Feature-intake candidate** — may be considered for a future `spec.md`; not yet approved.
- **Implementation candidate** — only after approved spec/plan/tasks and all gates.
- **Deferred Governance** — cannot be answered in UI or code.
- **Obsolete** — based on superseded sequence/authority.
- **Already satisfied** — current evidence meets the limited planning outcome; not production proof.

## 3. Reclassified Backlog

| Ref | Candidate outcome | Previous interpretation | Current classification | Dependencies | Gate status |
|---|---|---|---|---|---|
| FE-001 | Locale-independent UX and launch-language parity | “Ready” Locale Engine implementation | Design work + feature-intake candidate | Localization authority; preference precedence remains deferred | Specification blocked until UI authority approval; implementation blocked |
| FE-002 | Safe entry and destination resolution | Platform-first redirect implementation | Feature-intake candidate | Reconciled journeys/IA; identity/context owner inputs | Implementation blocked |
| FE-003 | Localized public and identity experience | Landing/auth implementation task | Design work + feature-intake candidate | FE-001; identity spec | Implementation blocked |
| FE-004 | Workspace resolution UX | Workspace creation reconciliation | Design work + feature-intake candidate | Core organization authority | Implementation blocked |
| FE-005 | Canonical Business resolution UX | Business screen task | Deferred Governance + feature-intake candidate | Legacy BusinessUnit reconciliation; owner contract | Specification conditional; implementation blocked |
| FE-006 | Method-independent Discovery and Business Architect composition | Conversational BA screen slice | Design work + feature-intake candidate | ADR-043; Discovery methods/privacy; FE-004/005 | Implementation blocked |
| FE-007 | Candidate evidence, review, correction, explicit approval | Interview supporting-info task | Design work + feature-intake candidate | Materiality, evidence, permission inputs | Implementation blocked |
| FE-008 | Business Understanding/Insight presentation | Separate “analysis” screen/runtime task | Design work; obsolete as a separate owner/service | Business Brain projection authority | Implementation blocked |
| FE-009 | Governed Business Blueprint projection | Blueprint screen task | Design work + feature-intake candidate | Published DNA/owner projections | Implementation blocked |
| FE-010 | Optional capability-first Recommendations | Recommendation/access sequence task | Design work + feature-intake candidate | Recommendation review/invalidation policy | Implementation blocked |
| FE-011 | Guided Activation and Core readiness | “Final onboarding” after plan | Design work + feature-intake candidate; old sequence obsolete | First DNA publication, Core readiness input | Implementation blocked |
| FE-012 | Product Hub composition/handoff | Product Hub state implementation | Feature-intake candidate | ADR-023 deferral, owner projections, permissions | Implementation blocked |
| FE-013 | Workspace administration/context | Selector/team/admin implementation | Feature-intake candidate | Membership/permission inputs | Implementation blocked |
| FE-014 | Commerce localization parity | Commerce localization implementation | Separate Commerce feature-intake candidate | FE-001 authority; Commerce ownership | Foundation spec N/A; Commerce implementation blocked |
| FE-015 | Commerce state/recovery completion | Commerce route-polish task | Separate Commerce feature-intake candidate | Commerce specs and current seams | Implementation blocked |
| FE-016 | Responsive tables/documents | Reusable implementation task | Design System work + OS feature-intake candidate | Accessibility/Design System review | Implementation blocked |
| FE-017 | Commerce Returns/Movements completion | Implied missing-screen task | Separate Commerce feature-intake candidate | Commerce domain specifications | Implementation blocked |
| FE-018 | Accessibility evidence across critical flows | Test/polish task | Design work + future implementation candidate | Accessibility authority and feature scope | Implementation blocked |
| FE-019 | Profile, Notifications, Audit presentation | Platform implementation task | Later Core feature-intake candidate | Owner projections/permissions | Implementation blocked |
| FE-020 | Search, command, analytics, observability | Later implementation task | Later-platform feature-intake candidate | Privacy, indexing, permission, event policy | Implementation blocked |

## 4. Documentation Reconciliation Completed in This Candidate Package

- Reframed Platform Experience around value-before-registration and compatible direct entry.
- Replaced account-first journeys and route-based target flows with semantic v1.1 flows.
- Classified presentation states without creating new domain lifecycles.
- Reclassified route/screen inventories as current evidence.
- Completed accessibility and UI-copy authorities and strengthened localization authority.
- Defined wireframe governance without claiming designs exist.
- Separated Product Hub, Guided Activation, and OS-Specific Setup.
- Corrected Blueprint, Insight, and Recommendation ownership language.

Completion here means documentation candidate work exists; it does not mean approval or product
implementation is complete.

## 5. Earliest Future Intake Order

If UI/UX authority and subsequent Governance gates are approved, the dependency-safe intake order is:

1. Resolve UIAUTH-HYGIENE-001 and approve this UI/UX package.
2. Produce Foundation successor wireframes and content review.
3. Prepare one Foundation successor feature specification covering Discovery/direct-entry
   convergence through explicit publication and Guided Activation boundaries without creating a
   Feature 056 directory in this task.
4. Prepare separate owner projections/specifications for Blueprint, Insight, Recommendation, and
   Product Hub as dependencies require.
5. Only then prepare implementation plans/tasks and run Constitution Checks.

This order is advisory intake sequencing, not authorization.

## 6. Explicitly Obsolete Assumptions

- Landing → Register → Workspace → Business Architect as the sole new-user sequence.
- Guided Business Conversation as the Business Discovery capability.
- OS/plan selection immediately after Workspace creation.
- Recommendations necessarily preceding a plan-selection step.
- exact `/onboarding/business-architect/...` target routes.
- a separate Business Analysis/Insight service or canonical owner.
- “Ready for specification” or “Ready” labels based only on this backlog.

## 7. Definition of Intake Ready

A candidate is not ready until it has controlling Freeze/ADRs, owner and scope, approved UI/UX and
wireframe inputs, resolved blocking deferrals, security/privacy/Audit/observability requirements,
English/Arabic and accessibility criteria, compatibility impact, and traceable acceptance outcomes.

## 8. Definition of Implementation Ready

Implementation remains unauthorized until an approved `spec.md`, `plan.md`, and `tasks.md` pass the
Constitution Checks and all architecture, UI/UX, owner, contract, security, localization,
accessibility, testing, and release gates. This document satisfies none of those gates by itself.

## 9. Relationships and Verified Against

- [UX Gaps](./13-UX-GAPS.md)
- [UI/UX Authority Reconciliation](./UI-UX-AUTHORITY-RECONCILIATION-v1.0.md)
- [Milestone Lifecycle](../00-governance/MILESTONE-LIFECYCLE.md)
- `AGENTS.md` sections 13–15
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md`

