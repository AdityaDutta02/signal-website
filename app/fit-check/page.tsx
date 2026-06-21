"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Linkedin, Mail, Github, Check } from "@/components/icons";

type Slot = { day: string; time: string; available: boolean };

const WEEK_SLOTS: { day: string; short: string; slots: Slot[] }[] = [
  { day: "monday", short: "mon", slots: [
    { day: "monday", time: "09:00", available: false },
    { day: "monday", time: "10:00", available: true },
    { day: "monday", time: "14:00", available: true },
    { day: "monday", time: "15:00", available: false },
  ]},
  { day: "tuesday", short: "tue", slots: [
    { day: "tuesday", time: "09:00", available: false },
    { day: "tuesday", time: "11:00", available: true },
    { day: "tuesday", time: "14:00", available: false },
    { day: "tuesday", time: "16:00", available: true },
  ]},
  { day: "wednesday", short: "wed", slots: [
    { day: "wednesday", time: "09:00", available: true },
    { day: "wednesday", time: "10:00", available: false },
    { day: "wednesday", time: "13:00", available: true },
    { day: "wednesday", time: "15:00", available: false },
  ]},
  { day: "thursday", short: "thu", slots: [
    { day: "thursday", time: "10:00", available: false },
    { day: "thursday", time: "11:00", available: true },
    { day: "thursday", time: "14:00", available: true },
    { day: "thursday", time: "16:00", available: false },
  ]},
  { day: "friday", short: "fri", slots: [
    { day: "friday", time: "09:00", available: true },
    { day: "friday", time: "10:00", available: false },
    { day: "friday", time: "11:00", available: true },
    { day: "friday", time: "14:00", available: false },
  ]},
  { day: "saturday", short: "sat", slots: [
    { day: "saturday", time: "10:00", available: false },
    { day: "saturday", time: "11:00", available: false },
    { day: "saturday", time: "12:00", available: false },
    { day: "saturday", time: "13:00", available: false },
  ]},
  { day: "sunday", short: "sun", slots: [
    { day: "sunday", time: "10:00", available: false },
    { day: "sunday", time: "11:00", available: false },
    { day: "sunday", time: "12:00", available: false },
    { day: "sunday", time: "13:00", available: false },
  ]},
];

const OPERATORS = [
  {
    initials: "ak", name: "aakif", role: "seo + content", yearsLine: "11 years · technical seo · b2b content",
    bio: "Aakif runs the audit half. He'll confirm whether your content problem is in scope and whether the 18-signal rubric applies to your stack.",
    links: [
      { label: "linkedin", href: "https://linkedin.com/company/signalled", icon: Linkedin, external: true },
      { label: "email", href: "mailto:aakif@besignalled.com", icon: Mail },
    ],
    swatch: "pink" as const,
  },
  {
    initials: "ad", name: "aditya", role: "ai + tech", yearsLine: "9 years · ml infra · full-stack",
    bio: "Aditya runs the build half. He'll confirm whether your stack is supported and whether the fixes we'd ship are technically feasible.",
    links: [
      { label: "linkedin", href: "https://linkedin.com/company/signalled", icon: Linkedin, external: true },
      { label: "github", href: "https://github.com/signalled", icon: Github, external: true },
      { label: "email", href: "mailto:aditya@besignalled.com", icon: Mail },
    ],
    swatch: "fg" as const,
  },
];

