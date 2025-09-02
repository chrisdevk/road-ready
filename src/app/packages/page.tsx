import { CardGrid } from "@/components/card-grid";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import packages from "@/utils/data/static/packages.json";

export default async function PackagesPage() {
  const data = packages;
  return (
    <>
      <PageHero
        heading="We Teach - You Drive"
        subheading="Behind-The-Wheel driving lessons in Las Vegas for teens, adults, and international drivers"
        color="black"
      />
      <article className="mt-20 md:mt-40">
        <Container as="section">
          <h2>Choose Your Plan</h2>
          <p>
            Select the training package that fits your needs. Learn at your own
            pace with DMV-licensed instructors, and build the skills and
            confidence to drive safely and independently
          </p>
          <CardGrid packages={data.packages} />
        </Container>
      </article>
    </>
  );
}
