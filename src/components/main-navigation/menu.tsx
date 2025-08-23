import Link from "next/link";

export const Menu = ({
  links,
}: {
  links: { label: string; href: string }[];
}) => {
  return (
    <div className="flex flex-col items-center gap-y-8 pt-28 pb-8 text-white">
      {links.map((link) => (
        <Link href={link.href} key={link.label} className="text-lg font-medium">
          {link.label}
        </Link>
      ))}
    </div>
  );
};
