# Execution Scope Decision

## Decision

EasyCar is an independent application. It is not a module, bounded context, future feature, or delivery stream within the current NexoraXS Core + Commerce implementation plan.

## Effective Scope

The active execution scope contains only the confirmed NexoraXS Core Platform, Commerce OS, Landing/Marketing, shared platform packages, backend runtime, identity, tenancy, authorization, infrastructure, observability, migration, and production-readiness work already defined for those products.

## Removed from Current Execution Plan

The following entries are withdrawn from the current roadmap and backlog:

- F088 — EasyCar Domain Foundation
- F089 — EasyCar Workflow, Delegation, Insurance and Vehicle Change
- F090 — EasyCar Portal, Documents, Reservations, Deposits and Bank Integration
- EasyCar Product Discovery workstream
- EasyCar milestones, dependencies, release targets, quality gates, and product decisions
- Dealer, Finance, and Broker product-domain decisions where they exist solely for EasyCar

## Architecture Boundary

EasyCar must be planned separately. It may later consume approved shared platform capabilities through explicit contracts, such as identity, workspace/tenant membership, permissions, plans/entitlements, audit, files, notifications, UI packages, and API contracts. Such reuse does not place EasyCar inside the Core + Commerce delivery plan.

## Governance Rule

Any future EasyCar work requires a separate approved architecture audit, product scope, ADR set, feature catalog, specification catalog, delivery roadmap, implementation backlog, and release plan.

## Precedence

This decision overrides any remaining EasyCar references in Stages 4 and 5. Historical observations in Stages 1–3 remain unchanged as audit evidence.
