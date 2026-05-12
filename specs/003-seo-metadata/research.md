# Research: SEO & Metadata

**Branch**: `003-seo-metadata` | **Date**: 2026-05-12
**Phase**: 0 — No unknowns; all decisions are standard Next.js patterns

---

## Current State Audit

### `apps/landing/src/app/layout.tsx`

Already present:
- `title: "NexoraXS — Business Operating System"` ✅
- `description: "Modular SaaS platform powering modern businesses..."` ✅ (96 chars, under 160)

Missing:
- `metadataBase` — required for Next.js to resolve relative image URLs in OG/Twitter tags
- `alternates.canonical` — canonical URL
- `robots` — index/follow directive
- `openGraph` — full OG block
- `twitter` — Twitter Card block

### Favicon

`src/app/favicon.ico` exists ✅

Next.js App Router **automatically** detects `favicon.ico` in the `app/` directory and
emits `<link rel="icon" href="/favicon.ico">` in every page's `<head>`. No manual
configuration required. No change needed.

`favicon2.ico` also present — unused, no action needed.

### `public/` directory

Current contents: `branding/`, `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`

Missing:
- `robots.txt` — needs to be created
- `sitemap.xml` — needs to be created

Next.js serves everything in `public/` at the root path. A file at
`public/robots.txt` is accessible at `/robots.txt` with no configuration.

---

## Key Decision: `metadataBase`

**Decision**: Set `metadataBase: new URL("https://www.nexoraxs.com")` in the metadata
export.

**Rationale**: When `metadataBase` is set, Next.js resolves all relative URLs in the
metadata object (e.g. `"/branding/Splash.png"`) to absolute URLs
(`"https://www.nexoraxs.com/branding/Splash.png"`). Social platforms require absolute
URLs for OG images — without `metadataBase`, relative paths are used as-is and
platforms fail to fetch the image.

**Alternative considered**: Hardcode absolute URLs directly in `og.images`. Rejected —
`metadataBase` is the idiomatic Next.js approach and keeps URLs DRY.

---

## Key Decision: OG Image Dimensions

**Decision**: Declare the Splash image with `width: 1200, height: 630` in the OG images
array.

**Rationale**: 1200×630 is the recommended OG image size for Facebook and LinkedIn.
The actual Splash.png may not be exactly these dimensions, but declaring them prevents
platform warnings and helps with layout. Twitter's `summary_large_image` card accepts
any image ≥ 300×157.

---

## Key Decision: Canonical URL Format

**Decision**: Use `alternates: { canonical: "/" }` combined with `metadataBase`.

**Rationale**: Next.js resolves `"/"` against `metadataBase` to produce
`https://www.nexoraxs.com/` — the correct canonical. This is cleaner than hardcoding
the full URL.

---

## Complete Metadata Object (final)

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

---

## robots.txt (final)

```
User-agent: *
Allow: /

Sitemap: https://www.nexoraxs.com/sitemap.xml
```

---

## sitemap.xml (final)

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
