"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "@/components/icons";
import { cases, getCase, avgDelta, type CaseStudy, type EngineScore } from "@/data/cases";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

const stripedPink =
  "repeating-linear-gradient(45deg, var(--pink) 0 8px, var(--bg) 8px 14px)";

function EngineBar({ row, index, inView }: { row: EngineScore; index: number; inView: boolean }) {
  const after = useCountUp(row.after, 900, inView);
  const delta = row.after - row.before;
  const beforePct = inView ? row.before : 0;
  const deltaPct = inView ? delta : 0;

  return (
    <div className="grid grid-cols-12 items-center gap-3 md:gap-4 px-5 md:px-6 py-5 md:py-6 border-b-2 border-line last:border-b-0">
      <div className="col-span-12 md:col-span-2 font-display text-3xl md:text-4xl tracking-tight">
        {row.engine}
      </div>

      <div className="col-span-6 md:col-span-1 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
        <div>day 0</div>
        <div className="font-display text-xl md:text-2xl text-fg leading-none mt-1 tracking-tighter">
          {row.before}
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 relative h-12 md:h-14 border-2 border-line bg-bg overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 flex pointer-events-none">
          {[0, 25, 50, 75].map((t) => (
            <div key={t} className="border-r border-line/15" style={{ width: "25%" }} />
          ))}
        </div>
        <div
          className="absolute inset-y-0 left-0 bg-pink"
          style={{
            width: `${beforePct}%`,
            transition: `width 900ms cubic-bezier(0.16,1,0.3,1) ${index * 150}ms`,
          }}
        />
        <div
          className="absolute inset-y-0 border-l-2 border-line"
          style={{
            left: `${beforePct}%`,
            width: `${deltaPct}%`,
            backgroundImage: stripedPink,
            transition: `width 1100ms cubic-bezier(0.16,1,0.3,1) ${index * 150 + 360}ms, left 900ms cubic-bezier(0.16,1,0.3,1) ${index * 150}ms`,
          }}
        />
        <div
          className="absolute inset-y-0 border-r-2 border-fg pointer-events-none"
          style={{
            left: 0,
            width: `${beforePct + deltaPct}%`,
            transition: `width 1100ms cubic-bezier(0.16,1,0.3,1) ${index * 150 + 360}ms`,
            opacity: 0.85,
          }}
        />
      </div>

      <div className="col-span-6 md:col-span-2 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
        <div>day 7</div>
        <div className="font-display text-2xl md:text-3xl text-fg leading-none mt-1 tracking-tighter">
          {after}
          <span className="text-fg-muted text-base">/100</span>
        </div>
      </div>

      <div className="col-span-6 md:col-span-1 font-display text-3xl md:text-4xl text-pink text-right leading-none tracking-tighter">
        +{delta}
      </div>
    </div>
  );
}

function DeltaSection({ c }: { c: CaseStudy }) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="border-2 border-line">
      <div className="flex flex-wrap items-center gap-6 font-mono text-[10px] font-bold tracking-widest uppercase px-5 md:px-6 py-4 border-b-2 border-line">
        <span className="flex items-center gap-2">
          <span className="w-5 h-4 bg-pink border-2 border-line" />
          day 0 · solid
        </span>
        <span className="flex items-center gap-2">
          <span
            className="w-5 h-4 border-2 border-line"
            style={{ backgroundImage: stripedPink }}
          />
          day 7 · delta
        </span>
      </div>
      {c.scores.map((s, i) => (
        <EngineBar key={s.engine} row={s} index={i} inView={inView} />
      ))}
    </div>
  );
}

function HeroDelta({ c }: { c: CaseStudy }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const delta = avgDelta(c);
  const count = useCountUp(delta, 1200, inView);

  return (
    <div ref={ref} className="col-span-12 md:col-span-4 flex flex-col items-start md:items-end justify-end">
      <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-2">
        avg delta
      </div>
      <div
        className="font-display text-pink leading-none tracking-tighter"
        style={{ fontSize: "clamp(96px, 16vw, 220px)" }}
      >
        +{count}
      </div>
    </div>
  );
}

