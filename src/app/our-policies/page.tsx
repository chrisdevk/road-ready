import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { policies as policiesData } from "@/utils/data/static/policies.json";

export const dynamic = "force-static";

export const generateMetadata = () => {
  return {
    title: "RoadReady Driving School Policies",
    description:
      "Please read our policies, which apply to the driver training services offered by RoadReady Driving  School. By using our services, you agree to these terms and conditions.",
  };
};

export default function OurPoliciesPage() {
  const data = policiesData;
  return (
    <>
      <PageHero
        heading="Our Policies"
        subheading="Please review the policies below. These terms apply to all behind-the-wheel lessons and packages offered by RoadReady Driving School. By booking or attending a lesson, you agree to these policies."
        color="black"
      />
      <Container className="flex flex-col gap-y-12 my-20 lg:my-40">
        {data.map((policy) => (
          <div key={policy.heading}>
            <h2 className="text-xl">{policy.heading}</h2>
            <p>{policy.subheading}</p>
          </div>
        ))}
      </Container>
    </>
  );
}
