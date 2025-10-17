import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("session_id");
  if (!id) return NextResponse.json({ error: "missing session_id" }, { status: 400 });

  const session = await stripe.checkout.sessions.retrieve(id);
  return NextResponse.json({
    id: session.id,
    payment_status: session.payment_status,
    customer_email: session.customer_details?.email ?? session.customer_email ?? null,
    metadata: session.metadata ?? null,
  });
}
