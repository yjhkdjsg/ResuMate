import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-500 text-sm whitespace-nowrap transition-colors duration-200 focus-visible:outline-1 focus-visible:outline-[var(--ink)] disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--ink)] text-[var(--bg)] border border-[var(--ink)] hover:bg-[var(--bg)] hover:text-[var(--ink)]",
        outline:
          "bg-[var(--bg)] border border-[var(--border)] text-[var(--ink)] hover:bg-[var(--surface-2)]",
        ghost:
          "bg-transparent text-[var(--ink)] border border-transparent hover:bg-[var(--surface-2)]",
        soft:
          "bg-[var(--surface-2)] text-[var(--ink)] hover:bg-[var(--border)]",
        accent:
          "bg-[var(--ink)] text-[var(--bg)] border border-[var(--ink)] hover:bg-[var(--bg)] hover:text-[var(--ink)]",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6",
        icon: "h-10 w-10 p-0",
        iconSm: "h-8 w-8 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export const Button = forwardRef(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { buttonVariants };
