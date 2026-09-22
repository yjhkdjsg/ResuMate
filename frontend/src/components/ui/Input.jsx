import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "h-10 w-full border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none focus:border-[var(--ink)] transition-colors disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const SearchInput = forwardRef(
  ({ className, leftIcon, rightSlot, ...props }, ref) => (
    <div
      className={cn(
        "group flex items-center gap-2 h-9 bg-[var(--surface)] border border-[var(--border)] px-3 transition-colors focus-within:border-[var(--ink)]",
        className
      )}
    >
      {leftIcon && (
        <span className="text-[var(--ink-muted)] shrink-0">{leftIcon}</span>
      )}
      <input
        ref={ref}
        type="text"
        className="flex-1 bg-transparent text-sm text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none"
        {...props}
      />
      {rightSlot}
    </div>
  )
);
SearchInput.displayName = "SearchInput";
