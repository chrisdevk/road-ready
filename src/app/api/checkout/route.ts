import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Create a single Stripe instance (omit apiVersion to avoid TS literal mismatch)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { priceId, meta } = await req.json();

    if (!priceId || typeof priceId !== "string") {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
    }

    const base =
      process.env.APP_BASE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],

      success_url: `${base}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/packages`,

      // Ask Stripe Checkout to collect phone
      phone_number_collection: { enabled: true },

      // Prefill email if you collected it earlier
      customer_email: meta?.email || undefined,
      customer_creation: "always",

      // Everything your webhook needs as a fallback
      metadata: {
        appointmentTypeId: String(meta?.appointmentTypeId ?? ""),
        dateTime: String(meta?.dateTime ?? ""),
        email: String(meta?.email ?? ""),
        phone: String(meta?.phone ?? ""),
        packageName: String(meta?.packageName ?? ""),
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: any) {
    console.error("Stripe /checkout error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Stripe error" },
      { status: 500 }
    );
  }
}
