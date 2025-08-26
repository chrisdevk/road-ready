"use client";
import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const items = [
  { q: "Do you offer simulated lessons?", a: "We provide lesson plans/checklists; on-road training depends on your provider." },
  { q: "Can I practice in my family car?", a: "Yes, if it’s roadworthy and insured. Always follow local regulations." },
];

export default function LessonsAndVehiclesSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="mb-4 text-2xl font-semibold">Lessons & vehicles</h2>
      <Accordion type="single" collapsible className="w-full">
        {items.map((it, i) => (
          <AccordionItem key={i} value={`lv-${i}`}>
            <AccordionTrigger>{it.q}</AccordionTrigger>
            <AccordionContent>{it.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}