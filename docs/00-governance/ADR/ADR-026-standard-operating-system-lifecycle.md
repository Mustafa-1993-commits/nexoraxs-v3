# ADR-026: Every Operating System Follows the Standard Lifecycle

## Status

Accepted

## Context

The platform needs consistent product, commercial, setup, operational, and retirement semantics across every independent OS.

## Decision

Every OS follows the Genesis lifecycle: Available → Recommended → Selected and Subscribed → Installed → Configured → Activated → Operating System Ready → Operational → Extended → Upgraded → Paused → Archived → Removed. Individual lifecycle concepts remain distinct and are coordinated through stable contracts.

## Consequences

- Product Hub can project consistent state across different OSs.
- Pause, archive, and removal preserve data and audit according to policy.
- An OS may release independently while honoring shared lifecycle contracts.

## Alternatives Considered

- Define unrelated lifecycle semantics for each OS.
- Collapse installation, setup, configuration, activation, and operation.
- Delete all historical records when an OS is removed.

## Related Documents

- [Genesis Operating System Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)
- [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)
- [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

