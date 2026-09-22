import { Card } from "@/components/ui/Card";

export function StatCard({
  label,
  value,
  suffix,
  delta,
  chart,
  data,
  icon: Icon,
  accent = false,
}) {
  const displayValue = value == null || value === "" ? "—" : value;

  return (
    <Card className={accent ? "bg-[var(--ink)] text-[var(--bg)]" : ""}>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={`h-5 w-5 ${accent ? "text-[var(--bg)]" : "text-[var(--ink)]"}`}>
              <Icon size={20} strokeWidth={1.5} />
            </div>
          )}
          <span className={`text-xs font-500 ${accent ? "text-[var(--bg)]/70" : "text-[var(--ink-muted)]"}`}>
            {label}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-500 tracking-tight">
            {displayValue}
          </span>
          {suffix && (
            <span className={`text-sm ${accent ? "text-[var(--bg)]/70" : "text-[var(--ink-muted)]"}`}>
              {suffix}
            </span>
          )}
        </div>
        {delta != null && (
          <div className={`text-xs font-500 ${delta >= 0 ? (accent ? "text-[var(--bg)]" : "text-[var(--ink)]") : "text-[var(--ink-muted)]"}`}>
            {delta >= 0 ? "+" : ""}{delta}%
          </div>
        )}
      </div>
    </Card>
  );
}
