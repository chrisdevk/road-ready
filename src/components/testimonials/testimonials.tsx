import { TestimonialCarousel } from "@/components/testimonials/testimonial-carousel";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

interface TestimonialsProps {
  testimonials: {
    name: string;
    quote: string;
    image: string;
  }[];
}

export const Testimonials = ({ testimonials }: TestimonialsProps) => {
  return (
    <article className="bg-black pt-18">
      <Container as="section" className="space-y-14 text-white">
        <h2>What Our Students Are Saying</h2>
        <TestimonialCarousel testimonials={testimonials} />
        <Separator className="bg-white mt-18" />
      </Container>
    </article>
  );
};
