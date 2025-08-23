import React from "react";

interface ListItemProps {
  heading: string;
  subheading: string;
  icon: string;
  iconMap: Record<string, React.ElementType>;
}

export const ListItem = ({
  heading,
  subheading,
  icon,
  iconMap,
}: ListItemProps) => {
  const Icon = iconMap[icon as keyof typeof iconMap];
  return (
    <li key={heading} className="flex gap-x-6">
      <div className="flex flex-col items-center gap-y-5">
        <Icon className="size-10" />
        <div className="w-px h-full bg-neutral-500" />
      </div>
      <div className="flex flex-col gap-y-2">
        <h3>{heading}</h3>
        <p>{subheading}</p>
      </div>
    </li>
  );
};
