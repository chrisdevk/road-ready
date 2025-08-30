import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/cn";
import { trialAccordionItems } from "@/lib/constants";
import { Check } from "lucide-react";
import Image from "next/image";

export const TrialAccordion = () => {
  return (
    <Accordion
      type="single"
      defaultValue={trialAccordionItems[0].question}
      className="col-span-2 md:col-span-1"
    >
      {trialAccordionItems.map((item) => (
        <AccordionItem value={item.question} key={item.question}>
          <AccordionTrigger>
            <h3>{item.question}</h3>
          </AccordionTrigger>
          <AccordionContent
            className={cn(item.list && item.answer && "space-y-6")}
          >
            {!!item.answer && (
              <p dangerouslySetInnerHTML={{ __html: item.answer }} />
            )}
            {item.list && (
              <ul className="space-y-2 text-neutral-600">
                {item.list.map((item) => (
                  <li
                    key={item.key}
                    className="text-base flex items-center gap-2"
                  >
                    <Check className="text-primary" />
                    {item.value}
                  </li>
                ))}
              </ul>
            )}
            <div className="relative bg-primary h-[260px] md:h-full md:hidden overflow-hidden rounded-2xl">
              <Image
                src="/images/trial-lesson.jpg"
                alt="Trial lesson"
                fill
                className="rounded-2xl object-cover mt-4 ml-4"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
