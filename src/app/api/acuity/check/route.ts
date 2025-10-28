import { NextResponse } from "next/server";

const ACUITY_USER_ID = process.env.ACUITY_API_USER;
const ACUITY_API_KEY = process.env.ACUITY_API_PASS;

export const dynamic = "force-dynamic";

export async function GET() {
  // ✅ Check credentials inside the handler
  if (!ACUITY_USER_ID || !ACUITY_API_KEY) {
    return NextResponse.json(
      { ok: false, reason: "missing_api_creds" },
      { status: 500 }
    );
  }

  try {
    const auth = Buffer.from(`${ACUITY_USER_ID}:${ACUITY_API_KEY}`).toString("base64");

    // Basic sanity check: fetch Acuity appointment types
    const res = await fetch("https://acuityscheduling.com/api/v1/appointment-types", {
      headers: { Authorization: `Basic ${auth}` },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, reason: "acuity_error", status: res.status, text: data },
        { status: res.status }
      );
    }

    return NextResponse.json({ ok: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, reason: "network_error", message }, { status: 500 });
  }
}
