# Feature Specification: Landing Page v5.2 Positioning

**Feature Branch**: `040-landing-v5-2-positioning`
**Created**: 2026-06-02
**Status**: Draft
**Input**: User description: "039-landing-page-v5-2-positioning — Align the public landing page with NexoraXS v5.2 Final Master Architecture"

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Visitor understands NexoraXS as a Business Operating Platform (Priority: P1)

A potential customer visits nexoraxs.com and immediately understands that NexoraXS is a Business Operating Platform — not a generic SaaS tool, app bundle, or single-purpose product. The hero section communicates this clearly through its headline, description, and supporting pills.

**Why this priority**: The hero is the first impression. If visitors see outdated "modular SaaS apps" language they cannot quickly map that to the platform's actual offer. Getting the positioning right here is the most impactful single change.

**Independent Test**: Visit the landing page and read only the hero section. A visitor with no prior knowledge should be able to describe NexoraXS as "a platform with multiple Operating Systems for different business domains."

**Acceptance Scenarios**:

1. **Given** a visitor opens nexoraxs.com, **When** they view the hero section, **Then** the headline contains the phrase "Business Operating Platform" or a clear equivalent.
2. **Given** a visitor reads the hero description, **When** they finish reading, **Then** no occurrence of "modular SaaS apps" or "future business apps" remains.
3. **Given** a visitor sees the hero feature pills, **When** they scan the pills, **Then** at least one pill references Operating Systems or the platform's multi-OS nature.

---

### User Story 2 — Visitor identifies Commerce OS as the available product (Priority: P1)

A visitor scrolling to the products section sees Commerce OS clearly labeled and active. It is the only product available to start today, and its description accurately reflects its scope: retail, POS, inventory, and business presets such as restaurants and pharmacies — all within one OS.

**Why this priority**: Commerce OS is the current MVP product. Marketing it by the old "Shops" label creates a mismatch between the platform promise and the product name, and underrepresents its scope.

**Independent Test**: Navigate to the products section without reading any other section. A visitor should immediately identify "Commerce OS" as the product they can subscribe to today.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the products section, **When** they scan the cards, **Then** the first card is labeled "Commerce OS" with no "Coming Soon" badge.
2. **Given** a visitor reads the Commerce OS card, **When** they finish reading, **Then** no occurrence of "Shops" remains as the product name.
3. **Given** a visitor sees the Commerce OS description, **When** they read it, **Then** it communicates a broad commerce scope (e.g., POS, products, inventory, multi-preset) rather than implying only a single shop type.

---

### User Story 3 — Visitor sees the full Operating System roadmap (Priority: P2)

A visitor browsing the products section sees the five future Operating Systems — Healthcare OS, HR OS, CRM OS, Gym OS, and Maintenance OS — each displayed with a "Coming Soon" badge. This communicates that NexoraXS is a growing platform, not a one-product tool.

**Why this priority**: Showing the roadmap builds confidence in platform breadth and differentiates NexoraXS from single-domain tools. Showing Restaurants as a standalone product card is architecturally incorrect and must be removed.

**Independent Test**: View only the products section. A visitor should be able to list at least five distinct future OS products beyond Commerce OS, and should not see "Restaurants" or "Clinics" as standalone product names.

**Acceptance Scenarios**:

1. **Given** a visitor views the products section, **When** they count the product cards, **Then** exactly six cards are shown: Commerce OS plus five future OS products.
2. **Given** a visitor reads the future cards, **When** they scan the names, **Then** they see Healthcare OS, HR OS, CRM OS, Gym OS, and Maintenance OS.
3. **Given** a visitor looks for "Restaurants" as a card, **When** they search, **Then** no standalone Restaurants card exists.
4. **Given** a visitor looks for "Clinics" as a card, **When** they search, **Then** no standalone Clinics card exists; Healthcare OS takes its place.

---

### User Story 4 — Visitor understands the Core Platform + Operating Systems model (Priority: P2)

A visitor reading the platform model section understands that NexoraXS has a shared Core Platform foundation, and that individual Operating Systems connect to it. The section no longer uses "apps" to describe domain products.

**Why this priority**: The platform model section shapes how visitors understand the architecture. "One Core. Many Apps." implies a generic app store; the corrected copy should convey purposeful, independent Operating Systems.

**Independent Test**: Read only the platform model section. A visitor should explain the relationship as "a shared core foundation with independent Operating Systems attached to it."

**Acceptance Scenarios**:

1. **Given** a visitor reads the platform section heading, **When** they finish reading, **Then** the heading communicates the OS model, not generic "apps."
2. **Given** a visitor sees the right-side tile list in the platform diagram, **When** they scan it, **Then** each tile uses the updated OS product names (Commerce OS, Healthcare OS, HR OS, CRM OS, Gym OS, Maintenance OS).
3. **Given** a visitor reads the label above the tile list, **When** they read it, **Then** it says "Operating Systems" (not "App Satellites" or "Domain modules").

---

### User Story 5 — Visitor navigates with updated labels (Priority: P3)

A visitor using the navbar or footer links to jump between sections finds that the link labeled "Apps" has been updated to "Products." The anchor still works and scrolls to the correct products section.

**Why this priority**: Nav and footer label consistency is important but carries lower risk than the above — it is a rename and a functional anchor update.

**Independent Test**: Click the nav link and the footer link that previously said "Apps." Both should scroll to the products section without a broken anchor.

**Acceptance Scenarios**:

1. **Given** a visitor looks at the navbar links, **When** they scan the labels, **Then** "Products" appears where "Apps" previously was.
2. **Given** a visitor clicks the "Products" nav link, **When** the page scrolls, **Then** they arrive at the products section.
3. **Given** a visitor looks at the footer Product column, **When** they scan the links, **Then** "Products" appears where "Apps" previously was, and it links to the same section.

