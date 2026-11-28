import { pageContext } from "./page-context";
import type { LandingEventProps } from "./taxonomy/catalog";

export type CtaPlacement = LandingEventProps<"landing:cta_click">["cta_placement"];

/**
 * Every marketing section root carries a `section_<name>` class (Webflow convention). The section
 * is both the `section_id` for reach and, through this map, the CTA placement. No markup needed.
 */
const SECTION_PLACEMENTS: Record<string, CtaPlacement> = {
  "about-products": "about_index",
  "article-page": "blog_post",
  blog: "home_blog_preview",
  "blog-overview": "blog_index",
  "blog-related": "blog_post",
  "case-studies": "home_case_studies",
  cta: "cta_section",
  "home-header": "home_hero",
  products: "home_products",
  "solution-cta": "solution_final",
  "solution-decks": "solution_decks",
  "solution-hero": "solution_hero",
  "solution-pricing-cta": "solution_cta_cards",
  "solution-splitstats": "solution_split_stats",
  "solution-terminal": "solution_terminal",
};

const SECTION_SELECTOR = '[class^="section_"], [class*=" section_"], .article-page';

/** `section_case-studies` → `case-studies`; the blog article wrapper has no section_ class. */
export function sectionIdOf(element: Element): string | undefined {
  if (element.classList.contains("article-page")) return "article-page";
  const token = [...element.classList].find((c) => c.startsWith("section_"));
  return token?.slice("section_".length);
}

function closestSection(element: Element): Element | null {
  return element.closest(SECTION_SELECTOR);
}

/** Placement of any element on the page: chrome first, then its section, else page_body. */
export function placementOf(element: Element): CtaPlacement {
  if (element.closest("#announcement-bar")) return "announcement_bar";
  if (element.closest(".navbar2_component")) {
    return element.closest(".w-nav-menu.w--open") ? "navbar_mobile" : "navbar";
  }
  if (element.closest("footer, .footer")) return "footer";
  if (pageContext(window.location.pathname).page_type === "not_found") return "not_found";

  const section = closestSection(element);
  const id = section ? sectionIdOf(section) : undefined;
  if (id === "solution-hero" && window.location.pathname.startsWith("/about")) return "about_hero";
  return (id && SECTION_PLACEMENTS[id]) || "page_body";
}

/** Top-level sections of the current page, in document order. */
export function pageSections(): Element[] {
  const all = [...document.querySelectorAll(SECTION_SELECTOR)];
  return all.filter((el) => !all.some((other) => other !== el && other.contains(el)));
}
