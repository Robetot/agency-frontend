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
        "glass rounded-2xl p-6 shadow-card",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary/40 hover:shadow-glow",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
