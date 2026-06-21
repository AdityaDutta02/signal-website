// Per-prospect audit data - the page emailed to every submitted URL.
// Demo dataset for /audit/demo. Real audits come from lib/grader.ts.

export type SignalResult = {
  id: string;          // signal id (a1..d18)
  score: number;       // 0-5
  weight: number;      // raw max for the signal (always 5; kept for display backwards-compat)
  passed: boolean;     // score >= 4 → pass; score 2-3 → partial; score <= 1 → fail
  note: string;
};

export type AuditEngine = {
  key: "chatgpt" | "perplexity" | "gemini";
  label: string;
  score: number;
  typicalGood: number;
  citedPct: number;
};

export type TopFix = {
  rank: number;
  signalId: string;
  num: number;
  title: string;
  current: string;
  ship: string;
  projectedDelta: number;
  effort: "low" | "med" | "high";
};

export type DayPlan = {
  day: number;
  label: string;
  scope: string;
  ships: string;
};

export type SampleFix = {
  signalNum: number;
  signalTitle: string;
  before: string;
  after: string;
  note: string;
};

export type BlockBreakdown = {
  key: "A" | "B" | "C" | "D";
  label: string;
  rawScore: number;
  rawMax: number;
  weightedScore: number;
  weightedMax: number;
  multiplier: number;
};

