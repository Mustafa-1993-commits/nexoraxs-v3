# Quickstart: SEO & Metadata

**Branch**: `003-seo-metadata` | **Date**: 2026-05-12

## Run Dev Server

```bash
pnpm --filter landing dev
# → http://localhost:3000
```

## Verify Meta Tags in Page Source

Open http://localhost:3000, then View Page Source (Ctrl+U / Cmd+U).

Search for the following and confirm each is present:

```html
<!-- Title -->
<title>NexoraXS — Business Operating System</title>

<!-- Description -->
<meta name="description" content="Modular SaaS platform..."/>

<!-- Canonical -->
<link rel="canonical" href="https://www.nexoraxs.com/"/>

<!-- Robots -->
<meta name="robots" content="index, follow"/>

<!-- Open Graph -->
<meta property="og:type" content="website"/>
<meta property="og:url" content="https://www.nexoraxs.com"/>
<meta property="og:title" content="NexoraXS — Business Operating System"/>
<meta property="og:description" content="..."/>
<meta property="og:image" content="https://www.nexoraxs.com/branding/Splash.png"/>

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="NexoraXS — Business Operating System"/>
<meta name="twitter:description" content="..."/>
<meta name="twitter:image" content="https://www.nexoraxs.com/branding/Splash.png"/>

<!-- Favicon (auto-linked by Next.js) -->
<link rel="icon" href="/favicon.ico"/>
```

## Verify Static Files

```bash
# robots.txt
curl http://localhost:3000/robots.txt
# Expected: User-agent: * / Allow: / / Sitemap: ...

# sitemap.xml
curl http://localhost:3000/sitemap.xml
# Expected: <?xml version="1.0"...><urlset>...</urlset>
```

## Run Build

```bash
pnpm --filter landing build
# Expect: zero TypeScript errors, zero ESLint errors
```

## File Locations

| Artifact | Path |
|----------|------|
| Metadata | `apps/landing/src/app/layout.tsx` |
| robots.txt | `apps/landing/public/robots.txt` |
| sitemap.xml | `apps/landing/public/sitemap.xml` |
| Favicon | `apps/landing/src/app/favicon.ico` (auto-served) |
| OG image | `apps/landing/public/branding/Splash.png` (existing) |
