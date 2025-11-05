import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface TestimonialCarouselProps {
  testimonials: {
    name: string;
    quote: string;
    image: string;
    title: string;
  }[];
}

export const TestimonialCarousel = ({
  testimonials,
}: TestimonialCarouselProps) => {
  return (
    <Carousel className="space-y-8">
      <CarouselContent>
        {testimonials.map((testimonial) => (
          <CarouselItem
            key={testimonial.name}
            className="basis-full lg:basis-1/3 px-6"
          >
            <div className="flex flex-col gap-4 w-full max-w-[384px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={44}
                    height={44}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm">{testimonial.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Image
                      key={i}
                      src="/svg/stars.svg"
                      alt="stars"
                      width={20}
                      height={20}
                    />
                  ))}
                </div>
              </div>
              <p>{testimonial.quote}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center gap-x-8 md:absolute -top-1/4 md:right-[5.5%]">
        <CarouselPrevious
          variant="secondary"
          className="text-black static md:absolute"
        />
        <CarouselNext
          variant="secondary"
          className="text-black static md:absolute"
        />
      </div>
    </Carousel>
  );
};
