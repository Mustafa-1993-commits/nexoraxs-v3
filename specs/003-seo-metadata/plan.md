# Implementation Plan: SEO & Metadata

**Branch**: `003-seo-metadata` | **Date**: 2026-05-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/003-seo-metadata/spec.md`

---

## Summary

Add production-ready SEO metadata to the NexoraXS landing page using the
Next.js App Router Metadata API. Expand the existing `metadata` export in
`layout.tsx` with `metadataBase`, `alternates`, `robots`, `openGraph`, and
`twitter` blocks. Create `robots.txt` and `sitemap.xml` as static files in
`public/`. No UI changes, no new packages. Total: 3 files touched.

---

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: Next.js 16 Metadata API — no new packages
**Storage**: N/A
**Testing**: Not in scope
**Target Platform**: Any HTTP client (browsers, crawlers, social platforms)
**Project Type**: Configuration / static files
**Performance Goals**: No build regression
**Constraints**: Next.js Metadata API only; no raw JSX meta tags; no new packages
**Scale/Scope**: 1 file updated, 2 files created

---

## Constitution Check

| Principle | Check | Status |
|-----------|-------|--------|
| I. Modular Monolith | All changes inside `apps/landing` | ✅ PASS |
| II. Multi-Tenant Isolation | N/A — no database | ✅ PASS |
| III. App Boundary Enforcement | No cross-app imports | ✅ PASS |
| IV. Type Safety | `Metadata` type from `next` used; no `any` | ✅ PASS |
| V. SDK-First API Access | N/A — no API calls | ✅ PASS |
| VI. Spec-Driven Development | Spec written and validated | ✅ PASS |

---

## Project Structure

### Documentation

```text
specs/003-seo-metadata/
├── plan.md          # This file
├── research.md      # Metadata decisions + final values
├── quickstart.md    # Verification steps
└── tasks.md         # /speckit.tasks output
```

### Source Files

```text
apps/landing/
├── src/app/
│   └── layout.tsx          UPDATE — expand metadata export
└── public/
    ├── robots.txt          CREATE — crawler permissions
    └── sitemap.xml         CREATE — homepage URL entry
```

---

## Implementation Specification

### 1. `layout.tsx` — expand metadata export

Replace the current 2-field metadata object with the full production object.
`title` and `description` values are unchanged; new fields added:

```typescript
import type { Metadata } from "next";

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

The `RootLayout` component and all other content in `layout.tsx` remain
unchanged.

### 2. `public/robots.txt` — create

```
User-agent: *
Allow: /

Sitemap: https://www.nexoraxs.com/sitemap.xml
```

### 3. `public/sitemap.xml` — create

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

---

## Favicon Note

`src/app/favicon.ico` is detected automatically by Next.js App Router and
emitted as `<link rel="icon" href="/favicon.ico">`. No change required.

---

## Complexity Tracking

No constitution violations. No complexity justification required.
