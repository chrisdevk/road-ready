const ACUITY_USER = process.env.ACUITY_API_USER!;
const ACUITY_PASS = process.env.ACUITY_API_PASS!;
const ACUITY_BASE = "https://acuityscheduling.com/api/v1";

function b64(s: string) {
  return Buffer.from(s).toString("base64");
}

export function acuityHeaders() {
  return {
    Authorization: `Basic ${b64(`${ACUITY_USER}:${ACUITY_PASS}`)}`,
    "Content-Type": "application/json",
  };
}

export async function getAppointmentTypes() {
  const res = await fetch(`${ACUITY_BASE}/appointment-types`, {
    headers: acuityHeaders(),
    // Acuity likes GET without cache in dev:
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Acuity types failed: ${res.status} ${text}`);
  }
  return res.json(); // array of types
}
