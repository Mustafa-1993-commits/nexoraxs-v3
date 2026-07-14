# ADR-036: API Gateway Is Part of a Contract-First API Architecture

## Status

Accepted

## Context

A routing gateway alone cannot define domain ownership, context, compatibility, asynchronous behavior, or resource-level authorization for Core, OSs, Marketplace, partners, and AI tools.

## Decision

Core uses a governed API Architecture with Core Module, first-party experience, OS integration, Marketplace, public, administrative, event/webhook, and AI tool surfaces. Shared rules cover context, versioning, idempotency, errors, observability, rate limits, and compatibility. Gateway handles boundary authentication, coarse policy, limits, routing, and telemetry; owning domains enforce resource authorization and invariants.

## Consequences

- API schemas become first-class architecture assets.
- Read projections may compose owners but cannot gain write authority.
- Long-running operations expose explicit operation status.

## Alternatives Considered

- Treat the gateway as the owner of business logic.
- Expose arbitrary internal endpoints or tables.
- Define each API surface with unrelated security and version rules.

## Related Documents

- [Approved Proposal — ADR-CP-018](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

