// src/lib/acuity.ts
const base = "https://acuityscheduling.com/api/v1";

function authHeader() {
  const u = process.env.ACUITY_API_USER!;
  const p = process.env.ACUITY_API_PASS!;
  const b64 = Buffer.from(`${u}:${p}`).toString("base64");
  return { Authorization: `Basic ${b64}` };
}

export type AcuityAppointmentType = {
  id: number;
  name: string;
  duration: number; // seconds
  price?: number;   // usually cents, verify in your account
  // ...other fields Acuity returns
};

export type AcuityCalendar = { id: number; name: string };

export async function getAppointmentTypes(): Promise<AcuityAppointmentType[]> {
  const r = await fetch(`${base}/appointment-types`, { headers: authHeader(), cache: "no-store" });
  if (!r.ok) throw new Error("Failed to load appointment types");
  return r.json();
}

export async function getCalendars(): Promise<AcuityCalendar[]> {
  const r = await fetch(`${base}/calendars`, { headers: authHeader(), cache: "no-store" });
  if (!r.ok) throw new Error("Failed to load calendars");
  return r.json();
}

export async function getAvailabilityTimes(params: {
  appointmentTypeID: string; calendarID?: string; date?: string;
}) {
  const qs = new URLSearchParams({
    appointmentTypeID: params.appointmentTypeID,
    ...(params.calendarID ? { calendarID: params.calendarID } : {}),
    ...(params.date ? { date: params.date } : {}),
  });
  const r = await fetch(`${base}/availability/times?${qs}`, { headers: authHeader(), cache: "no-store" });
  if (!r.ok) throw new Error("Failed to load availability");
  return r.json();
}

export async function createAppointment(payload: Record<string, any>) {
  const r = await fetch(`${base}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

/** Convenience helpers */
export async function getAppointmentTypeById(id: number) {
  const types = await getAppointmentTypes();
  return types.find(t => t.id === id);
}

/** Normalize price to cents if your Acuity returns decimals. Adjust if needed. */
export function toCents(priceFromAcuity: number | undefined) {
  if (!priceFromAcuity) return 0;
  // Heuristic : if its < 1000 and not an integer-number-of-cents, treat as currency units.
  // e.g. 60 -> 6000; 60.5 -> 6050; 6000 -> 6000
  if (priceFromAcuity < 1000 && Number(priceFromAcuity.toFixed(2)) === priceFromAcuity) {
    return Math.round(priceFromAcuity * 100);
  }
  return Math.round(priceFromAcuity);
}