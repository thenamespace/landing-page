import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "../content/blog");
const SKIP_FILE = path.join(__dirname, "../content/blog/newsletter-skip.json");
const BASE_URL = "https://namespace.ninja";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_AUDIENCE_ID = process.env.RESEND_NEWSLETTER_AUDIENCE_ID;
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Namespace Journal <journal@namespace.ninja>";

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const meta = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const val = line
      .slice(colon + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    meta[key] = val;
  }
  return meta;
}

function buildEmailHtml({ title, description, excerpt, slug, image, tag, date }) {
  const postUrl = `${BASE_URL}/blog/${slug}`;
  const imageUrl = image?.startsWith("/") ? `${BASE_URL}${image}` : image;
  const displayDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <tr><td style="padding:0 0 32px 0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td><a href="${BASE_URL}" style="text-decoration:none;"><span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:-0.02em;">Namespace</span><span style="color:#5474f6;font-size:18px;font-weight:700;">.</span></a></td>
            <td align="right"><span style="color:#666;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">Namespace Journal</span></td>
          </tr>
        </table>
      </td></tr>

      <tr><td style="border-top:1px solid #1e1e1e;padding-bottom:32px;"></td></tr>

      <tr><td style="padding-bottom:16px;">
        ${tag ? `<span style="display:inline-block;background:#1a1a2e;color:#5474f6;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;padding:4px 10px;border-radius:4px;margin-right:12px;">${tag}</span>` : ""}
        ${displayDate ? `<span style="color:#555;font-size:12px;">${displayDate}</span>` : ""}
      </td></tr>

      <tr><td style="padding-bottom:16px;">
        <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;line-height:1.25;letter-spacing:-0.02em;">${title}</h1>
      </td></tr>

      <tr><td style="padding-bottom:28px;">
        <p style="margin:0;color:#888;font-size:16px;line-height:1.6;">${excerpt || description || ""}</p>
      </td></tr>

      ${imageUrl ? `<tr><td style="padding-bottom:28px;"><a href="${postUrl}"><img src="${imageUrl}" alt="${title}" width="600" style="width:100%;max-width:600px;border-radius:8px;display:block;"/></a></td></tr>` : ""}

      <tr><td style="padding-bottom:40px;">
        <a href="${postUrl}" style="display:inline-block;background:#5474f6;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:6px;">Read the full post →</a>
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
  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
    console.log("send-newsletter: env vars not set, skipping.");
    return;
  }

  const skipList = new Set(JSON.parse(fs.readFileSync(SKIP_FILE, "utf8")));
  const sentSlugs = await getSentSlugs();
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") && f !== "README.md");

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const meta = parseFrontmatter(raw);
    if (!meta.slug) continue;
    if (meta.draft === "true") {
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

    console.log(`send-newsletter: sending broadcast for "${meta.slug}"...`);

    const html = buildEmailHtml(meta);
    const broadcast = await resendRequest("POST", "/broadcasts", {
      name: meta.slug,
      audience_id: RESEND_AUDIENCE_ID,
      from: FROM_EMAIL,
      subject: meta.title,
      html,
    });

    if (!broadcast.id) {
      console.error("send-newsletter: failed to create broadcast:", broadcast);
      process.exit(1);
    }

    const sent = await resendRequest("POST", `/broadcasts/${broadcast.id}/send`);
    if (sent.id) {
      console.log(`send-newsletter: sent broadcast for "${meta.slug}" (${sent.id})`);
    } else {
      console.error("send-newsletter: failed to send:", sent);
      process.exit(1);
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
