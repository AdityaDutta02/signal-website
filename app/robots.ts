import type { MetadataRoute } from "next";

const BASE = "https://signalled.studio";

const AI_BOTS = ["GPTBot", "PerplexityBot", "ClaudeBot", "Google-Extended", "CCBot", "anthropic-ai", "Applebot-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_BOTS.map(bot => ({
        userAgent: bot,
        allow: "/",
        disallow: ["/api/", "/audit/"],
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/audit/", "/401", "/unauthorized"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
