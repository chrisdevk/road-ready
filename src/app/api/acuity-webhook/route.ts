import { NextResponse } from "next/server";

/**
 * Optional Basic Auth that you can set in your Acuity Webhook settings.
 * If you don't set these in Acuity, leave the envs empty and we'll skip auth.
 *
 * .env.local:
 *   ACUITY_WEBHOOK_USER=someuser
 *   ACUITY_WEBHOOK_PASS=somepass
 */
const WH_USER = process.env.ACUITY_WEBHOOK_USER || "";
const WH_PASS = process.env.ACUITY_WEBHOOK_PASS || "";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "unauthorized" }, { status: 401 });
}

function checkBasicAuth(req: Request) {
  if (!WH_USER || !WH_PASS) return true; // auth not required

  const hdr = req.headers.get("authorization");
  if (!hdr?.startsWith("Basic ")) return false;

  const token = hdr.slice("Basic ".length);
  const decoded = Buffer.from(token, "base64").toString("utf8"); // "user:pass"
  const [u, p] = decoded.split(":");
  return u === WH_USER && p === WH_PASS;
}

export async function POST(req: Request) {
  try {
    if (!checkBasicAuth(req)) return unauthorized();

    // Acuity posts JSON; read raw for debugging then parse
    const raw = await req.text();

    let payload: any;
    try {
      payload = JSON.parse(raw);
    } catch {
      console.error("Acuity webhook: bad JSON:", raw);
      return NextResponse.json({ ok: false, reason: "bad_json" }, { status: 400 });
    }
  
  //  log everything for debugging
    console.log("Acuity webhook payload:", JSON.stringify(payload, null, 2));

    // Typical fields:
    // payload.event: "appointment.scheduled" | "appointment.canceled" | ...
    // payload.appointment: { id, datetime, type, firstName, lastName, email, phone, ... }

    const event = payload?.event || "unknown";
    const appt = payload?.appointment;

    switch (event) {
      case "appointment.scheduled":
        console.log("Scheduled:", {
          id: appt?.id,
          type: appt?.type,
          datetime: appt?.datetime,
          email: appt?.email,
          phone: appt?.phone,
        });
        break;

      case "appointment.rescheduled":
        console.log("Rescheduled:", {
          id: appt?.id,
          newDatetime: appt?.datetime,
        });
        break;

      case "appointment.canceled":
        console.log("Canceled:", { id: appt?.id, reason: payload?.canceledBy });
        break;

      default:
        console.log("ℹUnhandled Acuity event:", event);
    }

    // If we need to do DB writes / send emails, do it here.
    // Keeps the handler fast—Acuity expects a quick 2xx.
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Acuity webhook error:", err?.message || err);
    return NextResponse.json({ ok: false }, { status: 200 }); // reply 200 to avoid retries while debugging
  }
}
