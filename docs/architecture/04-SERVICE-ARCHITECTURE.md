# Service Architecture

Version: 1.0

Status: Foundation

Owner: Nexoraxs

---

# Purpose

This document defines the service architecture of Nexoraxs.

A Service represents a business responsibility.

Services own business capabilities, business rules, and orchestration.

Services never own user interfaces.

Services communicate through contracts.

---

# Service Philosophy

Services are organized around business domains.

Not around database tables.

Each service has:

- One responsibility
- One owner
- One public contract
- One lifecycle

---

# Platform Service Layers

```text
Presentation Layer
        ↓
Application Services
        ↓
Domain Services
        ↓
Infrastructure Services
        ↓
Persistence
```

---

# Core Platform Services

## Authentication Service

Responsible for:

- Login
- Registration
- Sessions
- MFA
- Password Reset
- Identity Verification

Owns:

Authentication only.

Never owns business logic.

---

## Workspace Service

Responsible for:

- Workspace creation
- Workspace settings
- Workspace lifecycle
- Workspace defaults

Owns:

Workspace entity.

---

## Business Service

Responsible for:

- Business creation
- Business identity
- Business configuration
- Business lifecycle

Owns:

BusinessUnit.

---

## Branch Service

Responsible for:

- Branch creation
- Main Branch validation
- Branch lifecycle

Owns:

Branch entity.

---

## Membership Service

Responsible for:

- Team members
- Invitations
- Roles
- Permissions
- Workspace access

---

## Billing Service

Responsible for:

- Plans
- Billing
- Invoices
- Renewals
- Payments
- Trials

Owns:

OSSubscription.

---

## Enablement Service

Responsible for:

- OSEnablement
- Setup state
- Activation
- Upgrade readiness

Never owns billing.

---

## Product Hub Service

Responsible for:

- Product catalog
- OS discovery
- Launch routing
- Recommendation display

Never owns OS setup.

---

# Intelligence Services

## Knowledge Service

Responsible for:

- Business knowledge
- Rules
- KPIs
- Terminology
- Compliance
- Templates

Single Source of Truth.

---

## Rules Service

Responsible for:

- Deterministic rules
- Validation
- Policies
- Country rules

Never owns AI.

---

## Business Brain Service

Responsible for:

- Business understanding
- Capability selection
- Business interpretation

Consumes Knowledge.

---

## Recommendation Service

Responsible for:

- Recommendations
- Priorities
- Explainability
- Suggested improvements

Never changes data directly.

---

## Configuration Service

Responsible for:

- Initial setup
- Workspace configuration
- Default generation
- Preset application

---

## AI Coordinator Service

Responsible for:

- Expert selection
- Context assembly
- Prompt orchestration
- AI routing

Never owns business knowledge.

---

# Platform Utility Services

## Notification Service

Responsible for:

- Email
- SMS
- Push
- In-App notifications

---

## Localization Service

Responsible for:

- Languages
- RTL/LTR
- Formatting
- Translation

---

## Audit Service

Responsible for:

- Audit logs
- Change history
- Security logs

Never deletes records.

---

## File Service

Responsible for:

- Uploads
- Storage
- Versioning
- Attachments

---

# Operating System Services

Every OS owns its own services.

Example:

Commerce OS

- Product Service
- Inventory Service
- Sales Service
- POS Service
- Customer Service
- Supplier Service
- Reporting Service

HR OS

- Employee Service
- Payroll Service
- Attendance Service

CRM OS

- Lead Service
- Opportunity Service
- Campaign Service

---

# Communication Rules

Services communicate through contracts.

Never through database access.

Good

Business Service

↓

Recommendation Service

↓

Configuration Service

Bad

Commerce Service

↓

Directly updates Workspace database.

---

# Dependency Rules

Presentation

↓

Application

↓

Domain

↓

Infrastructure

Never reverse dependencies.

---

# Service Ownership

Each service owns exactly one domain.

No service should own another service's data.

Cross-service communication happens through public interfaces.

---

# Future Evolution

Services may later become independent deployable components.

The architecture must support this transition without changing business boundaries.

---

# Golden Rules

One Service.

One Responsibility.

One Owner.

One Public Contract.

Never duplicate business logic.

Never bypass service boundaries.

---

# Success

The Service Architecture succeeds when:

Every business capability has one service owner.

Every service has one responsibility.

Every service communicates through well-defined contracts.