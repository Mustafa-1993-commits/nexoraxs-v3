# UX Flow Index

- **Status:** Current documentation index; journeys, flows, and presentation states completed for Phase 1
- **Owner:** Product Experience
- **Authority:** Index only; linked documents retain their stated authority and status

## Purpose

This index provides one entry point for the artifacts that describe how a documented customer
outcome moves from a high-level journey into screen decisions, user-visible states, and
wireframes. It prevents those artifacts from becoming disconnected or duplicating reusable Design
System behavior.

## Scope

The index covers the relationship, status, owner, and required inputs for NexoraXS user journeys,
user flows, user-visible state machines, wireframes, screen completion evidence, UX gaps, and
frontend execution planning.

## Out of Scope

This index does not define a new journey, screen, route, lifecycle, interaction pattern, backend
operation, feature, or implementation task. It does not approve planned implementation.

## Artifact Relationship

```text
Product Decisions and Architecture
  -> Platform Experience
    -> Screen Map and Information Architecture
      -> User Journey
        -> User Flow
          -> User-visible State Model
            -> Wireframe
              -> Approved Feature Specification and Validation Evidence

Current Route Evidence
  -> Screen Status Matrix
    -> UX Gaps
      -> Frontend Backlog
        -> Approved Feature Specification and Validation Evidence
```

Reusable component, page-template, and interaction behavior comes from the
[Design System](../04-design-system/README.md). The UX flow artifacts select and apply those
patterns to an approved product outcome; they do not redefine the reusable patterns.

## Documentation Index

| Artifact | Status | Distinct responsibility | Required prior sources |
|---|---|---|---|
| [Platform Experience](./01-PLATFORM-EXPERIENCE.md) | Current | Canonical stage-level customer experience | Product decisions and architecture |
| [Screen Map](./02-SCREEN-MAP.md) | Current snapshot | Verified routes/screens and planned-screen classification | Repository evidence and Platform Experience |
| [Information Architecture](./04-INFORMATION-ARCHITECTURE.md) | Current | Navigation placement, entry, exit, scope, and safe return | Platform Experience and Screen Map |
| [User Journeys](./05-USER-JOURNEYS.md) | Current target | One actor/outcome across product stages and owners | Platform Experience, Product Decisions, architecture, and current evidence |
| [User Flows](./06-USER-FLOWS.md) | Current target | Screen, action, data-source, decision, guard, and recovery sequence | User Journeys and current/planned screens |
| [State Machines](./07-STATE-MACHINES.md) | Current target | User-visible presentation states mapped to owner-approved facts | User Flows and owner lifecycle sources |
| [Wireframes](./08-WIREFRAMES.md) | Placeholder | Low-fidelity information hierarchy and interaction reference | Approved flow, states, and page-template selection |
| [Screen Status Matrix](./12-SCREEN-STATUS-MATRIX.md) | Current snapshot | Per-screen completion and state evidence | Repository route/source/test evidence |
| [UX Gaps](./13-UX-GAPS.md) | Current analysis | Missing UX outcomes, impact, priority, and complexity | Screen Matrix and target flows |
| [Frontend Backlog](./14-FRONTEND-BACKLOG.md) | Planning | Dependency-aware future frontend tasks | UX Gaps, authority, and Spec Kit gates |

## Traceability Rule

Every future detailed entry must identify:

- stable artifact identifier and status;
- actor, goal, owning product, and applicable context;
- controlling product decision, architecture source, and feature specification;
- upstream journey/flow/state artifact and downstream wireframe or test evidence;
- Arabic/RTL and English/LTR implications;
- accessibility and recovery requirements; and
- current implementation evidence separately from planned behavior.

## Maintenance Rules

1. Add an index entry only when the detailed artifact has a distinct approved scope.
2. Keep planned and current behavior visibly separate.
3. Do not restate reusable interaction rules; link to the applicable Design System pattern.
4. Do not describe canonical domain transitions as UI-owned states.
5. Update this index whenever a linked artifact becomes proposed, approved, superseded, or
   deprecated.

## Open Questions

- Which approved frontend slice will supply the first completed wireframe package and validation
  trace?

## Cross References

- [UI/UX Documentation](./README.md)
- [Product Decision Register](../00-governance/PRODUCT-DECISIONS.md)
- [Frontend Experience Gap Analysis](./03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md)
- [Design System](../04-design-system/README.md)
- [Frontend-First Policy](../11-execution/05-FRONTEND-FIRST-POLICY.md)
- [Documentation Policy](../11-execution/09-DOCUMENTATION-POLICY.md)
