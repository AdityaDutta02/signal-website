export type Block = "A" | "B" | "C" | "D";

export type Signal = {
  id: string;
  num: number;
  title: string;
  block: Block;
  fix: boolean;
  x: number;
  y: number;
  problem: string;
  solution: string;
  scoringCriteria: string;
  howWeTest: string;
  failureLooks: string;
};

export type BlockMeta = {
  key: Block;
  label: string;
  rawMax: number;
  multiplier: number;
  rationale: string;
  description: string;
};

export const blocks: BlockMeta[] = [
  {
    key: "A",
    label: "entity / identity",
    rawMax: 25,
    multiplier: 1.5,
    rationale: "biggest brand-recognition driver. hardest to move without us.",
    description: "Whether AI engines can recognise you as a distinct entity. Schema, sameAs, Wikidata, founder grounding.",
  },
  {
    key: "B",
    label: "on-page structure",
    rawMax: 25,
    multiplier: 1.0,
    rationale: "foundational. fast to deliver. table-stakes for citation.",
    description: "Whether AI can parse your homepage cleanly. Definitional copy, FAQ + HowTo schema, llms.txt, bot allowlist.",
  },
  {
    key: "C",
    label: "content depth",
    rawMax: 20,
    multiplier: 1.0,
    rationale: "bulk content signal. we fully control during the build.",
    description: "Whether you have enough surface area to be cited. /use-cases/, /vs/, /integrations/, blog or changelog cadence.",
  },
  {
    key: "D",
    label: "off-site / distribution",
    rawMax: 20,
    multiplier: 1.4,
    rationale: "drives sentiment + share of voice. partly client-dependent.",
    description: "Whether your brand exists outside your own domain. Crunchbase, LinkedIn, ProductHunt, G2 / Capterra / Trustpilot.",
  },
];

export const RAW_MAX = 25 * 1.5 + 25 + 20 + 20 * 1.4; // 115
export const SHIP_FLOOR = 15;

type SignalDef = Omit<Signal, "x" | "y">;

