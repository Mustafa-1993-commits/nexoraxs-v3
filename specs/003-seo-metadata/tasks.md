---
description: "Task list for SEO & Metadata"
---

# Tasks: SEO & Metadata

**Input**: Design documents from `specs/003-seo-metadata/`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ quickstart.md ✅
**Tests**: Not in scope — verified by inspecting page source and curl.
**Organization**: Tasks grouped by user story. T002 and T003–T004 are
independent and can run in parallel.

## Format: `[ID] [P?] [Story?] Description — file path`

- **[P]**: Runs in parallel (different files, no dependencies)
- **[Story]**: Maps to user story from spec.md (US1–US3)

---

## Phase 1: Setup

**Purpose**: Confirm environment before any changes.

- [x] T001 Verify `pnpm --filter landing dev` starts and http://localhost:3000 loads; confirm `public/robots.txt` and `public/sitemap.xml` do NOT yet exist (baseline check — no files changed)

**Checkpoint**: Baseline confirmed — proceed.

---

## Phase 2: User Stories 1 & 2 — Search Indexing + Social Sharing (Priority: P1) 🎯 MVP

**Goal**: Page source contains all required meta tags for search engines and social platforms.
**Independent Test**: View page source at http://localhost:3000 and confirm `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<meta name="robots">`, all five `og:*` tags, and all four `twitter:*` tags are present with correct values.

- [x] T002 [US1] [US2] Update `apps/landing/src/app/layout.tsx` — replace the existing `metadata` export entirely with the following (keep all other code in the file unchanged):

  ```typescript
  export const metadata: Metadata = {
    metadataBase: new URL("https://www.nexoraxs.com"),
    title: "NexoraXS — Business Operating System",
    description:
      "Modular SaaS platform powering modern businesses with shared auth, workspaces, and cloud-native apps.",
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      url: "https://www.nexoraxs.com",
      title: "NexoraXS — Business Operating System",
      description:
        "Modular SaaS platform powering modern businesses with shared auth, workspaces, and cloud-native apps.",
      images: [
        {
          url: "/branding/Splash.png",
          width: 1200,
          height: 630,
          alt: "NexoraXS — Business Operating System",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "NexoraXS — Business Operating System",
      description:
        "Modular SaaS platform powering modern businesses with shared auth, workspaces, and cloud-native apps.",
      images: ["/branding/Splash.png"],
    },
  };
  ```

**Checkpoint**: View page source — all meta tags present with correct values. US1 and US2 complete.

---

## Phase 3: User Story 3 — Crawler Discovery Files (Priority: P2)

**Goal**: `robots.txt` and `sitemap.xml` are served correctly from the root.
**Independent Test**: `curl http://localhost:3000/robots.txt` returns the allow-all rule and sitemap reference. `curl http://localhost:3000/sitemap.xml` returns valid XML with the homepage URL.

- [x] T003 [P] [US3] Create `apps/landing/public/robots.txt` with exactly this content:

  ```
  User-agent: *
  Allow: /

  Sitemap: https://www.nexoraxs.com/sitemap.xml
  ```

- [x] T004 [P] [US3] Create `apps/landing/public/sitemap.xml` with exactly this content:

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://www.nexoraxs.com</loc>
      <lastmod>2026-05-12</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
  </urlset>
  ```

**Checkpoint**: Both static files accessible at `/robots.txt` and `/sitemap.xml`. US3 complete.

---

## Phase 4: Verification

**Purpose**: Confirm all success criteria pass end-to-end.

- [x] T005 View page source at http://localhost:3000 and verify every tag from the quickstart checklist is present: `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<meta name="robots">`, all `og:*` and `twitter:*` tags, OG image URL is absolute (`https://www.nexoraxs.com/branding/Splash.png`)
- [x] T006 [P] Run `pnpm --filter landing build` — confirm zero TypeScript errors and zero ESLint errors; note that static files are included in the build output

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — baseline check first
- **US1/US2 (Phase 2)**: Depends on Setup — single file, must complete before verification
- **US3 (Phase 3)**: Depends on Setup — T003 and T004 are parallel (different files)
- **Verification (Phase 4)**: Depends on ALL phases completing

### Parallel Opportunities

```bash
# Phase 3 — run together:
T003: Create public/robots.txt
T004: Create public/sitemap.xml
```

---

## Notes

- T002 is the only non-trivial task — a metadata object replacement in one file
- T003 and T004 are plain-text file creations with no logic
- Favicon requires no action — `src/app/favicon.ico` is auto-served by Next.js
- `[P]` tasks in Phase 3 create different files with no dependencies on each other
