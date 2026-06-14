"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { notes, type NoteTag, type Note } from "@/data/notes";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

type Filter = "all" | NoteTag;

const filterDefs: { key: Filter; label: string }[] = [
  { key: "all", label: "all" },
  { key: "essay", label: "essay" },
  { key: "playbook", label: "playbook" },
  { key: "field note", label: "field note" },
];

function HeroStats() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const sites = useCountUp(412, 1000, inView);
  const sigs = useCountUp(18, 700, inView);

  return (
    <div ref={ref} className="col-span-12 md:col-span-5 grid grid-cols-3 border-2 border-line">
      <div className="p-4 md:p-5 border-r-2 border-line">
        <div className="font-display text-3xl md:text-5xl leading-none tracking-tighter">06</div>
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">essays</div>
      </div>
      <div className="p-4 md:p-5 border-r-2 border-line">
        <div className="font-display text-3xl md:text-5xl leading-none tracking-tighter">{sites}</div>
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">sites</div>
      </div>
      <div className="p-4 md:p-5">
        <div className="font-display text-3xl md:text-5xl leading-none tracking-tighter">{sigs}</div>
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">signals</div>
      </div>
    </div>
  );
}

function NoteRow({ note, divider }: { note: Note; divider: boolean }) {
  return (
    <Link
      href={`/notes/${note.slug}`}
      className={`group grid grid-cols-12 items-start gap-4 md:gap-6 px-0 py-8 md:py-10 hover:bg-pink-wash transition-colors duration-200 ${divider ? "border-b-2 border-line" : ""}`}
    >
      <div className="col-span-2 md:col-span-1 flex items-start justify-start">
        <div
          className="font-display text-pink leading-none tracking-tighter transition-transform duration-300 group-hover:-translate-y-1"
          style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
        >
          {note.num}
        </div>
      </div>

      <div className="col-span-10 md:col-span-6">
        <h2 className="font-display text-2xl md:text-4xl leading-[0.92] tracking-tight">
          {note.title}
        </h2>
        <p className="mt-3 text-sm md:text-base leading-snug text-fg-muted max-w-[520px]">
          {note.excerpt}
        </p>
      </div>

      <div className="col-span-6 md:col-span-2 flex flex-col gap-1 pt-1">
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">{note.date}</div>
        <div className="font-mono text-[10px] tracking-widest uppercase text-fg-muted">{note.readTime} read</div>
      </div>

      <div className="col-span-6 md:col-span-3 flex items-start justify-end gap-3 pt-1">
        <span className="font-mono text-[10px] font-bold tracking-widest uppercase border-2 border-line px-2 py-1 text-fg-muted group-hover:border-pink group-hover:text-pink transition-colors duration-200">
          {note.tag}
        </span>
        <ArrowUpRight className="w-5 h-5 text-fg-muted group-hover:text-pink transition-colors duration-200 flex-shrink-0" strokeWidth={2.2} />
      </div>
    </Link>
  );
}

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <section className="border-b-2 border-line bg-pink-wash">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
          <div className="col-span-12 md:col-span-6">
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-4">/ field notes · in your inbox</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[0.92] tracking-tight">
              every other<br />tuesday<span className="text-pink">.</span>
            </h2>
            <p className="mt-6 text-base md:text-lg leading-snug max-w-[440px] text-fg-muted">
              New essays, playbooks, and audit data from the pipeline. No drip sequence. One email per issue. Unsubscribe is one click.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6">
            <form
              onSubmit={handleSubmit}
              className="flex items-stretch border-2 border-line bg-bg max-w-[520px]"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 px-5 py-4 font-mono text-sm bg-bg focus:outline-none placeholder:text-fg-muted/70"
                aria-label="Your email"
              />
              <button
                type="submit"
                className="group flex items-center gap-2 px-6 py-4 bg-fg text-bg hover:bg-pink transition-colors duration-200 font-mono text-[11px] font-bold tracking-widest uppercase whitespace-nowrap"
              >
                {sent ? (
                  <>subscribed <Check className="w-4 h-4 anim-scale-in" strokeWidth={2.5} /></>
                ) : (
                  <>subscribe <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} /></>
                )}
              </button>
            </form>
            <div className="mt-4 font-mono text-[10px] tracking-widest uppercase text-fg-muted">
              every other tuesday · no drip · unsubscribe one-click
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function NotesPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = notes.filter((n) =>
    filter === "all" ? true : n.tag === filter
  );

  return (
    <>
      <section className="relative border-b-2 border-line overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-0 w-3 h-3 bg-pink" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-pink" />

        <div className="relative max-w-8xl mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-12 md:pb-16">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 font-mono text-[11px] font-bold tracking-widest uppercase anim-fade-in">
            <span className="w-2 h-2 bg-pink" />
            <span>notes</span>
            <span className="text-fg-muted">/</span>
            <span>06 essays</span>
            <span className="text-fg-muted">/</span>
            <span>aug–nov &apos;25</span>
          </div>

          <h1
            className="mt-10 md:mt-14 font-display leading-[0.88] tracking-tight anim-fade-in"
            style={{ fontSize: "clamp(56px, 10vw, 144px)", animationDelay: "180ms" }}
          >
            field notes from<br />
            the audit pipeline<span className="text-pink">.</span>
          </h1>

          <div className="mt-12 grid grid-cols-12 gap-6 md:gap-10 anim-fade-in items-end" style={{ animationDelay: "340ms" }}>
            <div className="col-span-12 md:col-span-7">
              <p className="text-base md:text-lg leading-snug max-w-[600px]">
                Essays, playbooks, and field notes from 412 site audits. What we found, what we shipped, and what the data says about how answer engines actually work.
              </p>
            </div>
            <HeroStats />
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg sticky top-[60px] md:top-[68px] z-30">
        <div className="max-w-8xl mx-auto px-6 md:px-10 flex items-center overflow-x-auto no-scrollbar">
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mr-4 md:mr-6 flex-shrink-0">filter</span>
          <div className="flex items-center gap-1 py-3">
            {filterDefs.map((f) => {
              const count = notes.filter((n) =>
                f.key === "all" ? true : n.tag === f.key
              ).length;
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`inline-flex items-center gap-2 px-3 md:px-3.5 py-1.5 md:py-2 border-2 transition-colors duration-150 font-mono text-[10px] font-bold tracking-widest uppercase whitespace-nowrap ${
                    active
                      ? "bg-fg border-fg text-bg"
                      : "border-line text-fg hover:bg-pink-wash"
                  }`}
                >
                  {f.label}
                  <span className={`font-display text-sm md:text-base leading-none tracking-tighter ${active ? "text-pink" : "text-fg-muted"}`}>
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10">
          {visible.length === 0 ? (
            <div className="py-16 font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted">
              no notes in this category yet.
            </div>
          ) : (
            visible.map((note, i) => (
              <NoteRow key={note.slug} note={note} divider={i < visible.length - 1} />
            ))
          )}
        </div>
      </section>

      <NewsletterSignup />

      <section className="bg-fg text-bg border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="col-span-12 md:col-span-7">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60">/ see your score</div>
              <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[0.95] tracking-tight">
                run the 18-signal scan on your site<span className="text-pink">.</span>
              </h2>
              <p className="mt-6 max-w-[440px] text-bg/80 leading-snug">
                Free, 90 seconds, PDF emailed. No call, no account. Same rubric we run on every paid engagement.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <Link
                href="/#hero-audit"
                className="group flex items-center justify-between gap-4 bg-pink text-bg px-6 py-6 hover:bg-bg hover:text-fg transition-colors duration-200 border-2 border-pink hover:border-bg"
              >
                <span className="font-display text-3xl md:text-4xl tracking-tight">scan my site</span>
                <ArrowRight className="w-8 h-8 transition-transform duration-200 group-hover:translate-x-2" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
