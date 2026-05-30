"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { NavLink } from "./NavLink";
import { SlotBadge } from "./SlotBadge";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `transition-colors duration-150 ${isActive ? "text-pink" : "hover:text-pink"}`;

export function Nav() {
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

  return (
    <nav className="sticky top-0 z-40 bg-bg border-b-2 border-line">
      <div className="max-w-8xl mx-auto pl-6 md:pl-10 h-[60px] md:h-[68px] flex items-stretch justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-baseline gap-0.5 flex-shrink-0 hover:text-pink transition-colors duration-150" aria-label="Signal home">
            <span className="font-display text-3xl md:text-4xl tracking-tighter leading-none">signal</span>
            <span className="text-pink font-display text-3xl md:text-4xl leading-none">*</span>
          </Link>
          <div className="hidden md:flex items-center gap-5 lg:gap-7 font-mono text-[11px] font-bold tracking-widest uppercase">
            <NavLink to="/work" className={linkClass}>work</NavLink>
            <NavLink to="/methodology" className={linkClass}>methodology</NavLink>
            <NavLink to="/report" className={linkClass}>report</NavLink>
            <NavLink to="/notes" className={linkClass}>notes</NavLink>
          </div>
          <SlotBadge variant="nav" />
        </div>

        {/* Desktop - integrated audit form */}
        <form onSubmit={submit} className="hidden md:flex items-stretch border-l-2 border-line">
          <div className="flex items-center gap-2 px-4 bg-pink text-bg select-none">
            <span className="w-1.5 h-1.5 bg-bg anim-blink" />
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase">audit</span>
          </div>
          <input
            id="audit-input"
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
            {sent ? (
              <>scanning <Check className="w-3.5 h-3.5" strokeWidth={2.5} /></>
            ) : error ? (
              <>{error.slice(0, 18)} ↺</>
            ) : (
              <>send scorecard <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} /></>
            )}
          </button>
        </form>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-4 pr-6 font-mono text-[10px] font-bold tracking-widest uppercase">
          <NavLink to="/work" className={linkClass}>work</NavLink>
          <NavLink to="/methodology" className={linkClass}>method</NavLink>
          <NavLink to="/notes" className={linkClass}>notes</NavLink>
        </div>
      </div>
    </nav>
  );
}
