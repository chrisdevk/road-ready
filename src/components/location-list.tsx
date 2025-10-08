"use client";

import {
  MapPin,
  Navigation,
  Landmark,
  Building2,
  Map,
} from "lucide-react";

const iconMap = {
  MapPin,
  Navigation,
  Landmark,
  Building2,
  Map,
} as const;

type IconKey = keyof typeof iconMap;

type LocationItem =
  | string
  | {
      id?: string;
      label: string;
      icon?: string; // IconKey (optional)
    };

export default function LocationList({
  locationListItems,
  className = "",
}: {
  locationListItems: LocationItem[];
  className?: string;
}) {
  const normalized = (locationListItems ?? []).map((raw, i) => {
    const asObj =
      typeof raw === "string"
        ? { label: raw, icon: "MapPin" as IconKey }
        : {
            label: raw.label,
            icon: (raw.icon as IconKey) ?? ("MapPin" as IconKey),
            id: raw.id,
          };

    const iconKey: IconKey = iconMap[asObj.icon as IconKey]
      ? (asObj.icon as IconKey)
      : ("MapPin" as IconKey);

    // стабильный уникальный id: предпочитаем переданный, иначе slug(label)+icon+index
    const id =
      (typeof raw !== "string" && raw.id) ||
      `${slugify(asObj.label)}-${iconKey}-${i}`;

    return { id, label: asObj.label, iconKey };
  });

  return (
    <ul className={`grid grid-cols-12 gap-y-3 md:gap-y-5 ${className}`}>
      {normalized.map((item) => {
        const Icon = iconMap[item.iconKey];
        return (
          <li key={item.id} className="flex gap-x-2 col-span-9 md:col-span-3">
            <Icon className="size-5 shrink-0" strokeWidth={1.5} />
            <span>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

function slugify(input: string) {
  return (input || "item")
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/(^-|-$)/g, "");
}
