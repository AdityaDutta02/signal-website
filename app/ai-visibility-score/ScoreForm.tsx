"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "@/components/icons";

/**
 * Scan form for /ai-visibility-score. URL only. Email is collected later
 * on /audit/[leadid] to gate the per-engine breakdown PDF.
 *
 * POSTs to /api/audit. On success the API returns `{ leadid, domain }` and
 * we navigate to /audit/[leadid] which renders the composite score and the
 * email-gated unlock for the full report.
 */
export function ScoreForm() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url || status === "sending") return;
    setStatus("sending");
    setErrMsg(null);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: url.trim() }),
      });
      const j = (await res.json().catch(() => ({}))) as { leadid?: string; error?: string };
      if (!res.ok || !j.leadid) {
        throw new Error(j.error || "scan failed");
      }
      router.push(`/audit/${j.leadid}`);
    } catch (err) {
      setStatus("error");
      setErrMsg(err instanceof Error ? err.message : "scan failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-2 border-fg flex items-stretch">
      <input
        type="url"
        required
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://yoursite.com"
        disabled={status === "sending"}
        className="flex-1 min-w-0 px-4 md:px-5 py-4 md:py-5 font-mono text-sm md:text-base bg-bg focus:outline-none placeholder:text-fg-muted/70 disabled:opacity-60"
        aria-label="your site URL"
      />
      <button
        type="submit"
        disabled={status === "sending" || !url}
        className="group inline-flex items-center gap-2 bg-fg text-bg px-5 md:px-7 hover:bg-pink transition-colors font-mono text-[11px] md:text-[12px] font-bold tracking-[0.22em] uppercase disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "scanning…" : (
          <>
            run the scan
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </>
        )}
      </button>
      {errMsg && (
        <div role="alert" className="absolute -bottom-8 left-0 font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-pink">
          {errMsg}. try again or email aditya@besignalled.com
        </div>
      )}
    </form>
  );
}
