import { highlights } from "@/lib/constants";
import { CircleMinus, OctagonAlert, SquareArrowUp } from "lucide-react";
import Image from "next/image";

const iconMap = {
  warning: "/svg/warning.svg",
  CircleMinus,
  SquareArrowUp,
  OctagonAlert,
} as const;

export const HighlightStack = () => {
  const getIcon = (icon: string) => {
    return iconMap[icon as keyof typeof iconMap];
  };
  return (
    <div className="grid grid-cols-4 gap-5 p-5 md:py-10 bg-gray rounded-2xl mt-10">
      {highlights.map((highlight, i) => {
        const Icon = getIcon(highlight.icon);
        return (
          <div
            key={i}
            className="flex flex-col gap-y-7 items-center col-span-4 md:col-span-1"
          >
            {typeof Icon === "string" ? (
              <Image
                src={Icon}
                alt={highlight.heading}
                width={60}
                height={60}
                className="size-[3.75rem]"
              />
            ) : (
              <Icon className="size-[3.75rem]" strokeWidth={1} />
            )}
            <div className="flex flex-col items-center text-center gap-y-2">
              <h3>
                <span dangerouslySetInnerHTML={{ __html: highlight.heading }} />
              </h3>
              <p>{highlight.subheading}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
