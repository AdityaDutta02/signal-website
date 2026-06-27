"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowRight, Check } from "@/components/icons";
import { CAL_URL, BOOK_LABEL_ARROW } from "@/lib/links";

/**
 * Scorecard v5.
 *
 * Free zone (everyone): composite /100 + one-line context.
 *
 * Email-gated zone: per-engine breakdown, 18-signal breakdown, and three
 * highest-leverage fixes are NOT rendered. The user submits an email and the
 * full report is sent by email asynchronously. This is the only model that
 * works while the PDF stub is in place.
 */

type ScoreShape = {
  domain: string;
  overallScore: number;
  scannedAt: string;
};

type LoadState = "loading" | "ready" | "missing" | "error";

export function AuditScorecard() {
  const params = useParams<{ leadid: string }>();
  const leadid = params?.leadid ?? "";

  const [state, setState] = useState<LoadState>("loading");
  const [score, setScore] = useState<ScoreShape | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`/api/audit/${encodeURIComponent(leadid)}`);
        if (res.status === 404) {
          if (!cancelled) setState("missing");
          return;
        }
        if (!res.ok) {
          throw new Error(`load failed (${res.status})`);
        }
        const json = (await res.json()) as ScoreShape & Record<string, unknown>;
        if (!cancelled) {
          setScore({
            domain: String(json.domain),
            overallScore: Number(json.overallScore ?? 0),
            scannedAt: String(json.scannedAt ?? ""),
          });
          setState("ready");
        }
      } catch (err) {
        if (!cancelled) {
          setErrMsg(err instanceof Error ? err.message : "load failed");
          setState("error");
        }
      }
    }
    if (leadid) void load();
    return () => {
      cancelled = true;
    };
  }, [leadid]);

  if (state === "loading") return <Loading />;
  if (state === "missing") return <Missing />;
  if (state === "error") return <ErrorState message={errMsg ?? "could not load"} />;
  if (!score) return <Loading />;

  return (
    <>
      <FreeZone score={score} leadid={leadid} />
      <UnlockZone leadid={leadid} />
      <FinalCallCTA />
    </>
  );
}

/* ───────── States ───────── */

function Loading() {
  return (
    <div className="bg-bg min-h-[60vh] flex items-center justify-center">
      <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted flex items-center gap-3">
        <span className="w-2 h-2 bg-pink anim-blink" /> loading scorecard…
      </div>
    </div>
  );
}

function Missing() {
  return (
    <div className="bg-bg min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-[520px]">
        <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted">
          / scorecard not found
        </div>
        <h1 className="mt-3 font-display text-4xl md:text-5xl leading-[0.95] tracking-tighter">
          This Score Has Expired.
        </h1>
        <p className="mt-4 text-base leading-snug">
          The scorecard for this link is gone. Run a fresh scan and the new one will appear on its
          own URL.
        </p>
        <a
          href="/ai-visibility-score"
          className="mt-6 inline-flex items-center gap-2 border-2 border-fg px-5 py-3 hover:bg-fg hover:text-bg transition-colors font-mono text-[11px] font-bold tracking-[0.22em] uppercase"
        >
          run a fresh scan →
        </a>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="bg-bg min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-[520px]">
        <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-pink">
          / could not load scorecard
        </div>
        <p className="mt-3 font-mono text-sm">{message}. try again or email aditya@besignalled.com</p>
      </div>
    </div>
  );
}

/* ───────── Free zone ───────── */

