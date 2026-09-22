import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <Card className={cn("flex flex-col items-center text-center p-12 border border-[var(--border)]", className)}>
      {Icon && (
        <div className="h-12 w-12 flex items-center justify-center text-[var(--ink-muted)] mb-4">
          <Icon size={24} strokeWidth={1.5} />
        </div>
      )}
      <div className="font-display text-lg font-500">{title}</div>
      {description && (
        <p className="text-sm text-[var(--ink-muted)] mt-2 max-w-md">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </Card>
  );
}
