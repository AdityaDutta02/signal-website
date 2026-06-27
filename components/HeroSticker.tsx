/**
 * Brutalist tilted sticker — pink card with a big black character mark.
 * Sits absolutely positioned on the right side of a hero section, replaces
 * any prior floating-logo decoration. Sharp 90° corners, hard offset shadow,
 * no gradients. Server-rendered.
 *
 * The `mark` slot is intentionally short — one or two glyphs — because the
 * type is sized as a viewport-derived clamp and longer strings overflow the
 * card. Use the `asterisk` flag when the mark is the Signal wordmark "s*".
 */
type Props = {
  mark: string;
  asterisk?: boolean;
  /** Tilt in degrees. Default -6 for the home variant, ~+5 for work, etc. */
  tilt?: number;
};

export function HeroSticker({ mark, asterisk = false, tilt = -6 }: Props) {
  return (
    <div
      aria-hidden="true"
      className="absolute right-4 md:right-10 lg:right-16 top-1/2 -translate-y-1/2
                 w-[200px] h-[200px] md:w-[280px] md:h-[280px] lg:w-[340px] lg:h-[340px]
                 bg-pink border-2 border-fg
                 flex items-center justify-center
                 z-[2] select-none pointer-events-none"
      style={{
        boxShadow: "10px 10px 0 0 var(--fg)",
        transform: `translateY(-50%) rotate(${tilt}deg)`,
      }}
    >
      <div className="flex items-baseline leading-none">
        <span
          className="font-display text-fg tracking-tighter"
          style={{ fontSize: "clamp(140px, 22vw, 280px)", lineHeight: 0.78 }}
        >
          {mark}
        </span>
        {asterisk && (
          <span
            className="font-display text-bg tracking-tighter"
            style={{ fontSize: "clamp(80px, 12vw, 160px)", lineHeight: 0.78 }}
          >
            *
          </span>
        )}
      </div>
    </div>
  );
}
