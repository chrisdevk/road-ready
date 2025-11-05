"use client";

import BookingModal from "@/components/booking/BookingModal";
import { useBookingModal } from "@/components/booking/bookingModalStore";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";

const TRIAL_TYPE_ID = process.env.NEXT_PUBLIC_ACUITY_TRIAL_TYPE_ID;

type Props = {
  trialAccordionItems?: unknown;
};

export default function TrialSection(_props: Props) {
  const { open } = useBookingModal();

  const onTrialClick = useCallback(() => {
    open({
      name: "Trial Lesson",
      appointmentTypeId: TRIAL_TYPE_ID ? Number(TRIAL_TYPE_ID) : undefined,
    });
  }, [open]);

  return (
    <>
      <section className="mt-24 md:mt-40">
        <Container className="grid gap-10 md:grid-cols-[1fr_520px] items-start">
          <div className="space-y-6">
            <h2 className="text-center md:text-left">Try Before You Commit</h2>
            <p className="text-center md:text-left text-neutral-600">
              Your first lesson sets the tone for your entire driving
              experience…
            </p>
            <div className="flex justify-center md:justify-start">
              <Button onClick={onTrialClick} className="px-6">
                Trial Lesson $99 <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-black/10">
            <Image
              src="/images/trial-lesson.jpg"
              alt="Trial lesson"
              fill
              priority
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <BookingModal />
    </>
  );
}
