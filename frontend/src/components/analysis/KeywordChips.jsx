import { Check, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

function Chip({ children, tone }) {
  if (tone === "present") {
    return (
      <span className="inline-flex items-center gap-1.5 h-6 px-2 border border-[var(--ink)] bg-[var(--surface)] text-[var(--ink)] text-xs font-500">
        <Check size={12} strokeWidth={2.5} />
        {children}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 h-6 px-2 border border-[#dcc0c0] bg-[#f5e5e5] text-[#a00] text-xs font-500">
      <X size={12} strokeWidth={2.5} />
      {children}
    </span>
  );
}

function SectionHeader({ tone, label, count }) {
  const isPresent = tone === "present";
  return (
    <div className="flex items-center gap-2 mb-3 text-xs font-500">
      <span className={isPresent ? "text-[var(--ink)]" : "text-[#a00]"}>
        {isPresent ? <Check size={12} strokeWidth={2} /> : <X size={12} strokeWidth={2} />}
      </span>
      <div className="text-[var(--ink)]">{label}</div>
      <span className="text-[var(--ink-muted)] tabular-nums">{count}</span>
      <div className="flex-1 h-px bg-[var(--border)]" />
    </div>
  );
}

export function KeywordChips({ present = [], missing = [] }) {
  const total = present.length + missing.length;
  const pct = total ? Math.round((present.length / total) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="text-base">Keywords</CardTitle>
          <CardDescription className="mt-1">
            What ATS sees vs what it expects
          </CardDescription>
        </div>
      </CardHeader>

      {/* Match-rate hero */}
      <div className="relative border border-[var(--border)] p-5 mb-5 bg-[var(--surface-2)]">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-500 text-[var(--ink-muted)]">
              MATCH RATE
            </div>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className="font-display text-3xl font-500 text-[var(--ink)]">
                {present.length}
              </span>
              <span className="text-[var(--ink-muted)] text-sm font-500 tabular-nums">
                / {total}
              </span>
              <span className="text-xs text-[var(--ink-muted)]">
                keywords
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-display text-2xl font-500 text-[var(--ink)]">
              {pct}%
            </div>
            <div className="text-xs font-500 text-[var(--ink-muted)] mt-1">
              COVERAGE
            </div>
          </div>
        </div>

        <div className="relative mt-4 h-1 w-full bg-[var(--border)] overflow-hidden">
          <div
            className="h-full transition-[width] duration-700 ease-out bg-[var(--ink)]"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Present */}
      <div className="space-y-5">
        <div>
          <SectionHeader tone="present" label="Present" count={present.length} />
          {present.length ? (
            <div className="flex flex-wrap gap-1.5">
              {present.map((k) => (
                <Chip key={k} tone="present">
                  {k}
                </Chip>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[var(--ink-muted)]">None detected.</p>
          )}
        </div>

        <div>
          <SectionHeader tone="missing" label="Missing" count={missing.length} />
          {missing.length ? (
            <div className="flex flex-wrap gap-1.5">
              {missing.map((k) => (
                <Chip key={k} tone="missing">
                  {k}
                </Chip>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[var(--ink-muted)]">
              You're hitting the major keywords.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
