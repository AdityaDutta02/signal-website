import { NextResponse } from "next/server";
import { gradeDomain } from "@/lib/grader";
import { saveAudit, makeLeadId, appendLead } from "@/lib/storage";
import { validDomain, validEmail, trimMax } from "@/lib/validate";
import { rateLimit, ipFromRequest, rateHeaders } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const IP_LIMIT = 8;
const IP_WINDOW_MS = 10 * 60 * 1000;
const DOMAIN_LIMIT = 3;
const DOMAIN_WINDOW_MS = 60 * 60 * 1000;

function normaliseDomainKey(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "")
    .split("/")[0];
}

export async function POST(req: Request) {
  const ip = ipFromRequest(req);
  const ipCheck = rateLimit(`audit:ip:${ip}`, IP_LIMIT, IP_WINDOW_MS);
  if (!ipCheck.ok) {
    return NextResponse.json(
      { error: "too many scans from this network. wait a few minutes." },
      { status: 429, headers: rateHeaders(ipCheck) },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400, headers: rateHeaders(ipCheck) });
  }

  const { domain, email } = (body ?? {}) as { domain?: string; email?: string };
  if (!validDomain(domain)) {
    return NextResponse.json({ error: "invalid domain" }, { status: 400, headers: rateHeaders(ipCheck) });
  }

  const domainKey = normaliseDomainKey(domain);
  const domainCheck = rateLimit(`audit:domain:${domainKey}`, DOMAIN_LIMIT, DOMAIN_WINDOW_MS);
  if (!domainCheck.ok) {
    return NextResponse.json(
      { error: `${domainKey} was scanned recently. fresh scan available shortly.` },
      { status: 429, headers: rateHeaders(domainCheck) },
    );
  }

  const leadid = makeLeadId();

  let audit;
  try {
    audit = await gradeDomain(domain);
  } catch (e) {
    console.error("[audit] gradeDomain threw", { domain, err: e instanceof Error ? e.message : String(e) });
    return NextResponse.json(
      { error: "audit failed to run — try again in a moment" },
      { status: 502, headers: rateHeaders(ipCheck) },
    );
  }

  try {
    await saveAudit(leadid, audit);
  } catch (e) {
    console.error("[audit] saveAudit threw", { leadid, err: e instanceof Error ? e.message : String(e) });
    return NextResponse.json(
      { error: "audit storage failed — try again" },
      { status: 503, headers: rateHeaders(ipCheck) },
    );
  }

  try {
    await appendLead({
      source: "scan",
      domain: audit.domain,
      leadid,
      email: validEmail(email) ? trimMax(email, 200) : undefined,
    });
  } catch (e) {
    // Non-fatal: lead capture failing should not block the user seeing their report.
    console.error("[audit] appendLead threw", { leadid, err: e instanceof Error ? e.message : String(e) });
  }

  return NextResponse.json({ leadid, domain: audit.domain }, { status: 201, headers: rateHeaders(ipCheck) });
}