export const auditData = {
  domain: "acme.ai",
  scanIdShort: "7c2a-19b",
  scannedAt: "12.11.25 · 14:22 UTC",
  overallScore: 38,
  projectedScore: 71,
  median: 54,
  decile: "32nd percentile · b2b saas",
  oneLiner: "you're invisible in ChatGPT. fixable in 6 days.",

  engines: [
    { key: "chatgpt",    label: "chatgpt",    score: 31, typicalGood: 78, citedPct: 4  },
    { key: "perplexity", label: "perplexity", score: 28, typicalGood: 74, citedPct: 6  },
    { key: "gemini",     label: "gemini",     score: 42, typicalGood: 71, citedPct: 11 },
  ] as AuditEngine[],

  blocks: [
    { key: "A", label: "entity / identity",       rawScore: 4,  rawMax: 25, weightedScore: 6,    weightedMax: 37.5, multiplier: 1.5 },
    { key: "B", label: "on-page structure",       rawScore: 10, rawMax: 25, weightedScore: 10,   weightedMax: 25,   multiplier: 1.0 },
    { key: "C", label: "content depth",           rawScore: 5,  rawMax: 20, weightedScore: 5,    weightedMax: 20,   multiplier: 1.0 },
    { key: "D", label: "off-site / distribution", rawScore: 8,  rawMax: 20, weightedScore: 11.2, weightedMax: 28,   multiplier: 1.4 },
  ] as BlockBreakdown[],

  signalResults: [
    // Block A
    { id: "a1", score: 1, weight: 5, passed: false, note: "Organization JSON-LD present but flat. no @id linkage." },
    { id: "a2", score: 2, weight: 5, passed: false, note: "sameAs has 2 entries. need ≥5 across Wikidata, LinkedIn, Crunchbase, GitHub, X." },
    { id: "a3", score: 0, weight: 5, passed: false, note: "no Person schema for founder." },
    { id: "a4", score: 1, weight: 5, passed: false, note: "Product schema skeleton present, no offers or features." },
    { id: "a5", score: 0, weight: 5, passed: false, note: "no Wikidata Q-code. needs 3+ independent sources first." },

    // Block B
    { id: "b6",  score: 2, weight: 5, passed: false, note: "homepage opens with brand story, not definitional claim." },
    { id: "b7",  score: 0, weight: 5, passed: false, note: "FAQ block visible. no FAQPage JSON-LD." },
    { id: "b8",  score: 3, weight: 5, passed: false, note: "Article schema on /blog. missing HowTo on /docs." },
    { id: "b9",  score: 0, weight: 5, passed: false, note: "no /llms.txt." },
    { id: "b10", score: 5, weight: 5, passed: true,  note: "robots.txt allows GPTBot, PerplexityBot, ClaudeBot, CCBot, Google-Extended." },

    // Block C
    { id: "c11", score: 2, weight: 5, passed: false, note: "1 use-case page. needs ≥3 with Product schema." },
    { id: "c12", score: 0, weight: 5, passed: false, note: "no /vs/ pages." },
    { id: "c13", score: 0, weight: 5, passed: false, note: "no /integrations/ directory." },
    { id: "c14", score: 3, weight: 5, passed: false, note: "blog active, 4 posts in 90 days, missing Article schema on 2." },

    // Block D
    { id: "d15", score: 4, weight: 5, passed: true,  note: "Crunchbase populated, last updated 22 days ago." },
    { id: "d16", score: 2, weight: 5, passed: false, note: "LinkedIn org page complete but last post 58 days ago." },
    { id: "d17", score: 0, weight: 5, passed: false, note: "no ProductHunt listing." },
    { id: "d18", score: 2, weight: 5, passed: false, note: "G2 listing unclaimed. no Capterra." },
  ] as SignalResult[],

  topFixes: [
    {
      rank: 1, signalId: "a1", num: 1, title: "organization json-ld",
      current: "Org schema is a flat block with no @id anchoring and no relationships. Engines can't traverse to Person, Product, or sameAs.",
      ship: "Wrap Org + Person + Product in @graph with @id linkage. Reciprocal founder/employee links. Reference Wikidata Q-code when ready.",
      projectedDelta: 12, effort: "med",
    },
    {
      rank: 2, signalId: "b9", num: 9, title: "llms.txt at root",
      current: "No /llms.txt. Engines have no curated map of what to cite from acme.ai.",
      ship: "Generate /llms.txt with prioritised URL list and one-line summaries. Auto-regen on deploy.",
      projectedDelta: 9, effort: "low",
    },
    {
      rank: 3, signalId: "b6", num: 6, title: "definitional first 200w",
      current: "Homepage opens with brand story before stating what acme.ai actually does.",
      ship: "Rewrite first 100 words to lead with a single 'X is Y' definitional sentence. Brand story moves below the lead.",
      projectedDelta: 8, effort: "low",
    },
  ] as TopFix[],

  sampleFix: {
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
        "@type":   "Product",
        "@id":     "https://acme.ai/#product",
        "name":    "Acme",
        "brand":   { "@id": "https://acme.ai/#org" },
        "offers":  { "@type": "Offer", "price": "49", "priceCurrency": "USD" }
      }
    ]
  }</script>
</head>`,
    note: "validated in Google Rich Results Test. signal a1 moves 1 → 5.",
  } as SampleFix,

  dayPlan: [
    { day: 1, label: "entity",   scope: "Block A · Org @graph · Person · Product · sameAs · Wikidata if eligible",                       ships: "PR #1 entity wiring" },
    { day: 2, label: "on-page",  scope: "Block B · definitional first 200w · FAQPage · HowTo / Article · llms.txt · AI bot allowlist",  ships: "PR #2 on-page structure" },
    { day: 3, label: "content",  scope: "Block C half · /use-cases/ scaffolds · /vs/ pages · /integrations/ index",                       ships: "PR #3 content architecture" },
    { day: 4, label: "depth",    scope: "Block C finish · 5 blog posts ghostwritten · changelog cadence kicked off",                     ships: "PR #4 content depth" },
    { day: 5, label: "off-site", scope: "Block D · Crunchbase · LinkedIn refresh · ProductHunt claim · G2 / Capterra push template",     ships: "off-site playbook" },
    { day: 6, label: "verify",   scope: "QA across 4 engines · final 18-signal scan · day-0 vs day-7 delta · engagement doc",            ships: "delta report + handoff" },
  ] as DayPlan[],
} as const;