export default function WorkDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug || "";
  const c = getCase(slug);

  if (!c) {
    return (
      <section className="border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ case not found</div>
          <div className="font-display text-5xl md:text-7xl tracking-tight leading-[0.9]">
            no case here<span className="text-pink">.</span>
          </div>
          <Link
            href="/work"
            className="mt-10 inline-flex items-center gap-3 font-mono text-[11px] font-bold tracking-widest uppercase border-2 border-line px-5 py-3 hover:bg-pink-wash transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            back to work
          </Link>
        </div>
      </section>
    );
  }

  const currentIndex = cases.findIndex((x) => x.slug === c.slug);
  const nextCase = cases[(currentIndex + 1) % cases.length];

  return (
    <>
      <section className="relative border-b-2 border-line overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-0 w-3 h-3 bg-pink" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-pink" />

        <div className="relative max-w-8xl mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-12 md:pb-16">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 font-mono text-[11px] font-bold tracking-widest uppercase anim-fade-in">
            <span className="w-2 h-2 bg-pink" />
            <Link href="/work" className="hover:text-pink transition-colors duration-150">work</Link>
            <span className="text-fg-muted">/</span>
            <span>{c.company.toLowerCase()}</span>
            <span className="text-fg-muted">/</span>
            <span>{c.industry.toLowerCase()}</span>
            <span className="text-fg-muted">/</span>
            <span>{c.stage.toLowerCase()}</span>
          </div>

          <div className="mt-10 md:mt-14 grid grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="col-span-12 md:col-span-8 anim-fade-in" style={{ animationDelay: "180ms" }}>
              <h1
                className="font-display leading-[0.82] tracking-tighter"
                style={{ fontSize: "clamp(72px, 14vw, 200px)" }}
              >
                {c.company}<span className="text-pink">.</span>
              </h1>
            </div>
            <HeroDelta c={c} />
          </div>

          <div className="mt-10 md:mt-12 anim-fade-in" style={{ animationDelay: "340ms" }}>
            <p className="text-xl md:text-2xl leading-snug max-w-[680px] font-display tracking-tight">
              {c.oneLiner}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ the diagnosis</div>
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-12 md:col-span-5">
              <h2 className="font-display text-4xl md:text-6xl leading-[0.92] tracking-tight">
                what was<br />broken<span className="text-pink">.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7">
              <p className="text-base md:text-lg leading-relaxed text-fg max-w-[620px]">
                {c.problem}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-pink-wash">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ what we shipped</div>
          <h2 className="font-display text-4xl md:text-5xl leading-[0.92] tracking-tight mb-10 md:mb-14">
            three signals<span className="text-pink">.</span><br />
            six days<span className="text-pink">.</span>
          </h2>

          <div className="border-2 border-line bg-bg">
            {c.shipped.map((item, i) => (
              <div
                key={i}
                className={`grid grid-cols-12 gap-4 md:gap-8 px-5 md:px-8 py-6 md:py-8 ${i < c.shipped.length - 1 ? "border-b-2 border-line" : ""}`}
              >
                <div className="col-span-12 md:col-span-1">
                  <div className="font-display text-3xl md:text-4xl text-pink tracking-tighter leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-3">
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-pink">
                    {item.signal}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <p className="text-base md:text-lg leading-snug text-fg">{item.what}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ the delta</div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <h2 className="font-display text-4xl md:text-5xl leading-[0.92] tracking-tight">
              day 0 vs day 7<span className="text-pink">.</span>
            </h2>
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
              {c.domain} · delivered {c.shippedAt}
            </div>
          </div>
          <DeltaSection c={c} />
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-widest uppercase text-fg-muted">
            <span>crawler: signal-crawler/0.4</span>
            <span className="text-fg-muted/40">·</span>
            <span>scoring: 18-signal rubric v1.2</span>
            <span className="text-fg-muted/40">·</span>
            <span>verified by client team</span>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-pink-wash">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="max-w-[900px]">
            <div
              className="font-display text-pink leading-none tracking-tighter select-none"
              style={{ fontSize: "clamp(80px, 12vw, 160px)" }}
            >
              &quot;
            </div>
            <blockquote
              className="font-display leading-[0.92] tracking-tight -mt-4 md:-mt-8"
              style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
            >
              {c.quote.text}
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-8 h-[2px] bg-pink" />
              <div>
                <div className="font-display text-xl md:text-2xl tracking-tight">{c.quote.name}</div>
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-1">{c.quote.role}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {c.outcome && (
        <section className="border-b-2 border-line bg-fg text-bg overflow-hidden">
          <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60 mb-6">/ outcome</div>
            <div
              className="font-display text-pink leading-none tracking-tighter"
              style={{ fontSize: "clamp(100px, 20vw, 280px)" }}
            >
              {c.outcome.value}
            </div>
            <div className="mt-4 font-display text-2xl md:text-4xl tracking-tight text-bg">
              {c.outcome.label}
            </div>
          </div>
        </section>
      )}

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted border-b-2 border-line pb-8 mb-8">
            <span>delivered {c.shippedAt}</span>
            <span className="text-fg-muted/40">·</span>
            <span>18 signals tested</span>
            <span className="text-fg-muted/40">·</span>
            <span>3 engines</span>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
            <div className="col-span-12 md:col-span-6">
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-3">next case</div>
              <Link
                href={`/work/${nextCase.slug}`}
                className="group flex items-center gap-4 hover:text-pink transition-colors duration-200"
              >
                <div className="font-display text-3xl md:text-5xl tracking-tight leading-none">
                  {nextCase.company}<span className="text-pink">.</span>
                </div>
                <ArrowRight className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-2" strokeWidth={2.5} />
              </Link>
            </div>
            <div className="col-span-12 md:col-span-6 flex md:justify-end">
              <Link
                href="/#hero-audit"
                className="group flex items-center justify-between gap-4 bg-pink text-bg px-6 py-5 hover:bg-fg transition-colors duration-200 border-2 border-pink hover:border-fg"
              >
                <span className="font-display text-2xl md:text-3xl tracking-tight">scan my site</span>
                <ArrowRight className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-2" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
