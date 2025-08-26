"use client";

import { Hamburger } from "@/components/main-navigation/hamburger";
import { Menu } from "@/components/main-navigation/menu";
import { cn } from "@/lib/cn";
import { navLinks } from "@/lib/constants";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const MainNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full text-white">
        <div
          className={cn(
            "max-w-[1256px] w-full mx-auto px-4 flex items-center justify-between pt-8 pb-5 transition-all duration-300 rounded-b-2xl",
            scrolled &&
              !isOpen &&
              "bg-black/30 backdrop-blur-lg text-white pt-5 px-5"
          )}
        >
          <Link href="/">
            <Image
              src="/svg/logo-white.svg"
              alt="RoadReady"
              width={100}
              height={44}
            />
          </Link>
          <nav className="items-center gap-10 font-noto-sans hidden md:flex">
            {navLinks.map((link) => (
              <Link
                href={link.href}
                key={link.label}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </header>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-lg rounded-b-2xl z-40"
          >
            <Menu links={navLinks} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
