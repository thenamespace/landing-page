import type { LandingEventProps } from "./taxonomy/catalog";

type CtaDestination = LandingEventProps<"landing:cta_click">["cta_destination"];

const SOCIAL_HOSTS = ["x.com", "twitter.com", "t.me", "discord.gg", "discord.com", "farcaster.xyz", "warpcast.com", "linkedin.com", "www.linkedin.com", "thenamespace.substack.com"];
const PRODUCT_HOSTS = ["ens.diamonds", "ensforge.com", "resolvio.xyz", "enscomponents.com", "subname.dev", "namera.ai"];

/** What a link leads to, from its resolved URL. */
export function classifyDestination(url: URL, siteHost: string): CtaDestination {
  const host = url.hostname.replace(/^www\./, "");
  if (host === "app.namespace.ninja") return "app";
  if (host === "docs.namespace.ninja") return "docs";
  if (host === "cal.com" || host === "app.cal.com") return "book_call";
  if (host === "github.com") return "github";
  if (SOCIAL_HOSTS.includes(url.hostname) || SOCIAL_HOSTS.includes(host)) return "social";
  if (PRODUCT_HOSTS.includes(host)) return "product_site";
  if (url.hostname !== siteHost && host !== siteHost.replace(/^www\./, "")) return "external";
  if (url.pathname.endsWith(".pdf")) return "deck";
  if (url.pathname.startsWith("/blog")) return "blog";
  if (url.pathname.startsWith("/solutions")) return "solution";
  if (url.pathname.startsWith("/legal")) return "legal";
  return url.hash && url.pathname === window.location.pathname ? "anchor" : "internal";
}
