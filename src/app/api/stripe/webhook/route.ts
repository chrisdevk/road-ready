import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAppointment } from "@/lib/acuity";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const buf = Buffer.from(await req.arrayBuffer());
  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const md = session.metadata || {};
    try {
      // In production: upsert in DB + idempotency on md.bookingId/session.payment_intent
      const payload: Record<string, any> = {
        appointmentTypeID: Number(md.appointmentTypeID),
        datetime: md.datetime, // ISO in Acuity calendar TZ
        firstName: md.customerFirstName || "Client",
        lastName: md.customerLastName || "",
        email: md.customerEmail,
        phone: md.customerPhone || undefined,
        notes: `Stripe session: ${session.id}`,
      };
      if (md.calendarID) payload.calendarID = Number(md.calendarID);

      await createAppointment(payload);
    } catch (e) {
      // If this fails after payment, store for retry (queue/cron). For MVP just log.
      console.error("Create appointment failed:", e);
    }
  }

  return NextResponse.json({ received: true });
}
// for testing locally:
// curl -X POST http://localhost:3000/api/stripe/webhook \
// -H "Content-Type: application/json" \
// -H "Stripe-Signature: <signature from stripe cli>" \
// -d '{}'