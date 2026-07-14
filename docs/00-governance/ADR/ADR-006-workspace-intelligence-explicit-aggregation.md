# ADR-006: Workspace Intelligence Uses Explicit Non-Destructive Aggregation

## Status

Accepted

## Context

A Workspace with multiple Businesses may need combined intelligence, while every Business must retain its own Business DNA and context.

## Decision

Workspace-level intelligence is an explicitly identified projection over selected Business DNA identities. Aggregation never creates Workspace DNA and never merges, replaces, or rewrites the Business DNA of any Business.

## Consequences

- Business-context views remain the Product Hub default.
- Workspace-wide views identify aggregation explicitly.
- Aggregate projections are reconstructable and do not gain write ownership.

## Alternatives Considered

- Merge all Business DNA into one Workspace record.
- Allow Workspace analysis to update individual Business DNA automatically.
- Treat aggregation as a new canonical Business identity.

## Related Documents

- [Genesis Business DNA](../01-genesis/03-BUSINESS-DNA.md)
- [Genesis Product Hub](../01-genesis/13-PRODUCT-HUB.md)
- [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

