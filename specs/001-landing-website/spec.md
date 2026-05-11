# Feature Specification: NexoraXS Landing Website

**Feature Branch**: `001-landing-website`
**Created**: 2026-05-11
**Status**: Draft
**Scope**: `apps/landing` only — no backend, no other apps

---

## User Scenarios & Testing

### User Story 1 — First-time Visitor Understands the Product (Priority: P1)

A potential customer lands on nexoraxs.com for the first time. Within seconds
they can read what NexoraXS is, see the key benefits, and find a clear call to
action to get started.

**Why this priority**: Without a clear value proposition above the fold, all
other sections are irrelevant. This is the highest-impact story for conversion.

**Independent Test**: Open the homepage. Without scrolling, a new visitor can
read the headline, subheadline, and click "Get Started" — delivering a
complete above-the-fold experience.

**Acceptance Scenarios**:

1. **Given** a visitor opens the homepage, **When** the page loads,
   **Then** the navbar shows the NexoraXS logo, navigation links
   (Features, Apps, Pricing, FAQ), and a "Get Started" CTA button.

2. **Given** a visitor views the hero section, **When** they read it,
   **Then** they see a headline, a subheadline that explains what the
   platform does, a CTA button, and a supporting visual.

3. **Given** a visitor is on mobile, **When** they load the page,
   **Then** the navbar collapses to a mobile-friendly menu and all
   hero content is readable without horizontal scrolling.

---

### User Story 2 — Visitor Explores Features and Apps (Priority: P2)

A visitor who scrolled past the hero wants to understand exactly what
NexoraXS offers. They can see the platform's key features and browse the
suite of business apps available.

**Why this priority**: After the value proposition, feature proof is the next
decision gate before a visitor considers signing up.

**Independent Test**: The Features and Apps sections are individually
viewable and convey distinct value — features describe platform benefits,
apps showcase specific business tools.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls to the Features section, **When** they read it,
   **Then** they see 3–6 cards each with an icon, a short title, and a
   one-paragraph description of a platform capability.

2. **Given** a visitor scrolls to the Apps section, **When** they view it,
   **Then** they see cards for each NexoraXS app (Shops, Clinics,
   Maintenance, Restaurants, CRM) with a name and short description.

3. **Given** a visitor is on a tablet or phone, **When** they scroll through
   both sections, **Then** cards reflow into a single-column or two-column
   grid and remain fully readable.

---

### User Story 3 — Visitor Reviews Pricing and Gets Answers to Questions (Priority: P3)

A visitor who is nearly convinced wants to know the cost and resolve any
remaining doubts before signing up.

**Why this priority**: Pricing and FAQ handle objections — critical for
conversion but only reached after P1 and P2 succeed.

**Independent Test**: The Pricing section shows either a "Coming Soon"
message or plan cards with names and descriptions. The FAQ section shows at
least 4 collapsible questions that expand on click.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls to the Pricing section, **When** they view it,
   **Then** they see either a "Coming Soon" placeholder or up to 3 plan
   cards (Free, Pro, Enterprise) each with a name and key details.

2. **Given** a visitor scrolls to the FAQ section, **When** they see a
   question, **Then** they can click it to expand the answer; clicking again
   collapses it.

3. **Given** any section link is clicked in the navbar, **When** the click
   occurs, **Then** the page smoothly scrolls to that section without a full
   page reload.

---

### User Story 4 — Visitor Finds Contact and Navigation in the Footer (Priority: P4)

A visitor who reached the bottom of the page needs easy access to key links
and basic company information without scrolling back to the top.

**Why this priority**: The footer is a low-effort, high-utility section that
completes the page structure.

**Independent Test**: The footer is independently viewable and contains the
logo, navigation links, and a copyright notice.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the footer, **When** they look at it,
   **Then** they see the NexoraXS logo, navigation links grouped by
   category, and a copyright line.

2. **Given** a visitor is on mobile, **When** they view the footer,
   **Then** all links and the logo stack vertically and remain tappable.

---

### Edge Cases

- What happens when a branding image (logo, splash) fails to load? The layout
  must not break — text content must remain readable.
- What happens when the page is viewed on a very small screen (320px width)?
  Content must still be legible with no horizontal overflow.
