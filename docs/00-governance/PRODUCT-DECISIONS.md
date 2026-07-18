# NexoraXS Product Decisions

**Document Type:** Product governance baseline  
**Status:** Active  
**Scope:** NexoraXS Core Platform and current Operating Systems  
**Last Updated:** 2026-07-19

## 1. Purpose

This document records approved product-direction decisions that must remain stable across design, specification, implementation, review, and future backend integration.

It complements Architecture Decision Records. ADRs govern architectural choices; this file governs the intended product experience and delivery direction.

## 2. Approved Product Decisions

### PD-001 — Frontend First

NexoraXS follows a frontend-first delivery policy.

The user experience, journeys, screens, states, navigation, accessibility, localization behavior, and frontend application boundaries must reach production-level maturity before canonical backend implementation begins.

Frontend First does not mean prototype-only code. The frontend must remain structured so local or in-memory implementations can later be replaced by remote implementations without redesigning pages or user journeys.

### PD-002 — Platform Before Operating System

Users enter and understand the NexoraXS Platform before entering Commerce or another Operating System.

The Core Platform owns the shared product experience, including workspace context, business identity, membership, access, platform navigation, subscription presentation, Product Hub, and cross-product entry.

Operating Systems remain separate product experiences reached through explicit platform navigation and handoff boundaries.

### PD-003 — Business Architect Is the Primary Onboarding Experience

Traditional setup forms alone are not the primary onboarding model.

The Business Architect guides the user through structured discovery, evidence collection, intelligent questions, review, and business analysis before the workspace is considered ready.

The experience must feel like a guided business consultation rather than a technical configuration wizard.

### PD-004 — Business Blueprint Is the Main Onboarding Outcome

The customer-facing outcome of the Business Architect is the **Business Blueprint**.

For product experience purposes:

```text
Business Blueprint =
Business DNA
+ Business Analysis
+ Identified Needs and Risks
+ Recommended NexoraXS Systems
+ Suggested Implementation Roadmap
+ Readiness Summary
```

Business DNA remains the structured internal representation. The Business Blueprint is the understandable, visual, customer-facing presentation of that analysis.

### PD-005 — Recommendations Precede Plan Selection

The platform should understand the business before asking the user to make a final package or product decision.

The preferred sequence is:

```text
Business Discovery
→ Business Blueprint
→ Recommendations
→ Plan or Product Selection
→ Workspace Activation
```

Commercial prompts must not interrupt the discovery experience unnecessarily. Pricing and plan selection should be contextual and supported by the findings of the Business Architect.

### PD-006 — One Coherent Platform Experience

Authentication, onboarding, workspace setup, Business Architect, Product Hub, billing presentation, account settings, notifications, and shared platform navigation must feel like one coherent NexoraXS product.

Individual Operating Systems may have specialized workflows and information architecture, but must retain consistent brand language, navigation principles, accessibility standards, localization behavior, and transition patterns.

### PD-007 — Core Platform and Commerce Boundary Is Established

The separation between Core Platform and Commerce is considered an established implementation baseline, not a new product task.

Core owns platform and organization context. Commerce owns Commerce operational behavior and persistence. Core may consume approved read-only projections and initiate explicit handoffs, but must not become a Commerce operational writer.

Future frontend work must preserve and verify the existing boundary rather than redesign or reimplement it.

### PD-008 — Incremental Reconciliation, Not Rewrite

The existing frontend must not be rewritten solely to achieve architectural purity.

Misaligned legacy areas are corrected incrementally when their flows are actively developed or when they create a material product, reliability, security, or maintainability risk.

Every reconciliation must preserve established user-visible behavior unless a separately approved product change explicitly replaces it.

### PD-009 — Backend Integration Comes After Frontend Maturity

The Laravel backend will be introduced after the relevant frontend journeys, application services, ports, states, and contracts are sufficiently mature.

The intended replacement path is:

```text
Page / Component
→ Feature Hook
→ Application Service
→ Application Port
→ Local or Memory Implementation (current)
→ Remote HTTP Implementation (later)
→ Laravel API
```

Backend integration must not force page-level rewrites or allow UI components to depend directly on transport details.

### PD-010 — Global Localization Is a Product Requirement

NexoraXS is intended to support global languages rather than a fixed Arabic/English-only model.

The product experience must account for:

- language and locale as separate concepts;
- LTR and RTL direction;
- translated navigation, validation, loading, empty, error, retry, pending, and success states;
- user preference, workspace default, browser preference, and platform fallback;
- locale-aware dates, numbers, currency, and formatting;
- layouts that remain usable with longer translated text.

Detailed architecture remains governed by the localization ADR and its approval status, but new UI must not introduce assumptions that block multilingual support.

### PD-011 — Production-Level UI Includes All States

A screen is not complete when only its ideal populated state is designed.

Each applicable screen or flow must define and implement:

- loading;
- empty;
- first-use guidance;
- validation;
- recoverable error and retry;
- unavailable or permission-denied;
- pending or processing;
- success and confirmation;
- responsive behavior;
- keyboard and assistive-technology behavior;
- localized LTR and RTL behavior.

### PD-012 — Small UI Changes May Use a Lightweight Process

The full governed development lifecycle is required for features, business behavior, shared contracts, architecture boundaries, and meaningful workflow changes.

Small visual corrections that do not change behavior, ownership, contracts, routes, persistence, authorization, or workflow may use a lightweight implementation and review path.

A change must move to the full lifecycle whenever its impact is uncertain.

## 3. Current Priority Journey

The current product-experience priority is:

```text
Register
→ Verify Identity or Email
→ Create or Resolve Workspace
→ Business Architect Welcome
→ Business Discovery Interview
→ Review Answers
→ Analysis
→ Business Blueprint
→ Recommendations
→ Platform Dashboard / Product Hub
```

This journey should be documented, mapped to screens, compared with the current frontend, and completed before expanding unrelated product areas.

## 4. Explicitly Deferred Decisions

The following topics are intentionally outside this baseline until separately requested and approved:

- the future product position or architecture of EasyCar;
- canonical Laravel HTTP endpoints and DTOs;
- final backend authorization and transport policies;
- final commercial package names and prices;
- backend synchronization and offline policy;
- redesign of the established Core Platform–Commerce boundary.

Deferred items must not block current product-experience work and must not be decided implicitly by implementation agents.

## 5. Change Control

A product decision in this document may be changed only through an explicit product review.

Any proposed change must state:

1. the decision being replaced;
2. the user or business problem motivating the change;
3. affected journeys and screens;
4. architecture or implementation impact;
5. migration and compatibility impact;
6. the approved replacement decision.

Implementation convenience alone is not sufficient reason to change an approved product decision.
