import { NextResponse } from "next/server";

const ACUITY_USER_ID =
  process.env.ACUITY_USER_ID || process.env.ACUITY_API_USER || "";
const ACUITY_API_KEY =
  process.env.ACUITY_API_KEY || process.env.ACUITY_API_PASS || "";

if (!ACUITY_USER_ID || !ACUITY_API_KEY) {
  return NextResponse.json(
    { ok: false, reason: "missing_api_creds" },
    { status: 500 }
  );
}
const FRESH_MINUTES = 30; // считаем запись свежей 30 мин

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const appointmentTypeId = searchParams.get("type");

    if (!email || !appointmentTypeId) {
      return NextResponse.json({ ok: false, reason: "missing_params" }, { status: 400 });
    }

    const auth = Buffer.from(`${ACUITY_USER_ID}:${ACUITY_API_KEY}`).toString("base64");
    const since = new Date(Date.now() - FRESH_MINUTES * 60_000).toISOString();

    const url = new URL("https://acuityscheduling.com/api/v1/appointments");
    url.searchParams.set("email", email);
    url.searchParams.set("appointmentTypeID", String(appointmentTypeId));
    url.searchParams.set("minDate", since);

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ ok: false, reason: "acuity_error", text }, { status: 502 });
    }

    const items = await res.json();
    const found = Array.isArray(items) && items.length > 0;

    return NextResponse.json({
      ok: true,
      found,
      appointment: found ? items[0] : null,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, reason: "server_error", msg: e?.message }, { status: 500 });
  }
}
