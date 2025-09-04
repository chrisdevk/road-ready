import { Container } from "@/components/ui/container";
import { LocationList } from "./location-list";

interface LocationProps {
  locationListItems: {
    label: string;
    value: string;
    icon: string;
  }[];
}

export const Location = ({ locationListItems }: LocationProps) => {
  return (
    <Container
      as="section"
      className="flex flex-col md:items-center gap-y-9 mt-20 md:mt-40"
    >
      <h2 className="text-center">Where We Operate</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6447.939583277128!2d-115.28258588863973!3d36.094224407061965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c761634734ed%3A0x59c97a7bbb966775!2s5215%20S%20Durango%20Dr%2C%20Las%20Vegas%2C%20NV%2089113%2C%20USA!5e0!3m2!1sen!2sfr!4v1756027343345!5m2!1sen!2sfr"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full rounded-2xl h-52 md:h-[370px]"
      ></iframe>
      <LocationList locationListItems={locationListItems} />
    </Container>
  );
};
