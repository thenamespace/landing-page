import type { LandingSuperProps } from "./taxonomy/catalog";

type PageContext = Pick<LandingSuperProps, "page_type" | "post_slug" | "is_case_study" | "solution_slug">;
type SolutionSlug = NonNullable<LandingSuperProps["solution_slug"]>;

const SOLUTION_SLUGS: readonly SolutionSlug[] = [
  "wallets",
  "l2s-rollups",
  "fintechs-neobanks",
  "waas",
  "decentralized-websites",
  "ai-agents",
  "universal-usernames",
];

/**
 * Page context derived from the URL path, so every event (autocapture and $pageview included)
 * can be sliced by page. The site has no routes beyond these, so anything else is the 404 page.
 */
export function pageContext(pathname: string): PageContext {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return { page_type: "home" };
  if (path === "/about") return { page_type: "about" };
  if (path === "/blog") return { page_type: "blog_index" };

  const [, section, slug, ...rest] = path.split("/");
  if (rest.length > 0 || !slug) return { page_type: "not_found" };
  if (section === "blog") return { is_case_study: slug.startsWith("case-study-"), page_type: "blog_post", post_slug: slug };
  if (section === "legal") return { page_type: "legal" };
  if (section === "solutions" && (SOLUTION_SLUGS as readonly string[]).includes(slug)) {
    return { page_type: "solution", solution_slug: slug as SolutionSlug };
  }
  return { page_type: "not_found" };
}

export type AppEnv = LandingSuperProps["app_env"];

export function detectAppEnv(hostname: string): AppEnv {
  if (hostname === "namespace.ninja" || hostname === "www.namespace.ninja") return "production";
  if (hostname === "localhost" || hostname === "127.0.0.1") return "development";
  if (hostname.startsWith("staging.") || hostname.includes(".staging.")) return "staging";
  return "preview";
}
