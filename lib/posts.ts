import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { renderMarkdown } from "./markdown";

export type PostFrontmatter = {
  title: string;
  slug: string;
  description: string;
  excerpt?: string;
  date: string;
  updated?: string;
  image?: string;
  imageAlt?: string;
  tag?: string;
  format?: "markdown" | "html";
  author?: string;
  draft?: boolean;
};

export type Post = PostFrontmatter & {
  html: string;
  readingMinutes: number;
  readingLabel: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const EXCLUDED_FILENAMES = new Set(["README.md", "newsletter-skip.json"]);

/**
 * gray-matter uses strict YAML. Titles like `[Case Study] Foo: Bar` confuse the
 * parser because `[` starts a flow sequence. We pre-process the frontmatter to
 * quote any unquoted value that starts with `[` (or `{`) and contains `:`,
 * which keeps the markdown files readable without forcing authors to think
 * about YAML escaping.
 */
function sanitizeFrontmatter(raw: string): string {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return raw;
  const [full, fm] = match;
  const sanitized = fm
    .split(/\r?\n/)
    .map((line) => {
      const m = line.match(/^([A-Za-z0-9_-]+):\s*(.+)$/);
      if (!m) return line;
      const [, key, valueRaw] = m;
      const value = valueRaw.trim();
      const needsQuote =
        (value.startsWith("[") || value.startsWith("{")) &&
        !/^".*"$/.test(value) &&
        !/^'.*'$/.test(value);
      if (!needsQuote) return line;
      const escaped = value.replace(/"/g, '\\"');
      return `${key}: "${escaped}"`;
    })
    .join("\n");
  return raw.replace(full, `---\n${sanitized}\n---\n`);
}

async function readPostFile(filename: string): Promise<Post | null> {
  if (EXCLUDED_FILENAMES.has(filename)) return null;
  if (!filename.endsWith(".md") && !filename.endsWith(".mdx")) return null;

  const fullPath = path.join(POSTS_DIR, filename);
  const raw = await fs.readFile(fullPath, "utf8");
  const sanitized = sanitizeFrontmatter(raw);
  const { data, content } = matter(sanitized);
  // gray-matter auto-parses `YYYY-MM-DD` into a JS Date; coerce back to string
  // so downstream consumers (JSON-LD, sitemap, RSS) always get ISO-date strings.
  const normalize = (v: unknown): string | undefined => {
    if (v instanceof Date) return v.toISOString().slice(0, 10);
    return typeof v === "string" ? v : undefined;
  };
  const fm = {
    ...(data as Record<string, unknown>),
    date: normalize((data as Record<string, unknown>).date) ?? "",
    updated: normalize((data as Record<string, unknown>).updated),
  } as PostFrontmatter;

  if (!fm.slug || !fm.title || !fm.date) {
    console.warn(`[posts] Skipping ${filename}: missing required frontmatter`);
    return null;
  }
  if (fm.draft) return null;

  const format = fm.format ?? "markdown";
  const html =
    format === "html" ? content.trim() : await renderMarkdown(content);

  const stats = readingTime(content);
  return {
    ...fm,
    excerpt: fm.excerpt ?? fm.description,
    updated: fm.updated ?? fm.date,
    format,
    html,
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
    readingLabel: `${Math.max(1, Math.round(stats.minutes))} min read`,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const files = await fs.readdir(POSTS_DIR);
  const posts = (await Promise.all(files.map(readPostFile))).filter(
    (p): p is Post => Boolean(p),
  );
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}

export function formatLongDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
