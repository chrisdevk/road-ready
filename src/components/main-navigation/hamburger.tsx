"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface HamburgerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  pathname: string;
}

export const Hamburger = ({
  isOpen,
  setIsOpen,
  pathname,
}: HamburgerProps): React.ReactElement => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden flex flex-col gap-3.5"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={cn(
          "w-9 border-t-4 border-white transition-all duration-300",
          isOpen && "rotate-45 translate-y-2",
          pathname === "/" ? "border-white" : "border-black"
        )}
      />
      <div
        className={cn(
          "w-9 border-t-2 border-white transition-all duration-300",
          isOpen && "-rotate-45 -translate-y-2.5 border-t-4",
          pathname === "/" ? "border-white" : "border-black"
        )}
      />
    </Button>
  );
};