---

### Edge Cases

- What happens if a visitor bookmarks the old `#apps` anchor? The section id must be updated to `#products`; old bookmarks will land at the top of the page, which is acceptable behavior.
- How does the grid behave with six product cards instead of five? The existing responsive grid (2-column on small, 3-column on large) accommodates six cards cleanly without layout changes.
- What if a user's browser does not support CSS backdrop blur for "Coming Soon" overlays? The card still shows the badge text and remains usable; the blur is a visual enhancement only.

---

## Requirements *(mandatory)*

### Functional Requirements

**Hero Section**

- **FR-001**: The hero headline MUST position NexoraXS as a "Business Operating Platform."
- **FR-002**: The hero description MUST NOT contain the phrase "modular SaaS platform" or "future business apps."
- **FR-003**: The hero description MUST communicate that NexoraXS provides multiple Operating Systems for different business domains.
- **FR-004**: The hero feature pills MUST be updated to reflect platform and Operating System language (e.g., replacing "Modular SaaS architecture" and "Built for future apps").

**Navigation & Footer**

- **FR-005**: The navbar link currently labeled "Apps" MUST be renamed to "Products."
- **FR-006**: The renamed navbar link MUST anchor to the products section (`#products`).
- **FR-007**: The footer link in the Product column currently labeled "Apps" MUST be renamed to "Products."
- **FR-008**: The footer "Products" link MUST anchor to the products section (`#products`).

**Products / Operating Systems Section**

- **FR-009**: The products section id MUST be updated from `apps` to `products` so that all anchor links function correctly.
- **FR-010**: The section chip above the heading MUST change from `// app launcher` to `// product hub`.
- **FR-011**: The section heading MUST change from "Our Apps" to a heading that uses "Operating Systems" or "Product Hub."
- **FR-012**: The section subheading MUST NOT use the word "apps" to describe domain products.
- **FR-013**: The product card for "Shops" MUST be renamed to "Commerce OS" with an updated tagline (e.g., "Commerce & Business Presets") and an updated description reflecting its broad scope.
- **FR-014**: Commerce OS MUST be the only active product card (no Coming Soon badge).
- **FR-015**: The product card for "Clinics" MUST be renamed to "Healthcare OS" and retained with a Coming Soon badge.
- **FR-016**: The product card for "Restaurants" MUST be removed entirely.
- **FR-017**: New product cards MUST be added for HR OS and Gym OS, both with Coming Soon badges.
- **FR-018**: The products section MUST display exactly six cards: Commerce OS, Healthcare OS, HR OS, CRM OS, Gym OS, Maintenance OS.
- **FR-019**: CRM OS and Maintenance OS MUST retain their Coming Soon badges and have updated names (CRM OS, Maintenance OS) replacing plain "CRM" and "Maintenance."

**Platform Model Section**

- **FR-020**: The platform section heading MUST be updated to replace "One Core. Many Apps." with copy that communicates Core Platform and Operating Systems.
- **FR-021**: The platform section description MUST replace "focused business apps" with "Operating Systems."
- **FR-022**: The label "App Satellites" MUST be replaced with "Operating Systems."
- **FR-023**: The tile list in the Operating Systems panel MUST be updated to: Commerce OS, Healthcare OS, HR OS, CRM OS, Gym OS, Maintenance OS.

**Features Section**

- **FR-024**: Any feature card description that refers to "business apps" or "app modules" MUST be updated to use "Operating Systems" where the context is domain products.

### Key Entities

- **OS Product Card**: Name (e.g., "Commerce OS"), tagline, description, badge (active or coming_soon), icon, accent color, glow color.
- **Nav Link**: Label text, anchor target.
- **Section Anchor**: Section identifier used for in-page navigation.
- **Feature Pill**: Short label text shown in the hero.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Zero occurrences of "Shops" as a standalone product name on the entire landing page.
- **SC-002**: Zero occurrences of "Clinics" as a standalone product name on the entire landing page.
- **SC-003**: Zero occurrences of "Restaurants" as a product card on the landing page.
- **SC-004**: The hero headline and description each contain at least one reference to "Business Operating Platform" or "Operating Systems."
- **SC-005**: The products section shows exactly six OS product cards (verified by visual count).
- **SC-006**: All five future OS cards (Healthcare OS, HR OS, CRM OS, Gym OS, Maintenance OS) display a Coming Soon badge.
- **SC-007**: The navbar "Products" link and footer "Products" link both correctly scroll to the products section.
- **SC-008**: No existing section (Features, Platform, Pricing, FAQ, CTA, Footer) has a broken layout or visual regression after the content changes.

---

## Assumptions

- The navbar link label changes from "Apps" to "Products" (concise, scan-friendly for a nav item).
- The section anchor id changes from `apps` to `products`; all three anchor references (navbar, footer, hero CTA) are updated simultaneously to avoid broken links.
- Commerce OS description emphasizes that restaurant/cafe, pharmacy, and other business types are Commerce presets within Commerce OS — not separate products.
- All five future OS cards receive Coming Soon badges with appropriate icons from the existing icon set.
- Lucide icons available in the existing dependency cover all six OS cards (no new packages needed).
- Existing glass-card visual design, hover glow animations, and responsive grid layout are preserved; this spec concerns content and terminology only.
- The `// platform` chip and word-by-word headline animation logic in the hero can stay; only the text content changes.
- Arabic/English localization wiring is out of scope here; it is addressed in spec 038. This spec only updates English copy.
- No changes are made to apps/core-platform, apps/shops-app, or the backend.
