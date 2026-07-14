# ADR-024: Operating Systems Are Independent Domain Owners

## Status

Accepted

## Context

Nexoraxs must support multiple operational domains without becoming a giant ERP monolith or forcing one OS to depend on another.

## Decision

Every Operating System is a complete, independent business application for one operational domain. It owns its UI, setup, workflows, domain model, operational data, reports, dashboards, menus, settings, endpoints, and release lifecycle. It consumes shared Core services but does not own platform identity, subscriptions, Knowledge, Capabilities, Marketplace, billing, Business Brain, or Workspace.

## Consequences

- An OS can be installed, paused, archived, or removed without breaking another OS.
- Operational domain logic stays outside Core.
- Lightweight operational roles cannot require another OS such as HR.

## Alternatives Considered

- Build all domains as modules in one giant ERP.
- Place operational workflows in Core Platform.
- Require one OS to complete another OS's core workflow.

## Related Documents

- [Genesis Constitution](../01-genesis/02-CONSTITUTION.md)
- [Genesis Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md)
- [Genesis Operating System Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)

