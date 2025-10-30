import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CalloutProps {
  heading: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string;
  color: "primary" | "sand";
  buttonSlot?: React.ReactNode;
}

export const Callout = ({
  heading,
  subheading,
  buttonText,
  buttonLink,
  color,
  buttonSlot,
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

        {/* Prefer custom slot if provided */}
        {buttonSlot ? (
          <div className="mt-2">{buttonSlot}</div>
        ) : buttonText && buttonLink ? (
          <Button asChild variant={color === "primary" ? "secondary" : "default"}>
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