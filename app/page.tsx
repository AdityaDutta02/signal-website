import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AuditForm } from "@/components/AuditForm";
import { SlotBadge } from "@/components/SlotBadge";
import {
  faqPageGraph,
  organizationGraph,
  rubricHowToGraph,
  jsonLdScript,
} from "@/lib/jsonld";

const pilots = [
  { engine: "chatgpt", before: 32, after: 71, delta: 39 },
  { engine: "perplexity", before: 28, after: 64, delta: 36 },
  { engine: "gemini", before: 41, after: 70, delta: 29 },
];

const avgDelta = Math.round(pilots.reduce((a, p) => a + p.delta, 0) / pilots.length);

const deliverables = [
  { num: "01", title: "audit", sub: "18 signals · your site + 3 competitors" },
  { num: "02", title: "PR to your repo", sub: "schema · render · robots · llms.txt" },
  { num: "03", title: "final scan", sub: "chatgpt · perplexity · gemini · day 7" },
  { num: "04", title: "before / after report", sub: "score delta · plain language" },
];

export const metadata = {
  title: "signal* - AEO websites for B2B SaaS in 6 days. $2,490 flat.",
  description:
    "Signal is a productised AEO build for seed-series A B2B SaaS. We score your site across 18 signals, ship the fix in 6 working days, and verify +15 before handoff.",
};

