# ADR-010: Knowledge Packs Extend Knowledge Additively

## Status

Accepted

## Context

Customers need industry, country, compliance, analytics, and AI expertise without changing Core code or fragmenting the Knowledge Engine.

## Decision

A Knowledge Pack is a shared, immutable, versioned Knowledge asset distributed through Marketplace. It extends the Core Knowledge Engine additively and never replaces or destructively modifies Core Knowledge. Purchase, installation, activation, version selection, and Business applicability are scoped state.

## Consequences

- Knowledge Packs can improve Business Brain and AI without model retraining or code modification.
- Updates and rollbacks select immutable versions.
- Removal affects scoped state only and preserves the shared asset and history.

## Alternatives Considered

- Embed pack content as tenant-owned copies.
- Allow packs to overwrite or delete Core Knowledge.
- Implement industry expertise through hardcoded OS behavior.

## Related Documents

- [Genesis Knowledge Engine](../01-genesis/05-KNOWLEDGE-ENGINE.md)
- [Genesis Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md)
- [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

