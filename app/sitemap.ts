import type { MetadataRoute } from "next";

const BASE = "https://signalled.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; changeFreq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/",            priority: 1.0, changeFreq: "weekly" },
    { path: "/rubric",      priority: 0.95, changeFreq: "monthly" },
    { path: "/methodology", priority: 0.9, changeFreq: "monthly" },
    { path: "/pricing",     priority: 0.9, changeFreq: "monthly" },
    { path: "/process",     priority: 0.85, changeFreq: "monthly" },
    { path: "/work",        priority: 0.85, changeFreq: "weekly" },
    { path: "/about",       priority: 0.8, changeFreq: "monthly" },
    { path: "/report",      priority: 0.8, changeFreq: "monthly" },
    { path: "/notes",       priority: 0.75, changeFreq: "weekly" },
    { path: "/fit-check",   priority: 0.7, changeFreq: "monthly" },
    { path: "/faq",         priority: 0.7, changeFreq: "monthly" },
    { path: "/contact",     priority: 0.65, changeFreq: "monthly" },
    { path: "/audit/demo",  priority: 0.6, changeFreq: "monthly" },
    { path: "/privacy",     priority: 0.3, changeFreq: "yearly" },
    { path: "/terms",       priority: 0.3, changeFreq: "yearly" },
  ];
  return pages.map(p => ({
    url: `${BASE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFreq,
    priority: p.priority,
  }));
}
