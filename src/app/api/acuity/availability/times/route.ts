import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");  // appointmentTypeID
    const date = searchParams.get("date");  // YYYY-MM-DD
    const timezone = searchParams.get("timezone") || searchParams.get("tz") || "UTC";
    const calendarID = process.env.ACUITY_CALENDAR_ID || undefined;

    if (!type || !date) {
      return NextResponse.json({ error: "Missing 'type' or 'date'" }, { status: 400 });
    }

    const url = new URL("https://acuityscheduling.com/api/v1/availability/times");
    url.searchParams.set("appointmentTypeID", String(type));
    url.searchParams.set("date", date);
    url.searchParams.set("timezone", timezone);
    if (calendarID) url.searchParams.set("calendarID", String(calendarID));

    const auth = Buffer.from(`${process.env.ACUITY_API_USER}:${process.env.ACUITY_API_PASS}`).toString("base64");

    console.log("📡 times →", url.toString());

    const r = await fetch(url, { headers: { Authorization: `Basic ${auth}` }, cache: "no-store" });
    const text = await r.text();
    try {
      const json = JSON.parse(text);
      return NextResponse.json(json, { status: r.status });
    } catch {
      return NextResponse.json({ error: text }, { status: r.status });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Server error" }, { status: 500 });
  }
}
