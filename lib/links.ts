/**
 * Shared link constants used across CTAs.
 *
 * `NEXT_PUBLIC_CAL_LINK` is volatile — the cal.com slot type may change
 * (e.g. swap from the temporary 30-min slot to a 15-min slot). Override via env;
 * site copy still says "book a 15-min call" regardless.
 */
const FALLBACK_CAL_URL = "https://cal.com/aditya-studioionique/30min";

export const CAL_URL: string =
  process.env.NEXT_PUBLIC_CAL_LINK?.trim() || FALLBACK_CAL_URL;

export const BOOK_LABEL = "book a 15-min call";
export const BOOK_LABEL_ARROW = `${BOOK_LABEL} →`;
