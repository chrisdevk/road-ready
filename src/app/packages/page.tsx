import { Callout } from "@/components/callout";
import { CardGrid } from "@/components/card-grid";
import { FaqSliceAccordion } from "@/components/faq-slice-accordion";
import { ListCard } from "@/components/list-card";
import { Location } from "@/components/location";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import packages from "@/utils/data/static/packages.json";
import { Metadata } from "next";

export const revalidate = 3600; // 1 hour

export function generateMetadata(): Metadata {
  return {
    title: "Driving Lesson Packages - Road Ready Driving School",
    description:
      "Choose the perfect driving lesson package for your needs. Learn at your own pace with DMV-licensed instructors, and build the skills and confidence to drive safely and independently",
    keywords:
      "Driving lesson packages, DMV-licensed instructors, driving lessons, driving test, driving license, driver's education, driver's training, driver's ed, driver's education program, driver's training program, driver's ed program, driver's education course, driver's training course, driver's ed course, driver's education program, driver's training program, driver's ed program, driver's education course, driver's training course, driver's ed course",
    authors: [{ name: "Road Ready Driving School" }],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "Driving Lesson Packages - Road Ready Driving School",
      description:
        "Choose the perfect driving lesson package for your needs. Learn at your own pace with DMV-licensed instructors, and build the skills and confidence to drive safely and independently",
      url: "https://roadreadyvegas.com",
      siteName: "RoadReady Driving School",
      images: [
        {
          url: "https://roadreadyvegas.com/images/hero-img.jpg",
          width: 1200,
          height: 630,
          alt: "RoadReady Driving School",
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "RoadReady Driving School",
      description:
        "Las Vegas Driving School - Our DMV-certified instructors help you become a skilled and responsible driver by offering tailored behind-the-wheel lessons",
      images: ["https://roadreadyvegas.com/images/hero-img.jpg"],
    },
  };
}

export default async function PackagesPage() {
  const data = packages;

  return (
    <>
      <PageHero
        heading="We Teach <br class='md:hidden' /> You Drive"
        subheading="Behind-The-Wheel driving lessons in Las Vegas for teens, adults, and international drivers"
        color="black"
      />
      <article className="mt-20 md:mt-40" id="packages">
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
      <Callout
        heading="Not Sure Where to Start?"
        subheading="Start with our $99 Trial Lesson <br /> Check your current level and get expert <br class='md:hidden' /> guidance for your training plan"
        color="primary"
        buttonVariant="modal"
      />
      <Location locationListItems={data.locationListItems} />
      <Callout
        heading="What Are You Waiting For?"
        subheading="Let’s Get You RoadReady"
        color="sand"
        buttonVariant="modal"
        buttonText="Book Now"
        name="Lessons & Packages"
      />
    </>
  );
}
