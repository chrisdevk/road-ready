import { Hero } from "@/app/_components/hero";
import { HeroCallout } from "@/app/_components/hero-callout";
import { Highlights } from "@/app/_components/highlights";
import { List } from "@/app/_components/list";
import { ListCard } from "@/app/_components/list-card";
import { TrialSection } from "@/app/_components/trial-section";
import { Callout } from "@/components/callout";

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
        heading="Private, one-to-one Behind-The-Wheel Lessons are available 7 days a week"
        buttonText="Choose plan"
        buttonLink="/packages"
        color="primary"
      />
    </>
  );
}
