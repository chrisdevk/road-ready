"use client";

import { BookingModalClient } from "@/components/booking/booking-modal.client";
import { Container } from "@/components/ui/container";
import { motion } from "motion/react";

export const Hero = () => {
  return (
    <section className="h-screen text-center bg-[url('/images/hero-img.webp')] bg-cover bg-center text-white">
      <Container className="flex flex-col items-center justify-center gap-10 h-full">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          Take the Wheel <br /> Own the Road
        </motion.h1>
        <div>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-xl"
          >
            <span>Driving Lessons in Las Vegas</span> <br />
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-xl mt-3.5"
          >
            <span>
              RoadReady Driving School provides <br className="md:hidden" />{" "}
              DMV-approved behind-the-wheel lessons for teens and adults.{" "}
              <br className="hidden md:block" /> We help you become a safe and
              confident driver
            </span>
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          <BookingModalClient
            buttonText="Book now"
            buttonVariant="default"
            name="Lessons & Packages"
          />
        </motion.div>
      </Container>
    </section>
  );
};
