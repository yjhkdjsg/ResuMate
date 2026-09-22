import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function StrengthsList({ strengths }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="text-base">Strengths</CardTitle>
          <CardDescription className="mt-1">
            What's already working for you
          </CardDescription>
        </div>
        <Badge tone="success">{strengths.length}</Badge>
      </CardHeader>
      <div className="space-y-6">
        {strengths.map((s, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="shrink-0 w-6 flex items-start justify-center pt-0.5">
              <span
                className="font-display text-sm font-500 text-[var(--ink)]"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-500 text-sm text-[var(--ink)]">{s.title}</div>
              <div className="text-xs text-[var(--ink-muted)] mt-1">{s.evidence}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
