# Signal — signalled.studio

Conversion-oriented marketing site for Signal, a B2B SaaS AEO (Answer Engine Optimization) studio. Every route drives toward one action: **book a 15-min call**.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind 3.4 · Turso (libSQL) for lead capture.

---

## Run it

```bash
npm install
npm run dev    # http://localhost:4323
npm run build
```

Env:

| Var | Use |
|---|---|
| `NEXT_PUBLIC_CAL_LINK` | cal.com booking URL (single source of truth) |
| `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN` | lead capture (optional in dev) |

---

## Branches

| Branch | What |
|---|---|
| `main` | live v5 — current Brutalist conversion rewrite |
| `v4` | frozen snapshot of the previous design (commit `9096ca8`) |

---

## Routes

### Conversion pages
| Path | Purpose |
|---|---|
| `/` | Home. Hero → shift → proof → pricing → FAQ → founders → final CTA |
| `/ai-visibility-score` | Free /100 scan landing. SEO target: "AI visibility score" |
| `/work` | Three pilot case studies with before/after per-engine scores |
| `/work/[slug]` | Individual case study |
| `/methodology` | The 18-signal rubric explained |
| `/contact` | Three ways to reach us. Cal, email, audit |

### Content (SEO)
| Path | Purpose |
|---|---|
| `/notes` | Index of long-form posts on AEO |
| `/notes/[slug]` | Individual note |
| `/faq` | Standalone FAQ page |

### Audit funnel
| Path | Purpose |
|---|---|
| `/audit/demo` | Sample scorecard, no email gate |
| `/audit/[leadid]` | Email-gated per-prospect scorecard |
| `/report` | Long-form report after scan |

### Legal & utility
| Path | Purpose |
|---|---|
| `/privacy`, `/terms` | Legal |
| `/401`, `/unauthorized` | Auth fall-throughs |
| `/llms.txt` | LLM crawler instructions |

### API
| Path | Purpose |
|---|---|
| `POST /api/leads` | Capture email + source (modal, audit, contact, report) |
| `POST /api/audit` | Run the AI visibility scan |
| `GET /api/audit/[leadid]` | Fetch a stored scan result |
| `POST /api/reserve` | Reserve a build slot |

---

## Conventions

- **One CTA, one URL.** All "book a call" buttons import `CAL_URL` from `lib/links.ts`.
- **Sections cap at 100vh** on desktop.
- **No `<mark>` highlights.** Removed sitewide.
- **Pink `#FF1F6A` is the only accent.** Sharp corners (0 radius). `max-w-8xl` = 1400px.
- **Fonts:** Big Shoulders Display (display), Archivo (sans 400/700), JetBrains Mono.

---

## Deploy

Vercel, auto-deploy on push to `main`. Preview deploys on every branch.
