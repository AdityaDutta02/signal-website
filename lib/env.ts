// Env startup check. Logs warnings; does not throw — the app falls back to
// filesystem storage when Turso isn't configured, which is fine for dev but
// fatal on serverless. We surface the warning loudly so production deploys
// don't ship blindly.

type EnvReport = {
  ok: boolean;
  warnings: string[];
  required: string[];
};

let _reported = false;

export function reportEnv(): EnvReport {
  const warnings: string[] = [];
  const required = ["TURSO_DATABASE_URL", "TURSO_AUTH_TOKEN"];

  const isProd = process.env.NODE_ENV === "production";
  const onVercel = !!process.env.VERCEL;

  if (!process.env.TURSO_DATABASE_URL) {
    warnings.push(
      "TURSO_DATABASE_URL not set — falling back to filesystem .data/ for storage. " +
        "Audits, leads, and reservations will not survive cold starts on serverless.",
    );
  }
  if (process.env.TURSO_DATABASE_URL && !process.env.TURSO_AUTH_TOKEN) {
    warnings.push("TURSO_DATABASE_URL is set but TURSO_AUTH_TOKEN is missing. Auth will fail.");
  }

  if (isProd && onVercel && warnings.length > 0) {
    warnings.push("⚠️ Running on Vercel without Turso = data loss. Configure both env vars before traffic.");
  }

  if (!_reported && warnings.length > 0) {
    _reported = true;
    for (const w of warnings) {
      console.warn(`[signal env] ${w}`);
    }
  }

  return {
    ok: warnings.length === 0,
    warnings,
    required,
  };
}

// Fire on first import in any server-side context.
if (typeof window === "undefined") {
  reportEnv();
}
