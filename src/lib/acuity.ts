const ACUITY_BASE = "https://acuityscheduling.com/api/v1";

function b64(s: string) {
  return Buffer.from(s).toString("base64");
}

export function acuityHeaders() {
  const user = process.env.ACUITY_API_USER!;
  const pass = process.env.ACUITY_API_PASS!;
  return {
    Authorization: `Basic ${b64(`${user}:${pass}`)}`,
    "Content-Type": "application/json",
  };
}

/** debug helper to sese wgat the upstream said */
export async function fetchText(input: string, init?: RequestInit) {
  const res = await fetch(input, init);
  const text = await res.text();
  return { res, text };
}

/** Bvuild a full Acuity URL with query params */
export function acuityURL(path: string, params: Record<string, string>) {
  const u = new URL(ACUITY_BASE + path);
  for (const [k, v] of Object.entries(params)) if (v) u.searchParams.set(k, v);
  return u.toString();
}