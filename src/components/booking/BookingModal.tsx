"use client";

import { useEffect, useMemo, useState } from "react";
import { useBookingModal } from "./bookingModalStore";

/**
 * BookingModal
 * - Embeds the Acuity scheduler iframe
 * - Provides a fallback "Open full scheduler" link
 * - Adds a "Pay with Stripe" button that creates a Checkout Session
 */
export default function BookingModal() {
  const { isOpen, ctx, close } = useBookingModal();

  const [isPaying, setIsPaying] = useState(false);

  // Lock page scroll when the modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Public Acuity owner + optional calendar
  const ownerId = process.env.NEXT_PUBLIC_ACUITY_OWNER_ID;
  const calId = process.env.NEXT_PUBLIC_ACUITY_CALENDAR_ID;

  // Viewer timezone (helps Acuity show correct times)
  const tz = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    []
  );

  // Build the iframe src. Keep everything AFTER we have ctx in scope.
  const iframeSrc = useMemo(() => {
    if (!ownerId) return "";
    const typeParam = ctx?.appointmentTypeId
      ? `&appointmentType=${ctx.appointmentTypeId}`
      : "";
    const calParam = calId ? `&calendarID=${calId}` : "";
    const tzParam = tz ? `&timezone=${encodeURIComponent(tz)}` : "";
    // You can also add &date=YYYY-MM-DD to preselect a date if you want.
    return `https://app.acuityscheduling.com/schedule.php?owner=${ownerId}${typeParam}${calParam}${tzParam}&ref=embed`;
  }, [ownerId, calId, tz, ctx?.appointmentTypeId]);

  // Start Stripe Checkout (doesn't depend on the iframe)
  async function startCheckout() {
    if (!ctx?.priceId) return;
    setIsPaying(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: ctx.priceId,
          meta: {
            appointmentTypeId: ctx.appointmentTypeId ?? "",
            packageName: ctx.name ?? "",
          },
        }),
      });

      const text = await res.text(); // tolerate non-JSON error responses
      if (!res.ok) {
        console.error("Checkout failed:", res.status, text);
        return;
      }
      const { url } = JSON.parse(text || "{}");
      if (url) window.location.href = url;
    } catch (e) {
      console.error("Checkout exception:", e);
    } finally {
      setIsPaying(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={close} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {ctx?.name ? `Book: ${ctx.name}` : "Book a Lesson"}
          </h2>
          <button
            type="button"
            aria-label="Close"
            className="rounded p-1 text-gray-500 hover:bg-gray-100"
            onClick={close}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-0">
          {iframeSrc ? (
            <iframe
              title="Acuity Scheduler"
              src={iframeSrc}
              width="100%"
              height={720}
              allow="payment *"
              style={{ border: 0, display: "block" }}
            />
          ) : (
            <div className="p-6 text-sm text-red-600">
              Missing NEXT_PUBLIC_ACUITY_OWNER_ID
            </div>
          )}
        </div>

        {/* Footer: fallback link + Stripe button */}
        <div className="p-4 border-t flex items-center justify-between gap-3">
          <a
            href={
              ownerId
                ? `https://app.acuityscheduling.com/schedule.php?owner=${ownerId}${
                    ctx?.appointmentTypeId
                      ? `&appointmentType=${ctx.appointmentTypeId}`
                      : ""
                  }${calId ? `&calendarID=${calId}` : ""}${
                    tz ? `&timezone=${encodeURIComponent(tz)}` : ""
                  }`
                : "#"
            }
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-600 underline"
          >
          </a>

          {!!ctx?.priceId && (
            <button
              type="button"
              className="rounded-xl bg-black text-white px-4 py-2 disabled:opacity-60"
              onClick={startCheckout}
              disabled={isPaying}
            >
              {isPaying ? "Redirecting…" : "Pay with Stripe"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

