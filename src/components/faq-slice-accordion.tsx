import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "./ui/container";

interface FaqItem {
  question: string;
  answer?: string;
}

interface FaqSliceAccordionProps {
  faqAccordionItems: FaqItem[];
  heading?: string;
}

export const FaqSliceAccordion = ({
  faqAccordionItems,
  heading,
}: FaqSliceAccordionProps) => {
  return (
    <Container as="section" className="mt-20 md:mt-40 space-y-10">
      {heading && <h2 className="text-center">{heading}</h2>}

      <Accordion
        type="single"
        defaultValue={faqAccordionItems[0]?.question}
        className="w-full"
      >
        {faqAccordionItems.map((item) => {
          return (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-lg md:text-xl font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-neutral-600">
                <div dangerouslySetInnerHTML={{ __html: item.answer ?? "" }} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Container>
  );
};
