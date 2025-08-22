import { listItems } from "@/lib/constants";
import {
  CircleCheckBig,
  FileBadge,
  Globe,
  GraduationCap,
  House,
  Scale,
} from "lucide-react";
import Image from "next/image";

const iconMap = {
  House,
  FileBadge,
  GraduationCap,
  Globe,
  CircleCheckBig,
  Scale,
} as const;

export const List = () => {
  const getIcon = (icon: string) => {
    return iconMap[icon as keyof typeof iconMap];
  };

  return (
    <article className="space-y-10 max-w-[1256px] w-full mx-auto px-4 mt-28">
      <h2>Why Choose RoadReady Driving School?</h2>
      <section className="grid grid-cols-12 gap-x-12">
        <ul className="flex flex-col gap-10 col-span-12 md:col-span-7">
          {listItems.slice(0, 3).map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <li className="flex gap-x-6">
                <div className="flex flex-col items-center gap-y-5">
                  <Icon className="size-10" />
                  <div className="w-px h-full bg-neutral-500" />
                </div>
                <div className="flex flex-col gap-y-2">
                  <h3>{item.heading}</h3>
                  <p>{item.subheading}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="col-span-5 relative overflow-hidden rounded-2xl">
          <Image
            src="/images/la-palms.jpg"
            alt="Why Choose RoadReady Driving School?"
            fill
            className="rounded-br-2xl rounded-tl-2xl object-cover z-10 ml-4 mt-4"
          />
          <div className="absolute left-0 top-0 size-full bg-amber-100/60 rounded-2xl" />
        </div>
      </section>
      <section className="grid grid-cols-12 gap-x-12 mt-24">
        <ul className="flex flex-col gap-10 col-span-12 md:col-span-7 order-2">
          {listItems.slice(3, 6).map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <li className="flex gap-x-6">
                <div className="flex flex-col items-center gap-y-5">
                  <Icon className="size-10" />
                  <div className="w-px h-full bg-neutral-500" />
                </div>
                <div className="flex flex-col gap-y-2">
                  <h3>{item.heading}</h3>
                  <p>{item.subheading}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="col-span-5 relative overflow-hidden order-1 rounded-2xl">
          <Image
            src="/images/hands-on-wheel.jpg"
            alt="Driving lesson"
            fill
            className="rounded-br-2xl rounded-tr-2xl object-cover z-10 -ml-4 mt-4"
          />
          <div className="absolute right-0 top-0 size-full bg-amber-100/60 rounded-2xl" />
        </div>
      </section>
    </article>
  );
};
