"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type FaqItem = { q: string; a: string };
type FaqCategory = { slug: string; label: string; eyebrow: string; items: FaqItem[] };

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    slug: "the-audit",
    label: "the audit",
    eyebrow: "/ the audit",
    items: [
      { q: "is the audit really free?", a: "Yes. Paste your URL on the home page. You'll have a per-prospect scorecard in 90 seconds - scored on the same 18-signal rubric we use for paid engagements. No email required to see the score. We ask for an email to send the PDF." },
      { q: "how is the score calculated?", a: "18 signals across 5 clusters: crawl access, render quality, schema coverage, content density, and title clarity. Each signal has a pass/fail criterion and a weight. The overall score is a weighted sum. The rubric is published on /methodology - you can reconstruct any score from the published weights." },
      { q: "which engines are covered?", a: "ChatGPT (GPT-4o), Perplexity, Google Gemini, and Anthropic Claude. We run the same prompt list against all four and score citation probability per engine. Copilot and You.com are on the roadmap for rubric v1.3." },
      { q: "how accurate is the score?", a: "The rubric is a proxy for citation probability, not a guarantee. It's based on 412 audits and validated against observed citation deltas from our engagements. The +33 average delta is real - but your mileage depends on your stack, your content, and your competitive set." },
      { q: "how often can i scan the same URL?", a: "As often as you want. We cache results for 24 hours - if you scan the same URL twice in a day, you'll get the same scorecard. After 24 hours, we re-run the scan fresh." },
    ],
  },
  {
    slug: "the-engagement",
    label: "the engagement",
    eyebrow: "/ the engagement",
    items: [
      { q: "what's in scope for the 6-day build?", a: "18-signal AEO audit, answer-first rewrites on your top 3 pages, schema.org coverage (Article, FAQ, Org, BreadcrumbList), robots.txt + llms.txt + AI sitemap, and SSR/hydration/bot-allow fixes where applicable. Everything is named in the engagement doc before you pay." },
      { q: "what's not in scope?", a: "Link building, paid media, general SEO consulting, content strategy beyond the 3 rewritten pages, CMS migrations, new feature development, or anything outside the 18-signal rubric. If you're unsure, book a fit check - we'll tell you before you pay." },
      { q: "how long does it actually take?", a: "6 days from day 1 to final PR. Day 1 is the audit. Days 2–5 are the build. Day 6 is QA. Day 7 is the final scan + handoff. If the score hasn't cleared +15 by then, we keep building - extra days are on us, not you. The revision window runs for 7 days after handoff." },
      { q: "who does the work?", a: "Aakif and Aditya. Same two operators on every engagement. No PM layer, no junior team, no account manager. Aakif owns the audit and content half. Aditya owns the build and tech half." },
      { q: "is it async or do we need to be on calls?", a: "Fully async. We post daily updates to a shared Slack channel or Google Doc. You don't need to be available - just check in when it suits you. The only call is the optional fit check before you commit." },
      { q: "what's the revision policy?", a: "One revision window: 7 days after day 6, scoped to the fixes shipped in the engagement. We don't do open-ended revision rounds. If you want changes outside the original scope, we scope a new engagement." },
    ],
  },
  {
    slug: "the-team",
    label: "the team",
    eyebrow: "/ the team",
    items: [
      { q: "who's behind signal?", a: "Aakif (SEO + content, 11 years) and Aditya (AI + tech, 9 years). Aakif was head of SEO at a Series B B2B SaaS. Aditya was staff engineer on ML platform at a Series A. We started Signal because we kept seeing the same AEO gaps in the same stacks." },
      { q: "is it really just two people?", a: "Yes. We don't have a team. We don't have a PM or account manager. We take 4 engagements per quarter - that's the constraint that keeps the quality consistent. If we can't both fit your engagement, we don't take it." },
      { q: "why no agency tier?", a: "Because agency tiers exist to scale revenue, not quality. The moment you add a PM layer, the operator who sold you the engagement stops doing the work. We'd rather take fewer clients and do the work ourselves." },
      { q: "have you worked with companies like mine?", a: "We've shipped on B2B SaaS, developer tools, fintech, and edtech. Vellum (+38 score), Stack Foundry (+44 score), Numerade (schema audit + SSR fix). See /work for the full list." },
    ],
  },
  {
    slug: "pricing-risk",
    label: "pricing & risk",
    eyebrow: "/ pricing & risk",
    items: [
      { q: "why $2,490?", a: "It's the price that covers 6 days of two senior operators' time without a retainer markup. We're not a $500 freelancer and we're not a $25k/mo agency. $2,490 is the flat price for the named scope. No surprises." },
      { q: "what's the refund policy?", a: "14-day refund window from payment, before the build starts. Once we've shipped the first PR, the engagement is underway and the refund window closes. The +15 guarantee covers you from that point forward." },
      { q: "how does the +15 guarantee work?", a: "On day 7 we run the same 18-signal scan on the same URL. If the score hasn't moved +15 from day 0, we don't call it shipped - we keep building on our dime until it clears. Same rubric, same weights, same URL. No re-scoping, no follow-on invoice." },
      { q: "what happens after handoff?", a: "You own all the assets. We don't retain access. The engagement ends at handoff - no retainer, no day-30 check-in obligation. If you want a fresh scan months later we'll run one for free, no commitment." },
      { q: "what are the payment terms?", a: "100% upfront via Stripe. No payment plan, no net-30. We reserve your slot with a $500 deposit - applied to the $2,490 total. Remaining balance due on day 1." },
    ],
  },
  {
    slug: "stack-integrations",
    label: "stack & integrations",
    eyebrow: "/ stack & integrations",
    items: [
      { q: "which stacks do you support?", a: "Next.js, Astro, Remix, and SvelteKit get full repo + PR shipped. Webflow and Framer get custom code blocks + CMS patches. WordPress gets theme files + schema plugin. Vanilla / custom stacks get a patch file + handoff doc. See /pricing for the full compatibility strip." },
      { q: "what about headless CMS?", a: "Contentful, Sanity, Prismic, and Storyblok are all in scope. We patch the schema generators and content models directly. If you're on a headless CMS not listed, book a fit check - we'll tell you before you pay." },
      { q: "can you work with custom code?", a: "Yes. If you have a custom stack, we ship a patch file and a handoff doc that explains every change. You or your engineer applies the patches. We QA the result on day 6." },
      { q: "do you need repo access?", a: "For full-ship stacks (Next.js, Astro, Remix, SvelteKit): yes, read + write or PR review. For partial-ship stacks (Webflow, Framer): CMS editor access minimum. For patch + handoff: no repo access needed." },
      { q: "what if my stack isn't listed?", a: "Book a fit check. We'll tell you within 24 hours whether your stack is in scope. If it's not, we'll tell you what would need to change for it to be." },
    ],
  },
];

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-2 border-line last:border-b-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-baseline justify-between gap-4 px-5 py-4 text-left hover:bg-pink-wash/40 transition-colors"
      >
        <span className="font-display text-lg md:text-xl leading-tight tracking-tighter">{q}</span>
        <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted flex-shrink-0">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm leading-snug text-fg-muted max-w-[720px]">{a}</div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <>
      <section className="border-b-2 border-line bg-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-8xl mx-auto px-6 md:px-10 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ faq</div>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tighter">
                answers ·<br />
                <span className="text-pink">in order</span><br />
                of asking.
              </h1>
              <p className="mt-8 text-base md:text-lg leading-snug max-w-[560px]">
                The questions we get most often, answered directly. If yours isn&apos;t here, book a fit check - we&apos;ll answer it in 15 minutes.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:justify-self-end">
              <div className="border-2 border-line p-4 bg-bg">
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-3">/ categories</div>
                <div className="space-y-1.5">
                  {FAQ_CATEGORIES.map((cat) => (
                    <a
                      key={cat.slug}
                      href={`#${cat.slug}`}
                      className="block font-mono text-[10px] font-bold tracking-widest uppercase hover:text-pink transition-colors py-1 border-b border-line/40 last:border-b-0"
                    >
                      → {cat.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {FAQ_CATEGORIES.map((cat, i) => (
        <section
          key={cat.slug}
          id={cat.slug}
          className={`border-b-2 border-line ${i % 2 === 1 ? "bg-pink-wash/20" : "bg-bg"}`}
        >
          <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-20">
            <div className="grid grid-cols-12 gap-8 md:gap-14">
              <div className="col-span-12 md:col-span-3">
                <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-3">{cat.eyebrow}</div>
                <h2 className="font-display text-3xl md:text-4xl leading-[0.95] tracking-tighter">
                  {cat.label}.
                </h2>
                <div className="mt-4 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
                  {cat.items.length} questions
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <div className="border-2 border-line">
                  {cat.items.map((item) => (
                    <FaqRow key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-fg text-bg border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-7">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60 mb-6">/ still unsure?</div>
              <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tighter">
                book a<br />
                <span className="text-pink">fit check</span>.
              </h2>
              <p className="mt-6 text-base leading-snug text-bg/80 max-w-[480px]">
                15 minutes. Not a sales call. We&apos;ll answer your specific question and tell you whether your stack and problem are in scope.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/fit-check"
                  className="group inline-flex items-center gap-3 bg-pink text-bg px-6 py-4 hover:bg-bg hover:text-fg transition-colors font-mono text-[11px] font-bold tracking-widest uppercase border-2 border-pink hover:border-bg"
                >
                  book a fit check
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 border-2 border-bg/30 px-5 py-4 hover:border-bg/80 transition-colors font-mono text-[11px] font-bold tracking-widest uppercase text-bg/70 hover:text-bg"
                >
                  scan my site →
                </Link>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 flex flex-col items-start md:items-end gap-3">
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-bg/60">/ or browse</div>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "pricing", to: "/pricing" },
                  { label: "process", to: "/process" },
                  { label: "methodology", to: "/methodology" },
                  { label: "about", to: "/about" },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.to}
                    className="inline-flex items-center gap-1.5 border-2 border-bg/30 px-3 py-2 hover:border-bg/80 transition-colors font-mono text-[10px] font-bold tracking-widest uppercase text-bg/70 hover:text-bg"
                  >
                    {l.label} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
