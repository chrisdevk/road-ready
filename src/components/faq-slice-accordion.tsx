import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "./ui/container";

interface FaqItem {
  question: string;
  answer?: string;      // plain text answer
  answerHtml?: string;  // HTML answer
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
          // Prefer HTML if present; fallback to plain answer
          const htmlContent = item.answerHtml ?? "";
          const textContent = item.answer ?? "";

          return (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-lg md:text-xl font-semibold">
                {item.question}
              </AccordionTrigger>

              <AccordionContent className="text-base text-neutral-600">
                {htmlContent ? (
                  <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                ) : (
                  <p>{textContent}</p>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Container>
  );
};