- What happens if the user's browser has JavaScript disabled? The page
  structure and text must still be visible (FAQ collapse may degrade gracefully
  to always-expanded).

---

## Requirements

### Functional Requirements

- **FR-001**: The navbar MUST display the NexoraXS logo, links to Features,
  Apps, Pricing, and FAQ sections, and a "Get Started" CTA button.

- **FR-002**: The navbar MUST remain accessible at the top of the viewport on
  all screen sizes; on mobile it MUST provide a collapsed navigation menu.

- **FR-003**: Each navbar link MUST trigger smooth scroll to the corresponding
  section on the same page.

- **FR-004**: The hero section MUST display a headline, a subheadline, a
  primary CTA button ("Get Started"), and a supporting visual using the
  existing branding assets from `public/branding/`.

- **FR-005**: The features section MUST display between 3 and 6 feature cards.
  Each card MUST contain an icon, a title, and a short description.

- **FR-006**: The apps section MUST showcase all five NexoraXS apps: Shops,
  Clinics, Maintenance, Restaurants, and CRM. Each app MUST show a name and
  a brief description of its purpose.

- **FR-007**: The pricing section MUST display either a "Coming Soon"
  placeholder message or up to 3 plan tiers (Free, Pro, Enterprise) with
  a name and key details per tier.

- **FR-008**: The FAQ section MUST display between 4 and 6 questions. Each
  question MUST be individually expandable and collapsible. Only the question
  text is visible by default; the answer expands on user interaction.

- **FR-009**: The footer MUST display the NexoraXS logo, categorised
  navigation links, and a copyright notice.

- **FR-010**: The entire page MUST be fully responsive across mobile
  (≥320px), tablet (≥768px), and desktop (≥1280px) viewports.

- **FR-011**: The page MUST use the dark design system: dark background,
  with blue, purple, and cyan accent colours, consistent across all sections.

- **FR-012**: Each section MUST be implemented as its own isolated file under
  `apps/landing/src/sections/`. The root page file MUST only compose sections.

### Key Entities

- **Section**: A distinct full-width content block of the page (Navbar, Hero,
  Features, Apps, Pricing, FAQ, Footer). Each section is self-contained.
- **Feature Card**: A UI card within the Features section containing an icon,
  title, and description representing one platform capability.
- **App Card**: A UI card within the Apps section representing one NexoraXS
  business app (name + description).
- **Plan Card**: A UI card within the Pricing section representing one
  subscription tier.
- **FAQ Item**: A collapsible row containing a question and a hidden answer
  that reveals on interaction.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: The development server starts without errors and the homepage
  loads within 3 seconds on a standard broadband connection.

- **SC-002**: A production build completes without errors or type warnings.

- **SC-003**: All seven sections (Navbar, Hero, Features, Apps, Pricing, FAQ,
  Footer) are visible and fully readable on a 375px-wide mobile screen without
  horizontal scrolling.

- **SC-004**: All seven sections are visible and fully readable on a
  1440px-wide desktop screen.

- **SC-005**: A first-time visitor can identify the product name, understand
  the value proposition, and locate the "Get Started" button within 10 seconds
  of page load without any prior context.

- **SC-006**: Every navbar link scrolls the page to the correct section in a
  visually smooth motion.

- **SC-007**: Every FAQ item expands and collapses correctly on both mouse
  click and touch tap.

- **SC-008**: The page carries no console errors or warnings in a standard
  browser during normal use.

---

## Assumptions

- The branding images (`logo-top.png`, `logo-bottom.png`, `Splash.png`) in
  `apps/landing/public/branding/` are the final approved assets and require
  no modifications.
- Pricing details are not yet finalised; the "Coming Soon" placeholder is
  acceptable for the initial release.
- The existing `apps/landing` Next.js app is already bootstrapped and runnable
  with `pnpm dev` — this spec covers content and structure only.
- No new npm/pnpm packages will be installed; all UI is built with the
  existing TailwindCSS setup and any utilities already present in the
  `packages/` directory.
- The five apps showcased (Shops, Clinics, Maintenance, Restaurants, CRM) use
  placeholder descriptions for now; real copy will be supplied separately.
- Authentication and sign-up flows are out of scope — the "Get Started" CTA
  links to the core-platform app URL and does not implement a form on the
  landing page.
- SEO meta tags and analytics integrations are out of scope for this spec.
