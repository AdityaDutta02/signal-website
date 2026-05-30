"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Download, Check, X as XIcon } from "lucide-react";
import { auditData, type AuditEngine, type SignalResult, type TopFix, type DayPlan } from "@/data/audit";
import { signals } from "@/data/signals";
import { useCountUp } from "@/hooks/useCountUp";

type AuditDataShape = typeof auditData;
const AuditCtx = createContext<AuditDataShape>(auditData);
const useAuditData = (): AuditDataShape => useContext(AuditCtx);

const PINK_TOKENS = ["chatgpt", "perplexity", "claude", "gemini", "6 days", "day 7", "+15", "+33"];

function renderOneLiner(line: string): React.ReactNode {
  if (!line) return null;
  const trimmed = line.trim().replace(/\.$/, "");
  const sentences = trimmed.split(/\.\s+/).filter(Boolean);
  return sentences.map((sentence, si) => {
    const parts: React.ReactNode[] = [];
    let cursor = 0;
    const matches: { start: number; end: number; text: string }[] = [];
    for (const tok of PINK_TOKENS) {
      const re = new RegExp(tok.replace(/[+]/g, "\\+"), "gi");
      let m: RegExpExecArray | null;
      while ((m = re.exec(sentence)) !== null) {
        matches.push({ start: m.index, end: m.index + m[0].length, text: m[0] });
      }
    }
    matches.sort((a, b) => a.start - b.start);
    for (const m of matches) {
      if (m.start < cursor) continue;
      if (m.start > cursor) parts.push(sentence.slice(cursor, m.start));
      parts.push(<span key={`${si}-${m.start}`} className="text-pink">{m.text}</span>);
      cursor = m.end;
    }
    if (cursor < sentence.length) parts.push(sentence.slice(cursor));
    return (
      <span key={si}>
        {parts}
        {si < sentences.length - 1 ? <>.<br /></> : "."}
      </span>
    );
  });
}

type Folio = { num: string; id: string; label: string };

const FOLIOS: Folio[] = [
  { num: "I",    id: "verdict",   label: "verdict" },
  { num: "II",   id: "engines",   label: "per engine" },
  { num: "III",  id: "ledger",    label: "the 18 signals" },
  { num: "IV",   id: "fixes",     label: "where the score moves" },
  { num: "V",    id: "sample",    label: "sample fix · code" },
  { num: "VI",   id: "plan",      label: "the 6-day rebuild" },
  { num: "VII",  id: "outcome",   label: "projected outcome" },
  { num: "VIII", id: "book",      label: "lock in a slot" },
];

