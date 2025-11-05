"use client";

import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/components/booking/bookingModalStore";

export default function TrialCta() {
  const { open } = useBookingModal();

  return (
    <Button
      onClick={() =>
        open({
          // what user will see at top of the modal
          name: "Trial Lesson – 90 minutes",

          // 
          

          // 
          priceId: "price_trial_90m_99usd",
        })
      }
      className="px-6"
    >
      Trial Lesson $99
    </Button>
  );
}