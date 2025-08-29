import { locationListItems } from "@/lib/constants";
import { Calendar, Clock, LandPlot, Map, MapPin, Phone } from "lucide-react";

const iconMap = {
  LandPlot,
  MapPin,
  Clock,
  Map,
  Phone,
  Calendar,
} as const;

export const LocationList = () => {
  const getIcon = (icon: string) => {
    return iconMap[icon as keyof typeof iconMap];
  };
  return (
    <ul className="grid grid-cols-9 gap-y-10 md:gap-x-28">
      {locationListItems.map((item) => {
        const Icon = getIcon(item.icon);
        return (
          <li
            key={item.label}
            className="flex gap-x-2 col-span-9 md:col-span-3"
          >
            <Icon size={24} />
            <div className="flex flex-col">
              <h4>{item.label}</h4>
              <span dangerouslySetInnerHTML={{ __html: item.value }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};
