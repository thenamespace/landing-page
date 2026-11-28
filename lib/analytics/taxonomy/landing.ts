// GENERATED from webapp/packages/analytics/src by `pnpm --filter @namespace/analytics sync:landing`.
// Do not edit here; change the source and re-run the sync.
/**
 * Landing page (namespace.ninja) custom events. Autocapture, $pageview, $pageleave, heatmaps,
 * scroll depth and web vitals come for free and are not listed here.
 * Paths are relative to `landing-page/`.
 */
import { defineEvent, p } from "./schema";

export const ctaPlacements = [
  "navbar",
  "navbar_mobile",
  "announcement_bar",
  "home_hero",
  "home_products",
  "home_case_studies",
  "home_blog_preview",
  "cta_section",
  "about_hero",
  "about_index",
  "solution_hero",
  "solution_terminal",
  "solution_split_stats",
  "solution_final",
  "solution_cta_cards",
  "solution_decks",
  "blog_index",
  "blog_post",
  "footer",
  "not_found",
  // Any other section of a page.
  "page_body",
] as const;

export const ctaDestinations = [
  "app",
  "docs",
  "book_call",
  "blog",
  "solution",
  "social",
  "github",
  "product_site",
  "deck",
  "legal",
  "anchor",
  "external",
  // Another page on namespace.ninja (about, home, legal).
  "internal",
] as const;

const ctaProps = {
  cta_destination: p.enum(ctaDestinations, "What the CTA leads to."),
  cta_id: p.string(
    "Stable kebab-case id of the CTA, e.g. home-hero-launch-app.",
  ),
  cta_label: p.string("Visible label at click time."),
  cta_placement: p.enum(ctaPlacements, "Where on the page the CTA lives."),
  destination_host: p.string("Host of the href, e.g. app.namespace.ninja."),
  destination_path: p.optional(
    p.string("Path on the destination, e.g. /offchain."),
  ),
  destination_url: p.string(
    "Resolved href (without query string for internal links).",
  ),
  is_external: p.boolean("Opens a different host."),
  opens_new_tab: p.boolean("target=_blank."),
} as const;

