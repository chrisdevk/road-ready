"use client";

import { cn } from "@/lib/cn";
import { Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";

export const PhoneBubble = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center items-center bg-primary rounded-full fixed right-1/12 bottom-1/12 border border-white z-50">
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.p
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="text-white whitespace-nowrap overflow-hidden"
          >
            <a href="tel:(702) 747-5998" className="px-3 text-white">
              (702) 747-5998
            </a>
          </motion.p>
        )}
      </AnimatePresence>
      <Button
        className={cn(
          "rounded-full size-14 p-0",
          isOpen && "bg-white hover:bg-white/80"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Phone className={cn("text-white", isOpen && "text-primary")} />
      </Button>
    </div>
  );
};
