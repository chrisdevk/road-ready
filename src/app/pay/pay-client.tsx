"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import packages from "@/utils/data/static/packages.json";

function findPriceIdByAcuityTypeId(acuityTypeId?: string | null) {
  if (!acuityTypeId) return null;
  const idNum = Number(acuityTypeId);
  const pkg = (packages as any).packages?.find(
    (p: any) => Number(p.acuityTypeId) === idNum
  );
  return pkg?.stripePriceId ?? null;
}

export default function PayClient() {
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const typeId = params.get("type"); // %appointmentTypeID%
  const priceId = useMemo(() => findPriceIdByAcuityTypeId(typeId), [typeId]);

  useEffect(() => {
    const go = async () => {
      try {
        if (!priceId) {
          setError("Could not match appointment type to a Stripe price.");
          setLoading(false);
          return;
        }

        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            priceId,
            metadata: {
              appointmentTypeId: typeId ?? "",
              appointmentId: params.get("appt") ?? "",
              email: params.get("email") ?? "",
            },
          }),
        });

        if (!res.ok) {
          const txt = await res.text();
          setError(txt || "Checkout failed.");
          setLoading(false);
          return;
        }

        const { url } = await res.json();

        // Redirect (even if inside Acuity iframe)
        if (typeof window !== "undefined" && url) {
          if (window.top && window.top !== window.self) {
            window.top.location.href = url;
          } else {
            window.location.href = url;
          }
        } else {
          setError("No checkout URL returned.");
          setLoading(false);
        }
      } catch (e) {
        setError("Network error while creating checkout.");
        setLoading(false);
      }
    };

    go();
  }, [priceId, params, typeId]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-3">Preparing payment…</h1>
        {loading && <p>Please wait a moment.</p>}
        {error && (
          <>
            <p className="text-red-600 mb-3">{error}</p>
            <p>
              If this persists, contact support and include your appointment
              type: <code>{typeId}</code>.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
