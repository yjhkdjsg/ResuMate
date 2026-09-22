import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const IconButton = forwardRef(
  ({ className, dot, size = "md", as: Component = "button", ...props }, ref) => {
    const baseClass = cn(
      "inline-flex items-center justify-center border border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--ink)]/30 transition-colors focus-visible:outline-1 focus-visible:outline-[var(--ink)]",
      size === "sm" ? "h-8 w-8" : "h-10 w-10",
      className
    );

    return (
      <Component
        ref={ref}
        className={baseClass}
        {...props}
      >
        {props.children}
        {dot && (
          <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-[var(--ink)]" />
        )}
      </Component>
    );
  }
);
IconButton.displayName = "IconButton";