export const landingEvents = {
  "landing:announcement_dismiss": defineEvent({
    description: "Announcement bar dismissed.",
    props: { announcement_id: p.string("SITE.announcement id/text hash.") },
    trigger: "components/layout/AnnouncementBar.tsx dismiss handler.",
  }),
  "landing:blog_card_click": defineEvent({
    description: "Post card clicked on the blog index or home blog preview.",
    props: {
      card_position: p.number("0-based position."),
      is_featured: p.boolean("The featured (first) post."),
      list_location: p.enum(["blog_index", "home_blog_preview"], "Which list."),
      to_post_slug: p.string("Clicked post slug."),
    },
    trigger:
      "app/blog/page.tsx cards; components/landing/BlogPreview.tsx cards.",
  }),
  "landing:book_call_complete": defineEvent({
    description:
      "Meeting booked (Cal 'bookingSuccessful' / 'bookingSuccessfulV2').",
    isCritical: true,
    props: {
      call_source: p.enum(ctaPlacements, "Section of the last trigger."),
      event_duration_min: p.optional(
        p.number("Booked meeting length, if in the payload."),
      ),
      seconds_since_open: p.optional(
        p.number("Time from book_call_open to booking."),
      ),
    },
    trigger:
      "lib/cal.ts cal('on', { action: 'bookingSuccessfulV2' }). Never forward attendee name/email.",
  }),
  "landing:book_call_fail": defineEvent({
    description:
      "Cal embed failed to load (Cal 'linkFailed') or threw and fell back to window.open.",
    props: {
      failure_reason: p.enum(["link_failed", "embed_error"], "Failure kind."),
    },
    trigger:
      "lib/cal.ts cal('on', { action: 'linkFailed' }) and openCalModal catch.",
  }),

  // ── Book a call (Cal.com) ────────────────────────────────────────────────────────────────
  "landing:book_call_open": defineEvent({
    description:
      "User asked to book a call; the Cal modal opened or a new tab was used.",
    isCritical: true,
    props: {
      call_source: p.enum(
        ctaPlacements,
        "Section of the page that holds the trigger.",
      ),
      open_mode: p.enum(
        ["modal", "new_tab", "new_tab_fallback"],
        "Modal, plain link, or fallback because the embed was not ready or failed.",
      ),
      was_prewarmed: p.boolean("warmCal ran (hover/focus) before the click."),
    },
    trigger:
      "lib/cal.ts handleCalClick (l.74) / openCalModal (l.68); plain cal.com links via cta_click wrapper too.",
  }),
  "landing:book_call_view": defineEvent({
    description:
      "Cal booking page finished loading inside the modal (Cal 'linkReady').",
    props: {
      call_source: p.enum(ctaPlacements, "Section of the last trigger."),
    },
    trigger:
      "lib/cal.ts after api('ui') (l.47): cal('on', { action: 'linkReady' }).",
  }),
  "landing:case_study_click": defineEvent({
    description: "Case study card clicked.",
    props: {
      card_position: p.number("0-based position."),
      case_study_id: p.enum(
        ["celo", "unicorn", "filecoin", "pinme"],
        "Card id (data, not the link).",
      ),
      destination_url: p.string("Card href."),
    },
    trigger: "components/landing/CaseStudies.tsx card links (l.9-38).",
  }),
  // ── CTAs and navigation ──────────────────────────────────────────────────────────────────
  "landing:cta_click": defineEvent({
    description:
      "User clicked an instrumented CTA or link (buttons, cards, nav and footer links).",
    isCritical: true,
    props: ctaProps,
    trigger:
      "components/ui/WebflowButton.tsx onClick (new ctaId/placement props); local WfButton in Navbar.tsx:46 and HomeHeader.tsx:110; plain <a> in server components via a tiny <TrackedLink> client wrapper.",
  }),
  "landing:faq_category_select": defineEvent({
    description: "Home FAQ category chip selected.",
    props: {
      faq_category: p.enum(
        ["General", "Integrations", "Technology"],
        "Selected category.",
      ),
    },
    trigger: "components/landing/Faq.tsx category chips (l.51, l.72).",
  }),
  "landing:faq_toggle": defineEvent({
    description: "FAQ question expanded or collapsed.",
    props: {
      faq_category: p.optional(
        p.enum(["General", "Integrations", "Technology"], "Home FAQ category."),
      ),
      faq_location: p.enum(["home", "solution"], "Which FAQ component."),
      is_open: p.boolean("State after the toggle."),
      question: p.string("Question text (public copy)."),
      question_index: p.number("0-based index in the visible list."),
    },
    trigger:
      "components/landing/Faq.tsx toggle (l.23); components/solutions/SolutionFaq.tsx (l.34/43).",
  }),
  "landing:lookup_demo_run": defineEvent({
    description: "Interactive lookup lifecycle demo run on a solution page.",
    props: {
      demo_input: p.optional(
        p.string("Chip / example selected (public demo values only)."),
      ),
      run_method: p.enum(["chip", "button"], "How it was triggered."),
    },
    trigger:
      "components/solutions/LookupLifecycle.tsx chips (l.173) and run button (l.536).",
  }),
  "landing:mobile_menu_toggle": defineEvent({
    description: "Mobile menu opened or closed.",
    props: { is_open: p.boolean("Menu state after the toggle.") },
    trigger: "components/layout/Navbar.tsx mobile toggle (l.434).",
  }),
  "landing:name_try_click": defineEvent({
    description: "TLD-swap 'click me' sketch clicked in Products.",
    props: { click_count: p.number("Clicks so far this pageview.") },
    trigger: "components/landing/NameTry.tsx (l.29-33).",
  }),
  "landing:nav_menu_open": defineEvent({
    description: "Navbar dropdown opened.",
    props: {
      menu: p.enum(["solutions", "products", "community"], "Which dropdown."),
      open_method: p.enum(["hover", "click"], "How it was opened."),
    },
    trigger: "components/layout/Navbar.tsx Dropdown open (l.314-352).",
  }),
  "landing:newsletter_complete": defineEvent({
    description: "Newsletter signup succeeded (including already-subscribed).",
    isCritical: true,
    props: {
      form_id: p.enum(
        ["blog-subscribe-form-home", "blog-subscribe-form-page"],
        "SubscribeForm formId.",
      ),
      is_already_subscribed: p.boolean("API answered 'Already subscribed'."),
    },
    trigger:
      "SubscribeForm.tsx success branch (l.38-42); also $set is_newsletter_subscriber.",
  }),
  "landing:newsletter_fail": defineEvent({
    description: "Newsletter signup failed.",
    props: {
      failure_reason: p.enum(
        ["invalid_email", "rate_limited", "server_error", "network_error"],
        "Mapped from HTTP status / fetch error.",
      ),
      form_id: p.enum(
        ["blog-subscribe-form-home", "blog-subscribe-form-page"],
        "SubscribeForm formId.",
      ),
    },
    trigger: "SubscribeForm.tsx error branches (l.43-49).",
  }),

  // ── Newsletter ───────────────────────────────────────────────────────────────────────────
  "landing:newsletter_submit": defineEvent({
    description: "Newsletter form submitted (before the API answers).",
    props: {
      form_id: p.enum(
        ["blog-subscribe-form-home", "blog-subscribe-form-page"],
        "SubscribeForm formId.",
      ),
    },
    trigger:
      "components/landing/SubscribeForm.tsx handleSubmit (l.25). Never send the email.",
  }),

  // ── Misc ─────────────────────────────────────────────────────────────────────────────────
  "landing:not_found_view": defineEvent({
    description: "404 page rendered (requested path is $pathname).",
    props: {
      referrer_host: p.optional(
        p.string("document.referrer host, to find broken inbound links."),
      ),
    },
    trigger: "app/not-found.tsx via a small client effect.",
  }),
  "landing:post_link_click": defineEvent({
    description: "Link inside the article body clicked.",
    props: {
      destination_host: p.string("Link host."),
      destination_url: p.string("Link href."),
      is_external: p.boolean("Leaves namespace.ninja."),
    },
    trigger:
      "Delegated click listener on the dangerouslySetInnerHTML container (l.271-274).",
  }),
  "landing:post_read_complete": defineEvent({
    description:
      "Article read: reached 100% and spent at least 40% of the estimated reading time.",
    isCritical: true,
    props: {
      reading_minutes: p.number("Estimated reading time of the post."),
      seconds_on_post: p.number("Time on the post when completed."),
    },
    trigger: "Same <ReadProgress> component.",
  }),

  // ── Blog ─────────────────────────────────────────────────────────────────────────────────
  "landing:post_read_progress": defineEvent({
    description:
      "Reader reached 25/50/75/100% of the article body (once per milestone per view).",
    props: {
      read_depth: p.numberEnum(
        [25, 50, 75, 100],
        "Milestone reached (% of article body).",
      ),
      reading_minutes: p.number("Estimated reading time of the post."),
      seconds_since_pageview: p.number("Time from pageview to milestone."),
    },
    trigger:
      "New client <ReadProgress> in app/blog/[slug]/page.tsx observing sentinels inside the body.",
  }),
  "landing:post_share_click": defineEvent({
    description: "Share button clicked on a post.",
    props: {
      share_location: p.enum(["header", "footer"], "Which share link."),
      share_target: p.enum(["x"], "Share network."),
    },
    trigger: "app/blog/[slug]/page.tsx share links (l.212, l.230).",
  }),
  "landing:post_toc_click": defineEvent({
    description: "Table-of-contents entry clicked.",
    props: {
      heading_id: p.string("Target heading slug."),
      heading_index: p.number("0-based index in the TOC."),
    },
    trigger: "components/blog/TocNav.tsx anchor click.",
  }),
  "landing:related_post_click": defineEvent({
    description: "Related post card clicked at the end of an article.",
    props: {
      card_position: p.number("0-based position."),
      to_post_slug: p.string("Clicked post slug."),
    },
    trigger: "app/blog/[slug]/page.tsx related cards (l.151).",
  }),

  // ── Engagement / content reach ───────────────────────────────────────────────────────────
  "landing:section_view": defineEvent({
    description:
      "A page section became at least 50% visible (once per section per pageview).",
    props: {
      seconds_since_pageview: p.number("Time from pageview to first view."),
      section_id: p.string(
        "Section id, e.g. home-header, case-studies, products, identity, use-cases, benefits, testimonials, stats, blog-preview, faq, cta, solution-hero, solution-faq.",
      ),
      section_index: p.number("0-based order of the section on the page."),
    },
    trigger:
      "New client <TrackSection id> wrapper (IntersectionObserver) around each home / about / solution section.",
  }),
  "landing:solution_tab_select": defineEvent({
    description: "Tab selected in the solution product look section.",
    props: {
      tab: p.string("Tab label."),
      tab_index: p.number("0-based tab index."),
    },
    trigger: "components/solutions/SolutionProductLook.tsx setActive (l.188).",
  }),
} as const;