export function AuditView() {
  const params = useParams<{ leadid?: string }>();
  const searchParams = useSearchParams();
  const leadid = params?.leadid;

  const domainParam = searchParams?.get("domain") || "";
  const isDemoRoute = leadid === "demo" || searchParams?.get("instant") === "1" || !leadid;

  const [data, setData] = useState<AuditDataShape>(auditData);
  const [phase, setPhase] = useState<"scanning" | "results" | "error">(isDemoRoute ? "results" : "scanning");
  const [step, setStep] = useState(0);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (isDemoRoute || !leadid) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/audit/${leadid}`, { cache: "no-store" });
        if (!res.ok) throw new Error(res.status === 404 ? "audit not found" : "load failed");
        const json = (await res.json()) as AuditDataShape;
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setFetchError(e instanceof Error ? e.message : "load failed");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isDemoRoute, leadid]);

  const domain = useMemo(() => {
    const raw = domainParam || data.domain;
    return raw.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/+$/g, "");
  }, [domainParam, data.domain]);

  useEffect(() => {
    if (phase !== "scanning") return;
    let i = 0;
    const total = 18;
    const interval = window.setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= total) {
        window.clearInterval(interval);
        window.setTimeout(() => setPhase(fetchError ? "error" : "results"), 420);
      }
    }, 220);
    return () => window.clearInterval(interval);
  }, [phase, fetchError]);

  if (phase === "scanning") {
    return <ScanningState domain={domain} step={step} />;
  }
  if (phase === "error" || fetchError) {
    return <ScanError domain={domain} message={fetchError ?? "load failed"} />;
  }
  return (
    <AuditCtx.Provider value={data}>
      <Dossier domain={domain} leadId={leadid || "demo"} />
    </AuditCtx.Provider>
  );
}

function ScanError({ domain, message }: { domain: string; message: string }) {
  return (
    <div className="bg-bg min-h-[60vh]">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-pink flex items-center gap-2">
          <span className="w-2 h-2 bg-pink" /> scan unavailable
        </div>
        <h1 className="mt-8 font-display text-5xl md:text-7xl leading-[0.88] tracking-tight">
          could not load<br />
          <span className="text-pink">{domain || "the report"}</span>
          <span className="text-fg">.</span>
        </h1>
        <p className="mt-8 text-base md:text-lg leading-snug max-w-[540px]">
          {message}. the audit may have expired, or the link is wrong. run a fresh scan from the nav, or grab the public sample.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 font-mono text-[11px] font-bold tracking-widest uppercase">
          <Link href="/audit/demo" className="border-2 border-fg bg-fg text-bg px-4 py-2.5 hover:bg-bg hover:text-fg transition-colors">view sample audit</Link>
          <Link href="/" className="border-2 border-line px-4 py-2.5 hover:border-pink hover:text-pink transition-colors">back to home</Link>
        </div>
      </div>
    </div>
  );
}

function ScanningState({ domain, step }: { domain: string; step: number }) {
  const total = auditData.signalResults.length;
  const pct = Math.round((step / total) * 100);
  const recent = auditData.signalResults.slice(Math.max(0, step - 5), step);

  return (
    <div className="bg-bg">
      <ClassificationBar domain={domain} live state="scanning" />

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-pink flex items-center gap-2">
          <span className="w-2 h-2 bg-pink anim-blink" />
          scanning · 18 signals · 5 categories
        </div>

        <h1 className="mt-8 font-display text-5xl md:text-7xl leading-[0.88] tracking-tight">
          scanning<br />
          <span className="text-pink">{domain}</span>
          <span className="text-fg">.</span>
        </h1>

        <div className="mt-12">
          <div className="flex items-baseline justify-between mb-3 font-mono text-[10px] font-bold tracking-widest uppercase">
            <span>progress</span>
            <span>
              {step.toString().padStart(2, "0")} / {total} · {pct}%
            </span>
          </div>
          <div className="h-4 border-2 border-line bg-bg relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-pink transition-all duration-200 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="mt-10 border-2 border-line min-h-[280px] divide-y-2 divide-line">
          {recent.length === 0 ? (
            <div className="px-5 py-10 font-mono text-[11px] tracking-widest uppercase text-fg-muted">
              initialising scan…
            </div>
          ) : (
            recent.map((r, i) => {
              const s = signals.find((x) => x.id === r.id);
              if (!s) return null;
              const isLatest = i === recent.length - 1;
              const opacity = 0.35 + (i / Math.max(recent.length - 1, 1)) * 0.65;
              return (
                <div
                  key={r.id}
                  className={`flex items-baseline gap-4 px-5 py-3.5 ${isLatest ? "bg-pink-wash" : ""}`}
                  style={{ opacity }}
                >
                  <span className="font-display text-2xl text-pink tracking-tighter w-10 leading-none">
                    {String(s.num).padStart(2, "0")}
                  </span>
                  <span className="text-sm md:text-base flex-1">{s.title}</span>
                  <PassFail passed={r.passed} small />
                </div>
              );
            })
          )}
        </div>

        <div className="mt-8 font-mono text-[10px] tracking-widest uppercase text-fg-muted">
          usually under 90 seconds · we&apos;ll email you the pdf too
        </div>
      </div>
    </div>
  );
}

function Dossier({ domain, leadId }: { domain: string; leadId: string }) {
  return (
    <div className="bg-bg">
      <ClassificationBar domain={domain} leadId={leadId} state="complete" />
      <CoverSheet domain={domain} leadId={leadId} />

      <div className="grid grid-cols-12 max-w-8xl mx-auto">
        <SideRail />
        <article className="col-span-12 lg:col-span-9 lg:border-l-2 lg:border-line">
          <Verdict domain={domain} leadId={leadId} />
          <Engines />
          <Ledger />
          <Fixes />
          <SampleFix />
          <SixDayPlan />
          <Outcome />
          <Book />
        </article>
      </div>

      <Attribution leadId={leadId} />
    </div>
  );
}

function ClassificationBar({
  domain,
  leadId,
  live,
  state,
}: {
  domain: string;
  leadId?: string;
  live?: boolean;
  state: "scanning" | "complete";
}) {
  const data = useAuditData();
  return (
    <div className="bg-fg text-bg">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-2 flex items-center justify-between gap-4 font-mono text-[9px] md:text-[10px] font-bold tracking-widest uppercase">
        <div className="flex items-center gap-3 md:gap-4 flex-wrap min-w-0">
          <span className="flex items-center gap-2 text-pink">
            <span className={`w-1.5 h-1.5 bg-pink ${live ? "anim-blink" : ""}`} />
            <span>signal*</span>
          </span>
          <span className="text-bg/40">/</span>
          <span>confidential</span>
          <span className="text-bg/40">/</span>
          <span>file no. <span className="text-pink">{leadId === "demo" ? data.scanIdShort : leadId || "-"}</span></span>
          <span className="text-bg/40 hidden md:inline">/</span>
          <span className="hidden md:inline truncate">subject · {domain}</span>
        </div>
        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          <span className="text-bg/60 hidden md:inline">{state === "scanning" ? "rev - in progress" : "rev a · final"}</span>
          <span className="text-bg/40 hidden md:inline">·</span>
          <span>{data.scannedAt}</span>
        </div>
      </div>
    </div>
  );
}

function CoverSheet({ domain, leadId }: { domain: string; leadId: string }) {
  const data = useAuditData();
  const score = useCountUp(data.overallScore, 1400, true);

  return (
    <section className="relative border-b-2 border-line bg-bg overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <CornerMark className="top-3 left-3" />
      <CornerMark className="top-3 right-3" flip="x" />
      <CornerMark className="bottom-3 left-3" flip="y" />
      <CornerMark className="bottom-3 right-3" flip="xy" />

      <div className="relative max-w-8xl mx-auto px-6 md:px-10 pt-10 pb-10 md:pt-14 md:pb-14">
        <header className="grid grid-cols-12 gap-4 border-b-2 border-line pb-6 mb-10 md:mb-14 font-mono text-[10px] font-bold tracking-widest uppercase">
          <div className="col-span-6 md:col-span-3">
            <div className="text-fg-muted">/ folio</div>
            <div className="mt-1.5 text-pink">00 · cover</div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="text-fg-muted">/ subject</div>
            <div className="mt-1.5">{domain}</div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="text-fg-muted">/ scan id</div>
            <div className="mt-1.5">{leadId === "demo" ? data.scanIdShort : leadId}</div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="text-fg-muted">/ rubric</div>
            <div className="mt-1.5">v1.2 · 18 signals</div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8 md:gap-14 items-end">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted">
              / aeo scorecard
            </div>
            <h1
              className="mt-6 font-display tracking-tighter leading-[0.82]"
              style={{ fontSize: "clamp(56px, 9vw, 140px)" }}
            >
              {domain}<span className="text-pink">.</span>
            </h1>
            <p className="mt-8 font-display text-2xl md:text-4xl leading-[1.05] tracking-tight max-w-[640px]">
              {renderOneLiner(data.oneLiner)}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#book"
                className="group inline-flex items-center gap-3 bg-pink text-bg px-6 md:px-7 py-4 md:py-5 hover:bg-fg transition-colors duration-200 font-display text-xl md:text-2xl tracking-tight"
              >
                book the $2,490 audit
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </a>
              <button
                type="button"
                className="inline-flex items-center gap-2 border-2 border-line bg-bg px-5 py-4 md:py-5 hover:border-pink hover:text-pink transition-colors font-mono text-[11px] font-bold tracking-widest uppercase"
              >
                download pdf
                <Download className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:justify-self-end w-full max-w-[440px]">
            <ScoreStamp score={score} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CornerMark({ className = "", flip }: { className?: string; flip?: "x" | "y" | "xy" }) {
  const transform =
    flip === "x" ? "scaleX(-1)" : flip === "y" ? "scaleY(-1)" : flip === "xy" ? "scale(-1, -1)" : undefined;
  return (
    <div className={`absolute pointer-events-none ${className}`} style={{ transform }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M0 0 H10 M0 0 V10" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}

function ScoreStamp({ score }: { score: number }) {
  const data = useAuditData();
  return (
    <div className="relative">
      <div className="border-2 border-fg bg-bg shadow-[8px_8px_0_0_var(--pink)]">
        <div className="grid grid-cols-3 border-b-2 border-fg">
          <Cell label="rev" v="a" />
          <Cell label="weight" v="100" mid />
          <Cell label="rubric" v="v1.2" />
        </div>
        <div className="p-6 md:p-8">
          <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">/ overall score</div>
          <div className="mt-3 flex items-baseline gap-2">
            <span
              className="font-display tracking-tighter leading-[0.78]"
              style={{ fontSize: "clamp(96px, 14vw, 180px)" }}
            >
              {score}
            </span>
            <span className="font-display text-3xl md:text-5xl text-fg-muted tracking-tighter">/ 100</span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2 font-mono text-[9px] font-bold tracking-widest uppercase">
            <Pill label="you" value={data.overallScore} tone="default" />
            <Pill label="median" value={data.median} tone="muted" />
            <Pill label="day 7" value={data.projectedScore} tone="pink" />
          </div>
          <div className="mt-5">
            <div className="h-2 border-2 border-fg relative">
              <div className="absolute inset-y-0 left-0 bg-pink" style={{ width: `${data.overallScore}%` }} />
              <div className="absolute -top-1 -bottom-1 w-[2px] bg-fg" style={{ left: `calc(${data.median}% - 1px)` }} />
              <div className="absolute -top-1 -bottom-1 w-[2px] bg-fg" style={{ left: `calc(${data.projectedScore}% - 1px)`, opacity: 0.4 }} />
            </div>
            <div className="mt-2 font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">
              {data.decile}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -top-3 -right-3 rotate-[6deg] hidden md:block">
        <div className="bg-pink text-bg border-2 border-fg px-3 py-1.5 font-mono text-[9px] font-bold tracking-widest uppercase">
          confidential
        </div>
      </div>
    </div>
  );
}

function Cell({ label, v, mid }: { label: string; v: string; mid?: boolean }) {
  return (
    <div className={`px-3 py-2 ${mid ? "border-l-2 border-r-2 border-fg" : ""}`}>
      <div className="font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">{label}</div>
      <div className="mt-1 font-mono text-xs font-bold uppercase">{v}</div>
    </div>
  );
}

function Pill({ label, value, tone }: { label: string; value: number; tone: "default" | "pink" | "muted" }) {
  const valueClass = tone === "pink" ? "text-pink" : tone === "muted" ? "text-fg-muted" : "text-fg";
  return (
    <div className="border-2 border-line px-2 py-1.5">
      <div className="text-fg-muted">{label}</div>
      <div className={`mt-0.5 font-display text-lg leading-none tracking-tighter ${valueClass}`}>{value}</div>
    </div>
  );
}

function SideRail() {
  const [active, setActive] = useState("verdict");

  useEffect(() => {
    const onScroll = () => {
      const offsets = FOLIOS.map((f) => {
        const el = document.getElementById(f.id);
        if (!el) return { id: f.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: f.id, top: Math.abs(rect.top - 120) };
      });
      offsets.sort((a, b) => a.top - b.top);
      if (offsets[0]) setActive(offsets[0].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className="hidden lg:block col-span-3">
      <div className="sticky top-[80px] py-12 pr-8">
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-5">
          / contents
        </div>
        <nav>
          <ul className="space-y-1">
            {FOLIOS.map((f) => {
              const isActive = active === f.id;
              return (
                <li key={f.id}>
                  <a
                    href={`#${f.id}`}
                    className={`group flex items-baseline gap-3 py-2 pr-3 border-l-2 pl-3 transition-colors ${
                      isActive ? "border-pink text-fg" : "border-line text-fg-muted hover:text-fg hover:border-pink"
                    }`}
                  >
                    <span className={`font-display text-base tracking-tighter w-10 flex-shrink-0 ${isActive ? "text-pink" : "text-fg-muted"}`}>
                      {f.num}
                    </span>
                    <span className="font-mono text-[10px] font-bold tracking-widest uppercase">{f.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-8 pt-6 border-t-2 border-line">
          <div className="font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">/ pages</div>
          <div className="mt-1 font-display text-2xl leading-none tracking-tighter">
            08 <span className="text-fg-muted text-base">/ 08</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function FolioHeader({ num, label, sub }: { num: string; label: string; sub?: string }) {
  return (
    <div className="flex items-baseline gap-5 border-b-2 border-line pb-4 mb-8">
      <span className="font-display text-4xl md:text-5xl text-pink tracking-tighter leading-none">{num}</span>
      <div className="flex-1">
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">/ folio · {label}</div>
        {sub && <div className="mt-1.5 font-mono text-[10px] tracking-widest uppercase text-fg-muted">{sub}</div>}
      </div>
    </div>
  );
}

function Verdict({ domain, leadId }: { domain: string; leadId: string }) {
  const data = useAuditData();
  return (
    <section id="verdict" className="border-b-2 border-line">
      <div className="px-6 md:px-10 py-12 md:py-20">
        <FolioHeader num="I" label="verdict" sub="declarative assessment · two operators · scored on rubric v1.2" />

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-9">
            <p className="font-display text-2xl md:text-4xl leading-[1.15] tracking-tight">
              <span className="text-pink">{domain}</span> ranks in the bottom third of b2b saas on AEO readiness.
              The product is on the page; the answer engines can&apos;t see it. Hydration empties the shell before the
              crawler reads it, the cdn is blocking three of four engine bots at the edge, and the top concept
              pages bury the claim under setup. The signal scaffolding - schema, llms.txt, breadcrumbs - is
              missing or partial on every route audited.
            </p>

            <p className="mt-6 text-base md:text-lg leading-snug max-w-[640px] text-fg-muted">
              The good news is that the failure pattern is mechanical, not strategic. Three shipped fixes carry
              <span className="text-fg"> 33 of the projected 33-point delta</span>. The remaining nine are housekeeping
              that compound over weeks.
            </p>

            <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 font-mono text-[10px] font-bold tracking-widest uppercase">
              <div className="flex items-baseline gap-2">
                <span className="text-fg-muted">signed</span>
                <span className="text-fg">scanner · v1.2.4</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-fg-muted">scan id</span>
                <span className="text-fg">{leadId === "demo" ? data.scanIdShort : leadId}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-fg-muted">verified by</span>
                <span className="text-fg">hubspot aeo grader · google lighthouse</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 md:border-l-2 md:border-line md:pl-6 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">/ severity</div>
              <div className="mt-3 font-display text-5xl tracking-tighter leading-none text-pink">b2</div>
              <div className="mt-2 font-mono text-[10px] font-bold tracking-widest uppercase">
                meaningful · time-bound
              </div>
            </div>
            <div className="mt-6 md:mt-0 pt-6 md:pt-0 border-t-2 md:border-t-0 border-line">
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">/ remediation</div>
              <div className="mt-3 font-display text-5xl tracking-tighter leading-none">06d</div>
              <div className="mt-2 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
                one engagement
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Engines() {
  const data = useAuditData();
  return (
    <section id="engines" className="border-b-2 border-line bg-bg">
      <div className="px-6 md:px-10 py-12 md:py-20">
        <FolioHeader num="II" label="per engine" sub="four engines · four scores · cited percentage on relevant prompts" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-line">
          {data.engines.map((e, i) => (
            <EngineCell key={e.key} engine={e} index={i} />
          ))}
        </div>

        <div className="mt-6 font-mono text-[10px] tracking-widest uppercase text-fg-muted flex flex-wrap gap-x-6 gap-y-2">
          <span><span className="inline-block w-3 h-3 bg-pink mr-2 align-middle" />you</span>
          <span><span className="inline-block w-3 h-3 bg-fg mr-2 align-middle" />typical-good band</span>
          <span><span className="inline-block w-3 h-3 border-2 border-fg mr-2 align-middle" />unrendered · 0–{data.median - 20}</span>
        </div>
      </div>
    </section>
  );
}

function EngineCell({ engine, index }: { engine: AuditEngine; index: number }) {
  const rightEdge = index % 2 === 0;
  const bottomEdge = index < 2;
  return (
    <div className={`p-6 md:p-7 ${rightEdge ? "md:border-r-2" : ""} ${bottomEdge ? "border-b-2" : ""} border-line`}>
      <div className="flex items-baseline justify-between">
        <div className="font-display text-3xl md:text-4xl tracking-tighter leading-none">{engine.label}</div>
        <div className="font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">
          eng · 0{index + 1}
        </div>
      </div>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-6xl md:text-7xl tracking-tighter leading-none">{engine.score}</span>
        <span className="font-display text-xl text-fg-muted tracking-tighter">/ 100</span>
        <span className="ml-auto font-mono text-[10px] font-bold tracking-widest uppercase text-pink">
          ↓ {engine.typicalGood - engine.score}
        </span>
      </div>

      <div className="mt-6">
        <div className="h-3 border-2 border-line bg-bg relative">
          <div className="absolute inset-y-0 left-0 bg-pink" style={{ width: `${engine.score}%` }} />
          <div className="absolute -top-1 -bottom-1 w-[2px] bg-fg" style={{ left: `calc(${engine.typicalGood}% - 1px)` }} />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[9px] tracking-widest uppercase text-fg-muted">
          <span>you · {engine.score}</span>
          <span>good · {engine.typicalGood}</span>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t-2 border-line font-mono text-[10px] tracking-widest uppercase text-fg-muted">
        cited in <span className="text-fg">{engine.citedPct}%</span> of relevant prompts
      </div>
    </div>
  );
}

function Ledger() {
  const data = useAuditData();
  const [filter, setFilter] = useState<"all" | "passed" | "failed">("all");

  const counts = useMemo(() => {
    const passed = data.signalResults.filter((r) => r.passed).length;
    const failed = data.signalResults.length - passed;
    return { all: data.signalResults.length, passed, failed };
  }, [data.signalResults]);

  const grouped = useMemo(() => {
    const visible = filter === "all"
      ? data.signalResults
      : data.signalResults.filter((r) => (filter === "passed" ? r.passed : !r.passed));

    const groups = new Map<string, SignalResult[]>();
    visible.forEach((r) => {
      const s = signals.find((x) => x.id === r.id);
      const cat = s ? `block ${s.block}` : "other";
      if (!groups.has(cat)) groups.set(cat, []);
      groups.get(cat)!.push(r);
    });
    return Array.from(groups.entries());
  }, [filter, data.signalResults]);

  return (
    <section id="ledger" className="border-b-2 border-line bg-bg">
      <div className="px-6 md:px-10 py-12 md:py-20">
        <FolioHeader num="III" label="the 18 signals" sub="grouped by block · 0-5 per signal · block multipliers shown right" />

        <div className="flex gap-2 mb-8 font-mono text-[10px] font-bold tracking-widest uppercase">
          {(["all", "passed", "failed"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-2 border-2 transition-colors ${
                filter === f ? "bg-fg text-bg border-fg" : "border-line bg-bg hover:border-pink hover:text-pink"
              }`}
            >
              {f} · {counts[f].toString().padStart(2, "0")}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {grouped.map(([cat, rows]) => (
            <CategoryGroup key={cat} category={cat} rows={rows} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryGroup({ category, rows }: { category: string; rows: SignalResult[] }) {
  const total = rows.reduce((a, r) => a + r.weight, 0);
  const passed = rows.filter((r) => r.passed).reduce((a, r) => a + r.weight, 0);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-line pb-3 mb-0">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-3xl md:text-4xl tracking-tighter leading-none">
            {category}<span className="text-pink">.</span>
          </span>
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
            {rows.length} signals · {total} pts max
          </span>
        </div>
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase">
          earned <span className="text-pink">{passed}</span> / {total}
        </div>
      </div>

      <div className="border-2 border-line border-t-0 divide-y-2 divide-line">
        {rows.map((r) => {
          const s = signals.find((x) => x.id === r.id);
          if (!s) return null;
          return (
            <div
              key={r.id}
              className={`grid grid-cols-12 items-baseline gap-3 px-4 md:px-6 py-4 md:py-5 ${
                r.passed ? "" : "bg-pink-wash/40"
              }`}
            >
              <span className="col-span-2 md:col-span-1 font-display text-2xl md:text-3xl text-pink tracking-tighter leading-none">
                {String(s.num).padStart(2, "0")}
              </span>
              <div className="col-span-10 md:col-span-8 min-w-0">
                <div className="font-medium text-sm md:text-base">{s.title}</div>
                <div className="mt-1 text-xs md:text-sm leading-snug text-fg-muted">{r.note}</div>
              </div>
              <div className="col-span-6 md:col-span-2"><PassFail passed={r.passed} /></div>
              <div className="col-span-6 md:col-span-1 text-right font-mono text-[10px] font-bold tracking-widest uppercase">
                {r.passed ? <span className="text-fg-muted">+{String(r.weight).padStart(2, "0")}</span> : <span className="text-pink">−{String(r.weight).padStart(2, "0")}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PassFail({ passed, small }: { passed: boolean; small?: boolean }) {
  const cls = small ? "px-2 py-0.5 text-[9px]" : "px-2.5 py-1 text-[10px]";
  return (
    <span
      className={`inline-flex items-center gap-1 font-mono font-bold tracking-widest uppercase ${cls} ${
        passed ? "bg-fg/5 text-fg" : "bg-pink text-bg"
      }`}
    >
      {passed ? (<><Check className="w-3 h-3" strokeWidth={3} />pass</>) : (<><XIcon className="w-3 h-3" strokeWidth={3} />fail</>)}
    </span>
  );
}

function Fixes() {
  const data = useAuditData();
  return (
    <section id="fixes" className="border-b-2 border-line bg-pink-wash/40">
      <div className="px-6 md:px-10 py-12 md:py-20">
        <FolioHeader num="IV" label="where the score moves" sub={`three fixes · ${data.overallScore} → ${data.projectedScore} · ranked by projected delta`} />

        <div className="space-y-6 md:space-y-10">
          {data.topFixes.map((fix, i) => (
            <FixSlab key={fix.signalId} fix={fix} alt={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FixSlab({ fix, alt }: { fix: TopFix; alt: boolean }) {
  const rank = ["I", "II", "III"][fix.rank - 1] || String(fix.rank);
  return (
    <div className={`relative border-2 border-line bg-bg grid grid-cols-12 ${alt ? "md:ml-8" : "md:mr-8"}`}>
      <div className="col-span-12 md:col-span-4 bg-fg text-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
        <div className="relative p-6 md:p-8 h-full flex flex-col justify-between min-h-[200px]">
          <div className="flex items-baseline justify-between">
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-bg/60">
              / fix · rank {rank}
            </div>
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-pink">
              effort · {fix.effort}
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <div
              className="font-display tracking-tighter leading-[0.78] text-pink"
              style={{ fontSize: "clamp(72px, 11vw, 140px)" }}
            >
              +{fix.projectedDelta}
            </div>
            <div className="mt-2 font-mono text-[10px] font-bold tracking-widest uppercase text-bg/60">
              projected delta · pts
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-8 p-6 md:p-8">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="font-display text-xl text-pink tracking-tighter">
            signal {String(fix.num).padStart(2, "0")}
          </span>
          <span className="font-display text-2xl md:text-4xl tracking-tighter">{fix.title}<span className="text-pink">.</span></span>
        </div>

        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-6 border-t-2 border-line">
          <div>
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">today</div>
            <p className="mt-2 text-sm md:text-base leading-snug">{fix.current}</p>
          </div>
          <div className="md:border-l-2 md:border-line md:pl-8">
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-pink">we ship</div>
            <p className="mt-2 text-sm md:text-base leading-snug">{fix.ship}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SampleFix() {
  const data = useAuditData();
  const f = data.sampleFix;
  return (
    <section id="sample" className="border-b-2 border-line bg-fg text-bg">
      <div className="px-6 md:px-10 py-12 md:py-20">
        <div className="flex items-baseline gap-5 border-b-2 border-bg/30 pb-4 mb-8">
          <span className="font-display text-4xl md:text-5xl text-pink tracking-tighter leading-none">V</span>
          <div className="flex-1">
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-bg/60">
              / folio · sample fix · code
            </div>
            <div className="mt-1.5 font-mono text-[10px] tracking-widest uppercase text-bg/60">
              one of three · representative of what ships
            </div>
          </div>
        </div>

        <h2 className="font-display text-3xl md:text-5xl leading-[0.95] tracking-tight">
          signal {String(f.signalNum).padStart(2, "0")} · {f.signalTitle}<span className="text-pink">.</span>
        </h2>

        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <CodeBlock label="today" right="before the rebuild" code={f.before} variant="muted" />
          <CodeBlock label="day 4" right="after the rebuild" code={f.after} variant="pink" />
        </div>

        <div className="mt-6 font-mono text-[10px] tracking-widest uppercase text-bg/60">{f.note}</div>
      </div>
    </section>
  );
}

function CodeBlock({ label, right, code, variant }: { label: string; right: string; code: string; variant: "muted" | "pink" }) {
  const headBg = variant === "pink" ? "bg-pink text-bg" : "bg-bg/10 text-bg/70";
  return (
    <div className="border-2 border-bg/30 bg-bg/[0.04]">
      <div className={`px-4 py-2.5 border-b-2 border-bg/30 flex items-center justify-between font-mono text-[10px] font-bold tracking-widest uppercase ${headBg}`}>
        <span>{label}</span>
        <span className="text-bg/70">{right}</span>
      </div>
      <pre className="p-4 md:p-5 overflow-x-auto font-mono text-[11px] md:text-[12px] leading-relaxed text-bg/90 whitespace-pre">
{code}
      </pre>
    </div>
  );
}

function SixDayPlan() {
  const data = useAuditData();
  return (
    <section id="plan" className="border-b-2 border-line bg-bg">
      <div className="px-6 md:px-10 py-12 md:py-20">
        <FolioHeader num="VI" label="the 6-day rebuild" sub="day-by-day timeline · ships at end of day" />

        <ol className="relative border-l-2 border-line ml-3 md:ml-8">
          {data.dayPlan.map((d, i) => (
            <DayRow key={d.day} day={d} last={i === data.dayPlan.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function DayRow({ day, last }: { day: DayPlan; last: boolean }) {
  const final = day.day === 6;
  return (
    <li className={`relative pl-6 md:pl-10 pb-10 ${last ? "pb-0" : ""}`}>
      <span className={`absolute -left-[11px] top-0 w-5 h-5 border-2 border-line ${final ? "bg-pink" : "bg-bg"}`} />
      <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
        <div className="col-span-12 md:col-span-2">
          <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">/ day</div>
          <div className={`mt-2 font-display tracking-tighter leading-[0.85] ${final ? "text-pink" : "text-fg"}`} style={{ fontSize: "clamp(56px, 8vw, 96px)" }}>
            {String(day.day).padStart(2, "0")}
          </div>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div className="flex items-baseline gap-3 flex-wrap">
            <div className="font-display text-2xl md:text-3xl tracking-tighter">{day.label}<span className="text-pink">.</span></div>
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
              {day.day < 4 ? "owned · aakif" : day.day < 6 ? "owned · aditya" : "owned · both"}
            </div>
          </div>
          <p className="mt-3 text-base md:text-lg leading-snug max-w-[680px]">{day.scope}</p>
          <div className="mt-4 inline-flex items-baseline gap-2 border-2 border-line px-3 py-2 font-mono text-[10px] font-bold tracking-widest uppercase">
            <span className="text-fg-muted">ships eod</span>
            <span className="text-pink">·</span>
            <span>{day.ships}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

function Outcome() {
  const data = useAuditData();
  const delta = data.projectedScore - data.overallScore;
  return (
    <section id="outcome" className="border-b-2 border-line bg-pink-wash">
      <div className="px-6 md:px-10 py-12 md:py-20">
        <FolioHeader num="VII" label="projected outcome" sub="day 7 final scan · same rubric · same scanner" />

        <div className="grid grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="col-span-12 md:col-span-5">
            <div className="font-display leading-[0.82] tracking-tighter text-fg" style={{ fontSize: "clamp(96px, 16vw, 200px)" }}>
              +{delta}
            </div>
            <div className="mt-3 font-display text-2xl md:text-4xl tracking-tighter">
              {data.overallScore} <span className="text-fg-muted">→</span> {data.projectedScore}
            </div>
            <p className="mt-6 text-base md:text-lg leading-snug max-w-[420px]">
              matches our pilot average across 11 builds. day 7 final scan by hubspot aeo grader confirms the
              movement before we call it shipped. if it doesn&apos;t clear +15, we keep building on our dime.
            </p>
            <div className="mt-6 inline-flex items-baseline gap-3 border-2 border-fg bg-bg px-4 py-2 font-mono text-[10px] font-bold tracking-widest uppercase">
              <span className="text-pink">+15 ship floor</span>
              <span className="text-fg-muted">·</span>
              <span>verified before handoff</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7">
            <div className="space-y-5">
              <ScoreBar label="today · day 00" value={data.overallScore} pattern="solid" />
              <ScoreBar label="day 7 · projected" value={data.projectedScore} pattern="stripe" />
              <ScoreBar label="median · b2b saas" value={data.median} pattern="ghost" />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-6 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
              <Legend swatch="solid" label="today" />
              <Legend swatch="stripe" label="projected" />
              <Legend swatch="ghost" label="median" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScoreBar({ label, value, pattern }: { label: string; value: number; pattern: "solid" | "stripe" | "ghost" }) {
  const fillStyle: React.CSSProperties =
    pattern === "stripe"
      ? { backgroundImage: "repeating-linear-gradient(45deg, #FF1F6A 0, #FF1F6A 6px, #FFD7E6 6px, #FFD7E6 12px)", width: `${value}%` }
      : pattern === "ghost"
      ? { backgroundColor: "transparent", width: `${value}%`, borderRight: "2px dashed currentColor" }
      : { backgroundColor: "#FF1F6A", width: `${value}%` };

  return (
    <div>
      <div className="flex items-baseline justify-between font-mono text-[10px] font-bold tracking-widest uppercase mb-2">
        <span>{label}</span>
        <span>{value} / 100</span>
      </div>
      <div className="h-12 md:h-14 border-2 border-line bg-bg relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 transition-all duration-700 ease-out" style={fillStyle} />
      </div>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: "solid" | "stripe" | "ghost"; label: string }) {
  const style: React.CSSProperties =
    swatch === "stripe"
      ? { backgroundImage: "repeating-linear-gradient(45deg, #FF1F6A 0, #FF1F6A 3px, #FFD7E6 3px, #FFD7E6 6px)" }
      : swatch === "ghost"
      ? { backgroundColor: "transparent", borderRight: "2px dashed currentColor" }
      : { backgroundColor: "#FF1F6A" };
  return (
    <span className="inline-flex items-center gap-2">
      <span className="w-4 h-4 border-2 border-line" style={style} />
      <span>{label}</span>
    </span>
  );
}

function Book() {
  const data = useAuditData();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "reserved" | "error">("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const reserve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending" || status === "reserved") return;
    setErrMsg(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), domain: data.domain, slot: "q1-2026" }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "could not reserve" }));
        throw new Error(err.error ?? "could not reserve");
      }
      setStatus("reserved");
    } catch (err) {
      setStatus("error");
      setErrMsg(err instanceof Error ? err.message : "could not reserve");
    }
  };

  return (
    <section id="book" className="bg-fg text-bg">
      <div className="px-6 md:px-10 py-14 md:py-24">
        <div className="flex items-baseline gap-5 border-b-2 border-bg/30 pb-4 mb-10">
          <span className="font-display text-4xl md:text-5xl text-pink tracking-tighter leading-none">VIII</span>
          <div>
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-bg/60">/ folio · lock in a slot</div>
            <div className="mt-1.5 font-mono text-[10px] tracking-widest uppercase text-bg/60">flat scope · flat price · async over slack</div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="font-display leading-[0.82] tracking-tighter" style={{ fontSize: "clamp(80px, 14vw, 180px)" }}>
              $2,490
            </div>
            <div className="mt-2 font-display text-3xl md:text-5xl tracking-tighter text-bg/70">
              6 days · done<span className="text-pink">.</span>
            </div>

            <form onSubmit={reserve} className="mt-10 flex flex-wrap items-stretch gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                disabled={status === "sending" || status === "reserved"}
                className="px-5 py-5 bg-bg text-fg font-mono text-sm border-2 border-pink w-full md:w-[280px] focus:outline-none placeholder:text-fg-muted/70 disabled:opacity-50"
                aria-label="Your work email"
              />
              <button
                type="submit"
                disabled={status === "sending" || status === "reserved"}
                className="group inline-flex items-center gap-3 bg-pink text-bg px-7 py-5 hover:bg-bg hover:text-fg transition-colors duration-200 font-display text-2xl md:text-3xl tracking-tight border-2 border-pink hover:border-bg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "reserved" ? "slot held" : status === "sending" ? "holding…" : "lock in build slot"}
                {status !== "reserved" && (
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                )}
              </button>
              <div className="basis-full font-mono text-[10px] font-bold tracking-widest uppercase text-bg/60 inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-pink anim-blink" />
                2 of q1 ’26 remaining
              </div>
            </form>
            {errMsg && (
              <div className="mt-4 font-mono text-[10px] font-bold tracking-widest uppercase text-pink">{errMsg}</div>
            )}
            {status === "reserved" && (
              <div className="mt-4 font-mono text-[10px] font-bold tracking-widest uppercase text-bg/80">
                we&apos;ll email {email} within 12h with the brief and intake doc.
              </div>
            )}

            <p className="mt-8 max-w-md text-bg/60 font-mono text-[10px] tracking-widest uppercase leading-relaxed">
              we don&apos;t call it shipped until your score moves +15. same rubric, same scanner, verified before handoff.
            </p>
          </div>

          <div className="col-span-12 md:col-span-5">
            <div className="border-2 border-pink p-6 md:p-7 bg-bg text-fg">
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">/ what ships</div>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  "diagnosis + scoped engagement brief",
                  "ssr migration · render-path fixes",
                  "cdn bot rules · llms.txt · sitemap",
                  "article · faq · org schema, validated",
                  "top 12 pages rewritten · answer-first",
                  "pr merged to main · final scan verified",
                ].map((l) => (
                  <li key={l} className="flex items-baseline gap-2">
                    <span className="text-pink font-mono text-[10px] font-bold leading-none">▸</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t-2 border-line font-mono text-[10px] tracking-widest uppercase text-fg-muted">
                no retainer · no pms · two operators
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Attribution({ leadId }: { leadId: string }) {
  const data = useAuditData();
  return (
    <section className="bg-bg border-t-2 border-line">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
        <span>scored by</span>
        <span className="text-fg">signal* scanner v1.2.4</span>
        <span className="text-fg-muted/40">·</span>
        <span>verified</span>
        <span className="text-fg">hubspot aeo grader</span>
        <span className="text-fg-muted/40">·</span>
        <span className="text-fg">google lighthouse</span>
        <span className="text-fg-muted/40">·</span>
        <span>methodology</span>
        <span className="text-fg">v1.2</span>
        <span className="text-fg-muted/40">·</span>
        <span>file no.</span>
        <span className="text-fg">{leadId === "demo" ? data.scanIdShort : leadId}</span>
        <span className="text-fg-muted/40">·</span>
        <span>{data.scannedAt}</span>
        <span className="ml-auto">
          <Link href="/" className="hover:text-pink transition-colors">back to signal*</Link>
        </span>
      </div>
    </section>
  );
}
