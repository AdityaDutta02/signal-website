"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

type Variant = "nav" | "hero" | "scan";

export function AuditForm({ variant, autoFocusId }: { variant: Variant; autoFocusId?: string }) {
  const [url, setUrl] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || sent) return;
    setError(null);
    setSent(true);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: url.trim() }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "scan failed" }));
        throw new Error(err.error ?? "scan failed");
      }
      const { leadid } = (await res.json()) as { leadid: string };
      router.push(`/audit/${leadid}?domain=${encodeURIComponent(url.trim())}`);
      setUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "scan failed");
      setSent(false);
    }
  };

  if (variant === "nav") {
    return (
      <form onSubmit={submit} className="hidden md:flex items-stretch border-l-2 border-line">
        <div className="flex items-center gap-2 px-4 bg-pink text-bg select-none">
          <span className="w-1.5 h-1.5 bg-bg anim-blink" />
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase">audit</span>
        </div>
        <input
          id={autoFocusId ?? "audit-input"}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="your-site.com"
          className="px-4 w-[220px] lg:w-[280px] font-mono text-xs bg-bg focus:outline-none placeholder:text-fg-muted/70"
          aria-label="Your site URL"
        />
        <button
          type="submit"
          className="group flex items-center gap-2 px-5 border-l-2 border-line bg-bg hover:bg-fg hover:text-bg transition-colors duration-150 font-mono text-[10px] font-bold tracking-widest uppercase whitespace-nowrap"
        >
          {sent ? <>scanning <Check className="w-3.5 h-3.5" strokeWidth={2.5} /></>
            : error ? <>{error.slice(0, 18)} ↺</>
            : <>send scorecard <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} /></>}
        </button>
      </form>
    );
  }

  // hero + scan: full-width input with bold submit
  const sizeRow = variant === "hero" ? "h-[64px] md:h-[72px]" : "h-[60px] md:h-[68px]";
  const placeholderText = variant === "hero" ? "your-site.com" : "yourcompany.com";

  return (
    <form onSubmit={submit} className={`flex items-stretch border-2 border-line bg-bg max-w-[640px] ${sizeRow}`}>
      <span className="hidden sm:flex items-center px-4 font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted border-r-2 border-line bg-pink-wash">
        https://
      </span>
      <input
        id={autoFocusId}
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder={placeholderText}
        className="flex-1 min-w-0 px-4 md:px-5 font-mono text-sm md:text-base bg-bg focus:outline-none placeholder:text-fg-muted/70"
        aria-label="Your site URL"
      />
      <button
        type="submit"
        className="group flex items-center gap-2 px-5 md:px-7 bg-pink text-bg hover:bg-fg transition-colors duration-150 font-mono text-[11px] md:text-[12px] font-bold tracking-widest uppercase whitespace-nowrap"
      >
        {sent ? <>scanning <Check className="w-4 h-4" strokeWidth={2.5} /></>
          : error ? <>{error.slice(0, 18)} ↺</>
          : <>scan <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} /></>}
      </button>
    </form>
  );
}
