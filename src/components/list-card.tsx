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

type IconKey = keyof typeof iconMap;

type ListCardItem =
  | string
  | {
      id?: string;
      label: string;
      icon?: string; // will be validated to IconKey
    };

interface ListCardProps {
  listCardItems: ListCardItem[];
  imageSrc: string;
  imageAlt: string;
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/(^-|-$)/g, "");
}

export const ListCard = ({
  listCardItems,
  imageSrc,
  imageAlt,
}: ListCardProps) => {
  // Normalize incoming data: strings -> objects, validate icon, ensure stable id
  const normalized = (listCardItems ?? []).map((raw, i) => {
    const asObj =
      typeof raw === "string"
        ? { label: raw, icon: "MapPin" as IconKey }
        : {
            label: raw.label,
            icon: (raw.icon as IconKey) ?? ("MapPin" as IconKey),
            id: raw.id,
          };

    // Validate icon key; fallback if unknown
    const iconKey: IconKey = iconMap[asObj.icon as IconKey]
      ? (asObj.icon as IconKey)
      : ("MapPin" as IconKey);

    // Stable unique id prefers provided id; else slug(label)+icon+index
    const id =
      (typeof raw !== "string" && raw.id) ||
      `${slugify(asObj.label || `item-${i}`)}-${iconKey}-${i}`;

    return {
      id,
      label: asObj.label,
      iconKey,
    };
  });

  return (
    <Container as="section" className="mt-20 md:mt-40">
      <div className="w-full max-w-[960px] mx-auto grid grid-cols-12 bg-primary rounded-2xl">
        <div className="col-span-12 md:col-span-7 relative h-[260px] md:h-auto">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="rounded-t-2xl md:rounded-t-none md:rounded-l-2xl object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-10 px-5 py-8 md:p-8 md:pt-8 md:pl-10 col-span-12 md:col-span-5 text-white">
          <h2>What’s Included In Every Lesson</h2>
          <ul className="space-y-5">
            {normalized.map((item) => {
              const Icon = iconMap[item.iconKey];
              return (
                <li key={item.id} className="flex items-center gap-x-2">
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
