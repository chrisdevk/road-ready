import { Suspense } from "react";
import PayClient from "./pay-client";

export const dynamic = "force-dynamic"; // optional

export default function PayPage() {
  return (
    <Suspense fallback={<p className="text-center p-10">Loading checkout…</p>}>
      <PayClient />
    </Suspense>
  );
}