export default function FitCheckPage() {
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !selectedSlot || sending) return;
    setErrMsg(null);
    setSending(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "fit-check",
          email: email.trim(),
          domain: url.trim() || undefined,
          notes: `name: ${name.trim()}\nslot: ${selectedSlot.day} ${selectedSlot.time}\nmessage: ${message.trim()}`,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({ error: "send failed" }));
        throw new Error(j.error ?? "send failed");
      }
      setSubmitted(true);
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : "send failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="border-b-2 border-line bg-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-8xl mx-auto px-6 md:px-10 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ fit check</div>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tighter">
                15 minutes.<br />
                <span className="text-pink">not a sales call.</span>
              </h1>
              <p className="mt-8 text-base md:text-lg leading-snug max-w-[600px]">
                Before you wire $2,490, you may want to confirm your stack is supported and your problem is in scope. That&apos;s what this call is for. No follow-up sequence. No slide deck. No discovery deck.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:justify-self-end">
              <div className="border-2 border-line p-4 bg-bg">
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-3">/ call format</div>
                <div className="space-y-2">
                  {["15 min · google meet or phone", "aakif or aditya on the line", "written scope summary by eod", "no follow-up sequence"].map((l) => (
                    <div key={l} className="flex items-baseline gap-2 font-mono text-[10px] font-bold tracking-widest uppercase">
                      <span className="text-pink">▸</span>
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-8 md:gap-14">
            <div className="col-span-12 md:col-span-4">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ what this call is</div>
              <ul className="space-y-3 mb-10">
                {["confirm your stack is in scope", "confirm your problem is something we've shipped before", "answer any questions about the 6-day model", "give you a written in-scope / out-of-scope by EOD"].map((l) => (
                  <li key={l} className="flex items-baseline gap-2 text-sm border-b border-line/60 pb-3 last:border-b-0">
                    <span className="text-pink font-mono text-[9px] font-bold leading-none">▸</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>

              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ what it isn&apos;t</div>
              <ul className="space-y-3">
                {["not a discovery deck or proposal", "no follow-up email sequence", "no slide deck shown", "no pressure to commit on the call"].map((l) => (
                  <li key={l} className="flex items-baseline gap-2 text-sm border-b border-line/60 pb-3 last:border-b-0">
                    <span className="text-fg-muted font-mono text-[11px] font-bold leading-none">×</span>
                    <span className="text-fg-muted">{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-12 md:col-span-8">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ pick a slot · week of jan 13</div>

              <div className="border-2 border-line overflow-x-auto">
                <div className="grid grid-cols-7 border-b-2 border-line min-w-[560px]">
                  {WEEK_SLOTS.map((col, i) => (
                    <div key={col.day} className={`px-2 py-2 text-center ${i < 6 ? "border-r-2 border-line" : ""}`}>
                      <div className="font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">{col.short}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 min-w-[560px]">
                  {WEEK_SLOTS.map((col, ci) => (
                    <div key={col.day} className={`${ci < 6 ? "border-r-2 border-line" : ""}`}>
                      {col.slots.map((slot) => (
                        <div
                          key={slot.time}
                          onClick={() => slot.available && setSelectedSlot({ day: slot.day, time: slot.time })}
                          className={`border-b border-line/40 last:border-b-0 px-1.5 py-2 text-center font-mono text-[9px] font-bold tracking-widest uppercase transition-colors
                            ${!slot.available
                              ? "text-fg-muted/40 line-through cursor-not-allowed"
                              : selectedSlot?.day === slot.day && selectedSlot?.time === slot.time
                                ? "bg-pink text-bg cursor-pointer"
                                : "hover:bg-pink hover:text-bg cursor-pointer"
                            }`}
                        >
                          {slot.time}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {selectedSlot && (
                <div className="mt-4 border-2 border-pink bg-pink-wash/40 px-4 py-3 flex items-center gap-3">
                  <Check className="w-4 h-4 text-pink flex-shrink-0" strokeWidth={2.5} />
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
                    {selectedSlot.day} {selectedSlot.time} · 15 min · aakif
                  </span>
                </div>
              )}

              <div className="mt-8">
                <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-5">/ your details</div>
                {submitted ? (
                  <div className="border-2 border-line bg-pink-wash/40 p-6 flex items-center gap-4">
                    <Check className="w-5 h-5 text-pink flex-shrink-0" strokeWidth={2.5} />
                    <div>
                      <div className="font-display text-xl tracking-tighter">sent - calendar invite in your inbox.</div>
                      <div className="mt-1 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
                        written scope summary by eod · no follow-up sequence
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-0 border-2 border-line">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="border-b-2 md:border-b-0 md:border-r-2 border-line">
                        <label className="block px-4 pt-3 font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">name *</label>
                        <input
                          type="text" required value={name} onChange={(e) => setName(e.target.value)}
                          placeholder="your name"
                          className="w-full px-4 pb-3 pt-1 font-mono text-sm bg-bg focus:outline-none placeholder:text-fg-muted/50 border-b-2 border-line"
                        />
                      </div>
                      <div>
                        <label className="block px-4 pt-3 font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">email *</label>
                        <input
                          type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full px-4 pb-3 pt-1 font-mono text-sm bg-bg focus:outline-none placeholder:text-fg-muted/50 border-b-2 border-line"
                        />
                      </div>
                    </div>
                    <div className="border-b-2 border-line">
                      <label className="block px-4 pt-3 font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">url (optional)</label>
                      <input
                        type="url" value={url} onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://yoursite.com"
                        className="w-full px-4 pb-3 pt-1 font-mono text-sm bg-bg focus:outline-none placeholder:text-fg-muted/50 border-b-2 border-line"
                      />
                    </div>
                    <div className="border-b-2 border-line">
                      <label className="block px-4 pt-3 font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">what would you like to confirm?</label>
                      <textarea
                        value={message} onChange={(e) => setMessage(e.target.value)}
                        placeholder="e.g. we're on Webflow, not sure if our stack is supported..."
                        rows={3}
                        className="w-full px-4 pb-3 pt-1 font-mono text-sm bg-bg focus:outline-none placeholder:text-fg-muted/50 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!selectedSlot || sending}
                      className="w-full flex items-center justify-between px-5 py-4 bg-fg text-bg hover:bg-pink transition-colors font-mono text-[11px] font-bold tracking-widest uppercase disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span>{sending ? "booking…" : selectedSlot ? `book ${selectedSlot.day} ${selectedSlot.time}` : "select a slot above first"}</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                    {errMsg && (
                      <div className="px-5 py-3 border-t-2 border-pink bg-pink-wash/40 font-mono text-[10px] font-bold tracking-widest uppercase text-pink">{errMsg}</div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ who you&apos;ll talk to</div>
          <h2 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tighter mb-10">
            the call rotates between<br />
            <span className="text-pink">aakif and aditya</span>.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OPERATORS.map((op) => {
              const swatchClass = op.swatch === "pink" ? "bg-pink text-bg" : "bg-fg text-bg";
              return (
                <div key={op.name} className="border-2 border-line">
                  <div className={`${swatchClass} px-6 py-5 flex items-end justify-between relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
                    <div className="relative">
                      <div className="font-display text-[80px] leading-[0.78] tracking-tighter">{op.initials}</div>
                      <div className="mt-2 font-display text-2xl tracking-tighter leading-none">{op.name}</div>
                    </div>
                    <div className="relative text-right">
                      <div className="font-mono text-[10px] font-bold tracking-widest uppercase opacity-80">{op.role}</div>
                      <div className="mt-1 font-mono text-[9px] tracking-widest uppercase opacity-60">{op.yearsLine}</div>
                    </div>
                  </div>
                  <div className="px-6 py-5">
                    <p className="text-sm leading-snug">{op.bio}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {op.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          className="inline-flex items-center gap-1.5 border-2 border-line px-3 py-1.5 hover:border-pink hover:text-pink transition-colors font-mono text-[10px] font-bold tracking-widest uppercase"
                        >
                          <l.icon className="w-3 h-3" strokeWidth={2.5} />
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-fg text-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60 mb-6">/ what you&apos;ll walk away with</div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-bg/20">
            {[
              { n: "01", t: "written scope summary", b: "A written 'in scope / out of scope' sent by EOD on the day of the call. No ambiguity about whether we can help." },
              { n: "02", t: "no follow-up sequence", b: "We don't add you to a drip. We don't send a follow-up deck. If you want to move forward, you'll know how. If you don't, that's fine." },
              { n: "03", t: "audit queue priority", b: "If you want your URL added to the free audit queue, we'll do it on the call. You'll have a scorecard in 90 seconds." },
            ].map((c, i) => (
              <div key={c.n} className={`p-6 md:p-8 ${i < 2 ? "border-b-2 md:border-b-0 md:border-r-2 border-bg/20" : ""}`}>
                <div className="font-display text-3xl text-pink tracking-tighter leading-none mb-4">{c.n}</div>
                <div className="font-display text-xl tracking-tighter leading-tight mb-3">{c.t}</div>
                <p className="text-sm leading-snug text-bg/70">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-12 md:py-16 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-2">/ rather start with the audit?</div>
            <p className="text-sm leading-snug max-w-[440px]">
              Paste your URL on the home page. You&apos;ll have a per-prospect scorecard in 90 seconds, scored on the same 18-signal rubric.
            </p>
          </div>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 border-2 border-line px-5 py-3 hover:border-pink hover:text-pink transition-colors font-mono text-[11px] font-bold tracking-widest uppercase"
          >
            scan your site →
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </>
  );
}
