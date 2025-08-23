import { listItems } from "@/lib/constants";
import {
  CircleCheckBig,
  FileBadge,
  Globe,
  GraduationCap,
  House,
  Scale,
} from "lucide-react";
import { ListSection } from "./list-section";

const iconMap = {
  House,
  FileBadge,
  GraduationCap,
  Globe,
  CircleCheckBig,
  Scale,
} as const;

export const List = () => {
  return (
    <article className="max-w-[1256px] w-full mx-auto px-4 mt-28">
      <h2>Why Choose RoadReady Driving School?</h2>
      <ListSection
        items={listItems.slice(0, 3)}
        imageSrc="/images/la-palms.jpg"
        imageAlt="Why Choose RoadReady Driving School?"
        imagePosition="right"
        imageClasses="rounded-br-2xl rounded-tl-2xl object-cover z-10 ml-4 mt-4"
        overlayClasses="absolute left-0 top-0 size-full bg-amber-100/60 rounded-2xl"
        iconMap={iconMap}
      />
      <ListSection
        items={listItems.slice(3, 6)}
        imageSrc="/images/hands-on-wheel.jpg"
        imageAlt="Driving lesson"
        imagePosition="left"
        imageClasses="rounded-br-2xl rounded-tr-2xl object-cover z-10 -ml-4 mt-4"
        overlayClasses="absolute right-0 top-0 size-full bg-amber-100/60 rounded-2xl"
        iconMap={iconMap}
      />
    </article>
  );
};
