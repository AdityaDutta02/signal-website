// Inline-SVG fluid blob for the Hero's empty right area.
// - No external assets, no JS dependencies.
// - SVG <filter> gooey effect (feGaussianBlur + feColorMatrix) merges three
//   drifting circles into one organic shape.
// - Pure CSS @keyframes drift the circles at different periods so the blob
//   morphs continuously without ever looping visibly.
// - Hidden below the lg: breakpoint, prefers-reduced-motion freezes it.

export function HeroGeometric() {
  return (
    <div
      aria-hidden="true"
      className="hidden lg:block pointer-events-none select-none anim-fade-in"
      style={{ animationDelay: "240ms" }}
    >
      <svg
        viewBox="0 0 480 520"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="hg-float"
      >
        <defs>
          <pattern id="hg-grid" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M14 0H0V14" fill="none" stroke="#0A0A0A" strokeOpacity="0.06" strokeWidth="1" />
          </pattern>

          {/* Gooey filter: blur the merged circles, then a hard color matrix
              cutoff turns them into a single fluid shape with crisp edges. */}
          <filter id="hg-goo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 22 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>

          {/* Soft pink-to-darker-pink radial that lets each blob feel
              dimensional rather than flat. */}
          <radialGradient id="hg-pink" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#FF4E89" />
            <stop offset="60%" stopColor="#FF1F6A" />
            <stop offset="100%" stopColor="#C70F4F" />
          </radialGradient>
        </defs>

        {/* Faint grid panel keeps the brutalist tether */}
        <rect x="40" y="60" width="400" height="420" fill="url(#hg-grid)" />

        {/* The blob: three drifting circles merged via the gooey filter. */}
        <g filter="url(#hg-goo)">
          <circle className="hg-blob hg-blob-a" cx="240" cy="260" r="92" fill="url(#hg-pink)" />
          <circle className="hg-blob hg-blob-b" cx="240" cy="260" r="78" fill="url(#hg-pink)" />
          <circle className="hg-blob hg-blob-c" cx="240" cy="260" r="66" fill="url(#hg-pink)" />
        </g>

        {/* Highlight dot — gives the blob a glass-like focal point */}
        <circle cx="208" cy="220" r="14" fill="#FFFFFF" fillOpacity="0.55" />
        <circle cx="208" cy="220" r="5" fill="#FFFFFF" fillOpacity="0.85" />

        {/* Brutalist eyebrow stamp */}
        <g transform="translate(56 472)">
          <rect width="120" height="22" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth="2" />
          <text
            x="60"
            y="15"
            textAnchor="middle"
            fontFamily="JetBrains Mono, ui-monospace, monospace"
            fontSize="9"
            fontWeight="700"
            letterSpacing="2"
            fill="#0A0A0A"
          >
            18 SIGNALS
          </text>
        </g>
      </svg>

      <style>{`
        .hg-float {
          animation: hg-float 8s ease-in-out infinite;
        }
        .hg-blob {
          transform-origin: 240px 260px;
          will-change: transform;
        }
        .hg-blob-a { animation: hg-drift-a 11s ease-in-out infinite; }
        .hg-blob-b { animation: hg-drift-b 13s ease-in-out infinite; }
        .hg-blob-c { animation: hg-drift-c 9s  ease-in-out infinite; }

        @keyframes hg-float {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes hg-drift-a {
          0%, 100% { transform: translate(0, 0)      scale(1); }
          33%      { transform: translate(36px, -22px) scale(1.08); }
          66%      { transform: translate(-28px, 26px) scale(0.94); }
        }
        @keyframes hg-drift-b {
          0%, 100% { transform: translate(0, 0)        scale(1); }
          25%      { transform: translate(-30px, -32px) scale(1.05); }
          75%      { transform: translate(40px, 20px)   scale(0.92); }
        }
        @keyframes hg-drift-c {
          0%, 100% { transform: translate(0, 0)        scale(1); }
          50%      { transform: translate(24px, 38px)  scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hg-float, .hg-blob-a, .hg-blob-b, .hg-blob-c { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
