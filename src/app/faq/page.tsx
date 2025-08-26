import React from "react";
import GeneralInformationSection from "./_components/GeneralInformationSection";
import LessonsAndVehiclesSection from "./_components/LessonsAndVehiclesSection";
import FAQSection from "./_components/FAQSection";

export const metadata = {
  title: "FAQ — RoadReady",
  description: "Common questions about lessons, vehicles, and the RoadReady app.",
};

export default function Page() {
  return (
    <main className="py-8">
      <GeneralInformationSection />
      <LessonsAndVehiclesSection />
      <FAQSection />
    </main>
  );
}