import { Hero } from "@/app/_components/hero";
import { HeroCallout } from "@/app/_components/hero-callout";
import { Highlights } from "@/app/_components/highlights";
import { List } from "@/app/_components/list";
import { Location } from "@/app/_components/location";
import { TrialSection } from "@/app/_components/trial-section";
import { Callout } from "@/components/callout";
import { ListCard } from "@/components/list-card";
import { Testimonials } from "@/components/testimonials/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <HeroCallout />
      <List />
      <Highlights />
      <ListCard />
      <TrialSection />
      <Callout
        heading="Behind-The-Wheel Lessons are available <br className='hidden md:block' /> 7 days a week"
        buttonText="Choose Plan"
        buttonLink="/packages"
        color="primary"
      />
      <Location />
      <Callout
        heading="What Are You Waiting For?"
        subheading="Let’s Get You RoadReady"
        buttonText="Book Now"
        buttonLink="/packages"
        color="sand"
      />
      <Testimonials />
    </>
  );
}