const defs: SignalDef[] = [
  // Block A - Entity / Identity (5 signals, raw 25)
  { id: "a1", num: 1, title: "organization json-ld",   block: "A", fix: true,
    problem: "Engines can't tell who you are. Without nested Org schema with @id anchoring, you read as a generic page.",
    solution: "Organization JSON-LD wrapped in @graph with @id anchoring, linked to Person (founder) + Product/Service.",
    scoringCriteria: "0 none. 1 flat schema. 5 nested with @id anchoring inside @graph wrapper.",
    howWeTest: "Fetch raw HTML. Parse application/ld+json blocks. Walk @graph. Score by @id linkage depth.",
    failureLooks: "No JSON-LD, or single flat Org block with no @id and no relationships to Person/Service." },
  { id: "a2", num: 2, title: "sameas density",         block: "A", fix: false,
    problem: "Engines disambiguate brands by sameAs. Empty sameAs means you compete with every namesake company in their index.",
    solution: "Populate sameAs with Wikidata + LinkedIn + Crunchbase + GitHub + X. Each verified 200 + matching brand name.",
    scoringCriteria: "Count of authoritative profiles in sameAs. 0 = 0. 5 = ≥5 with verified 200 responses.",
    howWeTest: "Parse Org block. HEAD each sameAs URL. Cross-reference brand-name match. Score by population.",
    failureLooks: "sameAs missing entirely, or pointing to dead URLs / wrong-brand profiles." },
  { id: "a3", num: 3, title: "person schema (founder)", block: "A", fix: false,
    problem: "AI can't attribute authority to a brand without a named, schema-grounded human behind it.",
    solution: "Person schema for the founder with @id linkage back to Organization. JobTitle + sameAs to LinkedIn + GitHub.",
    scoringCriteria: "0 none. 3 Person present but isolated. 5 complete with @id linkage to Org + sameAs.",
    howWeTest: "Look for @type Person in @graph. Verify reciprocal founder/employee link to Org @id.",
    failureLooks: "No Person schema, or Person present but unlinked to the Organization block." },
  { id: "a4", num: 4, title: "product / service schema", block: "A", fix: false,
    problem: "Without a Product or Service block engines have no canonical answer to 'what does this company sell?'.",
    solution: "Product or Service JSON-LD with offers + features + audience. Linked to Organization @id.",
    scoringCriteria: "0 missing. 5 full Product or Service with offers (price + currency) + features + audience.",
    howWeTest: "Parse application/ld+json for @type Product or Service. Check offers, features, audience completeness.",
    failureLooks: "No Product/Service schema, or skeleton block missing offers and audience." },
  { id: "a5", num: 5, title: "wikidata q-code",         block: "A", fix: false,
    problem: "Wikidata is the source of truth for entity grounding across every major LLM. No Q-code = no canonical entity record.",
    solution: "Created only when ≥3 independent acceptable sources exist (TechCrunch, Forbes, podcast, conference, funding announce).",
    scoringCriteria: "0 none. 3 attempted but pending. 5 exists with site backlink + sameAs reciprocity.",
    howWeTest: "Query Wikidata for the brand. Check site backlink and sameAs reciprocity in Org schema.",
    failureLooks: "No Wikidata entry, or page deleted by editors for lack of independent sources." },

  // Block B - On-page Structure (5 signals, raw 25)
  { id: "b6", num: 6, title: "definitional first 200w", block: "B", fix: true,
    problem: "Engines cite paragraphs that open with a definitional 'X is Y' claim. Most marketing pages bury the claim below the fold.",
    solution: "Rewrite homepage opening 200 words to lead with a single definitional sentence in the first 100.",
    scoringCriteria: "0 no clear definition. 3 def present below first 100. 5 'X is Y' sentence within first 100 words.",
    howWeTest: "Strip tags from first 1.5kb of body HTML. Regex for 'X is/are/does Y' pattern. Score position within first 100 words.",
    failureLooks: "Page opens with 'In today's landscape…' or brand story before stating what you do." },
  { id: "b7", num: 7, title: "faqpage schema",          block: "B", fix: true,
    problem: "Q&A blocks aren't surfaced as direct citations without FAQPage schema. Engines treat them as generic content.",
    solution: "FAQPage JSON-LD on the homepage + any concept page. ≥5 Q&A pairs, answers ≥80 words each.",
    scoringCriteria: "0 none. 3 schema present, <5 pairs or short answers. 5 ≥5 pairs with ≥80-word answers.",
    howWeTest: "Parse application/ld+json for FAQPage. Count mainEntity Q&A pairs. Word-count each acceptedAnswer.",
    failureLooks: "FAQ block visible in DOM but no FAQPage schema, or schema present with terse one-line answers." },
  { id: "b8", num: 8, title: "howto / article schema",  block: "B", fix: false,
    problem: "Docs and concept pages need HowTo or Article schema to be cited as procedural answers.",
    solution: "HowTo on tutorial pages. Article + author + datePublished on every long-form URL.",
    scoringCriteria: "0 none. 3 present on a single page. 5 present on ≥3 pages with valid required fields.",
    howWeTest: "Crawl /docs and /blog. Parse JSON-LD. Validate HowTo step structure + Article author/datePublished.",
    failureLooks: "Long-form posts with no HowTo or Article schema, or schema missing author or datePublished." },
  { id: "b9", num: 9, title: "llms.txt at root",        block: "B", fix: true,
    problem: "Without /llms.txt, engines have no curated map of what to cite from your site. They guess - badly.",
    solution: "Curated markdown index at the root listing primary URLs with one-line summaries.",
    scoringCriteria: "0 none. 3 file exists but skeleton. 5 valid curated markdown index with ≥10 prioritised URLs + summaries.",
    howWeTest: "GET /llms.txt. Verify 200 + non-empty. Parse markdown links. Score count + summary presence.",
    failureLooks: "404 on /llms.txt, or file exists but contains only the homepage URL with no summary." },
  { id: "b10", num: 10, title: "ai bot allowlist",      block: "B", fix: true,
    problem: "62% of B2B sites accidentally block GPTBot / PerplexityBot via CDN defaults. The whole site becomes invisible to AI search.",
    solution: "robots.txt explicit allow for GPTBot, PerplexityBot, Google-Extended, ClaudeBot, CCBot. CDN firewall passes each UA.",
    scoringCriteria: "0 blocked. 3 some allowed. 5 explicit allowlist for all five (GPTBot, PerplexityBot, Google-Extended, ClaudeBot, CCBot).",
    howWeTest: "Fetch /robots.txt. Parse user-agent blocks. Verify Allow rule (or absence of Disallow) for each of the five UAs.",
    failureLooks: "robots.txt blocks GPTBot, or CDN WAF returns 403 on AI-bot user-agents before robots.txt is reached." },

  // Block C - Content Depth (4 signals, raw 20)
  { id: "c11", num: 11, title: "/use-cases/ pages",     block: "C", fix: false,
    problem: "Use-case pages are how engines answer 'what is X used for?'. Without them you don't surface on intent queries.",
    solution: "≥3 use-case pages with structured Product schema, definitional lead, and named user persona.",
    scoringCriteria: "0 none. 3 ≥1 use-case. 5 ≥3 with Product schema + definitional lead + persona.",
    howWeTest: "Crawl for /use-cases/* URLs. Parse Product schema. Score word count + persona naming.",
    failureLooks: "No use-cases section, or use-cases that read as marketing without Product schema or persona grounding." },
  { id: "c12", num: 12, title: "/vs/{competitor} pages", block: "C", fix: false,
    problem: "Comparison pages are how engines answer 'X vs Y'. Buyers run these queries; engines need a source for them.",
    solution: "≥3 honest comparison pages with feature tables, fair statements of each tool's strengths, and Product schema.",
    scoringCriteria: "0 none. 3 ≥1 comparison. 5 ≥3 honest comparisons with feature tables + Product schema.",
    howWeTest: "Crawl for /vs/* or /compare/* URLs. Validate feature-table HTML. Score honesty by sentiment balance.",
    failureLooks: "No comparison pages, or comparisons that read as one-sided sales decks." },
  { id: "c13", num: 13, title: "/integrations/ pages",  block: "C", fix: false,
    problem: "Integration pages capture 'does X work with Y?' queries. Each integration is a citation surface engines can return.",
    solution: "≥5 integration pages, each with Product schema referencing the integrated tool and a one-paragraph use-case.",
    scoringCriteria: "0 none. 3 ≥2 integrations. 5 ≥5 with Product schema + use-case paragraph each.",
    howWeTest: "Crawl for /integrations/* URLs. Parse Product schema. Score word count + reference to integrated tool.",
    failureLooks: "No integrations directory, or list of logos with no per-integration pages." },
  { id: "c14", num: 14, title: "/blog or /changelog",   block: "C", fix: false,
    problem: "Engines weight freshness. A stale blog signals an abandoned product; an active changelog signals movement.",
    solution: "≥5 long-form posts in the last 90 days, each with Article schema. Or a changelog with weekly cadence.",
    scoringCriteria: "0 stale or none. 3 ≥3 posts in 90 days. 5 ≥5 posts in 90 days, each with Article schema.",
    howWeTest: "Crawl /blog and /changelog. Parse Article schema. Score post count in last 90 days.",
    failureLooks: "Blog directory present but last post >180 days old, or posts with no Article schema." },

  // Block D - Off-site / Distribution (4 signals, raw 20)
  { id: "d15", num: 15, title: "crunchbase entry",      block: "D", fix: false,
    problem: "Crunchbase is the source-of-truth for B2B company facts across multiple LLMs. No entry = engines can't ground basic facts.",
    solution: "Fully populated Crunchbase entry with current funding, team, product, news cards. Founder profile linked to org.",
    scoringCriteria: "0 none. 3 sparse profile. 5 fully populated + current within 90 days.",
    howWeTest: "Query Crunchbase API. Check funding, team, product, news populated within 90 days.",
    failureLooks: "No Crunchbase entry, or stub profile with no funding or team info." },
  { id: "d16", num: 16, title: "linkedin org page",     block: "D", fix: true,
    problem: "Engines pull company facts from LinkedIn. A bare or unverified org page leaves them filling in gaps with hallucinations.",
    solution: "Complete org page: industry, size, location, founded date, website. Recent posts in last 14 days. Verified badge if eligible.",
    scoringCriteria: "0 bare or missing. 3 complete fields but stale (>30 days). 5 complete + active in last 14 days.",
    howWeTest: "Scrape LinkedIn org page. Check field completeness + recent post timestamps.",
    failureLooks: "Skeleton page with logo only, or no posts in the last 60 days." },
  { id: "d17", num: 17, title: "producthunt presence",  block: "D", fix: false,
    problem: "ProductHunt entries seed Perplexity citations for early-stage B2B SaaS. Unclaimed listings convert worse and lack founder voice.",
    solution: "Claim the ProductHunt listing. Add founder bio and product description. Comment on competitor launches in your category.",
    scoringCriteria: "0 unlisted. 3 listed but unclaimed. 5 claimed with founder bio + active comment thread.",
    howWeTest: "Query ProductHunt API. Check claim status + founder field + recent activity.",
    failureLooks: "No ProductHunt listing, or a listing claimed by a generic team account with no founder bio." },
  { id: "d18", num: 18, title: "g2 / capterra / trustpilot", block: "D", fix: false,
    problem: "Review platforms are the dominant sentiment source for engines. No reviews = no sentiment signal = neutral-or-negative inferred.",
    solution: "Claim listings on G2 + Capterra (B2B) or Trustpilot (consumer-adjacent). Push reviews from existing customers via template.",
    scoringCriteria: "0 unlisted. 3 listed without claim. 5 claimed with ≥3 reviews on the primary platform.",
    howWeTest: "Query G2 + Capterra public listings. Check claim status + review count.",
    failureLooks: "No G2/Capterra listing, or unclaimed page with zero reviews." },
];

