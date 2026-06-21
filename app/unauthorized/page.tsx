"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock } from "@/components/icons";

export default function UnauthorizedPage() {
  const [url, setUrl] = useState("");
  const [sending, setSending] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const router = useRouter();

  const attempted = "/audit/[redacted]";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || sending) return;
    setErrMsg(null);
    setSending(true);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: url.trim() }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({ error: "scan failed" }));
        throw new Error(j.error ?? "scan failed");
      }
      const { leadid } = (await res.json()) as { leadid: string };
      router.push(`/audit/${leadid}?domain=${encodeURIComponent(url.trim())}`);
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : "scan failed");
      setSending(false);
    }
  };

  return (
    <div className="bg-bg min-h-screen flex flex-col">
      <div className="bg-fg text-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-2 flex items-center justify-between gap-4 font-mono text-[9px] md:text-[10px] font-bold tracking-widest uppercase">
          <div className="flex items-center gap-3 md:gap-4 flex-wrap min-w-0">
            <span className="flex items-center gap-2 text-pink">
              <span className="w-1.5 h-1.5 bg-pink anim-blink" />
              <span>signal*</span>
            </span>
            <span className="text-bg/40">/</span>
            <span>confidential</span>
            <span className="text-bg/40">/</span>
            <span>access · <span className="text-pink">denied</span></span>
            <span className="text-bg/40 hidden md:inline">/</span>
            <span className="hidden md:inline">code · 401</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-bg/60">requested resource is private</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />

        <div className="relative max-w-8xl mx-auto px-6 md:px-10 py-12 md:py-20">
          <header className="grid grid-cols-12 gap-4 border-b-2 border-line pb-6 mb-12 md:mb-16 font-mono text-[10px] font-bold tracking-widest uppercase">
            <div className="col-span-6 md:col-span-3">
              <div className="text-fg-muted">/ folio</div>
              <div className="mt-1.5 text-pink">err · 401</div>
            </div>
            <div className="col-span-6 md:col-span-3">
              <div className="text-fg-muted">/ status</div>
              <div className="mt-1.5">unauthorized</div>
            </div>
            <div className="col-span-6 md:col-span-3">
              <div className="text-fg-muted">/ attempted</div>
              <div className="mt-1.5 truncate">{attempted}</div>
            </div>
            <div className="col-span-6 md:col-span-3">
              <div className="text-fg-muted">/ resolution</div>
              <div className="mt-1.5 text-pink">scan your own ↓</div>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-8 md:gap-14 items-start">
            <div className="col-span-12 lg:col-span-7">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">
                / 401 · unauthorized
              </div>

              <h1
                className="font-display tracking-tighter leading-[0.84]"
                style={{ fontSize: "clamp(80px, 14vw, 200px)" }}
              >
                this audit<br />
                <span className="text-pink">isn&apos;t yours</span>.
              </h1>

              <p className="mt-10 font-display text-2xl md:text-4xl leading-[1.05] tracking-tight max-w-[640px]">
                every scorecard is keyed to one prospect, one url, one scan id. if you got the link by mistake - or
                the link has expired - there&apos;s nothing here for you to read.
              </p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-line max-w-[560px]">
                <Reason num="01" body="audit urls are private. each one carries a single scan id." />
                <Reason num="02" body="links expire 90 days after issue. ours probably aged out." right />
                <Reason num="03" body="we don't share scorecards publicly. the prospect owns the data." bottom />
                <Reason num="04" body="if you landed here on purpose, the link was likely mistyped." right bottom />
              </div>

              <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
                <span>signed</span>
                <span className="text-fg">signal* scanner</span>
                <span>·</span>
                <span>err code 401</span>
                <span>·</span>
                <span>rev a · final</span>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-[80px]">
              <div className="border-2 border-fg bg-bg shadow-[8px_8px_0_0_var(--pink)]">
                <div className="bg-fg text-bg px-5 py-3 flex items-center gap-3 font-mono text-[10px] font-bold tracking-widest uppercase">
                  <Lock className="w-3.5 h-3.5 text-pink" strokeWidth={2.5} />
                  <span>scan your own site</span>
                  <span className="ml-auto text-bg/60">free · 90s · pdf</span>
                </div>

                <form onSubmit={submit} className="p-6 md:p-7">
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
                    / start a new scan
                  </div>
                  <h2 className="mt-3 font-display text-3xl md:text-4xl leading-[0.95] tracking-tighter">
                    your url.<br />
                    <span className="text-pink">your scorecard.</span>
                  </h2>

                  <p className="mt-4 text-sm leading-snug text-fg-muted">
                    Same 18-signal rubric, same scanner. You&apos;ll be on a real audit page in 90 seconds.
                  </p>

                  <div className="mt-6 border-2 border-line bg-bg flex items-stretch">
                    <span className="px-3 flex items-center bg-pink-wash font-mono text-[10px] font-bold tracking-widest uppercase text-pink">
                      https://
                    </span>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="your-site.com"
                      className="flex-1 px-3 py-3 font-mono text-sm bg-bg focus:outline-none placeholder:text-fg-muted/70"
                      aria-label="Your site URL"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!url || sending}
                    className="group mt-4 w-full inline-flex items-center justify-center gap-3 bg-fg text-bg px-5 py-4 hover:bg-pink transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono text-[11px] font-bold tracking-widest uppercase"
                  >
                    {sending ? "queuing scan…" : "scan my site"}
                    {!sending && (
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                    )}
                  </button>
                  {errMsg && (
                    <div className="mt-3 font-mono text-[10px] font-bold tracking-widest uppercase text-pink">{errMsg}</div>
                  )}

                  <div className="mt-5 pt-5 border-t-2 border-line font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted leading-relaxed">
                    we email the pdf to the address you control. no list, no nurture sequence, no follow-up calls.
                  </div>
                </form>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[10px] font-bold tracking-widest uppercase">
                <Link href="/" className="border-2 border-line px-4 py-2 hover:border-pink hover:text-pink transition-colors">
                  ← back to signal*
                </Link>
                <Link href="/methodology" className="text-fg-muted hover:text-pink transition-colors">
                  read the rubric
                </Link>
                <Link href="/audit/demo" className="text-fg-muted hover:text-pink transition-colors">
                  view a sample
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-14 md:mt-20 pt-6 border-t-2 border-line flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
            <span>signal*</span>
            <span>·</span>
            <span>aeo agency · two operators</span>
            <span>·</span>
            <span>methodology v1.2</span>
            <span className="ml-auto">if this was a mistake on our end - <a href="mailto:aditya@besignalled.com" className="text-fg hover:text-pink transition-colors">aditya@besignalled.com</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Reason({ num, body, right, bottom }: { num: string; body: string; right?: boolean; bottom?: boolean }) {
  return (
    <div className={`p-4 md:p-5 ${right ? "" : "md:border-r-2"} ${bottom ? "" : "border-b-2"} border-line`}>
      <div className="font-display text-2xl text-pink tracking-tighter leading-none">{num}</div>
      <p className="mt-3 text-xs md:text-sm leading-snug">{body}</p>
    </div>
  );
}
