"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { cases, avgDelta, type CaseStudy } from "@/data/cases";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { CAL_URL, BOOK_LABEL } from "@/lib/links";

function HeroStats() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const delta = useCountUp(33, 900, inView);

  return (
    <div ref={ref} className="col-span-12 md:col-span-5 grid grid-cols-3 border-2 border-line">
      <div className="p-4 md:p-5 border-r-2 border-line">
        <div className="font-display text-3xl md:text-5xl leading-none tracking-tighter">03</div>
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">pilots</div>
      </div>
      <div className="p-4 md:p-5 border-r-2 border-line">
        <div className="font-display text-3xl md:text-5xl leading-none tracking-tighter text-pink">+{delta}</div>
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">avg delta</div>
      </div>
      <div className="p-4 md:p-5">
        <div className="font-display text-3xl md:text-5xl leading-none tracking-tighter">18</div>
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">signals</div>
      </div>
    </div>
  );
}

function CaseCard({ c, index }: { c: CaseStudy; index: number }) {
  const [ref, inView] = useInView<HTMLAnchorElement>();
  const delta = avgDelta(c);
  const deltaCount = useCountUp(delta, 1000, inView);

  return (
    <Link
      ref={ref}
      href={`/work/${c.slug}`}
      className="group block border-b-2 border-line hover:bg-pink-wash transition-colors duration-200"
    >
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="col-span-2 md:col-span-1">
            <div
              className="font-display text-pink leading-none tracking-tighter"
              style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          <div className="col-span-10 md:col-span-7">
            <div
              className="font-display leading-[0.82] tracking-tighter text-fg"
              style={{ fontSize: "clamp(52px, 8vw, 130px)" }}
            >
              {c.company}
              <span className="text-pink">.</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 md:gap-3 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
              <span>{c.domain}</span>
              <span className="text-fg-muted/40">/</span>
              <span>{c.industry}</span>
              <span className="text-fg-muted/40">/</span>
              <span>{c.stage}</span>
            </div>
            <p className="mt-4 text-base md:text-lg leading-snug max-w-[520px] text-fg-muted">
              {c.oneLiner}
            </p>

            <div className="mt-8 border-2 border-line max-w-[480px]">
              {c.scores.map((s, i) => (
                <div
                  key={s.engine}
                  className={`flex items-center gap-4 px-4 py-3 ${i < c.scores.length - 1 ? "border-b-2 border-line" : ""}`}
                >
                  <div className="font-display text-lg md:text-xl tracking-tight w-28 flex-shrink-0">
                    {s.engine}
                  </div>
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted flex-1">
                    {s.before} <span className="text-fg-muted/40">→</span> {s.after}
                  </div>
                  <div className="font-display text-xl md:text-2xl text-pink tracking-tighter">
                    +{s.after - s.before}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col items-start md:items-end justify-start pt-2">
            <div
              className="font-display text-pink leading-none tracking-tighter transition-transform duration-300 group-hover:scale-105"
              style={{ fontSize: "clamp(72px, 11vw, 150px)" }}
            >
              +{deltaCount}
            </div>
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-2">
              avg delta
            </div>
            <div className="mt-6 flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest uppercase text-fg group-hover:text-pink transition-colors duration-200">
              read case <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function WorkPage() {
  return (
    <>
      <section className="relative border-b-2 border-line overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-0 w-3 h-3 bg-pink" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-pink" />

        <div className="relative max-w-8xl mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-12 md:pb-16">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 font-mono text-[11px] font-bold tracking-widest uppercase anim-fade-in">
            <span className="w-2 h-2 bg-pink" />
            <span>work</span>
            <span className="text-fg-muted">/</span>
            <span>03 pilots shipped</span>
            <span className="text-fg-muted">/</span>
            <span>nov &apos;25</span>
          </div>

          <h1
            className="mt-10 md:mt-14 font-display leading-[0.86] tracking-tighter anim-fade-in"
            style={{ fontSize: "clamp(72px, 12vw, 168px)", animationDelay: "180ms" }}
          >
            Case Studies<span className="text-pink">.</span>
          </h1>

          <h2
            className="mt-5 md:mt-7 font-display leading-[0.96] tracking-tighter anim-fade-in max-w-[920px]"
            style={{ fontSize: "clamp(26px, 3.4vw, 48px)", animationDelay: "260ms" }}
          >
            Three B2B SaaS sites cited more by ChatGPT, Perplexity, and Gemini.
          </h2>

          <div className="mt-10 grid grid-cols-12 gap-6 md:gap-10 anim-fade-in items-end" style={{ animationDelay: "340ms" }}>
            <div className="col-span-12 md:col-span-7">
              <p className="text-base md:text-lg leading-snug max-w-[560px]">
                Same rubric, three different stacks. Numbers below are before and after, scored on the published 18-signal rubric.
              </p>
            </div>
            <HeroStats />
          </div>
        </div>
      </section>

      <section className="bg-bg border-b-2 border-line">
        {cases.map((c, i) => (
          <CaseCard key={c.slug} c={c} index={i} />
        ))}
      </section>

      <section className="bg-fg text-bg border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="col-span-12 md:col-span-7">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60">/ bring your url</div>
              <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[0.95] tracking-tighter">
                Bring Your URL.<br />
                We Will Tell You<br />
                The <span className="text-pink">Move</span>.
              </h2>
              <p className="mt-6 max-w-[460px] text-bg/80 leading-snug">
                Fifteen minutes, your site live, the scan run on the call.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener"
                className="group flex items-center justify-between gap-4 bg-pink text-bg px-6 py-6 hover:bg-bg hover:text-fg transition-colors duration-200 border-2 border-pink hover:border-bg"
              >
                <span className="font-display text-3xl md:text-4xl tracking-tighter">{BOOK_LABEL}</span>
                <ArrowRight className="w-8 h-8 transition-transform duration-200 group-hover:translate-x-2" strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
