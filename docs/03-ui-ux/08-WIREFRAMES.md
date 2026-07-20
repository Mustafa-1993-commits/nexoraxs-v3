# Wireframe Authority Boundary

| Field | Value |
|---|---|
| Version | 1.0 reconciliation candidate |
| Status | Canonical wireframe-governance boundary; no approved wireframes are present |
| Owner | Product Design |

## 1. Purpose

Define when documentation-level wireframes are required, what they may decide, and how they become
reviewable evidence without replacing architecture, UI/UX authority, or a feature specification.

## 2. Scope

Future low-fidelity representations of approved semantic destinations, navigation, content
hierarchy, presentation states, responsive behavior, and customer control.

## 3. Out of Scope

Architecture, canonical ownership, domain/session lifecycles, routes, APIs, persistence, tokens,
component code, detailed visual styling, production copy, or implementation authorization.

## 4. Current Evidence

No approved wireframe set was found for the Foundation successor experience. This file is an
authority boundary, not a placeholder claiming designs exist. Existing application screens are
implementation evidence in the [Screen Map](./02-SCREEN-MAP.md), not substitute wireframes.

## 5. Wireframes Required Before Feature Specification Completion

Wireframes are required for any future feature whose UX introduces or materially changes:

- public Discovery, Candidate Reflection, or Value Preview;
- authenticated candidate review, correction, and explicit publication approval;
- Business Architect resume or Guided Activation;
- Business Blueprint, Insight, or Recommendation presentation;
- Workspace/Business context resolution or switching;
- Product Hub composition or OS handoff; or
- a critical recovery, permission, or destructive flow.

## 6. Allowed Decisions

A wireframe may decide, subject to review:

- semantic content order and progressive disclosure;
- navigation placement and safe return;
- visible customer choices and confirmation placement;
- responsive prioritization;
- presentation of loading, empty, error, low-confidence, permission, and recovery outcomes;
- focus intent, landmarks, headings, labels, and accessible alternatives; and
- which evidence/provenance details are initially visible or expandable.

## 7. Prohibited Decisions

A wireframe may not:

- create or rename a canonical concept, owner, permission, lifecycle, readiness state, or contract;
- turn Business Discovery into one required form/chat/wizard;
- imply publication from “Next”, registration, or completion;
- make Blueprint, Insight, Recommendation, Product Hub, or UI state canonical;
- perform OS-Specific Setup in Core; or
- authorize implementation.

## 8. Required Annotations

Every future wireframe must identify:

- controlling journey, flow, architecture source, actor, Workspace/Business context, and owner;
- loading, empty, validation, error, permission, low-confidence, interruption, resume, and success
  treatments, or explicit N/A rationale;
- keyboard order, initial/returned focus, landmarks, headings, accessible names, and status messages;
- mobile and desktop behavior without loss of meaning or action;
- English/LTR and Arabic/RTL layouts, including mixed-direction content;
- mirrored versus non-mirrored icons/assets;
- source/provenance/confidence treatment where relevant; and
- assumptions or deferred owner inputs.

## 9. Approval Workflow

1. Bind the wireframe to approved UI/UX authority and the controlling Freeze/ADRs.
2. Review product meaning and ownership with the applicable Core or OS owner.
3. Review accessibility, localization, directionality, and responsive annotations.
4. Record unresolved decisions rather than implying them visually.
5. Approve the wireframe as feature-specification input; approval does not authorize code.
6. Link the approved wireframe from the future `spec.md`; implementation still requires the full
   Spec Kit lifecycle.

## 10. Dependencies and Open Questions

Dependencies are the [Platform Experience](./01-PLATFORM-EXPERIENCE.md), [Information
Architecture](./04-INFORMATION-ARCHITECTURE.md), [User Journeys](./05-USER-JOURNEYS.md), [User
Flows](./06-USER-FLOWS.md), [Accessibility](./09-ACCESSIBILITY.md), [Localization](./10-LOCALIZATION.md),
and [Design System](../04-design-system/README.md). Exact wireframe packages remain a future design
milestone; no visual question is resolved here.

## 11. Verified Against and Cross References

- `docs/99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md`
- `docs/00-governance/MILESTONE-LIFECYCLE.md`
- [Page Templates](../04-design-system/04-PAGE-TEMPLATES.md)
- [Interaction Patterns](../04-design-system/05-INTERACTION-PATTERNS.md)
