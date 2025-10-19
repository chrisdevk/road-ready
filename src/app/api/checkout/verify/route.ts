import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export const dynamic = "force-dynamic";

// Ensure we always have http/https and build absolute URLs safely
function absolute(baseLike: string, path: string) {
  const base = /^https?:\/\//i.test(baseLike) ? baseLike : `http://${baseLike}`;
  return new URL(path, base).toString();
}

export async function POST(req: Request) {
  try {
    const { priceId, meta } = await req.json().catch(() => ({} as any));
    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
    }

    // Pull from envs; fall back to localhost
    const rawBase =
      process.env.APP_BASE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const successUrl = absolute(rawBase, "/success?session_id={CHECKOUT_SESSION_ID}");
    const cancelUrl  = absolute(rawBase, "/packages");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      phone_number_collection: { enabled: true },
      customer_email: meta?.email || undefined,
      customer_creation: "always",
      metadata: {
        appointmentTypeId: String(meta?.appointmentTypeId ?? ""),
        dateTime: String(meta?.dateTime ?? ""),
        email: String(meta?.email ?? ""),
        phone: String(meta?.phone ?? ""),
        packageName: String(meta?.packageName ?? ""),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe /checkout error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Stripe error" },
      { status: 500 }
    );
  }
}
