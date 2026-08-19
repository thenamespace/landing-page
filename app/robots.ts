import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview/staging deploys (e.g. the vercel.app share project) set NOINDEX=1
  // so search engines never index a non-canonical copy of the site.
  if (process.env.NOINDEX) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // OpenAI / ChatGPT
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      // Anthropic / Claude
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      // Perplexity
      { userAgent: "PerplexityBot", allow: "/" },
      // Google Gemini + AI Overviews
      { userAgent: "Google-Extended", allow: "/" },
      // Microsoft Copilot (via Bing)
      { userAgent: "Bingbot", allow: "/" },
      // Cohere
      { userAgent: "cohere-ai", allow: "/" },
      // Meta AI
      { userAgent: "meta-externalagent", allow: "/" },
      // Amazon Alexa / Kendra
      { userAgent: "Amazonbot", allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
