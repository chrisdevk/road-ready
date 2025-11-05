import { HighlightStack } from "@/app/_components/highlight-stack";
import { Container } from "@/components/ui/container";
import { ScrollList } from "./scroll-list";

interface HighlightsProps {
  highlights: {
    heading: string;
    subheading: string;
    icon: string;
  }[];
  scrollListItems: {
    key: string;
    value: string;
  }[];
}

export const Highlights = ({
  highlights,
  scrollListItems,
}: HighlightsProps) => {
  return (
    <article className="bg-black mt-20 md:mt-40 py-20 text-white">
      <Container as="section">
        <div className="flex flex-col items-center gap-y-4 text-center">
          <h2>
            What Will You Learn During Behind-
            <br className="hidden md:block" />
            The-Wheel Lessons?
          </h2>
          <p className="text-center text-lg">
            Key Elements of <strong>Defensive Driving.</strong> It’s about
            staying alert, prepared and in control.{" "}
            <br className="hidden md:block" /> Here’s what we focus on
          </p>
        </div>
        <HighlightStack highlights={highlights} />
        <ScrollList scrollListItems={scrollListItems} />
      </Container>
    </article>
  );
};
