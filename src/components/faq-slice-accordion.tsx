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
  heading?: string;
}

export const FaqSliceAccordion = ({
  faqAccordionItems,
  heading,
}: FaqSliceAccordionProps) => {
  return (
    <Container as="section" className="mt-20 md:mt-40 space-y-10">
      <h2 className="text-center">{heading}</h2>
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
<AccordionContent className="text-base text-neutral-600">
  {typeof item.answerHtml === "string" && item.answerHtml.length > 0 ? (
    <div dangerouslySetInnerHTML={{ __html: item.answerHtml }} />
  ) : (
    
    <p>{(item as any).answer ?? ""}</p>
  )}
</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};
