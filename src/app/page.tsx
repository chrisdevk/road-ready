import { Hero } from "@/app/_components/hero";
import { HeroCallout } from "@/app/_components/hero-callout";
import { Highlights } from "@/app/_components/highlights";
import { List } from "@/app/_components/list";
import { TrialSection } from "@/app/_components/trial-section";
import { Callout } from "@/components/callout";
import { ListCard } from "@/components/list-card";
import { Location } from "@/components/location";
import homepage from "@/utils/data/static/homepage.json";
import BookingModal from "@/components/booking/BookingModal";
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
        imageSrc="/images/person-driving.jpg"
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
