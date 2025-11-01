import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const HeroCallout = () => {
  return (
    <div className="bg-primary text-white flex flex-col md:flex-row justify-center gap-10 md:gap-28 py-5 px-20 w-fit mx-auto rounded-2xl -mt-16">
      <div className="flex flex-col items-center gap-y-3">
        <span className="font-noto-sans text-xl font-bold">
          Driving Lessons
        </span>
        <Button variant="secondary" className="" asChild>
          <Link href="/packages">
            Choose Plan <ArrowUpRight />
          </Link>
        </Button>
      </div>
      <div className="flex flex-col items-center gap-y-3">
        <span className="font-noto-sans text-xl font-bold">Drive Test</span>
        <Button variant="secondary" asChild>
          <Link href="/drive-test">
            Get Ready <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};
