import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** Adds an accent hover glow + lift. */
  interactive?: boolean;
};

export function Card({ children, className, interactive, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 sm:p-7",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
