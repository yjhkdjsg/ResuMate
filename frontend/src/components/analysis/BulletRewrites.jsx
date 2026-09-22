import { useState, useMemo } from "react";
import { ArrowRight, Loader2, Sparkles, Wand2, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/lib/utils";

function Number({ value, size = 32 }) {
  return (
    <span
      className="font-display tabular-nums font-500 leading-none tracking-tight text-[var(--ink)]"
      style={{ fontSize: size }}
    >
      {value}
    </span>
  );
}

export function BulletRewrites({ rewrites, onApply, isApplying, error }) {
  const ids = useMemo(() => rewrites.map((r) => r._id).filter(Boolean), [rewrites]);
  const [selected, setSelected] = useState(() => new Set(ids));

  const allSelected = selected.size === ids.length && ids.length > 0;
  const someSelected = selected.size > 0;

  function toggle(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(ids));
  }

  function applySelected() {
    onApply?.(Array.from(selected));
  }

  function applyAll() {
    onApply?.([]);
  }

  if (!rewrites?.length) {
    return (
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="text-base">Suggested Rewrites</CardTitle>
            <CardDescription className="mt-1">No rewrites suggested.</CardDescription>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="!mb-3">
        <div>
          <CardTitle className="text-base">Suggested Rewrites</CardTitle>
          <CardDescription className="mt-1">
            Pick the ones you want — applying creates a new version.
          </CardDescription>
        </div>
      </CardHeader>

      {/* Hero summary */}
      <div className="relative border border-[var(--border)] p-5 mb-5 bg-[var(--surface-2)]">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="flex items-end gap-8">
            <div>
              <div className="text-xs font-500 text-[var(--ink-muted)]">
                AI REWRITES
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <Number value={rewrites.length} size={32} />
              </div>
            </div>
            <div className="h-10 w-px bg-[var(--border)]" />
            <div>
              <div className="text-xs font-500 text-[var(--ink-muted)]">
                SELECTED
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-display text-2xl font-500 text-[var(--ink)]">
                  {selected.size}
                </span>
                <span className="text-[var(--ink-muted)] text-xs tabular-nums">
                  / {rewrites.length}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={toggleAll}>
              {allSelected ? "Clear all" : "Select all"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={applySelected}
              disabled={!someSelected || isApplying}
            >
              {isApplying ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Sparkles size={13} />
              )}
              Apply selected
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={applyAll}
              disabled={isApplying}
            >
              <Wand2 size={13} />
              Apply all
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {rewrites.map((r, i) => {
          const id = r._id || `idx-${i}`;
          const isSelected = selected.has(id);
          return (
            <div
              key={id}
              className={cn(
                "relative border p-5 transition-colors",
                isSelected
                  ? "border-[var(--ink)] bg-[var(--surface)]"
                  : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-2)]"
              )}
            >
              {/* Header row: number + section + selection state */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 text-lg">
                    <Number value={String(i + 1).padStart(2, "0")} size={18} />
                  </div>
                  {r.section && (
                    <span className="inline-flex items-center h-6 px-2 border border-[var(--border)] text-xs font-500 capitalize">
                      {r.section}
                    </span>
                  )}
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <span
                    className={cn(
                      "text-xs font-500 transition-colors",
                      isSelected
                        ? "text-[var(--ink)]"
                        : "text-[var(--ink-muted)]"
                    )}
                  >
                    {isSelected ? "Will apply" : "Skip"}
                  </span>
                  <Checkbox checked={isSelected} onChange={() => toggle(id)} />
                </label>
              </div>

              {/* Before / arrow / After */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_36px_1fr] gap-3 items-stretch">
                <div className="border border-[var(--border)] p-3 bg-[var(--surface-2)]">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="text-xs font-500 text-[var(--ink-muted)] uppercase">
                      Original
                    </div>
                  </div>
                  <div className="text-sm text-[var(--ink-muted)] leading-relaxed line-through">
                    {r.original}
                  </div>
                </div>

                <div className="flex items-center justify-center py-2 md:py-0">
                  <div className="h-8 w-8 flex items-center justify-center border border-[var(--border)] bg-[var(--surface)]">
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="border border-[var(--ink)] p-3 bg-[var(--surface)]">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles size={10} strokeWidth={2} className="text-[var(--ink)]" />
                    <div className="text-xs font-500 text-[var(--ink)] uppercase">
                      Rewritten
                    </div>
                  </div>
                  <div className="text-sm text-[var(--ink)] leading-relaxed font-500">
                    {r.rewritten}
                  </div>
                </div>
              </div>

              {/* Rationale */}
              {r.rationale && (
                <div className="mt-4 flex items-start gap-2 border border-[var(--border)] px-3 py-2">
                  <span className="h-5 w-5 border border-[var(--border)] flex items-center justify-center shrink-0 mt-0.5">
                    <Info size={10} strokeWidth={2} />
                  </span>
                  <div className="text-xs text-[var(--ink-muted)] leading-relaxed">
                    <span className="font-500 text-[var(--ink)]">
                      Why this works ·{" "}
                    </span>
                    {r.rationale}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {error && (
        <div className="mt-4 text-xs text-[var(--danger)] bg-[#f5e5e5] border border-[#dcc0c0] p-3">
          {error}
        </div>
      )}
    </Card>
  );
}
