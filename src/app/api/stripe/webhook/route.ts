import Stripe from "stripe";
import { NextResponse } from "next/server";
import { kv } from "@/lib/kv";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // если вдруг API-версия "clover" сыпется, можно вернуться на стабильную:
  apiVersion: "2025-09-30.clover",
});

const b64 = (s: string) => Buffer.from(s).toString("base64");

// 2025-10-22T18:00:00-07:00 → 2025-10-22T18:00:00-0700 (как любит Acuity)
const toAcuity = (iso: string) => iso?.replace(/([+-]\d{2}):?(\d{2})$/, "$1$2");

async function postToAcuity(payload: Record<string, string>) {
  const u = process.env.ACUITY_API_USER!;
  const p = process.env.ACUITY_API_PASS!;
  const headers = {
    Authorization: `Basic ${b64(`${u}:${p}`)}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const body = new URLSearchParams(payload);

  console.log(" Acuity POST /appointments", payload);
  const r = await fetch("https://acuityscheduling.com/api/v1/appointments", {
    method: "POST",
    headers,
    body,
  });

  const text = await r.text();
  console.log("🔹 Acuity response:", r.status, text);
  return { ok: r.ok, status: r.status, text };
}

// пытаемся достать URL подтверждения из любого формата
function extractConfirmationUrl(txt: string): { url?: string; id?: number } {
  try {
    const j = JSON.parse(txt);
    // у Acuity в разных аккаунтах ключ может отличаться:
    const url =
      j?.confirmationPage ||
      j?.confirmationPageUrl ||
      j?.confirmationURL ||
      j?.confirmationUrl ||
      "";
    const id = j?.id ? Number(j.id) : undefined;
    if (url) return { url, id };
  } catch {
    // не JSON — бывает (HTML-сниппет)
  }
  // попробуем вытащить ссылку из HTML
  const m =
    txt.match(/https?:\/\/[^\s"']+acuity[^\s"']+/i) ||
    txt.match(/https?:\/\/[^\s"']+squarespace\.com[^\s"']+/i);
  if (m) return { url: m[0] };
  return {};
}

export async function POST(req: Request) {
  console.log("  Stripe webhook hit");
  let event: Stripe.Event;

  try {
    const sig = req.headers.get("stripe-signature")!;
    const payload = await req.text();
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (e: any) {
    console.error(" webhook signature failed:", e?.message);
    return NextResponse.json({ error: "bad_signature" }, { status: 400 });
  }

  console.log(" Stripe event:", event.type);

  if (event.type === "checkout.session.completed") {
    try {
      const s = event.data.object as Stripe.Checkout.Session;
      console.log(" session.metadata:", s.metadata);
      console.log(" customer_details:", s.customer_details);

      const appointmentTypeId = String(s.metadata?.appointmentTypeId || "");
      const dateTime = toAcuity(String(s.metadata?.dateTime || ""));
      const email =
        s.customer_details?.email || s.metadata?.email || s.customer_email || "";
      const phone =
        s.customer_details?.phone || s.metadata?.phone || "";

      const name = s.customer_details?.name || "";
      const [firstName, ...rest] = name.trim().split(/\s+/);
      const lastName = rest.join(" ");

      const calendarID = process.env.ACUITY_CALENDAR_ID;

      // Быстрее всего увидеть реальную проблему — сохранить в KV даже ошибку.
      const bad = (msg: string) => {
        console.error("⛔", msg, { appointmentTypeId, dateTime, email, phone });
        kv.set(s.id, { appointmentId: 0, confirmationUrl: `ERR:${msg}` });
        return NextResponse.json({ ok: false }, { status: 200 });
      };

      if (!appointmentTypeId || !dateTime || !email) {
        return bad("Missing required fields for Acuity");
      }

      const payload: Record<string, string> = {
        appointmentTypeID: appointmentTypeId,
        datetime: dateTime,
        firstName: firstName || "Student",
        lastName,
        email,
        // у тебя аккаунт требовал phone — не рискуем:
        phone: phone || "+10000000000",
        notes: `Stripe ${s.id} — ${s.metadata?.packageName || "Lesson"}`,
      };
      if (calendarID) payload.calendarID = calendarID;

      const { ok, status, text } = await postToAcuity(payload);
      if (!ok) {
        kv.set(s.id, { appointmentId: 0, confirmationUrl: `ERR:${status}:${text}` });
        console.error(" Acuity create failed:", status, text);
        return NextResponse.json({ ok: false }, { status: 200 });
      }

      const { url, id } = extractConfirmationUrl(text);
      if (!url) {
        kv.set(s.id, { appointmentId: Number(id || 0), confirmationUrl: `ERR:no_url:${text}` });
        console.warn(" no confirmation url in response");
        return NextResponse.json({ ok: true }, { status: 200 });
      }

      kv.set(s.id, { appointmentId: Number(id || 0), confirmationUrl: url });
      console.log(" stored confirmation url for", s.id, url);
      return NextResponse.json({ ok: true }, { status: 200 });
    } catch (e: any) {
      console.error(" webhook handler error:", e?.message || e);
      return NextResponse.json({ ok: false }, { status: 200 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
