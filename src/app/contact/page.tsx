import { ContactForm } from "@/app/contact/_components/contact-form";
import { Callout } from "@/components/callout";
import { Location } from "@/components/location";
import { PageHero } from "@/components/page-hero";
import contact from "@/utils/data/static/homepage.json";

export default function ContactPage() {
  const data = contact;
  return (
    <>
      <PageHero
        heading="Contact Us"
        subheading="Have questions about your lessons or test? We’re here to help!"
        color="black"
      />
      <ContactForm />
      <Location locationListItems={data.locationListItems} />
      <Callout
        heading="Ready to Pass With Confidence?"
        subheading="Choose your plan and secure your test day"
        buttonText="Book Now"
        buttonLink="/packages"
        color="sand"
      />
    </>
  );
}
