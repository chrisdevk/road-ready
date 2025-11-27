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
    title: "RoadReady Driving School - Las Vegas Driving Lessons",
    description:
      "Driving lessons in Las Vegas. Flexible 2-25 lesson behind-the-wheel packages for teens and adults. Call, text, or book online. (702) 747-5998",
    keywords:
      "driving lessons Las Vegas, driving school Las Vegas, behind-the-wheel lessons Las Vegas, behind-the-wheel training Las Vegas, DMV test prep Las Vegas, driving instructor Las Vegas, private driving lessons Las Vegas, teen driving lessons Las Vegas, adult driving lessons Las Vegas, car for DMV test Las Vegas, drive test car rental Las Vegas, road test preparation Las Vegas, driving lessons, driving school near me, driving lessons near me, behind-the-wheel lessons, driving instructor near me, behind-the-wheel training, DMV test preparation, road test car rental, driving lessons Summerlin, driving school Summerlin, Summerlin driving instructor, behind-the-wheel lessons Summerlin, driving lessons North Las Vegas, driving school North Las Vegas, North Las Vegas behind-the-wheel lessons, North Las Vegas driving test prep, driving lessons Paradise NV, driving school Paradise NV, Paradise NV behind-the-wheel lessons, Paradise DMV test prep, driving lessons Spring Valley, driving school Spring Valley, Spring Valley behind-the-wheel lessons, Spring Valley driving instructor, DMV test prep Las Vegas, road test Las Vegas, DMV test car Las Vegas, DMV test near me, DMV driving test prep Summerlin, DMV driving test prep North Las Vegas, teen behind-the-wheel lessons Las Vegas, adult behind-the-wheel lessons Las Vegas, driving lessons for beginners Las Vegas, nervous driver lessons Las Vegas, refresher driving lessons Las Vegas, DMV road test practice Las Vegas, DMV test pick-up service Las Vegas, car rental for driving test Las Vegas, DMV test Decatur Las Vegas, Decatur DMV driving test, Decatur DMV driving lessons, behind-the-wheel lessons near Decatur DMV, Decatur DMV road test practice, Decatur DMV test prep, car for DMV test Decatur, DMV test Flamingo Las Vegas, Flamingo DMV driving test, Flamingo DMV driving lessons, behind-the-wheel lessons near Flamingo DMV, Flamingo DMV road test practice, Flamingo DMV test prep, car for DMV test Flamingo, DMV test Sahara Las Vegas, Sahara DMV driving test, Sahara DMV driving lessons, behind-the-wheel lessons near Sahara DMV, Sahara DMV road test practice, Sahara DMV test prep, car for DMV test Sahara",
    authors: [{ name: "RoadReady Driving School" }],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "RoadReady Driving School",
      description:
        "Las Vegas behind-the-wheel lessons with flexible 2–25 lesson packages. Call, text, or book online. (702) 747-5998.",
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
        imageAlt="Student practicing during driving lesson in Las Vegas"
      />
      <TrialSection trialAccordionItems={data.trialAccordionItems} />
      <Callout
        heading="Behind-The-Wheel Lessons <br class='md:hidden' /> are available 7 days a week"
        buttonText="Choose Plan"
        buttonLink="/packages"
        color="primary"
      />
      <Location locationListItems={data.locationListItems} />
      <Callout
        heading="What Are You Waiting For?"
        subheading="Let’s Get You RoadReady"
        buttonText="Book Now"
        buttonVariant="modal"
        color="sand"
        name="Lessons & Packages"
      />
    </>
  );
}
