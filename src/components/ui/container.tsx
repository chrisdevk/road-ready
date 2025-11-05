import { cn } from "@/lib/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "article" | "div";
}

/**
 * A container component that provides consistent max-width and padding
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to render inside container
 * @param {string} [props.className] - Optional additional CSS classes
 * @param {("section"|"article"|"div")} [props.as="div"] - HTML element to render as
 * @returns {React.ReactElement} The container element
 */
export const Container = ({
  children,
  className,
  as = "div",
}: ContainerProps): React.ReactElement => {
  const Tag = as;
  return (
    <Tag className={cn("max-w-[1256px] w-full mx-auto px-4", className)}>
      {children}
    </Tag>
  );
};
