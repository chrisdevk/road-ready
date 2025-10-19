import Stripe from "stripe";
import { NextResponse } from "next/server";
import { fetchText } from "@/lib/acuity";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

function b64(s: string) {
  return Buffer.from(s).toString("base64");
}
// Acuity askws -0700 (no colon) in the offset
function toAcuityDateTime(iso: string) {
  return iso ? iso.replace(/([+-]\d{2}):?(\d{2})$/, "$1$2") : iso;
}
async function getPhone(session: Stripe.Checkout.Session) {
  const a = session.customer_details?.phone;
  const b = session.metadata?.phone;
  let c: string | undefined;
  if (session.customer) {
    const cust = await stripe.customers.retrieve(
      typeof session.customer === "string" ? session.customer : session.customer.id
    );
    if (!("deleted" in cust)) c = cust.phone || undefined;
  }
  let d: string | undefined;
  if (session.payment_intent) {
    const pi = await stripe.paymentIntents.retrieve(
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent.id
    );
    const pmId = typeof pi.payment_method === "string" ? pi.payment_method : pi.payment_method?.id;
    if (pmId) {
      const pm = await stripe.paymentMethods.retrieve(pmId);
      d = pm.billing_details?.phone || undefined;
    }
  }
  return a || b || c || d || "";
}

export async function POST(req: Request) {
  let event: Stripe.Event;
  try {
    const sig = req.headers.get("stripe-signature")!;
    const raw = await req.text();
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    console.log("Stripe event:", event.type);
  } catch (e: any) {
    console.error("Invalid webhook signature:", e?.message);
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const appointmentTypeID = String(session.metadata?.appointmentTypeId || "");
    const datetime = toAcuityDateTime(String(session.metadata?.dateTime || ""));
    const email =
      session.customer_details?.email ||
      session.metadata?.email ||
      session.customer_email ||
      "";
    const fullName = session.customer_details?.name || "";
    const [firstName, ...rest] = fullName.trim().split(/\s+/);
    const lastName = rest.join(" ");
    const phone = (await getPhone(session)) || "";
    const notes = `Stripe ${session.id} — ${session.metadata?.packageName || "Lesson"}`;

    console.log("🧪 prepared payload", {
      appointmentTypeID, datetime, email, firstName, lastName, phone,
    });

    if (!appointmentTypeID || !datetime || !email || !phone) {
      console.error("Missing required fields for Acuity");
      return NextResponse.json({ ok: false }, { status: 200 });
    }

    const body = new URLSearchParams({
      appointmentTypeID,
      datetime,
      firstName: firstName || "Student",
      lastName,
      email,
      phone,
      notes,
    });

    const headers = {
      Authorization: `Basic ${b64(`${process.env.ACUITY_API_USER}:${process.env.ACUITY_API_PASS}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    console.log("🔸 POST → Acuity /appointments");
    const { res, text } = await fetchText(
      "https://acuityscheduling.com/api/v1/appointments",
      { method: "POST", headers, body }
    );
    console.log("🔹 Acuity response:", res.status, text);

    return NextResponse.json({ ok: res.ok }, { status: 200 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
