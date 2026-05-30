"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Shield } from "lucide-react";
import { SlotBadge } from "@/components/SlotBadge";
import { GuaranteeBlock } from "@/components/GuaranteeBlock";
import { StackCompatStrip } from "@/components/StackCompatStrip";
import { FitCheckCTA } from "@/components/FitCheckCTA";

const WHAT_YOU_GET = [
  "18-signal AEO audit on your URL",
  "per-engine scorecard (ChatGPT · Perplexity · Gemini · Claude)",
  "answer-first content rewrites on top 3 pages",
  "schema.org coverage - Article, FAQ, Org, BreadcrumbList",
  "robots.txt + llms.txt + AI sitemap shipped",
  "SSR / hydration / bot-allow fixes (if applicable)",
  "day 7 final scan verifies +15 before handoff",
  "all assets transferred - you own the code",
  "NDA on request · standard IP clause",
];

const WHAT_YOU_DONT = [
  "no retainer · no rolling fees",
  "no kickoff workshop or discovery deck",
  "no PM, AM, or agency tier",
  "no follow-on invoice for the final scan",
  "no lock-in after day 6",
];

const COMPARE_ROWS = [
  { label: "scope", signal: "18-signal audit + 6-day build, named deliverables", agency: "discovery → proposal → SOW → kickoff → sprint", diy: "you figure it out from blog posts" },
  { label: "price", signal: "$2,490 flat · one invoice", agency: "$8k–$25k/mo retainer, 3-month minimum", diy: "your time · $0 cash" },
  { label: "timeline", signal: "6 days to ship · day-7 final scan", agency: "6–12 weeks to first deliverable", diy: "ongoing, no deadline" },
  { label: "who does the work", signal: "aakif + aditya · same two every engagement", agency: "account manager → junior team you never meet", diy: "you" },
  { label: "guarantee", signal: "+15 ship floor · we keep building, free, until cleared", agency: "none · or vague 'best efforts' language", diy: "none" },
  { label: "post-engagement", signal: "assets yours · no retainer · NDA avail.", agency: "retainer renewal conversation", diy: "you maintain it" },
];

