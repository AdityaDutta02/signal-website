import { NextResponse } from "next/server";
import { loadAudit } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: { params: Promise<{ leadid: string }> }) {
  const { leadid } = await ctx.params;
  if (!leadid || leadid.length > 64) {
    return NextResponse.json({ error: "invalid leadid" }, { status: 400 });
  }
  const audit = await loadAudit(leadid);
  if (!audit) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json(audit, { status: 200 });
}
