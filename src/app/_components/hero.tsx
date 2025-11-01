"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-10 h-screen text-center bg-[url('/images/hero-img.jpg')] bg-cover bg-center text-white">
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
          className="text-lg lg:text-xl"
        >
          <span>Driving Lessons in Las Vegas</span> <br />
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-lg lg:text-xl mt-3.5"
        >
          <span>
            Our DMV-certified instructors help you become a skilled and
            <br className="hidden md:block" />
            responsible driver by offering tailored behind-the-wheel lessons
          </span>
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6 }}
      >
        <Button asChild>
          <Link href="/packages">Book now</Link>
        </Button>
      </motion.div>
    </section>
  );
};
