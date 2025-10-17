"use client";

import { useEffect, useMemo, useState } from "react";
import { useBookingModal } from "./bookingModalStore";
import { Button } from "@/components/ui/button";

/** Normalize timezone offsets like +0200 → +02:00 so Date() can parse (for display only) */
function normalizeISO(s?: string) {
  return s ? s.replace(/([+-]\d{2})(\d{2})$/, "$1:$2") : "";
}

type AcuityTime = { time?: string; datetime?: string };
const has = (v: unknown) => (typeof v === "string" ? v.trim().length > 0 : Boolean(v));

/** Make a friendly label from YYYY-MM-DD without shifting the actual day */
function labelFromYYYYMMDD(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  const js = new Date(Date.UTC(y, (m ?? 1) - 1, day ?? 1, 12, 0, 0)); // UTC noon = no wrap-around
  return js.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

export default function BookingModal() {
  const { isOpen, ctx, close } = useBookingModal();

  const [dates, setDates] = useState<string[]>([]);
  const [times, setTimes] = useState<AcuityTime[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const appointmentTypeId = (ctx?.appointmentTypeId as string | number | undefined) ?? undefined;
  const priceId = (ctx?.priceId as string | undefined) ?? undefined;
  const pkgName = (ctx?.name as string | undefined) ?? undefined;

  const tz = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    []
  );

  const month = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  }, []);

  const timeFmt = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: tz,
      }),
    [tz]
  );

  /** Reset + prefill when modal opens */
  useEffect(() => {
    if (!isOpen) return;

    setErr(null);
    setSelectedDate("");
    setSelectedDateTime("");
    setTimes([]);

    if (has(ctx?.email)) setEmail(String(ctx!.email));
    if (has(ctx?.phone)) setPhone(String(ctx!.phone));
  }, [isOpen, ctx?.email, ctx?.phone]);

  /** Load available dates (forward timezone!) */
  useEffect(() => {
    if (!isOpen || !appointmentTypeId) return;

    (async () => {
      try {
        setErr(null);
        const url = `/api/acuity/availability/dates?type=${appointmentTypeId}&month=${month}&timezone=${encodeURIComponent(
          tz
        )}`;
        const res = await fetch(url, { cache: "no-store" });
        const json = await res.json();

        if (!res.ok || json?.error) {
          setDates([]);
          setErr(json?.error || "Failed to load dates.");
          return;
        }

        const arr: string[] = Array.isArray(json?.dates)
          ? json.dates.map((d: any) => d?.date ?? d)
          : [];
        setDates(arr);
      } catch {
        setDates([]);
        setErr("Failed to load dates.");
      }
    })();
  }, [isOpen, appointmentTypeId, tz, month]);

  /** Load times once a date is chosen (forward timezone!) */
  useEffect(() => {
    if (!selectedDate || !appointmentTypeId) return;

    (async () => {
      try {
        setErr(null);
        setTimes([]);
        setSelectedDateTime("");

        const url = `/api/acuity/availability/times?type=${appointmentTypeId}&date=${selectedDate}&timezone=${encodeURIComponent(
          tz
        )}`;
        const res = await fetch(url, { cache: "no-store" });
        const json = await res.json();

        if (!res.ok || json?.error) {
          setTimes([]);
          setErr(json?.error || "Failed to load times.");
          return;
        }

        const arr: AcuityTime[] = Array.isArray(json?.times)
          ? json.times.map((x: any) =>
              typeof x === "string" ? { datetime: x } : { time: x.time, datetime: x.datetime ?? x.time }
            )
          : [];
        setTimes(arr);
      } catch {
        setTimes([]);
        setErr("Failed to load times.");
      }
    })();
  }, [selectedDate, appointmentTypeId, tz]);

  async function onPay() {
    try {
      setErr(null);
      if (!has(priceId) || !has(selectedDateTime) || !has(email) || !has(phone)) {
        setErr("Please select a date & time, and enter email & phone.");
        return;
      }
      setLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          meta: {
            appointmentTypeId,
            // send EXACT datetime from Acuity (only normalize for display elsewhere)
            dateTime: selectedDateTime,
            email,
            phone,
            packageName: pkgName,
          },
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        setErr(text || "Failed to create checkout session.");
        return;
      }

      const json = await res.json();
      if (json?.url) {
        window.location.href = json.url;
      } else {
        setErr(json?.error || "Failed to create checkout session.");
      }
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={close} />
      <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl overflow-hidden">
        <button
          type="button"
          aria-label="Close"
          className="absolute right-3 top-3"
          onClick={close}
        >
          ✕
        </button>

        <div className="p-5 space-y-4">
          <h3 className="text-xl font-semibold">{pkgName || "Lesson"}</h3>

          {/* Dates */}
          <div>
            <label className="block text-sm font-medium mb-2">Choose a date</label>
            <div className="flex flex-wrap gap-2">
              {dates.map((d) => (
                <button
                  type="button"
                  key={d}
                  className={`px-3 py-2 rounded border ${
                    selectedDate === d ? "bg-black text-white" : "bg-white"
                  }`}
                  onClick={() => setSelectedDate(d)}
                >
                  {labelFromYYYYMMDD(d)}
                </button>
              ))}
              {dates.length === 0 && (
                <div className="text-sm text-neutral-500">No dates available</div>
              )}
            </div>
          </div>

          {/* Times */}
          <div>
            <label className="block text-sm font-medium mb-2">Choose a time</label>
            <div className="flex flex-wrap gap-2">
              {times.map((t) => {
                const norm = normalizeISO(t.datetime || "");
                const value = has(norm) ? norm : t.datetime || t.time || "";

                let label = t.time || "";
                if (!label && has(norm)) {
                  const d = new Date(norm);
                  label = Number.isNaN(d.getTime()) ? (norm as string) : timeFmt.format(d);
                }

                return (
                  <button
                    type="button"
                    key={t.datetime || `${t.time}-${selectedDate}`}
                    className={`px-3 py-2 rounded border ${
                      selectedDateTime === value ? "bg-black text-white" : "bg-white"
                    }`}
                    onClick={() => setSelectedDateTime(String(value))}
                  >
                    {label || "—"}
                  </button>
                );
              })}
              {selectedDate && times.length === 0 && (
                <div className="text-sm text-neutral-500">No times on this date</div>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email for confirmation</label>
            <input
              type="email"
              className="w-full max-w-sm border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              className="w-full max-w-sm border rounded px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(702) 555-1212"
              autoComplete="tel"
            />
          </div>

          {/* Pay */}
          <div className="pt-2">
            <Button type="button" disabled={loading} onClick={onPay}>
              {loading ? "Redirecting…" : "Pay & Confirm"}
            </Button>
            {err && <div className="text-red-600 text-sm mt-2">{err}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
