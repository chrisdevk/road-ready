"use client";

import BookingModal from "@/components/booking/booking-modal";
import { useBookingModal } from "@/components/booking/bookingModalStore";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useCallback } from "react";

const TRIAL_TYPE_ID = process.env.NEXT_PUBLIC_ACUITY_TRIAL_TYPE_ID;

interface BookingModalClientProps {
  buttonText: string;
  buttonVariant?: "default" | "secondary";
}

export const BookingModalClient = ({
  buttonText,
  buttonVariant = "default",
}: BookingModalClientProps) => {
  const { open } = useBookingModal();
  const handleTrialClick = useCallback(() => {
    open({
      name: "Trial Lesson",
      appointmentTypeId: TRIAL_TYPE_ID ? Number(TRIAL_TYPE_ID) : undefined,
    });
  }, [open]);
  return (
    <>
      <Button onClick={handleTrialClick} variant={buttonVariant}>
        {buttonText} <ArrowUpRight />
      </Button>
      <BookingModal />
    </>
  );
};
