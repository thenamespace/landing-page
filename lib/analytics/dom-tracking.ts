import { classifyDestination } from "./destination";
import { pageContext } from "./page-context";
import { pageSections, placementOf, sectionIdOf } from "./placement";
import { track, trackBeforeUnload } from "./track";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);

const labelOf = (link: HTMLAnchorElement) =>
  (link.getAttribute("aria-label") ?? link.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 80);

const postSlugOf = (url: URL) => (url.pathname.match(/^\/blog\/([^/]+)\/?$/) ?? [])[1];

/** Events that only exist on blog pages: TOC, share, article links, related posts, cards. */
function trackBlogLink(link: HTMLAnchorElement, url: URL, send: typeof track) {
  const { page_type } = pageContext(window.location.pathname);
  const toSlug = postSlugOf(url);

  if (page_type === "blog_post") {
    const toc = link.closest(".toc-nav");
    if (toc) {
      const links = [...toc.querySelectorAll("a")];
      send("landing:post_toc_click", { heading_id: url.hash.slice(1), heading_index: links.indexOf(link) });
      return;
    }
    if (link.closest(".blog-share-btn") || link.classList.contains("blog-share-btn")) {
      send("landing:post_share_click", { share_location: link.closest(".article-aside") ? "header" : "footer", share_target: "x" });
      return;
    }
    if (link.closest(".post-prose")) {
      send("landing:post_link_click", { destination_host: url.hostname, destination_url: url.href, is_external: url.hostname !== window.location.hostname });
      return;
    }
    const related = link.closest(".section_blog-related");
    if (related && toSlug) {
      const cards = [...new Set([...related.querySelectorAll<HTMLAnchorElement>('a[href^="/blog/"]')].map((a) => a.getAttribute("href")))];
      send("landing:related_post_click", { card_position: cards.indexOf(link.getAttribute("href")), to_post_slug: toSlug });
    }
    return;
  }

  const list = link.closest(".section_blog-overview, .section_blog");
  if (list && toSlug) {
    const cards = [...new Set([...list.querySelectorAll<HTMLAnchorElement>('a[href^="/blog/"]')].map((a) => a.getAttribute("href")))];
    const position = cards.indexOf(link.getAttribute("href"));
    send("landing:blog_card_click", {
      card_position: position,
      is_featured: page_type === "blog_index" && position === 0,
      list_location: page_type === "blog_index" ? "blog_index" : "home_blog_preview",
      to_post_slug: toSlug,
    });
  }
}

function onDocumentClick(event: MouseEvent) {
  const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!link) return;
  const url = new URL(link.href, window.location.href);
  if (!url.protocol.startsWith("http")) return;

  const opensNewTab = link.target === "_blank" || event.metaKey || event.ctrlKey;
  const leavesPage = !opensNewTab && url.pathname !== window.location.pathname;
  const send = leavesPage ? trackBeforeUnload : track;

  const placement = placementOf(link);
  const isExternal = url.hostname !== window.location.hostname;
  const destination = classifyDestination(url, window.location.hostname);
  const label = labelOf(link);

  send("landing:cta_click", {
    cta_destination: destination,
    cta_id: link.dataset.phCta ?? `${placement}-${slugify(label || url.pathname)}`,
    cta_label: label,
    cta_placement: placement,
    destination_host: url.hostname,
    destination_path: url.pathname,
    destination_url: isExternal ? url.href : `${url.origin}${url.pathname}${url.hash}`,
    is_external: isExternal,
    opens_new_tab: opensNewTab,
  });

  // Cal triggers with the modal wiring report book_call_open from lib/cal.ts themselves.
  if (destination === "book_call" && !link.dataset.phCal) {
    send("landing:book_call_open", { call_source: placement, open_mode: "new_tab", was_prewarmed: false });
  }
  trackBlogLink(link, url, send);
  trackCaseStudy(link, url, send);
}

const CASE_STUDY_IDS = ["celo", "unicorn", "filecoin", "pinme"] as const;

/** Case study cards: the card's logo alt text names the partner. */
function trackCaseStudy(link: HTMLAnchorElement, url: URL, send: typeof track) {
  const section = link.closest(".section_case-studies");
  if (!section) return;
  const alt = link.querySelector("img")?.alt.toLowerCase() ?? "";
  const id = CASE_STUDY_IDS.find((candidate) => alt.includes(candidate));
  if (!id) return;
  const cards = [...section.querySelectorAll("a")].filter((a) => a.querySelector("img"));
  send("landing:case_study_click", { card_position: cards.indexOf(link), case_study_id: id, destination_url: url.href });
}

let clicksInstalled = false;

/** One capture-phase listener for every link on the site, server components included. */
export function installClickTracking() {
  if (clicksInstalled || typeof document === "undefined") return;
  clicksInstalled = true;
  document.addEventListener("click", onDocumentClick, true);
}

/** Fires landing:section_view once per top-level section per page view (≥50% visible). */
export function observeSections(): () => void {
  const startedAt = Date.now();
  const sections = pageSections();
  const seen = new Set<Element>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || seen.has(entry.target)) continue;
        seen.add(entry.target);
        observer.unobserve(entry.target);
        const id = sectionIdOf(entry.target);
        if (!id) continue;
        track("landing:section_view", {
          seconds_since_pageview: Math.round((Date.now() - startedAt) / 100) / 10,
          section_id: id,
          section_index: sections.indexOf(entry.target),
        });
      }
    },
    // A tall section never reaches 50% of itself on a phone; count it once it fills half the viewport.
    { threshold: [0.5] },
  );
  for (const section of sections) observer.observe(section);
  return () => observer.disconnect();
}

