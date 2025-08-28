"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    q: "How much does RoadReady cost?",
    a: "Core resources are free; premium modules may require a subscription.",
  },
  {
    q: "Do you issue certificates?",
    a: "We provide completion proof for some modules; acceptance varies by region.",
  },
];

export default function FAQSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="mb-4 text-2xl font-semibold">FAQ</h2>
      <Accordion type="multiple" className="w-full">
        {items.map((it, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>{it.q}</AccordionTrigger>
            <AccordionContent>{it.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
