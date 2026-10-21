import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllSolutionSlugs } from "@/lib/solutions";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  // Only emit lastmod where we know the real content date. A build-time "now"
  // on every URL teaches crawlers to ignore lastmod entirely.
  const postDate = (p: (typeof posts)[number]) =>
    new Date((p.updated ?? p.date) + "T00:00:00Z");
  const newestPost = posts.length
    ? new Date(Math.max(...posts.map((p) => postDate(p).getTime())))
    : undefined;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/blog`, lastModified: newestPost, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/legal/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/legal/terms-of-service`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/legal/disclaimer`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const solutionRoutes: MetadataRoute.Sitemap = getAllSolutionSlugs().map((slug) => ({
    url: `${SITE.url}/solutions/${slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: postDate(p),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...solutionRoutes, ...postRoutes];
}
