# UX Flow Index

| Field | Value |
|---|---|
| Version | 1.1 reconciliation candidate |
| Status | Traceability index only |
| Owner | Product Experience |

## 1. Purpose

Map each approved experience concern from architecture to journey, semantic flow, presentation
state authority, destination, cross-cutting authority, and current evidence. This index creates no
new flow or implementation scope.

## 2. Traceability Matrix

| Concern | Architecture | Journey | Flow | State authority | Destination/evidence | Cross-cutting authority |
|---|---|---|---|---|---|---|
| Public value and Discovery | Freeze 5.1–5.3; ADR-042/043 | J-01, J-04 | F-01 | Discovery matrix | UXD-01–03; missing evidence | Accessibility, Localization, Copy |
| Direct registration | Freeze 5.5; ADR-043 | J-02 | F-02 | Candidate/publication matrix | UXD-04–10; partial auth evidence | Identity patterns, Accessibility, Copy |
| Candidate conversion | Freeze 5.4–5.5 | J-01, J-06–07 | F-03 | Candidate/publication matrix | UXD-03, 06–10; missing | Provenance, confirmation, recovery |
| Business Architect resume | Freeze 5.6; ADR-016/043 | J-05 | F-04 | Inherited Session authority | UXD-08–10; missing | Accessible progress/recovery |
| Guided Activation | Freeze 5.7 | J-08 | F-05 | Guided Activation matrix | UXD-11; missing | Localization, recovery |
| Business Blueprint | Freeze 5.8 | J-09 | F-05 | Blueprint matrix | UXD-12; missing | Blueprint template, Copy, Accessibility |
| Business Insight | Freeze 5.9; BB compatibility | J-09, J-11 | F-06 | Insight/Recommendation matrix | UXD-13; missing | Confidence/provenance components |
| Recommendations | Freeze 5.10; ADR-013/014 | J-11, J-15 | F-06 | Insight/Recommendation matrix | UXD-14; missing | Ethics copy, explanation patterns |
| Returning entry | Freeze 5.5–5.7 | J-03, J-05, J-13 | F-08 | Owner state + recovery | UXD-06–08, 15–16; partial | IA safe return, permission patterns |
| Product Hub/OS handoff | Freeze 6.4–6.5; ADR-018–020 | J-10, J-12 | F-07 | Hub/OS matrix | UXD-16, 18–19; partial mock | Hub/Commerce templates |
| Correction/recovery | Freeze 5.4–5.10 | J-13–15 | F-10 | Cross-category recovery | UXD-20; uneven | Interaction Patterns, Accessibility, Copy |
| Locale/direction | ADR-041; Freeze preserved guarantees | Cross-journey | F-09 | Presentation-only | Partial current evidence | Localization and Accessibility |

## 3. Authority Boundaries

- Architecture and ADRs control owners, sequencing invariants, and prohibited interpretations.
- [Platform Experience](./01-PLATFORM-EXPERIENCE.md) controls customer-experience principles.
- [Information Architecture](./04-INFORMATION-ARCHITECTURE.md) controls semantic navigation.
- [User Journeys](./05-USER-JOURNEYS.md) controls customer goals and recovery outcomes.
- [User Flows](./06-USER-FLOWS.md) controls presentation-level interaction sequences.
- [Presentation State Authority](./07-STATE-MACHINES.md) controls state classification, not domain
  lifecycles.
- [Design System](../04-design-system/README.md) controls reusable semantics.
- [Screen Map](./02-SCREEN-MAP.md), [Status Matrix](./12-SCREEN-STATUS-MATRIX.md), and gap reports
  are evidence.
- [Frontend Backlog](./14-FRONTEND-BACKLOG.md) is planning only.

## 4. Deferred Traceability

Exact routes, wireframes, permissions, retention, candidate conversion, owner data/contracts,
Recommendation lifecycle, OS setup details, and implementation remain deferred. Future artifacts
must add links here without converting the index into authority for those decisions.

## 5. Open Questions

No separate open question is created here. Refer to each controlling document and the
[Reconciliation Decision](./UI-UX-AUTHORITY-RECONCILIATION-v1.0.md).

## 6. Verified Against and Cross References

- [UI/UX Authority index](./README.md)
- [Core Platform Architecture v1.1](../99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md)
- [ADR-043](../00-governance/ADR/ADR-043-foundation-discovery-and-business-architect-composition.md)
- [Foundation Journey Successor Addendum](../01-genesis/21-FOUNDATION-JOURNEY-SUCCESSOR-ADDENDUM-v1.0.md)
