type Window = { count: number; resetAt: number };

const store = new Map<string, Window>();
let lastSweep = Date.now();

const SWEEP_INTERVAL_MS = 60_000;

function sweep(now: number): void {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return;
  lastSweep = now;
  for (const [key, w] of store) {
    if (w.resetAt <= now) store.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now);
  const existing = store.get(key);
  if (!existing || existing.resetAt <= now) {
    const fresh = { count: 1, resetAt: now + windowMs };
    store.set(key, fresh);
    return { ok: true, limit, remaining: limit - 1, resetAt: fresh.resetAt };
  }
  if (existing.count >= limit) {
    return { ok: false, limit, remaining: 0, resetAt: existing.resetAt };
  }
  existing.count += 1;
  return { ok: true, limit, remaining: limit - existing.count, resetAt: existing.resetAt };
}

export function ipFromRequest(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  return "unknown";
}

export function rateHeaders(r: RateLimitResult): Record<string, string> {
  return {
    "X-RateLimit-Limit": String(r.limit),
    "X-RateLimit-Remaining": String(r.remaining),
    "X-RateLimit-Reset": String(Math.ceil(r.resetAt / 1000)),
  };
}
