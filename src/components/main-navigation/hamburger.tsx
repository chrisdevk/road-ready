"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface HamburgerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Hamburger = ({
  isOpen,
  setIsOpen,
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
          isOpen && "rotate-45 translate-y-2"
        )}
      />
      <div
        className={cn(
          "w-9 border-t-2 border-white transition-all duration-300",
          isOpen && "-rotate-45 -translate-y-2.5 border-t-4"
        )}
      />
    </Button>
  );
};
