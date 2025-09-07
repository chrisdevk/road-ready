import { TableOfContent } from "@/app/faq/_components/tableOfContent";
import { Callout } from "@/components/callout";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import faq from "@/utils/data/static/faq.json";
import { FaqAccordion } from "./_components/faq-accordion";

export const metadata = {
  title: "FAQ — RoadReady",
  description:
    "Common questions about lessons, vehicles, and the RoadReady app.",
};

export default function FaqPage() {
  const data = faq;
  return (
    <>
      <PageHero
        heading="FAQ"
        subheading="Find answers to the most common questions about our lessons and services.<br /> If you don’t see what you’re looking for, feel free to contact us"
        color="primary"
      />
      <Container
        as="section"
        className="grid grid-cols-12 gap-y-20 md:gap-x-20 mt-20 md:mt-40 relative"
      >
        <TableOfContent tableOfContent={data.tableOfContent} />
        <div className="col-span-12 md:col-span-8 space-y-20">
          {data.sections.map((section) => (
            <FaqAccordion
              key={section.id}
              title={section.title}
              items={section.items}
              id={section.id}
            />
          ))}
        </div>
      </Container>
      <Callout
        heading="What Are You Waiting For?"
        subheading="Let’s Get You RoadReady"
        color="sand"
        buttonText="Book Now"
        buttonLink="/packages"
      />
    </>
  );
}