const FAQ_ITEMS = [
  { q: "do you do retainers?", a: "No. Signal is a fixed-scope, fixed-price engagement. $2,490 covers the audit, the 6-day build, the day 7 final scan, and the handoff. The engagement ends at handoff - no retainer, no rolling fee, no day-30 check-in obligation. If you want a second engagement months later, we scope it fresh." },
  { q: "what exactly is in scope?", a: "The 18-signal AEO audit on your primary URL, answer-first rewrites on your top 3 pages, schema.org coverage (Article, FAQ, Org, BreadcrumbList), robots.txt + llms.txt + AI sitemap, and SSR/hydration/bot-allow fixes where applicable. Everything is named in the engagement doc before you pay." },
  { q: "what's the refund window?", a: "14 days from payment, before the build starts. Once we've shipped the first PR, the engagement is underway and the refund window closes. The +15 guarantee covers you from that point forward." },
  { q: "what are the payment terms?", a: "100% upfront via Stripe. No payment plan, no net-30. The flat price is the flat price - no surprises on the invoice." },
  { q: "can i see the scoring rubric before i pay?", a: "Yes. The 18-signal rubric is published on /methodology. Every signal has a pass/fail criterion and a weight. The same rubric is used for your day-0 audit and your day-7 final scan." },
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
        <div className="px-5 pb-5 text-sm leading-snug text-fg-muted max-w-[680px]">{a}</div>
      )}
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <section className="border-b-2 border-line bg-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-8xl mx-auto px-6 md:px-10 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ pricing</div>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tighter">
                one price.<br />
                <span className="text-pink">six days.</span><br />
                no retainer.
              </h1>
              <p className="mt-8 text-base md:text-lg leading-snug max-w-[560px]">
                $2,490 flat. No kickoff workshop, no discovery deck, no PM layer. Aakif and Aditya run the audit, ship the fixes, and don&apos;t hand off until the day 7 final scan clears +15. That&apos;s the whole engagement.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:justify-self-end flex flex-col gap-4 items-start md:items-end">
              <SlotBadge variant="inline" />
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
                next available · q1 &apos;26
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ the engagement</div>
          <div className="border-2 border-line relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
            <div className="relative border-b-2 border-line px-6 md:px-10 py-8 md:py-12 flex flex-wrap items-end gap-4">
              <div className="font-display text-[100px] md:text-[160px] leading-[0.85] tracking-tighter">
                $2,490
              </div>
              <div className="pb-4 md:pb-6">
                <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted">
                  flat · per engagement · usd
                </div>
                <div className="mt-2 font-mono text-[10px] tracking-widest uppercase text-fg-muted">
                  one invoice · no retainer · no follow-on
                </div>
              </div>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2">
              <div className="border-b-2 md:border-b-0 md:border-r-2 border-line">
                <div className="px-6 md:px-8 py-4 border-b-2 border-line">
                  <div className="font-mono text-[11px] font-bold tracking-widest uppercase">+ what you get</div>
                </div>
                <ul className="divide-y-2 divide-line">
                  {WHAT_YOU_GET.map((item) => (
                    <li key={item} className="flex items-baseline gap-3 px-6 md:px-8 py-3 hover:bg-pink-wash/40 transition-colors">
                      <Check className="w-3.5 h-3.5 text-pink flex-shrink-0 translate-y-0.5" strokeWidth={2.5} />
                      <span className="text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="px-6 md:px-8 py-4 border-b-2 border-line">
                  <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted">× what you don&apos;t</div>
                </div>
                <ul className="divide-y-2 divide-line">
                  {WHAT_YOU_DONT.map((item) => (
                    <li key={item} className="flex items-baseline gap-3 px-6 md:px-8 py-3 hover:bg-pink-wash/40 transition-colors">
                      <span className="text-fg-muted font-mono text-[11px] font-bold leading-none flex-shrink-0">×</span>
                      <span className="text-sm leading-snug text-fg-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-10 md:py-14">
          <GuaranteeBlock variant="wide" />
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-10 md:py-14">
          <StackCompatStrip />
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-8">
          <FitCheckCTA variant="banner" />
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ how it stacks up</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tighter mb-10 md:mb-14">
            signal vs. <span className="text-pink">the alternatives</span>.
          </h2>

          <div className="border-2 border-line overflow-x-auto">
            <div className="grid grid-cols-4 border-b-2 border-line min-w-[640px]">
              <div className="px-4 py-3 border-r-2 border-line">
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">category</div>
              </div>
              <div className="px-4 py-3 border-r-2 border-line bg-pink-wash/40">
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase">signal</div>
              </div>
              <div className="px-4 py-3 border-r-2 border-line">
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">typical aeo agency</div>
              </div>
              <div className="px-4 py-3">
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">diy</div>
              </div>
            </div>

            {COMPARE_ROWS.map((row) => (
              <div key={row.label} className="grid grid-cols-4 border-b-2 border-line last:border-b-0 min-w-[640px]">
                <div className="px-4 py-4 border-r-2 border-line">
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">{row.label}</div>
                </div>
                <div className="px-4 py-4 border-r-2 border-line bg-pink-wash/40">
                  <div className="text-sm leading-snug font-medium">{row.signal}</div>
                </div>
                <div className="px-4 py-4 border-r-2 border-line">
                  <div className="text-sm leading-snug text-fg-muted">{row.agency}</div>
                </div>
                <div className="px-4 py-4">
                  <div className="text-sm leading-snug text-fg-muted">{row.diy}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-fg text-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 md:col-span-7">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60 mb-6">/ reserve your slot</div>
              <h2 className="font-display text-5xl md:text-7xl leading-[0.88] tracking-tighter">
                lock in a<br />
                <span className="text-pink">build slot</span>.
              </h2>
              <p className="mt-8 text-base leading-snug text-bg/80 max-w-[520px]">
                We take 4 engagements per quarter. Two slots remain for Q1 &apos;26. Reserve yours with a $500 deposit - applied to the $2,490 total. Remaining balance due on day 1.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/fit-check"
                  className="group inline-flex items-center gap-3 bg-pink text-bg px-6 py-4 hover:bg-bg hover:text-fg transition-colors font-mono text-[11px] font-bold tracking-widest uppercase border-2 border-pink hover:border-bg"
                >
                  reserve a slot
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                </Link>
                <Link
                  href="/fit-check"
                  className="inline-flex items-center gap-2 border-2 border-bg/30 px-5 py-4 hover:border-bg/80 transition-colors font-mono text-[11px] font-bold tracking-widest uppercase text-bg/70 hover:text-bg"
                >
                  book a fit check first →
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <Shield className="w-4 h-4 text-pink" strokeWidth={2} />
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-bg/60">
                  14-day refund window · +15 guarantee · assets yours
                </span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 md:justify-self-end flex flex-col items-start md:items-end gap-6">
              <SlotBadge variant="stamp" />
              <div className="border-2 border-bg/20 p-5 w-full md:max-w-[280px]">
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-bg/60 mb-4">/ engagement summary</div>
                <div className="space-y-3">
                  {[
                    { l: "audit", v: "day 0" },
                    { l: "build", v: "days 1–6" },
                    { l: "final scan", v: "day 7" },
                    { l: "price", v: "$2,490 flat" },
                    { l: "operators", v: "aakif + aditya" },
                  ].map((r) => (
                    <div key={r.l} className="flex items-baseline justify-between border-b border-bg/10 pb-2 last:border-b-0">
                      <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-bg/50">{r.l}</span>
                      <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-bg">{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ pricing faq</div>
          <h2 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tighter mb-10">
            common <span className="text-pink">questions</span>.
          </h2>
          <div className="border-2 border-line max-w-[860px]">
            {FAQ_ITEMS.map((item) => (
              <FaqRow key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 border-2 border-line px-5 py-3 hover:border-pink hover:text-pink transition-colors font-mono text-[11px] font-bold tracking-widest uppercase"
            >
              full faq →
            </Link>
            <Link
              href="/fit-check"
              className="inline-flex items-center gap-2 border-2 border-line px-5 py-3 hover:border-pink hover:text-pink transition-colors font-mono text-[11px] font-bold tracking-widest uppercase"
            >
              ask us directly →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
