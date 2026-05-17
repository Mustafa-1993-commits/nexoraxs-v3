# Feature Specification: Landing Page Full Polish — Animated Premium SaaS

**Feature Branch**: `034-landing-page-polish`
**Created**: 2026-05-17
**Status**: Draft
**App**: `apps/landing`
**Reference**: NexoraXS-UX-Master-Plan.docx Zone 1

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — First Impression: Premium Visual Experience (Priority: P1)

A prospective customer visits nexoraxs.com for the first time. Within 3 seconds they see an animated, dark-themed page that feels premium — comparable to Vercel or Linear. The gradient background, smooth entrance animations, and polished typography immediately communicate product quality.

**Why this priority**: The landing page is the primary conversion surface. A premium first impression directly impacts sign-up rate and brand credibility.

**Independent Test**: Open the landing page on a desktop browser. Within 3 seconds of load: the hero section is visible with an animated gradient background (visible moving orbs), the headline animates in word-by-word or line-by-line, the CTA buttons slide up into view, and the splash image has a subtle floating animation.

**Acceptance Scenarios**:

1. **Given** the page loads, **When** the user views the hero section, **Then** they see an animated gradient mesh with three visible colored orbs (purple top-left, blue bottom-right, cyan center).
2. **Given** the hero loads, **When** the headline appears, **Then** "Business operations, connected by one modular core" animates in word-by-word or line-by-line using Framer Motion.
3. **Given** the headline finishes, **When** the rest of the hero loads, **Then** the subheadline fades in, the CTA buttons slide up with a stagger delay, and the feature badges fade in with stagger.
4. **Given** the page is scrolled past, **When** the user returns to the top, **Then** the hero animations do NOT replay (animate once only).

---

### User Story 2 — Scroll-Triggered Section Animations (Priority: P1)

A user scrolls through the landing page. Each section — Features, Apps, Pricing, FAQ — enters with smooth scroll-triggered animations as sections come into the viewport. Nothing animates before it's visible; everything animates exactly once.

**Why this priority**: Scroll animations are the second most impactful visual element after the hero. They signal quality and guide the user's attention through the conversion funnel.

**Independent Test**: Scroll slowly through the page. Verify: Features cards fade and stagger in as they enter the viewport; App cards scale in with stagger; Pricing cards fade in; FAQ items stagger in. None of these sections animate before reaching 10% viewport visibility. None replay on scroll back.

**Acceptance Scenarios**:

1. **Given** the Features section is scrolled into view, **When** 10% of the section is visible, **Then** the section title fades in and the feature cards stagger in with fade-up animation.
2. **Given** the Apps section is scrolled into view, **When** visible, **Then** the section title fades in and app cards scale in with stagger.
3. **Given** the Pricing section is scrolled into view, **When** visible, **Then** pricing cards fade in with stagger.
4. **Given** the FAQ section is scrolled into view, **When** visible, **Then** each FAQ item staggers in with fade animation.
5. **Given** the user scrolls back up after seeing a section, **When** they scroll down again, **Then** already-animated sections do NOT re-animate.

---

### User Story 3 — Navbar: Glassmorphism + Mobile Menu (Priority: P1)

A user interacts with the navigation. On desktop, the navbar transitions to a glassmorphism style (blur + border) on scroll. On mobile, the hamburger menu opens a smooth slide-down panel animated with Framer Motion.

**Why this priority**: The navbar is present on the entire page and is the primary navigation element. Mobile menu quality directly affects mobile conversion.

**Independent Test (desktop)**: Scroll 50px — navbar gains `backdrop-blur-md` + `border-b border-white/10` background. Test (mobile): tap hamburger → menu slides down smoothly; tap again → menu slides back up and disappears (AnimatePresence).

**Acceptance Scenarios**:

1. **Given** the page first loads, **When** the navbar is at the top, **Then** it has no visible background (transparent).
2. **Given** the user scrolls 50px or more, **When** the navbar is not at the top, **Then** it transitions to a glassmorphism style (blurred background + subtle bottom border).
3. **Given** a mobile user views the page, **When** they tap the hamburger icon, **Then** the navigation menu slides down smoothly.
4. **Given** the mobile menu is open, **When** the user taps the close icon or a nav link, **Then** the menu slides back up and is removed from the DOM (no invisible space occupied).
5. **Given** the user hovers over a nav link, **When** on desktop, **Then** a smooth underline animation appears.
6. **Given** the user views the navbar CTA button, **When** they hover over it, **Then** a purple-to-blue gradient glow effect appears.

