# ADR-004: Adopt the Genesis Organization Hierarchy

## Status

Accepted

## Context

Workspace, Business, Business Unit, Department, and Branch represent different organizational concepts. Collapsing them would corrupt Business DNA ownership, authorization scope, and future multi-Business or multi-OS operation.

## Decision

The canonical hierarchy is Workspace → Business → Business Unit → Department/Branch. Every Business belongs to exactly one Workspace. Every Business Unit belongs to exactly one Business. Every Department and Branch belongs to exactly one Business Unit. A Department is not a Business Unit and does not replace the hierarchy.

## Consequences

- Schemas, APIs, navigation, permissions, and OS contracts preserve each identifier and relationship.
- Legacy models that use Business and Business Unit as synonyms require an explicit migration decision.
- Operating Systems operate on Business Units, not directly on Workspace.

## Alternatives Considered

- Collapse Business and Business Unit into one concept.
- Attach Branch directly to Workspace or Business.
- Use Department as a synonym for Business Unit or Division.

## Related Documents

- [Genesis Business DNA](../01-genesis/03-BUSINESS-DNA.md)
- [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md)
- [Approved Proposal — ADR-CP-002](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

