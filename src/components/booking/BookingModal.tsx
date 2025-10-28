// src/components/booking/BookingModal.tsx
"use client";

import { useEffect, useMemo } from "react";
import { useBookingModal } from "./bookingModalStore";

export default function BookingModal() {
  // 1) Always call hooks in the same order
  const { isOpen, ctx, close } = useBookingModal();

  // 2) Read envs (strings) and derive once; keep hooks unconditionally
  const ownerId = process.env.NEXT_PUBLIC_ACUITY_OWNER_ID;
  const calendarId = process.env.NEXT_PUBLIC_ACUITY_CALENDAR_ID;

  const tz = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    []
  );

  // Build iframe src — also always computed via a hook
  const src = useMemo(() => {
    if (!ownerId) return "";
    const parts: string[] = [
      `owner=${ownerId}`,
      ctx?.appointmentTypeId ? `appointmentType=${ctx.appointmentTypeId}` : "",
      calendarId ? `calendarID=${calendarId}` : "",
      `timezone=${encodeURIComponent(tz)}`,
      "ref=embed",
    ].filter(Boolean);
    return `https://app.acuityscheduling.com/schedule.php?${parts.join("&")}`;
  }, [ownerId, calendarId, tz, ctx?.appointmentTypeId]);

  // Lock body scroll — hook called unconditionally
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  // Conditional rendering

  if (!isOpen) return null;

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
              style={{ border: 0, display: "block" }}
              allow="payment *; clipboard-write *"
            />
          ) : (
            <div className="p-6 text-sm text-red-600">
              Missing NEXT_PUBLIC_ACUITY_OWNER_ID
            </div>
          )}
        
        </div>
      </div>
    </div>
  );
}
