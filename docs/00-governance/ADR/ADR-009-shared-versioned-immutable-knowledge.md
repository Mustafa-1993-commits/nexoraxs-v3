# ADR-009: Knowledge and Published Platform Assets Are Shared, Versioned, and Immutable

## Status

Accepted

## Context

Duplicated or mutable business knowledge would make recommendations irreproducible and allow Operating Systems or tenants to diverge from the platform source of truth.

## Decision

Knowledge, Rules, Capabilities, and published Marketplace asset versions are shared platform assets. Published versions are immutable. A change creates a new version; deprecation and archival preserve history. Workspace or Business applicability uses scoped references rather than content copies.

## Consequences

- Recommendations and decisions can cite exact source versions.
- Rollback selects a preserved version.
- Operating Systems and tenants consume shared assets without owning or modifying them.

## Alternatives Considered

- Copy Knowledge into every Workspace or OS.
- Modify a published version in place.
- Delete deprecated Knowledge or historical asset versions.

## Related Documents

- [Genesis Knowledge Engine](../01-genesis/05-KNOWLEDGE-ENGINE.md)
- [Genesis Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [Approved Proposal — ADR-CP-004](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)

