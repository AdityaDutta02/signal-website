"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "@/components/icons";
import { notes, getNote } from "@/data/notes";
import { signals } from "@/data/signals";

function RelatedSignalsCard({ related }: { related: string[] }) {
  const relatedSignals = signals.filter((s) =>
    related.includes(String(s.num).padStart(2, "0"))
  );

  if (relatedSignals.length === 0) return null;

  return (
    <div className="border-2 border-line bg-bg">
      <div className="px-5 py-4 border-b-2 border-line">
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
          / related signals
        </div>
      </div>
      {relatedSignals.map((s, i) => (
        <div
          key={s.id}
          className={`px-5 py-4 ${i < relatedSignals.length - 1 ? "border-b-2 border-line" : ""}`}
        >
          <div className="flex items-baseline gap-3">
            <span className="font-display text-2xl text-pink tracking-tighter leading-none">
              {String(s.num).padStart(2, "0")}
            </span>
            <span className="font-display text-lg tracking-tight leading-tight">{s.title}</span>
          </div>
          <div className="mt-2 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
            / block {s.block}
          </div>
          <p className="mt-2 text-sm leading-snug text-fg-muted">{s.solution}</p>
        </div>
      ))}
    </div>
  );
}

export default function NotesDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug || "";
  const note = getNote(slug);

  if (!note) {
    return (
      <section className="border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ note not found</div>
          <div className="font-display text-5xl md:text-7xl tracking-tight leading-[0.9]">
            no note here<span className="text-pink">.</span>
          </div>
          <Link
            href="/notes"
            className="mt-10 inline-flex items-center gap-3 font-mono text-[11px] font-bold tracking-widest uppercase border-2 border-line px-5 py-3 hover:bg-pink-wash transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            back to notes
          </Link>
        </div>
      </section>
    );
  }

  const currentIndex = notes.findIndex((n) => n.slug === note.slug);
  const nextNote = currentIndex < notes.length - 1 ? notes[currentIndex + 1] : null;

  return (
    <>
      <section className="relative border-b-2 border-line overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-0 w-3 h-3 bg-pink" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-pink" />

        <div className="relative max-w-8xl mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-12 md:pb-16">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 font-mono text-[11px] font-bold tracking-widest uppercase anim-fade-in">
            <span className="w-2 h-2 bg-pink" />
            <Link href="/notes" className="hover:text-pink transition-colors duration-150">notes</Link>
            <span className="text-fg-muted">/</span>
            <span className="border-2 border-line px-2 py-0.5">{note.tag}</span>
            <span className="text-fg-muted">/</span>
            <span>{note.date}</span>
            <span className="text-fg-muted">/</span>
            <span>{note.readTime} read</span>
          </div>

          <h1
            className="mt-10 md:mt-14 font-display leading-[0.88] tracking-tight anim-fade-in"
            style={{ fontSize: "clamp(48px, 9vw, 120px)", animationDelay: "180ms" }}
          >
            {note.title.replace(/\.$/, "")}<span className="text-pink">.</span>
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted anim-fade-in" style={{ animationDelay: "340ms" }}>
            <span>{note.date}</span>
            <span className="text-fg-muted/40">·</span>
            <span>{note.readTime} read</span>
            <span className="text-fg-muted/40">·</span>
            <span className="border-2 border-line px-2 py-0.5">{note.tag}</span>
            {note.related && (
              <>
                <span className="text-fg-muted/40">·</span>
                <span>{note.related.length} related signals</span>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-6 md:gap-16">
            <div className="col-span-12 md:col-span-7">
              {note.body.map((block, i) => (
                <div key={i} className={i > 0 ? "mt-12 md:mt-16" : ""}>
                  {block.heading && (
                    <h2
                      className="font-display leading-[0.92] tracking-tight mb-6"
                      style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
                    >
                      {block.heading}<span className="text-pink">.</span>
                    </h2>
                  )}
                  {block.paragraphs.map((p, j) => (
                    <p
                      key={j}
                      className={`text-lg leading-relaxed text-fg ${j > 0 ? "mt-5" : ""}`}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {note.related && note.related.length > 0 && (
              <div className="col-span-12 md:col-span-5">
                <div className="md:sticky md:top-[80px]">
                  <RelatedSignalsCard related={note.related} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-10 md:py-14">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
            <div className="col-span-12 md:col-span-6">
              {nextNote ? (
                <>
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-3">next note</div>
                  <Link
                    href={`/notes/${nextNote.slug}`}
                    className="group flex items-center gap-4 hover:text-pink transition-colors duration-200"
                  >
                    <div className="font-display text-2xl md:text-4xl tracking-tight leading-[0.92]">
                      {nextNote.title.replace(/\.$/, "")}<span className="text-pink">.</span>
                    </div>
                    <ArrowRight className="w-6 h-6 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-2" strokeWidth={2.5} />
                  </Link>
                </>
              ) : (
                <>
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-3">all notes</div>
                  <Link
                    href="/notes"
                    className="group flex items-center gap-4 hover:text-pink transition-colors duration-200"
                  >
                    <div className="font-display text-2xl md:text-4xl tracking-tight leading-[0.92]">
                      back to notes<span className="text-pink">.</span>
                    </div>
                    <ArrowRight className="w-6 h-6 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-2" strokeWidth={2.5} />
                  </Link>
                </>
              )}
            </div>
            <div className="col-span-12 md:col-span-6 flex md:justify-end">
              <div className="border-2 border-line p-6 max-w-[380px] w-full">
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-3">
                  see how your site scores
                </div>
                <Link
                  href="/#hero-audit"
                  className="group flex items-center justify-between gap-4 bg-pink text-bg px-5 py-4 hover:bg-fg transition-colors duration-200 border-2 border-pink hover:border-fg"
                >
                  <span className="font-display text-2xl tracking-tight">scan my site</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-2" strokeWidth={2.5} />
                </Link>
                <div className="mt-3 font-mono text-[10px] tracking-widest uppercase text-fg-muted">
                  free · 90 seconds · pdf emailed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
