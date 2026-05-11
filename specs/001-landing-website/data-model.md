# Data Model: NexoraXS Landing Website

**Branch**: `001-landing-website` | **Date**: 2026-05-12
**Note**: Landing page is static content — no database. This document defines
the TypeScript content types that each section consumes.

---

## NavLink

Represents a single navigation item in the top bar.

```ts
interface NavLink {
  label: string;   // Display text: "Features", "Apps", "Pricing", "FAQ"
  href: string;    // Anchor: "#features", "#apps", "#pricing", "#faq"
}
```

---

## FeatureCard

Represents one card in the Features section.

```ts
interface FeatureCard {
  icon: string;        // SVG path data or emoji for the feature icon
  title: string;       // Short feature name, e.g. "Modular Architecture"
  description: string; // One-sentence description of the capability
}
```

**Instances (6 cards)**:

| # | Title | Description |
|---|-------|-------------|
| 1 | Modular Architecture | Launch and manage independent business apps under one platform. |
| 2 | Shared Authentication | One login, every app — session shared across all NexoraXS tools. |
| 3 | Workspace Management | Organise teams, roles, and permissions per business workspace. |
| 4 | Multi-Tenant System | Complete data isolation per workspace — your data stays yours. |
| 5 | Cloud-Native Infrastructure | Built for scale from day one with Docker and PostgreSQL. |
| 6 | AI-Ready Platform | Designed to integrate AI workflows as the platform evolves. |

---

## AppCard

Represents one card in the Apps section.

```ts
interface AppCard {
  name: string;        // App name: "Shops", "Clinics", etc.
  tagline: string;     // Short descriptor shown under the name
  description: string; // One-sentence value proposition for the app
  badge?: string;      // Optional: "Coming Soon", "Beta", etc.
}
```

**Instances (5 apps)**:

| # | Name | Tagline | Description | Badge |
|---|------|---------|-------------|-------|
| 1 | Shops | Commerce & POS | Manage products, inventory, sales and customers in one place. | — |
| 2 | Clinics | Healthcare Management | Appointments, patient records, and billing for modern clinics. | Coming Soon |
| 3 | Maintenance | Field Service | Schedule jobs, track assets, and manage technicians on the go. | Coming Soon |
| 4 | Restaurants | Hospitality Operations | Table management, orders, and kitchen flow for restaurants. | Coming Soon |
| 5 | CRM | Customer Relations | Track leads, deals, and customer communication all in one view. | Coming Soon |

---

## PricingPlan

Represents one tier card in the Pricing section.
*(Not rendered in the initial release — replaced by a "Coming Soon" placeholder.)*

```ts
interface PricingPlan {
  name: string;         // "Free", "Pro", "Enterprise"
  price: string;        // "$0/mo", "$49/mo", "Custom"
  description: string;  // One-sentence positioning statement
  features: string[];   // Bullet list of included features
  cta: string;          // Button label: "Get Started", "Start Trial", "Contact Us"
  highlighted?: boolean; // Renders with accent border (Pro tier)
}
```

---

## FAQItem

Represents one collapsible row in the FAQ section.

```ts
interface FAQItem {
  question: string; // The visible question text
  answer: string;   // The expandable answer text
}
```

**Instances (6 items)**:

| # | Question |
|---|----------|
| 1 | What is NexoraXS? |
| 2 | Can I use multiple apps under one account? |
| 3 | Is my business data kept separate from other users? |
| 4 | What apps are available right now? |
| 5 | How does pricing work? |
| 6 | How do I get started? |
