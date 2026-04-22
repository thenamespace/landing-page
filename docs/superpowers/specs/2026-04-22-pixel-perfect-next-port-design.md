# Design: Pixel-perfect port of namespace.ninja to Next.js

**Status:** Draft for user review
**Date:** 2026-04-22
**Owner:** Next.js port (`namespace-website-next/`)
**Source of truth for visuals:** the checked-in static site at `../namespace-website/` (the Webflow export), specifically `index.html`, `blog.html`, `blog/*.html`, and `legal/*.html` as they exist in this repo today.

---

## 1. Problem

The existing Next.js app at `namespace-website-next/` was scaffolded with a brand-new design system (dark editorial, Instrument Serif, lime accent) instead of cloning the original Webflow design. The landing sections, navbar, footer, and global tokens in `styles/globals.css` are all a different visual language from the live site.

The goal of this project is to make the Next.js app render **pixel-identical output** to the original Webflow export (same fonts, colors, spacing, images, copy, responsive behavior), while replacing the current HTML-injection approach (`app/_legacy/*-body.html`) with **proper React components**.

Out of scope:
- Redesigning anything.
- Changing copy, images, or section order.
- Building new features. The blog pipeline, `/api/subscribe`, SEO metadata, sitemap/RSS, and JSON-LD all stay exactly as they are — they just get reconnected to the new shell.

## 2. Success criteria

1. `/`, `/blog`, `/blog/[slug]`, `/legal/privacy-policy`, `/legal/terms-of-service`, `/legal/disclaimer` all render visually identical to the corresponding page in the static export at `../namespace-website/`.
2. Nothing imports or references `app/_legacy/*.html` at runtime. Those files are deleted at the end of the project.
3. Every landing section is its own named React component under `components/landing/`. No component injects a raw HTML string from `_legacy/`.
4. Navbar, Footer, and page shell are React components, shared across `/`, `/blog`, `/blog/[slug]`, and `/legal/*`.
5. All interactive behavior works: nav dropdowns, mobile menu, marquee, sticky benefits scroll, testimonials Swiper, FAQ accordion, newsletter form.
6. `npm run build` succeeds and `npm run typecheck` passes with zero errors.
7. Lighthouse/Core Web Vitals are no worse than the current static site.

## 3. Architecture

### 3.1 CSS strategy: Webflow as the source of truth

The Webflow shared stylesheet is already in `public/assets/css/namespace-dev.webflow.shared.3f58c4ac4.css`. It defines every class the original markup depends on (`section_*`, `padding-section-*`, `container="large"`, `tag`, `button`, `heading-style-h*`, `text-weight-medium`, `background-color-secondary`, etc.).

Decisions:

- **Load the Webflow CSS globally** in `app/layout.tsx` via a stylesheet `<link>` (so it caches like a normal asset).
- **Keep Tailwind in the project** as a dev-only utility layer (e.g., for trivial layout helpers inside React components), but it will not override any visual. We will remove the custom design tokens from `styles/globals.css` (the `--bg`, `--accent`, `.grid-bg`, `.font-display`, `.post-prose`, etc. that encode the wrong design).
- **Replace `styles/globals.css`** with a minimal file: Tailwind directives + a small block for any post-Webflow overrides that were in the original `index.html`'s inline `<style>` tag (there are a handful — e.g., the benefits sticky media query).
- **Per-page inline `<style>` blocks** from the original (e.g., `_legacy/landing-head.css`, `_legacy/blog-head.css`) get consolidated into one stylesheet, `styles/webflow-page-overrides.css`, imported by the root layout. There are only ~40 lines total across both files.
- **Fonts**: stop importing Geist / Instrument Serif via `next/font`. Use whatever `@font-face` rules the Webflow CSS already declares. The four `@font-face` rules in that file are the canonical font stack and will be honored automatically once we load the CSS.

### 3.2 JS strategy: keep Webflow runtime, re-implement small interactions in React