function FreeZone({ score, leadid }: { score: ScoreShape; leadid: string }) {
  const status = statusFor(score.overallScore);
  const scannedDisplay = score.scannedAt
    ? new Date(score.scannedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "today";

  return (
    <section className="bg-bg border-b-2 border-line">
      <div className="max-w-8xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-6">
          / ai visibility scorecard
        </div>
        <h1
          className="font-display leading-[0.92] tracking-tighter"
          style={{ fontSize: "clamp(48px, 7vw, 112px)" }}
        >
          Your AI Visibility<br />Scorecard.
        </h1>
        <p className="mt-6 font-mono text-[11px] text-fg-muted tracking-[0.04em]">
          scanned {score.domain} on {scannedDisplay} · leadid {leadid}
        </p>

        <div className="mt-10 border-2 border-fg bg-pink-wash">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-0">
            <div className="p-6 md:p-10 border-b-2 md:border-b-0 md:border-r-2 border-fg">
              <div className="font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-fg-muted">
                composite, /100
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-display leading-none tracking-tighter" style={{ fontSize: "clamp(80px, 14vw, 200px)" }}>
                  {score.overallScore}
                </span>
                <span className="font-mono text-base text-fg-muted">/100</span>
              </div>
              <div className={`mt-3 font-mono text-[12px] font-bold tracking-[0.22em] uppercase ${status.cls}`}>
                {status.label}
              </div>
            </div>
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <p className="text-base md:text-[17px] leading-[1.55]">
                Most B2B SaaS sites we scan land between 30 and 60 on first scan. Above 70 is rare.
                Below 30 means at least one whole block of the rubric is missing.
              </p>
              <p className="mt-4 font-mono text-[11px] text-fg-muted">
                the per-engine breakdown, 18-signal table, and the three highest-leverage fixes are in the emailed report below.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function statusFor(score: number): { label: string; cls: string } {
  if (score >= 70) return { label: "strong", cls: "text-pink" };
  if (score >= 50) return { label: "moderate", cls: "text-fg" };
  if (score >= 30) return { label: "weak", cls: "text-fg" };
  return { label: "very weak", cls: "text-pink" };
}

/* ───────── Unlock zone (email gate) ───────── */

function UnlockZone({ leadid }: { leadid: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "sending" || status === "sent") return;
    setStatus("sending");
    setErrMsg(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "report",
          email: email.trim(),
          leadid,
          notes: "audit scorecard unlock",
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({ error: "send failed" }));
        throw new Error(j.error ?? "send failed");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrMsg(err instanceof Error ? err.message : "send failed");
    }
  }

  return (
    <section className="bg-bg border-b-2 border-line">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 items-start">
        <div>
          <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-4">
            / unlock the full report
          </div>
          <h2
            className="font-display leading-[0.95] tracking-tighter"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Get The Full Breakdown<br />And Recommendations By <span className="text-pink">Email</span>.
          </h2>
          <p className="mt-5 text-base md:text-lg leading-snug max-w-[560px]">
            We will email you the per-engine scores on ChatGPT, Perplexity, and Gemini, the
            18-signal breakdown for your site, and the three highest-leverage fixes.
          </p>
        </div>

        <div>
          {status === "sent" ? (
            <div className="border-2 border-fg p-6 md:p-7">
              <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-pink flex items-center gap-2">
                <Check className="w-4 h-4" strokeWidth={2.5} /> sent
              </div>
              <p className="mt-3 font-display text-3xl md:text-4xl tracking-tighter leading-[1]">
                Check your inbox.
              </p>
              <p className="mt-3 text-sm leading-snug">
                The full report lands at <span className="font-mono font-bold">{email}</span> shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="border-2 border-fg flex items-stretch">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                disabled={status === "sending"}
                className="flex-1 min-w-0 px-4 md:px-5 py-4 font-mono text-sm bg-bg focus:outline-none placeholder:text-fg-muted/70 disabled:opacity-60"
                aria-label="your work email"
              />
              <button
                type="submit"
                disabled={status === "sending" || !email}
                className="group inline-flex items-center gap-2 bg-fg text-bg px-4 md:px-5 hover:bg-pink transition-colors font-mono text-[11px] font-bold tracking-[0.22em] uppercase disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "sending…" : (
                  <>
                    send report
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                  </>
                )}
              </button>
            </form>
          )}
          {status === "error" && errMsg && (
            <p role="alert" className="mt-3 font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-pink">
              {errMsg}. try again or email aditya@besignalled.com
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ───────── Final call CTA ───────── */

function FinalCallCTA() {
  return (
    <section className="bg-fg text-bg">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10 items-end">
        <div>
          <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-bg/60 mb-4">
            / or, see the move in fifteen minutes
          </div>
          <h2
            className="font-display leading-[0.95] tracking-tighter"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Bring This Scorecard To The Call.<br />We Will Tell You The <span className="text-pink">Move</span>.
          </h2>
          <p className="mt-5 max-w-[640px] text-base md:text-lg leading-snug text-bg/85">
            We will tell you the highest-leverage fix and what shipping it would take.
          </p>
        </div>
        <a
          href={CAL_URL}
          target="_blank"
          rel="noopener"
          className="group inline-flex items-center justify-between gap-3 bg-pink text-bg px-6 py-5 hover:bg-bg hover:text-fg transition-colors font-mono text-[12px] font-bold tracking-[0.22em] uppercase border-2 border-pink hover:border-bg"
        >
          {BOOK_LABEL_ARROW}
        </a>
      </div>
    </section>
  );
}
