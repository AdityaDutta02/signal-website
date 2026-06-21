import { promises as fs } from "node:fs";
import path from "node:path";
import { createClient, type Client } from "@libsql/client";
import type { GradedAudit } from "./grader";
import "./env";

// On Vercel the project root is read-only; only /tmp is writable (and ephemeral).
// Detect via the VERCEL env var Vercel always sets.
const FS_ROOT = process.env.VERCEL ? "/tmp/signal-data" : path.join(process.cwd(), ".data");
const DATA_DIR = FS_ROOT;
const AUDIT_DIR = path.join(DATA_DIR, "audits");
const LEADS_FILE = path.join(DATA_DIR, "leads.jsonl");
const RESERVATIONS_FILE = path.join(DATA_DIR, "reservations.jsonl");

const TURSO_URL = process.env.TURSO_DATABASE_URL;
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN;
const USE_TURSO = !!TURSO_URL;

let _client: Client | null = null;
let _initPromise: Promise<void> | null = null;

function client(): Client {
  if (_client) return _client;
  if (!TURSO_URL) throw new Error("TURSO_DATABASE_URL not set");
  _client = createClient({ url: TURSO_URL, authToken: TURSO_TOKEN });
  return _client;
}

async function initSchema(): Promise<void> {
  if (!USE_TURSO) return;
  if (_initPromise) return _initPromise;
  _initPromise = (async () => {
    const c = client();
    await c.batch(
      [
        `CREATE TABLE IF NOT EXISTS audits (
          leadid TEXT PRIMARY KEY,
          domain TEXT NOT NULL,
          payload TEXT NOT NULL,
          created_at INTEGER NOT NULL
        )`,
        `CREATE INDEX IF NOT EXISTS idx_audits_created_at ON audits(created_at)`,
        `CREATE TABLE IF NOT EXISTS leads (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          source TEXT NOT NULL,
          email TEXT,
          domain TEXT,
          leadid TEXT,
          notes TEXT,
          created_at INTEGER NOT NULL
        )`,
        `CREATE INDEX IF NOT EXISTS idx_leads_source_created ON leads(source, created_at)`,
        `CREATE TABLE IF NOT EXISTS reservations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL,
          domain TEXT NOT NULL,
          company TEXT,
          slot TEXT,
          notes TEXT,
          created_at INTEGER NOT NULL
        )`,
        `CREATE INDEX IF NOT EXISTS idx_reservations_created ON reservations(created_at)`,
      ],
      "write",
    );
  })();
  return _initPromise;
}

async function ensureDir(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
}

export function makeLeadId(): string {
  const a = Math.random().toString(36).slice(2, 8);
  const b = Math.random().toString(36).slice(2, 5);
  return a + b;
}

export async function saveAudit(leadid: string, audit: GradedAudit): Promise<void> {
  if (USE_TURSO) {
    await initSchema();
    await client().execute({
      sql: `INSERT INTO audits (leadid, domain, payload, created_at) VALUES (?, ?, ?, ?)
            ON CONFLICT(leadid) DO UPDATE SET payload = excluded.payload, domain = excluded.domain`,
      args: [leadid, audit.domain, JSON.stringify(audit), Date.now()],
    });
    return;
  }
  await ensureDir(AUDIT_DIR);
  await fs.writeFile(path.join(AUDIT_DIR, `${leadid}.json`), JSON.stringify(audit, null, 2), "utf8");
}

export async function loadAudit(leadid: string): Promise<GradedAudit | null> {
  if (USE_TURSO) {
    await initSchema();
    const res = await client().execute({
      sql: `SELECT payload FROM audits WHERE leadid = ? LIMIT 1`,
      args: [leadid],
    });
    const row = res.rows[0];
    if (!row) return null;
    const payload = row.payload;
    if (typeof payload !== "string") return null;
    return JSON.parse(payload) as GradedAudit;
  }
  try {
    const raw = await fs.readFile(path.join(AUDIT_DIR, `${leadid}.json`), "utf8");
    return JSON.parse(raw) as GradedAudit;
  } catch {
    return null;
  }
}

export type LeadRecord = {
  source: "scan" | "report" | "fit-check" | "contact" | "unauthorized";
  email?: string;
  domain?: string;
  leadid?: string;
  notes?: string;
  createdAt: string;
};

export async function appendLead(record: Omit<LeadRecord, "createdAt">): Promise<void> {
  if (USE_TURSO) {
    await initSchema();
    await client().execute({
      sql: `INSERT INTO leads (source, email, domain, leadid, notes, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [
        record.source,
        record.email ?? null,
        record.domain ?? null,
        record.leadid ?? null,
        record.notes ?? null,
        Date.now(),
      ],
    });
    return;
  }
  await ensureDir(DATA_DIR);
  const line = JSON.stringify({ ...record, createdAt: new Date().toISOString() }) + "\n";
  await fs.appendFile(LEADS_FILE, line, "utf8");
}

export type ReservationRecord = {
  domain: string;
  email: string;
  company?: string;
  slot?: string;
  notes?: string;
  createdAt: string;
};

export async function appendReservation(record: Omit<ReservationRecord, "createdAt">): Promise<void> {
  if (USE_TURSO) {
    await initSchema();
    await client().execute({
      sql: `INSERT INTO reservations (email, domain, company, slot, notes, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [
        record.email,
        record.domain,
        record.company ?? null,
        record.slot ?? null,
        record.notes ?? null,
        Date.now(),
      ],
    });
    return;
  }
  await ensureDir(DATA_DIR);
  const line = JSON.stringify({ ...record, createdAt: new Date().toISOString() }) + "\n";
  await fs.appendFile(RESERVATIONS_FILE, line, "utf8");
}
