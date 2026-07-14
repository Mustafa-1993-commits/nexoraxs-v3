# ADR-028: Marketplace Assets Are Shared and Immutable While Customer State Is Scoped

## Status

Accepted

## Context

Marketplace distributes reusable business assets to many Workspaces and Businesses. Copying or mutating asset content per tenant would destroy version history and governance.

## Decision

Published Marketplace Asset Versions are platform-wide, shared, versioned, and immutable. Purchase, installation, activation, and version selection belong to a Workspace. Applicability may target the Workspace or a selected Business. Updating selects a new version; removal deletes scoped state only.

## Consequences

- Marketplace history remains preserved and auditable.
- Dependencies and compatibility can reference exact versions.
- Workspace state never transfers asset ownership.

## Alternatives Considered

- Copy asset content into every Workspace.
- Modify a published asset version for one customer.
- Delete shared assets when a customer removes them.

## Related Documents

- [Genesis Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [Genesis Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md)
- [Approved Proposal — ADR-CP-004](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)

