"use client";
import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const items = [
  { q: "Who is RoadReady for?", a: "New learners, parents, and drivers refreshing their knowledge." },
  { q: "Is the course recognized?", a: "Content aligns with common DMV expectations; confirm local rules." },
];

export default function GeneralInformationSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="mb-4 text-2xl font-semibold">General information</h2>
      <Accordion type="single" collapsible className="w-full">
        {items.map((it, i) => (
          <AccordionItem key={i} value={`general-${i}`}>
            <AccordionTrigger>{it.q}</AccordionTrigger>
            <AccordionContent>{it.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}