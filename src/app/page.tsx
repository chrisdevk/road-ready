import { Hero } from "@/app/_components/hero";
import { HeroCallout } from "@/app/_components/hero-callout";
import { Highlights } from "@/app/_components/highlights";
import { List } from "@/app/_components/list";

export default function Home() {
  return (
    <>
      <Hero />
      <HeroCallout />
      <List />
      <Highlights />
    </>
  );
}