The original site depends on:
- `webflow.*.js` — Webflow runtime (interactions, dropdowns, forms, responsive breakpoints).
- `gsap.min.js` + `ScrollTrigger.min.js` + `Observer.min.js` — sticky benefits track, scroll-triggered animations.
- Swiper (loaded from Webflow or a CDN) — testimonials and mobile benefits carousel.
- `newsletter.js` — attaches Resend submission to the form.

All of these are already in `public/assets/js/`.

Decisions:

- **Load the original `webflow.*.js` and GSAP bundles via `<Script strategy="afterInteractive" />`** in `app/layout.tsx`. This preserves the marquee, sticky scroll, and Webflow's own small interaction glue without re-implementing it.
- **Swiper** stays via Webflow's bundle for the testimonials + mobile benefits carousel. If Webflow's bundle does not already include Swiper (it usually doesn't — the site was loading `swiper-bundle.min.js` from a CDN), we add that same CDN `<Script>` in the layout.
- **Re-implement four things as real React client components** because they're small and cleaner that way:
  1. **Nav dropdowns** (`Solutions`, `Products` menus on hover/focus).
  2. **Mobile nav toggle** (hamburger → drawer).
  3. **FAQ accordion** (`useState` per item).
  4. **Newsletter form** submission (calls existing `/api/subscribe` route via `fetch`).
  - Rationale: these are trivial state machines where React is clearer than Webflow attribute magic, and it's where the Webflow JS is most likely to double-bind after hydration.
- **Everything else is Webflow-owned**: the sticky benefits track, marquee animation, hero Lottie, testimonials Swiper, scroll-triggered reveals. We leave the Webflow `data-w-id="…"` and `w-variant-*` attributes untouched on those elements so the Webflow runtime can pick them up.

### 3.3 Project structure (target state)

```
app/
├─ layout.tsx                       # Loads Webflow CSS, per-page overrides CSS, Webflow + GSAP JS, fonts, JSON-LD, GA
├─ page.tsx                         # Landing — composes the landing section components
├─ blog/
│  ├─ page.tsx                      # Blog listing — React port of section_blog-overview
│  └─ [slug]/page.tsx               # Blog post — markdown body rendered inside Webflow shell
├─ legal/[slug]/page.tsx            # Legal pages — markdown body inside Webflow shell
├─ api/subscribe/route.ts           # (unchanged)
├─ sitemap.ts / robots.ts / rss.xml / not-found.tsx   # (unchanged)

components/
├─ layout/
│  ├─ PageShell.tsx                 # Wraps children in .page-wrapper > .main-wrapper
│  ├─ Navbar.tsx                    # Webflow-class navbar + React dropdowns + mobile drawer
│  └─ Footer.tsx                    # Webflow-class footer
├─ landing/                         # One component per top-level <section> on the landing page
│  ├─ HomeHeader.tsx                # section_home-header (hero)
│  ├─ LogosMarquee.tsx              # logos marquee band (between hero and case studies)
│  ├─ CaseStudies.tsx               # section_case-studies
│  ├─ Products.tsx                  # section_products (with the offchain/onchain tabs)
│  ├─ Solutions.tsx                 # section_solutions (with Lottie)
│  ├─ Identity.tsx                  # section_identity
│  ├─ UseCases.tsx                  # section_use-cases
│  ├─ Benefits.tsx                  # section_benefits (sticky scroll desktop / Swiper mobile)
│  ├─ Testimonials.tsx              # section_testimonials (Swiper)
│  ├─ Stats.tsx                     # section_stats
│  ├─ Faq.tsx                       # section_faq (with React accordion + filter form)
│  └─ Cta.tsx                       # section_cta
├─ blog/
│  ├─ BlogHeader.tsx                # section_blog-header
│  ├─ BlogOverview.tsx              # section_blog-overview (listing grid)
│  ├─ PostCard.tsx                  # single card — reads markdown frontmatter
│  ├─ PostHeader.tsx                # post hero block
│  ├─ PostBody.tsx                  # renders markdown inside .w-richtext equivalents
│  └─ NewsletterForm.tsx            # React port of newsletter.js
├─ legal/
│  └─ LegalPage.tsx                 # Shared shell for the three legal pages
└─ _abandoned/                      # Current "wrong-design" components, moved here so nothing imports them.
                                     # Deleted once the port is fully green.

content/blog/                        # (unchanged — markdown source for posts)
content/legal/                       # (unchanged — markdown source for legal pages)

lib/
├─ posts.ts / markdown.ts / jsonld.tsx / site.ts   # (unchanged)

public/assets/…                      # (unchanged — css, js, images, lottie, fonts)

styles/
├─ globals.css                       # Minimal: Tailwind directives + a tiny overrides block
├─ webflow-page-overrides.css        # Consolidates the per-page inline <style> from _legacy/*-head.css
└─ _abandoned.css                    # Current wrong-design tokens, parked here until deletion
```

### 3.4 Landing section enumeration (confirmed from `_legacy/landing-body.html`)

In document order:

1. **HomeHeader** — `<header id="hero" class="section_home-header">` — hero with tag chip, h1, subcopy, CTA group, hero visual.
2. **LogosMarquee** — partner logos band right after the hero.
3. **CaseStudies** — `section_case-studies`, "Trusted by Ecosystem Leaders" cards.
4. **Products** — `section_products`, "ENS made easy" with the offchain/onchain product tabs.
5. **Solutions** — `section_solutions`, "When standard tools don't fit" with the line-lottie player.
6. **Identity** — `section_identity`, "Onchain Identity" with the 0xd8dA… resolution diagram.
7. **UseCases** — `section_use-cases`, "How is ENS used today?" card grid.
8. **Benefits** — `section_benefits`, sticky-scroll track on desktop + Swiper on mobile. (Driven by GSAP + Swiper. Media query `.section_benefits { height: 300dvh; }` lives in `_legacy/landing-head.css` and must be preserved in `styles/webflow-page-overrides.css`.)
9. **Testimonials** — `section_testimonials`, Swiper carousel of quotes.
10. **Stats** — `section_stats`.
11. **FAQ** — `section_faq`, filter form + accordion.
12. **Cta** — `section_cta`, final call-to-action card.

Each component emits the same DOM structure as the original HTML: same tag names, same `class=` strings, same `data-wf-*` and `w-variant-*` attributes, same image paths. The data inside (testimonial quotes, FAQ items, logos, case study entries) is **extracted into typed arrays at the top of each component file** so content is editable without touching markup.

### 3.5 Blog and legal

- `app/blog/page.tsx` renders `Navbar` + `<BlogHeader />` + `<BlogOverview posts={posts} />` + `<Cta />` + `Footer`. Posts come from `lib/posts.ts` (unchanged).
- `app/blog/[slug]/page.tsx` renders `Navbar` + `<PostHeader post={post} />` + `<PostBody html={renderedHtml} />` + `<Cta />` + `Footer`. The markdown-to-HTML pipeline stays in `lib/markdown.ts`; the resulting HTML is wrapped in a `.w-richtext`-equivalent container so the Webflow CSS styles headings, links, lists, blockquotes, and images the way the original blog posts do.
- `app/legal/[slug]/page.tsx` reuses `<LegalPage>`, which wraps the legal markdown body in the same Webflow rich-text shell as the blog posts, with a simple header block. Legal copy continues to come from `content/legal/*.md`.

### 3.6 Data flow

- Landing content is static and lives inline in each component file (extracted from `_legacy/landing-body.html`).
- Blog and legal content is read at build time from `content/**/*.md` via the existing `lib/posts.ts`.
- Newsletter form posts to `/api/subscribe`, which is untouched.
- No runtime database, no state management library.

### 3.7 Error and edge handling

- **Missing Webflow JS / CSS**: if for any reason the Webflow bundle fails to load, the page should still render sensibly — sections stay readable, links work, the marquee is static, the testimonials Swiper shows the first slide, the benefits track renders as a normal stack. This is the existing Webflow export behavior; we inherit it by not breaking the markup.
- **Reduced motion**: the original CSS already honors `prefers-reduced-motion`. We preserve those blocks in `styles/webflow-page-overrides.css`.
- **Hydration mismatches**: the four React client components (nav dropdown, mobile menu, FAQ, newsletter form) render initial closed/empty state on the server to match their hydrated state. No time-dependent rendering, no `Math.random()`.
- **Blog post not found**: existing `notFound()` behavior kept.
- **Legal slug not found**: same.

### 3.8 Accessibility

The Webflow export is already reasonable; we keep the same alt text on images, same `aria-*` attributes on the navbar, same semantic headings. The four React re-implementations add:
- `aria-expanded` on nav dropdown triggers and mobile menu button.
- `aria-controls` + `aria-expanded` on FAQ accordion items.
- Proper `<button>` elements (not `<div>`s) for all toggles.
- Focus traps for the mobile drawer when it's open.

### 3.9 Testing strategy

Manual visual QA is the main signal (pixel-perfect is the success criterion).

- **Visual diff**: serve the original `../namespace-website/` via a simple static server and diff side-by-side with `npm run dev` at desktop (1440), tablet (768), and mobile (390) widths. Walk each section top to bottom.
- **Behavioral checklist**: nav dropdowns (hover, focus, keyboard), mobile menu, logo marquee movement, sticky benefits scroll through full range, testimonials Swiper prev/next + swipe, FAQ open/close + filter, newsletter form success/error toast, CTA links open in new tab.
- **Build smoke**: `npm run build && npm run start` produces a working bundle; no console errors on any route.
- **Typecheck**: `npm run typecheck` is green.

No automated visual regression test in this pass — it's high-cost for a one-shot port.

## 4. Risks and open questions

- **Webflow runtime + React hydration conflicts.** Webflow's JS manipulates the DOM (e.g., adding `w--open` classes to dropdowns) which React may overwrite on re-render. Mitigation: for every element whose interactivity is Webflow-owned, the containing component is a **server component** that renders static HTML (no `useState`, no `useEffect` that mutates the same nodes). React client components own their own subtrees.
- **Dropdowns: dual ownership.** The navbar has dropdowns that Webflow's runtime knows how to open, but we're re-implementing them in React for clarity. To avoid both systems fighting, we strip `data-w-id` and `w-dropdown-toggle`-style classes from the navbar markup so Webflow JS leaves the nav alone.
- **Font loading flash.** The `next/font` imports for Geist / Instrument Serif are removed. The Webflow CSS's own `@font-face` rules take over. No FOUT regression expected (original site already lives with whatever flash it has), but worth checking.
- **`_legacy/*.html` deletion timing.** We delete each legacy HTML file only after its React equivalent has been visually verified, so a bad component doesn't block rollback.

## 5. Execution phases

Each phase leaves the site in a runnable, visually coherent state.

1. **Phase 0 — Foundations.** Move wrong-design components to `components/_abandoned/`, move wrong-design tokens to `styles/_abandoned.css`, slim down `styles/globals.css`, wire up Webflow CSS + JS + per-page overrides in `app/layout.tsx`, stop importing Geist/Instrument Serif.
2. **Phase 1 — Chrome.** Build `PageShell`, `Navbar`, `Footer` as React components with Webflow classes. Replace the navbar/footer on all pages.
3. **Phase 2 — Landing.** Port 12 sections (listed in §3.4) one at a time into `components/landing/*.tsx`. Compose in `app/page.tsx`. Delete `_legacy/landing-body.html` and `_legacy/landing-head.css`.
4. **Phase 3 — Blog.** Port blog listing + post pages. Hook up `NewsletterForm`. Delete `_legacy/blog-body.html` and `_legacy/blog-head.css`.
5. **Phase 4 — Legal.** Port the three legal pages to markdown-driven `LegalPage`. Delete the three `_legacy/legal-*.html` files.
6. **Phase 5 — Cleanup + QA.** Delete `components/_abandoned/`, delete `styles/_abandoned.css`, prune unused deps (`next/font` imports, design-system leftovers), final visual QA pass, performance check, ship.

Each phase ends with a working dev server and a manual visual check of the affected page(s) against the original.
