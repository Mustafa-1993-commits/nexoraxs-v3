# Feature Specification: SEO & Metadata

**Feature Branch**: `003-seo-metadata`
**Created**: 2026-05-12
**Status**: Draft
**Scope**: `apps/landing` only — metadata, sitemap, robots.txt only; no UI changes, no new packages, no backend

---

## User Scenarios & Testing

### User Story 1 — Search Engine Correctly Indexes the Page (Priority: P1)

A search engine crawler visits nexoraxs.com and finds all the signals it
needs to correctly index and rank the page: a descriptive title, a compelling
meta description, a canonical URL, and a robots directive allowing indexing.

**Why this priority**: Without correct indexing signals, the landing page
cannot be discovered organically. This is the highest-priority SEO concern.

**Independent Test**: View the page source at http://localhost:3000. Verify
the `<title>` tag reads "NexoraXS — Business Operating System", a
`<meta name="description">` tag is present and under 160 characters, a
`<link rel="canonical">` points to `https://www.nexoraxs.com`, and a
`<meta name="robots">` tag is set to `index, follow`.

**Acceptance Scenarios**:

1. **Given** a search engine crawler fetches the page, **When** it reads the
   `<head>`, **Then** it finds a `<title>` tag with the value
   `"NexoraXS — Business Operating System"`.

2. **Given** a search engine reads the head, **When** it looks for the
   description, **Then** it finds a `<meta name="description">` tag with
   a compelling description under 160 characters.

3. **Given** a crawler checks for duplicate content signals, **When** it
   reads the head, **Then** it finds a `<link rel="canonical">` pointing to
   `https://www.nexoraxs.com`.

4. **Given** a crawler checks crawl permissions, **When** it reads the head,
   **Then** it finds `<meta name="robots" content="index, follow">`.

---

### User Story 2 — Social Sharing Shows a Rich Preview (Priority: P1)

When a user shares the nexoraxs.com URL on LinkedIn, Facebook, Twitter/X,
Slack, or WhatsApp, the platform renders a rich card with the NexoraXS brand
image, title, and description rather than a blank or broken preview.

**Why this priority**: Social previews are a direct conversion channel.
A broken or missing OG card reduces click-through rate on shared links.

**Independent Test**: Use the Facebook Sharing Debugger or Twitter Card
Validator (or inspect page source) to verify Open Graph and Twitter Card
tags are present with correct values: title, description, image URL pointing
to the Splash branding image, and the site URL.

**Acceptance Scenarios**:

1. **Given** a user shares the URL on a social platform, **When** the
   platform fetches the link preview, **Then** it finds `og:title`,
   `og:description`, `og:image`, `og:url`, and `og:type` meta tags.

2. **Given** a user shares the URL on Twitter/X, **When** the platform
   fetches the preview, **Then** it finds `twitter:card`, `twitter:title`,
   `twitter:description`, and `twitter:image` tags.

3. **Given** the OG image tag is present, **When** a platform fetches it,
   **Then** the image URL resolves to the NexoraXS Splash branding image
   at `https://www.nexoraxs.com/branding/Splash.png`.

---

### User Story 3 — Crawlers Can Discover and Respect Indexing Rules (Priority: P2)

Search engine crawlers and bots visit nexoraxs.com/robots.txt and
nexoraxs.com/sitemap.xml to understand crawl permissions and discover
the pages available on the site.

**Why this priority**: robots.txt and sitemap.xml are standard crawler
entrypoints. Their absence is not a hard failure, but their presence
signals a professionally maintained site.

**Independent Test**: Open http://localhost:3000/robots.txt — verify a valid
robots.txt file is served. Open http://localhost:3000/sitemap.xml — verify
an XML file is served with at least one URL entry for the homepage.

**Acceptance Scenarios**:

1. **Given** a crawler fetches `/robots.txt`, **When** it reads the file,
   **Then** it finds a valid `robots.txt` that allows all crawlers to access
   all paths and references the sitemap URL.

2. **Given** a crawler fetches `/sitemap.xml`, **When** it reads the file,
   **Then** it finds a valid XML sitemap containing at least one `<url>`
   entry for `https://www.nexoraxs.com`.

---

### Edge Cases

