# Namespace Website (Next.js)

The official [namespace.ninja](https://namespace.ninja) website, rebuilt on
**Next.js 15 (App Router) + TypeScript + Tailwind**.

Goals of this migration:

- **Pixel-perfect clone** of the current static site on first launch
- **Markdown-driven blog** sourced from `content/blog/*.md`
- **Strong SEO**: dynamic sitemap, RSS, JSON-LD per page, metadata API
- **Clean deploy** on Vercel with a simple Resend newsletter API route

---

## Quickstart

```bash
# 1. Install dependencies (Node 20+)
npm install

# 2. Copy env and fill secrets
cp .env.example .env.local
# RESEND_API_KEY, RESEND_AUDIENCE_ID — for /api/subscribe
# NEXT_PUBLIC_SITE_URL — defaults to https://namespace.ninja
# NEXT_PUBLIC_GA_ID    — defaults to G-1K699QQ114

# 3. Run dev server
npm run dev
# → http://localhost:3000
```

---

## Project structure

```
app/
├─ layout.tsx            # Root layout: fonts, GA, Webflow CSS, base metadata
├─ page.tsx              # Landing page
├─ blog/
│  ├─ page.tsx           # Blog listing
│  └─ [slug]/page.tsx    # Blog post (reads from content/blog/*.md)
├─ legal/[slug]/page.tsx # /legal/privacy-policy, /legal/terms-of-service, /legal/disclaimer
├─ not-found.tsx         # Custom 404
├─ sitemap.ts            # Dynamic sitemap
├─ robots.ts             # Robots + AI crawler rules
├─ rss.xml/route.ts      # RSS feed for /blog
└─ api/subscribe/route.ts# Resend newsletter endpoint

components/
├─ layout/
│  ├─ ChromeStatic.tsx   # Navbar + Footer
│  └─ PageShell.tsx      # page-wrapper + main-wrapper used by blog/legal pages
├─ blog/
│  ├─ BlogPreview.tsx
│  └─ BlogSubscribe.tsx
└─ landing/              # Landing page sections

content/blog/             # Source of truth for posts (markdown)
lib/
├─ posts.ts              # Frontmatter + markdown loader
├─ markdown.ts           # remark/rehype pipeline (GFM + raw HTML passthrough)
├─ jsonld.tsx            # Schema.org helpers
└─ site.ts               # Site constants (name, URL, GA ID, etc.)

public/                   # All static assets (images, videos, css, js, .well-known)
styles/
├─ globals.css           # Tailwind + post-prose styles
└─ webflow-overrides.css # Webflow CSS overrides
```

---

## Blog authoring

1. Drop a new `.md` file in `content/blog/`
2. Fill the standard frontmatter (see `content/blog/README.md`)
3. Commit and push — Vercel will rebuild with the new post

Supported frontmatter:

```yaml
title: Your Post Title
slug: your-post-slug
description: One-sentence SEO description
excerpt: Short card summary
date: 2026-04-22
updated: 2026-04-22
image: /assets/images/cover.png
imageAlt: Accessible description
tag: ENS
format: markdown   # or "html" to keep a legacy rich-text post as-is
```

Posts marked `draft: true` are skipped. Posts with `format: html` render their
body verbatim (used for older Substack-imported posts). Everything else goes
through the remark/rehype pipeline with GFM + autolinked headings.

---

## SEO

- Per-page metadata via Next 15 metadata API (OG, Twitter, canonical)
- `JsonLd` for `Organization`, `WebSite`, `Article`, `BreadcrumbList`
- Dynamic `sitemap.xml`, `robots.txt`, and `/rss.xml`
- `/llms.txt`, `/llms-full.txt`, `/.well-known/*` served from `public/`
- AI crawler allowlist baked into `robots.ts`

---

## Deploying to Vercel

1. Push this repo to GitHub
2. Import into Vercel
3. Set env vars in Project Settings:
   - `RESEND_API_KEY`
   - `RESEND_AUDIENCE_ID`
   - `NEXT_PUBLIC_SITE_URL` (optional, defaults to production URL)
   - `NEXT_PUBLIC_GA_ID` (optional, defaults to `G-1K699QQ114`)
4. Deploy. All redirects from legacy `.html` URLs are handled in `next.config.ts`.