// Block clusters drive the canvas layout on /methodology + /rubric.
// Wider spread between cluster centers + more headroom in the bounding
// box gives each block its own quadrant of breathing room.
const clusterCenters: Record<Block, { x: number; y: number }> = {
  A: { x: 220, y: 200 },
  B: { x: 880, y: 200 },
  C: { x: 220, y: 540 },
  D: { x: 880, y: 540 },
};

// Edges encode the "this signal depends on / unlocks" relationships used in the rubric graph.
export const edges: { from: string; to: string }[] = [
  // within Block A
  { from: "a1", to: "a2" }, { from: "a1", to: "a3" }, { from: "a1", to: "a4" }, { from: "a1", to: "a5" },
  // within Block B
  { from: "b6", to: "b7" }, { from: "b6", to: "b8" }, { from: "b9", to: "b10" }, { from: "b7", to: "b8" },
  // within Block C
  { from: "c11", to: "c12" }, { from: "c11", to: "c13" }, { from: "c13", to: "c14" },
  // within Block D
  { from: "d15", to: "d16" }, { from: "d15", to: "d17" }, { from: "d16", to: "d18" },
  // cross-block
  { from: "a1", to: "b7" }, { from: "a1", to: "b8" },
  { from: "a2", to: "d15" }, { from: "a2", to: "d16" },
  { from: "b6", to: "c11" }, { from: "b6", to: "c12" },
  { from: "b9", to: "c14" },
  { from: "d16", to: "a3" },
];

