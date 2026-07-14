# ADR-005: Business DNA Is Business-Scoped and Software-Independent

## Status

Accepted

## Context

Nexoraxs must describe how each Business operates without allowing software selection or Workspace aggregation to redefine that Business.

## Decision

Every Business owns exactly one Business DNA identity. Business DNA describes the Business and never describes software. OS selections, plans, subscriptions, modules, and configurations are stored separately. Business DNA versions are history of the same identity, not additional identities.

## Consequences

- Every additional Business completes its own Business Architect experience.
- Recommendations and Configuration Proposals are separate from Business DNA.
- No Operating System may create or own a separate Business DNA model.

## Alternatives Considered

- Store Business DNA at Workspace, Business Unit, Branch, or OS scope.
- Generate Business DNA from selected software.
- Store recommendations or module states as Business DNA facts.

## Related Documents

- [Genesis Business DNA](../01-genesis/03-BUSINESS-DNA.md)
- [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md)
- [Approved Proposal — ADR-CP-003](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

