import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { Package } from "@/types/package";
import Link from "next/link";
import { Button } from "./ui/button";

export const CardGrid = ({ packages }: { packages: Package[] }) => {
  if (!packages || !packages.length) return null;

  return (
    <div className="grid grid-cols-12 gap-y-10 md:gap-x-10">
      {packages.map((item) => (
        <div
          key={item.name}
          className={cn(
            "col-span-12 md:col-span-6 lg:col-span-4 pl-5 pt-5 rounded-2xl shadow-sm",
            item.highlight ? "bg-black" : "bg-sand"
          )}
        >
          <Card className="size-full rounded-bl-none rounded-tr-none rounded-br-2xl shadow-none border-0 gap-y-2.5">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-black">
                {item.name}
              </CardTitle>
              {item.highlight && (
                <CardAction className="bg-black rounded-3xl px-2.5 py-1.5 font-medium text-white w-fit">
                  {item.highlight}
                </CardAction>
              )}
            </CardHeader>
            <CardContent className="mb-2.5">
              <p className="text-primary text-lg font-semibold">
                {item.duration}
              </p>
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </CardContent>
            <CardFooter className="flex items-end gap-x-2.5 mt-auto">
              <p className="text-5xl font-semibold text-black font-poppins">
                ${item.price}
              </p>
              {item.fullPrice && (
                <p className="text-neutral-500 line-through">
                  ${item.fullPrice}
                </p>
              )}
            </CardFooter>
            <CardAction className="w-full px-5">
              <Button asChild className="w-full">
                <Link href="/packages">Book Now</Link>
              </Button>
            </CardAction>
          </Card>
        </div>
      ))}
    </div>
  );
};
