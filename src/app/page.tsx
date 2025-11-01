import { Hero } from "@/app/_components/hero";
import { HeroCallout } from "@/app/_components/hero-callout";
import { Highlights } from "@/app/_components/highlights";
import { List } from "@/app/_components/list";
import { TrialSection } from "@/app/_components/trial-section";
import { Callout } from "@/components/callout";
import { ListCard } from "@/components/list-card";
import { Location } from "@/components/location";
import homepage from "@/utils/data/static/homepage.json";
import { Metadata } from "next";

export const revalidate = 86400; // 1 day

export function generateMetadata(): Metadata {
  return {
    title: "Road Ready Driving School",
    description:
      "Las Vegas Driving School - Our DMV-certified instructors help you become a skilled and responsible driver by offering tailored behind-the-wheel lessons",
    keywords:
      "Las Vegas Driving School, DMV-certified instructors, behind-the-wheel lessons, driving lessons, driving test, driving license, driver's education, driver's training, driver's ed, driver's education program, driver's training program, driver's ed program, driver's education course, driver's training course, driver's ed course, driver's education program, driver's training program, driver's ed program, driver's education course, driver's training course, driver's ed course",
    authors: [{ name: "Road Ready Driving School" }],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "Road Ready Driving School",
      description:
        "Las Vegas Driving School - Our DMV-certified instructors help you become a skilled and responsible driver by offering tailored behind-the-wheel lessons",
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

export default function Home() {
  const data = homepage;

  return (
    <>
      <Hero />
      <HeroCallout />
      <List listItems={data.listItems} />
      <Highlights
        highlights={data.highlights}
        scrollListItems={data.scrollListItems}
      />
      <ListCard
        listCardItems={data.listCardItems}
        imageSrc="/images/trial-lesson.jpg"
        imageAlt="Person driving"
      />
      <TrialSection trialAccordionItems={data.trialAccordionItems} />
      <Callout
        heading="Behind-The-Wheel Lessons are available <br className='hidden md:block' /> 7 days a week"
        buttonText="Choose Plan"
        buttonLink="/packages"
        color="primary"
      />
      <Location locationListItems={data.locationListItems} />
      <Callout
        heading="What Are You Waiting For?"
        subheading="Let’s Get You RoadReady"
        buttonText="Book Now"
        buttonLink="/packages"
        color="sand"
      />
    </>
  );
}
