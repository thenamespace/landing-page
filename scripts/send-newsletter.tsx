import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import juice from "juice";
import { render } from "@react-email/render";
import { NewsletterEmail } from "../emails/newsletter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "../content/blog");
const SKIP_FILE = path.join(__dirname, "../content/blog/newsletter-skip.json");
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.BASE_URL ||
  "https://namespace.ninja";
const DRY_RUN = process.argv.includes("--dry-run");

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_AUDIENCE_ID = process.env.RESEND_NEWSLETTER_AUDIENCE_ID;
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "Namespace Journal <journal@namespace.ninja>";
const TEST_EMAIL = process.env.TEST_EMAIL;

// CSS applied to the unified-rendered markdown body before email injection.
// juice.inlineContent() converts these rules to inline style attributes,
// which is required for Gmail and Outlook compatibility.
const PROSE_CSS = `
  p { margin: 0 0 1em 0; color: #aaa; font-size: 16px; line-height: 1.6; }
  h2 { margin: 1.5em 0 0.5em 0; color: #fff; font-size: 20px; font-weight: 700; line-height: 1.3; }
  h3 { margin: 1.25em 0 0.5em 0; color: #fff; font-size: 17px; font-weight: 600; line-height: 1.3; }
  a { color: #5474f6; text-decoration: underline; }
  ul, ol { margin: 0 0 1em 0; padding-left: 1.5em; color: #aaa; }
  li { margin: 0.25em 0; }
  blockquote { margin: 0 0 1em 0; padding-left: 1em; border-left: 2px solid #333; color: #888; font-style: italic; }
  pre { margin: 0 0 1em 0; padding: 1em; background: #111; border-radius: 6px; font-family: monospace; font-size: 14px; color: #ccc; }
  code { font-family: monospace; font-size: 0.9em; background: #1a1a1a; padding: 0.15em 0.4em; border-radius: 4px; color: #ccc; }
  img { max-width: 100%; height: auto; border-radius: 6px; display: block; margin: 1em 0; }
  strong { color: #fff; font-weight: 700; }
`;

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

function parsePost(raw: string) {
  const sanitized = sanitizeFrontmatter(raw);
  const { data, content } = matter(sanitized);
  const normalize = (v: unknown) => {
    if (v instanceof Date) return v.toISOString().slice(0, 10);
    return typeof v === "string" ? v : undefined;
  };
  return {
    ...data,
    content,
    date: normalize(data.date) ?? "",
    updated: normalize(data.updated),
  };
}

function absolutifyUrls(html: string): string {
  return html.replace(
    /(src|href)="(\/[^"]+)"/g,
    (_, attr, url) => `${attr}="${BASE_URL}${url}"`,
  );
}

async function renderMarkdown(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return String(file);
}

async function resendRequest(method: string, endpoint: string, body?: unknown) {
  const res = await fetch(`https://api.resend.com${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return res.json();
}

async function getSentSlugs(): Promise<Set<string>> {
  const data = await resendRequest("GET", "/broadcasts");
  if (!data?.data) return new Set();
  return new Set(data.data.map((b: { name: string }) => b.name));
}

async function run() {
  if (!RESEND_API_KEY) {
    console.log("send-newsletter: RESEND_API_KEY not set, skipping.");
    return;
  }
  if (!DRY_RUN && !RESEND_AUDIENCE_ID) {
    console.log(
      "send-newsletter: RESEND_NEWSLETTER_AUDIENCE_ID not set, skipping.",
    );
    return;
  }

  if (DRY_RUN) {
    console.log("🧪 DRY RUN — no broadcast emails will be sent to the audience");
    if (TEST_EMAIL) {
      console.log(`🧪 Preview emails will be sent to: ${TEST_EMAIL}`);
    }
  }

  const skipList = new Set<string>(
    JSON.parse(fs.readFileSync(SKIP_FILE, "utf8")),
  );
  const sentSlugs = DRY_RUN ? new Set<string>() : await getSentSlugs();

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") && f !== "README.md");

  let sentCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const post = parsePost(raw);
    if (!post.slug) continue;

    const isDraft = post.draft === true || post.draft === "true";
    if (isDraft) {
      console.log(`send-newsletter: skipped (draft) "${post.slug}"`);
      continue;
    }
    if (skipList.has(post.slug as string)) {
      console.log(`send-newsletter: skipped (legacy) "${post.slug}"`);
      continue;
    }
    if (sentSlugs.has(post.slug as string)) {
      console.log(`send-newsletter: already sent "${post.slug}", skipping.`);
      continue;
    }

    console.log(`send-newsletter: preparing broadcast for "${post.slug}"...`);

    const format = post.format ?? "markdown";
    const rawHtml =
      format === "html"
        ? (post.content as string).trim()
        : await renderMarkdown(post.content as string);

    // Make relative URLs absolute, then inline prose CSS for email compatibility
    const bodyHtml = juice.inlineContent(absolutifyUrls(rawHtml), PROSE_CSS);

    const emailProps = {
      title: post.title as string,
      description: post.description as string | undefined,
      slug: post.slug as string,
      image: post.image as string | undefined,
      tag: post.tag as string | undefined,
      date: post.date as string | undefined,
      bodyHtml,
      baseUrl: BASE_URL,
    };

    const html = await render(<NewsletterEmail {...emailProps} />);
    const text = await render(<NewsletterEmail {...emailProps} />, { plainText: true });

    if (DRY_RUN) {
      if (TEST_EMAIL) {
        console.log(
          `send-newsletter: [dry-run] sending preview to ${TEST_EMAIL}...`,
        );
        const preview = await resendRequest("POST", "/emails", {
          from: FROM_EMAIL,
          to: TEST_EMAIL,
          subject: `[DRY RUN] ${post.title}`,
          html,
          text,
        });
        if (preview.id) {
          console.log(`send-newsletter: [dry-run] preview sent (${preview.id})`);
          sentCount++;
        } else {
          console.error(`send-newsletter: [dry-run] preview failed:`, preview);
          errorCount++;
        }
      } else {
        console.log(
          `send-newsletter: [dry-run] would create broadcast for audience ${RESEND_AUDIENCE_ID}`,
        );
        console.log(`send-newsletter: [dry-run] subject: ${post.title}`);
        sentCount++;
      }
      continue;
    }

    const broadcast = await resendRequest("POST", "/broadcasts", {
      name: post.slug,
      audience_id: RESEND_AUDIENCE_ID,
      from: FROM_EMAIL,
      subject: post.title,
      html,
      text,
    });

    if (!broadcast.id) {
      console.error(
        `send-newsletter: failed to create broadcast for "${post.slug}":`,
        broadcast,
      );
      errorCount++;
      continue;
    }

    const sent = await resendRequest(
      "POST",
      `/broadcasts/${broadcast.id}/send`,
    );
    if (sent.id) {
      console.log(
        `send-newsletter: sent broadcast for "${post.slug}" (${sent.id})`,
      );
      sentCount++;
    } else {
      console.error(
        `send-newsletter: failed to send broadcast for "${post.slug}":`,
        sent,
      );
      errorCount++;
    }
  }

  console.log(
    `\nsend-newsletter: done. Sent: ${sentCount}, Errors: ${errorCount}`,
  );
  if (errorCount > 0) process.exit(1);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
