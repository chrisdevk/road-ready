import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqAccordionProps {
  title: string;
  id: string;
  items: {
    question: string;
    answer: string;
  }[];
}

export const FaqAccordion = ({ title, items, id }: FaqAccordionProps) => {
  return (
    <div className="space-y-7 scroll-mt-40" id={id}>
      <h2 className="text-primary">{title}</h2>
      <Accordion type="single" defaultValue={items[0].question}>
        {items.map((item) => (
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
    </div>
  );
};
