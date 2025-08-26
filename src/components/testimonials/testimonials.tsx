import { TestimonialCarousel } from "@/components/testimonials/testimonial-carousel";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

export const Testimonials = () => {
  return (
    <article className="bg-black pt-18">
      <Container as="section" className="space-y-14 text-white">
        <h2>What Our Students Are Saying</h2>
        <TestimonialCarousel />
        <Separator className="bg-white mt-18" />
      </Container>
    </article>
  );
};
