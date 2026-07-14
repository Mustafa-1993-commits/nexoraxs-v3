# ADR-022: Operating Systems Have Independent Subscriptions and Canonical Plans

## Status

Accepted

## Context

Customers must be able to add, pause, upgrade, downgrade, or remove one Operating System without changing another.

## Decision

Each Operating System has its own subscription. Where an OS offers plan levels, canonical display names and codes are Starter / `starter`, Pro / `pro`, Business / `business`, and Enterprise / `enterprise`. Bundles may exist but remain optional; products may be purchased individually.

## Consequences

- Commercial state is modular by Operating System.
- Plan codes remain stable across contracts and presentation.
- Bundles cannot create mandatory cross-OS dependencies.

## Alternatives Considered

- Sell only one platform-wide all-inclusive subscription.
- Use different plan names or codes in each context.
- Require bundles when individual OS purchase is viable.

## Related Documents

- [Genesis Subscription Model](../01-genesis/14-SUBSCRIPTION-MODEL.md)
- [Genesis Customer Journey](../01-genesis/11-CUSTOMER-JOURNEY.md)
- [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

