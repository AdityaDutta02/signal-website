"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "@/components/icons";

export function PersistentAuditStrip() {
  const [url, setUrl] = useState("");
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || sent) return;
    setSent(true);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: url.trim() }),
      });
      if (!res.ok) throw new Error("scan failed");
      const { leadid } = (await res.json()) as { leadid: string };
      router.push(`/audit/${leadid}?domain=${encodeURIComponent(url.trim())}`);
      setUrl("");
    } catch {
      setSent(false);
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t-2 border-line bg-bg shadow-[0_-8px_20px_-12px_rgba(0,0,0,0.15)]">
      <form onSubmit={handleSubmit} className="flex items-stretch">
        <div className="flex items-center gap-2 px-3 bg-pink text-bg select-none">
          <span className="w-1.5 h-1.5 bg-bg anim-blink" />
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase">scan</span>
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="yourcompany.com"
          className="flex-1 px-3 py-3.5 font-mono text-sm bg-bg focus:outline-none placeholder:text-fg-muted/70"
          aria-label="Your site URL"
        />
        <button
          type="submit"
          className="px-4 bg-fg text-bg font-mono text-[11px] font-bold tracking-widest uppercase"
        >
          {sent ? <Check className="w-4 h-4" strokeWidth={2.5} /> : "go"}
        </button>
      </form>
    </div>
  );
}
