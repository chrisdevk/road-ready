import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

function b64(s: string) {
  return Buffer.from(s).toString("base64");
}

// Acuity likes the timezone offset **without** the colon: 2025-10-17T13:00:00-0700
function toAcuityDateTime(iso: string) {
  if (!iso) return iso;
  return iso.replace(/([+-]\d{2}):?(\d{2})$/, "$1$2");
}

async function getPhoneFromStripe(session: Stripe.Checkout.Session) {
  // 1) What Checkout collected
  const a = session.customer_details?.phone;

  // 2) Your metadata from the modal
  const b = session.metadata?.phone;

  // 3) Stripe Customer (if created)
  let c: string | undefined;
  if (session.customer) {
    const cust = await stripe.customers.retrieve(
      typeof session.customer === "string" ? session.customer : session.customer.id
    );
    if (!("deleted" in cust) && cust.phone) c = cust.phone;
  }

  // 4) Payment method billing_details.phone
  let d: string | undefined;
  if (session.payment_intent) {
    const pi = await stripe.paymentIntents.retrieve(
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent.id
    );
    const pmId =
      typeof pi.payment_method === "string"
        ? pi.payment_method
        : pi.payment_method?.id;
    if (pmId) {
      const pm = await stripe.paymentMethods.retrieve(pmId);
      d = pm.billing_details?.phone || undefined;
    }
  }

  return a || b || c || d || "";
}

async function postToAcuity(payload: Record<string, string>) {
  const creds = `${process.env.ACUITY_API_USER}:${process.env.ACUITY_API_PASS}`;
  const headers = {
    Authorization: `Basic ${b64(creds)}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  // IMPORTANT: form-encoded, NOT JSON
  const body = new URLSearchParams(payload);

  const resp = await fetch("https://acuityscheduling.com/api/v1/appointments", {
    method: "POST",
    headers,
    body,
  });

  const text = await resp.text();
  return { ok: resp.ok, status: resp.status, text };
}

export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    const sig = req.headers.get("stripe-signature")!;
    const body = await req.text();
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err?.message);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  // 🔊 LOG: which Stripe event arrived
  console.log("Stripe event:", event.type);

  // We only create the appointment when the checkout is completed & paid
  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as Stripe.Checkout.Session;

      // 🔊 LOG: what we got from Stripe
      console.log("session.metadata:", session.metadata);
      console.log("customer_details:", session.customer_details);

      // Pull data we need
      const appointmentTypeId = String(session.metadata?.appointmentTypeId || "");
      const rawDateTime = String(session.metadata?.dateTime || "");
      const dateTime = toAcuityDateTime(rawDateTime);

      const email =
        session.customer_details?.email ||
        session.metadata?.email ||
        session.customer_email ||
        "";

      const name = session.customer_details?.name || "";
      const [firstName, ...rest] = name.trim().split(/\s+/);
      const lastName = rest.join(" ");

      // Robust phone extraction
      const phone = (await getPhoneFromStripe(session)) || "";

      const notes = `Stripe ${session.id} — ${session.metadata?.packageName || "Lesson"}`;

      // Build payload once so we can log it exactly
      const payload = {
        appointmentTypeID: appointmentTypeId,
        datetime: dateTime,
        firstName: firstName || "Student",
        lastName: lastName || "",
        email,
        phone, // REQUIRED
        notes,
      };

      // LOG: prepared payload we plan to send
      console.log("prepared payload", {
        appointmentTypeId,
        datetime: dateTime,
        email,
        firstName: firstName || "Student",
        lastName,
        phone,
      });

      // Validate required fields before calling Acuity
      if (!appointmentTypeId || !dateTime || !email || !phone) {
        console.error("Missing required fields for Acuity", {
          appointmentTypeId,
          dateTime,
          email,
          phone,
        });
        // Return 200 so Stripe doesn’t keep retrying; you can still read the logs.
        return NextResponse.json({ ok: false }, { status: 200 });
      }

      // 🔊 LOG: outbound request
      console.log("POSTing to Acuity /appointments with:", payload);
      const { ok, status, text } = await postToAcuity(payload);

      // 🔊 LOG: inbound response
      console.log("🔹 Acuity response:", status, text);

      if (!ok) {
        console.error("Acuity response not OK:", status, text);
        // Don’t fail the webhook retry loop forever; log it and return 200.
        return NextResponse.json({ ok: false, acuity: { status, text } }, { status: 200 });
      }

      console.log("Acuity created:", text);
      return NextResponse.json({ ok: true }, { status: 200 });
    } catch (e: any) {
      console.error("Acuity create failed:", e?.message || e);
      // Return 200 so Stripe doesn’t retry indefinitely while you fix data.
      return NextResponse.json({ ok: false }, { status: 200 });
    }
  }

  // Acknowledge other events
  return NextResponse.json({ received: true }, { status: 200 });
}
