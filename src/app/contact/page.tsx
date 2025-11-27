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
      url: "https://roadreadyvegas.com",
      siteName: "RoadReady Driving School",
      images: [
        {
          url: "https://roadreadyvegas.com/images/hero-img.webp",
          width: 1200,
          height: 630,
          alt: "RoadReady Driving School",
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "RoadReady Driving School",
      description:
        "Las Vegas Driving School - Our DMV-certified instructors help you become a skilled and responsible driver by offering tailored behind-the-wheel lessons",
      images: ["https://roadreadyvegas.com/images/hero-img.webp"],
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
        heading="What Are You Waiting For?"
        subheading="Let’s Get You RoadReady"
        color="sand"
        buttonVariant="modal"
        buttonText="Book Now"
        name="Lessons & Packages"
      />
    </>
  );
}
