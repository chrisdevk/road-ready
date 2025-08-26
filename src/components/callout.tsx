import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import Link from "next/link";

interface CalloutProps {
  heading: string;
  subheading?: string;
  buttonText: string;
  buttonLink: string;
  color: "primary" | "sand";
}

export const Callout = ({
  heading,
  subheading,
  buttonText,
  buttonLink,
  color,
}: CalloutProps) => {
  return (
    <section
      className={cn(
        color === "sand" && "bg-sand text-black",
        color === "primary" && "bg-primary text-white"
      )}
    >
      <Container className="space-y-7 flex flex-col items-center justify-center text-center py-20 mt-40">
        <h2>{heading}</h2>
        {!!subheading && <p>{subheading}</p>}
        <Button asChild variant={color === "primary" ? "secondary" : "default"}>
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </Container>
    </section>
  );
};
