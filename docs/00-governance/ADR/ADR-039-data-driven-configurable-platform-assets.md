# ADR-039: Platform Knowledge and Configuration Assets Are Data-Driven

## Status

Accepted

## Context

Hardcoded questions, Rules, Recommendations, Capabilities, workflows, dashboards, and reports would duplicate Knowledge and make the platform difficult to evolve.

## Decision

Business Knowledge, Rules, questions, Recommendations, Capabilities, workflows, dashboards, reports, and configuration metadata exist as structured, versioned data whenever possible. Software consumes these assets rather than embedding duplicate business knowledge in code.

## Consequences

- Knowledge can outlive implementation technologies.
- Updates can follow review and version lifecycles.
- Hardcoded industry and product behavior is rejected.

## Alternatives Considered

- Encode business knowledge independently in every UI or OS.
- Use source code as the only definition of Rules and Recommendations.
- Duplicate the same Knowledge in documentation, prompts, and modules.

## Related Documents

- [Genesis Constitution](../01-genesis/02-CONSTITUTION.md)
- [Genesis Knowledge Engine](../01-genesis/05-KNOWLEDGE-ENGINE.md)
- [Genesis Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md)

