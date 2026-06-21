"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, Linkedin, Github, Check } from "@/components/icons";

const CONTACT_CARDS = [
  { n: "01", title: "ask a question", description: "Not sure if your stack is in scope? Have a question about the rubric? Send us a note - we reply within one business day.", cta: "aditya@besignalled.com", href: "mailto:aditya@besignalled.com", external: true },
  { n: "02", title: "book a fit check", description: "15 minutes. Not a sales call. Confirm your stack is supported and your problem is in scope before you commit.", cta: "pick a slot →", href: "/fit-check", external: false },
  { n: "03", title: "scan your site", description: "Paste your URL and get a per-prospect scorecard in 90 seconds. Scored on the same 18-signal rubric we use for paid engagements.", cta: "start the audit →", href: "/", external: false },
];

const OPERATORS = [
  { name: "aakif", role: "seo + content", links: [
    { label: "linkedin", href: "https://linkedin.com/company/signalled", icon: Linkedin, external: true },
    { label: "email", href: "mailto:aakif@besignalled.com", icon: Mail },
  ]},
  { name: "aditya", role: "ai + tech", links: [
    { label: "linkedin", href: "https://linkedin.com/company/signalled", icon: Linkedin, external: true },
    { label: "github", href: "https://github.com/signalled", icon: Github, external: true },
    { label: "email", href: "mailto:aditya@besignalled.com", icon: Mail },
  ]},
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [sending, setSending] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message || sending) return;
    setErrMsg(null);
    setSending(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact",
          email: email.trim(),
          domain: url.trim() || undefined,
          notes: `name: ${name.trim()}\nmessage: ${message.trim()}`,
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
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ contact</div>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tighter">
                how to<br />
                <span className="text-pink">reach us</span>.
              </h1>
              <p className="mt-8 text-base md:text-lg leading-snug max-w-[560px]">
                We don&apos;t have a phone number. Async over email or shared doc, always. We reply within one business day.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:justify-self-end">
              <div className="border-2 border-line p-4 bg-bg">
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-3">/ response sla</div>
                <div className="font-display text-4xl tracking-tighter leading-none">1 BD</div>
                <div className="mt-2 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
                  one business day · async · always
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-10">/ ways to reach us</div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-line">
            {CONTACT_CARDS.map((card, i) => (
              <div
                key={card.n}
                className={`p-6 md:p-8 flex flex-col ${i < 2 ? "border-b-2 md:border-b-0 md:border-r-2 border-line" : ""}`}
              >
                <div className="font-display text-3xl text-pink tracking-tighter leading-none mb-4">{card.n}</div>
                <div className="font-display text-2xl tracking-tighter leading-tight mb-3">{card.title}</div>
                <p className="text-sm leading-snug text-fg-muted flex-1 mb-6">{card.description}</p>
                {card.external ? (
                  <a
                    href={card.href}
                    className="group inline-flex items-center gap-2 border-2 border-line px-4 py-3 hover:border-pink hover:text-pink transition-colors font-mono text-[10px] font-bold tracking-widest uppercase self-start"
                  >
                    <Mail className="w-3.5 h-3.5" strokeWidth={2.5} />
                    {card.cta}
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
                  </a>
                ) : (
                  <Link
                    href={card.href}
                    className="group inline-flex items-center gap-2 border-2 border-line px-4 py-3 hover:border-pink hover:text-pink transition-colors font-mono text-[10px] font-bold tracking-widest uppercase self-start"
                  >
                    {card.cta}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-8 md:gap-14">
            <div className="col-span-12 md:col-span-4">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ send a note</div>
              <h2 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tighter">
                write to<br />
                <span className="text-pink">us directly</span>.
              </h2>
              <p className="mt-6 text-sm leading-snug max-w-[360px]">
                We read every message. If your question is about a specific URL, include it - we&apos;ll run a quick scan before we reply.
              </p>
              <div className="mt-8 space-y-2">
                {["reply within one business day", "no auto-responder", "aakif or aditya replies personally"].map((l) => (
                  <div key={l} className="flex items-baseline gap-2 text-sm">
                    <span className="text-pink font-mono text-[9px] font-bold leading-none">▸</span>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-12 md:col-span-8">
              {submitted ? (
                <div className="border-2 border-line bg-pink-wash/40 p-8 flex items-start gap-5">
                  <Check className="w-6 h-6 text-pink flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  <div>
                    <div className="font-display text-2xl tracking-tighter">sent - we reply within one business day.</div>
                    <div className="mt-2 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
                      aakif or aditya will reply personally · no auto-responder
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="border-2 border-line">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="border-b-2 md:border-b-0 md:border-r-2 border-line">
                      <label className="block px-5 pt-4 font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="your name"
                        className="w-full px-5 pb-4 pt-1 font-mono text-sm bg-bg focus:outline-none placeholder:text-fg-muted/50 border-b-2 border-line"
                      />
                    </div>
                    <div>
                      <label className="block px-5 pt-4 font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-5 pb-4 pt-1 font-mono text-sm bg-bg focus:outline-none placeholder:text-fg-muted/50 border-b-2 border-line"
                      />
                    </div>
                  </div>
                  <div className="border-b-2 border-line">
                    <label className="block px-5 pt-4 font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">url (optional)</label>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://yoursite.com"
                      className="w-full px-5 pb-4 pt-1 font-mono text-sm bg-bg focus:outline-none placeholder:text-fg-muted/50 border-b-2 border-line"
                    />
                  </div>
                  <div className="border-b-2 border-line">
                    <label className="block px-5 pt-4 font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">message *</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="what's on your mind?"
                      rows={5}
                      className="w-full px-5 pb-4 pt-1 font-mono text-sm bg-bg focus:outline-none placeholder:text-fg-muted/50 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="group w-full flex items-center justify-between px-5 py-4 bg-fg text-bg hover:bg-pink transition-colors font-mono text-[11px] font-bold tracking-widest uppercase disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>{sending ? "sending…" : "send message"}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                  </button>
                  {errMsg && (
                    <div className="px-5 py-3 border-t-2 border-pink bg-pink-wash/40 font-mono text-[10px] font-bold tracking-widest uppercase text-pink">{errMsg}</div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-fg text-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60 mb-8">/ reach us directly</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OPERATORS.map((op) => (
              <div key={op.name} className="border-2 border-bg/20 p-5 flex items-start justify-between gap-4">
                <div>
                  <div className="font-display text-2xl tracking-tighter leading-none">{op.name}</div>
                  <div className="mt-1 font-mono text-[10px] font-bold tracking-widest uppercase text-bg/60">{op.role}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {op.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      className="inline-flex items-center gap-1.5 border-2 border-bg/30 px-3 py-1.5 hover:border-pink hover:text-pink transition-colors font-mono text-[10px] font-bold tracking-widest uppercase"
                    >
                      <l.icon className="w-3 h-3" strokeWidth={2.5} />
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-8 md:py-10 flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
            we don&apos;t have a phone number · async over email or shared doc, always
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/fit-check" className="inline-flex items-center gap-2 border-2 border-line px-4 py-2 hover:border-pink hover:text-pink transition-colors font-mono text-[10px] font-bold tracking-widest uppercase">
              fit check · 15 min →
            </Link>
            <Link href="/faq" className="inline-flex items-center gap-2 border-2 border-line px-4 py-2 hover:border-pink hover:text-pink transition-colors font-mono text-[10px] font-bold tracking-widest uppercase">
              faq →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