export default function HomePage() {
  return (
    <>
      {/* All JSON-LD on home: Organization @graph + FAQPage + HowTo.
         Engines read all three even though only the offer + price are visible. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationGraph) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageGraph) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(rubricHowToGraph) }}
      />

      {/* ────────── HERO ────────── */}
      <section className="relative border-b-2 border-line overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-0 w-3 h-3 bg-pink pointer-events-none" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-pink pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-14 md:pt-24 pb-14 md:pb-20">
          <div className="flex items-center gap-3 font-mono text-[11px] font-bold tracking-widest uppercase anim-fade-in">
            <span className="w-2 h-2 bg-pink" />
            <span>aeo build · 6 days · $2,490</span>
            <span className="text-fg-muted hidden md:inline">/</span>
            <SlotBadge variant="inline" className="hidden md:inline-flex" />
          </div>

          <h1
            className="mt-10 md:mt-14 font-display leading-[0.88] tracking-tight anim-fade-in max-w-[1200px]"
            style={{ fontSize: "clamp(56px, 9.5vw, 144px)", animationDelay: "180ms" }}
          >
            chatgpt can&apos;t<br />
            find your site<span className="text-pink">.</span><br />
            we ship the fix<br />
            in six days<span className="text-pink">.</span>
          </h1>

          <p
            className="mt-10 md:mt-12 max-w-[640px] text-base md:text-lg leading-snug anim-fade-in"
            style={{ animationDelay: "320ms" }}
          >
            Signal is an AEO build service for seed-series A B2B SaaS. We score your site across 18 signals, ship the fix to your repo in six working days, and verify the score moved +15 before we call it shipped.
          </p>

          <div
            className="mt-10 md:mt-12 anim-fade-in"
            style={{ animationDelay: "440ms" }}
          >
            <AuditForm variant="hero" autoFocusId="hero-audit" />
            <div className="mt-3 font-mono text-[10px] tracking-widest uppercase text-fg-muted">
              90s scan · 18 signals · no account · pdf to your inbox
            </div>
          </div>

          <div
            className="mt-12 md:mt-16 grid grid-cols-3 max-w-[560px] border-2 border-line anim-fade-in"
            style={{ animationDelay: "560ms" }}
          >
            <div className="p-4 md:p-5 border-r-2 border-line">
              <div className="font-display text-3xl md:text-4xl leading-none tracking-tighter">
                <span className="text-pink">$</span>2,490
              </div>
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">flat fee</div>
            </div>
            <div className="p-4 md:p-5 border-r-2 border-line">
              <div className="font-display text-3xl md:text-4xl leading-none tracking-tighter">
                <span className="text-pink">+</span>15
              </div>
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">ship floor</div>
            </div>
            <div className="p-4 md:p-5">
              <div className="font-display text-3xl md:text-4xl leading-none tracking-tighter">06</div>
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">working days</div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── PROOF ────────── */}
      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-8 md:mb-12">
            / 01 · proof
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-12 items-end">
            <div className="col-span-12 md:col-span-5">
              <div
                className="font-display text-pink leading-[0.78] tracking-tighter select-none"
                style={{ fontSize: "clamp(140px, 22vw, 280px)" }}
              >
                +{avgDelta}
              </div>
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mt-2">
                avg score delta · first 3 pilots · day 0 → day 7
              </div>
            </div>

            <div className="col-span-12 md:col-span-7">
              <div className="border-2 border-line">
                {pilots.map((p, i) => {
                  const max = 100;
                  const beforePct = (p.before / max) * 100;
                  const afterPct = (p.after / max) * 100;
                  return (
                    <div
                      key={p.engine}
                      className={`grid grid-cols-12 items-center gap-3 md:gap-4 px-4 md:px-6 py-4 ${i < pilots.length - 1 ? "border-b-2 border-line" : ""}`}
                    >
                      <div className="col-span-3 md:col-span-2 font-mono text-[11px] md:text-xs font-bold tracking-widest uppercase">
                        {p.engine}
                      </div>
                      <div className="col-span-6 md:col-span-7 relative h-3">
                        <div className="absolute inset-y-0 left-0 bg-fg/10" style={{ width: `${beforePct}%` }} />
                        <div className="absolute inset-y-0 left-0 bg-pink" style={{ width: `${afterPct}%` }} />
                      </div>
                      <div className="col-span-3 md:col-span-3 text-right font-display text-xl md:text-2xl tracking-tighter">
                        <span className="text-pink">+</span>{p.delta}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-fg-muted">
                <span>same prompts. same engines. no re-prompting.</span>
                <Link href="/methodology" className="inline-flex items-center gap-1 hover:text-pink transition-colors">
                  read methodology <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── OFFER ────────── */}
      <section className="border-b-2 border-line bg-fg text-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60 mb-8 md:mb-12">
            / 02 · what you get
          </div>

          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tight max-w-[900px]">
            one flat fee<span className="text-pink">.</span> one delivery window<span className="text-pink">.</span> one number to clear<span className="text-pink">.</span>
          </h2>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-4 border-2 border-bg/30">
            {deliverables.map((d, i) => (
              <div
                key={d.num}
                className={`p-5 md:p-7 ${i < deliverables.length - 1 ? "border-b-2 md:border-b-0 md:border-r-2 border-bg/30" : ""}`}
              >
                <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-pink">{d.num}</div>
                <div className="mt-4 font-display text-2xl md:text-3xl tracking-tight leading-none">{d.title}</div>
                <div className="mt-3 font-mono text-[10px] tracking-widest uppercase text-bg/55">{d.sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 md:mt-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60">if we miss</div>
              <div className="mt-2 font-display text-2xl md:text-3xl tracking-tight max-w-[520px] leading-tight">
                we keep building until the day-7 scan clears +15<span className="text-pink">.</span> no clock, no upsell.
              </div>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest uppercase border-b-2 border-bg/40 hover:border-pink hover:text-pink transition-colors"
            >
              full pricing breakdown <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────── SCAN ────────── */}
      <section className="border-b-2 border-line bg-pink-wash">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-8 md:mb-10">
            / 03 · scan
          </div>

          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tight max-w-[800px]">
            drop your URL<span className="text-pink">.</span><br />
            ninety seconds<span className="text-pink">.</span> no account<span className="text-pink">.</span>
          </h2>

          <p className="mt-6 max-w-[560px] text-base md:text-lg leading-snug">
            We run an 18-signal scan against your live site and email you the report. If you want the fix, you reply. If not, you keep the report.
          </p>

          <div className="mt-10">
            <AuditForm variant="scan" autoFocusId="scan-audit" />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 font-mono text-[10px] tracking-widest uppercase text-fg-muted">
            <span>see the rubric →</span>
            <Link href="/rubric" className="inline-flex items-center gap-1 hover:text-pink transition-colors border-b-2 border-line">
              18 signals
            </Link>
            <span>·</span>
            <Link href="/work" className="inline-flex items-center gap-1 hover:text-pink transition-colors border-b-2 border-line">
              pilots
            </Link>
            <span>·</span>
            <Link href="/faq" className="inline-flex items-center gap-1 hover:text-pink transition-colors border-b-2 border-line">
              founder q&amp;a
            </Link>
            <span>·</span>
            <Link href="/report" className="inline-flex items-center gap-1 hover:text-pink transition-colors border-b-2 border-line">
              24-page field guide
              <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
