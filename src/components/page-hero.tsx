import { cn } from "@/lib/cn";
import { Container } from "./ui/container";

interface PageHeroProps {
  heading: string;
  subheading: string;
  color: "primary" | "sand" | "black";
}

const getColor = (color: "primary" | "sand" | "black") => {
  switch (color) {
    case "primary":
      return "bg-primary";
    case "sand":
      return "bg-sand";
    case "black":
      return "bg-black";
  }
};

export const PageHero = ({ heading, subheading, color }: PageHeroProps) => {
  return (
    <section className={cn("py-32 mt-20", getColor(color))}>
      <Container className="text-white text-center flex flex-col gap-y-10 items-center justify-center ">
        <h1>{heading}</h1>
        <p>{subheading}</p>
      </Container>
    </section>
  );
};
