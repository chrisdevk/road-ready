import { NextResponse } from "next/server";
import { kv } from "@/lib/kv";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("session_id") || "";
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });

  const hit = kv.get(id);
  if (!hit) return NextResponse.json({ ok: false });
  return NextResponse.json({ ok: true, ...hit });
}
