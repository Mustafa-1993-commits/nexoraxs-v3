# ADR-040: Core Owns Organization Identity and Operating Systems Own Operational Data

## Status

Accepted

## Context

Independent OSs need shared identifiers for Business Units, Departments, and Branches, but Core must not absorb OS operational attributes or workflows.

## Decision

Core Organization Registry owns canonical Business Unit, Department, and Branch identities and parent relationships. The applicable OS owns operational records, behavior, and domain configuration scoped to those identifiers. OS-specific setup selects or creates the operational Business Unit through a future approved Core contract without transferring domain ownership.

## Consequences

- All products reference one organization graph.
- Core stores identity and relationships only, not OS behavior.
- The exact organization write protocol remains an approved open question and is not decided here.

## Alternatives Considered

- Let each OS create incompatible canonical organization identities.
- Store OS operational configuration in Core organization records.
- Let Core own all operational data because it owns the identifiers.

## Related Documents

- [Genesis Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md)
- [Genesis Operating System Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)
- [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)
- [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

