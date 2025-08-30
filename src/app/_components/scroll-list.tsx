"use client";

import { scrollListItems } from "@/lib/constants";
import { CircleCheck } from "lucide-react";
import { motion, useAnimation } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const ScrollList = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start({
        y: [0, -320],
        transition: {
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        },
      });
    } else {
      controls.stop();
    }
  }, [isVisible, controls]);

  return (
    <div className="grid grid-cols-12 md:gap-x-24 space-y-10 mt-20 md:mt-40">
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-y-6 col-span-12 md:col-span-6 md:my-auto">
        <h2>Step by step, you'll build Essential Driving Skills</h2>
        <p>
          Each skill is introduced when you're ready. No pressure, just progress
        </p>
      </div>
      <div className="hidden md:block col-span-1" />

      {/* Auto-scroll container */}
      <div
        ref={containerRef}
        className="col-span-12 md:col-span-5 h-[500px] overflow-hidden relative bg-white p-6 max-h-[210px]"
      >
        <motion.div
          className="scroll-content space-y-4"
          animate={controls}
          style={{
            transformOrigin: "center",
          }}
        >
          {/* Multiple sets for seamless loop */}
          {[...Array(4)].map((_, setIndex) => (
            <div key={`set-${setIndex}`} className="flex flex-col gap-4">
              {scrollListItems.map((item) => (
                <div
                  key={`${item.key}-set-${setIndex}`}
                  className="text-lg font-medium text-gray-800 flex items-center gap-2"
                >
                  <CircleCheck strokeWidth={1} className="text-primary" />
                  {item.value}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-black/5 to-transparent max-h-20" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black via-black/5 to-transparent max-h-20" />
      </div>
    </div>
  );
};
