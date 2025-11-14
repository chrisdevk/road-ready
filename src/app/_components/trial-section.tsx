import { TrialAccordion } from "@/app/_components/trial-accordion";
import BookingModal from "@/components/booking/booking-modal";
import { BookingModalClient } from "@/components/booking/booking-modal.client";
import { Container } from "@/components/ui/container";
import Image from "next/image";

interface TrialSectionProps {
  trialAccordionItems: {
    question: string;
    answer: string | null;
    list: {
      key: string;
      value: string;
    }[];
  }[];
}

export const TrialSection = ({ trialAccordionItems }: TrialSectionProps) => {
  return (
    <>
      <article className="mt-20 md:mt-40 space-y-20">
        <Container as="section" className="text-center space-y-9">
          <div className="flex flex-col gap-y-5">
            <h2>Try Before You Commit</h2>
            <p>
              Your first lesson sets the tone for your entire driving
              experience. With our trial lesson, you’ll gain the{" "}
              <br className="hidden md:block" /> confidence, support, and
              direction you need to move forward with ease
            </p>
          </div>
          <BookingModalClient
            buttonText="Trial Lesson $99"
            appointmentTypeId={83262547}
          />
        </Container>
        <Container as="section" className="grid grid-cols-2 gap-x-13">
          <TrialAccordion trialAccordionItems={trialAccordionItems} />
          <div className="relative col-span-2 md:col-span-1 bg-primary h-full overflow-hidden rounded-2xl">
            <Image
              src="/images/person-driving.jpg"
              alt="Trial lesson"
              fill
              className="rounded-2xl object-cover mt-4 ml-4"
            />
          </div>
        </Container>
      </article>
      <BookingModal />
    </>
  );
};
