import Stripe from "stripe";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Use your live chosen API version or a stable one:
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export async function POST(req: Request) {
  try {
    const sig = req.headers.get("stripe-signature");
    if (!sig) return NextResponse.json({ error: "no signature" }, { status: 400 });

    const buf = await req.text();
    const event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Handle only what you need; everything else just 200 OK.
    switch (event.type) {
      case "checkout.session.completed": {
        // If you later want to call Acuity here, do it.
        // For now, just acknowledge to stop Stripe retries.
        break;
      }
      default:
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error("Stripe webhook error:", err?.message || err);
    // Return 200 to avoid endless retries while you’re developing.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}