import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // appointmentTypeID from client
    const month = searchParams.get("month"); // YYYY-MM
    const timezone = searchParams.get("timezone") || searchParams.get("tz") || "UTC";
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const calendarID = process.env.ACUITY_CALENDAR_ID || undefined;

    if (!type) {
      return NextResponse.json({ error: "Missing 'type'" }, { status: 400 });
    }

    const url = new URL("https://acuityscheduling.com/api/v1/availability/dates");
    url.searchParams.set("appointmentTypeID", String(type));
    url.searchParams.set("timezone", timezone);

    // Prefer explicit range if provided; else use month; else default to a 30-day window.
    if (startDate && endDate) {
      url.searchParams.set("startDate", startDate);
      url.searchParams.set("endDate", endDate);
    } else if (month) {
      url.searchParams.set("month", month);
    } else {
      // fallback: today → +30 days
      const today = new Date();
      const to = new Date(today);
      to.setDate(to.getDate() + 30);
      const pad = (n: number) => String(n).padStart(2, "0");
      const s = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
      const e = `${to.getFullYear()}-${pad(to.getMonth() + 1)}-${pad(to.getDate())}`;
      url.searchParams.set("startDate", s);
      url.searchParams.set("endDate", e);
    }

    // Only include calendarID if you’re sure it’s correct
    if (calendarID) url.searchParams.set("calendarID", String(calendarID));

    const auth = Buffer.from(`${process.env.ACUITY_API_USER}:${process.env.ACUITY_API_PASS}`).toString("base64");

    // debug log (server)
    console.log("📡 dates →", url.toString());

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
