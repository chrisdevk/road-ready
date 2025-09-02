import {
  Ban,
  ClipboardPenLine,
  IdCard,
  LockKeyhole,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { Container } from "./ui/container";

const iconMap = {
  MapPin,
  IdCard,
  LockKeyhole,
  ClipboardPenLine,
  Ban,
} as const;

interface ListCardProps {
  listCardItems: {
    label: string;
    icon: string;
  }[];
}

export const ListCard = ({ listCardItems }: ListCardProps) => {
  return (
    <Container as="section" className="mt-20 md:mt-40">
      <div className="w-full max-w-[960px] mx-auto grid grid-cols-12 bg-primary rounded-2xl">
        <div className="col-span-12 md:col-span-7 relative h-[260px] md:h-auto">
          <Image
            src="/images/person-driving.jpg"
            alt="Person driving"
            fill
            className="rounded-t-2xl md:rounded-t-none md:rounded-l-2xl object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-10 px-5 py-8 md:p-8 md:pt-8 md:pl-10 col-span-12 md:col-span-5 text-white">
          <h2>What’s Included In Every Lesson</h2>
          <ul className="space-y-5">
            {listCardItems.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              return (
                <li key={item.label} className="flex items-center gap-x-2">
                  <Icon className="size-6" strokeWidth={1.5} />
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Container>
  );
};
