import { NextResponse } from "next/server";
import { appendReservation } from "@/lib/storage";
import { validEmail, validDomain, trimMax } from "@/lib/validate";
import { rateLimit, ipFromRequest, rateHeaders } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const IP_LIMIT = 4;
const IP_WINDOW_MS = 60 * 60 * 1000;

export async function POST(req: Request) {
  const ip = ipFromRequest(req);
  const limit = rateLimit(`reserve:ip:${ip}`, IP_LIMIT, IP_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "too many reservation attempts. wait an hour or email aditya@besignalled.com." },
      { status: 429, headers: rateHeaders(limit) },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400, headers: rateHeaders(limit) });
  }

  const { email, domain, company, slot, notes } = (body ?? {}) as {
    email?: string;
    domain?: string;
    company?: string;
    slot?: string;
    notes?: string;
  };

  if (!validEmail(email)) {
    return NextResponse.json({ error: "invalid email" }, { status: 400, headers: rateHeaders(limit) });
  }
  if (!validDomain(domain)) {
    return NextResponse.json({ error: "invalid domain" }, { status: 400, headers: rateHeaders(limit) });
  }

  await appendReservation({
    email: trimMax(email, 200),
    domain: trimMax(domain, 200),
    company: company ? trimMax(company, 200) : undefined,
    slot: slot ? trimMax(slot, 100) : undefined,
    notes: notes ? trimMax(notes, 2000) : undefined,
  });

  return NextResponse.json({ ok: true }, { status: 201, headers: rateHeaders(limit) });
}
