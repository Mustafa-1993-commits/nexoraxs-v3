# Nexoraxs Ontology

Version: 1.0

Status: Foundation

Owner: Nexoraxs

---

# Purpose

This document defines the official language of Nexoraxs.

Every document, specification, architecture decision, AI prompt, API, database schema, and user interface must use these definitions consistently.

A concept must have one meaning across the entire platform.

---

# Core Philosophy

Business concepts exist independently from software.

Software is built around business concepts.

Never redefine a concept inside an Operating System.

---

# Platform Concepts

## Workspace

The highest organizational boundary inside Nexoraxs.

A Workspace represents one customer account.

A Workspace owns:

- Businesses
- Users
- Subscriptions
- Settings
- Knowledge Context
- AI Context

---

## Business

A legal or operational organization that performs commercial or service activities.

A Workspace may own multiple Businesses.

Every Business belongs to exactly one Workspace.

Examples:

ABC Holding

XYZ Medical Group

Mustafa Retail Group

---

## Business Unit

A logical operating division inside a Business.

Examples:

Retail

Manufacturing

Healthcare

Wholesale

Projects

Business Units own operational data.

Every Business Unit belongs to exactly one Business.

---

## Department

An internal organizational subdivision.

A Department organizes people or responsibilities inside a Business Unit.

A Department is not a Business Unit.

A Department does not replace the Workspace → Business → Business Unit → Branch operational hierarchy.

---

## Branch

A physical or virtual operating location.

Examples:

Alexandria Branch

Online Store

Warehouse #3

Branches belong to Business Units.

Every Branch belongs to exactly one Business Unit.

---

## Business DNA

The digital identity of one Business.

It describes how the business operates.

Business DNA never describes software.

Every Business owns its own Business DNA.

A Workspace may aggregate intelligence across the Business DNA of multiple Businesses.

Workspace-level aggregation never replaces or merges individual Business DNA.

---

## Core Business DNA

The minimum Business DNA required to generate initial recommendations for one Business.

Core Business DNA is part of that Business's Business DNA.

It is not Workspace DNA and it is not shared between Businesses.

---

## Capability

A reusable business function.

Examples:

Inventory

Customer Relationship Management

Payroll

Delivery

Financial Accounting

Workforce Management

Commerce Operations

Capabilities are platform assets.

Operating Systems consume capabilities.

---

## Operating System (OS)

A business application focused on one operational domain.

Examples:

Commerce OS

HR OS

CRM OS

Healthcare OS

Fleet OS

Projects OS

Operating Systems remain independent.

Canonical Operating System to Capability mappings:

Commerce OS

→ Commerce Operations

CRM OS

→ Customer Relationship Management

HR OS

→ Workforce Management

Accounting OS

→ Financial Accounting

An Operating System is an implementation option for one or more capabilities.

An Operating System never redefines a capability.

---

## Module

A functional area inside an Operating System.

Examples:

Products

Sales

Inventory

Purchasing

Reports

Modules are implementation details.

Capabilities remain platform concepts.

---

## Knowledge

Structured business expertise.

Knowledge includes:

Rules

Best Practices

Workflows

KPIs

Compliance

Terminology

Recommendations

Knowledge belongs to the platform.

Published knowledge versions are shared and immutable.

Workspace or Business applicability does not duplicate or transfer ownership of Knowledge.

---

## Business Brain

The platform decision engine.

Business Brain interprets Business DNA.

Business Brain never owns knowledge.

---

## Recommendation

A business suggestion generated from:

Business DNA

Knowledge

Rules

Analytics

Recommendations are always explainable.

Recommendations identify business improvements and capabilities first.

Operating Systems, plans, and Marketplace assets may be mapped as implementation options.

---

## Rules Engine

The deterministic engine responsible for applying business rules.

Rules are versioned.

Rules are explainable.

Rules are platform-wide.

---

## Configuration Engine

Transforms recommendations into software configuration.

It configures platform and Operating System behavior automatically after the required Workspace, Business, and Business Unit context exists.

---

## Core Workspace Ready

The state reached when Workspace creation, Business identity, Core Business DNA, and initial recommendations are complete.

Core Workspace Ready allows the customer to enter Product Hub.

It does not mean that an Operating System is ready for daily operations.

---

## Operating System Ready

The state reached when the selected Operating System has an active plan, an operational Business Unit, completed OS-specific setup, configuration, and activation.

Operating System Ready allows the customer to enter the Operational Dashboard.

---

## AI Coordinator

The platform component responsible for selecting the appropriate AI Expert.

Customers never choose experts.

The platform does.

---

## AI Expert

A specialized AI assistant focused on one business domain.

Examples:

Retail Expert

Restaurant Expert

Manufacturing Expert

Healthcare Expert

Construction Expert

HR Expert

Finance Expert

Experts consume knowledge.

Experts never own knowledge.

---

## Marketplace

The distribution platform for:

Operating Systems

Knowledge Packs

Capability Packs

Templates

Dashboards

Automation Packs

AI Experts

Marketplace assets are platform-wide, shared, immutable, and versioned.

Purchase, installation, and activation belong to a Workspace.

Applicability may be limited to a specific Business.

These scoped states never duplicate or modify the Marketplace asset.

---

## Knowledge Pack

A platform-wide, shared, immutable, and versioned Knowledge asset.

A Workspace may purchase, install, and activate a Knowledge Pack.

An activated Knowledge Pack may apply to the entire Workspace or to a specific Business.

Updating a Knowledge Pack selects a new immutable version.

Removing it from a Workspace or Business removes scoped activation or installation only.

The platform asset and its historical versions remain preserved.

---

## Business Stage

Represents organizational maturity.

Startup

Growing

Scaling

Enterprise

Recommendations change based on Business Stage.

---

## Industry

Describes what a business does.

Industries are combinations of capabilities.

Industries are not software.

---

## Customer Journey

The complete lifecycle from account creation to business growth.

The platform continuously guides customers throughout this journey.

---

# Naming Rules

Every concept must have exactly one official name.

Avoid synonyms.

Examples

Correct

Business Unit

Incorrect

Division

Company Section

---

Correct

Operating System

Incorrect

Application

Program

Software

---

Correct

Capability

Incorrect

Feature

Module

Function

---

Correct Operating System name

CRM OS

Correct capability name

Customer Relationship Management

Incorrect

CRM when the intended concept is not explicitly identified

---

# Golden Rule

If two people define the same concept differently,

the ontology is incomplete.

Update the ontology before writing code.