function computeLayout(
  defList: SignalDef[],
  edgeList: { from: string; to: string }[]
): Map<string, { x: number; y: number }> {
  type N = {
    id: string;
    x: number; y: number;
    vx: number; vy: number;
    block: Block;
  };

  const nodes: N[] = defList.map((d, i) => {
    const c = clusterCenters[d.block];
    const a = (i * 137.508) * (Math.PI / 180);
    return {
      id: d.id,
      x: c.x + Math.cos(a) * 18,
      y: c.y + Math.sin(a) * 18,
      vx: 0, vy: 0,
      block: d.block,
    };
  });

  const byId = new Map(nodes.map(n => [n.id, n]));

  const idealEdgeLen = 140;
  const repulse = 4800;
  const attractK = 0.038;
  const centerK = 0.012;
  const minNodeDistance = 80;
  const damping = 0.62;
  const iters = 360;
  const minX = 70, maxX = 1030, minY = 70, maxY = 680;

  for (let it = 0; it < iters; it++) {
    const cooling = Math.max(0.18, 1 - it / iters);
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d2 = dx * dx + dy * dy + 0.01;
        const d = Math.sqrt(d2);
        const ux = dx / d, uy = dy / d;

        const f = repulse / d2;
        a.vx -= ux * f * 0.5;
        a.vy -= uy * f * 0.5;
        b.vx += ux * f * 0.5;
        b.vy += uy * f * 0.5;

        if (d < minNodeDistance) {
          const overlap = (minNodeDistance - d) * 0.5;
          a.x -= ux * overlap;
          a.y -= uy * overlap;
          b.x += ux * overlap;
          b.y += uy * overlap;
        }
      }
    }
    for (const e of edgeList) {
      const a = byId.get(e.from);
      const b = byId.get(e.to);
      if (!a || !b) continue;
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
      const force = (d - idealEdgeLen) * attractK;
      const fx = (dx / d) * force;
      const fy = (dy / d) * force;
      a.vx += fx; a.vy += fy;
      b.vx -= fx; b.vy -= fy;
    }
    for (const n of nodes) {
      const c = clusterCenters[n.block];
      n.vx += (c.x - n.x) * centerK;
      n.vy += (c.y - n.y) * centerK;
    }
    for (const n of nodes) {
      n.x += n.vx * cooling * 0.5;
      n.y += n.vy * cooling * 0.5;
      n.vx *= damping;
      n.vy *= damping;
      n.x = Math.max(minX, Math.min(maxX, n.x));
      n.y = Math.max(minY, Math.min(maxY, n.y));
    }
  }

  const layout = new Map<string, { x: number; y: number }>();
  for (const n of nodes) {
    layout.set(n.id, { x: Math.round(n.x), y: Math.round(n.y) });
  }
  return layout;
}

const _layout = computeLayout(defs, edges);

export const signals: Signal[] = defs.map((d) => ({
  ...d,
  x: _layout.get(d.id)!.x,
  y: _layout.get(d.id)!.y,
}));

export const clusterLabels: { block: Block; label: string; count: number; x: number; y: number }[] =
  blocks.map(({ key, label }) => {
    const members = signals.filter(s => s.block === key);
    const x = members.reduce((a, s) => a + s.x, 0) / members.length;
    const y = members.reduce((a, s) => a + s.y, 0) / members.length;
    return { block: key, label, count: members.length, x, y };
  });

// Back-compat: previous code referred to Category by `schema|render|robots|content|meta`.
// New scheme is Block A-D. Export Category as alias for any straggling imports.
export type Category = Block;
