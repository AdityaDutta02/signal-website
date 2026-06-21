import type { SignalResult, AuditEngine, TopFix, SampleFix, DayPlan, BlockBreakdown } from "@/data/audit";
import { blocks, RAW_MAX } from "@/data/signals";

export type GradedAudit = {
  domain: string;
  scanIdShort: string;
  scannedAt: string;
  overallScore: number;
  projectedScore: number;
  median: number;
  decile: string;
  oneLiner: string;
  engines: AuditEngine[];
  signalResults: SignalResult[];
  blocks: BlockBreakdown[];
  topFixes: TopFix[];
  sampleFix: SampleFix;
  dayPlan: DayPlan[];
};

const FETCH_TIMEOUT_MS = 8000;
const UA_SIGNAL = "Mozilla/5.0 (compatible; SignalAuditBot/1.0; +https://signalled.studio/bot)";

function normaliseDomain(raw: string): { origin: string; host: string } {
  let input = raw.trim().toLowerCase();
  input = input.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  const host = input.split("/")[0];
  return { origin: `https://${host}`, host };
}

async function timedFetch(url: string): Promise<{ ok: boolean; status: number; text: string; headers: Headers }> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": UA_SIGNAL, "Accept": "text/html,application/xhtml+xml,*/*" },
      redirect: "follow",
    });
    const text = await res.text().catch(() => "");
    return { ok: res.ok, status: res.status, text, headers: res.headers };
  } catch {
    return { ok: false, status: 0, text: "", headers: new Headers() };
  } finally {
    clearTimeout(timer);
  }
}

type Probe = {
  homepageHtml: string;
  homepageStatus: number;
  robotsTxt: string;
  robotsStatus: number;
  llmsTxtStatus: number;
  llmsTxtBody: string;
  sitemapStatus: number;
  sitemapBody: string;
  useCasesStatus: number;
  vsStatus: number;
  integrationsStatus: number;
  blogStatus: number;
  changelogStatus: number;
};

async function probe(origin: string): Promise<Probe> {
  const [home, robots, llms, sitemap, useCases, vs, integrations, blog, changelog] = await Promise.all([
    timedFetch(origin + "/"),
    timedFetch(origin + "/robots.txt"),
    timedFetch(origin + "/llms.txt"),
    timedFetch(origin + "/sitemap.xml"),
    timedFetch(origin + "/use-cases/"),
    timedFetch(origin + "/vs/"),
    timedFetch(origin + "/integrations/"),
    timedFetch(origin + "/blog/"),
    timedFetch(origin + "/changelog/"),
  ]);
  return {
    homepageHtml: home.text,
    homepageStatus: home.status,
    robotsTxt: robots.text,
    robotsStatus: robots.status,
    llmsTxtStatus: llms.status,
    llmsTxtBody: llms.text,
    sitemapStatus: sitemap.status,
    sitemapBody: sitemap.text,
    useCasesStatus: useCases.status,
    vsStatus: vs.status,
    integrationsStatus: integrations.status,
    blogStatus: blog.status,
    changelogStatus: changelog.status,
  };
}

function findJsonLd(html: string): unknown[] {
  const out: unknown[] = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(m[1].trim());
      if (Array.isArray(parsed)) out.push(...parsed);
      else if (parsed && typeof parsed === "object" && "@graph" in (parsed as Record<string, unknown>)) {
        const graph = (parsed as { "@graph"?: unknown[] })["@graph"];
        if (Array.isArray(graph)) out.push(...graph);
        out.push(parsed);
      } else {
        out.push(parsed);
      }
    } catch {
      out.push(null);
    }
  }
  return out;
}

function hasType(blocks: unknown[], type: string | string[]): boolean {
  const wanted = Array.isArray(type) ? type : [type];
  for (const b of blocks) {
    if (!b || typeof b !== "object") continue;
    const t = (b as { "@type"?: string | string[] })["@type"];
    if (!t) continue;
    const list = Array.isArray(t) ? t : [t];
    if (list.some(x => wanted.includes(x))) return true;
  }
  return false;
}

function findOrg(ld: unknown[]): Record<string, unknown> | null {
  for (const b of ld) {
    if (!b || typeof b !== "object") continue;
    const t = (b as { "@type"?: string | string[] })["@type"];
    const list = Array.isArray(t) ? t : [t ?? ""];
    if (list.includes("Organization")) return b as Record<string, unknown>;
  }
  return null;
}

function findPerson(ld: unknown[]): Record<string, unknown> | null {
  for (const b of ld) {
    if (!b || typeof b !== "object") continue;
    const t = (b as { "@type"?: string | string[] })["@type"];
    const list = Array.isArray(t) ? t : [t ?? ""];
    if (list.includes("Person")) return b as Record<string, unknown>;
  }
  return null;
}

function findProductOrService(ld: unknown[]): Record<string, unknown> | null {
  for (const b of ld) {
    if (!b || typeof b !== "object") continue;
    const t = (b as { "@type"?: string | string[] })["@type"];
    const list = Array.isArray(t) ? t : [t ?? ""];
    if (list.some(x => x === "Product" || x === "Service" || x === "SoftwareApplication")) {
      return b as Record<string, unknown>;
    }
  }
  return null;
}

function hasGraph(ld: unknown[]): boolean {
  for (const b of ld) {
    if (!b || typeof b !== "object") continue;
    if ("@graph" in (b as Record<string, unknown>)) return true;
  }
  return false;
}

function hasIdAnchoring(ld: unknown[]): boolean {
  let withId = 0;
  let total = 0;
  for (const b of ld) {
    if (!b || typeof b !== "object") continue;
    total++;
    if ("@id" in (b as Record<string, unknown>)) withId++;
  }
  return total > 0 && withId >= 2;
}

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(s: string): number {
  return s ? s.split(/\s+/).filter(Boolean).length : 0;
}

function robotsAllows(robotsTxt: string, bot: string): boolean {
  if (!robotsTxt) return true;
  const lines = robotsTxt.split(/\r?\n/);
  let currentAgents: string[] = [];
  let inMatching = false;
  let allow = false;
  let disallow = false;
  for (const raw of lines) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) {
      currentAgents = [];
      inMatching = false;
      continue;
    }
    const [keyRaw, ...rest] = line.split(":");
    const key = keyRaw.trim().toLowerCase();
    const val = rest.join(":").trim();
    if (key === "user-agent") {
      currentAgents.push(val.toLowerCase());
      inMatching = currentAgents.some(a => a === bot.toLowerCase());
    } else if (key === "disallow" && inMatching && val === "/") {
      disallow = true;
    } else if (key === "allow" && inMatching && (val === "/" || val === "")) {
      allow = true;
    }
  }
  return allow || !disallow;
}

function countSameAs(org: Record<string, unknown> | null): number {
  if (!org) return 0;
  const sa = org["sameAs"];
  if (Array.isArray(sa)) return sa.filter(x => typeof x === "string").length;
  if (typeof sa === "string") return 1;
  return 0;
}

type Check = (p: Probe, ld: unknown[]) => { score: number; note: string };

const CHECKS: Record<string, Check> = {
  // Block A - Entity / Identity
  a1: (p, ld) => {
    const org = findOrg(ld);
    if (!org) return { score: 0, note: "no Organization JSON-LD on homepage." };
    const graph = hasGraph(ld);
    const ids = hasIdAnchoring(ld);
    if (graph && ids) return { score: 5, note: "Organization JSON-LD nested in @graph with @id anchoring." };
    if (graph) return { score: 4, note: "Organization in @graph but @id anchoring is sparse." };
    if (org["@id"]) return { score: 3, note: "Organization JSON-LD present with @id but not in @graph." };
    return { score: 1, note: "flat Organization JSON-LD. no @id, no @graph nesting." };
  },
  a2: (p, ld) => {
    const org = findOrg(ld);
    const n = countSameAs(org);
    if (n >= 5) return { score: 5, note: `sameAs has ${n} entries.` };
    if (n >= 3) return { score: 3, note: `sameAs has ${n} entries. need ≥5 across Wikidata, LinkedIn, Crunchbase, GitHub, X.` };
    if (n >= 1) return { score: 1, note: `sameAs has ${n} entries. populate with ≥5 authoritative profiles.` };
    return { score: 0, note: "no sameAs on Organization schema." };
  },
  a3: (p, ld) => {
    const person = findPerson(ld);
    const org = findOrg(ld);
    if (!person) return { score: 0, note: "no Person schema for founder." };
    const linked = !!(person["worksFor"] || person["@id"]) && !!org;
    if (linked && hasIdAnchoring(ld)) return { score: 5, note: "Person schema present and linked to Organization via @id." };
    if (linked) return { score: 3, note: "Person schema present; linkage to Org could be tightened with @id anchoring." };
    return { score: 2, note: "Person schema present but isolated from Organization." };
  },
  a4: (p, ld) => {
    const item = findProductOrService(ld);
    if (!item) return { score: 0, note: "no Product / Service JSON-LD on homepage." };
    const hasOffers = !!item["offers"];
    const hasAudience = !!item["audience"];
    if (hasOffers && hasAudience) return { score: 5, note: "Product / Service schema with offers + audience." };
    if (hasOffers) return { score: 4, note: "Product / Service schema with offers; add audience for full credit." };
    return { score: 2, note: "Product / Service schema skeleton; missing offers and audience." };
  },
  a5: (p, ld) => {
    const org = findOrg(ld);
    const sa = org?.["sameAs"];
    const list = Array.isArray(sa) ? sa : typeof sa === "string" ? [sa] : [];
    const hasWikidata = list.some(u => typeof u === "string" && /wikidata\.org\/wiki\/Q\d+/i.test(u));
    if (hasWikidata) return { score: 5, note: "Wikidata Q-code referenced in sameAs." };
    return { score: 0, note: "no Wikidata Q-code. only attempt once ≥3 independent sources exist." };
  },

  // Block B - On-page Structure
  b6: (p) => {
    const text = stripTags(p.homepageHtml);
    const first200 = text.split(/\s+/).slice(0, 200).join(" ");
    const first100 = text.split(/\s+/).slice(0, 100).join(" ");
    const isYRe = /\b[A-Z][\w-]+\s+(?:is|are|does|helps?|builds?|lets?|gives?)\s+/;
    if (isYRe.test(first100)) return { score: 5, note: "'X is Y' definitional sentence within first 100 words." };
    if (isYRe.test(first200)) return { score: 3, note: "definitional sentence present but below first 100 words." };
    return { score: 1, note: "no clear definitional sentence in first 200 words." };
  },
  b7: (p, ld) => {
    const hasFaqBlock = /faq|frequently asked/i.test(p.homepageHtml);
    if (!hasFaqBlock && !hasType(ld, "FAQPage")) return { score: 3, note: "no FAQ block on homepage; schema not required at this scale." };
    if (!hasType(ld, "FAQPage")) return { score: 0, note: "FAQ block visible in DOM but no FAQPage JSON-LD." };
    const faq = ld.find(b => b && typeof b === "object" && hasType([b], "FAQPage")) as { mainEntity?: unknown[] } | undefined;
    const pairs = Array.isArray(faq?.mainEntity) ? faq.mainEntity.length : 0;
    if (pairs >= 5) return { score: 5, note: `FAQPage schema with ${pairs} Q&A pairs.` };
    if (pairs >= 1) return { score: 3, note: `FAQPage schema with ${pairs} Q&A pairs. need ≥5 for full credit.` };
    return { score: 2, note: "FAQPage schema present but mainEntity empty." };
  },
  b8: (p, ld) => {
    const hasHowTo = hasType(ld, "HowTo");
    const hasArticle = hasType(ld, ["Article", "TechArticle", "NewsArticle", "BlogPosting"]);
    if (hasHowTo && hasArticle) return { score: 5, note: "HowTo + Article schema present." };
    if (hasArticle) return { score: 3, note: "Article schema present. add HowTo on tutorial pages for full credit." };
    if (hasHowTo) return { score: 3, note: "HowTo schema present. add Article on long-form pages." };
    return { score: 0, note: "no HowTo or Article schema detected on homepage scan." };
  },
  b9: (p) => {
    if (p.llmsTxtStatus !== 200) return { score: 0, note: "no /llms.txt." };
    const lineCount = (p.llmsTxtBody.match(/^- \[/gm) || []).length;
    if (lineCount >= 10) return { score: 5, note: `valid /llms.txt with ${lineCount} prioritised URLs.` };
    if (lineCount >= 3) return { score: 3, note: `/llms.txt present with ${lineCount} URLs. need ≥10 for full credit.` };
    return { score: 1, note: "/llms.txt present but empty or only homepage entry." };
  },
  b10: (p) => {
    if (p.robotsStatus === 0) return { score: 0, note: "robots.txt unreachable." };
    const bots = ["GPTBot", "PerplexityBot", "Google-Extended", "ClaudeBot", "CCBot"];
    const allowed = bots.filter(b => robotsAllows(p.robotsTxt, b));
    if (allowed.length === bots.length) return { score: 5, note: `robots.txt allows all ${bots.length} AI bots.` };
    if (allowed.length >= 3) return { score: 3, note: `robots.txt allows ${allowed.length} of ${bots.length} AI bots.` };
    if (allowed.length >= 1) return { score: 1, note: `robots.txt allows only ${allowed.length} AI bot(s).` };
    return { score: 0, note: "robots.txt blocks all AI bots." };
  },

  // Block C - Content Depth
  c11: (p) => {
    if (p.useCasesStatus !== 200) return { score: 0, note: "no /use-cases/ directory." };
    return { score: 3, note: "/use-cases/ directory present. validate page count + Product schema in the audit call." };
  },
  c12: (p) => {
    if (p.vsStatus !== 200) return { score: 0, note: "no /vs/ comparison pages." };
    return { score: 3, note: "/vs/ directory present. validate honest comparison structure in the audit call." };
  },
  c13: (p) => {
    if (p.integrationsStatus !== 200) return { score: 0, note: "no /integrations/ directory." };
    return { score: 3, note: "/integrations/ directory present. validate ≥5 integration pages in the audit call." };
  },
  c14: (p) => {
    if (p.blogStatus !== 200 && p.changelogStatus !== 200) {
      return { score: 0, note: "no /blog or /changelog detected." };
    }
    return { score: 3, note: "/blog or /changelog present. cadence + Article schema verified in the audit call." };
  },

  // Block D - Off-site / Distribution (homepage scan can only probe sameAs entries)
  d15: (p, ld) => {
    const org = findOrg(ld);
    const sa = org?.["sameAs"];
    const list = Array.isArray(sa) ? sa : typeof sa === "string" ? [sa] : [];
    const has = list.some(u => typeof u === "string" && /crunchbase\.com\/organization/i.test(u));
    if (has) return { score: 4, note: "Crunchbase profile referenced in sameAs. completeness verified in the audit call." };
    return { score: 0, note: "no Crunchbase profile in sameAs." };
  },
  d16: (p, ld) => {
    const org = findOrg(ld);
    const sa = org?.["sameAs"];
    const list = Array.isArray(sa) ? sa : typeof sa === "string" ? [sa] : [];
    const has = list.some(u => typeof u === "string" && /linkedin\.com\/company\//i.test(u));
    if (has) return { score: 3, note: "LinkedIn org page referenced in sameAs. post cadence verified in the audit call." };
    return { score: 0, note: "no LinkedIn org page in sameAs." };
  },
  d17: (p, ld) => {
    const org = findOrg(ld);
    const sa = org?.["sameAs"];
    const list = Array.isArray(sa) ? sa : typeof sa === "string" ? [sa] : [];
    const has = list.some(u => typeof u === "string" && /producthunt\.com\/products/i.test(u));
    if (has) return { score: 4, note: "ProductHunt listing referenced in sameAs." };
    return { score: 0, note: "no ProductHunt listing in sameAs." };
  },
  d18: (p, ld) => {
    const org = findOrg(ld);
    const sa = org?.["sameAs"];
    const list = Array.isArray(sa) ? sa : typeof sa === "string" ? [sa] : [];
    const has = list.some(u => typeof u === "string" && /(g2|capterra|trustpilot)\.com/i.test(u));
    if (has) return { score: 4, note: "G2 / Capterra / Trustpilot listing referenced in sameAs." };
    return { score: 0, note: "no G2 / Capterra / Trustpilot listing in sameAs." };
  },
};

const ENGINE_FOCUS: Record<AuditEngine["key"], string[]> = {
  chatgpt:    ["a1", "a2", "b6", "b9", "b10", "d15", "d16"],
  perplexity: ["a1", "a2", "b10", "b9", "c11", "c14", "d17"],
  gemini:     ["a1", "a2", "a3", "a4", "b6", "b7", "b8", "d15"],
};

const ENGINE_TYPICAL: Record<AuditEngine["key"], number> = {
  chatgpt: 78, perplexity: 74, gemini: 71,
};

function engineScore(results: SignalResult[], focus: string[]): number {
  const map = new Map(results.map(r => [r.id, r] as const));
  let earned = 0, max = 0;
  for (const id of focus) {
    const r = map.get(id);
    if (!r) continue;
    max += 5;
    earned += r.score;
  }
  if (max === 0) return 0;
  return Math.round((earned / max) * 100);
}

function blockBreakdown(results: SignalResult[]): { blocks: BlockBreakdown[]; weightedTotal: number } {
  const idByBlock: Record<"A" | "B" | "C" | "D", string[]> = {
    A: ["a1", "a2", "a3", "a4", "a5"],
    B: ["b6", "b7", "b8", "b9", "b10"],
    C: ["c11", "c12", "c13", "c14"],
    D: ["d15", "d16", "d17", "d18"],
  };
  const map = new Map(results.map(r => [r.id, r] as const));
  const out: BlockBreakdown[] = [];
  let weightedTotal = 0;
  for (const meta of blocks) {
    const ids = idByBlock[meta.key];
    const raw = ids.reduce((a, id) => a + (map.get(id)?.score ?? 0), 0);
    const weighted = raw * meta.multiplier;
    weightedTotal += weighted;
    out.push({
      key: meta.key,
      label: meta.label,
      rawScore: raw,
      rawMax: meta.rawMax,
      weightedScore: Math.round(weighted * 10) / 10,
      weightedMax: meta.rawMax * meta.multiplier,
      multiplier: meta.multiplier,
    });
  }
  return { blocks: out, weightedTotal };
}

function normalize(weighted: number): number {
  return Math.round((weighted / RAW_MAX) * 100);
}

function decileFor(score: number): string {
  if (score >= 80) return "top decile · b2b saas";
  if (score >= 65) return "top quartile · b2b saas";
  if (score >= 50) return "median · b2b saas";
  if (score >= 35) return `${Math.round(score / 1.7)}th percentile · b2b saas`;
  return "bottom decile · b2b saas";
}

function buildTopFixes(results: SignalResult[], host: string): TopFix[] {
  const candidates: Record<string, Omit<TopFix, "rank">> = {
    a1: {
      signalId: "a1", num: 1, title: "organization json-ld",
      current: `${host} ships flat or missing Organization schema. engines can't traverse to Person, Product, or sameAs without @graph + @id linkage.`,
      ship: "wrap Org + Person + Product in @graph with @id anchoring. reciprocal founder/employee links. populate sameAs (≥5).",
      projectedDelta: 12, effort: "med",
    },
    a2: {
      signalId: "a2", num: 2, title: "sameas density",
      current: "thin sameAs leaves engines unable to disambiguate the brand from namesakes.",
      ship: "populate sameAs with Wikidata + LinkedIn + Crunchbase + GitHub + X. each verified 200 + matching brand.",
      projectedDelta: 8, effort: "low",
    },
    a3: {
      signalId: "a3", num: 3, title: "person schema (founder)",
      current: "no founder Person schema. engines have no human entity to attach authority to.",
      ship: "Person schema for the founder, linked to Organization @id with reciprocal worksFor + employee fields.",
      projectedDelta: 6, effort: "low",
    },
    b6: {
      signalId: "b6", num: 6, title: "definitional first 200w",
      current: `${host} opens with brand story or setup before stating what you actually do. engines cite paragraphs that lead with the claim.`,
      ship: "rewrite first 100 words to lead with a 'X is Y' definitional sentence. brand story moves below the lead.",
      projectedDelta: 8, effort: "low",
    },
    b7: {
      signalId: "b7", num: 7, title: "faqpage schema",
      current: "FAQ block present in DOM but no FAQPage JSON-LD. engines treat it as generic content.",
      ship: "FAQPage JSON-LD on homepage + concept pages. ≥5 Q&A pairs, answers ≥80 words.",
      projectedDelta: 5, effort: "low",
    },
    b9: {
      signalId: "b9", num: 9, title: "llms.txt at root",
      current: "no /llms.txt. engines have no curated map of what to cite from your site.",
      ship: "ship /llms.txt with prioritised URL list and one-line summaries. auto-regen on deploy.",
      projectedDelta: 9, effort: "low",
    },
    b10: {
      signalId: "b10", num: 10, title: "ai bot allowlist",
      current: "robots.txt or CDN blocks one or more of GPTBot, PerplexityBot, Google-Extended, ClaudeBot, CCBot.",
      ship: "explicit Allow for all five AI bots. CDN firewall whitelist. verify against each bot's probe.",
      projectedDelta: 10, effort: "low",
    },
    c11: {
      signalId: "c11", num: 11, title: "/use-cases/ pages",
      current: "no /use-cases/ surface. you don't show up on intent queries like 'X for Y'.",
      ship: "ship ≥3 use-case pages with Product schema, definitional lead, and named persona.",
      projectedDelta: 5, effort: "med",
    },
    c14: {
      signalId: "c14", num: 14, title: "/blog or /changelog",
      current: "no fresh long-form content. engines weight freshness as a relevance signal.",
      ship: "5 ghostwritten blog posts in 6 days. Article schema on each. changelog cadence kicked off.",
      projectedDelta: 6, effort: "med",
    },
    d15: {
      signalId: "d15", num: 15, title: "crunchbase entry",
      current: "no Crunchbase profile linked from Org schema. engines can't ground basic company facts.",
      ship: "create/populate Crunchbase entry. cross-link in sameAs. refresh news cards.",
      projectedDelta: 5, effort: "low",
    },
    d16: {
      signalId: "d16", num: 16, title: "linkedin org page",
      current: "LinkedIn org page bare or stale. engines pull fact gaps from LinkedIn.",
      ship: "complete every org field, post 4× in the 6-day window, claim verified badge if eligible.",
      projectedDelta: 4, effort: "low",
    },
    d18: {
      signalId: "d18", num: 18, title: "g2 / capterra / trustpilot",
      current: "no review platform claimed. no sentiment signal for engines.",
      ship: "claim G2 + Capterra (B2B). push reviews from existing customers via template.",
      projectedDelta: 4, effort: "low",
    },
  };

  const ranked = results
    .filter(r => r.score < 4 && candidates[r.id])
    .map(r => ({ fix: candidates[r.id], score: r.score }))
    .sort((a, b) => (b.fix.projectedDelta - a.fix.projectedDelta) || (a.score - b.score))
    .slice(0, 3)
    .map(({ fix }, i) => ({ ...fix, rank: i + 1 }));
  return ranked;
}

function buildSampleFix(): SampleFix {
  return {
    signalNum: 1,
    signalTitle: "organization json-ld",
    before:
`<!-- /index.html -->
<head>
  <title>Acme - AI workflow platform</title>
  <meta name="description" content="..." />

  <script type="application/ld+json">{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Acme",
    "url": "https://acme.ai"
  }</script>
</head>`,
    after:
`<!-- /index.html -->
<head>
  <title>Acme - AI workflow platform</title>
  <meta name="description" content="..." />

  <script type="application/ld+json">{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id":   "https://acme.ai/#org",
        "name":  "Acme",
        "url":   "https://acme.ai",
        "logo":  "https://acme.ai/logo.png",
        "founder": { "@id": "https://acme.ai/#founder" },
        "sameAs": [
          "https://www.linkedin.com/company/acme-ai",
          "https://www.crunchbase.com/organization/acme-ai",
          "https://github.com/acme-ai",
          "https://x.com/acme_ai",
          "https://www.wikidata.org/wiki/Q123456789"
        ]
      },
      {
        "@type": "Person",
        "@id":   "https://acme.ai/#founder",
        "name":  "Jane Doe",
        "jobTitle": "Founder & CEO",
        "worksFor": { "@id": "https://acme.ai/#org" }
      },
      {
        "@type": "Product",
        "@id":   "https://acme.ai/#product",
        "name":  "Acme",
        "brand": { "@id": "https://acme.ai/#org" },
        "offers": { "@type": "Offer", "price": "49", "priceCurrency": "USD" }
      }
    ]
  }</script>
</head>`,
    note: "validated in Google Rich Results Test. signal a1 moves 1 → 5.",
  };
}

const DAY_PLAN: DayPlan[] = [
  { day: 1, label: "entity",   scope: "Block A · Org @graph · Person · Product · sameAs · Wikidata if eligible",                       ships: "PR #1 entity wiring" },
  { day: 2, label: "on-page",  scope: "Block B · definitional first 200w · FAQPage · HowTo / Article · llms.txt · AI bot allowlist",  ships: "PR #2 on-page structure" },
  { day: 3, label: "content",  scope: "Block C half · /use-cases/ scaffolds · /vs/ pages · /integrations/ index",                       ships: "PR #3 content architecture" },
  { day: 4, label: "depth",    scope: "Block C finish · 5 blog posts ghostwritten · changelog cadence kicked off",                     ships: "PR #4 content depth" },
  { day: 5, label: "off-site", scope: "Block D · Crunchbase · LinkedIn refresh · ProductHunt claim · G2 / Capterra push template",     ships: "off-site playbook" },
  { day: 6, label: "verify",   scope: "QA across 4 engines · final 18-signal scan · day-0 vs day-7 delta · engagement doc",            ships: "delta report + handoff" },
];

function makeScanIdShort(): string {
  const hex = () => Math.floor(Math.random() * 16).toString(16);
  return Array.from({ length: 4 }, hex).join("") + "-" + Array.from({ length: 3 }, hex).join("");
}

function makeScannedAt(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const yy = String(d.getUTCFullYear()).slice(-2);
  return `${pad(d.getUTCDate())}.${pad(d.getUTCMonth() + 1)}.${yy} · ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;
}

function oneLinerFor(engines: AuditEngine[], overall: number, host: string): string {
  const worst = [...engines].sort((a, b) => a.score - b.score)[0];
  if (overall >= 70) return `${host} is broadly visible. tune for citation share, not access.`;
  if (worst.score < 35) return `you're invisible in ${worst.label}. fixable in 6 days.`;
  return `${host} is half-indexed. ${worst.label} is the bottleneck.`;
}

export async function gradeDomain(rawDomain: string): Promise<GradedAudit> {
  const { origin, host } = normaliseDomain(rawDomain);
  const probeResult = await probe(origin);
  const ld = findJsonLd(probeResult.homepageHtml);

  const signalResults: SignalResult[] = Object.entries(CHECKS).map(([id, check]) => {
    const { score, note } = check(probeResult, ld);
    return { id, score, weight: 5, passed: score >= 4, note };
  });

  const engines: AuditEngine[] = (["chatgpt", "perplexity", "gemini"] as const).map(key => {
    const score = engineScore(signalResults, ENGINE_FOCUS[key]);
    return {
      key,
      label: key,
      score,
      typicalGood: ENGINE_TYPICAL[key],
      citedPct: Math.max(1, Math.round(score / 8)),
    };
  });

  const { blocks: blockBd, weightedTotal } = blockBreakdown(signalResults);
  const overall = normalize(weightedTotal);
  const topFixes = buildTopFixes(signalResults, host);
  const projectedDelta = topFixes.reduce((a, f) => a + f.projectedDelta, 0);
  const projectedScore = Math.min(95, overall + projectedDelta);

  return {
    domain: host,
    scanIdShort: makeScanIdShort(),
    scannedAt: makeScannedAt(),
    overallScore: overall,
    projectedScore,
    median: 54,
    decile: decileFor(overall),
    oneLiner: oneLinerFor(engines, overall, host),
    engines,
    signalResults,
    blocks: blockBd,
    topFixes,
    sampleFix: buildSampleFix(),
    dayPlan: DAY_PLAN,
  };
}
