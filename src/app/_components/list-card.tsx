import { listCardItems } from "@/lib/constants";
import {
  Ban,
  ClipboardPenLine,
  IdCard,
  LockKeyhole,
  MapPin,
} from "lucide-react";
import Image from "next/image";

const iconMap = {
  MapPin,
  IdCard,
  LockKeyhole,
  ClipboardPenLine,
  Ban,
} as const;

export const ListCard = () => {
  return (
    <section className="w-full max-w-[960px] mx-auto mt-40 grid grid-cols-12 bg-primary rounded-2xl">
      <div className="col-span-7 relative">
        <Image
          src="/images/person-driving.jpg"
          alt="Person driving"
          fill
          className="rounded-l-2xl object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-10 p-8 pl-10 col-span-5 text-white">
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
    </section>
  );
};
