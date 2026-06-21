"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, ArrowRight, Check } from "@/components/icons";

const OPEN_EVENT = "signal:open-audit-modal";

// Programmatic open. Dispatch a CustomEvent that the mounted modal listens for.
export function openAuditModal(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

type Status = "idle" | "sending" | "error";

export function AuditModal() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const close = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => {
      setErrMsg(null);
      setStatus("idle");
    }, 250);
  }, []);

  // Listen for the global open event
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  // Escape closes + auto-focus the URL input
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLInputElement>("input")?.focus();
    }, 50);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || status === "sending") return;
    setErrMsg(null);
    setStatus("sending");
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
      setStatus("error");
      setErrMsg(err instanceof Error ? err.message : "scan failed");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8 anim-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-modal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 bg-fg/55 cursor-default"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-[640px] bg-bg border-2 border-line shadow-[8px_8px_0_0_var(--pink)] anim-scale-in"
      >
        <div className="flex items-center justify-between border-b-2 border-line px-5 md:px-7 py-3">
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-pink anim-blink" />
            <span>scan</span>
            <span className="text-fg-muted">·</span>
            <span className="text-fg-muted">18 signals · 90 seconds</span>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="w-7 h-7 grid place-items-center border-2 border-line hover:bg-pink-wash transition-colors"
          >
            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-5 md:px-8 pt-6 md:pt-8 pb-6 md:pb-8">
          <h2
            id="audit-modal-title"
            className="font-display leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
          >
            Scan your site<span className="text-pink">.</span>
          </h2>
          <p className="mt-3 text-sm md:text-base leading-snug text-fg-muted max-w-[480px]">
            We run the 18-signal AEO scorecard against your live URL. Report appears on screen and arrives by email.
          </p>

          <form onSubmit={submit} className="mt-6 flex items-stretch border-2 border-line bg-bg">
            <span className="hidden sm:flex items-center px-4 font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted border-r-2 border-line bg-pink-wash">
              https://
            </span>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="yourcompany.com"
              className="flex-1 min-w-0 px-4 md:px-5 py-4 font-mono text-sm md:text-base bg-bg focus:outline-none placeholder:text-fg-muted/70"
              aria-label="Your site URL"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="group flex items-center gap-2 px-5 md:px-7 bg-pink text-bg hover:bg-fg disabled:opacity-60 transition-colors duration-150 font-mono text-[11px] md:text-[12px] font-bold tracking-widest uppercase whitespace-nowrap"
            >
              {status === "sending" ? (
                <>scanning <Check className="w-4 h-4" strokeWidth={2.5} /></>
              ) : (
                <>scan <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} /></>
              )}
            </button>
          </form>

          {errMsg && (
            <div className="mt-3 font-mono text-[11px] font-bold tracking-widest uppercase text-pink">
              {errMsg}
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] tracking-widest uppercase text-fg-muted">
            <span>no account</span>
            <span className="text-fg-muted/40">·</span>
            <span>pdf to your inbox</span>
            <span className="text-fg-muted/40">·</span>
            <span>chatgpt · perplexity · gemini · claude</span>
          </div>
        </div>
      </div>
    </div>
  );
}
