import Link from "next/link";
import { ArrowRight, Check } from "@/components/icons";
import { SlotBadge } from "@/components/SlotBadge";

const WHAT_YOU_GET = [
  "18-signal AEO audit on your URL",
  "per-engine scorecard (ChatGPT · Perplexity · Gemini)",
  "answer-first content rewrites on top 3 pages",
  "schema.org coverage - Article, FAQ, Org, BreadcrumbList",
  "robots.txt + llms.txt + AI sitemap shipped",
  "SSR / hydration / bot-allow fixes (if applicable)",
  "day 7 final scan verifies +15 before handoff",
  "all assets transferred - you own the code",
  "NDA on request · standard IP clause",
];

export default function PricingPage() {
  return (
    <>
      <section className="border-b-2 border-line bg-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-8xl mx-auto px-6 md:px-10 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ pricing</div>
              <h1 className="font-display leading-[0.88] tracking-tighter" style={{ fontSize: "clamp(64px, 10vw, 152px)" }}>
                one price.<br />
                <span className="text-pink">six days.</span><br />
                no retainer.
              </h1>
              <p className="mt-8 text-lg md:text-xl leading-snug max-w-[520px]">
                $2,490 flat. Aakif and Aditya run it end-to-end. Handoff only after +15 clears.
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

            <div className="relative">
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
              <div className="mt-8">
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-bg/60">
                  14-day pre-build refund window · assets yours after handoff
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

    </>
  );
}
