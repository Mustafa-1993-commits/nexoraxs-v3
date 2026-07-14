# ADR-020: Product Hub Is a Composition Boundary, Not a Data Owner

## Status

Accepted

## Context

Product Hub must show a coherent journey across Recommendations, products, Plans, subscriptions, installations, Marketplace, and OS readiness without collapsing their canonical owners.

## Decision

Product Hub composes owner-provided projections and issues commands through owner contracts. It owns customer journey orchestration, explanation, selection capture, and setup routing, but not the underlying Recommendation, catalog, subscription, Marketplace, installation, or OS readiness records.

## Consequences

- Product Hub projections are reconstructable.
- Partial failures and stale projections must remain explainable.
- Product Hub cannot write source-domain tables directly.

## Alternatives Considered

- Copy source records into Product Hub as a second system of record.
- Let Product Hub implement subscription, Marketplace, or OS lifecycle logic itself.
- Use direct database writes to coordinate the customer journey.

## Related Documents

- [Approved Proposal — ADR-CP-016](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)
- [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

