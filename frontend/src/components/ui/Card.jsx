import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "bg-[var(--surface)] border border-[var(--border)] transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "hover:border-[var(--ink)]/30",
        accent: "bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]",
        flat: "border-0",
      },
      radius: {
        none: "",
        sm: "rounded-sm",
        md: "rounded-none",
        lg: "rounded-none",
      },
      padding: {
        none: "",
        sm: "p-3",
        md: "p-4",
        lg: "p-5",
      },
    },
    defaultVariants: { variant: "default", radius: "none", padding: "md" },
  }
);

export const Card = forwardRef(
  ({ className, variant, radius, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, radius, padding }), className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = ({ className, ...props }) => (
  <div className={cn("flex items-start justify-between gap-3 mb-3", className)} {...props} />
);

export const CardTitle = ({ className, ...props }) => (
  <h3
    className={cn(
      "text-sm font-500 text-[var(--ink)] tracking-tight",
      className
    )}
    {...props}
  />
);

export const CardDescription = ({ className, ...props }) => (
  <p className={cn("text-xs text-[var(--ink-muted)]", className)} {...props} />
);

export const CardContent = ({ className, ...props }) => (
  <div className={cn("", className)} {...props} />
);
