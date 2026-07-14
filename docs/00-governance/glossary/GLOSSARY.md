# Nexoraxs Canonical Glossary

Version: 1.0  
Status: Architectural Governance Foundation  
Authority: Genesis v1.1, approved Core Platform Architecture Proposal v0.2, and Core Platform Wave 1  
Owner: Nexoraxs

---

## Purpose

This glossary records canonical concepts already defined by the authoritative architecture. It does not create concepts, introduce synonyms, resolve open questions, or replace source definitions.

## Usage Rules

- Use the exact canonical Name when referring to a concept.
- Do not substitute a related concept merely because its label sounds similar.
- Owner identifies canonical architectural ownership, not every consumer.
- Scope identifies where the concept applies or is instantiated.
- Source Documents remain authoritative if a summary here is incomplete.
- A concept that is ambiguous in the approved sources is listed under **Ambiguities Preserved** and is not redefined.

## Canonical Concepts

### Nexoraxs Platform

- **Name:** Nexoraxs Platform
- **Definition:** The unified Business Operating Intelligence Platform composed of Core Platform, independent Operating Systems, Marketplace, Knowledge, intelligence, and AI.
- **Owner:** Nexoraxs
- **Scope:** Platform
- **Related Concepts:** Core Platform; Operating System; Marketplace; Business Brain
- **Source Documents:** [Genesis Vision](../01-genesis/01-VISION.md); [Genesis Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md); [Genesis Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

### Core Platform

- **Name:** Core Platform
- **Definition:** The shared control, organizational, commercial, governance, and intelligence foundation of Nexoraxs.
- **Owner:** Nexoraxs Core Platform
- **Scope:** Platform
- **Related Concepts:** Workspace; Business DNA; Product Hub; Marketplace; AI Coordinator
- **Source Documents:** [Genesis Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### User

- **Name:** User
- **Definition:** The Core login identity of a person who authenticates to Nexoraxs.
- **Owner:** Core Identity and Access
- **Scope:** Platform/User
- **Related Concepts:** Workspace Membership; Authorization Context
- **Source Documents:** [Genesis Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Workspace Membership

- **Name:** Workspace Membership
- **Definition:** The relationship that grants a User participation in one Workspace and forms the basis for roles and scoped access.
- **Owner:** Core Identity and Access
- **Scope:** Workspace
- **Related Concepts:** User; Workspace; Permission; Authorization Context
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Permission

- **Name:** Permission
- **Definition:** A named authorization grant evaluated at its applicable Workspace, Business, Business Unit, Department, Branch, OS, resource, or action scope.
- **Owner:** Core Identity and Access
- **Scope:** Declared resource scope
- **Related Concepts:** Workspace Membership; Authorization Context; Operating System
- **Source Documents:** [Genesis Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Authorization Context

- **Name:** Authorization Context
- **Definition:** The resolved actor, tenant, organizational, OS, resource, permission, entitlement, and lifecycle context used for an authorization decision.
- **Owner:** Core Identity and Access plus owning domain
- **Scope:** Protected operation
- **Related Concepts:** User; Workspace; Permission; Workspace Entitlement
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Workspace

- **Name:** Workspace
- **Definition:** One customer account and the highest organizational and tenant boundary in Nexoraxs.
- **Owner:** Core Workspace Management
- **Scope:** Workspace
- **Related Concepts:** Business; Workspace Membership; Workspace Entitlement; OS Subscription
- **Source Documents:** [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Business

- **Name:** Business
- **Definition:** A legal or operational organization inside one Workspace that performs commercial or service activities.
- **Owner:** Core Business Registry
- **Scope:** Business
- **Related Concepts:** Workspace; Business DNA; Business Unit
- **Source Documents:** [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Business DNA](../01-genesis/03-BUSINESS-DNA.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Business Unit

- **Name:** Business Unit
- **Definition:** A logical operating division inside one Business on which Operating Systems operate.
- **Owner:** Core Organization Registry for identity; applicable OS for operational data
- **Scope:** Business
- **Related Concepts:** Business; Department; Branch; Operating System
- **Source Documents:** [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Department

- **Name:** Department
- **Definition:** An internal organizational subdivision that organizes people or responsibilities inside one Business Unit.
- **Owner:** Core Organization Registry
- **Scope:** Business Unit
- **Related Concepts:** Business Unit; Branch
- **Source Documents:** [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Branch

- **Name:** Branch
- **Definition:** A physical or virtual operating location that belongs to exactly one Business Unit.
- **Owner:** Core Organization Registry for identity; applicable OS for operational data
- **Scope:** Business Unit
- **Related Concepts:** Business Unit; Department; Operating System
- **Source Documents:** [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Business DNA

- **Name:** Business DNA
- **Definition:** The digital identity of one Business describing how it operates and never which software it uses.
- **Owner:** Core Business DNA Registry
- **Scope:** Exactly one Business
- **Related Concepts:** Business; Core Business DNA; Business DNA Snapshot; Capability
- **Source Documents:** [Genesis Business DNA](../01-genesis/03-BUSINESS-DNA.md); [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Business DNA Identity

- **Name:** Business DNA Identity
- **Definition:** The stable identity of one Business's Business DNA across its version history.
- **Owner:** Core Business DNA Registry
- **Scope:** Business
- **Related Concepts:** Business DNA; Business DNA Snapshot
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Core Business DNA

- **Name:** Core Business DNA
- **Definition:** The minimum part of one Business's Business DNA required to generate initial Recommendations.
- **Owner:** Core Business DNA Registry
- **Scope:** Business
- **Related Concepts:** Business DNA; Core Workspace Ready; Business Architect Pipeline
- **Source Documents:** [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Customer Journey](../01-genesis/11-CUSTOMER-JOURNEY.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Business DNA Snapshot

- **Name:** Business DNA Snapshot
- **Definition:** A published, versioned view of one Business DNA identity at a point in time.
- **Owner:** Core Business DNA Registry
- **Scope:** Business
- **Related Concepts:** Business DNA Identity; Business DNA Fact; Provenance
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Business DNA Fact

- **Name:** Business DNA Fact
- **Definition:** A structured statement about one Business stored as part of its Business DNA.
- **Owner:** Core Business DNA Registry
- **Scope:** Business
- **Related Concepts:** Candidate Fact; Provenance; Business DNA Snapshot
- **Source Documents:** [Genesis Business DNA](../01-genesis/03-BUSINESS-DNA.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Provenance

- **Name:** Provenance
- **Definition:** The source, actor, time, confidence, assumptions, evidence, and transformation history that explains a fact or decision input.
- **Owner:** Owning Core domain
- **Scope:** Fact or decision record
- **Related Concepts:** Business DNA Fact; Recommendation; Rule; AI Interaction
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Workspace Intelligence Aggregation

- **Name:** Workspace Intelligence Aggregation
- **Definition:** An explicit, non-destructive projection over selected Business DNA identities for Workspace-level analysis.
- **Owner:** Core intelligence projection
- **Scope:** Workspace over an explicit Business set
- **Related Concepts:** Workspace; Business DNA; Product Hub
- **Source Documents:** [Genesis Business DNA](../01-genesis/03-BUSINESS-DNA.md); [Genesis Product Hub](../01-genesis/13-PRODUCT-HUB.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Business Architect

- **Name:** Business Architect
- **Definition:** The Core Platform experience that conducts a natural conversation about one selected Business and builds Core Business DNA.
- **Owner:** Core Business Architect
- **Scope:** Business
- **Related Concepts:** Business Architect Pipeline; Core Business DNA; Customer Journey
- **Source Documents:** [Genesis Customer Journey](../01-genesis/11-CUSTOMER-JOURNEY.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Business Architect Pipeline

- **Name:** Business Architect Pipeline
- **Definition:** The resumable governed flow from authorized Business context through evidence, inference, questions, validation, review, DNA publication, analysis, and readiness.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Business Architect; Business DNA Snapshot; Core Workspace Ready
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Business Architect Session

- **Name:** Business Architect Session
- **Definition:** One resumable execution of the Business Architect Pipeline for one Workspace, one Business, and one initiating actor.
- **Owner:** Core Business Architect
- **Scope:** Business
- **Related Concepts:** Pipeline State Store; Candidate Fact; Review Checkpoint
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Candidate Fact

- **Name:** Candidate Fact
- **Definition:** A customer-provided, normalized, imported, or inferred Business fact that has not yet become published Business DNA.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Business DNA Fact; Provenance; Review Checkpoint
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Review Checkpoint

- **Name:** Review Checkpoint
- **Definition:** The pipeline stage that presents material facts, inferences, conflicts, and assumptions for customer correction or confirmation.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Candidate Fact; DNA Publisher
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Session Orchestrator

- **Name:** Session Orchestrator
- **Definition:** The Business Architect component that creates, resumes, expires, and completes a session for one Workspace and Business.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Pipeline State Store; Business Architect Pipeline
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Context Resolver

- **Name:** Context Resolver
- **Definition:** The component that loads authorized Workspace, Business, locale, existing DNA, prior answers, Knowledge, and Rule context for the pipeline.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Authorization Context; Knowledge; Rule
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Evidence Collector

- **Name:** Evidence Collector
- **Definition:** The Business Architect component that collects customer answers and permitted existing or imported evidence.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Candidate Fact; Provenance
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Inference Service

- **Name:** Inference Service
- **Definition:** The Business Architect component that proposes facts reasonably inferred from authorized evidence and records confidence and assumptions.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Candidate Fact; Provenance; Question Planner
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Question Planner

- **Name:** Question Planner
- **Definition:** The Business Architect component that selects the smallest useful next question based on missing or uncertain Core Business DNA.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Inference Service; Conversation Adapter; Core Business DNA
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Conversation Adapter

- **Name:** Conversation Adapter
- **Definition:** The Business Architect component that presents localized conversational interaction while preserving structured canonical identifiers.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Question Planner; Answer Normalizer
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Answer Normalizer

- **Name:** Answer Normalizer
- **Definition:** The Business Architect component that retains raw answers and produces typed Candidate Facts.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Conversation Adapter; Candidate Fact; Provenance Registry
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Provenance Registry

- **Name:** Provenance Registry
- **Definition:** The Business Architect component that records source type, evidence, actor, time, confidence, and transformation history for Candidate Facts.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Provenance; Candidate Fact
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### DNA Assembler and Validator

- **Name:** DNA Assembler and Validator
- **Definition:** The component that builds candidate Core Business DNA and applies schema, ontology, Rule, and cross-field validation.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Core Business DNA; Rule; Review Checkpoint
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### DNA Publisher

- **Name:** DNA Publisher
- **Definition:** The component that publishes the next Business DNA Snapshot without changing Knowledge or software configuration.
- **Owner:** Core Business DNA Registry
- **Scope:** Business
- **Related Concepts:** Business DNA Snapshot; Analysis Trigger
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Analysis Trigger

- **Name:** Analysis Trigger
- **Definition:** The component that invokes Business Brain, Recommendation Engine, and Readiness Service against the published input versions.
- **Owner:** Core Business Architect orchestration
- **Scope:** Published Business DNA Snapshot
- **Related Concepts:** Business Brain; Recommendation Engine; Readiness Service
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Pipeline State Store

- **Name:** Pipeline State Store
- **Definition:** The store of Business Architect stage, checkpoints, outstanding questions, recoverable errors, expiry, and idempotency outside published Business DNA.
- **Owner:** Core Business Architect
- **Scope:** Business Architect Session
- **Related Concepts:** Session Orchestrator; Review Checkpoint
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Industry

- **Name:** Industry
- **Definition:** A description of what a Business does; industries are combinations of Capabilities and are not software.
- **Owner:** Nexoraxs Platform ontology
- **Scope:** Platform taxonomy and Business DNA
- **Related Concepts:** Capability; Business DNA; Knowledge
- **Source Documents:** [Genesis Business DNA](../01-genesis/03-BUSINESS-DNA.md); [Genesis Capabilities](../01-genesis/04-CAPABILITIES.md); [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md)

### Business Stage

- **Name:** Business Stage
- **Definition:** The maturity state of a Business used to adapt Recommendations, including Startup, Growing, Scaling, and Enterprise in Business DNA.
- **Owner:** Business
- **Scope:** Business
- **Related Concepts:** Business DNA; Business Lifecycle; Recommendation
- **Source Documents:** [Genesis Business DNA](../01-genesis/03-BUSINESS-DNA.md); [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Business Lifecycle](../01-genesis/15-BUSINESS-LIFECYCLE.md)

### Business Lifecycle

- **Name:** Business Lifecycle
- **Definition:** The Genesis progression through Business Idea, Launch, Operate, Grow, Scale, Expand, Enterprise, and Global.
- **Owner:** Business; interpreted by Business Brain
- **Scope:** Business
- **Related Concepts:** Business Stage; Recommendation; Customer Journey
- **Source Documents:** [Genesis Business Lifecycle](../01-genesis/15-BUSINESS-LIFECYCLE.md); [Genesis Business Brain](../01-genesis/06-BUSINESS-BRAIN.md)

### Capability

- **Name:** Capability
- **Definition:** A reusable, independent, configurable, composable, platform-wide business function describing what a Business needs.
- **Owner:** Core Capability Registry
- **Scope:** Platform
- **Related Concepts:** Industry; Module; Operating System; Recommendation
- **Source Documents:** [Genesis Capabilities](../01-genesis/04-CAPABILITIES.md); [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Capability Registry

- **Name:** Capability Registry
- **Definition:** The Core component that maintains canonical, versioned Capability definitions and metadata.
- **Owner:** Core Platform
- **Scope:** Platform
- **Related Concepts:** Capability; Business Brain; Product and Plan Catalog
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Module

- **Name:** Module
- **Definition:** A functional area inside an Operating System and an implementation detail of that OS.
- **Owner:** Owning Operating System
- **Scope:** Operating System
- **Related Concepts:** Capability; Operating System
- **Source Documents:** [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis OS Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Knowledge

- **Name:** Knowledge
- **Definition:** Structured business expertise including Rules, workflows, KPIs, compliance, terminology, Recommendations, and best practices.
- **Owner:** Nexoraxs Platform
- **Scope:** Platform with applicability context
- **Related Concepts:** Knowledge Object; Knowledge Engine; Knowledge Pack
- **Source Documents:** [Genesis Knowledge Engine](../01-genesis/05-KNOWLEDGE-ENGINE.md); [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md)

### Knowledge Object

- **Name:** Knowledge Object
- **Definition:** One structured, sourced, versioned unit of platform Knowledge.
- **Owner:** Knowledge Engine
- **Scope:** Platform/versioned applicability
- **Related Concepts:** Knowledge; Rule; Knowledge Pack
- **Source Documents:** [Genesis Knowledge Engine](../01-genesis/05-KNOWLEDGE-ENGINE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Knowledge Engine

- **Name:** Knowledge Engine
- **Definition:** The central source that governs shared structured Business Knowledge and its lifecycle.
- **Owner:** Core Platform
- **Scope:** Platform
- **Related Concepts:** Knowledge Object; Business Brain; AI Expert
- **Source Documents:** [Genesis Knowledge Engine](../01-genesis/05-KNOWLEDGE-ENGINE.md); [Genesis Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Knowledge Pack

- **Name:** Knowledge Pack
- **Definition:** A shared, immutable, versioned Knowledge asset that additively extends the Knowledge Engine.
- **Owner:** Marketplace and Knowledge Engine
- **Scope:** Platform asset; Workspace activation; optional Business applicability
- **Related Concepts:** Knowledge; Marketplace Asset; AI Expert
- **Source Documents:** [Genesis Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md); [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Rule

- **Name:** Rule
- **Definition:** A deterministic, versioned, explainable platform asset applied to governed decisions.
- **Owner:** Core Rules domain
- **Scope:** Platform/versioned applicability
- **Related Concepts:** Rules Engine; Knowledge; Recommendation
- **Source Documents:** [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Rules Engine

- **Name:** Rules Engine
- **Definition:** The deterministic Core component that evaluates versioned Rules and returns traceable outcomes.
- **Owner:** Core Platform
- **Scope:** Platform
- **Related Concepts:** Rule; Business Brain; Configuration Engine
- **Source Documents:** [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Business Brain

- **Name:** Business Brain
- **Definition:** The shared platform decision engine that interprets Business DNA using Knowledge, Rules, context, and permitted analytics.
- **Owner:** Core Platform
- **Scope:** Business by default; explicit Workspace aggregation when requested
- **Related Concepts:** Business DNA; Knowledge Engine; Recommendation Engine
- **Source Documents:** [Genesis Business Brain](../01-genesis/06-BUSINESS-BRAIN.md); [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Business Brain Decision

- **Name:** Business Brain Decision
- **Definition:** A traceable decision record produced by Business Brain from pinned governed inputs.
- **Owner:** Core intelligence
- **Scope:** Business or explicit Workspace aggregation
- **Related Concepts:** Business Brain; Recommendation; Provenance
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Recommendation

- **Name:** Recommendation
- **Definition:** An explainable, optional business suggestion that identifies a business improvement and Capability before Implementation Options.
- **Owner:** Core Recommendation Engine
- **Scope:** Business by default; explicit Workspace aggregation when requested
- **Related Concepts:** Capability; Implementation Option; Business Brain Decision
- **Source Documents:** [Genesis Recommendation Engine](../01-genesis/07-RECOMMENDATION-ENGINE.md); [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Recommendation Engine

- **Name:** Recommendation Engine
- **Definition:** The Core component that generates, prioritizes, explains, and tracks the lifecycle and disposition of Recommendations.
- **Owner:** Core Platform
- **Scope:** Business by default
- **Related Concepts:** Business Brain; Recommendation; Product Hub
- **Source Documents:** [Genesis Recommendation Engine](../01-genesis/07-RECOMMENDATION-ENGINE.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Implementation Option

- **Name:** Implementation Option
- **Definition:** A mapped Operating System, Plan, or Marketplace Asset capable of implementing a recommended business improvement or Capability.
- **Owner:** Core intelligence mapping
- **Scope:** Recommendation context
- **Related Concepts:** Recommendation; OS Product; Plan; Marketplace Asset
- **Source Documents:** [Genesis Business Brain](../01-genesis/06-BUSINESS-BRAIN.md); [Genesis Recommendation Engine](../01-genesis/07-RECOMMENDATION-ENGINE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Configuration Engine

- **Name:** Configuration Engine
- **Definition:** The Core component that transforms accepted Recommendations into versioned Configuration Proposals.
- **Owner:** Core Platform
- **Scope:** Target configuration scope
- **Related Concepts:** Recommendation; Configuration Proposal; Operating System
- **Source Documents:** [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Business Brain](../01-genesis/06-BUSINESS-BRAIN.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)

### Configuration Proposal

- **Name:** Configuration Proposal
- **Definition:** A traceable versioned proposal for platform or OS configuration that the owning target validates and applies.
- **Owner:** Core Configuration Engine; target owns application
- **Scope:** Workspace, Business, Business Unit, or OS target
- **Related Concepts:** Configuration Engine; Recommendation; OS-Specific Setup
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Readiness Service

- **Name:** Readiness Service
- **Definition:** The Core component that evaluates Core Workspace Ready and observes Operating System readiness milestones.
- **Owner:** Core Platform
- **Scope:** Workspace/Business/OS context
- **Related Concepts:** Readiness Assessment; Core Workspace Ready; Operating System Ready
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Readiness Assessment

- **Name:** Readiness Assessment
- **Definition:** An evaluation of a named readiness state against explicit criteria with unmet requirements.
- **Owner:** Core Readiness Service; OS contributes OS state
- **Scope:** Workspace/Business/OS context
- **Related Concepts:** Core Workspace Ready; Operating System Ready
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Core Workspace Ready

- **Name:** Core Workspace Ready
- **Definition:** The state reached when Workspace creation, selected Business identity, sufficient Core Business DNA, and initial Recommendations are complete.
- **Owner:** Core Platform
- **Scope:** Workspace and selected Business
- **Related Concepts:** Business Architect Pipeline; Product Hub; Operating System Ready
- **Source Documents:** [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis Customer Journey](../01-genesis/11-CUSTOMER-JOURNEY.md); [Genesis Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md)

### Operating System Ready

- **Name:** Operating System Ready
- **Definition:** The state reached when subscription, installation, operational Business Unit, OS setup, configuration, activation, and access are complete.
- **Owner:** Selected OS with Core commercial and lifecycle conditions
- **Scope:** Workspace, Business, Business Unit, and OS
- **Related Concepts:** Core Workspace Ready; OS-Specific Setup; Operational
- **Source Documents:** [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis OS Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Operating System

- **Name:** Operating System
- **Definition:** An independent business application responsible for one operational domain and operating on Business Units.
- **Owner:** Owning OS product team/domain
- **Scope:** Workspace subscription; Business Unit operation
- **Related Concepts:** Capability; Module; OS Subscription; Core Platform
- **Source Documents:** [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis OS Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)

### Operating System Lifecycle

- **Name:** Operating System Lifecycle
- **Definition:** The standard progression from Available through Recommended, Selected and Subscribed, Installed, Configured, Activated, Ready, Operational, Extended, Upgraded, Paused, Archived, and Removed.
- **Owner:** Core control plane and owning OS by stage
- **Scope:** Workspace/OS and operational context
- **Related Concepts:** OS Subscription; OS Installation; Operating System Ready
- **Source Documents:** [Genesis OS Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### OS Product

- **Name:** OS Product
- **Definition:** The canonical catalog representation of one independent Operating System.
- **Owner:** Core Product and Plan Catalog
- **Scope:** Platform/OS
- **Related Concepts:** Operating System; Plan; Product Hub
- **Source Documents:** [Genesis Product Hub](../01-genesis/13-PRODUCT-HUB.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Plan

- **Name:** Plan
- **Definition:** A canonical commercial level for an Operating System: Starter, Pro, Business, or Enterprise with matching lowercase code.
- **Owner:** Core Product and Plan Catalog; commercial owner
- **Scope:** Operating System
- **Related Concepts:** OS Product; OS Subscription; Workspace Entitlement
- **Source Documents:** [Genesis Subscription Model](../01-genesis/14-SUBSCRIPTION-MODEL.md); [Genesis Customer Journey](../01-genesis/11-CUSTOMER-JOURNEY.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Product and Plan Catalog

- **Name:** Product and Plan Catalog
- **Definition:** The Core component that owns OS metadata, Plan definitions, Capability mappings, compatibility, and setup destinations.
- **Owner:** Core Platform
- **Scope:** Platform
- **Related Concepts:** OS Product; Plan; Product Hub
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Product Hub

- **Name:** Product Hub
- **Definition:** The Business-context Core advisor for Recommendations, Implementation Options, OS and Plan selection, lifecycle visibility, and OS setup handoff.
- **Owner:** Core Platform
- **Scope:** Selected Business by default; explicit Workspace aggregation when requested
- **Related Concepts:** Recommendation; OS Product; Marketplace; Setup Handoff
- **Source Documents:** [Genesis Product Hub](../01-genesis/13-PRODUCT-HUB.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Hub Context Resolver

- **Name:** Hub Context Resolver
- **Definition:** The Product Hub component that resolves actor, Workspace, selected Business, optional aggregation, locale, permission, and lifecycle context.
- **Owner:** Core Product Hub
- **Scope:** Product Hub session/request
- **Related Concepts:** Authorization Context; Product Hub Projection
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Recommendation Feed

- **Name:** Recommendation Feed
- **Definition:** The Product Hub component that presents business improvement and Capability Recommendations with evidence and disposition.
- **Owner:** Core Product Hub
- **Scope:** Selected Business or explicit aggregation
- **Related Concepts:** Recommendation; Implementation Option Mapper
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Implementation Option Mapper

- **Name:** Implementation Option Mapper
- **Definition:** The Product Hub component that resolves governed OS, Plan, and Marketplace options already mapped to Recommendations.
- **Owner:** Core intelligence/Product Hub composition
- **Scope:** Recommendation context
- **Related Concepts:** Implementation Option; Eligibility and Dependency Evaluator
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Product Catalog Projection

- **Name:** Product Catalog Projection
- **Definition:** The customer-facing Product Hub projection of canonical OS Product and Plan metadata.
- **Owner:** Core Product Hub projection
- **Scope:** Product Hub context
- **Related Concepts:** Product and Plan Catalog; OS Product
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Eligibility and Dependency Evaluator

- **Name:** Eligibility and Dependency Evaluator
- **Definition:** The Product Hub component that evaluates country, compatibility, Plan, subscription, entitlement, permission, and declared dependencies.
- **Owner:** Core Product Hub using owner contracts
- **Scope:** Implementation Option context
- **Related Concepts:** Workspace Entitlement; OS Subscription; Plan
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Product Lifecycle Projection

- **Name:** Product Lifecycle Projection
- **Definition:** The Product Hub composition of availability, Recommendation, subscription, installation, setup, activation, readiness, pause, and update states.
- **Owner:** Core Product Hub projection
- **Scope:** Workspace/Business/OS context
- **Related Concepts:** Operating System Lifecycle; Product Hub Projection
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Plan Comparison and Selection

- **Name:** Plan Comparison and Selection
- **Definition:** The Product Hub component that presents canonical Plans and records explicit customer selection.
- **Owner:** Core Product Hub
- **Scope:** Workspace/selected Business/OS
- **Related Concepts:** Plan; OS Subscription; Subscription Coordinator
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Subscription Coordinator

- **Name:** Subscription Coordinator
- **Definition:** The Product Hub component that sends subscription commands to the owning commercial component.
- **Owner:** Core Product Hub orchestration
- **Scope:** Workspace/OS
- **Related Concepts:** OS Subscription; Plan Comparison and Selection
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Installation and Activation Coordinator

- **Name:** Installation and Activation Coordinator
- **Definition:** The Core control-plane component that coordinates platform-side OS and Marketplace installation and activation operations.
- **Owner:** Core Platform control plane
- **Scope:** Workspace/product/context
- **Related Concepts:** OS Installation; OS Activation; Marketplace Installation
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Setup Handoff Router

- **Name:** Setup Handoff Router
- **Definition:** The Product Hub component that creates a signed, short-lived, context-bound handoff to OS-owned setup.
- **Owner:** Core Product Hub
- **Scope:** Workspace/Business/OS setup transition
- **Related Concepts:** Setup Handoff; OS-Specific Setup
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Business Health and Growth View

- **Name:** Business Health and Growth View
- **Definition:** The Product Hub view of permitted health, maturity, coverage, risk, and growth projections from intelligence components.
- **Owner:** Core Product Hub projection
- **Scope:** Selected Business or explicit Workspace aggregation
- **Related Concepts:** Business Brain; Recommendation; Product Hub
- **Source Documents:** [Genesis Product Hub](../01-genesis/13-PRODUCT-HUB.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Marketplace Discovery Adapter

- **Name:** Marketplace Discovery Adapter
- **Definition:** The Product Hub adapter that queries eligible Marketplace Assets and scoped state through Marketplace contracts.
- **Owner:** Core Product Hub
- **Scope:** Selected Business/Workspace
- **Related Concepts:** Marketplace; Marketplace Asset; Marketplace Applicability
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Product Hub Projection

- **Name:** Product Hub Projection
- **Definition:** A reconstructable Business-context read model combining owner-provided Recommendation, catalog, commercial, lifecycle, Marketplace, and readiness state.
- **Owner:** Core Product Hub projection
- **Scope:** Selected Business or explicit aggregation
- **Related Concepts:** Product Lifecycle Projection; Recommendation Feed
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Setup Handoff

- **Name:** Setup Handoff
- **Definition:** A signed, short-lived, opaque reference used to re-resolve authorized context when moving from Core to OS setup.
- **Owner:** Core Product Hub; destination revalidates
- **Scope:** Cross-application transition
- **Related Concepts:** Setup Handoff Router; OS-Specific Setup; Navigation Architecture
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Workspace Entitlement

- **Name:** Workspace Entitlement
- **Definition:** The mandatory Workspace-level platform-access relationship available during onboarding and included with active OS Subscription during MVP.
- **Owner:** Core commercial control
- **Scope:** Workspace
- **Related Concepts:** Core Platform; OS Subscription; Product Hub
- **Source Documents:** [Genesis Subscription Model](../01-genesis/14-SUBSCRIPTION-MODEL.md); [Genesis Customer Journey](../01-genesis/11-CUSTOMER-JOURNEY.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### OS Subscription

- **Name:** OS Subscription
- **Definition:** The Workspace-level commercial relationship for one Operating System and selected Plan.
- **Owner:** Core commercial control
- **Scope:** Workspace and OS
- **Related Concepts:** Workspace Entitlement; Plan; Operating System Lifecycle
- **Source Documents:** [Genesis Subscription Model](../01-genesis/14-SUBSCRIPTION-MODEL.md); [Genesis OS Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### OS Installation

- **Name:** OS Installation
- **Definition:** The lifecycle state or operation in which an Operating System is installed for a Workspace before OS-owned setup and operation.
- **Owner:** Core installation control plane
- **Scope:** Workspace and OS
- **Related Concepts:** OS Subscription; OS-Specific Setup; OS Activation
- **Source Documents:** [Genesis OS Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### OS-Specific Setup

- **Name:** OS-Specific Setup
- **Definition:** The setup experience owned by the selected OS that selects or creates the operational Business Unit and gathers domain requirements.
- **Owner:** Selected Operating System
- **Scope:** Workspace, Business, Business Unit, and OS
- **Related Concepts:** Setup Handoff; Configuration Proposal; Operating System Ready
- **Source Documents:** [Genesis Customer Journey](../01-genesis/11-CUSTOMER-JOURNEY.md); [Genesis OS Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### OS Configuration

- **Name:** OS Configuration
- **Definition:** The OS-owned lifecycle state in which validated configuration derived from Business context is applied to the OS.
- **Owner:** Selected Operating System
- **Scope:** Business Unit and OS
- **Related Concepts:** Configuration Proposal; OS Activation
- **Source Documents:** [Genesis OS Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### OS Activation

- **Name:** OS Activation
- **Definition:** The lifecycle state in which an installed and configured OS becomes available to authorized users and its access and navigation become effective.
- **Owner:** Core control plane and selected OS
- **Scope:** Workspace/Business/Business Unit/OS
- **Related Concepts:** OS Configuration; Operating System Ready
- **Source Documents:** [Genesis OS Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Operational

- **Name:** Operational
- **Definition:** The OS lifecycle state in which daily domain activities have begun after Operating System Ready.
- **Owner:** Selected Operating System
- **Scope:** Business Unit/OS
- **Related Concepts:** Operating System Ready; Operating System Lifecycle
- **Source Documents:** [Genesis OS Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Marketplace

- **Name:** Marketplace
- **Definition:** The governed distribution bounded context for versioned business assets within the Core Platform offering.
- **Owner:** Marketplace bounded context
- **Scope:** Platform with Workspace and Business scoped state
- **Related Concepts:** Marketplace Asset; Product Hub; Workspace Entitlement
- **Source Documents:** [Genesis Marketplace](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md); [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)

### Marketplace Asset

- **Name:** Marketplace Asset
- **Definition:** A governed asset distributed by Marketplace, including an OS, extension, Knowledge Pack, AI Expert, automation, dashboard, workflow, template, or theme.
- **Owner:** Marketplace bounded context
- **Scope:** Platform asset
- **Related Concepts:** Marketplace Asset Version; Marketplace Purchase; Marketplace Applicability
- **Source Documents:** [Genesis Marketplace](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md); [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Marketplace Asset Version

- **Name:** Marketplace Asset Version
- **Definition:** One immutable published version of a Marketplace Asset.
- **Owner:** Marketplace bounded context
- **Scope:** Platform/shared/versioned
- **Related Concepts:** Marketplace Asset; Marketplace Installation
- **Source Documents:** [Genesis Marketplace](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md); [Genesis Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Marketplace Purchase

- **Name:** Marketplace Purchase
- **Definition:** The Workspace-scoped commercial state recording acquisition of a Marketplace Asset.
- **Owner:** Marketplace bounded context
- **Scope:** Workspace
- **Related Concepts:** Marketplace Asset; Marketplace Installation
- **Source Documents:** [Genesis Marketplace](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md); [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Marketplace Installation

- **Name:** Marketplace Installation
- **Definition:** The Workspace-scoped state recording installation of a selected immutable Marketplace Asset Version.
- **Owner:** Marketplace bounded context
- **Scope:** Workspace
- **Related Concepts:** Marketplace Purchase; Marketplace Activation
- **Source Documents:** [Genesis Marketplace](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md); [Genesis Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Marketplace Activation

- **Name:** Marketplace Activation
- **Definition:** The Workspace-scoped state making an installed Marketplace Asset Version active.
- **Owner:** Marketplace bounded context
- **Scope:** Workspace
- **Related Concepts:** Marketplace Installation; Marketplace Applicability
- **Source Documents:** [Genesis Marketplace](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md); [Genesis Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Marketplace Applicability

- **Name:** Marketplace Applicability
- **Definition:** The scoped state identifying whether an activated Marketplace Asset applies to the whole Workspace or a selected Business.
- **Owner:** Marketplace bounded context
- **Scope:** Workspace or Business
- **Related Concepts:** Marketplace Activation; Business; Business Brain
- **Source Documents:** [Genesis Marketplace](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md); [Genesis Knowledge Packs](../01-genesis/18-KNOWLEDGE-PACKS.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Marketplace Asset Lifecycle

- **Name:** Marketplace Asset Lifecycle
- **Definition:** The shared asset progression through Draft, Review, Approved, Published, new versions, Deprecated, and Archived.
- **Owner:** Marketplace bounded context
- **Scope:** Platform asset/version
- **Related Concepts:** Marketplace Asset; Marketplace Asset Version
- **Source Documents:** [Genesis Marketplace](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### AI Coordinator

- **Name:** AI Coordinator
- **Definition:** The Core component that selects and coordinates AI Experts and returns one governed, explainable response.
- **Owner:** Core Platform
- **Scope:** Authorized request context
- **Related Concepts:** AI Expert; AI Interaction; AI Action Proposal
- **Source Documents:** [Genesis AI Strategy](../01-genesis/08-AI-STRATEGY.md); [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)

### AI Expert

- **Name:** AI Expert
- **Definition:** A specialized AI assistant focused on an industry, function, or technical domain and consuming governed Knowledge.
- **Owner:** Core or Marketplace according to publication
- **Scope:** Platform/versioned; authorized request context
- **Related Concepts:** AI Coordinator; Knowledge Pack; Expert Registry
- **Source Documents:** [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md); [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### AI Expert Network

- **Name:** AI Expert Network
- **Definition:** The collection of specialized AI Experts coordinated into one Nexoraxs response.
- **Owner:** Core AI layer
- **Scope:** Platform
- **Related Concepts:** AI Coordinator; AI Expert
- **Source Documents:** [Genesis AI Strategy](../01-genesis/08-AI-STRATEGY.md); [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)

### AI Interaction

- **Name:** AI Interaction
- **Definition:** The scoped auditable record of one AI-coordinated request and unified response, including versions, context, policy, evidence, and confidence.
- **Owner:** Core AI Coordinator
- **Scope:** Authorized User/Workspace/Business context
- **Related Concepts:** AI Coordinator; Provenance; AI Action Proposal
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### AI Action Proposal

- **Name:** AI Action Proposal
- **Definition:** A structured AI-generated request for a consequential action that still requires owning-service authorization, validation, approval, execution, and audit.
- **Owner:** Core AI Coordinator proposes; owning service executes
- **Scope:** Authorized target scope
- **Related Concepts:** Action Proposal Broker; Audit Record
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Request Interpreter

- **Name:** Request Interpreter
- **Definition:** The AI Coordinator component that classifies intent, language, desired outcome, domain, and risk.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** AI Coordinator; Expert Router
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Authorization Context Resolver

- **Name:** Authorization Context Resolver
- **Definition:** The AI Coordinator component that establishes permitted organizational, OS, and resource scope before retrieval.
- **Owner:** Core AI Coordinator with Core authorization
- **Scope:** AI Interaction
- **Related Concepts:** Authorization Context; Context Builder
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Context Builder

- **Name:** Context Builder
- **Definition:** The AI Coordinator component that retrieves the minimum authorized Business DNA, Knowledge, Recommendation, analytics, OS, and conversation context.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Authorization Context Resolver; Policy and Safety Engine
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Policy and Safety Engine

- **Name:** Policy and Safety Engine
- **Definition:** The AI Coordinator component that applies privacy, country, permission, action, and data-use policy before and after expert execution.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Context Builder; Evidence and Claim Validator
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Expert Registry

- **Name:** Expert Registry
- **Definition:** The AI component that maintains versioned expert definitions, domains, inputs, compatibility, provenance, and lifecycle.
- **Owner:** Core AI Coordinator/Marketplace for published experts
- **Scope:** Platform
- **Related Concepts:** AI Expert; Expert Router
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Expert Router

- **Name:** Expert Router
- **Definition:** The AI component that selects one or more appropriate Experts based on intent, context, Capability, confidence needs, and availability.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Expert Registry; Collaboration Orchestrator
- **Source Documents:** [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Instruction Assembler

- **Name:** Instruction Assembler
- **Definition:** The AI component that builds governed expert instructions from approved Knowledge, Rules, evidence, policy, and task context.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Knowledge; Rule; Expert Execution Adapter
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Expert Execution Adapter

- **Name:** Expert Execution Adapter
- **Definition:** The replaceable AI component that invokes approved expert or model providers with bounded tools, time, and data.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction/provider boundary
- **Related Concepts:** AI Expert; Instruction Assembler
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Collaboration Orchestrator

- **Name:** Collaboration Orchestrator
- **Definition:** The AI component that coordinates multiple Expert outputs, detects disagreement, and seeks permitted evidence.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Expert Router; Response Synthesizer
- **Source Documents:** [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Evidence and Claim Validator

- **Name:** Evidence and Claim Validator
- **Definition:** The AI component that checks material claims against permitted sources and flags unsupported or uncertain output.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Provenance; Confidence and Explainability Evaluator
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Response Synthesizer

- **Name:** Response Synthesizer
- **Definition:** The AI component that produces one coherent Nexoraxs response from coordinated expert results.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Collaboration Orchestrator; Confidence and Explainability Evaluator
- **Source Documents:** [Genesis AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Confidence and Explainability Evaluator

- **Name:** Confidence and Explainability Evaluator
- **Definition:** The AI component that attaches confidence, assumptions, evidence, alternatives, and verification guidance.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Evidence and Claim Validator; AI Interaction
- **Source Documents:** [Genesis AI Strategy](../01-genesis/08-AI-STRATEGY.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Action Proposal Broker

- **Name:** Action Proposal Broker
- **Definition:** The AI component that converts a requested action into a structured AI Action Proposal for separate authorization and execution.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction/target scope
- **Related Concepts:** AI Action Proposal; Authorization Context
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Conversation Context Manager

- **Name:** Conversation Context Manager
- **Definition:** The AI component that maintains scoped conversation continuity under retention, consent, and tenant-isolation policy.
- **Owner:** Core AI Coordinator
- **Scope:** User/Workspace/Business conversation
- **Related Concepts:** AI Interaction; Authorization Context
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### AI Audit and Observability

- **Name:** AI Audit and Observability
- **Definition:** The AI component that records model and expert versions, context references, policy, tools, proposals, latency, cost, and feedback.
- **Owner:** Core AI Coordinator
- **Scope:** AI Interaction
- **Related Concepts:** Audit Record; AI Interaction
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### API Architecture

- **Name:** API Architecture
- **Definition:** The contract system governing Core modules, first-party applications, Operating Systems, Marketplace, partners, external clients, events, webhooks, and AI tools.
- **Owner:** Core Platform
- **Scope:** Platform interfaces
- **Related Concepts:** API Gateway; OS Integration API; Event and Webhook API
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### API Gateway

- **Name:** API Gateway
- **Definition:** The API Architecture component that authenticates boundaries, applies coarse policy and rate limits, routes requests, and records telemetry without owning domain logic.
- **Owner:** Core Platform
- **Scope:** API boundary
- **Related Concepts:** API Architecture; Authorization Context
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Core Module Contract

- **Name:** Core Module Contract
- **Definition:** A typed command, query, or domain-event boundary between logical Core modules that prevents arbitrary cross-module table access.
- **Owner:** Owning Core modules
- **Scope:** Core modular monolith
- **Related Concepts:** API Architecture; Domain Event
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### First-Party Experience API

- **Name:** First-Party Experience API
- **Definition:** The task-oriented API surface used by approved Core experiences and backend-for-frontend layers.
- **Owner:** Core Platform API Architecture
- **Scope:** First-party experience
- **Related Concepts:** Business Architect; Product Hub; API Gateway
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### OS Integration API

- **Name:** OS Integration API
- **Definition:** The governed Core API surface used by independent Operating Systems for context, organization, entitlement, handoff, readiness, audit, notification, and approved intelligence.
- **Owner:** Core Platform API Architecture
- **Scope:** Core-to-OS boundary
- **Related Concepts:** Operating System; Setup Handoff; Integration Event
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Marketplace API

- **Name:** Marketplace API
- **Definition:** The governed API surface for Marketplace catalog, versions, purchases, installation, activation, applicability, review, and publisher operations.
- **Owner:** Marketplace bounded context under API governance
- **Scope:** Marketplace boundary
- **Related Concepts:** Marketplace; Product Hub; API Gateway
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Public Platform API

- **Name:** Public Platform API
- **Definition:** The stable, documented, rate-limited API surface for authorized customer and partner integrations.
- **Owner:** Core Platform API Architecture
- **Scope:** Authorized external client
- **Related Concepts:** API Gateway; Webhook
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Administrative API

- **Name:** Administrative API
- **Definition:** The segregated API surface for authorized Nexoraxs operators with stronger authentication, approval, and audit requirements.
- **Owner:** Core Platform and owning administrative domains
- **Scope:** Internal administration
- **Related Concepts:** Authorization Context; Audit Record
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Event and Webhook API

- **Name:** Event and Webhook API
- **Definition:** The asynchronous API surface for versioned internal, OS, customer, and partner notifications.
- **Owner:** Core Platform API Architecture; event owner
- **Scope:** Asynchronous integration
- **Related Concepts:** Domain Event; Integration Event; Webhook
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### AI Tool API

- **Name:** AI Tool API
- **Definition:** The narrow, permission-checked API surface exposed to AI Coordinator and approved Experts for reads or Action Proposals.
- **Owner:** Core Platform API Architecture and owning services
- **Scope:** AI interaction
- **Related Concepts:** AI Coordinator; AI Action Proposal
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Domain Event

- **Name:** Domain Event
- **Definition:** A versioned event announcing a committed fact owned by one domain.
- **Owner:** Domain that owns the fact
- **Scope:** Owning domain
- **Related Concepts:** Integration Event; Core Module Contract
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Integration Event

- **Name:** Integration Event
- **Definition:** A stable, minimized versioned fact exposed across a domain boundary.
- **Owner:** Source domain
- **Scope:** Cross-domain integration
- **Related Concepts:** Domain Event; OS Integration API
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Webhook

- **Name:** Webhook
- **Definition:** A signed, retryable, observable external notification delivered through the Event and Webhook API.
- **Owner:** Source domain under API governance
- **Scope:** Authorized external endpoint
- **Related Concepts:** Event and Webhook API; Integration Event
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Long-Running Operation

- **Name:** Long-Running Operation
- **Definition:** An explicit status resource for work such as installation that cannot complete safely within one synchronous request.
- **Owner:** Owning operation coordinator
- **Scope:** Workspace/product/operation
- **Related Concepts:** Installation and Activation Coordinator; API Architecture
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Notification

- **Name:** Notification
- **Definition:** A Workspace-scoped platform record and delivery process for Core or authorized OS-produced messages.
- **Owner:** Core Notification Service
- **Scope:** Workspace with producer context
- **Related Concepts:** Workspace; Operating System; Notification Service
- **Source Documents:** [Genesis Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Notification Service

- **Name:** Notification Service
- **Definition:** The shared Core service that owns Notification records, delivery preferences, and delivery attempts.
- **Owner:** Core Platform
- **Scope:** Workspace
- **Related Concepts:** Notification; Operating System
- **Source Documents:** [Genesis Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Audit Record

- **Name:** Audit Record
- **Definition:** An append-only record of a critical action with actor, scope, source, subject, time, correlation, and result references.
- **Owner:** Core Audit Service
- **Scope:** Workspace with source and domain context
- **Related Concepts:** Audit Service; Authorization Context; AI Interaction
- **Source Documents:** [Genesis Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Audit Service

- **Name:** Audit Service
- **Definition:** The shared Core service that preserves append-only critical action history.
- **Owner:** Core Platform
- **Scope:** Workspace with producer context
- **Related Concepts:** Audit Record; Authorization Context
- **Source Documents:** [Genesis Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Settings and Localization Context

- **Name:** Settings and Localization Context
- **Definition:** The resolved platform preferences for language, locale, direction, timezone, and currency context without translating user-entered Business data.
- **Owner:** Core Settings and Localization
- **Scope:** Workspace/User/Business presentation context
- **Related Concepts:** Navigation Architecture; Workspace
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md); [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

### Search Coordination

- **Name:** Search Coordination
- **Definition:** The shared contracts and authorized projections used to search across platform-owned sources without transferring ownership.
- **Owner:** Core Platform
- **Scope:** Authorized tenant and resource scope
- **Related Concepts:** Authorization Context; API Architecture
- **Source Documents:** [Genesis OS Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Storage Coordination

- **Name:** Storage Coordination
- **Definition:** The shared file and object policies, quotas, secure references, and access coordination consumed across products.
- **Owner:** Core Platform
- **Scope:** Workspace and resource scope
- **Related Concepts:** Authorization Context; Workspace Entitlement
- **Source Documents:** [Genesis OS Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Analytics Intake

- **Name:** Analytics Intake
- **Definition:** The permission-aware, purpose-bound intake of approved platform and OS usage signals for analysis.
- **Owner:** Core Platform
- **Scope:** Workspace/Business/OS context
- **Related Concepts:** Business Brain; Workspace Intelligence Aggregation
- **Source Documents:** [Genesis Business Brain](../01-genesis/06-BUSINESS-BRAIN.md); [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Navigation Architecture

- **Name:** Navigation Architecture
- **Definition:** The governed movement of users through Core, Marketplace, OS setup, and OS operational surfaces while preserving context and route ownership.
- **Owner:** Core coordinates; each bounded product owns its routes
- **Scope:** Authenticated platform journey
- **Related Concepts:** Core Shell; Setup Handoff; OS Operational Shell
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Core Shell

- **Name:** Core Shell
- **Definition:** The Core-owned navigation surface for context selection, Product Hub, team/access, billing, settings, notifications, audit, and Marketplace entry.
- **Owner:** Core Platform
- **Scope:** Authenticated Core experience
- **Related Concepts:** Product Hub; Marketplace; Navigation Architecture
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### OS Setup Surface

- **Name:** OS Setup Surface
- **Definition:** The selected OS-owned navigation surface for Business Unit selection or creation, domain setup, configuration review, activation, and readiness.
- **Owner:** Selected Operating System
- **Scope:** OS setup context
- **Related Concepts:** OS-Specific Setup; Setup Handoff
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### OS Operational Shell

- **Name:** OS Operational Shell
- **Definition:** The selected OS-owned navigation surface for daily workflows, Modules, operational context, dashboards, reports, and OS settings.
- **Owner:** Selected Operating System
- **Scope:** Business Unit/Branch/OS
- **Related Concepts:** Operational; Module; Navigation Architecture
- **Source Documents:** [Approved Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

### Customer Journey

- **Name:** Customer Journey
- **Definition:** The complete customer progression from discovery and authentication through Workspace, Business Architect, Recommendations, Product Hub, OS setup, operation, growth, and Marketplace.
- **Owner:** Nexoraxs Platform
- **Scope:** Customer lifecycle
- **Related Concepts:** Business Architect Pipeline; Core Workspace Ready; Operating System Lifecycle
- **Source Documents:** [Genesis Customer Journey](../01-genesis/11-CUSTOMER-JOURNEY.md); [Genesis Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md); [Wave 1 Vision](../02-core-platform/01-CORE-PLATFORM-VISION.md)

### Workspace Lifecycle

- **Name:** Workspace Lifecycle
- **Definition:** The progression from Workspace creation through Business understanding, Core readiness, OS selection, operation, growth, multi-Business, and enterprise.
- **Owner:** Core Platform
- **Scope:** Workspace
- **Related Concepts:** Customer Journey; Core Workspace Ready; OS Subscription
- **Source Documents:** [Genesis Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md); [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

## Ambiguities Preserved

The following phrases or model boundaries are intentionally not defined as new canonical concepts:

1. **Business Identity** — the sources use this phrase for creation of the platform Business identity, for the Identity layer of Business DNA, and distinguish both from OS-specific legal, billing, tax, or document identity. The phrase requires its surrounding scope and is not a standalone replacement for Business, Business DNA, or OS legal identity.
2. **OSEnablement** — earlier architecture used this name, but the approved proposal leaves its successor or evolution open. The authoritative model now distinguishes subscription, installation, setup, configuration, activation, and readiness; no combined replacement concept has been approved.
3. **Organization write authority during OS setup** — Core owns canonical Business Unit, Department, and Branch identities, while an OS owns its setup and operational data. Whether Core is the only writer after an OS command or the OS creates identity transactionally through a Core API remains open.
4. **Core Platform entitlement** — Genesis uses this descriptively alongside the canonical Workspace Entitlement. This glossary does not create a second entitlement concept.
5. **Product** — Product Hub uses the word broadly for Operating Systems and Marketplace offerings. Use OS Product, Marketplace Asset, Plan, or another specific canonical concept when ownership matters.

## Authoritative References

- [Genesis v1.1](../01-genesis/)
- [Approved Core Platform Architecture Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Core Platform Wave 1](../02-core-platform/README.md)
- [Architecture Decision Records](../00-adr/README.md)
