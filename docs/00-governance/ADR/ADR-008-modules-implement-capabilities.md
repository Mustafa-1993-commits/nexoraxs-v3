# ADR-008: Modules Are Operating System Implementation Details

## Status

Accepted

## Context

Capabilities and Modules can appear similar but serve different architectural roles. Treating them as synonyms would transfer platform concepts into OS ownership.

## Decision

A Capability is a platform-owned business function. A Module is a functional area inside an Operating System and is owned by that OS. An OS may map Modules to Capabilities but may not redefine or own the Capability.

## Consequences

- Capability identifiers remain stable across Operating Systems.
- Module lifecycle and navigation remain OS-owned.
- The platform can map more than one implementation option to the same Capability.

## Alternatives Considered

- Use Capability and Module interchangeably.
- Make Modules platform-wide business concepts.
- Let each OS define incompatible versions of the same Capability.

## Related Documents

- [Genesis Capabilities Model](../01-genesis/04-CAPABILITIES.md)
- [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md)
- [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

