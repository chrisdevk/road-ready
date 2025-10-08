"use client";

import { useEffect, useMemo, useState } from "react";
import { useBookingModal } from "./bookingModalStore";

export default function BookingModal() {
  const { isOpen, ctx, close } = useBookingModal();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const ownerId = process.env.NEXT_PUBLIC_ACUITY_OWNER_ID;

  const src = useMemo(() => {
    if (!ownerId) return "";
    const typeParam = ctx?.appointmentTypeId ? `&appointmentType=${ctx.appointmentTypeId}` : "";
    return `https://app.acuityscheduling.com/schedule.php?owner=${ownerId}${typeParam}&ref=embed`;
  }, [ownerId, ctx?.appointmentTypeId]);

  if (!isOpen) return null;

  async function startCheckout() {
    if (!ctx?.priceId) return;
    try {
      setIsCheckingOut(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: ctx.priceId, metadata: { packageName: ctx.name ?? "" } }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50" onClick={close} />
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <button
          type="button"
          aria-label="Close"
          className="absolute right-3 top-3 rounded p-1 text-gray-500 hover:bg-gray-100"
          onClick={close}
        >
          ✕
        </button>

        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">
            {ctx?.name ? `Book: ${ctx.name}` : "Book a Lesson"}
          </h2>
        </div>

        <div className="p-0">
          {src ? (
            <iframe
              title="Acuity Scheduler"
              src={src}
              width="100%"
              height={720}
              allow="payment *"
              style={{ border: 0, display: "block" }}
            />
          ) : (
            <div className="p-6 text-sm text-red-600">Missing NEXT_PUBLIC_ACUITY_OWNER_ID</div>
          )}
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          {!!ctx?.priceId && (
            <button
              type="button"
              className="rounded-xl bg-black text-white px-4 py-2 disabled:opacity-60"
              onClick={startCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? "Redirecting…" : "Pay with Stripe"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
