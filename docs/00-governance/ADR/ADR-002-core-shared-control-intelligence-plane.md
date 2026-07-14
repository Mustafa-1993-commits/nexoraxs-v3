# ADR-002: Core Platform Is the Shared Control and Intelligence Plane

## Status

Accepted

## Context

Independent Operating Systems need common organizational, commercial, governance, knowledge, and intelligence capabilities without duplicating them or becoming tightly coupled.

## Decision

Core Platform owns shared identity, organization, commercial control, platform governance, Business DNA, Knowledge, Rules, Capabilities, Business Brain, recommendations, configuration coordination, Product Hub, Marketplace governance, shared services, and AI coordination. Operating Systems consume these capabilities through governed contracts.

## Consequences

- Core is more than an authentication and billing shell.
- Strong internal modularity and canonical ownership are required.
- Operating Systems must not duplicate shared Core concerns.

## Alternatives Considered

- Place shared intelligence independently inside every Operating System.
- Limit Core to authentication, Workspace, and billing services.
- Allow each OS to define its own platform concepts.

## Related Documents

- [Genesis Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md)
- [Genesis Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)
- [Approved Proposal — ADR-CP-001](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

