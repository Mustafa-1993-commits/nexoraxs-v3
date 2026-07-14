# ADR-027: Marketplace Is a Bounded Context Within the Core Platform Offering

## Status

Accepted

## Context

Genesis assigns Marketplace to Core Platform while also defining it as a permanent ecosystem layer with its own assets and lifecycle.

## Decision

Core Platform is accountable for providing and governing Marketplace. Marketplace remains a separate bounded context that owns asset, publisher, version, purchase, installation, activation, applicability, review, and lifecycle models behind explicit contracts. It consumes shared Core identity, billing, authorization, audit, notification, and tenant services.

## Consequences

- Marketplace may be co-deployed in the modular monolith and extracted later without changing ownership.
- Product Hub and Business Brain consume Marketplace projections and commands rather than its tables.
- Marketplace is part of the Core offering without becoming every Core module's responsibility.

## Alternatives Considered

- Merge Marketplace data and behavior into Product Hub.
- Treat Marketplace as an unrelated external system.
- Allow every Core module to manage Marketplace records directly.

## Related Documents

- [Genesis Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [Genesis Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)
- [Approved Proposal — ADR-CP-017](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)

