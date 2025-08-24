import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@/lib/constants";
import Image from "next/image";

export const TestimonialCarousel = () => {
  return (
    <Carousel>
      <CarouselContent>
        {testimonials.map((testimonial) => (
          <CarouselItem key={testimonial.name} className="basis-1/3 px-6">
            <div className="flex flex-col gap-4 w-full max-w-[384px]">
              <div className="flex items-center justify-between">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={44}
                  height={44}
                  className="rounded-full"
                />
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
              <h3>{testimonial.name}</h3>
              <p>{testimonial.quote}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex absolute -top-1/4 md:right-[5.5%]">
        <CarouselPrevious variant="secondary" className="text-black" />
        <CarouselNext variant="secondary" className="text-black" />
      </div>
    </Carousel>
  );
};
