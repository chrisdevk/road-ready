import { TrialAccordion } from "@/app/_components/trial-accordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export const TrialSection = () => {
  return (
    <article className="mt-40 space-y-20">
      <Container as="section" className="text-center space-y-9">
        <div className="flex flex-col gap-y-5">
          <h2>Try Before You Commit</h2>
          <p>
            Your first lesson sets the tone for your entire driving experience.
            With our trial lesson, you’ll gain the <br /> confidence, support,
            and direction you need to move forward with ease
          </p>
        </div>
        <Button>
          Trial Lesson 99$ <ArrowUpRight />
        </Button>
      </Container>
      <Container as="section" className="grid grid-cols-2 gap-x-13">
        <TrialAccordion />
        <div className="relative col-span-2 md:col-span-1 bg-primary h-full overflow-hidden rounded-2xl">
          <Image
            src="/images/trial-lesson.jpg"
            alt="Trial lesson"
            fill
            className="rounded-2xl object-cover mt-4 ml-4"
          />
        </div>
      </Container>
    </article>
  );
};
