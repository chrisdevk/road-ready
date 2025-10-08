import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

export async function POST(req: Request) {
  const { priceId, metadata } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/packages`,
    metadata,
  });

  return NextResponse.json({ url: session.url });
}

// NOTE: this does not create the actual Acuity appointment yet.
// we wait for the payment to complete, see /src/lib/webhooks.ts
// we can store the metadata.bookingId in your DB to reconcile later if needed.