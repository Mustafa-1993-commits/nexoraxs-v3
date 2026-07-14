# ADR-011: Rules Are Deterministic, Versioned, and Explainable

## Status

Accepted

## Context

Business and compliance decisions need reproducible governance that AI cannot invent or bypass.

## Decision

Rules are platform-wide, deterministic, versioned, and explainable assets applied by the Rules Engine. Rule outcomes retain the Rule version and evidence required for traceability. AI may explain Rules but cannot authoritatively replace or override them.

## Consequences

- Governed outcomes can be reproduced and audited.
- Rule changes create controlled versions rather than hidden behavior changes.
- AI remains downstream of deterministic policy.

## Alternatives Considered

- Embed unversioned rules in UI or OS code.
- Allow AI-generated output to become an official Rule automatically.
- Permit different Operating Systems to redefine shared Rules.

## Related Documents

- [Genesis Knowledge Engine](../01-genesis/05-KNOWLEDGE-ENGINE.md)
- [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md)
- [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

