"use client";

import { useMemo, useRef, useState } from "react";
import { signals, edges, clusterLabels, type Signal } from "../data/signals";

type Mode = "preview" | "full";

export function SignalsGraph({
  mode = "preview",
  onSelect,
}: {
  mode?: Mode;
  onSelect?: (s: Signal) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox] = useState({ x: 50, y: 50, w: 1000, h: 660 });
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const interactive = mode === "full";
  const focusId = selected ?? hovered;

  const neighborSet = useMemo(() => {
    if (!focusId) return null;
    const set = new Set<string>([focusId]);
    edges.forEach((e) => {
      if (e.from === focusId) set.add(e.to);
      if (e.to === focusId) set.add(e.from);
    });
    return set;
  }, [focusId]);

  const R_BASE = 9;
  const R_FIX = 11;
  const HALO_OFFSET = 5;

  return (
    <svg
      ref={svgRef}
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
      className="w-full h-full block"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <pattern id="sg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ECECEC" strokeWidth="1" />
        </pattern>
        <pattern id="sg-grid-major" width="160" height="160" patternUnits="userSpaceOnUse">
          <path d="M 160 0 L 0 0 0 160" fill="none" stroke="#D6D6D6" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x={viewBox.x} y={viewBox.y} width={viewBox.w} height={viewBox.h} fill="url(#sg-grid)" />
      <rect x={viewBox.x} y={viewBox.y} width={viewBox.w} height={viewBox.h} fill="url(#sg-grid-major)" />

      {clusterLabels.map((c) => (
        <text
          key={c.block}
          x={c.x}
          y={c.y - 110}
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize={10}
          fontWeight={700}
          fill="#B5B5B5"
          style={{ letterSpacing: "0.24em", textTransform: "uppercase" }}
        >
          {c.label} · {String(c.count).padStart(2, "0")}
        </text>
      ))}

      {edges.map((e, i) => {
        const a = signals.find((s) => s.id === e.from);
        const b = signals.find((s) => s.id === e.to);
        if (!a || !b) return null;
        const isHi = neighborSet ? neighborSet.has(a.id) && neighborSet.has(b.id) : false;
        const dimmed = !!neighborSet && !isHi;
        const opacity = dimmed ? 0.06 : isHi ? 1 : 0.22;
        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={isHi ? "#FF1F6A" : "#0A0A0A"}
            strokeWidth={isHi ? 1.4 : 0.8}
            opacity={opacity}
            style={{ transition: "stroke 180ms, opacity 180ms, stroke-width 180ms" }}
            className="anim-fade-in"
          />
        );
      })}

      {signals.map((s) => {
        const isFix = s.fix;
        const isSel = selected === s.id;
        const isFocused = focusId === s.id;
        const inNeighbor = neighborSet?.has(s.id);
        const dimmed = !!neighborSet && !inNeighbor;
        const r = isFix ? R_FIX : R_BASE;

        return (
          <g
            key={s.id}
            transform={`translate(${s.x}, ${s.y})`}
            className={interactive ? "cursor-pointer" : ""}
            opacity={dimmed ? 0.22 : 1}
            style={{ transition: "opacity 180ms ease-out" }}
            onClick={() => {
              if (!interactive) return;
              const next = selected === s.id ? null : s.id;
              setSelected(next);
              if (next) onSelect?.(s);
            }}
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {isFix && (
              <circle
                r={r + HALO_OFFSET}
                fill="none"
                stroke="#FF1F6A"
                strokeWidth={1}
                opacity={isFocused ? 0.7 : 0.32}
                className={!focusId ? "anim-pulse-soft" : ""}
                style={{ transition: "opacity 180ms" }}
              />
            )}

            {isFocused && !isFix && (
              <circle
                r={r + HALO_OFFSET}
                fill="none"
                stroke="#0A0A0A"
                strokeWidth={1}
                opacity={0.35}
              />
            )}

            <circle
              r={r}
              fill={isFix ? "#FF1F6A" : "#FFFFFF"}
              stroke="#0A0A0A"
              strokeWidth={isSel ? 2.5 : 1.6}
              style={{ transition: "stroke-width 160ms" }}
            />
            <text
              x={0}
              y={0}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="JetBrains Mono, monospace"
              fontSize={isFix ? 9 : 8}
              fontWeight={700}
              fill={isFix ? "#FFFFFF" : "#0A0A0A"}
            >
              {String(s.num).padStart(2, "0")}
            </text>

            <text
              x={0}
              y={r + 13}
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize={7.5}
              fontWeight={700}
              fill={isFocused ? "#0A0A0A" : "#A8A8A8"}
              style={{
                letterSpacing: "0.06em",
                textTransform: "lowercase",
                transition: "fill 180ms",
                pointerEvents: "none",
              }}
            >
              {s.title}
            </text>
          </g>
        );
      })}

      {interactive && (
        <g transform={`translate(${viewBox.x + 16}, ${viewBox.y + viewBox.h - 32})`}>
          <rect width="220" height="20" fill="#FFFFFF" stroke="#0A0A0A" strokeWidth={1} />
          <circle cx={14} cy={10} r={5} fill="#FF1F6A" stroke="#0A0A0A" strokeWidth={1.4} />
          <text
            x={26}
            y={10}
            dominantBaseline="central"
            fontFamily="JetBrains Mono, monospace"
            fontSize={9}
            fontWeight={700}
            fill="#0A0A0A"
            style={{ letterSpacing: "0.12em" }}
          >
            TOP-3 FIX
          </text>
          <circle cx={110} cy={10} r={4} fill="#FFFFFF" stroke="#0A0A0A" strokeWidth={1.4} />
          <text
            x={122}
            y={10}
            dominantBaseline="central"
            fontFamily="JetBrains Mono, monospace"
            fontSize={9}
            fontWeight={700}
            fill="#0A0A0A"
            style={{ letterSpacing: "0.12em" }}
          >
            SIGNAL
          </text>
        </g>
      )}
    </svg>
  );
}