---

### User Story 4 — Feature Cards: Gradient Borders + Hover Effects (Priority: P2)

A user reads through the Features section. Each feature card has a distinctive colored icon background with a glow effect. On hover, the card lifts slightly and the border transitions to a purple-to-blue gradient.

**Why this priority**: Feature cards communicate product value. Premium hover effects increase time-on-section and perceived quality.

**Independent Test**: Hover over each feature card — card lifts (translateY -4px or shadow increase), border transitions to gradient, icon glow intensifies. On mobile: no hover state needed.

**Acceptance Scenarios**:

1. **Given** a feature card is displayed, **When** the user views it at rest, **Then** each card has a colored icon background with a subtle glow matching the feature's accent color.
2. **Given** a desktop user hovers over a feature card, **When** hovering, **Then** the card lifts with a shadow increase and the border shows a purple-to-blue gradient.
3. **Given** the user stops hovering, **When** the card returns to rest, **Then** the transition back is smooth (not abrupt).

---

### User Story 5 — Apps Section: Per-App Accent Colors (Priority: P2)

A user browses the Apps section. Each app card has its own unique accent color. Coming-soon apps are visually dimmed with a blur overlay to signal unavailability without confusion.

**Why this priority**: The multi-app visual communicates the platform's scope. Distinct colors per app reinforce brand identity for each vertical.

**Independent Test**: Confirm Shops app card uses blue accent, Clinics green, Maintenance amber, Restaurants orange (or per spec). Hover on a coming-soon card — scale slightly but with overlay visible. Hover on an available app — scale 1.03 with matching color glow.

**Acceptance Scenarios**:

1. **Given** the Apps section is visible, **When** the user views it, **Then** each app card has a distinct accent color (Shops=blue, Clinics=green, Maintenance=amber, Restaurants=orange).
2. **Given** a coming-soon app card is displayed, **When** the user views it, **Then** the card appears dimmed with a blur overlay and a "Coming Soon" badge.
3. **Given** a desktop user hovers over an available app card, **When** hovering, **Then** the card scales to 1.03 with a matching color shadow/glow.
4. **Given** a desktop user hovers over a coming-soon card, **When** hovering, **Then** the card scales slightly but remains visually subdued.

---

### User Story 6 — FAQ Accordion with Motion (Priority: P2)

A user reads the FAQ. Clicking a question expands the answer with a smooth height animation. Clicking again collapses it smoothly. Only one answer can be open at a time.

**Why this priority**: FAQ UX directly affects pre-signup question resolution. Smooth accordion animation signals quality.

**Independent Test**: Click FAQ item — answer expands smoothly in ~300ms. Click again — collapses smoothly. Click a different item while one is open — first closes, second opens.

**Acceptance Scenarios**:

1. **Given** the FAQ is visible, **When** the user clicks a question, **Then** the answer expands with a smooth height animation (~300ms).
2. **Given** an answer is open, **When** the user clicks the same question, **Then** the answer collapses smoothly.
3. **Given** one FAQ item is open, **When** the user clicks a different item, **Then** the first closes and the second opens.
4. **Given** any FAQ state, **When** the user views the chevron icon, **Then** it rotates 180° when the item is open.

---

### User Story 7 — Pricing: Featured Card Prominence (Priority: P2)

A user views the Pricing section. The featured (Free tier) card is visually dominant — gradient border, background glow, and an "Early Access — Free" badge. Other cards are visually secondary.

**Why this priority**: The pricing section is a key conversion point. Visual hierarchy drives attention to the free tier.

**Independent Test**: The featured pricing card has a visible gradient border (purple-to-blue or similar), a glowing background effect, and a prominent badge. Non-featured cards are visually less prominent.

**Acceptance Scenarios**:

1. **Given** the Pricing section is visible, **When** the user views it, **Then** one card is visually dominant with a gradient border and background glow.
2. **Given** the featured card is displayed, **When** the user views it, **Then** it shows an "Early Access — Free" badge in a prominent position.
3. **Given** the pricing section is scrolled into view, **When** cards animate in, **Then** they stagger-fade in with the featured card drawing the eye.

---

### User Story 8 — Footer: Polished Brand Presence (Priority: P3)

A user reaches the bottom of the page. The footer features the NexoraXS logo prominently, a gradient divider line at the top, and nav links with hover color transitions.

**Why this priority**: The footer is the last touchpoint before a bounce. A polished footer reinforces brand quality and provides navigation alternatives.

