# ADR-003: Workspace Is the Customer and Tenant Boundary

## Status

Accepted

## Context

The platform must support one customer managing one or many distinct Businesses without treating a Workspace as a company, industry, or Operating System.

## Decision

A Workspace represents one customer account and is the highest organizational and tenant boundary. A Workspace may own multiple Businesses, Users through Workspace Memberships, subscriptions, settings, Marketplace scoped state, Knowledge context, AI context, audit, notifications, billing, storage, and API context. Workspace types based on industry or software are prohibited.

## Consequences

- A newly created Workspace may exist before its first Business is created.
- Multi-Business growth does not require a new tenant model.
- Business-specific identity and Business DNA remain below Workspace.

## Alternatives Considered

- Model Workspace as a company or Business.
- Create RestaurantWorkspace, PharmacyWorkspace, or other typed Workspaces.
- Require one Workspace per Business or per Operating System.

## Related Documents

- [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md)
- [Genesis Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md)
- [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

