import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

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
const TEST_EMAIL = process.env.TEST_EMAIL; // for --dry-run preview sends

/**
 * gray-matter uses strict YAML. Titles like `[Case Study] Foo: Bar` confuse the
 * parser because `[` starts a flow sequence. We pre-process the frontmatter to
 * quote any unquoted value that starts with `[` (or `{`) and contains `:`.
 * (Mirrors lib/posts.ts)
 */
function sanitizeFrontmatter(raw) {
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

function parseFrontmatter(raw) {
  const sanitized = sanitizeFrontmatter(raw);
  const { data } = matter(sanitized);
  const normalize = (v) => {
    if (v instanceof Date) return v.toISOString().slice(0, 10);
    return typeof v === "string" ? v : undefined;
  };
  return {
    ...data,
    date: normalize(data.date) ?? "",
    updated: normalize(data.updated),
  };
}

function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailHtml({ title, description, excerpt, slug, image, tag, date }) {
  const postUrl = `${BASE_URL}/blog/${slug}`;
  const imageUrl = image?.startsWith("/") ? `${BASE_URL}${image}` : image;
  const displayDate = date
    ? new Date(date + "T00:00:00Z").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : "";

  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(excerpt || description || "");
  const safeTag = tag ? escapeHtml(tag) : "";
  const safeImageAlt = escapeHtml(title);
  const safeBaseUrl = escapeHtml(BASE_URL);
  const safePostUrl = escapeHtml(postUrl);
  const safeImageUrl = imageUrl ? escapeHtml(imageUrl) : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${safeTitle}</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <tr><td style="padding:0 0 32px 0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td><a href="${safeBaseUrl}" style="text-decoration:none;"><span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:-0.02em;">Namespace</span><span style="color:#5474f6;font-size:18px;font-weight:700;">.</span></a></td>
            <td align="right"><span style="color:#666;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">Namespace Journal</span></td>
          </tr>
        </table>
      </td></tr>

      <tr><td style="border-top:1px solid #1e1e1e;padding-bottom:32px;"></td></tr>

      <tr><td style="padding-bottom:16px;">
        ${safeTag ? `<span style="display:inline-block;background:#1a1a2e;color:#5474f6;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;padding:4px 10px;border-radius:4px;margin-right:12px;">${safeTag}</span>` : ""}
        ${displayDate ? `<span style="color:#555;font-size:12px;">${displayDate}</span>` : ""}
      </td></tr>

      <tr><td style="padding-bottom:16px;">
        <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;line-height:1.25;letter-spacing:-0.02em;">${safeTitle}</h1>
      </td></tr>

      <tr><td style="padding-bottom:28px;">
        <p style="margin:0;color:#888;font-size:16px;line-height:1.6;">${safeDesc}</p>
      </td></tr>

      ${safeImageUrl ? `<tr><td style="padding-bottom:28px;"><a href="${safePostUrl}"><img src="${safeImageUrl}" alt="${safeImageAlt}" width="600" style="width:100%;max-width:600px;border-radius:8px;display:block;"/></a></td></tr>` : ""}

      <tr><td style="padding-bottom:40px;">
        <a href="${safePostUrl}" style="display:inline-block;background:#5474f6;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:6px;">Read the full post →</a>
      </td></tr>

      <tr><td style="border-top:1px solid #1e1e1e;padding-top:28px;">
        <p style="margin:0;color:#444;font-size:12px;line-height:1.6;">
          You're receiving this because you subscribed to Namespace Journal.<br/>
          <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#555;text-decoration:underline;">Unsubscribe</a>
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

async function resendRequest(method, endpoint, body) {
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

async function getSentSlugs() {
  const data = await resendRequest("GET", "/broadcasts");
  if (!data?.data) return new Set();
  return new Set(data.data.map((b) => b.name));
}

async function run() {
  if (!RESEND_API_KEY) {
    console.log("send-newsletter: RESEND_API_KEY not set, skipping.");
    return;
  }
  if (!DRY_RUN && !RESEND_AUDIENCE_ID) {
    console.log(
      "send-newsletter: RESEND_NEWSLETTER_AUDIENCE_ID not set, skipping."
    );
    return;
  }

  if (DRY_RUN) {
    console.log("🧪 DRY RUN — no broadcast emails will be sent to the audience");
    if (TEST_EMAIL) {
      console.log(`🧪 Preview emails will be sent to: ${TEST_EMAIL}`);
    }
  }

  const skipList = new Set(JSON.parse(fs.readFileSync(SKIP_FILE, "utf8")));
  const sentSlugs = DRY_RUN ? new Set() : await getSentSlugs();

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") && f !== "README.md");

  let sentCount = 0;
  let errorCount = 0;

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const meta = parseFrontmatter(raw);
    if (!meta.slug) continue;

    const isDraft = meta.draft === true || meta.draft === "true";
    if (isDraft) {
      console.log(`send-newsletter: skipped (draft) "${meta.slug}"`);
      continue;
    }
    if (skipList.has(meta.slug)) {
      console.log(`send-newsletter: skipped (legacy) "${meta.slug}"`);
      continue;
    }
    if (sentSlugs.has(meta.slug)) {
      console.log(`send-newsletter: already sent "${meta.slug}", skipping.`);
      continue;
    }

    console.log(`send-newsletter: preparing broadcast for "${meta.slug}"...`);

    const html = buildEmailHtml(meta);

    if (DRY_RUN) {
      if (TEST_EMAIL) {
        console.log(
          `send-newsletter: [dry-run] sending preview to ${TEST_EMAIL}...`
        );
        const preview = await resendRequest("POST", "/emails", {
          from: FROM_EMAIL,
          to: TEST_EMAIL,
          subject: `[DRY RUN] ${meta.title}`,
          html,
        });
        if (preview.id) {
          console.log(
            `send-newsletter: [dry-run] preview sent (${preview.id})`
          );
          sentCount++;
        } else {
          console.error(
            `send-newsletter: [dry-run] preview failed:`,
            preview
          );
          errorCount++;
        }
      } else {
        console.log(
          `send-newsletter: [dry-run] would create broadcast for audience ${RESEND_AUDIENCE_ID}`
        );
        console.log(`send-newsletter: [dry-run] subject: ${meta.title}`);
        sentCount++;
      }
      continue;
    }

    const broadcast = await resendRequest("POST", "/broadcasts", {
      name: meta.slug,
      audience_id: RESEND_AUDIENCE_ID,
      from: FROM_EMAIL,
      subject: meta.title,
      html,
    });

    if (!broadcast.id) {
      console.error(
        `send-newsletter: failed to create broadcast for "${meta.slug}":`,
        broadcast
      );
      errorCount++;
      continue;
    }

    const sent = await resendRequest(
      "POST",
      `/broadcasts/${broadcast.id}/send`
    );
    if (sent.id) {
      console.log(
        `send-newsletter: sent broadcast for "${meta.slug}" (${sent.id})`
      );
      sentCount++;
    } else {
      console.error(
        `send-newsletter: failed to send broadcast for "${meta.slug}":`,
        sent
      );
      errorCount++;
    }
  }

  console.log(`\nsend-newsletter: done. Sent: ${sentCount}, Errors: ${errorCount}`);
  if (errorCount > 0) process.exit(1);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