**Independent Test**: Footer has a gradient top border (purple→blue→cyan or similar), logo rendered at correct size, and nav links change color smoothly on hover.

**Acceptance Scenarios**:

1. **Given** the footer is visible, **When** the user views it, **Then** a gradient divider line separates the footer from the main content.
2. **Given** the footer logo is displayed, **When** the user views it, **Then** the NexoraXS logo appears at a prominent, readable size.
3. **Given** the user hovers over a footer link, **When** hovering on desktop, **Then** the link color transitions smoothly to the accent color.

---

### User Story 9 — Full Mobile Responsiveness (Priority: P1)

All animations and visual enhancements work correctly on mobile viewports (320px–768px). No horizontal overflow, no layout breaks, no animation jank. Touch interactions feel native.

**Why this priority**: Mobile is the primary browsing device for many users. A broken mobile experience kills conversions.

**Independent Test**: Open the page at 375px width. Verify: hero layout stacks correctly, animations play smoothly, navbar mobile menu works, cards display in single column, no horizontal scroll.

**Acceptance Scenarios**:

1. **Given** a mobile user views the hero, **When** at 375px viewport, **Then** the layout stacks vertically with no horizontal overflow.
2. **Given** a mobile user scrolls, **When** scroll animations trigger, **Then** they play smoothly without jank or layout shift.
3. **Given** a mobile user views any section, **When** content is visible, **Then** cards/items are displayed in a mobile-appropriate grid (1 column or 2 at most).
4. **Given** a mobile user views the page, **When** at any point, **Then** there is no horizontal scrollbar.

---

### Edge Cases

- What if JavaScript is disabled? → Animations are progressive enhancement — content is visible without JS; animations simply don't play.
- What if a user has reduced motion preference? → Respect `prefers-reduced-motion` — animations are disabled or replaced with instant transitions.
- What if the branding images (logo-top.png, Splash.png) fail to load? → Alt text is displayed; layout does not break.
- What if a section has 0 items (e.g., no apps data)? → Section does not render; no empty state required at this stage.
- What if the viewport is very wide (2560px+)? → Layout is constrained to a max-width container (e.g., 1280px) and centered.

---

## Requirements *(mandatory)*

### Functional Requirements

**Navbar**
- **FR-001**: The navbar MUST be transparent at page top and transition to a glassmorphism style (backdrop blur + bottom border) when the user scrolls 50px or more.
- **FR-002**: The logo in the navbar MUST use `logo-top.png` and be displayed at a clean, prominent size.
- **FR-003**: Desktop nav links MUST display a smooth underline animation on hover.
- **FR-004**: The navbar CTA button MUST display a gradient (purple→blue) with a glow effect on hover.
- **FR-005**: Mobile MUST display a hamburger icon; tapping it MUST open a slide-down navigation panel animated with Framer Motion `AnimatePresence`.
- **FR-006**: The mobile menu MUST be removed from the DOM when closed (not just hidden with CSS).

**Hero**
- **FR-007**: The hero MUST display an animated gradient background with three visible colored orbs (purple, blue, cyan) using CSS keyframe animations.
- **FR-008**: The headline text "Business operations, connected by one modular core" MUST animate in word-by-word or line-by-line using Framer Motion.
- **FR-009**: The subheadline MUST fade in after the headline animation.
- **FR-010**: CTA buttons MUST slide up with a stagger delay after the subheadline.
- **FR-011**: Feature badges MUST stagger fade in after the CTA buttons.
- **FR-012**: The Splash.png image MUST display with a subtle floating (vertical translateY) animation using CSS keyframes.
- **FR-013**: All hero animations MUST play only once (not on every scroll-return).

**Features Section**
- **FR-014**: The section title MUST fade in when scrolled into view (threshold 0.1, once: true).
- **FR-015**: Feature cards MUST stagger fade-up into view on scroll.
- **FR-016**: Each feature card MUST have a colored icon background with a subtle glow matching the feature's accent color.
- **FR-017**: On desktop hover, feature cards MUST lift (shadow increase) and show a gradient border (purple→blue).

**Apps Section**
- **FR-018**: The section title MUST fade in on scroll.
- **FR-019**: App cards MUST scale in with stagger on scroll.
- **FR-020**: Each app card MUST have a unique accent color (Shops=blue, Clinics=green, Maintenance=amber, Restaurants=orange or similar).
- **FR-021**: Coming-soon app cards MUST appear dimmed with a blur/overlay and a "Coming Soon" badge.
- **FR-022**: On desktop hover, available app cards MUST scale to 1.03 with a matching color glow; coming-soon cards scale slightly but remain subdued.

