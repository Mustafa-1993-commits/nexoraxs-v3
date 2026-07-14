# ADR-031: AI Experts Are Coordinated Into One Platform Response

## Status

Accepted

## Context

Customers need specialized expertise without having to understand, select, or reconcile a collection of individual AI agents.

## Decision

The AI Coordinator selects appropriate specialized AI Experts, coordinates collaboration, resolves or exposes conflicts through evidence, and returns one unified Nexoraxs response. Customers interact with Nexoraxs rather than manually choosing experts.

## Consequences

- Expert definitions remain specialized and versioned.
- Multi-expert collaboration preserves one customer experience.
- Conflicting or low-confidence output is not silently converted into truth.

## Alternatives Considered

- Expose every expert as a separate customer chatbot.
- Require customers to select technical or domain experts manually.
- Return multiple competing answers without synthesis.

## Related Documents

- [Genesis AI Strategy](../01-genesis/08-AI-STRATEGY.md)
- [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

