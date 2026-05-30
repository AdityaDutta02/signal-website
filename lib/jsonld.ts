export const SIGNAL_FAQ: { q: string; a: string }[] = [
  {
    q: "what does Signal do?",
    a: "We rewire marketing sites for B2B SaaS so AI search engines (ChatGPT, Perplexity, Gemini, Claude) can find, parse, and cite them. 6-day build, $2,490 flat, day-7 final scan + handoff.",
  },
  {
    q: "who is Signal for?",
    a: "Bootstrapped, Seed, and Series A B2B SaaS founders. Companies that need their marketing site to keep up with the AI-search funnel.",
  },
  {
    q: "how is Signal different from an SEO agency?",
    a: "Classic SEO optimises for Google's link-based ranking. We optimise for how ChatGPT, Perplexity, Gemini, and Claude read, parse, and cite your site. Different signals, different funnel, different score.",
  },
  {
    q: "what is actually included in the $2,490?",
    a: "A full AEO audit on day 0, a 6-day rewire of your site across our 4-block 18-signal rubric (entity schema, on-page structure, content depth, off-site distribution), and a day-7 final scan that gates handoff at a +15 minimum lift.",
  },
  {
    q: "do you offer ongoing retainers?",
    a: "No. One project, one price, done. The engagement ends at handoff on day 7. No day-30 obligation, no rolling fee, no expansion conversation built in.",
  },
];

export const organizationGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://signalled.studio/#org",
      "name": "Signal",
      "alternateName": "signal*",
      "url": "https://signalled.studio",
      "logo": "https://signalled.studio/wordmark.svg",
      "description":
        "AEO-first website studio for bootstrapped to Series A B2B SaaS. 6-day build, $2,490 flat, day-7 final scan + handoff.",
      "founder": [
        { "@id": "https://signalled.studio/#aakif" },
        { "@id": "https://signalled.studio/#aditya" },
      ],
      "employee": [
        { "@id": "https://signalled.studio/#aakif" },
        { "@id": "https://signalled.studio/#aditya" },
      ],
      "sameAs": [
        "https://linkedin.com/company/signalled",
        "https://x.com/signalled",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://signalled.studio/#aakif",
      "name": "Aakif",
      "jobTitle": "Co-founder · SEO + content",
      "worksFor": { "@id": "https://signalled.studio/#org" },
    },
    {
      "@type": "Person",
      "@id": "https://signalled.studio/#aditya",
      "name": "Aditya",
      "jobTitle": "Co-founder · AI + tech",
      "worksFor": { "@id": "https://signalled.studio/#org" },
    },
    {
      "@type": "Service",
      "@id": "https://signalled.studio/#service",
      "name": "AEO website rewire",
      "provider": { "@id": "https://signalled.studio/#org" },
      "areaServed": "Global",
      "audience": {
        "@type": "BusinessAudience",
        "audienceType": "Bootstrapped to Series A B2B SaaS",
      },
      "offers": {
        "@type": "Offer",
        "price": "2490",
        "priceCurrency": "USD",
        "category": "Productised service",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://signalled.studio/#website",
      "name": "Signal",
      "url": "https://signalled.studio",
      "publisher": { "@id": "https://signalled.studio/#org" },
    },
  ],
};

export const faqPageGraph = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://signalled.studio/#faq",
  "mainEntity": SIGNAL_FAQ.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": a,
    },
  })),
};

export const rubricHowToGraph = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://signalled.studio/rubric#howto",
  "name": "How to self-audit a B2B SaaS site against the Signal 18-signal AEO rubric",
  "description":
    "Score your site 0-5 across 18 signals in 4 blocks, apply block multipliers, normalise to /100.",
  "totalTime": "PT30M",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Block A - Entity / Identity",
      "text": "Score 5 signals 0-5: Organization JSON-LD with @graph, sameAs density, Person schema for founder, Product/Service schema, Wikidata Q-code.",
    },
    {
      "@type": "HowToStep",
      "name": "Block B - On-page Structure",
      "text": "Score 5 signals 0-5: definitional first 200 words, FAQPage schema, HowTo/Article schema, llms.txt at root, AI bot allowlist in robots.txt.",
    },
    {
      "@type": "HowToStep",
      "name": "Block C - Content Depth",
      "text": "Score 4 signals 0-5: /use-cases/ pages, /vs/{competitor} pages, /integrations/ pages, /blog or /changelog cadence.",
    },
    {
      "@type": "HowToStep",
      "name": "Block D - Off-site / Distribution",
      "text": "Score 4 signals 0-5: Crunchbase entry, LinkedIn org page, ProductHunt presence, G2 / Capterra / Trustpilot listing.",
    },
    {
      "@type": "HowToStep",
      "name": "Normalise to /100",
      "text": "Multiply Block A by 1.5, Block D by 1.4. Sum all weighted scores. Divide by 115. Multiply by 100. Round to integer.",
    },
  ],
};

export function jsonLdScript(payload: unknown): string {
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}