**Pricing Section**
- **FR-023**: The featured pricing card MUST have a gradient border and background glow effect.
- **FR-024**: The featured card MUST display an "Early Access — Free" badge.
- **FR-025**: All pricing cards MUST stagger fade in on scroll.

**FAQ Section**
- **FR-026**: FAQ items MUST stagger fade in on scroll.
- **FR-027**: Clicking a FAQ question MUST expand/collapse the answer with a smooth height animation (~300ms).
- **FR-028**: Only one FAQ answer MUST be open at a time (accordion behavior).
- **FR-029**: The chevron icon MUST rotate 180° when an FAQ item is open.

**Footer**
- **FR-030**: The footer MUST have a gradient divider line at the top (purple→blue→cyan or similar).
- **FR-031**: The footer logo MUST be displayed at a prominent, readable size.
- **FR-032**: Footer nav links MUST show a smooth color transition on hover.

**General**
- **FR-033**: All scroll animations MUST use `useInView` with `threshold: 0.1` and `once: true`.
- **FR-034**: The page MUST respect `prefers-reduced-motion` — when active, all Framer Motion animations MUST be disabled or instant.
- **FR-035**: All animations MUST work correctly on mobile viewports (no layout breaks, no jank).
- **FR-036**: No new packages may be added beyond what is already installed (framer-motion is available).
- **FR-037**: `pnpm --filter landing build` MUST pass with zero TypeScript errors after all changes.
- **FR-038**: Existing animation presets from `apps/landing/src/lib/animations.ts` MUST be used where applicable.
- **FR-039**: `@nexoraxs/ui` components (Button, Badge, Icon, etc.) MUST be used where applicable.

### Key Entities

- **Section**: A logical page region (Navbar, Hero, Features, Apps, Pricing, FAQ, Footer) — each polished independently
- **AnimationVariant**: A typed Framer Motion variant from `lib/animations.ts`
- **AppCard**: An application card with accent color, availability status, and hover behavior
- **FAQItem**: A question-answer pair with open/closed state and accordion behavior
- **PricingCard**: A pricing tier card, with one designated as "featured"

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The hero section is fully visible and animated within 3 seconds of page load — no layout shift, no blank content.
- **SC-002**: All 8 sections (Navbar, Hero, Features, Apps, Pricing, FAQ, Footer + Platform/CTA) display their scroll animations exactly once when entering the viewport.
- **SC-003**: The page renders without horizontal scroll at 375px, 768px, 1280px, and 1920px viewport widths.
- **SC-004**: `pnpm --filter landing build` completes with exit code 0 and zero TypeScript errors.
- **SC-005**: The mobile hamburger menu opens and closes with visible animation (no instant show/hide).
- **SC-006**: The FAQ accordion opens and closes with a smooth height animation (~300ms) — no abrupt jumps.
- **SC-007**: The page achieves Shopify/Vercel visual quality level — judged by side-by-side comparison: dark theme, animated orbs, glassmorphism navbar, gradient accents, staggered scroll animations.
- **SC-008**: When `prefers-reduced-motion` is active in the OS, all Framer Motion animation durations are 0 or instant.

---

## Assumptions

- The page structure (sections) already exists; this feature polishes and animates existing sections rather than adding new content sections.
- `framer-motion` is already installed at `^12.38.0` and approved for `apps/landing` (per constitution v1.1.0).
- The 5 animation presets in `lib/animations.ts` (`fadeInUp`, `fadeIn`, `staggerContainer`, `slideInLeft`, `slideInRight`) are the base presets; additional inline variants are acceptable for section-specific animations not covered by the presets.
- `@nexoraxs/ui` is available via `workspace:*` with `transpilePackages` configured.
- `logo-top.png` and `Splash.png` exist in `apps/landing/public/branding/` and are already referenced in the existing code.
- The landing app does NOT have a backend or API — all content is static.
- CSS keyframe animations (for gradient mesh orbs and floating elements) are acceptable alongside Framer Motion; they serve different purposes (continuous looping vs. entrance animations).
- The `prefers-reduced-motion` check will be implemented using Framer Motion's `useReducedMotion` hook or CSS media query.
- Apps shown in the Apps section: Shops (available), Clinics (coming soon), Maintenance (coming soon), Restaurants (coming soon) — based on the existing code structure.
- The Platform section and CTA section already exist and will receive the same scroll animation treatment.
- No new routes are added; all changes are within the existing single-page landing at `/`.
