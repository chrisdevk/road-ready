import { HighlightStack } from "@/app/_components/highlight-stack";
import { ScrollList } from "./scroll-list";

export const Highlights = () => {
  return (
    <article className="bg-black mt-40 py-20 text-white">
      <section className="flex flex-col gap-y-10 max-w-[1256px] w-full mx-auto px-4">
        <div className="flex flex-col items-center gap-y-4 text-center">
          <h2>
            What Will You Learn During Behind-
            <br />
            The-Wheel Lessons?
          </h2>
          <p className="text-center text-lg">
            Key Elements of <strong>Defensive Driving.</strong> It’s about
            staying alert, prepared and in control. <br /> Here’s what we focus
            on
          </p>
        </div>
        <HighlightStack />
      </section>
      <section className="max-w-[1256px] w-full mx-auto px-4 mt-40">
        <ScrollList />
      </section>
    </article>
  );
};
