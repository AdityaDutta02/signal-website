/**
 * Three engine logos clustered above the hero H1.
 *
 * Pure CSS idle bob — no JS. Animation is set via inline `style.animation`
 * so Tailwind's JIT can't drop the keyframes as unused. Each logo bobs on
 * its own timing.
 *
 * Plain <img> instead of next/image: the PNGs are already small (~15 kB
 * each) and next/image was wrapping them in <span> shells that fought with
 * the animation.
 *
 * Server-rendered → motion runs the moment first paint lands, no hydration
 * pause and no `useEffect` flicker.
 */
export function EngineLogosFloat() {
  const items = [
    { src: "/logos/chatgpt.png",    alt: "ChatGPT",    anim: "bob1 5.6s ease-in-out infinite",      top: "8%",  left: "30%" },
    { src: "/logos/gemini.png",     alt: "Gemini",     anim: "bob2 6.4s ease-in-out infinite",      top: "3%",  left: "45%" },
    { src: "/logos/perplexity.svg", alt: "Perplexity", anim: "bob3 6.0s ease-in-out infinite 0.4s", top: "10%", left: "60%" },
  ];

  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[1] overflow-visible">
      {items.map((it) => (
        <div
          key={it.src}
          className="absolute will-change-transform"
          style={{ top: it.top, left: it.left, width: 72, height: 72, animation: it.anim }}
        >
          <img
            src={it.src}
            alt={it.alt}
            width={72}
            height={72}
            loading="eager"
            decoding="async"
            className="w-full h-full object-contain block"
          />
        </div>
      ))}
    </div>
  );
}
