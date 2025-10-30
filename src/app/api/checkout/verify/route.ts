import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

// Stub – always returns ok. You can wire this to Acuity/Stripe later.
export async function GET() {
  return NextResponse.json({ ok: true });
}