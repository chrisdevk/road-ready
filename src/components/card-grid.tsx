"use client";

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
import { Button } from "./ui/button";
import { useBookingModal } from "@/components/booking/bookingModalStore";

type Props = { packages: Package[] };

export const CardGrid = ({ packages }: Props) => {
  const { open } = useBookingModal();

  if (!packages || packages.length === 0) return null;

  return (
    <div className="grid grid-cols-12 gap-y-10 md:gap-x-10">
      {packages.map((item) => {
        const canBook =
          Boolean((item as any).acuityTypeId) ||
          Boolean((item as any).stripePriceId);

        return (
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
                {item.highlight ? (
                  <CardAction className="bg-black rounded-3xl px-2.5 py-1.5 font-medium text-white w-fit">
                    {item.highlight}
                  </CardAction>
                ) : null}
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
                {item.fullPrice ? (
                  <p className="text-neutral-500 line-through">
                    ${item.fullPrice}
                  </p>
                ) : null}
              </CardFooter>

              <CardAction className="w-full px-5">
                <Button
                  type="button"
                  className="w-full"
                  disabled={!canBook}
                  aria-disabled={!canBook}
                  onClick={() =>
                    open({
                      appointmentTypeId: (item as any).acuityTypeId,
                      priceId: (item as any).stripePriceId,
                      name: item.name,
                      email: "qbic@gmx.com",
                    })
                  }
                >
                  {canBook ? "Book Now" : "Unavailable"}
                </Button>
              </CardAction>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

