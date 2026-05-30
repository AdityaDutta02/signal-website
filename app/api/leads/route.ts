import { NextResponse } from "next/server";
import { appendLead, type LeadRecord } from "@/lib/storage";
import { validEmail, validDomain, trimMax } from "@/lib/validate";
import { rateLimit, ipFromRequest, rateHeaders } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_SOURCES: LeadRecord["source"][] = ["scan", "report", "fit-check", "contact", "unauthorized"];
const IP_LIMIT = 12;
const IP_WINDOW_MS = 10 * 60 * 1000;

export async function POST(req: Request) {
  const ip = ipFromRequest(req);
  const limit = rateLimit(`leads:ip:${ip}`, IP_LIMIT, IP_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "too many submissions. try again later." },
      { status: 429, headers: rateHeaders(limit) },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400, headers: rateHeaders(limit) });
  }

  const { source, email, domain, notes } = (body ?? {}) as {
    source?: string;
    email?: string;
    domain?: string;
    notes?: string;
  };

  if (!source || !VALID_SOURCES.includes(source as LeadRecord["source"])) {
    return NextResponse.json({ error: "invalid source" }, { status: 400, headers: rateHeaders(limit) });
  }
  if (email && !validEmail(email)) {
    return NextResponse.json({ error: "invalid email" }, { status: 400, headers: rateHeaders(limit) });
  }
  if (domain && !validDomain(domain)) {
    return NextResponse.json({ error: "invalid domain" }, { status: 400, headers: rateHeaders(limit) });
  }

  await appendLead({
    source: source as LeadRecord["source"],
    email: email ? trimMax(email, 200) : undefined,
    domain: domain ? trimMax(domain, 200) : undefined,
    notes: notes ? trimMax(notes, 2000) : undefined,
  });

  return NextResponse.json({ ok: true }, { status: 201, headers: rateHeaders(limit) });
}