- What if the OG image path is relative rather than absolute? Social
  platforms require an absolute URL — the image must be referenced with
  the full domain (`https://www.nexoraxs.com/branding/Splash.png`).
- What if the favicon is missing or not linked? The favicon file already
  exists; this feature verifies it is correctly referenced in the head.
- What if the meta description exceeds 160 characters? Search engines
  truncate it, reducing its effectiveness. It must be kept under 160 chars.

---

## Requirements

### Functional Requirements

- **FR-001**: The page `<title>` MUST read exactly
  `"NexoraXS — Business Operating System"`.

- **FR-002**: A `<meta name="description">` tag MUST be present with content
  that is compelling, accurate, and strictly under 160 characters.

- **FR-003**: A `<link rel="canonical">` tag MUST point to
  `https://www.nexoraxs.com`.

- **FR-004**: A `<meta name="robots">` tag MUST be set to `index, follow`.

- **FR-005**: The following Open Graph tags MUST be present:
  - `og:type` → `website`
  - `og:url` → `https://www.nexoraxs.com`
  - `og:title` → `"NexoraXS — Business Operating System"`
  - `og:description` → same value as the meta description
  - `og:image` → `https://www.nexoraxs.com/branding/Splash.png`

- **FR-006**: The following Twitter Card tags MUST be present:
  - `twitter:card` → `summary_large_image`
  - `twitter:title` → `"NexoraXS — Business Operating System"`
  - `twitter:description` → same value as the meta description
  - `twitter:image` → `https://www.nexoraxs.com/branding/Splash.png`

- **FR-007**: The favicon MUST be correctly linked in the page head.
  The existing favicon file at `src/app/favicon.ico` MUST be served.

- **FR-008**: A `robots.txt` file MUST be present at
  `apps/landing/public/robots.txt`, allowing all crawlers to access all
  paths and referencing the sitemap URL.

- **FR-009**: A `sitemap.xml` file MUST be present at
  `apps/landing/public/sitemap.xml`, containing at least one `<url>` entry
  for `https://www.nexoraxs.com` with a `<lastmod>` date.

- **FR-010**: All metadata MUST be implemented using the Next.js App Router
  `Metadata` API (the `metadata` export in `layout.tsx`) — no raw `<meta>`
  tags in JSX.

- **FR-011**: No new npm packages MAY be installed. No UI or styling changes
  MAY be made. No other apps MAY be modified.

### Key Entities

- **Metadata object**: The `metadata` export in `apps/landing/src/app/layout.tsx` — the single source of truth for all head tags.
- **robots.txt**: A plain-text file at `apps/landing/public/robots.txt` — served statically by Next.js at `/robots.txt`.
- **sitemap.xml**: An XML file at `apps/landing/public/sitemap.xml` — served statically by Next.js at `/sitemap.xml`.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: The page `<title>` in the rendered HTML exactly matches
  `"NexoraXS — Business Operating System"`.

- **SC-002**: The meta description is present and its content is fewer than
  160 characters.

- **SC-003**: All 5 Open Graph tags (`og:type`, `og:url`, `og:title`,
  `og:description`, `og:image`) are present in the page source with
  correct values.

- **SC-004**: All 4 Twitter Card tags (`twitter:card`, `twitter:title`,
  `twitter:description`, `twitter:image`) are present in the page source.

- **SC-005**: `GET /robots.txt` returns a 200 response with valid content.

- **SC-006**: `GET /sitemap.xml` returns a 200 response with valid XML
  containing the homepage URL.

- **SC-007**: A production build (`pnpm build`) completes with zero
  TypeScript errors and zero ESLint errors.

---

## Assumptions

- The domain `https://www.nexoraxs.com` is the canonical production URL.
  All absolute URLs in metadata use this domain.
- The Splash branding image (`public/branding/Splash.png`) is the approved
  OG/Twitter share image. It is already present in the repository.
- The favicon (`src/app/favicon.ico`) already exists and Next.js App Router
  serves it automatically — no additional linking is required beyond
  verifying the file exists.
- The sitemap.xml is a static placeholder for now; dynamic sitemap
  generation is out of scope.
- Analytics tags (Google Analytics, Meta Pixel, etc.) are out of scope.
- Structured data (JSON-LD schema) is out of scope.
