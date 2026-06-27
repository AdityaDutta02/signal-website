/**
 * Brutalist tilted sticker — pink card with a big black character mark.
 *
 * Desktop-only decoration (hidden on mobile + tablet via `hidden lg:flex`).
 * The sticker is large and tilted; at narrow viewports it inevitably
 * overlaps the hero content, so it is suppressed below the lg breakpoint
 * rather than scaled down to a width where it loses impact.
 *
 * Anchored to the top of the hero (top-12 / top-16) rather than vertically
 * centred — at desktop heights the stats grid and supporting copy sit in
 * the lower half of the hero, and a vertically centred sticker collides
 * with them. Anchoring to the top mirrors the Brutalis reference, where the
 * lime card sits in the upper right of the hero.
 *
 * `pointer-events-none` + `aria-hidden` because it is pure decoration.
 */
type Props = {
  mark: string;
  asterisk?: boolean;
  /** Tilt in degrees. Default -6 for home; pages can override (e.g. +5). */
  tilt?: number;
};

export function HeroSticker({ mark, asterisk = false, tilt = -6 }: Props) {
  return (
    <div
      aria-hidden="true"
      className="hidden lg:flex absolute right-10 lg:right-16 xl:right-20
                 top-12 lg:top-16
                 w-[300px] xl:w-[360px] h-[300px] xl:h-[360px]
                 bg-pink border-2 border-fg
                 items-center justify-center
                 z-[2] select-none pointer-events-none"
      style={{
        boxShadow: "10px 10px 0 0 var(--fg)",
        transform: `rotate(${tilt}deg)`,
      }}
    >
      <div className="flex items-baseline leading-none">
        <span
          className="font-display text-fg tracking-tighter"
          style={{ fontSize: "clamp(180px, 16vw, 260px)", lineHeight: 0.78 }}
        >
          {mark}
        </span>
        {asterisk && (
          <span
            className="font-display text-bg tracking-tighter"
            style={{ fontSize: "clamp(100px, 9vw, 150px)", lineHeight: 0.78 }}
          >
            *
          </span>
        )}
      </div>
    </div>
  );
}
