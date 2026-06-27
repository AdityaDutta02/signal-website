"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, ArrowRight, Check } from "@/components/icons";
import { CAL_URL, BOOK_LABEL_ARROW } from "@/lib/links";

const OPEN_EVENT = "signal:open-report-modal";
/** Persisted across sessions. Once an email is captured, the modal never re-opens on that browser. */
const CAPTURED_KEY = "signal_pdf_email_captured";
/** Per-session flag so a session that has already opened+closed without submitting waits for the next session. */
const SESSION_FLAG = "signal:exit-intent-shown";

export function openExitIntentModal(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

type Status = "idle" | "sending" | "sent" | "error";

/**
 * v5 modal — "Learn why your business is not ranking on ChatGPT."
 *
 * Triggers:
 *   - Desktop: cursor leaves viewport from the top edge (exit-intent).
 *   - Mobile (no exit-intent semantic): 30s after first paint, once per session.
 *   - Once an email is captured on this browser, never opens again
 *     (localStorage flag `signal_pdf_email_captured`).
 *
 * The PDF stub is fine — the lead is captured via /api/leads regardless.
 */
export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [animClass, setAnimClass] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => {
      if (status === "sent") {
        setEmail("");
        setStatus("idle");
        setErrMsg(null);
      }
    }, 250);
  }, [status]);

  const handleOpen = useCallback(() => {
    // Hard gate: if an email was already captured on this browser, refuse to open.
    try {
      if (window.localStorage.getItem(CAPTURED_KEY) === "1") return;
    } catch {
      // localStorage may throw in private/embed contexts — fall through.
    }
    setOpen(true);
    setAnimClass("anim-scale-in");
  }, []);

  // Programmatic open
  useEffect(() => {
    const onOpen = () => handleOpen();
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [handleOpen]);

  // Triggers (desktop exit-intent + mobile 30s timer)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let captured = false;
    let shownThisSession = false;
    try {
      captured = window.localStorage.getItem(CAPTURED_KEY) === "1";
      shownThisSession = window.sessionStorage.getItem(SESSION_FLAG) === "1";
    } catch { /* ignore */ }
    if (captured || shownThisSession) return;

    const markShown = () => {
      try { window.sessionStorage.setItem(SESSION_FLAG, "1"); } catch { /* ignore */ }
    };

    // Mobile or coarse pointer → 30s timer (no top-edge exit signal).
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    if (coarse) {
      const mobileTimer = window.setTimeout(() => {
        markShown();
        handleOpen();
      }, 30_000);
      return () => window.clearTimeout(mobileTimer);
    }

    // Desktop exit-intent: cursor leaves through the top edge.
    // Allow firing more eagerly than v4 — every fresh session per the v5 rule.
    const onLeave = (e: MouseEvent) => {
      if (e.clientY > 8) return;
      if (e.relatedTarget !== null) return;
      markShown();
      handleOpen();
      document.removeEventListener("mouseout", onLeave);
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, [handleOpen]);

  // ESC + focus
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
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
        body: JSON.stringify({ source: "report", email: email.trim(), notes: "exit-intent modal v5" }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({ error: "send failed" }));
        throw new Error(j.error ?? "send failed");
      }
      setStatus("sent");
      try { window.localStorage.setItem(CAPTURED_KEY, "1"); } catch { /* ignore */ }
    } catch (err) {
      setStatus("error");
      setErrMsg(err instanceof Error ? err.message : "send failed");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 anim-fade-in"
      style={{ background: "rgba(10,10,10,0.55)" }}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-heading"
    >
      <div
        ref={dialogRef}
        className={`relative bg-bg border-[3px] border-line max-w-[560px] w-full p-7 md:p-10 ${animClass}`}
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={() => setAnimClass("")}
        style={{ boxShadow: "12px 12px 0 0 #FF1F6A" }}
      >
        <button
          onClick={close}
          className="absolute top-2 right-2 z-20 p-2 bg-bg border-2 border-line hover:bg-fg hover:text-bg transition-colors duration-150"
          aria-label="close"
        >
          <X className="w-5 h-5" strokeWidth={2.5} />
        </button>

        {status === "sent" ? (
          <SuccessState email={email} />
        ) : (
          <>
            <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted">
              / before you go
            </div>
            <h3
              id="exit-intent-heading"
              className="mt-3 font-display text-3xl md:text-5xl leading-[0.92] tracking-tighter"
            >
              Learn why your business is not ranking on ChatGPT.
            </h3>
            <p className="mt-4 text-sm md:text-[15px] leading-snug max-w-[460px]">
              A short read on how the engines decide who to recommend, and what most B2B sites are
              missing. Free, by email.
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
                className="group flex items-center gap-2 px-5 py-3 bg-fg text-bg hover:bg-pink transition-colors duration-200 font-mono text-[11px] font-bold tracking-[0.22em] uppercase disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? <>sending…</> : (
                  <>send me the read <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} /></>
                )}
              </button>
            </form>

            {status === "error" && errMsg && (
              <div
                role="alert"
                className="mt-3 border-2 border-pink bg-pink-wash/40 px-3 py-2 font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-pink"
              >
                {errMsg}. try again or email aditya@besignalled.com
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SuccessState({ email }: { email: string }) {
  const local = email.split("@")[0] || "you";
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-pink flex items-center gap-2">
        <Check className="w-4 h-4" strokeWidth={2.5} /> sent
      </div>
      <h3 className="font-display text-3xl md:text-5xl leading-[0.92] tracking-tighter">
        Check <span className="text-pink">{local}</span>&rsquo;s inbox.
      </h3>
      <p className="text-sm md:text-[15px] leading-snug max-w-[440px]">
        The read lands at <span className="font-mono font-bold">{email}</span> shortly. If
        it&apos;s not there in a few minutes, check spam.
      </p>
      <a
        href={CAL_URL}
        target="_blank"
        rel="noopener"
        className="mt-2 inline-flex items-center gap-2 border-b-2 border-fg pb-0.5 font-mono text-[11px] font-bold tracking-[0.22em] uppercase hover:text-pink hover:border-pink transition-colors"
      >
        {BOOK_LABEL_ARROW}
      </a>
    </div>
  );
}
