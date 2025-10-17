"use client";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [status, setStatus] = useState<"loading"|"paid"|"unpaid"|"error">("loading");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get("session_id");
    if (!sessionId) { setStatus("unpaid"); return; }

    (async () => {
      try {
        const res = await fetch(
          `/api/checkout/verify?session_id=${encodeURIComponent(sessionId)}`,
          { cache: "no-store" }
        );
        if (!res.ok) { setStatus("error"); return; }
        const json = await res.json();
        if (json?.payment_status === "paid") {
          setStatus("paid");
          setEmail(json?.customer_email ?? null);
        } else {
          setStatus("unpaid");
        }
      } catch {
        setStatus("error");
      }
    })();
  }, []);

  return (
    <main className="container mx-auto max-w-2xl py-16">
      <h1 className="text-3xl font-semibold mb-4">Thank you!</h1>
      {status === "loading" && <p>Verifying your payment…</p>}
      {status === "paid" && (
        <p>Payment received. We’re creating your lesson in the calendar. You’ll get a confirmation email{email ? ` at ${email}` : ""} in a moment.</p>
      )}
      {status === "unpaid" && <p>We couldn’t verify the payment. If you think this is a mistake, please contact us.</p>}
      {status === "error" && <p>Something went wrong while verifying. Please contact support.</p>}
    </main>
  );
}
