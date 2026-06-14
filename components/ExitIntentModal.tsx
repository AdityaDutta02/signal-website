"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, ArrowRight, Check } from "lucide-react";

const OPEN_EVENT = "signal:open-report-modal";
const SESSION_FLAG = "signal:exit-intent-shown";

// Programmatically open the modal from anywhere on the page.
// Used by the Hero CTA "grab the free 24-page aeo report pdf" button.
export function openExitIntentModal(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

type Status = "idle" | "sending" | "sent" | "error";

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [animClass, setAnimClass] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    // Reset after fade so re-opening starts fresh
    window.setTimeout(() => {
      if (status === "sent") {
        setEmail("");
        setStatus("idle");
        setErrMsg(null);
      }
    }, 250);
  }, [status]);

  const handleOpen = useCallback(() => {
    setOpen(true);
    setAnimClass("anim-scale-in");
  }, []);

  // Programmatic open via custom event (Hero CTA, etc.)
  useEffect(() => {
    const onOpen = () => handleOpen();
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [handleOpen]);

  // Exit-intent trigger: only fires when the visitor has BOTH spent ≥30s on the
  // page AND scrolled past 40% of document height. Prevents the popup hitting
  // users who reach for the tab bar / URL audit form in the first few seconds.
  // Suppressed permanently for the session once shown OR once any lead-capture
  // form (Hero CTA, footer LeadMagnet) has been interacted with.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let alreadyShown = false;
    try {
      alreadyShown = window.sessionStorage.getItem(SESSION_FLAG) === "1";
    } catch {
      // sessionStorage can throw in some incognito/embed contexts
    }
    if (alreadyShown) return;

    let timeReached = false;
    let scrollReached = false;
    let suppressed = false;

    const armTimer = window.setTimeout(() => {
      timeReached = true;
    }, 30_000);

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = window.scrollY / max;
      if (pct >= 0.4) {
        scrollReached = true;
        window.removeEventListener("scroll", onScroll);
      }
    };

    // Any interaction with an email/url input means the user is already engaged —
    // a popup at that point would be pure interruption.
    const onFormFocus = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") {
        suppressed = true;
      }
    };

    const onLeave = (e: MouseEvent) => {
      if (suppressed) return;
      if (!(timeReached && scrollReached)) return;
      if (e.clientY > 8) return;
      if (e.relatedTarget !== null) return;
      try {
        window.sessionStorage.setItem(SESSION_FLAG, "1");
      } catch { /* ignore */ }
      handleOpen();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("focusin", onFormFocus);
    document.addEventListener("mouseout", onLeave);
    return () => {
      window.clearTimeout(armTimer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("focusin", onFormFocus);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [handleOpen]);

  // Escape to close + focus trap on the dialog
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    // Auto-focus the email field
    window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLInputElement>("input[type=email]")?.focus();
    }, 50);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "sending" || status === "sent") return;
    setErrMsg(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "report", email: email.trim(), notes: "exit-intent modal" }),
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
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 anim-fade-in"
      style={{ background: "rgba(10,10,10,0.45)" }}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-heading"
    >
      <div
        ref={dialogRef}
        className={`relative bg-bg border-[3px] border-line max-w-[520px] w-full p-7 md:p-9 ${animClass}`}
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={() => setAnimClass("")}
        style={{ boxShadow: "10px 10px 0 0 #FF1F6A" }}
      >
        <button
          onClick={close}
          className="absolute top-2 right-2 p-2 hover:bg-fg hover:text-bg transition-colors duration-150"
          aria-label="close"
        >
          <X className="w-5 h-5" strokeWidth={2.5} />
        </button>

        <div className="absolute -top-5 -right-5 rotate-[12deg] pointer-events-none">
          <div className="bg-pink text-bg border-[3px] border-fg px-3 py-1.5 w-[108px] text-center">
            <div className="font-display text-xl leading-none">FREE</div>
            <div className="font-mono text-[8px] tracking-widest mt-1">no drip</div>
          </div>
        </div>

        {status === "sent" ? (
          <SuccessState email={email} />
        ) : (
          <>
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted">
              {status === "idle" ? "the aeo report" : "almost there"}
            </div>
            <h3
              id="exit-intent-heading"
              className="mt-3 font-display text-4xl md:text-5xl leading-[0.92] tracking-tight"
            >
              take the<br />
              24-page report<span className="text-pink">.</span>
            </h3>
            <p className="mt-4 text-sm leading-snug max-w-[420px]">
              The 18 signals we test, the engines we test them on, and the fix patterns
              that moved scores +33 average across three pilots. One email. One PDF. Nothing else.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex items-stretch border-2 border-line"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                disabled={status === "sending"}
                className="flex-1 px-4 py-3 font-mono text-sm bg-bg focus:outline-none placeholder:text-fg-muted/70 disabled:opacity-60"
                aria-label="Your email"
              />
              <button
                type="submit"
                disabled={status === "sending" || !email}
                className="group flex items-center gap-2 px-5 py-3 bg-fg text-bg hover:bg-pink transition-colors duration-200 font-mono text-[11px] font-bold tracking-widest uppercase disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>sending…</>
                ) : (
                  <>send it <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} /></>
                )}
              </button>
            </form>

            {status === "error" && errMsg && (
              <div
                role="alert"
                className="mt-3 border-2 border-pink bg-pink-wash/40 px-3 py-2 font-mono text-[10px] font-bold tracking-widest uppercase text-pink"
              >
                {errMsg} — try again or email aditya@besignalled.com
              </div>
            )}

            <div className="mt-3 font-mono text-[10px] tracking-widest uppercase text-fg-muted">
              one-click unsubscribe · we never email twice
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SuccessState({ email }: { email: string }) {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-pink flex items-center gap-2">
        <Check className="w-4 h-4" strokeWidth={2.5} /> on its way
      </div>
      <h3 className="font-display text-4xl md:text-5xl leading-[0.92] tracking-tight">
        check<br />
        <span className="text-pink">{email.split("@")[0]}</span>’s inbox<span className="text-pink">.</span>
      </h3>
      <p className="text-sm leading-snug max-w-[420px]">
        The 24-page PDF lands at <span className="font-mono font-bold">{email}</span> in
        under two minutes. If it&apos;s not there, check spam (it&apos;s plain text — no images, no tracker).
      </p>
      <p className="font-mono text-[10px] tracking-widest uppercase text-fg-muted">
        one-click unsubscribe in the footer · we never email twice
      </p>
    </div>
  );
}
