import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "./ui/container";

interface FaqSliceAccordionProps {
  faqAccordionItems: {
    question: string;
    answer: string;
  }[];
}

export const FaqSliceAccordion = ({
  faqAccordionItems,
}: FaqSliceAccordionProps) => {
  return (
    <Container as="section" className="mt-20 md:mt-40 space-y-10">
      <h2 className="text-center">Driving Lesson FAQ</h2>
      <Accordion
        type="single"
        defaultValue={faqAccordionItems[0].question}
        className="w-full"
      >
        {faqAccordionItems.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger className="text-lg md:text-xl font-semibold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-base">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};
