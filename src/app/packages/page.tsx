import { Callout } from "@/components/callout";
import { CardGrid } from "@/components/card-grid";
import { FaqSliceAccordion } from "@/components/faq-slice-accordion";
import { ListCard } from "@/components/list-card";
import { Location } from "@/components/location";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import BookingModal from "@/components/booking/BookingModal";
import packages from "@/utils/data/static/packages.json";

export default async function PackagesPage() {
  const data = packages;

  return (
    <>
      <PageHero
        heading="We Teach - You Drive"
        subheading="Behind-The-Wheel driving lessons in Las Vegas for teens, adults, and international drivers"
        color="black"
      />

      <article className="mt-20 md:mt-40">
        <Container as="section" className="space-y-10">
          <div className="text-center space-y-5 lg:w-[772px] mx-auto">
            <h2>Choose Your Plan</h2>
            <p>
              Select the training package that fits your needs. Learn at your
              own pace with DMV-licensed instructors, and build the skills and
              confidence to drive safely and independently
            </p>
          </div>

          <CardGrid packages={data.packages} />
        </Container>
      </article>

      <ListCard
        listCardItems={data.listCardItems}
        imageSrc="/images/trial-lesson.jpg"
        imageAlt="Person driving"
      />

      <FaqSliceAccordion
        heading="Driving Lesson FAQ"
        faqAccordionItems={data.faqAccordionItems}
      />

      {/* Callout #1 with modal button */}
      <Callout
        heading="Not Sure Where to Start?"
        subheading="Start with our $99 Trial Lesson <br /> Check your current level and get expert guidance for your training plan"
        color="primary"
        buttonSlot={<BookingModal />}
      />

      <Location locationListItems={data.locationListItems} />

      {/* Callout #2 with modal button */}
      <Callout
        heading="What Are You Waiting For?"
        subheading="Let’s Get You RoadReady"
        color="sand"
        buttonSlot={<BookingModal />}
      />
    </>
  );
}