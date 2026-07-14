# ADR-035: Architecture Contracts Are Technology-Independent and Backward-Compatible

## Status

Accepted

## Context

Genesis must survive framework and infrastructure changes, while independent Operating Systems require stable integration surfaces.

## Decision

Domain identifiers, schemas, APIs, events, lifecycle states, and ownership contracts are defined independently from framework code, database schemas, and deployment topology. Contracts evolve through explicit versions with compatible additive change preferred and governed deprecation for breaking change.

## Consequences

- Framework models cannot be the only contract definition.
- Operating Systems can release independently against supported versions.
- Migration and deprecation policy become required architecture concerns.

## Alternatives Considered

- Expose database models as platform contracts.
- Permit silent breaking changes with application releases.
- Tie permanent domain terminology to one framework.

## Related Documents

- [Genesis Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md)
- [Approved Proposal — ADR-CP-014](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

