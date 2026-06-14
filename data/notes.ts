export type NoteTag = "essay" | "playbook" | "field note";

export type Note = {
  slug: string;
  title: string;
  num: string;
  date: string;
  readTime: string;
  tag: NoteTag;
  excerpt: string;
  body: { heading?: string; paragraphs: string[] }[];
  related?: string[];
};

export const notes: Note[] = [
  {
    slug: "robots-txt-sales-problem",
    title: "robots.txt is a sales problem now.",
    num: "06",
    date: "nov 12 '25",
    readTime: "6 min",
    tag: "essay",
    excerpt:
      "Sixty-two percent of the B2B SaaS we audit hard-block GPTBot by accident. The line that's costing them deals isn't in their marketing brief - it's in a config file the CTO forgot they shipped in 2022.",
    body: [
      {
        paragraphs: [
          "In the audit data we've collected over the last six months, 62% of B2B SaaS sites are blocking GPTBot in their robots.txt - and almost none of them did it on purpose.",
          "The blocks are inherited. CloudFront defaults, Vercel Firewall presets, a one-line copy-paste from a 2022 'protect your content from AI scrapers' blog post. They're config-file drift, not strategy.",
        ],
      },
      {
        heading: "the math has flipped",
        paragraphs: [
          "When ChatGPT crawled the web at low volume and answer engines were a novelty, blocking the crawler was a defensible position. Maybe even a smart one - your content stayed yours, your traffic stayed in your funnel.",
          "Today, with ChatGPT alone hitting 800M weekly active users and Perplexity surfacing answers above the fold for high-intent buyer queries, blocking the crawler means you're invisible at the moment your buyer is in 'I want the shortlist' mode.",
        ],
      },
      {
        heading: "the fix is one line",
        paragraphs: [
          "Open robots.txt. Confirm GPTBot, PerplexityBot, ClaudeBot are explicitly allowed. Confirm your CDN's bot-management rules aren't quietly stripping them at the edge. That's it. The fix is fifteen minutes.",
          "The diagnosis is harder - most teams don't know they're blocked until we run the scan. Which is why we built the scan.",
        ],
      },
    ],
    related: ["09", "10", "12"],
  },
  {
    slug: "schema-for-answer-engines",
    title: "schema for answer engines is not schema for google.",
    num: "05",
    date: "nov 4 '25",
    readTime: "8 min",
    tag: "playbook",
    excerpt:
      "Google's rich-results playbook taught the industry to think of schema as decoration. Answer engines treat schema as the primary disambiguator. The grammar is different.",
    body: [
      {
        paragraphs: [
          "For ten years, schema.org was a Google game. You sprinkled JSON-LD on your pages to get review stars in SERPs, FAQ accordions, recipe cards. The reward was visual - a slightly fancier search result.",
          "Answer engines use schema differently. They use it to decide what to cite.",
        ],
      },
      {
        heading: "schema as the cite-anchor",
        paragraphs: [
          "When ChatGPT or Perplexity scans a page, the JSON-LD block is one of the highest-signal artifacts on the page. It's structured. It's unambiguous. It says 'this is an Article by this Person at this Organization, published on this date, about this topic'.",
          "If that data is present and well-formed, the engine has a stable handle to cite. If it's absent, the engine has to infer - and inference is where competitors get cited instead.",
        ],
      },
      {
        heading: "the four that matter",
        paragraphs: [
          "Organization (with sameAs to LinkedIn, Crunchbase, GitHub). FAQPage (mined from your existing Q&A blocks). Article + TechArticle on long-form. BreadcrumbList for site hierarchy.",
          "That's it. Skip the speculative ones - Product schema for marketing pages, Event schema for case studies - they confuse the engine more than they help.",
        ],
      },
    ],
    related: ["01", "02", "03", "04"],
  },
  {
    slug: "hero-copy-doesnt-extract",
    title: "why your hero copy doesn't extract.",
    num: "04",
    date: "oct 28 '25",
    readTime: "5 min",
    tag: "field note",
    excerpt:
      "Most B2B hero sections are written for humans landing from an ad. Answer engines need a different sentence in the first 40 words - one that defines, not seduces.",
    body: [
      {
        paragraphs: [
          "Look at your hero copy. The first sentence - the one above the CTA - is probably a benefit statement. 'Ship faster.' 'Win more deals.' 'The platform for X.'",
          "It's beautifully written. It's also useless to an answer engine.",
        ],
      },
      {
        heading: "what engines extract",
        paragraphs: [
          "When ChatGPT processes a page to cite it, it's looking for a sentence that maps 'concept → product → who-it's-for' in a single readable clause. 'Vellum is a development platform for teams shipping LLM-powered features in production.' That works.",
          "'The fastest way to ship AI' doesn't. The engine has no concept anchor. No product anchor. No audience anchor. It's marketing-poetry, indexed as filler.",
        ],
      },
      {
        heading: "the 40-word test",
        paragraphs: [
          "Read your first 40 words out loud. Can a person who has never heard of your product summarise what it does, who it's for, and why it matters?",
          "If not, your hero isn't extractable. Rewrite it. The marketing-poetry can move to line two.",
        ],
      },
    ],
    related: ["07", "13", "14"],
  },
  {
    slug: "the-day-7-rescan",
    title: "the day-7 re-scan.",
    num: "03",
    date: "oct 18 '25",
    readTime: "5 min",
    tag: "field note",
    excerpt:
      "Why we re-run the same 18-signal scan on day 7. Same rubric, same URL, before and after — measured, not estimated.",
    body: [
      {
        paragraphs: [
          "Every Signal engagement is six days of build. On day 7 we run the same 18-signal scan we ran on day 0. Same engines, same prompts, same rubric, same crawler version. The only thing that changed is the site.",
          "You get the before/after numbers per engine. Whatever moved, moved. Whatever didn't, we tell you why and what couldn't be fixed inside the six days.",
        ],
      },
      {
        heading: "why a re-scan instead of a 30-day re-score",
        paragraphs: [
          "Agencies that promise to 're-score in 30 days' are betting on indexing latency. We don't. The rubric measures what's in the file, not what's in the index — the fixes either move the rubric on the day of the scan or they don't.",
          "Day 7 is the engagement boundary. No retainer, no check-in calendar, no day-30 obligation. The re-scan happens once, against the same yardstick.",
        ],
      },
    ],
    related: ["05", "09", "13"],
  },
  {
    slug: "what-we-shipped-on-vellum",
    title: "what we shipped on vellum.",
    num: "02",
    date: "oct 10 '25",
    readTime: "9 min",
    tag: "playbook",
    excerpt:
      "A detailed walk-through of the three signals we fixed on Vellum's marketing site, the diffs we shipped, and the +33 average score delta on delivery.",
    body: [
      {
        paragraphs: [
          "Vellum's day-0 scan came back with 32/100 on ChatGPT. The diagnosis was unambiguous - their entire docs experience was a single-page app, hydrating client-side.",
          "First-byte HTML was a 4KB shell. Everything that mattered - product copy, code samples, definitions - loaded after JS executed. Crawlers don't wait for that.",
        ],
      },
      {
        heading: "fix one - ssr the docs",
        paragraphs: [
          "We moved /docs and /product to Next.js SSR. Hydration stayed intact for the interactive bits (the playground, the live code samples), but the text content was now in the document on first byte.",
          "First-byte HTML went from 4KB to 38KB. Crawler-visible content went up roughly 9x.",
        ],
      },
      {
        heading: "fix two - unblock the crawler",
        paragraphs: [
          "Their CloudFront WAF rule was blocking 'bot-like' user agents - including GPTBot, PerplexityBot, and ClaudeBot. The rule was inherited from a security template they'd applied in 2023.",
          "We rewrote the rule to allow known answer-engine crawlers explicitly, while keeping the protection against scrapers and abusive bots.",
        ],
      },
      {
        heading: "fix three - answer-first hero",
        paragraphs: [
          "Their hero said 'Build, deploy, and manage LLM-powered features.' Beautiful. Useless to an engine.",
          "We rewrote it: 'Vellum is a development platform for teams shipping LLM-powered features to production - with prompt management, evaluation, observability, and retrieval in one workflow.' Twenty-eight words. Engine-extractable. Schema added to anchor 'Vellum' to the Organization.",
        ],
      },
    ],
    related: ["05", "09", "13"],
  },
  {
    slug: "aeo-seo-llmo-stop-conflating",
    title: "aeo vs seo vs llmo - stop conflating them.",
    num: "01",
    date: "sep 30 '25",
    readTime: "6 min",
    tag: "essay",
    excerpt:
      "Three acronyms, three different optimisation targets, three different teams holding the pen. The confusion is why most agency pitches don't make sense.",
    body: [
      {
        paragraphs: [
          "SEO optimises for Google's algorithm - links, keywords, page experience, search intent matching.",
          "AEO (Answer Engine Optimisation) optimises for how ChatGPT, Perplexity, Gemini, and Claude cite your site in their answers.",
          "LLMO (Large Language Model Optimisation) is broader - it's about how foundation models represent your brand in their training data, which you mostly can't influence directly.",
        ],
      },
      {
        heading: "why the conflation hurts",
        paragraphs: [
          "When an agency sells you 'AI SEO' and means 'we'll use ChatGPT to write your blog posts faster,' you're getting marketing automation, not optimisation. Different problem, different solution.",
          "Real AEO work is technical - robots.txt, render path, schema, content structure. It looks more like a frontend audit than a content strategy. That's why we ship in PRs, not slide decks.",
        ],
      },
    ],
    related: ["09", "13", "01"],
  },
];

export function getNote(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}
