import { ContactForm } from "@/app/contact/_components/contact-form";
import { Callout } from "@/components/callout";
import { Location } from "@/components/location";
import { PageHero } from "@/components/page-hero";
import contact from "@/utils/data/static/homepage.json";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Contact Us - Road Ready Driving School",
    description: "Contact Us with RoadReady Driving School",
    keywords: "Contact Us, RoadReady, Contact Us, Contact Us Form",
    authors: [{ name: "Road Ready Driving School" }],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "Contact Us - Road Ready Driving School",
      description: "Contact Us with RoadReady Driving School",
      url: "https://roadready.com",
      siteName: "Road Ready Driving School",
      images: [
        {
          url: "/images/hero-img.jpg",
          width: 1200,
          height: 630,
          alt: "Road Ready Driving School",
        },
      ],
      type: "website",
      locale: "en_US",
    },
  };
}

export default function ContactPage() {
  const data = contact;
  return (
    <>
      <PageHero
        heading="Contact Us"
        subheading="Have questions about your lessons or test? We’re here to help!"
        color="primary"
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
