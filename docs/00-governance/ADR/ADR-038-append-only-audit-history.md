# ADR-038: Critical Audit History Is Append-Only

## Status

Accepted

## Context

Critical platform and OS actions require trustworthy historical evidence. Editing or deleting earlier audit records would destroy accountability.

## Decision

Core Audit Service stores append-only Audit Records with actor or service, Workspace and applicable scopes, source domain, action, subject, time, correlation, and result or change reference. Corrections and reversals create new records rather than altering history.

## Consequences

- Core and authorized OS producers use one shared audit pattern.
- Retention and export policy require later country and legal decisions.
- Audit projections may be filtered, but canonical history is not rewritten.

## Alternatives Considered

- Allow domains to overwrite audit history.
- Store only current state without decision history.
- Use mutable activity-feed entries as the audit source of truth.

## Related Documents

- [Genesis Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md)
- [Approved Proposal — Ownership Rules](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

