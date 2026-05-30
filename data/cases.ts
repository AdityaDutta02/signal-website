export type EngineScore = { engine: string; before: number; after: number };

export type CaseStudy = {
  slug: string;
  company: string;
  domain: string;
  industry: string;
  stage: string;
  oneLiner: string;
  problem: string;
  shipped: { signal: string; what: string }[];
  scores: EngineScore[];
  quote: { text: string; name: string; role: string };
  shippedAt: string;
  reScoredAt: string;
  outcome?: { value: string; label: string };
};

export const cases: CaseStudy[] = [
  {
    slug: "vellum",
    company: "Vellum",
    domain: "vellum.ai",
    industry: "AI infrastructure",
    stage: "Series A",
    oneLiner: "LLM development platform for production teams.",
    problem:
      "Vellum's docs and marketing pages were SPA-rendered. ChatGPT cited competitors instead - the crawler was reading a blank shell. Strong organic on Google, near-zero presence in answer engines.",
    shipped: [
      { signal: "05 · ssr content", what: "Migrated /docs and /product to Next.js SSR. First-byte HTML now carries 92% of page text, up from 11%." },
      { signal: "09 · gptbot allow", what: "Repaired CloudFront WAF rule that was silently blocking GPTBot, PerplexityBot, ClaudeBot at the edge." },
      { signal: "13 · answer-first copy", what: "Rewrote top 12 product pages to lead with a 28-word definitional answer. Schema added on each." },
    ],
    scores: [
      { engine: "chatgpt", before: 32, after: 71 },
      { engine: "perplexity", before: 28, after: 64 },
      { engine: "gemini", before: 41, after: 70 },
    ],
    quote: {
      text: "We went from 'no results' on prompts our buyers were running to being the first cited platform. Six days. One PR. Done.",
      name: "Akash Sharma",
      role: "Co-founder, Vellum",
    },
    shippedAt: "oct 14 '25",
    reScoredAt: "oct 14 '25",
    outcome: { value: "+27", label: "demo requests · delivery vs day 0" },
  },
  {
    slug: "stack-foundry",
    company: "Stack Foundry",
    domain: "stackfoundry.dev",
    industry: "Data platform",
    stage: "Seed",
    oneLiner: "Event streaming infrastructure for AI products.",
    problem:
      "Strong Google rankings but zero answer-engine presence. The marketing site rendered cleanly but said the right things in the wrong order - definitions buried below the fold, no schema, no llms.txt.",
    shipped: [
      { signal: "13 · answer-first copy", what: "Restructured hero and concept pages to lead with definition-style claims in the first 40 words." },
      { signal: "01 · article schema", what: "Added Article + TechArticle JSON-LD across the docs, validated in Rich Results." },
      { signal: "12 · llms.txt", what: "Generated /llms.txt with prioritised URL list and one-line summaries for each concept page." },
    ],
    scores: [
      { engine: "chatgpt", before: 41, after: 68 },
      { engine: "perplexity", before: 37, after: 61 },
      { engine: "gemini", before: 39, after: 67 },
    ],
    quote: {
      text: "Honest engineering work. No retainer pitch, no AI-SEO snake oil. Just a PR with the fixes and a verified delta before handoff.",
      name: "Mei Tanaka",
      role: "Founder, Stack Foundry",
    },
    shippedAt: "sep 22 '25",
    reScoredAt: "sep 22 '25",
    outcome: { value: "1st", label: "cited platform on 4 of 7 buyer prompts" },
  },
  {
    slug: "numerade",
    company: "Numerade",
    domain: "numerade.io",
    industry: "Developer tools",
    stage: "Seed",
    oneLiner: "Type-safe numerical computing for production code.",
    problem:
      "Hot new product, single-React-component landing page. Engines saw nothing. Founders were getting demo requests from Google but zero mention in ChatGPT.",
    shipped: [
      { signal: "05 · ssr content", what: "Moved marketing site to Astro. SSG output with hydration-optional islands for interactivity." },
      { signal: "13 · answer-first copy", what: "Wrote definitional 'what is type-safe numerical computing' page as the new index target." },
      { signal: "03 · org schema", what: "Organization schema with sameAs to LinkedIn, GitHub, Crunchbase to disambiguate from look-alikes." },
    ],
    scores: [
      { engine: "chatgpt", before: 18, after: 62 },
      { engine: "perplexity", before: 22, after: 59 },
      { engine: "gemini", before: 25, after: 65 },
    ],
    quote: {
      text: "The +40 delta is real but the bigger thing was the diagnosis. Now I understand the signal layer instead of just throwing content at the wall.",
      name: "Ravi Krishnan",
      role: "Founder, Numerade",
    },
    shippedAt: "aug 30 '25",
    reScoredAt: "aug 30 '25",
    outcome: { value: "+40", label: "average score delta across 3 engines" },
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}

export function avgDelta(c: CaseStudy): number {
  return Math.round(
    c.scores.reduce((a, s) => a + (s.after - s.before), 0) / c.scores.length
  );
}

export function avgBefore(c: CaseStudy): number {
  return Math.round(c.scores.reduce((a, s) => a + s.before, 0) / c.scores.length);
}

export function avgAfter(c: CaseStudy): number {
  return Math.round(c.scores.reduce((a, s) => a + s.after, 0) / c.scores.length);
}
