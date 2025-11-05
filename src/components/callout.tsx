import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BookingModalClient } from "./booking/booking-modal.client";

interface CalloutProps {
  heading: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonVariant?: "link" | "modal";
  color: "primary" | "sand";
}

export const Callout = ({
  heading,
  subheading,
  buttonText,
  buttonLink,
  buttonVariant,
  color,
}: CalloutProps) => {
  return (
    <section
      className={cn(
        color === "sand" && "bg-sand text-black",
        color === "primary" && "bg-primary text-white"
      )}
    >
      <Container
        className={cn(
          "space-y-7 flex flex-col items-center justify-center text-center py-20 mt-20 md:mt-40",
          { ["space-y-5"]: !!subheading }
        )}
      >
        <h2 dangerouslySetInnerHTML={{ __html: heading }} />
        {!!subheading && <p dangerouslySetInnerHTML={{ __html: subheading }} />}
        {buttonVariant === "modal" ? (
          <BookingModalClient
            buttonText="Trial Lesson $99"
            buttonVariant={color === "primary" ? "secondary" : "default"}
          />
        ) : buttonText && buttonLink ? (
          <Button
            asChild
            variant={color === "primary" ? "secondary" : "default"}
          >
            <Link href={buttonLink}>
              {buttonText}
              <ArrowUpRight />
            </Link>
          </Button>
        ) : null}
      </Container>
    </section>
  );
};
