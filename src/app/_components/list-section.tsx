import { ListItem } from "@/app/_components/list-item";
import { cn } from "@/lib/cn";
import { listItems } from "@/lib/constants";
import Image from "next/image";

interface ListSectionProps {
  items: typeof listItems;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  imageClasses: string;
  overlayClasses: string;
  iconMap: Record<string, React.ElementType>;
}

export const ListSection = ({
  items,
  imageSrc,
  imageAlt,
  imagePosition,
  imageClasses,
  overlayClasses,
  iconMap,
}: ListSectionProps) => {
  return (
    <section
      className={cn(
        "grid grid-cols-12 gap-x-12 mt-10",
        imagePosition === "left" && "mt-24"
      )}
    >
      <ul
        className={cn(
          "flex flex-col gap-10 col-span-12 md:col-span-7",
          imagePosition === "left" && "order-2"
        )}
      >
        {items.map((item) => {
          return <ListItem key={item.heading} {...item} iconMap={iconMap} />;
        })}
      </ul>
      <div
        className={cn(
          "col-span-5 relative overflow-hidden rounded-2xl",
          imagePosition === "left" && "order-1"
        )}
      >
        <Image src={imageSrc} alt={imageAlt} fill className={imageClasses} />
        <div className={overlayClasses} />
      </div>
    </section>
  );
};
