// Inline-SVG abstract geometric element for the Hero's empty right area.
// - No external assets, no JS dependencies, no font/image fetches.
// - Pure CSS animation (translateY bob, slow rotate).
// - Hidden on mobile (lg: only) — keeps small viewports lean.
//
// Composition: isometric stack of 5 plates plus an emitting node + 3 signal
// arcs. Reads as "signal broadcast tower" without being literal.

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
        </defs>

        {/* Subtle grid background panel echoing the page bg-grid */}
        <rect x="40" y="60" width="400" height="420" fill="url(#hg-grid)" />

        {/* Signal arcs - concentric on the emitting top node */}
        <g className="hg-pulse" style={{ transformOrigin: "240px 110px" }}>
          <circle cx="240" cy="110" r="58" fill="none" stroke="#FF1F6A" strokeWidth="1.5" strokeOpacity="0.45" />
          <circle cx="240" cy="110" r="92" fill="none" stroke="#FF1F6A" strokeWidth="1.5" strokeOpacity="0.28" />
          <circle cx="240" cy="110" r="128" fill="none" stroke="#FF1F6A" strokeWidth="1.5" strokeOpacity="0.16" />
        </g>

        {/* Top emitting node */}
        <circle cx="240" cy="110" r="10" fill="#FF1F6A" />
        <circle cx="240" cy="110" r="18" fill="none" stroke="#0A0A0A" strokeWidth="2" />

        {/*
          Isometric plate stack. Each plate is a flat parallelogram (top face)
          plus two side faces. Plates offset upward by 32px each, building a 5-
          step tower. Colors alternate dark (#0A0A0A) and pink (#FF1F6A) on
          the top face; sides stay dark for solidity.
        */}
        {[
          { y: 420, top: "#0A0A0A" },
          { y: 388, top: "#FF1F6A" },
          { y: 356, top: "#0A0A0A" },
          { y: 324, top: "#FF1F6A" },
          { y: 292, top: "#0A0A0A" },
        ].map((p, i) => (
          <g key={i}>
            {/* Right face */}
            <path
              d={`M 340 ${p.y - 26} L 340 ${p.y + 6} L 240 ${p.y + 36} L 240 ${p.y + 4} Z`}
              fill="#0A0A0A"
              fillOpacity="0.82"
              stroke="#0A0A0A"
              strokeWidth="2"
            />
            {/* Left face */}
            <path
              d={`M 140 ${p.y - 26} L 140 ${p.y + 6} L 240 ${p.y + 36} L 240 ${p.y + 4} Z`}
              fill="#0A0A0A"
              fillOpacity="0.62"
              stroke="#0A0A0A"
              strokeWidth="2"
            />
            {/* Top face */}
            <path
              d={`M 140 ${p.y - 26} L 240 ${p.y - 56} L 340 ${p.y - 26} L 240 ${p.y + 4} Z`}
              fill={p.top}
              stroke="#0A0A0A"
              strokeWidth="2"
            />
          </g>
        ))}

        {/* Eyebrow stamp near the base */}
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
          animation: hg-float 6s ease-in-out infinite;
          transform-origin: center;
        }
        .hg-pulse {
          animation: hg-pulse 3.6s ease-in-out infinite;
        }
        @keyframes hg-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes hg-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hg-float, .hg-pulse { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
