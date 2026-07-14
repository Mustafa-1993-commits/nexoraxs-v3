# Operating System Lifecycle

Version: 1.0

Status: Foundation

Owner: Nexoraxs

---

# Purpose

This document defines how every Operating System is designed, installed, activated, upgraded, integrated and retired inside Nexoraxs.

Every Operating System follows the same lifecycle regardless of business domain.

---

# Vision

Operating Systems are independent business applications.

They plug into the Nexoraxs Platform.

The platform should never depend on a specific Operating System.

Operating Systems depend on the platform.

---

# Definition

An Operating System (OS) is a complete business application responsible for one operational domain.

An Operating System operates on an operational Business Unit inside a Business.

Its subscription belongs to the Workspace.

Examples

Commerce OS

CRM OS

HR OS

Healthcare OS

Projects OS

Fleet OS

Manufacturing OS

Accounting OS

---

# Core Principles

Every Operating System must be:

Independent

Modular

Composable

Replaceable

Upgradeable

Tenant Safe

API Driven

Knowledge Driven

Business Brain Enabled

---

# Operating System Lifecycle

Available

↓

Recommended

↓

Selected and Subscribed

↓

Installed

↓

Configured

↓

Activated

↓

Operating System Ready

↓

Operational

↓

Extended

↓

Upgraded

↓

Paused

↓

Archived

↓

Removed

---

# Stage 1
## Available

The Operating System exists in Product Hub.

It is not installed.

Business Brain may recommend it.

---

# Stage 2
## Recommended

Business Brain determines that the OS adds measurable value.

The business improvement and required capabilities are recommended first.

The Operating System and plan are mapped as implementation options.

Recommendations include:

Business reason

Expected ROI

Estimated setup time

Dependencies

Required plan

---

# Stage 3
## Selected and Subscribed

The customer selects the Operating System and one canonical plan:

Starter / starter

Pro / pro

Business / business

Enterprise / enterprise

The selection creates the Workspace-level Operating System subscription.

Any active Operating System subscription includes the mandatory Core Platform entitlement during MVP.

---

# Stage 4
## Installed

The Workspace installs the Operating System.

Installation should complete automatically.

No manual technical setup.

---

# Stage 5
## Configured

Configuration is generated automatically from:

Business DNA of the selected Business

Knowledge Engine

Business Brain

Country Rules

Capabilities

The setup selects or creates the operational Business Unit inside the selected Business.

The customer may review and adjust the configuration.

---

# Stage 6
## Activated

The Operating System becomes available to users.

Permissions are assigned.

Menus appear.

Navigation updates automatically.

When subscription, installation, OS-specific setup, configuration, and activation are complete, the Operating System is Operating System Ready.

Operating System Ready is distinct from Core Workspace Ready.

---

# Stage 7
## Operational

Daily business activities begin.

The customer enters the Operational Dashboard.

Business Brain starts observing usage.

Recommendations improve continuously.

---

# Stage 8
## Extended

Customers install optional:

Capabilities

Knowledge Packs

Automation Packs

Dashboard Packs

AI Experts

Marketplace Extensions

Knowledge Pack content remains platform-wide, shared, immutable, and versioned.

Purchase, installation, and activation are scoped to the Workspace, while applicability may be scoped to the selected Business.

---

# Stage 9
## Upgraded

Customers move between plans.

Existing data is preserved.

Configuration remains intact.

No migration should be required.

---

# Stage 10
## Paused

Customers temporarily stop using an Operating System.

Data remains محفوظة.

Licensing changes.

Users lose access.

---

# Stage 11
## Archived

Historical data becomes read-only.

Reports remain available.

Audit history is preserved.

---

# Stage 12
## Removed

The Operating System is removed.

Platform integrity must remain intact.

Other Operating Systems continue working normally.

Historical records remain accessible according to retention policies.

---

# Shared Platform Services

Every Operating System consumes:

Authentication

Authorization

Workspace

Business Brain

Knowledge Engine

Notifications

Audit Logs

Marketplace

Billing

Storage

Search

AI Coordinator

Analytics

API Gateway

---

# Operating System Responsibilities

Each Operating System owns:

User Experience

Business Workflows

Business Data

Domain Logic

Reports

Dashboards

Menus

Settings

API Endpoints

---

# Operating System Never Owns

Authentication

Subscriptions

Knowledge

Business Brain

Capabilities

Marketplace

Billing

Identity

Workspace

---

# Integration Principles

Operating Systems communicate through platform services.

Never through direct database dependencies.

Every integration must be optional.

---

# Versioning

Every Operating System supports:

Independent Releases

Independent Upgrades

Backward Compatibility

Feature Flags

Migration Scripts

Rollback Strategy

---

# Success

Customers should feel:

"I can add or remove any Operating System without affecting the rest of my business."
