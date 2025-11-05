import { Callout } from "@/components/callout";
import { CardGrid } from "@/components/card-grid";
import { FaqSliceAccordion } from "@/components/faq-slice-accordion";
import { ListCard } from "@/components/list-card";
import { Location } from "@/components/location";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import driveTest from "@/utils/data/static/drive-test.json";
import { Metadata } from "next";

export const revalidate = 86400; // 1 day

export function generateMetadata(): Metadata {
  return {
    title: "Drive Test - Road Ready Driving School",
    description: "Prepare for your Driving Test with RoadReady Driving School",
    keywords: "Drive Test, RoadReady, Driving Test, Driving Test Preparation",
    authors: [{ name: "Road Ready Driving School" }],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "Drive Test - Road Ready Driving School",
      description:
        "Prepare for your Driving Test with RoadReady Driving School",
      url: "https://roadready.com",
      siteName: "Road Ready Driving School",
      images: [
        {
          url: "/images/hero-img.jpg",
          width: 1200,
          height: 630,
          alt: "Road Ready Driving School",
        },
      ],
      type: "website",
      locale: "en_US",
    },
  };
}

export default function DriveTestPage() {
  const data = driveTest;
  return (
    <>
      <PageHero
        heading="Stay Ready <br/> Pass Easy"
        subheading="Quick warm-up session, full plan, or just a car, we’ll lead you to your Drive Test calm and confident"
        color="black"
      />
      <article className="mt-20 md:mt-40 scroll-mt-40" id="packages">
        <Container as="section" className="space-y-10">
          <div className="text-center space-y-5">
            <h2>Drive Test In Las Vegas</h2>
            <p>
              Taking your Driving Test can feel overwhelming, but you don’t have
              to do it alone. With RoadReady Driving School, you’ll have
              DMV-certified instructors, proven guidance, and the reassurance
              that someone has your back every step of the way
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
        faqAccordionItems={data.faqAccordionItems}
        heading="Drive Test FAQ"
      />
      <Callout
        heading="Looking for more options?"
        subheading="See all driving lesson packages"
        color="primary"
        buttonText="Choose Plan"
        buttonLink="/packages#packages"
      />
      <Location locationListItems={data.locationListItems} />
      <Callout
        heading="Ready to Pass With Confidence?"
        subheading="Choose your plan and secure your test day"
        buttonText="Book Now"
        buttonLink="#packages"
        color="sand"
        // buttonSlot={<BookingModal />}
      />
    </>
  );
}
